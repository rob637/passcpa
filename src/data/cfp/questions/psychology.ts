/**
 * CFP Psychology of Financial Planning Questions
 * Domain 8: Psychology of Financial Planning (7% of exam)
 * 25 questions covering behavioral finance, client communication, and counseling
 */

import { Question } from '../../../types';

export const CFP_PSYCHOLOGY_QUESTIONS: Question[] = [
  // PSY-1: Client Communication (Questions 1-8)
  {
    id: 'CFP-PSY-001',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Active Listening',
    subtopic: 'Reflecting',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A client says, "I\'m worried about outliving my money in retirement." Which response demonstrates the BEST use of active listening?',
    options: [
      'A) "Don\'t worry, I\'ll build a plan to prevent that."',
      'B) "You\'re concernedabout whether your savings will last throughout retirement."',
      'C) "How much do you have saved for retirement?"',
      'D) "Most clients feel that way at first."'
    ],
    correctAnswer: 1,
    explanation: 'Response B reflects the client\'s concern back to them, demonstrating understanding before moving forward. This builds trust and ensures you understand the client correctly. A dismisses the concern, C jumps to data gathering without acknowledging emotion, and D minimizes the feeling.'
  },
  {
    id: 'CFP-PSY-002',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Communication Styles',
    subtopic: 'DISC Model',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client frequently asks for detailed documentation, wants to see the calculations, and takes time before making decisions. This client likely has which DISC communication style?',
    options: [
      'A) Dominance',
      'B) Influence',
      'C) Steadiness',
      'D) Conscientiousness'
    ],
    correctAnswer: 3,
    explanation: 'The Conscientiousness style is characterized by analytical thinking, desire for accuracy and detail, and methodical decision-making. These clients want data, calculations, and time to analyze. Dominance wants bottom-line results quickly, Influence prefers relationship and enthusiasm, and Steadiness values stability and support.'
  },
  {
    id: 'CFP-PSY-003',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Questioning Techniques',
    subtopic: 'Open vs. Closed Questions',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which of the following is an example of an open-ended question?',
    options: [
      'A) "Do you have a will?"',
      'B) "What does financial success mean to you?"',
      'C) "Is your home paid off?"',
      'D) "Are you contributing to your 401(k)?"'
    ],
    correctAnswer: 1,
    explanation: 'Open-ended questions cannot be answered with a simple yes/no and encourage clients to elaborate. "What does financial success mean to you?" invites exploration of values and goals. The other options are closed-ended questions useful for data gathering but not for exploring feelings or values.'
  },
  {
    id: 'CFP-PSY-004',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Communication Styles',
    subtopic: 'Style Adaptation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Your client with a Dominant (D) communication style asks, "What\'s the bottom line?" How should you adapt your communication?',
    options: [
      'A) Provide extensive background before answering',
      'B) Share stories about similar clients first',
      'C) Be direct, concise, and focus on results',
      'D) Emphasize the supportive relationship'
    ],
    correctAnswer: 2,
    explanation: 'Dominant-style clients value efficiency, directness, and results. They want the bottom line without extensive preamble. Adapt by being concise, focusing on outcomes, and avoiding excessive detail. They can ask for more detail if needed—start with the conclusion.'
  },
  {
    id: 'CFP-PSY-005',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Active Listening',
    subtopic: 'Clarifying',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client says, "I want to be comfortable in retirement." What is the MOST effective next step?',
    options: [
      'A) Begin creating a retirement income projection',
      'B) Ask, "Can you tell me more about what comfortable means to you?"',
      'C) Recommend a specific retirement savings amount',
      'D) Explain typical retirement income needs'
    ],
    correctAnswer: 1,
    explanation: 'The term "comfortable" is subjective and means different things to different clients. Before making any recommendations, clarify what the client means. This exploration builds understanding and ensures recommendations align with the client\'s actual vision, not your assumptions.'
  },
  {
    id: 'CFP-PSY-006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Nonverbal Communication',
    subtopic: 'Body Language',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'During a client meeting, you notice the client has crossed arms, is looking away, and seems tense. What should you do?',
    options: [
      'A) Continue presenting your recommendations',
      'B) Acknowledge you notice something might be off and ask if they have concerns',
      'C) Speak louder to regain their attention',
      'D) End the meeting early to avoid conflict'
    ],
    correctAnswer: 1,
    explanation: 'Closed body language often signals discomfort, disagreement, or confusion. The best approach is to gently acknowledge this and invite the client to share what\'s on their mind. This demonstrates emotional intelligence and prevents moving forward without addressing underlying concerns.'
  },
  {
    id: 'CFP-PSY-007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Questioning Techniques',
    subtopic: 'Scaling Questions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which question type is MOST useful for understanding a client\'s priority among competing goals?',
    options: [
      'A) Open-ended questions',
      'B) Closed-ended questions',
      'C) Scaling questions',
      'D) Leading questions'
    ],
    correctAnswer: 2,
    explanation: 'Scaling questions (e.g., "On a scale of 1-10, how important is X?") help quantify priorities and make trade-offs visible. This is especially useful when clients have multiple goals that may compete for resources. Open-ended questions explore but don\'t quantify; closed-ended gather facts.'
  },
  {
    id: 'CFP-PSY-008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    topic: 'Active Listening',
    subtopic: 'Summarizing',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'After gathering extensive information from a client, what active listening technique should you use before moving to analysis?',
    options: [
      'A) Reflecting—mirror the last statement',
      'B) Summarizing—recap the key points you\'ve heard',
      'C) Validating—acknowledge their feelings',
      'D) Pausing—allow silence for reflection'
    ],
    correctAnswer: 1,
    explanation: 'Summarizing helps ensure you\'ve captured the important points correctly and gives the client an opportunity to correct any misunderstandings. It signals respect for what they\'ve shared and transitions naturally from discovery to analysis.'
  },
  
  // PSY-2: Behavioral Finance (Questions 9-18)
  {
    id: 'CFP-PSY-009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Anchoring',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client refuses to sell a stock because "I need to get back to my purchase price of $50." The stock is now $35 and fundamentals suggest further decline. This illustrates:',
    options: [
      'A) Loss aversion',
      'B) Anchoring bias',
      'C) Confirmation bias',
      'D) Endowment effect'
    ],
    correctAnswer: 1,
    explanation: 'Anchoring bias occurs when a client fixates on an irrelevant reference point—in this case, the purchase price. The purchase price is economically irrelevant to the future prospects of the stock, but the client is "anchored" to it. While loss aversion may also be present, the specific fixation on the purchase price is anchoring.'
  },
  {
    id: 'CFP-PSY-010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Confirmation Bias',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A client who believes cryptocurrency is the future only reads positive news about digital assets and dismisses any critical analysis. Which bias is most evident?',
    options: [
      'A) Overconfidence bias',
      'B) Availability heuristic',
      'C) Confirmation bias',
      'D) Herding'
    ],
    correctAnswer: 2,
    explanation: 'Confirmation bias leads people to seek information that confirms existing beliefs while ignoring contradictory evidence. This client actively selects information sources that support their view and dismisses opposing views without analysis.'
  },
  {
    id: 'CFP-PSY-011',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Emotional Biases',
    subtopic: 'Loss Aversion',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'According to Prospect Theory, how do most people weight losses compared to gains of equal magnitude?',
    options: [
      'A) Losses and gains are weighted equally',
      'B) Gains are weighted approximately twice as much as losses',
      'C) Losses are weighted approximately twice as much as gains',
      'D) The weighting depends on the person\'s net worth'
    ],
    correctAnswer: 2,
    explanation: 'Prospect Theory (Kahneman & Tversky) demonstrates that losses loom larger than gains—typically about 2:1. A $1,000 loss causes approximately twice the emotional pain as the pleasure from a $1,000 gain. This explains why clients often make irrational decisions to avoid losses.'
  },
  {
    id: 'CFP-PSY-012',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Recency Bias',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'After a strong stock market year, a conservative client now wants an aggressive all-equity portfolio. This change most likely reflects:',
    options: [
      'A) Improved risk tolerance',
      'B) Recency bias',
      'C) Mental accounting',
      'D) Hindsight bias'
    ],
    correctAnswer: 1,
    explanation: 'Recency bias leads clients to extrapolate recent trends indefinitely into the future. After a strong market year, clients may expect continued gains and want more equity exposure. The client\'s fundamental risk tolerance hasn\'t changed—they\'re being influenced by recent performance.'
  },
  {
    id: 'CFP-PSY-013',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Emotional Biases',
    subtopic: 'Herding',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Multiple clients calling to buy a hot stock because "everyone is talking about it" is an example of:',
    options: [
      'A) Confirmation bias',
      'B) Herding',
      'C) Overconfidence',
      'D) Framing effect'
    ],
    correctAnswer: 1,
    explanation: 'Herding occurs when investors follow the crowd rather than making independent analysis. When "everyone" is buying or talking about something, the herd instinct kicks in. Herding often peaks near market tops (euphoria) and bottoms (panic).'
  },
  {
    id: 'CFP-PSY-014',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Emotional Biases',
    subtopic: 'Endowment Effect',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client inherited their parents\' concentrated stock position and refuses to diversify, saying it\'s "worth more than the market thinks." This reflects:',
    options: [
      'A) Status quo bias only',
      'B) Endowment effect',
      'C) Anchoring bias',
      'D) Mental accounting'
    ],
    correctAnswer: 1,
    explanation: 'The endowment effect causes people to value what they own more highly than its objective market value. This is especially strong with inherited or sentimental assets. The client assigns emotional value beyond market value because they possess it.'
  },
  {
    id: 'CFP-PSY-015',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive Biases',
    subtopic: 'Mental Accounting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client carries $10,000 in credit card debt at 22% interest while keeping $10,000 in a savings account "for emergencies." This is an example of:',
    options: [
      'A) Loss aversion',
      'B) Mental accounting',
      'C) Status quo bias',
      'D) Availability heuristic'
    ],
    correctAnswer: 1,
    explanation: 'Mental accounting causes people to treat money differently based on its source or intended purpose, even when fungibility suggests otherwise. The savings is mentally "earmarked" for emergencies despite the mathematical logic of paying down high-interest debt.'
  },
  {
    id: 'CFP-PSY-016',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Bias Mitigation',
    subtopic: 'Systematic Approaches',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Which strategy is MOST effective for mitigating the impact of multiple behavioral biases in investment decision-making?',
    options: [
      'A) Educating clients about each bias',
      'B) Implementing a written Investment Policy Statement with automatic rebalancing',
      'C) Showing long-term market returns',
      'D) Increasing meeting frequency'
    ],
    correctAnswer: 1,
    explanation: 'A written IPS with automatic rebalancing removes emotion from decisions. It addresses loss aversion (predetermined rules), recency bias (stick to allocation), and status quo bias (automatic rebalancing). Systematic approaches work better than relying on willpower to overcome biases.'
  },
  {
    id: 'CFP-PSY-017',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Emotional Biases',
    subtopic: 'Regret Aversion',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A client refuses to invest despite having adequate emergency funds and long-term time horizon, saying "What if the market crashes right after I invest?" This illustrates:',
    options: [
      'A) Loss aversion',
      'B) Regret aversion',
      'C) Status quo bias',
      'D) Hindsight bias'
    ],
    correctAnswer: 1,
    explanation: 'Regret aversion causes people to avoid decisions that might cause regret later. The client fears the regret of investing "at the wrong time" more than they value the potential gains. This often leads to paralysis and missed opportunities.'
  },
  {
    id: 'CFP-PSY-018',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    topic: 'Cognitive vs Emotional',
    subtopic: 'Bias Types',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which approach is MOST appropriate for addressing emotional biases versus cognitive biases?',
    options: [
      'A) Both types respond equally well to education',
      'B) Cognitive biases: educate; Emotional biases: accommodate',
      'C) Emotional biases: educate; Cognitive biases: accommodate',
      'D) Both require accommodation'
    ],
    correctAnswer: 1,
    explanation: 'Cognitive biases stem from faulty reasoning and can often be corrected through education and awareness. Emotional biases are deeply rooted in feelings and are harder to eliminate—often the best approach is to accommodate them in the planning process rather than trying to eliminate them.'
  },
  
  // PSY-3: Money Scripts and Counseling (Questions 19-25)
  {
    id: 'CFP-PSY-019',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Money Scripts',
    subtopic: 'Money Avoidance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A high-earning client consistently fails to save adequately and says, "Money isn\'t important to me—there are more important things in life." Which money script does this suggest?',
    options: [
      'A) Money Worship',
      'B) Money Status',
      'C) Money Avoidance',
      'D) Money Vigilance'
    ],
    correctAnswer: 2,
    explanation: 'Money Avoidance is characterized by beliefs that money is bad or unimportant, leading to under-earning, not paying attention to finances, or giving money away excessively. Despite high earnings, this client\'s avoidant behavior undermines wealth building.'
  },
  {
    id: 'CFP-PSY-020',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Money Scripts',
    subtopic: 'Money Vigilance',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which money script is MOST associated with financial success but may cause anxiety about spending?',
    options: [
      'A) Money Avoidance',
      'B) Money Worship',
      'C) Money Status',
      'D) Money Vigilance'
    ],
    correctAnswer: 3,
    explanation: 'Money Vigilance involves alertness, concern about finances, and discretion about money. While it\'s associated with positive financial behaviors like saving, it can also cause excessive anxiety about spending, difficulty enjoying money, and reluctance to discuss finances even when helpful.'
  },
  {
    id: 'CFP-PSY-021',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Crisis Counseling',
    subtopic: 'Death of Spouse',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A recently widowed client wants to immediately sell the family home and move across the country. What is the BEST initial advice?',
    options: [
      'A) Help facilitate the quick sale to reduce stress',
      'B) Recommend waiting 6-12 months before major financial decisions',
      'C) Advise against moving because of potential regret',
      'D) Proceed if the client seems certain'
    ],
    correctAnswer: 1,
    explanation: 'After the death of a spouse, clients should generally avoid major financial decisions for 6-12 months. Grief impairs decision-making, and decisions made in acute grief are often regretted later. The planner should ensure liquidity for immediate needs while encouraging delay of major, irreversible decisions.'
  },
  {
    id: 'CFP-PSY-022',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Crisis Counseling',
    subtopic: 'Professional Referrals',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client displays persistent symptoms of depression affecting their ability to engage in financial planning. What is the MOST appropriate action?',
    options: [
      'A) Provide supportive counseling during planning sessions',
      'B) Refer the client to a mental health professional',
      'C) Simplify the planning process to reduce stress',
      'D) Postpone all planning until symptoms resolve on their own'
    ],
    correctAnswer: 1,
    explanation: 'CFP® professionals should recognize the limits of their competence. Signs of depression or other mental health issues warrant referral to appropriate professionals. While planners can provide emotional support, they are not qualified to provide mental health treatment.'
  },
  {
    id: 'CFP-PSY-023',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Money Scripts',
    subtopic: 'Money Status',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A client insists on leasing luxury cars and buying designer items despite inadequate retirement savings, saying "People judge you by appearances." This suggests:',
    options: [
      'A) Money Avoidance',
      'B) Money Worship',
      'C) Money Status',
      'D) Money Vigilance'
    ],
    correctAnswer: 2,
    explanation: 'Money Status associates self-worth with net worth and external displays of wealth. These clients often overspend on luxury items to project an image, sometimes at the expense of building actual wealth. They believe others evaluate them based on possessions.'
  },
  {
    id: 'CFP-PSY-024',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Stages of Change',
    subtopic: 'Transtheoretical Model',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A client acknowledges they should save more but hasn\'t taken any action. According to the Transtheoretical Model, which stage of change are they in?',
    options: [
      'A) Precontemplation',
      'B) Contemplation',
      'C) Preparation',
      'D) Action'
    ],
    correctAnswer: 1,
    explanation: 'In the Contemplation stage, individuals are aware they should change and may be weighing pros and cons, but haven\'t committed to action. They acknowledge the problem but haven\'t moved to preparation. The planner should explore ambivalence without pushing prematurely.'
  },
  {
    id: 'CFP-PSY-025',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-3',
    topic: 'Crisis Counseling',
    subtopic: 'Divorce',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When advising a client going through divorce, which document is required to divide qualified retirement plan assets?',
    options: [
      'A) Divorce decree',
      'B) Qualified Domestic Relations Order (QDRO)',
      'C) Beneficiary change form',
      'D) Property settlement agreement'
    ],
    correctAnswer: 1,
    explanation: 'A Qualified Domestic Relations Order (QDRO) is required to divide qualified retirement plan assets (like 401(k)s) in divorce. The divorce decree alone is not sufficient—the QDRO must be approved by the plan administrator. IRAs can be divided through a transfer incident to divorce without a QDRO.'
  }
];

export default CFP_PSYCHOLOGY_QUESTIONS;
