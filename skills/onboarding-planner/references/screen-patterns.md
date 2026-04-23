# Screen Patterns & Component Taxonomy

Reusable screen types, component patterns, and flow configuration for mobile onboarding.
Extracted from real case study analysis (FitCal, 58 screens).

---

## 1. Screen Type Taxonomy

### Question Screens

**Single-Choice List**
- Full-width cards stacked vertically
- 2-4 options max
- Unselected: light gray bg. Selected: dark/black fill with white text
- Optional: icon at left, subtitle under title
- CTA "Continue" at bottom (disabled until selection)
- Use for: gender, goal type, activity level, yes/no gates

**Multi-Choice with Icons**
- Same card layout but allows multiple selections
- Leading icon per option
- "Select all that apply" instruction
- Min 1, max varies
- Use for: obstacles, desires, preferences, interests

**Scroll Picker**
- Native wheel/drum picker, centered
- 2-3 columns (height+weight, day+month+year)
- Active row highlighted with pill bg
- Smart defaults (reduce friction)
- Use for: height, weight, date of birth, any numeric value

**Horizontal Ruler Slider**
- Large number display at top
- Horizontal ruler with tick marks at bottom
- Live delta calculation ("+X kg" in green)
- Reference value shown below ruler
- Use for: target weight, target level, any numeric goal

**Slider with Anchors**
- Horizontal slider with illustration anchors
- Animal metaphors work well (sloth=slow, cheetah=fast)
- "Recommended" label at default position
- Live value display updates as slider moves
- Use for: pace, intensity, difficulty, frequency

**Text Input**
- Title + subtitle + single text field
- Full-width gray bg field
- ALWAYS has "Skip" button
- Variants: plain text, email, phone (with country code picker)
- Use for: name, email, phone, referral code

**Binary Choice**
- Two large buttons (Yes / No) or (Sim / Nao)
- Used as conditional gates (branch the flow based on answer)
- Use for: knowledge checks, preference gates

### Bridge/Hook Screens

**Data Comparison**
- Line or bar chart comparing app vs alternative
- Statistical claim as subtitle ("80% of users...")
- No user action required besides "Continue"
- Use after: demographics, early in flow

**Emotional Mirror**
- Text-only screen
- References user's previous answer directly: "You said you're {{answer}}"
- Motivational follow-up text
- Personalized per answer option (need template per possible answer)
- Use after: emotional state question

**Goal Validation**
- Bold statement: "{{goal}} is REALISTIC!"
- Personalized with user's specific numbers
- Highlighted value in brand color
- Encouraging body text
- Use after: target setting (weight, level, etc.)

**Motivational Push**
- Aspirational message: "Your best version is waiting"
- Highlighted keyword in accent color
- Body text tailored to goal type
- Use before: deeper question sections

**Comparison Stats**
- Side-by-side bar chart (standard vs with app)
- Clear multiplier: "2X more" or "3X faster"
- Subtitle citing scientific backing
- Use after: preference questions

**Progress Timeline**
- Area/line chart with milestone markers
- Milestones at 3, 7, 30 days (with icons: circle, star, trophy)
- Shows that results start quickly
- Use at: end of question sections

**Educational (conditional)**
- Text-heavy with concrete examples
- Relatable numbers ("1 banana = ~90 calories")
- Only shown conditionally (if user said they DON'T know)
- Pair with validation screen for those who DO know
- Use after: knowledge check binary questions

**Testimonial**
- Photo (before/after or portrait)
- Specific stat: "+10kg in 3 months"
- Duration label
- User quote in quotation marks
- Use: pre-paywall, after demo

**Social Proof Aggregation**
- Star rating (5 stars)
- Avatar cluster (3-5 small photos)
- User count: "+10K users"
- Featured review card (title + body + stars)
- Use: pre-paywall, after testimonial

**Value Proposition**
- 4 benefits in a list
- Each: icon + title + short description
- Subtly serves as "reasons to subscribe"
- Use: right before permissions or paywall

### Simulation Screens

**Camera Demo**
- Full-screen camera viewfinder (simulated, not real camera)
- Step 1: Tooltip "Center the item in the highlighted area"
- Step 2: Tooltip "Tap the button to see how it works"
- Step 3: Capture (fake shutter)
- Step 4: Result screen with AI analysis
- No progress bar during simulation
- Use for: any AI/camera feature

**Interactive Demo (generic)**
- Show the core feature with pre-loaded data
- User interacts (tap, swipe, select)
- Show personalized result
- Adapt to whatever the app's core feature is

### Loading/Generation Screens

**Plan Generation Loading**
- Circular progress indicator (animated, 0-100%)
- Checklist of steps: "Analyzing your data ✓", "Calculating plan...", etc.
- Social proof card at bottom during wait
- 5-8 seconds optimal duration
- Can overlay OS permission dialogs during this time (user is passive)

### Plan Display

**Personalized Plan**
- Success header: checkmark icon + "Congratulations!"
- Goal prediction with specific numbers and target date
- Macro/metric rings or circles (editable)
- Benefit bullets
- Research references at bottom (scrollable)
- CTA shifts to: "Get your X free days"

### Paywall Screens

**Free Trial (simple)**
- Title: "We want you to try [App] FOR FREE"
- App preview image (showing core feature)
- "Test for $0" CTA
- Trust badge: "No payment made now"
- Footer: Privacy, Restore, Terms links

**Trial Timeline**
- 3-step visual timeline:
  - Today: full access (lock-open icon)
  - Day X-1: reminder notification (bell icon)
  - Day X: subscription starts (crown icon)
- Shows exact date of charge

**Plan Selector**
- Toggle between Annual and Monthly
- Annual: price + monthly equivalent + "MOST POPULAR" badge
- Monthly: higher price (exists as decoy/anchor)
- CTA: "Start for free"
- Trust badges: "Cancel anytime", "Secured by [Store]"

**Trial Reminder**
- Bell icon with notification badge
- "We'll send a reminder before your trial ends"
- Trust badge
- Addresses the "what if I forget to cancel" objection

### Recovery Screens

**Discount Wheel**
- Spinning wheel with segments (5%, 10%, 15%, 20%, 25%, 30%, 40%, gift)
- "Spin" CTA button
- Result overlay: price, accept/spin-again buttons
- Max 2 spins (second always "wins" best prize)
- Scarcity text on final result

**Best Offer (final)**
- Shows the maximum discount
- "You won't get this discount again"
- Only "Accept" button (no more spins)
- Highest urgency

### Permission Screens

**Notification Permission**
- Custom UI (not OS dialog) shown first
- Bell icon
- Stat: "Users with notifications are Xx more likely to reach goals"
- Preview notification cards (show what notifications look like)
- Primary CTA: "Allow Notifications"
- Secondary: "Maybe Later" (text link, less prominent)
- THEN trigger OS dialog if user taps "Allow"

### Account Creation

**OAuth Screen**
- "Access your account" title
- Google Sign-in button (outlined)
- Email sign-in button (filled, brand color)
- Placed LATE in flow (after paywall)
- Some apps add Apple Sign-in (required by Apple if any OAuth)

### Post-Onboarding

**Product Tour**
- Overlay on actual app screen
- Step counter (1/8, 2/8, etc.)
- Highlight area on screen
- "Next" and "Skip Tutorial" buttons
- Keep to 5-8 steps max

**Community Setup**
- Nickname input
- Shown over community/leaderboard screen (preview of social features)
- Rules for nickname (length, characters)

**Affiliate/Referral**
- Commission structure
- Referral code display
- Balance and withdrawal info
- Closes the growth loop (user can now bring others)

---

## 2. Transition Patterns

| From -> To | Transition |
|-----------|-----------|
| Question -> Question | Horizontal slide right |
| Question -> Bridge | Horizontal slide right (same as questions, seamless) |
| Any -> Simulation | Full-screen immersive (no header, no progress bar) |
| Any -> Paywall | New context (back button + close X) |
| Paywall -> Recovery | Modal overlay (dark bg, close X) |
| Any -> Loading | No navigation controls, auto-advances |
| Loading -> Plan | Fade or slide up (reveals result) |

---

## 3. Progress Bar Behavior

- Single continuous bar at top of screen
- Spans entire onboarding (not reset per section)
- Color: brand gradient (left filled, right gray)
- 0% at first question, ~95% at last question before loading
- NOT visible on: welcome, simulation, loading, paywall, recovery, post-onboarding
- Purpose: Zeigarnik Effect (incomplete bar drives completion)

---

## 4. Flow Configuration Schema (YAML)

Template for defining any onboarding flow:

```yaml
version: "1.0"
app:
  name: "AppName"
  brandColor: "#HEX"
  logo: "assets/logo.svg"

settings:
  progressBar:
    visible: true
    color: "{{app.brandColor}}"
    excludeTypes: [welcome, simulation, loading, paywall, recovery]
  defaultTransition: "slide-horizontal"
  analytics:
    provider: "posthog"

flow:
  - id: "step_id"
    type: "question | bridge | simulation | loading | plan | paywall | recovery | permission | account | post"
    variant: "single-choice | multi-choice | scroll-picker | slider | text-input | etc."
    section: "entry | demographics | goals | depth | demo | social_proof | permissions | plan | monetization | post"
    config:
      title: "Screen title"
      subtitle: "Explanation text"
      # ... type-specific config
    storeAs: "user.fieldName"           # where to save answer
    condition: "user.field == 'value'"   # when to show this screen
    branching:                           # conditional next step
      - condition: "user.field == 'a'"
        next: "step_id_a"
      - condition: "user.field == 'b'"
        next: "step_id_b"
    analytics:
      event: "event_name"
      properties: { key: "{{value}}" }
    onDismiss: "step_id"                 # for paywall/recovery: where to go on dismiss
    onAccept: "step_id"                  # for paywall/recovery: where to go on accept

bridgePlacementRules:
  - trigger: "consecutiveQuestions >= 3"
    insert: "bridge"
  - trigger: "question.type == 'emotional'"
    insertAfter: "emotional-mirror"
  - trigger: "nextSection == 'monetization'"
    insertBefore: "value-proposition"

computations:
  # App-specific calculations from collected data
  dailyCalories: "formula(...)"
  targetDate: "today + (delta / speed) * 7 days"
```

---

## 5. MVP vs V2 Feature Matrix

| Feature | MVP (ship now) | V2 (after data) |
|---------|---------------|-----------------|
| Easy questions (3-5) | Yes | Optimize count based on drop-off |
| Goal + emotional questions | Yes | A/B test emotional framing |
| Bridge screens (3-4) | Yes (generic stats) | Add real user data, testimonials |
| Feature demo | Yes (even if simple) | Polish interaction, add more features |
| Social proof | Placeholder (industry stats) | Real testimonials + numbers |
| Notification permission | Yes | Test timing (before vs after paywall) |
| Plan generation loading | Yes (3-5 seconds) | Optimize duration |
| Personalized plan display | Yes | Add more personalization |
| Free trial paywall | Yes | Add recovery layers |
| Discount wheel | No | Add after baseline conversion data |
| Multiple recovery layers | No | Add incrementally |
| App Store rating request | No | Add at Day 7 post-onboarding |
| Affiliate program | No | Add after product-market fit |
| A/B testing | No | Add after baseline metrics |
