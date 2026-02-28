/**
 * CIA Lessons - Batch 4
 * Additional lessons to reach 120+ target
 */

import { Lesson } from '../../../types';

export const ciaLessonsBatch4: Lesson[] = [
  // ============================================================================
  // CIA Part 1 - More Foundation Topics
  // ============================================================================
  {
    id: 'CIA1-I-043',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Three Lines Model',
    description: 'Understand the IIA Three Lines Model for governance and risk management',
    order: 43,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Three Lines Model', 'Roles', 'Governance', 'Risk management'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'The Three Lines Model',
          type: 'text',
          content: '**The Three Lines Model (2020) replaced the "Three Lines of Defense":**\n\n**First Line:**\nOperating management - owns and manages risks\n\n**Second Line:**\nRisk management and compliance functions - expertise, support, monitoring\n\n**Third Line:**\nInternal Audit - independent assurance\n\n**All report to the governing body and work together.**',
        },
        {
          title: 'Key Principles',
          type: 'text',
          content: '**Six principles:**\n1. Governance requires structures that enable accountability\n2. Governing body ensures appropriate structures exist\n3. Management achieves objectives while managing risk\n4. Second line provides expertise and monitoring\n5. Third line provides independent assurance\n6. All lines must communicate and coordinate',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Three Lines replaced Three Lines of Defense',
            'First line: management owns risk',
            'Second line: expertise and monitoring',
            'Third line: independent assurance',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-I-044',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Internal Audit Value Proposition',
    description: 'Articulate the unique value internal audit brings to organizations',
    order: 44,
    duration: 30,
    difficulty: 'beginner',
    topics: ['Value', 'Stakeholder expectations', 'Relevance'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Sources of IA Value',
          type: 'text',
          content: '**Internal audit creates value by:**\n\n• Providing objective assurance on controls\n• Identifying risks before they materialize\n• Recommending improvements\n• Sharing insights across the organization\n• Supporting fraud prevention and detection\n• Enhancing governance and accountability',
        },
        {
          title: 'Demonstrating Value',
          type: 'text',
          content: '**How to demonstrate value:**\n• Track quantified savings/cost avoidance\n• Report issues prevented\n• Measure recommendation implementation\n• Survey stakeholder satisfaction\n• Communicate insights proactively',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'IA value: assurance, risk identification, improvement',
            'Value must be demonstrated and communicated',
            'Stakeholder satisfaction is key indicator',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-II-045',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Conflicts of Interest',
    description: 'Identify and manage conflicts of interest that threaten objectivity',
    order: 45,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Conflicts of interest', 'Disclosure', 'Mitigation'],
    blueprintArea: 'CIA1-II',
    content: {
      sections: [
        {
          title: 'Types of Conflicts',
          type: 'text',
          content: '**Common conflicts of interest:**\n\n• Auditing area where previously employed\n• Financial interest in auditee\n• Personal relationships with auditee\n• Accepting gifts or entertainment\n• Outside employment creating conflicts',
        },
        {
          title: 'Managing Conflicts',
          type: 'text',
          content: '**Steps to manage conflicts:**\n1. Recognize potential conflicts\n2. Disclose to appropriate parties\n3. Assess significance of conflict\n4. Implement safeguards\n5. Remove from engagement if needed\n6. Document decisions',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Conflicts must be identified proactively',
            'Disclosure is essential',
            'Removal may be required for serious conflicts',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-III-046',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Collective Internal Audit Competence',
    description: 'Understand how IA functions ensure collective proficiency',
    order: 46,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Collective competence', 'Staffing', 'Specialization', 'Outsourcing'],
    blueprintArea: 'CIA1-III',
    content: {
      sections: [
        {
          title: 'Collective Proficiency Concept',
          type: 'text',
          content: '**Collective proficiency means:**\n\nThe internal audit function as a whole must possess the knowledge and skills to perform assigned work. No single auditor needs all competencies.\n\n**Achieved through:**\n• Diverse hiring\n• Training and development\n• Specialists (IT, fraud, tax)\n• Co-sourcing or outsourcing',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Function must have collective competence',
            'Individual auditors specialize',
            'Gaps filled through hiring, training, outsourcing',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-IV-047',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Internal Assessments',
    description: 'Understand ongoing and periodic internal quality assessments',
    order: 47,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Internal assessment', 'Ongoing monitoring', 'Periodic review', 'QAIP'],
    blueprintArea: 'CIA1-IV',
    content: {
      sections: [
        {
          title: 'Two Types of Internal Assessments',
          type: 'text',
          content: '**Ongoing Monitoring:**\n• Daily supervision and review\n• Workpaper review\n• Engagement supervision\n• Report quality review\n• Performance metrics tracking\n\n**Periodic Self-Assessments:**\n• Comprehensive reviews (annually or more)\n• Conformance with Standards\n• Benchmarking\n• Survey of stakeholders',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Ongoing monitoring is continuous',
            'Periodic assessments are comprehensive',
            'Both are required components of QAIP',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA1-V-048',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Risk Response Strategies',
    description: 'Understand options for responding to identified risks',
    order: 48,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Risk response', 'Avoidance', 'Mitigation', 'Transfer', 'Acceptance'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'Risk Response Options',
          type: 'text',
          content: '**Four primary risk responses:**\n\n**Avoid** - Eliminate the activity creating risk\n**Mitigate/Reduce** - Implement controls to reduce likelihood or impact\n**Transfer/Share** - Insurance, outsourcing, contracts\n**Accept** - Acknowledge risk within appetite',
        },
        {
          title: 'Response Selection',
          type: 'text',
          content: '**Factors in selecting response:**\n• Risk severity\n• Cost of response\n• Risk appetite\n• Practicality\n• Residual risk after response\n\n**Management selects; IA assesses appropriateness.**',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Four responses: Avoid, Mitigate, Transfer, Accept',
            'Response depends on risk and cost-benefit',
            'Residual risk must be within appetite',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // CIA Part 2 - More Audit Practice Topics
  // ============================================================================
  {
    id: 'CIA2-I-036',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Audit Universe and Coverage',
    description: 'Develop and maintain an audit universe for comprehensive coverage',
    order: 36,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Audit universe', 'Coverage', 'Risk assessment', 'Prioritization'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'What is an Audit Universe?',
          type: 'text',
          content: '**Audit universe** includes all auditable entities:\n\n• Business units and locations\n• Functions and processes\n• Systems and applications\n• Projects and initiatives\n• Regulatory requirements\n\n**The universe should be comprehensive but manageable.**',
        },
        {
          title: 'Maintaining the Universe',
          type: 'text',
          content: '**Best practices:**\n• Update annually or more frequently\n• Add new entities as created\n• Remove obsolete entities\n• Align with organizational changes\n• Document rationale for inclusions',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Audit universe = all auditable entities',
            'Basis for risk assessment and planning',
            'Must be current and comprehensive',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-II-037',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Opening Conference and Client Relationships',
    description: 'Conduct effective opening conferences and build productive client relationships',
    order: 37,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Opening conference', 'Client relationships', 'Communication'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Opening Conference Purposes',
          type: 'text',
          content: '**The opening conference should:**\n\n• Introduce audit team\n• Explain audit objectives and scope\n• Discuss timing and logistics\n• Set expectations for cooperation\n• Address questions and concerns\n• Establish key contacts',
        },
        {
          title: 'Building Relationships',
          type: 'text',
          content: '**Relationship best practices:**\n• Be professional and respectful\n• Communicate transparently\n• Listen to management perspective\n• Minimize disruption to operations\n• Maintain independence while being approachable',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Opening conference sets tone for engagement',
            'Clarify objectives, scope, and timing',
            'Build cooperative relationships',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-III-038',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Analytical Procedures',
    description: 'Use analytical procedures as audit evidence',
    order: 38,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Analytical procedures', 'Trend analysis', 'Ratio analysis', 'Expectations'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'What Are Analytical Procedures?',
          type: 'text',
          content: '**Analytical procedures** evaluate information by analyzing plausible relationships:\n\n• Compare to prior periods\n• Compare to budgets\n• Compare to industry benchmarks\n• Analyze ratios and trends\n• Identify unusual fluctuations',
        },
        {
          title: 'Using Analytics as Evidence',
          type: 'text',
          content: '**Analytical procedures can:**\n• Identify areas requiring further testing\n• Provide substantive evidence (when precise)\n• Support conclusions\n\n**Considerations:**\n• Precision depends on data quality\n• Expectations must be developed\n• Investigate significant variances',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Analytics analyze plausible relationships',
            'Compare to expectations (prior, budget, industry)',
            'Investigate significant variances',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-IV-039',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Report Distribution and Confidentiality',
    description: 'Appropriately distribute reports while maintaining confidentiality',
    order: 39,
    duration: 25,
    difficulty: 'intermediate',
    topics: ['Report distribution', 'Confidentiality', 'Sensitive information'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Distribution Considerations',
          type: 'text',
          content: '**Who receives the report:**\n\n• Auditee management (always)\n• Senior management\n• Audit committee/Board\n• External parties (when required)\n\n**CAE determines distribution based on:**\n• Information sensitivity\n• Need to know\n• Regulatory requirements\n• Charter provisions',
        },
        {
          title: 'Protecting Sensitive Information',
          type: 'text',
          content: '**Protect confidential information by:**\n• Limiting distribution\n• Using secure transmission\n• Redacting sensitive details\n• Marking confidential documents\n• Retention according to policy',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'CAE determines appropriate distribution',
            'Protect sensitive and confidential information',
            'Balance transparency with prudent protection',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // CIA Part 3 - More Business Knowledge Topics
  // ============================================================================
  {
    id: 'CIA3-I-043',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Regulatory Compliance Framework',
    description: 'Understand regulatory compliance programs and audit considerations',
    order: 43,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Regulatory compliance', 'Compliance program', 'Regulatory risk'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Compliance Program Elements',
          type: 'text',
          content: '**Effective compliance program includes:**\n\n• Written policies and procedures\n• Compliance officer/function\n• Training and awareness\n• Monitoring and auditing\n• Reporting mechanisms\n• Enforcement and discipline\n• Response and remediation',
        },
        {
          title: 'Audit Considerations',
          type: 'text',
          content: '**Internal audit should:**\n• Assess compliance program design\n• Test operating effectiveness\n• Identify regulatory gaps\n• Evaluate training adequacy\n• Review reporting and escalation\n\n**IA is not the compliance function but provides assurance on it.**',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Compliance programs have standard elements',
            'IA provides assurance on compliance programs',
            'IA does not replace compliance function',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-II-044',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Emerging Technology Risks',
    description: 'Understand risks from emerging technologies',
    order: 44,
    duration: 40,
    difficulty: 'advanced',
    topics: ['AI', 'Blockchain', 'IoT', 'Emerging tech risks'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Key Emerging Technologies',
          type: 'text',
          content: '**Technologies creating new risks:**\n\n• **AI/ML** - Bias, explainability, ethics\n• **Blockchain** - Smart contracts, governance\n• **IoT** - Device security, data volume\n• **RPA** - Bot governance, access controls\n• **Cloud** - Data sovereignty, vendor risk',
        },
        {
          title: 'Audit Approach',
          type: 'text',
          content: '**For emerging technology audits:**\n• Understand the technology basics\n• Identify specific risks introduced\n• Assess governance and oversight\n• Evaluate security controls\n• Consider regulatory implications\n• Use specialists when needed',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Emerging tech introduces new risk types',
            'Auditors must stay current',
            'Use specialists for complex technologies',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-III-045',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Database Management Controls',
    description: 'Understand database controls and audit considerations',
    order: 45,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Database', 'Data integrity', 'Access controls', 'Backup'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'Database Control Categories',
          type: 'text',
          content: '**Key database controls:**\n\n**Access Controls:**\n• User authentication\n• Role-based access\n• Privileged access management\n\n**Integrity Controls:**\n• Referential integrity\n• Data validation\n• Audit logging\n\n**Availability Controls:**\n• Backup and recovery\n• Replication\n• Failover',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Database controls: access, integrity, availability',
            'DBA privileged access is key risk',
            'Logging essential for accountability',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-IV-046',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Cost Accounting Basics',
    description: 'Understand cost accounting concepts relevant to auditing',
    order: 46,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Cost accounting', 'Fixed costs', 'Variable costs', 'Overhead'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Cost Classifications',
          type: 'text',
          content: '**Direct vs. Indirect Costs:**\n• Direct - Traceable to product/service\n• Indirect - Allocated (overhead)\n\n**Fixed vs. Variable:**\n• Fixed - Don\'t change with volume\n• Variable - Change with activity level',
        },
        {
          title: 'Common Cost Methods',
          type: 'text',
          content: '**Cost allocation methods:**\n• Job costing - Specific jobs/projects\n• Process costing - Continuous production\n• Activity-based costing (ABC) - Activities drive costs\n\n**Auditors should validate cost allocation reasonableness.**',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Costs: direct/indirect, fixed/variable',
            'Allocation methods affect profitability analysis',
            'Validate allocation reasonableness',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-I-047',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Mergers and Acquisitions',
    description: 'Understand M&A risks and internal audit involvement',
    order: 47,
    duration: 40,
    difficulty: 'advanced',
    topics: ['M&A', 'Due diligence', 'Integration', 'Synergies'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'M&A Lifecycle',
          type: 'text',
          content: '**Phases of M&A:**\n\n1. **Strategy** - Acquisition criteria, targets\n2. **Due Diligence** - Evaluate target\n3. **Negotiation** - Terms, pricing\n4. **Integration** - Combine operations\n5. **Synergy Realization** - Capture benefits',
        },
        {
          title: 'Internal Audit Role',
          type: 'text',
          content: '**IA can contribute by:**\n• Participating in due diligence\n• Assessing control environment of target\n• Identifying integration risks\n• Auditing synergy realization\n• Assessing post-merger controls',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'M&A has multiple phases with distinct risks',
            'Due diligence is critical success factor',
            'IA adds value throughout M&A lifecycle',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-II-048',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Penetration Testing and Vulnerability Management',
    description: 'Understand security testing approaches',
    order: 48,
    duration: 35,
    difficulty: 'advanced',
    topics: ['Penetration testing', 'Vulnerability scanning', 'Security testing'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Penetration Testing',
          type: 'text',
          content: '**Penetration testing simulates attacks:**\n\n• External - From internet\n• Internal - From inside network\n• Social engineering - Human vulnerabilities\n• Web application - Application flaws\n\n**Conducted by qualified specialists.**',
        },
        {
          title: 'Vulnerability Management',
          type: 'text',
          content: '**Ongoing vulnerability management:**\n• Regular scanning\n• Prioritize by risk\n• Patch management\n• Tracking and reporting\n• Remediation verification',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Pen testing simulates real attacks',
            'Vulnerability scanning is ongoing process',
            'Both require remediation and tracking',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-III-049',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Outsourcing and Third-Party Risk',
    description: 'Understand third-party risk management and auditing',
    order: 49,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Third-party risk', 'Outsourcing', 'Vendor due diligence', 'SOC reports'],
    blueprintArea: 'CIA3-III',
    content: {
      sections: [
        {
          title: 'Third-Party Risk Lifecycle',
          type: 'text',
          content: '**Managing third-party risk:**\n\n1. **Selection** - Due diligence before engagement\n2. **Contracting** - Terms, SLAs, audit rights\n3. **Ongoing Monitoring** - Performance, compliance\n4. **Exit** - Transition planning, data return',
        },
        {
          title: 'SOC Reports for Vendors',
          type: 'text',
          content: '**SOC report types:**\n• **SOC 1** - Controls for financial reporting\n• **SOC 2** - Security, availability, processing integrity, confidentiality, privacy\n• **Type I** - Design at point in time\n• **Type II** - Operating effectiveness over period',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Third-party risk requires lifecycle management',
            'SOC reports provide vendor control assurance',
            'Type II provides more assurance than Type I',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA3-IV-050',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Performance Measurement and Balanced Scorecard',
    description: 'Understand organizational performance measurement',
    order: 50,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Balanced scorecard', 'KPIs', 'Performance management'],
    blueprintArea: 'CIA3-IV',
    content: {
      sections: [
        {
          title: 'Balanced Scorecard Framework',
          type: 'text',
          content: '**Four Perspectives:**\n\n• **Financial** - Revenue, profit, ROI\n• **Customer** - Satisfaction, retention, share\n• **Internal Process** - Efficiency, quality, cycle time\n• **Learning & Growth** - Training, innovation, culture',
        },
        {
          title: 'Audit Considerations',
          type: 'text',
          content: '**Auditing performance measures:**\n• Validate data accuracy\n• Assess measure appropriateness\n• Check for gaming or manipulation\n• Evaluate link to strategy\n• Review target-setting process',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Balanced scorecard provides holistic view',
            'Four perspectives: financial, customer, process, learning',
            'Audit data accuracy and manipulation risk',
          ],
        },
      ],
    },
  },
];

export default ciaLessonsBatch4;
