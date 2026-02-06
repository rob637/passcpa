/**
 * CMA Part 2, Section E: Investment Decisions - Questions Batch 1 (Q1-25)
 * Weight: 10% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-E: Investment Decisions
 * 
 * Topics covered:
 * - Capital Budgeting Process
 * - Net Present Value (NPV)
 * - Internal Rate of Return (IRR)
 * - Other Capital Budgeting Methods
 * - Risk Analysis in Capital Budgeting
 */

import { Question } from '../../../types';

export const CMA2E_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // Capital Budgeting Process
  // ==========================================
  {
    id: 'cma2-e-001',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Project Types',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Mutually exclusive projects are projects where:',
    options: [
      'Both projects can be accepted simultaneously',
      'Accepting one project means rejecting the other',
      'Projects must be completed in sequence',
      'Projects share no common resources'
    ],
    correctAnswer: 1,
    explanation: 'Mutually exclusive projects are alternatives that serve the same purpose—only one can be selected. For example, choosing between building Factory A or Factory B. Independent projects can all be accepted if profitable.',
    reference: 'Project Types; Mutually Exclusive',
  },
  {
    id: 'cma2-e-002',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Capital Budgeting Steps',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The first step in the capital budgeting process is typically:',
    options: [
      'Calculating NPV',
      'Identifying and generating investment proposals',
      'Determining the payback period',
      'Calculating depreciation'
    ],
    correctAnswer: 1,
    explanation: 'Capital budgeting begins with identifying potential investments aligned with strategy. Steps include: identify proposals, estimate cash flows, evaluate using capital budgeting techniques, select projects, implement, and monitor.',
    reference: 'Capital Budgeting Process',
  },
  {
    id: 'cma2-e-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Relevant Cash Flows',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which is a relevant cash flow for capital budgeting?',
    options: [
      'Sunk costs from prior research',
      'Allocated corporate overhead',
      'Incremental operating cash flows from the project',
      'Book value of existing equipment'
    ],
    correctAnswer: 2,
    explanation: 'Only incremental cash flows—those that occur as a result of the investment decision—are relevant. Sunk costs, allocated overhead (that won\'t change), and book values are irrelevant.',
    reference: 'Relevant Cash Flows; Incremental Analysis',
  },
  {
    id: 'cma2-e-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Opportunity Cost',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company will use an owned building (current market value $500,000) for a new project. The opportunity cost is:',
    options: [
      'Zero, since the building is already owned',
      'The book value of the building',
      'The $500,000 that could be received by selling it',
      'The original purchase price'
    ],
    correctAnswer: 2,
    explanation: 'Opportunity cost is the value of the best alternative forgone. By using the building, the company foregoes the $500,000 sale proceeds. This must be included as a cost of the project.',
    reference: 'Opportunity Cost; Capital Budgeting',
  },

  // ==========================================
  // Net Present Value (NPV)
  // ==========================================
  {
    id: 'cma2-e-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'NPV',
    subtopic: 'NPV Concept',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A positive NPV indicates that a project:',
    options: [
      'Should be rejected',
      'Generates returns exceeding the required rate of return',
      'Has a payback period of less than one year',
      'Has no risk'
    ],
    correctAnswer: 1,
    explanation: 'Positive NPV means the present value of cash inflows exceeds the initial investment, indicating the project returns more than the required rate (cost of capital). Positive NPV projects create shareholder value.',
    reference: 'NPV Decision Rule; Value Creation',
  },
  {
    id: 'cma2-e-006',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'NPV',
    subtopic: 'NPV Calculation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A project costs $100,000 and generates $30,000 annually for 5 years. At 10% discount rate (PV factor of annuity = 3.791), the NPV is approximately:',
    options: [
      '$13,730',
      '-$13,730',
      '$50,000',
      'Zero'
    ],
    correctAnswer: 0,
    explanation: 'NPV = PV of inflows - Initial cost = ($30,000 × 3.791) - $100,000 = $113,730 - $100,000 = $13,730. Since NPV is positive, accept the project.',
    reference: 'NPV Calculation',
  },
  {
    id: 'cma2-e-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'NPV',
    subtopic: 'Discount Rate Selection',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The appropriate discount rate for NPV analysis of a typical project is:',
    options: [
      'The risk-free rate',
      'The company\'s WACC or a risk-adjusted rate',
      'The inflation rate',
      'The prime lending rate'
    ],
    correctAnswer: 1,
    explanation: 'WACC represents the company\'s overall cost of capital. For projects with similar risk to the company, use WACC. For projects with different risk, adjust the discount rate accordingly.',
    reference: 'Discount Rate; Cost of Capital',
  },
  {
    id: 'cma2-e-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'NPV',
    subtopic: 'Mutually Exclusive Projects',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When comparing mutually exclusive projects using NPV:',
    options: [
      'Choose the project with the shortest payback',
      'Choose the project with the highest NPV',
      'Choose the project with the highest IRR',
      'Choose the smallest investment'
    ],
    correctAnswer: 1,
    explanation: 'For mutually exclusive projects, select the one with the highest NPV because NPV directly measures value creation. NPV reflects the absolute increase in shareholder wealth.',
    reference: 'NPV; Project Selection',
  },

  // ==========================================
  // Internal Rate of Return (IRR)
  // ==========================================
  {
    id: 'cma2-e-009',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'IRR',
    subtopic: 'IRR Definition',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The internal rate of return (IRR) is:',
    options: [
      'The average accounting return on the project',
      'The discount rate that makes NPV equal to zero',
      'The project\'s cash flow divided by its cost',
      'The market rate of interest'
    ],
    correctAnswer: 1,
    explanation: 'IRR is the discount rate at which the present value of cash inflows equals the initial investment (NPV = 0). It represents the project\'s expected rate of return.',
    reference: 'IRR Definition; Capital Budgeting',
  },
  {
    id: 'cma2-e-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'IRR',
    subtopic: 'IRR Decision Rule',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Using IRR, accept a project when:',
    options: [
      'IRR < required rate of return',
      'IRR > required rate of return',
      'IRR = 0',
      'IRR < inflation rate'
    ],
    correctAnswer: 1,
    explanation: 'Accept if IRR > required rate (hurdle rate/WACC). This means the project returns more than the cost of capital. If IRR < required rate, the project destroys value.',
    reference: 'IRR Decision Rule',
  },
  {
    id: 'cma2-e-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'IRR',
    subtopic: 'IRR Limitations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A limitation of IRR compared to NPV is that IRR:',
    options: [
      'Cannot be calculated for most projects',
      'May give multiple values or misleading rankings for non-conventional cash flows',
      'Is always lower than the cost of capital',
      'Requires knowing the discount rate in advance'
    ],
    correctAnswer: 1,
    explanation: 'IRR limitations include: multiple IRRs with non-conventional cash flows, reinvestment rate assumption (at IRR), and potentially conflicting rankings with NPV for mutually exclusive projects.',
    reference: 'IRR Limitations; NPV vs IRR',
  },
  {
    id: 'cma2-e-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'IRR',
    subtopic: 'Modified IRR',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Modified IRR (MIRR) differs from IRR by:',
    options: [
      'Using a different initial investment',
      'Assuming reinvestment at the cost of capital rather than the IRR',
      'Ignoring the time value of money',
      'Only considering cash inflows'
    ],
    correctAnswer: 1,
    explanation: 'MIRR assumes interim cash flows are reinvested at the cost of capital (more realistic than IRR\'s assumption of reinvestment at the IRR). MIRR also avoids the multiple IRR problem.',
    reference: 'Modified IRR; Reinvestment Assumption',
  },

  // ==========================================
  // Other Capital Budgeting Methods
  // ==========================================
  {
    id: 'cma2-e-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Payback Period',
    subtopic: 'Payback Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A project costs $200,000 and generates annual cash flows of $50,000. The payback period is:',
    options: [
      '2 years',
      '4 years',
      '5 years',
      '0.25 years'
    ],
    correctAnswer: 1,
    explanation: 'Payback period = Initial investment / Annual cash flow = $200,000 / $50,000 = 4 years. This is how long it takes to recover the initial investment.',
    reference: 'Payback Period Calculation',
  },
  {
    id: 'cma2-e-014',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Payback Period',
    subtopic: 'Payback Limitations',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A major weakness of the payback method is that it:',
    options: [
      'Is too complicated to calculate',
      'Ignores cash flows after the payback period and the time value of money',
      'Always gives the same answer as NPV',
      'Cannot be used for manufacturing projects'
    ],
    correctAnswer: 1,
    explanation: 'Payback ignores: (1) cash flows after payback period, (2) time value of money, and (3) project profitability. It measures liquidity/risk, not value creation. Discounted payback addresses TVM partially.',
    reference: 'Payback Limitations',
  },
  {
    id: 'cma2-e-015',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Profitability Index',
    subtopic: 'PI Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A project has NPV of $20,000 and initial investment of $100,000. The profitability index is:',
    options: [
      '0.20',
      '1.20',
      '5.00',
      '20%'
    ],
    correctAnswer: 1,
    explanation: 'Profitability Index = PV of inflows / Initial investment = ($100,000 + $20,000) / $100,000 = $120,000 / $100,000 = 1.20. PI > 1 indicates value creation. Alternatively, PI = 1 + (NPV/Investment).',
    reference: 'Profitability Index',
  },
  {
    id: 'cma2-e-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Profitability Index',
    subtopic: 'PI Usage',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The profitability index is most useful when:',
    options: [
      'All projects are independent',
      'Capital is rationed and projects must be ranked',
      'There is only one project to consider',
      'Time value of money is ignored'
    ],
    correctAnswer: 1,
    explanation: 'PI helps rank projects when capital is limited. It measures value created per dollar invested. With constrained capital, maximize PI to create the most total value from available funds.',
    reference: 'Profitability Index; Capital Rationing',
  },
  {
    id: 'cma2-e-017',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Accounting Rate of Return',
    subtopic: 'ARR Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Accounting rate of return (ARR) uses:',
    options: [
      'Cash flows and present values',
      'Average accounting income and average investment',
      'Only initial investment',
      'IRR as the benchmark'
    ],
    correctAnswer: 1,
    explanation: 'ARR = Average accounting income / Average investment. Unlike NPV/IRR, it uses accrual accounting profits, not cash flows, and ignores time value of money. It\'s simple but less reliable.',
    reference: 'Accounting Rate of Return',
  },

  // ==========================================
  // Cash Flow Analysis
  // ==========================================
  {
    id: 'cma2-e-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Cash Flows',
    subtopic: 'Initial Investment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When calculating initial investment for a replacement project, include:',
    options: [
      'Only the new equipment cost',
      'New equipment cost minus salvage value of old equipment (adjusted for taxes)',
      'Book value of old equipment',
      'Annual operating costs'
    ],
    correctAnswer: 1,
    explanation: 'Initial investment = Cost of new equipment - After-tax proceeds from old equipment. Include installation, working capital changes, and any tax effects from gain/loss on old equipment sale.',
    reference: 'Initial Investment; Replacement Analysis',
  },
  {
    id: 'cma2-e-019',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Cash Flows',
    subtopic: 'Depreciation Tax Shield',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Annual depreciation is $50,000 and the tax rate is 30%. The depreciation tax shield is:',
    options: [
      '$50,000',
      '$15,000',
      '$35,000',
      '$65,000'
    ],
    correctAnswer: 1,
    explanation: 'Depreciation tax shield = Depreciation × Tax rate = $50,000 × 30% = $15,000. Depreciation reduces taxable income, saving $15,000 in taxes. This is a cash inflow for NPV purposes.',
    reference: 'Depreciation Tax Shield; Tax Effects',
  },
  {
    id: 'cma2-e-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Cash Flows',
    subtopic: 'Terminal Cash Flow',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Terminal cash flows typically include:',
    options: [
      'Only depreciation for the final year',
      'Salvage value (after tax) and release of working capital',
      'Initial investment recovery',
      'First year operating cash flows'
    ],
    correctAnswer: 1,
    explanation: 'Terminal cash flows include: after-tax salvage value, recovery of working capital invested, and any site restoration costs. These occur at the end of the project life.',
    reference: 'Terminal Cash Flows; Project End',
  },

  // ==========================================
  // Risk Analysis
  // ==========================================
  {
    id: 'cma2-e-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Risk Analysis',
    subtopic: 'Sensitivity Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Sensitivity analysis in capital budgeting tests:',
    options: [
      'Only the best-case scenario',
      'How NPV changes when one variable is changed while others are held constant',
      'The average outcome of all scenarios',
      'The correlation between projects'
    ],
    correctAnswer: 1,
    explanation: 'Sensitivity analysis changes one variable at a time (e.g., sales volume, price, costs) to see its impact on NPV. It identifies which variables are most critical to project success.',
    reference: 'Sensitivity Analysis; Risk Assessment',
  },
  {
    id: 'cma2-e-022',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Risk Analysis',
    subtopic: 'Scenario Analysis',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Scenario analysis differs from sensitivity analysis by:',
    options: [
      'Only using one variable',
      'Changing multiple variables simultaneously to create different scenarios',
      'Ignoring risk entirely',
      'Never calculating NPV'
    ],
    correctAnswer: 1,
    explanation: 'Scenario analysis evaluates NPV under different sets of assumptions (best, worst, most likely). It changes multiple variables together to create coherent scenarios, unlike sensitivity analysis.',
    reference: 'Scenario Analysis; Capital Budgeting Risk',
  },
  {
    id: 'cma2-e-023',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Risk Analysis',
    subtopic: 'Risk-Adjusted Discount Rate',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A project riskier than the company average should be evaluated using:',
    options: [
      'A lower discount rate than WACC',
      'A higher discount rate than WACC',
      'Exactly the WACC',
      'No discount rate'
    ],
    correctAnswer: 1,
    explanation: 'Higher-risk projects require higher returns to compensate. Add a risk premium to WACC for above-average risk projects. This reduces NPV, making acceptance harder (appropriately so for riskier projects).',
    reference: 'Risk-Adjusted Discount Rate',
  },
  {
    id: 'cma2-e-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Real Options',
    subtopic: 'Option to Expand',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Real options in capital budgeting add value by:',
    options: [
      'Eliminating all project risk',
      'Providing management flexibility to adapt to future conditions',
      'Guaranteeing project success',
      'Reducing initial investment'
    ],
    correctAnswer: 1,
    explanation: 'Real options (expand, abandon, delay, switch) give management flexibility to respond to how the future unfolds. This flexibility has value not captured by traditional NPV. It adds to project value.',
    reference: 'Real Options; Strategic Flexibility',
  },
  {
    id: 'cma2-e-025',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-E',
    topic: 'Capital Budgeting',
    subtopic: 'Post-Audit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A post-audit of a capital project is performed to:',
    options: [
      'Calculate the initial NPV',
      'Compare actual results to projections and learn for future decisions',
      'Increase the project budget',
      'Terminate the project early'
    ],
    correctAnswer: 1,
    explanation: 'Post-audits compare actual cash flows and returns to projections, identifying why variances occurred. They provide accountability and improve future capital budgeting estimates.',
    reference: 'Post-Audit; Capital Budgeting Control',
  },
];

// Helper functions
export const getCMA2EQuestionsBatch1 = () => CMA2E_QUESTIONS_BATCH1;
export const getCMA2EQuestionCount = () => CMA2E_QUESTIONS_BATCH1.length;

export default CMA2E_QUESTIONS_BATCH1;
