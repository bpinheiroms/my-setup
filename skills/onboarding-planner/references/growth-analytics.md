# Growth Analytics: PostHog Events, Cohorts & A/B Testing

Deep dive into analytics strategy for mobile onboarding flows.
All examples use PostHog conventions. Adapt naming to your analytics provider.

---

## 1. Event Naming Convention

```
{flow}_{entity}_{action}

flow   = "onboarding" | "activation" | "retention" | "monetization"
entity = noun (screen, question, paywall, permission, demo, bridge, purchase)
action = past-tense verb (viewed, answered, selected, dismissed, completed, abandoned, tapped, scrolled, spun)

Examples:
  onboarding_screen_viewed
  onboarding_question_answered
  onboarding_paywall_dismissed
  onboarding_purchase_completed
```

**Rules:**
- Always snake_case
- Actions always past tense
- Never embed variable data in event names (use properties)
- Exception: critical events get specific names (e.g. `onboarding_purchase_completed`)
- PII rules: never include actual name/email/phone. Use booleans (`email_provided: true`)
- Money: always include `currency` alongside `price`
- Time: always in milliseconds with `_ms` suffix

---

## 2. Complete Event Catalog

### Lifecycle Events

```
onboarding_started
  language, referrer, device_type, utm_source, utm_campaign

onboarding_completed
  total_duration_ms, total_steps_viewed, total_steps_skipped,
  total_back_presses, subscription_status (subscribed|trial|free),
  plan_type, revenue, discount_percent, notification_permission (granted|denied),
  email_provided, phone_provided, name_provided, referral_code_used,
  goal_type, education_path_shown

onboarding_abandoned
  last_step_number, last_step_name, last_step_phase,
  total_duration_ms, total_steps_completed,
  abandonment_type (app_killed|backgrounded|back_to_store)

onboarding_resumed
  resumed_at_step, time_away_ms
```

### Screen Navigation Events

```
onboarding_screen_viewed
  step_number, step_name, step_phase, step_type,
  progress_percent, time_since_start_ms, time_since_last_step_ms,
  is_returning

onboarding_back_pressed
  from_step_number, from_step_name, to_step_number,
  total_back_presses_so_far
```

### Question Events

```
onboarding_question_answered
  step_number, step_name, question_type,
  answer_value (string|string[]|number), answer_label,
  time_on_step_ms, changed_answer (boolean)

// High-value specific events (optional, for dedicated funnels):
onboarding_goal_selected
  goal_type (lose|maintain|gain)

onboarding_emotional_state_selected
  emotional_state (frustrated|avoidant|resigned|determined)

onboarding_target_set
  current_value, target_value, delta

onboarding_barriers_selected
  barriers (string[]), barrier_count

onboarding_desires_selected
  desires (string[]), desire_count
```

### Bridge Events

```
onboarding_bridge_viewed
  step_number, bridge_type, time_on_step_ms, scroll_depth_percent
```

### Demo / Simulation Events

```
onboarding_demo_started
  step_number

onboarding_demo_interaction
  interaction_type (tap_capture|scroll|swipe), step_in_demo

onboarding_demo_completed
  time_to_complete_ms, interaction_count

onboarding_demo_result_viewed
  time_viewing_result_ms

onboarding_demo_result_scrolled
  scroll_depth_percent
```

### Social Proof Events

```
onboarding_testimonial_viewed
  testimonial_id, time_on_step_ms

onboarding_rating_request_shown

onboarding_rating_request_responded
  action (rated|not_now|dismissed), rating (1-5|null)
```

### Permission Events

```
onboarding_permission_prompted
  permission_type (notification|camera|location|health), prompt_type (custom_ui|os_dialog)

onboarding_permission_responded
  permission_type, granted (boolean), prompt_type, prompted_from (step_name)
```

### Identity Collection Events

```
onboarding_identity_submitted
  field_type (name|email|phone|referral_code), skipped (boolean),
  provided (boolean), step_number

// Aggregate for funnel:
onboarding_identity_fields_completed
  name_provided, email_provided, phone_provided, referral_provided
```

### Plan Events

```
onboarding_plan_generation_started
  total_onboarding_time_ms

onboarding_plan_generation_completed
  loading_duration_ms, recommended_calories, target_date, weight_goal

onboarding_plan_summary_scrolled
  scroll_depth_percent, viewed_research_links
```

### Paywall Events (MOST CRITICAL - track everything)

```
onboarding_paywall_shown
  paywall_type (free_trial|discount_wheel|wheel_result|best_prize|trial_reminder|standard_plans),
  paywall_sequence (1st, 2nd, 3rd...), total_paywalls_dismissed,
  time_since_plan_ready_ms

onboarding_paywall_cta_tapped
  paywall_type, cta_text, offer_price, offer_price_monthly,
  discount_percent, has_trial, trial_days

onboarding_paywall_dismissed
  paywall_type, paywall_sequence, time_on_paywall_ms, scroll_depth_percent

onboarding_discount_wheel_shown
  paywall_sequence, triggered_by

onboarding_discount_wheel_spun
  spin_number

onboarding_discount_wheel_result
  spin_number, result_type (percentage|gift), discount_percent,
  result_price, result_price_monthly, is_best_prize

onboarding_discount_offer_responded
  action (accept|spin_again|dismiss), discount_percent,
  offer_price, spin_number

onboarding_plan_selected
  plan_type (annual|monthly), price, price_monthly_equivalent

onboarding_purchase_initiated
  paywall_type, plan_type, price, currency, discount_percent,
  has_trial, trial_days, paywall_sequence

onboarding_purchase_completed
  paywall_type, plan_type, price, currency, discount_percent,
  has_trial, trial_days, transaction_id, revenue

onboarding_purchase_failed
  paywall_type, failure_reason (user_cancelled|payment_failed|network_error),
  plan_type, price

onboarding_trial_reminder_shown
  previous_paywalls_dismissed
```

### Post-Onboarding Events

```
onboarding_account_created
  method (google|apple|email), had_existing_account

onboarding_tour_started
  entered_via (subscription|trial|free)

onboarding_tour_step_viewed
  tour_step (1-8), tour_total_steps

onboarding_tour_skipped
  skipped_at_step

onboarding_tour_completed
  total_tour_time_ms

onboarding_nickname_submitted
  submitted (boolean), dismissed (boolean)

onboarding_affiliate_program_viewed
  time_on_screen_ms
```

---

## 3. Global Properties (sent with every event)

```typescript
{
  distinct_id: string,
  $device_id: string,
  platform: "ios" | "android",
  app_version: string,
  onboarding_session_id: string,    // unique per onboarding attempt
  onboarding_variant: string | null, // A/B test variant
  language: string,
  step_number: number,
  step_name: string,
  step_phase: string,
  time_since_start_ms: number,
  time_since_last_step_ms: number
}
```

---

## 4. Funnel Definitions

### Primary Funnel
```
1. onboarding_started
2. onboarding_question_answered (step: goal_select)
3. onboarding_demo_completed
4. onboarding_plan_generation_completed
5. onboarding_paywall_shown (paywall_sequence: 1)
6. onboarding_purchase_initiated
7. onboarding_purchase_completed
8. onboarding_completed
```

### Paywall Sub-Funnel
```
1. onboarding_paywall_shown (type: free_trial)
2. onboarding_paywall_dismissed (type: free_trial)
3. onboarding_discount_wheel_shown
4. onboarding_discount_wheel_spun
5. onboarding_discount_offer_responded (accept OR spin_again)
6. onboarding_purchase_initiated
7. onboarding_purchase_completed
```

### Permission Funnel
```
1. onboarding_permission_prompted (type: notification, prompt: custom_ui)
2. onboarding_permission_responded (type: notification, prompt: custom_ui)
3. onboarding_permission_prompted (type: notification, prompt: os_dialog)
4. onboarding_permission_responded (type: notification, prompt: os_dialog, granted: true)
```

---

## 5. Dashboard Metrics

| Metric | Formula | Target | Alert If |
|--------|---------|--------|----------|
| Quiz Start Rate | started / app_opened | >80% | <60% |
| Step Completion (per step) | step(N+1) / step(N) | >90% | <80% |
| Overall Completion | completed / started | >15% | <8% |
| Median Time to Complete | p50(total_duration_ms) | 4-8 min | >12 min |
| Paywall Reach Rate | paywall_shown / started | >25% | <15% |
| Trial Start Rate | purchase_completed(trial) / paywall_shown | >15% | <8% |
| Direct Subscription Rate | purchase_completed(!trial) / paywall_shown | >3% | <1% |
| Paywall Conversion (total) | any_purchase / paywall_shown | >18% | <10% |
| Wheel Engagement | wheel_spun / wheel_shown | >60% | <40% |
| Avg Discount Given | mean(discount_percent) where purchased | <25% | >35% |
| Revenue Per Start | total_revenue / started | Track trend | Week-over-week drop >20% |
| Notification Opt-in | granted / prompted | >50% | <30% |
| PII Collection Rate | (email OR phone) / completed_profile | >40% | <20% |
| Demo Engagement | demo_completed / demo_started | >85% | <70% |
| Back Press Rate | users_with_back / all_users | <20% | >30% |
| Store Rating Participation | rated / shown | >15% | N/A |

### Real-Time Alerts
- Any step drop-off >10% from 7-day average
- Purchase failure rate >20%
- Daily paywall conversion drops below 10%

---

## 6. Cohort Analysis

### Behavioral Cohorts

| Cohort | Definition | Purpose |
|--------|-----------|---------|
| Speed Runners | time < p25 | Validate if fast = low retention |
| Deliberators | time > p75 | High investment, likely higher intent |
| Back-Pressers | 3+ back presses | Confusion or discomfort signal |
| Skippers | skipped 2+ optional fields | Low trust / low commitment |
| Demo Engagers | scrolled result + >10s on result | High product interest |
| Emotionally Determined | selected "determined" | Highest intent |
| Emotionally Frustrated | selected "frustrated" or "avoidant" | High pain = possibly higher LTV |
| Wheel Spinners | spun 2+ times | Engaged with gamification |
| Instant Converters | subscribed on first paywall | Compare LTV vs wheel converters |
| Discount Chasers | 2+ paywall dismissals before purchase | Lower WTP, higher churn risk |
| Knowledge Seekers | answered "No" to knowledge check | Needs more in-app guidance |
| Referral Users | entered valid referral code | Track retention vs organic |

### Early Signals -> Long-term Outcomes

| Signal (Onboarding) | Predicted Outcome |
|---------------------|-------------------|
| Completed demo + scrolled result | D30 retention +15% |
| Selected 3+ barriers | D14 retention +10% |
| Emotional = determined | D7 active sessions +20% |
| Provided email + phone | D30 retention +25% |
| Time 3-6 minutes | Optimal D7 retention |
| Notification granted | D14 retention +30% |
| Goal = lose + barrier = consistency | Highest churn risk (needs Day 1-3 nudges) |

### PostHog Cohort Definitions

```
// High Intent
Rule: emotional_state = "determined"
  AND demo_result_scrolled
  AND notification_granted

// At-Risk
Rule: back_pressed 3+ times
  OR abandoned at permissions phase
  OR total_duration > 10 minutes

// Discount Sensitive
Rule: wheel_spun 2+ times
  OR paywall_dismissed 3+ times before purchase
```

---

## 7. A/B Test Playbook

### Test 1: Onboarding Length (HIGH IMPACT)
**Hypothesis**: Cutting motivational bridges will increase paywall reach +10-15%.
- Control: All 3 motivational screens
- Variant A: Keep only 1 motivational screen
- Variant B: Skip all motivational screens
- Primary: Paywall reach rate
- Watch: Paywall conversion rate (ensure it doesn't drop)

### Test 2: Feature Demo Placement
**Hypothesis**: Moving demo after paywall reduces length, increases paywall reach.
- Control: Demo before paywall
- Variant A: No demo (straight to social proof)
- Variant B: Demo after paywall (first-use experience)
- Primary: Paywall conversion rate
- Risk: Demo might be the key driver. Test carefully.

### Test 3: Paywall Strategy
**Hypothesis**: Simpler paywall outperforms gamified wheel.
- Control: Free trial -> Wheel -> Best prize -> Standard
- Variant A: Single paywall (trial + annual/monthly toggle)
- Variant B: Trial -> One fixed discount if dismissed
- Primary: Revenue per onboarding start (ARPU)
- Watch: Trial start rate, D30 retention

### Test 4: PII Collection Timing
**Hypothesis**: Moving PII after paywall reduces pre-paywall drop-off.
- Control: Name + Email + Phone before paywall
- Variant A: Only email before, rest after
- Variant B: All PII after paywall
- Primary: Paywall reach rate (+15-20% expected for B)

### Test 5: Emotional Question Framing
**Hypothesis**: Positive framing reduces drop-off without hurting conversion.
- Control: "How do you feel about your weight?" (negative options)
- Variant A: "What motivates you to start?" (positive framing)
- Variant B: Skip emotional question entirely
- Primary: Step completion rate
- Watch: Paywall conversion (emotional priming matters)

### Test 6: App Rating Timing
**Hypothesis**: Post-onboarding rating (Day 7) yields better reviews.
- Control: Rating request during onboarding
- Variant A: No rating during onboarding (request at Day 7)
- Primary: Average store rating, D7 retention

### Priority Order
1. PII timing (highest expected impact, lowest risk)
2. Onboarding length (high impact)
3. Paywall strategy (high revenue impact)
4. Emotional framing (medium impact)
5. Demo placement (needs careful testing)
6. Rating timing (low urgency)
