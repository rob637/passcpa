/**
 * CISA Domain 3: Information Systems Acquisition, Development and Implementation
 * Batch 4 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA3_QUESTIONS_BATCH4: Question[] = [
  {
    id: 'CISA3-063',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Requirements prioritization should be based on:',
    options: [
      'User preferences only',
      'Business value, risk, dependencies, and resource constraints',
      'Technical complexity only',
      'Implementation order'
    ],
    correctAnswer: 1,
    explanation: 'Requirements should be prioritized based on business value, associated risks, dependencies, and available resources.',
    topic: 'Requirements',
    subtopic: 'Prioritization'
  },
  {
    id: 'CISA3-064',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Requirement volatility indicates:',
    options: [
      'Stable requirements',
      'Frequency of requirement changes',
      'Number of requirements',
      'Requirements completeness'
    ],
    correctAnswer: 1,
    explanation: 'Requirement volatility measures how frequently requirements change, which affects project risk and methodology selection.',
    topic: 'Requirements',
    subtopic: 'Volatility'
  },
  {
    id: 'CISA3-065',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Non-functional requirements include:',
    options: [
      'Business logic',
      'Performance, security, usability, and reliability',
      'Data processing',
      'User workflows'
    ],
    correctAnswer: 1,
    explanation: 'Non-functional requirements specify system qualities: performance, security, usability, reliability, scalability, and maintainability.',
    topic: 'Requirements',
    subtopic: 'Non-Functional'
  },
  {
    id: 'CISA3-066',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'The V-model extends waterfall by:',
    options: [
      'Eliminating testing',
      'Pairing each development phase with corresponding testing',
      'Removing documentation',
      'Adding iterations'
    ],
    correctAnswer: 1,
    explanation: 'The V-model pairs each development phase with a corresponding testing phase, emphasizing verification and validation.',
    topic: 'Development Methodologies',
    subtopic: 'V-Model'
  },
  {
    id: 'CISA3-067',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Extreme Programming (XP) emphasizes:',
    options: [
      'Extensive documentation',
      'Pair programming, continuous integration, and test-first development',
      'Long development cycles',
      'Minimal customer involvement'
    ],
    correctAnswer: 1,
    explanation: 'XP emphasizes technical practices like pair programming, continuous integration, test-first development, and continuous customer feedback.',
    topic: 'Development Methodologies',
    subtopic: 'XP'
  },
  {
    id: 'CISA3-068',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Kanban methodology focuses on:',
    options: [
      'Fixed sprints',
      'Visualizing workflow and limiting work in progress',
      'Extensive planning',
      'Phase gates'
    ],
    correctAnswer: 1,
    explanation: 'Kanban visualizes workflow, limits work in progress (WIP), and focuses on continuous flow rather than fixed iterations.',
    topic: 'Development Methodologies',
    subtopic: 'Kanban'
  },
  {
    id: 'CISA3-069',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Scaled Agile Framework (SAFe) addresses:',
    options: [
      'Small team projects',
      'Agile at enterprise scale across multiple teams',
      'Individual development',
      'Waterfall projects'
    ],
    correctAnswer: 1,
    explanation: 'SAFe provides guidance for implementing Agile practices at enterprise scale, coordinating multiple teams and aligning with business strategy.',
    topic: 'Development Methodologies',
    subtopic: 'SAFe'
  },
  {
    id: 'CISA3-070',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Behavior-Driven Development (BDD) uses:',
    options: [
      'Only technical specifications',
      'Business-readable scenarios to guide development',
      'Only code reviews',
      'No testing'
    ],
    correctAnswer: 1,
    explanation: 'BDD uses business-readable scenarios (Given-When-Then format) to specify behavior and guide development and testing.',
    topic: 'Development Practices',
    subtopic: 'BDD'
  },
  {
    id: 'CISA3-071',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'API-first development:',
    options: [
      'Ignores APIs',
      'Designs APIs before implementing functionality',
      'Only uses REST',
      'Avoids documentation'
    ],
    correctAnswer: 1,
    explanation: 'API-first designs APIs before implementing functionality, ensuring consistent interfaces and enabling parallel development.',
    topic: 'Development Practices',
    subtopic: 'API-First'
  },
  {
    id: 'CISA3-072',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Event-driven architecture provides:',
    options: [
      'Tight coupling',
      'Loose coupling through asynchronous event communication',
      'Synchronous processing only',
      'No scalability'
    ],
    correctAnswer: 1,
    explanation: 'Event-driven architecture enables loose coupling and scalability through asynchronous event publishing and subscription.',
    topic: 'Architecture',
    subtopic: 'Event-Driven'
  },
  {
    id: 'CISA3-073',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Serverless computing:',
    options: [
      'Requires server management',
      'Abstracts infrastructure, charging only for execution',
      'Is always cheaper',
      'Does not scale'
    ],
    correctAnswer: 1,
    explanation: 'Serverless abstracts infrastructure management, with the provider handling scaling and charging only for actual execution.',
    topic: 'Architecture',
    subtopic: 'Serverless'
  },
  {
    id: 'CISA3-074',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Technical specifications should include:',
    options: [
      'Only business requirements',
      'Architecture, interfaces, data models, and security requirements',
      'Only user stories',
      'Only test cases'
    ],
    correctAnswer: 1,
    explanation: 'Technical specifications detail architecture, component interfaces, data models, security requirements, and implementation standards.',
    topic: 'Design',
    subtopic: 'Technical Specifications'
  },
  {
    id: 'CISA3-075',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Design patterns help by:',
    options: [
      'Eliminating all design',
      'Providing proven solutions to common design problems',
      'Slowing development',
      'Increasing complexity always'
    ],
    correctAnswer: 1,
    explanation: 'Design patterns provide proven, reusable solutions to common design problems, improving code quality and maintainability.',
    topic: 'Design',
    subtopic: 'Design Patterns'
  },
  {
    id: 'CISA3-076',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Interface design should prioritize:',
    options: [
      'Developer convenience',
      'User needs and usability',
      'Maximum features',
      'Aesthetic appearance only'
    ],
    correctAnswer: 1,
    explanation: 'Interface design should prioritize user needs, usability, accessibility, and efficient task completion.',
    topic: 'Design',
    subtopic: 'UI Design'
  },
  {
    id: 'CISA3-077',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Accessibility standards (WCAG) ensure:',
    options: [
      'Faster loading',
      'Usability for people with disabilities',
      'Better aesthetics',
      'Lower costs'
    ],
    correctAnswer: 1,
    explanation: 'WCAG (Web Content Accessibility Guidelines) provides standards for making web content accessible to people with disabilities.',
    topic: 'Design',
    subtopic: 'Accessibility'
  },
  {
    id: 'CISA3-078',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Security architecture should be:',
    options: [
      'Added after development',
      'Designed in from the beginning',
      'Optional for internal systems',
      'Only for public-facing systems'
    ],
    correctAnswer: 1,
    explanation: 'Security architecture should be designed in from the beginning, not bolted on afterward. Security by design reduces vulnerabilities.',
    topic: 'Security',
    subtopic: 'Security Architecture'
  },
  {
    id: 'CISA3-079',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Secure Software Development Lifecycle (SSDLC) integrates:',
    options: [
      'Only final testing',
      'Security activities throughout all development phases',
      'Only code review',
      'Only deployment controls'
    ],
    correctAnswer: 1,
    explanation: 'SSDLC integrates security activities throughout all phases: requirements, design, development, testing, deployment, and maintenance.',
    topic: 'Security',
    subtopic: 'SSDLC'
  },
  {
    id: 'CISA3-080',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Threat modeling identifies:',
    options: [
      'Only external threats',
      'Potential threats and vulnerabilities in system design',
      'Only network threats',
      'Only compliance risks'
    ],
    correctAnswer: 1,
    explanation: 'Threat modeling identifies potential threats, attack vectors, and vulnerabilities in system design, enabling proactive mitigation.',
    topic: 'Security',
    subtopic: 'Threat Modeling'
  },
  {
    id: 'CISA3-081',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'STRIDE is a threat modeling approach for:',
    options: [
      'Performance analysis',
      'Identifying security threats by category',
      'Capacity planning',
      'Cost estimation'
    ],
    correctAnswer: 1,
    explanation: 'STRIDE categorizes threats: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege.',
    topic: 'Security',
    subtopic: 'STRIDE'
  },
  {
    id: 'CISA3-082',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Attack surface reduction involves:',
    options: [
      'Adding more features',
      'Minimizing entry points that could be exploited',
      'Increasing interfaces',
      'Exposing more services'
    ],
    correctAnswer: 1,
    explanation: 'Reducing attack surface minimizes exposed entry points, services, and interfaces that could potentially be exploited.',
    topic: 'Security',
    subtopic: 'Attack Surface'
  },
  {
    id: 'CISA3-083',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Secure defaults mean:',
    options: [
      'Everything is enabled',
      'Systems are configured securely out of the box',
      'Users configure security',
      'No security is applied'
    ],
    correctAnswer: 1,
    explanation: 'Secure defaults ensure systems are configured securely by default, requiring explicit action to reduce security.',
    topic: 'Security',
    subtopic: 'Secure Defaults'
  },
  {
    id: 'CISA3-084',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Sensitive data handling in development should:',
    options: [
      'Use production data freely',
      'Use masked or synthetic data in non-production environments',
      'Ignore data protection',
      'Share data with all developers'
    ],
    correctAnswer: 1,
    explanation: 'Development and test environments should use masked, anonymized, or synthetic data to protect sensitive information.',
    topic: 'Security',
    subtopic: 'Data Masking'
  },
  {
    id: 'CISA3-085',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Secrets management ensures:',
    options: [
      'All developers know passwords',
      'Credentials, keys, and tokens are securely stored and accessed',
      'Passwords are in source code',
      'No encryption is needed'
    ],
    correctAnswer: 1,
    explanation: 'Secrets management securely stores and controls access to credentials, API keys, certificates, and tokens.',
    topic: 'Security',
    subtopic: 'Secrets Management'
  },
  {
    id: 'CISA3-086',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Software Bill of Materials (SBOM) provides:',
    options: [
      'Only cost information',
      'Inventory of components and dependencies',
      'Only licensing',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'SBOM provides an inventory of all components, libraries, and dependencies in software for security and compliance management.',
    topic: 'Development Practices',
    subtopic: 'SBOM'
  },
  {
    id: 'CISA3-087',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'GitOps methodology:',
    options: [
      'Avoids version control',
      'Uses Git as single source of truth for infrastructure and applications',
      'Only manages code',
      'Requires manual deployments'
    ],
    correctAnswer: 1,
    explanation: 'GitOps uses Git as the single source of truth for declarative infrastructure and applications, with automated reconciliation.',
    topic: 'Development Practices',
    subtopic: 'GitOps'
  },
  {
    id: 'CISA3-088',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Pipeline security (DevSecOps) includes:',
    options: [
      'Only deployment controls',
      'Security scanning, access controls, and artifact integrity throughout CI/CD',
      'Only manual reviews',
      'Only final testing'
    ],
    correctAnswer: 1,
    explanation: 'DevSecOps integrates security into CI/CD pipelines through automated scanning, access controls, and artifact integrity verification.',
    topic: 'Development Practices',
    subtopic: 'DevSecOps'
  },
  {
    id: 'CISA3-089',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Rollback procedures should be:',
    options: [
      'Developed after problems occur',
      'Planned and tested before deployment',
      'Only for major releases',
      'Optional'
    ],
    correctAnswer: 1,
    explanation: 'Rollback procedures should be planned and tested before deployment to enable quick recovery if problems occur.',
    topic: 'Deployment',
    subtopic: 'Rollback'
  },
  {
    id: 'CISA3-091',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Change freeze periods:',
    options: [
      'Allow all changes',
      'Restrict changes during high-risk periods',
      'Are never needed',
      'Only affect development'
    ],
    correctAnswer: 1,
    explanation: 'Change freezes restrict changes during high-risk periods (year-end, peak seasons) to maintain stability.',
    topic: 'Deployment',
    subtopic: 'Change Freeze'
  },
  {
    id: 'CISA3-092',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Production readiness reviews verify:',
    options: [
      'Only code completion',
      'System is prepared for production operation',
      'Only testing completion',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'Production readiness reviews verify complete preparation: testing, documentation, monitoring, support, security, and operational procedures.',
    topic: 'Deployment',
    subtopic: 'Readiness Review'
  },
];

export default CISA3_QUESTIONS_BATCH4;
