# OpenCode Config

Minimal OpenCode setup for **OpenCode Go + Oh My OpenAgent** only.

No account rotation and no custom local orchestrators. OpenCode starts directly in Oh My OpenAgent's `sisyphus`.

Reference: <https://medium.com/@jatinkrmalik/opencode-go-oh-my-openagent-the-complete-guide-to-sota-model-routing-without-hitting-limits-49fdc8cb3417>

## Install

```bash
curl -fsSL https://opencode.ai/install | bash
opencode --version
```

Install Oh My OpenAgent:

```bash
bunx oh-my-opencode install --no-tui \
  --opencode-go=yes
```

Restore this config:

```bash
mkdir -p ~/.config/opencode
rsync -a \
  --exclude 'node_modules/' \
  --exclude '.DS_Store' \
  opencode/ ~/.config/opencode/
```

The `rsync` command above intentionally omits `--delete` so user-local files in
`~/.config/opencode` are not removed by default. If you want to prune untracked
local files, opt in manually by rerunning the same command with `--delete` after
first reviewing it with `--dry-run`.

Authenticate and validate:

```bash
opencode auth login
opencode models --refresh
bunx oh-my-opencode refresh-model-capabilities
bunx oh-my-opencode doctor --verbose
```

Optional warning fix:

```bash
bun add -g @code-yeongyu/comment-checker
```

## Usage

Start OpenCode normally:

```bash
opencode
```

Default agent:

```text
sisyphus
```

Equivalent explicit command:

```text
/go <task>
```

## Routing principles

Use the right model tier for the task:

- volume/search/simple work: cheaper fast models
- standard engineering: balanced models
- architecture/high-risk/refactor: elite reasoning models
- visual/multimodal: specialized models

Fallbacks are resilience, not failure. Rate limits should switch to the next suitable model instead of breaking the workflow.

## Main Oh My OpenAgent roles

| Agent | Use |
|---|---|
| `sisyphus` | default orchestration and end-to-end tasks |
| `hephaestus` | implementation/execution when scope is clear |
| `prometheus` | planning/spec/scoping before code |
| `oracle` | architecture and hard decisions |
| `atlas` | terminal, tests, validation, git-style operations |
| `librarian` / `explore` | search, discovery, reference work |

## Files

- `opencode.json`: minimal OpenCode config, defaulting to `sisyphus`.
- `oh-my-openagent.json`: OpenCode Go model routing, fallbacks, categories, concurrency.
- `AGENTS.md`: local instruction boundary.
- `WORKFLOW_DIAGRAM.md`: flow overview.

## Validation

```bash
python3 -m json.tool ~/.config/opencode/opencode.json >/dev/null
python3 -m json.tool ~/.config/opencode/oh-my-openagent.json >/dev/null
bunx oh-my-opencode doctor --verbose
```
