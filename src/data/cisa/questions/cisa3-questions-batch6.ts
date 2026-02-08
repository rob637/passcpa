/**
 * CISA Domain 3: Information Systems Acquisition, Development, and Implementation
 * Batch 6 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA3_QUESTIONS_BATCH6: Question[] = [
  {
    id: 'CISA3-123',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'System development life cycle (SDLC) phase gates ensure:',
    options: [
      'Faster development',
      'Proper review and approval before proceeding to next phase',
      'Reduced documentation',
      'Developer autonomy'
    ],
    correctAnswer: 1,
    explanation: 'Phase gates ensure proper review, approval, and quality verification before proceeding.',
    topic: 'SDLC',
    subtopic: 'Phase Gates'
  },
  {
    id: 'CISA3-124',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Requirements traceability matrix (RTM) links:',
    options: [
      'Only code to tests',
      'Requirements to design, code, and test cases',
      'Only documents',
      'Only team members'
    ],
    correctAnswer: 1,
    explanation: 'RTM traces requirements through design, implementation, and testing for completeness verification.',
    topic: 'Requirements',
    subtopic: 'Traceability'
  },
  {
    id: 'CISA3-125',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Prototyping benefits include:',
    options: [
      'Replacing requirements',
      'Early visualization and user feedback before full development',
      'Avoiding user involvement',
      'Reducing testing'
    ],
    correctAnswer: 1,
    explanation: 'Prototyping enables early visualization and user feedback to refine requirements before full development.',
    topic: 'Development Approaches',
    subtopic: 'Prototyping'
  },
  {
    id: 'CISA3-126',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Proof of concept (POC) differs from prototype by:',
    options: [
      'Being more detailed',
      'Focusing on technical feasibility rather than user interface',
      'Having full functionality',
      'Being production-ready'
    ],
    correctAnswer: 1,
    explanation: 'POC validates technical feasibility while prototypes focus on user interface and experience.',
    topic: 'Development Approaches',
    subtopic: 'POC'
  },
  {
    id: 'CISA3-127',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'User story format typically includes:',
    options: [
      'Technical specifications only',
      'Who (role), what (functionality), and why (benefit)',
      'Only acceptance criteria',
      'Only priority'
    ],
    correctAnswer: 1,
    explanation: 'User stories follow "As a [role], I want [functionality] so that [benefit]" format.',
    topic: 'Agile',
    subtopic: 'User Stories'
  },
  {
    id: 'CISA3-128',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Definition of Done (DoD) ensures:',
    options: [
      'Code compilation only',
      'Consistent quality criteria for completed work',
      'Fast delivery only',
      'Developer discretion'
    ],
    correctAnswer: 1,
    explanation: 'DoD defines consistent quality criteria that must be met before work is considered complete.',
    topic: 'Agile',
    subtopic: 'Definition of Done'
  },
  {
    id: 'CISA3-129',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Technical spikes in Agile are used to:',
    options: [
      'Add features',
      'Research and reduce technical uncertainty',
      'Fix bugs',
      'Skip planning'
    ],
    correctAnswer: 1,
    explanation: 'Spikes are time-boxed research activities to reduce technical uncertainty before committing to implementation.',
    topic: 'Agile',
    subtopic: 'Spikes'
  },
  {
    id: 'CISA3-130',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Code branching strategies support:',
    options: [
      'Only backup',
      'Parallel development and controlled integration',
      'Avoiding version control',
      'Unlimited changes'
    ],
    correctAnswer: 1,
    explanation: 'Branching strategies enable parallel development while controlling how changes are integrated.',
    topic: 'Version Control',
    subtopic: 'Branching'
  },
  {
    id: 'CISA3-131',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Trunk-based development emphasizes:',
    options: [
      'Long-lived branches',
      'Frequent integration to main branch with short-lived branches',
      'No branching',
      'Monthly merges'
    ],
    correctAnswer: 1,
    explanation: 'Trunk-based development emphasizes frequent integration to main branch with short-lived feature branches.',
    topic: 'Version Control',
    subtopic: 'Trunk-Based'
  },
  {
    id: 'CISA3-132',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Semantic versioning (SemVer) uses:',
    options: [
      'Random numbers',
      'Major.Minor.Patch format indicating backward compatibility',
      'Dates only',
      'Sequential numbers'
    ],
    correctAnswer: 1,
    explanation: 'SemVer uses Major.Minor.Patch where major indicates breaking changes, minor new features, patch bug fixes.',
    topic: 'Release Management',
    subtopic: 'Semantic Versioning'
  },
  {
    id: 'CISA3-133',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Input validation should occur:',
    options: [
      'Only on client side',
      'On both client and server side with server-side as authoritative',
      'Only on server side',
      'Only during testing'
    ],
    correctAnswer: 1,
    explanation: 'Validation should occur on both sides with server-side validation as authoritative since client-side can be bypassed.',
    topic: 'Secure Development',
    subtopic: 'Input Validation'
  },
  {
    id: 'CISA3-134',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Output encoding prevents:',
    options: [
      'Performance issues',
      'Injection attacks by ensuring data is treated as data not code',
      'Authentication bypass',
      'Network vulnerabilities'
    ],
    correctAnswer: 1,
    explanation: 'Output encoding prevents injection by ensuring user-provided data is treated as data, not executable code.',
    topic: 'Secure Development',
    subtopic: 'Output Encoding'
  },
  {
    id: 'CISA3-135',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Parameterized queries prevent:',
    options: [
      'All attacks',
      'SQL injection by separating code from data',
      'XSS attacks only',
      'Authentication attacks'
    ],
    correctAnswer: 1,
    explanation: 'Parameterized queries prevent SQL injection by treating user input as data, never as executable SQL.',
    topic: 'Secure Development',
    subtopic: 'SQL Injection Prevention'
  },
  {
    id: 'CISA3-136',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Error handling should avoid:',
    options: [
      'Logging errors',
      'Exposing sensitive information in error messages',
      'Catching exceptions',
      'User notification'
    ],
    correctAnswer: 1,
    explanation: 'Error handling should avoid exposing sensitive information like stack traces or database details to users.',
    topic: 'Secure Development',
    subtopic: 'Error Handling'
  },
  {
    id: 'CISA3-137',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Session management controls should include:',
    options: [
      'Only login',
      'Secure generation, timeout, and proper invalidation',
      'Only cookies',
      'Only encryption'
    ],
    correctAnswer: 1,
    explanation: 'Session management requires secure generation, appropriate timeout, and proper invalidation on logout.',
    topic: 'Secure Development',
    subtopic: 'Session Management'
  },
  {
    id: 'CISA3-138',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'CSRF (Cross-Site Request Forgery) is prevented by:',
    options: [
      'Input validation only',
      'Implementing anti-CSRF tokens and SameSite cookie attributes',
      'Encryption only',
      'Strong passwords'
    ],
    correctAnswer: 1,
    explanation: 'CSRF prevention requires anti-CSRF tokens validating request origin and SameSite cookie attributes.',
    topic: 'Secure Development',
    subtopic: 'CSRF'
  },
  {
    id: 'CISA3-139',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Dependency scanning in CI/CD:',
    options: [
      'Only checks syntax',
      'Identifies known vulnerabilities in third-party libraries',
      'Replaces code review',
      'Only checks performance'
    ],
    correctAnswer: 1,
    explanation: 'Dependency scanning identifies known vulnerabilities in third-party libraries and components.',
    topic: 'Secure Development',
    subtopic: 'Dependency Scanning'
  },
  {
    id: 'CISA3-140',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'License compliance scanning ensures:',
    options: [
      'Only security',
      'Open source components comply with license requirements',
      'Only performance',
      'Only quality'
    ],
    correctAnswer: 1,
    explanation: 'License scanning ensures open source component usage complies with license terms and restrictions.',
    topic: 'Software Composition',
    subtopic: 'License Compliance'
  },
  {
    id: 'CISA3-141',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Infrastructure as Code (IaC) security scanning:',
    options: [
      'Is not needed',
      'Identifies misconfigurations before deployment',
      'Only checks syntax',
      'Replaces runtime security'
    ],
    correctAnswer: 1,
    explanation: 'IaC scanning identifies security misconfigurations in infrastructure code before deployment.',
    topic: 'DevSecOps',
    subtopic: 'IaC Security'
  },
  {
    id: 'CISA3-142',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Container image scanning should check for:',
    options: [
      'Only size',
      'Vulnerabilities, malware, and compliance with security policies',
      'Only base image',
      'Only configuration'
    ],
    correctAnswer: 1,
    explanation: 'Container scanning should check for vulnerabilities, malware, secrets, and policy compliance.',
    topic: 'DevSecOps',
    subtopic: 'Container Security'
  },
  {
    id: 'CISA3-143',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Signed container images ensure:',
    options: [
      'Performance',
      'Image integrity and authenticity verification',
      'Only storage',
      'Only compatibility'
    ],
    correctAnswer: 1,
    explanation: 'Image signing enables verification of image integrity and authenticity before deployment.',
    topic: 'DevSecOps',
    subtopic: 'Image Signing'
  },
  {
    id: 'CISA3-144',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Security champions in development teams:',
    options: [
      'Replace security team',
      'Promote security awareness and practices within their teams',
      'Only perform testing',
      'Only approve releases'
    ],
    correctAnswer: 1,
    explanation: 'Security champions promote security awareness and practices within development teams as local advocates.',
    topic: 'DevSecOps',
    subtopic: 'Security Champions'
  },
  {
    id: 'CISA3-145',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Smoke testing verifies:',
    options: [
      'All functionality',
      'Basic functionality works after deployment',
      'Performance only',
      'Security only'
    ],
    correctAnswer: 1,
    explanation: 'Smoke testing verifies basic functionality works before proceeding with more extensive testing.',
    topic: 'Testing',
    subtopic: 'Smoke Testing'
  },
  {
    id: 'CISA3-146',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Regression testing ensures:',
    options: [
      'New features work',
      'Changes do not break existing functionality',
      'Only performance',
      'Only security'
    ],
    correctAnswer: 1,
    explanation: 'Regression testing verifies that changes have not broken existing functionality.',
    topic: 'Testing',
    subtopic: 'Regression'
  },
  {
    id: 'CISA3-148',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Test environment management should ensure:',
    options: [
      'Identical to production always',
      'Representative configurations with appropriate data protection',
      'Minimal resources',
      'No access controls'
    ],
    correctAnswer: 1,
    explanation: 'Test environments should be representative of production with appropriate data protection controls.',
    topic: 'Testing',
    subtopic: 'Test Environment'
  },
  {
    id: 'CISA3-149',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Go/No-Go decisions before deployment should consider:',
    options: [
      'Only schedule',
      'Test results, readiness, risk assessment, and rollback capability',
      'Only functionality',
      'Only cost'
    ],
    correctAnswer: 1,
    explanation: 'Go/No-Go decisions should consider test results, operational readiness, risks, and rollback plans.',
    topic: 'Release Management',
    subtopic: 'Go/No-Go'
  },
  {
    id: 'CISA3-151',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Production support transition requires:',
    options: [
      'Only documentation',
      'Knowledge transfer, documentation, and operational readiness',
      'Only training',
      'Only access'
    ],
    correctAnswer: 1,
    explanation: 'Transition requires knowledge transfer, documentation, operational procedures, and support readiness.',
    topic: 'Implementation',
    subtopic: 'Support Transition'
  },
  {
    id: 'CISA3-152',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Hypercare period after deployment provides:',
    options: [
      'Reduced support',
      'Enhanced support and monitoring for early issue detection',
      'No support',
      'Only monitoring'
    ],
    correctAnswer: 1,
    explanation: 'Hypercare provides enhanced support and monitoring after deployment for early issue detection.',
    topic: 'Implementation',
    subtopic: 'Hypercare'
  },
];

export default CISA3_QUESTIONS_BATCH6;
