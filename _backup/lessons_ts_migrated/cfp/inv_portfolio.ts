/**
 * CFP Domain 4: Investment Planning
 * Area INV-3: Portfolio Management
 * 
 * These lessons cover asset allocation, performance measurement,
 * portfolio construction, and rebalancing strategies.
 */

import type { Lesson } from '../../../types';

export const CFP_INV3_LESSONS: Lesson[] = [
  {
    id: "CFP-INV-L009",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Asset Allocation Strategies",
    order: 9,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      "Strategic vs tactical asset allocation",
      "Client-based allocation factors",
      "Core-satellite portfolio construction",
      "Risk capacity vs risk tolerance"
    ],
    description: "Compare strategic and tactical asset allocation, determine appropriate allocation based on client factors, apply core-satellite portfolio construction, and integrate risk capacity with risk tolerance.",
    content: {
      sections: [
        {
          type: 'callout',
          title: 'Why This Matters',
          content: '**Asset allocation** is the most important investment decision—research suggests it explains 90%+ of portfolio return variation.'
        },
        {
          type: 'text',
          title: 'The Brinson Study',
          content: `Famous research (Brinson, Hood, Beebower) found:
- **~94%** of return variation explained by asset allocation
- Market timing: ~2%
- Security selection: ~4%

**Implication:** Get the asset mix right first—stock picking and timing are secondary.`
        },
        {
          type: 'text',
          title: 'Strategic Asset Allocation',
          content: `Long-term, policy-driven allocation based on:
- Goals and time horizon
- Risk tolerance
- Risk capacity
- Expected returns`
        },
        {
          type: 'table',
          title: 'Strategic Allocation Characteristics',
          headers: ['Feature', 'Description'],
          rows: [
            ['Time horizon', 'Long-term (5+ years)'],
            ['Changes', 'Infrequent (rebalance to targets)'],
            ['Based on', "Client's financial plan"],
            ['Goal', 'Optimal risk-return for objectives']
          ]
        },
        {
          type: 'table',
          title: 'Example: Target Allocation by Client Type',
          headers: ['Client Type', 'Stocks', 'Bonds', 'Cash'],
          rows: [
            ['Aggressive', '80%', '15%', '5%'],
            ['Moderate', '60%', '35%', '5%'],
            ['Conservative', '30%', '55%', '15%']
          ]
        },
        {
          type: 'text',
          title: 'Tactical Asset Allocation',
          content: 'Short-term deviations from strategic targets to exploit market opportunities.'
        },
        {
          type: 'table',
          title: 'Tactical Allocation Characteristics',
          headers: ['Feature', 'Description'],
          rows: [
            ['Time horizon', 'Short-term (months to 1-2 years)'],
            ['Changes', 'Frequent based on market views'],
            ['Based on', 'Market valuations, economic outlook'],
            ['Risk', 'May underperform if wrong']
          ]
        },
        {
          type: 'example',
          title: '📊 Example',
          content: `Strategic: 60/40 stocks/bonds
Tactical: Move to 70/30 if stocks appear undervalued`
        },
        {
          type: 'text',
          title: 'Dynamic Asset Allocation',
          content: 'Systematic adjustment based on rules or formulas.'
        },
        {
          type: 'table',
          title: 'Dynamic Allocation Methods',
          headers: ['Method', 'How It Works'],
          rows: [
            ['**Constant-mix**', 'Rebalance to fixed percentages'],
            ['**Constant proportion**', 'Maintain fixed dollar amount in each'],
            ['**CPPI**', 'Floor + multiplier approach']
          ]
        },
        {
          type: 'text',
          title: 'CPPI (Constant Proportion Portfolio Insurance)',
          content: `$$\\text{Stock Investment} = \\text{Multiplier} \\times (\\text{Portfolio Value} - \\text{Floor})$$

Increases equity when portfolio rises; decreases when it falls.`
        },
        {
          type: 'text',
          title: 'Factors Affecting Asset Allocation',
          content: `**Risk Tolerance** - Willingness to accept volatility:
- Psychological comfort with losses
- Measured through questionnaires
- Can change with experience

**Risk Capacity** - Ability to take risk:
- Time horizon
- Income stability
- Wealth level
- Liquidity needs`
        },
        {
          type: 'table',
          title: 'Key Distinction: Tolerance vs Capacity',
          headers: ['Factor', 'Question'],
          rows: [
            ['Tolerance', 'How do you **feel** about risk?'],
            ['Capacity', 'How much risk can you **afford**?']
          ]
        },
        {
          type: 'warning',
          title: '⚠️ Exam Trap',
          content: '**Capacity should override tolerance** when they conflict. This is frequently tested!'
        },
        {
          type: 'table',
          title: 'Example: Tolerance vs. Capacity Resolution',
          headers: ['Client', 'Tolerance', 'Capacity', 'Resolution'],
          rows: [
            ['Young professional', 'Low', 'High', 'Educate; lean toward capacity'],
            ['Retiree with pension', 'High', 'Moderate', 'Constrain to capacity'],
            ['Wealthy, low income', 'High', 'High', 'Can follow preference'],
            ['High earner, no savings', 'Low', 'Low', 'Conservative appropriate']
          ]
        },
        {
          type: 'text',
          title: 'Core-Satellite Approach',
          content: 'A portfolio construction method combining passive and active strategies.'
        },
        {
          type: 'table',
          title: 'Core-Satellite Structure',
          headers: ['Component', 'Allocation', 'Strategy'],
          rows: [
            ['**Core**', '60-80%', 'Index/passive, low-cost'],
            ['**Satellite**', '20-40%', 'Active, alternatives, tactical']
          ]
        },
        {
          type: 'text',
          title: 'Core-Satellite Benefits',
          content: `- Low-cost base (core)
- Potential for outperformance (satellite)
- Tax efficiency in core
- Flexibility in satellite`
        },
        {
          type: 'text',
          title: 'Life-Cycle (Target-Date) Allocation',
          content: 'Allocation changes over time—more aggressive when young, conservative near retirement.'
        },
        {
          type: 'table',
          title: 'Example Glide Path',
          headers: ['Age', 'Stocks', 'Bonds'],
          rows: [
            ['25', '90%', '10%'],
            ['40', '80%', '20%'],
            ['55', '65%', '35%'],
            ['65', '50%', '50%'],
            ['75', '35%', '65%']
          ]
        },
        {
          type: 'table',
          title: '"To" vs. "Through" Retirement',
          headers: ['Approach', 'At Retirement', 'After Retirement'],
          rows: [
            ['**To**', 'Most conservative', 'Stays level'],
            ['**Through**', 'Continues adjusting', 'Gets more conservative']
          ]
        },
        {
          type: 'text',
          title: 'Client-Specific Considerations',
          content: `**High Net Worth:**
- Consider tax location (where to hold what)
- Concentrated stock positions
- Alternative investments

**Retirees:**
- Sequence of returns risk
- Income needs
- Healthcare costs

**Young Accumulators:**
- Time to recover from losses
- Human capital as "bond-like" asset
- Behavioral coaching important`
        },
        {
          type: 'callout',
          title: '🧠 Memory Aids',
          content: `- **AAA:** Asset Allocation is Almost All that matters
- **Capacity > Tolerance:** Can you afford it? trumps Do you want it?`
        },
        {
          type: 'text',
          title: 'Key Formulas',
          content: `- **CPPI:** Stock Investment = Multiplier × (Portfolio - Floor)
- **Simple age-based:** Bonds % ≈ Age (rough rule of thumb)`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 1',
          content: `**Question:** A 35-year-old has high risk tolerance but just started saving with $10,000. What allocation approach?

**Answer:** Despite high tolerance, capacity is limited by low wealth. Use moderate-aggressive allocation (70-80% stocks) but emphasize consistent saving. Time horizon supports equity tilt, but discuss need for emergency fund first.`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 2',
          content: `**Question:** What is core-satellite investing?

**Answer:** Core (60-80%) uses low-cost index funds for broad market exposure. Satellite (20-40%) uses actively managed funds, alternatives, or tactical positions to seek outperformance. Combines low costs with potential for alpha.`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 3',
          content: `**Question:** A target-date 2030 fund for a 60-year-old is denominated 'through' retirement. What does this mean?

**Answer:** The fund continues to adjust allocation after the target date, becoming more conservative through retirement. A 'to' fund would reach its most conservative allocation at retirement and stay level.`
        },
        {
          type: 'summary',
          title: 'Key Takeaways',
          content: [
            'Asset allocation explains ~94% of return variation—most important decision',
            'Strategic allocation: Long-term policy; Tactical: Short-term adjustments',
            'Risk capacity (ability) should override risk tolerance (willingness)',
            'Core-satellite: Low-cost index core + active/alternative satellite',
            "Target-date funds: Allocation changes ('glides') toward retirement"
          ]
        }
      ]
    }
  },

  {
    id: "CFP-INV-L010",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Portfolio Performance Measurement",
    order: 10,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      "Sharpe, Treynor, and Jensen's alpha",
      "Time-weighted vs dollar-weighted returns",
      "Benchmark selection",
      "Risk-adjusted performance measures"
    ],
    description: "Calculate and interpret Sharpe, Treynor, and Jensen's alpha, compare time-weighted and dollar-weighted returns, select appropriate benchmarks for evaluation, and apply risk-adjusted performance measures.",
    content: {
      sections: [
        {
          type: 'callout',
          title: 'Why This Matters',
          content: 'Evaluating investment performance requires more than just returns—we must consider the risk taken.'
        },
        {
          type: 'text',
          title: 'Why Risk-Adjusted Returns Matter',
          content: 'Comparing raw returns without considering risk can be misleading.'
        },
        {
          type: 'table',
          title: 'The Problem',
          headers: ['Fund', 'Return', 'Standard Deviation'],
          rows: [
            ['A', '12%', '8%'],
            ['B', '14%', '20%']
          ]
        },
        {
          type: 'text',
          title: 'Risk-Adjusted Perspective',
          content: `Which is better? B has higher return but much more risk.

- Fund A earned 1.5% return per unit of risk (12/8)
- Fund B earned 0.7% return per unit of risk (14/20)

**Fund A is more efficient.**`
        },
        {
          type: 'text',
          title: 'Sharpe Ratio',
          content: `$$\\text{Sharpe Ratio} = \\frac{R_p - R_f}{\\sigma_p}$$

Where:
- $R_p$ = Portfolio return
- $R_f$ = Risk-free rate
- $\\sigma_p$ = Portfolio standard deviation`
        },
        {
          type: 'table',
          title: 'Sharpe Ratio Interpretation',
          headers: ['Sharpe', 'Meaning'],
          rows: [
            ['> 1.0', 'Good'],
            ['> 2.0', 'Very good'],
            ['> 3.0', 'Excellent'],
            ['< 0', 'Underperformed risk-free rate']
          ]
        },
        {
          type: 'text',
          title: 'When to Use Sharpe Ratio',
          content: `- Comparing portfolios
- Undiversified investors (total risk matters)
- Evaluating the entire portfolio`
        },
        {
          type: 'text',
          title: 'Treynor Ratio',
          content: `$$\\text{Treynor Ratio} = \\frac{R_p - R_f}{\\beta_p}$$

Where:
- $\\beta_p$ = Portfolio beta`
        },
        {
          type: 'table',
          title: 'Difference from Sharpe',
          headers: ['Measure', 'Risk Used', 'Best For'],
          rows: [
            ['Sharpe', 'Standard deviation (total risk)', 'Total portfolio'],
            ['Treynor', 'Beta (systematic risk)', 'Diversified portfolio segment']
          ]
        },
        {
          type: 'text',
          title: 'When to Use Treynor Ratio',
          content: `- Evaluating a portion of overall portfolio
- Comparing diversified funds
- When unsystematic risk is diversified away`
        },
        {
          type: 'text',
          title: "Jensen's Alpha",
          content: `$$\\alpha = R_p - [R_f + \\beta_p(R_m - R_f)]$$

Or simply:
$$\\alpha = \\text{Actual Return} - \\text{CAPM Expected Return}$$`
        },
        {
          type: 'table',
          title: "Jensen's Alpha Interpretation",
          headers: ['Alpha', 'Meaning'],
          rows: [
            ['> 0', 'Beat risk-adjusted expectations'],
            ['= 0', 'Met expectations'],
            ['< 0', 'Underperformed expectations']
          ]
        },
        {
          type: 'text',
          title: "When to Use Jensen's Alpha",
          content: `- Evaluating manager skill
- Determining if fees are justified
- Comparing active managers`
        },
        {
          type: 'example',
          title: '📊 Example: All Three Measures',
          content: `**Given:**
| Given | Value |
|-------|-------|
| Portfolio return | 12% |
| Risk-free rate | 3% |
| Portfolio std dev | 15% |
| Portfolio beta | 1.1 |
| Market return | 10% |

**Sharpe Ratio:**
$$\\frac{12\\% - 3\\%}{15\\%} = \\frac{9\\%}{15\\%} = 0.60$$

**Treynor Ratio:**
$$\\frac{12\\% - 3\\%}{1.1} = \\frac{9\\%}{1.1} = 8.18$$

**Jensen's Alpha:**
Expected = 3% + 1.1(10% - 3%) = 3% + 7.7% = 10.7%
$$\\alpha = 12\\% - 10.7\\% = +1.3\\%$$`
        },
        {
          type: 'text',
          title: 'Information Ratio',
          content: `$$\\text{Information Ratio} = \\frac{R_p - R_b}{\\text{Tracking Error}}$$

Where:
- $R_b$ = Benchmark return
- Tracking Error = Std dev of (portfolio - benchmark)

Measures excess return **per unit of active risk**.`
        },
        {
          type: 'table',
          title: 'Information Ratio Interpretation',
          headers: ['IR', 'Meaning'],
          rows: [
            ['> 0.5', 'Good active management'],
            ['> 1.0', 'Very good']
          ]
        },
        {
          type: 'text',
          title: 'Time-Weighted vs. Dollar-Weighted Returns',
          content: `**Time-Weighted Return (TWR):**
- Eliminates impact of cash flows
- Geometric linking of sub-period returns
- **Best for evaluating managers** (they don't control flows)

**Dollar-Weighted Return (DWR):**
- Also called Money-Weighted Return (MWR)
- Based on IRR of cash flows
- **Best for evaluating investor's experience**`
        },
        {
          type: 'example',
          title: '📊 TWR vs DWR Example',
          content: `| Period | Return | Investment |
|--------|--------|------------|
| Year 1 | +20% | $100,000 |
| Year 2 | -10% | Add $100,000 |

**TWR:** (1.20)(0.90) - 1 = **8%**

**DWR:** Closer to **-10%** (more money during losing period)`
        },
        {
          type: 'callout',
          title: '🧠 Memory Aid',
          content: `- **Sharpe = Standard deviation; Treynor = sysTematic (beta)**
- **TWR = Time tells the manager's Tale; DWR = Dollars tell Your story**`
        },
        {
          type: 'text',
          title: 'Benchmark Selection',
          content: 'A good benchmark has specific characteristics that make it useful for comparison.'
        },
        {
          type: 'table',
          title: 'Characteristics of Good Benchmarks',
          headers: ['Feature', 'Description'],
          rows: [
            ['**Unambiguous**', 'Clearly defined holdings'],
            ['**Investable**', 'Can actually replicate'],
            ['**Measurable**', 'Performance calculable'],
            ['**Appropriate**', 'Matches investment style'],
            ['**Specified in advance**', 'Not selected after the fact']
          ]
        },
        {
          type: 'table',
          title: 'Common Benchmarks',
          headers: ['Asset Class', 'Common Benchmarks'],
          rows: [
            ['US Large Cap', 'S&P 500, Russell 1000'],
            ['US Small Cap', 'Russell 2000'],
            ['International', 'MSCI EAFE, MSCI ACWI ex-US'],
            ['Bonds', 'Bloomberg Aggregate'],
            ['Balanced', '60% S&P 500 / 40% Bloomberg Agg']
          ]
        },
        {
          type: 'text',
          title: 'Key Formulas',
          content: `- **Sharpe Ratio** = (Rp - Rf) / σp
- **Treynor Ratio** = (Rp - Rf) / βp
- **Jensen's Alpha** = Rp - [Rf + β(Rm - Rf)]
- **Information Ratio** = (Rp - Rb) / Tracking Error`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 1',
          content: `**Question:** A fund returned 15% with 20% standard deviation. Risk-free rate is 4%. What is the Sharpe ratio?

**Answer:** Sharpe = (15% - 4%) / 20% = 11% / 20% = 0.55`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 2',
          content: `**Question:** A manager returned 14% (beta 1.2) when market returned 10%. Risk-free rate is 3%. What is Jensen's alpha?

**Answer:** Expected = 3% + 1.2(10% - 3%) = 3% + 8.4% = 11.4%. Alpha = 14% - 11.4% = +2.6%`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 3',
          content: `**Question:** An investor added $50,000 right before a 20% decline. Would TWR or DWR show worse performance?

**Answer:** DWR (dollar-weighted return) would show worse performance because it weights more money during the losing period. TWR treats each period equally regardless of cash flows.`
        },
        {
          type: 'summary',
          title: 'Key Takeaways',
          content: [
            'Sharpe = (Rp - Rf) / σp; uses total risk, best for whole portfolio',
            'Treynor = (Rp - Rf) / βp; uses systematic risk, for diversified portfolios',
            "Jensen's alpha = Actual - CAPM expected; measures manager skill",
            'TWR for manager evaluation (ignores flows); DWR for investor experience',
            'Good benchmark: Unambiguous, investable, appropriate, specified in advance'
          ]
        }
      ]
    }
  },

  {
    id: "CFP-INV-L011",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Portfolio Rebalancing and Tax Management",
    order: 11,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      "Rebalancing strategies and triggers",
      "Tax-loss harvesting techniques",
      "Asset location optimization",
      "Tax efficiency in portfolio management"
    ],
    description: "Compare rebalancing strategies and triggers, apply tax-loss harvesting techniques, optimize asset location across account types, and balance tax efficiency with portfolio management.",
    content: {
      sections: [
        {
          type: 'callout',
          title: 'Why This Matters',
          content: 'Rebalancing maintains target risk levels while managing tax implications efficiently.'
        },
        {
          type: 'text',
          title: 'Why Rebalance?',
          content: 'Without rebalancing, portfolio drift can make your portfolio riskier over time as asset classes outperform each other.'
        },
        {
          type: 'table',
          title: 'Drift Example',
          headers: ['Asset', 'Target', 'Start', 'After 1 Year'],
          rows: [
            ['Stocks', '60%', '$60,000', '$78,000 (65%)'],
            ['Bonds', '40%', '$40,000', '$42,000 (35%)'],
            ['**Total**', '100%', '$100,000', '$120,000']
          ]
        },
        {
          type: 'table',
          title: 'Benefits of Rebalancing',
          headers: ['Benefit', 'Description'],
          rows: [
            ['**Risk control**', 'Maintain target risk level'],
            ['**Discipline**', 'Forces buy low, sell high'],
            ['**Systematic**', 'Removes emotion from decisions']
          ]
        },
        {
          type: 'text',
          title: 'Rebalancing Methods',
          content: 'There are three main approaches to triggering rebalancing.'
        },
        {
          type: 'table',
          title: 'Calendar Rebalancing',
          headers: ['Frequency', 'Pros', 'Cons'],
          rows: [
            ['Quarterly', 'Catches drift early', 'More transactions'],
            ['Semi-annual', 'Balance of monitoring', 'May miss large swings'],
            ['Annual', 'Fewer transactions', 'May experience significant drift']
          ]
        },
        {
          type: 'text',
          title: 'Threshold (Percentage) Rebalancing',
          content: 'Rebalance when allocation drifts beyond target by a set amount.'
        },
        {
          type: 'table',
          title: 'Threshold Types',
          headers: ['Threshold', 'Description'],
          rows: [
            ['Absolute (5%)', 'Rebalance if 60% target becomes 55% or 65%'],
            ['Relative (25%)', 'Rebalance if 60% × 25% = 15% range (51-69%)']
          ]
        },
        {
          type: 'text',
          title: 'Hybrid Approach',
          content: 'Check at calendar dates, but only act if threshold exceeded. This combines the benefits of both methods.'
        },
        {
          type: 'table',
          title: 'Costs of Rebalancing',
          headers: ['Cost', 'Description'],
          rows: [
            ['Transaction costs', 'Commissions, spreads'],
            ['Taxes', 'Capital gains on sales'],
            ['Time/Effort', 'Monitoring and execution']
          ]
        },
        {
          type: 'table',
          title: 'Costs of NOT Rebalancing',
          headers: ['Cost', 'Description'],
          rows: [
            ['Risk drift', 'Portfolio becomes too aggressive/conservative'],
            ['Behavioral', 'Chasing performance'],
            ['Goal misalignment', 'Risk may not match objectives']
          ]
        },
        {
          type: 'text',
          title: 'Tax-Efficient Rebalancing',
          content: 'Methods to reduce the tax impact of rebalancing.'
        },
        {
          type: 'table',
          title: 'Methods to Reduce Tax Impact',
          headers: ['Method', 'How It Works'],
          rows: [
            ['**Use new contributions**', 'Direct new money to underweight assets'],
            ['**Redirect dividends**', 'Reinvest in underweight positions'],
            ['**Rebalance in tax-advantaged**', 'Sell in IRA/401(k) where gains aren\'t taxed'],
            ['**Tax-loss harvesting**', 'Offset gains with losses']
          ]
        },
        {
          type: 'text',
          title: 'Tax-Loss Harvesting',
          content: `Sell investments at a loss to:
1. Offset capital gains
2. Offset up to $3,000 ordinary income
3. Carry forward excess losses`
        },
        {
          type: 'table',
          title: 'Tax-Loss Harvesting Rules',
          headers: ['Rule', 'Requirement'],
          rows: [
            ['**Wash sale rule**', 'Cannot repurchase same or "substantially identical" security within 30 days (before or after)'],
            ['**Short vs. long**', 'Match character when possible (ST loss offsets ST gain first)'],
            ['**Carryforward**', 'Unused losses carry forward indefinitely']
          ]
        },
        {
          type: 'example',
          title: '📊 Tax-Loss Harvesting Example',
          content: `| Event | Amount |
|-------|--------|
| Sell Stock A for $5,000 loss | -$5,000 |
| Buy similar (not identical) Stock B | (to stay invested) |
| Offset gains | -$5,000 from gains |
| Unused? | Offset $3,000 income, carry rest |`
        },
        {
          type: 'text',
          title: 'Asset Location',
          content: 'Place investments in the most tax-efficient account type.'
        },
        {
          type: 'table',
          title: 'Asset Location Guidelines',
          headers: ['Investment Type', 'Best Location', 'Why'],
          rows: [
            ['**Taxable bonds**', 'Tax-deferred (IRA, 401k)', 'Interest = ordinary income'],
            ['**REITs**', 'Tax-deferred', 'Dividends = ordinary income'],
            ['**High-turnover funds**', 'Tax-deferred', 'Frequent cap gains'],
            ['**Growth stocks**', 'Taxable', 'LTCG, step-up at death'],
            ['**Muni bonds**', 'Taxable', 'Already tax-exempt'],
            ['**Index funds**', 'Taxable', 'Tax-efficient already']
          ]
        },
        {
          type: 'text',
          title: 'Why Asset Location Matters',
          content: 'Same investments, different locations = different after-tax returns.'
        },
        {
          type: 'table',
          title: 'Asset Location Example',
          headers: ['Investment', 'Pre-Tax Return', 'Tax-Deferred', 'Taxable (35% rate)'],
          rows: [
            ['Bonds (5%)', '5%', '5%', '3.25%'],
            ['Stocks (8%)', '8%', '8%', '~6.5%*']
          ]
        },
        {
          type: 'text',
          title: '',
          content: '*Assuming qualified dividends and LTCG rates.\n\n**Bonds lose more to taxes** → put in tax-deferred accounts.'
        },
        {
          type: 'warning',
          title: '⚠️ Wash Sale Rule Details',
          content: 'Understanding what triggers the wash sale rule is critical for the exam.'
        },
        {
          type: 'table',
          title: 'What Triggers Wash Sale',
          headers: ['Scenario', 'Wash Sale?'],
          rows: [
            ['Sell stock, buy same stock within 30 days', 'Yes'],
            ['Sell stock, buy in IRA within 30 days', 'Yes'],
            ['Sell stock, buy similar (not identical) ETF', 'Usually No'],
            ['Sell mutual fund, buy ETF tracking different index', 'No']
          ]
        },
        {
          type: 'text',
          title: 'Wash Sale Consequence',
          content: `- Loss is **disallowed** for current year
- Loss is **added to cost basis** of replacement shares
- Not lost forever—just deferred`
        },
        {
          type: 'callout',
          title: '🧠 Memory Aids',
          content: `- **Wash Sale = Wait 31 days** (30-day window, must wait longer)
- **Asset Location:** Poor tax treatment → IRA; Good tax treatment → Taxable`
        },
        {
          type: 'text',
          title: 'Practical Considerations',
          content: `**For Rebalancing:**
1. Use new contributions first
2. Rebalance in tax-advantaged accounts
3. Consider tax-loss harvesting opportunities
4. Annual or threshold-based is usually sufficient

**For Tax Efficiency:**
1. Consider asset location when building portfolio
2. Don't let tax tail wag investment dog
3. Index funds and ETFs are inherently more tax-efficient
4. Municipal bonds in taxable, taxable bonds in IRA`
        },
        {
          type: 'text',
          title: 'Key Formulas',
          content: `- **Threshold Rebalance:** If |Actual - Target| > threshold, rebalance
- **Capital loss offset:** Gains first, then $3,000 ordinary income, then carryforward`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 1',
          content: `**Question:** An investor sells Fund A at a $10,000 loss and buys substantially identical Fund B three weeks later. What happens?

**Answer:** Wash sale rule triggered. The $10,000 loss is disallowed this year but added to Fund B's cost basis. When Fund B is eventually sold, the higher basis will result in a lower gain (or larger loss).`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 2',
          content: `**Question:** A client has an IRA and taxable account. Where should they hold REITs and municipal bonds?

**Answer:** REITs in IRA (dividends are ordinary income, benefit from tax deferral). Municipal bonds in taxable (already tax-exempt, no benefit from IRA).`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 3',
          content: `**Question:** An investor has $3,000 in capital gains and $8,000 in capital losses. What is the tax impact?

**Answer:** $8,000 loss - $3,000 gain = $5,000 net loss. Use $3,000 to offset ordinary income (max). Carry forward $2,000 to future years.`
        },
        {
          type: 'summary',
          title: 'Key Takeaways',
          content: [
            'Rebalancing maintains target risk; use calendar, threshold, or hybrid triggers',
            'Rebalance in tax-advantaged accounts first to avoid taxable gains',
            'Tax-loss harvesting: Offset gains, $3,000 income; avoid wash sale (30 days)',
            'Asset location: Bonds/REITs in IRA; growth stocks/munis in taxable',
            "Wash sale loss isn't lost—added to replacement shares' basis"
          ]
        }
      ]
    }
  },

  {
    id: "CFP-INV-L012",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Investment Policy and Suitability",
    order: 12,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      "Investment policy statement drafting",
      "Suitability analysis",
      "Client circumstances integration",
      "Strategy monitoring and updates"
    ],
    description: "Draft an investment policy statement, apply suitability analysis to investment recommendations, integrate client circumstances into portfolio design, and monitor and update investment strategies.",
    content: {
      sections: [
        {
          type: 'callout',
          title: 'Why This Matters',
          content: 'An **Investment Policy Statement (IPS)** provides the roadmap for managing a portfolio based on client needs and circumstances.'
        },
        {
          type: 'table',
          title: 'IPS Purpose',
          headers: ['Function', 'Description'],
          rows: [
            ['**Communication**', 'Aligns client and advisor expectations'],
            ['**Discipline**', 'Prevents emotional reactions'],
            ['**Documentation**', 'Record of agreed-upon approach'],
            ['**Benchmark**', 'Basis for evaluating performance']
          ]
        },
        {
          type: 'text',
          title: 'IPS Components: Client Information',
          content: ''
        },
        {
          type: 'table',
          title: 'Client Information Elements',
          headers: ['Element', 'Details'],
          rows: [
            ['**Goals**', 'Retirement, education, home purchase'],
            ['**Time horizon**', 'When funds needed'],
            ['**Risk tolerance**', 'Willingness to accept volatility'],
            ['**Risk capacity**', 'Ability to endure losses'],
            ['**Liquidity needs**', 'Emergency fund, near-term expenses'],
            ['**Tax situation**', 'Bracket, account types'],
            ['**Legal constraints**', 'ERISA, trust restrictions'],
            ['**Unique circumstances**', 'Concentrated stock, ESG preferences']
          ]
        },
        {
          type: 'table',
          title: 'Investment Guidelines',
          headers: ['Element', 'Details'],
          rows: [
            ['**Target allocation**', '% stocks, bonds, alternatives'],
            ['**Allowable ranges**', 'Min/max for each asset class'],
            ['**Rebalancing triggers**', 'Calendar, threshold, hybrid'],
            ['**Benchmark**', 'Performance comparison standard'],
            ['**Permitted investments**', 'Asset classes, vehicle types'],
            ['**Prohibited investments**', 'Derivatives, illiquid, etc.']
          ]
        },
        {
          type: 'text',
          title: 'Return Objectives',
          content: 'Determining the required return involves multiple factors.'
        },
        {
          type: 'table',
          title: 'Determining Required Return',
          headers: ['Factor', 'Consideration'],
          rows: [
            ['**Spending needs**', 'Annual withdrawals required'],
            ['**Inflation**', 'Maintain purchasing power'],
            ['**Taxes**', 'Pre-tax vs. after-tax needs'],
            ['**Growth**', 'Wealth accumulation goals']
          ]
        },
        {
          type: 'example',
          title: '📊 Example Calculation',
          content: `| Factor | Amount |
|--------|--------|
| Annual spending | $80,000 |
| Portfolio value | $2,000,000 |
| Required nominal return | 4% |
| Inflation assumption | 2.5% |
| Required real return | ~1.5% |`
        },
        {
          type: 'text',
          title: 'Risk Objectives',
          content: 'Risk objectives should be stated in measurable terms.'
        },
        {
          type: 'table',
          title: 'Specifying Risk',
          headers: ['Measure', 'How to State'],
          rows: [
            ['**Standard deviation**', '"Portfolio volatility should not exceed 12%"'],
            ['**Maximum drawdown**', '"Should not lose more than 15% in any year"'],
            ['**Shortfall risk**', '"90% confidence of meeting spending needs"']
          ]
        },
        {
          type: 'table',
          title: 'Matching Risk Capacity',
          headers: ['Factor', 'Lower Capacity', 'Higher Capacity'],
          rows: [
            ['Time horizon', 'Short', 'Long'],
            ['Wealth level', 'Low', 'High'],
            ['Income stability', 'Variable', 'Stable'],
            ['Insurance needs', 'High', 'Well-covered']
          ]
        },
        {
          type: 'text',
          title: 'Suitability Framework',
          content: 'Key factors to assess when determining if an investment is suitable for a client.'
        },
        {
          type: 'table',
          title: 'Key Factors to Assess',
          headers: ['Factor', 'Questions'],
          rows: [
            ['**Investment experience**', 'What has client owned before?'],
            ['**Knowledge level**', 'Does client understand risks?'],
            ['**Financial situation**', 'Net worth, income, expenses'],
            ['**Investment objectives**', 'Growth, income, preservation'],
            ['**Time horizon**', 'Short, intermediate, long-term'],
            ['**Risk tolerance**', 'Questionnaire results, conversations'],
            ['**Liquidity needs**', 'When might money be needed?']
          ]
        },
        {
          type: 'warning',
          title: '⚠️ Red Flags for Suitability',
          content: `| Issue | Concern |
|-------|---------|
| High risk for elderly investor | May not recover from losses |
| Concentrated position | Lack of diversification |
| Illiquid investments with short horizon | May not be able to access funds |
| Complex products for inexperienced | May not understand risks |`
        },
        {
          type: 'text',
          title: 'Monitoring and Review',
          content: 'Regular reviews ensure the IPS remains aligned with client needs.'
        },
        {
          type: 'table',
          title: 'Periodic Review Schedule',
          headers: ['Frequency', 'Focus'],
          rows: [
            ['**Quarterly**', 'Performance, rebalancing needs'],
            ['**Annually**', 'Full IPS review, life changes'],
            ['**Ad hoc**', 'Major life events (marriage, job change)']
          ]
        },
        {
          type: 'table',
          title: 'When to Update IPS',
          headers: ['Trigger', 'Potential Changes'],
          rows: [
            ['Change in goals', 'Update objectives'],
            ['Major life event', 'Reassess risk capacity'],
            ['Market conditions', 'May need rebalancing'],
            ['Time horizon shift', 'Adjust allocation'],
            ['Regulatory changes', 'Update constraints']
          ]
        },
        {
          type: 'text',
          title: 'Documenting Recommendations',
          content: 'Best practices for documenting investment recommendations.'
        },
        {
          type: 'table',
          title: 'Documentation Best Practices',
          headers: ['Practice', 'Purpose'],
          rows: [
            ['**Written rationale**', 'Explain why suitable'],
            ['**Alternative options**', 'Show considerations'],
            ['**Risk disclosures**', 'Document understanding'],
            ['**Client acknowledgment**', 'Signatures on IPS'],
            ['**Ongoing notes**', 'Record discussions']
          ]
        },
        {
          type: 'example',
          title: '📊 Sample Documentation',
          content: `"Based on client's 20-year time horizon, moderate risk tolerance, and $2M portfolio, we recommend a 65% equity/35% fixed income allocation. This aligns with client's goal of 5% real return and ability to withstand 20% drawdown without impacting retirement timeline."`
        },
        {
          type: 'text',
          title: 'Fiduciary Considerations',
          content: ''
        },
        {
          type: 'table',
          title: 'Standard of Care',
          headers: ['Standard', 'Requirement'],
          rows: [
            ['**Suitability**', 'Reasonable basis, right for the client'],
            ['**Fiduciary**', 'Best interest, ongoing duty'],
            ['**Prudent investor**', 'Care, skill, caution']
          ]
        },
        {
          type: 'text',
          title: 'CFP Board Standards',
          content: `CFP® professionals must:
- Act in client's best interest
- Provide advice that is suitable given client circumstances
- Disclose conflicts of interest
- Document recommendations`
        },
        {
          type: 'text',
          title: 'Key Formulas',
          content: `- **Required Return** = (Spending / Portfolio) + Inflation + Taxes
- **Rule of thumb:** Max drawdown tolerance ≈ 2 × portfolio standard deviation`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 1',
          content: `**Question:** A retiree with $1.5M needs $60,000 annually. Inflation is 2.5%. What is the required nominal return?

**Answer:** Spending rate = $60,000 / $1,500,000 = 4%. Add inflation = 4% + 2.5% = 6.5% required nominal return (before taxes).`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 2',
          content: `**Question:** What should trigger a review and potential update to an IPS?

**Answer:** Major life events (marriage, divorce, inheritance, job loss), significant market changes affecting allocation, changes in client goals or time horizon, reaching key milestones, or regulatory/tax law changes.`
        },
        {
          type: 'example',
          title: '📊 Practice Problem 3',
          content: `**Question:** A client says they have high risk tolerance but gets anxious when markets drop 5%. What should the advisor do?

**Answer:** Recognize the disconnect between stated and revealed preferences. Educate about historical volatility, potentially reduce allocation to align with actual (revealed) tolerance, or implement strategies to reduce portfolio volatility (bonds, diversification).`
        },
        {
          type: 'summary',
          title: 'Key Takeaways',
          content: [
            'IPS documents goals, risk tolerance, allocation, and review procedures',
            'Return objective: Spending + inflation + taxes + growth',
            'Risk objective: Match capacity (ability) with tolerance; capacity rules',
            'Suitability: Match investments to time horizon, experience, financial situation',
            'Review IPS annually and after major life events'
          ]
        }
      ]
    }
  }
];

export default CFP_INV3_LESSONS;
