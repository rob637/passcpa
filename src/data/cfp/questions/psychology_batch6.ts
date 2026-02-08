/**
 * CFP Psychology Questions - Batch 6
 * Domain 8: Psychology of Financial Planning (8% of exam)
 * 25 additional questions covering behavioral and psychological aspects
 */

import { Question } from '../../../types';

export const CFP_PSYCHOLOGY_BATCH6_QUESTIONS: Question[] = [
  // PSY-1: Behavioral Finance
  {
    id: 'CFP-PSY-B6-001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Hyperbolic Discounting',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Hyperbolic discounting leads clients to:',
    options: [
      'A) Overvalue long-term rewards',
      'B) Disproportionately prefer immediate rewards over larger future rewards, explaining undersaving and debt accumulation',
      'C) Save too much',
      'D) Avoid all spending'
    ],
    correctAnswer: 1,
    explanation: 'Hyperbolic discounting: people heavily discount future rewards compared to immediate ones, but the discount rate decreases for distant time horizons. This leads to present bias (preferring $100 today over $120 next month, but indifference between $100 in 12 months vs $120 in 13 months). Explains procrastination, undersaving, and credit card debt.'
  },
  {
    id: 'CFP-PSY-B6-002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Self-Control Problems',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Commitment devices help clients with self-control by:',
    options: [
      'A) Removing all choices',
      'B) Creating structures that make it harder to deviate from plans, like automatic savings or penalty clauses',
      'C) Requiring spouse approval',
      'D) Limiting investment options'
    ],
    correctAnswer: 1,
    explanation: 'Commitment devices lock in future behavior when willpower might fail. Examples: automatic 401(k) contributions (saves before spending), Roth conversion in low-income years (committed tax strategy), irrevocable trusts (cannot reclaim assets), penalty for early withdrawal (deters impulsive access). Clients often appreciate these guardrails.'
  },
  {
    id: 'CFP-PSY-B6-003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Narrative Fallacy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The narrative fallacy causes investors to:',
    options: [
      'A) Ignore all information',
      'B) Create coherent stories to explain random market movements, finding patterns where none exist',
      'C) Only read financial news',
      'D) Prefer bonds over stocks'
    ],
    correctAnswer: 1,
    explanation: 'Narrative fallacy: our need to construct stories leads to finding causality in random events. After market drops, we create explanations ("trade tensions caused the sell-off") that may be coincidental. This false sense of understanding breeds overconfidence about predicting future movements. Markets are often more random than narratives suggest.'
  },
  // PSY-2: Client Communication
  {
    id: 'CFP-PSY-B6-004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Communication',
    subtopic: 'Active Constructive Responding',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a client shares positive news like a promotion, active constructive responding involves:',
    options: [
      'A) Quickly changing the topic',
      'B) Enthusiastically engaging, asking follow-up questions, and helping them savor the positive experience',
      'C) Pointing out potential downsides',
      'D) Briefly acknowledging it'
    ],
    correctAnswer: 1,
    explanation: 'Active constructive responding (from positive psychology): respond to good news with enthusiasm and curiosity—ask questions, express joy, help them relive the experience. This builds relationship and trust. Passive or destructive responses (dismissing, undermining, focusing on negatives) damage rapport. Key to client relationship building.'
  },
  {
    id: 'CFP-PSY-B6-005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Communication',
    subtopic: 'Difficult Conversations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When delivering difficult financial news, a planner should:',
    options: [
      'A) Avoid the topic entirely',
      'B) Communicate directly but empathetically, allow space for emotional response, and provide actionable next steps',
      'C) Deliver information only via email',
      'D) Minimize the problem'
    ],
    correctAnswer: 1,
    explanation: 'Difficult conversations (job loss affecting plan, unrealistic goals, portfolio losses): be direct but compassionate, validate emotions, pause for response, then focus on actionable next steps. Avoiding or sugar-coating erodes trust. Written follow-up helps with information retention when stress impairs processing.'
  },
  {
    id: 'CFP-PSY-B6-006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Communication',
    subtopic: 'Shared Decision Making',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Shared decision-making in financial planning means:',
    options: [
      'A) The planner makes all decisions',
      'B) Collaboratively developing recommendations with clients, incorporating their values, preferences, and informed input',
      'C) Clients decide without guidance',
      'D) Following industry benchmarks'
    ],
    correctAnswer: 1,
    explanation: 'Shared decision-making: planner brings expertise, client brings values and preferences, decisions made together. Present options clearly, explain trade-offs, ensure understanding, let client choose. This improves satisfaction and adherence—clients "own" their plan rather than following orders. Medical field research shows better outcomes.'
  },
  // PSY-3: Financial Psychology
  {
    id: 'CFP-PSY-B6-007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Anxiety',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client with high financial anxiety should be approached by:',
    options: [
      'A) Dismissing their concerns as irrational',
      'B) Validating feelings, providing clear information, focusing on what\'s controllable, and building confidence gradually',
      'C) Showing worst-case scenarios',
      'D) Recommending only cash investments'
    ],
    correctAnswer: 1,
    explanation: 'Financial anxiety: validate their experience (it\'s real), provide clear information to counter uncertainty, focus on controllable actions, build confidence through small wins. Avoid overwhelming with data or dismissing concerns. Creating sense of control and progress reduces anxiety. Consider if therapy referral is appropriate for severe cases.'
  },
  {
    id: 'CFP-PSY-B6-008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Childhood Financial Experiences',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A client who grew up in poverty and now earns a high income may:',
    options: [
      'A) Automatically become a confident investor',
      'B) Hold deep-seated fears about money loss, oscillate between extreme saving and spending, or feel undeserving of wealth',
      'C) Never save money',
      'D) Only invest in real estate'
    ],
    correctAnswer: 1,
    explanation: 'Childhood financial trauma creates lasting patterns: scarcity mindset (hoarding, extreme anxiety about spending), guilt about having more than family of origin, alternating between restriction and splurging, difficulty trusting stability. Understanding their history enables compassionate guidance and realistic expectations for behavior change.'
  },
  {
    id: 'CFP-PSY-B6-009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Enabling',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Financial enabling (giving money that perpetuates dependence) is best addressed by:',
    options: [
      'A) Ignoring it',
      'B) Helping clients recognize the pattern, understand its impact, and develop healthier alternatives if they choose',
      'C) Refusing to manage their accounts',
      'D) Contacting the recipients directly'
    ],
    correctAnswer: 1,
    explanation: 'Financial enabling: giving money that perpetuates dependency (adult children never becoming independent, rescuing repeatedly from consequences). Approach: raise awareness without judgment, explore motivations (guilt, love, control), discuss long-term impacts, offer alternatives (matching gifts for savings, paying for education not lifestyle). Client must choose any changes.'
  },
  // PSY-4: Client Assessment
  {
    id: 'CFP-PSY-B6-010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Life Transitions Assessment',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A comprehensive assessment of clients in life transitions should include:',
    options: [
      'A) Only financial data',
      'B) Financial situation, emotional readiness, social support systems, and timeline flexibility',
      'C) Investment preferences only',
      'D) Previous advisor relationships'
    ],
    correctAnswer: 1,
    explanation: 'Life transitions (divorce, retirement, inheritance, widowhood) require holistic assessment: financial situation (immediate and long-term needs), emotional state (decision-making capacity may be compromised), support systems (who else is helping), timeline (what decisions can wait). Rushing major decisions during stress leads to regrets.'
  },
  {
    id: 'CFP-PSY-B6-011',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Questionnaire Limitations',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Standardized risk tolerance questionnaires have limitations including:',
    options: [
      'A) They are too accurate',
      'B) Responses may vary with market conditions, not capture emotional reactions, and fail to distinguish risk tolerance from risk capacity',
      'C) They are never used',
      'D) They only work for young clients'
    ],
    correctAnswer: 1,
    explanation: 'Questionnaire limitations: answers change based on recent market performance (recency bias), hypothetical scenarios don\'t capture actual emotional responses, conflate tolerance (psychological) with capacity (financial ability), and may not probe deeply enough. Use as starting point, not definitive answer—follow up with discussion and observe behavior over time.'
  },
  {
    id: 'CFP-PSY-B6-012',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Values Clarification',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Values clarification exercises help planners:',
    options: [
      'A) Impose their own values',
      'B) Understand what matters most to clients, enabling aligned recommendations and improved plan adherence',
      'C) Sell more products',
      'D) Reduce meeting time'
    ],
    correctAnswer: 1,
    explanation: 'Values clarification: through exercises, cards, or discussion, help clients articulate what they truly value (security, experiences, legacy, independence). Recommendations aligned with values feel right and get followed. Misaligned recommendations create resistance. Values also help prioritize when trade-offs are necessary.'
  },
  // Additional Topics
  {
    id: 'CFP-PSY-B6-013',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Regret Aversion',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Regret aversion affects investment decisions by:',
    options: [
      'A) Encouraging more risk-taking',
      'B) Making people avoid actions that might lead to regret, often resulting in inaction or conventional choices',
      'C) Improving diversification',
      'D) Focusing on fundamentals'
    ],
    correctAnswer: 1,
    explanation: 'Regret aversion: fear of making decisions we\'ll regret leads to inaction (staying in cash) or conventional choices (buying popular investments "at least I won\'t be alone"). Anticipated regret for action is often stronger than for inaction. Counter by framing inaction as a choice and discussing regret of missed opportunities.'
  },
  {
    id: 'CFP-PSY-B6-014',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Communication',
    subtopic: 'Cultural Dimensions',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Hofstede\'s cultural dimension of "individualism vs. collectivism" affects financial planning because:',
    options: [
      'A) It only affects savings rates',
      'B) Collectivist clients may prioritize family obligations, share decision-making, and expect to support extended family',
      'C) Individualist clients never save',
      'D) It determines risk tolerance'
    ],
    correctAnswer: 1,
    explanation: 'Individualistic cultures: personal goals, individual achievement, nuclear family focus. Collectivist cultures: group identity, extended family obligations, shared resources and decisions. Planners must understand which orientation applies—a collectivist client\'s "estate plan" may center on lifelong support of extended family, not just spouse and children.'
  },
  {
    id: 'CFP-PSY-B6-015',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Infidelity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When uncovering financial infidelity (hidden accounts, debt, or spending) between spouses:',
    options: [
      'A) Report it to the deceived spouse immediately',
      'B) Maintain confidentiality with your client, encourage honest communication, and consider if the engagement can continue',
      'C) Ignore it if amounts are small',
      'D) End the client relationship'
    ],
    correctAnswer: 1,
    explanation: 'Financial secrets between spouses create ethical challenges. Generally, maintain confidentiality with your client (the one who shared information), but encourage honest communication and explain how secrets undermine planning. Consider: who is actually the client? Can you effectively serve both? You may need to withdraw if serving separate interests becomes untenable.'
  },
  {
    id: 'CFP-PSY-B6-016',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Behavioral Segmentation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Behavioral segmentation of clients (e.g., avoiders, planners, spontaneous) helps planners:',
    options: [
      'A) Standardize all recommendations',
      'B) Tailor communication style, meeting frequency, and accountability structures to each client\'s natural tendencies',
      'C) Charge different fees',
      'D) Eliminate difficult clients'
    ],
    correctAnswer: 1,
    explanation: 'Behavioral types respond to different approaches. Avoiders: need structured accountability and simple next steps. Planners: appreciate detailed analysis and control. Spontaneous: need guardrails and commitment devices. Matching your approach to their style improves engagement and outcomes. One-size-fits-all planning ignores psychological differences.'
  },
  {
    id: 'CFP-PSY-B6-017',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Peak-End Rule',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The peak-end rule suggests that clients\' memory of an experience is most influenced by:',
    options: [
      'A) The first and last moments only',
      'B) The most intense moment (positive or negative) and how the experience ended',
      'C) The average experience',
      'D) The duration of the experience'
    ],
    correctAnswer: 1,
    explanation: 'Peak-end rule (Kahneman): memories of experiences are dominated by the peak intensity and ending, not duration or average. For planning: end meetings on positive notes, ensure peak moments are positive (not anxious), and manage difficult conversations to end constructively. A great meeting can be remembered poorly if it ends badly.'
  },
  {
    id: 'CFP-PSY-B6-018',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Communication',
    subtopic: 'Silence',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The strategic use of silence in client meetings:',
    options: [
      'A) Should be avoided as awkward',
      'B) Gives clients space to think, process emotions, and share more than they might with continuous questioning',
      'C) Shows disinterest',
      'D) Only works with introverts'
    ],
    correctAnswer: 1,
    explanation: 'Silence is a powerful communication tool. After asking a meaningful question or sharing information, pause—resist filling the space. Clients often share more when given time to think. Silence after emotional moments shows respect and patience. Many planners talk too much; learning to be comfortable with silence improves client engagement.'
  },
  {
    id: 'CFP-PSY-B6-019',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Sudden Wealth',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Clients experiencing sudden wealth (lottery, IPO, inheritance) often need:',
    options: [
      'A) Immediate investment of all funds',
      'B) Time to adjust psychologically, education on new responsibilities, and protection from hasty decisions',
      'C) Complete financial overhaul immediately',
      'D) Higher risk investments'
    ],
    correctAnswer: 1,
    explanation: 'Sudden wealth syndrome: psychological adjustment takes time. Many feel guilty, confused, or pressured by others. Recommendations: park funds safely initially, avoid major decisions for 6-12 months, protect privacy, educate on new concerns (estate planning, tax), guard against others\' expectations. Many sudden-wealth recipients lose it quickly due to poor decisions.'
  },
  {
    id: 'CFP-PSY-B6-020',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Financial Socialization',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Financial socialization refers to:',
    options: [
      'A) Networking events for investors',
      'B) The processes through which people develop values, attitudes, and behaviors related to money, primarily through family and culture',
      'C) Social media investment communities',
      'D) Professional financial education'
    ],
    correctAnswer: 1,
    explanation: 'Financial socialization: how we learn about money through family modeling, explicit teaching, and cultural exposure. Parents\' attitudes heavily influence children\'s adult behaviors. Understanding a client\'s financial socialization explains their current relationship with money and helps address behaviors rooted in early experience.'
  },
  {
    id: 'CFP-PSY-B6-021',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Information Overload',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Information overload leads to:',
    options: [
      'A) Better decisions',
      'B) Decision paralysis, reliance on shortcuts, and potentially worse choices despite more information',
      'C) More diversification',
      'D) Higher returns'
    ],
    correctAnswer: 1,
    explanation: 'Too much information paradoxically impairs decision-making. People become paralyzed or use simple heuristics (defaults, familiar options) rather than analyzing all data. Planners should curate information, present key factors clearly, and avoid overwhelming clients with every available option or data point. Simplify without oversimplifying.'
  },
  {
    id: 'CFP-PSY-B6-022',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Communication',
    subtopic: 'Explaining Probabilities',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When explaining probabilistic outcomes (e.g., Monte Carlo results) to clients:',
    options: [
      'A) Only show point estimates',
      'B) Use multiple formats (percentages, frequencies, visual displays) and check understanding, as probability concepts are often misunderstood',
      'C) Avoid all numbers',
      'D) Focus only on worst case'
    ],
    correctAnswer: 1,
    explanation: 'Probability communication is challenging—people misunderstand percentages and interpret them through biases. Best practices: use natural frequencies ("80 out of 100") alongside percentages, provide visual representations, give context (compared to what?), and actively check understanding. "85% success probability" means different things to different people.'
  },
  {
    id: 'CFP-PSY-B6-023',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Wellbeing',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Financial wellbeing encompasses:',
    options: [
      'A) Only net worth',
      'B) Sense of security, freedom to make choices, and being on track to meet future goals, not just wealth level',
      'C) Income only',
      'D) Investment returns'
    ],
    correctAnswer: 1,
    explanation: 'Financial wellbeing (CFPB definition): security and freedom—control over day-to-day finances, capacity to absorb shocks, on track for long-term goals, and freedom to make choices to enjoy life. High income/wealth doesn\'t guarantee wellbeing; moderate wealth with security and values-alignment can produce greater wellbeing.'
  },
  {
    id: 'CFP-PSY-B6-024',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Financial Capability',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Financial capability combines:',
    options: [
      'A) Only mathematical ability',
      'B) Financial knowledge/skills AND the ability to act on them, including psychological factors and access to appropriate products',
      'C) Just income levels',
      'D) Professional credentials'
    ],
    correctAnswer: 1,
    explanation: 'Financial capability = knowledge/skills + psychological ability to act + access to resources. Someone may understand investing but be paralyzed by anxiety. Another may be motivated but lack knowledge. A third may have both but lack access to appropriate products. Effective planning addresses all three elements to improve capability.'
  },
  {
    id: 'CFP-PSY-B6-025',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Social Proof',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Social proof affects financial decisions when:',
    options: [
      'A) People ignore others\'s behavior',
      'B) People look to others\' actions for guidance on what to do, especially under uncertainty',
      'C) Only in group settings',
      'D) Advisors recommend it'
    ],
    correctAnswer: 1,
    explanation: 'Social proof: we follow others\' behavior especially when uncertain. "Everyone is buying crypto" or "my neighbor got a reverse mortgage" influences decisions. Can be positive (using peer retirement savings benchmarks) or negative (herd behavior causing bubbles). Planners can harness social proof ("many clients in your situation...") ethically.'
  }
];
