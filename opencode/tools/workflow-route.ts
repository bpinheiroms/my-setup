import { tool } from "@opencode-ai/plugin"

type Route =
  | "self"
  | "explore"
  | "open-planner"
  | "gpt-planner-fast"
  | "gpt-planner"
  | "glm-analyzer"
  | "glm-reviewer"
  | "gpt-builder"
  | "gpt-critic"
  | "kimi-context"
  | "mimo-coder"
  | "deepseek-operator"
  | "revenuecat-agent"
  | "minimax-writer"
  | "general"

type Profile = "open" | "gpt" | "any"

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
  /\bchange\b/i,
  /\bmudar\b/i,
  /\balterar\b/i,
  /\bmodificar\b/i,
  /\btrocar\b/i,
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

const GRILL_PATTERNS = [
  /grill me/i,
  /stress[- ]?test/i,
  /challenge this/i,
  /pressure[- ]?test/i,
  /me desafie/i,
  /me questione/i,
  /stressar/i,
]

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text))
}

function confidence(score: number): "low" | "medium" | "high" {
  if (score >= 4) return "high"
  if (score >= 2) return "medium"
  return "low"
}

function normalizeProfile(input?: string): Profile {
  if (input === "open" || input === "gpt") return input
  return "any"
}

export default tool({
  description:
    "Deterministically route a user task to the best workflow for the active profile. Supports open-only and GPT-only orchestration without forcing extra ceremony.",
  args: {
    task: tool.schema.string().describe("Compact summary of the user request or current task"),
    profile: tool.schema
      .string()
      .optional()
      .describe("Workflow profile: open, gpt, or omit for generic/manual routing"),
    fileCount: tool.schema.number().int().nonnegative().optional().describe("Approximate number of relevant files"),
    scopeKnown: tool.schema.boolean().optional().describe("True when implementation scope was already measured from repo evidence rather than guessed from wording"),
    publicApiImpact: tool.schema.boolean().optional().describe("True when the change affects a public API, shared contract, or boundary"),
    stateOrSchemaImpact: tool.schema.boolean().optional().describe("True when the change affects state, cache, navigation, database, or schema behavior"),
    hasLongLogs: tool.schema.boolean().optional().describe("True when logs are long or noisy"),
    hasLargeDiff: tool.schema.boolean().optional().describe("True when the diff or change set is large"),
    hasLargeSpec: tool.schema.boolean().optional().describe("True when there is a long spec, RFC, or document"),
    hasIndependentSubtasks: tool.schema.boolean().optional().describe("True when multiple independent subtasks can run in parallel"),
  },
  async execute(args) {
    const text = args.task.trim()
    const profile = normalizeProfile(args.profile)
    const reasons: string[] = []
    const hints: string[] = []
    const fileCount = args.fileCount ?? 0
    const scopeKnown = Boolean(args.scopeKnown)
    const publicApiImpact = Boolean(args.publicApiImpact)
    const stateOrSchemaImpact = Boolean(args.stateOrSchemaImpact)
    const largeContext = Boolean(args.hasLongLogs || args.hasLargeDiff || args.hasLargeSpec || fileCount >= 8)
    const search = matchesAny(text, SEARCH_PATTERNS)
    const rca = matchesAny(text, RCA_PATTERNS)
    const review = matchesAny(text, REVIEW_PATTERNS)
    const gptEscalation = matchesAny(text, GPT_ESCALATION_PATTERNS)
    const writing = matchesAny(text, WRITE_PATTERNS)
    const operate = matchesAny(text, OPERATE_PATTERNS)
    const implementation = matchesAny(text, IMPLEMENT_PATTERNS)
    const revenuecat = matchesAny(text, REVENUECAT_PATTERNS)
    const grill = matchesAny(text, GRILL_PATTERNS)
    const scopedImplementation = implementation && scopeKnown
    const smallScopedImplementation =
      scopedImplementation &&
      fileCount > 0 &&
      fileCount <= 2 &&
      !publicApiImpact &&
      !stateOrSchemaImpact &&
      !args.hasLongLogs &&
      !args.hasLargeDiff &&
      !args.hasLargeSpec
    const unknownImplementationScope = implementation && !scopeKnown
    const reviewOnly = review && !implementation
    const writingOnly = writing && !implementation
    const openOnly = profile === "open"
    const gptOnly = profile === "gpt"

    let route: Route = "self"
    let followUp: Route | undefined
    let score = 1

    if (grill) {
      route = "self"
      score = 4
      reasons.push("Task asks for design or plan pressure-testing rather than immediate execution")
      hints.push("Load the `grill-me` skill and keep the conversation interactive")
    } else if (args.hasIndependentSubtasks && !gptOnly) {
      route = "general"
      score = 4
      reasons.push("Multiple independent subtasks can run in parallel")
    } else if (reviewOnly && openOnly && revenuecat) {
      route = "revenuecat-agent"
      followUp = "glm-reviewer"
      score = 5
      reasons.push("Task is review-only and RevenueCat-specific in the open-only workflow")
    } else if (reviewOnly && gptOnly) {
      route = "gpt-critic"
      score = 4
      reasons.push("Task is review-only inside the GPT-only workflow")
    } else if (reviewOnly && gptEscalation) {
      route = openOnly ? "glm-reviewer" : "gpt-critic"
      score = 4
      reasons.push("Task is review-only and high-stakes")
    } else if (reviewOnly) {
      route = openOnly ? "glm-reviewer" : "self"
      score = 3
      reasons.push("Task is review-only without implementation")
    } else if (unknownImplementationScope) {
      route = "explore"
      score = 4
      reasons.push("Task likely needs code changes but the real scope is not measured yet")
    } else if (openOnly && scopedImplementation && largeContext) {
      route = "kimi-context"
      followUp = "open-planner"
      score = 5
      reasons.push("Open-only implementation task has measured scope and heavy context")
    } else if (openOnly && smallScopedImplementation) {
      route = "mimo-coder"
      score = 5
      reasons.push("Open-only implementation task is small and measured, so direct execution is faster than planning")
    } else if (openOnly && scopedImplementation) {
      route = "open-planner"
      followUp = "mimo-coder"
      score = 5
      reasons.push("Open-only implementation task has measured scope and benefits from an explicit plan")
    } else if (gptOnly && largeContext && scopedImplementation) {
      route = "gpt-planner"
      followUp = "gpt-builder"
      score = 4
      reasons.push("GPT-only implementation task has heavy context and benefits from a written plan before execution")
    } else if (gptOnly && smallScopedImplementation) {
      route = "self"
      score = 4
      reasons.push("GPT-only implementation task is small and measured, so direct execution is preferable")
    } else if (gptOnly && scopedImplementation) {
      route = "gpt-planner"
      followUp = "gpt-builder"
      score = 4
      reasons.push("GPT-only implementation task has measured scope and benefits from separated planning and execution")
    } else if (openOnly && largeContext && rca) {
      route = "kimi-context"
      followUp = "glm-analyzer"
      score = 5
      reasons.push("Open-only RCA task has large context and should be compressed first")
    } else if (openOnly && revenuecat) {
      route = "revenuecat-agent"
      score = 4
      reasons.push("Task is RevenueCat-specific and should use the dedicated MCP specialist")
    } else if (openOnly && writingOnly) {
      route = "minimax-writer"
      score = 4
      reasons.push("Task is mainly naming, rewrite, or copy work")
    } else if (openOnly && operate) {
      route = "deepseek-operator"
      score = 4
      reasons.push("Task is primarily operational in the open-only workflow")
    } else if (openOnly && largeContext) {
      route = "kimi-context"
      score = 4
      reasons.push("Task has large context and should be compressed first")
    } else if (openOnly && search && !implementation && !rca) {
      route = "explore"
      score = 3
      reasons.push("Task is mainly repo discovery or code search")
    } else if (openOnly && rca) {
      route = "glm-analyzer"
      score = 4
      reasons.push("Task is root cause, debugging, architecture, or tradeoff analysis")
    } else if (search && !implementation && !rca) {
      route = "explore"
      score = 3
      reasons.push("Task is mainly repo discovery or code search")
    } else {
      reasons.push("Task is simple enough for the current agent to handle directly")
    }

    if (route === "explore")
      hints.push("Use `explore` to gather file locations, rough scope, and concrete repo evidence before changing code")
    if (route === "open-planner")
      hints.push("After planning, hand execution to `mimo-coder` with the plan, constraints, and expected validation")
    if (route === "gpt-planner-fast")
      hints.push("Use the short GPT planning path only when a brief written plan will reduce mistakes more than it slows you down")
    if (route === "gpt-planner")
      hints.push("If you use a separate executor, pass the plan plus touched files, constraints, and validation steps")
    if (route === "gpt-builder")
      hints.push("Keep the coding task narrow and concrete when handing it to `gpt-builder`")
    if (route === "glm-analyzer")
      hints.push("Ask for root cause, evidence, fix options, and residual risks")
    if (route === "glm-reviewer")
      hints.push("Run review on the final changed state, not on intermediate edits")
    if (route === "gpt-critic")
      hints.push("Use GPT review for explicit premium review, second opinions, or high-stakes checks")
    if (route === "kimi-context")
      hints.push("Ask for compressed summary, key facts, open questions, and recommended next actions")
    if (route === "mimo-coder")
      hints.push("Keep the coding scope narrow and attach any touched-file evidence you already have")
    if (route === "deepseek-operator")
      hints.push("Use it for tests, evals, git workflow, commit, push, and PR work")
    if (route === "revenuecat-agent")
      hints.push("Prefer MCP tool usage over guessing product, entitlement, or subscriber state")
    if (route === "minimax-writer")
      hints.push("Ask for 3 to 5 ranked alternatives with short tradeoffs")
    if (route === "general")
      hints.push("Split only truly independent work and integrate the outputs in the parent thread")
    if (followUp) hints.push(`After ${route}, continue with ${followUp}`)
    if (implementation)
      hints.push("If requirements are still fuzzy after repo inspection, ask a few targeted questions before editing")

    return JSON.stringify(
      {
        profile,
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
