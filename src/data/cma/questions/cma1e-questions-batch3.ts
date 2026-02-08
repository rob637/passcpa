/**
 * CMA Part 1, Section E: Internal Controls - Questions Batch 3 (Q51-75)
 * Weight: 15% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-E: Internal Controls
 * 
 * Topics covered:
 * - COSO ERM Framework
 * - IT General Controls
 * - Cybersecurity Controls
 * - Fraud Risk Management
 * - Internal Audit Role
 * - SOX Compliance
 */

import { Question } from '../../../types';

export const CMA1E_QUESTIONS_BATCH3: Question[] = [
  // ==========================================
  // COSO ERM Framework
  // ==========================================
  {
    id: 'cma1-e-051',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'COSO ERM',
    subtopic: 'Components',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The COSO ERM framework (2017) emphasizes the integration of:',
    options: [
      'Risk management with financial reporting only',
      'Risk management with strategy and performance',
      'Compliance with tax regulations',
      'Internal audit with external audit'
    ],
    correctAnswer: 1,
    explanation: 'The 2017 COSO ERM framework explicitly links enterprise risk management to strategy-setting and performance, recognizing that risk affects an organization\'s ability to achieve strategic objectives.',
    reference: 'COSO ERM Framework 2017',
  },
  {
    id: 'cma1-e-053',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'COSO ERM',
    subtopic: 'Risk Response',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company purchases insurance to manage the risk of property damage. This is an example of:',
    options: [
      'Risk avoidance',
      'Risk reduction',
      'Risk sharing (transfer)',
      'Risk acceptance'
    ],
    correctAnswer: 2,
    explanation: 'Insurance transfers financial consequences of risk to a third party (insurer). Risk sharing/transfer doesn\'t eliminate the risk but shifts its impact. Avoidance would mean eliminating the activity causing risk.',
    reference: 'Risk Response Strategies',
  },
  {
    id: 'cma1-e-054',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'COSO ERM',
    subtopic: 'Inherent vs Residual Risk',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Residual risk is the risk that remains after:',
    options: [
      'Insurance coverage',
      'Management response and control activities',
      'Initial risk identification',
      'External audit procedures'
    ],
    correctAnswer: 1,
    explanation: 'Residual risk = Inherent risk - Effect of controls/responses. It\'s the risk remaining after management implements control activities. Organizations must ensure residual risk aligns with risk appetite.',
    reference: 'Inherent and Residual Risk',
  },

  // ==========================================
  // IT General Controls (ITGC)
  // ==========================================
  {
    id: 'cma1-e-055',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'ITGC Categories',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'IT General Controls typically include all of the following EXCEPT:',
    options: [
      'Access security controls',
      'Change management controls',
      'Three-way matching in accounts payable',
      'Computer operations controls'
    ],
    correctAnswer: 2,
    explanation: 'Three-way matching is an application control (specific to A/P). ITGCs are broader: access security, change management, operations, and backup/recovery that support all applications.',
    reference: 'IT General Controls',
  },
  {
    id: 'cma1-e-056',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'Access Controls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Least privilege access means:',
    options: [
      'All users have the same limited access',
      'Users are granted only the minimum access needed for their job',
      'Access is granted only to senior management',
      'Temporary access for contractors only'
    ],
    correctAnswer: 1,
    explanation: 'Least privilege principle: Users should have only the minimum access rights necessary to perform their job functions. This reduces risk from both errors and intentional misuse.',
    reference: 'Principle of Least Privilege',
  },
  {
    id: 'cma1-e-057',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'Change Management',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Proper change management controls require:',
    options: [
      'Emergency changes to bypass all approvals',
      'Developers to test and approve their own changes',
      'Separation between development, testing, and production environments',
      'All changes to be made directly in production'
    ],
    correctAnswer: 2,
    explanation: 'Segregation of environments ensures changes are developed, tested, and approved before moving to production. This prevents untested or unauthorized changes from affecting live systems.',
    reference: 'IT Change Management',
  },
  {
    id: 'cma1-e-058',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'Backup and Recovery',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Regular testing of backup restoration is important because:',
    options: [
      'Backups are automatically successful',
      'It verifies that backups can actually be restored when needed',
      'Auditors require it for every transaction',
      'It eliminates the need for disaster recovery planning'
    ],
    correctAnswer: 1,
    explanation: 'Backup files can become corrupted or incompatible. Regular restoration testing confirms data integrity and verifies the organization can actually recover systems in an emergency.',
    reference: 'Backup Testing',
  },

  // ==========================================
  // Cybersecurity Controls
  // ==========================================
  {
    id: 'cma1-e-059',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Cybersecurity',
    subtopic: 'Defense in Depth',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Defense in depth refers to:',
    options: [
      'Having one very strong security control',
      'Multiple layers of security controls',
      'Deep analysis of a single vulnerability',
      'Defensive security staffing levels'
    ],
    correctAnswer: 1,
    explanation: 'Defense in depth uses multiple overlapping security layers (firewalls, encryption, access controls, monitoring). If one layer fails, others still provide protection.',
    reference: 'Defense in Depth Strategy',
  },
  {
    id: 'cma1-e-060',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Cybersecurity',
    subtopic: 'Phishing',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The MOST effective control against phishing attacks is:',
    options: [
      'Installing faster internet connections',
      'Employee security awareness training',
      'Purchasing more servers',
      'Increasing IT department budget'
    ],
    correctAnswer: 1,
    explanation: 'Phishing exploits human behavior. While technical controls help, training employees to recognize and report phishing attempts is the most effective defense against social engineering attacks.',
    reference: 'Phishing Prevention',
  },
  {
    id: 'cma1-e-061',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Cybersecurity',
    subtopic: 'Multi-Factor Authentication',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Multi-factor authentication requires at least two of which authentication types?',
    options: [
      'Two different passwords',
      'Something you know, have, or are',
      'Username and email address',
      'Badge and key card'
    ],
    correctAnswer: 1,
    explanation: 'MFA combines factors from different categories: knowledge (password), possession (phone/token), inherent (biometrics). Two passwords are single-factor; two cards are also single-factor.',
    reference: 'Multi-Factor Authentication',
  },
  {
    id: 'cma1-e-062',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Cybersecurity',
    subtopic: 'Encryption',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Data encryption protects against:',
    options: [
      'Denial of service attacks',
      'Unauthorized access to data if storage media is stolen',
      'System performance degradation',
      'Database structure errors'
    ],
    correctAnswer: 1,
    explanation: 'Encryption renders data unreadable without the decryption key. If encrypted storage devices are lost or stolen, the data remains protected from unauthorized access.',
    reference: 'Data Encryption',
  },

  // ==========================================
  // Fraud Risk Management
  // ==========================================
  {
    id: 'cma1-e-063',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Risk',
    subtopic: 'Fraud Triangle',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The fraud triangle includes opportunity, rationalization, and:',
    options: [
      'Authorization',
      'Pressure (incentive/motivation)',
      'Capability',
      'Regulation'
    ],
    correctAnswer: 1,
    explanation: 'The fraud triangle identifies three conditions for fraud: (1) Pressure/Incentive (motivation to commit fraud), (2) Opportunity (weak controls), (3) Rationalization (justifying the act).',
    reference: 'Fraud Triangle',
  },
  {
    id: 'cma1-e-064',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Risk',
    subtopic: 'Red Flags',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which behavior is a potential red flag for employee fraud?',
    options: [
      'Taking scheduled vacation time',
      'Working late and refusing to share duties',
      'Asking questions about processes',
      'Participating in team meetings'
    ],
    correctAnswer: 1,
    explanation: 'Refusing vacations and not sharing work are red flags—fraudsters often must be present to prevent detection. Normal behaviors like vacations, questions, and meetings are not warning signs.',
    reference: 'Fraud Red Flags',
  },
  {
    id: 'cma1-e-065',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Risk',
    subtopic: 'Segregation of Duties',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which combination of duties creates a segregation of duties violation?',
    options: [
      'Approving purchases and receiving goods',
      'Preparing deposits and recording cash receipts',
      'Both A and B',
      'Neither A nor B'
    ],
    correctAnswer: 2,
    explanation: 'Both create risk: A allows approving and receiving (could approve fictitious purchases), B allows handling cash and recording it (could steal and hide in records). Incompatible duties should be separated.',
    reference: 'Segregation of Duties',
  },
  {
    id: 'cma1-e-066',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Risk',
    subtopic: 'Whistleblower Hotlines',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Anonymous reporting hotlines are effective fraud controls because:',
    options: [
      'They replace the need for other controls',
      'Tips are the most common way occupational frauds are detected',
      'Anonymous reports are always accurate',
      'They satisfy all SOX requirements'
    ],
    correctAnswer: 1,
    explanation: 'According to ACFE studies, tips are the #1 detection method for occupational fraud. Anonymous hotlines encourage reporting by protecting reporters from retaliation.',
    reference: 'Fraud Detection Methods',
  },

  // ==========================================
  // Internal Audit Role
  // ==========================================
  {
    id: 'cma1-e-068',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Internal Audit',
    subtopic: 'Risk-Based Auditing',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A risk-based internal audit plan:',
    options: [
      'Audits all departments equally',
      'Focuses resources on highest-risk areas',
      'Eliminates the need for control testing',
      'Only audits areas with prior findings'
    ],
    correctAnswer: 1,
    explanation: 'Risk-based auditing prioritizes audit resources toward areas with highest risk or greatest potential impact. This is more effective than rotating equally through all areas.',
    reference: 'Risk-Based Audit Planning',
  },
  {
    id: 'cma1-e-069',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Internal Audit',
    subtopic: 'Consulting vs Assurance',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which is a consulting (advisory) service of internal audit?',
    options: [
      'Testing controls for effectiveness',
      'Providing recommendations for process improvement',
      'Expressing opinions on financial statements',
      'Certifying compliance with regulations'
    ],
    correctAnswer: 1,
    explanation: 'Consulting services are advisory: recommendations, training, facilitation. Assurance services provide independent assessments (testing controls, expressing opinions). Both are legitimate IA activities.',
    reference: 'Internal Audit Services',
  },

  // ==========================================
  // SOX Compliance
  // ==========================================
  {
    id: 'cma1-e-070',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'SOX Compliance',
    subtopic: 'Section 302',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'SOX Section 302 requires:',
    options: [
      'External auditor rotation every 5 years',
      'CEO and CFO certification of financial reports',
      'Formation of an audit committee',
      'Disclosure of material off-balance-sheet items'
    ],
    correctAnswer: 1,
    explanation: 'Section 302 requires CEO and CFO to personally certify that financial statements are accurate and complete, that they reviewed the report, and that disclosure controls are effective.',
    reference: 'SOX Section 302',
  },
  {
    id: 'cma1-e-071',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'SOX Compliance',
    subtopic: 'Section 404',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under SOX Section 404, a "material weakness" in internal control:',
    options: [
      'Must be corrected within 30 days',
      'Could result in a material misstatement not being prevented or detected',
      'Is automatically considered fraud',
      'Only affects the audit fee'
    ],
    correctAnswer: 1,
    explanation: 'A material weakness is a deficiency so severe that there\'s reasonable possibility a material misstatement won\'t be prevented or detected timely. It results in an adverse opinion on ICFR.',
    reference: 'Material Weakness Definition',
  },
  {
    id: 'cma1-e-072',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'SOX Compliance',
    subtopic: 'Deficiency Classification',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'In order of severity, control deficiencies are classified as:',
    options: [
      'Material weakness, significant deficiency, deficiency',
      'Deficiency, material weakness, significant deficiency',
      'Significant deficiency, deficiency, material weakness',
      'Deficiency, significant deficiency, material weakness'
    ],
    correctAnswer: 3,
    explanation: 'From lowest to highest severity: Deficiency (less severe) → Significant Deficiency (less than material but worth reporting) → Material Weakness (most severe, requires disclosure).',
    reference: 'Control Deficiency Classification',
  },

  // ==========================================
  // Corporate Governance
  // ==========================================
  {
    id: 'cma1-e-073',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Corporate Governance',
    subtopic: 'Board Responsibilities',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The board of directors\' primary responsibility regarding internal control is to:',
    options: [
      'Perform daily control testing',
      'Provide oversight and set the tone at the top',
      'Execute all control activities',
      'Prepare financial statements'
    ],
    correctAnswer: 1,
    explanation: 'The board provides oversight, not execution. It sets expectations ("tone at the top"), ensures adequate systems exist, and holds management accountable. Management designs and operates controls.',
    reference: 'Board Governance Responsibilities',
  },
  {
    id: 'cma1-e-074',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Corporate Governance',
    subtopic: 'Audit Committee',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'NYSE listing standards require audit committee members to be:',
    options: [
      'Senior executives of the company',
      'Independent directors with financial literacy',
      'External auditors',
      'Government regulators'
    ],
    correctAnswer: 1,
    explanation: 'Audit committees must consist of independent directors (no material relationship with company) who are financially literate. At least one should be a "financial expert."',
    reference: 'Audit Committee Requirements',
  },
  {
    id: 'cma1-e-075',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Corporate Governance',
    subtopic: 'Code of Conduct',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A code of conduct is MOST effective when:',
    options: [
      'Distributed once during onboarding only',
      'Communicated and reinforced regularly with leadership modeling compliance',
      'Applied only to lower-level employees',
      'Kept confidential from employees'
    ],
    correctAnswer: 1,
    explanation: 'Effective codes require ongoing communication, training, and visible leadership commitment (tone at the top). One-time distribution or selective application undermines effectiveness.',
    reference: 'Code of Conduct Effectiveness',
  },
];
