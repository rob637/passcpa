/**
 * CIA Part 2: Practice of Internal Auditing - Additional Questions (Batch 2)
 * Questions CIA2-171 through CIA2-270
 * 
 * Domain breakdown:
 * - Domain I: Managing the Internal Audit Activity (20%)
 * - Domain II: Planning the Engagement (20%)
 * - Domain III: Performing the Engagement (40%)
 * - Domain IV: Communicating Results and Monitoring Progress (20%)
 */

import { Question } from '../../../types';

export const CIA2_QUESTIONS_BATCH3: Question[] = [
  // ============================================================================
  // DOMAIN I: MANAGING THE INTERNAL AUDIT ACTIVITY (20%)
  // ============================================================================
  
  {
    id: 'cia2-171',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A risk-based audit plan prioritizes audits based on:',
    options: [
      'Historical tradition',
      'Assessment of risks to organizational objectives',
      'Staff preferences',
      'Alphabetical order of departments'
    ],
    correctAnswer: 1,
    explanation: 'Risk-based planning allocates audit resources to areas with the highest risk to organizational objectives, ensuring the most critical areas receive attention.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Risk-Based Planning',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-172',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When assessing risk for audit planning, the CAE should consider:',
    options: [
      'Only financial statement risks',
      'Strategic, operational, compliance, and reporting risks across the organization',
      'Only risks identified by management',
      'Only risks from prior audits'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive risk assessment considers all categories of risk that could affect the organization\'s ability to achieve its objectives, not just financial risks.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Risk Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-173',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The internal audit budget should be:',
    options: [
      'As low as possible',
      'Sufficient to accomplish the approved audit plan',
      'Equal to the prior year',
      'Set by the CFO only'
    ],
    correctAnswer: 1,
    explanation: 'The budget should provide resources sufficient to accomplish the approved audit plan and meet internal audit\'s responsibilities.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Budgeting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-174',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Developing audit staff competencies is:',
    options: [
      'Optional for experienced staff',
      'An ongoing responsibility of the CAE',
      'Only the individual\'s responsibility',
      'Only needed for new hires'
    ],
    correctAnswer: 1,
    explanation: 'The CAE must ensure staff have or develop the knowledge, skills, and competencies needed through hiring, training, and development programs.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Staff Development',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-175',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Stakeholder relationship management for internal audit includes:',
    options: [
      'Only formal report distribution',
      'Building trust and understanding through regular communication',
      'Only year-end presentations',
      'Avoiding management contact'
    ],
    correctAnswer: 1,
    explanation: 'Effective stakeholder management involves ongoing communication, building trust, understanding stakeholder needs, and demonstrating value through all interactions.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Stakeholder Relations',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-176',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Audit methodology should be:',
    options: [
      'Completely flexible with no standards',
      'Documented and consistently applied while allowing professional judgment',
      'Identical for all engagements',
      'Changed for each audit'
    ],
    correctAnswer: 1,
    explanation: 'Methodology should be documented, provide consistency in quality and approach, while allowing flexibility for professional judgment based on engagement circumstances.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Methodology',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-177',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Technology in internal audit can be used for:',
    options: [
      'Only word processing',
      'Workpaper management, data analytics, continuous auditing, and collaboration',
      'Only email communication',
      'Only report formatting'
    ],
    correctAnswer: 1,
    explanation: 'Technology enhances audit efficiency and effectiveness through workpaper automation, data analytics, continuous auditing tools, and collaboration platforms.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Technology',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-178',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Engagement scheduling should consider:',
    options: [
      'Only auditor vacation schedules',
      'Risk priorities, staff availability, and auditee timing constraints',
      'Only calendar year-end',
      'Only external auditor schedules'
    ],
    correctAnswer: 1,
    explanation: 'Scheduling balances risk priorities with practical considerations including staff availability, auditee operations, and coordination with other assurance providers.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Scheduling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-179',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit tools and templates promote:',
    options: [
      'Inflexibility',
      'Consistency, efficiency, and quality in audit work',
      'Elimination of professional judgment',
      'Faster completion regardless of quality'
    ],
    correctAnswer: 1,
    explanation: 'Standardized tools and templates promote consistency, efficiency, and quality while not eliminating the need for professional judgment.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Tools',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-180',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When co-sourcing internal audit activities, the CAE must:',
    options: [
      'Transfer all quality responsibility to the co-sourcing provider',
      'Maintain overall responsibility for quality and conformance with Standards',
      'Avoid oversight of co-sourced work',
      'Only use co-sourcing for non-IT audits'
    ],
    correctAnswer: 1,
    explanation: 'Even when using external resources, the CAE retains responsibility for all aspects of quality and ensuring work conforms with the Standards.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Co-Sourcing',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // DOMAIN II: PLANNING THE ENGAGEMENT (20%)
  // ============================================================================
  
  {
    id: 'cia2-181',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Engagement planning documentation should include:',
    options: [
      'Only the final report',
      'Objectives, scope, resource allocation, and work program',
      'Only staff assignments',
      'Only timing information'
    ],
    correctAnswer: 1,
    explanation: 'Planning documentation captures key decisions about objectives, scope, timing, resource allocation, and the work program guiding the engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Planning Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-182',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Materiality in engagement planning helps determine:',
    options: [
      'Staff assignments only',
      'The nature, timing, and extent of audit procedures',
      'Report formatting only',
      'Interview questions only'
    ],
    correctAnswer: 1,
    explanation: 'Materiality judgments influence what is tested, how extensively, and when, helping focus resources on areas that could significantly affect objectives.',
    topic: 'Planning the Engagement',
    subtopic: 'Materiality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-183',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Understanding the business during planning includes:',
    options: [
      'Only reading prior audit reports',
      'Learning objectives, processes, risks, controls, and key performance indicators',
      'Only interviewing the auditee',
      'Only reviewing organization charts'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive business understanding encompasses objectives, strategies, processes, inherent risks, controls, performance measures, and industry/regulatory context.',
    topic: 'Planning the Engagement',
    subtopic: 'Business Understanding',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-184',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Prior audit results are useful in planning for:',
    options: [
      'Copying the same procedures',
      'Identifying recurring issues and assessing changes since the last review',
      'Avoiding new areas',
      'Reducing current year scope'
    ],
    correctAnswer: 1,
    explanation: 'Prior audits provide insights into previous findings, remediation status, changes in the area, and issues that may warrant continued attention.',
    topic: 'Planning the Engagement',
    subtopic: 'Prior Audit Review',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-185',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Technology considerations in engagement planning include:',
    options: [
      'Only hardware specifications',
      'Systems involved, data availability, and computer-assisted audit technique opportunities',
      'Only software versions',
      'Only IT department involvement'
    ],
    correctAnswer: 1,
    explanation: 'Planning should consider IT systems in scope, data access and extraction, opportunities for CAATs and analytics, and any technology-specific risks.',
    topic: 'Planning the Engagement',
    subtopic: 'Technology in Planning',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-186',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Risk and control matrices (RCMs) are used to:',
    options: [
      'Replace all other planning documents',
      'Document key risks, related controls, and planned testing approach',
      'Only track time spent',
      'Only list interview questions'
    ],
    correctAnswer: 1,
    explanation: 'RCMs link identified risks to mitigating controls and planned audit procedures, providing a structured approach to ensuring key risks are addressed.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk and Control Matrix',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-187',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Establishing a time budget for an engagement helps:',
    options: [
      'Only track costs',
      'Plan resource allocation and monitor efficiency',
      'Complete work with minimum effort',
      'Reduce quality standards'
    ],
    correctAnswer: 1,
    explanation: 'Time budgets facilitate resource planning, support project management, enable efficiency monitoring, and help identify when engagements are off track.',
    topic: 'Planning the Engagement',
    subtopic: 'Time Budgeting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-188',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A planning meeting with the auditee typically covers:',
    options: [
      'Final audit conclusions',
      'Engagement objectives, scope, timing, and information needs',
      'Corrective action plans',
      'Performance evaluations'
    ],
    correctAnswer: 1,
    explanation: 'Opening meetings establish expectations, explain objectives and scope, discuss timing and logistics, and identify information and contacts needed.',
    topic: 'Planning the Engagement',
    subtopic: 'Auditee Communication',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-189',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Fraud risk assessment during engagement planning considers:',
    options: [
      'Only prior fraud incidents',
      'Fraud risk factors, incentives, opportunities, and rationalization',
      'Only financial statement fraud',
      'Only external fraud'
    ],
    correctAnswer: 1,
    explanation: 'Fraud risk assessment evaluates the fraud triangle elements (pressure/incentive, opportunity, rationalization) and whether controls address key fraud risks.',
    topic: 'Planning the Engagement',
    subtopic: 'Fraud Risk',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-190',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When the engagement scope changes during fieldwork, the auditor should:',
    options: [
      'Ignore the original scope',
      'Document the change, assess impact, and communicate appropriately',
      'Continue without documentation',
      'Immediately end the engagement'
    ],
    correctAnswer: 1,
    explanation: 'Scope changes should be documented with rationale, impact assessed on resources and timeline, and communicated to appropriate parties including the engagement supervisor.',
    topic: 'Planning the Engagement',
    subtopic: 'Scope Changes',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // DOMAIN III: PERFORMING THE ENGAGEMENT (40%)
  // ============================================================================
  
  {
    id: 'cia2-191',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Vouching is an audit procedure that:',
    options: [
      'Traces from source documents to records',
      'Traces from recorded transactions back to supporting source documents',
      'Only involves interviews',
      'Only involves observation'
    ],
    correctAnswer: 1,
    explanation: 'Vouching traces recorded transactions backward to source documents and authorization, testing that recorded items actually occurred (existence/occurrence).',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-192',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Tracing is an audit procedure that:',
    options: [
      'Traces from records to source documents',
      'Follows source documents forward to ensure they are properly recorded',
      'Tests segregation of duties',
      'Only tests physical assets'
    ],
    correctAnswer: 1,
    explanation: 'Tracing follows source documents forward to records, testing that transactions that occurred are properly captured in the records (completeness).',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-193',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Scanning as an audit technique involves:',
    options: [
      'Using document scanners',
      'Rapid review of data to identify unusual items for further investigation',
      'Only computerized analysis',
      'Only physical inspection'
    ],
    correctAnswer: 1,
    explanation: 'Scanning involves quickly reviewing large amounts of data or transactions to identify unusual items, anomalies, or outliers warranting further investigation.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-194',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Physical examination provides evidence about:',
    options: [
      'Only documentation',
      'Existence and condition of tangible assets',
      'Only management assertions',
      'Only compliance with policies'
    ],
    correctAnswer: 1,
    explanation: 'Physical examination provides evidence about the existence, condition, and quantity of tangible assets like inventory, equipment, and cash.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-195',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Reconciliation as an audit procedure:',
    options: [
      'Only identifies differences',
      'Compares independent records or data sets and explains differences',
      'Only proves accuracy',
      'Only applies to bank accounts'
    ],
    correctAnswer: 1,
    explanation: 'Reconciliation compares two independent sources of information (like bank statements to books) and identifies, investigates, and explains any differences.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-196',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Cut-off testing ensures that:',
    options: [
      'All testing is completed',
      'Transactions are recorded in the proper period',
      'Audit deadlines are met',
      'Only year-end transactions are reviewed'
    ],
    correctAnswer: 1,
    explanation: 'Cut-off testing verifies that transactions around period-end are recorded in the correct accounting period, testing proper timing of revenue and expense recognition.',
    topic: 'Performing the Engagement',
    subtopic: 'Substantive Testing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-197',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Ratio analysis in auditing compares:',
    options: [
      'Only prior year data',
      'Related data to identify unusual relationships or trends',
      'Only budget to actual',
      'Only industry standards'
    ],
    correctAnswer: 1,
    explanation: 'Ratio analysis examines relationships between related data elements to identify unusual patterns that may indicate errors, efficiency issues, or areas requiring investigation.',
    topic: 'Performing the Engagement',
    subtopic: 'Analytical Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-198',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Trend analysis involves:',
    options: [
      'Only comparing two periods',
      'Analyzing data over multiple periods to identify patterns and anomalies',
      'Only forecasting future results',
      'Only reviewing management dashboards'
    ],
    correctAnswer: 1,
    explanation: 'Trend analysis examines data across multiple periods to identify patterns, changes, and anomalies that may warrant investigation.',
    topic: 'Performing the Engagement',
    subtopic: 'Analytical Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-199',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Discovery sampling is appropriate when:',
    options: [
      'Estimating population characteristics',
      'Searching for rare but critical occurrences like fraud',
      'Testing operating effectiveness',
      'Projecting monetary errors'
    ],
    correctAnswer: 1,
    explanation: 'Discovery sampling is designed to detect at least one occurrence of a deviation when the expected occurrence rate is very low, such as fraud or serious violations.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-200',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Stop-or-go sampling is used to:',
    options: [
      'Always examine the entire population',
      'Potentially reduce sample size if few deviations are found in initial samples',
      'Eliminate all sampling risk',
      'Test only high-value items'
    ],
    correctAnswer: 1,
    explanation: 'Stop-or-go (sequential) sampling allows the auditor to assess results in stages, potentially stopping with a smaller sample if initial results indicate the deviation rate is low.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-201',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Block sampling selects:',
    options: [
      'Random items throughout the population',
      'Consecutive items within a defined time period or sequence',
      'Only unusual items',
      'Statistically representative items'
    ],
    correctAnswer: 1,
    explanation: 'Block sampling selects contiguous items (like all transactions from one week). It may be efficient but must be used carefully as results may not represent the entire population.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-202',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Haphazard sampling:',
    options: [
      'Provides statistical confidence levels',
      'Selects items without specific structure or random selection',
      'Is the same as random sampling',
      'Always covers the entire population'
    ],
    correctAnswer: 1,
    explanation: 'Haphazard sampling selects items without a structured methodology. While convenient, it provides less assurance than random sampling and cannot be statistically projected.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-203',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Confidence level in sampling refers to:',
    options: [
      'Auditor\'s experience level',
      'The probability that the sample results reflect the population',
      'Management\'s opinion of audit quality',
      'The number of items tested'
    ],
    correctAnswer: 1,
    explanation: 'Confidence level is the statistical probability that the sample results are representative of the population, expressed as a percentage (e.g., 95% confidence).',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-204',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Precision in sampling:',
    options: [
      'Is the same as confidence level',
      'Is the range around the sample estimate within which the population value is expected to fall',
      'Only applies to monetary sampling',
      'Is determined after sampling'
    ],
    correctAnswer: 1,
    explanation: 'Precision (allowance for sampling risk) is the interval around the sample result within which the true population value is expected to fall at a given confidence level.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-205',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Increasing sample size has what effect on sampling risk?',
    options: [
      'Increases sampling risk',
      'Decreases sampling risk',
      'No effect on sampling risk',
      'Eliminates non-sampling risk'
    ],
    correctAnswer: 1,
    explanation: 'Larger sample sizes reduce sampling risk because results are more likely to be representative of the population as more items are tested.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling Risk',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-206',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Non-sampling risk results from:',
    options: [
      'Sample size being too small',
      'Human errors such as misinterpreting evidence or using inappropriate procedures',
      'Population characteristics',
      'Statistical variability'
    ],
    correctAnswer: 1,
    explanation: 'Non-sampling risk arises from human errors: using wrong procedures, misinterpreting results, or failing to recognize deviations. It exists regardless of sample size.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling Risk',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-207',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Embedded audit modules (EAMs) are:',
    options: [
      'External audit tools only',
      'Audit routines programmed into the client\'s system for ongoing testing',
      'Manual audit procedures',
      'Training modules for auditors'
    ],
    correctAnswer: 1,
    explanation: 'EAMs are programmed into application systems to continuously monitor transactions, identify exceptions, and capture audit evidence in real-time.',
    topic: 'Performing the Engagement',
    subtopic: 'Computer-Assisted Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-208',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Snapshots in IT auditing capture:',
    options: [
      'Only screen displays',
      'System data and transaction processing details at a specific point',
      'Only user photographs',
      'Only backup copies'
    ],
    correctAnswer: 1,
    explanation: 'Snapshot captures data as it flows through key processing points, preserving information about transaction processing for audit examination.',
    topic: 'Performing the Engagement',
    subtopic: 'Computer-Assisted Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-209',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Benford\'s Law analysis:',
    options: [
      'Is a legal requirement',
      'Tests whether digit frequency patterns in data match expected statistical distributions',
      'Only applies to bank accounts',
      'Tests digital signatures'
    ],
    correctAnswer: 1,
    explanation: 'Benford\'s Law predicts the frequency distribution of first digits in naturally occurring numbers. Deviations may indicate data manipulation or fraud.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-210',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Data mining in internal auditing helps identify:',
    options: [
      'Only mineral deposits',
      'Patterns, anomalies, and relationships in large data sets',
      'Only employee information',
      'Only financial data'
    ],
    correctAnswer: 1,
    explanation: 'Data mining uses statistical and database techniques to discover hidden patterns, relationships, and anomalies in large volumes of data.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-211',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Exception testing focuses on:',
    options: [
      'Only positive results',
      'Transactions or items that deviate from expected parameters',
      'Only summary-level data',
      'Only approved transactions'
    ],
    correctAnswer: 1,
    explanation: 'Exception testing identifies items that fall outside expected parameters, thresholds, or rules, highlighting potential errors or policy violations for investigation.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-212',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Duplicate testing in data analytics looks for:',
    options: [
      'Only backup copies',
      'Records with identical or suspiciously similar characteristics that may indicate errors or fraud',
      'Only consecutive numbers',
      'Only matching addresses'
    ],
    correctAnswer: 1,
    explanation: 'Duplicate testing identifies potential duplicate payments, entries, or records that may indicate errors, fraud, or control weaknesses.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-213',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Gap testing verifies:',
    options: [
      'Physical gaps in inventory storage',
      'Sequential completeness by identifying missing numbers in a sequence',
      'Differences between teams',
      'Report formatting consistency'
    ],
    correctAnswer: 1,
    explanation: 'Gap testing checks sequences (check numbers, purchase orders) for missing items that may indicate lost, stolen, or unrecorded transactions.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-214',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Workpaper review serves to:',
    options: [
      'Only satisfy regulatory requirements',
      'Ensure quality, accuracy, and proper support for conclusions',
      'Create additional documentation',
      'Delay report issuance'
    ],
    correctAnswer: 1,
    explanation: 'Workpaper review by supervisors ensures work was performed properly, evidence supports conclusions, and quality standards are met before finalizing the engagement.',
    topic: 'Performing the Engagement',
    subtopic: 'Supervision',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-215',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Working papers should be organized to:',
    options: [
      'Maximize paper usage',
      'Facilitate review and provide a logical flow of evidence supporting conclusions',
      'Impress management',
      'Create the longest possible files'
    ],
    correctAnswer: 1,
    explanation: 'Workpaper organization should facilitate review by providing logical structure and clear audit trail from objectives through evidence to conclusions.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-216',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Tick marks in working papers:',
    options: [
      'Are decorative elements',
      'Provide standardized symbols indicating work performed and results',
      'Replace narrative explanations entirely',
      'Are only used for financial audits'
    ],
    correctAnswer: 1,
    explanation: 'Tick marks are standardized symbols that efficiently document the nature of audit work performed and results observed, linked to a legend explaining each mark.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-217',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Evidence obtained directly by the auditor is:',
    options: [
      'Less reliable than evidence from third parties',
      'Generally more reliable than evidence provided by the client',
      'Always less reliable',
      'Only useful for IT audits'
    ],
    correctAnswer: 1,
    explanation: 'Evidence obtained directly (observation, recomputation) is generally more reliable than evidence provided by the client because the auditor has greater control over its quality.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence Reliability',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-218',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Written evidence is generally:',
    options: [
      'Less reliable than oral evidence',
      'More reliable than oral evidence',
      'The same reliability as oral evidence',
      'Never used in modern auditing'
    ],
    correctAnswer: 1,
    explanation: 'Written evidence is generally more reliable than oral because it provides a permanent record that can be reviewed and verified.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence Reliability',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-219',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Testing application controls in an IT environment includes:',
    options: [
      'Only testing hardware',
      'Input validation, processing controls, and output controls',
      'Only testing general controls',
      'Only testing user interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Application control testing covers input controls (validation, authorization), processing controls (accuracy, completeness), and output controls (distribution, reconciliation).',
    topic: 'Performing the Engagement',
    subtopic: 'IT Control Testing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-220',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Access control testing evaluates:',
    options: [
      'Only physical building access',
      'Logical access rights, authentication mechanisms, and authorization processes',
      'Only password complexity',
      'Only firewall settings'
    ],
    correctAnswer: 1,
    explanation: 'Access control testing encompasses authentication (verifying identity), authorization (verifying permissions), and accountability (audit trails of access and actions).',
    topic: 'Performing the Engagement',
    subtopic: 'IT Control Testing',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // DOMAIN IV: COMMUNICATING RESULTS AND MONITORING (20%)
  // ============================================================================
  
  {
    id: 'cia2-221',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Executive summaries in audit reports should:',
    options: [
      'Include all details from the report',
      'Provide a concise overview of key findings, conclusions, and recommendations',
      'Only include positive observations',
      'Be longer than the detailed report'
    ],
    correctAnswer: 1,
    explanation: 'Executive summaries provide senior management rapid understanding of key issues, overall conclusions, and most important recommendations without reading the full report.',
    topic: 'Communicating Results',
    subtopic: 'Report Structure',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-222',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Rating audit findings (high, medium, low) helps:',
    options: [
      'Reduce report length',
      'Communicate relative significance and prioritize management attention',
      'Only satisfy external auditors',
      'Avoid management pushback'
    ],
    correctAnswer: 1,
    explanation: 'Risk-based ratings communicate relative significance, helping management prioritize resources and attention on the most critical issues first.',
    topic: 'Communicating Results',
    subtopic: 'Finding Ratings',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-223',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Visual aids in audit reports (charts, graphs) are useful for:',
    options: [
      'Making reports longer',
      'Enhancing understanding of complex data and relationships',
      'Replacing written findings',
      'Impressing the board only'
    ],
    correctAnswer: 1,
    explanation: 'Visual aids enhance communication by presenting complex data, trends, and relationships in formats that are often easier to understand than text.',
    topic: 'Communicating Results',
    subtopic: 'Report Presentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-224',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Verbal communication during an engagement:',
    options: [
      'Should be avoided entirely',
      'Supplements written communication and provides real-time interaction',
      'Replaces all written reports',
      'Is only for sensitive issues'
    ],
    correctAnswer: 1,
    explanation: 'Verbal communication throughout the engagement provides interaction, allows for clarification, and supplements formal written reports.',
    topic: 'Communicating Results',
    subtopic: 'Communication Methods',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-225',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The tone of audit communications should be:',
    options: [
      'Accusatory to emphasize seriousness',
      'Objective and professional while fostering constructive relationships',
      'Highly casual',
      'Only positive regardless of findings'
    ],
    correctAnswer: 1,
    explanation: 'Communications should be objective and professional while maintaining constructive relationships. Tone affects how findings are received and acted upon.',
    topic: 'Communicating Results',
    subtopic: 'Communication Tone',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-226',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When audit findings become obsolete due to subsequent events, the CAE should:',
    options: [
      'Issue the report as originally written',
      'Consider updating the report or communication to reflect the change',
      'Withdraw from the engagement',
      'Never update communications'
    ],
    correctAnswer: 1,
    explanation: 'If circumstances change before report issuance, the auditor should consider how to address the changed situation, potentially updating findings or noting the changes.',
    topic: 'Communicating Results',
    subtopic: 'Report Updates',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-227',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Report distribution lists should be:',
    options: [
      'As broad as possible',
      'Carefully determined based on need to know and authority to act',
      'Limited to only the CAE',
      'Published publicly'
    ],
    correctAnswer: 1,
    explanation: 'Distribution should include those who need the information, can take corrective action, or have oversight responsibilities, while protecting sensitive information.',
    topic: 'Communicating Results',
    subtopic: 'Report Distribution',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-228',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Draft report review with management:',
    options: [
      'Is unnecessary if findings are accurate',
      'Allows verification of facts and discussion of recommendations',
      'Only delays report issuance',
      'Should be avoided for efficiency'
    ],
    correctAnswer: 1,
    explanation: 'Draft review with management helps verify factual accuracy, clarify any misunderstandings, obtain management perspective, and agree on action plans.',
    topic: 'Communicating Results',
    subtopic: 'Draft Review',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-229',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Management action plans in response to audit findings should include:',
    options: [
      'Only general commitment to improve',
      'Specific actions, responsible parties, and target completion dates',
      'Only financial estimates',
      'Only risk acceptance'
    ],
    correctAnswer: 1,
    explanation: 'Effective action plans specify what will be done, who is responsible, and when it will be completed, enabling monitoring and accountability.',
    topic: 'Communicating Results',
    subtopic: 'Action Plans',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-230',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When management action plans are inadequate to address root causes, the auditor should:',
    options: [
      'Accept the plan as proposed',
      'Discuss concerns and may include the auditor\'s perspective in the report',
      'Implement the controls personally',
      'Escalate directly to regulators'
    ],
    correctAnswer: 1,
    explanation: 'If proposed actions seem inadequate, auditors should discuss concerns with management. If disagreement persists, the report may note the auditor\'s assessment.',
    topic: 'Communicating Results',
    subtopic: 'Action Plan Adequacy',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-231',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Follow-up procedures should be:',
    options: [
      'Only annual reviews',
      'Proportionate to the significance of findings',
      'Identical for all findings',
      'Only for high-rated findings'
    ],
    correctAnswer: 1,
    explanation: 'Follow-up effort should be proportionate to significance. More critical findings warrant more rigorous follow-up including verification testing.',
    topic: 'Monitoring Progress',
    subtopic: 'Follow-Up Intensity',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-232',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'An issue tracking system helps internal audit:',
    options: [
      'Only document new findings',
      'Monitor and report on the status of corrective actions',
      'Only assign blame',
      'Avoid follow-up work'
    ],
    correctAnswer: 1,
    explanation: 'Issue tracking systems provide centralized monitoring of all findings, their status, due dates, and completion, supporting management and board reporting.',
    topic: 'Monitoring Progress',
    subtopic: 'Issue Tracking',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-233',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When verifying corrective action completion, auditors should:',
    options: [
      'Accept management assertion only',
      'Obtain evidence that actions were implemented and are operating effectively',
      'Only review documentation',
      'Only interview management'
    ],
    correctAnswer: 1,
    explanation: 'Verification should obtain evidence that actions were actually implemented and are operating effectively, not just that management claims completion.',
    topic: 'Monitoring Progress',
    subtopic: 'Verification',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-234',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Repeated findings (issues that persist across audits) may indicate:',
    options: [
      'Effective control environment',
      'Inadequate corrective action or systemic issues requiring elevated attention',
      'High quality controls',
      'Need to reduce audit coverage'
    ],
    correctAnswer: 1,
    explanation: 'Repeated findings suggest ineffective remediation or root cause analysis and may warrant escalation to senior management or the board for resolution.',
    topic: 'Monitoring Progress',
    subtopic: 'Repeated Findings',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-235',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Reporting overdue corrective actions to the board:',
    options: [
      'Is rarely necessary',
      'Ensures appropriate oversight and accountability for significant issues',
      'Damages relationships with management',
      'Should be avoided'
    ],
    correctAnswer: 1,
    explanation: 'Reporting overdue or unresolved significant issues to the board ensures appropriate oversight and supports the CAE\'s responsibility under Standard 2500.',
    topic: 'Monitoring Progress',
    subtopic: 'Board Reporting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-236',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The purpose of the closing meeting is to:',
    options: [
      'Negotiate findings away',
      'Summarize results, discuss findings, and obtain management commitment',
      'Announce final ratings only',
      'Celebrate completion'
    ],
    correctAnswer: 1,
    explanation: 'Closing meetings summarize engagement results, discuss significant findings, clarify any remaining questions, and obtain management commitment to action plans.',
    topic: 'Communicating Results',
    subtopic: 'Closing Meeting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-237',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Report formatting should:',
    options: [
      'Follow a single rigid template',
      'Balance standardization with flexibility for engagement type and audience',
      'Change completely for each engagement',
      'Avoid all graphics'
    ],
    correctAnswer: 1,
    explanation: 'Reporting should use consistent elements for quality and recognition while allowing flexibility for different engagement types, audiences, and content needs.',
    topic: 'Communicating Results',
    subtopic: 'Report Format',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-238',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A qualified opinion in internal audit communications indicates:',
    options: [
      'No issues were found',
      'Limitations existed that prevented full conclusion but overall assessment is provided',
      'Complete failure of controls',
      'Scope was not appropriate'
    ],
    correctAnswer: 1,
    explanation: 'A qualified opinion acknowledges limitations (scope restrictions, inadequate access) while still providing assessment on areas that could be reviewed.',
    topic: 'Communicating Results',
    subtopic: 'Overall Opinion',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-239',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Dashboards for internal audit reporting:',
    options: [
      'Replace all written reports',
      'Provide visual summary of activity status, findings, and performance metrics',
      'Are only for external use',
      'Only show financial information'
    ],
    correctAnswer: 1,
    explanation: 'Dashboards effectively communicate key metrics, status, and trends through visual presentation, helping stakeholders quickly understand internal audit activities and results.',
    topic: 'Communicating Results',
    subtopic: 'Reporting Tools',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-240',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Maintaining a findings database helps internal audit:',
    options: [
      'Only for historical reference',
      'Track trends, support follow-up, and identify systemic issues',
      'Create longer reports',
      'Avoid new testing'
    ],
    correctAnswer: 1,
    explanation: 'A findings database enables trend analysis, recurring issue identification, follow-up tracking, and demonstration of internal audit impact over time.',
    topic: 'Monitoring Progress',
    subtopic: 'Findings Database',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // ADDITIONAL MIXED DOMAIN QUESTIONS
  // ============================================================================
  
  {
    id: 'cia2-241',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Agile auditing approaches:',
    options: [
      'Avoid planning entirely',
      'Emphasize flexibility, iteration, and continuous stakeholder engagement',
      'Only work for IT audits',
      'Eliminate quality controls'
    ],
    correctAnswer: 1,
    explanation: 'Agile audit approaches apply iterative methods, frequent stakeholder communication, and flexible planning while maintaining quality and rigor.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Approaches',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-242',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Embedding audit tests into business processes (continuous auditing) provides:',
    options: [
      'Only annual results',
      'Real-time or near-real-time assurance on control effectiveness',
      'Reduced need for IT controls',
      'Lower cost necessarily'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing enables ongoing, automated tests that provide near real-time assurance rather than periodic point-in-time testing.',
    topic: 'Performing the Engagement',
    subtopic: 'Continuous Auditing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-243',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Consulting engagement results are typically communicated:',
    options: [
      'Only to the board',
      'Per agreement with the engagement client',
      'Never in writing',
      'Only to external auditors'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2410.C1 indicates consulting engagement communication varies in form and content depending on the agreement with the engagement client.',
    topic: 'Communicating Results',
    subtopic: 'Consulting Communications',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-244',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Hot desk auditing (floor walking) provides:',
    options: [
      'Only social benefits',
      'Informal observation and relationship building with operational areas',
      'Complete audit evidence',
      'Required documentation'
    ],
    correctAnswer: 1,
    explanation: 'Hot desk auditing involves spending time in operational areas, providing informal observation opportunities and building relationships while understanding operations.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-245',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Pre-audit questionnaires sent to auditees help:',
    options: [
      'Delay the audit',
      'Gather preliminary information and identify initial risk areas',
      'Replace fieldwork entirely',
      'Only create paperwork'
    ],
    correctAnswer: 1,
    explanation: 'Pre-audit questionnaires efficiently gather background information, identify changes since last review, and highlight potential risk areas before detailed planning.',
    topic: 'Planning the Engagement',
    subtopic: 'Information Gathering',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-246',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Process mining technology helps auditors:',
    options: [
      'Only identify employees',
      'Analyze actual process flows from system event logs to identify variations',
      'Replace interviews',
      'Only test financial transactions'
    ],
    correctAnswer: 1,
    explanation: 'Process mining uses event log data to visualize and analyze actual process execution, identifying variations from expected flows, bottlenecks, and control gaps.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-247',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Root cause categories commonly considered include:',
    options: [
      'Only people issues',
      'People, process, technology, and environmental/external factors',
      'Only technology failures',
      'Only management decisions'
    ],
    correctAnswer: 1,
    explanation: 'Root cause analysis considers multiple categories: people (training, resources), process (design, documentation), technology (systems), and external factors.',
    topic: 'Performing the Engagement',
    subtopic: 'Root Cause Analysis',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-248',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A control gap exists when:',
    options: [
      'Controls are too strong',
      'Identified risks are not adequately addressed by existing controls',
      'Too many controls exist',
      'Controls are too expensive'
    ],
    correctAnswer: 1,
    explanation: 'A control gap exists when risks exist that are not adequately mitigated by existing controls, potentially leaving the organization exposed to those risks.',
    topic: 'Performing the Engagement',
    subtopic: 'Control Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-249',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Control redundancy should be:',
    options: [
      'Maximized regardless of cost',
      'Evaluated to ensure added controls provide proportionate benefit',
      'Eliminated entirely',
      'Only for IT controls'
    ],
    correctAnswer: 1,
    explanation: 'While some redundancy may be appropriate for critical controls, excessive redundancy adds cost without proportionate risk reduction and should be rationalized.',
    topic: 'Performing the Engagement',
    subtopic: 'Control Efficiency',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-250',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When evaluating control design at the entity level:',
    options: [
      'Only detailed transaction controls are assessed',
      'High-level controls affecting multiple areas like governance and risk culture are evaluated',
      'Only IT general controls are considered',
      'Only financial controls are reviewed'
    ],
    correctAnswer: 1,
    explanation: 'Entity-level control evaluation assesses broad controls (tone at the top, governance, risk culture, organization-wide policies) that affect the overall control environment.',
    topic: 'Performing the Engagement',
    subtopic: 'Entity-Level Controls',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-251',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit planning considers alignment with:',
    options: [
      'Only financial reporting deadlines',
      'Organizational strategy, goals, and key initiatives',
      'Only quarterly earnings announcements',
      'Only regulatory examination schedules'
    ],
    correctAnswer: 1,
    explanation: 'Audit planning should align with strategic objectives, key initiatives, and major changes to ensure internal audit provides relevant, timely assurance and insight.',
    topic: 'Planning the Engagement',
    subtopic: 'Strategic Alignment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-252',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Workpaper ownership resides with:',
    options: [
      'Individual auditors',
      'The organization',
      'External auditors',
      'Regulatory agencies'
    ],
    correctAnswer: 1,
    explanation: 'Working papers are the property of the organization. The CAE controls access and must ensure appropriate retention and confidentiality.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-253',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Hot topic or emerging risk audits address:',
    options: [
      'Only historical issues',
      'New or evolving risks that may not have been included in the annual plan',
      'Only financial reporting',
      'Only regulatory requirements'
    ],
    correctAnswer: 1,
    explanation: 'Hot topic audits respond to emerging risks, new regulations, or significant changes that arise after the annual plan is approved.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Emerging Risks',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-254',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Post-engagement surveys of auditees provide:',
    options: [
      'Optional feedback only',
      'Valuable input for quality improvement and relationship assessment',
      'Legally required documentation',
      'Marketing materials'
    ],
    correctAnswer: 1,
    explanation: 'Auditee surveys provide feedback on audit quality, professionalism, and value, supporting quality improvement efforts and stakeholder relationship management.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Quality Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-255',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Internal audit transformation or innovation may involve:',
    options: [
      'Avoiding all new techniques',
      'Adopting data analytics, automation, and new audit methodologies',
      'Only maintaining current approaches',
      'Reducing audit coverage'
    ],
    correctAnswer: 1,
    explanation: 'Transformation looks at adopting new technologies, automation, analytics, and methodologies to enhance audit effectiveness and efficiency.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Innovation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-256',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Integrated auditing combines:',
    options: [
      'Only IT and financial audits',
      'Multiple audit perspectives (financial, operational, compliance, IT) in one engagement',
      'Only compliance elements',
      'Only operational concerns'
    ],
    correctAnswer: 1,
    explanation: 'Integrated audits examine processes holistically, combining financial, operational, compliance, and IT perspectives rather than siloed reviews.',
    topic: 'Planning the Engagement',
    subtopic: 'Integrated Auditing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-257',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit lessons learned sessions:',
    options: [
      'Only focus on problems',
      'Capture what went well and areas for improvement after engagements',
      'Are only for failed audits',
      'Delay future audits'
    ],
    correctAnswer: 1,
    explanation: 'Lessons learned capture both successes and improvement opportunities, supporting continuous enhancement of audit processes and staff development.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Continuous Improvement',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-258',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Combined assurance coordinates:',
    options: [
      'Only internal and external audit',
      'All assurance providers to optimize coverage and reduce gaps/overlaps',
      'Only first and second line functions',
      'Only regulatory examinations'
    ],
    correctAnswer: 1,
    explanation: 'Combined assurance integrates efforts of management, second line, internal audit, and external audit to optimize overall assurance coverage efficiently.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Combined Assurance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-259',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit project management skills help ensure:',
    options: [
      'Only budget compliance',
      'Engagements meet objectives within time and resource constraints',
      'Only detailed documentation',
      'Maximum report length'
    ],
    correctAnswer: 1,
    explanation: 'Project management competencies help plan, execute, and complete engagements effectively within scope, time, and resource parameters.',
    topic: 'Performing the Engagement',
    subtopic: 'Project Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-260',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Status meetings during engagements:',
    options: [
      'Are only for problems',
      'Keep stakeholders informed and address emerging issues timely',
      'Delay completion',
      'Should be avoided'
    ],
    correctAnswer: 1,
    explanation: 'Regular status communications keep stakeholders informed, manage expectations, and allow early discussion of issues requiring attention.',
    topic: 'Communicating Results',
    subtopic: 'Interim Communication',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-261',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Surprise audits may be appropriate when:',
    options: [
      'Stakeholders prefer them',
      'There is concern about potential cover-up or the nature of testing requires unannounced observation',
      'Always, to keep auditees honest',
      'Never, as they damage relationships'
    ],
    correctAnswer: 1,
    explanation: 'Surprise audits may be justified when announced audits could allow concealment, or when the nature of testing (cash counts, etc.) requires unannounced procedures.',
    topic: 'Planning the Engagement',
    subtopic: 'Surprise Audits',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-262',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Three-point estimates in audit planning consider:',
    options: [
      'Only single time estimate',
      'Optimistic, most likely, and pessimistic scenarios for time/resource planning',
      'Only budget limits',
      'Only historical averages'
    ],
    correctAnswer: 1,
    explanation: 'Three-point estimation uses optimistic, most likely, and pessimistic scenarios to develop more realistic time and resource estimates.',
    topic: 'Planning the Engagement',
    subtopic: 'Estimation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-263',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Quality review checkpoints during engagements occur:',
    options: [
      'Only at the end',
      'At planning, during fieldwork, and before report issuance',
      'Only annually',
      'Only when problems arise'
    ],
    correctAnswer: 1,
    explanation: 'Quality review occurs at multiple checkpoints: planning approval, during fieldwork supervision, and final review before issuing communications.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Quality Control',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-264',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Reference materials (standards, policies, prior reports) in working papers:',
    options: [
      'Are never needed',
      'Provide context and support for audit procedures and conclusions',
      'Only create bulk',
      'Should be removed before filing'
    ],
    correctAnswer: 1,
    explanation: 'Reference materials provide context, support criteria used, and document the basis for understanding the area audited.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-265',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Exception reporting to audit management should occur when:',
    options: [
      'Only at period end',
      'Significant unexpected issues arise that may affect scope, timing, or conclusions',
      'Only for positive findings',
      'Never during fieldwork'
    ],
    correctAnswer: 1,
    explanation: 'Significant issues requiring management attention (scope changes, resource needs, major findings) should be reported promptly rather than waiting for period-end.',
    topic: 'Communicating Results',
    subtopic: 'Exception Reporting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-266',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Audit universe maintenance should be:',
    options: [
      'Completed once and never updated',
      'Ongoing to reflect organizational changes and new risks',
      'Only annual',
      'Only when requested by management'
    ],
    correctAnswer: 1,
    explanation: 'The audit universe should be continuously maintained to reflect organizational changes, new processes, emerging risks, and completed audits.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Universe',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-267',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Communicating control effectiveness conclusions requires:',
    options: [
      'Only subjective opinions',
      'Evidence-based assessment of design adequacy and operating effectiveness',
      'Only management input',
      'External auditor concurrence'
    ],
    correctAnswer: 1,
    explanation: 'Control effectiveness conclusions should be based on evidence obtained through testing both design adequacy and consistent operating effectiveness.',
    topic: 'Communicating Results',
    subtopic: 'Control Conclusions',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-268',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Positive observations in audit reports:',
    options: [
      'Should be avoided',
      'Recognize strengths and effective practices where noted',
      'Reduce report credibility',
      'Are only for consulting'
    ],
    correctAnswer: 1,
    explanation: 'Noting effective practices and strengths provides balanced perspective, recognizes management efforts, and may identify practices to share with other areas.',
    topic: 'Communicating Results',
    subtopic: 'Balanced Reporting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-269',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The audit cycle (time between audits of an area) should be based on:',
    options: [
      'Fixed schedules regardless of risk',
      'Risk assessment and changes in the area',
      'Only budget availability',
      'Only management preference'
    ],
    correctAnswer: 1,
    explanation: 'Audit frequency should be risk-based, considering inherent risk, control quality, changes, and other factors rather than fixed arbitrary schedules.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Cycle',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-270',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The CAE should periodically provide an internal audit value proposition that demonstrates:',
    options: [
      'Only costs incurred',
      'How internal audit contributes to organizational improvement and governance',
      'Only audit hours completed',
      'Only training completed'
    ],
    correctAnswer: 1,
    explanation: 'The value proposition articulates how internal audit contributes to organizational success through assurance, risk mitigation, improvement recommendations, and governance support.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Value Demonstration',
  reference: 'IIA Standards'
  },
];

export default CIA2_QUESTIONS_BATCH3;
