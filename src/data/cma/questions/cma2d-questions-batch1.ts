/**
 * CMA Part 2, Section D: Risk Management - Questions Batch 1 (Q1-25)
 * Weight: 10% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-D: Risk Management
 * 
 * Topics covered:
 * - Enterprise Risk Management
 * - Risk Identification and Assessment
 * - Risk Mitigation Strategies
 * - Financial Risk Management
 */

import { Question } from '../../../types';

export const CMA2D_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Enterprise Risk Management
  // ==========================================
  {
    id: 'cma2-d-001',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'ERM Framework',
    subtopic: 'COSO ERM',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The COSO Enterprise Risk Management framework emphasizes:',
    options: [
      'Eliminating all organizational risks',
      'Aligning risk management with strategy and performance',
      'Focusing only on financial risks',
      'Avoiding all risk-taking activities'
    ],
    correctAnswer: 1,
    explanation: 'COSO ERM integrates risk management with strategy setting and performance. It helps organizations anticipate risks and opportunities while enhancing value creation, not just preventing losses.',
    reference: 'COSO ERM 2017 Framework',
  },
  {
    id: 'cma2-d-002',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'ERM Framework',
    subtopic: 'Risk Appetite',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Risk appetite is best defined as:',
    options: [
      'The maximum loss a company can survive',
      'The types and amount of risk an organization is willing to accept',
      'The probability of any single risk occurring',
      'The cost of insurance coverage'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the level and type of risk an organization is willing to accept in pursuit of its objectives. It guides decisions about which risks to take, avoid, mitigate, or transfer.',
    reference: 'Risk Appetite; ERM Concepts',
  },
  {
    id: 'cma2-d-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'ERM Framework',
    subtopic: 'Risk Tolerance',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The difference between risk appetite and risk tolerance is:',
    options: [
      'They are identical concepts',
      'Appetite is broad strategy-level; tolerance is specific acceptable variation',
      'Tolerance is higher than appetite',
      'Only appetite applies to financial risks'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the broad, strategic level of risk the organization is willing to accept. Risk tolerance is the acceptable variation from specific objectives—more granular and operational.',
    reference: 'Risk Appetite vs Risk Tolerance',
  },
  {
    id: 'cma2-d-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'ERM Framework',
    subtopic: 'Board Oversight',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Primary responsibility for ERM oversight typically resides with:',
    options: [
      'External auditors',
      'The board of directors and senior management',
      'Individual department managers',
      'Government regulators'
    ],
    correctAnswer: 1,
    explanation: 'The board provides risk oversight while senior management implements the ERM framework. The board sets risk appetite, monitors key risks, and ensures adequate risk management processes.',
    reference: 'ERM Governance; Board Responsibilities',
  },

  // ==========================================
  // Risk Identification and Assessment
  // ==========================================
  {
    id: 'cma2-d-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Identification',
    subtopic: 'Risk Categories',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Strategic risk includes:',
    options: [
      'Fraud by employees',
      'Risks from pursuing strategies that may not achieve objectives',
      'Interest rate fluctuations only',
      'IT system failures'
    ],
    correctAnswer: 1,
    explanation: 'Strategic risks relate to high-level goals and can arise from external factors (competition, technology) or internal factors (poor strategy formulation or execution). They affect long-term success.',
    reference: 'Strategic Risk; Risk Categories',
  },
  {
    id: 'cma2-d-006',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Identification',
    subtopic: 'Operational Risk',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Operational risk is the risk of loss from:',
    options: [
      'Market price movements',
      'Inadequate internal processes, people, systems, or external events',
      'Changes in interest rates',
      'Exchange rate fluctuations'
    ],
    correctAnswer: 1,
    explanation: 'Operational risk arises from failures in internal processes, people, and systems, or from external events. Examples include fraud, system failures, human errors, and natural disasters.',
    reference: 'Operational Risk; Risk Types',
  },
  {
    id: 'cma2-d-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Assessment',
    subtopic: 'Risk Matrix',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A risk matrix plots risks based on:',
    options: [
      'Cost and revenue',
      'Likelihood (probability) and impact (severity)',
      'Time and resources',
      'Historical frequency only'
    ],
    correctAnswer: 1,
    explanation: 'Risk matrices assess risks on two dimensions: likelihood of occurrence and potential impact/severity. This helps prioritize risks—high likelihood + high impact risks need immediate attention.',
    reference: 'Risk Matrix; Risk Assessment',
  },
  {
    id: 'cma2-d-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Assessment',
    subtopic: 'Quantitative Assessment',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Expected loss is calculated as:',
    options: [
      'Maximum possible loss × 100',
      'Probability of loss × Amount of potential loss',
      'Total assets ÷ Number of risks',
      'Revenue minus expenses'
    ],
    correctAnswer: 1,
    explanation: 'Expected loss = Probability × Impact. For example, a 10% chance of a $1 million loss = $100,000 expected loss. This helps compare and prioritize different risks.',
    reference: 'Expected Loss; Quantitative Risk Assessment',
  },
  {
    id: 'cma2-d-009',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Assessment',
    subtopic: 'Key Risk Indicators',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Key Risk Indicators (KRIs) are used to:',
    options: [
      'Guarantee that no risks will occur',
      'Provide early warning signals of increasing risk',
      'Calculate exact future losses',
      'Eliminate the need for insurance'
    ],
    correctAnswer: 1,
    explanation: 'KRIs are metrics that provide early warning of increasing risk exposure. They are forward-looking indicators that help organizations monitor risk levels and take proactive actions.',
    reference: 'Key Risk Indicators; Risk Monitoring',
  },

  // ==========================================
  // Risk Mitigation Strategies
  // ==========================================
  {
    id: 'cma2-d-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Response',
    subtopic: 'Four Ts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The four main risk response strategies are:',
    options: [
      'Track, Test, Train, Transfer',
      'Tolerate, Treat, Transfer, Terminate',
      'Time, Team, Technology, Training',
      'Threat, Trust, Transform, Translate'
    ],
    correctAnswer: 1,
    explanation: 'Risk responses: Tolerate (accept), Treat (mitigate/reduce), Transfer (insurance/outsource), Terminate (avoid). Choice depends on risk appetite, cost-benefit, and feasibility.',
    reference: 'Risk Response Strategies; Four Ts',
  },
  {
    id: 'cma2-d-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Response',
    subtopic: 'Risk Transfer',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Purchasing insurance is an example of:',
    options: [
      'Risk avoidance',
      'Risk acceptance',
      'Risk transfer',
      'Risk elimination'
    ],
    correctAnswer: 2,
    explanation: 'Insurance transfers the financial impact of specified risks to the insurer in exchange for premium payments. The risk still exists, but its financial consequence is borne by another party.',
    reference: 'Risk Transfer; Insurance',
  },
  {
    id: 'cma2-d-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Response',
    subtopic: 'Risk Avoidance',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company decides not to enter a new market due to political instability. This is:',
    options: [
      'Risk acceptance',
      'Risk mitigation',
      'Risk avoidance',
      'Risk transfer'
    ],
    correctAnswer: 2,
    explanation: 'Risk avoidance means not engaging in the activity that creates the risk. By not entering the unstable market, the company eliminates that specific risk exposure entirely.',
    reference: 'Risk Avoidance; Risk Response',
  },
  {
    id: 'cma2-d-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Response',
    subtopic: 'Risk Mitigation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Installing fire sprinklers in a warehouse is an example of:',
    options: [
      'Risk transfer',
      'Risk avoidance',
      'Risk mitigation (reduction)',
      'Risk acceptance'
    ],
    correctAnswer: 2,
    explanation: 'Risk mitigation reduces the likelihood or impact of a risk. Sprinklers don\'t eliminate fire risk but reduce potential damage. Controls, training, and safety measures are mitigation strategies.',
    reference: 'Risk Mitigation; Risk Controls',
  },

  // ==========================================
  // Financial Risk Management
  // ==========================================
  {
    id: 'cma2-d-014',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Financial Risk',
    subtopic: 'Interest Rate Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A company with significant variable-rate debt is exposed to:',
    options: [
      'Currency risk',
      'Interest rate risk',
      'Commodity risk',
      'Credit risk'
    ],
    correctAnswer: 1,
    explanation: 'Variable-rate debt exposes the company to interest rate risk—if rates rise, interest expense increases. Companies can hedge this using interest rate swaps or caps.',
    reference: 'Interest Rate Risk; Financial Risk',
  },
  {
    id: 'cma2-d-015',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Financial Risk',
    subtopic: 'Currency Risk',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A U.S. company expecting to receive €1 million in 90 days faces:',
    options: [
      'Transaction exposure (currency risk)',
      'Interest rate risk',
      'Credit risk',
      'Liquidity risk'
    ],
    correctAnswer: 0,
    explanation: 'Transaction exposure is the risk that exchange rate movements will change the value of a committed foreign currency transaction. The euro amount is fixed, but its dollar value will fluctuate.',
    reference: 'Transaction Exposure; Currency Risk',
  },
  {
    id: 'cma2-d-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Hedging',
    subtopic: 'Forward Contracts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'To hedge a future euro receivable, a U.S. company should:',
    options: [
      'Buy euros forward',
      'Sell euros forward',
      'Buy call options on euros',
      'Do nothing'
    ],
    correctAnswer: 1,
    explanation: 'To hedge euro receivables, sell euros forward. This locks in the future exchange rate. If euros depreciate, the forward contract gains offset the lower receivable value.',
    reference: 'Forward Contracts; Currency Hedging',
  },
  {
    id: 'cma2-d-017',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Hedging',
    subtopic: 'Options',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An advantage of options over forward contracts for hedging is:',
    options: [
      'Options are always free',
      'Options allow benefit from favorable movements while limiting downside',
      'Options eliminate all risk',
      'Options never expire'
    ],
    correctAnswer: 1,
    explanation: 'Options provide downside protection while allowing participation in favorable movements (unlike forwards that lock in the rate). The trade-off is the premium cost to purchase the option.',
    reference: 'Options; Hedging Instruments',
  },
  {
    id: 'cma2-d-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Financial Risk',
    subtopic: 'Credit Risk',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Credit risk is the risk that:',
    options: [
      'Interest rates will increase',
      'Exchange rates will fluctuate',
      'A counterparty will fail to meet its obligations',
      'Stock prices will decline'
    ],
    correctAnswer: 2,
    explanation: 'Credit (default) risk is the risk that a borrower or counterparty will not fulfill their financial obligations. Companies manage this through credit analysis, limits, and diversification.',
    reference: 'Credit Risk; Counterparty Risk',
  },

  // ==========================================
  // Additional Risk Topics
  // ==========================================
  {
    id: 'cma2-d-019',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Assessment',
    subtopic: 'Scenario Analysis',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Scenario analysis in risk management involves:',
    options: [
      'Only analyzing best-case scenarios',
      'Examining potential outcomes under different plausible situations',
      'Ignoring unlikely events',
      'Calculating exact future values'
    ],
    correctAnswer: 1,
    explanation: 'Scenario analysis examines outcomes under various plausible scenarios (best case, worst case, most likely). It helps understand range of potential impacts and prepare contingency plans.',
    reference: 'Scenario Analysis; Risk Assessment',
  },
  {
    id: 'cma2-d-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Assessment',
    subtopic: 'Sensitivity Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Sensitivity analysis determines:',
    options: [
      'The exact probability of each risk',
      'How changes in one variable affect outcomes',
      'The cost of insurance',
      'Legal liability exposure'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis (what-if analysis) tests how changes in key variables affect outcomes. It identifies which variables have the greatest impact on results, helping focus risk management efforts.',
    reference: 'Sensitivity Analysis; What-If Analysis',
  },
  {
    id: 'cma2-d-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Hedging',
    subtopic: 'Commodity Hedging',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An airline concerned about rising jet fuel prices could hedge by:',
    options: [
      'Selling fuel futures',
      'Buying fuel futures or call options',
      'Ignoring the market',
      'Reducing flight schedules'
    ],
    correctAnswer: 1,
    explanation: 'To hedge against price increases, buy futures or call options. If prices rise, gains on these instruments offset higher fuel costs. Airlines commonly hedge fuel costs to stabilize expenses.',
    reference: 'Commodity Hedging; Fuel Price Risk',
  },
  {
    id: 'cma2-d-022',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'ERM Framework',
    subtopic: 'Risk Culture',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A strong risk culture is characterized by:',
    options: [
      'Avoiding all risk discussions',
      'Punishing employees who identify risks',
      'Open communication and accountability for risk management',
      'Centralizing all risk decisions with the CEO'
    ],
    correctAnswer: 2,
    explanation: 'Strong risk culture features open communication about risks, clear accountability, learning from incidents, and embedding risk awareness into daily decisions. It supports effective ERM.',
    reference: 'Risk Culture; Organizational Behavior',
  },
  {
    id: 'cma2-d-023',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Financial Risk',
    subtopic: 'Liquidity Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Liquidity risk refers to:',
    options: [
      'Risk of exchange rate changes',
      'Risk of not meeting short-term obligations or selling assets at fair value quickly',
      'Risk of competitor actions',
      'Risk of technology failure'
    ],
    correctAnswer: 1,
    explanation: 'Liquidity risk is the risk of not being able to meet financial obligations when due or not being able to sell assets quickly without significant loss. Companies manage this through cash reserves and credit facilities.',
    reference: 'Liquidity Risk; Cash Management',
  },
  {
    id: 'cma2-d-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Response',
    subtopic: 'Cost-Benefit Analysis',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When deciding whether to mitigate a risk, management should:',
    options: [
      'Always implement the most comprehensive controls',
      'Compare the cost of mitigation to the expected reduction in risk',
      'Ignore costs and focus only on risk reduction',
      'Eliminate all risks regardless of cost'
    ],
    correctAnswer: 1,
    explanation: 'Risk response decisions should consider cost-benefit. The cost of mitigation should be proportionate to the risk reduction achieved. Sometimes accepting a small risk is more economical than expensive controls.',
    reference: 'Risk Response; Cost-Benefit Analysis',
  },
  {
    id: 'cma2-d-025',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Risk Identification',
    subtopic: 'Emerging Risks',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Emerging risks are characterized by:',
    options: [
      'High certainty and predictability',
      'Historical data that makes them easy to quantify',
      'Uncertainty and limited historical information',
      'Always being technology-related'
    ],
    correctAnswer: 2,
    explanation: 'Emerging risks are new or evolving threats with limited historical data, making them difficult to assess. Examples include new regulations, technologies, or geopolitical changes. They require ongoing monitoring.',
    reference: 'Emerging Risks; Risk Identification',
  },
];

// Helper functions
export const getCMA2DQuestionsBatch1 = () => CMA2D_QUESTIONS_BATCH1;
export const getCMA2DQuestionCount = () => CMA2D_QUESTIONS_BATCH1.length;

export default CMA2D_QUESTIONS_BATCH1;
