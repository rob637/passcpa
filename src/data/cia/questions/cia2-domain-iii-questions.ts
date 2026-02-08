/**
 * CIA Part 2: Domain III & ESG Questions
 * 
 * Additional questions for underrepresented topics in Part 2
 */

import { Question } from '../../../types';

export const CIA2_DOMAIN_III_QUESTIONS: Question[] = [
  // ============================================================================
  // REVENUE CYCLE
  // ============================================================================
  {
    id: 'CIA2-REV-001',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Which control best prevents lapping of accounts receivable?',
    options: [
      'Prenumbered sales invoices',
      'Lockbox arrangement with the bank',
      'Credit limit authorization',
      'Periodic mailing of customer statements'
    ],
    correctAnswer: 1,
    explanation: 'A lockbox arrangement has the bank receive and deposit customer payments directly, preventing employees from having access to both cash receipts and accounts receivable records. This effectively prevents lapping, where stolen receipts are covered up with subsequent customer payments.',
    topic: 'Revenue Cycle',
    subtopic: 'Controls'
  },
  {
    id: 'CIA2-REV-002',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Segregation of duties in the revenue cycle requires that the person who approves credit should NOT also:',
    options: [
      'Approve the annual audit plan',
      'Enter sales orders',
      'Conduct internal audits of receivables',
      'Review the aging report'
    ],
    correctAnswer: 1,
    explanation: 'The person who approves credit should not also enter sales orders. This separation prevents extending credit to unauthorized customers or related parties. Each function serves as a check on the other.',
    topic: 'Revenue Cycle',
    subtopic: 'Segregation of Duties'
  },
  {
    id: 'CIA2-REV-003',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Which is the MOST reliable evidence of revenue recognition?',
    options: [
      'Customer purchase order',
      'Sales invoice',
      'Signed shipping document with third-party carrier',
      'Credit memo'
    ],
    correctAnswer: 2,
    explanation: 'A signed shipping document from a third-party carrier provides the most reliable evidence that goods were shipped and delivered, supporting revenue recognition. Purchase orders and invoices are internal documents or represent customer intent, not delivery.',
    topic: 'Revenue Cycle',
    subtopic: 'Controls'
  },

  // ============================================================================
  // PROCUREMENT CYCLE
  // ============================================================================
  {
    id: 'CIA2-PROC-001',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'The three-way match in the procurement cycle compares:',
    options: [
      'Purchase order, receiving report, and bank statement',
      'Requisition, purchase order, and receiving report',
      'Purchase order, receiving report, and vendor invoice',
      'Vendor invoice, check, and bank statement'
    ],
    correctAnswer: 2,
    explanation: 'The three-way match compares the purchase order (what was ordered), receiving report (what was received), and vendor invoice (what is being billed). All three must agree before payment is authorized to prevent paying for goods not ordered or not received.',
    topic: 'Procurement Cycle',
    subtopic: 'Controls'
  },
  {
    id: 'CIA2-PROC-002',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Which red flag is MOST indicative of a shell company (fictitious vendor) fraud?',
    options: [
      'Vendor has a post office box address',
      'Vendor invoice amounts are always just below approval thresholds',
      'Vendor address matches an employee address',
      'Vendor provides no phone number on invoices'
    ],
    correctAnswer: 2,
    explanation: 'A vendor address matching an employee address is a strong indicator of a fictitious (shell) company fraud, where an employee creates a fake vendor to receive payments. While PO boxes and missing contact info can be red flags, address matching is more definitive.',
    topic: 'Procurement Cycle',
    subtopic: 'Fraud Indicators'
  },
  {
    id: 'CIA2-PROC-003',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Who should NOT have access to the vendor master file?',
    options: [
      'Accounts payable manager',
      'The employee who prepares checks',
      'IT security administrator',
      'Procurement manager'
    ],
    correctAnswer: 1,
    explanation: 'The employee who prepares checks should NOT have access to modify the vendor master file. This separation prevents creating fictitious vendors and issuing payments to them. Vendor file maintenance should be segregated from payment processing.',
    topic: 'Procurement Cycle',
    subtopic: 'Segregation of Duties'
  },

  // ============================================================================
  // PAYROLL CYCLE
  // ============================================================================
  {
    id: 'CIA2-PAY-001',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Which control is MOST effective for detecting ghost employees?',
    options: [
      'Requiring supervisor approval of timesheets',
      'Periodic comparison of payroll records to HR employee files',
      'Using direct deposit for all employees',
      'Reviewing overtime reports'
    ],
    correctAnswer: 1,
    explanation: 'Periodic comparison of payroll records to HR employee files can detect ghost employees - fictitious employees or former employees who remain on payroll. HR maintains the authoritative employee list; payroll should only process payments for valid employees.',
    topic: 'Payroll Cycle',
    subtopic: 'Controls'
  },
  {
    id: 'CIA2-PAY-002',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'The BEST test to detect former employees still on the payroll is:',
    options: [
      'Reviewing overtime authorization forms',
      'Comparing tax withholding rates to IRS tables',
      'Comparing payroll records to HR termination records',
      'Reviewing leave balances'
    ],
    correctAnswer: 2,
    explanation: 'Comparing payroll records to HR termination records identifies employees who have been terminated in HR but continue to receive payroll payments. This test directly addresses the risk of paying departed employees.',
    topic: 'Payroll Cycle',
    subtopic: 'Fraud Detection'
  },

  // ============================================================================
  // ESG / SUSTAINABILITY
  // ============================================================================
  {
    id: 'CIA2-ESG-001',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'ESG stands for:',
    options: [
      'External Standards for Governance',
      'Environmental, Social, and Governance',
      'Enterprise Standard Guidelines',
      'Extended Sustainability Goals'
    ],
    correctAnswer: 1,
    explanation: 'ESG stands for Environmental, Social, and Governance. These three factors represent non-financial considerations increasingly important to investors, regulators, and stakeholders. Internal audit provides assurance over ESG data quality and controls.',
    topic: 'ESG',
    subtopic: 'Fundamentals'
  },
  {
    id: 'CIA2-ESG-002',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Which ESG reporting framework focuses specifically on climate-related financial risk disclosures?',
    options: [
      'GRI (Global Reporting Initiative)',
      'SASB (Sustainability Accounting Standards Board)',
      'TCFD (Task Force on Climate-Related Financial Disclosures)',
      'CDP (Carbon Disclosure Project)'
    ],
    correctAnswer: 2,
    explanation: 'TCFD (Task Force on Climate-Related Financial Disclosures) specifically focuses on climate-related financial risk disclosures, covering governance, strategy, risk management, and metrics/targets. GRI is broader sustainability; SASB is industry-specific; CDP focuses on environmental disclosure.',
    topic: 'ESG',
    subtopic: 'Frameworks'
  },
  {
    id: 'CIA2-ESG-003',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Internal audit\'s primary role in ESG reporting is to:',
    options: [
      'Prepare the sustainability report',
      'Set the organization\'s ESG strategy',
      'Provide assurance over ESG data quality and controls',
      'Negotiate with regulators on ESG requirements'
    ],
    correctAnswer: 2,
    explanation: 'Internal audit provides assurance over ESG data quality, controls, and reporting processes. Preparing reports is management\'s responsibility; setting strategy is the board\'s role. Internal audit maintains independence by providing objective assurance, not operational functions.',
    topic: 'ESG',
    subtopic: 'Internal Audit Role'
  },
  {
    id: 'CIA2-ESG-004',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'Greenwashing is best described as:',
    options: [
      'Implementing environmental controls in manufacturing',
      'Misleading stakeholders about environmental performance',
      'Converting to renewable energy sources',
      'Training employees on sustainability'
    ],
    correctAnswer: 1,
    explanation: 'Greenwashing is the practice of misleading stakeholders about an organization\'s environmental performance or the environmental benefits of products/services. It is a significant risk that internal audit should address through assurance over ESG claims.',
    topic: 'ESG',
    subtopic: 'Risks'
  },

  // ============================================================================
  // THIRD-PARTY RISK
  // ============================================================================
  {
    id: 'CIA2-TPR-001',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'A SOC 1 Type II report primarily provides assurance about:',
    options: [
      'Cybersecurity controls of a service organization',
      'Controls relevant to user entities\' financial reporting over a period',
      'Privacy controls at a specific point in time',
      'Business continuity planning'
    ],
    correctAnswer: 1,
    explanation: 'A SOC 1 report addresses controls at a service organization relevant to user entities\' financial reporting. Type II reports cover both design and operating effectiveness over a period of time (vs. Type I which is point-in-time design only).',
    topic: 'Third-Party Risk',
    subtopic: 'SOC Reports'
  },
  {
    id: 'CIA2-TPR-002',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'When reviewing a SOC report, which finding is MOST concerning?',
    options: [
      'The report is for a fiscal year ending 6 months ago',
      'The service organization uses a subservice organization (carved-out)',
      'Several control exceptions were noted in the Type II report',
      'The report was issued by a CPA firm you have not heard of'
    ],
    correctAnswer: 2,
    explanation: 'Control exceptions in a Type II report indicate that controls did not operate effectively during the period, potentially affecting the accuracy of data processed. Period gaps, carved-out subservices, and auditor recognition are important but do not directly indicate control failures.',
    topic: 'Third-Party Risk',
    subtopic: 'SOC Reports'
  },
  {
    id: 'CIA2-TPR-003',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'The contract provision that enables internal audit to examine a vendor\'s operations is called:',
    options: [
      'Service level agreement',
      'Right to audit clause',
      'Termination clause',
      'Indemnification provision'
    ],
    correctAnswer: 1,
    explanation: 'A right to audit clause gives the organization (including internal audit) the contractual right to examine the vendor\'s records, controls, and operations. This provision is essential for ongoing monitoring of third-party risk.',
    topic: 'Third-Party Risk',
    subtopic: 'Contract Terms'
  },
];

export default CIA2_DOMAIN_III_QUESTIONS;
