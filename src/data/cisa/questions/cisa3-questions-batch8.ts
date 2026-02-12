/**
 * CISA Domain 3: IS Acquisition, Development and Implementation
 * Batch 8 - 30 Additional MCQs
 * Advanced exam-style questions
 */

import { Question } from '../../../types';

export const CISA3_QUESTIONS_BATCH8: Question[] = [
  {
    id: 'cisa3-173',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The MOST critical phase for security controls assessments in system development is:',
    options: [
      'Testing phase',
      'Requirements and design phase',
      'Implementation phase',
      'Maintenance phase'
    ],
    correctAnswer: 1,
    explanation: 'Security should be addressed in requirements and design where it is most cost-effective. Retrofitting security later is expensive and less effective.',
    topic: 'SDLC Security',
    subtopic: 'Security by Design'
  },
  {
    id: 'cisa3-175',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'During post-implementation review, the IS auditor should PRIMARILY verify that:',
    options: [
      'The project was completed under budget',
      'Expected business benefits are being realized',
      'All documentation is complete',
      'The system has no bugs'
    ],
    correctAnswer: 1,
    explanation: 'Post-implementation review should assess whether the expected business benefits that justified the project are being achieved.',
    topic: 'Project Management',
    subtopic: 'Post-Implementation Review'
  },
  {
    id: 'cisa3-176',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Configuration management is MOST important for:',
    options: [
      'Tracking hardware purchases',
      'Ensuring system integrity by controlling changes to system components',
      'Managing user accounts',
      'Backup scheduling'
    ],
    correctAnswer: 1,
    explanation: 'Configuration management ensures system integrity by controlling changes to system components and maintaining accurate records.',
    topic: 'Configuration Management',
    subtopic: 'Configuration Control'
  },
  {
    id: 'cisa3-177',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The BEST approach for testing an application upgrade is:',
    options: [
      'Installing directly in production with rollback capability',
      'Testing in an environment that mirrors production',
      'Testing on developer workstations',
      'Relying on vendor testing assurances'
    ],
    correctAnswer: 1,
    explanation: 'Testing should occur in an environment that mirrors production to identify issues before deployment.',
    topic: 'Testing',
    subtopic: 'Test Environment'
  },
  {
    id: 'cisa3-179',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When implementing a packaged application, the GREATEST risk is:',
    options: [
      'Vendor support availability',
      'Excessive customization that complicates future upgrades',
      'Training requirements',
      'License costs'
    ],
    correctAnswer: 1,
    explanation: 'Excessive customization creates complexity and can make future upgrades difficult or impossible.',
    topic: 'Package Implementation',
    subtopic: 'Customization Risk'
  },
  {
    id: 'cisa3-180',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An escrow agreement for software source code is important because it:',
    options: [
      'Reduces license costs',
      'Provides access to source code if the vendor fails',
      'Eliminates need for vendor support',
      'Allows unlimited modifications'
    ],
    correctAnswer: 1,
    explanation: 'Escrow agreements provide access to source code if the vendor goes out of business or fails to maintain the software.',
    topic: 'Acquisition',
    subtopic: 'Escrow Agreements'
  },
  {
    id: 'cisa3-181',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Agile development methodology is characterized by:',
    options: [
      'Complete requirements before development starts',
      'Iterative development with frequent stakeholder feedback',
      'Separate testing phase at the end',
      'Minimal documentation is always preferred'
    ],
    correctAnswer: 1,
    explanation: 'Agile uses iterative development with frequent releases and stakeholder feedback to adapt to changing requirements.',
    topic: 'Development Methodologies',
    subtopic: 'Agile Development'
  },
  {
    id: 'cisa3-182',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The PRIMARY purpose of code reviews is to:',
    options: [
      'Evaluate developer performance',
      'Identify defects and improve code quality',
      'Approve code for production',
      'Document programming standards'
    ],
    correctAnswer: 1,
    explanation: 'Code reviews identify defects and improve quality before testing, when fixes are less costly.',
    topic: 'Quality Assurance',
    subtopic: 'Code Reviews'
  },
  {
    id: 'cisa3-183',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Data migration to a new system should include:',
    options: [
      'Direct copy without validation',
      'Verification of data completeness, accuracy, and integrity',
      'Migration of all data regardless of quality',
      'Migration performed only by IT'
    ],
    correctAnswer: 1,
    explanation: 'Data migration must include verification of completeness, accuracy, and integrity to ensure data quality in the new system.',
    topic: 'Implementation',
    subtopic: 'Data Migration'
  },
  {
    id: 'cisa3-184',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Regression testing is performed to ensure:',
    options: [
      'New functionality works correctly',
      'Changes have not adversely affected existing functionality',
      'Performance meets requirements',
      'Security controls are effective'
    ],
    correctAnswer: 1,
    explanation: 'Regression testing verifies that changes have not broken or adversely affected existing functionality.',
    topic: 'Testing',
    subtopic: 'Regression Testing'
  },
  {
    id: 'cisa3-185',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'DevOps practices should include:',
    options: [
      'Bypassing security reviews for faster deployment',
      'Automated testing and security controls integrated into the pipeline',
      'Manual deployment processes',
      'Separate development and operations silos'
    ],
    correctAnswer: 1,
    explanation: 'DevOps should integrate automated testing and security (DevSecOps) into the CI/CD pipeline.',
    topic: 'DevOps',
    subtopic: 'DevSecOps'
  },
  {
    id: 'cisa3-186',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Version control systems are important for:',
    options: [
      'Tracking user access',
      'Managing changes to source code and documentation',
      'Performance monitoring',
      'Database backups'
    ],
    correctAnswer: 1,
    explanation: 'Version control manages changes to source code and documentation, enabling tracking, rollback, and collaboration.',
    topic: 'Configuration Management',
    subtopic: 'Version Control'
  },
  {
    id: 'cisa3-187',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When auditing software development, the IS auditor should be MOST concerned if:',
    options: [
      'Developers document their code',
      'Developers have access to promote code to production',
      'Testing is documented',
      'Change requests are logged'
    ],
    correctAnswer: 1,
    explanation: 'Developer access to production creates segregation of duties risk and bypasses change control.',
    topic: 'Development Controls',
    subtopic: 'Segregation of Duties'
  },
  {
    id: 'cisa3-188',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A project charter should define:',
    options: [
      'Detailed technical specifications',
      'Project objectives, scope, stakeholders, and authority',
      'Programming standards',
      'Test cases'
    ],
    correctAnswer: 1,
    explanation: 'The project charter formally authorizes the project and defines objectives, scope, stakeholders, and authority.',
    topic: 'Project Management',
    subtopic: 'Project Charter'
  },
  {
    id: 'cisa3-189',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Application interface controls should ensure:',
    options: [
      'Fast data transfer',
      'Complete and accurate data transmission between systems',
      'Maximum bandwidth usage',
      'Minimum documentation'
    ],
    correctAnswer: 1,
    explanation: 'Interface controls ensure data is transmitted completely and accurately between systems.',
    topic: 'Application Controls',
    subtopic: 'Interface Controls'
  },
  {
    id: 'cisa3-190',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The purpose of a proof of concept (POC) is to:',
    options: [
      'Replace detailed requirements',
      'Validate that a proposed solution is feasible',
      'Finalize vendor selection',
      'Train end users'
    ],
    correctAnswer: 1,
    explanation: 'A POC validates that a proposed solution or technology is feasible before full commitment.',
    topic: 'Acquisition',
    subtopic: 'Proof of Concept'
  },
  {
    id: 'cisa3-191',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Static application security testing (SAST) is performed:',
    options: [
      'In production with live data',
      'By analyzing source code without executing it',
      'After deployment only',
      'By penetration testers'
    ],
    correctAnswer: 1,
    explanation: 'SAST analyzes source code without executing it to identify potential security vulnerabilities.',
    topic: 'Security Testing',
    subtopic: 'SAST'
  },
  {
    id: 'cisa3-192',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Emergency changes should be:',
    options: [
      'Exempt from change management',
      'Documented and reviewed retrospectively',
      'Approved only by developers',
      'Not tested before implementation'
    ],
    correctAnswer: 1,
    explanation: 'Emergency changes may bypass normal approval but must be documented and reviewed after implementation.',
    topic: 'Change Management',
    subtopic: 'Emergency Changes'
  },
  {
    id: 'cisa3-193',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When implementing containerized applications, the IS auditor should verify:',
    options: [
      'Containers are never updated',
      'Container images are scanned for vulnerabilities and properly maintained',
      'All containers run with root privileges',
      'Containers share network access freely'
    ],
    correctAnswer: 1,
    explanation: 'Container images should be scanned for vulnerabilities and properly maintained with security patches.',
    topic: 'Modern Development',
    subtopic: 'Container Security'
  },
  {
    id: 'cisa3-194',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Project scope creep refers to:',
    options: [
      'Completing the project early',
      'Uncontrolled expansion of project scope',
      'Reducing project budget',
      'Adding more team members'
    ],
    correctAnswer: 1,
    explanation: 'Scope creep is uncontrolled expansion of project scope without corresponding adjustments to budget and timeline.',
    topic: 'Project Management',
    subtopic: 'Scope Management'
  },
  {
    id: 'cisa3-195',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Dynamic application security testing (DAST) differs from SAST in that DAST:',
    options: [
      'Analyzes source code directly',
      'Tests the running application from the outside',
      'Is performed during design',
      'Cannot find security vulnerabilities'
    ],
    correctAnswer: 1,
    explanation: 'DAST tests the running application from the outside (black-box testing) to identify vulnerabilities.',
    topic: 'Security Testing',
    subtopic: 'DAST'
  },
  {
    id: 'cisa3-196',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Parallel conversion involves:',
    options: [
      'Immediate cutover to the new system',
      'Running old and new systems simultaneously',
      'Converting one department at a time',
      'Phased implementation by functionality'
    ],
    correctAnswer: 1,
    explanation: 'Parallel conversion runs old and new systems simultaneously to verify results before retiring the old system.',
    topic: 'Implementation',
    subtopic: 'Conversion Strategies'
  },
  {
    id: 'cisa3-198',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A systems integrator is PRIMARILY responsible for:',
    options: [
      'Operating systems after deployment',
      'Ensuring different components work together effectively',
      'Providing ongoing maintenance',
      'Training end users'
    ],
    correctAnswer: 1,
    explanation: 'A systems integrator ensures different components and systems work together effectively.',
    topic: 'Implementation',
    subtopic: 'Systems Integration'
  },
  {
    id: 'cisa3-199',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When evaluating low-code/no-code development platforms, the IS auditor should be MOST concerned about:',
    options: [
      'Reduced development time',
      'Security, governance, and shadow IT risks',
      'Lower infrastructure costs',
      'User-friendly interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Low-code platforms can introduce security gaps, governance challenges, and shadow IT if not properly controlled.',
    topic: 'Modern Development',
    subtopic: 'Low-Code Development'
  },
  {
    id: 'cisa3-200',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Software licensing compliance is important to:',
    options: [
      'Reduce training requirements',
      'Avoid legal and financial penalties',
      'Improve system performance',
      'Simplify deployments'
    ],
    correctAnswer: 1,
    explanation: 'Non-compliance with software licensing can result in significant legal and financial penalties.',
    topic: 'Compliance',
    subtopic: 'License Management'
  },
  {
    id: 'cisa3-201',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Infrastructure as Code (IaC) provides benefits including:',
    options: [
      'Manual configuration of each server',
      'Consistent, repeatable, and auditable infrastructure deployment',
      'Elimination of security requirements',
      'Reduced need for version control'
    ],
    correctAnswer: 1,
    explanation: 'IaC enables consistent, repeatable, and auditable infrastructure deployment through code-defined configurations.',
    topic: 'Modern Development',
    subtopic: 'Infrastructure as Code'
  },
  {
    id: 'cisa3-202',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Release management should ensure:',
    options: [
      'All releases happen immediately',
      'Releases are planned, tested, and coordinated with stakeholders',
      'Only emergency changes are released',
      'Developers control release timing'
    ],
    correctAnswer: 1,
    explanation: 'Release management ensures releases are properly planned, tested, and coordinated before deployment.',
    topic: 'Change Management',
    subtopic: 'Release Management'
  }
];
