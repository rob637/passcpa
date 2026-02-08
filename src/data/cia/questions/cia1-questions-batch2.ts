/**
 * CIA Part 1: Essentials of Internal Auditing - Additional Questions (Batch 1)
 * Questions CIA1-071 through CIA1-170
 * 
 * Domain breakdown:
 * - Domain I: Foundations of Internal Auditing (40%)
 * - Domain II: Independence and Objectivity (15%)
 * - Domain III: Proficiency and Due Professional Care (15%)
 * - Domain IV: Quality Assurance and Improvement Program (10%)
 * - Domain V: Governance, Risk Management, and Control (20%)
 */

import { Question } from '../../../types';

export const CIA1_QUESTIONS_BATCH2: Question[] = [
  // ============================================================================
  // DOMAIN I: FOUNDATIONS OF INTERNAL AUDITING (40%)
  // ============================================================================
  
  
  {
    id: 'CIA1-072',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal auditor is asked to review policies before implementation rather than after. This service is best described as:',
    options: [
      'Assurance service',
      'Compliance audit',
      'Consulting service',
      'Financial audit'
    ],
    correctAnswer: 2,
    explanation: 'Reviewing policies before implementation is an advisory activity with scope agreed upon with the client, which is the definition of a consulting service. It adds value without the three-party structure of assurance services.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Types of Services'
  },
  {
    id: 'CIA1-073',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to the IIA Code of Ethics, internal auditors shall be prudent in the use and protection of information acquired in the course of their duties. This relates to which principle?',
    options: [
      'Integrity',
      'Objectivity',
      'Confidentiality',
      'Competency'
    ],
    correctAnswer: 2,
    explanation: 'Confidentiality requires internal auditors to be prudent in the use and protection of information and not use information for personal gain or in ways contrary to law or detrimental to the organization.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  
  {
    id: 'CIA1-075',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which statement best describes the difference between the Mission of Internal Audit and the Definition of Internal Auditing?',
    options: [
      'There is no difference; they are the same',
      'The Mission describes what IA does; the Definition describes how IA does it',
      'The Mission is aspirational; the Definition is the official statement of what IA is',
      'The Mission is mandatory; the Definition is recommended'
    ],
    correctAnswer: 2,
    explanation: 'The Mission is an aspirational statement about the purpose of internal audit (to enhance and protect organizational value). The Definition of Internal Auditing is the formal, mandatory statement defining what internal auditing is as a profession.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Mission and Definition'
  },
  {
    id: 'CIA1-076',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'During an audit, the CAE receives a request from management to immediately cease work on a particular area. The CAE should:',
    options: [
      'Comply immediately since management directs administrative activities',
      'Refuse and continue the audit regardless of the request',
      'Evaluate the request, discuss with the board if it represents a scope limitation, and document the situation',
      'Notify external auditors and regulatory authorities'
    ],
    correctAnswer: 2,
    explanation: 'The CAE should evaluate whether this represents a scope limitation. Standard 1110 indicates that the CAE should communicate with the board about scope limitations. The matter should be documented regardless of the outcome.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Independence and Authority'
  },
  {
    id: 'CIA1-077',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which Core Principle emphasizes that internal audit should focus on future risks and not just current issues?',
    options: [
      'Provides risk-based assurance',
      'Is insightful, proactive, and future-focused',
      'Promotes organizational improvement',
      'Aligns with strategies, objectives, and risks'
    ],
    correctAnswer: 1,
    explanation: 'The Core Principle "Is insightful, proactive, and future-focused" emphasizes that internal auditors should consider future impact and emerging issues, not just historical or current matters.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles'
  },
  {
    id: 'CIA1-078',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The internal audit activity should be positioned to:',
    options: [
      'Report directly to operations management',
      'Be part of the finance department',
      'Fulfill its responsibilities with organizational independence',
      'Answer only to external auditors'
    ],
    correctAnswer: 2,
    explanation: 'The internal audit activity must be positioned within the organization to allow independence. This means the CAE reports functionally to the board and has sufficient organizational status to accomplish objectives.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Organizational Positioning'
  },
  {
    id: 'CIA1-079',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'An internal auditor conducts research and training but never audits areas where they previously worked. This principle BEST supports:',
    options: [
      'Proficiency',
      'Due professional care',
      'Individual objectivity',
      'Integrity'
    ],
    correctAnswer: 2,
    explanation: 'Avoiding auditing areas where one previously worked supports individual objectivity by preventing conflicts of interest and bias from prior responsibilities in that area.',
    topic: 'Independence and Objectivity',
    subtopic: 'Individual Objectivity'
  },
  {
    id: 'CIA1-080',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to Standard 1000, the internal audit charter must include all of the following EXCEPT:',
    options: [
      'The purpose of the internal audit activity',
      'The authority of the internal audit activity',
      'Specific audit procedures to be used',
      'The responsibility of the internal audit activity'
    ],
    correctAnswer: 2,
    explanation: 'The charter defines purpose, authority, and responsibility (Standard 1000). It does not include specific audit procedures, which are determined at the engagement level based on risk assessment and engagement objectives.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Charter'
  },

  // ============================================================================
  // DOMAIN II: INDEPENDENCE AND OBJECTIVITY (15%)
  // ============================================================================
  
  {
    id: 'CIA1-081',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'An internal auditor who recently transferred from the treasury department is assigned to audit treasury operations. Which statement is most appropriate?',
    options: [
      'The auditor should proceed since they have relevant expertise',
      'The auditor\'s objectivity may be impaired and this should be disclosed',
      'The auditor should decline any involvement in treasury',
      'The auditor should complete the audit but have it reviewed by someone else'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1130 indicates that if objectivity is impaired in fact or appearance, the details must be disclosed. Having recently worked in treasury creates a potential impairment that should be disclosed to appropriate parties.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairment'
  },
  {
    id: 'CIA1-082',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Functional reporting of the CAE to the board includes all of the following EXCEPT:',
    options: [
      'Approving the internal audit charter',
      'Approving the risk-based audit plan',
      'Managing day-to-day internal audit operations',
      'Approving the CAE\'s appointment and removal'
    ],
    correctAnswer: 2,
    explanation: 'Day-to-day operations are an administrative matter, handled through reporting to senior management (e.g., CEO). Functional reporting to the board includes approving charter, plan, budget, and CAE appointment/removal.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  },
  {
    id: 'CIA1-083',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'The CAE has been asked to assume responsibility for the compliance function in addition to internal audit. According to the Standards, the CAE should:',
    options: [
      'Decline because this impairs independence',
      'Accept only if compliance staff report to someone else',
      'Accept with safeguards in place and disclose to the board',
      'Accept only if the board provides written approval'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1112 allows the CAE to have roles beyond internal auditing but requires safeguards to limit impairments. The CAE should accept with appropriate safeguards (like independent review of compliance) and disclose to the board.',
    topic: 'Independence and Objectivity',
    subtopic: 'CAE Roles Beyond IA'
  },
  {
    id: 'CIA1-084',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'An internal auditor receives a holiday gift valued at $500 from a department that was recently audited. The auditor should:',
    options: [
      'Accept the gift as it is customary during holidays',
      'Decline the gift or disclose it to supervision',
      'Accept only if the audit results were favorable',
      'Accept but refrain from future audits of that department'
    ],
    correctAnswer: 1,
    explanation: 'The Code of Ethics requires internal auditors to not accept anything that may impair or appear to impair professional judgment. A $500 gift could create the appearance of impairment and should be declined or disclosed.',
    topic: 'Independence and Objectivity',
    subtopic: 'Conflict of Interest'
  },
  {
    id: 'CIA1-085',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which of the following best distinguishes independence from objectivity?',
    options: [
      'Independence is individual; objectivity is organizational',
      'Independence is organizational; objectivity is individual',
      'Both are individual characteristics',
      'Both are organizational characteristics'
    ],
    correctAnswer: 1,
    explanation: 'Independence refers to the freedom from conditions that threaten the internal audit ACTIVITY (organizational). Objectivity is an unbiased mental attitude of the INDIVIDUAL auditor. This distinction is critical to understand.',
    topic: 'Independence and Objectivity',
    subtopic: 'Independence vs Objectivity'
  },
  {
    id: 'CIA1-086',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'According to Standard 1111, the CAE must:',
    options: [
      'Report all findings directly to external auditors',
      'Communicate and interact directly with the board',
      'Obtain board approval for all audit engagements',
      'Have board members review all audit reports'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1111 requires direct interaction between the CAE and the board. This supports independence by ensuring the CAE can communicate without filtering through management.',
    topic: 'Independence and Objectivity',
    subtopic: 'Direct Interaction with Board'
  },
  {
    id: 'CIA1-087',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Internal auditors may provide assurance services where they previously performed consulting services if:',
    options: [
      'Never - this is always prohibited',
      'At least one year has passed since the consulting engagement',
      'The nature of the consulting did not impair objectivity',
      'The board provides specific written approval'
    ],
    correctAnswer: 2,
    explanation: 'Internal auditors may provide assurance services in an area where they previously provided consulting if the nature of the consulting did not impair their objectivity. The key consideration is whether objectivity is actually impaired.',
    topic: 'Independence and Objectivity',
    subtopic: 'Consulting and Assurance'
  },
  {
    id: 'CIA1-088',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'If resource limitations prevent the internal audit activity from completing the approved audit plan, the CAE should:',
    options: [
      'Simply skip lower-priority audits',
      'Communicate the impact to senior management and the board',
      'Outsource all remaining audits',
      'Request external auditors to complete the audits'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2020 requires the CAE to communicate the impact of resource limitations to senior management and the board. This allows appropriate oversight and informed decision-making about audit coverage.',
    topic: 'Independence and Objectivity',
    subtopic: 'Resource Limitations'
  },
  {
    id: 'CIA1-089',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'An impairment to objectivity includes:',
    options: [
      'Auditing an area where the auditor has never worked',
      'Having appropriate training for the engagement',
      'Restrictions on access to records or personnel',
      'Using computer-assisted audit techniques'
    ],
    correctAnswer: 2,
    explanation: 'Restrictions on access to records, personnel, or properties represent an impairment that must be disclosed (Standard 1130). The other options do not represent impairments to objectivity.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairment'
  },
  {
    id: 'CIA1-090',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The CAE must confirm organizational independence to the board at least:',
    options: [
      'Monthly',
      'Quarterly',
      'Annually',
      'Every five years'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1110 requires the CAE to confirm the organizational independence of the internal audit activity to the board at least annually.',
    topic: 'Independence and Objectivity',
    subtopic: 'Organizational Independence'
  },

  // ============================================================================
  // DOMAIN III: PROFICIENCY AND DUE PROFESSIONAL CARE (15%)
  // ============================================================================
  
  {
    id: 'CIA1-091',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to Standard 1210, internal auditors must possess knowledge, skills, and competencies. If an engagement requires expertise the internal audit activity does not possess, the CAE should:',
    options: [
      'Decline the engagement',
      'Obtain competent advice and assistance',
      'Report this limitation to the board and do nothing',
      'Train existing staff during the engagement'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1210 states that the internal audit activity collectively must possess or obtain the knowledge, skills, and competencies needed. If expertise is lacking, the CAE should obtain competent advice and assistance.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Proficiency'
  },
  {
    id: 'CIA1-092',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Which of the following best describes due professional care?',
    options: [
      'Absolute assurance that all errors and fraud will be detected',
      'Care and skill expected of a reasonably prudent internal auditor',
      'Guarantee that audit objectives will always be achieved',
      'Infallibility in audit conclusions'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1220 defines due professional care as the care and skill expected of a reasonably prudent and competent internal auditor. It explicitly states that due professional care does not imply infallibility.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care'
  },
  {
    id: 'CIA1-093',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Standard 1210.A1 requires internal auditors to have sufficient knowledge to evaluate the risk of fraud and:',
    options: [
      'Detect all instances of fraud',
      'Investigate suspected fraud independently',
      'The manner in which fraud risk is managed',
      'Prosecute fraud perpetrators'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1210.A1 requires internal auditors to have sufficient knowledge to evaluate fraud risk AND the manner in which it is managed by the organization. It does not require detecting all fraud or conducting investigations.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Fraud Knowledge'
  },
  {
    id: 'CIA1-094',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Continuing professional development is:',
    options: [
      'Recommended but not required',
      'Required by the Standards',
      'Only necessary for CIAs',
      'Only for new internal auditors'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1230 requires internal auditors to enhance their knowledge, skills, and competencies through continuing professional development. This is mandatory, not optional.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'CPD'
  },
  {
    id: 'CIA1-095',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'When exercising due professional care, internal auditors should consider all of the following EXCEPT:',
    options: [
      'Extent of work needed to achieve engagement objectives',
      'Complexity and materiality of matters',
      'Guaranteeing all risks will be identified',
      'Cost of assurance relative to potential benefits'
    ],
    correctAnswer: 2,
    explanation: 'Due professional care does not guarantee all risks will be identified. Internal auditors consider extent of work, complexity, materiality, probability of errors, and cost-benefit ratios when exercising due care.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care'
  },
  {
    id: 'CIA1-096',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal auditor without IT expertise is assigned to audit cybersecurity. The auditor should:',
    options: [
      'Decline the assignment',
      'Complete the audit using only general audit skills',
      'Seek appropriate assistance or training before proceeding',
      'Document the limitation and proceed anyway'
    ],
    correctAnswer: 2,
    explanation: 'The auditor should seek assistance from someone with IT expertise or obtain training. Standard 1210 requires having the necessary competencies, but allows obtaining them through assistance if the auditor lacks them personally.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Proficiency'
  },
  {
    id: 'CIA1-097',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Professional certifications such as CIA demonstrate:',
    options: [
      'Complete mastery of all audit topics',
      'Proficiency and commitment to the profession',
      'Guaranteed competence in every audit area',
      'Immunity from ethical violations'
    ],
    correctAnswer: 1,
    explanation: 'Professional certifications like CIA demonstrate proficiency and commitment to the profession. They do not guarantee complete mastery of all topics or ensure competence in every specific area.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Professional Certifications'
  },
  {
    id: 'CIA1-098',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The probability of significant errors, fraud, or noncompliance should be considered when:',
    options: [
      'Writing the final audit report',
      'Exercising due professional care during engagements',
      'Developing the internal audit charter',
      'Conducting external assessments'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1220.A1 requires internal auditors to consider the probability of significant errors, fraud, noncompliance, and other exposures when exercising due professional care.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care'
  },
  {
    id: 'CIA1-099',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Internal auditors must have sufficient knowledge to identify indicators of fraud but are NOT expected to:',
    options: [
      'Evaluate how fraud risk is managed',
      'Be alert to opportunities for fraud',
      'Have expertise equivalent to fraud examiners',
      'Consider fraud risk in audit planning'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1210.A2 clarifies that internal auditors are not expected to have the expertise of those whose primary responsibility is fraud detection and investigation. They should recognize indicators but need not be fraud specialists.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Fraud Knowledge'
  },
  {
    id: 'CIA1-100',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When evaluating IT controls, internal auditors must:',
    options: [
      'Be certified in IT auditing',
      'Have sufficient knowledge of key IT risks and controls',
      'Program their own audit software',
      'Have managed IT operations previously'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1210.A3 requires internal auditors to have sufficient knowledge of key IT risks and controls and available technology-based audit techniques. Certification or prior IT management is not required.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'IT Knowledge'
  },

  // ============================================================================
  // DOMAIN IV: QUALITY ASSURANCE AND IMPROVEMENT PROGRAM (10%)
  // ============================================================================
  
  {
    id: 'CIA1-101',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The Quality Assurance and Improvement Program (QAIP) must include:',
    options: [
      'Only internal assessments',
      'Only external assessments',
      'Both internal and external assessments',
      'Either internal or external assessments, at CAE discretion'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1310 requires the QAIP to include both internal assessments (ongoing monitoring and periodic self-assessments) and external assessments.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'QAIP Requirements'
  },
  {
    id: 'CIA1-102',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'External assessments of the internal audit activity must be conducted at least every:',
    options: [
      'Year',
      'Three years',
      'Five years',
      'Seven years'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1312 requires external assessments to be conducted at least once every five years by a qualified, independent assessor or assessment team from outside the organization.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-103',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Internal assessments of the internal audit activity include:',
    options: [
      'Only ongoing monitoring',
      'Only periodic self-assessments',
      'Both ongoing monitoring and periodic self-assessments',
      'External review only'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1311 states that internal assessments must include ongoing monitoring of performance AND periodic self-assessments or assessments by others with sufficient knowledge of internal audit practices.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Internal Assessments'
  },
  {
    id: 'CIA1-104',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'A self-assessment with independent external validation (SAIV) is acceptable as an external assessment if:',
    options: [
      'It is never acceptable; only full external assessments are allowed',
      'The CAE approves it',
      'A qualified, independent external assessor validates the results',
      'The board specifically requests it'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1312 interpretation indicates that external assessments may be accomplished through a self-assessment with independent external validation. The key is that a qualified, independent external assessor validates the results.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-105',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The CAE should discuss all of the following with the board regarding external assessments EXCEPT:',
    options: [
      'The form of the external assessment',
      'The frequency of the external assessment',
      'The specific methodology to be used by assessors',
      'The qualifications and independence of the assessor'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1312 requires the CAE to discuss form, frequency, and assessor qualifications/independence with the board. The specific methodology is determined by the assessor, not discussed with the board.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'External Assessments'
  },
  {
    id: 'CIA1-106',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Ongoing monitoring in the context of internal assessments refers to:',
    options: [
      'Annual reviews of the internal audit department',
      'Day-to-day supervision, review, and measurement activities',
      'External consultant reviews',
      'Board oversight of audit activities'
    ],
    correctAnswer: 1,
    explanation: 'Ongoing monitoring is an integral part of day-to-day supervision, review, and measurement of the internal audit activity. It uses processes and tools incorporated into routine management practices.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Internal Assessments'
  },
  
  {
    id: 'CIA1-108',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal audit activity may claim conformance with the Standards only if:',
    options: [
      'The CAE has CIA certification',
      'QAIP results support this statement',
      'External auditors approve',
      'The board provides written authorization'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1321 states that claiming conformance with the Standards is appropriate only if QAIP results support this claim. The QAIP provides the evidence needed to justify conformance statements.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Conformance Statements'
  },
  {
    id: 'CIA1-109',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'When nonconformance with the Standards impacts the internal audit activity, the CAE must:',
    options: [
      'Immediately notify regulators',
      'Disclose the nonconformance and impact to senior management and board',
      'Cease all audit activities until resolved',
      'Conduct an immediate external assessment'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1322 requires the CAE to disclose nonconformance and its impact to senior management and the board when nonconformance impacts the overall scope or operation of the internal audit activity.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Nonconformance'
  },
  {
    id: 'CIA1-110',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'A qualified external assessor must demonstrate competence in:',
    options: [
      'Only the professional practice of internal auditing',
      'Only the external assessment process',
      'Both internal auditing practice and external assessment process',
      'Financial statement auditing'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1312 interpretation states that a qualified assessor demonstrates competence in two areas: the professional practice of internal auditing AND the external assessment process.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'External Assessments'
  },

  // ============================================================================
  // DOMAIN V: GOVERNANCE, RISK MANAGEMENT, AND CONTROL (20%)
  // ============================================================================
  
  {
    id: 'CIA1-111',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'According to Standard 2110, the internal audit activity should assess governance processes for:',
    options: [
      'Profitability and market share',
      'Making strategic decisions and promoting ethics',
      'Product quality and customer satisfaction',
      'Employee retention and morale'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2110 requires assessing governance for making strategic/operational decisions, overseeing risk and control, promoting ethics and values, ensuring accountability, and communicating risk/control information.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Governance'
  },
  {
    id: 'CIA1-112',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Risk management processes are effective when:',
    options: [
      'All risks are eliminated',
      'Insurance covers all potential losses',
      'Organizational objectives align with mission and significant risks are identified and assessed',
      'External auditors provide a clean opinion'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2120 interpretation states risk management is effective when: objectives align with mission, significant risks are identified and assessed, appropriate risk responses align with risk appetite, and relevant risk information is communicated.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA1-113',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'When evaluating controls, internal audit should assess adequacy and effectiveness in achieving the organization\'s:',
    options: [
      'Profitability goals only',
      'Strategic objectives, information reliability, operations efficiency, asset safeguarding, and compliance',
      'Market expansion plans only',
      'Employee satisfaction targets only'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2130 interpretation identifies five control objectives: achievement of strategic objectives, reliability of information, effectiveness of operations, safeguarding of assets, and compliance with laws and regulations.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control'
  },
  {
    id: 'CIA1-114',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The COSO Internal Control Framework identifies how many components of internal control?',
    options: [
      'Three',
      'Four',
      'Five',
      'Six'
    ],
    correctAnswer: 2,
    explanation: 'COSO identifies five components: Control Environment, Risk Assessment, Control Activities, Information and Communication, and Monitoring Activities.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Frameworks'
  },
  {
    id: 'CIA1-115',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The foundation of all other internal control components is the:',
    options: [
      'Control Activities',
      'Risk Assessment',
      'Control Environment',
      'Monitoring'
    ],
    correctAnswer: 2,
    explanation: 'The Control Environment is the foundation that sets the tone of the organization, including integrity, ethical values, commitment to competence, management philosophy, organizational structure, and board oversight.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Environment'
  },
  {
    id: 'CIA1-116',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Which element is NOT part of the fraud triangle?',
    options: [
      'Pressure/Incentive',
      'Opportunity',
      'Rationalization',
      'Detection'
    ],
    correctAnswer: 3,
    explanation: 'The fraud triangle consists of Pressure/Incentive (motivation), Opportunity (ability to commit), and Rationalization (justification). Detection is not part of the fraud triangle framework.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Fraud'
  },
  {
    id: 'CIA1-117',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'The Three Lines Model designates internal audit as:',
    options: [
      'First line - operational management',
      'Second line - risk management and compliance',
      'Third line - independent assurance',
      'Fourth line - external oversight'
    ],
    correctAnswer: 2,
    explanation: 'The Three Lines Model positions internal audit as the third line, providing independent assurance. First line is operational management; second line is risk and compliance functions.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Three Lines Model'
  },
  {
    id: 'CIA1-118',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Risk appetite represents:',
    options: [
      'The level of risk that an organization is willing to accept',
      'The total amount of risk in the organization',
      'The maximum loss an organization can afford',
      'The insurance coverage level'
    ],
    correctAnswer: 0,
    explanation: 'Risk appetite is the level of risk that an organization is willing to accept in pursuit of its objectives. It guides decision-making about risk responses and tolerance levels.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Management'
  },
  
  
  
  {
    id: 'CIA1-122',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Inherent risk is:',
    options: [
      'Risk after all controls are applied',
      'Risk that management accepts without taking action',
      'Risk before any actions are taken to alter likelihood or impact',
      'Risk that cannot be avoided'
    ],
    correctAnswer: 2,
    explanation: 'Inherent risk is the risk to an entity in the absence of any actions management might take to alter the risk\'s likelihood or impact. It represents the raw or gross risk before controls.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CIA1-123',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Corporate governance involves:',
    options: [
      'Only financial oversight',
      'Only regulatory compliance',
      'Processes and structures for directing and controlling the organization',
      'Only external audit coordination'
    ],
    correctAnswer: 2,
    explanation: 'Governance encompasses the processes and structures implemented by the board to inform, direct, manage, and monitor activities toward achieving organizational objectives.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Corporate Governance'
  },
  {
    id: 'CIA1-124',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The primary purpose of segregation of duties is to:',
    options: [
      'Reduce workload per employee',
      'Ensure no single person controls all aspects of a transaction',
      'Improve employee morale',
      'Reduce the need for supervision'
    ],
    correctAnswer: 1,
    explanation: 'Segregation of duties ensures that no single individual has control over all phases of a transaction, reducing the risk of errors and fraud going undetected.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Activities'
  },
  {
    id: 'CIA1-125',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When management has implemented a control but the internal auditor believes residual risk still exceeds risk appetite, the auditor should:',
    options: [
      'Accept management\'s decision without comment',
      'Immediately inform external auditors',
      'Discuss with management and potentially escalate to the board',
      'Implement additional controls personally'
    ],
    correctAnswer: 2,
    explanation: 'According to Standard 2600, when the CAE concludes management has accepted risk that may be unacceptable, they must discuss with senior management. If unresolved, the matter must be communicated to the board.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Acceptance'
  },
  
  {
    id: 'CIA1-127',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Risk response strategies include all of the following EXCEPT:',
    options: [
      'Accept',
      'Avoid',
      'Eliminate completely',
      'Mitigate'
    ],
    correctAnswer: 2,
    explanation: 'Common risk responses include Accept (tolerate the risk), Avoid (exit the activity), Mitigate/Reduce (implement controls), and Transfer/Share (insurance, outsourcing). Complete elimination of all risk is generally not achievable.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Response'
  },
  {
    id: 'CIA1-128',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The purpose of the internal audit activity evaluating governance is to assess whether:',
    options: [
      'The organization is profitable',
      'IT supports the strategic objectives of the organization and whether appropriate governance exists for the IT activities',
      'Decision-making is transparent and accountability exists',
      'All employees are satisfied'
    ],
    correctAnswer: 2,
    explanation: 'Internal audit assesses whether governance processes promote transparency, accountability, ethical behavior, and effective oversight of risk and control. It is not about profitability or employee satisfaction.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Governance Assessment'
  },
  {
    id: 'CIA1-129',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to COSO, which component involves setting objectives and identifying events that may affect their achievement?',
    options: [
      'Control Environment',
      'Risk Assessment',
      'Control Activities',
      'Information and Communication'
    ],
    correctAnswer: 1,
    explanation: 'Risk Assessment involves identifying and analyzing risks to achieving objectives. It includes setting objectives and identifying events (both risks and opportunities) that may affect achievement.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'COSO Framework'
  },
  {
    id: 'CIA1-130',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Compensating controls are:',
    options: [
      'Controls that detect errors after they occur',
      'Alternative controls when primary controls cannot be implemented',
      'Controls that prevent all errors',
      'Controls required by regulators'
    ],
    correctAnswer: 1,
    explanation: 'Compensating controls are alternative controls that serve as substitutes when primary or direct controls cannot be used. They reduce risk to an acceptable level through different means.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Types of Controls'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN I QUESTIONS
  // ============================================================================
  
  {
    id: 'CIA1-131',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The internal audit charter should be reviewed:',
    options: [
      'Only when problems arise',
      'Every five years during external assessments',
      'Periodically by the CAE and presented to the board',
      'Only when requested by the CEO'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1000 requires the CAE to periodically review the internal audit charter and present it to senior management and the board for approval.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Charter'
  },
  {
    id: 'CIA1-132',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When providing consulting services, internal auditors should maintain objectivity and not assume:',
    options: [
      'Any advisory role',
      'Management responsibility',
      'Training functions',
      'Facilitation duties'
    ],
    correctAnswer: 1,
    explanation: 'When providing consulting services, internal auditors should maintain objectivity and not assume management responsibility. They can advise and facilitate, but decisions and implementation rest with management.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Consulting Services'
  },
  {
    id: 'CIA1-133',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The rule of conduct stating that internal auditors shall "continually improve their proficiency" relates to which Code of Ethics principle?',
    options: [
      'Integrity',
      'Objectivity',
      'Confidentiality',
      'Competency'
    ],
    correctAnswer: 3,
    explanation: 'The rule about continually improving proficiency and effectiveness relates to Competency. Internal auditors must apply and continuously develop their knowledge, skills, and experience.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA1-134',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Which of the following is NOT a Core Principle for the Professional Practice of Internal Auditing?',
    options: [
      'Demonstrates integrity',
      'Provides risk-based assurance',
      'Maximizes organizational profits',
      'Communicates effectively'
    ],
    correctAnswer: 2,
    explanation: 'Maximizing profits is not a Core Principle. The ten Core Principles include: integrity, competence, objectivity, alignment with strategies, positioning, quality, effective communication, risk-based assurance, being insightful, and promoting improvement.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles'
  },
  {
    id: 'CIA1-135',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The Definition of Internal Auditing describes it as a "systematic, disciplined approach." This means:',
    options: [
      'Following rigid procedures without deviation',
      'Using a methodical, structured approach to audit work',
      'Documenting every conversation',
      'Only using statistical sampling'
    ],
    correctAnswer: 1,
    explanation: 'A systematic, disciplined approach means using a methodical, planned, and structured methodology. It requires professional judgment while following standards and established processes.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Definition of Internal Auditing'
  },
  
  {
    id: 'CIA1-137',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'An internal auditor who violates the Code of Ethics may be subject to:',
    options: [
      'Criminal prosecution only',
      'Civil lawsuit only',
      'Disciplinary action by The IIA and the employing organization',
      'No consequences as it is only guidance'
    ],
    correctAnswer: 2,
    explanation: 'Violations of the Code of Ethics may be subject to evaluation and administration according to disciplinary procedures that may result in disciplinary action by The IIA and/or the employing organization.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics'
  },
  {
    id: 'CIA1-138',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The IPPF was developed by:',
    options: [
      'The Securities and Exchange Commission',
      'The Institute of Internal Auditors',
      'The American Institute of CPAs',
      'COSO'
    ],
    correctAnswer: 1,
    explanation: 'The International Professional Practices Framework (IPPF) was developed by The Institute of Internal Auditors (IIA) to provide authoritative guidance for the internal audit profession.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF Framework'
  },
  {
    id: 'CIA1-139',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Implementation Guidance in the IPPF:',
    options: [
      'Is mandatory for all internal auditors',
      'Replaces the Standards in certain situations',
      'Is recommended guidance that assists in applying the Standards',
      'Is required only for CIAs'
    ],
    correctAnswer: 2,
    explanation: 'Implementation Guidance is recommended (not mandatory) guidance that assists internal auditors in applying the Standards. It addresses approach, methodologies, and considerations.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF Framework'
  },
  {
    id: 'CIA1-140',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'The internal audit charter must recognize which mandatory elements of the IPPF?',
    options: [
      'Only the Standards',
      'Only the Code of Ethics',
      'Core Principles, Code of Ethics, Standards, and Definition',
      'All IPPF elements including recommended guidance'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1010 requires the charter to recognize the mandatory nature of the Core Principles, Code of Ethics, Standards, and Definition of Internal Auditing.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Charter'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN II QUESTIONS
  // ============================================================================
  
  {
    id: 'CIA1-141',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Administrative reporting of the CAE typically includes:',
    options: [
      'Approving the internal audit charter',
      'Approving the risk-based audit plan',
      'Day-to-day operations and budget management',
      'Approving the CAE\'s remuneration'
    ],
    correctAnswer: 2,
    explanation: 'Administrative reporting to senior management includes day-to-day operations, budget management, and human resource administration. Functional matters like charter and plan approval go to the board.',
    topic: 'Independence and Objectivity',
    subtopic: 'Dual Reporting'
  },
  {
    id: 'CIA1-142',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'An internal auditor is rotated to audit a department they managed two years ago. The most appropriate action is:',
    options: [
      'Proceed normally since two years have passed',
      'Disclose the prior responsibility and assess whether objectivity might be impaired',
      'Refuse to participate in any way',
      'Request transfer to another organization'
    ],
    correctAnswer: 1,
    explanation: 'The auditor should disclose the prior management responsibility. Whether objectivity is impaired depends on various factors including the nature of former duties and time elapsed. Disclosure allows proper assessment.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairment'
  },
  {
    id: 'CIA1-143',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Threats to independence must be managed at which level(s)?',
    options: [
      'Only the individual auditor level',
      'Only the organizational level',
      'Individual, engagement, functional, and organizational levels',
      'Only the engagement level'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1100 interpretation indicates threats to independence must be managed at the individual auditor, engagement, functional, and organizational levels.',
    topic: 'Independence and Objectivity',
    subtopic: 'Managing Threats'
  },
  {
    id: 'CIA1-144',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Which of the following would most likely impair an internal auditor\'s objectivity?',
    options: [
      'Using computer-assisted audit techniques',
      'Auditing a function previously managed by the auditor',
      'Attending professional development courses',
      'Consulting with subject matter experts'
    ],
    correctAnswer: 1,
    explanation: 'Having previously managed a function creates a potential impairment to objectivity due to prior responsibility for that area\'s controls and processes.',
    topic: 'Independence and Objectivity',
    subtopic: 'Impairment'
  },
  {
    id: 'CIA1-145',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'When the CAE has responsibilities beyond internal audit (e.g., compliance), appropriate safeguards include:',
    options: [
      'The CAE auditing all areas personally',
      'Having the board periodically evaluate reporting lines and developing alternative assurance processes',
      'Delegating all compliance work to external consultants',
      'Reporting only to senior management'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1112 interpretation suggests safeguards such as board oversight, periodic evaluation of reporting lines, and developing alternative processes to obtain assurance for areas of additional responsibility.',
    topic: 'Independence and Objectivity',
    subtopic: 'CAE Roles Beyond IA'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN III QUESTIONS  
  // ============================================================================
  
  {
    id: 'CIA1-146',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Proficiency in the context of the Standards means:',
    options: [
      'Having every possible certification',
      'Having the knowledge, skills, and competencies to perform responsibilities',
      'Being the most experienced person in the organization',
      'Having an advanced degree in accounting'
    ],
    correctAnswer: 1,
    explanation: 'Proficiency refers to the knowledge, skills, and other competencies required to effectively carry out professional responsibilities. It does not require specific certifications or experience levels.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Proficiency'
  },
  {
    id: 'CIA1-147',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'The internal audit activity as a whole needs expertise in IT risks and controls. If no staff member possesses this expertise, the CAE should:',
    options: [
      'Avoid all IT audits',
      'Report to the board that IT cannot be audited',
      'Obtain competent advice and assistance from outside sources',
      'Train all staff in IT before any IT audits can occur'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1210 requires the internal audit activity collectively to possess or OBTAIN needed competencies. If expertise is lacking internally, the CAE should obtain competent advice and assistance from appropriate sources.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Collective Proficiency'
  },
  {
    id: 'CIA1-148',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Due professional care in consulting engagements includes considering:',
    options: [
      'Only time and budget constraints',
      'The needs and expectations of clients, complexity, and value potential',
      'Only the client\'s stated preferences',
      'Only profitability of the engagement'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1220.C1 requires considering the needs and expectations of clients (including nature, timing, and communication), the relative complexity, and the extent of work needed to achieve objectives.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care'
  },
  {
    id: 'CIA1-149',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Internal auditors should enhance their competencies through:',
    options: [
      'Only formal education programs',
      'Continuing professional development activities',
      'Only on-the-job experience',
      'Only reading IIA publications'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1230 requires enhancing knowledge, skills, and competencies through continuing professional development, which encompasses various forms of learning including formal education, training, conferences, and self-study.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'CPD'
  },
  {
    id: 'CIA1-150',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When using technology-based audit techniques, internal auditors must:',
    options: [
      'Be certified in IT auditing',
      'Have sufficient knowledge of key IT risks and available techniques',
      'Develop their own audit software',
      'Have programming experience'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1210.A3 requires internal auditors to have sufficient knowledge of key information technology risks and controls and available technology-based audit techniques. Certification or programming is not required.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'IT Knowledge'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN IV QUESTIONS
  // ============================================================================
  
  {
    id: 'CIA1-151',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The purpose of the QAIP is to evaluate:',
    options: [
      'Only conformance with the Standards',
      'Only efficiency of audit operations',
      'Conformance with Standards and Code of Ethics, plus efficiency and effectiveness',
      'Only the effectiveness of individual auditors'
    ],
    correctAnswer: 2,
    explanation: 'The QAIP evaluates conformance with Standards and Code of Ethics, assesses efficiency and effectiveness of the internal audit activity, and identifies improvement opportunities.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'QAIP Purpose'
  },
  {
    id: 'CIA1-152',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When communicating QAIP results, the CAE should include:',
    options: [
      'Only positive findings',
      'Scope, frequency, assessor qualifications, conclusions, and corrective action plans',
      'Only areas of nonconformance',
      'Detailed procedures used by assessors'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1320 requires disclosure of scope and frequency of assessments, assessor qualifications and independence, conclusions reached, and corrective action plans.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Reporting on QAIP'
  },
  {
    id: 'CIA1-153',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Results of ongoing monitoring should be communicated:',
    options: [
      'Only when problems are found',
      'At least annually',
      'Every five years during external assessment',
      'Only to external auditors'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1320 interpretation indicates results of ongoing monitoring should be communicated at least annually, while external and periodic internal assessment results are communicated upon completion.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Reporting on QAIP'
  },
  {
    id: 'CIA1-154',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Periodic internal assessments may be performed by:',
    options: [
      'Only external assessors',
      'Only the CAE personally',
      'Persons within the organization with sufficient IA knowledge',
      'Only board members'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1311 indicates periodic assessments may be self-assessments or assessments by other persons within the organization with sufficient knowledge of internal audit practices.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Internal Assessments'
  },
  {
    id: 'CIA1-155',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The board should be involved in QAIP activities by:',
    options: [
      'Conducting all assessments directly',
      'Providing oversight as encouraged by the Standards',
      'Approving every audit engagement',
      'Writing the QAIP procedures'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1300 interpretation indicates the CAE should encourage board oversight in the QAIP. The board provides oversight rather than conducting assessments or writing procedures.',
    topic: 'Quality Assurance and Improvement Program',
    subtopic: 'Board Oversight'
  },

  // ============================================================================
  // ADDITIONAL DOMAIN V QUESTIONS
  // ============================================================================
  
  {
    id: 'CIA1-156',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Internal audit must evaluate and contribute to improvement of:',
    options: [
      'Only financial controls',
      'Governance, risk management, and control processes',
      'Only compliance processes',
      'Only IT security'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2100 requires the internal audit activity to evaluate and contribute to the improvement of governance, risk management, and control processes using a systematic, disciplined approach.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Nature of Work'
  },
  {
    id: 'CIA1-157',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'According to the COSO ERM Framework, risk appetite and risk tolerance differ in that:',
    options: [
      'They are the same concept',
      'Risk appetite is the broad level of risk acceptance; risk tolerance is acceptable variation around objectives',
      'Risk tolerance is broader than risk appetite',
      'Only risk appetite matters for internal audit purposes'
    ],
    correctAnswer: 1,
    explanation: 'Risk appetite is the amount of risk an organization is willing to accept in pursuit of value. Risk tolerance is the acceptable level of variation around specific objectives. Appetite is broader; tolerance is more specific.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA1-158',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The COSO component "Information and Communication" involves:',
    options: [
      'Only external financial reporting',
      'Identifying, capturing, and communicating information needed to carry out responsibilities',
      'Only IT system controls',
      'Only audit report distribution'
    ],
    correctAnswer: 1,
    explanation: 'Information and Communication encompasses identifying, capturing, and communicating relevant information in a form and timeframe that enables people to carry out their responsibilities.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'COSO Framework'
  },
  {
    id: 'CIA1-159',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Monitoring Activities in the COSO framework include:',
    options: [
      'Only external audits',
      'Ongoing evaluations and separate evaluations',
      'Only annual reviews',
      'Only board oversight'
    ],
    correctAnswer: 1,
    explanation: 'Monitoring Activities include ongoing evaluations (built into business processes) and separate (periodic) evaluations to ascertain whether internal control components are present and functioning.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'COSO Framework'
  },
  {
    id: 'CIA1-160',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Control Activities in the COSO framework are actions that:',
    options: [
      'Replace the need for risk assessment',
      'Help ensure management directives to mitigate risks are carried out',
      'Are optional for small organizations',
      'Only apply to financial processes'
    ],
    correctAnswer: 1,
    explanation: 'Control Activities are actions established through policies and procedures that help ensure management\'s directives to mitigate risks to achievement of objectives are carried out.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'COSO Framework'
  },
  {
    id: 'CIA1-161',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'When internal audit identifies that management has accepted an unacceptable level of risk, Standard 2600 requires the CAE to first:',
    options: [
      'Report directly to regulators',
      'Discuss the matter with senior management',
      'Refuse to issue an audit report',
      'Communicate immediately to the board without discussing with management'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2600 requires the CAE to first discuss the matter with senior management. If the CAE determines the matter has not been resolved, then it must be communicated to the board.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Acceptance'
  },
  {
    id: 'CIA1-162',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'The first line of defense in the Three Lines Model is:',
    options: [
      'Internal audit',
      'The board of directors',
      'Operational management with direct control over operations',
      'Risk management and compliance functions'
    ],
    correctAnswer: 2,
    explanation: 'The first line is operational management, which owns and manages risks. The second line is risk management and compliance functions. The third line is internal audit.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Three Lines Model'
  },
  {
    id: 'CIA1-163',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'Physical controls include:',
    options: [
      'Management review of reports',
      'Locks, safes, and security cameras',
      'Segregation of duties',
      'Approval requirements'
    ],
    correctAnswer: 1,
    explanation: 'Physical controls are tangible controls such as locks, safes, fences, security cameras, and access cards that protect assets from unauthorized access or use.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Types of Controls'
  },
  {
    id: 'CIA1-164',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Reasonable assurance means:',
    options: [
      'Absolute certainty of achieving objectives',
      'A level of confidence that objectives will be achieved, acknowledging inherent limitations',
      'Guarantee that no errors will occur',
      'Assurance only from management representations'
    ],
    correctAnswer: 1,
    explanation: 'Reasonable assurance recognizes that internal control can never guarantee achievement of objectives due to inherent limitations including human error, management override, and cost-benefit considerations.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Control Concepts'
  },
  {
    id: 'CIA1-165',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Enterprise Risk Management (ERM) differs from traditional risk management primarily in that ERM:',
    options: [
      'Focuses only on financial risks',
      'Takes a portfolio view of risks across the entire organization',
      'Is less comprehensive than traditional risk management',
      'Is only applicable to large corporations'
    ],
    correctAnswer: 1,
    explanation: 'ERM takes a holistic, portfolio view of risks across the entire enterprise, considering how risks interrelate and affect the organization\'s strategy. Traditional approaches often address risks in silos.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Management'
  },
  {
    id: 'CIA1-166',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Controls that mitigate risk when segregation of duties is not practical are called:',
    options: [
      'Preventive controls',
      'Detective controls',
      'Compensating controls',
      'Directive controls'
    ],
    correctAnswer: 2,
    explanation: 'Compensating controls serve as alternative controls when ideal controls like full segregation of duties cannot be implemented. Examples include management oversight and independent review.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Types of Controls'
  },
  {
    id: 'CIA1-167',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'easy',
    question: 'The risk response "transfer" involves:',
    options: [
      'Accepting the risk as is',
      'Sharing or shifting risk to another party, such as through insurance',
      'Eliminating the risk completely',
      'Reducing the likelihood of risk'
    ],
    correctAnswer: 1,
    explanation: 'Transfer (or share) involves shifting some or all of the risk to another party, such as through insurance, outsourcing, or partnerships. The risk still exists but is shared with others.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Risk Response'
  },
  {
    id: 'CIA1-168',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'Governance assessment by internal audit includes evaluating:',
    options: [
      'Only the composition of the board',
      'Ethics programs, accountability structures, and communication of risk information',
      'Only financial statement accuracy',
      'Only regulatory compliance'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2110 requires assessing governance including promoting ethics, ensuring accountability, communicating risk and control information, and coordinating activities among various oversight functions.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Governance Assessment'
  },
  {
    id: 'CIA1-169',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'hard',
    question: 'Internal audit should be "proactive" in its evaluation according to Standard 2100. This means:',
    options: [
      'Waiting for management requests before acting',
      'Only auditing areas with known problems',
      'Considering future impact and offering insights that add value',
      'Focusing exclusively on historical transactions'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2100 interpretation states internal audit credibility and value are enhanced when auditors are proactive and their evaluations offer new insights and consider future impact.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Nature of Work'
  },
  {
    id: 'CIA1-170',
    courseId: 'cia',
    section: 'CIA1',
    difficulty: 'medium',
    question: 'When assessing an organization\'s ethics program, internal auditors should consider:',
    options: [
      'Only whether a code of ethics exists',
      'Whether ethics are promoted throughout the organization and embedded in culture',
      'Only disciplinary actions taken',
      'Only training completion rates'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2110 includes assessing whether appropriate ethics and values are promoted within the organization. This goes beyond having a code to examining whether ethics are truly embedded in the culture.',
    topic: 'Governance, Risk Management, and Control',
    subtopic: 'Governance Assessment'
  },
];

export default CIA1_QUESTIONS_BATCH2;
