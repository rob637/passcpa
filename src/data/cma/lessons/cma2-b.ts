/**
 * CMA Part 2, Section B: Corporate Finance
 * Weight: 20% of Part 2 Exam
 * 
 * Topics covered:
 * - Risk and return
 * - Long-term financial management
 * - Raising capital
 * - Working capital management
 * - Mergers and acquisitions
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma2BLessons: Lesson[] = [
  // ============================================================================
  // CMA2-B: CORPORATE FINANCE (Lessons 1-10)
  // ============================================================================
  
  {
    id: 'CMA2-B-001',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Risk and Return Fundamentals',
    description: 'Understand the relationship between risk and expected return',
    order: 11,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Types of risk', 'Standard deviation', 'Expected return', 'Risk-return tradeoff'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Risk and return are foundational to all financial decisions. CMAs must understand how to quantify risk, how investors demand compensation for bearing it, and how to balance risk and return in capital budgeting, valuation, and performance evaluation.",
        },
        {
          title: 'Types of Investment Risk',
          type: 'text',
          content: "**Systematic Risk (Market Risk):**\n• Affects all securities in market\n• Cannot be diversified away\n• Examples: Interest rates, inflation, recessions\n• Measured by beta\n\n**Unsystematic Risk (Firm-Specific):**\n• Unique to individual company\n• CAN be diversified away\n• Examples: Management changes, lawsuits, product recalls\n\n**Total Risk = Systematic + Unsystematic**\n\n**Key insight:** Investors shouldn't expect extra return for unsystematic risk because it's diversifiable!",
        },
        {
          title: 'Measuring Return',
          type: 'text',
          content: "**Holding Period Return:**\nHPR = (Ending Price - Beginning Price + Dividends) / Beginning Price\n\n**Example:**\nBought at $100, sold at $112, received $4 dividend\nHPR = ($112 - $100 + $4) / $100 = **16%**\n\n**Expected Return:**\nE(R) = Σ [Probability × Return]\n\n**Example:**\n40% chance of 20% return, 60% chance of 8% return\nE(R) = (0.40 × 20%) + (0.60 × 8%) = **12.8%**",
        },
        {
          title: 'Measuring Risk: Standard Deviation',
          type: 'text',
          content: "**Standard Deviation (σ):**\nMeasures dispersion of returns around the mean\n\n**Formula:**\nσ = √[Σ Pi × (Ri - E(R))²]\n\n**Interpretation:**\n• Higher σ = More volatile = More risky\n• About 68% of returns fall within ±1σ\n• About 95% fall within ±2σ\n\n**Example:**\nIf E(R) = 12% and σ = 8%\nExpect returns between 4% and 20% about 68% of the time",
        },
        {
          title: '🧠 Memory Aid: Risk Types',
          type: 'callout',
          content: "**Systematic vs. Unsystematic:**\n\n**\"SYSTEM affects EVERYONE\"**\n• Systematic = Market-wide = Can't diversify away\n• Beta is the measure\n\n**\"UNSYS-tem is UN-avoidable without diversification\"**\n• Unsystematic = Firm-specific = CAN diversify away\n• 15-20 stocks eliminates most unsystematic risk",
        },
        {
          title: 'Coefficient of Variation',
          type: 'text',
          content: "**Formula:**\nCV = Standard Deviation / Expected Return\n\n**Why use CV?**\n• Standardizes risk per unit of return\n• Enables comparison of different-return investments\n\n**Example:**\nInvestment A: E(R) = 20%, σ = 10%, CV = 0.50\nInvestment B: E(R) = 10%, σ = 6%, CV = 0.60\n\n**Investment A has lower risk per unit of return** (despite higher absolute risk).\n\n**Lower CV = Better risk-adjusted investment**",
        },
        {
          title: 'Risk-Return Tradeoff',
          type: 'table',
          headers: ['Investment Type', 'Typical Return', 'Typical Risk', 'Risk Level'],
          rows: [
            ['T-Bills', '2-4%', 'Near zero', 'Risk-free benchmark'],
            ['Bonds', '4-6%', 'Low', 'Credit/interest risk'],
            ['Large-cap stocks', '8-12%', 'Moderate', 'Market risk'],
            ['Small-cap stocks', '10-15%', 'High', 'More volatile'],
            ['Emerging markets', '12-18%', 'Very high', 'Political/currency risk'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Required vs. Expected Return',
          type: 'warning',
          content: "**Required Return:**\nMinimum return investors demand given the risk\n(Used for discounting, valuation)\n\n**Expected Return:**\nWhat you actually anticipate earning\n(Based on forecasts, probability analysis)\n\n**Investment decision:**\n• If Expected > Required → Good investment\n• If Expected < Required → Bad investment\n\n**In equilibrium, Expected = Required**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Systematic risk affects all securities; unsystematic is firm-specific",
            "Only systematic risk is compensated (via required return)",
            "Standard deviation measures total risk",
            "Coefficient of variation = σ/E(R) - risk per unit of return",
            "Higher risk requires higher expected return",
            "Diversification eliminates unsystematic risk",
            "15-20 stocks achieves most diversification benefit",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-002',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Capital Asset Pricing Model (CAPM)',
    description: 'Calculate required return using the CAPM framework',
    order: 12,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['CAPM', 'Beta', 'Security market line', 'Risk premium'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "CAPM is THE model for determining cost of equity. CMAs use it to calculate WACC for capital budgeting, evaluate investment proposals, and assess whether returns compensate adequately for risk. This formula appears constantly on the CMA exam!",
        },
        {
          title: 'The CAPM Formula',
          type: 'text',
          content: "**Required Return = Rf + β(Rm - Rf)**\n\n**Where:**\n• Rf = Risk-free rate (typically T-bill rate)\n• β = Beta (systematic risk measure)\n• Rm = Expected market return\n• (Rm - Rf) = Market risk premium\n\n**Example:**\nRf = 3%, β = 1.2, Rm = 10%\nRequired Return = 3% + 1.2(10% - 3%)\n= 3% + 1.2(7%)\n= 3% + 8.4% = **11.4%**",
        },
        {
          title: 'Understanding Beta',
          type: 'text',
          content: "**Beta measures systematic risk relative to market:**\n\n**β = 1.0:** Same volatility as market\n**β > 1.0:** More volatile than market (aggressive)\n**β < 1.0:** Less volatile than market (defensive)\n**β = 0:** No correlation with market (risk-free)\n**β < 0:** Moves opposite to market (rare)\n\n**Examples:**\n• Technology: β ≈ 1.3 (high)\n• Utilities: β ≈ 0.5 (low)\n• S&P 500 index: β = 1.0 (by definition)",
        },
        {
          title: '🧠 Memory Aid: CAPM',
          type: 'callout',
          content: "**\"RRR = RF + β(MRP)\"**\n\n**R**equired **R**eturn = **R**isk-**F**ree + **B**eta × **M**arket **R**isk **P**remium\n\n**Think of it as:**\nBase compensation (risk-free rate)\n+ Risk compensation (beta × premium)\n= Total required return\n\n**Higher beta → Higher required return!**",
        },
        {
          title: 'Security Market Line (SML)',
          type: 'text',
          content: "**The SML graphs CAPM:**\n• X-axis: Beta (β)\n• Y-axis: Required return\n• Y-intercept: Risk-free rate\n• Slope: Market risk premium\n\n**Interpretation:**\n• Stocks ON the SML are fairly priced\n• Stocks ABOVE the SML are undervalued (buy)\n• Stocks BELOW the SML are overvalued (sell)\n\n**All properly priced securities should lie on the SML!**",
        },
        {
          title: 'CAPM Calculation Examples',
          type: 'table',
          headers: ['Security', 'Beta', 'Rf', 'Market Premium', 'Required Return'],
          rows: [
            ['T-Bill', '0', '3%', '7%', '3.0%'],
            ['Defensive Stock', '0.6', '3%', '7%', '7.2%'],
            ['Market Portfolio', '1.0', '3%', '7%', '10.0%'],
            ['Growth Stock', '1.5', '3%', '7%', '13.5%'],
            ['High-Risk Stock', '2.0', '3%', '7%', '17.0%'],
          ],
        },
        {
          title: 'Limitations of CAPM',
          type: 'text',
          content: "**Assumptions that may not hold:**\n\n• Single-period model\n• All investors have same expectations\n• Perfect markets (no taxes, transaction costs)\n• Investors can borrow at risk-free rate\n• Beta is stable over time\n\n**Practical issues:**\n• Which risk-free rate? (T-bill, 10-year?)\n• Historical vs. forward-looking beta?\n• Market risk premium estimate varies widely\n\n**Despite limitations, CAPM remains widely used!**",
        },
        {
          title: '⚠️ Exam Trap: Levered vs. Unlevered Beta',
          type: 'warning',
          content: "**βL = βU × [1 + (1-t)(D/E)]**\n\n**βL (Levered):** Includes financial risk from debt\n**βU (Unlevered):** Pure business risk only\n\n**Why it matters:**\nWhen comparing firms with different capital structures,\nunlever betas first to isolate business risk.\n\n**More debt → Higher levered beta → Higher cost of equity**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAPM: Required Return = Rf + β(Rm - Rf)",
            "Beta measures systematic (market) risk only",
            "Beta = 1 means same risk as market",
            "SML plots required return vs. beta",
            "Stocks should lie on SML if properly priced",
            "CAPM gives cost of equity for WACC calculation",
            "Levered beta includes financial risk from debt",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-003',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Cost of Capital',
    description: 'Calculate weighted average cost of capital (WACC)',
    order: 13,
    duration: 55,
    difficulty: 'advanced',
    topics: ['WACC', 'Cost of debt', 'Cost of equity', 'Capital structure'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "WACC is the hurdle rate for investment decisions. A project must earn at least the WACC to create value. CMAs calculate WACC for capital budgeting, valuation, and performance metrics like EVA. Getting WACC wrong leads to bad investment decisions!",
        },
        {
          title: 'The WACC Formula',
          type: 'text',
          content: "**WACC = (E/V × Re) + (D/V × Rd × (1-t)) + (P/V × Rp)**\n\n**Where:**\n• E/V = Weight of equity\n• D/V = Weight of debt\n• P/V = Weight of preferred stock\n• Re = Cost of equity\n• Rd = Cost of debt\n• Rp = Cost of preferred\n• t = Tax rate\n• V = E + D + P (total value)\n\n**Debt gets tax benefit; equity and preferred do not!**",
        },
        {
          title: 'Cost of Debt',
          type: 'text',
          content: "**Rd = Interest rate on new debt × (1 - Tax Rate)**\n\n**Finding the rate:**\n• Yield to maturity on existing bonds\n• Interest rate on new borrowing\n• Add credit spread to benchmark\n\n**Example:**\nNew bank loan rate: 6%\nTax rate: 25%\nAfter-tax cost of debt: 6% × (1 - 0.25) = **4.5%**\n\n**Use MARGINAL (new) debt cost, not historical!**",
        },
        {
          title: 'Cost of Equity Methods',
          type: 'table',
          headers: ['Method', 'Formula', 'When to Use'],
          rows: [
            ['CAPM', 'Rf + β(Rm - Rf)', 'Most common; needs beta'],
            ['Dividend Growth (Gordon)', 'D₁/P₀ + g', 'Stable dividend payers'],
            ['Bond Yield + Premium', 'Rd + Risk Premium (3-5%)', 'Quick estimate'],
          ],
        },
        {
          title: 'Dividend Growth Model Example',
          type: 'text',
          content: "**Gordon Model:**\nRe = D₁/P₀ + g\n\n**Where:**\n• D₁ = Next year's dividend (D₀ × (1+g))\n• P₀ = Current stock price\n• g = Sustainable dividend growth rate\n\n**Example:**\nCurrent dividend: $2.00\nExpected growth: 5%\nStock price: $50\n\nD₁ = $2.00 × 1.05 = $2.10\nRe = ($2.10 / $50) + 5% = 4.2% + 5% = **9.2%**",
        },
        {
          title: '🧠 Memory Aid: WACC',
          type: 'callout',
          content: "**\"Weighted costs, Adjusted for tax\"**\n\n**E**quity: Get Re from CAPM or dividend model\n**D**ebt: After-tax! Rd × (1-t)\n**P**referred: Dp / Pp (no tax benefit)\n\n**Weight by MARKET values, not book values!**\n\n**WACC = Minimum return to satisfy ALL capital providers**",
        },
        {
          title: 'Complete WACC Calculation',
          type: 'text',
          content: "**Example:**\n• Market value of equity: $60 million\n• Market value of debt: $40 million\n• Total: $100 million\n• Cost of equity (CAPM): 12%\n• Cost of debt: 6%\n• Tax rate: 25%\n\n**Weights:**\nE/V = 60/100 = 60%\nD/V = 40/100 = 40%\n\n**WACC:**\n= (0.60 × 12%) + (0.40 × 6% × 0.75)\n= 7.2% + 1.8%\n= **9.0%**",
        },
        {
          title: '⚠️ Exam Trap: Market vs. Book Values',
          type: 'warning',
          content: "**Always use MARKET values for weights!**\n\n**Why?**\n• WACC is forward-looking\n• Investors care about market values\n• Book values are historical\n\n**Exception:**\n• If market values unavailable, exam may allow book\n• Private companies may use book with adjustment\n\n**The question will usually state which to use!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "WACC = Weighted average of debt, equity, and preferred costs",
            "Debt is tax-advantaged: use Rd × (1-t)",
            "Cost of equity: CAPM or Dividend Growth Model",
            "Use MARKET value weights, not book values",
            "WACC is the hurdle rate for investment decisions",
            "Projects earning > WACC create shareholder value",
            "Use marginal (new) costs, not historical",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-004',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Capital Structure Theory',
    description: 'Understand optimal capital structure and leverage effects',
    order: 14,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Modigliani-Miller', 'Optimal capital structure', 'Trade-off theory', 'Pecking order'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "How should we finance the company - debt or equity? Capital structure decisions affect cost of capital, financial risk, and shareholder value. CMAs analyze financing alternatives, understand leverage effects, and advise on optimal capital structure.",
        },
        {
          title: 'Modigliani-Miller Propositions',
          type: 'text',
          content: "**MM Without Taxes (Perfect Markets):**\n• Proposition I: Capital structure is irrelevant to firm value\n• Proposition II: Cost of equity increases with leverage\n\n**MM With Taxes:**\n• Proposition I: Firm value increases with debt (tax shield)\n• Proposition II: Cost of equity still rises, but debt is cheaper\n\n**Implication with taxes:**\nValue of levered firm = Value of unlevered firm + PV(Tax Shield)\n\n**More debt → More value (in MM world)**",
        },
        {
          title: 'Why MM Breaks Down in Reality',
          type: 'text',
          content: "**Real-world frictions:**\n\n**Bankruptcy costs:**\n• Direct (legal, administrative)\n• Indirect (lost customers, damaged reputation)\n\n**Agency costs:**\n• Debtholders restrict management\n• Monitoring and covenant compliance\n\n**Information asymmetry:**\n• Signals about firm quality\n• Market reactions to financing choices\n\n**These create an OPTIMAL capital structure!**",
        },
        {
          title: 'Trade-Off Theory',
          type: 'text',
          content: "**Balance tax benefits vs. distress costs:**\n\nValue = Unlevered value + Tax shield - Distress costs\n\n**At optimal structure:**\n• Marginal tax benefit = Marginal distress cost\n• Adding more debt destroys value\n• Each firm has different optimum\n\n**Optimal debt increases when:**\n• Higher tax rate\n• More tangible assets (collateral)\n• Stable cash flows\n• Lower distress probability",
        },
        {
          title: '🧠 Memory Aid: Capital Structure Theories',
          type: 'callout',
          content: "**\"TPM\" - Three Main Theories:**\n\n**T**rade-Off: Balance tax benefits vs. distress costs\n**P**ecking Order: Internal funds → Debt → Equity\n**M**arket Timing: Issue when prices are favorable\n\n**Trade-off says there's an optimum.\nPecking order says follow a hierarchy.\nMarket timing says opportunistically issue securities.**",
        },
        {
          title: 'Pecking Order Theory',
          type: 'table',
          headers: ['Priority', 'Source', 'Why Preferred'],
          rows: [
            ['1st', 'Internal funds (retained earnings)', 'No transaction costs, no asymmetric info'],
            ['2nd', 'Debt', 'Lower issuance costs than equity'],
            ['3rd', 'Convertible securities', 'Hybrid, less negative signal'],
            ['4th', 'External equity', 'Last resort - signals overvaluation'],
          ],
        },
        {
          title: 'Financial Leverage Effects',
          type: 'text',
          content: "**Degree of Financial Leverage (DFL):**\nDFL = EBIT / (EBIT - Interest)\n\n**Or:**\n% Change in EPS / % Change in EBIT\n\n**What it means:**\nIf DFL = 2.0, a 10% increase in EBIT causes a 20% increase in EPS.\n\n**Double-edged sword:**\n• Amplifies gains when EBIT rises\n• Amplifies losses when EBIT falls\n• Higher DFL = Higher financial risk",
        },
        {
          title: '⚠️ Exam Trap: Leverage Types',
          type: 'warning',
          content: "**Operating Leverage (DOL):**\n• Fixed operating costs\n• Magnifies EBIT relative to sales\n\n**Financial Leverage (DFL):**\n• Fixed financing costs (interest)\n• Magnifies EPS relative to EBIT\n\n**Combined Leverage (DCL):**\nDCL = DOL × DFL\n\n**Magnifies EPS relative to sales!\nHigh combined leverage = Very risky!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "MM: Capital structure irrelevant in perfect markets",
            "With taxes: Debt increases value via tax shield",
            "Trade-off theory: Optimal structure balances tax benefits vs. distress costs",
            "Pecking order: Internal funds → Debt → Equity",
            "DFL measures earnings amplification from leverage",
            "Combined leverage = DOL × DFL",
            "Real-world frictions create optimal capital structure",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-005',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Working Capital Management',
    description: 'Optimize current assets and liabilities for liquidity and profitability',
    order: 15,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Working capital policy', 'Cash management', 'Inventory policy', 'Trade credit'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Working capital is the lifeblood of daily operations. Too little means cash crises; too much means wasted resources. CMAs optimize working capital to balance liquidity and profitability - freeing cash while keeping operations running smoothly.",
        },
        {
          title: 'Working Capital Basics',
          type: 'text',
          content: "**Net Working Capital (NWC):**\nNWC = Current Assets - Current Liabilities\n\n**Operating Working Capital:**\nOWC = Current Assets - Cash - Current Liabilities + Notes Payable\n\n**Components:**\n• Cash and marketable securities\n• Accounts receivable\n• Inventory\n• Accounts payable\n• Accrued expenses\n\n**Goal:** Minimize investment while maintaining operations",
        },
        {
          title: 'Cash Conversion Cycle Review',
          type: 'text',
          content: "**CCC = DIO + DSO - DPO**\n\n**Days Inventory Outstanding:** How long to sell\n**Days Sales Outstanding:** How long to collect\n**Days Payable Outstanding:** How long to pay suppliers\n\n**Example:**\nDIO: 45 days, DSO: 30 days, DPO: 25 days\nCCC = 45 + 30 - 25 = **50 days**\n\n**Lower CCC = Less cash tied up = Better!**",
        },
        {
          title: 'Working Capital Policies',
          type: 'table',
          headers: ['Policy', 'Current Assets', 'Current Liabilities', 'Risk/Return'],
          rows: [
            ['Aggressive', 'Low (lean)', 'High (more ST debt)', 'High risk, high return'],
            ['Conservative', 'High (buffer)', 'Low (more LT debt)', 'Low risk, low return'],
            ['Moderate', 'Matched to needs', 'Balanced', 'Moderate risk/return'],
          ],
        },
        {
          title: '🧠 Memory Aid: Working Capital Trade-Offs',
          type: 'callout',
          content: "**\"LIPRIP\"**\n\n**L**iquidity vs. **P**rofitability\nHolding more CA → More liquid but less profitable (tied up cash)\n\n**R**isk vs. **R**eturn\nMore ST debt → Higher return but higher risk (refinancing)\n\n**I**nventory **P**olicy\nLower inventory → Less carrying cost but more stockout risk\n\n**It's all about balance!**",
        },
        {
          title: 'Cash Management',
          type: 'text',
          content: "**Objectives:**\n• Maintain sufficient liquidity\n• Minimize idle cash balance\n• Invest excess cash efficiently\n• Manage collections and disbursements\n\n**Strategies:**\n• Accelerate collections (lockboxes, EFT)\n• Delay disbursements (centralized, controlled)\n• Concentrate cash (single account)\n• Invest excess in money market instruments\n\n**Zero-balance accounts:** Maintain minimal balance, fund as needed",
        },
        {
          title: 'Credit Policy Trade-Offs',
          type: 'text',
          content: "**Loosening credit policy:**\n\n**Benefits:**\n• Increased sales\n• Competitive advantage\n• Customer loyalty\n\n**Costs:**\n• Higher bad debts\n• Higher carrying cost (AR investment)\n• Delayed cash receipts\n\n**Optimal policy:** Marginal benefit = Marginal cost\n\n**Variables to manage:**\n• Credit standards (who qualifies)\n• Credit terms (payment period, discounts)\n• Collection policy (aggressiveness)",
        },
        {
          title: 'Evaluating Trade Credit',
          type: 'text',
          content: "**Terms: 2/10, net 30**\n• 2% discount if paid within 10 days\n• Full amount due in 30 days\n\n**Annual cost of not taking discount:**\n= (Discount % / (100 - Discount %)) × (365 / (Full period - Discount period))\n\n**Example:**\n= (2 / 98) × (365 / 20)\n= 0.0204 × 18.25\n= **37.2% per year!**\n\n**Almost always take the discount if you have cash!**",
        },
        {
          title: '⚠️ Exam Trap: Short-Term Financing Sources',
          type: 'warning',
          content: "**Know the options and costs:**\n\n**Trade credit:** Free if discounts taken, expensive if not\n**Bank lines:** Commitment fee + interest\n**Commercial paper:** Lowest cost, but only for creditworthy\n**Factoring:** Selling receivables - expensive but immediate\n**Secured loans:** Pledging inventory/receivables\n\n**Compare EFFECTIVE annual rates to choose!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NWC = Current Assets - Current Liabilities",
            "CCC = DIO + DSO - DPO (lower is better)",
            "Aggressive policy: Low CA, high CL (risky but profitable)",
            "Conservative policy: High CA, low CL (safe but costly)",
            "Trade credit cost can be 30%+ if discount not taken",
            "Balance liquidity vs. profitability",
            "Working capital optimization frees cash for investment",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-006',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Raising Capital - Debt',
    description: 'Understand sources and characteristics of debt financing',
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Bank loans', 'Bonds', 'Debt covenants', 'Bond valuation'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Debt is typically cheaper than equity due to tax benefits and lower risk to investors. CMAs evaluate debt alternatives, negotiate terms, monitor covenants, and understand when debt is appropriate. Choosing the wrong debt structure can constrain the company or trigger default.",
        },
        {
          title: 'Types of Debt Financing',
          type: 'table',
          headers: ['Type', 'Term', 'Typical Use'],
          rows: [
            ['Trade credit', 'Very short', 'Day-to-day operations'],
            ['Bank line of credit', 'Short-term', 'Working capital needs'],
            ['Term loan', 'Medium', 'Equipment, specific projects'],
            ['Bonds', 'Long-term', 'Major capital investments'],
            ['Convertible bonds', 'Long-term', 'Growth financing'],
            ['Lease financing', 'Varies', 'Asset acquisition'],
          ],
        },
        {
          title: 'Bank Loans',
          type: 'text',
          content: "**Types:**\n\n**Revolving credit:** Draw and repay as needed (like credit card)\n**Term loan:** Fixed principal and interest payments\n**Bridge loan:** Short-term until permanent financing\n\n**Key terms:**\n• Interest rate (fixed or variable)\n• Commitment fee (on unused portion)\n• Compensating balance requirements\n• Covenants (restrictions)\n• Collateral/security\n\n**Calculate EFFECTIVE rate including all costs!**",
        },
        {
          title: 'Bond Characteristics',
          type: 'text',
          content: "**Key features:**\n\n**Par/Face value:** Amount repaid at maturity ($1,000 typical)\n**Coupon rate:** Annual interest as % of par\n**Maturity:** Length until principal repaid\n**Call provision:** Issuer can repay early\n**Sinking fund:** Required periodic repayments\n\n**Bond types:**\n• Secured (backed by assets) vs. Unsecured (debentures)\n• Senior vs. Subordinated\n• Fixed vs. Floating rate\n• Zero-coupon (no periodic interest)",
        },
        {
          title: '🧠 Memory Aid: Bond Prices',
          type: 'callout',
          content: "**\"PRIDE\"** determines bond price:\n\n**P**ar value (face amount)\n**R**equired return (market rate)\n**I**nterest rate (coupon)\n**D**ate of maturity\n**E**conomic conditions\n\n**When market rate > coupon rate: Bond sells at DISCOUNT**\n**When market rate < coupon rate: Bond sells at PREMIUM**\n**When market rate = coupon rate: Bond sells at PAR**",
        },
        {
          title: 'Bond Valuation',
          type: 'text',
          content: "**Price = PV of coupons + PV of face value**\n\nP = C × [1 - (1+r)^-n] / r + FV/(1+r)^n\n\n**Example:**\n• Face value: $1,000\n• Coupon: 6% annual ($60/year)\n• Maturity: 5 years\n• Market rate: 8%\n\nP = $60 × [1 - (1.08)^-5] / 0.08 + $1,000/(1.08)^5\nP = $60 × 3.993 + $1,000 × 0.681\nP = $239.58 + $680.58 = **$920.16**\n\n**(Discount because market rate > coupon)**",
        },
        {
          title: 'Debt Covenants',
          type: 'text',
          content: "**Affirmative covenants (must do):**\n• Maintain insurance\n• Provide financial statements\n• Pay taxes on time\n• Maintain certain ratios\n\n**Negative covenants (can't do):**\n• Limit additional borrowing\n• Restrict dividends\n• Limit asset sales\n• Prohibit mergers without consent\n\n**Violation → Technical default → Lender can accelerate payment!**",
        },
        {
          title: '⚠️ Exam Trap: Effective Interest Rate',
          type: 'warning',
          content: "**Include ALL costs in effective rate:**\n\n**Compensating balance:**\nEffective rate = Interest / (Loan - Required balance)\n\n**Discount basis:**\nEffective rate = Interest / (Face - Interest)\n\n**Example:**\n$100,000 loan at 8%, 10% compensating balance\nUsable funds: $90,000\nInterest: $8,000\nEffective rate: $8,000 / $90,000 = **8.89%**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Debt sources range from trade credit to long-term bonds",
            "Bank loans: revolving credit, term loans, bridge financing",
            "Bond price: PV of coupon payments + PV of principal",
            "Market rate > coupon → Discount; Market rate < coupon → Premium",
            "Covenants protect lenders but restrict management",
            "Calculate effective rate including all fees and requirements",
            "Debt is tax-advantaged but adds financial risk",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-007',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Raising Capital - Equity',
    description: 'Understand equity financing sources and considerations',
    order: 17,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Common stock', 'Preferred stock', 'Equity valuation', 'IPOs'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Equity is permanent capital with no required payments, but it dilutes ownership and is expensive. CMAs evaluate when equity is appropriate, assess dilution effects, and understand shareholder expectations. Equity decisions affect ownership, control, and long-term value.",
        },
        {
          title: 'Common Stock Characteristics',
          type: 'text',
          content: "**Rights of common shareholders:**\n\n• Voting rights (board election, major decisions)\n• Residual claim on assets (after creditors and preferred)\n• Dividend rights (if declared)\n• Preemptive rights (maintain ownership % in new issues)\n\n**Key terms:**\n• Par value (legal minimum, often $0.01)\n• No fixed dividend obligation\n• Subordinate to all other claims in liquidation\n\n**No maturity - permanent capital!**",
        },
        {
          title: 'Common Stock Valuation',
          type: 'text',
          content: "**Dividend Discount Model (DDM):**\nP₀ = D₁ / (r - g)\n\n**Where:**\n• D₁ = Expected dividend next period\n• r = Required return\n• g = Dividend growth rate\n\n**Example:**\nD₀ = $2.00, g = 6%, r = 11%\nD₁ = $2.00 × 1.06 = $2.12\nP₀ = $2.12 / (0.11 - 0.06) = $2.12 / 0.05 = **$42.40**\n\n**Requires r > g for model to work!**",
        },
        {
          title: 'Preferred Stock',
          type: 'table',
          headers: ['Characteristic', 'Common Stock', 'Preferred Stock'],
          rows: [
            ['Dividend', 'Variable (if declared)', 'Fixed (if declared)'],
            ['Voting', 'Yes', 'Usually no'],
            ['Liquidation priority', 'Last', 'After debt, before common'],
            ['Maturity', 'Perpetual', 'Usually perpetual'],
            ['Tax treatment (issuer)', 'Not deductible', 'Not deductible'],
          ],
        },
        {
          title: 'Preferred Stock Valuation',
          type: 'text',
          content: "**Perpetual preferred (no maturity):**\nP = D / r\n\n**Where:**\n• D = Annual preferred dividend\n• r = Required return on preferred\n\n**Example:**\nPreferred dividend: $5 per year\nRequired return: 8%\nP = $5 / 0.08 = **$62.50**\n\n**Simpler than common stock valuation because dividend is fixed!**",
        },
        {
          title: '🧠 Memory Aid: Equity vs. Debt',
          type: 'callout',
          content: "**Debt: \"SCOPED\"**\n**S**enior claim, **C**ontractual payments, **O**bligatory, **P**rincipal due, **E**xpense (tax deductible), **D**efault risk\n\n**Equity: \"PREVR\"**\n**P**ermanent, **R**esidual claim, **E**xpensive (no tax benefit), **V**oting rights, **R**isky for investor (last in line)\n\n**Debt is cheaper but riskier for company.\nEquity is safer but more expensive!**",
        },
        {
          title: 'Going Public (IPO)',
          type: 'text',
          content: "**Initial Public Offering process:**\n\n1. Select investment bank (underwriter)\n2. Due diligence and registration (SEC)\n3. Roadshow (marketing to investors)\n4. Price setting\n5. Distribution\n\n**Costs:**\n• Underwriting spread (6-7% typical)\n• Legal and accounting fees\n• Ongoing compliance costs\n• Information disclosure requirements\n\n**Benefits:** Access capital, liquidity, prestige\n**Drawbacks:** Cost, scrutiny, pressure for short-term results",
        },
        {
          title: '⚠️ Exam Trap: Stock Issuance Costs',
          type: 'warning',
          content: "**Flotation costs reduce net proceeds:**\n\nEffective cost of equity = D₁ / (P₀ × (1-F)) + g\n\n**Where F = flotation cost %**\n\n**Example:**\nP₀ = $40, D₁ = $2, g = 6%, F = 5%\nNet proceeds = $40 × 0.95 = $38\nCost of equity = $2/$38 + 6% = 5.26% + 6% = **11.26%**\n\n**vs. 11% without flotation costs!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Common stock: Voting rights, residual claim, no fixed dividend",
            "Common stock value: P₀ = D₁/(r-g) (Gordon model)",
            "Preferred stock: Fixed dividend, no voting, senior to common",
            "Preferred value: P = D/r (perpetuity formula)",
            "Equity is permanent capital - no maturity",
            "IPO costs ~7% in underwriting plus compliance",
            "Flotation costs increase effective cost of equity",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-008',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Dividend Policy',
    description: 'Understand dividend decisions and their impact on value',
    order: 18,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Dividend theories', 'Payment methods', 'Stock dividends', 'Payout policy'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Do dividends matter? This question has sparked decades of debate. CMAs advise on dividend policy, analyze the trade-offs between paying dividends vs. reinvesting, and understand how dividend decisions signal information to the market.",
        },
        {
          title: 'Dividend Irrelevance Theory',
          type: 'text',
          content: "**Miller & Modigliani (MM):**\nIn perfect markets, dividend policy doesn't affect firm value.\n\n**Logic:**\n• Shareholders can create \"homemade dividends\" by selling shares\n• If company needs cash for investment, it can issue new shares\n• Total returns = dividends + capital gains\n• Mix doesn't matter; total is what counts\n\n**Assumptions (often violated):**\n• No taxes\n• No transaction costs\n• No information asymmetry",
        },
        {
          title: 'Dividend Relevance Arguments',
          type: 'table',
          headers: ['Theory', 'Argument', 'Implication'],
          rows: [
            ['Bird-in-Hand', 'Dividends are certain; gains uncertain', 'Pay dividends - reduces risk'],
            ['Tax Preference', 'Capital gains taxed lower', 'Retain earnings - avoid dividends'],
            ['Signaling', 'Dividends signal management confidence', 'Dividend changes convey information'],
            ['Clientele Effect', 'Investors self-select based on preferences', 'Stable policy attracts similar investors'],
          ],
        },
        {
          title: 'Dividend Payment Process',
          type: 'text',
          content: "**Key dates:**\n\n**Declaration date:** Board announces dividend\n**Ex-dividend date:** Stock trades without dividend (2 days before record)\n**Record date:** Shareholders on record receive dividend\n**Payment date:** Dividend actually paid\n\n**Stock price typically drops by dividend amount on ex-date!**\n\n**Example:**\n$50 stock, $1 dividend\nEx-date: Stock opens at ~$49",
        },
        {
          title: '🧠 Memory Aid: Dividend Dates',
          type: 'callout',
          content: "**\"DERP\" (in order):**\n\n**D**eclaration - Board decides\n**E**x-dividend - Buy before to get dividend!\n**R**ecord - Must own to qualify\n**P**ayment - Money in hand\n\n**Key:** Buy BEFORE ex-date to receive the dividend.\nEx-date is 2 business days before record date.",
        },
        {
          title: 'Stock Dividends vs. Stock Splits',
          type: 'text',
          content: "**Stock dividend:**\n• Issue additional shares to existing shareholders\n• Example: 10% stock dividend = 10 new shares per 100 owned\n• Transfer from retained earnings to capital stock\n\n**Stock split:**\n• Increase shares by proportional factor\n• Example: 2-for-1 split doubles shares, halves price\n• No accounting entry (just more shares at lower par)\n\n**Both:** No cash changes hands, proportional ownership unchanged, total value same",
        },
        {
          title: 'Common Payout Policies',
          type: 'text',
          content: "**Stable/Constant dividend:**\n• Same $ per share each period\n• Slowly increase over time\n• Market expects consistency\n\n**Constant payout ratio:**\n• Fixed % of earnings\n• Dividend fluctuates with earnings\n• Less common (investors dislike volatility)\n\n**Residual dividend policy:**\n• Pay dividends from leftover after investments\n• Mathematically optimal but volatile\n\n**Most companies target stable, growing dividends!**",
        },
        {
          title: '⚠️ Exam Trap: Share Repurchases',
          type: 'warning',
          content: "**Repurchases are an alternative to dividends:**\n\n**Advantages:**\n• Flexibility (not \"expected\" like dividends)\n• Tax advantage (capital gains vs. ordinary income)\n• Signals undervaluation\n• Increases EPS (fewer shares)\n\n**Effect on EPS:**\nEPS = Earnings / Fewer shares = Higher EPS\n\n**But: Repurchases don't create value by themselves - they're a cash distribution method!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "MM: Dividend policy irrelevant in perfect markets",
            "Real world: Taxes, signals, and clienteles matter",
            "Buy before ex-date to receive dividend",
            "Stock dividends/splits don't change total value",
            "Most firms prefer stable, growing dividend policy",
            "Residual policy: Pay from leftover after investments",
            "Share repurchases are an alternative distribution method",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-009',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Leasing Decisions',
    description: 'Analyze lease vs. buy decisions and lease accounting implications',
    order: 19,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Lease types', 'Lease vs. buy', 'ASC 842', 'Lease accounting'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Leasing is a major source of financing that affects balance sheets, ROA, and capital budgeting decisions. CMAs evaluate lease vs. buy alternatives, understand the accounting treatment, and analyze the financial statement impact under ASC 842.",
        },
        {
          title: 'Types of Leases',
          type: 'table',
          headers: ['Lease Type', 'Characteristics', 'Accounting'],
          rows: [
            ['Finance (Capital)', 'Transfers ownership or bargain purchase', 'Asset and liability on BS'],
            ['Operating', 'Short-term rental arrangement', 'ROU asset and liability on BS under ASC 842'],
            ['Sale-leaseback', 'Sell asset, lease it back', 'May recognize gain if at fair value'],
            ['Leveraged lease', 'Lessor borrows to acquire asset', 'Complex three-party arrangement'],
          ],
        },
        {
          title: 'Finance Lease Criteria (ASC 842)',
          type: 'text',
          content: "**Any ONE of these makes it a finance lease:**\n\n1. **Ownership transfer** at end of lease\n2. **Bargain purchase option** (likely to be exercised)\n3. **Lease term** ≥ 75% of economic life\n4. **PV of payments** ≥ 90% of fair value\n5. **Specialized asset** with no alternative use to lessor\n\n**Otherwise: Operating lease**\n\n**But under ASC 842, both types go on the balance sheet!**",
        },
        {
          title: 'Lease vs. Buy Analysis',
          type: 'text',
          content: "**Net Advantage to Leasing (NAL):**\nNAL = PV of owning - PV of leasing\n\n**If NAL > 0:** Owning is cheaper\n**If NAL < 0:** Leasing is cheaper\n\n**Owning costs:**\n• Purchase price\n• - Tax depreciation benefit\n• - After-tax maintenance\n• + After-tax salvage value\n\n**Leasing costs:**\n• After-tax lease payments\n\n**Discount at after-tax cost of debt (secured borrowing rate)**",
        },
        {
          title: '🧠 Memory Aid: Lease Criteria',
          type: 'callout',
          content: "**\"BOTLS\"** - Finance lease if any one is met:\n\n**B**argain purchase option\n**O**wnership transfers\n**T**erm ≥ 75% of asset life\n**L**arge PV (≥ 90% of fair value)\n**S**pecialized asset\n\n**If none met → Operating lease\n(But still on balance sheet under ASC 842!)**",
        },
        {
          title: 'Balance Sheet Impact (ASC 842)',
          type: 'text',
          content: "**For BOTH finance and operating leases:**\n\n**Assets:**\nRight-of-use (ROU) asset = PV of lease payments\n\n**Liabilities:**\nLease liability = PV of lease payments\n\n**Key change from old rules:**\nOperating leases were off-balance sheet (rent expense only)\nNow on-balance sheet (grosses up both assets and liabilities)\n\n**Impact on ratios:**\n• Debt ratios increase\n• Asset turnover decreases\n• Current ratio may decrease",
        },
        {
          title: 'Income Statement Differences',
          type: 'table',
          headers: ['Lease Type', 'Expense Pattern', 'Components'],
          rows: [
            ['Finance', 'Front-loaded (higher early)', 'Amortization + Interest (declining)'],
            ['Operating', 'Straight-line', 'Single lease expense'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Discount Rate for Lease',
          type: 'warning',
          content: "**Lessee uses:**\n\n1. **Rate implicit in lease** (if readily determinable)\n2. **Incremental borrowing rate** (if implicit rate unknown)\n\n**Incremental borrowing rate:**\nRate lessee would pay for similar secured loan\n\n**For lease vs. buy analysis:**\nUse after-tax cost of debt!\n(Because lease is a financing decision, not an investment)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Finance lease: meets any of BOTLS criteria",
            "Under ASC 842, ALL leases are on balance sheet",
            "ROU asset = Lease liability = PV of payments",
            "Finance lease: front-loaded expense (interest + amortization)",
            "Operating lease: straight-line expense",
            "Lease vs. buy: compare PV at after-tax debt cost",
            "Impact: Higher liabilities, lower turnover ratios",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-B-010',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Mergers and Acquisitions',
    description: 'Understand M&A valuation, financing, and strategic considerations',
    order: 20,
    duration: 50,
    difficulty: 'advanced',
    topics: ['M&A types', 'Valuation methods', 'Synergies', 'Deal structures'],
    blueprintArea: 'CMA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "M&A represents the largest transactions a company may undertake. CMAs evaluate acquisition targets, determine fair values, assess synergies, analyze financing options, and perform post-acquisition integration. These decisions can create or destroy billions in value.",
        },
        {
          title: 'Types of M&A',
          type: 'table',
          headers: ['Type', 'Description', 'Motivation'],
          rows: [
            ['Horizontal', 'Same industry, same stage', 'Market share, cost synergies'],
            ['Vertical', 'Buyer or supplier', 'Supply chain control'],
            ['Conglomerate', 'Unrelated business', 'Diversification'],
            ['Merger', 'Two firms combine into one', 'Join forces as equals'],
            ['Acquisition', 'One firm buys another', 'Buyer gains control'],
          ],
        },
        {
          title: 'Valuation Methods',
          type: 'text',
          content: "**1. Comparable Companies Analysis:**\nApply multiples from similar companies (P/E, EV/EBITDA)\n\n**2. Precedent Transactions:**\nPrices paid in similar deals (includes control premium)\n\n**3. DCF Valuation:**\nPV of expected free cash flows + Terminal value\n\n**Key formula:**\nValue = FCF₁/(1+r) + FCF₂/(1+r)² +...+ TV/(1+r)ⁿ\n\n**Where TV = FCFn+1 / (r - g) (Gordon growth)**",
        },
        {
          title: 'Synergy Analysis',
          type: 'text',
          content: "**Types of synergies:**\n\n**Cost synergies (easier to achieve):**\n• Headcount reduction\n• Facility consolidation\n• Purchasing power\n• Technology rationalization\n\n**Revenue synergies (harder to achieve):**\n• Cross-selling\n• Geographic expansion\n• Product line expansion\n\n**Key principle:**\nValue of A + B + Synergies - Premium = Value created\n\n**\"Synergies\" often overestimated!**",
        },
        {
          title: '🧠 Memory Aid: M&A Value Creation',
          type: 'callout',
          content: "**\"CRISP\"** - Sources of M&A value:\n\n**C**ost reductions (synergies)\n**R**evenue enhancements\n**I**mproved management\n**S**trategic positioning\n**P**urchase price (must be less than value created!)\n\n**Value created = Synergy value - Premium paid**\nMost value often goes to selling shareholders!",
        },
        {
          title: 'Deal Structures',
          type: 'text',
          content: "**Payment methods:**\n\n**Cash:** Simpler, but depletes resources\n**Stock:** Shares dilution, but preserves cash\n**Combination:** Balance of both\n\n**Structure types:**\n\n**Asset purchase:** Buy specific assets/liabilities\n• Step-up basis for buyer\n• Seller may have double taxation\n\n**Stock purchase:** Buy shares of target\n• Carryover basis\n• Simpler but inherit all liabilities",
        },
        {
          title: 'Acquisition Premium',
          type: 'text',
          content: "**Premium = (Offer Price - Market Price) / Market Price**\n\n**Example:**\nTarget trading at $40\nOffer price: $52\nPremium: ($52 - $40) / $40 = **30%**\n\n**Why pay a premium?**\n• Control value (can make changes)\n• Synergy value\n• Competition from other bidders\n\n**Typical premiums: 20-40%**\n\n**The acquirer must capture synergies > premium to create value!**",
        },
        {
          title: '⚠️ Exam Trap: Goodwill',
          type: 'warning',
          content: "**Purchase price exceeds fair value of net assets:**\n\n**Goodwill = Purchase Price - FV of Net Identifiable Assets**\n\n**Example:**\nPurchase price: $100 million\nFV of assets: $120 million\nFV of liabilities: $40 million\nNet identifiable assets: $80 million\nGoodwill: $100M - $80M = **$20 million**\n\n**Under GAAP, goodwill is NOT amortized but tested annually for impairment!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Horizontal M&A = same industry; Vertical = supply chain",
            "Valuation: Comparables, Precedent transactions, DCF",
            "Synergies: Cost (easier) and Revenue (harder)",
            "Value created = Synergies - Premium paid",
            "Payment: Cash depletes resources; Stock dilutes ownership",
            "Asset purchase: step-up basis; Stock purchase: carryover",
            "Goodwill = Price - FV of net identifiable assets (test for impairment)",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA2BLessons = () => cma2BLessons;
export const getCMA2BLessonById = (id: string) => cma2BLessons.find(lesson => lesson.id === id);
export const getCMA2BLessonCount = () => cma2BLessons.length;

export default cma2BLessons;
