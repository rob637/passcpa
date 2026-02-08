/**
 * CIA Part 2: Practice of Internal Auditing
 * 100 questions | 2 hours | Scaled score 600/750 to pass
 * 
 * Domain I: Managing the Internal Audit Activity (20%)
 * Domain II: Planning the Engagement (20%)
 * Domain III: Performing the Engagement (40%)
 * Domain IV: Communicating Results and Monitoring Progress (20%)
 * 
 * Based on IIA Global Internal Audit Standards (2024)
 */

import { Lesson } from '../../../types';

export const cia2Lessons: Lesson[] = [
  // ============================================================================
  // DOMAIN I: MANAGING THE INTERNAL AUDIT ACTIVITY (20%)
  // ============================================================================
  
  {
    id: 'CIA2-I-001',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Planning the Internal Audit Activity',
    description: 'Understand how to develop risk-based audit plans and manage resources',
    order: 1,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Audit planning', 'Risk-based planning', 'Annual audit plan', 'Standard 2010'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The annual audit plan determines WHERE internal audit focuses resources. A risk-based plan ensures limited audit resources address the most significant risks. This is fundamental CAE responsibility!",
        },
        {
          title: 'Risk-Based Audit Planning',
          type: 'text',
          content: "**Standard 2010:**\n\nThe CAE must establish a risk-based plan to determine the priorities of the internal audit activity, consistent with the organization's goals.\n\n**Key elements:**\n• Aligned with organizational strategy\n• Based on risk assessment\n• Considers input from senior management and Board\n• Reviewed and adjusted as needed",
        },
        {
          title: 'Risk Assessment for Planning',
          type: 'text',
          content: "**Standard 2010.A1:**\n\nThe internal audit activity's plan must be based on a documented risk assessment, undertaken at least annually.\n\n**Risk factors to consider:**\n• Impact (financial, reputational, operational)\n• Likelihood of occurrence\n• Velocity (speed of impact)\n• Time since last audit\n• Management concerns\n• Regulatory requirements\n• Strategic importance",
        },
        {
          title: 'Developing the Audit Plan',
          type: 'table',
          headers: ['Step', 'Activity', 'Output'],
          rows: [
            ['1', 'Update the audit universe', 'Complete list of auditable entities'],
            ['2', 'Perform risk assessment', 'Risk-ranked audit universe'],
            ['3', 'Determine available resources', 'Resource capacity analysis'],
            ['4', 'Prioritize and select audits', 'Draft audit plan'],
            ['5', 'Obtain input from management/Board', 'Refined plan'],
            ['6', 'Present to Board for approval', 'Approved annual audit plan'],
          ],
        },
        {
          title: 'The Audit Universe',
          type: 'text',
          content: "**Definition:**\nAll possible auditable areas within the organization.\n\n**May include:**\n• Business units and locations\n• Processes and functions\n• Systems and applications\n• Projects and initiatives\n• Compliance areas\n• Third-party relationships\n\n**Best practice:**\n• Update at least annually\n• Consider organizational changes\n• Align with business structure",
        },
        {
          title: '🧠 Memory Aid: Risk-Based Planning',
          type: 'callout',
          content: "**\"DIAL\"** for prioritization:\n\n**D**irect risk factors (impact, likelihood)\n**I**nterval since last audit\n**A**udit resources available\n**L**egislative/regulatory requirements\n\n*Dial up the audits that matter most!*",
        },
        {
          title: 'Communicating the Plan',
          type: 'text',
          content: "**Standard 2020:**\n\nThe CAE must communicate the internal audit activity's plans and resource requirements to senior management and the Board for review and approval.\n\n**Also communicate:**\n• Significant interim changes\n• Impact of resource limitations\n• Any scope limitations\n\n**Board approval required:**\n• Annual audit plan\n• Significant plan changes\n• Resource requirements",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Audit plan must be risk-based and documented",
            "Risk assessment required at least annually",
            "Board approves the annual audit plan",
            "Audit universe = all auditable entities",
            "Consider: impact, likelihood, time since last audit, resources",
            "Communicate resource limitations and changes to Board",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA2-I-002',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Resource Management',
    description: 'Understand resource allocation, staffing, and outsourcing considerations',
    order: 2,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Resource management', 'Staffing', 'Co-sourcing', 'Outsourcing', 'Standard 2030'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Internal audit must have the RIGHT people with the RIGHT skills to execute the audit plan. Understanding resource options (in-house, co-source, outsource) is critical for CAE success.",
        },
        {
          title: 'Resource Management Requirements',
          type: 'text',
          content: "**Standard 2030:**\n\nThe CAE must ensure that internal audit resources are appropriate, sufficient, and effectively deployed to achieve the approved plan.\n\n**Resources include:**\n• Personnel (staff)\n• Technology and tools\n• Financial budget\n• Time allocation",
        },
        {
          title: 'Staffing Considerations',
          type: 'table',
          headers: ['Factor', 'Consideration', 'Example'],
          rows: [
            ['Competency', 'Knowledge, skills, experience', 'IT auditor for systems audit'],
            ['Coverage', 'Geographic/functional reach', 'Staff in international locations'],
            ['Capacity', 'Sufficient to complete plan', 'FTEs needed for hours planned'],
            ['Continuity', 'Succession and retention', 'Career development programs'],
          ],
        },
        {
          title: 'Sourcing Options',
          type: 'text',
          content: "**In-House:**\n• Full-time IA staff\n• Direct control and oversight\n• Organizational knowledge\n\n**Co-Sourcing:**\n• Supplement internal staff with external\n• Obtain specialized skills\n• Flexible capacity\n• CAE retains responsibility\n\n**Outsourcing:**\n• External provider performs IA\n• Organization retains oversight through CAE or designated\n• Less direct control\n• May be cost-effective for small organizations",
        },
        {
          title: 'When to Co-Source',
          type: 'text',
          content: "**Common reasons:**\n\n• **Specialized skills** - IT, fraud, forensic, actuarial\n• **Capacity shortfall** - Too much work, not enough staff\n• **Independence** - Need external perspective\n• **Geographic coverage** - Remote locations\n• **One-time projects** - Special investigations\n\n**CAE responsibilities:**\n• Define scope of work\n• Supervise the work\n• Review deliverables\n• Ensure quality standards",
        },
        {
          title: '⚠️ Exam Trap: External Service Provider',
          type: 'warning',
          content: "**When using external providers:**\n\n✅ Organization RETAINS responsibility for IA\n✅ CAE or designee oversees the work\n✅ External assessments still required (every 5 years)\n✅ Must confirm provider competence and independence\n\n❌ Cannot \"outsource\" responsibility for IA\n❌ Provider cannot assess their own work",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAE ensures resources are appropriate, sufficient, effectively deployed",
            "Consider: competency, coverage, capacity, continuity",
            "Sourcing options: In-house, Co-source, Outsource",
            "Co-sourcing provides specialized skills and flexible capacity",
            "Organization retains responsibility even when outsourcing",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA2-I-003',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Policies, Procedures, and Coordination',
    description: 'Understand internal audit policies, procedures, and coordination with other assurance providers',
    order: 3,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Policies', 'Procedures', 'Coordination', 'Reliance', 'Standard 2040', 'Standard 2050'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Consistent policies and procedures ensure quality and efficiency. Coordinating with other assurance providers (external audit, risk, compliance) maximizes coverage and minimizes duplication!",
        },
        {
          title: 'Policies and Procedures',
          type: 'text',
          content: "**Standard 2040:**\n\nThe CAE must establish policies and procedures to guide the internal audit activity.\n\n**Purpose:**\n• Ensure consistency\n• Provide direction to staff\n• Document methodology\n• Support quality\n\n**Form and content:**\n• Should be appropriate for size and structure of IA\n• May be formal manual or automated tools",
        },
        {
          title: 'Common Policy Areas',
          type: 'table',
          headers: ['Area', 'Policy Content'],
          rows: [
            ['Planning', 'Risk assessment, audit selection, timing'],
            ['Fieldwork', 'Evidence, testing, documentation'],
            ['Reporting', 'Format, review, distribution'],
            ['Follow-up', 'Tracking, escalation, closure'],
            ['Quality', 'Review procedures, QAIP'],
            ['Ethics', 'Independence, confidentiality'],
          ],
        },
        {
          title: 'Coordination with Other Providers',
          type: 'text',
          content: "**Standard 2050:**\n\nThe CAE should share information, coordinate activities, and consider relying upon the work of other internal and external assurance and consulting service providers.\n\n**Benefits of coordination:**\n• Reduce duplication of effort\n• Maximize coverage\n• Share information and insights\n• Improve efficiency",
        },
        {
          title: 'Coordination with External Audit',
          type: 'text',
          content: "**Key coordination activities:**\n\n• Share audit plans\n• Discuss risk assessments\n• Share workpapers (where appropriate)\n• Avoid duplicate testing\n• Coordinate timing\n\n**Reliance considerations:**\n• External auditor may rely on IA work\n• IA may rely on external auditor work\n• Must evaluate competence and objectivity\n• Must evaluate work performed",
        },
        {
          title: '🧠 Memory Aid: Coordination Partners',
          type: 'callout',
          content: "**\"SCREAM\"** - Who does IA coordinate with?\n\n**S**OX compliance team\n**C**ompliance department\n**R**isk management\n**E**xternal auditors\n**A**ssurance providers (other)\n**M**anagement (line functions)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAE establishes policies and procedures for IA consistency",
            "Policies should fit size and structure of organization",
            "Coordinate with other assurance providers to reduce duplication",
            "May rely on work of others after evaluating competence",
            "Share information with external auditors where appropriate",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN II: PLANNING THE ENGAGEMENT (20%)
  // ============================================================================

  {
    id: 'CIA2-II-001',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Engagement Planning Fundamentals',
    description: 'Understand the planning process for individual audit engagements',
    order: 4,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Engagement planning', 'Preliminary survey', 'Risk assessment', 'Standard 2200'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Engagement planning sets the stage for a successful audit. Poor planning leads to scope creep, missed risks, and wasted effort. Master the planning standards - they're heavily tested!",
        },
        {
          title: 'Engagement Planning Requirements',
          type: 'text',
          content: "**Standard 2200:**\n\nInternal auditors must develop and document a plan for each engagement.\n\n**Planning includes:**\n• Objectives\n• Scope\n• Timing\n• Resource allocation\n\n**Pre-engagement research:**\n• Review prior audits\n• Understand business context\n• Identify key risks and controls",
        },
        {
          title: 'Preliminary Survey Activities',
          type: 'table',
          headers: ['Activity', 'Purpose', 'Output'],
          rows: [
            ['Review prior workpapers', 'Understand history, prior issues', 'Issue trends, prior findings'],
            ['Review policies and procedures', 'Understand expected controls', 'Control framework understanding'],
            ['Interview management', 'Gain current perspective', 'Risk and concern identification'],
            ['Process walkthroughs', 'Understand actual operations', 'Process flowcharts'],
            ['Analyze data', 'Identify anomalies, risks', 'Analytical insights'],
          ],
        },
        {
          title: 'Engagement Objectives',
          type: 'text',
          content: "**Standard 2210:**\n\nObjectives must be established for each engagement.\n\n**Standard 2210.A1:**\n\nInternal auditors must conduct a preliminary assessment of risks relevant to the activity under review. Engagement objectives must reflect results of this assessment.\n\n**Objective types:**\n• Compliance (with laws, policies)\n• Operations (efficiency, effectiveness)\n• Financial (accuracy, reliability)\n• Strategic (alignment with goals)",
        },
        {
          title: 'Engagement Scope',
          type: 'text',
          content: "**Standard 2220:**\n\nThe established scope must be sufficient to achieve the objectives.\n\n**Scope includes:**\n• Systems and processes covered\n• Time period reviewed\n• Locations included\n• Types of testing\n\n**Standard 2220.A1:**\nScope must include consideration of relevant systems, records, personnel, and physical properties.",
        },
        {
          title: '🧠 Memory Aid: Planning Framework - \"OSTRAS\"',
          type: 'callout',
          content: "**O**bjectives - What are we trying to achieve?\n**S**cope - What's included/excluded?\n**T**iming - When will work be performed?\n**R**esources - Who will do the work?\n**A**pproach - How will we test?\n**S**upervision - Who will oversee?\n\n*\"OSTRAS\" - the framework for planning success!*",
        },
        {
          title: 'Resource Allocation',
          type: 'text',
          content: "**Standard 2230:**\n\nInternal auditors must determine appropriate and sufficient resources to achieve engagement objectives based on an evaluation of the nature and complexity of each engagement, time constraints, and available resources.\n\n**Consider:**\n• Auditor competency for this area\n• Number of staff needed\n• Estimated hours\n• Technology and tools required\n• External expertise needed",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Planning must be documented for each engagement",
            "Preliminary survey informs objectives and scope",
            "Objectives reflect preliminary risk assessment",
            "Scope must be sufficient to achieve objectives",
            "Resource allocation considers complexity and constraints",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA2-II-002',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Engagement Work Programs',
    description: 'Understand how to develop and document work programs',
    order: 5,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Work programs', 'Audit procedures', 'Standard 2240'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Work programs are the ROADMAP for fieldwork. They translate objectives into specific procedures. A well-designed program ensures consistent, complete testing.",
        },
        {
          title: 'Work Program Requirements',
          type: 'text',
          content: "**Standard 2240:**\n\nInternal auditors must develop and document work programs that achieve the engagement objectives.\n\n**Work program elements:**\n• Procedures for identifying, analyzing, evaluating, and documenting information\n• Approved prior to implementation\n• Any adjustments approved promptly\n\n**Purpose:**\n• Guide fieldwork\n• Ensure completeness\n• Provide basis for supervision",
        },
        {
          title: 'Designing Procedures',
          type: 'text',
          content: "**Each procedure should:**\n\n• Relate to an engagement objective\n• Specify the nature of testing\n• Define the sample or population\n• Indicate expected evidence\n• Allow for documentation of results\n\n**Procedure types:**\n• Inquiry and observation\n• Inspection and examination\n• Re-performance and recalculation\n• Analytical procedures\n• Confirmation",
        },
        {
          title: 'Work Program Structure',
          type: 'table',
          headers: ['Section', 'Content'],
          rows: [
            ['Header', 'Engagement name, preparer, dates'],
            ['Objectives', 'What the engagement aims to achieve'],
            ['Scope', 'Boundaries and limitations'],
            ['Procedures', 'Specific steps to perform'],
            ['Sign-off', 'Completion and review signatures'],
            ['Notes', 'Observations, adjustments'],
          ],
        },
        {
          title: 'Procedure Design Example',
          type: 'text',
          content: "**Objective:** Verify vendor payments are properly authorized\n\n**Procedure:**\n1. Select sample of 25 payments over $10,000\n2. Obtain supporting documentation\n3. Verify approved purchase order exists\n4. Confirm invoice matches PO terms\n5. Verify appropriate management approval\n6. Document results and exceptions\n\n**Expected evidence:** Approved PO, invoice, approval signature",
        },
        {
          title: '🧠 Memory Aid: Procedure Types - \"CIRCA\"',
          type: 'callout',
          content: "**C**onfirmation - Third-party verification\n**I**nquiry - Ask questions\n**R**e-performance - Redo the process\n**C**omputation - Recalculate\n**A**nalysis - Compare, trend, ratio\n\n*Plus: Inspection, Observation*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Work programs must be documented and approved",
            "Procedures should link to objectives",
            "Adjustments require prompt approval",
            "Programs guide fieldwork and enable supervision",
            "Procedure types: Inquiry, Inspection, Re-performance, Analysis, Confirmation",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN III: PERFORMING THE ENGAGEMENT (40%)
  // ============================================================================

  {
    id: 'CIA2-III-001',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Gathering and Evaluating Information',
    description: 'Understand information gathering techniques and evidence evaluation',
    order: 6,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Information gathering', 'Evidence', 'Audit testing', 'Standard 2310'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Evidence is the FOUNDATION of audit conclusions. Weak evidence = weak conclusions. Understanding evidence types, sufficiency, and reliability is core to professional auditing!",
        },
        {
          title: 'Information Requirements',
          type: 'text',
          content: "**Standard 2310:**\n\nInternal auditors must identify sufficient, reliable, relevant, and useful information to achieve the engagement's objectives.\n\n**SRRU criteria:**\n• **Sufficient** - Enough to support conclusions\n• **Reliable** - Trustworthy, verifiable\n• **Relevant** - Relates to objectives\n• **Useful** - Helps achieve objectives",
        },
        {
          title: 'Types of Audit Evidence',
          type: 'table',
          headers: ['Type', 'Description', 'Reliability'],
          rows: [
            ['Physical', 'Tangible assets, observation', 'High - direct verification'],
            ['Documentary', 'Papers, records, files', 'Medium-High - depends on source'],
            ['Testimonial', 'Interviews, representations', 'Lower - subjective'],
            ['Analytical', 'Comparisons, calculations', 'Medium - based on logic'],
          ],
        },
        {
          title: 'Evidence Reliability Factors',
          type: 'text',
          content: "**More reliable when:**\n\n• **External source** > Internal source\n• **Written** > Oral\n• **Original** > Copy\n• **Direct observation** > Indirect report\n• **Corroborated** > Uncorroborated\n• **Strong internal control** > Weak control\n\n**Less reliable:**\n• Hearsay\n• Self-reported without verification\n• From parties with vested interest",
        },
        {
          title: 'Information Gathering Techniques',
          type: 'text',
          content: "**Inquiry:**\n• Ask questions of knowledgeable parties\n• Obtain understanding of processes\n• Must corroborate with other evidence\n\n**Observation:**\n• Watch processes being performed\n• Point-in-time evidence only\n• Document what and when observed\n\n**Inspection:**\n• Examine records and documents\n• Verify existence and attributes\n• Select samples appropriately\n\n**Confirmation:**\n• Obtain direct response from third parties\n• Highly reliable for verifying external claims",
        },
        {
          title: '🧠 Memory Aid: Evidence Quality - \"SRRU\"',
          type: 'callout',
          content: "**S**ufficient - Enough quantity\n**R**eliable - Can be trusted\n**R**elevant - Relates to objective\n**U**seful - Helps achieve purpose\n\n*\"SRRU\" = \"Sure, Really, Really, Useful!\"*",
        },
        {
          title: 'Evaluating Sufficiency',
          type: 'text',
          content: "**Factors affecting sufficiency:**\n\n• Materiality of the area\n• Risk level (higher risk = more evidence)\n• Quality of available evidence\n• Professional judgment\n• Cost-benefit consideration\n\n**Insufficient evidence:**\n• Note scope limitation\n• Seek alternative procedures\n• Consider impact on conclusions",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Evidence must be SRRU: Sufficient, Reliable, Relevant, Useful",
            "Physical and documentary evidence more reliable than testimonial",
            "External sources more reliable than internal",
            "Corroborate testimonial evidence with other sources",
            "Higher risk areas require more evidence",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA2-III-002',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Analysis and Evaluation',
    description: 'Understand analytical procedures and evaluation of control effectiveness',
    order: 7,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Analytical procedures', 'Control testing', 'Evaluation', 'Standard 2320'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Analysis transforms raw data into meaningful conclusions. Knowing how to apply analytical procedures and interpret results is what separates data collection from professional auditing!",
        },
        {
          title: 'Analysis Requirements',
          type: 'text',
          content: "**Standard 2320:**\n\nInternal auditors must base conclusions and engagement results on appropriate analyses and evaluations.\n\n**Analysis process:**\n1. Gather evidence\n2. Organize and classify\n3. Analyze patterns and relationships\n4. Compare to criteria\n5. Draw conclusions\n6. Develop recommendations",
        },
        {
          title: 'Analytical Procedures',
          type: 'table',
          headers: ['Type', 'Description', 'Example'],
          rows: [
            ['Trend analysis', 'Compare data over time', 'Inventory levels by month'],
            ['Ratio analysis', 'Relate data elements', 'Receivables turnover'],
            ['Reasonableness test', 'Estimate expected results', 'Payroll estimate vs actual'],
            ['Variance analysis', 'Compare actual to budget', 'Budget vs actual by account'],
            ['Benchmark', 'Compare to external standards', 'Industry ratios'],
          ],
        },
        {
          title: 'Control Testing Approaches',
          type: 'text',
          content: "**Testing control design:**\n• \"Will the control prevent/detect the risk?\"\n• Review documentation, walkthroughs\n• Evaluate design effectiveness\n\n**Testing control operation:**\n• \"Is the control actually working?\"\n• Examine evidence of performance\n• Sample-based testing\n• Re-performance",
        },
        {
          title: 'Evaluating Findings',
          type: 'text',
          content: "**For each finding, assess:**\n\n**Condition** - What exists (the facts)\n**Criteria** - What should exist (the standard)\n**Cause** - Why the difference exists\n**Effect** - Impact of the condition\n\n**Significance factors:**\n• Frequency of occurrence\n• Financial impact\n• Risk to organization\n• Systemic vs isolated",
        },
        {
          title: '🧠 Memory Aid: Finding Elements - \"4 Cs\"',
          type: 'callout',
          content: "**C**ondition - What IS happening\n**C**riteria - What SHOULD happen\n**C**ause - WHY it happened\n**C**onsequence (Effect) - What's the IMPACT\n\n*Every finding needs all 4 Cs!*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Conclusions must be based on appropriate analysis",
            "Analytical procedures: Trend, ratio, reasonableness, variance, benchmark",
            "Test both control design and operating effectiveness",
            "Findings have 4 elements: Condition, Criteria, Cause, Effect",
            "Assess significance of findings for reporting",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA2-III-003',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Documenting Engagement Results',
    description: 'Understand workpaper documentation standards and practices',
    order: 8,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Workpapers', 'Documentation', 'Evidence retention', 'Standard 2330'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Documentation is the PROOF of your work. Workpapers support conclusions, enable supervision, and provide organizational memory. Poor documentation = indefensible audit!",
        },
        {
          title: 'Documentation Requirements',
          type: 'text',
          content: "**Standard 2330:**\n\nInternal auditors must document sufficient, reliable, relevant, and useful information to support the engagement results and conclusions.\n\n**Purpose of workpapers:**\n• Support observations and recommendations\n• Provide evidence of work performed\n• Enable supervision and review\n• Facilitate future audits\n• Defend against challenges",
        },
        {
          title: 'Workpaper Content',
          type: 'text',
          content: "**Essential elements:**\n\n• **Heading:** Engagement name, preparer, date\n• **Objective:** What the work addresses\n• **Procedures:** What was done\n• **Results:** What was found\n• **Conclusions:** What it means\n• **References:** Cross-references to other workpapers\n• **Review:** Evidence of supervisory review",
        },
        {
          title: 'Documentation Quality Attributes',
          type: 'table',
          headers: ['Attribute', 'Description'],
          rows: [
            ['Complete', 'All necessary information included'],
            ['Accurate', 'Facts correctly recorded'],
            ['Clear', 'Understandable to reader'],
            ['Concise', 'No unnecessary information'],
            ['Legible', 'Easy to read'],
            ['Referenced', 'Connected to source and other papers'],
          ],
        },
        {
          title: 'Record Retention and Control',
          type: 'text',
          content: "**Standard 2330.A1:**\n\nThe CAE must control access to engagement records and obtain approval before releasing externally.\n\n**Standard 2330.A2:**\n\nThe CAE must develop retention requirements for engagement records, consistent with organization guidelines and regulations.\n\n**Best practices:**\n• Secure storage (physical and electronic)\n• Access controls\n• Retention schedules\n• Disposition procedures",
        },
        {
          title: '⚠️ Exam Trap: External Release',
          type: 'warning',
          content: "**Before releasing workpapers externally:**\n\n✅ Obtain CAE and/or senior management approval\n✅ Consider legal/regulatory requirements\n✅ Consult legal counsel as appropriate\n✅ Document the approval and release\n\n**Common external requestors:**\n• External auditors\n• Regulators\n• Legal proceedings\n\n*Always control release and document approval!*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Documentation must support engagement conclusions",
            "Workpapers should be complete, accurate, clear, concise",
            "CAE controls access and approves external release",
            "Retention requirements must comply with regulations",
            "Documentation enables supervision and future reference",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA2-III-004',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Engagement Supervision',
    description: 'Understand supervision requirements and practices throughout the engagement',
    order: 9,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Supervision', 'Review', 'Quality control', 'Standard 2340'],
    blueprintArea: 'CIA2-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Supervision ensures quality throughout the engagement, not just at the end. It's the front-line quality control that prevents errors and develops staff!",
        },
        {
          title: 'Supervision Requirements',
          type: 'text',
          content: "**Standard 2340:**\n\nEngagements must be properly supervised to ensure objectives are achieved, quality is assured, and staff is developed.\n\n**Supervision occurs throughout:**\n• Planning\n• Fieldwork\n• Reporting\n• Follow-up",
        },
        {
          title: 'Supervision Activities',
          type: 'table',
          headers: ['Phase', 'Supervision Activities'],
          rows: [
            ['Planning', 'Review objectives, scope, work program'],
            ['Fieldwork', 'Monitor progress, review workpapers, guide staff'],
            ['Reporting', 'Review drafts, ensure conclusions supported'],
            ['Throughout', 'Coach, train, develop staff'],
          ],
        },
        {
          title: 'Factors Affecting Supervision Level',
          type: 'text',
          content: "**More supervision needed when:**\n\n• Staff is less experienced\n• Engagement is complex\n• Area is high risk\n• New audit area\n• Sensitive subject matter\n\n**Less supervision needed when:**\n• Experienced staff\n• Routine audit\n• Lower risk area\n• Established audit program",
        },
        {
          title: 'Documentation of Supervision',
          type: 'text',
          content: "**Evidence of supervision:**\n\n• Reviewer initials and dates on workpapers\n• Review notes addressed and cleared\n• Sign-off on key conclusions\n• File review checklists\n• Coaching and development discussions documented",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Supervision required throughout engagement lifecycle",
            "Level of supervision varies by risk and staff experience",
            "Supervision ensures quality and develops staff",
            "Document evidence of supervisory review",
            "Address review notes before finalizing",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN IV: COMMUNICATING RESULTS AND MONITORING PROGRESS (20%)
  // ============================================================================

  {
    id: 'CIA2-IV-001',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Communicating Engagement Results',
    description: 'Understand communication requirements, report elements, and quality criteria',
    order: 10,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Audit reporting', 'Communication criteria', 'Report quality', 'Standard 2400'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The audit report is the PRIMARY deliverable. All the work leads to this communication. A poorly written report undermines the entire engagement. Master the communication standards!",
        },
        {
          title: 'Communication Requirements',
          type: 'text',
          content: "**Standard 2400:**\n\nInternal auditors must communicate the results of engagements.\n\n**Standard 2410:**\n\nCommunications must include:\n• Engagement objectives\n• Scope\n• Applicable conclusions\n• Recommendations and action plans",
        },
        {
          title: 'Communication Quality Criteria',
          type: 'text',
          content: "**Standard 2420:**\n\nCommunications must be accurate, objective, clear, concise, constructive, complete, and timely.\n\n**AOCCCCT:**\n• **Accurate** - Free from errors\n• **Objective** - Fair, unbiased\n• **Clear** - Easily understood\n• **Concise** - To the point\n• **Constructive** - Helpful, improvement-focused\n• **Complete** - All significant information\n• **Timely** - Appropriately timed",
        },
        {
          title: 'Report Elements',
          type: 'table',
          headers: ['Element', 'Content'],
          rows: [
            ['Title', 'Engagement name and identifier'],
            ['Objectives', 'What the engagement aimed to achieve'],
            ['Scope', 'What was covered and time period'],
            ['Methodology', 'How work was performed'],
            ['Observations', 'Condition, criteria, cause, effect'],
            ['Recommendations', 'Actions to address findings'],
            ['Management Response', 'Agreement and planned actions'],
            ['Conclusion', 'Overall assessment (if appropriate)'],
          ],
        },
        {
          title: 'Opinions and Ratings',
          type: 'text',
          content: "**Standard 2410.A1:**\n\nFinal communication of engagement results must include, where appropriate:\n• Auditor's opinion and/or conclusion\n• Recommendations for potential improvements\n\n**Opinion types:**\n• Overall assessment of control effectiveness\n• Ratings (satisfactory, needs improvement, unsatisfactory)\n• Opinion on compliance with requirements\n\n**Basis for opinion:**\n• Must be supported by sufficient evidence\n• Explain basis and limitations",
        },
        {
          title: '🧠 Memory Aid: Communication Quality - \"AOCCCCT\"',
          type: 'callout',
          content: "**A**ccurate - No errors\n**O**bjective - Not biased\n**C**lear - Easy to understand\n**C**oncise - Not wordy\n**C**onstructive - Helpful\n**C**omplete - Nothing missing\n**T**imely - Right time\n\n*\"A Outstanding Communicator Creates Crisp Complete Timeliness\"*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Reports must include objectives, scope, conclusions, recommendations",
            "Quality criteria: Accurate, Objective, Clear, Concise, Constructive, Complete, Timely",
            "Opinions must be supported by sufficient evidence",
            "Include management response and action plans",
            "Disseminate to appropriate parties",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA2-IV-002',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Monitoring Progress and Follow-Up',
    description: 'Understand requirements for monitoring implementation of corrective actions',
    order: 11,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Follow-up', 'Monitoring', 'Issue resolution', 'Standard 2500'],
    blueprintArea: 'CIA2-IV',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "An audit isn't complete until findings are addressed! Follow-up closes the loop and ensures value is delivered. Without it, recommendations become a to-do list that never gets done.",
        },
        {
          title: 'Follow-Up Requirements',
          type: 'text',
          content: "**Standard 2500:**\n\nThe CAE must establish and maintain a system to monitor the disposition of results communicated to management.\n\n**Standard 2500.A1:**\n\nThe CAE must establish a follow-up process to monitor and ensure that management actions have been effectively implemented or that senior management has accepted the risk of not taking action.",
        },
        {
          title: 'Follow-Up Process',
          type: 'table',
          headers: ['Step', 'Activity'],
          rows: [
            ['1', 'Track all open recommendations'],
            ['2', 'Obtain status updates from management'],
            ['3', 'Verify implementation of actions'],
            ['4', 'Evaluate adequacy of actions'],
            ['5', 'Close resolved items or escalate'],
            ['6', 'Report status to Board'],
          ],
        },
        {
          title: 'Tracking and Escalation',
          type: 'text',
          content: "**Tracking system should include:**\n• Finding/recommendation description\n• Risk rating\n• Owner/responsible party\n• Due date\n• Current status\n• Verification notes\n\n**Escalation triggers:**\n• Past due items\n• High-risk items unaddressed\n• Repeated deferrals\n• Risk acceptance by senior management",
        },
        {
          title: 'Risk Acceptance',
          type: 'text',
          content: "**Standard 2600:**\n\nWhen the CAE concludes that management has accepted a level of risk that may be unacceptable to the organization, the CAE must discuss the matter with senior management. If the CAE determines that the matter has not been resolved, the CAE must communicate the matter to the Board.\n\n**Board communication required when:**\n• Significant risk remains unaddressed\n• Management accepts risk exceeding tolerance\n• Unresolved disagreement with management",
        },
        {
          title: '⚠️ Exam Trap: Unresolved Risks',
          type: 'warning',
          content: "**Key escalation points:**\n\n1. First: Discuss with Senior Management\n2. If unresolved: Communicate to Board\n\n**CAE cannot force management to act, but MUST escalate to Board if risk is unacceptable!**\n\n*Board is the final escalation point for unaddressed significant risks.*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAE must establish follow-up system",
            "Verify implementation of corrective actions",
            "Track status of all open recommendations",
            "Escalate unresolved significant risks to Board",
            "Report follow-up status to Board regularly",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCIA2Lessons = () => cia2Lessons;
export const getCIA2LessonById = (id: string) => cia2Lessons.find(lesson => lesson.id === id);
export const getCIA2LessonCount = () => cia2Lessons.length;

export default cia2Lessons;
