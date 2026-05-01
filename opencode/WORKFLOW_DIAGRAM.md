# Workflow Diagram

```mermaid
flowchart TD
    U["User task"] --> M{"Which orchestrator?"}

    M -->|GPT primary| G["gpt-orchestrator"]
    M -->|GO secondary| O["go-orchestrator"]
    M -->|Router fallback| R["router-orchestrator"]

    G --> GR{"Need delegation?"}
    GR -->|No| GS["Work directly in current thread"]
    GR -->|Scope unclear| GE["explore"]
    GR -->|Short plan helps| GF["gpt-planner-fast"]
    GR -->|Larger or riskier| GP["gpt-planner"]
    GF --> GB["gpt-builder"]
    GP --> GB
    GR -->|Review / second opinion| GC["gpt-critic"]

    O --> OR{"workflow-route(profile=open)"}
    OR -->|Search / unknown scope| OE["explore"]
    OR -->|Small measured impl| OM["mimo-coder"]
    OR -->|Larger measured impl| OP["open-planner"]
    OP --> OM
    OR -->|RCA| OA["glm-analyzer"]
    OR -->|Review| OV["glm-reviewer"]
    OR -->|Large context| OK["kimi-context"]
    OR -->|Ops / git / tests| OO["deepseek-operator"]
    OR -->|Copy / naming| OW["minimax-writer"]

    R --> RR{"workflow-route(profile=open)"}
    RR -->|Trivial| RS["Work directly in current thread"]
    RR -->|Scope unclear| RE["explore"]
    RR -->|Non-trivial| RI["Implement / analyze / review directly"]
    RR -->|Parallel tasks| RG["general"]
```

## Key Differences

- **gpt-orchestrator**: delegates to GPT subagents (`gpt-planner`, `gpt-builder`, `gpt-critic`)
- **go-orchestrator**: delegates to opencode-go subagents (`mimo-coder`, `glm-analyzer`, `deepseek-operator`, etc.)
- **router-orchestrator**: works directly without provider-specific subagents (fallback tier)

## Fallback Chain

```
GPT (primary) → GO (secondary) → Router (fallback)
```

When quota runs out on one provider, switch to the next orchestrator manually.
