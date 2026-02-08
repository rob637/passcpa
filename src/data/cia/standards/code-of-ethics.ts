/**
 * IIA Code of Ethics and Core Principles
 * 
 * Mandatory guidance for internal auditors
 */

export interface EthicsPrinciple {
  id: string;
  name: string;
  description: string;
  rulesOfConduct: string[];
  examTips: string[];
  commonViolations: string[];
}

export interface CorePrinciple {
  id: string;
  number: number;
  principle: string;
  description: string;
  relatedStandards: string[];
  examTips: string[];
}

// ============================================================================
// IIA CODE OF ETHICS - Four Principles with Rules of Conduct
// ============================================================================

export const CODE_OF_ETHICS: EthicsPrinciple[] = [
  {
    id: 'ethics-integrity',
    name: 'Integrity',
    description: 'The integrity of internal auditors establishes trust and thus provides the basis for reliance on their judgment.',
    rulesOfConduct: [
      'Shall perform their work with honesty, diligence, and responsibility.',
      'Shall observe the law and make disclosures expected by the law and the profession.',
      'Shall not knowingly be a party to any illegal activity, or engage in acts that are discreditable to the profession of internal auditing or to the organization.',
      'Shall respect and contribute to the legitimate and ethical objectives of the organization.',
    ],
    examTips: [
      'Integrity is about TRUST and RELIANCE on judgment',
      'Includes honesty, diligence, responsibility',
      'Must observe the law',
      'Cannot be party to illegal activity - even unknowingly is a concern',
    ],
    commonViolations: [
      'Concealing findings to protect relationships',
      'Signing off on work not properly reviewed',
      'Ignoring evidence of fraud or illegal activity',
      'Falsifying audit documentation',
    ],
  },
  {
    id: 'ethics-objectivity',
    name: 'Objectivity',
    description: 'Internal auditors exhibit the highest level of professional objectivity in gathering, evaluating, and communicating information about the activity or process being examined. Internal auditors make a balanced assessment of all the relevant circumstances and are not unduly influenced by their own interests or by others in forming judgments.',
    rulesOfConduct: [
      'Shall not participate in any activity or relationship that may impair or be presumed to impair their unbiased assessment. This participation includes those activities or relationships that may be in conflict with the interests of the organization.',
      'Shall not accept anything that may impair or be presumed to impair their professional judgment.',
      'Shall disclose all material facts known to them that, if not disclosed, may distort the reporting of activities under review.',
    ],
    examTips: [
      'Objectivity is about UNBIASED assessment',
      'Balanced assessment of all circumstances',
      'Cannot accept gifts that impair judgment',
      'Must disclose all material facts',
    ],
    commonViolations: [
      'Accepting significant gifts from auditees',
      'Auditing areas where auditor has personal relationships',
      'Omitting unfavorable findings to avoid conflict',
      'Letting management influence conclusions',
    ],
  },
  {
    id: 'ethics-confidentiality',
    name: 'Confidentiality',
    description: 'Internal auditors respect the value and ownership of information they receive and do not disclose information without appropriate authority unless there is a legal or professional obligation to do so.',
    rulesOfConduct: [
      'Shall be prudent in the use and protection of information acquired in the course of their duties.',
      'Shall not use information for any personal gain or in any manner that would be contrary to the law or detrimental to the legitimate and ethical objectives of the organization.',
    ],
    examTips: [
      'Respect VALUE and OWNERSHIP of information',
      'Cannot use information for personal gain',
      'May disclose if legal or professional obligation',
      'Prudent use and protection required',
    ],
    commonViolations: [
      'Sharing confidential information inappropriately',
      'Using audit information for personal investment decisions',
      'Discussing findings with unauthorized parties',
      'Improper handling of sensitive data',
    ],
  },
  {
    id: 'ethics-competency',
    name: 'Competency',
    description: 'Internal auditors apply the knowledge, skills, and experience needed in the performance of internal audit services.',
    rulesOfConduct: [
      'Shall engage only in those services for which they have the necessary knowledge, skills, and experience.',
      'Shall perform internal audit services in accordance with the International Standards for the Professional Practice of Internal Auditing.',
      'Shall continually improve their proficiency and the effectiveness and quality of their services.',
    ],
    examTips: [
      'Must have KSAs for services performed',
      'Must follow the Standards',
      'Continuous improvement required',
      'Don\'t take on work beyond your competence',
    ],
    commonViolations: [
      'Performing audits in areas lacking expertise',
      'Ignoring Standards requirements',
      'Failing to pursue professional development',
      'Not seeking help when needed',
    ],
  },
];

// ============================================================================
// TEN CORE PRINCIPLES for the Professional Practice of Internal Auditing
// ============================================================================

export const CORE_PRINCIPLES: CorePrinciple[] = [
  {
    id: 'cp-1',
    number: 1,
    principle: 'Demonstrates integrity',
    description: 'The integrity of internal auditors establishes trust and thus provides the basis for reliance on their judgment.',
    relatedStandards: ['1000', '1100', 'Code of Ethics'],
    examTips: [
      'Foundation for all other principles',
      'Trust is the key outcome',
    ],
  },
  {
    id: 'cp-2',
    number: 2,
    principle: 'Demonstrates competence and due professional care',
    description: 'Internal auditors apply the knowledge, skills, and experience needed in the performance of internal audit services.',
    relatedStandards: ['1200', '1210', '1220', '1230'],
    examTips: [
      'Proficiency AND due care both required',
      'Links to CPD requirement',
    ],
  },
  {
    id: 'cp-3',
    number: 3,
    principle: 'Is objective and free from undue influence (independent)',
    description: 'Internal auditors exhibit the highest level of professional objectivity in gathering, evaluating, and communicating information.',
    relatedStandards: ['1100', '1110', '1111', '1112', '1120', '1130'],
    examTips: [
      'Both objectivity AND independence',
      'Free from UNDUE influence (some influence is normal)',
    ],
  },
  {
    id: 'cp-4',
    number: 4,
    principle: 'Aligns with the strategies, objectives, and risks of the organization',
    description: 'The internal audit plan is aligned with and supports the organization\'s objectives.',
    relatedStandards: ['2010', '2100', '2120'],
    examTips: [
      'Risk-based planning',
      'Alignment with organizational goals',
    ],
  },
  {
    id: 'cp-5',
    number: 5,
    principle: 'Is appropriately positioned and adequately resourced',
    description: 'The internal audit activity is positioned to fulfill its responsibilities effectively and has the resources to do so.',
    relatedStandards: ['1000', '1110', '2020', '2030'],
    examTips: [
      'Organizational positioning',
      'Resource sufficiency',
    ],
  },
  {
    id: 'cp-6',
    number: 6,
    principle: 'Demonstrates quality and continuous improvement',
    description: 'A commitment to quality is embedded in the internal audit activity.',
    relatedStandards: ['1300', '1310', '1311', '1312', '1320'],
    examTips: [
      'QAIP is the mechanism',
      'Continuous, not one-time',
    ],
  },
  {
    id: 'cp-7',
    number: 7,
    principle: 'Communicates effectively',
    description: 'Internal auditors communicate effectively with appropriate parties.',
    relatedStandards: ['2400', '2410', '2420', '2440'],
    examTips: [
      'Seven qualities of communications',
      'To appropriate parties',
    ],
  },
  {
    id: 'cp-8',
    number: 8,
    principle: 'Provides risk-based assurance',
    description: 'Internal auditors provide assurance based on the highest risks to the organization.',
    relatedStandards: ['2010', '2100', '2120'],
    examTips: [
      'Risk-based approach',
      'Prioritize high risks',
    ],
  },
  {
    id: 'cp-9',
    number: 9,
    principle: 'Is insightful, proactive, and future-focused',
    description: 'Internal auditors identify and explore emerging issues and trends, providing advice that adds value.',
    relatedStandards: ['2100', '2110', '2120', '2130'],
    examTips: [
      'Not just historical review',
      'Forward-looking perspective',
    ],
  },
  {
    id: 'cp-10',
    number: 10,
    principle: 'Promotes organizational improvement',
    description: 'Internal auditors help organizations improve by providing recommendations and advice.',
    relatedStandards: ['2100', '2110', '2120', '2130', '2410', '2500'],
    examTips: [
      'Improvement focus, not just finding problems',
      'Constructive recommendations',
    ],
  },
];

// ============================================================================
// IPPF Framework Overview
// ============================================================================

export interface IPPFElement {
  name: string;
  mandatory: boolean;
  description: string;
  components?: string[];
}

export const IPPF_FRAMEWORK: IPPFElement[] = [
  {
    name: 'Mission of Internal Audit',
    mandatory: false, // Discussed but not mandatory
    description: 'To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight.',
    components: [
      'Enhance organizational value',
      'Protect organizational value',
      'Risk-based approach',
      'Objective assurance',
      'Advice and insight',
    ],
  },
  {
    name: 'Core Principles',
    mandatory: true,
    description: 'The Core Principles, taken as a whole, articulate internal audit effectiveness. For an internal audit function to be considered effective, all Principles should be present and operating effectively.',
    components: [
      'Ten principles that define effective internal auditing',
      'Must all be present for effectiveness',
    ],
  },
  {
    name: 'Code of Ethics',
    mandatory: true,
    description: 'The Code of Ethics states the principles and expectations governing the behavior of individuals and organizations in the conduct of internal auditing.',
    components: [
      'Four principles: Integrity, Objectivity, Confidentiality, Competency',
      'Rules of Conduct for each principle',
    ],
  },
  {
    name: 'International Standards',
    mandatory: true,
    description: 'The Standards are principle-focused and provide a framework for performing and promoting internal auditing.',
    components: [
      'Attribute Standards (1000 series)',
      'Performance Standards (2000 series)',
      'Implementation Standards',
    ],
  },
  {
    name: 'Definition of Internal Auditing',
    mandatory: true,
    description: 'Internal auditing is an independent, objective assurance and consulting activity designed to add value and improve an organization\'s operations. It helps an organization accomplish its objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control, and governance processes.',
    components: [
      'Independent and objective',
      'Assurance AND consulting',
      'Adds value and improves operations',
      'Systematic and disciplined approach',
      'Focus on risk management, control, governance',
    ],
  },
  {
    name: 'Implementation Guidance',
    mandatory: false,
    description: 'Guidance that addresses the Standards\' approach, methodologies, and consideration, but does not detail processes or procedures.',
  },
  {
    name: 'Supplemental Guidance',
    mandatory: false,
    description: 'Detailed guidance for conducting internal audit activities, including practice guides, practice advisories, global technology audit guides.',
  },
];

export default {
  CODE_OF_ETHICS,
  CORE_PRINCIPLES,
  IPPF_FRAMEWORK,
};
