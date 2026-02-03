import { Lesson } from '../../types';

/**
 * BEC - Business Environment and Concepts Lessons
 * 
 * ⚠️ IMPORTANT: BEC is testable through June 30, 2026 (2025 Blueprint)
 * Starting July 1, 2026, BEC is replaced by BAR, ISC, and TCP disciplines.
 * 
 * Includes Written Communication tasks (unique to BEC section).
 */

export const becLessons: Lesson[] = [
  // ==========================================
  // AREA 1: CORPORATE GOVERNANCE
  // ==========================================
  {
    id: 'BEC-I-001',
    section: 'BEC',
    blueprintArea: 'BEC-I',
    blueprintTopic: 'BEC-I-A-1',
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
    blueprintArea: 'BEC-I',
    blueprintTopic: 'BEC-I-A-2',
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
    blueprintArea: 'BEC-I',
    blueprintTopic: 'BEC-I-B-1',
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
  {
    id: 'BEC-I-004',
    section: 'BEC',
    blueprintArea: 'BEC-I',
    blueprintTopic: 'BEC-I-B-1',
    title: 'Internal Control Frameworks',
    description: 'Apply COSO and other internal control frameworks',
    order: 4,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Internal Controls', 'COSO', 'Risk Management'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Internal controls are fundamental to reliable financial reporting! The COSO framework is THE standard for internal control—used by auditors, management, and regulators. BEC tests these concepts heavily!"
        },
        {
          title: 'COSO Internal Control Framework',
          type: 'text',
          content: "**Committee of Sponsoring Organizations (COSO):**\n\n**Purpose:** Framework for designing, implementing, and evaluating internal control\n\n**Three objectives:**\n1. Effective and efficient operations\n2. Reliable financial reporting\n3. Compliance with laws/regulations\n\n**Used for SOX 404 compliance**"
        },
        {
          title: 'Five Components of Internal Control',
          type: 'table',
          headers: ['Component', 'Description'],
          rows: [
            ['Control Environment', 'Tone at the top, ethics, oversight'],
            ['Risk Assessment', 'Identify and analyze risks'],
            ['Control Activities', 'Policies and procedures'],
            ['Information & Communication', 'Relevant info captured and shared'],
            ['Monitoring', 'Ongoing and separate evaluations']
          ]
        },
        {
          title: '🧠 Memory Aid: COSO Components',
          type: 'callout',
          content: "**\"CRIME\"** for the 5 components:\n\n**C**ontrol Environment (foundation)\n**R**isk Assessment (identify risks)\n**I**nformation & Communication (share info)\n**M**onitoring Activities (evaluate)\n**(Control Activiti)E**s (procedures)\n\n**Or: \"Can Robots Ignore Massive Elephants?\"**"
        },
        {
          title: 'COSO ERM Framework',
          type: 'text',
          content: "**Enterprise Risk Management expands COSO:**\n\n**Additional focus:**\n• Strategic objectives\n• Enterprise-wide risk view\n• Risk appetite and tolerance\n• Portfolio view of risk\n\n**Components:** Governance, Strategy, Performance, Review, Information"
        },
        {
          title: '⚠️ Exam Trap: Limitations of Internal Control',
          type: 'warning',
          content: "**Even good controls have limitations:**\n\n• Human error and judgment\n• Management override\n• Collusion among employees\n• Cost-benefit constraints\n• Unusual transactions\n\n**Reasonable assurance—not absolute!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COSO: Standard framework for internal control",
            "5 components: Environment, Risk, Activities, Info, Monitoring",
            "Control Environment: Foundation (tone at the top)",
            "ERM: Enterprise-wide, strategic risk view",
            "Limitations: Override, collusion, cost-benefit, human error",
            "Reasonable assurance—not absolute guarantee"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-I-005',
    section: 'BEC',
    blueprintArea: 'BEC-I',
    blueprintTopic: 'BEC-I-C-1',
    title: 'Enterprise Risk Management',
    description: 'Implement comprehensive ERM programs',
    order: 5,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Risk Management', 'ERM', 'Strategic Planning'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Risk management is crucial for organizational success! ERM provides a structured approach to identifying, assessing, and responding to risks enterprise-wide. CPAs advise on and evaluate ERM programs!"
        },
        {
          title: 'ERM Definition',
          type: 'text',
          content: "**Enterprise Risk Management:**\n\n\"A process, effected by an entity's board of directors, management, and other personnel, applied in strategy setting and across the enterprise, designed to identify potential events that may affect the entity, and manage risk to be within its risk appetite, to provide reasonable assurance regarding the achievement of entity objectives.\"\n\n**Key: Enterprise-wide, strategy-linked**"
        },
        {
          title: 'Risk Appetite vs Tolerance',
          type: 'text',
          content: "**Risk Appetite:**\n• Amount and type of risk willing to accept\n• Strategic level—set by board\n• \"We're aggressive on growth\"\n\n**Risk Tolerance:**\n• Acceptable variation from objectives\n• Operational level—set by management\n• \"Revenue can vary ±5%\"\n\n**Appetite = How hungry; Tolerance = How much can stomach**"
        },
        {
          title: 'Risk Response Strategies',
          type: 'table',
          headers: ['Strategy', 'Description', 'Example'],
          rows: [
            ['Avoid', 'Eliminate the risk', 'Exit risky business line'],
            ['Reduce', 'Mitigate likelihood/impact', 'Implement controls'],
            ['Share', 'Transfer to third party', 'Insurance, outsourcing'],
            ['Accept', 'Acknowledge and monitor', 'Self-insure small risks']
          ]
        },
        {
          title: '🧠 Memory Aid: Risk Responses',
          type: 'callout',
          content: "**\"ARSA\"** (like the soccer chant!):\n\n**A**void (don't do it)\n**R**educe (control it)\n**S**hare (transfer it)\n**A**ccept (live with it)\n\n**Choose based on risk appetite and cost-benefit!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ERM: Enterprise-wide, strategy-linked risk management",
            "Risk appetite: Strategic willingness to take risk",
            "Risk tolerance: Acceptable variation from objectives",
            "Four responses: Avoid, Reduce, Share, Accept",
            "Board sets appetite; Management manages tolerance",
            "Cost-benefit drives response selection"
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
    blueprintArea: 'BEC-II',
    blueprintTopic: 'BEC-II-A-1',
    title: 'Supply and Demand Fundamentals',
    description: 'Understand basic economic principles of supply and demand',
    order: 6,
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
    blueprintArea: 'BEC-II',
    blueprintTopic: 'BEC-II-A-2',
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
    blueprintArea: 'BEC-II',
    blueprintTopic: 'BEC-II-B-1',
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
    blueprintArea: 'BEC-III',
    blueprintTopic: 'BEC-III-A-1',
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
    blueprintArea: 'BEC-III',
    blueprintTopic: 'BEC-III-A-2',
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
    blueprintArea: 'BEC-III',
    blueprintTopic: 'BEC-III-B-1',
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
    blueprintArea: 'BEC-IV',
    blueprintTopic: 'BEC-IV-A-1',
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
    blueprintArea: 'BEC-IV',
    blueprintTopic: 'BEC-IV-B-1',
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
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-A-1',
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
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-B-1',
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
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-C-1',
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
  },
  {
    id: 'BEC-V-004',
    section: 'BEC',
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-B-1',
    title: 'Process Costing and Job Order Costing',
    description: 'Apply appropriate costing methods to different production environments',
    order: 15,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Cost Accounting', 'Process Costing', 'Job Costing'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Different businesses need different costing methods! Understanding when to use job order vs process costing—and how each works—is essential for BEC and management accounting!"
        },
        {
          title: 'Job Order vs Process Costing',
          type: 'table',
          headers: ['Feature', 'Job Order', 'Process'],
          rows: [
            ['Products', 'Unique, custom', 'Homogeneous, mass'],
            ['Cost tracking', 'By job/batch', 'By department/process'],
            ['Examples', 'Custom furniture, consulting', 'Oil refining, chemicals'],
            ['WIP accounts', 'One per job', 'One per department']
          ]
        },
        {
          title: 'Job Order Costing Flow',
          type: 'text',
          content: "**Cost flow through accounts:**\n\n1. **Raw Materials** → Materials issued to jobs\n2. **Work in Process** → Accumulate DM, DL, OH per job\n3. **Finished Goods** → Job completed\n4. **COGS** → Job delivered to customer\n\n**Each job has its own job cost sheet!**"
        },
        {
          title: 'Process Costing: Equivalent Units',
          type: 'text',
          content: "**Key concept for partially complete units:**\n\n**Equivalent Units = Physical units × % Complete**\n\n**Example:**\n• 1,000 units 40% complete\n• = 400 equivalent units\n\n**Used to allocate costs fairly**"
        },
        {
          title: '🧠 Memory Aid: FIFO vs Weighted Average',
          type: 'callout',
          content: "**Two methods for process costing:**\n\n**Weighted Average:**\n• Blends beginning WIP with current costs\n• Simpler calculation\n• \"What's our average cost?\"\n\n**FIFO:**\n• Keeps periods separate\n• More accurate for performance evaluation\n• \"What did THIS period cost?\""
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Job order: Unique products, costs tracked by job",
            "Process: Homogeneous products, costs by department",
            "Equivalent units: Physical units × % complete",
            "Weighted average: Blends costs (simpler)",
            "FIFO: Keeps periods separate (more accurate)"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-V-005',
    section: 'BEC',
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-D-1',
    title: 'Ratio Analysis and Financial Metrics',
    description: 'Calculate and interpret key financial ratios',
    order: 16,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Financial Analysis', 'Ratios', 'Performance Metrics'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Ratios tell the story behind the numbers! Understanding how to calculate and interpret financial ratios is essential for business analysis, lending decisions, and the BEC exam!"
        },
        {
          title: 'Liquidity Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Measures'],
          rows: [
            ['Current Ratio', 'Current Assets / Current Liabilities', 'Short-term solvency'],
            ['Quick Ratio', '(Cash + AR + Securities) / CL', 'Immediate liquidity'],
            ['Cash Ratio', 'Cash / Current Liabilities', 'Most conservative']
          ]
        },
        {
          title: 'Profitability Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Measures'],
          rows: [
            ['Gross Margin', 'Gross Profit / Revenue', 'Production efficiency'],
            ['Net Profit Margin', 'Net Income / Revenue', 'Overall profitability'],
            ['ROA', 'Net Income / Total Assets', 'Asset utilization'],
            ['ROE', 'Net Income / Equity', 'Return to shareholders']
          ]
        },
        {
          title: 'DuPont Analysis',
          type: 'text',
          content: "**Breaking down ROE:**\n\n**ROE = Net Margin × Asset Turnover × Equity Multiplier**\n\n• Net Margin = NI / Sales (profitability)\n• Asset Turnover = Sales / Assets (efficiency)\n• Equity Multiplier = Assets / Equity (leverage)\n\n**Identifies DRIVERS of return on equity**"
        },
        {
          title: '🧠 Memory Aid: DuPont Formula',
          type: 'callout',
          content: "**\"PAL\" drives ROE:**\n\n**P**rofitability (Net Margin)\n**A**ctivity (Asset Turnover)\n**L**everage (Equity Multiplier)\n\n**Your PAL helps you earn returns!**\n\n**ROE = (NI/Sales) × (Sales/Assets) × (Assets/Equity)**"
        },
        {
          title: 'Leverage Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Meaning'],
          rows: [
            ['Debt to Equity', 'Total Debt / Equity', 'Financial leverage'],
            ['Debt to Assets', 'Total Debt / Total Assets', '% financed by debt'],
            ['Times Interest Earned', 'EBIT / Interest Expense', 'Ability to pay interest']
          ]
        },
        {
          title: '⚠️ Exam Trap: High vs Low Ratios',
          type: 'warning',
          content: "**Not all \"high\" is good!**\n\n**Higher is BETTER:**\n• Current ratio (more liquid)\n• Profit margins (more profitable)\n• Times interest earned (safer)\n\n**Higher may be WORSE:**\n• Debt/Equity (more risk)\n• Days in A/R (slow collection)\n• Days in inventory (overstocked)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Liquidity: Current, Quick, Cash ratios",
            "Profitability: Margins, ROA, ROE",
            "DuPont: ROE = Margin × Turnover × Leverage",
            "Leverage: Debt/Equity, Times Interest Earned",
            "Compare to industry benchmarks and trends",
            "Context matters—high isn't always good"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-III-004',
    section: 'BEC',
    blueprintArea: 'BEC-III',
    blueprintTopic: 'BEC-III-B-1',
    title: 'Cost of Capital',
    description: 'Calculate WACC and understand capital structure',
    order: 10,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Financial Management', 'Cost of Capital', 'WACC'],
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The cost of capital is the hurdle rate for investment decisions! Understanding how to calculate WACC and individual component costs is essential for capital budgeting and corporate finance questions on BEC!"
        },
        {
          title: 'WACC Formula',
          type: 'text',
          content: "**Weighted Average Cost of Capital:**\n\n**WACC = (E/V × Re) + (D/V × Rd × (1-T))**\n\nWhere:\n• E = Market value of equity\n• D = Market value of debt\n• V = E + D (total value)\n• Re = Cost of equity\n• Rd = Cost of debt\n• T = Tax rate\n\n**Debt cost is tax-adjusted (interest is deductible!)**"
        },
        {
          title: 'Cost of Equity Methods',
          type: 'table',
          headers: ['Method', 'Formula', 'Use When'],
          rows: [
            ['CAPM', 'Rf + β(Rm - Rf)', 'Public companies with beta'],
            ['Dividend Growth', 'D1/P0 + g', 'Stable dividend companies'],
            ['Bond Yield + Premium', 'Rd + Risk premium', 'Estimation approach']
          ]
        },
        {
          title: 'CAPM Explained',
          type: 'text',
          content: "**Capital Asset Pricing Model:**\n\n**Re = Rf + β(Rm - Rf)**\n\n• **Rf** = Risk-free rate (T-bills)\n• **β** = Beta (systematic risk measure)\n• **Rm - Rf** = Market risk premium\n\n**β > 1**: More volatile than market\n**β < 1**: Less volatile than market\n**β = 1**: Moves with market"
        },
        {
          title: '🧠 Memory Aid: CAPM',
          type: 'callout',
          content: "**\"Start Safe, Add Risk\"**\n\nRe = Risk-free + (Your risk × Market premium)\n\n**Higher beta = Higher required return**\n\n**Example:**\nRf = 3%, β = 1.5, (Rm-Rf) = 6%\nRe = 3% + 1.5(6%) = 3% + 9% = **12%**"
        },
        {
          title: 'Cost of Debt',
          type: 'text',
          content: "**After-tax cost of debt:**\n\n**Rd(1-T) = Cost of debt × (1 - Tax rate)**\n\n**Example:**\n• Bond yield: 8%\n• Tax rate: 25%\n• After-tax cost: 8% × (1-0.25) = **6%**\n\n**Interest is tax deductible—debt is cheaper than it looks!**"
        },
        {
          title: '⚠️ Exam Trap: Market vs Book Values',
          type: 'warning',
          content: "**Use MARKET values for WACC weights!**\n\n• Market value of equity = Stock price × Shares\n• Market value of debt = Trading price of bonds\n\n**Book values may differ significantly**\n\n**Market values reflect current economics**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "WACC: Blended cost of debt and equity",
            "Debt cost is after-tax (interest deductible)",
            "CAPM: Re = Rf + β(Rm - Rf)",
            "Beta measures systematic (market) risk",
            "Use market values for weights, not book values",
            "WACC = Hurdle rate for capital budgeting"
          ]
        }
      ]
    }
  },

  // =============================================
  // BEC: ADDITIONAL TOPICS (Valid through 6/30/2026)
  // =============================================
  {
    id: 'BEC-III-005',
    section: 'BEC',
    title: "Capital Budgeting Methods",
    description: "Master NPV, IRR, and payback analysis for investment decisions",
    order: 15,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Capital Budgeting", "NPV", "IRR"],
    blueprintArea: 'BEC-III',
    blueprintTopic: 'BEC-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Capital budgeting determines which projects get funded! Understanding NPV, IRR, and payback period helps evaluate investment decisions. This is fundamental corporate finance for BEC!"
        },
        {
          title: 'Net Present Value (NPV)',
          type: 'text',
          content: "**Sum of present values of all cash flows:**\n\n**NPV = Σ [CFt / (1+r)^t] - Initial Investment**\n\n**Decision rule:**\n• NPV > 0 → Accept (creates value)\n• NPV < 0 → Reject (destroys value)\n• NPV = 0 → Indifferent\n\n**\"r\" = Required return (WACC or hurdle rate)**"
        },
        {
          title: 'Capital Budgeting Methods',
          type: 'table',
          headers: ['Method', 'Rule', 'Considers TVM?', 'Weakness'],
          rows: [
            ['NPV', 'Positive = Accept', 'Yes', 'Requires discount rate'],
            ['IRR', '> Hurdle = Accept', 'Yes', 'Multiple IRRs possible'],
            ['Payback', '< Target = Accept', 'No (basic)', 'Ignores cash after payback'],
            ['Discounted Payback', '< Target = Accept', 'Yes', 'Still ignores later cash'],
            ['Profitability Index', '> 1 = Accept', 'Yes', 'Doesn\'t show dollar value']
          ]
        },
        {
          title: '🧠 Memory Aid: NPV vs IRR',
          type: 'callout',
          content: "**\"NPV tells you dollars, IRR tells you rate\"**\n\n**NPV:** Dollar value created\n**IRR:** Rate that makes NPV = 0\n\n**When they conflict, trust NPV!**\n\n**IRR assumes reinvestment at IRR rate** (often unrealistic)"
        },
        {
          title: 'Internal Rate of Return (IRR)',
          type: 'text',
          content: "**Rate that makes NPV = 0:**\n\n**Decision rule:**\n• IRR > Required return → Accept\n• IRR < Required return → Reject\n\n**Problems with IRR:**\n• Multiple IRRs if cash flows change sign\n• Scale issues (100% on $1 vs 20% on $1M)\n• Mutually exclusive projects may conflict"
        },
        {
          title: 'Payback Period',
          type: 'text',
          content: "**Time to recover initial investment:**\n\n**Basic payback:** Sum cash flows until = investment\n\n**Discounted payback:** Sum PV of cash flows\n\n**Weaknesses:**\n• Ignores time value (basic)\n• Ignores cash flows after payback\n• No objective decision rule\n\n**Use as screening tool, not primary method**"
        },
        {
          title: '⚠️ Exam Trap: Relevant Cash Flows',
          type: 'warning',
          content: "**Include only incremental cash flows:**\n\n**Include:**\n• Additional revenues\n• Cost savings\n• Working capital changes\n• Salvage value\n\n**Exclude:**\n• Sunk costs (already spent)\n• Allocated overhead (not incremental)\n• Financing costs (in discount rate)\n\n**After-tax cash flows!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NPV: Best method—shows dollar value created",
            "IRR: Rate making NPV = 0; compare to hurdle",
            "Payback: Time to recover—ignores TVM and later cash",
            "NPV > 0 = Accept; IRR > Hurdle = Accept",
            "When NPV and IRR conflict, use NPV",
            "Include only incremental, after-tax cash flows",
            "Exclude sunk costs and allocated overhead"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-III-006',
    section: 'BEC',
    title: "Working Capital Management",
    description: "Optimize cash, receivables, inventory, and payables",
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Working Capital", "Cash Management", "Liquidity"],
    blueprintArea: 'BEC-III',
    blueprintTopic: 'BEC-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Working capital management affects daily operations! Understanding how to optimize cash, receivables, inventory, and payables is essential for liquidity and profitability. More cash tied up = Less available for growth!"
        },
        {
          title: 'Working Capital Basics',
          type: 'text',
          content: "**Working Capital = Current Assets - Current Liabilities**\n\n**Components:**\n• Cash and marketable securities\n• Accounts receivable\n• Inventory\n• Accounts payable\n\n**Goal:** Balance liquidity with efficiency\n\n**Too much = Inefficient use of capital\nToo little = Risk of illiquidity**"
        },
        {
          title: 'Cash Conversion Cycle',
          type: 'table',
          headers: ['Component', 'Formula', 'Goal'],
          rows: [
            ['Days Inventory (DIO)', '365 / Inventory turnover', 'Decrease'],
            ['Days Receivable (DSO)', '365 / A/R turnover', 'Decrease'],
            ['Days Payable (DPO)', '365 / A/P turnover', 'Increase'],
            ['CCC', 'DIO + DSO - DPO', 'Minimize']
          ]
        },
        {
          title: '🧠 Memory Aid: CCC',
          type: 'callout',
          content: "**\"Cash → Inventory → Sales → Cash\"**\n\n**CCC = DIO + DSO - DPO**\n\n**Days to convert cash back to cash!**\n\n**Lower CCC = Better:**\n• Faster inventory movement\n• Quicker collections\n• Slower payments"
        },
        {
          title: 'Cash Management',
          type: 'text',
          content: "**Goals:**\n• Maintain liquidity\n• Maximize return on excess cash\n• Minimize borrowing costs\n\n**Techniques:**\n• **Lockbox:** Faster collections\n• **Concentration banking:** Centralize funds\n• **Zero-balance accounts:** Efficient disbursements\n• **Float management:** Maximize benefit of timing"
        },
        {
          title: 'Receivables Management',
          type: 'text',
          content: "**Credit policy components:**\n\n• **Credit standards:** Who gets credit?\n• **Credit terms:** 2/10, net 30\n• **Collection policy:** How aggressive?\n\n**Trade-off:**\n• Loose credit = More sales, more bad debts\n• Tight credit = Fewer bad debts, lost sales"
        },
        {
          title: 'Inventory Management',
          type: 'text',
          content: "**Costs to balance:**\n\n• **Carrying costs:** Storage, insurance, obsolescence\n• **Ordering costs:** Setup, shipping\n• **Stockout costs:** Lost sales, rush orders\n\n**EOQ (Economic Order Quantity):**\nMinimizes total ordering + carrying costs\n\n**JIT (Just-in-Time):**\nMinimize inventory, rely on suppliers"
        },
        {
          title: '⚠️ Exam Trap: Credit Terms',
          type: 'warning',
          content: "**\"2/10, net 30\" means:**\n• 2% discount if paid within 10 days\n• Full amount due in 30 days\n\n**Cost of NOT taking discount:**\n(Discount / (1-Discount)) × (365 / (Full - Discount period))\n\n**Example:** (2/98) × (365/20) = **37.2% annual cost!**\n\n**Almost always take the discount!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Working capital: Balance liquidity and efficiency",
            "CCC: Days to convert cash through operations",
            "Lower CCC = Better (faster cycle)",
            "Cash management: Lockbox, concentration, float",
            "Credit policy: Standards, terms, collection",
            "Inventory: Balance carrying, ordering, stockout costs",
            "Trade discounts usually worth taking (high implied rate)"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-IV-003',
    section: 'BEC',
    title: "Economic Concepts: Supply and Demand",
    description: "Understand market equilibrium and elasticity",
    order: 17,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Economics", "Supply and Demand", "Elasticity"],
    blueprintArea: 'BEC-IV',
    blueprintTopic: 'BEC-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Economic concepts explain market behavior! Understanding supply, demand, and elasticity helps analyze business decisions and market conditions. This is foundational economics for BEC!"
        },
        {
          title: 'Demand Basics',
          type: 'text',
          content: "**Law of demand:**\n• Price ↑ → Quantity demanded ↓\n• Price ↓ → Quantity demanded ↑\n\n**Demand shifters (TRIBE):**\n• **T**astes and preferences\n• **R**elated goods (substitutes, complements)\n• **I**ncome\n• **B**uyer expectations\n• **E**xternal factors (population)"
        },
        {
          title: 'Supply Basics',
          type: 'table',
          headers: ['Concept', 'Effect', 'Example'],
          rows: [
            ['Price increase', 'Quantity supplied ↑', 'More profitable to produce'],
            ['Input costs ↑', 'Supply shifts left', 'Higher material costs'],
            ['Technology ↑', 'Supply shifts right', 'More efficient production'],
            ['Expectations', 'Varies', 'Future price expectations']
          ]
        },
        {
          title: '🧠 Memory Aid: Shifts vs Movements',
          type: 'callout',
          content: "**\"Price moves ALONG, other factors SHIFT\"**\n\n**Movement along curve:**\n• Change in PRICE only\n• Same supply/demand curve\n\n**Shift of curve:**\n• Change in OTHER factors\n• New supply or demand curve"
        },
        {
          title: 'Price Elasticity of Demand',
          type: 'text',
          content: "**Responsiveness of quantity to price:**\n\n**Ed = % Change in Quantity / % Change in Price**\n\n**|Ed| > 1:** Elastic (sensitive to price)\n**|Ed| < 1:** Inelastic (not sensitive)\n**|Ed| = 1:** Unit elastic\n\n**Elastic:** Luxury goods, many substitutes\n**Inelastic:** Necessities, few substitutes"
        },
        {
          title: 'Market Equilibrium',
          type: 'text',
          content: "**Where supply = demand:**\n\n• No excess supply or demand\n• Price clears the market\n• Stable unless curves shift\n\n**Price above equilibrium:** Surplus (↓ pressure)\n**Price below equilibrium:** Shortage (↑ pressure)\n\n**Market forces push toward equilibrium**"
        },
        {
          title: '⚠️ Exam Trap: Total Revenue Test',
          type: 'warning',
          content: "**To determine elasticity from revenue:**\n\n**Elastic demand:**\n• Price ↓ → Total revenue ↑\n• Price ↑ → Total revenue ↓\n\n**Inelastic demand:**\n• Price ↓ → Total revenue ↓\n• Price ↑ → Total revenue ↑\n\n**If elastic: Lower price to increase revenue**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Demand: Inverse relationship with price",
            "Supply: Direct relationship with price",
            "Equilibrium: Where supply = demand",
            "Elasticity: Responsiveness to price change",
            "Elastic: |Ed| > 1 (sensitive to price)",
            "Inelastic: |Ed| < 1 (not sensitive)",
            "Surplus pushes price down; Shortage pushes up"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-IV-004',
    section: 'BEC',
    title: "Market Structures",
    description: "Compare perfect competition, monopoly, and oligopoly",
    order: 18,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Economics", "Market Structure", "Competition"],
    blueprintArea: 'BEC-IV',
    blueprintTopic: 'BEC-IV-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Market structure affects pricing power and profitability! Understanding the characteristics of different market structures helps analyze competitive strategy and industry dynamics!"
        },
        {
          title: 'Four Market Structures',
          type: 'table',
          headers: ['Structure', '# Sellers', 'Product', 'Pricing Power'],
          rows: [
            ['Perfect Competition', 'Many', 'Identical', 'Price taker'],
            ['Monopolistic Competition', 'Many', 'Differentiated', 'Some'],
            ['Oligopoly', 'Few', 'Similar/Different', 'Significant'],
            ['Monopoly', 'One', 'Unique', 'Price maker']
          ]
        },
        {
          title: '🧠 Memory Aid: Competition Spectrum',
          type: 'callout',
          content: "**Competition → Monopoly**\n\n**\"Perfect → Monopolistic → Oligo → Mono\"**\n\n**More competition:**\n• More sellers\n• Less pricing power\n• Lower profits\n\n**Less competition:**\n• Fewer sellers\n• More pricing power\n• Higher profits"
        },
        {
          title: 'Perfect Competition',
          type: 'text',
          content: "**Characteristics:**\n• Many buyers and sellers\n• Identical products\n• Free entry/exit\n• Perfect information\n\n**Results:**\n• Price takers (no pricing power)\n• Normal profit in long run\n• P = MC (allocatively efficient)\n\n**Example:** Agricultural commodities"
        },
        {
          title: 'Monopoly',
          type: 'text',
          content: "**Characteristics:**\n• Single seller\n• Unique product, no substitutes\n• High barriers to entry\n\n**Results:**\n• Price maker\n• Economic profit possible long-term\n• P > MC (allocatively inefficient)\n• May lead to government regulation\n\n**Examples:** Utilities, patented drugs"
        },
        {
          title: 'Oligopoly and Monopolistic Competition',
          type: 'text',
          content: "**Oligopoly:**\n• Few large sellers\n• Interdependence in pricing\n• May collude (illegal) or compete\n• Game theory applies\n\n**Monopolistic competition:**\n• Many sellers\n• Differentiated products\n• Some pricing power\n• Free entry (profits erode)\n\n**Example:** Auto industry (oligopoly), restaurants (monopolistic)"
        },
        {
          title: '⚠️ Exam Trap: Long-Run Profits',
          type: 'warning',
          content: "**Economic profit in long run:**\n\n**Perfect competition:** Zero (entry eliminates)\n**Monopolistic competition:** Zero (entry/exit)\n**Oligopoly:** Possible (barriers)\n**Monopoly:** Possible (high barriers)\n\n**Zero economic profit ≠ Zero accounting profit!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Perfect competition: Price takers, normal profit",
            "Monopoly: Price makers, economic profit possible",
            "Oligopoly: Few firms, interdependent pricing",
            "Monopolistic competition: Differentiation, free entry",
            "Barriers to entry determine long-run profits",
            "More competition = Lower prices, lower profits",
            "Economic profit = Zero in competitive long run"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-V-003',
    section: 'BEC',
    title: "Operations Management: Quality",
    description: "Understand TQM, Six Sigma, and quality cost categories",
    order: 19,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Operations", "Quality Management", "TQM"],
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Quality drives customer satisfaction and profitability! Understanding quality management concepts, cost of quality, and improvement methodologies is essential for BEC operations topics!"
        },
        {
          title: 'Cost of Quality Categories',
          type: 'table',
          headers: ['Category', 'Type', 'Examples'],
          rows: [
            ['Prevention', 'Conformance', 'Training, design reviews, process planning'],
            ['Appraisal', 'Conformance', 'Inspection, testing, quality audits'],
            ['Internal Failure', 'Non-conformance', 'Rework, scrap, downtime'],
            ['External Failure', 'Non-conformance', 'Warranty, returns, lawsuits, lost sales']
          ]
        },
        {
          title: '🧠 Memory Aid: Quality Costs',
          type: 'callout',
          content: "**\"PAIF\" the costs:**\n\n**P**revention (upfront investment)\n**A**ppraisal (checking quality)\n**I**nternal failure (caught before ship)\n**E**xternal failure (customer finds it)\n\n**Invest in P and A to reduce I and E!**"
        },
        {
          title: 'Total Quality Management (TQM)',
          type: 'text',
          content: "**Philosophy of continuous improvement:**\n\n**Principles:**\n• Customer focus\n• Continuous improvement (Kaizen)\n• Employee involvement\n• Process-centered\n• Data-driven decisions\n• Systems thinking\n\n**Everyone is responsible for quality!**"
        },
        {
          title: 'Six Sigma',
          type: 'text',
          content: "**Data-driven quality methodology:**\n\n**Goal:** 3.4 defects per million opportunities\n\n**DMAIC framework:**\n• **D**efine the problem\n• **M**easure current performance\n• **A**nalyze causes\n• **I**mprove process\n• **C**ontrol future performance"
        },
        {
          title: 'Lean Manufacturing',
          type: 'text',
          content: "**Eliminate waste (Muda):**\n\n**Seven wastes:**\n• Transportation\n• Inventory\n• Motion\n• Waiting\n• Overproduction\n• Over-processing\n• Defects\n\n**\"TIMWOOD\"**\n\n**JIT (Just-in-Time):** Produce only what's needed, when needed"
        },
        {
          title: '⚠️ Exam Trap: Quality Cost Trade-offs',
          type: 'warning',
          content: "**Prevention and Appraisal vs Failure costs:**\n\n**Increasing prevention/appraisal:**\n→ Reduces failure costs\n→ May reduce TOTAL quality costs\n\n**Optimal quality:**\n→ Minimize TOTAL cost\n→ Not necessarily zero defects\n\n**External failure most expensive!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Quality costs: Prevention, Appraisal, Internal/External failure",
            "Invest in prevention to reduce failure costs",
            "TQM: Customer focus, continuous improvement, involvement",
            "Six Sigma: DMAIC, 3.4 defects per million",
            "Lean: Eliminate waste (TIMWOOD)",
            "External failure is most costly category",
            "Optimal quality minimizes TOTAL cost"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-V-004',
    section: 'BEC',
    title: "Variance Analysis",
    description: "Calculate and interpret material, labor, and overhead variances",
    order: 20,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Cost Accounting", "Variance Analysis", "Budgeting"],
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Variance analysis explains WHY actual differs from budget! Understanding how to calculate and interpret material, labor, and overhead variances is essential for cost control and BEC success!"
        },
        {
          title: 'Variance Framework',
          type: 'text',
          content: "**Basic formula:**\nVariance = Actual - Standard (or Budget)\n\n**Favorable (F):** Actual < Standard (lower cost)\n**Unfavorable (U):** Actual > Standard (higher cost)\n\n**For revenue: Opposite interpretation!**\n\n**Goal:** Identify causes and responsibility"
        },
        {
          title: 'Direct Material Variances',
          type: 'table',
          headers: ['Variance', 'Formula', 'Responsible'],
          rows: [
            ['Price Variance', '(AP - SP) × AQ', 'Purchasing'],
            ['Quantity/Usage Variance', '(AQ - SQ) × SP', 'Production'],
            ['AP = Actual Price', 'SP = Standard Price', ''],
            ['AQ = Actual Quantity', 'SQ = Standard Quantity', '']
          ]
        },
        {
          title: '🧠 Memory Aid: Material Variances',
          type: 'callout',
          content: "**\"Price uses Actual, Quantity uses Standard\"**\n\n**Price variance:**\n(AP - SP) × **AQ**\n\n**Quantity variance:**\n(AQ - SQ) × **SP**\n\n**AQ in middle—used in BOTH!**"
        },
        {
          title: 'Direct Labor Variances',
          type: 'text',
          content: "**Rate (Price) Variance:**\n(AR - SR) × AH\n\n**Efficiency (Quantity) Variance:**\n(AH - SH) × SR\n\n**Where:**\n• AR = Actual rate per hour\n• SR = Standard rate\n• AH = Actual hours\n• SH = Standard hours allowed"
        },
        {
          title: 'Overhead Variances',
          type: 'text',
          content: "**Two-variance method:**\n\n**Controllable variance:**\nActual OH - Flexible budget OH\n\n**Volume variance:**\nFlexible budget OH - Applied OH\n\n**Or four-variance method:**\n• Spending variance\n• Efficiency variance\n• Fixed budget variance\n• Volume variance"
        },
        {
          title: '⚠️ Exam Trap: Favorable ≠ Good',
          type: 'warning',
          content: "**Favorable variance isn't always positive:**\n\n**Cheap materials (F price):**\n→ May cause quality issues\n→ May increase quantity variance (U)\n\n**Fast production (F efficiency):**\n→ May reduce quality\n→ May increase defects\n\n**Look at variances TOGETHER!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Variance = Actual − Standard",
            "Material: Price variance + Quantity variance",
            "Labor: Rate variance + Efficiency variance",
            "Price variances: (AP − SP) × Actual quantity",
            "Quantity variances: (Actual − Standard) × Standard price",
            "Favorable doesn't always mean good—examine causes",
            "Assign responsibility: Price = Purchasing, Efficiency = Production"
          ]
        }
      ]
    }
  },

  // =============================================
  // BEC: ADDITIONAL TOPICS (Valid through 6/30/2026)
  // =============================================
  {
    id: 'BEC-I-005',
    section: 'BEC',
    title: "Corporate Governance",
    description: "Understand board responsibilities and governance structures",
    order: 21,
    duration: 45,
    difficulty: 'foundational',
    topics: ["Corporate Governance", "Board of Directors", "Ethics"],
    blueprintArea: 'BEC-I',
    blueprintTopic: 'BEC-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Good governance protects stakeholders and drives performance! Understanding board responsibilities, committee functions, and governance best practices is fundamental to BEC!"
        },
        {
          title: 'Board of Directors Role',
          type: 'text',
          content: "**Primary responsibilities:**\n\n• Hire, evaluate, and compensate CEO\n• Set strategic direction\n• Oversee risk management\n• Ensure legal compliance\n• Protect shareholder interests\n\n**Fiduciary duties:**\n• Duty of care\n• Duty of loyalty\n• Duty of good faith"
        },
        {
          title: 'Key Board Committees',
          type: 'table',
          headers: ['Committee', 'Function', 'Composition'],
          rows: [
            ['Audit', 'Financial reporting, internal controls', 'All independent'],
            ['Compensation', 'Executive pay', 'All independent'],
            ['Nominating/Governance', 'Board selection, governance', 'Majority independent'],
            ['Risk', 'Enterprise risk oversight', 'Varies']
          ]
        },
        {
          title: '🧠 Memory Aid: Audit Committee',
          type: 'callout',
          content: "**Audit committee requirements (SEC):**\n\n**\"I.E.F.\"**\n**I**ndependent - All members\n**E**xpert - Financial expert required\n**F**inancial literacy - All members\n\n**Hires and oversees external auditor!**"
        },
        {
          title: 'Independence Requirements',
          type: 'text',
          content: "**Independent directors:**\n\n• No material relationship with company\n• Not an employee\n• Not a significant shareholder\n• No business relationships\n• Family member limitations\n\n**NYSE/NASDAQ require majority independence**"
        },
        {
          title: 'Internal Controls Responsibilities',
          type: 'text',
          content: "**Management:**\n• Establishes and maintains IC\n• Assesses effectiveness annually (404a)\n\n**Audit committee:**\n• Oversees financial reporting\n• Reviews IC with auditors\n• Receives IC reports\n\n**External auditor (accelerated filers):**\n• Attests to IC effectiveness (404b)"
        },
        {
          title: '⚠️ Exam Trap: Tone at the Top',
          type: 'warning',
          content: "**Governance starts with culture:**\n\n• CEO and board set ethical tone\n• Code of conduct essential\n• Whistleblower mechanisms required\n• Actions must match words\n\n**Weak tone = Weak controls**\n**Example: Enron had great written policies...**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Board: Hire CEO, strategy, risk, compliance",
            "Fiduciary duties: Care, loyalty, good faith",
            "Audit committee: All independent, financial expert",
            "Majority of board should be independent",
            "Management responsible for internal controls",
            "Audit committee oversees financial reporting",
            "Tone at the top drives culture"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-I-006',
    section: 'BEC',
    title: "Economic Cycles and Indicators",
    description: "Understand business cycles and economic measures",
    order: 22,
    duration: 45,
    difficulty: 'foundational',
    topics: ["Economics", "Business Cycles", "Indicators"],
    blueprintArea: 'BEC-II',
    blueprintTopic: 'BEC-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Understanding where we are in the economic cycle matters for business decisions! Recognizing leading, lagging, and coincident indicators helps predict and respond to economic changes!"
        },
        {
          title: 'Business Cycle Phases',
          type: 'text',
          content: "**Four phases:**\n\n**Expansion:** Growing GDP, low unemployment\n**Peak:** Maximum output, may trigger inflation\n**Contraction (Recession):** Declining GDP\n**Trough:** Bottom of cycle, recovery begins\n\n**Technical recession:** Two consecutive quarters of declining GDP"
        },
        {
          title: 'Economic Indicators',
          type: 'table',
          headers: ['Type', 'Definition', 'Examples'],
          rows: [
            ['Leading', 'Predict future economy', 'Stock prices, building permits, money supply'],
            ['Coincident', 'Move with economy', 'GDP, employment, industrial production'],
            ['Lagging', 'Follow economy', 'Unemployment rate, CPI, business loans']
          ]
        },
        {
          title: '🧠 Memory Aid: Indicator Types',
          type: 'callout',
          content: "**\"Leaders Plan Ahead\"**\n\n**Leading indicators:**\n• Stock market (forward-looking)\n• Building permits (planned construction)\n• Consumer expectations\n\n**Unemployment RATE is lagging!**\n(Takes time to hire/fire)"
        },
        {
          title: 'Key Economic Measures',
          type: 'text',
          content: "**GDP - Gross Domestic Product:**\n• Total value of goods/services produced\n• GDP = C + I + G + (X - M)\n\n**Inflation measures:**\n• CPI - Consumer prices\n• PPI - Producer prices\n• GDP deflator - Overall price level\n\n**Unemployment rate:**\n• Unemployed / Labor force"
        },
        {
          title: 'Monetary vs Fiscal Policy',
          type: 'text',
          content: "**Monetary (Federal Reserve):**\n• Interest rates\n• Money supply\n• Reserve requirements\n\n**Fiscal (Congress/President):**\n• Government spending\n• Taxation\n• Budget deficits/surpluses\n\n**Both influence economic conditions**"
        },
        {
          title: '⚠️ Exam Trap: Real vs Nominal',
          type: 'warning',
          content: "**Nominal:** Current dollar terms\n**Real:** Adjusted for inflation\n\n**Real GDP = Nominal GDP / Price index**\n\n**Use REAL for comparisons over time!**\n\n**Example:**\n• 5% nominal growth\n• 3% inflation\n• Real growth: ~2%"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cycle: Expansion → Peak → Contraction → Trough",
            "Recession: Two quarters declining GDP",
            "Leading indicators: Predict economy",
            "Lagging indicators: Confirm trends",
            "GDP = C + I + G + (X - M)",
            "Monetary policy: Fed; Fiscal: Government",
            "Real vs Nominal: Adjust for inflation"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-III-010',
    section: 'BEC',
    title: "Cost-Volume-Profit Analysis",
    description: "Master breakeven analysis and profit planning",
    order: 23,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["CVP Analysis", "Breakeven", "Cost Accounting"],
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "CVP analysis helps managers make pricing, volume, and cost decisions! Understanding breakeven points, contribution margin, and profit targets is essential for business decision-making!"
        },
        {
          title: 'Key CVP Concepts',
          type: 'text',
          content: "**Contribution margin:**\nSales price − Variable costs\n\n**CM ratio:**\nCM / Sales price\n\n**Breakeven point:**\nWhere Total Revenue = Total Costs\nWhere CM covers Fixed Costs exactly"
        },
        {
          title: 'Breakeven Formulas',
          type: 'table',
          headers: ['Formula', 'Purpose', 'Expression'],
          rows: [
            ['BE Units', 'Units to sell', 'Fixed costs / CM per unit'],
            ['BE Dollars', 'Revenue needed', 'Fixed costs / CM ratio'],
            ['Target Profit Units', 'Units for profit', '(FC + Target) / CM per unit'],
            ['Target Profit $', 'Revenue for profit', '(FC + Target) / CM ratio']
          ]
        },
        {
          title: '🧠 Memory Aid: Breakeven',
          type: 'callout',
          content: "**\"Fixed divided by Unit\"**\n\n**Breakeven units:**\nFixed Costs / CM per unit\n\n**Breakeven dollars:**\nFixed Costs / CM ratio\n\n**Just cover fixed costs!**"
        },
        {
          title: 'CVP Assumptions',
          type: 'text',
          content: "**CVP analysis assumes:**\n\n• Costs are linear (within relevant range)\n• Selling price is constant\n• Sales mix is constant (multiple products)\n• Units produced = Units sold\n• Variable costs are truly variable\n\n**Violations limit accuracy!**"
        },
        {
          title: 'Operating Leverage',
          type: 'text',
          content: "**Degree of Operating Leverage:**\nDOL = CM / Operating income\n\n**Higher DOL means:**\n• More fixed costs\n• More risk\n• Greater profit swing from sales changes\n\n**Example:** DOL of 3\n• 10% sales increase = 30% profit increase\n• 10% sales decrease = 30% profit decrease"
        },
        {
          title: '⚠️ Exam Trap: After-Tax Target',
          type: 'warning',
          content: "**For after-tax target profit:**\n\n**Pre-tax target = After-tax target / (1 − Tax rate)**\n\n**Then use in formulas:**\n(FC + Pre-tax target) / CM\n\n**Example:**\n• Want $100K after-tax\n• Tax rate: 25%\n• Pre-tax needed: $100K / 0.75 = $133,333"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CM = Price − Variable cost",
            "Breakeven units = FC / CM per unit",
            "Breakeven $ = FC / CM ratio",
            "Target profit: Add target to FC in formula",
            "DOL measures profit sensitivity to sales",
            "High DOL = More fixed costs = More risk",
            "After-tax target: Gross up for taxes"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-IV-005',
    section: 'BEC',
    title: "Budgeting and Forecasting",
    description: "Understand budget types and the budgeting process",
    order: 24,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Budgeting", "Forecasting", "Planning"],
    blueprintArea: 'BEC-V',
    blueprintTopic: 'BEC-V-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Budgeting translates strategy into numbers! Understanding budget types, the master budget, and behavioral considerations helps managers plan and control operations effectively!"
        },
        {
          title: 'Budget Purposes',
          type: 'text',
          content: "**Budgets serve to:**\n\n• **Plan:** Allocate resources\n• **Coordinate:** Align departments\n• **Communicate:** Share expectations\n• **Motivate:** Set targets\n• **Control:** Compare actual to plan\n• **Evaluate:** Measure performance"
        },
        {
          title: 'Master Budget Components',
          type: 'table',
          headers: ['Budget', 'Starts With', 'Feeds Into'],
          rows: [
            ['Sales budget', 'Sales forecast', 'Everything else'],
            ['Production budget', 'Sales + Inventory', 'Material, labor, OH'],
            ['Direct materials', 'Production needs', 'Cash budget'],
            ['Direct labor', 'Production needs', 'Cash budget'],
            ['Overhead', 'Production needs', 'Cash budget'],
            ['Cash budget', 'All above', 'Pro forma financials']
          ]
        },
        {
          title: '🧠 Memory Aid: Budget Sequence',
          type: 'callout',
          content: "**\"Sales drives the machine\"**\n\n**Order:**\n1. Sales budget (start here!)\n2. Production budget\n3. Materials/Labor/OH budgets\n4. Selling & Admin budget\n5. Cash budget\n6. Pro forma statements"
        },
        {
          title: 'Budget Types',
          type: 'text',
          content: "**Static budget:**\n• Fixed for one activity level\n• Good for planning\n\n**Flexible budget:**\n• Adjusts for actual activity\n• Better for performance evaluation\n\n**Rolling/continuous budget:**\n• Adds month as month ends\n• Always 12 months ahead"
        },
        {
          title: 'Budgeting Approaches',
          type: 'text',
          content: "**Top-down:** Management sets\n• Quick but less buy-in\n\n**Bottom-up (Participative):** Employees input\n• Slower but better buy-in\n\n**Zero-based:** Justify from zero\n• Time-consuming but thorough\n\n**Activity-based:** Based on activities\n• Links costs to drivers"
        },
        {
          title: '⚠️ Exam Trap: Budgetary Slack',
          type: 'warning',
          content: "**Slack = Padding the budget:**\n\n• Managers understate revenue\n• Overstate expenses\n• Easier to meet targets\n\n**Problems:**\n• Inefficient resource allocation\n• Poor decision-making\n\n**Reduce by:** Top management review, stretch targets"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Budgets: Plan, coordinate, communicate, control",
            "Sales budget starts the process",
            "Production = Sales + Ending − Beginning inventory",
            "Static: Fixed level; Flexible: Adjusts to actual",
            "Rolling budget: Always 12 months ahead",
            "Participative: Better buy-in but slower",
            "Watch for budgetary slack"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-IV-006',
    section: 'BEC',
    title: "Financial Ratios and Analysis",
    description: "Calculate and interpret key financial ratios",
    order: 25,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Financial Analysis", "Ratios", "Performance"],
    blueprintArea: 'BEC-IV',
    blueprintTopic: 'BEC-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Financial ratios reveal company health! Understanding liquidity, solvency, profitability, and efficiency ratios is essential for analyzing performance and making business decisions!"
        },
        {
          title: 'Liquidity Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'Measures'],
          rows: [
            ['Current ratio', 'Current assets / Current liabilities', 'Short-term solvency'],
            ['Quick ratio', '(Cash + A/R + Securities) / CL', 'Immediate liquidity'],
            ['Cash ratio', 'Cash / Current liabilities', 'Most conservative'],
            ['Working capital', 'CA − CL', 'Cushion in dollars']
          ]
        },
        {
          title: '🧠 Memory Aid: Quick Ratio',
          type: 'callout',
          content: "**\"Quick = No Slow Assets\"**\n\n**Quick assets:**\n• Cash ✓\n• Marketable securities ✓\n• Accounts receivable ✓\n\n**NOT quick:**\n• Inventory ✗ (takes time to sell)\n• Prepaids ✗ (can't pay bills with them)"
        },
        {
          title: 'Activity/Efficiency Ratios',
          type: 'text',
          content: "**Inventory turnover:**\nCOGS / Average inventory\n(Days = 365 / turnover)\n\n**Receivables turnover:**\nNet credit sales / Average A/R\n(Days = 365 / turnover)\n\n**Asset turnover:**\nSales / Average total assets\n\n**Higher turnover = More efficient**"
        },
        {
          title: 'Profitability Ratios',
          type: 'text',
          content: "**Gross margin:**\n(Sales − COGS) / Sales\n\n**Profit margin:**\nNet income / Sales\n\n**ROA:**\nNet income / Average total assets\n\n**ROE:**\nNet income / Average stockholders' equity\n\n**Higher = More profitable**"
        },
        {
          title: 'Leverage Ratios',
          type: 'text',
          content: "**Debt-to-equity:**\nTotal debt / Total equity\n\n**Debt-to-assets:**\nTotal debt / Total assets\n\n**Times interest earned:**\nEBIT / Interest expense\n\n**Higher debt ratios = More financial risk**\n**Higher TIE = Better coverage**"
        },
        {
          title: 'DuPont Analysis',
          type: 'text',
          content: "**Decomposes ROE:**\n\n**ROE = Profit margin × Asset turnover × Leverage**\n\nOr:\nNet income/Sales × Sales/Assets × Assets/Equity\n\n**Shows three drivers of return:**\n• Profitability\n• Efficiency\n• Financial leverage"
        },
        {
          title: '⚠️ Exam Trap: Interpretation',
          type: 'warning',
          content: "**Context matters!**\n\n• Compare to industry averages\n• Compare to prior periods\n• Higher isn't always better\n\n**Examples:**\n• Very high current ratio = Too much tied up?\n• Very high inventory turnover = Stockouts?\n\n**Trend analysis is key!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Liquidity: Current ratio, Quick ratio, Cash ratio",
            "Quick ratio excludes inventory and prepaids",
            "Activity: Turnover ratios (higher = faster)",
            "Profitability: ROA, ROE, Profit margins",
            "Leverage: Debt ratios, Times interest earned",
            "DuPont: ROE = Margin × Turnover × Leverage",
            "Compare to industry and trends"
          ]
        }
      ]
    }
  },
  {
    id: 'BEC-II-005',
    section: 'BEC',
    title: "Interest Rates and Monetary Policy",
    description: "Understand how the Fed influences the economy",
    order: 26,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Economics", "Monetary Policy", "Interest Rates"],
    blueprintArea: 'BEC-II',
    blueprintTopic: 'BEC-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Interest rates affect everything in business! Understanding how the Federal Reserve controls money supply and rates helps explain economic conditions and their impact on organizations!"
        },
        {
          title: 'Federal Reserve Tools',
          type: 'text',
          content: "**Primary tools:**\n\n**1. Open market operations:**\n• Buy securities = Expand money supply\n• Sell securities = Contract money supply\n\n**2. Discount rate:**\n• Rate Fed charges banks\n\n**3. Reserve requirements:**\n• % banks must hold"
        },
        {
          title: 'Policy Effects',
          type: 'table',
          headers: ['Action', 'Money Supply', 'Interest Rates', 'Economy'],
          rows: [
            ['Buy securities', 'Increase', 'Decrease', 'Stimulate'],
            ['Sell securities', 'Decrease', 'Increase', 'Slow down'],
            ['Lower discount rate', 'Increase', 'Decrease', 'Stimulate'],
            ['Raise reserve req', 'Decrease', 'Increase', 'Slow down']
          ]
        },
        {
          title: '🧠 Memory Aid: Fed Goals',
          type: 'callout',
          content: "**\"Dual Mandate\"**\n\n**1. Maximum employment**\n**2. Stable prices (2% inflation target)**\n\n**When unemployment high:** Stimulate\n**When inflation high:** Contract\n\n**Often a tradeoff!**"
        },
        {
          title: 'Interest Rate Types',
          type: 'text',
          content: "**Key rates:**\n\n**Federal funds rate:**\n• Banks lend to each other overnight\n• Fed's target rate\n\n**Prime rate:**\n• Base rate for best customers\n• Usually fed funds + 3%\n\n**LIBOR/SOFR:**\n• International benchmark rates"
        },
        {
          title: 'Yield Curve',
          type: 'text',
          content: "**Relationship of rates to maturity:**\n\n**Normal (upward):**\n• Long-term rates > Short-term\n• Healthy economy expected\n\n**Flat:**\n• Similar rates across maturities\n• Uncertainty\n\n**Inverted:**\n• Short-term > Long-term\n• Recession predictor"
        },
        {
          title: '⚠️ Exam Trap: Inflation Effects',
          type: 'warning',
          content: "**Fisher Effect:**\n\nNominal rate ≈ Real rate + Expected inflation\n\n**Example:**\n• Real rate: 2%\n• Expected inflation: 3%\n• Nominal rate: ~5%\n\n**Higher inflation → Higher interest rates**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Fed tools: Open market ops, Discount rate, Reserves",
            "Buy securities = More money = Lower rates",
            "Dual mandate: Employment + Price stability",
            "Federal funds rate is key policy rate",
            "Inverted yield curve predicts recession",
            "Nominal rate = Real rate + Inflation",
            "Higher inflation → Higher interest rates"
          ]
        }
      ]
    }
  }
];

export default becLessons;
