/**
 * CISA Domain 3: Information Systems Acquisition, Development, and Implementation - Batch 2
 * Coverage: SDLC, project management, testing, and change management
 */

import { Lesson } from '../../../types';

export const cisa3LessonsBatch2: Lesson[] = [
  // ===========================================================================
  // SOFTWARE DEVELOPMENT LIFECYCLE
  // ===========================================================================
  
  {
    id: 'CISA3-010',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Software Development Life Cycle Models',
    description: 'Compare SDLC methodologies including Waterfall, Agile, and DevOps',
    order: 10,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['SDLC', 'Waterfall', 'Agile', 'DevOps', 'Methodologies'],
    blueprintArea: 'CISA3-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Different SDLC methodologies have different risk profiles and control points. Auditors must understand the methodology to identify appropriate controls.",
        },
        {
          title: 'Traditional Waterfall Model',
          type: 'text',
          content: "**Phases (Sequential):**\n\n**1. Requirements:**\n• Gather and document requirements\n• Sign-off before proceeding\n\n**2. Design:**\n• System architecture\n• Detailed specifications\n\n**3. Development:**\n• Code the solution\n• Unit testing\n\n**4. Testing:**\n• Integration testing\n• System testing\n• User acceptance testing\n\n**5. Deployment:**\n• Implementation\n• Production release\n\n**6. Maintenance:**\n• Ongoing support\n• Enhancements\n\n**Characteristics:**\n• Sequential phases\n• Heavy documentation\n• Formal sign-offs between phases\n• Changes are costly\n• Best for stable, well-understood requirements",
        },
        {
          title: 'Waterfall vs Agile',
          type: 'table',
          headers: ['Aspect', 'Waterfall', 'Agile'],
          rows: [
            ['Approach', 'Sequential phases', 'Iterative sprints'],
            ['Requirements', 'Fixed upfront', 'Evolving'],
            ['Changes', 'Costly, discouraged', 'Embraced'],
            ['Documentation', 'Extensive', 'Minimal/just enough'],
            ['Delivery', 'End of project', 'Incremental/continuous'],
            ['Customer Involvement', 'Beginning and end', 'Throughout'],
            ['Risk', 'Late discovery of issues', 'Early feedback reduces risk'],
          ],
        },
        {
          title: 'Agile Principles',
          type: 'text',
          content: "**Agile Manifesto Values:**\n\n• **Individuals and interactions** over processes and tools\n• **Working software** over comprehensive documentation\n• **Customer collaboration** over contract negotiation\n• **Responding to change** over following a plan\n\n**Popular Agile Frameworks:**\n\n**Scrum:**\n• Fixed-length sprints (2-4 weeks)\n• Roles: Product Owner, Scrum Master, Team\n• Ceremonies: Sprint planning, daily standup, review, retrospective\n• Artifacts: Product backlog, sprint backlog, increment\n\n**Kanban:**\n• Continuous flow (no fixed iterations)\n• Visualize workflow\n• Limit work in progress (WIP)\n• Optimize flow",
        },
        {
          title: '🧠 Memory Aid: Scrum Ceremonies',
          type: 'callout',
          content: "**Scrum has 4 ceremonies: PSRR**\n\n• **P**lanning - What will we build this sprint?\n• **S**tandup (Daily) - What did I do? What will I do? Blockers?\n• **R**eview - Demo the working software\n• **R**etrospective - How can we improve?\n\nThink: \"Plan, Stand, Review, Reflect\"",
        },
        {
          title: 'DevOps and CI/CD',
          type: 'text',
          content: "**DevOps = Development + Operations**\n\nCultural and technical practices that unite development and operations.\n\n**Key Practices:**\n\n**Continuous Integration (CI):**\n• Frequent code commits\n• Automated builds\n• Automated testing\n• Fast feedback\n\n**Continuous Delivery (CD):**\n• Code always deployable\n• Automated deployment pipeline\n• Manual approval for production\n\n**Continuous Deployment:**\n• Fully automated to production\n• No manual gates\n• Requires mature automation\n\n**Infrastructure as Code (IaC):**\n• Infrastructure defined in code\n• Version controlled\n• Consistent environments\n• Automated provisioning",
        },
        {
          title: 'Choosing a Methodology',
          type: 'text',
          content: "**Waterfall Best For:**\n• Stable, well-understood requirements\n• Regulatory requirements for documentation\n• Fixed-price contracts\n• Hardware-integrated systems\n\n**Agile Best For:**\n• Evolving requirements\n• Need for rapid delivery\n• Customer available for feedback\n• Innovation projects\n\n**Hybrid Approaches:**\n• Combine elements of both\n• Large programs with Agile teams\n• Governance phases with Agile execution\n\n**Audit Implications:**\n• Methodology affects control points\n• Agile requires different controls than Waterfall\n• Controls must fit the approach used",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Waterfall is sequential with fixed requirements; Agile is iterative with evolving requirements",
            "Agile values working software, customer collaboration, and responding to change",
            "Scrum uses fixed sprints with defined ceremonies; Kanban uses continuous flow",
            "DevOps unites Dev and Ops with CI/CD pipelines and Infrastructure as Code",
            "Methodology choice affects risk profile and appropriate controls",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-011',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Requirements Management',
    description: 'Learn how to define, document, and manage system requirements',
    order: 11,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Requirements', 'Elicitation', 'Traceability', 'Validation'],
    blueprintArea: 'CISA3-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Poor requirements are the leading cause of project failure. Auditors must understand requirements management to evaluate project risk.",
        },
        {
          title: 'Types of Requirements',
          type: 'table',
          headers: ['Type', 'Description', 'Examples'],
          rows: [
            ['Functional', 'What the system must do', 'Process payment, generate report'],
            ['Non-Functional', 'How the system must perform', 'Response time, availability, security'],
            ['Business', 'High-level organizational needs', 'Reduce processing time by 50%'],
            ['User', 'What users need to accomplish', 'Search for customer records'],
            ['System', 'Technical specifications', 'Interface with API, support 1000 users'],
            ['Regulatory', 'Compliance requirements', 'Data retention, audit trails'],
          ],
        },
        {
          title: 'Requirements Elicitation Techniques',
          type: 'text',
          content: "**Common Techniques:**\n\n**Interviews:**\n• One-on-one discussions\n• Good for detailed understanding\n• Time-consuming for many stakeholders\n\n**Workshops/JAD Sessions:**\n• Joint Application Development\n• Collaborative group sessions\n• Efficient for consensus building\n\n**Surveys/Questionnaires:**\n• Collect from many stakeholders\n• Quantifiable results\n• May miss nuances\n\n**Document Analysis:**\n• Review existing documentation\n• Understand current state\n• Identify implicit requirements\n\n**Observation:**\n• Watch users perform tasks\n• Understand real workflow\n• Identify unstated needs\n\n**Prototyping:**\n• Build mockups for feedback\n• Validate understanding\n• Iterative refinement",
        },
        {
          title: 'SMART Requirements',
          type: 'text',
          content: "**Good Requirements Are SMART:**\n\n**S - Specific:**\n• Clear and unambiguous\n• One interpretation only\n\n**M - Measurable:**\n• Criteria for verification\n• Can be tested\n\n**A - Achievable:**\n• Technically feasible\n• Within project constraints\n\n**R - Relevant:**\n• Supports business objectives\n• Necessary for the system\n\n**T - Time-bound:**\n• When it's needed\n• Priority relative to others\n\n**Example:**\n❌ \"The system should be fast\"\n✅ \"The search results page shall load within 2 seconds for 95% of requests under normal load conditions\"",
        },
        {
          title: '🧠 Memory Aid: Requirements Quality',
          type: 'callout',
          content: "**Check requirements with CURT:**\n\n• **C**omplete - Nothing missing?\n• **U**nambiguous - Only one interpretation?\n• **R**ealizable - Can we build it?\n• **T**estable - Can we verify it?\n\n\"Be CURT with bad requirements!\"",
        },
        {
          title: 'Requirements Traceability',
          type: 'text',
          content: "**Requirements Traceability Matrix (RTM):**\n\nLinks requirements through the entire lifecycle:\n\nBusiness Need → Requirement → Design → Code → Test → Implementation\n\n**Benefits:**\n• Verify all requirements implemented\n• Impact analysis for changes\n• Test coverage confirmation\n• Audit trail\n\n**Traceability Questions:**\n• Forward: Is each requirement implemented and tested?\n• Backward: Does each feature trace to a requirement?\n• Coverage: Are test cases covering all requirements?\n\n**Audit Consideration:**\nAsk to see the RTM; verify it's maintained and used.",
        },
        {
          title: 'Managing Requirements Changes',
          type: 'text',
          content: "**Change Control for Requirements:**\n\n**1. Request:**\n• Document the change request\n• Identify requester and rationale\n\n**2. Analyze:**\n• Assess impact on scope, schedule, cost\n• Evaluate technical feasibility\n• Identify affected components\n\n**3. Approve:**\n• Appropriate authority decides\n• Document decision\n• Update baselines\n\n**4. Implement:**\n• Make the change\n• Update all related artifacts\n• Verify implementation\n\n**Scope Creep:**\nUncontrolled expansion of requirements.\nPrevented by: Change control, baseline management, governance.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Requirements include functional, non-functional, business, user, system, and regulatory",
            "Elicitation techniques: interviews, workshops, surveys, document analysis, observation, prototyping",
            "Good requirements are SMART: Specific, Measurable, Achievable, Relevant, Time-bound",
            "Traceability links requirements to design, code, and tests throughout the lifecycle",
            "Requirements changes must be controlled to prevent scope creep",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-012',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Application Testing',
    description: 'Master testing methodologies, levels, and quality assurance practices',
    order: 12,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Testing', 'Test Levels', 'Test Types', 'Quality Assurance'],
    blueprintArea: 'CISA3-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Testing verifies that systems work correctly and securely. Auditors must understand testing to evaluate whether quality controls are adequate.",
        },
        {
          title: 'Testing Levels',
          type: 'table',
          headers: ['Level', 'Scope', 'Performed By', 'Purpose'],
          rows: [
            ['Unit Testing', 'Individual components', 'Developers', 'Verify code modules work'],
            ['Integration Testing', 'Component interfaces', 'Developers/QA', 'Verify components work together'],
            ['System Testing', 'Complete system', 'QA team', 'Verify end-to-end functionality'],
            ['UAT', 'Business acceptance', 'Business users', 'Verify meets business needs'],
            ['Regression Testing', 'After changes', 'QA/Automated', 'Verify no new defects introduced'],
          ],
        },
        {
          title: 'Testing Types',
          type: 'text',
          content: "**Functional Testing:**\n• Verify features work as specified\n• Positive tests (happy path)\n• Negative tests (error handling)\n\n**Non-Functional Testing:**\n\n**Performance Testing:**\n• Load testing (normal conditions)\n• Stress testing (beyond normal)\n• Scalability testing (growth capacity)\n\n**Security Testing:**\n• Vulnerability scanning\n• Penetration testing\n• Code analysis (SAST/DAST)\n\n**Usability Testing:**\n• User experience evaluation\n• Accessibility testing\n\n**Compatibility Testing:**\n• Browser/device compatibility\n• Operating system compatibility\n\n**Recovery Testing:**\n• Failover testing\n• Backup/restore verification",
        },
        {
          title: 'Black Box vs White Box Testing',
          type: 'text',
          content: "**Black Box Testing:**\n• Test without seeing internal code\n• Focus on inputs and outputs\n• Based on requirements/specifications\n• Performed by QA, users\n\n**White Box Testing:**\n• Test with knowledge of code\n• Focus on internal logic\n• Code coverage analysis\n• Performed by developers\n\n**Gray Box Testing:**\n• Partial knowledge of internals\n• Combination approach\n• Common for integration testing",
        },
        {
          title: '🧠 Memory Aid: Testing Colors',
          type: 'callout',
          content: "**BLACK Box = Blind to code**\nYou can't see inside; test from outside\n\n**WHITE Box = Window into code**\nYou can see everything; test the logic\n\n**GRAY Box = Glasses on**\nYou can see some things; combination",
        },
        {
          title: 'Test Documentation',
          type: 'text',
          content: "**Test Plan:**\n• Strategy and approach\n• Scope and objectives\n• Resources and schedule\n• Entry and exit criteria\n• Risk assessment\n\n**Test Cases:**\n• Unique identifier\n• Preconditions\n• Test steps\n• Expected results\n• Actual results\n• Pass/Fail status\n\n**Test Scripts:**\n• Automated test code\n• Reusable across cycles\n• Version controlled\n\n**Defect Reports:**\n• Description and steps to reproduce\n• Severity and priority\n• Screenshots/evidence\n• Status tracking",
        },
        {
          title: 'User Acceptance Testing (UAT)',
          type: 'text',
          content: "**Purpose:**\nBusiness validation that the system meets their needs.\n\n**Critical Success Factors:**\n\n**Business Ownership:**\n• Business users execute tests\n• IT supports, doesn't perform UAT\n• Sign-off demonstrates acceptance\n\n**Representative Testing:**\n• Realistic test data\n• Real-world scenarios\n• Include exception cases\n\n**Independence:**\n• Separate from development environment\n• Production-like configuration\n\n**Acceptance Criteria:**\n• Pre-defined criteria for success\n• Documented before testing starts\n• Linked to requirements\n\n**Audit Tip:** Always ask who performed UAT and whether business sign-off was obtained.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Test levels: Unit → Integration → System → UAT (increasing scope)",
            "Test types include functional, performance, security, usability, compatibility",
            "Black box tests without code knowledge; White box tests with code visibility",
            "Test documentation: Plan, Cases, Scripts, Defect reports",
            "UAT must be performed by business users with documented acceptance criteria",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-013',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Change and Release Management',
    description: 'Understand controls for managing changes to production systems',
    order: 13,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Change Management', 'Release Management', 'CAB', 'Emergency Changes'],
    blueprintArea: 'CISA3-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Uncontrolled changes are a leading cause of outages and security incidents. Change management is one of the most audited IT controls.",
        },
        {
          title: 'Change Management Process',
          type: 'text',
          content: "**1. Request:**\n• Submit change request\n• Document business justification\n• Identify affected systems\n\n**2. Assess:**\n• Evaluate impact and risk\n• Resource requirements\n• Dependencies\n\n**3. Approve:**\n• Change Advisory Board (CAB) review\n• Appropriate authority approval\n• Schedule assignment\n\n**4. Build:**\n• Develop and configure change\n• Prepare documentation\n• Create back-out plan\n\n**5. Test:**\n• Test in non-production\n• Verify functionality\n• UAT where appropriate\n\n**6. Implement:**\n• Execute per schedule\n• Monitor for issues\n• Validate success\n\n**7. Review:**\n• Post-implementation review\n• Close change ticket\n• Lessons learned",
        },
        {
          title: 'Change Types',
          type: 'table',
          headers: ['Type', 'Description', 'Approval', 'Example'],
          rows: [
            ['Standard', 'Pre-approved, low risk, routine', 'Pre-authorized', 'User account creation'],
            ['Normal', 'Follows full process', 'CAB/approver', 'Application enhancement'],
            ['Emergency', 'Urgent fix required', 'Expedited, post-approval', 'Security patch for active exploit'],
            ['Major/Significant', 'High impact or risk', 'Executive/CAB', 'Core system replacement'],
          ],
        },
        {
          title: 'Change Advisory Board (CAB)',
          type: 'text',
          content: "**Purpose:**\nReview and authorize changes to minimize risk.\n\n**Typical Composition:**\n• Change manager (chair)\n• Technical representatives\n• Operations/support\n• Security representative\n• Business representatives (as needed)\n\n**CAB Reviews:**\n• Risk and impact assessment\n• Resource availability\n• Scheduling conflicts\n• Back-out plans\n• Test results\n\n**ECAB (Emergency CAB):**\n• Subset available for emergency changes\n• Smaller group for quick decisions\n• Still provides oversight",
        },
        {
          title: '🧠 Memory Aid: Change Control',
          type: 'callout',
          content: "**Change Request needs: RABBIT**\n\n• **R**eason for change\n• **A**ffected systems\n• **B**ack-out plan\n• **B**usiness sign-off\n• **I**mpact assessment\n• **T**esting evidence\n\nEvery change needs a RABBIT to survive!",
        },
        {
          title: 'Segregation of Duties in Changes',
          type: 'text',
          content: "**Key Separations:**\n\n**Developer ≠ Production Access:**\n• Developers code in dev/test\n• Separate team deploys to production\n• Prevents unauthorized changes\n\n**Requestor ≠ Approver:**\n• Cannot approve own changes\n• Independent review required\n\n**Developer ≠ Tester (for critical systems):**\n• Independent testing\n• Unbiased validation\n\n**Audit Focus:**\n• Review who can access production\n• Verify approval is independent\n• Check for segregation violations\n• Sample emergency changes for compliance",
        },
        {
          title: 'Emergency Change Controls',
          type: 'text',
          content: "**Emergency Change Requirements:**\n\n**During Emergency:**\n• Verbal authorization acceptable\n• Document who authorized\n• Implement fix\n• Basic testing if possible\n\n**After Emergency:**\n• Create retrospective change ticket\n• Document what was done\n• CAB post-review\n• Root cause analysis\n• Lessons learned\n\n**Red Flags:**\n• High volume of emergency changes\n• Emergency changes not documented\n• No post-review performed\n• Emergency used to bypass controls",
        },
        {
          title: 'Release Management',
          type: 'text',
          content: "**Release vs. Change:**\n• Change = Individual modification\n• Release = Bundle of changes deployed together\n\n**Release Process:**\n• Package multiple changes\n• Coordinated testing\n• Scheduled deployment windows\n• Communication plan\n• Rollback strategy\n\n**Release Types:**\n• Major Release: Significant new functionality\n• Minor Release: Enhancements and fixes\n• Patch: Urgent fixes between releases\n\n**Environments:**\nDevelopment → Test → Staging → Production\nEach has its own controls and access restrictions.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Change process: Request → Assess → Approve → Build → Test → Implement → Review",
            "Change types: Standard (pre-approved), Normal (full process), Emergency (expedited)",
            "CAB reviews changes for risk, impact, and scheduling",
            "Segregation of duties: Developers shouldn't have production access or approve their own changes",
            "Emergency changes require post-implementation review and documentation",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-014',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Project Management Fundamentals',
    description: 'Learn project management principles and audit considerations for IT projects',
    order: 14,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Project Management', 'Project Lifecycle', 'Risk Management', 'Governance'],
    blueprintArea: 'CISA3-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT projects frequently fail or exceed budgets. Understanding project management helps auditors identify and escalate project risks.",
        },
        {
          title: 'Project Management Knowledge Areas',
          type: 'text',
          content: "**PMBOK 10 Knowledge Areas:**\n\n1. **Integration Management**: Coordinate all elements\n2. **Scope Management**: Define and control what's included\n3. **Schedule Management**: Plan and control timeline\n4. **Cost Management**: Estimate, budget, control costs\n5. **Quality Management**: Ensure quality requirements met\n6. **Resource Management**: Acquire and manage team\n7. **Communications Management**: Plan and manage communications\n8. **Risk Management**: Identify and respond to risks\n9. **Procurement Management**: Acquire goods and services\n10. **Stakeholder Management**: Engage stakeholders",
        },
        {
          title: 'Project Lifecycle Phases',
          type: 'table',
          headers: ['Phase', 'Key Activities', 'Key Deliverables'],
          rows: [
            ['Initiation', 'Define project, obtain authorization', 'Project charter, stakeholder register'],
            ['Planning', 'Define scope, schedule, budget', 'Project plan, WBS, schedule, budget'],
            ['Execution', 'Perform work, manage team', 'Deliverables, status reports'],
            ['Monitoring & Control', 'Track progress, manage changes', 'Performance reports, change log'],
            ['Closing', 'Finalize and hand off', 'Lessons learned, project closure'],
          ],
        },
        {
          title: 'Triple Constraint',
          type: 'text',
          content: "**The Iron Triangle:**\n\nScope, Schedule, Cost are interconnected.\n\n• Increase Scope → Need more Time or Money\n• Reduce Schedule → Need to cut Scope or add Resources (Cost)\n• Reduce Cost → Need to cut Scope or extend Schedule\n\n**Quality** is often placed in the center - affected by trade-offs in the triangle.\n\n**Audit Perspective:**\n• Are constraints realistic?\n• Are trade-offs documented and approved?\n• Is quality being sacrificed?",
        },
        {
          title: '🧠 Memory Aid: Project Risks',
          type: 'callout',
          content: "**Common project risks follow SCOPE:**\n\n• **S**chedule risk - Will it be on time?\n• **C**ost risk - Will it be on budget?\n• **O**perational risk - Will it work in production?\n• **P**eople risk - Do we have the right skills?\n• **E**xternal risk - Vendor, regulatory, market",
        },
        {
          title: 'Project Risk Management',
          type: 'text',
          content: "**Risk Management Process:**\n\n**1. Identify Risks:**\n• Brainstorming\n• Checklists\n• Expert judgment\n• Requirements review\n\n**2. Analyze Risks:**\n• Probability assessment\n• Impact assessment\n• Risk ranking/prioritization\n\n**3. Plan Responses:**\n• Avoid: Eliminate the risk\n• Mitigate: Reduce likelihood/impact\n• Transfer: Shift to third party\n• Accept: Acknowledge and proceed\n\n**4. Monitor Risks:**\n• Track identified risks\n• Watch for new risks\n• Execute responses when triggered",
        },
        {
          title: 'Project Governance',
          type: 'text',
          content: "**Governance Elements:**\n\n**Project Steering Committee:**\n• Executive oversight\n• Major decision authority\n• Escalation point\n• Resource prioritization\n\n**Project Sponsor:**\n• Executive accountable for success\n• Provides resources and authority\n• Removes barriers\n• Champions the project\n\n**Project Manager:**\n• Day-to-day management\n• Manages team and tasks\n• Reports status\n• Manages risks and issues\n\n**Gates/Stage Reviews:**\n• Milestones requiring approval\n• Go/no-go decisions\n• Quality gates",
        },
        {
          title: 'Common Project Failure Indicators',
          type: 'text',
          content: "**Red Flags for Auditors:**\n\n**Scope:**\n• Unclear or changing requirements\n• Scope creep without change control\n• No documented scope statement\n\n**Schedule:**\n• Unrealistic timeline\n• Consistently missed milestones\n• No contingency buffer\n\n**Resources:**\n• Key resources not available\n• High team turnover\n• Skill gaps\n\n**Governance:**\n• No executive sponsorship\n• Infrequent steering meetings\n• Issues not escalated\n\n**Communication:**\n• Stakeholders surprised\n• Status reports not accurate\n• Problems hidden",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "PMBOK defines 10 knowledge areas covering all aspects of project management",
            "Project phases: Initiation → Planning → Execution → Monitoring → Closing",
            "Triple constraint: Scope, Schedule, and Cost are interdependent trade-offs",
            "Risk responses: Avoid, Mitigate, Transfer, Accept",
            "Strong governance requires steering committee, sponsor, PM, and stage gates",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-015',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Configuration Management',
    description: 'Understand configuration management and version control practices',
    order: 15,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Configuration Management', 'Version Control', 'CMDB', 'Baselines'],
    blueprintArea: 'CISA3-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Configuration management ensures systems are in a known, approved state. It's essential for change impact analysis, troubleshooting, and security.",
        },
        {
          title: 'Configuration Management Concepts',
          type: 'text',
          content: "**Configuration Item (CI):**\nAny component that needs to be managed:\n• Hardware (servers, network devices)\n• Software (applications, operating systems)\n• Documentation (policies, procedures)\n• Services\n\n**Configuration Baseline:**\n• Approved state at a point in time\n• Reference for changes\n• Enables rollback\n\n**Configuration Management Database (CMDB):**\n• Repository of all CIs\n• Attributes and relationships\n• Change history\n• Enables impact analysis",
        },
        {
          title: 'CMDB Structure',
          type: 'table',
          headers: ['Element', 'Description', 'Examples'],
          rows: [
            ['CI Type', 'Category of item', 'Server, Application, Database'],
            ['Attributes', 'Properties of the CI', 'Owner, Location, Version, Status'],
            ['Relationships', 'How CIs connect', 'App runs on Server, DB supports App'],
            ['Status', 'Current state', 'Production, Development, Retired'],
            ['History', 'Change over time', 'Version changes, ownership changes'],
          ],
        },
        {
          title: 'Configuration Management Process',
          type: 'text',
          content: "**1. Identification:**\n• Define what CIs to track\n• Naming conventions\n• Categorization scheme\n\n**2. Control:**\n• Only authorized changes\n• Change management integration\n• Version control\n\n**3. Status Accounting:**\n• Track current state of all CIs\n• Report changes\n• Maintain history\n\n**4. Verification and Audit:**\n• Compare actual to CMDB\n• Identify discrepancies\n• Ensure accuracy",
        },
        {
          title: '🧠 Memory Aid: Configuration Management',
          type: 'callout',
          content: "**ICSA Process:**\n\n• **I**dentify what to track\n• **C**ontrol changes to it\n• **S**tatus accounting (track state)\n• **A**udit for accuracy\n\nThink: \"I C Servers Always\" - I always see what's configured!",
        },
        {
          title: 'Version Control',
          type: 'text',
          content: "**Version Control Systems:**\n• Track changes to code/documents\n• Maintain history\n• Enable collaboration\n• Support rollback\n\n**Key Features:**\n• Check-in/check-out\n• Branching and merging\n• Conflict resolution\n• Audit trail\n\n**Popular Tools:**\n• Git (most common)\n• Subversion (SVN)\n• Perforce\n• Team Foundation Server\n\n**Best Practices:**\n• Frequent commits with meaningful messages\n• Branch for features/releases\n• Code review before merge\n• Protect main/master branch",
        },
        {
          title: 'Auditing Configuration Management',
          type: 'text',
          content: "**Audit Areas:**\n\n**CMDB Accuracy:**\n• Is the CMDB current?\n• Do physical audits match CMDB?\n• Are discrepancies investigated?\n\n**Change Control:**\n• Are all changes reflected in CMDB?\n• Is CMDB updated as part of change process?\n• Is history maintained?\n\n**Version Control:**\n• Is all code in version control?\n• Are access controls appropriate?\n• Is the audit trail complete?\n• Can any version be reconstructed?\n\n**Baselines:**\n• Are baselines established?\n• Can systems be compared to baseline?\n• Is baseline deviation reported?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Configuration Items (CIs) are components needing management - hardware, software, docs",
            "CMDB stores CIs with attributes, relationships, and change history",
            "CM process: Identify → Control → Status Accounting → Audit",
            "Version control tracks code changes with history, branching, and rollback capability",
            "CMDB accuracy must be verified through periodic audits comparing actual to recorded state",
          ],
        },
      ],
    },
  },
];

export default cisa3LessonsBatch2;
