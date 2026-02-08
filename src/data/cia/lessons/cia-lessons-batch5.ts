/**
 * CIA Lessons - Batch 5
 * Final lessons to reach 120+ target
 */

import { Lesson } from '../../../types';

export const ciaLessonsBatch5: Lesson[] = [
  // ============================================================================
  // CIA Part 1 - Additional Topics
  // ============================================================================
  {
    id: 'CIA1-I-049',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Global Internal Audit Standards Overview',
    description: 'Understand the structure of the Global Internal Audit Standards',
    order: 49,
    duration: 35,
    difficulty: 'beginner',
    topics: ['Standards', 'Structure', 'Mandatory guidance'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Standards Structure',
          type: 'text',
          content: '**Global Internal Audit Standards include:**\n\n• **Mission** - Purpose of internal auditing\n• **Core Principles** - Effectiveness requirements\n• **Standards** - Specific requirements\n  - Attribute Standards (quality characteristics)\n  - Performance Standards (nature of activities)\n• **Implementation Guidance** - Supplemental advice',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Standards are mandatory',
            'Principles drive effectiveness',
            'Implementation guidance supports application',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-V-050',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Control Activities',
    description: 'Understand types and classifications of control activities',
    order: 50,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Control activities', 'Preventive', 'Detective', 'Corrective'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'Control Classifications',
          type: 'text',
          content: '**By Timing:**\n• **Preventive** - Stop errors/fraud before occur\n• **Detective** - Find errors/fraud after occur\n• **Corrective** - Fix problems found\n\n**By Nature:**\n• **Manual** - Performed by people\n• **Automated** - Performed by systems\n• **IT-Dependent Manual** - Manual controls relying on IT',
        },
        {
          title: 'Examples',
          type: 'table',
          headers: ['Type', 'Example'],
          rows: [
            ['Preventive', 'Approval before payment'],
            ['Detective', 'Bank reconciliation'],
            ['Corrective', 'Error correction procedure'],
            ['Automated', 'System validation edits'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Controls: preventive, detective, corrective',
            'Also classified as manual, automated, IT-dependent',
            'Mix of control types provides best protection',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-V-051',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Information and Communication (COSO)',
    description: 'Understand the information and communication component of internal control',
    order: 51,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Information', 'Communication', 'COSO component'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'Information and Communication',
          type: 'text',
          content: '**COSO principles for this component:**\n\n• Organization obtains or generates relevant, quality information\n• Organization internally communicates control information\n• Organization communicates externally about matters affecting controls\n\n**Information must be timely, accurate, and accessible.**',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Quality information supports control decisions',
            'Internal and external communication needed',
            'Information flows up, down, and across organization',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-V-052',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Monitoring Activities (COSO)',
    description: 'Understand the monitoring component of internal control',
    order: 52,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Monitoring', 'Ongoing', 'Separate evaluations', 'COSO'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'Monitoring Activities',
          type: 'text',
          content: '**COSO monitoring principles:**\n\n• Organization selects and develops ongoing and/or separate evaluations\n• Organization evaluates and communicates deficiencies\n\n**Ongoing monitoring:**\n• Supervisory review\n• Exception reports\n• Self-assessments\n\n**Separate evaluations:**\n• Internal audits\n• External assessments',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Monitoring: ongoing and separate evaluations',
            'Deficiencies must be communicated timely',
            'Severity determines communication level',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // CIA Part 2 - Additional Topics
  // ============================================================================
  {
    id: 'CIA2-I-040',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Policies and Procedures for IA',
    description: 'Develop and maintain internal audit policies and procedures',
    order: 40,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Audit policies', 'Procedures', 'Audit manual'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'Audit Policies and Procedures',
          type: 'text',
          content: '**Key areas requiring documented guidance:**\n\n• Planning methodology\n• Risk assessment approach\n• Fieldwork procedures\n• Evidence documentation\n• Report writing standards\n• Follow-up processes\n• Quality assurance',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Documented policies ensure consistency',
            'Procedures operationalize policies',
            'Regular updates keep guidance current',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-III-041',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Control Testing Techniques',
    description: 'Apply testing techniques to evaluate control design and operation',
    order: 41,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Control testing', 'Design', 'Operating effectiveness'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Two Aspects of Control Testing',
          type: 'text',
          content: '**Design Effectiveness:**\n• Is the control designed to address the risk?\n• Test through inquiry, observation, documentation review\n\n**Operating Effectiveness:**\n• Is the control working as designed?\n• Test through sampling, re-performance, inspection',
        },
        {
          title: 'Testing Techniques',
          type: 'text',
          content: '**Common testing techniques:**\n• **Inquiry** - Ask questions\n• **Observation** - Watch process\n• **Inspection** - Examine documents\n• **Re-performance** - Redo the control\n• **Confirmation** - Independent verification',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Test design and operating effectiveness separately',
            'Multiple techniques provide stronger evidence',
            're-performance is most conclusive evidence',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-IV-042',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Interim and Final Reporting',
    description: 'Understand when and how to communicate during engagements',
    order: 42,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Interim reporting', 'Final report', 'Communication timing'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Interim Communications',
          type: 'text',
          content: '**When to communicate before final report:**\n\n• Significant issues requiring immediate attention\n• Changes in scope or objectives\n• Preliminary findings requiring validation\n• Resource or timing changes\n\n**Purpose: No surprises; timely action on critical items.**',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Interim reporting addresses urgent matters',
            'Final report is comprehensive communication',
            'Keep stakeholders informed throughout',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // CIA Part 3 - Additional Topics
  // ============================================================================
  {
    id: 'CIA3-I-051',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Industry and Competitive Analysis',
    description: 'Understand the external environment affecting organizations',
    order: 51,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Industry analysis', 'Competition', 'PESTLE', 'Porter forces'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'External Analysis Frameworks',
          type: 'text',
          content: '**PESTLE Analysis:**\n• Political factors\n• Economic conditions\n• Social trends\n• Technological changes\n• Legal requirements\n• Environmental factors\n\n**Porter\'s Five Forces:**\n• Competitive rivalry\n• Supplier power\n• Buyer power\n• Threat of substitutes\n• Threat of new entrants',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'External factors affect organizational risk',
            'PESTLE analyzes macro environment',
            'Five Forces analyzes industry structure',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-II-052',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Mobile and Remote Work Security',
    description: 'Understand security risks of mobile and remote work',
    order: 52,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Mobile security', 'Remote work', 'BYOD', 'VPN'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Mobile/Remote Work Risks',
          type: 'text',
          content: '**Key security risks:**\n\n• Unsecured networks (public WiFi)\n• Lost or stolen devices\n• Data leakage\n• Authentication challenges\n• BYOD control limitations\n• Physical security',
        },
        {
          title: 'Control Considerations',
          type: 'text',
          content: '**Mobile/remote security controls:**\n• Mobile device management (MDM)\n• VPN requirements\n• Multi-factor authentication\n• Encryption requirements\n• Remote wipe capability\n• Acceptable use policies',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Remote work expands attack surface',
            'MDM and VPN are key controls',
            'Policy and training essential',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-III-053',
    courseId: 'cia',
    section: 'CIA3',
    title: 'E-Commerce and Digital Business',
    description: 'Understand e-commerce risks and controls',
    order: 53,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['E-commerce', 'Online transactions', 'Payment security', 'PCI DSS'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'E-Commerce Risks',
          type: 'text',
          content: '**Key e-commerce risks:**\n\n• Payment card fraud\n• Account takeover\n• Denial of service attacks\n• Data breaches\n• Chargebacks\n• Regulatory non-compliance',
        },
        {
          title: 'PCI DSS Requirements',
          type: 'text',
          content: '**Payment Card Industry Data Security Standard:**\n• Build secure network\n• Protect cardholder data\n• Maintain vulnerability management\n• Implement access controls\n• Monitor and test networks\n• Maintain security policy',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'E-commerce introduces unique risks',
            'PCI DSS compliance required for payment cards',
            'Multiple security layers needed',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-IV-054',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Budgeting and Forecasting',
    description: 'Understand budgeting processes and audit considerations',
    order: 54,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Budgeting', 'Forecasting', 'Variance analysis'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Budgeting Approaches',
          type: 'text',
          content: '**Common budgeting methods:**\n\n• **Incremental** - Adjust prior year\n• **Zero-based** - Justify from zero\n• **Activity-based** - Based on activities\n• **Rolling/Continuous** - Updated regularly\n\n**Each has advantages and limitations.**',
        },
        {
          title: 'Audit Considerations',
          type: 'text',
          content: '**Auditing the budget process:**\n• Evaluate budget development process\n• Assess reasonableness of assumptions\n• Test variance analysis and monitoring\n• Review budget approval process\n• Assess budget gaming/manipulation',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Multiple budgeting approaches available',
            'Variance analysis monitors performance',
            'Budget manipulation is a risk to assess',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-I-055',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Human Resources Risk Management',
    description: 'Understand HR-related risks and controls',
    order: 55,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['HR risk', 'Employee lifecycle', 'Background checks', 'Termination'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'HR Risk Areas',
          type: 'text',
          content: '**Key HR risks:**\n\n• Hiring unqualified/unethical employees\n• Inadequate training\n• Compensation/benefits errors\n• Discrimination/harassment\n• Improper terminations\n• Access not terminated promptly',
        },
        {
          title: 'Controls by Lifecycle Stage',
          type: 'text',
          content: '**Hiring:**\n• Background checks, reference verification\n\n**Onboarding:**\n• Training, policy acknowledgment\n\n**Employment:**\n• Performance management, supervision\n\n**Separation:**\n• Exit interview, timely access removal',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'HR risks exist throughout employee lifecycle',
            'Background checks mitigate hiring risk',
            'Prompt access removal is critical at termination',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-II-056',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Incident Response Planning',
    description: 'Understand incident response requirements and audit considerations',
    order: 56,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Incident response', 'Security incidents', 'IR plan'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Incident Response Phases',
          type: 'text',
          content: '**NIST Incident Response Lifecycle:**\n\n1. **Preparation** - Plan, train, equip\n2. **Detection & Analysis** - Identify and assess\n3. **Containment, Eradication, Recovery** - Stop, remove, restore\n4. **Post-Incident Activity** - Lessons learned',
        },
        {
          title: 'IR Plan Elements',
          type: 'text',
          content: '**Effective IR plan includes:**\n• Incident definitions and classification\n• Roles and responsibilities\n• Communication protocols\n• Escalation procedures\n• Evidence preservation\n• External party contacts (legal, law enforcement)',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'IR has defined phases: prep, detect, contain, learn',
            'Plan must exist before incident occurs',
            'Regular testing validates readiness',
          ],
        },
      ],
    },
  },
  // Additional lessons to reach 120
  {
    id: 'CIA1-V-057',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Segregation of Duties',
    description: 'Understand segregation of duties as a key control activity',
    order: 57,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Segregation of duties', 'Incompatible functions', 'Control design'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'Segregation of Duties Concept',
          type: 'text',
          content: '**Segregation of duties (SoD):**\n\nNo single person should control all phases of a transaction. Key functions to separate:\n\n• **Authorization** - Approve transactions\n• **Custody** - Physical possession of assets\n• **Recording** - Maintaining records\n• **Reconciliation** - Verifying accuracy',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'SoD prevents fraud and error',
            'Separate authorization, custody, recording',
            'Compensating controls when SoD not possible',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-III-043',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Workpaper Documentation Standards',
    description: 'Document audit work properly in workpapers',
    order: 43,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Workpapers', 'Documentation', 'Evidence'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Workpaper Requirements',
          type: 'text',
          content: '**Workpapers should document:**\n\n• Planning information\n• Risk assessment\n• Work performed\n• Evidence gathered\n• Conclusions reached\n• Review and approval\n\n**Workpapers must support the audit report.**',
        },
        {
          title: 'Quality Attributes',
          type: 'text',
          content: '**Workpapers should be:**\n• Complete - All necessary information\n• Clear - Understandable to reviewer\n• Accurate - Factually correct\n• Organized - Logical structure\n• Secure - Protected from loss/access',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Workpapers support conclusions',
            'Must be complete, clear, accurate',
            'Retention per policy and regulations',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-IV-057',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Project Management Auditing',
    description: 'Audit project management processes and controls',
    order: 57,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Project management', 'Project auditing', 'PMO'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Project Management Risk Areas',
          type: 'text',
          content: '**Common project risks:**\n\n• Scope creep\n• Schedule delays\n• Budget overruns\n• Resource constraints\n• Poor requirements\n• Inadequate testing\n• Stakeholder issues',
        },
        {
          title: 'Audit Focus Areas',
          type: 'text',
          content: '**Key areas to audit:**\n• Project governance and oversight\n• Planning and approval process\n• Progress monitoring and reporting\n• Change control\n• Risk management\n• Resource management\n• Post-implementation review',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Projects have inherent risks requiring oversight',
            'Audit governance, planning, monitoring, change control',
            'Post-implementation reviews capture lessons',
          ],
        },
      ],
    },
  },
];

export default ciaLessonsBatch5;
