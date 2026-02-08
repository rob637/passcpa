/**
 * CFP Psychology Questions - Batch 3
 * Domain 8: Psychology of Financial Planning (8% of exam)
 * 25 additional questions covering advanced psychology topics
 */

import { Question } from '../../../types';

export const CFP_PSYCHOLOGY_BATCH3_QUESTIONS: Question[] = [
  // PSY-1: Client Psychology
  {
    id: 'CFP-PSY-B3-001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Money Scripts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A client who believes "money is bad" or "rich people are greedy" is likely exhibiting which money script category?',
    options: [
      'A) Money avoidance',
      'B) Money worship',
      'C) Money status',
      'D) Money vigilance'
    ],
    correctAnswer: 0,
    explanation: 'Money avoidance scripts include beliefs that wealthy people are corrupt, that one does not deserve money, or that money is bad. These unconscious beliefs often lead to self-sabotaging financial behaviors like giving away money, underearning, or avoiding financial tasks.'
  },
  {
    id: 'CFP-PSY-B3-002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Financial Trauma',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When a client experienced significant financial trauma (bankruptcy, foreclosure), a CFP® professional should:',
    options: [
      'A) Avoid discussing the past and focus only on future planning',
      'B) Acknowledge the impact, build trust gradually, and consider referral to a financial therapist if needed',
      'C) Immediately implement aggressive investment strategies to recover losses',
      'D) Minimize the significance to help the client move forward'
    ],
    correctAnswer: 1,
    explanation: 'Financial trauma affects decision-making and trust. CFP® professionals should acknowledge the experience, allow space for processing, build trust incrementally, and recognize when clients may benefit from financial therapy or counseling. Dismissing or avoiding trauma history can undermine the planning relationship.'
  },
  {
    id: 'CFP-PSY-B3-003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Financial Socialization',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Financial socialization refers to:',
    options: [
      'A) Learning about investments through social media',
      'B) The process by which individuals develop financial attitudes, knowledge, and behaviors through family and social influences',
      'C) Networking with other financial professionals',
      'D) Teaching clients to discuss finances publicly'
    ],
    correctAnswer: 1,
    explanation: 'Financial socialization describes how families, peers, and cultural environments shape money attitudes and behaviors from childhood. Understanding a client\'s financial upbringing helps explain current beliefs and behaviors, enabling more effective planning and communication.'
  },
  // PSY-2: Behavioral Biases
  {
    id: 'CFP-PSY-B3-004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Overconfidence Bias',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client who consistently overestimates investment returns and underestimates risks is demonstrating:',
    options: [
      'A) Recency bias',
      'B) Overconfidence bias',
      'C) Status quo bias',
      'D) Availability heuristic'
    ],
    correctAnswer: 1,
    explanation: 'Overconfidence bias leads investors to overestimate their knowledge, underestimate risks, trade excessively, and hold underdiversified portfolios. It\'s especially common after periods of investment success. CFP® professionals can address it by presenting realistic projections and discussing historical market volatility.'
  },
  {
    id: 'CFP-PSY-B3-005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Framing Effect',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client more willing to accept a surgery with "90% survival rate" than one with "10% mortality rate" is exhibiting:',
    options: [
      'A) Confirmation bias',
      'B) Endowment effect',
      'C) Framing effect',
      'D) Mental accounting'
    ],
    correctAnswer: 2,
    explanation: 'The framing effect shows that how information is presented affects decisions, even when the underlying facts are identical. In financial planning, framing affects risk tolerance questionnaires, product presentations, and retirement projections. CFP® professionals should present information in multiple frames for balanced understanding.'
  },
  {
    id: 'CFP-PSY-B3-006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Hindsight Bias',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'After a market crash, a client claims "I knew it was going to happen." This is an example of:',
    options: [
      'A) Recency bias',
      'B) Hindsight bias',
      'C) Confirmation bias',
      'D) Anchoring'
    ],
    correctAnswer: 1,
    explanation: 'Hindsight bias is the tendency to believe, after an event occurs, that one would have predicted or expected it. It leads to overconfidence in predicting future events and unfair criticism of past decisions that were reasonable given available information. CFP® professionals should document rationale for decisions.'
  },
  {
    id: 'CFP-PSY-B3-007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Status Quo Bias',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client refuses to rebalance their portfolio despite significant drift from their target allocation. This reflects:',
    options: [
      'A) Loss aversion only',
      'B) Status quo bias and potentially loss aversion',
      'C) Overconfidence',
      'D) Anchoring bias'
    ],
    correctAnswer: 1,
    explanation: 'Status quo bias is the preference for the current state over change, even when change would be beneficial. Loss aversion often reinforces it (fear of losing current positions). CFP® professionals can address this by framing rebalancing as maintaining the original strategy rather than making changes.'
  },
  // PSY-3: Communication Techniques
  {
    id: 'CFP-PSY-B3-008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Active Listening',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Active listening in client meetings includes all of the following EXCEPT:',
    options: [
      'A) Maintaining appropriate eye contact',
      'B) Summarizing and reflecting what the client said',
      'C) Formulating your response while the client is speaking',
      'D) Asking clarifying questions'
    ],
    correctAnswer: 2,
    explanation: 'Active listening requires full attention to the speaker without simultaneously preparing a response. It includes nonverbal engagement (eye contact, nodding), verbal acknowledgment, summarizing to confirm understanding, and asking clarifying questions. Planning your response while the client speaks prevents full comprehension.'
  },
  {
    id: 'CFP-PSY-B3-009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Motivational Interviewing',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'In motivational interviewing, "rolling with resistance" means:',
    options: [
      'A) Arguing with the client until they agree',
      'B) Accepting and exploring client ambivalence without confrontation',
      'C) Giving up on changing client behavior',
      'D) Referring resistant clients to other advisors'
    ],
    correctAnswer: 1,
    explanation: 'Rolling with resistance is a core motivational interviewing principle. Instead of confronting or arguing, the practitioner accepts ambivalence, avoids direct opposition, and uses reflective listening to explore the client\'s perspective. This reduces defensiveness and often leads to self-generated arguments for change.'
  },
  {
    id: 'CFP-PSY-B3-010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Open-Ended Questions',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Which question is most effective for exploring a client\'s retirement goals?',
    options: [
      'A) "Do you want to retire at 65?"',
      'B) "What does an ideal retirement look like to you?"',
      'C) "Have you thought about retirement?"',
      'D) "Is $2 million enough for retirement?"'
    ],
    correctAnswer: 1,
    explanation: 'Open-ended questions invite elaboration and reveal values, goals, and concerns. "What does an ideal retirement look like to you?" prompts detailed responses about lifestyle, activities, and priorities. Closed questions (A, C, D) yield yes/no answers and limit discovery of meaningful information.'
  },
  // PSY-4: Counseling Concepts
  {
    id: 'CFP-PSY-B3-011',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Counseling',
    subtopic: 'Transtheoretical Model',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A client who acknowledges spending too much but hasn\'t decided to change is in which stage of the Transtheoretical Model?',
    options: [
      'A) Precontemplation',
      'B) Contemplation',
      'C) Preparation',
      'D) Action'
    ],
    correctAnswer: 1,
    explanation: 'The Contemplation stage involves awareness of a problem and considering change but not yet committed. Precontemplation has no awareness; Preparation involves planning specific changes; Action is implementing changes. Matching interventions to stages improves effectiveness—contemplators need to explore pros and cons of change.'
  },
  {
    id: 'CFP-PSY-B3-012',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Counseling',
    subtopic: 'Scope of Practice',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a client\'s financial issues appear to stem from clinical depression, a CFP® professional should:',
    options: [
      'A) Provide psychological counseling to address the root cause',
      'B) Continue financial planning while suggesting the client consider consulting a mental health professional',
      'C) Terminate the engagement until the client receives treatment',
      'D) Prescribe behavioral interventions for the depression'
    ],
    correctAnswer: 1,
    explanation: 'CFP® professionals should stay within their scope of practice—financial planning, not mental health treatment. When recognizing that underlying issues require professional help, gently suggest appropriate resources while continuing to support the financial planning process. Referral networks are valuable.'
  },
  {
    id: 'CFP-PSY-B3-013',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Counseling',
    subtopic: 'Empathy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Cognitive empathy in financial planning involves:',
    options: [
      'A) Feeling the same emotions as the client',
      'B) Understanding the client\'s perspective and thoughts without necessarily sharing their feelings',
      'C) Agreeing with all client decisions',
      'D) Avoiding emotional discussions'
    ],
    correctAnswer: 1,
    explanation: 'Cognitive empathy (perspective-taking) means understanding how a client thinks and perceives situations. Affective empathy involves sharing feelings. Both are valuable in planning, but cognitive empathy allows maintaining professional objectivity while demonstrating understanding. It enables appropriate responses without emotional overwhelm.'
  },
  // PSY-1: More Client Psychology
  {
    id: 'CFP-PSY-B3-014',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Financial Enabling',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Financial enabling occurs when:',
    options: [
      'A) A client invests aggressively',
      'B) One family member provides excessive financial support that perpetuates irresponsible behavior in another',
      'C) A client contributes to retirement accounts',
      'D) Parents teach children about budgeting'
    ],
    correctAnswer: 1,
    explanation: 'Financial enabling involves providing money or financial support that prevents natural consequences and perpetuates unhealthy financial behaviors (similar to enabling in addiction contexts). CFP® professionals may observe this in estate planning or family financial discussions and should help clients understand these dynamics.'
  },
  {
    id: 'CFP-PSY-B3-015',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Life Transitions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'During significant life transitions (divorce, death of spouse), clients often:',
    options: [
      'A) Make their best financial decisions due to heightened focus',
      'B) Should be advised to make major financial changes immediately',
      'C) May experience impaired decision-making and benefit from delaying major decisions',
      'D) Require no special consideration from their CFP® professional'
    ],
    correctAnswer: 2,
    explanation: 'Major life transitions often impair decision-making capacity due to stress, grief, or emotional overwhelm. CFP® professionals should recognize this, recommend delaying major irreversible decisions when possible, provide extra support, and revisit plans once the client has stabilized emotionally.'
  },
  {
    id: 'CFP-PSY-B3-016',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Client Psychology',
    subtopic: 'Couples Dynamics',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When working with couples who have conflicting financial priorities, a CFP® professional should:',
    options: [
      'A) Side with the more financially knowledgeable partner',
      'B) Refuse to work with the couple until they agree',
      'C) Facilitate dialogue to understand both perspectives and find common ground',
      'D) Work with each partner separately without joint meetings'
    ],
    correctAnswer: 2,
    explanation: 'CFP® professionals should remain neutral, help each partner articulate their values and concerns, and facilitate productive dialogue toward shared goals. Understanding the \"why\" behind money positions often reveals common underlying values even when surface preferences differ.'
  },
  // PSY-2: More Behavioral Finance
  {
    id: 'CFP-PSY-B3-017',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Representativeness Heuristic',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A client assumes a well-managed company is a good investment without considering valuation. This reflects:',
    options: [
      'A) Availability heuristic',
      'B) Representativeness heuristic',
      'C) Anchoring',
      'D) Confirmation bias'
    ],
    correctAnswer: 1,
    explanation: 'The representativeness heuristic judges probability by similarity to a prototype. A \"good company\" is assumed to be a \"good stock,\" ignoring that price relative to value matters. This leads to investing in \"story stocks\" without adequate analysis of whether the price already reflects the story.'
  },
  {
    id: 'CFP-PSY-B3-018',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Sunk Cost Fallacy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client refuses to sell a losing investment because "I\'ve already lost so much." This is:',
    options: [
      'A) Smart tax planning',
      'B) The sunk cost fallacy',
      'C) Dollar-cost averaging',
      'D) Value investing'
    ],
    correctAnswer: 1,
    explanation: 'The sunk cost fallacy leads to decisions based on past irrecoverable costs rather than future value. Past losses are irrelevant to whether holding the investment makes sense going forward. CFP® professionals should help clients evaluate current holdings based on future prospects, not purchase price.'
  },
  {
    id: 'CFP-PSY-B3-019',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Nudges',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Auto-enrollment in 401(k) plans is an example of:',
    options: [
      'A) Mandatory savings requirements',
      'B) A nudge that leverages status quo bias to improve outcomes',
      'C) A government regulation',
      'D) Financial penalty for non-participation'
    ],
    correctAnswer: 1,
    explanation: 'Nudges are choice architecture elements that guide behavior while preserving choice. Auto-enrollment uses status quo bias (inertia) positively—people tend to stay enrolled. Combined with auto-escalation, nudges have dramatically improved retirement savings without mandates. CFP® professionals can apply nudge principles in advice.'
  },
  // PSY-3: More Communication
  {
    id: 'CFP-PSY-B3-020',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Cultural Competence',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Cultural competence in financial planning requires:',
    options: [
      'A) Treating all clients exactly the same regardless of background',
      'B) Understanding how cultural background may influence financial values, family dynamics, and communication preferences',
      'C) Assuming clients from specific cultures have identical money beliefs',
      'D) Avoiding discussions of cultural differences'
    ],
    correctAnswer: 1,
    explanation: 'Cultural competence means understanding how culture shapes financial attitudes, family roles, risk perceptions, and communication styles—then adapting appropriately without stereotyping. It requires curiosity, humility, and individualized attention to each client\'s unique background and preferences.'
  },
  {
    id: 'CFP-PSY-B3-021',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Non-Verbal Communication',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Crossed arms and lack of eye contact from a client during a recommendation may indicate:',
    options: [
      'A) Complete agreement with the proposal',
      'B) Enthusiasm about proceeding',
      'C) Possible discomfort, disagreement, or resistance',
      'D) That the client is cold'
    ],
    correctAnswer: 2,
    explanation: 'Non-verbal cues like crossed arms, avoided eye contact, or leaning away often signal discomfort or disagreement. CFP® professionals should notice these cues and address them: \"I notice you seem hesitant—what concerns do you have?\" Non-verbal communication often reveals feelings words don\'t express.'
  },
  {
    id: 'CFP-PSY-B3-022',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Communication',
    subtopic: 'Establishing Rapport',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Building rapport with a new client is best accomplished by:',
    options: [
      'A) Immediately presenting investment recommendations',
      'B) Showing genuine interest in their life, listening actively, and finding common ground',
      'C) Demonstrating technical expertise extensively',
      'D) Focusing exclusively on their financial data'
    ],
    correctAnswer: 1,
    explanation: 'Rapport requires genuine connection beyond transactional interactions. Showing interest in the client as a person, listening attentively, finding shared experiences, and demonstrating warmth builds trust. Technical expertise matters but is insufficient for strong client relationships.'
  },
  // PSY-4: More Counseling
  {
    id: 'CFP-PSY-B3-023',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Counseling',
    subtopic: 'Collaborative Goal-Setting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Effective financial goal-setting should be:',
    options: [
      'A) Determined solely by the CFP® professional based on best practices',
      'B) Collaborative, specific, measurable, and tied to client values',
      'C) Vague to allow flexibility',
      'D) Focused exclusively on investment returns'
    ],
    correctAnswer: 1,
    explanation: 'Effective goals are SMART (Specific, Measurable, Achievable, Relevant, Time-bound) and collaboratively developed. Goals tied to client values ("Why is this important?") create stronger motivation than generic targets. The CFP® professional guides the process but the client must own the goals.'
  },
  {
    id: 'CFP-PSY-B3-024',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Counseling',
    subtopic: 'Resistance to Advice',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a client consistently resists sound financial advice, the CFP® professional should first:',
    options: [
      'A) Repeat the advice more forcefully',
      'B) Explore the underlying reasons for resistance through open-ended questions',
      'C) Document the refusal and move on',
      'D) Terminate the relationship'
    ],
    correctAnswer: 1,
    explanation: 'Resistance often signals unexplored concerns, values conflicts, or past experiences. Before escalating or abandoning, explore the \"why\" with curiosity: \"Help me understand what concerns you about this approach.\" Understanding resistance often reveals paths forward that honor both sound planning and client concerns.'
  },
  {
    id: 'CFP-PSY-B3-025',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Counseling',
    subtopic: 'Accountability Structures',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To help clients follow through on financial commitments, a CFP® professional can:',
    options: [
      'A) Threaten to terminate the relationship',
      'B) Establish regular check-ins, automate actions, and celebrate progress',
      'C) Ignore non-compliance',
      'D) Make decisions for the client without consent'
    ],
    correctAnswer: 1,
    explanation: 'Accountability structures improve follow-through: scheduled reviews, automated savings/investments, progress tracking, and acknowledging achievements. Breaking large goals into smaller milestones creates momentum. The CFP® professional serves as an accountability partner while respecting client autonomy.'
  }
];
