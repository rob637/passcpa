/**
 * CIA Part 3: Business Knowledge for Internal Auditing
 * 100 questions | 2 hours | Scaled score 600/750 to pass
 * 
 * Domain I: Business Acumen (35%)
 * Domain II: Information Security (25%)
 * Domain III: Information Technology (20%)
 * Domain IV: Financial Management (20%)
 * 
 * Based on IIA Global Internal Audit Standards (2024)
 */

import { Lesson } from '../../../types';

export const cia3Lessons: Lesson[] = [
  // ============================================================================
  // DOMAIN I: BUSINESS ACUMEN (35%)
  // ============================================================================
  
  {
    id: 'CIA3-I-001',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Strategic Management and Planning',
    description: 'Understand strategic planning processes and how to audit strategic initiatives',
    order: 1,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Strategic planning', 'SWOT analysis', 'Competitive strategy', 'Strategic risk'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Internal auditors need business acumen to effectively evaluate risks and add value. Understanding strategy helps you assess whether controls support organizational objectives. Part 3 tests your business knowledge!",
        },
        {
          title: 'Strategic Planning Process',
          type: 'text',
          content: "**Strategic planning is the process of:**\n\n1. **Defining mission and vision**\n• Mission: Why we exist\n• Vision: Where we're going\n\n2. **Analyzing environment**\n• External opportunities and threats\n• Internal strengths and weaknesses\n\n3. **Setting objectives**\n• Long-term goals aligned with mission\n• SMART objectives\n\n4. **Developing strategies**\n• How to achieve objectives\n• Competitive positioning\n\n5. **Implementation and monitoring**\n• Action plans\n• Performance measurement",
        },
        {
          title: 'SWOT Analysis',
          type: 'table',
          headers: ['Internal', 'External'],
          rows: [
            ['Strengths - Competitive advantages', 'Opportunities - External factors to exploit'],
            ['Weaknesses - Areas for improvement', 'Threats - External risks to manage'],
          ],
        },
        {
          title: 'Porter\'s Competitive Forces',
          type: 'text',
          content: "**Five Forces Model:**\n\n**1. Threat of New Entrants**\n• Barriers to entry\n• Capital requirements\n\n**2. Bargaining Power of Suppliers**\n• Supplier concentration\n• Switching costs\n\n**3. Bargaining Power of Buyers**\n• Customer concentration\n• Price sensitivity\n\n**4. Threat of Substitutes**\n• Alternative products\n• Switching costs\n\n**5. Industry Rivalry**\n• Number of competitors\n• Growth rate",
        },
        {
          title: 'Generic Competitive Strategies',
          type: 'table',
          headers: ['Strategy', 'Focus', 'Example'],
          rows: [
            ['Cost Leadership', 'Lowest cost producer', 'Walmart, Southwest Airlines'],
            ['Differentiation', 'Unique product/service', 'Apple, Mercedes-Benz'],
            ['Focus (Niche)', 'Specific segment', 'Rolex, Ferrari'],
          ],
        },
        {
          title: '🧠 Memory Aid: Porter\'s Five Forces',
          type: 'callout',
          content: "**\"TRIBES\"**:\n\n**T**hreat of new entrants\n**R**ivalry among competitors\n**I**nfluence (bargaining power) of buyers\n**B**argaining power of suppliers\n**E**xistence of **S**ubstitutes\n\n*The 5 forces that shape industry competition!*",
        },
        {
          title: 'Auditing Strategy',
          type: 'text',
          content: "**Internal audit can assess:**\n\n• Alignment of strategy with mission/vision\n• Quality of strategic planning process\n• Risk identification in strategic initiatives\n• Validity of assumptions\n• Monitoring and KPI systems\n• Resource allocation for strategic priorities\n\n**Strategic risks:**\n• Failed strategy execution\n• Disruptive technologies\n• Competitive shifts\n• Regulatory changes",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Strategic planning: Mission → Analysis → Objectives → Strategy → Implementation",
            "SWOT: Strengths, Weaknesses, Opportunities, Threats",
            "Porter's Five Forces analyze competitive environment",
            "Generic strategies: Cost leadership, Differentiation, Focus",
            "IA can audit strategy process and strategic risk management",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA3-I-002',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Organizational Structure and Behavior',
    description: 'Understand organizational structures, culture, and human behavior concepts',
    order: 2,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Organizational structure', 'Culture', 'Leadership', 'Motivation'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Understanding how organizations work helps auditors navigate politics, assess culture, and understand why controls fail. Organizational behavior knowledge is tested directly on Part 3!",
        },
        {
          title: 'Organizational Structures',
          type: 'table',
          headers: ['Structure', 'Characteristics', 'Best For'],
          rows: [
            ['Functional', 'Grouped by function (HR, Finance, Ops)', 'Stable, efficient environments'],
            ['Divisional', 'Separate units by product, geography, customer', 'Diverse products/markets'],
            ['Matrix', 'Dual reporting (function + project)', 'Complex, project-based work'],
            ['Flat', 'Few management layers', 'Agile, innovative cultures'],
            ['Network', 'Outsourced functions, partnerships', 'Flexible, specialized needs'],
          ],
        },
        {
          title: 'Organizational Culture',
          type: 'text',
          content: "**Definition:**\nShared values, beliefs, and practices that guide behavior.\n\n**Elements:**\n• Visible artifacts (logos, office layout)\n• Espoused values (stated beliefs)\n• Underlying assumptions (unconscious beliefs)\n\n**Strong culture:**\n• Clear values widely shared\n• Consistent behavior\n• Can be positive or negative\n\n**Culture impacts:**\n• Control effectiveness\n• Risk appetite\n• Ethical behavior",
        },
        {
          title: 'Motivation Theories',
          type: 'text',
          content: "**Maslow's Hierarchy:**\n• Physiological → Safety → Social → Esteem → Self-actualization\n\n**Herzberg's Two-Factor:**\n• Hygiene factors (salary, conditions) - prevent dissatisfaction\n• Motivators (achievement, recognition) - create satisfaction\n\n**Expectancy Theory:**\n• Effort → Performance → Outcome\n• Motivation = Expectancy × Instrumentality × Valence",
        },
        {
          title: 'Leadership Styles',
          type: 'table',
          headers: ['Style', 'Approach', 'When Effective'],
          rows: [
            ['Autocratic', 'Leader makes decisions', 'Crisis, unskilled workforce'],
            ['Democratic', 'Team involvement in decisions', 'Skilled, motivated team'],
            ['Laissez-faire', 'Hands-off delegation', 'Highly skilled, self-directed'],
            ['Transformational', 'Inspire and motivate change', 'Organizational transformation'],
            ['Servant', 'Focus on serving team', 'Building trust and development'],
          ],
        },
        {
          title: '🧠 Memory Aid: Maslow\'s Hierarchy',
          type: 'callout',
          content: "**Bottom to Top:**\n\n**P**hysiological - Food, water, shelter\n**S**afety - Security, stability\n**S**ocial - Belonging, love\n**E**steem - Recognition, status\n**S**elf-actualization - Reaching potential\n\n*\"Please Stay Safe, Earn Success\"*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Structure types: Functional, Divisional, Matrix, Flat, Network",
            "Culture = shared values, beliefs, practices",
            "Motivation theories: Maslow, Herzberg, Expectancy",
            "Leadership styles vary by situation and team",
            "Culture significantly impacts control effectiveness",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA3-I-003',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Business Processes and Operations',
    description: 'Understand common business processes and operational management concepts',
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Business processes', 'Operations management', 'Quality management', 'Supply chain'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Auditors must understand the processes they audit! Operations knowledge helps you identify what can go wrong and where controls are needed. This is highly practical exam content.",
        },
        {
          title: 'Business Process Fundamentals',
          type: 'text',
          content: "**A business process is:**\nA set of activities that transforms inputs into outputs to achieve a goal.\n\n**Process elements:**\n• Inputs (materials, information)\n• Activities (steps performed)\n• Outputs (products, services)\n• Controls (checkpoints, approvals)\n\n**Process categories:**\n• Core/operational (value-creating)\n• Support (enabling)\n• Management (directing)",
        },
        {
          title: 'Key Business Cycles',
          type: 'table',
          headers: ['Cycle', 'Key Activities', 'Key Risks'],
          rows: [
            ['Revenue/Sales', 'Order → Ship → Bill → Collect', 'Fictitious sales, bad debts'],
            ['Procurement', 'Requisition → Order → Receive → Pay', 'Fraud, unauthorized purchases'],
            ['Payroll', 'Hire → Track time → Pay → Report', 'Ghost employees, time theft'],
            ['Inventory', 'Purchase → Store → Issue → Count', 'Theft, obsolescence'],
            ['Fixed Assets', 'Acquire → Track → Depreciate → Dispose', 'Misappropriation, incorrect records'],
          ],
        },
        {
          title: 'Quality Management',
          type: 'text',
          content: "**Total Quality Management (TQM):**\n• Customer focus\n• Continuous improvement\n• Employee involvement\n• Process-centered approach\n\n**Six Sigma:**\n• Data-driven quality improvement\n• DMAIC: Define, Measure, Analyze, Improve, Control\n• Goal: 3.4 defects per million opportunities\n\n**ISO 9000:**\n• International quality standards\n• Focus on QMS (Quality Management System)\n• Certification demonstrates conformance",
        },
        {
          title: 'Supply Chain Management',
          type: 'text',
          content: "**Supply chain encompasses:**\n• Suppliers → Manufacturing → Distribution → Customer\n\n**Key considerations:**\n• Supplier selection and monitoring\n• Inventory management\n• Logistics and transportation\n• Demand forecasting\n\n**Risks:**\n• Supply disruption\n• Quality issues\n• Lead time variability\n• Third-party dependency",
        },
        {
          title: '🧠 Memory Aid: DMAIC',
          type: 'callout',
          content: "**D**efine - What's the problem?\n**M**easure - How bad is it?\n**A**nalyze - Why is it happening?\n**I**mprove - What's the solution?\n**C**ontrol - How do we sustain it?\n\n*\"Don't Make Any Improvement Carelessly\"*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Processes transform inputs to outputs",
            "Key cycles: Revenue, Procurement, Payroll, Inventory, Fixed Assets",
            "TQM focuses on customer and continuous improvement",
            "Six Sigma: DMAIC for data-driven improvement",
            "Supply chain risks include disruption and third-party dependency",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA3-I-004',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Project Management',
    description: 'Understand project management principles and auditing project controls',
    order: 4,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Project management', 'Project lifecycle', 'Project risks', 'PMO'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Projects often fail - over budget, late, or not meeting objectives. Internal audit adds value by assessing project governance and controls. Project management knowledge helps you audit these critical initiatives!",
        },
        {
          title: 'Project Management Basics',
          type: 'text',
          content: "**A project is:**\nA temporary endeavor to create a unique product, service, or result.\n\n**Key characteristics:**\n• Defined beginning and end\n• Unique deliverables\n• Progressive elaboration\n• Constraints (scope, time, cost)\n\n**Triple Constraint:**\nScope ↔ Time ↔ Cost\n(Change one, affects others)",
        },
        {
          title: 'Project Lifecycle Phases',
          type: 'table',
          headers: ['Phase', 'Key Activities', 'Deliverables'],
          rows: [
            ['Initiation', 'Define project, feasibility', 'Project charter'],
            ['Planning', 'Scope, schedule, budget', 'Project plan, WBS'],
            ['Execution', 'Perform work, manage team', 'Deliverables'],
            ['Monitoring & Control', 'Track progress, manage changes', 'Status reports'],
            ['Closing', 'Finalize, lessons learned', 'Final report, sign-off'],
          ],
        },
        {
          title: 'Project Governance',
          type: 'text',
          content: "**Governance structure:**\n• Steering Committee (oversight)\n• Project Sponsor (executive accountability)\n• Project Manager (daily management)\n• Project Team (execution)\n\n**PMO (Project Management Office):**\n• Standardizes processes\n• Provides tools and training\n• Portfolio oversight\n• Resource management",
        },
        {
          title: 'Project Risks',
          type: 'text',
          content: "**Common project risks:**\n\n• **Scope creep** - Uncontrolled scope expansion\n• **Resource constraints** - Insufficient people/skills\n• **Schedule delays** - Missed deadlines\n• **Budget overruns** - Cost increases\n• **Technical risks** - Technology failures\n• **Stakeholder issues** - Lack of engagement\n\n**Risk responses:**\n• Avoid, Transfer, Mitigate, Accept",
        },
        {
          title: '🧠 Memory Aid: Triple Constraint',
          type: 'callout',
          content: "**\"STC Triangle\"**\n\n**S**cope - What will be delivered\n**T**ime - When it will be done\n**C**ost - What it will cost\n\n*Change one corner, the others are affected!*\n\n**Quality** sits in the middle - constrained by all three.",
        },
        {
          title: 'Auditing Projects',
          type: 'text',
          content: "**IA can assess:**\n\n• Project governance structure\n• Planning adequacy\n• Risk management\n• Change control process\n• Progress monitoring\n• Stakeholder management\n• Budget and resource controls\n• Post-implementation reviews",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Projects are temporary with unique deliverables",
            "Triple constraint: Scope, Time, Cost",
            "Phases: Initiation, Planning, Execution, Monitoring, Closing",
            "Common risks: Scope creep, resource/schedule/budget issues",
            "IA audits governance, controls, and risk management",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN II: INFORMATION SECURITY (25%)
  // ============================================================================

  {
    id: 'CIA3-II-001',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Information Security Fundamentals',
    description: 'Understand core information security concepts and the CIA triad',
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Information security', 'CIA triad', 'Security threats', 'Security controls'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Information security is critical in today's digital world. Internal auditors must understand security concepts to evaluate IT controls and assess cyber risks. This is 25% of Part 3!",
        },
        {
          title: 'The CIA Triad',
          type: 'text',
          content: "**Three pillars of information security:**\n\n**Confidentiality**\n• Protect information from unauthorized access\n• Controls: Encryption, access controls, classification\n\n**Integrity**\n• Ensure information is accurate and complete\n• Controls: Hashing, checksums, audit trails\n\n**Availability**\n• Ensure information is accessible when needed\n• Controls: Redundancy, backups, disaster recovery",
        },
        {
          title: 'Additional Security Principles',
          type: 'table',
          headers: ['Principle', 'Description'],
          rows: [
            ['Authentication', 'Verify identity of users/systems'],
            ['Authorization', 'Grant appropriate access levels'],
            ['Non-repudiation', 'Prevent denial of actions'],
            ['Accountability', 'Track user actions'],
          ],
        },
        {
          title: 'Common Threats',
          type: 'text',
          content: "**External threats:**\n• Hackers and cybercriminals\n• Malware (viruses, ransomware)\n• Phishing and social engineering\n• Denial of service attacks\n• Advanced persistent threats (APT)\n\n**Internal threats:**\n• Malicious insiders\n• Accidental disclosure\n• Policy violations\n• Privilege misuse\n\n**Environmental threats:**\n• Natural disasters\n• Power failures\n• Hardware failures",
        },
        {
          title: 'Security Control Categories',
          type: 'table',
          headers: ['Category', 'Purpose', 'Examples'],
          rows: [
            ['Preventive', 'Stop threats before they occur', 'Firewalls, access controls'],
            ['Detective', 'Identify threats that occurred', 'IDS, logging, monitoring'],
            ['Corrective', 'Fix issues after detection', 'Patches, incident response'],
            ['Deterrent', 'Discourage threat actors', 'Warning banners, policies'],
            ['Compensating', 'Alternative when primary fails', 'Manual review when automated fails'],
          ],
        },
        {
          title: '🧠 Memory Aid: CIA Triad',
          type: 'callout',
          content: "**C**onfidentiality - Only authorized see it\n**I**ntegrity - It's accurate and unchanged\n**A**vailability - It's there when needed\n\n*Not to be confused with Certified Internal Auditor!*\n\n**Memory:** \"CIA protects your data from spies (C), lies (I), and downtime (A)\"",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CIA Triad: Confidentiality, Integrity, Availability",
            "Additional principles: Authentication, Authorization, Non-repudiation",
            "Threats: External (hackers), Internal (insiders), Environmental",
            "Control types: Preventive, Detective, Corrective, Deterrent, Compensating",
            "Defense in depth = multiple layers of security",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA3-II-002',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Access Control and Identity Management',
    description: 'Understand access control models, authentication, and authorization',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Access control', 'Authentication', 'Authorization', 'Identity management'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Access control is the first line of defense! Understanding authentication methods and access models helps auditors evaluate whether the right people have the right access to the right resources.",
        },
        {
          title: 'Authentication Factors',
          type: 'text',
          content: "**Something you KNOW:**\n• Passwords, PINs, security questions\n\n**Something you HAVE:**\n• Smart cards, tokens, mobile devices\n\n**Something you ARE:**\n• Fingerprints, facial recognition, iris scan\n\n**Multi-factor authentication (MFA):**\nCombines two or more different factor types\n(Two passwords = NOT MFA, both are \"know\")",
        },
        {
          title: 'Access Control Models',
          type: 'table',
          headers: ['Model', 'Description', 'Use Case'],
          rows: [
            ['DAC (Discretionary)', 'Owner controls access to their resources', 'File sharing, general use'],
            ['MAC (Mandatory)', 'System enforces based on labels/clearance', 'Military, classified info'],
            ['RBAC (Role-Based)', 'Access based on job role', 'Enterprise environments'],
            ['ABAC (Attribute-Based)', 'Access based on multiple attributes', 'Complex, dynamic access'],
          ],
        },
        {
          title: 'Access Control Principles',
          type: 'text',
          content: "**Least Privilege:**\n• Only access needed to perform job\n• Minimize attack surface\n\n**Need to Know:**\n• Access only to information required\n• Even with clearance, need justification\n\n**Separation of Duties:**\n• No single person controls entire process\n• Requires collusion for fraud\n\n**Defense in Depth:**\n• Multiple layers of security\n• If one fails, others protect",
        },
        {
          title: 'Identity Management Lifecycle',
          type: 'text',
          content: "**Provisioning:**\n• Create accounts when hired\n• Assign appropriate access\n\n**Maintenance:**\n• Update access as roles change\n• Periodic access reviews\n\n**De-provisioning:**\n• Remove access promptly on termination\n• Disable rather than delete (audit trail)",
        },
        {
          title: '🧠 Memory Aid: Access Control Models',
          type: 'callout',
          content: "**DAC** - \"D\" for Discretionary, owner decides\n**MAC** - \"M\" for Military, labels/clearance\n**RBAC** - \"R\" for Role, job-based\n**ABAC** - \"A\" for Attributes, policy-based\n\n*\"Don't Make Rigid Access Barriers\" → DAC, MAC, RBAC, ABAC*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Authentication factors: Know, Have, Are",
            "MFA requires different factor types",
            "Access models: DAC, MAC, RBAC, ABAC",
            "Principles: Least privilege, Need to know, Separation of duties",
            "Lifecycle: Provision, Maintain, De-provision",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA3-II-003',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Network and Data Security',
    description: 'Understand network security controls and data protection measures',
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Network security', 'Encryption', 'Data protection', 'Security architecture'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Networks connect everything - and are prime targets for attack. Data protection including encryption is essential. Auditors must understand these controls to evaluate cyber risk!",
        },
        {
          title: 'Network Security Controls',
          type: 'table',
          headers: ['Control', 'Purpose', 'Placement'],
          rows: [
            ['Firewall', 'Filter traffic by rules', 'Network perimeter'],
            ['IDS/IPS', 'Detect/prevent intrusions', 'Network segments'],
            ['VPN', 'Encrypted tunnels', 'Remote access'],
            ['DMZ', 'Buffer zone for public services', 'Between internal/external'],
            ['NAC', 'Control device access', 'Network entry points'],
          ],
        },
        {
          title: 'Encryption Concepts',
          type: 'text',
          content: "**Symmetric encryption:**\n• Same key encrypts and decrypts\n• Fast, efficient\n• Key distribution challenge\n• Examples: AES, DES, 3DES\n\n**Asymmetric encryption:**\n• Public key encrypts, Private key decrypts\n• Slower but solves key distribution\n• Examples: RSA, ECC\n\n**Hashing:**\n• One-way function, cannot reverse\n• Verifies integrity\n• Examples: SHA-256, MD5",
        },
        {
          title: 'Data Protection',
          type: 'text',
          content: "**Data at Rest:**\n• Full disk encryption\n• Database encryption\n• File-level encryption\n\n**Data in Transit:**\n• TLS/SSL for web traffic\n• VPN for network traffic\n• Encrypted email\n\n**Data in Use:**\n• Secure enclaves\n• Memory encryption\n• Application-level protection",
        },
        {
          title: 'Data Classification',
          type: 'table',
          headers: ['Level', 'Description', 'Protection'],
          rows: [
            ['Public', 'No impact if disclosed', 'Minimal'],
            ['Internal', 'Not for public, low impact', 'Standard access controls'],
            ['Confidential', 'Significant impact if disclosed', 'Encryption, strict access'],
            ['Restricted/Secret', 'Severe impact if disclosed', 'Maximum protection'],
          ],
        },
        {
          title: '🧠 Memory Aid: Encryption Types',
          type: 'callout',
          content: "**Symmetric** - \"S\" for Same key (one key)\n**Asymmetric** - \"A\" for Actually two keys (public/private)\n**Hashing** - \"H\" for Hash (one-way, can't reverse)\n\n*Symmetric is faster, Asymmetric solves key sharing*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Network controls: Firewalls, IDS/IPS, VPN, DMZ",
            "Symmetric = one key, Asymmetric = two keys",
            "Protect data at rest, in transit, and in use",
            "Data classification drives protection level",
            "Encryption is essential for confidentiality",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN III: INFORMATION TECHNOLOGY (20%)
  // ============================================================================

  {
    id: 'CIA3-III-001',
    courseId: 'cia',
    section: 'CIA3',
    title: 'IT Governance and Operations',
    description: 'Understand IT governance frameworks and operational management',
    order: 8,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IT governance', 'COBIT', 'ITIL', 'IT operations'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT underpins every business process. Understanding IT governance frameworks and operations helps auditors evaluate whether IT supports organizational objectives and manages risks effectively.",
        },
        {
          title: 'IT Governance',
          type: 'text',
          content: "**Definition:**\nThe processes that ensure IT supports and enables achievement of enterprise objectives.\n\n**Key elements:**\n• Strategic alignment with business\n• Value delivery from IT investments\n• Risk management\n• Resource optimization\n• Performance measurement",
        },
        {
          title: 'IT Governance Frameworks',
          type: 'table',
          headers: ['Framework', 'Focus', 'Key Concept'],
          rows: [
            ['COBIT', 'IT governance and management', 'Governance vs Management objectives'],
            ['ITIL', 'IT service management', 'Service lifecycle'],
            ['ISO 27001', 'Information security management', 'ISMS certification'],
            ['NIST CSF', 'Cybersecurity framework', 'Identify, Protect, Detect, Respond, Recover'],
          ],
        },
        {
          title: 'COBIT Overview',
          type: 'text',
          content: "**COBIT (Control Objectives for Information Technology):**\n\n**Governance objectives:**\n• Evaluate, Direct, Monitor (EDM)\n\n**Management objectives:**\n• Align, Plan, Organize (APO)\n• Build, Acquire, Implement (BAI)\n• Deliver, Service, Support (DSS)\n• Monitor, Evaluate, Assess (MEA)\n\n**Design factors** customize implementation to the organization.",
        },
        {
          title: 'ITIL Service Management',
          type: 'text',
          content: "**ITIL (Information Technology Infrastructure Library):**\n\n**Service Value System practices:**\n• Service desk\n• Incident management\n• Problem management\n• Change enablement\n• Configuration management\n• Release management\n\n**Key concept:** IT delivers VALUE through SERVICES.",
        },
        {
          title: '🧠 Memory Aid: COBIT Domains',
          type: 'callout',
          content: "**Governance:** EDM - \"Executives Direct and Monitor\"\n\n**Management:**\n• **A**PO - Align, Plan, Organize\n• **B**AI - Build, Acquire, Implement\n• **D**SS - Deliver, Service, Support\n• **M**EA - Monitor, Evaluate, Assess\n\n*\"Always Build, Deliver, and Measure\" - ABDM*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT governance ensures IT supports business objectives",
            "COBIT: Governance (EDM) and Management (APO, BAI, DSS, MEA)",
            "ITIL focuses on IT service management",
            "Common practices: Incident, Problem, Change management",
            "Frameworks can be customized to organizational needs",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA3-III-002',
    courseId: 'cia',
    section: 'CIA3',
    title: 'IT General Controls',
    description: 'Understand IT general controls and their audit',
    order: 9,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['IT general controls', 'Change management', 'Logical access', 'Operations'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT general controls (ITGCs) are the foundation for reliable application controls. Weak ITGCs undermine ALL automated controls. Auditors must understand and test these controls!",
        },
        {
          title: 'ITGC Categories',
          type: 'table',
          headers: ['Category', 'Focus', 'Key Controls'],
          rows: [
            ['Logical Access', 'Who can access systems', 'User provisioning, password policies'],
            ['Change Management', 'How changes are made', 'Testing, approval, segregation'],
            ['Computer Operations', 'How systems run', 'Job scheduling, monitoring, backup'],
            ['Program Development', 'How systems are built', 'SDLC, testing, documentation'],
          ],
        },
        {
          title: 'Logical Access Controls',
          type: 'text',
          content: "**Key controls:**\n\n• User access provisioning and approval\n• Password complexity requirements\n• Periodic access reviews\n• Privileged access management\n• Terminated user removal\n• Segregation of duties\n\n**Common issues:**\n• Excessive access\n• Shared accounts\n• Orphan accounts\n• Privileged access abuse",
        },
        {
          title: 'Change Management Controls',
          type: 'text',
          content: "**Change control process:**\n\n1. Request and document change\n2. Impact and risk assessment\n3. Testing in non-production\n4. Approval before production\n5. Implementation with rollback plan\n6. Post-implementation review\n\n**Key principle:**\nDevelopers should NOT have access to production!\n(Separation of environments)",
        },
        {
          title: 'Computer Operations Controls',
          type: 'text',
          content: "**Operational controls:**\n\n• Job scheduling and monitoring\n• Console logs and alerts\n• Backup and recovery\n• Problem/incident management\n• Capacity planning\n• Environmental controls (power, HVAC)\n\n**Backup types:**\n• Full - Everything\n• Incremental - Changed since last backup\n• Differential - Changed since last full",
        },
        {
          title: '🧠 Memory Aid: ITGC Categories',
          type: 'callout',
          content: "**\"L-C-C-P\"**\n\n**L**ogical Access - WHO accesses\n**C**hange Management - HOW changes happen\n**C**omputer Operations - HOW systems run\n**P**rogram Development - HOW systems are built\n\n*\"Learn Controls, Control Problems\"*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ITGCs: Logical Access, Change Management, Operations, Development",
            "Weak ITGCs undermine all automated controls",
            "Separation: Developers should not access production",
            "Access reviews should be periodic and documented",
            "Change requires testing and approval before production",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN IV: FINANCIAL MANAGEMENT (20%)
  // ============================================================================

  {
    id: 'CIA3-IV-001',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Financial Accounting Concepts',
    description: 'Understand financial statements, accounting principles, and key ratios',
    order: 10,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Financial statements', 'GAAP', 'Accrual accounting', 'Financial ratios'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Internal auditors must understand financial statements to evaluate controls over financial reporting. Financial analysis skills help identify unusual patterns and assess organizational health!",
        },
        {
          title: 'Primary Financial Statements',
          type: 'table',
          headers: ['Statement', 'Purpose', 'Key Elements'],
          rows: [
            ['Balance Sheet', 'Financial position at a point in time', 'Assets = Liabilities + Equity'],
            ['Income Statement', 'Performance over a period', 'Revenue - Expenses = Net Income'],
            ['Cash Flow Statement', 'Cash movements over a period', 'Operating, Investing, Financing'],
            ['Statement of Equity', 'Changes in ownership interest', 'Beginning + NI - Dividends ± Other'],
          ],
        },
        {
          title: 'Fundamental Accounting Principles',
          type: 'text',
          content: "**Accrual Basis:**\n• Recognize revenue when earned\n• Recognize expenses when incurred\n• Not when cash changes hands\n\n**Key Principles:**\n• **Going concern** - Assume continued operations\n• **Matching** - Match expenses to related revenue\n• **Conservatism** - When uncertain, be cautious\n• **Materiality** - Focus on significant items\n• **Consistency** - Same methods over time",
        },
        {
          title: 'Financial Ratios',
          type: 'table',
          headers: ['Category', 'Ratio', 'Formula'],
          rows: [
            ['Liquidity', 'Current Ratio', 'Current Assets / Current Liabilities'],
            ['Liquidity', 'Quick Ratio', '(CA - Inventory) / CL'],
            ['Profitability', 'Gross Margin', '(Sales - COGS) / Sales'],
            ['Profitability', 'Net Profit Margin', 'Net Income / Sales'],
            ['Leverage', 'Debt-to-Equity', 'Total Debt / Total Equity'],
            ['Activity', 'Inventory Turnover', 'COGS / Average Inventory'],
          ],
        },
        {
          title: 'Understanding the Cash Flow Statement',
          type: 'text',
          content: "**Operating Activities:**\n• Day-to-day business operations\n• Net income adjusted for non-cash items\n• Changes in working capital\n\n**Investing Activities:**\n• Purchase/sale of long-term assets\n• Investment acquisitions/disposals\n\n**Financing Activities:**\n• Borrowing/repaying debt\n• Issuing/repurchasing stock\n• Dividend payments",
        },
        {
          title: '🧠 Memory Aid: Accounting Equation',
          type: 'callout',
          content: "**A = L + E**\n\n**A**ssets = **L**iabilities + **E**quity\n\n*What we HAVE = What we OWE + What we OWN*\n\nThis ALWAYS balances - that's why it's called a Balance Sheet!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four financial statements: Balance Sheet, Income Statement, Cash Flow, Equity",
            "Accrual basis: Recognize when earned/incurred, not when cash moves",
            "A = L + E (Assets = Liabilities + Equity)",
            "Key ratios: Liquidity, Profitability, Leverage, Activity",
            "Cash flow has three sections: Operating, Investing, Financing",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA3-IV-002',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Managerial Accounting',
    description: 'Understand cost accounting, budgeting, and performance measurement',
    order: 11,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Cost accounting', 'Budgeting', 'Variance analysis', 'Performance measurement'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Managerial accounting provides information for internal decision-making. Understanding cost behavior, budgets, and variances helps auditors evaluate operational performance and financial controls!",
        },
        {
          title: 'Cost Classifications',
          type: 'table',
          headers: ['Classification', 'Types', 'Examples'],
          rows: [
            ['By Behavior', 'Fixed, Variable, Mixed', 'Rent (F), Materials (V), Utilities (M)'],
            ['By Function', 'Product, Period', 'Manufacturing (Product), Admin (Period)'],
            ['By Traceability', 'Direct, Indirect', 'Direct labor, Overhead'],
            ['For Decisions', 'Relevant, Sunk', 'Future costs (R), Past costs (S)'],
          ],
        },
        {
          title: 'Cost-Volume-Profit Analysis',
          type: 'text',
          content: "**Contribution Margin:**\nSales - Variable Costs = CM\n\n**Break-Even Point:**\nFixed Costs / CM per unit = Break-even units\nFixed Costs / CM ratio = Break-even sales $\n\n**Target Profit:**\n(Fixed Costs + Target Profit) / CM per unit = Required units",
        },
        {
          title: 'Budgeting Process',
          type: 'text',
          content: "**Master budget components:**\n\n**Operating budgets:**\n• Sales budget (starting point)\n• Production budget\n• Direct materials, labor, overhead\n• Operating expense\n\n**Financial budgets:**\n• Cash budget\n• Budgeted balance sheet\n• Budgeted income statement\n\n**Budget types:**\n• Static - Fixed targets\n• Flexible - Adjusts for volume\n• Zero-based - Start from zero each period",
        },
        {
          title: 'Variance Analysis',
          type: 'table',
          headers: ['Variance', 'Formula', 'Favorable When'],
          rows: [
            ['Price/Rate', '(Actual - Standard) × Actual Qty', 'Actual < Standard'],
            ['Quantity/Efficiency', '(Actual - Standard) × Standard Price', 'Actual < Standard'],
            ['Volume', 'Budgeted - Applied', 'Actual > Budget'],
          ],
        },
        {
          title: '🧠 Memory Aid: Break-Even',
          type: 'callout',
          content: "**Break-Even = Fixed Costs ÷ CM**\n\n*Think: How much contribution margin do I need to COVER my fixed costs?*\n\n**CM = Sales - Variable Costs**\n*What's left after variable costs to cover fixed and profit*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Costs: Fixed, Variable, Mixed; Direct, Indirect; Relevant, Sunk",
            "Break-even: Fixed Costs / Contribution Margin",
            "Master budget starts with sales forecast",
            "Flexible budgets adjust for actual volume",
            "Variances: Price/Rate and Quantity/Efficiency",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCIA3Lessons = () => cia3Lessons;
export const getCIA3LessonById = (id: string) => cia3Lessons.find(lesson => lesson.id === id);
export const getCIA3LessonCount = () => cia3Lessons.length;

export default cia3Lessons;
