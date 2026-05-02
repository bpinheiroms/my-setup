# Workflow Diagram

```mermaid
flowchart TD
    U["User task"] --> M{"Which orchestrator?"}

    M -->|GPT primary| G["gpt-orchestrator"]
    M -->|GO secondary| O["go-orchestrator"]
    M -->|Router fallback| R["router-orchestrator"]
    M -->|Fireworks fallback| F["fw-orchestrator"]

    G --> GR{"Need delegation?"}
    GR -->|No| GS["Work directly in current thread"]
    GR -->|Scope unclear| GE["explore"]
    GR -->|Short plan helps| GF["gpt-planner-fast"]
    GR -->|Larger or riskier| GP["gpt-planner"]
    GF --> GB["gpt-builder"]
    GP --> GB
    GR -->|Review / second opinion| GC["gpt-critic"]

    O --> OR{"workflow-route(profile=go)"}
    OR -->|Search / unknown scope| OE["explore"]
    OR -->|Small measured impl| OM["go-coder"]
    OR -->|Larger measured impl| OP["go-planner"]
    OP --> OM
    OR -->|RCA| OA["go-analyzer"]
    OR -->|Review| OV["go-reviewer"]
    OR -->|Ops / git / tests| OO["go-operator"]
    OR -->|Copy / naming| OW["go-writer"]

    R --> RR{"workflow-route(profile=router)"}
    RR -->|Trivial| RS["Work directly in current thread"]
    RR -->|Scope unclear| RE["explore"]
    RR -->|Non-trivial| RI["router-* subagents or direct execution"]
    RR -->|Parallel tasks| RG["general"]

    F --> FR{"workflow-route(profile=fw)"}
    FR -->|Trivial| FS["Work directly in current thread"]
    FR -->|Scope unclear| FE["explore"]
    FR -->|Non-trivial| FI["fw-* subagents or direct execution"]
    FR -->|Parallel tasks| FG["general"]
```

## Key Differences

- **gpt-orchestrator**: delegates only to GPT subagents (`gpt-planner`, `gpt-builder`, `gpt-critic`)
- **go-orchestrator**: delegates only to opencode-go subagents (`go-coder`, `go-analyzer`, `go-operator`, etc.)
- **router-orchestrator**: delegates only to OpenRouter subagents (`router-*`) when delegation helps
- **fw-orchestrator**: delegates only to Fireworks AI subagents (`fw-*`) when delegation helps

## Fallback Chain

```
GPT (primary) -> GO (secondary) -> Router / Fireworks (fallbacks)
```

Each provider boundary is strict. An orchestrator may only call subagents backed by the same provider.
