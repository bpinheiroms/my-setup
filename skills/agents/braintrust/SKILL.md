---
name: braintrust
version: 1.0.0
description: Use the Braintrust `bt` CLI for projects, traces, prompts, and key Braintrust workflows.
---

## Purpose

Use the Braintrust `bt` CLI for projects, traces, prompts, and sync workflows.

## When To Use

- The user asks to inspect traces, prompts, projects, or sync state.
- You need reliable auth/profile behavior without manually handling API tokens.
- You are automating CLI workflows where `--json` output can be piped to other tools.

## How To Use

1. Confirm auth and context:
   - `bt status`
   - `bt projects list`
2. Run the smallest command that answers the question:
   - `bt prompts list --project <name>`
   - `bt view logs --project <name>`
   - `bt view trace --object-ref <ref> --trace-id <id>`
3. Prefer machine-readable output for follow-up:
   - add `--json` when results need further parsing.

## Guardrails

- Prefer `bt` commands over direct API calls when both can accomplish the task.
- Respect existing login/profile settings from `bt auth`.

## Key Workflows

Use these product workflow categories when deciding how to help users:

- `Instrument`: SDK setup, spans/logging, metadata capture, tracing patterns.
- `Observe`: logs/traces inspection, dashboards, debugging production behavior.
- `Annotate`: feedback labels, human review loops, curation workflows.
- `Evaluate`: dataset/test-case based evals, scoring, regressions, guardrails.
- `Deploy`: prompt/version rollout, environment promotion, runtime controls.

Primary docs index:

- `https://www.braintrust.dev/docs`

Category entry pages:

- `https://www.braintrust.dev/docs/instrument`
- `https://www.braintrust.dev/docs/observe`
- `https://www.braintrust.dev/docs/annotate`
- `https://www.braintrust.dev/docs/evaluate`
- `https://www.braintrust.dev/docs/deploy`

When uncertain, prefer precise `bt` CLI commands for local operations, and use docs context to
explain product concepts and recommended patterns.

Core reference docs are also prefetched, including SQL reference:

- `https://www.braintrust.dev/docs/reference/sql`

## bt CLI Reference (Generated from README)

### `bt eval`

**File selection:**

- `bt eval` — discover and run all eval files in the current directory (recursive)
- `bt eval tests/` — discover eval files under a specific directory
- `bt eval "tests/**/*.eval.ts"` — glob pattern
- `bt eval a.eval.ts b.eval.ts` — one or more explicit files

Files inside `node_modules`, `.venv`, `venv`, `site-packages`, `dist-packages`, and `__pycache__` are excluded from automatic discovery. Explicit paths and globs bypass these exclusions.

**Runners:**

- By default, `bt eval` auto-detects a JavaScript runner from your project (`tsx`, `vite-node`, `ts-node`, then `ts-node-esm`).
- Set a runner explicitly with `--runner` / `BT_EVAL_RUNNER`:
  - `bt eval --runner vite-node tutorial.eval.ts`
  - `bt eval --runner tsx tutorial.eval.ts`
- `bt` resolves local `node_modules/.bin` entries automatically — no need for a full path.
- If eval execution fails with ESM/top-level-await related errors, retry with:
  - `bt eval --runner vite-node tutorial.eval.ts`

**Passing arguments to the eval file:**

Use `--` to forward extra arguments to the eval file via `process.argv`:

```bash
bt eval foo.eval.ts -- --description "Prod" --shard=1/4
```

**Sampling modes:**

- `bt eval --first 20 qa.eval.ts` — run the first 20 examples and clearly label the summary as a non-final smoke run.
- `bt eval --sample 20 --sample-seed 7 qa.eval.ts` — run a deterministic random sample and clearly label the summary as a non-final smoke run.
- If you do not pass a sampling flag, `bt eval` runs the full dataset and marks the summary as final.

### `bt sql`

- Runs interactively on TTY by default.
- Runs non-interactively when stdin is not a TTY, when `--non-interactive` is set, or when a query argument is provided.
- Braintrust SQL queries should include a `FROM` clause against a Braintrust table function (for example `project_logs(...)`).
- In non-interactive mode, provide SQL via:
  - Positional query: `bt sql "SELECT id FROM project_logs('<PROJECT_ID>') LIMIT 1"`
  - stdin pipe: `echo "SELECT id FROM project_logs('<PROJECT_ID>') LIMIT 1" | bt sql`
- Pagination:
  - SQL queries: pass cursor tokens inline with `OFFSET '<CURSOR_TOKEN>'`.
- Quick guidance:
  - Prefer filtering with `WHERE`; use `HAVING` only after aggregation.
  - Unsupported SQL features include joins, subqueries, unions/intersections, and window functions.
  - Use explicit aliases for computed fields and cast timestamps/JSON values when needed.
  - Full reference: `https://www.braintrust.dev/docs/reference/sql`

### `bt view`

- List logs (interactive on TTY by default, non-interactive otherwise):
  - `bt view logs`
  - `bt view logs --object-ref project_logs:<project-id>`
  - `bt view logs --list-mode spans` (one row per span)
- Fetch one trace (returns truncated span rows by default):
  - `bt view trace --object-ref project_logs:<project-id> --trace-id <root-span-id>`
  - `bt view trace --url <braintrust-trace-url>`
- Fetch one span (full payload):
  - `bt view span --object-ref project_logs:<project-id> --id <row-id>`
- Common flags:
  - `--limit <N>`: max rows per request/page
  - `--cursor <CURSOR>`: continue pagination explicitly
  - `--preview-length <N>`: truncation length for non-single-span fetches
  - `--print-queries`: print SQL/invoke payloads before execution
  - `-j, --json`: machine-readable envelope output
- `logs` filter flags:
  - `--search <TEXT>`
  - `--filter <EXPR>`
  - `--window <DURATION>` (default `1h`)
  - `--since <TIMESTAMP>` (overrides `--window`)
- Interactive controls (`bt view logs` TUI):
  - Table: `Up/Down` to select, `Enter` to open trace, `r` to refresh
  - Search: `/` edit, `Enter` apply, `Esc` cancel, `Ctrl+u` clear
  - Open URL: `Ctrl+k`, then `Enter`
  - Detail view: `t` span/thread, `Left/Right` switch panes, `Backspace`/`Esc` back
  - Global: `q` quit

### `bt auth`

- Authenticate interactively (prompts for auth method, profile name defaults to org name):
  - `bt auth login`
  - First prompt chooses: `OAuth (browser)` (default) or `API key`.
  - If your API key can access multiple orgs, `bt` uses a searchable picker (alphabetized) and lets you choose a specific org or no default org (cross-org mode).
  - `bt` confirms the resolved API URL before saving.
- Login with OAuth (browser-based, stores refresh token in secure credential store):
  - `bt auth login --oauth --profile work`
  - You can pass `--no-browser` to print the URL without auto-opening.
  - On remote/SSH hosts, paste the final callback URL from your local browser if localhost callback cannot be delivered.
- List profiles:
  - `bt auth profiles`
- Log out (remove a saved profile):
  - `bt auth logout`
  - `bt auth logout --force` (skip confirmation)
- Show current auth source/profile:
  - `bt auth status`
- Force-refresh OAuth access token for debugging:
  - `bt auth refresh --profile work`

Auth resolution order for commands is:

1. Explicit `--profile`
2. `--api-key` or `BRAINTRUST_API_KEY` (unless `--prefer-profile` is set)
3. `BRAINTRUST_PROFILE`
4. Org-based profile match (profile whose org matches `--org`/config org)
5. Single-profile auto-select (if only one profile exists)

On Linux, secure storage uses `secret-tool` (libsecret) with a running Secret Service daemon. On macOS, it uses the `security` keychain utility. If a secure store is unavailable, `bt` falls back to a plaintext secrets file with `0600` permissions.

### `bt setup` and `bt docs`

Use setup/docs commands to configure coding-agent skills and workflow docs for Braintrust.

- Configure skills with default setup flow:
  - `bt setup --local`
  - `bt setup --global`
- Explicit skills subcommand:
  - `bt setup skills --local --agent claude --agent codex`
- Instrument a repo with an agent:
  - `bt setup instrument --agent codex`
  - `bt setup instrument --agent claude --agent-cmd '<your claude command>'`
- Configure MCP:
  - `bt setup mcp --local --agent claude --agent codex`
  - `bt setup mcp --global --yes`
- Diagnose setup:
  - `bt setup doctor`
  - `bt setup doctor --local`
  - `bt setup doctor --global`
- Prefetch specific workflow docs during setup:
  - `bt setup skills --local --workflow instrument --workflow evaluate`
- Skip docs prefetch during setup:
  - `bt setup skills --local --no-fetch-docs`
- Force-refresh prefetched docs during setup (clears existing docs output first):
  - `bt setup skills --local --refresh-docs`
- Non-interactive runs should pass an explicit scope:
  - `bt setup skills --global --yes`
- Sync workflow docs markdown from Braintrust Docs (Mintlify `llms.txt`):
  - `bt docs fetch --workflow instrument --workflow evaluate`
  - `bt docs fetch --refresh` (clear output dir first to avoid stale pages)
  - `bt docs fetch --dry-run`
  - `bt docs fetch --strict` (fail if any page download fails)

Current behavior:

- Supported agents: `claude`, `codex`, `cursor`, `opencode`.
- If no `--agent` values are provided, `bt` auto-detects likely agents from local/global context and falls back to all supported agents when none are detected.
- In interactive TTY mode, skills setup shows a checklist so you can select/deselect agents before install.
- In interactive TTY mode, setup also shows a workflow checklist and prefetches those docs automatically.
- Running bare `bt setup` opens a top-level setup wizard with: `instrument`, `skills`, `mcp`, and `doctor`.
- `bt setup instrument` always targets the local git repo, reuses the `skills` setup flow, and guarantees `instrument` docs are included.
- In interactive mode, `bt setup instrument` always includes `instrument` and lets you multi-select additional docs for `observe` and/or `evaluate`.
- `bt setup instrument` defaults to `codex` when no agent is specified; pass `--agent-cmd` for agents without a built-in default command.
- In setup wizards, press `Esc` to go back to the previous step.
- If `--workflow` is omitted in non-interactive mode, setup defaults to all workflows.
- Use `--refresh-docs` in setup (or `bt docs fetch --refresh`) to clear old docs before re-fetching.
- `cursor` is local-only in this flow. If selected with `--global`, `bt` prints a warning and continues installing the other selected agents.
- Claude integration installs the Braintrust skill file under `.claude/skills/braintrust/SKILL.md`.
- Cursor integration installs `.cursor/rules/braintrust.mdc` with the same shared Braintrust guidance plus an auto-generated command-reference excerpt from this README.
- Setup-time docs prefetch writes to `.bt/skills/docs` for `--local` and `~/.config/bt/skills/docs` (or `$XDG_CONFIG_HOME/bt/skills/docs`) for `--global`.
- Docs fetch writes LLM-friendly local indexes: `.bt/skills/docs/README.md` and per-section `.bt/skills/docs/<section>/_index.md` (or the global equivalents under `~/.config/bt/skills/docs`).
- Setup/docs prefetch always includes SQL reference docs at `.bt/skills/docs/reference/sql.md` (or `~/.config/bt/skills/docs/reference/sql.md` for global setup).

Skill smoke-test harness:

- `scripts/skill-smoke-test.sh --agent codex --bt-bin ./target/debug/bt`
- The script scaffolds a demo repo, installs the selected agent skill, writes `AGENT_TASK.md`, and verifies that post-agent changes include both tracing and an eval file.

## Reference Strategy

- For command syntax, use `bt --help` and `<subcommand> --help` (for example `bt sql --help`, `bt view --help`).
- Prefer prefetched docs in `.bt/skills/docs/README.md` (local setup) or `~/.config/bt/skills/docs/README.md` (global setup), then section indexes like `.bt/skills/docs/evaluate/_index.md`.
- SQL reference is available at `.bt/skills/docs/reference/sql.md` (or `~/.config/bt/skills/docs/reference/sql.md` for global setup).
- If local docs are missing or stale, run `bt docs fetch` (optionally with `--refresh`).
