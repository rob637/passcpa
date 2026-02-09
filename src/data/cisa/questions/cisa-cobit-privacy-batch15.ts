/**
 * CISA Domain 2 & 5: COBIT 2019 Deep Dive & Privacy Regulations
 * Batch 15 - Enhanced exam-style questions
 * 
 * Focus areas:
 * - COBIT 2019 40 governance/management objectives
 * - EDM, APO, BAI, DSS, MEA domains
 * - GDPR, CCPA, cross-border data transfers
 * - Privacy impact assessments
 * - International data protection frameworks
 */

import { Question } from '../../../types';

/**
 * COBIT 2019 Deep Dive Questions - Domain 2
 */
export const COBIT_2019_QUESTIONS: Question[] = [
  {
    id: 'CISA2-COBIT-001',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'In COBIT 2019, which domain includes the governance objective "Ensured Governance Framework Setting and Maintenance" (EDM01)?',
    options: [
      'Align, Plan and Organize (APO)',
      'Build, Acquire and Implement (BAI)',
      'Evaluate, Direct and Monitor (EDM)',
      'Deliver, Service and Support (DSS)'
    ],
    correctAnswer: 2,
    explanation: 'The Evaluate, Direct and Monitor (EDM) domain contains governance objectives. EDM01 focuses on establishing and maintaining the governance framework. COBIT 2019 separates governance (EDM) from management (APO, BAI, DSS, MEA).',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT 2019 Domains'
  },
  {
    id: 'CISA2-COBIT-002',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'COBIT 2019\'s principle of "Separating Governance from Management" means:',
    options: [
      'IT and business should operate independently',
      'Governance evaluates, directs, and monitors while management plans, builds, runs, and monitors',
      'Senior management should not be involved in IT decisions',
      'The audit function should be separate from operations'
    ],
    correctAnswer: 1,
    explanation: 'COBIT 2019 distinguishes governance (the board\'s responsibility to evaluate, direct, and monitor) from management (which plans, builds, runs, and monitors activities to achieve objectives).',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT 2019 Principles'
  },
  {
    id: 'CISA2-COBIT-003',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'The COBIT 2019 management objective APO12 (Managed Risk) is part of which domain?',
    options: [
      'Build, Acquire and Implement',
      'Monitor, Evaluate and Assess',
      'Align, Plan and Organize',
      'Deliver, Service and Support'
    ],
    correctAnswer: 2,
    explanation: 'APO12 (Managed Risk) belongs to the Align, Plan and Organize (APO) domain. The APO domain covers IT strategy, architecture, innovation, portfolio, and risk management.',
    topic: 'IT Risk Management',
    subtopic: 'COBIT 2019 APO Domain'
  },
  {
    id: 'CISA2-COBIT-004',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'A COBIT 2019 design factor that considers whether an organization\'s risk profile is low, normal, or high is called:',
    options: [
      'Enterprise Strategy',
      'IT Implementation Methods',
      'Risk Profile',
      'Compliance Requirements'
    ],
    correctAnswer: 2,
    explanation: 'COBIT 2019 uses 11 design factors to tailor the governance system. The Risk Profile factor considers the organization\'s overall risk appetite and current risk exposure (low, normal, high).',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT 2019 Design Factors'
  },
  {
    id: 'CISA2-COBIT-005',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'The COBIT 2019 governance objective EDM03 focuses on:',
    options: [
      'Ensured Governance Framework Setting and Maintenance',
      'Ensured Benefits Delivery',
      'Ensured Risk Optimization',
      'Ensured Resource Optimization'
    ],
    correctAnswer: 2,
    explanation: 'EDM03 is "Ensured Risk Optimization" - ensuring that IT-related enterprise risk does not exceed risk appetite. EDM01 is governance framework, EDM02 is benefits delivery, and EDM04 is resource optimization.',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT 2019 EDM Objectives'
  },
  {
    id: 'CISA2-COBIT-006',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'Which COBIT 2019 domain contains objectives related to change management and release management?',
    options: [
      'Align, Plan and Organize (APO)',
      'Build, Acquire and Implement (BAI)',
      'Deliver, Service and Support (DSS)',
      'Monitor, Evaluate and Assess (MEA)'
    ],
    correctAnswer: 1,
    explanation: 'The Build, Acquire and Implement (BAI) domain includes BAI06 (Managed IT Changes) and BAI07 (Managed IT Change Acceptance and Transitioning) for change and release management.',
    topic: 'IT Operations',
    subtopic: 'COBIT 2019 BAI Domain'
  },
  {
    id: 'CISA2-COBIT-007',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'In COBIT 2019, the management objective DSS05 addresses:',
    options: [
      'Managed Operations',
      'Managed Service Requests and Incidents',
      'Managed Security Services',
      'Managed Business Process Controls'
    ],
    correctAnswer: 2,
    explanation: 'DSS05 is "Managed Security Services" - protecting enterprise information to maintain the level of risk acceptable to the enterprise. It covers physical security, network security, endpoint security, identity management, and more.',
    topic: 'Information Security',
    subtopic: 'COBIT 2019 DSS Domain'
  },
  {
    id: 'CISA2-COBIT-008',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'The MEA domain in COBIT 2019 includes objectives for:',
    options: [
      'Managing enterprise architecture and innovation',
      'Monitoring performance, compliance, and the governance system',
      'Building and implementing IT solutions',
      'Delivering IT services and support'
    ],
    correctAnswer: 1,
    explanation: 'The Monitor, Evaluate and Assess (MEA) domain includes MEA01 (Managed Performance and Conformance Monitoring), MEA02 (Managed System of Internal Control), MEA03 (Managed Compliance), and MEA04 (Managed Assurance).',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT 2019 MEA Domain'
  },
  {
    id: 'CISA2-COBIT-009',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'COBIT 2019\'s "Governance and Management Objectives" replaces which concept from COBIT 5?',
    options: [
      'Control Objectives',
      'Process Reference Model',
      'Enterprise Enablers',
      'Maturity Models'
    ],
    correctAnswer: 1,
    explanation: 'COBIT 2019 replaced the COBIT 5 "Process Reference Model" with "Governance and Management Objectives." The 40 objectives provide more flexibility and are not strictly tied to processes.',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT Evolution'
  },
  {
    id: 'CISA2-COBIT-010',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'medium',
    question: 'An organization wants to use COBIT 2019 to improve its IT governance. Which design factor should it consider FIRST?',
    options: [
      'Threat Landscape',
      'Enterprise Strategy',
      'IT Implementation Methods',
      'Technology Adoption Strategy'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise Strategy is typically considered first as it drives how IT should support the business. The four enterprise strategies in COBIT 2019 are: Growth/Acquisition, Innovation/Differentiation, Cost Leadership, and Client Service/Stability.',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT 2019 Implementation'
  },
  {
    id: 'CISA2-COBIT-011',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'The COBIT 2019 Performance Management System uses a capability level scale from:',
    options: [
      '1 to 5',
      '0 to 5',
      '0 to 4',
      'Initial to Optimizing'
    ],
    correctAnswer: 1,
    explanation: 'COBIT 2019 uses a 0-5 capability scale: 0 (Incomplete), 1 (Performed), 2 (Managed), 3 (Established), 4 (Predictable), 5 (Optimizing). This aligns with ISO/IEC 33000.',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT 2019 Maturity'
  },
  {
    id: 'CISA2-COBIT-012',
    courseId: 'cisa',
    section: 'CISA2',
    difficulty: 'hard',
    question: 'COBIT 2019 introduces seven governance system components. Which is NOT one of these components?',
    options: [
      'Processes',
      'Organizational Structures',
      'Skills and Competencies (People)',
      'Risk Registers'
    ],
    correctAnswer: 3,
    explanation: 'The seven COBIT 2019 components are: 1) Processes, 2) Organizational Structures, 3) Principles/Policies/Frameworks, 4) Information, 5) Culture/Ethics/Behavior, 6) People/Skills/Competencies, 7) Services/Infrastructure/Applications. Risk registers are outputs, not components.',
    topic: 'IT Governance Frameworks',
    subtopic: 'COBIT 2019 Components'
  },
];

/**
 * Privacy Regulation Deep Dive Questions - Domain 5
 */
export const PRIVACY_REGULATION_QUESTIONS: Question[] = [
  {
    id: 'CISA5-PRIV-001',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Under GDPR, the legal basis for processing that requires explicit consent is:',
    options: [
      'Processing necessary for contract performance',
      'Processing of special categories of personal data (sensitive data)',
      'Processing necessary for legitimate interests',
      'Processing necessary for legal compliance'
    ],
    correctAnswer: 1,
    explanation: 'GDPR Article 9 requires explicit consent for processing special categories of data (sensitive data) such as racial/ethnic origin, political opinions, religious beliefs, health data, biometric data, etc. Other lawful bases may apply for regular personal data.',
    topic: 'Privacy and Data Protection',
    subtopic: 'GDPR Legal Basis'
  },
  {
    id: 'CISA5-PRIV-002',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'The GDPR "right to be forgotten" (right to erasure) does NOT apply when:',
    options: [
      'The individual withdraws consent',
      'The data is being used for legal claims defense',
      'The individual objects to direct marketing',
      'The data was unlawfully processed'
    ],
    correctAnswer: 1,
    explanation: 'GDPR Article 17 provides exceptions to the right to erasure, including when processing is necessary for legal claims (defense, establishment, or exercise of claims). Organizations can retain data needed for litigation.',
    topic: 'Privacy and Data Protection',
    subtopic: 'GDPR Data Subject Rights'
  },
  {
    id: 'CISA5-PRIV-003',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Under the California Consumer Privacy Act (CCPA), consumers have the right to:',
    options: [
      'Delete their data without any exceptions',
      'Know what personal information a business has collected and opt out of its sale',
      'Require businesses to use encryption for all data',
      'Access data held by any organization worldwide'
    ],
    correctAnswer: 1,
    explanation: 'CCPA grants California residents the right to know what personal information is collected, the right to delete, the right to opt-out of sale, and the right to non-discrimination for exercising these rights.',
    topic: 'Privacy and Data Protection',
    subtopic: 'CCPA Rights'
  },
  {
    id: 'CISA5-PRIV-004',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'For cross-border data transfers from the EU, which mechanism provides the MOST flexibility for transferring personal data to countries without adequacy decisions?',
    options: [
      'EU-US Privacy Shield',
      'Standard Contractual Clauses (SCCs)',
      'Consent from every data subject',
      'Anonymizing all data before transfer'
    ],
    correctAnswer: 1,
    explanation: 'Standard Contractual Clauses (SCCs) are pre-approved contractual terms that provide adequate safeguards for international transfers. Privacy Shield was invalidated (Schrems II). While consent and anonymization work, SCCs provide the most practical flexibility for ongoing business transfers.',
    topic: 'Privacy and Data Protection',
    subtopic: 'Cross-Border Data Transfers'
  },
  {
    id: 'CISA5-PRIV-005',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'A Data Protection Impact Assessment (DPIA) is MANDATORY under GDPR when:',
    options: [
      'Any personal data processing occurs',
      'Processing is likely to result in high risk to individuals',
      'A new vendor is onboarded',
      'Data is transferred outside the EU'
    ],
    correctAnswer: 1,
    explanation: 'GDPR Article 35 requires a DPIA when processing "is likely to result in a high risk to the rights and freedoms of natural persons." Examples include systematic monitoring, large-scale sensitive data processing, and automated decision-making with legal effects.',
    topic: 'Privacy and Data Protection',
    subtopic: 'Privacy Impact Assessment'
  },
  {
    id: 'CISA5-PRIV-006',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Under GDPR, a data processor:',
    options: [
      'Determines the purposes and means of processing',
      'Processes data only on documented instructions from the controller',
      'Is always located within the EU',
      'Cannot engage sub-processors'
    ],
    correctAnswer: 1,
    explanation: 'GDPR Article 28 requires processors to process personal data only on documented instructions from the controller. The controller determines purposes and means. Processors can engage sub-processors with prior authorization.',
    topic: 'Privacy and Data Protection',
    subtopic: 'GDPR Controller vs Processor'
  },
  {
    id: 'CISA5-PRIV-007',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'The EU-U.S. Data Privacy Framework (DPF) that replaced Privacy Shield requires U.S. organizations to:',
    options: [
      'Obtain EU supervisory authority approval for each transfer',
      'Self-certify compliance with DPF principles annually',
      'Process only anonymized data from EU residents',
      'Establish a physical presence in the EU'
    ],
    correctAnswer: 1,
    explanation: 'The EU-U.S. Data Privacy Framework (effective July 2023) requires U.S. organizations to self-certify their compliance with the framework principles annually through the Department of Commerce. It addresses Schrems II concerns regarding U.S. government access.',
    topic: 'Privacy and Data Protection',
    subtopic: 'International Data Transfers'
  },
  {
    id: 'CISA5-PRIV-008',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'Which principle requires organizations to only collect personal data necessary for the specified purpose?',
    options: [
      'Purpose limitation',
      'Data minimization',
      'Accuracy',
      'Storage limitation'
    ],
    correctAnswer: 1,
    explanation: 'Data minimization (GDPR Article 5(1)(c)) requires that personal data be "adequate, relevant and limited to what is necessary." Purpose limitation relates to using data only for stated purposes. Storage limitation addresses retention periods.',
    topic: 'Privacy and Data Protection',
    subtopic: 'GDPR Principles'
  },
  {
    id: 'CISA5-PRIV-009',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Binding Corporate Rules (BCRs) for international data transfers:',
    options: [
      'Are only valid for transfers to countries with adequacy decisions',
      'Must be approved by a supervisory authority and provide enforceable rights to data subjects',
      'Can only be used by small organizations',
      'Replace the need for any data processing agreements'
    ],
    correctAnswer: 1,
    explanation: 'BCRs are internal rules adopted by multinational groups for intra-group transfers. They must be approved by a lead supervisory authority, provide enforceable rights to data subjects, and demonstrate adequate safeguards. They\'re typically used by large multinationals.',
    topic: 'Privacy and Data Protection',
    subtopic: 'Cross-Border Data Transfers'
  },
  {
    id: 'CISA5-PRIV-010',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'The GDPR data breach notification requirement to supervisory authorities:',
    options: [
      'Applies to all data breaches without exception',
      'Has a 72-hour deadline from when the controller becomes aware of the breach',
      'Must include a complete forensic analysis',
      'Only applies to breaches involving financial data'
    ],
    correctAnswer: 1,
    explanation: 'GDPR Article 33 requires controllers to notify the supervisory authority within 72 hours of becoming aware of a personal data breach, "unless the breach is unlikely to result in a risk to the rights and freedoms of natural persons."',
    topic: 'Privacy and Data Protection',
    subtopic: 'GDPR Breach Notification'
  },
  {
    id: 'CISA5-PRIV-011',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Under the Virginia Consumer Data Protection Act (VCDPA), compared to CCPA, a key difference is:',
    options: [
      'VCDPA applies to non-profits while CCPA does not',
      'VCDPA includes a right to correct inaccurate data while original CCPA did not',
      'VCDPA has no enforcement mechanism',
      'VCDPA allows private right of action while CCPA does not'
    ],
    correctAnswer: 1,
    explanation: 'VCDPA (effective Jan 2023) includes the right to correct inaccuracies, which was not in the original CCPA (though the CPRA amendment added it). VCDPA is enforced by the Attorney General, has no private right of action, and does not apply to non-profits.',
    topic: 'Privacy and Data Protection',
    subtopic: 'US State Privacy Laws'
  },
  {
    id: 'CISA5-PRIV-012',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Privacy by Design requires that:',
    options: [
      'Privacy features are added after system deployment based on complaints',
      'Privacy is proactively embedded into IT systems and business practices from the start',
      'All data must be encrypted at all times',
      'Only the IT department is responsible for privacy'
    ],
    correctAnswer: 1,
    explanation: 'Privacy by Design (GDPR Article 25) requires privacy to be embedded into systems from the beginning, not added later. The seven foundational principles include: proactive not reactive, privacy as default, embedded in design, full functionality, end-to-end security, visibility/transparency, and user-centricity.',
    topic: 'Privacy and Data Protection',
    subtopic: 'Privacy by Design'
  },
];

/**
 * All CISA COBIT 2019 and Privacy Regulation Questions
 */
export const CISA_COBIT_PRIVACY_BATCH15: Question[] = [
  ...COBIT_2019_QUESTIONS,
  ...PRIVACY_REGULATION_QUESTIONS,
];

export default CISA_COBIT_PRIVACY_BATCH15;
