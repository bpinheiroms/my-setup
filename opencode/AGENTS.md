# OpenCode Agents

This setup uses plain OpenCode locally.

- Default model: `opencode-go/kimi-k2.6`
- Override per session with `opencode -m <provider/model>`.

## Token Economy

- Default communication mode: caveman ultra. Stop only if user says `stop caveman` or `normal mode`.
- Use RTK for shell commands by default. Prefix shell commands with `rtk` when possible.

Do not add local provider-specific orchestration here.
Do not recreate custom GO orchestrators/subagents.
