/**
 * CISA Domain 3: IS Acquisition, Development, Implementation - Flashcards Batch 2
 * Additional flashcards covering advanced topics
 */

import { Flashcard } from './types';

export const cisa3FlashcardsBatch2: Flashcard[] = [
  // SDLC Advanced
  {
    id: 'cisa3-fc-032',
    front: 'What are the phases of the waterfall SDLC?',
    back: 'Feasibility, Requirements, Design, Development, Testing, Implementation, Maintenance.',
    category: 'SDLC',
    tags: ['waterfall', 'SDLC', 'CISA3'],
  },
  {
    id: 'cisa3-fc-033',
    front: 'What are advantages of waterfall methodology?',
    back: 'Clear phases and milestones, extensive documentation, well-suited for stable requirements.',
    category: 'SDLC',
    tags: ['waterfall', 'advantages', 'CISA3'],
  },
  {
    id: 'cisa3-fc-034',
    front: 'What are disadvantages of waterfall methodology?',
    back: 'Inflexible to changes, late testing, users see product late, difficult to accommodate changing requirements.',
    category: 'SDLC',
    tags: ['waterfall', 'disadvantages', 'CISA3'],
  },
  {
    id: 'cisa3-fc-035',
    front: 'What is Agile development?',
    back: 'Iterative approach with short cycles (sprints), continuous delivery, collaboration, and adaptability to change.',
    category: 'SDLC',
    tags: ['agile', 'methodology', 'CISA3'],
  },


  
  // Project Management

  {
    id: 'cisa3-fc-039',
    front: 'What is function point analysis?',
    back: 'Method to estimate software size and effort based on functional requirements (inputs, outputs, inquiries, files, interfaces).',
    category: 'Project Management',
    tags: ['function points', 'estimation', 'CISA3'],
  },

  {
    id: 'cisa3-fc-041',
    front: 'What is the critical path in project management?',
    back: 'Longest sequence of dependent tasks that determines minimum project duration - any delay extends the project.',
    category: 'Project Management',
    tags: ['critical path', 'scheduling', 'CISA3'],
  },
  
  // Requirements and Design
  {
    id: 'cisa3-fc-042',
    front: 'What are functional requirements?',
    back: 'Requirements describing what the system should do - features, capabilities, and business functions.',
    category: 'Requirements',
    tags: ['functional', 'requirements', 'CISA3'],
  },
  {
    id: 'cisa3-fc-043',
    front: 'What are non-functional requirements?',
    back: 'Requirements describing how the system should perform - performance, security, availability, usability.',
    category: 'Requirements',
    tags: ['non-functional', 'requirements', 'CISA3'],
  },
  {
    id: 'cisa3-fc-044',
    front: 'What is requirements traceability?',
    back: 'Linking requirements through design, development, and testing to ensure all requirements are implemented and tested.',
    category: 'Requirements',
    tags: ['traceability', 'requirements', 'CISA3'],
  },
  {
    id: 'cisa3-fc-045',
    front: 'What is prototyping?',
    back: 'Creating early model of system to visualize requirements, gather feedback, and refine design before development.',
    category: 'Design',
    tags: ['prototyping', 'design', 'CISA3'],
  },
  
  // Testing
  {
    id: 'cisa3-fc-046',
    front: 'What is unit testing?',
    back: 'Testing individual components or modules in isolation to verify they function correctly.',
    category: 'Testing',
    tags: ['unit testing', 'testing', 'CISA3'],
  },
  {
    id: 'cisa3-fc-047',
    front: 'What is integration testing?',
    back: 'Testing how modules/components work together - verifying interfaces and data flow between components.',
    category: 'Testing',
    tags: ['integration', 'testing', 'CISA3'],
  },
  {
    id: 'cisa3-fc-048',
    front: 'What is system testing?',
    back: 'Testing complete integrated system against requirements to verify end-to-end functionality.',
    category: 'Testing',
    tags: ['system testing', 'testing', 'CISA3'],
  },
  {
    id: 'cisa3-fc-049',
    front: 'What is UAT (User Acceptance Testing)?',
    back: 'Final testing by business users to verify system meets business requirements and is ready for production.',
    category: 'Testing',
    tags: ['UAT', 'testing', 'CISA3'],
  },

  {
    id: 'cisa3-fc-051',
    front: 'What is alpha testing vs beta testing?',
    back: 'Alpha: Internal testing before release. Beta: Testing with limited external users before general release.',
    category: 'Testing',
    tags: ['alpha', 'beta', 'testing', 'CISA3'],
  },
  
  // Security in Development
  {
    id: 'cisa3-fc-052',
    front: 'What is secure SDLC?',
    back: 'Integrating security activities into each SDLC phase - requirements, design, coding, testing, deployment.',
    category: 'Security',
    tags: ['secure SDLC', 'security', 'CISA3'],
  },
  {
    id: 'cisa3-fc-053',
    front: 'What is SAST (Static Application Security Testing)?',
    back: 'Analyzing source code without executing it to find potential security vulnerabilities.',
    category: 'Security',
    tags: ['SAST', 'security testing', 'CISA3'],
  },
  {
    id: 'cisa3-fc-054',
    front: 'What is DAST (Dynamic Application Security Testing)?',
    back: 'Testing running application from outside (black-box) to find vulnerabilities.',
    category: 'Security',
    tags: ['DAST', 'security testing', 'CISA3'],
  },
  {
    id: 'cisa3-fc-055',
    front: 'What is threat modeling?',
    back: 'Structured approach to identify security threats, vulnerabilities, and countermeasures during design.',
    category: 'Security',
    tags: ['threat modeling', 'security', 'CISA3'],
  },

  
  // Change Management
  {
    id: 'cisa3-fc-057',
    front: 'What is change management?',
    back: 'Process controlling modifications to systems to minimize disruption and ensure proper authorization, testing, and documentation.',
    category: 'Change Management',
    tags: ['change management', 'controls', 'CISA3'],
  },
  {
    id: 'cisa3-fc-058',
    front: 'What is a CAB (Change Advisory Board)?',
    back: 'Group that reviews, prioritizes, and authorizes changes. Includes IT and business representatives.',
    category: 'Change Management',
    tags: ['CAB', 'change', 'CISA3'],
  },
  {
    id: 'cisa3-fc-059',
    front: 'What should be included in a change request?',
    back: 'Description, justification, impact assessment, testing plan, rollback plan, approvals, implementation schedule.',
    category: 'Change Management',
    tags: ['change request', 'documentation', 'CISA3'],
  },

  
  // Configuration Management
  {
    id: 'cisa3-fc-061',
    front: 'What is configuration management?',
    back: 'Process identifying, controlling, and tracking configuration items to maintain system integrity.',
    category: 'Configuration',
    tags: ['configuration', 'controls', 'CISA3'],
  },
  {
    id: 'cisa3-fc-062',
    front: 'What is a configuration item (CI)?',
    back: 'Any component that needs to be managed - hardware, software, documentation, or service component.',
    category: 'Configuration',
    tags: ['CI', 'configuration', 'CISA3'],
  },


  
  // Implementation
  {
    id: 'cisa3-fc-065',
    front: 'What is parallel conversion?',
    back: 'Running old and new systems simultaneously to compare results before retiring old system. Safest but most expensive.',
    category: 'Implementation',
    tags: ['parallel', 'conversion', 'CISA3'],
  },
  {
    id: 'cisa3-fc-066',
    front: 'What is direct cutover?',
    back: 'Immediate switch from old to new system. Risky but fastest. Requires thorough testing and solid rollback plan.',
    category: 'Implementation',
    tags: ['cutover', 'conversion', 'CISA3'],
  },
  {
    id: 'cisa3-fc-067',
    front: 'What is phased implementation?',
    back: 'Implementing new system incrementally by function or location. Reduces risk but extends implementation.',
    category: 'Implementation',
    tags: ['phased', 'implementation', 'CISA3'],
  },
  {
    id: 'cisa3-fc-068',
    front: 'What is data migration?',
    back: 'Moving data from old to new system. Requires mapping, validation, cleansing, and verification.',
    category: 'Implementation',
    tags: ['data migration', 'implementation', 'CISA3'],
  },
  {
    id: 'cisa3-fc-069',
    front: 'What is post-implementation review?',
    back: 'Assessment after go-live to evaluate whether objectives were met, lessons learned, and benefits realized.',
    category: 'Implementation',
    tags: ['PIR', 'review', 'CISA3'],
  },
  
  // Acquisition
  {
    id: 'cisa3-fc-070',
    front: 'What is an RFP (Request for Proposal)?',
    back: 'Document sent to vendors requesting detailed proposals including solutions, costs, and implementation approach.',
    category: 'Acquisition',
    tags: ['RFP', 'procurement', 'CISA3'],
  },
  {
    id: 'cisa3-fc-071',
    front: 'What is source code escrow?',
    back: 'Arrangement where source code is held by third party for release if vendor fails to support the software.',
    category: 'Acquisition',
    tags: ['escrow', 'vendor', 'CISA3'],
  },
];
