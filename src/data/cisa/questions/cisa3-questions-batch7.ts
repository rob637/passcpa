/**
 * CISA Domain 3: Information Systems Acquisition, Development, and Implementation
 * Batch 7 - 20 MCQs (Final batch for Domain 3)
 * Based on ISACA CISA Review Manual
 */

import { Question } from '../../../types';

export const CISA3_QUESTIONS_BATCH7: Question[] = [
  {
    id: 'CISA3-153',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'MLOps (Machine Learning Operations) practices ensure:',
    options: [
      'Only model training',
      'Continuous integration, deployment, and monitoring of ML models',
      'Only data collection',
      'Only algorithm selection'
    ],
    correctAnswer: 1,
    explanation: 'MLOps provides CI/CD, versioning, monitoring, and governance for machine learning models.',
    topic: 'AI/ML Development',
    subtopic: 'MLOps'
  },
  {
    id: 'CISA3-154',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Model bias testing should occur:',
    options: [
      'Only after deployment',
      'Throughout the ML lifecycle from training through production',
      'Only during training',
      'Never'
    ],
    correctAnswer: 1,
    explanation: 'Bias testing should occur throughout the ML lifecycle, not just during initial development.',
    topic: 'AI/ML Development',
    subtopic: 'AI Fairness'
  },
  {
    id: 'CISA3-155',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Feature engineering governance ensures:',
    options: [
      'Only performance',
      'Appropriate data usage and feature transparency',
      'Only speed',
      'Only accuracy'
    ],
    correctAnswer: 1,
    explanation: 'Feature engineering governance ensures appropriate data usage and feature transparency.',
    topic: 'AI/ML Development',
    subtopic: 'Feature Engineering'
  },
  {
    id: 'CISA3-156',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Data lineage in development environments tracks:',
    options: [
      'Only storage location',
      'Origin, transformations, and usage of data throughout systems',
      'Only access',
      'Only cost'
    ],
    correctAnswer: 1,
    explanation: 'Data lineage tracks data origin, transformations, and usage for governance and compliance.',
    topic: 'Data Management',
    subtopic: 'Data Lineage'
  },
  {
    id: 'CISA3-157',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Event-driven architecture testing should verify:',
    options: [
      'Only latency',
      'Event ordering, idempotency, and eventual consistency',
      'Only throughput',
      'Only security'
    ],
    correctAnswer: 1,
    explanation: 'Event-driven testing verifies ordering, idempotency, delivery guarantees, and consistency.',
    topic: 'System Architecture',
    subtopic: 'Event-Driven Architecture'
  },
  {
    id: 'CISA3-158',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Contract testing in microservices:',
    options: [
      'Tests legal contracts',
      'Validates API compatibility between services',
      'Only tests UI',
      'Replaces integration testing'
    ],
    correctAnswer: 1,
    explanation: 'Contract testing validates API compatibility between service consumers and providers.',
    topic: 'Testing',
    subtopic: 'Contract Testing'
  },
  {
    id: 'CISA3-159',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Chaos engineering practices involve:',
    options: [
      'Random destruction',
      'Controlled experiments to test system resilience',
      'Only production outages',
      'Avoiding all failures'
    ],
    correctAnswer: 1,
    explanation: 'Chaos engineering uses controlled experiments to test and improve system resilience.',
    topic: 'Testing',
    subtopic: 'Chaos Engineering'
  },
  {
    id: 'CISA3-160',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Database schema migration automation should include:',
    options: [
      'Manual scripts only',
      'Version control, rollback capability, and validation',
      'No testing',
      'Direct production changes'
    ],
    correctAnswer: 1,
    explanation: 'Schema migration automation includes version control, rollback capability, and validation.',
    topic: 'Database Development',
    subtopic: 'Schema Migration'
  },
  {
    id: 'CISA3-161',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Service mesh implementation provides:',
    options: [
      'Only networking',
      'Traffic management, security, and observability for microservices',
      'Only load balancing',
      'Only encryption'
    ],
    correctAnswer: 1,
    explanation: 'Service mesh provides traffic management, mTLS security, and observability for microservices.',
    topic: 'System Architecture',
    subtopic: 'Service Mesh'
  },
  {
    id: 'CISA3-162',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Zero-trust architecture in development requires:',
    options: [
      'No security controls',
      'Authentication and authorization at every service interaction',
      'Perimeter security only',
      'Trust all internal traffic'
    ],
    correctAnswer: 1,
    explanation: 'Zero-trust requires authentication and authorization at every service interaction point.',
    topic: 'Security Architecture',
    subtopic: 'Zero Trust'
  },
  {
    id: 'CISA3-163',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Database performance tuning during development should address:',
    options: [
      'Only storage',
      'Query optimization, indexing, and connection pooling',
      'Only backup',
      'Only security'
    ],
    correctAnswer: 1,
    explanation: 'Performance tuning addresses query optimization, indexing strategies, and connection pooling.',
    topic: 'Database Development',
    subtopic: 'Performance Tuning'
  },
  {
    id: 'CISA3-164',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Observability implementation goes beyond monitoring by providing:',
    options: [
      'Same as monitoring',
      'Metrics, logs, and traces for system understanding',
      'Only alerts',
      'Only dashboards'
    ],
    correctAnswer: 1,
    explanation: 'Observability provides metrics, logs, and distributed traces for deep system understanding.',
    topic: 'System Architecture',
    subtopic: 'Observability'
  },
  {
    id: 'CISA3-165',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Data mesh architecture decentralizes:',
    options: [
      'Security only',
      'Data ownership and governance to domain teams',
      'Infrastructure only',
      'Nothing'
    ],
    correctAnswer: 1,
    explanation: 'Data mesh decentralizes data ownership to domain teams while maintaining federated governance.',
    topic: 'Data Architecture',
    subtopic: 'Data Mesh'
  },
  {
    id: 'CISA3-166',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'GraphQL API development considerations include:',
    options: [
      'Only query types',
      'Query complexity limits, authorization, and rate limiting',
      'Only mutations',
      'Only subscriptions'
    ],
    correctAnswer: 1,
    explanation: 'GraphQL development requires query complexity limits, authorization, and rate limiting controls.',
    topic: 'API Development',
    subtopic: 'GraphQL'
  },
  {
    id: 'CISA3-168',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Federated identity in application development requires:',
    options: [
      'Local authentication only',
      'Trust relationships with external identity providers',
      'No standards',
      'Password-only authentication'
    ],
    correctAnswer: 1,
    explanation: 'Federated identity requires trust relationships and standards like SAML or OIDC.',
    topic: 'Security Development',
    subtopic: 'Federated Identity'
  },
  {
    id: 'CISA3-169',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Progressive delivery strategies include:',
    options: [
      'Big bang only',
      'Canary releases, feature flags, and ring deployments',
      'Manual rollouts only',
      'No testing'
    ],
    correctAnswer: 1,
    explanation: 'Progressive delivery uses canary releases, feature flags, and ring deployments for safe rollouts.',
    topic: 'SDLC',
    subtopic: 'Progressive Delivery'
  },
  {
    id: 'CISA3-170',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'API gateway security functions include:',
    options: [
      'Routing only',
      'Authentication, rate limiting, and request validation',
      'Load balancing only',
      'Caching only'
    ],
    correctAnswer: 1,
    explanation: 'API gateways provide authentication, rate limiting, validation, and other security controls.',
    topic: 'API Development',
    subtopic: 'API Gateway'
  },
  {
    id: 'CISA3-171',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Immutable infrastructure principles require:',
    options: [
      'In-place updates',
      'Replacing rather than modifying deployed components',
      'No automation',
      'Manual configuration'
    ],
    correctAnswer: 1,
    explanation: 'Immutable infrastructure replaces components rather than modifying them in place.',
    topic: 'Infrastructure',
    subtopic: 'Immutable Infrastructure'
  },
  {
    id: 'CISA3-172',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Software bill of materials (SBOM) provides:',
    options: [
      'Cost information',
      'Inventory of components and dependencies in software',
      'Only licensing data',
      'Only version numbers'
    ],
    correctAnswer: 1,
    explanation: 'SBOM provides comprehensive inventory of components and dependencies for security analysis.',
    topic: 'Security Development',
    subtopic: 'SBOM'
  },
];

export default CISA3_QUESTIONS_BATCH7;
