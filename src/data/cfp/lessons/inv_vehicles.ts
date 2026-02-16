/**
 * CFP Domain 4: Investment Planning
 * Area INV-2: Investment Vehicles
 *
 * These lessons cover bonds, stocks, mutual funds, ETFs,
 * and alternative investments.
 */

import type { Lesson } from '../../../types';

export const CFP_INV2_LESSONS: Lesson[] = [
  {
    id: 'CFP-INV-L005',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    title: 'Fixed Income Securities',
    order: 5,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      'Bond pricing and yield calculations',
      'Price-yield inverse relationship',
      'Bond types and characteristics',
      'Interest rate risk and duration'
    ],
    description:
      'Calculate bond pricing, yield to maturity, and current yield. Explain the inverse relationship between prices and yields. Compare different types of bonds and their characteristics. Assess interest rate risk using duration.',
    content: {
      sections: [
        {
          type: 'callout',
          title: '🧠 Why This Matters',
          content:
            'Understanding bonds is essential for building diversified portfolios and managing interest rate risk.'
        },
        {
          type: 'text',
          title: 'Bond Fundamentals',
          content:
            'Bonds are debt instruments that pay periodic interest (coupons) and return principal at maturity. Understanding these key terms is critical for the CFP exam.'
        },
        {
          type: 'table',
          title: 'Key Terms',
          headers: ['Term', 'Definition'],
          rows: [
            ['**Par (Face) Value**', 'Amount paid at maturity (typically $1,000)'],
            ['**Coupon Rate**', 'Annual interest as % of par'],
            ['**Coupon Payment**', 'Dollar amount paid periodically'],
            ['**Maturity**', 'Date when principal is returned'],
            ['**Yield to Maturity (YTM)**', 'Total return if held to maturity']
          ]
        },
        {
          type: 'text',
          title: 'Bond Pricing',
          content:
            '**When interest rates rise, bond prices fall (and vice versa).** This inverse relationship is one of the most important concepts in fixed income investing.'
        },
        {
          type: 'table',
          title: 'The Inverse Relationship',
          headers: ['Market Rate vs. Coupon', 'Bond Price', 'Name'],
          rows: [
            ['Market rate > Coupon', 'Below par', '**Discount**'],
            ['Market rate = Coupon', 'At par', '**Par**'],
            ['Market rate < Coupon', 'Above par', '**Premium**']
          ]
        },
        {
          type: 'text',
          title: 'Bond Price Formula',
          content:
            '$$\\text{Price} = \\sum_{t=1}^{n} \\frac{C}{(1+r)^t} + \\frac{FV}{(1+r)^n}$$\n\nWhere:\n- C = Coupon payment\n- r = Market interest rate (per period)\n- n = Number of periods\n- FV = Face value'
        },
        {
          type: 'text',
          title: 'Yield Measures',
          content:
            '**Current Yield** — simple income return:\n\n$$\\text{Current Yield} = \\frac{\\text{Annual Coupon}}{\\text{Current Price}}$$\n\n**Example**: $60 coupon / $950 price = 6.32%'
        },
        {
          type: 'text',
          title: 'Yield to Maturity (YTM)',
          content:
            'Total return if held to maturity, including:\n- Coupon payments\n- Reinvestment of coupons\n- Gain/loss from price vs. par'
        },
        {
          type: 'warning',
          title: '⚠️ Exam Trap: YTM vs YTC',
          content:
            '**Yield to Call (YTC)** — if a bond is callable, calculate yield to first call date. For premium bonds, **use the lower of YTM or YTC** as this represents the worst-case yield for the investor.'
        },
        {
          type: 'example',
          title: '📊 Example: Yield Calculations',
          content:
            '| Bond Details | Value |\n|--------------|-------|\n| Par value | $1,000 |\n| Coupon rate | 5% |\n| Current price | $920 |\n| Years to maturity | 10 |\n\n**Current Yield**: $50 / $920 = **5.43%**\n\n**YTM**: Approximately **5.9%** (includes $80 gain over 10 years)'
        },
        {
          type: 'text',
          title: 'Types of Bonds by Issuer',
          content:
            'Different bond issuers have different risk profiles and tax treatments.'
        },
        {
          type: 'table',
          title: 'Bond Types by Issuer',
          headers: ['Type', 'Characteristics', 'Tax Treatment'],
          rows: [
            ['**Treasury**', 'Backed by US government; safest', 'Exempt from state/local tax'],
            ['**Agency**', 'GSEs (Fannie, Freddie)', 'Usually taxable'],
            ['**Municipal**', 'State/local governments', 'Federal tax-exempt*'],
            ['**Corporate**', 'Companies', 'Fully taxable']
          ]
        },
        {
          type: 'callout',
          title: '🧠 Memory Aid',
          content: '*Some munis are subject to AMT (Alternative Minimum Tax).'
        },
        {
          type: 'table',
          title: 'Treasury Securities',
          headers: ['Security', 'Maturity', 'Features'],
          rows: [
            ['T-Bills', '≤ 1 year', 'Discount securities, no coupon'],
            ['T-Notes', '2-10 years', 'Semi-annual coupon'],
            ['T-Bonds', '10-30 years', 'Semi-annual coupon'],
            ['TIPS', 'Various', 'Inflation-adjusted principal'],
            ['I-Bonds', '30 years', 'Inflation + fixed rate']
          ]
        },
        {
          type: 'text',
          title: 'Municipal Bonds: Tax-Equivalent Yield',
          content:
            'For comparing munis to taxable bonds:\n\n$$\\text{TEY} = \\frac{\\text{Muni Yield}}{1 - \\text{Tax Rate}}$$'
        },
        {
          type: 'example',
          title: '📊 Tax-Equivalent Yield Example',
          content:
            'Muni yields 3%, investor in 32% bracket:\n\n$$\\text{TEY} = \\frac{3\\%}{1 - 0.32} = \\frac{3\\%}{0.68} = 4.41\\%$$\n\nNeed taxable bond to yield >4.41% to beat the muni.'
        },
        {
          type: 'table',
          title: 'Corporate Bond Credit Ratings',
          headers: ['Rating (S&P/Moody\'s)', 'Category', 'Risk'],
          rows: [
            ['AAA/Aaa to BBB/Baa', 'Investment grade', 'Lower risk'],
            ['BB/Ba and below', 'High yield ("junk")', 'Higher risk/return']
          ]
        },
        {
          type: 'table',
          title: 'Corporate Bond Types',
          headers: ['Type', 'Feature'],
          rows: [
            ['**Secured**', 'Backed by specific assets'],
            ['**Unsecured (Debenture)**', 'Backed by creditworthiness'],
            ['**Convertible**', 'Can convert to stock'],
            ['**Callable**', 'Issuer can redeem early'],
            ['**Zero-coupon**', 'No periodic payments; deep discount']
          ]
        },
        {
          type: 'text',
          title: 'Interest Rate Risk: Duration',
          content:
            '**What Is Duration?** Weighted average time to receive cash flows—measures **sensitivity to rate changes**.\n\n$$\\text{Price Change} \\approx -\\text{Duration} \\times \\Delta\\text{Interest Rate}$$'
        },
        {
          type: 'table',
          title: 'Duration Rules',
          headers: ['Factor', 'Duration Impact'],
          rows: [
            ['Longer maturity', 'Higher duration'],
            ['Lower coupon', 'Higher duration'],
            ['Lower yield', 'Higher duration']
          ]
        },
        {
          type: 'example',
          title: '📊 Duration Example',
          content:
            'Bond has duration of 7 years. Rates rise 1%:\n\n$$\\text{Price Change} \\approx -7 \\times 1\\% = -7\\%$$'
        },
        {
          type: 'table',
          title: 'Zero-Coupon Bond Characteristics',
          headers: ['Feature', 'Description'],
          rows: [
            ['Coupon', 'None'],
            ['Purchase price', 'Deep discount'],
            ['Return', 'All from price appreciation'],
            ['Duration', 'Equals maturity (no interim payments)'],
            ['Taxation', 'Phantom income (OID taxed annually)']
          ]
        },
        {
          type: 'text',
          title: 'Zero-Coupon Bond Use Cases',
          content:
            '- Goal funding (known future date)\n- IRAs (avoid phantom income issue)\n- Maximum interest rate sensitivity'
        },
        {
          type: 'callout',
          title: '🧠 Memory Aids',
          content:
            '**Rates UP, Prices DOWN** (like a seesaw)\n\n**Duration = Danger to rates** (higher duration = more danger)'
        },
        {
          type: 'summary',
          title: 'Key Takeaways',
          content: [
            'Bond prices and interest rates move inversely',
            'Premium: coupon > market; Discount: coupon < market',
            'Tax-equivalent yield = Muni yield / (1 - tax rate)',
            'Duration measures rate sensitivity; price change ≈ -Duration × Δrate',
            'Zero-coupon duration = maturity; phantom income taxed annually'
          ]
        }
      ]
    },
  },

  {
    id: 'CFP-INV-L006',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    title: 'Equity Securities',
    order: 6,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Common vs preferred stock',
      'Dividend yield and valuation',
      'Growth vs value investing',
      'Fundamental equity metrics'
    ],
    description:
      'Distinguish between common and preferred stock. Calculate dividend yield and dividend growth valuation. Compare growth vs. value investing styles. Evaluate equity using fundamental metrics.',
    content: {
      sections: [
        {
          type: 'callout',
          title: '🧠 Why This Matters',
          content:
            'Equity represents ownership in a company, offering potential for growth and income through dividends.'
        },
        {
          type: 'text',
          title: 'Common Stock',
          content:
            'Common stockholders are the true owners of a corporation with voting rights but are last in line during bankruptcy.'
        },
        {
          type: 'table',
          title: 'Common Stock Ownership Rights',
          headers: ['Right', 'Description'],
          rows: [
            ['**Voting**', 'Elect board, approve major decisions'],
            ['**Dividends**', 'Share of profits (not guaranteed)'],
            ['**Residual claim**', 'Last in line in bankruptcy'],
            ['**Limited liability**', 'Can only lose investment amount'],
            ['**Preemptive rights**', 'Right to maintain ownership %']
          ]
        },
        {
          type: 'text',
          title: 'Returns Come From',
          content:
            '1. **Price appreciation** (capital gains)\n2. **Dividends** (income)'
        },
        {
          type: 'text',
          title: 'Preferred Stock',
          content:
            'Preferred stock is a hybrid security with characteristics of both bonds and stocks.'
        },
        {
          type: 'table',
          title: 'Preferred Stock Hybrid Characteristics',
          headers: ['Feature', 'More Like'],
          rows: [
            ['Fixed dividend', 'Bonds'],
            ['Price sensitivity to rates', 'Bonds'],
            ['No maturity date', 'Stocks'],
            ['Residual claim (after bonds)', 'Stocks']
          ]
        },
        {
          type: 'table',
          title: 'Types of Preferred Stock',
          headers: ['Type', 'Feature'],
          rows: [
            ['**Cumulative**', 'Missed dividends must be paid before common'],
            ['**Non-cumulative**', 'Missed dividends are lost'],
            ['**Convertible**', 'Can convert to common stock'],
            ['**Callable**', 'Issuer can redeem'],
            ['**Participating**', 'Shares in extra profits']
          ]
        },
        {
          type: 'text',
          title: 'Valuation: Dividend Discount Model',
          content:
            '**Constant Growth Model (Gordon Model)**\n\n$$P_0 = \\frac{D_1}{r - g}$$\n\nWhere:\n- $P_0$ = Current stock price\n- $D_1$ = Next year\'s dividend\n- $r$ = Required return\n- $g$ = Dividend growth rate\n\n**Requirement**: r > g'
        },
        {
          type: 'example',
          title: '📊 Gordon Model Example',
          content:
            '| Given | Value |\n|-------|-------|\n| Current dividend (D₀) | $2.00 |\n| Growth rate (g) | 5% |\n| Required return (r) | 10% |\n\n$$D_1 = \\$2.00 \\times 1.05 = \\$2.10$$\n$$P_0 = \\frac{\\$2.10}{0.10 - 0.05} = \\$42.00$$'
        },
        {
          type: 'text',
          title: 'Dividend Yield',
          content:
            'Simple income return from dividends:\n\n$$\\text{Dividend Yield} = \\frac{\\text{Annual Dividend}}{\\text{Stock Price}}$$\n\n**Example**: $3 annual dividend / $60 stock price = **5%**'
        },
        {
          type: 'text',
          title: 'Growth vs. Value Investing',
          content:
            'Understanding the difference between growth and value stocks is essential for portfolio construction.'
        },
        {
          type: 'table',
          title: 'Value Stocks',
          headers: ['Characteristic', 'Description'],
          rows: [
            ['**P/E ratio**', 'Low'],
            ['**P/B ratio**', 'Low'],
            ['**Dividend yield**', 'Higher'],
            ['**Growth**', 'Slower'],
            ['**Perception**', '"Cheap" or out of favor']
          ]
        },
        {
          type: 'table',
          title: 'Growth Stocks',
          headers: ['Characteristic', 'Description'],
          rows: [
            ['**P/E ratio**', 'High'],
            ['**P/B ratio**', 'High'],
            ['**Dividend yield**', 'Lower or none'],
            ['**Growth**', 'Faster earnings growth'],
            ['**Perception**', 'Premium for growth potential']
          ]
        },
        {
          type: 'text',
          title: 'Historical Performance',
          content:
            '- Value tends to outperform over very long periods\n- Growth tends to outperform during bull markets\n- Neither consistently wins—diversify across both'
        },
        {
          type: 'text',
          title: 'Key Valuation Metrics',
          content:
            '**Price-to-Earnings (P/E) Ratio**\n\n$$\\text{P/E} = \\frac{\\text{Price per Share}}{\\text{Earnings per Share}}$$'
        },
        {
          type: 'table',
          title: 'P/E Interpretation',
          headers: ['P/E', 'Interpretation'],
          rows: [
            ['High', 'Market expects growth (or overvalued)'],
            ['Low', 'Out of favor (or undervalued)']
          ]
        },
        {
          type: 'text',
          title: 'Price-to-Book (P/B) Ratio',
          content:
            '$$\\text{P/B} = \\frac{\\text{Price per Share}}{\\text{Book Value per Share}}$$'
        },
        {
          type: 'table',
          title: 'P/B Interpretation',
          headers: ['P/B', 'Interpretation'],
          rows: [
            ['< 1', 'Trading below asset value'],
            ['> 1', 'Market values growth/intangibles']
          ]
        },
        {
          type: 'text',
          title: 'PEG Ratio',
          content:
            '$$\\text{PEG} = \\frac{\\text{P/E}}{\\text{Earnings Growth Rate}}$$'
        },
        {
          type: 'table',
          title: 'PEG Interpretation',
          headers: ['PEG', 'Interpretation'],
          rows: [
            ['< 1', 'May be undervalued'],
            ['> 1', 'May be overvalued']
          ]
        },
        {
          type: 'table',
          title: 'Market Capitalization Categories',
          headers: ['Category', 'Market Cap'],
          rows: [
            ['**Large-cap**', '> $10 billion'],
            ['**Mid-cap**', '$2-10 billion'],
            ['**Small-cap**', '$300M-$2 billion'],
            ['**Micro-cap**', '< $300 million']
          ]
        },
        {
          type: 'text',
          title: 'Risk/Return by Size',
          content:
            '- **Small-cap**: Higher historical returns, higher volatility\n- **Large-cap**: Lower returns, more stability'
        },
        {
          type: 'text',
          title: 'Stock Splits and Dividends',
          content: 'Stock splits and dividends affect share count but not total value.'
        },
        {
          type: 'table',
          title: 'Stock Split Effects',
          headers: ['Type', 'Effect'],
          rows: [
            ['2-for-1', 'Double shares, halve price'],
            ['3-for-1', 'Triple shares, third price']
          ]
        },
        {
          type: 'warning',
          title: '⚠️ Key Point',
          content:
            '**Total value unchanged** after a split—just more shares at lower price.'
        },
        {
          type: 'table',
          title: 'Reverse Split',
          headers: ['Type', 'Effect'],
          rows: [['1-for-10', 'Tenth the shares, 10x price']]
        },
        {
          type: 'text',
          title: 'Reverse Splits',
          content:
            'Often used by troubled companies to meet exchange minimums.'
        },
        {
          type: 'text',
          title: 'Stock Dividends',
          content:
            'Distribution of additional shares instead of cash.\n\n- 10% stock dividend = 10 shares become 11\n- Similar to small split in effect'
        },
        {
          type: 'callout',
          title: '🧠 Memory Aids',
          content:
            '**Gordon Growth**: Dividend / (Required - Growth)\n\n**Value = Victory for the patient; Growth = Glamour** (and higher P/E)'
        },
        {
          type: 'summary',
          title: 'Key Takeaways',
          content: [
            'Common stock: Voting, residual claim, variable dividends',
            'Preferred: Fixed dividends, priority over common, rate-sensitive',
            'Gordon Model: P₀ = D₁ / (r - g); requires r > g',
            'Value = low P/E, high yield; Growth = high P/E, reinvests earnings',
            'Small-cap = higher risk/return; large-cap = more stability'
          ]
        }
      ]
    },
  },

  {
    id: 'CFP-INV-L007',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    title: 'Investment Companies: Mutual Funds and ETFs',
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Mutual fund structures and share classes',
      'Open-end vs closed-end funds vs ETFs',
      'Expense ratios and turnover',
      'Tax-efficiency in fund selection'
    ],
    description:
      'Compare mutual fund structures and share classes. Distinguish open-end funds from closed-end funds and ETFs. Evaluate funds using expense ratios and turnover. Apply tax-efficiency considerations to fund selection.',
    content: {
      sections: [
        {
          type: 'callout',
          title: '🧠 Why This Matters',
          content:
            'Investment companies pool investor money for professional management and diversification.'
        },
        {
          type: 'text',
          title: 'Types of Investment Companies',
          content:
            'Understanding the different structures is key to recommending appropriate investment vehicles.'
        },
        {
          type: 'table',
          title: 'Open-End Funds (Mutual Funds)',
          headers: ['Feature', 'Description'],
          rows: [
            ['Pricing', 'NAV calculated daily'],
            ['Shares', 'Created/redeemed at NAV'],
            ['Trading', 'Through fund company'],
            ['Liquidity', 'Guaranteed at NAV']
          ]
        },
        {
          type: 'table',
          title: 'Closed-End Funds',
          headers: ['Feature', 'Description'],
          rows: [
            ['Pricing', 'Market price (may differ from NAV)'],
            ['Shares', 'Fixed number; trade on exchange'],
            ['Trading', 'Like stocks (throughout day)'],
            ['Premium/Discount', 'Can trade above or below NAV']
          ]
        },
        {
          type: 'table',
          title: 'ETFs (Exchange-Traded Funds)',
          headers: ['Feature', 'Description'],
          rows: [
            ['Pricing', 'Intraday market price'],
            ['Shares', 'Trade on exchange'],
            ['Creation/Redemption', 'Authorized participants (in-kind)'],
            ['Tax efficiency', 'Generally more tax-efficient']
          ]
        },
        {
          type: 'text',
          title: 'Net Asset Value (NAV)',
          content:
            '$$\\text{NAV} = \\frac{\\text{Total Assets} - \\text{Liabilities}}{\\text{Shares Outstanding}}$$'
        },
        {
          type: 'table',
          title: 'When NAV Is Calculated',
          headers: ['Fund Type', 'NAV Timing'],
          rows: [
            ['Mutual fund', '4:00 PM ET daily'],
            ['ETF', 'Continuous (trades at market)'],
            ['Closed-end', 'Reference; may not match price']
          ]
        },
        {
          type: 'text',
          title: 'Mutual Fund Share Classes',
          content:
            'Different share classes have different fee structures suited for different investment horizons.'
        },
        {
          type: 'table',
          title: 'Share Class Comparison',
          headers: ['Class', 'Sales Charge', '12b-1 Fee', 'Best For'],
          rows: [
            ['**A shares**', 'Front-end (3-5%)', 'Low (0.25%)', 'Large, long-term investments'],
            ['**B shares**', 'Back-end (CDSC)', 'High (1%)', 'Phased out (now rare)'],
            ['**C shares**', 'Level load (1%)', 'High (1%)', 'Short-term (1-3 years)'],
            ['**Institutional**', 'None', 'None/Low', 'Large institutional investors'],
            ['**No-load**', 'None', 'Max 0.25%', 'Direct investors']
          ]
        },
        {
          type: 'text',
          title: 'Breakpoints (A Shares)',
          content:
            'Volume discounts on front-end loads:\n- Larger purchases = lower sales charge\n- **Rights of accumulation**: Include existing holdings\n- **Letter of intent**: Commit to future purchases'
        },
        {
          type: 'text',
          title: 'Expense Ratio',
          content:
            'Annual operating expenses as % of assets.\n\n$$\\text{Expense Ratio} = \\frac{\\text{Total Annual Expenses}}{\\text{Average Net Assets}}$$'
        },
        {
          type: 'table',
          title: 'Typical Expense Ratios',
          headers: ['Type', 'Typical Expense Ratio'],
          rows: [
            ['Index fund', '0.03-0.20%'],
            ['Active equity', '0.50-1.50%'],
            ['Active bond', '0.30-0.80%']
          ]
        },
        {
          type: 'example',
          title: '📊 Impact of Expenses',
          content:
            '| Initial Investment | Expense Ratio | Value After 30 Years (7% gross) |\n|-------------------|---------------|--------------------------------|\n| $100,000 | 0.10% | $738,000 |\n| $100,000 | 1.00% | $574,000 |\n| **Difference** | | **$164,000** |'
        },
        {
          type: 'text',
          title: 'Portfolio Turnover',
          content:
            'Percentage of holdings traded annually.'
        },
        {
          type: 'table',
          title: 'Turnover Impact',
          headers: ['Turnover', 'Style', 'Tax Impact'],
          rows: [
            ['Low (<20%)', 'Buy and hold', 'More tax-efficient'],
            ['Medium (20-100%)', 'Active', 'Moderate distributions'],
            ['High (>100%)', 'Very active', 'More taxable distributions']
          ]
        },
        {
          type: 'text',
          title: 'ETFs vs. Mutual Funds',
          content:
            '**Similarities:**\n- Professional management\n- Diversification\n- Variety of strategies'
        },
        {
          type: 'table',
          title: 'Key Differences: ETFs vs Mutual Funds',
          headers: ['Feature', 'Mutual Fund', 'ETF'],
          rows: [
            ['**Trading**', 'End of day at NAV', 'Intraday at market price'],
            ['**Minimum investment**', 'Often $1,000+', 'Price of one share'],
            ['**Tax efficiency**', 'Lower (cash redemptions)', 'Higher (in-kind redemptions)'],
            ['**Costs**', 'Expense ratio + loads', 'Expense ratio + commissions'],
            ['**Transparency**', 'Disclose quarterly', 'Most disclose daily']
          ]
        },
        {
          type: 'text',
          title: 'ETF Tax Efficiency',
          content:
            'Why ETFs are more tax-efficient:\n1. **In-kind creation/redemption**: No selling = no capital gains\n2. **Authorized participants** handle exchanges\n3. **Lower turnover** in index-tracking ETFs'
        },
        {
          type: 'text',
          title: 'Types of Funds by Strategy',
          content: 'Funds can be categorized by asset class, style, or objective.'
        },
        {
          type: 'table',
          title: 'Funds by Asset Class',
          headers: ['Type', 'Focus'],
          rows: [
            ['Equity', 'Stocks'],
            ['Fixed income', 'Bonds'],
            ['Money market', 'Short-term instruments'],
            ['Balanced/Hybrid', 'Mix of stocks and bonds']
          ]
        },
        {
          type: 'table',
          title: 'Funds by Style',
          headers: ['Type', 'Description'],
          rows: [
            ['Growth', 'Companies with high growth'],
            ['Value', 'Undervalued companies'],
            ['Blend', 'Mix of growth and value']
          ]
        },
        {
          type: 'table',
          title: 'Funds by Objective',
          headers: ['Type', 'Goal'],
          rows: [
            ['Index', 'Match benchmark'],
            ['Active', 'Beat benchmark'],
            ['Target-date', 'Adjust allocation by date'],
            ['Sector', 'Focus on one industry']
          ]
        },
        {
          type: 'table',
          title: 'Key Fund Evaluation Metrics',
          headers: ['Metric', 'What It Measures'],
          rows: [
            ['**Expense ratio**', 'Annual cost'],
            ['**Turnover**', 'Trading activity'],
            ['**Alpha**', 'Risk-adjusted outperformance'],
            ['**Sharpe ratio**', 'Return per unit of total risk'],
            ['**R-squared**', 'How closely tracks benchmark'],
            ['**Standard deviation**', 'Volatility']
          ]
        },
        {
          type: 'callout',
          title: '🧠 Memory Aids',
          content:
            '**A shares = A lot of money upfront** (front load)\n\n**ETF = Efficient Tax Features**'
        },
        {
          type: 'summary',
          title: 'Key Takeaways',
          content: [
            'Open-end (mutual fund): NAV daily; Closed-end: trades at premium/discount',
            'ETFs: Intraday trading, more tax-efficient (in-kind redemptions)',
            'A shares: Front load, long-term; C shares: Level load, short-term',
            'Expense ratios compound—0.10% vs 1.00% can mean $164K difference over 30 years',
            'Higher turnover = more taxable capital gain distributions'
          ]
        }
      ]
    },
  },

  {
    id: 'CFP-INV-L008',
    courseId: 'cfp',
    section: 'CFP-INV',
    blueprintArea: 'INV-2',
    title: 'Alternative Investments and Derivatives',
    order: 8,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      'Alternative investment characteristics',
      'Options basics: calls, puts, strategies',
      'REITs and tax treatment',
      'Suitability of alternatives'
    ],
    description:
      'Describe characteristics of alternative investments. Explain option basics: calls, puts, and strategies. Evaluate REITs and their tax treatment. Assess suitability of alternatives for client portfolios.',
    content: {
      sections: [
        {
          type: 'callout',
          title: '🧠 Why This Matters',
          content:
            'Alternatives can enhance diversification and returns but require understanding their unique risks.'
        },
        {
          type: 'text',
          title: 'What Are Alternative Investments?',
          content:
            'Alternative investments are non-traditional assets that behave differently from stocks and bonds.'
        },
        {
          type: 'table',
          title: 'Alternative Investment Characteristics',
          headers: ['Feature', 'Description'],
          rows: [
            ['**Liquidity**', 'Often limited'],
            ['**Correlation**', 'Lower to traditional assets'],
            ['**Transparency**', 'Less regulated'],
            ['**Complexity**', 'Often harder to value'],
            ['**Fees**', 'Generally higher']
          ]
        },
        {
          type: 'text',
          title: 'Common Types',
          content:
            '- Real estate (REITs, direct)\n- Commodities\n- Hedge funds\n- Private equity\n- Collectibles\n- Cryptocurrencies'
        },
        {
          type: 'text',
          title: 'Real Estate Investment Trusts (REITs)',
          content:
            'REITs provide a liquid way to invest in real estate with specific tax advantages.'
        },
        {
          type: 'table',
          title: 'REIT Structure Requirements',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['Income distribution', '90%+ of taxable income'],
            ['Asset composition', '75%+ in real estate'],
            ['Income sources', '75%+ from real estate'],
            ['Shares', 'Widely held (100+ shareholders)']
          ]
        },
        {
          type: 'table',
          title: 'Types of REITs',
          headers: ['Type', 'Invests In'],
          rows: [
            ['**Equity REITs**', 'Properties (offices, apartments, retail)'],
            ['**Mortgage REITs**', 'Real estate loans'],
            ['**Hybrid REITs**', 'Both properties and mortgages']
          ]
        },
        {
          type: 'table',
          title: 'REIT Tax Treatment',
          headers: ['Distribution Type', 'Tax to Shareholder'],
          rows: [
            ['Ordinary income', 'Ordinary rates (may get 20% QBI deduction)'],
            ['Capital gains', 'Capital gains rates'],
            ['Return of capital', 'Reduces basis (tax-deferred)']
          ]
        },
        {
          type: 'text',
          title: 'Commodities',
          content: 'Commodities offer inflation protection and low correlation to traditional assets.'
        },
        {
          type: 'table',
          title: 'Commodity Investment Methods',
          headers: ['Method', 'Description'],
          rows: [
            ['**Physical**', 'Actual commodity (gold bars)'],
            ['**Futures**', 'Contracts for future delivery'],
            ['**ETFs**', 'Funds tracking commodity prices'],
            ['**Stocks**', 'Companies in commodity industries']
          ]
        },
        {
          type: 'text',
          title: 'Common Commodities',
          content:
            '- Precious metals (gold, silver)\n- Energy (oil, natural gas)\n- Agriculture (corn, wheat)\n- Industrial metals (copper)'
        },
        {
          type: 'table',
          title: 'Commodity Characteristics',
          headers: ['Feature', 'Commodity'],
          rows: [
            ['Income', 'None (no dividends/interest)'],
            ['Storage costs', 'For physical'],
            ['Inflation hedge', 'Often yes'],
            ['Correlation', 'Low to stocks/bonds']
          ]
        },
        {
          type: 'text',
          title: 'Options Basics',
          content:
            'Options are derivatives that give the holder the right, but not the obligation, to buy or sell at a specified price.'
        },
        {
          type: 'table',
          title: 'Call Options',
          headers: ['Position', 'Outlook', 'Max Gain', 'Max Loss'],
          rows: [
            ['**Buy call**', 'Bullish', 'Unlimited', 'Premium paid'],
            ['**Sell call**', 'Neutral/Bearish', 'Premium received', 'Unlimited']
          ]
        },
        {
          type: 'callout',
          title: '🧠 Memory Aid',
          content: '**Call** = Right to **BUY** at strike price'
        },
        {
          type: 'table',
          title: 'Put Options',
          headers: ['Position', 'Outlook', 'Max Gain', 'Max Loss'],
          rows: [
            ['**Buy put**', 'Bearish', 'Strike - premium', 'Premium paid'],
            ['**Sell put**', 'Bullish', 'Premium received', 'Strike - premium']
          ]
        },
        {
          type: 'callout',
          title: '🧠 Memory Aid',
          content: '**Put** = Right to **SELL** at strike price'
        },
        {
          type: 'text',
          title: 'Option Value Components',
          content:
            '**Intrinsic Value:**\n- Call: Stock Price - Strike (if positive)\n- Put: Strike - Stock Price (if positive)\n\n**Time Value:**\n$$\\text{Time Value} = \\text{Premium} - \\text{Intrinsic Value}$$'
        },
        {
          type: 'table',
          title: 'Option Status',
          headers: ['Status', 'Call', 'Put'],
          rows: [
            ['**In-the-money**', 'Stock > Strike', 'Stock < Strike'],
            ['**At-the-money**', 'Stock = Strike', 'Stock = Strike'],
            ['**Out-of-the-money**', 'Stock < Strike', 'Stock > Strike']
          ]
        },
        {
          type: 'text',
          title: 'Common Option Strategies',
          content: 'These strategies combine stock positions with options for different objectives.'
        },
        {
          type: 'table',
          title: 'Covered Call',
          headers: ['Term', 'Definition'],
          rows: [
            ['Structure', 'Own stock + sell call'],
            ['Benefit', 'Generate income from premium'],
            ['Trade-off', 'Limit upside (stock called away if above strike)'],
            ['Protection', 'Reduce downside slightly (premium offsets loss)'],
            ['Best for', 'Income generation, willing to sell at strike']
          ]
        },
        {
          type: 'table',
          title: 'Protective Put',
          headers: ['Term', 'Definition'],
          rows: [
            ['Structure', 'Own stock + buy put'],
            ['Benefit', 'Insurance against price decline'],
            ['Trade-off', 'Keep unlimited upside'],
            ['Cost', 'Premium paid'],
            ['Best for', 'Protecting gains, worried about downside']
          ]
        },
        {
          type: 'table',
          title: 'Collar',
          headers: ['Term', 'Definition'],
          rows: [
            ['Structure', 'Own stock + sell call + buy put'],
            ['Benefit', 'Floor and ceiling on returns'],
            ['Trade-off', 'Reduced cost (call premium funds put)'],
            ['Exposure', 'Limited upside and downside'],
            ['Best for', 'Concentrated stock positions']
          ]
        },
        {
          type: 'text',
          title: 'Hedge Funds',
          content:
            'Hedge funds are private investment pools for accredited investors using sophisticated strategies.'
        },
        {
          type: 'table',
          title: 'Hedge Fund Characteristics',
          headers: ['Feature', 'Description'],
          rows: [
            ['**Investors**', 'Accredited/qualified only'],
            ['**Regulation**', 'Limited (private placement)'],
            ['**Liquidity**', 'Often limited (lock-up periods)'],
            ['**Fees**', '"2 and 20" (2% management, 20% performance)'],
            ['**Strategies**', 'Long/short, arbitrage, macro, etc.']
          ]
        },
        {
          type: 'table',
          title: 'Common Hedge Fund Strategies',
          headers: ['Strategy', 'Description'],
          rows: [
            ['**Long/Short**', 'Long undervalued, short overvalued'],
            ['**Market Neutral**', 'Equal long/short exposure'],
            ['**Global Macro**', 'Bets on economic trends'],
            ['**Event-Driven**', 'Mergers, bankruptcies, restructuring'],
            ['**Distressed**', 'Troubled company securities']
          ]
        },
        {
          type: 'text',
          title: 'Private Equity',
          content: 'Private equity involves direct investment in private companies.'
        },
        {
          type: 'table',
          title: 'Private Equity Types',
          headers: ['Type', 'Description'],
          rows: [
            ['**Venture capital**', 'Early-stage companies'],
            ['**Leveraged buyout (LBO)**', 'Acquire using debt'],
            ['**Growth equity**', 'Established but growing companies'],
            ['**Mezzanine**', 'Subordinated debt/preferred']
          ]
        },
        {
          type: 'table',
          title: 'Private Equity Characteristics',
          headers: ['Feature', 'Consideration'],
          rows: [
            ['Return potential', 'High (20%+)'],
            ['Liquidity', '7-10 year lock-up typical'],
            ['Minimums', '$250K+ typically'],
            ['J-curve', 'Negative returns early (fees, investments)']
          ]
        },
        {
          type: 'warning',
          title: '⚠️ Exam Trap: J-Curve',
          content:
            'Private equity often shows **negative returns in early years** due to fees and investment period before companies mature. This is called the **J-curve effect**.'
        },
        {
          type: 'callout',
          title: '🧠 Memory Aids',
          content:
            '**CALL up, PUT down** (call = buy/bullish, put = sell/bearish)\n\n**Covered Call = Collect premium, Cap upside**'
        },
        {
          type: 'summary',
          title: 'Key Takeaways',
          content: [
            'Alternatives: Lower correlation, less liquid, higher fees, more complex',
            'REITs: 90%+ distribution required; dividends may get 20% QBI deduction',
            'Call = right to buy (bullish); Put = right to sell (bearish)',
            'Covered call: Own stock + sell call = income, limited upside',
            'Protective put: Own stock + buy put = insurance against decline'
          ]
        }
      ]
    },
  }
];

export default CFP_INV2_LESSONS;
