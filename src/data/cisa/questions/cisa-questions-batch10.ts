/**
 * CISA All Domains Batch 10
 * 100 questions across all 5 domains
 * Certified Information Systems Auditor exam preparation
 */

import { Question } from '../../../types';

const ALL_BATCH10: Question[] = [
  // ===========================================================================
  // DOMAIN 1: INFORMATION SYSTEMS AUDITING PROCESS (20 questions)
  // ===========================================================================
  
  {
    id: 'cisa1-b10-001',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Risk-based audit planning ensures that:',
    options: [
      'All areas receive equal audit attention',
      'Audit resources are allocated to areas with the highest risk',
      'Audits are completed faster',
      'Management selects audit areas'
    ],
    correctAnswer: 1,
    explanation: 'Risk-based planning prioritizes audit resources toward areas with the highest risk to organizational objectives.',
    topic: 'Planning',
    subtopic: 'Risk-Based Audit Planning'
  },
  {
    id: 'cisa1-b10-002',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The audit universe should be:',
    options: [
      'Static and unchanged annually',
      'Updated periodically to reflect organizational and environmental changes',
      'Limited to IT systems only',
      'Approved only by internal audit'
    ],
    correctAnswer: 1,
    explanation: 'The audit universe should be dynamic and updated to reflect changes in the organization, new systems, and emerging risks.',
    topic: 'Planning',
    subtopic: 'Audit Universe'
  },
  {
    id: 'cisa1-b10-003',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Materiality in IS auditing refers to:',
    options: [
      'Only financial significance',
      'The significance or importance of an item in the context of the audit',
      'Physical size of systems',
      'Number of users'
    ],
    correctAnswer: 1,
    explanation: 'Materiality considers the significance of an item including financial, operational, regulatory, and reputational aspects.',
    topic: 'Execution',
    subtopic: 'Materiality'
  },
  {
    id: 'cisa1-b10-004',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When relying on the work of another auditor, the IS auditor should FIRST:',
    options: [
      'Accept the work without question',
      'Assess the competence and objectivity of the other auditor',
      'Repeat all testing',
      'Report combined findings immediately'
    ],
    correctAnswer: 1,
    explanation: 'Before relying on another auditor\'s work, the IS auditor must evaluate their professional competence and objectivity.',
    topic: 'Execution',
    subtopic: 'Reliance on Other Auditors'
  },
  {
    id: 'cisa1-b10-005',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Audit working papers should be:',
    options: [
      'Discarded after the audit',
      'Retained according to organizational and legal requirements',
      'Given to the auditee',
      'Shared externally without restriction'
    ],
    correctAnswer: 1,
    explanation: 'Working papers must be retained according to organizational policies and legal/regulatory requirements for documentation and defensibility.',
    topic: 'Execution',
    subtopic: 'Documentation'
  },
  {
    id: 'cisa1-b10-006',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Detection risk is the risk that:',
    options: [
      'Controls fail to prevent errors',
      'Audit procedures fail to detect material errors that exist',
      'Errors occur in the first place',
      'Management ignores findings'
    ],
    correctAnswer: 1,
    explanation: 'Detection risk is the risk that audit procedures will not detect material misstatements or control deficiencies that exist.',
    topic: 'Planning',
    subtopic: 'Audit Risk Model'
  },
  {
    id: 'cisa1-b10-007',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Sampling in IS audit is used to:',
    options: [
      'Avoid any testing',
      'Draw conclusions about a population without testing all items',
      'Test only items management selects',
      'Reduce audit quality'
    ],
    correctAnswer: 1,
    explanation: 'Sampling allows auditors to draw reasonable conclusions about an entire population by testing a representative subset.',
    topic: 'Execution',
    subtopic: 'Sampling'
  },
  {
    id: 'cisa1-b10-008',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Attribute sampling is used to:',
    options: [
      'Estimate dollar amounts',
      'Test the rate of occurrence of a characteristic in a population',
      'Determine materiality',
      'Replace all other sampling methods'
    ],
    correctAnswer: 1,
    explanation: 'Attribute sampling tests the rate of occurrence (presence or absence) of a specific characteristic, often used for compliance testing.',
    topic: 'Execution',
    subtopic: 'Sampling Methods'
  },
  {
    id: 'cisa1-b10-009',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When an IS auditor discovers irregularities during an audit, the MOST appropriate action is to:',
    options: [
      'Ignore them if immaterial',
      'Expand testing and report to appropriate management levels',
      'Immediately contact law enforcement',
      'Discontinue the audit'
    ],
    correctAnswer: 1,
    explanation: 'Irregularities require expanded investigation and timely reporting to appropriate management and potentially the audit committee.',
    topic: 'Execution',
    subtopic: 'Irregularities'
  },
  {
    id: 'cisa1-b10-010',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The IS auditor should verify that audit evidence is:',
    options: [
      'Only from management sources',
      'Sufficient, reliable, relevant, and useful',
      'Limited to written documentation',
      'Approved by the auditee'
    ],
    correctAnswer: 1,
    explanation: 'Evidence should be sufficient (quantity), reliable (trustworthy), relevant (related to objectives), and useful (supports conclusions).',
    topic: 'Execution',
    subtopic: 'Audit Evidence'
  },
  {
    id: 'cisa1-b10-011',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Continuous auditing techniques enable:',
    options: [
      'Less frequent audit attention',
      'Real-time or near real-time assessment of controls and transactions',
      'Elimination of audit staff',
      'Reduced audit scope'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing uses technology to evaluate controls and transactions in real-time or near real-time, enabling faster detection of issues.',
    topic: 'CAATs',
    subtopic: 'Continuous Auditing'
  },
  {
    id: 'cisa1-b10-012',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Generalized Audit Software (GAS) is MOST useful for:',
    options: [
      'Programming new applications',
      'Interrogating client data files for audit analysis',
      'Managing audit schedules',
      'Replacing system controls'
    ],
    correctAnswer: 1,
    explanation: 'GAS allows auditors to access and analyze client data files to perform substantive testing and analytical procedures.',
    topic: 'CAATs',
    subtopic: 'Generalized Audit Software'
  },
  {
    id: 'cisa1-b10-013',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Test data techniques involve:',
    options: [
      'Using only production data',
      'Creating artificial transactions to test system processing',
      'Avoiding any system testing',
      'Testing only after system changes'
    ],
    correctAnswer: 1,
    explanation: 'Test data involves creating artificial transactions with known expected results to verify that system processing is correct.',
    topic: 'CAATs',
    subtopic: 'Test Data'
  },
  {
    id: 'cisa1-b10-014',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Integrated Test Facility (ITF) differs from test data because:',
    options: [
      'It is never used',
      'It processes test transactions through production systems with production data',
      'It requires system shutdown',
      'It only uses historical data'
    ],
    correctAnswer: 1,
    explanation: 'ITF creates a fictitious entity within the production system to process test transactions alongside real transactions.',
    topic: 'CAATs',
    subtopic: 'Integrated Test Facility'
  },
  {
    id: 'cisa1-b10-015',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Audit findings should include:',
    options: [
      'Only the condition identified',
      'Condition, criteria, cause, effect, and recommendation',
      'Only recommendations',
      'Only risk ratings'
    ],
    correctAnswer: 1,
    explanation: 'Complete findings include condition (what exists), criteria (what should exist), cause (why), effect (impact), and recommendations (how to fix).',
    topic: 'Reporting',
    subtopic: 'Finding Elements'
  },
  {
    id: 'cisa1-b10-016',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When management disagrees with audit findings, the IS auditor should:',
    options: [
      'Simply remove the finding',
      'Document management\'s response and escalate if risk acceptance is inappropriate',
      'Ignore management\'s opinion',
      'Delay the report indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Management responses should be documented, but significant disagreements about risk should be escalated appropriately.',
    topic: 'Reporting',
    subtopic: 'Management Response'
  },
  {
    id: 'cisa1-b10-017',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Follow-up procedures should verify:',
    options: [
      'Only that responses were received',
      'That corrective actions were implemented effectively',
      'That no new issues exist',
      'That management is satisfied'
    ],
    correctAnswer: 1,
    explanation: 'Follow-up verifies that management actions were implemented and effectively address the identified risks.',
    topic: 'Reporting',
    subtopic: 'Follow-Up'
  },
  {
    id: 'cisa1-b10-018',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Audit quality assurance includes:',
    options: [
      'Only final report review',
      'Ongoing monitoring and periodic assessments of audit activities',
      'Client satisfaction surveys only',
      'Budget monitoring only'
    ],
    correctAnswer: 1,
    explanation: 'Quality assurance includes ongoing monitoring of audit work and periodic assessments to ensure professional standards are met.',
    topic: 'Standards and Ethics',
    subtopic: 'Quality Assurance'
  },
  {
    id: 'cisa1-b10-019',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'ISACA Code of Professional Ethics requires IS auditors to:',
    options: [
      'Only maintain technical competence',
      'Maintain independence, objectivity, competence, and confidentiality',
      'Follow management instructions without question',
      'Report everything externally'
    ],
    correctAnswer: 1,
    explanation: 'The ISACA Code of Ethics requires independence, objectivity, professional competence, confidentiality, and adherence to standards.',
    topic: 'Standards and Ethics',
    subtopic: 'Ethics'
  },
  {
    id: 'cisa1-b10-020',
    courseId: 'cisa',
    section: 'CISA1',
    blueprintArea: 'CISA1-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Professional skepticism in IS auditing means:',
    options: [
      'Distrusting all management statements',
      'Questioning evidence and being alert to contradictions',
      'Accepting all explanations provided',
      'Avoiding difficult questions'
    ],
    correctAnswer: 1,
    explanation: 'Professional skepticism involves maintaining a questioning mind, being alert to contradictions, and critically evaluating evidence.',
    topic: 'Standards and Ethics',
    subtopic: 'Professional Skepticism'
  },

  // ===========================================================================
  // DOMAIN 2: GOVERNANCE AND MANAGEMENT OF IT (16 questions)
  // ===========================================================================
  
  {
    id: 'cisa2-b10-021',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'IT governance ensures that:',
    options: [
      'IT operates independently of business',
      'IT supports and enables the achievement of business objectives',
      'IT costs are minimized above all',
      'IT decisions are made only by IT staff'
    ],
    correctAnswer: 1,
    explanation: 'IT governance aligns IT strategy with business strategy to ensure IT investments support business objectives.',
    topic: 'IT Governance',
    subtopic: 'IT-Business Alignment'
  },
  {
    id: 'cisa2-b10-022',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The board\'s role in IT governance includes:',
    options: [
      'Day-to-day IT operations',
      'Setting direction and providing oversight of IT investments',
      'Writing IT policies only',
      'Managing IT projects directly'
    ],
    correctAnswer: 1,
    explanation: 'The board sets strategic direction, approves IT strategy, and provides oversight rather than managing day-to-day operations.',
    topic: 'IT Governance',
    subtopic: 'Governance Roles'
  },
  {
    id: 'cisa2-b10-023',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'IT policies should be:',
    options: [
      'Known only to IT staff',
      'Communicated and accessible to all relevant stakeholders',
      'Updated only when problems occur',
      'Identical to industry templates'
    ],
    correctAnswer: 1,
    explanation: 'Policies must be communicated to all who need to understand and follow them, and regularly reviewed/updated.',
    topic: 'IT Management',
    subtopic: 'Policies'
  },
  {
    id: 'cisa2-b10-024',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The IT balanced scorecard measures IT performance from perspectives including:',
    options: [
      'Financial only',
      'Financial, customer, internal processes, and learning/growth',
      'Compliance only',
      'User satisfaction only'
    ],
    correctAnswer: 1,
    explanation: 'The balanced scorecard framework measures performance from financial, customer, internal process, and learning/growth perspectives.',
    topic: 'IT Management',
    subtopic: 'Performance Measurement'
  },
  {
    id: 'cisa2-b10-025',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'IT risk management should be:',
    options: [
      'Separate from enterprise risk management',
      'Integrated into the enterprise risk management framework',
      'Only IT\'s responsibility',
      'Performed only during audits'
    ],
    correctAnswer: 1,
    explanation: 'IT risk should be integrated into enterprise risk management to ensure technology risks are considered in business context.',
    topic: 'IT Risk Management',
    subtopic: 'Integration'
  },
  {
    id: 'cisa2-b10-026',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Risk appetite differs from risk tolerance because:',
    options: [
      'They are the same',
      'Appetite is the overall level of risk the organization is willing to accept; tolerance is acceptable variation',
      'Tolerance is higher-level than appetite',
      'Neither is relevant to IT'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the broad level of risk an organization is willing to accept; tolerance defines acceptable variation around specific objectives.',
    topic: 'IT Risk Management',
    subtopic: 'Risk Concepts'
  },
  {
    id: 'cisa2-b10-027',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The IT steering committee typically:',
    options: [
      'Manages daily IT operations',
      'Prioritizes IT projects and oversees major investments',
      'Reports to the IT department',
      'Handles only IT problems'
    ],
    correctAnswer: 1,
    explanation: 'IT steering committees typically include business and IT leadership to prioritize initiatives and oversee major investments.',
    topic: 'IT Governance',
    subtopic: 'Governance Structures'
  },
  {
    id: 'cisa2-b10-028',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Enterprise architecture provides:',
    options: [
      'Only technology diagrams',
      'A structured approach to aligning business and IT',
      'Building construction plans',
      'Only security frameworks'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise architecture provides a holistic view of business processes, information, and technology to guide IT decisions and investments.',
    topic: 'IT Management',
    subtopic: 'Enterprise Architecture'
  },
  {
    id: 'cisa2-b10-029',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'IT resource management includes:',
    options: [
      'Hardware only',
      'People, information, infrastructure, and applications',
      'Budget only',
      'External vendors only'
    ],
    correctAnswer: 1,
    explanation: 'IT resources include personnel, data/information, technology infrastructure, and applications - all must be managed effectively.',
    topic: 'IT Management',
    subtopic: 'Resource Management'
  },
  {
    id: 'cisa2-b10-030',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'COBIT 2019 is based on principles including:',
    options: [
      'Technology-first approach',
      'Meeting stakeholder needs and covering the enterprise end-to-end',
      'Cost reduction only',
      'Compliance avoidance'
    ],
    correctAnswer: 1,
    explanation: 'COBIT 2019 principles include meeting stakeholder needs, covering the enterprise end-to-end, applying a single integrated framework, enabling a holistic approach, and separating governance from management.',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT'
  },
  {
    id: 'cisa2-b10-031',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Due diligence in vendor management includes:',
    options: [
      'Only price comparison',
      'Assessing vendor financial stability, security practices, and compliance',
      'Accepting the lowest bid automatically',
      'Avoiding reference checks'
    ],
    correctAnswer: 1,
    explanation: 'Due diligence evaluates vendor financial health, security practices, compliance status, and ability to deliver as promised.',
    topic: 'Vendor Management',
    subtopic: 'Due Diligence'
  },
  {
    id: 'cisa2-b10-032',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Service level agreements (SLAs) should include:',
    options: [
      'Only response times',
      'Performance metrics, measurement methods, remedies for non-performance',
      'Vendor aspirations only',
      'Only compliance statements'
    ],
    correctAnswer: 1,
    explanation: 'SLAs should specify quantifiable metrics, how performance is measured, reporting requirements, and consequences for non-performance.',
    topic: 'Vendor Management',
    subtopic: 'SLA Management'
  },
  {
    id: 'cisa2-b10-033',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Business impact analysis (BIA) identifies:',
    options: [
      'Only IT assets',
      'Critical processes and the impact of disruption over time',
      'Only compliance requirements',
      'Only disaster scenarios'
    ],
    correctAnswer: 1,
    explanation: 'BIA identifies critical business processes and quantifies the impact of disruption over time to prioritize recovery efforts.',
    topic: 'IT Risk Management',
    subtopic: 'BIA'
  },
  {
    id: 'cisa2-b10-034',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Key Risk Indicators (KRIs) are:',
    options: [
      'Only historical measures',
      'Metrics that provide early warning of increasing risk levels',
      'The same as Key Performance Indicators',
      'Only financial ratios'
    ],
    correctAnswer: 1,
    explanation: 'KRIs are forward-looking metrics that provide early warning signals when risk levels are increasing toward thresholds.',
    topic: 'IT Risk Management',
    subtopic: 'Risk Monitoring'
  },
  {
    id: 'cisa2-b10-035',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Change management controls ensure:',
    options: [
      'No changes ever occur',
      'Changes are authorized, tested, and implemented in a controlled manner',
      'Only emergency changes are tracked',
      'Changes are made quickly without review'
    ],
    correctAnswer: 1,
    explanation: 'Change management requires proper authorization, testing, approval, and documentation before implementing changes.',
    topic: 'IT Management',
    subtopic: 'Change Management'
  },
  {
    id: 'cisa2-b10-036',
    courseId: 'cisa',
    section: 'CISA2',
    blueprintArea: 'CISA2-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The principle of least privilege means:',
    options: [
      'Everyone gets minimum salary',
      'Users receive only the access rights necessary to perform their jobs',
      'IT has all access rights',
      'Fewer controls are better'
    ],
    correctAnswer: 1,
    explanation: 'Least privilege limits user access to only what is necessary for their job function, reducing risk of unauthorized access or errors.',
    topic: 'Access Control',
    subtopic: 'Least Privilege'
  },

  // ===========================================================================
  // DOMAIN 3: INFORMATION SYSTEMS ACQUISITION, DEVELOPMENT AND IMPLEMENTATION (18 questions)
  // ===========================================================================
  
  {
    id: 'cisa3-b10-037',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A feasibility study evaluates:',
    options: [
      'Only technical aspects',
      'Technical, financial, operational, and schedule feasibility',
      'Only costs',
      'Only user preferences'
    ],
    correctAnswer: 1,
    explanation: 'Feasibility studies assess technical, economic/financial, operational, and schedule aspects to determine project viability.',
    topic: 'Project Management',
    subtopic: 'Feasibility Study'
  },
  {
    id: 'cisa3-b10-038',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Requirements traceability matrix ensures:',
    options: [
      'Requirements are forgotten',
      'Each requirement is tracked through design, development, and testing',
      'Only tracing financial costs',
      'Eliminating scope changes'
    ],
    correctAnswer: 1,
    explanation: 'The traceability matrix links requirements to design, code, and test cases to ensure all requirements are addressed and tested.',
    topic: 'SDLC',
    subtopic: 'Requirements Management'
  },
  {
    id: 'cisa3-b10-039',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The "shift left" approach in DevSecOps means:',
    options: [
      'Moving security testing earlier in the development lifecycle',
      'Delaying security until production',
      'Shifting work to the left team',
      'Moving applications to cloud'
    ],
    correctAnswer: 0,
    explanation: 'Shift left integrates security testing earlier in the SDLC (left on the timeline) to find and fix issues before deployment.',
    topic: 'Secure Development',
    subtopic: 'DevSecOps'
  },
  {
    id: 'cisa3-b10-040',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Static application security testing (SAST) differs from dynamic testing because:',
    options: [
      'SAST analyzes source code without executing it',
      'SAST only runs in production',
      'SAST is faster than all other testing',
      'SAST replaces code review'
    ],
    correctAnswer: 0,
    explanation: 'SAST analyzes source code, bytecode, or binaries without running the application, finding vulnerabilities in code structure.',
    topic: 'Secure Development',
    subtopic: 'Application Security Testing'
  },
  {
    id: 'cisa3-b10-041',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'User acceptance testing (UAT) verifies that:',
    options: [
      'Code compiles correctly',
      'The system meets user requirements and is ready for production',
      'Performance is optimal',
      'Security controls are implemented'
    ],
    correctAnswer: 1,
    explanation: 'UAT allows end users to verify the system meets their requirements and business needs before production deployment.',
    topic: 'Testing',
    subtopic: 'UAT'
  },
  {
    id: 'cisa3-b10-042',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Regression testing is performed to:',
    options: [
      'Test new functionality only',
      'Ensure changes have not adversely affected existing functionality',
      'Test performance under load',
      'Validate user requirements'
    ],
    correctAnswer: 1,
    explanation: 'Regression testing verifies that new changes, fixes, or updates have not broken existing functionality.',
    topic: 'Testing',
    subtopic: 'Regression Testing'
  },
  {
    id: 'cisa3-b10-043',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Integration testing focuses on:',
    options: [
      'Individual module functionality',
      'Interfaces and data flows between modules or systems',
      'User acceptance only',
      'Performance optimization'
    ],
    correctAnswer: 1,
    explanation: 'Integration testing validates that components or systems work together correctly, focusing on interfaces and data exchange.',
    topic: 'Testing',
    subtopic: 'Integration Testing'
  },
  {
    id: 'cisa3-b10-044',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Data conversion during system implementation requires:',
    options: [
      'No verification',
      'Validation and reconciliation to ensure data integrity',
      'Only backup of old data',
      'Deleting all legacy data'
    ],
    correctAnswer: 1,
    explanation: 'Data conversion requires thorough validation, reconciliation, and verification to ensure accuracy and completeness of migrated data.',
    topic: 'Implementation',
    subtopic: 'Data Conversion'
  },
  {
    id: 'cisa3-b10-045',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Parallel implementation runs:',
    options: [
      'Only the new system',
      'Both old and new systems simultaneously for verification',
      'Systems in different locations',
      'Only during weekends'
    ],
    correctAnswer: 1,
    explanation: 'Parallel implementation runs old and new systems simultaneously, comparing results to validate the new system before retirement of the old one.',
    topic: 'Implementation',
    subtopic: 'Implementation Strategies'
  },
  {
    id: 'cisa3-b10-046',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Phased implementation differs from big bang because:',
    options: [
      'They are identical',
      'Phased rolls out functionality incrementally rather than all at once',
      'Phased is always faster',
      'Big bang has less risk'
    ],
    correctAnswer: 1,
    explanation: 'Phased implementation deploys functionality in stages (by module, location, or user group), while big bang deploys everything simultaneously.',
    topic: 'Implementation',
    subtopic: 'Implementation Strategies'
  },
  {
    id: 'cisa3-b10-047',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Post-implementation review should assess:',
    options: [
      'Only costs',
      'Whether project objectives were achieved and lessons learned',
      'Only technical metrics',
      'Only user satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'Post-implementation reviews evaluate objective achievement, actual vs. planned performance, and capture lessons learned for future projects.',
    topic: 'Implementation',
    subtopic: 'Post-Implementation Review'
  },
  {
    id: 'cisa3-b10-048',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The OWASP Top 10 represents:',
    options: [
      'Top 10 best practices for networking',
      'Critical web application security risks',
      'Database optimization techniques',
      'Project management best practices'
    ],
    correctAnswer: 1,
    explanation: 'OWASP Top 10 identifies the most critical web application security risks (like injection, XSS, broken authentication) for developer awareness.',
    topic: 'Secure Development',
    subtopic: 'OWASP'
  },
  {
    id: 'cisa3-b10-049',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Input validation controls help prevent:',
    options: [
      'Only typos',
      'Injection attacks and data corruption',
      'Only numeric errors',
      'User training gaps'
    ],
    correctAnswer: 1,
    explanation: 'Input validation prevents malicious input (SQL injection, XSS, buffer overflow) and ensures only valid data enters the system.',
    topic: 'Application Controls',
    subtopic: 'Input Controls'
  },
  {
    id: 'cisa3-b10-050',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Code review is MOST effective when:',
    options: [
      'Performed only after deployment',
      'Conducted early and regularly throughout development',
      'Done only by the original developer',
      'Focused only on formatting'
    ],
    correctAnswer: 1,
    explanation: 'Code review is most effective when performed early and regularly, catching issues when they are easier and cheaper to fix.',
    topic: 'Secure Development',
    subtopic: 'Code Review'
  },
  {
    id: 'cisa3-b10-051',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Version control systems provide:',
    options: [
      'Only backup',
      'Change tracking, history, and collaboration capabilities for code',
      'Only security scanning',
      'Only deployment automation'
    ],
    correctAnswer: 1,
    explanation: 'Version control tracks changes, maintains history, enables collaboration, and allows reverting to previous versions if needed.',
    topic: 'Development',
    subtopic: 'Version Control'
  },
  {
    id: 'cisa3-b10-052',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Separation of duties in development ensures:',
    options: [
      'Faster development',
      'Developers cannot move code to production without independent review',
      'Fewer staff needed',
      'No testing required'
    ],
    correctAnswer: 1,
    explanation: 'Separation of duties prevents developers from unilaterally moving untested or malicious code to production.',
    topic: 'Development Controls',
    subtopic: 'Separation of Duties'
  },
  {
    id: 'cisa3-b10-053',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Agile development compared to waterfall:',
    options: [
      'Has no documentation',
      'Delivers functionality in iterative increments with regular feedback',
      'Is always faster',
      'Has no testing'
    ],
    correctAnswer: 1,
    explanation: 'Agile uses iterative sprints to deliver working functionality incrementally, incorporating regular stakeholder feedback.',
    topic: 'SDLC',
    subtopic: 'Agile'
  },
  {
    id: 'cisa3-b10-054',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Infrastructure as Code (IaC) benefits include:',
    options: [
      'Only cost savings',
      'Consistency, repeatability, and version-controlled infrastructure',
      'Eliminating all human error',
      'Replacing security controls'
    ],
    correctAnswer: 1,
    explanation: 'IaC provides consistent, repeatable, version-controlled infrastructure deployment, reducing configuration drift and manual errors.',
    topic: 'Cloud and Automation',
    subtopic: 'Infrastructure as Code'
  },

  // ===========================================================================
  // DOMAIN 4: INFORMATION SYSTEMS OPERATIONS AND BUSINESS RESILIENCE (20 questions)
  // ===========================================================================
  
  {
    id: 'cisa4-b10-055',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'IT operations management ensures:',
    options: [
      'Only development activities',
      'Day-to-day IT services are delivered reliably and efficiently',
      'Only project management',
      'Only security monitoring'
    ],
    correctAnswer: 1,
    explanation: 'IT operations manage day-to-day delivery of IT services including batch processing, scheduling, monitoring, and incident response.',
    topic: 'IT Operations',
    subtopic: 'Operations Management'
  },
  {
    id: 'cisa4-b10-056',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Job scheduling controls should include:',
    options: [
      'Only start times',
      'Dependencies, priorities, failure handling, and monitoring',
      'Only end times',
      'Only weekend jobs'
    ],
    correctAnswer: 1,
    explanation: 'Job scheduling controls include job dependencies, priorities, retry/failure handling, and monitoring for timely completion.',
    topic: 'IT Operations',
    subtopic: 'Job Scheduling'
  },
  {
    id: 'cisa4-b10-057',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Capacity management ensures:',
    options: [
      'Maximum utilization at all times',
      'Sufficient resources are available to meet current and future needs',
      'Minimum hardware purchases',
      'Only storage management'
    ],
    correctAnswer: 1,
    explanation: 'Capacity management ensures IT resources are sufficient to meet current service levels and planned future demands.',
    topic: 'IT Operations',
    subtopic: 'Capacity Management'
  },
  {
    id: 'cisa4-b10-058',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'ITIL problem management differs from incident management because:',
    options: [
      'They are the same',
      'Problem management addresses root causes while incident management restores service',
      'Problem management is faster',
      'Incident management is more thorough'
    ],
    correctAnswer: 1,
    explanation: 'Incident management restores service quickly; problem management identifies and addresses root causes to prevent recurrence.',
    topic: 'IT Service Management',
    subtopic: 'Problem Management'
  },
  {
    id: 'cisa4-b10-059',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Configuration management involves:',
    options: [
      'Only hardware inventory',
      'Identification, control, and verification of IT configuration items',
      'Only software licensing',
      'Only network diagrams'
    ],
    correctAnswer: 1,
    explanation: 'Configuration management identifies, controls, and verifies configuration items (hardware, software, documentation) and their relationships.',
    topic: 'IT Operations',
    subtopic: 'Configuration Management'
  },
  {
    id: 'cisa4-b10-060',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Release management controls ensure:',
    options: [
      'Immediate deployment of all changes',
      'Coordinated, authorized, and tested deployment of new releases',
      'No testing before deployment',
      'Only documentation updates'
    ],
    correctAnswer: 1,
    explanation: 'Release management coordinates testing, authorization, and controlled deployment of new or changed IT services.',
    topic: 'IT Operations',
    subtopic: 'Release Management'
  },
  {
    id: 'cisa4-b10-061',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Recovery Point Objective (RPO) defines:',
    options: [
      'Recovery time target',
      'Maximum tolerable data loss measured in time',
      'Recovery staffing needs',
      'Recovery cost budget'
    ],
    correctAnswer: 1,
    explanation: 'RPO defines the maximum acceptable age of data to be recovered (i.e., how much data loss is acceptable) measured as a time period.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Objectives'
  },
  {
    id: 'cisa4-b10-062',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Recovery Time Objective (RTO) differs from RTO because:',
    options: [
      'They are identical',
      'RTO is the target time to restore service; RPO is tolerable data loss',
      'RTO measures data loss',
      'RPO is always longer than RTO'
    ],
    correctAnswer: 1,
    explanation: 'RTO is the target time to restore business processes after disruption; RPO is the tolerable amount of data loss.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Objectives'
  },
  {
    id: 'cisa4-b10-063',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Hot sites provide:',
    options: [
      'Empty facilities',
      'Fully operational alternate facilities ready for immediate use',
      'Only hardware',
      'Only power and cooling'
    ],
    correctAnswer: 1,
    explanation: 'Hot sites are fully equipped with hardware, software, and data replication, ready for immediate failover with minimal recovery time.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Sites'
  },
  {
    id: 'cisa4-b10-064',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Cold sites compared to hot sites:',
    options: [
      'Have the same cost',
      'Require more time to activate but have lower ongoing costs',
      'Are always preferable',
      'Have the same RTO capability'
    ],
    correctAnswer: 1,
    explanation: 'Cold sites have lower ongoing costs but require more time to activate because equipment, software, and data must be installed/restored.',
    topic: 'Business Continuity',
    subtopic: 'Recovery Sites'
  },
  {
    id: 'cisa4-b10-065',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'DR plan testing should:',
    options: [
      'Be avoided to prevent disruption',
      'Be conducted regularly to validate recovery capabilities',
      'Only be performed after disasters',
      'Only include IT staff'
    ],
    correctAnswer: 1,
    explanation: 'Regular testing validates that recovery procedures work, identifies gaps, and ensures staff are trained for disaster response.',
    topic: 'Business Continuity',
    subtopic: 'DR Testing'
  },
  {
    id: 'cisa4-b10-066',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Full-interruption DR testing:',
    options: [
      'Is the least reliable type',
      'Actually fails over to the recovery site, providing highest confidence',
      'Only uses simulations',
      'Does not test recovery capabilities'
    ],
    correctAnswer: 1,
    explanation: 'Full-interruption testing actually activates the disaster recovery site, providing the most realistic validation of recovery capabilities.',
    topic: 'Business Continuity',
    subtopic: 'DR Testing'
  },
  {
    id: 'cisa4-b10-067',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Data backup strategies should consider:',
    options: [
      'Only backup frequency',
      'Frequency, retention, offsite storage, and encryption',
      'Only backup location',
      'Only backup media'
    ],
    correctAnswer: 1,
    explanation: 'Backup strategy includes frequency, retention periods, offsite/offline storage, encryption, and regular testing of restore capabilities.',
    topic: 'IT Operations',
    subtopic: 'Backup and Recovery'
  },
  {
    id: 'cisa4-b10-068',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Differential backups differ from incremental because:',
    options: [
      'They are identical',
      'Differential backs up changes since last full; incremental since last backup of any type',
      'Incremental is always faster to restore',
      'Differential requires more storage than incremental'
    ],
    correctAnswer: 1,
    explanation: 'Differential backs up all changes since the last full backup; incremental backs up changes since the last backup (full or incremental).',
    topic: 'IT Operations',
    subtopic: 'Backup Types'
  },
  {
    id: 'cisa4-b10-069',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Media sanitization ensures:',
    options: [
      'Media works properly',
      'Data is unrecoverable before disposal or reuse',
      'Media is cleaned physically',
      'Media is new'
    ],
    correctAnswer: 1,
    explanation: 'Media sanitization removes data so it cannot be recovered, protecting sensitive information when media is disposed or reused.',
    topic: 'IT Operations',
    subtopic: 'Media Management'
  },
  {
    id: 'cisa4-b10-070',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Environmental controls in data centers include:',
    options: [
      'Only fire suppression',
      'HVAC, fire detection/suppression, water detection, and physical security',
      'Only HVAC',
      'Only power backup'
    ],
    correctAnswer: 1,
    explanation: 'Environmental controls include temperature/humidity (HVAC), fire detection/suppression, water detection, power conditioning, and physical access controls.',
    topic: 'IT Operations',
    subtopic: 'Data Center Operations'
  },
  {
    id: 'cisa4-b10-071',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'UPS systems provide:',
    options: [
      'Long-term power',
      'Short-term power and conditioning until generators or controlled shutdown',
      'Only surge protection',
      'Only voltage regulation'
    ],
    correctAnswer: 1,
    explanation: 'UPS provides immediate short-term power during outages to bridge to generator startup or allow controlled shutdown.',
    topic: 'IT Operations',
    subtopic: 'Power Management'
  },
  {
    id: 'cisa4-b10-072',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Business continuity planning addresses:',
    options: [
      'Only IT recovery',
      'Maintaining critical business functions during and after disruption',
      'Only natural disasters',
      'Only data recovery'
    ],
    correctAnswer: 1,
    explanation: 'BCP addresses maintaining or resuming critical business functions, not just IT, during and after any type of disruption.',
    topic: 'Business Continuity',
    subtopic: 'BCP Scope'
  },
  {
    id: 'cisa4-b10-073',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Crisis communication plans should:',
    options: [
      'Be developed during the crisis',
      'Pre-define communication channels, spokespersons, and message templates',
      'Only address internal communications',
      'Avoid media contact'
    ],
    correctAnswer: 1,
    explanation: 'Crisis communication plans pre-establish who communicates, through what channels, to which audiences, with prepared message frameworks.',
    topic: 'Business Continuity',
    subtopic: 'Crisis Communications'
  },
  {
    id: 'cisa4-b10-074',
    courseId: 'cisa',
    section: 'CISA4',
    blueprintArea: 'CISA4-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Service level management ensures:',
    options: [
      'Only vendor management',
      'IT services meet agreed-upon performance levels defined in SLAs',
      'Only cost management',
      'Only incident response'
    ],
    correctAnswer: 1,
    explanation: 'Service level management defines, negotiates, monitors, and reports on service performance against agreed SLA targets.',
    topic: 'IT Service Management',
    subtopic: 'SLA Management'
  },

  // ===========================================================================
  // DOMAIN 5: PROTECTION OF INFORMATION ASSETS (26 questions)
  // ===========================================================================
  
  {
    id: 'cisa5-b10-075',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Information security governance ensures:',
    options: [
      'Only technical controls',
      'Security is aligned with business objectives and managed appropriately',
      'Only compliance',
      'Only IT security'
    ],
    correctAnswer: 1,
    explanation: 'Security governance aligns security strategy with business objectives and ensures effective management and oversight of security.',
    topic: 'Security Governance',
    subtopic: 'Security Alignment'
  },
  {
    id: 'cisa5-b10-076',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The CISO role should report to:',
    options: [
      'Only the IT department',
      'A level ensuring independence and visibility to executive leadership and board',
      'Only operations',
      'Only compliance'
    ],
    correctAnswer: 1,
    explanation: 'CISO reporting structure should ensure sufficient independence and visibility to effectively influence security decisions.',
    topic: 'Security Governance',
    subtopic: 'Security Organization'
  },
  {
    id: 'cisa5-b10-077',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Data classification serves to:',
    options: [
      'Reduce storage costs only',
      'Apply appropriate protection based on data sensitivity',
      'Delete unnecessary data',
      'Encrypt all data equally'
    ],
    correctAnswer: 1,
    explanation: 'Classification categorizes data by sensitivity to ensure appropriate protection controls are applied based on data value and risk.',
    topic: 'Data Security',
    subtopic: 'Data Classification'
  },
  {
    id: 'cisa5-b10-078',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Data loss prevention (DLP) solutions:',
    options: [
      'Only encrypt data',
      'Detect and prevent unauthorized transmission of sensitive data',
      'Only monitor networks',
      'Only backup data'
    ],
    correctAnswer: 1,
    explanation: 'DLP solutions identify, monitor, and prevent unauthorized movement or disclosure of sensitive data across endpoints, networks, and cloud.',
    topic: 'Data Security',
    subtopic: 'DLP'
  },
  {
    id: 'cisa5-b10-079',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Multi-factor authentication requires:',
    options: [
      'Multiple passwords',
      'Two or more different authentication factor categories',
      'Only biometrics',
      'Only tokens'
    ],
    correctAnswer: 1,
    explanation: 'MFA requires authentication from two or more categories: something you know, have, are, or somewhere you are.',
    topic: 'Access Control',
    subtopic: 'Authentication'
  },
  {
    id: 'cisa5-b10-080',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Role-based access control (RBAC) assigns:',
    options: [
      'Rights to individual users',
      'Permissions to roles which are assigned to users based on job function',
      'Equal access to everyone',
      'Access only to administrators'
    ],
    correctAnswer: 1,
    explanation: 'RBAC assigns permissions to roles representing job functions; users receive access based on role assignment.',
    topic: 'Access Control',
    subtopic: 'Access Control Models'
  },
  {
    id: 'cisa5-b10-081',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Privileged access management (PAM):',
    options: [
      'Gives everyone admin rights',
      'Controls, monitors, and secures privileged account access',
      'Only manages passwords',
      'Only applies to IT'
    ],
    correctAnswer: 1,
    explanation: 'PAM solutions control, monitor, and secure access to privileged accounts that have elevated permissions.',
    topic: 'Access Control',
    subtopic: 'Privileged Access'
  },
  {
    id: 'cisa5-b10-082',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Single sign-on (SSO) security risks include:',
    options: [
      'Too many passwords',
      'Compromise of SSO credentials provides access to multiple systems',
      'Slower authentication',
      'No risks'
    ],
    correctAnswer: 1,
    explanation: 'SSO creates a single point of failure - if SSO credentials are compromised, attackers gain access to all connected systems.',
    topic: 'Access Control',
    subtopic: 'SSO Security'
  },
  {
    id: 'cisa5-b10-083',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Firewall rules should follow:',
    options: [
      'Allow all, then deny specific',
      'Deny by default with explicit allow rules',
      'No particular order',
      'Alphabetical order'
    ],
    correctAnswer: 1,
    explanation: 'Default deny with explicit allow follows least privilege principle - only specifically permitted traffic is allowed.',
    topic: 'Network Security',
    subtopic: 'Firewall Configuration'
  },
  {
    id: 'cisa5-b10-084',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Intrusion detection systems (IDS) differ from intrusion prevention systems (IPS) because:',
    options: [
      'IDS actively blocks attacks; IPS only alerts',
      'IDS alerts on detected threats; IPS can automatically block them',
      'They are identical',
      'IPS is only for networks'
    ],
    correctAnswer: 1,
    explanation: 'IDS detects and alerts on threats; IPS adds the capability to automatically block detected threats.',
    topic: 'Network Security',
    subtopic: 'IDS/IPS'
  },
  {
    id: 'cisa5-b10-085',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Network segmentation reduces risk by:',
    options: [
      'Increasing network speed',
      'Limiting lateral movement and containing potential breaches',
      'Reducing hardware costs',
      'Simplifying management'
    ],
    correctAnswer: 1,
    explanation: 'Segmentation limits an attacker\'s ability to move laterally, containing breaches to smaller network segments.',
    topic: 'Network Security',
    subtopic: 'Segmentation'
  },
  {
    id: 'cisa5-b10-086',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Zero trust security assumes:',
    options: [
      'Internal networks are trusted',
      'No implicit trust based on network location; verify every access request',
      'All users are trusted',
      'Firewalls are sufficient'
    ],
    correctAnswer: 1,
    explanation: 'Zero trust requires verification for every access request regardless of network location - "never trust, always verify."',
    topic: 'Network Security',
    subtopic: 'Zero Trust'
  },
  {
    id: 'cisa5-b10-087',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Encryption at rest protects:',
    options: [
      'Data during transmission',
      'Data stored on devices or media',
      'Data in memory',
      'Data during processing'
    ],
    correctAnswer: 1,
    explanation: 'Encryption at rest protects data stored on disks, databases, backups, and other storage media.',
    topic: 'Cryptography',
    subtopic: 'Encryption at Rest'
  },
  {
    id: 'cisa5-b10-088',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'TLS differs from SSL because:',
    options: [
      'TLS is older and less secure',
      'TLS is the successor to SSL with improved security features',
      'They are identical',
      'SSL is preferred for web traffic'
    ],
    correctAnswer: 1,
    explanation: 'TLS (Transport Layer Security) evolved from SSL with enhanced security and is the current standard for encrypted communications.',
    topic: 'Cryptography',
    subtopic: 'TLS/SSL'
  },
  {
    id: 'cisa5-b10-089',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Public key infrastructure (PKI) provides:',
    options: [
      'Only encryption',
      'Framework for managing digital certificates and trust relationships',
      'Only authentication',
      'Only key storage'
    ],
    correctAnswer: 1,
    explanation: 'PKI provides the framework for issuing, managing, and validating digital certificates that enable encryption, authentication, and digital signatures.',
    topic: 'Cryptography',
    subtopic: 'PKI'
  },
  {
    id: 'cisa5-b10-090',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Security information and event management (SIEM):',
    options: [
      'Only stores logs',
      'Aggregates, correlates, and analyzes security events for threat detection',
      'Only sends alerts',
      'Only monitors networks'
    ],
    correctAnswer: 1,
    explanation: 'SIEM aggregates logs from multiple sources, correlates events, analyzes patterns, and alerts on potential security incidents.',
    topic: 'Security Operations',
    subtopic: 'SIEM'
  },
  {
    id: 'cisa5-b10-091',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Vulnerability scanning identifies:',
    options: [
      'Only network devices',
      'Security weaknesses that could be exploited',
      'Only compliance gaps',
      'Only documentation gaps'
    ],
    correctAnswer: 1,
    explanation: 'Vulnerability scanning discovers security weaknesses in systems, applications, and configurations that could be exploited.',
    topic: 'Security Operations',
    subtopic: 'Vulnerability Management'
  },
  {
    id: 'cisa5-b10-092',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Penetration testing differs from vulnerability scanning because:',
    options: [
      'They are identical',
      'Penetration testing actively exploits vulnerabilities to assess impact',
      'Scanning is more thorough',
      'Penetration testing is automated'
    ],
    correctAnswer: 1,
    explanation: 'Penetration testing actively attempts to exploit vulnerabilities to demonstrate real-world attack impact, while scanning only identifies potential vulnerabilities.',
    topic: 'Security Operations',
    subtopic: 'Penetration Testing'
  },
  {
    id: 'cisa5-b10-093',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Security awareness training should:',
    options: [
      'Be a one-time event',
      'Be ongoing and include current threats and practical guidance',
      'Only address policies',
      'Only be for IT staff'
    ],
    correctAnswer: 1,
    explanation: 'Security awareness should be ongoing, relevant to current threats, and provide practical guidance applicable to employees\' roles.',
    topic: 'Security Management',
    subtopic: 'Security Awareness'
  },
  {
    id: 'cisa5-b10-094',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Social engineering attacks exploit:',
    options: [
      'Only technical vulnerabilities',
      'Human psychology to manipulate people into divulging information or taking actions',
      'Only network weaknesses',
      'Only application flaws'
    ],
    correctAnswer: 1,
    explanation: 'Social engineering manipulates human psychology rather than technical systems, exploiting trust, authority, or urgency.',
    topic: 'Security Threats',
    subtopic: 'Social Engineering'
  },
  {
    id: 'cisa5-b10-095',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Phishing attacks typically:',
    options: [
      'Only use phone calls',
      'Use deceptive emails or websites to steal credentials or install malware',
      'Only affect servers',
      'Are easily detected automatically'
    ],
    correctAnswer: 1,
    explanation: 'Phishing uses fraudulent emails, websites, or messages designed to trick recipients into revealing credentials or installing malware.',
    topic: 'Security Threats',
    subtopic: 'Phishing'
  },
  {
    id: 'cisa5-b10-096',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Ransomware protection strategies include:',
    options: [
      'Only paying ransoms',
      'Backups, user training, network segmentation, and endpoint protection',
      'Only antivirus',
      'Only firewalls'
    ],
    correctAnswer: 1,
    explanation: 'Defense-in-depth against ransomware includes offline backups, user training, segmentation, endpoint protection, and patch management.',
    topic: 'Security Threats',
    subtopic: 'Ransomware'
  },
  {
    id: 'cisa5-b10-097',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Incident response phases include:',
    options: [
      'Only detection and recovery',
      'Preparation, detection, containment, eradication, recovery, and lessons learned',
      'Only containment',
      'Only investigation'
    ],
    correctAnswer: 1,
    explanation: 'The incident response lifecycle includes preparation, detection/analysis, containment, eradication, recovery, and post-incident activity.',
    topic: 'Incident Management',
    subtopic: 'Incident Response'
  },
  {
    id: 'cisa5-b10-098',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Chain of custody for digital evidence ensures:',
    options: [
      'Evidence is destroyed properly',
      'Evidence integrity is maintained and documented for legal proceedings',
      'Evidence is shared freely',
      'Evidence is encrypted'
    ],
    correctAnswer: 1,
    explanation: 'Chain of custody documents who handled evidence, when, and what was done to preserve integrity for legal admissibility.',
    topic: 'Incident Management',
    subtopic: 'Digital Forensics'
  },
  {
    id: 'cisa5-b10-099',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Physical security controls include:',
    options: [
      'Only locks',
      'Access controls, surveillance, environmental controls, and personnel screening',
      'Only cameras',
      'Only guards'
    ],
    correctAnswer: 1,
    explanation: 'Physical security includes multiple layers: access controls, surveillance, barriers, environmental controls, and personnel measures.',
    topic: 'Physical Security',
    subtopic: 'Physical Controls'
  },
  {
    id: 'cisa5-b10-100',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Privacy impact assessments (PIA) should:',
    options: [
      'Only be performed after incidents',
      'Be conducted before implementing systems that process personal data',
      'Only address compliance',
      'Only be performed annually'
    ],
    correctAnswer: 1,
    explanation: 'PIAs should be conducted proactively before implementing new systems or processes that collect, use, or share personal data.',
    topic: 'Privacy',
    subtopic: 'Privacy Assessments'
  }
];

// Export domain-specific question arrays
export const CISA1_QUESTIONS_BATCH10 = ALL_BATCH10.filter(q => q.section === 'CISA1');
export const CISA2_QUESTIONS_BATCH10 = ALL_BATCH10.filter(q => q.section === 'CISA2');
export const CISA3_QUESTIONS_BATCH10 = ALL_BATCH10.filter(q => q.section === 'CISA3');
export const CISA4_QUESTIONS_BATCH10 = ALL_BATCH10.filter(q => q.section === 'CISA4');
export const CISA5_QUESTIONS_BATCH10 = ALL_BATCH10.filter(q => q.section === 'CISA5');
