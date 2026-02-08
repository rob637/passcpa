/**
 * CFP Psychology Questions - Batch 4
 * Domain 8: Psychology of Financial Planning (8% of exam)
 * 25 additional questions covering client communication and behavioral aspects
 */

import { Question } from '../../../types';

export const CFP_PSYCHOLOGY_BATCH4_QUESTIONS: Question[] = [
  // PSY-1: Client Communication
  {
    id: 'CFP-PSY-B4-001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Active Listening',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a client says "I want to be aggressive for growth" but their financial situation shows low risk capacity, effective active listening involves:',
    options: [
      'A) Immediately implementing an aggressive portfolio',
      'B) Clarifying what "aggressive" means to them, exploring underlying goals, and helping reconcile stated risk tolerance with actual capacity',
      'C) Telling them they\'re wrong about their risk tolerance',
      'D) Ignoring their stated preference'
    ],
    correctAnswer: 1,
    explanation: 'Active listening involves hearing what\'s said, what\'s meant, and what\'s behind it. "Aggressive" may mean different things. Skilled advisors explore the underlying goal (perhaps "not running out of money"), then help the client understand how risk capacity affects achieving that goal.'
  },
  {
    id: 'CFP-PSY-B4-002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Difficult Conversations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When delivering bad news about portfolio performance, the financial planner should:',
    options: [
      'A) Avoid the topic until the client asks',
      'B) Lead with context, explain what happened and why, acknowledge emotions, and focus on the forward-looking plan',
      'C) Blame market conditions entirely',
      'D) Immediately recommend changes to recover losses'
    ],
    correctAnswer: 1,
    explanation: 'Difficult conversations require preparation, honesty, and empathy. Provide context (market conditions, original plan rationale), acknowledge the client\'s likely emotions, and shift focus to what\'s next. Avoid defensive or blame-shifting language. The relationship may deepen through handling adversity well.'
  },
  {
    id: 'CFP-PSY-B4-003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Nonverbal Communication',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In client meetings, nonverbal communication:',
    options: [
      'A) Is irrelevant compared to verbal content',
      'B) Can convey more meaning than words, including confidence, empathy, discomfort, or disagreement',
      'C) Should be ignored to focus on facts',
      'D) Only matters in video calls'
    ],
    correctAnswer: 1,
    explanation: 'Research suggests 60-90% of communication is nonverbal. Body language, eye contact, facial expressions, and tone convey meaning. Planners should observe client nonverbal cues (discomfort, confusion, disagreement) and manage their own to project competence and empathy.'
  },
  // PSY-2: Behavioral Finance Applications
  {
    id: 'CFP-PSY-B4-004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Anchoring Bias',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A client refuses to sell a stock purchased at $100, now trading at $50, because they\'re "waiting to get back to even." This illustrates:',
    options: [
      'A) Sound investment strategy',
      'B) Anchoring to the purchase price combined with loss aversion, ignoring current fundamentals',
      'C) Overconfidence bias',
      'D) Herding behavior'
    ],
    correctAnswer: 1,
    explanation: 'Anchoring to purchase price is common but irrational—the stock doesn\'t "know" what you paid. Combined with loss aversion (refusing to realize losses), this can lead to holding losers too long. The relevant question is whether the current price reflects fair value given prospects, not original cost.'
  },
  {
    id: 'CFP-PSY-B4-005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Overconfidence',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Overconfidence bias in investors typically leads to:',
    options: [
      'A) Better portfolio performance',
      'B) Excessive trading, inadequate diversification, and underestimation of risks',
      'C) More conservative allocations',
      'D) Better risk management'
    ],
    correctAnswer: 1,
    explanation: 'Overconfident investors believe they can beat the market, leading to excessive trading (transaction costs), concentrated positions (inadequate diversification), and underestimating downside risks. Studies show overconfident traders underperform. Planners can counter with data and diversification requirements.'
  },
  {
    id: 'CFP-PSY-B4-006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Regret Aversion',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Regret aversion causes investors to:',
    options: [
      'A) Take appropriate risks',
      'B) Avoid action to prevent the regret of a poor decision, often leading to inaction even when action is warranted',
      'C) Follow crowds for safety',
      'D) Seek high-risk investments'
    ],
    correctAnswer: 1,
    explanation: 'Regret aversion fear of making a decision that later proves wrong leads to paralysis. Investors may keep assets in cash or maintain inherited positions indefinitely because choosing action creates regret potential. Planners can help by framing decisions as processes, not single events.'
  },
  // PSY-3: Values and Goals
  {
    id: 'CFP-PSY-B4-007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Values and Goals',
    subtopic: 'Goal Setting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'SMART goals in financial planning should be:',
    options: [
      'A) Simple, Moderate, Achievable, Required, Timely',
      'B) Specific, Measurable, Achievable, Relevant, Time-bound',
      'C) Strategic, Monetary, Aggressive, Risky, Tracked',
      'D) Standard, Managed, Appropriate, Realistic, Tested'
    ],
    correctAnswer: 1,
    explanation: 'SMART goals provide clarity and accountability. Specific (clear target), Measurable (quantifiable), Achievable (realistic), Relevant (aligned with values), Time-bound (deadline). "Retire comfortably" becomes "Accumulate $2M by age 65 to provide $80K annual spending."'
  },
  {
    id: 'CFP-PSY-B4-008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Values and Goals',
    subtopic: 'Values Clarification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Values clarification exercises in financial planning:',
    options: [
      'A) Are unnecessary for investment decisions',
      'B) Help uncover what truly matters to clients, ensuring plans align with their deepest priorities',
      'C) Should be avoided as too personal',
      'D) Only apply to wealthy clients'
    ],
    correctAnswer: 1,
    explanation: 'Understanding client values (security, freedom, legacy, experiences, family) ensures plans reflect true priorities. This prevents misaligned goals and increases commitment to the plan. Techniques include values card sorts, life satisfaction exercises, and open-ended exploration of what matters most.'
  },
  {
    id: 'CFP-PSY-B4-009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Values and Goals',
    subtopic: 'Goal Prioritization',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When clients have competing goals with insufficient resources:',
    options: [
      'A) The planner should decide which goals to pursue',
      'B) Help clients understand trade-offs, prioritize based on values and constraints, and develop contingency plans',
      'C) Recommend they find more income',
      'D) Pursue all goals equally'
    ],
    correctAnswer: 1,
    explanation: 'Goal conflicts are common—early retirement vs. college funding, consumption vs. savings. Planners help clients understand trade-offs, quantify impacts, and prioritize based on their values. This may involve negotiation, phased goals, or contingency plans if circumstances change.'
  },
  // PSY-1: More Communication
  {
    id: 'CFP-PSY-B4-010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Trust Building',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Trust in the advisor-client relationship is built through:',
    options: [
      'A) Always agreeing with the client',
      'B) Competence, consistency, honesty, transparency, and demonstrating genuine care for client welfare',
      'C) Impressive offices and credentials',
      'D) Avoiding difficult topics'
    ],
    correctAnswer: 1,
    explanation: 'Trust develops over time through demonstrated competence, consistent follow-through, honest communication (including about limitations), transparency about fees and conflicts, and showing genuine interest in client well-being beyond just financial metrics.'
  },
  {
    id: 'CFP-PSY-B4-011',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Cultural Sensitivity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cultural competence in financial planning requires:',
    options: [
      'A) Treating all clients identically regardless of background',
      'B) Understanding how cultural factors influence financial attitudes, decision-making, family dynamics, and communication preferences',
      'C) Avoiding discussion of cultural differences',
      'D) Applying stereotypes based on ethnicity'
    ],
    correctAnswer: 1,
    explanation: 'Cultural factors affect attitudes toward debt, family financial obligations, women\'s financial roles, risk perception, and communication styles. Cultural competence means being aware, asking respectfully, adapting approaches, and avoiding both stereotyping and ignoring relevant differences.'
  },
  {
    id: 'CFP-PSY-B4-012',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Jargon Avoidance',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When communicating with clients about financial topics:',
    options: [
      'A) Use technical terms to demonstrate expertise',
      'B) Use plain language, check for understanding, and adapt complexity to client sophistication',
      'C) Assume all clients understand basic financial concepts',
      'D) Provide only written materials'
    ],
    correctAnswer: 1,
    explanation: 'Technical jargon can intimidate, confuse, or create false understanding. Adapting language to client sophistication, using analogies, checking comprehension, and explaining concepts at appropriate levels enhances understanding and engagement while still conveying expertise.'
  },
  // PSY-2: More Behavioral Topics
  {
    id: 'CFP-PSY-B4-013',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Framing Effects',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Framing effects in financial planning mean:',
    options: [
      'A) Information presentation doesn\'t affect decisions',
      'B) How information is presented (as gains vs losses, probabilities vs frequencies) significantly influences client choices',
      'C) Clients only consider objective facts',
      'D) Frames should be avoided entirely'
    ],
    correctAnswer: 1,
    explanation: 'Framing dramatically affects decisions. "90% survival rate" sounds better than "10% mortality rate" though identical. Planners can use this ethically—framing savings as "keeping" money, or showing probability of success rather than failure. Awareness of framing effects helps both present and interpret information.'
  },
  {
    id: 'CFP-PSY-B4-014',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Sunk Cost Fallacy',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A client refuses to sell an investment fund despite poor performance because "I\'ve already lost so much." This represents:',
    options: [
      'A) Rational decision-making',
      'B) The sunk cost fallacy—past losses shouldn\'t influence future decisions, only forward-looking prospects matter',
      'C) Risk tolerance assessment',
      'D) Time diversification'
    ],
    correctAnswer: 1,
    explanation: 'Sunk costs are irrecoverable regardless of future actions. Rational decisions consider only prospective costs and benefits. Continuing to hold a poor investment because of past losses ignores whether current value reflects future prospects. The remedy is focusing on "what\'s the best use of these dollars NOW?"'
  },
  {
    id: 'CFP-PSY-B4-015',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Choice Architecture',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Choice architecture in financial planning involves:',
    options: [
      'A) Giving clients unlimited options',
      'B) Structuring how choices are presented to encourage better decisions while preserving freedom to choose',
      'C) Making decisions for clients',
      'D) Avoiding recommendations'
    ],
    correctAnswer: 1,
    explanation: 'Choice architecture (from behavioral economics) structures decision environments. Examples: setting good defaults (auto-enrollment in 401(k)), simplifying choices, ordering options strategically, and timing recommendations. It nudges toward better outcomes while respecting autonomy—people can always choose differently.'
  },
  // PSY-3: More Values/Goals
  {
    id: 'CFP-PSY-B4-016',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Values and Goals',
    subtopic: 'Life Transitions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'During major life transitions (divorce, job loss, death of spouse), financial planners should:',
    options: [
      'A) Focus only on immediate financial decisions',
      'B) Acknowledge the emotional component, avoid major irreversible decisions when possible, and provide stability while processing change',
      'C) Encourage quick decision-making',
      'D) Refer all transitioning clients to therapists'
    ],
    correctAnswer: 1,
    explanation: 'Life transitions involve both financial and emotional dimensions. Planners should acknowledge the difficulty, avoid pushing major decisions during acute phases, create financial "breathing room," and coordinate with other professionals as needed. Extreme stress impairs decision-making quality.'
  },
  {
    id: 'CFP-PSY-B4-017',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Values and Goals',
    subtopic: 'Couples Dynamics',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When working with couples who disagree about financial decisions:',
    options: [
      'A) Side with the higher-earning spouse',
      'B) Facilitate dialogue, identify shared values, help develop compromises, and ensure both voices are heard',
      'C) Recommend separate accounts to avoid conflict',
      'D) Tell them what they should do'
    ],
    correctAnswer: 1,
    explanation: 'Relationship dynamics significantly affect financial planning. Planners can facilitate dialogue, help identify underlying concerns, find shared values, develop compromise positions, and ensure money decisions don\'t create relationship damage. Power imbalances should be recognized and managed.'
  },
  {
    id: 'CFP-PSY-B4-018',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Values and Goals',
    subtopic: 'Legacy Planning',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Discussion of legacy in financial planning should explore:',
    options: [
      'A) Only estate tax minimization',
      'B) What clients want to be remembered for, values they want to transmit, experiences vs. assets for heirs, and charitable intentions',
      'C) Only asset distribution',
      'D) Legal documents only'
    ],
    correctAnswer: 1,
    explanation: 'Legacy encompasses more than money—it includes values, experiences, family traditions, and impact. Deeper exploration might reveal clients prefer funding education experiences, supporting causes, or creating family rituals over maximizing dollar transfers. This shapes estate and gifting strategies.'
  },
  // Additional Topics
  {
    id: 'CFP-PSY-B4-019',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Prospect Theory',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'According to Prospect Theory developed by Kahneman and Tversky:',
    options: [
      'A) Gains and losses are valued equally',
      'B) Losses are felt more intensely than equivalent gains, and people evaluate outcomes relative to a reference point',
      'C) Investors always maximize utility',
      'D) Risk preferences are constant'
    ],
    correctAnswer: 1,
    explanation: 'Prospect Theory is foundational to behavioral finance. Key insights: (1) losses hurt roughly twice as much as equivalent gains feel good (loss aversion), (2) outcomes are evaluated relative to a reference point, not absolute wealth, (3) people are risk-averse with gains but risk-seeking with losses.'
  },
  {
    id: 'CFP-PSY-B4-020',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Empathy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Demonstrating empathy in financial planning involves:',
    options: [
      'A) Feeling the same emotions as clients',
      'B) Understanding clients\' perspectives and experiences, validating feelings, and responding with genuine care',
      'C) Agreeing with every client decision',
      'D) Avoiding emotional topics'
    ],
    correctAnswer: 1,
    explanation: 'Empathy means understanding others\' experiences from their perspective. It doesn\'t require identical feelings or agreeing with decisions. Validation ("I can understand why that\'s frustrating") builds connection. Empathetic responses acknowledge emotions before pivoting to solutions.'
  },
  {
    id: 'CFP-PSY-B4-021',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Present Bias',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Present bias (hyperbolic discounting) causes people to:',
    options: [
      'A) Save excessively for the future',
      'B) Overvalue immediate rewards relative to future ones, making saving and delayed gratification difficult',
      'C) Focus too much on retirement planning',
      'D) Ignore current needs'
    ],
    correctAnswer: 1,
    explanation: 'Present bias means preferring immediate rewards over larger future ones—choosing $100 today over $120 next month. This makes saving difficult and explains procrastination. Planners can counter with automation (forced savings), commitment devices, and vivid future visualization.'
  },
  {
    id: 'CFP-PSY-B4-022',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Open Questions',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Open-ended questions in client discovery:',
    options: [
      'A) Should be avoided for efficiency',
      'B) Encourage detailed responses, reveal values and concerns, and provide richer information than yes/no questions',
      'C) Create confusion',
      'D) Are only for therapy'
    ],
    correctAnswer: 1,
    explanation: 'Open questions (How, What, Tell me about) invite elaboration and reveal information beyond what\'s asked. "What concerns you about retirement?" yields richer data than "Are you concerned about retirement?" They\'re essential for discovery but should be balanced with focused follow-ups.'
  },
  {
    id: 'CFP-PSY-B4-023',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Values and Goals',
    subtopic: 'Financial Life Planning',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Financial Life Planning, as pioneered by George Kinder and others:',
    options: [
      'A) Focuses primarily on investment returns',
      'B) Starts with life goals and values, then aligns financial resources to support living purposefully',
      'C) Is identical to traditional financial planning',
      'D) Ignores practical financial details'
    ],
    correctAnswer: 1,
    explanation: 'Financial Life Planning reverses traditional planning—start with life goals, not financial goals. Kinder\'s "Three Questions" explore what clients would do with perfect resources, limited time, and life-threatening news. This identifies true priorities that financial planning should support.'
  },
  {
    id: 'CFP-PSY-B4-024',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Confirmation Bias',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When a client researches investments by only reading positive articles about their preferred choice, this demonstrates:',
    options: [
      'A) Thorough research',
      'B) Confirmation bias—seeking information that supports existing beliefs while ignoring contradictory evidence',
      'C) Due diligence',
      'D) Risk awareness'
    ],
    correctAnswer: 1,
    explanation: 'Confirmation bias leads people to gather, interpret, and recall information that confirms existing beliefs. This creates overconfidence and blind spots. Planners can counter by presenting balanced information, playing devil\'s advocate, and encouraging clients to actively seek disconfirming data.'
  },
  {
    id: 'CFP-PSY-B4-025',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Communication',
    subtopic: 'Reflective Listening',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Reflective listening involves:',
    options: [
      'A) Repeating exactly what the client said',
      'B) Paraphrasing the client\'s message to confirm understanding and demonstrate attention',
      'C) Waiting silently until the client finishes',
      'D) Offering immediate solutions'
    ],
    correctAnswer: 1,
    explanation: 'Reflective listening paraphrases content and/or emotion: "It sounds like you\'re concerned retirement won\'t be as comfortable as expected." This confirms understanding, demonstrates attention, validates feelings, and invites correction if the planner misunderstood. It\'s central to motivational interviewing and counseling techniques.'
  }
];
