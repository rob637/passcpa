/**
 * CFP General Principles Questions - Batch 4
 * Domain 2: General Principles of Financial Planning (15% of exam)
 * 25 additional questions covering financial statements, time value, and education planning
 */

import { Question } from '../../../types';

export const CFP_GEN_BATCH4_QUESTIONS: Question[] = [
  // GEN-1: Financial Statements and Analysis
  {
    id: 'CFP-GEN-B4-001',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Statements',
    subtopic: 'Personal Balance Sheet',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Net worth on a personal balance sheet is calculated as:',
    options: [
      'A) Total assets plus total liabilities',
      'B) Total assets minus total liabilities',
      'C) Total income minus total expenses',
      'D) Liquid assets minus current liabilities'
    ],
    correctAnswer: 1,
    explanation: 'Net worth = Total assets - Total liabilities. This represents what the client owns minus what they owe. It is a snapshot of financial position at a specific point in time, unlike a cash flow statement which shows flows over a period.'
  },
  {
    id: 'CFP-GEN-B4-002',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Statements',
    subtopic: 'Liquidity Ratios',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client has liquid assets of $25,000 and monthly expenses of $5,000. Their emergency fund ratio is:',
    options: [
      'A) 3 months',
      'B) 5 months',
      'C) 6 months',
      'D) 12 months'
    ],
    correctAnswer: 1,
    explanation: 'Emergency fund ratio = Liquid assets ÷ Monthly expenses = $25,000 ÷ $5,000 = 5 months. Financial planners typically recommend 3-6 months of expenses in liquid reserves, though self-employed individuals or those in volatile industries may need more.'
  },
  {
    id: 'CFP-GEN-B4-003',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Statements',
    subtopic: 'Debt Ratios',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A household has gross monthly income of $10,000, a mortgage payment of $2,000, and other debt payments of $500. What is their total debt-to-income ratio?',
    options: [
      'A) 20%',
      'B) 25%',
      'C) 28%',
      'D) 36%'
    ],
    correctAnswer: 1,
    explanation: 'Total debt-to-income (back-end) ratio = Total debt payments ÷ Gross monthly income = ($2,000 + $500) ÷ $10,000 = 25%. Lenders typically prefer this ratio below 36%. The housing ratio (front-end) using only housing costs would be 20%.'
  },
  {
    id: 'CFP-GEN-B4-004',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Statements',
    subtopic: 'Savings Rate',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A client earns $120,000 annually and saves $18,000. Their savings rate is:',
    options: [
      'A) 10%',
      'B) 12%',
      'C) 15%',
      'D) 18%'
    ],
    correctAnswer: 2,
    explanation: 'Savings rate = Annual savings ÷ Annual income = $18,000 ÷ $120,000 = 15%. A healthy savings rate is typically 15-20% of gross income, including employer retirement contributions. Some planners recommend even higher rates for aggressive retirement goals.'
  },
  // GEN-2: Time Value of Money
  {
    id: 'CFP-GEN-B4-005',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Present Value',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'What is the present value of $10,000 to be received in 5 years at an 8% discount rate?',
    options: [
      'A) $6,209',
      'B) $6,806',
      'C) $7,350',
      'D) $8,000'
    ],
    correctAnswer: 1,
    explanation: 'PV = FV ÷ (1 + r)^n = $10,000 ÷ (1.08)^5 = $10,000 ÷ 1.4693 = $6,806. Present value discounts future cash flows to today\'s value using the time value of money principle that a dollar today is worth more than a dollar in the future.'
  },
  {
    id: 'CFP-GEN-B4-006',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Future Value',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If you invest $5,000 today at 6% annual interest compounded annually, what will it be worth in 10 years?',
    options: [
      'A) $8,000',
      'B) $8,954',
      'C) $9,500',
      'D) $10,000'
    ],
    correctAnswer: 1,
    explanation: 'FV = PV × (1 + r)^n = $5,000 × (1.06)^10 = $5,000 × 1.7908 = $8,954. Compound interest allows earnings on both principal and accumulated interest, demonstrating the power of time in wealth accumulation.'
  },
  {
    id: 'CFP-GEN-B4-007',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Rule of 72',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Using the Rule of 72, approximately how long will it take money to double at 9% annual interest?',
    options: [
      'A) 6 years',
      'B) 8 years',
      'C) 9 years',
      'D) 12 years'
    ],
    correctAnswer: 1,
    explanation: 'Rule of 72: Years to double = 72 ÷ Interest rate = 72 ÷ 9 = 8 years. This quick formula provides a reasonable approximation for doubling time. It can also be reversed: Required rate = 72 ÷ Years to double.'
  },
  {
    id: 'CFP-GEN-B4-008',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Annuities',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Which has a higher present value: an ordinary annuity or an annuity due, assuming the same payment amount, rate, and number of periods?',
    options: [
      'A) Ordinary annuity',
      'B) Annuity due',
      'C) They are equal',
      'D) Cannot be determined without more information'
    ],
    correctAnswer: 1,
    explanation: 'An annuity due has a higher present value because payments occur at the beginning of each period, receiving cash flows one period sooner. PV annuity due = PV ordinary annuity × (1 + r). The timing difference gives annuity due payments more time to discount.'
  },
  // GEN-3: Education Planning
  {
    id: 'CFP-GEN-B4-009',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: '529 Plans',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which statement about 529 education savings plans is TRUE?',
    options: [
      'A) Contributions are federally tax-deductible',
      'B) Earnings grow tax-free and qualified withdrawals are tax-free',
      'C) Plans can only be used for in-state colleges',
      'D) There is a maximum age limit for beneficiaries'
    ],
    correctAnswer: 1,
    explanation: 'Section 529 plans offer tax-free growth and tax-free withdrawals for qualified education expenses. Contributions are not federally deductible but may receive state tax deductions. Plans can be used at any accredited institution nationwide, and there is no age limit for beneficiaries.'
  },
  {
    id: 'CFP-GEN-B4-010',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: 'Coverdell ESA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A key advantage of Coverdell ESAs over 529 plans is:',
    options: [
      'A) Higher contribution limits',
      'B) No income limits for contributors',
      'C) Can be used for K-12 private school and expenses like computers',
      'D) State tax deductions are always available'
    ],
    correctAnswer: 2,
    explanation: 'Coverdell ESAs can pay for K-12 expenses and qualified equipment like computers, offering more flexibility than 529 plans traditionally did (though 529s now cover K-12 tuition). However, Coverdells are limited to $2,000/year contributions and have income phase-outs for contributors.'
  },
  {
    id: 'CFP-GEN-B4-011',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: 'UGMA/UTMA',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A major disadvantage of UGMA/UTMA accounts is:',
    options: [
      'A) Earnings are never taxable',
      'B) The child gains control at the age of majority',
      'C) Funds cannot be invested in stocks',
      'D) There are strict contribution limits'
    ],
    correctAnswer: 1,
    explanation: 'UGMA/UTMA custodial accounts are irrevocable gifts. When the child reaches the age of majority (18 or 21 depending on state), they gain full control and can use the funds for any purpose—not just education. This lack of control is a significant planning concern.'
  },
  {
    id: 'CFP-GEN-B4-012',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: 'Financial Aid Impact',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'For financial aid purposes, which asset has the LEAST impact on Expected Family Contribution (EFC)?',
    options: [
      'A) UGMA account in child\'s name',
      'B) 529 plan owned by the parent',
      'C) 529 plan owned by grandparent',
      'D) Savings account in child\'s name'
    ],
    correctAnswer: 2,
    explanation: 'Grandparent-owned 529 plans are not reported as assets on the FAFSA (using SAI methodology). However, distributions were historically counted as student income. Under newer FAFSA rules (2024+), distributions from grandparent 529s are no longer counted as income, making them very advantageous for financial aid.'
  },
  // GEN-4: Planning Process
  {
    id: 'CFP-GEN-B4-013',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Planning Process',
    subtopic: 'Data Gathering',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'During the data-gathering phase, quantitative information includes ALL of the following EXCEPT:',
    options: [
      'A) Income and expense data',
      'B) Risk tolerance and values',
      'C) Insurance policy details',
      'D) Account balances and statements'
    ],
    correctAnswer: 1,
    explanation: 'Risk tolerance and values are qualitative (subjective) data, not quantitative. Quantitative data includes measurable numerical information: income, expenses, assets, liabilities, insurance amounts, and account balances. Both types are essential for comprehensive financial planning.'
  },
  {
    id: 'CFP-GEN-B4-014',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Planning Process',
    subtopic: 'CFP Process Steps',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The financial planning process begins with:',
    options: [
      'A) Analyzing the client\'s current financial situation',
      'B) Establishing and defining the client-planner relationship',
      'C) Developing financial planning recommendations',
      'D) Presenting the financial plan'
    ],
    correctAnswer: 1,
    explanation: 'The 7-step CFP financial planning process starts with establishing and defining the client-planner relationship, including scope of engagement, responsibilities, and compensation. This comes before gathering data, analyzing the situation, or making recommendations.'
  },
  {
    id: 'CFP-GEN-B4-015',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Planning Process',
    subtopic: 'Implementation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'During implementation, the CFP® professional\'s role typically includes:',
    options: [
      'A) Making all decisions for the client',
      'B) Coordinating with other professionals and assisting client action',
      'C) Guaranteeing investment results',
      'D) Taking over the client\'s accounts directly'
    ],
    correctAnswer: 1,
    explanation: 'During implementation, the CFP® professional coordinates with other professionals (attorneys, CPAs, insurance agents), assists the client in taking action, and may execute recommendations within their authority. The client ultimately makes decisions; the planner facilitates and coordinates.'
  },
  // GEN-1: Additional Financial Statement Topics
  {
    id: 'CFP-GEN-B4-016',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Statements',
    subtopic: 'Cash Flow Statement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A positive cash flow on a personal cash flow statement indicates:',
    options: [
      'A) High net worth',
      'B) Income exceeds expenses, allowing for saving',
      'C) The client has no debt',
      'D) Investment returns are positive'
    ],
    correctAnswer: 1,
    explanation: 'Positive cash flow means income exceeds expenses during the period, leaving surplus for saving, investing, or debt reduction. Cash flow is a flow measure (period of time), while net worth is a stock measure (point in time). Positive cash flow does not guarantee high net worth or absence of debt.'
  },
  {
    id: 'CFP-GEN-B4-017',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Statements',
    subtopic: 'Asset Classification',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Which is classified as a USE asset rather than an investment asset?',
    options: [
      'A) Rental property',
      'B) Stock portfolio',
      'C) Primary residence',
      'D) 401(k) account'
    ],
    correctAnswer: 2,
    explanation: 'Use assets are personal property used for lifestyle (primary residence, automobiles, furniture). Investment assets generate income or appreciate (rental property, stocks, retirement accounts). The distinction matters for liquidity analysis and retirement planning—use assets don\'t typically generate retirement income.'
  },
  // GEN-2: Additional TVM Topics
  {
    id: 'CFP-GEN-B4-018',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'NPV and IRR',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A project with a Net Present Value (NPV) greater than zero indicates:',
    options: [
      'A) The project will definitely be profitable',
      'B) The project\'s return exceeds the discount rate used',
      'C) The project has no risk',
      'D) The payback period is less than one year'
    ],
    correctAnswer: 1,
    explanation: 'A positive NPV means the project\'s expected return exceeds the discount rate (required rate of return). The investment adds value beyond the minimum acceptable return. NPV > 0 suggests acceptance; NPV < 0 suggests rejection. This is a key capital budgeting decision rule.'
  },
  {
    id: 'CFP-GEN-B4-019',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Inflation Adjustment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If the nominal interest rate is 7% and inflation is 3%, the real (inflation-adjusted) rate of return is approximately:',
    options: [
      'A) 3%',
      'B) 4%',
      'C) 7%',
      'D) 10%'
    ],
    correctAnswer: 1,
    explanation: 'Real rate ≈ Nominal rate - Inflation rate = 7% - 3% = 4%. The Fisher equation provides a more precise calculation: (1 + nominal) = (1 + real) × (1 + inflation), but the approximation is commonly used. Real returns reflect actual purchasing power growth.'
  },
  {
    id: 'CFP-GEN-B4-020',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Serial Payments',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Serial payments differ from level annuity payments in that serial payments:',
    options: [
      'A) Are always smaller than annuity payments',
      'B) Increase each period by a constant percentage (often inflation)',
      'C) End at a predetermined date',
      'D) Require compound interest calculations'
    ],
    correctAnswer: 1,
    explanation: 'Serial payments increase each period by a constant percentage, typically the inflation rate. This maintains purchasing power throughout retirement. Level annuity payments remain constant, losing purchasing power over time. Serial payment analysis is used in retirement income planning.'
  },
  // GEN-3: Additional Education Planning
  {
    id: 'CFP-GEN-B4-021',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: '529 Superfunding',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The 529 plan "superfunding" provision allows a contributor to:',
    options: [
      'A) Contribute up to $1 million in a single year',
      'B) Front-load 5 years of annual gift exclusion amounts without gift tax',
      'C) Deduct contributions on federal taxes',
      'D) Avoid all estate taxes on the contribution'
    ],
    correctAnswer: 1,
    explanation: 'Superfunding allows contributors to make 5 years of gift exclusion contributions ($19,000 × 5 = $95,000 per donor in 2025) in a single year without using lifetime gift exemption, as long as no additional gifts are made to that beneficiary for 5 years. This accelerates tax-advantaged growth.'
  },
  {
    id: 'CFP-GEN-B4-022',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Education Planning',
    subtopic: 'Series I Bonds',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Education savings using Series I or EE bonds may provide tax-free interest if:',
    options: [
      'A) The bonds are held for at least one year',
      'B) The proceeds are used for qualified education expenses and income limits are met',
      'C) The bonds are given to the child',
      'D) Any college expenses are paid'
    ],
    correctAnswer: 1,
    explanation: 'The education tax exclusion for savings bonds requires: bonds purchased after 1989 by someone age 24+, proceeds used for qualified higher education expenses, income below phase-out limits, and bonds owned by taxpayer (not child). If conditions are met, interest is tax-free.'
  },
  // GEN-4: Additional Process Topics
  {
    id: 'CFP-GEN-B4-023',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Planning Process',
    subtopic: 'Monitoring',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The final step in the financial planning process involves:',
    options: [
      'A) Presenting the financial plan to the client',
      'B) Implementing the financial plan recommendations',
      'C) Monitoring the plan and making adjustments',
      'D) Collecting fees for services rendered'
    ],
    correctAnswer: 2,
    explanation: 'The 7th step is monitoring progress and updating the plan. Financial planning is an ongoing process, not a one-time event. Planners review progress, note life changes, adjust recommendations, and maintain the client relationship over time. This ensures the plan remains relevant.'
  },
  {
    id: 'CFP-GEN-B4-024',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Planning Process',
    subtopic: 'Scope of Engagement',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Before beginning a financial planning engagement, it is MOST important to:',
    options: [
      'A) Collect all financial documents',
      'B) Establish mutual understanding of services, responsibilities, and compensation',
      'C) Prepare preliminary investment recommendations',
      'D) Run a credit check on the client'
    ],
    correctAnswer: 1,
    explanation: 'Establishing the scope of engagement—including services provided, client and planner responsibilities, how compensation works, and disclosure of conflicts—must occur before any planning work begins. This protects both parties and ensures alignment of expectations.'
  },
  {
    id: 'CFP-GEN-B4-025',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Planning Process',
    subtopic: 'Life Cycle Planning',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'According to life cycle financial planning, which stage typically has the highest risk tolerance and longest time horizon?',
    options: [
      'A) Early career / accumulation phase',
      'B) Mid-career / consolidation phase',
      'C) Pre-retirement / preservation phase',
      'D) Retirement / distribution phase'
    ],
    correctAnswer: 0,
    explanation: 'Young investors in the early career/accumulation phase have the longest time horizon, highest human capital, and generally highest risk tolerance. They can recover from market downturns over decades. As investors age, time horizon shortens and risk tolerance typically decreases.'
  }
];
