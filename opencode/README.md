# OpenCode

Global OpenCode setup with a primary orchestration workflow, automatic routing to specialized subagents, and mandatory GPT review at the end of changed work.

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
- `small_model`: `opencode-go/minimax-m2.5`
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
- `Qwen 3.6 Plus`
  - writes code
  - handles focused implementation work
- `Qwen 3.5 Plus`
  - handles repo operations
  - tests, evals, commits, pushes, and PR creation
- `GLM-5`
  - investigates root causes and tradeoffs
- `MiniMax M2.7`
  - handles naming, rewrites, copy, and brainstorming
- `GPT-5.4`
  - reviews the final changed state

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

Use manual commands such as `/code`, `/ops`, `/rca`, `/ctx`, `/draft`, `/revenuecat`, or `/judge` only when you explicitly want to force a path.

## Workflow Diagram

See [`WORKFLOW_DIAGRAM.md`](WORKFLOW_DIAGRAM.md) for the Mermaid version.

## Custom Commands

- `/ship`
  - end-to-end implementation with the `auto` agent
- `/code`
  - forces `qwen-coder` for focused coding work
- `/ops`
  - forces `qwen-operator` for tests, evals, commits, pushes, and PRs
- `/rca`
  - forces `glm-analyzer` for root cause analysis
- `/ctx`
  - forces `kimi-context` to summarize large context
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
- always trigger `gpt-critic` once at the end of changed work before finishing
- use `gpt-critic` as the first specialist only for review-only requests

It is intentionally orchestration-first, not the default code-writing or git-driving agent.

### `qwen-coder`

Used when the scope is clear and the work is localized code implementation.

Good for:

- contained fixes
- small to medium refactors
- direct implementation

### `qwen-operator`

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

### `minimax-writer`

Used for language and alternatives.

Good for:

- naming
- copy
- rewrites
- brainstorming

### `gpt-critic`

Used as a strong reviewer, not as the default executor. It is also the mandatory final reviewer for changed work in this workflow.

Good for:

- mandatory final review after changed work is complete
- second opinions
- final review before answering
- security / migration / release checks
- tie-breaking between good approaches

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
- `glm-analyzer`
- `gpt-critic`
- `kimi-context`
- `qwen-coder`
- `qwen-operator`
- `revenuecat-agent`
- `minimax-writer`
- `general`

Main heuristics:

- search / repo navigation -> `explore`
- RCA / tradeoff / architecture -> `glm-analyzer`
- review-only / final review request / high-stakes review -> `gpt-critic`
- large context -> `kimi-context`
- localized implementation -> `qwen-coder`
- tests / evals / git / PR work -> `qwen-operator`
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
