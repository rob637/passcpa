/**
 * CISA Domain 3: Information Systems Acquisition, Development, and Implementation (12%)
 * Based on ISACA CISA Review Manual
 * 
 * Key Topics:
 * - Business Case and Project Management
 * - System Development Life Cycle (SDLC)
 * - System Testing and Implementation
 */

import { Lesson } from '../../../types';

export const cisa3Lessons: Lesson[] = [
  // ============================================================================
  // DOMAIN 3A: PROJECT GOVERNANCE AND MANAGEMENT
  // ============================================================================
  
  {
    id: 'CISA3-001',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'IT Project Governance',
    description: 'Understand project governance structures and oversight mechanisms',
    order: 1,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Project Governance', 'Business Case', 'Steering Committee', 'Project Initiation'],
    blueprintArea: 'CISA3-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Most IT projects fail to deliver expected value. Strong project governance ensures proper oversight, clear accountability, and alignment with business objectives.",
        },
        {
          title: 'Business Case Development',
          type: 'text',
          content: "**Business Case Components:**\n\n**1. Executive Summary**\n• Problem statement\n• Proposed solution\n• Key benefits\n\n**2. Strategic Alignment**\n• Link to business objectives\n• Strategic fit\n• Competitive advantage\n\n**3. Benefits Analysis**\n• Tangible benefits (cost savings)\n• Intangible benefits (satisfaction)\n• Benefit realization plan\n\n**4. Cost Analysis**\n• Development costs\n• Implementation costs\n• Ongoing operational costs\n• Total Cost of Ownership\n\n**5. Risk Assessment**\n• Project risks\n• Technical risks\n• Business risks\n• Mitigation strategies\n\n**6. Alternatives Analysis**\n• Do nothing option\n• Alternative solutions\n• Build vs. buy",
        },
        {
          title: 'Project Governance Structure',
          type: 'table',
          headers: ['Role', 'Responsibility', 'Authority'],
          rows: [
            ['Executive Sponsor', 'Champion project, remove obstacles', 'Funding, strategic decisions'],
            ['Steering Committee', 'Oversight, direction, approval', 'Scope, budget, timeline changes'],
            ['Project Manager', 'Day-to-day management', 'Resource allocation, task management'],
            ['Project Board', 'Review progress, resolve issues', 'Escalation decisions'],
            ['Business Owner', 'Define requirements, accept deliverables', 'Business decisions'],
          ],
        },
        {
          title: 'Project Initiation Controls',
          type: 'text',
          content: "**Key Initiation Controls:**\n\n**Formal Approval**\n• Business case approval\n• Budget authorization\n• Resource commitment\n\n**Scope Definition**\n• Clear project charter\n• Defined boundaries\n• Exclusions documented\n\n**Success Criteria**\n• Measurable objectives\n• Acceptance criteria\n• Success metrics\n\n**Risk Assessment**\n• Initial risk identification\n• Risk response planning\n• Contingency reserves\n\n**Organization**\n• Governance structure defined\n• Roles and responsibilities clear\n• Reporting lines established",
        },
        {
          title: 'Feasibility Study Types',
          type: 'text',
          content: "**Feasibility Dimensions:**\n\n**Technical Feasibility**\n• Can we build it?\n• Do we have the technology?\n• Skills available?\n\n**Economic Feasibility**\n• Is it worth building?\n• Cost-benefit analysis\n• ROI acceptable?\n\n**Operational Feasibility**\n• Will it work in our environment?\n• User acceptance likely?\n• Process integration possible?\n\n**Schedule Feasibility**\n• Can we deliver in time?\n• Dependencies manageable?\n• Resources available?\n\n**Legal/Regulatory Feasibility**\n• Compliance implications?\n• Licensing considerations?\n• Privacy requirements?",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Business case includes benefits, costs, risks, and alternatives",
            "Key governance roles: sponsor, steering committee, PM, business owner",
            "Project initiation requires formal approval and clear scope",
            "Feasibility covers technical, economic, operational, schedule, and legal",
            "Success criteria must be measurable and defined upfront",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-002',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Project Management Methodologies',
    description: 'Compare traditional and Agile project management approaches',
    order: 2,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Waterfall', 'Agile', 'Scrum', 'Project Controls'],
    blueprintArea: 'CISA3-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Different methodologies suit different projects. IS auditors must understand various approaches to evaluate whether the chosen methodology is appropriate and properly implemented.",
        },
        {
          title: 'Waterfall (Traditional) Methodology',
          type: 'text',
          content: "**Waterfall Characteristics:**\n\n**Sequential Phases:**\n1. Requirements\n2. Design\n3. Development\n4. Testing\n5. Implementation\n6. Maintenance\n\n**Advantages:**\n• Clear milestones and deliverables\n• Comprehensive documentation\n• Easy to understand and manage\n• Good for stable requirements\n\n**Disadvantages:**\n• Late discovery of issues\n• Difficult to accommodate change\n• Long time to value\n• Requirements must be known upfront\n\n**Best For:** Compliance systems, infrastructure, well-defined projects",
        },
        {
          title: 'Agile Methodology',
          type: 'text',
          content: "**Agile Principles:**\n\n• **Individuals and interactions** over processes and tools\n• **Working software** over comprehensive documentation\n• **Customer collaboration** over contract negotiation\n• **Responding to change** over following a plan\n\n**Agile Practices:**\n• Iterative development (sprints)\n• Continuous delivery\n• Self-organizing teams\n• Continuous improvement\n• Daily standups\n• Regular retrospectives\n\n**Best For:** Evolving requirements, innovation, user-facing applications",
        },
        {
          title: 'Methodology Comparison',
          type: 'table',
          headers: ['Aspect', 'Waterfall', 'Agile'],
          rows: [
            ['Approach', 'Sequential, linear', 'Iterative, incremental'],
            ['Requirements', 'Fixed upfront', 'Evolving continuously'],
            ['Changes', 'Difficult, costly', 'Embraced, expected'],
            ['Documentation', 'Comprehensive', 'Just enough'],
            ['Delivery', 'End of project', 'Continuous/frequent'],
            ['Testing', 'Separate phase', 'Integrated throughout'],
            ['Customer Involvement', 'Beginning and end', 'Continuous'],
          ],
        },
        {
          title: 'Scrum Framework',
          type: 'text',
          content: "**Scrum Roles:**\n• **Product Owner** - Defines requirements, prioritizes backlog\n• **Scrum Master** - Facilitates process, removes obstacles\n• **Development Team** - Self-organizing, cross-functional\n\n**Scrum Artifacts:**\n• **Product Backlog** - Prioritized requirements list\n• **Sprint Backlog** - Items for current sprint\n• **Increment** - Working software produced\n\n**Scrum Events:**\n• **Sprint** - 2-4 week iteration\n• **Sprint Planning** - Plan the sprint work\n• **Daily Scrum** - 15-minute standup\n• **Sprint Review** - Demo to stakeholders\n• **Sprint Retrospective** - Process improvement",
        },
        {
          title: 'Auditing Agile Projects',
          type: 'text',
          content: "**Agile Audit Considerations:**\n\n**Governance**\n• How are decisions made?\n• Is there appropriate oversight?\n• How are changes controlled?\n\n**Documentation**\n• Is there sufficient documentation?\n• How are requirements tracked?\n• Is traceability maintained?\n\n**Quality**\n• How is quality assured?\n• Is testing adequate?\n• Are standards followed?\n\n**Security**\n• Is security integrated?\n• Are security reviews performed?\n• Is secure coding practiced?\n\n**Key:** Adapt audit approach to methodology while maintaining control objectives.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Waterfall is sequential with fixed requirements; Agile is iterative with evolving requirements",
            "Scrum uses sprints, product backlog, and defined roles (PO, SM, team)",
            "Choose methodology based on project characteristics",
            "Agile requires adapted audit approach but same control objectives",
            "Both methodologies need appropriate governance and quality controls",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 3B: SYSTEM DEVELOPMENT LIFE CYCLE
  // ============================================================================

  {
    id: 'CISA3-003',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'SDLC Phases and Controls',
    description: 'Master the system development life cycle and controls at each phase',
    order: 3,
    duration: 55,
    difficulty: 'advanced',
    topics: ['SDLC', 'Development Controls', 'Phase Reviews', 'Quality Gates'],
    blueprintArea: 'CISA3-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The SDLC provides the framework for building systems that meet requirements securely and reliably. Controls at each phase prevent defects and security issues from reaching production.",
        },
        {
          title: 'SDLC Phases Overview',
          type: 'text',
          content: "**Traditional SDLC Phases:**\n\n**1. Feasibility/Initiation**\n• Problem identification\n• Project approval\n• Resource commitment\n\n**2. Requirements Definition**\n• Business requirements\n• Functional specifications\n• System requirements\n\n**3. Design**\n• System architecture\n• Technical design\n• Security design\n\n**4. Development**\n• Coding\n• Unit testing\n• Code review\n\n**5. Testing**\n• Integration testing\n• System testing\n• User acceptance testing\n\n**6. Implementation**\n• Deployment\n• Data conversion\n• Training\n\n**7. Post-Implementation Review**\n• Benefits realization\n• Lessons learned\n• Maintenance transition",
        },
        {
          title: 'Controls by SDLC Phase',
          type: 'table',
          headers: ['Phase', 'Key Controls', 'Auditor Focus'],
          rows: [
            ['Requirements', 'Formal specifications, sign-off', 'Completeness, traceability'],
            ['Design', 'Design reviews, security review', 'Architecture, security design'],
            ['Development', 'Coding standards, code review', 'Secure coding, quality'],
            ['Testing', 'Test plans, defect tracking', 'Coverage, independence'],
            ['Implementation', 'Change control, rollback plan', 'Approval, migration controls'],
          ],
        },
        {
          title: 'Requirements Phase Controls',
          type: 'text',
          content: "**Requirements Controls:**\n\n**Documentation**\n• Formal requirements document\n• Use cases or user stories\n• Non-functional requirements\n• Security requirements\n\n**Validation**\n• Stakeholder review\n• Feasibility assessment\n• Completeness check\n• Consistency check\n\n**Approval**\n• Business owner sign-off\n• Requirements baseline\n• Change control from this point\n\n**Traceability**\n• Requirements traceability matrix\n• Links to design, test, code\n• Impact analysis capability",
        },
        {
          title: 'Design Phase Controls',
          type: 'text',
          content: "**Design Controls:**\n\n**Architecture Review**\n• Technical design review\n• Scalability assessment\n• Integration points\n• Standards compliance\n\n**Security Design**\n• Threat modeling\n• Security architecture\n• Authentication/authorization design\n• Encryption requirements\n\n**Quality Attributes**\n• Performance requirements\n• Availability design\n• Recoverability\n• Maintainability\n\n**Documentation**\n• Design specifications\n• Interface definitions\n• Data dictionary\n• Design sign-off",
        },
        {
          title: 'Development Phase Controls',
          type: 'text',
          content: "**Development Controls:**\n\n**Coding Standards**\n• Language-specific standards\n• Naming conventions\n• Documentation requirements\n• Error handling standards\n\n**Secure Coding**\n• Input validation\n• Output encoding\n• Parameterized queries\n• Session management\n• OWASP Top 10 prevention\n\n**Code Review**\n• Peer review\n• Static analysis\n• Security review\n• Standards compliance check\n\n**Version Control**\n• Source code management\n• Branching strategy\n• Commit standards\n• Access controls",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SDLC phases: feasibility, requirements, design, development, testing, implementation, review",
            "Each phase has specific controls and auditor focus areas",
            "Requirements traceability links requirements through to testing",
            "Secure coding practices prevent vulnerabilities at the source",
            "Design reviews and code reviews are critical quality gates",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-004',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Application Security in Development',
    description: 'Learn secure development practices and application security testing',
    order: 4,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Secure SDLC', 'OWASP', 'Security Testing', 'DevSecOps'],
    blueprintArea: 'CISA3-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Security must be built in, not bolted on. The cost of fixing vulnerabilities increases exponentially as they progress through the SDLC. Shift security left!",
        },
        {
          title: 'Secure SDLC Integration',
          type: 'text',
          content: "**Security Activities by Phase:**\n\n**Requirements**\n• Security requirements\n• Privacy requirements\n• Compliance requirements\n• Abuse cases\n\n**Design**\n• Threat modeling\n• Security architecture\n• Attack surface analysis\n• Defense in depth\n\n**Development**\n• Secure coding training\n• Secure coding standards\n• Static analysis (SAST)\n• Code review\n\n**Testing**\n• Dynamic testing (DAST)\n• Penetration testing\n• Security test cases\n• Fuzzing\n\n**Deployment**\n• Security configuration\n• Vulnerability scanning\n• Security monitoring",
        },
        {
          title: 'OWASP Top 10 Vulnerabilities',
          type: 'table',
          headers: ['Rank', 'Vulnerability', 'Prevention'],
          rows: [
            ['1', 'Broken Access Control', 'Least privilege, deny by default'],
            ['2', 'Cryptographic Failures', 'Strong encryption, key management'],
            ['3', 'Injection', 'Parameterized queries, input validation'],
            ['4', 'Insecure Design', 'Threat modeling, secure patterns'],
            ['5', 'Security Misconfiguration', 'Hardening, configuration review'],
            ['6', 'Vulnerable Components', 'Inventory, patching, SCA'],
            ['7', 'Authentication Failures', 'MFA, session management'],
            ['8', 'Data Integrity Failures', 'Integrity checks, CI/CD security'],
            ['9', 'Logging Failures', 'Comprehensive logging, monitoring'],
            ['10', 'SSRF', 'Input validation, network controls'],
          ],
        },
        {
          title: 'Application Security Testing',
          type: 'text',
          content: "**Testing Types:**\n\n**SAST (Static Application Security Testing)**\n• Analyzes source code\n• Early in SDLC\n• Many false positives\n• Language-specific\n\n**DAST (Dynamic Application Security Testing)**\n• Tests running application\n• Black-box approach\n• Finds runtime issues\n• Later in SDLC\n\n**IAST (Interactive Application Security Testing)**\n• Combines SAST and DAST\n• Runtime instrumentation\n• Lower false positives\n\n**SCA (Software Composition Analysis)**\n• Identifies third-party components\n• Known vulnerability detection\n• License compliance\n\n**Penetration Testing**\n• Simulated attacks\n• Manual testing\n• Business logic flaws\n• Later in SDLC",
        },
        {
          title: 'DevSecOps',
          type: 'text',
          content: "**DevSecOps Principles:**\n\nIntegrating security into DevOps practices:\n\n**Automation**\n• Automated security testing in CI/CD\n• Security as code\n• Automated compliance checks\n\n**Shift Left**\n• Security early in pipeline\n• Developer security training\n• Secure design patterns\n\n**Continuous Feedback**\n• Fast security feedback\n• Fix vulnerabilities quickly\n• Learn from findings\n\n**Shared Responsibility**\n• Security is everyone's job\n• Security champions in teams\n• Collaboration between security and development",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Security activities should occur at every SDLC phase",
            "OWASP Top 10 identifies most critical web application risks",
            "SAST analyzes code; DAST analyzes running applications",
            "SCA identifies vulnerable third-party components",
            "DevSecOps integrates security into CI/CD pipelines",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-005',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Software Testing Types and Techniques',
    description: 'Understand different levels and types of software testing',
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Testing Levels', 'Testing Types', 'Test Planning', 'Defect Management'],
    blueprintArea: 'CISA3-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Testing is the last line of defense before deployment. Understanding test types helps auditors evaluate whether testing is comprehensive enough to catch defects and security issues.",
        },
        {
          title: 'Testing Levels',
          type: 'text',
          content: "**Progressive Testing Levels:**\n\n**1. Unit Testing**\n• Individual components\n• Developer responsibility\n• Automated typically\n• White-box testing\n\n**2. Integration Testing**\n• Component interactions\n• Interface testing\n• Data flow testing\n• API testing\n\n**3. System Testing**\n• Complete system\n• Functional testing\n• Non-functional testing\n• Black-box testing\n\n**4. User Acceptance Testing (UAT)**\n• Business validation\n• User verification\n• Real-world scenarios\n• Go/no-go decision",
        },
        {
          title: 'Testing Types',
          type: 'table',
          headers: ['Type', 'Purpose', 'Focus'],
          rows: [
            ['Functional', 'Verify requirements met', 'Business logic'],
            ['Performance', 'Response time, scalability', 'Speed, capacity'],
            ['Security', 'Vulnerability detection', 'Security controls'],
            ['Usability', 'User experience', 'Interface, workflow'],
            ['Regression', 'Changes dont break', 'Stability'],
            ['Stress', 'Behavior under extreme load', 'Breaking point'],
            ['Recovery', 'System recovery capability', 'Resilience'],
          ],
        },
        {
          title: 'Black-Box vs. White-Box',
          type: 'text',
          content: "**Testing Approaches:**\n\n**Black-Box Testing**\n• No knowledge of internal code\n• Test based on requirements\n• Input/output focused\n• User perspective\n• Techniques: equivalence partitioning, boundary analysis\n\n**White-Box Testing**\n• Full knowledge of code\n• Test internal structure\n• Logic coverage\n• Developer perspective\n• Techniques: statement coverage, path coverage\n\n**Gray-Box Testing**\n• Partial knowledge\n• Combines approaches\n• Test with some internal insight\n• Integration testing often gray-box",
        },
        {
          title: 'Test Documentation',
          type: 'text',
          content: "**Key Test Artifacts:**\n\n**Test Plan**\n• Test strategy and approach\n• Scope and objectives\n• Resources and schedule\n• Entry/exit criteria\n\n**Test Cases**\n• Specific test scenarios\n• Steps to execute\n• Expected results\n• Traceability to requirements\n\n**Test Scripts**\n• Automated test code\n• Repeatable execution\n• Version controlled\n\n**Test Results**\n• Actual vs. expected\n• Pass/fail status\n• Defects identified\n• Coverage metrics",
        },
        {
          title: 'Defect Management',
          type: 'text',
          content: "**Defect Lifecycle:**\n\n1. **New** - Defect identified\n2. **Open** - Acknowledged, assigned\n3. **In Progress** - Being fixed\n4. **Fixed** - Developer completed fix\n5. **Verified** - Tester confirms fix\n6. **Closed** - Defect resolved\n\n**Defect Prioritization:**\n• **Critical** - System unusable\n• **High** - Major function broken\n• **Medium** - Function impaired\n• **Low** - Minor issue, workaround exists\n\n**Metrics:**\n• Defect density\n• Defect age\n• Reopen rate\n• Fix time",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Testing levels: unit, integration, system, UAT",
            "Test types include functional, performance, security, regression",
            "Black-box tests without code knowledge; white-box tests code structure",
            "Test documentation includes plans, cases, scripts, and results",
            "Defect management tracks issues through lifecycle to closure",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 3C: SYSTEM ACQUISITION AND IMPLEMENTATION
  // ============================================================================

  {
    id: 'CISA3-006',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'System Acquisition and Vendor Selection',
    description: 'Learn controls for acquiring commercial software and selecting vendors',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['RFP', 'Vendor Evaluation', 'Acquisition Controls', 'Licensing'],
    blueprintArea: 'CISA3-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Buy decisions require as much rigor as build decisions. Poor vendor or product selection can lead to failed implementations, security vulnerabilities, and vendor lock-in.",
        },
        {
          title: 'Build vs. Buy Analysis',
          type: 'table',
          headers: ['Factor', 'Build (Custom)', 'Buy (Commercial)'],
          rows: [
            ['Fit', 'Exact match to needs', 'May require adaptation'],
            ['Time to deploy', 'Longer development', 'Faster implementation'],
            ['Cost', 'Development + maintenance', 'License + customization'],
            ['Expertise', 'Need development skills', 'Need product expertise'],
            ['Maintenance', 'Internal responsibility', 'Vendor support'],
            ['Flexibility', 'Full control', 'Dependent on vendor'],
          ],
        },
        {
          title: 'RFP Process',
          type: 'text',
          content: "**Request for Proposal Steps:**\n\n**1. Requirements Definition**\n• Functional requirements\n• Technical requirements\n• Security requirements\n• Service level requirements\n\n**2. RFI/RFP Development**\n• RFI for market research\n• RFP for formal proposals\n• Clear evaluation criteria\n• Submission requirements\n\n**3. Vendor Response**\n• Vendor demonstrations\n• Written proposals\n• Reference customers\n• Pricing information\n\n**4. Evaluation**\n• Scoring against criteria\n• Shortlist vendors\n• Due diligence\n• Proof of concept\n\n**5. Selection and Contracting**\n• Final selection\n• Contract negotiation\n• SLA definition\n• Legal review",
        },
        {
          title: 'Vendor Evaluation Criteria',
          type: 'text',
          content: "**Evaluation Dimensions:**\n\n**Functional Fit**\n• Requirements coverage\n• Customization needed\n• User experience\n• Integration capability\n\n**Technical Fit**\n• Architecture compatibility\n• Technology stack\n• Scalability\n• Security features\n\n**Vendor Viability**\n• Financial stability\n• Market position\n• R&D investment\n• Customer base\n\n**Support and Service**\n• Implementation support\n• Training available\n• Ongoing support model\n• User community\n\n**Total Cost**\n• License costs\n• Implementation costs\n• Customization costs\n• Ongoing costs",
        },
        {
          title: 'Software Licensing',
          type: 'text',
          content: "**Licensing Models:**\n\n**Perpetual License**\n• One-time purchase\n• Own the license forever\n• Separate maintenance fees\n• Capital expense\n\n**Subscription (SaaS)**\n• Pay per period\n• Includes updates/support\n• Operational expense\n• Lower upfront cost\n\n**Usage-Based**\n• Pay per use/transaction\n• Scales with consumption\n• Variable costs\n\n**Open Source**\n• No license cost\n• Various license types (GPL, MIT, Apache)\n• Support must be obtained separately\n• License compliance required",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Build vs. buy analysis considers fit, time, cost, expertise, flexibility",
            "RFP process: requirements, RFP development, response, evaluation, selection",
            "Evaluate functional fit, technical fit, vendor viability, support, total cost",
            "Licensing models: perpetual, subscription, usage-based, open source",
            "Selection decision should involve IT, business, legal, and procurement",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-007',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'System Implementation and Change Control',
    description: 'Master controls for implementing new systems and managing changes',
    order: 7,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Change Control', 'Implementation', 'Migration', 'Rollback'],
    blueprintArea: 'CISA3-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Implementation is a critical and risky phase. Poorly controlled changes are a leading cause of outages. Strong change management protects production stability.",
        },
        {
          title: 'Change Management Process',
          type: 'text',
          content: "**Change Control Steps:**\n\n**1. Request**\n• Formal change request\n• Business justification\n• Requestor identification\n\n**2. Assessment**\n• Impact analysis\n• Risk assessment\n• Resource requirements\n• Schedule considerations\n\n**3. Authorization**\n• CAB review (for significant changes)\n• Appropriate approvals\n• Documentation of decision\n\n**4. Implementation**\n• Scheduled deployment\n• Testing execution\n• Rollback prepared\n• Communication\n\n**5. Review**\n• Post-implementation review\n• Success verification\n• Documentation update\n• Lessons learned",
        },
        {
          title: 'Change Types',
          type: 'table',
          headers: ['Type', 'Characteristics', 'Process'],
          rows: [
            ['Standard', 'Pre-approved, low risk', 'Automatic approval'],
            ['Normal', 'Typical changes', 'Full CAB process'],
            ['Emergency', 'Urgent, production failure', 'Expedited, post-review'],
            ['Major', 'High risk, significant impact', 'Enhanced review, board approval'],
          ],
        },
        {
          title: 'Implementation Approaches',
          type: 'text',
          content: "**Deployment Strategies:**\n\n**Big Bang**\n• All at once\n• Quick transition\n• Higher risk\n• For smaller systems\n\n**Phased/Incremental**\n• Staged deployment\n• By function or location\n• Learn and adjust\n• Longer timeline\n\n**Parallel**\n• Run old and new simultaneously\n• Verify results match\n• Higher cost\n• Lower risk\n\n**Pilot**\n• Limited initial deployment\n• Test with subset\n• Expand based on success\n• Reduces risk",
        },
        {
          title: 'Data Migration Controls',
          type: 'text',
          content: "**Migration Controls:**\n\n**Pre-Migration**\n• Data cleansing\n• Mapping old to new\n• Migration scripts tested\n• Backup of source data\n\n**During Migration**\n• Reconciliation controls\n• Error handling\n• Audit trail\n• Progress monitoring\n\n**Post-Migration**\n• Data validation\n• Completeness verification\n• Accuracy testing\n• User verification\n\n**Common Risks:**\n• Data loss\n• Data corruption\n• Incomplete migration\n• Performance issues",
        },
        {
          title: 'Rollback Planning',
          type: 'text',
          content: "**Rollback Essentials:**\n\n**Why Rollback is Critical:**\n• Changes may fail\n• Unexpected issues arise\n• Business continuity\n\n**Rollback Plan Components:**\n• Rollback decision criteria\n• Rollback steps documented\n• Rollback tested\n• Rollback timeframe defined\n• Communication plan\n\n**Decision Authority:**\n• Who decides to rollback?\n• When must decision be made?\n• Escalation path\n\n**⚠️ Note:** No rollback plan = much higher risk. Always have an exit strategy.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Change management: request, assess, authorize, implement, review",
            "Change types: standard (pre-approved), normal, emergency, major",
            "Implementation strategies: big bang, phased, parallel, pilot",
            "Data migration requires pre, during, and post controls",
            "Rollback plans are essential for all significant changes",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-008',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Post-Implementation Review',
    description: 'Learn to evaluate project success and capture lessons learned',
    order: 8,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['PIR', 'Benefits Realization', 'Lessons Learned', 'Project Closure'],
    blueprintArea: 'CISA3-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Post-implementation review closes the loop on project governance. It validates that benefits are realized and captures knowledge for future projects.",
        },
        {
          title: 'PIR Objectives',
          type: 'text',
          content: "**Post-Implementation Review Goals:**\n\n**1. Benefits Realization**\n• Compare actual to expected benefits\n• Measure ROI achieved\n• Identify unrealized benefits\n• Plan for remaining benefits\n\n**2. Lessons Learned**\n• What went well?\n• What could be improved?\n• Unexpected challenges?\n• Best practices identified\n\n**3. Project Performance**\n• Budget vs. actual\n• Schedule vs. actual\n• Scope delivered\n• Quality achieved\n\n**4. Handover Verification**\n• Documentation complete?\n• Support transitioned?\n• Knowledge transferred?\n• Training completed?",
        },
        {
          title: 'PIR Timing',
          type: 'table',
          headers: ['Review Type', 'Timing', 'Focus'],
          rows: [
            ['Implementation Review', '1-4 weeks post go-live', 'Stabilization, immediate issues'],
            ['Benefits Review', '3-6 months post go-live', 'Early benefits realization'],
            ['Full PIR', '6-12 months post go-live', 'Complete assessment, lessons'],
          ],
        },
        {
          title: 'PIR Process',
          type: 'text',
          content: "**Conducting the PIR:**\n\n**1. Planning**\n• Define scope and timing\n• Identify stakeholders\n• Gather documentation\n• Schedule interviews\n\n**2. Data Collection**\n• Project metrics\n• Stakeholder interviews\n• Survey responses\n• System performance data\n\n**3. Analysis**\n• Compare to baseline\n• Identify variances\n• Root cause analysis\n• Trend identification\n\n**4. Reporting**\n• Findings documentation\n• Recommendations\n• Lessons learned log\n• Distribution to stakeholders\n\n**5. Action**\n• Address findings\n• Update methodologies\n• Share lessons learned\n• Close out project",
        },
        {
          title: 'Benefits Tracking',
          type: 'text',
          content: "**Benefits Management:**\n\n**Benefit Types:**\n• **Tangible** - Measurable (cost savings, revenue)\n• **Intangible** - Qualitative (satisfaction, morale)\n• **Direct** - Immediate results\n• **Indirect** - Secondary effects\n\n**Tracking Approach:**\n• Define metrics at project start\n• Baseline current state\n• Measure after implementation\n• Calculate benefit achieved\n• Report to stakeholders\n\n**Common Challenge:** Business cases often overstate benefits. PIR provides reality check.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "PIR validates benefits, captures lessons, and assesses project performance",
            "Conduct reviews at implementation, 3-6 months, and 6-12 months",
            "Compare actual results to business case projections",
            "Document and share lessons learned for future projects",
            "Ensure proper handover and knowledge transfer occurred",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-009',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Infrastructure and Cloud Development',
    description: 'Understand controls for infrastructure development and cloud-based systems',
    order: 9,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Cloud Development', 'IaC', 'Containerization', 'CI/CD'],
    blueprintArea: 'CISA3-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Modern development increasingly relies on cloud services and automated infrastructure. IS auditors must understand these approaches to evaluate associated controls.",
        },
        {
          title: 'Cloud Service Models',
          type: 'table',
          headers: ['Model', 'Provider Manages', 'Customer Manages'],
          rows: [
            ['IaaS', 'Hardware, virtualization, networking', 'OS, middleware, apps, data'],
            ['PaaS', 'Above + OS, middleware', 'Applications, data'],
            ['SaaS', 'Everything except data', 'Data, configuration'],
          ],
        },
        {
          title: 'Infrastructure as Code (IaC)',
          type: 'text',
          content: "**IaC Principles:**\n\nManaging infrastructure through code rather than manual processes.\n\n**Benefits:**\n• Repeatable deployments\n• Version-controlled infrastructure\n• Consistency across environments\n• Self-documenting\n• Rapid provisioning\n\n**Tools:**\n• Terraform\n• AWS CloudFormation\n• Azure Resource Manager\n• Ansible, Chef, Puppet\n\n**Control Considerations:**\n• Code review for infrastructure\n• Testing infrastructure changes\n• Secrets management\n• State file protection\n• Drift detection",
        },
        {
          title: 'Container Security',
          type: 'text',
          content: "**Container Considerations:**\n\n**Image Security**\n• Base image selection\n• Vulnerability scanning\n• Image signing\n• Registry security\n\n**Runtime Security**\n• Container isolation\n• Resource limits\n• Network policies\n• Privilege restrictions\n\n**Orchestration (Kubernetes)**\n• RBAC configuration\n• Network policies\n• Secrets management\n• Pod security standards\n\n**Key Risk:** Containers share kernel with host - isolation is critical.",
        },
        {
          title: 'CI/CD Pipeline Security',
          type: 'text',
          content: "**Continuous Integration/Continuous Delivery:**\n\n**Pipeline Stages:**\n1. Code commit\n2. Build\n3. Test\n4. Security scan\n5. Deploy to staging\n6. Deploy to production\n\n**Security Controls:**\n• Source code repository security\n• Build environment isolation\n• Automated security testing\n• Artifact signing\n• Deployment approvals\n• Environment segregation\n\n**Risks:**\n• Pipeline compromise\n• Malicious code injection\n• Credential exposure\n• Unauthorized deployment",
        },
        {
          title: 'Cloud-Native Development',
          type: 'text',
          content: "**Cloud-Native Characteristics:**\n\n• **Microservices** - Small, independent services\n• **Containers** - Packaged, portable applications\n• **Orchestration** - Automated management\n• **DevOps** - Integrated development/operations\n• **CI/CD** - Automated pipelines\n\n**Audit Considerations:**\n• Shared responsibility model\n• Data location and sovereignty\n• Configuration management\n• Identity and access management\n• Logging and monitoring\n• Incident response in cloud",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Cloud models (IaaS, PaaS, SaaS) differ in responsibility split",
            "IaC enables version-controlled, repeatable infrastructure",
            "Container security includes image, runtime, and orchestration controls",
            "CI/CD pipelines require security controls at each stage",
            "Cloud-native development requires adapted audit approaches",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-010',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Configuration and Release Management',
    description: 'Learn controls for managing configurations and software releases',
    order: 10,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Configuration Management', 'CMDB', 'Release Management', 'Versioning'],
    blueprintArea: 'CISA3-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Configuration management maintains knowledge of system components. Without it, troubleshooting, auditing, and change management become nearly impossible.",
        },
        {
          title: 'Configuration Management Database (CMDB)',
          type: 'text',
          content: "**CMDB Purpose:**\n\nCentralized repository of configuration items (CIs) and their relationships.\n\n**Configuration Items Include:**\n• Hardware components\n• Software applications\n• Documentation\n• Services\n• Relationships between items\n\n**CMDB Uses:**\n• Impact analysis for changes\n• Root cause analysis\n• Asset management\n• Compliance verification\n• Service mapping\n\n**CMDB Challenges:**\n• Keeping data current\n• Discovering all items\n• Maintaining relationships\n• Integration with other tools",
        },
        {
          title: 'Configuration Management Activities',
          type: 'table',
          headers: ['Activity', 'Purpose', 'Output'],
          rows: [
            ['Identification', 'Define CIs to track', 'CI naming standards'],
            ['Control', 'Manage CI changes', 'Baseline management'],
            ['Status Accounting', 'Track CI status', 'Status reports'],
            ['Verification/Audit', 'Confirm accuracy', 'Audit findings'],
          ],
        },
        {
          title: 'Baseline Management',
          type: 'text',
          content: "**Baseline Concepts:**\n\n**What is a Baseline?**\nA formally approved snapshot of a configuration at a point in time.\n\n**Types of Baselines:**\n• **Development baseline** - Approved design\n• **Test baseline** - Ready for testing\n• **Production baseline** - Deployed configuration\n• **Security baseline** - Hardened configuration\n\n**Baseline Controls:**\n• Formal approval to establish\n• Change control to modify\n• Version control\n• Comparison to actual\n• Drift detection",
        },
        {
          title: 'Release Management',
          type: 'text',
          content: "**Release Management Process:**\n\n**1. Release Planning**\n• Define release scope\n• Resource planning\n• Schedule coordination\n• Dependencies identified\n\n**2. Release Build**\n• Compile release components\n• Create installation packages\n• Document release notes\n• Version everything\n\n**3. Release Testing**\n• Test in staging environment\n• Acceptance testing\n• Performance testing\n• Sign-off\n\n**4. Release Deployment**\n• Scheduled deployment\n• Communication\n• Monitoring\n• Support readiness\n\n**5. Release Review**\n• Success verification\n• Issue documentation\n• Lessons learned",
        },
        {
          title: 'Version Control',
          type: 'text',
          content: "**Version Control Best Practices:**\n\n**Versioning Standards**\n• Semantic versioning (MAJOR.MINOR.PATCH)\n• Consistent naming conventions\n• Clear changelog\n\n**Source Control**\n• All code in version control\n• Branching strategy defined\n• Merge procedures\n• Code review requirements\n\n**Configuration Control**\n• Infrastructure as code\n• Configuration files versioned\n• Environment configurations tracked\n\n**Access Controls**\n• Role-based access\n• Protected branches\n• Audit trail of changes",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CMDB tracks configuration items and their relationships",
            "Configuration activities: identify, control, status accounting, verify",
            "Baselines are approved configuration snapshots",
            "Release management includes planning, build, test, deploy, review",
            "Version control applies to code, configurations, and infrastructure",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 3D: ADDITIONAL TOPICS
  // ============================================================================

  {
    id: 'CISA3-011',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Application Controls',
    description: 'Understand input, processing, and output controls for applications',
    order: 11,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Input Controls', 'Processing Controls', 'Output Controls', 'Data Validation'],
    blueprintArea: 'CISA3-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Application controls ensure data integrity at each stage of processing. Weak controls can result in invalid, incomplete, or unauthorized transactions entering systems.",
        },
        {
          title: 'Input Controls',
          type: 'text',
          content: "**Purpose:** Ensure data entering the system is accurate, complete, and authorized.\n\n**Control Types:**\n\n**Source Document Controls**\n• Pre-numbered forms\n• Turnaround documents\n• Document cancellation\n\n**Data Entry Controls**\n• Authorization before entry\n• Batch totals\n• Input validation\n• Dual entry for critical data\n\n**Validation Checks:**\n• **Field check** - Correct data type\n• **Limit check** - Within range\n• **Reasonableness check** - Logically valid\n• **Check digit** - Numeric verification\n• **Validity check** - Matches valid values\n• **Completeness check** - Required fields present",
        },
        {
          title: 'Processing Controls',
          type: 'text',
          content: "**Purpose:** Ensure accurate and complete data transformation.\n\n**Control Types:**\n\n**Run-to-Run Totals**\n• Compare batch totals across processing steps\n• Verify no records lost or added\n\n**Programmed Controls**\n• Sequence checking\n• Limit testing\n• Duplicate checking\n• Audit trails\n\n**File Controls**\n• Header/trailer labels\n• Version checking\n• Before/after images\n\n**Exception Handling**\n• Suspense file for rejects\n• Error correction procedures\n• Management review of exceptions",
        },
        {
          title: 'Control Types Comparison',
          type: 'table',
          headers: ['Stage', 'Primary Risk', 'Key Controls'],
          rows: [
            ['Input', 'Invalid/unauthorized data', 'Validation, authorization, batch totals'],
            ['Processing', 'Incorrect transformation', 'Run-to-run totals, exception reports'],
            ['Output', 'Unauthorized disclosure', 'Distribution lists, balancing, destruction'],
          ],
        },
        {
          title: 'Output Controls',
          type: 'text',
          content: "**Purpose:** Ensure output is complete, accurate, and distributed appropriately.\n\n**Control Types:**\n\n**Completeness Controls**\n• Page numbering\n• Report totals\n• End-of-report markers\n\n**Distribution Controls**\n• Authorized distribution lists\n• Pickup confirmation\n• Secure delivery methods\n\n**Retention Controls**\n• Retention schedules\n• Secure storage\n• Proper destruction\n\n**Balancing Controls**\n• Compare output totals to input\n• Reconciliation procedures\n• Variance investigation",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Input controls prevent bad data from entering systems",
            "Validation checks include field, limit, reasonableness, and check digit",
            "Processing controls use run-to-run totals and exception handling",
            "Output controls ensure proper distribution and retention",
            "Each stage addresses different risks in the data lifecycle",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-012',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Data Migration and Conversion',
    description: 'Learn controls for migrating data between systems',
    order: 12,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Data Migration', 'ETL', 'Data Quality', 'Conversion Testing'],
    blueprintArea: 'CISA3-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Data migration is one of the highest-risk activities in system implementations. Data loss, corruption, or transformation errors can cripple new systems.",
        },
        {
          title: 'Data Migration Planning',
          type: 'text',
          content: "**Key Planning Activities:**\n\n**1. Scope Definition**\n• What data to migrate\n• What to leave behind\n• What to archive\n• Data quality thresholds\n\n**2. Source Analysis**\n• Data profiling\n• Quality assessment\n• Volume estimation\n• Relationship mapping\n\n**3. Mapping Design**\n• Field-to-field mapping\n• Transformation rules\n• Default values\n• Exception handling\n\n**4. Timing and Approach**\n• Big bang vs. phased\n• Cutover windows\n• Rollback procedures\n• Parallel run period",
        },
        {
          title: 'ETL Process',
          type: 'text',
          content: "**Extract, Transform, Load:**\n\n**Extract**\n• Pull data from source systems\n• Maintain extraction logs\n• Handle connectivity issues\n• Preserve source data\n\n**Transform**\n• Data cleansing\n• Format conversion\n• Business rule application\n• Enrichment\n\n**Load**\n• Insert into target system\n• Handle duplicates\n• Maintain referential integrity\n• Transaction management\n\n**Controls at Each Stage:**\n• Record counts\n• Hash totals\n• Exception logging\n• Audit trail",
        },
        {
          title: 'Migration Approaches',
          type: 'table',
          headers: ['Approach', 'Description', 'Risk Level'],
          rows: [
            ['Big Bang', 'All data migrated at once', 'High (single point of failure)'],
            ['Phased', 'Data migrated in segments', 'Medium (longer transition)'],
            ['Parallel Run', 'Both systems operate together', 'Lower (but expensive)'],
            ['Trickle', 'Continuous synchronization', 'Medium (complexity)'],
          ],
        },
        {
          title: 'Data Quality Controls',
          type: 'text',
          content: "**Pre-Migration Cleansing:**\n• Identify and fix data issues before migration\n• Deduplicate records\n• Standardize formats\n• Complete missing values\n\n**Migration Validation:**\n• Record count reconciliation\n• Field-level sampling\n• Business rule verification\n• User acceptance testing\n\n**Post-Migration Verification:**\n• Data integrity checks\n• Relationship validation\n• Business process testing\n• Exception resolution",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Migration planning includes scope, source analysis, mapping, and timing",
            "ETL covers extract, transform, load with controls at each stage",
            "Migration approaches: big bang, phased, parallel, trickle",
            "Data quality controls apply before, during, and after migration",
            "Always maintain rollback capability and audit trails",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-013',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Post-Implementation Review',
    description: 'Conduct effective post-implementation reviews and lessons learned',
    order: 13,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['PIR', 'Benefits Realization', 'Lessons Learned', 'Project Closure'],
    blueprintArea: 'CISA3-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Post-implementation reviews verify that projects delivered promised benefits and capture lessons for future projects. Without PIR, organizations repeat mistakes and fail to measure success.",
        },
        {
          title: 'PIR Objectives',
          type: 'text',
          content: "**Purpose of Post-Implementation Review:**\n\n**1. Benefits Verification**\n• Were expected benefits achieved?\n• Are there unexpected benefits?\n• What benefits are still unrealized?\n\n**2. Performance Assessment**\n• Is the system performing as designed?\n• Are service levels being met?\n• Are users satisfied?\n\n**3. Process Evaluation**\n• Was the project well managed?\n• Were estimates accurate?\n• What worked well?\n\n**4. Lessons Capture**\n• What should be repeated?\n• What should be improved?\n• How to apply lessons going forward?",
        },
        {
          title: 'PIR Timing',
          type: 'text',
          content: "**When to Conduct PIR:**\n\n**Immediate (1-3 months post go-live)**\n• Technical performance\n• Stabilization issues\n• User adoption challenges\n• Critical defects\n\n**Intermediate (6-12 months)**\n• Benefits realization progress\n• Process improvements\n• User proficiency\n• Operational metrics\n\n**Long-term (12-24 months)**\n• Full benefits realization\n• Strategic alignment\n• Total cost of ownership\n• Business value delivered\n\n**Key:** Schedule PIR timing at project initiation so resources are committed.",
        },
        {
          title: 'PIR Assessment Areas',
          type: 'table',
          headers: ['Area', 'Questions to Answer'],
          rows: [
            ['Scope', 'Was scope delivered? Were changes managed?'],
            ['Schedule', 'Was timeline met? What caused delays?'],
            ['Budget', 'Was budget met? What caused variances?'],
            ['Quality', 'Were quality targets met? Defect rates?'],
            ['Benefits', 'Are benefits being realized? When full realization?'],
            ['User Satisfaction', 'Are users adopting? What is feedback?'],
          ],
        },
        {
          title: 'Benefits Realization',
          type: 'text',
          content: "**Benefits Realization Management:**\n\n**Define Benefits**\n• Specific, measurable benefits\n• Baseline measurements\n• Target values\n• Owner accountable\n\n**Track Progress**\n• Regular measurement\n• Variance analysis\n• Root cause investigation\n• Course correction\n\n**Report and Learn**\n• Benefits dashboard\n• Stakeholder communication\n• Lessons for future cases\n\n**Common Pitfalls:**\n• Benefits not defined measurably\n• No baseline established\n• Benefits owner not assigned\n• No tracking mechanism",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "PIR verifies benefits, assesses performance, and captures lessons",
            "Conduct PIR at multiple intervals: immediate, intermediate, long-term",
            "Assessment covers scope, schedule, budget, quality, benefits, users",
            "Benefits realization requires measurable goals, baselines, and tracking",
            "Schedule PIR at project initiation to ensure commitment",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA3-014',
    courseId: 'cisa',
    section: 'CISA3',
    title: 'Vendor and Third-Party Management',
    description: 'Manage risks from vendors, contractors, and third-party providers',
    order: 14,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Vendor Selection', 'Contract Management', 'SLA', 'Third-Party Risk'],
    blueprintArea: 'CISA3-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Organizations increasingly rely on third parties for development and operations. Vendor failures directly impact the organization, making third-party risk management essential.",
        },
        {
          title: 'Vendor Selection Process',
          type: 'text',
          content: "**Selection Steps:**\n\n**1. Requirements Definition**\n• Functional requirements\n• Technical requirements\n• Security requirements\n• Compliance requirements\n\n**2. RFP/RFI Process**\n• Request for Information (preliminary)\n• Request for Proposal (detailed)\n• Structured evaluation criteria\n• Weighted scoring\n\n**3. Due Diligence**\n• Financial viability\n• References check\n• Security assessment\n• Onsite visits\n• Proof of concept\n\n**4. Contract Negotiation**\n• Terms and conditions\n• Service levels\n• Penalties and incentives\n• Exit provisions",
        },
        {
          title: 'Contract Key Provisions',
          type: 'table',
          headers: ['Provision', 'Purpose'],
          rows: [
            ['SLA', 'Define performance expectations'],
            ['Right to Audit', 'Enable oversight and verification'],
            ['Data Ownership', 'Clarify who owns data'],
            ['Security Requirements', 'Specify security controls'],
            ['Termination Rights', 'Enable exit if needed'],
            ['Liability', 'Allocate risk appropriately'],
            ['Dispute Resolution', 'Define escalation process'],
            ['Change Management', 'Control scope changes'],
          ],
        },
        {
          title: 'Service Level Agreements',
          type: 'text',
          content: "**SLA Components:**\n\n**Performance Metrics**\n• Availability (uptime percentage)\n• Response time\n• Resolution time\n• Throughput\n\n**Measurement**\n• How metrics are measured\n• Reporting frequency\n• Exclusions (maintenance windows)\n\n**Consequences**\n• Service credits for misses\n• Termination for repeated failure\n• Incentives for exceeding\n\n**Review**\n• Regular SLA review\n• Adjustment process\n• Dispute resolution\n\n**Example SLA:**\n• 99.9% availability (8.76 hours downtime/year)\n• 4-hour response for Priority 1\n• Monthly reporting",
        },
        {
          title: 'Ongoing Vendor Management',
          type: 'text',
          content: "**Continuous Oversight:**\n\n**Performance Monitoring**\n• Track SLA compliance\n• Review service reports\n• Address issues promptly\n\n**Relationship Management**\n• Regular governance meetings\n• Escalation procedures\n• Feedback mechanisms\n\n**Risk Reassessment**\n• Annual risk assessment\n• SOC report review\n• Security assessments\n• Financial health monitoring\n\n**Exit Planning**\n• Maintain exit strategy\n• Data portability\n• Knowledge transfer\n• Transition support",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Vendor selection includes requirements, RFP, due diligence, and contracting",
            "Key contract provisions: SLA, audit rights, data ownership, termination",
            "SLAs define performance expectations with measurable metrics",
            "Ongoing management includes monitoring, governance, and risk reassessment",
            "Always maintain exit strategy and data portability",
          ],
        },
      ],
    },
  },
];

export default cisa3Lessons;
