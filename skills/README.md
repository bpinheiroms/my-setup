# Skills

Organization of locally installed skills from two different sources.

## Structure

- `claude/`
  - local skills specific to the `~/.claude/skills` directory
- `agents/`
  - skills from the `~/.agents/skills` directory

## Important Note

On the local machine, part of the skills inside `~/.claude/skills` point to `~/.agents/skills` via symlink.

In this repo:

- the truly local `claude/` skills were copied into `skills/claude/`
- the full catalog from the other source was copied into `skills/agents/`
- this avoids unnecessary duplication of the same content in two places

## `skills/claude/`

This currently contains skills that are more specific to my local Claude usage:

- `apple-guidelines`
- `expo-playground-patterns`
- `onboarding-planner`

## `skills/agents/`

This currently contains most of the reusable catalog:

- `braintrust`
- `caveman*`
- `compress`
- `design-md`
- `enhance-prompt`
- `find-skills`
- `react-components`
- `remotion-best-practices`
- `shadcn-ui`
- `stitch-*`

## How To Navigate

- each skill usually has a `SKILL.md` at the root
- some also include a `README.md`, examples, scripts, and supporting resources
- to understand a skill, start with `SKILL.md`

## Backup Intent

This directory exists to:

- preserve specialized prompts and instructions
- make the setup portable to another machine
- keep a history of how the local skills evolve over time
