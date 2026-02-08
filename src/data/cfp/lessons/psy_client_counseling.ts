/**
 * CFP Domain 8: Psychology of Financial Planning
 * Additional Psychology Lessons
 * 
 * These lessons expand coverage of client psychology, counseling techniques,
 * and working with diverse client situations.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_PSY2_LESSONS: CFPLesson[] = [
  {
    id: "CFP-PSY-L006",
    domain: "CFP-PSY",
    blueprintArea: "PSY-2",
    title: "Financial Counseling Skills",
    order: 6,
    duration: 45,
    objectives: [
      "Apply motivational interviewing techniques to financial planning",
      "Recognize when clients are ready for change vs. resistant",
      "Use reframing techniques to shift client perspectives",
      "Identify appropriate boundaries between planning and therapy"
    ],
    content: `
# Financial Counseling Skills

CFP® professionals need counseling skills to help clients translate goals into action. This lesson covers techniques that bridge the gap between planning and implementation.

---

## Motivational Interviewing (MI)

A collaborative, client-centered approach that helps resolve ambivalence about change.

### The Spirit of MI

| Element | Description | Example |
|---------|-------------|---------|
| **Partnership** | Work with, not on, the client | "Let's explore this together" |
| **Acceptance** | Respect autonomy and worth | "You're the expert on your own life" |
| **Compassion** | Prioritize client welfare | Focus on their goals, not yours |
| **Evocation** | Draw out client's motivation | "What reasons do you see for making a change?" |

### Core Skills (OARS)

- **O**pen-ended questions: "What would be different if you were debt-free?"
- **A**ffirmations: "It took courage to share that with me"
- **R**eflections: "It sounds like you're feeling torn between..."
- **S**ummaries: "Let me make sure I've captured what you've shared..."

---

## Stages of Change Model

Clients move through predictable stages when modifying financial behavior:

| Stage | Client Mindset | Planner Approach |
|-------|----------------|------------------|
| **Precontemplation** | "I don't have a problem" | Raise awareness gently, don't push |
| **Contemplation** | "Maybe I should..." | Explore pros/cons, tip the balance |
| **Preparation** | "I'm going to do this" | Plan specific steps, set timeline |
| **Action** | "I'm doing it" | Support, troubleshoot, celebrate wins |
| **Maintenance** | "I've been doing it" | Prevent relapse, reinforce identity |
| **Relapse** | "I slipped" | Normalize, learn, restart |

> **Key Insight**: Meeting clients where they are—not where you want them to be—is essential for lasting change.

### Matching Interventions to Stages

| Stage | Ineffective | Effective |
|-------|-------------|-----------|
| Precontemplation | "You need to start saving now" | "What do you imagine retirement looking like?" |
| Contemplation | "Here's your savings plan" | "What would need to happen for you to feel ready?" |
| Action | "You already know this" | "How's the first month going? What's working?" |

---

## Reframing Techniques

Help clients see situations from new perspectives:

### Examples

| Client Statement | Reframe |
|------------------|---------|
| "I can't afford to save" | "What would happen if we paid your future self first?" |
| "I'm terrible with money" | "You've been making choices without a system—let's build one" |
| "The market is too scary" | "Volatility is the price of admission for long-term returns" |
| "I'll never retire" | "Let's see what's possible with some adjustments" |

### When to Reframe
- Client is stuck in limiting beliefs
- Perspective is overly negative or catastrophizing
- Client can't see options or alternatives

### When NOT to Reframe
- Client is processing a genuine loss
- The situation actually is dire and needs addressing
- Reframe would feel dismissive

---

## Boundaries: Planning vs. Therapy

CFP® professionals are NOT therapists, but they encounter emotional situations regularly.

### When to Refer Out

| Situation | Action |
|-----------|--------|
| Client shows signs of clinical depression/anxiety | Suggest professional support |
| Marital conflict dominates sessions | Recommend couples counselor |
| Grief is preventing all decision-making | Connect with grief counselor |
| Addictive behaviors (gambling, spending) | Refer to specialist |
| Past trauma driving financial decisions | Therapeutic support needed |

### How to Refer Gracefully

"I've noticed you're dealing with a lot beyond finances right now. I want to make sure you have all the support you need. Would you be open to talking with someone who specializes in [X]?"

### What CFPs CAN Do

- Listen with empathy
- Validate emotions
- Help process financial aspects of life events
- Coach on behavior change
- Provide structure and accountability

---

## Key Takeaways

1. **Motivational interviewing** is collaborative, not prescriptive
2. **Stages of change** guide intervention—meet clients where they are
3. **Reframing** helps shift limiting beliefs when appropriate
4. **Know your boundaries**—refer when mental health issues exceed planning scope
5. **OARS skills** (Open questions, Affirmations, Reflections, Summaries) are essential

---

## Practice Questions

1. A client says "I know I should save more, but I just can't seem to do it." According to the Stages of Change model, this client is MOST likely in which stage?
   - A) Precontemplation
   - B) Contemplation
   - C) Preparation
   - D) Maintenance

   **Answer: B** - The client acknowledges the issue but hasn't committed to action yet—classic contemplation.

2. Which motivational interviewing technique is being used when a planner says "It sounds like you're feeling pulled between enjoying today and preparing for tomorrow"?
   - A) Open-ended question
   - B) Affirmation
   - C) Reflection
   - D) Summary

   **Answer: C** - This mirrors the client's ambivalence back to them—a reflection.
`,
    keyTerms: [
      { term: "Motivational Interviewing", definition: "A collaborative approach that helps clients resolve ambivalence about behavior change" },
      { term: "Stages of Change", definition: "Prochaska model: precontemplation, contemplation, preparation, action, maintenance" },
      { term: "OARS", definition: "Open questions, Affirmations, Reflections, Summaries—core MI skills" },
      { term: "Reframing", definition: "Technique to help clients see situations from alternative perspectives" }
    ],
    relatedQuestionIds: ["CFP-PSY-B4-001", "CFP-PSY-B4-002", "CFP-PSY-B4-003"]
  },
  {
    id: "CFP-PSY-L007",
    domain: "CFP-PSY",
    blueprintArea: "PSY-2",
    title: "Working with Couples and Families",
    order: 7,
    duration: 45,
    objectives: [
      "Identify common sources of money conflict between partners",
      "Apply techniques for facilitating productive couple discussions",
      "Recognize family dynamics that affect financial planning",
      "Navigate situations where partners have different goals"
    ],
    content: `
# Working with Couples and Families

Money is a leading source of relationship conflict. CFP® professionals often mediate between partners with different values, goals, and styles.

---

## Sources of Money Conflict

### Different Money Scripts

| Partner A | Partner B | Conflict |
|-----------|-----------|----------|
| Money Avoider | Money Vigilant | A ignores finances; B obsesses |
| Money Status | Money Worship | Both overspend for different reasons |
| Money Vigilant | Money Status | Saver resents spender |

### Different Risk Tolerances

- One partner wants aggressive growth
- Other wants capital preservation
- Neither is "wrong"—but compromise is needed

### Different Life Experiences

- One grew up wealthy, one grew up poor
- One experienced financial trauma (bankruptcy, foreclosure)
- Different cultural backgrounds around money

### Power Imbalances

- Income disparity
- One partner handles all finances
- Historical control patterns

---

## Facilitating Couple Discussions

### Ground Rules for Productive Conversations

1. **No blame or criticism** - Focus on going forward
2. **Both partners speak** - Actively solicit quieter partner's views
3. **Acknowledge feelings** - "I can see this is frustrating for you"
4. **Focus on shared goals** - Find common ground first
5. **Use "I" statements** - "I worry about..." not "You always..."

### The Planner's Role

| DO | DON'T |
|----|-------|
| Facilitate balanced dialogue | Take sides |
| Reflect each partner's perspective | Let one partner dominate |
| Find common ground | Impose your own values |
| Ask clarifying questions | Assume you understand |
| Summarize agreements | Ignore disagreements |

### Techniques for Stuck Conversations

**The Columbo Approach**: "Help me understand—when you say 'comfortable retirement,' what does that look like to you? [To partner] And what about you?"

**Scaling**: "On a scale of 1-10, how important is leaving an inheritance? [Ask both separately]"

**Future Pacing**: "Fast forward 10 years. What will you wish you had done?"

---

## When Partners Disagree

### Prioritize Shared Goals First

Often couples agree on ends but disagree on means:
- Both want kids' education funded—disagree on how much
- Both want comfortable retirement—disagree on spending now

### Use Numbers to Clarify Trade-offs

"If we fund 100% of college, retirement happens at 67. At 50% college funding, retirement at 64. What matters more?"

### Compromise Frameworks

| Approach | Example |
|----------|---------|
| **Split the difference** | One wants $50K emergency fund, other wants $20K—agree on $35K |
| **Alternate decisions** | "You choose the vacation budget, I'll choose the car budget" |
| **Pilot periods** | "Let's try your approach for 6 months and evaluate" |
| **Separate accounts** | Individual "no-judgment" spending accounts within shared framework |

### When Compromise Fails

If partners fundamentally disagree on major issues (children, work, location), financial planning may need to pause until they resolve underlying conflicts.

---

## Multi-Generational Planning

### Family Dynamics to Recognize

| Pattern | Description | Planning Impact |
|---------|-------------|-----------------|
| **Golden Child** | One child favored | Inheritance conflict |
| **Black Sheep** | One child excluded/blamed | Estate disputes |
| **Enmeshment** | Boundaries blurred | Adult children expect support |
| **Cutoff** | Family members estranged | Beneficiary complications |

### Facilitating Family Meetings

- Clarify the purpose and agenda in advance
- Establish ground rules
- Manage dominant personalities
- Ensure all voices are heard
- Document agreements in writing

### Inheritance Conversations

Help parents think through:
- Equal vs. equitable distribution?
- How to communicate intentions?
- Potential for conflict after death?
- Special situations (disabled child, addiction, blended family)?

---

## Key Takeaways

1. **Money conflict** often stems from different scripts, experiences, or power dynamics
2. **Facilitate, don't arbitrate**—your job is productive dialogue, not judging
3. **Find shared goals** first, then work on differing means
4. **Numbers clarify trade-offs** when words fail
5. **Multi-generational planning** requires understanding family dynamics

---

## Practice Questions

1. A couple disagrees about retirement timing. Partner A wants to retire at 60, Partner B at 67. The BEST approach is to:
   - A) Tell them to compromise at 63.5
   - B) Show them the financial implications of each choice
   - C) Recommend Partner B's approach for better security
   - D) Suggest they meet with a marriage counselor first

   **Answer: B** - Clarifying trade-offs with numbers helps couples make informed decisions without the planner taking sides.

2. During a joint meeting, one partner dominates the conversation while the other stays silent. The BEST response is to:
   - A) Continue with the dominant partner
   - B) Ask the quiet partner "Do you agree?"
   - C) Ask the quiet partner an open-ended question about their perspective
   - D) Schedule separate meetings

   **Answer: C** - Open-ended questions invite participation without putting words in their mouth or excluding either partner.
`,
    keyTerms: [
      { term: "Money Conflict", definition: "Disagreements about finances often rooted in different values, experiences, or money scripts" },
      { term: "Power Imbalance", definition: "Unequal control in financial decisions, often linked to income disparity" },
      { term: "Future Pacing", definition: "Asking clients to imagine future scenarios to clarify present priorities" }
    ],
    relatedQuestionIds: ["CFP-PSY-B4-004", "CFP-PSY-B4-005"]
  },
  {
    id: "CFP-PSY-L008",
    domain: "CFP-PSY",
    blueprintArea: "PSY-1",
    title: "Special Populations in Financial Planning",
    order: 8,
    duration: 50,
    objectives: [
      "Adapt planning approaches for elderly clients and cognitive decline",
      "Recognize signs of financial exploitation and appropriate responses",
      "Address unique needs of divorcing clients",
      "Plan for clients with disabilities and special needs"
    ],
    content: `
# Special Populations in Financial Planning

Different life circumstances require adapted approaches. This lesson covers planning considerations for elderly clients, divorcing individuals, and those with disabilities.

---

## Elderly Clients and Cognitive Decline

### Risk Factors for Cognitive Decline

- Age 65+: risk increases significantly with each decade
- Family history of dementia
- Cardiovascular risk factors
- Social isolation

### Warning Signs During Meetings

| Category | Signs |
|----------|-------|
| **Memory** | Repeating questions, forgetting recent discussions |
| **Judgment** | Unusual decisions, susceptibility to scams |
| **Confusion** | Getting lost, not recognizing familiar people |
| **Personality** | Sudden changes, increased anxiety or apathy |
| **Finances** | Unpaid bills, missing money, disorganized records |

### Proactive Planning

**While client is competent**:
- Establish durable power of attorney
- Introduce trusted contact person
- Simplify finances (fewer accounts)
- Document current wishes and values
- Discuss "what if" scenarios

**When decline is suspected**:
- Involve trusted family members (with permission)
- Slow down decisions—no urgency
- Simplify recommendations
- Document conversations thoroughly
- Consider capacity assessment referral

---

## Financial Exploitation

### Common Exploitation Scenarios

| Type | Description | Warning Signs |
|------|-------------|---------------|
| **Family exploitation** | Relatives taking advantage | Sudden POA changes, isolation from others |
| **Caregiver exploitation** | Paid helpers taking money | Unusual withdrawals, new "best friend" |
| **Romance scams** | Online relationship cons | Secret new partner, wire transfers |
| **Sweepstakes/lottery scams** | Pay to collect "winnings" | Multiple checks to unknown parties |
| **Contractor fraud** | Overcharging for services | Cash payments, unnecessary work |

### CFP® Professional Responsibilities

1. **Report suspected exploitation** to adult protective services (in many states, mandatory)
2. **Document** concerning behaviors and conversations
3. **Delay** suspicious transactions when possible
4. **Involve** trusted contacts or family
5. **Know** your firm's procedures

### Difficult Conversations

"Mrs. Johnson, I'm concerned about some of the transactions I'm seeing. You've sent $15,000 to someone you met online. Can we talk about this?"

---

## Divorcing Clients

### Unique Planning Considerations

| Area | Considerations |
|------|---------------|
| **Assets** | Division of retirement accounts (QDRO), real estate, investments |
| **Liabilities** | Debt responsibility, mortgage, joint accounts |
| **Support** | Alimony and child support—giver and receiver implications |
| **Insurance** | Health coverage, life insurance requirements |
| **Taxes** | Filing status, dependency exemptions, deduction changes |
| **Estate** | Update beneficiaries, new estate plan needed |

### Working with Divorcing Clients

**Do**:
- Maintain neutrality if working with both spouses
- Focus on objective financial analysis
- Help client understand trade-offs
- Coordinate with attorney as appropriate

**Don't**:
- Take sides emotionally
- Provide legal advice
- Encourage adversarial behavior
- Assume you know the emotional state

### Common Divorce Financial Mistakes

1. Fighting for the house when it's unaffordable
2. Ignoring tax implications of asset division
3. Underestimating post-divorce expenses
4. Not updating beneficiary designations
5. Assuming 50/50 is "fair" when assets have different characteristics

---

## Clients with Disabilities

### Planning Considerations

| Type | Planning Focus |
|------|----------------|
| **Physical disabilities** | Accessible housing, transportation, equipment costs |
| **Intellectual disabilities** | Special needs trusts, guardianship, ABLE accounts |
| **Mental health conditions** | Episodic planning, trusted contacts, benefit preservation |
| **Acquired disability** | Life insurance, disability insurance, career transition |

### Preserving Government Benefits

- **SSI and Medicaid** have asset limits (~$2,000)
- Inheritances or gifts can disqualify
- **Special Needs Trusts** allow supplemental support without disqualification
- **ABLE accounts** offer some flexibility (up to $100K protected)

### Third-Party vs. First-Party SNTs

| Type | Funded By | Medicaid Payback? |
|------|-----------|-------------------|
| **Third-party SNT** | Family, will, others | No |
| **First-party SNT** | Individual's own assets | Yes—remainder to state |

### Communication Adaptations

- Allow extra time
- Use clear, simple language when appropriate
- Include support persons as requested
- Confirm understanding frequently
- Provide written summaries

---

## Key Takeaways

1. **Cognitive decline** requires proactive planning and vigilance for changes
2. **Financial exploitation** is common—know the signs and your reporting obligations
3. **Divorcing clients** need objective analysis and coordination with legal professionals
4. **Special needs planning** must preserve benefit eligibility
5. **Adapt communication** to each client's needs and circumstances

---

## Practice Questions

1. A CFP® professional notices their 82-year-old client has written three large checks to a person they met online. The MOST appropriate first action is to:
   - A) Report the client to adult protective services immediately
   - B) Refuse to process the transactions
   - C) Have a direct conversation with the client about the payments and concerns
   - D) Contact the client's children without permission

   **Answer: C** - Start with a direct conversation to understand the situation before escalating. Depending on outcome, further action may be warranted.

2. A divorcing client wants to keep the family home with a $4,000/month mortgage on a projected $5,000/month income. The BEST advice is to:
   - A) Support the decision to maintain stability for the children
   - B) Recommend selling and splitting equity
   - C) Show the client cash flow projections with and without the home
   - D) Refer to a therapist

   **Answer: C** - Present objective data so the client can make an informed decision about trade-offs.
`,
    keyTerms: [
      { term: "Financial Exploitation", definition: "Improper use of a vulnerable adult's funds, property, or resources" },
      { term: "Trusted Contact", definition: "Person authorized for a firm to contact if concerns arise about a client" },
      { term: "Special Needs Trust", definition: "Trust that provides supplemental support without affecting government benefit eligibility" },
      { term: "ABLE Account", definition: "Tax-advantaged savings account for individuals with disabilities" },
      { term: "QDRO", definition: "Qualified Domestic Relations Order—allows divorce-related transfer of retirement plan assets" }
    ],
    relatedQuestionIds: ["CFP-PSY-B4-006", "CFP-PSY-B4-007"]
  },
  {
    id: "CFP-PSY-L009",
    domain: "CFP-PSY",
    blueprintArea: "PSY-2",
    title: "Sources of Client Motivation",
    order: 9,
    duration: 40,
    objectives: [
      "Distinguish between intrinsic and extrinsic motivation",
      "Apply goal-setting frameworks (SMART goals)",
      "Understand how values drive financial behavior",
      "Create accountability structures that support change"
    ],
    content: `
# Sources of Client Motivation

Understanding what motivates clients helps CFP® professionals create plans that clients actually follow.

---

## Intrinsic vs. Extrinsic Motivation

### Definitions

| Type | Definition | Example |
|------|------------|---------|
| **Intrinsic** | Doing something for its own satisfaction | Saving because security feels good |
| **Extrinsic** | Doing something for external reward/avoidance | Saving to get employer match |

### Application to Financial Planning

**Intrinsic motivators** (more sustainable):
- Personal values alignment
- Sense of security and peace
- Freedom and autonomy
- Legacy and meaning

**Extrinsic motivators** (useful but limited):
- Tax benefits
- Employer matches
- Avoiding penalties
- Social expectations

> **Research shows**: Intrinsic motivation produces more lasting behavior change. Connect recommendations to client values, not just external benefits.

### Example

**Less effective**: "You should max your 401(k) for the tax deduction."

**More effective**: "You mentioned wanting to travel in retirement without worrying about money. Maxing your 401(k) gets you closer to that freedom."

---

## SMART Goal Framework

Help clients translate vague intentions into actionable goals:

| Element | Description | Example |
|---------|-------------|---------|
| **S**pecific | Clear and precise | "Pay off credit card" not "reduce debt" |
| **M**easurable | Quantifiable | "$5,000 balance to $0" |
| **A**chievable | Realistic | $500/month payment is doable |
| **R**elevant | Connects to values | "So I can feel in control of my money" |
| **T**ime-bound | Has a deadline | "By December 31st" |

### Converting Client Statements

| Client Says | SMART Version |
|-------------|---------------|
| "I want to save more" | "I will save $500/month to my IRA starting March 1" |
| "I should invest" | "I will invest my tax refund of $3,000 by April 15" |
| "We need to budget" | "We will track all spending for 30 days in February" |

### Beyond SMART: Emotion + Logic

SMART provides structure, but **emotional connection** drives follow-through:
- "What will it feel like to make that final payment?"
- "Imagine telling your kids their college is fully funded"

---

## Values-Based Planning

### Discovering Client Values

Values are the WHY behind financial goals.

**Discovery questions**:
- "What does money mean to you?"
- "What would you do with unlimited resources?"
- "What do you want people to say about you financially?"
- "When have you felt most satisfied with a financial decision?"

### Common Core Values

| Value | Financial Expression |
|-------|---------------------|
| **Security** | Emergency funds, insurance, stable investments |
| **Freedom** | No debt, passive income, flexibility |
| **Family** | Education funding, inheritance, togetherness |
| **Status** | Nice home, new cars, visible success |
| **Generosity** | Charitable giving, helping others |
| **Experience** | Travel, hobbies, adventures |

### Using Values in Recommendations

"You've said family is your top priority. This insurance policy ensures they're protected no matter what."

"I noticed security keeps coming up. Let's build a larger emergency fund before increasing investment risk."

---

## Accountability Structures

### Why Accountability Matters

- Humans are better at commitments to others than to themselves
- Regular check-ins prevent procrastination
- Celebration of progress reinforces behavior

### Accountability Tools

| Tool | Description |
|------|-------------|
| **Regular meetings** | Quarterly reviews, progress check-ins |
| **Written agreements** | Sign-off on action items |
| **Milestones** | Break big goals into smaller wins |
| **Accountability partners** | Spouse, friend, or coach |
| **Automation** | Remove decision-making from the equation |
| **Visual tracking** | Charts, progress bars, goal thermometers |

### The Power of Implementation Intentions

Research shows **when/where/how** plans dramatically increase follow-through:

**Instead of**: "I'll set up automatic savings"
**Use**: "I will log into my bank on Saturday morning after coffee and set up a $300 automatic transfer to my Roth IRA"

---

## Key Takeaways

1. **Intrinsic motivation** (values-based) is more sustainable than external rewards
2. **SMART goals** turn vague intentions into specific actions
3. **Connect recommendations to values** for better follow-through
4. **Accountability structures** increase success rates
5. **Implementation intentions** (when/where/how) beat general intentions

---

## Practice Questions

1. A client says "I want to start saving more this year." The BEST next step is to:
   - A) Recommend an automatic savings amount based on their income
   - B) Ask what "saving more" means to them and why it matters
   - C) Show them compound interest calculations
   - D) Set up an IRA in their name

   **Answer: B** - Understanding the client's definition and motivation allows for personalized, meaningful planning.

2. Which accountability structure is MOST effective for ensuring a client follows through on consolidating old 401(k) accounts?
   - A) Explaining the benefits of consolidation
   - B) Sending a reminder email in two weeks
   - C) Having the client specify exactly when and how they will do it, then scheduling a follow-up
   - D) Offering to do it for them

   **Answer: C** - Implementation intentions plus follow-up accountability create the highest success rate.
`,
    keyTerms: [
      { term: "Intrinsic Motivation", definition: "Doing something for internal satisfaction rather than external reward" },
      { term: "SMART Goals", definition: "Specific, Measurable, Achievable, Relevant, Time-bound goal framework" },
      { term: "Values-Based Planning", definition: "Connecting financial recommendations to client's core values" },
      { term: "Implementation Intentions", definition: "Specifying exactly when, where, and how a goal will be achieved" }
    ],
    relatedQuestionIds: ["CFP-PSY-B4-008", "CFP-PSY-B4-009"]
  },
  {
    id: "CFP-PSY-L010",
    domain: "CFP-PSY",
    blueprintArea: "PSY-2",
    title: "Overcoming Decision-Making Challenges",
    order: 10,
    duration: 45,
    objectives: [
      "Recognize analysis paralysis and help clients move forward",
      "Address perfectionism that prevents financial action",
      "Apply techniques for simplifying complex decisions",
      "Help clients recover from financial mistakes"
    ],
    content: `
# Overcoming Decision-Making Challenges

Many clients know what they should do but struggle to act. This lesson covers common decision-making barriers and how to overcome them.

---

## Analysis Paralysis

### What It Is

Overthinking options to the point of taking no action. The pursuit of the "perfect" choice prevents any choice.

### Common Manifestations

| Situation | Paralysis Behavior |
|-----------|-------------------|
| Investment selection | Researching endlessly, never investing |
| Insurance purchase | Comparing quotes for months |
| Home buying | Looking at 50+ houses |
| Career decisions | Can't choose between options |
| 401(k) allocation | Staying in default because too many choices |

### Why It Happens

- Fear of making wrong choice
- Overestimating consequences of "imperfect" choice
- Cognitive overload from too many options
- Perfectionism tendencies

### Intervention Strategies

| Strategy | How to Apply |
|----------|--------------|
| **Reduce options** | "Let's compare these 3 funds instead of 50" |
| **Good enough** | "A B+ decision today beats an A+ decision never" |
| **Reversibility** | "This isn't permanent—we can adjust in 6 months" |
| **Cost of inaction** | "Every month not invested is returns you miss" |
| **Default options** | "If you can't decide, this is my recommendation" |
| **Time limits** | "Let's make this decision by Friday" |

---

## Perfectionism and Financial Inaction

### The Perfectionism Trap

Perfectionists:
- Wait for the "right time" to invest (timing the market)
- Need to understand everything before acting
- Abandon strategies at the first setback
- Beat themselves up for not-optimal decisions

### Intervention Approaches

**Normalize imperfection**:
"Even the best investors get it wrong 40% of the time. Success comes from a portfolio of decisions, not any single choice."

**Focus on process, not outcome**:
"Let's evaluate whether we followed good principles, not just the result."

**Embrace iteration**:
"This is version 1.0. We'll improve as we learn more about your needs."

**Small wins first**:
"Let's start with $5,000 and see how it feels before investing more."

---

## Simplifying Complex Decisions

### The Choice Architecture Approach

Make the right choice the easy choice:

| Principle | Application |
|-----------|-------------|
| **Default enrollment** | Automatic 401(k) contribution |
| **Automatic escalation** | Increase savings 1% per year |
| **Limit options** | Offer 3 model portfolios, not 100 funds |
| **Pre-commitment** | Decide future actions now while rational |
| **Remove friction** | Paperless, single-click enrollment |

### Breaking Down Big Decisions

**Instead of**: "Choose your entire investment allocation"

**Use**: 
1. "First, let's decide: stocks vs. bonds ratio"
2. "Now, U.S. vs. international split"
3. "Finally, active vs. passive approach"

### Decision Trees

Map out key decision points and consequences:
- "If X happens, we do Y"
- "If rates drop below 4%, we refinance"
- "If your income increases 10%+, we accelerate 401(k)"

---

## Recovering from Financial Mistakes

### Common Client Mistakes

- Sold investments during a crash
- Took on too much debt
- Failed to save during high-earning years
- Made bad business/real estate decisions
- Trusted the wrong person

### The Recovery Conversation

**Steps**:
1. **Acknowledge** without judgment: "That sounds like a difficult situation"
2. **Normalize**: "You're not alone—many people face similar challenges"
3. **Learn**: "What would you do differently knowing what you know now?"
4. **Redirect**: "Now let's focus on what we can control going forward"
5. **Act**: Create specific next steps

### Avoid These Responses

| Don't Say | Say Instead |
|-----------|-------------|
| "That was a mistake" | "That was a learning experience" |
| "You should have..." | "Going forward, we can..." |
| "Why did you do that?" | "Help me understand what you were thinking at the time" |
| "Don't worry about it" | "It's understandable to feel frustrated" |

### The Sunk Cost Lesson

Help clients let go of past decisions:
"The money spent is gone regardless of what we decide now. Let's make the best decision from this point forward, not based on what we've already invested."

---

## Key Takeaways

1. **Analysis paralysis** is overcome by limiting options and setting deadlines
2. **Perfectionism** prevents action—embrace "good enough" decisions
3. **Choice architecture** makes right decisions easy and automatic
4. **Break big decisions** into smaller, sequential choices
5. **Financial mistakes** are learning opportunities—focus forward, not backward

---

## Practice Questions

1. A client has been researching 401(k) investment options for 8 months and still hasn't enrolled. The MOST effective intervention is:
   - A) Provide more educational materials about investing
   - B) Recommend a target-date fund and set an enrollment deadline together
   - C) Wait for the client to feel ready
   - D) Calculate the exact opportunity cost of waiting

   **Answer: B** - Simplify the choice (one fund recommendation) and create a deadline to overcome paralysis.

2. A client is devastated about selling all their investments during the 2020 market crash. The BEST response is to:
   - A) Show them how much money they lost by selling
   - B) Reassure them that the market is unpredictable
   - C) Acknowledge their feelings, explore what they learned, and create a forward-looking plan
   - D) Recommend staying in cash to avoid future anxiety

   **Answer: C** - Process the experience constructively and redirect to future action.
`,
    keyTerms: [
      { term: "Analysis Paralysis", definition: "Inability to make decisions due to overthinking or too many options" },
      { term: "Choice Architecture", definition: "Designing decision environments to guide people toward better choices" },
      { term: "Sunk Cost Fallacy", definition: "Continuing a course of action because of past investment rather than future benefit" },
      { term: "Default Option", definition: "Pre-selected choice that applies if no active decision is made" }
    ],
    relatedQuestionIds: ["CFP-PSY-B4-010", "CFP-PSY-B4-011"]
  }
];
