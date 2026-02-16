/**
 * CFP Domain 4: Investment Planning
 * Additional Investment Lessons (Structured Format)
 * 
 * These lessons expand coverage of options strategies, international investing,
 * factor investing, and specialized investment topics.
 */

import type { Lesson } from '../../../types';

export const CFP_INV4_LESSONS: Lesson[] = [
  {
    id: "CFP-INV-L013",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Options Strategies for Client Portfolios",
    description: "Master options fundamentals, covered calls, protective puts, and client suitability for derivatives strategies.",
    order: 13,
    duration: 55,
    difficulty: 'intermediate',
    topics: [
      "Basic options terminology and concepts",
      "Covered call and protective put strategies",
      "When options strategies are appropriate for clients",
      "Breakeven points and maximum gain/loss calculations"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "Options can enhance returns, generate income, or provide downside protection. Understanding these strategies helps advisors serve sophisticated clients."
        },
        {
          title: "Key Terms",
          type: "table",
          headers: ["Term", "Definition"],
          rows: [
            ["**Call Option**", "Right (not obligation) to BUY at strike price"],
            ["**Put Option**", "Right (not obligation) to SELL at strike price"],
            ["**Strike Price**", "Price at which option can be exercised"],
            ["**Premium**", "Price paid for the option"],
            ["**Expiration**", "Date option expires"],
            ["**In the Money**", "Has intrinsic value if exercised now"],
            ["**Out of the Money**", "No intrinsic value currently"]
          ]
        },
        {
          title: "Option Buyer vs. Seller",
          type: "table",
          headers: ["", "Buyer (Long)", "Seller (Short/Writer)"],
          rows: [
            ["**Pays/Receives**", "Pays premium", "Receives premium"],
            ["**Rights/Obligations**", "Has right", "Has obligation"],
            ["**Max Gain**", "Unlimited (calls) or strike minus premium (puts)", "Premium received"],
            ["**Max Loss**", "Premium paid", "Potentially unlimited (naked calls)"]
          ]
        },
        {
          title: "Covered Call Strategy",
          type: "text",
          content: "**What It Is:** Owning stock AND selling a call option against it.\n\n**Mechanics:**\n- **Own**: 100 shares of XYZ at $50\n- **Sell**: 1 call with $55 strike, receive $2 premium\n- **Result**: If stock stays below $55, keep premium ($200)\n- **If called**: Sell shares at $55, keep premium → effective sale at $57"
        },
        {
          title: "Covered Call - When to Use",
          type: "text",
          content: "✅ **Appropriate:**\n- Neutral to slightly bullish outlook\n- Client comfortable with limited upside\n- Want income from existing position\n- Reduce cost basis\n\n❌ **Inappropriate:**\n- Very bullish (giving up upside)\n- High conviction on significant appreciation"
        },
        {
          title: "Covered Call Breakeven and Max Values",
          type: "table",
          headers: ["Metric", "Calculation"],
          rows: [
            ["**Breakeven**", "Stock purchase price - premium received"],
            ["**Max Gain**", "Strike price - purchase price + premium"],
            ["**Max Loss**", "Purchase price - premium (stock goes to $0)"]
          ]
        },
        {
          title: "Protective Put Strategy",
          type: "text",
          content: "**What It Is:** Owning stock AND buying a put option for downside protection. Like buying insurance.\n\n**Mechanics:**\n- **Own**: 100 shares of XYZ at $50\n- **Buy**: 1 put with $45 strike, pay $1.50 premium\n- **Result**: Floor on losses at $45, minus premium cost"
        },
        {
          title: "Protective Put - When to Use",
          type: "text",
          content: "✅ **Appropriate:**\n- Want to protect gains\n- Concerned about short-term downside\n- Can't or won't sell stock (tax reasons, restrictions)\n\n❌ **Inappropriate:**\n- Long-term holding (cost of repeated puts adds up)\n- No significant gains to protect\n- Premium cost exceeds risk tolerance"
        },
        {
          title: "Protective Put Cost Considerations",
          type: "table",
          headers: ["Scenario", "Annualized Put Cost"],
          rows: [
            ["Deep out-of-the-money", "Lower, but less protection"],
            ["At-the-money", "Higher, more protection"],
            ["Longer duration", "Higher total, lower per-month"]
          ]
        },
        {
          title: "Collar Strategy",
          type: "text",
          content: "**What It Is:** Combines covered call + protective put. \"Costless\" hedge.\n\n**Mechanics:**\n- **Own**: 100 shares of XYZ at $50\n- **Buy**: Put with $45 strike, pay $1.50\n- **Sell**: Call with $55 strike, receive $1.50\n- **Net cost**: $0 (premiums offset)\n\n**Outcome:**\n- Downside protected below $45\n- Upside capped at $55\n- No out-of-pocket cost\n\n✅ **Appropriate:**\n- Protecting concentrated position\n- Pre-IPO or restricted stock\n- Nearing liquidity event\n- Want certainty within range"
        },
        {
          title: "Cash-Secured Put",
          type: "text",
          content: "**What It Is:** Selling a put while holding cash to buy the stock if assigned.\n\n**Mechanics:**\n- **Sell**: Put with $45 strike, receive $2 premium\n- **Hold**: $4,500 cash (or margin capacity)\n- **If assigned**: Buy shares at $45 (effective cost: $43)\n- **If not assigned**: Keep $200 premium\n\n✅ **Appropriate:**\n- Want to buy stock at lower price\n- Willing to own the stock\n- Looking for income while waiting\n\n**Risk:** If stock drops significantly (e.g., to $30), you're obligated to buy at $45 even though market is $30."
        },
        {
          title: "Suitability Considerations",
          type: "table",
          headers: ["Factor", "Consideration"],
          rows: [
            ["**Sophistication**", "Options require understanding—not for novices"],
            ["**Risk tolerance**", "Writers can lose significantly"],
            ["**Investment objective**", "Income, growth, or protection?"],
            ["**Tax situation**", "Options have complex tax treatment"],
            ["**Time commitment**", "Positions need monitoring"]
          ]
        },
        {
          title: "When Options Are Generally Inappropriate",
          type: "warning",
          calloutType: "warning",
          content: "⚠️ Options are inappropriate for:\n- Clients who don't understand the risks\n- Low net worth relative to position size\n- Need for liquidity\n- Long-term buy-and-hold strategy (costs erode returns)"
        },
        {
          title: "Regulatory Requirements",
          type: "text",
          content: "- Options Agreement required before trading\n- Special disclosures (OCC Options Disclosure Document)\n- Suitability review for approval levels"
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**Covered calls** generate income but cap upside",
            "**Protective puts** provide insurance at a cost",
            "**Collars** create floor and ceiling at low/no cost",
            "**Cash-secured puts** let you get paid to wait for entry price",
            "**Options require sophistication**—not appropriate for all clients"
          ]
        },
        {
          title: "Practice Questions",
          type: "example",
          content: "📊 **Question 1:** A client owns 500 shares of stock at $60 and sells 5 covered calls with a $65 strike, receiving $2 per share. What is their maximum gain?\n- A) $2 per share ($1,000 total)\n- B) $5 per share ($2,500 total)\n- C) $7 per share ($3,500 total)\n- D) Unlimited\n\n**Answer: C** - Max gain = (Strike - Purchase Price) + Premium = ($65 - $60) + $2 = $7/share = $3,500.\n\n📊 **Question 2:** A protective put is MOST appropriate for a client who:\n- A) Wants to generate income from their portfolio\n- B) Has significant unrealized gains and is concerned about short-term downside\n- C) Believes the stock will appreciate significantly\n- D) Is seeking maximum upside participation\n\n**Answer: B** - Protective puts protect gains at a premium cost. They sacrifice some upside but provide a floor."
        },
        {
          title: "Key Terms",
          type: "list",
          content: [
            { term: "Covered Call", definition: "Owning stock while selling a call option against it to generate income" },
            { term: "Protective Put", definition: "Buying a put option to protect an existing stock position from downside" },
            { term: "Collar", definition: "Combining covered call and protective put to create a range of outcomes" },
            { term: "Strike Price", definition: "The price at which an option can be exercised" }
          ]
        }
      ]
    }
  },
  {
    id: "CFP-INV-L014",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-2",
    title: "International and Emerging Market Investing",
    description: "Understand global diversification benefits, currency risk, emerging markets, and international investment vehicles.",
    order: 14,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      "Benefits and risks of international diversification",
      "Developed vs. emerging markets distinctions",
      "Currency risk and hedging considerations",
      "International investment vehicles"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "Global diversification can enhance returns and reduce risk. Understanding international markets helps advisors build better portfolios."
        },
        {
          title: "The Case for International Investing",
          type: "table",
          headers: ["Benefit", "Explanation"],
          rows: [
            ["**Reduced correlation**", "Markets don't move in perfect sync"],
            ["**Broader opportunity set**", "~50% of global market cap is outside U.S."],
            ["**Economic cycle diversification**", "Different countries at different cycle stages"],
            ["**Currency diversification**", "Hedge against dollar weakness"]
          ]
        },
        {
          title: "Historical Evidence",
          type: "text",
          content: "- International diversification has historically reduced portfolio volatility\n- Benefits vary by time period\n- Correlations have increased during crises (\"correlation goes to 1 when you need it least\")"
        },
        {
          title: "MSCI Classification System",
          type: "table",
          headers: ["Classification", "Characteristics", "Examples"],
          rows: [
            ["**Developed**", "High income, liquid markets, strong regulation", "US, UK, Japan, Germany, Australia"],
            ["**Emerging**", "Middle income, developing markets, higher growth potential", "China, Brazil, India, Mexico, Taiwan"],
            ["**Frontier**", "Smaller, less liquid, higher risk", "Vietnam, Nigeria, Bangladesh"]
          ]
        },
        {
          title: "Key Indices",
          type: "table",
          headers: ["Index", "Coverage"],
          rows: [
            ["**MSCI EAFE**", "Developed markets excluding US and Canada"],
            ["**MSCI Emerging Markets**", "~25 emerging market countries"],
            ["**MSCI ACWI**", "All Country World Index (developed + emerging)"],
            ["**MSCI World**", "Developed markets only (including US)"]
          ]
        },
        {
          title: "Currency Risk",
          type: "table",
          headers: ["Scenario", "Impact on US Investor"],
          rows: [
            ["Foreign currency strengthens vs. USD", "Returns enhanced"],
            ["Foreign currency weakens vs. USD", "Returns diminished"]
          ]
        },
        {
          title: "Currency Risk Example",
          type: "example",
          content: "📊 **Example:** You invest in European stocks that return 10%. If the euro falls 5% vs. dollar, your return is only ~5% in dollar terms."
        },
        {
          title: "Hedging Currency Risk",
          type: "table",
          headers: ["Approach", "Consideration"],
          rows: [
            ["**Unhedged**", "Accept currency as part of diversification"],
            ["**Fully hedged**", "Eliminate currency impact (has cost)"],
            ["**Partially hedged**", "Middle ground"]
          ]
        },
        {
          title: "🧠 Research Insight",
          type: "callout",
          calloutType: "tip",
          content: "Long-term investors often benefit from unhedged positions; short-term, hedging reduces volatility."
        },
        {
          title: "Other International Risks",
          type: "text",
          content: "**Political and Regulatory Risk:**\n- Government instability\n- Nationalization of assets\n- Capital controls\n- Changing tax treaties\n\n**Liquidity Risk:**\n- Smaller markets may have wider bid-ask spreads\n- Some positions harder to exit\n- Trading hours differ\n\n**Information Risk:**\n- Accounting standards may differ\n- Less regulatory oversight\n- Language barriers\n- Less analyst coverage"
        },
        {
          title: "Emerging Markets Opportunity",
          type: "table",
          headers: ["Factor", "Developed", "Emerging"],
          rows: [
            ["GDP Growth", "1-3%", "4-7%"],
            ["Demographic dividend", "Aging populations", "Younger, growing workforces"],
            ["Urbanization", "Mature", "Ongoing"],
            ["Consumer growth", "Slower", "Faster"]
          ]
        },
        {
          title: "Risks Specific to EM",
          type: "text",
          content: "- Higher volatility (often 1.5-2x developed markets)\n- Corporate governance concerns\n- Currency volatility\n- Geopolitical risk (tariffs, sanctions)"
        },
        {
          title: "Key EM Considerations",
          type: "table",
          headers: ["Country", "Economic Focus", "Specific Risks"],
          rows: [
            ["**China**", "Manufacturing, technology", "Government intervention, trade tensions"],
            ["**India**", "Services, demographics", "Infrastructure, bureaucracy"],
            ["**Brazil**", "Commodities, agriculture", "Political instability, currency"],
            ["**Taiwan**", "Semiconductors", "Geopolitical (China relations)"]
          ]
        },
        {
          title: "International Investment Vehicles",
          type: "table",
          headers: ["Vehicle", "Advantages", "Disadvantages"],
          rows: [
            ["**Mutual funds**", "Professional management, diversification", "Fees, less tax efficient"],
            ["**ETFs**", "Tax efficient, low cost, tradeable", "Bid-ask spreads, some are niche"],
            ["**ADRs**", "Trade in US dollars, US exchanges", "Single-company risk, fees"],
            ["**Direct foreign purchase**", "Most control", "Currency conversion, tax complexity"]
          ]
        },
        {
          title: "ADR Levels",
          type: "table",
          headers: ["Level", "Description"],
          rows: [
            ["**Sponsored I**", "OTC, minimal SEC requirements"],
            ["**Sponsored II**", "Listed on US exchange, more disclosure"],
            ["**Sponsored III**", "Full SEC registration, can raise capital"],
            ["**Unsponsored**", "Created by depositary bank without company involvement"]
          ]
        },
        {
          title: "How Much International?",
          type: "table",
          headers: ["Approach", "Allocation"],
          rows: [
            ["**Market-cap weighted**", "~40-50% international"],
            ["**Home bias moderate**", "20-30% international"],
            ["**Risk-parity**", "Varies by volatility"]
          ]
        },
        {
          title: "Common Allocations",
          type: "text",
          content: "- Most target-date funds: 30-40% international\n- Research suggests: at least 20% for diversification benefit"
        },
        {
          title: "Implementation Strategies",
          type: "table",
          headers: ["Strategy", "Best For"],
          rows: [
            ["**Broad index**", "Core international exposure at low cost"],
            ["**Regional funds**", "Specific country/region views"],
            ["**Active EM**", "Potential for outperformance (debatable)"]
          ]
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**International diversification** reduces portfolio risk over time",
            "**Currency exposure** is a double-edged sword—adds risk and opportunity",
            "**Emerging markets** offer higher growth but significantly higher volatility",
            "**ETFs and mutual funds** are the most practical vehicles for most clients",
            "**~20-40% international** is typical for well-diversified portfolios"
          ]
        },
        {
          title: "Practice Questions",
          type: "example",
          content: "📊 **Question 1:** A client is concerned that their international fund underperformed the local market index. The MOST likely explanation is:\n- A) The fund manager made poor stock selections\n- B) Currency depreciation against the US dollar reduced returns\n- C) International markets are always riskier\n- D) The fund had high fees\n\n**Answer: B** - Currency impact is the most common reason for divergence between local returns and US dollar returns.\n\n📊 **Question 2:** Which investment vehicle provides the easiest access to a diversified emerging markets portfolio for a typical US investor?\n- A) Direct purchase of foreign stocks\n- B) An emerging markets ETF\n- C) ADRs of individual companies\n- D) Foreign currency accounts\n\n**Answer: B** - An EM ETF provides broad, diversified exposure with low cost and high liquidity."
        },
        {
          title: "Key Terms",
          type: "list",
          content: [
            { term: "Currency Risk", definition: "Risk that exchange rate changes will reduce investment returns" },
            { term: "MSCI EAFE", definition: "Index of developed markets in Europe, Australasia, and Far East" },
            { term: "Emerging Markets", definition: "Countries with developing economies and financial markets, higher growth potential and risk" },
            { term: "ADR", definition: "American Depositary Receipt—foreign shares traded on US exchanges" }
          ]
        }
      ]
    }
  },
  {
    id: "CFP-INV-L015",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-2",
    title: "Real Assets: Real Estate and Commodities",
    description: "Learn the role of real assets in portfolios, REIT structures and taxation, and commodity investment approaches.",
    order: 15,
    duration: 50,
    difficulty: 'intermediate',
    topics: [
      "Role of real assets in a diversified portfolio",
      "Direct vs. indirect real estate investments",
      "REIT structures and tax implications",
      "Commodity investment approaches"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "Real assets provide inflation protection and diversification benefits. This lesson covers how to incorporate them into client portfolios."
        },
        {
          title: "What Are Real Assets?",
          type: "text",
          content: "**Definition:** Tangible assets with intrinsic value based on physical properties:\n- Real estate\n- Commodities (gold, oil, agricultural products)\n- Infrastructure\n- Natural resources\n- Collectibles"
        },
        {
          title: "Investment Rationale",
          type: "table",
          headers: ["Benefit", "Explanation"],
          rows: [
            ["**Inflation hedge**", "Real assets often rise with inflation"],
            ["**Diversification**", "Low correlation to stocks and bonds"],
            ["**Income potential**", "Real estate, farmland, timberland"],
            ["**Tangibility**", "Physical backing provides floor value"]
          ]
        },
        {
          title: "Direct vs. Indirect Real Estate Ownership",
          type: "table",
          headers: ["Approach", "Advantages", "Disadvantages"],
          rows: [
            ["**Direct (own property)**", "Control, leverage, tax benefits", "Illiquidity, management burden, concentration"],
            ["**REITs**", "Liquidity, diversification, no management", "Market volatility, no direct control"],
            ["**Private funds**", "Professional management, diversification", "Illiquidity, high minimums, fees"],
            ["**Crowdfunding**", "Lower minimums, access", "Platform risk, illiquidity"]
          ]
        },
        {
          title: "Types of Real Estate Investments",
          type: "table",
          headers: ["Category", "Examples", "Characteristics"],
          rows: [
            ["**Residential**", "Single-family, multi-family", "Tenant-focused, local markets"],
            ["**Commercial**", "Office, retail", "Longer leases, economic sensitivity"],
            ["**Industrial**", "Warehouses, logistics", "E-commerce growth driver"],
            ["**Healthcare**", "Senior housing, medical offices", "Demographic tailwinds"],
            ["**Data centers**", "Cloud infrastructure", "High growth, technology exposure"]
          ]
        },
        {
          title: "REITs (Real Estate Investment Trusts)",
          type: "text",
          content: "**Structure Requirements** - To qualify as a REIT:\n- Invest at least 75% of assets in real estate\n- Derive at least 75% of income from real estate\n- Distribute at least 90% of taxable income as dividends\n- Have at least 100 shareholders\n- No more than 50% owned by 5 or fewer individuals"
        },
        {
          title: "REIT Tax Treatment",
          type: "table",
          headers: ["REIT Level", "Taxation"],
          rows: [
            ["**REIT entity**", "Pays no corporate tax on distributed income"],
            ["**Investor dividends**", "Ordinary income (not qualified dividends)"],
            ["**20% QBI deduction**", "REIT dividends eligible for Section 199A deduction"]
          ]
        },
        {
          title: "Types of REITs",
          type: "table",
          headers: ["Type", "Description"],
          rows: [
            ["**Equity REITs**", "Own and operate properties (most common)"],
            ["**Mortgage REITs**", "Invest in mortgages and mortgage-backed securities"],
            ["**Hybrid REITs**", "Combination of equity and mortgage"]
          ]
        },
        {
          title: "REIT Allocation Considerations",
          type: "text",
          content: "- Typical allocation: 5-15% of portfolio\n- Provide income (higher yields than S&P 500)\n- Different risk/return than direct ownership\n- Correlate more with stocks in short term"
        },
        {
          title: "Types of Commodities",
          type: "table",
          headers: ["Category", "Examples"],
          rows: [
            ["**Energy**", "Crude oil, natural gas"],
            ["**Precious metals**", "Gold, silver, platinum"],
            ["**Industrial metals**", "Copper, aluminum"],
            ["**Agriculture**", "Corn, wheat, soybeans, cattle"]
          ]
        },
        {
          title: "Commodity Investment Approaches",
          type: "table",
          headers: ["Method", "Description", "Considerations"],
          rows: [
            ["**Physical**", "Own the actual commodity (gold bars)", "Storage, insurance, no income"],
            ["**Futures**", "Contracts for future delivery", "Contango/backwardation, roll costs"],
            ["**ETFs**", "Track commodity indices", "Convenience, but may not track perfectly"],
            ["**Commodity stocks**", "Energy, mining companies", "Company risk added to commodity exposure"],
            ["**Mutual funds**", "Active commodity strategies", "Fees, manager risk"]
          ]
        },
        {
          title: "Contango and Backwardation",
          type: "table",
          headers: ["Term", "Definition", "Impact on Returns"],
          rows: [
            ["**Contango**", "Futures price > spot price", "Negative roll yield (most common)"],
            ["**Backwardation**", "Futures price < spot price", "Positive roll yield"]
          ]
        },
        {
          title: "Important Note on Commodity Futures",
          type: "warning",
          calloutType: "warning",
          content: "⚠️ Long-term commodity futures returns have been disappointing due to persistent contango. Physical exposure or equities may be better."
        },
        {
          title: "The Case for Gold",
          type: "table",
          headers: ["Argument", "Evidence"],
          rows: [
            ["**Crisis hedge**", "Tends to rise during market stress"],
            ["**Currency hedge**", "Protects against dollar weakness"],
            ["**Inflation hedge**", "Maintains purchasing power (historically)"],
            ["**Uncorrelated**", "Low correlation to stocks and bonds"]
          ]
        },
        {
          title: "Counter-Arguments for Gold",
          type: "table",
          headers: ["Concern", "Explanation"],
          rows: [
            ["**No income**", "Gold produces no dividends or interest"],
            ["**Storage costs**", "Physical gold has holding costs"],
            ["**Volatility**", "Can be quite volatile"],
            ["**Opportunity cost**", "Cash in gold isn't earning returns elsewhere"]
          ]
        },
        {
          title: "How Much Gold?",
          type: "text",
          content: "- Typical allocation: 2-10% (if included at all)\n- Often via ETF (GLD, IAU) or physical\n- Can be tactical or strategic"
        },
        {
          title: "Real Asset Allocation Framework",
          type: "table",
          headers: ["Risk Profile", "Real Estate", "Commodities", "Total Real Assets"],
          rows: [
            ["Conservative", "5-10%", "0-5%", "5-10%"],
            ["Moderate", "10-15%", "5-10%", "15-20%"],
            ["Aggressive", "10-20%", "5-10%", "15-25%"]
          ]
        },
        {
          title: "Implementation Tips",
          type: "text",
          content: "1. Use REITs for liquid real estate exposure\n2. Consider gold for crisis protection (small allocation)\n3. Be cautious with commodity futures (roll costs erode returns)\n4. Commodity producers (energy/mining stocks) offer alternative exposure\n5. Real assets are most valuable in inflationary environments"
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**Real assets** provide inflation protection and diversification",
            "**REITs** are the most accessible way to add real estate to portfolios",
            "**REIT dividends** are taxed as ordinary income (consider in IRA)",
            "**Commodity futures** face headwinds from contango",
            "**Gold** can serve as portfolio insurance in small allocations"
          ]
        },
        {
          title: "Practice Questions",
          type: "example",
          content: "📊 **Question 1:** A client wants real estate exposure but needs liquidity. The BEST recommendation is:\n- A) Purchase rental property\n- B) Invest in a public REIT or REIT ETF\n- C) Invest in a private real estate fund\n- D) Purchase a vacation property\n\n**Answer: B** - Public REITs trade on exchanges like stocks, providing daily liquidity.\n\n📊 **Question 2:** The primary tax advantage of REIT structure is:\n- A) REIT dividends are tax-free to investors\n- B) REITs pay no entity-level tax if they distribute 90%+ of income\n- C) REIT gains are taxed at long-term capital gains rates\n- D) REITs can deduct depreciation indefinitely\n\n**Answer: B** - REITs avoid corporate tax by distributing taxable income, but investors pay ordinary income tax on dividends."
        },
        {
          title: "Key Terms",
          type: "list",
          content: [
            { term: "REIT", definition: "Real Estate Investment Trust—company that owns income-producing real estate" },
            { term: "Contango", definition: "Futures price above spot price, creating negative roll yield" },
            { term: "Real Assets", definition: "Tangible assets like real estate and commodities with intrinsic value" },
            { term: "Section 199A", definition: "Tax provision allowing 20% deduction on qualified REIT dividends" }
          ]
        }
      ]
    }
  },
  {
    id: "CFP-INV-L016",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-1",
    title: "Factor Investing and Smart Beta",
    description: "Explore equity factors, historical premiums, smart beta strategies, and factor timing considerations.",
    order: 16,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      "Common equity factors and their historical premiums",
      "Traditional indexing vs. factor-based investing",
      "Smart beta strategies for client portfolios",
      "Factor timing and cyclicality"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "Factor investing targets specific characteristics that have historically driven returns. Understanding factors helps advisors position portfolios for long-term success."
        },
        {
          title: "What Are Factors?",
          type: "text",
          content: "**Definition:** Factors are characteristics of stocks (or other securities) that explain differences in returns across securities."
        },
        {
          title: "The Evolution of Factor Investing",
          type: "table",
          headers: ["Era", "Approach"],
          rows: [
            ["**1960s**", "CAPM: Market beta is the only factor"],
            ["**1990s**", "Fama-French: Add size and value factors"],
            ["**2000s**", "Carhart: Add momentum factor"],
            ["**2010s**", "Multi-factor explosion: profitability, investment, volatility"]
          ]
        },
        {
          title: "The \"Big Five\" (or Six) Factors",
          type: "table",
          headers: ["Factor", "Definition", "Historical Premium"],
          rows: [
            ["**Market**", "Stocks vs. risk-free rate", "~6-8% annually"],
            ["**Size (Small)**", "Small caps vs. large caps", "~2-3% annually"],
            ["**Value**", "Cheap vs. expensive stocks (P/B, P/E)", "~3-4% annually"],
            ["**Momentum**", "Recent winners vs. losers", "~4-5% annually"],
            ["**Quality/Profitability**", "Profitable vs. unprofitable firms", "~3-4% annually"],
            ["**Low Volatility**", "Low-vol stocks vs. high-vol", "~2-3% annually"]
          ]
        },
        {
          title: "Factor Definitions",
          type: "table",
          headers: ["Factor", "Typical Metrics"],
          rows: [
            ["**Value**", "Low P/B, P/E, P/CF; high dividend yield"],
            ["**Size**", "Market capitalization (smaller = more exposure)"],
            ["**Momentum**", "12-1 month returns (recent performance)"],
            ["**Quality**", "ROE, earnings stability, low debt"],
            ["**Low Volatility**", "Standard deviation, beta"]
          ]
        },
        {
          title: "Important Note",
          type: "warning",
          calloutType: "warning",
          content: "⚠️ Historical premiums are averages. Factors can underperform for years at a time."
        },
        {
          title: "What Is Smart Beta?",
          type: "text",
          content: "Indexes that weight holdings based on factors rather than market cap."
        },
        {
          title: "Smart Beta Weighting Methods",
          type: "table",
          headers: ["Approach", "Weighting Method"],
          rows: [
            ["**Traditional index**", "Market capitalization"],
            ["**Equal weight**", "Same weight to all stocks"],
            ["**Value-weighted**", "Weight by value metrics"],
            ["**Momentum-weighted**", "Weight by recent performance"],
            ["**Multi-factor**", "Combine multiple factors"]
          ]
        },
        {
          title: "Smart Beta vs. Active vs. Passive",
          type: "table",
          headers: ["Feature", "Passive Index", "Smart Beta", "Active"],
          rows: [
            ["Rules-based", "Yes", "Yes", "No"],
            ["Factor exposure", "Market only", "Targeted factors", "Manager judgment"],
            ["Fees", "Lowest", "Low-moderate", "Highest"],
            ["Turnover", "Low", "Moderate", "Varies"]
          ]
        },
        {
          title: "Single-Factor vs. Multi-Factor",
          type: "table",
          headers: ["Approach", "Pros", "Cons"],
          rows: [
            ["**Single-factor**", "Pure exposure, easy to understand", "High tracking error, factor timing risk"],
            ["**Multi-factor**", "Diversified factor exposure, smoother ride", "Diluted premium, harder to evaluate"]
          ]
        },
        {
          title: "Implementation Vehicles",
          type: "table",
          headers: ["Vehicle", "Example"],
          rows: [
            ["**ETFs**", "iShares Value Factor ETF, Vanguard Value"],
            ["**Mutual funds**", "DFA Small Cap Value"],
            ["**Separate accounts**", "Custom factor tilts"]
          ]
        },
        {
          title: "Factor Cyclicality",
          type: "table",
          headers: ["Factor", "Tends to Perform Well", "Tends to Underperform"],
          rows: [
            ["**Value**", "Early recovery, rising rates", "Late cycle, low rates"],
            ["**Momentum**", "Trending markets", "Market reversals"],
            ["**Small cap**", "Early recovery", "Late cycle, recessions"],
            ["**Quality**", "Uncertainty, late cycle", "Strong risk-on rallies"],
            ["**Low volatility**", "Market downturns", "Strong bull markets"]
          ]
        },
        {
          title: "Factor Timing Warning",
          type: "callout",
          calloutType: "warning",
          content: "⚠️ Factor timing is extremely difficult. Most advisors should use factors strategically (long-term), not tactically."
        },
        {
          title: "Evaluating Factor Strategies",
          type: "text",
          content: "**Questions to Ask:**\n1. **Is the premium real?** (Backed by academic research across time/markets?)\n2. **Is it persistent?** (Works in different periods?)\n3. **Is it pervasive?** (Works across asset classes/geographies?)\n4. **Is it investable?** (Can be captured after costs?)\n5. **Is it intuitive?** (Makes economic sense?)\n\n**Red Flags:**\n- Factor discovered through data mining\n- Premium disappears after publication\n- High turnover erodes returns\n- Fees consume the premium"
        },
        {
          title: "Core-Satellite with Factors",
          type: "text",
          content: "- **Core**: Broad market index (60-70%)\n- **Satellite**: Factor tilts (30-40%)\n  - Value + momentum (diversifying factors)\n  - Small cap value\n  - Quality defensive"
        },
        {
          title: "Factor Tilts by Life Stage",
          type: "table",
          headers: ["Client Profile", "Factor Emphasis"],
          rows: [
            ["Young accumulating", "Small cap, value (higher risk, higher expected return)"],
            ["Near retirement", "Quality, low volatility (preservation)"],
            ["Retirement", "Dividend, quality (income and stability)"]
          ]
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**Factors explain** why some stocks outperform others over time",
            "**Value, size, momentum, quality** are the most researched factors",
            "**Factors are cyclical**—they don't outperform every year",
            "**Multi-factor** approaches smooth the ride",
            "**Costs matter**—factor premiums can be small; keep fees low"
          ]
        },
        {
          title: "Practice Questions",
          type: "example",
          content: "📊 **Question 1:** A factor strategy that buys stocks with strong recent price performance is targeting:\n- A) Value factor\n- B) Size factor\n- C) Momentum factor\n- D) Quality factor\n\n**Answer: C** - Momentum strategies buy recent winners and sell recent losers.\n\n📊 **Question 2:** Which statement about factor investing is MOST accurate?\n- A) Value always outperforms growth\n- B) Factor premiums are guaranteed but small\n- C) Factors are cyclical and can underperform for extended periods\n- D) Smart beta eliminates all market risk\n\n**Answer: C** - Factor premiums are averages over long periods; any factor can underperform for years."
        },
        {
          title: "Key Terms",
          type: "list",
          content: [
            { term: "Factor", definition: "Characteristic that explains return differences across securities" },
            { term: "Smart Beta", definition: "Index strategies that weight based on factors rather than market cap" },
            { term: "Value Premium", definition: "Historical tendency for cheap stocks to outperform expensive stocks" },
            { term: "Momentum", definition: "Factor based on recent price performance continuing" }
          ]
        }
      ]
    }
  },
  {
    id: "CFP-INV-L017",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-3",
    title: "ESG and Sustainable Investing",
    description: "Define ESG criteria, distinguish investment approaches, evaluate greenwashing concerns, and align portfolios with client values.",
    order: 17,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      "ESG criteria and sustainable investing approaches",
      "Exclusionary, inclusionary, and impact investing distinctions",
      "ESG performance claims and greenwashing concerns",
      "Incorporating client values into investment recommendations"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "Environmental, Social, and Governance (ESG) investing integrates non-financial factors into investment decisions. Understanding ESG helps advisors serve values-aligned clients."
        },
        {
          title: "The Three ESG Pillars",
          type: "table",
          headers: ["Pillar", "Factors Considered"],
          rows: [
            ["**Environmental**", "Carbon emissions, renewable energy, waste, water usage, deforestation"],
            ["**Social**", "Labor practices, diversity, community relations, supply chain, data privacy"],
            ["**Governance**", "Board composition, executive pay, shareholder rights, ethics, transparency"]
          ]
        },
        {
          title: "Why ESG Matters",
          type: "table",
          headers: ["Stakeholder", "Interest"],
          rows: [
            ["**Investors**", "Risk management, values alignment, long-term performance"],
            ["**Companies**", "Access to capital, reputation, employee attraction"],
            ["**Society**", "Sustainable business practices, reduced externalities"]
          ]
        },
        {
          title: "Spectrum of Sustainable Investing Strategies",
          type: "table",
          headers: ["Approach", "Description", "Example"],
          rows: [
            ["**Exclusionary**", "Screen out \"sin stocks\"", "No tobacco, weapons, fossil fuels"],
            ["**Best-in-class**", "Own ESG leaders in each sector", "Highest-rated energy company even if fossil fuel"],
            ["**ESG integration**", "Factor ESG into fundamental analysis", "Material ESG risks affect valuation"],
            ["**Thematic**", "Focus on specific sustainability themes", "Clean energy, water, gender diversity"],
            ["**Impact investing**", "Seek measurable social/environmental outcomes", "Community development, microfinance"]
          ]
        },
        {
          title: "Integration vs. Exclusion",
          type: "table",
          headers: ["Approach", "Pros", "Cons"],
          rows: [
            ["**Exclusion**", "Clear values alignment, simple", "Reduces diversification, may not drive change"],
            ["**ESG integration**", "Risk-focused, broader universe", "May still own controversial companies"],
            ["**Impact**", "Measurable outcomes", "Often illiquid, lower return expectations"]
          ]
        },
        {
          title: "Arguments FOR ESG",
          type: "table",
          headers: ["Claim", "Evidence"],
          rows: [
            ["Risk reduction", "Companies with good ESG less prone to scandals, lawsuits"],
            ["Long-term outperformance", "Some studies show ESG leaders outperform"],
            ["Downside protection", "ESG funds may fall less in downturns"]
          ]
        },
        {
          title: "Arguments AGAINST ESG",
          type: "table",
          headers: ["Concern", "Evidence"],
          rows: [
            ["Reduced diversification", "Excluding sectors reduces opportunity"],
            ["No consistent alpha", "Mixed evidence on outperformance"],
            ["Definition inconsistency", "ESG ratings vary wildly between providers"],
            ["Greenwashing", "Funds may claim ESG without substance"]
          ]
        },
        {
          title: "What the Data Shows",
          type: "text",
          content: "- Short-term: Mixed results, highly dependent on period\n- Long-term: Modest evidence of risk-adjusted benefit\n- Trend: Increasing capital flows may support ESG valuations"
        },
        {
          title: "🧠 Practical Advice",
          type: "callout",
          calloutType: "tip",
          content: "Don't promise ESG will outperform; position it as values alignment + risk management, not alpha source."
        },
        {
          title: "ESG Rating Providers",
          type: "table",
          headers: ["Provider", "Approach"],
          rows: [
            ["**MSCI**", "Proprietary research, letter grades (AAA-CCC)"],
            ["**Sustainalytics**", "Risk-based ratings (lower = better)"],
            ["**Bloomberg**", "Disclosure-based scores"],
            ["**CDP**", "Climate-focused assessments"]
          ]
        },
        {
          title: "The Ratings Disagreement Problem",
          type: "table",
          headers: ["Comparison", "Correlation"],
          rows: [
            ["Credit ratings (S&P vs. Moody's)", "~0.90"],
            ["ESG ratings (MSCI vs. Sustainalytics)", "~0.50"]
          ]
        },
        {
          title: "Ratings Insight",
          type: "text",
          content: "Companies rated highly by one provider may be middling by another. Different methodologies, different weightings."
        },
        {
          title: "Due Diligence Questions",
          type: "text",
          content: "1. What is the fund's ESG methodology?\n2. Which controversies trigger exclusion?\n3. How are ratings determined?\n4. Is the fund just marketing or substantively different?"
        },
        {
          title: "What Is Greenwashing?",
          type: "text",
          content: "Making misleading claims about environmental responsibility to attract ESG-conscious investors."
        },
        {
          title: "Greenwashing Red Flags",
          type: "warning",
          calloutType: "warning",
          content: "⚠️ **Warning Signs:**\n- **Vague claims** - \"Sustainable\" without definition\n- **Token ESG** - Minor tilt marketed as major commitment\n- **Controversial holdings** - \"ESG fund\" holding oil majors\n- **No engagement** - Passive ownership without using voting power"
        },
        {
          title: "SEC Oversight",
          type: "text",
          content: "- Increased scrutiny of ESG fund names and claims\n- Proposed rules requiring disclosure of ESG strategy\n- Enforcement against misleading marketing"
        },
        {
          title: "Discovery Questions for Clients",
          type: "text",
          content: "- \"Are there industries you want to avoid owning?\"\n- \"How important is it that your investments align with your values?\"\n- \"Would you accept lower returns for better alignment?\"\n- \"What causes or issues matter most to you?\""
        },
        {
          title: "Solutions by Client Priority",
          type: "table",
          headers: ["Client Priority", "Implementation"],
          rows: [
            ["**Strict avoidance**", "Exclusionary screens, SMA"],
            ["**Values + returns**", "ESG-integrated funds, best-in-class"],
            ["**Impact focus**", "Community investment, impact funds"],
            ["**Low-cost priority**", "ESG index funds"]
          ]
        },
        {
          title: "Managing Expectations",
          type: "text",
          content: "- Explain trade-offs clearly\n- Document values-based constraints\n- Review holdings to confirm alignment\n- Update as client values evolve"
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**ESG** considers environmental, social, and governance factors",
            "**Multiple approaches** from exclusion to impact investing",
            "**Performance is debated**—position as risk management + values, not alpha source",
            "**Ratings disagree**—do your own due diligence",
            "**Avoid greenwashing**—ensure substance behind claims"
          ]
        },
        {
          title: "Practice Questions",
          type: "example",
          content: "📊 **Question 1:** A client wants to invest only in companies addressing climate change. The MOST appropriate strategy is:\n- A) Exclusionary screening\n- B) Best-in-class ESG\n- C) Thematic investing (clean energy/climate focus)\n- D) Broad market indexing\n\n**Answer: C** - Thematic investing targets specific sustainability themes like climate solutions.\n\n📊 **Question 2:** The PRIMARY concern with ESG ratings is:\n- A) They are all essentially the same\n- B) They only measure environmental factors\n- C) Different providers produce significantly different ratings for the same company\n- D) They are updated too frequently\n\n**Answer: C** - ESG ratings have low correlation across providers due to different methodologies."
        },
        {
          title: "Key Terms",
          type: "list",
          content: [
            { term: "ESG", definition: "Environmental, Social, and Governance factors in investment analysis" },
            { term: "Impact Investing", definition: "Investing with intention to generate measurable social/environmental outcomes" },
            { term: "Greenwashing", definition: "Misleading claims about environmental responsibility" },
            { term: "Exclusionary Screening", definition: "Removing companies or sectors based on specific criteria" }
          ]
        }
      ]
    }
  },
  {
    id: "CFP-INV-L018",
    courseId: 'cfp',
    section: "CFP-INV",
    blueprintArea: "INV-3",
    title: "Behavioral Investing and Client Psychology",
    description: "Apply behavioral finance insights to prevent investor mistakes, design robust portfolios, and build processes that counter biases.",
    order: 18,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      "Applying behavioral finance to prevent common investor mistakes",
      "Designing portfolios clients can stick with through volatility",
      "Recognizing emotional decision-making and appropriate interventions",
      "Building investment processes that counter behavioral biases"
    ],
    content: {
      sections: [
        {
          title: "Why This Matters",
          type: "callout",
          calloutType: "important",
          content: "Understanding how psychology affects investment decisions helps advisors build portfolios clients can maintain and avoid costly mistakes."
        },
        {
          title: "The Behavior Gap",
          type: "text",
          content: "**What Is It?** The difference between investment returns and investor returns due to poor timing decisions."
        },
        {
          title: "Behavior Gap Statistics",
          type: "table",
          headers: ["Measure", "Historical Average (Equity Funds)"],
          rows: [
            ["Fund return", "~10%"],
            ["Investor return", "~6-7%"],
            ["**Behavior gap**", "**~3-4% annually**"]
          ]
        },
        {
          title: "Why Does the Behavior Gap Happen?",
          type: "text",
          content: "- Buying after gains (chasing performance)\n- Selling after losses (panic)\n- Switching funds at wrong times\n- Timing entry and exit poorly"
        },
        {
          title: "🧠 Key Insight",
          type: "callout",
          calloutType: "tip",
          content: "The advisor's primary job is often helping clients avoid destroying returns through behavioral mistakes."
        },
        {
          title: "Loss Aversion",
          type: "table",
          headers: ["Bias", "Impact"],
          rows: [
            ["**Definition**", "Losses hurt ~2x more than gains feel good"],
            ["**Result**", "Sell winners early, hold losers too long; avoid risk even when appropriate"]
          ]
        },
        {
          title: "Loss Aversion Intervention",
          type: "text",
          content: "**Intervention:** Frame discussions in terms of goals, not gains/losses. Use time-weighted returns over short-term marks."
        },
        {
          title: "Recency Bias",
          type: "table",
          headers: ["Bias", "Impact"],
          rows: [
            ["**Definition**", "Overweight recent experience"],
            ["**Result**", "Project recent returns forward; fear after crashes, greed after rallies"]
          ]
        },
        {
          title: "Recency Bias Intervention",
          type: "text",
          content: "**Intervention:** Show long-term historical patterns. \"Where were we 5 years ago?\""
        },
        {
          title: "Anchoring",
          type: "table",
          headers: ["Bias", "Impact"],
          rows: [
            ["**Definition**", "Over-rely on first piece of information"],
            ["**Result**", "\"I won't sell until it gets back to $X\" (original price)"]
          ]
        },
        {
          title: "Anchoring Intervention",
          type: "text",
          content: "**Intervention:** Focus on forward-looking prospects, not purchase price."
        },
        {
          title: "Herding",
          type: "table",
          headers: ["Bias", "Impact"],
          rows: [
            ["**Definition**", "Follow the crowd"],
            ["**Result**", "Buy at tops (everyone's buying), sell at bottoms (everyone's selling)"]
          ]
        },
        {
          title: "Herding Intervention",
          type: "text",
          content: "**Intervention:** Establish investment policy in calm times. Refer to it in chaos."
        },
        {
          title: "Overconfidence",
          type: "table",
          headers: ["Bias", "Impact"],
          rows: [
            ["**Definition**", "Overestimate skill, underestimate risk"],
            ["**Result**", "Excessive trading, concentrated positions, leverage"]
          ]
        },
        {
          title: "Overconfidence Intervention",
          type: "text",
          content: "**Intervention:** Track prediction accuracy. Compare to benchmarks."
        },
        {
          title: "Building Behaviorally-Robust Portfolios",
          type: "table",
          headers: ["Principle", "Application"],
          rows: [
            ["**Simplicity**", "Fewer holdings to track = less temptation to tinker"],
            ["**Broad diversification**", "Reduces regret from missing \"winners\""],
            ["**Appropriate risk**", "If client will panic at 30% drawdown, reduce equity"],
            ["**Automatic rebalancing**", "Removes emotional decision from process"],
            ["**Cash buffer**", "Emergency fund prevents forced selling"]
          ]
        },
        {
          title: "The \"Sleeping Point\" Test",
          type: "callout",
          calloutType: "tip",
          content: "🧠 Ask: \"What allocation would let you sleep through a 40% market drop without calling me?\" If the answer is 50% stocks, don't put them in 80%."
        },
        {
          title: "Buckets for Behavioral Comfort",
          type: "table",
          headers: ["Bucket", "Purpose", "Investments"],
          rows: [
            ["**Short-term (0-2 years)**", "Stability", "Cash, short-term bonds"],
            ["**Medium-term (3-7 years)**", "Moderate growth", "Balanced funds, bonds"],
            ["**Long-term (7+ years)**", "Growth", "Equities"]
          ]
        },
        {
          title: "Bucket Strategy Benefit",
          type: "text",
          content: "Clients can see that near-term needs are safe, reducing panic about long-term volatility."
        },
        {
          title: "Pre-Commitment",
          type: "text",
          content: "During calm markets, discuss:\n- \"What will you do when markets drop 20%?\"\n- \"Let's write down our agreed strategy for downturns\"\n- \"Here's the playbook for the next crash\""
        },
        {
          title: "During Crisis - Do's and Don'ts",
          type: "table",
          headers: ["Don't", "Do"],
          rows: [
            ["\"Don't worry about it\"", "\"I understand this is stressful\""],
            ["\"Markets always recover\"", "\"Let's look at your specific plan\""],
            ["Ignore the client", "Proactive outreach—don't wait for their panicked call"],
            ["Discuss abstract markets", "Focus on their specific goals"]
          ]
        },
        {
          title: "The Power of Stories",
          type: "callout",
          calloutType: "info",
          content: "\"Remember 2008? Clients who stayed invested saw their portfolios fully recover. Those who sold locked in losses.\""
        },
        {
          title: "Process Over Prediction",
          type: "text",
          content: "**Investment Policy Statement:**\n- Document risk tolerance, goals, and strategy\n- Reference it during emotional moments\n- Makes decisions systematic, not reactive\n\n**Scheduled Rebalancing:**\n- Removes \"should I do something?\" question\n- Forces buy-low, sell-high behavior\n- Pick a schedule and stick to it (annual, semi-annual)\n\n**Automatic Contributions:**\n- Dollar-cost averaging removes timing decision\n- Automaticity eliminates procrastination\n- \"Set it and forget it\" prevents overthinking"
        },
        {
          title: "Key Takeaways",
          type: "summary",
          content: [
            "**The behavior gap** costs investors 3-4% annually on average",
            "**Loss aversion, recency, anchoring, herding** are the biggest risks",
            "**Build portfolios for behavioral reality**, not theoretical maximization",
            "**Pre-commitment** during calm times prepares clients for storms",
            "**Process beats prediction**—systematic approaches protect against emotion"
          ]
        },
        {
          title: "Practice Questions",
          type: "example",
          content: "📊 **Question 1:** A client panics during a market correction and wants to sell everything. The BEST initial response is to:\n- A) Explain that markets always recover\n- B) Acknowledge their concern and review their personal financial plan together\n- C) Recommend they wait 30 days before making changes\n- D) Show them historical market charts\n\n**Answer: B** - Start with empathy, then ground the conversation in their specific situation—not abstract market arguments.\n\n📊 **Question 2:** The \"behavior gap\" in investing refers to:\n- A) The difference between expected and actual fund expenses\n- B) The gap between fund returns and investor returns due to poor timing\n- C) The tracking error of index funds\n- D) The difference between nominal and real returns\n\n**Answer: B** - Investors consistently earn less than the funds they own due to behavioral mistakes."
        },
        {
          title: "Key Terms",
          type: "list",
          content: [
            { term: "Behavior Gap", definition: "Difference between investment returns and investor returns due to poor timing" },
            { term: "Loss Aversion", definition: "Tendency to feel losses more intensely than equivalent gains" },
            { term: "Recency Bias", definition: "Overweighting recent experience when making predictions" },
            { term: "Pre-Commitment", definition: "Agreeing to a course of action before facing emotional decisions" }
          ]
        }
      ]
    }
  }
];
