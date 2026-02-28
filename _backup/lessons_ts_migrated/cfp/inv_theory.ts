/**
 * CFP Domain 4: Investment Planning
 * Area INV-1: Investment Theory and Concepts
 * 
 * These lessons cover fundamental investment theory including
 * risk/return, modern portfolio theory, and market efficiency.
 */

import type { Lesson } from '../../../types';

export const CFP_INV1_LESSONS: Lesson[] = [
  {
    id: "CFP-INV-L001",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Risk and Return Fundamentals",
    description: "Define and calculate various measures of investment return, distinguish between systematic and unsystematic risk, calculate standard deviation and coefficient of variation, and apply the risk-return tradeoff in investment decisions.",
    order: 1,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      "Investment return measures",
      "Systematic vs unsystematic risk",
      "Standard deviation and coefficient of variation",
      "Risk-return tradeoff"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "🧠 Understanding the relationship between risk and return is the foundation of all investment planning."
        },
        {
          title: "Measures of Return",
          type: "text",
          content: "### Holding Period Return (HPR)\n\nTotal return over a specific time period.\n\n$$\\text{HPR} = \\frac{\\text{Ending Value} - \\text{Beginning Value} + \\text{Income}}{\\text{Beginning Value}}$$"
        },
        {
          title: "HPR Example",
          type: "example",
          content: "📊 **Calculating Holding Period Return**\n\n| Item | Value |\n|------|-------|\n| Purchase price | $100 |\n| Sale price | $115 |\n| Dividends received | $3 |\n\n$$\\text{HPR} = \\frac{\\$115 - \\$100 + \\$3}{\\$100} = 18\\%$$"
        },
        {
          title: "Annualized Returns",
          type: "text",
          content: "### Arithmetic Mean Return\n\nSimple average of periodic returns.\n\n$$\\bar{R} = \\frac{R_1 + R_2 + ... + R_n}{n}$$\n\n**Use**: Expected return calculations, comparing strategies.\n\n### Geometric Mean Return (CAGR)\n\nCompound annual growth rate—actual growth rate over time.\n\n$$\\text{Geometric Mean} = \\left[(1+R_1)(1+R_2)...(1+R_n)\\right]^{1/n} - 1$$\n\n**Use**: Actual historical performance, time-weighted returns."
        },
        {
          title: "Arithmetic vs Geometric Mean",
          type: "table",
          headers: ["Return Type", "Best For"],
          rows: [
            ["Arithmetic", "Forecasting expected returns"],
            ["Geometric", "Measuring actual performance"]
          ]
        },
        {
          title: "Memory Aid",
          type: "callout",
          calloutType: "memory-aid",
          content: "🧠 Arithmetic mean is always ≥ geometric mean (except when all returns are equal). **Geometric = Get the actual Growth**"
        },
        {
          title: "Arithmetic vs. Geometric Example",
          type: "example",
          content: "📊 **Two-Year Return Comparison**\n\n| Year | Return | Value ($1,000 start) |\n|------|--------|---------------------|\n| 1 | +50% | $1,500 |\n| 2 | -50% | $750 |\n\n**Arithmetic mean**: (50% + -50%) / 2 = **0%**\n\n**Geometric mean**: √(1.50 × 0.50) - 1 = √0.75 - 1 = **-13.4%**\n\nThe geometric mean reflects reality—you lost money!"
        },
        {
          title: "Real vs. Nominal Returns",
          type: "text",
          content: "### Fisher Equation\n\n$$\\text{Real Return} ≈ \\text{Nominal Return} - \\text{Inflation Rate}$$\n\nMore precisely:\n\n$$1 + R_{\\text{real}} = \\frac{1 + R_{\\text{nominal}}}{1 + \\text{Inflation}}$$"
        },
        {
          title: "Real Return Example",
          type: "example",
          content: "📊 **Calculating Real Return**\n\n| Item | Rate |\n|------|------|\n| Nominal return | 8% |\n| Inflation | 3% |\n\n$$R_{\\text{real}} = \\frac{1.08}{1.03} - 1 = 4.85\\%$$"
        },
        {
          title: "Types of Investment Risk",
          type: "text",
          content: "### Systematic Risk (Market Risk)\n\n**Cannot be diversified away.** Affects entire market."
        },
        {
          title: "Systematic Risk Types",
          type: "table",
          headers: ["Type", "Description"],
          rows: [
            ["**Market risk**", "Overall market movements"],
            ["**Interest rate risk**", "Rising rates hurt bond prices"],
            ["**Inflation risk**", "Purchasing power erosion"],
            ["**Exchange rate risk**", "Currency fluctuations"],
            ["**Reinvestment risk**", "Reinvesting at lower rates"]
          ]
        },
        {
          title: "Unsystematic Risk Types",
          type: "text",
          content: "### Unsystematic Risk (Diversifiable Risk)\n\n**Can be diversified away.** Specific to company/industry."
        },
        {
          title: "Unsystematic Risk Types",
          type: "table",
          headers: ["Type", "Description"],
          rows: [
            ["**Business risk**", "Company operations"],
            ["**Financial risk**", "Use of leverage"],
            ["**Default risk**", "Failure to pay obligations"],
            ["**Liquidity risk**", "Difficulty selling quickly"],
            ["**Political risk**", "Government actions"]
          ]
        },
        {
          title: "Memory Aid: Systematic Risks",
          type: "callout",
          calloutType: "memory-aid",
          content: "🧠 **PRIME** risks are systematic: **P**urchasing power, **R**einvestment, **I**nterest rate, **M**arket, **E**xchange rate"
        },
        {
          title: "Measuring Risk: Standard Deviation",
          type: "text",
          content: "### Definition\n\nMeasures dispersion of returns around the mean.\n\n$$\\sigma = \\sqrt{\\frac{\\sum(R_i - \\bar{R})^2}{n-1}}$$"
        },
        {
          title: "Standard Deviation Interpretation",
          type: "table",
          headers: ["Standard Deviation", "Meaning"],
          rows: [
            ["Low σ", "Returns clustered near mean"],
            ["High σ", "Returns widely dispersed"]
          ]
        },
        {
          title: "Normal Distribution Rule",
          type: "text",
          content: "- 68% of returns within ±1σ\n- 95% of returns within ±2σ\n- 99% of returns within ±3σ"
        },
        {
          title: "Coefficient of Variation (CV)",
          type: "text",
          content: "Measures risk per unit of return.\n\n$$\\text{CV} = \\frac{\\sigma}{\\bar{R}}$$\n\n**When to Use**: Comparing investments with different expected returns."
        },
        {
          title: "CV Comparison Example",
          type: "example",
          content: "📊 **Comparing Risk-Adjusted Returns**\n\n| Investment | Return | Std Dev | CV |\n|------------|--------|---------|-----|\n| A | 10% | 15% | 1.50 |\n| B | 20% | 25% | 1.25 |\n\n**Investment B** has better risk-adjusted return (lower CV)."
        },
        {
          title: "Risk-Return Tradeoff",
          type: "text",
          content: "### The Fundamental Principle\n\nHigher expected returns require accepting higher risk."
        },
        {
          title: "Historical Risk-Return by Asset Class",
          type: "table",
          headers: ["Asset Class", "Historical Return", "Historical Risk"],
          rows: [
            ["T-Bills", "~3%", "~1%"],
            ["Bonds", "~5%", "~6%"],
            ["Large stocks", "~10%", "~15%"],
            ["Small stocks", "~12%", "~20%"]
          ]
        },
        {
          title: "Implications for Planning",
          type: "text",
          content: "- **Young clients**: Can accept more risk (longer time horizon)\n- **Retirees**: Generally need lower risk\n- **Risk capacity ≠ Risk tolerance**"
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**Geometric mean** reflects actual performance; arithmetic mean for forecasting",
            "**Systematic risk** cannot be diversified; unsystematic risk can be",
            "**Standard deviation** measures total volatility of returns",
            "**Coefficient of variation** = risk per unit of return (lower is better)",
            "**Higher returns require higher risk**—no free lunch in investing"
          ]
        },
        {
          title: "Key Formulas",
          type: "text",
          content: "- **HPR**: (End - Begin + Income) / Begin\n- **Geometric Mean**: [(1+R₁)(1+R₂)...(1+Rₙ)]^(1/n) - 1\n- **Real Return**: ≈ Nominal Return - Inflation\n- **CV**: Standard Deviation / Expected Return"
        }
      ]
    }
  },

  {
    id: "CFP-INV-L002",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Modern Portfolio Theory",
    description: "Explain the benefits of diversification, calculate portfolio expected return and standard deviation, interpret correlation and its impact on portfolio risk, and identify the efficient frontier and optimal portfolios.",
    order: 2,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      "Diversification benefits",
      "Portfolio expected return",
      "Portfolio standard deviation",
      "Correlation coefficient",
      "Efficient frontier"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "🧠 **Modern Portfolio Theory (MPT)**, developed by Harry Markowitz (1952), revolutionized investing by showing how to optimize the risk-return tradeoff through diversification."
        },
        {
          title: "The Power of Diversification",
          type: "text",
          content: "### Key Insight\n\nCombining assets with less-than-perfect correlation reduces portfolio risk **without sacrificing return**.\n\n### Mathematical Foundation\n\nTwo assets with same return and same risk:\n- Perfect correlation (+1): No risk reduction\n- Zero correlation (0): Some risk reduction\n- Negative correlation (-1): Maximum risk reduction"
        },
        {
          title: "Portfolio Expected Return",
          type: "text",
          content: "The weighted average of individual expected returns.\n\n$$E(R_p) = w_1 E(R_1) + w_2 E(R_2) + ... + w_n E(R_n)$$"
        },
        {
          title: "Two-Asset Portfolio Example",
          type: "example",
          content: "📊 **Calculating Portfolio Expected Return**\n\n| Asset | Weight | Expected Return |\n|-------|--------|-----------------|\n| Stocks | 60% | 10% |\n| Bonds | 40% | 5% |\n\n$$E(R_p) = 0.60(10\\%) + 0.40(5\\%) = 8\\%$$"
        },
        {
          title: "Portfolio Risk (Standard Deviation)",
          type: "text",
          content: "### Two-Asset Formula\n\n$$\\sigma_p = \\sqrt{w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2\\sigma_1\\sigma_2\\rho_{1,2}}$$\n\nWhere:\n- $w$ = weight\n- $\\sigma$ = standard deviation\n- $\\rho$ = correlation coefficient"
        },
        {
          title: "Portfolio Risk Depends On",
          type: "callout",
          calloutType: "important",
          content: "🧠 Portfolio risk depends on:\n1. Individual asset risks (σ)\n2. Weights (w)\n3. **Correlation (ρ)** between assets"
        },
        {
          title: "Correlation Coefficient (ρ)",
          type: "text",
          content: "### Range and Interpretation"
        },
        {
          title: "Correlation Values",
          type: "table",
          headers: ["ρ Value", "Relationship"],
          rows: [
            ["+1.0", "Perfect positive (move together)"],
            ["0", "No relationship"],
            ["-1.0", "Perfect negative (move opposite)"]
          ]
        },
        {
          title: "Diversification Benefit by Correlation",
          type: "table",
          headers: ["Correlation", "Diversification Benefit"],
          rows: [
            ["ρ = +1", "None (just weighted average risk)"],
            ["ρ < +1", "Some risk reduction"],
            ["ρ = 0", "Good risk reduction"],
            ["ρ < 0", "Maximum risk reduction"]
          ]
        },
        {
          title: "Correlation Impact Example",
          type: "example",
          content: "📊 **Portfolio Risk at Different Correlations**\n\n| Given | Value |\n|-------|-------|\n| Stock σ | 20% |\n| Bond σ | 8% |\n| Stock weight | 60% |\n| Bond weight | 40% |\n\n**If ρ = +1.0 (Perfect Positive)**\n$$\\sigma_p = \\sqrt{0.36(0.04) + 0.16(0.0064) + 2(0.60)(0.40)(0.20)(0.08)(1.0)}$$\n$$\\sigma_p = \\sqrt{0.0144 + 0.001024 + 0.00768} = \\sqrt{0.023104} = 15.2\\%$$\n\n**If ρ = 0 (No Correlation)**\n$$\\sigma_p = \\sqrt{0.0144 + 0.001024 + 0} = \\sqrt{0.015424} = 12.4\\%$$\n\n**If ρ = -1.0 (Perfect Negative)**\n$$\\sigma_p = \\sqrt{0.0144 + 0.001024 - 0.00768} = \\sqrt{0.007744} = 8.8\\%$$\n\n**Lower correlation → Lower portfolio risk!**"
        },
        {
          title: "Memory Aid",
          type: "callout",
          calloutType: "memory-aid",
          content: "🧠 **MPT = Mix Properly Together** (for diversification)\n\n**Correlation +1 = Copied movement; -1 = Contrary movement**"
        },
        {
          title: "The Efficient Frontier",
          type: "text",
          content: "### Definition\n\nThe set of portfolios that offer the **highest expected return for each level of risk**."
        },
        {
          title: "Efficient Frontier Characteristics",
          type: "table",
          headers: ["Position", "Description"],
          rows: [
            ["On frontier", "Optimal—cannot get more return without more risk"],
            ["Below frontier", "Inefficient—can improve"],
            ["Above frontier", "Impossible"]
          ]
        },
        {
          title: "The Curve",
          type: "text",
          content: "Moving along the efficient frontier:\n- Left (lower risk, lower return)\n- Right (higher risk, higher return)"
        },
        {
          title: "Optimal Portfolio Selection",
          type: "text",
          content: "### Combining with Risk-Free Asset\n\nWhen you add a risk-free asset, the efficient frontier becomes a straight line called the **Capital Market Line (CML)**.\n\n### Tangent Portfolio\n\nThe point where CML touches the efficient frontier:\n- Called the **market portfolio**\n- Contains all risky assets in market-value weights\n- Maximum Sharpe ratio"
        },
        {
          title: "Assumptions of MPT",
          type: "text",
          content: "### The Model Assumes\n\n1. Investors are rational and risk-averse\n2. Returns are normally distributed\n3. Investors choose portfolios based on mean and variance only\n4. Transaction costs and taxes are zero\n5. All investors have same time horizon\n6. Investors have homogeneous expectations"
        },
        {
          title: "Exam Trap: MPT Limitations",
          type: "warning",
          content: "⚠️ **Limitations of MPT**:\n- Returns aren't always normally distributed (fat tails)\n- Correlations change during crises (tend toward +1)\n- Historical data may not predict future\n- Ignores behavioral biases"
        },
        {
          title: "Practical Applications",
          type: "text",
          content: "### Asset Allocation\n\n- Mix asset classes with low correlations\n- International diversification\n- Alternative investments (real estate, commodities)\n\n### Rebalancing\n\n- Maintain target weights\n- Buy low, sell high automatically\n- Control portfolio drift"
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**Diversification** reduces risk when correlation < +1",
            "**Portfolio return** = weighted average of asset returns",
            "**Portfolio risk** depends on weights, individual risks, AND correlations",
            "**Lower correlation** = greater diversification benefit",
            "**Efficient frontier**: Maximum return for given risk level"
          ]
        },
        {
          title: "Key Formulas",
          type: "text",
          content: "- **Portfolio Return**: E(Rp) = w₁E(R₁) + w₂E(R₂)\n- **Portfolio Risk**: σp = √[w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ₁,₂]\n- **Correlation Range**: -1 to +1"
        }
      ]
    }
  },

  {
    id: "CFP-INV-L003",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Capital Asset Pricing Model (CAPM)",
    description: "Calculate expected return using CAPM, interpret beta and its implications, distinguish systematic from total risk, and apply the Security Market Line concept.",
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      "CAPM formula",
      "Beta interpretation",
      "Security Market Line",
      "Alpha calculation",
      "Systematic vs total risk"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "🧠 The **CAPM** determines the expected return of an asset based on its systematic risk (beta), not total risk."
        },
        {
          title: "The CAPM Formula",
          type: "text",
          content: "$$E(R_i) = R_f + \\beta_i [E(R_m) - R_f]$$\n\nWhere:\n- $E(R_i)$ = Expected return of the investment\n- $R_f$ = Risk-free rate\n- $\\beta_i$ = Beta of the investment\n- $E(R_m)$ = Expected return of the market\n- $[E(R_m) - R_f]$ = Market risk premium"
        },
        {
          title: "Understanding Beta (β)",
          type: "text",
          content: "### Definition\n\nBeta measures sensitivity to market movements—**systematic risk**.\n\n$$\\beta = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}$$"
        },
        {
          title: "Beta Interpretation",
          type: "table",
          headers: ["Beta", "Meaning", "Example"],
          rows: [
            ["β = 1.0", "Moves with market", "Index fund"],
            ["β > 1.0", "More volatile than market", "Tech stocks"],
            ["β < 1.0", "Less volatile than market", "Utilities"],
            ["β = 0", "No market sensitivity", "T-Bills"],
            ["β < 0", "Moves opposite to market", "Gold (sometimes)"]
          ]
        },
        {
          title: "Beta Impact Example",
          type: "example",
          content: "📊 **How Beta Affects Returns**\n\n| If Market Returns... | Stock with β = 1.5 | Stock with β = 0.6 |\n|---------------------|-------------------|-------------------|\n| +10% | +15% | +6% |\n| -10% | -15% | -6% |\n| 0% | 0% | 0% |"
        },
        {
          title: "Portfolio Beta",
          type: "text",
          content: "$$\\beta_p = w_1\\beta_1 + w_2\\beta_2 + ... + w_n\\beta_n$$\n\nWeighted average of individual betas."
        },
        {
          title: "CAPM Calculation Example",
          type: "example",
          content: "📊 **Applying CAPM**\n\n| Given | Value |\n|-------|-------|\n| Risk-free rate | 3% |\n| Market return | 10% |\n| Stock beta | 1.3 |\n\n$$E(R) = 3\\% + 1.3(10\\% - 3\\%)$$\n$$E(R) = 3\\% + 1.3(7\\%)$$\n$$E(R) = 3\\% + 9.1\\% = 12.1\\%$$"
        },
        {
          title: "The Security Market Line (SML)",
          type: "text",
          content: "### Definition\n\nA graph of CAPM showing the linear relationship between beta and expected return."
        },
        {
          title: "SML Characteristics",
          type: "table",
          headers: ["Point", "Location"],
          rows: [
            ["Y-intercept", "Risk-free rate"],
            ["Slope", "Market risk premium"],
            ["Market portfolio", "β = 1, return = E(Rm)"]
          ]
        },
        {
          title: "Using SML for Valuation",
          type: "table",
          headers: ["Position", "Meaning", "Action"],
          rows: [
            ["**Above SML**", "Undervalued (high return for risk)", "Buy"],
            ["**On SML**", "Fairly valued", "Hold"],
            ["**Below SML**", "Overvalued (low return for risk)", "Sell/Avoid"]
          ]
        },
        {
          title: "Alpha (α)",
          type: "text",
          content: "### Definition\n\nThe excess return above what CAPM predicts.\n\n$$\\alpha = \\text{Actual Return} - \\text{Expected Return (from CAPM)}$$"
        },
        {
          title: "Alpha Interpretation",
          type: "table",
          headers: ["Alpha", "Meaning"],
          rows: [
            ["α > 0", "Positive alpha—outperformed"],
            ["α = 0", "Performed as expected"],
            ["α < 0", "Negative alpha—underperformed"]
          ]
        },
        {
          title: "Alpha Example",
          type: "example",
          content: "📊 **Calculating Alpha**\n\nStock returned 14%, CAPM predicted 12.1%:\n$$\\alpha = 14\\% - 12.1\\% = +1.9\\%$$\n\nPositive alpha indicates good stock selection or timing."
        },
        {
          title: "Memory Aid",
          type: "callout",
          calloutType: "memory-aid",
          content: "🧠 **CAPM = Consider All Parts of the Market**\n\n**Beta = Bounce with the market** (1=same, >1=more, <1=less)"
        },
        {
          title: "Total Risk vs. Systematic Risk",
          type: "table",
          headers: ["Risk Type", "Measure", "Relevant For"],
          rows: [
            ["**Total risk**", "Standard deviation (σ)", "Undiversified investor"],
            ["**Systematic risk**", "Beta (β)", "Diversified investor"]
          ]
        },
        {
          title: "CAPM Key Insight",
          type: "callout",
          calloutType: "important",
          content: "🧠 The market only rewards **systematic risk**:\n- Unsystematic risk can be diversified away (free)\n- Only systematic risk earns risk premium"
        },
        {
          title: "CAPM Assumptions",
          type: "text",
          content: "1. Investors are rational and risk-averse\n2. All investors have same time horizon\n3. Can borrow/lend at risk-free rate\n4. No transaction costs or taxes\n5. All information is available to everyone\n6. Assets are infinitely divisible"
        },
        {
          title: "Exam Trap: CAPM Limitations",
          type: "warning",
          content: "⚠️ **CAPM Limitations**:\n- Beta is based on historical data\n- Risk-free rate assumption is imperfect\n- Market portfolio is theoretical (cannot truly own all assets)\n- Single-factor model may be too simple"
        },
        {
          title: "Applications in Financial Planning",
          type: "text",
          content: "### Portfolio Construction\n- Use beta to target desired market sensitivity\n- Combine high/low beta for desired risk level\n\n### Performance Evaluation\n- Compare returns to CAPM expectations\n- Identify managers with positive alpha\n\n### Asset Allocation\n- Adjust beta through allocation changes\n- Use leverage to increase beta if needed"
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**CAPM**: E(R) = Rf + β(Rm - Rf)",
            "**Beta** measures systematic risk (sensitivity to market)",
            "**SML** graphs the risk-return relationship; above SML = undervalued",
            "**Alpha** = actual return minus CAPM-expected return",
            "**Only systematic risk** is rewarded—diversify away the rest"
          ]
        },
        {
          title: "Key Formulas",
          type: "text",
          content: "- **CAPM**: E(Ri) = Rf + βi(Rm - Rf)\n- **Portfolio β**: w₁β₁ + w₂β₂ + ... + wₙβₙ\n- **Alpha**: Actual Return - Expected Return\n- **Market Risk Premium**: Rm - Rf"
        }
      ]
    }
  },

  {
    id: "CFP-INV-L004",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Market Efficiency and Behavioral Finance",
    description: "Explain the three forms of market efficiency, identify investment strategies implied by each form, recognize common behavioral biases, and apply behavioral insights to financial planning.",
    order: 4,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      "Efficient Market Hypothesis",
      "Three forms of market efficiency",
      "Market anomalies",
      "Cognitive biases",
      "Emotional biases",
      "Behavioral finance applications"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "🧠 The **Efficient Market Hypothesis (EMH)** suggests prices reflect available information. **Behavioral finance** challenges this by exploring psychological biases."
        },
        {
          title: "Efficient Market Hypothesis (EMH)",
          type: "text",
          content: "### Core Premise\n\nStock prices fully reflect all available information, making it impossible to consistently \"beat the market.\""
        },
        {
          title: "Three Forms of EMH",
          type: "table",
          headers: ["Form", "Information Reflected", "Implication"],
          rows: [
            ["**Weak**", "Past prices and trading volume", "Technical analysis doesn't work"],
            ["**Semi-strong**", "All public information", "Fundamental analysis doesn't work"],
            ["**Strong**", "All information (public + private)", "Even insider info doesn't help"]
          ]
        },
        {
          title: "Memory Aid: EMH Levels",
          type: "callout",
          calloutType: "memory-aid",
          content: "🧠 **WeSH = Weak, Semi-strong, Strong** = all Hearing everything progressively"
        },
        {
          title: "Weak-Form Efficient",
          type: "table",
          headers: ["Analysis Type", "Usefulness"],
          rows: [
            ["Technical analysis", "**Useless**"],
            ["Fundamental analysis", "May work"],
            ["Insider information", "May work"]
          ]
        },
        {
          title: "Semi-Strong Efficient",
          type: "table",
          headers: ["Analysis Type", "Usefulness"],
          rows: [
            ["Technical analysis", "Useless"],
            ["Fundamental analysis", "**Useless**"],
            ["Insider information", "May work"]
          ]
        },
        {
          title: "Strong-Form Efficient",
          type: "table",
          headers: ["Analysis Type", "Usefulness"],
          rows: [
            ["Technical analysis", "Useless"],
            ["Fundamental analysis", "Useless"],
            ["Insider information", "**Useless**"]
          ]
        },
        {
          title: "Evidence for EMH",
          type: "text",
          content: "### Support for EMH\n\n- Most active managers underperform indexes\n- Information is incorporated quickly\n- Past returns don't predict future returns reliably"
        },
        {
          title: "Market Anomalies",
          type: "table",
          headers: ["Anomaly", "Description"],
          rows: [
            ["**January effect**", "Small stocks outperform in January"],
            ["**Monday effect**", "Lower returns on Mondays"],
            ["**Small-firm effect**", "Small caps outperform over time"],
            ["**Value effect**", "Value stocks outperform growth"],
            ["**Momentum**", "Recent winners continue winning short-term"]
          ]
        },
        {
          title: "Implications for Financial Planning",
          type: "text",
          content: "### If You Believe in EMH\n\n- Use **index funds** (low-cost, market exposure)\n- Focus on **asset allocation** not stock picking\n- Minimize **costs and taxes**\n- Accept market returns\n\n### If You Believe in Inefficiency\n\n- Active management may add value\n- Security selection matters\n- Factor investing (value, momentum) may work\n- Market timing may be possible"
        },
        {
          title: "Behavioral Finance",
          type: "text",
          content: "### Key Premise\n\nInvestors are not always rational—psychological biases affect decisions."
        },
        {
          title: "Categories of Biases",
          type: "table",
          headers: ["Category", "Description"],
          rows: [
            ["**Cognitive**", "Errors in processing information"],
            ["**Emotional**", "Feelings driving decisions"]
          ]
        },
        {
          title: "Major Cognitive Biases",
          type: "text",
          content: "- **Anchoring**: Relying too heavily on first piece of information. Example: 'I bought at $50, so I won't sell until it gets back to $50.'\n- **Confirmation Bias**: Seeking information that confirms existing beliefs. Example: Only reading positive news about stocks you own.\n- **Mental Accounting**: Treating money differently based on its source. Example: Willing to gamble with 'house money' (gains) but not savings.\n- **Overconfidence**: Overestimating one's own abilities. Example: Believing you can consistently beat the market.\n- **Availability Bias**: Overweighting easily recalled information (recent or dramatic). Example: Fearing stocks after a crash, even if historically optimal.\n- **Recency Bias**: Overweighting recent experience. Example: Expecting recent trends to continue indefinitely."
        },
        {
          title: "Memory Aid: Cognitive Biases",
          type: "callout",
          calloutType: "memory-aid",
          content: "🧠 **ALARM** biases: **A**nchoring, **L**oss aversion, **A**vailability, **R**ecency, **M**ental accounting"
        },
        {
          title: "Major Emotional Biases",
          type: "text",
          content: "- **Loss Aversion**: Losses hurt more than equivalent gains feel good. Research shows losses hurt about **2x** as much as gains please. Impact: Hold losers too long, sell winners too soon.\n- **Endowment Effect**: Overvaluing things you already own. Example: Inherited stock feels more valuable than it is.\n- **Herding**: Following the crowd. Example: Buying at market tops, selling at bottoms.\n- **Regret Aversion**: Fear of making decisions that might be wrong. Example: Paralysis in making investment changes."
        },
        {
          title: "Applying Behavioral Insights",
          type: "table",
          headers: ["Bias", "Planning Strategy"],
          rows: [
            ["**Loss aversion**", "Frame in terms of goals, not losses"],
            ["**Overconfidence**", "Show historical data, diversify"],
            ["**Mental accounting**", "View wealth holistically"],
            ["**Herding**", "Systematic rebalancing"],
            ["**Anchoring**", "Focus on fundamentals, not purchase price"]
          ]
        },
        {
          title: "Check-In Questions for Clients",
          type: "callout",
          calloutType: "tip",
          content: "💡 **Helpful questions to ask clients**:\n- \"Are you holding this because you believe in it—or because you bought it?\"\n- \"Would you buy this today at current price?\""
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**EMH forms**: Weak, Semi-strong, Strong—progressively more information reflected",
            "**Weak form**: Technical analysis fails; **Semi-strong**: Fundamental analysis fails",
            "**Anomalies** (January effect, small-firm) challenge EMH",
            "**Behavioral biases**: Loss aversion, overconfidence, herding, anchoring",
            "**Planners** should recognize biases and design guardrails"
          ]
        },
        {
          title: "Key Concepts",
          type: "text",
          content: "- **EMH**: Efficient Market Hypothesis—no formulas, conceptual understanding of market theory\n- **Behavioral Finance**: Study of psychological biases affecting investment decisions"
        }
      ]
    }
  }
];

export default CFP_INV1_LESSONS;
