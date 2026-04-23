import { tool } from "@opencode-ai/plugin"

type Route =
  | "self"
  | "explore"
  | "glm-analyzer"
  | "glm-reviewer"
  | "gpt-critic"
  | "kimi-context"
  | "qwen-coder"
  | "qwen-operator"
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
  /\bonde\b/i,
  /\bencontre\b/i,
  /\bprocure\b/i,
  /\blocalize\b/i,
  /\bqual arquivo\b/i,
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
  /\bpor que\b/i,
  /causa raiz/i,
  /\binvestigue\b/i,
  /\bdepur/i,
  /arquitetura/i,
  /revis[aã]o de c[oó]digo/i,
]

const REVIEW_PATTERNS = [
  /second opinion/i,
  /final review/i,
  /double check/i,
  /sanity check/i,
  /adversarial review/i,
  /review\b/i,
  /judge/i,
  /segunda opini[aã]o/i,
  /revis[aã]o final/i,
  /revis[aã]o/i,
  /confere/i,
  /valida/i,
]

const GPT_ESCALATION_PATTERNS = [
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
  /payment/i,
  /billing/i,
  /iap/i,
  /finance/i,
  /payments/i,
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
  /\bnome\b/i,
  /reescrev/i,
  /texto/i,
  /copywriting/i,
]

const OPERATE_PATTERNS = [
  /\btest(s)?\b/i,
  /\beval(s)?\b/i,
  /\bbenchmark\b/i,
  /\bcommit\b/i,
  /pull request/i,
  /\bpr\b/i,
  /\bpush\b/i,
  /\bbranch\b/i,
  /\bmerge\b/i,
  /\brebase\b/i,
  /\bcheckout\b/i,
  /\bci\b/i,
  /\bqa\b/i,
  /\bdeploy\b/i,
  /\bpublish\b/i,
  /\bteste(s)?\b/i,
  /\brodar teste(s)?\b/i,
  /\brodar eval/i,
  /\bcriar pr\b/i,
  /\babrir pr\b/i,
  /\bsubir branch\b/i,
  /\bmergear\b/i,
  /\bpublicar\b/i,
]

const REVENUECAT_PATTERNS = [
  /revenuecat/i,
  /\bentitlement/i,
  /\boffering/i,
  /\bsubscription/i,
  /\bsubscriber/i,
  /\bcustomer info/i,
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
  /\bcorrig/i,
  /\bconsert/i,
  /\bajust/i,
  /\batualiz/i,
  /\badicion/i,
  /\bremov/i,
  /\bcri(ar|e)\b/i,
  /\bnao abre\b/i,
  /\bn[aã]o abre\b/i,
  /\bbug\b/i,
  /\berro\b/i,
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
    const review = matchesAny(text, REVIEW_PATTERNS)
    const gptEscalation = matchesAny(text, GPT_ESCALATION_PATTERNS)
    const writing = matchesAny(text, WRITE_PATTERNS)
    const operate = matchesAny(text, OPERATE_PATTERNS)
    const implementation = matchesAny(text, IMPLEMENT_PATTERNS)
    const revenuecat = matchesAny(text, REVENUECAT_PATTERNS)
    const reviewOnly = review && !implementation

    let route: Route = "self"
    let followUp: Route | undefined
    let score = 1

    if (args.hasIndependentSubtasks) {
      route = "general"
      score = 4
      reasons.push("Multiple independent subtasks can run in parallel")
    } else if (reviewOnly && revenuecat) {
      route = "revenuecat-agent"
      followUp = "glm-reviewer"
      score = 5
      reasons.push("Task is review-only and RevenueCat-specific, so gather domain facts first and then run the default GLM review")
    } else if (reviewOnly && gptEscalation) {
      route = "glm-reviewer"
      followUp = "gpt-critic"
      score = 5
      reasons.push("Task is review-only and high-stakes, so it should start with GLM review and escalate to GPT if needed")
    } else if (implementation && operate) {
      route = "qwen-coder"
      followUp = "qwen-operator"
      score = 5
      reasons.push("Task needs both code changes and repo operations, so implementation should be delegated before operational follow-through")
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
      followUp = "glm-reviewer"
      score = 5
      reasons.push("Task combines large context with a requested review and should be compressed before GLM review")
    } else if (reviewOnly) {
      route = "glm-reviewer"
      score = 4
      reasons.push("Task asks for review-only work and should use the default GLM reviewer")
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
    } else if (operate) {
      route = "qwen-operator"
      score = 4
      reasons.push("Task is primarily operational: tests, evals, git workflow, or PR work")
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
    if (route === "glm-reviewer") hints.push("Use the Task/subagent flow with glm-reviewer and ask for findings, confidence level, and whether GPT escalation is needed")
    if (route === "gpt-critic") hints.push("Use the Task/subagent flow with gpt-critic only as escalation or explicit premium review")
    if (route === "qwen-coder") hints.push("Use the Task/subagent flow with qwen-coder and ask for a focused implementation with verification on the touched path")
    if (route === "qwen-operator") hints.push("Use the Task/subagent flow with qwen-operator for tests, evals, git operations, commits, pushes, and PR creation")
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
