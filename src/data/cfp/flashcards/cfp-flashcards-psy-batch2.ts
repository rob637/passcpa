/**
 * CFP Flashcards - Psychology of Financial Planning (PSY)
 * 
 * Psychology of Financial Planning is a new principal knowledge domain
 * in the 2024+ CFP exam, accounting for 7% of the exam.
 */

import { Flashcard } from './index';

export const CFP_FLASHCARDS_PSY_BATCH2: Flashcard[] = [
  // ============================================
  // BEHAVIORAL FINANCE BIASES
  // ============================================
  {
    id: 'fc-psy2-001',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is LOSS AVERSION and how strong is its effect?',
    back: 'Loss aversion is the tendency to prefer avoiding losses over acquiring equivalent gains.\n\n• Losses feel ~2x as painful as equivalent gains feel good (Kahneman/Tversky)\n• Leads to holding losers too long, selling winners too early\n• Drives irrational risk-seeking to avoid realizing losses',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'kahneman', 'prospect-theory']
  },
  {
    id: 'fc-psy2-002',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is CONFIRMATION BIAS?',
    back: 'The tendency to search for, interpret, and recall information that confirms pre-existing beliefs.\n\nEffects on investors:\n• Ignore warning signs about owned investments\n• Only seek positive news about positions\n• Dismiss contrary evidence\n• Overweight information supporting existing views',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'cognitive']
  },
  {
    id: 'fc-psy2-003',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is ANCHORING BIAS?',
    back: 'The tendency to rely too heavily on the first piece of information received (the "anchor").\n\nExamples:\n• Fixating on purchase price vs current value\n• Arbitrary portfolio size targets\n• Spending based on previous salary, not current resources\n• Using past rates of return to set expectations',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'anchoring']
  },
  {
    id: 'fc-psy2-004',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is MENTAL ACCOUNTING?',
    back: 'The tendency to treat money differently based on its source, intended use, or how it is categorized.\n\nExamples:\n• Treating tax refund as "bonus" vs regular income\n• Separate "buckets" for vacation vs retirement\n• Reluctance to sell investment to pay high-interest debt\n• Treating gains differently than principal',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'mental-accounting']
  },
  {
    id: 'fc-psy2-005',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is RECENCY BIAS?',
    back: 'The tendency to overweight recent events and underweight longer-term data.\n\nExamples:\n• After a bull market: overestimate future returns\n• After a crash: overestimate likelihood of further decline\n• Recent performance drives fund selection\n• Ignore long-term average returns',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'recency']
  },
  {
    id: 'fc-psy2-006',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is OVERCONFIDENCE BIAS?',
    back: 'The tendency to overestimate one\'s own abilities, knowledge, or the precision of their information.\n\nEffects:\n• Excessive trading (reduces returns)\n• Underdiversification (concentrated positions)\n• Underestimating risks\n• Believing you can time the market\n• Ignoring professional advice',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'overconfidence']
  },
  {
    id: 'fc-psy2-007',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is the DISPOSITION EFFECT?',
    back: 'The tendency to sell winning investments too quickly and hold losing investments too long.\n\nCauses:\n• Loss aversion (don\'t want to realize losses)\n• Pride in gains (want to lock in wins)\n• Regret avoidance\n\nResult: Suboptimal tax outcomes (realize gains, not losses) and longer exposure to losers.',
    difficulty: 'hard',
    tags: ['behavioral', 'bias', 'disposition']
  },
  {
    id: 'fc-psy2-008',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is HERD MENTALITY (Herding)?',
    back: 'The tendency to follow and copy what others are doing, rather than making independent decisions.\n\nExamples:\n• Buying hot stocks or sectors everyone is buying\n• Panic selling during market downturns\n• Following "guru" advice without analysis\n• Chasing trending investments\n\nCreates bubbles and exacerbates crashes.',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'herding']
  },
  {
    id: 'fc-psy2-009',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is STATUS QUO BIAS?',
    back: 'The preference for the current state of affairs, leading to resistance to change.\n\nExamples:\n• Staying in underperforming investments\n• Not rebalancing portfolio\n• Keeping outdated beneficiary designations\n• Sticking with same advisor despite poor service\n• Default 401(k) allocation never changed',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'status-quo']
  },
  {
    id: 'fc-psy2-010',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Behavioral Biases',
    front: 'What is FRAMING EFFECT?',
    back: 'How information is presented (framed) affects decision-making, even when the underlying facts are the same.\n\nExamples:\n• "90% success rate" vs "10% failure rate"\n• "$500 discount" vs "avoiding $500 loss"\n• Presenting returns as percentages vs dollars\n• Time horizon framing (daily vs annual returns)',
    difficulty: 'hard',
    tags: ['behavioral', 'bias', 'framing']
  },

  // ============================================
  // MONEY SCRIPTS & ATTITUDES
  // ============================================
  {
    id: 'fc-psy2-011',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Money Scripts',
    front: 'What are the FOUR MONEY SCRIPTS (Klontz)?',
    back: '1. MONEY AVOIDANCE: Money is bad, wealthy are greedy\n\n2. MONEY WORSHIP: More money solves all problems\n\n3. MONEY STATUS: Self-worth = net worth\n\n4. MONEY VIGILANCE: Save, be frugal, keep finances private\n\nAll except Vigilance correlate with financial problems.',
    difficulty: 'hard',
    tags: ['money-scripts', 'psychology', 'klontz']
  },
  {
    id: 'fc-psy2-012',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Money Scripts',
    front: 'What characterizes MONEY AVOIDANCE?',
    back: 'Beliefs that money is bad or that wealthy people are greedy or corrupt.\n\nBehaviors:\n• Self-sabotaging financial success\n• Giving away money inappropriately\n• Avoiding thinking about finances\n• Ignoring financial statements\n• Guilt about having money\n\nOften stems from religious beliefs or family messaging.',
    difficulty: 'medium',
    tags: ['money-scripts', 'avoidance']
  },
  {
    id: 'fc-psy2-013',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Money Scripts',
    front: 'What characterizes MONEY WORSHIP?',
    back: 'Belief that more money will solve all problems and bring happiness.\n\nBehaviors:\n• Workaholism at expense of relationships\n• Compulsive buying/overspending\n• Secret spending or hoarding\n• Unrealistic expectations about wealth\n• Never feeling "enough"\n\nLinked to lower income and net worth.',
    difficulty: 'medium',
    tags: ['money-scripts', 'worship']
  },
  {
    id: 'fc-psy2-014',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Money Scripts',
    front: 'What characterizes MONEY STATUS?',
    back: 'Belief that self-worth is tied to net worth; using money to impress others.\n\nBehaviors:\n• Overspending to appear wealthy\n• Competitive with peers about possessions\n• Lying about income or assets\n• Financial infidelity in relationships\n• Credit card overuse\n\nLinked to gambling, overspending, financial dependence.',
    difficulty: 'medium',
    tags: ['money-scripts', 'status']
  },
  {
    id: 'fc-psy2-015',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Money Scripts',
    front: 'What characterizes MONEY VIGILANCE?',
    back: 'Beliefs that money should be saved, not discussed, and frugality is virtuous.\n\nBehaviors:\n• High savings rate\n• Reluctance to discuss finances\n• Anxiety about spending\n• Difficulty enjoying money\n• May be overly secretive\n\nMost positively associated with financial health, though excessive vigilance can cause anxiety.',
    difficulty: 'medium',
    tags: ['money-scripts', 'vigilance']
  },

  // ============================================
  // CLIENT COMMUNICATION
  // ============================================
  {
    id: 'fc-psy2-016',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Communication',
    front: 'What is ACTIVE LISTENING? (SOLAR method)',
    back: 'Active listening involves fully concentrating on what is being said.\n\nSOLAR method:\n• S - Square (face client directly)\n• O - Open (keep open body posture)\n• L - Lean (lean forward slightly)\n• A - Acknowledge (eye contact)\n• R - Relax (stay calm and present)\n\nAlso: paraphrase, summarize, ask clarifying questions.',
    difficulty: 'easy',
    tags: ['communication', 'listening', 'rapport']
  },
  {
    id: 'fc-psy2-017',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Communication',
    front: 'What are OPEN-ENDED vs CLOSED-ENDED questions?',
    back: 'OPEN-ENDED: Cannot be answered with yes/no; encourage elaboration.\n• "What are your retirement goals?"\n• "How do you feel about market volatility?"\n• "Tell me about your investment experience"\n\nCLOSED-ENDED: Yes/no or short specific answers.\n• "Do you have a will?"\n• "When do you want to retire?"\n\nUse open-ended to build rapport and gather information.',
    difficulty: 'easy',
    tags: ['communication', 'questions', 'discovery']
  },
  {
    id: 'fc-psy2-018',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Communication',
    front: 'What is MOTIVATIONAL INTERVIEWING?',
    back: 'A client-centered counseling approach to elicit behavior change by helping clients explore and resolve ambivalence.\n\nKey principles (OARS):\n• Open questions\n• Affirmations\n• Reflective listening\n• Summarizing\n\nUsed to help clients make changes like saving more, spending less, or following through on plans.',
    difficulty: 'hard',
    tags: ['communication', 'motivational', 'behavior-change']
  },
  {
    id: 'fc-psy2-019',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Communication',
    front: 'What is REFLECTIVE LISTENING?',
    back: 'Repeating or paraphrasing what the client said to confirm understanding and show engagement.\n\nTypes:\n• Simple: Repeat almost exactly\n• Paraphrase: Restate in your own words\n• Feeling: Reflect the emotion ("It sounds like you\'re frustrated...")\n• Summary: Recap multiple points\n\nBuilds trust and ensures accurate understanding.',
    difficulty: 'medium',
    tags: ['communication', 'listening', 'reflective']
  },
  {
    id: 'fc-psy2-020',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Communication',
    front: 'What are signs of CLIENT RESISTANCE?',
    back: 'Signs that a client is resistant to advice or recommendations:\n\n• Arguing or interrupting\n• Discounting ("That won\'t work for me")\n• Ignoring (changing subject)\n• Justifying current behavior\n• Missing appointments\n• Not following through on action items\n\nAddress by exploring concerns, not pushing harder.',
    difficulty: 'medium',
    tags: ['communication', 'resistance', 'behavior']
  },

  // ============================================
  // COUNSELING & THERAPY CONCEPTS
  // ============================================
  {
    id: 'fc-psy2-021',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Counseling Concepts',
    front: 'What is TRANSFERENCE in the planner-client relationship?',
    back: 'Transference: Client unconsciously redirects feelings about a person from their past onto the planner.\n\nExamples:\n• Client sees planner as "authority figure" like parent\n• Inappropriate anger, affection, or dependence\n• Expecting planner to "fix everything"\n\nRecognize and maintain professional boundaries; may need referral.',
    difficulty: 'hard',
    tags: ['counseling', 'transference', 'boundaries']
  },
  {
    id: 'fc-psy2-022',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Counseling Concepts',
    front: 'What is COUNTERTRANSFERENCE?',
    back: 'Countertransference: Planner unconsciously redirects feelings onto the client.\n\nExamples:\n• Becoming emotionally involved with client\'s situation\n• Over-identifying with client\'s problems\n• Frustration or impatience with client\n• Treating client differently based on personal feelings\n\nMust maintain self-awareness and professional boundaries.',
    difficulty: 'hard',
    tags: ['counseling', 'countertransference', 'boundaries']
  },
  {
    id: 'fc-psy2-023',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Counseling Concepts',
    front: 'What are the STAGES OF CHANGE (Prochaska)?',
    back: '1. PRECONTEMPLATION: Not thinking about change\n\n2. CONTEMPLATION: Aware of need, weighing pros/cons\n\n3. PREPARATION: Intending to act, making plans\n\n4. ACTION: Actively modifying behavior\n\n5. MAINTENANCE: Sustaining new behavior\n\n6. TERMINATION: New behavior is permanent\n\nTailor advice to client\'s current stage.',
    difficulty: 'hard',
    tags: ['counseling', 'stages-of-change', 'prochaska']
  },
  {
    id: 'fc-psy2-024',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Counseling Concepts',
    front: 'When should a CFP refer client to a mental health professional?',
    back: 'Refer when issues are beyond financial planning scope:\n\n• Signs of depression or anxiety disorders\n• Compulsive behaviors (gambling, shopping)\n• Grief interfering with decisions\n• Addiction issues\n• Family conflict requiring mediation\n• Trauma affecting financial behavior\n• Signs of cognitive decline\n• Suicidal ideation (emergency)',
    difficulty: 'medium',
    tags: ['counseling', 'referral', 'ethics']
  },
  {
    id: 'fc-psy2-025',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Counseling Concepts',
    front: 'What is FINANCIAL THERAPY?',
    back: 'Financial therapy integrates cognitive, emotional, behavioral, and relational aspects of financial well-being.\n\n• Combines financial planning with therapeutic techniques\n• Addresses emotional and psychological barriers to financial health\n• Not within scope of CFP practice alone\n• CFP-certified financial therapist requires additional training\n• Often involves collaboration with mental health professionals',
    difficulty: 'hard',
    tags: ['counseling', 'financial-therapy', 'scope']
  },

  // ============================================
  // CLIENT & PLANNER DYNAMICS
  // ============================================
  {
    id: 'fc-psy2-026',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Dynamics',
    front: 'How do LIFE EVENTS affect financial planning psychology?',
    back: 'Major life events create emotional and cognitive challenges:\n\n• Marriage/divorce: Power dynamics, conflicting values\n• Birth of child: Protection instinct, overwhelm\n• Death of loved one: Grief, poor decisions\n• Job loss: Identity crisis, anxiety\n• Retirement: Loss of purpose, fear\n• Inheritance: Guilt, overwhelm, lifestyle inflation\n• Health crises: Fear, denial\n\nAllow time, provide extra support during transitions.',
    difficulty: 'medium',
    tags: ['life-events', 'transitions', 'emotions']
  },
  {
    id: 'fc-psy2-027',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Dynamics',
    front: 'What is FINANCIAL INFIDELITY?',
    back: 'Secretly spending money, hiding accounts/debts, or lying to partner about finances.\n\nSigns:\n• Hidden credit cards or accounts\n• Unexplained purchases\n• Defensive about money discussions\n• Missing money from joint accounts\n\nPlanner considerations:\n• Maintain confidentiality per engagement\n• Encourage honest communication\n• May affect planning assumptions\n• Consider separate meetings if needed',
    difficulty: 'medium',
    tags: ['couples', 'infidelity', 'communication']
  },
  {
    id: 'fc-psy2-028',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Dynamics',
    front: 'How do POWER DYNAMICS affect couples\' financial planning?',
    back: 'Power imbalances can affect decision-making and satisfaction:\n\nSources of power:\n• Income disparity\n• Financial knowledge\n• Control of accounts\n• Cultural/family expectations\n• Personality dominance\n\nPlanner strategies:\n• Meet with each partner separately\n• Ensure both voices are heard\n• Watch for non-verbal cues\n• Address disagreements constructively\n• Avoid taking sides',
    difficulty: 'medium',
    tags: ['couples', 'power', 'dynamics']
  },
  {
    id: 'fc-psy2-029',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Dynamics',
    front: 'What is COGNITIVE DECLINE and how should planners respond?',
    back: 'Signs of potential cognitive decline:\n• Repeated questions or forgetting conversations\n• Difficulty with calculations or concepts\n• Unusual financial decisions\n• Confusion about accounts or investments\n• Vulnerability to scams\n\nPlanner response:\n• Document observations\n• Involve trusted contacts if designated\n• Avoid complex decisions during decline\n• Know elder abuse reporting requirements\n• Consider referral for evaluation',
    difficulty: 'hard',
    tags: ['cognitive', 'elder', 'capacity']
  },
  {
    id: 'fc-psy2-030',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Client Dynamics',
    front: 'How do CULTURAL DIFFERENCES affect financial planning?',
    back: 'Cultural factors shape financial values and behaviors:\n\n• Family obligations (supporting parents, extended family)\n• Decision-making processes (individual vs collective)\n• Gender roles and money control\n• Attitudes toward debt\n• Views on inheritance and wealth transfer\n• Comfort with financial discussions\n• Trust in institutions and professionals\n\nBe curious, avoid assumptions, ask about preferences.',
    difficulty: 'medium',
    tags: ['culture', 'diversity', 'values']
  },

  // ============================================
  // DECISION-MAKING & HEURISTICS
  // ============================================
  {
    id: 'fc-psy2-031',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Decision-Making',
    front: 'What is SYSTEM 1 vs SYSTEM 2 thinking (Kahneman)?',
    back: 'SYSTEM 1 (Fast):\n• Automatic, intuitive\n• Emotional, instinctive\n• Little effort, always "on"\n• Prone to biases\n• Example: Panic selling in a crash\n\nSYSTEM 2 (Slow):\n• Deliberate, analytical\n• Logical, effortful\n• Lazy, activated when needed\n• Better for complex decisions\n• Example: Calculating retirement needs\n\nMost financial decisions benefit from System 2.',
    difficulty: 'hard',
    tags: ['decision-making', 'kahneman', 'thinking']
  },
  {
    id: 'fc-psy2-032',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Decision-Making',
    front: 'What are common HEURISTICS in financial decisions?',
    back: 'Heuristics = mental shortcuts that can lead to errors:\n\n• AVAILABILITY: Judge likelihood by ease of recall\n• REPRESENTATIVENESS: Judge by similarity to stereotype\n• ANCHORING: Over-rely on first information received\n• AFFECT: Decide based on current emotions\n• RECOGNITION: Prefer familiar options\n\nUseful for quick decisions but can lead to systematic errors.',
    difficulty: 'hard',
    tags: ['heuristics', 'decision-making', 'cognitive']
  },
  {
    id: 'fc-psy2-033',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Decision-Making',
    front: 'What is CHOICE OVERLOAD?',
    back: 'Having too many options can lead to:\n\n• Decision paralysis (no decision made)\n• Lower satisfaction with choice made\n• Regret about options not chosen\n• Default to status quo\n\nExample: 401(k) with 50 fund options → lower participation\n\nSolutions:\n• Limit options presented\n• Provide defaults\n• Categorize choices\n• Make recommendations',
    difficulty: 'medium',
    tags: ['decision-making', 'choice', 'paralysis']
  },
  {
    id: 'fc-psy2-034',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Decision-Making',
    front: 'What is NUDGE THEORY (Thaler & Sunstein)?',
    back: 'Nudges are small design changes that influence behavior without restricting choice.\n\nExamples:\n• Auto-enrollment in 401(k) plans\n• Auto-escalation of contribution rates\n• Default investment in target-date fund\n• Making savings salient and easy\n\n"Libertarian paternalism" - guide toward better outcomes while preserving freedom.',
    difficulty: 'hard',
    tags: ['nudge', 'behavioral', 'thaler']
  },
  {
    id: 'fc-psy2-035',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Decision-Making',
    front: 'What is REGRET AVERSION?',
    back: 'Fear of making a decision that turns out to be wrong leads to:\n\n• Inaction (to avoid responsibility for bad outcome)\n• Following the crowd (shared blame)\n• Avoiding risky investments\n• Analysis paralysis\n• Hindsight bias ("I knew it would happen")\n\nCounter by:\n• Focusing on process, not outcome\n• Documenting decision rationale\n• Diversifying (reduces regret potential)',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'regret']
  },

  // ============================================
  // FINANCIAL WELLNESS
  // ============================================
  {
    id: 'fc-psy2-036',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Financial Wellness',
    front: 'What is FINANCIAL WELL-BEING (CFPB definition)?',
    back: 'CFPB defines financial well-being as having:\n\n1. Control over day-to-day finances\n2. Capacity to absorb financial shocks\n3. On track to meet financial goals\n4. Freedom to make choices that allow enjoyment of life\n\nNot just about money—includes security, freedom, and ability to pursue goals.',
    difficulty: 'medium',
    tags: ['financial-wellness', 'CFPB', 'wellbeing']
  },
  {
    id: 'fc-psy2-037',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Financial Wellness',
    front: 'How does FINANCIAL STRESS affect people?',
    back: 'Physical effects:\n• Sleep problems\n• Headaches, muscle tension\n• High blood pressure\n• Weakened immune system\n\nMental effects:\n• Anxiety and depression\n• Relationship conflict\n• Poor work performance\n• Avoidance behaviors\n\nPlanners should recognize stress signs and address emotional component of planning.',
    difficulty: 'medium',
    tags: ['stress', 'health', 'wellness']
  },
  {
    id: 'fc-psy2-038',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Financial Wellness',
    front: 'What is MASLOW\'S HIERARCHY applied to financial planning?',
    back: 'Financial needs parallel Maslow\'s hierarchy:\n\n• PHYSIOLOGICAL: Basic needs (food, shelter, utilities)\n• SAFETY: Emergency fund, insurance, job security\n• BELONGING: Family financial security, giving\n• ESTEEM: Financial confidence, meeting goals\n• SELF-ACTUALIZATION: Financial freedom, legacy\n\nAddress lower needs before higher ones.',
    difficulty: 'medium',
    tags: ['maslow', 'hierarchy', 'needs']
  },
  {
    id: 'fc-psy2-039',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Financial Wellness',
    front: 'What is the relationship between MONEY and HAPPINESS?',
    back: 'Research findings:\n\n• Money increases happiness up to a point (~$75-100K for emotional well-being)\n• Above that, life satisfaction continues to rise but slowly\n• Spending on experiences > spending on things\n• Spending on others increases happiness\n• Financial security reduces stress/anxiety\n• Autonomy and purpose matter more than income level\n• Comparison to peers affects satisfaction',
    difficulty: 'medium',
    tags: ['happiness', 'wellbeing', 'research']
  },
  {
    id: 'fc-psy2-040',
    section: 'CFP-PSY',
    type: 'concept',
    topic: 'Financial Wellness',
    front: 'What is SCARCITY MINDSET vs ABUNDANCE MINDSET?',
    back: 'SCARCITY MINDSET:\n• Fear-based decisions\n• Focus on what might be lost\n• Hoarding behavior\n• Tunnel vision on immediate needs\n• Difficulty planning long-term\n\nABUNDANCE MINDSET:\n• Opportunity-focused\n• Belief in sufficient resources\n• Generous, growth-oriented\n• Long-term perspective\n• Open to calculated risks\n\nScarcity often comes from past experiences.',
    difficulty: 'hard',
    tags: ['mindset', 'scarcity', 'abundance']
  }
];
