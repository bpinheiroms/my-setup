# OpenCode Config

Minimal plain OpenCode setup.

No account rotation, no Oh My OpenAgent plugin, and no custom local orchestrators. OpenCode starts with the configured default model and can be overridden per session with `-m`.

## Install

```bash
curl -fsSL https://opencode.ai/install | bash
opencode --version
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
```

## Usage

Start OpenCode normally:

```bash
opencode
```

Default model:

```text
opencode-go/kimi-k2.6
```

Override the model per session:

```bash
opencode -m opencode-go/deepseek-v4-pro
opencode -m opencode-go/qwen3.6-plus
opencode -m opencode-go/kimi-k2.6
```

## Model selection

Use the right model tier for the task:

- volume/search/simple work: cheaper fast models
- standard engineering: balanced models
- architecture/high-risk/refactor: elite reasoning models
- visual/multimodal: specialized models

There are no local routing/fallback rules in this config. Model choice is explicit through the `model` field or the `opencode -m <provider/model>` flag.

## Files

- `opencode.json`: minimal OpenCode config with a default model.
- `AGENTS.md`: local instruction boundary.
- `WORKFLOW_DIAGRAM.md`: flow overview.

## Validation

```bash
python3 -m json.tool ~/.config/opencode/opencode.json >/dev/null
opencode --help
```
