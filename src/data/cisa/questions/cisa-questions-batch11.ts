/**
 * CISA All Domains Batch 11
 * 100 questions across all 5 domains
 * Certified Information Systems Auditor exam preparation
 */

import { Question } from '../../../types';

const ALL_BATCH11: Question[] = [
  // ===========================================================================
  // DOMAIN 1: INFORMATION SYSTEMS AUDITING PROCESS (20 questions)
  // ===========================================================================
  
  {
    id: 'CISA1-B11-001',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'An IS auditor should be organizationally independent to ensure:',
    options: [
      'Maximum audit coverage',
      'Objectivity in judgments and recommendations',
      'Timely completion of audits',
      'Access to all information'
    ],
    correctAnswer: 1,
    explanation: 'Organizational independence ensures the auditor can perform work objectively without influence from the areas being audited.',
    topic: 'Standards and Ethics',
    subtopic: 'Independence'
  },
  {
    id: 'CISA1-B11-002',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Control self-assessment (CSA) primarily relies on:',
    options: [
      'External auditors',
      'Facilitated sessions where staff assess their own controls',
      'Automated testing tools',
      'Board oversight'
    ],
    correctAnswer: 1,
    explanation: 'CSA uses facilitated workshops or surveys where staff members assess the adequacy and effectiveness of controls in their areas.',
    topic: 'Execution',
    subtopic: 'CSA'
  },
  {
    id: 'CISA1-B11-003',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Substantive testing is designed to:',
    options: [
      'Test control effectiveness',
      'Detect material errors or irregularities',
      'Review documentation',
      'Assess management competence'
    ],
    correctAnswer: 1,
    explanation: 'Substantive testing detects material misstatements by examining transactions and balances rather than testing controls.',
    topic: 'Execution',
    subtopic: 'Test Types'
  },
  {
    id: 'CISA1-B11-004',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Compliance testing verifies:',
    options: [
      'Accuracy of financial data',
      'Controls are operating as designed',
      'Application functionality',
      'User satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'Compliance testing (tests of controls) determines whether prescribed controls are being followed and operating effectively.',
    topic: 'Execution',
    subtopic: 'Test Types'
  },
  {
    id: 'CISA1-B11-005',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Variable sampling is used to:',
    options: [
      'Test control compliance',
      'Estimate monetary values or amounts',
      'Count items only',
      'Test presence/absence of attributes'
    ],
    correctAnswer: 1,
    explanation: 'Variable sampling is used to estimate dollar values, such as the total value of errors in a population.',
    topic: 'Execution',
    subtopic: 'Sampling Methods'
  },
  {
    id: 'CISA1-B11-006',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Stratified sampling divides the population into:',
    options: [
      'Random groups',
      'Homogeneous subgroups to improve efficiency',
      'Equal-sized segments',
      'Alphabetical order'
    ],
    correctAnswer: 1,
    explanation: 'Stratification divides the population into homogeneous subgroups (strata), allowing more efficient sampling from each subgroup.',
    topic: 'Execution',
    subtopic: 'Sampling Methods'
  },
  {
    id: 'CISA1-B11-007',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Audit charter should define:',
    options: [
      'Specific test procedures',
      'Authority, responsibility, and scope of the audit function',
      'Individual audit schedules',
      'Staff salaries'
    ],
    correctAnswer: 1,
    explanation: 'The audit charter formally establishes the audit function\'s authority, responsibility, scope, and relationship to the organization.',
    topic: 'Planning',
    subtopic: 'Audit Charter'
  },
  {
    id: 'CISA1-B11-008',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When reviewing prior audit reports, an IS auditor should PRIMARILY focus on:',
    options: [
      'Formatting consistency',
      'Status of prior findings and corrective actions',
      'Auditor names',
      'Report length'
    ],
    correctAnswer: 1,
    explanation: 'Prior reports inform current planning, especially regarding unresolved findings and corrective action effectiveness.',
    topic: 'Planning',
    subtopic: 'Prior Audits'
  },
  {
    id: 'CISA1-B11-009',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Interview techniques should include:',
    options: [
      'Only closed-ended questions',
      'Open-ended questions, active listening, and documentation',
      'Leading questions',
      'Minimal preparation'
    ],
    correctAnswer: 1,
    explanation: 'Effective interviews use open-ended questions to elicit detailed responses, active listening to understand, and thorough documentation.',
    topic: 'Execution',
    subtopic: 'Interview Techniques'
  },
  {
    id: 'CISA1-B11-010',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Embedded audit modules (EAMs):',
    options: [
      'Are installed after systems go live',
      'Are built into application systems to capture audit information',
      'Only work with spreadsheets',
      'Replace all other audit techniques'
    ],
    correctAnswer: 1,
    explanation: 'EAMs are coded into applications during development to continuously capture specified transactions or events for audit purposes.',
    topic: 'CAATs',
    subtopic: 'Embedded Audit Modules'
  },
  {
    id: 'CISA1-B11-011',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Parallel simulation involves:',
    options: [
      'Running two audits simultaneously',
      'Reprocessing data using auditor-controlled programs to compare results',
      'Auditing parallel systems',
      'Simulating interviews'
    ],
    correctAnswer: 1,
    explanation: 'Parallel simulation uses auditor-written programs to reprocess data and compare results with production output to verify processing accuracy.',
    topic: 'CAATs',
    subtopic: 'Parallel Simulation'
  },
  {
    id: 'CISA1-B11-012',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Audit trail analysis examines:',
    options: [
      'Physical pathways',
      'Chronological transaction logs to trace events and changes',
      'Network topology',
      'Staff movements'
    ],
    correctAnswer: 1,
    explanation: 'Audit trail analysis reviews chronological logs of system activities to trace transactions from origin to destination.',
    topic: 'CAATs',
    subtopic: 'Log Analysis'
  },
  {
    id: 'CISA1-B11-013',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Draft audit reports should be reviewed with:',
    options: [
      'Media representatives',
      'Auditee management to verify factual accuracy',
      'Competitors',
      'All employees'
    ],
    correctAnswer: 1,
    explanation: 'Discussing draft reports with auditee management ensures factual accuracy, allows response, and builds constructive relationships.',
    topic: 'Reporting',
    subtopic: 'Draft Review'
  },
  {
    id: 'CISA1-B11-014',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Risk ratings in audit findings should reflect:',
    options: [
      'Auditor opinion only',
      'Impact and likelihood of the risk if the control weakness is not addressed',
      'Management preference',
      'Ease of remediation'
    ],
    correctAnswer: 1,
    explanation: 'Risk ratings should objectively reflect the potential impact and likelihood of adverse events if the issue is not corrected.',
    topic: 'Reporting',
    subtopic: 'Risk Rating'
  },
  {
    id: 'CISA1-B11-015',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Exit conferences serve to:',
    options: [
      'Formally end the auditor relationship',
      'Present findings and obtain management responses before finalizing',
      'Celebrate audit completion',
      'Assign blame'
    ],
    correctAnswer: 1,
    explanation: 'Exit conferences present preliminary findings, ensure accuracy, obtain management commitment to action, and build constructive dialogue.',
    topic: 'Reporting',
    subtopic: 'Exit Conference'
  },
  {
    id: 'CISA1-B11-016',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Confidentiality requirements for audit information mean:',
    options: [
      'Information can be shared freely',
      'Sensitive information is protected and disclosed only as authorized',
      'All findings are public',
      'No documentation is retained'
    ],
    correctAnswer: 1,
    explanation: 'Auditors must protect sensitive information obtained during audits and only disclose as authorized or required.',
    topic: 'Standards and Ethics',
    subtopic: 'Confidentiality'
  },
  {
    id: 'CISA1-B11-017',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'easy',
    question: 'Continuing professional education (CPE) ensures:',
    options: [
      'Higher salaries',
      'Auditors maintain current knowledge and skills',
      'More vacation time',
      'Shorter audits'
    ],
    correctAnswer: 1,
    explanation: 'CPE requirements ensure auditors stay current with evolving technologies, standards, and best practices.',
    topic: 'Standards and Ethics',
    subtopic: 'Professional Development'
  },
  {
    id: 'CISA1-B11-018',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Risk assessment in audit planning considers:',
    options: [
      'Only financial exposure',
      'Inherent risk, control risk, and detection risk',
      'Only compliance requirements',
      'Only technology age'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive risk assessment considers inherent risk (what could go wrong), control risk (controls might not prevent), and detection risk (audit might not detect).',
    topic: 'Planning',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CISA1-B11-019',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit scope should be:',
    options: [
      'As broad as possible',
      'Defined based on objectives and risk assessment',
      'Determined only by the auditee',
      'Identical for all audits'
    ],
    correctAnswer: 1,
    explanation: 'Scope is determined by audit objectives and risk assessment, ensuring appropriate coverage without overextending resources.',
    topic: 'Planning',
    subtopic: 'Scope Definition'
  },
  {
    id: 'CISA1-B11-020',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'When scope limitations are imposed, the auditor should:',
    options: [
      'Accept without question',
      'Document limitations and consider impact on the audit opinion',
      'Cancel the audit',
      'Ignore the limitation'
    ],
    correctAnswer: 1,
    explanation: 'Scope limitations must be documented, and the auditor should assess and disclose how they affect audit conclusions.',
    topic: 'Planning',
    subtopic: 'Scope Limitations'
  },

  // ===========================================================================
  // DOMAIN 2: GOVERNANCE AND MANAGEMENT OF IT (16 questions)
  // ===========================================================================
  
  {
    id: 'CISA2-B11-021',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT strategic planning should:',
    options: [
      'Be performed solely by IT',
      'Align with and support business strategy',
      'Focus only on technology',
      'Be updated only during crises'
    ],
    correctAnswer: 1,
    explanation: 'IT strategy must align with business objectives to ensure technology investments support organizational goals.',
    topic: 'IT Governance',
    subtopic: 'Strategic Planning'
  },
  {
    id: 'CISA2-B11-022',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Key performance indicators (KPIs) should be:',
    options: [
      'As many as possible',
      'Specific, measurable, and aligned with objectives',
      'Only financial',
      'Set by vendors'
    ],
    correctAnswer: 1,
    explanation: 'Effective KPIs are SMART (specific, measurable, achievable, relevant, time-bound) and aligned with organizational objectives.',
    topic: 'IT Management',
    subtopic: 'Performance Measurement'
  },
  {
    id: 'CISA2-B11-023',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'easy',
    question: 'IT risk assessment should be:',
    options: [
      'Performed once and filed',
      'Ongoing and updated as conditions change',
      'Only following incidents',
      'Performed by external parties only'
    ],
    correctAnswer: 1,
    explanation: 'Risk assessment is a continuous process, updated as the environment, threats, and organization change.',
    topic: 'IT Risk Management',
    subtopic: 'Risk Assessment Process'
  },
  {
    id: 'CISA2-B11-024',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Residual risk is:',
    options: [
      'The initial risk before controls',
      'Risk remaining after controls are applied',
      'Risk that cannot be identified',
      'Risk from external sources only'
    ],
    correctAnswer: 1,
    explanation: 'Residual risk is the risk remaining after risk treatment (controls, transfers, etc.) has been applied.',
    topic: 'IT Risk Management',
    subtopic: 'Risk Concepts'
  },
  {
    id: 'CISA2-B11-025',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'easy',
    question: 'Risk treatment options include:',
    options: [
      'Only accept or avoid',
      'Accept, mitigate, transfer, or avoid',
      'Only implement controls',
      'Only buy insurance'
    ],
    correctAnswer: 1,
    explanation: 'Risk can be accepted, mitigated (controls), transferred (insurance, outsourcing), or avoided (eliminating the activity).',
    topic: 'IT Risk Management',
    subtopic: 'Risk Treatment'
  },
  {
    id: 'CISA2-B11-026',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'IT policies differ from procedures because:',
    options: [
      'They are the same',
      'Policies state what must happen; procedures describe how',
      'Procedures are more important',
      'Policies are optional'
    ],
    correctAnswer: 1,
    explanation: 'Policies define requirements and expectations; procedures provide step-by-step instructions for implementing policies.',
    topic: 'IT Management',
    subtopic: 'Policies and Procedures'
  },
  {
    id: 'CISA2-B11-027',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Succession planning for IT ensures:',
    options: [
      'Everyone has a backup',
      'Key roles can be filled when vacancies occur',
      'Promotions are automatic',
      'No documentation is needed'
    ],
    correctAnswer: 1,
    explanation: 'Succession planning identifies and develops individuals to fill key roles, ensuring continuity when personnel changes occur.',
    topic: 'IT Management',
    subtopic: 'Human Resources'
  },
  {
    id: 'CISA2-B11-028',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Outsourcing governance should ensure:',
    options: [
      'Vendor independence from oversight',
      'Clear accountability, monitoring, and contract management',
      'No internal involvement',
      'Lower costs only'
    ],
    correctAnswer: 1,
    explanation: 'Outsourcing governance maintains clear accountability, monitors vendor performance, manages contracts, and ensures security and compliance.',
    topic: 'Vendor Management',
    subtopic: 'Outsourcing Governance'
  },
  {
    id: 'CISA2-B11-029',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'easy',
    question: 'Right to audit clauses in contracts:',
    options: [
      'Are not necessary',
      'Allow the organization to examine vendor controls and performance',
      'Only apply to financial auditors',
      'Are illegal'
    ],
    correctAnswer: 1,
    explanation: 'Right to audit clauses allow the organization to review vendor compliance, security, and performance at agreed intervals.',
    topic: 'Vendor Management',
    subtopic: 'Contract Terms'
  },
  {
    id: 'CISA2-B11-030',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Data ownership responsibilities include:',
    options: [
      'IT decisions only',
      'Classification, access decisions, and ensuring data quality',
      'Only backup scheduling',
      'Only storage management'
    ],
    correctAnswer: 1,
    explanation: 'Data owners (typically business) classify data, authorize access, and are accountable for data quality and appropriate use.',
    topic: 'IT Governance',
    subtopic: 'Data Governance'
  },
  {
    id: 'CISA2-B11-031',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT investment management ensures:',
    options: [
      'All projects are approved',
      'IT spending delivers value aligned with business priorities',
      'Maximum spending on IT',
      'No governance is needed'
    ],
    correctAnswer: 1,
    explanation: 'IT investment management ensures technology investments deliver expected value and are prioritized based on business needs.',
    topic: 'IT Governance',
    subtopic: 'Investment Management'
  },
  {
    id: 'CISA2-B11-032',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Portfolio management for IT enables:',
    options: [
      'Only project tracking',
      'Holistic view and optimization of IT investments across programs',
      'Only vendor selection',
      'Only cost tracking'
    ],
    correctAnswer: 1,
    explanation: 'IT portfolio management provides a holistic view of all IT investments, enabling optimization and alignment with strategic goals.',
    topic: 'IT Governance',
    subtopic: 'Portfolio Management'
  },
  {
    id: 'CISA2-B11-033',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'easy',
    question: 'Regulatory compliance programs should:',
    options: [
      'Only address fines after they occur',
      'Proactively identify requirements, implement controls, and monitor compliance',
      'Only respond to auditors',
      'Be delegated entirely to legal'
    ],
    correctAnswer: 1,
    explanation: 'Effective compliance programs proactively identify applicable requirements, implement appropriate controls, and continuously monitor conformance.',
    topic: 'IT Governance',
    subtopic: 'Compliance'
  },
  {
    id: 'CISA2-B11-034',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Change advisory board (CAB) reviews:',
    options: [
      'Only emergency changes',
      'Proposed changes to assess risk, prioritize, and authorize',
      'Only failed changes',
      'Only vendor changes'
    ],
    correctAnswer: 1,
    explanation: 'CAB assesses proposed changes for risk, prioritizes them, and provides authorization before implementation.',
    topic: 'IT Management',
    subtopic: 'Change Management'
  },
  {
    id: 'CISA2-B11-035',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'easy',
    question: 'Emergency changes require:',
    options: [
      'No documentation',
      'Expedited approval and post-implementation documentation/review',
      'No testing',
      'No authorization'
    ],
    correctAnswer: 1,
    explanation: 'Emergency changes need expedited authorization, but should still be documented, tested appropriately, and reviewed post-implementation.',
    topic: 'IT Management',
    subtopic: 'Change Management'
  },
  {
    id: 'CISA2-B11-036',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'IT asset management should maintain:',
    options: [
      'Only hardware lists',
      'Complete inventory of hardware, software, and their relationships',
      'Only software licenses',
      'Only financial values'
    ],
    correctAnswer: 1,
    explanation: 'Asset management maintains complete inventory of IT assets including hardware, software, licenses, and their interdependencies.',
    topic: 'IT Management',
    subtopic: 'Asset Management'
  },

  // ===========================================================================
  // DOMAIN 3: ISA, DEVELOPMENT AND IMPLEMENTATION (18 questions)
  // ===========================================================================
  
  {
    id: 'CISA3-B11-037',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Business case development should include:',
    options: [
      'Only cost estimates',
      'Benefits, costs, risks, and alternatives analysis',
      'Only technical specifications',
      'Only timeline'
    ],
    correctAnswer: 1,
    explanation: 'Business cases analyze expected benefits, costs, risks, and alternatives to support informed decision-making.',
    topic: 'Project Management',
    subtopic: 'Business Case'
  },
  {
    id: 'CISA3-B11-038',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Project risk management includes:',
    options: [
      'Only risk identification',
      'Identification, analysis, response planning, and monitoring',
      'Only risk avoidance',
      'Only risk transfer'
    ],
    correctAnswer: 1,
    explanation: 'Complete risk management includes identifying risks, analyzing probability/impact, planning responses, and ongoing monitoring.',
    topic: 'Project Management',
    subtopic: 'Risk Management'
  },
  {
    id: 'CISA3-B11-039',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Earned value management measures:',
    options: [
      'Only cost',
      'Project progress by comparing planned vs. actual work and cost',
      'Only schedule',
      'Only quality'
    ],
    correctAnswer: 1,
    explanation: 'Earned value compares planned work, completed work, and actual costs to measure schedule and cost performance.',
    topic: 'Project Management',
    subtopic: 'Project Monitoring'
  },
  {
    id: 'CISA3-B11-040',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Functional requirements describe:',
    options: [
      'System performance levels',
      'What the system should do from the user perspective',
      'Hardware specifications',
      'Security controls only'
    ],
    correctAnswer: 1,
    explanation: 'Functional requirements describe the business functions and features the system must provide to meet user needs.',
    topic: 'SDLC',
    subtopic: 'Requirements'
  },
  {
    id: 'CISA3-B11-041',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Non-functional requirements include:',
    options: [
      'Business processes',
      'Performance, security, usability, and reliability standards',
      'User stories only',
      'Business rules only'
    ],
    correctAnswer: 1,
    explanation: 'Non-functional requirements specify quality attributes like performance, security, availability, and usability rather than specific functions.',
    topic: 'SDLC',
    subtopic: 'Requirements'
  },
  {
    id: 'CISA3-B11-042',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Design reviews should verify:',
    options: [
      'Only documentation format',
      'Requirements are addressed and architecture is appropriate',
      'Only cost estimates',
      'Only developer assignments'
    ],
    correctAnswer: 1,
    explanation: 'Design reviews ensure the proposed design addresses all requirements and the architecture is appropriate for the solution.',
    topic: 'SDLC',
    subtopic: 'Design Review'
  },
  {
    id: 'CISA3-B11-043',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Unit testing focuses on:',
    options: [
      'Entire system integration',
      'Individual components or modules in isolation',
      'User acceptance',
      'Performance under load'
    ],
    correctAnswer: 1,
    explanation: 'Unit testing verifies that individual components function correctly in isolation before integration.',
    topic: 'Testing',
    subtopic: 'Unit Testing'
  },
  {
    id: 'CISA3-B11-044',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'System testing verifies:',
    options: [
      'Individual units',
      'The complete integrated system meets specifications',
      'Only performance',
      'Only security'
    ],
    correctAnswer: 1,
    explanation: 'System testing validates the complete integrated system against requirements and specifications.',
    topic: 'Testing',
    subtopic: 'System Testing'
  },
  {
    id: 'CISA3-B11-045',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Load testing determines:',
    options: [
      'Functional correctness',
      'System behavior under expected and peak usage conditions',
      'Security vulnerabilities',
      'Code quality'
    ],
    correctAnswer: 1,
    explanation: 'Load testing evaluates system performance and stability under expected and peak load conditions.',
    topic: 'Testing',
    subtopic: 'Performance Testing'
  },
  {
    id: 'CISA3-B11-046',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Stress testing goes beyond load testing by:',
    options: [
      'Using fewer users',
      'Pushing systems beyond normal capacity to identify breaking points',
      'Testing only business logic',
      'Avoiding peak loads'
    ],
    correctAnswer: 1,
    explanation: 'Stress testing deliberately overwhelms system resources to identify failure points and recovery behavior.',
    topic: 'Testing',
    subtopic: 'Performance Testing'
  },
  {
    id: 'CISA3-B11-047',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Configuration management during development ensures:',
    options: [
      'Faster coding',
      'Version control and traceability of all project artifacts',
      'No documentation needed',
      'Automatic testing'
    ],
    correctAnswer: 1,
    explanation: 'Configuration management controls versions and changes to all project artifacts, ensuring traceability and controlled baselines.',
    topic: 'Development Controls',
    subtopic: 'Configuration Management'
  },
  {
    id: 'CISA3-B11-048',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Secure coding practices include:',
    options: [
      'Speed over security',
      'Input validation, output encoding, and secure session management',
      'Avoiding all frameworks',
      'Minimal testing'
    ],
    correctAnswer: 1,
    explanation: 'Secure coding includes validating input, encoding output, secure authentication/session handling, and following security guidelines.',
    topic: 'Secure Development',
    subtopic: 'Secure Coding'
  },
  {
    id: 'CISA3-B11-049',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'DAST (dynamic application security testing) tests:',
    options: [
      'Source code statically',
      'Running applications for vulnerabilities',
      'Only documentation',
      'Only performance'
    ],
    correctAnswer: 1,
    explanation: 'DAST tests running applications by simulating attacks to find vulnerabilities in deployed systems.',
    topic: 'Secure Development',
    subtopic: 'Security Testing'
  },
  {
    id: 'CISA3-B11-050',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'IAST (interactive application security testing) combines:',
    options: [
      'Only manual testing',
      'Elements of SAST and DAST with runtime instrumentation',
      'Only network testing',
      'Only code review'
    ],
    correctAnswer: 1,
    explanation: 'IAST combines static and dynamic analysis with runtime instrumentation for more accurate vulnerability detection.',
    topic: 'Secure Development',
    subtopic: 'Security Testing'
  },
  {
    id: 'CISA3-B11-051',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Cutover planning for system go-live should address:',
    options: [
      'Only training schedules',
      'Data migration, fallback procedures, and rollback criteria',
      'Only user communication',
      'Only vendor contracts'
    ],
    correctAnswer: 1,
    explanation: 'Cutover planning includes data migration, fallback/rollback procedures, go/no-go criteria, and coordination activities.',
    topic: 'Implementation',
    subtopic: 'Cutover Planning'
  },
  {
    id: 'CISA3-B11-052',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Pilot implementation:',
    options: [
      'Deploys to all users at once',
      'Deploys to a limited group first to validate before full rollout',
      'Is the same as parallel running',
      'Requires no testing'
    ],
    correctAnswer: 1,
    explanation: 'Pilot deploys to a limited scope (users, locations, functions) to validate the solution before broader rollout.',
    topic: 'Implementation',
    subtopic: 'Implementation Strategies'
  },
  {
    id: 'CISA3-B11-053',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'System documentation should include:',
    options: [
      'Only source code',
      'Technical, operational, and user documentation',
      'Only test results',
      'Only project plans'
    ],
    correctAnswer: 1,
    explanation: 'Complete documentation includes technical (architecture, design), operational (procedures), and user documentation.',
    topic: 'Implementation',
    subtopic: 'Documentation'
  },
  {
    id: 'CISA3-B11-054',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Maintenance types include:',
    options: [
      'Only bug fixes',
      'Corrective, adaptive, perfective, and preventive maintenance',
      'Only enhancements',
      'Only security patches'
    ],
    correctAnswer: 1,
    explanation: 'Maintenance includes corrective (fixing errors), adaptive (environment changes), perfective (improvements), and preventive (proactive changes).',
    topic: 'Implementation',
    subtopic: 'System Maintenance'
  },

  // ===========================================================================
  // DOMAIN 4: IS OPERATIONS AND BUSINESS RESILIENCE (20 questions)
  // ===========================================================================
  
  {
    id: 'CISA4-B11-055',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'IT service desk is responsible for:',
    options: [
      'Only hardware repair',
      'Initial contact, logging, and resolution or escalation of user issues',
      'Only software development',
      'Only network management'
    ],
    correctAnswer: 1,
    explanation: 'Service desk provides single point of contact for users, logging incidents and requests, resolving or escalating as appropriate.',
    topic: 'IT Service Management',
    subtopic: 'Service Desk'
  },
  {
    id: 'CISA4-B11-056',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Priority for incident resolution should be based on:',
    options: [
      'First-come first-served',
      'Impact and urgency of the incident',
      'User seniority',
      'Incident complexity'
    ],
    correctAnswer: 1,
    explanation: 'Incident priority combines impact (how many affected, how badly) and urgency (how quickly resolution is needed).',
    topic: 'IT Service Management',
    subtopic: 'Incident Management'
  },
  {
    id: 'CISA4-B11-057',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Known error database (KEDB) contains:',
    options: [
      'Only unresolved issues',
      'Documented problems with known root causes and workarounds',
      'Only user complaints',
      'Only automated tickets'
    ],
    correctAnswer: 1,
    explanation: 'KEDB documents known problems, their root causes, and available workarounds to speed incident resolution.',
    topic: 'IT Service Management',
    subtopic: 'Problem Management'
  },
  {
    id: 'CISA4-B11-058',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Configuration management database (CMDB):',
    options: [
      'Only tracks software',
      'Contains configuration items and their relationships',
      'Only tracks incidents',
      'Replaces asset management'
    ],
    correctAnswer: 1,
    explanation: 'CMDB stores configuration items (CIs) and their relationships, supporting change and incident management.',
    topic: 'IT Service Management',
    subtopic: 'Configuration Management'
  },
  {
    id: 'CISA4-B11-059',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Batch processing controls should ensure:',
    options: [
      'Only speed',
      'Complete and accurate processing with proper authorization',
      'No logging required',
      'Manual intervention always'
    ],
    correctAnswer: 1,
    explanation: 'Batch controls ensure authorized, complete, accurate processing with proper control totals and error handling.',
    topic: 'IT Operations',
    subtopic: 'Batch Processing'
  },
  {
    id: 'CISA4-B11-060',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Output controls verify:',
    options: [
      'Input accuracy',
      'Completeness, accuracy, and proper distribution of processing output',
      'Processing speed',
      'Storage capacity'
    ],
    correctAnswer: 1,
    explanation: 'Output controls ensure output is complete, accurate, distributed only to authorized recipients, and properly handled.',
    topic: 'IT Operations',
    subtopic: 'Application Controls'
  },
  {
    id: 'CISA4-B11-061',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Network monitoring should detect:',
    options: [
      'Only outages',
      'Performance issues, security threats, and availability problems',
      'Only configuration errors',
      'Only authorized traffic'
    ],
    correctAnswer: 1,
    explanation: 'Network monitoring detects performance degradation, security threats, availability issues, and abnormal traffic patterns.',
    topic: 'IT Operations',
    subtopic: 'Network Management'
  },
  {
    id: 'CISA4-B11-062',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Mean time between failures (MTBF) measures:',
    options: [
      'Repair time',
      'Average time a system operates before failing',
      'Downtime only',
      'Cost of failure'
    ],
    correctAnswer: 1,
    explanation: 'MTBF measures reliability as the average time between system failures, indicating how long equipment typically runs before failing.',
    topic: 'IT Operations',
    subtopic: 'Availability Metrics'
  },
  {
    id: 'CISA4-B11-063',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Mean time to repair (MTTR) measures:',
    options: [
      'Time between failures',
      'Average time to restore service after a failure',
      'System uptime',
      'Preventive maintenance time'
    ],
    correctAnswer: 1,
    explanation: 'MTTR measures maintainability as the average time required to repair and restore service after a failure.',
    topic: 'IT Operations',
    subtopic: 'Availability Metrics'
  },
  {
    id: 'CISA4-B11-064',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Maximum tolerable downtime (MTD) differs from RTO because:',
    options: [
      'They are the same',
      'MTD is overall business tolerance; RTO is specific recovery target',
      'MTD is always shorter',
      'RTO is business driven, MTD is technical'
    ],
    correctAnswer: 1,
    explanation: 'MTD is the maximum time a business can survive without a process; RTO is the target time for recovery, which must be shorter than MTD.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Metrics'
  },
  {
    id: 'CISA4-B11-065',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Work recovery time (WRT) addresses:',
    options: [
      'System restoration only',
      'Time needed to catch up on work after system restoration',
      'Hardware replacement',
      'Staff training'
    ],
    correctAnswer: 1,
    explanation: 'WRT is the time needed to verify and catch up on work after systems are restored, before normal operations resume.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Metrics'
  },
  {
    id: 'CISA4-B11-066',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Mobile site recovery refers to:',
    options: [
      'Recovery for mobile devices',
      'Transportable recovery facilities that can be deployed to needed locations',
      'Cloud recovery',
      'Virtual recovery'
    ],
    correctAnswer: 1,
    explanation: 'Mobile sites are transportable facilities (trailers, modular units) that can be deployed to the impacted location as needed.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Sites'
  },
  {
    id: 'CISA4-B11-067',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Reciprocal agreements for DR:',
    options: [
      'Are always reliable',
      'Share facilities between organizations but may have limitations',
      'Provide guaranteed capacity',
      'Are the same as hot sites'
    ],
    correctAnswer: 1,
    explanation: 'Reciprocal agreements provide mutual backup capabilities but may have capacity, compatibility, and commitment limitations.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Agreements'
  },
  {
    id: 'CISA4-B11-068',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'DR testing lessons learned should:',
    options: [
      'Be documented but ignored',
      'Drive improvements to plans and procedures',
      'Only be shared with testers',
      'Be kept confidential from management'
    ],
    correctAnswer: 1,
    explanation: 'Lessons learned should be documented, shared with stakeholders, and used to improve DR plans and procedures.',
    topic: 'Business Continuity',
    subtopic: 'DR Testing'
  },
  {
    id: 'CISA4-B11-069',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Data replication strategies range from:',
    options: [
      'Only synchronous',
      'Synchronous to asynchronous with different RPO implications',
      'Only tape backup',
      'Only cloud backup'
    ],
    correctAnswer: 1,
    explanation: 'Synchronous replication has zero data loss (RPO=0) but higher cost; asynchronous has some data loss but is more practical for distance.',
    topic: 'Business Continuity',
    subtopic: 'Data Replication'
  },
  {
    id: 'CISA4-B11-070',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Geographic diversity in DR:',
    options: [
      'Is unnecessary with proper backups',
      'Protects against regional disasters affecting both sites',
      'Increases risk',
      'Is only for compliance'
    ],
    correctAnswer: 1,
    explanation: 'Geographic diversity ensures the recovery site is far enough to avoid the same regional disaster affecting both primary and backup.',
    topic: 'Business Continuity',
    subtopic: 'Site Selection'
  },
  {
    id: 'CISA4-B11-071',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'easy',
    question: 'Pandemic planning differs from traditional DR because:',
    options: [
      'They are identical',
      'Pandemics affect people over extended periods rather than facilities',
      'Pandemics only affect IT',
      'No planning is possible'
    ],
    correctAnswer: 1,
    explanation: 'Pandemic planning focuses on people, prolonged impacts, and operations continuity when staff are unavailable, not physical facilities.',
    topic: 'Business Continuity',
    subtopic: 'Pandemic Planning'
  },
  {
    id: 'CISA4-B11-072',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Command center activation procedures should:',
    options: [
      'Wait for management approval',
      'Be pre-defined with clear triggers and responsibilities',
      'Be improvised during emergencies',
      'Only involve IT'
    ],
    correctAnswer: 1,
    explanation: 'Activation procedures should be pre-defined with clear triggers, roles, responsibilities, and escalation paths.',
    topic: 'Business Continuity',
    subtopic: 'Emergency Response'
  },
  {
    id: 'CISA4-B11-073',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Testing recovery of individual applications is called:',
    options: [
      'Full interruption test',
      'Component or functional test',
      'Parallel test',
      'Tabletop exercise'
    ],
    correctAnswer: 1,
    explanation: 'Component testing validates individual applications or system components can be recovered successfully.',
    topic: 'Business Continuity',
    subtopic: 'DR Testing Types'
  },
  {
    id: 'CISA4-B11-074',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Backup power transfer switches:',
    options: [
      'Are optional',
      'Enable transition between utility and generator power',
      'Only work manually',
      'Replace UPS'
    ],
    correctAnswer: 1,
    explanation: 'Transfer switches manage the transition from utility power to generator power (automatic or manual) during outages.',
    topic: 'IT Operations',
    subtopic: 'Power Management'
  },

  // ===========================================================================
  // DOMAIN 5: PROTECTION OF INFORMATION ASSETS (26 questions)
  // ===========================================================================
  
  {
    id: 'CISA5-B11-075',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Defense in depth strategy uses:',
    options: [
      'One strong control',
      'Multiple layers of security controls',
      'Only perimeter security',
      'Only encryption'
    ],
    correctAnswer: 1,
    explanation: 'Defense in depth deploys multiple security layers so if one fails, others continue to provide protection.',
    topic: 'Security Concepts',
    subtopic: 'Defense in Depth'
  },
  {
    id: 'CISA5-B11-076',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security controls are classified as:',
    options: [
      'Only technical controls',
      'Administrative, technical, and physical controls',
      'Only prevention controls',
      'Only monitoring controls'
    ],
    correctAnswer: 1,
    explanation: 'Security controls include administrative (policies, training), technical (software, hardware), and physical (locks, guards).',
    topic: 'Security Concepts',
    subtopic: 'Control Classification'
  },
  {
    id: 'CISA5-B11-077',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Compensating controls are used when:',
    options: [
      'Primary controls are sufficient',
      'Primary controls cannot be implemented and alternative measures are needed',
      'No risk exists',
      'Compliance is not required'
    ],
    correctAnswer: 1,
    explanation: 'Compensating controls provide alternative measures when primary controls cannot be implemented but risk must still be mitigated.',
    topic: 'Security Concepts',
    subtopic: 'Compensating Controls'
  },
  {
    id: 'CISA5-B11-078',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Attribute-based access control (ABAC):',
    options: [
      'Only uses roles',
      'Makes decisions based on attributes of users, resources, and environment',
      'Is simpler than RBAC',
      'Does not scale'
    ],
    correctAnswer: 1,
    explanation: 'ABAC evaluates attributes (user, resource, action, context) to make flexible, fine-grained access decisions.',
    topic: 'Access Control',
    subtopic: 'Access Control Models'
  },
  {
    id: 'CISA5-B11-079',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Access recertification ensures:',
    options: [
      'More access is granted over time',
      'Access rights remain appropriate as roles and requirements change',
      'All access is permanent',
      'Only new access is reviewed'
    ],
    correctAnswer: 1,
    explanation: 'Periodic recertification validates that user access remains appropriate for current job responsibilities.',
    topic: 'Access Control',
    subtopic: 'Access Review'
  },
  {
    id: 'CISA5-B11-080',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Privilege creep occurs when:',
    options: [
      'Users lose access over time',
      'Users accumulate unnecessary access as they change roles',
      'Privileges are reviewed regularly',
      'Access is properly revoked'
    ],
    correctAnswer: 1,
    explanation: 'Privilege creep happens when users retain old access rights as they move to new roles, accumulating excessive permissions.',
    topic: 'Access Control',
    subtopic: 'Access Management'
  },
  {
    id: 'CISA5-B11-081',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'VPN provides:',
    options: [
      'Only faster connections',
      'Encrypted tunnels for secure communication over untrusted networks',
      'Only access control',
      'Only authentication'
    ],
    correctAnswer: 1,
    explanation: 'VPNs create encrypted tunnels allowing secure communication over public/untrusted networks.',
    topic: 'Network Security',
    subtopic: 'VPN'
  },
  {
    id: 'CISA5-B11-082',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'NAC (network access control) provides:',
    options: [
      'Only authentication',
      'Endpoint compliance verification before granting network access',
      'Only network speed',
      'Only monitoring'
    ],
    correctAnswer: 1,
    explanation: 'NAC verifies that connecting devices meet security requirements (antivirus, patches) before allowing network access.',
    topic: 'Network Security',
    subtopic: 'NAC'
  },
  {
    id: 'CISA5-B11-083',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Symmetric encryption uses:',
    options: [
      'Different keys for encryption and decryption',
      'The same key for encryption and decryption',
      'No keys',
      'Only for signatures'
    ],
    correctAnswer: 1,
    explanation: 'Symmetric encryption uses the same secret key for both encryption and decryption, requiring secure key exchange.',
    topic: 'Cryptography',
    subtopic: 'Symmetric Encryption'
  },
  {
    id: 'CISA5-B11-084',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Asymmetric encryption uses:',
    options: [
      'One shared key',
      'Public and private key pairs',
      'No encryption',
      'Only hashing'
    ],
    correctAnswer: 1,
    explanation: 'Asymmetric encryption uses mathematically related key pairs - public key encrypts, corresponding private key decrypts.',
    topic: 'Cryptography',
    subtopic: 'Asymmetric Encryption'
  },
  {
    id: 'CISA5-B11-085',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Hashing provides:',
    options: [
      'Encryption',
      'Integrity verification through fixed-length output',
      'Access control',
      'Authentication only'
    ],
    correctAnswer: 1,
    explanation: 'Hashing creates a fixed-length digest that verifies data integrity - any change produces a different hash.',
    topic: 'Cryptography',
    subtopic: 'Hashing'
  },
  {
    id: 'CISA5-B11-086',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Key management includes:',
    options: [
      'Only key creation',
      'Generation, distribution, storage, rotation, and destruction',
      'Only key storage',
      'Only key backup'
    ],
    correctAnswer: 1,
    explanation: 'Key management encompasses the full lifecycle: generation, distribution, storage, use, rotation, archival, and destruction.',
    topic: 'Cryptography',
    subtopic: 'Key Management'
  },
  {
    id: 'CISA5-B11-087',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Security event logs should be:',
    options: [
      'Deleted immediately',
      'Protected, retained, and regularly reviewed',
      'Accessible to all users',
      'Stored only locally'
    ],
    correctAnswer: 1,
    explanation: 'Security logs should be protected from tampering, retained per policy, and regularly reviewed for security monitoring.',
    topic: 'Security Operations',
    subtopic: 'Log Management'
  },
  {
    id: 'CISA5-B11-088',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Threat intelligence provides:',
    options: [
      'Only historical data',
      'Actionable information about threats to support defense decisions',
      'Only vendor marketing',
      'Only compliance data'
    ],
    correctAnswer: 1,
    explanation: 'Threat intelligence provides context about threats, attackers, and techniques to inform defensive decisions and priorities.',
    topic: 'Security Operations',
    subtopic: 'Threat Intelligence'
  },
  {
    id: 'CISA5-B11-089',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Patch management should prioritize based on:',
    options: [
      'Vendor release order',
      'Vulnerability severity and asset criticality',
      'Alphabetical order',
      'Patch size'
    ],
    correctAnswer: 1,
    explanation: 'Patches should be prioritized based on vulnerability severity, exploit availability, and the criticality of affected assets.',
    topic: 'Security Operations',
    subtopic: 'Patch Management'
  },
  {
    id: 'CISA5-B11-090',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security orchestration, automation, and response (SOAR):',
    options: [
      'Replaces all security staff',
      'Automates and coordinates security operations and incident response',
      'Only provides dashboards',
      'Only sends alerts'
    ],
    correctAnswer: 1,
    explanation: 'SOAR integrates security tools, automates workflows, and coordinates responses to improve efficiency and speed.',
    topic: 'Security Operations',
    subtopic: 'SOAR'
  },
  {
    id: 'CISA5-B11-091',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Endpoint protection platforms (EPP) provide:',
    options: [
      'Only antivirus',
      'Integrated protection including antimalware, firewall, and device control',
      'Only network protection',
      'Only data loss prevention'
    ],
    correctAnswer: 1,
    explanation: 'EPP integrates multiple endpoint protections including antimalware, personal firewall, device control, and more.',
    topic: 'Endpoint Security',
    subtopic: 'EPP'
  },
  {
    id: 'CISA5-B11-092',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'EDR (endpoint detection and response) differs from EPP because:',
    options: [
      'They are identical',
      'EDR focuses on detection, investigation, and response to threats',
      'EDR only prevents threats',
      'EPP provides more visibility'
    ],
    correctAnswer: 1,
    explanation: 'EDR provides visibility into endpoint activity, detects suspicious behavior, and enables investigation and response beyond prevention.',
    topic: 'Endpoint Security',
    subtopic: 'EDR'
  },
  {
    id: 'CISA5-B11-093',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Vishing attacks use:',
    options: [
      'Only email',
      'Voice calls to manipulate victims',
      'Only text messages',
      'Only websites'
    ],
    correctAnswer: 1,
    explanation: 'Vishing (voice phishing) uses phone calls to socially engineer victims into revealing information or taking actions.',
    topic: 'Security Threats',
    subtopic: 'Social Engineering'
  },
  {
    id: 'CISA5-B11-094',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Business email compromise (BEC) typically involves:',
    options: [
      'Mass phishing',
      'Impersonating executives to trick employees into unauthorized actions',
      'Only malware delivery',
      'Only spam'
    ],
    correctAnswer: 1,
    explanation: 'BEC attacks impersonate executives or trusted parties to trick employees into wire transfers or data disclosure.',
    topic: 'Security Threats',
    subtopic: 'BEC'
  },
  {
    id: 'CISA5-B11-095',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Incident classification helps:',
    options: [
      'Avoid documentation',
      'Prioritize response and allocate appropriate resources',
      'Reduce incidents',
      'Eliminate all risk'
    ],
    correctAnswer: 1,
    explanation: 'Classification categorizes incidents by type and severity to prioritize response and allocate appropriate resources.',
    topic: 'Incident Management',
    subtopic: 'Incident Classification'
  },
  {
    id: 'CISA5-B11-096',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Evidence volatility order in forensics prioritizes:',
    options: [
      'Hardest to collect first',
      'Most volatile (memory) before less volatile (disk) evidence',
      'Largest files first',
      'Oldest data first'
    ],
    correctAnswer: 1,
    explanation: 'Volatile evidence (memory, running processes) must be collected first before it changes or disappears.',
    topic: 'Incident Management',
    subtopic: 'Digital Forensics'
  },
  {
    id: 'CISA5-B11-097',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'easy',
    question: 'Mantrap/airlock physical access controls:',
    options: [
      'Only control vehicles',
      'Prevent tailgating by requiring one door to close before another opens',
      'Only provide power backup',
      'Only monitor cameras'
    ],
    correctAnswer: 1,
    explanation: 'Mantraps prevent tailgating by trapping individuals between two doors that cannot be open simultaneously.',
    topic: 'Physical Security',
    subtopic: 'Physical Access Control'
  },
  {
    id: 'CISA5-B11-098',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Privacy by design requires:',
    options: [
      'Adding privacy after development',
      'Building privacy protections into systems from the beginning',
      'Only compliance documentation',
      'Only privacy policies'
    ],
    correctAnswer: 1,
    explanation: 'Privacy by design embeds privacy protections into system design from inception rather than adding them later.',
    topic: 'Privacy',
    subtopic: 'Privacy by Design'
  },
  {
    id: 'CISA5-B11-099',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Data subject rights under privacy regulations include:',
    options: [
      'Only access rights',
      'Access, correction, deletion, and portability rights',
      'Only deletion rights',
      'No specific rights'
    ],
    correctAnswer: 1,
    explanation: 'Modern privacy regulations grant data subjects rights including access, correction, erasure, portability, and objection.',
    topic: 'Privacy',
    subtopic: 'Data Subject Rights'
  },
  {
    id: 'CISA5-B11-100',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Cloud security responsibilities are:',
    options: [
      'Entirely the cloud provider\'s',
      'Shared between provider and customer based on service model',
      'Entirely the customer\'s',
      'Not important in cloud'
    ],
    correctAnswer: 1,
    explanation: 'Cloud security follows a shared responsibility model - provider handles some controls, customer handles others, depending on IaaS/PaaS/SaaS.',
    topic: 'Cloud Security',
    subtopic: 'Shared Responsibility'
  }
];

// Export domain-specific question arrays
export const CISA1_QUESTIONS_BATCH11 = ALL_BATCH11.filter(q => q.section === 'CISA1');
export const CISA2_QUESTIONS_BATCH11 = ALL_BATCH11.filter(q => q.section === 'CISA2');
export const CISA3_QUESTIONS_BATCH11 = ALL_BATCH11.filter(q => q.section === 'CISA3');
export const CISA4_QUESTIONS_BATCH11 = ALL_BATCH11.filter(q => q.section === 'CISA4');
export const CISA5_QUESTIONS_BATCH11 = ALL_BATCH11.filter(q => q.section === 'CISA5');
