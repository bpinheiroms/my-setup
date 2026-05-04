---
name: revenuecat-agent
description: Compatibility note for RevenueCat routing in this OpenCode setup.
---

# RevenueCat Agent Shim

RevenueCat MCP is configured in `opencode.json`, but direct MCP access is disabled by default:

- `revenuecat_*`: false

This setup no longer keeps custom GO RevenueCat subagents. GO orchestration is owned by Oh My OpenAgent.

If RevenueCat work is needed:

1. Explicitly enable or scope RevenueCat MCP tools for the intended agent/workflow.
2. Prefer MCP tool usage over guessing product, entitlement, offering, or subscriber state.
3. Do not cross provider boundaries unless the user explicitly asks.
