/**
 * CISA Domain 3: Information Systems Acquisition, Development and Implementation
 * Batch 2 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA3_QUESTIONS_BATCH2: Question[] = [
  {
    id: 'CISA3-003',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'The PRIMARY purpose of a feasibility study for a new IT project is to:',
    options: [
      'Develop detailed technical specifications',
      'Determine if the project is viable and worth pursuing',
      'Create the project schedule',
      'Assign project team members'
    ],
    correctAnswer: 1,
    explanation: 'A feasibility study determines whether a project is viable from technical, operational, economic, and scheduling perspectives before committing significant resources.',
    topic: 'Project Initiation',
    subtopic: 'Feasibility Study'
  },
  {
    id: 'CISA3-004',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'When reviewing system requirements, an IS auditor should be MOST concerned if:',
    options: [
      'Requirements are documented in a standard format',
      'Users were involved in requirements gathering',
      'Requirements are not traceable to business needs',
      'Requirements include performance criteria'
    ],
    correctAnswer: 2,
    explanation: 'Requirements that cannot be traced to business needs may result in features that do not add value. Traceability ensures all requirements support business objectives.',
    topic: 'Requirements',
    subtopic: 'Traceability'
  },
  {
    id: 'CISA3-005',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'The software development life cycle (SDLC) phase where detailed design specifications are created is:',
    options: [
      'Requirements analysis',
      'System design',
      'Implementation',
      'Maintenance'
    ],
    correctAnswer: 1,
    explanation: 'During the system design phase, detailed technical specifications including architecture, data models, and interface designs are created based on the requirements.',
    topic: 'SDLC',
    subtopic: 'Design Phase'
  },
  {
    id: 'CISA3-006',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'The Agile development methodology is characterized by:',
    options: [
      'Extensive upfront documentation',
      'Iterative development with frequent feedback',
      'Rigid phase gates',
      'Minimal user involvement'
    ],
    correctAnswer: 1,
    explanation: 'Agile uses iterative development cycles (sprints) with frequent customer feedback, enabling rapid adaptation to changing requirements and continuous improvement.',
    topic: 'Development Methodologies',
    subtopic: 'Agile'
  },
  {
    id: 'CISA3-007',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'The waterfall development model is MOST appropriate when:',
    options: [
      'Requirements are likely to change frequently',
      'Requirements are well-defined and stable',
      'Rapid prototyping is required',
      'User involvement is limited'
    ],
    correctAnswer: 1,
    explanation: 'Waterfall is best suited for projects with well-defined, stable requirements because changes are costly once development progresses beyond initial phases.',
    topic: 'Development Methodologies',
    subtopic: 'Waterfall'
  },
  {
    id: 'CISA3-008',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Configuration management ensures that:',
    options: [
      'Software is developed faster',
      'Changes to software components are controlled and tracked',
      'Developers work independently',
      'Testing is minimized'
    ],
    correctAnswer: 1,
    explanation: 'Configuration management provides control and tracking of changes to software components, ensuring integrity and enabling rollback if issues arise.',
    topic: 'Development Controls',
    subtopic: 'Configuration Management'
  },
  {
    id: 'CISA3-009',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Source code version control is important because it:',
    options: [
      'Speeds up compilation',
      'Tracks changes and enables recovery of previous versions',
      'Eliminates the need for testing',
      'Reduces storage requirements'
    ],
    correctAnswer: 1,
    explanation: 'Version control tracks all changes to source code, identifies who made changes, and enables recovery of previous versions if needed.',
    topic: 'Development Controls',
    subtopic: 'Version Control'
  },
  {
    id: 'CISA3-010',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Code review is MOST effective for detecting:',
    options: [
      'Performance issues under load',
      'Logical errors and security vulnerabilities',
      'Hardware compatibility issues',
      'User interface problems'
    ],
    correctAnswer: 1,
    explanation: 'Code review examines source code for logical errors, security vulnerabilities, coding standards violations, and potential bugs before execution.',
    topic: 'Quality Assurance',
    subtopic: 'Code Review'
  },
  {
    id: 'CISA3-011',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Unit testing verifies:',
    options: [
      'Integration between system components',
      'Individual modules or functions work as designed',
      'System performance under load',
      'User acceptance of the system'
    ],
    correctAnswer: 1,
    explanation: 'Unit testing verifies that individual modules, functions, or components work correctly in isolation before integration with other components.',
    topic: 'Testing',
    subtopic: 'Unit Testing'
  },
  {
    id: 'CISA3-012',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Integration testing focuses on:',
    options: [
      'Individual module functionality',
      'Data flow and interfaces between components',
      'User acceptance',
      'System performance'
    ],
    correctAnswer: 1,
    explanation: 'Integration testing verifies that components work together correctly, focusing on interfaces, data flow, and communication between integrated modules.',
    topic: 'Testing',
    subtopic: 'Integration Testing'
  },
  {
    id: 'CISA3-013',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'User acceptance testing (UAT) should be performed by:',
    options: [
      'Developers',
      'Quality assurance team',
      'Business users',
      'IT operations'
    ],
    correctAnswer: 2,
    explanation: 'UAT should be performed by business users who verify that the system meets their requirements and is suitable for their intended use.',
    topic: 'Testing',
    subtopic: 'UAT'
  },
  {
    id: 'CISA3-014',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Regression testing is performed to ensure that:',
    options: [
      'New features work correctly',
      'Changes do not break existing functionality',
      'Performance meets requirements',
      'Security controls are effective'
    ],
    correctAnswer: 1,
    explanation: 'Regression testing verifies that changes or fixes do not inadvertently break existing functionality that was previously working correctly.',
    topic: 'Testing',
    subtopic: 'Regression Testing'
  },
  {
    id: 'CISA3-015',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Stress testing evaluates:',
    options: [
      'Normal operating conditions',
      'System behavior under extreme conditions',
      'User interface design',
      'Data accuracy'
    ],
    correctAnswer: 1,
    explanation: 'Stress testing evaluates system behavior under extreme conditions (high load, limited resources) to identify breaking points and failure modes.',
    topic: 'Testing',
    subtopic: 'Stress Testing'
  },
  {
    id: 'CISA3-016',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'The PRIMARY purpose of a pilot implementation is to:',
    options: [
      'Train all users at once',
      'Test the system in a limited production environment',
      'Avoid user involvement',
      'Reduce implementation costs'
    ],
    correctAnswer: 1,
    explanation: 'Pilot implementation tests the system in a limited production environment with a subset of users to identify issues before full rollout.',
    topic: 'Implementation',
    subtopic: 'Pilot'
  },
  {
    id: 'CISA3-017',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Parallel implementation involves:',
    options: [
      'Implementing the new system immediately',
      'Running old and new systems simultaneously',
      'Testing in phases',
      'Implementing at multiple locations'
    ],
    correctAnswer: 1,
    explanation: 'Parallel implementation runs both old and new systems simultaneously, allowing comparison of outputs and providing a fallback if the new system fails.',
    topic: 'Implementation',
    subtopic: 'Parallel'
  },
  {
    id: 'CISA3-018',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Data conversion during system implementation should:',
    options: [
      'Be performed without validation',
      'Include data cleansing and validation',
      'Only include current data',
      'Be done after go-live'
    ],
    correctAnswer: 1,
    explanation: 'Data conversion should include cleansing and validation to ensure data quality and accuracy in the new system. Poor data migration can cause significant issues.',
    topic: 'Implementation',
    subtopic: 'Data Conversion'
  },
  {
    id: 'CISA3-019',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Post-implementation review should assess:',
    options: [
      'Only technical performance',
      'Whether project objectives were achieved',
      'Only budget variance',
      'Code quality only'
    ],
    correctAnswer: 1,
    explanation: 'Post-implementation review assesses whether project objectives were achieved, comparing actual outcomes to expected benefits and identifying lessons learned.',
    topic: 'Implementation',
    subtopic: 'Post-Implementation Review'
  },
  {
    id: 'CISA3-020',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'When evaluating packaged software, the MOST important criterion is:',
    options: [
      'Lowest cost',
      'Fit with business requirements',
      'Vendor market share',
      'Latest technology'
    ],
    correctAnswer: 1,
    explanation: 'The most important criterion is how well the software fits business requirements. Even low-cost or popular solutions fail if they don\'t meet the organization\'s needs.',
    topic: 'Software Acquisition',
    subtopic: 'Selection Criteria'
  },
  {
    id: 'CISA3-021',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'A request for proposal (RFP) should include:',
    options: [
      'Only technical requirements',
      'Requirements, evaluation criteria, and contract terms',
      'Vendor names',
      'Budget details'
    ],
    correctAnswer: 1,
    explanation: 'An RFP should include detailed requirements, evaluation criteria, timeline, and contract terms to enable vendors to provide complete proposals.',
    topic: 'Software Acquisition',
    subtopic: 'RFP'
  },
  {
    id: 'CISA3-022',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Software escrow agreements protect the organization by:',
    options: [
      'Reducing license costs',
      'Ensuring access to source code if vendor fails',
      'Eliminating support needs',
      'Automating updates'
    ],
    correctAnswer: 1,
    explanation: 'Escrow agreements ensure the organization can access source code if the vendor goes out of business or fails to meet obligations, enabling continued maintenance.',
    topic: 'Software Acquisition',
    subtopic: 'Escrow'
  },
  {
    id: 'CISA3-023',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Rapid application development (RAD) emphasizes:',
    options: [
      'Extensive documentation',
      'Quick development through prototyping and iteration',
      'Minimal user involvement',
      'Sequential phases'
    ],
    correctAnswer: 1,
    explanation: 'RAD emphasizes quick development through prototyping, user feedback, and rapid iteration, trading some formality for speed.',
    topic: 'Development Methodologies',
    subtopic: 'RAD'
  },
  {
    id: 'CISA3-024',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'DevOps practices primarily aim to:',
    options: [
      'Eliminate testing requirements',
      'Improve collaboration between development and operations',
      'Reduce security controls',
      'Minimize documentation'
    ],
    correctAnswer: 1,
    explanation: 'DevOps aims to improve collaboration between development and operations teams, enabling faster, more reliable software delivery through automation and shared responsibility.',
    topic: 'Development Methodologies',
    subtopic: 'DevOps'
  },
  {
    id: 'CISA3-025',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Continuous integration (CI) involves:',
    options: [
      'Deploying directly to production',
      'Frequently merging code changes with automated testing',
      'Manual code review only',
      'Quarterly releases'
    ],
    correctAnswer: 1,
    explanation: 'CI involves frequently merging code changes into a shared repository with automated building and testing to detect integration issues early.',
    topic: 'Development Practices',
    subtopic: 'CI/CD'
  },
  {
    id: 'CISA3-026',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Object-oriented programming provides benefits including:',
    options: [
      'Faster compilation',
      'Code reusability through inheritance',
      'Eliminated need for testing',
      'Reduced development team size'
    ],
    correctAnswer: 1,
    explanation: 'Object-oriented programming benefits include code reusability through inheritance, encapsulation for data protection, and modularity for maintainability.',
    topic: 'Programming Concepts',
    subtopic: 'OOP'
  },
  {
    id: 'CISA3-027',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Input validation controls should be implemented:',
    options: [
      'Only on the server side',
      'On both client and server sides',
      'Only on the client side',
      'Only for numeric fields'
    ],
    correctAnswer: 1,
    explanation: 'Input validation should occur on both client side (for user experience) and server side (for security). Client-side validation alone can be bypassed by attackers.',
    topic: 'Application Controls',
    subtopic: 'Input Validation'
  },
  {
    id: 'CISA3-028',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Application programming interfaces (APIs) require:',
    options: [
      'No security controls',
      'Authentication and authorization controls',
      'Only internal use',
      'Manual invocation'
    ],
    correctAnswer: 1,
    explanation: 'APIs require authentication and authorization controls to ensure only authorized systems and users can access functionality and data they are permitted to use.',
    topic: 'Application Development',
    subtopic: 'API Security'
  },
  {
    id: 'CISA3-029',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Database normalization reduces:',
    options: [
      'Query performance',
      'Data redundancy',
      'Security controls',
      'Storage costs only'
    ],
    correctAnswer: 1,
    explanation: 'Database normalization reduces data redundancy by organizing data into related tables, improving data integrity and reducing storage waste.',
    topic: 'Database Design',
    subtopic: 'Normalization'
  },
  {
    id: 'CISA3-030',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'The PRIMARY control for preventing SQL injection attacks is:',
    options: [
      'Encryption of database',
      'Use of parameterized queries',
      'Network segmentation',
      'Database replication'
    ],
    correctAnswer: 1,
    explanation: 'Parameterized queries (prepared statements) prevent SQL injection by separating SQL code from data, ensuring user input is treated as data, not executable code.',
    topic: 'Application Security',
    subtopic: 'SQL Injection'
  },
  {
    id: 'CISA3-031',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Web application firewalls (WAFs) protect against:',
    options: [
      'Physical intrusion',
      'Application-layer attacks like XSS and injection',
      'Network bandwidth issues',
      'Hardware failures'
    ],
    correctAnswer: 1,
    explanation: 'WAFs protect against application-layer attacks including cross-site scripting (XSS), SQL injection, and other web application vulnerabilities.',
    topic: 'Application Security',
    subtopic: 'WAF'
  },
  {
    id: 'CISA3-032',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'System documentation should be updated:',
    options: [
      'Only during initial development',
      'Whenever changes are made to the system',
      'Annually regardless of changes',
      'Only by external auditors'
    ],
    correctAnswer: 1,
    explanation: 'System documentation should be updated whenever changes are made to ensure it accurately reflects the current system state and supports maintenance.',
    topic: 'Documentation',
    subtopic: 'Maintenance'
  },
];

export default CISA3_QUESTIONS_BATCH2;
