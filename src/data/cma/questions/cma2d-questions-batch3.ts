/**
 * CMA Part 2, Section D: Risk Management - Questions Batch 3 (Q51-75)
 * Weight: 10% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-D: Risk Management
 * 
 * Topics covered:
 * - Enterprise Risk Management (ERM)
 * - Financial Risk Management
 * - Derivatives and Hedging
 * - Insurance and Risk Transfer
 * - Business Continuity
 * - Cyber Risk
 */

import { Question } from '../../../types';

export const CMA2D_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // Enterprise Risk Management Advanced
  // ==========================================
  {
    id: 'cma2-d-052',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk Management',
    subtopic: 'Risk Response Strategies',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which is NOT a typical risk response strategy?',
    options: [
      'Avoid the risk',
      'Accept the risk',
      'Transfer the risk',
      'Multiply the risk'
    ],
    correctAnswer: 3,
    explanation: 'The four risk responses are: Avoid (eliminate the activity), Reduce/Mitigate (controls), Transfer (insurance, contracts), and Accept (retain within appetite). "Multiply" is not a valid response.',
    reference: 'Risk Response Strategies',
  },
  {
    id: 'cma2-d-053',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk Management',
    subtopic: 'Risk Assessment Matrix',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A risk with high impact but low likelihood should typically be:',
    options: [
      'Ignored completely',
      'Addressed with contingency plans and possibly transferred',
      'Accepted without any mitigation',
      'Given no management attention'
    ],
    correctAnswer: 1,
    explanation: 'High-impact, low-likelihood risks (like natural disasters) are often transferred through insurance and managed with contingency plans. They shouldn\'t be ignored due to potential severity.',
    reference: 'Risk Assessment',
  },
  {
    id: 'cma2-d-054',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk Management',
    subtopic: 'Key Risk Indicators',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Key Risk Indicators (KRIs) differ from Key Performance Indicators (KPIs) in that KRIs:',
    options: [
      'Only measure past performance',
      'Provide early warning signals of increasing risk exposure',
      'Are unrelated to business objectives',
      'Never use quantitative measures'
    ],
    correctAnswer: 1,
    explanation: 'KRIs are forward-looking metrics that signal potential risk events before they occur (leading indicators), while KPIs often measure achievement of objectives (often lagging).',
    reference: 'Key Risk Indicators',
  },

  // ==========================================
  // Financial Risk Management
  // ==========================================
  {
    id: 'cma2-d-055',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Financial Risk',
    subtopic: 'Interest Rate Risk',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A company with floating-rate debt is most concerned about:',
    options: [
      'Falling interest rates',
      'Rising interest rates increasing borrowing costs',
      'Stable interest rates',
      'Foreign exchange fluctuations only'
    ],
    correctAnswer: 1,
    explanation: 'Floating-rate debt exposes the borrower to rising interest rates, which increase interest expense. They might use an interest rate swap or cap to hedge this risk.',
    reference: 'Interest Rate Risk',
  },
  {
    id: 'cma2-d-056',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Financial Risk',
    subtopic: 'Credit Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Credit risk refers to:',
    options: [
      'Risk of losing money due to stock price changes',
      'Risk that a counterparty will fail to meet contractual obligations',
      'Risk of regulatory changes',
      'Risk of natural disasters'
    ],
    correctAnswer: 1,
    explanation: 'Credit risk is the risk of loss from a borrower or counterparty failing to make required payments. Managed through credit analysis, limits, collateral, and diversification.',
    reference: 'Credit Risk Management',
  },
  {
    id: 'cma2-d-057',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Financial Risk',
    subtopic: 'Liquidity Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Liquidity risk includes the risk that:',
    options: [
      'Interest rates will rise',
      'The company cannot meet short-term obligations or sell assets without significant loss',
      'Employees will leave',
      'Technology will become obsolete'
    ],
    correctAnswer: 1,
    explanation: 'Liquidity risk is the inability to meet obligations or sell assets quickly at fair value. Managed through cash reserves, credit facilities, and asset-liability matching.',
    reference: 'Liquidity Risk',
  },
  {
    id: 'cma2-d-058',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Financial Risk',
    subtopic: 'Value at Risk',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Value at Risk (VaR) of $10 million at 95% confidence level means:',
    options: [
      'Maximum possible loss is $10 million',
      'Expected loss is $10 million',
      'There is 5% probability of losing more than $10 million in the time period',
      'The company will always lose $10 million'
    ],
    correctAnswer: 2,
    explanation: 'VaR states that with 95% confidence, the loss will not exceed $10M in the specified period. There\'s a 5% chance of a larger loss. VaR does not capture extreme tail risks.',
    reference: 'Value at Risk',
  },

  // ==========================================
  // Derivatives and Hedging
  // ==========================================
  {
    id: 'cma2-d-059',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Derivatives',
    subtopic: 'Forward Contracts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A key characteristic of forward contracts compared to futures is:',
    options: [
      'Forwards are exchange-traded and standardized',
      'Forwards are customized OTC agreements with counterparty risk',
      'Forwards have no credit risk',
      'Forwards are more liquid than futures'
    ],
    correctAnswer: 1,
    explanation: 'Forwards are private OTC contracts customized for parties\' needs. They carry counterparty (credit) risk. Futures are standardized, exchange-traded with clearinghouse guarantees.',
    reference: 'Forward vs. Futures',
  },
  {
    id: 'cma2-d-060',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Derivatives',
    subtopic: 'Options Basics',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The buyer of a put option has:',
    options: [
      'The obligation to sell the underlying asset',
      'The right, but not obligation, to sell the underlying at the strike price',
      'The right to buy the underlying asset',
      'No rights or obligations'
    ],
    correctAnswer: 1,
    explanation: 'Put option buyer has the right (not obligation) to sell at the strike price. Put buyer benefits if the price falls below the strike price. Premium is the cost of this protection.',
    reference: 'Options Fundamentals',
  },
  {
    id: 'cma2-d-061',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Derivatives',
    subtopic: 'Interest Rate Swaps',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Company A has floating-rate debt but wants fixed-rate exposure. Company B has fixed-rate debt but wants floating. They should:',
    options: [
      'Each refinance their debt',
      'Enter an interest rate swap where A pays fixed and receives floating',
      'Do nothing',
      'Issue equity instead'
    ],
    correctAnswer: 1,
    explanation: 'An interest rate swap solves both needs: A pays fixed rate in swap (achieving effective fixed rate) and B pays floating (achieving effective floating rate). Efficient without refinancing.',
    reference: 'Interest Rate Swaps',
  },
  {
    id: 'cma2-d-062',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Derivatives',
    subtopic: 'Hedge Accounting',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For hedge accounting to apply under GAAP/IFRS:',
    options: [
      'Any derivative can be used without documentation',
      'The hedge must be documented, highly effective, and meet specific criteria',
      'Speculation is encouraged',
      'Only cash flow hedges are permitted'
    ],
    correctAnswer: 1,
    explanation: 'Hedge accounting requires formal documentation, designation, effectiveness testing, and meeting specific criteria. Without qualification, derivatives are marked-to-market through earnings.',
    reference: 'Hedge Accounting',
  },

  // ==========================================
  // Insurance and Risk Transfer
  // ==========================================
  {
    id: 'cma2-d-063',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Insurance',
    subtopic: 'Risk Transfer Mechanisms',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Captive insurance companies are:',
    options: [
      'Government-owned insurers',
      'Insurance subsidiaries owned by non-insurance parent companies to insure parent\'s risks',
      'Insurers that only handle auto insurance',
      'Illegal in most jurisdictions'
    ],
    correctAnswer: 1,
    explanation: 'Captives are insurance companies formed by parent companies to insure their own risks. Benefits include cost control, coverage customization, and potential tax advantages.',
    reference: 'Captive Insurance',
  },
  {
    id: 'cma2-d-064',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Insurance',
    subtopic: 'Deductibles and Self-Insurance',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A company choosing a higher insurance deductible is effectively:',
    options: [
      'Eliminating all risk',
      'Retaining more risk in exchange for lower premiums',
      'Transferring more risk to the insurer',
      'Increasing insurance costs'
    ],
    correctAnswer: 1,
    explanation: 'Higher deductibles mean the company absorbs more losses before insurance pays. This risk retention is rewarded with lower premiums but requires adequate reserves for losses.',
    reference: 'Deductibles and Self-Insurance',
  },
  {
    id: 'cma2-d-065',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Insurance',
    subtopic: 'Business Interruption Insurance',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Business interruption insurance covers:',
    options: [
      'Only physical property damage',
      'Lost income and ongoing expenses during periods when business is disrupted',
      'Employee salaries only',
      'Stock price declines'
    ],
    correctAnswer: 1,
    explanation: 'Business interruption insurance covers lost profits and continuing expenses (rent, payroll) when operations are suspended due to a covered event like fire or disaster.',
    reference: 'Business Interruption Coverage',
  },

  // ==========================================
  // Business Continuity
  // ==========================================
  {
    id: 'cma2-d-066',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Business Continuity',
    subtopic: 'BCP Elements',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Business Continuity Plan (BCP) should include:',
    options: [
      'Only IT recovery procedures',
      'Risk assessment, impact analysis, recovery strategies, and testing protocols',
      'Marketing strategies only',
      'Only financial forecasts'
    ],
    correctAnswer: 1,
    explanation: 'BCP encompasses risk assessment, business impact analysis, recovery strategies for critical processes, communication plans, and regular testing. It\'s comprehensive, not just IT.',
    reference: 'Business Continuity Planning',
  },
  {
    id: 'cma2-d-067',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Business Continuity',
    subtopic: 'Recovery Time Objective',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Recovery Time Objective (RTO) measures:',
    options: [
      'How much data can be lost',
      'Maximum acceptable downtime before critical functions must be restored',
      'Total cost of recovery',
      'Number of employees needed for recovery'
    ],
    correctAnswer: 1,
    explanation: 'RTO is the target time to restore a business process after disruption. It drives recovery strategy design. Recovery Point Objective (RPO) addresses acceptable data loss.',
    reference: 'RTO and RPO',
  },
  {
    id: 'cma2-d-068',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Business Continuity',
    subtopic: 'Crisis Communication',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Effective crisis communication should:',
    options: [
      'Only inform senior management',
      'Be timely, transparent, and coordinated across all stakeholders',
      'Avoid admitting any problems',
      'Be delayed until the crisis is fully resolved'
    ],
    correctAnswer: 1,
    explanation: 'Crisis communication must be prompt, honest, consistent, and reach all stakeholders (employees, customers, investors, media, regulators). Delays damage credibility.',
    reference: 'Crisis Communication',
  },

  // ==========================================
  // Cyber Risk
  // ==========================================
  {
    id: 'cma2-d-069',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Cyber Risk',
    subtopic: 'Types of Cyber Threats',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Ransomware attacks typically:',
    options: [
      'Steal login credentials only',
      'Encrypt data and demand payment for decryption keys',
      'Improve system security',
      'Only affect personal computers'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware encrypts victim\'s data and demands ransom payment (often cryptocurrency) for decryption. Prevention includes backups, patching, training, and security controls.',
    reference: 'Ransomware Threats',
  },
  {
    id: 'cma2-d-070',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Cyber Risk',
    subtopic: 'Social Engineering',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Phishing attacks primarily exploit:',
    options: [
      'Software vulnerabilities',
      'Human behavior through deceptive emails or messages',
      'Hardware failures',
      'Network infrastructure'
    ],
    correctAnswer: 1,
    explanation: 'Phishing uses deceptive communications to trick humans into revealing credentials, clicking malicious links, or transferring funds. Training and awareness are key defenses.',
    reference: 'Social Engineering',
  },
  {
    id: 'cma2-d-071',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Cyber Risk',
    subtopic: 'Data Breach Response',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'After a data breach, immediate steps should include:',
    options: [
      'Delete all evidence of the breach',
      'Contain the breach, assess impact, notify affected parties, and implement improvements',
      'Immediately pay any ransom demanded',
      'Ignore the breach and hope it goes unnoticed'
    ],
    correctAnswer: 1,
    explanation: 'Breach response: contain damage, investigate scope, notify regulators/affected parties as required by law, implement remediation, and learn from the incident.',
    reference: 'Data Breach Response',
  },

  // ==========================================
  // Operational Risk
  // ==========================================
  {
    id: 'cma2-d-072',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Process Risks',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Operational risk arises from:',
    options: [
      'Market price movements only',
      'Inadequate or failed processes, people, systems, or external events',
      'Strategic decisions by competitors',
      'Changes in interest rates'
    ],
    correctAnswer: 1,
    explanation: 'Operational risk encompasses process failures, human error, system outages, and external events (excluding strategic and reputational). Banks must hold capital for operational risk.',
    reference: 'Operational Risk Definition',
  },
  {
    id: 'cma2-d-073',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Vendor Risk Management',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Third-party vendor risk management should include:',
    options: [
      'Only reviewing vendor prices',
      'Due diligence, ongoing monitoring, and contractual risk allocation',
      'Avoiding all outsourcing',
      'Trusting vendors completely without oversight'
    ],
    correctAnswer: 1,
    explanation: 'Vendor risk management includes pre-contract due diligence, contractual protections (SLAs, liability), ongoing monitoring, and exit strategies. Critical vendors need closer oversight.',
    reference: 'Vendor Risk Management',
  },

  // ==========================================
  // Regulatory Risk
  // ==========================================
  {
    id: 'cma2-d-074',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Regulatory Risk',
    subtopic: 'Compliance Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Compliance risk is the risk of:',
    options: [
      'Competitors offering lower prices',
      'Legal or regulatory penalties, financial loss, or reputational damage from non-compliance',
      'Technology changes',
      'Employee turnover'
    ],
    correctAnswer: 1,
    explanation: 'Compliance risk arises from failing to adhere to laws, regulations, and standards. Consequences include fines, sanctions, license revocation, and reputational harm.',
    reference: 'Compliance Risk',
  }
];
