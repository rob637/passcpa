/**
 * CISA Domain 2: Governance and Management of IT (17%)
 * Based on ISACA CISA Review Manual
 * 
 * Key Topics:
 * - IT Governance Framework
 * - IT Strategy and Policies
 * - IT Resource and Risk Management
 */

import { Lesson } from '../../../types';

export const cisa2Lessons: Lesson[] = [
  // ============================================================================
  // DOMAIN 2A: IT GOVERNANCE
  // ============================================================================
  
  {
    id: 'CISA2-001',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Governance Fundamentals',
    description: 'Understand the principles and structures of effective IT governance',
    order: 1,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Governance Principles', 'Board Responsibility', 'Governance Structures', 'GEIT'],
    blueprintArea: 'CISA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT Governance ensures that IT investments support business objectives and that risks are managed appropriately. As a CISA, you must evaluate whether governance structures enable strategic alignment and value delivery.",
        },
        {
          title: 'What is IT Governance?',
          type: 'text',
          content: "**Definition:**\n\nIT Governance is a subset of corporate governance that focuses on IT resources and their performance. It ensures that:\n\n• IT investments create value\n• IT risks are managed\n• IT resources are used responsibly\n• IT performance is monitored\n\n**ISACA Definition (GEIT):**\n\"Governance of Enterprise IT (GEIT) is a set of responsibilities and practices exercised by the board and executive management to provide strategic direction, ensure objectives are achieved, manage risks appropriately, and verify resources are used responsibly.\"",
        },
        {
          title: 'IT Governance vs. IT Management',
          type: 'table',
          headers: ['Aspect', 'IT Governance', 'IT Management'],
          rows: [
            ['Focus', 'Direction and oversight', 'Execution and delivery'],
            ['Who', 'Board and executives', 'CIO and IT leadership'],
            ['Questions', 'What and why?', 'How and when?'],
            ['Timeframe', 'Strategic, long-term', 'Operational, day-to-day'],
            ['Accountability', 'Shareholders, stakeholders', 'Executive management'],
          ],
        },
        {
          title: 'Five Focus Areas of IT Governance',
          type: 'text',
          content: "**ISACA's IT Governance Focus Areas:**\n\n**1. Strategic Alignment**\n• IT strategy linked to business strategy\n• IT investments support business goals\n• Business and IT communication\n\n**2. Value Delivery**\n• IT delivers promised benefits\n• Costs are optimized\n• Value is measured and demonstrated\n\n**3. Risk Management**\n• IT risks are identified and managed\n• Risk appetite is defined\n• Controls are appropriate\n\n**4. Resource Management**\n• IT resources are optimized\n• Knowledge is captured and shared\n• Sourcing decisions are appropriate\n\n**5. Performance Measurement**\n• IT performance is tracked\n• Projects are monitored\n• Service levels are met",
        },
        {
          title: '🧠 Memory Aid: SVRP-P',
          type: 'callout',
          content: "**IT Governance Focus Areas:**\n\n**S**trategic Alignment\n**V**alue Delivery\n**R**isk Management\n**R**esource Management\n**P**erformance Measurement\n\n*\"Senior VPs Run Performance\"*",
        },
        {
          title: 'Governance Structures',
          type: 'text',
          content: "**Key Governance Bodies:**\n\n**Board of Directors**\n• Ultimate accountability for IT governance\n• Approves IT strategy and major investments\n• Oversees IT risk management\n\n**IT Strategy Committee (Board Level)**\n• Strategic guidance for IT\n• Reviews major IT initiatives\n• Monitors IT value delivery\n\n**IT Steering Committee**\n• Prioritizes IT investments\n• Manages project portfolio\n• Resolves resource conflicts\n\n**Architecture Review Board**\n• Ensures technology standards\n• Reviews major design decisions\n• Manages technical debt\n\n**Risk/Audit Committee**\n• Oversees IT risk management\n• Reviews audit findings\n• Monitors compliance",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT Governance is board/executive responsibility; IT Management is CIO responsibility",
            "Five focus areas: Strategic Alignment, Value Delivery, Risk, Resources, Performance",
            "Governance asks 'What and Why?'; Management asks 'How and When?'",
            "Key structures include board committees, steering committees, and review boards",
            "GEIT ensures IT investments create value and risks are managed",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-002',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Strategy and Planning',
    description: 'Learn how to evaluate IT strategic planning processes and business alignment',
    order: 2,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IT Strategy', 'Strategic Planning', 'Business Alignment', 'Balanced Scorecard'],
    blueprintArea: 'CISA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT strategy must be aligned with business strategy to deliver value. Misalignment leads to wasted resources, failed projects, and competitive disadvantage.",
        },
        {
          title: 'IT Strategic Planning Process',
          type: 'text',
          content: "**Strategic Planning Steps:**\n\n**1. Understand Business Strategy**\n• Review corporate objectives\n• Identify business drivers\n• Understand competitive environment\n\n**2. Assess Current State**\n• IT capabilities inventory\n• Technology assessment\n• Gap analysis\n\n**3. Define IT Vision and Goals**\n• Align with business direction\n• Set measurable objectives\n• Prioritize initiatives\n\n**4. Develop Roadmap**\n• Multi-year plan\n• Resource requirements\n• Dependencies and milestones\n\n**5. Implement and Monitor**\n• Execute initiatives\n• Track progress\n• Adjust as needed",
        },
        {
          title: 'IT Balanced Scorecard',
          type: 'table',
          headers: ['Perspective', 'Focus', 'Example Metrics'],
          rows: [
            ['Corporate Contribution', 'Business value from IT', 'ROI, cost per employee'],
            ['User Orientation', 'Customer/user satisfaction', 'Satisfaction scores, SLA compliance'],
            ['Operational Excellence', 'IT process efficiency', 'Availability, incident resolution time'],
            ['Future Orientation', 'Innovation and readiness', 'Training hours, skill assessments'],
          ],
        },
        {
          title: 'Strategic Alignment Maturity',
          type: 'text',
          content: "**Alignment Maturity Levels:**\n\n**Level 1: Initial/Ad Hoc**\n• No formal alignment process\n• Reactive IT decisions\n• Disconnected from business\n\n**Level 2: Committed**\n• Recognition of need for alignment\n• Some processes in place\n• Limited communication\n\n**Level 3: Established**\n• Formal alignment processes\n• Regular business-IT communication\n• Governance structures exist\n\n**Level 4: Managed**\n• Strategic IT planning integrated\n• Metrics and measurement\n• Continuous improvement\n\n**Level 5: Optimized**\n• IT is strategic partner\n• Co-creation of strategy\n• Dynamic adaptation",
        },
        {
          title: 'Auditing IT Strategy',
          type: 'text',
          content: "**Key Audit Questions:**\n\n**Existence and Quality**\n• Is there a documented IT strategy?\n• Is it current and regularly updated?\n• Does it align with business strategy?\n\n**Process**\n• Who participates in strategic planning?\n• How is business input obtained?\n• Is there a formal approval process?\n\n**Communication**\n• Is the strategy communicated to IT staff?\n• Do business units understand IT direction?\n• Are goals cascaded to teams?\n\n**Monitoring**\n• How is progress tracked?\n• Are KPIs defined and measured?\n• Is there a formal review process?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT strategy must align with and support business strategy",
            "Strategic planning includes assessment, goal setting, roadmap, and monitoring",
            "IT Balanced Scorecard measures value across four perspectives",
            "Alignment maturity ranges from ad hoc (Level 1) to optimized (Level 5)",
            "Auditors evaluate strategy existence, quality, process, and monitoring",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-003',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Policies, Procedures, and Standards',
    description: 'Understand the hierarchy and role of IT policies in governance',
    order: 3,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Policies', 'Procedures', 'Standards', 'Guidelines', 'Policy Management'],
    blueprintArea: 'CISA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Policies are the backbone of IT governance. They translate strategic direction into requirements that guide behavior throughout the organization. Well-crafted policies reduce risk and enable consistent operations.",
        },
        {
          title: 'Policy Hierarchy',
          type: 'text',
          content: "**Four Levels of Documentation:**\n\n**1. Policies**\n• High-level management intent\n• What must be done (not how)\n• Approved by senior management\n• Mandatory compliance\n\n**2. Standards**\n• Specific technical or process requirements\n• Measurable and testable\n• Define minimum requirements\n• Mandatory compliance\n\n**3. Procedures**\n• Step-by-step instructions\n• How to implement policies/standards\n• Detailed operational guidance\n• Mandatory for assigned tasks\n\n**4. Guidelines**\n• Best practices and recommendations\n• Suggested approaches\n• Discretionary compliance\n• Support good decisions",
        },
        {
          title: 'Policy Hierarchy Visualization',
          type: 'table',
          headers: ['Level', 'Purpose', 'Compliance', 'Example'],
          rows: [
            ['Policy', 'Management direction', 'Mandatory', '"All systems must have access controls"'],
            ['Standard', 'Specific requirements', 'Mandatory', '"Passwords must be 12+ characters"'],
            ['Procedure', 'Implementation steps', 'Mandatory for task', '"How to reset a password"'],
            ['Guideline', 'Recommendations', 'Discretionary', '"Consider using password manager"'],
          ],
        },
        {
          title: 'Essential IT Policies',
          type: 'text',
          content: "**Core IT Policy Areas:**\n\n**Security Policies**\n• Information security policy\n• Access control policy\n• Acceptable use policy\n• Data classification policy\n\n**Operational Policies**\n• Change management policy\n• Incident management policy\n• Backup and recovery policy\n• Business continuity policy\n\n**Risk Policies**\n• Risk management policy\n• Third-party management policy\n• Compliance policy\n\n**Governance Policies**\n• IT investment policy\n• Project management policy\n• Data management policy",
        },
        {
          title: 'Policy Lifecycle Management',
          type: 'text',
          content: "**Policy Management Process:**\n\n**1. Development**\n• Identify need\n• Draft policy\n• Stakeholder review\n\n**2. Approval**\n• Management review\n• Legal/compliance review\n• Formal approval\n\n**3. Communication**\n• Publish and distribute\n• Training and awareness\n• Acknowledgment tracking\n\n**4. Enforcement**\n• Monitor compliance\n• Exception management\n• Violation handling\n\n**5. Maintenance**\n• Periodic review\n• Update as needed\n• Version control",
        },
        {
          title: 'Auditing Policies',
          type: 'text',
          content: "**Key Audit Procedures:**\n\n• Verify policies exist for key areas\n• Assess completeness and appropriateness\n• Check approval and ownership\n• Verify communication and awareness\n• Test compliance through sampling\n• Review exception handling\n• Verify periodic review process",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Policy hierarchy: Policies → Standards → Procedures → Guidelines",
            "Policies define 'what'; procedures define 'how'",
            "Standards are mandatory; guidelines are discretionary",
            "Essential policies cover security, operations, risk, and governance",
            "Policy lifecycle includes development, approval, communication, enforcement, maintenance",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 2B: IT RESOURCE MANAGEMENT
  // ============================================================================

  {
    id: 'CISA2-004',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Organizational Structure and Roles',
    description: 'Understand IT organizational design and key roles and responsibilities',
    order: 4,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IT Organization', 'Roles', 'Segregation of Duties', 'Reporting Lines'],
    blueprintArea: 'CISA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Proper organizational structure ensures clear accountability, appropriate segregation of duties, and effective IT service delivery. IS auditors must understand how IT is organized to assess control effectiveness.",
        },
        {
          title: 'Common IT Organizational Models',
          type: 'text',
          content: "**Organizational Approaches:**\n\n**Centralized IT**\n• Single IT organization\n• Consistent standards\n• Economies of scale\n• May lack business responsiveness\n\n**Decentralized IT**\n• IT within business units\n• Close to business needs\n• Potential duplication\n• Standards challenges\n\n**Federated/Hybrid**\n• Central infrastructure/governance\n• Business unit development\n• Balance of control and flexibility\n• Complex coordination",
        },
        {
          title: 'Key IT Roles',
          type: 'table',
          headers: ['Role', 'Responsibilities', 'Reports To'],
          rows: [
            ['CIO', 'IT strategy, leadership, business alignment', 'CEO/Board'],
            ['CISO', 'Information security program', 'CIO or CEO'],
            ['IT Director', 'IT operations, service delivery', 'CIO'],
            ['Enterprise Architect', 'Technology standards, architecture', 'CIO'],
            ['Data Officer', 'Data management, governance', 'CIO or CDO'],
            ['Service Manager', 'IT service management, SLAs', 'IT Director'],
          ],
        },
        {
          title: 'Segregation of Duties (SoD)',
          type: 'text',
          content: "**Why SoD Matters:**\n\nSegregation of duties ensures that no single person can initiate, authorize, and complete a transaction or process. This prevents fraud and errors.\n\n**Key IT SoD Principles:**\n\n**Development vs. Operations**\n• Developers should not have production access\n• Operations should not modify code\n\n**Security vs. Administration**\n• Security staff should not administer systems\n• Administrators should be monitored\n\n**Authorization vs. Execution**\n• Approvers should not implement changes\n• Executors need documented approvals\n\n**Logging vs. Administration**\n• Administrators should not modify audit logs\n• Logs should be protected from tampering",
        },
        {
          title: 'Compensating Controls for SoD',
          type: 'text',
          content: "**When SoD is Not Practical:**\n\nIn small organizations or specialized areas, full segregation may not be possible.\n\n**Compensating Controls:**\n\n• **Supervisory Review** - Management oversight of activities\n• **Audit Trails** - Detailed logging of all actions\n• **Reconciliations** - Independent verification\n• **Access Reviews** - Regular recertification\n• **Monitoring** - Real-time alerts on sensitive activities\n• **Job Rotation** - Periodic role changes\n\n**⚠️ Note:** Compensating controls must be documented, approved, and monitored for effectiveness.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT can be organized centrally, decentralized, or hybrid (federated)",
            "Key roles include CIO, CISO, IT Director, Enterprise Architect",
            "SoD prevents single-person control over critical processes",
            "Key separations: development/operations, security/admin, approve/execute",
            "Compensating controls address SoD gaps in small organizations",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-005',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Human Resource Management',
    description: 'Learn controls over IT personnel throughout their employment lifecycle',
    order: 5,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['HR Controls', 'Background Checks', 'Training', 'Termination Controls'],
    blueprintArea: 'CISA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "People are often the weakest link in security. Proper HR controls ensure that IT staff are qualified, trustworthy, trained, and that access is promptly removed when employment ends.",
        },
        {
          title: 'Pre-Employment Controls',
          type: 'text',
          content: "**Before Hiring:**\n\n**Job Definition**\n• Clear role descriptions\n• Required qualifications\n• Security clearance needs\n\n**Screening**\n• Background checks\n• Reference verification\n• Criminal history (where permitted)\n• Credit checks (for financial roles)\n\n**Employment Terms**\n• Confidentiality agreements\n• Acceptable use acknowledgment\n• Non-compete clauses\n• IP assignment agreements\n\n**⚠️ Legal Note:** Pre-employment screening must comply with local laws and regulations regarding privacy and discrimination.",
        },
        {
          title: 'During Employment Controls',
          type: 'text',
          content: "**Ongoing HR Controls:**\n\n**Training and Awareness**\n• Security awareness training\n• Role-specific technical training\n• Compliance training\n• Regular refresher courses\n\n**Access Management**\n• Least privilege access\n• Periodic access reviews\n• Role change updates\n• Temporary access controls\n\n**Performance Management**\n• Regular performance reviews\n• Security compliance metrics\n• Career development\n• Succession planning\n\n**Monitoring**\n• Activity logging\n• Behavior monitoring (with notice)\n• Insider threat programs",
        },
        {
          title: 'Termination Controls',
          type: 'table',
          headers: ['Control', 'Purpose', 'Timing'],
          rows: [
            ['Access revocation', 'Remove all system access', 'Immediate upon termination'],
            ['Badge/key return', 'Prevent physical access', 'During exit process'],
            ['Equipment return', 'Recover company assets', 'During exit process'],
            ['Exit interview', 'Knowledge transfer, concerns', 'Before departure'],
            ['Account audit', 'Review recent activity', 'Post-termination'],
            ['Forwarding', 'Route emails appropriately', 'As needed'],
          ],
        },
        {
          title: 'Handling Involuntary Terminations',
          type: 'text',
          content: "**High-Risk Terminations:**\n\n**Immediate Actions:**\n• Disable access before/during notification\n• Escort from premises\n• Collect all assets\n• Monitor for anomalous activity\n\n**Special Considerations:**\n• Privileged access holders\n• Employees with system knowledge\n• Disgruntled employees\n• Reduction in force situations\n\n**Coordination Required:**\n• HR and IT synchronization\n• Manager notification\n• Security involvement\n• Legal guidance if needed",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Pre-employment controls include screening, agreements, and job definition",
            "Ongoing controls include training, access reviews, and monitoring",
            "Termination controls must be timely, especially for involuntary separations",
            "Access revocation should be immediate upon termination",
            "HR and IT must coordinate closely on employee transitions",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-006',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Vendor and Third-Party Management',
    description: 'Understand controls for managing IT vendors and outsourcing risks',
    order: 6,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Vendor Management', 'Outsourcing', 'Contracts', 'Third-Party Risk'],
    blueprintArea: 'CISA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Organizations increasingly rely on third parties for IT services. Vendor risk is YOUR risk - a vendor breach can expose your organization to significant harm. Strong vendor management is essential.",
        },
        {
          title: 'Vendor Management Lifecycle',
          type: 'text',
          content: "**Phases of Vendor Management:**\n\n**1. Planning**\n• Define requirements\n• Determine criticality\n• Identify risks\n• Market research\n\n**2. Selection**\n• RFP/RFI process\n• Due diligence\n• Risk assessment\n• Reference checks\n\n**3. Contracting**\n• SLA negotiation\n• Security requirements\n• Audit rights\n• Exit provisions\n\n**4. Onboarding**\n• Access provisioning\n• Training\n• Control validation\n• Integration testing\n\n**5. Monitoring**\n• Performance tracking\n• Security assessments\n• Compliance verification\n• Relationship management\n\n**6. Offboarding**\n• Data return/destruction\n• Access termination\n• Knowledge transfer\n• Contract closure",
        },
        {
          title: 'Key Contract Provisions',
          type: 'table',
          headers: ['Provision', 'Purpose', 'Requirement'],
          rows: [
            ['SLA', 'Performance standards', 'Measurable metrics, penalties'],
            ['Security', 'Data protection', 'Specific security controls'],
            ['Audit Rights', 'Oversight capability', 'Right to audit vendor'],
            ['Subcontracting', 'Fourth-party control', 'Approval requirements'],
            ['Termination', 'Exit planning', 'Transition assistance'],
            ['Liability', 'Risk allocation', 'Breach responsibility'],
            ['Business Continuity', 'Resilience', 'DR/BC requirements'],
          ],
        },
        {
          title: 'Third-Party Risk Assessment',
          type: 'text',
          content: "**Risk Categories:**\n\n**Strategic Risk**\n• Vendor stability\n• Market position\n• Dependency level\n\n**Operational Risk**\n• Service delivery capability\n• Process maturity\n• Geographic considerations\n\n**Security Risk**\n• Security posture\n• Incident history\n• Data handling practices\n\n**Compliance Risk**\n• Regulatory compliance\n• Industry standards\n• Certification status\n\n**Financial Risk**\n• Financial stability\n• Insurance coverage\n• Pricing sustainability",
        },
        {
          title: 'Vendor Security Assessment',
          type: 'text',
          content: "**Assessment Approaches:**\n\n**Questionnaires**\n• SIG (Standardized Information Gathering)\n• CAIQ (Cloud Security Alliance)\n• Custom questionnaires\n\n**Certifications**\n• SOC 2 Type II reports\n• ISO 27001 certification\n• Industry-specific certifications\n\n**Audits**\n• On-site assessments\n• Penetration testing\n• Control validation\n\n**Continuous Monitoring**\n• Security ratings (BitSight, SecurityScorecard)\n• News monitoring\n• Dark web monitoring\n\n**Key Consideration:** Risk-tier vendors based on data access and criticality to determine assessment depth.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Vendor management lifecycle: planning, selection, contracting, onboarding, monitoring, offboarding",
            "Key contract provisions: SLAs, security requirements, audit rights, termination",
            "Assess strategic, operational, security, compliance, and financial risks",
            "Use SOC 2 reports, certifications, and questionnaires for security assessment",
            "Tier vendors by risk and adjust oversight accordingly",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 2C: IT RISK MANAGEMENT
  // ============================================================================

  {
    id: 'CISA2-007',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Risk Management Framework',
    description: 'Master the principles and processes of IT risk management',
    order: 7,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Risk Framework', 'Risk Identification', 'Risk Analysis', 'Risk Response'],
    blueprintArea: 'CISA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Risk management is central to IT governance. As a CISA, you must understand how organizations identify, assess, and respond to IT risks. This domain is heavily tested!",
        },
        {
          title: 'Risk Management Process',
          type: 'text',
          content: "**Risk Management Steps:**\n\n**1. Risk Identification**\n• Identify assets and threats\n• Identify vulnerabilities\n• Document risk scenarios\n\n**2. Risk Analysis**\n• Assess likelihood\n• Assess impact\n• Calculate risk level\n\n**3. Risk Evaluation**\n• Compare to risk appetite\n• Prioritize risks\n• Determine treatment need\n\n**4. Risk Treatment**\n• Select response strategy\n• Implement controls\n• Document decisions\n\n**5. Risk Monitoring**\n• Track risk indicators\n• Reassess periodically\n• Report to stakeholders",
        },
        {
          title: 'Risk Analysis Approaches',
          type: 'table',
          headers: ['Approach', 'Method', 'Advantages', 'Disadvantages'],
          rows: [
            ['Qualitative', 'High/Medium/Low ratings', 'Quick, easy to communicate', 'Subjective, less precise'],
            ['Quantitative', 'Monetary values (ALE)', 'Objective, supports ROI', 'Data-intensive, complex'],
            ['Semi-Quantitative', 'Numeric scales (1-5)', 'Balance of both', 'May suggest false precision'],
          ],
        },
        {
          title: 'Quantitative Risk Formulas',
          type: 'text',
          content: "**Key Formulas:**\n\n**Asset Value (AV)**\n• Replacement cost of asset\n\n**Exposure Factor (EF)**\n• Percentage of asset lost if threat occurs\n\n**Single Loss Expectancy (SLE)**\n• SLE = AV × EF\n• Expected loss from single incident\n\n**Annual Rate of Occurrence (ARO)**\n• Expected frequency per year\n\n**Annual Loss Expectancy (ALE)**\n• ALE = SLE × ARO\n• Expected annual loss\n\n**Example:**\nServer value = $100,000 (AV)\nFlood damage = 60% (EF)\nSLE = $100,000 × 0.60 = $60,000\nFlood frequency = 0.1/year (ARO)\nALE = $60,000 × 0.1 = $6,000/year",
        },
        {
          title: '🧠 Memory Aid: Risk Formulas',
          type: 'callout',
          content: "**\"Single ALE = AV × EF × ARO\"**\n\nBut step by step:\n• **SLE** = **A**sset **V**alue × **E**xposure **F**actor\n• **ALE** = **S**ingle **L**oss **E**xpectancy × **A**nnual **R**ate of **O**ccurrence\n\n*Think: \"Security Leaders Evaluate All Risks Often\"*",
        },
        {
          title: 'Risk Treatment Options',
          type: 'text',
          content: "**Four Risk Response Strategies:**\n\n**1. Risk Mitigation (Reduce)**\n• Implement controls to reduce likelihood or impact\n• Most common response\n• Examples: firewalls, encryption, training\n\n**2. Risk Transfer (Share)**\n• Shift risk to another party\n• Examples: insurance, outsourcing, contracts\n• Does not eliminate risk\n\n**3. Risk Avoidance**\n• Eliminate the activity causing risk\n• Examples: don't store certain data, exit market\n• May limit business opportunity\n\n**4. Risk Acceptance**\n• Acknowledge risk and proceed\n• Requires proper authority\n• Must be documented\n• Within risk appetite",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Risk management: identify, analyze, evaluate, treat, monitor",
            "Qualitative is quick; quantitative provides monetary values",
            "ALE = SLE × ARO; SLE = AV × EF",
            "Four responses: mitigate, transfer, avoid, accept",
            "Risk acceptance requires proper authority and documentation",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-008',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Risk Assessment Practices',
    description: 'Learn practical techniques for conducting IT risk assessments',
    order: 8,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Risk Assessment', 'Threat Analysis', 'Vulnerability Assessment', 'Risk Register'],
    blueprintArea: 'CISA2-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Risk assessments are the foundation of audit planning and control evaluation. As a CISA, you'll both conduct risk assessments and evaluate management's risk assessment processes.",
        },
        {
          title: 'Risk Assessment Components',
          type: 'text',
          content: "**Three Key Elements:**\n\n**1. Asset Identification**\n• Hardware and software\n• Data and information\n• People and skills\n• Processes and procedures\n• Reputation and brand\n\n**2. Threat Identification**\n• Natural (floods, earthquakes)\n• Environmental (power failure, HVAC)\n• Human deliberate (hackers, insiders)\n• Human accidental (errors, mistakes)\n• Technical (hardware failure, bugs)\n\n**3. Vulnerability Identification**\n• Technical vulnerabilities\n• Process weaknesses\n• People vulnerabilities\n• Physical security gaps\n• Configuration issues",
        },
        {
          title: 'Common Threat Categories',
          type: 'table',
          headers: ['Category', 'Examples', 'Typical Controls'],
          rows: [
            ['Malware', 'Ransomware, viruses', 'Anti-malware, patching'],
            ['Social Engineering', 'Phishing, pretexting', 'Training, awareness'],
            ['Insider Threat', 'Fraud, theft', 'Access controls, monitoring'],
            ['External Attack', 'DDoS, exploitation', 'Firewalls, IDS/IPS'],
            ['Physical', 'Theft, tampering', 'Locks, surveillance'],
            ['Environmental', 'Fire, flood', 'Suppression, DR site'],
          ],
        },
        {
          title: 'Vulnerability Assessment Methods',
          type: 'text',
          content: "**Assessment Techniques:**\n\n**Automated Scanning**\n• Network vulnerability scanners\n• Web application scanners\n• Code analysis tools\n• Configuration assessment\n\n**Manual Testing**\n• Penetration testing\n• Security reviews\n• Architecture assessment\n• Process walkthroughs\n\n**Third-Party Sources**\n• CVE databases\n• Vendor advisories\n• Threat intelligence feeds\n• Industry alerts\n\n**Key Principle:** Vulnerabilities create risk only when threats can exploit them. Consider both together.",
        },
        {
          title: 'Risk Register',
          type: 'text',
          content: "**Risk Register Contents:**\n\n**For Each Risk:**\n• Risk ID and description\n• Risk category\n• Threat and vulnerability\n• Likelihood rating\n• Impact rating\n• Overall risk level\n• Risk owner\n• Treatment strategy\n• Controls in place\n• Residual risk\n• Status and updates\n\n**Register Maintenance:**\n• Update regularly\n• Review with stakeholders\n• Report to governance bodies\n• Track treatment progress",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Risk assessment identifies assets, threats, and vulnerabilities",
            "Common threats: malware, social engineering, insiders, external attacks",
            "Use both automated scanning and manual testing for vulnerabilities",
            "Risk register documents risks, owners, treatments, and status",
            "Maintain and update risk register regularly",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 2D: IT AUDIT AND COMPLIANCE
  // ============================================================================

  {
    id: 'CISA2-009',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'Regulatory Compliance and Privacy',
    description: 'Understand key compliance requirements and privacy regulations affecting IT',
    order: 9,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Compliance', 'Privacy Regulations', 'Data Protection', 'Industry Requirements'],
    blueprintArea: 'CISA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Regulatory compliance is a key driver of IT controls. Non-compliance can result in significant fines, legal action, and reputational damage. IS auditors must understand applicable requirements.",
        },
        {
          title: 'Major Privacy Regulations',
          type: 'table',
          headers: ['Regulation', 'Jurisdiction', 'Key Requirements'],
          rows: [
            ['GDPR', 'EU/EEA', 'Consent, data rights, breach notification, DPO'],
            ['CCPA/CPRA', 'California', 'Disclosure, opt-out, data access rights'],
            ['HIPAA', 'US Healthcare', 'PHI protection, administrative/technical/physical safeguards'],
            ['GLBA', 'US Financial', 'Privacy notices, safeguards rule'],
            ['PIPEDA', 'Canada', 'Consent, purpose limitation, accountability'],
          ],
        },
        {
          title: 'GDPR Key Principles',
          type: 'text',
          content: "**GDPR Data Protection Principles:**\n\n**1. Lawfulness, Fairness, Transparency**\n• Legal basis for processing\n• Fair to data subjects\n• Clear privacy notices\n\n**2. Purpose Limitation**\n• Collected for specified purposes\n• Not processed incompatibly\n\n**3. Data Minimization**\n• Adequate, relevant, limited\n• Only what's necessary\n\n**4. Accuracy**\n• Keep data accurate\n• Update or delete inaccurate data\n\n**5. Storage Limitation**\n• Retain only as long as necessary\n• Implement retention schedules\n\n**6. Integrity and Confidentiality**\n• Appropriate security\n• Protect against unauthorized access\n\n**7. Accountability**\n• Demonstrate compliance\n• Document processing activities",
        },
        {
          title: 'Industry-Specific Requirements',
          type: 'text',
          content: "**Sector-Specific Compliance:**\n\n**Financial Services**\n• SOX (Sarbanes-Oxley)\n• PCI DSS for card data\n• FFIEC guidance\n• AML/BSA requirements\n\n**Healthcare**\n• HIPAA Security Rule\n• HITECH Act\n• FDA 21 CFR Part 11\n\n**Government/Defense**\n• FISMA\n• FedRAMP\n• NIST 800-171\n• CMMC\n\n**Publicly Traded**\n• SOX Section 404\n• SEC cybersecurity disclosure\n• Audit requirements",
        },
        {
          title: 'Compliance Monitoring',
          type: 'text',
          content: "**Compliance Program Elements:**\n\n**Governance**\n• Compliance oversight\n• Regulatory intelligence\n• Policy management\n\n**Assessment**\n• Gap analysis\n• Self-assessments\n• Third-party audits\n\n**Monitoring**\n• Control testing\n• Continuous monitoring\n• Exception tracking\n\n**Reporting**\n• Management reporting\n• Regulatory filings\n• Audit committee updates\n\n**Remediation**\n• Issue tracking\n• Corrective actions\n• Root cause analysis",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Key privacy regulations: GDPR, CCPA, HIPAA, GLBA",
            "GDPR principles: lawfulness, purpose limitation, minimization, accuracy, security",
            "Industry requirements add specific controls (PCI, HIPAA, SOX)",
            "Compliance programs include governance, assessment, monitoring, reporting",
            "IS auditors evaluate compliance control effectiveness",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-010',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'Business Impact Analysis and Criticality',
    description: 'Learn to identify and prioritize critical business processes and supporting IT',
    order: 10,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['BIA', 'Criticality Assessment', 'RTO/RPO', 'Dependencies'],
    blueprintArea: 'CISA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Business Impact Analysis (BIA) identifies what matters most to the organization. It drives recovery priorities, resource allocation, and control investments.",
        },
        {
          title: 'BIA Process',
          type: 'text',
          content: "**BIA Steps:**\n\n**1. Identify Business Processes**\n• Inventory key processes\n• Document process owners\n• Map to organizational units\n\n**2. Determine Dependencies**\n• IT systems supporting each process\n• Data requirements\n• Third-party dependencies\n• People and skills\n\n**3. Assess Impact of Disruption**\n• Financial impact over time\n• Operational impact\n• Regulatory/legal impact\n• Reputational impact\n\n**4. Define Recovery Objectives**\n• Recovery Time Objective (RTO)\n• Recovery Point Objective (RPO)\n• Minimum recovery configuration\n\n**5. Prioritize Recovery**\n• Rank by criticality\n• Sequence restoration\n• Allocate resources",
        },
        {
          title: 'Key Recovery Metrics',
          type: 'table',
          headers: ['Metric', 'Definition', 'Determines'],
          rows: [
            ['RTO', 'Maximum acceptable downtime', 'Recovery speed needed'],
            ['RPO', 'Maximum acceptable data loss', 'Backup frequency needed'],
            ['MTD', 'Maximum tolerable downtime', 'When organization fails'],
            ['WRT', 'Work recovery time', 'Time to verify/validate'],
          ],
        },
        {
          title: '🧠 Memory Aid: RTO vs RPO',
          type: 'callout',
          content: "**RTO = \"Right Time Operational\"**\n• How fast must we recover?\n• Measured from disruption to restoration\n\n**RPO = \"Right Point of data\"**\n• How much data can we lose?\n• Measured from last backup to disruption\n\n*RTO looks FORWARD; RPO looks BACKWARD*",
        },
        {
          title: 'Impact Categories',
          type: 'text',
          content: "**Types of Business Impact:**\n\n**Financial Impact**\n• Lost revenue\n• Increased costs\n• Penalties and fines\n• Lost market share\n\n**Operational Impact**\n• Customer service degradation\n• Supply chain disruption\n• Production stoppage\n• Employee productivity loss\n\n**Regulatory/Legal Impact**\n• Compliance violations\n• Legal liability\n• License implications\n• Reporting failures\n\n**Reputational Impact**\n• Customer trust\n• Brand value\n• Public perception\n• Partner relationships",
        },
        {
          title: 'Using BIA Results',
          type: 'text',
          content: "**BIA Informs:**\n\n**Recovery Planning**\n• Disaster recovery strategy\n• Resource allocation\n• Recovery sequence priorities\n\n**Control Investment**\n• Focus on critical systems\n• Justify security spending\n• Risk-based decisions\n\n**Audit Planning**\n• Prioritize audit coverage\n• Focus on high-impact areas\n• Resource allocation\n\n**Governance**\n• Board reporting\n• Executive decisions\n• Strategic planning",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BIA identifies critical processes and recovery priorities",
            "RTO = recovery speed; RPO = acceptable data loss",
            "Impact includes financial, operational, regulatory, and reputational",
            "BIA informs DR planning, control investment, and audit planning",
            "MTD is the point where organization viability is threatened",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-011',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Service Management (ITSM)',
    description: 'Understand ITIL and IT service management processes',
    order: 11,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['ITIL', 'ITSM', 'Service Desk', 'SLA Management'],
    blueprintArea: 'CISA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT Service Management (ITSM) provides the operational framework for delivering IT services. IS auditors evaluate ITSM processes to ensure reliable, secure service delivery.",
        },
        {
          title: 'What is ITIL?',
          type: 'text',
          content: "**ITIL Definition:**\n\nITIL (Information Technology Infrastructure Library) is the most widely adopted framework for IT service management. It provides best practices for aligning IT services with business needs.\n\n**ITIL 4 Guiding Principles:**\n\n1. **Focus on value** - Create value for stakeholders\n2. **Start where you are** - Assess current state\n3. **Progress iteratively with feedback** - Improve continuously\n4. **Collaborate and promote visibility** - Work together\n5. **Think and work holistically** - End-to-end perspective\n6. **Keep it simple and practical** - Avoid overcomplication\n7. **Optimize and automate** - Eliminate waste",
        },
        {
          title: 'Key ITSM Processes',
          type: 'table',
          headers: ['Process', 'Purpose', 'Key Activities'],
          rows: [
            ['Incident Management', 'Restore normal service', 'Log, categorize, resolve, close'],
            ['Problem Management', 'Prevent future incidents', 'Root cause, known errors, fixes'],
            ['Change Management', 'Control changes to IT', 'Request, assess, approve, implement'],
            ['Configuration Management', 'Maintain configuration data', 'CMDB, baselines, relationships'],
            ['Service Request', 'Handle service requests', 'Catalog, fulfill, track'],
            ['Service Level Management', 'Manage SLAs', 'Define, monitor, report, improve'],
          ],
        },
        {
          title: 'Incident vs. Problem Management',
          type: 'text',
          content: "**Key Distinctions:**\n\n**Incident Management**\n• Focus: Restore service quickly\n• Timeframe: Immediate\n• Goal: Minimize business impact\n• Question: \"How do we fix it now?\"\n\n**Problem Management**\n• Focus: Find root cause\n• Timeframe: Longer-term\n• Goal: Prevent future incidents\n• Question: \"Why did it happen?\"\n\n**Example:**\n• **Incident:** Server crashed, restart to restore\n• **Problem:** Why did it crash? Memory leak, need patch",
        },
        {
          title: 'Service Level Management',
          type: 'text',
          content: "**SLA Components:**\n\n**Service Level Agreement (SLA)**\n• Agreement between IT and customer\n• Defines service expectations\n• Measurable metrics\n\n**Operational Level Agreement (OLA)**\n• Internal IT team agreements\n• Support the SLA\n\n**Underpinning Contract (UC)**\n• With external vendors\n• Support service delivery\n\n**Key Metrics:**\n• Availability percentage\n• Response time\n• Resolution time\n• Customer satisfaction\n• Incident volume",
        },
        {
          title: 'Auditing ITSM',
          type: 'text',
          content: "**Audit Considerations:**\n\n**Incident Management**\n• Incidents logged and tracked?\n• Prioritization criteria defined?\n• Escalation procedures followed?\n• Metrics monitored?\n\n**Change Management**\n• Formal change process exists?\n• Risk assessment performed?\n• Approvals documented?\n• Testing requirements met?\n\n**Problem Management**\n• Root cause analysis performed?\n• Known errors documented?\n• Patterns analyzed?\n• Permanent fixes implemented?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ITIL is the leading framework for IT service management",
            "Key processes: incident, problem, change, configuration, service request, SLM",
            "Incidents restore service; problems address root causes",
            "SLAs define service expectations; OLAs and UCs support them",
            "Auditors evaluate process existence, compliance, and effectiveness",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-012',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Budgeting and Financial Management',
    description: 'Understand IT financial management and investment decision-making',
    order: 12,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['IT Budget', 'TCO', 'ROI', 'Investment Prioritization'],
    blueprintArea: 'CISA2-D',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT is a significant organizational investment. Understanding IT financial management helps auditors evaluate whether IT resources are used effectively and investments deliver value.",
        },
        {
          title: 'IT Budget Categories',
          type: 'text',
          content: "**Budget Components:**\n\n**Capital Expenditures (CapEx)**\n• Hardware purchases\n• Software licenses (perpetual)\n• Major projects\n• Infrastructure investments\n\n**Operating Expenditures (OpEx)**\n• Staff salaries\n• Software subscriptions (SaaS)\n• Maintenance and support\n• Cloud services\n• Training\n\n**Trend:** Increasing shift from CapEx to OpEx due to cloud adoption and subscription models.",
        },
        {
          title: 'IT Investment Metrics',
          type: 'table',
          headers: ['Metric', 'Formula', 'Purpose'],
          rows: [
            ['ROI', '(Net Benefits - Costs) / Costs', 'Investment return'],
            ['NPV', 'Present value of future cash flows', 'Time value consideration'],
            ['Payback Period', 'Initial cost / Annual savings', 'Time to recoup investment'],
            ['IRR', 'Discount rate where NPV = 0', 'Compare investments'],
            ['TCO', 'All costs over asset lifetime', 'True cost comparison'],
          ],
        },
        {
          title: 'Total Cost of Ownership (TCO)',
          type: 'text',
          content: "**TCO Components:**\n\n**Acquisition Costs**\n• Purchase price\n• Implementation\n• Training\n• Customization\n\n**Operating Costs**\n• Maintenance\n• Support\n• Upgrades\n• Staffing\n\n**Hidden Costs**\n• Downtime\n• Security\n• Compliance\n• Integration\n\n**End-of-Life Costs**\n• Migration\n• Decommissioning\n• Data conversion\n\n**Why TCO Matters:** Lower purchase price may have higher TCO due to ongoing costs.",
        },
        {
          title: 'IT Portfolio Management',
          type: 'text',
          content: "**Portfolio Categories:**\n\n**Run the Business (RTB)**\n• Maintain existing systems\n• Operational stability\n• Infrastructure refresh\n• Typically 60-80% of budget\n\n**Grow the Business (GTB)**\n• New capabilities\n• Strategic initiatives\n• Digital transformation\n• Typically 15-30% of budget\n\n**Transform the Business (TTB)**\n• Disruptive innovation\n• New business models\n• Emerging technology\n• Typically 5-15% of budget\n\n**Portfolio Balance:** Organizations should consciously allocate across categories.",
        },
        {
          title: 'Auditing IT Financial Management',
          type: 'text',
          content: "**Key Audit Questions:**\n\n• Is there a formal IT budget process?\n• How are investments prioritized?\n• Are business cases required and tracked?\n• Is actual spending compared to budget?\n• Are project costs monitored?\n• Is value realization measured?\n• Are hidden costs considered?\n• Is TCO used for major decisions?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT budget includes CapEx (purchases) and OpEx (ongoing costs)",
            "Key metrics: ROI, NPV, payback period, IRR, TCO",
            "TCO includes acquisition, operating, hidden, and end-of-life costs",
            "Portfolio categories: Run, Grow, Transform the Business",
            "Auditors evaluate budget process, prioritization, and value realization",
          ],
        },
      ],
    },
  },
];

export default cisa2Lessons;
