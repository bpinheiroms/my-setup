# Case Study: FitCal Onboarding (58 Screens)

Complete analysis of a calorie counter app's onboarding flow.
Platform: Android (Google Play). Language: Portuguese (Brazil).

---

## Flow Overview

| Phase | Screens | Purpose |
|-------|---------|---------|
| Entry | 1 | Landing + language selector + "Start Quiz" |
| Demographics | 2-7 | Gender, workouts, height/weight, birth date, attribution |
| Goals & Emotions | 8-14 | Goal type, target weight, emotional state, 3 bridges |
| Depth Questions | 15-20 | Speed, obstacles, desires, knowledge check |
| Education | 21-24 | Conditional calorie education (branching) |
| Feature Demo | 25-29 | Camera food scan simulation + AI result |
| Social Proof | 30-33 | Testimonial, success stories, rating request, benefits |
| Permissions & Identity | 34-38 | Notifications, name, email, phone, referral code |
| Plan Generation | 39-40 | Fake loading + OS notification prompt |
| Plan Reveal | 41-43 | Personalized macros + research references |
| Paywall Gauntlet | 44-53 | Free trial, discount wheel (2 spins), plan selector |
| Post-Onboarding | 54-58 | Account creation, tutorial, community, affiliate |

**Stats:**
- 14 question screens
- 12 bridge/hook screens
- 5 simulation screens
- 10 paywall/recovery screens
- Ratio: ~1 bridge for every 1.2 questions (very high engagement maintenance)
- Value:Collection ratio: ~20 value screens : 22 collection screens

---

## Screen-by-Screen Detail

### Screen 1: Landing
- Food photo background, "Control your calories with ease"
- Language picker (EN/PT/ES)
- "Start Quiz" CTA (NOT "Sign up")
- "Already have an account?" secondary link
- Triggers: Curiosity, low commitment framing

### Screen 2: Gender (Single-choice)
- "Choose your Gender": Masculino, Feminino, Outro
- Subtitle: "This will be used to calibrate your personalized plan"
- Triggers: Foot-in-the-door, Commitment

### Screen 3: Workouts/week (Single-choice)
- 0-2 (occasional), 3-5 (some/week), 6+ (dedicated athlete)
- Title + subtitle format per option
- Triggers: Identity confirmation

### Screen 4: BRIDGE - Lasting Results (Data Comparison)
- Chart: FitCal (stable) vs Traditional Diet (yo-yo) over 6 months
- "80% of users maintain stable weight after 6 months"
- Triggers: Social proof, Authority, Loss aversion
- Placement: After 2 easy questions (perfect rhythm)

### Screen 5: Height & Weight (Scroll Picker)
- Dual scroll wheel: height (cm) + weight (kg)
- Defaults: 170cm, 70kg
- Triggers: Default effect (reduces friction)

### Screen 6: Birth Date (Date Picker)
- Triple scroll: Day/Month/Year
- Default: Jan 2001

### Screen 7: Attribution (Single-choice)
- "Where did you hear about FitCal?"
- Instagram, Facebook, TikTok, YouTube + more
- Business intelligence + social proof (implied popularity across platforms)

### Screen 8: Goal Selection (Single-choice, CRITICAL)
- Lose Weight / Maintain Weight / Gain Weight
- This is the FIRST identity commitment
- All subsequent content is personalized to this answer
- Triggers: Self-labeling, Identity commitment

### Screens 9-10: Target Weight (Horizontal Ruler)
- Slider with live delta: "+10.0 kg" in green
- Current weight shown as reference
- User literally builds their own goal
- Triggers: IKEA Effect, Endowment Effect

### Screen 11: Emotional State (Single-choice, HIGH IMPACT)
- "How do you feel about your weight today?"
- 4 options: Frustrated, Avoids mirror, Resigned, Determined to change
- 3 of 4 are negative (surfaces pain points deliberately)
- Triggers: Emotional activation, Self-labeling
- CRITICAL: Always follow with emotional mirror bridge

### Screen 12: BRIDGE - Emotional Mirror
- "You said you're determined. That's the energy you need!"
- Reflects user's own words back to them
- Locks in identity commitment
- Triggers: Commitment amplification, Labeling technique

### Screen 13: BRIDGE - Goal Validation
- "Gaining 10 kg is a REALISTIC goal!"
- Personalized with exact delta from screen 9
- Orange highlight on weight value
- Triggers: Confidence building, Self-efficacy

### Screen 14: BRIDGE - Motivational Push
- "Your best version is waiting to be built"
- Red highlighted keyword
- Personalized to goal type (muscle gain vs weight loss)
- Triggers: Aspirational identity, Future self

### Screen 15: Goal Speed (Slider with Anchors)
- Sloth (0.25 kg/wk) -> Rabbit -> Cheetah (1.5 kg/wk)
- "Recommended pace" at 0.5 kg/wk (slowest = longer subscription!)
- Triggers: Autonomy, Default Effect

### Screen 16: BRIDGE - Comparison Stats
- "Gain 2x more muscle with FitCal"
- Bar chart: Standard (20%) vs FitCal (2X)
- Triggers: Anchoring, Authority

### Screen 17: Obstacles (Multi-choice)
- "What's stopping you?" - lack of consistency, unhealthy habits, lack of support, busy schedule
- Multi-select deepens problem awareness
- Triggers: Problem amplification (admitting you NEED help)

### Screens 18-19: Desires (Multi-choice)
- "What would you like to achieve?" - eat healthier, more energy, stay motivated, feel better about body
- Multi-select, shows selected state (black fill)
- Triggers: Aspiration declaration

### Screen 20: BRIDGE - Progress Timeline
- Muscle growth chart with milestones: 3 days, 7 days, 30 days (trophy)
- "Your muscles respond better than you think"
- Triggers: Quick-win illusion (3 days!), Gamification (trophy)

### Screen 21: Calorie Knowledge (Binary Gate)
- "Do you know what calories are?" - Yes / No
- BRANCHES the flow (conditional education)
- Triggers: Personalization (flow adapts to you)

### Screens 22-23: BRIDGE - Education (conditional on "No")
- "Let us explain!" - calorie basics with relatable examples
- "How does this help you gain weight?" - caloric surplus concept
- Triggers: Reciprocity (free education), Competence building

### Screen 24: BRIDGE - Knowledge Validation
- "Great, you already have a foundation!"
- Shown regardless of path (both "Yes" and "No" converge here)
- Triggers: Positive reinforcement

### Screens 25-27: Feature Demo - Camera
- Camera viewfinder with steak + fries (pre-loaded, not real camera)
- Guided tooltips: "Center the plate" -> "Tap to take photo"
- User taps shutter button (physical engagement)
- This is the AHA MOMENT setup
- Triggers: Active participation, Try-before-buy

### Screens 28-29: Feature Demo - AI Result
- "Filet mignon with fries and sauce"
- 689 calories, 43g protein, 57g carbs, 30g fat
- Health Score: 6/10 with gradient bar
- Ingredients section (scrollable)
- THIS IS THE PEAK MOMENT of the entire onboarding
- Triggers: Peak-End Rule, Reciprocity (tangible free value), WOW factor

### Screen 30: Testimonial
- "Be like Rodrigo" - before/after photo
- +10Kg in 3 Months
- "I finally gained mass and feel much more confident"
- Triggers: Social proof, Similarity principle

### Screen 31: Success Stories
- 5 stars, 3 avatars, "+10K users with FitCal"
- Featured review: "Saved my busy routine"
- Triggers: Bandwagon effect, Authority

### Screen 32: App Store Rating Request
- Google Play native dialog overlaid on value proposition screen
- Appears BEFORE user has used the app (controversial)
- Strategically placed at emotional peak
- NOTE: Ethically questionable. Recommend moving to Day 7.

### Screen 33: Value Proposition
- 4 benefits: Save time (AI), Food Freedom, Mirror Confidence, Daily Energy
- "90% of users feel more attractive in 30 days"
- Last value delivery before permissions

### Screen 34: Notification Permission
- "Stay Focused" - bell icon
- "Users with notifications have 3x more chances of reaching their goals"
- Sample notification cards (weekly report, lunch reminder)
- "Allow" (prominent) vs "Maybe Later" (text link)
- Triggers: Loss aversion, Preview reduces abstraction

### Screens 35-37: Identity Collection
- Name (skippable), Email (skippable), Phone (skippable)
- Each on separate screen
- Classic foot-in-the-door escalation: easy -> medium -> hard
- ALL skippable to reduce abandonment
- Placed at ~65% through flow (high sunk cost)

### Screen 38: Referral Code (skippable)
- Growth loop: implies someone recommended the app
- Triggers: Social validation

### Screens 39-40: Plan Loading
- Circular progress (6%, 7%...) with animated checklist
- "Analyzing your data ✓, Calculating health score, Calculating macros..."
- Social proof card: "5,000+ 5-star reviews"
- OS notification dialog appears DURING loading (user is passive, more likely to tap "Allow")
- Duration: ~8 seconds
- Triggers: Investment illusion (fake computation = higher perceived value)

### Screens 41-43: Plan Reveal
- "Congratulations! Your personalized plan is ready!"
- 2772 Calories, 388g Carbs, Protein, Fat (macro rings)
- "You should gain 10 kg by June 1, 2026" (specific date!)
- Research references: Healthline, Harvard Health, PubMed, Mayo Clinic
- CTA changes to: "Get your 3 free days"
- Triggers: Endowment Effect (YOUR plan), Authority (citations), Concrete timeline

### Screen 44: Paywall Layer 1 - Free Trial
- "We want you to test FitCal FOR FREE"
- Camera scan preview image
- "Test for R$0" - "No payment made now"
- Privacy, Restore, Terms links
- Triggers: Zero-risk framing, Reciprocity

### Screen 45: Recovery - Discount Wheel
- Shown when user DISMISSES free trial
- Segments: 5%, 10%, 15%, 20%, 25%, 30%, 40%, Gift
- "Spin to try up to 40% off your annual plan"
- Triggers: Gamification, Variable reward (dopamine), Active participation

### Screen 46: Wheel Result 1
- Lands on gift segment: R$10.83/mo (R$129.99/year)
- "Accept Offer" or "Spin Again"
- Triggers: Near-miss psychology, Escalation

### Screen 47: Google Play Checkout (Discount 1)
- R$129.99/year subscription confirmation

### Screen 48: Wheel Result 2 (Best Prize)
- Lands on gift again: R$8.25/mo (R$98.99/year)
- "You got the BEST possible prize!"
- "You will NOT get a discount like this again!"
- No more spins available
- Triggers: Scarcity, Loss aversion, FOMO

### Screen 49: Google Play Checkout (Best Discount)
- R$98.99/year

### Screen 50: Trial Reassurance
- "We'll send a reminder before your free trial ends"
- Bell icon with badge "1"
- "Secured by Play Store"
- Triggers: Risk reversal, Trust signaling

### Screens 51-52: Plan Selector
- Timeline: Today (access) -> 2 Days (reminder) -> 3 Days (charge)
- ANNUAL: R$149.99/yr = R$12.50/mo "MOST POPULAR"
- MONTHLY: R$58.99/mo (decoy)
- Triggers: Decoy Effect, Anchoring, Default Effect

### Screen 53: Google Play Checkout (Standard)
- R$149.99/year with 3-day free trial

### Screens 54-55: Account Creation
- "Access your account" - Google or Email
- OS notification dialog appears again
- Placed at screen 54 of 58 (93% through!)
- Triggers: Maximum sunk cost

### Screen 56: In-App Tutorial
- "Welcome to FitCal!" overlay (1/8 steps)
- "Next" or "Skip Tutorial"

### Screen 57: Community Nickname
- Leaderboard preview behind nickname input sheet
- "Biggest Streaks" leaderboard
- Triggers: Social accountability, Gamification

### Screen 58: Affiliate Program
- "Your League: Beginner"
- $5.00 commission per sale
- Referral code displayed
- Closes the growth loop

---

## Key Metrics from This Flow

**Price tiers observed:**
- R$98.99/year (best wheel discount, ~R$8.25/mo)
- R$129.99/year (first wheel discount, ~R$10.83/mo)
- R$149.99/year (standard annual, ~R$12.50/mo)
- R$58.99/month (monthly decoy)

**Notable patterns:**
- 75% of flow is value delivery, 25% is commercial
- First payment mention at screen 41 (of 58)
- Account creation at screen 54 (of 58) - extremely late
- 3 notification permission attempts (screens 34, 40, 55)
- Bridge-to-question ratio: ~1:1.2 (very high)
- Feature demo placed at screens 25-29 (before paywall, after all questions)
- Emotional question (screen 11) is the psychological anchor of the entire flow
