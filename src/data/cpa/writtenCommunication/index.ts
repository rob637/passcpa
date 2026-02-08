// Written Communication Tasks for CPA Exam (PREP/Disciplines)
// These simulate the actual CPA exam Written Communication tasks

import { WCRubric, WCTask } from '../../../types';

export const WC_RUBRIC: WCRubric = {
  organization: {
    weight: 0.25,
    criteria: [
      'Clear opening that addresses the task',
      'Logical flow of ideas',
      'Effective transitions',
      'Strong conclusion',
    ],
  },
  development: {
    weight: 0.4,
    criteria: [
      'Addresses all aspects of the task',
      'Provides relevant examples',
      'Demonstrates understanding of concepts',
      'Sufficient depth of analysis',
    ],
  },
  expression: {
    weight: 0.35,
    criteria: [
      'Professional business tone',
      'Correct grammar and punctuation',
      'Appropriate vocabulary',
      'Clear and concise language',
    ],
  },
};

export const WRITTEN_COMMUNICATIONS: WCTask[] = [
  {
    id: 'wc_001',
    section: 'PREP',
    type: 'written_communication',
    topic: 'Internal Controls',
    difficulty: 'moderate',
    estimatedTime: 25,
    scenario: `You are a senior accountant at Miller & Associates CPAs. Your client, TechStart Inc., is a rapidly growing technology company that recently experienced significant growth. The company's CFO, Sarah Chen, has reached out for guidance.

During a recent internal audit, several internal control weaknesses were identified:
1. The same employee who receives cash also records deposits in the accounting system
2. There is no formal approval process for vendor invoices over $5,000
3. Password policies are not enforced for the accounting software
4. Monthly bank reconciliations are often performed 3-4 weeks after month-end

The CFO has asked you to write a memo explaining the risks associated with these control weaknesses and recommending improvements.`,
    task: `Write a professional memo to Sarah Chen, CFO of TechStart Inc., that:
1. Explains the risks associated with each control weakness identified
2. Recommends specific internal control improvements for each weakness
3. Discusses the benefits of implementing these recommendations

Your memo should demonstrate your understanding of internal control concepts and be written in a professional business format.`,
    keyPoints: [
      'Segregation of duties - cash handling vs. recording',
      'Authorization controls - approval thresholds',
      'IT general controls - password policies',
      'Detective controls - timely reconciliations',
      'COSO framework components',
      'Cost-benefit considerations',
    ],
    sampleResponse: `MEMORANDUM

TO: Sarah Chen, CFO, TechStart Inc.
FROM: [Candidate Name], Senior Accountant, Miller & Associates CPAs
DATE: [Current Date]
RE: Internal Control Weaknesses and Recommendations

Dear Ms. Chen,

Thank you for reaching out regarding the internal control weaknesses identified during your recent internal audit. I have reviewed the findings and would like to provide my analysis of the associated risks and recommendations for improvement.

CONTROL WEAKNESS ANALYSIS AND RECOMMENDATIONS

1. Cash Handling and Recording
Risk: Having the same employee receive cash and record deposits creates an opportunity for misappropriation without detection. This lack of segregation of duties is a significant control weakness.
Recommendation: Assign cash receipt and recording functions to different employees. Implement a dual verification process where a supervisor reviews and approves all deposit entries.

2. Vendor Invoice Approval Process
Risk: Without formal approval for invoices over $5,000, the company faces risks of unauthorized purchases, duplicate payments, or fraudulent vendor schemes.
Recommendation: Establish a tiered approval matrix requiring management approval for invoices exceeding $5,000. Consider implementing a three-way match system (purchase order, receiving report, invoice) for all material purchases.

3. Password Policy Enforcement
Risk: Weak password controls increase vulnerability to unauthorized access, data breaches, and fraudulent transactions in the accounting system.
Recommendation: Implement and enforce password policies including complexity requirements, mandatory changes every 90 days, and account lockout after failed attempts. Consider multi-factor authentication for sensitive transactions.

4. Bank Reconciliation Timing
Risk: Delayed reconciliations reduce the effectiveness of this detective control, allowing errors or irregularities to go unnoticed for extended periods.
Recommendation: Establish a policy requiring bank reconciliations within 10 business days of month-end. Assign review responsibility to someone independent of cash handling functions.

BENEFITS OF IMPLEMENTATION

Implementing these recommendations will strengthen TechStart's internal control environment, reduce fraud risk, improve financial reporting accuracy, and demonstrate commitment to governance best practices—important factors as your company continues to grow.

I would be happy to discuss these recommendations in more detail and assist with implementation planning.

Respectfully,
[Candidate Name]`,
  },
  {
    id: 'wc_002',
    section: 'PREP',
    type: 'written_communication',
    topic: 'Cost Accounting - Variance Analysis',
    difficulty: 'moderate',
    estimatedTime: 25,
    scenario: `You are a management accountant at Precision Manufacturing Corp. The company produces specialized industrial components using a standard cost system. The production manager, James Wilson, is concerned about the following variances reported for the most recent quarter:

Direct Materials:
- Price Variance: $15,000 Favorable
- Quantity Variance: $28,000 Unfavorable

Direct Labor:
- Rate Variance: $8,000 Unfavorable
- Efficiency Variance: $12,000 Favorable

Manufacturing Overhead:
- Spending Variance: $5,000 Unfavorable
- Efficiency Variance: $3,000 Favorable
- Volume Variance: $20,000 Unfavorable

James has asked you to explain these variances and their potential causes.`,
    task: `Write a professional memo to James Wilson, Production Manager, that:
1. Explains what each type of variance represents
2. Discusses potential causes for each variance
3. Describes how these variances might be interrelated
4. Recommends actions to investigate and address unfavorable variances

Your memo should demonstrate your understanding of variance analysis concepts and be written in a professional business format.`,
    keyPoints: [
      'Price vs. quantity variances for materials',
      'Rate vs. efficiency variances for labor',
      'Fixed vs. variable overhead variances',
      'Interrelationships between variances',
      'Trade-offs in purchasing decisions',
      'Root cause analysis approach',
    ],
    sampleResponse: `MEMORANDUM

TO: James Wilson, Production Manager
FROM: [Candidate Name], Management Accountant
DATE: [Current Date]
RE: Analysis of Q3 Production Variances

Dear James,

I have analyzed the quarterly variances you shared and prepared the following explanation and recommendations.

VARIANCE ANALYSIS

Direct Materials Variances
The favorable price variance of $15,000 indicates we paid less per unit of raw materials than our standard cost. However, the unfavorable quantity variance of $28,000 shows we used more materials than standard allowed for our production level. These variances may be interrelated—purchasing lower-priced materials of inferior quality could lead to increased waste and rework.

Direct Labor Variances  
The unfavorable rate variance of $8,000 suggests we paid higher wages than standard, possibly due to overtime premiums or using more skilled workers. The favorable efficiency variance of $12,000 indicates workers completed tasks faster than standard time allows. Using higher-skilled (higher-paid) workers may explain both variances—they cost more per hour but work more efficiently.

Manufacturing Overhead Variances
The unfavorable spending variance of $5,000 indicates actual overhead costs exceeded the flexible budget. The favorable efficiency variance of $3,000 reflects efficient use of the overhead allocation base. The significant unfavorable volume variance of $20,000 indicates actual production was below normal capacity, resulting in under-absorption of fixed overhead.

INTERRELATIONSHIPS AND RECOMMENDATIONS

Several variances appear interconnected:
1. Material price/quantity trade-off: Investigate whether the lower-cost materials are causing excess usage and rework.
2. Labor rate/efficiency trade-off: Evaluate whether using skilled labor at premium rates yields net benefits.
3. Volume variance: The large unfavorable volume variance warrants investigation into production scheduling and capacity utilization.

I recommend:
- Review material specifications with purchasing to ensure quality standards
- Analyze production schedules to improve capacity utilization
- Track rework costs separately to quantify quality-related impacts

I'm available to discuss these findings and assist with further analysis.

Regards,
[Candidate Name]`,
  },
  {
    id: 'wc_003',
    section: 'PREP',
    type: 'written_communication',
    topic: 'Corporate Governance',
    difficulty: 'medium',
    estimatedTime: 25,
    scenario: `You are an external consultant engaged by Riverside Holdings, a mid-sized publicly traded company. The board of directors has recently come under scrutiny following a shareholder lawsuit alleging inadequate board oversight.

Current board structure:
- 9 board members total
- CEO serves as Board Chairman
- 4 directors are current or former company executives
- Audit Committee has 3 members (1 is the CFO)
- No formal board evaluation process exists
- Director terms are staggered, with no mandatory retirement age

The board has engaged your firm to evaluate their governance structure and recommend improvements.`,
    task: `Write a professional memo to the Board of Directors of Riverside Holdings that:
1. Identifies specific governance concerns with the current board structure
2. Explains why each concern represents a governance risk
3. Recommends specific improvements aligned with corporate governance best practices
4. Discusses the benefits of implementing these improvements

Your memo should demonstrate your understanding of corporate governance principles and be written in a professional business format.`,
    keyPoints: [
      'Board independence requirements',
      'Separation of CEO and Chairman roles',
      'Audit committee composition (all independent)',
      'Board evaluation processes',
      'Best practices from NYSE/NASDAQ governance rules',
      'SOX requirements',
    ],
    sampleResponse: `MEMORANDUM

TO: Board of Directors, Riverside Holdings
FROM: [Candidate Name], Governance Consultant
DATE: [Current Date]
RE: Corporate Governance Assessment and Recommendations

Dear Members of the Board,

Following our engagement to evaluate Riverside Holdings' governance structure, I have identified several areas of concern and developed recommendations aligned with corporate governance best practices.

GOVERNANCE CONCERNS IDENTIFIED

1. Combined CEO/Chairman Role
Risk: This structure concentrates significant power in one individual, potentially compromising the board's ability to provide independent oversight of management.

2. Insufficient Board Independence
Risk: With 4 of 9 directors being current or former executives, insiders comprise 44% of the board. This exceeds the proportion recommended by governance best practices and may impair objective decision-making.

3. Audit Committee Composition
Risk: The CFO's presence on the Audit Committee directly violates SEC rules and NYSE/NASDAQ listing standards, which require all audit committee members to be independent. This represents a significant compliance and litigation risk.

4. Lack of Board Evaluation Process
Risk: Without formal evaluations, the board cannot objectively assess its effectiveness or identify areas for improvement.

RECOMMENDATIONS

1. Separate CEO and Chairman Roles
Appoint an independent director as Chairman, or at minimum, designate a Lead Independent Director with authority to set agendas and lead executive sessions.

2. Increase Board Independence
Add independent directors to achieve at least 67% independence. Establish clear criteria for determining director independence.

3. Reconstitute the Audit Committee
Immediately remove the CFO from the Audit Committee. Ensure all three members meet SEC and exchange independence requirements, including financial literacy standards.

4. Implement Board Evaluation Process
Adopt an annual board and committee evaluation process, including individual director assessments and periodic external evaluations.

BENEFITS

These improvements will strengthen investor confidence, reduce litigation risk, improve regulatory compliance, and position Riverside Holdings as a governance leader among its peers.

I am available to assist with implementation planning.

Respectfully submitted,
[Candidate Name]`,
  },
  {
    id: 'wc_004',
    section: 'PREP',
    type: 'written_communication',
    topic: 'IT General Controls',
    difficulty: 'moderate',
    estimatedTime: 25,
    scenario: `You are an IT auditor at a public accounting firm. Your client, Global Retail Corp., operates 200 stores nationwide and processes over $500 million in credit card transactions annually. During your review of IT general controls, you identified the following issues:

1. The ERP system administrator also has the ability to approve and process journal entries
2. System logs are overwritten after 30 days due to storage limitations
3. There is no formal change management process for the ERP system
4. Backup tapes are stored in the same building as the primary data center
5. Third-party access to systems is not reviewed on a regular basis

The Controller has asked you to explain the significance of these findings.`,
    task: `Write a professional memo to the Controller of Global Retail Corp. that:
1. Explains why each IT control weakness is significant
2. Discusses the potential risks associated with each weakness
3. Recommends specific remediation steps
4. Prioritizes the recommendations based on risk level

Your memo should demonstrate your understanding of IT general controls and be written in a professional business format.`,
    keyPoints: [
      'Segregation of duties in IT',
      'Log retention and monitoring',
      'Change management controls',
      'Business continuity/disaster recovery',
      'Third-party/vendor management',
      'PCI-DSS compliance considerations',
    ],
    sampleResponse: `MEMORANDUM

TO: Controller, Global Retail Corp.
FROM: [Candidate Name], IT Audit Manager
DATE: [Current Date]
RE: IT General Control Deficiencies - Risk Assessment and Recommendations

Dear Controller,

Following our review of Global Retail Corp.'s IT general controls, I have prepared this assessment of the identified deficiencies, prioritized by risk level.

PRIORITY 1 - HIGH RISK (Immediate Action Required)

1. ERP Administrator Access to Financial Transactions
Finding: The system administrator can approve and process journal entries.
Risk: This creates a significant fraud risk. An administrator could process unauthorized transactions and manipulate system logs to conceal the activity.
Recommendation: Immediately restrict financial transaction capabilities from the administrator role. Implement role-based access controls with proper segregation between IT and financial functions.

2. Off-Site Backup Storage
Finding: Backup tapes are stored in the same building as the primary data center.
Risk: A disaster affecting the building (fire, flood, etc.) could destroy both primary data and backups, potentially causing catastrophic data loss.
Recommendation: Establish off-site storage at a geographically separate location. Consider cloud-based backup solutions for critical data. Given your transaction volume, this is also a PCI-DSS compliance concern.

PRIORITY 2 - MODERATE RISK

3. Change Management Process
Finding: No formal change management exists for the ERP system.
Risk: Unauthorized or untested changes could disrupt operations, introduce security vulnerabilities, or affect data integrity.
Recommendation: Implement a formal change management process including documentation, testing, approval, and rollback procedures. All changes should be logged and reviewed.

4. System Log Retention
Finding: Logs are overwritten after 30 days.
Risk: Insufficient log retention impairs incident investigation capabilities and may violate regulatory requirements. Given your credit card transaction volume, PCI-DSS requires 12 months of log retention.
Recommendation: Extend log retention to minimum 12 months. Implement log monitoring and alerting for suspicious activities.

PRIORITY 3 - LOWER RISK (But Important)

5. Third-Party Access Reviews
Finding: No regular review of third-party system access.
Risk: Former vendors or contractors may retain unnecessary access, creating security vulnerabilities.
Recommendation: Implement quarterly reviews of all third-party access. Establish formal vendor access procedures including timely termination protocols.

I recommend addressing Priority 1 items within 30 days. I am available to assist with remediation planning.

Regards,
[Candidate Name]`,
  },
  {
    id: 'wc_005',
    section: 'PREP',
    type: 'written_communication',
    topic: 'Economics - Exchange Rates',
    difficulty: 'moderate',
    estimatedTime: 25,
    scenario: `You are a financial analyst at International Trade Advisors. Your client, Pacific Manufacturing Inc., is a U.S.-based company that exports industrial equipment to Europe. The company invoices customers in euros and typically receives payment 90 days after shipment.

Recent information:
- Current spot rate: €1 = $1.10
- 90-day forward rate: €1 = $1.08
- The U.S. Federal Reserve recently raised interest rates
- European Central Bank rates remain unchanged
- Pacific Manufacturing expects to receive €5 million in 90 days

The CFO is concerned about currency exposure and has asked for your analysis.`,
    task: `Write a professional memo to the CFO of Pacific Manufacturing Inc. that:
1. Explains the company's foreign exchange exposure
2. Discusses why the forward rate differs from the spot rate
3. Analyzes the hedging alternatives available
4. Recommends a strategy to manage the currency risk

Your memo should demonstrate your understanding of international finance concepts and be written in a professional business format.`,
    keyPoints: [
      'Transaction exposure definition',
      'Interest rate parity',
      'Forward contracts',
      'Options hedging',
      'Money market hedging',
      'Cost-benefit of hedging',
    ],
    sampleResponse: `MEMORANDUM

TO: CFO, Pacific Manufacturing Inc.
FROM: [Candidate Name], Financial Analyst, International Trade Advisors
DATE: [Current Date]
RE: Foreign Exchange Risk Analysis and Hedging Recommendations

Dear CFO,

Thank you for engaging our firm to analyze Pacific Manufacturing's currency exposure. Please find below my assessment and recommendations.

FOREIGN EXCHANGE EXPOSURE ANALYSIS

Pacific Manufacturing faces transaction exposure—the risk that exchange rate movements will affect the dollar value of your €5 million receivable between now and collection in 90 days.

Current Unhedged Position:
- At today's spot rate (€1 = $1.10): €5M = $5.5 million
- If the euro weakens to €1 = $1.05: €5M = $5.25 million (loss of $250,000)
- If the euro strengthens to €1 = $1.15: €5M = $5.75 million (gain of $250,000)

FORWARD RATE EXPLANATION

The 90-day forward rate of $1.08 is lower than the spot rate of $1.10. This reflects interest rate parity—because U.S. interest rates are higher than European rates following the Federal Reserve's rate increase, the dollar trades at a forward premium. This is not a prediction of future rates; rather, it prevents arbitrage between currency and interest rate markets.

HEDGING ALTERNATIVES

1. Forward Contract
Lock in the sale of €5 million at $1.08, guaranteeing receipt of $5.4 million. This eliminates both downside risk and upside potential.

2. Currency Options
Purchase a put option giving the right to sell €5 million at a specified rate. This provides downside protection while preserving upside potential, but requires paying an option premium.

3. Money Market Hedge
Borrow euros today, convert to dollars at the spot rate, and invest in dollar deposits. The euro receivable will repay the euro loan. This effectively locks in approximately the forward rate.

4. Remain Unhedged
Accept the currency risk, which may be appropriate if management has a view on currency direction or if natural offsets exist.

RECOMMENDATION

Given the significant exposure ($5.5 million) and 90-day time horizon, I recommend entering a forward contract to sell €5 million at the 90-day forward rate. This provides certainty for cash flow planning and eliminates currency risk at no upfront cost.

The forward rate of $1.08 results in receiving $5.4 million—$100,000 less than today's spot value, but this difference reflects the interest rate differential, not an expected loss.

I would be pleased to discuss these alternatives in more detail.

Respectfully,
[Candidate Name]`,
  },
  {
    id: 'wc_006',
    section: 'PREP',
    type: 'written_communication',
    topic: 'Financial Management - Capital Budgeting',
    difficulty: 'moderate',
    estimatedTime: 25,
    scenario: `You are a senior financial analyst at Innovative Solutions Inc., a technology company evaluating a major capital investment. The company is considering purchasing new automated manufacturing equipment with the following characteristics:

Investment Details:
- Initial cost: $2,000,000
- Expected useful life: 5 years
- Salvage value: $200,000
- Annual cash operating savings: $600,000
- Required rate of return: 12%
- Tax rate: 25%
- Depreciation: Straight-line for tax purposes

The CEO has asked for a comprehensive analysis before presenting to the Board.`,
    task: `Write a professional memo to the CEO of Innovative Solutions Inc. that:
1. Calculates and explains the Net Present Value (NPV) of the project
2. Calculates and explains the Internal Rate of Return (IRR)
3. Calculates and explains the Payback Period
4. Discusses the strengths and limitations of each method
5. Provides a recommendation based on your analysis

Your memo should demonstrate your understanding of capital budgeting concepts and be written in a professional business format.`,
    keyPoints: [
      'NPV calculation methodology',
      'IRR calculation and decision rule',
      'Payback period calculation',
      'Time value of money',
      'After-tax cash flows',
      'Depreciation tax shield',
    ],
    sampleResponse: `MEMORANDUM

TO: CEO, Innovative Solutions Inc.
FROM: [Candidate Name], Senior Financial Analyst
DATE: [Current Date]
RE: Capital Investment Analysis - Automated Manufacturing Equipment

Dear CEO,

I have completed the financial analysis of the proposed equipment purchase. Please find below my evaluation using multiple capital budgeting techniques.

CASH FLOW ANALYSIS

Annual depreciation: ($2,000,000 - $200,000) / 5 years = $360,000
Depreciation tax shield: $360,000 × 25% = $90,000
After-tax operating savings: $600,000 × (1 - 25%) = $450,000
Annual after-tax cash flow: $450,000 + $90,000 = $540,000
Year 5 additional: Salvage value $200,000 × (1 - 25%) = $150,000 after-tax

NET PRESENT VALUE ANALYSIS

Using the 12% required rate of return:
- PV of annual cash flows (Years 1-5): $540,000 × 3.6048 = $1,946,592
- PV of salvage value: $150,000 × 0.5674 = $85,110
- Total PV of inflows: $2,031,702
- Less: Initial investment: ($2,000,000)
- Net Present Value: $31,702

Decision: The positive NPV of $31,702 indicates the project creates shareholder value and exceeds the 12% required return. NPV is the preferred method as it measures absolute value creation and accounts for the time value of money.

INTERNAL RATE OF RETURN

Through interpolation, the IRR is approximately 12.7%.

Decision: The IRR of 12.7% exceeds the 12% required return, supporting project acceptance. However, IRR can give misleading results with non-conventional cash flows and may conflict with NPV when ranking mutually exclusive projects.

PAYBACK PERIOD

Cumulative cash flows:
- Year 1: $540,000
- Year 2: $1,080,000
- Year 3: $1,620,000
- Year 4: $2,160,000

Payback Period: 3 + ($380,000 / $540,000) = 3.7 years

Analysis: The investment is recovered within the 5-year life. However, payback ignores the time value of money and cash flows after the payback period, making it a supplementary rather than primary decision tool.

RECOMMENDATION

Based on the positive NPV and IRR exceeding the required return, I recommend proceeding with this investment. While the NPV of $31,702 represents a relatively modest return above the hurdle rate, the project creates value and improves operational efficiency.

Key considerations:
- The analysis assumes reliable cash flow estimates
- Sensitivity analysis on key variables is recommended
- Strategic benefits (quality, capacity) should also be considered

I am available to present this analysis to the Board.

Respectfully,
[Candidate Name]`,
  },
];

// Import section-specific WC tasks
import {
  AUD_WC_TASKS,
  FAR_WC_TASKS,
  REG_WC_TASKS,
  BAR_WC_TASKS,
  ISC_WC_TASKS,
  TCP_WC_TASKS,
  BEC_WC_TASKS,
  ALL_SECTION_WC_TASKS,
} from './section-wc-tasks';

// Import expanded WC tasks (comprehensive coverage)
import { WC_EXPANDED } from './wc-expanded';
import { CMA_ESSAY_TASKS } from '../../cma/essays';

// Re-export section-specific tasks
export {
  AUD_WC_TASKS,
  FAR_WC_TASKS,
  REG_WC_TASKS,
  BAR_WC_TASKS,
  ISC_WC_TASKS,
  TCP_WC_TASKS,
  BEC_WC_TASKS,
  ALL_SECTION_WC_TASKS,
  WC_EXPANDED,
};

// Combined: General PREP tasks + Section-specific tasks + Expanded
export const ALL_WC_TASKS = [...WRITTEN_COMMUNICATIONS, ...ALL_SECTION_WC_TASKS, ...WC_EXPANDED, ...CMA_ESSAY_TASKS];

// Helper functions
export const getWCByTopic = (topic: string) => {
  return ALL_WC_TASKS.filter((wc) =>
    wc.topic.toLowerCase().includes(topic.toLowerCase())
  );
};

export const getWCBySection = (section: string) => {
  return ALL_WC_TASKS.filter((wc) => wc.section === section);
};

export const getRandomWC = (section?: string) => {
  const tasks = section ? getWCBySection(section) : ALL_WC_TASKS;
  if (tasks.length === 0) return null;
  const index = Math.floor(Math.random() * tasks.length);
  return tasks[index];
};

export const getWCStats = () => {
  return {
    total: ALL_WC_TASKS.length,
    bySection: ALL_WC_TASKS.reduce((acc: Record<string, number>, wc) => {
      acc[wc.section] = (acc[wc.section] || 0) + 1;
      return acc;
    }, {}),
    byDifficulty: ALL_WC_TASKS.reduce((acc: Record<string, number>, wc) => {
      acc[wc.difficulty] = (acc[wc.difficulty] || 0) + 1;
      return acc;
    }, {}),
    topics: [...new Set(ALL_WC_TASKS.map((wc) => wc.topic))],
  };
};
