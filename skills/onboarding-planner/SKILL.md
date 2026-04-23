---
name: onboarding-planner
description: |
  Plan high-conversion mobile app onboarding flows from scratch.
  Guides through discovery (with smart suggestions for MVPs),
  psychological triggers, screen-by-screen flow, paywall strategy,
  PostHog events, and KPIs.
  Based on real case study analysis (58 screens, 4 expert agents).
  Works for any app category. Asks questions, suggests answers.
user-invocable: true
---

# Onboarding Planner

Expert system for planning high-conversion mobile onboarding flows.
Based on deep analysis of real case studies, behavioral economics, and growth frameworks.

**Output**: Complete onboarding plan (flow, triggers, events, paywall). NO code implementation.

---

## STEP 1: DISCOVERY INTERVIEW

Ask these questions in conversational blocks. **For each question the user can't answer, SUGGEST options** based on the app type, industry benchmarks, and the reference case study.

### Block 1: The App

Ask all at once, then wait for answers:

```
1. What's the app? (name + one-sentence description)
2. What's the core "magic" feature? (the one thing users would pay for)
3. Business model? (freemium / trial+subscription / one-time / ads)
4. Pricing? (monthly, annual, trial days)
5. Platform? (iOS, Android, both)
```

**If user doesn't know pricing:**
Suggest based on category:
- Health/Fitness: $9.99/mo or $59.99/yr with 3-7 day trial
- Productivity: $4.99/mo or $29.99/yr with 7 day trial
- Social/Lifestyle: $6.99/mo or $39.99/yr with 3 day trial
- Education: $12.99/mo or $79.99/yr with 7 day trial
- Always recommend annual as default (lower churn, higher LTV)
- Monthly exists as a decoy (anchor for annual to look cheap)

**If user doesn't know business model:**
- For MVP: recommend freemium with trial (lowest barrier, maximum data)
- Subscription is standard for apps with ongoing value delivery
- One-time purchase only for tools with no recurring engagement

### Block 2: The User (ICP)

```
6. Who's the ideal user? (age range, context, lifestyle)
7. What's their main pain? (the problem that makes them search for this app)
8. What's the "trigger moment"? (when do they decide to look for a solution)
9. Knowledge level? (beginner, intermediate, expert in the domain)
10. Where do they come from? (ads, organic search, referral, influencers, TikTok)
```

**If user doesn't know ICP:**
Suggest based on app category. Examples:

| Category | Typical ICP | Main Pain | Trigger Moment |
|----------|------------|-----------|----------------|
| Fitness/Health | 25-40, wants to change body | Lack of consistency, no guidance | New Year, breakup, doctor visit, summer approaching |
| Calorie Counter | 20-35, health-conscious | Doesn't know what/how much to eat | Weight gain noticed, fitness goal set |
| Church/Religious | 25-55, active in community | Disconnected from community, hard to follow schedule | Joined new church, wants deeper engagement |
| Calisthenics | 18-35, gym alternative | Can't afford gym or prefers bodyweight | Saw someone doing impressive moves, wants freedom from gym |
| Mental Health | 22-45, stressed professionals | Anxiety, sleep issues, burnout | Panic attack, therapist suggestion, life crisis |
| Finance/Budget | 25-40, wants financial control | Spends more than earns, no visibility | End of month broke, debt, financial goal |
| Language Learning | 18-40, career or travel motivated | Tried and failed before, no consistency | Trip planned, job requires it, moved abroad |
| Social/Dating | 18-35 | Loneliness, hard to meet people | Moved to new city, ended relationship |

### Block 3: Product Capabilities

```
11. Can you simulate the core feature in onboarding? (interactive demo before signup)
12. What data do you NEED to personalize the experience? (weight, age, level, goals, etc.)
13. Does the app have social features? (community, leaderboard, sharing)
14. Does it have referral/affiliate program?
15. What permissions does the app need? (notifications, camera, location, contacts, health data)
```

**If user doesn't know about feature simulation:**
Suggest based on core feature:

| Core Feature | Simulation Idea |
|-------------|-----------------|
| AI food scanner | Show pre-loaded food photo, user taps "scan", show mock results |
| Workout generator | Show sample workout plan based on answers, let user browse |
| Budget tracker | Show sample month with mock transactions, highlight savings |
| Language lessons | One mini-lesson (10 seconds) with instant feedback |
| Meditation | 30-second guided breathing exercise |
| Social discovery | Show nearby mock profiles/places, let user interact |
| Content/Reading | Show one piece of premium content as preview |
| Church/Community | Show upcoming events calendar with mock community activity |

The simulation is THE most important conversion driver. It creates the "aha moment" before asking for money. **Always recommend having one**, even if simple.

### Block 4: Current State

```
16. Is there an existing onboarding? (if yes, what are current metrics)
17. Direct competitors? (for benchmark reference)
18. Languages supported?
19. Any App Store restrictions or guidelines to follow?
20. Any hard constraints? (must collect X before Y, legal requirements, etc.)
```

**If MVP with no metrics:** That's fine. The plan will include PostHog events to start measuring from day 1.

**If no competitors known:** Suggest looking at top 10 apps in their App Store category. Offer to reason about likely patterns based on category.

---

## STEP 2: FLOW ARCHITECTURE

After receiving answers (or suggesting defaults for unknowns), build the flow.

### 2.1 Section Template

Every onboarding follows this skeleton. Adapt sections based on what makes sense for the app. Not all sections are mandatory.

```
SECTION A: ENTRY (1-2 screens)
  First impression. Video/image showing the app in action.
  Language picker if multi-language.
  CTA: "Start Quiz" or "Discover your plan" (NOT "Sign up")
  Secondary: "Already have an account? Sign in"

  WHY: Frame as discovery/quiz, not registration. Reduces perceived commitment.

SECTION B: EASY QUESTIONS (3-5 screens)
  Start with trivially easy questions (gender, age range, activity level).
  Insert 1 BRIDGE after 2-3 questions.

  WHY: Foot-in-the-door technique. Easy questions build momentum.
  RULE: Subtitle on every question explains WHY you're asking.
        Example: "This will be used to calibrate your personalized plan"

SECTION C: GOALS & EMOTIONS (3-4 screens)
  Main goal question (what do you want to achieve?)
  Quantified goal (target weight, target level, etc.)
  Emotional state question ("How do you feel about X today?")
  Bridge: Mirror their answer back ("You said you're determined!")
  Bridge: Validate their goal ("Your goal is totally realistic!")

  WHY: Identity commitment + emotional activation = strongest conversion drivers.

SECTION D: DEPTH QUESTIONS (3-5 screens)
  Obstacles ("What's stopping you?") - multi-select
  Desires ("What would you like to achieve?") - multi-select
  Preferences (pace, difficulty, style)
  Conditional branching (knowledge check -> education if needed)
  Bridges with authority data between questions.

  WHY: Deepens investment. Each answer makes the plan feel more "theirs."

SECTION E: FEATURE DEMO / AHA MOMENT (2-5 screens)
  Interactive simulation of the core feature.
  User DOES something (taps, swipes, interacts).
  Shows personalized result based on their data.

  WHY: This is the single most important conversion moment.
  The user experiences value BEFORE being asked to pay.
  MANDATORY before paywall.

SECTION F: SOCIAL PROOF (2-3 screens)
  Individual testimonial (before/after, specific numbers, photo)
  Aggregate proof (X users, Y stars, featured review)
  App Store rating request (OPTIONAL - controversial, see notes)
  Value proposition summary (4 key benefits with icons)

  WHY: Addresses "is this legit?" objection right before paywall.

SECTION G: PERMISSIONS & IDENTITY (2-5 screens)
  Notification permission (show example notifications, explain value)
  Name input (SKIPPABLE)
  Email input (SKIPPABLE)
  Referral code (SKIPPABLE)

  WHY: Placed LATE because sunk cost from 20+ answered questions
  makes users more likely to provide data.
  RULE: Every identity field MUST be skippable.

SECTION H: PLAN GENERATION (1-2 screens)
  Animated loading ("Analyzing your data..." with checklist)
  Social proof during wait ("5,000+ 5-star reviews")

  WHY: Creates illusion of personalized computation.
  Increases perceived value of the result.
  NOTE: Keep it short (5-8 seconds). Long fake loading is a dark pattern.

SECTION I: PLAN REVEAL + PAYWALL (3-8 screens)
  Personalized plan with user's specific data and target date.
  CTA: "Get your X free days"
  If dismissed: Recovery flow (discount wheel, better offer, etc.)
  Plan selector: Annual vs Monthly (annual as default, marked "MOST POPULAR")
  Trial reassurance: "We'll remind you before trial ends"

  WHY: User now OWNS the plan (endowment effect).
  Leaving = losing something that was built for them.

SECTION J: POST-ONBOARDING (2-4 screens)
  Account creation (Google/Apple/Email) - LATE, after paywall
  Quick product tour (max 5-8 steps, skippable)
  Community setup if applicable (nickname, avatar)
  Referral/affiliate CTA if applicable

  WHY: Account creation is placed after paywall because user has
  maximum sunk cost and is most likely to complete.
```

### 2.2 Bridge Placement Rules

Bridges are screens that DELIVER value between questions. They prevent fatigue and build desire.

**Placement rules:**
- Insert 1 bridge every 2-3 consecutive questions
- ALWAYS insert bridge after emotional questions
- ALWAYS insert bridge before asking for personal data
- ALWAYS insert bridge before paywall section
- NEVER put 2 bridges in a row (feels like filler)

**Bridge types and when to use:**

| Type | When | Example |
|------|------|---------|
| Data Comparison | After demographics | Chart: "App vs traditional method over 6 months" |
| Emotional Mirror | After emotional question | "You said you're determined. That's the energy!" |
| Goal Validation | After goal setting | "Your goal of X is totally realistic!" |
| Motivational Push | Before deeper section | "Your best version is waiting to be built" |
| Authority Stats | After preferences | "2X more results with our app (scientific study)" |
| Educational | Conditional (if user doesn't know X) | Simple explanation of key concept |
| Progress Timeline | End of question section | Visual: results at 3, 7, 30 days |
| Testimonial | Pre-paywall | Before/after from real user with specific numbers |
| Social Proof | Pre-paywall | "10K+ users, 5 stars, featured review" |
| Value Proposition | Pre-permissions | List of 4 key benefits with icons |

**IMPORTANT for MVPs:** If you don't have real testimonials or user stats, use:
- Industry statistics ("Studies show X improves Y by Z%")
- Expert quotes or citations
- Concrete feature benefits instead of user stories
- Add testimonials later as you get real users

### 2.3 Question Design Rules

| Type | When to Use | Max Options |
|------|-------------|-------------|
| Single-choice cards | Simple questions, 2-4 options | 4 |
| Multi-choice with icons | Obstacles, desires, preferences | 5-6 |
| Scroll picker | Numeric values (height, weight, date) | N/A |
| Horizontal slider | Scales (speed, intensity, difficulty) | N/A |
| Binary (Yes/No) | Conditional gates | 2 |
| Text input | Name, email (ALWAYS skippable) | N/A |

**Rules:**
- 1 question per screen (NEVER 2)
- Every question has subtitle explaining "why" you're asking
- Progress bar at top (continuous across all sections)
- Smart defaults on pickers (reduces friction)
- CTA "Continue" at bottom (disabled until selection made)
- Selected state = filled/dark card (clear visual feedback)

---

## STEP 3: PSYCHOLOGICAL TRIGGERS

For each screen, apply relevant triggers. Read `references/psychology-triggers.md` for full details.

**Quick reference by section:**

| Section | Primary Triggers |
|---------|-----------------|
| Entry | Zeigarnik Effect (incomplete quiz creates tension to finish), Curiosity Gap |
| Easy Questions | Commitment & Consistency, Foot-in-the-door |
| Goals | Self-labeling, Identity Commitment ("I'm someone who wants to change") |
| Emotions | Emotional Activation, Mirroring, Validation |
| Depth | IKEA Effect (user builds their own plan), Autonomy, Sunk Cost |
| Demo | Peak-End Rule, Try-before-buy, Reciprocity |
| Social Proof | Bandwagon Effect, Similarity Principle, Authority |
| Permissions | Loss Aversion ("3x more likely to reach goals with notifications") |
| Plan Reveal | Endowment Effect ("YOUR plan is ready"), Concrete Timeline |
| Paywall | Anchoring (monthly as decoy), Scarcity, Gamification, Zero-risk framing |

---

## STEP 4: PAYWALL STRATEGY

### Multi-Layer Framework

```
LAYER 1: Free Trial (soft ask)
  "Test for $0" / "Start your X-day free trial"
  Zero-risk framing. No price shown prominently.
  -> If accepts: checkout flow
  -> If dismisses: Layer 2

LAYER 2: Gamified Recovery (optional, high impact)
  Discount wheel / scratch card / slot machine
  User "wins" a discount (predetermined but feels earned)
  Option to "spin again" for better deal
  -> If accepts: checkout with discount
  -> If dismisses: Layer 3

LAYER 3: Best Offer + Scarcity
  "Best discount we can offer!"
  "This offer won't be available again"
  Last chance before standard pricing
  -> If accepts: checkout with best discount
  -> If dismisses: Layer 4

LAYER 4: Reassurance + Plan Selector (final)
  "We'll send a reminder before your trial ends"
  Annual vs Monthly toggle (annual default, "MOST POPULAR")
  Trial timeline visualization (Day 1: full access -> Day X: reminder -> Day Y: charge)
  Trust badges: "Secured by App Store", "Cancel anytime"
  -> If accepts: checkout
  -> If dismisses: enter app with free tier (if freemium) or blocked (if subscription-only)
```

**Pricing rules:**
- Always show monthly equivalent of annual plan
- Annual as default with "MOST POPULAR" badge
- Monthly exists as price anchor (decoy effect)
- Show exact charge date for transparency
- "Cancel anytime" on every paywall screen

**For MVPs without gamified paywall:**
Start with Layer 1 + Layer 4 only. Add Layer 2 and 3 once you have conversion data to optimize.

### Ethical Considerations

Some paywall techniques are dark patterns. For each, document:
- **Acceptable**: Free trial, annual/monthly comparison, trial reminder, trust badges
- **Gray area**: Fake loading screen, multiple notification asks, emotional questions with loaded options
- **Dark pattern**: Fake spin wheel (predetermined outcomes presented as random), false scarcity ("never again"), asking for App Store rating before user has tried the app
- **Recommendation**: Start ethical, add aggressive techniques only if data justifies them

---

## STEP 5: POSTHOG EVENT PLAN

### Naming Convention

```
{flow}_{entity}_{action}

flow   = "onboarding"
entity = noun (screen, question, paywall, permission, demo, bridge)
action = past tense verb (viewed, answered, dismissed, completed, abandoned)
```

### Required Events (every onboarding must have these)

```typescript
// === LIFECYCLE ===
onboarding_started
  // props: language, referrer, device_type

onboarding_screen_viewed
  // props: step_number, step_name, step_phase, step_type,
  //        time_since_start_ms, time_since_last_step_ms

onboarding_completed
  // props: total_duration_ms, total_steps_viewed, subscription_status,
  //        plan_type, notification_granted, email_provided, goal_type

onboarding_abandoned
  // props: last_step_number, last_step_name, last_step_phase,
  //        total_duration_ms, total_steps_completed

// === QUESTIONS ===
onboarding_question_answered
  // props: step_number, step_name, question_type,
  //        answer_value, time_on_step_ms, changed_answer

// === BRIDGES ===
onboarding_bridge_viewed
  // props: step_number, bridge_type, time_on_step_ms

// === DEMO / AHA MOMENT ===
onboarding_demo_started
onboarding_demo_completed
  // props: time_to_complete_ms, interaction_count

// === PAYWALL ===
onboarding_paywall_shown
  // props: paywall_type, paywall_sequence, time_since_plan_ready_ms

onboarding_paywall_cta_tapped
  // props: paywall_type, cta_text, offer_price, discount_percent, has_trial

onboarding_paywall_dismissed
  // props: paywall_type, paywall_sequence, time_on_paywall_ms

// === RECOVERY ===
onboarding_recovery_shown
  // props: recovery_type (wheel, scratch, etc.)

onboarding_recovery_interacted
  // props: interaction_type (spin, scratch), spin_number

onboarding_recovery_result
  // props: result_discount_percent, result_price

onboarding_recovery_accepted
onboarding_recovery_dismissed

// === PURCHASE ===
onboarding_purchase_initiated
  // props: plan_type, price, currency, has_trial, trial_days, discount_percent

onboarding_purchase_completed
  // props: same as above + transaction_id, revenue

onboarding_purchase_failed
  // props: failure_reason (user_cancelled, payment_failed, network_error)

// === PERMISSIONS ===
onboarding_permission_prompted
  // props: permission_type (notification, camera, location)

onboarding_permission_responded
  // props: permission_type, granted (boolean)

// === NAVIGATION ===
onboarding_back_pressed
  // props: from_step_number, from_step_name

onboarding_resumed
  // props: resumed_at_step, time_away_ms
```

### Global Properties (sent with every event)

```typescript
{
  distinct_id: string,
  platform: "ios" | "android",
  app_version: string,
  onboarding_session_id: string,
  onboarding_variant: string | null,  // A/B test variant
  language: string,
  step_number: number,
  step_name: string,
  step_phase: string  // "entry" | "demographics" | "goals" | "depth" |
                      // "demo" | "social_proof" | "permissions" | "plan" |
                      // "paywall" | "post_onboarding"
}
```

### Primary Funnel (configure in PostHog)

```
1. onboarding_started
2. onboarding_question_answered (step_name: goal_select)
3. onboarding_demo_completed
4. onboarding_paywall_shown (paywall_sequence: 1)
5. onboarding_purchase_initiated
6. onboarding_purchase_completed
7. onboarding_completed
```

### Key Metrics Dashboard

| Metric | Formula | Target |
|--------|---------|--------|
| Quiz Start Rate | started / app_opened | >80% |
| Step Completion Rate | step(N+1) / step(N) | >90% per step |
| Demo Engagement | demo_completed / demo_started | >85% |
| Paywall Reach Rate | paywall_shown / started | >25% |
| Trial Start Rate | purchase_completed(trial) / paywall_shown | >15% |
| Paywall Conversion (any) | purchase_completed / paywall_shown | >18% |
| Recovery Conversion | recovery_accepted / recovery_shown | >20% |
| Notification Opt-in | granted / prompted | >50% |
| Median Completion Time | p50(total_duration_ms) | 4-8 min |
| Drop-off per Step | 1 - (step(N+1)/step(N)) | <10% |

### Cohort Definitions (for later analysis)

| Cohort | Definition | Purpose |
|--------|-----------|---------|
| Speed Runners | completion_time < p25 | Check if fast = low retention |
| Demo Engagers | demo_completed + scrolled result | High product interest signal |
| Emotionally Determined | emotional_state = "determined" | Highest intent, track conversion |
| Discount Chasers | 2+ paywall dismissals before purchase | Higher churn risk |
| Instant Converters | purchased on first paywall | Compare LTV vs discount chasers |
| Skippers | skipped 2+ optional fields | Low trust signal |

---

## STEP 6: A/B TEST SUGGESTIONS

After the first version ships and has data, suggest these tests:

| Test | What to Vary | Primary Metric |
|------|-------------|----------------|
| Onboarding length | Cut motivational bridges vs keep all | Paywall reach rate |
| Demo placement | Before paywall vs after paywall | Paywall conversion |
| Paywall strategy | Simple (trial only) vs gamified (wheel) | Revenue per user |
| PII timing | Before paywall vs after paywall | Paywall reach rate |
| Emotional question | Negative framing vs positive vs skip | Step completion rate |
| Bridge frequency | Every 2 questions vs every 3 | Overall completion rate |
| App rating request | During onboarding vs Day 7 | Store rating quality |

---

## STEP 7: FINAL OUTPUT FORMAT

Deliver the plan as a structured document with these sections:

### Section 1: Flow Map
Complete screen-by-screen flow with branching logic in visual format.

### Section 2: Screen Details
For EACH screen:
- Screen number and name
- Type (question / bridge / simulation / paywall / etc.)
- Title and subtitle (in user's app language)
- Content (options, data, visuals)
- Data collected (if any, with store key)
- Psychological trigger(s)
- PostHog event
- Branching logic (if any)
- Notes for MVP vs future iteration

### Section 3: PostHog Event Plan
Complete event list with properties, funnels, and dashboard metrics.

### Section 4: Paywall Strategy
Layer-by-layer breakdown with pricing, copy, and recovery flow.

### Section 5: MVP vs V2 Recommendations
What to ship now vs what to add after getting initial data.
Flag screens that need real data (testimonials, stats) and suggest placeholders.

---

## REFERENCES

Read these for detailed knowledge:
- `references/psychology-triggers.md` - Complete psychological framework (Cialdini, Fogg, behavioral economics)
- `references/screen-patterns.md` - Screen type taxonomy, component library, flow config schema
- `references/case-study-fitcal.md` - Full 58-screen case study analysis
- `references/growth-analytics.md` - PostHog events deep dive, cohorts, A/B testing playbook
