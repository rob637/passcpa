/**
 * CISA Domain 3: Information Systems Acquisition, Development, and Implementation
 * Batch 5 - 30 MCQs
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA3_QUESTIONS_BATCH5: Question[] = [
  {
    id: 'cisa3-093',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-094',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
    id: 'cisa3-095',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
    id: 'cisa3-096',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-097',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-098',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-099',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-100',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
    id: 'cisa3-101',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-102',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-103',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
    id: 'cisa3-104',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-105',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-106',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-108',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-109',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
    id: 'cisa3-110',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
    id: 'cisa3-111',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-112',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-113',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-114',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-115',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
    id: 'cisa3-116',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-117',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-118',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
    id: 'cisa3-119',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-120',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
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
    id: 'cisa3-121',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
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
    id: 'cisa3-122',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
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
