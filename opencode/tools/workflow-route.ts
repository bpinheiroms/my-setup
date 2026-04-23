import { tool } from "@opencode-ai/plugin"

type Route =
  | "self"
  | "explore"
  | "glm-analyzer"
  | "gpt-critic"
  | "kimi-context"
  | "qwen-coder"
  | "revenuecat-agent"
  | "minimax-writer"
  | "general"

const SEARCH_PATTERNS = [
  /\bwhere\b/i,
  /\bfind\b/i,
  /\bsearch\b/i,
  /\blocate\b/i,
  /\bwhich file\b/i,
  /\bwhat uses\b/i,
  /\bgrep\b/i,
]

const RCA_PATTERNS = [
  /\bwhy\b/i,
  /root cause/i,
  /\binvestigat/i,
  /\bdebug\b/i,
  /\bregression\b/i,
  /\bflaky\b/i,
  /\bcompare\b/i,
  /tradeoff/i,
  /\brisk\b/i,
  /architecture/i,
  /code review/i,
]

const GPT_REVIEW_PATTERNS = [
  /second opinion/i,
  /final review/i,
  /double check/i,
  /sanity check/i,
  /judge/i,
  /adversarial review/i,
  /tie[- ]?break/i,
  /high[- ]stakes/i,
  /production/i,
  /prod/i,
  /migration/i,
  /security/i,
  /compliance/i,
  /go[- ]live/i,
  /release/i,
  /launch/i,
]

const WRITE_PATTERNS = [
  /\bname\b/i,
  /naming/i,
  /rewrite/i,
  /copy/i,
  /brainstorm/i,
  /alternative/i,
  /wording/i,
  /title/i,
]

const REVENUECAT_PATTERNS = [
  /revenuecat/i,
  /\bentitlement/i,
  /\boffering/i,
  /\bsubscription/i,
  /\bsubscriber/i,
  /\bcustomer info/i,
  /\bpaywall/i,
  /\bproduct id/i,
  /\bpackage(s)?\b/i,
  /\bpurchase(s|d)?\b/i,
]

const IMPLEMENT_PATTERNS = [
  /\bimplement\b/i,
  /\bfix\b/i,
  /\brefactor\b/i,
  /\bchange\b/i,
  /\bupdate\b/i,
  /\badd\b/i,
  /\bremove\b/i,
  /\bcreate\b/i,
  /\bpatch\b/i,
]

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text))
}

function confidence(score: number): "low" | "medium" | "high" {
  if (score >= 4) return "high"
  if (score >= 2) return "medium"
  return "low"
}

export default tool({
  description:
    "Deterministically route a user task to the best OpenCode workflow or subagent. Use before non-trivial work.",
  args: {
    task: tool.schema.string().describe("Compact summary of the user request or current task"),
    fileCount: tool.schema.number().int().nonnegative().optional().describe("Approximate number of relevant files"),
    hasLongLogs: tool.schema.boolean().optional().describe("True when logs are long or noisy"),
    hasLargeDiff: tool.schema.boolean().optional().describe("True when the diff or change set is large"),
    hasLargeSpec: tool.schema.boolean().optional().describe("True when there is a long spec, RFC, or document"),
    hasIndependentSubtasks: tool.schema.boolean().optional().describe("True when multiple independent subtasks can run in parallel"),
  },
  async execute(args) {
    const text = args.task.trim()
    const reasons: string[] = []
    const fileCount = args.fileCount ?? 0
    const largeContext = Boolean(args.hasLongLogs || args.hasLargeDiff || args.hasLargeSpec || fileCount >= 8)
    const search = matchesAny(text, SEARCH_PATTERNS)
    const rca = matchesAny(text, RCA_PATTERNS)
    const gptReview = matchesAny(text, GPT_REVIEW_PATTERNS)
    const writing = matchesAny(text, WRITE_PATTERNS)
    const implementation = matchesAny(text, IMPLEMENT_PATTERNS)
    const revenuecat = matchesAny(text, REVENUECAT_PATTERNS)
    const reviewOnly = gptReview && !implementation

    let route: Route = "self"
    let followUp: Route | undefined
    let score = 1

    if (args.hasIndependentSubtasks) {
      route = "general"
      score = 4
      reasons.push("Multiple independent subtasks can run in parallel")
    } else if (largeContext && revenuecat) {
      route = "kimi-context"
      followUp = "revenuecat-agent"
      score = 5
      reasons.push("Task combines large context with RevenueCat-specific analysis or tool usage")
    } else if (revenuecat) {
      route = "revenuecat-agent"
      score = 4
      reasons.push("Task is RevenueCat-specific and should use MCP tools through the dedicated agent")
    } else if (largeContext && reviewOnly) {
      route = "kimi-context"
      followUp = "gpt-critic"
      score = 5
      reasons.push("Task combines large context with a requested second opinion or high-stakes review")
    } else if (reviewOnly) {
      route = "gpt-critic"
      score = 5
      reasons.push("Task asks for review-only work: second opinion, final review, or high-stakes decision check")
    } else if (writing) {
      route = "minimax-writer"
      score = 4
      reasons.push("Task is wording, naming, rewrite, or brainstorming heavy")
    } else if (largeContext && rca) {
      route = "kimi-context"
      followUp = "glm-analyzer"
      score = 5
      reasons.push("Task combines large context with root cause or tradeoff analysis")
    } else if (largeContext && implementation) {
      route = "kimi-context"
      followUp = "qwen-coder"
      score = 5
      reasons.push("Task combines large context with contained implementation work")
    } else if (largeContext) {
      route = "kimi-context"
      score = 4
      reasons.push("Task has large context and should be compressed first")
    } else if (search && !implementation && !rca) {
      route = "explore"
      score = 3
      reasons.push("Task is mainly repo discovery or code search")
    } else if (rca) {
      route = "glm-analyzer"
      score = 4
      reasons.push("Task is root cause, debugging, architecture, or tradeoff analysis")
    } else if (implementation) {
      route = "qwen-coder"
      score = 3
      reasons.push("Task is code-heavy and appears contained enough for focused implementation")
    } else {
      reasons.push("Task is simple enough for the primary agent to handle directly")
    }

    const hints: string[] = []
    if (route === "explore") hints.push("Use the Task/subagent flow with explore to gather file locations and quick evidence before continuing")
    if (route === "kimi-context") hints.push("Use the Task/subagent flow with kimi-context and ask for a compressed summary, key facts, gaps, and next steps")
    if (route === "glm-analyzer") hints.push("Use the Task/subagent flow with glm-analyzer and ask for root cause, evidence, fix options, and residual risks")
    if (route === "gpt-critic") hints.push("Use the Task/subagent flow with gpt-critic and ask for findings, key risks, judgment on the approach, and the most important improvement")
    if (route === "qwen-coder") hints.push("Use the Task/subagent flow with qwen-coder and ask for a focused implementation with verification on the touched path")
    if (route === "revenuecat-agent") hints.push("Use the Task/subagent flow with revenuecat-agent, use RevenueCat MCP tools directly, and avoid guessing subscription or offering state")
    if (route === "minimax-writer") hints.push("Use the Task/subagent flow with minimax-writer and ask for 3 to 5 strong alternatives ranked best first")
    if (route === "general") hints.push("Use the Task/subagent flow with general, split only truly independent subtasks, and integrate the results yourself")
    if (followUp) hints.push(`After ${route}, continue with ${followUp}`)
    if (implementation) hints.push("If files change, run the mandatory gpt-critic review at the end, not at the start")

    return JSON.stringify(
      {
        route,
        followUp,
        confidence: confidence(score),
        reason: reasons.join("; "),
        hints,
      },
      null,
      2,
    )
  },
})
