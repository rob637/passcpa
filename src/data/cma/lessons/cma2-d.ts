/**
 * CMA Part 2, Section D: Risk Management
 * Weight: 10% of Part 2 Exam
 * 
 * Topics covered:
 * - Enterprise risk management
 * - Risk types
 * - Risk mitigation
 * - Financial instruments
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma2DLessons: Lesson[] = [
  // ============================================================================
  // CMA2-D: RISK MANAGEMENT (Lessons 1-6)
  // ============================================================================
  
  {
    id: 'CMA2-D-001',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Enterprise Risk Management Framework',
    description: 'Understand ERM concepts and the COSO framework',
    order: 34,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['ERM', 'COSO framework', 'Risk appetite', 'Risk culture'],
    blueprintArea: 'CMA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Risk is inherent in business. CMAs play a key role in identifying, measuring, and managing risks that could derail strategic objectives. Enterprise Risk Management provides a systematic approach to handling the full spectrum of organizational risks.",
        },
        {
          title: 'What is Enterprise Risk Management?',
          type: 'text',
          content: "**COSO ERM Definition:**\n\"A process, effected by an entity's board of directors, management and other personnel, applied in strategy setting and across the enterprise, designed to identify potential events that may affect the entity, and manage risk to be within its risk appetite.\"\n\n**Key concepts:**\n• Not just risk avoidance - risk optimization\n• Aligned with strategy and objectives\n• Enterprise-wide (not siloed)\n• Creates and preserves value",
        },
        {
          title: 'COSO ERM Components (2017)',
          type: 'table',
          headers: ['Component', 'Focus Area'],
          rows: [
            ['Governance & Culture', 'Board oversight, operating structure, talent, values'],
            ['Strategy & Objective-Setting', 'Business context, risk appetite, strategy'],
            ['Performance', 'Risk identification, assessment, prioritization, response'],
            ['Review & Revision', 'Risk changes, performance review, improvements'],
            ['Information, Communication & Reporting', 'IT systems, internal/external communication'],
          ],
        },
        {
          title: 'Risk Appetite vs. Risk Tolerance',
          type: 'text',
          content: "**Risk Appetite:**\nAmount of risk an organization is willing to accept in pursuit of value\n(Set at strategic level by board)\n\n**Risk Tolerance:**\nAcceptable variation around specific objectives\n(Operational/tactical implementation)\n\n**Example:**\nRisk appetite: \"We accept moderate operational risk for higher returns\"\nRisk tolerance: \"System downtime must not exceed 2 hours per month\"\n\n**Appetite is strategic; Tolerance is tactical!**",
        },
        {
          title: '🧠 Memory Aid: COSO ERM',
          type: 'callout',
          content: "**\"GS-PRI\"** - Five components:\n\n**G**overnance & Culture (foundation)\n**S**trategy & Objective-Setting (direction)\n**P**erformance (action)\n**R**eview & Revision (feedback)\n**I**nformation, Communication & Reporting (glue)\n\n**Culture is the FOUNDATION!\nWithout strong risk culture, frameworks fail.**",
        },
        {
          title: 'Risk Categories',
          type: 'text',
          content: "**Strategic risk:** Related to high-level goals (market shifts, M&A)\n\n**Operations risk:** Day-to-day execution (supply chain, IT systems)\n\n**Reporting risk:** Financial/non-financial reporting accuracy\n\n**Compliance risk:** Laws, regulations, contracts\n\n**Hazard risk:** Property, liability, business interruption\n\n**Financial risk:** Interest rate, currency, credit, liquidity\n\n**Different risks require different management approaches!**",
        },
        {
          title: 'Benefits of ERM',
          type: 'text',
          content: "**Value creation through:**\n\n• Better strategic decisions\n• Reduced surprise events\n• Improved capital allocation\n• Enhanced resilience\n• Regulatory compliance\n• Stakeholder confidence\n\n**Risk-aware culture:**\n• Everyone understands their role\n• Risks are openly discussed\n• Balanced risk-taking encouraged\n\n*ERM is NOT about eliminating risk - it's about taking the RIGHT risks!*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ERM is enterprise-wide, strategy-aligned risk management",
            "COSO 2017: Governance, Strategy, Performance, Review, Information",
            "Risk appetite = Strategic willingness to accept risk",
            "Risk tolerance = Operational limits around objectives",
            "Categories: Strategic, Operations, Reporting, Compliance, Financial",
            "Culture is foundational to effective ERM",
            "Goal is risk OPTIMIZATION, not elimination",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-D-002',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Risk Identification and Assessment',
    description: 'Learn techniques for identifying and evaluating risks',
    order: 35,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Risk identification', 'Risk assessment', 'Heat maps', 'Likelihood and impact'],
    blueprintArea: 'CMA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "You can't manage what you don't know about. CMAs help identify risks across the organization and assess their potential impact. This forms the basis for prioritization and response planning - critical inputs to strategic decision-making.",
        },
        {
          title: 'Risk Identification Methods',
          type: 'text',
          content: "**Common techniques:**\n\n**Brainstorming:** Cross-functional teams identify risks\n**Interviews:** Key personnel discuss concerns\n**Checklists:** Industry-specific risk inventories\n**Process analysis:** Map processes, identify failure points\n**Scenario analysis:** \"What if\" situations\n**SWOT analysis:** Threats are external risks\n**Historical data:** Past incidents and near-misses\n\n**Use multiple methods for completeness!**",
        },
        {
          title: 'Risk Assessment: Two Dimensions',
          type: 'text',
          content: "**Every risk is assessed on:**\n\n**1. Likelihood (Probability):**\nHow likely is the risk event to occur?\n(Scale: Rare → Unlikely → Possible → Likely → Almost Certain)\n\n**2. Impact (Consequence):**\nWhat's the magnitude if it occurs?\n(Scale: Insignificant → Minor → Moderate → Major → Catastrophic)\n\n**Risk Rating = Likelihood × Impact**",
        },
        {
          title: 'Risk Assessment Matrix (Heat Map)',
          type: 'table',
          headers: ['Impact →', 'Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'],
          rows: [
            ['Catastrophic', 'Medium', 'High', 'High', 'Extreme', 'Extreme'],
            ['Major', 'Medium', 'Medium', 'High', 'High', 'Extreme'],
            ['Moderate', 'Low', 'Medium', 'Medium', 'High', 'High'],
            ['Minor', 'Low', 'Low', 'Medium', 'Medium', 'High'],
            ['Insignificant', 'Low', 'Low', 'Low', 'Low', 'Medium'],
          ],
        },
        {
          title: '🧠 Memory Aid: Risk Assessment',
          type: 'callout',
          content: "**\"L × I = R\"**\n\n**L**ikelihood × **I**mpact = **R**isk rating\n\n**Focus on:**\n• High likelihood + High impact = EXTREME (address NOW)\n• High likelihood + Low impact = Manage operationally\n• Low likelihood + High impact = Monitor/insure\n• Low likelihood + Low impact = Accept/ignore\n\n**The upper right corner needs immediate attention!**",
        },
        {
          title: 'Inherent vs. Residual Risk',
          type: 'text',
          content: "**Inherent risk:**\nRisk level BEFORE considering controls/mitigation\n(\"Gross\" risk)\n\n**Residual risk:**\nRisk level AFTER controls are applied\n(\"Net\" risk)\n\n**Risk response effectiveness:**\nResidual = Inherent - Control effectiveness\n\n**Example:**\nCyber attack: Inherent = Extreme\nAfter firewalls, training, backups: Residual = Medium\n\n**Compare residual risk to risk tolerance!**",
        },
        {
          title: 'Quantitative Risk Assessment',
          type: 'text',
          content: "**Putting numbers on risk:**\n\n**Expected loss = Probability × Impact ($)**\n\n**Example:**\n5% chance of $1 million loss\nExpected loss = 0.05 × $1,000,000 = $50,000\n\n**Value at Risk (VaR):**\nMaximum expected loss at given confidence level\n\"We are 95% confident losses won't exceed $X\"\n\n**Monte Carlo simulation:**\nModel thousands of scenarios probabilistically\n\n*Quantification enables cost-benefit analysis of mitigation!*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Use multiple methods to identify risks comprehensively",
            "Assess risks on likelihood and impact",
            "Risk = Likelihood × Impact (use matrix/heat map)",
            "Inherent vs. Residual: Before and after controls",
            "Extreme risks require immediate attention",
            "Quantify risks when possible: Expected loss = P × I",
            "Compare residual risk to risk tolerance",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-D-003',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Risk Mitigation Strategies',
    description: 'Explore options for responding to identified risks',
    order: 36,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Risk response', 'Avoidance', 'Reduction', 'Transfer', 'Acceptance'],
    blueprintArea: 'CMA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Once risks are identified and assessed, what do we do about them? CMAs evaluate risk response options, weighing costs against benefits. The goal is to bring residual risk within acceptable tolerance while considering resource constraints.",
        },
        {
          title: 'The Four Risk Responses',
          type: 'table',
          headers: ['Response', 'Action', 'When to Use'],
          rows: [
            ['Avoid', 'Eliminate the risk entirely', 'Risk exceeds appetite; no acceptable control'],
            ['Reduce/Mitigate', 'Decrease likelihood or impact', 'Controls are cost-effective'],
            ['Transfer/Share', 'Shift risk to third party', 'Insurance, contracts, hedging'],
            ['Accept', 'Retain the risk as-is', 'Within tolerance; mitigation too costly'],
          ],
        },
        {
          title: 'Risk Avoidance',
          type: 'text',
          content: "**Eliminate the activity that creates risk:**\n\n**Examples:**\n• Don't enter a risky market\n• Discontinue a dangerous product\n• Avoid high-risk customers\n• Exit an unstable region\n\n**Advantages:**\nRisk completely eliminated\n\n**Disadvantages:**\nMay forfeit opportunity\nNot always possible for core activities\n\n*Avoidance may mean avoiding profit too!*",
        },
        {
          title: 'Risk Reduction/Mitigation',
          type: 'text',
          content: "**Decrease probability or impact through controls:**\n\n**Examples:**\n• Safety training (reduce accident likelihood)\n• Fire suppression systems (reduce fire impact)\n• Inventory buffers (reduce supply chain impact)\n• Cybersecurity measures (reduce breach likelihood)\n\n**Cost-benefit analysis:**\nCost of control vs. Expected loss reduction\n\n**Implement if:** Cost < Expected benefit",
        },
        {
          title: '🧠 Memory Aid: Risk Responses',
          type: 'callout',
          content: "**\"ARTA\"** - Four T's variation:\n\n**A**void: Get out (don't play the game)\n**R**educe: Control it (play safer)\n**T**ransfer: Pass it (let someone else play)\n**A**ccept: Live with it (keep playing as-is)\n\n**Choose based on:**\n• Risk vs. Reward tradeoff\n• Cost of response\n• Risk appetite/tolerance",
        },
        {
          title: 'Risk Transfer',
          type: 'text',
          content: "**Shift risk to a third party:**\n\n**Insurance:**\n• Property, liability, business interruption\n• Pay premium to transfer financial impact\n\n**Contracts:**\n• Hold-harmless clauses\n• Warranty/guarantee requirements\n• Outsourcing with SLAs\n\n**Hedging:**\n• Derivatives for financial risks\n\n**Note:** Transfer doesn't eliminate risk, just financially shifts it!\nReputational risk often can't be transferred.",
        },
        {
          title: 'Risk Acceptance',
          type: 'text',
          content: "**Consciously retain the risk:**\n\n**Active acceptance:**\n• Establish contingency plans\n• Reserve funds for potential losses\n• Monitor the risk\n\n**Passive acceptance:**\n• No specific action taken\n• Appropriate only for minor risks\n\n**Reasons to accept:**\n• Within risk tolerance\n• Cost of mitigation exceeds benefit\n• Risk is inherent to business strategy\n\n**Document the acceptance decision!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four responses: Avoid, Reduce, Transfer, Accept",
            "Avoid = Eliminate the activity creating risk",
            "Reduce = Controls to decrease likelihood/impact",
            "Transfer = Insurance, contracts, hedging",
            "Accept = Retain within tolerance",
            "Choose response based on cost-benefit analysis",
            "Document all risk response decisions",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-D-004',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Financial Risk Management',
    description: 'Manage interest rate, currency, credit, and liquidity risks',
    order: 37,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Interest rate risk', 'Currency risk', 'Credit risk', 'Liquidity risk'],
    blueprintArea: 'CMA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Financial risks can devastate even operationally excellent companies. CMAs must understand interest rate, currency, credit, and liquidity risks - and the tools to manage them. These risks interact and can cascade during crises!",
        },
        {
          title: 'Interest Rate Risk',
          type: 'text',
          content: "**Risk that interest rate changes hurt financial position:**\n\n**For borrowers (variable rate debt):**\nRising rates → Higher interest expense\n\n**For investors (fixed rate bonds):**\nRising rates → Bond values decline\n\n**Measurement:**\n• Duration (sensitivity to rate changes)\n• Gap analysis (asset/liability mismatch)\n\n**Management:**\n• Match fixed/variable assets and liabilities\n• Interest rate swaps\n• Interest rate caps/floors",
        },
        {
          title: 'Currency (Foreign Exchange) Risk',
          type: 'text',
          content: "**Risk from exchange rate fluctuations:**\n\n**Transaction exposure:**\nExisting contractual cash flows in foreign currency\n\n**Translation exposure:**\nConverting foreign subsidiary financials\n\n**Economic exposure:**\nLong-term competitive position from FX changes\n\n**Management:**\n• Natural hedging (match currency revenues/costs)\n• Forward contracts (lock in rate)\n• Currency options (protection with upside)",
        },
        {
          title: '🧠 Memory Aid: Currency Risk Types',
          type: 'callout',
          content: "**\"TTE\"** - Three exposures:\n\n**T**ransaction: Known future cash flows (hedgeable!)\n**T**ranslation: Accounting conversion (paper only)\n**E**conomic: Long-term competitiveness (strategic)\n\n**Transaction risk is most directly hedgeable!\nEconomic risk requires strategic response.**",
        },
        {
          title: 'Credit Risk',
          type: 'text',
          content: "**Risk that counterparty fails to pay:**\n\n**Sources:**\n• Customer non-payment (accounts receivable)\n• Bond default\n• Counterparty default on derivatives\n\n**Assessment:**\n• Credit analysis (5 C's: Character, Capacity, Capital, Collateral, Conditions)\n• Credit ratings (S&P, Moody's)\n• Credit scoring models\n\n**Management:**\n• Credit limits\n• Collateral requirements\n• Credit insurance\n• Diversification\n• Credit derivatives (CDS)",
        },
        {
          title: 'Liquidity Risk',
          type: 'text',
          content: "**Two dimensions:**\n\n**Funding liquidity:**\nAbility to meet obligations as they come due\n(Can we pay our bills?)\n\n**Market liquidity:**\nAbility to sell assets without significant loss\n(Can we convert assets to cash?)\n\n**Management:**\n• Cash reserves and buffers\n• Credit facilities (backup lines)\n• Asset-liability matching\n• Stress testing\n• Contingency funding plan\n\n*Liquidity kills companies faster than losses!*",
        },
        {
          title: 'Financial Risk Summary',
          type: 'table',
          headers: ['Risk Type', 'Primary Driver', 'Key Hedging Tool'],
          rows: [
            ['Interest rate', 'Rate volatility', 'Swaps, caps/floors'],
            ['Currency', 'Exchange rates', 'Forwards, options'],
            ['Credit', 'Counterparty default', 'Credit limits, CDS'],
            ['Liquidity', 'Cash flow mismatch', 'Credit lines, reserves'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Interest rate risk: Use duration, swaps, caps/floors",
            "Currency risk: Transaction, Translation, Economic exposures",
            "Credit risk: The 5 C's; managed by limits, collateral, insurance",
            "Liquidity risk: Funding (pay bills) and Market (sell assets)",
            "Match asset and liability characteristics",
            "Diversification reduces some risks",
            "Stress testing reveals vulnerabilities",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-D-005',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Hedging with Derivatives',
    description: 'Use derivatives to manage financial risks',
    order: 38,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Forwards', 'Futures', 'Options', 'Swaps'],
    blueprintArea: 'CMA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Derivatives are powerful tools for managing financial risk. CMAs must understand how forwards, futures, options, and swaps work - and how to use them appropriately. Misuse of derivatives has caused spectacular failures; proper use provides stability.",
        },
        {
          title: 'What Are Derivatives?',
          type: 'text',
          content: "**Financial instruments whose value derives from an underlying asset:**\n\n**Underlying assets:**\n• Currencies\n• Interest rates\n• Commodities\n• Stocks/indices\n\n**Uses:**\n• Hedging (reduce risk)\n• Speculation (take on risk)\n• Arbitrage (exploit price differences)\n\n**CMAs focus on HEDGING - using derivatives to REDUCE risk!**",
        },
        {
          title: 'Forward Contracts',
          type: 'text',
          content: "**Agreement to buy/sell asset at future date for price set today:**\n\n**Characteristics:**\n• Customized (OTC - over-the-counter)\n• Obligation for both parties\n• No cash changes hands until settlement\n• Counterparty risk\n\n**Example:**\nCompany expects €1,000,000 payment in 90 days\nEnters forward to sell €1M at rate $1.10/€\nLocks in $1,100,000 regardless of spot rate in 90 days\n\n**Eliminates uncertainty, but also eliminates upside!**",
        },
        {
          title: 'Futures Contracts',
          type: 'text',
          content: "**Like forwards, but standardized and exchange-traded:**\n\n**Differences from forwards:**\n• Standardized terms (size, dates)\n• Exchange-traded (clearinghouse guarantee)\n• Marked-to-market daily\n• Margin requirements\n• Highly liquid\n\n**Common futures:**\n• Currency futures\n• Interest rate futures (T-bonds, Eurodollars)\n• Commodity futures (oil, gold, wheat)\n• Index futures (S&P 500)",
        },
        {
          title: '🧠 Memory Aid: Forwards vs. Futures',
          type: 'callout',
          content: "**\"Forwards are FLEXIBLE, Futures are FORMAL\"**\n\n**Forwards:**\n• Custom terms\n• OTC (over-the-counter)\n• Counterparty risk\n• No margin\n\n**Futures:**\n• Standardized\n• Exchange-traded\n• Clearinghouse guarantee\n• Daily margin calls\n\n**Both are OBLIGATIONS - must settle!**",
        },
        {
          title: 'Options',
          type: 'text',
          content: "**Right (not obligation) to buy/sell at specified price:**\n\n**Call option:** Right to BUY\n**Put option:** Right to SELL\n\n**Key terms:**\n• Strike price: Price at which option can be exercised\n• Premium: Cost to purchase the option\n• Expiration: Date option expires\n\n**Example:**\nBuy call option on €1M at strike $1.12, premium $20,000\n• If spot > $1.12: Exercise option, buy at $1.12\n• If spot < $1.12: Let expire, buy at lower spot\n\n**Provides protection with upside potential!**",
        },
        {
          title: 'Interest Rate Swaps',
          type: 'text',
          content: "**Exchange interest payment streams:**\n\n**Plain vanilla swap:**\nFixed rate payments ↔ Floating rate payments\n(Same notional principal, same currency)\n\n**Example:**\nCompany has $10M floating rate loan\nWorried rates will rise\nEnters swap: Pay fixed 5%, receive floating rate\n\n**Net effect:**\nFloating on loan cancels with floating received\n→ Company effectively pays fixed 5%\n\n**Converts floating to fixed exposure!**",
        },
        {
          title: 'Derivative Positions',
          type: 'table',
          headers: ['Position', 'Profits When', 'Risk Profile'],
          rows: [
            ['Long forward/future', 'Price rises', 'Unlimited up/downside'],
            ['Short forward/future', 'Price falls', 'Unlimited up/downside'],
            ['Long call', 'Price rises above strike', 'Max loss = Premium'],
            ['Long put', 'Price falls below strike', 'Max loss = Premium'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Hedge Accounting',
          type: 'warning',
          content: "**Under GAAP, derivatives are marked to market on balance sheet:**\n\n**Problem:** Gains/losses on hedge create P&L volatility\neven if hedge is effective.\n\n**Solution:** Hedge accounting (ASC 815)\n• Designate as hedge upfront\n• Document hedge relationship\n• Assess effectiveness\n• Match derivative gains/losses with hedged item\n\n**Without hedge accounting, P&L can be volatile!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Derivatives derive value from underlying assets",
            "Forwards: Custom, OTC, counterparty risk",
            "Futures: Standardized, exchange-traded, margined",
            "Options: Right (not obligation); premium = max loss",
            "Swaps: Exchange payment streams (e.g., fixed for floating)",
            "Hedging reduces risk; speculation increases it",
            "Hedge accounting matches gains/losses with hedged item",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-D-006',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Operational and Strategic Risk',
    description: 'Manage non-financial risks including operational, reputational, and strategic',
    order: 39,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Operational risk', 'Business continuity', 'Reputational risk', 'Strategic risk'],
    blueprintArea: 'CMA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Not all risks are financial. Operational failures, reputational damage, and strategic missteps can be equally devastating. CMAs must understand these non-financial risks and how to incorporate them into enterprise risk management.",
        },
        {
          title: 'Operational Risk',
          type: 'text',
          content: "**Risk of loss from failed internal processes, people, or systems:**\n\n**Categories:**\n• Process failures (errors, delays)\n• People (fraud, incompetence, turnover)\n• Systems (IT failures, cyber attacks)\n• External events (natural disasters, terrorism)\n\n**Examples:**\n• Data breach\n• Equipment breakdown\n• Employee fraud\n• Supply chain disruption\n\n**Management:** Controls, redundancy, training, monitoring",
        },
        {
          title: 'Business Continuity Planning',
          type: 'text',
          content: "**Preparing for and recovering from disruptions:**\n\n**Key components:**\n\n**Business Impact Analysis (BIA):**\nIdentify critical processes and recovery priorities\n\n**Recovery strategies:**\n• Backup facilities\n• Data backup/recovery\n• Alternative suppliers\n• Remote work capabilities\n\n**Crisis management:**\n• Communication plans\n• Decision authority\n• Succession planning\n\n**Testing:**\nRegular drills and simulations",
        },
        {
          title: '🧠 Memory Aid: BCP Steps',
          type: 'callout',
          content: "**\"BIRDT\"** - Business Continuity:\n\n**B**IA - Business Impact Analysis\n**I**dentify recovery strategies\n**R**esources needed for recovery\n**D**ocument the plan\n**T**est regularly\n\n**A plan that hasn't been tested is just a wish!**",
        },
        {
          title: 'Reputational Risk',
          type: 'text',
          content: "**Risk that negative perceptions harm the business:**\n\n**Triggers:**\n• Ethical lapses\n• Product failures/recalls\n• Environmental incidents\n• Social media crises\n• Data breaches\n\n**Consequences:**\n• Customer defection\n• Difficulty hiring\n• Investor concerns\n• Regulatory scrutiny\n\n**Management:**\n• Strong ethical culture\n• Crisis communication plan\n• Social media monitoring\n• Stakeholder engagement\n\n*Reputation takes years to build, moments to destroy!*",
        },
        {
          title: 'Strategic Risk',
          type: 'text',
          content: "**Risk that strategic decisions or external changes harm value:**\n\n**Sources:**\n• Poor strategic choices\n• Disruptive technology\n• Changing customer preferences\n• Regulatory changes\n• New competitors\n\n**Examples:**\n• Kodak and digital photography\n• Blockbuster and streaming\n• Taxi industry and ride-sharing\n\n**Management:**\n• Environmental scanning\n• Scenario planning\n• Strategic flexibility\n• Innovation investment",
        },
        {
          title: 'Comparing Risk Categories',
          type: 'table',
          headers: ['Risk Type', 'Primary Focus', 'Key Management Tool'],
          rows: [
            ['Operational', 'Internal failures', 'Controls, redundancy'],
            ['Business continuity', 'Disruption recovery', 'BCP, backup systems'],
            ['Reputational', 'Stakeholder perception', 'Culture, communication'],
            ['Strategic', 'Long-term positioning', 'Scenario planning, agility'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Operational risk: Failed processes, people, or systems",
            "BCP ensures recovery from disruptions",
            "Reputational risk can cascade from any other risk",
            "Strategic risk relates to long-term competitive position",
            "All risk types are interconnected",
            "Culture is foundational to non-financial risk management",
            "Regular testing validates recovery capabilities",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA2DLessons = () => cma2DLessons;
export const getCMA2DLessonById = (id: string) => cma2DLessons.find(lesson => lesson.id === id);
export const getCMA2DLessonCount = () => cma2DLessons.length;

export default cma2DLessons;
