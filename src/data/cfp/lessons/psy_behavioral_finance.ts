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

import type { Lesson } from '../../../types';

export const CFP_PSY_LESSONS: Lesson[] = [
  {
    id: 'CFP-PSY-L001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    title: 'Client Communication Fundamentals',
    description: 'Apply active listening techniques in client meetings',
    order: 1,
    duration: 40,
    difficulty: 'intermediate',
    topics: [
      'Active listening techniques',
      'Open-ended vs. closed-ended questions',
      'Communication styles (DISC model)',
      'Adapting communication to client preferences'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Effective communication is the foundation of the client-planner relationship. A CFP® professional must be skilled at gathering information, understanding client needs, and conveying recommendations clearly.'
        },
        {
          title: 'Active Listening Techniques',
          type: 'table',
          headers: ['Technique', 'Description', 'Example'],
          rows: [
            ['Reflecting', 'Mirror the client\'s words back', '"So you\'re saying retirement security is your top priority"'],
            ['Clarifying', 'Ask for more detail', '"Can you tell me more about what \'financial security\' means to you?"'],
            ['Summarizing', 'Recap key points', '"Let me make sure I understand your three main concerns..."'],
            ['Validating', 'Acknowledge feelings', '"It makes sense that you\'d feel anxious about that"'],
            ['Pausing', 'Allow silence for reflection', '(Wait 3-5 seconds after client speaks)']
          ]
        },
        {
          title: 'Benefits of Active Listening',
          type: 'list',
          items: [
            'Builds trust and rapport',
            'Uncovers deeper goals and concerns',
            'Reduces misunderstandings',
            'Demonstrates respect and empathy'
          ]
        },
        {
          title: 'Exam Tip: Active Listening',
          type: 'warning',
          content: 'Active listening questions often test whether you can identify the BEST response to a client\'s emotional statement. The correct answer usually acknowledges feelings before providing information.'
        },
        {
          title: 'Open-Ended vs. Closed-Ended Questions',
          type: 'text',
          content: 'Open-ended questions encourage elaboration and exploration: "Tell me about your ideal retirement." "What does financial success mean to you?" "How do you feel about taking investment risk?" Use when building rapport, exploring values, understanding goals. Closed-ended questions gather specific facts efficiently: "Do you have a will?" "What is your current age?" "Is your home paid off?" Use when completing data gathering or confirming facts. Scaling questions gauge intensity or priority: "On a scale of 1-10, how important is leaving an inheritance?"'
        },
        {
          title: 'DISC Communication Styles',
          type: 'table',
          headers: ['Style', 'Characteristics', 'Communication Approach'],
          rows: [
            ['Dominance', 'Direct, decisive, results-oriented', 'Be concise, focus on bottom line, avoid small talk'],
            ['Influence', 'Enthusiastic, optimistic, collaborative', 'Build relationship, use stories, be positive'],
            ['Steadiness', 'Patient, reliable, supportive', 'Be sincere, provide stability, allow time to decide'],
            ['Conscientiousness', 'Analytical, detail-oriented, systematic', 'Provide data, be thorough, avoid rushing']
          ]
        },
        {
          title: 'Identifying Client Styles',
          type: 'list',
          items: [
            'D (Dominance): "What\'s the bottom line?"',
            'I (Influence): "I talked to my friend who said..."',
            'S (Steadiness): "I need to discuss this with my spouse"',
            'C (Conscientiousness): "Can I see the calculations behind that?"'
          ]
        },
        {
          title: 'Best Practice',
          type: 'callout',
          content: 'Adapt your style to match the client, not the other way around.'
        },
        {
          title: 'Nonverbal Communication',
          type: 'list',
          items: [
            'Positive signals: Eye contact (culturally appropriate), leaning slightly forward, open posture, nodding',
            'Warning signs (Client): Crossed arms or legs, looking away frequently, shallow breathing or sighing, furrowed brow',
            'Your own body language: Maintain open, relaxed posture; match energy level to client; use appropriate facial expressions'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Active listening techniques: reflecting, clarifying, summarizing, validating, pausing', 'Open-ended questions explore; closed-ended questions confirm facts', 'DISC model: Dominance, Influence, Steadiness, Conscientiousness', 'Adapt communication style to match the client', 'The best communicators listen more than they talk']
        }
      ]
    }
  },
  {
    id: 'CFP-PSY-L002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    title: 'Behavioral Finance - Cognitive Biases',
    description: 'Define behavioral finance and its relevance to financial planning',
    order: 2,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Behavioral finance definition and relevance',
      'Major cognitive biases',
      'Cognitive vs. emotional biases',
      'Strategies to mitigate client biases'
    ],
    content: {
      sections: [
        {
          title: 'What is Behavioral Finance?',
          type: 'text',
          content: 'Behavioral finance studies how psychological factors influence financial decision-making. Unlike traditional finance theory (which assumes rational actors), behavioral finance recognizes that people systematically make predictable errors.'
        },
        {
          title: 'Cognitive vs. Emotional Biases',
          type: 'table',
          headers: ['Type', 'Origin', 'Example', 'Modification'],
          rows: [
            ['Cognitive', 'Faulty reasoning or information processing', 'Anchoring, confirmation bias', 'Easier to correct with education'],
            ['Emotional', 'Feelings and impulses', 'Loss aversion, regret aversion', 'Harder to correct; may need to adapt around']
          ]
        },
        {
          title: 'Key Insight',
          type: 'callout',
          content: 'Cognitive biases can be addressed through education; emotional biases often require accommodation in the planning process.'
        },
        {
          title: '1. Anchoring',
          type: 'text',
          content: 'Over-relying on the first piece of information encountered. Example: A client fixates on a stock\'s purchase price when deciding to sell, even though it\'s irrelevant to future performance. Mitigation: Present multiple reference points; focus on forward-looking analysis.'
        },
        {
          title: '2. Confirmation Bias',
          type: 'text',
          content: 'Seeking information that confirms existing beliefs while ignoring contradictory evidence. Example: A client only reads bullish analysis on stocks they already own. Mitigation: Present balanced perspectives; play devil\'s advocate; require consideration of alternative viewpoints.'
        },
        {
          title: '3. Availability Heuristic',
          type: 'text',
          content: 'Overweighting easily recalled or vivid events. Example: Fear of flying after hearing about a plane crash, despite statistics. In finance: Overweighting recent market crashes when making allocation decisions. Mitigation: Use long-term historical data; put recent events in context.'
        },
        {
          title: '4. Representativeness Heuristic',
          type: 'text',
          content: 'Judging probability based on stereotypes or perceived patterns. Example: Assuming a "good company" (nice products, ethical reputation) is a "good stock" (profitable investment). Mitigation: Focus on fundamental analysis; distinguish company quality from stock valuation.'
        },
        {
          title: '5. Mental Accounting',
          type: 'text',
          content: 'Treating money differently based on its source or intended use. Example: Treating a tax refund as "free money" to spend frivolously while carrying credit card debt. Positive use: Goals-based investing leverages mental accounting constructively.'
        },
        {
          title: '6. Framing Effect',
          type: 'text',
          content: 'Decisions influenced by how information is presented. Example: Preferring "90% survival rate" over "10% mortality rate" for the same surgery. In finance: A 5% chance of loss sounds worse than 95% chance of gain. Mitigation: Present information in multiple frames.'
        },
        {
          title: '7. Hindsight Bias',
          type: 'text',
          content: '"I knew it all along" thinking after an event occurs. Example: Claiming you predicted the 2008 financial crisis (after it happened). Mitigation: Document predictions and decisions before outcomes are known.'
        },
        {
          title: '8. Recency Bias',
          type: 'text',
          content: 'Overweighting recent events in making predictions. Example: Expecting market trends to continue indefinitely; buying high after a run-up. Mitigation: Show long-term historical data; remind clients of full market cycles.'
        },
        {
          title: '9. Overconfidence Bias',
          type: 'text',
          content: 'Overestimating one\'s own abilities, knowledge, or precision of information. Manifestations: Excessive trading (believing you can beat the market), concentrated positions (too confident in one stock), underestimating risk. Mitigation: Track actual vs. predicted outcomes; diversify; use systematic rules.'
        },
        {
          title: '10. Illusion of Control',
          type: 'text',
          content: 'Believing you can influence outcomes you cannot control. Example: Picking "lucky" lottery numbers; believing trading skill can overcome market randomness. Mitigation: Education on randomness and probability.'
        },
        {
          title: 'Mitigating Cognitive Biases',
          type: 'table',
          headers: ['Strategy', 'Target Biases'],
          rows: [
            ['Written Investment Policy Statement', 'Overconfidence, recency, loss aversion'],
            ['Systematic rebalancing', 'Status quo, anchoring, recency'],
            ['Dollar-cost averaging', 'Anchoring, timing attempts'],
            ['Goals-based planning', 'Mental accounting (positive use)'],
            ['Devil\'s advocate process', 'Confirmation bias'],
            ['Long-term perspective', 'Recency, availability']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Cognitive biases stem from information processing errors—education can help', 'Anchoring causes fixation on irrelevant first data points', 'Confirmation bias leads to one-sided information gathering', 'Recency bias makes recent events seem more important than they are', 'Systematic processes (IPS, rebalancing) reduce bias impact']
        }
      ]
    }
  },
  {
    id: 'CFP-PSY-L003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    title: 'Behavioral Finance - Emotional Biases',
    description: 'Identify the major emotional biases affecting financial decisions',
    order: 3,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Major emotional biases',
      'Why emotional biases are harder to correct',
      'Prospect Theory application',
      'Working with emotional biases'
    ],
    content: {
      sections: [
        {
          title: 'Emotional vs. Cognitive Biases',
          type: 'text',
          content: 'While cognitive biases stem from faulty reasoning, emotional biases arise from feelings, impulses, and intuition. They are harder to correct because they\'re deeply rooted in human psychology.'
        },
        {
          title: 'Prospect Theory (Kahneman & Tversky)',
          type: 'callout',
          content: 'The foundational theory of behavioral finance with four key principles: (1) Reference Point Dependence—evaluate outcomes relative to a reference point, (2) Loss Aversion—losses hurt ~2x more than equivalent gains feel good, (3) Diminishing Sensitivity—$100 to $200 feels larger than $1,000 to $1,100, (4) Probability Weighting—overweight small probabilities, underweight large ones.'
        },
        {
          title: '1. Loss Aversion',
          type: 'text',
          content: 'The pain of losing is psychologically about twice as powerful as the pleasure of gaining. Behavioral impact: Holding losing investments too long (to avoid "realizing" the loss), selling winners too early (to lock in gains), over-conservative portfolios. Mitigation: Frame decisions in terms of opportunity cost; use mental accounting for different goals; automate investment processes.'
        },
        {
          title: '2. Status Quo Bias',
          type: 'text',
          content: 'Preference for the current state of affairs; inertia. Behavioral impact: Failure to rebalance portfolios, keeping inherited investments unchanged, not updating beneficiary designations. Mitigation: Make beneficial decisions the default; schedule regular portfolio reviews; automate rebalancing.'
        },
        {
          title: '3. Endowment Effect',
          type: 'text',
          content: 'Overvaluing something simply because you own it. Behavioral impact: Holding concentrated stock positions, overvaluing company stock or inherited assets, difficulty diversifying. Mitigation: Ask "Would you buy this today at this price?"; calculate true opportunity cost; use gradual diversification plans.'
        },
        {
          title: '4. Regret Aversion',
          type: 'text',
          content: 'Avoiding decisions that might cause regret later. Behavioral impact: Analysis paralysis (not acting), following the herd (shared blame if wrong), avoiding stocks after a market crash. Mitigation: Focus on process, not outcomes; document decision rationale; use systematic investment approaches.'
        },
        {
          title: '5. Herding',
          type: 'text',
          content: 'Following the crowd, especially during market extremes. Behavioral impact: Buying at market peaks (euphoria), selling at market bottoms (panic), chasing popular investments. Mitigation: Written Investment Policy Statement; systematic rebalancing rules; education on contrarian indicators.'
        },
        {
          title: '6. Self-Control Bias',
          type: 'text',
          content: 'Prioritizing short-term gratification over long-term goals. Behavioral impact: Under-saving for retirement, overspending, failure to stick to financial plans. Mitigation: Automatic savings ("pay yourself first"); remove friction from saving; add friction to spending.'
        },
        {
          title: '7. Self-Attribution Bias',
          type: 'text',
          content: 'Attributing successes to skill and failures to external factors. Behavioral impact: Overconfidence after lucky wins, not learning from mistakes, excessive trading. Example: "I\'m a great investor" (after a bull market) vs. "The market was rigged" (after losses). Mitigation: Keep a decision journal; analyze both wins and losses objectively.'
        },
        {
          title: 'Working WITH Emotional Biases',
          type: 'table',
          headers: ['Bias', 'Accommodation Strategy'],
          rows: [
            ['Loss aversion', 'Frame in terms of goals, not returns; use mental accounts'],
            ['Status quo', 'Make beneficial decisions the default'],
            ['Herding', 'Show historical examples of crowd behavior'],
            ['Self-control', 'Automate everything possible']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Emotional biases are harder to correct than cognitive biases', 'Loss aversion (2:1 ratio) explains many investment behaviors', 'Status quo bias makes defaults powerful—use them wisely', 'Herding drives bubbles and crashes', 'Accommodation often works better than elimination']
        }
      ]
    }
  },
  {
    id: 'CFP-PSY-L004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    title: 'Money Scripts and Financial Attitudes',
    description: 'Define money scripts and their origins',
    order: 4,
    duration: 35,
    difficulty: 'intermediate',
    topics: [
      'Money scripts definition and origins',
      'Four money script categories',
      'How money scripts affect financial behavior',
      'Strategies for different money scripts'
    ],
    content: {
      sections: [
        {
          title: 'What Are Money Scripts?',
          type: 'text',
          content: 'Money scripts are unconscious beliefs about money that develop in childhood and influence adult financial behavior. They are shaped by family messages, culture, and experiences; often operate below conscious awareness; can be adaptive or maladaptive depending on context; and may conflict with stated financial goals. The term was developed by Dr. Brad Klontz and Dr. Ted Klontz in their research on financial psychology.'
        },
        {
          title: '1. Money Avoidance',
          type: 'text',
          content: 'Core belief: "Money is bad" or "Rich people are greedy." Behaviors: Under-earning despite capability, giving money away excessively, financial self-sabotage, ignoring financial matters. Common origins: Family struggles with money, religious teachings misinterpreted, negative experiences with wealthy people. Planning approach: Explore family money history; reframe wealth as a tool for good; connect money to values and charitable giving.'
        },
        {
          title: '2. Money Worship',
          type: 'text',
          content: 'Core belief: "More money will make everything better." Behaviors: Workaholism, overspending/materialism, never feeling "enough," hoarding. Common origins: Childhood deprivation, societal messages about success, using money to fill emotional needs. Planning approach: Define "enough" in concrete terms; focus on non-financial life goals; explore the hedonic treadmill concept.'
        },
        {
          title: '3. Money Status',
          type: 'text',
          content: 'Core belief: "Self-worth equals net worth." Behaviors: Overspending on luxury items, keeping up with the Joneses, hiding financial problems, gambling/risky investments. Common origins: Social comparison in childhood, validation tied to achievement, family emphasis on appearance. Planning approach: Separate identity from net worth; find intrinsic sources of value; private financial wins vs. public spending.'
        },
        {
          title: '4. Money Vigilance',
          type: 'text',
          content: 'Core belief: "Be careful with money; don\'t discuss it." Behaviors: Excessive frugality, anxiety about money, secretive about finances, difficulty enjoying money. Common origins: Parents who survived depression/hardship, family secrecy about finances, messages that money is "private." Note: This is the LEAST pathological script—often associated with financial success, but can cause anxiety or relationship conflict. Planning approach: Balance saving with appropriate spending; permission to enjoy fruits of labor; open money conversations.'
        },
        {
          title: 'Identifying Client Money Scripts',
          type: 'list',
          items: [
            'Listen for statements like: "Rich people are lucky, not skilled" (Avoidance), "If I just had X more, I\'d be happy" (Worship), "I need a new car—the neighbors just got one" (Status), "I never discuss money with anyone" (Vigilance)',
            'Validated assessments like the Klontz Money Script Inventory (KMSI) can identify dominant scripts'
          ]
        },
        {
          title: 'Working with Money Scripts',
          type: 'table',
          headers: ['Script', 'Planning Adjustments'],
          rows: [
            ['Avoidance', 'Small steps to engage with finances; connect to values'],
            ['Worship', 'Define "enough"; emphasize life goals over net worth'],
            ['Status', 'Private wins; intrinsic validation; budget for appearances'],
            ['Vigilance', 'Permission to spend; discuss financial anxiety']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Money scripts are unconscious beliefs formed in childhood', 'Four categories: Avoidance, Worship, Status, Vigilance', 'Scripts explain behaviors that conflict with stated goals', 'Vigilance is most associated with financial success', 'Planners should adapt strategies to client scripts']
        }
      ]
    }
  },
  {
    id: 'CFP-PSY-L005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    title: 'Crisis Events and Transitions',
    description: 'Identify major life transitions that impact financial planning',
    order: 5,
    duration: 40,
    difficulty: 'intermediate',
    topics: [
      'Major life transitions affecting planning',
      'Counseling approaches for crisis events',
      'When to refer to other professionals',
      'Emotional stages of grief and transition'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Financial planners often work with clients during life\'s most challenging moments. Understanding how crises affect decision-making is essential for providing appropriate guidance.'
        },
        {
          title: 'Death of a Spouse',
          type: 'text',
          content: 'Immediate financial concerns: Cash flow changes (survivor income, Social Security), estate settlement and probate, life insurance claims, beneficiary updates, tax filing status change. Emotional considerations: Grief impairs decision-making, clients may be targeted by scammers. Planner role: Prioritize liquidity for immediate needs, delay non-essential decisions, connect with estate attorney/CPA, be a supportive presence.'
        },
        {
          title: 'Critical Rule: 6-12 Month Waiting Period',
          type: 'warning',
          content: 'Major decisions should wait 6-12 months after death of spouse. This is commonly tested on the CFP exam.'
        },
        {
          title: 'Divorce/Separation',
          type: 'text',
          content: 'Financial concerns: Asset division (QDRO for retirement plans), cash flow restructuring, housing decisions, tax implications (filing status, alimony, child support), beneficiary changes. Emotional considerations: Anger may drive financial decisions, children\'s needs may conflict with client\'s wants, power imbalances. Planner role: Maintain neutrality, refer to divorce financial analyst if complex, focus on post-divorce stability, update all documents. Technical note: Alimony is taxable/deductible for divorces before 2019; not for divorces after 2018.'
        },
        {
          title: 'Job Loss',
          type: 'list',
          items: [
            'Immediate priorities: Emergency fund assessment, COBRA or marketplace health coverage, severance package review, unemployment benefits filing, budget adjustment',
            'Retirement plan considerations: Leave in employer plan, roll over to IRA, cash out (avoid if possible—taxes and penalties), NUA consideration if employer stock',
            'Planner role: Create short-term liquidity plan, review budget realistically, explore career transition resources, maintain investment discipline'
          ]
        },
        {
          title: 'Disability',
          type: 'list',
          items: [
            'Immediate concerns: Income replacement (disability insurance claims), health insurance continuation, Social Security Disability (SSDI) application, estate planning updates, long-term care considerations',
            'Planner role: Coordinate with disability insurers, model revised financial projections, update estate documents, connect with rehabilitation resources'
          ]
        },
        {
          title: 'Inheritance/Windfall',
          type: 'text',
          content: 'Emotional challenges: Guilt about receiving money, family pressure and conflict, lifestyle inflation temptation, overwhelm from sudden wealth. Planning approach: "Park" money for 6 months before major decisions, avoid immediate lifestyle inflation, develop comprehensive plan before spending, address family dynamics proactively. Technical considerations: Inherited IRA distribution rules (10-year rule), step-up in basis for inherited assets, tax planning for large windfalls.'
        },
        {
          title: 'Stages of Change (Transtheoretical Model)',
          type: 'table',
          headers: ['Stage', 'Description', 'Planner Approach'],
          rows: [
            ['Precontemplation', 'Not aware or not ready', 'Raise awareness gently'],
            ['Contemplation', 'Thinking about change', 'Explore pros/cons'],
            ['Preparation', 'Ready to take action', 'Help create plan'],
            ['Action', 'Actively changing', 'Support and encourage'],
            ['Maintenance', 'Sustaining change', 'Reinforce successes'],
            ['Relapse', 'Return to old behavior', 'Normalize; restart']
          ]
        },
        {
          title: 'When to Refer',
          type: 'table',
          headers: ['Sign', 'Appropriate Referral'],
          rows: [
            ['Excessive anxiety about money', 'Therapist/financial therapist'],
            ['Compulsive spending/gambling', 'Addiction specialist'],
            ['Depression affecting function', 'Mental health professional'],
            ['Marital conflict over money', 'Marriage counselor'],
            ['Suspected elder abuse', 'Adult protective services'],
            ['Suicidal thoughts', 'Crisis hotline immediately']
          ]
        },
        {
          title: 'Know Your Limits',
          type: 'callout',
          content: 'Financial planners are NOT therapists. Providing emotional support is appropriate; providing therapy is not.'
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Death of spouse: Wait 6-12 months for major decisions', 'Divorce: QDRO required for retirement plan division', 'Job loss: Prioritize liquidity, benefits, budget', 'Windfalls: Waiting period before spending', 'Know when to refer to mental health professionals']
        }
      ]
    }
  }
];

export default CFP_PSY_LESSONS;
