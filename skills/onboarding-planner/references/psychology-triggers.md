# Psychology Triggers for Onboarding

Complete framework of psychological principles applicable to mobile onboarding flows.
Based on analysis of real high-conversion onboarding (FitCal case study, 58 screens).

---

## 1. Cialdini's Principles of Persuasion

### Commitment & Consistency
**What**: Once people commit to something (even small), they act consistently with that commitment.
**In onboarding**: Start with trivially easy questions (gender, age). Each answer is a micro-commitment. By question 10, the user feels compelled to continue because they've "already started."
**Example**: Gender selection (1 tap) -> activity level (1 tap) -> now the user has momentum.

### Social Proof
**What**: People follow the actions of others, especially similar others.
**In onboarding**: Layer social proof in 3 forms:
1. Statistical claims early ("80% of users maintain results after 6 months")
2. Individual testimonial mid-flow (before/after with specific numbers: "+10kg in 3 months")
3. Aggregate proof pre-paywall ("10K+ users, 5-star rating, featured reviews")
**Timing**: Spread across the flow. Don't cluster all social proof together.

### Authority
**What**: People defer to experts and credible sources.
**In onboarding**: Cite scientific sources (PubMed, Harvard Health, Mayo Clinic). Use data visualizations that look scientific. Show comparison charts with labeled axes.
**Example**: "Scientific studies show our app doubles your success rate" with bar chart.

### Scarcity / Urgency
**What**: People value things more when they're limited.
**In onboarding**: Use on paywall recovery only. "This discount won't be available again." Best when the user has already seen the standard price (creates reference point).
**Warning**: False scarcity is a dark pattern. Use sparingly and honestly.

### Reciprocity
**What**: People feel obligated to return favors.
**In onboarding**: Give value BEFORE asking for anything.
- Free education (explain calories, concepts)
- Free feature demo (let them try the AI scanner)
- Free personalized plan (calculated from their data)
Then the paywall feels like a fair exchange, not a demand.

### Liking
**What**: People are influenced by those they like or who are similar to them.
**In onboarding**: Testimonials should feature someone who matches the target ICP (same age range, similar goal, same demographic). Use first names and photos.

---

## 2. BJ Fogg Behavior Model (B = M × A × T)

**Behavior = Motivation × Ability × Trigger**

### Motivation Building (across the flow)

| Motivator | Where to Apply | Mechanism |
|-----------|---------------|-----------|
| Pain/Pleasure | Emotional state question + mirror | Surface current pain, visualize future pleasure |
| Hope/Fear | Goal validation bridge, comparison charts | "Your goal is realistic" (hope), "Traditional methods fail" (fear) |
| Social Acceptance | Testimonials, community features | "People like you are succeeding" |
| Identity | Goal selection, emotional mirror | "You're a determined person" (self-labeling) |
| Autonomy | Sliders, multi-select, pace control | User feels they're building THEIR plan |
| Competence | Education bridges, demo | User feels capable of using the tool |

### Ability Simplification

| Simplifier | Implementation |
|-----------|---------------|
| Time reduction | Scroll pickers with defaults, single-tap options, no typing |
| Physical effort | Large tap targets, minimal scrolling per screen |
| Cognitive load | Max 3-4 options per question, one question per screen |
| Social deviance | Social proof reduces feeling of "weird" for using the app |
| Money | "Free trial", "$0", "cancel anytime" reduces financial barrier |

### Trigger Sequencing

| Trigger Type | When to Use | Example |
|-------------|------------|---------|
| Spark (low motivation) | Bridge screens | Motivational push, success stories |
| Facilitator (low ability) | Education bridges, defaults | Calorie explainer, pre-set picker values |
| Signal (high M + high A) | Plan reveal, paywall CTA | "Get your 3 free days" when investment is maximum |

---

## 3. Behavioral Economics Principles

### Endowment Effect
**What**: People overvalue things they own or have created.
**In onboarding**: The personalized plan (calories, macros, target date) calculated from the user's answers feels like THEIR creation. "Your personalized plan is ready!" Leaving = abandoning something that belongs to them.
**How to maximize**: Use specific numbers from their inputs. Show "Calculated for YOU" language. Use possessive language ("your plan", "your goal").

### IKEA Effect
**What**: People value things more when they've put effort into creating them.
**In onboarding**: Every question answered = effort invested in the plan. Sliders and multi-selects increase participation. The user is literally building their own plan, piece by piece.
**Key**: Let users adjust parameters (speed slider, target weight ruler). Control = ownership.

### Sunk Cost Fallacy
**What**: People continue investing in something because of prior investment, even if it's irrational.
**In onboarding**: By the time the paywall appears (~70% through), the user has invested 15+ minutes answering personal questions. Abandoning means "wasting" all that time and data.
**Ethical note**: This is inherent in any multi-step flow. It becomes a dark pattern only when the flow is artificially padded to increase sunk cost without adding value.

### Anchoring
**What**: People rely heavily on the first number they see as a reference point.
**In onboarding paywall**:
- Show monthly price first ($58.99/mo), then annual equivalent ($12.50/mo) = annual looks like 79% savings
- Show full price before discount = discount feels bigger
- Discount wheel: show segments (5%, 10%, 15%, 20%, 25%, 30%, 40%) = user anchors to 40% as "possible"

### Loss Aversion
**What**: Losing something feels ~2x worse than gaining the same thing.
**In onboarding**:
- "Users with notifications are 3x more likely to reach their goals" = without notifications, you LOSE that advantage
- Personalized plan ready = closing the paywall means LOSING your custom plan
- "This discount won't be available again" = LOSING the deal

### Decoy Effect
**What**: A third option makes one of the other two look much better.
**In onboarding paywall**: Monthly ($58.99/mo) is the decoy. It exists solely to make Annual ($12.50/mo equivalent) look dramatically cheaper. Nobody is meant to choose monthly.

### Zeigarnik Effect
**What**: People remember and feel tension about incomplete tasks.
**In onboarding**: The progress bar creates visual tension. Starting the "quiz" creates a mental task that demands completion. Each section left incomplete gnaws at the user.

### Peak-End Rule
**What**: People judge experiences based on the peak moment and the end.
**In onboarding**: The feature demo (aha moment) IS the designed peak. Make it impressive, interactive, and deliver immediate value. The plan reveal is the designed "end" of the information-gathering phase. Both must be memorable.

---

## 4. Emotional Journey Arc

Every effective onboarding follows this emotional curve:

```
CURIOSITY        -> "What is this quiz?"
EASE/COMFORT     -> Easy questions, making progress
HOPE             -> "This app shows lasting results"
VULNERABILITY    -> Emotional state question
DETERMINATION    -> Mirror: "You said you're determined!"
OPTIMISM         -> "Your goal is realistic!"
ASPIRATION       -> "Your best version is waiting"
EMPOWERMENT      -> Sliders, choices, control
SELF-AWARENESS   -> Identifying obstacles and desires
WOW / DELIGHT    -> Feature demo (AHA MOMENT) ← PEAK
BELONGING        -> Testimonials, community proof
OWNERSHIP        -> "YOUR plan is ready"
DESIRE           -> Paywall (I want this)
RELIEF           -> "We'll remind you before trial ends"
```

**Key insight**: Emotional questions come BEFORE rational ones. Establish emotional commitment before engaging the rational mind. By the time the user is thinking about price, they've already emotionally committed.

---

## 5. Micro-Commitment Ladder

Each step escalates commitment incrementally:

```
1. Language selection      -> trivial, zero friction ("I'm engaging")
2. Start Quiz             -> framed as quiz, not signup ("I'm exploring")
3. Gender                 -> low-threat data ("I'm telling you about me")
4. Activity level         -> identity-confirming ("I'm someone who works out")
5. Height/Weight          -> intimate but clinical ("I trust you with body data")
6. Birthday               -> standard personal info ("This is getting personal")
7. Goal selection         -> intent declaration ("I want to change")
8. Target weight/level    -> quantified desire ("I'm committing to a specific outcome")
9. Emotional state        -> psychological disclosure ("I'm being vulnerable")
10. Obstacles/Desires     -> problem confession ("I've told you my challenges")
11. Feature demo          -> physical engagement ("I've tried the product")
12. Name/Email            -> identity surrender ("I'm a real person here")
13. Plan revealed         -> "MY plan is ready" (abandoning = losing it)
14. Free trial            -> "no risk" but payment method on file
15. Account creation      -> true point of commitment
```

---

## 6. Dark Patterns vs Ethical Persuasion

### Clearly Ethical
- Free feature demo before paywall (try-before-buy)
- Educational content that provides genuine value
- Skippable identity fields
- Scientific references and citations
- Trial reminder promise
- "Cancel anytime" messaging
- Clear pricing with exact charge dates

### Gray Area
- Fake loading screen (inflates perceived computation value)
- Multiple notification permission requests
- Emotional questions with negatively-loaded options
- Pre-use App Store rating request

### Dark Patterns (avoid or use with caution)
- Fake spin wheel (predetermined outcomes presented as random)
- False scarcity ("You'll NEVER get this discount again")
- Asymmetric dismiss buttons (tiny X, huge CTA)
- Collecting excessive PII before providing value
- Preventing app access entirely without subscription

### Recommendation for MVPs
Start with ethical techniques only. They're sufficient for good conversion.
Add gray-area techniques only if data shows specific drop-off problems.
Avoid dark patterns unless business survival depends on it and you understand the tradeoff.
