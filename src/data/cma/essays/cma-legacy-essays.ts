/**
 * Legacy CMA Essays
 * 
 * Originally from the root essays.ts file.
 * Merged into the essays/ directory for consistency.
 */
import { WCTask } from '../../../types';

export const CMA_LEGACY_ESSAYS: WCTask[] = [
  {
    id: 'cma_essay_001',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Performance Management and Internal Controls',
    difficulty: 'medium',
    estimatedTime: 30,
    scenario: `You are the Controller at Manufacturing Corp, a large public company. The new CEO has proposed eliminating the internal audit department to cut costs, arguing that the external auditors already provide sufficient assurance.
    
    Additionally, the production manager has been reporting favorable variances for the last three quarters by delaying necessary maintenance on machinery.`,
    task: `Write a memo to the CEO addressing the following:
    1. Explain the distinct roles of internal vs. external audit and why relying solely on external audit is risky (citing SOX requirements).
    2. Analyze the ethical and long-term financial implications of the production manager's actions (referencing the IMA Statement of Ethical Professional Practice).
    3. Recommend specific internal controls to prevent such manipulation of maintenance schedules.`,
    keyPoints: [
      'Internal audit focuses on operations, risk, and control; External audit focuses on financial statements.',
      'SOX requires management to certify internal controls (Section 404); Internal audit is crucial for this.',
      'Delaying maintenance creates short-term favorable variances but long-term costs/risks (Quality issues, machine failure).',
      'IMA Ethics: Competence (knowing the risk), Integrity (avoiding conflicts), Credibility (reporting fairly).',
      'Controls: Preventive maintenance schedules, non-financial performance metrics (equipment uptime), budget-to-actual variance analysis including non-financial data.'
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format with TO, FROM, DATE, RE fields',
          'Organizes response into three clear sections matching the task requirements',
          'Presents arguments in a logical sequence building to recommendations',
          'Includes a clear conclusion summarizing key points',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Clearly distinguishes internal audit (operational focus, risk, controls) from external audit (financial statement opinion)',
          'Cites SOX Section 404 management assessment and auditor attestation requirements',
          'Identifies that delaying maintenance inflates short-term variances but creates long-term asset impairment and safety risks',
          'References IMA Ethics: Competence, Integrity, Credibility, and Confidentiality',
          'Recommends specific preventive controls (maintenance schedules, non-financial KPIs, variance investigation thresholds)',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a memo to the CEO',
          'Employs correct terminology (SOX, COSO, internal controls, variance analysis)',
          'Writes in clear, concise sentences free of grammatical errors',
          'Avoids unnecessary jargon while maintaining technical accuracy',
        ],
      },
    },
  },
  {
    id: 'cma_essay_002',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Investment Decision and Risk Analysis',
    difficulty: 'hard',
    estimatedTime: 30,
    scenario: `GlobalTech is considering expanding into a volatile emerging market. The project requires an initial investment of $10 million.
    
    - The CFO favors using Net Present Value (NPV) for the analysis.
    - The Board is concerned about the high political risk and wants to use a shorter Payback Period as the primary criterion.
    - The Weighted Average Cost of Capital (WACC) is currently 10%, but the risk premium for this region suggests using 15%.`,
    task: `Prepare a report for the Board of Directors:
    1. Compare and contrast NPV and Payback Period as decision criteria. Why is NPV generally preferred for shareholder value?
    2. Explain how to adjust the capital budgeting analysis for higher risk (adjusting cash flows vs. adjusting discount rate).
    3. Recommend which discount rate (10% or 15%) should be used and justify your choice.`,
    keyPoints: [
      'NPV considers time value of money and total profitability; Payback ignores cash flows after cutoff.',
      'NPV aligns with maximizing shareholder wealth.',
      'Risk adjustment: Increasing discount rate (15%) forces the project to clear a higher hurdle, reflecting the risk.',
      'Alternatively, use Certainty Equivalent cash flows.',
      'Recommendation: Use 15% to reflect the specific project risk (CAPM principle), not the firm-wide WACC (10%), unless the project has the same risk profile as the firm.'
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper report format with clear headings for each section',
          'Organizes analysis into three distinct sections matching the task requirements',
          'Presents capital budgeting concepts before applying them to the specific scenario',
          'Includes a clear recommendation with supporting rationale',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Accurately contrasts NPV (considers TVM, all cash flows) with Payback Period (ignores TVM and post-cutoff flows)',
          'Explains why NPV maximizes shareholder wealth through positive NPV acceptance rule',
          'Distinguishes between adjusting discount rate (risk-adjusted rate) and adjusting cash flows (certainty equivalents)',
          'Correctly applies CAPM principle: project-specific risk warrants 15% over firm-wide 10% WACC',
          'Addresses the Board\'s concern about political risk with substantive analysis',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a board report',
          'Employs correct finance terminology (NPV, WACC, CAPM, risk premium, certainty equivalents)',
          'Writes in clear, concise sentences free of grammatical errors',
          'Balances technical accuracy with accessibility for board members',
        ],
      },
    },
  }
];
