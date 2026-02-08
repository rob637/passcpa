/**
 * CFP Psychology Questions - Batch 7
 * Domain: Psychology of Financial Planning (8% of exam)
 * 25 additional questions covering behavioral finance and client psychology
 */

import { Question } from '../../../types';

export const CFP_PSYCHOLOGY_BATCH7_QUESTIONS: Question[] = [
  // PSY-1: Behavioral Finance
  {
    id: 'CFP-PSY-B7-001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Sunk Cost Fallacy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a client refuses to sell a losing investment because they\'ve "already put so much into it," they are exhibiting:',
    options: [
      'A) Rational analysis',
      'B) Sunk cost fallacy, where past unrecoverable costs inappropriately influence current decisions',
      'C) Effective tax planning',
      'D) Risk aversion'
    ],
    correctAnswer: 1,
    explanation: 'Sunk cost fallacy: letting irrecoverable past costs influence future decisions. Money already lost shouldn\'t affect whether to sell now—only future prospects matter. Common with losing investments, ongoing projects, or bad relationships. Help clients focus on: "What\'s the best use of this money going forward?" Past is irrelevant.'
  },
  {
    id: 'CFP-PSY-B7-002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'House Money Effect',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'After receiving an inheritance, a conservative investor suddenly takes aggressive risks. This demonstrates:',
    options: [
      'A) Improved financial sophistication',
      'B) House money effect, where gains are treated as less valuable "house money" that can be risked',
      'C) Proper diversification',
      'D) Goal-based investing'
    ],
    correctAnswer: 1,
    explanation: 'House money effect (from gambling): treating gains/windfalls differently than earned money. "It\'s not my money anyway." Leads to excessive risk-taking with inheritances, bonuses, investment gains. Money is fungible—all dollars should be valued equally. Help clients integrate windfalls into overall financial plan rather than treating them as play money.'
  },
  {
    id: 'CFP-PSY-B7-003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Status Quo Bias',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Status quo bias explains why clients:',
    options: [
      'A) Always optimize their portfolios',
      'B) Prefer current arrangements and resist changing even when alternatives are objectively better',
      'C) Take excessive risks',
      'D) Ignore all advice'
    ],
    correctAnswer: 1,
    explanation: 'Status quo bias: preference for current state over change. "I\'ve always done it this way." Keeps people in unsuitable investments, with wrong insurance, at the same bank. Change requires effort and feels risky. Use defaults wisely (auto-enrollment exploits this positively). Demonstrate clear benefit to overcome inertia.'
  },
  {
    id: 'CFP-PSY-B7-004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Outcome Bias',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Judging an investment decision as good solely because it made money demonstrates:',
    options: [
      'A) Sound analysis',
      'B) Outcome bias, which evaluates decisions by results rather than the quality of the decision process',
      'C) Returns-based investing',
      'D) Hindsight effectiveness'
    ],
    correctAnswer: 1,
    explanation: 'Outcome bias: judging decisions by results rather than process. A risky bet that pays off was still a bad decision if the odds were against it. Good process can have bad outcomes; bad process can luckily succeed. Evaluate: was the decision reasonable given information available at the time? Focus on quality process, not hindsight.'
  },
  // PSY-2: Client Communication
  {
    id: 'CFP-PSY-B7-005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Motivational Interviewing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Motivational interviewing techniques help clients by:',
    options: [
      'A) Telling them what to do',
      'B) Drawing out their own motivations for change through open questions and reflective listening',
      'C) Criticizing current behaviors',
      'D) Providing only facts'
    ],
    correctAnswer: 1,
    explanation: 'Motivational interviewing: client-centered approach. Express empathy, develop discrepancy between goals and behavior, roll with resistance (don\'t argue), support self-efficacy. Uses open questions, affirmations, reflections, summaries (OARS). People more likely to change when they articulate their own reasons rather than being told.'
  },
  {
    id: 'CFP-PSY-B7-006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Active Listening',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Active listening involves:',
    options: [
      'A) Waiting for your turn to speak',
      'B) Fully concentrating on the speaker, understanding their message, responding thoughtfully, and remembering key points',
      'C) Taking extensive notes only',
      'D) Agreeing with everything'
    ],
    correctAnswer: 1,
    explanation: 'Active listening: full attention, suspend judgment, use nonverbal cues (eye contact, nodding), reflect back what you hear, ask clarifying questions, remember details. Not passive—requires engagement. Clients feel heard and understood. Reveals important information that surface-level listening misses. Foundation of effective advising.'
  },
  {
    id: 'CFP-PSY-B7-007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Empathy Statements',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Using empathy statements in client meetings:',
    options: [
      'A) Wastes time',
      'B) Acknowledges client feelings and builds trust, even when you cannot solve their problem',
      'C) Shows weakness',
      'D) Creates liability'
    ],
    correctAnswer: 1,
    explanation: 'Empathy statements: "I understand this is frustrating," "It makes sense you\'re worried." Validates feelings without necessarily agreeing. Builds rapport and trust. Especially important during market downturns, life changes, or difficult news. Doesn\'t mean agreeing—clients can be heard without being right. Creates psychological safety.'
  },
  // PSY-3: Financial Psychology
  {
    id: 'CFP-PSY-B7-008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Money Scripts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Money scripts are:',
    options: [
      'A) Written financial plans',
      'B) Unconscious beliefs about money typically developed in childhood that drive financial behaviors',
      'C) Investment strategies',
      'D) Tax documents'
    ],
    correctAnswer: 1,
    explanation: 'Money scripts (Klontz): unconscious beliefs from childhood experiences/family messages. Categories: avoidance ("money is bad"), worship ("more money solves everything"), status ("success = possessions"), vigilance ("saving above all"). Scripts drive behavior without awareness. Identifying them helps understand client decisions and resistance to advice.'
  },
  {
    id: 'CFP-PSY-B7-009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Anxiety',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client with financial anxiety may benefit from:',
    options: [
      'A) More complex strategies',
      'B) Gradual exposure to financial topics, simplified information, and celebration of small progress',
      'C) Criticism of past decisions',
      'D) Ignoring their concerns'
    ],
    correctAnswer: 1,
    explanation: 'Financial anxiety management: acknowledge the anxiety is real, start with small manageable tasks, avoid overwhelming with information, celebrate progress, use simple clear language, provide reassurance about the process. Build confidence gradually. If severe, may need referral to financial therapist. Don\'t dismiss—anxiety blocks engagement.'
  },
  {
    id: 'CFP-PSY-B7-010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Infidelity',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Financial infidelity in couples refers to:',
    options: [
      'A) Writing bad checks',
      'B) Hiding money, debts, or spending from a partner, reflecting trust and communication issues',
      'C) Poor investment returns',
      'D) Late payments'
    ],
    correctAnswer: 1,
    explanation: 'Financial infidelity: secret accounts, hidden debts, undisclosed purchases, lying about income. Common and damaging to relationships. Planners may discover discrepancies between partner statements. Not our role to investigate or judge, but facilitate open communication if willing. May suggest couples therapy. Affects ability to plan together.'
  },
  // PSY-4: Client Assessment
  {
    id: 'CFP-PSY-B7-011',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Risk Tolerance Assessment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Effective risk tolerance assessment should:',
    options: [
      'A) Use only questionnaires',
      'B) Combine questionnaires with conversations about past experiences, current feelings, and hypothetical scenarios',
      'C) Rely on age alone',
      'D) Be done once and never revisited'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive risk assessment: questionnaires (standardized comparison), conversation (past behavior, emotional responses, understanding), hypothetical scenarios ("how would you feel if the portfolio dropped 30%"), observe behavior during volatile periods. One method isn\'t enough. Revisit when circumstances change. Risk tolerance vs. risk capacity differ.'
  },
  {
    id: 'CFP-PSY-B7-012',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Life Stage Considerations',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Client assessment should consider life stage because:',
    options: [
      'A) Everyone in the same age group is identical',
      'B) Different life stages bring different priorities, concerns, capabilities, and time horizons',
      'C) Only retirement matters',
      'D) Life stage doesn\'t affect finances'
    ],
    correctAnswer: 1,
    explanation: 'Life stage assessment: young adult (education debt, career building), family formation (housing, children costs, insurance), mid-career (wealth accumulation, sandwich generation), pre-retirement (catch-up, planning transition), retirement (income, healthcare, legacy). Same age doesn\'t mean same stage—consider actual circumstances not just demographics.'
  },
  {
    id: 'CFP-PSY-B7-013',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Financial Personality',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Understanding a client\'s financial personality helps:',
    options: [
      'A) Predict stock returns',
      'B) Tailor communication style, set appropriate expectations, and design strategies they\'ll actually follow',
      'C) Determine their intelligence',
      'D) Assess their income'
    ],
    correctAnswer: 1,
    explanation: 'Financial personality types inform approach: some clients want data and details, others prefer big picture; some need frequent reassurance, others prefer independence; some make quick decisions, others deliberate extensively. Match your style to theirs. Strategy they\'ll follow beats "optimal" strategy they\'ll abandon.'
  },
  // Additional Topics
  {
    id: 'CFP-PSY-B7-014',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Endowment Effect',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The endowment effect causes people to:',
    options: [
      'A) Value others\' possessions more',
      'B) Overvalue things they own compared to identical items they don\'t own',
      'C) Trade frequently',
      'D) Ignore their assets'
    ],
    correctAnswer: 1,
    explanation: 'Endowment effect: ownership increases perceived value. People demand more to sell something than they\'d pay to acquire it. Explains: resistance to selling inherited investments, overvaluing company stock, reluctance to downsize homes. Loss aversion related—selling feels like losing. Help clients evaluate assets objectively, not based on ownership.'
  },
  {
    id: 'CFP-PSY-B7-015',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Familiarity Bias',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Familiarity bias leads investors to:',
    options: [
      'A) Properly diversify globally',
      'B) Overweight domestic stocks, employer stock, or industries they know, resulting in concentrated portfolios',
      'C) Avoid all stocks',
      'D) Only invest in index funds'
    ],
    correctAnswer: 1,
    explanation: 'Familiarity bias: preferring the known over unknown. Home country bias (overweight domestic stocks), employer stock overconcentration, industry concentraction (tech workers in tech stocks). Familiarity feels safer but isn\'t—it\'s concentration risk. Help clients understand that knowing a company doesn\'t mean knowing its stock will outperform.'
  },
  {
    id: 'CFP-PSY-B7-016',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Difficult Conversations',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When delivering difficult financial news, planners should:',
    options: [
      'A) Avoid the topic entirely',
      'B) Be direct but compassionate, acknowledge the emotional impact, and focus on constructive next steps',
      'C) Blame market conditions',
      'D) Minimize the problem'
    ],
    correctAnswer: 1,
    explanation: 'Difficult conversations: prepare what you\'ll say, be honest but compassionate, allow time for reaction, don\'t defend or make excuses, acknowledge feelings ("I know this is hard to hear"), pivot to solutions and next steps when ready. Avoiding bad news erodes trust. Delivering it well builds trust even when news is negative.'
  },
  {
    id: 'CFP-PSY-B7-017',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Nonverbal Communication',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Nonverbal cues in client meetings:',
    options: [
      'A) Are irrelevant',
      'B) Provide important information about client comfort, understanding, and agreement that words may not convey',
      'C) Only matter for salespeople',
      'D) Should be ignored'
    ],
    correctAnswer: 1,
    explanation: 'Nonverbal communication: body language, facial expressions, tone, posture. May reveal: confusion (furrowed brow), discomfort (crossed arms), disagreement (looking away), engagement (leaning in). Your nonverbal signals matter too—project confidence, openness, attention. Much of communication is nonverbal—observe and respond.'
  },
  {
    id: 'CFP-PSY-B7-018',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Shame',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Clients experiencing financial shame may:',
    options: [
      'A) Be fully transparent about finances',
      'B) Hide debts, avoid planning meetings, or resist discussing certain topics',
      'C) Make all decisions quickly',
      'D) Share everything immediately'
    ],
    correctAnswer: 1,
    explanation: 'Financial shame: embarrassment about financial situation, past decisions, or lack of knowledge. Signs: incomplete disclosure, avoiding topics, defensiveness, missed meetings. Create safe environment: normalize struggles, avoid judgment, focus on future rather than past mistakes, celebrate any progress. Shame keeps people from getting help they need.'
  },
  {
    id: 'CFP-PSY-B7-019',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Trauma',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Financial trauma from events like bankruptcy, foreclosure, or crisis may result in:',
    options: [
      'A) No lasting effects',
      'B) Anxiety around finances, avoidance behaviors, or overcautious/risk-averse responses years later',
      'C) Immediately rational behavior',
      'D) Increased risk tolerance'
    ],
    correctAnswer: 1,
    explanation: 'Financial trauma: severe financial events can have lasting psychological effects. May manifest as: excessive fear/anxiety, inability to engage with finances, hoarding or extreme frugality, overcaution preventing reasonable risk-taking. Past experiences shape current behaviors. May need gentle approach, patience, possibly referral to therapist specializing in financial issues.'
  },
  {
    id: 'CFP-PSY-B7-020',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Financial Knowledge',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Assessing client financial knowledge helps planners:',
    options: [
      'A) Judge client intelligence',
      'B) Calibrate explanations, identify education needs, and avoid assumptions about understanding',
      'C) Determine investment returns',
      'D) Set fee levels'
    ],
    correctAnswer: 1,
    explanation: 'Knowledge assessment: understand baseline to communicate appropriately. Some clients have sophisticated knowledge; others are beginners. Avoid: talking over heads (confusing) or talking down (condescending). Identify gaps for education. Ask questions, observe reactions, invite questions. Different knowledge levels need different approaches.'
  },
  {
    id: 'CFP-PSY-B7-021',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Choice Overload',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Choice overload can cause clients to:',
    options: [
      'A) Make better decisions',
      'B) Become paralyzed by too many options, delay decisions, or choose simple defaults',
      'C) Always pick the best option',
      'D) Feel more satisfied'
    ],
    correctAnswer: 1,
    explanation: 'Choice overload (paradox of choice): too many options leads to paralysis, worse decisions, or choosing defaults/doing nothing. In 401(k)s, too many funds reduces participation. Planners help by: curating options, providing clear recommendations, simplifying where possible. Guidance through choices adds value beyond just presenting options.'
  },
  {
    id: 'CFP-PSY-B7-022',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Storytelling',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Using stories and examples in client education:',
    options: [
      'A) Is unprofessional',
      'B) Makes abstract concepts concrete and memorable, and helps clients relate information to their lives',
      'C) Takes too much time',
      'D) Only works with children'
    ],
    correctAnswer: 1,
    explanation: 'Storytelling in planning: abstract concepts become tangible. "Inflation means what costs $1 today will cost $2.40 in 30 years." Anonymized examples: "I worked with a couple in similar situation who..." Stories are memorable and relatable. Use appropriately—support, don\'t replace, data. Powerful teaching and persuasion tool.'
  },
  {
    id: 'CFP-PSY-B7-023',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Delayed Gratification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Helping clients with delayed gratification involves:',
    options: [
      'A) Eliminating all current spending',
      'B) Making future rewards more concrete, using automation, and balancing present and future needs',
      'C) Only focusing on retirement',
      'D) Criticizing their spending'
    ],
    correctAnswer: 1,
    explanation: 'Delayed gratification challenges: future self feels abstract. Strategies: visualize future goals concretely, use photos of older self, automate savings (pre-commitment), create mental accounting for future, balance—allow some present enjoyment. People vary in natural ability to delay—work with their tendencies, not against them.'
  },
  {
    id: 'CFP-PSY-B7-024',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Decision-Making Style',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Clients with analytical decision-making styles typically:',
    options: [
      'A) Decide quickly based on gut feeling',
      'B) Want detailed data, time to review options, and logical explanations before deciding',
      'C) Don\'t need explanations',
      'D) Avoid all analysis'
    ],
    correctAnswer: 1,
    explanation: 'Decision styles: Analytical: wants data, details, time, logical sequences. Intuitive: trusts feelings, wants big picture, decides quickly. Directive: decisive, efficiency-focused. Conceptual: creative, risk-tolerant. Match your approach—don\'t give data-lovers bullet points, don\'t overwhelm quick-deciders with analysis. Flexibility is key.'
  },
  {
    id: 'CFP-PSY-B7-025',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Control and Autonomy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The psychological need for control affects clients by:',
    options: [
      'A) Making them always follow advice',
      'B) Leading some to resist recommendations they didn\'t participate in creating, even if objectively good',
      'C) Reducing decision-making quality',
      'D) Eliminating bias'
    ],
    correctAnswer: 1,
    explanation: 'Control/autonomy needs: people want agency in their lives. Top-down advice may be resisted—"not invented here." Involve clients in process: explore options together, present choices rather than mandates, explain reasoning, let them make final calls. They\'ll own decisions they participated in. Recommend, don\'t dictate.'
  }
];
