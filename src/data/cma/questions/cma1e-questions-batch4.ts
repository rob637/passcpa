/**
 * CMA Part 1, Section E: Internal Controls - Questions Batch 4 (Q76-100)
 * Weight: 15% of Part 1 Exam
 * 
 * Focus: Advanced internal control topics, SOX compliance,
 * IT controls, audit committee oversight, fraud prevention
 * 
 * Topics covered:
 * - SOX Section 404 requirements
 * - Control testing and documentation
 * - IT application controls
 * - Segregation of duties
 * - Audit committee role
 * - Fraud prevention and detection
 */

import { Question } from '../../../types';

export const CMA1E_QUESTIONS_BATCH4: Question[] = [
  // ==========================================
  // SOX Section 404 Compliance
  // ==========================================
  {
    id: 'cma1-e-076',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'SOX Compliance',
    subtopic: 'Management Assessment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under SOX Section 404, management is required to:',
    options: [
      'Design IT systems for the company',
      'Assess the effectiveness of internal control over financial reporting',
      'Perform external audits of competitors',
      'Set employee compensation levels'
    ],
    correctAnswer: 1,
    explanation: 'SOX Section 404(a) requires management to assess and report on the effectiveness of internal control over financial reporting (ICFR). Management must document controls, test their operating effectiveness, and disclose any material weaknesses.',
    reference: 'SOX Section 404(a); SEC Rules',
  },
  {
    id: 'cma1-e-077',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'SOX Compliance',
    subtopic: 'Material Weakness',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A material weakness in internal control over financial reporting is defined as:',
    options: [
      'Any control deficiency identified by auditors',
      'A deficiency with a reasonable possibility of not preventing a material misstatement',
      'A minor process improvement opportunity',
      'A deficiency that has already resulted in material fraud'
    ],
    correctAnswer: 1,
    explanation: 'A material weakness is a deficiency, or combination of deficiencies, where there is a reasonable possibility that a material misstatement will not be prevented or detected on a timely basis. It doesn\'t require actual misstatement—just reasonable possibility.',
    reference: 'AS 2201; SEC Definitions',
  },
  {
    id: 'cma1-e-078',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'SOX Compliance',
    subtopic: 'Significant Deficiency',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The key difference between a significant deficiency and a material weakness is:',
    options: [
      'Significant deficiencies are reported publicly; material weaknesses are not',
      'Material weaknesses have a "reasonable possibility" standard; significant deficiencies are "more than remote"',
      'Significant deficiencies only affect cash accounts',
      'Material weaknesses require restatement; significant deficiencies do not'
    ],
    correctAnswer: 1,
    explanation: 'Material weakness: reasonable possibility of material misstatement not being prevented/detected. Significant deficiency: less severe—adversely affects control environment, but lower likelihood or magnitude than material weakness. Both warrant attention of responsible parties.',
    reference: 'AS 2201; Deficiency Classification',
  },
  {
    id: 'cma1-e-079',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'SOX Compliance',
    subtopic: 'Accelerated Filers',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under SOX Section 404(b), which companies require auditor attestation on internal controls?',
    options: [
      'All public companies regardless of size',
      'Accelerated filers and large accelerated filers only',
      'Only Fortune 500 companies',
      'All private companies'
    ],
    correctAnswer: 1,
    explanation: 'SOX 404(b) auditor attestation is required for accelerated filers (market cap ≥$75M) and large accelerated filers (≥$700M). Smaller reporting companies (non-accelerated filers) are exempt from the auditor attestation requirement.',
    reference: 'SOX Section 404(b); SEC Filer Categories',
  },

  // ==========================================
  // Control Documentation
  // ==========================================
  {
    id: 'cma1-e-080',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Documentation',
    subtopic: 'Flowcharts',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Process flowcharts are MOST useful for:',
    options: [
      'Calculating financial ratios',
      'Identifying control points and potential segregation of duties issues',
      'Setting budgets for departments',
      'Determining tax liabilities'
    ],
    correctAnswer: 1,
    explanation: 'Flowcharts visually map processes, showing where controls exist, who performs each step, and where duties should be segregated. They help identify gaps, redundancies, and potential control weaknesses in transaction flows.',
    reference: 'Control Documentation Best Practices',
  },
  {
    id: 'cma1-e-081',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Documentation',
    subtopic: 'Risk Control Matrix',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A risk and control matrix (RCM) typically includes all of the following EXCEPT:',
    options: [
      'Identified risks and related controls',
      'Control owner and testing procedures',
      'Employee salary information',
      'Control frequency and documentation'
    ],
    correctAnswer: 2,
    explanation: 'An RCM maps risks to controls, identifies owners, describes testing procedures, and notes frequency and documentation. Employee compensation is an HR function unrelated to control documentation.',
    reference: 'Risk Control Matrix Components',
  },
  {
    id: 'cma1-e-082',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Documentation',
    subtopic: 'Narratives',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Control narratives describe:',
    options: [
      'Only automated controls',
      'How controls are designed and intended to operate',
      'Historical stock prices',
      'Marketing strategies'
    ],
    correctAnswer: 1,
    explanation: 'Narratives are written descriptions of control design and operation—who performs what steps, when, using what documents or systems. They complement flowcharts and may include both automated and manual controls.',
    reference: 'Control Documentation Methods',
  },

  // ==========================================
  // Control Testing
  // ==========================================
  {
    id: 'cma1-e-083',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Testing',
    subtopic: 'Walkthrough',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A control walkthrough involves:',
    options: [
      'Testing a large statistical sample of transactions',
      'Tracing a single transaction through the entire process to understand control design',
      'Reviewing only automated controls',
      'Interviewing external customers'
    ],
    correctAnswer: 1,
    explanation: 'Walkthroughs trace one or a few transactions end-to-end through a process, confirming understanding of process flow and control design. They complement (but don\'t replace) testing samples for operating effectiveness.',
    reference: 'AS 2201; Walkthrough Procedures',
  },
  {
    id: 'cma1-e-084',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Testing',
    subtopic: 'Sample Size',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'When testing a daily control for operational effectiveness, a typical sample size is:',
    options: [
      '1-2 items',
      '5-15 items',
      '25-60 items',
      'All items from the period'
    ],
    correctAnswer: 2,
    explanation: 'For controls operating daily throughout the year, sample sizes typically range 25-60 items to provide reasonable assurance. Higher frequency controls require larger samples. Annual controls may be tested with just one item.',
    reference: 'AS 2201; Control Testing Sample Sizes',
  },
  {
    id: 'cma1-e-085',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Testing',
    subtopic: 'Exception Handling',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'If control testing reveals one exception in a sample of 40 transactions, the evaluator should:',
    options: [
      'Automatically conclude the control is ineffective',
      'Ignore the exception if immaterial',
      'Investigate the nature and cause of the exception to determine impact',
      'Expand testing to the entire population'
    ],
    correctAnswer: 2,
    explanation: 'Exceptions require investigation—is it a one-time processing error, a systemic design flaw, or compensating control? The nature and cause determine whether the control is effective. One exception doesn\'t automatically mean failure.',
    reference: 'AS 2201; Exception Evaluation',
  },

  // ==========================================
  // Segregation of Duties
  // ==========================================
  {
    id: 'cma1-e-086',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Segregation of Duties',
    subtopic: 'Core Functions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Proper segregation of duties separates which three functions?',
    options: [
      'Marketing, sales, and service',
      'Authorization, custody, and recordkeeping',
      'Budgeting, forecasting, and planning',
      'Hiring, training, and termination'
    ],
    correctAnswer: 1,
    explanation: 'The three incompatible functions are: authorization (approving transactions), custody (physical control of assets), and recordkeeping (maintaining accounting records). Separating these prevents fraud and errors.',
    reference: 'COSO Internal Control Framework; Segregation of Duties',
  },
  {
    id: 'cma1-e-087',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Segregation of Duties',
    subtopic: 'Violation Scenario',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which situation represents a segregation of duties violation?',
    options: [
      'The sales manager approves customer credit limits',
      'The controller reviews and signs checks prepared by accounts payable',
      'The purchasing agent can both approve vendors and record purchases',
      'The HR manager maintains employee time records'
    ],
    correctAnswer: 2,
    explanation: 'When the purchasing agent approves vendors (authorization) AND records purchases (recordkeeping), they can set up fictitious vendors and record fraudulent transactions. This violates SOD principles.',
    reference: 'Segregation of Duties Best Practices',
  },
  {
    id: 'cma1-e-088',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Segregation of Duties',
    subtopic: 'Compensating Controls',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'In a small company where perfect segregation of duties is not feasible, which is the BEST compensating control?',
    options: [
      'Having no controls at all',
      'Owner/management review and oversight of transactions',
      'Delegating all functions to the most trusted employee',
      'External audit only at year-end'
    ],
    correctAnswer: 1,
    explanation: 'When segregation isn\'t possible due to small staff, active owner/management review of transactions, bank reconciliations, vendor lists, and exception reports serves as a compensating control. This requires informed oversight.',
    reference: 'COSO Small Business Guidance; Compensating Controls',
  },

  // ==========================================
  // IT Application Controls
  // ==========================================
  {
    id: 'cma1-e-089',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'Input Controls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A "validity check" in an IT application:',
    options: [
      'Ensures data is entered by authorized users only',
      'Compares input values against an acceptable list or table',
      'Encrypts all transmitted data',
      'Backs up data to an offsite location'
    ],
    correctAnswer: 1,
    explanation: 'Validity checks compare entered values against predefined acceptable values (e.g., valid state codes, product numbers from master list). This is an input control that prevents invalid data from entering the system.',
    reference: 'IT Application Controls; Input Validation',
  },
  {
    id: 'cma1-e-090',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'Processing Controls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A batch total that compares the number of items submitted to the number processed is called a:',
    options: [
      'Financial total',
      'Hash total',
      'Record count',
      'Limit check'
    ],
    correctAnswer: 2,
    explanation: 'A record count verifies that all items submitted were processed by comparing counts at input and output. Hash totals sum a field (like account numbers) for verification. Financial totals sum dollar amounts.',
    reference: 'IT Processing Controls; Batch Controls',
  },
  {
    id: 'cma1-e-091',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'Output Controls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Output controls ensure:',
    options: [
      'Data is encrypted during entry',
      'Reports are distributed only to authorized recipients',
      'Programmers test new code',
      'Backups are stored properly'
    ],
    correctAnswer: 1,
    explanation: 'Output controls verify that reports and data outputs are complete, accurate, and distributed only to authorized recipients. This prevents sensitive information from reaching unauthorized parties.',
    reference: 'IT Application Controls; Output Distribution',
  },

  // ==========================================
  // Audit Committee Role
  // ==========================================
  {
    id: 'cma1-e-092',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Audit Committee',
    subtopic: 'Oversight Responsibilities',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The audit committee is responsible for:',
    options: [
      'Day-to-day management of the company',
      'Overseeing the external auditor and reviewing financial reporting',
      'Setting product pricing',
      'Managing employee benefits'
    ],
    correctAnswer: 1,
    explanation: 'The audit committee oversees external audit (selection, fees, independence), reviews financial statements and disclosures, monitors internal control effectiveness, and oversees ethics/compliance programs. Not involved in operations.',
    reference: 'SOX Section 301; Audit Committee Responsibilities',
  },
  {
    id: 'cma1-e-093',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Audit Committee',
    subtopic: 'Internal Audit Reporting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Best practice for internal audit reporting lines is:',
    options: [
      'Report only to the CFO',
      'Report administratively to management, functionally to the audit committee',
      'Report exclusively to external auditors',
      'Report to the sales department'
    ],
    correctAnswer: 1,
    explanation: 'Internal audit should report functionally to the audit committee (ensuring independence) while having an administrative reporting line to management (facilitating resources). This dual reporting ensures independence and operational effectiveness.',
    reference: 'IIA Standards; Internal Audit Independence',
  },
  {
    id: 'cma1-e-094',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Audit Committee',
    subtopic: 'Whistleblower Systems',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under SOX, the audit committee must:',
    options: [
      'Personally investigate all complaints',
      'Establish procedures for receiving anonymous complaints about accounting matters',
      'Report all complaints to the CEO immediately',
      'Outsource all compliance functions'
    ],
    correctAnswer: 1,
    explanation: 'SOX Section 301 requires audit committees to establish procedures for receiving and handling complaints, including anonymous submissions, regarding accounting, internal controls, or auditing matters.',
    reference: 'SOX Section 301; Whistleblower Procedures',
  },

  // ==========================================
  // Fraud Prevention
  // ==========================================
  {
    id: 'cma1-e-095',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Prevention',
    subtopic: 'Fraud Triangle',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The fraud triangle consists of:',
    options: [
      'Assets, liabilities, and equity',
      'Pressure, opportunity, and rationalization',
      'Planning, execution, and concealment',
      'Revenue, expenses, and profit'
    ],
    correctAnswer: 1,
    explanation: 'The fraud triangle identifies three conditions for fraud: Pressure (incentive/motivation), Opportunity (weak controls enabling fraud), and Rationalization (justifying the behavior). Understanding these helps design preventive controls.',
    reference: 'COSO Fraud Risk Management; Fraud Triangle',
  },
  {
    id: 'cma1-e-096',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Prevention',
    subtopic: 'Red Flags',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which employee behavior is a potential fraud red flag?',
    options: [
      'Taking regular vacation time',
      'Refusing to take vacation and working excessive overtime',
      'Participating in team meetings',
      'Completing all assigned training'
    ],
    correctAnswer: 1,
    explanation: 'Refusing vacation and excessive presence can indicate employees hiding fraudulent activities that would be discovered in their absence. Mandatory vacations are a control—others covering duties may discover irregularities.',
    reference: 'Fraud Red Flags; Anti-Fraud Programs',
  },
  {
    id: 'cma1-e-097',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Prevention',
    subtopic: 'Asset Misappropriation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The MOST common type of occupational fraud is:',
    options: [
      'Financial statement fraud',
      'Asset misappropriation',
      'Corruption',
      'Cyber fraud'
    ],
    correctAnswer: 1,
    explanation: 'Per ACFE studies, asset misappropriation (theft of company resources) is the most common fraud type (>80% of cases) though typically causing lower losses than financial statement fraud, which is less common but more costly.',
    reference: 'ACFE Report to the Nations; Fraud Statistics',
  },
  {
    id: 'cma1-e-098',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Prevention',
    subtopic: 'Detection Methods',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'According to fraud research, the most effective fraud detection method is:',
    options: [
      'External audit procedures',
      'Tips and complaints',
      'Internal audit reviews',
      'Surveillance cameras'
    ],
    correctAnswer: 1,
    explanation: 'ACFE research consistently shows tips (from employees, customers, vendors) detect more fraud than any other method—over 40% of cases. This underscores the importance of ethics hotlines and open communication cultures.',
    reference: 'ACFE Report to the Nations; Detection Methods',
  },

  // ==========================================
  // Control Environment
  // ==========================================
  {
    id: 'cma1-e-099',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Environment',
    subtopic: 'Tone at the Top',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: '"Tone at the top" refers to:',
    options: [
      'The quality of office furnishings in executive suites',
      'Senior management\'s commitment to integrity and ethical values',
      'The volume of executive communications',
      'Physical security at headquarters'
    ],
    correctAnswer: 1,
    explanation: 'Tone at the top describes how senior management\'s actions, statements, and priorities demonstrate commitment to integrity and ethical values. This sets the foundation for the entire control environment and organizational culture.',
    reference: 'COSO Control Environment Component',
  },
  {
    id: 'cma1-e-100',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Environment',
    subtopic: 'Human Resources',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which is a control environment factor related to human resources?',
    options: [
      'Bank reconciliation procedures',
      'Background checks and reference verification for new hires',
      'Inventory counting methods',
      'Revenue recognition policies'
    ],
    correctAnswer: 1,
    explanation: 'HR practices affecting control environment include hiring standards (background checks, references), training, performance evaluation, and disciplinary actions. These ensure employees are competent and committed to integrity.',
    reference: 'COSO Control Environment; HR Practices',
  },
];
