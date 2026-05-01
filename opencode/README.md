# OpenCode

OpenCode global setup com 3 orquestradores explícitos:

- `gpt-orchestrator`
  - GPT-only workflow (primary)
  - usa apenas `openai/*`
  - mais interativo e menos cerimonial
- `go-orchestrator`
  - Quality-first usando `opencode-go/*` (secondary)
  - mesma especialização do gpt, mas sem gastar GPT
- `router-orchestrator`
  - OpenRouter fallback usando `openrouter/*`
  - mesmas regras do go, mas trabalha diretamente (sem subagents de provider)

Fallback chain:
```
GPT (primary) → GO (secondary) → Router (fallback)
```

Isso substitui o setup anterior de `manual-direct`, `open-orchestrator`, `gpt-orchestrator`, `kimi-context`.

## Por que esta estrutura

O setup anterior tinha problemas:

- muitos modos primários com sobreposição (manual-direct vs open-orchestrator)
- kimi-context era primário quando deveria ser subagent
- não havia suporte para OpenRouter como fallback

A nova regra é simples:

- 3 orquestradores, cada um com seu provider
- regras compartilhadas centralizadas em `AGENTS.md`
- cada orquestrador herda as regras globais e adiciona apenas o boundary de provider
- fallback manual (troca de agent) quando a cota acaba

## Arquivos

- `opencode.json`
  - config principal
  - modelo default e agent default
  - commands customizados
- `AGENTS.md`
  - regras globais compartilhadas por todos os modos
  - fallback chain, execution rules, orchestration rules
- `agents/`
  - definições de primários e subagents
- `skills/grill-me/SKILL.md`
  - skill para stress-test de planos e designs
- `plugins/rtk.ts`
  - plugin opcional de rewrite de commands
- `tools/workflow-route.ts`
  - router determinístico com `profile=open` e `profile=gpt`

## Primários

### `gpt-orchestrator`

Use quando:

- você está no plano OpenAI e ainda tem cota
- quer mais interatividade e menos cerimônia
- prefere GPT para julgamento e interação

Behavior:

- executa diretamente na thread por default
- faz perguntas de clarificação mais cedo
- delega para `gpt-planner`, `gpt-builder`, `gpt-critic` quando necessário

### `go-orchestrator`

Use quando:

- a cota do OpenAI acabou
- quer especialização multi-modelo sem gastar GPT
- quer o caminho open-model mais forte

Behavior:

- delega para subagents opencode-go (`mimo-coder`, `glm-analyzer`, `deepseek-operator`, etc.)
- tuned para qualidade primeiro, não menor custo

### `router-orchestrator`

Use quando:

- a cota do OpenAI e do opencode-go acabaram
- precisa continuar operando por tokens no OpenRouter

Behavior:

- mesmas regras de orquestração do go-orchestrator
- trabalha diretamente na thread (não delega para subagents de provider)
- usa `explore` e `general` quando necessário
- preferência por execução direta ao invés de delegação

## Como escolher um modo

OpenCode suporta nativamente:

- agentes primários podem ser trocados em sessão com `Tab`
- commands podem targetar um agente específico
- subagents podem ser mencionados com `@`

Referências:

- [Agents](https://opencode.ai/docs/agents/)
- [Config](https://opencode.ai/docs/config/)
- [Commands](https://opencode.ai/docs/commands/)
- [Skills](https://opencode.ai/docs/skills/)

Uso prático:

- comece em `gpt-orchestrator` (default)
- quando acabar a cota do OpenAI, troque para `go-orchestrator`
- quando acabar a cota do opencode-go, troque para `router-orchestrator`

## Commands

- `/gpt`
  - roda pelo `gpt-orchestrator`
- `/go`
  - roda pelo `go-orchestrator`
- `/router`
  - roda pelo `router-orchestrator`
- `/grill`
  - carrega `grill-me` e stress-testa um plano ou design
- `/plan`
  - plano de implementação explícito com GPT
- `/plan-open`
  - plano de implementação explícito com open-model
- `/code`
  - coding pass focado com MiMo
- `/code-gpt`
  - coding pass focado com GPT
- `/review`
  - review final com GLM
- `/judge`
  - segunda opinião com GPT
- `/rca`
  - análise de causa raiz com GLM
- `/ops`
  - tests, evals, git, push, PR

## Skills

### `grill-me`

Propósito:

- challenge a plan before implementation
- surface missing assumptions
- force clearer decisions on scope, rollout, and validation

Como se comporta:

- asks one question at a time
- includes a recommended answer with each question
- checks the repo first if the answer may already exist there

Use when you want the model to push back instead of immediately executing.

## Instalação

Este repositório armazena configuração do OpenCode, não o binário.

### Pré-requisitos

- OpenCode instalado
- autenticação dos providers já configurada
- `bun` ou `npm` disponível para dependência do plugin local

### Instalar

```bash
mkdir -p ~/.config/opencode
rsync -a opencode/ ~/.config/opencode/
cd ~/.config/opencode && bun install
```

Se não usar Bun:

```bash
cd ~/.config/opencode && npm install
```

### Verificar

```bash
opencode debug config
opencode agent list
```

Resultado esperado:

- default agent é `gpt-orchestrator`
- custom primary agents incluem `gpt-orchestrator`, `go-orchestrator`, `router-orchestrator`
- a skill `grill-me` é discoverable
- custom commands estão visíveis

## Design Notes

- default model é `openai/gpt-5.4` (reflete o início da cadeia)
- fallback chain: GPT → GO → Router
- regras compartilhadas centralizadas em `AGENTS.md`
- cada orquestrador herda regras globais e adiciona apenas boundary de provider
- subagents específicos de provider permanecem disponíveis apenas para seus orquestradores
- o router-orchestrator trabalha diretamente para evitar dependência de subagents de provider
