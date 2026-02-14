/**
 * CISA Domain 3 Study Guide
 * IS Acquisition, Development, and Implementation
 * 
 * Based on 2024 ISACA CISA Exam Content Outline
 * Weight: 12% (approximately 18 questions)
 */

import type { CISAStudyGuide } from './cisa1-study-guide';

export const CISA3_STUDY_GUIDE: CISAStudyGuide = {
  id: 'cisa3-study-guide',
  section: 'CISA3',
  title: 'Domain 3: IS Acquisition, Development, and Implementation',
  version: '2024',
  lastUpdated: '2026-02-10',

  examFormat: {
    totalQuestions: 150,
    questionType: 'Multiple Choice Questions (MCQ)',
    duration: '4 hours',
    passingScore: '450 scaled score (out of 800)',
  },

  blueprintAreas: [
    // =====================================================
    // Domain 3A: Project Governance and Management
    // =====================================================
    {
      id: 'CISA3-A',
      title: 'Project Governance and Management',
      weight: '~3%',
      overview: 'Understanding project governance structures, charter development, and managing the triple constraints for successful project delivery.',

      keyTopics: [
        {
          name: 'Project Charter',
          description: 'The foundational document that authorizes a project',
          keyPoints: [
            'Formal document that authorizes the project to begin',
            'Defines project scope, objectives, and success criteria',
            'Identifies key stakeholders and their roles',
            'Grants authority to the project manager',
            'Establishes governance structure and decision-making',
            'Documents initial high-level requirements',
            'Secures executive sponsorship and commitment',
            'Defines boundaries: what is in and out of scope',
          ],
        },
        {
          name: 'Triple Constraints (Iron Triangle)',
          description: 'The three interdependent constraints in project management',
          keyPoints: [
            'Scope: Features and functionality to be delivered',
            'Time: Schedule and deadlines for delivery',
            'Cost: Budget and resource expenditure',
            'Changes to one constraint affect the others',
            'Quality is sometimes considered a fourth constraint',
            'Trade-offs require stakeholder decisions',
            'Documented change control for constraint impacts',
            'Baseline established at project approval',
          ],
        },
        {
          name: 'Project Oversight and Governance',
          description: 'Structures for monitoring and controlling projects',
          keyPoints: [
            'Project Steering Committee: Executive oversight and decisions',
            'Milestone reviews at key project phases',
            'Budget tracking and variance analysis',
            'Risk management throughout project lifecycle',
            'Issue escalation and resolution processes',
            'Quality gates before phase transitions',
            'Regular status reporting to stakeholders',
            'Change control board for scope changes',
          ],
        },
        {
          name: 'Project Risk Management',
          description: 'Identifying and managing risks to project success',
          keyPoints: [
            'Risk identification during planning and ongoing',
            'Risk register documents all known risks',
            'Impact and probability assessment for prioritization',
            'Response planning: Avoid, mitigate, transfer, accept',
            'Contingency planning for high-impact risks',
            'Risk monitoring and trigger identification',
            'Regular risk review in project meetings',
            'Lessons learned capture for future projects',
          ],
        },
      ],

      criticalFormulas: [
        'Scope ↔ Time ↔ Cost (Triple Constraints)',
        'Project Success = On Time + On Budget + In Scope + Quality Achieved',
      ],

      examTips: [
        'Project Charter must be approved BEFORE project work begins',
        'Triple constraints are interdependent - change one, impact others',
        'Project Steering Committee provides executive-level decisions',
        'Risk register should be maintained throughout the project',
      ],
    },

    // =====================================================
    // Domain 3B: Development Methodologies
    // =====================================================
    {
      id: 'CISA3-B',
      title: 'Development Methodologies',
      weight: '~2%',
      overview: 'Understanding different approaches to software development and when to apply each methodology.',

      keyTopics: [
        {
          name: 'Waterfall Methodology',
          description: 'Traditional sequential development approach',
          keyPoints: [
            'Sequential phases: Requirements → Design → Development → Testing → Implementation',
            'Each phase completed before next phase begins',
            'Extensive documentation at each phase',
            'Best for: Well-defined requirements, stable technology',
            'Best for: Clear deliverables, minimal expected changes',
            'Best for: Regulatory requirements for documentation',
            'Challenges: Inflexible to change, late testing',
            'Challenges: Working software only at end of cycle',
          ],
        },
        {
          name: 'Agile Methodology',
          description: 'Iterative and incremental development approach',
          keyPoints: [
            'Iterative development in short cycles (sprints)',
            'Continuous customer feedback and adaptation',
            'Working software delivered frequently',
            'Adaptive planning responds to change',
            'Best for: Evolving requirements, rapid delivery needs',
            'Best for: High customer collaboration, flexible scope',
            'Challenges: Less documentation, scope creep risk',
            'Challenges: Requires experienced and co-located teams',
          ],
        },
        {
          name: 'Scrum Framework',
          description: 'Popular Agile framework with defined roles and ceremonies',
          keyPoints: [
            'Sprint: Time-boxed iteration (typically 2-4 weeks)',
            'Product Backlog: Prioritized list of features/requirements',
            'Sprint Backlog: Items committed for current sprint',
            'Daily Standup: Brief daily synchronization meeting (15 min)',
            'Sprint Review: Demonstrate completed work to stakeholders',
            'Sprint Retrospective: Team improvement discussion',
            'Product Owner: Prioritizes backlog, represents business',
            'Scrum Master: Facilitates process, removes impediments',
          ],
        },
        {
          name: 'Methodology Selection',
          description: 'Factors in choosing the right development approach',
          keyPoints: [
            'Requirements stability: Stable = Waterfall, Evolving = Agile',
            'Time constraints: Rapid delivery favors Agile',
            'Regulatory requirements: Heavy documentation may favor Waterfall',
            'Team experience and skills',
            'Customer availability for collaboration',
            'Project size and complexity',
            'Risk tolerance and flexibility needs',
            'Hybrid approaches combine elements of both',
          ],
        },
      ],

      examTips: [
        'Waterfall: Best for stable requirements, sequential phases',
        'Agile: Best for evolving requirements, iterative delivery',
        'Know Scrum roles: Product Owner, Scrum Master, Development Team',
        'Retrospective is for TEAM improvement, not status reporting',
      ],
    },

    // =====================================================
    // Domain 3C: SDLC Phases
    // =====================================================
    {
      id: 'CISA3-C',
      title: 'Systems Development Lifecycle (SDLC)',
      weight: '~3%',
      overview: 'Understanding each phase of the SDLC and the key activities, controls, and deliverables at each stage.',

      keyTopics: [
        {
          name: 'SDLC Phase Overview',
          description: 'Summary of all SDLC phases and their purposes',
          keyPoints: [
            'Feasibility: Analyze viability (technical, financial, operational)',
            'Requirements: Define what the system should do (business needs)',
            'Design: Determine how the system will work (architecture)',
            'Development: Build the system (coding, configuration)',
            'Testing: Verify the system works correctly',
            'Implementation: Deploy to production (go-live)',
            'Maintenance: Ongoing support, updates, and enhancements',
            'Each phase has specific deliverables and approval gates',
          ],
        },
        {
          name: 'Requirements Phase',
          description: 'Defining business needs and system requirements',
          keyPoints: [
            'Business requirements from stakeholders',
            'Functional requirements: What the system must do',
            'Non-functional requirements: Performance, security, usability',
            'Requirements traceability matrix links requirements through phases',
            'Sign-off by business stakeholders required',
            'Changes managed through formal change control',
            'Missing or unclear requirements are major risk',
            'User involvement is critical for accuracy',
          ],
        },
        {
          name: 'Defect Cost Principle',
          description: 'Understanding why early defect detection is critical',
          keyPoints: [
            'Cost to fix defects increases exponentially through phases',
            'Requirements defect: Cheapest to fix',
            'Design defect: More expensive',
            'Development defect: Costly',
            'Testing defect: Very expensive',
            'Production defect: Most expensive (10-100x requirements)',
            'Emphasizes importance of thorough early phase work',
            'Quality gates help catch defects early',
          ],
        },
        {
          name: 'Implementation and Post-Implementation',
          description: 'Deployment and stabilization activities',
          keyPoints: [
            'User training before go-live',
            'Data migration and validation',
            'Cutover planning and execution',
            'Hypercare period for intensive support',
            'Post-Implementation Review (PIR) assesses success',
            'PIR: Did project meet objectives?',
            'PIR: What lessons were learned?',
            'Formal project closure and handoff to operations',
          ],
        },
      ],

      criticalFormulas: [
        'Defect Cost: Requirements ($1) → Design ($10) → Development ($100) → Testing ($1000) → Production ($10000+)',
        'SDLC: Feasibility → Requirements → Design → Development → Testing → Implementation → Maintenance',
      ],

      examTips: [
        'Requirements errors are MOST EXPENSIVE to fix later',
        'Requirements traceability ensures all requirements are tested',
        'PIR determines if project objectives were actually met',
        'User involvement in requirements reduces defects',
      ],
    },

    // =====================================================
    // Domain 3D: Application Security
    // =====================================================
    {
      id: 'CISA3-D',
      title: 'Application Security',
      weight: '~2%',
      overview: 'Building security into applications throughout the development lifecycle.',

      keyTopics: [
        {
          name: 'OWASP Top 10 Vulnerabilities',
          description: 'Most critical web application security risks',
          keyPoints: [
            'Injection: Malicious data executed as commands (SQL injection)',
            'Broken Authentication: Session and credential vulnerabilities',
            'Cross-Site Scripting (XSS): Malicious scripts in web pages',
            'Sensitive Data Exposure: Unprotected sensitive information',
            'Broken Access Control: Missing authorization checks',
            'Security Misconfiguration: Default or wrong settings',
            'Components with Known Vulnerabilities: Outdated libraries',
            'Insufficient Logging: Cannot detect or investigate attacks',
          ],
          references: ['OWASP Top 10'],
        },
        {
          name: 'Security Testing Types',
          description: 'Different approaches to testing application security',
          keyPoints: [
            'SAST (Static Application Security Testing): Analyzes source code (white-box)',
            'DAST (Dynamic Application Security Testing): Tests running application (black-box)',
            'SCA (Software Composition Analysis): Checks dependencies and libraries',
            'IAST (Interactive AST): Combines SAST and DAST approaches',
            'Penetration Testing: Simulates real attacks pre-production',
            'Code Review: Manual inspection by security experts',
            'SAST finds issues early; DAST finds runtime issues',
            'All methods have different strengths - use together',
          ],
        },
        {
          name: 'DevSecOps Principles',
          description: 'Integrating security into DevOps practices',
          keyPoints: [
            'Security "shifts left" into development phase',
            'Automated security testing in CI/CD pipeline',
            'Security as code: Documented, version-controlled, testable',
            'Continuous security monitoring in production',
            'Collaboration between Dev, Sec, and Ops teams',
            'Security champions embedded in development teams',
            'Fast feedback loops for security issues',
            'Secure defaults and secure-by-design principles',
          ],
        },
        {
          name: 'Secure Coding Practices',
          description: 'Development practices that reduce vulnerabilities',
          keyPoints: [
            'Input validation: Validate all user input',
            'Output encoding: Prevent injection and XSS',
            'Parameterized queries: Prevent SQL injection',
            'Strong authentication and session management',
            'Principle of least privilege in code',
            'Error handling: Don\'t expose sensitive information',
            'Secure logging: Log security events without sensitive data',
            'Cryptography: Use proven libraries, not custom code',
          ],
        },
      ],

      examTips: [
        'SAST analyzes SOURCE CODE (static, white-box)',
        'DAST tests RUNNING APPLICATION (dynamic, black-box)',
        'SQL injection prevention: Use parameterized queries',
        'DevSecOps "shifts left" security into development',
      ],
    },

    // =====================================================
    // Domain 3E: Testing Types and Sequence
    // =====================================================
    {
      id: 'CISA3-E',
      title: 'Testing Types',
      weight: '~2%',
      overview: 'Understanding the testing hierarchy and the purpose of each testing level.',

      keyTopics: [
        {
          name: 'Testing Hierarchy',
          description: 'The sequence of testing from components to complete system',
          keyPoints: [
            'Unit Testing: Individual components tested by developers',
            'Integration Testing: Components working together',
            'System Testing: Complete system tested by QA team',
            'User Acceptance Testing (UAT): Business requirements by end users',
            'Regression Testing: verify changes didn\'t break existing functionality',
            'Testing sequence builds from small to large scope',
            'Each level has different objectives and performers',
            'Defects found at lower levels are cheaper to fix',
          ],
        },
        {
          name: 'User Acceptance Testing (UAT)',
          description: 'Business validation that the system meets requirements',
          keyPoints: [
            'Performed by END USERS, not QA or development',
            'Verifies BUSINESS requirements are met',
            'Business decides if system is acceptable for production',
            'Uses realistic test scenarios and data',
            'Gate for production deployment approval',
            'Sign-off required from business stakeholders',
            'Separate from functional testing by QA',
            'Focuses on business value, not technical function',
          ],
        },
        {
          name: 'Other Testing Types',
          description: 'Specialized testing for specific quality attributes',
          keyPoints: [
            'Performance Testing: Response time, throughput under load',
            'Load Testing: System behavior under expected load',
            'Stress Testing: System behavior beyond expected limits',
            'Security Testing: Vulnerability identification',
            'Usability Testing: User experience evaluation',
            'Compatibility Testing: Different environments, browsers',
            'Recovery Testing: System recovery after failure',
            'Alpha/Beta Testing: Limited release for feedback',
          ],
        },
        {
          name: 'Test Environment Management',
          description: 'Maintaining appropriate testing environments',
          keyPoints: [
            'Separate environments: Dev, Test, UAT, Production',
            'Environment parity: Test environments should mirror production',
            'Test data management: Realistic but sanitized data',
            'Environment access controls and segregation',
            'Refresh procedures for test data',
            'Configuration management for environments',
            'No production data in non-production without masking',
            'Clear promotion path between environments',
          ],
        },
      ],

      criticalFormulas: [
        'Testing Sequence: Unit → Integration → System → UAT → Regression',
      ],

      examTips: [
        'UAT is performed by END USERS, not QA or IT',
        'UAT veri fies BUSINESS requirements, not technical requirements',
        'Testing sequence: Unit → Integration → System → UAT',
        'Test environments should mirror production as closely as possible',
      ],
    },

    // =====================================================
    // Domain 3F: System Acquisition
    // =====================================================
    {
      id: 'CISA3-F',
      title: 'System Acquisition',
      weight: '~1%',
      overview: 'Evaluating build vs. buy decisions and vendor selection processes.',

      keyTopics: [
        {
          name: 'Build vs. Buy Decision',
          description: 'Factors in deciding whether to build or purchase software',
          keyPoints: [
            'Build: Longer time, higher upfront cost, full customization',
            'Build: Development risk, requires internal expertise',
            'Build: Better for unique competitive advantage',
            'Buy: Faster implementation, lower upfront cost',
            'Buy: Limited customization, vendor dependency',
            'Buy: Better for commodity functions',
            'Total Cost of Ownership (TCO) analysis required',
            'Strategic importance influences decision',
          ],
        },
        {
          name: 'Vendor Selection Process',
          description: 'Structured approach to selecting software vendors',
          keyPoints: [
            'Define requirements: Functional, technical, business',
            'Issue RFI (Request for Information) for market research',
            'Issue RFP (Request for Proposal) for detailed responses',
            'Evaluate responses against weighted criteria',
            'Demonstrations and proof of concept (POC)',
            'Due diligence on shortlisted vendors',
            'Reference checks with existing customers',
            'Contract negotiation with selected vendor',
          ],
        },
        {
          name: 'Software Evaluation Criteria',
          description: 'Factors to consider when evaluating software',
          keyPoints: [
            'Functional fit to requirements',
            'Technical architecture and integration',
            'Vendor viability and roadmap',
            'Total cost of ownership',
            'Security and compliance capabilities',
            'Implementation complexity and timeline',
            'Support and maintenance offerings',
            'User experience and training needs',
          ],
        },
      ],

      examTips: [
        'Build for competitive advantage; Buy for commodity functions',
        'RFI is for information gathering; RFP is for proposals',
        'Total Cost of Ownership includes all lifecycle costs',
        'Due diligence must happen BEFORE contract signing',
      ],
    },

    // =====================================================
    // Domain 3G: Change Management
    // =====================================================
    {
      id: 'CISA3-G',
      title: 'Change Management',
      weight: '~2%',
      overview: 'Controlling changes to the IT environment to minimize risk and ensure stability.',

      keyTopics: [
        {
          name: 'Change Control Process',
          description: 'Structured process for managing IT changes',
          keyPoints: [
            'Request: Submit RFC (Request for Change) with details',
            'Assess: Impact analysis on systems, users, business',
            'Approve: CAB (Change Advisory Board) review and decision',
            'Test: Validate change in test environment',
            'Implement: Deploy with rollback plan available',
            'Review: Post-implementation review for lessons learned',
            'All steps should be documented for audit trail',
            'Emergency changes have expedited process',
          ],
        },
        {
          name: 'Change Types',
          description: 'Categories of changes with different processes',
          keyPoints: [
            'Standard Changes: Pre-approved, low-risk, routine (password reset)',
            'Normal Changes: Full CAB review and approval process',
            'Emergency Changes: Expedited process, post-implementation approval',
            'Standard changes documented in service catalog',
            'Normal changes follow complete change process',
            'Emergency changes still require documentation and review',
            'Classification affects approval and testing requirements',
            'Trend analysis identifies opportunities for standard changes',
          ],
        },
        {
          name: 'Change Advisory Board (CAB)',
          description: 'Governance body for change approval',
          keyPoints: [
            'Reviews and approves/rejects changes',
            'Assesses impact, risk, and readiness',
            'Includes IT and business representatives',
            'Prioritizes changes and manages conflicts',
            'Manages change calendar and scheduling',
            'Emergency CAB (ECAB) for urgent changes',
            'Documents decisions and rationale',
            'Reviews post-implementation results',
          ],
        },
        {
          name: 'Change Controls',
          description: 'Key controls in the change management process',
          keyPoints: [
            'Segregation: Developers should not deploy to production',
            'Testing: All changes tested before production',
            'Approval: Authorization before implementation',
            'Scheduling: Avoid conflicts and peak periods',
            'Rollback: Plan and capability to reverse changes',
            'Documentation: Complete change records maintained',
            'Communication: Stakeholders notified of changes',
            'Review: Post-implementation validation',
          ],
        },
      ],

      criticalFormulas: [
        'Change Process: Request → Assess → Approve → Test → Implement → Review',
      ],

      examTips: [
        'Standard changes are PRE-APPROVED and low-risk',
        'Emergency changes STILL need post-implementation review',
        'Developers should NOT deploy to production (segregation)',
        'CAB includes both IT and business representatives',
      ],
    },

    // =====================================================
    // Domain 3H: Implementation Approaches
    // =====================================================
    {
      id: 'CISA3-H',
      title: 'Implementation Approaches',
      weight: '~1%',
      overview: 'Strategies for deploying systems into production with appropriate risk management.',

      keyTopics: [
        {
          name: 'Conversion Strategies',
          description: 'Different approaches to transitioning from old to new systems',
          keyPoints: [
            'Parallel: Old and new systems run together - LOWEST RISK',
            'Phased/Pilot: Implement by module or location - MEDIUM RISK',
            'Big Bang: Complete cutover at once - HIGHEST RISK',
            'Parallel: Most expensive, requires double resources',
            'Phased: Allows learning before full rollout',
            'Big Bang: Fastest, but highest failure impact',
            'Choice depends on risk tolerance and resources',
            'All approaches need rollback planning',
          ],
        },
        {
          name: 'Data Migration',
          description: 'Moving data from legacy to new systems',
          keyPoints: [
            'Data mapping between source and target',
            'Data cleansing and quality improvement',
            'Transformation rules for format changes',
            'Validation of migrated data accuracy',
            'Reconciliation of record counts and totals',
            'Rollback capability if issues found',
            'User validation of migrated data',
            'Historical data retention decisions',
          ],
        },
        {
          name: 'Post-Implementation Review (PIR)',
          description: 'Evaluation of project success after implementation',
          keyPoints: [
            'Assess if project objectives were met',
            'Identify lessons learned for future projects',
            'Document what went well and what could improve',
            'Address remaining issues and risks',
            'Formal project closure and documentation',
            'Handoff to operations and support',
            'Benefits realization tracking',
            'Stakeholder feedback collection',
          ],
        },
      ],

      criticalFormulas: [
        'Risk Level: Parallel (Lowest) → Phased (Medium) → Big Bang (Highest)',
      ],

      examTips: [
        'Parallel is SAFEST but MOST EXPENSIVE (double resources)',
        'Big Bang is FASTEST but HIGHEST RISK',
        'PIR determines if project objectives were actually met',
        'All implementations need rollback capability',
      ],
    },

    // =====================================================
    // Domain 3I: Configuration Management
    // =====================================================
    {
      id: 'CISA3-I',
      title: 'Configuration Management',
      weight: '~1%',
      overview: 'Managing and controlling IT configurations throughout the service lifecycle.',

      keyTopics: [
        {
          name: 'CMDB (Configuration Management Database)',
          description: 'Central repository for configuration information',
          keyPoints: [
            'Repository of all Configuration Items (CIs)',
            'Documents relationships between CIs',
            'Foundation for change and incident management',
            'Supports impact analysis for changes',
            'Enables root cause analysis for problems',
            'Must be kept accurate and current',
            'Discovery tools help maintain accuracy',
            'Baseline configurations for comparison',
          ],
        },
        {
          name: 'Version Control',
          description: 'Managing changes to code and configurations',
          keyPoints: [
            'Tracks all changes to source code',
            'Maintains complete history of modifications',
            'Enables branching for parallel development',
            'Supports merging of changes',
            'Enables rollback to previous versions',
            'Provides audit trail for compliance',
            'Examples: Git, SVN, Mercurial',
            'Critical for software development controls',
          ],
        },
        {
          name: 'Infrastructure as Code (IaC)',
          description: 'Managing infrastructure through code',
          keyPoints: [
            'Define infrastructure in configuration files',
            'Version controlled like application code',
            'Enables consistent, repeatable deployments',
            'Supports automated provisioning',
            'Drift detection from desired state',
            'Examples: Terraform, Ansible, CloudFormation',
            'Improves auditability and compliance',
            'Reduces manual configuration errors',
          ],
        },
      ],

      examTips: [
        'CMDB is foundation for change management and incident resolution',
        'Version control provides audit trail for code changes',
        'Infrastructure as Code enables repeatable, auditable deployments',
        'CMDB must be kept accurate - outdated CMDB is useless',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'Project Management and Methodologies', topics: ['Project charter', 'Triple constraints', 'Waterfall vs. Agile', 'Scrum'], hours: 8, activities: ['Methodology comparison', 'Project scenarios', 'MCQ practice'] },
    { week: 2, focus: 'SDLC and Application Security', topics: ['SDLC phases', 'Defect cost', 'OWASP Top 10', 'Security testing'], hours: 10, activities: ['SDLC walkthrough', 'OWASP review', 'Security testing scenarios'] },
    { week: 3, focus: 'Testing, Change, and Implementation', topics: ['Testing types', 'Change management', 'Implementation approaches', 'Configuration management'], hours: 8, activities: ['Testing sequence practice', 'Change scenarios', 'Domain 3 practice exam'] },
  ],

  examTips: [
    'Requirements errors are MOST EXPENSIVE to fix later',
    'UAT is performed by END USERS, not QA or IT',
    'Parallel implementation is SAFEST but most resource-intensive',
    'Emergency changes still need POST-IMPLEMENTATION review',
    'SAST analyzes code (static); DAST tests running application (dynamic)',
    'Segregation: Development and production must be separate',
    'Version control is essential for audit trails',
    'PIR determines if project actually met its objectives',
    'Waterfall for stable requirements; Agile for evolving requirements',
    'CAB includes both IT and business representatives',
  ],

  commonMistakes: [
    'Thinking QA performs UAT (end users perform UAT)',
    'Believing all implementations should be parallel (depends on risk tolerance)',
    'Confusing SAST (static/code) with DAST (dynamic/running application)',
    'Thinking emergency changes bypass all controls (still need review)',
    'Not understanding testing sequence: Unit → Integration → System → UAT',
    'Believing developers can deploy to production (segregation required)',
    'Forgetting that defect cost increases exponentially through phases',
    'Thinking Agile means no documentation (less, but still needed)',
  ],
};

export default CISA3_STUDY_GUIDE;
