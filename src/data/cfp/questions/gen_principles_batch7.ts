/**
 * CFP General Principles Questions - Batch 7
 * Domain 2: General Principles of Financial Planning (17% of exam)
 * 25 additional questions covering financial planning fundamentals
 */

import { Question } from '../../../types';

export const CFP_GEN_BATCH7_QUESTIONS: Question[] = [
  // GEN-1: Financial Planning Process
  {
    id: 'CFP-GEN-B7-001',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Monitoring and Updating',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The monitoring phase of financial planning involves:',
    options: [
      'A) Creating the initial plan only',
      'B) Reviewing progress, updating for life changes, adjusting for market conditions, and ensuring the plan remains aligned with goals',
      'C) Terminating the relationship',
      'D) Only checking accounts annually'
    ],
    correctAnswer: 1,
    explanation: 'Monitoring is ongoing—not one-time. It includes tracking progress toward goals, updating assumptions, responding to life changes (marriage, job change, children), adjusting for market/tax law changes, and rebalancing. The frequency depends on client needs and engagement terms.'
  },
  {
    id: 'CFP-GEN-B7-002',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Gathering Information',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Quantitative data gathered for financial planning includes:',
    options: [
      'A) Only client attitudes about money',
      'B) Income, expenses, assets, liabilities, insurance coverage, and tax returns—numerical financial facts',
      'C) Goals and dreams only',
      'D) Family history only'
    ],
    correctAnswer: 1,
    explanation: 'Quantitative data is numerical: income/expenses, account values, debts, policy details, tax information. Qualitative data includes goals, values, risk tolerance, family dynamics. Both are essential—numbers without context and goals without data don\'t enable effective planning.'
  },
  {
    id: 'CFP-GEN-B7-003',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Interrelationship of Goals',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When client goals conflict (e.g., early retirement vs. college funding), the planner should:',
    options: [
      'A) Choose the more important goal for the client',
      'B) Help the client understand trade-offs and priorities to make informed decisions about which goals to emphasize',
      'C) Ignore the conflict',
      'D) Recommend taking more risk'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive planning addresses goal interactions. Limited resources mean trade-offs. Planners quantify implications of different choices, but clients decide priorities. This may involve adjusting timelines, amounts, or expectations. The planner\'s role is illuminating trade-offs, not making value judgments.'
  },
  // GEN-2: Time Value of Money
  {
    id: 'CFP-GEN-B7-004',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Effective Annual Rate',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A credit card with 18% APR compounded monthly has an Effective Annual Rate (EAR) of approximately:',
    options: [
      'A) 18.00%',
      'B) 19.56%',
      'C) 17.50%',
      'D) 20.00%'
    ],
    correctAnswer: 1,
    explanation: 'EAR = (1 + r/n)^n - 1 = (1 + 0.18/12)^12 - 1 = (1.015)^12 - 1 = 1.1956 - 1 = 19.56%. Monthly compounding increases effective rate above stated APR. Understanding EAR helps compare loans/investments with different compounding frequencies.'
  },
  {
    id: 'CFP-GEN-B7-005',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Loan Amortization',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In an amortizing loan, early payments consist primarily of:',
    options: [
      'A) Principal',
      'B) Interest, with the principal portion increasing over time as the balance decreases',
      'C) Equal amounts of principal and interest',
      'D) Fees'
    ],
    correctAnswer: 1,
    explanation: 'With constant payments on a declining balance, early payments are mostly interest (larger balance = more interest). Each payment reduces principal slightly, reducing next period\'s interest, allowing more of subsequent payments toward principal. This is why extra payments early have outsized impact on total interest.'
  },
  {
    id: 'CFP-GEN-B7-006',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Annuity Due',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An annuity due differs from an ordinary annuity in that:',
    options: [
      'A) They are identical',
      'B) Payments occur at the beginning of each period rather than the end, resulting in higher present and future values',
      'C) Payments are variable',
      'D) There are fewer payments'
    ],
    correctAnswer: 1,
    explanation: 'Annuity due: payments at period start (rent, insurance premiums). Ordinary annuity: payments at period end (most loan payments). An annuity due has one more period of compounding/discounting, making FV higher and PV higher than otherwise identical ordinary annuity.'
  },
  // GEN-3: Economic Concepts
  {
    id: 'CFP-GEN-B7-007',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Economics',
    subtopic: 'Phillips Curve',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Phillips Curve traditionally suggests:',
    options: [
      'A) No relationship between inflation and unemployment',
      'B) An inverse relationship between inflation and unemployment in the short run',
      'C) Inflation and unemployment move together',
      'D) Only supply affects prices'
    ],
    correctAnswer: 1,
    explanation: 'The Phillips Curve shows trade-off between inflation and unemployment: lower unemployment often coincides with higher inflation (tight labor markets = wage pressure = price increases). The relationship has been less stable in recent decades. It informs Fed policy balancing employment mandate with inflation control.'
  },
  {
    id: 'CFP-GEN-B7-008',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Economics',
    subtopic: 'Gross Domestic Product',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Gross Domestic Product (GDP) measures:',
    options: [
      'A) Only government spending',
      'B) The total market value of all finished goods and services produced within a country in a given period',
      'C) Stock market returns',
      'D) Personal income only'
    ],
    correctAnswer: 1,
    explanation: 'GDP = Consumption + Investment + Government Spending + Net Exports. It measures economic output—a growing GDP generally indicates economic expansion. Real GDP (inflation-adjusted) is compared over time. GDP growth rates indicate economic health; negative growth for two quarters typically defines recession.'
  },
  {
    id: 'CFP-GEN-B7-009',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Economics',
    subtopic: 'Monetary vs Fiscal Policy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The distinction between monetary and fiscal policy is:',
    options: [
      'A) They are the same',
      'B) Monetary policy is Fed action on money supply/interest rates; fiscal policy is government taxation and spending',
      'C) Monetary policy is state-level; fiscal is federal',
      'D) Fiscal policy controls inflation only'
    ],
    correctAnswer: 1,
    explanation: 'Monetary policy (Federal Reserve): adjusting interest rates and money supply to influence inflation and employment. Fiscal policy (Congress/President): taxing and spending decisions affecting economic demand. They work differently—monetary policy is more nimble while fiscal changes require legislation.'
  },
  // GEN-4: Financial Statements
  {
    id: 'CFP-GEN-B7-010',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Financial Statements',
    subtopic: 'Cash Flow Statement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A personal cash flow statement shows:',
    options: [
      'A) Net worth at a point in time',
      'B) Income sources and expenses over a period, revealing savings rate and spending patterns',
      'C) Only investment returns',
      'D) Credit scores'
    ],
    correctAnswer: 1,
    explanation: 'Cash flow statements track money in (wages, dividends, interest) and out (living expenses, debt payments, savings) over time (monthly/annually). The difference is savings or deficit. This reveals spending patterns, savings rates, and opportunities for improvement. It complements the balance sheet\'s point-in-time view.'
  },
  {
    id: 'CFP-GEN-B7-011',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Financial Statements',
    subtopic: 'Debt Ratios',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A housing expense ratio (front-end ratio) of 28% means:',
    options: [
      'A) 28% of net worth is in housing',
      'B) Housing costs (principal, interest, taxes, insurance) represent 28% of gross monthly income',
      'C) 28% down payment was made',
      'D) Home value decreased 28%'
    ],
    correctAnswer: 1,
    explanation: 'Housing ratio = PITI ÷ Gross Monthly Income. Conventional guidelines suggest ≤28% front-end (housing only) and ≤36% back-end (housing plus all debt). Higher ratios indicate potential cash flow stress. Lenders use these for qualification; planners use them for affordability analysis.'
  },
  {
    id: 'CFP-GEN-B7-012',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Financial Statements',
    subtopic: 'Liquidity',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Liquidity in personal finance refers to:',
    options: [
      'A) Home equity only',
      'B) How quickly assets can be converted to cash without significant loss of value',
      'C) Total net worth',
      'D) Retirement account balances'
    ],
    correctAnswer: 1,
    explanation: 'Liquid assets (cash, money market, stocks) convert to cash quickly at fair value. Illiquid assets (real estate, limited partnerships) take time or may sell at discounts. Emergency funds require liquidity. Retirement accounts are liquid but may have tax/penalty consequences for early access.'
  },
  // GEN-5: Client Education
  {
    id: 'CFP-GEN-B7-013',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Client Education',
    subtopic: 'Financial Literacy',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Improving clients\' financial literacy helps them:',
    options: [
      'A) Eliminate the need for professional advice',
      'B) Make more informed decisions, understand recommendations, and engage more productively in the planning process',
      'C) Perform their own tax returns',
      'D) Replace the financial planner'
    ],
    correctAnswer: 1,
    explanation: 'Educated clients understand recommendations, ask better questions, and are more committed to plans they understand. Education doesn\'t replace professional advice—it enhances the relationship. Planners should explain "why" not just "what." Client capacity to understand varies; adjust communication accordingly.'
  },
  {
    id: 'CFP-GEN-B7-014',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Client Education',
    subtopic: 'Simplifying Complexity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When explaining complex financial concepts:',
    options: [
      'A) Use as much jargon as possible to demonstrate expertise',
      'B) Use analogies, visuals, and plain language appropriate to the client\'s level of understanding',
      'C) Assume clients understand technical terms',
      'D) Provide written materials only'
    ],
    correctAnswer: 1,
    explanation: 'Effective communication adapts to the audience. Analogies relate unfamiliar concepts to familiar ones. Visuals (charts, graphs) can clarify relationships. Avoid or define jargon. Check understanding—clients may nod without comprehending. The goal is informed decision-making, not impressive presentations.'
  },
  // Additional Topics
  {
    id: 'CFP-GEN-B7-015',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Documentation',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Proper documentation in financial planning:',
    options: [
      'A) Is only for regulatory compliance',
      'B) Protects both client and planner, supports recommendations, creates continuity, and demonstrates due diligence',
      'C) Is optional for trusted clients',
      'D) Should be minimized to reduce liability'
    ],
    correctAnswer: 1,
    explanation: 'Documentation creates records of client information gathered, analysis performed, recommendations made, and decisions taken. It protects against disputes, enables continuity if the planner changes, demonstrates appropriate care, and satisfies regulatory requirements. "If it isn\'t documented, it didn\'t happen."'
  },
  {
    id: 'CFP-GEN-B7-016',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Serial Payment Calculation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Serial payments (payments that grow at a constant rate) are used in retirement planning to:',
    options: [
      'A) Simplify calculations only',
      'B) Model income needs that increase with inflation or lifestyle expectations over time',
      'C) Decrease retirement needs',
      'D) Avoid time value calculations'
    ],
    correctAnswer: 1,
    explanation: 'Serial payments recognize that retirement expenses typically grow with inflation. A $50,000 need today might be $100,000 in 20 years. Serial payment calculations account for this growth, creating more accurate projections than assuming constant (nominal) payments.'
  },
  {
    id: 'CFP-GEN-B7-017',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Economics',
    subtopic: 'Interest Rate Effects',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When the Federal Reserve raises interest rates:',
    options: [
      'A) Bond prices increase',
      'B) Bond prices fall, borrowing costs increase, savings yields improve, and economic growth may slow',
      'C) Stock prices always increase',
      'D) Inflation accelerates'
    ],
    correctAnswer: 1,
    explanation: 'Higher rates: existing bond prices fall (new bonds offer better yields), mortgages and loans cost more (reducing spending/housing), savings accounts pay more (encouraging saving over spending). Intent is often cooling inflation or overheating economy. Effects ripple through all asset classes.'
  },
  {
    id: 'CFP-GEN-B7-018',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Financial Statements',
    subtopic: 'Emergency Fund',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A common guideline for emergency fund sizing is:',
    options: [
      'A) 1 month of expenses',
      'B) 3-6 months of essential expenses, with more for variable income or less job security',
      'C) Equal to total debt',
      'D) 10% of annual income'
    ],
    correctAnswer: 1,
    explanation: '3-6 months of essential expenses is standard guidance. More stable income, good insurance, and high job security may justify lower amounts. Variable income, single earner, narrow job markets, or higher expenses suggest more. The fund should be liquid (savings, money market) and separate from investment accounts.'
  },
  {
    id: 'CFP-GEN-B7-019',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Client Education',
    subtopic: 'Risk Education',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Educating clients about investment risk should include:',
    options: [
      'A) Only past returns',
      'B) Historical volatility, potential for loss, relationship between risk and return, and how time horizon affects risk',
      'C) Guaranteeing no losses',
      'D) Avoiding the topic to prevent anxiety'
    ],
    correctAnswer: 1,
    explanation: 'Risk education prevents unrealistic expectations. Show historical ranges, not just averages. Explain that short-term volatility typically decreases over long periods. Discuss different risks (market, inflation, longevity). Connect risk tolerance to capacity and required return. Educated clients handle volatility better.'
  },
  {
    id: 'CFP-GEN-B7-020',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Scope of Engagement',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Defining the scope of a financial planning engagement:',
    options: [
      'A) Is unnecessary for comprehensive planning',
      'B) Clarifies what services will be provided, responsibilities of each party, and limitations of the engagement',
      'C) Should always be comprehensive',
      'D) Only benefits the planner'
    ],
    correctAnswer: 1,
    explanation: 'Scope defines boundaries: comprehensive or focused (retirement only, etc.), planner and client responsibilities, what\'s included/excluded, fees, and update frequency. This manages expectations, prevents misunderstandings, and ensures appropriate service. Scope can be expanded over time.'
  },
  {
    id: 'CFP-GEN-B7-021',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Time Value of Money',
    subtopic: 'Uneven Cash Flows',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'To value a series of uneven cash flows, you would:',
    options: [
      'A) Use the ordinary annuity formula',
      'B) Calculate the present value of each cash flow individually and sum them',
      'C) Average the cash flows',
      'D) Use only the largest cash flow'
    ],
    correctAnswer: 1,
    explanation: 'Uneven cash flows (different amounts each period) can\'t use standard annuity formulas. Discount each cash flow to present value individually using PV = FV/(1+r)^n, then sum. Financial calculators have CF (cash flow) functions for this. This is essential for valuing investments with variable returns.'
  },
  {
    id: 'CFP-GEN-B7-022',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Economics',
    subtopic: 'Leading Indicators',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Examples of economic leading indicators include:',
    options: [
      'A) Unemployment rate (lagging)',
      'B) Stock market, building permits, average weekly hours worked, and consumer confidence',
      'C) GDP (coincident)',
      'D) CPI (lagging)'
    ],
    correctAnswer: 1,
    explanation: 'Leading indicators predict future economic activity: stock prices (expectations), building permits (future construction), manufacturing orders, consumer confidence, yield curve. Coincident indicators move with the economy (GDP, employment). Lagging indicators follow (unemployment, inflation). Planners monitor these for economic outlook.'
  },
  {
    id: 'CFP-GEN-B7-023',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Financial Statements',
    subtopic: 'Net Worth Calculation',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Net worth is calculated as:',
    options: [
      'A) Income minus expenses',
      'B) Total assets minus total liabilities',
      'C) Savings rate times income',
      'D) Investment gains only'
    ],
    correctAnswer: 1,
    explanation: 'Net Worth = Assets (what you own: cash, investments, property, retirement accounts) - Liabilities (what you owe: mortgage, loans, credit cards). It\'s a point-in-time snapshot of wealth. Growing net worth indicates progress; it\'s tracked over time as a key financial health metric.'
  },
  {
    id: 'CFP-GEN-B7-024',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Client Education',
    subtopic: 'Ongoing Education',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Ongoing client education throughout the relationship:',
    options: [
      'A) Is only needed at the start',
      'B) Helps clients adapt to changes, understand new strategies, and remain engaged with their financial plan',
      'C) Reduces client retention',
      'D) Should only cover investments'
    ],
    correctAnswer: 1,
    explanation: 'Education is continuous: new planning topics as life changes, market events requiring context, tax law updates, product explanations. Regular touchpoints educate while demonstrating value. Newsletters, webinars, and review meetings all provide education. Engaged, educated clients are more likely to follow plans.'
  },
  {
    id: 'CFP-GEN-B7-025',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Presenting Recommendations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When presenting financial planning recommendations:',
    options: [
      'A) Present as many alternatives as possible',
      'B) Clearly explain the recommendation, rationale, alternatives considered, and expected outcomes to enable informed decisions',
      'C) Use technical language to demonstrate expertise',
      'D) Make decisions for the client'
    ],
    correctAnswer: 1,
    explanation: 'Presentations should be clear and client-focused: what you recommend, why (connected to their goals), what alternatives were considered and rejected, expected outcomes, and risks. Use visuals for complex concepts. Allow time for questions. The client decides—the planner informs that decision.'
  }
];
