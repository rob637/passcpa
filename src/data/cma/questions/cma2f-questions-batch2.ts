/**
 * CMA Part 2, Section F: Professional Ethics - Questions Batch 2 (Q26-50)
 * Weight: 15% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-F: Professional Ethics
 * 
 * Topics covered:
 * - Advanced Ethical Conflict Resolution
 * - Fraud and Whistleblowing
 * - Corporate Governance Ethics
 * - Social Responsibility and Sustainability
 * - Global Ethics and Regulations
 */

import { Question } from '../../../types';

export const CMA2F_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // Ethical Conflict Resolution
  // ==========================================
  {
    id: 'cma2-f-026',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'Resolution Steps',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The first step in resolving an ethical conflict according to IMA guidance is:',
    options: [
      'Report immediately to external authorities',
      'Follow the organization\'s established policies',
      'Resign from the position',
      'Contact the media'
    ],
    correctAnswer: 1,
    explanation: 'IMA recommends first following the organization\'s established policies for ethical conflict resolution. If unresolved, escalate through proper channels before considering external options.',
    reference: 'IMA Conflict Resolution; Ethical Procedures',
  },
  {
    id: 'cma2-f-027',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'Escalation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When an ethical issue cannot be resolved through immediate supervisors, the CMA should:',
    options: [
      'Ignore the issue',
      'Escalate through successively higher levels of management',
      'Immediately file a lawsuit',
      'Accept management\'s decision without question'
    ],
    correctAnswer: 1,
    explanation: 'IMA guidance indicates escalating through higher management levels, potentially to the audit committee or board, if immediate supervisors cannot resolve the ethical concern.',
    reference: 'Escalation Procedures; Ethical Conflicts',
  },
  {
    id: 'cma2-f-028',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'External Consultation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A CMA may seek confidential advice from an IMA Ethics Counselor when:',
    options: [
      'Only after resigning from the company',
      'At any time when facing an ethical dilemma',
      'Only after board approval',
      'Never, as this would breach confidentiality'
    ],
    correctAnswer: 1,
    explanation: 'IMA provides ethics counseling services for members facing ethical dilemmas. CMAs may seek confidential guidance at any time without waiting for internal processes to fail.',
    reference: 'IMA Ethics Counselor; External Resources',
  },
  {
    id: 'cma2-f-029',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Conflict Resolution',
    subtopic: 'Documentation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When facing an ethical dilemma, maintaining documentation is important because it:',
    options: [
      'Guarantees legal protection',
      'Provides evidence of actions taken and decisions made',
      'Eliminates all personal liability',
      'Is required by GAAP'
    ],
    correctAnswer: 1,
    explanation: 'Documenting concerns raised, responses received, and actions taken provides a record supporting the CMA\'s ethical conduct and decision-making process.',
    reference: 'Documentation; Ethical Conduct Records',
  },

  // ==========================================
  // Fraud and Whistleblowing
  // ==========================================
  {
    id: 'cma2-f-030',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Fraud',
    subtopic: 'Fraud Triangle',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The three elements of the fraud triangle are:',
    options: [
      'Opportunity, Pressure, Rationalization',
      'Motive, Method, Means',
      'Intent, Action, Concealment',
      'Theft, Deception, Cover-up'
    ],
    correctAnswer: 0,
    explanation: 'The fraud triangle identifies three conditions present in fraud: Opportunity (ability to commit fraud), Pressure (motivation such as financial need), and Rationalization (justification of the act).',
    reference: 'Fraud Triangle; Fraud Detection',
  },
  {
    id: 'cma2-f-031',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Fraud',
    subtopic: 'Detection',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Management accountants help prevent fraud by:',
    options: [
      'Catching all fraud before it occurs',
      'Designing and monitoring internal controls',
      'Personally investigating all suspicions',
      'Assuming all employees are dishonest'
    ],
    correctAnswer: 1,
    explanation: 'Management accountants help design controls that reduce opportunity for fraud, monitor for anomalies, and create environments where ethical behavior is expected and rewarded.',
    reference: 'Fraud Prevention; Internal Controls',
  },
  {
    id: 'cma2-f-032',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'Protection',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Sarbanes-Oxley Act provides whistleblower protections for employees who report:',
    options: [
      'Minor policy violations only',
      'Securities law violations and fraud',
      'Personal workplace grievances',
      'Competitor practices'
    ],
    correctAnswer: 1,
    explanation: 'SOX Section 806 protects employees of public companies who report securities violations, fraud, or violations of SEC rules from retaliation by their employers.',
    reference: 'Sarbanes-Oxley; Whistleblower Protection',
  },
  {
    id: 'cma2-f-033',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'Dodd-Frank',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the Dodd-Frank Act, whistleblowers may receive:',
    options: [
      'No financial reward',
      '10-30% of sanctions collected over $1 million',
      'Guaranteed employment',
      'Immunity from all charges'
    ],
    correctAnswer: 1,
    explanation: 'Dodd-Frank provides financial incentives: whistleblowers can receive 10-30% of monetary sanctions exceeding $1 million collected by the SEC based on their information.',
    reference: 'Dodd-Frank; SEC Whistleblower Program',
  },
  {
    id: 'cma2-f-034',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'Ethics Hotlines',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Anonymous ethics hotlines in organizations serve to:',
    options: [
      'Replace internal controls entirely',
      'Provide a channel for reporting concerns without fear of retaliation',
      'Guarantee fraud will be discovered',
      'Eliminate the need for external audits'
    ],
    correctAnswer: 1,
    explanation: 'Ethics hotlines allow employees and others to report concerns anonymously, reducing fear of retaliation and increasing likelihood that issues will be reported.',
    reference: 'Ethics Hotlines; Reporting Mechanisms',
  },

  // ==========================================
  // Corporate Governance Ethics
  // ==========================================
  {
    id: 'cma2-f-035',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Corporate Governance',
    subtopic: 'Tone at the Top',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: '"Tone at the top" in corporate governance refers to:',
    options: [
      'The company\'s marketing message',
      'Leadership\'s commitment to ethical behavior',
      'Executive compensation levels',
      'Board meeting frequency'
    ],
    correctAnswer: 1,
    explanation: 'Tone at the top reflects senior leadership\'s attitude toward ethics and controls. When leaders demonstrate integrity, ethical behavior cascades through the organization.',
    reference: 'Tone at the Top; Ethical Culture',
  },
  {
    id: 'cma2-f-036',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Corporate Governance',
    subtopic: 'Audit Committee',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The audit committee\'s role in ethics includes:',
    options: [
      'Conducting all internal audits personally',
      'Overseeing financial reporting integrity and compliance',
      'Setting executive salaries',
      'Approving all vendor contracts'
    ],
    correctAnswer: 1,
    explanation: 'The audit committee oversees financial reporting, internal controls, and compliance with laws and regulations. Members should be independent and financially literate.',
    reference: 'Audit Committee; Governance Structure',
  },
  {
    id: 'cma2-f-037',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Corporate Governance',
    subtopic: 'Code of Conduct',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A corporate code of conduct typically:',
    options: [
      'Replaces all laws and regulations',
      'Establishes expected ethical behavior for employees',
      'Applies only to executives',
      'Is confidential and not shared'
    ],
    correctAnswer: 1,
    explanation: 'A code of conduct communicates the organization\'s values, ethical standards, and expected behaviors to all employees, providing guidance for ethical decision-making.',
    reference: 'Code of Conduct; Ethics Programs',
  },
  {
    id: 'cma2-f-038',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Corporate Governance',
    subtopic: 'Conflicts of Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A conflict of interest exists when a CMA:',
    options: [
      'Disagrees with a coworker',
      'Has personal interests that could improperly influence professional judgment',
      'Works overtime',
      'Takes vacation time'
    ],
    correctAnswer: 1,
    explanation: 'Conflicts of interest occur when personal relationships, financial interests, or outside activities could compromise objective professional judgment or create appearance of impropriety.',
    reference: 'Conflicts of Interest; Professional Independence',
  },

  // ==========================================
  // Social Responsibility and Sustainability
  // ==========================================
  {
    id: 'cma2-f-039',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Sustainability',
    subtopic: 'Triple Bottom Line',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The "triple bottom line" considers:',
    options: [
      'Revenue, costs, and profit',
      'People, planet, and profit',
      'Past, present, and future',
      'Shareholders, customers, and employees'
    ],
    correctAnswer: 1,
    explanation: 'Triple bottom line (TBL) expands performance measurement beyond profit to include social (people) and environmental (planet) impacts, reflecting broader stakeholder concerns.',
    reference: 'Triple Bottom Line; Sustainability Reporting',
  },
  {
    id: 'cma2-f-040',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Sustainability',
    subtopic: 'ESG Reporting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Environmental, Social, and Governance (ESG) reporting helps organizations:',
    options: [
      'Avoid all regulations',
      'Communicate non-financial performance to stakeholders',
      'Replace financial statements',
      'Guarantee stock price increases'
    ],
    correctAnswer: 1,
    explanation: 'ESG reporting provides transparency about environmental impact, social practices, and governance structures, meeting stakeholder demand for sustainability information.',
    reference: 'ESG Reporting; Stakeholder Communication',
  },
  {
    id: 'cma2-f-041',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Sustainability',
    subtopic: 'Integrated Reporting',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Integrated reporting combines:',
    options: [
      'Only financial data from multiple periods',
      'Financial and non-financial information about value creation',
      'Multiple companies\' reports',
      'Internal and external audit reports'
    ],
    correctAnswer: 1,
    explanation: 'Integrated reporting (<IR>) links financial results with strategy, governance, performance, and prospects, showing how organizations create value across multiple capitals over time.',
    reference: 'Integrated Reporting Framework; <IR>',
  },
  {
    id: 'cma2-f-042',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Social Responsibility',
    subtopic: 'Stakeholder Theory',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Stakeholder theory argues that businesses should consider:',
    options: [
      'Only shareholder interests',
      'Interests of all groups affected by business decisions',
      'Only employee concerns',
      'Government interests exclusively'
    ],
    correctAnswer: 1,
    explanation: 'Stakeholder theory expands beyond shareholder primacy to consider employees, customers, suppliers, communities, and others affected by corporate decisions.',
    reference: 'Stakeholder Theory; Corporate Responsibility',
  },

  // ==========================================
  // Global Ethics and Regulations
  // ==========================================
  {
    id: 'cma2-f-043',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'FCPA',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The Foreign Corrupt Practices Act (FCPA) prohibits:',
    options: [
      'All international business',
      'Bribing foreign government officials',
      'Hiring foreign employees',
      'International investments'
    ],
    correctAnswer: 1,
    explanation: 'The FCPA prohibits bribing foreign officials to obtain or retain business. It also requires public companies to maintain accurate books and adequate internal controls.',
    reference: 'FCPA; Anti-Corruption Laws',
  },
  {
    id: 'cma2-f-044',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'UK Bribery Act',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The UK Bribery Act differs from the FCPA by:',
    options: [
      'Being less strict',
      'Covering commercial bribery and lacking a facilitating payments exception',
      'Applying only to UK citizens',
      'Having no penalties'
    ],
    correctAnswer: 1,
    explanation: 'The UK Bribery Act is broader: it covers bribery in private business (not just government), has no exception for facilitating payments, and can apply to any company with UK business.',
    reference: 'UK Bribery Act; Global Anti-Corruption',
  },
  {
    id: 'cma2-f-045',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'Cultural Differences',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'When facing different cultural expectations in international business, a CMA should:',
    options: [
      'Always follow local customs regardless of ethics',
      'Apply IMA standards while respecting cultural differences where possible',
      'Refuse all international work',
      'Ignore professional standards abroad'
    ],
    correctAnswer: 1,
    explanation: 'CMAs maintain professional standards globally but should understand cultural contexts. Illegal or unethical practices are never acceptable regardless of local norms.',
    reference: 'Cross-Cultural Ethics; Global Practice',
  },
  {
    id: 'cma2-f-046',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'Money Laundering',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Anti-money laundering (AML) compliance requires organizations to:',
    options: [
      'Ignore suspicious transactions',
      'Implement procedures to detect and report suspicious activities',
      'Only monitor large transactions',
      'Report only to competitors'
    ],
    correctAnswer: 1,
    explanation: 'AML programs require customer due diligence, transaction monitoring, suspicious activity reporting, and employee training to prevent use of businesses for money laundering.',
    reference: 'Anti-Money Laundering; Compliance Programs',
  },

  // ==========================================
  // Professional Responsibility
  // ==========================================
  {
    id: 'cma2-f-047',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Responsibility',
    subtopic: 'Due Professional Care',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Due professional care requires a CMA to:',
    options: [
      'Be perfect in all work',
      'Exercise the skill and diligence of a reasonably prudent professional',
      'Never make mistakes',
      'Know everything about every topic'
    ],
    correctAnswer: 1,
    explanation: 'Due care means applying the competence and diligence reasonably expected of a professional in similar circumstances—not perfection, but reasonable prudence and care.',
    reference: 'Due Professional Care; Professional Standards',
  },
  {
    id: 'cma2-f-048',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Responsibility',
    subtopic: 'Objectivity',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Objectivity in management accounting means:',
    options: [
      'Always agreeing with management',
      'Making decisions free from bias, conflicts of interest, or undue influence',
      'Using only quantitative analysis',
      'Ignoring stakeholder concerns'
    ],
    correctAnswer: 1,
    explanation: 'Objectivity requires impartial analysis and recommendations based on facts and sound judgment, free from personal bias or external pressure that could compromise conclusions.',
    reference: 'Objectivity; Professional Independence',
  },
  {
    id: 'cma2-f-049',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Responsibility',
    subtopic: 'Continuing Education',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The purpose of continuing professional education (CPE) requirements is to:',
    options: [
      'Generate revenue for professional organizations',
      'Ensure professionals maintain and enhance their competence',
      'Limit entry into the profession',
      'Punish inactive members'
    ],
    correctAnswer: 1,
    explanation: 'CPE requirements ensure CMAs stay current with evolving standards, regulations, and best practices, maintaining the competence necessary for professional practice.',
    reference: 'CPE Requirements; Professional Development',
  },
  {
    id: 'cma2-f-050',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Responsibility',
    subtopic: 'Professional Skepticism',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Professional skepticism involves:',
    options: [
      'Distrusting all information sources',
      'Critically evaluating evidence and questioning assumptions',
      'Accepting all management representations',
      'Ignoring contradictory evidence'
    ],
    correctAnswer: 1,
    explanation: 'Professional skepticism means maintaining a questioning mind, critically assessing evidence, and being alert to conditions that may indicate errors or fraud.',
    reference: 'Professional Skepticism; Critical Thinking',
  },
];
