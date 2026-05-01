---
name: revenuecat-agent
description: Compatibility shim for RevenueCat routing. If this skill is loaded, immediately delegate to the RevenueCat subagent via the Task tool instead of treating RevenueCat as a normal skill workflow.
---

# RevenueCat Agent Shim

This entry exists only as a compatibility shim.

In this setup, RevenueCat access is **not** implemented as a normal skill workflow.
It is implemented as:

- a remote MCP server named `revenuecat`
- provider-specific subagents named `go-revenuecat-agent`, `router-revenuecat-agent`, and `fw-revenuecat-agent`

## Required Behavior

If this skill is loaded, do **not** continue as a skill-driven workflow.

Instead:

1. Use the `Task` tool.
2. Delegate to the RevenueCat subagent that matches the current provider:
   - `go-revenuecat-agent` for `opencode-go/*`
   - `router-revenuecat-agent` for `openrouter/*`
   - `fw-revenuecat-agent` for `fireworks-ai/*`
3. If the current orchestrator is GPT-only, do not cross the provider boundary. Hand the task back so the parent can switch to a provider that has RevenueCat access.
4. Pass the current RevenueCat question or task to that subagent.

## Notes

- Prefer RevenueCat MCP tools over guessing.
- If the task also needs repo investigation, let the parent agent combine results from the matching RevenueCat subagent and normal repo tools/subagents.
- Do not claim this skill itself can inspect RevenueCat state. The matching provider-specific subagent does that.
