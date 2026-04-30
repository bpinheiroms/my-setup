# OpenCode

OpenCode global setup split into 3 explicit modes:

- `manual-direct`
  - minimal harness
  - direct interaction in the current thread
  - high-quality direct mode on the open-model path
- `open-orchestrator`
  - orchestration using only `opencode-go/*` models
  - better fit when you want specialization without spending GPT
  - tuned for quality first, not lowest cost
- `gpt-orchestrator`
  - GPT-only workflow
  - more interactive and less ceremonial than the old harness

This replaces the old single-auto workflow.

## Why This Structure

The previous setup had three problems:

- GPT planning was forced too often
- the primary agent asked too few questions before executing
- too much time was spent orchestrating instead of either coding directly or asking for clarification

The new rule is simpler:

- direct mode for hands-on work
- open orchestration when you want multi-model specialization without GPT
- GPT orchestration when you want GPT judgment without open-model routing

## Files

- `opencode.json`
  - main config
  - default model and default agent
  - custom commands
- `AGENTS.md`
  - lightweight global rules shared by all modes
- `agents/`
  - primary and subagent definitions
- `skills/grill-me/SKILL.md`
  - stress-test skill for plans and designs
- `plugins/rtk.ts`
  - optional command rewrite plugin
- `tools/workflow-route.ts`
  - deterministic router with `profile=open` and `profile=gpt`

## Primary Modes

### `manual-direct`

Use when:

- you want direct conversation with the model
- you do not want automatic subagent orchestration
- the task is small or you want to steer every step

Behavior:

- works in the current thread
- asks a few questions only when needed
- does the work itself by default

### `open-orchestrator`

Use when:

- you want orchestration without spending GPT
- specialization is useful
- you want the strongest open-model path in this setup

Allowed model family:

- `opencode-go/*` only

Typical routing:

- repo discovery -> `explore`
- small measured implementation -> `qwen-coder`
- larger measured implementation -> `open-planner` -> `qwen-coder`
- RCA -> `glm-analyzer`
- final review -> `glm-reviewer`
- tests / git / PR -> `qwen-operator`
- huge context -> `kimi-context`

### `gpt-orchestrator`

Use when:

- you want GPT-only behavior
- you want more questions earlier
- you want less orchestration overhead than the old harness

Allowed model family:

- `openai/*` only

Typical behavior:

- executes directly in-thread by default
- asks for clarification earlier when definition of done is weak
- uses `gpt-planner-fast` or `gpt-planner` only when the plan adds value
- uses `gpt-builder` for isolated execution chunks
- uses `gpt-critic` for second-opinion review or high-stakes checks

## How To Choose A Mode

OpenCode already supports this natively.

Per the official docs:

- primary agents can be switched in-session with `Tab`
- commands can target a specific agent
- subagents can be mentioned with `@`

References:

- [Agents](https://opencode.ai/docs/agents/)
- [Config](https://opencode.ai/docs/config/)
- [Commands](https://opencode.ai/docs/commands/)
- [Skills](https://opencode.ai/docs/skills/)

Practical usage:

- stay in `manual-direct` for raw interaction
- switch to `open-orchestrator` when you want the open-model harness
- switch to `gpt-orchestrator` when you want the GPT-only harness

## Commands

- `/raw`
  - run a task through `manual-direct`
- `/open`
  - run a task through `open-orchestrator`
- `/gpt`
  - run a task through `gpt-orchestrator`
- `/grill`
  - load `grill-me` and stress-test a plan or design
- `/plan`
  - explicit GPT implementation plan
- `/plan-open`
  - explicit open-model implementation plan
- `/code`
  - focused coding pass with MiMo
- `/code-gpt`
  - focused coding pass with GPT
- `/review`
  - final review with GLM
- `/judge`
  - GPT second-opinion review
- `/rca`
  - deeper root-cause analysis with GLM
- `/ops`
  - tests, evals, git, push, PR

## Skills

### `grill-me`

Purpose:

- challenge a plan before implementation
- surface missing assumptions
- force clearer decisions on scope, rollout, and validation

How it behaves:

- asks one question at a time
- includes a recommended answer with each question
- checks the repo first if the answer may already exist there

Use it when you want the model to push back instead of immediately executing.

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

- default agent is `manual-direct`
- custom primary agents include `manual-direct`, `open-orchestrator`, and `gpt-orchestrator`
- the `grill-me` skill is discoverable
- custom commands are visible

## Design Notes

- default model is now `opencode-go/kimi-k2.6`
- GPT is no longer the global default path
- planning is now optional and value-based, not mandatory ceremony
