import { WCTask } from '../../../types';

export const CMA2_ESSAYS: WCTask[] = [
  {
    id: 'cma2-wc-001',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'IMA Ethics - Resolving Pressure to Misstate Expenses',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-F',
    scenario: `You are the cost accountant for TechGrow, a public company. Your manager, the CFO, just visited your office.
    
    "We're going to miss our quarterly earnings target by $0.02 per share," he says. "I need you to capitalize $150,000 of period repairs and maintenance expenses into the 'Equipment' asset account. It's a gray area anyway, and we can expense it over the next 10 years. If we don't hit the target, the stock will tank, and layoffs will start. Everyone is counting on you."
    
    You know that these were clearly routine maintenance costs, not improvements, and GAAP requires them to be expensed immediately.`,
    task: `Write a memo to the CFO (or appropriate authority) that:
1. Identifies the specific ethical standards from the IMA Statement of Ethical Professional Practice that are being violated.
2. Explains why the request violates these standards.
3. Outlines the steps you should take to resolve this ethical conflict, according to the IMA's recommended resolution process.`,
    keyPoints: [
      'IMA Standards: Competence, Confidentiality, Integrity, Credibility',
      'Violation of Integrity (subverting objectives) and Credibility (fair/objective reporting)',
      'Resolution steps: Discuss with supervisor, next level up, Ethics counselor, Legal counsel',
    ],
    sampleResponse: `MEMORANDUM

TO: Audit Committee of the Board of Directors
FROM: [Candidate Name], Cost Accountant
DATE: [Current Date]
RE: Report of Ethical Concern Regarding Financial Reporting

I am writing to formally report a request to misclassify expenses which violates Generally Accepted Accounting Principles (GAAP) and the IMA Statement of Ethical Professional Practice.

VIOLATIONS OF IMA STANDARDS

The request to capitalize routine maintenance exposes conflicts with several core standards:

1. Competence: As management accountants, we must perform duties in accordance with relevant laws, regulations, and technical standards. Capitalizing these expenses violates GAAP (ASC 360).
2. Integrity: We must refrain from engaging in conduct that would prejudice carrying out duties ethically. Manipulating earnings to meet a target creates a conflict of interest.
3. Credibility: We must communicate information fairly and objectively. Presenting expenses as assets distorts the financial statements and misleads investors.

RESOLUTION PROCESS TAKEN

In accordance with the IMA's conflict resolution guidelines:
1. I initially discussed the matter with my immediate supervisor (the CFO), identifying the GAAP violation. He persisted in the request.
2. Since the supervisor is involved, I am now elevating the issue to the next level of management (the Audit Committee).
3. If this is not resolved, I will consult with an objective advisor (IMA Ethics Helpline) and legal counsel regarding my legal obligations.

While I understand the pressure to meet earnings targets, fraudulent financial reporting risks the long-term viability of the firm and carries severe legal penalties. I cannot comply with the request to misstate the financial records.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format with TO/FROM/DATE/RE headers',
        'Organizes content into clearly labeled sections (Violations, Resolution Process)',
        'Presents logical flow from issue identification to resolution steps',
        'Includes appropriate opening statement and firm conclusion',
      ]},
      development: { weight: 40, criteria: [
        'Identifies all relevant IMA standards (Competence, Integrity, Credibility)',
        'Explains specifically how the CFO request violates each cited standard',
        'Outlines the IMA conflict resolution steps in correct sequential order',
        'Connects the specific scenario facts (capitalizing repairs) to the ethical framework',
        'Addresses potential consequences of compliance with the unethical request',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional and respectful memo tone throughout',
        'Uses correct ethics and accounting terminology (e.g., GAAP, ASC 360)',
        'Writes in concise, clear paragraphs without unnecessary verbosity',
        'Demonstrates proper grammar, spelling, and punctuation',
      ]},
    },
  },
  {
    id: 'cma2-wc-002',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Ratio Analysis - Liquidity and Solvency',
    difficulty: 'medium',
    estimatedTime: 30,
    blueprintArea: 'CMA2-A',
    scenario: `You are a credit analyst for a bank. A client, RetailCo, has applied for a $5 million expansion loan. You have calculated the following ratios for RetailCo and the Industry Average:
    
    RetailCo:
    - Current Ratio: 1.2
    - Quick Ratio: 0.4
    - Debt-to-Equity: 2.5
    - Times Interest Earned: 3.5
    
    Industry Average:
    - Current Ratio: 1.8
    - Quick Ratio: 0.9
    - Debt-to-Equity: 1.0
    - Times Interest Earned: 6.0
    
    RetailCo's management argues that their high inventory levels are strategic and they are "ready for growth."`,
    task: `Write a report to the Loan Committee that:
1. Analyzes RetailCo's liquidity position (ability to pay short-term obligations) based on the ratios.
2. Analyzes RetailCo's solvency/leverage position (long-term risk).
3. Evaluates the quality of their assets (specifically Inventory, implied by the Current vs. Quick ratio gap).
4. Recommends whether to approve the loan and justifies the decision.`,
    keyPoints: [
      'Liquidity weakness (Current/Quick ratios below industry)',
      'Inventory dominance (Gap between Current and Quick is large)',
      'Solvency risk (High Debt-to-Equity, low TIE)',
      'Credit risk assessment (High risk)',
    ],
    sampleResponse: `CREDIT ANALYSIS REPORT

TO: Bank Loan Committee
FROM: [Candidate Name], Credit Analyst
DATE: [Current Date]
RE: Loan Application Assessment - RetailCo

Based on the financial analysis of RetailCo, I recommend DECLINING the $5 million expansion loan application at this time due to significant liquidity and solvency risks.

LIQUIDITY ANALYSIS

RetailCo's short-term financial health is precarious compared to the industry.
- Current Ratio (1.2 vs 1.8 avg): Below industry norms, indicating a tighter working capital position.
- Quick Ratio (0.4 vs 0.9 avg): This is the most concerning metric. The Quick Ratio excludes inventory. The massive drop from 1.2 (Current) to 0.4 (Quick) indicates that 66% of their current assets are tied up in inventory.

This suggests that RetailCo is "inventory rich" but "cash poor." If sales slow down, they will struggle to pay immediate bills.

SOLVENCY AND LEVERAGE ANALYSIS

The company is already highly leveraged.
- Debt-to-Equity (2.5 vs 1.0 avg): They have $2.50 of debt for every $1 of equity, more than double the industry average.
- Times Interest Earned (3.5 vs 6.0 avg): Their cushion to cover interest payments is thin. Adding interest from a new $5M loan would further depress this ratio, increasing default risk.

CONCLUSION

RetailCo fits the profile of a high-risk borrower. They are relying on selling through a massive inventory pile to stay solvent. Adding more debt leverage to a company with 2.5 Debt/Equity and poor liquidity is not prudent. I recommend we decline the request or require significant additional collateral and personal guarantees.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper credit analysis report format with clear headers',
        'Separates analysis into distinct liquidity, solvency, and asset quality sections',
        'Follows logical progression from ratio analysis to credit recommendation',
        'Provides clear recommendation with supporting rationale in conclusion',
      ]},
      development: { weight: 40, criteria: [
        'Analyzes all four ratios with specific industry benchmark comparisons',
        'Identifies inventory concentration issue from Current vs Quick ratio gap',
        'Connects high leverage (D/E, TIE) to incremental risk of additional debt',
        'Evaluates management claim about strategic inventory levels',
        'Supports loan recommendation with quantitative evidence from ratios',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional credit analyst tone appropriate for loan committee',
        'Uses correct financial ratio terminology and abbreviations',
        'Presents quantitative data clearly with proper formatting',
        'Demonstrates proper grammar and professional writing conventions',
      ]},
    },
  },
  {
    id: 'cma2-wc-003',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Decision Analysis - Special Order',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA2-C',
    scenario: `Beta Motors manufactures electric scooters. They have the capacity to produce 10,000 units/month but are currently producing 8,000.
    
    Current Costs (per unit):
    - Direct Materials: $200
    - Direct Labor: $100
    - Variable Overhead: $50
    - Fixed Overhead: $150 (allocated based on volume)
    - Total Cost: $500
    - Selling Price: $650
    
    A foreign distributor offers to buy 1,500 units at a price of $400 per unit. This is a one-time order and will not affect regular sales.
    
    The Sales Manager says, "We can't accept this! The offer is $100 below our cost of $500. We'd lose money on every unit!"`,
    task: `Write a memo to the Sales Manager that:
1. Identifies the relevant costs for this decision.
2. Calculates the incremental profit or loss if the special order is accepted.
3. Explains why the "Total Cost" figure of $500 is misleading for this specific decision (sunk cost fallacy).
4. Recommends whether to accept the order.
5. Identifies two qualitative factors (non-financial) to consider before final acceptance.`,
    keyPoints: [
      'Relevant costs (Variable only: DM, DL, VOH)',
      'Irrelevant costs (Fixed Overhead)',
      'Contribution Margin calculation ($400 - $350)',
      'Qualitative factors (Brand dilution, future expectations)',
    ],
    sampleResponse: `MEMORANDUM

TO: Sales Manager, Beta Motors
FROM: [Candidate Name], Management Accountant
DATE: [Current Date]
RE: Analysis of Special Order Opportunity

I have analyzed the special order offer for 1,500 units at $400 each. Contrary to the initial impression based on full cost, this order would actually increase our monthly profits.

FINANCIAL ANALYSIS

The key to this decision is identifying "relevant costs"—those that change if we accept the order. Since we have excess capacity (2,000 units), our Fixed Overhead ($150/unit) will remain the same total amount regardless of whether we take this order. It is a sunk cost for this decision.

Incremental Revenue: $400 per unit
Less Incremental (Variable) Costs:
- Direct Materials: $200
- Direct Labor: $100
- Variable Overhead: $50
Total Variable Cost: $350

Contribution Margin per Unit: $400 - $350 = $50 profit per unit.

Total Incremental Profit: 1,500 units × $50 = $75,000.

By accepting this order, we cover all variable costs and contribute $75,000 toward covering our fixed costs. Using the full cost of $500 is misleading because it includes fixed costs that we are already paying.

QUALITATIVE FACTORS

While financially sound, we must consider:
1. Market Segmentation: Will our regular customers find out we sold scooters for $400? This could damage our brand premium or lead regular customers to demand lower prices.
2. Capacity Constraints: Will accepting this order prevent us from fulfilling any potential full-price orders in the near future?

RECOMMENDATION

I recommend accepting the order, provided we can ensure the product is not re-imported (gray market) to compete with our regular sales channels.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format with TO/FROM/DATE/RE headers',
        'Organizes into financial analysis and qualitative factors sections',
        'Follows logical flow from cost identification to recommendation',
        'Separates quantitative analysis from qualitative considerations',
      ]},
      development: { weight: 40, criteria: [
        'Correctly distinguishes relevant (variable) from irrelevant (fixed) costs',
        'Calculates incremental contribution margin per unit and total profit',
        'Explains why full cost of $500 is misleading for this decision',
        'Confirms excess capacity exists to fulfill the special order',
        'Identifies at least two qualitative factors (brand dilution, precedent setting)',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional management accounting memo tone',
        'Uses correct cost accounting terminology (contribution margin, relevant costs, sunk cost)',
        'Presents numerical analysis in clear, easy-to-follow format',
        'Demonstrates proper grammar and concise professional writing',
      ]},
    },
  },
  {
    id: 'cma2-wc-004',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Capital Budgeting - NPV vs Payback Period Conflict',
    difficulty: 'hard',
    estimatedTime: 35,
    blueprintArea: 'CMA2-C',
    scenario: `Global Logistics is considering a warehouse automation project.
    - Initial Investment: $5,000,000
    - Useful life: 5 years
    - Cost of Capital: 10%
    
    Cash Flows:
    - Year 1: $500,000
    - Year 2: $1,000,000
    - Year 3: $2,000,000
    - Year 4: $2,500,000
    - Year 5: $3,000,000
    
    The company has a policy requiring a Payback Period of less than 3 years.
    
    The CFO favors the project because it has a high Net Present Value (NPV), but the COO opposes it because it violates the Payback policy.`,
    task: `Write a memo to the Investment Committee that:
1. Calculates the Payback Period.
2. Discusses the limitations of the Payback Period method (time value of money, cash flows after cutoff).
3. Explains why Net Present Value (NPV) is a superior metric for shareholder value creation.
4. Recommends whether to approve the project, addressing the conflict between the metrics.`,
    keyPoints: [
      'Payback calculation (Between Year 3 and 4)',
      'NPV superiority (Time value of money)',
      'Payback limitations (Ignores profitability)',
      'Recommendation logic',
    ],
    sampleResponse: `MEMORANDUM

TO: Investment Committee
FROM: [Candidate Name], Financial Analyst
DATE: [Current Date]
RE: Evaluation of Warehouse Automation Project

I have evaluated the proposed automation project and the conflict between our Payback policy and the NPV analysis.

PAYBACK PERIOD ANALYSIS

Cumulative Cash Flows:
- Year 1: $500,000
- Year 2: $1,500,000
- Year 3: $3,500,000 (Still $1.5M short of $5M investment)
- Year 4: $6,000,000 (Recovered)
The project pays back during Year 4 (approx. 3.6 years). This violates the company policy requiring payback in < 3 years.

LIMITATIONS OF PAYBACK METHOD

The COO's reliance on Payback Period is problematic for two reasons:
1. It ignores the Time Value of Money: It treats a dollar in Year 1 the same as a dollar in Year 3.
2. It ignores Cash Flows after Payback: This project generates its largest returns in Years 4 and 5 ($5.5M total). The Payback method ignores this massive profitability completely.

NPV ANALYSIS

Using our 10% cost of capital, we must assess if the project creates value. Given the back-loaded cash flows, the substantial inflows in Years 4 and 5, when discounted, will likely yield a significantly positive NPV, meaning the project increases shareholder wealth.

RECOMMENDATION

I recommend APPROVING the project and granting an exception to the Payback policy.

The Payback policy is designed to manage liquidity risk, but when applied rigidly to long-term infrastructure projects like this, it causes us to reject highly profitable investments. We should prioritize NPV (value creation) over Payback (liquidity speed) for strategic capital investments.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to Investment Committee',
        'Separates Payback analysis, NPV analysis, and limitations into distinct sections',
        'Follows logical progression from metric calculations to policy recommendation',
        'Addresses the conflict between CFO and COO positions clearly',
      ]},
      development: { weight: 40, criteria: [
        'Calculates cumulative cash flows and payback period correctly (3.6 years)',
        'Identifies key Payback limitations: ignores TVM and post-payback cash flows',
        'Explains NPV superiority for measuring shareholder value creation',
        'Recognizes that Payback policy may reject profitable long-term investments',
        'Recommends policy exception with clear justification',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional investment analysis tone',
        'Uses correct capital budgeting terminology (NPV, payback, cost of capital, discount rate)',
        'Presents calculations and cumulative cash flows clearly',
        'Demonstrates proper grammar and persuasive professional writing',
      ]},
    },
  },
  {
    id: 'cma2-wc-005',
    section: 'CMA2',
    type: 'written_communication',
    topic: 'Single Currency Hedge - Forward Contract Decision',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA2-C',
    scenario: `US-based Importer Inc. just signed a contract to purchase merchandise from a European supplier for €1,000,000, payable in 90 days.
    
    Current Spot Rate: $1.10 per Euro
    90-day Forward Rate: $1.12 per Euro
    
    The CEO believes the dollar will strengthen significantly against the Euro in the next 3 months (meaning it will take fewer dollars to buy Euros). He wants to remain "unhedged" to save money.
    
    The CFO is risk-averse and wants to use a Forward Contract.`,
    task: `Write a memo to the CEO that:
1. Explains the transaction risk exposure the company currently faces.
2. Calculates the guaranteed cost if the Forward Contract is used.
3. Describes the "worst-case scenario" if the company remains unhedged and the CEO is wrong (e.g., rate goes to $1.20).
4. Explains the primary purpose of hedging (certainty vs. speculation).
5. Recommends a strategy.`,
    keyPoints: [
      'Transaction risk (Account Payable in FC)',
      'Forward contract calculation',
      'Speculation risks',
      'Purpose of hedging (reduce volatility, not necessarily save money)',
    ],
    sampleResponse: `MEMORANDUM

TO: Chief Executive Officer
FROM: [Candidate Name], Treasury Analyst
DATE: [Current Date]
RE: Hedging Strategy for €1,000,000 Payable

I have evaluated the currency risk associated with our upcoming €1,000,000 payment due in 90 days.

RISK EXPOSURE

We have a "short" position in Euros. We owe Euros.
- Risk: If the Euro strengthens (costs more dollars), our cost of goods sold increases, hurting our margin.
- Opportunity: If the Dollar strengthens (Euros become cheaper), our cost decreases.

COMPARISON OF STRATEGIES

1. Forward Contract (CFO's Plan):
   Rate: $1.12/€
   Guaranteed Cost: €1,000,000 × $1.12 = $1,120,000.
   Outcome: We lock in this cost. No surprises.

2. Unhedged (CEO's Plan):
   We pay whatever the spot rate is in 90 days.
   If rate goes to $1.05 (CEO Correct): Cost = $1,050,000. (Savings: $70,000)
   If rate goes to $1.20 (CEO Wrong): Cost = $1,200,000. (Loss: $80,000 over forward)

PURPOSE OF HEDGING

The primary purpose of corporate hedging is not to generate profit, but to reduce volatility and ensure predictable cash flows. By remaining unhedged, we are effectively speculating in the currency market. If the rate moves against us to $1.20, could our profit margin on this merchandise absorb an $80,000 cost increase?

RECOMMENDATION

I recommend entering the Forward Contract. While the $1.12 rate represents a premium over today's spot rate, it eliminates the catastrophic risk of a rate spike. As an importer, our core competency is sourcing and selling goods, not speculating on foreign exchange directions. Certainty of margins is more valuable than the potential savings from speculation.`,
    rubric: {
      organization: { weight: 30, criteria: [
        'Uses proper memo format addressed to CEO',
        'Organizes into risk exposure, strategy comparison, hedging purpose, and recommendation',
        'Presents scenarios in clear comparative format',
        'Provides definitive recommendation with supporting rationale',
      ]},
      development: { weight: 40, criteria: [
        'Explains transaction exposure (short Euro position) correctly',
        'Calculates forward contract cost precisely ($1,120,000)',
        'Presents worst-case unhedged scenario with specific dollar impact',
        'Distinguishes corporate hedging purpose from currency speculation',
        'Addresses the CEO argument about dollar strengthening with risk analysis',
      ]},
      expression: { weight: 30, criteria: [
        'Maintains professional treasury communication tone',
        'Uses correct FX and derivatives terminology (spot rate, forward rate, hedge)',
        'Presents scenario comparisons clearly with dollar amounts',
        'Demonstrates proper grammar and persuasive professional writing',
      ]},
    },
  }
];
