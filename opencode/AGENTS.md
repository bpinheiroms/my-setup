# OpenCode Agents

Keep two workflows enabled:

- `gpt-orchestrator`: primary cost-aware GPT workflow using only `openai/*` models.
- Oh My OpenAgent/OpenCode Go: secondary workflow, entered with `/go`, orchestrated by `sisyphus` from `oh-my-openagent.json`.

GPT tiers:

- quick/writing: `openai/gpt-5.4-mini`
- balanced/coding: `openai/gpt-5.4` medium
- planning/deep: `openai/gpt-5.5` high
- critic/ultra: `openai/gpt-5.5` xhigh

Provider isolation:

- GPT agents must not call GO models unless the user explicitly switches workflow.
- GO routing is owned by Oh My OpenAgent; do not recreate GO custom orchestrators/subagents.

Routing:

- Default command/profile: GPT.
- Use `/go` when you want the OpenCode Go / Oh My OpenAgent stack.
