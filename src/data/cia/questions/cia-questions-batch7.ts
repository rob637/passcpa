/**
 * CIA Part 1-3: Additional MCQ Batch 7
 * 100 questions across all three parts
 * Certified Internal Auditor exam preparation
 */

import { Question } from '../../../types';

export const CIA_QUESTIONS_BATCH7: Question[] = [
  // ===========================================================================
  // CIA PART 1: ESSENTIALS OF INTERNAL AUDITING
  // ===========================================================================
  
  // Domain I: Foundations of Internal Auditing
  {
    id: 'CIA1-B7-001',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The Mission of Internal Audit as defined by the IIA is to:',
    options: [
      'Maximize shareholder value through cost reduction',
      'Enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight',
      'Ensure compliance with all laws and regulations',
      'Detect and prevent all fraud'
    ],
    correctAnswer: 1,
    explanation: 'The IIA Mission states: "To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight."',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Mission of Internal Audit'
  },
  {
    id: 'CIA1-B7-002',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When standards are interpreted differently across jurisdictions, internal auditors should:',
    options: [
      'Always follow their home country interpretation',
      'Ignore local requirements and follow IIA standards exclusively',
      'Consider applicable local laws and conform to the more restrictive professional requirement',
      'Choose whichever interpretation is most convenient'
    ],
    correctAnswer: 2,
    explanation: 'When local laws or regulations differ from IIA Standards, auditors should conform to the more restrictive requirements while disclosing any limitations on conformance.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards Application'
  },
  {
    id: 'CIA1-B7-003',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The Core Principles for the Professional Practice of Internal Auditing include demonstrating:',
    options: [
      'Maximum profitability',
      'Competence and due professional care',
      'Political neutrality',
      'Complete risk elimination'
    ],
    correctAnswer: 1,
    explanation: 'The Core Principles include demonstrating integrity, competence and due professional care, objectivity, alignment with strategies, risk-based positioning, and continuous improvement.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles'
  },
  {
    id: 'CIA1-B7-004',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which principle of the IIA Code of Ethics addresses the expectation that internal auditors exhibit the highest level of professional objectivity?',
    options: [
      'Integrity',
      'Objectivity',
      'Confidentiality',
      'Competency'
    ],
    correctAnswer: 1,
    explanation: 'The Objectivity principle requires internal auditors to exhibit the highest level of professional objectivity in gathering, evaluating, and communicating information.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA1-B7-005',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'If an internal audit activity is not in conformance with the IIA Standards, the CAE must:',
    options: [
      'Immediately suspend all audit activities',
      'Disclose the nonconformance and its impact to senior management and the board',
      'Keep the nonconformance confidential until corrected',
      'Resign from the position'
    ],
    correctAnswer: 1,
    explanation: 'When nonconformance affects the overall scope or operation of the internal audit activity, the CAE must disclose the nonconformance and its impact to senior management and the board.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards Conformance'
  },
  
  // Domain II: Independence and Objectivity
  {
    id: 'CIA1-B7-006',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The CAE\'s functional reporting to the board enables the internal audit activity to:',
    options: [
      'Avoid all reporting to management',
      'Maintain organizational independence',
      'Set company strategy',
      'Override management decisions'
    ],
    correctAnswer: 1,
    explanation: 'Functional reporting to the board allows the CAE to maintain independence from management, ensuring the internal audit activity can report objectively on all aspects of the organization.',
    topic: 'Independence and Objectivity',
    subtopic: 'Reporting Relationships'
  },
  {
    id: 'CIA1-B7-007',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An auditor holds significant stock in a division being audited. This situation represents:',
    options: [
      'No issue if properly disclosed',
      'A financial interest impairment to objectivity that should preclude participation',
      'An advantage for understanding the business',
      'A routine disclosure matter'
    ],
    correctAnswer: 1,
    explanation: 'Financial interests (direct or significant indirect) in an audited area create an impairment to objectivity. The auditor should not participate in that engagement.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairments'
  },
  {
    id: 'CIA1-B7-008',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Consulting engagements may be accepted even if internal auditors previously provided assurance services for the same area:',
    options: [
      'Never',
      'Only with board approval',
      'Yes, provided objectivity is not impaired and proper disclosure is made',
      'Only after five years'
    ],
    correctAnswer: 2,
    explanation: 'Auditors may provide consulting services after assurance engagements if objectivity is maintained and the nature of consulting is properly disclosed and does not impair objectivity.',
    topic: 'Independence and Objectivity',
    subtopic: 'Consulting Services'
  },
  {
    id: 'CIA1-B7-009',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which of the following is NOT a threat to objectivity?',
    options: [
      'Self-interest threat',
      'Self-review threat',
      'Collaboration threat',
      'Familiarity threat'
    ],
    correctAnswer: 2,
    explanation: 'Common threats to objectivity include self-interest, self-review, familiarity, advocacy, and intimidation. Collaboration is not a recognized threat category.',
    topic: 'Independence and Objectivity',
    subtopic: 'Threats to Objectivity'
  },
  {
    id: 'CIA1-B7-010',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'To enhance organizational independence, which of the following should the board approve?',
    options: [
      'Only the annual budget',
      'The internal audit charter, risk-based audit plan, CAE appointment/removal, and CAE compensation',
      'Only the internal audit charter',
      'Only significant audit findings'
    ],
    correctAnswer: 1,
    explanation: 'To enhance independence, the board should approve the charter, risk-based audit plan, CAE appointment and removal, and CAE remuneration/compensation.',
    topic: 'Independence and Objectivity',
    subtopic: 'Board Responsibilities'
  },

  // Domain III: Proficiency and Due Professional Care
  {
    id: 'CIA1-B7-011',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Continuing professional development is required to:',
    options: [
      'Only meet certification requirements',
      'Maintain and enhance competence',
      'Increase audit budget',
      'Satisfy management preferences'
    ],
    correctAnswer: 1,
    explanation: 'Internal auditors must enhance their knowledge, skills, and other competencies through continuing professional development to maintain proficiency.',
    topic: 'Proficiency and Due Care',
    subtopic: 'Continuing Professional Development'
  },
  {
    id: 'CIA1-B7-012',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When exercising due professional care, internal auditors must consider:',
    options: [
      'Eliminating all possibility of error',
      'The cost of assurance relative to potential benefits',
      'Only financial materiality',
      'Management preferences exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Due professional care requires consideration of the cost of assurance relative to potential benefits, among other factors. It does not require absolute assurance (elimination of all errors).',
    topic: 'Proficiency and Due Care',
    subtopic: 'Due Professional Care'
  },
  
  // Domain IV: Quality Assurance  
  {
    id: 'CIA1-B7-013',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'External quality assessments may be performed as a:',
    options: [
      'Full external assessment only',
      'Self-assessment with independent external validation or full external assessment',
      'Self-assessment only',
      'Peer review without independent validation'
    ],
    correctAnswer: 1,
    explanation: 'External assessments may be a full external assessment or a self-assessment with independent external validation. Both approaches must meet the Standards\' requirements.',
    topic: 'Quality Assurance',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-B7-014',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An external assessor must be:',
    options: [
      'A CPA only',
      'Qualified and from outside the organization with no conflict of interest',
      'An employee of the same industry',
      'Appointed by the CEO'
    ],
    correctAnswer: 1,
    explanation: 'External assessors must be qualified (knowledgeable about internal auditing) and independent from the organization, without conflicts of interest.',
    topic: 'Quality Assurance',
    subtopic: 'Assessor Qualifications'
  },

  // Domain V: Governance, Risk, and Control
  {
    id: 'CIA1-B7-015',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The three lines model describes:',
    options: [
      'Only the role of external audit',
      'How governance bodies, management, and internal audit work together in managing risk',
      'A military command structure',
      'Only financial controls'
    ],
    correctAnswer: 1,
    explanation: 'The three lines model describes roles in governance: first line (management), second line (risk management, compliance functions), and third line (internal audit providing independent assurance).',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Three Lines Model'
  },
  {
    id: 'CIA1-B7-016',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Internal audit may assume ownership and management of risks when:',
    options: [
      'Requested by management for efficiency',
      'Never; this would impair independence',
      'Only in small organizations',
      'When approved by external auditors'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit should not assume management\'s risk ownership or make risk management decisions. Doing so would impair the independence required to provide objective assurance.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Risk Ownership'
  },
  {
    id: 'CIA1-B7-017',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Residual risk is:',
    options: [
      'Risk before any controls are applied',
      'The remaining risk after management has taken action to respond to the risk',
      'The maximum possible risk',
      'Risk that has been eliminated'
    ],
    correctAnswer: 1,
    explanation: 'Residual risk is the risk remaining after management has applied risk responses (controls). Inherent risk is the risk before controls are applied.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Risk Concepts'
  },
  {
    id: 'CIA1-B7-018',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Preventive controls are designed to:',
    options: [
      'Detect errors after they occur',
      'Deter undesirable events from happening',
      'Correct errors after detection',
      'Compensate for control weaknesses'
    ],
    correctAnswer: 1,
    explanation: 'Preventive controls deter undesirable events from occurring. Detective controls identify events after they happen. Corrective controls fix identified problems.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Control Types'
  },
  {
    id: 'CIA1-B7-019',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'The COSO Internal Control Framework identifies five components of internal control. Which is NOT one of them?',
    options: [
      'Control Environment',
      'Risk Assessment',
      'Strategic Planning',
      'Monitoring Activities'
    ],
    correctAnswer: 2,
    explanation: 'COSO\'s five components are: Control Environment, Risk Assessment, Control Activities, Information and Communication, and Monitoring Activities. Strategic Planning is not a component.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'COSO Framework'
  },
  {
    id: 'CIA1-B7-020',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Risk appetite is best defined as:',
    options: [
      'The specific level of variation in performance the organization is willing to accept',
      'The amount and type of risk an organization is willing to pursue and retain',
      'The maximum loss the organization can survive',
      'Zero tolerance for any risk'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the amount and type of risk an organization is willing to pursue and retain. Risk tolerance is the specific acceptable variation around objectives.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Risk Concepts'
  },

  // ===========================================================================
  // CIA PART 2: PRACTICE OF INTERNAL AUDITING
  // ===========================================================================
  
  // Domain I: Managing the Internal Audit Activity
  {
    id: 'CIA2-B7-021',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'The audit universe should include:',
    options: [
      'Only high-risk areas',
      'All possible auditable activities within the organization',
      'Only financial processes',
      'Areas chosen by senior management only'
    ],
    correctAnswer: 1,
    explanation: 'The audit universe represents all possible auditable entities (processes, departments, systems, etc.) within the organization from which the risk-based audit plan is developed.',
    topic: 'Managing Internal Audit',
    subtopic: 'Audit Universe'
  },
  {
    id: 'CIA2-B7-022',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When developing the risk-based audit plan, the CAE should consider:',
    options: [
      'Only prior year findings',
      'Input from senior management and the board regarding their expectations, risk assessments, and priorities',
      'Only regulatory requirements',
      'Audit team preferences'
    ],
    correctAnswer: 1,
    explanation: 'The CAE should consider expectations of senior management, the board, regulators, and other stakeholders, as well as organizational risk assessments and strategic priorities.',
    topic: 'Managing Internal Audit',
    subtopic: 'Planning Considerations'
  },
  {
    id: 'CIA2-B7-023',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Internal audit policies and procedures should be:',
    options: [
      'Only verbal guidance from the CAE',
      'Formal written documents that guide audit activities',
      'Optional for small audit departments',
      'Determined independently by each auditor'
    ],
    correctAnswer: 1,
    explanation: 'The CAE must establish policies and procedures to guide the internal audit activity. These should be formally documented to ensure consistency and quality.',
    topic: 'Managing Internal Audit',
    subtopic: 'Policies and Procedures'
  },
  {
    id: 'CIA2-B7-024',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'If internal audit resources are insufficient for the approved audit plan, the CAE should:',
    options: [
      'Reduce the scope of planned audits without notification',
      'Communicate the impact to senior management and the board',
      'Work overtime to complete all audits',
      'Decline all ad hoc requests'
    ],
    correctAnswer: 1,
    explanation: 'Resource limitations must be communicated to senior management and the board along with the impact on coverage and potential solutions.',
    topic: 'Managing Internal Audit',
    subtopic: 'Resource Management'
  },
  {
    id: 'CIA2-B7-025',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Coordination with external auditors includes all of the following EXCEPT:',
    options: [
      'Sharing audit schedules',
      'Discussing audit scope and coverage',
      'External auditors directing internal audit work',
      'Sharing audit reports and findings as appropriate'
    ],
    correctAnswer: 2,
    explanation: 'Coordination involves sharing information and avoiding duplication, but external auditors do not direct internal audit work. Internal audit maintains independence.',
    topic: 'Managing Internal Audit',
    subtopic: 'External Coordination'
  },

  // Domain II: Planning the Engagement
  {
    id: 'CIA2-B7-026',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Engagement planning should include:',
    options: [
      'Only the audit report template',
      'Objectives, scope, resource allocation, and work program',
      'Only budgeted hours',
      'Names of all interviewees'
    ],
    correctAnswer: 1,
    explanation: 'Engagement planning encompasses establishing objectives, defining scope, allocating resources, developing work programs, and considering relevant risks.',
    topic: 'Planning the Engagement',
    subtopic: 'Planning Elements'
  },
  {
    id: 'CIA2-B7-027',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Consulting engagement objectives should be:',
    options: [
      'Identical to assurance engagement objectives',
      'Consistent with the organization\'s values, strategies, and objectives',
      'Determined solely by the internal auditor',
      'Limited to financial matters'
    ],
    correctAnswer: 1,
    explanation: 'Consulting engagement objectives should be consistent with the organization\'s overall values, strategies, and objectives, addressing governance, risk management, and control processes.',
    topic: 'Planning the Engagement',
    subtopic: 'Consulting Objectives'
  },
  {
    id: 'CIA2-B7-028',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'When planning an engagement, auditors should consider all significant risks:',
    options: [
      'Only if requested by management',
      'Before completing the work program',
      'After completing fieldwork',
      'Only financial risks'
    ],
    correctAnswer: 1,
    explanation: 'Significant risks should be identified during planning to ensure the work program addresses them appropriately. Risk assessment is a key part of engagement planning.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CIA2-B7-029',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'An opening meeting with the auditee typically covers:',
    options: [
      'Final audit conclusions',
      'Engagement objectives, scope, timing, and lines of communication',
      'Only negative findings from prior audits',
      'Staff disciplinary matters'
    ],
    correctAnswer: 1,
    explanation: 'The opening meeting establishes the engagement scope, objectives, timeline, methodology, and communication protocols with the auditee.',
    topic: 'Planning the Engagement',
    subtopic: 'Client Communication'
  },
  {
    id: 'CIA2-B7-030',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Scope limitations imposed by management should be:',
    options: [
      'Accepted without question to maintain good relations',
      'Documented and the potential impact communicated to the board',
      'Ignored if the auditor believes the limitation is unfair',
      'Only noted in internal files'
    ],
    correctAnswer: 1,
    explanation: 'Scope limitations must be documented, and their potential impact on the engagement communicated to the board. Significant limitations should be elevated beyond management.',
    topic: 'Planning the Engagement',
    subtopic: 'Scope Limitations'
  },

  // Domain III: Performing the Engagement
  {
    id: 'CIA2-B7-031',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Information is sufficient when it is:',
    options: [
      'Factual and adequate',
      'Persuasive to a prudent informed person',
      'Preferred by management',
      'Available electronically'
    ],
    correctAnswer: 1,
    explanation: 'Sufficient information is factual, adequate, and convincing enough that a prudent, informed person would reach the same conclusions as the auditor.',
    topic: 'Performing the Engagement',
    subtopic: 'Information Standards'
  },
  {
    id: 'CIA2-B7-032',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Which audit procedure provides the strongest evidence that internal controls are operating effectively?',
    options: [
      'Inquiry of management',
      'Observation and reperformance',
      'Review of policy documents',
      'Analytical review of trends'
    ],
    correctAnswer: 1,
    explanation: 'Reperformance (independently executing the control) provides strong evidence of operating effectiveness. Observation combined with reperformance is stronger than inquiry alone.',
    topic: 'Performing the Engagement',
    subtopic: 'Audit Procedures'
  },
  {
    id: 'CIA2-B7-033',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Attribute sampling is most appropriate when testing for:',
    options: [
      'Total dollar amounts',
      'Whether a control was performed (yes/no)',
      'Average transaction size',
      'Financial statement balances'
    ],
    correctAnswer: 1,
    explanation: 'Attribute sampling tests for the presence or absence of a characteristic (e.g., whether a control was performed). Variables sampling tests for amounts.',
    topic: 'Performing the Engagement',
    subtopic: 'Sampling'
  },
  {
    id: 'CIA2-B7-034',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Flowcharts are particularly useful for:',
    options: [
      'Quantifying financial statement balances',
      'Documenting and understanding the flow of transactions and controls',
      'Calculating sample sizes',
      'Writing audit reports'
    ],
    correctAnswer: 1,
    explanation: 'Flowcharts graphically depict how transactions flow through a process and where controls are applied, helping auditors understand and evaluate the process.',
    topic: 'Performing the Engagement',
    subtopic: 'Documentation Techniques'
  },
  {
    id: 'CIA2-B7-035',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When using technology-based audit techniques, the auditor should ensure:',
    options: [
      'All testing is automated',
      'The validity of data used and proper interpretation of results',
      'No manual testing is performed',
      'Only IT staff operate the tools'
    ],
    correctAnswer: 1,
    explanation: 'When using CAATs or other technology-based tools, auditors must ensure data integrity, understand the tools\' limitations, and properly interpret results.',
    topic: 'Performing the Engagement',
    subtopic: 'Technology Tools'
  },
  {
    id: 'CIA2-B7-036',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Engagement observations should be based on:',
    options: [
      'Auditor opinions only',
      'Comparison of what is (condition) to what should be (criteria)',
      'Historical trends only',
      'Management assertions exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Observations result from comparing conditions (what exists) to criteria (standards, policies, or expectations of what should exist).',
    topic: 'Performing the Engagement',
    subtopic: 'Developing Findings'
  },
  {
    id: 'CIA2-B7-037',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When a material error is discovered after the final report is issued, the CAE should:',
    options: [
      'Issue a corrected report to all parties who received the original',
      'Ignore it if immaterial to current operations',
      'Only inform management if they ask',
      'Wait until the next audit to address it'
    ],
    correctAnswer: 0,
    explanation: 'If a final communication contains a significant error, the CAE must communicate corrected information to all parties who received the original communication.',
    topic: 'Communicating Results',
    subtopic: 'Report Corrections'
  },
  {
    id: 'CIA2-B7-038',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Audit recommendations should be:',
    options: [
      'Vague to allow management flexibility',
      'Specific, practical, and cost-effective to address root causes',
      'Optional in audit reports',
      'Always identical to prior audit recommendations'
    ],
    correctAnswer: 1,
    explanation: 'Recommendations should address the root cause of the finding and be practical, specific, and cost-effective. They should enhance operations and help achieve organizational objectives.',
    topic: 'Communicating Results',
    subtopic: 'Recommendations'
  },
  {
    id: 'CIA2-B7-039',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'The purpose of an exit conference is to:',
    options: [
      'Only deliver bad news',
      'Discuss observations and recommendations with management before issuing the final report',
      'Negotiate audit findings',
      'Celebrate completion of fieldwork'
    ],
    correctAnswer: 1,
    explanation: 'The exit conference allows discussion of findings, recommendations, and action plans with management before the final report, ensuring accuracy and gaining buy-in.',
    topic: 'Communicating Results',
    subtopic: 'Client Communication'
  },
  {
    id: 'CIA2-B7-040',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'An overall opinion on internal controls should only be provided when:',
    options: [
      'Requested by management',
      'Sufficient work has been performed on governance, risk management, and control processes',
      'All controls have been tested',
      'There are no findings to report'
    ],
    correctAnswer: 1,
    explanation: 'An overall opinion requires sufficient work covering the entire scope of governance, risk management, and control processes, and the results must support such an opinion.',
    topic: 'Communicating Results',
    subtopic: 'Overall Opinions'
  },

  // ===========================================================================
  // CIA PART 3: BUSINESS KNOWLEDGE FOR INTERNAL AUDITING
  // ===========================================================================
  
  // Domain I: Business Acumen
  {
    id: 'CIA3-B7-041',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Return on Investment (ROI) is calculated as:',
    options: [
      'Total revenue divided by total assets',
      'Net income divided by average investment',
      'Gross profit divided by sales',
      'Current assets divided by current liabilities'
    ],
    correctAnswer: 1,
    explanation: 'ROI measures the return generated on an investment, calculated as Net Income (or gain from investment) divided by the Cost of Investment.',
    topic: 'Business Acumen',
    subtopic: 'Financial Metrics'
  },
  {
    id: 'CIA3-B7-042',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The Internal Rate of Return (IRR) is the discount rate at which:',
    options: [
      'Net Present Value equals zero',
      'Payback period equals investment cost',
      'Return on assets equals the cost of capital',
      'Cash inflows equal operating expenses'
    ],
    correctAnswer: 0,
    explanation: 'IRR is the discount rate that makes the NPV of all cash flows from a project equal to zero. It represents the expected rate of return from the investment.',
    topic: 'Business Acumen',
    subtopic: 'Capital Budgeting'
  },
  {
    id: 'CIA3-B7-043',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Contribution margin is calculated as:',
    options: [
      'Sales minus all expenses',
      'Sales minus variable costs',
      'Gross profit minus fixed costs',
      'Net income plus depreciation'
    ],
    correctAnswer: 1,
    explanation: 'Contribution margin equals Sales minus Variable Costs. It represents the portion of sales available to cover fixed costs and generate profit.',
    topic: 'Business Acumen',
    subtopic: 'Cost Analysis'
  },
  {
    id: 'CIA3-B7-044',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'The break-even point is where:',
    options: [
      'Total revenue equals net income',
      'Total revenue equals total costs (fixed plus variable)',
      'Variable costs equal fixed costs',
      'Profit margin equals zero percent'
    ],
    correctAnswer: 1,
    explanation: 'The break-even point is where total revenue exactly equals total costs (both fixed and variable), resulting in zero profit or loss.',
    topic: 'Business Acumen',
    subtopic: 'Cost-Volume-Profit'
  },
  {
    id: 'CIA3-B7-045',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Activity-Based Costing (ABC) is most useful when:',
    options: [
      'All products consume resources equally',
      'Overhead costs are a small percentage of total costs',
      'Products and services consume resources differently and overhead is significant',
      'Only direct costs are material'
    ],
    correctAnswer: 2,
    explanation: 'ABC is most beneficial when overhead is significant and products/services consume resources differently. It allocates costs based on activities that drive costs.',
    topic: 'Business Acumen',
    subtopic: 'Cost Accounting'
  },
  {
    id: 'CIA3-B7-046',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Cash flow from operations includes:',
    options: [
      'Cash received from sale of equipment',
      'Cash received from customers and paid to suppliers',
      'Cash received from issuing stock',
      'Cash paid to repay loans'
    ],
    correctAnswer: 1,
    explanation: 'Operating cash flow includes cash from core business activities: receipts from customers, payments to suppliers, wages paid, etc. Investing and financing activities are separate.',
    topic: 'Business Acumen',
    subtopic: 'Cash Flow'
  },
  {
    id: 'CIA3-B7-047',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'SWOT analysis evaluates:',
    options: [
      'Only internal factors',
      'Strengths, Weaknesses, Opportunities, and Threats',
      'Stock values and market trends',
      'System workflows and testing'
    ],
    correctAnswer: 1,
    explanation: 'SWOT analysis evaluates internal factors (Strengths and Weaknesses) and external factors (Opportunities and Threats) to inform strategic planning.',
    topic: 'Business Acumen',
    subtopic: 'Strategic Analysis'
  },
  {
    id: 'CIA3-B7-048',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Porter\'s Five Forces model analyzes:',
    options: [
      'Internal control effectiveness',
      'Industry attractiveness and competitive dynamics',
      'Financial statement accuracy',
      'Employee performance metrics'
    ],
    correctAnswer: 1,
    explanation: 'Porter\'s Five Forces analyzes competitive intensity: threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, and rivalry among existing competitors.',
    topic: 'Business Acumen',
    subtopic: 'Competitive Analysis'
  },
  {
    id: 'CIA3-B7-049',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Accounts receivable turnover measures:',
    options: [
      'How quickly inventory is sold',
      'How efficiently the company collects receivables',
      'The percentage of bad debts',
      'Total credit sales'
    ],
    correctAnswer: 1,
    explanation: 'Accounts receivable turnover (Net Credit Sales / Average Accounts Receivable) measures how efficiently a company collects money from credit customers.',
    topic: 'Business Acumen',
    subtopic: 'Financial Analysis'
  },
  {
    id: 'CIA3-B7-050',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A company\'s Weighted Average Cost of Capital (WACC) represents:',
    options: [
      'The interest rate on short-term loans',
      'The average rate of return required by all providers of capital',
      'The cost of equity only',
      'Historical borrowing costs'
    ],
    correctAnswer: 1,
    explanation: 'WACC is the weighted average of the costs of all capital sources (debt and equity), weighted by their proportion in the capital structure. It represents the minimum required return.',
    topic: 'Business Acumen',
    subtopic: 'Financial Management'
  },

  // Domain II: Information Security
  {
    id: 'CIA3-B7-051',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A disaster recovery plan focuses primarily on:',
    options: [
      'Preventing disasters',
      'Recovering IT systems and data after a disruption',
      'Marketing during crises',
      'Employee relations'
    ],
    correctAnswer: 1,
    explanation: 'A disaster recovery plan focuses on restoring IT infrastructure, systems, and data following a disaster. BCP addresses broader business operations continuity.',
    topic: 'Information Security',
    subtopic: 'Disaster Recovery'
  },
  {
    id: 'CIA3-B7-052',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Hot site, warm site, and cold site refer to:',
    options: [
      'Temperature control in data centers',
      'Types of alternate processing facilities with varying levels of readiness',
      'Security threat levels',
      'Network encryption protocols'
    ],
    correctAnswer: 1,
    explanation: 'These are backup facility types: Hot site (fully operational, immediate recovery), Warm site (partially equipped, hours to recover), Cold site (basic infrastructure, days to recover).',
    topic: 'Information Security',
    subtopic: 'Business Continuity'
  },
  {
    id: 'CIA3-B7-053',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Phishing attacks typically use:',
    options: [
      'Physical break-ins',
      'Deceptive emails or websites to steal credentials or information',
      'Hardware manipulation',
      'Power outages'
    ],
    correctAnswer: 1,
    explanation: 'Phishing uses deceptive emails, messages, or websites that appear legitimate to trick users into revealing credentials, personal information, or installing malware.',
    topic: 'Information Security',
    subtopic: 'Cyber Threats'
  },
  {
    id: 'CIA3-B7-054',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The principle of least privilege means:',
    options: [
      'All users have administrator access',
      'Users receive only the minimum access rights needed to perform their job functions',
      'System privileges are determined by seniority',
      'Everyone has read access to all data'
    ],
    correctAnswer: 1,
    explanation: 'Least privilege grants users the minimum level of access or permissions needed to perform their job functions, reducing the risk of unauthorized access or damage.',
    topic: 'Information Security',
    subtopic: 'Access Control'
  },
  {
    id: 'CIA3-B7-055',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A Virtual Private Network (VPN) is used to:',
    options: [
      'Increase internet speed',
      'Create a secure encrypted connection over a public network',
      'Eliminate the need for firewalls',
      'Replace antivirus software'
    ],
    correctAnswer: 1,
    explanation: 'A VPN creates a secure, encrypted tunnel over public networks (like the internet), allowing secure remote access to organization resources.',
    topic: 'Information Security',
    subtopic: 'Network Security'
  },
  {
    id: 'CIA3-B7-056',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A demilitarized zone (DMZ) in network security is:',
    options: [
      'An area with no security controls',
      'A network segment that separates internal networks from untrusted external networks',
      'A backup power supply',
      'A type of encryption'
    ],
    correctAnswer: 1,
    explanation: 'A DMZ is a network segment between external (public) and internal (private) networks where public-facing services are placed, providing an additional security layer.',
    topic: 'Information Security',
    subtopic: 'Network Architecture'
  },
  {
    id: 'CIA3-B7-057',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Data classification typically includes categories such as:',
    options: [
      'Old, new, and current',
      'Public, internal, confidential, and restricted/secret',
      'Small, medium, and large',
      'Free, licensed, and open-source'
    ],
    correctAnswer: 1,
    explanation: 'Data classification categorizes information by sensitivity: Public (open), Internal (company use), Confidential (limited access), and Restricted/Secret (highly sensitive).',
    topic: 'Information Security',
    subtopic: 'Data Protection'
  },
  {
    id: 'CIA3-B7-058',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Logging and monitoring controls are primarily:',
    options: [
      'Preventive controls',
      'Detective controls',
      'Corrective controls',
      'Directive controls'
    ],
    correctAnswer: 1,
    explanation: 'Logging and monitoring are detective controls that record activities and detect anomalies or security events. They identify issues after they occur.',
    topic: 'Information Security',
    subtopic: 'Security Controls'
  },
  {
    id: 'CIA3-B7-059',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The ISO 27001 standard provides:',
    options: [
      'Financial reporting requirements',
      'A framework for establishing, implementing, and maintaining an information security management system',
      'Project management guidelines',
      'Human resources procedures'
    ],
    correctAnswer: 1,
    explanation: 'ISO 27001 is an international standard for information security management systems (ISMS), providing requirements for establishing, implementing, maintaining, and improving information security.',
    topic: 'Information Security',
    subtopic: 'Security Frameworks'
  },
  {
    id: 'CIA3-B7-060',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Ransomware attacks typically:',
    options: [
      'Slow down network performance only',
      'Encrypt victim data and demand payment for decryption keys',
      'Delete all backup files immediately',
      'Only affect mobile devices'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware encrypts victim\'s files or systems and demands payment (ransom) in exchange for decryption keys to restore access to the data.',
    topic: 'Information Security',
    subtopic: 'Cyber Threats'
  },

  // Domain III: Information Technology
  {
    id: 'CIA3-B7-061',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Infrastructure as a Service (IaaS) provides:',
    options: [
      'Complete software applications',
      'Virtual computing resources such as servers, storage, and networks',
      'Only software development platforms',
      'Physical office equipment'
    ],
    correctAnswer: 1,
    explanation: 'IaaS provides virtualized computing resources (servers, storage, networking) over the internet. Customers manage OS and applications; provider manages hardware.',
    topic: 'Information Technology',
    subtopic: 'Cloud Computing'
  },
  {
    id: 'CIA3-B7-062',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'DevOps is a practice that:',
    options: [
      'Separates development from operations',
      'Combines development and operations to improve deployment speed and quality',
      'Eliminates the need for testing',
      'Only applies to large organizations'
    ],
    correctAnswer: 1,
    explanation: 'DevOps integrates development and IT operations to shorten development cycles, increase deployment frequency, and improve software quality through automation and collaboration.',
    topic: 'Information Technology',
    subtopic: 'Development Practices'
  },
  {
    id: 'CIA3-B7-063',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Input validation controls ensure:',
    options: [
      'Output reports are formatted correctly',
      'Data entered into a system meets defined criteria before processing',
      'System backups are complete',
      'User passwords are complex'
    ],
    correctAnswer: 1,
    explanation: 'Input validation verifies that data entered into a system is accurate, complete, and conforms to expected formats and values before processing.',
    topic: 'Information Technology',
    subtopic: 'Application Controls'
  },
  {
    id: 'CIA3-B7-064',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'A relational database organizes data into:',
    options: [
      'Unstructured documents',
      'Tables with rows and columns linked by relationships',
      'Hierarchical trees only',
      'Sequential files'
    ],
    correctAnswer: 1,
    explanation: 'Relational databases organize data into tables (relations) with rows (records) and columns (fields), linked through relationships using keys.',
    topic: 'Information Technology',
    subtopic: 'Databases'
  },
  {
    id: 'CIA3-B7-065',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Blockchain technology provides:',
    options: [
      'Only cryptocurrency functionality',
      'A distributed, immutable ledger for recording transactions',
      'Centralized database management',
      'Temporary data storage'
    ],
    correctAnswer: 1,
    explanation: 'Blockchain is a distributed ledger technology that records transactions across many computers in a way that makes records difficult to alter, providing transparency and immutability.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  },
  {
    id: 'CIA3-B7-066',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'IT governance ensures:',
    options: [
      'Only IT budget control',
      'IT investments support business objectives and manage IT-related risks',
      'All technology decisions are made by IT department',
      'Maximum technology spending'
    ],
    correctAnswer: 1,
    explanation: 'IT governance ensures IT investments align with business strategy, risks are managed, resources are used responsibly, and IT performance is measured.',
    topic: 'Information Technology',
    subtopic: 'IT Governance'
  },
  {
    id: 'CIA3-B7-067',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Machine learning differs from traditional programming because:',
    options: [
      'It requires no data',
      'Systems learn patterns from data rather than following explicit programmed rules',
      'It only works with numbers',
      'It eliminates the need for testing'
    ],
    correctAnswer: 1,
    explanation: 'Machine learning enables systems to learn from data and improve without being explicitly programmed. Algorithms identify patterns and make predictions based on data.',
    topic: 'Information Technology',
    subtopic: 'Emerging Technology'
  },
  {
    id: 'CIA3-B7-068',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'User Acceptance Testing (UAT) is performed:',
    options: [
      'By developers during coding',
      'By end users to verify the system meets business requirements',
      'By hardware vendors',
      'Only after production implementation'
    ],
    correctAnswer: 1,
    explanation: 'UAT is performed by end users or business representatives to verify the system meets business requirements and is ready for production deployment.',
    topic: 'Information Technology',
    subtopic: 'System Development'
  },
  {
    id: 'CIA3-B7-069',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Version control systems are used to:',
    options: [
      'Control user access',
      'Track and manage changes to code and documents over time',
      'Encrypt data at rest',
      'Monitor network traffic'
    ],
    correctAnswer: 1,
    explanation: 'Version control systems track changes to files over time, allowing teams to collaborate, maintain history, and revert to previous versions when needed.',
    topic: 'Information Technology',
    subtopic: 'Development Tools'
  },
  {
    id: 'CIA3-B7-070',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'API (Application Programming Interface) security risks include:',
    options: [
      'Only physical access concerns',
      'Broken authentication, injection attacks, and excessive data exposure',
      'Hardware failures only',
      'Power supply issues'
    ],
    correctAnswer: 1,
    explanation: 'API security risks include authentication weaknesses, injection vulnerabilities, excessive data exposure, lack of rate limiting, and broken access controls.',
    topic: 'Information Technology',
    subtopic: 'Application Security'
  },

  // Domain IV: Fraud
  {
    id: 'CIA3-B7-071',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Shell companies are often used in fraud schemes to:',
    options: [
      'Improve tax efficiency legally',
      'Conceal the identity of parties involved in fraudulent transactions',
      'Increase operational efficiency',
      'Enhance customer service'
    ],
    correctAnswer: 1,
    explanation: 'Shell companies are entities with no real operations used to disguise fund movements, hide asset ownership, or conceal the parties involved in fraudulent schemes.',
    topic: 'Fraud',
    subtopic: 'Fraud Schemes'
  },
  {
    id: 'CIA3-B7-072',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Lapping is a fraud scheme involving:',
    options: [
      'Falsifying inventory records',
      'Covering shortages by applying subsequent customer payments to earlier receivables',
      'Submitting fake expense reports',
      'Creating fictitious vendors'
    ],
    correctAnswer: 1,
    explanation: 'Lapping involves stealing customer payments and covering the shortage by applying subsequent receipts from other customers to the earlier accounts, creating a cycle of theft.',
    topic: 'Fraud',
    subtopic: 'Fraud Schemes'
  },
  {
    id: 'CIA3-B7-073',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Kickback schemes typically involve:',
    options: [
      'Inventory theft',
      'Employees receiving payments from vendors in exchange for favorable treatment',
      'Falsifying time records',
      'Stealing cash from registers'
    ],
    correctAnswer: 1,
    explanation: 'Kickbacks are payments from vendors to employees in exchange for advantages such as inflated pricing, unnecessary purchases, or preferential contract awards.',
    topic: 'Fraud',
    subtopic: 'Corruption'
  },
  {
    id: 'CIA3-B7-074',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'The "fraud diamond" adds which element to the fraud triangle?',
    options: [
      'Greed',
      'Capability',
      'Access',
      'Timing'
    ],
    correctAnswer: 1,
    explanation: 'The fraud diamond adds Capability (the person\'s ability to commit fraud) to the traditional fraud triangle elements of Pressure, Opportunity, and Rationalization.',
    topic: 'Fraud',
    subtopic: 'Fraud Theory'
  },
  {
    id: 'CIA3-B7-075',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Revenue recognition fraud may involve:',
    options: [
      'Recording sales too conservatively',
      'Recording fictitious sales or premature recognition of revenue',
      'Delaying all revenue recognition',
      'Underreporting expenses'
    ],
    correctAnswer: 1,
    explanation: 'Revenue recognition fraud involves recording revenue improperly - either fictitious sales, premature recognition, or holding periods open to record future transactions.',
    topic: 'Fraud',
    subtopic: 'Financial Statement Fraud'
  },
  {
    id: 'CIA3-B7-076',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Ghost employees in payroll fraud are:',
    options: [
      'Part-time workers',
      'Fictitious employees added to the payroll to steal funds',
      'Terminated employees receiving final pay',
      'Employees on leave'
    ],
    correctAnswer: 1,
    explanation: 'Ghost employees are fictitious individuals added to the payroll system. Payments for non-existent employees are diverted to the fraudster.',
    topic: 'Fraud',
    subtopic: 'Payroll Fraud'
  },
  {
    id: 'CIA3-B7-077',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Analysis of Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA) manipulation may reveal:',
    options: [
      'Only positive trends',
      'Improper capitalization of expenses to inflate operating results',
      'Conservative accounting only',
      'Strong liquidity'
    ],
    correctAnswer: 1,
    explanation: 'EBITDA manipulation may involve improperly capitalizing expenses (moving them from the income statement to balance sheet) to inflate operating performance metrics.',
    topic: 'Fraud',
    subtopic: 'Financial Statement Fraud'
  },
  {
    id: 'CIA3-B7-078',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Money laundering typically occurs in which three stages?',
    options: [
      'Transfer, deposit, withdrawal',
      'Placement, layering, integration',
      'Setup, execution, completion',
      'Planning, hiding, investing'
    ],
    correctAnswer: 1,
    explanation: 'Money laundering has three stages: Placement (entering the financial system), Layering (disguising the trail through complex transactions), and Integration (legitimate-looking funds re-enter the economy).',
    topic: 'Fraud',
    subtopic: 'Money Laundering'
  },
  {
    id: 'CIA3-B7-079',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Data mining for fraud detection can identify:',
    options: [
      'Only known fraud schemes',
      'Unusual patterns, anomalies, and outliers that may indicate fraud',
      'Only financial statement fraud',
      'Future fraud with certainty'
    ],
    correctAnswer: 1,
    explanation: 'Data mining techniques can identify unusual patterns, relationships, and anomalies in large datasets that may indicate fraudulent activity, though findings require further investigation.',
    topic: 'Fraud',
    subtopic: 'Fraud Detection'
  },
  {
    id: 'CIA3-B7-080',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Entity-level controls that are particularly important for fraud prevention include:',
    options: [
      'Only password controls',
      'Tone at the top, ethics programs, and fraud risk assessment',
      'Physical security only',
      'IT governance exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Entity-level controls affecting fraud prevention include management\'s ethical tone, code of conduct, fraud risk assessment, whistleblower programs, and governance structures.',
    topic: 'Fraud',
    subtopic: 'Fraud Prevention'
  },

  // Additional Business/Financial Questions
  {
    id: 'CIA3-B7-081',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Operating leverage refers to:',
    options: [
      'The use of debt financing',
      'The proportion of fixed costs in the cost structure affecting profit sensitivity',
      'The ratio of current assets to current liabilities',
      'Employee productivity measures'
    ],
    correctAnswer: 1,
    explanation: 'Operating leverage reflects the proportion of fixed costs in the cost structure. High operating leverage means profits are more sensitive to changes in sales volume.',
    topic: 'Business Acumen',
    subtopic: 'Financial Management'
  },
  {
    id: 'CIA3-B7-082',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'A horizontal merger involves:',
    options: [
      'A company and its supplier',
      'Companies in the same industry at the same stage of production',
      'A company and its customer',
      'Unrelated businesses'
    ],
    correctAnswer: 1,
    explanation: 'A horizontal merger combines companies in the same industry at the same production stage (competitors). Vertical mergers involve supply chain partners.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Strategy'
  },
  {
    id: 'CIA3-B7-083',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Just-in-Time (JIT) inventory management aims to:',
    options: [
      'Maximize inventory levels',
      'Minimize inventory by receiving goods only when needed for production',
      'Stockpile raw materials',
      'Increase storage costs'
    ],
    correctAnswer: 1,
    explanation: 'JIT minimizes inventory holding costs by synchronizing material deliveries with production requirements, receiving goods only when needed.',
    topic: 'Business Acumen',
    subtopic: 'Operations Management'
  },
  {
    id: 'CIA3-B7-084',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Stakeholder theory suggests that organizations should consider:',
    options: [
      'Only shareholder interests',
      'The interests of all stakeholders including employees, customers, suppliers, and communities',
      'Only management interests',
      'Only regulatory requirements'
    ],
    correctAnswer: 1,
    explanation: 'Stakeholder theory holds that organizations should consider the interests of all stakeholders, not just shareholders, including employees, customers, suppliers, and communities.',
    topic: 'Business Acumen',
    subtopic: 'Corporate Governance'
  },
  {
    id: 'CIA3-B7-085',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Currency hedging is used to:',
    options: [
      'Speculate on currency movements',
      'Reduce exposure to foreign exchange rate fluctuations',
      'Maximize exposure to currency risk',
      'Avoid all international transactions'
    ],
    correctAnswer: 1,
    explanation: 'Currency hedging uses financial instruments (forwards, options, swaps) to reduce or offset the risk of adverse foreign exchange rate movements.',
    topic: 'Business Acumen',
    subtopic: 'Risk Management'
  },

  // Additional Audit/Control Questions
  {
    id: 'CIA2-B7-086',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Continuous auditing techniques are most valuable for:',
    options: [
      'Annual compliance reviews only',
      'Providing ongoing assurance on high-risk, high-volume processes',
      'Replacing all traditional auditing',
      'One-time special projects'
    ],
    correctAnswer: 1,
    explanation: 'Continuous auditing provides ongoing monitoring of high-risk, high-volume processes, enabling timely identification of control issues and anomalies.',
    topic: 'Performing the Engagement',
    subtopic: 'Continuous Auditing'
  },
  {
    id: 'CIA1-B7-087',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When providing consulting services, internal auditors should:',
    options: [
      'Ignore independence requirements',
      'Not assume management responsibilities that would impair independence',
      'Take ownership of recommended changes',
      'Guarantee success of recommendations'
    ],
    correctAnswer: 1,
    explanation: 'Even in consulting engagements, internal auditors must not assume management responsibilities. They provide advice, but management is responsible for decisions and implementation.',
    topic: 'Independence and Objectivity',
    subtopic: 'Consulting Services'
  },
  {
    id: 'CIA2-B7-088',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Risk mapping visualizes risks by:',
    options: [
      'Geographic location only',
      'Plotting risks based on likelihood and impact to prioritize responses',
      'Chronological order of occurrence',
      'Employee department'
    ],
    correctAnswer: 1,
    explanation: 'Risk mapping (or heat maps) plots risks on a grid based on likelihood (probability) and impact (consequence) to visualize and prioritize risks for response.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CIA1-B7-089',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Control objectives should be:',
    options: [
      'Vague and general',
      'Specific, measurable, and aligned with organizational objectives',
      'Determined solely by auditors',
      'Focused only on efficiency'
    ],
    correctAnswer: 1,
    explanation: 'Control objectives should be specific, measurable, and aligned with business objectives. They define what the control is intended to achieve.',
    topic: 'Governance, Risk, and Control',
    subtopic: 'Control Concepts'
  },
  {
    id: 'CIA2-B7-090',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When management disagrees with audit findings, the auditor should:',
    options: [
      'Remove the finding from the report',
      'Document management\'s response and, if appropriate, include the auditor\'s perspective',
      'Escalate immediately to regulators',
      'Abandon the engagement'
    ],
    correctAnswer: 1,
    explanation: 'If management disagrees, their response should be documented. If agreement cannot be reached, both positions may be included in the report with the matter escalated as appropriate.',
    topic: 'Communicating Results',
    subtopic: 'Management Responses'
  },

  // Final questions
  {
    id: 'CIA3-B7-091',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Total Quality Management (TQM) emphasizes:',
    options: [
      'Quality inspection at the end only',
      'Continuous improvement and involvement of all employees in quality',
      'Maintaining status quo',
      'Quality only in production'
    ],
    correctAnswer: 1,
    explanation: 'TQM is a management philosophy emphasizing continuous improvement, customer focus, and involvement of all employees in maintaining and improving quality.',
    topic: 'Business Acumen',
    subtopic: 'Quality Management'
  },
  {
    id: 'CIA3-B7-092',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'Six Sigma methodology aims to:',
    options: [
      'Accept a 50% defect rate',
      'Reduce defects to fewer than 3.4 per million opportunities',
      'Increase process variation',
      'Eliminate all quality controls'
    ],
    correctAnswer: 1,
    explanation: 'Six Sigma is a disciplined methodology for reducing defects to no more than 3.4 per million opportunities, using data-driven approaches like DMAIC.',
    topic: 'Business Acumen',
    subtopic: 'Process Improvement'
  },
  {
    id: 'CIA1-B7-093',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Integrated auditing combines:',
    options: [
      'Only financial auditing',
      'Assessment of financial, operational, compliance, and strategic aspects in a unified approach',
      'Only IT auditing',
      'Only compliance auditing'
    ],
    correctAnswer: 1,
    explanation: 'Integrated auditing takes a holistic approach, examining financial, operational, compliance, IT, and strategic aspects together rather than in isolation.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Audit Approaches'
  },
  {
    id: 'CIA2-B7-094',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Root cause analysis seeks to identify:',
    options: [
      'Only symptoms of problems',
      'The underlying cause that, if addressed, would prevent recurrence',
      'Who to blame for issues',
      'Only immediate fixes'
    ],
    correctAnswer: 1,
    explanation: 'Root cause analysis identifies the fundamental underlying cause of a problem. Addressing the root cause prevents recurrence, unlike treating only symptoms.',
    topic: 'Performing the Engagement',
    subtopic: 'Analysis Techniques'
  },
  {
    id: 'CIA3-B7-095',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Environmental, Social, and Governance (ESG) factors are important because:',
    options: [
      'They are purely optional',
      'They can affect long-term value creation and stakeholder relations',
      'They only matter to non-profit organizations',
      'They focus only on environmental issues'
    ],
    correctAnswer: 1,
    explanation: 'ESG factors increasingly affect investment decisions, stakeholder relations, regulatory requirements, and long-term organizational sustainability and value creation.',
    topic: 'Business Acumen',
    subtopic: 'Sustainability'
  },
  {
    id: 'CIA1-B7-096',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When internal audit relies on the work of other assurance providers, the CAE must:',
    options: [
      'Accept all work without review',
      'Ensure competency, objectivity, and due professional care of those providers',
      'Avoid all reliance',
      'Only rely on external audit'
    ],
    correctAnswer: 1,
    explanation: 'Before relying on others\' work, the CAE must assess their competency, objectivity, and due professional care, and consider the scope and methodology used.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Reliance on Others'
  },
  {
    id: 'CIA2-B7-097',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Audit efficiency can be improved through:',
    options: [
      'Reducing all testing',
      'Leveraging technology, focusing on risks, and avoiding redundant procedures',
      'Eliminating documentation',
      'Skipping planning phases'
    ],
    correctAnswer: 1,
    explanation: 'Audit efficiency improves through technology use, risk-based focus, elimination of redundant procedures, effective planning, and leveraging prior work appropriately.',
    topic: 'Managing Internal Audit',
    subtopic: 'Audit Efficiency'
  },
  {
    id: 'CIA3-B7-098',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Third-party risk management addresses:',
    options: [
      'Only IT vendors',
      'Risks arising from relationships with vendors, contractors, and business partners',
      'Only financial institutions',
      'Internal employee risks'
    ],
    correctAnswer: 1,
    explanation: 'Third-party risk management covers risks from all external relationships including vendors, suppliers, contractors, and business partners across all functions.',
    topic: 'Business Acumen',
    subtopic: 'Vendor Management'
  },
  {
    id: 'CIA2-B7-099',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'The concept of "combined assurance" means:',
    options: [
      'All audit work is combined into one report',
      'Coordinating assurance activities across all assurance providers to optimize coverage and efficiency',
      'Only internal and external audit working together',
      'Eliminating all assurance activities'
    ],
    correctAnswer: 1,
    explanation: 'Combined assurance coordinates and integrates all assurance activities (internal audit, external audit, management, compliance, etc.) to optimize coverage and reduce gaps and overlaps.',
    topic: 'Managing Internal Audit',
    subtopic: 'Assurance Coordination'
  },
  {
    id: 'CIA1-B7-100',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Adding value through internal audit means:',
    options: [
      'Only reducing costs',
      'Improving opportunities to achieve organizational objectives and manage risks',
      'Only finding problems',
      'Replacing management decision-making'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit adds value by improving opportunities to achieve organizational objectives, identifying operational improvements, and reducing risk exposure through assurance and consulting.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Value of Internal Audit'
  }
];
