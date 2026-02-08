/**
 * CMA Part 2, Section E: Investment Decisions - Questions Batch 2 (Q26-50)
 * Weight: 10% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-E: Investment Decisions
 * 
 * Topics covered:
 * - Advanced NPV Analysis
 * - Modified Internal Rate of Return (MIRR)
 * - Profitability Index
 * - Real Options
 * - Post-Audit of Capital Projects
 */

import { Question } from '../../../types';

export const CMA2E_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // Advanced NPV Analysis
  // ==========================================
  {
    id: 'cma2-e-026',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Net Present Value',
    subtopic: 'NPV Decision Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A project has an NPV of $50,000 at a 10% discount rate and an NPV of -$20,000 at a 15% discount rate. The IRR is:',
    options: [
      'Less than 10%',
      'Between 10% and 15%',
      'Greater than 15%',
      'Exactly 12.5%'
    ],
    correctAnswer: 1,
    explanation: 'When NPV is positive at 10% and negative at 15%, the IRR (where NPV = 0) must fall between these rates. The IRR is the rate that makes NPV equal to zero.',
    reference: 'NPV and IRR Relationship',
  },
  {
    id: 'cma2-e-027',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Net Present Value',
    subtopic: 'Unequal Lives',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'When comparing mutually exclusive projects with different useful lives, the preferred method is:',
    options: [
      'Simply compare their NPVs',
      'Use the equivalent annual annuity (EAA) approach',
      'Choose the project with the higher IRR',
      'Use the payback period'
    ],
    correctAnswer: 1,
    explanation: 'The EAA (or annualized NPV) method converts NPV to an equivalent annual amount, enabling fair comparison of projects with different lives. Alternatively, the replacement chain method can be used.',
    reference: 'Unequal Project Lives; EAA Method',
  },
  {
    id: 'cma2-e-028',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Net Present Value',
    subtopic: 'Inflation Adjustment',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'If cash flows are estimated in nominal terms, the discount rate should:',
    options: [
      'Be a real rate without inflation',
      'Include expected inflation (nominal rate)',
      'Be the risk-free rate only',
      'Ignore the cost of capital'
    ],
    correctAnswer: 1,
    explanation: 'Consistency is key: nominal cash flows must be discounted at nominal rates; real cash flows at real rates. Mixing approaches produces incorrect valuations.',
    reference: 'Inflation in Capital Budgeting',
  },
  {
    id: 'cma2-e-029',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Net Present Value',
    subtopic: 'Terminal Value',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Terminal value in capital budgeting represents:',
    options: [
      'The initial investment amount',
      'Expected value of the project at the end of the analysis period',
      'Annual operating cash flows',
      'The total of all cash flows'
    ],
    correctAnswer: 1,
    explanation: 'Terminal value captures the project\'s worth at the end of the explicit forecast period, including salvage value of assets, recovery of working capital, or ongoing business value.',
    reference: 'Terminal Value; End-of-Project Cash Flows',
  },
  {
    id: 'cma2-e-030',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Net Present Value',
    subtopic: 'Sensitivity Analysis',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Sensitivity analysis in capital budgeting:',
    options: [
      'Provides a single point estimate of NPV',
      'Shows how NPV changes when one variable is altered',
      'Eliminates all uncertainty from the decision',
      'Is only used for small projects'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis examines how NPV changes when one input variable (sales, costs, discount rate) is changed while holding others constant, identifying key value drivers.',
    reference: 'Sensitivity Analysis; Risk Assessment',
  },

  // ==========================================
  // Modified Internal Rate of Return
  // ==========================================
  {
    id: 'cma2-e-031',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'MIRR',
    subtopic: 'MIRR Concept',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Modified Internal Rate of Return (MIRR) addresses which IRR limitation?',
    options: [
      'Time value of money',
      'Unrealistic reinvestment rate assumption',
      'Project size differences',
      'Tax effects'
    ],
    correctAnswer: 1,
    explanation: 'MIRR assumes intermediate cash flows are reinvested at the cost of capital (more realistic) rather than the IRR itself. This addresses IRR\'s potentially unrealistic reinvestment assumption.',
    reference: 'MIRR vs. IRR; Reinvestment Assumption',
  },
  {
    id: 'cma2-e-032',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'MIRR',
    subtopic: 'MIRR Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A project has Year 0 outflow of $10,000 and Year 3 inflow of $15,000 (FV of all inflows). MIRR is approximately:',
    options: [
      '14.5%',
      '12.6%',
      '50%',
      '10%'
    ],
    correctAnswer: 0,
    explanation: 'MIRR = (FV of inflows / PV of outflows)^(1/n) - 1 = ($15,000/$10,000)^(1/3) - 1 = 1.145 - 1 = 14.5%.',
    reference: 'MIRR Formula and Calculation',
  },
  {
    id: 'cma2-e-033',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'MIRR',
    subtopic: 'Multiple IRRs',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A project with non-conventional cash flows (outflows in later years) may have:',
    options: [
      'No IRR',
      'Multiple IRRs',
      'Negative MIRR',
      'Undefined NPV'
    ],
    correctAnswer: 1,
    explanation: 'Non-conventional cash flows (sign changes more than once) can produce multiple IRRs, making the IRR unreliable. MIRR provides a single, more reliable answer.',
    reference: 'Multiple IRRs; Non-Conventional Cash Flows',
  },

  // ==========================================
  // Profitability Index
  // ==========================================
  {
    id: 'cma2-e-034',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Profitability Index',
    subtopic: 'PI Formula',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The Profitability Index (PI) is calculated as:',
    options: [
      'NPV / Initial Investment',
      'PV of future cash flows / Initial Investment',
      'Initial Investment / NPV',
      'Annual Cash Flow / Initial Investment'
    ],
    correctAnswer: 1,
    explanation: 'PI = PV of future cash flows / Initial Investment. A PI > 1 indicates a profitable project. Note: PI can also be expressed as (NPV + Initial Investment) / Initial Investment.',
    reference: 'Profitability Index Formula',
  },
  {
    id: 'cma2-e-035',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Profitability Index',
    subtopic: 'PI Decision Rule',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A project with a profitability index of 0.95 should generally be:',
    options: [
      'Accepted because it covers 95% of costs',
      'Rejected because PI < 1 indicates NPV < 0',
      'Accepted if IRR exceeds cost of capital',
      'Evaluated using payback instead'
    ],
    correctAnswer: 1,
    explanation: 'A PI less than 1.0 means the present value of inflows is less than the initial investment, indicating a negative NPV. The project destroys value and should be rejected.',
    reference: 'PI Decision Rules',
  },
  {
    id: 'cma2-e-036',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Profitability Index',
    subtopic: 'Capital Rationing',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Under capital rationing, projects should be ranked by:',
    options: [
      'Total NPV from highest to lowest',
      'Profitability Index from highest to lowest',
      'IRR from lowest to highest',
      'Initial investment from smallest to largest'
    ],
    correctAnswer: 1,
    explanation: 'Under capital rationing (limited budget), ranking by PI maximizes total NPV per dollar invested. This helps select the combination of projects that maximizes value within constraints.',
    reference: 'Capital Rationing; PI Ranking',
  },

  // ==========================================
  // Real Options
  // ==========================================
  {
    id: 'cma2-e-037',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Real Options',
    subtopic: 'Option Types',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The option to expand a successful project in the future is an example of a:',
    options: [
      'Put option',
      'Growth option',
      'Abandonment option',
      'Flexibility option'
    ],
    correctAnswer: 1,
    explanation: 'A growth (or expansion) option allows management to increase investment in a successful project. Other real options include abandonment, timing, and flexibility options.',
    reference: 'Real Options; Types of Options',
  },
  {
    id: 'cma2-e-038',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Real Options',
    subtopic: 'Option Value',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Traditional NPV analysis may undervalue a project when:',
    options: [
      'Cash flows are certain',
      'No future flexibility exists',
      'Significant managerial flexibility exists',
      'The discount rate is too low'
    ],
    correctAnswer: 2,
    explanation: 'Traditional NPV ignores the value of managerial flexibility (real options). Projects with expansion, abandonment, or timing options are worth more than static NPV suggests.',
    reference: 'Real Options Value; Strategic NPV',
  },
  {
    id: 'cma2-e-039',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Real Options',
    subtopic: 'Abandonment Option',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An abandonment option is most valuable when:',
    options: [
      'Project outcomes are highly certain',
      'There is high uncertainty and a significant salvage value',
      'The project has no alternative uses',
      'Management cannot change course'
    ],
    correctAnswer: 1,
    explanation: 'Abandonment options provide value when uncertainty is high (potential for poor outcomes) and assets can be sold or redeployed (salvage value), limiting downside losses.',
    reference: 'Abandonment Option; Risk Management',
  },
  {
    id: 'cma2-e-040',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Real Options',
    subtopic: 'Timing Option',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'The value of waiting to invest (timing option) increases with:',
    options: [
      'Lower uncertainty about future conditions',
      'Higher uncertainty and irreversibility of investment',
      'Lower cost of capital',
      'Shorter project life'
    ],
    correctAnswer: 1,
    explanation: 'Waiting has most value when: (1) uncertainty is high—more information will arrive, and (2) investment is largely irreversible. Low uncertainty or reversible investments favor immediate action.',
    reference: 'Timing Options; Option to Wait',
  },

  // ==========================================
  // Post-Audit of Capital Projects
  // ==========================================
  {
    id: 'cma2-e-041',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Post-Audit',
    subtopic: 'Purpose',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The primary purpose of a post-audit of capital projects is to:',
    options: [
      'Punish managers for poor decisions',
      'Compare actual results to projections and improve future decisions',
      'Calculate exact NPV after project completion',
      'Determine tax implications'
    ],
    correctAnswer: 1,
    explanation: 'Post-audits compare actual outcomes to forecasts, identify reasons for variances, and generate learning to improve future capital budgeting accuracy. They are not punitive.',
    reference: 'Post-Audit; Capital Budgeting Process',
  },
  {
    id: 'cma2-e-042',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Post-Audit',
    subtopic: 'Timing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Post-audits should typically be conducted:',
    options: [
      'Immediately after approval',
      'After sufficient time for results to materialize',
      'Only for failed projects',
      'Before the project begins'
    ],
    correctAnswer: 1,
    explanation: 'Post-audits occur after enough operating history exists to compare actual vs. projected performance—often 1-3 years after project completion or stabilization.',
    reference: 'Post-Audit Timing',
  },
  {
    id: 'cma2-e-043',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Post-Audit',
    subtopic: 'Benefits',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A key benefit of post-audits is:',
    options: [
      'Guaranteeing future project success',
      'Reducing optimism bias in future proposals',
      'Eliminating all project risk',
      'Avoiding the need for NPV analysis'
    ],
    correctAnswer: 1,
    explanation: 'When managers know their forecasts will be audited, they tend to provide more realistic estimates, reducing optimism bias and improving forecast accuracy.',
    reference: 'Post-Audit Benefits; Accountability',
  },

  // ==========================================
  // Capital Budgeting Risk Analysis
  // ==========================================
  {
    id: 'cma2-e-045',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Risk Analysis',
    subtopic: 'Monte Carlo Simulation',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'Monte Carlo simulation in capital budgeting:',
    options: [
      'Provides a single NPV estimate',
      'Generates a probability distribution of possible NPVs',
      'Eliminates the need for discount rates',
      'Uses only historical data'
    ],
    correctAnswer: 1,
    explanation: 'Monte Carlo simulation runs thousands of trials with random draws from input distributions, producing a probability distribution of NPV outcomes showing likelihood of various results.',
    reference: 'Monte Carlo Simulation; Risk Modeling',
  },
  {
    id: 'cma2-e-046',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Risk Analysis',
    subtopic: 'Risk-Adjusted Discount Rate',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A risk-adjusted discount rate (RADR) is used to:',
    options: [
      'Reduce all project cash flows equally',
      'Incorporate project-specific risk into the discount rate',
      'Eliminate the effects of inflation',
      'Calculate payback period'
    ],
    correctAnswer: 1,
    explanation: 'RADR adds a risk premium to the base discount rate for riskier projects. Higher risk projects use higher rates, reducing NPV appropriately. Different projects may have different RADRs.',
    reference: 'Risk-Adjusted Discount Rate; Cost of Capital',
  },
  {
    id: 'cma2-e-047',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Risk Analysis',
    subtopic: 'Certainty Equivalent',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'The certainty equivalent approach adjusts for risk by:',
    options: [
      'Increasing the discount rate',
      'Converting risky cash flows to their certain equivalent values',
      'Using the highest possible cash flow estimates',
      'Ignoring salvage value'
    ],
    correctAnswer: 1,
    explanation: 'Certainty equivalent converts risky expected cash flows to smaller, certain amounts that investors would accept with indifference, then discounts at the risk-free rate.',
    reference: 'Certainty Equivalent; Risk Adjustment',
  },

  // ==========================================
  // Capital Budgeting Methods Comparison
  // ==========================================
  {
    id: 'cma2-e-048',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting Methods',
    subtopic: 'Method Comparison',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'NPV is generally preferred over IRR because NPV:',
    options: [
      'Is easier to calculate',
      'Directly measures value creation in dollars',
      'Does not require a discount rate',
      'Ignores the time value of money'
    ],
    correctAnswer: 1,
    explanation: 'NPV shows the actual dollar increase in shareholder wealth. IRR gives a rate of return but doesn\'t indicate value created and may conflict with NPV for mutually exclusive projects.',
    reference: 'NPV vs. IRR; Capital Budgeting Methods',
  },
  {
    id: 'cma2-e-049',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting Methods',
    subtopic: 'Project Size',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'When NPV and IRR rankings conflict for mutually exclusive projects of different sizes, the best approach is:',
    options: [
      'Always choose the higher IRR',
      'Choose the project with the higher NPV',
      'Use payback period to decide',
      'Average the two methods'
    ],
    correctAnswer: 1,
    explanation: 'NPV measures actual value creation in dollars. When conflicts occur (often due to scale differences), choosing the higher NPV project maximizes shareholder wealth.',
    reference: 'NPV vs. IRR Conflict; Scale Differences',
  },
  {
    id: 'cma2-e-050',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting Methods',
    subtopic: 'Discounted Payback',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Discounted payback period improves upon simple payback by:',
    options: [
      'Ignoring cash flows after payback',
      'Incorporating the time value of money',
      'Eliminating the need for cash flow estimates',
      'Providing an exact NPV'
    ],
    correctAnswer: 1,
    explanation: 'Discounted payback calculates time to recover the initial investment using present values of cash flows, addressing simple payback\'s failure to consider time value of money.',
    reference: 'Discounted Payback Period',
  }
];
