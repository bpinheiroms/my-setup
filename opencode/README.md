# OpenCode

Global OpenCode setup with a primary orchestration workflow, automatic routing to specialized subagents, GPT planning for large implementation work, and a default GLM final review with GPT escalation only when needed.

## Files

- `opencode.json`
  - main config
  - default model
  - custom commands
  - MCP server definitions
- `AGENTS.md`
  - global communication rule set in ultra-terse mode
- `agents/`
  - agent definitions used by the workflow
- `plugins/rtk.ts`
  - plugin that rewrites shell commands with `rtk` to save tokens
- `tools/workflow-route.ts`
  - deterministic task router for subagents
- `WORKFLOW_DIAGRAM.md`
  - Mermaid workflow diagram for explaining the setup visually
- `package.json`
  - `@opencode-ai/plugin` dependency

## Primary Model

- default model: `opencode-go/kimi-k2.6`
- `small_model`: `opencode-go/deepseek-v4-flash`
- default agent: `auto`

## Configured MCP Servers

### `revenuecat`

- type: `remote`
- url: `https://mcp.revenuecat.ai/mcp`
- enabled: `true`

This repository stores the MCP server entry, not the secret key used to authenticate against RevenueCat.

If authentication is required on a new machine, complete it locally after restoring the OpenCode config.

This setup intentionally isolates RevenueCat from the default `auto` toolset:

- `revenuecat_*` tools are disabled globally
- only `revenuecat-agent` can use them

This keeps the default Kimi workflow stable while still making RevenueCat available through a dedicated specialist.

## Model Roles In Practice

- `Kimi 2.6`
  - orchestrates
  - reads context
  - sequences the work
  - integrates specialist outputs
- `MiMo v2.5 Pro`
  - writes code
  - handles focused implementation work and contained code changes
- `DeepSeek V4 Flash`
  - handles repo operations
  - tests, evals, commits, pushes, and PR creation
- `GLM-5`
  - investigates root causes and tradeoffs
  - performs the default final review
- `MiniMax M2.7`
  - handles naming, rewrites, copy, and brainstorming
- `GPT-5.4`
  - plans large or high-impact implementation work before execution
  - handles escalation review after GLM when needed
  - runs at `reasoningEffort: medium`

## Actual Runtime Decision Tree

In normal usage, this is the practical decision tree:

- simple question
  - `auto` answers directly
- repo discovery or file lookup
  - `explore`
- root cause analysis, tradeoffs, risk investigation
  - `glm-analyzer`
- focused code changes and contained implementation work
  - `mimo-coder`
- implementation with unclear scope
  - `explore`
- large or high-impact implementation planning
  - `gpt-planner`
- tests, evals, git operations, commit, push, PR
  - `deepseek-operator`
- large logs, large diffs, large specs, heavy context compression
  - `kimi-context`
- naming, copy, rewrite, brainstorming
  - `minimax-writer`
- RevenueCat-specific work
  - `revenuecat-agent`
- final review of completed changed work
  - `glm-reviewer`
- high-risk or low-confidence final review escalation
  - `gpt-critic`

Combined flows usually look like this:

- code change + repo ops
  - `mimo-coder` -> `deepseek-operator` -> `glm-reviewer`
- contained implementation change
  - `explore` -> `mimo-coder` -> `deepseek-operator` when needed -> `glm-reviewer`
- large implementation or high-impact change
  - `explore` -> `gpt-planner`, or `kimi-context` -> `gpt-planner` when the context is already large -> `mimo-coder` -> `deepseek-operator` when needed -> `glm-reviewer` -> `gpt-critic` only if escalation is needed
- large-context bug
  - `kimi-context` -> `glm-analyzer` -> `mimo-coder` -> `deepseek-operator` -> `glm-reviewer`
- payments / RevenueCat / billing
  - `revenuecat-agent` or `kimi-context` -> `glm-reviewer` -> `gpt-critic` if escalation is needed

## Installation

This repository stores the OpenCode configuration, not the OpenCode binary itself.

### Prerequisites

- OpenCode installed on the machine
- provider authentication already configured (`opencode providers`)
- `bun` or `npm` available to install the local plugin dependency

### Install On macOS/Linux

Create the target directory:

```bash
mkdir -p ~/.config/opencode
```

Copy the contents of this folder into the OpenCode config directory:

```bash
rsync -a opencode/ ~/.config/opencode/
```

Install the local dependency used by the custom tool/plugin setup:

```bash
cd ~/.config/opencode && bun install
```

If you do not use Bun:

```bash
cd ~/.config/opencode && npm install
```

### What Gets Installed

- `opencode.json`
- `AGENTS.md`
- `agents/`
- `plugins/`
- `tools/`
- local package dependency for `@opencode-ai/plugin`
- configured MCP server definitions from `opencode.json`

### Verify The Setup

Run:

```bash
opencode debug config
opencode agent list
```

Expected result:

- default agent is `auto`
- main model is `opencode-go/kimi-k2.6`
- the custom agents are visible in resolved config
- the `revenuecat` MCP server appears in the resolved config

### MCP Authentication Notes

RevenueCat is configured here as a remote MCP server.

If the server requires authentication on your machine, use the local OpenCode MCP flow after restoring the config:

```bash
opencode mcp list
opencode mcp auth revenuecat
```

If you are using API-key-based authentication instead of OAuth, keep the key out of the repository and configure it only on the local machine.

### Updating An Existing Setup

If you already have a local OpenCode config, back it up first:

```bash
mv ~/.config/opencode ~/.config/opencode.backup
mkdir -p ~/.config/opencode
rsync -a opencode/ ~/.config/opencode/
cd ~/.config/opencode && bun install
```

If you want to merge instead of replacing, review `opencode.json`, `agents/`, `plugins/`, and `tools/` carefully before copying.

## Daily Usage

For normal day-to-day work, use `auto`.

There is no custom `steps` cap on the main custom agents in this setup. They continue until the model stops or you interrupt the session.

That means:

- ask normal questions to `auto`
- ask for implementation through `auto`
- ask to run tests, evals, commits, and PRs through `auto`
- let `auto` decide when to call specialized subagents

In this setup, `auto` is orchestrator-first, not the default hands-on executor.

Use manual commands such as `/code`, `/ops`, `/rca`, `/review`, `/ctx`, `/plan`, `/draft`, `/revenuecat`, or `/judge` only when you explicitly want to force a path.

## Workflow Diagram

See [`WORKFLOW_DIAGRAM.md`](WORKFLOW_DIAGRAM.md) for the Mermaid version.

## Custom Commands

- `/ship`
  - end-to-end implementation with the `auto` agent
- `/code`
  - forces `mimo-coder` for focused coding work
- `/ops`
  - forces `deepseek-operator` for tests, evals, commits, pushes, and PRs
- `/rca`
  - forces `glm-analyzer` for root cause analysis
- `/review`
  - forces `glm-reviewer` for the default final review path
- `/ctx`
  - forces `kimi-context` to summarize large context
- `/plan`
  - forces `gpt-planner` to create a large-implementation execution plan
- `/draft`
  - forces `minimax-writer` for text, naming, and brainstorming
- `/revenuecat`
  - forces `revenuecat-agent` for RevenueCat MCP work
- `/judge`
  - forces `gpt-critic` for a second opinion or final review

## Agents

### `auto`

The main and only agent that should be needed for day-to-day work.

Responsibilities:

- answer simple questions directly
- route non-trivial work to the right specialist
- integrate specialist outputs
- keep the overall workflow moving
- always trigger `glm-reviewer` once at the end of changed work before finishing
- use `gpt-critic` only when escalation is needed or explicitly requested

It is intentionally orchestration-first, not the default code-writing or git-driving agent.

### `mimo-coder`

Used when the scope is clear and the work is localized code implementation.

Good for:

- contained fixes
- contained implementation work after quick repo triage
- direct implementation

### `gpt-planner`

Used when implementation work is large or high-impact enough that planning quality matters more than raw execution speed.

Good for:

- multi-file implementation work
- broad implementation tasks
- architecture and boundary changes
- shared contract moves
- cache, store, navigation, schema, or migration-sensitive work
- producing a binding execution plan for `mimo-coder`

### `deepseek-operator`

Used for operational repo work.

Good for:

- tests
- evals
- git status and diff checks
- commits
- pushes
- PR creation

### `kimi-context`

Used when there is too much context for the primary agent to process efficiently.

Good for:

- long logs
- large diffs
- large specs
- cross-file reading

### `glm-analyzer`

Used when a stricter investigation is needed.

Good for:

- RCA
- tradeoffs
- hard bugs
- risk analysis

### `glm-reviewer`

Used as the default final reviewer for changed work.

Good for:

- final review of completed changes
- correctness checks
- regression spotting
- merge-readiness review

### `minimax-writer`

Used for language and alternatives.

Good for:

- naming
- copy
- rewrites
- brainstorming

### `gpt-critic`

Used as a strong escalation reviewer, not as the default final reviewer.

Good for:

- second opinions
- security / migration / release checks
- payments / billing / RevenueCat-critical review
- tie-breaking between good approaches

Runtime note:

- `gpt-critic` uses `reasoningEffort: medium`
- this is intentional to reduce 5-hour window pressure compared with `xhigh`

### `revenuecat-agent`

Used for RevenueCat-specific questions through the isolated MCP integration.

Good for:

- offerings and packages
- entitlements and access state
- customer info and subscription status
- purchase history questions
- paywall and product mapping questions

## `rtk` Plugin

`plugins/rtk.ts` intercepts `bash` / `shell` calls and tries to rewrite the command through `rtk rewrite`.

Goal:

- reduce tokens spent on verbose shell commands
- keep a single source of truth for command rewrite rules inside `rtk`

If `rtk` is not available in `PATH`, the plugin disables itself without breaking the session.

## `workflow-route` Tool

Custom tool for deterministic routing of non-trivial tasks.

Possible routes:

- `self`
- `explore`
- `gpt-planner`
- `glm-analyzer`
- `glm-reviewer`
- `gpt-critic`
- `kimi-context`
- `mimo-coder`
- `deepseek-operator`
- `revenuecat-agent`
- `minimax-writer`
- `general`

Main heuristics:

- search / repo navigation -> `explore`
- implementation with unclear scope -> `explore` first, then decide with repo evidence
- after `explore`, rerun `workflow-route` with `scopeKnown=true` when you want the router to use measured scope instead of text
- RCA / tradeoff / architecture -> `glm-analyzer`
- default review-only / final review -> `glm-reviewer`
- large or high-impact implementation with known scope -> `gpt-planner`, or `kimi-context` -> `gpt-planner` when the context is heavy
- GPT only on escalation or explicit premium review
- large context -> `kimi-context`
- localized implementation and contained implementation work -> `mimo-coder`
- tests / evals / git / PR work -> `deepseek-operator`
- RevenueCat-specific work -> `revenuecat-agent`
- writing / naming -> `minimax-writer`
- parallel independent subtasks -> `general`

## Mental Model Of The Setup

1. Talk to `auto`
2. `auto` decides whether to answer directly or call `workflow-route`
3. If needed, it delegates to the right specialist
4. It integrates the result and continues execution

In short: default to `auto`, and force a specialist only when you intentionally want manual control.

Goal: simple UX for the user, strong specialization underneath, and better OpenCode Go budget usage by keeping Kimi in the orchestrator role as much as possible.
