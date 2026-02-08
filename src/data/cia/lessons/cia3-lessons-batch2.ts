/**
 * CIA Part 3: Business Knowledge for Internal Auditing - Batch 2
 * Additional lessons for Part 3 domains
 */

import { Lesson } from '../../../types';

export const cia3LessonsBatch2: Lesson[] = [
  // ============================================================================
  // DOMAIN I: BUSINESS ACUMEN - Additional Lessons
  // ============================================================================
  {
    id: 'CIA3-I-024',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Financial Statement Analysis for Auditors',
    description: 'Master analytical techniques for examining financial statements',
    order: 24,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Ratio analysis', 'Trend analysis', 'Common-size statements', 'Benchmarking'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Why Auditors Analyze Financials',
          type: 'text',
          content: "**Financial statement analysis helps auditors:**\n\n• Understand business performance\n• Identify unusual trends or anomalies\n• Assess going concern risks\n• Evaluate management representations\n• Direct audit testing to risk areas\n\n**Key skills for all internal auditors, not just financial auditors.**",
        },
        {
          title: 'Key Financial Ratios',
          type: 'table',
          headers: ['Category', 'Ratio', 'Formula'],
          rows: [
            ['Liquidity', 'Current Ratio', 'Current Assets / Current Liabilities'],
            ['Liquidity', 'Quick Ratio', '(CA - Inventory) / Current Liabilities'],
            ['Profitability', 'Gross Margin', 'Gross Profit / Revenue'],
            ['Profitability', 'Net Margin', 'Net Income / Revenue'],
            ['Leverage', 'Debt-to-Equity', 'Total Debt / Total Equity'],
            ['Activity', 'Inventory Turnover', 'COGS / Average Inventory'],
            ['Activity', 'Receivables Turnover', 'Revenue / Average A/R'],
          ],
        },
        {
          title: 'Analytical Techniques',
          type: 'text',
          content: "**1. Trend Analysis**\nCompare metrics over multiple periods\n• Revenue growth rate\n• Expense patterns\n• Balance sheet changes\n\n**2. Common-Size Analysis**\nExpress line items as percentages\n• Income statement % of revenue\n• Balance sheet % of total assets\n\n**3. Benchmarking**\nCompare to industry peers\n• Performance comparison\n• Efficiency measures",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Financial analysis identifies risks and anomalies',
            'Key ratios: liquidity, profitability, leverage, activity',
            'Use trend, common-size, and benchmark analysis',
            'Apply professional skepticism to results',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-I-025',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Business Process Understanding',
    description: 'Learn to document and analyze business processes effectively',
    order: 25,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Process mapping', 'Flowcharting', 'Value chain', 'Process documentation'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Why Process Understanding Matters',
          type: 'text',
          content: "**Auditors need process understanding to:**\n\n• Identify control points\n• Determine what can go wrong\n• Assess process efficiency\n• Evaluate improvement opportunities\n• Plan appropriate audit procedures\n\n**Process = series of activities that transforms inputs into outputs**",
        },
        {
          title: 'Process Documentation Methods',
          type: 'text',
          content: "**1. Narrative Descriptions**\n• Written descriptions of processes\n• Good for simple processes\n• May miss details in complex processes\n\n**2. Flowcharts**\n• Visual representation of process flow\n• Shows sequence, decisions, inputs/outputs\n• Often preferred for complex processes\n\n**3. SIPOC Diagrams**\n• Suppliers, Inputs, Process, Outputs, Customers\n• High-level process overview\n\n**4. Swim Lane Diagrams**\n• Shows who performs each activity\n• Highlights handoffs and responsibilities",
        },
        {
          title: 'Value Chain Analysis',
          type: 'text',
          content: "**Porter's Value Chain includes:**\n\n**Primary Activities:**\n• Inbound logistics\n• Operations\n• Outbound logistics\n• Marketing and sales\n• Service\n\n**Support Activities:**\n• Firm infrastructure\n• Human resources\n• Technology development\n• Procurement\n\n**Use to understand where value is created and where risks exist.**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Process understanding enables effective auditing',
            'Multiple documentation methods: narratives, flowcharts, SIPOC',
            'Value chain identifies primary and support activities',
            'Documentation should identify controls and risks',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-I-026',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Corporate Governance Structures',
    description: 'Understand governance structures and their implications for internal audit',
    order: 26,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Board structure', 'Committees', 'Stakeholder governance', 'Governance models'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Governance Framework',
          type: 'text',
          content: "**Corporate governance encompasses:**\n\n• Structures and processes for directing organizations\n• Relationship between board, management, and stakeholders\n• Accountability and oversight mechanisms\n• Strategic decision-making authority\n\n**Why it matters for internal audit:**\nInternal audit provides assurance on governance effectiveness and reports to the board.",
        },
        {
          title: 'Board Structures',
          type: 'text',
          content: "**One-Tier Board (Unitary)**\n• Single board with executive and non-executive directors\n• Common in US, UK\n• CEO may also be Chair (though separation is best practice)\n\n**Two-Tier Board**\n• Supervisory board (oversight) + Management board (operations)\n• Common in Germany, Netherlands\n• Clear separation of oversight and management",
        },
        {
          title: 'Key Board Committees',
          type: 'table',
          headers: ['Committee', 'Responsibilities'],
          rows: [
            ['Audit Committee', 'Financial reporting, internal/external audit, ethics'],
            ['Compensation Committee', 'Executive pay, incentives, benefits'],
            ['Nominating Committee', 'Board composition, director selection'],
            ['Risk Committee', 'Enterprise risk oversight'],
          ],
        },
        {
          title: 'Internal Audit\'s Governance Role',
          type: 'callout',
          content: 'Internal audit should evaluate and contribute to improvement of governance processes, including ethics, accountability, performance management, and communication.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Governance involves structures for direction and oversight',
            'Board structures vary by jurisdiction',
            'Audit committee is key governance partner for IA',
            'IA provides assurance on governance effectiveness',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN II: INFORMATION SECURITY - Additional Lessons
  // ============================================================================
  {
    id: 'CIA3-II-027',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Cybersecurity Risk Management',
    description: 'Understand cybersecurity risks and controls relevant to internal auditors',
    order: 27,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Cyber threats', 'Security controls', 'Incident response', 'Security frameworks'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Cyber Threat Landscape',
          type: 'text',
          content: "**Common Cyber Threats:**\n\n• **Malware** - Viruses, ransomware, spyware\n• **Phishing** - Social engineering via email\n• **Insider Threats** - Malicious or negligent employees\n• **DDoS** - Denial of service attacks\n• **APT** - Advanced Persistent Threats (targeted attacks)\n• **Supply Chain** - Third-party compromise\n\n**Threat actors range from script kiddies to nation-states.**",
        },
        {
          title: 'Security Control Framework',
          type: 'text',
          content: "**NIST Cybersecurity Framework Functions:**\n\n1. **Identify** - Asset management, risk assessment\n2. **Protect** - Access control, training, data security\n3. **Detect** - Monitoring, anomaly detection\n4. **Respond** - Incident response, mitigation\n5. **Recover** - Recovery planning, improvements\n\n**These functions provide a structure for evaluating security programs.**",
        },
        {
          title: 'Key Security Controls',
          type: 'table',
          headers: ['Control Category', 'Examples'],
          rows: [
            ['Preventive', 'Firewalls, access controls, encryption'],
            ['Detective', 'IDS/IPS, SIEM, log monitoring'],
            ['Corrective', 'Incident response, patching, restore'],
            ['Administrative', 'Policies, training, awareness'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Cyber threats are diverse and evolving',
            'NIST CSF provides evaluation structure',
            'Controls: preventive, detective, corrective',
            'Internal auditors should assess cyber risk management',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-II-028',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Data Privacy and Protection',
    description: 'Understand data privacy regulations and controls',
    order: 28,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['GDPR', 'Privacy principles', 'Data classification', 'Privacy controls'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Data Privacy Fundamentals',
          type: 'text',
          content: "**Key Data Privacy Concepts:**\n\n• **Personal Data** - Information relating to an identified/identifiable person\n• **Sensitive Data** - Special categories (health, biometrics, etc.)\n• **Data Subject** - Individual whose data is processed\n• **Data Controller** - Determines purposes and means of processing\n• **Data Processor** - Processes data on behalf of controller",
        },
        {
          title: 'Privacy Principles (GDPR)',
          type: 'text',
          content: "**Key GDPR Principles:**\n\n1. **Lawfulness, Fairness, Transparency** - Legal basis for processing\n2. **Purpose Limitation** - Collect for specified purposes only\n3. **Data Minimization** - Only collect what's necessary\n4. **Accuracy** - Keep data accurate and current\n5. **Storage Limitation** - Retain only as long as needed\n6. **Integrity and Confidentiality** - Appropriate security\n7. **Accountability** - Demonstrate compliance",
        },
        {
          title: 'Data Subject Rights',
          type: 'table',
          headers: ['Right', 'Description'],
          rows: [
            ['Access', 'Request copy of their personal data'],
            ['Rectification', 'Correct inaccurate data'],
            ['Erasure', 'Delete data (right to be forgotten)'],
            ['Portability', 'Receive data in common format'],
            ['Object', 'Object to processing'],
            ['Restrict Processing', 'Limit how data is used'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Privacy regulations apply to personal data processing',
            'Seven key GDPR principles guide compliance',
            'Data subjects have specific rights',
            'Internal auditors should assess privacy controls',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-II-029',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Cloud Computing Risks and Controls',
    description: 'Understand cloud service models and associated audit considerations',
    order: 29,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Cloud models', 'Cloud risks', 'Cloud controls', 'Vendor management'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Cloud Service Models',
          type: 'text',
          content: "**Three Service Models:**\n\n**IaaS (Infrastructure as a Service)**\n• Provider manages: hardware, virtualization\n• Customer manages: OS, applications, data\n• Example: AWS EC2, Azure VMs\n\n**PaaS (Platform as a Service)**\n• Provider manages: infrastructure + platform\n• Customer manages: applications, data\n• Example: Google App Engine, Heroku\n\n**SaaS (Software as a Service)**\n• Provider manages: entire stack\n• Customer manages: data, user access\n• Example: Salesforce, Office 365",
        },
        {
          title: 'Cloud Deployment Models',
          type: 'table',
          headers: ['Model', 'Description', 'Control'],
          rows: [
            ['Public', 'Shared infrastructure', 'Provider controlled'],
            ['Private', 'Dedicated infrastructure', 'Customer controlled'],
            ['Hybrid', 'Mix of public and private', 'Split responsibility'],
            ['Community', 'Shared by similar orgs', 'Shared governance'],
          ],
        },
        {
          title: 'Cloud Risks and Controls',
          type: 'text',
          content: "**Key Cloud Risks:**\n• Data security and privacy\n• Vendor lock-in\n• Availability and reliability\n• Compliance with regulations\n• Shared responsibility confusion\n\n**Control Considerations:**\n• Strong cloud vendor due diligence\n• Clear contracts and SLAs\n• Data encryption in transit and at rest\n• Regular security assessments (SOC reports)\n• Exit strategy and data portability",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Cloud models: IaaS, PaaS, SaaS',
            'Responsibility varies by service model',
            'Key risks: security, compliance, vendor lock-in',
            'Review SOC reports for cloud vendor assurance',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN III: INFORMATION TECHNOLOGY - Additional Lessons
  // ============================================================================
  {
    id: 'CIA3-III-030',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Application Controls',
    description: 'Understand application-level controls and their evaluation',
    order: 30,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Input controls', 'Processing controls', 'Output controls', 'Application security'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'Application Controls Overview',
          type: 'text',
          content: "**Application controls** are specific to individual applications and ensure complete, accurate, and authorized transaction processing.\n\n**Contrast with IT General Controls:**\n• ITGCs support multiple applications\n• Application controls are system-specific\n• Both are needed for reliable processing",
        },
        {
          title: 'Input Controls',
          type: 'text',
          content: "**Purpose:** Ensure data entering the system is complete, accurate, and authorized.\n\n**Examples:**\n• Field validation (format, range, reasonableness)\n• Edit checks (required fields, data types)\n• Authorization (user permissions, approval workflows)\n• Batch controls (hash totals, record counts)\n• Duplicate detection",
        },
        {
          title: 'Processing and Output Controls',
          type: 'text',
          content: "**Processing Controls:**\n• Calculation verification\n• Reasonableness checks\n• Control totals reconciliation\n• Error handling procedures\n• Audit trails/logging\n\n**Output Controls:**\n• Report distribution controls\n• Output review and approval\n• Sensitive data masking\n• Retention and disposal\n• Access restrictions",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Application controls are specific to individual systems',
            'Three categories: input, processing, output',
            'Work with ITGCs for complete control environment',
            'Test through observation, inquiry, and re-performance',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-III-031',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Business Continuity and Disaster Recovery',
    description: 'Understand BC/DR planning and internal audit\'s role',
    order: 31,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['BCP', 'DRP', 'RTO', 'RPO', 'Testing'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'BC/DR Fundamentals',
          type: 'text',
          content: "**Business Continuity Planning (BCP):**\n• Focus on maintaining critical business operations\n• Addresses people, processes, technology\n• Broader than IT recovery\n\n**Disaster Recovery Planning (DRP):**\n• Focus on IT systems and data recovery\n• Subset of business continuity\n• Technical recovery procedures",
        },
        {
          title: 'Key Recovery Metrics',
          type: 'table',
          headers: ['Metric', 'Definition', 'Question Answered'],
          rows: [
            ['RTO', 'Recovery Time Objective', 'How quickly must we recover?'],
            ['RPO', 'Recovery Point Objective', 'How much data loss is acceptable?'],
            ['MTPD', 'Maximum Tolerable Downtime', 'How long before impact is unacceptable?'],
            ['WRT', 'Work Recovery Time', 'Time to restore work after systems up'],
          ],
        },
        {
          title: 'BC/DR Planning Process',
          type: 'text',
          content: "**1. Business Impact Analysis (BIA)**\n• Identify critical processes\n• Determine recovery requirements\n• Assess impact of disruptions\n\n**2. Risk Assessment**\n• Identify potential threats\n• Assess likelihood and impact\n\n**3. Strategy Development**\n• Define recovery strategies\n• Identify resources needed\n\n**4. Plan Development**\n• Document procedures\n• Assign responsibilities\n\n**5. Testing and Maintenance**\n• Regular testing\n• Annual plan updates",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'BCP for business operations; DRP for IT recovery',
            'Key metrics: RTO, RPO',
            'BIA identifies critical processes and requirements',
            'Regular testing validates plan effectiveness',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-III-032',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Change Management Controls',
    description: 'Understand change management processes and related controls',
    order: 32,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Change management', 'Change controls', 'Testing', 'Approval process'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'Why Change Management Matters',
          type: 'text',
          content: "**Change management controls ensure:**\n\n• Changes are authorized\n• Changes are tested before implementation\n• Changes are documented\n• Production environment is protected\n• Users are prepared for changes\n\n**Poor change management leads to:**\n• System outages\n• Data corruption\n• Security vulnerabilities\n• Processing errors",
        },
        {
          title: 'Change Management Process',
          type: 'text',
          content: "**Standard Change Management Lifecycle:**\n\n1. **Request** - Change requested and documented\n2. **Assess** - Evaluate impact and risk\n3. **Approve** - Authorization by appropriate level\n4. **Develop** - Build and test in non-production\n5. **Test** - User acceptance testing\n6. **Implement** - Deploy to production\n7. **Review** - Post-implementation review",
        },
        {
          title: 'Key Change Management Controls',
          type: 'table',
          headers: ['Control', 'Purpose'],
          rows: [
            ['Request documentation', 'Record of what was requested and why'],
            ['Impact assessment', 'Understand risk before approving'],
            ['Segregation of duties', 'Developers cannot migrate to production'],
            ['Testing requirements', 'Verify changes work correctly'],
            ['Approval process', 'Appropriate authorization'],
            ['Rollback procedures', 'Recovery if change fails'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Change management protects production environment',
            'Process: request, assess, approve, develop, test, implement',
            'Segregation between development and production',
            'Emergency changes still require documentation',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN IV: FINANCIAL MANAGEMENT - Additional Lessons
  // ============================================================================
  {
    id: 'CIA3-IV-033',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Capital Budgeting and Investment Analysis',
    description: 'Understand capital budgeting techniques and decision-making',
    order: 33,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['NPV', 'IRR', 'Payback period', 'Capital budgeting'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Capital Budgeting Process',
          type: 'text',
          content: "**Capital budgeting** is the process of evaluating and selecting long-term investments.\n\n**Process Steps:**\n1. Identify investment opportunities\n2. Estimate cash flows\n3. Evaluate alternatives\n4. Select projects\n5. Implement and monitor\n\n**Auditors should understand whether capital decisions follow sound analysis.**",
        },
        {
          title: 'Evaluation Techniques',
          type: 'table',
          headers: ['Technique', 'Description', 'Decision Rule'],
          rows: [
            ['NPV', 'Present value of cash flows minus investment', 'Accept if NPV > 0'],
            ['IRR', 'Rate where NPV = 0', 'Accept if IRR > hurdle rate'],
            ['Payback', 'Time to recover initial investment', 'Accept if within target period'],
            ['Profitability Index', 'PV of cash flows / Initial investment', 'Accept if > 1.0'],
          ],
        },
        {
          title: 'NPV vs. IRR',
          type: 'text',
          content: "**NPV Advantages:**\n• Dollar amount of value created\n• Works with mutually exclusive projects\n• Assumes reinvestment at cost of capital\n\n**IRR Advantages:**\n• Easy to understand (%)\n• Doesn't require hurdle rate up front\n\n**NPV is generally preferred for conflicting projects.**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Capital budgeting evaluates long-term investments',
            'NPV measures dollar value added',
            'IRR is the rate of return on investment',
            'NPV preferred for mutually exclusive projects',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-IV-034',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Working Capital Management',
    description: 'Understand working capital components and management strategies',
    order: 34,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Working capital', 'Cash management', 'Receivables', 'Payables', 'Inventory'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Working Capital Basics',
          type: 'text',
          content: "**Working Capital = Current Assets - Current Liabilities**\n\n**Components:**\n• Cash and cash equivalents\n• Accounts receivable\n• Inventory\n• Accounts payable\n• Short-term debt\n\n**Goal:** Maintain sufficient liquidity while minimizing excess investment in current assets.",
        },
        {
          title: 'Cash Conversion Cycle',
          type: 'text',
          content: "**Cash Conversion Cycle (CCC):**\n\nCCC = Days Inventory + Days Receivables - Days Payables\n\n**Example:**\n• Inventory turnover: 60 days\n• Receivables turnover: 45 days\n• Payables period: 30 days\n• CCC = 60 + 45 - 30 = 75 days\n\n**Lower CCC is generally better - less cash tied up in operations.**",
        },
        {
          title: 'Management Strategies',
          type: 'table',
          headers: ['Component', 'Strategy'],
          rows: [
            ['Cash', 'Maintain minimum needed; invest excess'],
            ['Receivables', 'Efficient collection; credit policy balance'],
            ['Inventory', 'Just-in-time; economic order quantity'],
            ['Payables', 'Pay on terms; capture discounts when beneficial'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Working capital = current assets - current liabilities',
            'Cash conversion cycle measures cash tied up in operations',
            'Balance liquidity against profitability',
            'Each component has specific management strategies',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-IV-035',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Organizational Structures and Authority',
    description: 'Understand organizational design and control implications',
    order: 35,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Organizational structure', 'Authority', 'Delegation', 'Span of control'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Common Organizational Structures',
          type: 'text',
          content: "**Functional Structure**\n• Organized by function (marketing, finance, etc.)\n• Clear specialization\n• May create silos\n\n**Divisional Structure**\n• Organized by product, geography, or customer\n• Greater autonomy\n• May duplicate functions\n\n**Matrix Structure**\n• Combines functional and divisional\n• Dual reporting\n• Complex but flexible",
        },
        {
          title: 'Authority Concepts',
          type: 'text',
          content: "**Line Authority**\n• Direct supervisory relationship\n• Manager directs subordinate's work\n\n**Staff Authority**\n• Advisory role\n• Supports line functions\n• Example: HR, Legal, Internal Audit\n\n**Span of Control**\n• Number of direct reports\n• Wide span = fewer management layers\n• Narrow span = more oversight capability",
        },
        {
          title: 'Control Implications',
          type: 'callout',
          content: 'Organizational structure affects internal controls. Decentralized structures may have inconsistent controls. Matrix structures may have unclear accountability. Auditors should understand structure when planning engagements.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Structure types: functional, divisional, matrix',
            'Authority types: line, staff',
            'Span of control affects oversight capability',
            'Structure impacts control design and effectiveness',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-IV-036',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Contract and Procurement Auditing',
    description: 'Understand procurement processes and contract audit considerations',
    order: 36,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Procurement process', 'Contract risks', 'Vendor management', 'Compliance'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Procurement Process',
          type: 'text',
          content: "**Standard Procurement Lifecycle:**\n\n1. **Need Identification** - Requisition process\n2. **Sourcing** - Identify potential suppliers\n3. **Solicitation** - RFP/RFQ process\n4. **Selection** - Evaluate and select vendor\n5. **Contract Negotiation** - Terms and conditions\n6. **Contract Management** - Performance monitoring\n7. **Closeout** - Contract completion",
        },
        {
          title: 'Procurement Risks',
          type: 'table',
          headers: ['Risk Category', 'Examples'],
          rows: [
            ['Fraud/Collusion', 'Bid rigging, kickbacks, ghost vendors'],
            ['Compliance', 'Policy violations, regulatory issues'],
            ['Quality', 'Substandard goods or services'],
            ['Financial', 'Cost overruns, unfavorable terms'],
            ['Vendor', 'Non-performance, bankruptcy'],
          ],
        },
        {
          title: 'Contract Audit Considerations',
          type: 'text',
          content: "**Key areas to audit:**\n\n• Competitive bidding compliance\n• Conflicts of interest\n• Contract terms and conditions\n• Performance against contract\n• Invoice accuracy\n• Change order controls\n• Contract modifications\n• Vendor insurance and bonding",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Procurement follows structured lifecycle',
            'Key risks: fraud, compliance, quality, vendor',
            'Competitive bidding reduces fraud risk',
            'Contract monitoring ensures performance',
          ],
        },
      ],
    },
  },
];

export default cia3LessonsBatch2;
