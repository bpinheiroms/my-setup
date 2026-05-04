# OpenCode Config

Portable OpenCode setup with two workflows:

- **GPT**: default, cost-aware OpenAI stack with explicit quick/balanced/deep/ultra tiers.
- **GO**: OpenCode Go stack orchestrated directly by **Oh My OpenAgent** through `sisyphus` and `oh-my-openagent.json`.

The GO design follows the routing principles from Jatin Malik's guide: <https://medium.com/@jatinkrmalik/opencode-go-oh-my-openagent-the-complete-guide-to-sota-model-routing-without-hitting-limits-49fdc8cb3417>

## Install

### 1. Install OpenCode

```bash
curl -fsSL https://opencode.ai/install | bash
opencode --version
```

Use OpenCode `1.0.133+`; newer versions are preferred.

### 2. Install Oh My OpenAgent

Interactive:

```bash
bunx oh-my-opencode install
```

Non-interactive OpenCode Go setup:

```bash
bunx oh-my-opencode install --no-tui \
  --opencode-go=yes \
  --opencode-zen=yes \
  --claude=no \
  --openai=no \
  --gemini=no \
  --copilot=no
```

### 3. Restore this config

```bash
mkdir -p ~/.config/opencode
rsync -a --delete \
  --exclude 'node_modules/' \
  --exclude '.DS_Store' \
  opencode/ ~/.config/opencode/
```

Install local plugin dependencies if needed:

```bash
cd ~/.config/opencode
npm install
```

### 4. Authenticate and validate

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

## Core routing principles

OpenCode Go limits are budget/request sensitive. Agentic coding can trigger many model calls because shell commands, file reads, edits, and delegated work may each become requests.

Main rule: **do not burn the best model on every task**.

Use tiered routing:

1. **Volume workhorse** for cheap/frequent work
   - repo search
   - simple fixes
   - utility agents
   - quick reviews
   - high request-count workflows
2. **Standard engineering** for normal coding
   - 3–5 file features
   - terminal-heavy debugging
   - multi-step implementation
3. **Elite reasoning** only when needed
   - architecture decisions
   - high-risk refactors
   - long-horizon autonomous work
   - critical review
4. **Specialized capability** for specific needs
   - multimodal/screenshot work
   - long-context planning
   - design-heavy UI work

Fallbacks are resilience, not failure. Rate limits should route to the next good model instead of stopping the session.

## GPT workflow

GPT is **not** managed by Oh My OpenAgent here. It is a small cost-aware stack inspired by the same tiering idea, mapped to OpenAI models/effort levels.

| Command | Agent | Model | Use |
|---|---|---|---|
| `/gpt` | `gpt-orchestrator` | `openai/gpt-5.4` medium | default balanced work |
| `/gpt-quick` | `gpt-orchestrator` | `openai/gpt-5.4-mini` | cheap/simple tasks |
| `/code-gpt` | `gpt-builder` | `openai/gpt-5.4` medium | focused implementation |
| `/gpt-plan` | `gpt-planner` | `openai/gpt-5.5` high | deeper planning |
| `/gpt-deep` | `gpt-orchestrator` | `openai/gpt-5.5` | complex tasks |
| `/gpt-judge` | `gpt-critic` | `openai/gpt-5.5` xhigh | strong second opinion |
| `/gpt-ultra` | `gpt-critic` | `openai/gpt-5.5` xhigh | maximum scrutiny |
| `/gpt-write` | `gpt-writer` | `openai/gpt-5.4-mini` | naming/copy/alternatives |

GPT boundary:

- GPT agents use only `openai/*` models.
- GPT does not call GO models unless the user explicitly switches workflow.

## GO workflow

GO is orchestrated by **Oh My OpenAgent**.

There is intentionally **no** custom `go-orchestrator` and no custom `go-*` subagent tree in this repo. The `/go` command enters the Oh My OpenAgent `sisyphus` agent directly:

```json
{
  "go": {
    "agent": "sisyphus",
    "model": "opencode-go/kimi-k2.6"
  }
}
```

GO routing/fallbacks live in `oh-my-openagent.json`.

| Category/agent | Primary | Fallbacks | Use |
|---|---|---|---|
| `sisyphus` | `opencode-go/kimi-k2.6` | `deepseek-v4-pro`, `qwen3.6-plus` | main elite orchestrator |
| `hephaestus` | `opencode-go/deepseek-v4-pro` | `deepseek-v4-flash`, `kimi-k2.6` | standard autonomous worker |
| `oracle` | `opencode-go/glm-5.1` | `kimi-k2.6`, `deepseek-v4-pro` | architecture/reasoning |
| `librarian` | `opencode-go/deepseek-v4-flash` | `qwen3.5-plus` | search/reference |
| `explore` | `opencode-go/deepseek-v4-flash` | — | repo discovery |
| `quick` | `opencode-go/deepseek-v4-flash` | — | low-cost volume |
| `deep` | `opencode-go/kimi-k2.6` | `deepseek-v4-pro` | hard coding/research |
| `writing` | `opencode-go/qwen3.6-plus` | — | writing/instruction following |
| `visual-engineering` | `opencode-go/mimo-v2-omni` | `qwen3.6-plus` | multimodal/visual work |

GO boundary:

- GO models are `opencode-go/*` only.
- GO planning, review, coding, search, and fallback routing should come from Oh My OpenAgent agents/categories.
- Do not recreate custom GO orchestrators/subagents unless Oh My OpenAgent cannot cover a future use case.

## Fallback and concurrency settings

`oh-my-openagent.json` enables runtime fallback:

```json
{
  "model_fallback": true,
  "runtime_fallback": {
    "enabled": true,
    "retry_on_errors": [400, 429, 503, 529],
    "max_fallback_attempts": 3,
    "cooldown_seconds": 60,
    "timeout_seconds": 30,
    "notify_on_fallback": true
  }
}
```

Concurrency is conservative by model:

- Kimi K2.6: low concurrency for elite work
- GLM 5.1: very low concurrency for reasoning
- DeepSeek V4 Flash: high concurrency for volume
- Qwen 3.6 Plus: medium concurrency for fallback/writing

## Files

- `opencode.json`: OpenCode commands, default model, MCPs, plugin registration.
- `oh-my-openagent.json`: OpenCode Go model routing, fallbacks, categories, concurrency.
- `agents/`: GPT-only custom agents. GO custom agents are intentionally absent.
- `tools/workflow-route.ts`: deterministic task dispatcher for the GPT stack.
- `skills/revenuecat-agent/`: compatibility note for RevenueCat MCP routing.

## Validation checklist

```bash
python3 -m json.tool ~/.config/opencode/opencode.json >/dev/null
python3 -m json.tool ~/.config/opencode/oh-my-openagent.json >/dev/null
bunx oh-my-opencode doctor --verbose
```

Expected state:

- OpenCode config valid.
- Oh My OpenAgent config detected.
- `/go` uses `sisyphus` from Oh My OpenAgent.
- GPT commands available.
- No custom GO orchestrator/subagent tree in this setup.
