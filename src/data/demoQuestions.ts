/**
 * Demo Questions for the "Try 5 Questions Free" feature
 * 
 * Hand-picked questions from each course that demonstrate variety
 * and give users a taste of the real content before signup.
 * These are shown on the /demo-practice page without authentication.
 */

import type { CourseId } from '../types/course';

export interface DemoQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  topic: string;
}

// CPA Demo Questions - covering different sections
const CPA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cpa-far-1',
    question: 'Which financial statement reports a company\'s financial position at a specific point in time?',
    options: [
      'Income Statement',
      'Statement of Cash Flows',
      'Balance Sheet',
      'Statement of Retained Earnings'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Balance Sheet**

The Balance Sheet (also called Statement of Financial Position) presents a snapshot of what a company owns (assets), owes (liabilities), and the residual interest (equity) at a specific date—"as of December 31, 2025."

**Why the other answers are wrong:**
• **A) Income Statement** — Reports revenues and expenses over a PERIOD of time (e.g., "for the year ended December 31"), not a point in time. It shows performance, not position.
• **B) Statement of Cash Flows** — Also covers a period, showing cash inflows and outflows from operating, investing, and financing activities.
• **D) Statement of Retained Earnings** — Reconciles beginning to ending retained earnings over a period, connecting net income and dividends.

**Exam Tip:** Remember the key distinction: "AS OF" = point in time (Balance Sheet); "FOR THE PERIOD" = period of time (Income Statement, Cash Flows). This concept appears frequently on FAR.`,
    section: 'FAR',
    topic: 'Financial Statements'
  },
  {
    id: 'demo-cpa-aud-1',
    question: 'What is the primary purpose of obtaining an understanding of internal control in a financial statement audit?',
    options: [
      'To design substantive procedures',
      'To assess the risk of material misstatement',
      'To detect fraud',
      'To evaluate management integrity'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) To assess the risk of material misstatement**

Under AU-C 315, auditors must understand internal control to identify and assess the risks of material misstatement (RMM) at both the financial statement and assertion levels. This risk assessment drives the entire audit strategy.

**Why the other answers are wrong:**
• **A) To design substantive procedures** — This is a RESULT of risk assessment, not the primary purpose. You assess RMM first, then design procedures accordingly.
• **C) To detect fraud** — Fraud detection is an objective, but understanding controls is primarily about risk assessment. Detection comes from the procedures designed after assessment.
• **D) To evaluate management integrity** — While relevant to engagement acceptance, this isn't the primary purpose of understanding internal controls.

**Exam Tip:** The audit risk model (AR = RMM × DR) shows why risk assessment comes first—you assess RMM to determine the acceptable level of detection risk, which then guides your substantive procedures.

**Common Mistake:** Confusing the purpose (risk assessment) with the outcome (procedure design). The purpose is understanding risk; procedure design is what you do with that understanding.`,
    section: 'AUD',
    topic: 'Internal Controls'
  },
  {
    id: 'demo-cpa-reg-1',
    question: 'A calendar-year taxpayer files their federal income tax return on April 10. When does the statute of limitations for IRS assessment typically expire?',
    options: [
      'April 10, three years later',
      'April 15, three years later',
      'April 10, six years later',
      'There is no statute of limitations'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) April 15, three years later**

The general statute of limitations for IRS assessment is 3 years from the LATER of: (1) the date filed, or (2) the due date. Since the return was filed April 10 but the due date is April 15, the statute runs from April 15—making the expiration April 15 three years later.

**Why the other answers are wrong:**
• **A) April 10, three years later** — Early filing doesn't start the clock early. Returns filed before the due date are deemed filed ON the due date.
• **C) April 10, six years later** — The 6-year statute applies only when gross income is understated by more than 25%. This is an exception, not the general rule.
• **D) There is no statute of limitations** — While true for fraud or failure to file, there IS a statute for properly filed returns.

**Exam Tip:** Remember the exceptions that extend or eliminate the statute:
• 6 years: Omission of 25%+ of gross income
• No limit: Fraud, failure to file, false return

**Common Mistake:** Thinking that filing early gives you an earlier statute expiration. The IRS treats early-filed returns as filed on the due date to prevent gaming the system.`,
    section: 'REG',
    topic: 'Federal Taxation'
  },
  {
    id: 'demo-cpa-bar-1',
    question: 'When using regression analysis for forecasting, what does the R-squared (R²) value represent?',
    options: [
      'The slope of the regression line',
      'The correlation between two variables',
      'The proportion of variance explained by the model',
      'The standard error of the estimate'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) The proportion of variance explained by the model**

R-squared (coefficient of determination) measures how much of the variability in the dependent variable (Y) is explained by the independent variable(s) (X). An R² of 0.85 means 85% of the variation in Y is explained by the model, with 15% unexplained.

**Why the other answers are wrong:**
• **A) The slope of the regression line** — The slope (β₁) represents the change in Y for each unit change in X. This is a DIFFERENT statistic, not R².
• **B) The correlation between two variables** — You're thinking of "r" (correlation coefficient). R² = r² in simple regression, but they measure different things. The correlation measures strength and direction; R² measures explanatory power.
• **D) The standard error of the estimate** — This measures the average distance between observed values and the regression line—a measure of precision, not explanatory power.

**Exam Tip:** R² ranges from 0 to 1. Higher is generally better, but be cautious—a very high R² with few data points may indicate overfitting.

**Key Formula:** R² = 1 - (SS_residual / SS_total) = Explained Variation / Total Variation`,
    section: 'BAR',
    topic: 'Data Analytics'
  },
  {
    id: 'demo-cpa-isc-1',
    question: 'Which control is MOST effective for preventing unauthorized access to a computer system?',
    options: [
      'Activity logging',
      'Encryption of data at rest',
      'Multi-factor authentication',
      'Regular security awareness training'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Multi-factor authentication**

MFA is a PREVENTIVE control that stops unauthorized access before it happens by requiring multiple verification factors: something you KNOW (password), something you HAVE (phone/token), or something you ARE (biometric). This makes unauthorized access exponentially harder.

**Why the other answers are wrong:**
• **A) Activity logging** — This is a DETECTIVE control—it identifies unauthorized access after it occurs but doesn't prevent it. Logging helps with investigation and audit trails, not prevention.
• **B) Encryption of data at rest** — Protects data confidentiality if accessed, but doesn't prevent the access itself. An attacker could still access encrypted data; they just can't read it.
• **D) Regular security awareness training** — A valuable preventive measure against social engineering, but relies on human behavior. MFA provides technical enforcement regardless of user awareness.

**Exam Tip:** Know your control types:
• PREVENTIVE: Stops incidents (MFA, access controls, segregation of duties)
• DETECTIVE: Identifies incidents (logging, monitoring, reconciliations)
• CORRECTIVE: Fixes after incidents (backups, patches, incident response)

**Common Mistake:** Confusing encryption with access control. Encryption protects data confidentiality IF accessed; MFA prevents the access itself.`,
    section: 'ISC',
    topic: 'IT Controls'
  }
];

// EA Demo Questions - covering SEE Parts 1-3
const EA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-ea-see1-1',
    question: 'A taxpayer received $3,000 in qualified dividends. How are these dividends taxed?',
    options: [
      'As ordinary income at the taxpayer\'s marginal rate',
      'At the preferential capital gains rates (0%, 15%, or 20%)',
      'They are not taxable',
      'At a flat 28% rate'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) At the preferential capital gains rates (0%, 15%, or 20%)**

Qualified dividends receive the same preferential tax treatment as long-term capital gains. The rate depends on the taxpayer's taxable income bracket:
• 0% rate: If in the 10% or 12% ordinary income bracket
• 15% rate: If in the 22%, 24%, 32%, or 35% bracket
• 20% rate: If in the 37% bracket

**Why the other answers are wrong:**
• **A) As ordinary income** — This applies to NON-qualified (ordinary) dividends only. Qualified dividends specifically qualify for preferential treatment.
• **C) They are not taxable** — Dividends are taxable unless held in tax-advantaged accounts (IRA, 401k) or certain municipal bond dividends.
• **D) At a flat 28% rate** — The 28% rate applies to collectibles gains and certain Section 1250 recapture, not dividends.

**What makes dividends "qualified"?**
1. Paid by a U.S. corporation or qualifying foreign corporation
2. Holding period: Stock held 60+ days during the 121-day period around the ex-dividend date
3. Not listed as non-qualified (e.g., certain REIT dividends, money market dividends)

**Exam Tip:** The SEE frequently tests the distinction between qualified and ordinary dividends. Remember: qualified = capital gains rates; ordinary = marginal rates.`,
    section: 'SEE1',
    topic: 'Individual Income'
  },
  {
    id: 'demo-ea-see1-2',
    question: 'The standard deduction for a single taxpayer in 2025 is:',
    options: [
      '$13,850',
      '$14,600',
      '$15,000',
      '$20,800'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) $14,600**

For tax year 2025, the standard deduction amounts are:
• Single / Married Filing Separately: **$14,600**
• Head of Household: $21,900
• Married Filing Jointly / Qualifying Surviving Spouse: $29,200

**Why the other answers are wrong:**
• **A) $13,850** — This was the 2023 standard deduction for single filers. Standard deductions are adjusted annually for inflation.
• **C) $15,000** — This is not a valid standard deduction amount for any filing status in 2025.
• **D) $20,800** — This is close to the Head of Household amount but not exact, and not the single filer amount.

**Additional standard deduction for age/blindness (2025):**
• Single/HOH: +$1,950 per qualifying condition
• Married: +$1,550 per qualifying condition

**Exam Tip:** The EA exam tests current-year amounts. Memorize the standard deduction for all filing statuses and the additional amounts for age 65+ and blindness. These amounts change annually with inflation adjustments.

**Common Mistake:** Confusing prior year amounts with current year. The IRS releases inflation-adjusted figures each fall for the following tax year.`,
    section: 'SEE1',
    topic: 'Deductions'
  },
  {
    id: 'demo-ea-see2-1',
    question: 'Which entity type is subject to double taxation on its income?',
    options: [
      'S Corporation',
      'Partnership',
      'C Corporation',
      'Sole Proprietorship'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) C Corporation**

C Corporations face "double taxation" because income is taxed at TWO levels:
1. **Corporate level:** The corporation pays tax on its taxable income (21% flat rate)
2. **Shareholder level:** When dividends are distributed, shareholders pay tax on them as income

**Why the other answers are wrong:**
• **A) S Corporation** — Pass-through entity. Income flows to shareholders' personal returns (K-1), taxed only once at the shareholder level. No corporate-level tax.
• **B) Partnership** — Pass-through entity. Income flows to partners' returns via Schedule K-1. Taxed only at the partner level.
• **D) Sole Proprietorship** — Pass-through. Business income reported on Schedule C flows directly to the owner's Form 1040. Single level of taxation.

**Pass-through entities include:**
• S Corporations (Form 1120-S)
• Partnerships (Form 1065)
• LLCs (default: partnership or disregarded entity)
• Sole Proprietorships (Schedule C)

**Why would anyone choose C Corp status?**
• Access to more capital (unlimited shareholders)
• Lower corporate rate (21%) vs. high individual rates (37%)
• Retained earnings accumulation for business growth
• Qualified Small Business Stock (QSBS) exclusion potential

**Exam Tip:** SEE Part 2 heavily tests entity selection and taxation differences. Know the flow of income for each entity type.`,
    section: 'SEE2',
    topic: 'Business Entities'
  },
  {
    id: 'demo-ea-see3-1',
    question: 'What is the maximum civil penalty per unauthorized disclosure of tax return information?',
    options: [
      '$250',
      '$500',
      '$1,000',
      '$5,000'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) $1,000**

Under IRC Section 6713, the civil penalty for unauthorized disclosure or use of tax return information is **$1,000 per disclosure**. This applies to tax return preparers, enrolled agents, CPAs, and attorneys.

**Why the other answers are wrong:**
• **A) $250** — This is the penalty for failure to furnish copy to taxpayer (IRC 6695(a)) or failure to sign return (6695(b)).
• **B) $500** — This is the penalty for failure to retain copy (IRC 6695(d)) or failure to be diligent regarding earned income credit (6695(g)).
• **D) $5,000** — This is the penalty for understatement due to unreasonable position without disclosure (IRC 6694(a)).

**Criminal penalties for willful disclosure:**
In addition to civil penalties, WILLFUL unauthorized disclosure can result in:
• Up to $1,000 fine
• Up to 1 year imprisonment
• Both

**What constitutes unauthorized disclosure?**
• Sharing client information without consent
• Using client data for personal benefit
• Disclosing information to third parties not authorized by IRC

**Exam Tip:** SEE Part 3 tests penalties extensively. Create a penalty chart with IRC sections, amounts, and triggers. The exam loves to test specific dollar amounts.`,
    section: 'SEE3',
    topic: 'Practice & Procedures'
  },
  {
    id: 'demo-ea-see3-2',
    question: 'How long must an Enrolled Agent retain copies of tax returns prepared for clients?',
    options: [
      '1 year',
      '3 years',
      '5 years',
      '7 years'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) 3 years**

Under Treasury Circular 230, Section 10.28, practitioners must retain copies of returns (or a list of taxpayers for whom returns were prepared) for **3 years** after the close of the return period.

**Why the other answers are wrong:**
• **A) 1 year** — Too short. This doesn't align with the 3-year statute of limitations.
• **C) 5 years** — Some practitioners keep records longer as best practice, but 3 years is the regulatory requirement.
• **D) 7 years** — This may be a state requirement or business best practice for some documents, but Circular 230 specifies 3 years.

**The "return period" explained:**
• For individual returns: The year the return was filed (e.g., 2024 return filed in 2025 → retain until 2028)
• The 3-year period mirrors the general statute of limitations for IRS assessment

**What must be retained?**
Either:
1. A complete copy of each return, OR
2. A list containing the taxpayer's name, ID number, tax year, and type of return

**Exam Tip:** Circular 230 is a major topic on SEE Part 3. Know key sections:
• 10.21 - Knowledge of client omission
• 10.28 - Return retention (3 years)
• 10.29 - Conflicting interests
• 10.33 - Best practices

**Common Mistake:** Confusing the 3-year retention requirement with the 6-year or 7-year retention often recommended for business records. The exam tests Circular 230 specifically.`,
    section: 'SEE3',
    topic: 'Circular 230'
  }
];

// CMA Demo Questions - covering Parts 1 and 2
const CMA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cma-1-1',
    question: 'Which budgeting approach requires managers to justify all expenses from zero each period?',
    options: [
      'Incremental budgeting',
      'Activity-based budgeting',
      'Zero-based budgeting',
      'Rolling budgeting'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Zero-based budgeting**

Zero-based budgeting (ZBB) requires every expense to be justified from a "zero base" each budgeting period. Managers must build their budgets from scratch, evaluating every activity and expense as if starting new—nothing is automatically carried forward from the prior period.

**Why the other answers are wrong:**
• **A) Incremental budgeting** — The OPPOSITE approach. Starts with last year's actual or budgeted amounts and adjusts by a percentage or fixed amount. Quick but may perpetuate inefficiencies.
• **B) Activity-based budgeting (ABB)** — Focuses on activities that drive costs and allocates resources based on activities required to meet output levels. It's thorough but doesn't require justification from zero.
• **D) Rolling budgeting** — A timing approach (not a philosophy) where a new period is added as each period ends, maintaining a constant planning horizon (e.g., always 12 months ahead).

**Advantages of ZBB:**
• Forces critical evaluation of all activities
• Eliminates "budget bloat" and unnecessary spending
• Aligns resources with current strategic priorities

**Disadvantages of ZBB:**
• Time-intensive and resource-heavy
• May discourage long-term investment
• Requires significant management training

**Exam Tip:** The CMA exam often contrasts ZBB with incremental budgeting. Know the trade-offs: ZBB is thorough but costly; incremental is efficient but may perpetuate waste.`,
    section: 'CMA1',
    topic: 'Budgeting'
  },
  {
    id: 'demo-cma-1-2',
    question: 'What is the formula for contribution margin ratio?',
    options: [
      '(Sales - Variable Costs) / Fixed Costs',
      '(Sales - Fixed Costs) / Sales',
      '(Sales - Variable Costs) / Sales',
      'Variable Costs / Sales'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) (Sales - Variable Costs) / Sales**

The Contribution Margin Ratio (CM Ratio) shows what percentage of each sales dollar is available to cover fixed costs and contribute to profit.

**Formula:** CM Ratio = (Sales - Variable Costs) / Sales = Contribution Margin / Sales

**Why the other answers are wrong:**
• **A) (Sales - Variable Costs) / Fixed Costs** — This isn't a standard ratio. Dividing by fixed costs gives a meaningless multiple.
• **B) (Sales - Fixed Costs) / Sales** — This subtracts fixed costs from sales, which doesn't match any standard CVP concept. Variable costs should be subtracted first.
• **D) Variable Costs / Sales** — This is the Variable Cost Ratio (VC ratio). Note: CM Ratio + VC Ratio = 100%.

**Practical Example:**
If a product sells for $100 with $60 variable costs:
• Contribution Margin = $100 - $60 = $40
• CM Ratio = $40 / $100 = **40%**
• For every $1 of sales, $0.40 covers fixed costs and profit

**Key CVP Relationships:**
• Breakeven Units = Fixed Costs / CM per Unit
• Breakeven Sales $ = Fixed Costs / CM Ratio
• Target Sales $ = (Fixed Costs + Target Profit) / CM Ratio

**Exam Tip:** The CM ratio is essential for "what-if" analysis. A higher CM ratio means changes in sales have a larger impact on profit—high operating leverage.`,
    section: 'CMA1',
    topic: 'Cost-Volume-Profit'
  },
  {
    id: 'demo-cma-1-3',
    question: 'Under absorption costing, which costs are included in inventory?',
    options: [
      'Only variable manufacturing costs',
      'All manufacturing costs (fixed and variable)',
      'All variable costs (manufacturing and non-manufacturing)',
      'Only direct materials and direct labor'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) All manufacturing costs (fixed and variable)**

Absorption costing (also called "full costing") includes ALL manufacturing costs in inventory:
• Direct Materials (DM)
• Direct Labor (DL)
• Variable Manufacturing Overhead (VOH)
• **Fixed Manufacturing Overhead (FOH)** ← This is the key difference!

**Why the other answers are wrong:**
• **A) Only variable manufacturing costs** — This describes VARIABLE costing (direct costing), not absorption costing. Variable costing treats FOH as a period expense.
• **C) All variable costs (manufacturing and non-manufacturing)** — Non-manufacturing costs (selling & administrative) are NEVER inventoried under either method. They're always period costs.
• **D) Only direct materials and direct labor** — This excludes all overhead (both variable and fixed), which must be included.

**Absorption vs. Variable Costing Comparison:**

| Cost Type | Absorption | Variable |
|-----------|------------|----------|
| Direct Materials | Product | Product |
| Direct Labor | Product | Product |
| Variable MOH | Product | Product |
| Fixed MOH | **Product** | **Period** |
| Selling & Admin | Period | Period |

**Exam Tip:** When production > sales, absorption costing shows HIGHER profit (FOH is "hidden" in ending inventory). When production < sales, variable costing shows higher profit. This is a very common exam question!

**Why it matters:** Absorption costing is required for GAAP external reporting. Variable costing is useful for internal decision-making.`,
    section: 'CMA1',
    topic: 'Product Costing'
  },
  {
    id: 'demo-cma-2-1',
    question: 'A project has an NPV of $50,000 and a profitability index of 1.25. What is the initial investment?',
    options: [
      '$40,000',
      '$62,500',
      '$200,000',
      '$250,000'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) $200,000**

The Profitability Index (PI) formula is:
**PI = PV of Future Cash Flows / Initial Investment**

We can also express it as: PI = (NPV + Initial Investment) / Initial Investment

**Step-by-step solution:**
Given: NPV = $50,000, PI = 1.25

From the relationship: NPV = PV of flows - Initial Investment

If PI = 1.25, then: PV of flows = 1.25 × Initial Investment

Therefore: NPV = (1.25 × Initial) - Initial = 0.25 × Initial

$50,000 = 0.25 × Initial Investment
**Initial Investment = $50,000 / 0.25 = $200,000**

**Verification:**
PV of future cash flows = $200,000 × 1.25 = $250,000
NPV = $250,000 - $200,000 = $50,000 ✓

**Why the other answers are wrong:**
• **A) $40,000** — Incorrect algebra; this would give PI of 2.25
• **B) $62,500** — This is $50,000 × 1.25, but that's not the right relationship
• **D) $250,000** — This is the PV of future cash flows, not the initial investment

**Interpreting the Profitability Index:**
• PI > 1.0: Accept (positive NPV)
• PI = 1.0: Indifferent (zero NPV)
• PI < 1.0: Reject (negative NPV)
• PI of 1.25 means: For every $1 invested, $1.25 in present value returns

**Exam Tip:** PI is particularly useful when capital is rationed—it measures value created per dollar invested, helping prioritize limited funds.`,
    section: 'CMA2',
    topic: 'Capital Budgeting'
  },
  {
    id: 'demo-cma-2-2',
    question: 'Which ethical standard requires management accountants to avoid conflicts of interest?',
    options: [
      'Competence',
      'Confidentiality',
      'Integrity',
      'Credibility'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Integrity**

The IMA Statement of Ethical Professional Practice has four principles. Under **Integrity**, management accountants shall:
• Mitigate actual conflicts of interest
• Avoid apparent conflicts of interest
• Refrain from activities that would prejudice their ability to carry out duties ethically
• Abstain from activities that discredit the profession

**Why the other answers are wrong:**
• **A) Competence** — Requires maintaining professional expertise, performing duties in accordance with laws, and providing accurate information. Not about conflicts of interest.
• **B) Confidentiality** — Requires keeping information confidential, not using information for personal advantage, and ensuring subordinates maintain confidentiality.
• **D) Credibility** — Requires communicating information fairly and objectively, disclosing all relevant information, and disclosing delays or deficiencies in information.

**The Four IMA Ethical Principles (remember: "4 C's in order"):**
1. **Competence** — Maintain knowledge and skills
2. **Confidentiality** — Protect information  
3. **Integrity** — Avoid conflicts, be honest
4. **Credibility** — Communicate fairly

**Conflict of Interest Examples:**
• Purchasing from a vendor owned by a family member without disclosure
• Using company resources for personal gain
• Accepting gifts that could influence decisions
• Having financial interest in a competitor

**Exam Tip:** Integrity encompasses honesty, ethics, and avoiding conflicts. When exam questions mention conflicts of interest, kickbacks, or ethical lapses that harm the organization, think "Integrity."

**Resolution Process:** IMA recommends discussing ethical issues with immediate supervisor, then higher levels, then audit committee, and finally legal counsel if unresolved.`,
    section: 'CMA2',
    topic: 'Ethics'
  }
];

// CIA Demo Questions - covering Parts 1-3
const CIA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cia-1-1',
    question: 'According to the IIA Standards, what is the primary purpose of internal auditing?',
    options: [
      'To detect fraud and financial misstatements',
      'To add value and improve an organization\'s operations',
      'To ensure compliance with laws and regulations',
      'To evaluate the accuracy of financial records'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) To add value and improve an organization's operations**

The IIA's official definition states that internal auditing is "an independent, objective assurance and consulting activity designed to **add value and improve an organization's operations**."

**Why the other answers are wrong:**
• **A) To detect fraud and financial misstatements** — While internal auditors consider fraud risks during audits, fraud DETECTION is not the primary purpose. Auditors assess fraud risk and controls but aren't primarily fraud investigators.
• **C) To ensure compliance with laws and regulations** — Compliance is ONE area internal auditors evaluate, but the broader purpose is adding value—which includes but isn't limited to compliance.
• **D) To evaluate the accuracy of financial records** — This is a narrow view aligned with external auditing. Internal audit has a much broader scope encompassing operations, strategy, and governance.

**Three Lines Model (formerly "Three Lines of Defense"):**
1. **First Line:** Operational management (owns and manages risk)
2. **Second Line:** Risk, compliance, IT security functions (oversee risk)
3. **Third Line:** Internal audit (provides independent assurance)

**How internal audit adds value:**
• Assurance services: Objective examination of evidence
• Consulting services: Advisory activities to improve processes
• Governance, Risk, and Control (GRC) insights

**Exam Tip:** The CIA exam emphasizes internal audit's value-adding role. Remember: it's not just about finding problems—it's about improving the organization. This perspective shift is fundamental to modern internal auditing.`,
    section: 'CIA1',
    topic: 'Internal Audit Foundations'
  },
  {
    id: 'demo-cia-1-2',
    question: 'Which attribute standard requires internal auditors to be impartial and avoid conflicts of interest?',
    options: [
      'Proficiency',
      'Objectivity',
      'Independence',
      'Due Professional Care'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) Objectivity**

Standard 1120 – Individual Objectivity states: "Internal auditors must have an **impartial, unbiased attitude** and avoid any conflict of interest."

**Why the other answers are wrong:**
• **A) Proficiency (1210)** — Requires auditors to possess the knowledge, skills, and competencies needed for their responsibilities. About capability, not mindset.
• **C) Independence (1100)** — An ORGANIZATIONAL attribute that refers to the internal audit function's reporting relationships and freedom from interference. Objectivity is the INDIVIDUAL counterpart.
• **D) Due Professional Care (1220)** — Requires auditors to apply the care and skill expected of a reasonably prudent auditor. About competent performance, not impartiality.

**Independence vs. Objectivity:**
| Attribute | Level | Focus |
|-----------|-------|-------|
| Independence (1100) | Organizational | Where IA reports, freedom from interference |
| Objectivity (1120) | Individual | Auditor's mindset, avoiding conflicts |

**Threats to Objectivity:**
• Self-review threat: Auditing your own prior work
• Social pressure: Pressure from management or colleagues
• Economic interest: Financial stake in audit outcome
• Familiarity threat: Close relationships with auditees

**Safeguards:**
• Disclosure of potential conflicts
• Rotation of audit assignments
• Supervisory review
• Declining conflicted engagements

**Exam Tip:** Objectivity is about the individual auditor's STATE OF MIND—being impartial and unbiased. Independence is about the audit function's ORGANIZATIONAL POSITIONING. Both are Attribute Standards (1000 series).`,
    section: 'CIA1',
    topic: 'Standards'
  },
  {
    id: 'demo-cia-2-1',
    question: 'What is the MOST effective method for detecting fraud according to ACFE research?',
    options: [
      'External audit',
      'Management review',
      'Tips and hotlines',
      'Internal audit'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Tips and hotlines**

According to the ACFE (Association of Certified Fraud Examiners) Report to the Nations, **tips are the #1 fraud detection method**, responsible for detecting approximately **43% of all fraud cases**.

**Why the other answers are wrong:**
• **A) External audit** — Detects only about 4% of fraud cases. External auditors focus on material misstatement, not specifically fraud detection, and use sampling that may miss fraud.
• **B) Management review** — Detects approximately 14% of fraud. While important, managers may miss fraud due to trust, time constraints, or involvement in the scheme.
• **D) Internal audit** — Detects approximately 15% of fraud. Valuable but not the most effective method. Internal auditors may audit on a schedule, while tips are continuous.

**ACFE Fraud Detection Methods (ranked by effectiveness):**
1. **Tips (43%)** — Anonymous hotlines, email, direct reports
2. **Internal Audit (15%)** — Planned audits and reviews
3. **Management Review (14%)** — Supervisory oversight
4. **By Accident (5%)** — Discovered incidentally
5. **External Audit (4%)** — Annual financial audits

**Why tips are so effective:**
• Employees observe behavior daily
• Tips come from people close to the scheme
• Anonymous reporting reduces fear of retaliation
• Tips operate continuously, not just during audits

**Implications for organizations:**
• Implement robust whistleblower hotlines
• Communicate the hotline widely
• Ensure anonymity and non-retaliation policies
• Act promptly on tips to encourage future reporting

**Exam Tip:** The CIA exam frequently references ACFE statistics. Remember that tips/hotlines detect the most fraud—this supports investment in whistleblower programs. Organizations with hotlines experience 50% lower fraud losses!`,
    section: 'CIA2',
    topic: 'Fraud Risk'
  },
  {
    id: 'demo-cia-3-1',
    question: 'What does the quick ratio (acid-test ratio) measure?',
    options: [
      'Overall financial leverage',
      'Ability to pay short-term obligations without selling inventory',
      'Profit margin on sales',
      'Return on total assets'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) Ability to pay short-term obligations without selling inventory**

The Quick Ratio (Acid-Test Ratio) measures a company's ability to meet short-term liabilities using its most liquid assets—EXCLUDING inventory.

**Formula:** Quick Ratio = (Current Assets - Inventory) / Current Liabilities
**Or:** Quick Ratio = (Cash + Marketable Securities + Accounts Receivable) / Current Liabilities

**Why the other answers are wrong:**
• **A) Overall financial leverage** — Measured by the Debt-to-Equity ratio or Debt ratio, not quick ratio. Leverage relates to long-term capital structure.
• **C) Profit margin on sales** — Measured by Net Profit Margin = Net Income / Sales. The quick ratio doesn't involve sales or profit at all.
• **D) Return on total assets** — Measured by ROA = Net Income / Total Assets. This is a profitability ratio, not a liquidity ratio.

**Why exclude inventory?**
Inventory may not be quickly convertible to cash:
• Takes time to sell
• May need to be discounted
• May be obsolete or damaged
• Manufacturing inventory requires further processing

**Interpreting the Quick Ratio:**
• Quick Ratio ≥ 1.0: Generally healthy—can cover immediate obligations with liquid assets
• Quick Ratio < 1.0: May need to sell inventory or obtain financing to meet obligations
• Industry context matters: Retailers operate with lower quick ratios

**Quick Ratio vs. Current Ratio:**
| Ratio | Formula | What's Included |
|-------|---------|-----------------|
| Current Ratio | CA / CL | All current assets including inventory |
| Quick Ratio | (CA - Inventory) / CL | Only liquid assets |

**Exam Tip:** The quick ratio is more conservative than the current ratio. When evaluating liquidity under stress scenarios, the quick ratio provides a better picture of immediate payment ability.`,
    section: 'CIA3',
    topic: 'Financial Analysis'
  },
  {
    id: 'demo-cia-3-2',
    question: 'Which IT control ensures that data has not been altered during transmission?',
    options: [
      'Encryption',
      'Authentication',
      'Hash functions (integrity checks)',
      'Access controls'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Hash functions (integrity checks)**

Hash functions create a unique fixed-length "fingerprint" (hash value) of data. If even one bit of data changes, the hash value changes completely. By comparing hash values before and after transmission, you can verify **data integrity**—that the data wasn't altered.

**Why the other answers are wrong:**
• **A) Encryption** — Protects **CONFIDENTIALITY** (keeps data secret) but doesn't inherently verify if data was altered. Encrypted data could still be corrupted or modified, even if unreadable.
• **B) Authentication** — Verifies **IDENTITY** (who sent the data or who is accessing the system). It doesn't verify the data itself wasn't changed.
• **D) Access controls** — Manage **AUTHORIZATION** (who can access what). They prevent unauthorized access but don't detect if authorized data was modified during transmission.

**The CIA Triad of Information Security:**
| Principle | Protects | Controls |
|-----------|----------|----------|
| **Confidentiality** | Secrecy | Encryption, access controls |
| **Integrity** | Accuracy | Hash functions, checksums, digital signatures |
| **Availability** | Accessibility | Redundancy, backups, DDoS protection |

**How hash functions work:**
1. Sender creates hash of original data
2. Data and hash are transmitted
3. Receiver creates hash of received data
4. Compares hashes—if they match, integrity is verified

**Common hash algorithms:**
• SHA-256 (Secure Hash Algorithm)
• MD5 (Message Digest 5) — now considered weak
• SHA-3 (newest standard)

**Exam Tip:** Hash functions only detect tampering—they don't PREVENT it. For complete protection, combine hashing with encryption (confidentiality) and digital signatures (authentication + integrity).`,
    section: 'CIA3',
    topic: 'IT Controls'
  }
];

// CFP Demo Questions - covering multiple domains
const CFP_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cfp-1',
    question: 'A CFP® professional must always act in the client\'s best interest. This is known as the:',
    options: [
      'Prudent investor standard',
      'Fiduciary duty',
      'Duty of care',
      'Suitability requirement'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) Fiduciary duty**

CFP® professionals have a **fiduciary duty** to act in the client's best interest at all times when providing financial advice. This is the highest standard of care in the advisory relationship.

**Why the other answers are wrong:**
• **A) Prudent investor standard** — A legal standard for trustees managing investments, requiring diversification and careful stewardship. It's related but doesn't define the client relationship.
• **C) Duty of care** — A component of fiduciary duty (along with duty of loyalty), but not the complete standard. The fiduciary duty encompasses care, loyalty, and following client instructions.
• **D) Suitability requirement** — A LOWER standard used by broker-dealers. Suitability only requires recommendations to be "suitable" for the client—NOT necessarily in their "best interest." This allows for recommendations that benefit the advisor.

**Fiduciary Duty Components:**
1. **Duty of Loyalty** — Put client's interests above your own
2. **Duty of Care** — Act with competence and diligence
3. **Duty to Follow Client Instructions** — Within legal/ethical bounds

**Fiduciary vs. Suitability:**
| Standard | Requirement | Who Uses It |
|----------|-------------|-------------|
| Fiduciary | Best Interest | CFP®, RIAs, fee-only advisors |
| Suitability | Appropriate for client | Broker-dealers, commission-based |

**Real-World Example:**
Two mutual funds perform similarly. Fund A pays the advisor 1% commission; Fund B pays nothing.
• **Fiduciary standard:** Recommend Fund B (lower cost = better for client)
• **Suitability standard:** Either fund could be "suitable"

**Exam Tip:** The CFP® Code of Ethics and Standards of Conduct (effective 2019) requires ALL CFP® professionals to act as fiduciaries at ALL times when providing financial advice—not just when acting as a fiduciary was already required.`,
    section: 'GEN',
    topic: 'Professional Conduct'
  },
  {
    id: 'demo-cfp-2',
    question: 'Under the Rule of 72, how long will it take to double an investment earning 8% annually?',
    options: [
      '7 years',
      '8 years',
      '9 years',
      '10 years'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) 9 years**

The **Rule of 72** is a quick mental math shortcut to estimate how long it takes to double money:

**Formula:** Years to Double = 72 ÷ Interest Rate

At 8% return: 72 ÷ 8 = **9 years**

**Why the other answers are wrong:**
• **A) 7 years** — Would require approximately 10.3% annual return (72 ÷ 7 ≈ 10.3%)
• **B) 8 years** — Would require exactly 9% annual return (72 ÷ 8 = 9)
• **D) 10 years** — Would be achieved with approximately 7.2% (72 ÷ 10 = 7.2%)

**Verification with actual math:**
FV = PV × (1 + r)^n
2 = 1 × (1.08)^n
n = ln(2) / ln(1.08) = 0.693 / 0.077 = **9.01 years** ✓

**Related Rules:**
• **Rule of 72:** Best for rates between 6-10%
• **Rule of 70:** Better for lower rates (3-5%)
• **Rule of 114:** Time to TRIPLE your money (114 ÷ rate)

**Practical Applications:**
• Inflation erosion: At 3% inflation, purchasing power halves in ~24 years
• Retirement planning: At 7% return, savings double every ~10 years
• Debt: Credit card at 18% doubles balance in 4 years if unpaid

**Exam Tip:** The Rule of 72 appears frequently on the CFP® exam because it demonstrates understanding of compound growth. Also know how to use it in REVERSE: "What return do I need to double money in X years?" Answer: 72 ÷ X years = required return.`,
    section: 'INV',
    topic: 'Time Value of Money'
  },
  {
    id: 'demo-cfp-3',
    question: 'What is the primary advantage of a Roth IRA over a Traditional IRA?',
    options: [
      'Higher contribution limits',
      'Tax-deductible contributions',
      'Tax-free qualified withdrawals',
      'No required minimum distributions until age 73'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Tax-free qualified withdrawals**

The **primary advantage** of a Roth IRA is that qualified withdrawals—both contributions AND earnings—are **completely tax-free** in retirement.

**Why the other answers are wrong:**
• **A) Higher contribution limits** — FALSE. Both Traditional and Roth IRAs have the SAME contribution limits ($7,000 in 2024; $8,000 if age 50+).
• **B) Tax-deductible contributions** — This describes the Traditional IRA advantage, not Roth. Roth contributions are made with AFTER-tax dollars (no deduction).
• **D) No required minimum distributions until age 73** — Partially true but understates the benefit. Roth IRAs have **NO RMDs during the owner's lifetime** at all. Age 73 RMDs apply to Traditional IRAs and inherited Roths.

**Traditional vs. Roth IRA Comparison:**

| Feature | Traditional IRA | Roth IRA |
|---------|-----------------|----------|
| Contributions | Tax-deductible* | After-tax (no deduction) |
| Growth | Tax-deferred | Tax-free |
| Qualified Withdrawals | Taxed as income | **Tax-free** |
| RMDs | Required at 73 | **None during owner's lifetime** |
| Income Limits | No limit to contribute | Yes (phaseout for high earners) |

**When is Roth better?**
• Expect higher tax rates in retirement
• Young with many years of tax-free growth ahead
• Want to leave tax-free inheritance
• Value flexibility (contributions can be withdrawn anytime penalty-free)

**Qualified Distribution Requirements:**
1. Account open 5+ years, AND
2. Age 59½, death, disability, or first home ($10K max)

**Exam Tip:** The CFP® exam loves comparing account types. Remember: Traditional = tax break NOW; Roth = tax break LATER. For most young clients, Roth is typically recommended due to long growth horizon and uncertain future tax rates.`,
    section: 'RET',
    topic: 'Retirement Accounts'
  },
  {
    id: 'demo-cfp-4',
    question: 'Which document allows someone to make healthcare decisions on your behalf if you are incapacitated?',
    options: [
      'Will',
      'Living trust',
      'Healthcare power of attorney',
      'Pour-over will'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Healthcare power of attorney**

A **Healthcare Power of Attorney** (also called Healthcare Proxy or Medical Power of Attorney) designates an agent to make **medical decisions** on your behalf if you become incapacitated and cannot communicate your wishes.

**Why the other answers are wrong:**
• **A) Will** — Only takes effect AFTER death to distribute assets. A will has NO power while you're alive (even if incapacitated).
• **B) Living trust** — Manages ASSETS during life and at death, but has no authority over healthcare decisions. It handles property, not medical care.
• **D) Pour-over will** — A specific type of will that transfers ("pours over") any assets not already in a trust into the trust at death. Still asset-focused, not healthcare.

**Essential Estate Planning Documents:**

| Document | Purpose | When Active |
|----------|---------|-------------|
| Healthcare POA | Medical decisions | Incapacity |
| Living Will | End-of-life wishes | Terminal illness |
| Financial POA | Financial decisions | Incapacity (or immediate) |
| Will | Asset distribution | After death |
| Living Trust | Asset management | During life & after death |

**Healthcare POA vs. Living Will:**
• **Healthcare POA:** Names a PERSON to make decisions
• **Living Will:** States specific WISHES for end-of-life care (no respirator, etc.)
• Best practice: Have BOTH documents

**Choosing a Healthcare Agent:**
• Someone who understands your values
• Willing to advocate firmly for your wishes
• Geographically accessible to reach hospitals
• Emotionally capable of making difficult decisions

**Exam Tip:** The CFP® exam frequently tests estate planning documents. Know the difference between documents that operate during life (POAs, trusts) vs. at death (wills). Healthcare POA is the only document specifically for medical decisions.`,
    section: 'EST',
    topic: 'Estate Planning'
  },
  {
    id: 'demo-cfp-5',
    question: 'The beta of a stock measures:',
    options: [
      'Total risk of the investment',
      'Systematic risk relative to the market',
      'Unsystematic risk',
      'Historical standard deviation'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) Systematic risk relative to the market**

**Beta (β)** measures a stock's **systematic risk**—how much the stock moves relative to the overall market. It quantifies the stock's sensitivity to market-wide factors that affect all securities.

**Why the other answers are wrong:**
• **A) Total risk** — Measured by **standard deviation**, which captures BOTH systematic and unsystematic risk combined.
• **C) Unsystematic risk** — Also called company-specific or diversifiable risk. This is the risk that CAN be eliminated through diversification. Beta measures what CANNOT be diversified away.
• **D) Historical standard deviation** — This measures volatility (total risk), not market sensitivity. Standard deviation and beta are different risk measures.

**Interpreting Beta:**
| Beta Value | Meaning | Example |
|------------|---------|---------|
| β = 1.0 | Moves with market | S&P 500 index fund |
| β > 1.0 | More volatile than market | Tech stocks (β ≈ 1.3+) |
| β < 1.0 | Less volatile than market | Utilities (β ≈ 0.5) |
| β = 0 | No correlation to market | Certain alternatives |
| β < 0 | Moves opposite to market | Gold (sometimes) |

**Types of Risk:**
• **Systematic (Market) Risk:** Cannot be diversified away. Affects all securities (interest rates, inflation, economic cycles). Measured by beta.
• **Unsystematic (Specific) Risk:** CAN be diversified away. Company-specific factors (management, competition, lawsuits).

**Total Risk = Systematic Risk + Unsystematic Risk**

**CAPM Formula (uses beta):**
Required Return = Risk-Free Rate + β × (Market Return - Risk-Free Rate)

**Example:** If β = 1.5, risk-free = 3%, market return = 10%:
Required Return = 3% + 1.5 × (10% - 3%) = 3% + 10.5% = **13.5%**

**Exam Tip:** For a well-diversified portfolio, beta is the only relevant risk measure because unsystematic risk has been diversified away. Higher beta = higher required return (more risk, more reward needed).`,
    section: 'INV',
    topic: 'Risk Management'
  }
];

// CISA Demo Questions - covering all 5 domains
const CISA_DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo-cisa-1-1',
    question: 'What is the PRIMARY purpose of an IT audit charter?',
    options: [
      'To define the technical scope of the audit',
      'To establish the authority and responsibility of the IT audit function',
      'To list the specific controls to be tested',
      'To document audit findings and recommendations'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) To establish the authority and responsibility of the IT audit function**

The IT audit charter is a **foundational document** that establishes the IT audit function's:
• **Purpose:** Why the function exists
• **Authority:** Power to access systems, records, and personnel
• **Responsibility:** Scope of duties and accountability
• **Organizational positioning:** Reporting lines (ideally to audit committee/board)

**Why the other answers are wrong:**
• **A) To define the technical scope of the audit** — Individual audit engagement letters or plans define technical scope for specific audits, not the charter. The charter is about the FUNCTION, not specific audits.
• **C) To list the specific controls to be tested** — Audit programs and test plans list specific controls. The charter is a high-level governance document, not an operational work plan.
• **D) To document audit findings and recommendations** — Audit reports document findings. The charter establishes authority BEFORE any audits take place.

**Key Charter Elements:**
1. Mission and objectives
2. Independence and objectivity requirements
3. Scope of activities
4. Authority to access information
5. Reporting relationships
6. Responsibility for following professional standards

**Charter Best Practices:**
• Approved by the board or audit committee (highest level)
• Reviewed and updated annually
• Aligned with IIA Standards and ISACA guidelines
• Communicated throughout the organization

**Exam Tip:** The charter provides the IT audit function with its "license to operate." Without a properly authorized charter, IT auditors lack the organizational authority to demand access to systems and information. This is a governance/foundation concept that appears frequently on Domain 1.`,
    section: 'CISA1',
    topic: 'IT Audit Process'
  },
  {
    id: 'demo-cisa-2-1',
    question: 'Which framework is MOST commonly used for IT governance?',
    options: [
      'ISO 27001',
      'NIST Cybersecurity Framework',
      'COBIT',
      'ITIL'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) COBIT**

**COBIT (Control Objectives for Information and Related Technologies)** is the most comprehensive and widely used framework specifically designed for **IT governance and management** of enterprise IT.

**Why the other answers are wrong:**
• **A) ISO 27001** — Focuses specifically on **Information Security Management Systems (ISMS)**. It's excellent for security governance but doesn't address broader IT governance (value delivery, resource management, etc.).
• **B) NIST Cybersecurity Framework** — Focuses on **cybersecurity risk management** with its five functions (Identify, Protect, Detect, Respond, Recover). Security-focused, not comprehensive IT governance.
• **D) ITIL** — Focuses on **IT Service Management (ITSM)**, covering service strategy, design, transition, operation, and improvement. It's about delivering IT services, not governing IT.

**Framework Comparison:**

| Framework | Primary Focus | Scope |
|-----------|---------------|-------|
| **COBIT** | IT Governance & Management | Enterprise-wide IT |
| ISO 27001 | Information Security | Security controls |
| NIST CSF | Cybersecurity | Risk management |
| ITIL | Service Management | IT service delivery |

**COBIT 2019 Components:**
• 40 governance and management objectives
• 6 governance system principles
• Covers: EDM (Evaluate, Direct, Monitor) + APO, BAI, DSS, MEA domains
• Links business goals to IT goals

**Why COBIT for IT Governance?**
• Comprehensive: Covers ALL aspects of IT
• Business-aligned: Connects IT to business value
• Scalable: Applicable to any organization size
• Standards-based: Maps to other frameworks

**Exam Tip:** ISACA (the CISA certifying body) developed COBIT, so expect numerous questions about it. Remember: COBIT = comprehensive IT governance; ISO 27001 = security; NIST CSF = cybersecurity; ITIL = service management.`,
    section: 'CISA2',
    topic: 'IT Governance'
  },
  {
    id: 'demo-cisa-3-1',
    question: 'During software development, when should security requirements be defined?',
    options: [
      'During system testing',
      'During implementation',
      'During the requirements phase',
      'After deployment in production'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) During the requirements phase**

Security requirements should be defined at the **EARLIEST possible stage**—during requirements gathering. This approach is called **"Security by Design"** or **"Shift Left Security."**

**Why the other answers are wrong:**
• **A) During system testing** — Far too late. By testing phase, architecture is set and major redesigns are costly. You're just verifying security, not defining requirements.
• **B) During implementation** — Still too late. Developers have already made architectural decisions. Adding security retroactively leads to patches, not secure design.
• **D) After deployment in production** — Worst possible timing! This is reactive security—fixing vulnerabilities only after they're discovered in production, often by attackers.

**Cost to Fix Security Issues (IBM/Ponemon data):**

| Phase Found | Relative Cost |
|-------------|---------------|
| Requirements | 1x (baseline) |
| Design | 5x |
| Implementation | 10x |
| Testing | 15x |
| Production | **30x to 100x** |

**Secure SDLC Integration:**
1. **Requirements:** Define security requirements, threat modeling
2. **Design:** Security architecture review, secure design patterns
3. **Development:** Secure coding practices, code review
4. **Testing:** Security testing (SAST, DAST, penetration testing)
5. **Deployment:** Secure configuration, hardening
6. **Operations:** Monitoring, incident response, patching

**Key Principles of Secure Development:**
• Defense in depth
• Least privilege
• Fail securely
• Separation of duties
• Input validation

**Exam Tip:** "Shift Left" is a critical CISA concept—moving security activities earlier in the SDLC. The earlier security is addressed, the lower the cost and risk. This principle aligns with DevSecOps practices.`,
    section: 'CISA3',
    topic: 'Systems Development'
  },
  {
    id: 'demo-cisa-4-1',
    question: 'What is the PRIMARY objective of business continuity planning (BCP)?',
    options: [
      'To prevent all disasters from occurring',
      'To maintain critical business functions during and after a disaster',
      'To eliminate the need for disaster recovery',
      'To document insurance requirements'
    ],
    correctAnswer: 1,
    explanation: `**Correct Answer: B) To maintain critical business functions during and after a disaster**

Business Continuity Planning (BCP) ensures that **critical business operations can continue** during a disruption and can be recovered to normal operations afterward. The focus is on the BUSINESS, not just IT.

**Why the other answers are wrong:**
• **A) To prevent all disasters from occurring** — Impossible. BCP acknowledges that disasters WILL happen and focuses on resilience and recovery, not prevention. Prevention is risk management.
• **C) To eliminate the need for disaster recovery** — BCP and DR are COMPLEMENTARY, not substitutes. BCP addresses business processes; DR addresses IT infrastructure. You need both.
• **D) To document insurance requirements** — Insurance is ONE element of recovery strategy, but not the primary objective. BCP is about continuity, not documentation.

**BCP vs. DR—Key Differences:**

| Aspect | BCP | DRP |
|--------|-----|-----|
| Focus | Business processes | IT systems |
| Scope | Organization-wide | Technology-focused |
| Goal | Business continuity | System recovery |
| Includes | People, processes, facilities | Servers, data, networks |

**BCP Lifecycle:**
1. **Project Initiation:** Get management commitment
2. **Business Impact Analysis (BIA):** Identify critical processes, RTO, RPO
3. **Strategy Development:** Design recovery strategies
4. **Plan Development:** Document procedures
5. **Testing & Exercises:** Validate plans work
6. **Maintenance:** Keep plans current

**Key BCP Metrics:**
• **RTO (Recovery Time Objective):** Maximum acceptable downtime
• **RPO (Recovery Point Objective):** Maximum acceptable data loss
• **MTD (Maximum Tolerable Downtime):** When business fails without recovery

**Exam Tip:** BCP questions often test the BIA. Know that BIA identifies critical processes, dependencies, and recovery priorities. The BIA drives all subsequent BCP decisions—it's the foundation.`,
    section: 'CISA4',
    topic: 'Business Continuity'
  },
  {
    id: 'demo-cisa-5-1',
    question: 'Which control type is multi-factor authentication (MFA)?',
    options: [
      'Detective control',
      'Corrective control',
      'Preventive control',
      'Compensating control'
    ],
    correctAnswer: 2,
    explanation: `**Correct Answer: C) Preventive control**

Multi-factor authentication (MFA) is a **preventive control** because it **stops unauthorized access BEFORE it occurs** by requiring multiple verification factors before granting access.

**Why the other answers are wrong:**
• **A) Detective control** — Detective controls IDENTIFY issues after they occur (like logging, monitoring, or intrusion detection). MFA prevents access; it doesn't detect intrusions.
• **B) Corrective control** — Corrective controls REMEDIATE issues after detection (like patching, restoring from backup, or incident response). MFA doesn't fix problems—it prevents them.
• **D) Compensating control** — Compensating controls are ALTERNATIVE controls when a primary control isn't feasible. MFA is a primary control, not a workaround.

**Control Types Framework:**

| Control Type | Purpose | Examples |
|--------------|---------|----------|
| **Preventive** | Stop incidents before they occur | MFA, encryption, access controls, firewalls |
| **Detective** | Identify incidents when they occur | Logging, IDS, audit trails, monitoring |
| **Corrective** | Remediate after incidents | Backups, patching, incident response |
| **Compensating** | Alternative when primary isn't possible | Manual review when automation fails |
| **Deterrent** | Discourage violations | Warning banners, security cameras |

**MFA Factor Categories:**
1. **Something you KNOW:** Password, PIN, security question
2. **Something you HAVE:** Phone, token, smart card
3. **Something you ARE:** Fingerprint, facial recognition, iris scan

**True MFA requires factors from at least TWO different categories.** Password + security question = single factor (both "know").

**Exam Tip:** Control classification questions are CISA favorites. If a control STOPS something from happening, it's preventive. If it FINDS something that happened, it's detective. If it FIXES something, it's corrective. MFA clearly prevents unauthorized access at the entry point.`,
    section: 'CISA5',
    topic: 'Security Controls'
  }
];

// Export all demo questions by course
export const DEMO_QUESTIONS: Record<CourseId, DemoQuestion[]> = {
  cpa: CPA_DEMO_QUESTIONS,
  ea: EA_DEMO_QUESTIONS,
  cma: CMA_DEMO_QUESTIONS,
  cia: CIA_DEMO_QUESTIONS,
  cfp: CFP_DEMO_QUESTIONS,
  cisa: CISA_DEMO_QUESTIONS,
};

// Get demo questions for a specific course
export const getDemoQuestions = (courseId: CourseId): DemoQuestion[] => {
  return DEMO_QUESTIONS[courseId] || DEMO_QUESTIONS.cpa;
};
