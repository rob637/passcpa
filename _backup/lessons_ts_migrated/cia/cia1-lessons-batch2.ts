/**
 * CIA Part 1: Essentials of Internal Auditing - Batch 2
 * Additional lessons for Part 1 domains
 * 
 * Note: CIA1-I-027 (Charter Development) removed - duplicate of CIA1-I-005
 */

import { Lesson } from '../../../types';

export const cia1LessonsBatch2: Lesson[] = [
  // ============================================================================
  // DOMAIN I: FOUNDATIONS OF INTERNAL AUDITING - Additional Lessons
  // ============================================================================
  {
    id: 'CIA1-I-028',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Internal Audit and External Audit Coordination',
    description: 'Understand the relationship between internal and external auditors and how to maximize coordination',
    order: 28,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Coordination', 'Reliance', 'Communication', 'Avoiding duplication'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Benefits of Coordination',
          type: 'text',
          content: "**Why coordinate with external auditors?**\n\n• Minimize duplication of effort\n• Ensure comprehensive audit coverage\n• Share knowledge and insights\n• Reduce costs and time\n• Align risk assessments\n\n**The CAE should establish regular communication channels including:**\n• Initial planning meetings\n• Periodic status updates\n• Sharing of audit plans and reports\n• Discussion of findings",
        },
        {
          title: 'Areas of Cooperation',
          type: 'table',
          headers: ['Area', 'How to Coordinate'],
          rows: [
            ['Audit planning', 'Share audit plans; identify overlaps'],
            ['Risk assessment', 'Exchange risk perspectives'],
            ['Audit procedures', 'Avoid duplicating same tests'],
            ['Workpapers', 'Provide access when appropriate'],
            ['Findings', 'Share relevant findings'],
            ['Follow-up', 'Coordinate on management remediation'],
          ],
        },
        {
          title: 'Professional Skepticism Reminder',
          type: 'callout',
          content: 'While coordination is valuable, internal audit must maintain independence. Coordination does not mean external audit oversees or directs internal audit work.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Coordination reduces duplication and improves coverage',
            'CAE should establish communication protocols',
            'Both parties benefit from sharing risk perspectives',
            'Independence of internal audit must be maintained',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-I-029',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Types of Internal Audit Engagements',
    description: 'Explore the various types of audit engagements performed by internal audit functions',
    order: 29,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Operational audit', 'Compliance audit', 'Financial audit', 'IT audit', 'Fraud audit'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Major Engagement Types',
          type: 'text',
          content: "**1. Operational Audits**\n• Evaluate efficiency and effectiveness of operations\n• Focus on processes and outcomes\n• Often include recommendations for improvement\n\n**2. Compliance Audits**\n• Verify adherence to laws, regulations, policies\n• Often required by external parties\n• Includes regulatory compliance assessments\n\n**3. Financial Audits**\n• Examine reliability of financial information\n• Test internal controls over financial reporting\n• May support external audit reliance\n\n**4. IT/IS Audits**\n• Evaluate technology infrastructure and applications\n• Include cybersecurity assessments\n• Test IT general and application controls\n\n**5. Fraud Investigations**\n• Respond to suspected fraud\n• Gather and preserve evidence\n• Support management and legal actions",
        },
        {
          title: 'Engagement Selection',
          type: 'text',
          content: "**How are engagements selected?**\n\n• Risk-based audit planning\n• Management requests\n• Board and audit committee priorities\n• Regulatory requirements\n• Historical findings and trends\n• Organizational changes",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Internal audit performs diverse engagement types',
            'Risk assessment drives engagement selection',
            'Each type has specific objectives and methods',
            'Specialization may be needed for IT and fraud audits',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN II: INDEPENDENCE AND OBJECTIVITY - Additional Lessons
  // ============================================================================
  {
    id: 'CIA1-II-030',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Managing Impairments to Independence',
    description: 'Learn how to identify, assess, and manage threats to internal audit independence',
    order: 30,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Independence threats', 'Impairments', 'Safeguards', 'Disclosure'],
    blueprintArea: 'CIA1-II',
    content: {
      sections: [
        {
          title: 'Types of Independence Threats',
          type: 'text',
          content: "**Self-Interest Threats**\n• Financial interests in auditee\n• Compensation tied to audit outcomes\n• Close personal relationships\n\n**Self-Review Threats**\n• Auditing own prior work\n• Implementing then auditing controls\n• Reviewing recommended controls implemented\n\n**Familiarity Threats**\n• Long association with auditee\n• Close relationships with auditee management\n• Accepting gifts from auditees\n\n**Intimidation Threats**\n• Pressure to alter findings\n• Threats to career or position\n• Auditee attempts to limit scope",
        },
        {
          title: 'Safeguards',
          type: 'text',
          content: "**Organizational Safeguards:**\n• Functional reporting to board\n• Rotation of audit staff\n• Multiple levels of review\n• Independent quality assessments\n\n**Individual Safeguards:**\n• Professional skepticism\n• Disclosure of potential impairments\n• Removal from engagement\n• Seeking advice from CAE or others",
        },
        {
          title: 'When Impairment Exists',
          type: 'callout',
          content: 'If impairment cannot be mitigated, the internal auditor must not perform the engagement. The impairment must be disclosed to appropriate parties.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Four main threat types: self-interest, self-review, familiarity, intimidation',
            'Safeguards can mitigate many threats',
            'Disclosure is required when threats exist',
            'Recusal may be necessary when threats cannot be mitigated',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-II-031',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Reporting Relationships and Organizational Status',
    description: 'Understand optimal reporting relationships for internal audit independence',
    order: 31,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Functional reporting', 'Administrative reporting', 'Board relationship', 'CAE position'],
    blueprintArea: 'CIA1-II',
    content: {
      sections: [
        {
          title: 'Dual Reporting Structure',
          type: 'text',
          content: "**Functional Reporting (to the Board)**\n• Approval of audit charter\n• Approval of risk-based audit plan\n• Approval of CAE compensation\n• CAE appointment and removal\n• Review of audit results\n\n**Administrative Reporting (to Senior Management)**\n• Day-to-day operations\n• Budget and resources\n• HR and administrative matters\n• Coordination with operations",
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Functional reporting to the board protects internal audit from management interference and ensures internal audit can report objectively on management activities.',
        },
        {
          title: 'CAE Position and Access',
          type: 'text',
          content: "**CAE Must Have:**\n• Direct and unrestricted access to the board chair\n• Free and unfettered access to all information needed\n• Ability to communicate directly and confidentially with the board\n• Position that supports organizational independence\n\n**Best Practice:**\nThe CAE should attend audit committee meetings, meet privately with the committee, and have a direct communication channel.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Functional reporting to board protects independence',
            'Administrative reporting to management for operations',
            'CAE needs unrestricted access to information and the board',
            'Dual reporting is standard best practice',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN III: PROFICIENCY AND DUE PROFESSIONAL CARE - Additional Lessons
  // ============================================================================
  {
    id: 'CIA1-III-032',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Continuing Professional Development',
    description: 'Understand requirements and strategies for maintaining audit competence',
    order: 32,
    duration: 30,
    difficulty: 'beginner',
    topics: ['CPE requirements', 'Skills development', 'Competency framework', 'Training'],
    blueprintArea: 'CIA1-III',
    content: {
      sections: [
        {
          title: 'CPE Requirements',
          type: 'text',
          content: "**IIA CPE Requirements for CIAs:**\n• 40 hours annually (minimum)\n• 120 hours over 3-year certification period\n• Ethics training requirements\n• Activities must enhance professional competence\n\n**Qualifying Activities:**\n• Formal training and courses\n• Conferences and seminars\n• Self-study programs\n• Publishing articles\n• Speaking engagements\n• Professional service",
        },
        {
          title: 'Competency Areas',
          type: 'text',
          content: "**Key Competencies to Develop:**\n\n**Technical Competence:**\n• Audit methodology\n• Risk assessment\n• Control evaluation\n• Industry knowledge\n\n**Professional Competence:**\n• Communication skills\n• Critical thinking\n• Relationship management\n• Leadership\n\n**Business Competence:**\n• Industry knowledge\n• Business acumen\n• Technology understanding\n• Organizational awareness",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '40 CPE hours annually for CIAs',
            'Multiple activities can qualify for CPE',
            'Competence spans technical, professional, and business skills',
            'Development is an ongoing professional obligation',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-III-033',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Due Professional Care Standards',
    description: 'Learn what due professional care means and how to demonstrate it',
    order: 33,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Due care', 'Professional judgment', 'Reasonable assurance', 'Care considerations'],
    blueprintArea: 'CIA1-III',
    content: {
      sections: [
        {
          title: 'Definition of Due Professional Care',
          type: 'text',
          content: "**Due professional care** is the care and skill expected from a reasonably prudent and competent internal auditor.\n\n**Key Aspects:**\n• Apply knowledge, skills, and experience needed\n• Exercise professional skepticism\n• Consider probability of significant errors, fraud, or noncompliance\n• Be alert to significant risks\n• Consider expectations of senior management and the board",
        },
        {
          title: 'What Due Care Requires',
          type: 'text',
          content: "**During Planning:**\n• Adequate scope determination\n• Proper risk assessment\n• Sufficient resource allocation\n\n**During Fieldwork:**\n• Appropriate audit procedures\n• Sufficient evidence gathering\n• Proper documentation\n\n**During Reporting:**\n• Accurate conclusions\n• Supportable recommendations\n• Timely communication",
        },
        {
          title: 'Important Distinction',
          type: 'callout',
          content: 'Due professional care does not guarantee infallibility. Internal auditors are not expected to find all fraud or errors, but they must apply the care a prudent professional would apply.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Due care = care of a prudent, competent auditor',
            'Applies throughout the engagement lifecycle',
            'Requires professional skepticism',
            'Does not guarantee detection of all issues',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN IV: QUALITY ASSURANCE - Additional Lessons
  // ============================================================================
  {
    id: 'CIA1-IV-034',
    courseId: 'cia',
    section: 'CIA1',
    title: 'External Quality Assessments',
    description: 'Understand the requirements and process for external quality assessments',
    order: 34,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['External assessment', 'Self-assessment with validation', 'EQA frequency', 'Assessor qualifications'],
    blueprintArea: 'CIA1-IV',
    content: {
      sections: [
        {
          title: 'EQA Requirement',
          type: 'text',
          content: "**External Quality Assessment (EQA) Requirements:**\n\n• Required at least once every **5 years**\n• Must be conducted by qualified, independent assessor\n• May be full external assessment OR self-assessment with independent external validation (SAIV)\n• Results reported to the board",
        },
        {
          title: 'EQA Options',
          type: 'table',
          headers: ['Option', 'Description', 'When Appropriate'],
          rows: [
            ['Full External Assessment', 'External team conducts entire assessment', 'First EQA; significant concerns'],
            ['Self-Assessment with Validation', 'Internal team performs assessment; external validates', 'Mature internal audit function'],
          ],
        },
        {
          title: 'Assessor Qualifications',
          type: 'text',
          content: "**External assessors must:**\n• Be competent in internal auditing\n• Have knowledge of the Standards\n• Understand industry-specific considerations\n• Be independent of the organization\n\n**Independence means:**\n• No conflict of interest\n• Not part of the organization\n• No financial interest in outcomes",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'EQA required at least every 5 years',
            'Full assessment or SAIV options available',
            'Assessor must be qualified and independent',
            'Results must be reported to the board',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-IV-035',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Reporting Quality Assessment Results',
    description: 'Learn how to report QAIP results and communicate conformance status',
    order: 35,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Conformance reporting', 'Nonconformance disclosure', 'Board reporting', 'Improvement plans'],
    blueprintArea: 'CIA1-IV',
    content: {
      sections: [
        {
          title: 'Conformance Statements',
          type: 'text',
          content: "**When IA Function Conforms:**\n• CAE may state 'conforms with International Standards for the Professional Practice of Internal Auditing'\n• Use in reports, presentations, and communications\n• Requires ongoing internal assessments + periodic external assessment\n\n**Three Conformance Conclusions:**\n1. **Generally Conforms** - Policies and practices exist and are generally applied\n2. **Partially Conforms** - Deficiencies noted but not severe enough for non-conformance\n3. **Does Not Conform** - Significant deficiencies exist",
        },
        {
          title: 'Reporting Nonconformance',
          type: 'callout',
          content: 'If nonconformance impacts overall scope or operation of internal audit, CAE must disclose this to senior management and the board, along with the impact.',
        },
        {
          title: 'Improvement Action Plans',
          type: 'text',
          content: "**When issues are identified:**\n• Develop action plans for improvement\n• Assign responsibility and deadlines\n• Monitor progress toward resolution\n• Report status to board\n• Consider root cause analysis",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Conformance statement requires assessment support',
            'Three levels: Generally Conforms, Partially, Does Not Conform',
            'Nonconformance must be disclosed to the board',
            'Action plans address identified deficiencies',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN V: GOVERNANCE, RISK, AND CONTROL - Additional Lessons
  // ============================================================================
  {
    id: 'CIA1-V-036',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Enterprise Risk Management Frameworks',
    description: 'Compare and understand major ERM frameworks and their application',
    order: 36,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['COSO ERM', 'ISO 31000', 'ERM components', 'Risk appetite'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'COSO ERM Framework',
          type: 'text',
          content: "**COSO ERM (2017 Update):**\n\n**Five Components:**\n1. **Governance & Culture** - Board oversight, operating structure, culture\n2. **Strategy & Objective-Setting** - Business context, risk appetite, strategies\n3. **Performance** - Risk identification, assessment, prioritization, response\n4. **Review & Revision** - Substantial change assessment, risk review\n5. **Information, Communication & Reporting** - Leveraging information, reporting on risk\n\n**20 Principles** support these components",
        },
        {
          title: 'ISO 31000',
          type: 'text',
          content: "**ISO 31000 Risk Management:**\n\n**Key Principles:**\n• Integrated into all organizational activities\n• Structured and comprehensive\n• Customized to the organization\n• Inclusive of stakeholders\n• Dynamic and responsive\n• Based on best available information\n• Considers human and cultural factors\n• Supports continual improvement",
        },
        {
          title: 'Risk Appetite and Tolerance',
          type: 'text',
          content: "**Risk Appetite:**\nThe amount of risk the organization is willing to accept in pursuit of objectives.\nSet at the board level; strategic in nature.\n\n**Risk Tolerance:**\nThe acceptable variation from risk appetite.\nMore operational; applied to specific processes or risks.\n\n**Example:**\nRisk appetite: 'We accept moderate market risk'\nRisk tolerance: 'Maximum 5% portfolio value at risk'",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'COSO ERM has 5 components and 20 principles',
            'ISO 31000 provides principle-based risk guidance',
            'Risk appetite is set by the board strategically',
            'Risk tolerance is operational application of appetite',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-V-037',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Control Environment and Soft Controls',
    description: 'Understand the control environment and its role as the foundation of internal control',
    order: 37,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Control environment', 'Tone at the top', 'Ethics', 'Culture'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'What is Control Environment?',
          type: 'text',
          content: "**Control Environment** is the set of standards, processes, and structures that provides the basis for carrying out internal control.\n\n**COSO Control Environment Principles:**\n1. Commitment to integrity and ethical values\n2. Board exercises oversight responsibility\n3. Management establishes structure, authority, responsibility\n4. Commitment to attract and retain competent individuals\n5. Holds individuals accountable for internal control",
        },
        {
          title: 'Tone at the Top',
          type: 'callout',
          content: 'Tone at the top refers to the ethical atmosphere created by leadership. It sets expectations for behavior and significantly influences how controls operate throughout the organization.',
        },
        {
          title: 'Soft Controls',
          type: 'text',
          content: "**Soft controls** are intangible elements that influence behavior:\n\n• Organizational culture\n• Management style\n• Employee morale\n• Trust and integrity\n• Communication patterns\n• Ethical climate\n\n**Why They Matter:**\nSoft controls can override or undermine hard controls. A culture that tolerates shortcuts will weaken even well-designed procedures.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Control environment is the foundation of internal control',
            'Five COSO principles define the control environment',
            'Tone at the top shapes organizational culture',
            'Soft controls significantly influence control effectiveness',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-V-038',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Fraud Risk Fundamentals',
    description: 'Understand fraud concepts and internal audit\'s role in fraud prevention and detection',
    order: 38,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Fraud triangle', 'Fraud types', 'Red flags', 'Prevention and detection'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'The Fraud Triangle',
          type: 'text',
          content: "**Three elements must be present for fraud:**\n\n1. **Pressure/Incentive**\n   • Financial difficulty\n   • Unrealistic performance targets\n   • Personal problems\n\n2. **Opportunity**\n   • Weak internal controls\n   • Inadequate oversight\n   • Access to assets\n\n3. **Rationalization**\n   • 'I deserve it'\n   • 'I'll pay it back'\n   • 'Everyone does it'",
        },
        {
          title: 'Common Fraud Types',
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Asset Misappropriation', 'Theft of cash, inventory, or assets'],
            ['Financial Statement Fraud', 'Overstating revenue, understating expenses'],
            ['Corruption', 'Bribery, kickbacks, conflicts of interest'],
            ['Expense Reimbursement', 'False or inflated expense claims'],
            ['Payroll Fraud', 'Ghost employees, falsified hours'],
          ],
        },
        {
          title: 'Internal Audit\'s Fraud Role',
          type: 'text',
          content: "**Prevention:**\n• Evaluate anti-fraud controls\n• Assess fraud risk in planning\n• Promote fraud awareness\n\n**Detection:**\n• Be alert to red flags\n• Use data analytics\n• Apply professional skepticism\n\n**Investigation:**\n• Support fraud investigations\n• May participate when requested\n• Preserve evidence integrity",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Fraud triangle: Pressure, Opportunity, Rationalization',
            'Asset misappropriation is the most common fraud type',
            'Internal auditors should assess fraud risk in engagements',
            'Professional skepticism helps detect fraud indicators',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-V-039',
    courseId: 'cia',
    section: 'CIA1',
    title: 'IT General Controls',
    description: 'Understand IT general controls and their importance in the control framework',
    order: 39,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['ITGC', 'Access controls', 'Change management', 'Operations controls'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'What are IT General Controls?',
          type: 'text',
          content: "**IT General Controls (ITGCs)** are policies and procedures that support the effective functioning of application controls.\n\nThey provide a **foundation** upon which application controls depend.\n\nIf ITGCs are weak, application controls may be compromised regardless of their design.",
        },
        {
          title: 'ITGC Categories',
          type: 'text',
          content: "**1. Access to Programs and Data**\n• Logical access controls (passwords, authentication)\n• Physical access to IT facilities\n• User access provisioning and removal\n\n**2. Program Change Management**\n• Change request and approval process\n• Testing before implementation\n• Separation of development and production\n\n**3. Computer Operations**\n• Job scheduling and monitoring\n• Backup and recovery procedures\n• Incident management\n\n**4. Program Development**\n• System development lifecycle\n• User acceptance testing\n• Documentation standards",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'ITGCs support the functioning of application controls',
            'Weak ITGCs undermine application control reliability',
            'Key areas: access, changes, operations, development',
            'ITGC testing is fundamental to IT audits',
          ],
        },
      ],
    },
  },
  // Note: CIA1-V-040 (Ethics and Code of Ethics) removed - duplicate of CIA1-I-003
];

export default cia1LessonsBatch2;
