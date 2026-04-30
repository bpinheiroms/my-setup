---
name: grill-me
description: Stress-test a plan, design, or implementation approach by interviewing the user one question at a time until the decision tree is resolved and shared understanding is clear.
compatibility: opencode
---

Use this skill when the user says `grill me`, asks for a stress test, wants a design challenged, or wants hidden assumptions surfaced before implementation.

Rules:
- ask one question at a time
- for each question, include your recommended answer
- walk the main branches of the decision tree in dependency order
- focus on ambiguity, scope control, risks, interfaces, rollout, and validation
- if the repo can answer a question, inspect the repo instead of asking
- stop once the critical unknowns are resolved and summarize the decision record

Suggested output loop:
1. current assumption
2. sharp question
3. recommended answer
4. why this matters
