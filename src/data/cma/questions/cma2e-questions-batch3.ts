/**
 * CMA Part 2, Section E: Investment Decisions - Questions Batch 3 (Q51-75)
 * Weight: 15% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-E: Investment Decisions
 * 
 * Topics covered:
 * - Advanced Capital Budgeting
 * - Real Options
 * - Project Risk Analysis
 * - Post-Audit and Review
 * - International Investment
 * - Special Investment Situations
 */

import { Question } from '../../../types';

export const CMA2E_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // Advanced Capital Budgeting
  // ==========================================
  {
    id: 'cma2-e-051',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Mutually Exclusive Projects',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'When comparing mutually exclusive projects of different sizes, the most appropriate method is:',
    options: [
      'Simple NPV comparison',
      'Profitability Index for capital rationing decisions',
      'Payback period only',
      'Accounting rate of return'
    ],
    correctAnswer: 1,
    explanation: 'For mutually exclusive projects of different sizes under capital rationing, Profitability Index (NPV/Investment) helps compare efficiency of capital use. However, NPV remains the primary criterion.',
    reference: 'Mutually Exclusive Projects',
  },
  {
    id: 'cma2-e-052',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'IRR Limitations',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A project with unconventional cash flows (multiple sign changes) may have:',
    options: [
      'A single unique IRR',
      'Multiple or no real IRR solutions',
      'An IRR always equal to WACC',
      'Guaranteed profitability'
    ],
    correctAnswer: 1,
    explanation: 'Non-conventional cash flows (e.g., negative-positive-negative pattern) can cause multiple IRRs or no real IRR. Modified IRR (MIRR) or NPV should be used instead.',
    reference: 'IRR Limitations',
  },
  {
    id: 'cma2-e-053',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Modified IRR',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Modified IRR (MIRR) addresses IRR limitations by:',
    options: [
      'Ignoring the time value of money',
      'Assuming reinvestment at a more realistic rate (usually WACC) rather than IRR itself',
      'Using only payback period',
      'Eliminating cash flow analysis'
    ],
    correctAnswer: 1,
    explanation: 'MIRR assumes intermediate cash flows are reinvested at the cost of capital (realistic) rather than at IRR (often unrealistic). MIRR also resolves multiple IRR problems.',
    reference: 'Modified IRR',
  },
  {
    id: 'cma2-e-054',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Equivalent Annual Annuity',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When comparing projects with different lives, the Equivalent Annual Annuity (EAA) method:',
    options: [
      'Ignores project life differences',
      'Converts each project\'s NPV into an equivalent annual amount for comparison',
      'Uses accounting profits instead of cash flows',
      'Only applies to perpetual projects'
    ],
    correctAnswer: 1,
    explanation: 'EAA converts NPV to an annuity over the project\'s life. Projects can then be compared on an annual basis regardless of different durations. Higher EAA is preferred.',
    reference: 'Equivalent Annual Annuity',
  },

  // ==========================================
  // Cash Flow Analysis
  // ==========================================
  {
    id: 'cma2-e-055',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Cash Flow Analysis',
    subtopic: 'Incremental Cash Flows',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When evaluating a new project, cannibalization of existing product sales represents:',
    options: [
      'A positive cash flow to include',
      'A reduction in incremental cash flows (opportunity cost)',
      'A sunk cost to ignore',
      'An allocated overhead'
    ],
    correctAnswer: 1,
    explanation: 'Cannibalization (lost sales of existing products) is a negative incremental effect that must reduce project cash flows. It\'s not a sunk cost—it\'s caused by the new project.',
    reference: 'Incremental Cash Flow Analysis',
  },
  {
    id: 'cma2-e-056',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Cash Flow Analysis',
    subtopic: 'Tax Shield',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A $500,000 asset is depreciated straight-line over 5 years. With a 25% tax rate, the annual depreciation tax shield is:',
    options: [
      '$100,000',
      '$25,000',
      '$125,000',
      '$75,000'
    ],
    correctAnswer: 1,
    explanation: 'Annual depreciation = $500,000 / 5 = $100,000. Tax shield = Depreciation × Tax rate = $100,000 × 0.25 = $25,000 annual cash savings.',
    reference: 'Depreciation Tax Shield',
  },
  {
    id: 'cma2-e-057',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Cash Flow Analysis',
    subtopic: 'Working Capital',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Working capital investment at the start of a project is:',
    options: [
      'An expense that reduces taxable income',
      'A cash outflow that is typically recovered at project end',
      'Always a sunk cost',
      'Never included in capital budgeting'
    ],
    correctAnswer: 1,
    explanation: 'Working capital (inventory, receivables net of payables) is invested at the start and recovered at termination. It\'s a cash flow, not a tax-deductible expense.',
    reference: 'Working Capital in Projects',
  },

  // ==========================================
  // Real Options
  // ==========================================
  {
    id: 'cma2-e-058',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Real Options',
    subtopic: 'Option to Expand',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The option to expand a successful project adds value because:',
    options: [
      'Expansion is mandatory',
      'It captures upside potential if demand exceeds expectations',
      'It eliminates all project risk',
      'Expansion costs are always zero'
    ],
    correctAnswer: 1,
    explanation: 'Expansion option allows scaling up if project succeeds. The asymmetric payoff (expand if good, don\'t if bad) adds value not captured by traditional NPV.',
    reference: 'Expansion Options',
  },
  {
    id: 'cma2-e-059',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Real Options',
    subtopic: 'Option to Abandon',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The abandonment option is valuable when:',
    options: [
      'Projects never fail',
      'Management can exit and recover salvage value if conditions deteriorate',
      'There is no salvage value',
      'All costs are sunk'
    ],
    correctAnswer: 1,
    explanation: 'Abandonment option limits downside—management can shut down and recover value rather than continuing unprofitable operations. Valuable when salvage value exceeds continuation value.',
    reference: 'Abandonment Options',
  },
  {
    id: 'cma2-e-060',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Real Options',
    subtopic: 'Option to Delay',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'When uncertainty is very high, the option to delay investment is valuable because:',
    options: [
      'Time always increases project value',
      'Waiting allows uncertainty to resolve before committing capital',
      'Delayed projects never face competition',
      'NPV is irrelevant'
    ],
    correctAnswer: 1,
    explanation: 'Delay option preserves flexibility—waiting gathers information, resolving uncertainty. Trade-off: delay costs (lost early cash flows, competitive entry) vs. information value.',
    reference: 'Timing Options',
  },

  // ==========================================
  // Project Risk Analysis
  // ==========================================
  {
    id: 'cma2-e-061',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Project Risk',
    subtopic: 'Scenario Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Scenario analysis in capital budgeting:',
    options: [
      'Uses only one set of assumptions',
      'Evaluates NPV under different combinations of assumptions (base, optimistic, pessimistic)',
      'Ignores uncertainty',
      'Only considers best case'
    ],
    correctAnswer: 1,
    explanation: 'Scenario analysis examines project outcomes under different situations (best/base/worst case), considering how multiple variables change together. Shows range of possible outcomes.',
    reference: 'Scenario Analysis',
  },
  {
    id: 'cma2-e-062',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Project Risk',
    subtopic: 'Sensitivity Analysis',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Sensitivity analysis identifies:',
    options: [
      'The optimal capital structure',
      'Which input variables have the greatest impact on NPV',
      'The exact future cash flows',
      'Tax optimization strategies'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis varies one input at a time (price, volume, cost) holding others constant, identifying which variables NPV is most sensitive to. Focuses attention on critical assumptions.',
    reference: 'Sensitivity Analysis',
  },
  {
    id: 'cma2-e-064',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Project Risk',
    subtopic: 'Risk-Adjusted Discount Rate',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'For a high-risk project, the company should:',
    options: [
      'Use a lower discount rate to increase NPV',
      'Use a higher discount rate reflecting the project\'s systematic risk',
      'Ignore risk in discount rate',
      'Use the risk-free rate'
    ],
    correctAnswer: 1,
    explanation: 'Higher-risk projects should use higher discount rates (risk-adjusted). CAPM can estimate project-specific rates using betas from comparable companies in that industry.',
    reference: 'Risk-Adjusted Discount Rates',
  },

  // ==========================================
  // Post-Audit and Review
  // ==========================================
  {
    id: 'cma2-e-065',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Post-Audit',
    subtopic: 'Purpose',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Post-investment audits serve to:',
    options: [
      'Only assign blame for failed projects',
      'Compare actual results to projections, improve future forecasting, and hold managers accountable',
      'Eliminate the need for future analysis',
      'Avoid all future capital investments'
    ],
    correctAnswer: 1,
    explanation: 'Post-audits compare actual vs. projected results to improve forecasting accuracy, identify systematic biases, hold managers accountable, and provide learning for future decisions.',
    reference: 'Post-Investment Audit',
  },
  {
    id: 'cma2-e-066',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Post-Audit',
    subtopic: 'Challenges',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A challenge in post-audit of capital projects is:',
    options: [
      'Actual results are always identical to forecasts',
      'Separating project performance from external environmental changes',
      'Audits are never performed in practice',
      'Cash flows are easy to measure retroactively'
    ],
    correctAnswer: 1,
    explanation: 'Isolating project performance is difficult—external factors (economy, competition, regulation) also affect outcomes. Comparing to original assumptions helps, but attribution is imprecise.',
    reference: 'Post-Audit Challenges',
  },

  // ==========================================
  // International Investment
  // ==========================================
  {
    id: 'cma2-e-067',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'International Investment',
    subtopic: 'Foreign Project Evaluation',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When evaluating a foreign investment, NPV should be calculated using:',
    options: [
      'Only local currency cash flows',
      'Cash flows converted to home currency at expected future exchange rates, discounted at home currency rate',
      'Current spot exchange rates for all periods',
      'Historical exchange rates'
    ],
    correctAnswer: 1,
    explanation: 'Convert foreign cash flows to home currency using expected future exchange rates (or forward rates), then discount at home currency risk-adjusted rate. Alternatively, use foreign rate with different risk premium.',
    reference: 'International Project Evaluation',
  },
  {
    id: 'cma2-e-068',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'International Investment',
    subtopic: 'Political Risk',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Political risk in international projects includes:',
    options: [
      'Only currency fluctuations',
      'Expropriation, regulatory changes, repatriation restrictions, and political instability',
      'Only natural disasters',
      'Only competition'
    ],
    correctAnswer: 1,
    explanation: 'Political risk: expropriation without compensation, adverse regulatory changes, blocked profit repatriation, civil unrest, government instability. May require insurance or risk premiums.',
    reference: 'Political Risk',
  },
  {
    id: 'cma2-e-069',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'International Investment',
    subtopic: 'Tax Considerations',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'International projects must consider:',
    options: [
      'Only home country taxes',
      'Both foreign and home country taxes, tax treaties, and transfer pricing',
      'No taxes on international income',
      'Only withholding taxes'
    ],
    correctAnswer: 1,
    explanation: 'International tax planning involves foreign taxes, home country taxes on repatriation, tax treaties to avoid double taxation, transfer pricing rules, and tax-efficient structures.',
    reference: 'International Tax Considerations',
  },

  // ==========================================
  // Special Investment Situations
  // ==========================================
  {
    id: 'cma2-e-070',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Special Investments',
    subtopic: 'Replacement Decisions',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'In replacement analysis, the relevant cash flows include:',
    options: [
      'Original cost of old equipment',
      'Incremental cash flows: savings, new investment, tax effects of sale/depreciation changes',
      'Only new equipment cost',
      'Historical operating costs'
    ],
    correctAnswer: 1,
    explanation: 'Replacement analysis: Compare keeping old vs. buying new. Relevant flows: incremental investment (new cost less old salvage), operating savings, depreciation/tax changes, terminal values.',
    reference: 'Replacement Analysis',
  },
  {
    id: 'cma2-e-071',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Special Investments',
    subtopic: 'Lease vs. Buy',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'In a lease vs. buy decision, the comparison should use:',
    options: [
      'Nominal undiscounted costs',
      'After-tax cash flows discounted at the after-tax cost of debt',
      'Before-tax costs at WACC',
      'Only upfront costs'
    ],
    correctAnswer: 1,
    explanation: 'Lease vs. buy compares after-tax cash flows: lease payments vs. purchase (depreciation tax shield, maintenance, residual value). Discount at after-tax cost of debt since lease is debt-like financing.',
    reference: 'Lease vs. Buy Analysis',
  },
  {
    id: 'cma2-e-072',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Special Investments',
    subtopic: 'R&D Investment',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'R&D investment decisions are complicated by:',
    options: [
      'Known and certain outcomes',
      'High uncertainty, long time horizons, and difficulty quantifying benefits',
      'Immediate cash returns',
      'No tax implications'
    ],
    correctAnswer: 1,
    explanation: 'R&D has uncertain outcomes, long payoff periods, option-like characteristics (abandon or expand), and benefits that are hard to quantify. Real options valuation may be appropriate.',
    reference: 'R&D Investment',
  },

  // ==========================================
  // Capital Budgeting Process
  // ==========================================
  {
    id: 'cma2-e-074',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting Process',
    subtopic: 'Qualitative Factors',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'Capital budgeting decisions should also consider:',
    options: [
      'Only quantitative NPV analysis',
      'Strategic fit, competitive positioning, regulatory compliance, and ESG factors',
      'Only payback period',
      'Executive preferences without analysis'
    ],
    correctAnswer: 1,
    explanation: 'Beyond NPV: strategic alignment, competitive advantage, regulatory requirements, ESG/sustainability, employee morale, customer relationships, and other qualitative factors matter.',
    reference: 'Qualitative Investment Factors',
  },
  {
    id: 'cma2-e-075',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting Process',
    subtopic: 'Authorization Levels',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Capital budgeting authorization levels ensure:',
    options: [
      'All projects bypass management review',
      'Projects above certain thresholds receive appropriate level of review and approval',
      'Only small projects are funded',
      'No accountability for investment decisions'
    ],
    correctAnswer: 1,
    explanation: 'Authorization limits ensure appropriate scrutiny: small projects approved by department managers, larger ones by senior management, major investments by the board. Matches risk to oversight.',
    reference: 'Capital Budget Authorization',
  }
];
