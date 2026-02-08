/**
 * CFP Psychology of Financial Planning Questions - Batch 2
 * Domain 8: Psychology of Financial Planning (7% of exam)
 * 25 additional questions covering behavioral finance, biases, and family dynamics
 */

import { Question } from '../../../types';

export const CFP_PSYCHOLOGY_BATCH2_QUESTIONS: Question[] = [
  // PSY-2: Behavioral Finance Biases
  {
    id: 'CFP-PSY-B2-001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Loss Aversion',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client refuses to sell a stock at a 20% loss even though fundamentals have deteriorated, saying "I can\'t lock in this loss." This behavior demonstrates:',
    options: [
      'A) Overconfidence bias',
      'B) Loss aversion',
      'C) Recency bias',
      'D) Confirmation bias'
    ],
    correctAnswer: 1,
    explanation: 'Loss aversion describes the tendency for losses to feel psychologically twice as powerful as equivalent gains. Clients experiencing loss aversion often hold losing positions hoping to "get back to even" rather than rationally evaluating current prospects.'
  },
  {
    id: 'CFP-PSY-B2-002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Anchoring',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client says, "I bought this house for $400,000, so I won\'t sell for less than that even though values have dropped." This illustrates:',
    options: [
      'A) Anchoring bias',
      'B) Endowment effect',
      'C) Mental accounting',
      'D) Status quo bias'
    ],
    correctAnswer: 0,
    explanation: 'Anchoring occurs when decisions are unduly influenced by an initial reference point. The purchase price serves as an anchor that affects the client\'s selling decision, even when current market conditions suggest a different value.'
  },
  {
    id: 'CFP-PSY-B2-003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Overconfidence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client consistently believes their stock picks will outperform the market despite a track record of underperformance. This demonstrates:',
    options: [
      'A) Optimism bias',
      'B) Overconfidence bias',
      'C) Illusion of control',
      'D) Self-attribution bias'
    ],
    correctAnswer: 1,
    explanation: 'Overconfidence bias leads people to overestimate their knowledge, skills, or the precision of their predictions. This client believes in their abilities despite evidence to the contrary, which can lead to excessive trading and poor diversification.'
  },
  {
    id: 'CFP-PSY-B2-004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Recency Bias',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'After a strong year in the stock market, a client wants to move their bond allocation entirely into stocks. This is likely influenced by:',
    options: [
      'A) Recency bias',
      'B) Representativeness bias',
      'C) Hindsight bias',
      'D) Availability bias'
    ],
    correctAnswer: 0,
    explanation: 'Recency bias occurs when recent events are given disproportionate weight in decision-making. The client is extrapolating recent strong returns into future expectations, ignoring longer-term patterns and the value of diversification.'
  },
  {
    id: 'CFP-PSY-B2-005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Confirmation Bias',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client only reads news articles that support their bullish view on a particular sector, ignoring contrary evidence. This demonstrates:',
    options: [
      'A) Selection bias',
      'B) Confirmation bias',
      'C) Availability heuristic',
      'D) Familiarity bias'
    ],
    correctAnswer: 1,
    explanation: 'Confirmation bias leads people to seek, interpret, and remember information that confirms their existing beliefs while ignoring contradictory evidence. This can result in poorly diversified portfolios and failure to recognize investment risks.'
  },
  {
    id: 'CFP-PSY-B2-006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Mental Accounting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client refuses to use a $50,000 "vacation fund" savings account to pay off 18% credit card debt, saying "that money is for vacations." This is an example of:',
    options: [
      'A) Endowment effect',
      'B) Framing effect',
      'C) Mental accounting',
      'D) Sunk cost fallacy'
    ],
    correctAnswer: 2,
    explanation: 'Mental accounting involves treating money differently based on subjective criteria like source or intended use, rather than recognizing all money is fungible. Financially, paying off 18% debt would provide a guaranteed "return" higher than typical savings.'
  },
  {
    id: 'CFP-PSY-B2-007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Status Quo Bias',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Status quo bias is the tendency to:',
    options: [
      'A) Take excessive risks to maintain current wealth',
      'B) Prefer the current state of affairs over change',
      'C) Follow what the majority of investors are doing',
      'D) Hold onto winning investments too long'
    ],
    correctAnswer: 1,
    explanation: 'Status quo bias describes the preference for the current state of affairs. Even when change would be beneficial, people tend to stick with existing choices. This can manifest as failure to rebalance, update beneficiaries, or change inappropriate investment allocations.'
  },
  {
    id: 'CFP-PSY-B2-008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Hindsight Bias',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'After a market crash, a client says, "I knew this was going to happen." This is an example of:',
    options: [
      'A) Foresight bias',
      'B) Hindsight bias',
      'C) Recency bias',
      'D) Confirmation bias'
    ],
    correctAnswer: 1,
    explanation: 'Hindsight bias (also called the "I knew it all along" effect) is the tendency after an event to believe you predicted it beforehand. This can lead to overconfidence in future predictions and difficulty learning from past decisions.'
  },
  // PSY-3: Family Dynamics
  {
    id: 'CFP-PSY-B2-009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Family Dynamics',
    subtopic: 'Money Scripts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A client who grew up in poverty hoards cash excessively despite significant wealth. This behavior is most influenced by:',
    options: [
      'A) Current economic conditions',
      'B) Money scripts formed in childhood',
      'C) Professional financial advice',
      'D) Tax avoidance strategies'
    ],
    correctAnswer: 1,
    explanation: 'Money scripts are unconscious beliefs about money formed in childhood, often from family experiences. Growing up in scarcity can create scripts around safety and hoarding that persist even when circumstances change dramatically.'
  },
  {
    id: 'CFP-PSY-B2-010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Family Dynamics',
    subtopic: 'Spousal Differences',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In a couple, one spouse is a "spender" and one is a "saver." As their planner, the BEST approach is to:',
    options: [
      'A) Side with the saver since saving is financially optimal',
      'B) Recommend the spender be excluded from financial decisions',
      'C) Facilitate a compromise that addresses both perspectives',
      'D) Let them resolve the conflict before meeting again'
    ],
    correctAnswer: 2,
    explanation: 'A skilled planner acts as a neutral facilitator, helping couples find common ground. Both spending and saving have value—the plan should incorporate both immediate enjoyment and future security in a way both partners can accept.'
  },
  {
    id: 'CFP-PSY-B2-011',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Family Dynamics',
    subtopic: 'Intergenerational Planning',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When advising on wealth transfer to adult children, which approach is MOST consistent with good practice?',
    options: [
      'A) Recommend equal distributions to avoid family conflict',
      'B) Explore the family\'s values and dynamics regarding inheritance',
      'C) Focus only on tax minimization strategies',
      'D) Discourage disclosure of estate plans to beneficiaries'
    ],
    correctAnswer: 1,
    explanation: 'Effective intergenerational planning requires understanding family dynamics, values, and the parents\' goals. Equal distributions aren\'t always optimal (different needs, contributions, or family circumstances), and communication about plans often reduces rather than increases conflict.'
  },
  {
    id: 'CFP-PSY-B2-012',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Family Dynamics',
    subtopic: 'Life Transitions',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A client recently divorced is eager to make major financial changes immediately. The planner should:',
    options: [
      'A) Help implement changes quickly to match client energy',
      'B) Recommend waiting and avoiding major decisions during emotional transitions',
      'C) Suggest only making changes that feel emotionally satisfying',
      'D) Focus only on required legal changes from the divorce'
    ],
    correctAnswer: 1,
    explanation: 'Major life transitions like divorce are emotionally charged periods when decision-making can be impaired. Best practice is to make only necessary changes initially and wait for emotional stability before major voluntary financial decisions.'
  },
  // PSY-4: Client Psychology & Counseling
  {
    id: 'CFP-PSY-B2-013',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Counseling',
    subtopic: 'Recognizing Limits',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client displays signs of clinical depression affecting their financial decisions. The CFP® professional should:',
    options: [
      'A) Provide counseling to address the depression',
      'B) Ignore the issue and focus on financial matters',
      'C) Suggest the client speak with a mental health professional',
      'D) Postpone all planning until the client "feels better"'
    ],
    correctAnswer: 2,
    explanation: 'CFP® professionals should recognize when issues exceed their expertise. Clinical depression requires mental health professionals. The planner should sensitively suggest professional help while continuing to support the client\'s financial needs within their scope.'
  },
  {
    id: 'CFP-PSY-B2-014',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Counseling',
    subtopic: 'Motivational Interviewing',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A client knows they should save more for retirement but hasn\'t changed behavior. Using motivational interviewing, the planner should:',
    options: [
      'A) Present alarming statistics about retirement shortfalls',
      'B) Set up automatic savings without client involvement',
      'C) Explore the client\'s own reasons for wanting change',
      'D) Provide detailed savings calculations and deadlines'
    ],
    correctAnswer: 2,
    explanation: 'Motivational interviewing focuses on drawing out the client\'s own motivation rather than imposing external pressure. Exploring their reasons for change is more likely to create lasting behavior change than fear tactics or imposed solutions.'
  },
  {
    id: 'CFP-PSY-B2-015',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Counseling',
    subtopic: 'Resistance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a client resists a recommendation, the BEST initial approach is to:',
    options: [
      'A) Repeat the recommendation more forcefully',
      'B) Move on to a different topic',
      'C) Explore the client\'s concerns and objections',
      'D) Provide additional data and statistics'
    ],
    correctAnswer: 2,
    explanation: 'Resistance often signals that the planner hasn\'t fully understood the client\'s situation or concerns. Exploring objections shows respect, builds trust, and often reveals important information that can lead to better recommendations.'
  },
  {
    id: 'CFP-PSY-B2-016',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-4',
    topic: 'Client Counseling',
    subtopic: 'Goal Setting',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Effective financial goals should be SMART, which stands for:',
    options: [
      'A) Simple, Measured, Attainable, Realistic, Timely',
      'B) Specific, Measurable, Achievable, Relevant, Time-bound',
      'C) Strategic, Meaningful, Actionable, Reasonable, Tracked',
      'D) Specific, Monetary, Agreed, Recorded, Targeted'
    ],
    correctAnswer: 1,
    explanation: 'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. This framework helps transform vague aspirations into concrete, actionable objectives that clients can work toward and measure progress against.'
  },
  // PSY-1: Additional Communication
  {
    id: 'CFP-PSY-B2-017',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Communication',
    subtopic: 'Nonverbal Communication',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A client\'s words say they\'re comfortable with risk, but their body language shows tension. The planner should:',
    options: [
      'A) Accept the verbal response and proceed',
      'B) Note the inconsistency and explore further',
      'C) Trust body language over words entirely',
      'D) Recommend the most conservative option automatically'
    ],
    correctAnswer: 1,
    explanation: 'When verbal and nonverbal communication conflict, it warrants exploration. The planner should gently probe to understand the discrepancy: "I notice some hesitation—tell me more about your feelings on this." This ensures recommendations match the client\'s true comfort level.'
  },
  {
    id: 'CFP-PSY-B2-018',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Communication',
    subtopic: 'Building Trust',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which factor is MOST important in building client trust?',
    options: [
      'A) Impressive office decor and credentials displayed',
      'B) Promising high investment returns',
      'C) Consistent follow-through on commitments',
      'D) Using complex financial terminology'
    ],
    correctAnswer: 2,
    explanation: 'Trust is built primarily through reliability and follow-through. When planners do what they say they will do, clients develop confidence in the relationship. Promising high returns is unethical, and complexity/decor are superficial.'
  },
  {
    id: 'CFP-PSY-B2-019',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Communication',
    subtopic: 'Empathy',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client becomes emotional discussing their deceased spouse\'s life insurance. The BEST response is:',
    options: [
      'A) Change the subject to something less emotional',
      'B) Acknowledge the difficulty and allow a moment',
      'C) Hand them documents and continue the meeting',
      'D) Reschedule the meeting for another day'
    ],
    correctAnswer: 1,
    explanation: 'Empathetic response acknowledges the client\'s emotion without rushing past it or abandoning the conversation. A brief pause and acknowledgment ("This is understandably difficult") validates their feelings while maintaining a professional relationship.'
  },
  {
    id: 'CFP-PSY-B2-020',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Communication',
    subtopic: 'DISC Adaptation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client with an "Influence" (I) communication style would respond BEST to:',
    options: [
      'A) Detailed spreadsheets and calculations',
      'B) Quick bullet points and bottom-line results',
      'C) Relationship-focused discussion with enthusiasm',
      'D) Written documentation with extensive footnotes'
    ],
    correctAnswer: 2,
    explanation: 'Influence-style clients value relationships, enthusiasm, and personal connection. They respond best to planners who show genuine interest in them as people, are optimistic, and make financial planning an engaging rather than dry experience.'
  },
  // PSY-2: Additional Biases
  {
    id: 'CFP-PSY-B2-021',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Endowment Effect',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client values their concentrated stock position at $500,000 but wouldn\'t pay $500,000 to acquire the same position. This demonstrates:',
    options: [
      'A) Familiarity bias',
      'B) Endowment effect',
      'C) Anchoring bias',
      'D) Disposition effect'
    ],
    correctAnswer: 1,
    explanation: 'The endowment effect causes people to value things they own more than equivalent things they don\'t own. This makes clients reluctant to sell or diversify concentrated positions, even when financially advisable.'
  },
  {
    id: 'CFP-PSY-B2-022',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Herding',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A client wants to invest heavily in a trending stock because "everyone is buying it." This is an example of:',
    options: [
      'A) Social proof bias / Herding',
      'B) Availability bias',
      'C) Representativeness',
      'D) Bandwagon effect and Herding'
    ],
    correctAnswer: 0,
    explanation: 'Herding (or social proof bias) is the tendency to follow what others are doing, assuming the crowd has information or knowledge. This can lead to buying overvalued assets or panic selling during downturns.'
  },
  {
    id: 'CFP-PSY-B2-023',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Nudges',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In behavioral finance, a "nudge" refers to:',
    options: [
      'A) Forcefully directing client decisions',
      'B) Subtle changes in choice presentation that influence behavior',
      'C) Providing incentives for desired behavior',
      'D) Restricting client options to only optimal choices'
    ],
    correctAnswer: 1,
    explanation: 'A nudge is a design change that predictably influences behavior without restricting choices or significantly changing incentives. Examples include auto-enrollment in 401(k)s or making the default option the desired behavior.'
  },
  {
    id: 'CFP-PSY-B2-024',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Framing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Presenting a surgery as having a "95% survival rate" vs. a "5% mortality rate" is an example of:',
    options: [
      'A) Anchoring',
      'B) Loss aversion',
      'C) Framing effect',
      'D) Availability bias'
    ],
    correctAnswer: 2,
    explanation: 'The framing effect shows that how information is presented affects decisions, even when the underlying facts are identical. In finance, framing returns as gains vs. avoiding losses can significantly affect client choices.'
  },
  {
    id: 'CFP-PSY-B2-025',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Behavioral Finance',
    subtopic: 'Prospect Theory',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'According to prospect theory, which statement is TRUE about how people evaluate gains and losses?',
    options: [
      'A) Gains and losses are evaluated equally',
      'B) Losses loom larger than equivalent gains',
      'C) People are risk-seeking in the domain of gains',
      'D) The value function is linear across all amounts'
    ],
    correctAnswer: 1,
    explanation: 'Prospect theory, developed by Kahneman and Tversky, found that losses are felt approximately twice as strongly as equivalent gains. This asymmetry explains loss aversion and why people often make decisions that seem irrational from traditional economic perspectives.'
  }
];
