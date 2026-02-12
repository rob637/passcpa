/**
 * CIA Part 2: Practice of Internal Auditing - Additional Questions (Batch 1)
 * Questions CIA2-071 through CIA2-170
 * 
 * Domain breakdown (for 200 questions):
 * - Domain I: Managing the Internal Audit Activity (20%) - 40 questions
 * - Domain II: Planning the Engagement (20%) - 40 questions
 * - Domain III: Performing the Engagement (40%) - 80 questions
 * - Domain IV: Communicating Results and Monitoring Progress (20%) - 40 questions
 */

import { Question } from '../../../types';

export const CIA2_QUESTIONS_BATCH2: Question[] = [
  // ============================================================================
  // DOMAIN I: MANAGING THE INTERNAL AUDIT ACTIVITY (20%)
  // ============================================================================
  
  {
    id: 'cia2-071',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When developing the risk-based audit plan, the CAE should consider all of the following EXCEPT:',
    options: [
      'The organization\'s strategic objectives',
      'The risk management framework',
      'Personal preferences of audit staff',
      'The expectations of senior management and the board'
    ],
    correctAnswer: 2,
    explanation: 'The risk-based audit plan should be based on organizational objectives, risk assessment, management expectations, and regulatory requirements—not personal staff preferences.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Risk-Based Planning',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-072',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The audit universe represents:',
    options: [
      'Only high-risk audit areas',
      'All possible auditable units within the organization',
      'The current year\'s audit plan',
      'Areas approved by the board for audit'
    ],
    correctAnswer: 1,
    explanation: 'The audit universe encompasses all possible auditable entities (departments, processes, systems, locations) from which the CAE selects engagements based on risk.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Universe',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-073',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The CAE should submit the annual audit plan to the board for:',
    options: [
      'Information only',
      'Review and approval',
      'Discussion but not approval',
      'Filing'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2020 requires the CAE to communicate the audit plan and resource requirements to senior management and the board for review and approval.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Plan Approval',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-074',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Policies and procedures in the internal audit activity provide:',
    options: [
      'Optional guidance for experienced auditors only',
      'Framework and standards for conducting audit work',
      'External reporting requirements',
      'Marketing materials for stakeholders'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2040 requires the CAE to establish policies and procedures to guide the internal audit activity, providing consistent framework for quality work.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Policies and Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-075',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When coordinating with external auditors, the CAE should consider:',
    options: [
      'Competing for audit areas',
      'Coverage, timing, and sharing of work',
      'Keeping all audit work confidential from external auditors',
      'Only financial statement areas'
    ],
    correctAnswer: 1,
    explanation: 'Coordination with external auditors includes consideration of coverage, access to each other\'s programs and working papers, and avoiding duplication while ensuring adequate coverage.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'External Coordination',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-076',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The CAE reports to the board periodically on all of the following EXCEPT:',
    options: [
      'Audit plan status and changes',
      'Significant risk exposures and control issues',
      'Daily operational decisions of the audit department',
      'Resource requirements'
    ],
    correctAnswer: 2,
    explanation: 'Daily operational decisions are administrative matters. The CAE reports to the board on significant matters including plan status, risk exposures, control issues, and resource needs.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Reporting to the Board',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-077',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Risk factors used to prioritize the audit plan typically include:',
    options: [
      'Only financial statement impact',
      'Impact, likelihood, control effectiveness, and management concerns',
      'Only regulatory requirements',
      'Only prior audit results'
    ],
    correctAnswer: 1,
    explanation: 'Multiple risk factors inform audit planning including potential impact, likelihood, time since last audit, control environment quality, management concerns, and regulatory requirements.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Risk Prioritization',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-078',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Resource management for the internal audit activity includes ensuring resources are:',
    options: [
      'Minimized to reduce costs',
      'Appropriate, sufficient, and effectively deployed',
      'Focused only on compliance',
      'Exclusively internal employees'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2030 requires the CAE to ensure resources (people, technology, budget) are appropriate to the work, sufficient in quantity, and effectively deployed per the plan.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Resource Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-079',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Knowledge management in internal audit refers to:',
    options: [
      'Only storing audit reports',
      'Capturing, organizing, and sharing audit knowledge and lessons learned',
      'Managing IT systems only',
      'External research activities only'
    ],
    correctAnswer: 1,
    explanation: 'Knowledge management involves systematically capturing, organizing, and sharing expertise, lessons learned, and audit knowledge to improve efficiency and effectiveness.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Knowledge Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-080',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When using external service providers for audit work, the CAE must:',
    options: [
      'Transfer all responsibility to the provider',
      'Retain responsibility for the work and ensure provider competence',
      'Avoid supervising external providers',
      'Only use external providers for IT audits'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2070 requires the CAE to retain responsibility for quality when external providers perform work. The CAE must ensure providers are competent and supervised appropriately.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'External Service Providers',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // DOMAIN II: PLANNING THE ENGAGEMENT (20%)
  // ============================================================================
  
  {
    id: 'cia2-081',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Preliminary engagement planning includes:',
    options: [
      'Only drafting the final report',
      'Understanding objectives, gathering information, and identifying key risks',
      'Only interviewing management',
      'Testing controls'
    ],
    correctAnswer: 1,
    explanation: 'Preliminary planning involves understanding the engagement area, gathering relevant information, assessing risks, and determining scope before detailed fieldwork begins.',
    topic: 'Planning the Engagement',
    subtopic: 'Preliminary Planning',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-082',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Engagement objectives should be developed for each engagement and must include:',
    options: [
      'Only financial aspects',
      'Criteria against which performance will be evaluated',
      'Only compliance requirements',
      'Prior year findings only'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2210 requires engagement objectives to address risks, controls, and governance of the area under review, including criteria for evaluating performance.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Objectives',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-083',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When assessing the significance of control weaknesses, an internal auditor should consider:',
    options: [
      'Only dollar impact',
      'Potential impact, likelihood of harm, and compensating controls',
      'Only management\'s opinion',
      'Only regulatory perspective'
    ],
    correctAnswer: 1,
    explanation: 'Significance assessment considers potential impact on objectives, likelihood of harm materializing, existence of compensating controls, and whether issues are systematic or isolated.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-084',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The engagement scope defines:',
    options: [
      'Only the budget for the engagement',
      'The nature, timing, and extent of work to be performed',
      'Only staff assignments',
      'Only the report format'
    ],
    correctAnswer: 1,
    explanation: 'The engagement scope identifies what will be covered, including activities, systems, records, and time periods under review, as well as the nature and extent of testing.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Scope',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-085',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An engagement work program should:',
    options: [
      'Be developed after fieldwork is complete',
      'Document procedures for identifying, analyzing, evaluating, and documenting information',
      'Only list interview questions',
      'Be identical for all engagements'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2240 requires a work program documenting procedures to achieve engagement objectives. It guides the work and should be approved before work begins.',
    topic: 'Planning the Engagement',
    subtopic: 'Work Program',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-086',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Resource allocation for an engagement considers:',
    options: [
      'Only seniority of staff',
      'Knowledge, skills, and other competencies needed for the engagement',
      'Only availability',
      'Only cost minimization'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2230 requires internal auditors to determine appropriate resources considering the nature and complexity of the engagement and available competencies.',
    topic: 'Planning the Engagement',
    subtopic: 'Resource Allocation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-087',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A process walk-through during planning serves to:',
    options: [
      'Replace detailed testing',
      'Gain understanding of the process and identify control points',
      'Satisfy all testing requirements',
      'Document final conclusions'
    ],
    correctAnswer: 1,
    explanation: 'Walk-throughs during planning help auditors understand how a process works, identify key controls, potential risks, and areas requiring attention during testing.',
    topic: 'Planning the Engagement',
    subtopic: 'Understanding the Process',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-088',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When establishing engagement objectives for an assurance engagement, the auditor must consider:',
    options: [
      'Only what management wants audited',
      'Probability of significant errors, fraud, noncompliance, and other exposures',
      'Only historical issues',
      'External audit requirements only'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2210.A1 requires considering probability of significant errors, fraud, noncompliance, and exposures when developing objectives for assurance engagements.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Objectives',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-089',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An engagement communication (announcement) typically includes:',
    options: [
      'Final audit conclusions',
      'Objectives, scope, timing, and information needed from the auditee',
      'Detailed findings',
      'Corrective action plans'
    ],
    correctAnswer: 1,
    explanation: 'The engagement communication notifies the auditee of the upcoming engagement, including objectives, scope, timing, and requests for information or resources needed.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Communication',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-090',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Adequate criteria against which to evaluate operations are:',
    options: [
      'Not needed for internal audits',
      'Required for objective assessment of engagement subject matter',
      'Determined only by management',
      'Only external regulations'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2210.A3 requires internal auditors to identify adequate criteria against which to evaluate operations. Reliable criteria are essential for objective assessment.',
    topic: 'Planning the Engagement',
    subtopic: 'Evaluation Criteria',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // DOMAIN III: PERFORMING THE ENGAGEMENT (40%)
  // ============================================================================
  
  {
    id: 'cia2-091',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Information used in an audit engagement should be:',
    options: [
      'Any information available',
      'Sufficient, reliable, relevant, and useful',
      'Only written documentation',
      'Only financial data'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2310 requires internal auditors to identify, analyze, evaluate, and document sufficient, reliable, relevant, and useful information to achieve engagement objectives.',
    topic: 'Performing the Engagement',
    subtopic: 'Identifying Information',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-092',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Sufficient information is characterized by being:',
    options: [
      'Any electronic information',
      'Factual and adequate to support findings and conclusions',
      'Only management representations',
      'The minimum possible'
    ],
    correctAnswer: 1,
    explanation: 'Sufficient information is factual, adequate, and convincing enough that a prudent person would reach the same conclusions as the auditor. It must support findings.',
    topic: 'Performing the Engagement',
    subtopic: 'Information Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-093',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Reliable information is:',
    options: [
      'Information from any source',
      'Best achievable through proper use of engagement techniques',
      'Only information from management',
      'Only externally sourced information'
    ],
    correctAnswer: 1,
    explanation: 'Reliable information is dependable and can be obtained through proper use of engagement techniques. Source credibility, independence, and verification affect reliability.',
    topic: 'Performing the Engagement',
    subtopic: 'Information Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-094',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Relevant information:',
    options: [
      'May or may not relate to engagement objectives',
      'Supports observations and recommendations that address engagement objectives',
      'Is always financial in nature',
      'Must be from prior audits only'
    ],
    correctAnswer: 1,
    explanation: 'Relevant information has a logical relationship to the engagement objectives. It directly supports the observations, conclusions, and recommendations being made.',
    topic: 'Performing the Engagement',
    subtopic: 'Information Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-095',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Useful information:',
    options: [
      'Is complex and technical',
      'Helps the organization meet its goals',
      'Is only quantitative',
      'Is available everywhere'
    ],
    correctAnswer: 1,
    explanation: 'Useful information helps the organization meet its goals. It provides value to decision-makers and contributes to organizational improvement.',
    topic: 'Performing the Engagement',
    subtopic: 'Information Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-096',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Analytical procedures in internal auditing are used to:',
    options: [
      'Replace all substantive testing',
      'Evaluate information through analysis of relationships and trends',
      'Only forecast future results',
      'Satisfy all documentation requirements'
    ],
    correctAnswer: 1,
    explanation: 'Analytical procedures evaluate information by analyzing relationships among data (ratios, trends, comparisons) to identify unusual patterns or unexpected results requiring further investigation.',
    topic: 'Performing the Engagement',
    subtopic: 'Analytical Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-097',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Observation as an audit technique provides evidence of:',
    options: [
      'Historical transactions only',
      'How activities are actually performed at a point in time',
      'Future activities',
      'What management says happens'
    ],
    correctAnswer: 1,
    explanation: 'Observation provides direct evidence of how activities, processes, or conditions exist at a specific point in time. It confirms practices but only represents that moment.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-098',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Inquiry involves:',
    options: [
      'Only written questionnaires',
      'Seeking information through questions of knowledgeable parties',
      'Only formal interviews',
      'Only management responses'
    ],
    correctAnswer: 1,
    explanation: 'Inquiry involves seeking information through questions of knowledgeable persons, whether through formal interviews, discussions, or questionnaires.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-099',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Inspection of records and documents provides evidence about:',
    options: [
      'Only physical assets',
      'Existence, completeness, and accuracy of recorded information',
      'Verbal assertions only',
      'Future transactions'
    ],
    correctAnswer: 1,
    explanation: 'Inspection of records and documents provides evidence about the existence, completeness, accuracy, and validity of recorded information and transactions.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-100',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Confirmation involves:',
    options: [
      'Internal reviews only',
      'Obtaining corroboration from independent third parties',
      'Management interviews only',
      'Document inspection only'
    ],
    correctAnswer: 1,
    explanation: 'Confirmation obtains direct written responses from third parties (banks, customers, vendors) corroborating information in the organization\'s records.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-101',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Statistical sampling allows the auditor to:',
    options: [
      'Examine every item',
      'Draw conclusions about a population based on sample results',
      'Avoid all risk',
      'Eliminate professional judgment'
    ],
    correctAnswer: 1,
    explanation: 'Statistical sampling uses probability theory to select samples and project sample results to the population, providing mathematically measurable confidence levels.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-102',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Attributes sampling is most appropriate when:',
    options: [
      'Testing dollar amounts',
      'Testing whether controls are operating effectively',
      'Calculating population totals',
      'Measuring inventory values'
    ],
    correctAnswer: 1,
    explanation: 'Attributes sampling estimates the rate of occurrence of a characteristic (like control compliance) in a population. It answers yes/no questions about control operation.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  
  {
    id: 'cia2-104',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Sampling risk is:',
    options: [
      'The risk that audit procedures are not applied correctly',
      'The risk that conclusions based on a sample differ from testing the entire population',
      'The risk of non-compliance',
      'The risk of fraud'
    ],
    correctAnswer: 1,
    explanation: 'Sampling risk is the risk that conclusions from testing a sample may differ from conclusions that would be reached if the entire population were tested.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling Risk',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-105',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Judgmental (non-statistical) sampling:',
    options: [
      'Provides the same statistical conclusions as statistical sampling',
      'Relies on auditor judgment for sample selection',
      'Is never appropriate',
      'Requires random number generators'
    ],
    correctAnswer: 1,
    explanation: 'Judgmental sampling relies on the auditor\'s professional judgment to select sample items. Results cannot be statistically projected but can still provide useful evidence.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-106',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Generalized audit software (GAS) allows auditors to:',
    options: [
      'Only prepare reports',
      'Read, extract, and analyze data from various systems',
      'Replace all manual procedures',
      'Only calculate financial ratios'
    ],
    correctAnswer: 1,
    explanation: 'GAS (e.g., ACL, IDEA) reads data from various formats, performs calculations, identifies exceptions, stratifies populations, and performs analyses that would be time-consuming manually.',
    topic: 'Performing the Engagement',
    subtopic: 'Computer-Assisted Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-107',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Test data techniques involve:',
    options: [
      'Only using live production data',
      'Processing fictitious transactions through the client\'s system to test controls',
      'Manual testing only',
      'Never testing IT controls'
    ],
    correctAnswer: 1,
    explanation: 'Test data involves creating fictitious transactions processed through the client\'s system to verify that controls function as designed (e.g., rejection of invalid data).',
    topic: 'Performing the Engagement',
    subtopic: 'Computer-Assisted Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-108',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Continuous auditing involves:',
    options: [
      'Annual audits only',
      'Automated testing of transactions and controls on an ongoing basis',
      'Manual review of all transactions',
      'Only periodic spot checks'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing uses automated tools to perform audit tests on transactions and controls on an ongoing or near real-time basis, enabling timely detection of issues.',
    topic: 'Performing the Engagement',
    subtopic: 'Continuous Auditing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-109',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Data analytics in internal auditing helps:',
    options: [
      'Eliminate the need for auditors',
      'Identify patterns, anomalies, and risks in large data sets',
      'Replace professional judgment',
      'Only graph data'
    ],
    correctAnswer: 1,
    explanation: 'Data analytics enables auditors to analyze entire populations, identify patterns and anomalies, and focus testing on higher-risk items or unusual transactions.',
    topic: 'Performing the Engagement',
    subtopic: 'Data Analytics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-110',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When evaluating control design, the auditor assesses whether:',
    options: [
      'Controls are operating throughout the period',
      'Controls are properly designed to prevent or detect errors',
      'Staff like using the controls',
      'Controls are the cheapest option'
    ],
    correctAnswer: 1,
    explanation: 'Design effectiveness evaluates whether controls, if operating as designed, would effectively prevent or detect errors and irregularities that could affect objectives.',
    topic: 'Performing the Engagement',
    subtopic: 'Control Evaluation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-111',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When evaluating operating effectiveness, the auditor tests whether:',
    options: [
      'Controls are documented',
      'Controls operated consistently throughout the period',
      'Controls are cost-effective',
      'Management approves controls'
    ],
    correctAnswer: 1,
    explanation: 'Operating effectiveness tests whether controls actually operated as designed consistently throughout the audit period, not just whether they were designed correctly.',
    topic: 'Performing the Engagement',
    subtopic: 'Control Testing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-112',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A root cause analysis seeks to identify:',
    options: [
      'Only the symptoms of a problem',
      'The underlying reason(s) why a problem occurred',
      'Who to blame for issues',
      'Only immediate fixes'
    ],
    correctAnswer: 1,
    explanation: 'Root cause analysis goes beyond symptoms to identify the fundamental underlying reasons why a problem occurred, enabling more effective corrective action.',
    topic: 'Performing the Engagement',
    subtopic: 'Analysis',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-113',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Engagement supervision ensures:',
    options: [
      'Staff are monitored constantly',
      'Objectives are achieved and quality is assured',
      'Only senior staff participate',
      'All work is done by the CAE'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2340 requires supervision to ensure engagement objectives are achieved, quality is assured, and staff receive appropriate instruction and development.',
    topic: 'Performing the Engagement',
    subtopic: 'Supervision',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-114',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Working papers serve to:',
    options: [
      'Only satisfy regulatory requirements',
      'Document information obtained, analyses performed, and conclusions reached',
      'Provide employment for staff',
      'Replace audit reports'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2330 requires documentation of information sufficient to support conclusions and engagement results. Working papers are the record of work performed.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-115',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Working paper retention policies should consider:',
    options: [
      'Only storage costs',
      'Legal, regulatory, organizational policies, and future needs',
      'Only current year requirements',
      'Only space availability'
    ],
    correctAnswer: 1,
    explanation: 'Retention policies balance legal requirements, regulations, organizational needs, and potential future use of documentation including litigation support and recurring engagements.',
    topic: 'Performing the Engagement',
    subtopic: 'Record Retention',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-116',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Cross-referencing in working papers:',
    options: [
      'Is optional',
      'Links related information and supports the audit trail',
      'Replaces indexing',
      'Is only used in financial audits'
    ],
    correctAnswer: 1,
    explanation: 'Cross-referencing creates links between related working papers, supporting documents, and the audit report, maintaining a clear audit trail for review.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-117',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Interview techniques that are most effective include:',
    options: [
      'Only closed-ended questions',
      'Open-ended questions that encourage detailed responses',
      'Leading questions that suggest answers',
      'Only yes/no questions'
    ],
    correctAnswer: 1,
    explanation: 'Open-ended questions encourage interviewees to provide detailed, narrative responses, yielding more information than closed-ended questions that limit responses.',
    topic: 'Performing the Engagement',
    subtopic: 'Interview Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-118',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Corroborating evidence from multiple sources:',
    options: [
      'Is unnecessary if one source is reliable',
      'Increases the reliability and persuasiveness of conclusions',
      'Creates confusion',
      'Is only needed for fraud investigations'
    ],
    correctAnswer: 1,
    explanation: 'Evidence from multiple independent sources that supports the same conclusion is more reliable and persuasive than evidence from a single source.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-119',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When an internal auditor discovers potential fraud during an engagement, they should:',
    options: [
      'Complete a full fraud investigation independently',
      'Expand procedures, notify appropriate parties, and consider the need for specialists',
      'Ignore it if immaterial',
      'Only report at year-end'
    ],
    correctAnswer: 1,
    explanation: 'When fraud is suspected, auditors should extend procedures as appropriate, notify management and/or the CAE, and consider whether fraud investigation specialists are needed.',
    topic: 'Performing the Engagement',
    subtopic: 'Fraud',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-120',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The concept of materiality in internal auditing relates to:',
    options: [
      'Only dollar amounts',
      'Significance of information in relation to objectives and decisions',
      'Physical size of documents',
      'Length of the audit report'
    ],
    correctAnswer: 1,
    explanation: 'Materiality considers whether information is significant enough to affect decisions or achievement of objectives. It includes quantitative and qualitative factors.',
    topic: 'Performing the Engagement',
    subtopic: 'Materiality',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // DOMAIN IV: COMMUNICATING RESULTS AND MONITORING (20%)
  // ============================================================================
  
  {
    id: 'cia2-121',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Engagement communications should include:',
    options: [
      'Only positive observations',
      'Objectives, scope, conclusions, and recommendations',
      'Only findings of noncompliance',
      'Only management responses'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2410 requires communications to include objectives, scope, applicable conclusions, recommendations, and action plans. They provide a complete picture of the engagement.',
    topic: 'Communicating Results',
    subtopic: 'Communication Content',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-122',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Criteria for engagement communications include being:',
    options: [
      'Only verbal',
      'Accurate, objective, clear, concise, constructive, complete, and timely',
      'Only written',
      'Only formal'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2420 requires communications to be accurate, objective, clear, concise, constructive, complete, and timely. These criteria ensure effectiveness.',
    topic: 'Communicating Results',
    subtopic: 'Communication Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-123',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An engagement observation should include:',
    options: [
      'Only the condition found',
      'Condition, criteria, cause, consequence, and corrective action',
      'Only the recommendation',
      'Only management\'s response'
    ],
    correctAnswer: 1,
    explanation: 'A complete observation includes: condition (what was found), criteria (what should be), cause (why it occurred), consequence (impact), and recommended corrective action.',
    topic: 'Communicating Results',
    subtopic: 'Observation Structure',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-124',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The purpose of an exit conference is to:',
    options: [
      'Finalize the audit report without discussion',
      'Discuss findings and recommendations with management and obtain responses',
      'Present the report to the board',
      'Train new auditors'
    ],
    correctAnswer: 1,
    explanation: 'Exit conferences allow auditors to discuss draft findings and recommendations with management, clarify issues, obtain management\'s perspective, and agree on action plans.',
    topic: 'Communicating Results',
    subtopic: 'Exit Conference',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-125',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Management responses to audit findings:',
    options: [
      'Are optional in the report',
      'Should be included describing action taken or planned',
      'Must always agree with findings',
      'Replace the need for auditor recommendations'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2410.A1 indicates communications should include management\'s response describing action taken or to be taken, along with timeframes for implementation.',
    topic: 'Communicating Results',
    subtopic: 'Management Response',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-126',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'If an engagement observes satisfactory performance, the audit report should:',
    options: [
      'Not be issued',
      'Note the satisfactory performance and any areas for improvement',
      'Only focus on weaknesses',
      'Be delayed until problems arise'
    ],
    correctAnswer: 1,
    explanation: 'Satisfactory performance should be communicated. Reports acknowledging strengths and achievements, along with any improvement opportunities, provide balanced perspective.',
    topic: 'Communicating Results',
    subtopic: 'Reporting Positive Results',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-127',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When management disputes significant audit findings, the auditor should:',
    options: [
      'Remove the findings from the report',
      'Include both the finding and management\'s position in the report',
      'Escalate directly to regulators',
      'Withdraw the report entirely'
    ],
    correctAnswer: 1,
    explanation: 'When disagreement occurs on significant issues, the report may include both the auditor\'s conclusion and management\'s position. The CAE determines appropriate handling.',
    topic: 'Communicating Results',
    subtopic: 'Disagreement',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-128',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The CAE must disseminate results to appropriate parties who:',
    options: [
      'Request all reports',
      'Can ensure results are given due consideration and take corrective action',
      'Have financial interests',
      'Are external to the organization'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2440 requires disseminating results to those who can ensure proper consideration and corrective action, typically those responsible for the area.',
    topic: 'Communicating Results',
    subtopic: 'Dissemination',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-129',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Before releasing engagement results to external parties, the CAE should:',
    options: [
      'Do nothing special',
      'Assess risks, consult with management and legal counsel, and control dissemination',
      'Release to all interested parties equally',
      'Wait for regulatory request'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2440.A2 requires the CAE to assess potential risk, consult with senior management/legal counsel, and control dissemination when releasing to external parties.',
    topic: 'Communicating Results',
    subtopic: 'External Dissemination',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-130',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The CAE should establish monitoring processes to:',
    options: [
      'Only track audit department metrics',
      'Ensure management actions have been effectively implemented',
      'Only observe operations',
      'Replace follow-up audits'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2500 requires the CAE to establish and maintain a system to monitor disposition of results and ensure management actions are effectively implemented or that management accepts the risk of not taking action.',
    topic: 'Monitoring Progress',
    subtopic: 'Follow-Up',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-131',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When management decides not to act on audit recommendations, the CAE should:',
    options: [
      'Accept management\'s decision without further action',
      'Discuss with senior management and potentially the board if risk is unacceptable',
      'Immediately notify regulators',
      'Resign from the position'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2600 requires the CAE to discuss with senior management when they believe an unacceptable level of risk has been accepted. If unresolved, the CAE must report to the board.',
    topic: 'Monitoring Progress',
    subtopic: 'Risk Acceptance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-132',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Effective audit recommendations should be:',
    options: [
      'Vague to allow management flexibility',
      'Specific, actionable, and address root causes',
      'Only general guidance',
      'Always inexpensive to implement'
    ],
    correctAnswer: 1,
    explanation: 'Good recommendations are specific enough to be understood and implemented, actionable, address root causes rather than symptoms, and consider cost-effectiveness.',
    topic: 'Communicating Results',
    subtopic: 'Recommendations',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-133',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An overall opinion in the CAE\'s annual report includes:',
    options: [
      'Only financial statement findings',
      'Assessment of governance, risk management, and control adequacy',
      'Detailed findings from each audit',
      'Only positive observations'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2450 requires the CAE to provide an annual opinion on the adequacy and effectiveness of the organization\'s governance, risk management, and control processes.',
    topic: 'Communicating Results',
    subtopic: 'Annual Opinion',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-134',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Interim communications during an engagement:',
    options: [
      'Are not permitted',
      'May be made for significant findings that require immediate attention',
      'Replace the final report',
      'Are only for the board'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2410.A3 allows interim communications for significant issues requiring immediate management attention, such as serious control weaknesses or fraud indicators.',
    topic: 'Communicating Results',
    subtopic: 'Interim Reporting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-135',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When an audit report contains an error, the CAE should:',
    options: [
      'Ignore minor errors',
      'Communicate corrected information to all parties who received the original',
      'Only correct in future reports',
      'Recall all copies and destroy them'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2421 requires the CAE to communicate corrected information to all parties who received the original communication if errors or omissions are discovered.',
    topic: 'Communicating Results',
    subtopic: 'Report Errors',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN I QUESTIONS
  // ============================================================================
  
  {
    id: 'cia2-136',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The internal audit activity adds value when it:',
    options: [
      'Finds as many errors as possible',
      'Provides objective and relevant assurance that contributes to effectiveness',
      'Generates revenue for the department',
      'Completes the most audits'
    ],
    correctAnswer: 1,
    explanation: 'Value is added through objective, relevant assurance and insight that helps the organization achieve objectives and improve operations, not by volume of findings or audits.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Value of Internal Audit',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-137',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When the audit plan needs significant revision during the year, the CAE should:',
    options: [
      'Complete the original plan regardless',
      'Communicate the changes and reasons to senior management and the board',
      'Wait until next year to adjust',
      'Adjust without notification'
    ],
    correctAnswer: 1,
    explanation: 'Significant changes to the approved audit plan should be communicated to senior management and the board, explaining the reasons and impact on overall coverage.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Plan Modifications',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-138',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Benchmarking internal audit performance against similar organizations helps:',
    options: [
      'Only justify budget increases',
      'Identify improvement opportunities and assess relative performance',
      'Replace internal quality assessments',
      'Satisfy regulatory requirements'
    ],
    correctAnswer: 1,
    explanation: 'Benchmarking provides external perspective on internal audit performance, identifies best practices and improvement opportunities, and supports resource discussions.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Performance Measurement',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-139',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Key performance indicators (KPIs) for internal audit might include:',
    options: [
      'Only budget compliance',
      'Plan completion, stakeholder satisfaction, and finding implementation rates',
      'Only number of audits completed',
      'Only staff turnover'
    ],
    correctAnswer: 1,
    explanation: 'KPIs measure various aspects of performance including plan completion, timeliness, stakeholder satisfaction, recommendation acceptance, and implementation rates.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Performance Measurement',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-140',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit committee (board) interaction with internal audit should include:',
    options: [
      'Only annual report presentation',
      'Regular meetings, executive sessions, and access to the CAE',
      'Only crisis situations',
      'Only formal written communications'
    ],
    correctAnswer: 1,
    explanation: 'Effective interaction includes regular meetings, private sessions without management, and open access to the CAE, supporting independence and proper oversight.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Board Interaction',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN II QUESTIONS
  // ============================================================================
  
  {
    id: 'cia2-141',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Risk assessment at the engagement level considers:',
    options: [
      'Only organization-wide strategic risks',
      'Risks specific to the area being audited and its objectives',
      'Only financial risks',
      'Only IT risks'
    ],
    correctAnswer: 1,
    explanation: 'Engagement-level risk assessment identifies risks specific to the audited area, including risks to its objectives, operations, and controls.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Risk Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-142',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Control environment evaluation during planning assesses:',
    options: [
      'Only specific control procedures',
      'The overall tone, culture, and attitude toward internal control',
      'Only segregation of duties',
      'Only IT controls'
    ],
    correctAnswer: 1,
    explanation: 'The control environment encompasses management\'s attitudes, integrity, ethics, and commitment to competence. It sets the tone for control consciousness.',
    topic: 'Planning the Engagement',
    subtopic: 'Control Environment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-143',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Consulting engagement planning differs from assurance planning in that:',
    options: [
      'No planning is required for consulting',
      'Scope is agreed upon with the client rather than determined by the auditor',
      'Risk assessment is not considered',
      'Documentation is not required'
    ],
    correctAnswer: 1,
    explanation: 'In consulting engagements, objectives and scope are agreed upon with the engagement client. The nature is advisory with scope defined jointly rather than unilaterally by internal audit.',
    topic: 'Planning the Engagement',
    subtopic: 'Consulting Engagements',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-144',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Preliminary survey activities include:',
    options: [
      'Only reviewing prior audit reports',
      'Review of documents, interviews, observation, and analytical review',
      'Only counting inventory',
      'Only testing controls'
    ],
    correctAnswer: 1,
    explanation: 'Preliminary survey involves gathering background information through document review, discussions, walkthroughs, and analytical review to understand the area.',
    topic: 'Planning the Engagement',
    subtopic: 'Preliminary Survey',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-145',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit program flexibility allows:',
    options: [
      'Ignoring the approved program',
      'Adapting procedures based on engagement conditions',
      'Eliminating documentation',
      'Avoiding supervision'
    ],
    correctAnswer: 1,
    explanation: 'While audit programs provide structure, auditors must be able to modify procedures when circumstances change or new information suggests different approaches are needed.',
    topic: 'Planning the Engagement',
    subtopic: 'Work Program',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN III QUESTIONS
  // ============================================================================
  
  {
    id: 'cia2-146',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Reperformance as an audit technique involves:',
    options: [
      'Observing client procedures',
      'Independently executing procedures or controls that were originally performed by client personnel',
      'Only reviewing documentation',
      'Interviewing management'
    ],
    correctAnswer: 1,
    explanation: 'Reperformance involves the auditor independently redoing a calculation, process, or control that was originally performed by client staff to verify accuracy.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-147',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When using work of other auditors or experts, internal auditors must:',
    options: [
      'Accept all work without review',
      'Assess the adequacy of the work for their purposes',
      'Redo all the work themselves',
      'Only use IIA-certified auditors'
    ],
    correctAnswer: 1,
    explanation: 'When relying on others\' work, auditors must evaluate whether that work is adequate for their purposes, considering competence, objectivity, scope, and findings.',
    topic: 'Performing the Engagement',
    subtopic: 'Using Other Work',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-148',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Stratified sampling involves:',
    options: [
      'Random selection from the entire population',
      'Dividing the population into groups with similar characteristics and sampling each',
      'Testing only high-risk items',
      'Only testing low-value items'
    ],
    correctAnswer: 1,
    explanation: 'Stratified sampling divides the population into homogeneous subgroups (strata), then samples from each stratum, often with different intensities based on risk.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-149',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Monetary unit sampling (MUS) is most useful for:',
    options: [
      'Testing compliance with policies',
      'Testing for monetary overstatement in a population',
      'Counting physical inventory',
      'Interviewing staff'
    ],
    correctAnswer: 1,
    explanation: 'MUS (probability proportional to size) is effective for detecting overstatement in monetary populations, as larger dollar items have higher probability of selection.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-150',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The tolerable error rate in sampling represents:',
    options: [
      'The expected error rate',
      'The maximum error rate the auditor will accept and still conclude the control is effective',
      'The actual error rate found',
      'The minimum sample size'
    ],
    correctAnswer: 1,
    explanation: 'Tolerable error (deviation) rate is the maximum rate of errors or deviations from a prescribed control procedure that the auditor will accept and still conclude the control is operating effectively.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-151',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Expected error rate affects sample size in that:',
    options: [
      'Higher expected errors require smaller samples',
      'Higher expected errors require larger samples',
      'Expected errors have no effect on sample size',
      'Expected errors only affect statistical sampling'
    ],
    correctAnswer: 1,
    explanation: 'As expected error rate increases, larger sample sizes are needed to achieve the desired confidence level in the sampling conclusions.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-152',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Flowcharting is useful in internal audit for:',
    options: [
      'Only IT system documentation',
      'Understanding and documenting processes and identifying control points',
      'Only financial reporting',
      'Replacing written narratives entirely'
    ],
    correctAnswer: 1,
    explanation: 'Flowcharts visually document processes, decision points, and control activities, making it easier to understand process flows and identify control gaps or inefficiencies.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-153',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Process narratives describe:',
    options: [
      'Only financial transactions',
      'Step-by-step details of how a process works',
      'Only control weaknesses',
      'Only IT systems'
    ],
    correctAnswer: 1,
    explanation: 'Narratives provide detailed written descriptions of how a process flows, including inputs, activities, controls, outputs, and responsibilities.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-154',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Internal control questionnaires (ICQs) help auditors:',
    options: [
      'Replace all other testing',
      'Systematically evaluate the presence of expected controls',
      'Only assess IT controls',
      'Only identify fraud'
    ],
    correctAnswer: 1,
    explanation: 'ICQs provide a structured approach to assessing whether expected controls are in place. They typically use yes/no questions where "no" answers indicate potential weaknesses.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-155',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When testing automated controls, auditors should:',
    options: [
      'Test only once regardless of changes',
      'Consider the risk of unauthorized changes and retest as appropriate',
      'Only observe manual controls around the system',
      'Accept IT\'s assurance that controls work'
    ],
    correctAnswer: 1,
    explanation: 'While automated controls may function consistently, auditors must consider whether changes occurred and whether general IT controls (change management) support control integrity.',
    topic: 'Performing the Engagement',
    subtopic: 'IT Control Testing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-156',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Audit evidence from external sources is generally:',
    options: [
      'Less reliable than internal sources',
      'More reliable when obtained directly from independent external parties',
      'Never reliable',
      'Only reliable for financial audits'
    ],
    correctAnswer: 1,
    explanation: 'External evidence from independent sources (confirmations, third-party reports) is generally more reliable than internally-generated evidence due to independence.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence Reliability',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-157',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Documentary evidence is more reliable when:',
    options: [
      'Obtained orally',
      'Original documents rather than copies are examined',
      'Photocopies are used',
      'Management provides it verbally'
    ],
    correctAnswer: 1,
    explanation: 'Original documents are more reliable than copies because copies could be altered. Direct examination of originals provides better assurance.',
    topic: 'Performing the Engagement',
    subtopic: 'Evidence Reliability',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-158',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The Integrated Test Facility (ITF) technique involves:',
    options: [
      'Only manual testing of controls',
      'Creating a fictitious entity within the system to process test transactions',
      'Only year-end testing',
      'External consultant-only testing'
    ],
    correctAnswer: 1,
    explanation: 'ITF creates a fictitious department, vendor, or entity within the production system to process test transactions alongside real ones, testing controls in a live environment.',
    topic: 'Performing the Engagement',
    subtopic: 'Computer-Assisted Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-159',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Parallel simulation involves:',
    options: [
      'Only observing system operations',
      'Processing real data through auditor-controlled programs to compare with client-processed results',
      'Only testing backup systems',
      'Never using production data'
    ],
    correctAnswer: 1,
    explanation: 'Parallel simulation reprocesses actual client data through independent auditor-controlled programs, comparing results to the client\'s processing to identify discrepancies.',
    topic: 'Performing the Engagement',
    subtopic: 'Computer-Assisted Audit Techniques',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-160',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When evaluating the reliability of electronic evidence, auditors should consider:',
    options: [
      'Only file size',
      'Source, access controls, and integrity of the data',
      'Only file creation date',
      'Only file format'
    ],
    correctAnswer: 1,
    explanation: 'Electronic evidence reliability depends on the source credibility, access and change controls, data integrity provisions, and audit trail capabilities.',
    topic: 'Performing the Engagement',
    subtopic: 'Electronic Evidence',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN IV QUESTIONS
  // ============================================================================
  
  {
    id: 'cia2-161',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Clear communication means that reports should:',
    options: [
      'Use technical jargon freely',
      'Be easily understood and free from ambiguity',
      'Be as lengthy as possible',
      'Include all raw data collected'
    ],
    correctAnswer: 1,
    explanation: 'Clear communications are logical, easy to follow, and free from unnecessary technical language or ambiguity, ensuring the message is understood.',
    topic: 'Communicating Results',
    subtopic: 'Communication Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-162',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Constructive communication focuses on:',
    options: [
      'Only criticizing deficiencies',
      'Helping the organization improve rather than just identifying problems',
      'Avoiding any negative observations',
      'Only praising management'
    ],
    correctAnswer: 1,
    explanation: 'Constructive communications help the auditee and organization improve. They include practical recommendations and consider the recipient\'s perspective.',
    topic: 'Communicating Results',
    subtopic: 'Communication Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-163',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Complete communication includes:',
    options: [
      'Only major findings',
      'All essential information for proper understanding and decision-making',
      'Only summary information',
      'Only recommendations'
    ],
    correctAnswer: 1,
    explanation: 'Complete communications include all material and relevant information needed for users to understand findings, draw proper conclusions, and take appropriate action.',
    topic: 'Communicating Results',
    subtopic: 'Communication Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-164',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Timely communication means issuing reports:',
    options: [
      'Only after all issues are resolved',
      'Without unnecessary delay while maintaining quality',
      'Only at year-end',
      'Only when requested'
    ],
    correctAnswer: 1,
    explanation: 'Timely communications are issued without unnecessary delay so that information can be acted upon promptly, while still ensuring appropriate quality.',
    topic: 'Communicating Results',
    subtopic: 'Communication Quality',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-165',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Report distribution should be:',
    options: [
      'To all employees',
      'Determined based on who needs the information and can take action',
      'Only to the CEO',
      'Made public for transparency'
    ],
    correctAnswer: 1,
    explanation: 'Distribution should be to those who need the information to understand findings, make decisions, or take corrective action, while protecting confidential information.',
    topic: 'Communicating Results',
    subtopic: 'Report Distribution',
  reference: 'IIA Standards'
  },
  
  {
    id: 'cia2-167',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Following up on corrective actions helps ensure that:',
    options: [
      'Auditors can criticize management',
      'Management has addressed root causes and the issue will not recur',
      'The same finding can be repeated next audit',
      'External auditors are satisfied'
    ],
    correctAnswer: 1,
    explanation: 'Follow-up verifies that management\'s corrective actions are implemented effectively and address root causes to prevent recurrence of the issues.',
    topic: 'Monitoring Progress',
    subtopic: 'Follow-Up',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-168',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Status reporting on audit findings typically includes:',
    options: [
      'Only closed findings',
      'Open findings, remediation status, target dates, and overdue items',
      'Only new findings',
      'Only high-risk findings'
    ],
    correctAnswer: 1,
    explanation: 'Status reporting tracks all open findings, progress on remediation, expected completion dates, and highlights items that are overdue for resolution.',
    topic: 'Monitoring Progress',
    subtopic: 'Status Reporting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-169',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Escalation procedures for unresolved findings should:',
    options: [
      'Not exist in a collaborative environment',
      'Clearly define when and to whom issues should be escalated',
      'Only address financial issues',
      'Only involve the CAE'
    ],
    correctAnswer: 1,
    explanation: 'Escalation procedures provide clear guidance on elevating issues based on significance, time overdue, and risk level, ensuring appropriate management attention.',
    topic: 'Monitoring Progress',
    subtopic: 'Escalation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-170',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Validating that corrective actions are effective requires:',
    options: [
      'Only management assertion',
      'Testing or verifying that the remediation actually resolves the underlying issue',
      'Only documentation review',
      'Only verbal confirmation'
    ],
    correctAnswer: 1,
    explanation: 'Validation goes beyond accepting management\'s claim to actually testing or verifying that remediation addressed the root cause and controls are now operating effectively.',
    topic: 'Monitoring Progress',
    subtopic: 'Validation',
  reference: 'IIA Standards'
  },
];

export default CIA2_QUESTIONS_BATCH2;
