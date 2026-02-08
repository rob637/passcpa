/**
 * CISA Domain 3: IS Acquisition, Development, and Implementation - Flashcards
 * 12% of exam weight
 */

import { Flashcard } from './types';

export const cisa3Flashcards: Flashcard[] = [
  // Project Governance
  {
    id: 'CISA3-FC-001',
    front: 'What is project governance?',
    back: 'The framework for oversight, decision-making, and accountability for projects. Ensures projects align with strategy and deliver expected value.',
    category: 'Project Governance',
    tags: ['governance', 'project management', 'CISA3'],
  },

  {
    id: 'CISA3-FC-003',
    front: 'What are the triple constraints of project management?',
    back: 'Scope, Time, and Cost (also called Iron Triangle). Changes to one affect the others. Quality is often considered a fourth constraint.',
    category: 'Project Governance',
    tags: ['triple constraints', 'iron triangle', 'CISA3'],
  },
  
  // Methodologies
  {
    id: 'CISA3-FC-004',
    front: 'When is Waterfall methodology most appropriate?',
    back: 'When requirements are well-defined and stable, deliverables are clear, technology is understood, and changes are expected to be minimal.',
    category: 'Methodologies',
    tags: ['waterfall', 'SDLC', 'CISA3'],
  },
  {
    id: 'CISA3-FC-005',
    front: 'When is Agile methodology most appropriate?',
    back: 'When requirements evolve, rapid delivery is needed, customer feedback is valuable, and flexibility is more important than predictability.',
    category: 'Methodologies',
    tags: ['agile', 'SDLC', 'CISA3'],
  },
  {
    id: 'CISA3-FC-006',
    front: 'What are the three pillars of Scrum?',
    back: 'Transparency: Visible process and outcomes\nInspection: Regular progress review\nAdaptation: Adjust based on findings',
    category: 'Methodologies',
    tags: ['scrum', 'agile', 'CISA3'],
  },
  {
    id: 'CISA3-FC-007',
    front: 'What is a Sprint in Scrum?',
    back: 'A time-boxed iteration (typically 2-4 weeks) during which a "done" increment of product is created. Each sprint has a goal and backlog.',
    category: 'Methodologies',
    tags: ['sprint', 'scrum', 'agile', 'CISA3'],
  },
  
  // SDLC Phases
  {
    id: 'CISA3-FC-008',
    front: 'What are the main phases of the SDLC?',
    back: 'Feasibility → Requirements → Design → Development → Testing → Implementation → Maintenance',
    category: 'SDLC',
    tags: ['SDLC phases', 'development', 'CISA3'],
  },
  {
    id: 'CISA3-FC-009',
    front: 'What happens in the Requirements phase?',
    back: 'Define what the system should do: functional requirements (features) and non-functional requirements (performance, security, usability).',
    category: 'SDLC',
    tags: ['requirements', 'SDLC', 'CISA3'],
  },
  {
    id: 'CISA3-FC-010',
    front: 'When is the cost of fixing defects lowest?',
    back: 'During the requirements phase. Cost increases exponentially as defects move through design, development, testing, and production.',
    category: 'SDLC',
    tags: ['defect cost', 'early detection', 'CISA3'],
  },
  
  // Security in Development
  {
    id: 'CISA3-FC-011',
    front: 'What is the OWASP Top 10?',
    back: 'List of the ten most critical web application security risks published by Open Web Application Security Project. Includes injection, broken auth, XSS, etc.',
    category: 'Application Security',
    tags: ['OWASP', 'web security', 'CISA3'],
  },
  {
    id: 'CISA3-FC-012',
    front: 'What is SQL Injection?',
    back: 'Attack where malicious SQL is inserted into input fields, allowing attackers to bypass authentication, access/modify data, or execute admin operations.',
    category: 'Application Security',
    tags: ['SQL injection', 'OWASP', 'attack', 'CISA3'],
  },
  {
    id: 'CISA3-FC-013',
    front: 'How do you prevent SQL Injection?',
    back: 'Use parameterized queries/prepared statements, input validation, least privilege database accounts, and stored procedures with proper permissions.',
    category: 'Application Security',
    tags: ['SQL injection', 'prevention', 'CISA3'],
  },
  {
    id: 'CISA3-FC-014',
    front: 'What is SAST vs DAST?',
    back: 'SAST (Static Application Security Testing): Analyzes source code for vulnerabilities\nDAST (Dynamic Application Security Testing): Tests running application from outside',
    category: 'Application Security',
    tags: ['SAST', 'DAST', 'security testing', 'CISA3'],
  },
  {
    id: 'CISA3-FC-015',
    front: 'What is DevSecOps?',
    back: 'Integration of security into DevOps practices. Security "shifts left" into development and is automated in CI/CD pipelines rather than added at the end.',
    category: 'Application Security',
    tags: ['DevSecOps', 'shift left', 'CI/CD', 'CISA3'],
  },
  
  // Testing
  {
    id: 'CISA3-FC-016',
    front: 'What is the difference between unit testing and integration testing?',
    back: 'Unit testing: Tests individual components in isolation\nIntegration testing: Tests how components work together',
    category: 'Testing',
    tags: ['unit testing', 'integration testing', 'CISA3'],
  },
  {
    id: 'CISA3-FC-017',
    front: 'What is User Acceptance Testing (UAT)?',
    back: 'Testing by end users to verify the system meets business requirements and is ready for production. Business decides if system is acceptable.',
    category: 'Testing',
    tags: ['UAT', 'acceptance testing', 'CISA3'],
  },
  {
    id: 'CISA3-FC-018',
    front: 'What is regression testing?',
    back: 'Re-testing after changes to ensure modifications haven\'t broken existing functionality. Critical after bug fixes and enhancements.',
    category: 'Testing',
    tags: ['regression testing', 'CISA3'],
  },
  
  // Change Management
  {
    id: 'CISA3-FC-019',
    front: 'Why is change management important?',
    back: 'To control and document changes systematically, preventing unauthorized modifications, minimizing disruption, and maintaining system integrity.',
    category: 'Change Management',
    tags: ['change management', 'change control', 'CISA3'],
  },
  {
    id: 'CISA3-FC-020',
    front: 'What are the key steps in change management?',
    back: '1. Request and document change\n2. Impact assessment\n3. Approval (CAB)\n4. Testing\n5. Implementation\n6. Review/closure',
    category: 'Change Management',
    tags: ['change process', 'CAB', 'CISA3'],
  },
  {
    id: 'CISA3-FC-021',
    front: 'What is a Change Advisory Board (CAB)?',
    back: 'Committee that reviews and approves/rejects change requests. Typically includes IT, security, business representatives. Assesses impact and risk.',
    category: 'Change Management',
    tags: ['CAB', 'change approval', 'CISA3'],
  },
  {
    id: 'CISA3-FC-022',
    front: 'What is an emergency change?',
    back: 'A change required urgently to resolve a critical incident or security vulnerability. May bypass normal approval but requires post-implementation review.',
    category: 'Change Management',
    tags: ['emergency change', 'expedited', 'CISA3'],
  },
  
  // System Acquisition
  {
    id: 'CISA3-FC-023',
    front: 'What is an RFP?',
    back: 'Request for Proposal - formal document soliciting vendor proposals for a project. Includes requirements, evaluation criteria, and submission guidelines.',
    category: 'System Acquisition',
    tags: ['RFP', 'vendor selection', 'procurement', 'CISA3'],
  },
  {
    id: 'CISA3-FC-024',
    front: 'What is a feasibility study?',
    back: 'Analysis to determine if a project is viable. Examines technical, operational, economic, schedule, and legal feasibility before committing resources.',
    category: 'System Acquisition',
    tags: ['feasibility study', 'project initiation', 'CISA3'],
  },
  
  // Implementation
  {
    id: 'CISA3-FC-025',
    front: 'What are the four implementation approaches?',
    back: 'Parallel: Run old and new simultaneously\nPhased: Implement by module or location\nBig Bang: Complete cutover at once\nPilot: Test with subset first',
    category: 'Implementation',
    tags: ['implementation approaches', 'cutover', 'CISA3'],
  },
  {
    id: 'CISA3-FC-026',
    front: 'What is Post-Implementation Review (PIR)?',
    back: 'Formal evaluation after go-live to assess if project delivered expected benefits, identify lessons learned, and address remaining issues.',
    category: 'Implementation',
    tags: ['PIR', 'post-implementation', 'lessons learned', 'CISA3'],
  },
  
  // Configuration Management
  {
    id: 'CISA3-FC-027',
    front: 'What is a CMDB?',
    back: 'Configuration Management Database - repository containing information about configuration items (CIs) and their relationships. Foundation for IT operations.',
    category: 'Configuration Management',
    tags: ['CMDB', 'configuration items', 'CISA3'],
  },
  {
    id: 'CISA3-FC-028',
    front: 'What is version control?',
    back: 'System that tracks and manages changes to code/documents. Maintains history, supports branching/merging, enables rollback. Example: Git.',
    category: 'Configuration Management',
    tags: ['version control', 'Git', 'source control', 'CISA3'],
  },
  {
    id: 'CISA3-FC-029',
    front: 'What is Infrastructure as Code (IaC)?',
    back: 'Managing infrastructure through code/scripts instead of manual processes. Enables version control, testing, and consistent deployments. Examples: Terraform, Ansible.',
    category: 'Configuration Management',
    tags: ['IaC', 'automation', 'infrastructure', 'CISA3'],
  },
  {
    id: 'CISA3-FC-030',
    front: 'What is a CI/CD pipeline?',
    back: 'Continuous Integration/Continuous Deployment - automated process to build, test, and deploy code changes. Enables rapid, reliable software delivery.',
    category: 'Configuration Management',
    tags: ['CI/CD', 'automation', 'DevOps', 'CISA3'],
  },
];

export default cisa3Flashcards;
