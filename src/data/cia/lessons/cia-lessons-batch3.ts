/**
 * CIA Lessons - Batch 3
 * Additional lessons to reach 120+ target
 * 
 * Note: CIA1-I-041 (Mission Statement) removed - duplicate of CIA1-I-001
 */

import { Lesson } from '../../../types';

export const ciaLessonsBatch3: Lesson[] = [
  // CIA Part 1 additions
  {
    id: 'CIA1-II-042',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Direct Access to the Board',
    description: 'Understand requirements for CAE access to the board',
    order: 42,
    duration: 25,
    difficulty: 'intermediate',
    topics: ['Board access', 'CAE authority', 'Private meetings'],
    blueprintArea: 'CIA1-II',
    content: {
      sections: [
        {
          title: 'Why Direct Access Matters',
          type: 'text',
          content: '**Direct access to the board ensures:**\n\n• Independence from management\n• Ability to report sensitive findings\n• Unrestricted communication\n• Protection from retaliation\n\n**The CAE must have the ability to communicate directly and confidentially with the board chair.**',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Direct access protects independence',
            'Private meetings with audit committee are best practice',
            'CAE should attend all audit committee meetings',
          ],
        },
      ],
    },
  },
  // CIA Part 2 additions
  {
    id: 'CIA2-II-033',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Engagement Risk Assessment',
    description: 'Understand how to assess risk at the engagement level',
    order: 33,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Engagement risk', 'Preliminary assessment', 'Risk factors'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Engagement-Level Risk Assessment',
          type: 'text',
          content: '**During planning, auditors should identify:**\n\n• Key risks to the process/area\n• Existing controls addressing those risks\n• Potential for fraud\n• Areas of management concern\n• Prior audit findings\n\n**This assessment shapes the scope and nature of procedures.**',
        },
        {
          title: 'Risk Factor Categories',
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Inherent', 'Complexity, volume, judgment required'],
            ['Control', 'Design deficiencies, override potential'],
            ['Detection', 'Evidence availability, sampling limitations'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Risk assessment occurs at engagement level',
            'Shapes scope and procedures',
            'Consider inherent, control, and detection risks',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-III-034',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Observation Techniques',
    description: 'Learn effective observation methods for audit fieldwork',
    order: 34,
    duration: 25,
    difficulty: 'beginner',
    topics: ['Observation', 'Physical inspection', 'Audit evidence'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'When to Use Observation',
          type: 'text',
          content: '**Observation is appropriate for:**\n\n• Verifying physical existence of assets\n• Confirming actual practices match documented procedures\n• Assessing security and environmental controls\n• Evaluating segregation of duties in practice\n\n**Observation provides evidence about a point in time.**',
        },
        {
          title: 'Observation Tips',
          type: 'callout',
          content: '• Be unobtrusive when possible\n• Document what you observe immediately\n• Note any anomalies or red flags\n• Consider timing of observation',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Observation verifies physical existence and practices',
            'Provides point-in-time evidence',
            'Document findings immediately',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-IV-035',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Exit Conferences',
    description: 'Understand the purpose and conduct of exit conferences',
    order: 35,
    duration: 25,
    difficulty: 'intermediate',
    topics: ['Exit conference', 'Communication', 'Finding validation'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Purpose of Exit Conferences',
          type: 'text',
          content: '**Exit conferences (closing meetings) allow:**\n\n• Discussion of findings with management\n• Validation of facts and accuracy\n• Opportunity for clarification\n• Preview of recommendations\n• Agreement on action plans\n\n**Reduces surprises in the final report.**',
        },
        {
          title: 'Best Practices',
          type: 'text',
          content: '**For effective exit conferences:**\n• Share draft findings in advance\n• Invite appropriate management levels\n• Listen to management perspective\n• Clarify any misunderstandings\n• Document discussions and agreements',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Exit conferences validate findings before reporting',
            'Reduce surprises and improve buy-in',
            'Document agreements and disagreements',
          ],
        },
      ],
    },
  },
  // CIA Part 3 additions
  {
    id: 'CIA3-I-037',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Supply Chain Risk Management',
    description: 'Understand supply chain risks and audit considerations',
    order: 37,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Supply chain', 'Third-party risk', 'Vendor risk'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Supply Chain Risks',
          type: 'text',
          content: '**Key supply chain risks include:**\n\n• Single-source dependencies\n• Geopolitical disruptions\n• Quality and compliance issues\n• Cybersecurity vulnerabilities\n• Financial stability of suppliers\n• Regulatory and reputational risks',
        },
        {
          title: 'Risk Mitigation Strategies',
          type: 'table',
          headers: ['Strategy', 'Description'],
          rows: [
            ['Diversification', 'Multiple suppliers for critical items'],
            ['Due diligence', 'Vet suppliers before and during relationship'],
            ['Monitoring', 'Ongoing performance and risk assessment'],
            ['Contracts', 'Clear terms, SLAs, and exit provisions'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Supply chain disruptions can be significant',
            'Due diligence and monitoring are essential',
            'Diversification reduces concentration risk',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-II-038',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Network and Infrastructure Security',
    description: 'Understand network security concepts for auditors',
    order: 38,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Network security', 'Firewalls', 'Encryption', 'VPN'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Network Security Layers',
          type: 'text',
          content: '**Defense in Depth:**\n\n• **Perimeter** - Firewalls, DMZ, IDS/IPS\n• **Network** - Segmentation, VLANs\n• **Host** - Endpoint protection, patching\n• **Application** - WAF, secure coding\n• **Data** - Encryption, DLP',
        },
        {
          title: 'Key Security Technologies',
          type: 'table',
          headers: ['Technology', 'Purpose'],
          rows: [
            ['Firewall', 'Controls traffic between networks'],
            ['IDS/IPS', 'Detects/prevents intrusion attempts'],
            ['VPN', 'Secure remote access'],
            ['Encryption', 'Protects data confidentiality'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Defense in depth uses multiple security layers',
            'Firewalls are foundational but not sufficient alone',
            'Encryption protects data in transit and at rest',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-III-039',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Systems Development Life Cycle',
    description: 'Understand SDLC phases and audit considerations',
    order: 39,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['SDLC', 'System development', 'Project phases'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'SDLC Phases',
          type: 'text',
          content: '**Traditional (Waterfall) SDLC:**\n\n1. **Planning** - Feasibility, requirements gathering\n2. **Analysis** - Detailed requirements\n3. **Design** - System architecture\n4. **Development** - Coding and unit testing\n5. **Testing** - Integration and UAT\n6. **Implementation** - Deployment\n7. **Maintenance** - Ongoing support',
        },
        {
          title: 'Audit Considerations by Phase',
          type: 'table',
          headers: ['Phase', 'Audit Focus'],
          rows: [
            ['Planning', 'Business case, authorization'],
            ['Analysis', 'Requirements completeness'],
            ['Design', 'Security requirements, controls'],
            ['Development', 'Coding standards, code review'],
            ['Testing', 'Test coverage, defect management'],
            ['Implementation', 'Change controls, rollback plans'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'SDLC provides structured development approach',
            'Each phase has specific control requirements',
            'Early auditor involvement adds most value',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-IV-040',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Treasury and Cash Management',
    description: 'Understand treasury functions and related controls',
    order: 40,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Treasury', 'Cash management', 'Banking', 'Liquidity'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Treasury Functions',
          type: 'text',
          content: '**Key treasury responsibilities:**\n\n• Cash and liquidity management\n• Banking relationships\n• Debt and investment management\n• Foreign exchange management\n• Interest rate risk management\n\n**Treasury controls are critical due to cash handling.**',
        },
        {
          title: 'Key Controls',
          type: 'table',
          headers: ['Area', 'Control'],
          rows: [
            ['Bank accounts', 'Authorized signers, reconciliation'],
            ['Wire transfers', 'Dual authorization, callback verification'],
            ['Investments', 'Policy limits, authorization'],
            ['FX transactions', 'Hedging policy, exposure limits'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Treasury manages cash and financial risk',
            'Strong controls needed for fraud prevention',
            'Bank reconciliations are fundamental controls',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-I-041',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Economic Indicators and Business Environment',
    description: 'Understand economic factors affecting organizations',
    order: 41,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Economic indicators', 'Business environment', 'Macro factors'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Key Economic Indicators',
          type: 'text',
          content: '**Indicators auditors should understand:**\n\n• **GDP** - Overall economic growth\n• **Inflation** - Price level changes\n• **Interest rates** - Cost of borrowing\n• **Unemployment** - Labor market conditions\n• **Consumer confidence** - Spending outlook\n\n**These affect business performance and risk profiles.**',
        },
        {
          title: 'Impact on Audit',
          type: 'callout',
          content: 'Economic downturns may increase:\n• Fraud risk\n• Going concern issues\n• Credit risk\n• Inventory obsolescence\n• Impairment considerations',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Economic conditions affect business risk',
            'Auditors should understand macro environment',
            'Downturns increase certain audit risks',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-II-042',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Identity and Access Management',
    description: 'Understand IAM concepts and controls',
    order: 42,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['IAM', 'Authentication', 'Authorization', 'Access review'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'IAM Components',
          type: 'text',
          content: '**Identity and Access Management includes:**\n\n• **Identification** - Who are you? (username)\n• **Authentication** - Prove it (password, MFA)\n• **Authorization** - What can you do? (permissions)\n• **Accountability** - What did you do? (logging)\n\n**Follows principle of least privilege.**',
        },
        {
          title: 'IAM Controls',
          type: 'table',
          headers: ['Control', 'Purpose'],
          rows: [
            ['MFA', 'Stronger authentication'],
            ['Access reviews', 'Validate continued need'],
            ['Provisioning', 'Grant access properly'],
            ['Deprovisioning', 'Remove access timely'],
            ['Privileged access', 'Control admin accounts'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'IAM: identification, authentication, authorization',
            'Least privilege limits access to what is needed',
            'Regular access reviews detect inappropriate access',
          ],
        },
      ],
    },
  },
];

export default ciaLessonsBatch3;
