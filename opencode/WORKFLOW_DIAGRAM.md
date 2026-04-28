# OpenCode Workflow Diagram

Mermaid version of the workflow.

This is the canonical visual explanation of the setup.

## Main Diagram

```mermaid
flowchart LR
    U[User request] --> A[auto<br/>Kimi 2.6<br/>default agent]

    A --> T{Trivial task?}
    T -->|Yes| D[Handle directly]
    D --> R[Respond to user]

    T -->|No| WR[workflow-route<br/>deterministic task router]

    WR -->|self| A
    WR -->|explore| EX[explore<br/>fast repo discovery]
    WR -->|qwen-coder| QC[qwen-coder<br/>MiMo v2.5 Pro<br/>focused implementation]
    WR -->|qwen-operator| QO[qwen-operator<br/>DeepSeek V4 Flash<br/>tests / evals / git / PR]
    WR -->|kimi-context| KC[kimi-context<br/>compress large context]
    WR -->|glm-analyzer| GA[glm-analyzer<br/>RCA / tradeoffs / risk]
    WR -->|glm-reviewer| GV[glm-reviewer<br/>GLM-5<br/>default final review]
    WR -->|revenuecat-agent| RC[revenuecat-agent<br/>RevenueCat MCP specialist]
    WR -->|minimax-writer| MW[minimax-writer<br/>naming / rewrite / copy]
    WR -->|general| GE[general<br/>parallel subtasks]
    WR -->|escalation review| GR[gpt-critic<br/>GPT-5.4<br/>escalation-only path]

    EX --> A
    QC --> A
    QO --> A
    KC --> A
    GA --> A
    GV --> A
    RC --> A
    MW --> A
    GE --> A
    GR --> A

    A --> E[auto continues execution<br/>tests / evals / final state]
    E --> C{Did final state change files?}

    C -->|No| R
    C -->|Yes| G[glm-reviewer<br/>GLM-5<br/>default final review]

    G --> M{Material issue found?}
    M -->|No| F[Finish / commit / PR / answer]
    M -->|Yes| FX[Fix issue in auto]
    FX --> G
    G --> H{Escalate to GPT?}
    H -->|Yes| GP[gpt-critic<br/>GPT-5.4<br/>escalation review]
    H -->|No| F
    GP --> F

    classDef primary fill:#A5D8FF,stroke:#1c1c1c,color:#1c1c1c;
    classDef router fill:#FFD8A8,stroke:#1c1c1c,color:#1c1c1c;
    classDef code fill:#B2F2BB,stroke:#1c1c1c,color:#1c1c1c;
    classDef context fill:#C5F6FA,stroke:#1c1c1c,color:#1c1c1c;
    classDef analysis fill:#E5DBFF,stroke:#1c1c1c,color:#1c1c1c;
    classDef writing fill:#FFD6E7,stroke:#1c1c1c,color:#1c1c1c;
    classDef review fill:#FFC9C9,stroke:#1c1c1c,color:#1c1c1c;
    classDef neutral fill:#F1F3F5,stroke:#1c1c1c,color:#1c1c1c;

    class A,D,E,F,R primary;
    class WR router;
    class QC code;
    class QO code;
    class KC context;
    class GA analysis;
    class GV analysis;
    class RC context;
    class MW writing;
    class G,GP,GR review;
    class EX,GE,FX neutral;
```

## Reading Guide

- The user talks only to `auto`.
- `auto` handles simple work directly.
- `workflow-route` decides which specialist to call for non-trivial work.
- Specialists return control back to `auto`.
- If the final state changed files, `glm-reviewer` reviews the completed result first.
- `gpt-critic` is used only when escalation is needed.

## Core Message

Open models do almost all of the work.

GLM does the default final review on completed changed work.
GPT is reserved for escalation only.
