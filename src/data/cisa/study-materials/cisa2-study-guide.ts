/**
 * CISA Domain 2 Study Guide
 * Governance and Management of IT
 * 
 * Based on 2024 ISACA CISA Exam Content Outline
 * Weight: 18% (approximately 27 questions)
 */

import type { CISAStudyGuide } from './cisa1-study-guide';

export const CISA2_STUDY_GUIDE: CISAStudyGuide = {
  id: 'cisa2-study-guide',
  section: 'CISA2',
  title: 'Domain 2: Governance and Management of IT',
  version: '2024',
  lastUpdated: '2026-02-10',

  examFormat: {
    totalQuestions: 150,
    questionType: 'Multiple Choice Questions (MCQ)',
    duration: '4 hours',
    passingScore: '450 scaled score (out of 800)',
  },

  blueprintAreas: [
    // =====================================================
    // Domain 2A: IT Governance
    // =====================================================
    {
      id: 'CISA2-A',
      title: 'IT Governance',
      weight: '~4%',
      overview: 'Understanding IT governance frameworks, structures, and mechanisms that ensure IT supports and enables enterprise strategy.',

      keyTopics: [
        {
          name: 'IT Governance Fundamentals',
          description: 'Core concepts of IT governance and its role in the organization',
          keyPoints: [
            'IT Governance ensures IT investments support business objectives',
            'Board of Directors has ultimate accountability for IT governance',
            'IT Steering Committee provides IT/business leadership oversight',
            'Executive management handles day-to-day governance decisions',
            'Governance sets direction; Management implements and monitors',
            'Governance framework should be documented and communicated',
            'Regular assessment of governance effectiveness is required',
            'Governance enables value creation while managing risk',
          ],
          references: ['COBIT 2019', 'ISO 38500'],
        },
        {
          name: 'SVRP-P Governance Outcomes',
          description: 'The five key outcomes that IT governance should deliver',
          keyPoints: [
            'Strategic Alignment: IT strategy supports and enables business strategy',
            'Value Delivery: IT investments deliver promised benefits on time and budget',
            'Risk Management: IT risks are identified, assessed, and managed',
            'Performance Measurement: IT performance is measured and monitored',
            '+Resource Management: IT resources are used effectively and efficiently',
            'These outcomes guide governance activities and metrics',
            'Balance between value creation and risk management',
            'Performance measurement enables continuous improvement',
          ],
        },
        {
          name: 'Governance Bodies and Roles',
          description: 'Understanding responsibilities at different governance levels',
          keyPoints: [
            'Board of Directors: Ultimate accountability, approve strategy, oversee risk',
            'Audit Committee: Oversight of audit function, risk, and controls',
            'IT Steering Committee: Prioritize IT investments, resolve conflicts',
            'CIO/CTO: Lead IT function, implement board direction',
            'CISO: Information security program leadership and accountability',
            'Enterprise Architecture function: Ensure IT aligns with business',
            'Clear escalation paths for IT issues and decisions',
            'Documented roles, responsibilities, and authorities',
          ],
        },
        {
          name: 'IT Governance Frameworks',
          description: 'Major frameworks used to guide IT governance',
          keyPoints: [
            'COBIT 2019: Comprehensive IT governance and management framework',
            'ISO 38500: Corporate governance of information technology',
            'ITIL: IT service management best practices',
            'TOGAF: Enterprise architecture framework',
            'Val IT: Value delivery from IT investments',
            'Risk IT: IT risk management framework',
            'Frameworks provide structure but require customization',
            'Multiple frameworks can be used together',
          ],
        },
      ],

      criticalFormulas: [
        'SVRP-P: Strategic Alignment, Value Delivery, Risk Management, Performance Measurement, Resource Management',
      ],

      examTips: [
        'Board of Directors is ULTIMATELY responsible for IT governance',
        'Governance sets direction; Management executes',
        'Know SVRP-P outcomes - frequently tested',
        'IT Steering Committee bridges IT and business leadership',
      ],
    },

    // =====================================================
    // Domain 2B: IT Strategy and Policies
    // =====================================================
    {
      id: 'CISA2-B',
      title: 'IT Strategy and Policies',
      weight: '~3%',
      overview: 'IT strategic planning, policy development, and ensuring alignment between IT and business objectives.',

      keyTopics: [
        {
          name: 'Strategic Alignment',
          description: 'Ensuring IT strategy supports and enables business strategy',
          keyPoints: [
            'IT strategy must derive from and support business strategy',
            'Executive sponsorship is critical for IT initiatives',
            'Regular alignment reviews between IT and business leadership',
            'IT capabilities should enable business capabilities',
            'Strategic planning should include IT implications',
            'Business case required for major IT investments',
            'Metrics should link IT activities to business outcomes',
            'Change in business strategy requires IT strategy review',
          ],
        },
        {
          name: 'Policy Hierarchy',
          description: 'Understanding the levels of organizational guidance documents',
          keyPoints: [
            'Policies: High-level management intent - MANDATORY, say WHAT',
            'Standards: Specific requirements - MANDATORY, say WHAT specific',
            'Procedures: Step-by-step instructions - MANDATORY, say HOW',
            'Guidelines: Recommendations - OPTIONAL, suggest best practices',
            'Policies require senior management approval',
            'Regular review and update cycle for all documents',
            'Version control and change management for policies',
            'Communication and training on policy changes',
          ],
        },
        {
          name: 'IT Strategic Planning Process',
          description: 'Steps involved in developing IT strategy',
          keyPoints: [
            'Assess current state capabilities and maturity',
            'Define future state vision aligned with business',
            'Gap analysis between current and future state',
            'Develop roadmap with initiatives and priorities',
            'Resource planning: budget, staff, technology',
            'Risk assessment for strategic initiatives',
            'Governance for strategy execution',
            'Regular progress review and adjustment',
          ],
        },
        {
          name: 'Performance Measurement',
          description: 'Measuring and reporting on IT performance',
          keyPoints: [
            'Key Performance Indicators (KPIs): Measure success',
            'Key Risk Indicators (KRIs): Measure risk exposure',
            'Key Goal Indicators (KGIs): Measure objective achievement',
            'Balanced Scorecard: Multiple perspectives',
            'IT dashboards for management reporting',
            'Benchmarking against industry peers',
            'Trend analysis for improvement tracking',
            'Clear ownership of metrics and reporting',
          ],
        },
      ],

      examTips: [
        'Policies say WHAT, Procedures say HOW',
        'Policies are mandatory; Guidelines are optional',
        'IT strategy must align with and support business strategy',
        'Senior management must approve policies',
      ],
    },

    // =====================================================
    // Domain 2C: Organizational Structure
    // =====================================================
    {
      id: 'CISA2-C',
      title: 'Organizational Structure',
      weight: '~3%',
      overview: 'IT organizational design, roles and responsibilities, and segregation of duties to maintain appropriate controls.',

      keyTopics: [
        {
          name: 'Segregation of Duties (SoD)',
          description: 'Separating incompatible functions to prevent fraud and error',
          keyPoints: [
            'Authorization: Approve transactions and access',
            'Custody: Physical or logical access to assets',
            'Recording: Accounting, documentation, data entry',
            'Verification: Reconciliation, review, audit',
            'No single person should control all four functions',
            'When SoD not possible, use compensating controls',
            'Compensating controls: Supervision, logging, independent review',
            'SoD conflicts should be documented and monitored',
          ],
        },
        {
          name: 'Key IT Roles and Responsibilities',
          description: 'Understanding critical roles in IT governance and operations',
          keyPoints: [
            'Data Owner: Business role - classification, access decisions, accountability',
            'Data Custodian: IT role - implement controls, protect data, maintain systems',
            'Data Steward: Quality, standards, metadata management',
            'CIO: Overall IT strategy and management',
            'CISO: Security program leadership and incident response',
            'System Administrator: Day-to-day system operations',
            'Database Administrator: Database management and optimization',
            'Clear separation between data ownership (business) and custody (IT)',
          ],
        },
        {
          name: 'IT Organizational Models',
          description: 'Different approaches to organizing IT functions',
          keyPoints: [
            'Centralized: All IT under single organization',
            'Decentralized: IT distributed across business units',
            'Federated/Hybrid: Combination of central and distributed',
            'Outsourced: External providers for IT services',
            'Each model has governance and control implications',
            'Model choice depends on business needs and risk tolerance',
            'Clear accountability regardless of model',
            'Regular assessment of organizational effectiveness',
          ],
        },
        {
          name: 'Change Management Organization',
          description: 'Roles and structures for managing IT changes',
          keyPoints: [
            'Change Advisory Board (CAB): Review and approve changes',
            'Change Manager: Process owner for change management',
            'Emergency CAB (ECAB): Expedited review for emergencies',
            'Release Manager: Coordinate deployments',
            'Configuration Manager: Maintain CMDB accuracy',
            'Clear escalation paths for change conflicts',
            'Documented roles and responsibilities',
          ],
        },
      ],

      criticalFormulas: [
        'SoD Functions: Authorization + Custody + Recording + Verification = Separation Required',
      ],

      examTips: [
        'Data Owner decides classification - this is a BUSINESS role, not IT',
        'SoD conflicts require compensating controls when separation impossible',
        'CIO manages IT; CISO leads security program',
        'When segregation not possible, supervision and logging are compensating controls',
      ],
    },

    // =====================================================
    // Domain 2D: HR and Skills Management
    // =====================================================
    {
      id: 'CISA2-D',
      title: 'Human Resource Controls',
      weight: '~2%',
      overview: 'HR controls throughout the employee lifecycle to manage risks from personnel.',

      keyTopics: [
        {
          name: 'Hiring Controls',
          description: 'Pre-employment screening and onboarding security',
          keyPoints: [
            'Background checks appropriate to position sensitivity',
            'Reference verification from previous employers',
            'Skills and credential validation',
            'Security clearance for sensitive positions',
            'Confidentiality and acceptable use agreements',
            'Security awareness training before access granted',
            'Principle of least privilege for initial access',
            'Documented onboarding process',
          ],
        },
        {
          name: 'Ongoing HR Controls',
          description: 'Controls during employment to manage personnel risk',
          keyPoints: [
            'Regular security awareness training (annual minimum)',
            'Periodic access reviews and recertification',
            'Performance reviews with security considerations',
            'Mandatory vacation: Detective control for fraud (forces handoff)',
            'Job rotation: Cross-training and fraud detection',
            'Separation of duties enforcement',
            'Policy acknowledgment requirements',
            'Monitoring for policy violations',
          ],
        },
        {
          name: 'Termination Controls',
          description: 'Securing the organization when employees depart',
          keyPoints: [
            'Immediate access revocation upon termination',
            'Equipment collection: Laptop, badge, tokens, keys',
            'Exit interview for knowledge transfer',
            'Reminder of ongoing confidentiality obligations',
            'Disable accounts before employee notified (involuntary)',
            'Backup of employee work files',
            'Return of all company property documented',
            'Update access lists and distribution groups',
          ],
        },
        {
          name: 'Skills and Competency Management',
          description: 'Ensuring IT staff have required capabilities',
          keyPoints: [
            'Skills inventory and gap analysis',
            'Training and development programs',
            'Certification requirements for key roles',
            'Knowledge management and documentation',
            'Succession planning for critical roles',
            'Cross-training to reduce key person risk',
            'Professional development budgets',
            'Regular skills assessment and updates',
          ],
        },
      ],

      examTips: [
        'Mandatory vacation is a DETECTIVE control - forces handover, exposes hidden activities',
        'Access revocation should be IMMEDIATE upon termination',
        'Background checks must be appropriate to position sensitivity',
        'Job rotation serves both training and fraud detection purposes',
      ],
    },

    // =====================================================
    // Domain 2E: Risk Management
    // =====================================================
    {
      id: 'CISA2-E',
      title: 'IT Risk Management',
      weight: '~3%',
      overview: 'Identifying, assessing, and responding to IT-related risks aligned with organizational risk appetite.',

      keyTopics: [
        {
          name: 'Risk Treatment Options',
          description: 'The four primary ways to respond to identified risks',
          keyPoints: [
            'Accept/Retain: Accept the risk as-is within risk appetite',
            'Mitigate/Reduce: Implement controls to reduce likelihood or impact',
            'Transfer/Share: Shift risk to third party (insurance, outsourcing)',
            'Avoid/Terminate: Eliminate the activity causing the risk',
            'Risk treatment decision documented with rationale',
            'Residual risk must be within risk appetite after treatment',
            'Risk owner accountable for treatment decision',
            'Regular review of treatment effectiveness',
          ],
        },
        {
          name: 'Quantitative Risk Analysis',
          description: 'Mathematical approach to measuring risk in monetary terms',
          keyPoints: [
            'Asset Value (AV): Value of the asset at risk',
            'Exposure Factor (EF): Percentage of asset lost if risk materializes',
            'Single Loss Expectancy (SLE) = AV × EF',
            'Annualized Rate of Occurrence (ARO): Expected frequency per year',
            'Annualized Loss Expectancy (ALE) = SLE × ARO',
            'Cost-benefit: Control cost should be less than ALE reduction',
            'Quantitative provides dollar values for decision-making',
            'Requires reliable data for accuracy',
          ],
        },
        {
          name: 'Risk Concepts',
          description: 'Key risk management terminology and concepts',
          keyPoints: [
            'Inherent Risk: Risk before any controls applied',
            'Residual Risk: Risk remaining after controls applied',
            'Residual Risk = Inherent Risk - Control Effectiveness',
            'Risk Appetite: Amount of risk organization willing to accept',
            'Risk Tolerance: Acceptable variation from risk appetite',
            'Risk Capacity: Maximum risk organization can absorb',
            'Risk appetite set by the Board of Directors',
            'All residual risk must be within risk appetite',
          ],
        },
        {
          name: 'Risk Assessment Process',
          description: 'Steps in conducting IT risk assessment',
          keyPoints: [
            'Asset identification and valuation',
            'Threat identification (who/what can cause harm)',
            'Vulnerability identification (weaknesses that can be exploited)',
            'Impact analysis if threat exploits vulnerability',
            'Likelihood determination based on threat/vulnerability',
            'Risk prioritization and ranking',
            'Treatment plan development',
            'Ongoing monitoring and reassessment',
          ],
        },
      ],

      criticalFormulas: [
        'SLE = Asset Value (AV) × Exposure Factor (EF)',
        'ALE = SLE × ARO (Annualized Rate of Occurrence)',
        'Residual Risk = Inherent Risk - Control Effectiveness',
        'Control Value = ALE(before) - ALE(after) - Annual Control Cost',
      ],

      examTips: [
        'Risk appetite is set by the BOARD, not IT or management',
        'Residual risk must be within risk appetite',
        'SLE = AV × EF; ALE = SLE × ARO - memorize these formulas',
        'Control cost should be less than risk reduction benefit',
      ],
    },

    // =====================================================
    // Domain 2F: Vendor and Third-Party Management
    // =====================================================
    {
      id: 'CISA2-F',
      title: 'Vendor Management',
      weight: '~2%',
      overview: 'Managing risks from third-party relationships throughout the vendor lifecycle.',

      keyTopics: [
        {
          name: 'Vendor Due Diligence',
          description: 'Assessment activities before engaging a vendor',
          keyPoints: [
            'Financial stability assessment',
            'Security practices and certifications (SOC reports)',
            'Compliance status with relevant regulations',
            'Reference checks from existing customers',
            'Technical capability assessment',
            'Business continuity and recovery capabilities',
            'Subcontractor and fourth-party risk assessment',
            'Geographic and jurisdictional considerations',
          ],
        },
        {
          name: 'Contract Requirements',
          description: 'Essential provisions in vendor contracts',
          keyPoints: [
            'Security requirements and standards',
            'Right to Audit: Critical provision for oversight',
            'Data protection and privacy obligations',
            'Incident notification requirements and timelines',
            'Breach liability and indemnification',
            'Service Level Agreements (SLAs) with penalties',
            'Exit/Transition provisions and data return',
            'Subcontracting restrictions and approval',
          ],
        },
        {
          name: 'Ongoing Vendor Monitoring',
          description: 'Activities to maintain vendor oversight during relationship',
          keyPoints: [
            'Service level monitoring against SLAs',
            'Regular security assessments (annual minimum)',
            'SOC report review and evaluation',
            'Compliance verification',
            'Relationship management and escalation',
            'Change notification requirements',
            'Performance trending and improvement',
            'Periodic contract review and renewal',
          ],
        },
        {
          name: 'Vendor Risk Classification',
          description: 'Tiering vendors based on risk and criticality',
          keyPoints: [
            'Critical/Tier 1: Business-critical, no alternatives',
            'High/Tier 2: Significant impact, limited alternatives',
            'Medium/Tier 3: Moderate impact, alternatives available',
            'Low/Tier 4: Minimal impact, easily replaceable',
            'Classification drives due diligence depth',
            'Higher tiers require more frequent monitoring',
            'Escalation paths based on tier',
            'Regular reassessment of classifications',
          ],
        },
      ],

      examTips: [
        'Right to Audit is ESSENTIAL in vendor contracts',
        'SOC reports provide independent assurance on vendor controls',
        'Exit/transition provisions ensure you can leave the vendor',
        'Vendor due diligence must happen BEFORE contract signing',
      ],
    },

    // =====================================================
    // Domain 2G: Business Impact Analysis
    // =====================================================
    {
      id: 'CISA2-G',
      title: 'Business Impact Analysis',
      weight: '~1%',
      overview: 'Understanding BIA as the foundation for business continuity and recovery planning.',

      keyTopics: [
        {
          name: 'BIA Key Metrics',
          description: 'Critical time-based recovery objectives from BIA',
          keyPoints: [
            'MTD (Maximum Tolerable Downtime): Business fails after this duration',
            'RTO (Recovery Time Objective): Systems must be restored within this time',
            'RPO (Recovery Point Objective): Maximum acceptable data loss (time)',
            'WRT (Work Recovery Time): Time to verify and catch up after recovery',
            'Critical relationship: MTD ≥ RTO + WRT',
            'RPO determines backup frequency requirements',
            'RTO determines recovery capability requirements',
            'MTD is business-determined, not IT-determined',
          ],
        },
        {
          name: 'BIA Process',
          description: 'Steps in conducting business impact analysis',
          keyPoints: [
            'Identify critical business processes',
            'Determine impact of process unavailability over time',
            'Quantify financial impact: Revenue loss, penalties, costs',
            'Qualitative impact: Reputation, customer, regulatory',
            'Identify dependencies: Systems, staff, vendors',
            'Determine recovery priorities based on impact',
            'Define recovery objectives for each process',
            'Document and validate with business owners',
          ],
        },
        {
          name: 'Impact Categories',
          description: 'Types of impact assessed in BIA',
          keyPoints: [
            'Financial: Lost revenue, extra costs, penalties',
            'Operational: Inability to perform functions',
            'Regulatory: Compliance violations, sanctions',
            'Reputational: Customer confidence, brand damage',
            'Legal: Contractual breaches, lawsuits',
            'Safety: Risk to personnel or public',
            'Impact typically increases over time',
            'Some impacts are immediate, others delayed',
          ],
        },
      ],

      criticalFormulas: [
        'MTD ≥ RTO + WRT',
        'RPO determines backup frequency',
        'RTO determines recovery capability investment',
      ],

      examTips: [
        'MTD > RTO + WRT must always be true',
        'MTD is determined by BUSINESS, not IT',
        'RPO determines how often you need to backup',
        'BIA is the FOUNDATION for BC/DR planning',
      ],
    },

    // =====================================================
    // Domain 2H: IT Service Management
    // =====================================================
    {
      id: 'CISA2-H',
      title: 'IT Service Management',
      weight: '~1%',
      overview: 'ITSM frameworks and processes for delivering quality IT services.',

      keyTopics: [
        {
          name: 'ITIL Framework',
          description: 'IT Infrastructure Library service management best practices',
          keyPoints: [
            'Service Strategy: Define service portfolio and markets',
            'Service Design: Design services, SLAs, and processes',
            'Service Transition: Build, test, and deploy services',
            'Service Operation: Deliver and support services',
            'Continual Service Improvement: Ongoing enhancement',
            'ITIL 4 focuses on service value system',
            'Guiding principles for decision-making',
            'Practices (formerly processes) for service management',
          ],
          references: ['ITIL 4 Foundation'],
        },
        {
          name: 'Key ITSM Concepts',
          description: 'Core service management terminology',
          keyPoints: [
            'Incident: Unplanned service interruption - restore quickly',
            'Problem: Root cause of incidents - prevent recurrence',
            'Change: Modification to IT environment - manage risk',
            'Service Request: User request - fulfill efficiently',
            'Known Error: Problem with documented workaround',
            'KEDB: Known Error Database for incident resolution',
            'Service Catalog: Available services and how to request',
            'CMDB: Configuration items and relationships',
          ],
        },
        {
          name: 'Service Level Management',
          description: 'Managing agreements for service delivery',
          keyPoints: [
            'SLA (Service Level Agreement): Contract with customer',
            'OLA (Operational Level Agreement): Internal IT agreement',
            'UC (Underpinning Contract): Agreement with external supplier',
            'SLA components: Availability, response time, performance',
            'Regular SLA review and reporting',
            'Escalation procedures for SLA breaches',
            'Service improvement from SLA trending',
            'All agreements should align and support SLA commitments',
          ],
        },
      ],

      examTips: [
        'Incident = restore service quickly; Problem = find root cause',
        'SLA is with customer; OLA is internal; UC is with supplier',
        'ITIL is the de facto standard for IT service management',
        'Known Errors are problems with documented workarounds',
      ],
    },
  ],

  studyPlan: [
    { week: 1, focus: 'IT Governance and Strategy', topics: ['Governance fundamentals', 'SVRP-P outcomes', 'Policy hierarchy', 'Strategic alignment'], hours: 10, activities: ['COBIT overview', 'Policy hierarchy exercises', 'MCQ practice'] },
    { week: 2, focus: 'Organization and HR Controls', topics: ['SoD', 'Roles and responsibilities', 'HR controls lifecycle'], hours: 8, activities: ['SoD conflict analysis', 'Role matching exercises', 'Case studies'] },
    { week: 3, focus: 'Risk and Vendor Management', topics: ['Risk formulas', 'Risk treatment', 'Vendor lifecycle', 'BIA metrics'], hours: 10, activities: ['ALE calculations', 'Contract review exercise', 'Recovery objective practice'] },
    { week: 4, focus: 'ITSM and Integration Review', topics: ['ITIL concepts', 'Service management', 'Full domain review'], hours: 8, activities: ['ITSM terminology', 'Domain 2 practice exam', 'Weak area review'] },
  ],

  examTips: [
    'Board of Directors is ULTIMATELY responsible for IT governance',
    'Data owner decides classification - this is a BUSINESS role, not IT',
    'Segregation of Duties conflicts require compensating controls',
    'Right to audit is ESSENTIAL in vendor contracts',
    'MTD must be greater than RTO + WRT',
    'Risk appetite is set by the Board, not management',
    'Policies require senior management approval',
    'Mandatory vacation is a DETECTIVE control for fraud',
    'SLE = AV × EF; ALE = SLE × ARO - know these formulas',
    'Incident restores service quickly; Problem finds root cause',
  ],

  commonMistakes: [
    'Thinking IT decides data classification (business/data owner decides)',
    'Confusing policies (mandatory) with guidelines (optional)',
    'Not knowing risk formulas: SLE = AV × EF, ALE = SLE × ARO',
    'Thinking management sets risk appetite (Board sets it)',
    'Confusing RTO with MTD (MTD is business survival limit)',
    'Believing outsourcing transfers accountability (it does not)',
    'Mixing up Incident (restore quickly) and Problem (find root cause)',
    'Thinking mandatory vacation is preventive (it is detective)',
  ],
};

export default CISA2_STUDY_GUIDE;
