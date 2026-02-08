/**
 * CISA Domain 1: Information Systems Auditing Process (21%)
 * Based on ISACA CISA Review Manual
 * 
 * Key Topics:
 * - IS Audit Planning and Management
 * - IS Audit Evidence and Reporting
 * - Internal Control Evaluation
 */

import { Lesson } from '../../../types';

export const cisa1Lessons: Lesson[] = [
  // ============================================================================
  // DOMAIN 1A: IS AUDIT PLANNING
  // ============================================================================
  
  {
    id: 'CISA1-001',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Introduction to IS Auditing',
    description: 'Understand the fundamentals of Information Systems auditing and its role in organizational governance',
    order: 1,
    duration: 45,
    difficulty: 'beginner',
    topics: ['IS Audit Overview', 'Audit Charter', 'Audit Universe', 'Professional Ethics'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IS auditing is critical for ensuring that information systems support business objectives, protect organizational assets, and comply with regulatory requirements. As a CISA, you'll be expected to understand both the art and science of IS auditing.",
        },
        {
          title: 'What is IS Auditing?',
          type: 'text',
          content: "**IS Auditing Definition:**\n\nIS auditing is the process of collecting and evaluating evidence to determine whether a computer system safeguards assets, maintains data integrity, achieves organizational goals effectively, and uses resources efficiently.\n\n**Core Objectives:**\n• **Confidentiality** - Protect sensitive information\n• **Integrity** - Ensure data accuracy and completeness\n• **Availability** - Confirm systems are accessible when needed\n• **Compliance** - Verify adherence to laws and standards\n• **Effectiveness** - Assess if systems meet business goals\n• **Efficiency** - Evaluate resource utilization",
        },
        {
          title: 'The IS Audit Charter',
          type: 'text',
          content: "**Purpose of the Audit Charter:**\n\nThe audit charter is a formal document that establishes the IS audit function's purpose, authority, and responsibility. It should be approved by senior management and the board or audit committee.\n\n**Key Elements:**\n• Mission and scope of IS audit function\n• Independence and reporting lines\n• Access to systems, records, and personnel\n• Responsibilities and authority\n• Relationship with external auditors\n• Standards and methodologies to follow",
        },
        {
          title: 'IS Audit vs. Financial Audit',
          type: 'table',
          headers: ['Aspect', 'IS Audit', 'Financial Audit'],
          rows: [
            ['Primary Focus', 'IT controls and processes', 'Financial statements'],
            ['Evidence', 'System logs, configs, code', 'Transactions, documents'],
            ['Standards', 'ISACA, NIST, ISO 27001', 'GAAS, PCAOB, ISA'],
            ['Skill Set', 'Technical + audit expertise', 'Accounting + audit expertise'],
            ['Deliverables', 'Control findings, recommendations', 'Audit opinion on financials'],
          ],
        },
        {
          title: 'ISACA Code of Professional Ethics',
          type: 'text',
          content: "**IS auditors must adhere to professional ethics:**\n\n**1. Support Implementation of Standards**\n• Follow ISACA IS Audit and Assurance Standards\n• Promote professional practices\n\n**2. Maintain Independence**\n• Avoid conflicts of interest\n• Disclose impairments to objectivity\n\n**3. Maintain Competence**\n• Pursue continuing education\n• Stay current with technology\n\n**4. Protect Confidentiality**\n• Safeguard information obtained during audits\n• Only disclose appropriately\n\n**5. Maintain Professional Conduct**\n• Act with integrity and honesty\n• Avoid actions that discredit the profession",
        },
        {
          title: 'The Audit Universe',
          type: 'text',
          content: "**What is the Audit Universe?**\n\nThe audit universe is a comprehensive inventory of all potentially auditable areas within an organization. For IS auditing, this includes:\n\n**Technical Areas:**\n• Network infrastructure\n• Applications and databases\n• Operating systems\n• Cloud environments\n• Security controls\n\n**Process Areas:**\n• IT governance\n• Change management\n• Incident response\n• Business continuity\n• Vendor management\n\n**Compliance Areas:**\n• Regulatory requirements\n• Industry standards\n• Internal policies",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IS auditing evaluates IT controls for confidentiality, integrity, and availability",
            "The audit charter establishes authority and scope for the IS audit function",
            "ISACA ethics require independence, competence, and confidentiality",
            "The audit universe inventories all potential audit targets",
            "IS audits differ from financial audits in focus and methodology",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-002',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Risk-Based Audit Planning',
    description: 'Learn how to develop risk-based audit plans that focus resources on the most critical areas',
    order: 2,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Risk Assessment', 'Audit Planning', 'Resource Allocation', 'Annual Audit Plan'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Risk-based auditing ensures that limited audit resources are directed toward areas with the greatest potential impact. This approach is favored by regulators and is the foundation of modern audit practice.",
        },
        {
          title: 'Risk Assessment Framework',
          type: 'text',
          content: "**Components of Risk Assessment:**\n\n**1. Inherent Risk**\nThe risk that exists before any controls are applied\n• Complexity of systems\n• Sensitivity of data\n• Transaction volume\n• Prior audit findings\n\n**2. Control Risk**\nThe risk that controls will not prevent or detect issues\n• Control design adequacy\n• Operating effectiveness\n• Control environment maturity\n\n**3. Detection Risk**\nThe risk that audit procedures will not detect issues\n• Audit methodology\n• Sample sizes\n• Auditor expertise",
        },
        {
          title: '🧠 Memory Aid: Risk Formula',
          type: 'callout',
          content: "**Audit Risk = Inherent Risk × Control Risk × Detection Risk**\n\nRemember: \"I Can Detect\" (IR × CR × DR)\n\nWhen inherent and control risks are HIGH, we need LOW detection risk (more testing).\nWhen inherent and control risks are LOW, we can accept HIGHER detection risk (less testing).",
        },
        {
          title: 'Risk Assessment Approaches',
          type: 'table',
          headers: ['Approach', 'Description', 'Best For'],
          rows: [
            ['Quantitative', 'Assigns numerical values (ALE, SLE)', 'Financial impact analysis'],
            ['Qualitative', 'Uses ratings (High/Medium/Low)', 'Quick prioritization'],
            ['Semi-Quantitative', 'Combines both approaches', 'Balanced risk ranking'],
            ['Asset-Based', 'Focuses on critical assets', 'Infrastructure audits'],
            ['Threat-Based', 'Focuses on threat actors', 'Security assessments'],
            ['Scenario-Based', 'Models specific scenarios', 'Business continuity'],
          ],
        },
        {
          title: 'Developing the Annual Audit Plan',
          type: 'text',
          content: "**Steps to Create the Audit Plan:**\n\n**Step 1: Update the Audit Universe**\n• Identify new systems, processes, regulations\n• Remove decommissioned items\n• Validate with stakeholders\n\n**Step 2: Conduct Risk Assessment**\n• Assess inherent and control risks\n• Consider prior audit results\n• Incorporate management input\n\n**Step 3: Prioritize Audit Areas**\n• Rank by risk score\n• Consider resource constraints\n• Balance coverage across domains\n\n**Step 4: Allocate Resources**\n• Assign staff based on skills\n• Estimate time requirements\n• Plan for training needs\n\n**Step 5: Obtain Approval**\n• Present to audit committee\n• Document rationale for selections\n• Maintain flexibility for changes",
        },
        {
          title: 'Factors Influencing Audit Frequency',
          type: 'text',
          content: "**Higher Frequency Audits for:**\n\n• High-risk systems (financial, customer data)\n• Systems with previous deficiencies\n• New or significantly changed systems\n• Regulatory mandates\n• Management concerns\n\n**Lower Frequency Audits for:**\n\n• Stable, mature systems\n• Strong control history\n• Low business impact\n• Adequate monitoring in place\n• Third-party certifications",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Risk-based auditing focuses resources on highest-impact areas",
            "Audit Risk = Inherent Risk × Control Risk × Detection Risk",
            "Risk assessments can be quantitative, qualitative, or hybrid",
            "Annual audit plans should be flexible to address emerging risks",
            "Audit committee approval is essential for the audit plan",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-003',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'IS Audit Standards and Guidelines',
    description: 'Master ISACA audit standards and understand when and how to apply them',
    order: 3,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['ISACA Standards', 'Audit Guidelines', 'Compliance Requirements', 'Professional Practice'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "ISACA standards are MANDATORY for CISA-certified professionals. Understanding the difference between standards, guidelines, and procedures is essential for exam success and professional practice.",
        },
        {
          title: 'ISACA Framework Hierarchy',
          type: 'text',
          content: "**Three Levels of ISACA Audit Guidance:**\n\n**1. Standards (Mandatory)**\n• Define requirements for IS audit and assurance\n• Non-compliance may result in CISA revocation\n• Must be followed in all circumstances\n\n**2. Guidelines (Strongly Recommended)**\n• Provide guidance on applying standards\n• Help auditors determine how to implement\n• Deviation requires justification\n\n**3. Tools and Techniques (Optional)**\n• Practical resources for implementation\n• Audit programs and checklists\n• May be customized as needed",
        },
        {
          title: 'ISACA IS Audit Standards Categories',
          type: 'table',
          headers: ['Category', 'Focus Area', 'Examples'],
          rows: [
            ['1000 Series', 'General Standards', 'Audit charter, independence, competence'],
            ['1200 Series', 'Performance Standards', 'Planning, evidence, supervision'],
            ['1400 Series', 'Reporting Standards', 'Report content, follow-up'],
          ],
        },
        {
          title: 'Key General Standards (1000 Series)',
          type: 'text',
          content: "**Standard 1001: Audit Charter**\n• Document purpose, authority, responsibility\n• Obtain appropriate approval\n• Review periodically\n\n**Standard 1002: Organizational Independence**\n• Report to appropriate level\n• Free from interference\n• Maintain objectivity\n\n**Standard 1003: Auditor Objectivity**\n• Avoid conflicts of interest\n• Disclose impairments\n• Rotate assignments as needed\n\n**Standard 1004: Reasonable Expectation**\n• Plan to achieve audit objectives\n• Use appropriate methodology\n\n**Standard 1005: Competence**\n• Possess required skills\n• Pursue continuing education\n• Recognize limitations\n\n**Standard 1006: Proficiency**\n• Apply knowledge effectively\n• Use appropriate techniques\n• Maintain certifications",
        },
        {
          title: 'Key Performance Standards (1200 Series)',
          type: 'text',
          content: "**Standard 1201: Engagement Planning**\n• Define objectives and scope\n• Assess risk\n• Document approach\n\n**Standard 1202: Risk Assessment in Planning**\n• Identify potential risks\n• Prioritize audit areas\n• Consider organizational context\n\n**Standard 1203: Performance and Supervision**\n• Supervise staff appropriately\n• Review work performed\n• Ensure quality\n\n**Standard 1204: Materiality**\n• Consider materiality in planning\n• Apply professional judgment\n• Document decisions\n\n**Standard 1205: Evidence**\n• Gather sufficient, relevant evidence\n• Document findings thoroughly\n• Retain work papers\n\n**Standard 1206: Using the Work of Others**\n• Assess competence of others\n• Evaluate relevance of work\n• Maintain responsibility for conclusions",
        },
        {
          title: 'Relationship to Other Standards',
          type: 'text',
          content: "**IS Auditors Should Also Know:**\n\n**COBIT (Control Objectives for IT)**\n• IT governance and management framework\n• Maps to ISACA standards\n• Useful for control assessment\n\n**ISO 27001**\n• Information security management\n• Certification standard\n• Control framework\n\n**NIST Cybersecurity Framework**\n• Risk-based approach\n• Five core functions\n• Widely adopted in US\n\n**IIA Standards**\n• Internal audit standards\n• Complementary to ISACA\n• Useful for general audit concepts",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ISACA Standards are mandatory; Guidelines are recommended; Tools are optional",
            "1000 series covers general standards (charter, independence, competence)",
            "1200 series covers performance standards (planning, evidence, supervision)",
            "1400 series covers reporting standards (content, follow-up)",
            "IS auditors should be familiar with COBIT, ISO 27001, and NIST CSF",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-004',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Control Self-Assessment (CSA)',
    description: 'Understand CSA methodology and its role in continuous monitoring of controls',
    order: 4,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['CSA', 'Control Evaluation', 'Facilitated Workshops', 'Questionnaires'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "CSA enables management to take ownership of control evaluation, extending audit coverage and promoting continuous improvement. It's a key tool in the IS auditor's toolkit.",
        },
        {
          title: 'What is Control Self-Assessment?',
          type: 'text',
          content: "**CSA Definition:**\n\nControl Self-Assessment is a methodology that allows management and staff to evaluate the effectiveness of controls within their areas of responsibility.\n\n**Benefits of CSA:**\n\n• **Ownership** - Management takes responsibility for controls\n• **Coverage** - Extends audit reach with limited resources\n• **Timeliness** - More frequent control evaluations\n• **Awareness** - Increases risk and control consciousness\n• **Cost-Effective** - Reduces formal audit requirements\n• **Continuous Improvement** - Identifies issues proactively",
        },
        {
          title: 'CSA Approaches',
          type: 'table',
          headers: ['Approach', 'Description', 'Advantages', 'Disadvantages'],
          rows: [
            ['Facilitated Workshops', 'Interactive group sessions', 'Rich discussion, buy-in', 'Time-consuming, scheduling'],
            ['Questionnaires/Surveys', 'Written self-assessment forms', 'Scalable, anonymous', 'Less depth, response bias'],
            ['Management-Produced Analysis', 'Formal management reports', 'Detailed, documented', 'Resource intensive'],
          ],
        },
        {
          title: 'Facilitated Workshop Process',
          type: 'text',
          content: "**Steps in Conducting a CSA Workshop:**\n\n**1. Planning**\n• Define objectives and scope\n• Select participants\n• Prepare materials and logistics\n\n**2. Opening**\n• Explain purpose and ground rules\n• Build rapport and trust\n• Set expectations\n\n**3. Discussion**\n• Identify objectives and risks\n• Evaluate existing controls\n• Brainstorm improvements\n\n**4. Voting/Prioritization**\n• Rate risk significance\n• Prioritize control gaps\n• Build consensus\n\n**5. Reporting**\n• Document findings\n• Assign action items\n• Establish timelines",
        },
        {
          title: 'IS Auditor Role in CSA',
          type: 'text',
          content: "**The IS Auditor Should:**\n\n**As Facilitator:**\n• Remain neutral and objective\n• Guide discussion without dominating\n• Ensure all voices are heard\n• Manage group dynamics\n\n**As Evaluator:**\n• Assess CSA methodology adequacy\n• Verify results independently\n• Validate key findings\n• Report to audit committee\n\n**As Consultant:**\n• Train CSA facilitators\n• Design assessment tools\n• Advise on best practices\n• Support implementation\n\n**⚠️ Important:** CSA supplements but does NOT replace independent IS auditing. Auditors must maintain professional skepticism.",
        },
        {
          title: 'CSA Limitations',
          type: 'text',
          content: "**Potential Weaknesses:**\n\n• **Self-Interest Bias** - May underreport issues\n• **Limited Scope** - Participants may miss systemic issues\n• **Skill Gaps** - Facilitators need training\n• **Group Dynamics** - Dominant personalities can skew results\n• **Lack of Independence** - Not a substitute for audit\n\n**Mitigations:**\n• Independent validation of key findings\n• Anonymous response options\n• Trained facilitators\n• Clear scope and objectives",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CSA is management-led control evaluation methodology",
            "Three approaches: workshops, questionnaires, management analysis",
            "CSA extends audit coverage and promotes control ownership",
            "IS auditors can facilitate, evaluate, or consult on CSA",
            "CSA supplements but does not replace independent auditing",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 1B: AUDIT EVIDENCE AND PROCEDURES
  // ============================================================================

  {
    id: 'CISA1-005',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Evidence Collection',
    description: 'Learn techniques for gathering sufficient and appropriate audit evidence',
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Evidence Types', 'Evidence Quality', 'Collection Techniques', 'Documentation'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Audit conclusions are only as good as the evidence supporting them. Understanding evidence quality and collection techniques is fundamental to effective IS auditing.",
        },
        {
          title: 'Types of Audit Evidence',
          type: 'text',
          content: "**Evidence Categories:**\n\n**Physical Evidence**\n• Observation of processes\n• Inspection of facilities\n• Hardware inventory\n\n**Documentary Evidence**\n• Policies and procedures\n• System logs and reports\n• Contracts and agreements\n\n**Testimonial Evidence**\n• Interviews with staff\n• Management representations\n• Walk-throughs\n\n**Analytical Evidence**\n• Trend analysis\n• Ratio comparisons\n• Data analytics results\n\n**Electronic Evidence**\n• Database queries\n• Configuration files\n• Screen captures",
        },
        {
          title: 'Evidence Quality Hierarchy',
          type: 'table',
          headers: ['Reliability', 'Evidence Type', 'Example'],
          rows: [
            ['Highest', 'External independent confirmation', 'Bank confirmations, vendor verifications'],
            ['High', 'System-generated (immutable)', 'Unalterable audit logs, blockchain'],
            ['Medium-High', 'Internal with strong controls', 'Controlled system reports'],
            ['Medium', 'Internal documents', 'Policies, procedures, internal memos'],
            ['Lower', 'Oral testimony', 'Interviews (should be corroborated)'],
          ],
        },
        {
          title: '🧠 Memory Aid: SCAR',
          type: 'callout',
          content: "**Evidence Must Be SCAR:**\n\n**S**ufficient - Enough to support conclusions\n**C**ompetent - Reliable and relevant\n**A**ppropriate - Suitable for the audit objective\n**R**elevant - Directly relates to the finding\n\n*Good evidence leaves a SCAR on poor controls!*",
        },
        {
          title: 'Evidence Collection Techniques',
          type: 'text',
          content: "**Common IS Audit Techniques:**\n\n**Inquiry**\n• Interviews and questionnaires\n• Written management representations\n• Follow-up on discrepancies\n\n**Observation**\n• Watch processes in action\n• Facility walk-throughs\n• User behavior monitoring\n\n**Inspection**\n• Review documents and records\n• Examine system configurations\n• Analyze code and scripts\n\n**Re-performance**\n• Independently execute controls\n• Recalculate results\n• Test transactions\n\n**Data Analytics**\n• Full population testing\n• Anomaly detection\n• Pattern analysis",
        },
        {
          title: 'Sampling in IS Audits',
          type: 'text',
          content: "**When to Sample:**\n• Population too large for 100% testing\n• Cost-benefit considerations\n• Time constraints\n\n**Sampling Methods:**\n\n**Statistical Sampling**\n• Random sampling\n• Systematic sampling\n• Stratified sampling\n• Allows extrapolation to population\n\n**Non-Statistical (Judgmental)**\n• Based on auditor experience\n• Targeted selections\n• Cannot extrapolate mathematically\n\n**⚠️ Note:** For automated controls, consider testing the control mechanism rather than transactions.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Evidence types: physical, documentary, testimonial, analytical, electronic",
            "External independent evidence is most reliable",
            "Evidence must be SCAR: Sufficient, Competent, Appropriate, Relevant",
            "Common techniques: inquiry, observation, inspection, re-performance, analytics",
            "Choose sampling method based on audit objectives and population characteristics",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-006',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Computer-Assisted Audit Techniques (CAATs)',
    description: 'Master the use of technology tools for IS audit testing and analysis',
    order: 6,
    duration: 55,
    difficulty: 'advanced',
    topics: ['CAATs', 'Data Analytics', 'GAS', 'Continuous Auditing'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "CAATs enable auditors to test 100% of transactions, identify anomalies, and provide deeper insights than traditional sampling. Mastering CAATs is essential for modern IS auditing.",
        },
        {
          title: 'What are CAATs?',
          type: 'text',
          content: "**Definition:**\n\nComputer-Assisted Audit Techniques (CAATs) are automated tools and techniques used to support audit testing, analysis, and reporting.\n\n**Categories of CAATs:**\n\n**1. Generalized Audit Software (GAS)**\n• ACL, IDEA, Arbutus\n• Data extraction and analysis\n• Pre-built audit functions\n\n**2. Test Data/Test Decks**\n• Simulated transactions\n• Test application controls\n• Validate processing logic\n\n**3. Integrated Test Facilities (ITF)**\n• Fictitious entity in live system\n• Test in production\n• Requires careful controls\n\n**4. Parallel Simulation**\n• Replicate application logic\n• Compare results\n• Validate processing accuracy\n\n**5. Embedded Audit Modules**\n• Continuous monitoring code\n• Built into applications\n• Real-time exception capture",
        },
        {
          title: 'CAATs Comparison',
          type: 'table',
          headers: ['Technique', 'Best For', 'Complexity', 'Risk Level'],
          rows: [
            ['GAS', 'Data analysis, exception testing', 'Low-Medium', 'Low'],
            ['Test Data', 'Application control testing', 'Medium', 'Medium'],
            ['ITF', 'Continuous testing in production', 'High', 'High'],
            ['Parallel Simulation', 'Validating complex calculations', 'High', 'Medium'],
            ['Embedded Modules', 'Continuous monitoring', 'Very High', 'High'],
          ],
        },
        {
          title: 'Using Generalized Audit Software',
          type: 'text',
          content: "**Common GAS Functions:**\n\n**Data Extraction**\n• Read various file formats\n• Import from databases\n• Handle large volumes\n\n**Data Analysis**\n• Sorting and filtering\n• Summarization and aging\n• Statistical analysis\n\n**Comparison Functions**\n• Match/merge files\n• Gap detection\n• Duplicate identification\n\n**Calculation Functions**\n• Recalculations\n• Benford's Law analysis\n• Ratio calculations\n\n**Reporting**\n• Exception reports\n• Audit trail documentation\n• Visualization",
        },
        {
          title: 'Continuous Auditing and Monitoring',
          type: 'text',
          content: "**Continuous Auditing:**\nAudit procedures performed in real-time or near real-time on an ongoing basis.\n\n**Continuous Monitoring:**\nManagement's ongoing review of transactions and controls.\n\n**Key Differences:**\n\n• **Continuous Auditing** - Performed by internal audit\n• **Continuous Monitoring** - Performed by management\n• Both leverage automation and data analytics\n• Both enable faster detection of issues\n\n**Implementation Considerations:**\n• Define exception thresholds\n• Establish escalation procedures\n• Integrate with existing systems\n• Balance automation with human judgment",
        },
        {
          title: 'CAATs Implementation Risks',
          type: 'text',
          content: "**Potential Risks:**\n\n**1. Data Integrity**\n• Ensure data is complete and accurate\n• Validate extraction processes\n• Preserve chain of custody\n\n**2. Access and Confidentiality**\n• Protect sensitive data\n• Secure CAAT workstations\n• Document data handling\n\n**3. Production Impact**\n• ITF may affect live systems\n• Test data could corrupt databases\n• Schedule during low-usage periods\n\n**4. Skill Requirements**\n• Training needed for tools\n• Understanding of data structures\n• Programming/scripting skills helpful",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAATs include GAS, test data, ITF, parallel simulation, and embedded modules",
            "GAS is most commonly used for data analysis and exception testing",
            "ITF carries highest risk due to production environment usage",
            "Continuous auditing enables real-time or near real-time testing",
            "Data integrity and confidentiality are critical CAAT considerations",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-007',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Documentation and Workpapers',
    description: 'Learn best practices for documenting audit work and maintaining evidence integrity',
    order: 7,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Workpapers', 'Documentation Standards', 'Retention', 'Quality Review'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Workpapers are the auditor's proof of work. Proper documentation supports findings, enables quality review, and provides legal protection. If it's not documented, it didn't happen!",
        },
        {
          title: 'Purpose of Audit Documentation',
          type: 'text',
          content: "**Workpapers Serve Multiple Purposes:**\n\n**1. Support Conclusions**\n• Evidence for findings\n• Basis for recommendations\n• Foundation for audit opinion\n\n**2. Enable Review**\n• Quality assurance\n• Supervisory oversight\n• Peer review\n\n**3. Provide Continuity**\n• Reference for follow-up\n• Historical baseline\n• Knowledge transfer\n\n**4. Meet Professional Standards**\n• ISACA requirements\n• Regulatory expectations\n• Legal defensibility",
        },
        {
          title: 'Workpaper Content Requirements',
          type: 'text',
          content: "**Each Workpaper Should Include:**\n\n• **Heading** - Audit name, area, date\n• **Objective** - What is being tested\n• **Source** - Where evidence came from\n• **Procedure** - Steps performed\n• **Results** - What was found\n• **Conclusion** - Auditor's assessment\n• **Preparer** - Who did the work\n• **Reviewer** - Who reviewed it\n• **Reference** - Cross-references to other papers\n\n**The \"Stand-Alone\" Test:**\nCould an experienced auditor who was not part of the engagement understand the work performed based solely on the documentation?",
        },
        {
          title: 'Workpaper Organization',
          type: 'table',
          headers: ['Section', 'Contents', 'Purpose'],
          rows: [
            ['Permanent File', 'Charter, org charts, contracts', 'Ongoing reference information'],
            ['Current File', 'Engagement documentation', 'This audit only'],
            ['Planning Papers', 'Risk assessment, audit program', 'Document planning phase'],
            ['Evidence Papers', 'Test results, samples', 'Support for findings'],
            ['Reporting Papers', 'Draft reports, responses', 'Communication documentation'],
          ],
        },
        {
          title: 'Electronic Workpaper Considerations',
          type: 'text',
          content: "**Digital Evidence Challenges:**\n\n**Integrity Controls**\n• Version control\n• Access restrictions\n• Audit trails of changes\n• Digital signatures\n\n**Format Considerations**\n• Standard file formats\n• Screen captures dated/timestamped\n• Database exports validated\n• Encryption for sensitive data\n\n**Storage and Backup**\n• Secure repositories\n• Regular backups\n• Disaster recovery\n• Off-site storage",
        },
        {
          title: 'Retention Requirements',
          type: 'text',
          content: "**Workpaper Retention Guidelines:**\n\n**Minimum Retention:**\n• Varies by jurisdiction and audit type\n• Typically 5-7 years minimum\n• Longer for certain industries\n\n**Factors Influencing Retention:**\n• Regulatory requirements\n• Statute of limitations\n• Ongoing litigation\n• Organizational policy\n\n**Destruction:**\n• Follow approved procedures\n• Document destruction\n• Maintain destruction logs\n• Ensure confidential disposal",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Workpapers support conclusions and enable quality review",
            "Include objective, source, procedure, results, conclusion in each paper",
            "Apply the 'stand-alone test' - would an independent auditor understand?",
            "Organize into permanent and current files with clear indexing",
            "Maintain integrity controls for electronic workpapers",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 1C: AUDIT REPORTING AND COMMUNICATION
  // ============================================================================

  {
    id: 'CISA1-008',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Reporting',
    description: 'Master the structure and content of effective IS audit reports',
    order: 8,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Report Structure', 'Findings', 'Recommendations', 'Report Distribution'],
    blueprintArea: 'CISA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The audit report is the primary deliverable of any audit engagement. An effective report communicates findings clearly, supports recommendations with evidence, and drives positive change.",
        },
        {
          title: 'Audit Report Structure',
          type: 'text',
          content: "**Standard Report Components:**\n\n**1. Executive Summary**\n• Overall assessment\n• Key findings (high-level)\n• Summary of recommendations\n\n**2. Introduction**\n• Audit objectives\n• Scope and methodology\n• Period covered\n• Limitations\n\n**3. Background**\n• Area/system overview\n• Business context\n• Prior audit history\n\n**4. Detailed Findings**\n• Individual issues identified\n• Supporting evidence\n• Root cause analysis\n\n**5. Recommendations**\n• Actionable improvements\n• Prioritized by risk\n• Realistic timelines\n\n**6. Management Response**\n• Agreement/disagreement\n• Planned remediation\n• Target dates",
        },
        {
          title: 'Writing Effective Findings',
          type: 'text',
          content: "**The 5 C's of Finding Writing:**\n\n**Condition**\n• What is the current state?\n• What was observed?\n\n**Criteria**\n• What should be?\n• Standard, policy, or best practice\n\n**Cause**\n• Why did this occur?\n• Root cause analysis\n\n**Consequence**\n• What is the impact/risk?\n• Quantify if possible\n\n**Corrective Action (Recommendation)**\n• What should be done?\n• Specific, measurable, achievable",
        },
        {
          title: '🧠 Memory Aid: The 5 C\'s',
          type: 'callout',
          content: "**\"Condition, Criteria, Cause, Consequence, Corrective Action\"**\n\n*\"Careful Critics Can Construct Change\"*\n\nEvery finding should address all 5 C's to be complete and actionable!",
        },
        {
          title: 'Rating Findings',
          type: 'table',
          headers: ['Rating', 'Definition', 'Response Required'],
          rows: [
            ['Critical/High', 'Significant control weakness, immediate action needed', 'Immediate remediation'],
            ['Moderate/Medium', 'Control deficiency, timely correction needed', '30-90 days typically'],
            ['Low', 'Minor issue, improvement opportunity', 'Next convenient opportunity'],
            ['Observation', 'Not a control issue but noted for management', 'No formal response required'],
          ],
        },
        {
          title: 'Report Distribution and Confidentiality',
          type: 'text',
          content: "**Distribution Considerations:**\n\n**Who Receives Reports:**\n• Process owners (for detailed findings)\n• Senior management (executive summary)\n• Audit committee (per charter)\n• External auditors (if relevant)\n• Regulators (if required)\n\n**Confidentiality Controls:**\n• Mark as confidential\n• Limit distribution\n• Secure transmission\n• Track recipients\n\n**Timing:**\n• Draft for management review\n• Allow response period\n• Issue final promptly\n• Meet reporting deadlines",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Reports include executive summary, introduction, background, findings, recommendations",
            "Use the 5 C's: Condition, Criteria, Cause, Consequence, Corrective Action",
            "Rate findings by severity and required response time",
            "Obtain management responses before finalizing",
            "Control distribution based on confidentiality and need-to-know",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-009',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Follow-Up and Issue Tracking',
    description: 'Learn techniques for tracking remediation and validating issue closure',
    order: 9,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Follow-Up', 'Issue Tracking', 'Validation', 'Escalation'],
    blueprintArea: 'CISA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The value of an audit is only realized when issues are remediated. Effective follow-up ensures that management commitments are honored and risks are actually reduced.",
        },
        {
          title: 'Follow-Up Process',
          type: 'text',
          content: "**Key Follow-Up Activities:**\n\n**1. Track Open Issues**\n• Maintain issue inventory\n• Monitor due dates\n• Report aging status\n\n**2. Verify Remediation**\n• Request evidence of closure\n• Test corrective actions\n• Confirm sustained compliance\n\n**3. Update Status**\n• Document validation results\n• Close resolved issues\n• Re-open if necessary\n\n**4. Escalate as Needed**\n• Report overdue issues\n• Alert appropriate management\n• Present to audit committee",
        },
        {
          title: 'Issue Lifecycle',
          type: 'table',
          headers: ['Status', 'Definition', 'Action Required'],
          rows: [
            ['Open', 'Issue identified, remediation in progress', 'Monitor due date'],
            ['Pending Validation', 'Management reports completion', 'Auditor validates'],
            ['Closed', 'Validated as remediated', 'Archive documentation'],
            ['Overdue', 'Past due date, not remediated', 'Escalation'],
            ['Extended', 'Due date extended with approval', 'Monitor new date'],
            ['Accepted', 'Risk accepted by appropriate authority', 'Document acceptance'],
          ],
        },
        {
          title: 'Escalation Procedures',
          type: 'text',
          content: "**When to Escalate:**\n\n• Issue significantly past due\n• Remediation ineffective\n• Management unwilling to act\n• Risk exceeds acceptable levels\n• Pattern of non-compliance\n\n**Escalation Hierarchy:**\n1. Direct management\n2. Senior management\n3. CIO/CISO\n4. Audit committee\n5. Board of directors\n\n**Documentation:**\n• Reason for escalation\n• History of issue\n• Impact of non-remediation\n• Recommended action",
        },
        {
          title: 'Risk Acceptance',
          type: 'text',
          content: "**When Management Accepts Risk:**\n\n**Requirements:**\n• Appropriate authority level\n• Formal documentation\n• Understanding of consequences\n• Time-limited approval\n\n**Auditor Responsibilities:**\n• Ensure proper authority\n• Document decision\n• Report to audit committee\n• Re-evaluate periodically\n\n**⚠️ Note:** Auditors do not accept risk - they document management's decision to accept risk and report to appropriate governance bodies.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Follow-up ensures audit findings drive actual improvement",
            "Track issues through defined lifecycle statuses",
            "Validate remediation with evidence, not just management assertion",
            "Escalate overdue or unresolved issues through established channels",
            "Risk acceptance requires proper authority and documentation",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-010',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Communication Skills for IS Auditors',
    description: 'Develop effective communication techniques for interviews, presentations, and stakeholder management',
    order: 10,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Interview Techniques', 'Presentations', 'Stakeholder Management', 'Difficult Conversations'],
    blueprintArea: 'CISA1-C',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Technical competence alone doesn't make a successful IS auditor. The ability to communicate findings clearly, interview effectively, and manage stakeholder relationships is equally important.",
        },
        {
          title: 'Interview Techniques',
          type: 'text',
          content: "**Effective Interview Practices:**\n\n**Preparation**\n• Research the area in advance\n• Prepare key questions\n• Review prior documentation\n\n**Opening**\n• Explain purpose clearly\n• Put interviewee at ease\n• Establish rapport\n\n**Questioning Techniques**\n• Start with open-ended questions\n• Use follow-up probes\n• Avoid leading questions\n• Listen actively\n\n**Documentation**\n• Take notes or record (with permission)\n• Verify understanding\n• Follow up on unclear points\n\n**Closing**\n• Summarize key points\n• Ask for additional contacts\n• Thank the interviewee",
        },
        {
          title: 'Question Types',
          type: 'table',
          headers: ['Type', 'Purpose', 'Example'],
          rows: [
            ['Open-ended', 'Gather broad information', '"Describe the change control process"'],
            ['Closed', 'Confirm specific facts', '"Is manager approval required?"'],
            ['Probing', 'Dig deeper', '"Can you tell me more about that?"'],
            ['Clarifying', 'Ensure understanding', '"So you\'re saying that...?"'],
            ['Hypothetical', 'Explore scenarios', '"What would happen if...?"'],
          ],
        },
        {
          title: 'Presenting Audit Results',
          type: 'text',
          content: "**Presentation Best Practices:**\n\n**Audience Awareness**\n• Tailor detail level to audience\n• Speak in business terms, not jargon\n• Focus on impact and risk\n\n**Structure**\n• Lead with conclusions\n• Support with evidence\n• Provide recommendations\n• Allow time for questions\n\n**Handling Pushback**\n• Remain professional and calm\n• Cite specific evidence\n• Focus on facts, not opinions\n• Offer to discuss offline if needed\n\n**Visual Aids**\n• Use charts and graphs appropriately\n• Keep slides simple\n• Avoid reading slides verbatim",
        },
        {
          title: 'Managing Difficult Stakeholders',
          type: 'text',
          content: "**Common Challenges:**\n\n**The Uncooperative Auditee**\n• Build relationship early\n• Explain audit value\n• Escalate if necessary\n\n**The Technically Defensive**\n• Acknowledge their expertise\n• Focus on business risk\n• Collaborate on solutions\n\n**The Senior Executive**\n• Be concise and prepared\n• Focus on strategic impact\n• Have data ready\n\n**The Confrontational**\n• Stay calm and professional\n• Stick to facts\n• Avoid personal attacks\n• Document interactions",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Prepare thoroughly for interviews with research and planned questions",
            "Use open-ended questions first, then probe for details",
            "Tailor presentations to audience level and focus on business impact",
            "Handle difficult stakeholders professionally and document interactions",
            "Communication skills are as important as technical expertise",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 1D: INTERNAL CONTROLS
  // ============================================================================

  {
    id: 'CISA1-011',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Internal Control Frameworks',
    description: 'Understand major control frameworks including COSO and COBIT',
    order: 11,
    duration: 55,
    difficulty: 'advanced',
    topics: ['COSO', 'COBIT', 'Control Objectives', 'Framework Integration'],
    blueprintArea: 'CISA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Control frameworks provide the foundation for evaluating whether controls are adequately designed and operating effectively. COSO and COBIT are the most widely referenced frameworks in IS auditing.",
        },
        {
          title: 'COSO Internal Control Framework',
          type: 'text',
          content: "**COSO Components:**\n\n**1. Control Environment**\n• Tone at the top\n• Organizational structure\n• Ethics and integrity\n• Personnel competence\n\n**2. Risk Assessment**\n• Objective setting\n• Risk identification\n• Risk analysis\n• Change management\n\n**3. Control Activities**\n• Policies and procedures\n• IT controls\n• Physical controls\n• Segregation of duties\n\n**4. Information & Communication**\n• Quality information\n• Internal communication\n• External communication\n\n**5. Monitoring Activities**\n• Ongoing evaluations\n• Separate evaluations\n• Deficiency reporting",
        },
        {
          title: '🧠 Memory Aid: COSO Components',
          type: 'callout',
          content: "**\"CRIME\"**\n\n**C**ontrol Environment\n**R**isk Assessment\n**I**nformation & Communication\n**M**onitoring\n(control activiti)**E**s\n\n*COSO helps you solve the CRIME of poor controls!*",
        },
        {
          title: 'COBIT Framework',
          type: 'text',
          content: "**COBIT 2019 Structure:**\n\nCOBIT (Control Objectives for Information and Related Technologies) is ISACA's framework for IT governance and management.\n\n**Governance Objectives:**\n• EDM01: Ensured Governance Framework Setting\n• EDM02: Ensured Benefits Delivery\n• EDM03: Ensured Risk Optimization\n• EDM04: Ensured Resource Optimization\n• EDM05: Ensured Stakeholder Engagement\n\n**Management Objectives (4 Domains):**\n• APO (Align, Plan, Organize) - 14 objectives\n• BAI (Build, Acquire, Implement) - 11 objectives\n• DSS (Deliver, Service, Support) - 6 objectives\n• MEA (Monitor, Evaluate, Assess) - 4 objectives",
        },
        {
          title: 'Framework Comparison',
          type: 'table',
          headers: ['Aspect', 'COSO', 'COBIT'],
          rows: [
            ['Sponsor', 'Committee of Sponsoring Organizations', 'ISACA'],
            ['Focus', 'Internal control and ERM', 'IT governance and management'],
            ['Audience', 'All organizations', 'IT and business leaders'],
            ['Scope', 'Enterprise-wide controls', 'IT-specific guidance'],
            ['Structure', '5 components, 17 principles', '40 governance/management objectives'],
            ['Use', 'Control framework', 'Governance framework'],
          ],
        },
        {
          title: 'Using Frameworks in Audits',
          type: 'text',
          content: "**Practical Application:**\n\n**COSO for:**\n• Enterprise risk management\n• Internal control evaluations\n• SOX compliance\n• Fraud risk assessment\n\n**COBIT for:**\n• IT governance maturity\n• IT control assessments\n• IT policy development\n• GEIT implementation\n\n**Integration:**\n• COBIT maps to COSO components\n• Use both for comprehensive coverage\n• Reference industry-specific standards\n• Customize for organizational context",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COSO has 5 components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring",
            "COBIT 2019 has 5 governance and 4 management domains with 40 objectives",
            "COSO focuses on enterprise control; COBIT focuses on IT governance",
            "Use COSO for internal control; use COBIT for IT-specific assessments",
            "Frameworks complement each other and should be integrated",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-012',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'IT General Controls',
    description: 'Master the evaluation of IT general controls (ITGCs) that support application controls',
    order: 12,
    duration: 50,
    difficulty: 'advanced',
    topics: ['ITGCs', 'Access Controls', 'Change Management', 'Operations Controls'],
    blueprintArea: 'CISA1-D',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "ITGCs are the foundation upon which application controls rely. If ITGCs are weak, application controls cannot be trusted regardless of their design. ITGCs are heavily tested on the CISA exam!",
        },
        {
          title: 'ITGC Categories',
          type: 'text',
          content: "**Four Primary ITGC Areas:**\n\n**1. Access to Programs and Data**\n• User account management\n• Authentication controls\n• Authorization/access rights\n• Privileged access management\n• Physical access controls\n\n**2. Program Changes**\n• Change management process\n• Testing requirements\n• Approval procedures\n• Emergency change process\n• Segregation of duties\n\n**3. Computer Operations**\n• Job scheduling\n• Backup and recovery\n• Problem management\n• Incident response\n• Environmental controls\n\n**4. Program Development**\n• SDLC methodology\n• Security requirements\n• Testing and QA\n• Implementation controls",
        },
        {
          title: 'ITGCs vs. Application Controls',
          type: 'table',
          headers: ['Aspect', 'IT General Controls', 'Application Controls'],
          rows: [
            ['Scope', 'IT environment-wide', 'Specific application'],
            ['Purpose', 'Support app control effectiveness', 'Ensure transaction accuracy'],
            ['Examples', 'Access management, change control', 'Input validation, calculations'],
            ['Testing', 'Typically tested first', 'Tested after ITGC reliance'],
            ['Impact of Failure', 'All dependent apps affected', 'Specific process affected'],
          ],
        },
        {
          title: 'Access Control Evaluation',
          type: 'text',
          content: "**Key Testing Procedures:**\n\n**User Provisioning**\n• Authorization for new accounts\n• Appropriate access levels\n• Documentation of approvals\n\n**Periodic Review**\n• User access recertification\n• Review of privileged accounts\n• Terminated user removal\n\n**Authentication**\n• Password policy enforcement\n• Multi-factor authentication\n• Failed login handling\n\n**Authorization**\n• Role-based access\n• Least privilege principle\n• Segregation of duties\n\n**Logging and Monitoring**\n• Access logs captured\n• Regular review of logs\n• Alerts for suspicious activity",
        },
        {
          title: 'Change Management Evaluation',
          type: 'text',
          content: "**Control Points to Test:**\n\n**Request and Authorization**\n• Formal change request process\n• Risk assessment\n• Appropriate approvals\n\n**Development and Testing**\n• Separate development environment\n• Test plans and results\n• User acceptance testing\n\n**Migration Controls**\n• Approved deployment\n• Segregation of duties\n• Rollback capability\n\n**Documentation**\n• Updated system documentation\n• Training materials\n• Version control\n\n**Emergency Changes**\n• After-the-fact documentation\n• Review and approval\n• Root cause analysis",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ITGCs include access controls, change management, operations, and development",
            "Weak ITGCs undermine all reliant application controls",
            "Test ITGCs before relying on application controls",
            "Access controls cover provisioning, authentication, authorization, and monitoring",
            "Change management includes request, testing, approval, and migration",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN 1E: AUDIT DATA ANALYTICS AND CAATS
  // ============================================================================

  {
    id: 'CISA1-013',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Computer-Assisted Audit Techniques (CAATs)',
    description: 'Using technology tools to enhance audit efficiency and effectiveness',
    order: 13,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['CAATs', 'GAS', 'Test Data', 'Embedded Audit Modules', 'Parallel Simulation'],
    blueprintArea: 'CISA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "CAATs enable auditors to analyze 100% of transactions rather than samples, identify anomalies that manual review would miss, and significantly improve audit efficiency. Mastery of CAATs is essential for modern IS auditors.",
        },
        {
          title: 'Types of CAATs',
          type: 'table',
          headers: ['CAAT Type', 'Description', 'Best Used For'],
          rows: [
            ['Generalized Audit Software (GAS)', 'Tools like ACL, IDEA that analyze data files', 'Testing entire populations, exception reporting'],
            ['Test Data Method', 'Processing fictitious transactions through production', 'Testing application controls and logic'],
            ['Integrated Test Facility (ITF)', 'Dummy entity within live system for testing', 'Continuous testing without affecting production'],
            ['Parallel Simulation', 'Reprocessing data with auditor-controlled logic', 'Verifying processing accuracy'],
            ['Embedded Audit Modules', 'Audit code built into production systems', 'Real-time monitoring, continuous auditing'],
          ],
        },
        {
          title: 'Generalized Audit Software (GAS)',
          type: 'text',
          content: "**GAS Capabilities:**\n\n**Data Analysis**\n• Import various file formats\n• Join/merge multiple files\n• Filter and query data\n• Statistical sampling\n\n**Audit Tests**\n• Duplicate detection\n• Gap analysis (missing sequences)\n• Calculation verification\n• Aging analysis\n• Stratification\n\n**Reporting**\n• Exception reports\n• Summary statistics\n• Trend analysis\n• Visualization\n\n**Common Tools:**\n• ACL Analytics\n• IDEA\n• TeamMate Analytics\n• Excel (with limitations)",
        },
        {
          title: 'Test Data Approach',
          type: 'text',
          content: "**Test Data Methodology:**\n\n**Approach**\n• Create transactions covering all control conditions\n• Include valid, invalid, and boundary cases\n• Process through production or copy of production\n• Compare results to expected outcomes\n\n**Considerations**\n• May require data removal after testing\n• Coordinate with IT to avoid production impact\n• Document all test transactions\n• Ensure data represents real scenarios\n\n**Advantages**\n• Tests actual application logic\n• Verifies control effectiveness\n• Identifies processing errors\n\n**Disadvantages**\n• Point-in-time testing only\n• May not cover all scenarios\n• Requires careful planning",
        },
        {
          title: 'Integrated Test Facility (ITF)',
          type: 'text',
          content: "**ITF Concept:**\n\n**How It Works**\n• Create dummy department/entity in live system\n• Process test transactions through production\n• System processes alongside real transactions\n• Results verified against expected outcomes\n\n**Key Requirements**\n• Transactions must be reversed/removed\n• Cannot affect production reports/totals\n• Requires coordination with IT\n• Needs careful design to avoid detection\n\n**Advantages**\n• Tests actual production environment\n• Can be used for continuous testing\n• Realistic processing conditions\n\n**Risks**\n• May contaminate production data\n• Requires careful control\n• Complex to implement correctly",
        },
        {
          title: 'Parallel Simulation',
          type: 'text',
          content: "**Parallel Simulation:**\n\n**Methodology**\n• Auditor writes own program logic\n• Reprocesses actual production data\n• Compares results to production output\n• Differences indicate potential issues\n\n**When to Use**\n• Verifying complex calculations\n• Testing application logic accuracy\n• When source code review isn't feasible\n• Validating critical processing\n\n**Requirements**\n• Understanding of business rules\n• Access to production data\n• Programming/scripting skills\n• Independent calculation capability",
        },
        {
          title: '🧠 Memory Aid: CAATs - TIGER',
          type: 'callout',
          content: "**T-I-G-E-R:**\n• **T**est data - Fictitious transactions\n• **I**TF - Dummy entity in live system\n• **G**AS - General audit software\n• **E**mbedded - Built-in audit modules\n• **R**eprocessing - Parallel simulation",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAATs include GAS, test data, ITF, parallel simulation, and embedded modules",
            "GAS tools like ACL and IDEA enable 100% population testing",
            "Test data validates application logic using controlled transactions",
            "ITF creates dummy entities for continuous testing in production",
            "Parallel simulation reprocesses data with auditor-controlled logic",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-014',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Data Analytics',
    description: 'Leveraging data analytics for enhanced audit insights',
    order: 14,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Data Analytics', 'Continuous Auditing', 'Data Visualization', 'Anomaly Detection'],
    blueprintArea: 'CISA1-E',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Data analytics transforms auditing from sample-based to full-population analysis, enabling earlier detection of issues and more impactful insights. Organizations expect auditors to leverage analytics for deeper, data-driven conclusions.",
        },
        {
          title: 'Analytics Maturity Model',
          type: 'table',
          headers: ['Level', 'Capability', 'Examples'],
          rows: [
            ['Descriptive', 'What happened?', 'Historical reports, dashboards, KPIs'],
            ['Diagnostic', 'Why did it happen?', 'Root cause analysis, drill-down, correlation'],
            ['Predictive', 'What will happen?', 'Risk scoring, trend forecasting, pattern detection'],
            ['Prescriptive', 'What should we do?', 'Recommended actions, optimization, automation'],
          ],
        },
        {
          title: 'Common Audit Analytics Tests',
          type: 'text',
          content: "**High-Value Analytics:**\n\n**Duplicate Detection**\n• Same invoice/check number\n• Same amount to same vendor\n• Same employee reimbursement\n\n**Benford's Law Analysis**\n• First-digit frequency analysis\n• Detects fabricated numbers\n• Flags unusual distributions\n\n**Gap/Sequence Analysis**\n• Missing check numbers\n• Gaps in invoice sequences\n• Missing transaction IDs\n\n**Stratification/Aging**\n• Age of receivables/payables\n• Transaction size distribution\n• Vendor payment patterns\n\n**Three-Way Matching**\n• PO vs. Receipt vs. Invoice\n• Price/quantity variances\n• Unauthorized purchases",
        },
        {
          title: 'Continuous Auditing vs. Continuous Monitoring',
          type: 'text',
          content: "**Key Distinctions:**\n\n**Continuous Auditing**\n• Performed by internal audit\n• Provides assurance\n• Risk-based approach\n• Independent assessment\n• Periodic or real-time\n\n**Continuous Monitoring**\n• Performed by management\n• Operational oversight\n• Control self-assessment\n• First line responsibility\n• Usually real-time\n\n**Benefits:**\n• Earlier problem detection\n• Reduced time lag\n• Better risk coverage\n• More efficient use of resources\n• Enhanced assurance\n\n**Requirements:**\n• Data access\n• Automation tools\n• Defined thresholds\n• Exception handling process",
        },
        {
          title: 'Data Visualization for Audit',
          type: 'text',
          content: "**Visualization Types:**\n\n**Dashboards**\n• Real-time KPIs\n• Status indicators\n• Drill-down capability\n• Executive summaries\n\n**Charts for Audit**\n• Trend lines for patterns\n• Heat maps for concentrations\n• Scatter plots for outliers\n• Histograms for distributions\n\n**Network Analysis**\n• Relationship mapping\n• Fraud pattern detection\n• Vendor/employee connections\n• Transaction flows\n\n**Tools:**\n• Tableau, Power BI\n• Python (matplotlib, seaborn)\n• ACL/IDEA visualization\n• Excel charts",
        },
        {
          title: 'Building an Analytics Program',
          type: 'text',
          content: "**Implementation Steps:**\n\n**1. Define Objectives**\n• Risk areas to address\n• Questions to answer\n• Expected outcomes\n\n**2. Assess Data**\n• Availability and access\n• Quality and completeness\n• Format and structure\n\n**3. Select Tools**\n• Build vs. buy decision\n• Skills requirements\n• Integration needs\n\n**4. Develop Analytics**\n• Start with high-value tests\n• Validate results\n• Document methodology\n\n**5. Operationalize**\n• Automate where possible\n• Train audit team\n• Measure effectiveness\n• Continuous improvement",
        },
        {
          title: '🧠 Memory Aid: Analytics Process - DECIDE',
          type: 'callout',
          content: "**D-E-C-I-D-E:**\n• **D**efine objectives\n• **E**xtract data\n• **C**leanse and prepare\n• **I**nvestigate and analyze\n• **D**ocument findings\n• **E**valuate and report",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Analytics maturity: descriptive, diagnostic, predictive, prescriptive",
            "Key tests: duplicates, Benford's Law, gaps, stratification, matching",
            "Continuous auditing provides assurance; continuous monitoring is management's responsibility",
            "Visualization transforms data into actionable audit insights",
            "Successful analytics programs require clear objectives, quality data, and proper tools",
          ],
        },
      ],
    },
  },
];

export default cisa1Lessons;
