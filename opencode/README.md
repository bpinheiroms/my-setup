# OpenCode

OpenCode global setup with four explicit provider-isolated orchestrators:

- `gpt-orchestrator`
  - primary GPT workflow
  - uses only `openai/*`
- `go-orchestrator`
  - secondary opencode-go workflow
  - uses only `opencode-go/*`
- `router-orchestrator`
  - OpenRouter fallback workflow
  - uses only `openrouter/*`
- `fw-orchestrator`
  - Fireworks AI fallback workflow
  - uses only `fireworks-ai/*`

## Provider Isolation Rule

Every orchestrator may call only models from its own provider.

- GPT -> `openai/*`
- GO -> `opencode-go/*`
- Router -> `openrouter/*`
- Fireworks -> `fireworks-ai/*`

This rule also applies to subagents. If a Router orchestrator delegates, it must call only `router-*` subagents backed by `openrouter/*` models. The same rule applies to GO and Fireworks.

## Fallback Chain

```text
GPT (primary) -> GO (secondary) -> Router / Fireworks (fallbacks)
```

## Files

- `opencode.json`
  - main config
  - default model and default agent
  - provider-specific commands
- `AGENTS.md`
  - global rules shared by all orchestrators
  - provider boundaries and execution rules
- `agents/`
  - primary orchestrators and provider-specific subagents
- `skills/grill-me/SKILL.md`
  - stress-test skill for plans and designs
- `plugins/rtk.ts`
  - optional command rewrite plugin
- `tools/workflow-route.ts`
  - deterministic router with `go`, `gpt`, `router`, and `fw` profiles

## Primary Orchestrators

### `gpt-orchestrator`

Use when:

- OpenAI quota is available
- you want the most interactive workflow
- GPT judgment is the priority

Behavior:

- works directly in the current thread by default
- asks clarifying questions early when needed
- delegates only to `gpt-*` subagents

### `go-orchestrator`

Use when:

- OpenAI quota is unavailable or you want to save it
- you want a strong specialized open-model path

Behavior:

- delegates only to `go-*` subagents
- keeps all execution inside the `opencode-go/*` provider

### `router-orchestrator`

Use when:

- you want or need to run through OpenRouter
- you still want provider isolation even when delegating

Behavior:

- works directly by default
- may delegate only to `router-*` subagents
- keeps all execution inside the `openrouter/*` provider

### `fw-orchestrator`

Use when:

- you want or need to run through Fireworks AI
- you still want provider isolation even when delegating

Behavior:

- works directly by default
- may delegate only to `fw-*` subagents
- keeps all execution inside the `fireworks-ai/*` provider

## Choosing a Mode

OpenCode supports:

- switching primary agents in-session
- targeting a specific agent via commands
- mentioning subagents directly with `@`

Practical guidance:

- start with `gpt-orchestrator`
- switch to `go-orchestrator` when GPT quota is unavailable
- switch to `router-orchestrator` or `fw-orchestrator` when you need those providers specifically

References:

- [Agents](https://opencode.ai/docs/agents/)
- [Config](https://opencode.ai/docs/config/)
- [Commands](https://opencode.ai/docs/commands/)
- [Skills](https://opencode.ai/docs/skills/)

## Commands

- `/gpt` -> `gpt-orchestrator`
- `/go` -> `go-orchestrator`
- `/router` -> `router-orchestrator`
- `/fw` -> `fw-orchestrator`
- `/go-rca`, `/router-rca`, `/fw-rca` -> provider-specific RCA
- `/go-review`, `/router-review`, `/fw-review` -> provider-specific final review
- `/go-ops`, `/router-ops`, `/fw-ops` -> provider-specific operational workflows
- `/code-gpt` -> GPT coding pass
- `/go-code`, `/router-code`, `/fw-code` -> provider-specific coding pass

## Skills

### `grill-me`

Purpose:

- challenge a plan before implementation
- surface missing assumptions
- force clearer decisions on scope, rollout, and validation

Behavior:

- asks one question at a time
- includes a recommended answer with each question
- checks the repo first if the answer may already exist there

Use it when you want the model to push back instead of executing immediately.

## Installation

This repository stores OpenCode configuration, not the OpenCode binary.

### Prerequisites

- OpenCode installed
- provider authentication already configured
- `bun` or `npm` available for the local plugin dependency

### Install

```bash
mkdir -p ~/.config/opencode
rsync -a opencode/ ~/.config/opencode/
cd ~/.config/opencode && bun install
```

If you do not use Bun:

```bash
cd ~/.config/opencode && npm install
```

### Verify

```bash
opencode debug config
opencode agent list
```

Expected result:

- default agent is `gpt-orchestrator`
- custom primary agents include `gpt-orchestrator`, `go-orchestrator`, `router-orchestrator`, and `fw-orchestrator`
- the `grill-me` skill is discoverable
- provider-specific commands are visible

## Design Notes

- default model is `openai/gpt-5.4`
- provider isolation is strict across orchestrators and subagents
- shared orchestration rules live in `AGENTS.md`
- `workflow-route.ts` returns provider-specific routes instead of generic open-model routes
