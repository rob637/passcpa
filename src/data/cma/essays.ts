import { WCTask } from '../../types';

export const CMA_ESSAY_TASKS: WCTask[] = [
  {
    id: 'cma_essay_001',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Performance Management and Internal Controls',
    difficulty: 'medium',
    estimatedTime: 30, // CMA essays are 30 mins each
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
    ]
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
    ]
  }
];
