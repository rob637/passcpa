/**
 * CISA Domain 3: Information Systems Acquisition, Development and Implementation
 * Batch 3 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA3_QUESTIONS_BATCH3: Question[] = [
  {
    id: 'CISA3-033',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Function point analysis is used to:',
    options: [
      'Test application functionality',
      'Estimate software size and effort based on functionality',
      'Debug applications',
      'Design user interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Function point analysis estimates software size based on the functionality it provides to users, helping estimate development effort and cost.',
    topic: 'Estimation',
    subtopic: 'Function Points'
  },
  {
    id: 'CISA3-034',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Use cases describe:',
    options: [
      'Technical architecture',
      'How actors interact with the system to achieve goals',
      'Database structure',
      'Network topology'
    ],
    correctAnswer: 1,
    explanation: 'Use cases describe how actors (users or systems) interact with the system to achieve specific goals, capturing functional requirements.',
    topic: 'Requirements',
    subtopic: 'Use Cases'
  },
  {
    id: 'CISA3-035',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Entity-relationship diagrams (ERDs) model:',
    options: [
      'Business processes',
      'Data entities and their relationships',
      'System architecture',
      'Network flows'
    ],
    correctAnswer: 1,
    explanation: 'ERDs model data entities, their attributes, and the relationships between them, forming the basis for database design.',
    topic: 'Data Modeling',
    subtopic: 'ERD'
  },
  {
    id: 'CISA3-036',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Data flow diagrams (DFDs) show:',
    options: [
      'Only physical storage',
      'How data moves through a system',
      'Only user interfaces',
      'Only network topology'
    ],
    correctAnswer: 1,
    explanation: 'DFDs show how data moves through a system, depicting processes, data stores, external entities, and the data flows between them.',
    topic: 'System Modeling',
    subtopic: 'DFD'
  },
  {
    id: 'CISA3-037',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Prototyping is useful when:',
    options: [
      'Requirements are completely defined',
      'Requirements are unclear and need user feedback',
      'No user involvement is possible',
      'Time is unlimited'
    ],
    correctAnswer: 1,
    explanation: 'Prototyping is valuable when requirements are unclear, allowing users to interact with a working model and provide feedback.',
    topic: 'Development Methodologies',
    subtopic: 'Prototyping'
  },
  {
    id: 'CISA3-038',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Spiral model combines elements of:',
    options: [
      'Only waterfall',
      'Waterfall and prototyping with risk analysis',
      'Only agile',
      'Only testing'
    ],
    correctAnswer: 1,
    explanation: 'The spiral model combines waterfall\'s sequential phases with prototyping and iterative risk analysis at each phase.',
    topic: 'Development Methodologies',
    subtopic: 'Spiral Model'
  },
  {
    id: 'CISA3-039',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Scrum framework uses sprints that typically last:',
    options: [
      'Six months',
      'One to four weeks',
      'One day',
      'One year'
    ],
    correctAnswer: 1,
    explanation: 'Scrum sprints are time-boxed iterations typically lasting one to four weeks, during which a potentially shippable product increment is created.',
    topic: 'Development Methodologies',
    subtopic: 'Scrum'
  },
  {
    id: 'CISA3-040',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Test-driven development (TDD) requires:',
    options: [
      'Testing after development is complete',
      'Writing tests before writing code',
      'No testing',
      'Only manual testing'
    ],
    correctAnswer: 1,
    explanation: 'TDD requires writing automated tests before writing the code that will make those tests pass, ensuring code meets requirements.',
    topic: 'Development Practices',
    subtopic: 'TDD'
  },
  {
    id: 'CISA3-041',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Code refactoring involves:',
    options: [
      'Adding new features',
      'Restructuring code without changing its behavior',
      'Removing all comments',
      'Converting to a new language'
    ],
    correctAnswer: 1,
    explanation: 'Refactoring restructures existing code to improve its internal structure without changing its external behavior, improving maintainability.',
    topic: 'Development Practices',
    subtopic: 'Refactoring'
  },
  {
    id: 'CISA3-042',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Static application security testing (SAST) analyzes:',
    options: [
      'Running applications',
      'Source code or binaries without executing them',
      'Network traffic',
      'User behavior'
    ],
    correctAnswer: 1,
    explanation: 'SAST analyzes source code or compiled binaries without executing them, identifying vulnerabilities through code review.',
    topic: 'Security Testing',
    subtopic: 'SAST'
  },
  {
    id: 'CISA3-043',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Dynamic application security testing (DAST) tests:',
    options: [
      'Source code only',
      'Running applications from an external perspective',
      'Database schemas',
      'Network configurations'
    ],
    correctAnswer: 1,
    explanation: 'DAST tests running applications from an external perspective, simulating attacks to identify runtime vulnerabilities.',
    topic: 'Security Testing',
    subtopic: 'DAST'
  },
  {
    id: 'CISA3-044',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Penetration testing should be performed:',
    options: [
      'Only during development',
      'Before deployment and periodically thereafter',
      'Only after a breach',
      'Never'
    ],
    correctAnswer: 1,
    explanation: 'Penetration testing should be performed before deployment and periodically to identify vulnerabilities that could be exploited.',
    topic: 'Security Testing',
    subtopic: 'Penetration Testing'
  },
  {
    id: 'CISA3-045',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Secure coding practices include:',
    options: [
      'Only encryption',
      'Input validation, output encoding, and proper error handling',
      'Only authentication',
      'Only logging'
    ],
    correctAnswer: 1,
    explanation: 'Secure coding includes input validation, output encoding, proper error handling, access controls, and protection against common vulnerabilities.',
    topic: 'Application Security',
    subtopic: 'Secure Coding'
  },
  {
    id: 'CISA3-046',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Cross-site scripting (XSS) attacks can be prevented by:',
    options: [
      'Using firewalls only',
      'Validating input and encoding output',
      'Encrypting databases',
      'Using strong passwords'
    ],
    correctAnswer: 1,
    explanation: 'XSS prevention requires validating and sanitizing user input and properly encoding output before rendering in browsers.',
    topic: 'Application Security',
    subtopic: 'XSS Prevention'
  },
  {
    id: 'CISA3-047',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Cross-site request forgery (CSRF) attacks exploit:',
    options: [
      'Weak passwords',
      'Trust a website has in a user\'s browser',
      'Network vulnerabilities',
      'Physical access'
    ],
    correctAnswer: 1,
    explanation: 'CSRF exploits the trust that a website has in an authenticated user\'s browser to perform unauthorized actions.',
    topic: 'Application Security',
    subtopic: 'CSRF'
  },
  {
    id: 'CISA3-048',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'OWASP Top 10 is:',
    options: [
      'A testing tool',
      'A list of critical web application security risks',
      'A development methodology',
      'A compliance standard'
    ],
    correctAnswer: 1,
    explanation: 'OWASP Top 10 is a regularly updated list of the most critical security risks to web applications, serving as awareness and guidance.',
    topic: 'Application Security',
    subtopic: 'OWASP'
  },
  {
    id: 'CISA3-049',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Software composition analysis identifies:',
    options: [
      'Code quality issues',
      'Vulnerabilities in third-party components',
      'Performance problems',
      'User interface issues'
    ],
    correctAnswer: 1,
    explanation: 'Software composition analysis identifies vulnerabilities and license issues in third-party and open-source components used in applications.',
    topic: 'Application Security',
    subtopic: 'SCA'
  },
  {
    id: 'CISA3-050',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Infrastructure as Code (IaC) provides:',
    options: [
      'Only cost savings',
      'Automated, repeatable infrastructure provisioning',
      'Manual configuration',
      'Physical hardware management'
    ],
    correctAnswer: 1,
    explanation: 'IaC enables automated, repeatable infrastructure provisioning through code, improving consistency and reducing manual errors.',
    topic: 'Development Practices',
    subtopic: 'IaC'
  },
  {
    id: 'CISA3-051',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Blue-green deployment strategy:',
    options: [
      'Eliminates the need for testing',
      'Maintains two identical environments for zero-downtime releases',
      'Uses only one environment',
      'Requires no automation'
    ],
    correctAnswer: 1,
    explanation: 'Blue-green deployment maintains two identical production environments, allowing instant switching between them for zero-downtime releases and easy rollback.',
    topic: 'Deployment',
    subtopic: 'Deployment Strategies'
  },
  {
    id: 'CISA3-052',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Canary releases involve:',
    options: [
      'Full deployment to all users',
      'Gradual rollout to a small subset of users',
      'No production deployment',
      'Only testing environments'
    ],
    correctAnswer: 1,
    explanation: 'Canary releases gradually roll out changes to a small subset of users, monitoring for issues before full deployment.',
    topic: 'Deployment',
    subtopic: 'Canary Releases'
  },
  {
    id: 'CISA3-053',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Feature flags (feature toggles) allow:',
    options: [
      'Only code deletion',
      'Enabling or disabling features without deployment',
      'Only database changes',
      'Only security updates'
    ],
    correctAnswer: 1,
    explanation: 'Feature flags allow enabling or disabling features at runtime without code deployment, enabling controlled rollouts and quick rollbacks.',
    topic: 'Development Practices',
    subtopic: 'Feature Flags'
  },
  {
    id: 'CISA3-054',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Microservices architecture offers:',
    options: [
      'Simpler deployments always',
      'Independent deployability and scalability of components',
      'Reduced complexity always',
      'No need for API management'
    ],
    correctAnswer: 1,
    explanation: 'Microservices enable independent development, deployment, and scaling of application components, though they add operational complexity.',
    topic: 'Architecture',
    subtopic: 'Microservices'
  },
  {
    id: 'CISA3-055',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Containerization using Docker provides:',
    options: [
      'Hardware virtualization',
      'Consistent environments across development and production',
      'Physical isolation',
      'No resource sharing'
    ],
    correctAnswer: 1,
    explanation: 'Containers package applications with dependencies, ensuring consistent behavior across development, testing, and production environments.',
    topic: 'Development Practices',
    subtopic: 'Containers'
  },
  {
    id: 'CISA3-056',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Kubernetes is primarily used for:',
    options: [
      'Code compilation',
      'Container orchestration and management',
      'Database administration',
      'User authentication'
    ],
    correctAnswer: 1,
    explanation: 'Kubernetes orchestrates and manages containerized applications, handling deployment, scaling, and operational tasks.',
    topic: 'Development Practices',
    subtopic: 'Kubernetes'
  },
  {
    id: 'CISA3-057',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Technical debt refers to:',
    options: [
      'IT budget deficits',
      'Future cost of addressing shortcuts in development',
      'Hardware loans',
      'Training expenses'
    ],
    correctAnswer: 1,
    explanation: 'Technical debt is the implied cost of additional rework caused by choosing quick solutions instead of better approaches that take longer.',
    topic: 'Development Quality',
    subtopic: 'Technical Debt'
  },
  {
    id: 'CISA3-058',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Code coverage metrics indicate:',
    options: [
      'How fast code runs',
      'Percentage of code executed during testing',
      'Number of developers',
      'Lines of code'
    ],
    correctAnswer: 1,
    explanation: 'Code coverage measures what percentage of code is executed during testing, indicating how thorough the test suite is.',
    topic: 'Quality Assurance',
    subtopic: 'Code Coverage'
  },
  {
    id: 'CISA3-059',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'End-to-end testing validates:',
    options: [
      'Individual functions',
      'Complete business flows from start to finish',
      'Only database operations',
      'Only API responses'
    ],
    correctAnswer: 1,
    explanation: 'End-to-end testing validates complete business flows, testing the entire application from the user\'s perspective.',
    topic: 'Testing',
    subtopic: 'E2E Testing'
  },
  {
    id: 'CISA3-060',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'When reviewing mobile application development, an IS auditor should focus on:',
    options: [
      'Only screen size',
      'Data storage security, API security, and device-specific risks',
      'Only battery usage',
      'Only download speeds'
    ],
    correctAnswer: 1,
    explanation: 'Mobile app audits should focus on secure data storage, secure API communications, authentication, and device-specific security risks.',
    topic: 'Mobile Development',
    subtopic: 'Mobile Security'
  },
  {
    id: 'CISA3-061',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Low-code/no-code platforms require attention to:',
    options: [
      'No security concerns',
      'Security, governance, and vendor lock-in risks',
      'Only user interface design',
      'Only training'
    ],
    correctAnswer: 1,
    explanation: 'Low-code platforms introduce security concerns, governance challenges for citizen development, and potential vendor lock-in risks.',
    topic: 'Development Practices',
    subtopic: 'Low-Code'
  },
  {
    id: 'CISA3-062',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Release management controls ensure:',
    options: [
      'Immediate deployment of all changes',
      'Coordinated, authorized, and successful deployments',
      'No testing required',
      'Unlimited releases'
    ],
    correctAnswer: 1,
    explanation: 'Release management controls ensure deployments are coordinated, authorized, tested, and successfully implemented with minimal disruption.',
    topic: 'Deployment',
    subtopic: 'Release Management'
  },
];

export default CISA3_QUESTIONS_BATCH3;
