/**
 * CISA All Domains Batch 12
 * 100 questions across all 5 domains
 * Certified Information Systems Auditor exam preparation
 */

import { Question } from '../../../types';

const ALL_BATCH12: Question[] = [
  // ===========================================================================
  // DOMAIN 1: INFORMATION SYSTEMS AUDITING PROCESS (20 questions)
  // ===========================================================================
  
  {
    id: 'CISA1-B12-001',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit methodology should be:',
    options: [
      'Completely different for each audit',
      'Consistent and systematic while allowing flexibility for specific circumstances',
      'Determined solely by the auditee',
      'The same as financial auditing only'
    ],
    correctAnswer: 1,
    explanation: 'Audit methodology provides consistency and quality while allowing adaptation to specific audit circumstances.',
    topic: 'Planning',
    subtopic: 'Audit Methodology'
  },
  {
    id: 'CISA1-B12-002',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Inherent risk refers to:',
    options: [
      'Risk after controls are implemented',
      'Risk that exists before any controls are applied',
      'Risk of audit failure',
      'Risk of detection'
    ],
    correctAnswer: 1,
    explanation: 'Inherent risk is the natural level of risk that exists in an area before any controls are implemented.',
    topic: 'Planning',
    subtopic: 'Risk Concepts'
  },
  {
    id: 'CISA1-B12-003',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Walk-through procedures help auditors:',
    options: [
      'Skip detailed testing',
      'Understand processes by tracing transactions end-to-end',
      'Replace all other tests',
      'Avoid documentation'
    ],
    correctAnswer: 1,
    explanation: 'Walk-throughs trace transactions through the process to understand systems, controls, and identify risks.',
    topic: 'Execution',
    subtopic: 'Walk-Through'
  },
  {
    id: 'CISA1-B12-004',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Observation as an audit technique:',
    options: [
      'Is always sufficient evidence',
      'Provides evidence only at the time of observation',
      'Replaces all other techniques',
      'Is not reliable'
    ],
    correctAnswer: 1,
    explanation: 'Observation provides evidence of what was occurring at the time observed but does not prove controls operate consistently.',
    topic: 'Execution',
    subtopic: 'Audit Techniques'
  },
  {
    id: 'CISA1-B12-005',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Inquiry as an audit procedure should be:',
    options: [
      'Used alone for conclusions',
      'Corroborated with other evidence',
      'Limited to management only',
      'Avoided entirely'
    ],
    correctAnswer: 1,
    explanation: 'Inquiry alone is not sufficient evidence; it should be supported by other corroborating evidence.',
    topic: 'Execution',
    subtopic: 'Audit Techniques'
  },
  {
    id: 'CISA1-B12-006',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Reperformance testing involves:',
    options: [
      'Reviewing documentation',
      'Independently executing procedures to verify they produce expected results',
      'Observing staff activities',
      'Interviewing stakeholders'
    ],
    correctAnswer: 1,
    explanation: 'Reperformance means the auditor independently executes procedures or controls to verify they operate correctly.',
    topic: 'Execution',
    subtopic: 'Audit Techniques'
  },
  {
    id: 'CISA1-B12-007',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Tolerable error rate in sampling defines:',
    options: [
      'Maximum errors expected',
      'Maximum deviation rate the auditor will accept',
      'Minimum sample size',
      'Confidence level only'
    ],
    correctAnswer: 1,
    explanation: 'Tolerable error rate is the maximum deviation from prescribed controls the auditor is willing to accept.',
    topic: 'Execution',
    subtopic: 'Sampling'
  },
  {
    id: 'CISA1-B12-008',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Stopping rules in sampling determine:',
    options: [
      'When to start testing',
      'When sampling can stop based on results observed',
      'Sample selection method',
      'Population characteristics'
    ],
    correctAnswer: 1,
    explanation: 'Stop-or-go sampling allows early stopping if results clearly indicate the population meets or fails control objectives.',
    topic: 'Execution',
    subtopic: 'Sampling Methods'
  },
  {
    id: 'CISA1-B12-009',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Judgmental sampling is based on:',
    options: [
      'Statistical probability',
      'Auditor knowledge and experience selecting items',
      'Random number tables',
      'Computer-generated selections'
    ],
    correctAnswer: 1,
    explanation: 'Judgmental (non-statistical) sampling uses auditor knowledge to select items believed to be representative or high-risk.',
    topic: 'Execution',
    subtopic: 'Sampling Methods'
  },
  {
    id: 'CISA1-B12-010',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Discovery sampling is used when:',
    options: [
      'Errors are common',
      'Looking for rare but critical items like fraud',
      'Testing all items',
      'Calculating dollar values'
    ],
    correctAnswer: 1,
    explanation: 'Discovery sampling is designed to detect at least one occurrence of a critical but rare event like fraud if it exists.',
    topic: 'Execution',
    subtopic: 'Sampling Methods'
  },
  {
    id: 'CISA1-B12-011',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Data validation for CAATs should ensure:',
    options: [
      'Speed of processing',
      'Data completeness and accuracy before analysis',
      'Minimum file sizes',
      'Fastest query execution'
    ],
    correctAnswer: 1,
    explanation: 'Before using data for analysis, auditors must verify its completeness and accuracy to ensure valid conclusions.',
    topic: 'CAATs',
    subtopic: 'Data Validation'
  },
  {
    id: 'CISA1-B12-012',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Snapshot techniques capture:',
    options: [
      'System photos',
      'Transaction data at specific processing points',
      'Only final outputs',
      'Physical environment'
    ],
    correctAnswer: 1,
    explanation: 'Snapshot captures transaction data at selected processing points to provide an audit trail of processing flow.',
    topic: 'CAATs',
    subtopic: 'Snapshot Technique'
  },
  {
    id: 'CISA1-B12-013',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Mapping software is used to:',
    options: [
      'Create geographic maps',
      'Identify executed and unexecuted program code paths',
      'Map network connections',
      'Document organizational charts'
    ],
    correctAnswer: 1,
    explanation: 'Mapping software identifies which code paths are executed during processing to detect unused or hidden code.',
    topic: 'CAATs',
    subtopic: 'Code Analysis'
  },
  {
    id: 'CISA1-B12-014',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Base case system evaluation (BCSE):',
    options: [
      'Tests production data only',
      'Uses a standard set of transactions to verify processing accuracy',
      'Avoids testing',
      'Tests only new functionality'
    ],
    correctAnswer: 1,
    explanation: 'BCSE uses a standardized set of test transactions with known results to verify ongoing processing accuracy.',
    topic: 'CAATs',
    subtopic: 'BCSE'
  },
  {
    id: 'CISA1-B12-015',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit finding severity should consider:',
    options: [
      'Only ease of fixing',
      'Potential impact and likelihood of adverse consequences',
      'Management preferences',
      'Audit budget only'
    ],
    correctAnswer: 1,
    explanation: 'Severity ratings should reflect the potential impact if the issue is not addressed and the likelihood of occurrence.',
    topic: 'Reporting',
    subtopic: 'Finding Severity'
  },
  {
    id: 'CISA1-B12-016',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Constructive recommendations should:',
    options: [
      'Only describe problems',
      'Provide practical solutions that address root causes',
      'Avoid specific suggestions',
      'Be vague for flexibility'
    ],
    correctAnswer: 1,
    explanation: 'Recommendations should be practical, address root causes, and provide clear guidance for remediation.',
    topic: 'Reporting',
    subtopic: 'Recommendations'
  },
  {
    id: 'CISA1-B12-017',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Audit report distribution should be:',
    options: [
      'As wide as possible',
      'Limited to those with a legitimate need to know',
      'Only to external parties',
      'Publicly available'
    ],
    correctAnswer: 1,
    explanation: 'Report distribution should be controlled to those with legitimate business need while ensuring appropriate oversight.',
    topic: 'Reporting',
    subtopic: 'Distribution'
  },
  {
    id: 'CISA1-B12-018',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Due professional care requires:',
    options: [
      'Guarantee of no errors',
      'Application of reasonable skill and competence',
      'Perfect results',
      'Unlimited time for audits'
    ],
    correctAnswer: 1,
    explanation: 'Due professional care means applying reasonable skill, diligence, and competence expected of a professional auditor.',
    topic: 'Standards and Ethics',
    subtopic: 'Due Care'
  },
  {
    id: 'CISA1-B12-019',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Engagement letters for IS audits define:',
    options: [
      'Only fees',
      'Scope, objectives, responsibilities, and expectations',
      'Only timelines',
      'Only staffing'
    ],
    correctAnswer: 1,
    explanation: 'Engagement letters formally document audit scope, objectives, roles, responsibilities, timing, and expectations.',
    topic: 'Planning',
    subtopic: 'Engagement Letter'
  },
  {
    id: 'CISA1-B12-020',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Quality assurance review of audit work ensures:',
    options: [
      'Faster completion',
      'Compliance with standards and appropriate evidence for conclusions',
      'Lower costs',
      'Fewer findings reported'
    ],
    correctAnswer: 1,
    explanation: 'QA reviews verify that audit work complies with standards and that evidence appropriately supports conclusions.',
    topic: 'Standards and Ethics',
    subtopic: 'Quality Assurance'
  },

  // ===========================================================================
  // DOMAIN 2: GOVERNANCE AND MANAGEMENT OF IT (16 questions)
  // ===========================================================================
  
  {
    id: 'CISA2-B12-021',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT strategy should include:',
    options: [
      'Only technology plans',
      'Vision, goals, initiatives, and alignment with business strategy',
      'Only budget allocations',
      'Only staffing plans'
    ],
    correctAnswer: 1,
    explanation: 'IT strategy defines vision, goals, and initiatives that align with and support business objectives.',
    topic: 'IT Governance',
    subtopic: 'IT Strategy'
  },
  {
    id: 'CISA2-B12-022',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'IT value delivery ensures:',
    options: [
      'Minimum IT spending',
      'IT investments deliver expected business benefits',
      'Technology is newest possible',
      'IT budget increases annually'
    ],
    correctAnswer: 1,
    explanation: 'Value delivery focuses on ensuring IT investments deliver promised benefits on time and within budget.',
    topic: 'IT Governance',
    subtopic: 'Value Delivery'
  },
  {
    id: 'CISA2-B12-023',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT performance measurement requires:',
    options: [
      'No baseline data',
      'Defined metrics, baselines, and regular monitoring',
      'Only annual reviews',
      'Only cost tracking'
    ],
    correctAnswer: 1,
    explanation: 'Effective measurement needs defined metrics, baseline data, targets, and regular monitoring and reporting.',
    topic: 'IT Governance',
    subtopic: 'Performance Measurement'
  },
  {
    id: 'CISA2-B12-024',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Enterprise risk management (ERM) scope includes:',
    options: [
      'Only financial risks',
      'Strategic, operational, reporting, and compliance risks across the enterprise',
      'Only IT risks',
      'Only regulatory risks'
    ],
    correctAnswer: 1,
    explanation: 'ERM takes a comprehensive view of all enterprise risks including strategic, operational, financial, and compliance.',
    topic: 'IT Risk Management',
    subtopic: 'ERM'
  },
  {
    id: 'CISA2-B12-025',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Risk heat maps display:',
    options: [
      'Only high risks',
      'Risks plotted by impact and likelihood for prioritization',
      'Only technology risks',
      'Only accepted risks'
    ],
    correctAnswer: 1,
    explanation: 'Heat maps visually display risks based on impact and likelihood to help prioritize risk treatment efforts.',
    topic: 'IT Risk Management',
    subtopic: 'Risk Visualization'
  },
  {
    id: 'CISA2-B12-026',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Control objectives define:',
    options: [
      'Specific control procedures',
      'What controls should achieve rather than how',
      'Only technical controls',
      'Only compliance requirements'
    ],
    correctAnswer: 1,
    explanation: 'Control objectives state what controls should accomplish; specific controls define how to achieve them.',
    topic: 'IT Governance',
    subtopic: 'Control Objectives'
  },
  {
    id: 'CISA2-B12-027',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT budget should be aligned with:',
    options: [
      'Previous year only',
      'Strategic objectives and planned initiatives',
      'Competitor spending',
      'Industry averages only'
    ],
    correctAnswer: 1,
    explanation: 'IT budget should align with strategic priorities and support planned initiatives rather than just historical spending.',
    topic: 'IT Management',
    subtopic: 'IT Budget'
  },
  {
    id: 'CISA2-B12-028',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Total cost of ownership (TCO) includes:',
    options: [
      'Only purchase price',
      'Acquisition, operation, maintenance, and disposal costs over lifetime',
      'Only hardware costs',
      'Only recurring costs'
    ],
    correctAnswer: 1,
    explanation: 'TCO includes all costs throughout the asset lifecycle: acquisition, implementation, operation, maintenance, and retirement.',
    topic: 'IT Management',
    subtopic: 'TCO'
  },
  {
    id: 'CISA2-B12-029',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT standards ensure:',
    options: [
      'Flexibility in all choices',
      'Consistency, compatibility, and supportability across the organization',
      'Maximum vendor choice',
      'No restrictions on technology'
    ],
    correctAnswer: 1,
    explanation: 'IT standards promote consistency, interoperability, and supportability while reducing complexity and costs.',
    topic: 'IT Management',
    subtopic: 'IT Standards'
  },
  {
    id: 'CISA2-B12-030',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Technology obsolescence should be managed through:',
    options: [
      'Ignoring until failure',
      'Lifecycle management with planned refresh and retirement',
      'Only emergency replacements',
      'Annual complete replacements'
    ],
    correctAnswer: 1,
    explanation: 'Lifecycle management proactively plans for technology refresh and retirement before obsolescence creates risk.',
    topic: 'IT Management',
    subtopic: 'Asset Lifecycle'
  },
  {
    id: 'CISA2-B12-031',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Cloud vendor assessment should include:',
    options: [
      'Only price comparison',
      'Security, compliance, financial stability, and performance capabilities',
      'Only technical features',
      'Only geographic location'
    ],
    correctAnswer: 1,
    explanation: 'Cloud vendor assessment evaluates security practices, compliance certifications, financial health, and service capabilities.',
    topic: 'Vendor Management',
    subtopic: 'Cloud Assessment'
  },
  {
    id: 'CISA2-B12-032',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Exit strategies for outsourcing should be:',
    options: [
      'Developed when exiting',
      'Planned before entering agreements to ensure transition capability',
      'Left to the vendor',
      'Not necessary'
    ],
    correctAnswer: 1,
    explanation: 'Exit strategies should be planned before signing agreements to ensure data, services, and operations can transition if needed.',
    topic: 'Vendor Management',
    subtopic: 'Exit Strategy'
  },
  {
    id: 'CISA2-B12-033',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'SOC 2 reports cover:',
    options: [
      'Only financial controls',
      'Trust service criteria: security, availability, processing integrity, confidentiality, privacy',
      'Only IT general controls',
      'Only compliance controls'
    ],
    correctAnswer: 1,
    explanation: 'SOC 2 reports assess controls related to security, availability, processing integrity, confidentiality, and/or privacy.',
    topic: 'Vendor Management',
    subtopic: 'Third-Party Assurance'
  },
  {
    id: 'CISA2-B12-034',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'RACI charts define:',
    options: [
      'Only responsible parties',
      'Responsible, Accountable, Consulted, and Informed roles for activities',
      'Only IT roles',
      'Only project timelines'
    ],
    correctAnswer: 1,
    explanation: 'RACI clarifies who is Responsible, Accountable, Consulted, and Informed for each activity or decision.',
    topic: 'IT Governance',
    subtopic: 'Roles and Responsibilities'
  },
  {
    id: 'CISA2-B12-035',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Problem escalation procedures ensure:',
    options: [
      'All problems are ignored',
      'Unresolved issues are raised to appropriate levels for resolution',
      'Only management is involved',
      'Problems are hidden'
    ],
    correctAnswer: 1,
    explanation: 'Escalation procedures ensure problems that cannot be resolved at one level are raised appropriately.',
    topic: 'IT Management',
    subtopic: 'Escalation'
  },
  {
    id: 'CISA2-B12-036',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Information security steering committee should include:',
    options: [
      'Only IT security staff',
      'Business and IT stakeholders to provide governance and direction',
      'Only external consultants',
      'Only operations staff'
    ],
    correctAnswer: 1,
    explanation: 'Security steering committees should include business and IT leadership to align security with business needs.',
    topic: 'IT Governance',
    subtopic: 'Security Governance'
  },

  // ===========================================================================
  // DOMAIN 3: ISA, DEVELOPMENT AND IMPLEMENTATION (18 questions)
  // ===========================================================================
  
  {
    id: 'CISA3-B12-037',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Make vs. buy decisions should consider:',
    options: [
      'Only cost',
      'Strategic fit, cost, time, quality, and risk factors',
      'Only technical capability',
      'Only vendor reputation'
    ],
    correctAnswer: 1,
    explanation: 'Make vs. buy analysis considers strategic alignment, total cost, time to market, quality requirements, and associated risks.',
    topic: 'Project Management',
    subtopic: 'Make vs. Buy'
  },
  {
    id: 'CISA3-B12-038',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Request for proposal (RFP) should include:',
    options: [
      'Only pricing requirements',
      'Detailed requirements, evaluation criteria, and contract terms',
      'Only technical specifications',
      'Only vendor questions'
    ],
    correctAnswer: 1,
    explanation: 'RFPs include requirements, evaluation criteria, contract terms, timeline, and response format to enable fair vendor comparison.',
    topic: 'Project Management',
    subtopic: 'Procurement'
  },
  {
    id: 'CISA3-B12-039',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Scope creep occurs when:',
    options: [
      'Scope is too small',
      'Requirements expand beyond original boundaries without formal approval',
      'Scope is well defined',
      'Resources are reduced'
    ],
    correctAnswer: 1,
    explanation: 'Scope creep is uncontrolled expansion of project scope without formal change control and approval.',
    topic: 'Project Management',
    subtopic: 'Scope Management'
  },
  {
    id: 'CISA3-B12-040',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Critical path in project management:',
    options: [
      'Is the shortest sequence',
      'Is the longest sequence determining minimum project duration',
      'Has the most resources',
      'Can be ignored'
    ],
    correctAnswer: 1,
    explanation: 'The critical path is the longest sequence of dependent tasks that determines the minimum project completion time.',
    topic: 'Project Management',
    subtopic: 'Critical Path'
  },
  {
    id: 'CISA3-B12-041',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Use case diagrams document:',
    options: [
      'Database structures',
      'System functions from user perspective',
      'Network topology',
      'Hardware specifications'
    ],
    correctAnswer: 1,
    explanation: 'Use cases document system functionality from the users\' perspective, showing actor interactions with the system.',
    topic: 'SDLC',
    subtopic: 'Use Cases'
  },
  {
    id: 'CISA3-B12-042',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Entity-relationship diagrams (ERDs) show:',
    options: [
      'System processes',
      'Data entities and their relationships',
      'User interfaces',
      'Program logic'
    ],
    correctAnswer: 1,
    explanation: 'ERDs model data entities, their attributes, and relationships to support database design.',
    topic: 'SDLC',
    subtopic: 'Data Modeling'
  },
  {
    id: 'CISA3-B12-043',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Prototyping is useful when:',
    options: [
      'Requirements are perfectly clear',
      'Users need to visualize and refine requirements',
      'Time is not a factor',
      'No user involvement is possible'
    ],
    correctAnswer: 1,
    explanation: 'Prototyping helps users visualize the solution and refine requirements when they cannot clearly articulate needs upfront.',
    topic: 'SDLC',
    subtopic: 'Prototyping'
  },
  {
    id: 'CISA3-B12-044',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Scrum sprints are:',
    options: [
      'Indefinite duration',
      'Fixed-length iterations delivering working increments',
      'Only for documentation',
      'Sequential waterfall phases'
    ],
    correctAnswer: 1,
    explanation: 'Sprints are fixed-length iterations (typically 2-4 weeks) that deliver potentially shippable product increments.',
    topic: 'SDLC',
    subtopic: 'Agile/Scrum'
  },
  {
    id: 'CISA3-B12-045',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Technical debt accumulates when:',
    options: [
      'Projects are cancelled',
      'Short-term solutions create future rework requirements',
      'Documentation is complete',
      'Testing is thorough'
    ],
    correctAnswer: 1,
    explanation: 'Technical debt results from shortcuts or suboptimal solutions that require future rework to address properly.',
    topic: 'Development',
    subtopic: 'Technical Debt'
  },
  {
    id: 'CISA3-B12-046',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Continuous integration (CI) ensures:',
    options: [
      'Code is never tested',
      'Code changes are frequently integrated and automatically tested',
      'Only annual releases',
      'Manual deployments'
    ],
    correctAnswer: 1,
    explanation: 'CI automatically integrates and tests code changes frequently to detect integration issues early.',
    topic: 'Development',
    subtopic: 'CI/CD'
  },
  {
    id: 'CISA3-B12-047',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Continuous deployment differs from continuous delivery because:',
    options: [
      'They are identical',
      'Deployment automatically releases to production; delivery requires manual approval',
      'Delivery is faster',
      'Deployment has no testing'
    ],
    correctAnswer: 1,
    explanation: 'Continuous deployment automatically deploys to production; continuous delivery prepares for release but requires approval.',
    topic: 'Development',
    subtopic: 'CI/CD'
  },
  {
    id: 'CISA3-B12-048',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Software composition analysis (SCA) identifies:',
    options: [
      'Code style issues',
      'Vulnerabilities in open source and third-party components',
      'Performance issues',
      'User interface problems'
    ],
    correctAnswer: 1,
    explanation: 'SCA identifies known vulnerabilities, license issues, and risks in open source and third-party components.',
    topic: 'Secure Development',
    subtopic: 'SCA'
  },
  {
    id: 'CISA3-B12-049',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Threat modeling identifies:',
    options: [
      'Only known vulnerabilities',
      'Potential threats and attack vectors for a system',
      'Only compliance gaps',
      'Only performance issues'
    ],
    correctAnswer: 1,
    explanation: 'Threat modeling systematically identifies potential threats, attack vectors, and mitigations during design.',
    topic: 'Secure Development',
    subtopic: 'Threat Modeling'
  },
  {
    id: 'CISA3-B12-050',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'STRIDE is a threat modeling framework for:',
    options: [
      'Performance testing',
      'Categorizing threats: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation',
      'Code review',
      'Database design'
    ],
    correctAnswer: 1,
    explanation: 'STRIDE categorizes threats: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.',
    topic: 'Secure Development',
    subtopic: 'STRIDE'
  },
  {
    id: 'CISA3-B12-051',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Test management includes:',
    options: [
      'Only test execution',
      'Planning, design, execution, tracking, and defect management',
      'Only defect logging',
      'Only automation'
    ],
    correctAnswer: 1,
    explanation: 'Test management encompasses planning, test case design, execution, results tracking, and defect management.',
    topic: 'Testing',
    subtopic: 'Test Management'
  },
  {
    id: 'CISA3-B12-052',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Test coverage metrics measure:',
    options: [
      'Test script length',
      'Extent to which requirements, code, or conditions are tested',
      'Number of testers',
      'Test execution time'
    ],
    correctAnswer: 1,
    explanation: 'Coverage metrics measure what percentage of requirements, code paths, or conditions are exercised by tests.',
    topic: 'Testing',
    subtopic: 'Test Metrics'
  },
  {
    id: 'CISA3-B12-053',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Training for new systems should:',
    options: [
      'Only use documentation',
      'Be role-appropriate and provided before go-live',
      'Occur only after problems',
      'Be optional'
    ],
    correctAnswer: 1,
    explanation: 'Training should be tailored to user roles and provided before implementation to ensure effective system use.',
    topic: 'Implementation',
    subtopic: 'Training'
  },
  {
    id: 'CISA3-B12-054',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Hypercare period after go-live provides:',
    options: [
      'Normal support',
      'Enhanced support to address issues during initial production use',
      'No support',
      'Only documentation updates'
    ],
    correctAnswer: 1,
    explanation: 'Hypercare provides enhanced support resources immediately after go-live to quickly address issues.',
    topic: 'Implementation',
    subtopic: 'Post-Implementation Support'
  },

  // ===========================================================================
  // DOMAIN 4: IS OPERATIONS AND BUSINESS RESILIENCE (20 questions)
  // ===========================================================================
  
  {
    id: 'CISA4-B12-055',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Event management distinguishes between:',
    options: [
      'Only critical events',
      'Informational, warning, and exception events for appropriate handling',
      'Only positive events',
      'Only automated events'
    ],
    correctAnswer: 1,
    explanation: 'Event management categorizes events to ensure appropriate handling - information, warnings requiring attention, and exceptions requiring action.',
    topic: 'IT Service Management',
    subtopic: 'Event Management'
  },
  {
    id: 'CISA4-B12-056',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Service request fulfillment differs from incident management because:',
    options: [
      'They are identical',
      'Service requests are pre-approved standard changes; incidents are unplanned interruptions',
      'Incidents are planned',
      'Requests are faster'
    ],
    correctAnswer: 1,
    explanation: 'Service requests are standard, pre-approved activities; incidents are unplanned interruptions requiring restoration.',
    topic: 'IT Service Management',
    subtopic: 'Service Request'
  },
  {
    id: 'CISA4-B12-057',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Major incident management requires:',
    options: [
      'Normal incident handling',
      'Escalated coordination, communication, and faster resolution efforts',
      'No documentation',
      'Ignoring until resolved'
    ],
    correctAnswer: 1,
    explanation: 'Major incidents require escalated management attention, coordinated response, and enhanced communication.',
    topic: 'IT Service Management',
    subtopic: 'Major Incidents'
  },
  {
    id: 'CISA4-B12-058',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Root cause analysis (RCA) techniques include:',
    options: [
      'Only brainstorming',
      '5 Whys, fishbone diagrams, and fault tree analysis',
      'Only interviewing',
      'Only log review'
    ],
    correctAnswer: 1,
    explanation: 'RCA uses techniques like 5 Whys, Ishikawa/fishbone diagrams, and fault tree analysis to identify underlying causes.',
    topic: 'IT Service Management',
    subtopic: 'Root Cause Analysis'
  },
  {
    id: 'CISA4-B12-059',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Service catalog provides:',
    options: [
      'Only pricing',
      'Description of available services with their characteristics',
      'Only technical specifications',
      'Only historical data'
    ],
    correctAnswer: 1,
    explanation: 'The service catalog documents available services, their features, service levels, and how to request them.',
    topic: 'IT Service Management',
    subtopic: 'Service Catalog'
  },
  {
    id: 'CISA4-B12-060',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Operational level agreements (OLAs) define:',
    options: [
      'Customer service levels',
      'Internal support group commitments supporting external SLAs',
      'Vendor commitments',
      'Project deliverables'
    ],
    correctAnswer: 1,
    explanation: 'OLAs define internal support group responsibilities and commitments that enable meeting external SLAs.',
    topic: 'IT Service Management',
    subtopic: 'OLA'
  },
  {
    id: 'CISA4-B12-061',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Availability management ensures:',
    options: [
      'Only uptime tracking',
      'Services are available to meet agreed service levels',
      'Only capacity planning',
      'Only performance monitoring'
    ],
    correctAnswer: 1,
    explanation: 'Availability management ensures IT services are available when needed to meet agreed service levels.',
    topic: 'IT Service Management',
    subtopic: 'Availability Management'
  },
  {
    id: 'CISA4-B12-062',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Fault tolerance provides:',
    options: [
      'Only faster recovery',
      'Continued operation despite component failures',
      'Only backup power',
      'Only data backup'
    ],
    correctAnswer: 1,
    explanation: 'Fault tolerance allows systems to continue operating properly despite failures of some components.',
    topic: 'IT Operations',
    subtopic: 'Fault Tolerance'
  },
  {
    id: 'CISA4-B12-063',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'High availability architectures use:',
    options: [
      'Single points of failure',
      'Redundant components and failover capabilities',
      'Only cloud services',
      'Only manual recovery'
    ],
    correctAnswer: 1,
    explanation: 'High availability eliminates single points of failure through redundancy and automatic failover.',
    topic: 'IT Operations',
    subtopic: 'High Availability'
  },
  {
    id: 'CISA4-B12-064',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Active-active clustering differs from active-passive because:',
    options: [
      'Active-active is less reliable',
      'Active-active has all nodes processing; active-passive has standby nodes',
      'Active-passive is more expensive',
      'They are identical'
    ],
    correctAnswer: 1,
    explanation: 'Active-active has all nodes actively processing; active-passive has standby nodes waiting to assume load.',
    topic: 'IT Operations',
    subtopic: 'Clustering'
  },
  {
    id: 'CISA4-B12-065',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Database mirroring provides:',
    options: [
      'Only data backup',
      'Real-time synchronous or asynchronous copy for failover',
      'Only read performance',
      'Only storage savings'
    ],
    correctAnswer: 1,
    explanation: 'Database mirroring maintains a synchronized copy for failover, either synchronously or asynchronously.',
    topic: 'IT Operations',
    subtopic: 'Database Resilience'
  },
  {
    id: 'CISA4-B12-066',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Business continuity plan testing frequency should be:',
    options: [
      'Only after disasters',
      'Regular and based on risk, with updates after significant changes',
      'Only annually',
      'Never during business hours'
    ],
    correctAnswer: 1,
    explanation: 'BCP testing should occur regularly based on risk, and additionally when significant changes occur.',
    topic: 'Business Continuity',
    subtopic: 'Testing Frequency'
  },
  {
    id: 'CISA4-B12-067',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Simulation testing of DR plans:',
    options: [
      'Uses actual failover',
      'Simulates disaster scenarios to test decision-making without actual activation',
      'Replaces all other testing',
      'Is less valuable than tabletop'
    ],
    correctAnswer: 1,
    explanation: 'Simulation tests disaster scenarios more realistically than tabletops without requiring actual system failover.',
    topic: 'Business Continuity',
    subtopic: 'DR Testing'
  },
  {
    id: 'CISA4-B12-068',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Alternate processing facilities should be:',
    options: [
      'Identical to primary',
      'Capable of supporting critical operations within RTO',
      'Lower capacity than needed',
      'In the same building'
    ],
    correctAnswer: 1,
    explanation: 'Alternate facilities must have sufficient capability to support critical operations within recovery time objectives.',
    topic: 'Business Continuity',
    subtopic: 'Alternate Sites'
  },
  {
    id: 'CISA4-B12-069',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Vital records management for BC ensures:',
    options: [
      'All records are kept forever',
      'Essential records are protected and available when needed',
      'Records are only electronic',
      'Records are only physical'
    ],
    correctAnswer: 1,
    explanation: 'Vital records programs protect essential records needed during and after disasters for business continuity.',
    topic: 'Business Continuity',
    subtopic: 'Vital Records'
  },
  {
    id: 'CISA4-B12-070',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Supply chain resilience in BCP addresses:',
    options: [
      'Only internal operations',
      'Dependencies on suppliers and partners that could affect operations',
      'Only IT vendors',
      'Only domestic suppliers'
    ],
    correctAnswer: 1,
    explanation: 'Supply chain resilience addresses dependencies on external suppliers and partners whose disruption could affect operations.',
    topic: 'Business Continuity',
    subtopic: 'Supply Chain'
  },
  {
    id: 'CISA4-B12-071',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Automatic failover compared to manual:',
    options: [
      'Is always preferred',
      'Provides faster recovery but may trigger unnecessarily',
      'Is less reliable',
      'Costs nothing additional'
    ],
    correctAnswer: 1,
    explanation: 'Automatic failover is faster but may be triggered by false positives; manual requires intervention but offers more control.',
    topic: 'IT Operations',
    subtopic: 'Failover'
  },
  {
    id: 'CISA4-B12-072',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Runbook automation:',
    options: [
      'Eliminates all human involvement',
      'Automates operational procedures for consistency and speed',
      'Only applies to documentation',
      'Replaces monitoring'
    ],
    correctAnswer: 1,
    explanation: 'Runbook automation scripts operational procedures to ensure consistent execution and faster response.',
    topic: 'IT Operations',
    subtopic: 'Automation'
  },
  {
    id: 'CISA4-B12-073',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Decommissioning IT assets should include:',
    options: [
      'Simple disposal',
      'Data sanitization, license recovery, and proper disposal/recycling',
      'Only physical destruction',
      'Only removal from inventory'
    ],
    correctAnswer: 1,
    explanation: 'Decommissioning includes data sanitization, license recovery, environmental disposal, and inventory/documentation updates.',
    topic: 'IT Operations',
    subtopic: 'Asset Disposition'
  },
  {
    id: 'CISA4-B12-074',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Fire suppression systems in data centers should:',
    options: [
      'Use water only',
      'Use agents safe for equipment and personnel while effective',
      'Only activate manually',
      'Only protect certain areas'
    ],
    correctAnswer: 1,
    explanation: 'Data center fire suppression should use clean agents that suppress fire without damaging equipment.',
    topic: 'IT Operations',
    subtopic: 'Environmental Controls'
  },

  // ===========================================================================
  // DOMAIN 5: PROTECTION OF INFORMATION ASSETS (26 questions)
  // ===========================================================================
  
  {
    id: 'CISA5-B12-075',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Security policy framework includes:',
    options: [
      'Only high-level policies',
      'Policies, standards, procedures, and guidelines in hierarchy',
      'Only IT procedures',
      'Only compliance statements'
    ],
    correctAnswer: 1,
    explanation: 'The framework includes policies (what), standards (what specifically), procedures (how), and guidelines (suggestions).',
    topic: 'Security Governance',
    subtopic: 'Policy Framework'
  },
  {
    id: 'CISA5-B12-076',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security metrics should be:',
    options: [
      'As numerous as possible',
      'Meaningful, actionable, and aligned with objectives',
      'Only technical measures',
      'Only for compliance'
    ],
    correctAnswer: 1,
    explanation: 'Effective metrics are meaningful, support decision-making, drive action, and align with security objectives.',
    topic: 'Security Governance',
    subtopic: 'Security Metrics'
  },
  {
    id: 'CISA5-B12-077',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Security risk assessment should identify:',
    options: [
      'Only high risks',
      'Assets, threats, vulnerabilities, and potential impacts',
      'Only compliance gaps',
      'Only technical issues'
    ],
    correctAnswer: 1,
    explanation: 'Risk assessment identifies assets, threats, vulnerabilities, existing controls, and potential impacts.',
    topic: 'Security Management',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CISA5-B12-078',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Mandatory access control (MAC) is characterized by:',
    options: [
      'User-defined permissions',
      'System-enforced labels determining access regardless of user preference',
      'Role assignments only',
      'No access restrictions'
    ],
    correctAnswer: 1,
    explanation: 'MAC uses security labels and classifications enforced by the system regardless of user preferences.',
    topic: 'Access Control',
    subtopic: 'MAC'
  },
  {
    id: 'CISA5-B12-079',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Discretionary access control (DAC) allows:',
    options: [
      'Only system administrators to grant access',
      'Resource owners to grant access at their discretion',
      'Only role-based access',
      'No access delegation'
    ],
    correctAnswer: 1,
    explanation: 'DAC allows resource owners to grant access to their resources at their own discretion.',
    topic: 'Access Control',
    subtopic: 'DAC'
  },
  {
    id: 'CISA5-B12-080',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Federated identity management enables:',
    options: [
      'Only internal authentication',
      'Cross-domain authentication using trusted identity providers',
      'Only password management',
      'Only local accounts'
    ],
    correctAnswer: 1,
    explanation: 'Federation allows authentication credentials from trusted identity providers to be accepted across organizational boundaries.',
    topic: 'Access Control',
    subtopic: 'Federation'
  },
  {
    id: 'CISA5-B12-081',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Session management controls should:',
    options: [
      'Keep sessions active indefinitely',
      'Limit session duration, enforce logout, and protect session tokens',
      'Allow unlimited concurrent sessions',
      'Skip authentication checks'
    ],
    correctAnswer: 1,
    explanation: 'Session controls include timeouts, logout enforcement, token protection, and limiting concurrent sessions.',
    topic: 'Access Control',
    subtopic: 'Session Management'
  },
  {
    id: 'CISA5-B12-082',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Web application firewalls (WAF) provide:',
    options: [
      'Only network filtering',
      'Application-layer protection against web attacks',
      'Only authentication',
      'Only encryption'
    ],
    correctAnswer: 1,
    explanation: 'WAFs filter HTTP traffic to protect against application-layer attacks like SQL injection and XSS.',
    topic: 'Network Security',
    subtopic: 'WAF'
  },
  {
    id: 'CISA5-B12-083',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'DMZ (demilitarized zone) placement isolates:',
    options: [
      'All internal systems',
      'Public-facing services from internal networks',
      'Only database servers',
      'Only development systems'
    ],
    correctAnswer: 1,
    explanation: 'DMZ isolates public-facing services, providing a buffer between untrusted networks and the internal network.',
    topic: 'Network Security',
    subtopic: 'Network Architecture'
  },
  {
    id: 'CISA5-B12-084',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Micro-segmentation differs from traditional network segmentation because:',
    options: [
      'It uses larger segments',
      'It provides granular, workload-level isolation and access control',
      'It only applies to cloud',
      'It uses no firewalls'
    ],
    correctAnswer: 1,
    explanation: 'Micro-segmentation provides granular isolation at the workload or application level rather than network zone level.',
    topic: 'Network Security',
    subtopic: 'Micro-segmentation'
  },
  {
    id: 'CISA5-B12-085',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Digital certificates are used to:',
    options: [
      'Only encrypt data',
      'Verify entity identity and enable secure communications',
      'Only sign documents',
      'Only store passwords'
    ],
    correctAnswer: 1,
    explanation: 'Digital certificates verify entity identity, enabling authentication and encrypted communications.',
    topic: 'Cryptography',
    subtopic: 'Digital Certificates'
  },
  {
    id: 'CISA5-B12-086',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Certificate revocation occurs when:',
    options: [
      'Certificates expire normally',
      'Certificates are invalidated before expiration due to compromise or other reasons',
      'Certificates are renewed',
      'PKI is decommissioned'
    ],
    correctAnswer: 1,
    explanation: 'Revocation invalidates certificates before expiration, typically due to key compromise, policy changes, or operational reasons.',
    topic: 'Cryptography',
    subtopic: 'Certificate Management'
  },
  {
    id: 'CISA5-B12-087',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Perfect forward secrecy ensures:',
    options: [
      'Keys never expire',
      'Compromise of long-term keys does not compromise past session keys',
      'Faster encryption',
      'No authentication'
    ],
    correctAnswer: 1,
    explanation: 'Perfect forward secrecy uses ephemeral keys so compromise of long-term keys does not expose past communications.',
    topic: 'Cryptography',
    subtopic: 'Forward Secrecy'
  },
  {
    id: 'CISA5-B12-088',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Hardware security modules (HSM) provide:',
    options: [
      'Only key storage',
      'Tamper-resistant key generation, storage, and cryptographic operations',
      'Only backup',
      'Only performance'
    ],
    correctAnswer: 1,
    explanation: 'HSMs are dedicated hardware providing tamper-resistant cryptographic key management and operations.',
    topic: 'Cryptography',
    subtopic: 'HSM'
  },
  {
    id: 'CISA5-B12-089',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Security baselines define:',
    options: [
      'Maximum security',
      'Minimum security configurations for systems',
      'Optional improvements',
      'Future goals only'
    ],
    correctAnswer: 1,
    explanation: 'Security baselines define minimum required security configurations for system types.',
    topic: 'Security Operations',
    subtopic: 'Configuration Management'
  },
  {
    id: 'CISA5-B12-090',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security hardening includes:',
    options: [
      'Adding all features',
      'Removing unnecessary services, applying patches, and restricting access',
      'Only firewall rules',
      'Only antivirus'
    ],
    correctAnswer: 1,
    explanation: 'Hardening reduces attack surface by removing unnecessary services, applying patches, configuring securely, and restricting access.',
    topic: 'Security Operations',
    subtopic: 'Hardening'
  },
  {
    id: 'CISA5-B12-091',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Anomaly-based detection:',
    options: [
      'Uses predefined signatures',
      'Identifies deviations from established normal behavior patterns',
      'Only detects known threats',
      'Has no false positives'
    ],
    correctAnswer: 1,
    explanation: 'Anomaly detection identifies deviations from baselines of normal behavior, detecting unknown threats.',
    topic: 'Security Operations',
    subtopic: 'Detection Methods'
  },
  {
    id: 'CISA5-B12-092',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'APT (advanced persistent threat) is characterized by:',
    options: [
      'Quick, automated attacks',
      'Sophisticated, targeted, patient attacks often by nation-states',
      'Only malware',
      'Only denial of service'
    ],
    correctAnswer: 1,
    explanation: 'APTs are sophisticated, targeted attacks by well-resourced actors (often nation-states) who persist undetected over time.',
    topic: 'Security Threats',
    subtopic: 'APT'
  },
  {
    id: 'CISA5-B12-093',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Supply chain attacks target:',
    options: [
      'Only end users',
      'Vendors or software to compromise downstream customers',
      'Only networks',
      'Only physical facilities'
    ],
    correctAnswer: 1,
    explanation: 'Supply chain attacks compromise vendors, software, or components to affect downstream customers.',
    topic: 'Security Threats',
    subtopic: 'Supply Chain Attacks'
  },
  {
    id: 'CISA5-B12-094',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Tabletop exercises for incident response:',
    options: [
      'Test actual systems',
      'Walk through scenarios to test plans and identify gaps',
      'Replace all other testing',
      'Are not valuable'
    ],
    correctAnswer: 1,
    explanation: 'Tabletops discuss scenarios to test response plans, clarify roles, and identify gaps without actual system activation.',
    topic: 'Incident Management',
    subtopic: 'IR Testing'
  },
  {
    id: 'CISA5-B12-095',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Eradication phase of incident response:',
    options: [
      'Comes before containment',
      'Removes threat actors and artifacts from the environment',
      'Is optional',
      'Only involves backup'
    ],
    correctAnswer: 1,
    explanation: 'Eradication removes threats, malware, and artifacts from the environment after containment.',
    topic: 'Incident Management',
    subtopic: 'Incident Response'
  },
  {
    id: 'CISA5-B12-096',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Forensic imaging should:',
    options: [
      'Modify original evidence',
      'Create bit-for-bit copies without altering originals',
      'Only copy selected files',
      'Be performed last'
    ],
    correctAnswer: 1,
    explanation: 'Forensic imaging creates exact bit-for-bit copies for analysis while preserving original evidence integrity.',
    topic: 'Incident Management',
    subtopic: 'Digital Forensics'
  },
  {
    id: 'CISA5-B12-097',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Visitor management controls include:',
    options: [
      'Open access policies',
      'Registration, escort requirements, and access limitations',
      'Only sign-in logs',
      'Only weekday restrictions'
    ],
    correctAnswer: 1,
    explanation: 'Visitor controls include registration, ID verification, escort requirements, and access restrictions.',
    topic: 'Physical Security',
    subtopic: 'Visitor Control'
  },
  {
    id: 'CISA5-B12-098',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'GDPR requirements include:',
    options: [
      'Only EU residents',
      'Consent, data subject rights, breach notification, and DPO requirements',
      'Only cookies',
      'Only marketing consent'
    ],
    correctAnswer: 1,
    explanation: 'GDPR requires lawful basis for processing, data subject rights, breach notification, and data protection measures.',
    topic: 'Privacy',
    subtopic: 'GDPR'
  },
  {
    id: 'CISA5-B12-099',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Data minimization requires:',
    options: [
      'Collecting maximum data',
      'Collecting only data necessary for the specified purpose',
      'Keeping data forever',
      'Sharing all data'
    ],
    correctAnswer: 1,
    explanation: 'Data minimization limits collection to data necessary and proportionate for the specified legitimate purpose.',
    topic: 'Privacy',
    subtopic: 'Privacy Principles'
  },
  {
    id: 'CISA5-B12-100',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Cloud access security brokers (CASB) provide:',
    options: [
      'Only cloud storage',
      'Visibility and control over cloud service usage and security',
      'Only authentication',
      'Only encryption'
    ],
    correctAnswer: 1,
    explanation: 'CASBs provide visibility, compliance, data security, and threat protection for cloud service usage.',
    topic: 'Cloud Security',
    subtopic: 'CASB'
  }
];

// Export domain-specific question arrays
export const CISA1_QUESTIONS_BATCH12 = ALL_BATCH12.filter(q => q.section === 'CISA1');
export const CISA2_QUESTIONS_BATCH12 = ALL_BATCH12.filter(q => q.section === 'CISA2');
export const CISA3_QUESTIONS_BATCH12 = ALL_BATCH12.filter(q => q.section === 'CISA3');
export const CISA4_QUESTIONS_BATCH12 = ALL_BATCH12.filter(q => q.section === 'CISA4');
export const CISA5_QUESTIONS_BATCH12 = ALL_BATCH12.filter(q => q.section === 'CISA5');
