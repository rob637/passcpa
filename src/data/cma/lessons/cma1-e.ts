/**
 * CMA Part 1, Section E: Internal Controls
 * Weight: 15% of Part 1 Exam
 * 
 * Topics covered:
 * - Governance, risk, and compliance
 * - Internal control structure and management philosophy
 * - Internal control policies for safeguarding and assurance
 * - Internal audit
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma1ELessons: Lesson[] = [
  // ============================================================================
  // CMA1-E: INTERNAL CONTROLS (Lessons 1-8)
  // ============================================================================
  
  {
    id: 'CMA1-E-001',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Corporate Governance Fundamentals',
    description: 'Understand the role of governance in organizational oversight and control',
    order: 46,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Corporate governance', 'Board of directors', 'Stakeholder theory', 'Agency problems'],
    blueprintArea: 'CMA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Good governance protects stakeholders and ensures ethical decisions. CMAs serve in governance roles (audit committees, CFO) and provide information for board decisions. Understanding governance is essential for career advancement and ethical practice.",
        },
        {
          title: 'Corporate Governance Defined',
          type: 'text',
          content: "**Definition:**\nThe system of rules, practices, and processes by which a company is directed and controlled.\n\n**Purpose:**\n• Balance interests of stakeholders\n• Provide structure for setting objectives\n• Determine means of achieving objectives\n• Monitor performance\n\n**Key question:** Who monitors management? Who monitors the monitors?",
        },
        {
          title: 'Stakeholder Groups',
          type: 'table',
          headers: ['Stakeholder', 'Primary Interest', 'Governance Concern'],
          rows: [
            ['Shareholders', 'Return on investment', 'Maximize value, oversight'],
            ['Board of Directors', 'Fiduciary duty', 'Strategic direction, monitoring'],
            ['Management', 'Compensation, career', 'Running the company'],
            ['Employees', 'Job security, fair pay', 'Ethical treatment'],
            ['Creditors', 'Repayment', 'Risk management'],
            ['Customers', 'Quality, fair dealing', 'Product safety, ethics'],
            ['Society', 'Responsibility', 'Environmental, social impact'],
          ],
        },
        {
          title: 'Agency Theory',
          type: 'text',
          content: "**The Agency Problem:**\nManagers (agents) may act in their own interest rather than shareholders' (principals).\n\n**Conflict examples:**\n• Empire building (growth over profitability)\n• Excessive perks\n• Short-term focus for bonuses\n• Risk aversion (protect job vs. take value-creating risks)\n\n**Solutions:**\n• Board oversight\n• Executive compensation tied to performance\n• Independent audit\n• Market for corporate control (takeovers)",
        },
        {
          title: '🧠 Memory Aid: Governance Triangle',
          type: 'callout',
          content: "**\"SBM\"** - The three key governance players:\n\n**S**hareholders - Own the company, elect board\n**B**oard - Oversee management, set strategy\n**M**anagement - Run daily operations\n\n**Information flows UP; Authority delegated DOWN**\n\nCMAs provide the financial information that makes this work!",
        },
        {
          title: 'Board of Directors',
          type: 'text',
          content: "**Composition best practices:**\n• Majority independent directors\n• Separate CEO and Chairman (or lead independent director)\n• Diverse skills and backgrounds\n• Term limits and rotation\n\n**Key responsibilities:**\n• Hire/fire/compensate CEO\n• Approve major decisions\n• Oversee risk management\n• Ensure adequate controls\n• Set ethical tone\n\n**Committees:** Audit, Compensation, Nominating/Governance",
        },
        {
          title: 'Audit Committee',
          type: 'text',
          content: "**SOX requirements for public companies:**\n• All members must be independent\n• At least one financial expert\n• Oversee external auditors\n• Review internal audit function\n• Handle whistleblower complaints\n\n**Key duties:**\n• Approve audit plan and fees\n• Review financial statements\n• Discuss significant estimates\n• Monitor internal controls\n• Meet privately with auditors",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Governance balances stakeholder interests through oversight",
            "Agency problem: managers may act in self-interest",
            "Board of Directors provides oversight of management",
            "Independent directors reduce conflicts of interest",
            "Audit Committee oversees financial reporting and controls",
            "CMAs provide information that enables governance",
            "Ethical tone set at top cascades through organization",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-E-002',
    courseId: 'cma',
    section: 'CMA1',
    title: 'COSO Internal Control Framework',
    description: 'Apply the COSO framework to design and evaluate internal controls',
    order: 47,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['COSO framework', 'Control components', 'Control objectives', 'Principles'],
    blueprintArea: 'CMA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "COSO is THE internal control framework! It's referenced by regulators, auditors, and management worldwide. CMAs must know the five components, seventeen principles, and how to evaluate control effectiveness. This is guaranteed to be tested!",
        },
        {
          title: 'COSO Definition of Internal Control',
          type: 'text',
          content: "**Internal Control is:**\nA process, effected by an entity's board of directors, management, and other personnel, designed to provide reasonable assurance regarding the achievement of objectives relating to:\n\n1. **Operations** - Effectiveness and efficiency\n2. **Reporting** - Reliability (financial and non-financial)\n3. **Compliance** - Adherence to laws and regulations\n\n**Note: Reasonable assurance, NOT absolute assurance!**",
        },
        {
          title: 'The Five Components',
          type: 'table',
          headers: ['Component', 'Description', 'Questions to Ask'],
          rows: [
            ['Control Environment', 'Foundation - tone at the top', 'Is integrity valued? Clear accountability?'],
            ['Risk Assessment', 'Identify and analyze risks', 'What could go wrong? How likely?'],
            ['Control Activities', 'Policies and procedures', 'What actions prevent/detect risks?'],
            ['Information & Communication', 'Capture and share info', 'Does information flow where needed?'],
            ['Monitoring', 'Ongoing and periodic review', 'Are controls working? Evaluated?'],
          ],
        },
        {
          title: '🧠 Memory Aid: COSO Components',
          type: 'callout',
          content: "**\"CRIME\"** - The five components:\n\n**C**ontrol Environment (foundation)\n**R**isk Assessment\n**I**nformation & Communication\n**M**onitoring\n**E**valuations (Control Activities)\n\n**Or think of a house:**\n• Foundation = Control Environment\n• Walls = Risk Assessment, Control Activities, I&C\n• Roof = Monitoring",
        },
        {
          title: 'Control Environment',
          type: 'text',
          content: "**The foundation - sets the tone:**\n\n**Key elements:**\n• Board independence and oversight\n• Management philosophy and operating style\n• Organizational structure\n• Assignment of authority and responsibility\n• Human resource policies\n• Commitment to competence\n• Integrity and ethical values\n\n**\"Tone at the top\" is critical:**\nIf management ignores controls, employees will too!",
        },
        {
          title: 'Control Activities',
          type: 'text',
          content: "**Types of control activities:**\n\n**Preventive Controls:**\n• Segregation of duties\n• Authorization requirements\n• Physical controls (locks, access cards)\n• Input validation\n\n**Detective Controls:**\n• Reconciliations\n• Reviews and comparisons\n• Surprise audits\n• Exception reporting\n\n**Both are needed! Preventive stops errors; Detective catches what slipped through.**",
        },
        {
          title: 'The 17 Principles',
          type: 'text',
          content: "**Control Environment (5 principles):**\n1. Commitment to integrity and ethics\n2. Board independence and oversight\n3. Appropriate structures and reporting lines\n4. Commitment to attract/develop competent personnel\n5. Accountability for internal control responsibilities\n\n**Risk Assessment (4 principles):**\n6. Specify clear objectives\n7. Identify and analyze risks\n8. Assess fraud risk\n9. Identify and assess changes\n\n**Control Activities (3), I&C (3), Monitoring (2)** - totaling 17",
        },
        {
          title: '⚠️ Exam Trap: Effective vs. Present',
          type: 'warning',
          content: "**Controls can be PRESENT but NOT EFFECTIVE!**\n\n**For internal control to be effective:**\n• All five components must be present AND functioning\n• All 17 principles must be present AND functioning\n• Components must operate together in an integrated manner\n\n**Common deficiencies:**\n• Policies exist but not followed\n• Monitoring is sporadic\n• Information doesn't reach decision-makers",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COSO provides reasonable assurance, not absolute",
            "Three objectives: Operations, Reporting, Compliance",
            "Five components: Control Environment, Risk Assessment, Control Activities, I&C, Monitoring",
            "Control Environment (tone at top) is the foundation",
            "17 principles must be present and functioning",
            "Preventive controls stop errors; Detective controls catch them",
            "All components must work together for effectiveness",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-E-003',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Risk Management',
    description: 'Apply COSO ERM and other frameworks to identify and manage organizational risks',
    order: 48,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['COSO ERM', 'Risk identification', 'Risk assessment', 'Risk response'],
    blueprintArea: 'CMA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Every organization faces risks that threaten objectives. CMAs identify, assess, and help manage financial and operational risks. Understanding ERM is critical for strategic planning and protecting organizational value.",
        },
        {
          title: 'Enterprise Risk Management (ERM)',
          type: 'text',
          content: "**COSO ERM Definition:**\nA process, effected by an entity's board, management, and other personnel, applied in strategy setting and across the enterprise, designed to identify potential events that may affect the entity, and manage risk to be within its risk appetite, to provide reasonable assurance regarding achievement of objectives.\n\n**Key difference from internal control:**\nERM is broader - includes strategy and opportunity, not just control.",
        },
        {
          title: 'Types of Risk',
          type: 'table',
          headers: ['Risk Type', 'Description', 'Examples'],
          rows: [
            ['Strategic', 'Threats to business model', 'Competition, technology disruption'],
            ['Operational', 'Process and people failures', 'Equipment failure, fraud, errors'],
            ['Financial', 'Adverse financial events', 'Credit risk, liquidity, market risk'],
            ['Compliance', 'Regulatory violations', 'Legal penalties, sanctions'],
            ['Reputational', 'Damage to reputation', 'Social media crisis, ethical lapses'],
          ],
        },
        {
          title: 'Risk Assessment Process',
          type: 'text',
          content: "**Step 1: Identify Risks**\n• Brainstorming, workshops\n• Historical analysis\n• Industry research\n• Process mapping\n\n**Step 2: Assess Risks**\n• Likelihood (probability of occurrence)\n• Impact (severity if it occurs)\n• Risk = Likelihood × Impact\n\n**Step 3: Prioritize**\n• Heat maps (high/medium/low)\n• Focus resources on significant risks",
        },
        {
          title: '🧠 Memory Aid: Risk Response',
          type: 'callout',
          content: "**\"AART\"** - Four risk response options:\n\n**A**void - Eliminate the activity that creates risk\n**A**ccept - Tolerate the risk (do nothing)\n**R**educe - Implement controls to lower likelihood/impact\n**T**ransfer - Shift risk to another party (insurance, contracts)\n\n**Choose based on risk appetite and cost/benefit!**",
        },
        {
          title: 'Risk Appetite and Tolerance',
          type: 'text',
          content: "**Risk Appetite:**\nThe amount and type of risk an organization is willing to pursue or accept.\n• Set by board of directors\n• Tied to strategy and culture\n• Expressed generally (e.g., \"conservative\")\n\n**Risk Tolerance:**\nThe acceptable variation in outcomes relative to achievement of objectives.\n• More specific than appetite\n• May be quantified (e.g., \"earnings variance ± 5%\")\n• Applied to specific risks\n\n**Appetite = How much risk to take; Tolerance = How much variance is OK**",
        },
        {
          title: 'Key Risk Indicators (KRIs)',
          type: 'text',
          content: "**KRIs are metrics that provide early warning:**\n\n**Characteristics of good KRIs:**\n• Leading (not lagging)\n• Measurable and timely\n• Linked to specific risks\n• Thresholds defined\n\n**Examples:**\n• Employee turnover rate (operational risk)\n• Days sales outstanding (credit risk)\n• System downtime (technology risk)\n• Customer complaints (reputation risk)\n\n**KRIs trigger investigation before problems materialize.**",
        },
        {
          title: '⚠️ Exam Trap: Inherent vs. Residual Risk',
          type: 'warning',
          content: "**Inherent Risk:**\nRisk level before considering controls\n\"If we did nothing, how much risk?\"\n\n**Residual Risk:**\nRisk remaining after controls are applied\nResidual = Inherent - Control Effectiveness\n\n**Residual risk should be within risk tolerance!**\n\nIf residual risk > tolerance → Need more controls or accept the variance",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ERM is broader than internal control - includes strategy",
            "Risk types: Strategic, Operational, Financial, Compliance, Reputational",
            "Risk = Likelihood × Impact",
            "Four responses: Avoid, Accept, Reduce, Transfer (AART)",
            "Risk Appetite (board level) vs. Tolerance (specific variance)",
            "KRIs provide early warning of risk events",
            "Residual risk = Inherent risk - Control effectiveness",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-E-004',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Control Activities and Safeguarding',
    description: 'Implement specific control activities to protect assets and ensure accurate reporting',
    order: 49,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Segregation of duties', 'Physical controls', 'IT controls', 'Reconciliations'],
    blueprintArea: 'CMA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Control activities are the specific policies and procedures that mitigate risks. CMAs design, implement, and monitor these controls. Weaknesses in control activities lead to fraud, errors, and misstatements - your job is to prevent that!",
        },
        {
          title: 'Segregation of Duties',
          type: 'text',
          content: "**The most fundamental control!**\n\n**Separate these functions:**\n• **Authorization** - Approve transactions\n• **Custody** - Handle assets\n• **Recording** - Account for transactions\n\n**Why?** If one person controls all three, they can:\n• Steal assets\n• Authorize fictitious transactions\n• Cover it up in the records\n\n**SOD ensures collusion is required to defraud.**",
        },
        {
          title: '🧠 Memory Aid: SOD - ACR',
          type: 'callout',
          content: "**\"ACR\"** - Three functions to separate:\n\n**A**uthorization (approve)\n**C**ustody (handle assets)\n**R**ecording (bookkeeping)\n\n**Examples:**\n• Purchasing: Different people approve orders vs. receive goods vs. record payables\n• Payroll: Different people add employees vs. approve timesheets vs. distribute checks",
        },
        {
          title: 'Physical Controls',
          type: 'table',
          headers: ['Control Type', 'Purpose', 'Examples'],
          rows: [
            ['Locks and keys', 'Restrict physical access', 'Vaults, cabinets, warehouses'],
            ['Access cards/badges', 'Control entry', 'Building access, restricted areas'],
            ['Safes and vaults', 'Protect high-value items', 'Cash, negotiable instruments'],
            ['Cameras (CCTV)', 'Deter and detect', 'Warehouses, cash handling areas'],
            ['Inventory counts', 'Verify existence', 'Periodic and cycle counts'],
          ],
        },
        {
          title: 'IT General Controls',
          type: 'text',
          content: "**Categories of IT general controls:**\n\n**Access controls:**\n• User authentication (passwords, MFA)\n• Authorization (role-based access)\n• Privileged access management\n\n**Change management:**\n• Approval of system changes\n• Testing before implementation\n• Documentation\n\n**Operations:**\n• Backup and recovery\n• Job scheduling\n• Incident management\n\n**IT controls affect ALL applications - they're pervasive!**",
        },
        {
          title: 'Application Controls',
          type: 'text',
          content: "**Controls within specific applications:**\n\n**Input controls:**\n• Validation edits (format, range, reasonableness)\n• Control totals\n• Completeness checks\n\n**Processing controls:**\n• Proper calculation\n• Update accuracy\n• Cutoff controls\n\n**Output controls:**\n• Review of reports\n• Distribution controls\n• Reconciliation to source\n\n**Motto: \"Garbage in, garbage out\" - so control the input!**",
        },
        {
          title: 'Reconciliations',
          type: 'text',
          content: "**Key detective control:**\n\n**Bank reconciliation:**\n• Compare book balance to bank statement\n• Identify timing differences\n• Detect errors and fraud\n\n**Subledger to general ledger:**\n• AR/AP aging to GL balance\n• Fixed asset detail to GL\n• Inventory count to perpetual records\n\n**Third-party confirmations:**\n• Customer balance confirmations\n• Vendor statement reconciliation\n\n**Reconciliations should be performed by someone INDEPENDENT of recording!**",
        },
        {
          title: '⚠️ Exam Trap: Compensating Controls',
          type: 'warning',
          content: "**When ideal control isn't possible, use compensating controls!**\n\n**Example:** Small company can't fully segregate duties\n\n**Compensating controls:**\n• Owner reviews all bank statements\n• Surprise cash counts\n• Mandatory vacations (forces someone else to do job)\n• Review of exception reports\n\n**Compensating controls aren't as strong but are better than nothing!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Segregation of duties: separate Authorization, Custody, Recording",
            "Physical controls protect tangible assets",
            "IT General Controls affect all applications (access, change, operations)",
            "Application Controls: Input, Processing, Output",
            "Reconciliations are key detective controls",
            "Independence is critical for review controls",
            "Compensating controls when ideal control isn't feasible",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-E-005',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Fraud Prevention and Detection',
    description: 'Understand the fraud triangle and implement anti-fraud controls',
    order: 50,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Fraud triangle', 'Occupational fraud', 'Red flags', 'Whistleblower programs'],
    blueprintArea: 'CMA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Fraud costs organizations billions annually. CMAs are often the first line of defense and detection. Understanding why people commit fraud and how to prevent it is essential for protecting your organization and your career.",
        },
        {
          title: 'The Fraud Triangle',
          type: 'text',
          content: "**Three conditions for fraud:**\n\n**1. Pressure (Motivation)**\n• Financial difficulties\n• Unrealistic performance targets\n• Addiction (gambling, substances)\n\n**2. Opportunity**\n• Weak internal controls\n• Lack of oversight\n• Access to assets\n\n**3. Rationalization**\n• \"I'm just borrowing it\"\n• \"They owe me\"\n• \"Everyone does it\"\n\n**All three must be present; Remove one and fraud risk drops!**",
        },
        {
          title: '🧠 Memory Aid: Fraud Triangle',
          type: 'callout',
          content: "**\"POR\"** - The three sides:\n\n**P**ressure - \"I need to\"\n**O**pportunity - \"I can\"\n**R**ationalization - \"It's okay\"\n\n**Controls primarily address OPPORTUNITY!**\n\nWe can't always reduce pressure or change rationalization, but we CAN remove opportunity through controls.",
        },
        {
          title: 'Types of Occupational Fraud',
          type: 'table',
          headers: ['Type', 'Description', 'Examples'],
          rows: [
            ['Asset misappropriation', 'Theft of assets', 'Cash skimming, inventory theft, expense fraud'],
            ['Corruption', 'Abuse of position', 'Bribery, kickbacks, conflicts of interest'],
            ['Financial statement fraud', 'Intentional misstatement', 'Revenue inflation, expense manipulation'],
          ],
        },
        {
          title: 'Fraud Red Flags',
          type: 'text',
          content: "**Behavioral indicators:**\n• Living beyond means\n• Financial difficulties\n• Unusually close vendor relationships\n• Control freak (won't share duties)\n• Never takes vacation\n• Excessive overtime\n• Defensive when questioned\n\n**Transaction indicators:**\n• Missing documents\n• Unusual journal entries\n• Transactions at odd times\n• Round dollar amounts\n• Vendor anomalies (P.O. Box, no phone)\n\n**Red flags don't prove fraud but warrant investigation!**",
        },
        {
          title: 'Fraud Prevention Controls',
          type: 'text',
          content: "**Key prevention measures:**\n\n**Hiring practices:**\n• Background checks\n• Reference verification\n• Credit checks (where legal/appropriate)\n\n**Operational controls:**\n• Strong segregation of duties\n• Independent approvals\n• Surprise audits\n• Mandatory vacations\n• Job rotation\n\n**Cultural elements:**\n• Strong tone at the top\n• Ethics training\n• Clear policies and consequences",
        },
        {
          title: 'Whistleblower Programs',
          type: 'text',
          content: "**Most effective fraud detection method!**\n\n**ACFE study findings:**\n• Tips detect 45% of fraud cases\n• Internal audit detects only 13%\n• Management review detects 10%\n\n**Effective hotline characteristics:**\n• Anonymous reporting option\n• 24/7 availability\n• Multiple channels (phone, web, email)\n• Non-retaliation policy\n• Prompt investigation commitment\n\n**SOX requires audit committee oversight of whistleblower complaints!**",
        },
        {
          title: '⚠️ Exam Trap: Management Override',
          type: 'warning',
          content: "**No control system can prevent MANAGEMENT OVERRIDE!**\n\n**Top executives can:**\n• Direct employees to record false entries\n• Instruct subordinates to bypass controls\n• Collude with external parties\n\n**Defenses:**\n• Board/Audit Committee vigilance\n• Independent external audit\n• Strong ethical culture\n• Whistleblower protections\n\n**Management override is the reason we need GOVERNANCE, not just controls!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Fraud Triangle: Pressure, Opportunity, Rationalization",
            "Controls primarily reduce Opportunity",
            "Three fraud types: Asset misappropriation, Corruption, Financial statement",
            "Red flags warrant investigation, not accusation",
            "Tips (whistleblowers) detect most fraud",
            "Mandatory vacations and job rotation are key controls",
            "Management override is a limitation of any control system",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-E-006',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Internal Audit Function',
    description: 'Understand the role, standards, and activities of internal audit',
    order: 51,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IIA standards', 'Internal audit charter', 'Audit planning', 'Reporting'],
    blueprintArea: 'CMA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Internal audit is a key governance function. CMAs work closely with internal auditors and may transition into internal audit roles. Understanding how internal audit operates helps you support their work and use their findings effectively.",
        },
        {
          title: 'Internal Audit Definition',
          type: 'text',
          content: "**IIA Definition:**\n\"Internal auditing is an independent, objective assurance and consulting activity designed to add value and improve an organization's operations. It helps an organization accomplish its objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control, and governance processes.\"\n\n**Key elements:**\n• Independent and objective\n• Assurance AND consulting\n• Adds value\n• Systematic approach",
        },
        {
          title: 'Internal vs. External Audit',
          type: 'table',
          headers: ['Attribute', 'Internal Audit', 'External Audit'],
          rows: [
            ['Reports to', 'Audit committee/management', 'Shareholders'],
            ['Primary focus', 'Operations, controls, risk', 'Financial statements'],
            ['Scope', 'All areas of organization', 'Financial reporting primary'],
            ['Employment', 'Company employees', 'External firm'],
            ['Standards', 'IIA Standards', 'PCAOB/AICPA Standards'],
            ['Opinion', 'Recommendations', 'Audit opinion on F/S'],
          ],
        },
        {
          title: 'Internal Audit Charter',
          type: 'text',
          content: "**Formal document establishing internal audit:**\n\n**Should include:**\n• Purpose, authority, and responsibility\n• Position within organization\n• Access to records and personnel\n• Scope of activities\n• Relationship to audit committee\n\n**Authority to:**\n• Access all records and assets\n• Interview any employee\n• Operate independently of management\n\n**Approved by board/audit committee - shows organizational support!**",
        },
        {
          title: '🧠 Memory Aid: Internal Audit Value',
          type: 'callout',
          content: "**\"GRACE\"** - What internal audit evaluates:\n\n**G**overnance\n**R**isk management\n**A**ssurance\n**C**ontrol\n**E**fficiency of operations\n\n**Internal audit is the organization's \"eyes and ears\" for the board!**",
        },
        {
          title: 'Risk-Based Audit Planning',
          type: 'text',
          content: "**Modern internal audit is risk-based:**\n\n**Annual audit plan:**\n• Assess risks across organization\n• Prioritize audit areas by risk\n• Allocate resources to highest risks\n• Flexibility for emerging issues\n\n**Risk factors:**\n• Financial materiality\n• Control environment quality\n• Changes in operations/systems\n• Time since last audit\n• Historical problems\n\n**Approved by Audit Committee annually!**",
        },
        {
          title: 'Internal Audit Independence',
          type: 'text',
          content: "**Organizational independence:**\n• Report functionally to Audit Committee\n• Report administratively to CEO/CFO\n• CAE has direct access to Audit Committee\n• CAE appointment/removal by Audit Committee\n\n**Individual objectivity:**\n• No operational responsibilities\n• Cannot audit own work\n• Disclose threats to objectivity\n• Rotate audit assignments\n\n**Independence is the foundation of internal audit credibility!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Internal audit provides assurance AND consulting",
            "Reports functionally to Audit Committee for independence",
            "Charter documents authority and scope",
            "Modern internal audit is risk-based",
            "Evaluates governance, risk, and control",
            "Different from external audit (broader, operational focus)",
            "CAE has direct access to Audit Committee",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-E-007',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Compliance and Regulatory Environment',
    description: 'Navigate the regulatory environment and implement compliance programs',
    order: 52,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['SOX', 'FCPA', 'GDPR', 'Compliance programs'],
    blueprintArea: 'CMA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Organizations face ever-increasing regulatory requirements. CMAs must understand key regulations (SOX, FCPA, GDPR) and help design compliance programs. Non-compliance can result in fines, reputational damage, and personal liability for executives.",
        },
        {
          title: 'Sarbanes-Oxley Act (SOX) Overview',
          type: 'text',
          content: "**Enacted 2002 after Enron, WorldCom scandals**\n\n**Key provisions:**\n• **Section 302:** CEO/CFO certification of financial reports\n• **Section 404:** Management assessment of internal controls\n• **Section 409:** Real-time disclosure of material changes\n• **Section 802:** Criminal penalties for document destruction\n\n**Applies to:** Public companies registered with SEC\n\n**Created PCAOB to oversee public company audits**",
        },
        {
          title: 'SOX Section 404',
          type: 'text',
          content: "**Internal Control over Financial Reporting (ICFR):**\n\n**Management responsibilities:**\n• Assess effectiveness of ICFR annually\n• Use a recognized framework (usually COSO)\n• Report on effectiveness in annual report\n• Disclose material weaknesses\n\n**Auditor responsibilities (large companies):**\n• Attest to management's assessment\n• Issue opinion on ICFR effectiveness\n\n**Material weakness = Reasonable possibility of material misstatement\"",
        },
        {
          title: 'Foreign Corrupt Practices Act (FCPA)',
          type: 'table',
          headers: ['Provision', 'Requirement'],
          rows: [
            ['Anti-bribery', 'Prohibits bribing foreign officials to obtain/retain business'],
            ['Accounting (Books & Records)', 'Maintain accurate books and records'],
            ['Internal Controls', 'Maintain adequate internal controls'],
            ['Jurisdiction', 'US companies, US persons, acts on US soil'],
            ['Penalties', 'Criminal fines, imprisonment, civil penalties'],
          ],
        },
        {
          title: '🧠 Memory Aid: FCPA',
          type: 'callout',
          content: "**\"ABC\"** - FCPA has two main provisions:\n\n**A**nti-bribery (don't pay bribes to foreign officials)\n**B**ooks and records + Internal **C**ontrols (keep accurate records)\n\n**Note:** Facilitation payments (small payments to speed up routine actions) are technically allowed but risky and discouraged!",
        },
        {
          title: 'Data Privacy (GDPR and Beyond)',
          type: 'text',
          content: "**GDPR (EU data protection):**\n• Applies if you have EU customers/data\n• Requires consent for data collection\n• Right to access, correct, delete personal data\n• 72-hour breach notification\n• Fines up to 4% of global revenue\n\n**Other privacy laws:**\n• CCPA (California)\n• HIPAA (healthcare)\n• GLBA (financial services)\n\n**CMAs must consider data privacy in control design!**",
        },
        {
          title: 'Effective Compliance Programs',
          type: 'text',
          content: "**DOJ/SEC guidance elements:**\n\n1. Written policies and procedures\n2. Oversight by senior management and board\n3. Training and communication\n4. Reporting mechanisms (hotlines)\n5. Risk assessment process\n6. Monitoring and auditing\n7. Consistent enforcement and discipline\n8. Response and remediation procedures\n\n**Good compliance programs can reduce penalties!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SOX: CEO/CFO certification, Section 404 ICFR assessment",
            "Material weakness must be disclosed in annual report",
            "FCPA: Anti-bribery + Books/Records/Controls",
            "GDPR requires consent and data subject rights",
            "72-hour breach notification for GDPR violations",
            "Compliance programs have standard elements (DOJ guidance)",
            "Strong compliance reduces regulatory penalties",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA1-E-008',
    courseId: 'cma',
    section: 'CMA1',
    title: 'Ethics and Professional Standards',
    description: 'Apply IMA ethical standards and navigate ethical dilemmas',
    order: 53,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IMA ethics', 'Ethical principles', 'Conflict resolution', 'Professional conduct'],
    blueprintArea: 'CMA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "CMAs are bound by IMA's Statement of Ethical Professional Practice. Ethical failures can end careers and harm organizations. Understanding ethical principles and how to resolve dilemmas is essential for every CMA.",
        },
        {
          title: 'IMA Ethical Principles (Overarching)',
          type: 'text',
          content: "**Guiding principles for CMAs:**\n\n**Honesty:** Be truthful in all professional activities\n\n**Fairness:** Deal with others fairly and equitably\n\n**Objectivity:** Communicate information fairly and accurately\n\n**Responsibility:** Use professional judgment ethically\n\n**These principles underpin the specific standards...**",
        },
        {
          title: 'IMA Standards of Ethical Conduct',
          type: 'table',
          headers: ['Standard', 'Key Requirements'],
          rows: [
            ['Competence', 'Maintain expertise, follow laws, provide accurate information'],
            ['Confidentiality', 'Keep information confidential, don\'t use for personal gain'],
            ['Integrity', 'Avoid conflicts of interest, refuse gifts that impair judgment, recognize limitations'],
            ['Credibility', 'Communicate fairly, report delays/deficiencies, disclose all relevant information'],
          ],
        },
        {
          title: '🧠 Memory Aid: IMA Standards',
          type: 'callout',
          content: "**\"CCIC\"** - The four standards:\n\n**C**ompetence - Be capable\n**C**onfidentiality - Keep secrets\n**I**ntegrity - Be honest\n**C**redibility - Be believable\n\n**Or remember:** \"2 Cs, 1 I, 1 C\"",
        },
        {
          title: 'Ethical Conflict Resolution',
          type: 'text',
          content: "**IMA guidance for resolving ethical dilemmas:**\n\n**Step 1:** Follow established policies at your organization\n\n**Step 2:** Discuss with immediate supervisor (unless involved)\n\n**Step 3:** If unresolved, discuss with next higher level\n\n**Step 4:** If still unresolved, seek confidential advice:\n• IMA Ethics Helpline\n• Legal counsel\n• Board-level audit committee\n\n**Step 5:** Consult an attorney about rights and obligations\n\n**Document everything!**",
        },
        {
          title: 'Common Ethical Dilemmas',
          type: 'text',
          content: "**Pressure situations CMAs face:**\n\n• Manager asks you to \"adjust\" numbers to meet targets\n• Discover fraud but perpetrator is your boss\n• Confidential information could benefit you personally\n• Asked to sign off on estimates you believe are wrong\n• Company policy conflicts with accounting standards\n\n**Key questions:**\n• Is it legal?\n• Does it comply with professional standards?\n• Would I be comfortable if it were public?\n• Does it align with organizational values?",
        },
        {
          title: 'Maintaining Independence',
          type: 'text',
          content: "**Independence threats:**\n\n**Self-interest:** Financial stake in outcome\n**Self-review:** Reviewing own work\n**Advocacy:** Promoting client's position\n**Familiarity:** Close relationships\n**Intimidation:** Threats to objectivity\n\n**Safeguards:**\n• Policies and procedures\n• Rotation of assignments\n• Disclosure of relationships\n• Consultation on ethical issues\n• \"Cooling off\" periods",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IMA principles: Honesty, Fairness, Objectivity, Responsibility",
            "IMA standards: Competence, Confidentiality, Integrity, Credibility",
            "Follow resolution process: organization policies → supervisor → higher levels → IMA/legal",
            "Document ethical concerns and actions taken",
            "Never participate in fraud, even when pressured",
            "Independence threats: Self-interest, Self-review, Advocacy, Familiarity, Intimidation",
            "IMA Ethics Helpline available for confidential consultation",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA1ELessons = () => cma1ELessons;
export const getCMA1ELessonById = (id: string) => cma1ELessons.find(lesson => lesson.id === id);
export const getCMA1ELessonCount = () => cma1ELessons.length;

export default cma1ELessons;
