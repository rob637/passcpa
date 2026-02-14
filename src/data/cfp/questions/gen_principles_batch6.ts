/**
 * CFP General Principles Questions - Batch 6
 * Domain 2: General Principles of Financial Planning (17% of exam)
 * 25 additional questions covering financial planning process
 */

import { Question } from '../../../types';

export const CFP_GEN_BATCH6_QUESTIONS: Question[] = [
  // GEN-1: Financial Planning Process
  {
    id: 'cfp-gen-b6-001',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Planning Process',
    subtopic: 'Understanding Client',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'During the "Understanding the Client\'s Personal and Financial Circumstances" step, the planner should:',
    options: [
      'C) Make assumptions based on client demographics',
      'B) Gather comprehensive quantitative data and explore qualitative factors including goals, values, and concerns',
      'A) Focus solely on investment accounts',
      'D) Skip non-financial information',
    ],
    correctAnswer: 1,
    explanation: 'Understanding the client requires both quantitative data (income, assets, liabilities, cash flows) and qualitative factors (goals, values, risk tolerance, family dynamics, concerns, expectations). The depth of discovery should match the engagement scope but always ensures sufficient information for recommendations.'
  },
  {
    id: 'cfp-gen-b6-002',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Planning Process',
    subtopic: 'Analyzing Information',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The analysis step of financial planning involves:',
    options: [
      'A) Simply inputting data into software',
      'C) Comparing to industry averages only',
      'B) Evaluating the client\'s current situation, identifying gaps, testing scenarios, and determining how to achieve goals',
      'D) Selecting products to recommend',
    ],
    correctAnswer: 2,
    explanation: 'Analysis goes beyond data compilation to evaluate current trajectory, identify shortfalls, test assumptions through scenarios, and determine what changes would help achieve goals. It integrates all planning domains and applies professional judgment beyond software outputs.'
  },
  {
    id: 'cfp-gen-b6-003',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Planning Process',
    subtopic: 'Presenting Recommendations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Effective presentation of financial planning recommendations requires:',
    options: [
      'C) Providing detailed calculations without explanation',
      'A) Reading through the financial plan document page by page',
      'B) Clear communication of priorities, trade-offs, and rationale in language the client understands, with opportunity for questions',
      'D) Mailing recommendations without meeting',
    ],
    correctAnswer: 2,
    explanation: 'Presentations should be client-focused, using appropriate language, visuals, and examples. Key recommendations should be prioritized, alternatives explained, trade-offs discussed, and the "why" behind recommendations clarified. Interactive dialogue ensures understanding and addresses questions before implementation.'
  },
  // GEN-2: Time Value of Money Applications
  {
    id: 'cfp-gen-b6-004',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Perpetuity',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A client wants to fund a $50,000 annual scholarship in perpetuity. At a 5% return assumption, the required endowment is:',
    options: [
      'C) $750,000',
      'A) $500,000',
      'B) $1,000,000',
      'D) $250,000',
    ],
    correctAnswer: 2,
    explanation: 'A perpetuity PV = Payment / Rate. $50,000 / 0.05 = $1,000,000. This amount invested at 5% generates $50,000 annually forever without depleting principal. This assumes constant returns and no inflation adjustment (inflation would require higher endowment or growing perpetuity formula).'
  },
  {
    id: 'cfp-gen-b6-005',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Real vs Nominal Returns',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a portfolio returns 7% nominal and inflation is 3%, the approximate real return is:',
    options: [
      'A) 10%',
      'B) 4%',
      'C) 3%',
      'D) 7%'
    ],
    correctAnswer: 1,
    explanation: 'Real return ≈ Nominal return - Inflation. 7% - 3% = 4%. More precisely: (1.07/1.03) - 1 = 3.88%. Real returns measure purchasing power growth. Financial planning should use consistent assumptions—either nominal returns with nominal spending needs, or real returns with constant-dollar spending.'
  },
  {
    id: 'cfp-gen-b6-006',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Amortization',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In an amortizing loan, early payments consist primarily of:',
    options: [
      'A) Principal',
      'B) Interest, with the principal portion increasing over time',
      'C) Equal amounts of principal and interest',
      'D) Fees only'
    ],
    correctAnswer: 1,
    explanation: 'Amortizing loans have constant payments but varying principal/interest composition. Early payments are mostly interest because the balance is highest. As the balance decreases, less interest accrues and more of each payment goes to principal. This is why prepayments early in a loan save more interest.'
  },
  // GEN-3: Financial Statements
  {
    id: 'cfp-gen-b6-007',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Financial Statements',
    subtopic: 'Cash Flow Statement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A personal cash flow statement helps identify:',
    options: [
      'B) Income sources, expense categories, and surplus or deficit available for savings/debt reduction',
      'C) Net worth only',
      'A) Only total assets owned',
      'D) Investment returns',
    ],
    correctAnswer: 0,
    explanation: 'Cash flow statements track money movement—income sources and amounts, fixed and variable expenses, and resulting surplus or deficit. This identifies where money goes, supports realistic budgeting, reveals savings capacity, and helps prioritize expense reduction or income enhancement.'
  },
  {
    id: 'cfp-gen-b6-008',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Financial Statements',
    subtopic: 'Debt Ratios',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The debt-to-income ratio is calculated as:',
    options: [
      'B) Monthly debt payments divided by gross monthly income',
      'C) Net worth divided by annual income',
      'A) Total assets divided by total liabilities',
      'D) Total debt divided by total assets',
    ],
    correctAnswer: 0,
    explanation: 'Debt-to-income (DTI) = Monthly debt payments / Gross monthly income. Lenders use this for mortgage qualification (typically <43% for QM). It measures debt burden relative to income capacity. Front-end ratio focuses on housing costs; back-end includes all debt payments.'
  },
  {
    id: 'cfp-gen-b6-009',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Financial Statements',
    subtopic: 'Liquidity Ratio',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The liquidity ratio measures:',
    options: [
      'C) Total debt as a percentage of assets',
      'B) The number of months of expenses covered by liquid assets',
      'A) Net worth growth over time',
      'D) Investment returns',
    ],
    correctAnswer: 1,
    explanation: 'Liquidity ratio = Liquid assets / Monthly expenses. It indicates emergency fund adequacy. A ratio of 3-6 is commonly recommended (3-6 months of expenses in accessible savings). Lower ratios indicate vulnerability to income disruption; higher may indicate excess cash earning low returns.'
  },
  // GEN-4: Economics and Environment
  {
    id: 'cfp-gen-b6-010',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Yield Curve',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An inverted yield curve (short-term rates higher than long-term rates) has historically been associated with:',
    options: [
      'B) Increased recession probability',
      'C) Rising inflation expectations',
      'A) Strong economic growth',
      'D) Bond bull markets',
    ],
    correctAnswer: 0,
    explanation: 'An inverted yield curve often precedes recessions—it indicates markets expect future rate cuts due to economic weakness. Normally, yields rise with maturity (upward slope). Inversion suggests near-term uncertainty exceeds long-term, often reflecting Fed tightening slowing the economy.'
  },
  {
    id: 'cfp-gen-b6-011',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Federal Reserve',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Federal Reserve\'s dual mandate includes:',
    options: [
      'B) Maximum employment and stable prices (targeting 2% inflation)',
      'C) Balancing the federal budget',
      'A) Maximizing tax revenue and minimizing debt',
      'D) Regulating stock markets',
    ],
    correctAnswer: 0,
    explanation: 'The Fed\'s dual mandate (from the Federal Reserve Act as amended) targets maximum sustainable employment and stable prices (2% inflation target). It uses tools like the federal funds rate, quantitative easing, and reserve requirements to pursue these goals, often facing trade-offs between them.'
  },
  {
    id: 'cfp-gen-b6-012',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Fiscal vs Monetary Policy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Fiscal policy differs from monetary policy in that fiscal policy:',
    options: [
      'C) Focuses only on interest rates',
      'A) Is controlled by the Federal Reserve',
      'B) Involves government spending and taxation decisions made by Congress and the President',
      'D) Operates independently of politics',
    ],
    correctAnswer: 2,
    explanation: 'Fiscal policy (taxation and government spending) is set by elected officials. Monetary policy (money supply, interest rates) is managed by the independent Federal Reserve. Both affect economic conditions but through different mechanisms and with different lag times.'
  },
  // GEN-1: More Process
  {
    id: 'cfp-gen-b6-013',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Planning Process',
    subtopic: 'Implementation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The implementation phase of financial planning may include:',
    options: [
      'A) Only activities the planner directly controls',
      'C) Developing recommendations',
      'B) Coordinating with other professionals, completing applications, transferring assets, and tracking action items',
      'D) Data gathering',
    ],
    correctAnswer: 2,
    explanation: 'Implementation translates recommendations into action. It may involve the planner directly (investment allocation), coordination with others (attorney for documents, CPA for tax strategies), and client action items (updating beneficiaries, insurance applications). Clear timelines and accountability improve follow-through.'
  },
  {
    id: 'cfp-gen-b6-014',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Planning Process',
    subtopic: 'Monitoring',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Monitoring the financial plan involves:',
    options: [
      'A) Annual meetings only',
      'B) Regular review of progress, updated analysis when circumstances change, and adjustment of recommendations as needed',
      'C) Checking investment performance exclusively',
      'D) Sending birthday cards'
    ],
    correctAnswer: 1,
    explanation: 'Monitoring ensures the plan remains appropriate as circumstances, goals, and markets change. It includes scheduled reviews, life event triggers, performance versus projections, and updating assumptions. The appropriate frequency depends on complexity and volatility of client circumstances.'
  },
  // GEN-2: More TVM
  {
    id: 'cfp-gen-b6-015',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Annuity Due vs Ordinary',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An annuity due differs from an ordinary annuity in that payments:',
    options: [
      'B) Occur at the beginning of each period in an annuity due, resulting in higher present and future values',
      'A) Are larger in an annuity due',
      'C) Are tax-deferred in an annuity due',
      'D) Last longer in an ordinary annuity',
    ],
    correctAnswer: 0,
    explanation: 'Annuity due pays at period start (rent, lease payments); ordinary annuity pays at period end (most loans). Beginning-of-period payments earn one more period of interest, making annuity due values higher by a factor of (1 + r). Most financial calculators have BEGIN/END mode for this.'
  },
  {
    id: 'cfp-gen-b6-016',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Uneven Cash Flows',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'To calculate NPV of uneven cash flows:',
    options: [
      'B) Discount each cash flow individually at the required rate and sum the present values',
      'A) Average the cash flows and use ordinary annuity formula',
      'C) Use only the final cash flow',
      'D) Ignore negative cash flows',
    ],
    correctAnswer: 0,
    explanation: 'Uneven cash flows require discounting each individually: NPV = Σ [CFt / (1+r)^t] - Initial Investment. This applies to real-world scenarios like varying rental income, business cash flows, or project returns. Financial calculators have cash flow (CF) functions for this.'
  },
  // GEN-3: More Statements
  {
    id: 'cfp-gen-b6-017',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Financial Statements',
    subtopic: 'Balance Sheet Analysis',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When analyzing a personal balance sheet, a high percentage of assets in a single investment or asset class indicates:',
    options: [
      'C) Superior expected returns',
      'B) Concentration risk that may require diversification',
      'A) Strong investment conviction',
      'D) Optimal asset allocation',
    ],
    correctAnswer: 1,
    explanation: 'Concentration (in company stock, real estate, or other single assets) creates risk if that asset declines. Analysis should identify concentration and evaluate whether it\'s appropriate given client risk capacity. Diversification strategies (staged selling, hedging, exchange funds) may be recommended.'
  },
  {
    id: 'cfp-gen-b6-018',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Financial Statements',
    subtopic: 'Asset Location',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When organizing asset location across accounts with different tax treatments:',
    options: [
      'C) Hold only bonds in all accounts',
      'B) Generally hold tax-efficient assets in taxable accounts and tax-inefficient assets in tax-advantaged accounts',
      'A) Hold the same allocation in all accounts',
      'D) Asset location doesn\'t affect returns',
    ],
    correctAnswer: 1,
    explanation: 'Asset location optimizes after-tax returns. Tax-efficient assets (index funds, stocks held long-term) suit taxable accounts; tax-inefficient assets (bonds generating ordinary income, REITs, actively traded funds) suit tax-advantaged accounts. Exceptions apply based on individual circumstances.'
  },
  // GEN-4: More Economics
  {
    id: 'cfp-gen-b6-019',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Business Cycles',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The four phases of a business cycle are:',
    options: [
      'C) Bull, bear, recovery, growth',
      'A) Growth, stagnation, decline, reset',
      'B) Expansion, peak, contraction (recession), trough',
      'D) Inflation, deflation, stagflation, growth',
    ],
    correctAnswer: 2,
    explanation: 'Business cycles move through expansion (growth, rising employment), peak (maximum activity), contraction/recession (declining output, rising unemployment), and trough (minimum activity) before expanding again. Duration and intensity vary. Understanding cycles helps with investment positioning and client expectations.'
  },
  {
    id: 'cfp-gen-b6-020',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Leading Indicators',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Leading economic indicators that tend to precede economic changes include:',
    options: [
      'C) CPI and interest rates',
      'B) Stock prices, building permits, consumer expectations, and initial unemployment claims',
      'A) GDP and unemployment rate',
      'D) Government spending levels',
    ],
    correctAnswer: 1,
    explanation: 'Leading indicators change before the economy changes direction: stock prices, building permits, consumer expectations, new orders, money supply, initial unemployment claims. Lagging indicators (unemployment rate, CPI changes) confirm trends. GDP is coincident, moving with the economy.'
  },
  // Additional Topics
  {
    id: 'cfp-gen-b6-021',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Planning Process',
    subtopic: 'Plan Document',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A comprehensive financial plan document typically includes:',
    options: [
      'A) Only investment recommendations',
      'C) Just a budget worksheet',
      'B) Executive summary, current situation analysis, goals, recommendations across planning areas, and action plan',
      'D) Only projection charts',
    ],
    correctAnswer: 2,
    explanation: 'Comprehensive plans document the engagement, current situation summary, stated goals, recommendations across relevant domains (investment, insurance, tax, retirement, estate), rationale, projections/scenarios, and action items. The format should match client preferences and engagement scope.'
  },
  {
    id: 'cfp-gen-b6-022',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Rate of Return',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'The internal rate of return (IRR) is the discount rate that:',
    options: [
      'C) Equals the risk-free rate',
      'A) Maximizes future value',
      'B) Makes the NPV of all cash flows equal to zero',
      'D) Is always positive',
    ],
    correctAnswer: 2,
    explanation: 'IRR is the discount rate where NPV = 0—the "break-even" return rate. It\'s used to evaluate investments and compare opportunities. Limitations include multiple IRRs with non-conventional cash flows, reinvestment rate assumptions, and scale ignorance (NPV often preferred for mutually exclusive projects).'
  },
  {
    id: 'cfp-gen-b6-023',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Financial Statements',
    subtopic: 'Savings Rate',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client\'s savings rate should be evaluated considering:',
    options: [
      'C) Only bank account deposits',
      'A) Only 401(k) contributions',
      'B) All additions to net worth including retirement contributions, debt principal payments, and taxable savings',
      'D) Investment returns',
    ],
    correctAnswer: 2,
    explanation: 'True savings rate includes all net worth increases from income: retirement contributions (including employer match), after-tax savings, and principal portion of debt payments. Investment returns aren\'t savings—they\'re returns on savings. Target rates depend on age, goals, and timeline.'
  },
  {
    id: 'cfp-gen-b6-024',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economic Concepts',
    subtopic: 'Dollar Cost Averaging',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Dollar cost averaging benefits investors by:',
    options: [
      'A) Guaranteeing profits',
      'B) Investing consistently regardless of market conditions, potentially lowering average cost and removing emotion from timing decisions',
      'C) Always outperforming lump-sum investing',
      'D) Eliminating market risk'
    ],
    correctAnswer: 1,
    explanation: 'DCA invests fixed amounts regularly, buying more shares when prices are low, fewer when high. It averages purchase prices and removes timing decisions. Research shows lump-sum usually outperforms (markets rise more than fall), but DCA reduces regret risk and suits regular income.'
  },
  {
    id: 'cfp-gen-b6-025',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Financial Planning Process',
    subtopic: 'Holistic Approach',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The holistic (comprehensive) approach to financial planning:',
    options: [
      'A) Focuses on only one planning area at a time',
      'B) Integrates all planning domains, recognizing interconnections between tax, investment, insurance, retirement, and estate decisions',
      'C) Recommends the same strategy for all clients',
      'D) Ignores behavioral factors'
    ],
    correctAnswer: 1,
    explanation: 'Holistic planning recognizes that planning areas interact—asset allocation affects taxes, retirement timing affects estate values, insurance needs depend on savings. Optimizing each area independently may produce suboptimal overall results. Integration ensures recommendations work together effectively.'
  }
];
