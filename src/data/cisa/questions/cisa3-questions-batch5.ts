/**
 * CISA Domain 3: Information Systems Acquisition, Development, and Implementation
 * Batch 5 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA3_QUESTIONS_BATCH5: Question[] = [
  {
    id: 'CISA3-093',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Feature flags enable:',
    options: [
      'Code deletion',
      'Controlled feature rollout and rapid rollback capability',
      'Only bug fixes',
      'Only security patches'
    ],
    correctAnswer: 1,
    explanation: 'Feature flags enable controlled gradual rollout of features and rapid rollback without code deployment.',
    topic: 'Release Management',
    subtopic: 'Feature Flags'
  },
  {
    id: 'CISA3-094',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Canary deployments:',
    options: [
      'Deploy to all users',
      'Release to a small subset before full rollout',
      'Are only for testing',
      'Skip testing'
    ],
    correctAnswer: 1,
    explanation: 'Canary deployments release changes to a small user subset first to validate before broader rollout.',
    topic: 'Release Management',
    subtopic: 'Canary Deployment'
  },
  {
    id: 'CISA3-095',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Blue-green deployments maintain:',
    options: [
      'One environment',
      'Two identical environments for zero-downtime releases',
      'Only development environment',
      'Only staging environment'
    ],
    correctAnswer: 1,
    explanation: 'Blue-green deployments maintain two identical environments, enabling zero-downtime releases and quick rollback.',
    topic: 'Release Management',
    subtopic: 'Blue-Green'
  },
  {
    id: 'CISA3-096',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Database migration scripts should be:',
    options: [
      'Manual only',
      'Version controlled with rollback capability',
      'Applied directly to production',
      'Undocumented'
    ],
    correctAnswer: 1,
    explanation: 'Database migrations should be version controlled, tested, and include rollback scripts for data protection.',
    topic: 'Database Development',
    subtopic: 'Migrations'
  },
  {
    id: 'CISA3-097',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Schema changes in production require:',
    options: [
      'No approval',
      'Change management approval and impact assessment',
      'Immediate implementation',
      'Only developer approval'
    ],
    correctAnswer: 1,
    explanation: 'Production schema changes require change management approval, impact assessment, and proper testing.',
    topic: 'Database Development',
    subtopic: 'Schema Changes'
  },
  {
    id: 'CISA3-098',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'API versioning ensures:',
    options: [
      'Breaking all integrations',
      'Backward compatibility while enabling enhancements',
      'Single version only',
      'No documentation'
    ],
    correctAnswer: 1,
    explanation: 'API versioning maintains backward compatibility for existing integrations while allowing new functionality.',
    topic: 'Application Development',
    subtopic: 'API Versioning'
  },
  {
    id: 'CISA3-099',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Technical debt should be:',
    options: [
      'Ignored',
      'Tracked, prioritized, and addressed systematically',
      'Accumulated indefinitely',
      'Hidden from management'
    ],
    correctAnswer: 1,
    explanation: 'Technical debt should be tracked, prioritized based on impact, and addressed systematically to maintain quality.',
    topic: 'Software Development',
    subtopic: 'Technical Debt'
  },
  {
    id: 'CISA3-100',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Code refactoring improves:',
    options: [
      'Functionality',
      'Code structure without changing external behavior',
      'User interface',
      'Database design'
    ],
    correctAnswer: 1,
    explanation: 'Refactoring improves code structure, readability, and maintainability without changing external functionality.',
    topic: 'Software Development',
    subtopic: 'Refactoring'
  },
  {
    id: 'CISA3-101',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Design patterns provide:',
    options: [
      'Unique solutions',
      'Reusable solutions to common design problems',
      'Only documentation',
      'Only testing approaches'
    ],
    correctAnswer: 1,
    explanation: 'Design patterns provide proven, reusable solutions to common software design problems.',
    topic: 'Software Development',
    subtopic: 'Design Patterns'
  },
  {
    id: 'CISA3-102',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'SOLID principles in software design:',
    options: [
      'Only apply to databases',
      'Guide creation of maintainable and extensible code',
      'Are outdated',
      'Only apply to web applications'
    ],
    correctAnswer: 1,
    explanation: 'SOLID principles (Single responsibility, Open-closed, Liskov, Interface segregation, Dependency inversion) guide maintainable design.',
    topic: 'Software Development',
    subtopic: 'SOLID'
  },
  {
    id: 'CISA3-103',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Microservices architecture benefits include:',
    options: [
      'Simpler deployment',
      'Independent scaling and deployment of services',
      'Reduced testing',
      'No monitoring needed'
    ],
    correctAnswer: 1,
    explanation: 'Microservices enable independent scaling, deployment, and development of individual services.',
    topic: 'Architecture',
    subtopic: 'Microservices'
  },
  {
    id: 'CISA3-104',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Event-driven architecture uses:',
    options: [
      'Direct calls only',
      'Events to trigger and communicate between services',
      'Batch processing only',
      'File transfers'
    ],
    correctAnswer: 1,
    explanation: 'Event-driven architecture uses events to trigger actions and enable loose coupling between services.',
    topic: 'Architecture',
    subtopic: 'Event-Driven'
  },
  {
    id: 'CISA3-105',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Domain-Driven Design (DDD) focuses on:',
    options: [
      'Technical implementation only',
      'Aligning software design with business domain concepts',
      'Database design only',
      'User interface design'
    ],
    correctAnswer: 1,
    explanation: 'DDD focuses on creating software models that reflect business domain concepts and language.',
    topic: 'Software Development',
    subtopic: 'DDD'
  },
  {
    id: 'CISA3-106',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Bounded contexts in DDD:',
    options: [
      'Span entire organizations',
      'Define clear boundaries for domain models',
      'Are unlimited',
      'Only apply to databases'
    ],
    correctAnswer: 1,
    explanation: 'Bounded contexts define explicit boundaries within which specific domain models apply.',
    topic: 'Software Development',
    subtopic: 'Bounded Context'
  },
  {
    id: 'CISA3-108',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Contract testing ensures:',
    options: [
      'Legal compliance',
      'Service interfaces meet consumer expectations',
      'Performance requirements',
      'Security compliance'
    ],
    correctAnswer: 1,
    explanation: 'Contract testing validates that service interfaces meet the expectations defined by consuming services.',
    topic: 'Testing',
    subtopic: 'Contract Testing'
  },
  {
    id: 'CISA3-109',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Test data management should ensure:',
    options: [
      'Use of production data',
      'Realistic data while protecting sensitive information',
      'Minimal data',
      'Random data only'
    ],
    correctAnswer: 1,
    explanation: 'Test data management provides realistic data for testing while protecting sensitive information through masking or synthesis.',
    topic: 'Testing',
    subtopic: 'Test Data'
  },
  {
    id: 'CISA3-110',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Shift-left testing means:',
    options: [
      'Delaying tests',
      'Moving testing earlier in the development cycle',
      'Testing only at deployment',
      'Reducing test coverage'
    ],
    correctAnswer: 1,
    explanation: 'Shift-left moves testing earlier in development to find and fix defects when they are less expensive to address.',
    topic: 'Testing',
    subtopic: 'Shift-Left'
  },
  {
    id: 'CISA3-111',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Mutation testing evaluates:',
    options: [
      'Performance',
      'Test suite effectiveness by introducing code changes',
      'Security vulnerabilities',
      'User acceptance'
    ],
    correctAnswer: 1,
    explanation: 'Mutation testing evaluates test effectiveness by introducing small code changes (mutations) to see if tests catch them.',
    topic: 'Testing',
    subtopic: 'Mutation Testing'
  },
  {
    id: 'CISA3-112',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Chaos testing validates:',
    options: [
      'Normal operation',
      'System behavior under failure conditions',
      'Only happy paths',
      'User interface'
    ],
    correctAnswer: 1,
    explanation: 'Chaos testing validates system resilience by deliberately introducing failures to observe system behavior.',
    topic: 'Testing',
    subtopic: 'Chaos Testing'
  },
  {
    id: 'CISA3-113',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Performance testing types include:',
    options: [
      'Only load testing',
      'Load, stress, endurance, and spike testing',
      'Only unit testing',
      'Only integration testing'
    ],
    correctAnswer: 1,
    explanation: 'Performance testing includes load (expected), stress (beyond capacity), endurance (long duration), and spike testing.',
    topic: 'Testing',
    subtopic: 'Performance Testing'
  },
  {
    id: 'CISA3-114',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Configuration as Code enables:',
    options: [
      'Manual configuration',
      'Version-controlled, repeatable infrastructure configuration',
      'Ad-hoc changes',
      'Undocumented changes'
    ],
    correctAnswer: 1,
    explanation: 'Configuration as Code stores configuration in version control, enabling consistency, review, and auditability.',
    topic: 'DevOps',
    subtopic: 'Configuration as Code'
  },
  {
    id: 'CISA3-115',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'GitOps principles include:',
    options: [
      'Manual deployments',
      'Declarative configuration and Git as single source of truth',
      'No version control',
      'Ad-hoc changes'
    ],
    correctAnswer: 1,
    explanation: 'GitOps uses declarative configuration with Git as the single source of truth for automated deployments.',
    topic: 'DevOps',
    subtopic: 'GitOps'
  },
  {
    id: 'CISA3-116',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Container orchestration platforms provide:',
    options: [
      'Only container runtime',
      'Automated deployment, scaling, and management of containers',
      'Only networking',
      'Only storage'
    ],
    correctAnswer: 1,
    explanation: 'Container orchestration automates deployment, scaling, networking, and management of containerized applications.',
    topic: 'DevOps',
    subtopic: 'Container Orchestration'
  },
  {
    id: 'CISA3-117',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Service mesh provides:',
    options: [
      'Only load balancing',
      'Traffic management, security, and observability for microservices',
      'Only routing',
      'Only authentication'
    ],
    correctAnswer: 1,
    explanation: 'Service mesh provides traffic management, security policies, and observability for microservices communication.',
    topic: 'Architecture',
    subtopic: 'Service Mesh'
  },
  {
    id: 'CISA3-118',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Low-code/no-code platforms:',
    options: [
      'Eliminate all security concerns',
      'Enable faster development but require governance',
      'Replace all developers',
      'Have no limitations'
    ],
    correctAnswer: 1,
    explanation: 'Low-code/no-code enables faster development but requires governance for security, quality, and maintainability.',
    topic: 'Development Approaches',
    subtopic: 'Low-Code'
  },
  {
    id: 'CISA3-119',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'Citizen development programs should include:',
    options: [
      'No oversight',
      'Training, governance, and security guidelines',
      'Full autonomy',
      'No documentation'
    ],
    correctAnswer: 1,
    explanation: 'Citizen developer programs should include training, governance frameworks, security guidelines, and support.',
    topic: 'Development Approaches',
    subtopic: 'Citizen Development'
  },
  {
    id: 'CISA3-120',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'AI/ML model development requires:',
    options: [
      'No documentation',
      'Data quality assurance, bias testing, and model governance',
      'Only algorithm selection',
      'No validation'
    ],
    correctAnswer: 1,
    explanation: 'AI/ML development requires data quality, bias testing, explainability, model governance, and ongoing monitoring.',
    topic: 'AI Development',
    subtopic: 'ML Governance'
  },
  {
    id: 'CISA3-121',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'easy',
    question: 'MLOps addresses:',
    options: [
      'Only model training',
      'End-to-end machine learning lifecycle management',
      'Only deployment',
      'Only data preparation'
    ],
    correctAnswer: 1,
    explanation: 'MLOps addresses the end-to-end ML lifecycle including data prep, training, deployment, and monitoring.',
    topic: 'AI Development',
    subtopic: 'MLOps'
  },
  {
    id: 'CISA3-122',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Post-implementation review (PIR) purposes include:',
    options: [
      'Only finding blame',
      'Assessing benefits realization and capturing lessons learned',
      'Only cost analysis',
      'Only technical review'
    ],
    correctAnswer: 1,
    explanation: 'PIR assesses whether expected benefits were realized and captures lessons learned for future projects.',
    topic: 'Project Management',
    subtopic: 'PIR'
  },
];

export default CISA3_QUESTIONS_BATCH5;
