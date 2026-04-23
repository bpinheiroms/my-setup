# OpenCode

Global OpenCode setup with a simple primary workflow, automatic routing to specialized subagents, and mandatory GPT review at the end of changed work.

## Files

- `opencode.json`
  - main config
  - default model
  - custom commands
- `AGENTS.md`
  - global communication rule set in ultra-terse mode
- `agents/`
  - agent definitions used by the workflow
- `plugins/rtk.ts`
  - plugin that rewrites shell commands with `rtk` to save tokens
- `tools/workflow-route.ts`
  - deterministic task router for subagents
- `WORKFLOW_DIAGRAM.md`
  - Excalidraw-oriented visual spec for explaining the workflow
- `package.json`
  - `@opencode-ai/plugin` dependency

## Primary Model

- default model: `opencode-go/kimi-k2.6`
- `small_model`: `opencode-go/minimax-m2.5`
- default agent: `auto`

## Daily Usage

For normal day-to-day work, use `auto`.

There is no custom `steps` cap on the main custom agents in this setup. They continue until the model stops or you interrupt the session.

That means:

- ask normal questions to `auto`
- ask for implementation through `auto`
- ask to run tests, evals, commits, and PRs through `auto`
- let `auto` decide when to call specialized subagents

Use manual commands such as `/code`, `/rca`, `/ctx`, `/draft`, or `/judge` only when you explicitly want to force a path.

## Workflow Diagram

```text
User
  |
  v
auto (Kimi)
  |
  +--> simple question? ------------------------> answer directly
  |
  +--> trivial task? ---------------------------> execute directly
  |
  +--> non-trivial task
         |
         v
    workflow-route
         |
         +--> self ------------> auto handles it
         +--> explore ---------> search repo -> back to auto
         +--> kimi-context ----> compress context -> back to auto
         +--> qwen-coder ------> implement focused fix -> back to auto
         +--> glm-analyzer ----> RCA / tradeoff -> back to auto
         +--> minimax-writer --> naming / copy / rewrite -> back to auto
         +--> gpt-critic ------> review-only / high-stakes -> back to auto
         +--> general ---------> parallel subtasks -> back to auto

After delegation, auto remains the owner of the flow:
- runs tests
- runs evals
- creates commits
- creates PRs
- answers the user

If any file changed during the flow:
- this is the normal implementation path
- auto must call `gpt-critic`
- auto does not call `gpt-critic` after every intermediate edit
- auto calls `gpt-critic` once on the completed state of the work
- if `gpt-critic` finds a material issue, auto fixes it
- auto calls `gpt-critic` again only if the final state changed again after the fix
- only then does auto finish, commit, or open a PR
```

## Custom Commands

- `/ship`
  - end-to-end implementation with the `auto` agent
- `/code`
  - forces `qwen-coder` for focused coding work
- `/rca`
  - forces `glm-analyzer` for root cause analysis
- `/ctx`
  - forces `kimi-context` to summarize large context
- `/draft`
  - forces `minimax-writer` for text, naming, and brainstorming
- `/judge`
  - forces `gpt-critic` for a second opinion or final review

## Agents

### `auto`

The main and only agent that should be needed for day-to-day work.

Responsibilities:

- answer simple questions directly
- execute normal repo tasks
- run tests, evals, commits, and PRs
- call subagents when the task stops being trivial
- always trigger `gpt-critic` once at the end of changed work before finishing
- use `gpt-critic` as the first specialist only for review-only requests

### `qwen-coder`

Used when the scope is clear and the work is localized code implementation.

Good for:

- contained fixes
- small to medium refactors
- direct implementation

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
- `minimax-writer`
- `general`

Main heuristics:

- search / repo navigation -> `explore`
- RCA / tradeoff / architecture -> `glm-analyzer`
- review-only / final review request / high-stakes review -> `gpt-critic`
- large context -> `kimi-context`
- localized implementation -> `qwen-coder`
- writing / naming -> `minimax-writer`
- parallel independent subtasks -> `general`

## Mental Model Of The Setup

1. Talk to `auto`
2. `auto` decides whether to answer directly or call `workflow-route`
3. If needed, it delegates to the right specialist
4. It integrates the result and continues execution

In short: default to `auto`, and force a specialist only when you intentionally want manual control.

Goal: simple UX for the user, strong specialization underneath.
