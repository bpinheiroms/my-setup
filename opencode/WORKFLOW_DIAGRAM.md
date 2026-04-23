# OpenCode Workflow Diagram

Visual spec for drawing the OpenCode workflow in Excalidraw.

Goal: make the process easy to understand for other people without forcing them to read the full config.

## Core Message

This setup is:

- `auto`-first
- open-models-first
- specialist-routed under the hood
- GPT-reviewed only at the end of changed work

## One-Line Explanation

The user talks only to `auto`; `auto` routes work to specialists when needed, then runs a final GPT review only if the final state changed files.

## Recommended Diagram Structure

Use 4 horizontal zones from left to right:

1. User input
2. Orchestrator
3. Specialist routing
4. Final execution and review

This makes the story read naturally from left to right.

## Excalidraw Layout

### Section 1: Entry

Draw one box on the far left:

- `User request`

Examples inside small text:

- ask a question
- fix a bug
- run tests
- run eval
- create PR

Arrow to:

- `auto`

### Section 2: Main Orchestrator

Make `auto` the biggest box in the center.

Label:

- `auto`
- subtitle: `Kimi 2.6`
- caption: `default agent`

Inside or below the box:

- answers simple questions directly
- executes normal repo work
- routes non-trivial tasks automatically

From `auto`, create a decision diamond:

- `Trivial task?`

Paths:

- `Yes` -> `auto handles directly`
- `No` -> `workflow-route`

### Section 3: Router

Draw one medium box:

- `workflow-route`
- subtitle: `deterministic task router`

Below it, branch to specialist boxes.

### Section 4: Specialists

Create 6 small/medium boxes in one cluster:

#### `explore`
- `fast repo discovery`
- `search only`

#### `qwen-coder`
- `Qwen 3.6 Plus`
- `focused implementation`
- `localized code changes`

#### `kimi-context`
- `Kimi 2.6`
- `compress large context`
- `large logs / diffs / specs`

#### `glm-analyzer`
- `GLM-5`
- `RCA / tradeoffs / risk`

#### `minimax-writer`
- `MiniMax M2.7`
- `naming / rewrite / copy`

#### `general`
- `parallel subtasks`

All specialist arrows should go back into `auto`.

Important visual point:

- these are helpers
- `auto` stays the owner of the flow

## Final Phase

After the specialists return, place a box to the right of `auto`:

- `auto continues execution`

Inside:

- applies changes
- runs tests / evals
- prepares final state

Then add a decision diamond:

- `Did final state change files?`

Paths:

- `No` -> `Respond to user`
- `Yes` -> `gpt-critic`

## GPT Review

Draw one highlighted box on the far right:

- `gpt-critic`
- subtitle: `GPT-5.4`
- caption: `final review only`

Inside:

- reviews completed changed work
- checks correctness and regressions
- does not review every intermediate edit

From `gpt-critic`, add a decision diamond:

- `Material issue found?`

Paths:

- `No` -> `Finish / commit / PR / answer`
- `Yes` -> `Fix issue in auto` -> back to `gpt-critic`

This loop should be visually small and clearly marked as exception flow, not the main path.

## Suggested Excalidraw Text

Use this exact wording if you want a clean public-facing version.

### Main flow

```text
User request
  -> auto (Kimi 2.6)
  -> trivial? yes -> handle directly
  -> trivial? no -> workflow-route
  -> specialist if needed
  -> back to auto
  -> tests / eval / final state
  -> changed files?
  -> no -> respond
  -> yes -> gpt-critic final review
  -> issue found?
  -> no -> finish
  -> yes -> fix -> review again
```

### Specialist labels

```text
explore
fast repo discovery

qwen-coder
Qwen 3.6 Plus
focused code changes

kimi-context
large-context compression

glm-analyzer
RCA / tradeoffs / risk

minimax-writer
naming / rewrite / copy

general
parallel subtasks

gpt-critic
final review only
```

## Recommended Color System

Keep the colors semantic and simple:

- `auto`: blue
- `workflow-route`: yellow or orange
- code specialists: green
- analysis specialists: purple
- GPT review: red or pink
- decision diamonds: white with dark border

Suggested mapping:

- `auto`: `#A5D8FF`
- `workflow-route`: `#FFD8A8`
- `qwen-coder`: `#B2F2BB`
- `kimi-context`: `#C5F6FA`
- `glm-analyzer`: `#E5DBFF`
- `minimax-writer`: `#FFD6E7`
- `general`: `#F1F3F5`
- `gpt-critic`: `#FFC9C9`

## Recommended Visual Hierarchy

Make these biggest:

1. `auto`
2. `workflow-route`
3. `gpt-critic`

Make specialists smaller.

Why:

- people should understand that the user does not manually talk to each specialist
- the main relationship is `User -> auto`
- specialists are supporting actors

## Best Version For Sharing Publicly

If the audience is broad, keep only 5 visible boxes:

1. `User request`
2. `auto (Kimi 2.6)`
3. `workflow-route`
4. `specialists`
5. `gpt-critic final review`

And represent the specialists as one grouped frame with smaller boxes inside.

## Best Version For Technical People

If the audience is technical, show each specialist explicitly and add these annotations:

- `Open models do the work`
- `GPT only reviews final changed state`
- `No manual agent switching in normal usage`

## Suggested Title Options

- `OpenCode Auto Workflow`
- `How My OpenCode Agent Setup Works`
- `Open Models First, GPT Final Review`
- `Auto-Orchestrated Coding Workflow`

## Suggested Subtitle

```text
One primary agent, specialist routing underneath, final GPT review only on completed changed work.
```

## What To Avoid In The Diagram

- Do not show GPT in the middle of the normal implementation path.
- Do not draw all specialists as if the user talks to them directly.
- Do not make the review loop the main visual path.
- Do not overload the drawing with config details like permissions or exact prompts.

## Speaker Notes

If you present this diagram live, the shortest explanation is:

```text
I only talk to auto.
Auto decides whether it can handle the task directly or route it to a specialist.
Open models do almost all of the work.
If the final state changed files, GPT reviews the final result before the workflow ends.
```
