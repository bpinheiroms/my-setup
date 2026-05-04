import { tool } from "@opencode-ai/plugin"

type Route =
  | "self"
  | "explore"
  | "go-planner"
  | "gpt-planner-fast"
  | "gpt-planner"
  | "go-analyzer"
  | "go-reviewer"
  | "gpt-builder"
  | "gpt-critic"
  | "gpt-writer"
  | "go-coder"
  | "go-operator"
  | "go-revenuecat-agent"
  | "go-writer"
  | "general"

type Profile = "go" | "gpt" | "any"

const SEARCH_PATTERNS = [/where/i, /find/i, /search/i, /locate/i, /which file/i, /what uses/i, /grep/i, /onde/i, /encontre/i, /procure/i, /localize/i, /qual arquivo/i]
const RCA_PATTERNS = [/why/i, /root cause/i, /investigat/i, /debug/i, /regression/i, /flaky/i, /compare/i, /tradeoff/i, /risk/i, /architecture/i, /code review/i, /por que/i, /causa raiz/i, /investigue/i, /depur/i, /arquitetura/i, /revis[aã]o de c[oó]digo/i]
const REVIEW_PATTERNS = [/second opinion/i, /final review/i, /double check/i, /sanity check/i, /adversarial review/i, /review/i, /judge/i, /segunda opini[aã]o/i, /revis[aã]o final/i, /revis[aã]o/i, /confere/i, /valida/i]
const GPT_ESCALATION_PATTERNS = [/tie[- ]?break/i, /high[- ]stakes/i, /production/i, /prod/i, /migration/i, /security/i, /compliance/i, /go[- ]live/i, /release/i, /launch/i, /payment/i, /billing/i, /iap/i, /finance/i, /payments/i]
const WRITE_PATTERNS = [/name/i, /naming/i, /rewrite/i, /copy/i, /brainstorm/i, /alternative/i, /wording/i, /title/i, /nome/i, /reescrev/i, /texto/i, /copywriting/i]
const OPERATE_PATTERNS = [/test(s)?/i, /eval(s)?/i, /benchmark/i, /commit/i, /pull request/i, /pr/i, /push/i, /branch/i, /merge/i, /rebase/i, /checkout/i, /ci/i, /qa/i, /deploy/i, /publish/i, /teste(s)?/i, /rodar teste(s)?/i, /rodar eval/i, /criar pr/i, /abrir pr/i, /subir branch/i, /mergear/i, /publicar/i]
const REVENUECAT_PATTERNS = [/revenuecat/i, /entitlement/i, /offering/i, /subscription/i, /subscriber/i, /customer info/i, /product id/i, /package(s)?/i, /purchase(s|d)?/i]
const IMPLEMENT_PATTERNS = [/implement/i, /fix/i, /change/i, /mudar/i, /alterar/i, /modificar/i, /trocar/i, /update/i, /add/i, /remove/i, /create/i, /patch/i, /corrig/i, /consert/i, /ajust/i, /atualiz/i, /adicion/i, /remov/i, /cri(ar|e)/i, /nao abre/i, /n[aã]o abre/i, /bug/i, /erro/i]
const GRILL_PATTERNS = [/grill me/i, /stress[- ]?test/i, /challenge this/i, /pressure[- ]?test/i, /me desafie/i, /me questione/i, /stressar/i]

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text))
}

function confidence(score: number): "low" | "medium" | "high" {
  if (score >= 4) return "high"
  if (score >= 2) return "medium"
  return "low"
}

function normalizeProfile(input?: string): Profile {
  if (input === "go" || input === "gpt") return input
  return "any"
}

function goRoute(kind: "planner" | "analyzer" | "reviewer" | "coder" | "operator" | "revenuecat" | "writer"): Route {
  return {
    planner: "go-planner",
    analyzer: "go-analyzer",
    reviewer: "go-reviewer",
    coder: "go-coder",
    operator: "go-operator",
    revenuecat: "go-revenuecat-agent",
    writer: "go-writer",
  }[kind] as Route
}

export default tool({
  description: "Route a task to the best GPT or GO workflow without extra ceremony.",
  args: {
    task: tool.schema.string().describe("Compact summary of the user request or current task"),
    profile: tool.schema.string().optional().describe("Workflow profile: go, gpt, or omit for generic/manual routing"),
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
    const smallScopedImplementation = scopedImplementation && fileCount > 0 && fileCount <= 2 && !publicApiImpact && !stateOrSchemaImpact && !args.hasLongLogs && !args.hasLargeDiff && !args.hasLargeSpec
    const unknownImplementationScope = implementation && !scopeKnown
    const reviewOnly = review && !implementation
    const writingOnly = writing && !implementation
    const goOnly = profile === "go"
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
    } else if (reviewOnly && goOnly && revenuecat) {
      route = goRoute("revenuecat")
      followUp = goRoute("reviewer")
      score = 5
      reasons.push("Task is review-only and RevenueCat-specific in the GO workflow")
    } else if (reviewOnly && gptOnly) {
      route = "gpt-critic"
      score = 4
      reasons.push("Task is review-only inside the GPT workflow")
    } else if (gptOnly && writingOnly) {
      route = "gpt-writer"
      score = 4
      reasons.push("Task is mainly naming, rewrite, copy, or ideation inside the GPT workflow")
    } else if (reviewOnly && gptEscalation) {
      route = goOnly ? goRoute("reviewer") : "gpt-critic"
      score = 4
      reasons.push("Task is review-only and high-stakes")
    } else if (reviewOnly) {
      route = goOnly ? goRoute("reviewer") : "self"
      score = 3
      reasons.push("Task is review-only without implementation")
    } else if (unknownImplementationScope) {
      route = "explore"
      score = 4
      reasons.push("Task likely needs code changes but the real scope is not measured yet")
    } else if (goOnly && smallScopedImplementation) {
      route = goRoute("coder")
      score = 5
      reasons.push("GO implementation task is small and measured, so direct execution is faster than planning")
    } else if (goOnly && scopedImplementation) {
      route = goRoute("planner")
      followUp = goRoute("coder")
      score = 5
      reasons.push("GO implementation task has measured scope and benefits from an explicit plan")
    } else if (gptOnly && largeContext && scopedImplementation) {
      route = "gpt-planner"
      followUp = "gpt-builder"
      score = 4
      reasons.push("GPT implementation task has heavy context and benefits from a written plan before execution")
    } else if (gptOnly && smallScopedImplementation) {
      route = "self"
      score = 4
      reasons.push("GPT implementation task is small and measured, so direct execution is preferable")
    } else if (gptOnly && scopedImplementation) {
      route = "gpt-planner"
      followUp = "gpt-builder"
      score = 4
      reasons.push("GPT implementation task has measured scope and benefits from separated planning and execution")
    } else if (goOnly && revenuecat) {
      route = goRoute("revenuecat")
      score = 4
      reasons.push("Task is RevenueCat-specific and should use the dedicated MCP specialist")
    } else if (goOnly && writingOnly) {
      route = goRoute("writer")
      score = 4
      reasons.push("Task is mainly naming, rewrite, or copy work")
    } else if (goOnly && operate) {
      route = goRoute("operator")
      score = 4
      reasons.push("Task is primarily operational in the GO workflow")
    } else if (goOnly && search && !implementation && !rca) {
      route = "explore"
      score = 3
      reasons.push("Task is mainly repo discovery or code search")
    } else if (goOnly && rca) {
      route = goRoute("analyzer")
      score = 4
      reasons.push("Task is root cause, debugging, architecture, or tradeoff analysis")
    } else if (search && !implementation && !rca) {
      route = "explore"
      score = 3
      reasons.push("Task is mainly repo discovery or code search")
    } else {
      reasons.push("Task is simple enough for the current agent to handle directly")
    }

    if (route === "explore") hints.push("Use `explore` to gather file locations, rough scope, and concrete repo evidence before changing code")
    if (route === "go-planner") hints.push("After planning, hand execution to `go-coder` with the plan, constraints, and expected validation")
    if (route === "gpt-planner") hints.push("If you use a separate executor, pass the plan plus touched files, constraints, and validation steps")
    if (route === "gpt-builder") hints.push("Keep the coding task narrow and concrete when handing it to `gpt-builder`")
    if (route === "go-analyzer") hints.push("Ask for root cause, evidence, fix options, and residual risks")
    if (route === "go-reviewer") hints.push("Run review on the final changed state, not on intermediate edits")
    if (route === "gpt-critic") hints.push("Use GPT review for explicit premium review, second opinions, or high-stakes checks")
    if (route === "gpt-writer") hints.push("Ask for 3 to 5 ranked alternatives with short tradeoffs")
    if (route === "go-coder") hints.push("Keep the coding scope narrow and attach any touched-file evidence you already have")
    if (route === "go-operator") hints.push("Use it for tests, evals, git workflow, commit, push, and PR work")
    if (route === "go-revenuecat-agent") hints.push("Prefer MCP tool usage over guessing product, entitlement, or subscriber state")
    if (route === "go-writer") hints.push("Ask for 3 to 5 ranked alternatives with short tradeoffs")
    if (route === "general") hints.push("Split only truly independent work and integrate the outputs in the parent thread")
    if (followUp) hints.push(`After ${route}, continue with ${followUp}`)
    if (implementation) hints.push("If requirements are still fuzzy after repo inspection, ask a few targeted questions before editing")

    return JSON.stringify({ profile, route, followUp, confidence: confidence(score), reason: reasons.join("; "), hints }, null, 2)
  },
})
