/**
 * IIA Performance Standards (2000 Series)
 * 
 * Performance Standards describe the nature of internal audit activities
 * and provide quality criteria against which performance can be measured.
 */

import { IIAStandard } from './attribute-standards';

// ============================================================================
// PERFORMANCE STANDARDS (2000 Series)
// ============================================================================

export const PERFORMANCE_STANDARDS: IIAStandard[] = [
  // 2000 - Managing the Internal Audit Activity
  {
    id: 'std-2000',
    number: '2000',
    title: 'Managing the Internal Audit Activity',
    category: 'performance',
    subcategory: 'Managing',
    text: 'The chief audit executive must effectively manage the internal audit activity to ensure it adds value to the organization.',
    interpretation: 'The internal audit activity is effectively managed when: It achieves the purpose and responsibility included in the internal audit charter; It conforms with the Standards; Its individual members conform with the Code of Ethics and the Standards; It considers trends and emerging issues that could impact the organization. The internal audit activity adds value to the organization and its stakeholders when it provides objective and relevant assurance, and contributes to the effectiveness and efficiency of governance, risk management, and control processes.',
    keyPoints: [
      'CAE must EFFECTIVELY manage the IA activity',
      'Ensure value is added to organization',
      'Achieve purpose in charter',
      'Conform with Standards',
      'Members conform with Code and Standards',
      'Consider trends and emerging issues',
    ],
    examTips: [
      'Value = objective assurance + effective GRC',
      'Management responsibility rests with CAE',
      'Effectiveness is mandatory, not optional',
    ],
    relatedStandards: ['1000', '2010', '2020', '2030'],
    examWeight: 'high',
  },

  // 2010 - Planning
  {
    id: 'std-2010',
    number: '2010',
    title: 'Planning',
    category: 'performance',
    subcategory: 'Managing',
    text: 'The chief audit executive must establish a risk-based plan to determine the priorities of the internal audit activity, consistent with the organization\'s goals.',
    interpretation: 'To develop the risk-based plan, the chief audit executive consults with senior management and the board and obtains an understanding of the organization\'s strategies, key business objectives, associated risks, and risk management processes. The chief audit executive must review and adjust the plan, as necessary, in response to changes in the organization\'s business, risks, operations, programs, systems, and controls.',
    keyPoints: [
      'CAE establishes RISK-BASED plan',
      'Plan determines IA priorities',
      'Must be consistent with organization goals',
      'Consult with senior management and board',
      'Understand strategies, objectives, risks, risk management',
      'Review and adjust plan as needed',
    ],
    examTips: [
      'RISK-BASED is the key qualifier for the plan',
      'Plan requires consultation with management AND board',
      'Plan must be flexible and adjustable',
    ],
    relatedStandards: ['2000', '2010.A1', '2010.A2', '2010.C1'],
    implementationGuidance: [
      'Use risk assessment to prioritize audits',
      'Align with strategic planning cycle',
      'Consider previous audit results',
      'Factor in resource constraints',
    ],
    examWeight: 'high',
  },

  // 2020 - Communication and Approval
  {
    id: 'std-2020',
    number: '2020',
    title: 'Communication and Approval',
    category: 'performance',
    subcategory: 'Managing',
    text: 'The chief audit executive must communicate the internal audit activity\'s plans and resource requirements, including significant interim changes, to senior management and the board for review and approval. The chief audit executive must also communicate the impact of resource limitations.',
    keyPoints: [
      'Communicate plans AND resource requirements',
      'Include significant interim changes',
      'To senior management AND board',
      'For review AND approval',
      'Communicate impact of resource limitations',
    ],
    examTips: [
      'Both plan AND resources need approval',
      'Resource limitations must be disclosed',
      'Interim changes need communication too',
    ],
    relatedStandards: ['2000', '2010', '2030'],
    examWeight: 'high',
  },

  // 2030 - Resource Management
  {
    id: 'std-2030',
    number: '2030',
    title: 'Resource Management',
    category: 'performance',
    subcategory: 'Managing',
    text: 'The chief audit executive must ensure that internal audit resources are appropriate, sufficient, and effectively deployed to achieve the approved plan.',
    interpretation: 'Appropriate refers to the mix of knowledge, skills, and other competencies needed to perform the plan. Sufficient refers to the quantity of resources needed to accomplish the plan. Resources are effectively deployed when they are used in a way that optimizes the achievement of the approved plan.',
    keyPoints: [
      'Resources must be APPROPRIATE (right mix of KSAs)',
      'Resources must be SUFFICIENT (right quantity)',
      'Resources must be EFFECTIVELY DEPLOYED (optimal use)',
      'Goal is to achieve approved plan',
    ],
    examTips: [
      'Know the three criteria: Appropriate, Sufficient, Effectively Deployed',
      'Appropriate = competencies; Sufficient = quantity',
      'This connects to proficiency standards',
    ],
    relatedStandards: ['1200', '1210', '2020'],
    examWeight: 'medium',
  },

  // 2040 - Policies and Procedures
  {
    id: 'std-2040',
    number: '2040',
    title: 'Policies and Procedures',
    category: 'performance',
    subcategory: 'Managing',
    text: 'The chief audit executive must establish policies and procedures to guide the internal audit activity.',
    interpretation: 'The form and content of policies and procedures are dependent upon the size and structure of the internal audit activity and the complexity of its work.',
    keyPoints: [
      'CAE must establish policies and procedures',
      'Purpose is to guide IA activity',
      'Form/content depends on size, structure, complexity',
      'Scalable to organization needs',
    ],
    examTips: [
      'Policies/procedures are required but scalable',
      'Larger/more complex = more formal policies',
    ],
    relatedStandards: ['2000'],
    examWeight: 'low',
  },

  // 2050 - Coordination and Reliance
  {
    id: 'std-2050',
    number: '2050',
    title: 'Coordination and Reliance',
    category: 'performance',
    subcategory: 'Managing',
    text: 'The chief audit executive should share information, coordinate activities, and consider relying upon the work of other internal and external assurance and consulting service providers to ensure proper coverage and minimize duplication of efforts.',
    interpretation: 'In coordinating activities, the chief audit executive may rely on the work of other assurance and consulting service providers. A consistent process for the basis of reliance should be established, and the chief audit executive should consider the competency, objectivity, and due professional care of the assurance and consulting service providers as it relates to the intended scope of the work. The chief audit executive should also have a clear understanding of the scope, objectives, and results of the work performed by other providers of assurance and consulting services. Where reliance is placed on the work of others, the chief audit executive is still accountable and responsible for ensuring adequate support for conclusions and opinions reached by the internal audit activity.',
    keyPoints: [
      'Share information with other providers',
      'Coordinate to avoid duplication',
      'Consider relying on work of others',
      'Evaluate competency, objectivity, due care of others',
      'Understand scope, objectives, results of others\' work',
      'CAE still accountable even when relying on others',
    ],
    examTips: [
      'Reliance is allowed but CAE remains accountable',
      'Need process for determining reliance',
      'Evaluate other providers\' qualifications',
    ],
    relatedStandards: ['2000', '2050.A1'],
    examWeight: 'medium',
  },

  // 2060 - Reporting to Senior Management and the Board
  {
    id: 'std-2060',
    number: '2060',
    title: 'Reporting to Senior Management and the Board',
    category: 'performance',
    subcategory: 'Managing',
    text: 'The chief audit executive must report periodically to senior management and the board on the internal audit activity\'s purpose, authority, responsibility, and performance relative to its plan and on its conformance with the Code of Ethics and the Standards. Reporting must also include significant risk and control issues, including fraud risks, governance issues, and other matters that require the attention of senior management and/or the board.',
    interpretation: 'The frequency and content of reporting are determined collaboratively by the chief audit executive, senior management, and the board. The frequency and content of reporting depends on the importance of the information to be communicated and the urgency of the related actions to be taken by senior management and/or the board.',
    keyPoints: [
      'CAE reports PERIODICALLY to management and board',
      'Report on purpose, authority, responsibility',
      'Report performance relative to plan',
      'Report conformance with Code and Standards',
      'Report significant risk and control issues',
      'Include fraud risks, governance issues',
      'Frequency determined collaboratively',
    ],
    examTips: [
      'Reporting is periodic, not just annual',
      'Include SIGNIFICANT issues - not just all issues',
      'Fraud risks specifically mentioned',
      'Collaborative determination of frequency',
    ],
    relatedStandards: ['1110', '2020', '2600'],
    examWeight: 'high',
  },

  // 2070 - External Service Provider and Organizational Responsibility
  {
    id: 'std-2070',
    number: '2070',
    title: 'External Service Provider and Organizational Responsibility for Internal Auditing',
    category: 'performance',
    subcategory: 'Managing',
    text: 'When an external service provider serves as the internal audit activity, the provider must make the organization aware that the organization has the responsibility for maintaining an effective internal audit activity.',
    interpretation: 'This responsibility is demonstrated through the quality assurance and improvement program which assesses conformance with the Code of Ethics and the Standards.',
    keyPoints: [
      'External providers can serve as IA activity',
      'Organization retains responsibility for effective IA',
      'Provider must communicate this to organization',
      'QAIP demonstrates this responsibility',
    ],
    examTips: [
      'Outsourcing doesn\'t eliminate organizational responsibility',
      'Provider must inform organization of their responsibility',
    ],
    relatedStandards: ['1300', '2000'],
    examWeight: 'low',
  },

  // 2100 - Nature of Work
  {
    id: 'std-2100',
    number: '2100',
    title: 'Nature of Work',
    category: 'performance',
    subcategory: 'Nature of Work',
    text: 'The internal audit activity must evaluate and contribute to the improvement of the organization\'s governance, risk management, and control processes using a systematic, disciplined, and risk-based approach. Internal audit credibility and value are enhanced when auditors are proactive and their evaluations offer new insights and consider future impact.',
    keyPoints: [
      'Evaluate AND contribute to improvement',
      'Three focus areas: Governance, Risk Management, Controls',
      'Systematic, disciplined, risk-based approach',
      'Proactive evaluations enhance value',
      'Consider future impact, not just current state',
    ],
    examTips: [
      'GRC = Governance, Risk, Control - the core focus',
      'Both evaluate and improve (not just assess)',
      'Proactive approach adds credibility',
    ],
    relatedStandards: ['2110', '2120', '2130'],
    examWeight: 'high',
  },

  // 2110 - Governance
  {
    id: 'std-2110',
    number: '2110',
    title: 'Governance',
    category: 'performance',
    subcategory: 'Nature of Work',
    text: 'The internal audit activity must assess and make appropriate recommendations to improve the organization\'s governance processes for: making strategic and operational decisions; overseeing risk management and control; promoting appropriate ethics and values within the organization; ensuring effective organizational performance management and accountability; communicating risk and control information to appropriate areas of the organization; and coordinating the activities of, and communicating information among, the board, external and internal auditors, other assurance providers, and management.',
    keyPoints: [
      'Assess governance processes',
      'Make improvement recommendations',
      'Six governance areas to evaluate',
      'Strategic and operational decisions',
      'Risk management and control oversight',
      'Ethics and values promotion',
      'Performance management and accountability',
      'Risk and control communication',
      'Coordination of assurance activities',
    ],
    examTips: [
      'Know the SIX governance areas',
      'Ethics is specifically included in governance',
      'Coordination among assurance providers is governance',
    ],
    relatedStandards: ['2100', '2110.A1', '2110.A2'],
    examWeight: 'high',
  },

  // 2120 - Risk Management
  {
    id: 'std-2120',
    number: '2120',
    title: 'Risk Management',
    category: 'performance',
    subcategory: 'Nature of Work',
    text: 'The internal audit activity must evaluate the effectiveness and contribute to the improvement of risk management processes.',
    interpretation: 'Determining whether risk management processes are effective is a judgment resulting from the internal auditor\'s assessment that: Organizational objectives support and align with the organization\'s mission; Significant risks are identified and assessed; Appropriate risk responses are selected that align risks with the organization\'s risk appetite; and Relevant risk information is captured and communicated in a timely manner across the organization, enabling staff, management, and the board to carry out their responsibilities.',
    keyPoints: [
      'Evaluate effectiveness of risk management',
      'Contribute to improvement',
      'Four criteria for effective risk management:',
      '1. Objectives align with mission',
      '2. Significant risks identified and assessed',
      '3. Appropriate risk responses selected',
      '4. Risk information communicated timely',
      'Risk appetite alignment is key',
    ],
    examTips: [
      'Know the four criteria for effective risk management',
      'Risk APPETITE is specifically mentioned',
      'Both evaluate AND contribute to improvement',
    ],
    relatedStandards: ['2100', '2120.A1', '2120.A2', '2120.C1', '2120.C2', '2120.C3'],
    examWeight: 'high',
  },

  // 2130 - Control
  {
    id: 'std-2130',
    number: '2130',
    title: 'Control',
    category: 'performance',
    subcategory: 'Nature of Work',
    text: 'The internal audit activity must assist the organization in maintaining effective controls by evaluating their effectiveness and efficiency and by promoting continuous improvement.',
    interpretation: 'The internal audit activity must evaluate the adequacy and effectiveness of controls in responding to risks within the organization\'s governance, operations, and information systems regarding the: Achievement of the organization\'s strategic objectives; Reliability and integrity of financial and operational information; Effectiveness and efficiency of operations and programs; Safeguarding of assets; and Compliance with laws, regulations, policies, procedures, and contracts.',
    keyPoints: [
      'Assist in maintaining effective controls',
      'Evaluate effectiveness AND efficiency',
      'Promote continuous improvement',
      'Five control objectives to evaluate:',
      '1. Strategic objectives achievement',
      '2. Reliability/integrity of information',
      '3. Effectiveness/efficiency of operations',
      '4. Safeguarding of assets',
      '5. Compliance with laws, regulations, policies',
    ],
    examTips: [
      'Know the FIVE control objectives',
      'Mirrors COSO objectives',
      'Both effectiveness and efficiency',
    ],
    relatedStandards: ['2100', '2130.A1', '2130.C1'],
    examWeight: 'high',
  },

  // 2200 - Engagement Planning
  {
    id: 'std-2200',
    number: '2200',
    title: 'Engagement Planning',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Internal auditors must develop and document a plan for each engagement, including the engagement\'s objectives, scope, timing, and resource allocations. The plan must consider the organization\'s strategies, objectives, and risks relevant to the engagement.',
    keyPoints: [
      'Plan for EACH engagement',
      'Plan must be documented',
      'Four elements: objectives, scope, timing, resources',
      'Consider organization\'s strategies, objectives, risks',
    ],
    examTips: [
      'Planning is required for EVERY engagement',
      'Documentation is mandatory',
      'Link to organizational context',
    ],
    relatedStandards: ['2201', '2210', '2220', '2230', '2240'],
    examWeight: 'high',
  },

  // 2201 - Planning Considerations
  {
    id: 'std-2201',
    number: '2201',
    title: 'Planning Considerations',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'In planning the engagement, internal auditors must consider: The strategies and objectives of the activity being reviewed and the means by which the activity controls its performance; The significant risks to the activity\'s objectives, resources, and operations and the means by which the potential impact of risk is kept to an acceptable level; The adequacy and effectiveness of the activity\'s governance, risk management, and control processes compared to a relevant framework or model; and The opportunities for making significant improvements to the activity\'s governance, risk management, and control processes.',
    keyPoints: [
      'Consider strategies and objectives of auditee',
      'Consider how activity controls performance',
      'Identify significant risks',
      'Evaluate how risks are managed',
      'Compare processes to frameworks/models',
      'Identify improvement opportunities',
    ],
    examTips: [
      'Planning looks at AUDITEE\'s perspective first',
      'Use relevant frameworks for comparison',
      'Improvement opportunities are part of planning',
    ],
    relatedStandards: ['2200', '2210'],
    examWeight: 'medium',
  },

  // 2210 - Engagement Objectives
  {
    id: 'std-2210',
    number: '2210',
    title: 'Engagement Objectives',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Objectives must be established for each engagement.',
    interpretation: 'Internal auditors must conduct a preliminary assessment of the risks relevant to the activity under review. Engagement objectives must reflect the results of this assessment. Internal auditors must consider the probability of significant errors, fraud, noncompliance, and other exposures when developing the engagement objectives. Adequate criteria are needed to evaluate governance, risk management, and controls. Internal auditors must ascertain the extent to which management and/or the board has established adequate criteria to determine whether objectives and goals have been accomplished. If adequate, internal auditors must use such criteria in their evaluation. If inadequate, internal auditors must identify appropriate evaluation criteria through discussion with management and/or the board.',
    keyPoints: [
      'Objectives for EACH engagement',
      'Based on preliminary risk assessment',
      'Consider probability of errors, fraud, noncompliance',
      'Adequate criteria needed for evaluation',
      'Use management\'s criteria if adequate',
      'Develop criteria if management\'s are inadequate',
    ],
    examTips: [
      'Preliminary risk assessment comes BEFORE setting objectives',
      'Criteria must be established - use management\'s if adequate',
      'Fraud is specifically considered',
    ],
    relatedStandards: ['2200', '2210.A1', '2210.A2', '2210.A3', '2210.C1'],
    examWeight: 'high',
  },

  // 2220 - Engagement Scope
  {
    id: 'std-2220',
    number: '2220',
    title: 'Engagement Scope',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'The established scope must be sufficient to achieve the objectives of the engagement.',
    interpretation: 'The scope of the engagement must include consideration of relevant systems, records, personnel, and physical properties, including those under the control of third parties.',
    keyPoints: [
      'Scope must be sufficient for objectives',
      'Consider systems, records, personnel, properties',
      'Include items under third-party control',
      'Scope supports objective achievement',
    ],
    examTips: [
      'Scope is driven by objectives',
      'Third-party items are IN scope if relevant',
    ],
    relatedStandards: ['2200', '2210', '2220.A1', '2220.A2', '2220.C1'],
    examWeight: 'medium',
  },

  // 2230 - Engagement Resource Allocation
  {
    id: 'std-2230',
    number: '2230',
    title: 'Engagement Resource Allocation',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Internal auditors must determine appropriate and sufficient resources to achieve engagement objectives based on an evaluation of the nature and complexity of each engagement, time constraints, and available resources.',
    keyPoints: [
      'Determine appropriate AND sufficient resources',
      'Based on nature and complexity',
      'Consider time constraints',
      'Consider available resources',
      'Resource allocation per engagement',
    ],
    examTips: [
      'Nature and complexity drive resource needs',
      'Time and resource constraints are factors',
      'Connects to 2030 Resource Management',
    ],
    relatedStandards: ['2030', '2200'],
    examWeight: 'medium',
  },

  // 2240 - Engagement Work Program
  {
    id: 'std-2240',
    number: '2240',
    title: 'Engagement Work Program',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Internal auditors must develop and document work programs that achieve the engagement objectives.',
    interpretation: 'Work programs must include the procedures for identifying, analyzing, evaluating, and documenting information during the engagement. The work program must be approved prior to its implementation, and any adjustments approved promptly.',
    keyPoints: [
      'Develop AND document work programs',
      'Must achieve engagement objectives',
      'Include procedures for information handling',
      'Identify, analyze, evaluate, document',
      'Approve BEFORE implementation',
      'Adjustments need prompt approval',
    ],
    examTips: [
      'Work program must be APPROVED before fieldwork',
      'Changes need approval too',
      'Work program = detailed procedures',
    ],
    relatedStandards: ['2200', '2240.A1', '2240.C1'],
    examWeight: 'medium',
  },

  // 2300 - Performing the Engagement
  {
    id: 'std-2300',
    number: '2300',
    title: 'Performing the Engagement',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Internal auditors must identify, analyze, evaluate, and document sufficient information to achieve the engagement\'s objectives.',
    keyPoints: [
      'Four activities: identify, analyze, evaluate, document',
      'Information must be sufficient',
      'Goal is achieving engagement objectives',
    ],
    examTips: [
      'Know the four activities in performing',
      'Sufficiency is the key standard for information',
    ],
    relatedStandards: ['2310', '2320', '2330', '2340'],
    examWeight: 'high',
  },

  // 2310 - Identifying Information
  {
    id: 'std-2310',
    number: '2310',
    title: 'Identifying Information',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Internal auditors must identify sufficient, reliable, relevant, and useful information to achieve the engagement\'s objectives.',
    interpretation: 'Sufficient information is factual, adequate, and convincing so that a prudent, informed person would reach the same conclusions as the auditor. Reliable information is the best attainable information through the use of appropriate engagement techniques. Relevant information supports engagement observations and recommendations and is consistent with the objectives for the engagement. Useful information helps the organization meet its goals.',
    keyPoints: [
      'Four qualities: sufficient, reliable, relevant, useful',
      'Sufficient = factual, adequate, convincing',
      'Reliable = best attainable through proper techniques',
      'Relevant = supports observations and recommendations',
      'Useful = helps organization meet goals',
    ],
    examTips: [
      'Know the FOUR qualities of information',
      'Be able to define each quality',
      'Commonly tested topic',
    ],
    relatedStandards: ['2300', '2320'],
    examWeight: 'high',
  },

  // 2320 - Analysis and Evaluation
  {
    id: 'std-2320',
    number: '2320',
    title: 'Analysis and Evaluation',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Internal auditors must base conclusions and engagement results on appropriate analyses and evaluations.',
    keyPoints: [
      'Conclusions based on analysis',
      'Engagement results based on evaluation',
      'Analyses must be appropriate',
      'Support for findings required',
    ],
    examTips: [
      'Conclusions must be SUPPORTED by analysis',
      'Can\'t jump to conclusions without proper evaluation',
    ],
    relatedStandards: ['2300', '2310', '2330'],
    examWeight: 'medium',
  },

  // 2330 - Documenting Information
  {
    id: 'std-2330',
    number: '2330',
    title: 'Documenting Information',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Internal auditors must document information that is sufficient, reliable, relevant, and useful to support the engagement results.',
    interpretation: 'The chief audit executive must control access to engagement records. The chief audit executive must obtain the approval of senior management and/or legal counsel prior to releasing such records to external parties, as appropriate. The chief audit executive must develop retention requirements for engagement records, regardless of the medium in which each record is stored. These retention requirements must be consistent with the organization\'s guidelines and any pertinent regulatory or other requirements.',
    keyPoints: [
      'Document information meeting four qualities',
      'Sufficient, reliable, relevant, useful',
      'CAE controls access to records',
      'Approval needed to release to external parties',
      'Develop retention requirements',
      'Consistent with guidelines and regulations',
    ],
    examTips: [
      'CAE controls access to engagement records',
      'Retention requirements are CAE responsibility',
      'External release needs approval',
    ],
    relatedStandards: ['2300', '2330.A1', '2330.A2', '2330.C1'],
    examWeight: 'medium',
  },

  // 2340 - Engagement Supervision
  {
    id: 'std-2340',
    number: '2340',
    title: 'Engagement Supervision',
    category: 'performance',
    subcategory: 'Engagement',
    text: 'Engagements must be properly supervised to ensure objectives are achieved, quality is assured, and staff is developed.',
    interpretation: 'The extent of supervision required will depend on the proficiency and experience of internal auditors and the complexity of the engagement. The chief audit executive has overall responsibility for supervising the engagement, whether performed by or for the internal audit activity, but may designate appropriately experienced members of the internal audit activity to perform the review. Appropriate evidence of supervision is documented and retained.',
    keyPoints: [
      'Proper supervision required',
      'Three purposes: achieve objectives, assure quality, develop staff',
      'Extent depends on experience and complexity',
      'CAE has overall responsibility',
      'Can delegate to experienced members',
      'Document evidence of supervision',
    ],
    examTips: [
      'Know the THREE purposes of supervision',
      'CAE has overall responsibility even if delegated',
      'Supervision must be documented',
    ],
    relatedStandards: ['2300'],
    examWeight: 'medium',
  },

  // 2400 - Communicating Results
  {
    id: 'std-2400',
    number: '2400',
    title: 'Communicating Results',
    category: 'performance',
    subcategory: 'Communicating',
    text: 'Internal auditors must communicate the results of engagements.',
    keyPoints: [
      'Communication of results is mandatory',
      'Foundation standard for 2400 series',
    ],
    examTips: [
      'Results must be communicated - no silent audits',
    ],
    relatedStandards: ['2410', '2420', '2421', '2430', '2431', '2440', '2450'],
    examWeight: 'high',
  },

  // 2410 - Criteria for Communicating
  {
    id: 'std-2410',
    number: '2410',
    title: 'Criteria for Communicating',
    category: 'performance',
    subcategory: 'Communicating',
    text: 'Communications must include the engagement\'s objectives, scope, and results.',
    interpretation: 'Final engagement communication may include applicable conclusions, recommendations, and action plans. Where appropriate, the internal auditors\' opinion should be provided. An opinion must be supported by sufficient, reliable, relevant, and useful information.',
    keyPoints: [
      'Must include: objectives, scope, results',
      'May include: conclusions, recommendations, action plans',
      'Opinions where appropriate',
      'Opinions must be supported by proper information',
    ],
    examTips: [
      'MUST include objectives, scope, results',
      'MAY include conclusions, recommendations, action plans',
      'Opinions need support',
    ],
    relatedStandards: ['2400', '2410.A1', '2410.A2', '2410.A3', '2410.C1'],
    examWeight: 'high',
  },

  // 2420 - Quality of Communications
  {
    id: 'std-2420',
    number: '2420',
    title: 'Quality of Communications',
    category: 'performance',
    subcategory: 'Communicating',
    text: 'Communications must be accurate, objective, clear, concise, constructive, complete, and timely.',
    interpretation: 'Accurate communications are free from errors and distortions and are faithful to the underlying facts. Objective communications are fair, impartial, and unbiased and are the result of a fair-minded and balanced assessment of all relevant facts and circumstances. Clear communications are easily understood and logical, avoiding unnecessary technical language and providing all significant and relevant information. Concise communications are to the point and avoid unnecessary elaboration, superfluous detail, redundancy, and wordiness. Constructive communications are helpful to the engagement client and the organization and lead to improvements where needed. Complete communications lack nothing that is essential to the target audience and include all significant and relevant information and observations to support recommendations and conclusions. Timely communications are opportune and expedient, depending on the significance of the issue, allowing management to take appropriate corrective action.',
    keyPoints: [
      'Seven qualities: accurate, objective, clear, concise, constructive, complete, timely',
      'Accurate = free from errors, faithful to facts',
      'Objective = fair, impartial, unbiased',
      'Clear = easily understood, logical',
      'Concise = to the point',
      'Constructive = helpful, leads to improvements',
      'Complete = lacks nothing essential',
      'Timely = opportune, allows corrective action',
    ],
    examTips: [
      'Know all SEVEN qualities and definitions',
      'Very commonly tested',
      'Memorize: Accurate, Objective, Clear, Concise, Constructive, Complete, Timely',
    ],
    relatedStandards: ['2400', '2410'],
    examWeight: 'high',
  },

  // 2421 - Errors and Omissions
  {
    id: 'std-2421',
    number: '2421',
    title: 'Errors and Omissions',
    category: 'performance',
    subcategory: 'Communicating',
    text: 'If a final communication contains a significant error or omission, the chief audit executive must communicate corrected information to all parties who received the original communication.',
    keyPoints: [
      'Correct significant errors or omissions',
      'Communicate corrections to all original recipients',
      'CAE responsibility',
    ],
    examTips: [
      'All original recipients must receive correction',
      'Only SIGNIFICANT errors trigger this',
    ],
    relatedStandards: ['2400', '2420'],
    examWeight: 'low',
  },

  // 2430 - Use of "Conducted in Conformance"
  {
    id: 'std-2430',
    number: '2430',
    title: 'Use of "Conducted in Conformance with the International Standards for the Professional Practice of Internal Auditing"',
    category: 'performance',
    subcategory: 'Communicating',
    text: 'Indicating that engagements are "conducted in conformance with the International Standards for the Professional Practice of Internal Auditing" is appropriate only if the results of the quality assurance and improvement program support the statement.',
    keyPoints: [
      'Can only claim conformance if QAIP supports it',
      'Applies to individual engagement communications',
      'Evidence-based claim',
    ],
    examTips: [
      'Same principle as 1321 but for engagements',
      'QAIP results must support the claim',
    ],
    relatedStandards: ['1300', '1321'],
    examWeight: 'medium',
  },

  // 2431 - Engagement Disclosure of Nonconformance
  {
    id: 'std-2431',
    number: '2431',
    title: 'Engagement Disclosure of Nonconformance',
    category: 'performance',
    subcategory: 'Communicating',
    text: 'When nonconformance with the Code of Ethics or the Standards impacts a specific engagement, communication of the results must disclose the: Principle or rule of conduct of the Code of Ethics or Standard(s) with which full conformance was not achieved; Reason(s) for nonconformance; and Impact of nonconformance on the engagement and the communicated engagement results.',
    keyPoints: [
      'Disclose nonconformance affecting engagement',
      'State which principle/standard not met',
      'Explain reasons for nonconformance',
      'Describe impact on engagement and results',
    ],
    examTips: [
      'Three things to disclose: what, why, impact',
      'Transparency about limitations',
    ],
    relatedStandards: ['1322', '2400', '2430'],
    examWeight: 'medium',
  },

  // 2440 - Disseminating Results
  {
    id: 'std-2440',
    number: '2440',
    title: 'Disseminating Results',
    category: 'performance',
    subcategory: 'Communicating',
    text: 'The chief audit executive must communicate results to the appropriate parties.',
    interpretation: 'The chief audit executive or designee reviews and approves the final engagement communication before issuance and decides to whom and how it will be disseminated. When the chief audit executive delegates these duties, he or she retains overall responsibility.',
    keyPoints: [
      'CAE communicates to appropriate parties',
      'CAE or designee reviews and approves',
      'Decide recipients and method',
      'CAE retains overall responsibility if delegated',
    ],
    examTips: [
      'CAE approves final communication',
      'Delegation doesn\'t remove responsibility',
    ],
    relatedStandards: ['2400', '2440.A1', '2440.A2', '2440.C1', '2440.C2'],
    examWeight: 'medium',
  },

  // 2450 - Overall Opinions
  {
    id: 'std-2450',
    number: '2450',
    title: 'Overall Opinions',
    category: 'performance',
    subcategory: 'Communicating',
    text: 'When an overall opinion is issued, it must take into account the strategies, objectives, and risks of the organization and the expectations of senior management, the board, and other stakeholders. The overall opinion must be supported by sufficient, reliable, relevant, and useful information.',
    interpretation: 'The communication will identify: The scope, including the time period to which the opinion pertains; Scope limitations; Consideration of all related projects, including the reliance on other assurance providers; A summary of the information that supports the opinion; The risk or control framework or other criteria used as a basis for the overall opinion; and The overall opinion, judgment, or conclusion reached.',
    keyPoints: [
      'Overall opinion considers organization context',
      'Must be supported by proper information',
      'Identify scope and time period',
      'Note scope limitations',
      'Consider reliance on others',
      'Summarize supporting information',
      'State framework used',
      'Provide the overall conclusion',
    ],
    examTips: [
      'Overall opinion is a big-picture assessment',
      'Must be evidence-based',
      'Know what to include in communication',
    ],
    relatedStandards: ['2400', '2410'],
    examWeight: 'medium',
  },

  // 2500 - Monitoring Progress
  {
    id: 'std-2500',
    number: '2500',
    title: 'Monitoring Progress',
    category: 'performance',
    subcategory: 'Monitoring',
    text: 'The chief audit executive must establish and maintain a system to monitor the disposition of results communicated to management.',
    interpretation: 'The chief audit executive must establish a follow-up process to monitor and ensure that management actions have been effectively implemented or that senior management has accepted the risk of not taking action.',
    keyPoints: [
      'CAE establishes monitoring system',
      'Track disposition of results',
      'Follow-up process required',
      'Ensure management actions implemented',
      'OR confirm risk acceptance if no action',
    ],
    examTips: [
      'Follow-up is CAE responsibility',
      'Management can accept risk instead of acting',
      'Monitor disposition, not just recommendations',
    ],
    relatedStandards: ['2500.A1', '2500.C1', '2600'],
    examWeight: 'high',
  },

  // 2600 - Communicating the Acceptance of Risks
  {
    id: 'std-2600',
    number: '2600',
    title: 'Communicating the Acceptance of Risks',
    category: 'performance',
    subcategory: 'Monitoring',
    text: 'When the chief audit executive concludes that management has accepted a level of risk that may be unacceptable to the organization, the chief audit executive must discuss the matter with senior management. If the chief audit executive determines that the matter has not been resolved, the chief audit executive must communicate the matter to the board.',
    interpretation: 'The identification of risk accepted by management may be observed through an assurance or consulting engagement, monitoring progress on actions taken by management as a result of prior engagements, or other means. It is not the responsibility of the chief audit executive to resolve the risk.',
    keyPoints: [
      'CAE identifies unacceptable risk acceptance',
      'First discuss with senior management',
      'If unresolved, communicate to board',
      'Risk may be identified various ways',
      'CAE doesn\'t resolve the risk, but escalates',
    ],
    examTips: [
      'Escalation path: Senior Management → Board',
      'CAE role is to communicate, not resolve',
      'This is about UNACCEPTABLE risk to organization',
    ],
    relatedStandards: ['2060', '2500'],
    examWeight: 'high',
  },
];

export default PERFORMANCE_STANDARDS;
