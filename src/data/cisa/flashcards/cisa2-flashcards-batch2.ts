/**
 * CISA Domain 2: Governance and Management of IT - Flashcards Batch 2
 * Additional flashcards covering advanced topics
 */

import { Flashcard } from './types';

export const cisa2FlashcardsBatch2: Flashcard[] = [
  // IT Governance Advanced
  {
    id: 'cisa2-fc-032',
    front: 'What is the role of the IT Steering Committee?',
    back: 'Provides strategic direction, prioritizes IT initiatives, ensures alignment with business goals, and resolves cross-functional issues.',
    category: 'IT Governance',
    tags: ['governance', 'steering committee', 'CISA2'],
  },
  {
    id: 'cisa2-fc-033',
    front: 'What are the five COBIT governance objectives?',
    back: 'Benefits Realization, Risk Optimization, Resource Optimization, plus Evaluate-Direct-Monitor cycle for governance processes.',
    category: 'IT Governance',
    tags: ['COBIT', 'governance', 'CISA2'],
  },
  {
    id: 'cisa2-fc-034',
    front: 'What is the difference between IT governance and IT management?',
    back: 'Governance: WHAT outcomes (direction, evaluation). Management: HOW to achieve (planning, building, running, monitoring).',
    category: 'IT Governance',
    tags: ['governance', 'management', 'CISA2'],
  },
  {
    id: 'cisa2-fc-035',
    front: 'What is strategic alignment in IT governance?',
    back: 'Ensuring IT strategy, operations, and investments support and enable business strategy and objectives.',
    category: 'IT Governance',
    tags: ['alignment', 'strategy', 'CISA2'],
  },
  
  // Risk Management
  {
    id: 'cisa2-fc-036',
    front: 'What is the difference between risk appetite and risk tolerance?',
    back: 'Appetite: Amount/type of risk willing to accept. Tolerance: Acceptable variation from risk appetite in specific instances.',
    category: 'Risk Management',
    tags: ['risk appetite', 'risk tolerance', 'CISA2'],
  },
  {
    id: 'cisa2-fc-037',
    front: 'What are the four risk treatment options?',
    back: 'Accept, Avoid, Transfer, Mitigate (reduce likelihood or impact through controls).',
    category: 'Risk Management',
    tags: ['risk treatment', 'risk response', 'CISA2'],
  },

  {
    id: 'cisa2-fc-039',
    front: 'What is a key risk indicator (KRI)?',
    back: 'A metric that provides early warning of increasing risk exposure, enabling proactive risk management.',
    category: 'Risk Management',
    tags: ['KRI', 'metrics', 'CISA2'],
  },
  {
    id: 'cisa2-fc-040',
    front: 'What should a risk register contain?',
    back: 'Risk description, likelihood, impact, rating, owner, controls, residual risk, treatment plan, and status.',
    category: 'Risk Management',
    tags: ['risk register', 'documentation', 'CISA2'],
  },
  
  // Performance Measurement
  {
    id: 'cisa2-fc-041',
    front: 'What is an IT Balanced Scorecard?',
    back: 'Performance measurement framework with four perspectives: Financial, Customer, Internal Process, and Learning & Growth.',
    category: 'Performance',
    tags: ['balanced scorecard', 'KPI', 'CISA2'],
  },
  {
    id: 'cisa2-fc-042',
    front: 'What is the difference between leading and lagging indicators?',
    back: 'Leading: Predict future performance (forward-looking). Lagging: Measure past performance (backward-looking).',
    category: 'Performance',
    tags: ['indicators', 'metrics', 'CISA2'],
  },
  {
    id: 'cisa2-fc-043',
    front: 'What is total cost of ownership (TCO)?',
    back: 'Complete cost including acquisition, implementation, operation, maintenance, and disposal over the asset lifecycle.',
    category: 'Performance',
    tags: ['TCO', 'cost', 'CISA2'],
  },
  {
    id: 'cisa2-fc-044',
    front: 'How is IT value demonstrated?',
    back: 'Through business benefits realized (revenue increase, cost reduction, risk reduction, compliance) not just technology metrics.',
    category: 'Performance',
    tags: ['value', 'benefits', 'CISA2'],
  },
  
  // Resource Management
  {
    id: 'cisa2-fc-045',
    front: 'What is capacity planning?',
    back: 'Ensuring IT resources (compute, storage, network) are adequate for current needs and anticipated future demands.',
    category: 'Resource Management',
    tags: ['capacity', 'planning', 'CISA2'],
  },
  {
    id: 'cisa2-fc-046',
    front: 'Why is succession planning important for IT?',
    back: 'Ensures continuity of critical IT functions if key personnel leave - reduces key person dependency risk.',
    category: 'Resource Management',
    tags: ['succession', 'HR', 'CISA2'],
  },
  {
    id: 'cisa2-fc-047',
    front: 'What should an IT asset inventory include?',
    back: 'Asset details, location, owner, criticality, lifecycle stage, software installed, configurations, and relationships.',
    category: 'Resource Management',
    tags: ['asset management', 'inventory', 'CISA2'],
  },
  
  // Organizational Structure
  {
    id: 'cisa2-fc-048',
    front: 'What SoD conflicts should exist between IT functions?',
    back: 'Separate: Development from Operations, Security from Network, Programming from Computer Operations, Testing from Development.',
    category: 'Organization',
    tags: ['SoD', 'segregation', 'CISA2'],
  },
  {
    id: 'cisa2-fc-049',
    front: 'What is the role of a data owner?',
    back: 'Business executive accountable for data: classification, access authorization, quality, and lifecycle management.',
    category: 'Organization',
    tags: ['data owner', 'roles', 'CISA2'],
  },
  {
    id: 'cisa2-fc-050',
    front: 'What is the role of a data custodian?',
    back: 'IT role responsible for technical implementation: data storage, backup, security controls, access provision.',
    category: 'Organization',
    tags: ['data custodian', 'roles', 'CISA2'],
  },
  
  // Policy and Compliance
  {
    id: 'cisa2-fc-051',
    front: 'What is the hierarchy of IT governance documents?',
    back: 'Policy (what): management intent. Standard (what): specific requirements. Procedure (how): step-by-step. Guidelines: recommendations.',
    category: 'Policy',
    tags: ['policy', 'standards', 'CISA2'],
  },
  {
    id: 'cisa2-fc-052',
    front: 'Who should approve IT policies?',
    back: 'Senior management or board depending on policy scope. Enterprise-wide policies need business stakeholder input.',
    category: 'Policy',
    tags: ['policy', 'approval', 'CISA2'],
  },
  {
    id: 'cisa2-fc-053',
    front: 'What is the purpose of a policy exception process?',
    back: 'Formally document and approve deviations from policy with risk assessment and compensating controls.',
    category: 'Policy',
    tags: ['exception', 'policy', 'CISA2'],
  },
  
  // Third-Party Management

  {
    id: 'cisa2-fc-055',
    front: 'What should a vendor contract include for risk management?',
    back: 'SLAs, security requirements, compliance obligations, right-to-audit, data protection, incident notification, exit terms.',
    category: 'Third-Party',
    tags: ['contract', 'vendor', 'CISA2'],
  },
  {
    id: 'cisa2-fc-056',
    front: 'What is the risk of vendor concentration?',
    back: 'Over-reliance on single vendor creates risk if vendor fails - reduces bargaining power and creates lock-in.',
    category: 'Third-Party',
    tags: ['vendor risk', 'concentration', 'CISA2'],
  },
  
  // IT Investment
  {
    id: 'cisa2-fc-057',
    front: 'What should a business case for IT investment include?',
    back: 'Problem/opportunity, proposed solution, costs, benefits, risks, alternatives, timeline, and success criteria.',
    category: 'Investment',
    tags: ['business case', 'investment', 'CISA2'],
  },
  {
    id: 'cisa2-fc-058',
    front: 'What is portfolio management for IT?',
    back: 'Managing IT investments as a portfolio to optimize value, balance risk, and align with strategy.',
    category: 'Investment',
    tags: ['portfolio', 'investment', 'CISA2'],
  },
  
  // Enterprise Architecture
  {
    id: 'cisa2-fc-059',
    front: 'What is enterprise architecture?',
    back: 'Framework describing current and target states of business and IT components and the roadmap between them.',
    category: 'Architecture',
    tags: ['EA', 'architecture', 'CISA2'],
  },
  {
    id: 'cisa2-fc-060',
    front: 'What is TOGAF?',
    back: 'The Open Group Architecture Framework - a methodology for enterprise architecture development and governance.',
    category: 'Architecture',
    tags: ['TOGAF', 'framework', 'CISA2'],
  },
  {
    id: 'cisa2-fc-061',
    front: 'What layers compose enterprise architecture?',
    back: 'Business architecture, Data architecture, Application architecture, Technology architecture.',
    category: 'Architecture',
    tags: ['EA layers', 'architecture', 'CISA2'],
  },
  
  // Project Management
  {
    id: 'cisa2-fc-062',
    front: 'What is a project charter?',
    back: 'Document that formally authorizes a project, defines objectives, scope, stakeholders, and project manager authority.',
    category: 'Project Management',
    tags: ['project charter', 'PMO', 'CISA2'],
  },
  {
    id: 'cisa2-fc-063',
    front: 'What is scope creep?',
    back: 'Uncontrolled expansion of project scope without corresponding adjustments to time, cost, and resources.',
    category: 'Project Management',
    tags: ['scope creep', 'project', 'CISA2'],
  },
  {
    id: 'cisa2-fc-064',
    front: 'What is the role of a project steering committee?',
    back: 'Provides oversight, guidance, and decision-making for the project - resolves issues and approves changes.',
    category: 'Project Management',
    tags: ['steering committee', 'project', 'CISA2'],
  },
  
  // Quality Management
  {
    id: 'cisa2-fc-065',
    front: 'What is quality assurance vs. quality control?',
    back: 'QA: Process focused - preventing defects through good processes. QC: Product focused - detecting defects through inspection.',
    category: 'Quality',
    tags: ['QA', 'QC', 'quality', 'CISA2'],
  },
  {
    id: 'cisa2-fc-066',
    front: 'What is a maturity model?',
    back: 'Framework measuring process capability from initial/ad-hoc to optimized (typically 5 levels). Example: CMMI.',
    category: 'Quality',
    tags: ['maturity', 'CMMI', 'CISA2'],
  },
  {
    id: 'cisa2-fc-067',
    front: 'What is the purpose of benchmarking?',
    back: 'Comparing performance against internal standards, peers, or industry best practices to identify improvement opportunities.',
    category: 'Quality',
    tags: ['benchmarking', 'performance', 'CISA2'],
  },
  
  // Service Management

  {
    id: 'cisa2-fc-069',
    front: 'What is a service level agreement (SLA)?',
    back: 'Documented agreement between service provider and customer defining services, metrics, and targets.',
    category: 'Service Management',
    tags: ['SLA', 'service', 'CISA2'],
  },
  {
    id: 'cisa2-fc-070',
    front: 'What should SLAs include?',
    back: 'Service description, availability targets, response times, support hours, escalation, penalties, and exclusions.',
    category: 'Service Management',
    tags: ['SLA', 'components', 'CISA2'],
  },
  {
    id: 'cisa2-fc-071',
    front: 'What is an Operational Level Agreement (OLA)?',
    back: 'Internal agreement between IT teams supporting delivery of external SLAs - defines internal service commitments.',
    category: 'Service Management',
    tags: ['OLA', 'service', 'CISA2'],
  },
];
