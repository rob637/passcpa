/**
 * CISA All Domains Batch 13 (FINAL)
 * 81 questions across all 5 domains
 * Certified Information Systems Auditor exam preparation
 */

import { Question } from '../../../types';

const ALL_BATCH13: Question[] = [
  // ===========================================================================
  // DOMAIN 1: INFORMATION SYSTEMS AUDITING PROCESS (16 questions)
  // ===========================================================================
  
  {
    id: 'CISA1-B13-001',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Continuous monitoring differs from periodic auditing because:',
    options: [
      'It only occurs once',
      'It provides ongoing, real-time visibility into control effectiveness',
      'It replaces all testing',
      'It uses no technology'
    ],
    correctAnswer: 1,
    explanation: 'Continuous monitoring provides ongoing, often automated assessment rather than point-in-time evaluations.',
    topic: 'Audit Approach',
    subtopic: 'Continuous Monitoring'
  },
  {
    id: 'CISA1-B13-002',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Audit trail analysis using CAATs helps identify:',
    options: [
      'Only system performance',
      'Unusual activity patterns, access violations, and control weaknesses',
      'Only hardware issues',
      'Only user satisfaction'
    ],
    correctAnswer: 1,
    explanation: 'CAATs can analyze audit trails to detect anomalies, unauthorized access, and control failures.',
    topic: 'CAATs',
    subtopic: 'Audit Trail Analysis'
  },
  {
    id: 'CISA1-B13-003',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Generalized audit software (GAS) is most useful for:',
    options: [
      'Hardware testing only',
      'Querying and analyzing data from various sources without programming',
      'Physical inspections',
      'Interviewing technique'
    ],
    correctAnswer: 1,
    explanation: 'GAS provides pre-built functions for data extraction, analysis, and reporting without custom programming.',
    topic: 'CAATs',
    subtopic: 'GAS'
  },
  {
    id: 'CISA1-B13-004',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Embedded audit modules in applications:',
    options: [
      'Are installed separately',
      'Capture transactions meeting predefined criteria during processing',
      'Only test after system shutdown',
      'Replace external audits'
    ],
    correctAnswer: 1,
    explanation: 'Embedded audit modules are built into applications to capture and report on transactions meeting audit criteria.',
    topic: 'CAATs',
    subtopic: 'Embedded Audit Modules'
  },
  {
    id: 'CISA1-B13-005',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Stratification in sampling divides:',
    options: [
      'All items equally',
      'Population into subgroups with similar characteristics',
      'Only high-value items',
      'Only by date'
    ],
    correctAnswer: 1,
    explanation: 'Stratification creates homogeneous subgroups from which samples are selected, improving efficiency.',
    topic: 'Execution',
    subtopic: 'Sampling'
  },
  {
    id: 'CISA1-B13-006',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Variable sampling is appropriate when:',
    options: [
      'Testing attribute presence',
      'Estimating monetary values or quantities',
      'Testing yes/no conditions',
      'Checking compliance rates'
    ],
    correctAnswer: 1,
    explanation: 'Variable sampling estimates monetary amounts or quantities, while attribute sampling tests presence/absence of characteristics.',
    topic: 'Execution',
    subtopic: 'Sampling Types'
  },
  {
    id: 'CISA1-B13-007',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Parallel simulation involves:',
    options: [
      'Copying the entire production system',
      'Using audit programs to reprocess production data to verify results',
      'Only testing new systems',
      'Avoiding production data'
    ],
    correctAnswer: 1,
    explanation: 'Parallel simulation uses auditor-controlled programs to reprocess production data and compare to production results.',
    topic: 'CAATs',
    subtopic: 'Parallel Simulation'
  },
  {
    id: 'CISA1-B13-008',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Integrated test facility (ITF) uses:',
    options: [
      'Separate test systems',
      'Fictitious entities in production to test processing without affecting real data',
      'Only offline testing',
      'Only historical data'
    ],
    correctAnswer: 1,
    explanation: 'ITF creates dummy entities (like fake departments) in production to test processing controls with real transactions.',
    topic: 'CAATs',
    subtopic: 'ITF'
  },
  {
    id: 'CISA1-B13-009',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Working paper review by supervisors ensures:',
    options: [
      'Faster completion',
      'Quality, completeness, and proper conclusions from evidence',
      'Lower costs',
      'Fewer working papers'
    ],
    correctAnswer: 1,
    explanation: 'Supervisory review verifies that work is complete, properly documented, and conclusions are supported.',
    topic: 'Documentation',
    subtopic: 'Working Paper Review'
  },
  {
    id: 'CISA1-B13-010',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Working paper retention should consider:',
    options: [
      'Only audit department preferences',
      'Legal, regulatory, and organizational requirements',
      'Only storage costs',
      'Only paper volume'
    ],
    correctAnswer: 1,
    explanation: 'Retention policies must address legal requirements, regulatory mandates, and organizational policies.',
    topic: 'Documentation',
    subtopic: 'Retention'
  },
  {
    id: 'CISA1-B13-011',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Exit meetings provide opportunity to:',
    options: [
      'Hide findings',
      'Present findings and validate management response before report issuance',
      'Avoid documentation',
      'Delay the audit'
    ],
    correctAnswer: 1,
    explanation: 'Exit meetings allow discussing findings, validating facts, and obtaining management responses before finalizing reports.',
    topic: 'Reporting',
    subtopic: 'Exit Meeting'
  },
  {
    id: 'CISA1-B13-012',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Opinion or conclusion in audit reports should be:',
    options: [
      'Vague and general',
      'Clearly stated and supported by sufficient appropriate evidence',
      'Omitted entirely',
      'Only positive'
    ],
    correctAnswer: 1,
    explanation: 'Audit opinions must be clearly stated and based on sufficient appropriate evidence gathered during the audit.',
    topic: 'Reporting',
    subtopic: 'Audit Opinion'
  },
  {
    id: 'CISA1-B13-013',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Self-assessment by management:',
    options: [
      'Replaces all audit activities',
      'Can be used by auditors but requires independent verification',
      'Is never useful',
      'Has no reliability issues'
    ],
    correctAnswer: 1,
    explanation: 'Control self-assessments provide useful information but should be verified through independent audit procedures.',
    topic: 'Audit Techniques',
    subtopic: 'Self-Assessment'
  },
  {
    id: 'CISA1-B13-014',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Materiality thresholds help auditors:',
    options: [
      'Ignore all small items',
      'Focus resources on items that could significantly impact conclusions',
      'Test everything equally',
      'Avoid quantitative analysis'
    ],
    correctAnswer: 1,
    explanation: 'Materiality helps focus audit efforts on items whose misstatement could affect users\' decisions.',
    topic: 'Planning',
    subtopic: 'Materiality'
  },
  {
    id: 'CISA1-B13-015',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'medium',
    question: 'Professional skepticism requires auditors to:',
    options: [
      'Trust all information',
      'Question and critically assess evidence rather than accept at face value',
      'Ignore management assertions',
      'Be confrontational'
    ],
    correctAnswer: 1,
    explanation: 'Professional skepticism means questioning information, recognizing potential for error or fraud, and evaluating evidence critically.',
    topic: 'Standards and Ethics',
    subtopic: 'Professional Skepticism'
  },
  {
    id: 'CISA1-B13-016',
    courseId: 'cisa',
    section: 'CISA1',
    difficulty: 'hard',
    question: 'Conflicts of interest must be:',
    options: [
      'Ignored',
      'Disclosed and managed appropriately to maintain objectivity',
      'Kept confidential',
      'Reported only externally'
    ],
    correctAnswer: 1,
    explanation: 'Conflicts must be disclosed to appropriate parties and managed to prevent impairment of objectivity.',
    topic: 'Standards and Ethics',
    subtopic: 'Conflicts of Interest'
  },

  // ===========================================================================
  // DOMAIN 2: GOVERNANCE AND MANAGEMENT OF IT (13 questions)
  // ===========================================================================
  
  {
    id: 'CISA2-B13-017',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT architecture provides:',
    options: [
      'Only hardware specifications',
      'Framework for aligning IT infrastructure with business requirements',
      'Only software lists',
      'Only network diagrams'
    ],
    correctAnswer: 1,
    explanation: 'IT architecture provides a structured framework for how IT systems, data, and technology support business needs.',
    topic: 'IT Governance',
    subtopic: 'IT Architecture'
  },
  {
    id: 'CISA2-B13-018',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Technology radar helps organizations:',
    options: [
      'Only track current systems',
      'Assess and plan adoption of emerging technologies',
      'Only monitor competitors',
      'Only manage incidents'
    ],
    correctAnswer: 1,
    explanation: 'Technology radars help evaluate emerging technologies and plan adoption based on business value and maturity.',
    topic: 'IT Governance',
    subtopic: 'Emerging Technology'
  },
  {
    id: 'CISA2-B13-019',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT financial management includes:',
    options: [
      'Only budgeting',
      'Budgeting, cost accounting, cost allocation, and chargeback',
      'Only procurement',
      'Only capital expenses'
    ],
    correctAnswer: 1,
    explanation: 'IT financial management encompasses budgeting, cost tracking, allocation methods, and chargeback mechanisms.',
    topic: 'IT Management',
    subtopic: 'IT Finance'
  },
  {
    id: 'CISA2-B13-020',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Benefit realization management ensures:',
    options: [
      'Only cost tracking',
      'Expected benefits from IT investments are actually achieved',
      'Only project completion',
      'Only budget adherence'
    ],
    correctAnswer: 1,
    explanation: 'Benefit realization tracks and manages achievement of planned benefits from IT investments over time.',
    topic: 'IT Governance',
    subtopic: 'Benefit Realization'
  },
  {
    id: 'CISA2-B13-021',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Control environment includes:',
    options: [
      'Only IT controls',
      'Organizational culture, structure, ethics, and management philosophy',
      'Only technical controls',
      'Only policies'
    ],
    correctAnswer: 1,
    explanation: 'Control environment encompasses organizational culture, ethical values, structure, and management\'s attitude toward controls.',
    topic: 'IT Governance',
    subtopic: 'Control Environment'
  },
  {
    id: 'CISA2-B13-022',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'KPIs vs KRIs differ because:',
    options: [
      'They are identical',
      'KPIs measure performance achievement; KRIs measure risk exposure',
      'KRIs measure past events only',
      'KPIs are not quantifiable'
    ],
    correctAnswer: 1,
    explanation: 'KPIs measure performance against objectives; KRIs (Key Risk Indicators) measure risk exposure and trends.',
    topic: 'IT Governance',
    subtopic: 'Metrics'
  },
  {
    id: 'CISA2-B13-023',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT portfolio management:',
    options: [
      'Only tracks new projects',
      'Manages all IT investments as a portfolio to optimize value',
      'Only approves budget',
      'Only reviews proposals'
    ],
    correctAnswer: 1,
    explanation: 'Portfolio management treats all IT investments as a portfolio to balance risk, value, and resource allocation.',
    topic: 'IT Governance',
    subtopic: 'Portfolio Management'
  },
  {
    id: 'CISA2-B13-024',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Subservice organization reports (SOC reports) address:',
    options: [
      'Only primary service provider',
      'Controls at organizations that subservice providers use',
      'Only internal controls',
      'Only financial controls'
    ],
    correctAnswer: 1,
    explanation: 'Subservice organization reports cover controls at vendors that the primary service provider relies on.',
    topic: 'Vendor Management',
    subtopic: 'Subservice Organizations'
  },
  {
    id: 'CISA2-B13-025',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Multi-sourcing strategies require:',
    options: [
      'Only one vendor',
      'Coordination among multiple vendors and clear integration responsibilities',
      'Identical service levels',
      'No governance'
    ],
    correctAnswer: 1,
    explanation: 'Multi-sourcing requires coordinating multiple vendors and clearly defining integration and responsibility boundaries.',
    topic: 'Vendor Management',
    subtopic: 'Multi-sourcing'
  },
  {
    id: 'CISA2-B13-026',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Shadow IT refers to:',
    options: [
      'Backup systems',
      'IT systems and solutions used without IT department knowledge or approval',
      'Disaster recovery sites',
      'Development environments'
    ],
    correctAnswer: 1,
    explanation: 'Shadow IT includes technology deployed by business units without formal IT knowledge, governance, or support.',
    topic: 'IT Governance',
    subtopic: 'Shadow IT'
  },
  {
    id: 'CISA2-B13-027',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'IT demand management:',
    options: [
      'Only limits requests',
      'Prioritizes and manages requests for IT services and resources',
      'Only tracks costs',
      'Only approves projects'
    ],
    correctAnswer: 1,
    explanation: 'Demand management prioritizes requests for IT services, balancing demands against available capacity.',
    topic: 'IT Management',
    subtopic: 'Demand Management'
  },
  {
    id: 'CISA2-B13-028',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'Succession planning for IT ensures:',
    options: [
      'Only management changes',
      'Continuity of critical IT capabilities through people transitions',
      'Only retention',
      'Only recruitment'
    ],
    correctAnswer: 1,
    explanation: 'Succession planning ensures critical IT roles can be filled when departures occur to maintain capabilities.',
    topic: 'IT Management',
    subtopic: 'HR Management'
  },
  {
    id: 'CISA2-B13-029',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Balanced scorecard for IT measures:',
    options: [
      'Only financial metrics',
      'Financial, customer, internal process, and learning/growth perspectives',
      'Only technical metrics',
      'Only efficiency'
    ],
    correctAnswer: 1,
    explanation: 'Balanced scorecard provides a holistic view across financial, customer, process, and learning dimensions.',
    topic: 'IT Governance',
    subtopic: 'Performance Measurement'
  },

  // ===========================================================================
  // DOMAIN 3: ISA, DEVELOPMENT AND IMPLEMENTATION (17 questions)
  // ===========================================================================
  
  {
    id: 'CISA3-B13-030',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Requirements traceability ensures:',
    options: [
      'Fewer requirements',
      'Requirements can be tracked through design, development, and testing',
      'Only high-level tracking',
      'Only change tracking'
    ],
    correctAnswer: 1,
    explanation: 'Traceability links requirements through all project phases to ensure complete implementation and testing.',
    topic: 'SDLC',
    subtopic: 'Requirements Management'
  },
  {
    id: 'CISA3-B13-031',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Design patterns in software development:',
    options: [
      'Are unique to each project',
      'Provide reusable solutions to common design problems',
      'Only apply to user interfaces',
      'Increase complexity unnecessarily'
    ],
    correctAnswer: 1,
    explanation: 'Design patterns are proven, reusable solutions to common software design problems.',
    topic: 'Development',
    subtopic: 'Design Patterns'
  },
  {
    id: 'CISA3-B13-032',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'API versioning helps:',
    options: [
      'Eliminate all changes',
      'Manage changes while maintaining backward compatibility',
      'Only internal systems',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'API versioning allows changes to be made while maintaining support for existing consumers.',
    topic: 'Development',
    subtopic: 'API Management'
  },
  {
    id: 'CISA3-B13-033',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Blue-green deployment strategy:',
    options: [
      'Deploys gradually',
      'Maintains two identical environments to enable zero-downtime deployment',
      'Only uses one environment',
      'Requires manual switchover'
    ],
    correctAnswer: 1,
    explanation: 'Blue-green has two identical environments; traffic switches from one to the other for zero-downtime releases.',
    topic: 'SDLC',
    subtopic: 'Deployment Strategies'
  },
  {
    id: 'CISA3-B13-034',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Canary releases:',
    options: [
      'Deploy to all users immediately',
      'Deploy to a small subset first to validate before full rollout',
      'Only test internally',
      'Never reach production'
    ],
    correctAnswer: 1,
    explanation: 'Canary releases deploy changes to a small user subset first to detect issues before broad deployment.',
    topic: 'SDLC',
    subtopic: 'Deployment Strategies'
  },
  {
    id: 'CISA3-B13-035',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Feature toggles enable:',
    options: [
      'Only security controls',
      'Releasing code with features that can be enabled/disabled without deployment',
      'Only testing',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'Feature toggles allow deploying code with features that can be enabled or disabled without redeployment.',
    topic: 'Development',
    subtopic: 'Feature Toggles'
  },
  {
    id: 'CISA3-B13-036',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Infrastructure as code (IaC):',
    options: [
      'Only documents infrastructure',
      'Manages infrastructure through code for automation and consistency',
      'Only monitors systems',
      'Only tracks costs'
    ],
    correctAnswer: 1,
    explanation: 'IaC manages infrastructure provisioning through version-controlled code for consistency and automation.',
    topic: 'Development',
    subtopic: 'IaC'
  },
  {
    id: 'CISA3-B13-037',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Immutable infrastructure means:',
    options: [
      'Systems are frequently patched',
      'Servers are replaced rather than modified when changes are needed',
      'Systems never change',
      'Only physical servers'
    ],
    correctAnswer: 1,
    explanation: 'Immutable infrastructure replaces instances rather than modifying them, ensuring consistent, known states.',
    topic: 'Development',
    subtopic: 'Immutable Infrastructure'
  },
  {
    id: 'CISA3-B13-038',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Fuzz testing:',
    options: [
      'Uses structured inputs',
      'Provides random or malformed inputs to discover vulnerabilities',
      'Only tests happy paths',
      'Only tests performance'
    ],
    correctAnswer: 1,
    explanation: 'Fuzz testing provides random, invalid, or unexpected data as input to discover security vulnerabilities.',
    topic: 'Testing',
    subtopic: 'Security Testing'
  },
  {
    id: 'CISA3-B13-039',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Contract testing for microservices verifies:',
    options: [
      'Legal contracts',
      'Service interfaces conform to agreed expectations between consumers and providers',
      'Only internal calls',
      'Only security'
    ],
    correctAnswer: 1,
    explanation: 'Contract testing verifies that service interfaces conform to expectations defined between service providers and consumers.',
    topic: 'Testing',
    subtopic: 'Contract Testing'
  },
  {
    id: 'CISA3-B13-040',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Chaos engineering:',
    options: [
      'Creates system disorder',
      'Intentionally introduces failures to test resilience',
      'Only applies to testing',
      'Avoids production'
    ],
    correctAnswer: 1,
    explanation: 'Chaos engineering deliberately introduces failures to discover weaknesses and improve system resilience.',
    topic: 'Testing',
    subtopic: 'Resilience Testing'
  },
  {
    id: 'CISA3-B13-041',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'DevSecOps integrates security by:',
    options: [
      'Adding security at the end',
      'Embedding security practices throughout the development lifecycle',
      'Only using security tools',
      'Only training developers'
    ],
    correctAnswer: 1,
    explanation: 'DevSecOps embeds security practices, tools, and responsibilities throughout the entire development lifecycle.',
    topic: 'Secure Development',
    subtopic: 'DevSecOps'
  },
  {
    id: 'CISA3-B13-042',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Secrets management in CI/CD:',
    options: [
      'Stores secrets in code',
      'Securely handles credentials and keys used in deployment pipelines',
      'Only uses environment variables',
      'Only applies to production'
    ],
    correctAnswer: 1,
    explanation: 'Secrets management securely stores and injects credentials, keys, and tokens used by deployment pipelines.',
    topic: 'Secure Development',
    subtopic: 'Secrets Management'
  },
  {
    id: 'CISA3-B13-043',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Container security scanning should check:',
    options: [
      'Only running containers',
      'Base images, dependencies, and configurations for vulnerabilities',
      'Only network traffic',
      'Only resource usage'
    ],
    correctAnswer: 1,
    explanation: 'Container scanning examines images, dependencies, and configurations for vulnerabilities and misconfigurations.',
    topic: 'Secure Development',
    subtopic: 'Container Security'
  },
  {
    id: 'CISA3-B13-044',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Data migration testing should verify:',
    options: [
      'Only speed',
      'Completeness, accuracy, and integrity of migrated data',
      'Only new features',
      'Only user acceptance'
    ],
    correctAnswer: 1,
    explanation: 'Migration testing verifies data is completely and accurately transferred with integrity maintained.',
    topic: 'Implementation',
    subtopic: 'Data Migration'
  },
  {
    id: 'CISA3-B13-045',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'Post-implementation review should assess:',
    options: [
      'Only cost overruns',
      'Achievement of objectives, lessons learned, and benefits realization',
      'Only technical issues',
      'Only schedule variance'
    ],
    correctAnswer: 1,
    explanation: 'PIR evaluates objective achievement, captures lessons learned, and begins tracking benefit realization.',
    topic: 'Implementation',
    subtopic: 'Post-Implementation Review'
  },
  {
    id: 'CISA3-B13-046',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'Technical documentation should be:',
    options: [
      'Created only at project end',
      'Maintained throughout the lifecycle and kept current',
      'Optional for small projects',
      'Only for developers'
    ],
    correctAnswer: 1,
    explanation: 'Technical documentation should be created during development and maintained current throughout the system lifecycle.',
    topic: 'SDLC',
    subtopic: 'Documentation'
  },

  // ===========================================================================
  // DOMAIN 4: IS OPERATIONS AND BUSINESS RESILIENCE (17 questions)
  // ===========================================================================
  
  {
    id: 'CISA4-B13-047',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Known error database (KEDB) contains:',
    options: [
      'Only open incidents',
      'Documented problems with known workarounds or solutions',
      'Only new issues',
      'Only closed tickets'
    ],
    correctAnswer: 1,
    explanation: 'KEDB contains documented known errors with their workarounds or solutions to speed resolution.',
    topic: 'IT Service Management',
    subtopic: 'Problem Management'
  },
  {
    id: 'CISA4-B13-048',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Standard changes differ from normal changes because:',
    options: [
      'They require more approval',
      'They are pre-approved, low-risk changes following defined procedures',
      'They are more complex',
      'They skip testing'
    ],
    correctAnswer: 1,
    explanation: 'Standard changes are pre-approved, routine changes with known, low risk executed via established procedures.',
    topic: 'IT Service Management',
    subtopic: 'Change Management'
  },
  {
    id: 'CISA4-B13-049',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Configuration baseline captures:',
    options: [
      'Only hardware',
      'Approved configuration state at a point in time for comparison',
      'Only software versions',
      'Only network settings'
    ],
    correctAnswer: 1,
    explanation: 'Configuration baselines document the approved state to detect unauthorized changes or drift.',
    topic: 'IT Service Management',
    subtopic: 'Configuration Management'
  },
  {
    id: 'CISA4-B13-050',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Release and deployment management ensures:',
    options: [
      'Only fast deployment',
      'Controlled, repeatable deployment while protecting service quality',
      'Only rollback capability',
      'Only documentation'
    ],
    correctAnswer: 1,
    explanation: 'Release management provides controlled, repeatable deployment processes that protect live service quality.',
    topic: 'IT Service Management',
    subtopic: 'Release Management'
  },
  {
    id: 'CISA4-B13-051',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Knowledge management in IT operations:',
    options: [
      'Only stores documents',
      'Captures, organizes, and shares operational knowledge for efficiency',
      'Only applies to support',
      'Only uses databases'
    ],
    correctAnswer: 1,
    explanation: 'Knowledge management captures and shares operational knowledge to improve efficiency and consistency.',
    topic: 'IT Service Management',
    subtopic: 'Knowledge Management'
  },
  {
    id: 'CISA4-B13-052',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Capacity on demand provides:',
    options: [
      'Fixed capacity always',
      'Ability to quickly scale resources when needed',
      'Only annual planning',
      'Only cost reduction'
    ],
    correctAnswer: 1,
    explanation: 'Capacity on demand enables rapid scaling of resources to meet changing requirements.',
    topic: 'IT Operations',
    subtopic: 'Capacity Management'
  },
  {
    id: 'CISA4-B13-053',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Performance trending analysis:',
    options: [
      'Only shows current state',
      'Identifies patterns to predict future capacity needs',
      'Only tracks incidents',
      'Only measures availability'
    ],
    correctAnswer: 1,
    explanation: 'Trending analysis identifies patterns in performance data to anticipate future capacity requirements.',
    topic: 'IT Operations',
    subtopic: 'Performance Management'
  },
  {
    id: 'CISA4-B13-054',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Mean time between failures (MTBF) measures:',
    options: [
      'Recovery time',
      'Average operational time between component failures',
      'Detection time',
      'Repair time'
    ],
    correctAnswer: 1,
    explanation: 'MTBF measures the average time a component operates before failing, indicating reliability.',
    topic: 'IT Operations',
    subtopic: 'Reliability Metrics'
  },
  {
    id: 'CISA4-B13-055',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Log aggregation enables:',
    options: [
      'Only storage reduction',
      'Centralized collection and analysis of logs from multiple sources',
      'Only compliance',
      'Only backup'
    ],
    correctAnswer: 1,
    explanation: 'Log aggregation centralizes logs from multiple sources for unified analysis, correlation, and retention.',
    topic: 'IT Operations',
    subtopic: 'Logging'
  },
  {
    id: 'CISA4-B13-056',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Geographic redundancy for DR should consider:',
    options: [
      'Only distance',
      'Distance, common risks, latency, and legal/regulatory requirements',
      'Only cost',
      'Only network speed'
    ],
    correctAnswer: 1,
    explanation: 'Geographic redundancy planning considers distance, shared risk factors, latency, and jurisdictional requirements.',
    topic: 'Business Continuity',
    subtopic: 'Geographic Redundancy'
  },
  {
    id: 'CISA4-B13-057',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Crisis communication plans should:',
    options: [
      'Only address media',
      'Define stakeholders, messages, channels, and responsibilities during crises',
      'Only use email',
      'Only cover internal staff'
    ],
    correctAnswer: 1,
    explanation: 'Crisis communication plans define who communicates what, to whom, through which channels during disruptions.',
    topic: 'Business Continuity',
    subtopic: 'Crisis Communications'
  },
  {
    id: 'CISA4-B13-058',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Third-party BC/DR assessment verifies:',
    options: [
      'Only SLA compliance',
      'Vendors can support organization continuity requirements',
      'Only financial stability',
      'Only technical capabilities'
    ],
    correctAnswer: 1,
    explanation: 'Third-party BC/DR assessment ensures vendors have adequate continuity capabilities to support your requirements.',
    topic: 'Business Continuity',
    subtopic: 'Vendor BC'
  },
  {
    id: 'CISA4-B13-059',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Data replication methods include:',
    options: [
      'Only backup tape',
      'Synchronous, asynchronous, and semi-synchronous options',
      'Only cloud backup',
      'Only manual copying'
    ],
    correctAnswer: 1,
    explanation: 'Replication options include synchronous (immediate), asynchronous (delayed), and semi-synchronous approaches.',
    topic: 'Business Continuity',
    subtopic: 'Data Replication'
  },
  {
    id: 'CISA4-B13-060',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Backup verification testing should:',
    options: [
      'Only check file existence',
      'Perform actual data restores to confirm recoverability',
      'Only verify checksums',
      'Only check storage'
    ],
    correctAnswer: 1,
    explanation: 'Backup testing should include actual restores to confirm data can be successfully recovered when needed.',
    topic: 'Business Continuity',
    subtopic: 'Backup Testing'
  },
  {
    id: 'CISA4-B13-061',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Environmental monitoring in data centers tracks:',
    options: [
      'Only temperature',
      'Temperature, humidity, water, power, and other conditions',
      'Only personnel',
      'Only security'
    ],
    correctAnswer: 1,
    explanation: 'Environmental monitoring tracks temperature, humidity, water detection, power quality, and other conditions.',
    topic: 'IT Operations',
    subtopic: 'Environmental Controls'
  },
  {
    id: 'CISA4-B13-062',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'hard',
    question: 'Scheduled maintenance windows should be:',
    options: [
      'Whenever convenient',
      'Planned during low-impact periods with appropriate communication',
      'During business hours',
      'Without notification'
    ],
    correctAnswer: 1,
    explanation: 'Maintenance windows should be scheduled for minimal business impact with advance stakeholder notification.',
    topic: 'IT Operations',
    subtopic: 'Maintenance'
  },
  {
    id: 'CISA4-B13-063',
    courseId: 'cisa',
    section: 'CISA4',
    difficulty: 'medium',
    question: 'Patch management prioritization should consider:',
    options: [
      'Only vendor release date',
      'Criticality, exploitability, business impact, and exposure',
      'Only system type',
      'Only ease of deployment'
    ],
    correctAnswer: 1,
    explanation: 'Patch prioritization considers vulnerability severity, exploitability, business criticality, and system exposure.',
    topic: 'IT Operations',
    subtopic: 'Patch Management'
  },

  // ===========================================================================
  // DOMAIN 5: PROTECTION OF INFORMATION ASSETS (18 questions)
  // ===========================================================================
  
  {
    id: 'CISA5-B13-064',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Defense in depth provides:',
    options: [
      'Single strong control',
      'Multiple layers of protection so failure of one does not compromise security',
      'Only network security',
      'Only perimeter defense'
    ],
    correctAnswer: 1,
    explanation: 'Defense in depth uses multiple layers of controls so no single failure compromises overall security.',
    topic: 'Security Management',
    subtopic: 'Defense in Depth'
  },
  {
    id: 'CISA5-B13-065',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security control testing should:',
    options: [
      'Occur only during audits',
      'Be ongoing to verify controls remain effective',
      'Test only technical controls',
      'Occur only after incidents'
    ],
    correctAnswer: 1,
    explanation: 'Control testing should be ongoing to provide assurance that controls continue to operate effectively.',
    topic: 'Security Management',
    subtopic: 'Control Testing'
  },
  {
    id: 'CISA5-B13-066',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Privileged access management (PAM) controls:',
    options: [
      'Only user accounts',
      'Access to sensitive systems and elevated privileges',
      'Only group memberships',
      'Only password resets'
    ],
    correctAnswer: 1,
    explanation: 'PAM manages and monitors privileged access to protect sensitive systems and data.',
    topic: 'Access Control',
    subtopic: 'Privileged Access'
  },
  {
    id: 'CISA5-B13-067',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Just-in-time (JIT) access:',
    options: [
      'Provides permanent privileges',
      'Grants access only when needed and revokes when no longer required',
      'Only applies to administrators',
      'Only uses service accounts'
    ],
    correctAnswer: 1,
    explanation: 'JIT access provides privileges only when needed for a specific task and removes them after completion.',
    topic: 'Access Control',
    subtopic: 'JIT Access'
  },
  {
    id: 'CISA5-B13-068',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Security information and event management (SIEM) provides:',
    options: [
      'Only log storage',
      'Collection, correlation, and analysis of security events across sources',
      'Only alerting',
      'Only reporting'
    ],
    correctAnswer: 1,
    explanation: 'SIEM collects, correlates, and analyzes security events from multiple sources for detection and response.',
    topic: 'Security Operations',
    subtopic: 'SIEM'
  },
  {
    id: 'CISA5-B13-069',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Security orchestration, automation, and response (SOAR):',
    options: [
      'Only automates alerts',
      'Automates security operations and incident response workflows',
      'Only manages tickets',
      'Only reports metrics'
    ],
    correctAnswer: 1,
    explanation: 'SOAR automates and orchestrates security operations and incident response for faster, consistent handling.',
    topic: 'Security Operations',
    subtopic: 'SOAR'
  },
  {
    id: 'CISA5-B13-070',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Threat intelligence provides:',
    options: [
      'Only technical indicators',
      'Contextual information about threats to inform security decisions',
      'Only vulnerability data',
      'Only compliance data'
    ],
    correctAnswer: 1,
    explanation: 'Threat intelligence provides context about threats, actors, and tactics to inform security decisions.',
    topic: 'Security Operations',
    subtopic: 'Threat Intelligence'
  },
  {
    id: 'CISA5-B13-071',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Deception technologies like honeypots:',
    options: [
      'Replace real systems',
      'Attract and detect attackers while gathering intelligence',
      'Only test defenses',
      'Only train users'
    ],
    correctAnswer: 1,
    explanation: 'Deception technologies lure attackers to decoy systems to detect intrusions and gather intelligence.',
    topic: 'Security Operations',
    subtopic: 'Deception'
  },
  {
    id: 'CISA5-B13-072',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Endpoint detection and response (EDR):',
    options: [
      'Only prevents malware',
      'Monitors endpoints and provides investigation and response capabilities',
      'Only manages patches',
      'Only encrypts data'
    ],
    correctAnswer: 1,
    explanation: 'EDR monitors endpoint activity and provides detection, investigation, and response capabilities.',
    topic: 'Security Operations',
    subtopic: 'EDR'
  },
  {
    id: 'CISA5-B13-073',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Zero-day vulnerabilities:',
    options: [
      'Are always patched immediately',
      'Have no vendor patch available when first exploited',
      'Are not serious',
      'Only affect old systems'
    ],
    correctAnswer: 1,
    explanation: 'Zero-days are vulnerabilities without patches when initially discovered or exploited.',
    topic: 'Security Threats',
    subtopic: 'Zero-Day'
  },
  {
    id: 'CISA5-B13-074',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Man-in-the-middle attacks intercept:',
    options: [
      'Only email',
      'Communications between parties without their knowledge',
      'Only passwords',
      'Only files'
    ],
    correctAnswer: 1,
    explanation: 'MITM attacks intercept and potentially modify communications between parties without their awareness.',
    topic: 'Security Threats',
    subtopic: 'Network Attacks'
  },
  {
    id: 'CISA5-B13-075',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Credential stuffing uses:',
    options: [
      'Random passwords',
      'Breached credentials from one site to attack other accounts',
      'Only weak passwords',
      'Only admin accounts'
    ],
    correctAnswer: 1,
    explanation: 'Credential stuffing uses stolen username/password combinations from breaches to attempt access on other sites.',
    topic: 'Security Threats',
    subtopic: 'Credential Attacks'
  },
  {
    id: 'CISA5-B13-076',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Security awareness training should:',
    options: [
      'Occur once at hire',
      'Be ongoing and tailored to current threats and roles',
      'Only cover policies',
      'Only use videos'
    ],
    correctAnswer: 1,
    explanation: 'Awareness training should be ongoing, address current threats, and be relevant to user roles.',
    topic: 'Security Management',
    subtopic: 'Awareness'
  },
  {
    id: 'CISA5-B13-077',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Phishing simulations:',
    options: [
      'Are unethical',
      'Test and reinforce user awareness through controlled exercises',
      'Only track success rates',
      'Only punish failures'
    ],
    correctAnswer: 1,
    explanation: 'Phishing simulations test user awareness and provide training opportunities through controlled exercises.',
    topic: 'Security Management',
    subtopic: 'Phishing Tests'
  },
  {
    id: 'CISA5-B13-078',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'DLP (data loss prevention) controls:',
    options: [
      'Only encrypt data',
      'Detect and prevent unauthorized data transfer',
      'Only monitor traffic',
      'Only block email'
    ],
    correctAnswer: 1,
    explanation: 'DLP identifies, monitors, and prevents unauthorized transmission or disclosure of sensitive data.',
    topic: 'Data Security',
    subtopic: 'DLP'
  },
  {
    id: 'CISA5-B13-079',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Rights management (IRM/DRM) enforces:',
    options: [
      'Only file access',
      'Usage controls on content regardless of location',
      'Only printing restrictions',
      'Only viewing time'
    ],
    correctAnswer: 1,
    explanation: 'Rights management enforces usage restrictions on content (view, edit, print, forward) wherever it travels.',
    topic: 'Data Security',
    subtopic: 'Rights Management'
  },
  {
    id: 'CISA5-B13-080',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Privacy impact assessments (PIA) evaluate:',
    options: [
      'Only compliance',
      'Privacy risks of processing personal data and mitigation measures',
      'Only technical controls',
      'Only policy compliance'
    ],
    correctAnswer: 1,
    explanation: 'PIAs assess privacy risks associated with personal data processing and identify mitigation measures.',
    topic: 'Privacy',
    subtopic: 'Privacy Assessment'
  },
  {
    id: 'CISA5-B13-081',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Data subject access requests (DSAR) require:',
    options: [
      'Denial by default',
      'Providing individuals access to their personal data upon request',
      'Only administrative approval',
      'Only legal review'
    ],
    correctAnswer: 1,
    explanation: 'DSARs give individuals the right to obtain copies of their personal data held by organizations.',
    topic: 'Privacy',
    subtopic: 'Data Subject Rights'
  }
];

// Export domain-specific question arrays
export const CISA1_QUESTIONS_BATCH13 = ALL_BATCH13.filter(q => q.section === 'CISA1');
export const CISA2_QUESTIONS_BATCH13 = ALL_BATCH13.filter(q => q.section === 'CISA2');
export const CISA3_QUESTIONS_BATCH13 = ALL_BATCH13.filter(q => q.section === 'CISA3');
export const CISA4_QUESTIONS_BATCH13 = ALL_BATCH13.filter(q => q.section === 'CISA4');
export const CISA5_QUESTIONS_BATCH13 = ALL_BATCH13.filter(q => q.section === 'CISA5');
