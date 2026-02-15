/**
 * CISA Domain 1: Information Systems Auditing Process - Flashcards Batch 2
 * Additional flashcards covering advanced topics
 */

import { Flashcard } from './types';

export const cisa1FlashcardsBatch2: Flashcard[] = [
  // Advanced Audit Planning
  {
    id: 'cisa1-fc-032',
    front: 'What factors determine audit frequency for a system?',
    back: 'Risk level, criticality of the system, regulatory requirements, results of prior audits, and changes since last audit.',
    category: 'Audit Planning',
    tags: ['audit planning', 'risk assessment', 'CISA1'],
  },
  {
    id: 'cisa1-fc-033',
    front: 'What is inherent risk in audit terminology?',
    back: 'The susceptibility of an area to error or misstatement before considering internal controls - the natural risk level.',
    category: 'Risk Assessment',
    tags: ['inherent risk', 'risk assessment', 'CISA1'],
  },
  {
    id: 'cisa1-fc-034',
    front: 'What is control risk?',
    back: 'The risk that internal controls will not prevent, detect, or correct errors or misstatements on a timely basis.',
    category: 'Risk Assessment',
    tags: ['control risk', 'risk assessment', 'CISA1'],
  },
  {
    id: 'cisa1-fc-035',
    front: 'What is detection risk?',
    back: 'The risk that audit procedures will not detect material misstatements or control weaknesses that exist.',
    category: 'Risk Assessment',
    tags: ['detection risk', 'audit risk', 'CISA1'],
  },
  {
    id: 'cisa1-fc-036',
    front: 'How is audit risk calculated?',
    back: 'Audit Risk = Inherent Risk × Control Risk × Detection Risk. The auditor adjusts detection risk by modifying audit procedures.',
    category: 'Risk Assessment',
    tags: ['audit risk', 'risk calculation', 'CISA1'],
  },
  
  // Evidence and Documentation
  {
    id: 'cisa1-fc-037',
    front: 'What are the characteristics of reliable audit evidence?',
    back: 'Independence of source, objectivity, timing (contemporaneous is better), corroboration, and directness of evidence.',
    category: 'Audit Evidence',
    tags: ['evidence', 'reliability', 'CISA1'],
  },
  {
    id: 'cisa1-fc-038',
    front: 'What is positive confirmation?',
    back: 'A request where the recipient must respond whether they agree OR disagree with the information. Provides stronger evidence.',
    category: 'Audit Evidence',
    tags: ['confirmation', 'evidence', 'CISA1'],
  },
  {
    id: 'cisa1-fc-039',
    front: 'What is negative confirmation?',
    back: 'A request where the recipient responds only if they disagree. Non-response is assumed to mean agreement. Weaker evidence.',
    category: 'Audit Evidence',
    tags: ['confirmation', 'evidence', 'CISA1'],
  },
  {
    id: 'cisa1-fc-040',
    front: 'What is the purpose of audit workpapers?',
    back: 'To document findings, support conclusions, enable review, provide evidence of work performed, and facilitate follow-up audits.',
    category: 'Documentation',
    tags: ['workpapers', 'documentation', 'CISA1'],
  },
  {
    id: 'cisa1-fc-041',
    front: 'How long should audit workpapers be retained?',
    back: 'According to organizational policy and regulatory requirements - typically 5-7 years or longer for regulated industries.',
    category: 'Documentation',
    tags: ['retention', 'workpapers', 'CISA1'],
  },
  
  // Sampling
  {
    id: 'cisa1-fc-042',
    front: 'What is statistical sampling?',
    back: 'Sampling using probability theory that allows mathematical projection of results to the population with measurable confidence.',
    category: 'Sampling',
    tags: ['sampling', 'statistics', 'CISA1'],
  },
  {
    id: 'cisa1-fc-043',
    front: 'What is judgmental (non-statistical) sampling?',
    back: 'Sampling based on auditor judgment where sample selection criteria are subjective. Results cannot be statistically projected.',
    category: 'Sampling',
    tags: ['sampling', 'judgmental', 'CISA1'],
  },
  {
    id: 'cisa1-fc-044',
    front: 'What is attribute sampling?',
    back: 'Testing for presence or absence of a characteristic (e.g., whether approvals exist). Used for control testing.',
    category: 'Sampling',
    tags: ['sampling', 'attribute', 'CISA1'],
  },
  {
    id: 'cisa1-fc-045',
    front: 'What is variable sampling?',
    back: 'Testing to estimate numerical values (amounts). Used for substantive testing to estimate monetary errors.',
    category: 'Sampling',
    tags: ['sampling', 'variable', 'CISA1'],
  },
  {
    id: 'cisa1-fc-046',
    front: 'What is the relationship between sample size and confidence level?',
    back: 'Higher confidence level requires larger sample size. Also affected by expected error rate and tolerable error rate.',
    category: 'Sampling',
    tags: ['sampling', 'sample size', 'CISA1'],
  },
  
  // CAATs
  {
    id: 'cisa1-fc-047',
    front: 'What is the primary benefit of using CAATs?',
    back: 'Ability to test entire populations (100% testing) rather than samples, increasing audit coverage and effectiveness.',
    category: 'CAATs',
    tags: ['CAATs', 'data analysis', 'CISA1'],
  },
  {
    id: 'cisa1-fc-048',
    front: 'What is embedded audit module (EAM)?',
    back: 'Audit routines embedded within an application system that capture transactions meeting audit criteria for later analysis.',
    category: 'CAATs',
    tags: ['CAATs', 'EAM', 'continuous auditing', 'CISA1'],
  },

  {
    id: 'cisa1-fc-050',
    front: 'What is parallel simulation?',
    back: 'Using audit software to independently process data using the same logic as the production application to compare results.',
    category: 'CAATs',
    tags: ['CAATs', 'parallel simulation', 'CISA1'],
  },
  {
    id: 'cisa1-fc-051',
    front: 'What is Benford\'s Law used for in auditing?',
    back: 'Detecting anomalies in numerical data by comparing digit distribution to expected mathematical pattern - indicates potential fraud.',
    category: 'CAATs',
    tags: ['CAATs', 'Benford Law', 'fraud', 'CISA1'],
  },
  
  // Control Testing
  {
    id: 'cisa1-fc-052',
    front: 'What is the difference between design and operating effectiveness?',
    back: 'Design effectiveness: Is the control designed to achieve its objective? Operating effectiveness: Does the control operate as designed?',
    category: 'Control Testing',
    tags: ['controls', 'effectiveness', 'CISA1'],
  },
  {
    id: 'cisa1-fc-053',
    front: 'What is a walkthrough test?',
    back: 'Tracing one or a few transactions through an entire process to understand how it operates and verify control points.',
    category: 'Control Testing',
    tags: ['walkthrough', 'testing', 'CISA1'],
  },
  {
    id: 'cisa1-fc-054',
    front: 'What is substantive testing?',
    back: 'Testing used to detect material misstatements in financial data, including tests of details and analytical procedures.',
    category: 'Control Testing',
    tags: ['substantive testing', 'audit testing', 'CISA1'],
  },
  {
    id: 'cisa1-fc-055',
    front: 'What is compliance testing?',
    back: 'Testing used to evaluate whether controls are operating effectively (also called tests of controls).',
    category: 'Control Testing',
    tags: ['compliance testing', 'controls', 'CISA1'],
  },
  
  // Reporting
  {
    id: 'cisa1-fc-056',
    front: 'What are the components of an audit finding?',
    back: 'Criteria (what should be), Condition (what is), Cause (why it happened), Consequence (impact/risk), Corrective action.',
    category: 'Reporting',
    tags: ['findings', 'reporting', 'CISA1'],
  },
  {
    id: 'cisa1-fc-057',
    front: 'What is an adverse opinion?',
    back: 'An opinion that controls/statements are materially misstated or control objectives are not achieved - the most severe opinion.',
    category: 'Reporting',
    tags: ['opinion', 'adverse', 'CISA1'],
  },
  {
    id: 'cisa1-fc-058',
    front: 'What is a qualified opinion?',
    back: 'An opinion that states except for specific matters, the area is fairly presented or controls are effective.',
    category: 'Reporting',
    tags: ['opinion', 'qualified', 'CISA1'],
  },
  {
    id: 'cisa1-fc-059',
    front: 'What is a disclaimer of opinion?',
    back: 'Statement that the auditor cannot express an opinion due to scope limitation or inability to obtain sufficient evidence.',
    category: 'Reporting',
    tags: ['opinion', 'disclaimer', 'CISA1'],
  },
  {
    id: 'cisa1-fc-060',
    front: 'Who should receive the audit report first?',
    back: 'Management responsible for the area audited (for response), then executive management and audit committee.',
    category: 'Reporting',
    tags: ['reporting', 'distribution', 'CISA1'],
  },
  
  // Follow-Up

  {
    id: 'cisa1-fc-062',
    front: 'What should an auditor do if management does not remediate findings?',
    back: 'Escalate to appropriate governance (audit committee) and document the risk exposure of non-remediation.',
    category: 'Follow-Up',
    tags: ['follow-up', 'escalation', 'CISA1'],
  },
  
  // Continuous Auditing
  {
    id: 'cisa1-fc-063',
    front: 'What is continuous auditing?',
    back: 'Using automated procedures to perform audit activities on a continuous or near real-time basis rather than periodically.',
    category: 'Continuous Auditing',
    tags: ['continuous auditing', 'automation', 'CISA1'],
  },
  {
    id: 'cisa1-fc-064',
    front: 'What is the difference between continuous auditing and continuous monitoring?',
    back: 'Continuous monitoring is management\'s ongoing oversight. Continuous auditing is the audit function\'s independent assessment.',
    category: 'Continuous Auditing',
    tags: ['continuous auditing', 'monitoring', 'CISA1'],
  },
  
  // IT General Controls

  {
    id: 'cisa1-fc-066',
    front: 'Why are ITGCs important for financial statement audits?',
    back: 'Weak ITGCs can undermine reliance on application controls, requiring auditors to increase substantive testing.',
    category: 'ITGCs',
    tags: ['ITGC', 'financial audit', 'CISA1'],
  },
  {
    id: 'cisa1-fc-067',
    front: 'What is the typical scope of ITGC testing?',
    back: 'Access controls, change management, computer operations, program development, and physical security for in-scope applications.',
    category: 'ITGCs',
    tags: ['ITGC', 'scope', 'CISA1'],
  },
  
  // Third-Party Assurance
  {
    id: 'cisa1-fc-068',
    front: 'What is a SOC 1 report?',
    back: 'Report on controls at a service organization relevant to user entities\' internal control over financial reporting.',
    category: 'Third-Party',
    tags: ['SOC', 'assurance', 'CISA1'],
  },
  {
    id: 'cisa1-fc-069',
    front: 'What is a SOC 2 report?',
    back: 'Report on controls related to security, availability, processing integrity, confidentiality, and/or privacy (Trust Services Criteria).',
    category: 'Third-Party',
    tags: ['SOC', 'assurance', 'CISA1'],
  },
  {
    id: 'cisa1-fc-070',
    front: 'What is the difference between Type 1 and Type 2 SOC reports?',
    back: 'Type 1: Controls design at a point in time. Type 2: Design AND operating effectiveness over a period (typically 6-12 months).',
    category: 'Third-Party',
    tags: ['SOC', 'Type 1', 'Type 2', 'CISA1'],
  },
  {
    id: 'cisa1-fc-071',
    front: 'What should an auditor review in a SOC report?',
    back: 'Scope, period covered, complementary user entity controls, exceptions noted, and whether controls address risks.',
    category: 'Third-Party',
    tags: ['SOC', 'review', 'CISA1'],
  },
];
