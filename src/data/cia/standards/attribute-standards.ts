/**
 * IIA International Standards for the Professional Practice of Internal Auditing
 * 
 * Complete reference database of all mandatory IIA Standards
 * Updated to reflect the 2024 Standards (effective January 2025)
 * 
 * Standards are organized into:
 * - Attribute Standards (1000 series): Characteristics of organizations and individuals
 * - Performance Standards (2000 series): Nature of IA activities and quality criteria
 */

export interface IIAStandard {
  id: string;
  number: string;
  title: string;
  category: 'attribute' | 'performance';
  subcategory?: string;
  text: string;
  interpretation?: string;
  keyPoints: string[];
  examTips: string[];
  relatedStandards: string[];
  implementationGuidance?: string[];
  examWeight: 'high' | 'medium' | 'low';
}

// ============================================================================
// ATTRIBUTE STANDARDS (1000 Series)
// ============================================================================

export const ATTRIBUTE_STANDARDS: IIAStandard[] = [
  // 1000 - Purpose, Authority, and Responsibility
  {
    id: 'std-1000',
    number: '1000',
    title: 'Purpose, Authority, and Responsibility',
    category: 'attribute',
    subcategory: 'Charter',
    text: 'The purpose, authority, and responsibility of the internal audit activity must be formally defined in an internal audit charter, consistent with the Mission of Internal Audit and the mandatory elements of the International Professional Practices Framework (the Core Principles for the Professional Practice of Internal Auditing, the Code of Ethics, the Standards, and the Definition of Internal Auditing). The chief audit executive must periodically review the internal audit charter and present it to senior management and the board for approval.',
    interpretation: 'The internal audit charter is a formal document that defines the internal audit activity\'s purpose, authority, and responsibility. The internal audit charter establishes the internal audit activity\'s position within the organization, including the nature of the chief audit executive\'s functional reporting relationship with the board; authorizes access to records, personnel, and physical properties relevant to the performance of engagements; and defines the scope of internal audit activities. Final approval of the internal audit charter resides with the board.',
    keyPoints: [
      'Charter must be formally documented',
      'Must be consistent with IIA Mission and IPPF',
      'CAE must periodically review the charter',
      'Requires approval by senior management AND the board',
      'Establishes IA position within organization',
      'Authorizes access to records, personnel, and properties',
      'Defines scope of internal audit activities',
    ],
    examTips: [
      'The BOARD gives final approval of the charter (not just management)',
      'Charter must be reviewed PERIODICALLY (not just once)',
      'Charter establishes FUNCTIONAL reporting to the board',
      'Charter authorizes ACCESS - key for independence',
    ],
    relatedStandards: ['1100', '1110', '2010'],
    implementationGuidance: [
      'Review charter annually at minimum',
      'Present to audit committee for approval',
      'Ensure charter reflects current practices',
      'Include nature of consulting services if provided',
    ],
    examWeight: 'high',
  },

  // 1010 - Recognizing Mandatory Guidance
  {
    id: 'std-1010',
    number: '1010',
    title: 'Recognizing Mandatory Guidance in the Internal Audit Charter',
    category: 'attribute',
    subcategory: 'Charter',
    text: 'The mandatory nature of the Core Principles for the Professional Practice of Internal Auditing, the Code of Ethics, the Standards, and the Definition of Internal Auditing must be recognized in the internal audit charter. The chief audit executive should discuss the Mission of Internal Audit and the mandatory elements of the International Professional Practices Framework with senior management and the board.',
    keyPoints: [
      'Charter must recognize mandatory IPPF elements',
      'Mandatory elements: Core Principles, Code of Ethics, Standards, Definition',
      'CAE should discuss Mission and IPPF with management and board',
    ],
    examTips: [
      'Know the FOUR mandatory elements of IPPF',
      'Mission is discussed but Core Principles, Code, Standards, Definition are mandatory',
    ],
    relatedStandards: ['1000'],
    examWeight: 'medium',
  },

  // 1100 - Independence and Objectivity
  {
    id: 'std-1100',
    number: '1100',
    title: 'Independence and Objectivity',
    category: 'attribute',
    subcategory: 'Independence',
    text: 'The internal audit activity must be independent, and internal auditors must be objective in performing their work.',
    interpretation: 'Independence is the freedom from conditions that threaten the ability of the internal audit activity to carry out internal audit responsibilities in an unbiased manner. To achieve the degree of independence necessary to effectively carry out the responsibilities of the internal audit activity, the chief audit executive has direct and unrestricted access to senior management and the board. This can be achieved through a dual-reporting relationship. Threats to independence must be managed at the individual auditor, engagement, functional, and organizational levels. Objectivity is an unbiased mental attitude that allows internal auditors to perform engagements in such a manner that they believe in their work product and that no quality compromises are made. Objectivity requires that internal auditors do not subordinate their judgment on audit matters to others. Threats to objectivity must be managed at the individual auditor, engagement, functional, and organizational levels.',
    keyPoints: [
      'Independence = freedom from threatening conditions (activity level)',
      'Objectivity = unbiased mental attitude (individual level)',
      'CAE needs direct and unrestricted access to senior management and board',
      'Dual-reporting relationship supports independence',
      'Threats managed at multiple levels',
      'Auditors must not subordinate judgment to others',
    ],
    examTips: [
      'Independence is about the ACTIVITY; Objectivity is about the INDIVIDUAL',
      'Dual reporting = functional to board, administrative to management',
      'Both independence AND objectivity are required',
    ],
    relatedStandards: ['1110', '1120', '1130'],
    examWeight: 'high',
  },

  // 1110 - Organizational Independence
  {
    id: 'std-1110',
    number: '1110',
    title: 'Organizational Independence',
    category: 'attribute',
    subcategory: 'Independence',
    text: 'The chief audit executive must report to a level within the organization that allows the internal audit activity to fulfill its responsibilities. The chief audit executive must confirm to the board, at least annually, the organizational independence of the internal audit activity.',
    interpretation: 'Organizational independence is effectively achieved when the chief audit executive reports functionally to the board. Examples of functional reporting to the board involve the board: approving the internal audit charter; approving the risk-based internal audit plan; approving the internal audit budget and resource plan; receiving communications from the chief audit executive on the internal audit activity\'s performance relative to its plan and other matters; approving decisions regarding the appointment and removal of the chief audit executive; approving the remuneration of the chief audit executive; and making appropriate inquiries of management and the chief audit executive to determine whether there are inappropriate scope or resource limitations.',
    keyPoints: [
      'CAE reports to level allowing IA to fulfill responsibilities',
      'CAE confirms organizational independence to board ANNUALLY',
      'Functional reporting to board is the standard',
      'Board approves: Charter, Plan, Budget, CAE appointment/removal/remuneration',
      'Board receives communications on IA performance',
      'Board inquires about scope or resource limitations',
    ],
    examTips: [
      'Annual confirmation to board is REQUIRED',
      'Know what the BOARD approves (charter, plan, budget, CAE decisions)',
      'Functional vs administrative reporting - know the difference',
    ],
    relatedStandards: ['1100', '1111', '2060'],
    implementationGuidance: [
      'Include independence confirmation in annual report to board',
      'Document functional reporting relationship',
      'Ensure board approves key decisions affecting CAE',
    ],
    examWeight: 'high',
  },

  // 1111 - Direct Interaction with the Board
  {
    id: 'std-1111',
    number: '1111',
    title: 'Direct Interaction with the Board',
    category: 'attribute',
    subcategory: 'Independence',
    text: 'The chief audit executive must communicate and interact directly with the board.',
    keyPoints: [
      'Direct communication between CAE and board is mandatory',
      'No filtering through management',
      'Supports organizational independence',
    ],
    examTips: [
      'DIRECT interaction - not through intermediaries',
      'This standard reinforces independence',
    ],
    relatedStandards: ['1100', '1110'],
    examWeight: 'medium',
  },

  // 1112 - CAE Roles Beyond Internal Auditing
  {
    id: 'std-1112',
    number: '1112',
    title: 'Chief Audit Executive Roles Beyond Internal Auditing',
    category: 'attribute',
    subcategory: 'Independence',
    text: 'Where the chief audit executive has or is expected to have roles and/or responsibilities that fall outside of internal auditing, safeguards must be in place to limit impairments to independence or objectivity.',
    interpretation: 'The chief audit executive may be asked to take on additional roles and responsibilities outside of internal auditing, such as responsibility for compliance or risk management activities. These roles and responsibilities may impair, or appear to impair, the organizational independence of the internal audit activity or the individual objectivity of the internal auditor. Safeguards are those oversight activities, often undertaken by the board, to address these potential impairments, and may include such activities as periodically evaluating reporting lines and responsibilities and developing alternative processes to obtain assurance related to the areas of additional responsibility.',
    keyPoints: [
      'CAE may have roles beyond IA (compliance, risk, etc.)',
      'Safeguards must be in place when this occurs',
      'Board oversight is key safeguard',
      'Evaluate reporting lines periodically',
      'Develop alternative assurance processes',
    ],
    examTips: [
      'Additional CAE roles are ALLOWED with proper safeguards',
      'Board oversight is the primary safeguard',
      'Alternative assurance for areas CAE manages',
    ],
    relatedStandards: ['1100', '1110', '1130'],
    examWeight: 'medium',
  },

  // 1120 - Individual Objectivity
  {
    id: 'std-1120',
    number: '1120',
    title: 'Individual Objectivity',
    category: 'attribute',
    subcategory: 'Independence',
    text: 'Internal auditors must have an impartial, unbiased attitude and avoid any conflict of interest.',
    interpretation: 'Conflict of interest is a situation in which an internal auditor, who is in a position of trust, has a competing professional or personal interest. Such competing interests can make it difficult to fulfill his or her duties impartially. A conflict of interest exists even if no unethical or improper act results. A conflict of interest can create an appearance of impropriety that can undermine confidence in the internal auditor, the internal audit activity, and the profession. A conflict of interest could impair an individual\'s ability to perform his or her duties and responsibilities objectively.',
    keyPoints: [
      'Impartial and unbiased attitude required',
      'Avoid conflicts of interest',
      'Conflict exists even without improper act',
      'Appearance of impropriety matters',
      'Competing interests impair objectivity',
    ],
    examTips: [
      'Objectivity is about the INDIVIDUAL auditor',
      'Conflict of interest = APPEARANCE matters, not just actual impropriety',
      'Personal and professional conflicts both count',
    ],
    relatedStandards: ['1100', '1130'],
    examWeight: 'high',
  },

  // 1130 - Impairment to Independence or Objectivity
  {
    id: 'std-1130',
    number: '1130',
    title: 'Impairment to Independence or Objectivity',
    category: 'attribute',
    subcategory: 'Independence',
    text: 'If independence or objectivity is impaired in fact or appearance, the details of the impairment must be disclosed to appropriate parties. The nature of the disclosure will depend upon the impairment.',
    interpretation: 'Impairment to organizational independence and individual objectivity may include, but is not limited to, personal conflict of interest, scope limitations, restrictions on access to records, personnel, and properties, and resource limitations, such as funding. The determination of appropriate parties to which the details of an impairment to independence or objectivity must be disclosed is dependent upon the expectations of the internal audit activity\'s and the chief audit executive\'s responsibilities to senior management and the board as described in the internal audit charter, as well as the nature of the impairment.',
    keyPoints: [
      'Impairments must be DISCLOSED',
      'Both fact and appearance of impairment matter',
      'Types: personal conflicts, scope limits, access restrictions, resource limits',
      'Disclosure to appropriate parties based on nature',
      'Charter guides disclosure requirements',
    ],
    examTips: [
      'Key action: DISCLOSE impairments',
      'Impairment doesn\'t automatically disqualify - but must be disclosed',
      'Appearance of impairment treated same as actual impairment',
    ],
    relatedStandards: ['1100', '1120', '1130.A1', '1130.A2', '1130.C1', '1130.C2'],
    examWeight: 'high',
  },

  // 1200 - Proficiency and Due Professional Care
  {
    id: 'std-1200',
    number: '1200',
    title: 'Proficiency and Due Professional Care',
    category: 'attribute',
    subcategory: 'Proficiency',
    text: 'Engagements must be performed with proficiency and due professional care.',
    keyPoints: [
      'Both proficiency AND due care required',
      'Applies to all engagements',
      'Foundation for quality work',
    ],
    examTips: [
      'Proficiency = having the skills',
      'Due care = applying skills properly',
      'Both are required for every engagement',
    ],
    relatedStandards: ['1210', '1220', '1230'],
    examWeight: 'high',
  },

  // 1210 - Proficiency
  {
    id: 'std-1210',
    number: '1210',
    title: 'Proficiency',
    category: 'attribute',
    subcategory: 'Proficiency',
    text: 'Internal auditors must possess the knowledge, skills, and other competencies needed to perform their individual responsibilities. The internal audit activity collectively must possess or obtain the knowledge, skills, and other competencies needed to perform its responsibilities.',
    interpretation: 'Proficiency is a collective term that refers to the knowledge, skills, and other competencies required of internal auditors to effectively carry out their professional responsibilities. It includes consideration of current activities, trends, and emerging issues, to enable relevant advice and recommendations. Internal auditors are encouraged to demonstrate their proficiency by obtaining appropriate professional certifications and qualifications, such as the Certified Internal Auditor designation and other designations offered by The Institute of Internal Auditors and other appropriate professional organizations.',
    keyPoints: [
      'Individual auditors must have needed KSAs',
      'Activity collectively must have or obtain competencies',
      'Includes current trends and emerging issues',
      'Professional certifications encouraged',
      'CIA and other designations demonstrate proficiency',
    ],
    examTips: [
      'COLLECTIVELY is key - activity can obtain expertise if lacking',
      'If expertise lacking, CAE obtains competent advice/assistance',
      'Certifications like CIA demonstrate but don\'t guarantee proficiency',
    ],
    relatedStandards: ['1200', '1210.A1', '1210.A2', '1210.A3', '1210.C1'],
    examWeight: 'high',
  },

  // 1220 - Due Professional Care
  {
    id: 'std-1220',
    number: '1220',
    title: 'Due Professional Care',
    category: 'attribute',
    subcategory: 'Proficiency',
    text: 'Internal auditors must apply the care and skill expected of a reasonably prudent and competent internal auditor. Due professional care does not imply infallibility.',
    interpretation: 'Due professional care applies to individual internal auditors. Internal auditors exercise due professional care by considering the: Extent of work needed to achieve the engagement\'s objectives; Relative complexity, materiality, or significance of matters to which assurance procedures are applied; Adequacy and effectiveness of governance, risk management, and control processes; Probability of significant errors, fraud, or noncompliance; and Cost of assurance in relation to potential benefits.',
    keyPoints: [
      'Care and skill of reasonably prudent auditor',
      'Does NOT imply infallibility',
      'Consider extent of work needed',
      'Consider complexity and materiality',
      'Consider probability of errors, fraud, noncompliance',
      'Consider cost vs. benefit of assurance',
    ],
    examTips: [
      'Due care is NOT a guarantee of finding all problems',
      'Reasonable assurance, not absolute assurance',
      'Must consider cost-benefit',
      'Applies to individual auditors',
    ],
    relatedStandards: ['1200', '1220.A1', '1220.A2', '1220.A3', '1220.C1'],
    examWeight: 'high',
  },

  // 1230 - Continuing Professional Development
  {
    id: 'std-1230',
    number: '1230',
    title: 'Continuing Professional Development',
    category: 'attribute',
    subcategory: 'Proficiency',
    text: 'Internal auditors must enhance their knowledge, skills, and other competencies through continuing professional development.',
    keyPoints: [
      'CPD is mandatory for internal auditors',
      'Continuous enhancement of KSAs',
      'Includes formal and informal learning',
      'CIA certification requires ongoing CPE',
    ],
    examTips: [
      'CPD is required, not optional',
      'CAE should encourage professional development',
      'Includes conferences, training, reading, etc.',
    ],
    relatedStandards: ['1200', '1210'],
    examWeight: 'medium',
  },

  // 1300 - Quality Assurance and Improvement Program
  {
    id: 'std-1300',
    number: '1300',
    title: 'Quality Assurance and Improvement Program',
    category: 'attribute',
    subcategory: 'QAIP',
    text: 'The chief audit executive must develop and maintain a quality assurance and improvement program that covers all aspects of the internal audit activity.',
    interpretation: 'A quality assurance and improvement program is designed to enable an evaluation of the internal audit activity\'s conformance with the Standards and an evaluation of whether internal auditors apply the Code of Ethics. The program also assesses the efficiency and effectiveness of the internal audit activity and identifies opportunities for improvement. The chief audit executive should encourage board oversight in the quality assurance and improvement program.',
    keyPoints: [
      'CAE must develop AND maintain QAIP',
      'Covers ALL aspects of IA activity',
      'Evaluates conformance with Standards and Code',
      'Assesses efficiency and effectiveness',
      'Identifies improvement opportunities',
      'Board oversight encouraged',
    ],
    examTips: [
      'QAIP is mandatory, not optional',
      'Covers conformance AND efficiency/effectiveness',
      'Includes both internal and external assessments',
    ],
    relatedStandards: ['1310', '1311', '1312', '1320', '1321', '1322'],
    examWeight: 'high',
  },

  // 1310 - Requirements of the QAIP
  {
    id: 'std-1310',
    number: '1310',
    title: 'Requirements of the Quality Assurance and Improvement Program',
    category: 'attribute',
    subcategory: 'QAIP',
    text: 'The quality assurance and improvement program must include both internal and external assessments.',
    keyPoints: [
      'Two components: internal AND external assessments',
      'Both are required for complete QAIP',
    ],
    examTips: [
      'Know the difference between internal and external assessments',
      'Both are mandatory components',
    ],
    relatedStandards: ['1300', '1311', '1312'],
    examWeight: 'high',
  },

  // 1311 - Internal Assessments
  {
    id: 'std-1311',
    number: '1311',
    title: 'Internal Assessments',
    category: 'attribute',
    subcategory: 'QAIP',
    text: 'Internal assessments must include: ongoing monitoring of the performance of the internal audit activity; and periodic self-assessments or assessments by other persons within the organization with sufficient knowledge of internal audit practices.',
    interpretation: 'Ongoing monitoring is an integral part of the day-to-day supervision, review, and measurement of the internal audit activity. Ongoing monitoring is incorporated into the routine policies and practices used to manage the internal audit activity and uses processes, tools, and information considered necessary to evaluate conformance with the Code of Ethics and the Standards. Periodic assessments are conducted to evaluate conformance with the Code of Ethics and the Standards.',
    keyPoints: [
      'Two parts: ongoing monitoring + periodic assessments',
      'Ongoing = day-to-day supervision and review',
      'Periodic = self-assessment or by knowledgeable others',
      'Evaluates conformance with Code and Standards',
    ],
    examTips: [
      'Internal assessments have TWO components - know both',
      'Ongoing is continuous; periodic is at intervals',
      'Both are part of internal (not external) assessments',
    ],
    relatedStandards: ['1300', '1310', '1312'],
    examWeight: 'high',
  },

  // 1312 - External Assessments
  {
    id: 'std-1312',
    number: '1312',
    title: 'External Assessments',
    category: 'attribute',
    subcategory: 'QAIP',
    text: 'External assessments must be conducted at least once every five years by a qualified, independent assessor or assessment team from outside the organization. The chief audit executive must discuss with the board: the form and frequency of external assessment; and the qualifications and independence of the external assessor or assessment team, including any potential conflict of interest.',
    interpretation: 'External assessments may be accomplished through a full external assessment, or a self-assessment with independent external validation. The external assessor must conclude as to conformance with the Code of Ethics and the Standards; the external assessment may also include operational or strategic comments. A qualified assessor or assessment team demonstrates competence in two areas: the professional practice of internal auditing and the external assessment process. Competence can be demonstrated through a mixture of experience and theoretical learning. Experience gained in organizations of similar size, complexity, sector or industry, and technical issues is more valuable than less relevant experience. In the case of an assessment team, not all members of the team need to have all the competencies; it is the team as a whole that is qualified. The chief audit executive uses professional judgment when assessing whether an assessor or assessment team demonstrates sufficient competence to be qualified.',
    keyPoints: [
      'Required at least every FIVE years',
      'By qualified, independent assessor from OUTSIDE organization',
      'CAE discusses form, frequency, and qualifications with board',
      'Can be full external or self-assessment with independent validation (SAIV)',
      'Assessor must conclude on conformance with Code and Standards',
      'Assessor competence in IA practice AND assessment process',
    ],
    examTips: [
      'FIVE years is the key timeframe - frequently tested',
      'SAIV counts as external assessment if properly validated',
      'Board involvement in selecting assessor is required',
      'Assessor must be INDEPENDENT and QUALIFIED',
    ],
    relatedStandards: ['1300', '1310', '1311', '1320'],
    examWeight: 'high',
  },

  // 1320 - Reporting on the QAIP
  {
    id: 'std-1320',
    number: '1320',
    title: 'Reporting on the Quality Assurance and Improvement Program',
    category: 'attribute',
    subcategory: 'QAIP',
    text: 'The chief audit executive must communicate the results of the quality assurance and improvement program to senior management and the board. Disclosure should include: The scope and frequency of both the internal and external assessments; The qualifications and independence of the assessor(s) or assessment team, including potential conflicts of interest; Conclusions reached by the assessors; Corrective action plans.',
    interpretation: 'The form, content, and frequency of communicating the results of the quality assurance and improvement program is established through discussions with senior management and the board and considers the responsibilities of the internal audit activity and chief audit executive as contained in the internal audit charter. To demonstrate conformance with the Code of Ethics and the Standards, the results of external and periodic internal assessments are communicated upon completion of such assessments and the results of ongoing monitoring are communicated at least annually. The results include the assessor\'s or assessment team\'s evaluation with respect to the degree of conformance.',
    keyPoints: [
      'CAE must communicate QAIP results to senior management AND board',
      'Include scope, frequency, qualifications, conclusions, action plans',
      'External and periodic internal results communicated upon completion',
      'Ongoing monitoring results at least annually',
      'Include degree of conformance evaluation',
    ],
    examTips: [
      'Report to BOTH senior management and board',
      'Include corrective action plans',
      'Annual reporting for ongoing monitoring',
    ],
    relatedStandards: ['1300', '1321', '1322'],
    examWeight: 'medium',
  },

  // 1321 - Use of "Conforms with the Standards"
  {
    id: 'std-1321',
    number: '1321',
    title: 'Use of "Conforms with the International Standards for the Professional Practice of Internal Auditing"',
    category: 'attribute',
    subcategory: 'QAIP',
    text: 'Indicating that the internal audit activity conforms with the International Standards for the Professional Practice of Internal Auditing is appropriate only if the results of the quality assurance and improvement program support this statement.',
    keyPoints: [
      'Can only claim conformance if QAIP results support it',
      'Statement must be evidence-based',
      'QAIP is the foundation for conformance claims',
    ],
    examTips: [
      'Can\'t claim conformance without QAIP evidence',
      'Results of both internal and external assessments matter',
    ],
    relatedStandards: ['1300', '1320', '1322'],
    examWeight: 'medium',
  },

  // 1322 - Disclosure of Nonconformance
  {
    id: 'std-1322',
    number: '1322',
    title: 'Disclosure of Nonconformance',
    category: 'attribute',
    subcategory: 'QAIP',
    text: 'When nonconformance with the Code of Ethics or the Standards impacts the overall scope or operation of the internal audit activity, the chief audit executive must disclose the nonconformance and the impact to senior management and the board.',
    keyPoints: [
      'Nonconformance impacting scope/operation must be disclosed',
      'Disclose to senior management AND board',
      'Include the impact of nonconformance',
      'Applies to Code of Ethics AND Standards',
    ],
    examTips: [
      'Disclosure is mandatory when there\'s significant impact',
      'Both the nonconformance AND its impact must be communicated',
    ],
    relatedStandards: ['1300', '1320', '1321'],
    examWeight: 'medium',
  },
];

export default ATTRIBUTE_STANDARDS;
