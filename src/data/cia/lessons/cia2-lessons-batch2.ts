/**
 * CIA Part 2: Practice of Internal Auditing - Batch 2
 * Additional lessons for Part 2 domains
 */

import { Lesson } from '../../../types';

export const cia2LessonsBatch2: Lesson[] = [
  // ============================================================================
  // DOMAIN I: MANAGING THE INTERNAL AUDIT FUNCTION - Additional Lessons
  // ============================================================================
  {
    id: 'CIA2-I-020',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Strategic Internal Audit Planning',
    description: 'Learn how to develop and maintain a strategic internal audit plan',
    order: 20,
    duration: 40,
    difficulty: 'advanced',
    topics: ['Strategic planning', 'Resource planning', 'Long-term objectives', 'Stakeholder expectations'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'Strategic vs. Annual Planning',
          type: 'text',
          content: "**Strategic Planning (3-5 years)**\n• Long-term vision and direction\n• Resource and capability development\n• Alignment with organizational strategy\n• Technology and methodology evolution\n\n**Annual Audit Planning**\n• Specific engagements for the year\n• Resource allocation\n• Risk-based prioritization\n• Approved by the board\n\nBoth are essential and interconnected.",
        },
        {
          title: 'Strategic Planning Elements',
          type: 'text',
          content: "**Key components of a strategic audit plan:**\n\n1. **Mission and Vision**\n   • What IA aspires to become\n   • Value proposition to organization\n\n2. **Stakeholder Analysis**\n   • Board and audit committee expectations\n   • Senior management needs\n   • Regulatory requirements\n\n3. **Capability Assessment**\n   • Current strengths and gaps\n   • Competency development needs\n   • Technology requirements\n\n4. **Strategic Objectives**\n   • Measurable goals\n   • Key performance indicators\n   • Success measures",
        },
        {
          title: 'Aligning with Organizational Strategy',
          type: 'callout',
          content: 'The internal audit strategy should reflect and support the organization\'s strategic plan. As the organization grows, acquires, or transforms, internal audit must evolve alongside.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Strategic planning is 3-5 year horizon',
            'Must align with organizational strategy',
            'Includes capability and resource development',
            'Different from but connected to annual plans',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-I-021',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Resource Management and Budgeting',
    description: 'Master internal audit resource management including budgeting and staffing',
    order: 21,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Budgeting', 'Staffing', 'Outsourcing', 'Co-sourcing'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'Resource Planning Fundamentals',
          type: 'text',
          content: "**Resource planning must consider:**\n• Audit plan requirements\n• Available internal staff\n• Skill sets needed\n• Budget constraints\n• External resource options\n\n**Key Questions:**\n• Do we have enough people?\n• Do we have the right skills?\n• What gaps exist?\n• How will we address gaps?",
        },
        {
          title: 'Sourcing Models',
          type: 'table',
          headers: ['Model', 'Description', 'When Appropriate'],
          rows: [
            ['In-house', 'All staff are employees', 'Stable, ongoing needs; sensitive matters'],
            ['Outsourcing', 'External provider performs IA', 'Smaller organizations; specialized skills'],
            ['Co-sourcing', 'Blended internal/external', 'Flexibility; specialized expertise needed'],
            ['Guest Auditors', 'Temporary internal rotations', 'Special projects; development opportunity'],
          ],
        },
        {
          title: 'Budget Considerations',
          type: 'text',
          content: "**Typical IA budget components:**\n• Salaries and benefits\n• Training and development\n• Technology and software\n• Travel expenses\n• Professional services\n• Certifications and memberships\n\n**CAE responsibilities:**\n• Develop realistic budget\n• Align with audit plan\n• Monitor spending\n• Report variances\n• Justify resource requests",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Resource planning aligns with audit plan',
            'Multiple sourcing models available',
            'Budget must support plan execution',
            'CAE accountable for resource management',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-I-022',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Performance Metrics and KPIs',
    description: 'Learn how to measure and report internal audit performance',
    order: 22,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['KPIs', 'Performance measurement', 'Reporting', 'Balanced scorecard'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'Why Measure Performance?',
          type: 'text',
          content: "**Benefits of performance measurement:**\n• Demonstrates value to stakeholders\n• Identifies improvement opportunities\n• Supports resource justification\n• Enables benchmarking\n• Drives accountability\n\n**Key principle:** You can't manage what you don't measure.",
        },
        {
          title: 'Common Internal Audit KPIs',
          type: 'table',
          headers: ['Category', 'KPI Examples'],
          rows: [
            ['Efficiency', 'Audit plan completion %; Cost per audit hour'],
            ['Timeliness', 'Reports issued within X days; Cycle time'],
            ['Quality', 'Customer satisfaction scores; QA results'],
            ['Effectiveness', 'Recommendations accepted %; Issues closed'],
            ['Value', 'Cost savings identified; Risk issues prevented'],
          ],
        },
        {
          title: 'Balanced Scorecard Approach',
          type: 'text',
          content: "**Four Perspectives for IA:**\n\n**1. Stakeholder Perspective**\n• Satisfaction scores\n• Value perception surveys\n\n**2. Internal Process Perspective**\n• Audit plan completion\n• Report timeliness\n\n**3. Learning & Growth Perspective**\n• Training hours\n• Certification rates\n\n**4. Financial Perspective**\n• Budget adherence\n• Cost efficiency",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Performance measurement demonstrates IA value',
            'KPIs should cover efficiency, quality, and effectiveness',
            'Balanced scorecard provides holistic view',
            'Metrics should be meaningful and actionable',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN II: PLANNING THE ENGAGEMENT - Additional Lessons
  // ============================================================================
  {
    id: 'CIA2-II-023',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Audit Objectives and Scope Development',
    description: 'Learn how to establish effective engagement objectives and scope',
    order: 23,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Objectives development', 'Scope definition', 'Criteria establishment', 'Constraints'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Establishing Objectives',
          type: 'text',
          content: "**Engagement objectives should be:**\n\n• **Specific** - Clearly define what will be examined\n• **Measurable** - Allow for conclusion of results\n• **Achievable** - Realistic given resources\n• **Relevant** - Address significant risks\n• **Time-bound** - Within project timeline\n\n**Types of objectives:**\n• Evaluate control effectiveness\n• Assess compliance with policies\n• Identify process efficiencies\n• Verify accuracy of information",
        },
        {
          title: 'Defining Scope',
          type: 'text',
          content: "**Scope elements to define:**\n\n• **Activities** - Processes, functions to audit\n• **Systems** - IT applications in scope\n• **Locations** - Physical sites or locations\n• **Time period** - Dates covered by review\n• **Transactions** - Types or populations reviewed\n\n**Scope considerations:**\n• Risk assessment results\n• Available resources\n• Client requests\n• Prior audit findings",
        },
        {
          title: 'Scope Limitations',
          type: 'callout',
          content: 'Any scope limitations must be documented and communicated. If limitations are imposed by management, the CAE should discuss with the audit committee.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Objectives should be SMART (Specific, Measurable, etc.)',
            'Scope defines boundaries of the engagement',
            'Scope must be documented in the work program',
            'Limitations must be disclosed in reports',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-II-024',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Preliminary Survey and Understanding the Auditee',
    description: 'Master techniques for conducting preliminary surveys and gathering background information',
    order: 24,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Preliminary survey', 'Walkthrough', 'Process understanding', 'Documentation review'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Purpose of Preliminary Survey',
          type: 'text',
          content: "**The preliminary survey helps auditors:**\n\n• Understand the auditee's operations\n• Identify key risks and controls\n• Determine appropriate audit scope\n• Plan efficient audit procedures\n• Build rapport with management\n\n**This phase occurs after the engagement is assigned but before detailed testing begins.**",
        },
        {
          title: 'Information Gathering Techniques',
          type: 'text',
          content: "**1. Document Review**\n• Policies and procedures\n• Organization charts\n• Prior audit reports\n• Process flow diagrams\n• Performance reports\n\n**2. Interviews**\n• Process owners\n• Key personnel\n• Management\n\n**3. Observation**\n• Physical walkthroughs\n• Process observation\n• Facility tours\n\n**4. Analytical Review**\n• Trend analysis\n• Ratio analysis\n• Benchmarking",
        },
        {
          title: 'Walkthrough Procedures',
          type: 'text',
          content: "**A walkthrough involves:**\n\n1. Select a single transaction\n2. Trace it through the entire process\n3. Observe controls at each point\n4. Verify understanding matches reality\n5. Document the process flow\n\n**Benefits:**\n• Confirms process understanding\n• Identifies control points\n• Detects process variations",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Preliminary survey occurs before detailed testing',
            'Multiple techniques: document review, interviews, observation',
            'Walkthroughs confirm process understanding',
            'Results inform scope and audit program',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-II-025',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Engagement Work Programs',
    description: 'Learn how to develop and use audit work programs effectively',
    order: 25,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Work programs', 'Audit procedures', 'Program design', 'Flexibility'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'What is an Audit Work Program?',
          type: 'text',
          content: "**An audit work program is:**\n\nA document that lists procedures to be performed during an engagement. It serves as a guide for audit work and a means of controlling and recording proper execution.\n\n**Key purposes:**\n• Guide execution of audit work\n• Document planned procedures\n• Enable supervision and review\n• Provide record of work performed\n• Support quality and consistency",
        },
        {
          title: 'Work Program Elements',
          type: 'text',
          content: "**Each audit step should include:**\n\n1. **Objective** - What the step is designed to accomplish\n2. **Procedure** - Specific actions to perform\n3. **Sample/Population** - What will be tested\n4. **Criteria** - Standard against which results measured\n5. **Documentation** - Evidence to retain\n\n**Step Example:**\n*Objective:* Verify segregation of duties\n*Procedure:* Review access rights for inventory system\n*Sample:* All users with inventory access\n*Criteria:* Policy requires no user has both create and approve access\n*Workpaper:* Access control report with analysis",
        },
        {
          title: 'Standard vs. Custom Programs',
          type: 'callout',
          content: 'Standard work programs can improve efficiency but must be tailored to specific engagement circumstances. Never apply a standard program without considering the unique risks of the auditee.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Work programs guide and document audit procedures',
            'Include objectives, procedures, samples, and criteria',
            'Standard programs must be tailored to circumstances',
            'Programs should be flexible for emerging issues',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN III: PERFORMING THE ENGAGEMENT - Additional Lessons
  // ============================================================================
  {
    id: 'CIA2-III-026',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Audit Sampling Techniques',
    description: 'Master sampling methods for internal audit engagements',
    order: 26,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Statistical sampling', 'Non-statistical sampling', 'Sample size', 'Sampling risk'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why Sample?',
          type: 'text',
          content: "Auditors sample because testing 100% of a population is often:\n• Too time-consuming\n• Too costly\n• Unnecessary to form conclusions\n\n**Sampling allows auditors to examine a portion of a population and draw conclusions about the whole.**",
        },
        {
          title: 'Sampling Approaches',
          type: 'table',
          headers: ['Approach', 'Description', 'Advantage'],
          rows: [
            ['Statistical', 'Uses probability theory; results can be quantified', 'Objective, defensible conclusions'],
            ['Non-Statistical', 'Judgmental selection; results cannot be quantified', 'Flexible, simpler to apply'],
            ['Attributes Sampling', 'Tests control operation (yes/no)', 'Compliance testing'],
            ['Variables Sampling', 'Tests monetary amounts', 'Substantive testing'],
          ],
        },
        {
          title: 'Sample Size Factors',
          type: 'text',
          content: "**Sample size depends on:**\n\n**For Attributes Sampling:**\n• Expected deviation rate (EDR)\n• Tolerable deviation rate (TDR)\n• Confidence level desired\n• Population size (minimal impact)\n\n**For Variables Sampling:**\n• Tolerable misstatement\n• Expected misstatement\n• Confidence level\n• Population variability",
        },
        {
          title: 'Sampling Risk',
          type: 'text',
          content: "**Sampling risk** is the risk that conclusions differ from what they would be if the entire population were tested.\n\n**Two types:**\n• Risk of assessing control risk too low (auditor fails to detect a problem)\n• Risk of assessing control risk too high (auditor concludes problem exists when it doesn't)\n\n**Reduced by:**\n• Larger sample sizes\n• Higher confidence levels\n• Proper sampling techniques",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Sampling enables efficient population conclusions',
            'Statistical sampling provides quantifiable results',
            'Sample size based on risk tolerance and confidence',
            'Sampling risk exists but can be managed',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-III-027',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Data Analytics in Internal Audit',
    description: 'Learn how to leverage data analytics for audit testing and insights',
    order: 27,
    duration: 40,
    difficulty: 'advanced',
    topics: ['Data analytics', 'CAATs', 'Continuous auditing', 'Data visualization'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'What is Audit Data Analytics?',
          type: 'text',
          content: "**Audit Data Analytics (ADA)** uses data science techniques to:\n\n• Identify patterns and anomalies\n• Test entire populations\n• Detect fraud indicators\n• Provide insights for management\n\n**Common techniques:**\n• Trend analysis\n• Benford's Law application\n• Duplicate detection\n• Gap analysis\n• Outlier identification",
        },
        {
          title: 'Analytics Process',
          type: 'text',
          content: "**1. Define Objective**\nWhat question are you trying to answer?\n\n**2. Obtain Data**\nExtract relevant data from source systems\n\n**3. Validate Data**\nEnsure data integrity and completeness\n\n**4. Analyze Data**\nApply appropriate analytical techniques\n\n**5. Interpret Results**\nDraw conclusions and identify exceptions\n\n**6. Document and Report**\nIncorporate findings into audit work and reports",
        },
        {
          title: 'Common Analytics Applications',
          type: 'table',
          headers: ['Application', 'Example Use'],
          rows: [
            ['Duplicate testing', 'Find duplicate payments or vendor numbers'],
            ['Stratification', 'Segment transactions by risk characteristics'],
            ['Gap detection', 'Identify missing sequence numbers'],
            ['Trend analysis', 'Compare patterns over time periods'],
            ['Relationship analysis', 'Identify unexpected correlations'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Analytics enables 100% population testing',
            'Process: define, obtain, validate, analyze, interpret, document',
            'Common uses: duplicates, gaps, trends, outliers',
            'Requires data quality validation',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-III-028',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Interview Techniques',
    description: 'Master effective interviewing skills for audit engagements',
    order: 28,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Interview techniques', 'Questioning', 'Active listening', 'Documentation'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Interview Planning',
          type: 'text',
          content: "**Before the interview:**\n\n• Identify interview objectives\n• Research the interviewee and their role\n• Prepare key questions\n• Review relevant documentation\n• Schedule appropriate time and location\n• Consider who should attend\n\n**Set a professional tone from the start.**",
        },
        {
          title: 'Question Types',
          type: 'text',
          content: "**Open-Ended Questions**\n• Encourage detailed responses\n• 'How do you process vendor invoices?'\n• 'What controls exist to prevent fraud?'\n\n**Closed Questions**\n• Confirm specific facts\n• 'Do you approve all purchases over $5,000?'\n• 'Is the reconciliation prepared monthly?'\n\n**Probing Questions**\n• Dig deeper into responses\n• 'Can you give me an example?'\n• 'What happens when an exception occurs?'",
        },
        {
          title: 'Active Listening',
          type: 'callout',
          content: 'Effective interviewers listen more than they talk. Focus on understanding responses, ask follow-up questions, and watch for non-verbal cues that may indicate discomfort or deception.',
        },
        {
          title: 'Interview Documentation',
          type: 'text',
          content: "**During and after interviews:**\n\n• Take notes during the interview\n• Document key points immediately after\n• Distinguish facts from opinions\n• Note any areas requiring follow-up\n• Consider having interviewee review summary\n• Maintain confidentiality as appropriate",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Plan and prepare before interviews',
            'Use mix of open, closed, and probing questions',
            'Active listening is essential',
            'Document key points promptly',
          ],
        },
      ],
    },
  },
  // ============================================================================
  // DOMAIN IV: COMMUNICATING RESULTS - Additional Lessons
  // ============================================================================
  {
    id: 'CIA2-IV-029',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Audit Report Writing Fundamentals',
    description: 'Learn the principles and best practices for writing effective audit reports',
    order: 29,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Report writing', 'Report structure', 'Clarity', 'Audience'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Report Quality Attributes',
          type: 'text',
          content: "**Effective audit reports are:**\n\n• **Accurate** - Factually correct, supported by evidence\n• **Objective** - Unbiased, balanced presentation\n• **Clear** - Easy to understand\n• **Concise** - No unnecessary detail\n• **Constructive** - Focus on improvement\n• **Complete** - Contains all relevant information\n• **Timely** - Issued promptly",
        },
        {
          title: 'Report Elements',
          type: 'text',
          content: "**Standard report components:**\n\n1. **Executive Summary**\n   • Overall conclusion\n   • Key findings highlight\n   • Significant recommendations\n\n2. **Background/Scope**\n   • Audit objectives\n   • Scope and methodology\n   • Period covered\n\n3. **Findings**\n   • Condition, criteria, cause, effect\n   • Supporting evidence\n   • Recommendations\n   • Management responses\n\n4. **Appendices**\n   • Detailed analysis\n   • Supporting data",
        },
        {
          title: 'Writing Tips',
          type: 'callout',
          content: '• Use active voice\n• Avoid jargon and acronyms\n• Lead with the most important information\n• Use bullets and headings for readability\n• Keep sentences short\n• Have someone review before issuing',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Reports must be accurate, clear, concise, timely',
            'Include executive summary, background, findings',
            'Use active voice and plain language',
            'Structure for readability',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-IV-030',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Finding Development Using the 5 Cs',
    description: 'Master the condition-criteria-cause-consequence-corrective action model',
    order: 30,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Finding development', '5 Cs', 'Root cause', 'Recommendations'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'The 5 Cs of Findings',
          type: 'text',
          content: "**Well-developed audit findings contain five elements:**\n\n**1. Condition (What is?)**\nThe current state or situation observed\n\n**2. Criteria (What should be?)**\nThe standard, policy, or expectation\n\n**3. Cause (Why?)**\nThe reason for the difference between condition and criteria\n\n**4. Consequence/Effect (So what?)**\nThe impact or risk of the condition\n\n**5. Corrective Action (Now what?)**\nThe recommended improvement or correction",
        },
        {
          title: 'Example Finding',
          type: 'text',
          content: "**Condition:** 15 of 50 purchase orders (30%) were processed without required approvals.\n\n**Criteria:** Policy requires supervisor approval for all purchases over $500.\n\n**Cause:** The approval workflow was disabled during a system upgrade and not re-enabled.\n\n**Consequence:** Unauthorized purchases may occur, leading to potential fraud or budget overruns.\n\n**Recommendation:** Re-enable the approval workflow immediately and implement controls to verify workflow status after system changes.",
        },
        {
          title: 'Root Cause Analysis',
          type: 'callout',
          content: 'Identifying the root cause—not just the symptom—enables effective recommendations. Ask "why" multiple times to drill down to the underlying cause.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            '5 Cs: Condition, Criteria, Cause, Consequence, Corrective Action',
            'All elements should be present in significant findings',
            'Root cause analysis improves recommendations',
            'Quantify condition when possible',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-IV-031',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Management Action Plans and Follow-Up',
    description: 'Learn how to obtain management responses and monitor issue remediation',
    order: 31,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Management response', 'Action plans', 'Follow-up', 'Issue tracking'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Management Response Process',
          type: 'text',
          content: "**Obtaining Management Responses:**\n\n1. Share draft findings with management\n2. Allow time for review and response\n3. Discuss disagreements constructively\n4. Document responses in final report\n5. Escalate unresolved disagreements\n\n**Management responses should include:**\n• Agreement or disagreement with finding\n• Specific corrective actions planned\n• Responsible parties\n• Target completion dates",
        },
        {
          title: 'Follow-Up Process',
          type: 'text',
          content: "**Internal audit should:**\n\n• Track all open audit issues\n• Obtain status updates periodically\n• Verify implementation of corrective actions\n• Report status to the board\n• Escalate unaddressed significant risks\n\n**Verification methods:**\n• Review documentation\n• Re-perform testing\n• Interview personnel\n• Observe changed processes",
        },
        {
          title: 'When Management Accepts Risk',
          type: 'callout',
          content: 'If management decides not to address a finding, this is accepting the risk. The CAE should determine if the residual risk is acceptable and, if not, escalate to senior management and the board.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Management responses are documented in reports',
            'Action plans must include specific actions, owners, dates',
            'Follow-up verifies implementation',
            'Unaddressed risks should be escalated',
          ],
        },
      ],
    },
  },
  {
    id: 'CIA2-IV-032',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Rating Findings and Report Opinions',
    description: 'Understand how to rate findings and form overall audit opinions',
    order: 32,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Finding ratings', 'Risk ratings', 'Overall opinion', 'Rating scale'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Finding Rating Purposes',
          type: 'text',
          content: "**Why rate findings?**\n\n• Helps management prioritize remediation\n• Enables consistent communication\n• Supports risk-based reporting\n• Facilitates tracking and trending\n\n**Common rating schemes:**\n• High/Medium/Low\n• Critical/Major/Minor\n• Numeric scales (1-5)",
        },
        {
          title: 'Rating Criteria',
          type: 'table',
          headers: ['Rating', 'Description', 'Action Expected'],
          rows: [
            ['High/Critical', 'Significant control weakness; material risk', 'Immediate action required'],
            ['Medium/Moderate', 'Control deficiency; notable risk exposure', 'Timely remediation expected'],
            ['Low/Minor', 'Opportunity for improvement; limited risk', 'Discretionary action'],
          ],
        },
        {
          title: 'Overall Audit Opinions',
          type: 'text',
          content: "**Some organizations use overall engagement opinions:**\n\n• **Satisfactory** - Controls operating effectively\n• **Needs Improvement** - Control deficiencies exist\n• **Unsatisfactory** - Significant control failures\n\n**Considerations:**\n• Should be used consistently\n• Must be supported by findings\n• Should be clearly defined\n• May not be appropriate for all engagements",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            'Ratings help prioritize management attention',
            'Consistent rating criteria improve comparability',
            'Overall opinions summarize engagement results',
            'Ratings must be supported by evidence',
          ],
        },
      ],
    },
  },
];

export default cia2LessonsBatch2;
