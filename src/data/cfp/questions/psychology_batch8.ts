/**
 * CFP Psychology Questions - Batch 8
 * Domain 8: Psychology of Financial Planning (8% of exam)
 * 25 additional questions
 */

import { Question } from '../../../types';

export const CFP_PSYCHOLOGY_BATCH8_QUESTIONS: Question[] = [
  // PSY-1: Behavioral Finance
  {
    id: 'CFP-PSY-B8-001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Disposition Effect',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The disposition effect causes investors to:',
    options: [
      'A) Hold all investments equally',
      'B) Sell winners too early and hold losers too long, due to loss aversion and desire to realize gains',
      'C) Never sell any investment',
      'D) Only buy index funds'
    ],
    correctAnswer: 1,
    explanation: 'Disposition effect: combination of loss aversion and mental accounting. Sell winners quickly (lock in gains, feel good), hold losers (avoid realizing loss, hope for recovery). Leads to: suboptimal tax management (should do opposite for tax efficiency), poor portfolio performance. Awareness helps—reframe: future potential matters more than purchase price.'
  },
  {
    id: 'CFP-PSY-B8-002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Familiarity Bias',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Familiarity bias leads investors to:',
    options: [
      'A) Diversify globally',
      'B) Overweight investments they know or recognize, such as employer stock or local companies',
      'C) Avoid all stocks',
      'D) Only use financial advisors'
    ],
    correctAnswer: 1,
    explanation: 'Familiarity bias: comfort with known creates false sense of safety. Examples: overconcentration in employer stock, home country bias, investing in brands you like. Problem: familiarity ≠ good investment, reduces diversification. Counter: systematic diversification approach, education about unseen risks in familiar holdings. Particularly dangerous with employer stock (job + investment risk).'
  },
  {
    id: 'CFP-PSY-B8-003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Regret Aversion',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Regret aversion may cause investors to:',
    options: [
      'A) Take excessive risks',
      'B) Avoid decisions or choose conventional options to minimize potential future regret',
      'C) Always buy growth stocks',
      'D) Never rebalance'
    ],
    correctAnswer: 1,
    explanation: 'Regret aversion: fear of making wrong decision leads to: inaction (not deciding feels safer), conventional choices (at least "everyone else did too"), herding. Can prevent good decisions. Mitigation: document reasoning at decision time, accept uncertainty is inherent, focus on process not just outcomes. Regret from inaction often worse long-term (opportunity cost).'
  },
  // PSY-2: Client Communication
  {
    id: 'CFP-PSY-B8-004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Clarifying Questions',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Open-ended clarifying questions in client meetings:',
    options: [
      'A) Should be avoided',
      'B) Help uncover underlying goals, values, and concerns that closed questions might miss',
      'C) Waste time',
      'D) Are used only in initial meetings'
    ],
    correctAnswer: 1,
    explanation: 'Open-ended questions: "What\'s most important about money to you?", "Tell me more about that concern." Encourage fuller responses, reveal values, uncover hidden concerns. Follow up with probing questions. Closed questions (yes/no) have their place for specifics, but open questions build understanding. Balance both. Active listening follows—reflect back, confirm understanding.'
  },
  {
    id: 'CFP-PSY-B8-005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Nonverbal Communication',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Nonverbal communication in client meetings includes:',
    options: [
      'A) Only spoken words',
      'B) Eye contact, body language, tone, facial expressions, and physical positioning',
      'C) Written documents only',
      'D) Phone conversations only'
    ],
    correctAnswer: 1,
    explanation: 'Nonverbal cues: often communicate more than words. Watch for: crossed arms (defensiveness), lack of eye contact (discomfort), leaning in (engagement), tone changes (anxiety). Your nonverbal matters too: attentive posture, appropriate eye contact, matching energy when appropriate. Silence can be powerful—allow processing time. Virtual meetings: still visible—camera on, engaged appearance.'
  },
  {
    id: 'CFP-PSY-B8-006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Delivering Bad News',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When delivering difficult financial news to clients:',
    options: [
      'A) Sugarcoat or avoid the topic',
      'B) Be direct but compassionate, allow emotional response, and focus on actionable next steps',
      'C) Blame external factors',
      'D) Delegate to others'
    ],
    correctAnswer: 1,
    explanation: 'Difficult conversations: be direct (don\'t bury bad news), compassionate (acknowledge difficulty), and constructive (what now?). Allow emotional response—don\'t rush to "fix" feelings. Then guide to actions: what can be done, options, support available. Examples: "You\'ll need to work longer," "This loss significantly impacts plans." Preparation helps—anticipate reactions, have information ready.'
  },
  // PSY-3: Financial Psychology
  {
    id: 'CFP-PSY-B8-007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Denial',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Financial denial behaviors include:',
    options: [
      'A) Checking accounts daily',
      'B) Avoiding account statements, not opening bills, or refusing to discuss financial problems',
      'C) Aggressive saving',
      'D) Detailed budgeting'
    ],
    correctAnswer: 1,
    explanation: 'Financial denial: avoidance of financial reality. Signs: unopened statements, refusal to discuss money, "I don\'t want to know," avoiding planning. Defense mechanism against anxiety. Approach: gentle, non-judgmental, understand underlying fear. Small steps—maybe just opening statements together. May need to address anxiety before effective planning possible. Patience required.'
  },
  {
    id: 'CFP-PSY-B8-008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Compulsive Spending',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Compulsive spending disorder is characterized by:',
    options: [
      'A) Careful budgeting',
      'B) Uncontrollable urge to spend as emotional relief, often leading to serious financial consequences',
      'C) Excessive saving',
      'D) Investment addiction'
    ],
    correctAnswer: 1,
    explanation: 'Compulsive spending: shopping/spending as emotional regulation. Temporary relief followed by guilt. Progressive—needs more to achieve same relief. Consequences: debt, relationship problems, inability to meet goals. Related to: anxiety, depression, trauma. Referral to mental health professional appropriate. Financial planning alone won\'t solve—address root cause. Support and non-judgment important.'
  },
  {
    id: 'CFP-PSY-B8-009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Gender and Money',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Research on gender differences in financial behavior generally shows:',
    options: [
      'A) No differences exist',
      'B) Tendencies toward different risk preferences and confidence levels, though individual variation is large',
      'C) Men always take more risk',
      'D) Women are always more conservative'
    ],
    correctAnswer: 1,
    explanation: 'Gender research: studies show average differences (women slightly more risk-averse, men often overconfident) but huge individual variation. Stereotyping harmful—assess each client individually. Cultural conditioning affects attitudes. Couples may have different risk tolerances. Financial planning for women: often longer lifespan, career breaks, pay gaps to consider. Address individual, not generalizations.'
  },
  // PSY-4: Client Assessment
  {
    id: 'CFP-PSY-B8-010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Composite Risk Profile',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A comprehensive risk assessment should include:',
    options: [
      'A) Only a questionnaire score',
      'B) Risk tolerance, risk capacity, risk perception, and risk composure evaluated together',
      'C) Past investment returns',
      'D) Only age-based factors'
    ],
    correctAnswer: 1,
    explanation: 'Multi-dimensional risk: Tolerance (emotional comfort with risk), Capacity (financial ability to take risk), Perception (how client views specific risks), Composure (behavior under stress). May conflict—high tolerance but low capacity requires conservative approach despite preferences. Questionnaires capture some; conversation reveals more. Regular reassessment as circumstances change.'
  },
  {
    id: 'CFP-PSY-B8-011',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Financial Knowledge',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Assessing client financial knowledge helps:',
    options: [
      'A) Only with investment selection',
      'B) Tailor communication complexity and identify educational needs for informed decision-making',
      'C) Determine fees charged',
      'D) Avoid detailed explanations'
    ],
    correctAnswer: 1,
    explanation: 'Financial literacy assessment: understand client\'s baseline. Determines: explanation detail needed, concepts to clarify, areas for education. Don\'t assume—wealthy clients may have little knowledge; modest clients may be sophisticated. Adjust communication style. Identify knowledge gaps that could affect decisions. Education may be needed before complex recommendations. Meet client where they are.'
  },
  {
    id: 'CFP-PSY-B8-012',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Decision-Making Style',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Understanding a client\'s decision-making style helps the planner:',
    options: [
      'A) Make decisions for them',
      'B) Present information and options in a way that aligns with how the client processes and makes choices',
      'C) Avoid client involvement',
      'D) Rush decisions'
    ],
    correctAnswer: 1,
    explanation: 'Decision styles vary: analytical (wants data, spreadsheets), intuitive (gut feel, trust), consultative (values others\' input), decisive (quick, action-oriented). Neither good nor bad—adapt approach. Analytical: provide detailed analysis. Intuitive: focus on big picture, values. Consultative: involve family, offer references. Decisive: get to recommendations quickly. Flexibility improves client experience.'
  },
  // Additional Topics
  {
    id: 'CFP-PSY-B8-013',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Cognitive Dissonance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cognitive dissonance in investing occurs when:',
    options: [
      'A) Markets are volatile',
      'B) Investors\' beliefs conflict with evidence or actions, causing discomfort they try to resolve',
      'C) Advisors disagree',
      'D) Portfolios are diversified'
    ],
    correctAnswer: 1,
    explanation: 'Cognitive dissonance: discomfort when beliefs and reality conflict. Financial examples: "I\'m a smart investor" but performance is poor → blame market, ignore contrary info, sell to "prove" it was bad. Resolution: change belief, change behavior, or rationalize. Help clients: acknowledge discomfort, provide perspective, avoid "I told you so." Awareness helps clients accept uncomfortable truths.'
  },
  {
    id: 'CFP-PSY-B8-014',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Building Rapport',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Building rapport with new clients involves:',
    options: [
      'A) Immediately discussing investments',
      'B) Finding common ground, showing genuine interest, and creating a comfortable, trusting environment',
      'C) Formal distance',
      'D) Focus on credentials only'
    ],
    correctAnswer: 1,
    explanation: 'Rapport building: foundation for effective relationship. Techniques: small talk (genuine, not forced), find common interests, remember personal details, show curiosity about their life. Environment matters: comfortable setting, unrushed time. First impressions important. Trust builds over time but starts with feeling understood and respected. Listen more than talk initially.'
  },
  {
    id: 'CFP-PSY-B8-015',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Generational Wealth',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Psychological challenges of inherited wealth often include:',
    options: [
      'A) No psychological impact',
      'B) Guilt, identity questions, difficulty building self-worth, and family relationship complications',
      'C) Only tax concerns',
      'D) Automatic happiness'
    ],
    correctAnswer: 1,
    explanation: 'Inherited wealth psychology: guilt (didn\'t earn it), identity (who am I without earning?), purpose (what\'s my contribution?), relationship issues (am I loved for me or money?), family dynamics (expectations, control). Wealth doesn\'t guarantee happiness—may complicate it. Non-financial support may be needed. Address with sensitivity. Help find purpose, not just manage money.'
  },
  {
    id: 'CFP-PSY-B8-016',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Family Systems',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Understanding family systems in financial planning includes recognizing:',
    options: [
      'A) Only legal family members',
      'B) Family dynamics, roles, communication patterns, and how money functions within the family structure',
      'C) Birth order only',
      'D) Income levels'
    ],
    correctAnswer: 1,
    explanation: 'Family systems: money has meaning beyond dollars. Roles: who earns, who decides, who worries. Patterns passed down: messages about money from parents. Power dynamics: money as control. Communication: open or secret about finances? Extended family obligations. Understanding helps: address couple conflicts, prepare for wealth transfer, involve appropriate family members, recognize tensions.'
  },
  {
    id: 'CFP-PSY-B8-017',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Choice Overload',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Choice overload or "paralysis by analysis" can be reduced by:',
    options: [
      'A) Providing more options',
      'B) Curating options, providing clear recommendations, and simplifying decision frameworks',
      'C) Avoiding all recommendations',
      'D) Delaying decisions indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Choice overload: too many options cause decision paralysis. Solutions: curate to reasonable number (3-5 options), clear recommendation with rationale, decision frameworks (criteria to evaluate), staged decisions (don\'t decide everything at once). Value of advice: expertise to filter options. Some clients want more choices, most want guidance. Gauge preference and adjust.'
  },
  {
    id: 'CFP-PSY-B8-018',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Managing Expectations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Effective expectation management with clients includes:',
    options: [
      'A) Promising high returns',
      'B) Discussing realistic outcomes, range of possibilities, and factors outside anyone\'s control',
      'C) Guaranteeing results',
      'D) Avoiding discussion of risk'
    ],
    correctAnswer: 1,
    explanation: 'Expectation management: alignment between client hopes and realistic outcomes. Discuss: historical ranges (not promises), factors affecting outcomes, what can be controlled (saving, costs) vs. can\'t (markets, longevity). Set expectations early—harder to adjust later. Regular check-ins: still aligned? Monte Carlo can show probability ranges. Underpromise, overdeliver. Honest about uncertainty.'
  },
  {
    id: 'CFP-PSY-B8-019',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Life Transitions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Major life transitions often require financial planners to:',
    options: [
      'A) Focus only on numbers',
      'B) Address emotional aspects alongside financial decisions, as major changes affect both',
      'C) Delay all planning',
      'D) Only handle paperwork'
    ],
    correctAnswer: 1,
    explanation: 'Life transitions: divorce, death, job loss, retirement—financial and emotional components inseparable. Decisions made in emotional distress often regretted. Approach: acknowledge emotions, don\'t rush major decisions if possible, provide stability, revisit when emotions settle. Be resource: counselors, support groups. Plan for transitions: estate planning, emergency funds reduce crisis severity.'
  },
  {
    id: 'CFP-PSY-B8-020',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Values Exploration',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Exploring client values helps planners:',
    options: [
      'A) Only with investment selection',
      'B) Develop recommendations aligned with what matters most to the client, increasing satisfaction and adherence',
      'C) Reduce planning time',
      'D) Increase product sales'
    ],
    correctAnswer: 1,
    explanation: 'Values exploration: what matters most? Family, security, experiences, legacy, freedom, helping others? Goals stem from values. Understanding values: recommendations resonate, trade-offs make sense, motivation stronger. Techniques: values cards, life planning questions, "why is that important" (dig deeper). Values-aligned planning: more meaningful to client, better implementation.'
  },
  {
    id: 'CFP-PSY-B8-021',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Hyperbolic Discounting',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Hyperbolic discounting describes the tendency to:',
    options: [
      'A) Prefer consistent returns',
      'B) Disproportionately prefer immediate rewards over larger future rewards, declining steeply for near-term and shallowly for distant',
      'C) Avoid all discounts',
      'D) Calculate time value correctly'
    ],
    correctAnswer: 1,
    explanation: 'Hyperbolic discounting: irrational time preferences. Would rather have $100 today than $105 tomorrow, but $100 in year vs. $105 in year+day—prefer waiting. Steeper discounting for near-term. Explains: difficulty saving, procrastination, preferring immediate gratification. Counter: automate savings (remove choice), make future concrete (visualize retirement), commitment devices.'
  },
  {
    id: 'CFP-PSY-B8-022',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Client Communication',
    subtopic: 'Collaborative Planning',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Collaborative financial planning involves:',
    options: [
      'A) Planner making all decisions',
      'B) Client and planner working together, with client input valued and planner guiding with expertise',
      'C) Client doing all the work',
      'D) Avoiding client involvement'
    ],
    correctAnswer: 1,
    explanation: 'Collaboration: client brings knowledge of themselves (goals, values, concerns), planner brings technical expertise. Together: develop appropriate plan. Not advisor-directed (planner decides all) or client-directed (client knows best). Partnership. Client engagement improves: understanding, buy-in, implementation. Planner role: guide, educate, recommend. Client role: share, decide, implement.'
  },
  {
    id: 'CFP-PSY-B8-023',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Financial Psychology',
    subtopic: 'Financial Abuse',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Signs of potential financial abuse that planners should recognize include:',
    options: [
      'A) Normal money discussions',
      'B) One partner controlling all finances, unexplained account changes, fear of discussing money, or pressure for transactions',
      'C) Joint accounts',
      'D) Regular savings'
    ],
    correctAnswer: 1,
    explanation: 'Financial abuse signs: one partner controls all money, unexplained withdrawals/changes, client fearful or deferential about finances, sudden demand for cash, isolation from financial information, accompanied to all meetings. Planner response: find way to meet individually if possible, know resources (domestic violence hotlines), document concerns, may have reporting obligations depending on situation.'
  },
  {
    id: 'CFP-PSY-B8-024',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Assessment',
    subtopic: 'Goals Beyond Money',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Financial planning should recognize that clients\' ultimate goals are typically:',
    options: [
      'A) Money accumulation',
      'B) Life outcomes like security, experiences, relationships, and well-being that money helps achieve',
      'C) Tax minimization',
      'D) Investment returns'
    ],
    correctAnswer: 1,
    explanation: 'Life goals, not money goals: money is means to ends. Real goals: time freedom, experiences, security, helping family, leaving legacy. Understanding this: planning is more meaningful, trade-offs clearer, motivation stronger. Ask: "What would you do with unlimited money?" reveals true goals. Then work backward to what\'s needed. Money in service of life, not life in service of money.'
  },
  {
    id: 'CFP-PSY-B8-025',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Behavioral Finance',
    subtopic: 'Narrative Fallacy',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The narrative fallacy in investing leads to:',
    options: [
      'A) Better analysis',
      'B) Creating compelling stories to explain market movements or investment outcomes that may be random or more complex',
      'C) Avoiding all news',
      'D) Indexing exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Narrative fallacy: humans crave explanations, create stories. Financial media does this: "Stocks fell today because..." (often after the fact, post-hoc rationalization). Leads to: overconfidence in explanations, hindsight bias, false patterns. Reality often: randomness, complex multicausal, unknowable. Counter: healthy skepticism of narratives, focus on long-term fundamentals, respect uncertainty.'
  }
];
