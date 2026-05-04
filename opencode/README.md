# OpenCode Config

Portable OpenCode setup with two provider-isolated workflows:

- **GPT**: default, cost-aware OpenAI stack with explicit quick/balanced/deep/ultra tiers.
- **GO**: OpenCode Go stack powered by `oh-my-openagent` model routing and fallbacks.

The design is inspired by the routing principles in Jatin Malik's guide: <https://medium.com/@jatinkrmalik/opencode-go-oh-my-openagent-the-complete-guide-to-sota-model-routing-without-hitting-limits-49fdc8cb3417>

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

From this repo:

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

The OpenCode Go limits are dollar/request-budget sensitive. A single coding session can trigger many model calls because each tool call, shell step, edit, and delegated agent can become a request. The main rule: **do not burn the best model on every task**.

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

Fallbacks are treated as resilience, not failure. Rate limits should route to the next good model instead of stopping the session.

## GPT workflow

Cost-aware GPT stack inspired by the same tiering idea, but mapped to OpenAI models/effort levels instead of open models:

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

GPT provider boundary:

- GPT agents use only `openai/*` models.
- GPT agents do not call GO agents unless the user explicitly switches workflow.

## GO workflow

GO uses `oh-my-openagent.json` for OpenCode Go model routing/fallbacks.

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

Useful GO commands:

| Command | Agent | Use |
|---|---|---|
| `/go` | `go-orchestrator` | OpenCode Go default workflow |
| `/go-rca` | `go-analyzer` | root-cause analysis |
| `/go-review` | `go-reviewer` | final review |
| `/go-plan-open` | `go-planner` | explicit open-model plan |
| `/go-code` | `go-coder` | focused coding pass |
| `/go-ops` | `go-operator` | tests/evals/git workflow |
| `/go-draft` | `go-writer` | naming/copy alternatives |
| `/go-revenuecat` | `go-revenuecat-agent` | RevenueCat MCP workflow |

GO provider boundary:

- GO agents use only `opencode-go/*` models.
- GO agents do not call GPT agents unless the user explicitly switches workflow.

## Fallback and concurrency settings

`oh-my-openagent.json` enables:

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

Background concurrency is conservative by model:

- Kimi K2.6: low concurrency for elite work
- GLM 5.1: very low concurrency for reasoning
- DeepSeek V4 Flash: high concurrency for volume
- Qwen 3.6 Plus: medium concurrency for broad fallback/writing

## Files

- `opencode.json`: OpenCode commands, default model, MCPs, plugin registration.
- `oh-my-openagent.json`: OpenCode Go model routing, fallbacks, categories, concurrency.
- `agents/`: provider-isolated GPT and GO agents.
- `tools/workflow-route.ts`: deterministic GPT/GO task dispatcher.
- `skills/revenuecat-agent/`: compatibility shim for GO RevenueCat MCP routing.

## Validation checklist

```bash
python3 -m json.tool ~/.config/opencode/opencode.json >/dev/null
python3 -m json.tool ~/.config/opencode/oh-my-openagent.json >/dev/null
bunx oh-my-opencode doctor --verbose
```

Expected state:

- OpenCode config valid.
- Oh My OpenAgent config detected.
- GPT and GO commands available.
- Only GPT and GO workflows are present in this setup.
