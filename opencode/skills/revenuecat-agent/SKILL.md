---
name: revenuecat-agent
description: Compatibility shim for RevenueCat routing. If this skill is loaded, delegate to the GO RevenueCat subagent via the Task tool.
---

# RevenueCat Agent Shim

This entry exists only as a compatibility shim.

In this setup, RevenueCat access is **not** implemented as a normal skill workflow.
It is implemented as:

- a remote MCP server named `revenuecat`
- a GO subagent named `go-revenuecat-agent`

## Required Behavior

If this skill is loaded, do **not** continue as a skill-driven workflow.

Instead:

1. Use the `Task` tool.
2. Delegate to `go-revenuecat-agent` when using the GO workflow.
3. If the current orchestrator is GPT-only, do not cross the provider boundary unless the user explicitly asks to switch to GO.
4. Pass the current RevenueCat question or task to that subagent.

## Notes

- Prefer RevenueCat MCP tools over guessing.
- If the task also needs repo investigation, let the parent agent combine RevenueCat results with normal repo tools/subagents.
- Do not claim this skill itself can inspect RevenueCat state. The GO RevenueCat subagent does that.
