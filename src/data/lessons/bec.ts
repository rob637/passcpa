import { Lesson } from '../../types';

/**
 * BEC - Business Environment and Concepts Lessons
 * 
 * ⚠️ IMPORTANT: BEC is part of the 2025 Blueprint (testable through June 30, 2026)
 * Starting July 1, 2026, BEC is replaced by BAR, ISC, and TCP disciplines.
 * 
 * This content is designed for candidates testing under the 2025 Blueprint.
 */

export const becLessons: Lesson[] = [
  // ==========================================
  // AREA 1: CORPORATE GOVERNANCE
  // ==========================================
  {
    id: 'BEC-I-001',
    section: 'BEC',
    title: 'Corporate Governance Overview',
    description: 'Understand the foundations of corporate governance and accountability',
    order: 1,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Corporate Governance', 'Board of Directors'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Corporate governance is fundamental to the CPA exam! Understanding how organizations are directed and controlled affects audit considerations, financial reporting, and business strategy. BEC tests these concepts heavily!"
        },
        {
          title: 'What is Corporate Governance?',
          type: 'text',
          content: "**Corporate governance is the system by which companies are directed and controlled.**\n\n**Key components:**\n• Board of Directors oversight\n• Executive management accountability\n• Shareholder rights protection\n• Stakeholder relationships\n• Ethical business conduct"
        },
        {
          title: 'Governance Framework',
          type: 'table',
          headers: ['Level', 'Responsibility'],
          rows: [
            ['Shareholders', 'Elect board, approve major decisions'],
            ['Board of Directors', 'Oversight, strategic direction, hire CEO'],
            ['Executive Management', 'Day-to-day operations, execute strategy'],
            ['Internal Audit', 'Independent assurance, risk assessment']
          ]
        },
        {
          title: '🧠 Memory Aid: Governance Hierarchy',
          type: 'callout',
          content: "**\"SBEI\"** - Top to Bottom:\n\n**S**hareholders (owners)\n**B**oard (oversight)\n**E**xecutives (manage)\n**I**nternal Audit (assurance)\n\n**Think: \"Some Boards Evaluate Internally\"**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Corporate governance = system of direction and control",
            "Shareholders → Board → Management → Operations",
            "Board provides oversight, not day-to-day management",
            "Internal audit provides independent assurance"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-I-002',
    section: 'BEC',
    title: 'Board of Directors Responsibilities',
    description: 'Learn the key roles and responsibilities of the board of directors',
    order: 2,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Corporate Governance', 'Board of Directors'],
    content: {
      sections: [
        {
          title: 'Primary Board Responsibilities',
          type: 'text',
          content: "**The Board's key duties:**\n\n• **Strategic oversight** - Set direction, not manage\n• **CEO selection** - Hire, evaluate, compensate, fire\n• **Financial oversight** - Approve budgets, major transactions\n• **Risk management** - Ensure appropriate risk controls\n• **Compliance** - Legal and regulatory adherence"
        },
        {
          title: 'Board Committees',
          type: 'table',
          headers: ['Committee', 'Primary Function'],
          rows: [
            ['Audit Committee', 'Financial reporting, external auditor oversight'],
            ['Compensation Committee', 'Executive pay, incentive plans'],
            ['Nominating Committee', 'Board member selection'],
            ['Risk Committee', 'Enterprise risk management']
          ]
        },
        {
          title: '⚠️ Exam Trap: Board vs Management',
          type: 'warning',
          content: "**The Board does NOT:**\n\n• Run day-to-day operations (that's management)\n• Prepare financial statements\n• Conduct the audit\n• Make routine business decisions\n\n**The Board DOES oversee all of the above!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Board provides strategic oversight, not operational management",
            "Key committees: Audit, Compensation, Nominating, Risk",
            "Board hires/fires CEO and oversees executive compensation",
            "Audit committee must be all independent directors (SOX)"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-I-003',
    section: 'BEC',
    title: 'Sarbanes-Oxley Act (SOX) Requirements',
    description: 'Master the key corporate governance requirements under SOX',
    order: 3,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Corporate Governance', 'SOX', 'Internal Controls'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "SOX fundamentally changed corporate accountability after Enron and WorldCom! These requirements appear across BEC, AUD, and REG. Understanding SOX is essential for any CPA!"
        },
        {
          title: 'Key SOX Sections',
          type: 'table',
          headers: ['Section', 'Requirement'],
          rows: [
            ['Section 302', 'CEO/CFO certify financial statements'],
            ['Section 404', 'Management assessment of internal controls'],
            ['Section 301', 'Audit committee independence'],
            ['Section 802', 'Document retention (7 years minimum)'],
            ['Section 906', 'Criminal penalties for false certification']
          ]
        },
        {
          title: 'Section 404 Deep Dive',
          type: 'text',
          content: "**Section 404 - Internal Control Requirements:**\n\n**Management must:**\n• Assess effectiveness of ICFR\n• Include assessment in annual report\n• Identify control deficiencies\n\n**Large accelerated filers:**\n• Require auditor attestation\n• Must use recognized framework (COSO)"
        },
        {
          title: '🧠 Memory Aid: SOX Key Sections',
          type: 'callout',
          content: "**\"302-404-906\"** - The Big Three:\n\n**302** = CEO/CFO **Certify** (3+0+2 = 5 letters)\n**404** = **ICFR** Assessment (4+0+4 = Internal Controls)\n**906** = **Criminal** Penalties (9-0-6 = serious!)\n\n**Remember: Certify → Controls → Criminal**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Section 302: CEO/CFO personally certify financials",
            "Section 404: Management must assess and report on ICFR",
            "Section 301: Audit committee must be 100% independent",
            "Criminal penalties exist for false certifications",
            "Document retention minimum is 7 years"
          ]
        }
      ]
    }
  },

  // ==========================================
  // AREA 2: ECONOMIC CONCEPTS
  // ==========================================
  {
    id: 'BEC-II-001',
    section: 'BEC',
    title: 'Supply and Demand Fundamentals',
    description: 'Understand basic economic principles of supply and demand',
    order: 4,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Economics', 'Microeconomics'],
    content: {
      sections: [
        {
          title: 'Law of Demand',
          type: 'text',
          content: "**As price increases, quantity demanded decreases (inverse relationship)**\n\n**Demand curve slopes downward:**\n• Higher prices = less purchased\n• Lower prices = more purchased\n\n**\"Ceteris paribus\" = all else equal**"
        },
        {
          title: 'Law of Supply',
          type: 'text',
          content: "**As price increases, quantity supplied increases (direct relationship)**\n\n**Supply curve slopes upward:**\n• Higher prices = more produced\n• Lower prices = less produced\n\n**Producers want to sell more at higher prices!**"
        },
        {
          title: 'Market Equilibrium',
          type: 'table',
          headers: ['Situation', 'Result'],
          rows: [
            ['Price above equilibrium', 'Surplus (excess supply)'],
            ['Price below equilibrium', 'Shortage (excess demand)'],
            ['At equilibrium', 'Quantity supplied = Quantity demanded']
          ]
        },
        {
          title: '🧠 Memory Aid: Supply vs Demand Curves',
          type: 'callout',
          content: "**Demand = Down** (slopes downward)\n**Supply = Skyward** (slopes upward)\n\n**D for Demand = D for Down**\n**S for Supply = S for Skyward**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Demand: Inverse relationship (price ↑, quantity demanded ↓)",
            "Supply: Direct relationship (price ↑, quantity supplied ↑)",
            "Equilibrium: Where supply and demand intersect",
            "Surplus = price too high; Shortage = price too low"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-II-002',
    section: 'BEC',
    title: 'Price Elasticity of Demand',
    description: 'Calculate and interpret elasticity measures',
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Economics', 'Elasticity'],
    content: {
      sections: [
        {
          title: 'What is Elasticity?',
          type: 'text',
          content: "**Elasticity measures responsiveness to price changes.**\n\n**Formula:**\n\nPrice Elasticity = (% Change in Quantity Demanded) / (% Change in Price)\n\n**Always expressed as absolute value**"
        },
        {
          title: 'Elasticity Ranges',
          type: 'table',
          headers: ['Elasticity Value', 'Classification', 'Meaning'],
          rows: [
            ['> 1', 'Elastic', 'Very responsive to price'],
            ['= 1', 'Unit Elastic', 'Proportionally responsive'],
            ['< 1', 'Inelastic', 'Less responsive to price'],
            ['= 0', 'Perfectly Inelastic', 'No response (vertical curve)'],
            ['= ∞', 'Perfectly Elastic', 'Infinitely responsive (horizontal)']
          ]
        },
        {
          title: 'Factors Affecting Elasticity',
          type: 'list',
          content: [
            "**Substitutes available** - More substitutes = more elastic",
            "**Necessity vs luxury** - Necessities = inelastic",
            "**Time horizon** - Longer time = more elastic",
            "**Portion of income** - Higher % of income = more elastic",
            "**Brand loyalty** - Strong loyalty = inelastic"
          ]
        },
        {
          title: '⚠️ Exam Trap: Elasticity Calculations',
          type: 'warning',
          content: "**If elasticity = -2.0 and price increases 10%:**\n\n% Change in Qty = Elasticity × % Price Change\n= -2.0 × 10% = **-20% (quantity decreases 20%)**\n\n**The negative sign shows inverse relationship!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Elasticity = % change in quantity / % change in price",
            "Elastic > 1; Inelastic < 1; Unit elastic = 1",
            "More substitutes and luxury goods = more elastic",
            "Use elasticity to predict quantity changes from price changes"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-II-003',
    section: 'BEC',
    title: 'Business Cycles and Economic Indicators',
    description: 'Understand economic cycles and key indicators',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Economics', 'Macroeconomics'],
    content: {
      sections: [
        {
          title: 'Business Cycle Phases',
          type: 'table',
          headers: ['Phase', 'Characteristics'],
          rows: [
            ['Expansion', 'Rising GDP, employment, spending'],
            ['Peak', 'Maximum economic activity'],
            ['Contraction/Recession', 'Declining GDP, rising unemployment'],
            ['Trough', 'Lowest point before recovery']
          ]
        },
        {
          title: 'Economic Indicators',
          type: 'table',
          headers: ['Type', 'Examples', 'Timing'],
          rows: [
            ['Leading', 'Stock prices, building permits, new orders', 'Predict future'],
            ['Coincident', 'GDP, employment, industrial production', 'Current state'],
            ['Lagging', 'Unemployment rate, CPI, interest rates', 'Confirm trends']
          ]
        },
        {
          title: '🧠 Memory Aid: Indicator Timing',
          type: 'callout',
          content: "**\"LCL\" - Leading, Coincident, Lagging:**\n\n**L**eading = **L**ook ahead (stocks predict)\n**C**oincident = **C**urrent (GDP is now)\n**L**agging = **L**ate to change (unemployment)\n\n**Stocks lead, GDP is now, unemployment lags!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Business cycle: Expansion → Peak → Contraction → Trough",
            "Leading indicators predict (stock prices, building permits)",
            "Coincident indicators show current state (GDP, employment)",
            "Lagging indicators confirm (unemployment rate, CPI)"
          ]
        }
      ]
    }
  },

  // ==========================================
  // AREA 3: FINANCIAL MANAGEMENT
  // ==========================================
  {
    id: 'BEC-III-001',
    section: 'BEC',
    title: 'Time Value of Money',
    description: 'Master present value and future value calculations',
    order: 7,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Financial Management', 'Time Value of Money'],
    content: {
      sections: [
        {
          title: 'Core Concept',
          type: 'text',
          content: "**A dollar today is worth more than a dollar tomorrow.**\n\n**Why?**\n• Investment opportunity (earning interest)\n• Inflation erodes purchasing power\n• Risk increases with time\n\n**TVM is the foundation of all finance!**"
        },
        {
          title: 'Key Formulas',
          type: 'table',
          headers: ['Concept', 'Formula'],
          rows: [
            ['Future Value', 'FV = PV × (1 + r)^n'],
            ['Present Value', 'PV = FV / (1 + r)^n'],
            ['FV of Annuity', 'FVA = PMT × [(1+r)^n - 1] / r'],
            ['PV of Annuity', 'PVA = PMT × [1 - (1+r)^-n] / r']
          ]
        },
        {
          title: 'Ordinary Annuity vs Annuity Due',
          type: 'text',
          content: "**Ordinary Annuity:**\n• Payments at END of each period\n• Most common (loan payments, bonds)\n\n**Annuity Due:**\n• Payments at BEGINNING of period\n• Rent, lease payments\n• Worth MORE than ordinary annuity (earlier payments)"
        },
        {
          title: '⚠️ Exam Trap: Annuity Due Adjustment',
          type: 'warning',
          content: "**Annuity Due = Ordinary Annuity × (1 + r)**\n\n**Example:** If PV of ordinary annuity = $10,000 and r = 10%\n\nPV of annuity due = $10,000 × 1.10 = **$11,000**\n\n**Annuity due is always LARGER!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "TVM: Money today > money tomorrow",
            "Present Value discounts future cash flows",
            "Future Value compounds current amounts",
            "Annuity due > ordinary annuity (earlier payments)",
            "Use tables or calculator for complex problems"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-III-002',
    section: 'BEC',
    title: 'Capital Budgeting Methods',
    description: 'Evaluate investment decisions using NPV, IRR, and payback',
    order: 8,
    duration: 60,
    difficulty: 'advanced',
    topics: ['Financial Management', 'Capital Budgeting'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Capital budgeting decisions determine which long-term investments a company makes. Understanding NPV, IRR, and payback is essential for BEC and real-world financial decision-making!"
        },
        {
          title: 'Capital Budgeting Methods',
          type: 'table',
          headers: ['Method', 'Formula/Approach', 'Decision Rule'],
          rows: [
            ['NPV', 'Sum of discounted cash flows - initial investment', 'Accept if NPV > 0'],
            ['IRR', 'Rate where NPV = 0', 'Accept if IRR > cost of capital'],
            ['Payback', 'Time to recover initial investment', 'Accept if < target period'],
            ['Profitability Index', 'PV of cash flows / Initial investment', 'Accept if PI > 1']
          ]
        },
        {
          title: 'NPV vs IRR Comparison',
          type: 'text',
          content: "**NPV Advantages:**\n• Measures dollar value added\n• Assumes reinvestment at cost of capital (more realistic)\n• Works for all cash flow patterns\n\n**IRR Advantages:**\n• Easy to compare (percentage)\n• Doesn't require cost of capital input\n\n**When they conflict: USE NPV!**"
        },
        {
          title: '🧠 Memory Aid: Decision Rules',
          type: 'callout',
          content: "**\"POSITIVE is GOOD\":**\n\n• NPV **> 0** = Accept\n• IRR **> Cost of Capital** = Accept\n• PI **> 1** = Accept\n\n**All three say the same thing: VALUE ADDED!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NPV is the preferred method (measures value creation)",
            "IRR = discount rate where NPV equals zero",
            "When NPV and IRR conflict, use NPV",
            "Payback ignores time value (weakness)",
            "Accept projects with NPV > 0, IRR > cost of capital, PI > 1"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-III-003',
    section: 'BEC',
    title: 'Working Capital Management',
    description: 'Manage current assets and liabilities effectively',
    order: 9,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Financial Management', 'Working Capital'],
    content: {
      sections: [
        {
          title: 'Working Capital Defined',
          type: 'text',
          content: "**Working Capital = Current Assets - Current Liabilities**\n\n**Components:**\n• Cash and cash equivalents\n• Accounts receivable\n• Inventory\n• Accounts payable\n• Short-term debt"
        },
        {
          title: 'Cash Conversion Cycle',
          type: 'table',
          headers: ['Component', 'Formula'],
          rows: [
            ['Days Inventory Outstanding (DIO)', '(Avg Inventory / COGS) × 365'],
            ['Days Sales Outstanding (DSO)', '(Avg AR / Revenue) × 365'],
            ['Days Payables Outstanding (DPO)', '(Avg AP / COGS) × 365'],
            ['Cash Conversion Cycle', 'DIO + DSO - DPO']
          ]
        },
        {
          title: 'Working Capital Strategies',
          type: 'text',
          content: "**Aggressive (Low WC):**\n• Less cash tied up\n• Higher risk of stockouts/illiquidity\n• Lower financing costs\n\n**Conservative (High WC):**\n• More safety cushion\n• Higher carrying costs\n• Lower risk"
        },
        {
          title: '⚠️ Exam Trap: Cash Cycle Interpretation',
          type: 'warning',
          content: "**Lower cash conversion cycle = BETTER!**\n\n**To improve (shorten) the cycle:**\n• Collect receivables faster (↓ DSO)\n• Sell inventory faster (↓ DIO)\n• Pay suppliers slower (↑ DPO)\n\n**Negative CCC is possible and GREAT!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Working capital = Current assets - Current liabilities",
            "Cash conversion cycle = DIO + DSO - DPO",
            "Lower CCC means faster cash generation",
            "Balance liquidity needs against carrying costs"
          ]
        }
      ]
    }
  },

  // ==========================================
  // AREA 4: INFORMATION TECHNOLOGY
  // ==========================================
  {
    id: 'BEC-IV-001',
    section: 'BEC',
    title: 'IT General Controls',
    description: 'Understand IT controls that apply across all systems',
    order: 10,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Information Technology', 'IT Controls'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT General Controls (ITGCs) are foundational controls that affect ALL applications. Auditors rely on ITGCs to trust application controls. Understanding these is crucial for BEC and AUD!"
        },
        {
          title: 'ITGC Categories',
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Access Controls', 'User IDs, passwords, authorization levels'],
            ['Change Management', 'System change testing, approval, documentation'],
            ['Computer Operations', 'Job scheduling, backup procedures, incident handling'],
            ['Program Development', 'SDLC, testing, documentation standards']
          ]
        },
        {
          title: 'Logical Access Controls',
          type: 'text',
          content: "**Key principles:**\n\n• **Least privilege** - Minimum access needed\n• **Segregation of duties** - Separate incompatible functions\n• **Need-to-know** - Limit data access\n\n**Authentication methods:**\n• Something you know (password)\n• Something you have (token)\n• Something you are (biometric)"
        },
        {
          title: '🧠 Memory Aid: Authentication Factors',
          type: 'callout',
          content: "**\"Know-Have-Are\":**\n\n**Know** = Password, PIN\n**Have** = Token, smart card, phone\n**Are** = Fingerprint, face, iris\n\n**Multi-factor = 2+ different categories!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ITGCs support all application controls",
            "Four main categories: Access, Change, Operations, Development",
            "Least privilege = minimum necessary access",
            "Multi-factor authentication uses 2+ factor types"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-IV-002',
    section: 'BEC',
    title: 'Business Continuity and Disaster Recovery',
    description: 'Plan for business disruptions and system recovery',
    order: 11,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Information Technology', 'Business Continuity'],
    content: {
      sections: [
        {
          title: 'BCP vs DRP',
          type: 'text',
          content: "**Business Continuity Plan (BCP):**\n• How to continue operations during disruption\n• Broader focus - all business functions\n\n**Disaster Recovery Plan (DRP):**\n• How to restore IT systems after disaster\n• Narrower focus - technology recovery"
        },
        {
          title: 'Key Recovery Metrics',
          type: 'table',
          headers: ['Metric', 'Definition', 'Question Answered'],
          rows: [
            ['RTO', 'Recovery Time Objective', 'How long can we be down?'],
            ['RPO', 'Recovery Point Objective', 'How much data can we lose?'],
            ['MTTR', 'Mean Time to Recovery', 'Avg time to restore service'],
            ['MTBF', 'Mean Time Between Failures', 'Avg time between failures']
          ]
        },
        {
          title: 'Backup Site Types',
          type: 'table',
          headers: ['Type', 'Setup Time', 'Cost'],
          rows: [
            ['Hot Site', 'Minutes to hours', 'Most expensive'],
            ['Warm Site', 'Hours to days', 'Moderate'],
            ['Cold Site', 'Days to weeks', 'Least expensive']
          ]
        },
        {
          title: '🧠 Memory Aid: Hot-Warm-Cold',
          type: 'callout',
          content: "**Think of coffee temperature:**\n\n**Hot** = Ready to drink NOW (fully equipped)\n**Warm** = Needs a minute (partial equipment)\n**Cold** = Need to brew (just empty space)\n\n**Hotter = Faster but More Expensive!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BCP = business operations; DRP = IT recovery",
            "RTO = max downtime; RPO = max data loss",
            "Hot site = fastest/costliest; Cold = slowest/cheapest",
            "Regular testing of plans is essential"
          ]
        }
      ]
    }
  },

  // ==========================================
  // AREA 5: OPERATIONS MANAGEMENT
  // ==========================================
  {
    id: 'BEC-V-001',
    section: 'BEC',
    title: 'Cost Behavior and CVP Analysis',
    description: 'Analyze costs and perform cost-volume-profit analysis',
    order: 12,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Operations Management', 'Cost Accounting'],
    content: {
      sections: [
        {
          title: 'Cost Behavior Patterns',
          type: 'table',
          headers: ['Cost Type', 'Total Cost', 'Per-Unit Cost'],
          rows: [
            ['Variable', 'Changes with activity', 'Constant per unit'],
            ['Fixed', 'Constant in total', 'Decreases per unit'],
            ['Mixed', 'Has both components', 'Varies']
          ]
        },
        {
          title: 'CVP Analysis Formulas',
          type: 'table',
          headers: ['Concept', 'Formula'],
          rows: [
            ['Contribution Margin', 'Sales - Variable Costs'],
            ['CM Ratio', 'CM / Sales'],
            ['Break-even (units)', 'Fixed Costs / CM per unit'],
            ['Break-even (dollars)', 'Fixed Costs / CM Ratio'],
            ['Target Profit (units)', '(Fixed Costs + Target Profit) / CM per unit']
          ]
        },
        {
          title: 'Example Calculation',
          type: 'text',
          content: "**Given:**\n• Selling price: $50/unit\n• Variable cost: $30/unit\n• Fixed costs: $100,000\n\n**Contribution Margin = $50 - $30 = $20/unit**\n**CM Ratio = $20 / $50 = 40%**\n**Break-even = $100,000 / $20 = 5,000 units**"
        },
        {
          title: '⚠️ Exam Trap: Operating Leverage',
          type: 'warning',
          content: "**High fixed costs = High operating leverage**\n\n**Implications:**\n• Greater profit swing with sales changes\n• More risk but more reward\n• Small sales increase → Big profit increase\n\n**DOL = Contribution Margin / Operating Income**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Variable costs change in total, fixed in per-unit",
            "Contribution margin = Sales - Variable costs",
            "Break-even: where CM = Fixed costs",
            "Higher fixed costs = higher operating leverage"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-V-002',
    section: 'BEC',
    title: 'Budgeting and Variance Analysis',
    description: 'Create budgets and analyze performance variances',
    order: 13,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Operations Management', 'Budgeting'],
    content: {
      sections: [
        {
          title: 'Budget Types',
          type: 'table',
          headers: ['Budget Type', 'Description'],
          rows: [
            ['Static', 'Based on one activity level'],
            ['Flexible', 'Adjusts for actual activity level'],
            ['Rolling', 'Continuously updated (add month as one ends)'],
            ['Zero-based', 'Justify all expenses from scratch'],
            ['Activity-based', 'Based on cost drivers']
          ]
        },
        {
          title: 'Variance Analysis Framework',
          type: 'text',
          content: "**Static Budget Variance = Actual - Static Budget**\n\n**Can be broken into:**\n• **Sales Volume Variance** - Due to activity level difference\n• **Flexible Budget Variance** - Due to prices and efficiency\n\n**Favorable (F) = better than expected**\n**Unfavorable (U) = worse than expected**"
        },
        {
          title: 'Material Variances',
          type: 'table',
          headers: ['Variance', 'Formula'],
          rows: [
            ['Price Variance', '(Actual Price - Std Price) × Actual Qty'],
            ['Quantity Variance', '(Actual Qty - Std Qty) × Std Price']
          ]
        },
        {
          title: '🧠 Memory Aid: Variance Responsibility',
          type: 'callout',
          content: "**\"Price = Purchasing, Quantity = Production\"**\n\n**Material price variance** → Purchasing department\n**Material quantity variance** → Production department\n\n**Labor rate variance** → HR/Management\n**Labor efficiency variance** → Production"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Flexible budgets adjust for actual activity",
            "Variances: Favorable (better) vs Unfavorable (worse)",
            "Price variances = purchasing responsibility",
            "Quantity/efficiency variances = production responsibility"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-V-003',
    section: 'BEC',
    title: 'Quality Management and Performance Measures',
    description: 'Implement quality programs and measure performance',
    order: 14,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Operations Management', 'Quality Management'],
    content: {
      sections: [
        {
          title: 'Cost of Quality Categories',
          type: 'table',
          headers: ['Category', 'Examples', 'Type'],
          rows: [
            ['Prevention', 'Training, quality planning', 'Conformance'],
            ['Appraisal', 'Testing, inspection', 'Conformance'],
            ['Internal Failure', 'Rework, scrap', 'Non-conformance'],
            ['External Failure', 'Warranty, returns, lawsuits', 'Non-conformance']
          ]
        },
        {
          title: 'Quality Principles',
          type: 'text',
          content: "**Total Quality Management (TQM):**\n• Customer focus\n• Continuous improvement\n• Employee involvement\n• Process-centered\n\n**Key concept: It's cheaper to PREVENT defects than to FIX them!**"
        },
        {
          title: 'Balanced Scorecard Perspectives',
          type: 'table',
          headers: ['Perspective', 'Key Question'],
          rows: [
            ['Financial', 'How do we look to shareholders?'],
            ['Customer', 'How do customers see us?'],
            ['Internal Process', 'What must we excel at?'],
            ['Learning & Growth', 'Can we continue to improve?']
          ]
        },
        {
          title: '🧠 Memory Aid: Balanced Scorecard',
          type: 'callout',
          content: "**\"FCIL\"** - The Four Perspectives:\n\n**F**inancial (shareholders)\n**C**ustomer (external)\n**I**nternal Process (operations)\n**L**earning & Growth (future)\n\n**Think: \"Financial Customers Improve Learning\"**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Prevention costs < Failure costs (invest in quality upfront)",
            "TQM focuses on continuous improvement",
            "Balanced scorecard: Financial, Customer, Internal, Learning",
            "External failure costs are most damaging (reputation)"
          ]
        }
      ]
    }
  }
];

export default becLessons;
