/**
 * CMA Part 1, Section F: Technology and Analytics
 * Weight: 15% of Part 1 Exam
 * 
 * Topics covered:
 * - Information systems
 * - Data governance
 * - Technology-enabled finance transformation
 * - Data analytics
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma1FLessons: Lesson[] = [
  // ============================================================================
  // CMA1-F: TECHNOLOGY AND ANALYTICS (Lessons 1-8)
  // ============================================================================
  
  {
    id: 'CMA1-F-001',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Information Systems in Organizations',
    description: 'Understand enterprise systems and their role in management accounting',
    order: 47,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['ERP systems', 'Financial systems', 'Integration', 'System architecture'],
    blueprintArea: 'CMA1-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Technology is transforming the CMA role! Understanding ERP systems, data flows, and analytics tools is no longer optional. CMAs who leverage technology effectively deliver faster insights and become strategic partners. This is the future of our profession.",
        },
        {
          title: 'Enterprise Resource Planning (ERP)',
          type: 'text',
          content: "**Definition:**\nIntegrated software that manages core business processes across the organization.\n\n**Key characteristics:**\n• Single database (one source of truth)\n• Real-time processing\n• Integrated modules\n• Standardized processes\n\n**Major vendors:**\n• SAP\n• Oracle\n• Microsoft Dynamics\n• Workday\n• NetSuite",
        },
        {
          title: 'ERP Modules',
          type: 'table',
          headers: ['Module', 'Functions', 'Key Data'],
          rows: [
            ['Finance/Accounting', 'GL, AP, AR, FA', 'Journal entries, balances'],
            ['Human Resources', 'Payroll, benefits, talent', 'Employee records, compensation'],
            ['Supply Chain', 'Procurement, inventory', 'POs, receipts, stock levels'],
            ['Manufacturing', 'Production, quality', 'BOMs, work orders, WIP'],
            ['Sales/CRM', 'Orders, customers', 'Quotes, orders, customer data'],
          ],
        },
        {
          title: '🧠 Memory Aid: ERP Benefits',
          type: 'callout',
          content: "**\"SIRRI\"** - Why organizations implement ERP:\n\n**S**tandardization of processes\n**I**ntegration across functions\n**R**eal-time information\n**R**educed data redundancy\n**I**mproved decision-making\n\n**But remember: ERP implementations often fail due to poor change management!**",
        },
        {
          title: 'System Integration Approaches',
          type: 'text',
          content: "**Ways systems exchange data:**\n\n**Point-to-point:**\n• Direct connections between systems\n• Simple but becomes complex at scale\n• \"Spaghetti\" architecture problem\n\n**Middleware/ESB:**\n• Central hub for integrations\n• Standardized messaging\n• Easier to maintain\n\n**APIs (Application Programming Interfaces):**\n• Modern standard approach\n• Real-time data exchange\n• Enables cloud integrations\n\n**CMAs must understand data flows between systems!**",
        },
        {
          title: 'Cloud vs. On-Premise',
          type: 'table',
          headers: ['Aspect', 'Cloud (SaaS)', 'On-Premise'],
          rows: [
            ['Cost structure', 'Subscription (OpEx)', 'Upfront + maintenance (CapEx)'],
            ['Implementation', 'Faster deployment', 'Longer implementation'],
            ['Customization', 'Limited/configuration', 'High customization'],
            ['Updates', 'Automatic, vendor-managed', 'Self-managed updates'],
            ['Data location', 'Vendor data centers', 'On-site control'],
            ['Scalability', 'Elastic, easy to scale', 'Requires hardware'],
          ],
        },
        {
          title: 'Master Data Management',
          type: 'text',
          content: "**What is master data?**\nCore business entities that are used across multiple systems:\n• Customers\n• Vendors\n• Products/materials\n• Chart of accounts\n• Cost centers\n• Employees\n\n**Why it matters:**\nInconsistent master data = incorrect reports, duplicate payments, lost sales\n\n**Best practices:**\n• Single source of truth\n• Clear ownership\n• Data quality standards\n• Change management process",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ERP integrates core processes in a single database",
            "Real-time processing enables faster decision-making",
            "Major modules: Finance, HR, Supply Chain, Manufacturing, Sales",
            "APIs are the modern standard for system integration",
            "Cloud offers subscription model and faster deployment",
            "Master data quality is critical for accurate reporting",
            "ERP implementations often fail due to poor change management",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-F-002',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Data Governance and Quality',
    description: 'Implement data governance frameworks and ensure data quality',
    order: 48,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Data governance', 'Data quality', 'Metadata', 'Data stewardship'],
    blueprintArea: 'CMA1-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "\"Garbage in, garbage out\" applies to analytics. CMAs rely on data for every analysis and report. Poor data quality leads to bad decisions. Understanding data governance ensures the data you use is trustworthy and reliable.",
        },
        {
          title: 'Data Governance Framework',
          type: 'text',
          content: "**Definition:**\nThe overall management of data availability, usability, integrity, and security across the organization.\n\n**Key components:**\n• **Policies:** Rules for data usage and access\n• **Standards:** Formats, definitions, quality requirements\n• **Processes:** How data is created, maintained, retired\n• **Roles:** Who is responsible for data\n\n**Goal: Treat data as a strategic asset!**",
        },
        {
          title: 'Data Quality Dimensions',
          type: 'table',
          headers: ['Dimension', 'Definition', 'Example Issue'],
          rows: [
            ['Accuracy', 'Data correctly represents reality', 'Wrong address for customer'],
            ['Completeness', 'All required data is present', 'Missing email addresses'],
            ['Consistency', 'Same value across systems', 'Customer name spelled differently'],
            ['Timeliness', 'Data is current and available', 'Yesterday\'s prices in trading system'],
            ['Validity', 'Data conforms to business rules', 'State code not in valid list'],
            ['Uniqueness', 'No duplicate records', 'Same customer entered twice'],
          ],
        },
        {
          title: '🧠 Memory Aid: Data Quality',
          type: 'callout',
          content: "**\"ACCTUV\"** - Six quality dimensions:\n\n**A**ccuracy\n**C**ompleteness\n**C**onsistency\n**T**imeliness\n**U**niqueness\n**V**alidity\n\n**Before using data, ask: Does it meet these criteria?**",
        },
        {
          title: 'Data Stewardship',
          type: 'text',
          content: "**Data owners:**\n• Business executives accountable for data domains\n• Define policies and access rules\n• Accountable for data quality\n\n**Data stewards:**\n• Day-to-day data management\n• Implement owner policies\n• Monitor quality metrics\n• Resolve data issues\n\n**Data custodians (IT):**\n• Technical implementation\n• Storage, backup, security\n• System administration\n\n**Everyone has a role in data quality!**",
        },
        {
          title: 'Metadata Management',
          type: 'text',
          content: "**Metadata = \"Data about data\"**\n\n**Types:**\n• Business metadata (definitions, ownership)\n• Technical metadata (format, location, relationships)\n• Operational metadata (when created, access logs)\n\n**Data dictionary/catalog:**\n• Central repository of metadata\n• Helps users find and understand data\n• Essential for self-service analytics\n\n**Example:** \"Customer_ID\" - Primary key, integer, created by CRM system, owned by Sales department",
        },
        {
          title: 'Data Quality Monitoring',
          type: 'text',
          content: "**Proactive monitoring:**\n• Data profiling (analyze current state)\n• Quality rules and thresholds\n• Automated alerts\n• Regular quality reports\n\n**Quality metrics:**\n• % records passing validation\n• Duplicate rate\n• Missing value rate\n• Error rate by source\n\n**Remediation process:**\n• Identify issues\n• Root cause analysis\n• Fix source processes\n• Correct existing data",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Data governance manages data as a strategic asset",
            "Six quality dimensions: Accuracy, Completeness, Consistency, Timeliness, Uniqueness, Validity",
            "Data owners are accountable; stewards handle day-to-day management",
            "Metadata describes data and enables discovery",
            "Data dictionary/catalog is essential for self-service analytics",
            "Proactive monitoring catches issues before they impact decisions",
            "Poor data quality undermines all analytics efforts",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-F-003',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Business Intelligence and Reporting',
    description: 'Leverage BI tools for analysis, visualization, and reporting',
    order: 49,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['BI platforms', 'Dashboards', 'Data visualization', 'Self-service analytics'],
    blueprintArea: 'CMA1-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "BI tools transform raw data into actionable insights. CMAs no longer just create reports - we build dashboards, design visualizations, and enable self-service analytics. These skills multiply your impact across the organization.",
        },
        {
          title: 'Business Intelligence Stack',
          type: 'text',
          content: "**Data sources:**\n• ERP, CRM, operational systems\n• External data feeds\n• Spreadsheets, flat files\n\n**Data warehouse:**\n• Centralized repository\n• Structured for analysis\n• Historical data retained\n\n**BI/Analytics tools:**\n• Reporting and dashboards\n• Ad-hoc analysis\n• Data visualization\n\n**Common BI tools:** Power BI, Tableau, Qlik, Looker, SAP Analytics",
        },
        {
          title: 'Data Warehouse Concepts',
          type: 'table',
          headers: ['Concept', 'Description', 'Example'],
          rows: [
            ['Fact table', 'Numeric measures', 'Sales amount, quantity sold'],
            ['Dimension table', 'Descriptive attributes', 'Product name, customer region'],
            ['Star schema', 'Fact surrounded by dimensions', 'Sales fact with date, product, customer dims'],
            ['ETL', 'Extract, Transform, Load', 'Move data from ERP to warehouse'],
            ['OLAP cube', 'Multi-dimensional analysis', 'Slice/dice by multiple dimensions'],
          ],
        },
        {
          title: 'Effective Dashboard Design',
          type: 'text',
          content: "**Design principles:**\n\n**1. Know your audience:**\n• Executive: High-level KPIs, exceptions\n• Operational: Detailed, actionable metrics\n\n**2. Focus on key metrics:**\n• Limit to 5-10 metrics per dashboard\n• Show what matters, not what's easy\n\n**3. Use appropriate visuals:**\n• Line charts for trends\n• Bar charts for comparisons\n• Tables for precision\n• Avoid pie charts (hard to compare)\n\n**4. Enable drill-down:**\n• Summary to detail capability",
        },
        {
          title: '🧠 Memory Aid: Visualization Selection',
          type: 'callout',
          content: "**\"TCDR\"** - Match chart to purpose:\n\n**T**rend over time → Line chart\n**C**ompare categories → Bar chart\n**D**istribution → Histogram\n**R**elationship → Scatter plot\n\n**Avoid:** 3D charts, gauges (low data-to-ink ratio), pie charts with many slices",
        },
        {
          title: 'Self-Service Analytics',
          type: 'text',
          content: "**Empowering business users:**\n\n**Benefits:**\n• Faster answers to questions\n• Reduced IT/finance bottleneck\n• Increased data literacy\n• More insights discovered\n\n**Requirements:**\n• Governed data sets\n• User-friendly tools\n• Training and support\n• Clear boundaries (security/access)\n\n**CMA role:** Enable self-service AND maintain control over key definitions and calculations",
        },
        {
          title: 'Key Performance Indicators (KPIs)',
          type: 'text',
          content: "**Characteristics of good KPIs:**\n\n• **Specific:** Clearly defined\n• **Measurable:** Quantifiable\n• **Actionable:** Drives behavior\n• **Relevant:** Tied to objectives\n• **Timely:** Available when needed\n\n**Leading vs. Lagging:**\n• Leading: Predict future (pipeline, bookings)\n• Lagging: Confirm results (revenue, profit)\n\n**Balance both types for complete picture!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BI stack: Sources → Warehouse → BI Tools",
            "Star schema: Fact table surrounded by dimension tables",
            "ETL moves and transforms data from sources to warehouse",
            "Dashboard design: Know audience, limit metrics, enable drill-down",
            "Chart selection depends on purpose (trend, compare, distribution)",
            "Self-service analytics requires governed data + training",
            "Balance leading and lagging KPIs for complete view",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-F-004',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Data Analytics Fundamentals',
    description: 'Apply descriptive, diagnostic, predictive, and prescriptive analytics',
    order: 50,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Analytics types', 'Statistical analysis', 'Data mining', 'Machine learning basics'],
    blueprintArea: 'CMA1-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Analytics is the future of management accounting. CMAs who can move beyond reporting to prediction and prescription become invaluable strategic partners. Understanding these techniques helps you ask the right questions and interpret results.",
        },
        {
          title: 'Analytics Maturity Model',
          type: 'text',
          content: "**Four levels of analytics:**\n\n**1. Descriptive:** What happened?\n• Reports, dashboards, queries\n• Historical analysis\n\n**2. Diagnostic:** Why did it happen?\n• Root cause analysis\n• Drill-down investigation\n\n**3. Predictive:** What will happen?\n• Forecasting, modeling\n• Statistical predictions\n\n**4. Prescriptive:** What should we do?\n• Optimization\n• Recommended actions\n\n**Value increases as you move up the maturity curve!**",
        },
        {
          title: '🧠 Memory Aid: Analytics Types',
          type: 'callout',
          content: "**\"3 Ds + P\"** - Remember by questions:\n\n**D**escriptive - \"What happened?\" (look back)\n**D**iagnostic - \"Why?\" (understand)\n**D**ictive (Pre) - \"What will happen?\" (forecast)\n**P**rescriptive - \"What to do?\" (optimize)\n\n**Each level builds on the previous!**",
        },
        {
          title: 'Descriptive Statistics',
          type: 'table',
          headers: ['Measure', 'Purpose', 'Example'],
          rows: [
            ['Mean', 'Average value', 'Average transaction size'],
            ['Median', 'Middle value', 'Median salary (less affected by outliers)'],
            ['Mode', 'Most frequent', 'Most common product ordered'],
            ['Standard deviation', 'Spread/variability', 'Variance in monthly sales'],
            ['Correlation', 'Relationship strength', 'Price vs. quantity relationship'],
          ],
        },
        {
          title: 'Common Analytical Techniques',
          type: 'text',
          content: "**Regression analysis:**\n• Predicts outcome based on inputs\n• Y = a + bX (simple linear)\n• Example: Sales based on advertising spend\n\n**Trend analysis:**\n• Identify patterns over time\n• Seasonal adjustments\n• Example: Revenue growth trajectory\n\n**Variance analysis:**\n• Compare actual to expected\n• Identify significant differences\n• Example: Budget vs. actual analysis\n\n**Ratio analysis:**\n• Compare relationships\n• Benchmark performance\n• Example: Profitability, liquidity ratios",
        },
        {
          title: 'Introduction to Machine Learning',
          type: 'text',
          content: "**What is machine learning?**\nAlgorithms that learn patterns from data without explicit programming.\n\n**Types:**\n• **Supervised:** Learn from labeled examples (predict sales)\n• **Unsupervised:** Find patterns (customer segmentation)\n• **Reinforcement:** Learn through feedback (optimization)\n\n**Finance applications:**\n• Fraud detection\n• Credit scoring\n• Demand forecasting\n• Customer churn prediction\n\n**CMAs don't need to build models but should understand capabilities!**",
        },
        {
          title: 'Data Mining Techniques',
          type: 'text',
          content: "**Clustering:**\n• Group similar items\n• Customer segmentation\n• Product categorization\n\n**Classification:**\n• Predict categories\n• Fraud/not fraud\n• High/medium/low risk\n\n**Association:**\n• Find related items\n• Market basket analysis\n• \"Customers who bought X also bought Y\"\n\n**Anomaly detection:**\n• Identify unusual items\n• Fraud transactions\n• Process exceptions",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four analytics levels: Descriptive → Diagnostic → Predictive → Prescriptive",
            "Value increases at higher maturity levels",
            "Regression predicts outcomes from inputs",
            "Machine learning finds patterns without explicit programming",
            "Key techniques: Clustering, Classification, Association, Anomaly detection",
            "CMAs should understand capabilities, not necessarily build models",
            "Analytics enables insight-driven decisions",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-F-005',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Robotic Process Automation (RPA)',
    description: 'Understand RPA and its application in finance automation',
    order: 51,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['RPA', 'Process automation', 'Bot deployment', 'Use cases'],
    blueprintArea: 'CMA1-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "RPA automates repetitive tasks that consume CMA time. Instead of manual data entry and reconciliations, bots handle routine work while you focus on analysis and insights. Understanding RPA helps you identify automation opportunities and lead transformation.",
        },
        {
          title: 'What is RPA?',
          type: 'text',
          content: "**Definition:**\nSoftware robots that mimic human actions to perform rule-based, repetitive tasks.\n\n**How it works:**\n• Records human actions (clicks, keystrokes)\n• Replays actions automatically\n• Works across multiple applications\n• Runs 24/7 without fatigue\n\n**Major vendors:** UiPath, Automation Anywhere, Blue Prism, Microsoft Power Automate\n\n**RPA doesn't change underlying systems - it works at the user interface!**",
        },
        {
          title: 'RPA in Finance',
          type: 'table',
          headers: ['Process', 'Pre-RPA', 'Post-RPA'],
          rows: [
            ['Invoice processing', 'Manual data entry', 'Auto-extract and enter'],
            ['Bank reconciliation', 'Download, compare, investigate', 'Auto-match, flag exceptions'],
            ['Report generation', 'Collect data, format', 'Auto-compile and distribute'],
            ['Journal entries', 'Manual posting', 'Auto-create recurring entries'],
            ['Data migration', 'Copy/paste between systems', 'Auto-transfer data'],
          ],
        },
        {
          title: 'Ideal RPA Candidates',
          type: 'text',
          content: "**Best processes for RPA:**\n\n**High volume:** Many repetitions justify automation\n**Rule-based:** Clear, consistent logic\n**Standardized:** Low variation in process\n**Stable:** Systems don't change frequently\n**Structured data:** Clear inputs and outputs\n\n**Poor candidates:**\n• Judgment-heavy decisions\n• Frequent exceptions\n• Rapidly changing processes\n• Unstructured data (may need AI)",
        },
        {
          title: '🧠 Memory Aid: RPA Selection',
          type: 'callout',
          content: "**\"HRSS\"** - Good RPA candidates are:\n\n**H**igh volume (lots of transactions)\n**R**ule-based (clear logic)\n**S**tandardized (consistent process)\n**S**table (doesn't change often)\n\n**If it requires judgment → Not RPA (needs human or AI)**",
        },
        {
          title: 'RPA Implementation Considerations',
          type: 'text',
          content: "**Success factors:**\n• Executive sponsorship\n• Process documentation first\n• Start with simple pilots\n• Center of Excellence model\n• Ongoing monitoring and maintenance\n\n**Risks:**\n• \"Paving the cowpath\" (automating bad processes)\n• Bot management complexity\n• Security vulnerabilities\n• Change management with employees\n• Dependency on UI (system changes break bots)\n\n**Best practice:** Optimize process BEFORE automating!",
        },
        {
          title: 'RPA Benefits',
          type: 'text',
          content: "**Quantitative:**\n• 25-80% time savings\n• Near-zero error rates\n• 24/7 availability\n• Faster processing\n• Audit trail automatic\n\n**Qualitative:**\n• Employees shift to higher-value work\n• Improved job satisfaction\n• Scalability (add bots easily)\n• Compliance consistency\n\n**ROI calculation:** Time saved × Hourly cost - License and maintenance costs",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "RPA uses software bots to automate repetitive tasks",
            "Works at UI level - doesn't require system changes",
            "Best for high volume, rule-based, standardized processes",
            "Not suitable for judgment-heavy decisions",
            "Optimize process before automating",
            "Typical 25-80% time savings with near-zero errors",
            "CMAs should identify automation opportunities",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-F-006',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Finance Transformation',
    description: 'Lead technology-enabled transformation of the finance function',
    order: 52,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Finance transformation', 'Shared services', 'Continuous close', 'FP&A evolution'],
    blueprintArea: 'CMA1-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Finance is transforming from transaction processor to strategic partner. CMAs must lead this evolution - leveraging technology to automate routine work while developing analytical and advisory capabilities. Your career depends on embracing this change!",
        },
        {
          title: 'The Evolving Finance Function',
          type: 'text',
          content: "**Traditional finance:**\n• Transaction processing\n• Backward-looking reporting\n• Period-end focus\n• Spreadsheet-intensive\n• Reactive to questions\n\n**Modern finance:**\n• Strategic business partner\n• Forward-looking insights\n• Continuous monitoring\n• Integrated systems\n• Proactive recommendations\n\n**The shift: From scorekeeper to coach!**",
        },
        {
          title: 'Finance Operating Models',
          type: 'table',
          headers: ['Model', 'Description', 'Benefits'],
          rows: [
            ['Decentralized', 'Finance in each business unit', 'Close to operations, responsive'],
            ['Centralized', 'Corporate finance only', 'Consistency, efficiency'],
            ['Shared Services', 'Transactional in centers', 'Cost savings, scale'],
            ['Global Business Services', 'End-to-end processes', 'Integration, optimization'],
            ['Outsourced', 'External providers', 'Variable cost, expertise'],
          ],
        },
        {
          title: 'Shared Services Centers',
          type: 'text',
          content: "**What moves to shared services:**\n• Accounts payable processing\n• Accounts receivable\n• General ledger maintenance\n• Travel and expense\n• Fixed assets\n• Intercompany accounting\n\n**What stays local:**\n• Business partnering\n• Decision support\n• Planning and forecasting\n• Local statutory reporting\n\n**Shared services centralizes routine; FP&A stays with the business.**",
        },
        {
          title: '🧠 Memory Aid: Finance Transformation',
          type: 'callout',
          content: "**\"RAFT\"** - Four pillars of transformation:\n\n**R**PA and automation (efficiency)\n**A**nalytics and insights (value)\n**F**lexible operating model (structure)\n**T**alent development (people)\n\n**Technology alone isn't enough - people and process must evolve too!**",
        },
        {
          title: 'Continuous Close',
          type: 'text',
          content: "**Traditional close:**\n• Frantic month-end/quarter-end\n• Batch processing\n• Days to close\n• Errors discovered late\n\n**Continuous close:**\n• Real-time accounting\n• Daily/weekly tasks distributed\n• Close in days, not weeks\n• Exceptions flagged immediately\n\n**Enablers:**\n• ERP real-time processing\n• Automated reconciliations\n• RPA for routine postings\n• Exception-based workflows",
        },
        {
          title: 'FP&A Evolution',
          type: 'text',
          content: "**From annual budget to continuous planning:**\n\n**Old model:**\n• Annual budget (months to create)\n• Quarterly forecasts\n• Spreadsheet-based\n• Finance-driven\n\n**New model:**\n• Rolling forecasts\n• Driver-based planning\n• Integrated planning tools\n• Business-driven, finance-enabled\n\n**CMAs facilitate planning, not own it exclusively!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Finance evolving from scorekeeper to strategic partner",
            "Shared services centralizes transactional work",
            "Business partnering stays close to operations",
            "Continuous close enabled by real-time systems and automation",
            "FP&A moving to rolling forecasts and driver-based planning",
            "Transformation requires technology + process + people changes",
            "CMAs must develop analytical and advisory capabilities",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-F-007',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Cybersecurity for Financial Professionals',
    description: 'Understand cybersecurity risks and controls relevant to finance',
    order: 53,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Cyber threats', 'Security controls', 'Incident response', 'Finance-specific risks'],
    blueprintArea: 'CMA1-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Finance is a prime target for cyberattacks - we control money and sensitive data. CMAs must understand cyber risks, recognize threats like business email compromise, and ensure financial controls address cyber vulnerabilities. This is now core to your role!",
        },
        {
          title: 'Common Cyber Threats',
          type: 'table',
          headers: ['Threat', 'Description', 'Finance Impact'],
          rows: [
            ['Phishing', 'Fraudulent emails seeking credentials', 'Credential theft, unauthorized access'],
            ['Business Email Compromise', 'Impersonation of executive/vendor', 'Fraudulent wire transfers'],
            ['Ransomware', 'Encrypt data, demand payment', 'Operations shutdown, data loss'],
            ['Insider threat', 'Malicious/negligent employees', 'Data theft, fraud'],
            ['Third-party breach', 'Vendor/partner compromised', 'Supply chain attack'],
          ],
        },
        {
          title: 'Business Email Compromise (BEC)',
          type: 'text',
          content: "**How it works:**\n1. Attacker researches company and executives\n2. Spoofs or compromises email account\n3. Requests urgent wire transfer\n4. Money sent to attacker's account\n\n**Red flags:**\n• Unusual urgency\n• Request to bypass normal approvals\n• New payment instructions\n• CEO traveling and \"unreachable\"\n\n**Protection:**\n• Callback verification (known number, not email)\n• Dual authorization for large transfers\n• Training and awareness",
        },
        {
          title: '🧠 Memory Aid: Cyber Defense Layers',
          type: 'callout',
          content: "**\"DDDA\"** - Defense in Depth for Finance:\n\n**D**eter - Security awareness, policies\n**D**etect - Monitoring, alerts, anomaly detection\n**D**elay - Access controls, MFA, encryption\n**A**ct - Incident response, recovery\n\n**Multiple layers because no single control is perfect!**",
        },
        {
          title: 'Financial System Controls',
          type: 'text',
          content: "**Access controls:**\n• Multi-factor authentication (MFA)\n• Least privilege access\n• Segregation of duties (enforced by system)\n• Privileged access management\n\n**Transaction controls:**\n• Dual authorization for payments\n• Velocity limits ($ per day)\n• Geographic restrictions\n• Unusual transaction alerts\n\n**Data protection:**\n• Encryption at rest and in transit\n• Data loss prevention (DLP)\n• Backup and recovery\n• Secure disposal",
        },
        {
          title: 'Incident Response',
          type: 'text',
          content: "**Finance role in cyber incidents:**\n\n**Preparation:**\n• Understand response plan\n• Know escalation paths\n• Identify critical financial systems\n\n**During incident:**\n• Preserve evidence (don't delete!)\n• Stop ongoing financial losses\n• Notify management and legal\n• Support investigation\n\n**After incident:**\n• Assess financial impact\n• Insurance claims\n• Regulatory notifications\n• Improve controls",
        },
        {
          title: 'Third-Party Risk',
          type: 'text',
          content: "**Vendors with access to financial data/systems:**\n• Cloud providers\n• Payment processors\n• Payroll providers\n• Tax/audit firms\n• IT support\n\n**Due diligence:**\n• Security questionnaires\n• SOC 2 reports\n• Contractual protections\n• Right to audit\n\n**You're only as secure as your weakest vendor!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Finance is a prime cyber target (money + data)",
            "BEC is top threat - verify payment changes via callback",
            "Defense in depth: Deter, Detect, Delay, Act",
            "MFA and dual authorization are essential financial controls",
            "CMAs must support incident response and impact assessment",
            "Third-party vendors extend your attack surface",
            "Security awareness training is critical for finance staff",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-F-008',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Emerging Technologies in Finance',
    description: 'Understand blockchain, AI, and other emerging technologies impacting finance',
    order: 54,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Blockchain', 'Artificial intelligence', 'Cloud computing', 'Emerging trends'],
    blueprintArea: 'CMA1-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Technology continues to reshape finance. CMAs need awareness of blockchain, AI, and other emerging technologies - not to become technologists, but to identify opportunities, ask the right questions, and lead adoption where it makes sense.",
        },
        {
          title: 'Blockchain Fundamentals',
          type: 'text',
          content: "**What is blockchain?**\n• Distributed ledger technology\n• Immutable record of transactions\n• Consensus-based validation\n• No central authority needed\n\n**Key characteristics:**\n• Transparency (all participants see transactions)\n• Immutability (can't change history)\n• Decentralization (no single point of control)\n• Smart contracts (automated execution)\n\n**Finance applications:** Payments, trade finance, audit evidence, supply chain tracking",
        },
        {
          title: 'Blockchain in Accounting',
          type: 'table',
          headers: ['Application', 'How It Works', 'Benefit'],
          rows: [
            ['Triple-entry accounting', 'Shared ledger of transactions', 'Real-time verification'],
            ['Audit evidence', 'Immutable transaction trail', 'Reduced audit effort'],
            ['Intercompany', 'Shared ledger across entities', 'Auto-reconciliation'],
            ['Smart contracts', 'Automated payment on conditions', 'Reduced disputes'],
          ],
        },
        {
          title: 'Artificial Intelligence in Finance',
          type: 'text',
          content: "**AI vs. RPA:**\n• RPA: Rule-based automation (does what you program)\n• AI: Pattern-based learning (improves from data)\n\n**Finance AI applications:**\n• Fraud detection (anomaly patterns)\n• Cash flow forecasting\n• Invoice processing (unstructured data)\n• Customer credit scoring\n• Contract analysis (NLP)\n• Chatbots for finance queries\n\n**AI augments CMAs, not replaces them!**",
        },
        {
          title: '🧠 Memory Aid: AI Types',
          type: 'callout',
          content: "**\"3 NLPs\"** - AI capabilities in finance:\n\n**N**atural Language Processing (read documents/emails)\n**L**earning from patterns (ML predictions)\n**P**rocess automation (intelligent RPA)\n\n**AI handles unstructured data that RPA can't!**",
        },
        {
          title: 'Cloud Computing Models',
          type: 'text',
          content: "**Service models:**\n\n**IaaS (Infrastructure):**\n• Virtual servers, storage\n• You manage: OS, apps, data\n• Example: AWS EC2, Azure VMs\n\n**PaaS (Platform):**\n• Development environment\n• You manage: Apps and data\n• Example: Google App Engine\n\n**SaaS (Software):**\n• Complete applications\n• You manage: Configuration, data\n• Example: Salesforce, Workday, QuickBooks Online\n\n**Most finance apps are SaaS today!**",
        },
        {
          title: 'Evaluating Emerging Technologies',
          type: 'text',
          content: "**CMA framework for evaluation:**\n\n**1. Problem fit:**\n• What problem does this solve?\n• Is there a real business need?\n\n**2. Maturity:**\n• Is the technology proven?\n• Are there reference customers?\n\n**3. Cost/benefit:**\n• What's the TCO?\n• What's the expected benefit?\n• What's the payback period?\n\n**4. Risk:**\n• Implementation risk\n• Vendor viability\n• Security implications\n\n**Avoid hype - focus on value!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Blockchain provides immutable, distributed ledger capabilities",
            "Triple-entry accounting could transform audit evidence",
            "AI learns from patterns; RPA follows rules",
            "AI augments human decision-making, doesn't replace CMAs",
            "Cloud models: IaaS (infrastructure), PaaS (platform), SaaS (software)",
            "Most modern finance applications are SaaS",
            "Evaluate emerging tech on problem fit, maturity, cost/benefit, risk",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA1FLessons = () => cma1FLessons;
export const getCMA1FLessonById = (id: string) => cma1FLessons.find(lesson => lesson.id === id);
export const getCMA1FLessonCount = () => cma1FLessons.length;

export default cma1FLessons;
