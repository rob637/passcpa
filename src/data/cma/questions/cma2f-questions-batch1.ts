/**
 * CMA Part 2, Section F: Professional Ethics - Questions Batch 1 (Q1-25)
 * Weight: 15% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-F: Professional Ethics
 * 
 * Topics covered:
 * - IMA Statement of Ethical Professional Practice
 * - Ethical Principles (Honesty, Fairness, Objectivity, Responsibility)
 * - Ethical Standards (Competence, Confidentiality, Integrity, Credibility)
 * - Ethical Conflict Resolution
 * - Organizational Ethics
 */

import { Question } from '../../../types';

export const CMA2F_QUESTIONS_BATCH1: Question[] = [
  // ==========================================
  // IMA Ethics Standards
  // ==========================================
  {
    id: 'cma2-f-001',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'IMA Ethics',
    subtopic: 'Four Standards',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The four IMA ethical standards are:',
    options: [
      'Honesty, Fairness, Objectivity, Responsibility',
      'Competence, Confidentiality, Integrity, Credibility',
      'Leadership, Teamwork, Communication, Analysis',
      'Accuracy, Timeliness, Relevance, Completeness'
    ],
    correctAnswer: 1,
    explanation: 'The four IMA ethical standards are Competence, Confidentiality, Integrity, and Credibility. The IMA also identifies overarching principles: Honesty, Fairness, Objectivity, and Responsibility.',
    reference: 'IMA Statement of Ethical Professional Practice',
  },
  {
    id: 'cma2-f-002',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'IMA Ethics',
    subtopic: 'Overarching Principles',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'IMA\'s overarching ethical principles include all of the following EXCEPT:',
    options: [
      'Honesty',
      'Profitability',
      'Objectivity',
      'Fairness'
    ],
    correctAnswer: 1,
    explanation: 'IMA\'s overarching principles are Honesty, Fairness, Objectivity, and Responsibility. Profitability is a business goal, not an ethical principle.',
    reference: 'IMA Ethical Principles',
  },

  // ==========================================
  // Competence Standard
  // ==========================================
  {
    id: 'cma2-f-003',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Competence',
    subtopic: 'Professional Development',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Under the competence standard, a CMA must:',
    options: [
      'Only perform work they were trained for in college',
      'Maintain professional competence through ongoing development',
      'Avoid all tasks that seem challenging',
      'Only work in their preferred area'
    ],
    correctAnswer: 1,
    explanation: 'Competence requires maintaining professional knowledge through continuing education, performing duties in accordance with relevant laws and technical standards, and providing accurate recommendations.',
    reference: 'Competence Standard; CPE Requirements',
  },
  {
    id: 'cma2-f-004',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Competence',
    subtopic: 'Technical Standards',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A management accountant encounters a new complex transaction. The competence standard requires:',
    options: [
      'Ignoring the transaction',
      'Guessing at the proper treatment',
      'Researching or consulting to ensure proper treatment',
      'Delegating to a junior staff member'
    ],
    correctAnswer: 2,
    explanation: 'Competence requires providing accurate information based on thorough research. When facing unfamiliar issues, professionals should consult experts, research standards, or seek training.',
    reference: 'Competence; Professional Standards',
  },

  // ==========================================
  // Confidentiality Standard
  // ==========================================
  {
    id: 'cma2-f-005',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Confidentiality',
    subtopic: 'Information Protection',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'A CMA may disclose confidential employer information when:',
    options: [
      'Asked by a friend who is a competitor',
      'Required by law or professional standards',
      'Trying to impress a potential employer',
      'Discussing work at social gatherings'
    ],
    correctAnswer: 1,
    explanation: 'Confidential information may only be disclosed when legally required (subpoena, regulatory requirement) or when authorized. Social conversations or personal interests do not justify disclosure.',
    reference: 'Confidentiality Standard; Legal Requirements',
  },
  {
    id: 'cma2-f-006',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Confidentiality',
    subtopic: 'Post-Employment',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The confidentiality obligation:',
    options: [
      'Ends immediately when employment terminates',
      'Continues after leaving the organization',
      'Only applies to financial data',
      'Does not apply to verbal information'
    ],
    correctAnswer: 1,
    explanation: 'Confidentiality obligations continue after leaving an employer. Former employees must not use or disclose confidential information from previous positions. Many organizations also have post-employment agreements.',
    reference: 'Confidentiality; Post-Employment Duties',
  },

  // ==========================================
  // Integrity Standard
  // ==========================================
  {
    id: 'cma2-f-007',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Integrity',
    subtopic: 'Conflicts of Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under the integrity standard, a CMA must:',
    options: [
      'Always agree with management decisions',
      'Avoid actual and apparent conflicts of interest',
      'Maximize profits regardless of methods',
      'Keep all information secret from the board'
    ],
    correctAnswer: 1,
    explanation: 'Integrity requires avoiding actual and apparent conflicts of interest and advising parties of potential conflicts. CMAs must also refrain from activities that discredit the profession.',
    reference: 'Integrity Standard; Conflicts of Interest',
  },
  {
    id: 'cma2-f-008',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Integrity',
    subtopic: 'Subverting Objectives',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A CFO asks a CMA to "smooth" earnings by adjusting accruals. The CMA should:',
    options: [
      'Comply to keep their job',
      'Refuse because this may subvert legitimate organizational objectives',
      'Comply if the CFO takes responsibility',
      'Ignore the request'
    ],
    correctAnswer: 1,
    explanation: 'Integrity prohibits engaging in activities that subvert legitimate objectives (like accurate financial reporting) or discredit the profession. Earnings manipulation violates integrity and likely GAAP.',
    reference: 'Integrity; Subverting Objectives',
  },
  {
    id: 'cma2-f-009',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Integrity',
    subtopic: 'Gifts and Favors',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A vendor offers a CMA expensive sports tickets in exchange for favorable consideration. The CMA should:',
    options: [
      'Accept since it\'s a common business practice',
      'Decline as it could improperly influence professional judgment',
      'Accept and disclose to a colleague',
      'Accept but not tell anyone'
    ],
    correctAnswer: 1,
    explanation: 'CMAs should refuse gifts or favors that could improperly influence their professional judgment. Accepting could create appearance of bias and compromise integrity and objectivity.',
    reference: 'Integrity; Gifts and Favors',
  },

  // ==========================================
  // Credibility Standard
  // ==========================================
  {
    id: 'cma2-f-010',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Credibility',
    subtopic: 'Fair Communication',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'The credibility standard requires CMAs to:',
    options: [
      'Only report good news',
      'Communicate information fairly and objectively',
      'Simplify reports by omitting unfavorable data',
      'Only provide information when asked'
    ],
    correctAnswer: 1,
    explanation: 'Credibility requires communicating information fairly, objectively, and completely. This includes disclosing all relevant information, favorable or unfavorable, that users need to understand the situation.',
    reference: 'Credibility Standard; Fair Communication',
  },
  {
    id: 'cma2-f-011',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Credibility',
    subtopic: 'Complete Disclosure',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A CMA discovers that a report omits negative information about a project the CEO favors. The CMA should:',
    options: [
      'Remain silent to avoid conflict',
      'Add the missing information to ensure complete disclosure',
      'Only mention it if directly asked',
      'Modify the data to make it look better'
    ],
    correctAnswer: 1,
    explanation: 'Credibility requires disclosing all relevant information that could reasonably be expected to influence a user\'s understanding. Omitting material negative information violates this standard.',
    reference: 'Credibility; Complete Disclosure',
  },

  // ==========================================
  // Ethical Conflict Resolution
  // ==========================================
  {
    id: 'cma2-f-012',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'Initial Steps',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When facing an ethical conflict, the first step a CMA should take is to:',
    options: [
      'Immediately resign',
      'Contact the news media',
      'Discuss with their immediate supervisor',
      'Sue the company'
    ],
    correctAnswer: 2,
    explanation: 'IMA guidance: First, follow the organization\'s ethical policies. If no resolution, discuss with immediate supervisor. Then escalate to higher levels if needed. External action is a last resort.',
    reference: 'Conflict Resolution; IMA Guidance',
  },
  {
    id: 'cma2-f-013',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'Escalation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If discussing an ethical issue with a supervisor is ineffective, the CMA should next:',
    options: [
      'Give up and comply',
      'Escalate to higher levels of management or the board',
      'Quit without further action',
      'Ignore the issue'
    ],
    correctAnswer: 1,
    explanation: 'If supervisor discussion doesn\'t resolve the issue, escalate to higher management, audit committee, or board. The goal is internal resolution before considering external options.',
    reference: 'Conflict Resolution; Escalation Process',
  },
  {
    id: 'cma2-f-014',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'External Consultation',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A CMA may seek external confidential advice from:',
    options: [
      'Only family members',
      'The IMA Ethics Helpline or an attorney',
      'Social media followers',
      'Competitors'
    ],
    correctAnswer: 1,
    explanation: 'IMA recommends consulting the IMA Ethics Helpline for confidential guidance. Legal counsel may also be appropriate. Confidentiality must be maintained while seeking external advice.',
    reference: 'IMA Ethics Helpline; External Resources',
  },

  // ==========================================
  // Organizational Ethics
  // ==========================================
  {
    id: 'cma2-f-015',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Organizational Ethics',
    subtopic: 'Tone at the Top',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: '"Tone at the top" refers to:',
    options: [
      'The volume of executive communications',
      'Senior management\'s demonstrated commitment to ethics',
      'The acoustics of the executive floor',
      'Top-down budgeting approach'
    ],
    correctAnswer: 1,
    explanation: 'Tone at the top reflects how senior leaders demonstrate commitment to ethics through their words and actions. It sets the ethical culture and influences employee behavior throughout the organization.',
    reference: 'Tone at the Top; Ethical Culture',
  },
  {
    id: 'cma2-f-016',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Organizational Ethics',
    subtopic: 'Code of Conduct',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A corporate code of conduct typically:',
    options: [
      'Is optional for employees',
      'Provides guidance on expected ethical behavior',
      'Only applies to executives',
      'Is the same for all companies'
    ],
    correctAnswer: 1,
    explanation: 'A code of conduct outlines expected ethical behaviors, policies, and standards for employees. It provides guidance for ethical decision-making and consequences for violations.',
    reference: 'Code of Conduct; Ethics Program',
  },
  {
    id: 'cma2-f-017',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Organizational Ethics',
    subtopic: 'Whistleblower Protection',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Whistleblower protections are designed to:',
    options: [
      'Encourage employees to report misconduct without fear of retaliation',
      'Silence employees who find problems',
      'Protect wrongdoers from consequences',
      'Eliminate internal audit'
    ],
    correctAnswer: 0,
    explanation: 'Whistleblower protections (like Sarbanes-Oxley provisions) protect employees who report violations from retaliation. This encourages ethical behavior and helps organizations detect problems.',
    reference: 'Whistleblower Protection; SOX',
  },

  // ==========================================
  // Ethical Decision-Making
  // ==========================================
  {
    id: 'cma2-f-018',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Ethical Decision-Making',
    subtopic: 'Framework',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When facing an ethical dilemma, a CMA should consider:',
    options: [
      'Only financial consequences',
      'Impact on all stakeholders and alignment with ethical standards',
      'Only the CEO\'s preferences',
      'What others are doing in similar situations'
    ],
    correctAnswer: 1,
    explanation: 'Ethical decision-making considers impact on all stakeholders (employees, shareholders, customers, community), alignment with professional and organizational standards, and long-term consequences.',
    reference: 'Ethical Decision-Making Framework',
  },

  // ==========================================
  // Professional Responsibility
  // ==========================================
  {
    id: 'cma2-f-020',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Responsibility',
    subtopic: 'CMA Certification',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Holding the CMA certification requires:',
    options: [
      'No ongoing requirements after passing the exam',
      'Adherence to IMA ethical standards and continuing education',
      'Only paying annual dues',
      'Working only in specific industries'
    ],
    correctAnswer: 1,
    explanation: 'CMAs must adhere to IMA ethical standards, complete continuing education (30 hours annually), maintain IMA membership, and pay certification fees. Ethics is an ongoing responsibility.',
    reference: 'CMA Requirements; IMA Membership',
  },
  {
    id: 'cma2-f-021',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Responsibility',
    subtopic: 'Reputation',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Why is ethical behavior important for the CMA profession?',
    options: [
      'It has no real importance',
      'It builds trust and maintains the profession\'s reputation',
      'It is only required for public accountants',
      'It helps avoid work'
    ],
    correctAnswer: 1,
    explanation: 'Ethical behavior builds trust with employers, stakeholders, and the public. The profession\'s reputation depends on members acting with integrity. Unethical behavior harms individual careers and the entire profession.',
    reference: 'Professional Reputation; Trust',
  },

  // ==========================================
  // Additional Ethics Topics
  // ==========================================
  {
    id: 'cma2-f-022',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Integrity',
    subtopic: 'Fraud Prevention',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A CMA suspects a colleague is committing fraud. Under ethical guidelines, the CMA should:',
    options: [
      'Ignore it to avoid conflict',
      'Report concerns through appropriate internal channels',
      'Confront the colleague publicly',
      'Help cover it up to protect the company'
    ],
    correctAnswer: 1,
    explanation: 'CMAs have a responsibility to report suspected fraud or misconduct through proper internal channels (supervisor, internal audit, ethics hotline). Covering up or ignoring fraud violates integrity.',
    reference: 'Fraud Reporting; Professional Responsibility',
  },
  {
    id: 'cma2-f-023',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Confidentiality',
    subtopic: 'Inside Information',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A CMA learns of an upcoming merger through work. Using this to trade stocks would violate:',
    options: [
      'Only confidentiality',
      'Only integrity',
      'Both confidentiality and integrity standards, plus securities laws',
      'No ethical standards'
    ],
    correctAnswer: 2,
    explanation: 'Insider trading violates confidentiality (using confidential information for personal gain), integrity (engaging in illegal/unethical activity), and federal securities laws. It could result in criminal penalties.',
    reference: 'Insider Trading; Securities Laws',
  },
  {
    id: 'cma2-f-024',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Competence',
    subtopic: 'Limitations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a CMA is asked to perform work beyond their competence, they should:',
    options: [
      'Accept and hope for the best',
      'Acknowledge limitations and seek appropriate help or training',
      'Blame others if mistakes occur',
      'Pretend to have the required skills'
    ],
    correctAnswer: 1,
    explanation: 'Competence requires recognizing limitations. When work exceeds expertise, CMAs should seek training, consult experts, or recommend someone qualified. Honesty about limitations protects all stakeholders.',
    reference: 'Competence; Professional Limitations',
  },
  {
    id: 'cma2-f-025',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Credibility',
    subtopic: 'Professional Judgment',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A CMA\'s professional judgment should be guided by:',
    options: [
      'Personal financial interests',
      'Applicable standards, evidence, and stakeholder interests',
      'What management wants to hear',
      'Avoiding any difficult conclusions'
    ],
    correctAnswer: 1,
    explanation: 'Professional judgment must be based on applicable technical standards, relevant evidence, and consideration of stakeholder interests—not personal bias or pressure from others.',
    reference: 'Professional Judgment; Credibility',
  }
];

// Helper functions
export const getCMA2FQuestionsBatch1 = () => CMA2F_QUESTIONS_BATCH1;
export const getCMA2FQuestionCount = () => CMA2F_QUESTIONS_BATCH1.length;

export default CMA2F_QUESTIONS_BATCH1;
