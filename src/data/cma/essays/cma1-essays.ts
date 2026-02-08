import { WCTask } from '../../../types';

export const CMA1_ESSAYS: WCTask[] = [
  {
    id: 'cma1-wc-001',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Performance Measurement - ROI vs. Residual Income',
    difficulty: 'hard',
    estimatedTime: 30,
    blueprintArea: 'CMA1-C',
    scenario: `You are the controller for Diversified Holdings, a company with multiple autonomous divisions. The Consumer Products Division manager, Sarah Chen, recently rejected an investment opportunity because it would lower her division's Return on Investment (ROI), which is currently 18%, well above the company's cost of capital of 10%.
    
    The rejected project required an investment of $2,000,000 and would generate annual operating income of $280,000.
    
    The CEO, Mark Sterling, is concerned that profitable opportunities are being missed and has asked you to evaluate whether the current performance measurement system is aligning divisional goals with corporate goals.`,
    task: `Write a memo to the CEO that:
1. Calculates the ROI of the rejected project and explains why the division manager rejected it.
2. Calculates the Residual Income (RI) of the rejected project using the company's 10% cost of capital.
3. Explains the conflict between ROI and Residual Income in this scenario.
4. Recommends whether the company should switch to Residual Income for divisional performance evaluation, citing advantages and potential drawbacks.`,
    keyPoints: [
      'Project ROI calculation (14%) vs Division ROI (18%)',
      'Residual Income calculation ($80,000 positive)',
      'Goal congruence issues with ROI',
      'RI advantages (aligns with cost of capital)',
      'RI drawbacks (size bias)',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format with TO, FROM, DATE, RE fields',
          'Organizes analysis into clear sections (ROI analysis, RI analysis, conflict, recommendation)',
          'Presents calculations before explanations in a logical sequence',
          'Includes a clear recommendation section with summary',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly calculates project ROI as 14% ($280,000 / $2,000,000)',
          'Correctly calculates Residual Income as $80,000 ($280,000 − $200,000)',
          'Explains the goal congruence conflict: ROI penalizes managers for accepting projects above cost of capital but below current divisional ROI',
          'Identifies advantages of RI (encourages value-creating investments) and drawbacks (absolute dollar bias favoring larger divisions)',
          'Addresses all four task requirements thoroughly',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a memo to the CEO',
          'Employs correct accounting and performance measurement terminology (ROI, residual income, cost of capital, goal congruence)',
          'Writes in clear, concise sentences free of grammatical errors',
          'Avoids unnecessary jargon while maintaining technical accuracy',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Mark Sterling, CEO
FROM: [Candidate Name], Controller
DATE: [Current Date]
RE: Evaluation of Divisional Performance Measurement Systems

I have reviewed the investment decision made by the Consumer Products Division and analyzed the effectiveness of our current ROI-based performance measurement system.

ANALYSIS OF THE REJECTED PROJECT

The project in question required a $2,000,000 investment and generated $280,000 in operating income.

1. ROI Analysis:
   Project ROI = $280,000 / $2,000,000 = 14%
   
   Since the division's current ROI is 18%, accepting a project with a 14% return would reduce the division's overall average ROI. This creates a disincentive for the manager to accept the project, even though the 14% return exceeds our company's 10% cost of capital.

2. Residual Income Analysis:
   Minimum Required Return = $2,000,000 × 10% = $200,000
   Residual Income = Actual Income - Required Return
   Residual Income = $280,000 - $200,000 = $80,000

   Under a Residual Income model, this project generates a positive value of $80,000 for the company.

GOAL CONGRUENCE CONFLICT

The current situation demonstrates a lack of goal congruence. The ROI metric incentivized the manager to reject a project that would have added value to the company (returns > cost of capital) simply because it diluted her high average return. ROI tends to encourage managers of high-performing divisions to underinvest.

RECOMMENDATION

I recommend Diversified Holdings switch to Residual Income (RI) or Economic Value Added (EVA) for evaluating financial performance of autonomous divisions.

Advantages of Residual Income:
- It aligns divisional decisions with shareholder value; managers will accept any project earning above the cost of capital.
- It solves the underinvestment problem seen in this scenario.
- It allows for different risk-adjusted costs of capital for different divisions.

Drawbacks to Consider:
- RI measures absolute dollars, which biases results in favor of larger divisions (unlike ROI which is a percentage).
- It relies on accounting income rather than cash flow.

To mitigate the size bias, we can assess RI growth or performance relative to budgeted RI, rather than just the absolute number. Switching to RI will ensure managers prioritize total dollar value creation over efficiency ratios.`,
  },
  {
    id: 'cma1-wc-002',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Budgeting - Static vs. Flexible Budgets',
    difficulty: 'medium',
    estimatedTime: 30,
    blueprintArea: 'CMA1-B',
    scenario: `The manufacturing manager of Alpha Corp, John Davis, is upset about his performance review. He received a negative evaluation because his department was $50,000 "over budget" in variable costs.
    
    The static budget was based on producing 10,000 units.
    - Budgeted variable costs: $200,000 ($20/unit)
    - Budgeted fixed costs: $100,000
    
    Actual results for the period:
    - Production: 12,000 units
    - Actual variable costs: $250,000
    - Actual fixed costs: $102,000
    
    John argues that he actually saved the company money because he produced more units efficiently.`,
    task: `Write a memo to the CFO that:
1. Explains the concept of a flexible budget and why comparing actual results to a static budget is misleading when activity levels change.
2. Prepares a broad flexible budget analysis for variable costs in this scenario.
3. Determines if John's claim that he was efficient is correct.
4. Recommends changes to the monthly reporting process for manufacturing departments.`,
    keyPoints: [
      'Static budget flaw: ignores volume changes',
      'Flexible budget calculation (12,000 units * $20 = $240,000)',
      'Spending variance vs Volume variance',
      'Variable cost efficiency',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the CFO',
          'Separates static budget limitations, flexible budget analysis, efficiency evaluation, and recommendations into distinct sections',
          'Presents numerical analysis before conclusions in a logical flow',
          'Includes clear headings that correspond to each task requirement',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Correctly calculates the flexible budget for variable costs at 12,000 units ($240,000)',
          'Identifies the $10,000 unfavorable spending variance (actual $250,000 − flexible $240,000)',
          'Separates the volume variance ($40,000) from the spending variance ($10,000)',
          'Evaluates John\'s claim accurately: partially correct (static budget overstated variance) but not fully efficient ($10,000 unfavorable)',
          'Recommends actionable improvements to the reporting process (flexible budgeting, variance decomposition)',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for communication with a CFO',
          'Employs correct budgeting terminology (static budget, flexible budget, spending variance, volume variance)',
          'Presents calculations clearly with supporting labels and formulas',
          'Writes in concise, grammatically correct sentences',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: CFO, Alpha Corp
FROM: [Candidate Name], Management Accountant
DATE: [Current Date]
RE: Analysis of Manufacturing Performance Evaluation

I have reviewed the performance evaluation for the manufacturing department and John Davis's concerns regarding the budget variances.

THE LIMITATIONS OF STATIC BUDGETS

The current evaluation compares actual costs at 12,000 units of production against a static budget built for 10,000 units. This comparison is invalid because variable costs naturally increase with volume. Labeling the $50,000 increase in variable costs as "unfavorable" conflates spending efficiency with volume limits.

FLEXIBLE BUDGET ANALYSIS

To properly evaluate performance, we must "flex" the budget to the actual level of activity (12,000 units).

1. Standard Variable Cost per Unit: $200,000 / 10,000 units = $20/unit.
2. Flexible Budget for 12,000 Units: 12,000 units × $20 = $240,000.

Variance Calculation:
- Actual Variable Costs: $250,000
- Flexible Budget: $240,000
- Flexible Budget Variance: $10,000 Unfavorable

EVALUATION OF EFFICIENCY

Contrary to John's claim, these figures show that the department was NOT purely efficient. While the volume increase explains $40,000 of the extra cost, there is still a $10,000 unfavorable spending variance. This implies the department spent approximately $20.83 per unit ($250,000/12,000) rather than the budgeted $20.00.

However, John is partially correct that the original $50,000 reported variance was exaggerated.

RECOMMENDATIONS

1. Implement Flexible Budgeting: Monthly reports should include a flexible budget column that adjusts allowances based on actual output.
2. Separate Variances: Clearly distinguish between volume variances (caused by producing more/less) and spending/efficiency variances (caused by price or usage).
3. Investigate the $10,000 Variance: We should determine if the $10,000 spending variance was due to higher material prices, labor rates, or inefficient usage.

This approach will provide a fair and actionable basis for performance reviews.`,
  },
  {
    id: 'cma1-wc-003',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Internal Controls - Segregation of Duties',
    difficulty: 'medium',
    estimatedTime: 25,
    blueprintArea: 'CMA1-E',
    scenario: `You are the internal auditor for a mid-sized retail chain. During a recent visit to a regional office, you noted the following procedures regarding cash disbursements:
    
    "The Accounts Payable Clerk, Mike Johnson, is responsible for:
    1. Creating new vendor records in the master file.
    2. Receiving and verifying invoices.
    3. Printing checks for payment.
    4. Mailing checks to vendors.
    5. Reconciling the monthly bank statement."
    
    The Regional Manager argues that Mike is a trusted employee of 10 years and that separating these duties would be too costly for a small office.`,
    task: `Write a memo to the Regional Manager that:
1. Identifies the specific internal control weaknesses in the current process.
2. Explains the risks associated with these weaknesses (specifically fraud types).
3. Proposes a cost-effective redistribution of duties for a small office environment.
4. Explains why "trust" is not a sufficient internal control.`,
    keyPoints: [
      'Segregation of duties (ARC: Authorization, Record keeping, Custody)',
      'Specific fraud risk (fictitious vendors)',
      'Compensating controls for small offices',
      'Bank reconciliation independence',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the Regional Manager',
          'Organizes content into clear sections: weaknesses, risks, recommendations, and trust discussion',
          'Presents control weaknesses before proposing solutions',
          'Provides a practical redistribution plan that is easy to follow',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Identifies the ARC violation: one person controls Authorization, Record keeping, and Custody of assets',
          'Explains specific fraud risks such as fictitious vendor schemes enabled by the lack of segregation',
          'Proposes a cost-effective redistribution of duties feasible for a small office (e.g., manager signs checks, separate bank reconciliation)',
          'Explains why trust alone is not a control, referencing the Fraud Triangle concepts of opportunity and rationalization',
          'Addresses all four task requirements with sufficient depth',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses a professional but persuasive tone to convey urgency without being accusatory',
          'Employs correct internal control terminology (segregation of duties, compensating controls, authorization)',
          'Writes clearly and concisely with proper grammar',
          'Balances technical accuracy with accessibility for a non-audit audience',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Regional Manager
FROM: Internal Auditor
DATE: [Current Date]
RE: Urgent Control Weaknesses in Cash Disbursements

I am writing to address critical internal control deficiencies identified in the cash disbursement process. While I understand the concern regarding staffing costs and the high trust placed in current employees, the current structure presents a significant fraud risk.

IDENTIFIED WEAKNESSES

The core principle of internal control is the segregation of three key functions: Authorization, Record Keeping, and Custody of Assets. Currently, one employee manages all three:
- Authorization: Setting up vendors.
- Record Keeping: Recording invoices and reconciling bank statements.
- Custody: Printing and mailing checks.

RISK EXPOSURE

This concentration of duties creates a perfect opportunity for fraud. Specifically:
1. Fictitious Vendors: The clerk could create a fake vendor record, approve a fake invoice, print a check to themselves, and then alter the bank reconciliation to hide the transaction.
2. Kickbacks: The clerk could favor specific vendors without oversight.

Trust is a character trait, not a control. Even honest employees can be tempted by financial pressure if opportunity exists (the Fraud Triangle).

RECOMMENDATIONS

For a small office, we can segregate duties without hiring new staff by involving you (Management) or another existing employee:

1. Vendor Master File: You (Manager) should be the only one authorized to add or edit new vendors.
2. Check Signing/Mailing: The clerk can prepare checks, but you should sign and mail them after reviewing supporting documentation.
3. Bank Reconciliation: The monthly bank statement should be mailed directly to you or the home office for reconciliation, or verified by someone other than the person writing checks.

These changes add minimal time but significantly reduce the risk of asset misappropriation.`,
  },
  {
    id: 'cma1-wc-004',
    section: 'CMA1',
    type: 'written_communication',
    topic: 'Activity-Based Costing Concepts and Cross-Subsidization',
    difficulty: 'hard',
    estimatedTime: 40,
    blueprintArea: 'CMA1-D',
    scenario: `Precision Parts Inc. manufactures two products: Standard Widgets (high volume, simple) and Custom Gadgets (low volume, complex). 
    
    Currently, the company allocates overhead based on direct labor hours.
    - Standard Widgets: 50,000 units, 2 DLH/unit.
    - Custom Gadgets: 5,000 units, 3 DLH/unit.
    
    Management is confused because competitors are selling similar "Standard Widgets" for significantly less than Precision's reported cost, while Precision dominates the "Custom Gadgets" market with high margins.
    
    You suspect the costing method is distorting product costs.`,
    task: `Write a memo to the Production Director that:
1. Explains why the current volume-based allocation (DLH) likely distorts cost information.
2. Describes how Activity-Based Costing (ABC) differs from the current method.
3. Predicts how implementing ABC would likely change the reported costs of Standard Widgets and Custom Gadgets (cost cross-subsidization).
4. Explains how this improved costing data could explain the market situation and influence strategic pricing decisions.`,
    keyPoints: [
      'Volume-based allocation flaws (peanut-butter costing)',
      'ABC cost drivers',
      'Cost cross-subsidization (Low volume/complex products undercosted)',
      'Strategic pricing implications',
    ],
    rubric: {
      organization: {
        weight: 30,
        criteria: [
          'Uses proper memo format addressed to the Production Director',
          'Organizes content logically: current method flaws, ABC explanation, predicted impact, strategic implications',
          'Transitions clearly from problem identification to solution and recommendation',
          'Includes a concluding recommendation section',
        ],
      },
      development: {
        weight: 40,
        criteria: [
          'Explains why volume-based allocation (DLH) distorts costs when products have different complexity levels',
          'Describes ABC methodology and the concept of multiple cost drivers tied to activities',
          'Predicts that Standard Widgets are over-costed and Custom Gadgets are under-costed (cross-subsidization)',
          'Connects the costing distortion to market observations: competitors undercutting on Standard Widgets, dominance in Custom Gadgets at potentially unprofitable prices',
          'Recommends strategic pricing adjustments based on corrected cost data',
        ],
      },
      expression: {
        weight: 30,
        criteria: [
          'Uses professional tone appropriate for a memo to the Production Director',
          'Employs correct cost accounting terminology (activity-based costing, cost drivers, cross-subsidization, overhead allocation)',
          'Explains technical concepts in a way accessible to a non-accountant audience',
          'Writes clearly and concisely with proper grammar and sentence structure',
        ],
      },
    },
    sampleResponse: `MEMORANDUM

TO: Production Director
FROM: [Candidate Name], Cost Accountant
DATE: [Current Date]
RE: Evaluation of Product Costing and Competitive Pricing

I have analyzed our current cost allocation methods in light of our competitive challenges with Standard Widgets and our success with Custom Gadgets. It appears our traditional costing system is causing "cost cross-subsidization," leading to poor strategic decisions.

THE PROBLEM WITH VOLUME-BASED ALLOCATION

We currently allocate overhead based solely on Direct Labor Hours. This assumes that overhead costs are driven entirely by volume. However, Custom Gadgets likely consume a disproportionate share of support activities (setups, inspections, engineering orders) due to their complexity and small batch sizes.

By spreading these complex costs over all labor hours, we are:
1. Over-costing the high-volume Standard Widgets.
2. Under-costing the low-volume, complex Custom Gadgets.

ACTIVITY-BASED COSTING (ABC) SOLUTION

ABC allocates costs based on the activities that actually drive them (e.g., number of setups, number of parts), rather than just labor volume.

PREDICTED IMPACT

If we implement ABC, I expect to see:
- Standard Widgets Cost: Will DECREASE. They require minimal setups and engineering relative to their volume. We are currently burdening them with the costs of managing the Custom line.
- Custom Gadgets Cost: Will INCREASE significantly. The true cost of their complexity will be assigned directly to them.

STRATEGIC IMPLICATIONS

This explains our market position:
1. Standard Widgets: We think our costs are high, so we price high. Competitors with better costing systems know the true cost is lower and are undercutting us.
2. Custom Gadgets: We think our costs are low, so we price low. We are likely selling them at a loss or minimal profit without realizing it, which is why we "dominate" the market—we are subsidizing our customers.

I recommend a pilot ABC study to recalculate product margins. This will likely lead us to lower prices on Standard Widgets to regain market share and raise prices on Custom Gadgets to ensure profitability.`,
  }
];
