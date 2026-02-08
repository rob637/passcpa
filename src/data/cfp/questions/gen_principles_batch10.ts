/**
 * CFP General Principles Questions - Batch 10
 * Domain 2: General Principles of Financial Planning (17% of exam)
 * 25 additional questions covering financial planning principles
 */

import { Question } from '../../../types';

export const CFP_GEN_BATCH10_QUESTIONS: Question[] = [
  // GEN-1: Planning Process
  {
    id: 'CFP-GEN-B10-001',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Data Collection',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When collecting client data, a CFP professional should prioritize:',
    options: [
      'A) Quantitative data only',
      'B) Both quantitative and qualitative data, including values, goals, attitudes, and experiences',
      'C) Investment returns only',
      'D) Tax documents exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive data gathering: quantitative (financial statements, tax returns, insurance policies) and qualitative (goals, values, risk tolerance, health, family dynamics, attitudes toward money). Qualitative often more important for appropriate recommendations. Understanding "why" behind goals leads to better planning. Document collection is necessary but insufficient alone.'
  },
  {
    id: 'CFP-GEN-B10-002',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Recommendation Development',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When developing recommendations, a planner should:',
    options: [
      'A) Choose the most profitable option for the advisor',
      'B) Consider multiple alternatives and present recommendations that address the client\'s specific situation and goals',
      'C) Always choose the most conservative option',
      'D) Recommend only products they sell'
    ],
    correctAnswer: 1,
    explanation: 'Recommendation development: analyze alternatives, consider trade-offs, align with client\'s unique situation. Must be: suitable, in client\'s interest, based on thorough analysis. Consider: cost, risk, complexity, tax implications, time horizon. Present options when appropriate—client choice matters. Document rationale for recommendations. Fiduciary standard requires acting in client\'s interest.'
  },
  {
    id: 'CFP-GEN-B10-003',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Plan Monitoring',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Monitoring a financial plan should include:',
    options: [
      'A) Reviewing only when client requests',
      'B) Regular reviews, tracking progress toward goals, and adjusting for changed circumstances, market conditions, or laws',
      'C) Annual account statement review only',
      'D) Monitoring until products are sold'
    ],
    correctAnswer: 1,
    explanation: 'Plan monitoring: ongoing responsibility. Review: progress toward goals, changed circumstances (life events), market impact, new laws. Frequency depends on engagement—some annual, others quarterly. Proactive communication when material changes occur. Not just investments—all plan elements. May identify need for plan revision. Part of continuing service to clients.'
  },
  // GEN-2: Financial Statements
  {
    id: 'CFP-GEN-B10-004',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Financial Statements',
    subtopic: 'Cash Flow Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Analyzing a client\'s cash flow statement helps identify:',
    options: [
      'A) Net worth only',
      'B) Spending patterns, surplus or deficit, areas for potential savings, and ability to fund goals',
      'C) Tax liability exclusively',
      'D) Investment returns'
    ],
    correctAnswer: 1,
    explanation: 'Cash flow analysis: inflows vs. outflows, surplus (savings capacity) or deficit (problem). Identifies: discretionary vs. nondiscretionary expenses, spending patterns, potential savings areas, sustainability. Surplus funds goals. Persistent deficit indicates problems. Categories help find inefficiencies. Cash flow is foundation of financial planning—without surplus, little progress.'
  },
  {
    id: 'CFP-GEN-B10-005',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Financial Statements',
    subtopic: 'Debt Ratios',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A front-end housing ratio measures:',
    options: [
      'A) Total debt payments',
      'B) Housing costs (PITI) as a percentage of gross income, typically targeted at 28% or less',
      'C) Savings rate',
      'D) Net worth growth'
    ],
    correctAnswer: 1,
    explanation: 'Front-end ratio: (Principal + Interest + Taxes + Insurance) / Gross monthly income. Target: ≤28% typically. Back-end ratio adds all debt payments, target ≤36%. Used by lenders; also good planning benchmarks. Higher ratios indicate stress. Analysis helps: affordability assessment, debt management, spending priorities. Some clients can handle more, others less—depends on total picture.'
  },
  {
    id: 'CFP-GEN-B10-006',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Financial Statements',
    subtopic: 'Emergency Fund',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The emergency fund recommendation of 3-6 months expenses may be increased when:',
    options: [
      'A) Income is stable and guaranteed',
      'B) Income is variable, job is unstable, self-employed, single earner, or health concerns exist',
      'C) Client has insurance',
      'D) Interest rates are low'
    ],
    correctAnswer: 1,
    explanation: 'Emergency fund adjustments: increase for: variable income (commission, self-employed), specialized job skills (longer job search), single income household, health issues, economic uncertainty. Decrease if: very stable income, dual earner, strong safety net. Purpose: cover unexpected expenses/income gaps without disrupting investments or incurring debt. Liquidity and accessibility key.'
  },
  // GEN-3: Time Value of Money
  {
    id: 'CFP-GEN-B10-007',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Time Value of Money',
    subtopic: 'Uneven Cash Flows',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Calculating present value of uneven cash flows requires:',
    options: [
      'A) Using annuity formula',
      'B) Discounting each individual cash flow separately and summing, or using NPV/cash flow functions',
      'C) Simple averaging',
      'D) Ignoring timing'
    ],
    correctAnswer: 1,
    explanation: 'Uneven cash flows: can\'t use standard annuity formula (which assumes equal payments). Must: discount each cash flow individually using PV = CF/(1+r)^n, then sum. Or use: calculator NPV/CFo function, Excel NPV/XNPV. Common situations: irregular income, business valuations, real estate with varying rents. Understanding this extends basic TVM to real-world applications.'
  },
  {
    id: 'CFP-GEN-B10-008',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Time Value of Money',
    subtopic: 'Nominal vs Real',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When projecting retirement needs in real dollars:',
    options: [
      'A) Use nominal returns and nominal expenses',
      'B) Use inflation-adjusted returns to calculate purchasing power, avoiding the need to inflate expenses',
      'C) Ignore inflation entirely',
      'D) Double the nominal rate'
    ],
    correctAnswer: 1,
    explanation: 'Real vs. nominal: Real rate ≈ Nominal rate - Inflation. Two approaches: (1) Nominal—inflate expenses, use nominal returns. (2) Real—keep today\'s dollars, use real returns. Same answer, real often simpler. Fisher equation: (1+r) = (1+i)(1+π). Consistency key—don\'t mix real expenses with nominal returns. For retirement, real dollars often more intuitive for clients.'
  },
  {
    id: 'CFP-GEN-B10-009',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Time Value of Money',
    subtopic: 'Loan Amortization Analysis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Early in a mortgage loan\'s amortization schedule:',
    options: [
      'A) Most of each payment goes to principal',
      'B) Most of each payment goes to interest, with principal portion increasing over time',
      'C) Interest and principal are equal',
      'D) No interest is charged'
    ],
    correctAnswer: 1,
    explanation: 'Amortization: fixed payment, changing split. Early payments: mostly interest (balance high). Over time: interest decreases (as balance drops), principal increases. Same total payment throughout. Implications: early payoff saves most interest, refinancing early in term loses benefits of previous interest payments, building equity slow initially. Understanding helps with debt strategies.'
  },
  // GEN-4: Economics
  {
    id: 'CFP-GEN-B10-010',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economics',
    subtopic: 'Business Cycle Phases',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The phases of the business cycle are:',
    options: [
      'A) Growth and decline only',
      'B) Expansion, peak, contraction (recession), and trough, repeating in a pattern over time',
      'C) Inflation and deflation',
      'D) Bull and bear markets'
    ],
    correctAnswer: 1,
    explanation: 'Business cycle phases: Expansion (growth)—increasing GDP, employment, confidence. Peak—maximum activity before downturn. Contraction/recession—declining GDP, rising unemployment. Trough—lowest point before recovery. NBER officially dates cycles. Investment implications: sectors perform differently at each phase. Planning implications: job security, income expectations, market expectations.'
  },
  {
    id: 'CFP-GEN-B10-011',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economics',
    subtopic: 'Yield Curve Shapes',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An inverted yield curve, where short-term rates exceed long-term rates, often signals:',
    options: [
      'A) Economic expansion ahead',
      'B) Potential recession, as markets expect future rate cuts and economic weakness',
      'C) High inflation expectations',
      'D) Normal market conditions'
    ],
    correctAnswer: 1,
    explanation: 'Yield curve shapes: Normal (upward sloping)—longer maturities, higher yields (typical, compensation for time). Flat—similar rates across maturities (transition period). Inverted—short-term higher than long (unusual, historically preceded recessions). Markets pricing in future rate cuts due to expected weakness. Not guaranteed predictor but historically reliable. Watch 2-year vs. 10-year spread.'
  },
  {
    id: 'CFP-GEN-B10-012',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economics',
    subtopic: 'Fiscal Policy',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Expansionary fiscal policy involves:',
    options: [
      'A) Raising taxes and cutting spending',
      'B) Government spending increases and/or tax cuts to stimulate economic activity',
      'C) Fed lowering interest rates',
      'D) Balanced budgets always'
    ],
    correctAnswer: 1,
    explanation: 'Fiscal policy: government\'s tax and spending decisions. Expansionary: increase spending, cut taxes—stimulates demand (Keynesian). Contractionary: reduce spending, raise taxes—slows overheating. Set by Congress/President (political process). Monetary policy is Fed\'s tool (interest rates, money supply). Both influence economy. Fiscal impact: deficits/surplus, inflation, growth, interest rates.'
  },
  // GEN-5: Planning Concepts
  {
    id: 'CFP-GEN-B10-013',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Planning Concepts',
    subtopic: 'SMART Goals',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'SMART goals in financial planning are:',
    options: [
      'A) Goals that are intelligent',
      'B) Specific, Measurable, Achievable, Relevant, and Time-bound objectives that guide planning',
      'C) Simple and minimal goals',
      'D) Short-term goals only'
    ],
    correctAnswer: 1,
    explanation: 'SMART framework: Specific (clear, not vague), Measurable (quantifiable—how much, by when), Achievable (realistic given resources), Relevant (meaningful to client), Time-bound (deadline). Transforms vague wishes into actionable targets. "Save for retirement" → "Accumulate $2M by age 65." Better goals = better plans = more motivation and accountability.'
  },
  {
    id: 'CFP-GEN-B10-014',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Planning Concepts',
    subtopic: 'Client Segmentation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Financial planning considerations differ significantly for:',
    options: [
      'A) Only wealthy clients',
      'B) Different life stages, from young accumulators to retirees, each with distinct priorities and strategies',
      'C) Investment clients only',
      'D) Insurance clients only'
    ],
    correctAnswer: 1,
    explanation: 'Life stage planning: Young adults—build foundation, manage debt, start saving. Mid-career—maximize accumulation, insurance needs peak. Pre-retirement—transition planning, catch-up contributions. Early retirement—Social Security, healthcare decisions. Later retirement—estate, healthcare, longevity. Priorities shift: growth to income to preservation. Tailor advice to stage.'
  },
  {
    id: 'CFP-GEN-B10-015',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Planning Concepts',
    subtopic: 'Financial Interdependence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Financial planning decisions are interdependent, meaning:',
    options: [
      'A) Each area can be planned separately',
      'B) Changes in one area (tax, investment, estate) often affect other areas, requiring holistic analysis',
      'C) Only investments matter',
      'D) Decisions are independent'
    ],
    correctAnswer: 1,
    explanation: 'Interdependence examples: Roth conversion affects taxes AND estate planning AND investment allocation. Insurance decision affects taxes AND cash flow AND estate. Retirement timing affects: Social Security, health insurance, taxes, investment strategy. Holistic planning considers ripple effects. Siloed advice misses impacts. CFP\'s value: integrating all areas. Check every decision across all domains.'
  },
  // Additional Topics
  {
    id: 'CFP-GEN-B10-016',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Scope Definition',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Defining the scope of a financial planning engagement establishes:',
    options: [
      'A) Only the fees',
      'B) What areas will and won\'t be covered, responsibilities of each party, and basis for the relationship',
      'C) Investment returns',
      'D) Guaranteed outcomes'
    ],
    correctAnswer: 1,
    explanation: 'Scope definition: Part of engagement letter/agreement. Clarifies: comprehensive vs. focused plan, specific areas covered, what\'s excluded, responsibilities, how recommendations delivered, ongoing vs. one-time. Prevents misunderstandings. Client knows what to expect. Planner knows limits. Required under Practice Standards. Protects both parties. Can be modified by agreement.'
  },
  {
    id: 'CFP-GEN-B10-017',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Financial Statements',
    subtopic: 'Titling of Assets',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'How assets are titled affects:',
    options: [
      'A) Only investment returns',
      'B) Estate planning, creditor protection, probate, access, and potentially taxes',
      'C) Nothing of importance',
      'D) Only bank accounts'
    ],
    correctAnswer: 1,
    explanation: 'Asset titling matters: Joint tenancy (JTWROS)—passes to survivor, avoids probate, but gift implications. Tenants in common—each owns share, passes by will. Community property—state-specific. Beneficiary designations—override will. Trust ownership—avoids probate, control. Wrong titling can: defeat estate plan, create unintended gifts, cause probate. Review titling during planning.'
  },
  {
    id: 'CFP-GEN-B10-018',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Time Value of Money',
    subtopic: 'Perpetuity',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A perpetuity is valued using the formula:',
    options: [
      'A) PV = PMT × n',
      'B) PV = PMT / r, representing the present value of payments continuing forever',
      'C) FV = PMT × (1+r)^n',
      'D) PV = PMT × r'
    ],
    correctAnswer: 1,
    explanation: 'Perpetuity: infinite stream of payments. PV = Payment / Discount rate. Example: $1,000/year forever at 5% = $1,000/0.05 = $20,000. Applications: preferred stock valuation, some endowments, simplified pension valuation. Growing perpetuity: PV = Payment / (r - g). Theoretical but useful for quick estimates. Related to sustainable withdrawal concept in retirement.'
  },
  {
    id: 'CFP-GEN-B10-019',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economics',
    subtopic: 'Purchasing Power',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Purchasing power risk in financial planning refers to:',
    options: [
      'A) Market volatility',
      'B) The risk that inflation will erode the real value of money and investments over time',
      'C) Credit risk',
      'D) Liquidity risk'
    ],
    correctAnswer: 1,
    explanation: 'Purchasing power risk: inflation erodes real value. $100 today buys less in 20 years. Even "safe" investments (CDs, bonds) lose purchasing power if returns < inflation. Particularly dangerous for retirees on fixed income. Mitigation: growth investments, TIPS, I-Bonds, real assets. Plan must address—most goals are in future dollars worth less than today\'s.'
  },
  {
    id: 'CFP-GEN-B10-020',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Planning Concepts',
    subtopic: 'Opportunity Cost',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Opportunity cost in financial decisions represents:',
    options: [
      'A) Actual monetary cost',
      'B) The value of the next best alternative foregone when making a choice',
      'C) Sunk costs',
      'D) Future inflation'
    ],
    correctAnswer: 1,
    explanation: 'Opportunity cost: what you give up by making one choice. Pay off mortgage vs. invest: opportunity cost of payoff is foregone investment returns. Buy car vs. invest: cost includes lost growth. Every dollar has alternative uses. Good decisions consider opportunity costs. Helps prioritize limited resources. Not just dollars—time, effort included. Frame choices in terms of trade-offs.'
  },
  {
    id: 'CFP-GEN-B10-021',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-1',
    topic: 'Planning Process',
    subtopic: 'Client Communication',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Effective client communication in financial planning requires:',
    options: [
      'A) Technical jargon to demonstrate expertise',
      'B) Clear language, active listening, confirming understanding, and adapting style to client preferences',
      'C) Written communication only',
      'D) Minimal explanation'
    ],
    correctAnswer: 1,
    explanation: 'Communication best practices: avoid jargon (or explain it), active listening, ask questions, confirm understanding, adapt to learning style (visual, verbal, written). Allow questions, check for concerns. Different clients need different approaches. Written follow-up reinforces verbal. Miscommunication leads to poor implementation. Relationship depends on clear, respectful communication.'
  },
  {
    id: 'CFP-GEN-B10-022',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-2',
    topic: 'Financial Statements',
    subtopic: 'Liability Classification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Distinguishing between "good debt" and "bad debt" helps clients understand:',
    options: [
      'A) All debt is equally harmful',
      'B) Some debt builds wealth or human capital (mortgage, education) while other debt finances consumption',
      'C) Debt should never be used',
      'D) Interest rates don\'t matter'
    ],
    correctAnswer: 1,
    explanation: 'Debt categorization: "Good"—low rate, builds assets/income (mortgage, business loan, education). "Bad"—high rate, finances consumption (credit cards, car loans for luxury). Nuanced: car needed for work may be acceptable. Prioritize paying high-rate debt. Some low-rate debt may be kept if investing returns exceed cost. Framework helps clients prioritize and understand borrowing.'
  },
  {
    id: 'CFP-GEN-B10-023',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-3',
    topic: 'Time Value of Money',
    subtopic: 'Solving for Rate',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client needs $50,000 in 5 years and can invest $35,000 today. The required rate of return is:',
    options: [
      'A) 5.0%',
      'B) 7.4%, calculated as (FV/PV)^(1/n) - 1',
      'C) 10.0%',
      'D) 3.0%'
    ],
    correctAnswer: 1,
    explanation: 'Solving for rate: r = (FV/PV)^(1/n) - 1 = (50,000/35,000)^(1/5) - 1 = (1.4286)^0.2 - 1 = 1.0739 - 1 = 7.39%. Use: determine if goal achievable given amount and time. Compare required rate to realistic expectations. If required rate too high, need: more money, more time, or adjusted goal. Foundation for goal feasibility analysis.'
  },
  {
    id: 'CFP-GEN-B10-024',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-4',
    topic: 'Economics',
    subtopic: 'Exchange Rates',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A strengthening U.S. dollar generally:',
    options: [
      'A) Benefits U.S. exporters',
      'B) Reduces returns on foreign investments for U.S. investors when converted back to dollars',
      'C) Increases inflation',
      'D) Has no investment impact'
    ],
    correctAnswer: 1,
    explanation: 'Strong dollar effects: foreign investment returns reduced (convert fewer dollars), imports cheaper (deflationary), exports more expensive (hurts U.S. companies selling abroad), foreign travel cheaper. Weak dollar: opposite effects. International diversification has currency component. Can hedge or accept exposure. Adds dimension to investment planning. Monitor for clients with significant international holdings.'
  },
  {
    id: 'CFP-GEN-B10-025',
    courseId: 'cfp',
    section: 'CFP-GEN',
    blueprintArea: 'GEN-5',
    topic: 'Planning Concepts',
    subtopic: 'Financial Independence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Financial independence is typically defined as:',
    options: [
      'A) Having no debt',
      'B) Having sufficient assets to generate income that covers living expenses without requiring employment',
      'C) Earning more than spending',
      'D) Maxing out retirement accounts'
    ],
    correctAnswer: 1,
    explanation: 'Financial independence: assets produce sufficient income without work requirement. Various calculations: 25× annual expenses (4% rule basis), income from investments ≥ expenses. FIRE movement popularized. Can retire or work optionally. Calculated: required assets = annual spending / safe withdrawal rate. Progress tracked with FI ratio (current assets / required assets). Goal for many clients.'
  }
];
