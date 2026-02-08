/**
 * CMA Part 2, Section F: Professional Ethics - Questions Batch 4 (Q76-100)
 * Weight: 15% of Part 2 Exam
 * 
 * Focus: Advanced ethical scenarios, conflict resolution, 
 * whistleblowing, corporate governance ethics
 * 
 * Topics covered:
 * - Complex ethical dilemmas
 * - Whistleblowing and retaliation
 * - Corporate governance and ethics
 * - Sarbanes-Oxley ethical requirements
 * - Global ethics considerations
 */

import { Question } from '../../../types';

export const CMA2F_QUESTIONS_BATCH4: Question[] = [
  // ==========================================
  // Whistleblowing and Reporting
  // ==========================================
  {
    id: 'cma2-f-076',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'Internal Reporting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A management accountant discovers that the CFO is manipulating revenue recognition. According to IMA guidelines, what should be the FIRST step?',
    options: [
      'Immediately resign from the company',
      'Report directly to the SEC',
      'Discuss the matter with the CFO\'s immediate superior or the audit committee',
      'Ignore it since it\'s above their authority'
    ],
    correctAnswer: 2,
    explanation: 'IMA\'s conflict resolution process recommends first discussing with immediate superior, then escalating through organizational levels (CFO\'s superior, audit committee, or board). External reporting to regulators should be a last resort after internal channels are exhausted or prove ineffective.',
    reference: 'IMA Statement of Ethical Professional Practice; Resolution of Ethical Conflict',
  },
  {
    id: 'cma2-f-077',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'Sarbanes-Oxley Protection',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Under the Sarbanes-Oxley Act, whistleblower protections include all of the following EXCEPT:',
    options: [
      'Protection from retaliation for reporting securities violations',
      'Right to file complaints with the Department of Labor',
      'Guaranteed anonymity in all circumstances',
      'Reinstatement with back pay if wrongfully terminated'
    ],
    correctAnswer: 2,
    explanation: 'SOX provides protection from retaliation, DOL complaint rights, and remedies including reinstatement with back pay. However, SOX does not guarantee anonymity in all circumstances—while anonymous tips are accepted, legal proceedings may require identification.',
    reference: 'SOX Section 806; Whistleblower Protections',
  },
  {
    id: 'cma2-f-078',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Whistleblowing',
    subtopic: 'External Reporting',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A CMA has reported financial fraud through all internal channels without resolution. The audit committee has dismissed the concerns. What should the CMA do next?',
    options: [
      'Accept the audit committee\'s decision and remain silent',
      'Secretly leak information to the press',
      'Consider consulting legal counsel about external reporting options',
      'Continue working and documenting issues indefinitely'
    ],
    correctAnswer: 2,
    explanation: 'When internal channels are exhausted, IMA guidance suggests consulting legal counsel about options, which may include external reporting to regulatory authorities. Anonymous leaks are not recommended. The accountant should not simply accept unresolved fraud or wait indefinitely.',
    reference: 'IMA Ethical Conflict Resolution; SOX Whistleblower Provisions',
  },

  // ==========================================
  // Corporate Governance Ethics
  // ==========================================
  {
    id: 'cma2-f-079',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Corporate Governance',
    subtopic: 'Board Independence',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which situation would most likely impair a board member\'s independence?',
    options: [
      'Owning less than 1% of company stock',
      'Serving on the board for two consecutive three-year terms',
      'Having a consulting contract with the company worth $500,000 annually',
      'Being a retired executive from an unrelated industry'
    ],
    correctAnswer: 2,
    explanation: 'Significant financial relationships with the company impair independence. A $500,000 consulting contract creates economic dependence. Minor stock ownership, reasonable tenure, and unrelated industry experience typically do not impair independence.',
    reference: 'NYSE/NASDAQ Independence Standards; SOX Section 301',
  },
  {
    id: 'cma2-f-080',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Corporate Governance',
    subtopic: 'Audit Committee',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under SOX, the audit committee of a public company must:',
    options: [
      'Include at least one member from management',
      'Be composed entirely of independent directors',
      'Report directly to the CEO',
      'Meet only annually'
    ],
    correctAnswer: 1,
    explanation: 'SOX Section 301 requires audit committees to be composed entirely of independent directors. The committee reports to the full board and oversees external auditors. Management should not be on the audit committee. Meetings are typically quarterly or more frequent.',
    reference: 'SOX Section 301; Audit Committee Independence',
  },
  {
    id: 'cma2-f-081',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Corporate Governance',
    subtopic: 'Financial Expert',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'SOX requires public companies to disclose whether the audit committee includes a "financial expert." Which qualification is NOT required for this designation?',
    options: [
      'Understanding of GAAP',
      'Experience preparing or auditing financial statements',
      'CPA licensure',
      'Understanding of internal controls'
    ],
    correctAnswer: 2,
    explanation: 'A financial expert must understand GAAP, have financial statement experience, and understand internal controls. CPA licensure is not required—qualifying experience can come from various finance and accounting roles without professional certification.',
    reference: 'SOX Section 407; SEC Audit Committee Financial Expert Definition',
  },

  // ==========================================
  // Confidentiality Challenges
  // ==========================================
  {
    id: 'cma2-f-082',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Confidentiality',
    subtopic: 'Legal Requirements',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A CMA receives a subpoena requiring disclosure of confidential company information. The CMA should:',
    options: [
      'Refuse to comply citing professional ethics',
      'Immediately provide all requested information',
      'Consult with legal counsel and comply with valid legal requirements',
      'Destroy the subpoenaed documents'
    ],
    correctAnswer: 2,
    explanation: 'While confidentiality is a core standard, it does not override valid legal requirements. The proper response is to consult legal counsel, verify the subpoena\'s validity, and comply with lawful disclosure orders. Obstruction (refusing or destroying documents) is illegal.',
    reference: 'IMA Confidentiality Standard; Legal Disclosure Requirements',
  },
  {
    id: 'cma2-f-083',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Confidentiality',
    subtopic: 'Post-Employment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'After leaving the company, a former CMA is asked by a new employer about the previous company\'s cost structure. The former CMA should:',
    options: [
      'Share the information freely since employment ended',
      'Maintain confidentiality of proprietary information',
      'Share only "general" information but not specifics',
      'Negotiate a consulting fee before sharing'
    ],
    correctAnswer: 1,
    explanation: 'Confidentiality obligations continue after employment ends. Proprietary information such as cost structures, pricing strategies, and trade secrets must remain confidential indefinitely unless the information becomes public or disclosure is legally required.',
    reference: 'IMA Confidentiality Standard; Post-Employment Obligations',
  },
  {
    id: 'cma2-f-084',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Confidentiality',
    subtopic: 'Information Sharing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A management accountant is preparing a presentation for potential investors. Which information requires the MOST careful handling?',
    options: [
      'Published annual report data',
      'Industry benchmarks from public sources',
      'Customer-specific pricing and terms not yet finalized',
      'General market trends'
    ],
    correctAnswer: 2,
    explanation: 'Customer-specific pricing and unfinalized deals are confidential business information. Selective disclosure to investors could also violate SEC Regulation FD. Published reports, public benchmarks, and general trends are already in the public domain.',
    reference: 'IMA Confidentiality Standard; SEC Regulation FD',
  },

  // ==========================================
  // Integrity Scenarios
  // ==========================================
  {
    id: 'cma2-f-085',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Integrity',
    subtopic: 'Conflicts of Interest',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A controller\'s spouse owns a significant equity stake in a potential vendor. The controller is responsible for vendor selection. What ethical course of action should the controller take?',
    options: [
      'Proceed with vendor evaluation without disclosure',
      'Automatically select a different vendor to avoid any question',
      'Disclose the conflict and recuse from the vendor selection process',
      'Sell the spouse\'s stake before conducting the evaluation'
    ],
    correctAnswer: 2,
    explanation: 'The integrity standard requires disclosure of conflicts of interest and abstaining from activities that could impair judgment. The proper response is disclosure and recusal. Simply switching vendors or divesting doesn\'t address the underlying conflict process issue.',
    reference: 'IMA Integrity Standard; Conflict of Interest Policies',
  },
  {
    id: 'cma2-f-086',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Integrity',
    subtopic: 'Gifts and Entertainment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A vendor offers an all-expenses-paid vacation to a management accountant who influences purchasing decisions. The CMA should:',
    options: [
      'Accept if no immediate purchase is pending',
      'Accept but disclose it to their supervisor',
      'Decline the gift as it could impair objectivity',
      'Accept if the trip includes business meetings'
    ],
    correctAnswer: 2,
    explanation: 'Lavish gifts from vendors create conflicts of interest and the appearance of impropriety. The integrity standard requires avoiding activities that could impair professional judgment. An all-expenses-paid vacation exceeds normal business courtesies regardless of timing or activities.',
    reference: 'IMA Integrity Standard; Gift Policies',
  },
  {
    id: 'cma2-f-087',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Integrity',
    subtopic: 'Subversion of Goals',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A sales manager asks the CMA to "hold off" on recording certain expenses until Q1 to help Q4 results look better. This request:',
    options: [
      'Is acceptable if amounts are immaterial',
      'Is a violation of the integrity standard',
      'Is acceptable with proper disclosure in footnotes',
      'Is a normal business practice to smooth earnings'
    ],
    correctAnswer: 1,
    explanation: 'Intentionally delaying expense recognition to manipulate period results violates both GAAP matching principle and the integrity standard (refrain from subverting lawful organization objectives). Materiality doesn\'t excuse intentional manipulation.',
    reference: 'IMA Integrity Standard; GAAP Expense Recognition',
  },

  // ==========================================
  // Credibility Standard
  // ==========================================
  {
    id: 'cma2-f-088',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Credibility',
    subtopic: 'Fair Communication',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The credibility standard requires management accountants to:',
    options: [
      'Always present information in the best possible light',
      'Disclose all information fairly and objectively',
      'Only report positive developments to management',
      'Filter out information that may concern stakeholders'
    ],
    correctAnswer: 1,
    explanation: 'Credibility requires communicating information fairly and objectively. This means balanced reporting that includes both positive and negative developments, not selective presentation that misleads users.',
    reference: 'IMA Credibility Standard',
  },
  {
    id: 'cma2-f-089',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Credibility',
    subtopic: 'Information Disclosure',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Management asks the CMA to prepare a report omitting significant cost overruns on a major project. The CMA should:',
    options: [
      'Comply if instructed by a superior',
      'Include the information to meet the credibility standard of full disclosure',
      'Omit it but note "certain items excluded" in the report',
      'Present it only if specifically asked'
    ],
    correctAnswer: 1,
    explanation: 'The credibility standard requires disclosure of all relevant information that could reasonably affect users\' decisions. Material cost overruns must be disclosed. Following orders to suppress material information violates professional standards.',
    reference: 'IMA Credibility Standard; Material Information Disclosure',
  },
  {
    id: 'cma2-f-090',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Credibility',
    subtopic: 'Limitations and Assumptions',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When presenting a financial forecast, the credibility standard requires the CMA to:',
    options: [
      'Present only the most likely outcome',
      'Emphasize optimistic scenarios to maintain morale',
      'Disclose assumptions, limitations, and uncertainties',
      'Avoid numerical ranges that suggest uncertainty'
    ],
    correctAnswer: 2,
    explanation: 'Credibility requires disclosing limitations of data and analysis. Forecasts should clearly communicate key assumptions, describe uncertainties, and may include range or scenario analysis to convey appropriate level of confidence.',
    reference: 'IMA Credibility Standard; Forecast Disclosure',
  },

  // ==========================================
  // Global Ethics
  // ==========================================
  {
    id: 'cma2-f-091',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'FCPA',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Under the Foreign Corrupt Practices Act (FCPA), which payment to a foreign official is MOST LIKELY prohibited?',
    options: [
      'A $50 payment to expedite routine paperwork at customs',
      'A $50,000 payment to win a government construction contract',
      'A hotel room for an official attending an educational conference',
      'Local taxi fare for an official visiting a company facility'
    ],
    correctAnswer: 1,
    explanation: 'FCPA prohibits corrupt payments to obtain or retain business. A $50,000 payment to win a contract is bribery. Small "facilitating payments" for routine government actions (though discouraged), reasonable business hospitality, and local transportation may be permissible.',
    reference: 'Foreign Corrupt Practices Act; DOJ FCPA Guidance',
  },
  {
    id: 'cma2-f-092',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'Cultural Considerations',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A subsidiary in a country where gift-giving is customary requests an increase in its "business development" budget, historically used for gifts to government officials. The CMA should:',
    options: [
      'Approve the request to respect local customs',
      'Deny automatically as all gifts are prohibited',
      'Evaluate whether proposed gifts comply with FCPA and company policy',
      'Approve only if the subsidiary agrees to no written records'
    ],
    correctAnswer: 2,
    explanation: 'Cultural practices don\'t override legal requirements. The CMA should evaluate gift value, purpose, recipients, and compliance with FCPA and company policy. Some modest gifts may be acceptable; bribes disguised as cultural gifts are not. Accurate record-keeping is required.',
    reference: 'FCPA Books and Records Requirements; Anti-Bribery Compliance',
  },
  {
    id: 'cma2-f-093',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Global Ethics',
    subtopic: 'Third-Party Agents',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A company uses a local agent to win foreign contracts. The agent charges 25% commission (normal is 5%) and has connections to government officials. What red flag does this present?',
    options: [
      'The commission is tax-inefficient',
      'Potential for pass-through bribes violating FCPA',
      'Agent commissions should be fixed fees',
      'Local agents are always prohibited'
    ],
    correctAnswer: 1,
    explanation: 'Excessive commissions to agents with government connections are classic FCPA red flags for pass-through bribery. Companies can be liable for agents\' corrupt payments. Due diligence must assess whether commissions cover legitimate services or fund bribes.',
    reference: 'FCPA Third-Party Liability; Agent Due Diligence',
  },

  // ==========================================
  // Ethics Programs and Training
  // ==========================================
  {
    id: 'cma2-f-094',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Ethics Programs',
    subtopic: 'Code of Conduct',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An effective corporate code of conduct should include:',
    options: [
      'Only high-level principles without specific guidance',
      'Specific policies, reporting mechanisms, and consequences for violations',
      'Only rules applicable to accounting personnel',
      'Guidelines that vary by employee seniority'
    ],
    correctAnswer: 1,
    explanation: 'Effective codes include clear policies, examples, reporting channels (hotlines), investigation procedures, and consistent consequences. They apply to all employees regardless of level and include specific guidance beyond general principles.',
    reference: 'Federal Sentencing Guidelines; Effective Compliance Programs',
  },
  {
    id: 'cma2-f-095',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Ethics Programs',
    subtopic: 'Training',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Ethics training programs are most effective when they:',
    options: [
      'Require a one-time certification at hire',
      'Include ongoing training with scenario-based discussions',
      'Focus exclusively on legal compliance',
      'Are optional for senior management'
    ],
    correctAnswer: 1,
    explanation: 'Effective ethics programs include regular training with case studies and scenarios, not just initial certification. Training should address values beyond minimum legal compliance and apply to all levels—senior management tone at the top is critical.',
    reference: 'Federal Sentencing Guidelines; Ethics Program Best Practices',
  },
  {
    id: 'cma2-f-096',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Ethics Programs',
    subtopic: 'Hotlines',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which feature is MOST important for an effective ethics hotline?',
    options: [
      'Direct routing to the CEO\'s office',
      'Ability to report anonymously without fear of retaliation',
      'Recording all calls for quality assurance',
      'Limiting access to work hours only'
    ],
    correctAnswer: 1,
    explanation: 'Anonymous reporting and protection from retaliation are essential for hotline effectiveness. Employees must trust they can report without consequences. 24/7 access, confidentiality, and independent handling (often third-party) improve reporting rates.',
    reference: 'SOX Section 301; Whistleblower Hotline Best Practices',
  },

  // ==========================================
  // Advanced Ethical Dilemmas
  // ==========================================
  {
    id: 'cma2-f-097',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Ethical Dilemmas',
    subtopic: 'Competing Interests',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A CMA must choose between disclosing a material weakness that will hurt share price and protecting shareholder value. Which ethical principle should guide this decision?',
    options: [
      'Shareholder wealth maximization supersedes disclosure',
      'Integrity requires disclosure of material information regardless of consequences',
      'Confidentiality prevents disclosure of internal control issues',
      'Competence means finding ways to minimize the disclosed impact'
    ],
    correctAnswer: 1,
    explanation: 'Integrity requires honest disclosure of material information. SOX mandates disclosure of material weaknesses. Protecting share price by concealing problems is fraudulent. Long-term shareholder interests are served by transparency, not concealment.',
    reference: 'IMA Integrity Standard; SOX Section 404 Disclosure Requirements',
  },
  {
    id: 'cma2-f-098',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Ethical Dilemmas',
    subtopic: 'Following Orders',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'The CEO instructs the CMA to record contingent liabilities below the threshold for disclosure. This violates GAAP but is "common practice." The CMA should:',
    options: [
      'Follow the instruction as the CEO assumes responsibility',
      'Document the instruction and execute it to protect their job',
      'Refuse to participate in the misstatement and escalate the issue',
      'Comply but add a note to personal files in case of future inquiry'
    ],
    correctAnswer: 2,
    explanation: 'CMAs cannot subordinate professional judgment to supervisors\' instructions that violate standards. "Common practice" and superior\'s orders are not defenses. The CMA should refuse, document, and escalate through appropriate channels.',
    reference: 'IMA Integrity Standard; Professional Responsibility',
  },
  {
    id: 'cma2-f-099',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Ethical Dilemmas',
    subtopic: 'Utilitarianism vs Rules',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A plant closing will devastate a small town but preserve the company. Delaying the announcement for two weeks would allow employees to cash out retirement funds. From an ethical standpoint:',
    options: [
      'Delay is justified if it helps more people',
      'Immediate disclosure is required regardless of impact on employees',
      'Material information must be disclosed timely; alternative support should be explored',
      'Ethical rules don\'t apply to difficult business decisions'
    ],
    correctAnswer: 2,
    explanation: 'Material events require timely disclosure under securities laws. Delayed disclosure to allow insider trading (even by employees) is illegal. The ethical response is proper disclosure plus exploring legitimate assistance programs, severance, or transition support.',
    reference: 'SEC Disclosure Requirements; Insider Trading Prohibitions',
  },
  {
    id: 'cma2-f-100',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-F',
    topic: 'Professional Development',
    subtopic: 'CPE Requirements',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'To maintain the CMA certification, the required annual CPE hours are:',
    options: [
      '20 hours',
      '30 hours',
      '40 hours',
      '60 hours'
    ],
    correctAnswer: 1,
    explanation: 'CMA certification requires 30 hours of CPE annually. At least two hours must be in ethics. This supports the competence standard of maintaining professional knowledge and skills.',
    reference: 'IMA CMA Certification Requirements; CPE Policy',
  },
];
