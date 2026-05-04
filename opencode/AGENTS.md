# OpenCode Agents

Keep only two provider workflows enabled:

- `gpt-orchestrator`: primary cost-aware GPT workflow using only `openai/*` models.
- `go-orchestrator`: secondary workflow using only `opencode-go/*` models and oh-my-openagent routing.

GPT tiers:

- quick/writing: `openai/gpt-5.4-mini`
- balanced/coding: `openai/gpt-5.4` medium
- planning/deep: `openai/gpt-5.5` high
- critic/ultra: `openai/gpt-5.5` xhigh

Provider isolation:

- GPT agents must not call GO agents/models unless the user explicitly switches workflow.
- GO agents must not call GPT agents/models unless the user explicitly switches workflow.

Routing:

- Default command/profile: GPT.
- Use `/go` when you want the OpenCode Go / oh-my-openagent stack.
- Use `workflow-route` only with `profile=gpt` or `profile=go`.
