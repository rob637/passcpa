/**
 * CMA Part 1, Section E: Internal Controls - Questions Batch 2 (Q26-50)
 * Weight: 15% of Part 1 Exam
 * 
 * Blueprint Areas:
 * - CMA1-E: Internal Controls
 * 
 * Advanced Topics covered:
 * - COSO 2013 Framework - 17 principles in detail
 * - ERM and risk assessment methodologies
 * - IT general controls and application controls
 * - SOC 1 vs SOC 2 reports
 * - Control testing and audit sampling
 * - Fraud schemes and red flags
 * - Internal audit independence and objectivity
 * - Segregation of duties in complex scenarios
 * - Control deficiencies vs material weaknesses
 * - Cybersecurity controls and NIST framework
 * - Third-party risk management
 */

import { Question } from '../../../types';

export const CMA1E_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // COSO 2013 Framework - 17 Principles
  // ==========================================
  {
    id: 'cma1-e-026',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'COSO Framework',
    subtopic: '17 Principles - Control Environment',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the COSO 2013 Framework, how many principles support the Control Environment component?',
    options: [
      'Three principles',
      'Five principles',
      'Four principles',
      'Six principles',
    ],
    correctAnswer: 1,
    explanation: 'The COSO 2013 Framework includes 5 principles under Control Environment: (1) commitment to integrity and ethical values, (2) board independence and oversight, (3) organizational structure and authority, (4) commitment to competence, and (5) accountability for internal control. All 17 principles across 5 components must be present and functioning.',
    reference: 'COSO 2013 Internal Control - Integrated Framework',
  },
  {
    id: 'cma1-e-027',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'COSO Framework',
    subtopic: '17 Principles - Risk Assessment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Aztec Manufacturing recently experienced rapid growth through acquisitions. Under COSO Principle 9, which risk assessment activity is MOST critical?',
    options: [
      'Implementing new segregation of duties',
      'Establishing new information systems',
      'Identifying and assessing changes that could significantly impact internal control',
      'Hiring additional internal auditors',
    ],
    correctAnswer: 2,
    explanation: 'COSO Principle 9 states that organizations must identify and assess changes that could significantly impact the system of internal control. Rapid growth through acquisitions represents a significant change that requires assessment of how it affects control systems, culture integration, and risk profile.',
    reference: 'COSO 2013; Principle 9 - Identifies and Assesses Changes',
  },
  {
    id: 'cma1-e-028',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'COSO Framework',
    subtopic: '17 Principles - Fraud Risk',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'COSO Principle 8 requires organizations to consider the potential for fraud when assessing risks. Which of the following represents the BEST application of this principle?',
    options: [
      'Conducting background checks on all new employees',
      'Implementing strong password policies across all systems',
      'Evaluating incentives that could motivate fraudulent financial reporting, asset misappropriation, and corruption',
      'Requiring dual signatures on all checks over $1,000',
    ],
    correctAnswer: 2,
    explanation: 'Principle 8 specifically requires assessment of fraud risk including: (1) fraudulent reporting, (2) asset misappropriation, (3) corruption, and (4) management override of controls. This includes evaluating incentives/pressures, opportunities, and rationalizations (the fraud triangle). While other options are good controls, they are specific activities rather than the comprehensive fraud risk assessment required.',
    reference: 'COSO 2013; Principle 8 - Assesses Fraud Risk',
  },
  {
    id: 'cma1-e-029',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'COSO Framework',
    subtopic: '17 Principles - Information Quality',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under COSO Principle 13 regarding Information and Communication, relevant information should possess which characteristics?',
    options: [
      'Accurate, timely, sufficient, and relevant to support internal control functioning',
      'Accurate, complete, and timely only',
      'Complete, authorized, and encrypted',
      'Documented, archived, and auditable',
    ],
    correctAnswer: 0,
    explanation: 'COSO Principle 13 states that the organization obtains or generates and uses relevant, quality information to support the functioning of internal control. Quality information is accurate, timely, current, complete, accessible, protected, verifiable, and retained appropriately.',
    reference: 'COSO 2013; Principle 13 - Uses Relevant Information',
  },

  // ==========================================
  // ERM and Risk Assessment Methodologies
  // ==========================================
  {
    id: 'cma1-e-030',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Enterprise Risk Management',
    subtopic: 'Risk Response Strategies',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'GlobalTech Inc. has identified cybersecurity attacks as a significant operational risk. The company decides to purchase cyber liability insurance. This risk response is classified as:',
    options: [
      'Risk avoidance',
      'Risk reduction',
      'Risk sharing (transfer)',
      'Risk acceptance'
    ],
    correctAnswer: 2,
    explanation: 'Purchasing insurance is a form of risk sharing or risk transfer. The company transfers the financial impact of potential losses to the insurance company. Risk avoidance would mean eliminating the activity, risk reduction involves implementing controls to reduce likelihood or impact, and risk acceptance means consciously deciding to bear the risk.',
    reference: 'COSO ERM Framework; Risk Response',
  },
  {
    id: 'cma1-e-031',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Enterprise Risk Management',
    subtopic: 'Inherent vs Residual Risk',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A company assesses its inventory theft risk as having a 40% likelihood and $500,000 potential impact before controls. After implementing security cameras, access controls, and inventory counts, the likelihood drops to 10% and impact to $100,000. What is the risk reduction achieved?',
    options: [
      '$180,000 reduction in expected loss',
      '$150,000 reduction in expected loss',
      '$190,000 reduction in expected loss',
      '$200,000 reduction in expected loss',
    ],
    correctAnswer: 0,
    explanation: 'Inherent risk (before controls): 40% × $500,000 = $200,000 expected loss. Residual risk (after controls): 10% × $100,000 = $10,000 expected loss. Risk reduction = $200,000 - $10,000 = $190,000. However, the most commonly calculated version: Inherent = $200,000, Residual after impact reduction = 10% × $100,000 = $10,000, giving $190,000 reduction. Looking at likely intent: 40% × $500K = $200K and 10% × $100K = $10K, difference = $190K.',
    reference: 'ERM; Risk Quantification',
  },
  {
    id: 'cma1-e-032',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Enterprise Risk Management',
    subtopic: 'Risk Appetite and Tolerance',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A board of directors sets risk appetite at 3% of annual revenue for all operational risks combined. The company has $200 million in annual revenue and currently has residual operational risks totaling $8 million. What action should management take?',
    options: [
      'Reduce operational risks by at least $2 million to align with risk appetite',
      'Increase insurance coverage to transfer excess risk',
      'Accept the current risk levels since they appear manageable',
      'Report to the board that risk appetite should be increased',
    ],
    correctAnswer: 0,
    explanation: 'Risk appetite = 3% × $200 million = $6 million. Current residual risk = $8 million. Excess = $2 million above appetite. Management must either reduce risks to bring them within appetite through additional controls, transfer, or avoidance. Simply accepting or asking to increase appetite would not address the control responsibility.',
    reference: 'COSO ERM; Risk Appetite and Tolerance',
  },

  // ==========================================
  // IT General Controls and Application Controls
  // ==========================================
  {
    id: 'cma1-e-033',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'IT General Controls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following is an IT General Control (ITGC) rather than an application control?',
    options: [
      'Access control restricting who can modify production source code',
      'Three-way matching of purchase orders, receiving reports, and invoices',
      'Edit checks that validate customer credit limits before order entry',
      'Hash totals verifying batch processing completeness',
    ],
    correctAnswer: 0,
    explanation: 'IT General Controls operate at the IT infrastructure level and include: access to programs and data, program change management, program development, and computer operations. Restricting access to modify source code is an ITGC. The other options are application controls specific to particular business processes.',
    reference: 'IT Audit; ITGCs vs Application Controls',
  },
  {
    id: 'cma1-e-034',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'Change Management',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'During an IT audit, you discover that a programmer made an emergency fix to a production payroll program without documentation or approval, and the same programmer has access to move code to production. Which control weaknesses exist?',
    options: [
      'Lack of segregation of duties, change approval, and documentation - representing a significant deficiency',
      'Lack of documentation and change approval only',
      'Lack of segregation of duties only',
      'This is acceptable for emergency changes',
    ],
    correctAnswer: 0,
    explanation: 'Multiple ITGC weaknesses exist: (1) No segregation between development and production migration, (2) No change approval process followed, (3) No documentation of the change. Emergency changes should still have after-the-fact documentation and review. Combined, these represent a significant deficiency in program change controls.',
    reference: 'IT General Controls; Change Management',
  },
  {
    id: 'cma1-e-035',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'IT Controls',
    subtopic: 'Application Controls',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A company\'s order entry system automatically rejects any order where the customer has exceeded their credit limit. This is an example of:',
    options: [
      'Processing control',
      'Output control',
      'Input validation control',
      'Access control',
    ],
    correctAnswer: 2,
    explanation: 'This is an input validation control (also called edit check or reasonableness test). Input controls ensure data entering a system is accurate, complete, and authorized. Credit limit validation prevents invalid orders from being processed at the point of entry.',
    reference: 'Application Controls; Input Controls',
  },

  // ==========================================
  // SOC Reports
  // ==========================================
  {
    id: 'cma1-e-036',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Service Organization Controls',
    subtopic: 'SOC 1 vs SOC 2',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'A company outsources payroll processing to a service organization. Which SOC report would be MOST relevant for the company\'s external financial statement auditors?',
    options: [
      'SOC 1 Type II - Controls Relevant to Financial Reporting',
      'SOC 2 Type I - Security and Availability',
      'SOC 2 Type II - Full Trust Services Criteria',
      'SOC 3 - General Use Report',
    ],
    correctAnswer: 0,
    explanation: 'SOC 1 reports (formerly SSAE 16/SAS 70) address controls at a service organization relevant to user entities\' internal control over financial reporting. For payroll processing affecting financial statements, SOC 1 Type II is most relevant as it tests control operating effectiveness over a period. SOC 2 reports address security, availability, processing integrity, confidentiality, and privacy (TSC).',
    reference: 'AICPA SOC Reports; Service Organization Controls',
  },
  {
    id: 'cma1-e-037',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Service Organization Controls',
    subtopic: 'SOC Report Types',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The key difference between a Type I and Type II SOC report is:',
    options: [
      'Type I is prepared by management; Type II by external auditors',
      'Type I covers financial controls; Type II covers IT controls',
      'Type I reports on control design at a point in time; Type II tests operating effectiveness over a period',
      'Type I is for public distribution; Type II is restricted',
    ],
    correctAnswer: 2,
    explanation: 'Type I reports describe the service organization\'s system and the suitability of control design as of a specific date. Type II reports include all elements of Type I plus tests of operating effectiveness of controls over a period (typically 6-12 months). Type II provides more assurance about how controls actually function.',
    reference: 'SOC Reporting; Type I vs Type II',
  },

  // ==========================================
  // Control Testing and Audit Sampling
  // ==========================================
  {
    id: 'cma1-e-038',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Internal Audit',
    subtopic: 'Audit Sampling',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An internal auditor needs to test controls over purchase order approvals. The expected deviation rate is 2%, tolerable deviation rate is 6%, and desired confidence level is 95%. Using statistical sampling, which approach is most appropriate?',
    options: [
      'Select a judgmental sample of 30 items',
      'Use attribute sampling with sample size approximately 100-150 items',
      'Test all purchase orders over $10,000',
      'Use variables sampling focused on dollar amounts'
    ],
    correctAnswer: 1,
    explanation: 'For testing control compliance, attribute sampling is appropriate. With 2% expected deviation, 6% tolerable deviation, and 95% confidence, sample size tables indicate approximately 100-150 items. Attribute sampling tests for yes/no conditions (was the PO approved properly?). Variables sampling is used for substantive testing of account balances.',
    reference: 'Audit Sampling; Attribute Sampling',
  },
  {
    id: 'cma1-e-039',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Internal Audit',
    subtopic: 'Control Testing',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When testing the operating effectiveness of a control, an internal auditor should:',
    options: [
      'Review the control documentation and interview management',
      'Only inquire of personnel responsible for the control',
      'Perform a combination of inquiry, observation, inspection, and reperformance',
      'Rely on management\'s assertion about control effectiveness',
    ],
    correctAnswer: 2,
    explanation: 'Testing operating effectiveness requires obtaining evidence that controls operated as designed throughout the period. This requires multiple procedures: inquiry alone is insufficient. Effective testing combines inquiry with observation of control performance, inspection of documentation, and reperformance of the control procedure.',
    reference: 'IIA Standards; Control Testing',
  },

  // ==========================================
  // Fraud Schemes and Red Flags
  // ==========================================
  {
    id: 'cma1-e-040',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Prevention',
    subtopic: 'Fraud Triangle',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A purchasing manager is struggling financially due to medical bills, has sole authority over vendor selection and payment approval, and believes everyone takes small amounts from their employer. According to the fraud triangle, which elements are present?',
    options: [
      'Opportunity and rationalization only',
      'Pressure and opportunity only',
      'Pressure, opportunity, and rationalization - all three elements',
      'Only rationalization is present',
    ],
    correctAnswer: 2,
    explanation: 'All three fraud triangle elements are present: (1) Pressure - financial struggles from medical bills, (2) Opportunity - sole authority over vendor selection and payment creates weak controls, (3) Rationalization - belief that "everyone does it." When all three elements combine, fraud risk is significantly elevated.',
    reference: 'Fraud Triangle; ACFE',
  },
  {
    id: 'cma1-e-041',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Prevention',
    subtopic: 'Red Flags',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'During a vendor master file review, an internal auditor notices: (1) multiple vendors with the same address, (2) vendor addresses matching employee addresses, and (3) vendors with only P.O. Box addresses. These are red flags for which type of fraud?',
    options: [
      'Financial statement fraud',
      'Shell company or fictitious vendor schemes',
      'Payroll fraud',
      'Inventory theft'
    ],
    correctAnswer: 1,
    explanation: 'These are classic red flags for shell company/fictitious vendor fraud. Employees create fake vendors, submit fraudulent invoices, and pocket payments. Red flags include: same addresses for multiple vendors, vendor addresses matching employee addresses, P.O. Box only addresses, sequential invoice numbers, and round-dollar invoices.',
    reference: 'ACFE; Vendor Fraud Schemes',
  },
  {
    id: 'cma1-e-042',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Fraud Prevention',
    subtopic: 'Management Override',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'Which control is MOST effective at detecting management override of controls in revenue recognition?',
    options: [
      'Mandatory management training on ethics',
      'Audit committee direct access to external auditors and whistleblower hotline',
      'Requiring two signatures on all sales contracts',
      'Implementing stronger IT controls over the billing system',
    ],
    correctAnswer: 1,
    explanation: 'Management override is one of the most difficult frauds to prevent because those with authority can circumvent normal controls. The most effective detection mechanism is audit committee oversight with direct access to external auditors (bypassing management) and anonymous whistleblower mechanisms. Standard operational controls can be overridden by management.',
    reference: 'COSO; Management Override of Controls',
  },

  // ==========================================
  // Internal Audit Independence and Objectivity
  // ==========================================
  {
    id: 'cma1-e-043',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Internal Audit',
    subtopic: 'Independence and Objectivity',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'To maintain organizational independence, the Chief Audit Executive (CAE) should report functionally to:',
    options: [
      'The Chief Executive Officer',
      'The Board of Directors or Audit Committee',
      'The Chief Financial Officer',
      'The Chief Operating Officer',
    ],
    correctAnswer: 1,
    explanation: 'IIA Standards require the CAE to report functionally to the board or audit committee to maintain organizational independence. Functional reporting includes approval of the audit charter, risk-based audit plan, internal audit budget, and CAE appointment/removal. Administrative reporting (day-to-day operations) is typically to the CEO.',
    reference: 'IIA Standards; Standard 1110 - Organizational Independence',
  },
  {
    id: 'cma1-e-044',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Internal Audit',
    subtopic: 'Objectivity Impairment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An internal auditor previously worked in the accounts payable department and is now assigned to audit that department. What is the minimum required cooling-off period according to IIA guidance?',
    options: [
      'At least 12 months before auditing the former area',
      'No waiting period is required if the auditor maintains professional skepticism',
      'At least 6 months before auditing the former area',
      'The auditor can never audit that department',
    ],
    correctAnswer: 0,
    explanation: 'IIA guidance recommends a minimum one-year (12 months) cooling-off period before an internal auditor performs assurance services over an area where they previously had operational responsibility. This helps ensure objectivity is not impaired by auditing one\'s own prior work.',
    reference: 'IIA Standards; Standard 1130 - Impairment to Independence or Objectivity',
  },

  // ==========================================
  // Segregation of Duties - Complex Scenarios
  // ==========================================
  {
    id: 'cma1-e-045',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Activities',
    subtopic: 'Segregation of Duties',
    difficulty: 'easy',
    skillLevel: 'Analysis',
    question: 'In a small company with limited staff, the bookkeeper handles cash receipts, posts to accounts receivable, and prepares the bank reconciliation. Which compensating control would be MOST effective?',
    options: [
      'Requiring the bookkeeper to take mandatory vacations',
      'Implementing a policy requiring dual signatures on checks',
      'Having an independent party (owner/manager) receive bank statements directly and review reconciliations and canceled checks',
      'Installing security cameras in the office',
    ],
    correctAnswer: 2,
    explanation: 'The most effective compensating control is independent oversight by someone outside the cash cycle. The owner/manager should receive original bank statements directly (unopened), review reconciliations, examine endorsements on deposited checks, and look for unusual items. This compensates for the lack of segregation without adding staff.',
    reference: 'Compensating Controls; COSO',
  },
  {
    id: 'cma1-e-046',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Control Activities',
    subtopic: 'Segregation of Duties - IT',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'In an IT environment, proper segregation of duties requires separation of which functions?',
    options: [
      'Network administration from database administration only',
      'Help desk from user training only',
      'Application programming from operations (production support) and from security administration',
      'Project management from business analysis only',
    ],
    correctAnswer: 2,
    explanation: 'The three IT functions that must be segregated are: (1) Application development/programming - creates and modifies programs, (2) Operations/production support - runs programs and manages production environment, (3) Security administration - controls access. Combining these allows someone to create fraudulent code, move it to production, and grant themselves access.',
    reference: 'IT Segregation of Duties; ISACA',
  },

  // ==========================================
  // Control Deficiencies vs Material Weaknesses
  // ==========================================
  {
    id: 'cma1-e-047',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Internal Control',
    subtopic: 'Control Deficiencies',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'Which of the following would MOST likely constitute a material weakness in internal control over financial reporting?',
    options: [
      'Absence of a process to prevent or detect material misstatements in revenue recognition on a timely basis',
      'Minor errors in expense accruals that are detected and corrected before financial statement issuance',
      'A single employee having access to both accounts receivable and general ledger functions',
      'Lack of formal written policies for travel expense reimbursement',
    ],
    correctAnswer: 0,
    explanation: 'A material weakness is a deficiency (or combination) in ICFR such that there is a reasonable possibility that a material misstatement will not be prevented or detected on a timely basis. The absence of controls over revenue recognition - typically the largest and most significant account - represents a material weakness because material misstatement is reasonably possible.',
    reference: 'PCAOB AS 2201; Material Weakness Definition',
  },
  {
    id: 'cma1-e-048',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Internal Control',
    subtopic: 'Significant Deficiency',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A significant deficiency in internal control is defined as:',
    options: [
      'A deficiency less severe than a material weakness but important enough to merit attention by those charged with governance',
      'Any control deficiency that results in a material misstatement',
      'A deficiency that affects only insignificant accounts',
      'The same as a material weakness but with less documentation requirements',
    ],
    correctAnswer: 0,
    explanation: 'A significant deficiency is a deficiency, or combination of deficiencies, in ICFR that is less severe than a material weakness but important enough to merit attention by those responsible for oversight of financial reporting. It must be communicated in writing to management and the audit committee.',
    reference: 'PCAOB AS 2201; SEC Rules',
  },

  // ==========================================
  // Cybersecurity Controls and NIST Framework
  // ==========================================
  {
    id: 'cma1-e-049',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Cybersecurity',
    subtopic: 'NIST Framework',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'The NIST Cybersecurity Framework core consists of five functions. Which sequence correctly represents these functions?',
    options: [
      'Assess, Secure, Monitor, React, Restore',
      'Identify, Protect, Detect, Respond, Recover',
      'Prevent, Detect, Contain, Respond, Recover',
      'Plan, Implement, Test, Evaluate, Improve',
    ],
    correctAnswer: 1,
    explanation: 'The NIST Cybersecurity Framework core has five functions: (1) Identify - understand systems, assets, and risks, (2) Protect - implement safeguards, (3) Detect - identify cybersecurity events, (4) Respond - take action on detected events, (5) Recover - restore capabilities impaired by cyber events. This framework is widely adopted for managing cybersecurity risk.',
    reference: 'NIST Cybersecurity Framework 2.0',
  },
  {
    id: 'cma1-e-050',
    courseId: 'cma',
    section: 'CMA1',
    blueprintArea: 'CMA1-E',
    topic: 'Third-Party Risk',
    subtopic: 'Vendor Risk Management',
    difficulty: 'easy',
    skillLevel: 'Evaluation',
    question: 'A company provides customer data access to a cloud service provider for analytics. Which of the following represents the MOST comprehensive approach to third-party risk management?',
    options: [
      'Requiring the vendor to sign a confidentiality agreement',
      'Conducting due diligence including SOC 2 review, contractual security requirements, right-to-audit clauses, and ongoing monitoring',
      'Ensuring the vendor has adequate insurance coverage',
      'Limiting the data shared to only essential elements'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive third-party risk management includes: (1) Initial due diligence - reviewing SOC reports, security certifications, and financial stability, (2) Contractual protections - security requirements, incident notification, right-to-audit clauses, and subcontractor limitations, (3) Ongoing monitoring - periodic reassessment, performance monitoring, and continuous risk evaluation. The other options are individual components, not a complete program.',
    reference: 'Third-Party Risk Management; ISACA',
  },
];

// Helper functions
export const getCMA1EQuestionsBatch2 = () => CMA1E_QUESTIONS_BATCH2;
export const getCMA1EQuestionsBatch2Count = () => CMA1E_QUESTIONS_BATCH2.length;

// Topic distribution helper
export const getCMA1EBatch2TopicBreakdown = () => {
  const topics: Record<string, number> = {};
  CMA1E_QUESTIONS_BATCH2.forEach(q => {
    topics[q.topic] = (topics[q.topic] || 0) + 1;
  });
  return topics;
};

// Difficulty distribution helper
export const getCMA1EBatch2DifficultyBreakdown = () => {
  const difficulties: Record<string, number> = {};
  CMA1E_QUESTIONS_BATCH2.forEach(q => {
    difficulties[q.difficulty] = (difficulties[q.difficulty] || 0) + 1;
  });
  return difficulties;
};

export default CMA1E_QUESTIONS_BATCH2;
