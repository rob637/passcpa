/**
 * CFP Domain 8: Psychology of Financial Planning
 * Area PSY-1: Client Communication
 * Area PSY-2: Behavioral Finance
 * 
 * These lessons cover behavioral biases, client communication,
 * money scripts, and counseling skills.
 * 
 * Psychology represents 7% of the CFP exam.
 */

import { CFPLesson } from '../../../types/cfp';

export const CFP_PSY_LESSONS: CFPLesson[] = [
  {
    id: "CFP-PSY-L001",
    domain: "CFP-PSY",
    blueprintArea: "PSY-1",
    title: "Client Communication Fundamentals",
    order: 1,
    duration: 40,
    objectives: [
      "Apply active listening techniques in client meetings",
      "Distinguish between open-ended and closed-ended questions",
      "Recognize different communication styles (DISC model)",
      "Adapt communication approach to client preferences"
    ],
    content: `
# Client Communication Fundamentals

Effective communication is the foundation of the client-planner relationship. A CFP® professional must be skilled at gathering information, understanding client needs, and conveying recommendations clearly.

---

## Active Listening Skills

Active listening goes beyond hearing words—it involves fully engaging with the client's message.

### Core Techniques

| Technique | Description | Example |
|-----------|-------------|---------|
| **Reflecting** | Mirror the client's words back | "So you're saying retirement security is your top priority" |
| **Clarifying** | Ask for more detail | "Can you tell me more about what 'financial security' means to you?" |
| **Summarizing** | Recap key points | "Let me make sure I understand your three main concerns..." |
| **Validating** | Acknowledge feelings | "It makes sense that you'd feel anxious about that" |
| **Pausing** | Allow silence for reflection | (Wait 3-5 seconds after client speaks) |

### Benefits of Active Listening

- Builds trust and rapport
- Uncovers deeper goals and concerns
- Reduces misunderstandings
- Demonstrates respect and empathy

> **Exam Tip**: Active listening questions often test whether you can identify the BEST response to a client's emotional statement. The correct answer usually acknowledges feelings before providing information.

---

## Open-Ended vs. Closed-Ended Questions

### Open-Ended Questions

Encourage elaboration and exploration:

- "Tell me about your ideal retirement."
- "What does financial success mean to you?"
- "How do you feel about taking investment risk?"
- "What concerns do you have about your current plan?"

**Use when**: Building rapport, exploring values, understanding goals

### Closed-Ended Questions

Gather specific facts efficiently:

- "Do you have a will?"
- "What is your current age?"
- "Are you a beneficiary on any retirement accounts?"
- "Is your home paid off?"

**Use when**: Completing data gathering, confirming facts

### Scaling Questions

Gauge intensity or priority:

- "On a scale of 1-10, how important is leaving an inheritance?"
- "How confident are you in your ability to stick to a budget?"

---

## Communication Styles (DISC Model)

Different clients prefer different communication approaches. The DISC model helps identify preferences:

| Style | Characteristics | Communication Approach |
|-------|-----------------|----------------------|
| **D**ominance | Direct, decisive, results-oriented | Be concise, focus on bottom line, avoid small talk |
| **I**nfluence | Enthusiastic, optimistic, collaborative | Build relationship, use stories, be positive |
| **S**teadiness | Patient, reliable, supportive | Be sincere, provide stability, allow time to decide |
| **C**onscientiousness | Analytical, detail-oriented, systematic | Provide data, be thorough, avoid rushing |

### Identifying Client Styles

- **D**: "What's the bottom line?"
- **I**: "I talked to my friend who said..."
- **S**: "I need to discuss this with my spouse"
- **C**: "Can I see the calculations behind that?"

> **Best Practice**: Adapt your style to match the client, not the other way around.

---

## Nonverbal Communication

Body language and tone often communicate more than words:

### Positive Signals
- Eye contact (culturally appropriate)
- Leaning slightly forward
- Open posture (uncrossed arms)
- Nodding to show understanding

### Warning Signs (Client)
- Crossed arms or legs
- Looking away frequently
- Shallow breathing or sighing
- Furrowed brow

### Your Own Body Language
- Maintain open, relaxed posture
- Match energy level to client
- Use appropriate facial expressions
- Avoid distracting habits (pen clicking, etc.)

---

## Key Takeaways

1. **Active listening** builds trust and uncovers deeper client needs
2. **Open-ended questions** explore; **closed-ended questions** confirm
3. **DISC model** helps adapt communication to client preferences
4. **Nonverbal cues** can reveal client concerns not expressed verbally
5. The best communicators **listen more than they talk**

---

## Practice Questions

**Question 1**: A client says, "I'm worried about running out of money in retirement." Which response demonstrates the BEST active listening?

A) "You shouldn't worry—I'll create a plan to prevent that."
B) "What specifically concerns you about your retirement funds?"
C) "Most clients feel that way. Let me show you some projections."
D) "Your portfolio is appropriately diversified for your age."

**Answer**: B - This clarifying question explores the concern further without dismissing the emotion.

**Question 2**: A client asks detailed questions about expense ratios and standard deviation. Which DISC style does this suggest?

A) Dominance
B) Influence
C) Steadiness
D) Conscientiousness

**Answer**: D - Detail-oriented, analytical questions suggest a Conscientiousness style.
`,
    keyTakeaways: [
      "Active listening techniques: reflecting, clarifying, summarizing, validating, pausing",
      "Open-ended questions explore; closed-ended questions confirm facts",
      "DISC model: Dominance, Influence, Steadiness, Conscientiousness",
      "Adapt communication style to match the client"
    ],
    relatedLessons: ["CFP-PSY-L002", "CFP-PSY-L003", "CFP-GEN-L001"],
  },
  {
    id: "CFP-PSY-L002",
    domain: "CFP-PSY",
    blueprintArea: "PSY-2",
    title: "Behavioral Finance - Cognitive Biases",
    order: 2,
    duration: 50,
    objectives: [
      "Define behavioral finance and its relevance to financial planning",
      "Identify the major cognitive biases affecting financial decisions",
      "Distinguish between cognitive and emotional biases",
      "Apply strategies to mitigate client biases"
    ],
    content: `
# Behavioral Finance - Cognitive Biases

**Behavioral finance** studies how psychological factors influence financial decision-making. Unlike traditional finance theory (which assumes rational actors), behavioral finance recognizes that people systematically make predictable errors.

---

## Cognitive vs. Emotional Biases

| Type | Origin | Example | Modification |
|------|--------|---------|--------------|
| **Cognitive** | Faulty reasoning or information processing | Anchoring, confirmation bias | Easier to correct with education |
| **Emotional** | Feelings and impulses | Loss aversion, regret aversion | Harder to correct; may need to adapt around |

> **Key Insight**: Cognitive biases can be addressed through education; emotional biases often require accommodation in the planning process.

---

## Major Cognitive Biases

### 1. Anchoring

**Definition**: Over-relying on the first piece of information encountered.

**Example**: A client fixates on a stock's purchase price when deciding to sell, even though it's irrelevant to future performance.

**Mitigation**: Present multiple reference points; focus on forward-looking analysis.

---

### 2. Confirmation Bias

**Definition**: Seeking information that confirms existing beliefs while ignoring contradictory evidence.

**Example**: A client only reads bullish analysis on stocks they already own.

**Mitigation**: Present balanced perspectives; play devil's advocate; require consideration of alternative viewpoints.

---

### 3. Availability Heuristic

**Definition**: Overweighting easily recalled or vivid events.

**Example**: Fear of flying after hearing about a plane crash, despite statistics showing it's safer than driving.

**In Finance**: Overweighting recent market crashes when making allocation decisions.

**Mitigation**: Use long-term historical data; put recent events in context.

---

### 4. Representativeness Heuristic

**Definition**: Judging probability based on stereotypes or perceived patterns.

**Example**: Assuming a "good company" (nice products, ethical reputation) is a "good stock" (profitable investment).

**Mitigation**: Focus on fundamental analysis; distinguish company quality from stock valuation.

---

### 5. Mental Accounting

**Definition**: Treating money differently based on its source or intended use.

**Example**: Treating a tax refund as "free money" to spend frivolously while carrying credit card debt.

**Positive Use**: Goals-based investing leverages mental accounting constructively.

---

### 6. Framing Effect

**Definition**: Decisions influenced by how information is presented.

**Example**: Preferring "90% survival rate" over "10% mortality rate" for the same surgery.

**In Finance**: A 5% chance of loss sounds worse than 95% chance of gain.

**Mitigation**: Present information in multiple frames; recognize framing in your own recommendations.

---

### 7. Hindsight Bias

**Definition**: "I knew it all along" thinking after an event occurs.

**Example**: Claiming you predicted the 2008 financial crisis (after it happened).

**Mitigation**: Document predictions and decisions before outcomes are known.

---

### 8. Recency Bias

**Definition**: Overweighting recent events in making predictions.

**Example**: Expecting market trends to continue indefinitely; buying high after a run-up.

**Mitigation**: Show long-term historical data; remind clients of full market cycles.

---

### 9. Overconfidence Bias

**Definition**: Overestimating one's own abilities, knowledge, or precision of information.

**Manifestations**:
- Excessive trading (believing you can beat the market)
- Concentrated positions (too confident in one stock)
- Underestimating risk

**Mitigation**: Track actual vs. predicted outcomes; diversify; use systematic rules.

---

### 10. Illusion of Control

**Definition**: Believing you can influence outcomes you cannot control.

**Example**: Picking "lucky" lottery numbers; believing trading skill can overcome market randomness.

**Mitigation**: Education on randomness and probability.

---

## Mitigating Cognitive Biases

| Strategy | Target Biases |
|----------|---------------|
| **Written Investment Policy Statement** | Overconfidence, recency, loss aversion |
| **Systematic rebalancing** | Status quo, anchoring, recency |
| **Dollar-cost averaging** | Anchoring, timing attempts |
| **Goals-based planning** | Mental accounting (positive use) |
| **Devil's advocate process** | Confirmation bias |
| **Long-term perspective** | Recency, availability |

---

## Key Takeaways

1. **Cognitive biases** stem from information processing errors—education can help
2. **Anchoring** causes fixation on irrelevant first data points
3. **Confirmation bias** leads to one-sided information gathering
4. **Recency bias** makes recent events seem more important than they are
5. **Systematic processes** (IPS, rebalancing) reduce bias impact

---

## Practice Questions

**Question 1**: A client insists on holding a losing stock, saying "I'll sell when it gets back to what I paid." This is an example of:

A) Loss aversion
B) Anchoring
C) Confirmation bias
D) Mental accounting

**Answer**: B - Anchoring on the purchase price as a decision point.

**Question 2**: Which strategy BEST addresses confirmation bias?

A) Automatic portfolio rebalancing
B) Requiring review of opposing viewpoints before decisions
C) Dollar-cost averaging
D) Shorter investment time horizon

**Answer**: B - Forcing consideration of contrary evidence addresses confirmation bias.
`,
    keyTakeaways: [
      "Cognitive biases are reasoning errors; emotional biases are feeling-driven",
      "Major cognitive biases: anchoring, confirmation, availability, recency, overconfidence",
      "Mental accounting can be used positively in goals-based planning",
      "Systematic processes reduce the impact of biases"
    ],
    relatedLessons: ["CFP-PSY-L001", "CFP-PSY-L003", "CFP-INV-L005"],
  },
  {
    id: "CFP-PSY-L003",
    domain: "CFP-PSY",
    blueprintArea: "PSY-2",
    title: "Behavioral Finance - Emotional Biases",
    order: 3,
    duration: 45,
    objectives: [
      "Identify the major emotional biases affecting financial decisions",
      "Understand why emotional biases are harder to correct than cognitive biases",
      "Apply Prospect Theory to client behavior",
      "Develop strategies to work with (not against) emotional biases"
    ],
    content: `
# Behavioral Finance - Emotional Biases

While cognitive biases stem from faulty reasoning, **emotional biases** arise from feelings, impulses, and intuition. They are harder to correct because they're deeply rooted in human psychology.

---

## Prospect Theory (Kahneman & Tversky)

The foundational theory of behavioral finance:

### Key Principles

1. **Reference Point Dependence**: People evaluate outcomes relative to a reference point (not absolute levels)

2. **Loss Aversion**: Losses hurt approximately **2x more** than equivalent gains feel good

3. **Diminishing Sensitivity**: The difference between $100 and $200 feels larger than between $1,000 and $1,100

4. **Probability Weighting**: People overweight small probabilities and underweight large ones

---

## Major Emotional Biases

### 1. Loss Aversion

**Definition**: The pain of losing is psychologically about twice as powerful as the pleasure of gaining.

**Behavioral Impact**:
- Holding losing investments too long (to avoid "realizing" the loss)
- Selling winners too early (to lock in gains)
- Over-conservative portfolios

**Example**: A client refuses to sell a stock down 40%, saying "I can't afford to lose that much"—even though the loss already occurred.

**Mitigation**: 
- Frame decisions in terms of opportunity cost
- Use mental accounting for different goals
- Automate investment processes

---

### 2. Status Quo Bias

**Definition**: Preference for the current state of affairs; inertia.

**Behavioral Impact**:
- Failure to rebalance portfolios
- Keeping inherited investments unchanged
- Not updating beneficiary designations

**Example**: An employee stays in the default 401(k) investment option for years without reviewing.

**Mitigation**:
- Default options should be good options
- Schedule regular portfolio reviews
- Automate rebalancing

---

### 3. Endowment Effect

**Definition**: Overvaluing something simply because you own it.

**Behavioral Impact**:
- Holding concentrated stock positions
- Overvaluing company stock or inherited assets
- Difficulty diversifying

**Example**: A client inherited stock and values it at $100/share while the market price is $75.

**Mitigation**:
- "Would you buy this today at this price?"
- Calculate true opportunity cost
- Gradual diversification plans

---

### 4. Regret Aversion

**Definition**: Avoiding decisions that might cause regret later.

**Behavioral Impact**:
- Analysis paralysis (not acting)
- Following the herd (shared blame if wrong)
- Avoiding stocks after a market crash

**Example**: A client refuses to invest after missing the market bottom, fearing they'll invest "at the wrong time."

**Mitigation**:
- Focus on process, not outcomes
- Document decision rationale
- Use systematic investment approaches

---

### 5. Herding

**Definition**: Following the crowd, especially during market extremes.

**Behavioral Impact**:
- Buying at market peaks (euphoria)
- Selling at market bottoms (panic)
- Chasing popular investments

**Example**: A client wants to buy cryptocurrency after reading about everyone making money.

**Mitigation**:
- Written Investment Policy Statement
- Systematic rebalancing rules
- Education on contrarian indicators

---

### 6. Self-Control Bias

**Definition**: Prioritizing short-term gratification over long-term goals.

**Behavioral Impact**:
- Under-saving for retirement
- Overspending
- Failure to stick to financial plans

**Example**: A client knows they should save more but "can't afford to" due to lifestyle spending.

**Mitigation**:
- Automatic savings ("pay yourself first")
- Remove friction from saving
- Add friction to spending

---

### 7. Self-Attribution Bias

**Definition**: Attributing successes to skill and failures to external factors.

**Behavioral Impact**:
- Overconfidence after lucky wins
- Not learning from mistakes
- Excessive trading

**Example**: "I'm a great investor" (after a bull market) vs. "The market was rigged" (after losses).

**Mitigation**:
- Keep a decision journal
- Analyze both wins and losses objectively

---

## Working WITH Emotional Biases

Because emotional biases are difficult to eliminate, planners often need to **accommodate** rather than correct them:

| Bias | Accommodation Strategy |
|------|----------------------|
| Loss aversion | Frame in terms of goals, not returns; use mental accounts |
| Status quo | Make beneficial decisions the default |
| Herding | Show historical examples of crowd behavior |
| Self-control | Automate everything possible |

---

## Key Takeaways

1. **Emotional biases** are harder to correct than cognitive biases
2. **Loss aversion** (2:1 ratio) explains many investment behaviors
3. **Status quo bias** makes defaults powerful—use them wisely
4. **Herding** drives bubbles and crashes
5. **Accommodation** often works better than elimination

---

## Practice Questions

**Question 1**: A client refuses to sell her inherited company stock despite it representing 60% of her portfolio. This BEST illustrates:

A) Mental accounting
B) Endowment effect
C) Confirmation bias
D) Availability heuristic

**Answer**: B - She overvalues the stock because she owns it.

**Question 2**: Which approach is MOST effective for addressing loss aversion?

A) Showing historical data on market recoveries
B) Explaining the irrationality of the bias
C) Framing decisions around goal achievement instead of gains/losses
D) Increasing portfolio risk to offset emotional reactions

**Answer**: C - Reframing away from gains/losses is the most effective accommodation.
`,
    keyTakeaways: [
      "Prospect Theory: loss aversion (2:1), reference points, diminishing sensitivity",
      "Major emotional biases: loss aversion, status quo, endowment, regret aversion, herding",
      "Emotional biases require accommodation more than correction",
      "Automation and defaults are powerful tools against emotional biases"
    ],
    relatedLessons: ["CFP-PSY-L002", "CFP-PSY-L004", "CFP-INV-L005"],
  },
  {
    id: "CFP-PSY-L004",
    domain: "CFP-PSY",
    blueprintArea: "PSY-2",
    title: "Money Scripts and Financial Attitudes",
    order: 4,
    duration: 35,
    objectives: [
      "Define money scripts and their origins",
      "Identify the four money script categories",
      "Recognize how money scripts affect financial behavior",
      "Apply strategies for working with different money scripts"
    ],
    content: `
# Money Scripts and Financial Attitudes

**Money scripts** are unconscious beliefs about money that develop in childhood and influence adult financial behavior. Understanding a client's money scripts helps explain seemingly irrational financial decisions.

---

## What Are Money Scripts?

- Unconscious beliefs about money developed early in life
- Shaped by family messages, culture, and experiences
- Often operate below conscious awareness
- Can be adaptive or maladaptive depending on context
- May conflict with stated financial goals

> **Origin**: The term was developed by Dr. Brad Klontz and Dr. Ted Klontz in their research on financial psychology.

---

## The Four Money Script Categories

### 1. Money Avoidance

**Core Belief**: "Money is bad" or "Rich people are greedy"

| Behaviors | Underlying Belief |
|-----------|------------------|
| Under-earning despite capability | "I don't deserve to be wealthy" |
| Giving money away excessively | "Having too much is wrong" |
| Financial self-sabotage | "Money corrupts" |
| Ignoring financial matters | "Money isn't important" |

**Common Origins**:
- Family struggles with money
- Religious teachings misinterpreted
- Negative experiences with wealthy people

**Planning Approach**:
- Explore family money history
- Reframe wealth as a tool for good
- Connect money to values and charitable giving

---

### 2. Money Worship

**Core Belief**: "More money will make everything better"

| Behaviors | Underlying Belief |
|-----------|------------------|
| Workaholism | "I need to earn more to be happy" |
| Overspending/materialism | "Things = happiness" |
| Never feeling "enough" | "Just a little more will satisfy me" |
| Hoarding | "Security requires endless accumulation" |

**Common Origins**:
- Childhood deprivation
- Societal messages about success
- Using money to fill emotional needs

**Planning Approach**:
- Define "enough" in concrete terms
- Focus on non-financial life goals
- Explore the hedonic treadmill concept

---

### 3. Money Status

**Core Belief**: "Self-worth equals net worth"

| Behaviors | Underlying Belief |
|-----------|------------------|
| Overspending on luxury items | "I need to look successful" |
| Keeping up with the Joneses | "Others judge me by my possessions" |
| Hiding financial problems | "I can't let people know I'm struggling" |
| Gambling/risky investments | "Big wins prove my worth" |

**Common Origins**:
- Social comparison in childhood
- Validation tied to achievement
- Family emphasis on appearance

**Planning Approach**:
- Separate identity from net worth
- Find intrinsic sources of value
- Private financial wins vs. public spending

---

### 4. Money Vigilance

**Core Belief**: "Be careful with money; don't discuss it"

| Behaviors | Underlying Belief |
|-----------|------------------|
| Excessive frugality | "Spending is dangerous" |
| Anxiety about money | "I need to be constantly on guard" |
| Secretive about finances | "It's impolite to discuss money" |
| Difficulty enjoying money | "Spending feels wrong" |

**Common Origins**:
- Parents who survived depression/hardship
- Family secrecy about finances
- Messages that money is "private"

**Note**: This is the LEAST pathological script—often associated with financial success, but can cause anxiety or relationship conflict.

**Planning Approach**:
- Balance saving with appropriate spending
- Permission to enjoy fruits of labor
- Open money conversations (especially with family)

---

## Identifying Client Money Scripts

### In Conversation

Listen for statements like:
- "Rich people are lucky, not skilled" (Avoidance)
- "If I just had X more, I'd be happy" (Worship)
- "I need a new car—the neighbors just got one" (Status)
- "I never discuss money with anyone" (Vigilance)

### Through Questionnaires

Validated assessments like the **Klontz Money Script Inventory (KMSI)** can identify dominant scripts.

---

## Working with Money Scripts

| Script | Planning Adjustments |
|--------|---------------------|
| **Avoidance** | Small steps to engage with finances; connect to values |
| **Worship** | Define "enough"; emphasize life goals over net worth |
| **Status** | Private wins; intrinsic validation; budget for appearances |
| **Vigilance** | Permission to spend; discuss financial anxiety |

---

## Key Takeaways

1. **Money scripts** are unconscious beliefs formed in childhood
2. Four categories: **Avoidance, Worship, Status, Vigilance**
3. Scripts explain behaviors that conflict with stated goals
4. **Vigilance** is most associated with financial success
5. Planners should **adapt strategies** to client scripts

---

## Practice Questions

**Question 1**: A client consistently undersaves despite a high income and frequently says, "Money isn't that important to me." This BEST suggests which money script?

A) Money Worship
B) Money Status
C) Money Avoidance
D) Money Vigilance

**Answer**: C - Downplaying money's importance and undersaving suggest Money Avoidance.

**Question 2**: Which money script is MOST associated with anxiety about spending money?

A) Money Avoidance
B) Money Worship
C) Money Status
D) Money Vigilance

**Answer**: D - Money Vigilance is characterized by anxiety about spending and excessive frugality.
`,
    keyTakeaways: [
      "Money scripts: unconscious beliefs about money formed in childhood",
      "Four types: Avoidance, Worship, Status, Vigilance",
      "Vigilance is most associated with financial success but may cause anxiety",
      "Scripts explain behaviors that don't match stated goals"
    ],
    relatedLessons: ["CFP-PSY-L001", "CFP-PSY-L002", "CFP-PSY-L005"],
  },
  {
    id: "CFP-PSY-L005",
    domain: "CFP-PSY",
    blueprintArea: "PSY-3",
    title: "Crisis Events and Transitions",
    order: 5,
    duration: 40,
    objectives: [
      "Identify major life transitions that impact financial planning",
      "Apply appropriate counseling approaches for crisis events",
      "Recognize when to refer clients to other professionals",
      "Understand the emotional stages of grief and transition"
    ],
    content: `
# Crisis Events and Transitions

Financial planners often work with clients during life's most challenging moments. Understanding how crises affect decision-making is essential for providing appropriate guidance.

---

## Major Crisis Events

### Death of a Spouse

**Immediate Financial Concerns**:
- Cash flow changes (survivor income, Social Security)
- Estate settlement and probate
- Life insurance claims
- Beneficiary updates
- Tax filing status change

**Emotional Considerations**:
- Grief impairs decision-making
- Major decisions should wait 6-12 months
- Clients may be targeted by scammers

**Planner Role**:
- Prioritize liquidity for immediate needs
- Delay non-essential decisions
- Connect with estate attorney, CPA
- Be a supportive presence, not just advisor

> **Key Rule**: The 6-12 month waiting period for major financial decisions after death is commonly tested.

---

### Divorce/Separation

**Financial Concerns**:
- Asset division (QDRO for retirement plans)
- Cash flow restructuring
- Housing decisions
- Tax implications (filing status, alimony, child support)
- Beneficiary changes

**Emotional Considerations**:
- Anger may drive financial decisions
- Children's needs may conflict with client's wants
- Power imbalances in relationships

**Planner Role**:
- Maintain neutrality (if advising one party)
- Refer to divorce financial analyst if complex
- Focus on post-divorce financial stability
- Update all documents and beneficiaries

**Technical Note**: Alimony is taxable/deductible for divorces before 2019; not for divorces after 2018.

---

### Job Loss

**Immediate Priorities**:
1. Emergency fund assessment
2. COBRA or marketplace health coverage
3. Severance package review
4. Unemployment benefits filing
5. Budget adjustment

**Retirement Plan Considerations**:
- Leave in employer plan
- Roll over to IRA
- Cash out (avoid if possible—taxes and penalties)
- NUA consideration if employer stock

**Planner Role**:
- Create short-term liquidity plan
- Review budget realistically
- Explore career transition resources
- Maintain investment discipline

---

### Disability

**Immediate Concerns**:
- Income replacement (disability insurance claims)
- Health insurance continuation
- Social Security Disability (SSDI) application
- Estate planning updates (if needed)
- Long-term care considerations

**Planner Role**:
- Coordinate with disability insurers
- Model revised financial projections
- Update estate documents if needed
- Connect with rehabilitation resources

---

### Inheritance/Windfall

**Emotional Challenges**:
- Guilt about receiving money
- Family pressure and conflict
- Lifestyle inflation temptation
- Overwhelm from sudden wealth

**Planning Approach**:
1. "Park" money for 6 months before major decisions
2. Avoid immediate lifestyle inflation
3. Develop comprehensive plan before spending
4. Address family dynamics proactively

**Technical Considerations**:
- Inherited IRA distribution rules (10-year rule)
- Step-up in basis for inherited assets
- Tax planning for large windfalls

---

## Stages of Change (Transtheoretical Model)

Understanding where clients are in their readiness for change:

| Stage | Description | Planner Approach |
|-------|-------------|------------------|
| **Precontemplation** | Not aware or not ready | Raise awareness gently |
| **Contemplation** | Thinking about change | Explore pros/cons |
| **Preparation** | Ready to take action | Help create plan |
| **Action** | Actively changing | Support and encourage |
| **Maintenance** | Sustaining change | Reinforce successes |
| **Relapse** | Return to old behavior | Normalize; restart |

---

## When to Refer

Financial planners are NOT therapists. Refer when you see:

| Sign | Appropriate Referral |
|------|---------------------|
| Excessive anxiety about money | Therapist/financial therapist |
| Compulsive spending/gambling | Addiction specialist |
| Depression affecting function | Mental health professional |
| Marital conflict over money | Marriage counselor |
| Suspected elder abuse | Adult protective services |
| Suicidal thoughts | Crisis hotline immediately |

> **Key Point**: Know your limits. Providing emotional support is appropriate; providing therapy is not.

---

## Key Takeaways

1. Major decisions should wait **6-12 months** after death of spouse
2. Job loss: Focus on liquidity, benefits continuation, budget revision
3. Divorce requires particular attention to **QDRO** and beneficiary changes
4. Windfalls benefit from a **waiting period** before major spending
5. Know when to **refer** to mental health professionals

---

## Practice Questions

**Question 1**: A newly widowed client wants to immediately sell the family home and move to be near her adult children. The BEST advice is:

A) Help her find a real estate agent quickly to reduce emotional stress
B) Support her decision and coordinate the financial aspects
C) Recommend waiting 6-12 months before making major decisions
D) Advise against the move because she'll regret it later

**Answer**: C - Major decisions should typically wait 6-12 months after the death of a spouse.

**Question 2**: Which of the following is most appropriate for a CFP® professional when a client exhibits signs of severe depression?

A) Provide counseling to help the client work through their feelings
B) Refer the client to a mental health professional
C) Delay all financial planning until the client feels better
D) Continue with normal planning activities to provide structure

**Answer**: B - Refer to appropriate professionals; CFP® professionals are not mental health counselors.
`,
    keyTakeaways: [
      "Death of spouse: Wait 6-12 months for major decisions",
      "Divorce: QDRO required for retirement plan division",
      "Job loss: Prioritize liquidity, benefits, budget",
      "Windfalls: Waiting period before spending",
      "Know when to refer to mental health professionals"
    ],
    relatedLessons: ["CFP-PSY-L001", "CFP-PSY-L004", "CFP-EST-L001"],
  }
];

export default CFP_PSY_LESSONS;
