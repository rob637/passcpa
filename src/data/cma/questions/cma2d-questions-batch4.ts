/**
 * CMA Part 2, Section D: Risk Management - Questions Batch 4 (Q76-100)
 * Weight: 10% of Part 2 Exam
 * 
 * Focus: Advanced enterprise risk management, financial risk hedging,
 * operational risks, strategic risks, and risk appetite frameworks
 * 
 * Topics covered:
 * - Enterprise risk management (ERM) frameworks
 * - Risk appetite and tolerance
 * - Financial risk hedging strategies
 * - Operational and strategic risks
 * - Business continuity planning
 * - Cyber risk management
 */

import { Question } from '../../../types';

export const CMA2D_QUESTIONS_BATCH4: Question[] = [
  // ==========================================
  // ERM Frameworks
  // ==========================================
  {
    id: 'cma2-d-076',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'ERM',
    subtopic: 'COSO ERM 2017',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The 2017 COSO ERM framework emphasizes risk management in the context of:',
    options: [
      'Only financial reporting risks',
      'Strategy-setting and driving performance',
      'Marketing campaigns only',
      'Individual employee behavior'
    ],
    correctAnswer: 1,
    explanation: 'The 2017 COSO ERM framework explicitly integrates risk management with strategy-setting and performance management, recognizing that risk affects an organization\'s ability to achieve strategic objectives and create value.',
    reference: 'COSO ERM: Integrating with Strategy and Performance (2017)',
  },
  {
    id: 'cma2-d-077',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'ERM',
    subtopic: 'Five Components',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The five components of the 2017 COSO ERM framework are:',
    options: [
      'Plan, Do, Check, Act, Improve',
      'Governance & Culture, Strategy & Objective-Setting, Performance, Review & Revision, Information & Communication',
      'Identify, Assess, Respond, Monitor, Report',
      'People, Process, Technology, Data, Controls'
    ],
    correctAnswer: 1,
    explanation: 'The 2017 COSO ERM has five interrelated components: Governance & Culture, Strategy & Objective-Setting, Performance (has three principles), Review & Revision, and Information, Communication & Reporting.',
    reference: 'COSO ERM Framework Components',
  },
  {
    id: 'cma2-d-078',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'ERM',
    subtopic: 'Board Role',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The board of directors\' role in ERM includes:',
    options: [
      'Day-to-day risk identification only',
      'Providing risk oversight, approving risk appetite, and ensuring management has appropriate risk processes',
      'Executing all risk mitigation activities',
      'Ignoring risk management as it is operational'
    ],
    correctAnswer: 1,
    explanation: 'The board provides oversight of risk management, approves risk appetite and tolerance levels, and monitors that management establishes and maintains effective risk processes. The board doesn\'t manage day-to-day risks.',
    reference: 'COSO ERM; Board Risk Oversight',
  },

  // ==========================================
  // Risk Appetite and Tolerance
  // ==========================================
  {
    id: 'cma2-d-079',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Appetite',
    subtopic: 'Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Risk appetite is best defined as:',
    options: [
      'The amount of loss a company has experienced in the past',
      'The amount and type of risk an organization is willing to accept in pursuit of value',
      'The maximum insurance coverage purchased',
      'The budget for risk management activities'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the broad-based amount and type of risk an organization is willing to accept in pursuit of its objectives and value creation. It reflects strategic choices about risk-taking.',
    reference: 'COSO ERM; Risk Appetite Definition',
  },
  {
    id: 'cma2-d-080',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Appetite',
    subtopic: 'Risk Tolerance',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The relationship between risk appetite and risk tolerance is:',
    options: [
      'They are identical concepts',
      'Risk appetite is broad and strategic; risk tolerance is the acceptable variation around specific objectives',
      'Risk tolerance is set by external regulators only',
      'Risk appetite applies only to financial risks'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the broad level of risk acceptable (strategic). Risk tolerance is the acceptable level of variation in performance related to specific objectives—more operational and measurable.',
    reference: 'COSO ERM; Risk Appetite vs Tolerance',
  },
  {
    id: 'cma2-d-081',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Appetite',
    subtopic: 'Risk Capacity',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Risk capacity differs from risk appetite in that risk capacity represents:',
    options: [
      'The amount of risk desired',
      'The maximum risk an organization can absorb (financial, operational, legal constraints)',
      'Only reputational risk limits',
      'The risk identified by competitors'
    ],
    correctAnswer: 1,
    explanation: 'Risk capacity is the maximum level of risk an organization can bear given its financial resources, capital, operational capabilities, and constraints. Risk appetite should not exceed risk capacity.',
    reference: 'Risk Capacity; Capital Constraints',
  },

  // ==========================================
  // Financial Risk Hedging
  // ==========================================
  {
    id: 'cma2-d-082',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Hedging',
    subtopic: 'Currency Risk',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A US company expects to receive €1,000,000 in 90 days. To hedge this exposure, the company should:',
    options: [
      'Buy euro forward contracts',
      'Sell euro forward contracts',
      'Buy euro call options',
      'Take no action since the dollar may strengthen'
    ],
    correctAnswer: 1,
    explanation: 'The company has a euro receivable (long euro position). To hedge, it should sell euros forward, locking in the exchange rate. This offsets the risk that the euro will depreciate before receipt.',
    reference: 'Currency Hedging; Forward Contracts',
  },
  {
    id: 'cma2-d-083',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Hedging',
    subtopic: 'Interest Rate Risk',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A company with floating-rate debt is concerned about rising interest rates. An appropriate hedge would be:',
    options: [
      'Enter an interest rate swap to pay fixed, receive floating',
      'Enter an interest rate swap to pay floating, receive fixed',
      'Issue more floating-rate debt',
      'Ignore the concern since rates might fall'
    ],
    correctAnswer: 0,
    explanation: 'To hedge floating-rate debt against rising rates, the company enters a swap to pay fixed (at a predictable rate) and receive floating (offsetting the floating payments on its debt). This converts floating exposure to fixed.',
    reference: 'Interest Rate Swaps; Hedge Accounting',
  },
  {
    id: 'cma2-d-084',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Hedging',
    subtopic: 'Commodity Risk',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An airline concerned about rising fuel prices should:',
    options: [
      'Buy crude oil futures or call options',
      'Sell crude oil futures',
      'Short oil company stocks',
      'Only purchase fuel on the spot market'
    ],
    correctAnswer: 0,
    explanation: 'Airlines are short fuel (must buy it). Buying futures or call options locks in purchase prices or creates a ceiling on costs. Selling futures would increase exposure to rising prices—opposite of the intended hedge.',
    reference: 'Commodity Hedging; Fuel Risk Management',
  },
  {
    id: 'cma2-d-085',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Hedging',
    subtopic: 'Natural Hedge',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A natural hedge for currency risk involves:',
    options: [
      'Purchasing forward contracts for every transaction',
      'Matching revenues and costs in the same currency',
      'Borrowing only in the domestic currency',
      'Avoiding all international business'
    ],
    correctAnswer: 1,
    explanation: 'Natural hedges match currency inflows and outflows, reducing net exposure without derivatives. For example, a company with euro sales establishing euro-denominated costs naturally offsets currency risk.',
    reference: 'Natural Hedging Strategies',
  },

  // ==========================================
  // Operational Risk
  // ==========================================
  {
    id: 'cma2-d-086',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Operational risk includes losses arising from:',
    options: [
      'Market price movements only',
      'Inadequate or failed internal processes, people, systems, or external events',
      'Credit defaults by customers',
      'Changes in accounting standards'
    ],
    correctAnswer: 1,
    explanation: 'Operational risk (Basel definition) arises from inadequate/failed internal processes, people, systems, or external events. It includes fraud, errors, system failures, and external disruptions—distinct from market and credit risk.',
    reference: 'Basel II Operational Risk Definition',
  },
  {
    id: 'cma2-d-087',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Key Risk Indicators',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Key Risk Indicators (KRIs) are used to:',
    options: [
      'Replace all other controls',
      'Provide early warning signals of increasing risk exposure',
      'Calculate exact loss amounts',
      'Eliminate all operational risks'
    ],
    correctAnswer: 1,
    explanation: 'KRIs are metrics that provide early warning of emerging or escalating risks (e.g., volume of override transactions, system downtime, staff turnover). They trigger action before losses materialize.',
    reference: 'Key Risk Indicators; Risk Monitoring',
  },
  {
    id: 'cma2-d-088',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Risk Control Self-Assessment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A Risk Control Self-Assessment (RCSA) process involves:',
    options: [
      'External auditors identifying all risks',
      'Management and process owners evaluating their own risks and controls',
      'Customers rating company risk',
      'Ignoring operational risks'
    ],
    correctAnswer: 1,
    explanation: 'RCSA is a process where management and process owners identify, assess, and evaluate risks and control effectiveness in their areas. It promotes ownership and integrates risk management into operations.',
    reference: 'RCSA Process; Operational Risk Management',
  },

  // ==========================================
  // Strategic Risk
  // ==========================================
  {
    id: 'cma2-d-089',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Strategic Risk',
    subtopic: 'Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Strategic risk arises from:',
    options: [
      'Daily transaction processing errors',
      'Adverse business decisions, improper implementation of decisions, or failure to adapt to the business environment',
      'Interest rate fluctuations only',
      'Employee time theft'
    ],
    correctAnswer: 1,
    explanation: 'Strategic risk relates to fundamental business decisions—strategic choices, market positioning, competitive responses—and external factors like disruptive technologies or regulatory changes affecting the business model.',
    reference: 'Strategic Risk Management',
  },
  {
    id: 'cma2-d-090',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Strategic Risk',
    subtopic: 'Disruptive Technology',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When facing potential industry disruption from new technology, an organization should:',
    options: [
      'Ignore the new technology as a fad',
      'Monitor developments, assess strategic implications, and develop adaptive strategies',
      'Immediately abandon current business lines',
      'Wait until competitors respond first'
    ],
    correctAnswer: 1,
    explanation: 'Strategic risk management includes monitoring disruptive forces, assessing implications for business models, and developing proactive or adaptive strategies. Ignoring or overreacting both carry significant risk.',
    reference: 'Strategic Risk; Digital Disruption',
  },

  // ==========================================
  // Business Continuity
  // ==========================================
  {
    id: 'cma2-d-091',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Business Continuity',
    subtopic: 'BCP Components',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Business Continuity Plan (BCP) should include:',
    options: [
      'Marketing strategies only',
      'Recovery procedures, communication plans, and testing protocols',
      'Only technology backup procedures',
      'Employee vacation schedules'
    ],
    correctAnswer: 1,
    explanation: 'BCPs address how to continue critical operations during and after disruptions, including recovery procedures, communication plans, resource requirements, and regular testing. They cover people, processes, and technology.',
    reference: 'Business Continuity Planning; ISO 22301',
  },
  {
    id: 'cma2-d-092',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Business Continuity',
    subtopic: 'RTO and RPO',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Recovery Time Objective (RTO) of 4 hours and Recovery Point Objective (RPO) of 1 hour means:',
    options: [
      'Systems must be restored in 4 hours with maximum 1 hour of data loss',
      'Systems must be restored in 1 hour with 4 hours of data loss acceptable',
      'Backups occur every 4 hours',
      'The system can be down for 4 hours daily'
    ],
    correctAnswer: 0,
    explanation: 'RTO is maximum acceptable downtime (4 hours to restore). RPO is maximum acceptable data loss period (backups must be within 1 hour before failure to limit data loss). These drive backup frequency and recovery capabilities.',
    reference: 'RTO/RPO; Disaster Recovery',
  },
  {
    id: 'cma2-d-093',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Business Continuity',
    subtopic: 'Testing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'BCP testing should:',
    options: [
      'Be performed once at plan creation and never again',
      'Be conducted regularly, including tabletop exercises and full simulations',
      'Only involve IT personnel',
      'Occur only after an actual disaster'
    ],
    correctAnswer: 1,
    explanation: 'Regular testing validates plan effectiveness. Methods range from walkthroughs/tabletop exercises to full simulations. Testing identifies gaps, updates procedures, and ensures staff readiness.',
    reference: 'BCP Testing Best Practices',
  },

  // ==========================================
  // Cyber Risk
  // ==========================================
  {
    id: 'cma2-d-094',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Cyber Risk',
    subtopic: 'Types of Threats',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Ransomware is a type of cyber threat that:',
    options: [
      'Steals processing power for cryptocurrency mining',
      'Encrypts data and demands payment for decryption keys',
      'Floods systems with traffic to cause outages',
      'Intercepts communications between parties'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware encrypts victim\'s data, demanding ransom payment for decryption. This differs from cryptojacking (mining), DDoS attacks (traffic flooding), and man-in-the-middle attacks (interception).',
    reference: 'Cyber Threat Types; Ransomware',
  },
  {
    id: 'cma2-d-095',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Cyber Risk',
    subtopic: 'Financial Impact',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Financial impacts of cyber breaches include all EXCEPT:',
    options: [
      'Regulatory fines and legal costs',
      'Customer notification and remediation costs',
      'Guaranteed increase in stock price',
      'Business interruption losses'
    ],
    correctAnswer: 2,
    explanation: 'Cyber breaches typically cause stock price declines, not increases. Costs include fines, legal fees, notifications, forensics, remediation, and business interruption. Reputational damage further affects value.',
    reference: 'Cyber Breach Costs; Financial Impact Analysis',
  },
  {
    id: 'cma2-d-096',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Cyber Risk',
    subtopic: 'Risk Mitigation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cyber risk transfer mechanisms include:',
    options: [
      'Employee security training',
      'Firewall installation',
      'Cyber liability insurance',
      'Access control policies'
    ],
    correctAnswer: 2,
    explanation: 'Cyber insurance transfers financial risk of breaches to insurers. Training, firewalls, and access controls are risk mitigation (reduction) measures. Transfer doesn\'t prevent breaches but shifts financial impact.',
    reference: 'Cyber Insurance; Risk Transfer',
  },

  // ==========================================
  // Risk Quantification
  // ==========================================
  {
    id: 'cma2-d-097',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Quantification',
    subtopic: 'Expected Loss',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'If a risk has a 20% probability of occurring with a potential loss of $500,000, the expected loss is:',
    options: [
      '$500,000',
      '$100,000',
      '$400,000',
      '$600,000'
    ],
    correctAnswer: 1,
    explanation: 'Expected loss = Probability × Impact = 20% × $500,000 = $100,000. This represents the probability-weighted average loss used for risk prioritization and reserve calculations.',
    reference: 'Expected Value; Risk Quantification',
  },
  {
    id: 'cma2-d-098',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Quantification',
    subtopic: 'Heat Map',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A risk heat map plots risks based on:',
    options: [
      'Time and location',
      'Likelihood and impact',
      'Cost and benefit',
      'Revenue and expense'
    ],
    correctAnswer: 1,
    explanation: 'Heat maps position risks on a matrix with likelihood (probability) on one axis and impact (severity) on the other. Colors indicate overall risk level, helping prioritize response efforts.',
    reference: 'Risk Heat Maps; Risk Prioritization',
  },
  {
    id: 'cma2-d-099',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Quantification',
    subtopic: 'Scenario Analysis',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Scenario analysis in risk management involves:',
    options: [
      'Calculating only the most likely outcome',
      'Evaluating potential outcomes under various plausible future states',
      'Using only historical data',
      'Ignoring extreme but possible events'
    ],
    correctAnswer: 1,
    explanation: 'Scenario analysis develops multiple plausible futures (optimistic, pessimistic, most likely, stressed) to understand how outcomes vary under different conditions. It complements probabilistic analysis.',
    reference: 'Scenario Analysis; Stress Testing',
  },
  {
    id: 'cma2-d-100',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Reporting',
    subtopic: 'Risk Dashboards',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An effective risk dashboard for senior management should:',
    options: [
      'List every identified risk in detail',
      'Highlight key risks, trends, and metrics requiring attention',
      'Include only positive risk developments',
      'Be updated only annually'
    ],
    correctAnswer: 1,
    explanation: 'Executive risk dashboards should be concise, highlighting key risks and KRIs, showing trends, and focusing on items requiring management attention. Detailed risk registers support the dashboard.',
    reference: 'Risk Dashboards; Executive Reporting',
  },
];
