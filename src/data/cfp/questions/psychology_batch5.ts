/**
 * CFP Psychology Questions - Batch 5
 * Domain 8: Psychology of Financial Planning (8% of exam)
 * 25 additional questions covering behavioral finance and client psychology
 */

import { Question } from '../../../types';

export const CFP_PSYCHOLOGY_BATCH5_QUESTIONS: Question[] = [
  // PSY-1: Client Psychology
  {
    id: 'CFP-PSY-B5-001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Emotional Intelligence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Emotional intelligence in financial planning includes:',
    options: [
      'A) Ignoring client emotions',
      'B) Recognizing, understanding, and managing both your own emotions and clients\' emotions to improve communication and outcomes',
      'C) Always agreeing with clients',
      'D) Avoiding emotional topics'
    ],
    correctAnswer: 1,
    explanation: 'Emotional intelligence (EQ) helps advisers recognize clients\' emotional states, respond appropriately, manage their own reactions, and guide conversations productively. High EQ improves client relationships, builds trust, and helps clients make better decisions during emotional times like market volatility.'
  },
  {
    id: 'CFP-PSY-B5-002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Transference',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'In financial planning, transference occurs when:',
    options: [
      'A) Clients transfer money between accounts',
      'B) Clients unconsciously redirect feelings from past relationships onto their financial planner',
      'C) Advisers transfer clients to colleagues',
      'D) Recommendations are transferred in writing'
    ],
    correctAnswer: 1,
    explanation: 'Transference is a psychological phenomenon where clients project feelings (positive or negative) from other relationships—parents, authority figures—onto their adviser. Recognizing transference helps advisers maintain appropriate boundaries and understand why clients may react unexpectedly to advice or situations.'
  },
  {
    id: 'CFP-PSY-B5-003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Life Transitions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Major life transitions often affect financial planning because:',
    options: [
      'A) They never impact finances',
      'B) Events like divorce, job loss, inheritance, or diagnosis can trigger emotional responses that affect decision-making and planning needs',
      'C) Clients always make good decisions during transitions',
      'D) Transitions are always expected'
    ],
    correctAnswer: 1,
    explanation: 'Life transitions (marriage, divorce, death, retirement, health crisis) create both practical planning needs and emotional impacts. Clients may be overwhelmed, grieving, or anxious—affecting their decision-making. Advisers should recognize transition stages and adjust timing and approach accordingly.'
  },
  // PSY-2: Behavioral Finance
  {
    id: 'CFP-PSY-B5-004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Herding',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Herding behavior in investing describes:',
    options: [
      'A) Long-term investing',
      'B) Following the crowd—buying what others are buying and selling when others sell—regardless of fundamentals',
      'C) Diversification strategies',
      'D) Dollar-cost averaging'
    ],
    correctAnswer: 1,
    explanation: 'Herding leads investors to join market manias (buying at peaks) and panic selling (selling at bottoms). Social proof—others are doing it—overrides independent analysis. It contributes to bubbles and crashes. Advisers help clients resist herding by emphasizing long-term plans and fundamental value.'
  },
  {
    id: 'CFP-PSY-B5-005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Sunk Cost Fallacy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The sunk cost fallacy causes investors to:',
    options: [
      'A) Only invest in bonds',
      'B) Hold losing positions because of the amount already invested, even when selling would be the best decision',
      'C) Ignore past performance',
      'D) Over-diversify'
    ],
    correctAnswer: 1,
    explanation: 'Sunk costs are irrecoverable regardless of future decisions. The fallacy leads to throwing good money after bad—holding losers hoping to "get back to even." Rational decisions should consider only future costs and benefits. Advisers help clients focus on current prospects, not past investment amounts.'
  },
  {
    id: 'CFP-PSY-B5-006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Availability Heuristic',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The availability heuristic affects investing when:',
    options: [
      'A) All information is equally weighted',
      'B) Investors overweight information that is easily recalled—often recent, vivid, or frequently covered events',
      'C) Historical data is prioritized',
      'D) Statistical analysis guides decisions'
    ],
    correctAnswer: 1,
    explanation: 'Availability bias leads to overestimating probabilities of memorable events. A recent market crash feels more likely to repeat. Dramatic company failures loom larger than statistics suggest. Media coverage amplifies this. Advisers counter with historical data and probability analysis.'
  },
  // PSY-3: Communication
  {
    id: 'CFP-PSY-B5-007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Framing Effects',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Framing effects in presenting financial information mean:',
    options: [
      'A) The frame around a presentation',
      'B) How information is presented (gains vs. losses, percentages vs. dollars) affects perception and decisions even when facts are identical',
      'C) Using picture frames in offices',
      'D) Only numerical presentation matters'
    ],
    correctAnswer: 1,
    explanation: 'Framing profoundly affects decisions. "10% chance of loss" feels different than "90% chance of no loss." "$50,000 saved" creates different reactions than "only $50,000." Advisers can use framing ethically to present information clearly, but must not manipulate through misleading frames.'
  },
  {
    id: 'CFP-PSY-B5-008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Motivational Interviewing',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Motivational interviewing techniques help advisers:',
    options: [
      'A) Lecture clients about proper behavior',
      'B) Elicit clients\' own motivations for change through open questions, affirmations, reflections, and summaries',
      'C) Enforce compliance',
      'D) Avoid discussing behavior change'
    ],
    correctAnswer: 1,
    explanation: 'Motivational interviewing uses OARS: Open questions, Affirmations, Reflective listening, and Summary statements. It helps clients articulate their own reasons for change (more powerful than external pressure). Useful for behavior change like saving more or reducing debt—clients convince themselves rather than being told.'
  },
  {
    id: 'CFP-PSY-B5-009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Resistance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When clients show resistance to financial recommendations:',
    options: [
      'A) Push harder to convince them',
      'B) Explore the underlying concerns through questions and listening, as resistance often signals unaddressed issues',
      'C) Ignore the resistance',
      'D) Terminate the relationship'
    ],
    correctAnswer: 1,
    explanation: 'Resistance is information. It may indicate misunderstanding, fear, conflicting values, or past experiences. Rather than pushing through, rolling with resistance—exploring concerns, validating feelings, and addressing underlying issues—builds trust and often resolves objections more effectively.'
  },
  // Additional Topics
  {
    id: 'CFP-PSY-B5-010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Money Scripts',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Money scripts are:',
    options: [
      'A) Written financial plans',
      'B) Unconscious beliefs about money often formed in childhood that influence financial behaviors and attitudes',
      'C) Budgeting spreadsheets',
      'D) Investment instructions'
    ],
    correctAnswer: 1,
    explanation: 'Money scripts are deeply held beliefs (e.g., "Money is evil," "More money will solve all problems," "I don\'t deserve money"). Categories include avoidance, worship, status, and vigilance. Understanding clients\' money scripts helps explain seemingly irrational behaviors and guides productive conversations.'
  },
  {
    id: 'CFP-PSY-B5-011',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Hindsight Bias',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Hindsight bias leads investors to:',
    options: [
      'A) Better predict future events',
      'B) Believe past events were predictable after they occurred, leading to overconfidence in predicting future events',
      'C) Ignore past performance',
      'D) Make better decisions'
    ],
    correctAnswer: 1,
    explanation: 'Hindsight bias ("I knew it all along") distorts memory—past surprises seem obvious in retrospect. This creates overconfidence in predicting future events. Investors who "knew" the 2008 crash was coming believe they can predict the next one. Advisers should document predictions to counter this bias.'
  },
  {
    id: 'CFP-PSY-B5-012',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Building Rapport',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Building rapport with clients includes:',
    options: [
      'A) Immediately discussing portfolio returns',
      'B) Finding common ground, showing genuine interest, using appropriate body language, and establishing trust before diving into technical matters',
      'C) Only discussing finances',
      'D) Maintaining strict formality at all times'
    ],
    correctAnswer: 1,
    explanation: 'Rapport creates trust and openness. Techniques include mirroring body language, finding shared interests, remembering personal details, using active listening, and showing genuine care. Strong rapport improves information gathering, enhances receptiveness to advice, and builds lasting relationships.'
  },
  {
    id: 'CFP-PSY-B5-013',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Financial Anxiety',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When working with financially anxious clients:',
    options: [
      'A) Dismiss their concerns as irrational',
      'B) Acknowledge their feelings, provide clear information, create structure through plans, and avoid information overload',
      'C) Overwhelm them with data to prove they\'re wrong',
      'D) Avoid discussing their concerns'
    ],
    correctAnswer: 1,
    explanation: 'Financial anxiety is common and valid. Acknowledge feelings without judgment. Break complex decisions into smaller steps. Provide clear, simple information. Create plans that offer sense of control. Avoid jargon and overwhelming detail. Regular check-ins can prevent anxiety from escalating.'
  },
  {
    id: 'CFP-PSY-B5-014',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Endowment Effect',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The endowment effect causes people to:',
    options: [
      'A) Value charitable endowments',
      'B) Overvalue things they own compared to identical things they don\'t own',
      'C) Undervalue possessions',
      'D) Trade frequently'
    ],
    correctAnswer: 1,
    explanation: 'People value what they own more than identical items they don\'t own. This leads to holding investments (especially inherited or long-held assets) beyond rational analysis. Clients may resist selling concentrated stock positions or inherited property despite risk reduction benefits.'
  },
  {
    id: 'CFP-PSY-B5-015',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Couples Dynamics',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When working with couples who disagree about financial matters:',
    options: [
      'A) Side with the person who makes more money',
      'B) Facilitate discussion, ensure both voices are heard, identify shared goals, and help find compromise solutions',
      'C) Meet only with one partner',
      'D) Refuse to work with couples'
    ],
    correctAnswer: 1,
    explanation: 'Couples often have different money attitudes, risk tolerances, and goals. Neutral facilitation helps: ensure quieter partners speak, identify common ground, reframe conflict as different perspectives rather than right/wrong. Joint meetings are generally preferred unless circumstances indicate otherwise.'
  },
  {
    id: 'CFP-PSY-B5-016',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Stages of Grief',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When clients experience financial loss or death of a spouse, understanding grief stages:',
    options: [
      'A) Is irrelevant to financial planning',
      'B) Helps advisers recognize that clients may cycle through denial, anger, bargaining, depression, and acceptance—affecting decision-making',
      'C) Means delaying all financial decisions indefinitely',
      'D) Requires professional therapy certification'
    ],
    correctAnswer: 1,
    explanation: 'Grief (whether from death, divorce, job loss, or market losses) affects cognition and decision-making. Stages aren\'t linear—clients may cycle through them. Major decisions are often best delayed during acute grief. Advisers should recognize grief\'s impact while knowing when to refer to mental health professionals.'
  },
  {
    id: 'CFP-PSY-B5-017',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Representativeness',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The representativeness heuristic leads investors to:',
    options: [
      'A) Properly evaluate probabilities',
      'B) Judge probability based on how similar something is to a stereotype, ignoring base rates and sample sizes',
      'C) Focus on diversification',
      'D) Conduct thorough research'
    ],
    correctAnswer: 1,
    explanation: 'Representativeness bias judges likelihood based on stereotypes. A company that "looks like" a successful tech firm may be judged likely to succeed regardless of fundamentals. Small samples that "look random" may be trusted. This leads to pattern-seeking in random data and ignoring statistical reality.'
  },
  {
    id: 'CFP-PSY-B5-018',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Empathy vs Sympathy',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Showing empathy rather than sympathy means:',
    options: [
      'A) Feeling sorry for clients',
      'B) Understanding and sharing the client\'s feelings from their perspective rather than just expressing pity',
      'C) Maintaining distance from clients',
      'D) Solving their problems immediately'
    ],
    correctAnswer: 1,
    explanation: 'Sympathy is feeling sorry for someone; empathy is understanding their experience from their viewpoint. Empathy ("I understand this is frightening") connects; sympathy ("That\'s too bad") can create distance. Empathetic responses validate feelings and build trust without necessarily agreeing.'
  },
  {
    id: 'CFP-PSY-B5-019',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Financial Therapy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Financial therapy integrates:',
    options: [
      'A) Only investment advice',
      'B) Cognitive, emotional, behavioral, and relational aspects of financial well-being with traditional financial planning',
      'C) Only psychological counseling',
      'D) Tax planning only'
    ],
    correctAnswer: 1,
    explanation: 'Financial therapy addresses the emotional and behavioral aspects of money—not just numbers. It recognizes that financial behaviors are influenced by beliefs, emotions, and relationships. CFP® professionals may use financial therapy techniques while knowing when to refer to licensed therapists for clinical issues.'
  },
  {
    id: 'CFP-PSY-B5-020',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Outcome Bias',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Outcome bias causes people to:',
    options: [
      'A) Focus on process quality',
      'B) Judge decisions based on results rather than the quality of the decision-making process at the time',
      'C) Ignore past outcomes',
      'D) Make better decisions'
    ],
    correctAnswer: 1,
    explanation: 'Outcome bias judges decisions by results, not process. A risky decision that happened to work is viewed as "good"; a sound decision with bad luck is "bad." This reinforces poor decision-making and discourages good process. Advisers should evaluate decisions based on information available at the time.'
  },
  {
    id: 'CFP-PSY-B5-021',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Summarizing',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Summarizing during client meetings:',
    options: [
      'A) Is a waste of time',
      'B) Ensures understanding, shows clients they\'ve been heard, and crystallizes key points for decisions',
      'C) Should only happen at year-end',
      'D) Is only for written communication'
    ],
    correctAnswer: 1,
    explanation: 'Summarizing throughout meetings—not just at the end—confirms understanding, demonstrates active listening, and gives clients opportunity to correct misunderstandings. "Let me make sure I understand: you want to retire at 60, maintain your lifestyle, and leave money to grandchildren. Is that right?"'
  },
  {
    id: 'CFP-PSY-B5-022',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Fear and Greed',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Managing clients\' fear and greed during market extremes requires:',
    options: [
      'A) Matching their emotional response',
      'B) Reminding clients of their long-term goals, the role of their plan, and historical perspective while validating their feelings',
      'C) Making trades quickly to reduce anxiety',
      'D) Ignoring their emotions'
    ],
    correctAnswer: 1,
    explanation: 'Fear (market bottoms) and greed (market tops) drive destructive behavior. Acknowledge emotions—they\'re natural. Refocus on the plan created during rational times. Use historical context carefully (not dismissively). Sometimes practical steps (rebalancing, stress testing) provide sense of action without abandoning strategy.'
  },
  {
    id: 'CFP-PSY-B5-023',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Self-Control',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Behavioral interventions to help clients with self-control include:',
    options: [
      'A) Relying solely on willpower',
      'B) Automation (auto-save), commitment devices (penalties for withdrawal), and pre-commitment strategies',
      'C) Punishment for failures',
      'D) Avoiding the topic'
    ],
    correctAnswer: 1,
    explanation: 'Self-control is limited; systems beat willpower. Automation removes decisions (automatic savings). Commitment devices add friction to impulsive actions (early withdrawal penalties, investment policy statements). Mental accounting (separate accounts for goals) can help even if economically irrational.'
  },
  {
    id: 'CFP-PSY-B5-024',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Cultural Competence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cultural competence in financial planning involves:',
    options: [
      'A) Applying one approach to all clients',
      'B) Understanding how cultural backgrounds may influence financial attitudes, family structures, and decision-making styles',
      'C) Avoiding diverse clients',
      'D) Only working within your own culture'
    ],
    correctAnswer: 1,
    explanation: 'Culture affects attitudes toward debt, family financial obligations, risk, gender roles in finances, and comfort with financial discussions. Culturally competent advisers ask about preferences rather than assume, recognize their own cultural biases, and adapt communication and recommendations accordingly.'
  },
  {
    id: 'CFP-PSY-B5-025',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Cognitive Decline',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When working with aging clients, signs of potential cognitive decline that warrant attention include:',
    options: [
      'A) Forgetting one appointment',
      'B) Pattern changes like repeated questions, unusual transactions, confusion about holdings, or personality changes',
      'C) Disagreeing with recommendations',
      'D) Wanting to change investment strategy'
    ],
    correctAnswer: 1,
    explanation: 'Red flags include: repeated identical questions, inability to understand previously-understood concepts, unusual transaction requests, uncharacteristic financial decisions, or new influential third parties. Having a trusted contact on file helps. Advisers must balance client autonomy with protection, documenting concerns and knowing when to escalate.'
  }
];
