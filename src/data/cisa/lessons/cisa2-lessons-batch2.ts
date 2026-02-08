/**
 * CISA Domain 2: Governance and Management of IT - Batch 2
 * Coverage: IT strategy, policies, organizational structure, and enterprise architecture
 */

import { Lesson } from '../../../types';

export const cisa2LessonsBatch2: Lesson[] = [
  // ===========================================================================
  // IT GOVERNANCE FRAMEWORKS
  // ===========================================================================
  
  {
    id: 'CISA2-010',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Governance Fundamentals',
    description: 'Understand IT governance principles, structures, and the board\'s role in IT oversight',
    order: 10,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['IT Governance', 'COBIT', 'Board Oversight', 'Governance Structures'],
    blueprintArea: 'CISA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT governance ensures IT investments support business objectives and risks are managed appropriately. This is a foundational CISA topic closely linked to COBIT.",
        },
        {
          title: 'What is IT Governance?',
          type: 'text',
          content: "**Definition:**\nIT Governance is the system by which an organization's IT is directed and controlled.\n\n**Key Objectives:**\n\n**Strategic Alignment:**\n• IT strategy aligned with business strategy\n• IT investments support business goals\n• IT capabilities enable business needs\n\n**Value Delivery:**\n• IT delivers promised benefits\n• Costs are optimized\n• Value is measured\n\n**Risk Management:**\n• IT risks are understood and managed\n• Risk appetite is defined\n• Controls are appropriate\n\n**Resource Management:**\n• IT resources used efficiently\n• Skills and capabilities developed\n• Sourcing decisions optimized\n\n**Performance Measurement:**\n• IT performance monitored\n• Metrics linked to strategy\n• Improvements identified",
        },
        {
          title: '🧠 Memory Aid: SAVR-P',
          type: 'callout',
          content: "**IT Governance Objectives: SAVR-P**\n\n• **S**trategic alignment\n• **A**ccountability (part of governance structures)\n• **V**alue delivery\n• **R**isk management\n• **P**erformance measurement\n\n(Some include Resource Management - SAVRP-R)",
        },
        {
          title: 'Governance vs. Management',
          type: 'table',
          headers: ['Aspect', 'Governance', 'Management'],
          rows: [
            ['Who', 'Board/executives', 'IT leadership/managers'],
            ['Focus', 'Evaluate, direct, monitor', 'Plan, build, run, monitor'],
            ['Scope', 'What and why', 'How'],
            ['Responsibility', 'Setting direction', 'Executing direction'],
            ['Accountability', 'To stakeholders', 'To governing body'],
            ['COBIT Areas', 'EDM (Evaluate, Direct, Monitor)', 'APO, BAI, DSS, MEA'],
          ],
        },
        {
          title: 'IT Governance Structures',
          type: 'text',
          content: "**Board Level:**\n• IT/Technology Committee of the Board\n• Overall oversight responsibility\n• Major investment decisions\n• Risk appetite setting\n\n**Executive Level:**\n• IT Steering Committee\n• CIO and business executives\n• Investment prioritization\n• Policy approval\n\n**Management Level:**\n• IT Management Team\n• Architecture Review Board\n• Change Advisory Board\n• Security Committee\n\n**Key Roles:**\n\n**CIO (Chief Information Officer):**\n• IT strategy and operations\n• Reports to CEO or Board\n\n**CISO (Chief Information Security Officer):**\n• Security program\n• May report to CIO, CEO, or Board\n\n**CTO (Chief Technology Officer):**\n• Technology direction\n• Innovation and R&D",
        },
        {
          title: 'IT Steering Committee',
          type: 'text',
          content: "**Purpose:**\nGuide IT investments and ensure alignment with business.\n\n**Typical Composition:**\n• CIO (often chairs)\n• Business unit leaders\n• CFO or finance representative\n• Major IT consumers\n\n**Responsibilities:**\n• Approve IT strategy\n• Prioritize projects and initiatives\n• Allocate IT resources\n• Review IT performance\n• Resolve cross-functional issues\n\n**Meeting Frequency:**\nTypically monthly or quarterly\n\n**Audit Considerations:**\n• Does the committee exist and meet regularly?\n• Are decisions documented?\n• Is business represented appropriately?\n• Are metrics reviewed?\n• Is the committee effective?",
        },
        {
          title: 'COBIT 2019 Governance Objectives',
          type: 'text',
          content: "**EDM Domain (Governance):**\n\n**EDM01: Ensure Governance Framework Setting and Maintenance**\n• Define and maintain governance framework\n• Consistent with organizational needs\n\n**EDM02: Ensure Benefits Delivery**\n• Optimal value from IT investments\n• Business cases and benefits tracking\n\n**EDM03: Ensure Risk Optimization**\n• IT risk within appetite\n• Integrated with enterprise risk\n\n**EDM04: Ensure Resource Optimization**\n• IT resources adequate and used well\n• Capabilities developed\n\n**EDM05: Ensure Stakeholder Engagement**\n• Stakeholder expectations met\n• Communication effective",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT governance ensures IT supports business objectives and manages risk",
            "Key objectives: Strategic alignment, Value delivery, Risk management, Resource optimization, Performance measurement",
            "Governance sets direction (evaluate, direct, monitor); Management executes (plan, build, run)",
            "Structures include Board committees, IT steering committee, and management teams",
            "COBIT EDM domain addresses governance; APO/BAI/DSS/MEA address management",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-011',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Strategy and Planning',
    description: 'Learn how IT strategy is developed and aligned with business objectives',
    order: 11,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IT Strategy', 'Strategic Planning', 'Business Alignment', 'IT Roadmap'],
    blueprintArea: 'CISA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT strategy translates business objectives into technology direction. Auditors must understand how strategy is developed to evaluate alignment and effectiveness.",
        },
        {
          title: 'IT Strategic Planning Process',
          type: 'text',
          content: "**Step 1: Understand Business Strategy**\n• Review business mission and vision\n• Understand strategic objectives\n• Identify business drivers\n• Know competitive landscape\n\n**Step 2: Assess Current State**\n• Inventory existing IT capabilities\n• Evaluate technology health\n• Identify strengths and gaps\n• Benchmark against industry\n\n**Step 3: Define Future State**\n• Determine required IT capabilities\n• Align with business direction\n• Consider emerging technologies\n• Define target architecture\n\n**Step 4: Gap Analysis**\n• Compare current to future state\n• Identify capability gaps\n• Prioritize improvements\n\n**Step 5: Develop Roadmap**\n• Plan initiatives over 3-5 years\n• Estimate resources and costs\n• Define milestones\n• Obtain approval",
        },
        {
          title: 'IT Strategy Components',
          type: 'table',
          headers: ['Component', 'Description', 'Content'],
          rows: [
            ['Vision', 'Future state aspiration', 'What IT will become'],
            ['Mission', 'Purpose of IT function', 'Why IT exists'],
            ['Objectives', 'Specific outcomes', 'Measurable goals'],
            ['Initiatives', 'Projects to achieve objectives', 'Programs and projects'],
            ['Metrics', 'How success is measured', 'KPIs and targets'],
            ['Roadmap', 'Timeline for execution', 'Phased plan'],
          ],
        },
        {
          title: 'Alignment Mechanisms',
          type: 'text',
          content: "**Formal Alignment:**\n• IT strategy derived from business strategy\n• IT participates in business planning\n• Common language and metrics\n• Joint governance structures\n\n**Continuous Alignment:**\n• Regular strategy reviews\n• Business participation in IT steering\n• Project portfolio tied to business initiatives\n• Benefits realization tracking\n\n**Warning Signs of Misalignment:**\n• IT initiatives not tied to business goals\n• Business \"shadow IT\" proliferating\n• Frequent project cancellations\n• Low IT satisfaction from business\n• IT seen as cost center, not enabler",
        },
        {
          title: '🧠 Memory Aid: SWOT for IT',
          type: 'callout',
          content: "**SWOT Analysis in IT Planning:**\n\n• **S**trengths: What IT does well\n• **W**eaknesses: Where IT falls short\n• **O**pportunities: External factors to leverage\n• **T**hreats: External factors that pose risk\n\nSWOT helps bridge current state to future state planning.",
        },
        {
          title: 'Technology Roadmap',
          type: 'text',
          content: "**Roadmap Elements:**\n• Time horizons (1-3-5 years)\n• Technology investments\n• Application changes\n• Infrastructure evolution\n• Dependencies and sequencing\n• Resource requirements\n\n**Roadmap Considerations:**\n\n**Retire:**\n• Phase out legacy systems\n• End-of-life planning\n• Migration paths\n\n**Maintain:**\n• Keep current\n• Security patching\n• Limited enhancements\n\n**Invest:**\n• Strategic platforms\n• New capabilities\n• Digital transformation\n\n**Emerging:**\n• Monitor new technologies\n• Proof of concepts\n• Innovation agenda",
        },
        {
          title: 'Auditing IT Strategy',
          type: 'text',
          content: "**Audit Considerations:**\n\n**Strategy Development:**\n• Is there a documented IT strategy?\n• Is it aligned with business strategy?\n• Was business involved in development?\n• Is it approved by appropriate levels?\n\n**Content:**\n• Are objectives specific and measurable?\n• Is there a prioritized roadmap?\n• Are resources estimated?\n• Are risks considered?\n\n**Execution:**\n• Is the strategy being executed?\n• Are initiatives on track?\n• Is progress reported to governance?\n• Is the strategy reviewed and updated?\n\n**Outcomes:**\n• Are benefits being realized?\n• Are metrics tracked?\n• Is the strategy achieving alignment?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT strategy translates business direction into technology plans",
            "Planning process: Understand business → Assess current → Define future → Gap analysis → Roadmap",
            "Strategy includes vision, mission, objectives, initiatives, metrics, and roadmap",
            "Alignment requires ongoing mechanisms, not just initial planning",
            "Auditors evaluate strategy existence, alignment, execution, and outcomes",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-012',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Policies, Standards, and Procedures',
    description: 'Understand the policy hierarchy and how to audit IT policy frameworks',
    order: 12,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['IT Policy', 'Standards', 'Procedures', 'Guidelines', 'Compliance'],
    blueprintArea: 'CISA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Policies establish the rules; standards, procedures, and guidelines implement them. A solid policy framework is essential for consistent and compliant IT practices.",
        },
        {
          title: 'Policy Hierarchy',
          type: 'table',
          headers: ['Level', 'Purpose', 'Audience', 'Flexibility'],
          rows: [
            ['Policy', 'High-level mandatory statements', 'All personnel', 'Fixed (requires formal change)'],
            ['Standard', 'Specific mandatory requirements', 'IT and relevant staff', 'Less flexible'],
            ['Procedure', 'Step-by-step how-to', 'Personnel performing tasks', 'Moderate flexibility'],
            ['Guideline', 'Recommended approaches', 'All relevant personnel', 'Most flexible'],
            ['Baseline', 'Minimum configuration settings', 'System administrators', 'Fixed minimum'],
          ],
        },
        {
          title: 'Policy vs. Standard vs. Procedure',
          type: 'text',
          content: "**Example: Password Security**\n\n**Policy (What):**\n\"All systems must implement strong authentication to protect against unauthorized access.\"\n\n**Standard (Specification):**\n\"Passwords must be minimum 12 characters, contain uppercase, lowercase, numbers, and symbols, and expire every 90 days.\"\n\n**Procedure (How):**\n\"To reset your password: 1) Navigate to password.company.com 2) Enter your username 3) Click 'Reset Password' 4) Follow email link...\"\n\n**Guideline (Suggestion):**\n\"Consider using a passphrase composed of unrelated words for easier memorization. Example technique: Combine 4+ random words.\"\n\n**Baseline (Configuration):**\n\"Windows GPO: Minimum password length = 12, Complexity = Enabled, Maximum age = 90 days\"",
        },
        {
          title: '🧠 Memory Aid: Policy Hierarchy',
          type: 'callout',
          content: "**From Top to Bottom: P-S-P-G-B**\n\n• **P**olicy = \"What\" (high-level rules)\n• **S**tandard = \"Specifically What\" (detailed requirements)\n• **P**rocedure = \"How\" (step-by-step)\n• **G**uideline = \"Suggested How\" (recommendations)\n• **B**aseline = \"Minimum Settings\" (configurations)\n\nThink: Policies Set Procedures, Guidelines, and Baselines",
        },
        {
          title: 'Common IT Policies',
          type: 'text',
          content: "**Security Policies:**\n• Information Security Policy\n• Acceptable Use Policy\n• Access Control Policy\n• Password Policy\n• Remote Access Policy\n• Incident Response Policy\n• Data Classification Policy\n\n**Operational Policies:**\n• Change Management Policy\n• Backup and Recovery Policy\n• Asset Management Policy\n• Capacity Management Policy\n\n**Governance Policies:**\n• IT Governance Policy\n• Third-Party Management Policy\n• Business Continuity Policy\n• Privacy Policy",
        },
        {
          title: 'Policy Lifecycle',
          type: 'text',
          content: "**1. Development:**\n• Identify need (risk, regulation, incident)\n• Draft policy content\n• Involve stakeholders\n• Legal/HR review\n\n**2. Approval:**\n• Route through governance\n• Obtain appropriate authority signature\n• Document approval\n\n**3. Communication:**\n• Publish to policy repository\n• Announce to organization\n• Include in training\n\n**4. Implementation:**\n• Develop supporting standards/procedures\n• Configure technical controls\n• Train personnel\n\n**5. Enforcement:**\n• Monitor compliance\n• Address violations\n• Report exceptions\n\n**6. Review:**\n• Annual review at minimum\n• Update for changes\n• Re-approve as needed",
        },
        {
          title: 'Auditing Policies',
          type: 'text',
          content: "**Audit Questions:**\n\n**Existence:**\n• Are required policies in place?\n• Do they cover key areas?\n\n**Quality:**\n• Are policies clear and specific enough?\n• Are they consistent with each other?\n• Do they align with regulations?\n\n**Governance:**\n• Are policies approved by appropriate authority?\n• Is there a review schedule?\n• Is there an owner for each policy?\n\n**Awareness:**\n• Are employees aware of policies?\n• Have they acknowledged them?\n• Is training provided?\n\n**Compliance:**\n• Are policies being followed?\n• Are violations addressed?\n• Are exceptions documented?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Policy hierarchy: Policy → Standard → Procedure → Guideline → Baseline",
            "Policies are mandatory high-level statements; guidelines are flexible recommendations",
            "Policies require formal approval and periodic review (at least annually)",
            "Employees must be made aware of policies through training and acknowledgment",
            "Auditors evaluate policy existence, quality, governance, awareness, and compliance",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-013',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'Enterprise Architecture',
    description: 'Learn enterprise architecture frameworks and their role in IT governance',
    order: 13,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Enterprise Architecture', 'TOGAF', 'Architecture Domains', 'EA Governance'],
    blueprintArea: 'CISA2-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Enterprise architecture provides a blueprint for technology investments. Understanding EA helps auditors evaluate whether IT evolves in a controlled, strategic manner.",
        },
        {
          title: 'What is Enterprise Architecture?',
          type: 'text',
          content: "**Definition:**\nA structured framework that describes the structure of an enterprise including its:\n• Business processes\n• Information flows\n• Applications\n• Technology infrastructure\n\n**Purpose:**\n• Align IT with business\n• Reduce complexity and redundancy\n• Enable agility\n• Guide investment decisions\n• Manage change\n\n**Key Concepts:**\n• Current state (as-is) architecture\n• Target state (to-be) architecture\n• Transition roadmap\n• Standards and principles\n• Governance processes",
        },
        {
          title: 'Architecture Domains',
          type: 'table',
          headers: ['Domain', 'Focus', 'Components'],
          rows: [
            ['Business Architecture', 'Business strategy and organization', 'Processes, capabilities, org structure'],
            ['Data/Information Architecture', 'Information assets and flows', 'Data models, data governance, integration'],
            ['Application Architecture', 'Software and applications', 'Application portfolio, interfaces, dependencies'],
            ['Technology Architecture', 'Infrastructure and platforms', 'Networks, servers, cloud, platforms'],
          ],
        },
        {
          title: 'TOGAF Framework',
          type: 'text',
          content: "**TOGAF = The Open Group Architecture Framework**\n\nMost widely used EA framework.\n\n**Architecture Development Method (ADM):**\n\n**Preliminary Phase:**\n• Prepare and initiate activities\n• Define architecture principles\n\n**Phase A: Architecture Vision**\n• Develop vision and value proposition\n\n**Phase B: Business Architecture**\n• Develop business architecture\n\n**Phase C: Information Systems Architecture**\n• Data and Application architectures\n\n**Phase D: Technology Architecture**\n• Develop technology architecture\n\n**Phase E: Opportunities and Solutions**\n• Identify implementation projects\n\n**Phase F: Migration Planning**\n• Transition roadmap\n\n**Phase G: Implementation Governance**\n• Oversee implementation\n\n**Phase H: Architecture Change Management**\n• Manage changes to architecture",
        },
        {
          title: '🧠 Memory Aid: TOGAF Phases',
          type: 'callout',
          content: "**TOGAF ADM: A through H**\n\nThink \"ABCD\" first for architecture domains:\n• A = Vision\n• B = Business\n• C = Information Systems (Data + Apps)\n• D = Technology\n\nThen \"EFGH\" for implementation:\n• E = Evaluate opportunities\n• F = plan route Forward (migration)\n• G = Govern implementation\n• H = Handle changes",
        },
        {
          title: 'EA Governance',
          type: 'text',
          content: "**Architecture Review Board (ARB):**\n\n**Purpose:**\n• Review architectural proposals\n• Ensure compliance with standards\n• Grant exceptions when justified\n• Manage architecture evolution\n\n**Composition:**\n• Chief Architect (chair)\n• Domain architects\n• Security representative\n• Business representatives\n\n**Inputs to ARB:**\n• Project proposals\n• Architecture exception requests\n• Technology introduction requests\n• Standards updates\n\n**Outputs:**\n• Approval/rejection\n• Architectural guidance\n• Exception documentation\n• Standards updates",
        },
        {
          title: 'Auditing Enterprise Architecture',
          type: 'text',
          content: "**Audit Areas:**\n\n**EA Program:**\n• Is there an EA function?\n• Is it adequately resourced?\n• Is leadership commitment evident?\n\n**Architecture Content:**\n• Is current state documented?\n• Is target state defined?\n• Are roadmaps in place?\n• Are standards defined?\n\n**Governance:**\n• Is there an Architecture Review Board?\n• Are projects reviewed for compliance?\n• Are exceptions documented?\n\n**Effectiveness:**\n• Is architecture followed in projects?\n• Is technical debt managed?\n• Is architecture updated for changes?\n• Is there value from EA investments?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "EA provides a blueprint spanning Business, Data, Application, and Technology domains",
            "EA bridges current state to target state through roadmaps",
            "TOGAF is the most widely used EA framework with an 8-phase ADM",
            "Architecture Review Board governs architectural decisions and exceptions",
            "Auditors evaluate EA program existence, content, governance, and effectiveness",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-014',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Human Resource Management',
    description: 'Understand IT staffing, skills management, and personnel security',
    order: 14,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['IT Staffing', 'Skills', 'Succession Planning', 'Personnel Security'],
    blueprintArea: 'CISA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "People are IT's most important asset—and potentially its greatest risk. Proper HR management ensures the right skills are available and security risks are managed.",
        },
        {
          title: 'IT HR Management Areas',
          type: 'text',
          content: "**Workforce Planning:**\n• Skills inventory\n• Demand forecasting\n• Capacity planning\n• Vendor/contractor strategy\n\n**Recruitment:**\n• Job descriptions\n• Skills requirements\n• Hiring process\n• Background checks\n\n**Development:**\n• Training programs\n• Certification support\n• Career paths\n• Performance management\n\n**Retention:**\n• Compensation\n• Work environment\n• Career growth\n• Recognition\n\n**Separation:**\n• Offboarding process\n• Access revocation\n• Knowledge transfer\n• Exit interviews",
        },
        {
          title: 'Segregation of Duties (SoD)',
          type: 'table',
          headers: ['Function', 'Should Be Separate From', 'Reason'],
          rows: [
            ['Development', 'Production operations', 'Prevent unauthorized changes'],
            ['Security admin', 'System admin', 'Prevent security bypass'],
            ['Data entry', 'Data approval', 'Prevent fraud'],
            ['Change requestor', 'Change approver', 'Ensure review'],
            ['DBA', 'Application development', 'Protect data integrity'],
          ],
        },
        {
          title: 'Personnel Security Controls',
          type: 'text',
          content: "**Pre-Employment:**\n• Background checks (criminal, credit, employment)\n• Reference verification\n• Education verification\n• Drug screening (where permitted)\n• Non-disclosure agreements\n\n**During Employment:**\n• Security awareness training\n• Policy acknowledgment\n• Acceptable use agreements\n• Access reviews\n• Monitoring (with disclosure)\n\n**Termination:**\n• Immediate access revocation\n• Return of equipment\n• Exit interview\n• Remind of ongoing obligations\n• Badge and key collection",
        },
        {
          title: '🧠 Memory Aid: Hiring Security',
          type: 'callout',
          content: "**Before They Start: BRAND**\n\n• **B**ackground check\n• **R**eference check\n• **A**greements signed (NDA, AUP)\n• **N**eed-to-know access only\n• **D**ocument everything\n\nRemember: BRAND new employees need BRAND security controls!",
        },
        {
          title: 'Critical Role Coverage',
          type: 'text',
          content: "**Key Person Dependencies:**\n\nRisk: Over-reliance on individuals who hold critical knowledge.\n\n**Mitigation Strategies:**\n\n**Cross-Training:**\n• Multiple people can perform each role\n• Reduces single point of failure\n• Documented procedures help\n\n**Succession Planning:**\n• Identify successors for key roles\n• Develop successors proactively\n• Document institutional knowledge\n\n**Mandatory Vacations:**\n• Forces cross-training\n• Can detect fraud (absent employee)\n• Required in some industries (banking)\n\n**Job Rotation:**\n• Rotates responsibilities periodically\n• Develops breadth of skills\n• Reduces collusion opportunities",
        },
        {
          title: 'Auditing IT HR',
          type: 'text',
          content: "**Audit Areas:**\n\n**Hiring:**\n• Are background checks performed?\n• Are they appropriate for role sensitivity?\n• Are NDAs and agreements in place?\n\n**Access:**\n• Is access provisioned based on role?\n• Is segregation of duties enforced?\n• Are access reviews performed?\n\n**Training:**\n• Is security awareness training provided?\n• Are role-specific skills developed?\n• Are certifications maintained?\n\n**Separation:**\n• Is access revoked timely upon termination?\n• Is equipment returned?\n• Is the process documented?\n\n**Coverage:**\n• Are critical roles identified?\n• Is cross-training in place?\n• Is succession planning done?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT HR covers planning, recruitment, development, retention, and separation",
            "Segregation of duties prevents fraud and errors by separating conflicting functions",
            "Personnel security includes pre-employment checks, ongoing controls, and proper termination",
            "Critical role risks are mitigated through cross-training, succession planning, and job rotation",
            "Mandatory vacations can both force cross-training and help detect fraud",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA2-015',
    courseId: 'cisa',
    section: 'CISA2',
    title: 'IT Investment and Portfolio Management',
    description: 'Learn how organizations evaluate, prioritize, and manage IT investments',
    order: 15,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IT Investment', 'Portfolio Management', 'Business Case', 'Benefits Realization'],
    blueprintArea: 'CISA2-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT investments consume significant resources. Effective portfolio management ensures investments deliver value and align with strategy.",
        },
        {
          title: 'IT Portfolio Management',
          type: 'text',
          content: "**What is IT Portfolio Management?**\nManaging IT investments as a portfolio to optimize value and manage risk.\n\n**Portfolio Types:**\n\n**Application Portfolio:**\n• Inventory of all applications\n• Health and risk assessment\n• Rationalization decisions\n\n**Project Portfolio:**\n• Active and proposed projects\n• Prioritization and selection\n• Resource allocation\n\n**Asset Portfolio:**\n• Hardware and infrastructure\n• Lifecycle management\n• Replacement planning\n\n**Benefits:**\n• Strategic alignment\n• Optimized resource use\n• Risk visibility\n• Consistent prioritization\n• Better governance",
        },
        {
          title: 'Investment Evaluation Methods',
          type: 'table',
          headers: ['Method', 'Description', 'Pros', 'Cons'],
          rows: [
            ['ROI', 'Return on Investment: (Benefits - Costs) / Costs', 'Simple, comparable', 'Ignores time value of money'],
            ['NPV', 'Net Present Value: Discounted cash flows', 'Considers time value', 'Requires accurate forecasts'],
            ['IRR', 'Internal Rate of Return: Discount rate where NPV=0', 'Comparable percentage', 'Complex, can mislead'],
            ['Payback Period', 'Time to recover investment', 'Simple to understand', 'Ignores long-term value'],
            ['TCO', 'Total Cost of Ownership: Full lifecycle costs', 'Complete cost picture', 'Labor-intensive'],
          ],
        },
        {
          title: 'Business Case Development',
          type: 'text',
          content: "**Business Case Components:**\n\n**Executive Summary:**\n• Investment overview\n• Key benefits and costs\n• Recommendation\n\n**Business Need:**\n• Problem or opportunity\n• Strategic alignment\n• Consequences of inaction\n\n**Options Analysis:**\n• Alternatives considered\n• Evaluation criteria\n• Recommended option rationale\n\n**Financial Analysis:**\n• Costs (capital, operating)\n• Benefits (quantified where possible)\n• NPV, ROI, payback\n• Sensitivity analysis\n\n**Risk Assessment:**\n• Key risks\n• Mitigation strategies\n• Contingency plans\n\n**Implementation Plan:**\n• Timeline and milestones\n• Resources required\n• Dependencies",
        },
        {
          title: '🧠 Memory Aid: Business Case',
          type: 'callout',
          content: "**Business Case: E-BOFRI**\n\n• **E**xecutive Summary - The elevator pitch\n• **B**usiness Need - Why are we doing this?\n• **O**ptions - What could we do?\n• **F**inancial - What does it cost and return?\n• **R**isk - What could go wrong?\n• **I**mplementation - How will we do it?",
        },
        {
          title: 'Benefits Realization',
          type: 'text',
          content: "**Benefits Realization Management:**\n\nEnsures promised investment benefits are actually achieved.\n\n**Process:**\n\n**1. Define Benefits:**\n• Identify expected benefits\n• Quantify where possible\n• Define measurement approach\n\n**2. Assign Ownership:**\n• Benefits have business owners\n• Not just IT responsibility\n• Accountable for realization\n\n**3. Track Benefits:**\n• Measure during and after project\n• Compare to business case\n• Report to governance\n\n**4. Realize and Sustain:**\n• Take actions to realize benefits\n• Address barriers\n• Embed changes for sustainability\n\n**Common Failures:**\n• Benefits not quantified upfront\n• No ownership assigned\n• Tracking ends at go-live\n• No accountability for shortfalls",
        },
        {
          title: 'Portfolio Governance',
          type: 'text',
          content: "**Portfolio Governance Activities:**\n\n**Selection:**\n• Evaluate proposals against criteria\n• Prioritize based on value and strategy\n• Balance risk across portfolio\n\n**Authorization:**\n• Approve funding and resources\n• Define success criteria\n• Establish governance oversight\n\n**Monitoring:**\n• Track portfolio health\n• Monitor individual investments\n• Manage dependencies\n\n**Optimization:**\n• Reallocate resources as needed\n• Cancel underperforming investments\n• Accelerate high-value initiatives\n\n**Reporting:**\n• Portfolio dashboards\n• Investment status\n• Benefits tracking",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Portfolio management treats IT investments holistically to optimize value",
            "Investment methods: ROI, NPV, IRR, Payback Period, TCO - each with pros/cons",
            "Business cases must address need, options, financials, risks, and implementation",
            "Benefits realization ensures promised value is actually delivered",
            "Portfolio governance selects, authorizes, monitors, and optimizes investments",
          ],
        },
      ],
    },
  },
];

export default cisa2LessonsBatch2;
