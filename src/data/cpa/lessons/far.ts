import { Lesson } from '../../../types';

export const farLessons: Lesson[] = [
  {
    id: 'FAR-I-001',
    section: 'FAR',
    title: "FASB Conceptual Framework: Foundation of GAAP",
    description: "Master the theoretical foundation that underlies all U.S. GAAP standards",
    order: 1,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Conceptual Framework", "FASB", "Qualitative Characteristics"],
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Conceptual Framework is your secret weapon on the CPA exam. When you encounter an unfamiliar scenario, understanding these principles helps you reason through to the correct answer. FASB uses this framework to develop new standards, and the exam loves testing whether you understand the 'why' behind accounting rules."
        },
        {
          title: 'The Purpose of the Conceptual Framework',
          type: 'text',
          content: "The FASB Conceptual Framework (primarily found in SFAC No. 8) serves as the theoretical foundation for U.S. GAAP. Think of it as the constitution of financial reporting—it doesn't create specific rules but establishes the principles that guide standard-setting.\n\n**The Framework serves three key purposes:**\n\n• Guides FASB in developing new accounting standards\n• Helps preparers apply standards to new transactions when no specific guidance exists\n• Helps users understand and interpret financial statements"
        },
        {
          title: 'Objective of Financial Reporting',
          type: 'text',
          content: "The primary objective is to provide financial information useful to **existing and potential investors, lenders, and other creditors** in making decisions about providing resources to the entity.\n\n**Key insight:** Notice the focus is on EXTERNAL users making RESOURCE ALLOCATION decisions. Internal management is NOT the primary audience—that's managerial accounting."
        },
        {
          title: 'Qualitative Characteristics Hierarchy',
          type: 'list',
          content: [
            { term: "Fundamental: Relevance", definition: "Information is relevant if it's capable of making a difference in decisions. It must have predictive value, confirmatory value, or both. Materiality is an entity-specific aspect of relevance." },
            { term: "Fundamental: Faithful Representation", definition: "Information must be complete, neutral, and free from error. This replaced the old term 'reliability.' Note: Faithful representation does NOT mean the information is perfectly accurate—it means it faithfully represents what it purports to represent." },
            { term: "Enhancing: Comparability", definition: "Users can identify similarities and differences between entities. Consistency (same methods period to period) helps achieve comparability." },
            { term: "Enhancing: Verifiability", definition: "Different knowledgeable observers could reach consensus that the representation is faithful." },
            { term: "Enhancing: Timeliness", definition: "Information is available early enough to influence decisions." },
            { term: "Enhancing: Understandability", definition: "Classified, characterized, and presented clearly. Assumes users have reasonable business/economic knowledge." }
          ]
        },
        {
          title: '🧠 Memory Aid: "RF-CVTU"',
          type: 'callout',
          content: "**R**elevance and **F**aithful representation are **F**undamental\n\n**C**omparability, **V**erifiability, **T**imeliness, **U**nderstandability **E**nhance\n\nRemember: You can't enhance what isn't fundamentally there! The fundamentals must be present first."
        },
        {
          title: 'Elements of Financial Statements',
          type: 'table',
          headers: ['Element', 'Definition', 'Key Recognition Criteria'],
          rows: [
            ['Assets', 'Present right to an economic benefit', 'Probable future benefit, controlled by entity, result of past transaction'],
            ['Liabilities', 'Present obligation to transfer economic benefit', 'Probable future sacrifice, present obligation, result of past transaction'],
            ['Equity', 'Residual interest (Assets − Liabilities)', 'Owners\' residual claim after all liabilities'],
            ['Revenues', 'Inflows from delivering goods/services', 'Earned and realized/realizable'],
            ['Expenses', 'Outflows from delivering goods/services', 'Incurred in generating revenue'],
            ['Gains', 'Increases in equity from peripheral transactions', 'Recognized when realized'],
            ['Losses', 'Decreases in equity from peripheral transactions', 'Recognized when probable and estimable']
          ]
        },
        {
          title: '⚠️ Exam Trap Alert',
          type: 'warning',
          content: "The exam loves to test the difference between REVENUES and GAINS, and between EXPENSES and LOSSES. The key distinction is whether the activity is **central to ongoing operations** (revenue/expense) or **peripheral/incidental** (gain/loss). Selling inventory = Revenue. Selling a building for a manufacturing company = Gain."
        },
        {
          title: 'Recognition and Measurement',
          type: 'text',
          content: "**Recognition** means recording an item in the financial statements. An item should be recognized when:\n\n1. It meets the **definition** of an element\n2. It is **measurable** with sufficient reliability\n3. The information is **relevant** (capable of making a difference)\n4. The information is a **faithful representation**\n\n**Measurement Bases:**\n• Historical cost (most common)\n• Current cost (replacement cost)\n• Current market value (exit price)\n• Net realizable value (expected selling price less costs)\n• Present value (discounted future cash flows)"
        },
        {
          title: '📊 Quick Example: Measurement Bases',
          type: 'example',
          content: "ABC Company purchased equipment for $100,000. How would it be reported under different measurement bases?\n\n• Historical Cost: $100,000 (original purchase price)\n• Current Cost: $115,000 (what it would cost to replace today)\n• Fair Value: $90,000 (what a buyer would pay in an orderly transaction)\n• Net Realizable Value: $85,000 (selling price $90K minus $5K disposal costs)\n• Present Value: $78,000 (discounted future cash flows the asset will generate)\n\nKey insight: GAAP primarily uses historical cost, but fair value is increasingly required for financial instruments and impairment testing."
        },
        {
          title: 'Cost Constraint',
          type: 'text',
          content: "The **cost constraint** (formerly cost-benefit) recognizes that financial reporting imposes costs, and those costs should be justified by the benefits. This is why some disclosures are not required for smaller entities or why certain measurement approaches (like fair value for every asset) aren't mandated."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Relevance and Faithful Representation are the two FUNDAMENTAL qualitative characteristics",
            "Comparability, Verifiability, Timeliness, and Understandability are ENHANCING characteristics",
            "The objective is to help external users make resource allocation decisions",
            "Recognition requires meeting the definition AND being measurable with reliability",
            "Gains/losses are from peripheral activities; revenues/expenses are from core operations"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-I-002',
    section: 'FAR',
    title: "Financial Statements: Components & Presentation",
    description: "Understand the complete set of financial statements and their interrelationships",
    order: 2,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Financial Statements", "Balance Sheet", "Income Statement", "Cash Flows"],
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Every single FAR topic ultimately flows into financial statement presentation. Whether you're learning about leases, pensions, or revenue recognition, the end goal is always: how does this affect the financial statements? Master this foundation and everything else becomes clearer."
        },
        {
          title: 'Complete Set of Financial Statements',
          type: 'text',
          content: "A complete set of financial statements under U.S. GAAP includes:\n\n1. **Statement of Financial Position** (Balance Sheet)\n2. **Statement of Comprehensive Income** (can be one statement or two)\n3. **Statement of Changes in Stockholders' Equity**\n4. **Statement of Cash Flows**\n5. **Notes to Financial Statements** (integral part!)\n\n**Comparative statements** for at least one prior period are required for SEC registrants."
        },
        {
          title: 'Balance Sheet: The Snapshot',
          type: 'text',
          content: "The balance sheet reports an entity's **financial position at a point in time**. It embodies the fundamental accounting equation:\n\n**Assets = Liabilities + Stockholders' Equity**\n\n**Current vs. Non-current Classification:**\n\nCurrent assets are expected to be converted to cash, sold, or consumed within **one year or the operating cycle, whichever is longer**.\n\nCurrent liabilities are expected to be settled within one year or the operating cycle."
        },
        {
          title: 'Balance Sheet Classification',
          type: 'table',
          headers: ['Current Assets', 'Non-current Assets', 'Current Liabilities', 'Non-current Liabilities'],
          rows: [
            ['Cash & equivalents', 'Property, plant & equipment', 'Accounts payable', 'Long-term debt'],
            ['Short-term investments', 'Intangible assets', 'Accrued expenses', 'Deferred tax liabilities'],
            ['Accounts receivable', 'Long-term investments', 'Unearned revenue (current)', 'Pension obligations'],
            ['Inventory', 'Goodwill', 'Current portion of LT debt', 'Lease liabilities (LT)'],
            ['Prepaid expenses', 'Right-of-use assets', 'Income taxes payable', 'Unearned revenue (LT)']
          ]
        },
        {
          title: '⚠️ Exam Trap: Debt Classification',
          type: 'warning',
          content: "Long-term debt due within one year must be reclassified to current UNLESS the company:\n\n1. Intends to refinance on a long-term basis, AND\n2. Has the ABILITY to refinance (demonstrated by actual refinancing before B/S date OR a non-cancelable financing agreement)\n\nWatch for this in MCQs—they love testing refinancing scenarios!"
        },
        {
          title: 'Income Statement: The Movie',
          type: 'text',
          content: "While the balance sheet is a snapshot, the income statement shows performance **over a period of time**.\n\n**Single-Step Format:**\nTotal Revenues − Total Expenses = Net Income\n\n**Multi-Step Format (more common):**\n• Net Sales\n• − Cost of Goods Sold\n• = **Gross Profit**\n• − Operating Expenses\n• = **Operating Income**\n• ± Other Income/Expenses\n• = **Income Before Tax**\n• − Income Tax Expense\n• = **Net Income**"
        },
        {
          title: 'Comprehensive Income',
          type: 'text',
          content: "**Comprehensive Income = Net Income + Other Comprehensive Income (OCI)**\n\nOCI includes items that bypass the income statement and go directly to equity:\n\n• Unrealized gains/losses on **AFS debt securities**\n• **Foreign currency translation** adjustments\n• **Pension adjustments** (prior service cost, actuarial gains/losses)\n• **Cash flow hedge** gains/losses\n\n**Presentation Options:**\n1. Single continuous statement of comprehensive income\n2. Two separate statements (income statement + statement of comprehensive income)"
        },
        {
          title: '🧠 Memory Aid: "PUFE" for OCI',
          type: 'callout',
          content: "**P**ensions (adjustments)\n**U**nrealized gains/losses on AFS debt securities\n**F**oreign currency translation\nCash flow hedg**E**s\n\nThese are the four main components of OCI that you'll see on the exam!"
        },
        {
          title: 'Statement of Stockholders Equity',
          type: 'text',
          content: "This statement reconciles the beginning and ending balances of each equity component:\n\n• Common Stock\n• Additional Paid-in Capital\n• Retained Earnings\n• Treasury Stock\n• Accumulated Other Comprehensive Income (AOCI)\n\n**Retained Earnings is affected by:**\n• Net income (+)\n• Dividends (−)\n• Prior period adjustments (±)\n• Certain retrospective changes (±)"
        },
        {
          title: 'How the Statements Connect',
          type: 'example',
          content: "**The Articulation of Financial Statements:**\n\n1. Net Income from the Income Statement flows to Retained Earnings\n2. Retained Earnings is a component of Equity on the Balance Sheet\n3. OCI flows to Accumulated OCI (also in Equity)\n4. The Cash Flow Statement explains the change in Cash on the Balance Sheet\n5. The Statement of Stockholders' Equity reconciles all equity accounts\n\n**Think of it as a closed loop—every number must tie somewhere!**"
        },
        {
          title: 'Notes to Financial Statements',
          type: 'text',
          content: "Notes are an **integral part** of financial statements, not supplementary. They include:\n\n• Summary of significant accounting policies\n• Details and disaggregation of line items\n• Commitments and contingencies\n• Subsequent events\n• Related party transactions\n• Segment information\n• Fair value measurements\n\n**The notes often contain more pages than the financial statements themselves!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "A complete set includes: Balance Sheet, Income Statement, Statement of Comprehensive Income, Statement of Cash Flows, Statement of Stockholders' Equity, and Notes",
            "Current classification is based on one year OR the operating cycle (whichever is longer)",
            "OCI includes PUFE: Pensions, Unrealized AFS gains/losses, Foreign currency, cash flow hEdges",
            "Debt due within one year stays long-term only if intent AND ability to refinance exists",
            "Notes are integral to the financial statements, not optional disclosures"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-I-003',
    section: 'FAR',
    title: "GAAP Hierarchy & Standard-Setting Process",
    description: "Navigate the authoritative sources of U.S. GAAP and understand how standards are created",
    order: 3,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["GAAP Hierarchy", "ASC", "FASB", "Standard Setting"],
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The CPA exam expects you to know what constitutes authoritative GAAP and what doesn't. In practice, you'll need to research accounting issues—knowing where to look is half the battle. The exam includes research simulations where you must navigate the Codification!"
        },
        {
          title: 'The FASB Accounting Standards Codification (ASC)',
          type: 'text',
          content: "Since 2009, the **FASB ASC** is the single source of authoritative U.S. GAAP for nongovernmental entities. It reorganized all previous standards (SFAS, APB Opinions, EITF, etc.) into one searchable database.\n\n**Structure of the Codification:**\n\n• **Areas** (broad categories like Assets, Revenue)\n• **Topics** (3-digit numbers like 606 for Revenue)\n• **Subtopics** (specific aspects)\n• **Sections** (types of guidance)\n• **Paragraphs** (specific requirements)\n\nExample: **ASC 606-10-25-1** = Revenue, Overall, Recognition, Paragraph 1"
        },
        {
          title: 'GAAP Hierarchy (Post-Codification)',
          type: 'text',
          content: "The hierarchy is now simplified:\n\n**Authoritative GAAP (Category A):**\n• FASB Accounting Standards Codification\n• SEC rules and interpretive releases (for SEC registrants)\n\n**Nonauthoritative Guidance:**\n• FASB Concepts Statements\n• AICPA Issues Papers\n• International standards (IFRS)\n• Textbooks, articles, etc.\n\n**Key Point:** If guidance isn't in the Codification, it's not authoritative GAAP (with limited SEC exceptions)."
        },
        {
          title: 'Codification Topic Numbers',
          type: 'table',
          headers: ['Number Range', 'Category', 'Examples'],
          rows: [
            ['100s', 'General Principles', '105 (GAAP), 205 (Presentation)'],
            ['200s', 'Presentation', '210 (Balance Sheet), 230 (Cash Flows)'],
            ['300s', 'Assets', '310 (Receivables), 330 (Inventory), 350 (Intangibles)'],
            ['400s', 'Liabilities', '410 (AROs), 420 (Exit Costs), 470 (Debt)'],
            ['500s', 'Equity', '505 (Equity), 718 (Stock Compensation)'],
            ['600s', 'Revenue', '606 (Revenue from Contracts)'],
            ['700s', 'Expenses', '710 (Compensation), 740 (Income Taxes)'],
            ['800s', 'Broad Transactions', '805 (Business Combinations), 842 (Leases)'],
            ['900s', 'Industry', '940 (Financial Services), 958 (NFP)']
          ]
        },
        {
          title: 'The Standard-Setting Process',
          type: 'text',
          content: "FASB follows an open, deliberative process:\n\n**1. Agenda Setting**\nFASB identifies issues from stakeholder feedback, SEC requests, or emerging transactions.\n\n**2. Research & Discussion**\nStaff researches issues; Board discusses in public meetings.\n\n**3. Exposure Draft**\nProposed standard released for **public comment** (typically 60-120 days).\n\n**4. Re-deliberation**\nBoard reviews comments, may revise proposal.\n\n**5. Final Standard (ASU)**\nAccounting Standards Update issued, becomes part of Codification.\n\n**6. Effective Date**\nUsually 1-3 years after issuance; early adoption often permitted."
        },
        {
          title: '🧠 Memory Aid: Standard-Setting Bodies',
          type: 'callout',
          content: "**Who sets the rules?**\n\n• **FASB** → U.S. GAAP for companies & NFPs\n• **GASB** → State & local governments\n• **FASAB** → Federal government\n• **IASB** → International standards (IFRS)\n• **SEC** → Additional rules for public companies\n• **PCAOB** → Auditing standards for public companies\n• **AICPA** → Auditing standards for private companies"
        },
        {
          title: 'SEC Role for Public Companies',
          type: 'text',
          content: "For SEC registrants, additional authoritative guidance includes:\n\n• **Regulation S-X** (form and content of financial statements)\n• **Regulation S-K** (non-financial disclosures)\n• **Staff Accounting Bulletins (SABs)**\n• **Financial Reporting Releases (FRRs)**\n\nThe SEC has statutory authority to establish GAAP for public companies but has historically looked to the private sector (FASB)."
        },
        {
          title: 'What About Old Standards?',
          type: 'text',
          content: "You might see references to pre-Codification standards:\n\n• **SFAS** (Statements of Financial Accounting Standards)\n• **APB Opinions** (Accounting Principles Board)\n• **ARBs** (Accounting Research Bulletins)\n• **EITF Issues** (Emerging Issues Task Force)\n\nThese are now **superseded**—their content was incorporated into the Codification. If you see a reference to 'SFAS 133' on the exam, know it's now in ASC 815 (Derivatives)."
        },
        {
          title: '⚠️ Exam Trap: Research Questions',
          type: 'warning',
          content: "TBS research questions require you to find specific guidance in the Codification. Tips:\n\n1. Use **keywords** from the question\n2. Know common topic numbers (606=Revenue, 842=Leases, 740=Taxes)\n3. Look for guidance in the **25 section** (Recognition) or **30 section** (Initial Measurement)\n4. Practice navigating the Codification BEFORE exam day!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "The FASB ASC is the single source of authoritative GAAP for nongovernmental entities",
            "Topic numbers: 100s General, 200s Presentation, 300s Assets, 400s Liabilities, 600s Revenue, 800s Transactions",
            "Standard-setting process: Agenda → Research → Exposure Draft → Comments → Final ASU",
            "SEC rules are also authoritative for public companies (S-X, S-K, SABs)",
            "GASB sets standards for state/local governments (NOT in the ASC)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-I-004',
    section: 'FAR',
    title: "SEC Reporting: 10-K, 10-Q, 8-K",
    description: "Master the SEC filing requirements that public companies must follow",
    order: 4,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["SEC Reporting", "10-K", "10-Q", "8-K", "Public Companies"],
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "If you work with public companies—as an auditor, accountant, or analyst—you'll deal with SEC filings constantly. The CPA exam tests your knowledge of filing deadlines, content requirements, and which events trigger immediate disclosure. This is heavily tested in both MCQ and TBS formats."
        },
        {
          title: 'Overview of SEC Reporting',
          type: 'text',
          content: "The Securities Exchange Act of 1934 requires companies with publicly traded securities to file periodic reports with the SEC. These reports ensure that investors have access to material information.\n\n**Key Filing Types:**\n• **Form 10-K** — Annual report\n• **Form 10-Q** — Quarterly report\n• **Form 8-K** — Current report (significant events)\n• **Proxy Statement (DEF 14A)** — Shareholder meeting info\n• **Form S-1** — IPO registration"
        },
        {
          title: 'Filer Categories & Deadlines',
          type: 'table',
          headers: ['Category', 'Public Float', '10-K Deadline', '10-Q Deadline'],
          rows: [
            ['Large Accelerated Filer', '≥ $700 million', '60 days', '40 days'],
            ['Accelerated Filer', '$75M - $700M', '75 days', '40 days'],
            ['Non-Accelerated Filer', '< $75 million', '90 days', '45 days'],
            ['Smaller Reporting Company', '< $250M (or < $100M revenue)', '90 days', '45 days']
          ]
        },
        {
          title: '🧠 Memory Aid: Filing Deadlines',
          type: 'callout',
          content: "**Large Accelerated = FASTEST**\n• 10-K: 60 days (2 months)\n• 10-Q: 40 days\n\n**Think:** The bigger you are, the more resources you have, so you file faster!\n\nAll deadlines are from **fiscal period end**."
        },
        {
          title: 'Form 10-K: Annual Report',
          type: 'text',
          content: "The 10-K is the most comprehensive filing, providing a complete picture of the company's financial condition.\n\n**Required Content:**\n\n**Part I:**\n• Item 1: Business description\n• Item 1A: Risk factors\n• Item 1B: Unresolved staff comments\n• Item 2: Properties\n• Item 3: Legal proceedings\n• Item 4: Mine safety disclosures\n\n**Part II:**\n• Item 5: Market for common equity\n• Item 6: [Reserved]\n• Item 7: **MD&A** (Management's Discussion & Analysis)\n• Item 7A: Quantitative/qualitative market risk disclosures\n• Item 8: **Financial statements and supplementary data**\n• Item 9: Changes in and disagreements with accountants\n• Item 9A: **Controls and procedures** (including SOX 404)\n\n**Part III:**\n• Directors, executive compensation, ownership (can incorporate proxy)\n\n**Part IV:**\n• Exhibits and financial statement schedules"
        },
        {
          title: 'Form 10-Q: Quarterly Report',
          type: 'text',
          content: "The 10-Q provides interim financial updates. Filed for Q1, Q2, and Q3 (Q4 is covered in the 10-K).\n\n**Key Differences from 10-K:**\n• Financial statements are **unaudited** (but reviewed by auditors)\n• Condensed format permitted\n• No full notes required (only material changes)\n• Shorter MD&A focusing on changes from prior periods\n\n**Required Financial Statements:**\n• Condensed balance sheet (current + prior year-end)\n• Condensed income statement (current quarter + YTD)\n• Condensed cash flow statement (YTD)\n• Condensed stockholders' equity (current quarter + YTD)"
        },
        {
          title: 'Form 8-K: Current Report',
          type: 'text',
          content: "The 8-K reports significant events that shareholders should know about immediately. Most items must be filed within **4 business days**.\n\n**Common 8-K Triggers:**"
        },
        {
          title: 'Form 8-K Triggering Events',
          type: 'list',
          content: [
            { term: "Entry into Material Agreement", definition: "Signing significant contracts, credit facilities, or M&A agreements" },
            { term: "Termination of Material Agreement", definition: "Ending major contracts or relationships" },
            { term: "Bankruptcy or Receivership", definition: "Filing for Chapter 7, 11, or similar proceedings" },
            { term: "Completion of Acquisition/Disposition", definition: "Closing of significant business combinations or sales" },
            { term: "Results of Operations", definition: "Material impairments, restructuring charges (this is voluntary)" },
            { term: "Creation of Financial Obligation", definition: "New debt, guarantees, or off-balance sheet arrangements" },
            { term: "Triggering Events for Accelerated Obligations", definition: "Events triggering early repayment of debt" },
            { term: "Changes in Certifying Accountant", definition: "Hiring or dismissing the external auditor—file within 4 days!" },
            { term: "Change in Directors/Officers", definition: "Resignation, appointment, or removal of key personnel" },
            { term: "Amendments to Articles/Bylaws", definition: "Changes to charter documents" },
            { term: "Changes in Fiscal Year", definition: "Must explain the change and transition period" }
          ]
        },
        {
          title: '⚠️ Exam Trap: 8-K Timing',
          type: 'warning',
          content: "The default 8-K deadline is **4 business days**, but some items have different requirements:\n\n• Results of operations/financial condition: **No deadline** (voluntary disclosure)\n• Regulation FD disclosures: **Same day** or **24 hours** if non-intentional\n• Earnings releases attached to 8-K: Often filed **same day** as press release"
        },
        {
          title: 'MD&A Requirements',
          type: 'text',
          content: "Management's Discussion & Analysis is one of the **most important** sections. It requires management to discuss:\n\n**1. Liquidity**\n• Sources and uses of cash\n• Material cash requirements\n• Off-balance sheet arrangements\n\n**2. Capital Resources**\n• Material commitments for capital expenditures\n• Trends in capital resources\n\n**3. Results of Operations**\n• Revenue and expense trends\n• Unusual or infrequent events\n• Known trends or uncertainties\n\n**4. Critical Accounting Estimates**\n• Significant estimates and assumptions\n• Sensitivity to changes"
        },
        {
          title: 'XBRL Requirements',
          type: 'text',
          content: "Public companies must submit financial statements in **XBRL** (eXtensible Business Reporting Language) format.\n\n• Machine-readable tagging of financial data\n• Enables automated analysis and comparison\n• Cover page, financial statements, and notes must be tagged\n• Uses the US GAAP Taxonomy"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "10-K is the annual report with audited financials; deadline is 60/75/90 days based on filer status",
            "10-Q is quarterly with reviewed (not audited) financials; deadline is 40/45 days",
            "8-K reports significant events within 4 business days (usually)",
            "Large accelerated filers (≥$700M float) have the fastest deadlines",
            "MD&A covers liquidity, capital resources, results of operations, and critical estimates"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-I-005',
    section: 'FAR',
    title: "GAAP vs IFRS: Key Differences",
    description: "Understand the critical differences between U.S. GAAP and International Financial Reporting Standards",
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["IFRS", "GAAP", "International Accounting", "Convergence"],
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The CPA exam includes IFRS questions throughout FAR. You don't need to be an IFRS expert, but you must know the **key differences** from U.S. GAAP. Expect 10-20% of FAR questions to touch on IFRS, usually asking 'How would this be different under IFRS?'"
        },
        {
          title: 'Principles vs. Rules',
          type: 'text',
          content: "The fundamental philosophical difference:\n\n**U.S. GAAP = Rules-Based**\n• Detailed, specific guidance for many scenarios\n• Bright-line tests (e.g., 75% of asset's life for lease classification—pre-ASC 842)\n• More extensive Codification with specific implementation guidance\n\n**IFRS = Principles-Based**\n• Broader principles, more judgment required\n• Fewer specific rules, more emphasis on substance over form\n• Shorter standards, less implementation guidance\n\n**Result:** IFRS requires more professional judgment; GAAP provides more specific answers."
        },
        {
          title: 'Framework Differences',
          type: 'table',
          headers: ['Topic', 'U.S. GAAP', 'IFRS'],
          rows: [
            ['Standard Setter', 'FASB', 'IASB (International Accounting Standards Board)'],
            ['Authoritative Literature', 'FASB ASC', 'IFRS Standards + IAS Standards'],
            ['Conceptual Framework', 'SFAC No. 8', 'Conceptual Framework (2018)'],
            ['Industry Guidance', 'Extensive (ASC 900s)', 'Limited industry-specific guidance'],
            ['First-time Adoption', 'Not applicable', 'IFRS 1 required for first-time adopters']
          ]
        },
        {
          title: 'Inventory Differences',
          type: 'text',
          content: "**LIFO:**\n• U.S. GAAP: **LIFO permitted**\n• IFRS: **LIFO prohibited**\n\nThis is one of the most commonly tested differences!\n\n**Inventory Write-downs:**\n• U.S. GAAP: Lower of cost or NRV; write-downs are **permanent** (no reversal)\n• IFRS: Lower of cost or NRV; write-downs **can be reversed** up to original cost\n\n**Cost Formulas:**\n• Both allow FIFO and weighted average\n• Both require consistent application"
        },
        {
          title: '🧠 Memory Aid: "LIFO = NO-GO for IFRS"',
          type: 'callout',
          content: "When you see LIFO on the exam with an IFRS angle, remember:\n\n**L**IFO\n**I**s\n**F**orbidden in\n**O**ther (international) standards\n\nAlso remember: IFRS lets you **reverse** inventory write-downs; GAAP doesn't!"
        },
        {
          title: 'Property, Plant & Equipment',
          type: 'list',
          content: [
            { term: "Measurement Model (GAAP)", definition: "Cost model only. Assets carried at cost less accumulated depreciation and impairment." },
            { term: "Measurement Model (IFRS)", definition: "Choice of cost model OR revaluation model. Revaluation model: assets at fair value with changes in OCI." },
            { term: "Component Depreciation (GAAP)", definition: "Permitted but rarely used. Typically depreciate asset as a whole." },
            { term: "Component Depreciation (IFRS)", definition: "Required if components have different useful lives. Each significant component depreciated separately." },
            { term: "Impairment Reversal (GAAP)", definition: "Prohibited for assets held and used." },
            { term: "Impairment Reversal (IFRS)", definition: "Required if circumstances change. Reverse up to what carrying amount would have been." }
          ]
        },
        {
          title: 'Revenue Recognition',
          type: 'text',
          content: "**Good news:** This is now largely converged!\n\nBoth U.S. GAAP (ASC 606) and IFRS (IFRS 15) use the **same 5-step model**:\n1. Identify the contract\n2. Identify performance obligations\n3. Determine transaction price\n4. Allocate transaction price\n5. Recognize revenue when/as obligations satisfied\n\n**Minor differences exist in:**\n• Licenses of IP (some detailed guidance differs)\n• Interim disclosure requirements"
        },
        {
          title: 'Lease Accounting',
          type: 'text',
          content: "**Lessee Accounting:**\n• GAAP (ASC 842): Two types—**Finance** and **Operating** leases\n• IFRS (IFRS 16): **Single model**—almost all leases on balance sheet as finance leases\n\n**Key Difference:** Under IFRS, the lessee doesn't distinguish between finance and operating leases (with limited exceptions for short-term and low-value leases).\n\n**Lessor Accounting:** Both have similar classification (operating, finance/sales-type, direct financing)."
        },
        {
          title: 'Development Costs',
          type: 'text',
          content: "**Research Costs:**\n• GAAP: **Expense as incurred**\n• IFRS: **Expense as incurred**\n(Same treatment)\n\n**Development Costs:**\n• GAAP: Generally **expense as incurred** (except software under ASC 985/350)\n• IFRS: **Capitalize** if specific criteria are met:\n  - Technical feasibility\n  - Intent to complete\n  - Ability to use or sell\n  - Probable future benefits\n  - Resources available\n  - Costs reliably measurable"
        },
        {
          title: 'Investment Property (Unique to IFRS)',
          type: 'text',
          content: "IFRS has a separate category called **Investment Property** (IAS 40):\n\n• Property held to earn rentals or capital appreciation\n• Can use cost model or **fair value model** (changes in P&L)\n• U.S. GAAP has no equivalent—such property is just PPE or inventory"
        },
        {
          title: 'Other Key Differences',
          type: 'table',
          headers: ['Area', 'U.S. GAAP', 'IFRS'],
          rows: [
            ['Extraordinary Items', 'Prohibited (ASC 225)', 'Prohibited (IAS 1)—Converged!'],
            ['Contingent Liabilities', 'Probable = >75% likely', 'Probable = >50% likely (lower threshold)'],
            ['Borrowing Costs', 'Capitalize for qualifying assets', 'Same—must capitalize (converged)'],
            ['Biological Assets', 'No specific guidance (cost)', 'Fair value less costs to sell (IAS 41)'],
            ['Statement of Cash Flows—Interest', 'Operating activity', 'Operating OR Financing (choice)'],
            ['Statement of Cash Flows—Dividends Paid', 'Financing activity', 'Operating OR Financing (choice)']
          ]
        },
        {
          title: '⚠️ Exam Strategy: IFRS Questions',
          type: 'warning',
          content: "When you see an IFRS question:\n\n1. **Read carefully**—are they asking how IFRS differs or how it's the same?\n2. **Remember the big differences:** LIFO, revaluation, impairment reversal, development costs, investment property\n3. **Recent convergence:** Revenue (ASC 606/IFRS 15) and Leases (mostly) are now similar\n4. **Default assumption:** If unsure, IFRS is usually more flexible/principles-based"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "LIFO is prohibited under IFRS—most frequently tested difference!",
            "IFRS allows revaluation model for PPE; GAAP requires cost model only",
            "IFRS requires reversal of impairments if circumstances change; GAAP prohibits it",
            "IFRS capitalizes development costs if criteria met; GAAP expenses them (mostly)",
            "Revenue recognition is now converged (5-step model in both)",
            "IFRS has more flexibility in cash flow statement classification"
          ]
        }
      ]
    }
  },
  // ==========================================
  // FAR-I ADDITIONAL: RECOGNITION & MEASUREMENT
  // ==========================================
  {
    id: 'FAR-I-006',
    section: 'FAR',
    title: "Recognition Criteria and Derecognition",
    description: "Apply the criteria for when to record and remove items from financial statements",
    order: 91,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Conceptual Framework", "Recognition", "Derecognition"],
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Recognition determines WHEN items appear on financial statements! Understanding the criteria helps you reason through complex transactions. The exam tests recognition criteria for assets, liabilities, revenue, and expenses."
        },
        {
          title: 'Recognition Criteria',
          type: 'text',
          content: "**An item should be recognized when:**\n\n1. **Meets definition** of an element (asset, liability, etc.)\n2. **Measurable** with sufficient reliability\n3. **Relevant** - capable of making a difference\n4. **Faithfully represented** - complete, neutral, free from error\n\n**All four criteria must be met!**"
        },
        {
          title: 'Asset Recognition',
          type: 'table',
          headers: ['Criterion', 'Test', 'Example'],
          rows: [
            ['Present right', 'Control of resource', 'Equipment owned'],
            ['Economic benefit', 'Will generate cash flows', 'Inventory to sell'],
            ['Past transaction', 'Already occurred', 'Purchase completed'],
            ['Measurable', 'Can determine amount', 'Invoice received']
          ]
        },
        {
          title: '🧠 Memory Aid: Recognition',
          type: 'callout',
          content: "**\"MDRM\"** for recognition:\n\n**M**eets definition\n**D**eterminable (measurable)\n**R**elevant information\n**M**eets faithful representation\n\n**All four = Recognize it!**"
        },
        {
          title: 'Derecognition',
          type: 'text',
          content: "**When to REMOVE items:**\n\n**Assets:**\n• No longer meets definition (no future benefit)\n• Sold, transferred, or consumed\n• Control is lost\n\n**Liabilities:**\n• Obligation extinguished\n• Legally released\n• Satisfied, cancelled, or expired\n\n**Recognize gain/loss on derecognition**"
        },
        {
          title: 'Common Recognition Issues',
          type: 'table',
          headers: ['Item', 'Recognition Trigger', 'Key Consideration'],
          rows: [
            ['Contingent liability', 'Probable and estimable', 'Use \"probable\" threshold'],
            ['Gain contingency', 'Usually NOT until realized', 'Conservative approach'],
            ['Warranty liability', 'At point of sale', 'Estimate future costs'],
            ['Gift/Grant', 'When conditions met', 'Conditional vs. unconditional']
          ]
        },
        {
          title: '⚠️ Exam Trap: Probable Definition',
          type: 'warning',
          content: "**Probable means different things!**\n\n**U.S. GAAP:** Probable = Likely to occur (~75%+)\n**IFRS:** Probable = More likely than not (>50%)\n\n**IFRS has a LOWER threshold for recognition!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Recognition requires: Definition, Measurable, Relevant, Faithful",
            "Derecognition when no longer meets definition or control lost",
            "Assets: Present right to future economic benefit",
            "Liabilities: Present obligation to transfer resources",
            "Contingencies: Probable and estimable for recognition",
            "GAAP probable (~75%) vs. IFRS probable (>50%)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-I-007',
    section: 'FAR',
    title: "Measurement Bases and Fair Value Concepts",
    description: "Apply different measurement approaches in financial reporting",
    order: 92,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Conceptual Framework", "Measurement", "Fair Value"],
    blueprintArea: 'FAR-I',
    blueprintTopic: 'FAR-I-A-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "How you MEASURE an item affects reported amounts! GAAP uses different measurement bases for different items. Understanding when to use historical cost vs. fair value is essential for FAR!"
        },
        {
          title: 'Measurement Bases',
          type: 'table',
          headers: ['Basis', 'Definition', 'Common Uses'],
          rows: [
            ['Historical Cost', 'Original transaction price', 'PP&E, most assets initially'],
            ['Current Cost', 'Cost to replace today', 'Inventory (lower of cost/market)'],
            ['Fair Value', 'Exit price in orderly market', 'Investments, derivatives'],
            ['Net Realizable Value', 'Expected selling price − costs', 'Inventory, receivables'],
            ['Present Value', 'Discounted future cash flows', 'Long-term liabilities, leases']
          ]
        },
        {
          title: 'Fair Value Hierarchy',
          type: 'text',
          content: "**ASC 820 Fair Value Hierarchy:**\n\n**Level 1:** Quoted prices in active markets\n• Most reliable\n• Example: NYSE stock prices\n\n**Level 2:** Observable inputs\n• Similar assets, dealer quotes\n• Example: Corporate bond prices\n\n**Level 3:** Unobservable inputs\n• Management estimates\n• Example: Private company valuation"
        },
        {
          title: '🧠 Memory Aid: Fair Value Levels',
          type: 'callout',
          content: "**\"123 = QOE\"**\n\n**Level 1:** **Q**uoted prices (best)\n**Level 2:** **O**bservable inputs (good)\n**Level 3:** **E**stimates/models (least reliable)\n\n**Use highest level available!**"
        },
        {
          title: 'Mixed Attribute Model',
          type: 'text',
          content: "**GAAP uses multiple measurement bases:**\n\n• **Historical Cost:** PP&E, intangibles, most assets\n• **Fair Value:** Trading securities, derivatives\n• **Amortized Cost:** Held-to-maturity securities\n• **NRV:** Inventory impairment\n• **Present Value:** Bonds payable, leases\n\n**No single approach—must know which applies!**"
        },
        {
          title: 'Fair Value Option',
          type: 'text',
          content: "**ASC 825 allows optional fair value for:**\n\n• Financial assets and liabilities\n• Firm commitments\n• Loan commitments\n\n**Election:**\n• Irrevocable once made\n• Changes in FV go to earnings\n• Must disclose election\n\n**Reduces accounting mismatch**"
        },
        {
          title: '⚠️ Exam Trap: Level 3 Disclosure',
          type: 'warning',
          content: "**Level 3 requires extensive disclosures:**\n\n• Description of valuation technique\n• Inputs used\n• Reconciliation of beginning to ending\n• Sensitivity analysis\n\n**More reliance on estimates = More disclosure!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "GAAP uses mixed attribute model (multiple bases)",
            "Historical cost most common initial measurement",
            "Fair value hierarchy: Level 1 (quoted) > Level 2 (observable) > Level 3 (estimates)",
            "Present value used for long-term items",
            "Fair value option available for financial instruments",
            "Level 3 requires significant disclosure"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-001',
    section: 'FAR',
    title: "Cash & Cash Equivalents: Recognition & Measurement",
    description: "Master the classification and reporting of cash and cash equivalents",
    order: 6,
    duration: 35,
    difficulty: 'intermediate',
    topics: ["Assets", "Cash", "Cash Equivalents"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cash seems simple, but the exam loves tricky classification questions. What counts as cash? What's restricted? What's a cash equivalent? These distinctions affect liquidity ratios and financial statement presentation. Don't let easy points slip away on cash questions!"
        },
        {
          title: 'What Qualifies as Cash?',
          type: 'text',
          content: "**Cash** includes:\n\n• Currency and coins on hand\n• Demand deposits (checking accounts)\n• Money orders and certified checks\n• Undeposited customer checks\n• Petty cash funds\n• Checking and savings accounts\n\n**NOT Cash:**\n• Postdated checks (receivable until date)\n• IOUs (receivable)\n• Travel advances (prepaid expense)\n• Postage stamps (prepaid expense)\n• Certificates of deposit > 3 months (short-term investment)"
        },
        {
          title: 'Cash Equivalents',
          type: 'text',
          content: "Cash equivalents are short-term, highly liquid investments that are:\n\n1. **Readily convertible** to known amounts of cash\n2. **So near maturity** that they present insignificant risk of value changes\n3. Original maturity of **3 months or less** from date of acquisition\n\n**Examples:**\n• Treasury bills (≤ 3 months)\n• Commercial paper (≤ 3 months)\n• Money market funds\n\n**Key Point:** A 6-month T-bill purchased with 2 months remaining is a cash equivalent. The test is original maturity FROM ACQUISITION, not original issue date."
        },
        {
          title: '⚠️ Exam Trap: The 3-Month Rule',
          type: 'warning',
          content: "The 3-month test is from the **entity's acquisition date**, NOT the original issue date!\n\n**Example:** Company buys a 1-year Treasury note when it has 60 days to maturity.\n• This IS a cash equivalent (60 days < 3 months)\n\n**Example:** Company buys a 90-day CD on Day 1.\n• This IS a cash equivalent (original maturity 90 days = 3 months)"
        },
        {
          title: 'Restricted Cash',
          type: 'text',
          content: "Cash is **restricted** when contractual or legal constraints limit its use.\n\n**Common Restrictions:**\n• Compensating balance requirements\n• Bond sinking fund requirements\n• Escrow deposits\n• Cash held for specific litigation\n• Cash restricted for plant expansion\n\n**Presentation:**\n• Current vs. non-current based on when restriction expires\n• Must be **disclosed** in notes\n• Include in total cash on cash flow statement with separate disclosure"
        },
        {
          title: 'Bank Overdrafts',
          type: 'text',
          content: "**Negative cash balance** at a bank:\n\n**General Rule:** Report as a **current liability** (not negative cash)\n\n**Exception:** If the company has another account at the SAME bank with sufficient funds, it may **offset** the accounts (net the overdraft against positive balance).\n\n**Cannot Offset:**\n• Accounts at different banks\n• Overdraft exceeds all positive balances at same bank"
        },
        {
          title: 'Cash Classifications',
          type: 'table',
          headers: ['Item', 'Classification', 'Explanation'],
          rows: [
            ['Checking account', 'Cash', 'Demand deposit'],
            ['Money market fund', 'Cash equivalent', 'Highly liquid, insignificant risk'],
            ['90-day CD', 'Cash equivalent', '3 months or less maturity'],
            ['6-month CD', 'Short-term investment', 'Exceeds 3-month threshold'],
            ['Compensating balance (legally restricted)', 'Restricted cash', 'Cannot use freely'],
            ['Sinking fund for bonds due in 5 years', 'Non-current restricted cash', 'Long-term restriction'],
            ['Postdated check received', 'Receivable', 'Not cash until date on check'],
            ['NSF check returned', 'Receivable', 'Must collect from customer']
          ]
        },
        {
          title: 'Presentation in Financial Statements',
          type: 'text',
          content: "**Balance Sheet:**\n• Cash and cash equivalents typically first line of current assets\n• Restricted cash shown separately (current or non-current)\n• Note disclosure of composition and restrictions\n\n**Cash Flow Statement:**\n• Explain changes in cash AND cash equivalents AND restricted cash\n• Beginning and ending amounts must reconcile to balance sheet totals\n• Transfers between cash and restricted cash don't appear as activities"
        },
        {
          title: 'Internal Controls Over Cash',
          type: 'text',
          content: "Key controls tested on CPA exam:\n\n• **Segregation of duties:** Person handling cash ≠ person recording cash\n• **Daily deposits:** Minimize cash on hand\n• **Prenumbered receipts:** Create audit trail\n• **Bank reconciliations:** Independent party, performed monthly\n• **Imprest petty cash:** Fixed fund, replenished to constant amount"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cash equivalents must have original maturity of 3 months or less FROM ACQUISITION DATE",
            "Bank overdrafts are liabilities unless offset with positive balance at SAME bank",
            "Restricted cash is disclosed separately; classification depends on when restriction expires",
            "Postdated checks and IOUs are receivables, NOT cash",
            "Postage stamps and travel advances are prepaid expenses, NOT cash"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-002',
    section: 'FAR',
    title: "Bank Reconciliations: The Complete Process",
    description: "Master the mechanics of reconciling book and bank balances",
    order: 7,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Assets", "Cash", "Bank Reconciliation"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Bank reconciliations appear in TBS simulations where you must prepare a complete reconciliation AND determine the correct cash balance. This is a core accountant skill—master the format and adjustments, and these become easy points on exam day."
        },
        {
          title: 'Purpose of Bank Reconciliation',
          type: 'text',
          content: "A bank reconciliation explains the difference between:\n\n• **Bank statement balance** (what the bank shows)\n• **Book balance** (what the company's records show)\n\nDifferences arise because:\n1. **Timing differences** — Items recorded by one party but not yet by the other\n2. **Errors** — Mistakes by the bank or the company"
        },
        {
          title: 'The Reconciliation Format',
          type: 'text',
          content: "**Bank Side → True Cash Balance**\n```\nBank balance per statement                    $XX,XXX\nAdd: Deposits in transit                       X,XXX\nDeduct: Outstanding checks                    (X,XXX)\nAdd/Deduct: Bank errors                         ±XXX\n                                             -------\nAdjusted (True) Bank Balance                 $XX,XXX\n```\n\n**Book Side → True Cash Balance**\n```\nBook balance per records                      $XX,XXX\nAdd: Collections by bank (notes, etc.)         X,XXX\nAdd: Interest earned                             XXX\nDeduct: Bank service charges                    (XXX)\nDeduct: NSF checks                            (X,XXX)\nAdd/Deduct: Book errors                         ±XXX\n                                             -------\nAdjusted (True) Book Balance                 $XX,XXX\n```\n\n**The two adjusted balances must EQUAL!**"
        },
        {
          title: 'Bank Side Adjustments',
          type: 'list',
          content: [
            { term: "Deposits in Transit", definition: "Deposits recorded by company but not yet credited by bank. ADD to bank balance. No journal entry needed." },
            { term: "Outstanding Checks", definition: "Checks written by company but not yet cleared the bank. SUBTRACT from bank balance. No journal entry needed." },
            { term: "Bank Errors", definition: "Mistakes made by the bank. Adjust bank balance as appropriate. Notify bank—no journal entry by company." }
          ]
        },
        {
          title: 'Book Side Adjustments (REQUIRE JOURNAL ENTRIES!)',
          type: 'list',
          content: [
            { term: "Collections by Bank", definition: "Bank collected notes receivable on company's behalf. ADD to book. Entry: Dr Cash, Cr Notes Receivable" },
            { term: "Interest Earned", definition: "Interest credited by bank. ADD to book. Entry: Dr Cash, Cr Interest Revenue" },
            { term: "Service Charges", definition: "Bank fees for account maintenance. SUBTRACT from book. Entry: Dr Bank Charges Expense, Cr Cash" },
            { term: "NSF Checks", definition: "Customer checks that bounced. SUBTRACT from book. Entry: Dr Accounts Receivable, Cr Cash" },
            { term: "Book Errors", definition: "Company's recording mistakes. Correct as needed with journal entry." }
          ]
        },
        {
          title: '🧠 Memory Aid: "BANNS" for Book Adjustments',
          type: 'callout',
          content: "Book adjustments need journal entries—remember **BANNS**:\n\n**B**ank collections (Add)\n**A**djustments for errors (±)\n**N**SF checks (Subtract)\n**N**otes collected by bank (Add)\n**S**ervice charges (Subtract)\n\nIf it's on the BOOK side, you need a JOURNAL ENTRY!"
        },
        {
          title: 'Example: Complete Reconciliation',
          type: 'example',
          content: "**Given Information:**\n• Bank statement balance: $15,000\n• Book balance: $12,500\n• Deposits in transit: $3,000\n• Outstanding checks: $4,200\n• Bank collected note: $2,000 (plus $50 interest)\n• Service charges: $25\n• NSF check from customer: $325\n\n**Bank Reconciliation:**\n\nBank Balance: $15,000\n+ Deposits in transit: $3,000\n− Outstanding checks: ($4,200)\n= **Adjusted Bank Balance: $13,800**\n\nBook Balance: $12,500\n+ Note collected: $2,000\n+ Interest: $50\n− Service charges: ($25)\n− NSF check: ($325)\n+ Book error: $1,600 (if needed to balance)\n= **Adjusted Book Balance: $13,800** ✓"
        },
        {
          title: 'Journal Entries Required',
          type: 'text',
          content: "From the example above:\n\n**Note collection:**\nDr Cash                    $2,050\n    Cr Notes Receivable         $2,000\n    Cr Interest Revenue            $50\n\n**Service charges:**\nDr Bank Service Expense       $25\n    Cr Cash                        $25\n\n**NSF check:**\nDr Accounts Receivable       $325\n    Cr Cash                       $325"
        },
        {
          title: '⚠️ Exam Trap: Error Corrections',
          type: 'warning',
          content: "**Common exam scenario:** Company recorded a check for $72 but it was actually $27.\n\nThe company OVERSTATED the payment by $45 ($72 − $27).\n\n**Correction:** ADD $45 to the book balance.\n\nEntry: Dr Cash $45, Cr Accounts Payable $45\n\nAlways ask: Did the error OVERSTATE or UNDERSTATE cash?"
        },
        {
          title: 'Proof of Cash (4-Column Reconciliation)',
          type: 'text',
          content: "A **proof of cash** reconciles:\n1. Beginning balance\n2. Receipts/deposits\n3. Disbursements/checks\n4. Ending balance\n\nFormat: Four columns showing bank and book amounts for each.\n\nUsed when:\n• Internal control weaknesses suspected\n• Fraud investigation\n• New client (verify prior period)\n\nThis is advanced—may appear in TBS."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Deposits in transit: ADD to bank (no entry needed)",
            "Outstanding checks: SUBTRACT from bank (no entry needed)",
            "ALL book-side adjustments require journal entries",
            "NSF checks increase A/R and decrease Cash",
            "Bank collections increase Cash and decrease Notes Receivable",
            "Adjusted bank balance must equal adjusted book balance"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-003',
    section: 'FAR',
    title: "Accounts Receivable & Allowance Methods",
    description: "Master receivables recognition, valuation, and the allowance for doubtful accounts",
    order: 8,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Assets", "Receivables", "Allowance Method"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Receivables and the allowance for bad debts are tested heavily in both MCQ and TBS. You'll see calculations for bad debt expense, allowance balances, and write-offs. The CECL model (next lesson) has changed the rules, but the mechanics remain crucial."
        },
        {
          title: 'Recognition of Accounts Receivable',
          type: 'text',
          content: "Accounts receivable arise from **credit sales** of goods or services.\n\n**Initial Recognition:**\n• Record at the **exchange price** (invoice amount)\n• Adjust for trade discounts, returns, and allowances\n\n**Trade Discounts vs. Cash Discounts:**\n• **Trade discounts** — Reduce the invoice price (volume discounts, customer class)\n• **Cash discounts** — Offered for early payment (e.g., 2/10, n/30)"
        },
        {
          title: 'Cash Discount Terms',
          type: 'text',
          content: "**2/10, n/30** means:\n• **2%** discount if paid within **10 days**\n• Net (full) amount due in **30 days**\n\n**Two Methods to Record:**\n\n**Gross Method:** Record receivable at full amount; record discount when payment received\n\n**Net Method:** Record receivable at discounted amount; record lost discount if not taken"
        },
        {
          title: 'Gross vs. Net Method Example',
          type: 'example',
          content: "**Sale of $1,000, terms 2/10, n/30**\n\n**GROSS METHOD:**\nAt sale: Dr A/R $1,000, Cr Sales $1,000\n\nIf paid in 10 days:\nDr Cash $980\nDr Sales Discounts $20\n    Cr A/R $1,000\n\n**NET METHOD:**\nAt sale: Dr A/R $980, Cr Sales $980\n\nIf paid in 10 days:\nDr Cash $980, Cr A/R $980\n\nIf paid after 10 days:\nDr Cash $1,000\n    Cr A/R $980\n    Cr Sales Discounts Forfeited $20"
        },
        {
          title: 'The Allowance Method (Required by GAAP)',
          type: 'text',
          content: "GAAP requires the **allowance method** for bad debts (not direct write-off).\n\n**Why?** Matching principle—expense should be recognized in the same period as the related revenue.\n\n**Key Accounts:**\n• **Bad Debt Expense** (Income Statement)\n• **Allowance for Doubtful Accounts** (Contra-Asset, Balance Sheet)\n\n**Formula:**\nNet Realizable Value = Accounts Receivable − Allowance for Doubtful Accounts"
        },
        {
          title: 'Estimating Bad Debts (Pre-CECL)',
          type: 'list',
          content: [
            { term: "Percentage of Sales (Income Statement Approach)", definition: "Bad debt expense = Credit sales × Historical loss %. Focus on EXPENSE. Ignores existing allowance balance." },
            { term: "Percentage of Receivables (Balance Sheet Approach)", definition: "Desired ending allowance = A/R × Historical loss %. Focus on ALLOWANCE. Expense is plug." },
            { term: "Aging of Receivables", definition: "Group receivables by age, apply different %s to each bucket. Most accurate balance sheet approach." }
          ]
        },
        {
          title: 'Allowance T-Account Analysis',
          type: 'text',
          content: "**Understanding the Allowance Account:**\n\n```\n    Allowance for Doubtful Accounts\n    ─────────────────────────────────\n    Write-offs    │    Beg. Balance\n    (reduce)      │    Bad Debt Expense\n                  │    Recoveries\n    ─────────────────────────────────\n                  │    Ending Balance\n```\n\n**Key Relationships:**\nBeg. Allowance + Bad Debt Expense + Recoveries − Write-offs = End. Allowance"
        },
        {
          title: 'Write-off and Recovery Entries',
          type: 'text',
          content: "**Write-off (account deemed uncollectible):**\nDr Allowance for Doubtful Accounts\n    Cr Accounts Receivable\n\n*Note: NO expense recognized—already estimated!*\n\n**Recovery (written-off account later collected):**\n\nStep 1 — Reinstate the receivable:\nDr Accounts Receivable\n    Cr Allowance for Doubtful Accounts\n\nStep 2 — Record the collection:\nDr Cash\n    Cr Accounts Receivable"
        },
        {
          title: '⚠️ Exam Trap: Write-offs Don\'t Affect Expense!',
          type: 'warning',
          content: "A common mistake: thinking write-offs create bad debt expense.\n\n**Write-off journal entry:**\nDr Allowance (contra-asset)\n    Cr Accounts Receivable (asset)\n\n**Both sides are on the balance sheet!**\n\nNet realizable value stays the same:\n• A/R decreases\n• Allowance decreases by same amount\n• Net A/R unchanged"
        },
        {
          title: 'Calculating Bad Debt Expense',
          type: 'example',
          content: "**Aging Method Example:**\n\nAging analysis indicates desired allowance: $15,000\nBeginning allowance balance: $12,000\nWrite-offs during year: $8,000\nRecoveries: $1,000\n\n**Calculate bad debt expense:**\n\nBeg. Allowance          $12,000\n+ Bad Debt Expense           ?\n+ Recoveries             $1,000\n− Write-offs            ($8,000)\n= End. Allowance        $15,000\n\nSolving: $12,000 + X + $1,000 − $8,000 = $15,000\n**Bad Debt Expense = $10,000**"
        },
        {
          title: 'Percentage of Sales Method',
          type: 'example',
          content: "**Example:**\n• Credit sales: $500,000\n• Historical bad debt rate: 2%\n\n**Bad Debt Expense = $500,000 × 2% = $10,000**\n\nEntry:\nDr Bad Debt Expense        $10,000\n    Cr Allowance                $10,000\n\n*Note: This method ignores the existing allowance balance. Just add to it.*"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "GAAP requires the allowance method—direct write-off is NOT GAAP",
            "Write-offs reduce BOTH A/R and Allowance—no P&L impact",
            "Recoveries: First reinstate receivable, then record cash collection",
            "% of Sales focuses on EXPENSE; % of Receivables focuses on ALLOWANCE BALANCE",
            "Aging method applies different rates to different age buckets—most accurate"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-004',
    section: 'FAR',
    title: "CECL: Current Expected Credit Losses",
    description: "Understand the forward-looking credit loss model under ASC 326",
    order: 9,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Assets", "CECL", "Credit Losses", "ASC 326"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "CECL (ASC 326) fundamentally changed how companies estimate credit losses. Instead of waiting for losses to be 'probable,' companies now estimate LIFETIME expected losses from Day 1. This is a major exam topic—understand the philosophy and mechanics."
        },
        {
          title: 'CECL Overview',
          type: 'text',
          content: "**CECL = Current Expected Credit Losses**\n\nEffective for:\n• SEC filers: 2020\n• Smaller reporting companies & private: 2023\n\n**Key Change:**\nOld model: Recognize losses when \"probable\" (incurred loss model)\nCECL: Recognize **lifetime expected losses** at inception (expected loss model)\n\n**Result:** Earlier recognition of credit losses; larger Day 1 allowances"
        },
        {
          title: 'Scope of CECL',
          type: 'text',
          content: "CECL applies to financial assets measured at **amortized cost**:\n\n• **Trade receivables**\n• **Loans and notes receivable**\n• **Held-to-maturity debt securities**\n• **Net investment in leases** (lessor)\n• **Loan commitments and financial guarantees**\n\n**NOT in scope:**\n• Trading securities (fair value through P&L)\n• AFS debt securities (separate impairment model)\n• Equity securities"
        },
        {
          title: 'The CECL Approach',
          type: 'text',
          content: "**Estimate losses over the FULL contractual life:**\n\n1. Pool assets with similar risk characteristics\n2. Consider:\n   • Historical loss experience\n   • Current conditions\n   • **Reasonable and supportable forecasts**\n3. Recognize lifetime expected losses as an allowance\n4. Update each reporting period\n\n**Key Innovation:** Forward-looking forecasts are REQUIRED, not optional."
        },
        {
          title: 'CECL vs. Incurred Loss Model',
          type: 'table',
          headers: ['Aspect', 'Old (Incurred Loss)', 'CECL (Expected Loss)'],
          rows: [
            ['When to recognize', 'When loss is probable', 'At inception (Day 1)'],
            ['Loss horizon', 'Short-term (emerged losses)', 'Full contractual life'],
            ['Forecasts', 'Not required', 'Required—reasonable & supportable'],
            ['Threshold', 'Probable (>75%)', 'Expected (any amount expected)'],
            ['Result', 'Delayed loss recognition', 'Earlier, larger allowances']
          ]
        },
        {
          title: '🧠 Memory Aid: CECL Philosophy',
          type: 'callout',
          content: "Think of CECL as **\"pessimistic from Day 1\"**:\n\n• When you originate a loan, some borrowers WILL default\n• Don't wait until default is \"probable\"—estimate it NOW\n• Consider the FUTURE, not just the past\n\n**Analogy:** It's like buying insurance on Day 1 for the expected accidents over the loan's life."
        },
        {
          title: 'Measurement Methods',
          type: 'list',
          content: [
            { term: "Loss Rate Method", definition: "Apply historical loss rate to amortized cost balance. Most common for trade receivables. Adjust for current conditions and forecasts." },
            { term: "Vintage Analysis", definition: "Track losses by origination year. Useful when risk varies by when asset was originated." },
            { term: "Probability of Default × Loss Given Default", definition: "PD × LGD × Exposure. Sophisticated approach used by banks and financial institutions." },
            { term: "Discounted Cash Flow", definition: "Compare contractual cash flows to expected cash flows. Used for individually evaluated assets." }
          ]
        },
        {
          title: 'Trade Receivables: Simplified Approach',
          type: 'text',
          content: "For trade receivables without significant financing component:\n\n• Can use **simplified approach**\n• Measure at lifetime expected losses (no staging)\n• Practical expedient: **Aging schedule** with loss rates\n\n**Example:**\n```\nAge Bucket          Balance    Loss Rate    Allowance\n0-30 days          $100,000      1%         $1,000\n31-60 days          $50,000      3%         $1,500\n61-90 days          $20,000     10%         $2,000\n>90 days            $10,000     30%         $3,000\n                                           -------\nTotal Allowance                             $7,500\n```"
        },
        {
          title: 'Forecasts in CECL',
          type: 'text',
          content: "**Reasonable and Supportable Forecasts:**\n\n• Use available information without undue cost/effort\n• Consider macroeconomic factors (GDP, unemployment, housing)\n• Forecast period varies—use what's supportable\n• Beyond forecast period: Revert to historical losses\n\n**Reversion Methods:**\n• Immediate reversion to historical\n• Straight-line reversion over time\n• Other systematic approaches"
        },
        {
          title: 'Journal Entry: Initial Recognition',
          type: 'example',
          content: "**Scenario:** Company originates $1,000,000 in receivables. CECL analysis estimates lifetime losses of $25,000.\n\n**Entry at origination:**\nDr Bad Debt Expense (or Provision)    $25,000\n    Cr Allowance for Credit Losses          $25,000\n\n**Balance Sheet Presentation:**\nAccounts Receivable                 $1,000,000\nLess: Allowance for Credit Losses      (25,000)\nNet Receivables                       $975,000\n\n**Note:** Full allowance recorded on Day 1!"
        },
        {
          title: 'Updates Each Period',
          type: 'text',
          content: "**Each reporting period:**\n\n1. Re-estimate expected credit losses\n2. Adjust allowance to match new estimate\n3. Difference flows through P&L\n\n**If conditions improve:**\n• Reduce allowance\n• Credit to P&L (recovery of provision)\n\n**If conditions worsen:**\n• Increase allowance\n• Debit to P&L (additional provision)"
        },
        {
          title: '⚠️ Exam Trap: AFS Securities Are Different',
          type: 'warning',
          content: "CECL does NOT apply to available-for-sale debt securities!\n\nAFS securities have their own impairment model:\n• Recognize allowance only if fair value < amortized cost\n• Credit loss = amortized cost − present value of expected cash flows\n• Non-credit loss = remaining decline (recorded in OCI)\n\nDon't confuse the two models on the exam!"
        },
        {
          title: 'Disclosure Requirements',
          type: 'text',
          content: "CECL requires extensive disclosures:\n\n• **Credit quality** indicators and aging\n• **Allowance rollforward** (beginning, provisions, write-offs, recoveries, ending)\n• **Methods and assumptions** used\n• **Vintage disclosures** (for certain entities)\n• **Purchased credit-deteriorated** asset information"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CECL requires recognition of LIFETIME expected losses from Day 1",
            "Forward-looking forecasts (economic conditions) are REQUIRED",
            "Applies to: trade receivables, loans, HTM securities, lease receivables",
            "Does NOT apply to: trading securities, AFS securities, equity securities",
            "Trade receivables can use simplified aging approach with loss rates",
            "Allowance is updated each period with changes flowing through P&L"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-005',
    section: 'FAR',
    title: "Notes Receivable & Impairment",
    description: "Account for long-term receivables, present value calculations, and impairment",
    order: 10,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Assets", "Receivables", "Notes Receivable", "Present Value"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-C-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Notes receivable questions test your understanding of present value concepts and interest recognition. TBS simulations may require you to calculate the present value of a note, determine interest income, and assess impairment. Master the time value of money!"
        },
        {
          title: 'Notes Receivable vs. Accounts Receivable',
          type: 'text',
          content: "**Notes Receivable:**\n• Formal written promise to pay\n• Typically longer-term (> 1 year)\n• Usually bear interest explicitly\n• More enforceable than A/R\n\n**When to Record at Present Value:**\n• Notes with **no stated interest** or **below-market interest**\n• Notes arising from non-cash transactions\n• Notes with terms > 1 year\n\n**Exception:** Trade receivables due within 1 year—record at face value."
        },
        {
          title: 'Present Value Concepts',
          type: 'text',
          content: "**Time Value of Money:**\nA dollar today is worth more than a dollar in the future.\n\n**Present Value Formula:**\nPV = FV ÷ (1 + r)^n\n\nOr using tables:\nPV = FV × PV factor\n\n**For annuities (equal payments):**\nPV = Payment × PV of Ordinary Annuity factor\n\n**Key Insight:** Notes receivable are recorded at the **present value of future cash flows**, not face value (unless interest rate is market rate)."
        },
        {
          title: 'Zero-Interest-Bearing Note',
          type: 'example',
          content: "**Scenario:** Company sells equipment with FMV of $80,000 and receives a $100,000 note due in 2 years with no stated interest.\n\n**What's happening?**\n• The $20,000 difference IS interest, just not stated\n• Record the note at present value (FMV of equipment)\n\n**Journal Entry at Sale:**\nDr Notes Receivable (face)            $100,000\n    Cr Discount on Notes Receivable          $20,000\n    Cr Sales Revenue                         $80,000\n\n**Balance Sheet Presentation:**\nNotes Receivable                    $100,000\nLess: Discount                       (20,000)\nNet Notes Receivable                 $80,000"
        },
        {
          title: 'Amortizing the Discount',
          type: 'text',
          content: "**Effective Interest Method (Required by GAAP):**\n\nInterest Income = Carrying Value × Effective Interest Rate\n\n**Each period:**\n1. Calculate interest income using effective rate\n2. Credit Interest Income\n3. Reduce the Discount (increase carrying value)\n\n**The discount is amortized to interest income over the note's life.**"
        },
        {
          title: 'Discount Amortization Example',
          type: 'example',
          content: "**Using previous example:**\nFace Value: $100,000\nPresent Value (carrying value): $80,000\nDiscount: $20,000\nTerm: 2 years\nEffective Rate: 11.8% (calculated)\n\n**Year 1:**\nInterest Income = $80,000 × 11.8% = $9,440\nDr Discount on Notes Receivable    $9,440\n    Cr Interest Income                    $9,440\n\nNew carrying value: $80,000 + $9,440 = $89,440\n\n**Year 2:**\nInterest Income = $89,440 × 11.8% = $10,560 (rounded)\nDr Discount on Notes Receivable    $10,560\n    Cr Interest Income                    $10,560\n\nFinal carrying value: $89,440 + $10,560 = $100,000 ✓"
        },
        {
          title: 'Notes with Below-Market Interest',
          type: 'text',
          content: "**Scenario:** Note has stated rate of 2% but market rate is 8%.\n\n**Solution:**\n1. Calculate PV of cash flows using MARKET rate (8%)\n2. Record note at this present value\n3. Difference between face and PV is discount\n4. Amortize discount using effective interest method\n\n**The stated interest is cash received; the effective interest (higher) is income recognized.**"
        },
        {
          title: '🧠 Memory Aid: Interest Calculations',
          type: 'callout',
          content: "**Two types of interest to track:**\n\n1. **Cash Interest** = Face Value × Stated Rate\n   (This is what you actually receive)\n\n2. **Interest Income** = Carrying Value × Effective Rate\n   (This is what you record as income)\n\n**Difference = Discount Amortization**\n\nInterest Income > Cash Interest when note is at a discount"
        },
        {
          title: 'Impairment of Notes Receivable',
          type: 'text',
          content: "**Under CECL (ASC 326):**\n• Recognize expected credit losses at inception\n• Update estimate each period\n• No separate \"impairment\" analysis needed—built into allowance\n\n**For individually significant notes:**\n• May need specific analysis\n• Compare carrying value to PV of expected cash flows\n• Shortfall = additional allowance needed\n\n**If borrower restructures (troubled debt):**\n• See TDR guidance (ASC 310-40)"
        },
        {
          title: 'Impairment Calculation',
          type: 'example',
          content: "**Scenario:**\nNote receivable carrying value: $100,000\nExpected cash flows: $80,000 in 2 years\nOriginal effective rate: 6%\n\n**Calculate impairment:**\nPV of expected cash flows = $80,000 ÷ (1.06)² = $71,200\n\nImpairment loss = $100,000 − $71,200 = $28,800\n\n**Entry:**\nDr Credit Loss Expense (or Provision)    $28,800\n    Cr Allowance for Credit Losses              $28,800\n\n**Note:** Use ORIGINAL effective rate for discounting!"
        },
        {
          title: 'Note Receivable Entries Summary',
          type: 'table',
          headers: ['Event', 'Debit', 'Credit'],
          rows: [
            ['Receive note at face', 'Notes Receivable', 'Cash or Sales'],
            ['Receive discounted note', 'Notes Receivable (face)\n→ Credit: Discount', 'Cash or Sales (PV)'],
            ['Accrue interest (stated)', 'Interest Receivable', 'Interest Income'],
            ['Amortize discount', 'Discount on N/R', 'Interest Income'],
            ['Collect note at maturity', 'Cash', 'Notes Receivable\nInterest Receivable'],
            ['Record impairment', 'Credit Loss Expense', 'Allowance for Credit Losses']
          ]
        },
        {
          title: '⚠️ Exam Trap: Carrying Value Changes',
          type: 'warning',
          content: "When calculating interest income on subsequent periods:\n\n**Use the CURRENT carrying value**, not the original!\n\nCarrying value changes each period as:\n• Discount is amortized (increases CV)\n• Premium is amortized (decreases CV)\n• Impairment is recognized (decreases CV through allowance)\n\nAlways ask: What's the carrying value AT THE START of this period?"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Notes receivable recorded at present value if no/below-market interest rate",
            "Discount = Face Value − Present Value; amortized using effective interest method",
            "Interest Income = Carrying Value × Effective Rate (changes each period)",
            "Cash Interest = Face Value × Stated Rate (constant)",
            "Impairment under CECL: estimate lifetime expected losses using original effective rate",
            "Always use current carrying value for interest calculations, not original"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-006',
    section: 'FAR',
    title: "Factoring, Pledging & Transfers of Receivables",
    description: "Understand when transfers qualify as sales vs. secured borrowings",
    order: 11,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Assets", "Receivables", "Factoring", "Transfers"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Companies often monetize receivables before collection. The accounting depends on whether the transfer is a TRUE SALE (receivables off balance sheet) or a SECURED BORROWING (receivables stay, liability recorded). The exam tests your ability to analyze transfer terms and determine the correct treatment."
        },
        {
          title: 'Types of Receivable Financing',
          type: 'list',
          content: [
            { term: "Pledging", definition: "Using receivables as collateral for a loan. Receivables stay on books; loan recorded as liability. No derecognition." },
            { term: "Assigning", definition: "Specific receivables identified as collateral. Similar to pledging but with specific identification. Loan recorded; receivables remain." },
            { term: "Factoring", definition: "Selling receivables to a third party (factor). May qualify as sale or secured borrowing depending on terms." }
          ]
        },
        {
          title: 'Sale vs. Secured Borrowing',
          type: 'text',
          content: "**The Key Question:** Has the transferor surrendered control over the receivables?\n\n**Three conditions for SALE treatment (ASC 860):**\n\n1. **Isolation:** Assets are beyond reach of transferor and its creditors (even in bankruptcy)\n\n2. **Transferee has rights:** Transferee can pledge or exchange the assets without constraint\n\n3. **No effective control retained:** Transferor doesn't maintain control through:\n   - Agreement to repurchase\n   - Ability to unilaterally cause return\n\n**If ANY condition fails → Secured Borrowing**"
        },
        {
          title: 'Factoring: With vs. Without Recourse',
          type: 'table',
          headers: ['Aspect', 'Without Recourse', 'With Recourse'],
          rows: [
            ['Credit risk', 'Factor bears risk', 'Transferor bears risk'],
            ['Bad debt responsibility', 'Factor absorbs losses', 'Transferor reimburses factor'],
            ['Likely treatment', 'Usually qualifies as SALE', 'Often SECURED BORROWING'],
            ['Factor\'s fee', 'Higher (compensates for risk)', 'Lower (less risk to factor)'],
            ['Derecognition', 'Receivables removed', 'May stay on books']
          ]
        },
        {
          title: '⚠️ Exam Trap: Recourse Doesn\'t Automatically Mean Secured Borrowing',
          type: 'warning',
          content: "Having recourse doesn't AUTOMATICALLY make it a secured borrowing!\n\nIf the three sale conditions are met, it's still a sale—but the transferor records a **recourse liability** for expected payments under the recourse provision.\n\nAnalyze the three conditions first, THEN consider recourse."
        },
        {
          title: 'Sale Treatment Accounting',
          type: 'text',
          content: "**When transfer qualifies as SALE:**\n\n1. Derecognize receivables transferred\n2. Recognize assets received (cash, servicing asset)\n3. Recognize liabilities assumed (recourse liability, servicing liability)\n4. Record gain or loss on sale\n\n**Gain/Loss Calculation:**\nProceeds received\n+ Fair value of servicing asset (if retained)\n− Carrying value of receivables\n− Fair value of recourse liability\n− Fair value of servicing liability (if any)\n= Gain or Loss"
        },
        {
          title: 'Sale Example: Without Recourse',
          type: 'example',
          content: "**Facts:**\n• Receivables: $100,000 (carrying value)\n• Factor pays: $92,000 cash\n• Factor charges 3% fee ($3,000)\n• Factor holds back 5% ($5,000) until collection\n• No recourse provision\n\n**Journal Entry:**\nDr Cash                              $92,000\nDr Due from Factor (holdback)         $5,000\nDr Loss on Sale of Receivables        $3,000\n    Cr Accounts Receivable                 $100,000\n\n**The $5,000 holdback is returned after collection.**"
        },
        {
          title: 'Sale Example: With Recourse',
          type: 'example',
          content: "**Facts:**\n• Receivables: $100,000 (carrying value)\n• Factor pays: $95,000 cash\n• Recourse liability estimated: $2,000 (expected losses)\n• Qualifies as sale (three conditions met)\n\n**Journal Entry:**\nDr Cash                              $95,000\nDr Loss on Sale of Receivables        $7,000\n    Cr Accounts Receivable                 $100,000\n    Cr Recourse Liability                    $2,000\n\n**Later, if factor seeks reimbursement:**\nDr Recourse Liability                 $X,XXX\n    Cr Cash                                  $X,XXX"
        },
        {
          title: 'Secured Borrowing Accounting',
          type: 'text',
          content: "**When transfer is SECURED BORROWING:**\n\n• Receivables STAY on transferor's books\n• Record LIABILITY for cash received\n• Continue to record bad debt expense\n• Factor's fee may be treated as financing cost\n\n**Journal Entry:**\nDr Cash                              $XX,XXX\n    Cr Liability (Borrowing)               $XX,XXX\n\n**Receivables remain; collections reduce the liability.**"
        },
        {
          title: 'Secured Borrowing Example',
          type: 'example',
          content: "**Facts:**\n• Receivables pledged: $100,000\n• Cash received: $80,000\n• Interest rate: 8%\n• Company maintains effective control (fails sale criteria)\n\n**Initial Entry:**\nDr Cash                              $80,000\n    Cr Notes Payable                        $80,000\n\n**Receivables stay on books—disclosed as pledged.**\n\n**As collections occur:**\nDr Cash (from customers)             $XX,XXX\n    Cr Accounts Receivable                  $XX,XXX\n\nDr Notes Payable                     $XX,XXX\nDr Interest Expense                   $X,XXX\n    Cr Cash (remit to lender)               $XX,XXX"
        },
        {
          title: 'Servicing Rights',
          type: 'text',
          content: "**Who collects the receivables?**\n\nOften the transferor continues to **service** (collect) the receivables even after sale.\n\n**Servicing Asset:** Fair value of expected servicing fees > adequate compensation\n\n**Servicing Liability:** Expected servicing fees < adequate compensation (below market)\n\n**Adequate Compensation:** Market rate for servicing\n\nIf servicing is at market rate → No asset or liability"
        },
        {
          title: 'Disclosure Requirements',
          type: 'text',
          content: "**For transferred receivables:**\n\n• Nature of transfer arrangements\n• Continuing involvement (servicing, recourse)\n• Key assumptions used in measuring retained interests\n• Sensitivity analysis for key assumptions\n• Cash flows with transferees\n\n**For pledged receivables:**\n• Carrying amount pledged as collateral\n• Terms and conditions of pledge"
        },
        {
          title: '🧠 Memory Aid: Sale Criteria',
          type: 'callout',
          content: "**\"ITC\" for Sale Treatment:**\n\n**I**solation — Assets isolated from transferor\n**T**ransferee rights — Can pledge/exchange freely\n**C**ontrol surrendered — No repurchase agreements\n\nAll three must be met for sale treatment!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Pledging/Assigning: Receivables stay on books; record liability for loan",
            "Factoring: May be sale or secured borrowing—analyze three conditions",
            "Sale requires: Isolation, transferee rights, control surrendered",
            "With recourse can still be a sale—record recourse liability",
            "Without recourse usually qualifies as sale (factor assumes credit risk)",
            "Secured borrowing: Receivables remain; cash is a liability"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-007',
    section: 'FAR',
    title: "Inventory Cost Flow: FIFO, LIFO, Weighted Average",
    description: "Master the major inventory costing methods and their financial statement impacts",
    order: 12,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Assets", "Inventory", "Cost Flow"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Inventory costing is fundamental to FAR. Different methods produce different COGS, gross profit, and ending inventory—and the exam loves comparing these effects. Know the mechanics AND the conceptual implications. Also remember: LIFO is prohibited under IFRS!"
        },
        {
          title: 'Inventory Basics',
          type: 'text',
          content: "**What is Inventory?**\nAssets held for sale in ordinary course of business, in production, or consumed in production.\n\n**The Cost Flow Problem:**\nWhen identical items are purchased at different prices, which cost goes to COGS vs. ending inventory?\n\n**The Inventory Equation:**\nBeginning Inventory + Purchases = Cost of Goods Available for Sale\nCost of Goods Available − Ending Inventory = Cost of Goods Sold\n\n**Or:** Beginning Inventory + Purchases − COGS = Ending Inventory"
        },
        {
          title: 'Inventory Systems',
          type: 'table',
          headers: ['Perpetual System', 'Periodic System'],
          rows: [
            ['Updates inventory continuously', 'Updates inventory at period end'],
            ['Purchases → debit Inventory', 'Purchases → debit Purchases account'],
            ['Sales → debit COGS immediately', 'COGS calculated at period end'],
            ['Inventory balance always current', 'Physical count required to determine ending inventory'],
            ['More expensive to maintain', 'Simpler but less timely information']
          ]
        },
        {
          title: 'FIFO: First-In, First-Out',
          type: 'text',
          content: "**Concept:** Oldest costs go to COGS; newest costs remain in ending inventory.\n\n**Think:** First items purchased are first items sold.\n\n**Effects in Rising Prices:**\n• **Lower COGS** (old, cheaper costs)\n• **Higher gross profit**\n• **Higher net income**\n• **Higher ending inventory** (newer, higher costs)\n• **Higher taxes**\n\n**Advantage:** Ending inventory approximates current replacement cost.\n\n**Note:** FIFO produces SAME results under perpetual and periodic systems."
        },
        {
          title: 'LIFO: Last-In, First-Out',
          type: 'text',
          content: "**Concept:** Newest costs go to COGS; oldest costs remain in ending inventory.\n\n**Think:** Last items purchased are first items sold.\n\n**Effects in Rising Prices:**\n• **Higher COGS** (new, expensive costs)\n• **Lower gross profit**\n• **Lower net income**\n• **Lower ending inventory** (old, lower costs)\n• **Lower taxes** (main benefit!)\n\n**Disadvantages:**\n• Ending inventory is outdated (old costs)\n• LIFO liquidation can distort income\n• **PROHIBITED under IFRS!**"
        },
        {
          title: '🧠 Memory Aid: FIFO vs. LIFO in Inflation',
          type: 'callout',
          content: "**\"FIFO = FAT\"** (in rising prices)\n• **F**IFO produces\n• **A**mplified (higher)\n• **T**axable income\n\n**\"LIFO = LEAN\"** (in rising prices)\n• **L**IFO produces\n• **E**conomic\n• **A**dvantage via\n• **N**et tax savings\n\nIn inflation, LIFO reduces taxes but also reduces reported income!"
        },
        {
          title: 'Weighted Average Cost',
          type: 'text',
          content: "**Concept:** Average all costs together; use average for both COGS and ending inventory.\n\n**Periodic System (Weighted Average):**\nCalculate average at END of period\nAvg Cost = Total Cost of Goods Available ÷ Total Units Available\n\n**Perpetual System (Moving Average):**\nRecalculate average after EACH purchase\nNew Avg = (Old Inventory Cost + New Purchase Cost) ÷ Total Units\n\n**Effects:**\n• Results fall BETWEEN FIFO and LIFO\n• Smooths out price fluctuations\n• Allowed under both GAAP and IFRS"
        },
        {
          title: 'Comparative Example',
          type: 'example',
          content: "**Data:**\nBeginning inventory: 100 units @ $10 = $1,000\nPurchase 1: 150 units @ $12 = $1,800\nPurchase 2: 200 units @ $14 = $2,800\nGoods available: 450 units, $5,600\nUnits sold: 300 units\nEnding inventory: 150 units\n\n**FIFO:**\nCOGS: 100 @ $10 + 150 @ $12 + 50 @ $14 = $3,500\nEnding Inv: 150 @ $14 = $2,100\n\n**LIFO:**\nCOGS: 200 @ $14 + 100 @ $12 = $4,000\nEnding Inv: 100 @ $10 + 50 @ $12 = $1,600\n\n**Weighted Average:**\nAvg cost: $5,600 ÷ 450 = $12.44\nCOGS: 300 × $12.44 = $3,733\nEnding Inv: 150 × $12.44 = $1,867"
        },
        {
          title: 'LIFO Reserve',
          type: 'text',
          content: "**LIFO Reserve** = Inventory at FIFO − Inventory at LIFO\n\nCompanies using LIFO must disclose what inventory would be under FIFO.\n\n**Why it matters:**\n• Allows comparison with FIFO companies\n• Shows cumulative tax benefit from LIFO\n• Required disclosure in notes\n\n**Converting LIFO to FIFO:**\nFIFO Inventory = LIFO Inventory + LIFO Reserve\n\n**LIFO Reserve builds up over time in inflationary periods.**"
        },
        {
          title: 'LIFO Liquidation',
          type: 'text',
          content: "**What is it?**\nWhen a LIFO company sells more units than it purchases, dipping into old LIFO layers.\n\n**Problem:**\n• Old, low-cost layers flow to COGS\n• Artificially HIGH gross profit\n• Higher taxes (defeats LIFO's purpose)\n• One-time distortion to income\n\n**Required Disclosure:**\nAmount of LIFO liquidation and its effect on income.\n\n**Exam Tip:** Watch for questions about unusual gross profit increases due to LIFO liquidation."
        },
        {
          title: '⚠️ Exam Trap: LIFO Conformity Rule',
          type: 'warning',
          content: "**IRS LIFO Conformity Rule:**\n\nIf a company uses LIFO for TAX purposes, it MUST use LIFO for FINANCIAL REPORTING (book) purposes.\n\nThis is unique—normally book and tax can differ!\n\n**Exception:** LIFO Reserve disclosure doesn't violate conformity rule."
        },
        {
          title: 'Specific Identification',
          type: 'text',
          content: "**Concept:** Track actual cost of each specific item sold.\n\n**When Used:**\n• Unique, high-value items (jewelry, cars, art)\n• Items with serial numbers or specific identification\n\n**Advantages:**\n• Matches actual cost flow\n• Most accurate for unique items\n\n**Disadvantages:**\n• Allows income manipulation (cherry-picking)\n• Impractical for homogeneous, high-volume items"
        },
        {
          title: 'Cost Flow Summary',
          type: 'table',
          headers: ['Method', 'COGS (Inflation)', 'Ending Inv (Inflation)', 'IFRS Allowed?'],
          rows: [
            ['FIFO', 'Lowest', 'Highest (current)', 'Yes'],
            ['LIFO', 'Highest', 'Lowest (outdated)', 'NO!'],
            ['Weighted Avg', 'Middle', 'Middle', 'Yes'],
            ['Specific ID', 'Actual', 'Actual', 'Yes']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "FIFO: Oldest costs → COGS; newest costs → Ending Inventory (highest income in inflation)",
            "LIFO: Newest costs → COGS; oldest costs → Ending Inventory (lowest income/taxes in inflation)",
            "LIFO is PROHIBITED under IFRS—frequently tested!",
            "Weighted Average falls between FIFO and LIFO results",
            "LIFO Reserve = FIFO Inventory − LIFO Inventory (disclosed in notes)",
            "LIFO liquidation distorts income when old layers are sold"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-008',
    section: 'FAR',
    title: "Lower of Cost or Net Realizable Value",
    description: "Apply inventory valuation rules when market value declines",
    order: 13,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Assets", "Inventory", "LCM", "NRV"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Inventory must be written down if its value drops below cost. The rules differ slightly for LIFO/retail vs. other methods. This topic combines conservatism, valuation concepts, and calculation skills—all heavily tested on FAR."
        },
        {
          title: 'The Basic Rule',
          type: 'text',
          content: "Inventory should be reported at the **lower of cost or market**.\n\n**\"Market\" depends on cost flow method:**\n\n• **FIFO, Weighted Average, Specific ID:**\n  Market = **Net Realizable Value (NRV)**\n\n• **LIFO, Retail Method:**\n  Market = **NRV with ceiling and floor constraints**\n\n**ASC 330 simplified the rules for most companies by using NRV directly (not the old ceiling/floor).**"
        },
        {
          title: 'Net Realizable Value (NRV)',
          type: 'text',
          content: "**NRV = Estimated Selling Price − Costs to Complete − Costs to Sell**\n\n**Example:**\nExpected selling price: $100\nCosts to complete: $10\nSelling costs (commission, shipping): $5\n**NRV = $100 − $10 − $5 = $85**\n\nIf cost is $90, write down to $85.\n\n**This is the method for FIFO, Weighted Average, and Specific ID.**"
        },
        {
          title: 'Lower of Cost or Market (LIFO/Retail)',
          type: 'text',
          content: "For LIFO and Retail Method, \"Market\" is constrained:\n\n**Market = Replacement Cost, BUT:**\n\n• **Ceiling** (maximum) = NRV\n• **Floor** (minimum) = NRV − Normal Profit Margin\n\n**Apply the constraints:**\n1. If Replacement Cost > Ceiling → Use Ceiling (NRV)\n2. If Replacement Cost < Floor → Use Floor (NRV − Profit)\n3. If between → Use Replacement Cost\n\nThen compare this \"Market\" to Cost. Use lower."
        },
        {
          title: 'LCM Calculation Steps (LIFO/Retail)',
          type: 'example',
          content: "**Given:**\n• Cost: $50\n• Replacement Cost: $45\n• Selling Price: $60\n• Costs to complete/sell: $8\n• Normal profit margin: 20% of selling price = $12\n\n**Step 1: Calculate constraints**\n• Ceiling (NRV) = $60 − $8 = $52\n• Floor = $52 − $12 = $40\n\n**Step 2: Determine Market**\n• Replacement cost $45 is between $40 and $52\n• Market = $45\n\n**Step 3: Compare to Cost**\n• Cost = $50, Market = $45\n• LCM = $45 (write down by $5)"
        },
        {
          title: '🧠 Memory Aid: LCM Ceiling and Floor',
          type: 'callout',
          content: "**\"Ceiling is NRV, Floor is NRV minus Profit\"**\n\nThink of it as:\n• You can't value inventory HIGHER than what you'll get for it (ceiling = NRV)\n• You can't value it LOWER than what you'll net after normal profit (floor)\n\n**Squeeze replacement cost between ceiling and floor, then compare to cost!**"
        },
        {
          title: 'Application: Item by Item vs. Category',
          type: 'text',
          content: "**How to apply LCM/LCNRV:**\n\n1. **Item-by-item** (most conservative, most common)\n2. **By category/class** of similar items\n3. **In aggregate** (total inventory)\n\n**Item-by-item produces largest write-down** because gains in some items can't offset losses in others.\n\n**Once selected, apply consistently.**"
        },
        {
          title: 'Application Example',
          type: 'table',
          headers: ['Item', 'Cost', 'NRV', 'LCM (Item)', 'Write-down'],
          rows: [
            ['A', '$100', '$110', '$100', '$0'],
            ['B', '$80', '$75', '$75', '$5'],
            ['C', '$60', '$50', '$50', '$10'],
            ['Total', '$240', '$235', '$225', '$15']
          ]
        },
        {
          title: 'Journal Entry for Write-Down',
          type: 'text',
          content: "**Direct Method (Reduce Inventory):**\nDr Loss on Inventory Write-Down    $XX\n    Cr Inventory                         $XX\n\n**Allowance Method:**\nDr Loss on Inventory Write-Down    $XX\n    Cr Allowance to Reduce Inv to NRV    $XX\n\n**Income Statement Presentation:**\n• Usually included in **Cost of Goods Sold**\n• If material/unusual, may be shown separately"
        },
        {
          title: 'Reversal of Write-Downs',
          type: 'text',
          content: "**U.S. GAAP:**\n• Write-downs are **permanent**\n• **NO reversal allowed** even if value recovers\n• New lower value becomes the \"cost\" basis\n\n**IFRS:**\n• Write-downs **CAN be reversed**\n• But only up to original cost (no gain beyond cost)\n• Reversal recognized in P&L\n\n**This is a key GAAP vs. IFRS difference!**"
        },
        {
          title: '⚠️ Exam Trap: Different Rules by Method',
          type: 'warning',
          content: "**Watch the cost flow method!**\n\n• FIFO/Weighted Average/Specific ID → Use NRV directly\n• LIFO/Retail → Use LCM with ceiling/floor\n\nThe exam may give you replacement cost, ceiling, and floor when you don't need them (if using FIFO)!\n\nAlways check: **What cost flow method is the company using?**"
        },
        {
          title: 'Common Exam Scenarios',
          type: 'list',
          content: [
            { term: "Calculate NRV", definition: "Given selling price, costs to complete, selling costs. NRV = SP − CTC − CTS" },
            { term: "Determine Market (LIFO)", definition: "Compare replacement cost to ceiling (NRV) and floor (NRV − profit). Use middle value." },
            { term: "Calculate write-down", definition: "Cost minus LCM/LCNRV = write-down amount" },
            { term: "GAAP vs IFRS", definition: "GAAP: No reversal. IFRS: Reversal allowed up to original cost." }
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "FIFO/Weighted Avg: Use NRV directly (simpler rule under ASC 330)",
            "LIFO/Retail: Use LCM with ceiling (NRV) and floor (NRV − normal profit)",
            "NRV = Selling Price − Costs to Complete − Costs to Sell",
            "Apply LCM item-by-item for most conservative result",
            "GAAP: Write-downs are permanent (no reversal allowed)",
            "IFRS: Write-downs can be reversed up to original cost"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-009',
    section: 'FAR',
    title: "Dollar-Value LIFO",
    description: "Master the complex LIFO pools technique using price indices",
    order: 14,
    duration: 70,
    difficulty: 'advanced',
    topics: ["Assets", "Inventory", "Dollar-Value LIFO"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Dollar-Value LIFO is one of the most complex topics in FAR. It appears in TBS simulations that require multi-step calculations. Once you understand the logic and master the steps, these become very doable. The key is practice!"
        },
        {
          title: 'What is Dollar-Value LIFO?',
          type: 'text',
          content: "**Problem with Unit LIFO:**\nTracking individual units at different costs is impractical for companies with thousands of items.\n\n**Solution: Dollar-Value LIFO:**\n• Group inventory into **pools** of similar items\n• Measure inventory in **dollars** rather than units\n• Use **price indices** to convert between base-year and current-year dollars\n• Track **layers** by year, each at its own index"
        },
        {
          title: 'Key Terminology',
          type: 'list',
          content: [
            { term: "Pool", definition: "Group of similar inventory items treated as one unit for costing purposes" },
            { term: "Base Year", definition: "The starting year for DV-LIFO. All calculations reference back to base-year prices." },
            { term: "Price Index", definition: "Ratio of current-year prices to base-year prices. Base year index = 1.00" },
            { term: "Layer", definition: "An increment of inventory added in a specific year, valued at that year's index" },
            { term: "Ending Inventory at Base", definition: "Current inventory converted to base-year dollars using the price index" }
          ]
        },
        {
          title: 'The DV-LIFO Process',
          type: 'text',
          content: "**Step 1:** Convert ending inventory to BASE-YEAR dollars\nEnding Inv at Base = Ending Inv at Current Prices ÷ Current Year Index\n\n**Step 2:** Compare to prior year's ending inventory (at base)\n\n**Step 3:** Determine if there's an INCREMENT or DECREMENT:\n• Increment: Current base > Prior base (added a layer)\n• Decrement: Current base < Prior base (LIFO liquidation)\n\n**Step 4:** Convert layers to DV-LIFO cost:\n• Each layer × its year's price index\n\n**Step 5:** Sum all layers = Ending Inventory at DV-LIFO"
        },
        {
          title: 'Year 1 Example',
          type: 'example',
          content: "**Given:**\n• Base year (Year 1) inventory at current prices: $100,000\n• Price index Year 1: 1.00 (base year)\n\n**Calculation:**\nEnding at base = $100,000 ÷ 1.00 = $100,000\n\n**DV-LIFO Inventory:**\nBase layer: $100,000 × 1.00 = $100,000\n\n**This becomes the starting point for future years.**"
        },
        {
          title: 'Year 2 Example: Adding a Layer',
          type: 'example',
          content: "**Given:**\n• Ending inventory at current prices: $126,000\n• Price index Year 2: 1.05\n• Prior year base: $100,000\n\n**Step 1: Convert to base**\n$126,000 ÷ 1.05 = $120,000 at base\n\n**Step 2: Compare to prior**\nCurrent base: $120,000\nPrior base: $100,000\nIncrement: $20,000 (at base)\n\n**Step 3: Value layers**\nBase layer: $100,000 × 1.00 = $100,000\nYear 2 layer: $20,000 × 1.05 = $21,000\n\n**DV-LIFO Inventory: $121,000**"
        },
        {
          title: 'Year 3 Example: LIFO Liquidation',
          type: 'example',
          content: "**Given:**\n• Ending inventory at current prices: $115,500\n• Price index Year 3: 1.10\n• Prior year base: $120,000\n\n**Step 1: Convert to base**\n$115,500 ÷ 1.10 = $105,000 at base\n\n**Step 2: Compare to prior**\nCurrent base: $105,000\nPrior base: $120,000\nDecrement: $15,000 (at base) — LIFO liquidation!\n\n**Step 3: Peel off layers (LIFO)**\nYear 2 layer had $20,000 at base → Reduce by $15,000\nRemaining Year 2 layer: $5,000 at base\n\n**Step 4: Value remaining layers**\nBase layer: $100,000 × 1.00 = $100,000\nYear 2 layer: $5,000 × 1.05 = $5,250\n\n**DV-LIFO Inventory: $105,250**"
        },
        {
          title: '🧠 Memory Aid: DV-LIFO Steps',
          type: 'callout',
          content: "**\"DCIVC\" — Don't Confuse Inventory Value Calculations**\n\n**D**eflate to base (÷ index)\n**C**ompare to prior year base\n**I**dentify increment or decrement\n**V**alue each layer at its index\n**C**ombine layers for total\n\nAlways work in BASE-YEAR DOLLARS first, then convert!"
        },
        {
          title: 'DV-LIFO Layer Table',
          type: 'table',
          headers: ['Year', 'At Base', 'Index', 'At DV-LIFO'],
          rows: [
            ['Base (Yr 1)', '$100,000', '1.00', '$100,000'],
            ['Year 2', '$20,000', '1.05', '$21,000'],
            ['Year 3', '(liquidated $15,000)', '—', '—'],
            ['Year 3 Remaining', '$5,000', '1.05', '$5,250'],
            ['Total', '$105,000', '—', '$105,250']
          ]
        },
        {
          title: 'Calculating the Price Index',
          type: 'text',
          content: "**Two Methods:**\n\n**1. Double-Extension Method:**\nExtend ending inventory at both current-year AND base-year prices\nIndex = Total at Current ÷ Total at Base\n\n**2. Link-Chain Method:**\nCalculate internal index each year (current vs. prior year)\nCumulative index = Prior index × Current internal index\n\n**The exam typically provides the index.** If not, they'll give you the info to calculate it."
        },
        {
          title: 'Double-Extension Example',
          type: 'example',
          content: "**Ending Inventory:**\nItem A: 100 units × $15 current = $1,500\nItem A: 100 units × $12 base = $1,200\nItem B: 200 units × $8 current = $1,600\nItem B: 200 units × $6 base = $1,200\n\n**Totals:**\nCurrent prices: $3,100\nBase prices: $2,400\n\n**Index = $3,100 ÷ $2,400 = 1.29**\n\n**Inventory at Base = $3,100 ÷ 1.29 = $2,403**"
        },
        {
          title: '⚠️ Exam Trap: Which Index to Use',
          type: 'warning',
          content: "**Each layer uses its OWN year's index!**\n\nCommon mistake: Using current year index for all layers.\n\n**Correct approach:**\n• Base layer: Always index of 1.00\n• Year 2 layer: Year 2's index (e.g., 1.05)\n• Year 3 layer: Year 3's index (e.g., 1.10)\n\nLayers are \"frozen\" at the price level when created."
        },
        {
          title: 'Why Use DV-LIFO?',
          type: 'text',
          content: "**Advantages:**\n• Simplifies LIFO for large inventories\n• Reduces LIFO liquidation (pools absorb changes)\n• Practical for retail and manufacturing\n• Still achieves tax benefits of LIFO\n\n**Disadvantages:**\n• Complex calculations\n• Requires maintaining historical layer data\n• Index calculation can be subjective"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "DV-LIFO measures inventory in dollars using pools and price indices",
            "Always convert ending inventory to BASE-YEAR dollars first (÷ current index)",
            "Compare to prior year to identify INCREMENT (new layer) or DECREMENT (liquidation)",
            "Each layer keeps its original year's price index forever",
            "Liquidation removes most recent layers first (LIFO)",
            "Price index = Inventory at current prices ÷ Inventory at base prices"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-010',
    section: 'FAR',
    title: "Inventory Errors & Period Corrections",
    description: "Analyze and correct inventory errors across periods",
    order: 15,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Assets", "Inventory", "Error Correction"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Inventory errors have a ripple effect across periods. An error in ending inventory affects COGS, net income, retained earnings, AND the next period! The exam loves multi-period error analysis—understand the self-correcting nature and impact on each financial statement."
        },
        {
          title: 'The Inventory-COGS Relationship',
          type: 'text',
          content: "**Remember the equation:**\nBeginning Inventory + Purchases − Ending Inventory = COGS\n\n**Rearranged:**\nCOGS = Beginning Inventory + Purchases − Ending Inventory\n\n**Key insight:**\n• Overstate Ending Inventory → Understate COGS → Overstate Net Income\n• Understate Ending Inventory → Overstate COGS → Understate Net Income\n\n**Ending inventory and COGS move in OPPOSITE directions!**"
        },
        {
          title: '🧠 Memory Aid: Error Effects',
          type: 'callout',
          content: "**\"ERIC\" — Ending and Revenue move In Correlation**\n\nIf Ending Inventory is **OVERSTATED:**\n• COGS is **UNDERSTATED** (opposite)\n• Gross Profit is **OVERSTATED** (same as ending)\n• Net Income is **OVERSTATED** (same as ending)\n• Retained Earnings **OVERSTATED**\n\n**Ending Inventory Error = Same direction as Net Income Error**"
        },
        {
          title: 'Error Impact Table',
          type: 'table',
          headers: ['Error', 'COGS', 'Net Income', 'Assets', 'Retained Earnings'],
          rows: [
            ['Ending Inv OVERSTATED', 'Understated', 'Overstated', 'Overstated', 'Overstated'],
            ['Ending Inv UNDERSTATED', 'Overstated', 'Understated', 'Understated', 'Understated'],
            ['Beginning Inv OVERSTATED', 'Overstated', 'Understated', 'No effect*', 'Overstated prior'],
            ['Beginning Inv UNDERSTATED', 'Understated', 'Overstated', 'No effect*', 'Understated prior']
          ]
        },
        {
          title: 'Self-Correcting Nature',
          type: 'text',
          content: "**Key Concept:** Inventory errors self-correct over TWO periods.\n\n**Why?** Ending inventory of Year 1 = Beginning inventory of Year 2\n\n**Example:**\nYear 1: Ending inventory overstated by $10,000\n• Year 1 COGS understated → NI overstated by $10,000\n\nYear 2: Beginning inventory overstated by $10,000 (same error carries over)\n• Year 2 COGS overstated → NI understated by $10,000\n\n**Net effect over 2 years: ZERO** (errors offset)\n\n**But each individual year is WRONG!**"
        },
        {
          title: 'Two-Year Error Analysis',
          type: 'example',
          content: "**Scenario:** 2024 ending inventory overstated by $5,000\n\n**2024 Effects:**\n• COGS: Understated $5,000\n• Net Income: Overstated $5,000\n• Ending RE: Overstated $5,000\n• Assets: Overstated $5,000\n\n**2025 Effects (error not corrected):**\n• Beginning Inv: Overstated $5,000\n• COGS: Overstated $5,000\n• Net Income: Understated $5,000\n• Ending RE: CORRECT (errors offset)\n• Assets: CORRECT (error gone)\n\n**After 2 years, balance sheet self-corrects!**"
        },
        {
          title: 'Purchases Errors',
          type: 'text',
          content: "**Purchases Recorded but Inventory Not Counted:**\n• Purchases: Correct\n• Ending Inventory: Understated\n• COGS: Overstated\n• Net Income: Understated\n\n**Inventory Counted but Purchases Not Recorded:**\n• Purchases: Understated\n• Ending Inventory: Correct\n• COGS: Understated\n• Net Income: Overstated\n• A/P: Understated\n\n**These errors do NOT self-correct if A/P affected!**"
        },
        {
          title: 'FOB Shipping Terms',
          type: 'text',
          content: "**FOB Shipping Point:**\n• Title passes when goods LEAVE seller\n• In transit goods belong to BUYER\n• Buyer includes in inventory even if not received\n\n**FOB Destination:**\n• Title passes when goods ARRIVE at buyer\n• In transit goods belong to SELLER\n• Buyer excludes until received\n\n**Common Error:** Buyer includes goods that are FOB Destination but still in transit → Overstates inventory"
        },
        {
          title: 'Consignment Inventory',
          type: 'text',
          content: "**Consignment goods belong to the CONSIGNOR until sold.**\n\n**Consignor (owner):**\n• Includes consignment inventory on its books\n• Records sale when consignee sells to customer\n\n**Consignee (holder):**\n• Does NOT include in its inventory\n• Acts as agent; earns commission\n\n**Common Error:** Consignee includes consignment goods in their inventory → Overstates inventory"
        },
        {
          title: '⚠️ Exam Trap: Cut-off Errors',
          type: 'warning',
          content: "**Cut-off errors are common in year-end inventory scenarios:**\n\n• Goods shipped FOB Shipping Point on Dec 31 — include in BUYER's inventory\n• Goods shipped FOB Destination on Dec 31, arriving Jan 2 — include in SELLER's inventory\n• Consignment goods at retailer — include in CONSIGNOR's inventory\n\nAlways ask: **Who has TITLE to the goods on the balance sheet date?**"
        },
        {
          title: 'Correcting Entry',
          type: 'text',
          content: "**If error discovered in same year:**\nSimply correct the inventory count.\n\n**If error discovered in subsequent year (books closed):**\n\nOverstated Ending Inventory (prior year):\nDr Retained Earnings       $X,XXX\n    Cr Inventory (if still wrong)    $X,XXX\n\n**If error already self-corrected:**\nNo entry needed for balance sheet, but may need to restate comparative income statements."
        },
        {
          title: 'Comprehensive Error Analysis',
          type: 'example',
          content: "**Given:** Following errors in 2024:\n1. Ending inventory overstated $8,000\n2. Purchases of $3,000 not recorded (goods were counted)\n3. Consignment goods of $2,000 included in ending inventory\n\n**Analysis:**\n1. EI overstated $8,000 → NI overstated $8,000\n2. Purchases understated $3,000 → COGS understated $3,000 → NI overstated $3,000 (Also A/P understated $3,000)\n3. EI overstated $2,000 → NI overstated $2,000\n\n**Total NI Overstatement: $8,000 + $3,000 + $2,000 = $13,000**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Ending inventory errors move OPPOSITE to COGS, SAME direction as Net Income",
            "Inventory errors self-correct over two periods (but each year is wrong)",
            "FOB Shipping Point: Buyer owns goods in transit",
            "FOB Destination: Seller owns goods in transit",
            "Consignment goods stay in consignor's inventory until sold",
            "Purchases error with A/P impact does NOT self-correct"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-011',
    section: 'FAR',
    title: "PP&E Acquisition & Capitalization",
    description: "Determine what costs to capitalize vs. expense for property, plant, and equipment",
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Assets", "PPE", "Capitalization"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "PP&E is typically the largest asset on a company's balance sheet. Knowing what to capitalize vs. expense directly impacts net income, total assets, and key ratios. The exam tests your judgment on which costs belong in the asset vs. on the income statement."
        },
        {
          title: 'What is PP&E?',
          type: 'text',
          content: "**Property, Plant & Equipment** includes tangible assets that are:\n\n• **Used in operations** (not held for sale)\n• **Long-term** (useful life > 1 year)\n• **Physical substance** (tangible)\n\n**Examples:**\n• Land\n• Buildings\n• Machinery and equipment\n• Furniture and fixtures\n• Vehicles\n• Leasehold improvements"
        },
        {
          title: 'The Capitalization Principle',
          type: 'text',
          content: "**Capitalize costs that provide FUTURE BENEFIT:**\n\n• Costs to acquire the asset\n• Costs to bring it to its intended location\n• Costs to prepare it for its intended use\n\n**Expense costs that benefit only the CURRENT PERIOD:**\n\n• Repairs and maintenance\n• Operating costs after asset is ready for use"
        },
        {
          title: 'Costs to Capitalize',
          type: 'list',
          content: [
            { term: "Purchase Price", definition: "Invoice price less any discounts (trade or cash discounts taken). Include sales tax if applicable." },
            { term: "Freight-In", definition: "Transportation costs to bring asset to location. FOB terms determine who pays." },
            { term: "Installation Costs", definition: "Costs to set up, assemble, test, and prepare equipment for use." },
            { term: "Site Preparation", definition: "Clearing, grading, or preparing the location for the asset." },
            { term: "Professional Fees", definition: "Legal fees for title, architectural fees, engineering fees directly related to acquisition." },
            { term: "Testing Costs", definition: "Costs of trial runs before asset is ready for intended use (net of any revenue from test output)." }
          ]
        },
        {
          title: 'Costs to Expense',
          type: 'list',
          content: [
            { term: "Repairs & Maintenance", definition: "Routine upkeep that maintains (doesn't enhance) the asset's condition." },
            { term: "Training Costs", definition: "Employee training to operate equipment—expense as incurred." },
            { term: "Operating Losses", definition: "Losses during the break-in period after asset is ready for use." },
            { term: "Relocation Costs", definition: "Costs to move existing equipment to a new location (generally)." },
            { term: "Overhead Allocation", definition: "General overhead not directly attributable to acquisition." }
          ]
        },
        {
          title: 'Land Costs',
          type: 'text',
          content: "**Capitalize to LAND (not depreciated):**\n• Purchase price\n• Closing costs (title, legal, recording)\n• Existing structures removed to prepare site (net of salvage)\n• Grading, filling, draining for permanent improvement\n• Assessments for streets, sewers, sidewalks (permanent)\n\n**Capitalize to LAND IMPROVEMENTS (depreciated):**\n• Parking lots\n• Fencing\n• Lighting\n• Landscaping with limited life\n\n**Key:** Land has unlimited life; Land Improvements are depreciated."
        },
        {
          title: '🧠 Memory Aid: Capitalize or Expense?',
          type: 'callout',
          content: "**Ask yourself: Is it BEFORE or AFTER the asset is ready for use?**\n\n**BEFORE ready for use → CAPITALIZE**\n(Getting the asset to its location and condition for intended use)\n\n**AFTER ready for use → EXPENSE**\n(Operating, maintaining, or running the asset)\n\nThe \"ready for use\" moment is the dividing line!"
        },
        {
          title: 'Building Costs',
          type: 'text',
          content: "**Purchased Building:**\n• Purchase price (allocated between land and building)\n• Renovation costs to prepare for intended use\n• Legal and closing costs\n\n**Constructed Building:**\n• Materials, labor, and overhead\n• Architect and engineering fees\n• Building permits\n• **Capitalized interest** during construction (ASC 835)\n• Insurance during construction"
        },
        {
          title: 'Interest Capitalization',
          type: 'text',
          content: "**When to Capitalize Interest (ASC 835-20):**\n\nCapitalize interest on assets constructed or produced for:\n• Company's own use\n• Sale or lease as discrete projects\n\n**Capitalization Period:**\n• Begins when: Expenditures incurred, activities in progress, interest being incurred\n• Ends when: Asset substantially complete and ready for use\n\n**Amount to Capitalize:**\nLesser of:\n1. Actual interest incurred\n2. Avoidable interest (weighted avg expenditures × interest rate)"
        },
        {
          title: 'Interest Capitalization Example',
          type: 'example',
          content: "**Given:**\n• Building construction expenditures:\n  - Jan 1: $500,000\n  - Jul 1: $300,000\n• Construction period: Full year\n• Debt: $1,000,000 @ 8%\n\n**Weighted Average Expenditures:**\nJan 1: $500,000 × 12/12 = $500,000\nJul 1: $300,000 × 6/12 = $150,000\nTotal: $650,000\n\n**Avoidable Interest:**\n$650,000 × 8% = $52,000\n\n**Actual Interest:**\n$1,000,000 × 8% = $80,000\n\n**Capitalize:** $52,000 (lesser amount)\n**Expense:** $28,000 ($80,000 − $52,000)"
        },
        {
          title: 'Lump-Sum Purchases',
          type: 'text',
          content: "**Basket Purchase:** Multiple assets acquired for single price.\n\n**Allocation Method:**\nAllocate total cost based on **relative fair values**.\n\n**Example:**\nPurchase land and building for $500,000\n• Land FMV: $150,000\n• Building FMV: $350,000\n• Total FMV: $500,000\n\nLand: $500,000 × ($150,000/$500,000) = $150,000\nBuilding: $500,000 × ($350,000/$500,000) = $350,000"
        },
        {
          title: '⚠️ Exam Trap: Government Grants',
          type: 'warning',
          content: "**If government provides grant for PP&E:**\n\n**Two methods (policy choice):**\n\n1. **Reduce asset cost** (net method)\n   - Lower depreciation over asset life\n\n2. **Deferred income** (gross method)\n   - Asset at full cost\n   - Recognize grant income over asset life\n\n**Both methods spread benefit over useful life!**"
        },
        {
          title: 'Subsequent Expenditures',
          type: 'table',
          headers: ['Type', 'Treatment', 'Why'],
          rows: [
            ['Repairs & Maintenance', 'Expense', 'Maintains current condition'],
            ['Additions', 'Capitalize', 'New component extends capacity'],
            ['Improvements/Betterments', 'Capitalize', 'Enhances productivity or extends life'],
            ['Replacements', 'Capitalize (remove old)', 'Substitutes new for old component'],
            ['Rearrangement', 'Capitalize if material', 'Improves efficiency (judgment)']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Capitalize costs to acquire, transport, and prepare asset for intended use",
            "Expense costs incurred AFTER asset is ready for use (repairs, training)",
            "Land is NOT depreciated; Land Improvements ARE depreciated",
            "Interest capitalization: Lesser of actual interest or avoidable interest",
            "Basket purchases: Allocate based on relative fair values",
            "Subsequent costs: Capitalize if extends life or improves productivity"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-012',
    section: 'FAR',
    title: "Depreciation Methods: SL, DDB, Units, SYD",
    description: "Calculate depreciation using all major methods tested on the CPA exam",
    order: 17,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Assets", "PPE", "Depreciation"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Depreciation calculations appear in both MCQ and TBS. You must know all four methods cold: Straight-Line, Double-Declining Balance, Sum-of-Years-Digits, and Units of Production. The exam also tests partial-year depreciation and changes in estimates."
        },
        {
          title: 'Depreciation Basics',
          type: 'text',
          content: "**What is Depreciation?**\nSystematic allocation of an asset's cost over its useful life.\n\n**Key Terms:**\n• **Cost** = Capitalized amount (original cost)\n• **Salvage Value** = Estimated value at end of useful life\n• **Depreciable Base** = Cost − Salvage Value\n• **Useful Life** = Estimated period of benefit\n\n**Depreciation is an ESTIMATE, not exact science!**"
        },
        {
          title: 'Straight-Line (SL) Method',
          type: 'text',
          content: "**Formula:**\nDepreciation Expense = (Cost − Salvage Value) ÷ Useful Life\n\n**Or:**\nDepreciation Expense = Depreciable Base × (1 ÷ Useful Life)\n\n**Characteristics:**\n• Equal expense each period\n• Most common method\n• Simple and easy to apply\n• Best when asset benefits are constant over time"
        },
        {
          title: 'Straight-Line Example',
          type: 'example',
          content: "**Given:**\n• Cost: $50,000\n• Salvage Value: $5,000\n• Useful Life: 5 years\n\n**Annual Depreciation:**\n($50,000 − $5,000) ÷ 5 = $9,000 per year\n\n**Depreciation Rate:** 1/5 = 20% per year\n\n**Year 1:** $9,000\n**Year 2:** $9,000\n**Year 3:** $9,000\n**Year 4:** $9,000\n**Year 5:** $9,000\n**Total:** $45,000 (depreciable base)"
        },
        {
          title: 'Double-Declining Balance (DDB)',
          type: 'text',
          content: "**Formula:**\nDepreciation = Book Value × (2 ÷ Useful Life)\n\n**Key Points:**\n• **Ignores salvage value** in calculation (but don't go below it!)\n• Rate is **DOUBLE** the straight-line rate\n• Apply rate to **BOOK VALUE** (cost − accumulated depreciation)\n• Accelerated method — higher expense in early years\n• Stop when book value = salvage value"
        },
        {
          title: 'DDB Example',
          type: 'example',
          content: "**Given:**\n• Cost: $50,000\n• Salvage Value: $5,000\n• Useful Life: 5 years\n• DDB Rate: 2/5 = 40%\n\n**Year 1:** $50,000 × 40% = $20,000 (BV = $30,000)\n**Year 2:** $30,000 × 40% = $12,000 (BV = $18,000)\n**Year 3:** $18,000 × 40% = $7,200 (BV = $10,800)\n**Year 4:** $10,800 × 40% = $4,320 (BV = $6,480)\n**Year 5:** $6,480 − $5,000 = $1,480 (stop at salvage!)\n\n**Total:** $45,000"
        },
        {
          title: '🧠 Memory Aid: DDB Rules',
          type: 'callout',
          content: "**DDB = \"Double the rate, Book value base\"**\n\n• **D**ouble the SL rate (2 ÷ Life)\n• Apply to **B**ook value (NOT depreciable base)\n• **B**ut don't drop below salvage!\n\nYear 1: Always Cost × DDB Rate\nLater years: Book Value × DDB Rate"
        },
        {
          title: 'Sum-of-Years-Digits (SYD)',
          type: 'text',
          content: "**Formula:**\nDepreciation = Depreciable Base × (Remaining Life ÷ SYD)\n\n**SYD (Sum of Years Digits):**\nSYD = n(n+1) ÷ 2\n\nFor 5-year life: SYD = 5(6)/2 = 15\nOr: 5+4+3+2+1 = 15\n\n**Fraction each year:**\nYear 1: 5/15, Year 2: 4/15, Year 3: 3/15, etc.\n\n**Also accelerated — higher early depreciation**"
        },
        {
          title: 'SYD Example',
          type: 'example',
          content: "**Given:**\n• Cost: $50,000\n• Salvage Value: $5,000\n• Useful Life: 5 years\n• Depreciable Base: $45,000\n• SYD = 15\n\n**Year 1:** $45,000 × 5/15 = $15,000\n**Year 2:** $45,000 × 4/15 = $12,000\n**Year 3:** $45,000 × 3/15 = $9,000\n**Year 4:** $45,000 × 2/15 = $6,000\n**Year 5:** $45,000 × 1/15 = $3,000\n**Total:** $45,000"
        },
        {
          title: 'Units of Production',
          type: 'text',
          content: "**Formula:**\nDepreciation Rate = Depreciable Base ÷ Total Estimated Units\n\nDepreciation Expense = Rate × Units Produced This Period\n\n**Characteristics:**\n• Based on OUTPUT, not time\n• Good for assets with variable usage\n• Common for machinery, vehicles\n• Depreciation varies with activity level"
        },
        {
          title: 'Units of Production Example',
          type: 'example',
          content: "**Given:**\n• Cost: $50,000\n• Salvage Value: $5,000\n• Estimated Total Output: 100,000 units\n• Year 1 Production: 25,000 units\n• Year 2 Production: 30,000 units\n\n**Rate:** $45,000 ÷ 100,000 = $0.45 per unit\n\n**Year 1:** 25,000 × $0.45 = $11,250\n**Year 2:** 30,000 × $0.45 = $13,500"
        },
        {
          title: 'Method Comparison',
          type: 'table',
          headers: ['Method', 'Year 1', 'Pattern', 'Best For'],
          rows: [
            ['Straight-Line', '$9,000', 'Constant', 'Assets with even benefit'],
            ['DDB', '$20,000', 'Decreasing', 'Tech/equipment losing value fast'],
            ['SYD', '$15,000', 'Decreasing', 'Similar to DDB, smoother decline'],
            ['Units of Production', 'Varies', 'Based on usage', 'Assets tied to output']
          ]
        },
        {
          title: 'Partial-Year Depreciation',
          type: 'text',
          content: "**When asset acquired mid-year:**\n\nCalculate full-year depreciation, then prorate.\n\n**Common Conventions:**\n• **Exact days/months** — Most precise\n• **Half-year convention** — 6 months in year of acquisition and disposal\n• **Mid-month convention** — Half month in month of acquisition\n• **Full-month convention** — Full month if owned any part\n\n**Exam Tip:** Read carefully for which convention applies!"
        },
        {
          title: 'Partial-Year Example',
          type: 'example',
          content: "**Asset purchased April 1 (SL method):**\n• Cost: $50,000, Salvage: $5,000, Life: 5 years\n• Full-year depreciation: $9,000\n\n**Year 1 (April-December = 9 months):**\n$9,000 × 9/12 = $6,750\n\n**Year 2 (full year):**\n$9,000\n\n**Year 6 (January-March = 3 months):**\n$9,000 × 3/12 = $2,250\n\nTotal: $6,750 + $9,000×4 + $2,250 = $45,000 ✓"
        },
        {
          title: '⚠️ Exam Trap: Changes in Estimates',
          type: 'warning',
          content: "**If useful life or salvage value changes:**\n\n• **Prospective treatment** (going forward)\n• NO restatement of prior periods\n• Calculate new depreciation using:\n  - Current book value\n  - NEW salvage value\n  - NEW remaining life\n\n**Entry:** Adjust depreciation expense going forward\n\n**NOT a prior period adjustment!**"
        },
        {
          title: 'Change in Estimate Example',
          type: 'example',
          content: "**After Year 2, life revised from 5 to 8 years:**\n\n• Original: Cost $50,000, Salvage $5,000, Life 5 years\n• Depreciation Years 1-2: $9,000 × 2 = $18,000\n• Book Value at end of Year 2: $50,000 − $18,000 = $32,000\n\n**New calculation (remaining 6 years):**\nNew annual depreciation = ($32,000 − $5,000) ÷ 6 = $4,500\n\n**Years 3-8:** $4,500 per year"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SL: (Cost − Salvage) ÷ Life — equal expense each year",
            "DDB: Book Value × (2/Life) — ignore salvage but don't go below it",
            "SYD: Depreciable Base × (Remaining/SYD) — accelerated like DDB",
            "Units: (Cost − Salvage) ÷ Total Units × Units This Period",
            "Partial year: Prorate based on months or convention specified",
            "Changes in estimates: Apply prospectively (no restatement)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-013',
    section: 'FAR',
    title: "Asset Impairment: Long-Lived Assets",
    description: "Apply the two-step impairment test for assets held and used",
    order: 18,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Assets", "PPE", "Impairment"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-C-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When an asset's value drops significantly, it must be written down. The CPA exam tests your knowledge of WHEN to test for impairment, HOW to measure the loss, and the key difference between GAAP and IFRS (no reversal under GAAP!). This is a frequently tested advanced topic."
        },
        {
          title: 'When to Test for Impairment',
          type: 'text',
          content: "**Impairment testing is required when:**\n\nEvents or circumstances indicate the carrying amount may not be recoverable:\n\n• Significant decrease in market price\n• Significant adverse change in how asset is used\n• Significant adverse change in legal or business climate\n• Accumulation of costs significantly exceeding expectations\n• Current-period operating or cash flow loss combined with history of losses\n• Expectation that asset will be sold or disposed of significantly before end of useful life"
        },
        {
          title: 'The Two-Step Test (GAAP)',
          type: 'text',
          content: "**Step 1: RECOVERABILITY TEST**\nIs carrying value recoverable from undiscounted future cash flows?\n\nIf Carrying Value > Undiscounted Cash Flows → Asset is IMPAIRED, go to Step 2\n\nIf Carrying Value ≤ Undiscounted Cash Flows → No impairment, STOP\n\n**Step 2: MEASUREMENT**\nImpairment Loss = Carrying Value − Fair Value\n\nWrite asset down to fair value."
        },
        {
          title: '🧠 Memory Aid: The Two Steps',
          type: 'callout',
          content: "**\"Undiscounted to TEST, Fair Value to MEASURE\"**\n\n**Step 1 (Recoverability):** Use UNDISCOUNTED cash flows\n→ This is a low hurdle—just need to recover the investment\n\n**Step 2 (Measurement):** Use FAIR VALUE\n→ If impaired, write down to what it's actually worth\n\n**Only go to Step 2 if Step 1 fails!**"
        },
        {
          title: 'Impairment Example',
          type: 'example',
          content: "**Given:**\n• Equipment carrying value: $500,000\n• Expected undiscounted future cash flows: $450,000\n• Fair value: $380,000\n\n**Step 1: Recoverability Test**\nCarrying value $500,000 > Cash flows $450,000\n→ Asset is IMPAIRED\n\n**Step 2: Measure Impairment Loss**\nLoss = $500,000 − $380,000 = $120,000\n\n**Journal Entry:**\nDr Impairment Loss               $120,000\n    Cr Accumulated Depreciation       $120,000\n\nOR\n\nDr Impairment Loss               $120,000\n    Cr Equipment                       $120,000"
        },
        {
          title: 'Fair Value Determination',
          type: 'text',
          content: "**Fair Value Hierarchy (ASC 820):**\n\n**Level 1:** Quoted prices in active markets for identical assets\n\n**Level 2:** Observable inputs other than Level 1 (similar assets, market data)\n\n**Level 3:** Unobservable inputs (company's own estimates)\n\n**If no market price available:**\nUse present value of expected future cash flows or other valuation techniques."
        },
        {
          title: 'Asset Groups',
          type: 'text',
          content: "**What if asset doesn't generate independent cash flows?**\n\nTest for impairment at the **asset group** level:\n\n• Lowest level of identifiable cash flows\n• Largely independent of other asset cash flows\n• Group assets that work together\n\n**Example:** A factory with multiple machines—test the factory as a group, not each machine separately."
        },
        {
          title: 'After Impairment',
          type: 'text',
          content: "**Post-Impairment Treatment:**\n\n• New carrying value = Fair value (becomes new \"cost\")\n• Continue depreciating over remaining useful life\n• Use new, lower depreciable base\n\n**GAAP Rule: NO REVERSAL ALLOWED!**\n\nEven if fair value later increases, you cannot write the asset back up.\n\n**IFRS Difference:** Reversal IS allowed (but not above original carrying amount)"
        },
        {
          title: '⚠️ Exam Trap: GAAP vs. IFRS Impairment',
          type: 'warning',
          content: "**GAAP (ASC 360):**\n• Two-step test (recoverability, then measurement)\n• Undiscounted cash flows for Step 1\n• NO reversal of impairment loss\n\n**IFRS (IAS 36):**\n• One-step test (compare to recoverable amount directly)\n• Recoverable amount = Higher of fair value less costs to sell OR value in use (PV of cash flows)\n• Reversal IS required if circumstances change\n\n**This is a frequently tested difference!**"
        },
        {
          title: 'Assets Held for Sale',
          type: 'text',
          content: "**Different rules for assets to be SOLD (not used):**\n\n**Classification Criteria:**\n• Management commits to a plan to sell\n• Asset is available for immediate sale\n• Active program to locate buyer has begun\n• Sale is probable within one year\n• Asset is being actively marketed at reasonable price\n• Significant changes to plan are unlikely\n\n**Measurement:**\nLower of carrying value or fair value less costs to sell\n\n**No depreciation while held for sale!**"
        },
        {
          title: 'Held for Sale Accounting',
          type: 'text',
          content: "**Upon Classification as Held for Sale:**\n\n1. Stop depreciating\n2. Measure at lower of:\n   - Carrying value, or\n   - Fair value less costs to sell\n3. Recognize loss if FV − costs to sell < carrying value\n\n**Subsequent Increases:**\n• Can reverse prior losses (but not above original carrying value)\n\n**Presentation:**\n• Report separately on balance sheet (not in PP&E)\n• Current asset if sale expected within one year"
        },
        {
          title: 'Comparison: Held for Use vs. Held for Sale',
          type: 'table',
          headers: ['Aspect', 'Held for Use', 'Held for Sale'],
          rows: [
            ['Test', 'Two-step (recoverability then FV)', 'Compare to FV less costs to sell'],
            ['Depreciation', 'Continue depreciating', 'Stop depreciating'],
            ['Measurement', 'Fair value if impaired', 'Lower of CV or FV − costs to sell'],
            ['Reversal (GAAP)', 'Not allowed', 'Allowed up to cumulative loss'],
            ['Presentation', 'In PP&E', 'Separate line item']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Test for impairment when events indicate carrying value may not be recoverable",
            "Step 1: Compare carrying value to UNDISCOUNTED future cash flows",
            "Step 2: If impaired, write down to FAIR VALUE",
            "Impairment loss = Carrying Value − Fair Value",
            "GAAP: NO reversal allowed; IFRS: Reversal required if conditions change",
            "Held for sale: Lower of CV or FV less costs to sell; no depreciation"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-014',
    section: 'FAR',
    title: "Disposals & Nonmonetary Exchanges",
    description: "Account for asset sales, retirements, and exchanges with commercial substance",
    order: 19,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Assets", "PPE", "Disposals", "Exchanges"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Assets don't last forever—eventually they're sold, traded, or scrapped. The exam tests your ability to calculate gains and losses on disposal and to handle the tricky rules for nonmonetary exchanges. The \"commercial substance\" concept is key!"
        },
        {
          title: 'Disposal of PP&E',
          type: 'text',
          content: "**Basic Steps:**\n\n1. Update depreciation to date of disposal\n2. Remove asset cost from books\n3. Remove accumulated depreciation\n4. Record proceeds received\n5. Recognize gain or loss\n\n**Gain/Loss Formula:**\nProceeds − Book Value = Gain (or Loss)\n\nBook Value = Cost − Accumulated Depreciation"
        },
        {
          title: 'Disposal Example',
          type: 'example',
          content: "**Given:**\n• Equipment cost: $100,000\n• Accumulated depreciation at sale: $70,000\n• Sold for: $35,000 cash\n\n**Book Value:** $100,000 − $70,000 = $30,000\n**Proceeds:** $35,000\n**Gain:** $35,000 − $30,000 = $5,000\n\n**Journal Entry:**\nDr Cash                          $35,000\nDr Accumulated Depreciation      $70,000\n    Cr Equipment                      $100,000\n    Cr Gain on Sale of Equipment       $5,000"
        },
        {
          title: 'Retirement (Scrapping)',
          type: 'text',
          content: "**When asset is retired with no sale:**\n\n• Remove asset and accumulated depreciation\n• No proceeds (or minimal salvage)\n• Usually results in a loss\n\n**Entry (no salvage):**\nDr Accumulated Depreciation      $XX,XXX\nDr Loss on Disposal              $X,XXX\n    Cr Equipment                      $XX,XXX"
        },
        {
          title: 'Involuntary Conversions',
          type: 'text',
          content: "**Asset destroyed or condemned (fire, theft, eminent domain):**\n\n**Treatment:**\n• Remove asset and accumulated depreciation\n• Record insurance proceeds or condemnation award\n• Recognize gain or loss\n\n**Example:** Building destroyed by fire\nDr Cash (insurance proceeds)     $300,000\nDr Accumulated Depreciation      $200,000\n    Cr Building                       $400,000\n    Cr Gain on Involuntary Conversion $100,000"
        },
        {
          title: 'Nonmonetary Exchanges: Overview',
          type: 'text',
          content: "**When assets are exchanged (not sold for cash):**\n\nThe accounting depends on whether the exchange has **COMMERCIAL SUBSTANCE**.\n\n**Commercial Substance exists when:**\nThe entity's future cash flows are expected to significantly change as a result of the exchange.\n\nSpecifically, if the:\n• Configuration (timing, risk, amount) of cash flows of asset received differs significantly from asset given up, OR\n• Entity-specific value changes, AND\n• The difference is significant relative to fair values exchanged"
        },
        {
          title: '🧠 Memory Aid: Commercial Substance',
          type: 'callout',
          content: "**\"Does the exchange change your business?\"**\n\n**HAS Commercial Substance:**\n• Exchanging a truck for equipment\n• Trading land for a building\n→ Different cash flow patterns = recognize gain/loss\n\n**LACKS Commercial Substance:**\n• Exchanging one delivery truck for a similar delivery truck\n→ Same cash flows, just shuffling similar assets = defer gain"
        },
        {
          title: 'Exchange WITH Commercial Substance',
          type: 'text',
          content: "**When exchange HAS commercial substance:**\n\nRecord asset received at **FAIR VALUE**\n\n• Use FV of asset given up (usually more reliable)\n• Or FV of asset received if more clearly evident\n• Recognize gain or loss immediately\n\n**Entry:**\nDr New Asset (at FV)             $XX,XXX\nDr Accumulated Depreciation      $XX,XXX\nDr/Cr Cash (boot)                $X,XXX\n    Cr Old Asset (at cost)            $XX,XXX\n    Cr/Dr Gain or Loss                $X,XXX"
        },
        {
          title: 'Commercial Substance Example',
          type: 'example',
          content: "**Exchange truck for equipment (HAS commercial substance):**\n\n• Truck cost: $50,000\n• Truck accumulated depreciation: $30,000\n• Truck book value: $20,000\n• Truck fair value: $25,000\n• Equipment fair value: $30,000\n• Cash paid (boot): $5,000\n\n**Entry:**\nDr Equipment                     $30,000\nDr Accumulated Depreciation      $30,000\n    Cr Truck                          $50,000\n    Cr Cash                            $5,000\n    Cr Gain on Exchange                $5,000\n\n**Gain:** FV of truck ($25,000) − BV of truck ($20,000) = $5,000"
        },
        {
          title: 'Exchange WITHOUT Commercial Substance',
          type: 'text',
          content: "**When exchange LACKS commercial substance:**\n\n**Losses:** Always recognize immediately\n\n**Gains:** Generally deferred (reduce basis of new asset)\n\n**Exception:** If boot (cash) is received, recognize proportionate gain\n\n**Proportionate Gain Formula:**\nRecognized Gain = Total Gain × (Boot Received ÷ Total Consideration Received)"
        },
        {
          title: 'No Commercial Substance Example',
          type: 'example',
          content: "**Exchange similar trucks (LACKS commercial substance):**\n\n• Old truck book value: $20,000\n• Old truck fair value: $25,000\n• New truck fair value: $28,000\n• Cash paid: $3,000\n• Total gain: $5,000 (FV $25K − BV $20K)\n\n**Since paying boot (not receiving), defer entire gain:**\n\n**Entry:**\nDr New Truck (plug)              $23,000\nDr Accumulated Depreciation      $XX,XXX\n    Cr Old Truck                      $XX,XXX\n    Cr Cash                            $3,000\n\n**New truck basis:** $23,000 (not $28,000 FV)\n**Deferred gain:** $5,000 (reduces basis of new asset)"
        },
        {
          title: 'Boot Received - Partial Gain Recognition',
          type: 'example',
          content: "**Exchange similar assets, RECEIVING boot:**\n\n• Old asset BV: $20,000, FV: $30,000\n• New asset FV: $25,000\n• Cash received: $5,000\n• Total gain: $10,000 ($30K − $20K)\n\n**Proportion received as boot:**\n$5,000 ÷ $30,000 = 16.67%\n\n**Gain recognized:**\n$10,000 × 16.67% = $1,667\n\n**New asset basis:**\n$30,000 − $5,000 − ($10,000 − $1,667) = $16,667\n\nOr: BV of old − boot + gain recognized = $20,000 − $5,000 + $1,667 = $16,667"
        },
        {
          title: '⚠️ Exam Trap: Always Recognize Losses',
          type: 'warning',
          content: "**Regardless of commercial substance:**\n\nLOSSES are ALWAYS recognized immediately!\n\nConservatism principle: Don't hide losses by deferring them.\n\n**Only GAINS are deferred** when exchange lacks commercial substance."
        },
        {
          title: 'Exchange Summary',
          type: 'table',
          headers: ['Scenario', 'Gain Treatment', 'Loss Treatment', 'New Asset Basis'],
          rows: [
            ['Has Commercial Substance', 'Recognize', 'Recognize', 'Fair Value'],
            ['Lacks Substance, No Boot', 'Defer', 'Recognize', 'BV given + boot paid − gain'],
            ['Lacks Substance, Boot Paid', 'Defer', 'Recognize', 'BV given + boot paid'],
            ['Lacks Substance, Boot Received', 'Partial recognize', 'Recognize', 'FV − deferred gain']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Gain/Loss on disposal = Proceeds − Book Value",
            "Always update depreciation to date of disposal first",
            "Commercial substance: Cash flows change significantly → recognize gain/loss",
            "No commercial substance: Defer gains (reduce new asset basis), recognize losses",
            "Boot received without commercial substance → recognize proportionate gain",
            "LOSSES are always recognized immediately regardless of commercial substance"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-015',
    section: 'FAR',
    title: "Debt Securities: HTM, AFS, Trading",
    description: "Master the three classifications of debt security investments and their accounting",
    order: 20,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Assets", "Investments", "Debt Securities"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-E-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Investment classification drives everything: measurement, income recognition, and balance sheet presentation. The exam heavily tests the differences between HTM, AFS, and Trading securities. One key: know where unrealized gains/losses go—P&L or OCI!"
        },
        {
          title: 'Three Classifications',
          type: 'text',
          content: "**Debt securities must be classified based on INTENT and ABILITY:**\n\n**1. Held-to-Maturity (HTM)**\n• Intent and ability to hold until maturity\n• Only for DEBT securities (not equity)\n\n**2. Trading**\n• Held for short-term profit\n• Active buying and selling expected\n\n**3. Available-for-Sale (AFS)**\n• Everything else—the default category\n• Neither HTM nor Trading"
        },
        {
          title: 'Classification Summary',
          type: 'table',
          headers: ['Classification', 'Measurement', 'Unrealized G/L', 'Interest Income'],
          rows: [
            ['HTM', 'Amortized Cost', 'Not recognized (unless impaired)', 'Effective interest method'],
            ['Trading', 'Fair Value', 'Net Income (P&L)', 'Stated rate × face'],
            ['AFS', 'Fair Value', 'OCI (bypass P&L)', 'Effective interest method']
          ]
        },
        {
          title: 'Held-to-Maturity (HTM)',
          type: 'text',
          content: "**Requirements:**\n• Positive intent to hold to maturity\n• Ability to hold (no liquidity constraints)\n• Only DEBT securities (bonds, notes)\n\n**Accounting:**\n• Carry at **amortized cost**\n• Amortize premium/discount using effective interest method\n• Unrealized gains/losses NOT recognized (market changes ignored)\n• Test for credit impairment under CECL\n\n**Why choose HTM?** Avoids earnings volatility from fair value changes."
        },
        {
          title: 'HTM Example',
          type: 'example',
          content: "**Purchase $100,000 face value bond at $96,000:**\n• Stated rate: 5%\n• Market rate at purchase: 6%\n• Term: 5 years\n\n**Initial Entry:**\nDr Investment in HTM Debt         $96,000\n    Cr Cash                             $96,000\n\n**Year 1 Interest:**\nCash interest: $100,000 × 5% = $5,000\nInterest income: $96,000 × 6% = $5,760\nDiscount amortization: $760\n\nDr Cash                            $5,000\nDr Investment in HTM Debt            $760\n    Cr Interest Income                    $5,760\n\n**New carrying value: $96,760**"
        },
        {
          title: 'Trading Securities',
          type: 'text',
          content: "**Characteristics:**\n• Active and frequent buying/selling\n• Profit from short-term price changes\n• Typically held by financial institutions, broker-dealers\n\n**Accounting:**\n• Carry at **fair value**\n• Unrealized gains/losses → **Net Income**\n• Changes in fair value affect earnings immediately\n• No premium/discount amortization needed (use fair value)"
        },
        {
          title: 'Trading Securities Example',
          type: 'example',
          content: "**Purchase trading security for $50,000:**\n\n**At Purchase:**\nDr Trading Securities            $50,000\n    Cr Cash                            $50,000\n\n**Year-End (FV = $53,000):**\nDr Trading Securities             $3,000\n    Cr Unrealized Gain (P&L)            $3,000\n\n**Next Year (FV = $48,000):**\nDr Unrealized Loss (P&L)          $5,000\n    Cr Trading Securities               $5,000\n\n**Trading securities: FV changes hit the INCOME STATEMENT!**"
        },
        {
          title: 'Available-for-Sale (AFS)',
          type: 'text',
          content: "**The \"default\" classification:**\n• Not held for trading\n• Not intended to be held to maturity\n• May be sold in response to liquidity needs, interest rate changes, etc.\n\n**Accounting:**\n• Carry at **fair value**\n• Unrealized gains/losses → **OCI** (not P&L)\n• Accumulates in **AOCI** on balance sheet\n• Interest income: Effective interest method\n• Reclassify to P&L when sold (\"recycling\")"
        },
        {
          title: 'AFS Example',
          type: 'example',
          content: "**Purchase AFS bond at $100,000; year-end FV = $105,000:**\n\n**At Purchase:**\nDr Investment in AFS Debt        $100,000\n    Cr Cash                           $100,000\n\n**Year-End Adjustment:**\nDr Investment in AFS Debt          $5,000\n    Cr OCI - Unrealized Gain            $5,000\n\n**When Sold for $108,000:**\nDr Cash                          $108,000\nDr OCI - Unrealized Gain           $5,000\n    Cr Investment in AFS Debt         $105,000\n    Cr Gain on Sale (P&L)               $8,000\n\n**Total gain hits P&L when SOLD, not before!**"
        },
        {
          title: '🧠 Memory Aid: Where Do Unrealized G/L Go?',
          type: 'callout',
          content: "**\"TIP\" — Trading goes to Income (P&L)**\n\n**T**rading → **I**ncome Statement (**P**&L)\n\n**AFS → OCI** (bypasses income until sold)\n\n**HTM → Nowhere** (stay at amortized cost)\n\nRemember: Trading is most volatile to earnings!"
        },
        {
          title: 'Premium and Discount Amortization',
          type: 'text',
          content: "**Premium:** Paid more than face value (market rate < stated rate)\n• Amortization REDUCES interest income\n\n**Discount:** Paid less than face value (market rate > stated rate)\n• Amortization INCREASES interest income\n\n**Effective Interest Method:**\nInterest Income = Carrying Value × Market Rate at Purchase\nCash Received = Face Value × Stated Rate\nAmortization = Difference\n\n**Required for HTM and AFS; optional for Trading (use FV anyway)**"
        },
        {
          title: 'Impairment of Debt Securities',
          type: 'text',
          content: "**HTM and AFS Debt Securities:**\n\nUnder ASC 326 (CECL), when FV < Amortized Cost:\n\n1. **Determine credit loss portion:**\n   Amortized cost − PV of expected cash flows = Credit loss\n\n2. **Record credit loss:**\n   Dr Credit Loss Expense\n       Cr Allowance for Credit Losses\n\n3. **Non-credit portion (AFS only):**\n   Remaining decline recorded in OCI\n\n**Trading securities:** Already at fair value through P&L, so no separate impairment analysis needed."
        },
        {
          title: '⚠️ Exam Trap: Reclassifications',
          type: 'warning',
          content: "**Transfers between categories are RARE and restricted:**\n\n**From HTM:** Taints entire portfolio—questions intent for ALL HTM\n\n**To HTM:** Generally prohibited unless very limited circumstances\n\n**From Trading:** Very rare; generally prohibited\n\n**Between AFS and Trading:** Possible but requires clear change in intent\n\n**Key:** Exam may test consequences of inappropriate transfers!"
        },
        {
          title: 'Balance Sheet Presentation',
          type: 'text',
          content: "**Classification on Balance Sheet:**\n\n**Current Assets:**\n• Trading securities (always)\n• HTM/AFS maturing within one year\n\n**Non-current Assets:**\n• HTM/AFS with maturity > one year\n\n**Note:** Trading securities are current even if maturity is > 1 year (intent to sell)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "HTM: Amortized cost; unrealized G/L not recognized; only debt securities",
            "Trading: Fair value; unrealized G/L in P&L (Net Income)",
            "AFS: Fair value; unrealized G/L in OCI (bypasses P&L until sold)",
            "Premium amortization reduces interest income; discount increases it",
            "Effective interest method required for HTM and AFS",
            "Impairment: Credit losses to P&L; non-credit portion to OCI (AFS)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-016',
    section: 'FAR',
    title: "Equity Securities: Fair Value Measurement",
    description: "Account for stock investments using fair value method under ASC 321",
    order: 21,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Assets", "Investments", "Equity Securities"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Under current GAAP (ASC 321), most equity securities are measured at fair value with changes flowing through Net Income. This is a significant change from the old AFS treatment for equities. Understanding when fair value applies and the exceptions is critical for exam success."
        },
        {
          title: 'Scope: What Are Equity Securities?',
          type: 'text',
          content: "**Equity securities include:**\n\n• Common stock\n• Preferred stock (non-redeemable)\n• Stock warrants and rights\n• Call/put options on equity securities\n\n**NOT equity securities:**\n• Investments accounted for under equity method\n• Investments in consolidated subsidiaries\n• Investments in partnerships, LLCs (generally)"
        },
        {
          title: 'Default Treatment: Fair Value through Net Income',
          type: 'text',
          content: "**Under ASC 321, equity securities are:**\n\n• Measured at **fair value**\n• Changes in fair value → **Net Income** (P&L)\n• **No OCI option** for equity investments\n\n**Key change from old GAAP:**\nPre-2018, equities could be classified as AFS with unrealized G/L in OCI.\nNow ALL fair value changes hit earnings immediately!"
        },
        {
          title: 'Fair Value Through Net Income Example',
          type: 'example',
          content: "**Purchase 5,000 shares (2% ownership) at $40/share:**\n\n**At Purchase:**\nDr Equity Investment           $200,000\n    Cr Cash                          $200,000\n\n**Year-End (FV = $45/share):**\nDr Equity Investment            $25,000\n    Cr Unrealized Gain (P&L)          $25,000\n\n**Next Year (FV = $38/share):**\nDr Unrealized Loss (P&L)        $35,000\n    Cr Equity Investment              $35,000\n\n**Dividends received ($1/share):**\nDr Cash                          $5,000\n    Cr Dividend Income                 $5,000"
        },
        {
          title: 'Exception: Practicability Exception',
          type: 'text',
          content: "**For equity securities WITHOUT readily determinable fair value:**\n\n**May elect to measure at:**\nCost minus impairment, plus or minus changes from observable price changes\n\n**Qualifications:**\n• No readily determinable fair value\n• Not required to be measured at fair value (e.g., not a derivative)\n• Election is irrevocable\n\n**Common for:** Private company stock, limited partnership interests"
        },
        {
          title: 'Practicability Exception Measurement',
          type: 'text',
          content: "**Initial measurement:** Cost (acquisition price)\n\n**Subsequent measurement adjustments:**\n\n1. **Impairment** — If qualitative indicators exist\n   • Write down to fair value if impaired\n\n2. **Observable price changes** — If same/similar securities sold\n   • Adjust to observable transaction price\n   • Gain or loss to Net Income\n\n**Annual reassessment:** Review if FV becomes readily determinable"
        },
        {
          title: '🧠 Memory Aid: Equity Investment Accounting',
          type: 'callout',
          content: "**\"FV to NI for Equity\"**\n\n**F**air **V**alue changes go to **N**et **I**ncome\n\n**No OCI for Equities!**\n\nUnlike AFS debt securities (which use OCI), equity securities send ALL fair value changes straight to the income statement.\n\nThis creates more earnings volatility for equity investors."
        },
        {
          title: 'Dividend Income Recognition',
          type: 'text',
          content: "**When to recognize dividends:**\n\n• Recognize when **right to receive** is established\n• Usually the **ex-dividend date**\n• Record as **Dividend Income** (not investment adjustment)\n\n**Liquidating dividends:**\n• Reduce investment account (return of capital)\n• Not income\n• Recognize when total dividends exceed share of earnings since acquisition"
        },
        {
          title: 'Equity Securities Received as Dividends',
          type: 'text',
          content: "**Stock dividends received:**\n\n**From investee:**\n• Allocate existing cost over more shares\n• No income recognized\n• Lower cost per share\n\n**Example:**\n• Own 100 shares at $50 = $5,000 investment\n• Receive 10% stock dividend (10 shares)\n• New: 110 shares at $45.45/share = $5,000 total\n\n**Record the new shares at fair value only if measuring at FV through NI**"
        },
        {
          title: 'Stock Splits',
          type: 'text',
          content: "**Treatment similar to stock dividends:**\n\n**2-for-1 split:**\n• Own 100 shares at $50 = $5,000\n• After split: 200 shares at $25 = $5,000\n• No accounting entry needed (just memo update)\n\n**If measuring at fair value:**\n• Adjust shares count\n• Fair value reflects post-split market price\n• Generally no immediate P&L impact from split itself"
        },
        {
          title: '⚠️ Exam Trap: Fair Value vs. Equity Method',
          type: 'warning',
          content: "**Fair Value Method (< 20% typically):**\n• FV changes → Net Income\n• Dividends → Income\n• No amortization of purchase premium\n\n**Equity Method (20-50% typically):**\n• Share of net income → Income\n• Dividends → Reduce investment (not income!)\n• Amortize FV adjustments\n\n**The dividend treatment is OPPOSITE!**"
        },
        {
          title: 'Summary: Equity Security Accounting',
          type: 'table',
          headers: ['Aspect', 'Fair Value Method', 'Note'],
          rows: [
            ['Initial measurement', 'Cost (purchase price)', 'Include transaction costs'],
            ['Subsequent measurement', 'Fair value', 'Each reporting date'],
            ['Unrealized G/L', 'Net Income', 'NOT OCI'],
            ['Dividends', 'Dividend Income', 'When right established'],
            ['No FV readily determinable', 'Practicability exception', 'Cost ± adjustments']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Equity securities measured at fair value with changes through Net Income",
            "NO OCI option for equity investments (unlike AFS debt)",
            "Dividends recorded as income when right to receive is established",
            "Practicability exception: Cost minus impairment for equities without determinable FV",
            "Stock dividends/splits: Allocate cost over new shares, no income recognized",
            "Fair value method dividends = income; Equity method dividends = reduce investment"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-017',
    section: 'FAR',
    title: "Equity Method Investments",
    description: "Apply the equity method for investments with significant influence (20-50%)",
    order: 22,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Assets", "Investments", "Equity Method"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-E-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The equity method is called 'one-line consolidation' because your investment account reflects your share of the investee's net assets. This is heavily tested—you must understand the income/dividend entries, purchase premium amortization, and intercompany elimination. Getting the details right is essential!"
        },
        {
          title: 'When to Apply the Equity Method',
          type: 'text',
          content: "**Presumption of significant influence:**\n\n**20-50% ownership of voting stock**\n\n**Indicators of significant influence:**\n• Representation on board of directors\n• Participation in policy-making processes\n• Material intercompany transactions\n• Interchange of managerial personnel\n• Technological dependency\n\n**Can be rebutted:** If evidence shows no actual influence despite ownership %"
        },
        {
          title: 'Basic Equity Method Entries',
          type: 'text',
          content: "**Initial purchase:**\nDr Investment in Affiliate    $XXX\n    Cr Cash                         $XXX\n\n**Recognize share of investee income:**\nDr Investment in Affiliate    $XXX\n    Cr Equity in Earnings           $XXX\n\n**Receive dividends:**\nDr Cash                        $XXX\n    Cr Investment in Affiliate      $XXX\n\n**Key:** Dividends REDUCE investment (return of capital, not income!)"
        },
        {
          title: '🧠 Memory Aid: Investment Account T-Account',
          type: 'callout',
          content: "**Investment Account:**\n\n**DEBITS (Increases):**\n• Initial purchase\n• Share of investee income\n• Share of investee OCI\n\n**CREDITS (Decreases):**\n• Dividends received\n• Share of investee loss\n• Amortization of FV adjustments\n• Impairment\n\n**Balance = Your share of investee's net assets (adjusted)**"
        },
        {
          title: 'Comprehensive Example',
          type: 'example',
          content: "**Jan 1: Acquire 40% of XYZ for $500,000**\nXYZ's book value: $1,000,000 (Your share: $400,000)\nExcess paid: $100,000 (attributed to building, 10-year life)\n\n**Dec 31: XYZ reports net income of $200,000:**\nDr Investment in XYZ           $80,000\n    Cr Equity in Earnings            $80,000\n(40% × $200,000)\n\n**Amortize building excess:**\nDr Equity in Earnings          $10,000\n    Cr Investment in XYZ             $10,000\n($100,000 ÷ 10 years)\n\n**XYZ pays dividends of $50,000:**\nDr Cash                        $20,000\n    Cr Investment in XYZ             $20,000\n(40% × $50,000)"
        },
        {
          title: 'Purchase Price Allocation',
          type: 'text',
          content: "**When purchase price > share of book value:**\n\n1. **Allocate excess to identifiable assets/liabilities**\n   • Inventory → Expense when sold (usually Year 1)\n   • Fixed assets → Amortize over remaining life\n   • Intangibles → Amortize over useful life\n\n2. **Remaining excess = Goodwill**\n   • NOT amortized\n   • Test for impairment annually\n\n**These adjustments REDUCE equity in earnings!**"
        },
        {
          title: 'Intercompany Transactions',
          type: 'text',
          content: "**Must eliminate unrealized intercompany profits!**\n\n**Downstream (Investor → Investee):**\n• Investor sold goods to investee\n• Eliminate **100%** of unrealized profit\n\n**Upstream (Investee → Investor):**\n• Investee sold goods to investor\n• Eliminate **investor's % share** of unrealized profit\n\n**Realized when:**\n• Inventory sold to third party\n• Fixed asset fully depreciated"
        },
        {
          title: 'Intercompany Example',
          type: 'example',
          content: "**40% ownership; intercompany sale:**\n\n**Downstream (Investor sells to Investee):**\n• Investor sold inventory for $100,000 (cost $70,000)\n• Gross profit: $30,000\n• 25% remains in investee's inventory at year-end\n• Unrealized profit: $30,000 × 25% = $7,500\n\n**Eliminate 100%:**\nDr Equity in Earnings          $7,500\n    Cr Investment in XYZ             $7,500\n\n**If Upstream (Investee sells to Investor):**\n• Same facts, but only eliminate 40% (investor's share)\n• $7,500 × 40% = $3,000 elimination"
        },
        {
          title: 'Share of Other Comprehensive Income',
          type: 'text',
          content: "**Record investor's share of investee's OCI:**\n\n**If investee has OCI item:**\nDr Investment in Affiliate    $XXX\n    Cr OCI (investor's share)       $XXX\n\n**Example:** Investee has $10,000 unrealized gain on AFS securities\nInvestor's share (40%): $4,000\n\nDr Investment                  $4,000\n    Cr OCI - Unrealized Gain        $4,000"
        },
        {
          title: '⚠️ Exam Trap: Investment Goes Negative',
          type: 'warning',
          content: "**What if losses exceed investment balance?**\n\n**General rule:** Stop recognizing losses at $0\n• Don't let investment go negative\n\n**Exceptions — continue recognizing if:**\n• Investor has guaranteed obligations\n• Investor committed to provide financial support\n• Imminent return to profitability\n\n**Resume equity method:** Only after unrecognized losses are absorbed by share of subsequent income"
        },
        {
          title: 'Loss of Significant Influence',
          type: 'text',
          content: "**When ownership falls below 20% (or influence lost):**\n\n1. **Stop equity method** from date influence lost\n2. **Measure retained investment** at fair value\n3. **Recognize gain/loss** on remeasurement\n4. **Apply fair value method** prospectively\n\n**No retroactive restatement!**"
        },
        {
          title: 'Acquisition of Significant Influence',
          type: 'text',
          content: "**When ownership crosses 20% threshold:**\n\n1. **Remeasure prior investment** to fair value at date\n2. **Recognize gain/loss** on remeasurement\n3. **Combine with new purchase** for total investment\n4. **Apply equity method** from date of significant influence\n\n**Note:** Some view this as a step acquisition requiring retroactive application"
        },
        {
          title: 'Equity Method Summary',
          type: 'table',
          headers: ['Event', 'Debit', 'Credit'],
          rows: [
            ['Purchase investment', 'Investment', 'Cash'],
            ['Share of net income', 'Investment', 'Equity in Earnings'],
            ['Receive dividends', 'Cash', 'Investment'],
            ['Share of net loss', 'Equity in Earnings (loss)', 'Investment'],
            ['Amortize excess FV', 'Equity in Earnings', 'Investment'],
            ['Eliminate unrealized profit', 'Equity in Earnings', 'Investment']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Equity method = 'one-line consolidation' for 20-50% ownership",
            "Share of income increases investment; dividends decrease investment",
            "Purchase premium: Allocate to identifiable assets → amortize; residual = goodwill",
            "Downstream intercompany: Eliminate 100% unrealized profit",
            "Upstream intercompany: Eliminate investor's % share of unrealized profit",
            "Stop at zero unless guarantees/commitments exist"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-018',
    section: 'FAR',
    title: "Fair Value Hierarchy: Levels 1, 2, 3",
    description: "Apply the three-level fair value hierarchy under ASC 820",
    order: 23,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Measurements", "Fair Value"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fair value measurement is used throughout GAAP—investments, impairments, acquisitions, derivatives, and more. ASC 820 establishes a single framework for measuring fair value. The three-level hierarchy tells you which inputs are most reliable. This is foundational knowledge you'll apply across many topics!"
        },
        {
          title: 'What is Fair Value?',
          type: 'text',
          content: "**ASC 820 Definition:**\n\n\"The price that would be **received to sell** an asset or **paid to transfer** a liability in an **orderly transaction** between **market participants** at the **measurement date**.\"\n\n**Key elements:**\n• **Exit price** (not entry price)\n• **Orderly** (not forced/distressed)\n• **Market participants** (hypothetical buyers/sellers)\n• **Measurement date** (current conditions)"
        },
        {
          title: 'The Fair Value Hierarchy',
          type: 'text',
          content: "**Three levels based on INPUT observability:**\n\n**Level 1:** Quoted prices in ACTIVE markets for IDENTICAL assets/liabilities (most reliable)\n\n**Level 2:** Observable inputs OTHER than Level 1 quotes (similar assets, market data)\n\n**Level 3:** UNOBSERVABLE inputs based on entity's own assumptions (least reliable)\n\n**Priority:** Use highest level available! Level 1 > Level 2 > Level 3"
        },
        {
          title: '🧠 Memory Aid: 1-2-3 Hierarchy',
          type: 'callout',
          content: "**\"Same, Similar, Self\"**\n\n**Level 1:** **Same** asset, active market, quoted price\n(e.g., NYSE stock quote)\n\n**Level 2:** **Similar** assets or observable market data\n(e.g., bond priced using yield curves)\n\n**Level 3:** **Self** — entity's own estimates\n(e.g., private company valuation using DCF)\n\nThink: Reliability decreases 1 → 2 → 3"
        },
        {
          title: 'Level 1 Inputs',
          type: 'list',
          content: [
            { term: "Definition", definition: "Quoted prices in ACTIVE markets for IDENTICAL assets or liabilities" },
            { term: "Most reliable", definition: "Directly observable, unadjusted, no judgment needed" },
            { term: "Example - Stock", definition: "Closing price on NYSE for shares of Apple" },
            { term: "Example - Commodity", definition: "CME exchange price for gold futures" },
            { term: "Active market", definition: "Sufficient frequency and volume of transactions" },
            { term: "Adjustment rule", definition: "Generally no adjustments (would move to Level 2)" }
          ]
        },
        {
          title: 'Level 2 Inputs',
          type: 'list',
          content: [
            { term: "Definition", definition: "Observable inputs OTHER than Level 1 quoted prices" },
            { term: "Similar assets", definition: "Quoted prices for SIMILAR (not identical) assets in active markets" },
            { term: "Identical in inactive market", definition: "Quoted prices for identical assets in LESS active markets" },
            { term: "Observable market data", definition: "Interest rates, yield curves, volatilities, credit spreads" },
            { term: "Example - Bond", definition: "Corporate bond valued using Treasury yield curve + credit spread" },
            { term: "Example - Option", definition: "Option priced using observable volatility inputs" }
          ]
        },
        {
          title: 'Level 3 Inputs',
          type: 'list',
          content: [
            { term: "Definition", definition: "UNOBSERVABLE inputs reflecting entity's own assumptions" },
            { term: "Least reliable", definition: "Use only when observable inputs are not available" },
            { term: "Internal models", definition: "DCF, Monte Carlo, other valuation models using internal data" },
            { term: "Example - Private equity", definition: "Valuing startup stock using projected cash flows" },
            { term: "Example - Intangible", definition: "Customer relationship valued using internal projections" },
            { term: "Disclosure", definition: "Enhanced disclosure requirements for Level 3 measurements" }
          ]
        },
        {
          title: 'Determining Overall Level',
          type: 'text',
          content: "**Classify based on LOWEST level of SIGNIFICANT input:**\n\n**Example 1:**\nAll Level 1 inputs → **Level 1** measurement\n\n**Example 2:**\nLevel 1 + Level 2 inputs → **Level 2** measurement\n\n**Example 3:**\nLevel 1 + Level 2 + significant Level 3 input → **Level 3** measurement\n\n**\"Significant\" requires judgment!**"
        },
        {
          title: 'Valuation Techniques',
          type: 'table',
          headers: ['Approach', 'Method', 'Best Used For'],
          rows: [
            ['Market Approach', 'Prices from market transactions', 'Actively traded assets'],
            ['Income Approach', 'Discounted cash flows, option pricing', 'Assets with measurable cash flows'],
            ['Cost Approach', 'Replacement cost', 'Specialized assets, intangibles']
          ]
        },
        {
          title: 'Principal Market',
          type: 'text',
          content: "**Where to measure fair value?**\n\n**Principal Market:** Market with greatest volume and level of activity\n• Use this market if it exists\n• Even if price in another market is better\n\n**Most Advantageous Market:** Market that maximizes proceeds (or minimizes payment)\n• Use only if no principal market\n\n**Assumption:** Entity has ACCESS to the market"
        },
        {
          title: '⚠️ Exam Trap: Transaction Costs',
          type: 'warning',
          content: "**Transaction costs are NOT part of fair value!**\n\nFair value measures the asset/liability itself, not the transaction.\n\n**However:**\n• Transaction costs DO matter for determining most advantageous market\n• **Transportation costs** ARE included if location is an asset characteristic\n\n**Example:** Oil in Oklahoma vs. Gulf Coast—location affects fair value"
        },
        {
          title: 'Fair Value Disclosures',
          type: 'text',
          content: "**Required disclosures by level:**\n\n**All levels:**\n• Fair value measurements by class of asset/liability\n• Level classification\n\n**Level 3 specifically:**\n• Valuation techniques and inputs used\n• Reconciliation of beginning to ending balances\n• Sensitivity analysis (reasonably possible changes)\n• Transfers in/out of Level 3\n\n**Recurring vs. Nonrecurring:** Different requirements"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Fair value = exit price in orderly transaction at measurement date",
            "Level 1: Quoted prices for identical assets in active markets (most reliable)",
            "Level 2: Observable inputs other than Level 1 (similar assets, market data)",
            "Level 3: Unobservable entity-developed inputs (least reliable)",
            "Overall level = lowest level of significant input",
            "Transaction costs excluded; transportation costs may be included"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-019',
    section: 'FAR',
    title: "Intangible Assets: R&D & Software Costs",
    description: "Account for research & development costs and software development under GAAP",
    order: 24,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Assets", "Intangibles", "R&D", "Software"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-D-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "R&D is the lifeblood of innovation, but GAAP takes a conservative approach—expense most of it! The exception is software development costs, which have specific capitalization rules. Understanding these rules helps you avoid common exam traps about what to capitalize vs. expense."
        },
        {
          title: 'Research & Development: Overview',
          type: 'text',
          content: "**General Rule: EXPENSE ALL R&D AS INCURRED!**\n\n**Why?** Future benefits are too uncertain.\n\n**Research:** Planned search for new knowledge\n**Development:** Application of research findings to create new or improved products/processes\n\n**Combined into \"R&D expense\" on income statement**"
        },
        {
          title: 'What is R&D?',
          type: 'list',
          content: [
            { term: "Laboratory research", definition: "Searching for new knowledge - EXPENSE" },
            { term: "Conceptual formulation", definition: "Developing alternatives - EXPENSE" },
            { term: "Design of prototypes", definition: "Pre-production samples - EXPENSE" },
            { term: "Testing alternatives", definition: "Evaluating product/process options - EXPENSE" },
            { term: "Engineering activity", definition: "Before commercial production - EXPENSE" },
            { term: "Modification of existing products", definition: "For significantly improved version - EXPENSE" }
          ]
        },
        {
          title: 'What is NOT R&D?',
          type: 'list',
          content: [
            { term: "Quality control", definition: "During production - NOT R&D, capitalize as overhead" },
            { term: "Routine product design", definition: "Minor changes to existing products - NOT R&D" },
            { term: "Market research", definition: "Test marketing - NOT R&D (selling expense)" },
            { term: "Legal fees for patents", definition: "Capitalize as intangible asset if patent obtained" },
            { term: "Engineering for commercial production", definition: "After product ready - capitalize as manufacturing" },
            { term: "Seasonal design changes", definition: "Fashion, style changes - NOT R&D" }
          ]
        },
        {
          title: 'R&D Materials & Equipment',
          type: 'text',
          content: "**Equipment and facilities used in R&D:**\n\n**HAS alternative future use:**\n• Capitalize as PP&E\n• Depreciate normally\n• Allocate to R&D expense as used\n\n**NO alternative future use:**\n• EXPENSE immediately as R&D\n\n**Materials & Supplies:**\n• Expense as consumed in R&D"
        },
        {
          title: '🧠 Memory Aid: R&D Rule',
          type: 'callout',
          content: "**\"If it's R&D, Expense it!\"**\n\n**Exceptions (NOT expensed as R&D):**\n• Equipment with OTHER uses → Capitalize as PP&E\n• Contract R&D for others → Cost of revenue (not R&D expense)\n• Software after technological feasibility → Capitalize\n\n**The default is EXPENSE. Exceptions are narrow!**"
        },
        {
          title: 'Software Development: For External Sale',
          type: 'text',
          content: "**ASC 985-20: Software for sale/lease to customers**\n\n**BEFORE Technological Feasibility:**\n• EXPENSE as R&D\n\n**AFTER Technological Feasibility:**\n• CAPITALIZE\n\n**Technological feasibility established when:**\n• Detailed program design completed, OR\n• Working model completed and tested\n\n**Capitalization ends when:** Product available for general release"
        },
        {
          title: 'Software Capitalization Diagram',
          type: 'text',
          content: "**Timeline:**\n\n[Start] ──────── [Tech Feasibility] ──────── [General Release]\n      ↓                  ↓                         ↓\n   EXPENSE            CAPITALIZE               AMORTIZE\n   as R&D             costs incurred           the capitalized\n                      (coding, testing)        software costs"
        },
        {
          title: 'Amortization of Capitalized Software',
          type: 'text',
          content: "**Amortize capitalized software costs:**\n\n**Use GREATER of:**\n1. **Straight-line** over remaining estimated life\n2. **Revenue ratio:** Current revenue ÷ Total expected revenue × Capitalized cost\n\n**Report at LOWER of:**\n• Unamortized cost, OR\n• Net realizable value (if impaired)\n\n**Annual evaluation required!**"
        },
        {
          title: 'Software for Internal Use',
          type: 'text',
          content: "**ASC 350-40: Software developed for internal use**\n\n**Three stages:**\n\n**1. Preliminary Stage:** EXPENSE\n• Conceptual formulation, evaluating alternatives\n\n**2. Application Development Stage:** CAPITALIZE\n• Design, coding, installation, testing\n• Configuration of purchased software\n\n**3. Post-Implementation Stage:** EXPENSE\n• Training, maintenance, data conversion"
        },
        {
          title: 'Internal Use Software Example',
          type: 'example',
          content: "**Company develops custom ERP system:**\n\n**Preliminary Stage (EXPENSE):**\n• Consultant fees for evaluation: $50,000\n• Feasibility study: $30,000\nTotal expensed: $80,000\n\n**Application Development (CAPITALIZE):**\n• Programmer salaries: $200,000\n• Software design: $100,000\n• Testing: $50,000\nTotal capitalized: $350,000\n\n**Post-Implementation (EXPENSE):**\n• User training: $25,000\n• Data migration: $40,000\nTotal expensed: $65,000"
        },
        {
          title: '⚠️ Exam Trap: Software Cost Distinctions',
          type: 'warning',
          content: "**For SALE (ASC 985-20):**\n• Capitalize AFTER technological feasibility\n• Tech feasibility = detailed design or working model\n\n**For INTERNAL USE (ASC 350-40):**\n• Capitalize DURING application development stage\n• Three-stage model\n\n**Key difference:** \"Technological feasibility\" vs. \"Application development stage\" are different concepts!"
        },
        {
          title: 'Cloud Computing Arrangements',
          type: 'text',
          content: "**Hosting arrangements (ASC 350-40):**\n\n**If software license exists:**\n• Capitalize implementation costs like internal-use software\n\n**If no software license (service contract):**\n• Expense implementation costs as incurred, OR\n• Capitalize certain costs similar to internal-use software rules\n• Amortize over hosting contract term\n\n**This is an evolving area—check for updates!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "R&D: Expense as incurred (very few exceptions)",
            "R&D equipment with other uses: Capitalize and depreciate",
            "Software for sale: Capitalize AFTER technological feasibility",
            "Software for internal use: Capitalize DURING application development stage",
            "Amortize capitalized software: Greater of straight-line or revenue ratio",
            "Preliminary/post-implementation costs: Always expense"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-020',
    section: 'FAR',
    title: "Acquired Intangibles & Amortization",
    description: "Account for purchased intangible assets and determine amortization periods",
    order: 25,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Assets", "Intangibles", "Amortization"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Unlike internally developed intangibles (usually expensed), PURCHASED intangibles are capitalized at cost. Understanding which intangibles have definite vs. indefinite lives determines whether you amortize or test for impairment. This distinction is heavily tested!"
        },
        {
          title: 'Acquired vs. Internally Developed',
          type: 'text',
          content: "**The fundamental distinction:**\n\n**PURCHASED (Acquired) Intangibles:**\n• Capitalize at fair value (business combination) or cost (direct purchase)\n• Meets recognition criteria—third party valued it!\n\n**INTERNALLY DEVELOPED Intangibles:**\n• Generally EXPENSE as incurred\n• Too uncertain to capitalize (R&D, advertising, brands)\n\n**Exception:** Software development after technological feasibility"
        },
        {
          title: 'Recognition in Business Combinations',
          type: 'text',
          content: "**In an acquisition (ASC 805):**\n\nIdentifiable intangibles recognized separately from goodwill if:\n\n**1. Contractual-legal criterion:**\n• Arises from contractual or legal rights\n• Examples: Patents, licenses, franchise agreements\n\n**OR**\n\n**2. Separability criterion:**\n• Can be separated and sold, transferred, licensed\n• Examples: Customer lists, trade names"
        },
        {
          title: 'Common Acquired Intangibles',
          type: 'table',
          headers: ['Intangible', 'Typical Life', 'Amortize?'],
          rows: [
            ['Patents', 'Shorter of legal (20 yrs) or economic life', 'YES'],
            ['Copyrights', 'Creator life + 70 years (usually economic life shorter)', 'YES'],
            ['Trademarks', 'Indefinite (renewable)', 'NO'],
            ['Customer lists', 'Estimated relationship period', 'YES'],
            ['Franchise rights', 'Depends on contract terms', 'Definite: YES'],
            ['Non-compete agreements', 'Agreement period', 'YES'],
            ['Technology/Software', 'Economic useful life', 'YES']
          ]
        },
        {
          title: 'Definite vs. Indefinite Life',
          type: 'text',
          content: "**Definite Life:**\n• Finite useful life\n• AMORTIZE over useful life\n• Test for impairment when indicators present\n\n**Indefinite Life:**\n• No foreseeable limit on cash-generating period\n• Do NOT amortize\n• Test for impairment at least ANNUALLY\n\n**Reassess each period:** Indefinite → Definite requires prospective amortization"
        },
        {
          title: '🧠 Memory Aid: Definite or Indefinite?',
          type: 'callout',
          content: "**\"Does it expire?\"**\n\n**DEFINITE (expires):**\n• Patents → 20 years\n• Non-competes → Agreement term\n• Customer relationships → Estimated period\n\n**INDEFINITE (renewable/perpetual):**\n• Trademarks → Renewable indefinitely\n• Broadcast licenses → Renewable by law\n• Goodwill → No expiration\n\n**Legal life ≠ Useful life.** Use shorter!"
        },
        {
          title: 'Amortization Methods',
          type: 'text',
          content: "**Method should reflect pattern of benefit consumption:**\n\n**Straight-line:** Most common; use when pattern uncertain\n\n**Accelerated:** When benefits decrease over time (rare for intangibles)\n\n**Revenue-based:** May be used if reliably measurable (e.g., some licenses)\n\n**Residual value:** Usually zero for intangibles (no resale market)\n\n**Period:** Shorter of legal life or estimated useful life"
        },
        {
          title: 'Amortization Example',
          type: 'example',
          content: "**Acquire patent for $500,000:**\n• Legal life remaining: 15 years\n• Estimated useful life: 10 years\n• Use shorter: 10 years\n\n**Annual amortization (straight-line):**\n$500,000 ÷ 10 = $50,000/year\n\n**Entry:**\nDr Amortization Expense         $50,000\n    Cr Accumulated Amortization       $50,000\n\n**Or, some companies credit the intangible directly:**\nDr Amortization Expense         $50,000\n    Cr Patent                          $50,000"
        },
        {
          title: 'Legal Costs for Intangibles',
          type: 'text',
          content: "**Costs to obtain/defend intangibles:**\n\n**Registration/legal costs to OBTAIN:**\n• CAPITALIZE as part of intangible cost\n• Patent filing fees, trademark registration\n\n**Legal costs to DEFEND (successful):**\n• CAPITALIZE if intangible successfully defended\n• Adds to carrying value; adjust amortization\n\n**Legal costs to DEFEND (unsuccessful):**\n• EXPENSE—intangible may be impaired too!"
        },
        {
          title: 'Changes in Useful Life',
          type: 'text',
          content: "**If estimated useful life changes:**\n\n**Prospective treatment:**\n• Revise remaining amortization period\n• No restatement of prior periods\n• Use current carrying value over new remaining life\n\n**Example:**\nPatent with $400,000 remaining value; originally 8 years remaining\nRevised estimate: 5 years remaining\nNew annual amortization: $400,000 ÷ 5 = $80,000"
        },
        {
          title: '⚠️ Exam Trap: Renewal Costs',
          type: 'warning',
          content: "**Costs to RENEW an intangible:**\n\n**If renewal is expected (indefinite life):**\n• Expense renewal costs as incurred\n• Intangible continues at existing carrying value\n\n**If renewal extends useful life:**\n• May capitalize if it genuinely extends benefits\n• Rare—usually expense\n\n**Trademark renewal fees:** Typically expensed because life was already indefinite"
        },
        {
          title: 'Impairment of Definite-Life Intangibles',
          type: 'text',
          content: "**Same two-step test as long-lived assets:**\n\n**Step 1: Recoverability Test**\nCarrying value > Undiscounted future cash flows?\n• If yes → Asset is impaired, go to Step 2\n• If no → No impairment\n\n**Step 2: Measurement**\nImpairment loss = Carrying value − Fair value\n\n**Test when indicators present (not annually)**"
        },
        {
          title: 'Impairment of Indefinite-Life Intangibles',
          type: 'text',
          content: "**Different test (no recoverability step):**\n\n**Compare fair value to carrying value:**\n• FV < CV → Impairment loss = CV − FV\n• FV ≥ CV → No impairment\n\n**Test at least ANNUALLY (can test more frequently)**\n\n**Optional qualitative assessment first:**\n• Is it more likely than not that FV < CV?\n• If no → Skip quantitative test"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Purchased intangibles: Capitalize; Internally developed: Generally expense",
            "Definite life: Amortize over useful life (shorter of legal or economic)",
            "Indefinite life: No amortization; test for impairment at least annually",
            "Legal costs to defend: Capitalize if successful; expense if unsuccessful",
            "Changes in useful life: Apply prospectively (no restatement)",
            "Impairment: Two-step for definite life; FV vs. CV for indefinite life"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-021',
    section: 'FAR',
    title: "Goodwill Impairment Testing",
    description: "Apply the simplified goodwill impairment test under ASC 350",
    order: 26,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Assets", "Intangibles", "Goodwill", "Impairment"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Goodwill represents the premium paid in acquisitions—often billions of dollars for large companies. Unlike other assets, goodwill is NOT amortized under GAAP; instead, it's tested for impairment annually. When impairment occurs, it can devastate reported earnings. This is a frequently tested advanced topic!"
        },
        {
          title: 'What is Goodwill?',
          type: 'text',
          content: "**Definition:**\nGoodwill = Purchase Price − Fair Value of Identifiable Net Assets\n\n**Arises only from business combinations (acquisitions)**\n\n**Represents:**\n• Synergies expected from the combination\n• Value of assembled workforce\n• Future cash flows beyond identifiable assets\n• Premium paid for control\n\n**Cannot recognize internally generated goodwill!**"
        },
        {
          title: 'Goodwill vs. Other Intangibles',
          type: 'table',
          headers: ['Characteristic', 'Goodwill', 'Other Intangibles'],
          rows: [
            ['Source', 'Business combinations only', 'Acquired or developed'],
            ['Amortization', 'NEVER (indefinite life)', 'Depends on life (definite/indefinite)'],
            ['Impairment test', 'At least ANNUALLY', 'When indicators present (definite life)'],
            ['Level of test', 'Reporting unit', 'Asset or asset group'],
            ['Reversal allowed', 'NO', 'NO (GAAP)']
          ]
        },
        {
          title: 'What is a Reporting Unit?',
          type: 'text',
          content: "**Goodwill is tested at the REPORTING UNIT level**\n\n**Reporting unit:** An operating segment or one level below\n\n**Characteristics:**\n• Has discrete financial information available\n• Segment management regularly reviews results\n• Represents the level at which goodwill is monitored\n\n**Example:** A company with three operating segments may have each segment as a reporting unit, or further subdivided if discrete financial info exists"
        },
        {
          title: 'Impairment Testing: When?',
          type: 'text',
          content: "**Required testing:**\n\n**1. ANNUAL test:**\n• At least once per year\n• Same time each year (consistency)\n• Can be any date (doesn't have to be year-end)\n\n**2. INTERIM test when indicators present:**\n• Significant adverse change in business climate\n• Decline in stock price (if public)\n• Adverse legal or regulatory action\n• Loss of key personnel\n• More-likely-than-not that reporting unit will be sold"
        },
        {
          title: 'The Simplified Impairment Test',
          type: 'text',
          content: "**One-step approach (ASC 350 as amended):**\n\n**Compare:** Fair Value of Reporting Unit vs. Carrying Amount (including goodwill)\n\n**If FV < Carrying Amount:**\nImpairment Loss = Carrying Amount − Fair Value\n\n**But:** Loss limited to the amount of goodwill\n(Can't impair other assets through this test)\n\n**If FV ≥ Carrying Amount:**\nNo impairment—goodwill is fine!"
        },
        {
          title: '🧠 Memory Aid: Goodwill Impairment',
          type: 'callout',
          content: "**\"Fair Value Floor\"**\n\n**Step 1:** Is FV of reporting unit < Carrying value?\n• NO → Stop, no impairment\n• YES → Impairment exists\n\n**Step 2:** Impairment = CV − FV (but max = goodwill balance)\n\n**Think of it as:** \"The reporting unit can't be worth less than its fair value. If carrying value exceeds FV, goodwill takes the hit.\""
        },
        {
          title: 'Impairment Example',
          type: 'example',
          content: "**Reporting Unit X:**\n• Carrying amount (including $80,000 goodwill): $500,000\n• Fair value of reporting unit: $450,000\n\n**Step 1: Is there impairment?**\nFV ($450,000) < CV ($500,000) → YES\n\n**Step 2: Measure impairment**\nPotential loss: $500,000 − $450,000 = $50,000\nGoodwill balance: $80,000\nImpairment loss: $50,000 (less than goodwill, so record full amount)\n\n**Entry:**\nDr Goodwill Impairment Loss     $50,000\n    Cr Goodwill                       $50,000\n\n**New goodwill balance: $30,000**"
        },
        {
          title: 'Impairment Limited to Goodwill',
          type: 'example',
          content: "**Reporting Unit Y:**\n• Carrying amount: $300,000 (including $40,000 goodwill)\n• Fair value: $200,000\n\n**Calculated impairment:**\n$300,000 − $200,000 = $100,000\n\n**But goodwill is only $40,000!**\n\n**Record only $40,000 impairment (limited to goodwill)**\n\nDr Goodwill Impairment Loss     $40,000\n    Cr Goodwill                       $40,000\n\n**The remaining $60,000 excess is NOT recorded.** Test other long-lived assets separately if indicators exist."
        },
        {
          title: 'Optional Qualitative Assessment',
          type: 'text',
          content: "**\"Step Zero\" — Qualitative Assessment (optional):**\n\nBefore performing quantitative test, assess whether it's **more likely than not** (>50%) that FV < CV.\n\n**Consider factors:**\n• Macroeconomic conditions\n• Industry and market conditions\n• Cost factors (labor, materials)\n• Overall financial performance\n• Entity-specific events\n• Stock price (if publicly traded)\n\n**If \"not more likely than not\" → Skip quantitative test**"
        },
        {
          title: '⚠️ Exam Trap: No Reversal!',
          type: 'warning',
          content: "**Once goodwill is impaired, it's GONE!**\n\n• Even if fair value later increases\n• Even if business conditions improve\n• You CANNOT write goodwill back up\n\n**IFRS difference:** Same rule—no reversal for goodwill impairment under IFRS either!\n\n**This differs from long-lived assets held for sale, where impairment can be reversed.**"
        },
        {
          title: 'Private Company Alternative',
          type: 'text',
          content: "**ASC 350-20-35: Accounting alternative for private companies**\n\n**Option 1: Amortize goodwill**\n• Straight-line over 10 years (or less if shorter life)\n• Reduces annual impairment testing burden\n\n**Option 2: Simplified impairment**\n• Test at entity level (not reporting unit)\n• Triggering events only (not annual)\n\n**Election is irrevocable; must apply to all goodwill**"
        },
        {
          title: 'Determining Fair Value of Reporting Unit',
          type: 'text',
          content: "**Common valuation approaches:**\n\n**1. Income Approach:**\n• Discounted cash flow (DCF) model\n• Most common method\n\n**2. Market Approach:**\n• Comparable company multiples\n• Comparable transactions\n\n**3. Asset Approach:**\n• Fair value of net assets\n• Less common for going concerns\n\n**Often use multiple methods and weight results**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Goodwill arises only from business combinations (can't internally generate)",
            "Goodwill is NOT amortized; test for impairment at least annually",
            "Test at reporting unit level: Compare FV to carrying amount",
            "Impairment = Carrying amount − Fair value (limited to goodwill balance)",
            "Once impaired, goodwill CANNOT be restored (no reversal under GAAP or IFRS)",
            "Private companies may elect to amortize goodwill over ≤10 years"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-022',
    section: 'FAR',
    title: "Accounts Payable & Accrued Liabilities",
    description: "Recognize and measure current trade and accrued liabilities",
    order: 27,
    duration: 35,
    difficulty: 'intermediate',
    topics: ["Liabilities", "Current Liabilities", "Accruals"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Current liabilities affect working capital, the current ratio, and cash flow timing. Understanding proper cutoff for payables and when to accrue expenses is essential for accurate financial statements. These concepts underpin many exam questions on adjusting entries and liability recognition."
        },
        {
          title: 'What are Current Liabilities?',
          type: 'text',
          content: "**Definition:** Obligations expected to be settled within:\n• One year, OR\n• The normal operating cycle (if longer)\n\n**Characteristics:**\n• Require current assets or creation of other current liabilities to settle\n• Due within near-term\n\n**Examples:**\n• Accounts payable\n• Accrued expenses\n• Short-term notes payable\n• Current portion of long-term debt\n• Unearned revenue"
        },
        {
          title: 'Accounts Payable',
          type: 'text',
          content: "**Definition:** Obligations to pay for goods or services received on credit.\n\n**Recognition:** When goods/services are received (regardless of invoice receipt)\n\n**Measurement:** Face amount (no discounting for short-term)\n\n**Key timing issue:** Proper CUTOFF at period-end\n• Include goods received by period-end (even if invoice not received)\n• Exclude goods not yet received (even if invoice received)"
        },
        {
          title: 'Trade Payables Cutoff',
          type: 'example',
          content: "**Year-end: December 31**\n\n**Scenario A:** Goods shipped FOB Shipping Point Dec 28, arrived Jan 2\n→ Include in payables and inventory (title passed Dec 28)\n\n**Scenario B:** Goods shipped FOB Destination Dec 28, arrived Jan 2\n→ Exclude from payables and inventory (title passes on arrival)\n\n**Scenario C:** Invoice received Dec 30, goods arrive Jan 5\n→ Exclude—no liability until goods received\n\n**Key:** FOB terms determine when title transfers!"
        },
        {
          title: '🧠 Memory Aid: FOB Terms',
          type: 'callout',
          content: "**FOB = Free On Board**\n\n**FOB Shipping Point:**\n• Title transfers when goods LEAVE seller's dock\n• Buyer owns goods in transit\n• Buyer records inventory/payable at shipment\n\n**FOB Destination:**\n• Title transfers when goods ARRIVE at buyer's dock\n• Seller owns goods in transit\n• Buyer records inventory/payable at arrival\n\n**\"Shipping point = Shipped, it's yours!\"**"
        },
        {
          title: 'Accrued Liabilities',
          type: 'text',
          content: "**Definition:** Expenses incurred but not yet paid or invoiced.\n\n**Recognition:** When expense is incurred (matching principle)\n\n**Common accrued liabilities:**\n• Wages/salaries payable\n• Interest payable\n• Utilities payable\n• Property taxes payable\n• Rent payable\n• Professional fees payable"
        },
        {
          title: 'Accrued Wages Example',
          type: 'example',
          content: "**Facts:**\n• Weekly payroll: $70,000 (Mon-Fri)\n• Pay date: Friday\n• Year-end: Wednesday, December 31\n\n**Accrual calculation:**\n3 days worked (Mon, Tue, Wed) × ($70,000 ÷ 5 days) = $42,000\n\n**December 31 adjusting entry:**\nDr Wages Expense              $42,000\n    Cr Wages Payable               $42,000\n\n**January 2 (pay date):**\nDr Wages Payable              $42,000\nDr Wages Expense              $28,000\n    Cr Cash                         $70,000"
        },
        {
          title: 'Accrued Interest',
          type: 'text',
          content: "**Recognize interest expense as time passes:**\n\n**Formula:**\nInterest = Principal × Rate × Time\n\n**Example:**\n$100,000 note at 6% annual rate; year-end 3 months after issuance\n\nInterest = $100,000 × 6% × 3/12 = $1,500\n\n**Entry:**\nDr Interest Expense           $1,500\n    Cr Interest Payable            $1,500"
        },
        {
          title: 'Property Taxes',
          type: 'text',
          content: "**Accrue property taxes over the lien period:**\n\n**Lien date:** Date tax liability attaches to property\n\n**Methods:**\n\n**1. Accrue monthly over fiscal year:**\nTotal tax ÷ 12 = Monthly expense\n\n**2. Accrue over calendar year:**\nAllocate based on months of ownership\n\n**Key:** Match expense to period property is used!"
        },
        {
          title: '⚠️ Exam Trap: Deposits & Prepayments',
          type: 'warning',
          content: "**Refundable deposits received are LIABILITIES!**\n\n**Examples:**\n• Customer deposits on orders\n• Security deposits (renter)\n• Bottle deposits\n\n**Entry when received:**\nDr Cash                       $XXX\n    Cr Customer Deposits (liability)  $XXX\n\n**NOT revenue until earned!**\n\nDon't confuse deposits received (liability) with deposits paid (asset)."
        },
        {
          title: 'Dividends Payable',
          type: 'text',
          content: "**Record liability when dividends are DECLARED:**\n\n**Declaration date (liability created):**\nDr Retained Earnings         $XXX\n    Cr Dividends Payable          $XXX\n\n**Record date:**\nNo entry—just determines who gets dividend\n\n**Payment date (liability settled):**\nDr Dividends Payable         $XXX\n    Cr Cash                        $XXX\n\n**Undeclared dividends: NO liability (even if expected)**"
        },
        {
          title: 'Common Accrual Adjustments',
          type: 'table',
          headers: ['Item', 'Debit', 'Credit'],
          rows: [
            ['Wages earned, not paid', 'Wages Expense', 'Wages Payable'],
            ['Interest incurred, not paid', 'Interest Expense', 'Interest Payable'],
            ['Utilities used, not billed', 'Utilities Expense', 'Utilities Payable'],
            ['Property taxes incurred', 'Property Tax Expense', 'Property Tax Payable'],
            ['Services received, not billed', 'Professional Fees Expense', 'Accrued Liabilities']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Current liabilities due within one year or operating cycle",
            "Record A/P when goods received, regardless of invoice timing",
            "FOB Shipping Point: title at shipment; FOB Destination: title at arrival",
            "Accrue expenses when incurred, even if not yet billed or paid",
            "Interest accrual: Principal × Rate × Time elapsed",
            "Refundable deposits received are liabilities, not revenue"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-023',
    section: 'FAR',
    title: "Asset Retirement Obligations",
    description: "Account for legal obligations to dismantle or restore long-lived assets",
    order: 28,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Liabilities", "ARO", "Environmental"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-C-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When a company buys an oil rig, builds a nuclear plant, or signs a lease requiring restoration, there's often a legal obligation to eventually dismantle or clean up. ARO accounting requires recognizing this future cost TODAY at present value. It's a complex topic that combines liability recognition, asset capitalization, and interest accretion."
        },
        {
          title: 'What is an ARO?',
          type: 'text',
          content: "**Asset Retirement Obligation (ARO):**\n\nA legal obligation to perform retirement activities when a long-lived asset is:\n• Dismantled\n• Removed\n• Remediated (environmental cleanup)\n• Restored to original condition\n\n**Must be a LEGAL obligation:**\n• Laws, regulations, contracts\n• Promissory estoppel\n• NOT just company policy or intent"
        },
        {
          title: 'Common ARO Examples',
          type: 'list',
          content: [
            { term: "Oil & gas wells", definition: "Legal requirement to plug wells and restore land" },
            { term: "Nuclear power plants", definition: "Decommissioning and waste disposal requirements" },
            { term: "Mining operations", definition: "Land reclamation and environmental restoration" },
            { term: "Leasehold improvements", definition: "Lease requires removal at end of term" },
            { term: "Underground storage tanks", definition: "Environmental regulations require removal" },
            { term: "Telecommunication towers", definition: "Contract requires dismantling" }
          ]
        },
        {
          title: 'Initial Recognition',
          type: 'text',
          content: "**When ARO is incurred:**\n\n1. **Record liability** at fair value (present value of future cost)\n2. **Increase asset cost** by the same amount\n\n**Fair value = Present Value of expected future cash flows**\n\n**Entry:**\nDr Asset (capitalized ARO cost)    $XXX\n    Cr Asset Retirement Obligation      $XXX"
        },
        {
          title: '🧠 Memory Aid: ARO Recording',
          type: 'callout',
          content: "**\"Capitalize the liability\"**\n\n**Day 1:** Both sides of entry are equal (PV of retirement cost)\n\n**Over time:**\n• **Liability grows** (accretion expense) → Interest-like\n• **Asset depreciates** → Depreciation expense\n\n**At retirement:**\n• Liability = Actual retirement cost (approximately)\n• Asset fully depreciated"
        },
        {
          title: 'ARO Calculation Example',
          type: 'example',
          content: "**Company purchases oil well on Jan 1, Year 1:**\n• Equipment cost: $1,000,000\n• Estimated retirement cost in 10 years: $150,000\n• Credit-adjusted risk-free rate: 6%\n\n**PV of ARO:**\n$150,000 × (1/1.06)^10 = $150,000 × 0.5584 = $83,760\n\n**Initial Entry:**\nDr Oil Well Equipment         $1,083,760\n    Cr Cash                        $1,000,000\n    Cr Asset Retirement Obligation     $83,760\n\n**The $83,760 ARO cost is capitalized as part of the asset!**"
        },
        {
          title: 'Subsequent Measurement: Accretion',
          type: 'text',
          content: "**Each period, the liability grows (accretion):**\n\n**Accretion Expense = Beginning ARO Balance × Original Rate**\n\n**Entry:**\nDr Accretion Expense          $XXX\n    Cr Asset Retirement Obligation     $XXX\n\n**Think of it as:** \"Interest\" on the liability\n\n**Year 1 from example:**\n$83,760 × 6% = $5,026 accretion expense"
        },
        {
          title: 'Subsequent Measurement: Depreciation',
          type: 'text',
          content: "**The capitalized ARO cost is depreciated:**\n\n**Depreciate with the related asset** (same method and life)\n\n**From example:**\nTotal asset cost: $1,083,760\nUseful life: 10 years\nAnnual depreciation: $108,376\n\n**Entry:**\nDr Depreciation Expense       $108,376\n    Cr Accumulated Depreciation      $108,376"
        },
        {
          title: 'Year-by-Year Example',
          type: 'table',
          headers: ['Year', 'Beginning ARO', 'Accretion (6%)', 'Ending ARO'],
          rows: [
            ['1', '$83,760', '$5,026', '$88,786'],
            ['2', '$88,786', '$5,327', '$94,113'],
            ['3', '$94,113', '$5,647', '$99,760'],
            ['...', '...', '...', '...'],
            ['10', '$141,509', '$8,491', '$150,000']
          ]
        },
        {
          title: 'Settlement of ARO',
          type: 'text',
          content: "**When retirement activities are performed:**\n\n**If actual cost = liability:**\nDr Asset Retirement Obligation   $150,000\n    Cr Cash                           $150,000\n\n**If actual cost ≠ liability (common):**\n\n**Actual < Liability → Gain**\nDr ARO                        $150,000\n    Cr Cash                        $140,000\n    Cr Gain on ARO Settlement       $10,000\n\n**Actual > Liability → Loss**\nDr ARO                        $150,000\nDr Loss on ARO Settlement      $15,000\n    Cr Cash                        $165,000"
        },
        {
          title: 'Changes in Estimates',
          type: 'text',
          content: "**When estimated costs or timing change:**\n\n**Upward revision (cost increase):**\n• Use CURRENT credit-adjusted risk-free rate\n• Increase liability and asset\n\n**Downward revision (cost decrease):**\n• Use ORIGINAL rate when layer was recorded\n• Decrease liability and asset (but not below zero)\n\n**Changes in timing:**\n• Treated as change in estimate\n• Adjust PV calculations accordingly"
        },
        {
          title: '⚠️ Exam Trap: Rate Selection',
          type: 'warning',
          content: "**Which rate to use?**\n\n**Original ARO and accretion:** Original credit-adjusted risk-free rate\n\n**Upward revisions:** Current rate at time of revision\n\n**Downward revisions:** Original rate for that layer\n\n**Why the difference?** Upward revisions are like new obligations; downward revisions are removing old obligations."
        },
        {
          title: 'Conditional AROs',
          type: 'text',
          content: "**What if timing or method is uncertain?**\n\n**Conditional ARO:** Obligation exists, but timing/method uncertain\n\n**Recognition:**\n• Still recognize at fair value if reasonable estimate possible\n• Use expected value (probability-weighted) approach\n• Uncertainty reflected in fair value, not recognition\n\n**Example:** Asbestos removal—obligation exists, but timing depends on renovation plans"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ARO = legal obligation to retire, dismantle, or restore a long-lived asset",
            "Initial: Record liability at PV; capitalize same amount to asset",
            "Accretion: Liability grows each period (like interest expense)",
            "Depreciation: Capitalized ARO cost depreciated with related asset",
            "Settlement gains/losses when actual cost differs from liability",
            "Rate selection: Original rate for accretion; current rate for upward revisions"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-024',
    section: 'FAR',
    title: "Notes Payable & Interest",
    description: "Account for short-term and long-term notes payable with interest calculations",
    order: 29,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Liabilities", "Notes Payable", "Interest"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Notes payable represent formal debt obligations with specified interest rates and terms. Understanding how to record notes, calculate interest expense, and handle zero-interest or below-market notes is essential for proper liability measurement and income statement presentation."
        },
        {
          title: 'Notes Payable Overview',
          type: 'text',
          content: "**Definition:** Written promise to pay a specified amount with interest at a stated date.\n\n**Key features:**\n• Formal written agreement\n• Specified principal amount\n• Stated or implied interest rate\n• Defined maturity date\n\n**Classification:**\n• **Current:** Due within one year\n• **Non-current:** Due beyond one year"
        },
        {
          title: 'Interest-Bearing Notes',
          type: 'text',
          content: "**Note with STATED interest rate:**\n\n**Issuance (borrowing cash):**\nDr Cash                       $XXX\n    Cr Notes Payable               $XXX\n\n**Interest accrual (period-end):**\nDr Interest Expense           $XXX\n    Cr Interest Payable            $XXX\n\n**Payment at maturity:**\nDr Notes Payable              $XXX\nDr Interest Payable           $XXX\n    Cr Cash                        $XXX"
        },
        {
          title: 'Interest Calculation',
          type: 'text',
          content: "**Simple Interest Formula:**\nInterest = Principal × Rate × Time\n\n**Time conventions:**\n• **Exact days:** Actual days ÷ 365 (or 360)\n• **Months:** Number of months ÷ 12\n\n**Example:**\n$100,000 note at 6% for 3 months:\nInterest = $100,000 × 6% × 3/12 = $1,500"
        },
        {
          title: 'Note Issued for Cash Example',
          type: 'example',
          content: "**Oct 1: Borrow $50,000, 8%, 6-month note**\n\n**Oct 1 - Issuance:**\nDr Cash                       $50,000\n    Cr Notes Payable               $50,000\n\n**Dec 31 - Accrue interest (3 months):**\nInterest = $50,000 × 8% × 3/12 = $1,000\nDr Interest Expense            $1,000\n    Cr Interest Payable             $1,000\n\n**April 1 - Maturity (pay principal + 6 months interest):**\nTotal interest = $50,000 × 8% × 6/12 = $2,000\nDr Notes Payable              $50,000\nDr Interest Payable            $1,000\nDr Interest Expense            $1,000\n    Cr Cash                        $52,000"
        },
        {
          title: 'Non-Interest-Bearing Notes',
          type: 'text',
          content: "**\"Zero-interest\" note—interest is implicit:**\n\n**Face value includes hidden interest!**\n\n**Issued at present value:**\nNote Payable recorded at **PV** (not face value)\n\n**Discount = Face Value − Present Value**\n\n**Over note term:**\nAmortize discount to interest expense"
        },
        {
          title: '🧠 Memory Aid: Zero-Interest Notes',
          type: 'callout',
          content: "**\"Nothing is free!\"**\n\nA \"zero-interest\" note doesn't mean no interest—the interest is EMBEDDED in the face amount.\n\n**You receive LESS than face value**\n(or pay less for an asset than stated price)\n\n**The difference IS interest, recognized over time.**"
        },
        {
          title: 'Non-Interest-Bearing Note Example',
          type: 'example',
          content: "**Borrow cash; sign $10,000 non-interest note due in 2 years**\n**Market rate: 6%**\n\n**Present value:**\n$10,000 × (1/1.06)² = $10,000 × 0.8900 = $8,900\n\n**Issuance:**\nDr Cash                        $8,900\nDr Discount on N/P             $1,100\n    Cr Notes Payable               $10,000\n\n**Year 1 Interest:**\n$8,900 × 6% = $534\nDr Interest Expense              $534\n    Cr Discount on N/P                $534\n\n**Carrying value end of Year 1: $8,900 + $534 = $9,434**"
        },
        {
          title: 'Note Issued for Non-Cash Consideration',
          type: 'text',
          content: "**If note issued to acquire asset:**\n\n**Determine appropriate value:**\n1. Fair value of asset received, OR\n2. Fair value of note (PV at market rate)\n\n**Use more clearly determinable value**\n\n**Any difference between note face and recorded value:**\n→ Discount or premium on note payable"
        },
        {
          title: 'Below-Market Note Example',
          type: 'example',
          content: "**Purchase equipment with $50,000, 2%, 3-year note**\n**Equipment FMV: $45,000; Market rate: 8%**\n\n**Record at equipment FMV:**\nDr Equipment                  $45,000\nDr Discount on N/P             $5,000\n    Cr Notes Payable               $50,000\n\n**Imputed interest:**\nThe $5,000 discount represents additional interest to be recognized over 3 years.\n\n**Effective interest rate will be HIGHER than stated 2%.**"
        },
        {
          title: '⚠️ Exam Trap: Imputing Interest',
          type: 'warning',
          content: "**When to impute interest (ASC 835-30):**\n\nRequired for notes with:\n• No stated rate, OR\n• Unreasonable stated rate\n\n**Use:**\n• Rate borrower could obtain elsewhere, OR\n• Rate that discounts note to FV of consideration\n\n**Exceptions (no imputation):**\n• Normal trade payables (< 1 year)\n• Security deposits\n• Transactions with related parties (disclose)"
        },
        {
          title: 'Current Portion of Long-Term Debt',
          type: 'text',
          content: "**Each period, reclassify portion due within one year:**\n\n**Example:** 5-year note with $20,000 annual principal payments\n\n**At each year-end:**\nDr Notes Payable (long-term)   $20,000\n    Cr Current Portion of L-T Debt   $20,000\n\n**Balance sheet shows:**\n• Current Liabilities: $20,000\n• Long-term Liabilities: Remaining balance"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Interest-bearing notes: Record at face; accrue interest as time passes",
            "Non-interest-bearing notes: Record at PV; amortize discount to interest",
            "Interest formula: Principal × Rate × Time",
            "Note for non-cash: Use fair value of asset or fair value of note",
            "Impute interest when stated rate is unreasonable or absent",
            "Reclassify current portion of long-term debt each period"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-025',
    section: 'FAR',
    title: "Bonds Payable: Issuance, Premium, Discount",
    description: "Account for bond issuance at par, premium, and discount with effective interest method",
    order: 30,
    duration: 65,
    difficulty: 'intermediate',
    topics: ["Liabilities", "Bonds", "Long-term Debt"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Bonds are a major source of corporate financing, and bond accounting is HEAVILY tested on FAR. You must master the effective interest method, understand why bonds sell at premiums or discounts, and know how to calculate interest expense vs. cash paid. This is a must-know topic!"
        },
        {
          title: 'Bond Basics',
          type: 'text',
          content: "**Key terms:**\n\n• **Face (Par) Value:** Principal amount due at maturity\n• **Stated (Coupon) Rate:** Interest rate printed on bond; determines CASH paid\n• **Market (Effective) Rate:** Current market rate; determines PRICE\n• **Maturity Date:** When principal is repaid\n\n**Bond pricing rule:**\n• Stated Rate > Market Rate → **Premium** (sell above par)\n• Stated Rate < Market Rate → **Discount** (sell below par)\n• Stated Rate = Market Rate → **At Par**"
        },
        {
          title: '🧠 Memory Aid: Premium vs. Discount',
          type: 'callout',
          content: "**\"Investors pay MORE for MORE interest\"**\n\n**Premium:** Stated rate > Market rate\n• Bond pays more than market—investors pay extra!\n• Price > Face value\n\n**Discount:** Stated rate < Market rate\n• Bond pays less than market—investors pay less\n• Price < Face value\n\n**Think of investors comparing: Would I rather have this bond or a market-rate bond?**"
        },
        {
          title: 'Bond Price Calculation',
          type: 'text',
          content: "**Bond price = PV of future cash flows at MARKET rate:**\n\n**Price = PV of Interest Payments + PV of Principal**\n\nPV of Interest = Payment × PV of Annuity factor\nPV of Principal = Face × PV of Single Sum factor\n\n**Use MARKET rate to discount!**"
        },
        {
          title: 'Issuance at Par',
          type: 'example',
          content: "**Issue $100,000, 5-year bonds at par (stated = market = 6%):**\n\n**Price:** $100,000 (no premium or discount)\n\n**Issuance Entry:**\nDr Cash                      $100,000\n    Cr Bonds Payable              $100,000\n\n**Interest payment (annually):**\nCash = $100,000 × 6% = $6,000\n\nDr Interest Expense           $6,000\n    Cr Cash                        $6,000"
        },
        {
          title: 'Issuance at Discount',
          type: 'example',
          content: "**Issue $100,000, 5-year bonds; Stated 5%, Market 6%:**\n\n**Price (given or calculated):** $95,788\n**Discount:** $100,000 − $95,788 = $4,212\n\n**Issuance Entry:**\nDr Cash                       $95,788\nDr Discount on Bonds Payable   $4,212\n    Cr Bonds Payable              $100,000\n\n**Or (net presentation):**\nDr Cash                       $95,788\n    Cr Bonds Payable               $95,788\n\n**Carrying value at issuance: $95,788**"
        },
        {
          title: 'Issuance at Premium',
          type: 'example',
          content: "**Issue $100,000, 5-year bonds; Stated 7%, Market 6%:**\n\n**Price (given or calculated):** $104,212\n**Premium:** $104,212 − $100,000 = $4,212\n\n**Issuance Entry:**\nDr Cash                      $104,212\n    Cr Bonds Payable              $100,000\n    Cr Premium on Bonds Payable     $4,212\n\n**Or (net presentation):**\nDr Cash                      $104,212\n    Cr Bonds Payable              $104,212\n\n**Carrying value at issuance: $104,212**"
        },
        {
          title: 'Effective Interest Method',
          type: 'text',
          content: "**Required method under GAAP:**\n\n**Interest Expense = Carrying Value × Market Rate**\n\n**Cash Paid = Face Value × Stated Rate**\n\n**Amortization = Difference**\n\n• Discount: Expense > Cash → Amortize discount (CV increases)\n• Premium: Expense < Cash → Amortize premium (CV decreases)\n\n**Carrying value approaches face value at maturity!**"
        },
        {
          title: 'Effective Interest: Discount Example',
          type: 'example',
          content: "**$100,000 bonds issued at $95,788 (5% stated, 6% market):**\n\n**Year 1:**\nInterest Expense: $95,788 × 6% = $5,747\nCash Paid: $100,000 × 5% = $5,000\nDiscount Amortization: $747\n\nDr Interest Expense           $5,747\n    Cr Discount on Bonds             $747\n    Cr Cash                        $5,000\n\n**New carrying value: $95,788 + $747 = $96,535**\n\n**Year 2:**\nInterest Expense: $96,535 × 6% = $5,792\n..."
        },
        {
          title: 'Effective Interest: Premium Example',
          type: 'example',
          content: "**$100,000 bonds issued at $104,212 (7% stated, 6% market):**\n\n**Year 1:**\nInterest Expense: $104,212 × 6% = $6,253\nCash Paid: $100,000 × 7% = $7,000\nPremium Amortization: $747\n\nDr Interest Expense           $6,253\nDr Premium on Bonds             $747\n    Cr Cash                        $7,000\n\n**New carrying value: $104,212 − $747 = $103,465**\n\n**Year 2:**\nInterest Expense: $103,465 × 6% = $6,208\n..."
        },
        {
          title: 'Amortization Summary',
          type: 'table',
          headers: ['Item', 'Discount', 'Premium'],
          rows: [
            ['Bond Price', 'Below Par', 'Above Par'],
            ['Carrying Value', 'Increases over time', 'Decreases over time'],
            ['Interest Expense vs Cash', 'Expense > Cash', 'Expense < Cash'],
            ['Amortization Effect', 'Add to CV', 'Subtract from CV'],
            ['At Maturity', 'CV = Face', 'CV = Face']
          ]
        },
        {
          title: 'Bonds Issued Between Interest Dates',
          type: 'text',
          content: "**If bonds issued between payment dates:**\n\n**Buyer pays:**\n• Bond price, PLUS\n• Accrued interest from last payment date\n\n**Why?** Buyer will receive full interest payment on next date, but didn't own bond for entire period.\n\n**Entry:**\nDr Cash (price + accrued)     $XXX\n    Cr Bonds Payable               $XXX\n    Cr Interest Payable (accrued)  $XXX"
        },
        {
          title: '⚠️ Exam Trap: Interest Expense vs. Cash',
          type: 'warning',
          content: "**Don't confuse these!**\n\n**Cash paid** = Face × Stated Rate (always the same each period)\n\n**Interest expense** = Carrying Value × Market Rate (changes each period)\n\n**Income statement:** Interest Expense\n**Cash flow statement:** Cash paid for interest\n\n**They are NOT equal unless issued at par!**"
        },
        {
          title: 'Bond Issuance Costs',
          type: 'text',
          content: "**Legal, underwriting, printing costs:**\n\n**Treatment (ASC 835-30):**\n• Present as direct DEDUCTION from bond liability\n• Like additional discount\n• Amortize over bond term (effective interest method)\n\n**Example:**\nIssue $100,000 bond at par with $3,000 issuance costs:\n\n**Net carrying value: $100,000 − $3,000 = $97,000**\n\nAmortize $3,000 to interest expense over bond term."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Premium: Stated rate > Market rate; Discount: Stated rate < Market rate",
            "Bond price = PV of interest payments + PV of principal (at market rate)",
            "Effective interest method: Expense = Carrying Value × Market Rate",
            "Cash paid: Face Value × Stated Rate (constant each period)",
            "Discount: CV increases over time; Premium: CV decreases over time",
            "Issuance costs: Deduct from liability, amortize over term"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-026',
    section: 'FAR',
    title: "Debt Modifications & Extinguishments",
    description: "Account for early debt retirement, troubled debt restructuring, and modifications",
    order: 31,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Liabilities", "Bonds", "Debt Extinguishment"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Companies often retire debt early, modify loan terms, or restructure troubled debt. Each scenario has different accounting rules. The exam tests your ability to calculate gains/losses on extinguishment, determine if a modification is a new debt or continuation, and handle troubled debt restructuring."
        },
        {
          title: 'Debt Extinguishment Overview',
          type: 'text',
          content: "**When is debt extinguished?**\n\n• Debt is PAID (principal and interest)\n• Debtor is legally RELEASED from obligation\n• Defeasance (in-substance, limited)\n\n**Gain/Loss = Carrying Value − Reacquisition Price**\n\n**Carrying value:** Face ± unamortized premium/discount − issuance costs\n\n**Reacquisition price:** Cash paid or FV of consideration given"
        },
        {
          title: 'Early Retirement for Cash',
          type: 'example',
          content: "**Bonds retired before maturity:**\n\n• Face value: $100,000\n• Unamortized discount: $3,000\n• Unamortized issuance costs: $1,500\n• Cash paid to retire: $98,000\n\n**Carrying value:** $100,000 − $3,000 − $1,500 = $95,500\n**Reacquisition price:** $98,000\n**Loss on extinguishment:** $98,000 − $95,500 = $2,500\n\n**Entry:**\nDr Bonds Payable              $100,000\nDr Loss on Extinguishment       $2,500\n    Cr Discount on Bonds            $3,000\n    Cr Debt Issuance Costs          $1,500\n    Cr Cash                         $98,000"
        },
        {
          title: 'Gain on Extinguishment',
          type: 'example',
          content: "**Retiring bonds at discount:**\n\n• Face value: $500,000\n• Carrying value: $485,000 (unamortized discount $15,000)\n• Call price: $470,000\n\n**Gain:** $485,000 − $470,000 = $15,000\n\n**Entry:**\nDr Bonds Payable              $500,000\n    Cr Discount on Bonds           $15,000\n    Cr Cash                        $470,000\n    Cr Gain on Extinguishment       $15,000\n\n**Gain or loss goes on INCOME STATEMENT (usually below operating income)**"
        },
        {
          title: '🧠 Memory Aid: G/L on Extinguishment',
          type: 'callout',
          content: "**\"Pay More = Loss; Pay Less = Gain\"**\n\nIf you pay MORE than carrying value → **LOSS**\n(You overpaid to get rid of debt)\n\nIf you pay LESS than carrying value → **GAIN**\n(You got a discount to eliminate debt)\n\n**Formula:**\nCarrying Value − Cash Paid = Gain (+) or Loss (−)"
        },
        {
          title: 'Debt Modification: TDR or Not?',
          type: 'text',
          content: "**First, determine if this is Troubled Debt Restructuring (TDR):**\n\n**TDR exists when:**\n1. Debtor is experiencing financial difficulties, AND\n2. Creditor grants a concession it wouldn't otherwise consider\n\n**If NOT TDR:**\nAnalyze as debt modification or extinguishment based on 10% test.\n\n**If TDR:**\nSpecial rules apply (covered below)."
        },
        {
          title: 'The 10% Test for Modifications',
          type: 'text',
          content: "**For non-TDR modifications:**\n\n**Calculate PV of cash flows under new terms vs. old terms (using original rate):**\n\n**If difference > 10%:**\n• Treat as EXTINGUISHMENT of old debt\n• Record new debt at fair value\n• Recognize gain/loss immediately\n\n**If difference ≤ 10%:**\n• Treat as MODIFICATION (not extinguishment)\n• No gain/loss\n• Adjust effective rate prospectively\n• Expense new fees"
        },
        {
          title: 'Modification Example: < 10%',
          type: 'example',
          content: "**Old debt: $1,000,000 at 8%, 5 years remaining**\n**New terms: $1,000,000 at 7%, 5 years (PV difference < 10%)**\n\n**Accounting (modification):**\n• Continue carrying old debt\n• Calculate new effective rate to equate PV of new cash flows with carrying value\n• Recognize interest expense using new effective rate\n• Expense any fees paid to creditor\n\n**No gain/loss recognized!**"
        },
        {
          title: 'Modification Example: > 10%',
          type: 'example',
          content: "**Old debt: $1,000,000 at 8%, carrying value $980,000**\n**New terms: $800,000 at 10% (PV difference > 10%)**\n**New debt FV: $800,000**\n\n**Accounting (extinguishment):**\n• Derecognize old debt at carrying value\n• Record new debt at fair value\n• Gain = $980,000 − $800,000 = $180,000\n\n**Entry:**\nDr Bonds Payable (old)        $1,000,000\n    Cr Discount (old)              $20,000\n    Cr Bonds Payable (new)        $800,000\n    Cr Gain on Extinguishment     $180,000"
        },
        {
          title: 'Troubled Debt Restructuring (TDR)',
          type: 'text',
          content: "**TDR occurs when creditor grants concession due to debtor's financial difficulty.**\n\n**Common concessions:**\n• Reduction in principal amount\n• Reduction in interest rate\n• Extension of maturity date\n• Transfer of assets or equity to creditor\n\n**Two types of TDR:**\n1. Settlement (transfer assets/equity)\n2. Continuation with modified terms"
        },
        {
          title: 'TDR: Settlement with Assets',
          type: 'text',
          content: "**Debtor transfers assets to settle debt:**\n\n**Debtor recognizes TWO gains/losses:**\n\n1. **Asset disposition G/L:**\nFV of asset − Book value of asset\n\n2. **Debt restructuring gain:**\nCarrying value of debt − FV of asset transferred\n\n**Example:**\nDebt: $500,000; Land (cost $300,000, FV $400,000)\n\nGain on land: $400,000 − $300,000 = $100,000\nGain on restructuring: $500,000 − $400,000 = $100,000"
        },
        {
          title: 'TDR: Continuation with Modified Terms',
          type: 'text',
          content: "**If total future cash flows ≥ carrying amount:**\n• No gain recognized at restructuring\n• New effective rate calculated\n• Apply over remaining term\n\n**If total future cash flows < carrying amount:**\n• Recognize gain = Carrying amount − PV of new cash flows\n• New carrying amount = Total future cash flows\n• All cash payments reduce principal (no interest expense)"
        },
        {
          title: '⚠️ Exam Trap: TDR vs. Standard Modification',
          type: 'warning',
          content: "**Don't confuse TDR with normal modifications!**\n\n**TDR requires BOTH:**\n• Debtor in financial difficulty\n• Creditor grants concession\n\n**If either element is missing:**\n• Use standard 10% test for modifications\n• Different accounting treatment\n\n**TDR rules are more favorable to debtor (may defer gain recognition)**"
        },
        {
          title: 'In-Substance Defeasance',
          type: 'text',
          content: "**Placing assets in trust to service debt:**\n\n**True defeasance (legal release):**\n• Debt is extinguished\n• Recognize gain/loss\n\n**In-substance defeasance (no legal release):**\n• Under current GAAP, debt is generally NOT extinguished\n• Still report liability\n• Exception: Very limited circumstances\n\n**Key:** Without legal release, you're still liable!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Extinguishment G/L = Carrying Value − Reacquisition Price",
            "Gain/loss on extinguishment reported in income statement",
            "10% test: > 10% PV difference = extinguishment; ≤ 10% = modification",
            "TDR requires debtor difficulty AND creditor concession",
            "TDR settlement: Two gains possible (asset disposition + restructuring)",
            "Without legal release, debt is NOT extinguished"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-027',
    section: 'FAR',
    title: "Stock Issuances: Common & Preferred",
    description: "Account for stock issuances for cash and noncash consideration",
    order: 32,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Equity", "Stock", "Contributed Capital"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Equity transactions don't affect the income statement (except for compensation), but they're critical to understanding the balance sheet. You must know how to record stock issuances, distinguish par from no-par stock, and properly allocate proceeds when stock is issued with other securities."
        },
        {
          title: 'Components of Stockholders Equity',
          type: 'text',
          content: "**Stockholders' Equity consists of:**\n\n**Contributed Capital:**\n• Common stock (par or stated value)\n• Preferred stock (par or stated value)\n• Additional Paid-In Capital (APIC)\n• Treasury stock (contra)\n\n**Earned Capital:**\n• Retained earnings\n\n**Other:**\n• Accumulated Other Comprehensive Income (AOCI)"
        },
        {
          title: 'Par vs. No-Par Stock',
          type: 'text',
          content: "**Par Value Stock:**\n• Arbitrary minimum legal value per share\n• Record at par → Common/Preferred Stock\n• Excess over par → Additional Paid-In Capital\n\n**No-Par Stock:**\n• No minimum legal value\n• May have stated value (treated like par)\n• If no stated value, entire proceeds → Common Stock\n\n**Note:** Par value has little economic significance today"
        },
        {
          title: 'Issuance for Cash: Par Value Stock',
          type: 'example',
          content: "**Issue 10,000 shares, $1 par, at $25 per share:**\n\n**Total proceeds:** 10,000 × $25 = $250,000\n**Par value:** 10,000 × $1 = $10,000\n**Excess (APIC):** $250,000 − $10,000 = $240,000\n\n**Entry:**\nDr Cash                       $250,000\n    Cr Common Stock                $10,000\n    Cr APIC - Common              $240,000"
        },
        {
          title: 'Issuance for Cash: No-Par Stock',
          type: 'example',
          content: "**Issue 10,000 shares, no par, at $25 per share:**\n\n**Option 1 (no stated value):**\nDr Cash                       $250,000\n    Cr Common Stock               $250,000\n\n**Option 2 (stated value of $5):**\nDr Cash                       $250,000\n    Cr Common Stock (stated)       $50,000\n    Cr APIC - Common              $200,000"
        },
        {
          title: '🧠 Memory Aid: Stock Issuance Entry',
          type: 'callout',
          content: "**\"Cash in, Equity out\"**\n\n**Always ask:**\n1. What did we receive? → Debit (Cash or asset)\n2. What's the par/stated value? → Credit to Stock account\n3. What's the excess? → Credit to APIC\n\n**Par value × Shares = Stock account**\n**Everything else = APIC**"
        },
        {
          title: 'Issuance for Noncash Consideration',
          type: 'text',
          content: "**Stock issued for services, property, etc.:**\n\n**Record at:**\n• Fair value of stock issued, OR\n• Fair value of consideration received\n• **Use whichever is more clearly determinable**\n\n**Entry (stock for land):**\nDr Land (at FV)               $XXX,XXX\n    Cr Common Stock                $X,XXX\n    Cr APIC - Common              $XX,XXX"
        },
        {
          title: 'Preferred Stock: Features',
          type: 'list',
          content: [
            { term: "Cumulative", definition: "Unpaid dividends accumulate and must be paid before common dividends" },
            { term: "Non-cumulative", definition: "Skipped dividends are lost forever" },
            { term: "Participating", definition: "Shares in additional dividends beyond stated rate" },
            { term: "Convertible", definition: "Can be exchanged for common stock at holder's option" },
            { term: "Callable", definition: "Issuer can repurchase at specified price" },
            { term: "Redeemable", definition: "Holder can require repurchase (may be liability!)" }
          ]
        },
        {
          title: 'Preferred Stock Issuance',
          type: 'example',
          content: "**Issue 5,000 shares of $100 par preferred at $105:**\n\n**Entry:**\nDr Cash                       $525,000\n    Cr Preferred Stock            $500,000\n    Cr APIC - Preferred            $25,000\n\n**Note:** Par value is often higher for preferred stock and may reflect liquidation preference."
        },
        {
          title: 'Lump-Sum Stock Issuance',
          type: 'text',
          content: "**When common and preferred sold together for single price:**\n\n**Allocation methods:**\n\n**1. Proportional method (both FVs known):**\nAllocate based on relative fair values\n\n**2. Incremental method (only one FV known):**\nAllocate known FV first, residual to other security\n\n**Use proportional if both FVs determinable!**"
        },
        {
          title: 'Lump-Sum Example',
          type: 'example',
          content: "**Issue 1,000 common (FV $50) and 500 preferred (FV $100) for $100,000:**\n\n**Proportional allocation:**\nCommon FV: 1,000 × $50 = $50,000\nPreferred FV: 500 × $100 = $50,000\nTotal FV: $100,000\n\nCommon: $100,000 × ($50,000/$100,000) = $50,000\nPreferred: $100,000 × ($50,000/$100,000) = $50,000\n\n**If only common FV known ($50):**\nCommon: 1,000 × $50 = $50,000\nPreferred (residual): $100,000 − $50,000 = $50,000"
        },
        {
          title: '⚠️ Exam Trap: Redeemable Preferred Stock',
          type: 'warning',
          content: "**If preferred stock is MANDATORILY redeemable:**\n• Classify as LIABILITY (not equity!)\n• Dividends are interest expense\n\n**SEC Rule:** Redeemable preferred at holder's option is reported OUTSIDE of stockholders' equity (\"mezzanine\")\n\n**Key:** Redemption feature at holder's option means company may have to pay cash—that's a liability characteristic!"
        },
        {
          title: 'Stock Issuance Costs',
          type: 'text',
          content: "**Direct costs of issuing stock (underwriter fees, legal, etc.):**\n\n**Treatment:** Reduce APIC (not expensed!)\n\n**Entry:**\nDr APIC - Common              $XXX\n    Cr Cash                        $XXX\n\n**Rationale:** These are costs of a capital transaction, not operating expenses.\n\n**Note:** Different from debt issuance costs (reduce liability, amortize)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Par value × shares = Stock account; excess = APIC",
            "No-par stock: All proceeds to stock (or stated value + APIC if stated value)",
            "Noncash issuance: Use more clearly determinable fair value",
            "Lump-sum: Proportional if both FVs known; incremental if only one known",
            "Mandatorily redeemable preferred = LIABILITY, not equity",
            "Stock issuance costs reduce APIC, not expensed"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-028',
    section: 'FAR',
    title: "Treasury Stock: Cost & Par Value Methods",
    description: "Account for stock repurchases and reissuances under both methods",
    order: 33,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Equity", "Treasury Stock"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When a company buys back its own stock, it becomes treasury stock—a contra-equity account. Understanding the two methods (cost and par value) and how to account for reissuance at different prices is essential. This is a frequently tested equity topic!"
        },
        {
          title: 'What is Treasury Stock?',
          type: 'text',
          content: "**Definition:** A corporation's own stock that has been issued and subsequently reacquired.\n\n**Characteristics:**\n• NOT an asset (can't own yourself!)\n• Contra-equity account (reduces total equity)\n• No voting rights\n• No dividends\n• Reduces shares outstanding (not shares authorized or issued)\n\n**Reasons to repurchase:**\n• Return cash to shareholders\n• Support stock price\n• Acquire shares for employee plans\n• Reduce shares outstanding for EPS improvement"
        },
        {
          title: 'Two Accounting Methods',
          type: 'table',
          headers: ['Aspect', 'Cost Method', 'Par Value Method'],
          rows: [
            ['Record at', 'Cost (price paid)', 'Par value'],
            ['APIC impact', 'None at acquisition', 'Remove original APIC'],
            ['Presentation', 'Single contra line', 'Reduces specific accounts'],
            ['Popularity', 'More common', 'Less common'],
            ['Exam focus', 'Heavy', 'Moderate']
          ]
        },
        {
          title: 'Cost Method: Acquisition',
          type: 'example',
          content: "**Repurchase 1,000 shares at $30 per share:**\n\n**Entry:**\nDr Treasury Stock             $30,000\n    Cr Cash                        $30,000\n\n**Balance sheet:** Treasury stock shown as contra-equity at $30,000\n\n**Simple!** Just record at what you paid."
        },
        {
          title: 'Cost Method: Reissuance Above Cost',
          type: 'example',
          content: "**Reissue 500 treasury shares (cost $30) at $35:**\n\n**Proceeds:** 500 × $35 = $17,500\n**Cost:** 500 × $30 = $15,000\n**Excess:** $2,500\n\n**Entry:**\nDr Cash                       $17,500\n    Cr Treasury Stock             $15,000\n    Cr APIC - Treasury Stock       $2,500\n\n**The excess goes to APIC (never gain on equity transactions!)**"
        },
        {
          title: 'Cost Method: Reissuance Below Cost',
          type: 'example',
          content: "**Reissue 500 treasury shares (cost $30) at $25:**\n\n**Proceeds:** 500 × $25 = $12,500\n**Cost:** 500 × $30 = $15,000\n**Deficiency:** $2,500\n\n**Entry:**\nDr Cash                       $12,500\nDr APIC - Treasury Stock       $2,500*\n    Cr Treasury Stock             $15,000\n\n*If no APIC from treasury exists, debit Retained Earnings\n\n**Never report loss on equity transactions!**"
        },
        {
          title: '🧠 Memory Aid: Cost Method Reissuance',
          type: 'callout',
          content: "**\"APIC absorbs, RE takes the hit\"**\n\n**Reissue ABOVE cost:**\n→ Credit APIC - Treasury Stock (excess)\n\n**Reissue BELOW cost:**\n→ First reduce APIC - Treasury Stock (if any)\n→ Then reduce Retained Earnings (if needed)\n\n**Never recognize gain or loss in income!**"
        },
        {
          title: 'Cost Method: Retirement',
          type: 'text',
          content: "**When treasury stock is formally retired:**\n\n**Entry removes:**\n• Treasury stock at cost\n• Original par value issued\n• Pro rata APIC from original issuance\n\n**If cost > original issue price:**\n• Debit APIC, then Retained Earnings\n\n**If cost < original issue price:**\n• Credit APIC - Treasury Stock (or retirement)"
        },
        {
          title: 'Par Value Method: Acquisition',
          type: 'example',
          content: "**Repurchase 1,000 shares ($1 par, originally issued at $20) at $30:**\n\n**Entry:**\nDr Treasury Stock ($1 par)     $1,000\nDr APIC - Common              $19,000\nDr Retained Earnings          $10,000*\n    Cr Cash                        $30,000\n\n*Excess of cost over original issue price\n\n**Par value method \"undoes\" the original issuance**"
        },
        {
          title: 'Par Value Method: Reissuance',
          type: 'text',
          content: "**Under par value method, treasury stock is at par, so:**\n\n**Reissuance treated like NEW issuance!**\n\n**Reissue at $35 (1,000 shares, $1 par):**\nDr Cash                       $35,000\n    Cr Common Stock                $1,000\n    Cr APIC - Common              $34,000\n\n**Par value method: Reissuance = New issuance entry**"
        },
        {
          title: 'Comparison: Methods Side by Side',
          type: 'example',
          content: "**Original issue: 1,000 shares, $1 par, at $20**\n**Repurchase at $30:**\n\n**Cost Method:**\nDr Treasury Stock             $30,000\n    Cr Cash                        $30,000\n\n**Par Value Method:**\nDr Treasury Stock              $1,000\nDr APIC - Common              $19,000\nDr Retained Earnings          $10,000\n    Cr Cash                        $30,000"
        },
        {
          title: '⚠️ Exam Trap: No Income Effect!',
          type: 'warning',
          content: "**Treasury stock transactions NEVER affect income!**\n\n**There is NO:**\n• Gain on sale of treasury stock\n• Loss on sale of treasury stock\n\n**All effects are within equity:**\n• APIC - Treasury Stock\n• Retained Earnings (if APIC exhausted)\n\n**Why?** You can't profit from trading with yourself!"
        },
        {
          title: 'Donated Treasury Stock',
          type: 'text',
          content: "**If shareholders donate stock back:**\n\n**No cost was paid, so:**\n• Treasury stock recorded at fair value\n• Credit goes to APIC - Donated Capital\n\n**Entry:**\nDr Treasury Stock (at FV)      $XXX\n    Cr APIC - Donated Capital        $XXX\n\n**When reissued, apply normal cost method rules with FV as \"cost\"**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Treasury stock is contra-equity, not an asset",
            "Cost method: Record at purchase price; most common",
            "Reissuance above cost: Credit APIC - Treasury Stock",
            "Reissuance below cost: Debit APIC - TS first, then Retained Earnings",
            "Par value method: Record at par, remove original APIC; reissue like new issuance",
            "NEVER recognize gain or loss on treasury transactions—all within equity"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-029',
    section: 'FAR',
    title: "Dividends: Cash, Property, Stock, Liquidating",
    description: "Account for all types of dividends and their effects on equity",
    order: 34,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Equity", "Dividends"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Dividends are distributions to shareholders and reduce equity. Each type of dividend has different accounting—cash dividends reduce retained earnings and create a liability, property dividends require fair value remeasurement, and stock dividends move amounts within equity without changing total equity. Know the differences!"
        },
        {
          title: 'Dividend Key Dates',
          type: 'text',
          content: "**Three important dates:**\n\n**1. Declaration Date:**\n• Board declares dividend\n• Liability created (for cash/property)\n• Debit Retained Earnings\n\n**2. Record Date:**\n• Determines who receives dividend\n• No journal entry!\n\n**3. Payment Date:**\n• Dividend distributed\n• Liability settled"
        },
        {
          title: 'Cash Dividends',
          type: 'example',
          content: "**Board declares $1.00 per share dividend; 100,000 shares outstanding:**\n\n**Declaration Date:**\nDr Retained Earnings         $100,000\n    Cr Dividends Payable          $100,000\n\n**Record Date:**\nNo entry\n\n**Payment Date:**\nDr Dividends Payable         $100,000\n    Cr Cash                       $100,000"
        },
        {
          title: 'Property Dividends',
          type: 'text',
          content: "**Dividend paid in assets other than cash (inventory, investments, etc.):**\n\n**Step 1: Revalue property to FAIR VALUE**\nRecognize gain or loss at declaration date!\n\n**Step 2: Record dividend at fair value**\nDebit Retained Earnings, Credit Liability\n\n**Step 3: Distribute property**\nSettle liability"
        },
        {
          title: 'Property Dividend Example',
          type: 'example',
          content: "**Declare dividend of investment securities:**\n• Book value: $80,000\n• Fair value: $100,000\n\n**Declaration Date:**\nStep 1 - Revalue:\nDr Investment                 $20,000\n    Cr Gain on Investment          $20,000\n\nStep 2 - Declare:\nDr Retained Earnings         $100,000\n    Cr Property Dividends Payable $100,000\n\n**Payment Date:**\nDr Property Dividends Payable $100,000\n    Cr Investment                 $100,000"
        },
        {
          title: '🧠 Memory Aid: Property Dividend Steps',
          type: 'callout',
          content: "**\"Fair Value First, Then Declare\"**\n\n1. **Remeasure** property to FV (recognize G/L)\n2. **Declare** dividend at FV (RE ↓, Liability ↑)\n3. **Pay** with property (Liability ↓, Asset ↓)\n\n**The gain/loss on revaluation DOES hit income!**\n(Unlike treasury stock transactions)"
        },
        {
          title: 'Stock Dividends: Overview',
          type: 'text',
          content: "**Distribution of additional shares to existing shareholders:**\n\n**Key characteristics:**\n• No assets distributed\n• Total equity UNCHANGED\n• Transfers from Retained Earnings to Contributed Capital\n• Shareholders' proportional ownership unchanged\n\n**Two categories:**\n• Small stock dividend (< 20-25%): Fair value\n• Large stock dividend (≥ 20-25%): Par value"
        },
        {
          title: 'Small Stock Dividend (< 20-25%)',
          type: 'example',
          content: "**Declare 10% stock dividend; 100,000 shares outstanding:**\n**Par: $1; FMV: $30**\n\n**New shares:** 100,000 × 10% = 10,000 shares\n\n**Entry at declaration:**\nDr Retained Earnings (10,000 × $30)  $300,000\n    Cr Common Stock Distributable        $10,000\n    Cr APIC - Common                     $290,000\n\n**At distribution:**\nDr Common Stock Distributable  $10,000\n    Cr Common Stock                $10,000"
        },
        {
          title: 'Large Stock Dividend (≥ 20-25%)',
          type: 'example',
          content: "**Declare 50% stock dividend; 100,000 shares outstanding:**\n**Par: $1; FMV: $30**\n\n**New shares:** 100,000 × 50% = 50,000 shares\n\n**Entry at declaration (use PAR, not FMV):**\nDr Retained Earnings (50,000 × $1)  $50,000\n    Cr Common Stock Distributable       $50,000\n\n**At distribution:**\nDr Common Stock Distributable  $50,000\n    Cr Common Stock                $50,000\n\n**No APIC for large stock dividends!**"
        },
        {
          title: 'Stock Splits',
          type: 'text',
          content: "**Increase shares by reducing par value:**\n\n**2-for-1 split:**\n• Shares double\n• Par value halves\n• Total equity unchanged\n\n**Entry:** Usually NO journal entry (memo only)\n\nBefore: 100,000 shares × $2 par = $200,000\nAfter: 200,000 shares × $1 par = $200,000\n\n**Reverse split:** Opposite effect (e.g., 1-for-5)"
        },
        {
          title: 'Stock Dividend vs. Stock Split',
          type: 'table',
          headers: ['Feature', 'Stock Dividend', 'Stock Split'],
          rows: [
            ['Par value per share', 'Unchanged', 'Reduced proportionally'],
            ['Total par value', 'Increases', 'Unchanged'],
            ['Retained Earnings', 'Decreases', 'Unchanged'],
            ['Journal entry', 'Required', 'Usually memo only'],
            ['Shares outstanding', 'Increases', 'Increases']
          ]
        },
        {
          title: 'Liquidating Dividends',
          type: 'text',
          content: "**Return of CAPITAL (not earnings):**\n\n**Characteristics:**\n• Reduces contributed capital, not retained earnings\n• Occurs when:\n  - Company winding down\n  - Dividends exceed retained earnings\n  - Intentional return of capital\n\n**Entry:**\nDr APIC - Common (or other capital) $XXX\n    Cr Dividends Payable               $XXX\n\n**Disclose liquidating nature to shareholders!**"
        },
        {
          title: '⚠️ Exam Trap: Cumulative Preferred Dividends',
          type: 'warning',
          content: "**Dividends in arrears on cumulative preferred:**\n\n• NOT a liability until declared!\n• Do NOT record until board declares\n• Disclose in notes to financial statements\n\n**But:** Must be paid before common dividends\n\n**Example:** 2 years of dividends in arrears = footnote disclosure only (until declared)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Declaration creates liability; record date = no entry; payment settles liability",
            "Property dividends: Remeasure to FV (recognize G/L), then declare at FV",
            "Small stock dividend (< 20-25%): Use fair value; Large (≥ 20-25%): Use par",
            "Stock dividends transfer RE to contributed capital; total equity unchanged",
            "Stock splits: No entry usually; par value changes; total equity unchanged",
            "Cumulative dividends in arrears: Disclose but no liability until declared"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-II-030',
    section: 'FAR',
    title: "Stock Compensation: Options, RSUs, ESPPs",
    description: "Account for share-based payments to employees under ASC 718",
    order: 35,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Equity", "Stock Compensation", "ASC 718"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Stock compensation is how companies pay employees with equity instead of cash. Under ASC 718, the fair value of equity awards must be recognized as compensation expense over the service period. This is complex and heavily tested—you need to understand options, RSUs, and the accounting for modifications and forfeitures."
        },
        {
          title: 'Stock Compensation Basics',
          type: 'text',
          content: "**ASC 718 core principle:**\nRecognize compensation expense based on **grant-date fair value** of equity instruments over the **requisite service period**.\n\n**Key concepts:**\n• **Grant date:** Date award is approved and terms set\n• **Service period:** Period employee must work to earn award (usually vesting period)\n• **Fair value:** Measured at grant date; not remeasured (for equity awards)"
        },
        {
          title: 'Types of Stock Compensation',
          type: 'list',
          content: [
            { term: "Stock Options", definition: "Right to buy stock at fixed price (exercise price) after vesting" },
            { term: "Restricted Stock", definition: "Actual shares granted but subject to forfeiture until vested" },
            { term: "Restricted Stock Units (RSUs)", definition: "Promise to deliver shares upon vesting (no shares until vested)" },
            { term: "Stock Appreciation Rights (SARs)", definition: "Right to receive cash or stock equal to appreciation" },
            { term: "ESPP", definition: "Employee Stock Purchase Plan—buy stock at discount" }
          ]
        },
        {
          title: 'Stock Options: Accounting',
          type: 'text',
          content: "**At grant date:**\n• Determine fair value (usually Black-Scholes or binomial model)\n• No entry on grant date\n\n**Over service period:**\n• Recognize compensation expense ratably\n• Credit APIC - Stock Options\n\n**At exercise:**\n• Cash received (exercise price × shares)\n• Remove APIC - Stock Options\n• Issue stock (credit Common Stock + APIC)"
        },
        {
          title: 'Stock Option Example',
          type: 'example',
          content: "**Grant: 1,000 options, exercise price $50, FV $10 each**\n**Vesting: 4 years (cliff)**\n\n**Total compensation:** 1,000 × $10 = $10,000\n**Annual expense:** $10,000 ÷ 4 = $2,500\n\n**Each year (Years 1-4):**\nDr Compensation Expense        $2,500\n    Cr APIC - Stock Options        $2,500\n\n**At exercise (all 1,000 options; par $1):**\nDr Cash (1,000 × $50)         $50,000\nDr APIC - Stock Options       $10,000\n    Cr Common Stock                $1,000\n    Cr APIC - Common              $59,000"
        },
        {
          title: '🧠 Memory Aid: Option Accounting',
          type: 'callout',
          content: "**\"Grant = Value it; Vest = Expense it; Exercise = Cash it\"**\n\n**Grant date:** Measure fair value (no entry)\n**Vesting period:** Recognize expense (Dr Expense, Cr APIC)\n**Exercise:** Cash in, APIC out, issue stock\n\n**Key:** Fair value is FIXED at grant date—don't remeasure!"
        },
        {
          title: 'Restricted Stock Units (RSUs)',
          type: 'text',
          content: "**RSUs = Promise to deliver shares when vested**\n\n**Key difference from options:**\n• No exercise price (employee pays nothing)\n• Fair value = stock price at grant date\n• Full value delivered at vesting\n\n**Accounting similar to options:**\n• Expense over service period\n• At vesting, issue shares (debit APIC, credit Stock + APIC)"
        },
        {
          title: 'RSU Example',
          type: 'example',
          content: "**Grant: 1,000 RSUs, stock price $30, 3-year vesting**\n\n**Total compensation:** 1,000 × $30 = $30,000\n**Annual expense:** $30,000 ÷ 3 = $10,000\n\n**Each year:**\nDr Compensation Expense       $10,000\n    Cr APIC - RSUs                $10,000\n\n**At vesting (shares issued; par $1):**\nDr APIC - RSUs                $30,000\n    Cr Common Stock                $1,000\n    Cr APIC - Common              $29,000"
        },
        {
          title: 'Forfeitures',
          type: 'text',
          content: "**When employee leaves before vesting:**\n\n**ASC 718 options:**\n\n**Option 1: Estimate forfeitures at grant**\n• Reduce compensation expense by expected forfeitures\n• True-up when actual forfeitures known\n\n**Option 2: Recognize forfeitures when they occur**\n• Simpler—recognize full expense, then reverse if forfeited\n\n**Either method is acceptable (policy election)**"
        },
        {
          title: 'Forfeiture Example',
          type: 'example',
          content: "**100 options granted, $10 FV, 3-year vest**\n**Year 2: Employee leaves (not vested)**\n\n**Year 1 entry:**\nDr Compensation Expense        $333\n    Cr APIC - Stock Options         $333\n\n**Year 2 - Forfeiture reversal:**\nDr APIC - Stock Options        $333\n    Cr Compensation Expense         $333\n\n**Net effect: No compensation recognized (award not earned)**"
        },
        {
          title: 'Modifications',
          type: 'text',
          content: "**If terms of award are modified:**\n\n**Calculate incremental value:**\nFV of modified award − FV of original award (both at modification date)\n\n**Treatment:**\n• Continue recognizing original compensation\n• PLUS recognize incremental value\n• Over remaining service period\n\n**If modification is improbable to vest → equity to liability**"
        },
        {
          title: '⚠️ Exam Trap: Performance Conditions',
          type: 'warning',
          content: "**Two types of performance conditions:**\n\n**Service condition (e.g., stay 4 years):**\n• Included in determining service period\n• Expense recognized if probable\n\n**Market condition (e.g., stock price reaches $100):**\n• Included in FAIR VALUE at grant\n• Recognized regardless of whether condition is met\n\n**Key:** Market conditions affect FV measurement; service conditions affect whether expense is recognized."
        },
        {
          title: 'ESPP (Employee Stock Purchase Plans)',
          type: 'text',
          content: "**Plan allowing employees to buy stock at discount:**\n\n**Compensatory if:**\n• Discount > 5%, OR\n• Not available to all employees, OR\n• Other favorable terms\n\n**Compensatory plans:**\n• Recognize compensation expense\n• Like other stock compensation\n\n**Non-compensatory plans (meet safe harbor):**\n• No compensation expense"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Measure fair value at GRANT DATE; expense over SERVICE PERIOD",
            "Stock options: FV determined by option pricing model (Black-Scholes)",
            "RSUs: FV = stock price at grant (no exercise price)",
            "At exercise/vesting: Cash (if any) + APIC - Options → Stock + APIC",
            "Forfeitures: Either estimate upfront or recognize when they occur",
            "Market conditions affect FV; service conditions affect recognition"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-001',
    section: 'FAR',
    title: "ASC 606: Five-Step Revenue Model",
    description: "Master the comprehensive framework for recognizing revenue from contracts with customers under ASC 606",
    order: 36,
    duration: 75,
    difficulty: 'advanced',
    topics: ["Revenue Recognition", "ASC 606", "Contracts"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "ASC 606 is one of the MOST HEAVILY TESTED topics on FAR! This single standard governs virtually all revenue recognition (except leases, insurance, and financial instruments). The five-step model is the foundation—master this and you'll handle any revenue question the exam throws at you."
        },
        {
          title: 'The Five Steps: The Complete Framework',
          type: 'text',
          content: "**ASC 606 Core Principle:** Recognize revenue to depict the transfer of promised goods or services to customers in an amount that reflects the consideration the entity expects to receive.\n\n**The Five Steps (memorize this order!):**\n\n**Step 1:** Identify the contract(s) with a customer\n**Step 2:** Identify the performance obligations in the contract\n**Step 3:** Determine the transaction price\n**Step 4:** Allocate the transaction price to performance obligations\n**Step 5:** Recognize revenue when (or as) performance obligations are satisfied"
        },
        {
          title: '🧠 Memory Aid: Five Steps',
          type: 'callout',
          content: "**\"I I D A R\"** or **\"I Identify Dollars And Recognize\"**\n\n1. **I**dentify the contract\n2. **I**dentify performance obligations\n3. **D**etermine transaction price\n4. **A**llocate price to obligations\n5. **R**ecognize revenue when satisfied\n\n**Think: \"Before I can recognize revenue, I need to know what contract, what promises, how much money, how to split it, and when I've delivered.\""
        },
        {
          title: 'Step 1: Identify the Contract',
          type: 'text',
          content: "**A contract exists when ALL five criteria are met:**\n\n1. **Approval and commitment** – Parties have approved and are committed\n2. **Rights identified** – Each party's rights regarding goods/services can be identified\n3. **Payment terms identified** – Payment terms can be identified\n4. **Commercial substance** – The contract has commercial substance\n5. **Collectibility probable** – Collection of consideration is probable\n\n**If criteria NOT met:** Don't recognize revenue until met OR cash received (and nonrefundable)"
        },
        {
          title: 'Contract Criteria Mnemonic',
          type: 'callout',
          content: "**\"A R P C C\"** – **A**pproval, **R**ights, **P**ayment terms, **C**ommercial substance, **C**ollectibility\n\n**Or remember:** \"Are Really Poor Contracts Collectible?\" (Probably not!)"
        },
        {
          title: 'Step 2: Identify Performance Obligations',
          type: 'text',
          content: "**Performance obligation:** A promise to transfer a distinct good or service (or bundle).\n\n**A good or service is DISTINCT if BOTH:**\n\n1. **Capable of being distinct** – Customer can benefit from it alone or with readily available resources\n2. **Distinct within the contract** – Promise is separately identifiable from other promises\n\n**Series guidance:** Multiple distinct goods/services that are substantially the same with the same pattern of transfer = single performance obligation (e.g., monthly cleaning services)"
        },
        {
          title: 'Distinct vs. Not Distinct',
          type: 'table',
          headers: ['Scenario', 'Distinct?', 'Reason'],
          rows: [
            ['Sell phone + 2-year service', 'Yes (2 POs)', 'Customer can use phone with other carriers'],
            ['Sell custom software + installation', 'Depends', 'If highly interrelated = 1 PO; if standard install = 2 POs'],
            ['Construction contract with materials + labor', 'No (1 PO)', 'Combined output—customer wants building, not separate parts'],
            ['Sell goods + shipping', 'Yes (2 POs)', 'Shipping available from others; separately identifiable'],
            ['Sell equipment + 1-year warranty', 'Depends', 'Assurance warranty = not separate; service warranty = separate PO']
          ]
        },
        {
          title: 'Step 3: Determine Transaction Price',
          type: 'text',
          content: "**Transaction price:** Amount of consideration expected in exchange for goods/services (excludes amounts collected for third parties like sales tax).\n\n**Components to consider:**\n\n• **Fixed consideration** – Stated contract price\n• **Variable consideration** – Discounts, rebates, refunds, bonuses, penalties\n• **Constraining variable consideration** – Only include if highly probable no significant reversal\n• **Significant financing component** – Adjust if > 1 year between payment and transfer\n• **Noncash consideration** – Measure at fair value\n• **Consideration payable to customer** – Reduce transaction price (unless for distinct goods/services)"
        },
        {
          title: 'Step 4: Allocate Transaction Price',
          type: 'text',
          content: "**Allocation basis:** Stand-alone selling prices (SSP)\n\n**Determine SSP using (in order of preference):**\n1. **Observable price** – Price when sold separately\n2. **Adjusted market assessment** – What market would pay\n3. **Expected cost plus margin** – Your costs + reasonable margin\n4. **Residual approach** – Only when SSP highly variable/uncertain\n\n**Allocation formula:**\n\nRevenue for PO = (SSP of PO ÷ Total SSP of all POs) × Transaction Price"
        },
        {
          title: 'Allocation Example',
          type: 'example',
          content: "**TechCo sells a bundle for $900:**\n• Software license (SSP $600)\n• 1-year support (SSP $400)\n• Total SSP: $1,000\n\n**Allocation:**\n\n**Software:** $600 ÷ $1,000 × $900 = **$540**\n**Support:** $400 ÷ $1,000 × $900 = **$360**\n\n**Revenue recognition:**\n• $540 when software delivered (point in time)\n• $360 ratably over 12 months (over time)"
        },
        {
          title: 'Step 5: Recognize Revenue',
          type: 'text',
          content: "**Revenue is recognized when control transfers to customer:**\n\n**Over time** – if ANY of these criteria met:\n1. Customer simultaneously receives and consumes benefits\n2. Entity's performance creates/enhances asset customer controls\n3. Entity's performance creates asset with no alternative use AND entity has enforceable right to payment for performance to date\n\n**Point in time** – if none of the above criteria met\n\n**Point-in-time indicators:**\n• Entity has present right to payment\n• Customer has legal title\n• Physical possession transferred\n• Significant risks and rewards transferred\n• Customer has accepted the asset"
        },
        {
          title: 'Over Time vs Point in Time',
          type: 'table',
          headers: ['Transaction', 'Timing', 'Rationale'],
          rows: [
            ['Cleaning services', 'Over time', 'Customer receives/consumes simultaneously'],
            ['Construction on customer land', 'Over time', 'Asset customer controls being enhanced'],
            ['Custom equipment (no alternative use)', 'Over time', 'No alternative use + right to payment'],
            ['Retail sale', 'Point in time', 'Control transfers at sale'],
            ['Standard equipment shipped FOB destination', 'Point in time', 'Control transfers on delivery'],
            ['License (right to use)', 'Point in time', 'Control of IP at grant date'],
            ['License (right to access)', 'Over time', 'Ongoing access to changing IP']
          ]
        },
        {
          title: '⚠️ Exam Trap: Contract Modifications',
          type: 'warning',
          content: "**Contract modifications can be:**\n\n1. **Separate contract** – If adds distinct goods/services at SSP → account for separately\n\n2. **Termination + new contract** – If remaining goods/services distinct but not at SSP → cumulative catch-up NOT allowed; prospective treatment\n\n3. **Part of original contract** – If remaining goods NOT distinct → cumulative catch-up adjustment\n\n**Exam loves to test modification accounting!**"
        },
        {
          title: 'Bill-and-Hold Arrangements',
          type: 'text',
          content: "**Bill-and-hold:** Customer is billed but seller retains physical possession.\n\n**Revenue recognized when ALL criteria met:**\n1. Reason for arrangement is substantive (customer requested)\n2. Product separately identified as belonging to customer\n3. Product currently ready for transfer\n4. Entity cannot use product or direct it to another customer\n\n**If criteria met:** Recognize revenue; also consider separate storage service PO"
        },
        {
          title: 'Comprehensive Example',
          type: 'example',
          content: "**TechBuild Corp signs a $500,000 contract:**\n• Custom software development ($300,000 SSP)\n• Hardware ($150,000 SSP)\n• 2-year maintenance ($100,000 SSP)\n• Total SSP: $550,000\n\n**Step 1:** Contract criteria met ✓\n**Step 2:** 3 performance obligations identified\n**Step 3:** Transaction price = $500,000\n**Step 4:** Allocate:\n• Software: $300K/$550K × $500K = $272,727\n• Hardware: $150K/$550K × $500K = $136,364\n• Maintenance: $100K/$550K × $500K = $90,909\n\n**Step 5:** Recognize:\n• Software: Over time (no alternative use, right to payment) - % complete\n• Hardware: Point in time (delivery)\n• Maintenance: Over time (ratably over 24 months)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Five steps: Identify contract → Identify POs → Determine price → Allocate → Recognize",
            "Contract requires: Approval, rights, payment terms, commercial substance, collectibility probable",
            "Distinct = capable of being distinct + distinct within contract",
            "Transaction price includes variable consideration (if highly probable no reversal)",
            "Allocate based on relative stand-alone selling prices",
            "Over time if: simultaneous receive/consume, asset enhanced, or no alternative use + right to payment",
            "Point in time: when control transfers (title, possession, risk/rewards, acceptance)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-002',
    section: 'FAR',
    title: "Identifying Performance Obligations",
    description: "Deep dive into determining when promises are distinct performance obligations requiring separate revenue recognition",
    order: 37,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Revenue Recognition", "Performance Obligations", "ASC 606"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Step 2 of ASC 606 is where many candidates struggle. Correctly identifying performance obligations determines HOW MUCH revenue to recognize and WHEN. Get this wrong, and your entire revenue calculation is off. The exam loves to test whether goods/services are distinct!"
        },
        {
          title: 'What is a Performance Obligation?',
          type: 'text',
          content: "**Definition:** A promise in a contract to transfer to the customer either:\n\n1. A good or service (or bundle of goods/services) that is **distinct**, OR\n2. A **series** of distinct goods/services that are substantially the same and have the same pattern of transfer\n\n**Key insight:** One contract can have one or many performance obligations. Each PO is a separate unit of account for revenue recognition."
        },
        {
          title: 'The Two-Part Distinct Test',
          type: 'text',
          content: "**A good or service is distinct if BOTH criteria are met:**\n\n**Criterion 1: Capable of Being Distinct**\nCustomer can benefit from the good or service either:\n• On its own, OR\n• Together with other resources readily available to the customer\n\n**Criterion 2: Distinct Within the Context of the Contract**\nThe promise to transfer is separately identifiable from other promises in the contract.\n\n**Both must be YES for a separate performance obligation!**"
        },
        {
          title: '🧠 Memory Aid: Two-Part Test',
          type: 'callout',
          content: "**\"Can they USE it? Can you SEPARATE it?\"**\n\n**Part 1 (Customer view):** Can the customer get value from this alone or easily combine it?\n**Part 2 (Contract view):** Is this promise separate from other promises, or are they interrelated?\n\n**Think of it as:**\n• Part 1 = Is it useful?\n• Part 2 = Is it separate?"
        },
        {
          title: 'Criterion 1: Capable of Being Distinct',
          type: 'text',
          content: "**Factors indicating capable of being distinct:**\n\n• Entity regularly sells the item separately\n• Customer could resell the item\n• Item has stand-alone functionality\n• Item can be used with readily available resources\n\n**Examples of readily available resources:**\n• Items sold separately by the entity or others\n• Resources customer already has\n\n**NOT capable of being distinct:**\n• Highly specialized component with no use alone\n• Item that requires other goods only available from entity"
        },
        {
          title: 'Criterion 2: Distinct Within the Contract',
          type: 'text',
          content: "**Factors indicating NOT separately identifiable (NOT distinct within contract):**\n\n1. **Significant integration** – Entity uses goods/services as inputs to produce combined output\n2. **Significant modification/customization** – One item significantly modifies/customizes another\n3. **Highly interdependent** – Each item significantly affected by the other(s)\n\n**If any of these exist → goods/services should be combined into single PO**"
        },
        {
          title: 'Decision Framework',
          type: 'table',
          headers: ['Question', 'If Yes', 'If No'],
          rows: [
            ['Can customer benefit alone or with readily available resources?', 'Continue to Part 2', 'NOT distinct - combine'],
            ['Does entity significantly integrate the items?', 'NOT distinct - combine', 'Continue'],
            ['Does one significantly modify/customize another?', 'NOT distinct - combine', 'Continue'],
            ['Are items highly interdependent?', 'NOT distinct - combine', 'DISTINCT - separate PO']
          ]
        },
        {
          title: 'Common Scenarios: Distinct',
          type: 'example',
          content: "**✓ DISTINCT (Separate POs):**\n\n**1. Phone + Wireless Service**\nPhone can work with other carriers → capable of distinct\nService works without their phone → capable of distinct\nNot integrated/interdependent → distinct within contract\n**Result: 2 POs**\n\n**2. Equipment + Extended Warranty**\nEquipment works without warranty → capable of distinct\nWarranty is a service-type warranty → separately identifiable\n**Result: 2 POs**\n\n**3. Software License + Training**\nSoftware functional without training → capable of distinct\nTraining doesn't customize software → distinct within contract\n**Result: 2 POs**"
        },
        {
          title: 'Common Scenarios: Not Distinct',
          type: 'example',
          content: "**✗ NOT DISTINCT (Combine into 1 PO):**\n\n**1. Construction Contract (Materials + Labor)**\nCustomer wants a building, not separate materials\nSignificant integration service provided\n**Result: 1 PO (combined)**\n\n**2. Custom Software + Installation + Testing**\nSoftware highly customized for customer\nInstallation/testing integral to customization\n**Result: 1 PO (combined)**\n\n**3. Consulting + Proprietary Tools**\nTools only work with entity's consulting\nConsulting requires the tools\n**Result: 1 PO (combined)**"
        },
        {
          title: 'Series of Distinct Goods/Services',
          type: 'text',
          content: "**Series guidance:** Multiple distinct goods/services that meet BOTH:\n\n1. **Substantially the same** – Each distinct good/service is substantially similar\n2. **Same pattern of transfer** – Same method to measure progress (single measure)\n\n**If BOTH met → Account as SINGLE performance obligation**\n\n**Examples:**\n• Monthly cleaning services (same service repeated)\n• Daily processing transactions\n• Monthly IT support\n\n**Why?** Simplifies accounting—don't need separate allocation for each instance"
        },
        {
          title: 'Warranties: Assurance vs Service',
          type: 'table',
          headers: ['Type', 'Assurance Warranty', 'Service-Type Warranty'],
          rows: [
            ['Purpose', 'Product meets specifications', 'Additional service beyond assurance'],
            ['Separate PO?', 'NO - accrue liability', 'YES - allocate revenue'],
            ['Coverage', 'Defects existing at sale', 'Future malfunctions/maintenance'],
            ['Recognition', 'Expense when sold', 'Revenue over warranty period'],
            ['Customer option', 'No option to purchase separately', 'Can usually buy separately']
          ]
        },
        {
          title: 'Warranty Example',
          type: 'example',
          content: "**AutoCo sells car for $30,000 with:**\n• 3-year/36,000-mile warranty (standard, cannot be purchased separately)\n• Optional 5-year/60,000-mile extended warranty available for $1,500\n\n**Analysis:**\n\n**Standard warranty:** Assurance-type → NOT a separate PO\n• Covers defects existing at sale\n• Customer cannot purchase separately\n• Accrue warranty liability at sale\n\n**Extended warranty (if purchased):** Service-type → SEPARATE PO\n• Provides service beyond assurance\n• Available for separate purchase\n• Allocate portion of price, recognize over period"
        },
        {
          title: 'Options for Additional Goods/Services',
          type: 'text',
          content: "**Customer options (like renewal options, discounts):**\n\n**Separate PO if option provides MATERIAL RIGHT:**\n• Right customer would not receive without entering contract\n• Significant discount beyond typical discounts\n\n**Examples of material rights:**\n• \"Buy 10, get 1 free\" (if incremental)\n• Significant renewal discount not available to new customers\n• Free maintenance for first year (if normally charged)\n\n**Accounting:** Allocate transaction price to the material right; recognize when option exercised or expires"
        },
        {
          title: '⚠️ Exam Trap: Shipping and Handling',
          type: 'warning',
          content: "**Shipping/handling activities:**\n\n**Policy election available:**\n1. **Separate PO** – Recognize shipping revenue when shipped\n2. **Fulfillment cost** – Not a separate PO; expense as incurred\n\n**Key point:** If shipping occurs AFTER control transfers to customer, shipping is a SEPARATE PO (entity is providing service on customer's goods).\n\n**Exam tip:** Read carefully whether control transfers before or after shipping!"
        },
        {
          title: 'Principal vs Agent Considerations',
          type: 'text',
          content: "**When another party is involved in providing goods/services:**\n\n**Principal:** Controls goods/services BEFORE transfer to customer\n• Recognize revenue GROSS (full amount)\n\n**Agent:** Arranges for another party to provide goods/services\n• Recognize revenue NET (commission only)\n\n**Control indicators for PRINCIPAL:**\n• Primary responsibility for fulfillment\n• Inventory risk (before/after transfer, during shipping, returns)\n• Discretion in establishing price\n\n**This affects WHAT your performance obligation is!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Distinct requires BOTH: capable of being distinct AND distinct within the contract",
            "Capable = customer can benefit alone or with readily available resources",
            "Distinct within contract = NOT significantly integrated, modified, or interdependent",
            "Series of substantially same items with same transfer pattern = 1 PO",
            "Assurance warranty = NOT separate PO; Service warranty = separate PO",
            "Customer option is separate PO only if it provides a MATERIAL RIGHT",
            "Principal (gross) vs Agent (net) affects how you identify your PO"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-003',
    section: 'FAR',
    title: "Variable Consideration & Constraints",
    description: "Master the estimation and constraint of variable consideration including discounts, rebates, refunds, and performance bonuses",
    order: 38,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Revenue Recognition", "Variable Consideration", "ASC 606"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Most real-world contracts include variable elements—discounts, bonuses, penalties, rebates, refunds. Step 3 of ASC 606 requires estimating these AND applying a constraint. Overestimate and you'll have revenue reversals; underestimate and you miss legitimate revenue. The exam tests your ability to estimate AND constrain properly!"
        },
        {
          title: 'What is Variable Consideration?',
          type: 'text',
          content: "**Definition:** Consideration that can vary due to discounts, rebates, refunds, credits, price concessions, incentives, performance bonuses, penalties, or similar items.\n\n**Also variable if contingent on:**\n• Future event occurrence\n• Resolution of uncertainty\n\n**Key principle:** Estimate variable consideration and include in transaction price, but ONLY to the extent it's highly probable that a significant reversal won't occur."
        },
        {
          title: 'Types of Variable Consideration',
          type: 'table',
          headers: ['Type', 'Example', 'Effect on Price'],
          rows: [
            ['Volume discounts', 'Buy 100+ units, get 10% off', 'Reduces price'],
            ['Rebates', 'Mail-in rebate if customer submits form', 'Reduces price'],
            ['Refunds/Returns', 'Right of return within 30 days', 'Reduces price'],
            ['Performance bonuses', 'Bonus if completed early', 'Increases price'],
            ['Penalties', 'Penalty if completed late', 'Reduces price'],
            ['Price concessions', 'Historical pattern of giving discounts', 'Reduces price'],
            ['Royalties', 'Based on licensee sales', 'Varies with performance']
          ]
        },
        {
          title: 'Two Estimation Methods',
          type: 'text',
          content: "**Choose method that better predicts amount entitled to:**\n\n**1. Expected Value Method**\n• Sum of probability-weighted amounts\n• Best when: Large number of contracts with similar characteristics\n• Example: Returns, volume discounts with many customers\n\n**2. Most Likely Amount Method**\n• Single most likely outcome\n• Best when: Only two possible outcomes (binary)\n• Example: Performance bonus (earned or not earned)"
        },
        {
          title: 'Expected Value Example',
          type: 'example',
          content: "**SoftCo sells 1,000 software licenses at $100 each with return rights.**\n\nHistorical return data:\n• 95% probability: 2% returns\n• 5% probability: 10% returns\n\n**Expected Value Calculation:**\n\n(95% × 2% × $100,000) + (5% × 10% × $100,000)\n= $1,900 + $500 = **$2,400 expected returns**\n\n**Transaction price:** $100,000 - $2,400 = **$97,600**\n\n**Entries:**\nDr Accounts Receivable         $100,000\n    Cr Revenue                      $97,600\n    Cr Refund Liability              $2,400\n\nDr Inventory - Returns (at cost)  $1,680*\n    Cr Cost of Goods Sold            $1,680\n\n*Asset for expected returns (at cost)"
        },
        {
          title: 'Most Likely Amount Example',
          type: 'example',
          content: "**BuildCo has construction contract for $1,000,000:**\n• $100,000 bonus if completed by December 31\n• Management assesses 80% probability of on-time completion\n\n**Most Likely Amount Method:**\n\n**Most likely outcome:** Bonus will be earned (80%)\n**Amount:** $100,000\n\n**But wait! Apply the constraint...**\n\nIs it highly probable that including the $100,000 won't result in a significant reversal?\n\n**Consider:**\n• 20% chance of NOT earning bonus\n• $100,000 is significant (10% of contract)\n\n**Conclusion:** May need to constrain (not include) until more certain"
        },
        {
          title: 'The Constraint: Highly Probable Test',
          type: 'text',
          content: "**Variable consideration constraint:**\n\nInclude variable consideration in transaction price ONLY to the extent that it is **highly probable** that a **significant reversal** of cumulative revenue won't occur when uncertainty is resolved.\n\n**Factors increasing risk of reversal (constrain more):**\n• Amount highly susceptible to factors outside entity's influence\n• Uncertainty not expected to resolve for long time\n• Limited experience with similar contracts\n• Practice of offering price concessions or changing payment terms\n• Contract has large number/broad range of possible outcomes"
        },
        {
          title: '🧠 Memory Aid: Constraint Factors',
          type: 'callout',
          content: "**\"S-U-L-L-C\" = Susceptible, Uncertainty, Limited experience, Large range, Concession history**\n\n**The more factors present, the MORE you constrain!**\n\nThink: \"Is this a SULLC situation?\" (sulky situation = be conservative!)"
        },
        {
          title: 'Applying the Constraint',
          type: 'example',
          content: "**Scenario: PharmaCo licenses drug to GenericCo**\n• $5 million upfront payment\n• $2 per unit royalty on sales\n\n**Upfront payment:** Not variable → include $5M\n\n**Royalties:** Sales-based royalty on license of IP\n\n**Special rule!** Sales-based royalties on licenses of IP are recognized when:\n• Later of: Subsequent sale occurs OR performance obligation satisfied\n\n**This is an EXCEPTION to normal variable consideration rules!**\n\nNo estimation/constraint needed—recognize as sales occur."
        },
        {
          title: 'Sales-Based Royalty Exception',
          type: 'warning',
          content: "**⚠️ CRITICAL EXCEPTION:**\n\n**For licenses of intellectual property:**\nSales-based or usage-based royalties are recognized when (or as) the later of:\n\n1. Subsequent sale or usage occurs, OR\n2. Performance obligation (to which royalty relates) is satisfied\n\n**Why?** Too much uncertainty to estimate at contract inception.\n\n**This exception ONLY applies to:**\n• Royalties on licenses of IP\n• When royalty relates predominantly to IP license\n\n**Does NOT apply to:** Sales bonuses on product sales (use normal estimation)"
        },
        {
          title: 'Right of Return',
          type: 'text',
          content: "**When customer has right of return, recognize:**\n\n1. **Revenue** – Reduced for expected returns (estimated)\n2. **Refund liability** – Obligation to refund customer (CR)\n3. **Asset for right to recover** – Expected returned inventory, at COST less expected recovery costs (DR)\n4. **Reduce COGS** – For cost of goods expected to be returned\n\n**Reassess at each reporting date:**\n• Update estimate of expected returns\n• Adjust revenue, refund liability, and asset accordingly"
        },
        {
          title: 'Right of Return Entries',
          type: 'example',
          content: "**RetailCo sells $500,000 of goods (cost $300,000). Historical returns = 3%.**\n\n**At sale:**\n\nDr Accounts Receivable         $500,000\n    Cr Revenue                     $485,000\n    Cr Refund Liability             $15,000\n\nDr Cost of Goods Sold          $291,000\nDr Asset - Right to Recover      $9,000*\n    Cr Inventory                   $300,000\n\n*$300,000 × 3% = $9,000 expected return cost\n\n**When return occurs (assume $10,000 returned, cost $6,000):**\n\nDr Refund Liability             $10,000\n    Cr Cash                         $10,000\n\nDr Inventory                     $6,000\n    Cr Asset - Right to Recover      $6,000"
        },
        {
          title: 'Significant Financing Component',
          type: 'text',
          content: "**Adjust transaction price if significant financing exists:**\n\n**Indicators of significant financing:**\n• Difference between promised and cash selling price\n• Length of time between transfer and payment\n• Prevailing interest rates\n\n**Practical expedient:** No adjustment needed if:\n• ≤ 1 year between transfer and payment\n\n**If significant financing exists:**\n• Adjust transaction price to reflect time value of money\n• Recognize interest expense (customer pays later) or interest revenue (customer pays earlier)"
        },
        {
          title: 'Financing Component Example',
          type: 'example',
          content: "**MachineCo sells equipment for $500,000, payment due in 3 years.**\n**Cash price would be $400,000. Implicit rate = 7.72%**\n\n**At sale:**\nDr Receivable                  $500,000\n    Cr Revenue                     $400,000\n    Cr Discount on Receivable      $100,000\n\n**Year 1 interest:**\n$400,000 × 7.72% = $30,880\n\nDr Discount on Receivable       $30,880\n    Cr Interest Revenue             $30,880\n\n**The $100,000 difference is interest, not revenue!**"
        },
        {
          title: 'Noncash Consideration',
          type: 'text',
          content: "**If customer pays with noncash consideration:**\n\n**Measurement:** Fair value of noncash consideration\n\n**If FV not reasonably estimable:** Use stand-alone selling price of goods/services promised\n\n**Variable noncash consideration:** Apply same constraint rules\n\n**Example:** Customer pays with shares of stock\n• Measure at FV of stock received\n• If stock value varies based on future events, apply constraint"
        },
        {
          title: '⚠️ Exam Trap: Consideration Payable to Customer',
          type: 'warning',
          content: "**If entity pays customer (cash, credits, vouchers):**\n\n**Treatment depends on purpose:**\n\n1. **Payment for distinct good/service from customer:**\n   → Account as purchase (separate transaction)\n\n2. **Not for distinct good/service:**\n   → Reduce transaction price\n\n**Common example:** Slotting fees paid to retailers\n• If for distinct service (shelf placement) → expense\n• If just to get business → reduce revenue\n\n**Exam tip:** Payments to customers usually REDUCE revenue!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Variable consideration includes discounts, rebates, refunds, bonuses, penalties",
            "Estimate using expected value (probability-weighted) or most likely amount",
            "Apply constraint: include only if highly probable no significant reversal",
            "Sales-based royalties on IP licenses: recognize when later of sale/usage or PO satisfied",
            "Right of return: reduce revenue, record refund liability AND asset for recovery right",
            "Significant financing (> 1 year): adjust for time value of money",
            "Consideration payable to customer: usually reduces transaction price"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-004',
    section: 'FAR',
    title: "Contract Costs: Obtain & Fulfill",
    description: "Learn when to capitalize costs to obtain and fulfill contracts and how to amortize them",
    order: 39,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Revenue Recognition", "Contract Costs", "ASC 606"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "ASC 606 doesn't just cover revenue—it also addresses contract costs! Knowing when to capitalize vs expense costs to obtain and fulfill contracts can significantly impact both the balance sheet AND income statement timing. The exam tests whether you can properly apply the asset recognition criteria."
        },
        {
          title: 'Two Types of Contract Costs',
          type: 'text',
          content: "**ASC 606 addresses two categories:**\n\n**1. Incremental Costs to OBTAIN a Contract**\n• Costs incurred to obtain contract that wouldn't have been incurred otherwise\n• Example: Sales commissions\n\n**2. Costs to FULFILL a Contract**\n• Costs directly related to contract that generate/enhance resources used to satisfy POs\n• Example: Setup costs, mobilization costs\n\n**Different rules apply to each!**"
        },
        {
          title: 'Costs to Obtain a Contract',
          type: 'text',
          content: "**Capitalize if BOTH criteria met:**\n\n1. **Incremental** – Would not have been incurred if contract not obtained\n2. **Expected to be recovered** – Through revenue from contract\n\n**If met → Capitalize as asset, amortize over contract period (including renewals)**\n\n**Practical expedient available:**\nIf amortization period would be ≤ 1 year → may expense as incurred\n\n**What's incremental?**\n✓ Sales commissions (paid only if sale made)\n✗ Salaries (paid regardless of contract)\n✗ Travel to bid on contract (incurred before winning)"
        },
        {
          title: 'Obtain Cost Examples',
          type: 'table',
          headers: ['Cost', 'Incremental?', 'Treatment'],
          rows: [
            ['Commission on winning bid', 'Yes', 'Capitalize (if > 1 year)'],
            ['Commission on renewal', 'Yes', 'Capitalize (if > 1 year)'],
            ['Salesperson salary', 'No', 'Expense as incurred'],
            ['Legal fees to draft contract', 'Depends*', 'Usually expense'],
            ['Travel to pitch client', 'No', 'Expense as incurred'],
            ['Proposal preparation costs', 'No', 'Expense as incurred']
          ]
        },
        {
          title: 'Obtaining Cost Example',
          type: 'example',
          content: "**SaaS Corp wins a 3-year software contract:**\n• Annual fee: $100,000\n• Sales commission: $15,000 (5% of 3-year value)\n• Expected renewals: Yes, at same commission rate\n\n**Analysis:**\n• Commission is incremental (only paid if contract won) ✓\n• Expected to be recovered through contract ✓\n• Amortization period > 1 year ✓\n\n**Capitalize $15,000 as contract asset**\n\n**Amortization:**\nIf expected customer life = 5 years (including renewals):\n$15,000 ÷ 5 years = **$3,000 per year**\n\n**Entry at contract inception:**\nDr Contract Asset - Commissions  $15,000\n    Cr Cash/Liability                $15,000\n\n**Annual amortization:**\nDr Amortization Expense          $3,000\n    Cr Contract Asset                 $3,000"
        },
        {
          title: 'Costs to Fulfill a Contract',
          type: 'text',
          content: "**Capitalize ONLY if ALL three criteria met:**\n\n1. **Relate directly to contract** – Identified contract (existing or anticipated specific)\n2. **Generate or enhance resources** – Used to satisfy performance obligations\n3. **Expected to be recovered** – Through contract revenue\n\n**Plus: NOT within scope of other GAAP!**\n\nIf another standard applies (inventory, PP&E, intangibles), use that standard instead.\n\n**Fulfill costs must pass ALL THREE tests + other GAAP check!**"
        },
        {
          title: '🧠 Memory Aid: Fulfill Cost Criteria',
          type: 'callout',
          content: "**\"D-E-R + Check\"**\n\n**D**irectly relates to contract\n**E**nhances resources to satisfy POs\n**R**ecoverable through revenue\n\n**+ Check:** Not covered by other GAAP (inventory, PP&E, etc.)\n\nAll four must be YES to capitalize!"
        },
        {
          title: 'Fulfill Cost Examples',
          type: 'table',
          headers: ['Cost', 'Capitalize?', 'Reason'],
          rows: [
            ['Design/engineering for specific contract', 'Yes', 'Directly relates, enhances, recoverable'],
            ['Setup costs specific to contract', 'Yes', 'Creates resource to satisfy POs'],
            ['Direct materials used', 'No*', 'Inventory guidance applies'],
            ['Direct labor for contract', 'Yes/No*', 'May be inventory or separate standard'],
            ['Contract administration', 'No', 'General overhead, not directly related'],
            ['Wasted materials', 'No', 'Not enhancing resources'],
            ['Mobilization costs', 'Yes', 'Setup for long-term contract']
          ]
        },
        {
          title: 'Fulfill Cost Example',
          type: 'example',
          content: "**ConstructCo wins a bridge construction contract:**\n\n**Costs incurred before construction:**\n• Equipment mobilization to site: $50,000\n• Engineering/design for this bridge: $80,000\n• General bidding costs: $10,000\n• Insurance (covers all projects): $5,000\n\n**Analysis:**\n\n✓ **Capitalize:** Mobilization ($50K), Engineering ($80K)\n• Directly relate to contract\n• Enhance resources to perform\n• Recoverable through contract price\n\n✗ **Expense:** Bidding costs ($10K), General insurance ($5K)\n• Not directly related to specific contract\n• Would be incurred regardless\n\n**Contract Asset = $130,000**\nAmortize as performance obligation satisfied (% complete)"
        },
        {
          title: 'Amortization of Contract Costs',
          type: 'text',
          content: "**Amortization method:** Systematic basis consistent with transfer of goods/services\n\n**For costs to obtain:**\n• Over period of contract AND expected renewals (if commission paid on renewal)\n• Consider customer expected life if significant renewals\n\n**For costs to fulfill:**\n• Over period goods/services provided\n• Often matches revenue recognition pattern (e.g., percentage of completion)\n\n**Update estimates if facts change!**"
        },
        {
          title: 'Impairment of Contract Assets',
          type: 'text',
          content: "**Test for impairment if indicators exist:**\n\n**Carrying amount > Remaining consideration expected LESS direct costs to transfer**\n\n**Remaining consideration includes:**\n• Contract price adjustments (variable consideration updates)\n• Expected renewals/extensions\n\n**Less costs not yet recognized:**\n• Remaining fulfillment costs\n• Direct costs of transfer\n\n**If impaired:** Recognize loss immediately, reduce carrying amount"
        },
        {
          title: 'Impairment Example',
          type: 'example',
          content: "**ServiceCo's contract cost asset:**\n• Carrying amount: $100,000\n• Remaining contract revenue: $150,000\n• Expected direct costs to complete: $120,000\n\n**Recoverable amount:**\n$150,000 - $120,000 = **$30,000**\n\n**Impairment test:**\nCarrying amount ($100,000) > Recoverable ($30,000)\n\n**Impairment loss = $70,000**\n\n**Entry:**\nDr Impairment Loss              $70,000\n    Cr Contract Asset               $70,000"
        },
        {
          title: '⚠️ Exam Trap: Pre-Contract Costs',
          type: 'warning',
          content: "**Costs incurred BEFORE contract is obtained:**\n\n**Generally EXPENSE immediately!**\n\n**Exception for fulfill costs:**\nCan capitalize costs for \"anticipated\" contract if:\n• Specific contract is anticipated\n• Costs generate resources for that contract\n• Costs are recoverable\n\n**But costs to obtain contract?**\n→ Must wait until contract is obtained to capitalize\n→ Costs before winning (proposal, bidding) = expense!\n\n**Key insight:** You can't capitalize sales commissions on contracts you haven't won!"
        },
        {
          title: 'Contract Asset vs Receivable',
          type: 'text',
          content: "**Important distinction:**\n\n**Contract Asset:**\n• Right to consideration conditional on something other than passage of time\n• Example: Recognized revenue before billing right exists\n\n**Receivable (Trade Receivable):**\n• Unconditional right to consideration\n• Only passage of time required before payment\n\n**Contract cost assets (this lesson) are SEPARATE from contract assets!**\n\n**Presentation:** Contract cost assets may be combined with contract assets, but should be disclosed separately"
        },
        {
          title: 'Disclosure Requirements',
          type: 'list',
          content: [
            "**Costs capitalized:** Disclose judgments about what costs to capitalize",
            "**Amortization method:** Describe how costs are amortized",
            "**Asset balances:** Contract assets vs receivables vs cost assets",
            "**Impairment losses:** Amount and circumstances",
            "**Closing balance by category:** Costs to obtain vs costs to fulfill"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Costs to obtain: Capitalize if incremental AND expected to be recovered",
            "Practical expedient: Expense obtain costs if amortization ≤ 1 year",
            "Costs to fulfill: Must be directly related, enhance resources, AND recoverable",
            "Fulfill costs: Check if other GAAP applies first (inventory, PP&E)",
            "Amortize over period of goods/services transfer (including expected renewals)",
            "Test for impairment: Carrying amount vs remaining consideration less direct costs",
            "Pre-contract obtain costs: Expense; fulfill costs: may capitalize if specific anticipated contract"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-005',
    section: 'FAR',
    title: "ASC 842: Lease Classification",
    description: "Master the criteria for classifying leases as finance or operating under the new lease standard",
    order: 40,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Leases", "ASC 842", "Classification"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "ASC 842 changed everything! Now ALL leases (except short-term) go on the balance sheet. But classification as finance or operating still affects the income statement pattern and lessor accounting. The classification criteria are HEAVILY TESTED—memorize them!"
        },
        {
          title: 'The Big Change Under ASC 842',
          type: 'text',
          content: "**What changed from ASC 840?**\n\n**Old (ASC 840):**\n• Operating leases = Off balance sheet\n• Capital leases = On balance sheet\n\n**New (ASC 842):**\n• **ALL leases = On balance sheet** (with exceptions)\n• Record: Right-of-Use (ROU) Asset AND Lease Liability\n\n**Exceptions (still off balance sheet):**\n• Short-term leases (≤ 12 months, no purchase option reasonably certain)\n• Leases of low-value assets (practical expedient for lessees)\n\n**Classification still matters for:** Income statement pattern and lessor accounting"
        },
        {
          title: 'What is a Lease?',
          type: 'text',
          content: "**Definition:** A contract that conveys the right to control the use of identified property, plant, or equipment for a period of time in exchange for consideration.\n\n**Control exists if customer has BOTH:**\n\n1. **Right to obtain substantially all economic benefits** from use of the asset\n2. **Right to direct the use** of the asset throughout the period\n\n**Not a lease if:**\n• Supplier has substantive substitution rights\n• Customer doesn't control decisions about how/for what purpose asset is used"
        },
        {
          title: 'The Five Classification Criteria',
          type: 'text',
          content: "**A lease is classified as FINANCE (lessee) / SALES-TYPE (lessor) if ANY ONE of these is met:**\n\n**1. Transfer of ownership** at end of lease term\n\n**2. Purchase option** that lessee is reasonably certain to exercise\n\n**3. Lease term** is for major part of remaining economic life (≥ 75% rule of thumb)\n\n**4. Present value** of lease payments ≥ substantially all of fair value (≥ 90% rule of thumb)\n\n**5. Specialized asset** with no alternative use to lessor at end of term\n\n**If NONE met → Operating lease**"
        },
        {
          title: '🧠 Memory Aid: Classification Criteria',
          type: 'callout',
          content: "**\"T-O-L-E-S\"** (Think: TOLES like you're \"TOLLING\" ownership)\n\n**T**ransfer of ownership\n**O**ption to purchase (reasonably certain)\n**L**ease term ≥ major part of economic life (75%)\n**E**conomic (PV ≥ 90% of FV)\n**S**pecialized asset (no alternative use)\n\n**ANY one = Finance/Sales-Type lease!**"
        },
        {
          title: 'Criterion Details',
          type: 'table',
          headers: ['Criterion', 'Test', 'Rule of Thumb'],
          rows: [
            ['Transfer of ownership', 'Title transfers at end', 'Clear transfer'],
            ['Purchase option', 'Lessee reasonably certain to exercise', 'Consider all factors'],
            ['Lease term', '≥ Major part of economic life', '≥ 75%'],
            ['Present value', '≥ Substantially all of fair value', '≥ 90%'],
            ['Specialized asset', 'No alternative use to lessor', 'Highly specialized']
          ]
        },
        {
          title: 'Lease Term Determination',
          type: 'text',
          content: "**Lease term includes:**\n\n1. **Noncancelable period** – Required lease period\n2. **Renewal options** – If reasonably certain to exercise\n3. **Termination options** – Periods beyond termination option if reasonably certain NOT to exercise\n4. **Lessor renewal/termination options** – Periods controlled by lessor\n\n**Reasonably certain factors:**\n• Economic incentives (significant leasehold improvements)\n• Termination penalties\n• Importance of asset to operations\n• Past practices\n• Cost/disruption to lease alternative"
        },
        {
          title: 'Lease Payments Included',
          type: 'text',
          content: "**Lease payments for PV test include:**\n\n✓ Fixed payments (less lease incentives receivable)\n✓ Variable payments based on index or rate\n✓ Purchase option price (if reasonably certain to exercise)\n✓ Termination penalty (if reasonably certain to terminate)\n✓ Residual value guarantee:\n   • Lessee: Amount expected to owe\n   • Lessor: Full guaranteed amount\n\n**Exclude:**\n✗ Variable payments NOT based on index/rate (expense as incurred)\n✗ Payments for non-lease components (unless combined)"
        },
        {
          title: 'Discount Rate',
          type: 'text',
          content: "**For PV calculation:**\n\n**Lessee:**\n• Rate implicit in the lease (if readily determinable)\n• If not → Lessee's incremental borrowing rate\n\n**Lessor:**\n• Always uses rate implicit in the lease\n\n**Rate implicit in lease:** Rate that causes PV of (lease payments + unguaranteed residual value) = Fair value of asset + Initial direct costs\n\n**Incremental borrowing rate:** Rate lessee would pay to borrow funds necessary to purchase similar asset over similar term"
        },
        {
          title: 'Classification Example',
          type: 'example',
          content: "**LesseCo leases equipment:**\n• Fair value: $100,000\n• Lease term: 4 years\n• Economic life: 5 years\n• Annual payments: $24,000 (end of year)\n• No purchase option, no transfer\n• Discount rate: 6%\n\n**Apply TOLES criteria:**\n\n❌ **T**ransfer? No\n❌ **O**ption? No\n✅ **L**ease term? 4/5 = 80% ≥ 75% **YES!**\n✅ **E**conomic? PV = $24,000 × 3.4651 = $83,162\n   $83,162 / $100,000 = 83% < 90% **No**\n❌ **S**pecialized? No\n\n**Classification: FINANCE LEASE**\n(Criterion 3 met - lease term ≥ 75% of economic life)"
        },
        {
          title: 'Lessee Classification Summary',
          type: 'table',
          headers: ['Aspect', 'Finance Lease', 'Operating Lease'],
          rows: [
            ['Balance sheet', 'ROU Asset + Lease Liability', 'ROU Asset + Lease Liability'],
            ['Income statement', 'Amortization + Interest (front-loaded)', 'Single lease expense (straight-line)'],
            ['Cash flow', 'Interest: Operating; Principal: Financing', 'All in Operating (usually)'],
            ['Total expense over life', 'Same', 'Same'],
            ['Expense pattern', 'Higher early, lower later', 'Level expense']
          ]
        },
        {
          title: 'Lessor Classification',
          type: 'text',
          content: "**Lessor has THREE lease types:**\n\n**1. Sales-Type Lease:**\n• Meets ANY of TOLES criteria\n• Recognize selling profit/loss at commencement\n• Derecognize asset; record lease receivable\n\n**2. Direct Financing Lease:**\n• Meets ANY of TOLES criteria AND\n• PV of payments + residual = Fair value (no selling profit)\n• AND collectibility is probable\n\n**3. Operating Lease:**\n• Meets NONE of TOLES criteria\n• Keep asset on books\n• Recognize rent income straight-line"
        },
        {
          title: '⚠️ Exam Trap: 75% and 90% Are Guidelines!',
          type: 'warning',
          content: "**Important nuance:**\n\n**75% and 90% are NOT bright lines in ASC 842!**\n\nThey're \"rules of thumb\" from old ASC 840 that examiners still reference.\n\nASC 842 says:\n• \"Major part\" of economic life\n• \"Substantially all\" of fair value\n\n**On the exam:**\n• If clearly above threshold → Finance\n• If clearly below → Operating\n• If near threshold → Read question carefully!\n\n**Also watch:** Land leases generally DON'T meet life/value tests (infinite life, holds value)"
        },
        {
          title: 'Land and Building Leases',
          type: 'text',
          content: "**Special rules for leases including land:**\n\n**If land + building:**\n• Generally account as TWO leases (allocate payments)\n• Land: Usually operating (unless title transfers)\n• Building: Apply normal TOLES criteria\n\n**Exception:** If land is immaterial, treat combined as single lease\n\n**Land-only lease:**\n• Usually operating (land has infinite life, retains value)\n• Finance only if: Title transfers OR purchase option reasonably certain"
        },
        {
          title: 'Short-Term Lease Exception',
          type: 'text',
          content: "**Election available (by class of asset):**\n\nIf lease term ≤ 12 months AND no purchase option reasonably certain to exercise:\n\n**Lessee may elect:**\n• No ROU asset or liability\n• Expense lease payments straight-line\n• Disclose election and expense amount\n\n**Reassess if:**\n• Lessee becomes reasonably certain to exercise option\n• Lease is modified (new lease assessment)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ASC 842: ALL leases on balance sheet (ROU Asset + Liability), except short-term",
            "TOLES criteria: Transfer, Option, Lease term (75%), Economic (90%), Specialized",
            "ANY one criterion met = Finance lease (lessee) / Sales-type lease (lessor)",
            "Finance lease: Front-loaded expense (amort + interest); Operating: Straight-line",
            "Lease term includes renewals/terminations if reasonably certain",
            "Discount rate: Implicit rate or incremental borrowing rate (lessee)",
            "Land: Usually operating unless title transfers or option reasonably certain"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-006',
    section: 'FAR',
    title: "Lessee Accounting: Finance & Operating",
    description: "Master the initial measurement and subsequent accounting for both finance and operating leases from the lessee perspective",
    order: 41,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Leases", "ASC 842", "Lessee Accounting"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Under ASC 842, lessees record BOTH finance and operating leases on the balance sheet. But the income statement treatment differs significantly! Finance leases have front-loaded expense; operating leases are straight-line. Understanding the journal entries and calculations for both types is essential for FAR success."
        },
        {
          title: 'Initial Recognition: Both Lease Types',
          type: 'text',
          content: "**At lease commencement, recognize:**\n\n**1. Right-of-Use (ROU) Asset:**\n• Initial measurement of lease liability PLUS\n• Lease payments made at/before commencement PLUS\n• Initial direct costs incurred LESS\n• Lease incentives received\n\n**2. Lease Liability:**\n• Present value of lease payments not yet paid\n• Discount at: Rate implicit in lease (if determinable) OR Lessee's incremental borrowing rate"
        },
        {
          title: 'ROU Asset Calculation',
          type: 'example',
          content: "**LeaseCo signs a 5-year equipment lease:**\n• Annual payment: $10,000 (at year-end)\n• Prepaid rent: $2,000\n• Initial direct costs: $1,500\n• Lease incentive received: $500\n• Discount rate: 6%\n\n**Step 1: Calculate Lease Liability**\nPV of 5 payments = $10,000 × 4.2124 = **$42,124**\n\n**Step 2: Calculate ROU Asset**\nLease liability:           $42,124\n+ Prepaid rent:             $2,000\n+ Initial direct costs:     $1,500\n- Lease incentive:           ($500)\n**= ROU Asset:             $45,124**"
        },
        {
          title: 'Initial Entry: Both Lease Types',
          type: 'example',
          content: "**Using previous example:**\n\n**Entry at commencement:**\nDr ROU Asset                    $45,124\nDr Lease Incentive Receivable*    $500\n    Cr Lease Liability              $42,124\n    Cr Cash (prepaid + direct)       $3,500\n\n*Or already received, reducing cash paid\n\n**Note:** The entry is the SAME for finance and operating leases!\nThe difference is in subsequent accounting."
        },
        {
          title: 'Finance Lease: Subsequent Accounting',
          type: 'text',
          content: "**Income Statement: TWO separate charges**\n\n**1. Amortization of ROU Asset:**\n• Straight-line over shorter of lease term or useful life\n• If ownership transfers or purchase option certain → use useful life\n• Classified as amortization/depreciation expense\n\n**2. Interest on Lease Liability:**\n• Effective interest method\n• Beginning liability × interest rate\n• Classified as interest expense\n\n**Result:** HIGHER total expense in early years (front-loaded)"
        },
        {
          title: 'Finance Lease Example',
          type: 'example',
          content: "**5-year finance lease:**\n• ROU Asset: $45,124\n• Lease Liability: $42,124\n• Annual payment: $10,000\n• Rate: 6%\n\n**Year 1:**\n\n**Amortization:** $45,124 ÷ 5 = $9,025\n\nDr Amortization Expense         $9,025\n    Cr Accumulated Amort - ROU      $9,025\n\n**Interest:** $42,124 × 6% = $2,527\n\nDr Interest Expense             $2,527\n    Cr Lease Liability               $2,527\n\n**Payment:**\n\nDr Lease Liability             $10,000\n    Cr Cash                         $10,000\n\n**Year 1 Total Expense:** $9,025 + $2,527 = **$11,552**"
        },
        {
          title: 'Finance Lease Amortization Schedule',
          type: 'table',
          headers: ['Year', 'Beg Liability', 'Interest (6%)', 'Payment', 'End Liability'],
          rows: [
            ['1', '$42,124', '$2,527', '$10,000', '$34,651'],
            ['2', '$34,651', '$2,079', '$10,000', '$26,730'],
            ['3', '$26,730', '$1,604', '$10,000', '$18,334'],
            ['4', '$18,334', '$1,100', '$10,000', '$9,434'],
            ['5', '$9,434', '$566*', '$10,000', '$0']
          ]
        },
        {
          title: 'Operating Lease: Subsequent Accounting',
          type: 'text',
          content: "**Income Statement: SINGLE lease expense**\n\n**Lease Expense:**\n• Generally straight-line over lease term\n• Total lease cost ÷ number of periods\n• Includes: Lease payments + initial direct costs - incentives\n\n**Balance Sheet entries still needed:**\n• Interest on liability (increases liability)\n• Payment (decreases liability)\n• Amortize ROU as plug to achieve straight-line expense\n\n**Result:** LEVEL expense each period"
        },
        {
          title: 'Operating Lease Expense Calculation',
          type: 'example',
          content: "**Same 5-year lease as operating:**\n• Total payments: $10,000 × 5 = $50,000\n• Initial direct costs: $1,500\n• Lease incentive: ($500)\n• Total lease cost: $51,000\n\n**Annual lease expense:** $51,000 ÷ 5 = **$10,200**\n\n**This is the target—now we work backward!**"
        },
        {
          title: 'Operating Lease Year 1 Entries',
          type: 'example',
          content: "**Year 1 Operating Lease:**\n\n**Step 1: Calculate interest on liability**\n$42,124 × 6% = $2,527\n\n**Step 2: Record payment and adjust**\n\nDr Lease Expense               $10,200*\nDr Lease Liability              $7,473**\n    Cr ROU Asset                     $7,673***\n    Cr Cash                         $10,000\n\n*Straight-line expense (our target)\n**$10,000 payment - $2,527 interest = principal reduction\n***Plug to balance (varies each year)\n\n**Alternative presentation (same result):**\nDr Interest on Lease Liability  $2,527\nDr Amort of ROU Asset           $7,673\n    Cr Single Lease Expense         $10,200"
        },
        {
          title: '🧠 Memory Aid: Finance vs Operating',
          type: 'callout',
          content: "**\"Finance = Front-loaded; Operating = Even\"**\n\n**Finance Lease:**\n• TWO expenses: Amortization + Interest\n• Interest higher early → higher total expense early\n• Like owning with a loan\n\n**Operating Lease:**\n• ONE expense: Single lease expense (straight-line)\n• Interest still calculated, but offset by varying amortization\n• Like renting\n\n**Both have same TOTAL expense over lease life!**"
        },
        {
          title: 'Expense Pattern Comparison',
          type: 'table',
          headers: ['Year', 'Finance: Amort', 'Finance: Interest', 'Finance: Total', 'Operating: Total'],
          rows: [
            ['1', '$9,025', '$2,527', '$11,552', '$10,200'],
            ['2', '$9,025', '$2,079', '$11,104', '$10,200'],
            ['3', '$9,025', '$1,604', '$10,629', '$10,200'],
            ['4', '$9,025', '$1,100', '$10,125', '$10,200'],
            ['5', '$9,025', '$566', '$9,591', '$10,200'],
            ['Total', '$45,125', '$7,876', '$53,001', '$51,000*']
          ]
        },
        {
          title: 'Cash Flow Statement Impact',
          type: 'text',
          content: "**Classification of cash flows:**\n\n**Finance Lease:**\n• Interest portion: Operating activities\n• Principal portion: Financing activities\n\n**Operating Lease:**\n• Cash payments: Operating activities (generally)\n• Short-term portion may be financing (policy choice)\n\n**Key difference:** Finance lease splits cash flow; operating keeps it together in operating section."
        },
        {
          title: '⚠️ Exam Trap: Variable Lease Payments',
          type: 'warning',
          content: "**Variable payments based on INDEX or RATE:**\n• Include in lease liability using current index/rate\n• Remeasure when payments change due to reference change\n\n**Variable payments NOT based on index/rate:**\n• EXCLUDE from lease liability\n• Expense as incurred (when incurred)\n\n**Example:**\n✓ CPI-adjusted rent → include\n✗ % of sales rent → exclude, expense when incurred\n\n**Exam tip:** Read whether variable payment is index-based!"
        },
        {
          title: 'Lease Modifications',
          type: 'text',
          content: "**If lease is modified:**\n\n**Separate lease if:**\n• Adds right to use additional asset AND\n• Price increases commensurate with stand-alone price\n→ Account for new lease separately\n\n**Not a separate lease:**\n• Remeasure lease liability at new discount rate\n• Adjust ROU asset for change in liability\n• If scope decrease: Reduce ROU proportionally, recognize gain/loss"
        },
        {
          title: 'Reassessment and Remeasurement',
          type: 'text',
          content: "**Reassess lease term if:**\n• Significant event or change in circumstances that affects whether lessee is reasonably certain to exercise/not exercise option\n\n**Remeasure liability when:**\n• Change in lease term assessment\n• Change in purchase option assessment\n• Change in variable payments based on index/rate\n• Change in amounts expected under residual value guarantee\n\n**Use CURRENT discount rate for remeasurement (except index/rate changes)**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Initial recognition: ROU Asset = Liability + prepaid + direct costs - incentives",
            "Finance lease: Separate amortization and interest expense (front-loaded)",
            "Operating lease: Single straight-line expense (ROU amort varies as plug)",
            "Both types: Same balance sheet treatment, different income statement",
            "Finance cash flow: Interest = operating, principal = financing",
            "Operating cash flow: Generally all operating",
            "Variable payments: Index-based = include; not index-based = expense as incurred"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-007',
    section: 'FAR',
    title: "Lessor Accounting: Sales-Type, Direct, Operating",
    description: "Master the three lessor accounting models including initial and subsequent entries for each type",
    order: 42,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Leases", "ASC 842", "Lessor Accounting"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "While lessee accounting changed dramatically under ASC 842, lessor accounting stayed largely the same as ASC 840. But you still need to master three distinct models: sales-type, direct financing, and operating. The exam tests your ability to determine the correct model AND record the entries!"
        },
        {
          title: 'Lessor Classification Framework',
          type: 'text',
          content: "**Step 1: Apply TOLES criteria**\n(Transfer, Option, Lease term ≥75%, Economic ≥90%, Specialized)\n\n**If NONE met → Operating Lease**\n\n**If ANY met, then check for selling profit/loss:**\n\n**Sales-Type if:**\n• Fair value ≠ Carrying amount (selling profit/loss exists) OR\n• Fair value = Carrying amount BUT collectibility concerns\n\n**Direct Financing if:**\n• Fair value = Carrying amount (no selling profit/loss) AND\n• Collectibility is probable AND\n• Any third-party residual value guarantee or variable payments"
        },
        {
          title: 'Lessor Classification Flowchart',
          type: 'table',
          headers: ['Question', 'If Yes', 'If No'],
          rows: [
            ['Any TOLES criteria met?', 'Continue below', 'OPERATING LEASE'],
            ['Is FV ≠ Carrying amount?', 'SALES-TYPE LEASE', 'Continue'],
            ['Is FV = CV AND collectibility probable?', 'DIRECT FINANCING', 'SALES-TYPE LEASE']
          ]
        },
        {
          title: 'Sales-Type Lease: Initial Recognition',
          type: 'text',
          content: "**At commencement, recognize:**\n\n**1. Net Investment in Lease (Asset):**\n• Lease receivable (PV of payments + guaranteed RV)\n• Unguaranteed residual asset\n• Less: Deferred initial direct costs (if no selling profit) or expense (if selling profit)\n\n**2. Sales Revenue:**\n• Lesser of: Fair value OR PV of lease payments + guaranteed RV\n\n**3. Cost of Goods Sold:**\n• Carrying amount of asset - PV of unguaranteed residual\n\n**4. Selling Profit/Loss:**\n• Revenue - COGS"
        },
        {
          title: 'Sales-Type Lease Example',
          type: 'example',
          content: "**LessorCo leases equipment:**\n• Fair value: $100,000\n• Carrying amount (cost): $75,000\n• Lease term: 5 years\n• Annual payment: $22,000 (year-end)\n• Guaranteed residual: $5,000\n• Rate implicit: 8%\n\n**Calculate Net Investment:**\nPV of payments: $22,000 × 3.9927 = $87,839\nPV of guaranteed RV: $5,000 × 0.6806 = $3,403\n**Lease Receivable = $91,242**\n\n**Selling Profit:**\nRevenue (lesser of FV or PV): $91,242\nCOGS (CV - 0 unguaranteed): $75,000\n**Profit = $16,242**"
        },
        {
          title: 'Sales-Type Lease Entry',
          type: 'example',
          content: "**Entry at commencement:**\n\nDr Lease Receivable            $91,242\n    Cr Sales Revenue               $91,242\n\nDr Cost of Goods Sold          $75,000\n    Cr Equipment (Inventory)        $75,000\n\n**Net effect:** Profit of $16,242 recognized immediately!\n\n**Initial direct costs (when selling profit exists):**\nDr Selling Expense              $X,XXX\n    Cr Cash                          $X,XXX\n\n(Expensed immediately, NOT deferred)"
        },
        {
          title: 'Sales-Type: Subsequent Accounting',
          type: 'text',
          content: "**Each period:**\n\n**1. Interest Income:**\n• Beginning receivable × implicit rate\n• Increases receivable balance\n\n**2. Cash Receipt:**\n• Reduces receivable balance\n\n**Amortization table same as lessee's liability table!**\n\n**At lease end:**\n• Receive guaranteed residual (or collect guarantee)\n• Record return of asset at residual value"
        },
        {
          title: 'Direct Financing Lease: Initial Recognition',
          type: 'text',
          content: "**At commencement:**\n\n**No selling profit recognized!** (FV = Carrying amount)\n\n**Record:**\nDr Net Investment in Lease     $XXX\n    Cr Asset (at carrying amount)    $XXX\n\n**Net Investment includes:**\n• Lease receivable (PV of payments + guaranteed RV)\n• Unguaranteed residual asset\n• PLUS: Initial direct costs (deferred, reduces yield)\n\n**Profit earned through interest income over lease term**"
        },
        {
          title: 'Direct Financing Example',
          type: 'example',
          content: "**Same facts, but FV = CV = $91,242:**\n\n**Entry at commencement:**\n\nDr Lease Receivable            $91,242\n    Cr Equipment                    $91,242\n\n**No revenue or COGS—just exchange of assets!**\n\n**If $2,000 initial direct costs:**\n\nDr Lease Receivable            $93,242\n    Cr Equipment                    $91,242\n    Cr Cash                          $2,000\n\n**The $2,000 reduces the implicit rate (lower interest income over time)**"
        },
        {
          title: 'Operating Lease: Lessor Accounting',
          type: 'text',
          content: "**Asset stays on lessor's books!**\n\n**Each period:**\n\n**1. Depreciation:**\n• Continue depreciating the leased asset\n• Systematic basis (usually straight-line)\n\n**2. Rent Revenue:**\n• Recognize straight-line over lease term\n• Even if payments vary\n\n**Initial direct costs:**\n• Capitalize and amortize over lease term\n• Same pattern as revenue recognition"
        },
        {
          title: 'Operating Lease Example',
          type: 'example',
          content: "**LessorCo leases building (operating lease):**\n• Cost: $500,000; Useful life: 40 years\n• Lease term: 10 years\n• Year 1 rent: $40,000; Years 2-10: $50,000\n• Initial direct costs: $5,000\n\n**Total rent:** $40,000 + (9 × $50,000) = $490,000\n**Straight-line revenue:** $490,000 ÷ 10 = **$49,000/year**\n\n**Year 1 entries:**\n\nDr Cash                        $40,000\nDr Deferred Rent Receivable     $9,000\n    Cr Rent Revenue                 $49,000\n\nDr Depreciation Expense        $12,500\n    Cr Accumulated Depreciation     $12,500\n($500,000 ÷ 40 years)\n\nDr Amortization Expense           $500\n    Cr Deferred IDC                    $500\n($5,000 ÷ 10 years)"
        },
        {
          title: '🧠 Memory Aid: Lessor Types',
          type: 'callout',
          content: "**\"Sales-Type = Sell it; Direct = Defer it; Operating = Own it\"**\n\n**Sales-Type:**\n• Recognize selling profit/loss immediately\n• Like a sale with financing\n\n**Direct Financing:**\n• No profit at inception (FV = CV)\n• Profit earned over time as interest\n• Like a pure financing arrangement\n\n**Operating:**\n• Keep asset, depreciate it\n• Rent income over time\n• Like a true rental"
        },
        {
          title: 'Comparison: Three Lessor Types',
          type: 'table',
          headers: ['Aspect', 'Sales-Type', 'Direct Financing', 'Operating'],
          rows: [
            ['TOLES criteria', 'Met', 'Met', 'NOT met'],
            ['Selling profit at inception', 'Yes', 'No (FV=CV)', 'No'],
            ['Asset removed from books', 'Yes', 'Yes', 'No'],
            ['Record receivable', 'Yes', 'Yes', 'No'],
            ['Interest income', 'Yes', 'Yes', 'No'],
            ['Depreciation', 'No', 'No', 'Yes'],
            ['Initial direct costs', 'Expense', 'Defer (reduce yield)', 'Defer (amortize)']
          ]
        },
        {
          title: '⚠️ Exam Trap: Third-Party Guarantees',
          type: 'warning',
          content: "**Residual value guarantees:**\n\n**From LESSEE:**\n• Include in both lessor and lessee calculations\n• Part of lease payments\n\n**From THIRD PARTY (not lessee):**\n• Lessor includes in receivable\n• Lessee does NOT include in their liability\n\n**This can cause lessor to classify differently than lessee!**\n\n**Example:** Lessee calculates PV at 85% of FV → Operating\nLessor (with 3rd party guarantee) calculates 95% → Sales-Type"
        },
        {
          title: 'Collectibility Concerns',
          type: 'text',
          content: "**If collectibility is NOT probable:**\n\n**Lessor accounting:**\n• DO NOT recognize lease receivable or sales revenue\n• DO NOT derecognize asset\n• Recognize lease payments received as deposit liability\n\n**Reassess each period:**\n• When collectibility becomes probable → recognize lease\n• Use cumulative catch-up approach"
        },
        {
          title: 'Lessor Disclosure Requirements',
          type: 'list',
          content: [
            "**General description** of leasing arrangements",
            "**Lease income** by type (sales-type, direct financing, operating)",
            "**Components of net investment** in sales-type and direct financing leases",
            "**Maturity analysis** of lease receivables (5-year table)",
            "**Residual assets** and significant assumptions",
            "**Operating lease assets** by class and depreciation"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "TOLES met + FV ≠ CV = Sales-Type (profit at inception)",
            "TOLES met + FV = CV + collectibility probable = Direct Financing",
            "No TOLES criteria met = Operating (keep asset)",
            "Sales-type: Immediate profit, expense initial direct costs",
            "Direct financing: Profit over time as interest, defer initial direct costs",
            "Operating: Depreciate asset, straight-line rent revenue, defer and amortize IDC",
            "Third-party guarantees: Lessor includes, lessee excludes"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-008',
    section: 'FAR',
    title: "Sale-Leaseback Transactions",
    description: "Understand when a sale-leaseback qualifies as a sale and how to account for both qualifying and failed sale-leasebacks",
    order: 43,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Leases", "ASC 842", "Sale-Leaseback"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Sale-leaseback transactions let companies monetize assets while continuing to use them. But ASC 842 has strict rules about when to recognize a 'sale.' If the transaction fails sale criteria, it's just a financing arrangement! Understanding the tests and accounting for both scenarios is critical."
        },
        {
          title: 'What is a Sale-Leaseback?',
          type: 'text',
          content: "**Definition:** Transaction where an entity (seller-lessee):\n\n1. **Sells** an asset to another party (buyer-lessor), AND\n2. **Leases** that same asset back from the buyer-lessor\n\n**Business purposes:**\n• Raise capital without losing use of asset\n• Improve financial ratios (if qualifying sale)\n• Tax benefits (in some cases)\n• Unlock value of real estate or equipment\n\n**Key question:** Is this really a SALE or just financing using asset as collateral?"
        },
        {
          title: 'Step 1: Does a Sale Exist?',
          type: 'text',
          content: "**Apply ASC 606 revenue recognition criteria:**\n\nA sale exists if **control of the asset transfers** to the buyer-lessor.\n\n**Control transfers if ALL true:**\n• Buyer-lessor has present right to payment\n• Buyer-lessor has legal title\n• Physical possession transferred (lessor perspective)\n• Significant risks and rewards transferred\n• Buyer-lessor has accepted the asset\n\n**If YES → Apply sale-leaseback accounting**\n**If NO → Apply failed sale-leaseback (financing)**"
        },
        {
          title: 'Conditions That PREVENT a Sale',
          type: 'text',
          content: "**A sale does NOT exist if:**\n\n**1. Repurchase option/obligation:**\n• Seller-lessee has option or obligation to repurchase (not at fair value)\n• Buyer-lessor can require seller to repurchase\n\n**2. Leaseback is finance lease:**\n• If leaseback meets ANY finance lease criteria AND\n• Seller-lessee has significant continuing involvement\n\n**3. Seller-lessee guarantee of buyer-lessor's investment:**\n• Substantially all investment guaranteed\n\n**These create continuing involvement → NOT a sale!**"
        },
        {
          title: '🧠 Memory Aid: Is It Really Sold?',
          type: 'callout',
          content: "**\"If you're coming back for it, you never really left!\"**\n\n**Red flags for NOT a sale:**\n• Repurchase rights (can/must buy it back)\n• Finance leaseback (substantial ownership risks remain)\n• Guarantees (didn't really transfer risk)\n\n**Think:** Did the risks and rewards REALLY transfer? Or is this just borrowing money secured by the asset?"
        },
        {
          title: 'Qualifying Sale-Leaseback: Seller-Lessee',
          type: 'text',
          content: "**If sale criteria MET:**\n\n**1. Derecognize the asset**\n\n**2. Recognize the leaseback:**\n• Record ROU asset and lease liability (as normal lessee)\n• BUT: Measure ROU asset at proportion of RETAINED RIGHT\n\n**3. Recognize gain/loss ONLY on portion TRANSFERRED:**\n• Full gain/loss NOT recognized\n• Only portion \"sold\" to buyer-lessor\n\n**Formula:**\nGain/loss recognized = (Sale proceeds - Carrying amount) × (1 - ROU/FV)"
        },
        {
          title: 'Qualifying Sale-Leaseback Example',
          type: 'example',
          content: "**BuildingCo sells building for $1,000,000:**\n• Carrying amount: $600,000\n• Fair value: $1,000,000 (at FV)\n• Leaseback: 5-year operating lease\n• Annual rent: $50,000\n• Discount rate: 5%\n• PV of lease payments: $216,474\n\n**Step 1: Calculate proportion retained**\nROU (at normal measurement) = $216,474\nRetained percentage = $216,474 ÷ $1,000,000 = 21.6%\n\n**Step 2: Calculate gain recognized**\nTotal gain = $1,000,000 - $600,000 = $400,000\nTransferred percentage = 100% - 21.6% = 78.4%\n**Gain recognized = $400,000 × 78.4% = $313,600**\n\n**Step 3: ROU Asset at retained portion**\nROU = Carrying amount × Retained % = $600,000 × 21.6% = **$129,600**"
        },
        {
          title: 'Seller-Lessee Entry',
          type: 'example',
          content: "**Entry for seller-lessee (continuing example):**\n\nDr Cash                      $1,000,000\nDr ROU Asset                   $129,600\n    Cr Building                    $600,000\n    Cr Lease Liability             $216,474\n    Cr Gain on Sale                $313,126*\n\n*Plugged to balance; approximates calculated gain\n\n**Note:** ROU asset is NOT at PV of payments!\nIt's at the proportion of carrying amount retained."
        },
        {
          title: 'Failed Sale-Leaseback: Financing',
          type: 'text',
          content: "**If sale criteria NOT met:**\n\n**Seller-Lessee:**\n• DO NOT derecognize asset (keep on books)\n• DO NOT recognize sale or gain/loss\n• Record FINANCIAL LIABILITY for proceeds received\n• Account for liability using effective interest method\n\n**Buyer-Lessor:**\n• DO NOT record asset\n• Record FINANCIAL ASSET (receivable)\n• Account for receivable using effective interest method\n\n**Essentially: A LOAN secured by the asset!**"
        },
        {
          title: 'Failed Sale-Leaseback Example',
          type: 'example',
          content: "**Same facts, but seller has repurchase option:**\n\n**Seller-Lessee Entry:**\n\nDr Cash                      $1,000,000\n    Cr Financial Liability       $1,000,000\n\n*Building stays on books at $600,000!*\n\n**Each Period:**\n\nDr Interest Expense             $XX,XXX\n    Cr Financial Liability          $XX,XXX\n(Accrue interest at effective rate)\n\nDr Financial Liability          $50,000\n    Cr Cash                          $50,000\n(Lease payment reduces liability)"
        },
        {
          title: 'Sale at NOT Fair Value',
          type: 'text',
          content: "**If sale price differs from fair value:**\n\n**Sale price BELOW fair value:**\n• Record difference as prepaid rent (asset)\n• Amortize over lease term\n• Reduces lease expense each period\n\n**Sale price ABOVE fair value:**\n• Record excess as additional financing (liability)\n• NOT a gain!\n• Reduces gain recognized (or increases loss)"
        },
        {
          title: 'Not at Fair Value Example',
          type: 'example',
          content: "**Building FV: $1,000,000**\n**Sale price: $1,100,000 (above FV)**\n**Carrying amount: $600,000**\n\n**Analysis:**\n• $100,000 excess over FV = additional financing\n• True sale proceeds = $1,000,000\n• Calculate gain on $1,000,000, not $1,100,000\n\n**Entry adjustment:**\nDr Cash                      $1,100,000\n    Cr Financial Liability (excess)  $100,000\n    Cr Other accounts as calculated...\n\n**The $100,000 extra is a loan, repaid through \"above market\" rent!**"
        },
        {
          title: 'Buyer-Lessor Accounting',
          type: 'text',
          content: "**If qualifying sale-leaseback:**\n• Record asset purchase at fair value\n• Account for lease as lessor (sales-type, direct financing, or operating)\n• Recognize any selling profit/loss per lessor guidance\n\n**If failed sale-leaseback:**\n• Record financial asset (receivable)\n• DO NOT record underlying asset\n• Earn interest over the financing term"
        },
        {
          title: '⚠️ Exam Trap: Repurchase Options',
          type: 'warning',
          content: "**Repurchase option/right analysis:**\n\n**Call option at FIXED price:**\n• Generally fails sale test\n• Seller-lessee controls whether to repurchase\n\n**Call option at FAIR VALUE:**\n• May qualify as sale\n• Option doesn't provide economic benefit beyond market\n\n**Put option (lessor can force repurchase):**\n• Generally fails sale test\n• Seller hasn't transferred risk\n\n**Variable payments that guarantee residual:**\n• May fail sale test if payments guaranteed"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sale-leaseback requires control transfer per ASC 606 to be a 'sale'",
            "Repurchase options, finance leasebacks, and guarantees can prevent sale",
            "Qualifying sale: Gain/loss only on portion transferred (not retained via leaseback)",
            "ROU asset measured at proportion of carrying amount retained",
            "Failed sale-leaseback = Financing (keep asset, record liability)",
            "Sale not at FV: Above FV = additional financing; Below FV = prepaid rent",
            "Buyer-lessor: Apply normal purchase and lessor accounting"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-009',
    section: 'FAR',
    title: "ASC 740: Deferred Taxes Overview",
    description: "Understand the asset/liability approach to accounting for income taxes and the framework for deferred tax assets and liabilities",
    order: 44,
    duration: 70,
    difficulty: 'advanced',
    topics: ["Income Taxes", "ASC 740", "Deferred Taxes"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Income tax accounting is one of the MOST HEAVILY TESTED topics on FAR! Nearly every company has deferred taxes. Understanding the difference between book income, taxable income, and the resulting deferred tax assets and liabilities is essential. Master ASC 740 and you'll conquer a major exam topic!"
        },
        {
          title: 'The Core Problem',
          type: 'text',
          content: "**Why deferred taxes exist:**\n\nGAAP (financial reporting) and the tax code have different rules!\n\n**Book income (GAAP):** Used for financial statements\n**Taxable income (IRC):** Used for tax returns\n\n**Result:** Revenues and expenses often recognized in DIFFERENT periods for book vs tax.\n\n**ASC 740 solution:** Record the tax effect of these differences as:\n• Deferred Tax Assets (future tax benefits)\n• Deferred Tax Liabilities (future tax obligations)"
        },
        {
          title: 'The Asset/Liability Approach',
          type: 'text',
          content: "**Balance sheet focus:**\n\n**Step 1:** Identify differences between book and tax basis of assets/liabilities\n\n**Step 2:** Determine if differences are temporary (will reverse) or permanent (never reverse)\n\n**Step 3:** Apply enacted tax rate to temporary differences\n\n**Step 4:** Record:\n• **Deferred Tax Liability (DTL):** Future taxable amounts\n• **Deferred Tax Asset (DTA):** Future deductible amounts"
        },
        {
          title: 'Temporary Difference Framework',
          type: 'text',
          content: "**Compare book basis vs tax basis:**\n\n**For ASSETS:**\n• Book basis > Tax basis → **DTL** (future taxable)\n• Book basis < Tax basis → **DTA** (future deductible)\n\n**For LIABILITIES:**\n• Book basis > Tax basis → **DTA** (future deductible)\n• Book basis < Tax basis → **DTL** (future taxable)\n\n**Memory tip:** Think about what happens when the asset is sold or liability is settled!"
        },
        {
          title: '🧠 Memory Aid: DTL vs DTA',
          type: 'callout',
          content: "**\"Assets high, you'll pay; Liabilities high, you'll save\"**\n\n**Asset with higher BOOK basis:**\n• More depreciation already taken for tax\n• Less depreciation left to deduct → Pay more tax later → **DTL**\n\n**Liability with higher BOOK basis:**\n• Expense recognized for book, not yet deductible for tax\n• Will deduct when paid → Save tax later → **DTA**"
        },
        {
          title: 'Common Sources of Deferred Taxes',
          type: 'table',
          headers: ['Item', 'Book vs Tax', 'Creates', 'Why'],
          rows: [
            ['Accelerated depreciation', 'Book > Tax basis', 'DTL', 'More tax depreciation taken early'],
            ['Warranty expense', 'Liability: Book > Tax', 'DTA', 'Book accrues; tax deducts when paid'],
            ['Bad debt expense', 'Allowance: Book > Tax', 'DTA', 'Book estimates; tax uses direct write-off'],
            ['Prepaid rent income', 'Liability: Book > Tax', 'DTA', 'Tax recognizes when received'],
            ['Installment sales', 'Book > Tax basis A/R', 'DTL', 'Book recognizes profit immediately'],
            ['Pension expense', 'Liability: Book > Tax', 'DTA', 'Book accrues; tax deducts when funded']
          ]
        },
        {
          title: 'Example: Accelerated Depreciation',
          type: 'example',
          content: "**Equipment cost: $100,000**\n• Book: Straight-line, 5 years → $20,000/year\n• Tax: MACRS → $40,000 Year 1\n\n**After Year 1:**\n• Book basis: $100,000 - $20,000 = $80,000\n• Tax basis: $100,000 - $40,000 = $60,000\n• **Difference: $20,000**\n\n**Book basis > Tax basis → DTL**\n\n**Why?** When asset is sold/fully depreciated, tax will have less depreciation left to deduct → higher taxable income → pay more tax.\n\n**At 21% rate:**\nDTL = $20,000 × 21% = **$4,200**"
        },
        {
          title: 'Example: Warranty Liability',
          type: 'example',
          content: "**Warranty expense accrued: $50,000**\n• Book: Liability of $50,000 (estimated)\n• Tax: $0 liability (deduct when paid)\n\n**Analysis:**\n• Liability book basis: $50,000\n• Liability tax basis: $0\n• **Book > Tax for liability → DTA**\n\n**Why?** When warranty claims are paid:\n• Book: Reduce liability (no expense)\n• Tax: Deduct payment as expense\n→ Future deduction = future tax savings\n\n**At 21% rate:**\nDTA = $50,000 × 21% = **$10,500**"
        },
        {
          title: 'The Income Tax Provision',
          type: 'text',
          content: "**Income tax expense has two components:**\n\n**1. Current Tax Expense (Benefit):**\n• Tax payable (receivable) for current year\n• Based on taxable income × current rate\n• Goes on balance sheet as liability (or asset if refund expected)\n\n**2. Deferred Tax Expense (Benefit):**\n• Change in DTL and DTA during the year\n• Increase in DTL or decrease in DTA = Deferred expense\n• Decrease in DTL or increase in DTA = Deferred benefit\n\n**Total Tax Expense = Current + Deferred**"
        },
        {
          title: 'Journal Entry Framework',
          type: 'example',
          content: "**Standard income tax entry:**\n\nDr Income Tax Expense - Current    $XXX\nDr Income Tax Expense - Deferred   $XXX*\nDr Deferred Tax Asset              $XXX (if increasing)\n    Cr Income Tax Payable              $XXX\n    Cr Deferred Tax Liability          $XXX (if increasing)\n    Cr Deferred Tax Asset              $XXX (if decreasing)\n\n*Can be credit (benefit) if DTL decreasing or DTA increasing\n\n**Total expense = Current expense + Deferred expense (or benefit)**"
        },
        {
          title: 'Calculating the Tax Provision',
          type: 'example',
          content: "**Year 1 facts:**\n• Pretax book income: $500,000\n• Taxable income: $450,000 (due to accelerated depreciation)\n• Tax rate: 21%\n• Temporary difference: $50,000\n\n**Current tax:**\n$450,000 × 21% = **$94,500 payable**\n\n**Deferred tax (DTL increase):**\n$50,000 × 21% = **$10,500**\n\n**Entry:**\nDr Income Tax Expense - Current   $94,500\nDr Income Tax Expense - Deferred  $10,500\n    Cr Income Tax Payable             $94,500\n    Cr Deferred Tax Liability         $10,500\n\n**Total tax expense: $105,000** (= $500,000 × 21%)"
        },
        {
          title: 'Tax Rate Changes',
          type: 'text',
          content: "**Use ENACTED rate expected when differences reverse:**\n\n**If tax rate changes:**\n• Adjust DTL/DTA to new rate\n• Record adjustment through income tax expense\n• In period the rate is ENACTED (not effective date)\n\n**Example:**\nDTL of $42,000 at 21% rate\nNew rate enacted: 25%\n\nNew DTL = ($42,000 ÷ 0.21) × 0.25 = $50,000\nIncrease = $8,000\n\nDr Income Tax Expense - Deferred   $8,000\n    Cr Deferred Tax Liability          $8,000"
        },
        {
          title: '⚠️ Exam Trap: Intraperiod Allocation',
          type: 'warning',
          content: "**Tax expense allocated to different income statement sections:**\n\n• **Continuing operations:** Most tax expense/benefit\n• **Discontinued operations:** Tax on disc ops income/loss\n• **OCI:** Tax on OCI items (separately stated)\n• **Equity:** Tax on equity transactions (e.g., stock compensation excess)\n\n**Key insight:** Not ALL deferred taxes go to tax expense!\n\nItems recognized in OCI → deferred tax in OCI\nItems recognized in equity → deferred tax in equity"
        },
        {
          title: 'Balance Sheet Classification',
          type: 'text',
          content: "**Under current GAAP (simplified):**\n\n**ALL deferred taxes are NONCURRENT**\n\n• Classify as noncurrent asset or liability\n• Net DTA and DTL for same tax jurisdiction\n• Present net amount per jurisdiction\n\n**Do NOT classify based on when differences reverse!**\n\n(This changed from old rules that required current/noncurrent split)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Deferred taxes arise from temporary differences between book and tax basis",
            "Asset: Book > Tax = DTL; Book < Tax = DTA",
            "Liability: Book > Tax = DTA; Book < Tax = DTL",
            "Total tax expense = Current expense + Deferred expense (benefit)",
            "Use enacted (not proposed) tax rate for DTL/DTA calculations",
            "Rate changes: Adjust DTL/DTA immediately through income tax expense",
            "All deferred taxes are noncurrent; net by jurisdiction"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-010',
    section: 'FAR',
    title: "Temporary vs Permanent Differences",
    description: "Distinguish between temporary differences that create deferred taxes and permanent differences that don't",
    order: 45,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Income Taxes", "Temporary Differences", "Permanent Differences"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The key to income tax accounting is distinguishing temporary from permanent differences. Temporary differences create deferred taxes; permanent differences do NOT. Permanent differences affect your effective tax rate calculation—a common exam topic. Get this wrong and your entire tax provision is off!"
        },
        {
          title: 'Two Types of Differences',
          type: 'text',
          content: "**Temporary Differences:**\n• Differences that WILL reverse in future periods\n• Create deferred tax assets or liabilities\n• Eventually, book income = taxable income (timing difference)\n\n**Permanent Differences:**\n• Differences that NEVER reverse\n• NO deferred tax effect\n• Items that are NEVER taxable or NEVER deductible\n• Affect effective tax rate vs statutory rate"
        },
        {
          title: 'Temporary vs Permanent Comparison',
          type: 'table',
          headers: ['Aspect', 'Temporary', 'Permanent'],
          rows: [
            ['Will reverse?', 'Yes', 'Never'],
            ['Deferred tax?', 'Yes', 'No'],
            ['Example', 'Accelerated depreciation', 'Municipal bond interest'],
            ['Effect', 'Timing of tax', 'Amount of tax'],
            ['Rate reconciliation', 'No effect', 'Yes (different effective rate)']
          ]
        },
        {
          title: 'Common Temporary Differences',
          type: 'list',
          content: [
            "**Depreciation differences:** Book (straight-line) vs Tax (accelerated/MACRS)",
            "**Bad debt expense:** Book (allowance method) vs Tax (direct write-off)",
            "**Warranty expense:** Book (accrued) vs Tax (deducted when paid)",
            "**Unearned revenue:** Book (deferred) vs Tax (recognized when received)",
            "**Installment sales:** Book (full profit) vs Tax (as collected)",
            "**Pension expense:** Book (accrued) vs Tax (funded amounts)",
            "**Prepaid expenses:** Book (asset) vs Tax (deducted when paid)",
            "**Accrued liabilities:** Book (accrued) vs Tax (deducted when paid)"
          ]
        },
        {
          title: 'Common Permanent Differences',
          type: 'list',
          content: [
            "**Tax-exempt interest:** Municipal bond interest (never taxable)",
            "**Life insurance premiums:** Officer life insurance (never deductible)",
            "**Life insurance proceeds:** Officer policy proceeds (never taxable)",
            "**Fines and penalties:** Government fines (never deductible)",
            "**50% meals limitation:** Meals expense limited for tax (partial)",
            "**Dividends received deduction:** DRD reduces taxable income",
            "**Stock-based compensation excess:** Permanent if forfeited (ASU update)"
          ]
        },
        {
          title: '🧠 Memory Aid: Permanent = Never',
          type: 'callout',
          content: "**\"If it's NEVER taxable or NEVER deductible, it's PERMANENT\"**\n\n**Never Taxable (favorable):**\n• Municipal bond interest\n• Life insurance proceeds\n• Portion of dividends (DRD)\n\n**Never Deductible (unfavorable):**\n• Fines and penalties\n• Officer life insurance premiums\n• Political contributions\n• 50% of meals (partial)\n\n**Permanent differences affect EFFECTIVE tax rate!**"
        },
        {
          title: 'Temporary Difference Example',
          type: 'example',
          content: "**Equipment depreciation:**\n• Cost: $100,000\n• Book: SL, 5 years = $20,000/year\n• Tax: MACRS = $40,000 Year 1, then declining\n\n**Year 1:**\n• Book depreciation: $20,000\n• Tax depreciation: $40,000\n• **Temporary difference: $20,000**\n\n**This WILL reverse!** In later years:\n• Tax depreciation < Book depreciation\n• Eventually total = $100,000 for both\n\n**DTL = $20,000 × 21% = $4,200**"
        },
        {
          title: 'Permanent Difference Example',
          type: 'example',
          content: "**Municipal bond interest income:**\n\n**Year 1:**\n• Book income includes: $50,000 municipal bond interest\n• Taxable income: $0 from this source\n\n**This is PERMANENT!**\n• Municipal bond interest is NEVER taxable\n• No reversal will ever occur\n• No deferred tax created\n\n**Effect on tax provision:**\n• Reduces taxable income permanently\n• Lowers effective tax rate vs statutory rate"
        },
        {
          title: 'Calculating Taxable Income',
          type: 'text',
          content: "**Start with pretax book income:**\n\n**Add/subtract temporary differences:**\n• Book income > Taxable: Add back (will reverse as deduction)\n• Book income < Taxable: Subtract (will reverse as income)\n\n**Add/subtract permanent differences:**\n• Never deductible: Add back\n• Never taxable: Subtract\n\n**= Taxable Income**\n\n**Only TEMPORARY differences affect DTL/DTA!**"
        },
        {
          title: 'Comprehensive Example',
          type: 'example',
          content: "**TaxCo Year 1:**\n• Pretax book income: $500,000\n• Municipal bond interest: $20,000 (included in book)\n• Fines paid: $5,000 (deducted for book)\n• Excess tax depreciation: $30,000\n• Warranty accrual (book only): $15,000\n\n**Taxable Income Calculation:**\nPretax book income:          $500,000\nMunicipal interest (never taxable): ($20,000)\nFines (never deductible):       $5,000\nExcess depreciation (temp):    ($30,000)\nWarranty (temp):               $15,000\n**Taxable income:            $470,000**"
        },
        {
          title: 'Deferred Tax from Example',
          type: 'example',
          content: "**From previous example at 21%:**\n\n**Temporary differences only:**\n• Depreciation: $30,000 → DTL $6,300\n• Warranty: $15,000 → DTA $3,150\n\n**Net deferred tax:**\nDTL $6,300 - DTA $3,150 = **Net DTL $3,150**\n\n**Permanent differences:**\n• Municipal interest: NO deferred tax\n• Fines: NO deferred tax\n\n**Current tax:**\n$470,000 × 21% = $98,700\n\n**Total tax expense:**\n$98,700 + $3,150 = **$101,850**"
        },
        {
          title: 'Effective Tax Rate Reconciliation',
          type: 'text',
          content: "**Disclosure requirement: Reconcile statutory to effective rate**\n\n**Format:**\nStatutory rate × Pretax income = Expected tax\n\n**Adjust for permanent differences:**\n+ Nondeductible expenses\n- Tax-exempt income\n± Credits and other items\n\n**= Actual tax expense**\n**Effective rate = Actual tax expense ÷ Pretax income**"
        },
        {
          title: 'Rate Reconciliation Example',
          type: 'example',
          content: "**Continuing TaxCo example:**\n\n**Expected tax at statutory rate:**\n$500,000 × 21% = $105,000\n\n**Permanent adjustments:**\nMunicipal interest: $20,000 × 21% = ($4,200)\nFines: $5,000 × 21% = $1,050\n\n**Actual tax expense:**\n$105,000 - $4,200 + $1,050 = **$101,850** ✓\n\n**Effective tax rate:**\n$101,850 ÷ $500,000 = **20.37%**\n\n(vs 21% statutory—lower due to tax-exempt income)"
        },
        {
          title: '⚠️ Exam Trap: Originating vs Reversing',
          type: 'warning',
          content: "**Temporary differences have two phases:**\n\n**Originating differences:**\n• First appear (book ≠ tax for first time)\n• CREATE deferred taxes\n\n**Reversing differences:**\n• Previously originated differences now reversing\n• REDUCE deferred taxes\n\n**Net effect:**\nIf originating > reversing → DT balance increases\nIf reversing > originating → DT balance decreases\n\n**Watch the DIRECTION of change!**"
        },
        {
          title: 'Special Items',
          type: 'text',
          content: "**Items requiring careful analysis:**\n\n**Deferred compensation:**\n• Book: Expense when earned\n• Tax: Deduct when paid\n• **Temporary** – DTA\n\n**Goodwill (tax-deductible):**\n• Book: Not amortized (impairment tested)\n• Tax: Amortized over 15 years\n• **Indefinite temporary** – DTL (may not reverse for a long time)\n\n**Prepaid income (deposits):**\n• Book: Defer as liability\n• Tax: Often taxable when received\n• **Temporary** – DTA"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Temporary differences WILL reverse and create DTL or DTA",
            "Permanent differences NEVER reverse and have NO deferred tax effect",
            "Common temporary: Depreciation, bad debts, warranties, unearned revenue",
            "Common permanent: Municipal interest, fines, life insurance premiums/proceeds",
            "Permanent differences cause effective rate ≠ statutory rate",
            "Rate reconciliation: Start at statutory, adjust for permanent items",
            "Originating differences create DT; reversing differences reduce DT"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-011',
    section: 'FAR',
    title: "Valuation Allowance & DTA Realization",
    description: "Master the more-likely-than-not threshold for deferred tax assets and when to record a valuation allowance",
    order: 46,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Income Taxes", "Valuation Allowance", "DTA"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "A deferred tax asset is only valuable if the company will have future taxable income to use it against! The valuation allowance reduces DTAs when realization is uncertain. This is a MAJOR exam topic and a common area of management judgment that auditors scrutinize."
        },
        {
          title: 'The Realization Question',
          type: 'text',
          content: "**Core issue:** Will the company have enough taxable income in the future to USE the DTA?\n\n**Recognition rule:**\n• Record DTA for ALL deductible temporary differences\n• BUT: Reduce by valuation allowance if realization is not MORE LIKELY THAN NOT\n\n**More likely than not = > 50% probability**\n\n**Net DTA = Gross DTA - Valuation Allowance**"
        },
        {
          title: 'Sources of Future Taxable Income',
          type: 'text',
          content: "**Four sources to consider:**\n\n**1. Future reversals of existing taxable temporary differences (DTLs)**\n• If DTL will reverse in same period as DTA → income exists\n\n**2. Future taxable income exclusive of reversing differences**\n• Profitable operations expected\n\n**3. Taxable income in carryback years (if carryback permitted)**\n• Can recover previously paid taxes\n\n**4. Tax-planning strategies**\n• Actions company could take to generate taxable income\n• Must be prudent and feasible"
        },
        {
          title: 'Evidence Evaluation',
          type: 'table',
          headers: ['Negative Evidence (Need VA)', 'Positive Evidence (No VA Needed)'],
          rows: [
            ['Cumulative losses in recent years', 'Strong earnings history (excluding loss that created DTA)'],
            ['History of NOL/credit expirations', 'Existing contracts/backlog producing taxable income'],
            ['Losses expected in early future years', 'Excess asset value over tax basis in appreciated assets'],
            ['Unsettled circumstances creating uncertainty', 'Future reversals of existing DTLs in same period'],
            ['Carryforward period too brief', 'Tax-planning strategies available']
          ]
        },
        {
          title: '🧠 Memory Aid: Valuation Allowance',
          type: 'callout',
          content: "**\"MLT + N vs P\"**\n\n**M**ore **L**ikely **T**han not (>50%) to realize?\n\n**N**egative evidence → Need valuation allowance\n**P**ositive evidence → Probably don't need VA\n\n**Weight objectively verifiable evidence more heavily!**\n\n**Remember:** Cumulative losses = strong negative evidence. Hard to overcome without compelling positive evidence!"
        },
        {
          title: 'Cumulative Loss Position',
          type: 'text',
          content: "**Three-year cumulative loss = significant negative evidence**\n\n**If company has cumulative pretax loss in 3-year period:**\n• Difficult to support DTA realization\n• Generally need objective positive evidence\n• Future projections alone usually insufficient\n\n**Objectively verifiable positive evidence needed:**\n• Existing contracts\n• Long-term sales agreements\n• Scheduled reversal of DTLs"
        },
        {
          title: 'Recording Valuation Allowance',
          type: 'example',
          content: "**LossCo has:**\n• Gross DTA: $500,000\n• Three years of cumulative losses\n• No DTLs expected to reverse\n• Limited carryforward period remaining\n\n**Analysis:**\n• Negative evidence: Cumulative losses, short carryforward\n• Positive evidence: Limited\n• Conclusion: Full VA needed\n\n**Entry:**\nDr Income Tax Expense - Deferred  $500,000\n    Cr Valuation Allowance           $500,000\n\n**Balance Sheet:**\nDTA (Gross):              $500,000\nLess: Valuation Allowance ($500,000)\n**Net DTA:                       $0**"
        },
        {
          title: 'Partial Valuation Allowance',
          type: 'example',
          content: "**PartialCo has:**\n• Gross DTA: $300,000 (NOL carryforward)\n• DTL: $100,000 (reverses in carryforward period)\n• No other taxable income sources\n\n**Analysis:**\n• DTA supportable: $100,000 (offset by DTL reversal)\n• DTA not supportable: $200,000\n\n**Valuation Allowance needed: $200,000**\n\n**Entry:**\nDr Income Tax Expense - Deferred  $200,000\n    Cr Valuation Allowance           $200,000\n\n**Net DTA: $300,000 - $200,000 = $100,000**"
        },
        {
          title: 'Reassessing Valuation Allowance',
          type: 'text',
          content: "**Review at EACH reporting date:**\n\n**If circumstances change:**\n• New positive evidence → Reduce VA (benefit)\n• New negative evidence → Increase VA (expense)\n\n**Common triggers for reducing VA:**\n• Return to profitability\n• Winning major contracts\n• New management with turnaround plan\n• Expiration of circumstances causing losses\n\n**Key:** Change in VA flows through income tax expense (continuing operations)"
        },
        {
          title: 'VA Release Example',
          type: 'example',
          content: "**Year 2: RecoveryCo becomes profitable**\n• Prior VA: $500,000\n• Now expects to utilize all DTAs\n• Reversal appropriate\n\n**Entry:**\nDr Valuation Allowance           $500,000\n    Cr Income Tax Benefit             $500,000\n\n**Effect:** Significant boost to net income!\n\n**Note:** This is why analysts watch VA closely—releasing it can dramatically improve reported earnings."
        },
        {
          title: 'Scheduling Reversal of Differences',
          type: 'text',
          content: "**Detailed scheduling may be needed:**\n\n**Match timing of:**\n• DTL reversals (source of taxable income)\n• DTA reversals (need to use against income)\n\n**Important considerations:**\n• NOL carryforwards have expiration dates (pre-2018 NOLs)\n• Post-2017 NOLs: No expiration but 80% limitation\n• Character matters: Capital losses only offset capital gains\n• Some items have specific carryforward periods"
        },
        {
          title: '⚠️ Exam Trap: NOL Carryforward Rules',
          type: 'warning',
          content: "**NOL Carryforward rules changed under TCJA!**\n\n**Pre-2018 NOLs:**\n• 2-year carryback, 20-year carryforward\n• 100% of taxable income offset allowed\n\n**Post-2017 NOLs:**\n• NO carryback (generally)\n• INDEFINITE carryforward\n• But LIMITED to 80% of taxable income\n\n**This affects VA analysis!** Indefinite carryforward = more time, but 80% limit = slower use."
        },
        {
          title: 'Disclosure Requirements',
          type: 'list',
          content: [
            "**Valuation allowance:** Beginning balance, changes, ending balance",
            "**Nature of evidence** supporting VA release (if significant)",
            "**NOL and credit carryforwards:** Amounts and expiration dates",
            "**Tax attributes by jurisdiction** if material",
            "**Uncertainties** about realization of DTAs"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Valuation allowance reduces DTA when realization not more likely than not (>50%)",
            "Four sources of future taxable income: DTL reversals, future income, carrybacks, tax planning",
            "Cumulative 3-year loss = significant negative evidence, hard to overcome",
            "Weight objectively verifiable evidence more heavily than projections",
            "Reassess VA each period; changes flow through tax expense",
            "Post-2017 NOLs: Indefinite carryforward but limited to 80% of taxable income",
            "VA release can significantly boost reported earnings"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-012',
    section: 'FAR',
    title: "Uncertain Tax Positions (FIN 48)",
    description: "Learn the two-step recognition and measurement process for uncertain tax positions under ASC 740-10",
    order: 47,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Income Taxes", "Uncertain Tax Positions", "ASC 740"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Companies often take aggressive tax positions that may not hold up under audit. ASC 740-10 (originally FIN 48) requires evaluating and potentially reserving for these uncertain positions. This is a common exam topic and a real-world issue that affects many companies' financial statements."
        },
        {
          title: 'What is an Uncertain Tax Position?',
          type: 'text',
          content: "**Definition:** A position taken in a tax return (or expected to be taken) where:\n\n• The tax treatment is uncertain\n• Tax authority may challenge on examination\n• Ultimate resolution is unclear\n\n**Examples:**\n• Aggressive deductions\n• Transfer pricing arrangements\n• R&D credit claims\n• State tax nexus positions\n• Characterization of transactions"
        },
        {
          title: 'Two-Step Process Overview',
          type: 'text',
          content: "**Step 1: RECOGNITION**\n• Is it MORE LIKELY THAN NOT (>50%) that position will be sustained?\n• Based on technical merits, assuming examination occurs\n• If YES → Recognize benefit (go to Step 2)\n• If NO → No benefit recognized\n\n**Step 2: MEASUREMENT**\n• What is the LARGEST amount of benefit that is >50% likely to be realized?\n• Cumulative probability analysis\n• May be less than full benefit claimed"
        },
        {
          title: '🧠 Memory Aid: Two Steps',
          type: 'callout',
          content: "**\"Can you WIN? How MUCH can you keep?\"**\n\n**Step 1 (Recognition):** Is it more likely than not you'll WIN if audited?\n• Technical merits analysis\n• >50% = recognize something\n\n**Step 2 (Measurement):** How MUCH can you recognize?\n• Largest amount with >50% cumulative probability\n• May not be full amount claimed"
        },
        {
          title: 'Step 1: Recognition Detail',
          type: 'text',
          content: "**More-likely-than-not threshold:**\n\n**Assumes:**\n• Position WILL be examined by tax authority\n• Tax authority has FULL knowledge of all information\n• Focus on TECHNICAL MERITS only\n\n**Do NOT consider:**\n• Detection risk\n• Likelihood of audit\n• Negotiation or settlement possibilities\n\n**If threshold not met:** Recognize NO benefit from that position"
        },
        {
          title: 'Step 2: Measurement Detail',
          type: 'text',
          content: "**Cumulative probability analysis:**\n\n**Steps:**\n1. Identify all possible outcomes\n2. Assign probabilities to each\n3. Calculate cumulative probability (from largest to smallest)\n4. Find largest amount where cumulative probability >50%\n\n**Benefit recognized = Largest amount with cumulative probability >50%**"
        },
        {
          title: 'Measurement Example',
          type: 'example',
          content: "**TaxPositionCo claims $100,000 deduction. Assessment:**\n\n| Amount Sustained | Individual Prob | Cumulative Prob |\n|-----------------|----------------|------------------|\n| $100,000        | 20%            | 20%              |\n| $80,000         | 30%            | 50%              |\n| $60,000         | 25%            | 75%   ✓ >50%     |\n| $40,000         | 15%            | 90%              |\n| $0              | 10%            | 100%             |\n\n**Step 1:** MLT sustained? Yes (75% cumulative at $60K level)\n**Step 2:** Largest with >50% cumulative = **$60,000**\n\n**Benefit recognized: $60,000** (not $100,000 claimed)"
        },
        {
          title: 'Journal Entry Impact',
          type: 'example',
          content: "**From previous example:**\n• Deduction claimed: $100,000\n• Benefit recognized: $60,000\n• Unrecognized benefit: $40,000\n• Tax rate: 21%\n\n**Tax return shows:** $100,000 deduction (full amount)\n**Financial statements show:** $60,000 benefit\n\n**Entry for unrecognized portion:**\nDr Income Tax Expense            $8,400*\n    Cr Liability for UTPs           $8,400\n\n*$40,000 × 21% = $8,400 unrecognized"
        },
        {
          title: 'Balance Sheet Classification',
          type: 'text',
          content: "**Liabilities for uncertain tax positions:**\n\n**Classified based on expected settlement timing:**\n• Current: Expected to settle within 12 months\n• Noncurrent: Settlement beyond 12 months\n\n**Often noncurrent** due to lengthy examination process\n\n**Presentation:**\n• Cannot net against deferred tax assets/liabilities (different nature)\n• Shown as separate liability (or reduce related asset)\n• If refund expected, present as asset"
        },
        {
          title: 'Interest and Penalties',
          type: 'text',
          content: "**Policy choice required:**\n\n**Interest on underpayments:**\n• Can be classified as income tax expense OR interest expense\n• Must disclose policy and apply consistently\n\n**Penalties:**\n• Can be classified as income tax expense OR other expense\n• Must disclose policy and apply consistently\n\n**Accrue when:**\n• Position does not meet recognition threshold, OR\n• For unrecognized portions of positions\n\n**Begin accruing from date unrecognized position would have been due**"
        },
        {
          title: 'Changes in Judgment',
          type: 'text',
          content: "**Reassess at EACH reporting date:**\n\n**Factors that might change assessment:**\n• New court case with similar facts\n• IRS guidance or rulings\n• Expiration of statute of limitations\n• Settlement with tax authority\n• Change in tax law\n\n**Changes recognized:**\n• In period of change\n• Through income tax expense (continuing operations)\n• Unless related to prior period discontinued operations"
        },
        {
          title: '⚠️ Exam Trap: Statute of Limitations',
          type: 'warning',
          content: "**When statute expires:**\n\n**If position was NOT recognized:**\n→ Recognize full benefit in period statute expires\n→ Tax benefit (reduces expense)\n\n**If position was PARTIALLY recognized:**\n→ Recognize remaining benefit\n→ Also release any accrued interest/penalties\n\n**Entry example (statute expires, $40,000 unrecognized):**\nDr Liability for UTPs            $8,400\nDr Accrued Interest               $X,XXX\n    Cr Income Tax Benefit            $8,400+\n    Cr Interest Expense (or Tax Exp) $X,XXX"
        },
        {
          title: 'Disclosure Requirements',
          type: 'list',
          content: [
            "**Tabular reconciliation** of unrecognized tax benefits (beginning to ending)",
            "**Amounts that would affect ETR** if recognized",
            "**Significant positions** for which resolution is reasonably possible in next 12 months",
            "**Description** of years that remain subject to examination",
            "**Interest and penalties** policy and amounts recognized",
            "**Change in unrecognized benefits** reasonably possible in next 12 months"
          ]
        },
        {
          title: 'Comprehensive Example',
          type: 'example',
          content: "**Year 1: TechCo takes aggressive R&D credit position**\n• Credit claimed: $500,000\n• MLT to sustain: 60% (passes Step 1)\n• Measurement: 70% cumulative probability at $350,000\n• Benefit recognized: $350,000\n\n**Year 1 Entry:**\nDr Income Tax Receivable        $350,000\nDr Income Tax Expense           $150,000\n    Cr Income Tax Expense - Credit   $500,000*\n\n*Or record $150,000 UTP liability\n\n**Year 3: Settled with IRS at $400,000**\nDr Income Tax Expense (Benefit) $50,000 CR\n    Cr Liability for UTP            $50,000*\n\n*Recognize additional $50,000 benefit"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Two-step process: Recognition (MLT to sustain?) then Measurement (how much?)",
            "Step 1: >50% likely to sustain on technical merits assuming full examination",
            "Step 2: Largest amount with >50% cumulative probability",
            "Assume examination occurs with full knowledge (no detection risk consideration)",
            "Interest/penalties: Policy choice for classification (tax expense vs other)",
            "Reassess each period; statute expiration = recognize full benefit",
            "Disclose tabular reconciliation and amounts that would affect effective rate"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-013',
    section: 'FAR',
    title: "Defined Benefit Pensions: Expense Components",
    description: "Master the five components of pension expense and the calculation of the pension liability/asset",
    order: 48,
    duration: 75,
    difficulty: 'advanced',
    topics: ["Pensions", "Defined Benefit", "Pension Expense"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Defined benefit pension accounting is one of the MOST COMPLEX topics on FAR! Companies promise retirement benefits and must account for this multi-decade obligation. The five-component expense calculation and funded status reporting are heavily tested. Master this and you've conquered a major FAR challenge!"
        },
        {
          title: 'Defined Benefit vs Defined Contribution',
          type: 'table',
          headers: ['Aspect', 'Defined Benefit', 'Defined Contribution'],
          rows: [
            ['Promise', 'Specific retirement benefit', 'Specific contribution amount'],
            ['Risk bearer', 'Employer', 'Employee'],
            ['Complexity', 'High (actuarial calculations)', 'Low (just record contribution)'],
            ['Balance sheet', 'May have liability or asset', 'No liability (expense = contribution)'],
            ['Examples', 'Traditional pensions', '401(k), 403(b)']
          ]
        },
        {
          title: 'Key Pension Terms',
          type: 'text',
          content: "**Projected Benefit Obligation (PBO):**\n• Present value of ALL benefits earned to date\n• Uses projected future salary levels\n• This is the LIABILITY measure\n\n**Plan Assets:**\n• Fair value of assets set aside to pay benefits\n• Held in separate trust\n\n**Funded Status:**\n• Plan Assets - PBO\n• If positive = Net pension asset (overfunded)\n• If negative = Net pension liability (underfunded)"
        },
        {
          title: 'The Five Components of Pension Expense',
          type: 'text',
          content: "**\"S-I-R-A-G\" (Some Investments Really Are Great)**\n\n**S** = Service Cost (+)\n**I** = Interest Cost (+)\n**R** = Return on Plan Assets (-)\n**A** = Amortization of Prior Service Cost (+/-)\n**G** = Gain/Loss Amortization (+/-)\n\n**Pension Expense = S + I - R ± A ± G**"
        },
        {
          title: '🧠 Memory Aid: SIRAG',
          type: 'callout',
          content: "**\"S-I-R-A-G\"**\n\n**S**ervice cost → Expense (employees working this year)\n**I**nterest cost → Expense (time value on PBO)\n**R**eturn on assets → REDUCES expense (earnings on investments)\n**A**mortization of PSC → Expense (plan changes from past)\n**G**ain/loss amortization → ± (smoothing mechanism)\n\n**Note:** Expected return reduces expense; actual return affects OCI"
        },
        {
          title: 'Component 1: Service Cost',
          type: 'text',
          content: "**Definition:** Present value of benefits earned by employees THIS PERIOD\n\n**Characteristics:**\n• Provided by actuary\n• Based on current period's work\n• Uses projected salaries (future pay increases)\n• Always INCREASES pension expense\n\n**Income statement:** Only component in OPERATING income\n\n**All other components go below operating income (or in OCI)**"
        },
        {
          title: 'Component 2: Interest Cost',
          type: 'text',
          content: "**Definition:** Increase in PBO due to passage of time\n\n**Formula:**\n**Interest Cost = Beginning PBO × Discount Rate**\n\n**Characteristics:**\n• PBO is a present value → grows with interest\n• Discount rate = high-quality corporate bond rate\n• Always INCREASES pension expense\n\n**Example:**\nBeginning PBO: $1,000,000\nDiscount rate: 5%\nInterest cost = $1,000,000 × 5% = **$50,000**"
        },
        {
          title: 'Component 3: Return on Plan Assets',
          type: 'text',
          content: "**Two types of return:**\n\n**Expected Return (affects pension expense):**\n• Beginning plan assets × Expected rate of return\n• REDUCES pension expense\n• Smoothed, predictable amount\n\n**Actual Return (affects OCI):**\n• What plan assets actually earned\n• Difference from expected = gain/loss → OCI\n\n**Formula:**\n**Expected Return = Beginning Plan Assets × Expected Rate**"
        },
        {
          title: 'Return Example',
          type: 'example',
          content: "**Beginning plan assets: $800,000**\n**Expected return: 7%**\n**Actual return: $70,000 (8.75%)**\n\n**Expected return:** $800,000 × 7% = **$56,000** (reduces expense)\n\n**Actual vs Expected:**\n• Actual: $70,000\n• Expected: $56,000\n• Gain: $14,000 → Goes to OCI (accumulated OCI)\n\n**Effect on expense:** Only $56,000 reduces expense\n**Effect on OCI:** $14,000 gain increases AOCI"
        },
        {
          title: 'Component 4: Prior Service Cost Amortization',
          type: 'text',
          content: "**Prior Service Cost (PSC):**\n• Arises when plan is amended to increase (or decrease) benefits\n• Retroactive benefits for past service\n\n**Accounting:**\n• Initially: Record in OCI (not expense)\n• Subsequently: Amortize to expense over future service period\n\n**Amortization method:**\n• Straight-line over average remaining service period of active employees\n• OR years to full eligibility (if most participants are inactive)"
        },
        {
          title: 'Component 5: Gain/Loss Amortization',
          type: 'text',
          content: "**Gains and losses arise from:**\n• Actual return ≠ Expected return\n• PBO actuarial changes (assumption changes)\n\n**Accounting:**\n• Initially: Record in OCI (not expense)\n• Subsequently: Amortize to expense using CORRIDOR approach\n\n**Corridor rule:**\nAmortize only if accumulated gain/loss exceeds:\n**Greater of: 10% of PBO or 10% of Plan Assets**\n\nAmount over corridor ÷ Average remaining service years = Amortization"
        },
        {
          title: 'Corridor Amortization Example',
          type: 'example',
          content: "**Accumulated net loss in AOCI: $150,000**\n**Beginning PBO: $1,000,000**\n**Beginning Plan Assets: $800,000**\n**Average remaining service: 10 years**\n\n**Corridor = Greater of:**\n• 10% × $1,000,000 = $100,000\n• 10% × $800,000 = $80,000\n**Corridor = $100,000**\n\n**Excess over corridor:**\n$150,000 - $100,000 = $50,000\n\n**Amortization:**\n$50,000 ÷ 10 years = **$5,000** added to pension expense"
        },
        {
          title: 'Comprehensive Pension Expense Example',
          type: 'example',
          content: "**Year 1 Pension Data:**\n• Service cost: $80,000\n• Beginning PBO: $1,000,000; Discount rate: 5%\n• Beginning plan assets: $800,000; Expected return: 7%\n• PSC amortization: $12,000\n• G/L amortization (loss): $5,000\n\n**Pension Expense Calculation:**\n\n| Component | Amount |\n|-----------|--------|\n| Service cost | $80,000 |\n| Interest cost ($1M × 5%) | $50,000 |\n| Expected return ($800K × 7%) | ($56,000) |\n| PSC amortization | $12,000 |\n| G/L amortization | $5,000 |\n| **Total Pension Expense** | **$91,000** |"
        },
        {
          title: 'Balance Sheet Presentation',
          type: 'text',
          content: "**Report FUNDED STATUS on balance sheet:**\n\n**Funded Status = Fair Value of Plan Assets - PBO**\n\n**If overfunded (assets > PBO):**\n→ Noncurrent asset (Prepaid pension cost)\n\n**If underfunded (PBO > assets):**\n→ Liability (current portion + noncurrent portion)\n\n**Amounts in AOCI:**\n• Unrecognized prior service cost\n• Unrecognized net gain or loss\n• Reported net of tax in shareholders' equity"
        },
        {
          title: '⚠️ Exam Trap: Contributions vs Expense',
          type: 'warning',
          content: "**Contributions and expense are DIFFERENT!**\n\n**Cash contribution:**\n• Increases plan assets\n• Reduces pension liability (improves funded status)\n• NOT equal to pension expense\n\n**Pension expense:**\n• Calculated using SIRAG components\n• Affects income statement\n• May be more or less than contribution\n\n**Common exam trick:** Don't confuse contribution amount with expense amount!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Pension expense = Service + Interest - Expected Return ± Amortizations (SIRAG)",
            "Service cost only component in operating income; others below or in OCI",
            "Expected return (not actual) reduces expense; difference to OCI",
            "Prior service cost: OCI initially, then amortize over service period",
            "Gains/losses: OCI initially, then corridor amortization (10% rule)",
            "Balance sheet shows funded status (Plan Assets - PBO)",
            "Contributions affect funded status, NOT pension expense"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-014',
    section: 'FAR',
    title: "OPEB: Other Post-Employment Benefits",
    description: "Understand accounting for retiree health care and other post-employment benefits beyond pensions",
    order: 49,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Pensions", "OPEB", "Retiree Benefits"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Many companies promise retirees health care, life insurance, and other benefits beyond pensions. These 'OPEB' obligations can be enormous—sometimes exceeding pension obligations! The accounting mirrors pensions but has key differences. Understanding OPEB is essential for a complete picture of employee benefit accounting."
        },
        {
          title: 'What is OPEB?',
          type: 'text',
          content: "**Other Post-Employment Benefits include:**\n\n• **Health care benefits** (most significant)\n• Life insurance for retirees\n• Legal services\n• Tuition assistance\n• Other welfare benefits provided after employment ends\n\n**NOT OPEB:**\n• Pensions (separate standard)\n• Termination benefits (different accounting)\n• Stock compensation (different standard)"
        },
        {
          title: 'OPEB vs Pension Accounting',
          type: 'table',
          headers: ['Aspect', 'Pensions', 'OPEB'],
          rows: [
            ['Obligation name', 'PBO', 'APBO (Accumulated)'],
            ['Measurement date', 'Plan year-end', 'Plan year-end'],
            ['Expected cost trend', 'Salary increase rate', 'Health care cost trend rate'],
            ['Plan assets', 'Usually funded', 'Often unfunded'],
            ['Tax treatment', 'Contributions deductible', 'Often not pre-funded (no deduction)'],
            ['Volatility', 'Moderate', 'High (health costs unpredictable)']
          ]
        },
        {
          title: 'The APBO Calculation',
          type: 'text',
          content: "**Accumulated Postretirement Benefit Obligation (APBO):**\n\n**Definition:** Present value of expected future benefits attributed to employee service rendered to date.\n\n**Key inputs:**\n• Per capita claims cost (expected cost per retiree)\n• Health care cost trend rate (expected increase in costs)\n• Discount rate (high-quality corporate bonds)\n• Mortality assumptions\n• Expected retirement age and coverage period\n\n**The APBO is the LIABILITY measure (like PBO for pensions)**"
        },
        {
          title: 'Health Care Cost Trend Rate',
          type: 'text',
          content: "**Unique to OPEB accounting!**\n\n**Definition:** Expected annual increase in per capita health care costs\n\n**Typically:**\n• Starts higher (e.g., 7-8%)\n• Grades down to ultimate rate (e.g., 4-5%)\n• Reaches ultimate rate over several years\n\n**Example:**\nYear 1: 7%\nYear 2: 6.5%\nYear 3: 6%\n...\nUltimate: 4.5%\n\n**Impact:** Higher trend rate = Higher APBO = Higher expense"
        },
        {
          title: 'OPEB Expense Components',
          type: 'text',
          content: "**Same SIRAG components as pensions:**\n\n**S** = Service cost (benefits earned this period)\n**I** = Interest cost (APBO × discount rate)\n**R** = Expected return on plan assets (if any)\n**A** = Amortization of prior service cost\n**G** = Gain/loss amortization (corridor method)\n\n**Formula:**\n**OPEB Expense = S + I - R ± A ± G**\n\n**Key difference:** R is often zero (unfunded plans)"
        },
        {
          title: 'OPEB Example',
          type: 'example',
          content: "**Year 1 OPEB Data:**\n• Service cost: $50,000\n• Beginning APBO: $500,000; Discount rate: 5%\n• Plan assets: $0 (unfunded)\n• PSC amortization: $8,000\n• No G/L amortization needed\n\n**OPEB Expense Calculation:**\n\n| Component | Amount |\n|-----------|--------|\n| Service cost | $50,000 |\n| Interest cost ($500K × 5%) | $25,000 |\n| Expected return | $0 |\n| PSC amortization | $8,000 |\n| G/L amortization | $0 |\n| **Total OPEB Expense** | **$83,000** |"
        },
        {
          title: 'Unfunded Plans',
          type: 'text',
          content: "**Most OPEB plans are unfunded or underfunded:**\n\n**Why?**\n• No tax deduction for prefunding (unlike pensions)\n• Health care costs harder to predict\n• Companies prefer to pay-as-you-go\n\n**Accounting impact:**\n• Full APBO appears as liability\n• No plan asset return to offset expense\n• Greater balance sheet impact\n• Higher reported expense"
        },
        {
          title: '🧠 Memory Aid: OPEB vs Pension',
          type: 'callout',
          content: "**\"OPEB = Often Pays Everything in Benefits (no assets!)\"**\n\n**Key differences to remember:**\n• **APBO** not PBO (Accumulated vs Projected)\n• **Health care trend rate** not salary growth\n• **Usually unfunded** = No asset return offset\n• **Medicare eligibility** affects obligation\n\n**Same SIRAG formula, different inputs!**"
        },
        {
          title: 'Attribution Period',
          type: 'text',
          content: "**When to attribute benefits:**\n\n**Pensions:** From hire date to expected retirement\n\n**OPEB:** From hire date OR date when service begins to earn OPEB, whichever is LATER\n\n**Full eligibility date:** Date when employee has earned full benefits\n\n**No attribution after full eligibility!**\n\n**Example:**\nIf plan requires 20 years service:\n• Hire age 30, retire age 65\n• Attribution: Years 30-50 (20 years to full eligibility)\n• No cost attributed from age 50-65"
        },
        {
          title: 'Plan Amendments',
          type: 'text',
          content: "**When OPEB plan is amended:**\n\n**Increases in benefits:**\n• Prior service cost (PSC) recognized in OCI\n• Amortize to expense over remaining service period\n\n**Decreases in benefits (plan curtailment):**\n• Negative PSC (prior service credit)\n• May result in immediate gain recognition\n\n**Common trend:** Companies reducing OPEB promises\n→ Watch for curtailment gains in practice"
        },
        {
          title: 'Disclosure Requirements',
          type: 'list',
          content: [
            "**Obligation and funded status:** APBO, plan assets, net liability",
            "**Components of OPEB cost:** Each SIRAG component",
            "**Assumptions:** Discount rate, health care cost trend rate, expected return",
            "**Sensitivity analysis:** Effect of 1% change in health care trend rate",
            "**Expected future benefit payments:** Next 5 years + 5-year aggregate",
            "**Expected contributions** in upcoming year"
          ]
        },
        {
          title: '⚠️ Exam Trap: Medicare Coordination',
          type: 'warning',
          content: "**Medicare affects OPEB obligations!**\n\n**At age 65, Medicare becomes primary:**\n• Employer plan becomes secondary\n• Employer cost decreases significantly\n\n**Measurement must consider:**\n• Medicare eligibility age\n• Expected Medicare coverage\n• Coordination of benefits provisions\n\n**Result:** APBO often drops at Medicare age in projections"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "OPEB = Health care and other post-employment benefits (not pensions)",
            "Uses APBO (Accumulated) instead of PBO",
            "Health care cost trend rate replaces salary growth assumption",
            "Most OPEB plans unfunded → full liability, no asset return offset",
            "Same SIRAG expense formula as pensions",
            "Attribution stops at full eligibility date (not retirement)",
            "Medicare coordination reduces employer obligation at age 65"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-015',
    section: 'FAR',
    title: "Contingencies & Commitments",
    description: "Master the recognition and disclosure criteria for loss contingencies, gain contingencies, and commitments",
    order: 50,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Contingencies", "Loss Contingencies", "Commitments"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Companies face uncertainties—lawsuits, warranties, environmental liabilities, guarantees. ASC 450 tells us when to accrue a loss, when to just disclose, and when to stay silent. Getting the probability assessment right is critical for proper financial reporting and a frequent exam topic!"
        },
        {
          title: 'What is a Contingency?',
          type: 'text',
          content: "**Definition:** An existing condition, situation, or set of circumstances involving uncertainty that will be resolved when one or more future events occur or fail to occur.\n\n**Two types:**\n• **Loss contingencies** – Potential liabilities\n• **Gain contingencies** – Potential assets\n\n**Key:** The outcome depends on uncertain future events"
        },
        {
          title: 'Loss Contingency Framework',
          type: 'text',
          content: "**Two criteria for accrual (BOTH required):**\n\n**1. Probability of loss:**\n• **Probable** – Likely to occur\n• **Reasonably possible** – More than remote but less than probable\n• **Remote** – Slight chance of occurrence\n\n**2. Amount of loss:**\n• **Reasonably estimable** – Can determine amount\n• **Not reasonably estimable** – Cannot determine\n\n**Accrue loss if:** Probable AND Reasonably Estimable"
        },
        {
          title: 'Loss Contingency Decision Tree',
          type: 'table',
          headers: ['Probability', 'Estimable', 'Accounting Treatment'],
          rows: [
            ['Probable', 'Yes', 'ACCRUE (record liability & expense)'],
            ['Probable', 'No (range exists)', 'ACCRUE minimum of range'],
            ['Probable', 'No (no estimate possible)', 'DISCLOSE only'],
            ['Reasonably possible', 'Any', 'DISCLOSE only'],
            ['Remote', 'Any', 'Generally NO disclosure*']
          ]
        },
        {
          title: '🧠 Memory Aid: PE for Accrual',
          type: 'callout',
          content: "**\"P-E\" = Probable AND Estimable**\n\nBoth required to accrue!\n\n**\"P\" without \"E\"** = Disclose (probable but can't estimate)\n**\"E\" without \"P\"** = Disclose (can estimate but only reasonably possible)\n**Neither P nor E** = Usually nothing (remote)\n\n**Think:** \"Physical Education is required\" → PE (Probable + Estimable) is required to accrue!"
        },
        {
          title: 'Accrual Entry',
          type: 'example',
          content: "**LawsuitCo is being sued for patent infringement:**\n• Probability of loss: Probable\n• Estimated amount: $500,000\n\n**Entry:**\nDr Loss from Litigation         $500,000\n    Cr Estimated Liability           $500,000\n\n**Financial statement impact:**\n• Income statement: Loss of $500,000\n• Balance sheet: Liability of $500,000"
        },
        {
          title: 'Range of Estimates',
          type: 'text',
          content: "**When loss is probable but only a range can be estimated:**\n\n**If NO amount in range is better estimate:**\n• Accrue the MINIMUM of the range\n• Disclose the range in notes\n\n**If a specific amount IS the best estimate:**\n• Accrue that amount (even if not minimum)\n• Disclose range if material\n\n**Example:**\nRange: $200,000 to $800,000\nNo amount more likely than another\n**Accrue: $200,000** (minimum)"
        },
        {
          title: 'Common Loss Contingencies',
          type: 'list',
          content: [
            "**Litigation** – Lawsuits, claims, assessments",
            "**Warranties** – Product defect obligations",
            "**Environmental** – Cleanup, remediation costs",
            "**Guarantees** – Debt guarantees, indemnifications",
            "**Self-insurance** – Uninsured portions of claims",
            "**Collectibility** – Uncollectible receivables",
            "**Expropriation** – Asset seizure by government"
          ]
        },
        {
          title: 'Warranty Example',
          type: 'example',
          content: "**ProductCo sells 10,000 widgets with 1-year warranty:**\n• Sales price: $100 each\n• Historical warranty cost: 2% of sales\n• Sales this year: $1,000,000\n\n**Analysis:**\n• Probability: Probable (warranties will be claimed)\n• Estimate: $1,000,000 × 2% = $20,000\n\n**Entry at sale:**\nDr Warranty Expense             $20,000\n    Cr Estimated Warranty Liability  $20,000\n\n**When claims paid:**\nDr Estimated Warranty Liability  $X,XXX\n    Cr Cash/Inventory               $X,XXX"
        },
        {
          title: 'Gain Contingencies',
          type: 'text',
          content: "**Asymmetric treatment!**\n\n**Gain contingencies are NEVER accrued before realization!**\n\n**Why?** Conservatism—don't count chickens before they hatch\n\n**Treatment:**\n• May disclose if probable and amount can be estimated\n• Do NOT mislead as to likelihood of realization\n• Recognize gain only when realized (contingency resolved)\n\n**Example:** Lawsuit where company is plaintiff\n→ Don't accrue until judgment collected"
        },
        {
          title: 'Subsequent Events',
          type: 'text',
          content: "**Events after balance sheet date but before issuance:**\n\n**Type I (Recognized):**\n• Provide additional evidence about conditions at balance sheet date\n• ADJUST financial statements\n• Example: Settlement of lawsuit that was pending at year-end\n\n**Type II (Disclosed):**\n• Conditions arose AFTER balance sheet date\n• DISCLOSE but don't adjust\n• Example: Major casualty loss after year-end"
        },
        {
          title: 'Disclosure Requirements',
          type: 'text',
          content: "**For loss contingencies disclosed but not accrued:**\n\n**Required disclosures:**\n• Nature of the contingency\n• Estimate of possible loss (or range)\n• Statement that estimate cannot be made (if applicable)\n\n**For accrued losses:**\n• Nature of contingency\n• Amount accrued (if not obvious from financial statements)\n• Possible additional loss beyond amount accrued"
        },
        {
          title: '⚠️ Exam Trap: Remote Guarantees',
          type: 'warning',
          content: "**Exception to \"no disclosure for remote\":**\n\n**Guarantees of indebtedness of others:**\n• Disclose even if remote!\n• FIN 45 requires disclosure of:\n  - Nature of guarantee\n  - Maximum potential payment\n  - Carrying amount of liability\n  - Recourse provisions\n\n**Why?** Users need to know about guarantee exposure regardless of probability"
        },
        {
          title: 'Commitments',
          type: 'text',
          content: "**Different from contingencies!**\n\n**Commitments:** Obligations to do something in the future\n\n**Examples:**\n• Purchase commitments (contracts to buy inventory)\n• Operating lease commitments (now on balance sheet under ASC 842)\n• Construction commitments\n• Employment contracts\n\n**Accounting:**\n• Generally disclosed only (no accrual until goods/services received)\n• Exception: Loss on firm purchase commitment → accrue if material"
        },
        {
          title: 'Purchase Commitment Loss',
          type: 'example',
          content: "**CommitCo contracted to buy 1,000 units at $50 each:**\n• Contract is firm and noncancelable\n• Market price at year-end: $35 per unit\n• Loss: ($50 - $35) × 1,000 = $15,000\n\n**Entry:**\nDr Loss on Purchase Commitment   $15,000\n    Cr Estimated Liability           $15,000\n\n**When goods received:**\nDr Inventory                     $35,000\nDr Estimated Liability           $15,000\n    Cr Cash                          $50,000"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Accrue loss contingency if BOTH probable AND reasonably estimable",
            "Reasonably possible → Disclose only",
            "Remote → Generally no disclosure (except guarantees)",
            "Range with no best estimate → Accrue minimum",
            "Gain contingencies → NEVER accrue before realization",
            "Guarantees must be disclosed even if remote",
            "Purchase commitment losses → Accrue if material"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-016',
    section: 'FAR',
    title: "Earnings Per Share: Basic & Diluted",
    description: "Master the calculation of basic and diluted EPS including the treatment of stock options, convertibles, and contingent shares",
    order: 51,
    duration: 55,
    difficulty: 'advanced',
    topics: ["EPS", "Basic EPS", "Diluted EPS"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Earnings Per Share is one of the MOST SCRUTINIZED metrics by investors and analysts! ASC 260 requires public companies to report both basic and diluted EPS. The calculations involve weighted averages, treasury stock method, if-converted method, and antidilution tests. EPS calculations are a FAR exam staple!"
        },
        {
          title: 'Basic EPS Formula',
          type: 'text',
          content: "**Basic Earnings Per Share:**\n\n**Numerator:** Net Income - Preferred Dividends\n**Denominator:** Weighted Average Common Shares Outstanding\n\n$$\\text{Basic EPS} = \\frac{\\text{Net Income} - \\text{Preferred Dividends}}{\\text{Weighted Avg Common Shares}}$$\n\n**Key points:**\n• Subtract preferred dividends (whether declared or not for cumulative)\n• Use weighted average shares (not year-end shares)\n• Stock dividends/splits retroactively adjust ALL prior periods"
        },
        {
          title: 'Weighted Average Shares',
          type: 'example',
          content: "**ShareCo share activity:**\n• January 1: 100,000 shares outstanding\n• April 1: Issue 20,000 shares\n• October 1: Repurchase 12,000 shares (treasury)\n\n**Weighted Average Calculation:**\n\n| Period | Shares | Months | Weighted |\n|--------|--------|--------|----------|\n| Jan-Mar | 100,000 | 3/12 | 25,000 |\n| Apr-Sep | 120,000 | 6/12 | 60,000 |\n| Oct-Dec | 108,000 | 3/12 | 27,000 |\n| **Total** | | | **112,000** |"
        },
        {
          title: 'Stock Dividends and Splits',
          type: 'text',
          content: "**Critical rule:** Treat as if occurred at BEGINNING of earliest period presented!\n\n**Stock dividend/split:**\n• Retroactively adjust ALL weighted average calculations\n• Adjust prior period EPS for comparability\n• No weighting for timing during year\n\n**Example:**\n10% stock dividend on September 1\n→ Multiply ALL prior shares by 1.10\n→ Adjust prior year EPS by dividing by 1.10"
        },
        {
          title: '🧠 Memory Aid: Stock Splits',
          type: 'callout',
          content: "**\"Splits go BACK!\"**\n\nStock dividends and splits are treated as if they happened at the BEGINNING of the EARLIEST period.\n\n**Why?** For comparability—you want apples to apples across periods.\n\n**Easy adjustment:** If 2-for-1 split occurs mid-year:\n• Multiply ALL prior shares by 2\n• Don't weight the split for timing"
        },
        {
          title: 'Diluted EPS: The Concept',
          type: 'text',
          content: "**Diluted EPS shows:** What EPS would be if all dilutive securities were converted/exercised.\n\n**Potentially dilutive securities:**\n• Stock options and warrants\n• Convertible bonds\n• Convertible preferred stock\n• Contingently issuable shares\n\n**Diluted EPS formula:**\n\n$$\\text{Diluted EPS} = \\frac{\\text{Adjusted Net Income}}{\\text{Adjusted Weighted Avg Shares}}$$\n\n**Include ONLY if dilutive (reduces EPS)!**"
        },
        {
          title: 'Treasury Stock Method: Options/Warrants',
          type: 'text',
          content: "**For stock options and warrants:**\n\n**Assume:**\n1. Options exercised at beginning of year (or grant date if later)\n2. Company receives exercise proceeds\n3. Proceeds used to repurchase shares at AVERAGE market price\n4. Net INCREMENTAL shares added to denominator\n\n**Formula:**\n$$\\text{Incremental Shares} = \\text{Shares from Options} - \\text{Shares Repurchased}$$\n\n**Only dilutive if:** Exercise price < Average market price (options \"in the money\")"
        },
        {
          title: 'Treasury Stock Method Example',
          type: 'example',
          content: "**Options outstanding: 10,000**\n**Exercise price: $20**\n**Average market price: $50**\n\n**Step 1: Shares from exercise**\n10,000 options = 10,000 shares\n\n**Step 2: Proceeds received**\n10,000 × $20 = $200,000\n\n**Step 3: Treasury shares repurchased**\n$200,000 ÷ $50 = 4,000 shares\n\n**Step 4: Incremental shares**\n10,000 - 4,000 = **6,000 incremental shares**\n\n**Add 6,000 to denominator for diluted EPS**"
        },
        {
          title: 'If-Converted Method: Convertible Bonds',
          type: 'text',
          content: "**For convertible bonds:**\n\n**Assume converted at beginning of year (or issue date if later):**\n\n**Numerator adjustment:**\n+ Interest expense avoided (after tax)\n\n**Denominator adjustment:**\n+ Shares that would be issued upon conversion\n\n**Formula:**\n$$\\text{Interest Saved (net)} = \\text{Interest Expense} \\times (1 - \\text{Tax Rate})$$"
        },
        {
          title: 'Convertible Bond Example',
          type: 'example',
          content: "**Convertible bonds:**\n• Face value: $1,000,000\n• Interest rate: 6%\n• Conversion: 50 shares per $1,000 bond\n• Tax rate: 21%\n\n**Numerator adjustment:**\nInterest expense: $1,000,000 × 6% = $60,000\nAfter-tax: $60,000 × (1 - 0.21) = **$47,400 added back**\n\n**Denominator adjustment:**\nBonds: $1,000,000 ÷ $1,000 = 1,000 bonds\nShares: 1,000 × 50 = **50,000 shares added**\n\n**Dilutive test:** Does adding $47,400 / 50,000 reduce EPS?"
        },
        {
          title: 'If-Converted: Convertible Preferred',
          type: 'text',
          content: "**For convertible preferred stock:**\n\n**Assume converted at beginning of year:**\n\n**Numerator adjustment:**\n+ Preferred dividends NOT subtracted (if converted, no dividend paid)\n\n**Denominator adjustment:**\n+ Shares issued upon conversion\n\n**Key difference from bonds:** NO tax effect (dividends not tax-deductible)"
        },
        {
          title: 'Antidilution Rule',
          type: 'text',
          content: "**Critical rule:** Include security ONLY if DILUTIVE!\n\n**Dilutive means:** Reduces EPS (or increases loss per share)\n\n**Test each security:**\n• Options: Exercise price < Average market price\n• Convertibles: Incremental EPS < Basic EPS\n\n**Incremental EPS for convertibles:**\n$$\\frac{\\text{Numerator Effect}}{\\text{Denominator Effect}}$$\n\n**If incremental EPS > Basic EPS → ANTIDILUTIVE → Exclude!**"
        },
        {
          title: 'Antidilution Example',
          type: 'example',
          content: "**Basic EPS = $2.00**\n\n**Convertible Bond A:**\n• Interest saved (net): $30,000\n• Shares from conversion: 20,000\n• Incremental EPS: $30,000 ÷ 20,000 = **$1.50** ← DILUTIVE ✓\n\n**Convertible Bond B:**\n• Interest saved (net): $50,000\n• Shares from conversion: 10,000\n• Incremental EPS: $50,000 ÷ 10,000 = **$5.00** ← ANTIDILUTIVE ✗\n\n**Include Bond A, EXCLUDE Bond B from diluted EPS**"
        },
        {
          title: 'Order of Entry',
          type: 'text',
          content: "**When multiple dilutive securities exist:**\n\n**Rank by incremental EPS (lowest to highest):**\n1. Include most dilutive security first\n2. Recalculate EPS\n3. Test next security against new EPS\n4. Stop if next security is antidilutive\n\n**This ensures maximum dilution is reported**\n\n**Note:** Options/warrants have zero numerator effect, so their incremental EPS = 0 → Always enter first!"
        },
        {
          title: 'Contingently Issuable Shares',
          type: 'text',
          content: "**Shares contingent on future events:**\n\n**For Basic EPS:**\n• Include if ALL contingencies are met by year-end\n\n**For Diluted EPS:**\n• Include if contingencies would be met assuming year-end is end of contingency period\n\n**Example contingencies:**\n• Earnings targets (include if met at year-end level)\n• Time-based (include if time has passed)\n• Price-based (include if price met at year-end)"
        },
        {
          title: '⚠️ Exam Trap: Loss Periods',
          type: 'warning',
          content: "**If company has a NET LOSS:**\n\n**Basic EPS:** Use the loss (loss per share)\n\n**Diluted EPS:** Usually equals Basic EPS!\n\n**Why?** Adding shares to denominator when numerator is negative makes loss per share SMALLER (less negative) = ANTIDILUTIVE!\n\n**Exception:** Convertible preferred would reduce the loss (don't subtract preferred dividend) → MAY be dilutive\n\n**Rule:** In loss periods, most securities are excluded from diluted EPS"
        },
        {
          title: 'EPS Presentation',
          type: 'text',
          content: "**Required disclosure (face of income statement):**\n\n**For each period presented:**\n• Basic EPS from continuing operations\n• Diluted EPS from continuing operations\n• Basic EPS from net income\n• Diluted EPS from net income\n\n**If discontinued operations:**\n• May present EPS from discontinued operations on face OR in notes\n\n**Per share amounts for:**\n• Each class of common stock\n• Continuing operations and net income"
        },
        {
          title: 'Comprehensive Example',
          type: 'example',
          content: "**Year-end data:**\n• Net income: $500,000\n• Preferred dividends: $50,000\n• Weighted avg shares: 100,000\n• Options: 10,000 (exercise $30, market $50)\n• Convertible bonds: Interest $40,000, tax 21%, conversion 15,000 shares\n\n**Basic EPS:**\n($500,000 - $50,000) ÷ 100,000 = **$4.50**\n\n**Treasury stock (options):**\nIncremental: 10,000 - (10,000 × $30 ÷ $50) = 4,000\n\n**If-converted (bonds):**\nNumerator add: $40,000 × 0.79 = $31,600\n\n**Diluted EPS:**\n($450,000 + $31,600) ÷ (100,000 + 4,000 + 15,000)\n= $481,600 ÷ 119,000 = **$4.05**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Basic EPS = (Net Income - Preferred Dividends) ÷ Weighted Avg Shares",
            "Stock dividends/splits: Retroactively adjust ALL periods",
            "Treasury stock method for options: Shares issued - Shares repurchased at avg price",
            "If-converted method: Add back interest (net of tax) or preferred dividends",
            "Antidilution rule: Include only if reduces EPS; exclude if increases",
            "Loss periods: Most securities are antidilutive",
            "Order: Rank securities by incremental EPS; include most dilutive first"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-017',
    section: 'FAR',
    title: "Statement of Cash Flows",
    description: "Master the preparation and classification of cash flows using both direct and indirect methods",
    order: 52,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Cash Flows", "Operating Activities", "Indirect Method"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Statement of Cash Flows reveals the ACTUAL cash movements that the accrual-based income statement hides! Understanding operating, investing, and financing classifications—plus the indirect method adjustments—is critical. Cash flow questions appear on EVERY FAR exam!"
        },
        {
          title: 'Three Categories of Cash Flows',
          type: 'table',
          headers: ['Category', 'Examples: Inflows', 'Examples: Outflows'],
          rows: [
            ['Operating', 'Cash from customers, interest received, dividends received', 'Cash to suppliers, employees, interest paid, taxes paid'],
            ['Investing', 'Sale of PP&E, sale of investments, collection of loans made', 'Purchase of PP&E, purchase of investments, loans made'],
            ['Financing', 'Issuance of stock, borrowing debt', 'Repurchase of stock, repayment of debt, dividends paid']
          ]
        },
        {
          title: '🧠 Memory Aid: OIF',
          type: 'callout',
          content: "**\"O-I-F: Operations pay for Investments through Financing\"**\n\n**Operating:** Day-to-day business (income statement related)\n**Investing:** Long-term assets (buy/sell PP&E, investments)\n**Financing:** Capital structure (debt and equity changes)\n\n**Interest paid:** Operating (even though debt is financing!)\n**Dividends paid:** Financing (distribution to owners)\n**Dividends received:** Operating (investment income)"
        },
        {
          title: 'Direct vs Indirect Method',
          type: 'text',
          content: "**Two methods for presenting OPERATING activities:**\n\n**Direct Method:**\n• Shows actual cash receipts and payments\n• Cash from customers, cash to suppliers, etc.\n• More informative but rarely used\n• If used, must provide reconciliation schedule\n\n**Indirect Method:**\n• Starts with net income\n• Adjusts for non-cash items and working capital changes\n• Most commonly used in practice\n• FASB prefers direct; most companies use indirect"
        },
        {
          title: 'Indirect Method Framework',
          type: 'text',
          content: "**Start:** Net Income\n\n**Adjust for non-cash expenses:**\n+ Depreciation and amortization\n+ Deferred taxes (increase)\n+ Stock compensation expense\n+ Losses (on asset sales, impairments)\n- Gains (on asset sales)\n\n**Adjust for working capital changes:**\n+ Decrease in current assets (except cash)\n- Increase in current assets\n+ Increase in current liabilities\n- Decrease in current liabilities\n\n**= Cash from Operating Activities**"
        },
        {
          title: 'Working Capital Adjustments',
          type: 'table',
          headers: ['Account', 'Change', 'Adjustment'],
          rows: [
            ['Accounts Receivable', 'Increase', 'SUBTRACT (sold but not collected)'],
            ['Accounts Receivable', 'Decrease', 'ADD (collected more than sold)'],
            ['Inventory', 'Increase', 'SUBTRACT (bought more than sold)'],
            ['Inventory', 'Decrease', 'ADD (sold from existing stock)'],
            ['Accounts Payable', 'Increase', 'ADD (bought but not paid)'],
            ['Accounts Payable', 'Decrease', 'SUBTRACT (paid more than bought)'],
            ['Prepaid Expenses', 'Increase', 'SUBTRACT (paid cash for future)'],
            ['Accrued Liabilities', 'Increase', 'ADD (expense not yet paid)']
          ]
        },
        {
          title: 'Indirect Method Example',
          type: 'example',
          content: "**Given:**\n• Net income: $100,000\n• Depreciation: $20,000\n• Gain on sale of equipment: $5,000\n• Increase in A/R: $15,000\n• Decrease in inventory: $8,000\n• Increase in A/P: $12,000\n\n**Cash from Operating Activities:**\n\n| Item | Amount |\n|------|--------|\n| Net income | $100,000 |\n| + Depreciation | $20,000 |\n| - Gain on sale | ($5,000) |\n| - Increase in A/R | ($15,000) |\n| + Decrease in inventory | $8,000 |\n| + Increase in A/P | $12,000 |\n| **Operating Cash Flow** | **$120,000** |"
        },
        {
          title: 'Direct Method: Operating Section',
          type: 'text',
          content: "**Direct method shows actual cash flows:**\n\n**Cash received from customers:**\nSales + Decrease in A/R (or - Increase in A/R)\n\n**Cash paid to suppliers:**\nCOGS + Increase in Inventory + Decrease in A/P\n(Adjusted for non-cash items)\n\n**Cash paid for operating expenses:**\nOperating Expenses + Increases in Prepaids + Decreases in Accruals\n(Exclude depreciation and other non-cash)\n\n**Cash paid for interest and taxes:**\nAs actually paid (different from expense if accruals changed)"
        },
        {
          title: 'Investing Activities',
          type: 'text',
          content: "**Cash flows from investing:**\n\n**Inflows:**\n• Sale of property, plant, equipment\n• Sale of investments (debt or equity securities)\n• Collection of principal on loans made to others\n• Sale of intangible assets\n\n**Outflows:**\n• Purchase of PP&E\n• Purchase of investments\n• Loans made to others\n• Capitalized software development costs\n\n**Present separately** (don't net purchases and sales)"
        },
        {
          title: 'Investing: Equipment Sale Example',
          type: 'example',
          content: "**Sold equipment:**\n• Original cost: $50,000\n• Accumulated depreciation: $35,000\n• Book value: $15,000\n• Sale price: $20,000\n• Gain: $5,000\n\n**Cash flow presentation:**\n\n**Investing activities:**\n• Proceeds from sale of equipment: **$20,000**\n\n**Operating activities (indirect):**\n• Subtract gain: **($5,000)**\n\n**The gain was included in net income, but it's not operating cash!**"
        },
        {
          title: 'Financing Activities',
          type: 'text',
          content: "**Cash flows from financing:**\n\n**Inflows:**\n• Issuance of common stock\n• Issuance of preferred stock\n• Borrowing (bonds, notes, loans)\n\n**Outflows:**\n• Repurchase of treasury stock\n• Repayment of debt principal\n• Dividends paid to shareholders\n• Payment of debt issuance costs\n\n**Note:** Interest paid is OPERATING (not financing!)"
        },
        {
          title: '⚠️ Exam Trap: Interest and Dividends',
          type: 'warning',
          content: "**Classification of interest and dividends:**\n\n**Interest PAID → Operating** (even on debt)\n**Interest RECEIVED → Operating** (even on investments)\n**Dividends RECEIVED → Operating** (investment income)\n**Dividends PAID → Financing** (distribution to owners)\n\n**Common mistake:** Classifying interest paid as financing because it relates to debt. **WRONG!** Interest expense is an operating cost."
        },
        {
          title: 'Non-Cash Transactions',
          type: 'text',
          content: "**Significant non-cash investing/financing activities:**\n\n**Disclosed separately (NOT in cash flow statement):**\n• Conversion of debt to equity\n• Acquisition of assets by assuming liabilities\n• Exchange of noncash assets\n• Capital lease transactions\n• Stock dividends\n\n**Why?** These are important but involve no cash\n\n**Present in:** Separate schedule or notes to financial statements"
        },
        {
          title: 'Free Cash Flow',
          type: 'text',
          content: "**Free Cash Flow (not GAAP, but commonly used):**\n\n$$\\text{FCF} = \\text{Operating Cash Flow} - \\text{Capital Expenditures}$$\n\n**Represents:** Cash available for debt repayment, dividends, acquisitions\n\n**Variations:**\n• FCF to Firm: Before interest\n• FCF to Equity: After interest and debt payments\n\n**Analysts love this metric!**"
        },
        {
          title: 'T-Account Approach',
          type: 'text',
          content: "**Useful technique for preparing cash flow statement:**\n\n**Create T-account for Cash:**\n• All debits = Cash inflows\n• All credits = Cash outflows\n\n**Analyze each balance sheet change:**\n• What caused the change?\n• Was cash involved?\n• What category?\n\n**Cross-check:** Net change in cash should match beginning to ending cash balance"
        },
        {
          title: 'Comprehensive Example Setup',
          type: 'example',
          content: "**Balance Sheet Changes:**\n• Cash: +$40,000 (to verify)\n• A/R: +$20,000\n• Inventory: -$15,000\n• Equipment: +$100,000 (purchased)\n• Accum Depr: +$25,000\n• A/P: +$10,000\n• Notes Payable: +$50,000 (borrowed)\n• Common Stock: +$30,000 (issued)\n• Retained Earnings: +$60,000\n\n**Income Statement:**\n• Net income: $80,000\n• Depreciation: $25,000\n• Dividends paid: $20,000"
        },
        {
          title: 'Comprehensive Example Solution',
          type: 'example',
          content: "**Operating Activities (Indirect):**\nNet income: $80,000\n+ Depreciation: $25,000\n- Increase in A/R: ($20,000)\n+ Decrease in inventory: $15,000\n+ Increase in A/P: $10,000\n**Operating CF: $110,000**\n\n**Investing Activities:**\nPurchase of equipment: ($100,000)\n**Investing CF: ($100,000)**\n\n**Financing Activities:**\nProceeds from notes: $50,000\nIssuance of stock: $30,000\nDividends paid: ($20,000)\n**Financing CF: $60,000**\n\n**Net Change in Cash:**\n$110,000 - $100,000 + $60,000 = **$70,000** ✗\n\n*(Recheck—should equal $40,000 change in cash)*"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Three categories: Operating (day-to-day), Investing (long-term assets), Financing (capital)",
            "Indirect method: Net income ± non-cash items ± working capital changes",
            "Add back non-cash expenses (depreciation, amortization, losses)",
            "Subtract gains on asset sales (cash is in investing, not operating)",
            "Interest paid = Operating; Dividends paid = Financing",
            "Non-cash transactions: Disclose separately, not in cash flow statement",
            "Verify: Net change in cash = Operating + Investing + Financing"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-001',
    section: 'FAR',
    title: "Government Accounting: Measurement Focus & Basis",
    description: "Understand the unique measurement focuses and bases of accounting used in government financial reporting",
    order: 53,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Governmental", "Measurement Focus", "Basis of Accounting"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Government accounting is fundamentally different from business accounting! Governments use different measurement focuses and bases of accounting depending on which financial statements you're looking at. Understanding these concepts is the KEY to mastering governmental accounting on FAR."
        },
        {
          title: 'Why Government Accounting is Different',
          type: 'text',
          content: "**Governments exist to provide services, not make profits!**\n\n**Key differences from business:**\n• No profit motive → Focus on accountability\n• Tax revenues are involuntary\n• Legal requirements (budgets) are paramount\n• Multiple reporting perspectives needed\n• Dual reporting: Government-wide AND Fund statements"
        },
        {
          title: 'Two Key Concepts',
          type: 'text',
          content: "**1. Measurement Focus:**\nWhat resources are being measured?\n• Economic resources (ALL assets and liabilities)\n• Current financial resources (available for spending)\n\n**2. Basis of Accounting:**\nWhen are transactions recognized?\n• Accrual basis (like business accounting)\n• Modified accrual basis (unique to governmental)"
        },
        {
          title: 'Measurement Focus Comparison',
          type: 'table',
          headers: ['Measurement Focus', 'Resources Measured', 'Used For'],
          rows: [
            ['Economic Resources', 'ALL assets and liabilities', 'Government-wide, Proprietary funds'],
            ['Current Financial Resources', 'Near-term inflows/outflows', 'Governmental funds']
          ]
        },
        {
          title: 'Basis of Accounting Comparison',
          type: 'table',
          headers: ['Basis', 'Revenue Recognition', 'Expense/Expenditure', 'Used For'],
          rows: [
            ['Full Accrual', 'When earned', 'When incurred', 'Government-wide, Proprietary'],
            ['Modified Accrual', 'Measurable & Available', 'When liability incurred', 'Governmental funds']
          ]
        },
        {
          title: '🧠 Memory Aid: Focus + Basis Combinations',
          type: 'callout',
          content: "**\"ECO for the Wide view; MOD-CUR for the Funds\"**\n\n**Government-wide statements:**\nECOnomic resources + Accrual = Full Accrual\n\n**Governmental fund statements:**\nCURrent financial resources + MODified accrual\n\n**Proprietary fund statements:**\nECOnomic resources + Accrual (like business!)"
        },
        {
          title: 'Modified Accrual: Revenue Recognition',
          type: 'text',
          content: "**Revenues recognized when BOTH:**\n\n**1. Measurable:** Amount can be determined\n**2. Available:** Collectible within current period or soon enough to pay current liabilities\n\n**\"Available\" definition:** Typically 60 days after year-end (or government's policy period)\n\n**Example:** Property taxes levied in December, collected in January → Revenue this year (if within 60 days)"
        },
        {
          title: 'Modified Accrual: Expenditures',
          type: 'text',
          content: "**Expenditures recognized when fund liability incurred:**\n\n**Except for:**\n• Debt service (principal & interest): When LEGALLY DUE\n• Compensated absences: When PAID (or matured)\n• Claims and judgments: When PAID\n• Pensions: When contribution due\n\n**Key insight:** No depreciation in governmental funds! (Capital outlays are expenditures)"
        },
        {
          title: 'The Dual Perspective',
          type: 'text',
          content: "**Governments present TWO sets of financial statements:**\n\n**1. Government-Wide Statements:**\n• Economic resources, full accrual\n• Big picture view\n• Similar to business accounting\n\n**2. Fund Financial Statements:**\n• Governmental funds: Modified accrual\n• Proprietary funds: Full accrual\n• Fiduciary funds: Full accrual\n• Detailed accountability view"
        },
        {
          title: '⚠️ Exam Trap: Fixed Assets in Governmental Funds',
          type: 'warning',
          content: "**In GOVERNMENTAL FUND statements:**\n• Capital outlays are EXPENDITURES (not capitalized!)\n• No fixed assets on fund balance sheet\n• No depreciation expense\n\n**In GOVERNMENT-WIDE statements:**\n• Capital outlays ARE capitalized\n• Fixed assets appear on Statement of Net Position\n• Depreciation IS recorded\n\n**Same transaction, different treatment!**"
        },
        {
          title: 'Reconciliation Required',
          type: 'text',
          content: "**Because of different measurement focuses:**\n\nReconciliations needed between:\n• Governmental fund balance sheet → Government-wide Statement of Net Position\n• Governmental fund statement of revenues, expenditures → Government-wide Statement of Activities\n\n**Common reconciling items:**\n• Capital assets and depreciation\n• Long-term debt\n• Accrual adjustments for revenues\n• Internal service fund balances"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Measurement focus: Economic resources (all) vs Current financial resources (near-term)",
            "Basis: Full accrual (when earned/incurred) vs Modified accrual (measurable & available)",
            "Government-wide: Economic resources + Full accrual",
            "Governmental funds: Current financial resources + Modified accrual",
            "Modified accrual revenue: Measurable AND available (typically 60 days)",
            "No depreciation or capital assets in governmental fund statements",
            "Reconciliations bridge fund statements to government-wide statements"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-002',
    section: 'FAR',
    title: "Fund Accounting: Types & Purposes",
    description: "Learn the eleven fund types used in government accounting and their purposes",
    order: 54,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Governmental", "Fund Accounting", "Fund Types"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Governments use FUNDS to track resources for specific purposes. There are 11 fund types organized into 3 categories. Knowing which fund to use for different activities—and the accounting rules for each—is essential for governmental accounting questions on FAR!"
        },
        {
          title: 'What is a Fund?',
          type: 'text',
          content: "**Definition:** A fiscal and accounting entity with a self-balancing set of accounts.\n\n**Purpose:** Track resources that must be used for specific purposes.\n\n**Why funds?** Governments must demonstrate compliance with legal requirements—funds help track restricted resources separately.\n\n**Three categories:**\n1. Governmental Funds (5 types)\n2. Proprietary Funds (2 types)\n3. Fiduciary Funds (4 types)"
        },
        {
          title: '🧠 Memory Aid: Fund Categories',
          type: 'callout',
          content: "**\"GoPro-Fi\" = Governmental, Proprietary, Fiduciary**\n\n**Governmental (5):** Government's basic services\n**G**eneral, **S**pecial Revenue, **D**ebt Service, **C**apital Projects, **P**ermanent\n→ \"**G**reat **S**tates **D**on't **C**reate **P**roblems\"\n\n**Proprietary (2):** Business-type activities\n**E**nterprise, **I**nternal Service\n→ \"**E**arning **I**ncome\"\n\n**Fiduciary (4):** Held for others\n**P**ension Trust, **I**nvestment Trust, **P**rivate-Purpose Trust, **C**ustodial\n→ \"**PIP-C**\""
        },
        {
          title: 'Governmental Funds (5)',
          type: 'table',
          headers: ['Fund', 'Purpose', 'Example'],
          rows: [
            ['General Fund', 'All activities not in other funds', 'Police, fire, general admin'],
            ['Special Revenue', 'Specific revenue sources for specific purposes', 'Gas tax for roads'],
            ['Debt Service', 'Accumulate resources for principal & interest', 'Bond payments'],
            ['Capital Projects', 'Acquire/construct major capital facilities', 'Building a new school'],
            ['Permanent', 'Principal must remain intact; earnings expendable', 'Cemetery maintenance endowment']
          ]
        },
        {
          title: 'Proprietary Funds (2)',
          type: 'table',
          headers: ['Fund', 'Purpose', 'Example'],
          rows: [
            ['Enterprise', 'Business-type activities serving external users', 'Water utility, airport, parking'],
            ['Internal Service', 'Services to other government departments', 'Central motor pool, IT services']
          ]
        },
        {
          title: 'Fiduciary Funds (4)',
          type: 'table',
          headers: ['Fund', 'Purpose', 'Example'],
          rows: [
            ['Pension Trust', 'Employee retirement benefits', 'State pension plan'],
            ['Investment Trust', 'External investment pool participants', 'County investment pool'],
            ['Private-Purpose Trust', 'Trust where principal/income benefits others', 'Scholarship for private school'],
            ['Custodial', 'Resources held temporarily for others', 'Tax collection for other governments']
          ]
        },
        {
          title: 'Measurement Focus by Fund Type',
          type: 'text',
          content: "**Governmental Funds (all 5):**\n• Current financial resources\n• Modified accrual basis\n• Focus on available resources\n\n**Proprietary Funds (both):**\n• Economic resources\n• Full accrual basis\n• Like business accounting\n\n**Fiduciary Funds (all 4):**\n• Economic resources\n• Full accrual basis\n• Track resources held for others"
        },
        {
          title: 'General Fund Specifics',
          type: 'text',
          content: "**The \"catch-all\" fund:**\n• Used for all activities NOT accounted for in another fund\n• Every government MUST have a General Fund\n• Only ONE General Fund allowed\n• Largest fund for most governments\n• Primary operating fund\n\n**Typical revenues:** Property taxes, sales taxes, fines, licenses\n**Typical expenditures:** Police, fire, general government, parks"
        },
        {
          title: 'Enterprise Fund Criteria',
          type: 'text',
          content: "**Enterprise fund REQUIRED when:**\n\n1. **Debt backed solely by fees:** Revenue bonds secured by fees only\n\n2. **Legal requirement:** Laws require cost recovery through fees\n\n3. **Pricing policy:** Fees designed to recover costs (including depreciation)\n\n**May use for:** Any activity that could be operated as a business"
        },
        {
          title: '⚠️ Exam Trap: Internal Service Funds',
          type: 'warning',
          content: "**Internal Service Fund classification:**\n\n**On government-wide statements:**\n• Usually included with GOVERNMENTAL activities (not business-type)\n• Why? They primarily serve governmental functions\n\n**Exception:** If enterprise funds are primary customers → include with business-type activities\n\n**Exam tip:** Internal Service = Governmental activities on government-wide (usually)"
        },
        {
          title: 'Fiduciary Funds: Key Points',
          type: 'text',
          content: "**Fiduciary funds are NOT included in government-wide statements!**\n\n**Why?** Resources belong to OTHERS, not the government.\n\n**Reported separately:**\n• Statement of Fiduciary Net Position\n• Statement of Changes in Fiduciary Net Position\n\n**Key change (GASB 84):** Custodial funds replaced \"Agency funds\" and now report a net position and changes."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "11 fund types in 3 categories: Governmental (5), Proprietary (2), Fiduciary (4)",
            "General Fund: Catch-all for activities not in other funds; every government has one",
            "Governmental funds: Current financial resources, modified accrual",
            "Proprietary funds: Economic resources, full accrual (like businesses)",
            "Enterprise funds: Serve external users; required if debt secured solely by fees",
            "Internal Service funds: Serve other government departments; usually reported as governmental",
            "Fiduciary funds: Held for others; NOT on government-wide statements"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-003',
    section: 'FAR',
    title: "Budgetary Accounting & Encumbrances",
    description: "Master the budgetary entries and encumbrance accounting unique to governmental funds",
    order: 55,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Governmental", "Budgetary Accounting", "Encumbrances"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Unlike businesses, governments are LEGALLY REQUIRED to adopt budgets—and they're legally bound by them! Budgetary accounting integrates the budget into the accounting system, and encumbrances help prevent overspending. These concepts are unique to government accounting and frequently tested!"
        },
        {
          title: 'Why Budget Integration?',
          type: 'text',
          content: "**Budgets are LEGALLY BINDING for governments:**\n\n• Appropriations = Legal spending authority\n• Cannot exceed appropriations (most jurisdictions)\n• Budget vs actual comparison required\n• Budgetary accounts help track compliance\n\n**Budget integration:** Recording the budget in the accounting system to track compliance throughout the year"
        },
        {
          title: 'Budgetary Accounts',
          type: 'text',
          content: "**Three budgetary accounts:**\n\n**1. Estimated Revenues (Debit):**\n• Expected inflows for the year\n• Debit = increases the account\n\n**2. Appropriations (Credit):**\n• Legal spending authority\n• Credit = increases the account\n\n**3. Budgetary Fund Balance:**\n• Plug to balance the entry\n• Debit if expected deficit; Credit if expected surplus"
        },
        {
          title: 'Budget Entry at Year Start',
          type: 'example',
          content: "**Adopted budget:**\n• Estimated revenues: $5,000,000\n• Appropriations: $4,800,000\n• Expected surplus: $200,000\n\n**Entry:**\nDr Estimated Revenues           $5,000,000\n    Cr Appropriations               $4,800,000\n    Cr Budgetary Fund Balance         $200,000\n\n**This entry sets up control accounts for the year.**"
        },
        {
          title: 'Closing Entry at Year End',
          type: 'example',
          content: "**Close budgetary accounts (reverse the opening entry):**\n\nDr Appropriations               $4,800,000\nDr Budgetary Fund Balance         $200,000\n    Cr Estimated Revenues           $5,000,000\n\n**Budgetary accounts are temporary—closed each year.**\n**The \"real\" revenues and expenditures remain in Fund Balance.**"
        },
        {
          title: 'What are Encumbrances?',
          type: 'text',
          content: "**Definition:** Commitments for future expenditures (e.g., purchase orders)\n\n**Purpose:** Reserve a portion of appropriations for committed spending\n\n**Encumbrances are NOT expenditures!**\n• They're commitments, not actual liabilities\n• Deducted from available appropriations\n• Prevent overspending\n\n**Example:** Issue PO for $10,000 of supplies → Encumber $10,000"
        },
        {
          title: 'Encumbrance Entries',
          type: 'example',
          content: "**1. Issue Purchase Order for $10,000:**\n\nDr Encumbrances                 $10,000\n    Cr Budgetary Fund Balance - \n       Reserved for Encumbrances    $10,000\n\n**2. Receive goods (actual cost $9,800):**\n\nReverse encumbrance:\nDr Budgetary Fund Balance - \n   Reserved for Encumbrances    $10,000\n    Cr Encumbrances                 $10,000\n\nRecord actual expenditure:\nDr Expenditures                  $9,800\n    Cr Vouchers Payable              $9,800"
        },
        {
          title: '🧠 Memory Aid: Encumbrance Process',
          type: 'callout',
          content: "**\"E-R-E\" = Encumber, Reverse, Expenditure**\n\n**Step 1: ENCUMBER** when PO issued\n(Dr Encumbrances, Cr Reserve)\n\n**Step 2: REVERSE** encumbrance when goods received\n(Reverse the entry—always reverse at ORIGINAL amount)\n\n**Step 3: EXPENDITURE** at actual cost\n(Dr Expenditures, Cr Vouchers Payable)\n\n**Key:** Reverse at ORIGINAL encumbrance amount, NOT actual cost!"
        },
        {
          title: 'Outstanding Encumbrances at Year-End',
          type: 'text',
          content: "**If POs are outstanding at year-end:**\n\n**Two approaches:**\n\n**1. Lapsing appropriations:**\n• Close encumbrances to Fund Balance\n• Re-encumber next year (if policy allows)\n\n**2. Non-lapsing appropriations:**\n• Encumbrances may remain open\n• Report as committed or assigned fund balance\n\n**Disclosure:** Outstanding encumbrances should be disclosed"
        },
        {
          title: 'Budgetary Comparison Schedule',
          type: 'text',
          content: "**Required supplementary information (RSI):**\n\n**Budget-to-actual comparison showing:**\n• Original budget\n• Final amended budget\n• Actual results (budgetary basis)\n• Variance\n\n**Required for:**\n• General Fund\n• Major special revenue funds with legally adopted budgets\n\n**May present on same basis as fund statements or budgetary basis with reconciliation**"
        },
        {
          title: '⚠️ Exam Trap: GAAP vs Budgetary Basis',
          type: 'warning',
          content: "**Budgetary basis may differ from GAAP!**\n\n**Common differences:**\n• Encumbrances treated as expenditures for budget\n• Different revenue recognition timing\n• Different fund structure\n\n**If different:**\n• Budget comparison on budgetary basis\n• Reconciliation to GAAP required (or explanation of differences)\n\n**Exam tip:** Watch for questions asking for \"budgetary basis\" results!"
        },
        {
          title: 'Available Appropriations',
          type: 'text',
          content: "**Calculating available spending authority:**\n\n**Available Appropriations =**\nTotal Appropriations\n- Expenditures to date\n- Outstanding Encumbrances\n\n**Example:**\nAppropriations: $1,000,000\nExpenditures: $600,000\nEncumbrances: $150,000\n**Available: $250,000**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Budgets are legally binding; budget integration tracks compliance",
            "Budgetary accounts: Estimated Revenues (Dr), Appropriations (Cr)",
            "Opening entry records budget; closing entry reverses it",
            "Encumbrances = commitments (POs); NOT expenditures",
            "Encumbrance process: Encumber → Reverse at original → Record actual expenditure",
            "Outstanding encumbrances at year-end may lapse or carry forward",
            "Budget-to-actual comparison required for General and major special revenue funds"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-004',
    section: 'FAR',
    title: "Government-Wide: Statement of Net Position",
    description: "Understand the format and content of the government-wide Statement of Net Position",
    order: 56,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Governmental", "Government-Wide", "Net Position"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The government-wide statements show the 'big picture' of a government's finances. The Statement of Net Position is like a corporate balance sheet—it shows ALL assets, liabilities, and net position using full accrual accounting. Understanding its format and components is essential for FAR!"
        },
        {
          title: 'Government-Wide vs Fund Statements',
          type: 'text',
          content: "**Government-wide statements:**\n• Full accrual, economic resources\n• Consolidate governmental and business-type activities\n• Show long-term assets and liabilities\n• Present net position (not fund balance)\n\n**Fund statements:**\n• Modified accrual for governmental funds\n• Each fund reported separately\n• Current financial resources focus\n• Present fund balance"
        },
        {
          title: 'Statement Format',
          type: 'text',
          content: "**Three columns:**\n\n**1. Governmental Activities**\n• General government functions\n• Funded primarily by taxes\n• Includes General Fund activities\n\n**2. Business-Type Activities**\n• Enterprise funds\n• Fee-based services\n• Self-supporting operations\n\n**3. Total Primary Government**\n• Combined columns"
        },
        {
          title: 'Asset Categories',
          type: 'text',
          content: "**Presented in order of liquidity:**\n\n**Current Assets:**\n• Cash and investments\n• Receivables\n• Inventories\n• Prepaid items\n\n**Noncurrent Assets:**\n• Restricted assets\n• Capital assets (net of depreciation)\n• Other long-term assets\n\n**Note:** Capital assets ONLY appear on government-wide (not governmental fund statements)"
        },
        {
          title: 'Liability Categories',
          type: 'text',
          content: "**Also in liquidity order:**\n\n**Current Liabilities:**\n• Accounts payable\n• Accrued liabilities\n• Current portion of long-term debt\n\n**Noncurrent Liabilities:**\n• Bonds payable\n• Net pension liability\n• Net OPEB liability\n• Compensated absences\n• Other long-term obligations\n\n**Note:** Long-term debt ONLY on government-wide (not governmental fund statements)"
        },
        {
          title: 'Deferred Outflows/Inflows',
          type: 'text',
          content: "**Reported separately from assets/liabilities:**\n\n**Deferred Outflows of Resources:**\n• Consumption of net position applicable to future periods\n• Example: Pension contributions after measurement date\n• Shown AFTER assets\n\n**Deferred Inflows of Resources:**\n• Acquisition of net position applicable to future periods\n• Example: Property taxes levied for next year\n• Shown AFTER liabilities"
        },
        {
          title: 'Net Position Categories',
          type: 'text',
          content: "**Three components (not fund balance!):**\n\n**1. Net Investment in Capital Assets:**\nCapital assets - Related debt - Unspent debt proceeds\n\n**2. Restricted:**\n• Externally imposed restrictions (grants, donors)\n• Constitutionally or legally imposed\n• Must be spent for specific purposes\n\n**3. Unrestricted:**\n• Available for any purpose\n• May be designated, but not restricted"
        },
        {
          title: '🧠 Memory Aid: Net Position',
          type: 'callout',
          content: "**\"NIC-RU\" = Net Investment in Capital assets, Restricted, Unrestricted**\n\n**Net Investment in Capital Assets:**\n\"What we OWN free and clear\" (capital assets minus related debt)\n\n**Restricted:**\n\"What we CAN'T spend freely\" (earmarked by others)\n\n**Unrestricted:**\n\"What we CAN use for anything\" (flexible resources)"
        },
        {
          title: 'Internal Service Fund Treatment',
          type: 'text',
          content: "**Where are Internal Service Funds reported?**\n\n**Default:** Include with GOVERNMENTAL activities\n• Internal Service funds primarily serve governmental functions\n• Consolidate and eliminate internal transactions\n\n**Exception:** If Enterprise funds are predominant participants → include with business-type activities\n\n**Key:** Assets/liabilities distributed between governmental and business-type based on services provided"
        },
        {
          title: '⚠️ Exam Trap: Fiduciary Funds',
          type: 'warning',
          content: "**Fiduciary funds are NOT on government-wide statements!**\n\n**Why?**\n• Resources belong to OTHERS\n• Government is trustee, not owner\n• Should not be mixed with government's own resources\n\n**Reported separately:**\n• Statement of Fiduciary Net Position\n• Statement of Changes in Fiduciary Net Position"
        },
        {
          title: 'Component Units',
          type: 'text',
          content: "**Legally separate entities included based on relationship:**\n\n**Discrete Presentation:**\n• Separate column(s) on government-wide statements\n• Used when entity is legally separate but accountable\n\n**Blended:**\n• Mixed with primary government data\n• Used when very closely related (essentially same as primary)\n\n**Criteria:** Financial benefit/burden, appointment authority, fiscal dependence"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Government-wide uses full accrual, economic resources focus",
            "Two activity columns: Governmental and Business-type",
            "Capital assets and long-term debt appear here (not in governmental fund statements)",
            "Deferred outflows/inflows reported separately",
            "Net Position: Net Investment in Capital Assets + Restricted + Unrestricted",
            "Internal Service funds usually included with governmental activities",
            "Fiduciary funds NOT included in government-wide statements"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-005',
    section: 'FAR',
    title: "Government-Wide: Statement of Activities",
    description: "Master the unique net cost format of the government-wide Statement of Activities",
    order: 57,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Governmental", "Government-Wide", "Statement of Activities"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Statement of Activities shows the cost of government services—and how they're funded. Its unique 'net cost' format shows which programs pay for themselves and which require tax support. Understanding this format is crucial for government-wide reporting questions!"
        },
        {
          title: 'Unique Format: Net Cost',
          type: 'text',
          content: "**Unlike a business income statement:**\n\nThe Statement of Activities shows:\n• Expenses by FUNCTION (not nature)\n• Program revenues directly related to each function\n• NET (expense) or revenue for each function\n• General revenues that support all functions\n\n**Purpose:** Show the net cost of each function to taxpayers"
        },
        {
          title: 'Statement Structure',
          type: 'text',
          content: "**Format:**\n\n**Functions/Programs** | Expenses | Program Revenues | Net (Expense) Revenue\n─────────────────────────────────────────────────────────────\nGovernmental Activities:\n  General government\n  Public safety\n  Education\n  etc.\n\nBusiness-Type Activities:\n  Water utility\n  Airport\n  etc.\n\n**Total Primary Government**\n\n**General Revenues:**\n  Taxes, Investment earnings, etc.\n\n**Change in Net Position**"
        },
        {
          title: 'Program Revenues',
          type: 'text',
          content: "**Revenues directly related to a specific function:**\n\n**1. Charges for Services:**\n• Fees charged to those who use the service\n• Example: Building permits, recreation fees, utility charges\n\n**2. Operating Grants and Contributions:**\n• Restricted for operating purposes\n• Example: Federal grant for job training\n\n**3. Capital Grants and Contributions:**\n• Restricted for capital purposes\n• Example: State grant for highway construction"
        },
        {
          title: 'General Revenues',
          type: 'text',
          content: "**Revenues NOT tied to specific programs:**\n\n• **Property taxes**\n• **Sales taxes**\n• **Unrestricted grants**\n• **Investment earnings (unless program restricted)**\n• **Gain on sale of capital assets**\n\n**Reported at bottom of statement:**\nGeneral revenues support ALL functions, so they're not allocated to specific programs."
        },
        {
          title: '🧠 Memory Aid: Program vs General Revenues',
          type: 'callout',
          content: "**\"Program revenues have a PROGRAM destination\"**\n\n**Ask:** Is this revenue DIRECTLY tied to a specific function?\n\n**YES → Program Revenue**\nExamples: Parking fees (parking function), water bills (water utility)\n\n**NO → General Revenue**\nExamples: Property tax (supports everything), unrestricted grants"
        },
        {
          title: 'Net Cost Example',
          type: 'example',
          content: "**Public Safety Function:**\n\n| Item | Amount |\n|------|--------|\n| Expenses | ($5,000,000) |\n| Charges for services (fees) | $500,000 |\n| Operating grants | $800,000 |\n| Capital grants | $200,000 |\n| **Net (Expense)** | **($3,500,000)** |\n\n**Interpretation:** Public safety costs taxpayers $3.5M (general revenues must cover this)"
        },
        {
          title: 'Change in Net Position',
          type: 'text',
          content: "**Bottom of statement shows:**\n\nNet (Expense) from all functions\n+ General Revenues\n± Special items\n± Extraordinary items\n± Transfers\n**= Change in Net Position**\n\n**This flows to Statement of Net Position** (similar to how net income flows to retained earnings)"
        },
        {
          title: 'Special and Extraordinary Items',
          type: 'text',
          content: "**Special Items:**\n• Unusual OR infrequent\n• Within management's control\n• Report separately\n\n**Extraordinary Items:**\n• Both unusual AND infrequent\n• Outside management's control\n• Report separately\n\n**Note:** GASB still uses extraordinary item concept (unlike FASB which eliminated it)"
        },
        {
          title: 'Interfund Transfers',
          type: 'text',
          content: "**Transfers between governmental and business-type:**\n\n**Reported separately on Statement of Activities**\n\n**Governmental activities:** Transfers in (out)\n**Business-type activities:** Transfers in (out)\n*These should offset to zero for total government*\n\n**Internal Service fund activity:** Eliminated in consolidation (usually)"
        },
        {
          title: '⚠️ Exam Trap: Expense vs Expenditure',
          type: 'warning',
          content: "**Government-wide uses EXPENSES (full accrual):**\n• Includes depreciation\n• Accrues pension costs\n• Accrues compensated absences\n\n**Fund statements use EXPENDITURES (modified accrual):**\n• Capital outlay, not depreciation\n• Different timing for long-term items\n\n**Exam tip:** \"Expense\" = government-wide; \"Expenditure\" = fund statements"
        },
        {
          title: 'Required Reconciliation',
          type: 'text',
          content: "**Must reconcile fund statements to government-wide:**\n\n**From governmental fund statements to government-wide:**\n\n• Add capital asset acquisitions (expenditure → capitalized)\n• Deduct depreciation expense\n• Add debt proceeds (other financing source → liability)\n• Deduct debt repayments (expenditure → reduce liability)\n• Adjust for accrual items (pensions, compensated absences)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Net cost format: Expenses minus Program Revenues = Net (Expense)",
            "Program revenues: Charges for services, operating grants, capital grants",
            "General revenues: Taxes, unrestricted grants, investment earnings",
            "Net cost shows how much general revenues must cover",
            "Change in Net Position = Net (Expense) + General Revenues ± Other items",
            "Transfers between governmental and business-type shown separately",
            "Must reconcile from fund statements to government-wide"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-006',
    section: 'FAR',
    title: "Governmental Fund Financial Statements",
    description: "Master the balance sheet and operating statement formats for governmental funds",
    order: 58,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Governmental", "Fund Statements"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Governmental fund financial statements show accountability for current financial resources—the money available to spend. Understanding the unique formats and terminology (fund balance, expenditures, other financing sources) is essential for FAR governmental questions!"
        },
        {
          title: 'Governmental Fund Statements Overview',
          type: 'text',
          content: "**Two required statements:**\n\n**1. Balance Sheet**\n• Assets = Liabilities + Deferred Inflows + Fund Balance\n• Current financial resources only\n• NO capital assets or long-term debt\n\n**2. Statement of Revenues, Expenditures, and Changes in Fund Balance**\n• Modified accrual basis\n• Expenditures (not expenses)\n• Other financing sources/uses"
        },
        {
          title: 'Balance Sheet Components',
          type: 'text',
          content: "**Assets (Current Financial Resources):**\n• Cash and investments\n• Receivables (net of allowance)\n• Due from other funds\n• Inventory and prepaids (if significant)\n\n**Liabilities:**\n• Accounts payable\n• Accrued liabilities (current only!)\n• Due to other funds\n• Deferred revenue (unavailable)\n\n**Deferred Inflows of Resources:**\n• Unavailable revenue\n• Amounts that don't meet \"available\" criteria"
        },
        {
          title: 'Fund Balance Classifications',
          type: 'text',
          content: "**Five categories (GASB 54):**\n\n**1. Nonspendable:** Can't be spent\n• Inventory, prepaid items, long-term receivables\n• Principal of permanent funds\n\n**2. Restricted:** Externally imposed constraints\n• Grants, donors, laws\n\n**3. Committed:** Self-imposed by highest authority\n• Formal action required to remove\n\n**4. Assigned:** Intended for specific purpose\n• Less formal than committed\n\n**5. Unassigned:** Available for any purpose\n• Only in General Fund (usually)"
        },
        {
          title: '🧠 Memory Aid: Fund Balance Categories',
          type: 'callout',
          content: "**\"Never Run Constantly Around Unprepared\"**\n\n**N**onspendable - Can't spend it\n**R**estricted - Others say how to use\n**C**ommitted - Council formally decided\n**A**ssigned - Management intends to use\n**U**nassigned - Free to spend anywhere\n\n**Constraint strength:** Nonspendable → Restricted → Committed → Assigned → Unassigned (strongest to weakest)"
        },
        {
          title: 'Statement of Revenues, Expenditures, and Changes in Fund Balance',
          type: 'text',
          content: "**Format:**\n\n**Revenues:**\n  Property taxes\n  Sales taxes\n  Intergovernmental\n  Charges for services\n  Fines and forfeitures\n  Investment earnings\n  **Total Revenues**\n\n**Expenditures:**\n  Current (by function)\n  Capital outlay\n  Debt service - principal\n  Debt service - interest\n  **Total Expenditures**\n\n**Excess (Deficiency)**\n\n**Other Financing Sources (Uses)**\n\n**Net Change in Fund Balance**"
        },
        {
          title: 'Expenditure Categories',
          type: 'text',
          content: "**Current expenditures by function:**\n• General government\n• Public safety\n• Public works\n• Health and welfare\n• Culture and recreation\n• Education\n\n**Capital outlay:**\n• Purchases of capital assets\n• Not capitalized in fund statements!\n\n**Debt service:**\n• Principal payments\n• Interest payments\n• When legally due"
        },
        {
          title: 'Other Financing Sources/Uses',
          type: 'text',
          content: "**Sources (inflows not from operations):**\n• Proceeds from debt issuance\n• Transfers in from other funds\n• Proceeds from capital asset sales\n• Premium on bonds issued\n\n**Uses (outflows not expenditures):**\n• Transfers out to other funds\n• Discount on bonds issued\n• Payment to refunded bond escrow"
        },
        {
          title: '⚠️ Exam Trap: Bond Proceeds',
          type: 'warning',
          content: "**Bond proceeds treatment:**\n\n**In Governmental Fund Statements:**\n• Other Financing Source (NOT a liability)\n• Full face value recorded\n• Premium = additional OFS\n• Discount = reduction of OFS\n\n**In Government-Wide Statements:**\n• Bonds payable (liability)\n• Premium/discount amortized\n\n**Exam tip:** OFS in fund statements; Liability on government-wide!"
        },
        {
          title: 'Major Fund Reporting',
          type: 'text',
          content: "**Major funds reported separately:**\n\n**Always major:**\n• General Fund\n\n**Major if meets 10% AND 5% tests:**\n• 10% of total governmental funds for that element\n• AND 5% of governmental + enterprise combined\n\n**Elements tested:** Assets, liabilities, revenues, expenditures\n\n**Non-major funds:** Aggregated in \"Other Governmental Funds\" column"
        },
        {
          title: 'Reconciliation to Government-Wide',
          type: 'text',
          content: "**Reconciliation required from fund balance to net position:**\n\n**Common adjustments:**\n\n**Add:** Capital assets\n**Subtract:** Depreciation (accumulated)\n**Add:** Long-term receivables\n**Subtract:** Long-term debt\n**Subtract:** Accrued interest payable\n**Adjust:** Internal service fund net position\n**Adjust:** Deferred inflows/outflows differences"
        },
        {
          title: 'Sample Reconciliation Items',
          type: 'example',
          content: "**Fund Balance (governmental funds):** $5,000,000\n\n**Adjustments:**\n+ Capital assets                  $50,000,000\n- Accumulated depreciation       (15,000,000)\n+ Deferred charges (bond issue)      200,000\n- Bonds payable                  (25,000,000)\n- Accrued interest                  (300,000)\n- Compensated absences            (1,500,000)\n+ Internal service fund net         1,100,000\n\n**Net Position (governmental activities):** $14,500,000"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Governmental fund balance sheet: No capital assets or long-term debt",
            "Fund balance categories: Nonspendable, Restricted, Committed, Assigned, Unassigned",
            "Expenditures include capital outlays and debt service (not expenses!)",
            "Other financing sources: Bond proceeds, transfers in",
            "General Fund always major; others if meet 10%/5% tests",
            "Reconciliation bridges fund balance to government-wide net position"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-007',
    section: 'FAR',
    title: "Proprietary Fund Financial Statements",
    description: "Learn the business-like statements for enterprise and internal service funds",
    order: 59,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Governmental", "Proprietary Funds"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Proprietary funds operate like businesses—they use full accrual accounting and prepare statements similar to commercial entities. Knowing the differences between enterprise and internal service funds, and their unique cash flow statement format, is essential for FAR!"
        },
        {
          title: 'Proprietary Funds Overview',
          type: 'text',
          content: "**Two types:**\n\n**Enterprise Funds:**\n• Serve external customers\n• User fees intended to cover costs\n• Examples: Water utility, airport, transit\n\n**Internal Service Funds:**\n• Serve other government departments\n• Costs recovered through charges\n• Examples: Motor pool, IT services, printing\n\n**Both use:** Economic resources measurement focus, full accrual basis"
        },
        {
          title: 'Required Financial Statements',
          type: 'text',
          content: "**Three required statements:**\n\n**1. Statement of Net Position**\n• Similar to balance sheet\n• Classified format (current/noncurrent)\n• Net position categories\n\n**2. Statement of Revenues, Expenses, and Changes in Net Position**\n• Operating vs nonoperating\n• Like income statement\n\n**3. Statement of Cash Flows**\n• Direct method required!\n• Four categories (unique to government)"
        },
        {
          title: 'Statement of Net Position',
          type: 'text',
          content: "**Assets:**\n• Current assets\n• Noncurrent assets\n• Capital assets (net)\n\n**Liabilities:**\n• Current liabilities\n• Noncurrent liabilities (bonds, etc.)\n\n**Net Position:**\n• Net investment in capital assets\n• Restricted\n• Unrestricted"
        },
        {
          title: 'Operating vs Nonoperating',
          type: 'text',
          content: "**Operating Revenues:**\n• Charges for services\n• Fees directly related to principal operations\n\n**Operating Expenses:**\n• Salaries, supplies, depreciation\n• Costs of providing services\n\n**Nonoperating:**\n• Interest revenue and expense\n• Grants and contributions (usually)\n• Gains/losses on asset disposal\n\n**The distinction matters for performance analysis!**"
        },
        {
          title: '🧠 Memory Aid: GASB Cash Flow Categories',
          type: 'callout',
          content: "**\"Only Nerds Count Finance\"**\n\n**O**perating activities\n**N**oncapital financing activities\n**C**apital and related financing activities\n**F**inancing from investing activities\n\n**Key difference from FASB:**\n• GASB: 4 categories (splits financing)\n• FASB: 3 categories (operating, investing, financing)"
        },
        {
          title: 'Cash Flow Categories Explained',
          type: 'table',
          headers: ['Category', 'Description', 'Examples'],
          rows: [
            ['Operating', 'Day-to-day operations', 'Customer receipts, payments to suppliers/employees'],
            ['Noncapital Financing', 'Borrowing not related to capital', 'Operating grants, transfers, short-term loans'],
            ['Capital and Related', 'Capital asset transactions', 'Capital asset purchases, bond proceeds, bond payments'],
            ['Investing', 'Investment activity', 'Interest received, investment purchases/sales']
          ]
        },
        {
          title: 'Direct Method Required',
          type: 'text',
          content: "**GASB requires direct method for operating activities:**\n\n**Cash flows from operating activities:**\n  Cash received from customers      $5,000,000\n  Cash paid to suppliers           (2,000,000)\n  Cash paid to employees           (1,500,000)\n  **Net cash from operating**       $1,500,000\n\n**Reconciliation required:**\nReconcile operating income to cash from operations (indirect method reconciliation in notes or on face)"
        },
        {
          title: 'Interest Classification',
          type: 'text',
          content: "**Under GASB (different from FASB!):**\n\n**Interest received:**\n• Investing activities\n\n**Interest paid:**\n• If related to capital debt → Capital financing\n• If related to operating debt → Noncapital financing\n\n**FASB difference:** Under FASB, interest paid/received is usually operating"
        },
        {
          title: '⚠️ Exam Trap: Internal Service Fund Reporting',
          type: 'warning',
          content: "**Internal Service Funds:**\n\n**In fund financial statements:**\n• Reported with proprietary funds\n• Separate column\n\n**On government-wide statements:**\n• Usually combined with GOVERNMENTAL activities\n• Why? They primarily serve governmental functions\n\n**Exception:** If enterprise funds are predominant users → include with business-type activities"
        },
        {
          title: 'Enterprise Fund Requirements',
          type: 'text',
          content: "**Enterprise fund REQUIRED when:**\n\n**1. Debt secured solely by fees:**\n• Revenue bonds backed only by service fees\n\n**2. Legal requirement:**\n• Law requires cost recovery through fees\n\n**3. Pricing policy:**\n• Fees designed to recover costs including depreciation\n\n**May use for:** Any activity that COULD be a business"
        },
        {
          title: 'Major Enterprise Fund Test',
          type: 'text',
          content: "**Same 10%/5% test as governmental funds:**\n\n**Major if:**\n• 10% of total enterprise funds for an element\n• AND 5% of total governmental + enterprise\n\n**Or:** Management may designate as major\n\n**Non-major:** Aggregated in \"Other Enterprise Funds\""
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Proprietary funds: Enterprise (external) and Internal Service (internal)",
            "Use economic resources focus and full accrual basis",
            "Three statements: Net Position, Revenues/Expenses, Cash Flows",
            "Cash flows: 4 categories (Operating, Noncapital financing, Capital financing, Investing)",
            "Direct method required for cash flow operating section",
            "Internal Service funds usually reported with governmental on government-wide",
            "Interest paid → financing activities (not operating as in FASB)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-008',
    section: 'FAR',
    title: "Fiduciary Fund Financial Statements",
    description: "Understand fiduciary fund reporting for resources held in trust for others",
    order: 60,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Governmental", "Fiduciary Funds"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fiduciary funds hold resources for others—pension beneficiaries, external investment pool participants, and individuals/organizations outside the government. They're NOT on government-wide statements because the government doesn't own these resources!"
        },
        {
          title: 'Fiduciary Fund Types',
          type: 'text',
          content: "**Four types (GASB 84):**\n\n**1. Pension (and OPEB) Trust Funds:**\n• Employee retirement benefits\n• Other post-employment benefits\n\n**2. Investment Trust Funds:**\n• External investment pool participants\n• Non-government entities in the pool\n\n**3. Private-Purpose Trust Funds:**\n• Trust benefits go to external parties\n• Principal and/or income for others\n\n**4. Custodial Funds:**\n• Resources held temporarily\n• Replaced old \"Agency Funds\""
        },
        {
          title: 'Required Statements',
          type: 'text',
          content: "**Two required statements:**\n\n**1. Statement of Fiduciary Net Position**\n• Assets\n• Liabilities\n• Net Position (restricted for trust purpose)\n\n**2. Statement of Changes in Fiduciary Net Position**\n• Additions\n• Deductions\n• Change in net position\n\n**Uses:** Economic resources measurement focus, full accrual basis"
        },
        {
          title: 'Statement of Fiduciary Net Position',
          type: 'text',
          content: "**Assets:**\n• Cash and investments (at fair value)\n• Receivables (contributions, interest)\n• Capital assets (if any)\n\n**Liabilities:**\n• Amounts due to beneficiaries\n• Other payables\n\n**Net Position:**\n• Restricted for pensions\n• Restricted for other purposes\n• Held in trust for participants"
        },
        {
          title: 'Statement of Changes in Fiduciary Net Position',
          type: 'text',
          content: "**Additions:**\n• Contributions (employer, employee)\n• Investment income (interest, dividends)\n• Net increase in fair value of investments\n\n**Deductions:**\n• Benefit payments\n• Administrative expenses\n• Refunds to members\n• Net decrease in fair value\n\n**Net Increase (Decrease) in Net Position**"
        },
        {
          title: '🧠 Memory Aid: Fiduciary Funds',
          type: 'callout',
          content: "**\"PIP-C\" = Pension, Investment, Private-Purpose, Custodial**\n\n**Pension:** Employee retirement $$\n**Investment:** Pool participants' $$\n**Private-Purpose:** Outsiders' trust $$\n**Custodial:** Temporarily held $$\n\n**Key:** All for OTHERS, not the government!\n**Remember:** NOT on government-wide statements!"
        },
        {
          title: 'Custodial Funds (GASB 84 Change)',
          type: 'text',
          content: "**Replaced Agency Funds:**\n\n**Old Agency Funds:**\n• Assets = Liabilities (no net position)\n• No operating statement\n\n**New Custodial Funds:**\n• Report net position\n• Report additions and deductions\n• Operating statement required\n\n**Examples:**\n• Tax collection for other governments\n• Special assessments collected\n• Pass-through grants"
        },
        {
          title: 'Investment Reporting',
          type: 'text',
          content: "**Investments reported at FAIR VALUE:**\n\n**Includes:**\n• Stocks, bonds, real estate\n• Alternative investments\n\n**Changes in fair value:**\n• Reported in Statement of Changes\n• As investment income (or deduction if negative)\n\n**Note:** This differs from governmental funds where investments may be at amortized cost"
        },
        {
          title: '⚠️ Exam Trap: Not on Government-Wide',
          type: 'warning',
          content: "**Fiduciary funds are EXCLUDED from government-wide statements!**\n\n**Why?**\n• Resources belong to OTHERS\n• Government is trustee/custodian\n• Would overstate government's resources\n\n**Where reported:**\n• Separate fiduciary fund statements only\n• In \"Fund Financial Statements\" section of CAFR\n\n**Exam tip:** If a question asks about government-wide → exclude fiduciary!"
        },
        {
          title: 'Pension Trust Fund Details',
          type: 'text',
          content: "**Most common fiduciary fund:**\n\n**Key components:**\n• Net position = Plan assets available for benefits\n• NOT the same as net pension liability\n\n**Related reporting:**\n• Government-wide shows net pension liability\n• Pension fund shows assets held\n• RSI: Schedules of employer contributions, investment returns\n\n**Note:** Net pension liability is separate from pension trust fund reporting"
        },
        {
          title: 'Fiduciary Activities Definition',
          type: 'text',
          content: "**When to use fiduciary funds (GASB 84):**\n\n**The government controls assets AND:**\n\n**1. Assets from government-mandated programs:**\n• Not entirely from government resources\n• Benefits go to external parties or other governments\n\n**2. Assets from voluntary agreements:**\n• Government is not a beneficiary\n• Assets are for benefit of others\n\n**If government is beneficiary → NOT fiduciary**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four fiduciary types: Pension Trust, Investment Trust, Private-Purpose Trust, Custodial",
            "Resources held for OTHERS, not the government",
            "NOT included in government-wide statements",
            "Two statements: Fiduciary Net Position + Changes in Fiduciary Net Position",
            "Custodial funds replaced Agency funds (now have net position and changes)",
            "Investments at fair value; changes reported as investment income",
            "Economic resources focus, full accrual basis"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-009',
    section: 'FAR',
    title: "Government Fund Accounting: General and Special Revenue",
    description: "Master the two primary governmental fund types",
    order: 59,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Governmental", "Fund Accounting"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The General Fund and Special Revenue Funds account for most of a government's day-to-day operations! Understanding how these funds work—including budgetary entries, revenue recognition, and expenditure recording—is essential for FAR governmental questions!"
        },
        {
          title: 'General Fund Overview',
          type: 'text',
          content: "**The General Fund is the \"main operating fund\":**\n\n• Accounts for all resources NOT required to be in another fund\n• Most significant fund for most governments\n• Only ONE General Fund per government\n• Records day-to-day operations\n\n**Common revenues:** Property taxes, sales taxes, fees, fines"
        },
        {
          title: 'General Fund Characteristics',
          type: 'text',
          content: "**Measurement focus:** Current financial resources\n**Basis of accounting:** Modified accrual\n\n**What appears on balance sheet:**\n• Current assets (cash, receivables, inventory)\n• Current liabilities (payables)\n• Fund balance classifications\n\n**What does NOT appear:**\n• Capital assets (no depreciation)\n• Long-term debt"
        },
        {
          title: 'Budgetary Accounting',
          type: 'text',
          content: "**Governments must adopt legal budgets:**\n\n**Recording the budget (beginning of year):**\n```\nDr: Estimated Revenues         $5,000,000\nDr: Budgetary Fund Balance       200,000\n   Cr: Appropriations           $4,800,000\n   Cr: Estimated Other Uses       400,000\n```\n\n**Reverse at year-end when closing!**\n\n**Purpose:** Legal control over spending"
        },
        {
          title: '🧠 Memory Aid: Budgetary Entries',
          type: 'callout',
          content: "**\"DEAR COCA\" for Budget Entry:**\n\n**D**ebit: **E**stimated **R**evenues (expected income)\n**C**redit: **A**ppropriations (spending authority)\n\n**Balance goes to Budgetary Fund Balance**\n\n**Surplus budget:** Credit Budgetary FB\n**Deficit budget:** Debit Budgetary FB"
        },
        {
          title: 'Special Revenue Funds',
          type: 'text',
          content: "**Account for resources restricted to specific purposes:**\n\n**Examples:**\n• Gas tax revenue → Road maintenance fund\n• Hotel tax → Tourism fund\n• Grant revenue → Grant fund\n\n**Same accounting as General Fund:**\n• Current financial resources\n• Modified accrual basis\n\n**When required:** When legally mandated OR resource provider requires"
        },
        {
          title: 'Revenue Recognition - Modified Accrual',
          type: 'text',
          content: "**Revenue recognized when:**\n\n**1. Measurable** - Amount can be reasonably estimated\n**2. Available** - Collected within availability period\n\n**Availability period:** Typically 60 days after year-end\n\n**Example:**\nProperty tax billed Dec 1, due Jan 15:\n• If collected by Feb 28 → Revenue this year\n• If collected March 15 → Deferred inflow this year"
        },
        {
          title: 'Expenditure Recognition',
          type: 'text',
          content: "**Expenditures recorded when fund liability incurred:**\n\n**Current expenditures:** When goods/services received\n**Capital outlays:** When asset acquired (not capitalized!)\n\n**Special timing rules:**\n• Debt principal/interest → When legally due\n• Compensated absences → When paid (or matured)\n• Claims/judgments → When paid\n\n**No depreciation expense in governmental funds!**"
        },
        {
          title: 'Encumbrance Accounting',
          type: 'text',
          content: "**Record purchase orders before goods received:**\n\n**When PO issued:**\n```\nDr: Encumbrances            $10,000\n   Cr: Budgetary Fund Balance  $10,000\n```\n\n**When goods received:**\n```\nDr: Budgetary Fund Balance  $10,000\n   Cr: Encumbrances            $10,000\n\nDr: Expenditures            $10,200\n   Cr: Vouchers Payable        $10,200\n```\n\n**Prevents overspending appropriations!**"
        },
        {
          title: '⚠️ Exam Trap: Outstanding Encumbrances',
          type: 'warning',
          content: "**At year-end, outstanding encumbrances:**\n\n• Close to Fund Balance - Committed or Assigned\n• NOT reported as liabilities (goods not received)\n• Represent future commitments\n\n**Next year:** May re-encumber if policy permits\n\n**On balance sheet:** Shown in Fund Balance classifications"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "General Fund: Main operating fund, only one per government",
            "Special Revenue: Restricted revenue sources, similar accounting",
            "Modified accrual: Revenue when measurable AND available",
            "Budget entry: DR Est. Revenue, CR Appropriations",
            "Encumbrances: Record POs to control spending",
            "Capital outlays: Expenditures, not capitalized",
            "Outstanding encumbrances: Close to Fund Balance"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-IV-010',
    section: 'FAR',
    title: "Capital Projects and Debt Service Funds",
    description: "Master funds for capital improvements and debt repayment",
    order: 60,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Governmental", "Fund Accounting", "Debt Service"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Capital Projects Funds account for major construction and acquisitions, while Debt Service Funds handle debt repayment. Understanding how these funds interact with long-term assets and liabilities is critical for FAR governmental questions!"
        },
        {
          title: 'Capital Projects Fund Overview',
          type: 'text',
          content: "**Account for resources used to acquire capital assets:**\n\n**Common uses:**\n• Building construction\n• Major equipment purchases\n• Infrastructure projects\n\n**Funding sources:**\n• Bond proceeds\n• Grants\n• Transfers from General Fund\n\n**Same measurement focus/basis as General Fund!**"
        },
        {
          title: 'Bond Proceeds in Capital Projects Fund',
          type: 'text',
          content: "**Recording bond issuance:**\n\n**At par:**\n```\nDr: Cash                    $1,000,000\n   Cr: Other Financing Sources $1,000,000\n```\n\n**Premium goes to Debt Service Fund:**\n```\nDr: Cash                    $1,050,000\n   Cr: OFS - Bond Proceeds     $1,000,000\n   Cr: OFS - Premium             $50,000\n```\n\n**No long-term debt recorded in Capital Projects Fund!**"
        },
        {
          title: 'Construction Expenditures',
          type: 'text',
          content: "**Construction costs are EXPENDITURES (not assets):**\n\n**Progress billings:**\n```\nDr: Expenditures           $500,000\n   Cr: Contracts Payable      $500,000\n```\n\n**Retention:**\n```\nDr: Expenditures           $50,000\n   Cr: Contracts Payable - Retention $50,000\n```\n\n**Asset appears in Government-wide statements only!**"
        },
        {
          title: '🧠 Memory Aid: Where Things Go',
          type: 'callout',
          content: "**\"Capital Projects = Cash In, Cash Out\"**\n\n**In the Capital Projects Fund:**\n• Bond proceeds (Other Financing Source)\n• Expenditures (cash going out)\n• NO capital assets\n• NO long-term debt\n\n**In Government-Wide Statements:**\n• Capital assets (construction in progress)\n• Long-term debt (bonds payable)\n\n**Two views of same transaction!**"
        },
        {
          title: 'Debt Service Fund Overview',
          type: 'text',
          content: "**Account for resources used to pay long-term debt:**\n\n**Purpose:**\n• Accumulate resources for debt payments\n• Pay principal and interest when due\n\n**Revenue sources:**\n• Transfers from General Fund\n• Property taxes dedicated to debt\n• Bond premium transferred from Capital Projects\n\n**Expenditures recognized when LEGALLY DUE!**"
        },
        {
          title: 'Debt Service Expenditures',
          type: 'text',
          content: "**Principal and interest recognized when legally due:**\n\n**NOT when accrued!**\n\n**Example:** $1M bond, interest due Jan 1 and July 1\n\nFiscal year-end June 30:\n• Interest for Jan-June: NOT recorded as expenditure\n• Interest due July 1: Expenditure in NEXT year\n\n**Exception:** If resources available and payment imminent, accrue"
        },
        {
          title: 'Fund Balance Accumulation',
          type: 'text',
          content: "**Debt Service Funds accumulate resources:**\n\n**Over time:**\n• Resources transferred in\n• Held until debt payments due\n• Expenditure only when legally due\n\n**May result in significant fund balance**\n\n**Classification:** Restricted for debt service"
        },
        {
          title: '⚠️ Exam Trap: Principal vs Interest',
          type: 'warning',
          content: "**Both principal AND interest:**\n\n• Recorded as EXPENDITURES when legally due\n• NO distinction on fund statements\n• Both reduce fund balance equally\n\n**In Government-Wide:**\n• Principal reduces bonds payable\n• Interest is expense\n\n**Different treatment between the two views!**"
        },
        {
          title: 'Reconciliation Items',
          type: 'text',
          content: "**Converting to Government-Wide:**\n\n**Add back:**\n• Capital asset purchases (recorded as expenditure)\n• Principal payments (reduced debt, not expense)\n\n**Remove:**\n• Bond proceeds (it's a liability, not revenue)\n\n**Add:**\n• Depreciation expense\n• Accrued interest (not paid yet)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Capital Projects: Major capital asset acquisitions",
            "Bond proceeds = Other Financing Sources (not revenue)",
            "Construction costs = Expenditures (not capital assets)",
            "Debt Service: Accumulates resources for debt payment",
            "Principal/interest = Expenditure when LEGALLY DUE",
            "No long-term debt in governmental fund balance sheets",
            "Reconcile to Government-Wide for complete picture"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-001',
    section: 'FAR',
    title: "NFP Statement of Financial Position",
    description: "Master the unique balance sheet format for not-for-profit organizations",
    order: 61,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Not-for-Profit", "Financial Statements"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Not-for-profit organizations—like charities, hospitals, and universities—use different financial statement formats than businesses. Understanding net asset classifications and the unique terminology is essential for NFP questions on FAR!"
        },
        {
          title: 'NFP vs Business Accounting',
          type: 'text',
          content: "**Key differences:**\n\n**Businesses:**\n• Owners' equity (stockholders, partners)\n• Focused on profit\n• Retained earnings\n\n**Not-for-profits:**\n• No owners → Net assets (not equity)\n• Mission-focused\n• Net assets classifications\n\n**NFP follows:** ASC 958 (FASB standards for NFPs)"
        },
        {
          title: 'Required Financial Statements',
          type: 'text',
          content: "**Four required statements:**\n\n**1. Statement of Financial Position** (balance sheet)\n**2. Statement of Activities** (income statement)\n**3. Statement of Cash Flows**\n**4. Statement of Functional Expenses** (required for some NFPs)\n\n**Accrual basis of accounting throughout!**"
        },
        {
          title: 'Statement of Financial Position Format',
          type: 'text',
          content: "**Assets:**\n• Current assets\n• Long-term investments\n• Property and equipment (net)\n• Other assets\n\n**Liabilities:**\n• Current liabilities\n• Long-term debt\n\n**Net Assets:**\n• Without donor restrictions\n• With donor restrictions"
        },
        {
          title: 'Net Asset Classifications (ASU 2016-14)',
          type: 'text',
          content: "**Only TWO categories now:**\n\n**1. Net Assets WITHOUT Donor Restrictions:**\n• Available for general use\n• Board may designate for specific purposes\n• Designated ≠ Restricted\n\n**2. Net Assets WITH Donor Restrictions:**\n• Purpose restrictions (use for specific activities)\n• Time restrictions (use in future periods)\n• Perpetual restrictions (endowments - principal)"
        },
        {
          title: '🧠 Memory Aid: Net Asset Categories',
          type: 'callout',
          content: "**\"With or Without\" (like the U2 song!)**\n\n**WITHOUT donor restrictions:**\n• Board can use however needed\n• \"We can live WITH or WITHOUT limitations\"\n\n**WITH donor restrictions:**\n• Donor says how/when to use\n• Purpose: \"Use for scholarships\"\n• Time: \"Use after 2025\"\n• Perpetual: \"Never spend the principal\"\n\n**Old terms (no longer used):** Unrestricted, Temporarily Restricted, Permanently Restricted"
        },
        {
          title: 'Board Designations',
          type: 'text',
          content: "**Board can designate net assets for specific uses:**\n\n**Example:** Board designates $500,000 for building fund\n\n**Classification:** Still WITHOUT donor restrictions!\n\n**Why?** Board can change its mind; donors cannot.\n\n**Disclosure:** May disclose board-designated amounts within \"without donor restrictions\" or in notes"
        },
        {
          title: 'Investment Classification',
          type: 'text',
          content: "**Investments reported at fair value:**\n\n**Exceptions (may use other methods):**\n• Equity method investments\n• Certain alternative investments\n\n**Gains/losses on investments:**\n• Generally reported as without donor restrictions\n• Unless gains are restricted by donor or law\n\n**Endowment investments:**\n• Original gift = with donor restrictions (perpetual)\n• Accumulated gains = depends on law/donor stipulations"
        },
        {
          title: '⚠️ Exam Trap: Restrictions vs Designations',
          type: 'warning',
          content: "**Donor RESTRICTIONS → With donor restrictions**\n• Externally imposed by donor\n• Cannot be changed by NFP\n\n**Board DESIGNATIONS → Without donor restrictions**\n• Internally imposed by board\n• Board can change anytime\n\n**Exam tip:** If the BOARD decided, it's NOT restricted!\n\n**Only DONORS (or law) can create restrictions.**"
        },
        {
          title: 'Liquidity Disclosure',
          type: 'text',
          content: "**Required liquidity information (ASU 2016-14):**\n\n**Qualitative:** How NFP manages liquid resources\n\n**Quantitative:** Financial assets available within one year to meet cash needs for general expenditures\n\n**Reductions for:**\n• Assets with donor restrictions\n• Assets with board designations\n• Assets not available for general use"
        },
        {
          title: 'Sample Statement Format',
          type: 'example',
          content: "**SAMPLE NFP STATEMENT OF FINANCIAL POSITION**\n\n**ASSETS**\nCash and equivalents                $500,000\nAccounts receivable                   75,000\nContributions receivable             300,000\nInvestments                        2,000,000\nProperty and equipment, net        1,500,000\n**Total Assets**                  $4,375,000\n\n**LIABILITIES**\nAccounts payable                    $125,000\nNotes payable                        400,000\n**Total Liabilities**               $525,000\n\n**NET ASSETS**\nWithout donor restrictions        $1,850,000\nWith donor restrictions            2,000,000\n**Total Net Assets**              $3,850,000\n\n**Total Liabilities and Net Assets** $4,375,000"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NFPs use 'Net Assets' instead of equity or fund balance",
            "Two net asset categories: Without donor restrictions, With donor restrictions",
            "Board designations are still 'without donor restrictions'",
            "Only donors (or law) can create true restrictions",
            "With donor restrictions includes purpose, time, and perpetual restrictions",
            "Liquidity disclosure required showing available resources",
            "Investments generally at fair value"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-002',
    section: 'FAR',
    title: "NFP Statement of Activities",
    description: "Learn how to report revenues, expenses, and changes in net assets for NFPs",
    order: 62,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Not-for-Profit", "Statement of Activities"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Statement of Activities is the NFP's 'income statement'—it shows how net assets changed during the year. Understanding revenue recognition, expense reporting, and the release of restrictions is essential for NFP questions on FAR!"
        },
        {
          title: 'Statement of Activities Overview',
          type: 'text',
          content: "**Purpose:** Show changes in net assets during the period\n\n**Format options:**\n• Single column with totals\n• Multi-column by net asset class\n\n**Key components:**\n• Revenues and gains\n• Expenses (by function or nature)\n• Releases from restrictions\n• Change in net assets"
        },
        {
          title: 'Revenue Categories',
          type: 'text',
          content: "**Common NFP revenues:**\n\n**Contributions:**\n• Cash donations\n• Promises to give (pledges)\n• Contributed services (if criteria met)\n• In-kind contributions\n\n**Earned Revenues:**\n• Program service fees\n• Membership dues\n• Sales to public\n\n**Other:**\n• Investment return\n• Special events (net)"
        },
        {
          title: 'Revenue Classification',
          type: 'text',
          content: "**Classify based on donor restrictions:**\n\n**Without donor restrictions:**\n• Unrestricted gifts\n• Earned revenues\n• Board-designated gifts\n\n**With donor restrictions:**\n• Purpose-restricted gifts\n• Time-restricted gifts\n• Gifts to endowment\n\n**Note:** Classification is based on DONOR INTENT at time of gift"
        },
        {
          title: 'Release from Restrictions',
          type: 'text',
          content: "**When restrictions are satisfied:**\n\n**Reclassification entry:**\nDecrease: Net assets WITH donor restrictions\nIncrease: Net assets WITHOUT donor restrictions\n\n**Satisfaction occurs when:**\n• Purpose accomplished (scholarships awarded)\n• Time elapsed (time restriction met)\n• Both purpose AND time met\n\n**Perpetual restrictions:** NEVER released (endowment principal)"
        },
        {
          title: '🧠 Memory Aid: Release Process',
          type: 'callout',
          content: "**\"Restricted IN, Released OUT\"**\n\n**Step 1:** Receive restricted gift → WITH restrictions (increase)\n**Step 2:** Use as intended → Release to WITHOUT (decrease WITH, increase WITHOUT)\n\n**Example:**\n• 2024: Receive $50,000 for scholarships → WITH restrictions ↑\n• 2025: Award scholarships → Release $50,000\n  - WITH restrictions ↓\n  - WITHOUT restrictions ↑\n\n**Net effect:** Revenue recognized when received; released when used"
        },
        {
          title: 'Expense Reporting',
          type: 'text',
          content: "**All expenses reduce net assets WITHOUT donor restrictions!**\n\n**Why?** Donors restrict REVENUES, not expenses. When money is spent, restrictions are released first.\n\n**Expense classification:**\n• By function (program, management, fundraising)\n• By nature (salaries, supplies, depreciation)\n• Or both (matrix format)"
        },
        {
          title: 'Functional Expense Categories',
          type: 'table',
          headers: ['Category', 'Description', 'Examples'],
          rows: [
            ['Program Services', 'Mission-related activities', 'Education programs, research, patient care'],
            ['Management & General', 'Administrative functions', 'Executive salaries, accounting, HR'],
            ['Fundraising', 'Soliciting contributions', 'Donor appeals, events, grant writing']
          ]
        },
        {
          title: 'Statement of Functional Expenses',
          type: 'text',
          content: "**Required for:**\n• Voluntary health and welfare organizations\n• Other NFPs may present voluntarily\n\n**Format:** Matrix showing:\n• Columns: Functional categories (program, M&G, fundraising)\n• Rows: Natural expense classifications (salaries, supplies, etc.)\n\n**Alternative:** Present functional expenses in notes"
        },
        {
          title: '⚠️ Exam Trap: Investment Gains on Endowments',
          type: 'warning',
          content: "**Where do endowment investment gains go?**\n\n**It depends on donor stipulation and applicable law!**\n\n**If donor specifies gains must be reinvested:**\n→ WITH donor restrictions\n\n**If donor is silent:** Follow state law (UPMIFA)\n→ Usually WITH donor restrictions until appropriated\n→ Becomes WITHOUT when board appropriates for spending\n\n**Original gift:** Always WITH restrictions (perpetual)"
        },
        {
          title: 'Special Events',
          type: 'text',
          content: "**Reporting special event revenues:**\n\n**Gross method (preferred):**\n• Gross revenues in revenue section\n• Direct costs in expense section\n\n**Net method (allowed):**\n• Net revenue in revenue section\n• Disclose gross amounts\n\n**Exchange portion:** (e.g., dinner value)\n• Report as exchange transaction\n\n**Contribution portion:** (excess over value)\n• Report as contribution"
        },
        {
          title: 'Sample Statement Format',
          type: 'example',
          content: "**STATEMENT OF ACTIVITIES**\n\n|                              | Without | With | Total |\n|------------------------------|---------|------|-------|\n| **Revenues:**               |         |      |       |\n| Contributions                | $400    | $300 | $700  |\n| Program service fees         | 200     | -    | 200   |\n| Investment return            | 50      | 25   | 75    |\n| Net assets released          | 250     | (250)| -     |\n| **Total Revenues**           | **900** |**75**|**975**|\n| **Expenses:**                |         |      |       |\n| Program services             | 500     | -    | 500   |\n| Management & general         | 100     | -    | 100   |\n| Fundraising                  | 75      | -    | 75    |\n| **Total Expenses**           | **675** | -    |**675**|\n| **Change in Net Assets**     | **225** |**75**|**300**|\n\n*(amounts in thousands)*"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Statement of Activities shows changes in both net asset classes",
            "Revenues classified based on donor restrictions at time of gift",
            "Release from restrictions when purpose/time requirement met",
            "ALL expenses reported as without donor restrictions",
            "Functional expenses: Program services, Management & General, Fundraising",
            "Endowment gains: Follow donor stipulations and state law (UPMIFA)",
            "Special events: Separate exchange portion from contribution portion"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-003',
    section: 'FAR',
    title: "NFP Statement of Cash Flows",
    description: "Understand the unique cash flow reporting requirements for not-for-profit organizations",
    order: 63,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Not-for-Profit", "Cash Flows"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "NFPs must present a Statement of Cash Flows just like businesses—but with some unique classifications. Knowing where restricted contributions and donor-restricted endowment gifts go is frequently tested on FAR!"
        },
        {
          title: 'Cash Flow Basics for NFPs',
          type: 'text',
          content: "**Same three categories as businesses:**\n\n**1. Operating Activities**\n**2. Investing Activities**\n**3. Financing Activities**\n\n**Method options:**\n• Direct method (encouraged)\n• Indirect method (allowed)\n\n**Key difference:** Classification of restricted contributions"
        },
        {
          title: 'Operating Activities',
          type: 'text',
          content: "**Cash inflows:**\n• Cash from service recipients\n• Unrestricted contributions received\n• Unrestricted dividends and interest\n• Operating grants received\n\n**Cash outflows:**\n• Cash paid to employees and suppliers\n• Cash paid for program services\n• Interest paid\n\n**Note:** Most contributions go here if unrestricted!"
        },
        {
          title: 'Investing Activities',
          type: 'text',
          content: "**Cash inflows:**\n• Proceeds from sale of investments\n• Proceeds from sale of fixed assets\n• Collection of loans made\n\n**Cash outflows:**\n• Purchases of investments\n• Purchases of property and equipment\n• Loans made to others\n\n**Similar to business investing activities**"
        },
        {
          title: 'Financing Activities',
          type: 'text',
          content: "**Cash inflows:**\n• **Contributions restricted for long-term purposes**\n• **Contributions to endowment**\n• Proceeds from borrowings\n• Interest/dividends restricted for reinvestment\n\n**Cash outflows:**\n• Repayment of debt\n• Payments on capital leases\n\n**Key NFP difference:** Donor-restricted long-term gifts are FINANCING!"
        },
        {
          title: '🧠 Memory Aid: Restricted Contribution Classification',
          type: 'callout',
          content: "**\"If it builds the future, it's FINANCING\"**\n\n**Operating Activities:**\n• Unrestricted contributions ✓\n• Purpose-restricted for CURRENT operations ✓\n\n**Financing Activities:**\n• Contributions for LONG-TERM purposes ✓\n• Endowment gifts ✓\n• Building campaign contributions ✓\n\n**Think:** Financing = Future focus; Operating = Operations now"
        },
        {
          title: 'Classification Decision Tree',
          type: 'table',
          headers: ['Contribution Type', 'Classification'],
          rows: [
            ['Unrestricted', 'Operating'],
            ['Purpose-restricted (current period)', 'Operating'],
            ['Purpose-restricted (long-term)', 'Financing'],
            ['Time-restricted (current period)', 'Operating'],
            ['Time-restricted (long-term)', 'Financing'],
            ['Endowment (perpetually restricted)', 'Financing'],
            ['Building/capital campaign', 'Financing']
          ]
        },
        {
          title: 'Interest and Dividends',
          type: 'text',
          content: "**Generally Operating Activities (like businesses)**\n\n**Exception:** If restricted for long-term purposes or endowment reinvestment:\n→ Financing Activities\n\n**Exam tip:** Most investment income is operating; only report as financing if there's a specific long-term restriction"
        },
        {
          title: '⚠️ Exam Trap: Reconciliation of Change in Net Assets',
          type: 'warning',
          content: "**If using indirect method:**\n\nStart with: Change in Net Assets (NOT just operating!)\n\n**Adjustments include:**\n• Add back: Depreciation\n• Deduct: Gains on investments\n• Add: Losses on investments\n• Adjust for changes in receivables, payables\n• **Deduct: Contributions restricted for long-term/endowment**\n\n**That last one is unique to NFPs!**"
        },
        {
          title: 'Sample Indirect Method Reconciliation',
          type: 'example',
          content: "**CASH FLOWS FROM OPERATING ACTIVITIES**\n\nChange in net assets                        $300,000\nAdjustments:\n  Depreciation                               50,000\n  Decrease in receivables                    20,000\n  Increase in accounts payable               15,000\n  Unrealized gain on investments            (30,000)\n  **Contributions restricted for:**\n    **Long-term purposes**                 **(75,000)**\n    **Endowment**                          **(25,000)**\n\n**Net cash from operating activities**      $255,000\n\n**Note:** The restricted contributions are REMOVED from operating and reported in financing"
        },
        {
          title: 'Noncash Transactions',
          type: 'text',
          content: "**Disclose significant noncash activities:**\n\n**Examples for NFPs:**\n• Receipt of donated securities\n• Receipt of donated equipment\n• Receipt of donated services (if recognized)\n• Conversion of debt to net assets\n\n**Not on face of statement:** Disclosed in notes or supplementary schedule"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NFP cash flows use same three categories as businesses",
            "Unrestricted and current-period restricted contributions → Operating",
            "Long-term restricted and endowment contributions → Financing",
            "Interest/dividends generally operating unless restricted for long-term",
            "Indirect method starts with change in TOTAL net assets",
            "Must remove financing-type contributions from operating reconciliation",
            "Disclose significant noncash activities (donated securities, equipment)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-004',
    section: 'FAR',
    title: "Contributions, Pledges & Net Assets",
    description: "Master contribution revenue recognition, pledge accounting, and net asset classification",
    order: 64,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Not-for-Profit", "Contributions", "Pledges"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Contributions are the lifeblood of many NFPs—and the accounting is tricky! Knowing when to recognize revenue from pledges, how to classify contributions, and when donated services qualify for recognition are all heavily tested on FAR!"
        },
        {
          title: 'Contribution Definition',
          type: 'text',
          content: "**Definition:** Unconditional transfer of assets (or settlement of liabilities) in a voluntary nonreciprocal transaction.\n\n**Key elements:**\n• Unconditional (no barriers to entitlement)\n• Voluntary (not required by law)\n• Nonreciprocal (donor gets nothing of value back)\n\n**Recognition:** When unconditional promise received (not when cash received!)"
        },
        {
          title: 'Conditional vs Unconditional',
          type: 'text',
          content: "**Unconditional Contribution:**\n• No barriers to overcome\n• Donor intent is clear\n• Recognize revenue immediately\n\n**Conditional Contribution:**\n• Barrier exists that must be overcome\n• Right of return (or release) if not met\n• DO NOT recognize until condition met\n\n**Example barrier:** \"$100,000 if you raise matching funds\"\n→ Conditional until matching requirement met"
        },
        {
          title: 'Identifying Barriers (Conditions)',
          type: 'text',
          content: "**Indicators of a barrier:**\n\n**1. Measurable performance requirement:**\n• Specific outputs required\n• \"Serve 500 meals\" or \"Complete building\"\n\n**2. Limiting stipulation:**\n• Limits discretion in using funds\n• More than just administrative tasks\n\n**Plus:** Right of return (or release from obligation)\n\n**Not barriers:** Administrative requirements, reporting deadlines"
        },
        {
          title: '🧠 Memory Aid: Conditional vs Unconditional',
          type: 'callout',
          content: "**\"BRR\" = Barrier + Right of Return**\n\n**Conditional gift requires BOTH:**\n• **B**arrier to entitlement\n• **R**ight of **R**eturn (or release)\n\n**If BOTH present:** Don't recognize until barrier overcome\n**If either missing:** Unconditional → Recognize now!\n\n**Think:** \"Brrrr, it's COLD!\" = CONDitional = wait to recognize"
        },
        {
          title: 'Promises to Give (Pledges)',
          type: 'text',
          content: "**Unconditional pledge = Receivable + Revenue NOW**\n\n**Recognition:**\n• At fair value when pledge received\n• Discount multi-year pledges to present value\n• Recognize in appropriate net asset class\n\n**Allowance:** Establish allowance for uncollectible pledges\n\n**Conditional pledges:** Record when condition met"
        },
        {
          title: 'Multi-Year Pledges',
          type: 'example',
          content: "**Donor pledges $100,000 payable over 5 years ($20,000/year)**\n\n**At pledge date (assume 5% discount rate):**\n\nPV of $20,000 annuity for 5 years @ 5% = $86,590\n\n**Entry:**\nDr Pledges Receivable - Current      $20,000\nDr Pledges Receivable - Noncurrent   $66,590\nDr Discount on Pledges               $13,410\n    Cr Contribution Revenue - \n       With Restrictions              $86,590\n\n**Each year:** Amortize discount as contribution revenue"
        },
        {
          title: 'Classification by Restriction',
          type: 'text',
          content: "**Donor restrictions determine classification:**\n\n**Without donor restrictions:**\n• No restrictions imposed by donor\n• Available for general use\n\n**With donor restrictions:**\n• Purpose restrictions: Use for specific activities\n• Time restrictions: Use in future periods\n• Perpetual: Never spend principal (endowments)\n\n**Multi-year pledges:** Inherently time-restricted (unless donor says otherwise)"
        },
        {
          title: 'Contributed Services',
          type: 'text',
          content: "**Recognize contributed services ONLY if they:**\n\n**1. Create or enhance nonfinancial assets**\nOR\n**2. Require specialized skills AND would be purchased if not donated**\n\n**Specialized skills:**\n• Accounting, legal, medical\n• Construction, teaching\n• Other professional services\n\n**NOT recognized:** General volunteer time, donated administrative help"
        },
        {
          title: '⚠️ Exam Trap: Volunteer Time',
          type: 'warning',
          content: "**Most volunteer time is NOT recognized!**\n\n**Recognized:**\n• CPA donates audit services ✓\n• Doctor provides free clinic hours ✓\n• Electrician wires new building ✓\n\n**NOT recognized:**\n• Volunteers answer phones ✗\n• Board members attend meetings ✗\n• Parents help at school events ✗\n\n**Test:** Would you PAY for this AND does it require SPECIALIZED skills?"
        },
        {
          title: 'Contributed Goods',
          type: 'text',
          content: "**Recognize at fair value when received:**\n\n**Types:**\n• Donated inventory (food bank supplies)\n• Donated equipment\n• Donated securities\n• Donated real estate\n\n**Entry:**\nDr [Asset]                 Fair Value\n    Cr Contribution Revenue     Fair Value\n\n**Note:** May be restricted or unrestricted based on donor intent"
        },
        {
          title: 'Collection Items',
          type: 'text',
          content: "**Works of art, historical treasures, similar items:**\n\n**May capitalize OR not capitalize if ALL three:**\n1. Held for public exhibition/education/research\n2. Protected, unencumbered, preserved\n3. Proceeds from sale used to acquire other collection items\n\n**If capitalized:** Recognize as revenue\n**If not capitalized:** Must disclose policy"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Contributions recognized when unconditional (barrier + return right = conditional)",
            "Pledges recognized at present value when unconditional promise received",
            "Multi-year pledges are discounted; inherently time-restricted",
            "Contributed services: Only if specialized skills AND would purchase OR enhance assets",
            "Volunteer time generally NOT recognized",
            "Contributed goods at fair value when received",
            "Collection items may or may not be capitalized (NFP choice if criteria met)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-005',
    section: 'FAR',
    title: "Split-Interest Agreements",
    description: "Learn the accounting for charitable remainder trusts, gift annuities, and other split-interest agreements",
    order: 65,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Not-for-Profit", "Split-Interest Agreements"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Split-interest agreements are complex arrangements where donors make gifts that benefit both themselves (or others) AND the NFP. Understanding these arrangements—particularly charitable remainder trusts and gift annuities—is tested on FAR and trips up many candidates!"
        },
        {
          title: 'What is a Split-Interest Agreement?',
          type: 'text',
          content: "**Definition:** A contribution arrangement where the donor or third party receives benefits for a period of time, with the remainder going to the NFP.\n\n**The \"split\":**\n• Lead interest: Benefits during the agreement term\n• Remainder interest: What's left for NFP at the end\n\n**Common types:**\n• Charitable remainder trusts\n• Charitable lead trusts\n• Gift annuities\n• Pooled income funds"
        },
        {
          title: 'Common Split-Interest Agreements',
          type: 'table',
          headers: ['Type', 'Lead Interest', 'Remainder', 'Who Holds Assets'],
          rows: [
            ['Charitable Remainder Trust', 'Donor/beneficiary', 'NFP', 'Separate trust'],
            ['Charitable Lead Trust', 'NFP', 'Donor/heirs', 'Separate trust'],
            ['Gift Annuity', 'Donor', 'NFP', 'NFP'],
            ['Pooled Income Fund', 'Donor/beneficiary', 'NFP', 'NFP pool']
          ]
        },
        {
          title: 'Charitable Remainder Trust',
          type: 'text',
          content: "**How it works:**\n1. Donor transfers assets to trust\n2. Trust pays income to donor (or beneficiary) for life/term\n3. Remainder goes to NFP when trust ends\n\n**Two types:**\n• **Annuity trust:** Fixed annual payment\n• **Unitrust:** Variable payment (% of trust value)\n\n**Accounting depends on:** Whether NFP is trustee"
        },
        {
          title: 'NFP as Trustee of Charitable Remainder Trust',
          type: 'text',
          content: "**Initial recognition:**\n\nDr Trust Assets            Fair Value\n    Cr Liability to Beneficiary   PV of payments\n    Cr Contribution Revenue       Difference\n\n**Liability = Present value of expected payments to beneficiary**\n\n**Revenue = Net present value of remainder interest**\n\n**Subsequent periods:**\n• Adjust liability for actuarial changes\n• Record investment gains/losses\n• When trust ends → Eliminate liability, recognize remaining assets"
        },
        {
          title: '🧠 Memory Aid: Split-Interest Accounting',
          type: 'callout',
          content: "**\"Assets - Liability = Revenue\"**\n\n**What does NFP record?**\n\n**Assets:** Fair value of what's in trust (if NFP is trustee)\n**Liability:** PV of what NFP owes beneficiary\n**Revenue:** The difference (NFP's remainder interest)\n\n**Think of it as:** Total pie minus their slice = our slice"
        },
        {
          title: 'Charitable Gift Annuity',
          type: 'text',
          content: "**How it works:**\n1. Donor transfers assets directly to NFP\n2. NFP promises fixed annuity payments to donor for life\n3. When donor dies, NFP keeps remaining assets\n\n**Key difference from CRT:** NFP owns assets directly (not in separate trust)\n\n**Entry:**\nDr Assets                  Fair Value\n    Cr Annuity Payable         PV of payments\n    Cr Contribution Revenue    Difference"
        },
        {
          title: 'Charitable Lead Trust',
          type: 'text',
          content: "**Opposite of Charitable Remainder Trust:**\n\n1. Donor transfers assets to trust\n2. Trust pays income to NFP for term of years\n3. Remainder goes back to donor/heirs\n\n**NFP accounting:**\n• Recognize contribution receivable\n• At present value of expected payments\n• Revenue recognized over trust term as payments received\n\n**Assets stay with trust, not NFP**"
        },
        {
          title: 'Pooled Income Fund',
          type: 'text',
          content: "**How it works:**\n1. Multiple donors contribute to a common pool\n2. Each donor receives pro-rata share of income for life\n3. At death, donor's share goes to NFP\n\n**Accounting:**\n• Record assets contributed\n• Record liability for income interest\n• Contribution = Assets - Liability\n\n**Similar to charitable remainder trust but pooled**"
        },
        {
          title: '⚠️ Exam Trap: Beneficiary is Third Party',
          type: 'warning',
          content: "**What if remainder goes to ANOTHER NFP?**\n\n**If another NFP is beneficiary:**\n• Trustee NFP records liability to other NFP\n• Beneficiary NFP records receivable (if unconditional)\n\n**If NFP is neither trustee nor beneficiary:**\n• No accounting recognition\n\n**Key:** Who is trustee? Who is beneficiary? Who holds assets?"
        },
        {
          title: 'Perpetual Trust Held by Third Party',
          type: 'text',
          content: "**When bank or other party is trustee:**\n\n**NFP is income beneficiary:**\n• Recognize interest in trust at fair value\n• Classified as \"with donor restrictions\" (perpetual)\n• Recognize income distributions as revenue\n\n**NFP is remainder beneficiary:**\n• Recognize PV of expected remainder\n• \"With donor restrictions\" until received\n• Adjust annually for changes in value"
        },
        {
          title: 'Sample Calculation',
          type: 'example',
          content: "**Gift Annuity Example:**\n\nDonor (age 75) transfers $100,000 to NFP\nNFP agrees to pay $6,000 annually for donor's life\nExpected life: 12 years; Discount rate: 5%\n\n**PV of annuity:** $6,000 × 8.8633 (PV factor) = $53,180\n\n**Entry:**\nDr Cash                     $100,000\n    Cr Annuity Payable          $53,180\n    Cr Contribution Revenue -\n       With Restrictions        $46,820\n\n**Each year:**\n• Pay $6,000 (reduce liability)\n• Adjust liability for actuarial changes\n• Interest accrues on liability"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Split-interest: Benefits split between donor/beneficiary and NFP",
            "Record assets at fair value; liability at PV of amounts owed",
            "Contribution revenue = Assets received - Liability to beneficiary",
            "Charitable remainder trust: Donor gets income, NFP gets remainder",
            "Charitable lead trust: NFP gets income, donor gets remainder",
            "Gift annuity: NFP owns assets, pays fixed annuity to donor",
            "Classified as 'with donor restrictions' until trust terminates"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-006',
    section: 'FAR',
    title: "NFP Functional Expense Reporting",
    description: "Master expense allocation and the Statement of Functional Expenses",
    order: 66,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Not-for-Profit", "Functional Expenses"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Donors want to know how their money is spent! NFPs must report expenses by function (programs vs support) AND by nature (salaries, rent, etc.). The Statement of Functional Expenses shows this important information!"
        },
        {
          title: 'Two Ways to Classify Expenses',
          type: 'text',
          content: "**By Function (what the money does):**\n• Program services\n• Management and general\n• Fundraising\n\n**By Nature (what was purchased):**\n• Salaries and benefits\n• Rent and utilities\n• Supplies\n• Professional services\n• Depreciation"
        },
        {
          title: 'Functional Categories',
          type: 'table',
          headers: ['Category', 'Description', 'Examples'],
          rows: [
            ['Program Services', 'Mission-related activities', 'Education, research, counseling'],
            ['Management & General', 'Overall administration', 'Executive salaries, accounting, legal'],
            ['Fundraising', 'Donor solicitation', 'Events, mailings, development staff']
          ]
        },
        {
          title: 'Statement of Functional Expenses',
          type: 'text',
          content: "**Matrix format required:**\n\n• Rows: Expenses by NATURE\n• Columns: Expenses by FUNCTION\n• Shows how each type of expense supports each activity\n\n**Required for:**\n• Voluntary health and welfare organizations (always)\n• Other NFPs (encouraged, statement or notes)\n\n**ASU 2016-14:** Enhanced disclosure requirements"
        },
        {
          title: '🧠 Memory Aid: Functional Expense Matrix',
          type: 'callout',
          content: "**Think of a GRID:**\n\n```\n                  Programs  M&G  Fundraising\nSalaries          $500K    $80K    $40K\nRent               $50K    $10K     $5K\nSupplies           $20K     $3K     $2K\n```\n\n**Rows = NATURE (what bought)**\n**Columns = FUNCTION (why bought)**\n**Must allocate shared costs!**"
        },
        {
          title: 'Expense Allocation',
          type: 'text',
          content: "**Many costs must be allocated:**\n\n**Direct costs:** Charge directly to function\n\n**Shared costs:** Allocate using reasonable basis:\n• Salaries → Time spent\n• Rent → Square footage\n• Utilities → Square footage\n• Depreciation → Use or square footage\n\n**Document allocation methodology!**"
        },
        {
          title: 'Program Ratio',
          type: 'text',
          content: "**Key metric donors watch:**\n\nProgram Ratio = Program Expenses / Total Expenses\n\n**Higher = Better** (more going to mission)\n\n**Typical expectations:**\n• 75%+ considered good by many raters\n• Below 50% raises concerns\n\n**Watchdog groups like Charity Navigator use this!**"
        },
        {
          title: '⚠️ Exam Trap: Joint Costs',
          type: 'warning',
          content: "**Multi-purpose activities (e.g., educational mailing that also solicits):**\n\n**Can allocate to BOTH program AND fundraising IF:**\n1. Purpose criteria met (would do without solicitation)\n2. Audience criteria met (selected for reasons other than ability to give)\n3. Content criteria met (serves program/M&G function)\n\n**ALL THREE criteria must be met to allocate to program!**\n**Otherwise → 100% Fundraising**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Expenses reported by function AND by nature",
            "Functions: Program, Management & General, Fundraising",
            "Statement of Functional Expenses: Matrix format",
            "Shared costs allocated using reasonable bases",
            "Program ratio: Program expenses / Total expenses",
            "Joint costs: Must meet all three criteria to allocate to program",
            "Document allocation methodology"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-007',
    section: 'FAR',
    title: "Healthcare Entity Accounting",
    description: "Learn the unique accounting for hospitals and healthcare organizations",
    order: 67,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Healthcare", "Not-for-Profit"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Healthcare entities—hospitals, clinics, and health systems—have unique accounting requirements, especially for patient service revenue and charity care! Understanding these special rules is essential for FAR healthcare questions!"
        },
        {
          title: 'Types of Healthcare Entities',
          type: 'text',
          content: "**Healthcare entities can be:**\n\n• **For-profit:** Follow business GAAP\n• **Government:** Follow GASB standards\n• **Not-for-profit:** Follow FASB NFP standards\n\n**Most FAR questions focus on NFP healthcare**\n\n**Same functional expense reporting as other NFPs**"
        },
        {
          title: 'Patient Service Revenue',
          type: 'text',
          content: "**Revenue recognition (ASC 606):**\n\n**Transaction price = Amount expect to collect**\n\n• Start with gross charges\n• Less: Contractual adjustments (insurance discounts)\n• Less: Implicit price concessions (expected bad debts)\n• = Net patient service revenue\n\n**Report NET amount (single line)**"
        },
        {
          title: 'Contractual Adjustments',
          type: 'text',
          content: "**Differences between charges and insurance payments:**\n\n**Example:**\nCharges for procedure: $10,000\nInsurance pays: $6,500\nContractual adjustment: $3,500\n\n**Recorded as reduction of revenue, NOT expense**\n\n**Third-party payers:**\n• Medicare\n• Medicaid\n• Commercial insurance"
        },
        {
          title: '🧠 Memory Aid: Revenue Components',
          type: 'callout',
          content: "**\"GROSS minus REDUCTIONS = NET\"**\n\n**Gross patient service revenue**\n- Contractual adjustments (insurance deals)\n- Implicit price concessions (won't collect)\n- Charity care (never expected to collect)\n= **Net patient service revenue**\n\n**Only report the NET!**"
        },
        {
          title: 'Charity Care',
          type: 'text',
          content: "**Services provided for free or reduced price:**\n\n**ASU 2016-14 treatment:**\n• NOT recorded as revenue\n• NOT recorded as bad debt expense\n• Disclosed in notes:\n  - Policy for providing charity care\n  - Quantified (e.g., at cost)\n\n**Why not revenue?** Never expected to collect"
        },
        {
          title: 'Bad Debts vs Charity Care',
          type: 'table',
          headers: ['Item', 'Bad Debts', 'Charity Care'],
          rows: [
            ['Patient expectation', 'Expected to pay', 'Not expected to pay'],
            ['Ability to pay', 'Has ability (but doesn\'t)', 'No ability'],
            ['Treatment', 'Implicit price concession', 'Not recognized'],
            ['Revenue effect', 'Reduces net revenue', 'No revenue recorded'],
            ['Disclosure', 'May be in notes', 'Required disclosure']
          ]
        },
        {
          title: 'Healthcare Operating Statement',
          type: 'text',
          content: "**Typical format:**\n\n**Operating revenues:**\n• Net patient service revenue\n• Premium revenue (capitation)\n• Other operating revenue\n\n**Operating expenses:**\n• By function (nursing, support, admin)\n\n**Non-operating:**\n• Investment income\n• Contributions"
        },
        {
          title: '⚠️ Exam Trap: Malpractice Claims',
          type: 'warning',
          content: "**Healthcare entities have significant malpractice exposure:**\n\n**Record liability when:**\n• Probable AND\n• Reasonably estimable\n\n**Uninsured claims:**\n• Accrue expected losses\n• Use actuarial estimates\n\n**Insurance recoveries:**\n• Asset only if probable"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Healthcare can be for-profit, government, or NFP",
            "Patient service revenue: Net amount expected to collect",
            "Contractual adjustments: Reduce revenue (insurance deals)",
            "Charity care: Not revenue, disclosed in notes",
            "Bad debts: Implicit price concession, reduces revenue",
            "Malpractice: Accrue when probable and estimable",
            "Most FAR questions focus on NFP healthcare"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-018',
    section: 'FAR',
    title: "Defined Benefit Pension Plans",
    description: "Master pension accounting including the PBO, plan assets, and net pension cost",
    order: 66,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Pensions", "Employee Benefits"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Pension accounting is one of the most complex topics on FAR! Understanding the components of pension expense, balance sheet presentation, and OCI impacts is essential. Many candidates struggle here—master this and you'll stand out!"
        },
        {
          title: 'Defined Benefit vs Defined Contribution',
          type: 'table',
          headers: ['Feature', 'Defined Benefit', 'Defined Contribution'],
          rows: [
            ['Promise', 'Specific future benefit', 'Specific current contribution'],
            ['Investment Risk', 'Employer bears', 'Employee bears'],
            ['Complexity', 'Very complex', 'Simple'],
            ['Example', 'Traditional pension', '401(k), 403(b)']
          ]
        },
        {
          title: 'Key Pension Terms',
          type: 'text',
          content: "**Projected Benefit Obligation (PBO):**\n• Present value of ALL benefits earned to date\n• Uses projected future salary increases\n• PRIMARY measure used in US GAAP\n\n**Plan Assets:**\n• Fair value of investments set aside for pension\n• Held in trust, separate from company\n\n**Funded Status = Plan Assets - PBO**"
        },
        {
          title: 'Funded Status on Balance Sheet',
          type: 'text',
          content: "**Net Pension Asset or Liability:**\n\n• **Overfunded (Assets > PBO):** Report net asset\n• **Underfunded (PBO > Assets):** Report net liability\n\n**Single amount on balance sheet = Funded status**\n\n**No more minimum liability or intangible asset!**"
        },
        {
          title: '🧠 Memory Aid: Pension Expense Components',
          type: 'callout',
          content: "**\"SIR-AGE\"** for Pension Cost:\n\n**S**ervice cost (+)\n**I**nterest cost (+)\n**R**eturn on assets (-)\n**A**mortization of prior service cost (+/-)\n**G**ains and losses amortization (+/-)\n**E**xpected, not actual return!\n\n**Service and Interest ADD; Return SUBTRACTS**"
        },
        {
          title: 'Pension Cost Components',
          type: 'table',
          headers: ['Component', 'Description', 'Income Statement Location'],
          rows: [
            ['Service Cost', 'Benefits earned during year', 'Operating expense'],
            ['Interest Cost', 'Interest on PBO', 'Non-operating/Other'],
            ['Expected Return', 'Expected earnings on plan assets', 'Non-operating/Other'],
            ['Prior Service Amortization', 'Plan amendments recognition', 'Non-operating/Other'],
            ['Gain/Loss Amortization', 'Corridor method excess', 'Non-operating/Other']
          ]
        },
        {
          title: 'Service Cost',
          type: 'text',
          content: "**Benefits earned by employees THIS YEAR**\n\n• Calculated by actuary\n• Based on pension formula\n• Uses current salary levels projected forward\n\n**This is the ONLY component in operating income!**\n\n**All other components = Non-operating**"
        },
        {
          title: 'Interest Cost',
          type: 'text',
          content: "**Interest on the growing PBO:**\n\n**Formula:** Beginning PBO × Discount Rate\n\n**Think of it as:**\n• PBO is a liability growing over time\n• Interest accrues at the discount rate\n\n**Increases pension expense**"
        },
        {
          title: 'Expected Return on Plan Assets',
          type: 'text',
          content: "**Expected earnings from investments:**\n\n**Formula:** Beginning Plan Assets × Expected Return Rate\n\n**Note:** Use EXPECTED return, not actual!\n\n**Difference:** Actual vs Expected → OCI (deferred)\n\n**Reduces pension expense (negative component)**"
        },
        {
          title: 'Prior Service Cost',
          type: 'text',
          content: "**When plan is amended retroactively:**\n\n1. Measure change in PBO from amendment\n2. Record in OCI immediately\n3. Amortize to expense over remaining service period\n\n**Example:** Company increases pension formula for past years → Increases PBO → Prior service cost"
        },
        {
          title: 'Gains and Losses (Corridor Method)',
          type: 'text',
          content: "**Gains/Losses arise from:**\n• Actuarial assumption changes\n• Difference between expected and actual returns\n\n**Accumulated in OCI until:**\n• Exceed the \"corridor\" (10% of greater of PBO or Assets)\n• Then amortize excess over average remaining service\n\n**This is the CORRIDOR approach - smooths volatility**"
        },
        {
          title: '⚠️ Exam Trap: Expected vs Actual Return',
          type: 'warning',
          content: "**In pension expense: Use EXPECTED return!**\n\n**Example:**\n• Expected return: $100,000\n• Actual return: $80,000\n• Difference: $20,000 loss\n\n**Pension expense uses:** $100,000 expected\n**The $20,000 loss goes to:** OCI (deferred)\n\n**Never use actual return in pension expense directly!**"
        },
        {
          title: 'Sample Calculation',
          type: 'example',
          content: "**Pension Expense Calculation:**\n\n• Service cost: $200,000\n• Interest cost (PBO $2M × 5%): $100,000\n• Expected return ($1.5M × 6%): ($90,000)\n• Prior service amortization: $15,000\n• Loss amortization: $10,000\n\n**Total Pension Expense: $235,000**\n\n**Journal Entry:**\nDr Pension Expense    $235,000\nDr OCI (various)      XXX\n    Cr Pension Asset/Liability   XXX\n    Cr Cash (contribution)       XXX"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Funded status = Plan assets - PBO (single B/S amount)",
            "SIR-AGE: Service, Interest, Return, Amortizations",
            "Service cost = ONLY component in operating income",
            "Use EXPECTED return, not actual (difference to OCI)",
            "Prior service cost: OCI, then amortize",
            "Corridor: 10% of greater of PBO or assets",
            "Overfunded = Asset; Underfunded = Liability"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-019',
    section: 'FAR',
    title: "Basic Earnings Per Share (EPS)",
    description: "Calculate and present basic EPS for simple capital structures",
    order: 67,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["EPS", "Financial Analysis"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-F-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "EPS is one of the most watched metrics by investors! Public companies must present EPS on the income statement. Understanding basic vs diluted EPS and the calculation nuances is heavily tested on FAR!"
        },
        {
          title: 'Basic EPS Formula',
          type: 'text',
          content: "**Basic EPS = (Net Income - Preferred Dividends) / Weighted Average Common Shares**\n\n**Numerator:** Income available to common shareholders\n**Denominator:** Weighted average shares outstanding\n\n**Must subtract preferred dividends!**"
        },
        {
          title: 'Who Must Report EPS?',
          type: 'text',
          content: "**Required for:**\n• Public companies (SEC registrants)\n• Companies planning to go public\n\n**NOT required for:**\n• Private companies\n• Not-for-profits\n\n**Presented ON the face of income statement**"
        },
        {
          title: '🧠 Memory Aid: Basic EPS',
          type: 'callout',
          content: "**\"NIP over WAC\"**\n\n**N**et Income\n**I**minus (less)\n**P**referred dividends\n_______________\n**W**eighted\n**A**verage\n**C**ommon shares\n\n**Top = what's for common; Bottom = how many common**"
        },
        {
          title: 'Preferred Dividend Treatment',
          type: 'table',
          headers: ['Type', 'Treatment in EPS'],
          rows: [
            ['Cumulative preferred', 'Subtract FULL dividend (whether declared or not)'],
            ['Non-cumulative preferred', 'Subtract ONLY if declared'],
            ['Participating preferred', 'Special allocation required']
          ]
        },
        {
          title: 'Weighted Average Shares',
          type: 'text',
          content: "**Calculate shares on time-weighted basis:**\n\n**Example:**\n• 100,000 shares for 6 months\n• 150,000 shares for 6 months\n\n**Weighted avg = (100,000 × 6/12) + (150,000 × 6/12)**\n**= 50,000 + 75,000 = 125,000 shares**\n\n**Use actual days or months for precision**"
        },
        {
          title: 'Stock Dividends and Splits',
          type: 'text',
          content: "**Treat as if occurred at BEGINNING of year!**\n\n**Example:** 2-for-1 split on July 1\n• January 1 shares: 100,000\n• After split: 200,000\n\n**Weighted average:** 200,000 for ENTIRE year\n\n**Also RESTATE prior period EPS for comparability!**"
        },
        {
          title: 'Treasury Stock',
          type: 'text',
          content: "**Treasury shares reduce weighted average:**\n\n**Example:**\n• 1/1: 200,000 shares outstanding\n• 4/1: Buy back 20,000 shares\n\n**Weighted avg:**\n(200,000 × 3/12) + (180,000 × 9/12)\n= 50,000 + 135,000 = 185,000 shares"
        },
        {
          title: '⚠️ Exam Trap: Stock Dividends vs Repurchases',
          type: 'warning',
          content: "**Stock dividends/splits:** Apply RETROACTIVELY to entire year (and prior years)\n\n**Stock repurchases:** Apply PROSPECTIVELY from purchase date\n\n**Why different?**\n• Splits/dividends don't change company value\n• Repurchases are economic transactions"
        },
        {
          title: 'EPS Presentation',
          type: 'text',
          content: "**Income statement presentation:**\n\n• EPS from continuing operations\n• EPS from discontinued operations\n• EPS for net income\n\n**Both basic AND diluted EPS required**\n\n**Show on face of income statement, not just notes**"
        },
        {
          title: 'Sample Calculation',
          type: 'example',
          content: "**Calculate Basic EPS:**\n\n• Net income: $500,000\n• Preferred dividends (cumulative): $50,000\n• Common shares 1/1: 100,000\n• Issued 4/1: 20,000 additional\n• 2-for-1 split on 9/1\n\n**Step 1: Adjust for split**\n• 1/1 shares: 100,000 × 2 = 200,000\n• 4/1 issue: 20,000 × 2 = 40,000\n\n**Step 2: Weighted average**\n(200,000 × 3/12) + (240,000 × 9/12) = 230,000\n\n**Step 3: Calculate EPS**\n($500,000 - $50,000) / 230,000 = **$1.96**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Basic EPS = (Net Income - Preferred Dividends) / Weighted Avg Shares",
            "Cumulative preferred: Deduct whether declared or not",
            "Weighted average: Time-weight share changes",
            "Stock splits/dividends: Apply retroactively to entire year",
            "Treasury stock purchases: Apply from purchase date forward",
            "Required for public companies, on face of income statement",
            "Restate prior periods for splits/dividends"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-020',
    section: 'FAR',
    title: "Diluted Earnings Per Share",
    description: "Calculate diluted EPS with convertibles, options, and other dilutive securities",
    order: 68,
    duration: 60,
    difficulty: 'advanced',
    topics: ["EPS", "Financial Analysis", "Complex Capital"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-F-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Diluted EPS shows the 'worst case' scenario if all potentially dilutive securities converted. Understanding the if-converted and treasury stock methods is essential for FAR—these calculations appear frequently on the exam!"
        },
        {
          title: 'What is Diluted EPS?',
          type: 'text',
          content: "**Diluted EPS = Income available / (Weighted Avg + Potential Shares)**\n\n**Shows impact of:**\n• Convertible bonds\n• Convertible preferred stock\n• Stock options and warrants\n• Contingent shares\n\n**Always ≤ Basic EPS (cannot exceed basic)**"
        },
        {
          title: 'Two Key Methods',
          type: 'table',
          headers: ['Security', 'Method', 'Adjustments'],
          rows: [
            ['Convertible bonds', 'If-Converted', 'Add back interest (net of tax), add shares'],
            ['Convertible preferred', 'If-Converted', 'Add back pref dividends, add shares'],
            ['Options/Warrants', 'Treasury Stock', 'Add net new shares only']
          ]
        },
        {
          title: 'If-Converted Method: Convertible Bonds',
          type: 'text',
          content: "**Assume bonds converted at beginning of year:**\n\n**Numerator adjustment:**\n• Add back interest expense (net of tax)\n• Interest wouldn't be paid if converted\n\n**Denominator adjustment:**\n• Add shares that would be issued\n\n**Test:** Only include if DILUTIVE (reduces EPS)"
        },
        {
          title: '🧠 Memory Aid: If-Converted',
          type: 'callout',
          content: "**\"IF converted, what changes?\"**\n\n**Convertible BONDS:**\n• No more interest expense = Income UP (add back)\n• More shares = Shares UP\n\n**Convertible PREFERRED:**\n• No more preferred dividends = Income UP\n• More common shares = Shares UP\n\n**Both: Income goes UP, Shares go UP**"
        },
        {
          title: 'If-Converted Method: Convertible Preferred',
          type: 'text',
          content: "**Assume preferred converted at beginning of year:**\n\n**Numerator adjustment:**\n• Don't subtract preferred dividends\n• (They wouldn't exist if converted)\n\n**Denominator adjustment:**\n• Add common shares from conversion\n\n**No tax adjustment needed (dividends aren't deductible)**"
        },
        {
          title: 'Treasury Stock Method: Options',
          type: 'text',
          content: "**For options and warrants:**\n\n1. Assume all options exercised\n2. Company receives exercise price\n3. Company buys back shares at average market price\n4. NET new shares added to denominator\n\n**Formula:**\nNet shares = Options - (Options × Exercise Price / Avg Market Price)\n\n**Or:** Options × (Market - Exercise) / Market"
        },
        {
          title: 'Treasury Stock Method Example',
          type: 'example',
          content: "**Options outstanding:**\n• 10,000 options\n• Exercise price: $20\n• Average market price: $50\n\n**Step 1:** Assume exercise: Receive $200,000 (10,000 × $20)\n\n**Step 2:** Buy back shares: $200,000 / $50 = 4,000 shares\n\n**Step 3:** Net new shares = 10,000 - 4,000 = **6,000 shares**\n\n**Only these 6,000 added to denominator!**"
        },
        {
          title: 'When Are Options Dilutive?',
          type: 'text',
          content: "**Options are dilutive when:**\nExercise price < Average market price\n(In-the-money options)\n\n**Options are anti-dilutive when:**\nExercise price > Average market price\n(Out-of-the-money options)\n\n**Anti-dilutive securities are EXCLUDED!**"
        },
        {
          title: '⚠️ Exam Trap: Antidilutive Securities',
          type: 'warning',
          content: "**NEVER include antidilutive securities!**\n\n**A security is antidilutive if:**\n• Including it INCREASES EPS\n• Convertible: Incremental EPS > Basic EPS\n• Options: Exercise price > Market price\n\n**Must test EACH security separately**\n\n**Aggregate approach:** Order by most dilutive first"
        },
        {
          title: 'Order of Inclusion (Aggregate Test)',
          type: 'text',
          content: "**Steps for multiple dilutive securities:**\n\n1. Calculate basic EPS\n2. Rank securities by dilutive impact (most dilutive first)\n3. Add one at a time\n4. Stop when adding security would be antidilutive\n\n**For convertibles:** Rank by incremental EPS\n(Earnings adjustment / Share adjustment)"
        },
        {
          title: 'Sample Comprehensive Calculation',
          type: 'example',
          content: "**Given:**\n• Net income: $1,000,000\n• Preferred dividends: $100,000\n• Basic shares: 200,000\n• Convertible bonds: $500,000 face, 8% interest, converts to 20,000 shares\n• Tax rate: 25%\n• Stock options: 10,000 options at $30, market = $50\n\n**Basic EPS:** ($1,000,000 - $100,000) / 200,000 = **$4.50**\n\n**Convertible bond adjustment:**\n• Interest add-back: $40,000 × (1-25%) = $30,000\n• New shares: 20,000\n\n**Options (Treasury Stock):**\n• Net shares: 10,000 × ($50-$30)/$50 = 4,000\n\n**Diluted EPS:**\n($900,000 + $30,000) / (200,000 + 20,000 + 4,000)\n= $930,000 / 224,000 = **$4.15**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Diluted EPS includes potentially dilutive securities",
            "Convertibles: If-converted method (add back interest/dividends, add shares)",
            "Options: Treasury stock method (only net new shares)",
            "Options dilutive only when market > exercise price",
            "NEVER include antidilutive securities",
            "Test each security—stop when adding would increase EPS",
            "Diluted EPS must be ≤ Basic EPS"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-021',
    section: 'FAR',
    title: "Income Tax Accounting: Deferred Taxes",
    description: "Master deferred tax assets, liabilities, and temporary differences",
    order: 69,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Income Taxes", "Deferred Taxes"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Deferred tax accounting bridges the gap between GAAP and tax reporting! Understanding temporary differences, DTAs, DTLs, and valuation allowances is crucial for FAR. This topic appears in almost every exam!"
        },
        {
          title: 'Book vs Tax Differences',
          type: 'table',
          headers: ['Type', 'Description', 'Deferred Tax?'],
          rows: [
            ['Temporary', 'Will reverse in future periods', 'YES - Creates DTA or DTL'],
            ['Permanent', 'Never reverses', 'NO - No deferred tax']
          ]
        },
        {
          title: 'Temporary Differences',
          type: 'text',
          content: "**Differences that create future taxable or deductible amounts:**\n\n**Creates DTL (future taxable):**\n• Accelerated tax depreciation\n• Installment sale income\n• Prepaid expenses (deducted for tax, not book)\n\n**Creates DTA (future deductible):**\n• Bad debt expense (allowance method)\n• Warranty expense\n• Accrued expenses not yet deductible"
        },
        {
          title: '🧠 Memory Aid: DTA vs DTL',
          type: 'callout',
          content: "**\"PAID less now → DTL; PAID more now → DTA\"**\n\n**DTL:** Tax paid NOW less than book expense\n• Will pay MORE tax in future\n• It's a LIABILITY\n\n**DTA:** Tax paid NOW more than book expense\n• Will pay LESS tax in future\n• It's an ASSET (future benefit)"
        },
        {
          title: 'Calculating Deferred Taxes',
          type: 'text',
          content: "**Step 1:** Identify temporary differences\n**Step 2:** Determine if each creates DTA or DTL\n**Step 3:** Multiply by ENACTED tax rate\n**Step 4:** Assess need for valuation allowance on DTAs\n\n**Use the tax rate expected when difference reverses!**"
        },
        {
          title: 'Common Temporary Differences',
          type: 'table',
          headers: ['Item', 'Book vs Tax', 'Creates'],
          rows: [
            ['Depreciation', 'Book < Tax early years', 'DTL'],
            ['Bad debt allowance', 'Book > Tax (direct write-off)', 'DTA'],
            ['Warranty liability', 'Book accrued, Tax when paid', 'DTA'],
            ['Prepaid rent', 'Tax deducts now, Book later', 'DTL'],
            ['Installment sales', 'Book full income, Tax when collected', 'DTL']
          ]
        },
        {
          title: 'Permanent Differences (No Deferred Tax)',
          type: 'text',
          content: "**Never reverse - affect current tax only:**\n\n• Municipal bond interest (book income, not taxable)\n• Life insurance premiums on executives\n• Fines and penalties (book expense, not deductible)\n• 50% meals deduction limit\n• Dividends received deduction\n\n**These affect effective tax rate, not deferred taxes**"
        },
        {
          title: 'Journal Entry Approach',
          type: 'text',
          content: "**Annual deferred tax entry:**\n\nDr Income Tax Expense (plug)\n   Cr Income Tax Payable (current tax due)\n   Cr Deferred Tax Liability (increase in DTL)\nor\nDr Deferred Tax Asset (increase in DTA)\n\n**Expense = Current tax +/- Changes in deferred taxes**"
        },
        {
          title: '⚠️ Exam Trap: Rate Changes',
          type: 'warning',
          content: "**When tax rates change:**\n\n• Adjust ALL existing deferred taxes\n• Use NEW enacted rate\n• Adjustment goes through income tax expense\n\n**Example:** DTL of $100,000 at 35%\nRate changes to 21%\nNew DTL = Temp diff × 21%\nDifference = Benefit (reduce expense)"
        },
        {
          title: 'Balance Sheet Classification',
          type: 'text',
          content: "**ALL deferred taxes are NONCURRENT:**\n\n• Deferred Tax Assets → Noncurrent asset\n• Deferred Tax Liabilities → Noncurrent liability\n\n**Net within same tax jurisdiction:**\n• Net DTA and DTL for same entity/jurisdiction\n• Different jurisdictions shown separately"
        },
        {
          title: 'Sample Calculation',
          type: 'example',
          content: "**Year 1:**\n• Book income: $500,000\n• Taxable income: $400,000\n• Difference: $100,000 (depreciation timing)\n• Tax rate: 21%\n\n**Current tax:** $400,000 × 21% = $84,000\n**DTL created:** $100,000 × 21% = $21,000\n\n**Entry:**\nDr Income Tax Expense    $105,000\n    Cr Income Tax Payable    $84,000\n    Cr Deferred Tax Liability $21,000\n\n**Effective rate:** $105,000 / $500,000 = 21%"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Temporary differences reverse; Permanent differences don't",
            "DTL = Will pay MORE tax later (tax < book now)",
            "DTA = Will pay LESS tax later (tax > book now)",
            "Use enacted rate expected when difference reverses",
            "Rate changes: Adjust deferred taxes through expense",
            "All deferred taxes are noncurrent on balance sheet",
            "Net within same jurisdiction, separate different jurisdictions"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-022',
    section: 'FAR',
    title: "Deferred Tax Asset Valuation Allowance",
    description: "Determine when a valuation allowance is needed for deferred tax assets",
    order: 70,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Income Taxes", "Valuation Allowance"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "A DTA is only valuable if the company will have future taxable income to use it! The valuation allowance is one of the most judgment-intensive areas in accounting—and a favorite FAR exam topic!"
        },
        {
          title: 'What is a Valuation Allowance?',
          type: 'text',
          content: "**Contra-asset reducing DTA to realizable amount**\n\n**Required when:**\n\"More likely than not\" (>50%) that some portion of DTA will NOT be realized\n\n**Like an allowance for doubtful accounts—but for deferred taxes**"
        },
        {
          title: 'Assessing Realizability',
          type: 'text',
          content: "**Consider all available evidence:**\n\n**Positive evidence (supports no VA needed):**\n• Existing contracts/backlogs\n• Strong earnings history\n• Appreciated assets\n• Deferred tax liabilities that will reverse\n\n**Negative evidence (supports VA needed):**\n• Cumulative losses in recent years\n• History of unused carryforwards expiring\n• Unsettled circumstances creating uncertainty"
        },
        {
          title: 'Sources of Future Taxable Income',
          type: 'list',
          content: [
            "**Reversal of existing DTLs** in same jurisdiction",
            "**Future taxable income** (exclusive of reversing differences)",
            "**Tax planning strategies** that would create taxable income",
            "**Carryback to prior years** (if available)"
          ]
        },
        {
          title: '🧠 Memory Aid: \"More Likely Than Not\"',
          type: 'callout',
          content: "**MLTN = More than 50% likely**\n\n**Question to ask:**\n\"Is it more likely than not that we WON'T use this DTA?\"\n\n**If YES → Need valuation allowance**\n**If NO → No valuation allowance needed**\n\n**Weight of evidence determines answer**"
        },
        {
          title: 'Journal Entry for Valuation Allowance',
          type: 'text',
          content: "**To establish or increase VA:**\n\nDr Income Tax Expense\n    Cr Valuation Allowance (contra to DTA)\n\n**To decrease VA (improved outlook):**\n\nDr Valuation Allowance\n    Cr Income Tax Expense (benefit)\n\n**VA is presented as offset to DTA on balance sheet**"
        },
        {
          title: 'Cumulative Loss Test',
          type: 'text',
          content: "**Three-year cumulative loss is significant negative evidence:**\n\n• Very difficult to overcome\n• Must have strong positive evidence to avoid VA\n• Objectively verifiable\n\n**But not automatic!**\n• Consider nature of losses\n• Unusual or nonrecurring?\n• Future profitability reasonably expected?"
        },
        {
          title: '⚠️ Exam Trap: Changing the VA',
          type: 'warning',
          content: "**VA is reassessed EVERY reporting period!**\n\n**Company turns profitable:**\n• Reassess need for VA\n• May release (reduce) VA\n• Benefit goes through income tax expense\n\n**This can significantly impact earnings!**\n\n**Disclosure of VA changes required**"
        },
        {
          title: 'Example Scenario',
          type: 'example',
          content: "**Company has:**\n• DTA from NOL carryforward: $500,000\n• Three years of losses (cumulative loss)\n• Expect modest profits next 2 years\n• DTL that will reverse: $200,000\n\n**Analysis:**\n• Negative evidence: Cumulative losses\n• Positive evidence: DTL reversal\n• Expected income insufficient\n\n**Conclusion:** VA needed for portion not supported\nVA = $500,000 - $200,000 = $300,000"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "VA needed when MLTN (>50%) DTA won't be realized",
            "Consider all positive and negative evidence",
            "Three-year cumulative loss = significant negative evidence",
            "Sources: DTL reversals, future income, tax strategies, carrybacks",
            "VA recorded against income tax expense",
            "Reassess VA every period—changes go through expense",
            "VA is contra-asset that reduces DTA on balance sheet"
          ]
        }
      ]
    }
  },

  // =============================================
  // FAR: ADDITIONAL FINANCIAL ACCOUNTING TOPICS
  // =============================================
  {
    id: 'FAR-V-020',
    section: 'FAR',
    title: "Revenue Recognition: Multiple Performance Obligations",
    description: "Master allocation of transaction price to performance obligations",
    order: 85,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Revenue Recognition", "ASC 606"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Many contracts have multiple performance obligations! Understanding how to identify and allocate the transaction price is critical. This is one of the most complex areas of revenue recognition!"
        },
        {
          title: 'Identifying Performance Obligations',
          type: 'text',
          content: "**Two criteria (BOTH must be met):**\n\n1. **Distinct:** Customer can benefit on its own or with readily available resources\n\n2. **Separately identifiable:** Not highly interdependent or integrated with other promises\n\n**If both met → Separate performance obligation**"
        },
        {
          title: 'Allocation Methods',
          type: 'table',
          headers: ['Method', 'When Used', 'How Applied'],
          rows: [
            ['Standalone selling price', 'Observable price exists', 'Use actual price charged separately'],
            ['Adjusted market assessment', 'No observable', 'What market would pay'],
            ['Expected cost plus margin', 'No observable', 'Cost + reasonable margin'],
            ['Residual approach', 'Highly variable price', 'Total less other allocations']
          ]
        },
        {
          title: '🧠 Memory Aid: Allocation Steps',
          type: 'callout',
          content: "**\"STAR\"** method:\n\n**S**tandalone prices - Determine for each PO\n**T**otal transaction price - Determine amount\n**A**llocate based on relative SSP\n**R**ecognize as each PO is satisfied\n\n**Formula:**\nAllocated = (SSP of PO / Total SSP) × Transaction Price"
        },
        {
          title: 'Allocating Discounts',
          type: 'text',
          content: "**General rule:** Allocate discount proportionally to all POs\n\n**Exception - Allocate to specific POs if:**\n• Entity regularly sells each PO separately, AND\n• Observable evidence discount relates to only some POs, AND\n• Items in bundle approximate standalone prices\n\n**Variable consideration:** May allocate entirely to one PO if specifically relates"
        },
        {
          title: 'Series of Distinct Goods/Services',
          type: 'text',
          content: "**When treated as single PO:**\n\n• Each distinct good/service is substantially the same, AND\n• Same pattern of transfer to customer\n\n**Examples:**\n• Monthly cleaning services\n• Daily transaction processing\n\n**Simplifies accounting—single measure of progress**"
        },
        {
          title: '⚠️ Exam Trap: Highly Interdependent',
          type: 'warning',
          content: "**NOT separately identifiable if:**\n\n• Significant integration service\n• One modifies or customizes another\n• Highly interdependent\n\n**Example:** Software + significant customization = ONE PO\n\n**Don't default to assuming everything is separate!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Performance obligation: Distinct AND separately identifiable",
            "Allocate transaction price based on relative SSP",
            "SSP methods: Observable > Market > Cost-plus > Residual",
            "Discounts generally allocated proportionally",
            "Series of similar services may be single PO",
            "Integration may combine promises into one PO",
            "Recognize revenue as each PO satisfied"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-021',
    section: 'FAR',
    title: "Revenue Recognition: Contract Modifications",
    description: "Understand accounting for changes to revenue contracts",
    order: 86,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Revenue Recognition", "ASC 606"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Contracts change all the time! Understanding how to account for modifications—new contract, cumulative adjustment, or prospective—is essential. The answer depends on whether goods/services are distinct!"
        },
        {
          title: 'What Is a Contract Modification?',
          type: 'text',
          content: "**Change to:**\n• Scope (adding goods/services)\n• Price (changing transaction price)\n• Both\n\n**Must be approved by parties**\n\n**Examples:**\n• Change orders\n• Add-on services\n• Price adjustments\n• Quantity changes"
        },
        {
          title: 'Three Accounting Models',
          type: 'table',
          headers: ['Model', 'When', 'Accounting'],
          rows: [
            ['Separate contract', 'Distinct + Standalone price', 'New contract, no adjustment to old'],
            ['Terminate + New', 'Distinct but NOT standalone price', 'Cumulative catch-up, new POs prospective'],
            ['Part of existing', 'NOT distinct', 'Cumulative catch-up adjustment']
          ]
        },
        {
          title: '🧠 Memory Aid: Modification Flowchart',
          type: 'callout',
          content: "**Ask two questions:**\n\n**Q1:** Are added goods/services distinct?\n→ NO = Part of existing contract (catch-up)\n→ YES = Go to Q2\n\n**Q2:** Is price at standalone?\n→ YES = Separate contract\n→ NO = Terminate and create new"
        },
        {
          title: 'Separate Contract Treatment',
          type: 'text',
          content: "**Treat as new contract when:**\n\n• Additional goods/services are distinct, AND\n• Price increases by standalone selling price\n\n**Result:**\n• Original contract unaffected\n• New contract starts fresh\n• No cumulative adjustment\n\n**Think of it as a completely new sale**"
        },
        {
          title: 'Cumulative Catch-Up',
          type: 'text',
          content: "**When modification changes measure of progress:**\n\n**Steps:**\n1. Revise total transaction price\n2. Revise total estimated costs (if applicable)\n3. Calculate new % complete\n4. Apply to revised revenue\n5. Recognize difference as adjustment\n\n**Catch-up in period of modification!**"
        },
        {
          title: '⚠️ Exam Trap: Termination Model',
          type: 'warning',
          content: "**Terminate + New is NOT intuitive:**\n\n**When goods are distinct but NOT at standalone price:**\n• Allocate remaining transaction price\n• Include modification consideration\n• Recognize previously recognized revenue as starting point\n\n**Remaining POs treated prospectively**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Modification: Change to scope, price, or both",
            "Separate contract: Distinct goods + Standalone price",
            "Terminate + New: Distinct goods but NOT standalone",
            "Part of existing: Goods NOT distinct",
            "Cumulative catch-up: Adjust in period of modification",
            "Ask: Distinct? Then: Standalone price?",
            "Document modification accounting at time of change"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-022',
    section: 'FAR',
    title: "Inventory: Lower of Cost or Net Realizable Value",
    description: "Apply LCNRV testing and write-down accounting",
    order: 87,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Inventory", "Valuation"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Inventory must not be overstated! Understanding the lower of cost or NRV test ensures inventory is carried at the right amount. GAAP simplified this with ASU 2015-11!"
        },
        {
          title: 'LCNRV Rule (Post-ASU 2015-11)',
          type: 'text',
          content: "**For most inventory:**\n\n**Lower of:**\n• Cost (FIFO, LIFO, weighted average), OR\n• Net Realizable Value (NRV)\n\n**NRV = Estimated selling price − Costs to complete − Costs to sell**\n\n**If NRV < Cost → Write down**"
        },
        {
          title: 'Old vs New Rules',
          type: 'table',
          headers: ['Aspect', 'Old Rule (LCM)', 'New Rule (LCNRV)'],
          rows: [
            ['Ceiling', 'NRV', 'N/A - Just use NRV'],
            ['Floor', 'NRV − Normal profit', 'N/A - Just use NRV'],
            ['Market', 'Replacement cost (within ceiling/floor)', 'Not applicable'],
            ['Applies to', 'All methods', 'Not LIFO/retail method']
          ]
        },
        {
          title: '🧠 Memory Aid: LCNRV Simplified',
          type: 'callout',
          content: "**\"Two numbers—pick the lower\"**\n\n• Cost (what you paid)\n• NRV (what you'll get, net)\n\n**No more ceiling/floor!**\n\n**Exception:** LIFO and retail method still use old LCM approach"
        },
        {
          title: 'Application Level',
          type: 'text',
          content: "**Apply test to:**\n\n• Individual items (most common)\n• Categories of similar items\n• Total inventory (rare)\n\n**Be consistent!**\n\n**Testing at item level:**\n• Most conservative\n• Catches individual write-downs\n• Required for significant items"
        },
        {
          title: 'Write-Down and Recovery',
          type: 'text',
          content: "**Write-down entry:**\n\nDr Loss on Inventory Write-down (or COGS)\n    Cr Inventory\n\n**Recovery:**\n• Can reverse write-down if NRV increases\n• Only up to original cost\n• Not above original carrying amount\n\n**New cost basis = Written-down amount**"
        },
        {
          title: '⚠️ Exam Trap: LIFO and Retail Method',
          type: 'warning',
          content: "**LCNRV does NOT apply to:**\n\n• LIFO inventory\n• Retail inventory method\n\n**These STILL use old LCM:**\n• Market = Replacement cost\n• Subject to ceiling (NRV) and floor (NRV − profit)\n\n**Read the question carefully!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "LCNRV: Lower of Cost or NRV (simplified from LCM)",
            "NRV = Selling price − Completion costs − Selling costs",
            "If NRV < Cost → Write down inventory",
            "Apply at item, category, or total level",
            "Write-down: Dr Loss/COGS, Cr Inventory",
            "Can reverse write-down, but not above original cost",
            "LIFO and retail method still use old LCM"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-023',
    section: 'FAR',
    title: "Troubled Debt Restructuring (ASC 470-60)",
    description: "Understand debtor and creditor accounting for restructured debt",
    order: 88,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Debt", "Restructuring"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When borrowers face financial difficulty, debt often gets restructured! Understanding both debtor and creditor accounting is essential. ASU 2022-02 significantly changed these rules!"
        },
        {
          title: 'What Is Troubled Debt?',
          type: 'text',
          content: "**Creditor grants concession NOT otherwise granted:**\n\n• Debtor experiencing financial difficulty\n• Creditor agrees to modify terms\n• Modification wouldn't be granted normally\n\n**Examples:**\n• Reduced interest rate\n• Extended maturity\n• Reduced principal\n• Transfer of assets in settlement"
        },
        {
          title: 'Types of Restructuring',
          type: 'table',
          headers: ['Type', 'Description', 'Debtor Effect'],
          rows: [
            ['Settlement', 'Pay less than carrying value', 'Gain recognized'],
            ['Asset transfer', 'Transfer asset to creditor', 'Gain on debt + Asset G/L'],
            ['Equity transfer', 'Issue equity for debt', 'Gain recognized'],
            ['Modification', 'Change terms of debt', 'Depends on test']
          ]
        },
        {
          title: '🧠 Memory Aid: Settlement Gain',
          type: 'callout',
          content: "**Debtor gains when paying less:**\n\n**Gain = Carrying value − Amount paid**\n\n**If transferring asset:**\n1. Asset sold at FV → G/L on sale\n2. Debt settled at FV → G/L on settlement\n\n**Two separate transactions!**"
        },
        {
          title: 'Modification Accounting (Debtor)',
          type: 'text',
          content: "**Post-ASU 2022-02:**\n\n**Compare future cash flows to carrying amount:**\n\n• If future payments < Carrying → Gain recognized\n• If future payments ≥ Carrying → No immediate gain\n  - Adjust effective interest rate\n  - Prospective treatment\n\n**No longer use old 10% test for distressed modifications**"
        },
        {
          title: 'Creditor Accounting',
          type: 'text',
          content: "**When restructuring occurs:**\n\n• Measure loan at present value of future cash flows\n• Use original effective interest rate\n• Difference = Adjustment to allowance (or direct write-off)\n\n**Consider impairment:**\n• If collateral dependent: Fair value of collateral\n• Expected credit loss model applies"
        },
        {
          title: '⚠️ Exam Trap: ASU 2022-02 Changes',
          type: 'warning',
          content: "**Major changes for creditors:**\n\n**OLD (TDR specific):**\n• Separate TDR designation\n• Different impairment model\n\n**NEW (ASU 2022-02):**\n• Eliminated TDR designation for creditors\n• Use CECL expected loss model\n• Enhanced disclosure requirements\n\n**Debtor accounting: Less change**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "TDR: Creditor grants concession to distressed debtor",
            "Settlement: Debtor recognizes gain for forgiveness",
            "Asset transfer: Separate gain/loss on asset and debt",
            "Modification: Compare future payments to carrying value",
            "Creditor: Use CECL model, no separate TDR category",
            "Present value calculations use original effective rate",
            "ASU 2022-02 simplified creditor accounting"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-024',
    section: 'FAR',
    title: "Software Development Costs",
    description: "Understand capitalization of internal-use and for-sale software",
    order: 89,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Intangibles", "Software", "Capitalization"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Software costs can be significant! Understanding when to capitalize vs expense is critical. Different rules apply to internal-use software vs software for sale!"
        },
        {
          title: 'Two Types of Software',
          type: 'table',
          headers: ['Type', 'Standard', 'Key Concept'],
          rows: [
            ['Internal-use', 'ASC 350-40', 'Capitalize application development'],
            ['Software for sale', 'ASC 985-20', 'Capitalize after technological feasibility'],
            ['Cloud computing (SaaS)', 'ASC 350-40', 'Generally expense (service arrangement)']
          ]
        },
        {
          title: '🧠 Memory Aid: Internal-Use Phases',
          type: 'callout',
          content: "**\"PED\" = Expense-Capitalize-Expense**\n\n**P**reliminary → EXPENSE\n**E**xploration, planning, evaluation\n\n**D**evelopment → CAPITALIZE\nApplication development stage\n\n**Post-implementation** → EXPENSE\nTraining, maintenance"
        },
        {
          title: 'Internal-Use Software (ASC 350-40)',
          type: 'text',
          content: "**Preliminary stage:** Expense\n• Conceptual formulation\n• Vendor evaluation\n• Feasibility analysis\n\n**Application development:** Capitalize\n• Coding, testing\n• Configuration\n• Installation to hardware\n\n**Post-implementation:** Expense\n• Training, maintenance\n• Data conversion (unless for new capabilities)"
        },
        {
          title: 'Software for Sale (ASC 985-20)',
          type: 'text',
          content: "**Before technological feasibility:** Expense all costs\n\n**After technological feasibility:**\n• Capitalize until ready for release\n• Amortize over sales life\n\n**Technological feasibility achieved when:**\n• Detailed program design complete, OR\n• Working model completed and confirmed"
        },
        {
          title: 'Amortization',
          type: 'text',
          content: "**Internal-use software:**\n• Straight-line over useful life\n• Generally 3-7 years\n\n**Software for sale:**\n• Greater of:\n  - Straight-line over estimated life, OR\n  - Revenue ratio (revenue/total expected revenue)\n\n**Subject to impairment testing**"
        },
        {
          title: '⚠️ Exam Trap: Cloud Computing Costs',
          type: 'warning',
          content: "**Hosting arrangements (SaaS):**\n\n**If NO software asset obtained:**\n• Implementation costs = Service contract\n• Capitalize and expense over contract term\n\n**If software license obtained:**\n• Treat as internal-use software\n• Capitalize development costs\n\n**Substance over form!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Internal-use: Capitalize application development stage",
            "For sale: Capitalize after technological feasibility",
            "Preliminary and post-implementation: Always expense",
            "Technological feasibility: Detailed design or working model",
            "Amortize over useful life or revenue pattern",
            "Cloud computing: Generally expense unless license obtained",
            "Subject to impairment testing"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-025',
    section: 'FAR',
    title: "Asset Retirement Obligations (ARO)",
    description: "Account for legal obligations to retire long-lived assets",
    order: 90,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Long-Lived Assets", "ARO", "Present Value"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-E-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Many assets come with retirement obligations! Understanding how to recognize, measure, and update AROs is essential. Think oil wells, mines, nuclear plants—obligations to restore the environment!"
        },
        {
          title: 'What Is an ARO?',
          type: 'text',
          content: "**Legal obligation to retire long-lived asset:**\n\n• Dismantling\n• Removal\n• Site restoration\n\n**Arises from:**\n• Existing laws/regulations\n• Written or oral agreements\n• Promises implied by past practice\n\n**Must be legally enforceable**"
        },
        {
          title: 'Initial Measurement',
          type: 'table',
          headers: ['Component', 'Measurement', 'Where Recorded'],
          rows: [
            ['ARO Liability', 'Fair value (PV of expected costs)', 'Liability'],
            ['Asset retirement cost', 'Same amount', 'Added to asset cost'],
            ['Credit-adjusted rate', 'Entity-specific rate', 'Used for PV']
          ]
        },
        {
          title: '🧠 Memory Aid: ARO Entry',
          type: 'callout',
          content: "**Initial recognition:**\n\nDr Asset (retirement cost)\n    Cr ARO Liability (PV of obligation)\n\n**Both increase at inception!**\n\n**Over time:**\n• Asset portion depreciated\n• Liability accretes (interest)"
        },
        {
          title: 'Subsequent Measurement',
          type: 'text',
          content: "**Asset retirement cost:**\n• Depreciate over asset life\n• Systematic and rational method\n\n**ARO Liability:**\n• Accretion expense each period\n• Uses credit-adjusted risk-free rate\n• Accretion = Beginning liability × Rate\n\n**Adjustments for estimate changes**"
        },
        {
          title: 'Changes in Estimates',
          type: 'text',
          content: "**When expected costs change:**\n\n**Upward revision:**\n• Increase liability at current rate\n• Increase asset (new layer)\n• Depreciate over remaining life\n\n**Downward revision:**\n• Decrease liability at original rate\n• Decrease asset (not below zero)\n• Debit expense if exceeds asset"
        },
        {
          title: '⚠️ Exam Trap: Settlement',
          type: 'warning',
          content: "**When obligation settled:**\n\n**If settle for more than liability:**\nDr ARO Liability\nDr Loss on settlement\n    Cr Cash\n\n**If settle for less:**\nDr ARO Liability\n    Cr Gain on settlement\n    Cr Cash\n\n**Timing differences can cause G/L**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ARO: Legal obligation to retire long-lived asset",
            "Initial: PV of expected costs → Liability AND Asset",
            "Depreciate asset portion over useful life",
            "Accrete liability using credit-adjusted rate",
            "Upward revisions: New layer at current rate",
            "Downward revisions: Reduce at original rate",
            "Settlement difference → Gain or loss"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-026',
    section: 'FAR',
    title: "Contingencies and Loss Accruals",
    description: "Apply contingency recognition and disclosure rules",
    order: 91,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Contingencies", "Loss Accruals", "Disclosure"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-F-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Contingencies can make or break financial statements! Understanding when to accrue, disclose, or ignore contingencies is essential. Litigation, warranties, guarantees—these are everywhere!"
        },
        {
          title: 'Loss Contingency Framework',
          type: 'table',
          headers: ['Likelihood', 'Amount Estimable?', 'Treatment'],
          rows: [
            ['Probable (likely)', 'Yes', 'ACCRUE liability'],
            ['Probable (likely)', 'No (range available)', 'Accrue minimum of range'],
            ['Probable (likely)', 'No (not estimable)', 'DISCLOSE only'],
            ['Reasonably possible', 'N/A', 'DISCLOSE only'],
            ['Remote', 'N/A', 'No action (usually)']
          ]
        },
        {
          title: '🧠 Memory Aid: Probable = Accrue',
          type: 'callout',
          content: "**\"Probable AND Estimable\"**\n\nTo ACCRUE:\n• **P**robable (likely to occur)\n• **E**stimable (can measure)\n\n**Both required!**\n\n**Probable but NOT estimable:**\n→ Disclose, don't accrue"
        },
        {
          title: 'Measurement of Loss',
          type: 'text',
          content: "**When amount is a range:**\n\n**If best estimate within range exists:**\n• Accrue best estimate\n\n**If no best estimate:**\n• Accrue MINIMUM of range\n• Disclose full range\n\n**Example:**\nRange: $1M - $5M\nNo best estimate → Accrue $1M"
        },
        {
          title: 'Disclosure Requirements',
          type: 'text',
          content: "**For accrued contingencies:**\n• Nature of contingency\n• Amount accrued\n\n**For disclosed (not accrued):**\n• Nature of contingency\n• Estimate of possible loss (or state cannot estimate)\n\n**May omit if prejudicial** (rare exception for litigation)"
        },
        {
          title: 'Gain Contingencies',
          type: 'text',
          content: "**Conservative treatment:**\n\n• NEVER accrue gain contingencies\n• May disclose if probable\n• Avoid misleading implications\n\n**Examples:**\n• Pending lawsuits (plaintiff)\n• Claims for insurance recovery\n• Tax refund claims\n\n**Recognize only when realized!**"
        },
        {
          title: '⚠️ Exam Trap: Warranty Costs',
          type: 'warning',
          content: "**Warranty = Always accrue!**\n\n• Sale occurs → Probable warranty claims\n• Past history → Estimable amount\n\n**Accrue at time of sale:**\nDr Warranty Expense\n    Cr Warranty Liability\n\n**When claims paid:**\nDr Warranty Liability\n    Cr Cash/Parts"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Accrue if: Probable AND Estimable",
            "Disclose if: Probable but not estimable, or Reasonably possible",
            "Remote contingencies: Generally no action",
            "Range with no best estimate: Accrue minimum",
            "Gain contingencies: NEVER accrue, may disclose",
            "Warranties: Always accrue (probable and estimable)",
            "May omit disclosure if prejudicial (litigation)"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-027',
    section: 'FAR',
    title: "Equity Method Investments",
    description: "Master accounting for significant influence investments",
    order: 92,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Investments", "Equity Method"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Equity method applies to investments with significant influence! Understanding how to apply it—including basis differences and intercompany transactions—is critical for FAR!"
        },
        {
          title: 'When to Use Equity Method',
          type: 'text',
          content: "**Significant influence presumed at 20-50% ownership:**\n\n**Indicators of significant influence:**\n• Board representation\n• Policy-making participation\n• Material transactions\n• Interchange of personnel\n• Technical dependence\n\n**Can rebut presumption either direction**"
        },
        {
          title: 'Basic Equity Method Entries',
          type: 'table',
          headers: ['Event', 'Journal Entry', 'Effect on Investment'],
          rows: [
            ['Record % of income', 'Dr Investment, Cr Equity income', 'Increase'],
            ['Record % of loss', 'Dr Equity loss, Cr Investment', 'Decrease'],
            ['Receive dividends', 'Dr Cash, Cr Investment', 'Decrease'],
            ['Excess amortization', 'Dr Equity income, Cr Investment', 'Decrease']
          ]
        },
        {
          title: '🧠 Memory Aid: Investment Balance',
          type: 'callout',
          content: "**\"CIDE\"** changes investment:\n\n**C**ost (initial investment)\n**I**ncome (% of investee earnings)\n**D**ividends (received)\n**E**xcess amortization (basis differences)\n\n**Investment = Cost + Income − Dividends − Excess**"
        },
        {
          title: 'Basis Differences',
          type: 'text',
          content: "**When cost ≠ % of book value:**\n\n**Excess over book value:**\n• Allocate to identifiable assets (FV > BV)\n• Remainder = Goodwill\n\n**Amortization:**\n• Depreciable assets → Amortize over useful life\n• Inventory → Expense when sold\n• Goodwill → Not amortized (but test for impairment)\n\n**Reduces equity income each period**"
        },
        {
          title: 'Intercompany Transactions',
          type: 'text',
          content: "**Eliminate investor's % of unrealized profit:**\n\n**Downstream (investor → investee):**\n• Eliminate % of profit from investor's income\n\n**Upstream (investee → investor):**\n• Eliminate % of profit from equity income\n\n**Profit realized when asset sold to third party**"
        },
        {
          title: 'Investment Below Zero',
          type: 'text',
          content: "**When losses exceed investment:**\n\n• Stop recognizing losses at zero\n• Continue recognizing if:\n  - Guaranteed investee debt\n  - Made loans/advances\n  - Committed to provide support\n\n**Apply losses to other investments in investee first**"
        },
        {
          title: '⚠️ Exam Trap: Change in Level of Influence',
          type: 'warning',
          content: "**If drop below 20%:**\n• Stop equity method\n• Carry investment at FV (usually)\n• Use new basis going forward\n\n**If acquire additional and exceed 50%:**\n• Now consolidated\n• Remeasure prior investment to FV\n• Recognize gain/loss"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Equity method: 20-50% ownership (significant influence)",
            "Record % of income; dividends reduce investment",
            "Basis differences: Allocate excess to assets, amortize",
            "Goodwill: Not amortized, test for impairment",
            "Intercompany: Eliminate % of unrealized profit",
            "Losses limited to investment plus committed amounts",
            "Change in influence: Stop/start method, remeasure"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-028',
    section: 'FAR',
    title: "Consolidation: Noncontrolling Interests",
    description: "Account for NCI in consolidated financial statements",
    order: 93,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Consolidation", "NCI"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When parent owns less than 100%, noncontrolling interest exists! Understanding how to present NCI in consolidated statements—and what gets allocated to it—is essential for FAR!"
        },
        {
          title: 'What Is NCI?',
          type: 'text',
          content: "**Noncontrolling interest:**\n\n• Portion of subsidiary NOT owned by parent\n• Equity component of consolidated F/S\n• Presented within equity, separate from parent's equity\n\n**Example:**\nParent owns 80% of Sub\nNCI = 20% of Sub"
        },
        {
          title: 'Initial Measurement',
          type: 'table',
          headers: ['Method', 'NCI Measurement', 'Goodwill'],
          rows: [
            ['Full goodwill (most common)', 'Fair value of NCI', 'Includes NCI portion'],
            ['Proportionate goodwill', 'NCI % × Sub book value', 'Only parent\'s portion']
          ]
        },
        {
          title: '🧠 Memory Aid: NCI in Equity',
          type: 'callout',
          content: "**NCI is EQUITY, not liability!**\n\n**Presented:**\n• Within equity section\n• Separate line from parent's equity\n\n**Allocate to NCI:**\n• % of subsidiary income/loss\n• % of OCI\n• Dividends to NCI shareholders"
        },
        {
          title: 'Consolidated Income Statement',
          type: 'text',
          content: "**Bottom of income statement:**\n\nNet income: $X\n  Net income attributable to NCI: $(Y)\n  Net income attributable to Parent: $X-Y\n\n**NCI gets their %:**\n• Of subsidiary's net income\n• After fair value adjustments\n• Including excess amortization"
        },
        {
          title: 'Changes in Ownership',
          type: 'text',
          content: "**Parent buys more (stays in control):**\n• Equity transaction (APIC adjustment)\n• No gain/loss recognized\n• NCI decreases\n\n**Parent sells some (maintains control):**\n• Equity transaction (APIC adjustment)\n• No gain/loss recognized\n• NCI increases\n\n**Deconsolidation (loses control):**\n• Gain/loss recognized in P&L"
        },
        {
          title: '⚠️ Exam Trap: Losses Exceeding NCI',
          type: 'warning',
          content: "**Under current GAAP:**\n\n• Losses allocated to NCI even if goes negative\n• NCI can have negative balance\n• Parent absorbs all losses historically is OLD rule\n\n**NCI shares in ALL income and losses!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NCI: Portion of subsidiary not owned by parent",
            "Presented in equity, separate from parent's equity",
            "Full goodwill: Measure NCI at fair value",
            "Allocate % of income, loss, and OCI to NCI",
            "Changes maintaining control: Equity transactions",
            "Loss of control: Gain/loss recognized",
            "Losses can make NCI balance negative"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-029',
    section: 'FAR',
    title: "Statement of Cash Flows: Operating Section",
    description: "Master direct and indirect methods for operating activities",
    order: 94,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Cash Flows", "Operating Activities"],
    blueprintArea: 'FAR-IV',
    blueprintTopic: 'FAR-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The operating section is the most complex part of the cash flow statement! Understanding both indirect and direct methods—and the adjustments needed—is essential for FAR!"
        },
        {
          title: 'Two Methods',
          type: 'text',
          content: "**Indirect method (most common):**\n• Start with net income\n• Adjust for non-cash items\n• Adjust for working capital changes\n\n**Direct method:**\n• Show gross cash receipts/payments\n• Requires supplemental reconciliation\n\n**Same total CFO—different presentation**"
        },
        {
          title: 'Indirect Method Adjustments',
          type: 'table',
          headers: ['Item', 'Adjustment', 'Why'],
          rows: [
            ['Depreciation', 'ADD', 'Non-cash expense'],
            ['Gain on sale', 'SUBTRACT', 'Investing, not operating'],
            ['Loss on sale', 'ADD', 'Investing, not operating'],
            ['↑ Receivables', 'SUBTRACT', 'Sales > Cash collected'],
            ['↓ Inventory', 'ADD', 'COGS > Purchases'],
            ['↑ Payables', 'ADD', 'Expenses > Cash paid'],
            ['Deferred tax expense', 'ADD', 'Non-cash portion']
          ]
        },
        {
          title: '🧠 Memory Aid: Working Capital',
          type: 'callout',
          content: "**\"IOLA\"** for current assets:\n\n**I**ncrease in asset = **O**ut (subtract)\n**L**oss of asset = **A**dd\n\n**Opposite for liabilities:**\n• Increase in liability = ADD\n• Decrease in liability = SUBTRACT"
        },
        {
          title: 'Direct Method Categories',
          type: 'text',
          content: "**Cash receipts:**\n• Cash collected from customers\n• Interest received\n• Dividends received\n\n**Cash payments:**\n• Cash paid to suppliers\n• Cash paid to employees\n• Interest paid\n• Income taxes paid"
        },
        {
          title: 'Converting to Direct Method',
          type: 'text',
          content: "**Cash from customers:**\nSales − ↑A/R (or + ↓A/R)\n\n**Cash to suppliers:**\nCOGS + ↑Inventory − ↑A/P\n\n**Cash for expenses:**\nExpenses + ↑Prepaids − ↑Accrued liabilities\n\n**Use T-accounts to trace!**"
        },
        {
          title: '⚠️ Exam Trap: Interest and Dividends',
          type: 'warning',
          content: "**Under U.S. GAAP:**\n\n**Operating:**\n• Interest paid\n• Interest received\n• Dividends received\n\n**Financing:**\n• Dividends PAID\n\n**IFRS allows more flexibility in classification!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Indirect: Net income → Adjustments → CFO",
            "Add back non-cash expenses (depreciation, amortization)",
            "Remove gains (subtract), add back losses",
            "Current asset increase = Subtract; Decrease = Add",
            "Current liability increase = Add; Decrease = Subtract",
            "Direct: Gross receipts and payments shown",
            "Interest paid/received = Operating (GAAP)"
          ]
        }
      ]
    }
  },

  // =============================================
  // FAR: GOVERNMENT ACCOUNTING
  // =============================================
  {
    id: 'FAR-V-030',
    section: 'FAR',
    title: "Government Fund Accounting Basics",
    description: "Master the fund structure and measurement focus",
    order: 95,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Government Accounting", "Fund Accounting", "GASB"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Government accounting uses FUNDS to track resources! Understanding the fund categories, measurement focus, and basis of accounting is essential. This is a major FAR topic!"
        },
        {
          title: 'Fund Categories',
          type: 'table',
          headers: ['Category', 'Fund Types', 'Purpose'],
          rows: [
            ['Governmental', 'General, Special Revenue, Capital Projects, Debt Service, Permanent', 'Most activities'],
            ['Proprietary', 'Enterprise, Internal Service', 'Business-type'],
            ['Fiduciary', 'Custodial, Pension, Investment Trust, Private-purpose Trust', 'Held for others']
          ]
        },
        {
          title: '🧠 Memory Aid: "GR CEPS DIP"',
          type: 'callout',
          content: "**Governmental funds:**\n\n**G**eneral\n**R**evenue (Special)\n**C**apital Projects\n**E**mergency... wait, no:\n**D**ebt Service\n**P**ermanent\n\n**\"Go Run CoPs, Dr. Peppers\"**"
        },
        {
          title: 'Measurement Focus and Basis',
          type: 'text',
          content: "**Governmental funds:**\n• **Focus:** Current financial resources\n• **Basis:** Modified accrual\n• Report assets that can be spent\n\n**Proprietary & Fiduciary:**\n• **Focus:** Economic resources\n• **Basis:** Full accrual\n• Like commercial accounting"
        },
        {
          title: 'Modified Accrual Basis',
          type: 'text',
          content: "**Revenues recognized when:**\n• Measurable AND Available\n• Available = Collected within 60 days\n\n**Expenditures recognized when:**\n• Liability incurred (usually)\n• Exceptions: Debt service, claims/judgments\n\n**No depreciation in governmental funds!**"
        },
        {
          title: 'Fund Balance Categories',
          type: 'table',
          headers: ['Category', 'Constraint', 'Example'],
          rows: [
            ['Nonspendable', 'Form precludes', 'Inventory, prepaid'],
            ['Restricted', 'External constraint', 'Grant requirements'],
            ['Committed', 'Highest internal action', 'Board resolution'],
            ['Assigned', 'Management intent', 'Encumbrances'],
            ['Unassigned', 'None', 'General fund only']
          ]
        },
        {
          title: '⚠️ Exam Trap: General Fund',
          type: 'warning',
          content: "**General Fund is UNIQUE:**\n\n• Only fund that can have UNASSIGNED balance\n• Must be used for activities not assigned elsewhere\n• All governments MUST have General Fund\n\n**Other funds can have NEGATIVE assigned balance = Unassigned**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Three fund categories: Governmental, Proprietary, Fiduciary",
            "Governmental: Modified accrual, current resources",
            "Proprietary/Fiduciary: Full accrual, economic resources",
            "Modified accrual: Measurable AND available",
            "Fund balance: Nonspendable → Unassigned hierarchy",
            "Only General Fund can have unassigned balance",
            "No depreciation in governmental funds"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-031',
    section: 'FAR',
    title: "Government-wide Financial Statements",
    description: "Understand full accrual conversion and dual perspective",
    order: 96,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Government Accounting", "GASB", "Financial Statements"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Government-wide statements show the BIG PICTURE! Understanding the conversion from fund-level modified accrual to government-wide full accrual is a key exam skill!"
        },
        {
          title: 'Government-wide Statements',
          type: 'text',
          content: "**Two required statements:**\n\n**1. Statement of Net Position**\n• Assets + Deferred outflows\n• − Liabilities − Deferred inflows\n• = Net Position\n\n**2. Statement of Activities**\n• Program revenues vs expenses\n• Net (expense) revenue format"
        },
        {
          title: 'Conversion Adjustments',
          type: 'table',
          headers: ['Fund Level', 'Government-wide Adjustment', 'Effect'],
          rows: [
            ['Capital outlay', 'Capitalize as asset', 'Add asset'],
            ['No depreciation', 'Add depreciation expense', 'Reduce net position'],
            ['Bond proceeds (OFS)', 'Record as liability', 'Add liability'],
            ['Principal payment', 'Reduce liability', 'No expense'],
            ['Receivables > 60 days', 'Add to revenue', 'Increase revenue']
          ]
        },
        {
          title: '🧠 Memory Aid: Full Accrual',
          type: 'callout',
          content: "**\"GLAAD\" Adjustments:**\n\n**G**apital assets (capitalize)\n**L**ong-term liabilities (add)\n**A**ccrued revenues (beyond 60 days)\n**A**ccrued expenses\n**D**epreciation (add expense)\n\n**Modified → Full accrual**"
        },
        {
          title: 'Net Position Categories',
          type: 'text',
          content: "**Three categories:**\n\n**1. Net investment in capital assets**\n• Capital assets, net of depreciation\n• Less related debt\n\n**2. Restricted**\n• External restrictions\n\n**3. Unrestricted**\n• Everything else"
        },
        {
          title: 'Statement of Activities Format',
          type: 'text',
          content: "**Net (expense) format:**\n\nExpenses\n− Program revenues (charges, grants)\n= Net expense\n\n+ General revenues (taxes, interest)\n= Change in net position\n\n**Separates governmental from business-type**"
        },
        {
          title: '⚠️ Exam Trap: Internal Service Funds',
          type: 'warning',
          content: "**ISF on government-wide statements:**\n\n• Report with GOVERNMENTAL activities\n• NOT with business-type activities\n• Because ISF primarily serves governmental\n\n**Enterprise funds = Business-type activities**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Government-wide: Full accrual, economic resources",
            "Two statements: Net Position, Activities",
            "Convert fund statements → Government-wide",
            "Add capital assets, long-term debt, depreciation",
            "Net position: Invested in capital, Restricted, Unrestricted",
            "Internal service funds → Governmental activities",
            "Net expense format shows cost of services"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-032',
    section: 'FAR',
    title: "Not-for-Profit Financial Statements",
    description: "Master NFP financial statement requirements",
    order: 97,
    duration: 50,
    difficulty: 'advanced',
    topics: ["NFP Accounting", "Financial Statements", "Net Assets"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "NFP financial statements are different from business! Understanding net asset classes, statement formats, and donor restrictions is essential for FAR. Major testing area!"
        },
        {
          title: 'Required Financial Statements',
          type: 'text',
          content: "**Four required statements:**\n\n1. **Statement of Financial Position** (like B/S)\n2. **Statement of Activities** (like I/S)\n3. **Statement of Cash Flows** (similar)\n4. **Statement of Functional Expenses** (unique!)\n\n**All follow ASC 958**"
        },
        {
          title: 'Net Asset Classes',
          type: 'table',
          headers: ['Class', 'Restrictions', 'Examples'],
          rows: [
            ['Without restrictions', 'None', 'General contributions'],
            ['With restrictions', 'Donor-imposed', 'Purpose or time-restricted'],
            ['Perpetual', 'Never spent (principal)', 'Endowment principal']
          ]
        },
        {
          title: '🧠 Memory Aid: Two Classes Now',
          type: 'callout',
          content: "**OLD (3 classes):**\n• Unrestricted\n• Temporarily restricted\n• Permanently restricted\n\n**NEW (2 classes - ASU 2016-14):**\n• **Without** donor restrictions\n• **With** donor restrictions\n\n**Simpler!**"
        },
        {
          title: 'Statement of Activities',
          type: 'text',
          content: "**Shows:**\n• Revenues (by net asset class)\n• Expenses (only without restrictions)\n• Net releases from restrictions\n• Change in net assets\n\n**Expenses always in \"without restrictions\"**\n\n**Contributions increase restricted or unrestricted**"
        },
        {
          title: 'Statement of Functional Expenses',
          type: 'text',
          content: "**Shows expenses by:**\n\n**Function:**\n• Program services\n• Supporting activities (management, fundraising)\n\n**Nature:**\n• Salaries, rent, depreciation, etc.\n\n**Matrix format showing both**"
        },
        {
          title: '⚠️ Exam Trap: Expense Classification',
          type: 'warning',
          content: "**Joint costs allocation:**\n\nWhen activity has multiple purposes (program + fundraising):\n\n• Must meet 3 criteria to allocate\n• Purpose, Audience, Content tests\n• If all three not met: 100% to fundraising\n\n**Fundraising ratio is watched closely!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four NFP statements required",
            "Two net asset classes: With/Without restrictions",
            "Expenses always shown without restrictions",
            "Releases shift from restricted → unrestricted",
            "Functional expenses: Program vs Supporting",
            "Joint cost allocation: 3 criteria required",
            "Statement of functional expenses is unique to NFP"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-V-033',
    section: 'FAR',
    title: "NFP Contributions and Promises",
    description: "Apply contribution recognition and pledges receivable",
    order: 98,
    duration: 50,
    difficulty: 'advanced',
    topics: ["NFP Accounting", "Contributions", "Pledges"],
    blueprintArea: 'FAR-V',
    blueprintTopic: 'FAR-V-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Contributions are the lifeblood of NFPs! Understanding when to recognize revenue, how to handle promises, and conditional vs unconditional gifts is critical!"
        },
        {
          title: 'Contribution Recognition',
          type: 'text',
          content: "**Unconditional contributions:**\n• Recognize when received/promised\n• Either restricted or unrestricted\n\n**Conditional contributions:**\n• Record when condition is met\n• Before that: No revenue or receivable\n\n**Key distinction on exam!**"
        },
        {
          title: 'Conditional vs Unconditional',
          type: 'table',
          headers: ['Type', 'Has', 'Recognition'],
          rows: [
            ['Unconditional', 'Restriction only', 'Immediate'],
            ['Conditional', 'Barrier to entitlement', 'When condition met'],
            ['Conditional', 'Right of return/release', 'When condition met']
          ]
        },
        {
          title: '🧠 Memory Aid: Barrier Test',
          type: 'callout',
          content: "**\"Barrier\" = Must DO something**\n\n**Conditional (barrier exists):**\n• \"Raise matching funds\"\n• \"Achieve certain outcomes\"\n\n**Unconditional (restriction only):**\n• \"Use for scholarships\"\n• \"Spend after Jan 1, 2025\"\n\n**Restriction = How to use**\n**Condition = Must earn it**"
        },
        {
          title: 'Promises to Give (Pledges)',
          type: 'text',
          content: "**Unconditional pledge:**\n• Record at fair value\n• Multi-year: Present value\n• Allow for uncollectibles\n\n**Recognition:**\n• < 1 year: Without restrictions (unless restricted)\n• > 1 year: With restrictions (time restriction implied)\n\n**As time passes: Release restriction**"
        },
        {
          title: 'Contributed Services',
          type: 'text',
          content: "**Only recognize if:**\n\n• Create/enhance nonfinancial asset, OR\n• Require specialized skills AND\n  Would be purchased if not donated\n\n**Examples:**\n✓ Attorney provides legal services\n✓ Electrician wires building\n✗ Volunteer shelving books\n✗ General administrative help"
        },
        {
          title: '⚠️ Exam Trap: Donor-Imposed',
          type: 'warning',
          content: "**Only DONOR can impose restrictions!**\n\n• Board cannot restrict net assets\n• Board can \"designate\" but it's still unrestricted\n• Called \"board-designated\"\n\n**Disclosure required but NOT separately classified!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Unconditional: Recognize immediately at FV",
            "Conditional: Barrier + Right of return must be met",
            "Multi-year pledges: PV, time-restricted",
            "Release restrictions when met",
            "Contributed services: Specialized skills required",
            "Board designation ≠ Donor restriction",
            "Conditional: No revenue until condition met"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-020',
    section: 'FAR',
    title: "Bonds Payable: Premium and Discount",
    description: "Master bond issuance and effective interest method",
    order: 99,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Liabilities", "Bonds", "Effective Interest"],
    blueprintArea: 'FAR-II',
    blueprintTopic: 'FAR-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Bonds are major financing! Understanding premium vs discount, effective interest method, and interest expense calculation is essential. Heavily tested on FAR!"
        },
        {
          title: 'Bond Price vs Face',
          type: 'table',
          headers: ['Scenario', 'Price', 'Result'],
          rows: [
            ['Market rate = Stated rate', 'At par', 'No premium/discount'],
            ['Market rate < Stated rate', 'At premium', 'Issued above face'],
            ['Market rate > Stated rate', 'At discount', 'Issued below face']
          ]
        },
        {
          title: '🧠 Memory Aid: Rate Relationship',
          type: 'callout',
          content: "**\"Investors want MARKET rate\"**\n\n**High stated rate = Premium:**\nInvestors pay MORE for higher interest\n\n**Low stated rate = Discount:**\nInvestors pay LESS for lower interest\n\n**Market rate ALWAYS wins!**"
        },
        {
          title: 'Effective Interest Method',
          type: 'text',
          content: "**Each period:**\n\n**Interest expense** = Carrying value × Market rate\n\n**Cash payment** = Face value × Stated rate\n\n**Difference = Amortization**\n\n• Premium: Expense < Cash → Reduce premium\n• Discount: Expense > Cash → Reduce discount"
        },
        {
          title: 'Amortization Entries',
          type: 'text',
          content: "**Premium amortization:**\nDr Interest expense (smaller)\nDr Premium on bonds (difference)\n    Cr Cash (stated × face)\n\n**Discount amortization:**\nDr Interest expense (larger)\n    Cr Discount on bonds (difference)\n    Cr Cash (stated × face)"
        },
        {
          title: 'Carrying Value Over Time',
          type: 'text',
          content: "**Premium bonds:**\n• Carrying value DECREASES\n• Approaches face value at maturity\n\n**Discount bonds:**\n• Carrying value INCREASES\n• Approaches face value at maturity\n\n**At maturity: CV = Face value (always)**"
        },
        {
          title: '⚠️ Exam Trap: Interest Expense Trend',
          type: 'warning',
          content: "**Interest expense changes each period!**\n\n**Premium:**\n• CV decreases → Interest expense decreases\n\n**Discount:**\n• CV increases → Interest expense increases\n\n**Expense = CV × Market rate**\n**CV changes → Expense changes**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Market rate < Stated = Premium (pay more)",
            "Market rate > Stated = Discount (pay less)",
            "Interest expense = CV × Market rate",
            "Cash paid = Face × Stated rate",
            "Premium: Expense decreases over time",
            "Discount: Expense increases over time",
            "At maturity: CV = Face value"
          ]
        }
      ]
    }
  },
  {
    id: 'FAR-III-021',
    section: 'FAR',
    title: "Deferred Revenue and Contract Liabilities",
    description: "Understand performance obligations and timing",
    order: 100,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Revenue Recognition", "Liabilities", "ASC 606"],
    blueprintArea: 'FAR-III',
    blueprintTopic: 'FAR-III-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cash received before performance creates a contract liability! Understanding when to recognize versus defer revenue is fundamental to proper financial reporting!"
        },
        {
          title: 'Contract Liability Definition',
          type: 'text',
          content: "**Contract liability (deferred revenue):**\n\n• Entity received consideration\n• Performance obligation not yet satisfied\n• Obligation to transfer goods/services\n\n**Examples:**\n• Advance payments\n• Subscriptions received in advance\n• Gift cards"
        },
        {
          title: 'Recognition Pattern',
          type: 'table',
          headers: ['Event', 'Debit', 'Credit'],
          rows: [
            ['Receive cash (advance)', 'Cash', 'Contract liability'],
            ['Satisfy obligation', 'Contract liability', 'Revenue'],
            ['Partial performance', 'Contract liability (partial)', 'Revenue (partial)']
          ]
        },
        {
          title: '🧠 Memory Aid: Earned vs Received',
          type: 'callout',
          content: "**Revenue recognition:**\n\n**Cash received ≠ Revenue earned**\n\n**Must satisfy performance obligation!**\n\n**Cash first → Contract liability**\n**Obligation first → Contract asset**"
        },
        {
          title: 'Gift Card Breakage',
          type: 'text',
          content: "**Some gift cards never redeemed:**\n\n**If breakage estimated:**\n• Recognize revenue proportionally\n• As customer redeems other cards\n\n**If breakage not estimable:**\n• Recognize when likelihood of redemption is remote\n\n**Still a contract liability until recognized!**"
        },
        {
          title: 'Customer Prepayments',
          type: 'text',
          content: "**Common scenarios:**\n\n• Magazine subscriptions\n• Maintenance contracts\n• Season tickets\n• Rent received in advance\n\n**Recognize:**\n• Over time as services provided\n• At point in time when goods delivered\n\n**Match revenue to performance!**"
        },
        {
          title: '⚠️ Exam Trap: Balance Sheet Classification',
          type: 'warning',
          content: "**Current vs Noncurrent:**\n\n• Satisfy within 12 months = Current\n• Satisfy after 12 months = Noncurrent\n\n**Multi-year contracts:**\n• Allocate between current and noncurrent\n• Based on when obligations will be satisfied"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Contract liability: Cash received, obligation pending",
            "Recognize revenue when obligation satisfied",
            "Gift card breakage: Proportional or remote method",
            "Match revenue recognition to performance",
            "Current/Noncurrent based on timing",
            "Advance payment is NOT revenue",
            "Contract liability ≠ Accounts payable"
          ]
        }
      ]
    }
  }
];
