import { tool } from "@opencode-ai/plugin"

type Route =
  | "self"
  | "explore"
  | "gpt-planner-fast"
  | "gpt-planner"
  | "gpt-builder"
  | "gpt-critic"
  | "gpt-writer"
  | "general"

const SEARCH_PATTERNS = [/\bwhere\b/i, /\bfind\b/i, /\bsearch\b/i, /\blocate\b/i, /\bwhich file\b/i, /\bwhat uses\b/i, /\bgrep\b/i, /\bonde\b/i, /\bencontre\b/i, /\bprocure\b/i, /\blocalize\b/i, /\bqual arquivo\b/i]
const RCA_PATTERNS = [/\bwhy\b/i, /root cause/i, /\binvestigat/i, /\bdebug\b/i, /\bregression\b/i, /\bflaky\b/i, /\bcompare\b/i, /tradeoff/i, /\brisk\b/i, /architecture/i, /code review/i, /\bpor que\b/i, /causa raiz/i, /\binvestigue\b/i, /\bdepur/i, /arquitetura/i, /revis[aã]o de c[oó]digo/i]
const REVIEW_PATTERNS = [/second opinion/i, /final review/i, /double check/i, /sanity check/i, /adversarial review/i, /review\b/i, /judge/i, /segunda opini[aã]o/i, /revis[aã]o final/i, /revis[aã]o/i, /confere/i, /valida/i]
const GPT_ESCALATION_PATTERNS = [/tie[- ]?break/i, /high[- ]stakes/i, /production/i, /prod/i, /migration/i, /security/i, /compliance/i, /go[- ]live/i, /release/i, /launch/i, /payment/i, /billing/i, /iap/i, /finance/i, /payments/i]
const WRITE_PATTERNS = [/\bname\b/i, /naming/i, /rewrite/i, /copy/i, /brainstorm/i, /alternative/i, /wording/i, /title/i, /\bnome\b/i, /reescrev/i, /texto/i, /copywriting/i]
const IMPLEMENT_PATTERNS = [/\bimplement\b/i, /\bfix\b/i, /\bchange\b/i, /\bmudar\b/i, /\balterar\b/i, /\bmodificar\b/i, /\btrocar\b/i, /\bupdate\b/i, /\badd\b/i, /\bremove\b/i, /\bcreate\b/i, /\bpatch\b/i, /\bcorrig/i, /\bconsert/i, /\bajust/i, /\batualiz/i, /\badicion/i, /\bremov/i, /\bcri(ar|e)\b/i, /\bnao abre\b/i, /\bn[aã]o abre\b/i, /\bbug\b/i, /\berro\b/i]
const GRILL_PATTERNS = [/grill me/i, /stress[- ]?test/i, /challenge this/i, /pressure[- ]?test/i, /me desafie/i, /me questione/i, /stressar/i]

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text))
}

function confidence(score: number): "low" | "medium" | "high" {
  if (score >= 4) return "high"
  if (score >= 2) return "medium"
  return "low"
}

export default tool({
  description: "Route a task inside the custom GPT stack. GO routing is owned by Oh My OpenAgent.",
  args: {
    task: tool.schema.string().describe("Compact summary of the user request or current task"),
    profile: tool.schema.string().optional().describe("Workflow profile. Use this tool only for GPT/custom routing; GO uses Oh My OpenAgent."),
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
    const implementation = matchesAny(text, IMPLEMENT_PATTERNS)
    const grill = matchesAny(text, GRILL_PATTERNS)
    const scopedImplementation = implementation && scopeKnown
    const smallScopedImplementation = scopedImplementation && fileCount > 0 && fileCount <= 2 && !publicApiImpact && !stateOrSchemaImpact && !args.hasLongLogs && !args.hasLargeDiff && !args.hasLargeSpec
    const unknownImplementationScope = implementation && !scopeKnown
    const reviewOnly = review && !implementation
    const writingOnly = writing && !implementation

    let route: Route = "self"
    let followUp: Route | undefined
    let score = 1

    if (grill) {
      route = "self"
      score = 4
      reasons.push("Task asks for design or plan pressure-testing rather than immediate execution")
      hints.push("Load the `grill-me` skill and keep the conversation interactive")
    } else if (args.hasIndependentSubtasks) {
      route = "general"
      score = 4
      reasons.push("Multiple independent subtasks can run in parallel")
    } else if (reviewOnly) {
      route = gptEscalation ? "gpt-critic" : "self"
      score = gptEscalation ? 4 : 3
      reasons.push(gptEscalation ? "Task is review-only and high-stakes" : "Task is review-only without implementation")
    } else if (writingOnly) {
      route = "gpt-writer"
      score = 4
      reasons.push("Task is mainly naming, rewrite, copy, or ideation")
    } else if (unknownImplementationScope) {
      route = "explore"
      score = 4
      reasons.push("Task likely needs code changes but the real scope is not measured yet")
    } else if (largeContext && scopedImplementation) {
      route = "gpt-planner"
      followUp = "gpt-builder"
      score = 4
      reasons.push("Implementation task has heavy context and benefits from a written plan before execution")
    } else if (smallScopedImplementation) {
      route = "self"
      score = 4
      reasons.push("Implementation task is small and measured, so direct execution is preferable")
    } else if (scopedImplementation) {
      route = "gpt-planner"
      followUp = "gpt-builder"
      score = 4
      reasons.push("Implementation task has measured scope and benefits from separated planning and execution")
    } else if (search && !implementation && !rca) {
      route = "explore"
      score = 3
      reasons.push("Task is mainly repo discovery or code search")
    } else if (rca) {
      route = "gpt-planner"
      score = 4
      reasons.push("Task is root cause, debugging, architecture, or tradeoff analysis")
    } else {
      reasons.push("Task is simple enough for the current agent to handle directly")
    }

    if (route === "explore") hints.push("Use `explore` to gather file locations, rough scope, and concrete repo evidence before changing code")
    if (route === "gpt-planner") hints.push("If you use a separate executor, pass the plan plus touched files, constraints, and validation steps")
    if (route === "gpt-builder") hints.push("Keep the coding task narrow and concrete when handing it to `gpt-builder`")
    if (route === "gpt-critic") hints.push("Use GPT review for explicit premium review, second opinions, or high-stakes checks")
    if (route === "gpt-writer") hints.push("Ask for 3 to 5 ranked alternatives with short tradeoffs")
    if (route === "general") hints.push("Split only truly independent work and integrate the outputs in the parent thread")
    if (followUp) hints.push(`After ${route}, continue with ${followUp}`)
    if (implementation) hints.push("If requirements are still fuzzy after repo inspection, ask a few targeted questions before editing")

    return JSON.stringify({ profile: "gpt", route, followUp, confidence: confidence(score), reason: reasons.join("; "), hints }, null, 2)
  },
})
