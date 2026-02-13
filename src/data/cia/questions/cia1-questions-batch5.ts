/**
 * CIA Part 1: Essentials of Internal Auditing - Batch 5
 * Expanding Foundations of Internal Auditing coverage
 * 
 * Focus Areas:
 * - Mission & Definition Application (10 questions)
 * - Core Principles Case Studies (15 questions)
 * - IPPF Structure & Standards (10 questions)
 * - Code of Ethics Scenarios (5 questions)
 */

import { Question } from '../../../types';

export const CIA1_QUESTIONS_BATCH5: Question[] = [
  // ============================================================================
  // MISSION & DEFINITION APPLICATION (10 questions)
  // ============================================================================
  
  {
    id: 'cia1-b5-001',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The mission of internal audit states that internal audit enhances and protects organizational value by providing risk-based and objective assurance, advice, and insight. Which of the following activities BEST demonstrates the "protect" aspect of this mission?',
    options: [
      'Recommending process improvements to increase efficiency',
      'Identifying control weaknesses that could lead to fraud or financial loss',
      'Providing training to management on best practices',
      'Benchmarking organizational performance against competitors'
    ],
    correctAnswer: 1,
    explanation: 'The "protect" aspect of the mission focuses on safeguarding the organization from risks and threats. Identifying control weaknesses that could lead to fraud or financial loss directly protects organizational value. The other options relate more to the "enhance" aspect through improvement and advice.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Mission of Internal Audit',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-002',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An internal audit activity has been asked by management to conduct a review of the new ERP implementation. The CAE wants to ensure the engagement aligns with the definition of internal auditing. Which element of the definition is MOST important to address first?',
    options: [
      'Whether the activity will be risk-based',
      'Whether internal audit has the competency to evaluate the ERP system',
      'Whether the activity maintains independence and objectivity',
      'Whether the engagement will add value to the organization'
    ],
    correctAnswer: 2,
    explanation: 'Independence and objectivity are fundamental to internal auditing and must be established first. While all elements are important, if independence and objectivity cannot be maintained, the engagement should not proceed as an assurance engagement. The definition specifically states internal auditing is an "independent, objective" activity.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Definition of Internal Auditing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-003',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'According to the definition of internal auditing, internal audit helps organizations accomplish their objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of which three processes?',
    options: [
      'Planning, organizing, and controlling',
      'Risk management, control, and governance',
      'Budgeting, forecasting, and reporting',
      'Compliance, operations, and finance'
    ],
    correctAnswer: 1,
    explanation: 'The IIA definition states that internal auditing brings a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control, and governance processes. These three processes are explicitly mentioned in the definition.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Definition of Internal Auditing',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-004',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'The phrase "risk-based" in the mission of internal audit means that:',
    options: [
      'Internal audit only reviews high-risk areas',
      'Audit priorities and scope are determined based on risk assessment',
      'Internal audit must quantify all risks numerically',
      'Risk management is the only focus of internal audit'
    ],
    correctAnswer: 1,
    explanation: 'Risk-based auditing means that audit priorities, resource allocation, and engagement scope are determined based on risk assessment. It does not mean only high-risk areas are audited or that risks must be quantified numerically.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Mission of Internal Audit',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-005',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An organization is considering outsourcing its internal audit function entirely to an external firm. According to the IIA guidance, which statement is MOST accurate?',
    options: [
      'Outsourcing is prohibited as it violates independence requirements',
      'Outsourcing is permitted but the organization must designate a CAE to oversee the function',
      'Outsourcing eliminates the need for a CAE',
      'External firms cannot perform assurance services, only consulting'
    ],
    correctAnswer: 1,
    explanation: 'The IIA permits outsourcing or co-sourcing of internal audit activities. However, Standard 2070 requires that when the internal audit function is fully outsourced, the organization must designate a CAE (typically someone within the organization) to maintain responsibility for the internal audit activity.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Internal Audit Activity',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-006',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Which of the following scenarios BEST illustrates internal audit providing "insight" as mentioned in the mission statement?',
    options: [
      'Reporting a control deficiency to management',
      'Providing proactive analysis of emerging risks before they materialize',
      'Completing an audit within the budgeted time',
      'Verifying the accuracy of financial statements'
    ],
    correctAnswer: 1,
    explanation: 'Insight refers to internal audit\'s ability to provide foresight and proactive analysis beyond just assurance on past activities. Identifying and analyzing emerging risks before they materialize demonstrates the insight function, adding value through forward-looking analysis.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Mission of Internal Audit',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-007',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'How does the definition of internal auditing distinguish between assurance and consulting services?',
    options: [
      'Assurance services must be mandatory; consulting services are optional',
      'Assurance involves three parties; consulting typically involves two parties',
      'Assurance services focus on finances; consulting focuses on operations',
      'Assurance requires board approval; consulting requires management approval only'
    ],
    correctAnswer: 1,
    explanation: 'A key distinction in the Standards: Assurance services involve three parties (the auditee/process owner, the internal auditor, and the user who relies on the work). Consulting services typically involve two parties (the client requesting the service and the internal auditor providing it).',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Types of Services',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-008',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'The mission of internal audit emphasizes providing "objective" assurance. What does objectivity require from internal auditors?',
    options: [
      'Always agreeing with management\'s conclusions',
      'Having formal accounting certifications',
      'Making unbiased assessments without being influenced by personal feelings',
      'Only auditing areas where they have no prior experience'
    ],
    correctAnswer: 2,
    explanation: 'Objectivity requires internal auditors to make impartial, unbiased assessments. They should not be swayed by their own interests, personal feelings, or influenced by others. This ensures conclusions are based on evidence and professional judgment.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Mission of Internal Audit',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-009',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'The CEO has asked internal audit to assist in developing a new fraud prevention program. According to the definition of internal auditing, this would MOST likely be classified as:',
    options: [
      'An assurance engagement because it relates to control',
      'A consulting engagement because the nature and scope are agreed upon with the customer',
      'Neither, because developing programs is outside internal audit\'s scope',
      'An assurance engagement because fraud prevention is mandatory'
    ],
    correctAnswer: 1,
    explanation: 'Consulting services are advisory in nature, where the nature and scope are agreed upon with the engagement customer. Helping develop a new program is consulting because internal audit is providing advice rather than evaluating an existing process. This differs from assurance where objectives are determined by the auditor.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Types of Services',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-010',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The phrase "enhance organizational value" in the mission of internal audit is BEST achieved when internal audit:',
    options: [
      'Focuses solely on detecting errors and fraud',
      'Provides recommendations that improve operations and help achieve objectives',
      'Ensures maximum audit coverage of all organizational areas',
      'Maintains strict confidentiality of all findings'
    ],
    correctAnswer: 1,
    explanation: 'Enhancing organizational value goes beyond finding problems—it means providing constructive recommendations that improve operations, help the organization achieve its objectives, and create sustainable improvements. This adds value beyond traditional audit findings.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Mission of Internal Audit',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // CORE PRINCIPLES CASE STUDIES (15 questions)
  // ============================================================================
  
  {
    id: 'cia1-b5-011',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Which Core Principle is demonstrated when an internal auditor declines to audit a department where they previously worked as a manager?',
    options: [
      'Demonstrates competence and due professional care',
      'Demonstrates integrity',
      'Is objective and free from undue influence',
      'Aligns with the strategies, objectives, and risks of the organization'
    ],
    correctAnswer: 2,
    explanation: 'The Core Principle "Is objective and free from undue influence" requires auditors to avoid situations that may compromise objectivity. Having previously managed a department could create familiarity threats or self-review threats, making it appropriate to decline the engagement.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-012',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An internal audit team uses data analytics to identify unusual transactions for further investigation. This approach BEST demonstrates which Core Principle?',
    options: [
      'Is insightful, proactive, and future-focused',
      'Promotes organizational improvement',
      'Is appropriately positioned and adequately resourced',
      'Communicates effectively'
    ],
    correctAnswer: 0,
    explanation: 'Using data analytics to identify unusual patterns demonstrates the "insightful, proactive, and future-focused" principle. This approach allows internal audit to provide deeper insights, anticipate issues, and identify risks that might not be found through traditional sampling methods.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-013',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The CAE presents the annual audit plan to the Audit Committee, explaining how each audit relates to the organization\'s strategic risks. This demonstrates which Core Principle?',
    options: [
      'Demonstrates integrity',
      'Aligns with the strategies, objectives, and risks of the organization',
      'Is adequately resourced',
      'Demonstrates quality and continuous improvement'
    ],
    correctAnswer: 1,
    explanation: 'Aligning the audit plan with strategic risks ensures internal audit focuses on matters most important to the organization. This Core Principle requires internal audit to understand and align with organizational strategies, objectives, and risk profile.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-014',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'An internal auditor refuses a gift from a vendor whose contract is being audited. Which Core Principle is being upheld?',
    options: [
      'Aligns with organizational objectives',
      'Demonstrates integrity',
      'Promotes organizational improvement',
      'Communicates effectively'
    ],
    correctAnswer: 1,
    explanation: 'Demonstrates integrity requires internal auditors to act honestly and ethically. Refusing gifts that could be perceived as influencing audit judgment maintains ethical standards and trust in the internal audit function.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-015',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'The internal audit function benchmarks its practices against the IIA Standards and implements improvements based on external quality assessment recommendations. This BEST demonstrates which Core Principle?',
    options: [
      'Demonstrates competence and due professional care',
      'Is insightful, proactive, and future-focused',
      'Demonstrates quality and continuous improvement',
      'Is appropriately positioned and adequately resourced'
    ],
    correctAnswer: 2,
    explanation: 'Demonstrates quality and continuous improvement requires the internal audit activity to implement quality assurance programs, including external assessments, and to continuously improve based on the results. Benchmarking and implementing improvements from QA assessments exemplifies this principle.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-016',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Internal audit identifies a significant control gap during a routine engagement and immediately alerts management to prevent potential losses. Which Core Principle is MOST applicable?',
    options: [
      'Aligns with the strategies of the organization',
      'Communicates effectively',
      'Is insightful, proactive, and future-focused',
      'Demonstrates integrity'
    ],
    correctAnswer: 1,
    explanation: 'Communicates effectively requires timely, clear, and relevant communication. Immediately alerting management to significant findings, rather than waiting for the final report, demonstrates effective communication that enables timely corrective action.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-017',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The CAE ensures all internal auditors complete required CPE hours and maintain professional certifications. This demonstrates which Core Principle?',
    options: [
      'Demonstrates competence and due professional care',
      'Demonstrates integrity',
      'Demonstrates quality and continuous improvement',
      'Is appropriately positioned and adequately resourced'
    ],
    correctAnswer: 0,
    explanation: 'Demonstrates competence and due professional care requires internal auditors to possess the knowledge, skills, and competencies needed to perform their responsibilities. Maintaining certifications and completing CPE ensures ongoing professional competence.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-018',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An internal audit activity uses risk assessments to dynamically adjust the audit plan throughout the year based on emerging risks. This approach BEST demonstrates which combination of Core Principles?',
    options: [
      'Integrity and Competence',
      'Alignment with strategies AND Insightful and proactive',
      'Effective communication AND Quality improvement',
      'Objectivity AND Adequate resources'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic adjustment of the audit plan demonstrates alignment with strategies/risks (responding to the organization\'s changing risk profile) AND being insightful, proactive, and future-focused (anticipating and addressing emerging risks rather than rigidly following an outdated plan).',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-019',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The Audit Committee has approved direct access between the CAE and the committee chair, allowing unfiltered communication. This supports which Core Principle?',
    options: [
      'Demonstrates integrity',
      'Is appropriately positioned and adequately resourced',
      'Communicates effectively',
      'Promotes organizational improvement'
    ],
    correctAnswer: 1,
    explanation: 'Is appropriately positioned and adequately resourced requires internal audit to have organizational stature and authority to fulfill its mandate. Direct access to the Audit Committee ensures appropriate positioning and the ability to communicate without management filtering.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-020',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'After identifying a control weakness, internal audit works with management to develop practical improvement recommendations. This demonstrates which Core Principle?',
    options: [
      'Demonstrates integrity',
      'Is objective and free from undue influence',
      'Promotes organizational improvement',
      'Demonstrates quality and continuous improvement'
    ],
    correctAnswer: 2,
    explanation: 'Promotes organizational improvement requires internal audit to not just identify problems but to contribute to organizational improvement through practical recommendations. This adds value beyond finding deficiencies.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-021',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'For internal auditing to be considered effective, how many of the 10 Core Principles must be present and operating effectively?',
    options: [
      'At least 7 of the 10 principles',
      'All 10 principles - partial achievement means internal audit is not fully effective',
      'At least 5 core principles related to assurance',
      'Only the principles relevant to the specific engagement type'
    ],
    correctAnswer: 1,
    explanation: 'According to IIA guidance, all 10 Core Principles must be present and operating effectively for an internal audit activity to be considered effective. Partial achievement means internal auditing is not as effective as it should be.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-022',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'An auditor uses professional skepticism when evaluating management assertions, even when documentation appears complete. This behavior BEST reflects which Core Principle?',
    options: [
      'Demonstrates integrity',
      'Demonstrates competence and due professional care',
      'Is objective and free from undue influence',
      'Communicates effectively'
    ],
    correctAnswer: 1,
    explanation: 'Demonstrates competence and due professional care includes applying professional skepticism—questioning and critically evaluating evidence rather than accepting assertions at face value. Due professional care requires appropriate diligence in all work.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-023',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The CAE reports to the board that the internal audit function lacks sufficient IT auditors to address cybersecurity risks adequately. Which Core Principle is the CAE invoking?',
    options: [
      'Demonstrates competence and due professional care',
      'Is appropriately positioned and adequately resourced',
      'Aligns with organizational strategies and risks',
      'Demonstrates quality and continuous improvement'
    ],
    correctAnswer: 1,
    explanation: 'Is appropriately positioned and adequately resourced requires internal audit to have sufficient resources to fulfill its responsibilities. Reporting resource gaps to the board addresses the adequately resourced component of this Core Principle.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-024',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'Which Core Principle is MOST directly supported by the requirement for an external quality assessment at least once every five years?',
    options: [
      'Demonstrates integrity',
      'Is appropriately positioned and adequately resourced',
      'Demonstrates quality and continuous improvement',
      'Is objective and free from undue influence'
    ],
    correctAnswer: 2,
    explanation: 'Demonstrates quality and continuous improvement requires a QAIP that includes both internal and external assessments. The five-year external quality assessment requirement directly supports this principle by providing independent evaluation and improvement opportunities.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-025',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'Which Core Principle requires internal auditors to be truthful, courageous, and to act with the best interests of the organization in mind?',
    options: [
      'Demonstrates integrity',
      'Is objective and free from undue influence',
      'Demonstrates competence and due professional care',
      'Promotes organizational improvement'
    ],
    correctAnswer: 0,
    explanation: 'Demonstrates integrity requires internal auditors to be honest, brave, and prudent. Having the courage to report difficult findings and acting in the organization\'s best interests are hallmarks of integrity.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Core Principles',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // IPPF STRUCTURE & STANDARDS (10 questions)
  // ============================================================================
  
  {
    id: 'cia1-b5-026',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The International Professional Practices Framework (IPPF) consists of mandatory and recommended guidance. Which of the following is considered MANDATORY guidance?',
    options: [
      'Implementation Guides',
      'Practice Guides',
      'The Definition of Internal Auditing',
      'Supplemental Guidance'
    ],
    correctAnswer: 2,
    explanation: 'Mandatory guidance includes the Mission, Core Principles, Definition of Internal Auditing, Code of Ethics, and Standards. Implementation Guides and Practice Guides are recommended guidance that helps auditors apply mandatory guidance but compliance is not required.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-027',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An internal auditor claims conformance with the IIA Standards but has not complied with one Standard due to local regulations. How should this be addressed?',
    options: [
      'The auditor cannot claim any conformance with the Standards',
      'Full conformance can still be claimed if local law prohibits compliance',
      'Disclosure must be made of the non-conformance and its impact',
      'Only partial conformance may be claimed regardless of reason'
    ],
    correctAnswer: 2,
    explanation: 'Per Standard 1322, if the internal audit activity does not conform with the Standards due to legal prohibition, the CAE must disclose the non-conformance, the reason, and the impact on the activity or engagement. This allows full disclosure while acknowledging regulatory constraints.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-028',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'The IIA Standards are organized into which two main categories?',
    options: [
      'Technical Standards and Ethical Standards',
      'Attribute Standards and Performance Standards',
      'Mandatory Standards and Optional Standards',
      'Internal Standards and External Standards'
    ],
    correctAnswer: 1,
    explanation: 'The IIA Standards are organized into Attribute Standards (1000 series) which address the characteristics of organizations and individuals performing internal audit, and Performance Standards (2000 series) which describe the nature of internal audit activities and quality criteria.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-029',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Implementation Standards in the IPPF are designated with an "A" or "C" following the standard number. What do these letters indicate?',
    options: [
      '"A" for Assurance services; "C" for Consulting services',
      '"A" for Attribute standards; "C" for Control standards',
      '"A" for Annual requirements; "C" for Continuous requirements',
      '"A" for Advisory; "C" for Compliance'
    ],
    correctAnswer: 0,
    explanation: 'Implementation Standards expand on Attribute and Performance Standards by providing requirements applicable to Assurance activities (A) or Consulting activities (C). For example, Standard 2130.A1 applies to assurance engagements while 2130.C1 applies to consulting engagements.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-030',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'Which element of the IPPF provides the most specific, detailed guidance for applying the Standards in practice?',
    options: [
      'The Code of Ethics',
      'The Core Principles',
      'Implementation Guides',
      'The Mission Statement'
    ],
    correctAnswer: 2,
    explanation: 'Implementation Guides are part of recommended guidance and provide detailed, practical approaches to applying the Standards. They offer the most specific guidance, including considerations and approaches, while the mandatory elements provide the overarching requirements.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-031',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Standard 1000 (Purpose, Authority, and Responsibility) requires that these be defined in which document?',
    options: [
      'The annual audit plan',
      'The internal audit charter',
      'The quality assurance improvement program',
      'Individual engagement work programs'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1000 requires the purpose, authority, and responsibility of the internal audit activity to be formally defined in an internal audit charter. The charter must be approved by the board and is essential for establishing the mandate of internal audit.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-032',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'The 2000 series of IIA Standards covers which aspect of internal auditing?',
    options: [
      'The characteristics and qualities of audit organizations and individuals',
      'The nature of internal audit activities and quality criteria for performance',
      'The ethical requirements for internal auditors',
      'The governance requirements for internal audit functions'
    ],
    correctAnswer: 1,
    explanation: 'The 2000 series comprises Performance Standards, which describe the nature of internal audit activities and provide quality criteria against which the performance of internal audit can be measured. The 1000 series covers Attribute Standards.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-033',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'Which of the following statements about the IPPF is CORRECT?',
    options: [
      'Practice Guides are mandatory for all internal audit activities',
      'Compliance with recommended guidance is required to claim conformance with Standards',
      'The Mission of Internal Audit is part of mandatory guidance',
      'Implementation Guides override the Standards when there is a conflict'
    ],
    correctAnswer: 2,
    explanation: 'The Mission of Internal Audit is part of mandatory guidance along with the Core Principles, Definition, Code of Ethics, and Standards. Practice Guides and Implementation Guides are recommended guidance—helpful but not required for claiming conformance.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-034',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'When the Standards refer to the "board," this term includes:',
    options: [
      'Only the full board of directors',
      'The board, audit committee, or equivalent governance body',
      'Only the audit committee',
      'Senior management and the CEO'
    ],
    correctAnswer: 1,
    explanation: 'According to the IIA glossary, "board" refers to the highest level governing body charged with responsibility to direct and/or oversee the organization\'s activities. This can include the board of directors, audit committee, or equivalent governance body.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Standards',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-035',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'What is the PRIMARY purpose of the IPPF?',
    options: [
      'To establish legal requirements for internal auditors',
      'To provide a coherent, consistent framework for internal audit practice globally',
      'To replace local internal audit regulations',
      'To certify individual internal auditors'
    ],
    correctAnswer: 1,
    explanation: 'The IPPF provides a coherent framework organizing IIA authoritative guidance. It promotes high-quality internal auditing globally and provides a consistent foundation for practice, regardless of the country or industry.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'IPPF',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // CODE OF ETHICS SCENARIOS (5 questions)
  // ============================================================================
  
  {
    id: 'cia1-b5-036',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An internal auditor discovers evidence suggesting their supervisor may be involved in fraud. According to the Code of Ethics, what should the auditor do?',
    options: [
      'Confront the supervisor directly before taking any action',
      'Ignore it since reporting a supervisor could harm the auditor\'s career',
      'Report the information through appropriate channels as required by the Code',
      'Wait to see if more evidence emerges before deciding'
    ],
    correctAnswer: 2,
    explanation: 'The Code of Ethics requires integrity, which includes the courage to act ethically even in difficult situations. The auditor should report through appropriate channels (e.g., CAE, audit committee, ethics hotline) regardless of who is involved. Ignoring or delaying would violate ethical requirements.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-037',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The Code of Ethics applies to which of the following?',
    options: [
      'Only IIA members who are CIAs',
      'All individuals and entities providing internal audit services',
      'Only internal auditors working for publicly traded companies',
      'Only CAEs and senior internal audit staff'
    ],
    correctAnswer: 1,
    explanation: 'The Code of Ethics applies to all individuals and entities that provide internal audit services, not just IIA members or CIAs. This includes in-house auditors, outsourced providers, and anyone performing internal audit work.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-038',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'An auditor is offered a job by a client department during an ongoing audit. According to the Code of Ethics, the auditor should:',
    options: [
      'Accept the offer since it represents career advancement',
      'Continue the audit and accept the position after completion',
      'Disclose the situation and consider removing themselves from the engagement',
      'Reject the offer but continue the audit without disclosure'
    ],
    correctAnswer: 2,
    explanation: 'The job offer creates a potential objectivity impairment. The Code of Ethics requires disclosure of activities or relationships that may impair objectivity. The auditor should disclose the situation and, depending on policies, may need to be removed from the engagement.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-039',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'The Code of Ethics consists of the Principles and Rules of Conduct. Which of the following is one of the four principles?',
    options: [
      'Profitability',
      'Confidentiality',
      'Efficiency',
      'Compliance'
    ],
    correctAnswer: 1,
    explanation: 'The four principles of the Code of Ethics are: Integrity, Objectivity, Confidentiality, and Competency. Often remembered as "I-O-C-C." Confidentiality requires prudent use and protection of information obtained during audits.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-b5-040',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An internal auditor inadvertently discloses confidential information about a pending acquisition to a friend who works for a competitor. The friend uses this information for personal stock trading. Which Code of Ethics principle has the auditor PRIMARILY violated?',
    options: [
      'Integrity',
      'Objectivity',
      'Confidentiality',
      'Competency'
    ],
    correctAnswer: 2,
    explanation: 'While the situation has legal implications (insider trading), the auditor primarily violated the Confidentiality principle by disclosing information obtained during work. The Rules of Conduct state that auditors shall be prudent in the use and protection of information and shall not use information for personal gain.',
    topic: 'Foundations of Internal Auditing',
    subtopic: 'Code of Ethics',
  reference: 'IIA Standards'
  }
];
