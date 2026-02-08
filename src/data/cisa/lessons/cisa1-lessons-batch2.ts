/**
 * CISA Domain 1: Information Systems Auditing Process - Batch 2
 * Extended lessons covering advanced audit techniques and evidence collection
 */

import { Lesson } from '../../../types';

export const cisa1LessonsBatch2: Lesson[] = [
  // ===========================================================================
  // ADVANCED AUDIT TECHNIQUES
  // ===========================================================================
  
  {
    id: 'CISA1-010',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Computer-Assisted Audit Techniques (CAATs)',
    description: 'Master the use of technology tools to enhance audit efficiency and effectiveness',
    order: 10,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['CAATs', 'Data Analytics', 'Audit Software', 'Generalized Audit Software'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "CAATs enable auditors to analyze entire populations of data rather than samples, identify exceptions automatically, and provide objective evidence of control effectiveness. This is a heavily tested area on the CISA exam.",
        },
        {
          title: 'What are CAATs?',
          type: 'text',
          content: "**Computer-Assisted Audit Techniques (CAATs)** are computer programs and data used by the auditor to increase the efficiency and effectiveness of an audit.\n\n**Types of CAATs:**\n\n**1. Generalized Audit Software (GAS)**\n• ACL (Audit Command Language)\n• IDEA (Interactive Data Extraction and Analysis)\n• Excel with advanced functions\n• Python/R for data analysis\n\n**2. Utility Software**\n• File comparison utilities\n• Log analysis tools\n• Configuration reviewers\n\n**3. Test Data**\n• Dummy transactions to test controls\n• Base case system evaluation\n\n**4. Integrated Test Facilities (ITF)**\n• Embedded test entities in live systems\n• Continuous monitoring capabilities\n\n**5. Parallel Simulation**\n• Reprocessing data with auditor's logic\n• Comparing results to production outputs",
        },
        {
          title: '🧠 Memory Aid: CAAT Types',
          type: 'callout',
          content: "**\"GUTIP\"** - Generalized audit software, Utility software, Test data, Integrated test facility, Parallel simulation\n\nThink: \"GUTs In Parallel\" - you need GUTS to run tests In Parallel with live systems!",
        },
        {
          title: 'Common CAAT Applications',
          type: 'table',
          headers: ['Application', 'Description', 'Example'],
          rows: [
            ['Gap Detection', 'Find missing items in sequences', 'Missing check numbers, invoice gaps'],
            ['Duplicate Testing', 'Identify duplicate entries', 'Duplicate payments, duplicate vendor IDs'],
            ['Aging Analysis', 'Calculate time-based metrics', 'Receivables aging, ticket resolution times'],
            ['Stratification', 'Segment data into ranges', 'Transaction amounts by size bracket'],
            ['Calculations', 'Verify mathematical accuracy', 'Recalculate depreciation, interest'],
            ['Matching', 'Compare multiple files', 'Match POs to invoices to receipts'],
            ['Exception Testing', 'Find transactions outside norms', 'Transactions above approval limits'],
          ],
        },
        {
          title: 'Implementing CAATs Successfully',
          type: 'text',
          content: "**Planning Phase:**\n• Define audit objectives clearly\n• Identify required data sources\n• Understand data structures and formats\n• Assess data quality and completeness\n• Document the approach in audit workpapers\n\n**Execution Phase:**\n• Extract data with appropriate controls\n• Validate extracted data (record counts, control totals)\n• Perform analysis procedures\n• Document all steps for reproducibility\n• Maintain audit trail of changes\n\n**Challenges to Address:**\n• Data access restrictions\n• Data format incompatibilities\n• Large data volumes\n• Data quality issues\n• System downtime constraints",
        },
        {
          title: 'Test Data vs. Parallel Simulation',
          type: 'table',
          headers: ['Aspect', 'Test Data', 'Parallel Simulation'],
          rows: [
            ['Approach', 'Process artificial transactions', 'Reprocess actual transactions'],
            ['Environment', 'Production or test system', 'Auditor-controlled program'],
            ['Data Used', 'Auditor-created test cases', 'Actual production data'],
            ['Risk', 'May corrupt production data', 'No risk to production'],
            ['Purpose', 'Test system controls', 'Verify processing accuracy'],
            ['Timing', 'Point-in-time test', 'Can be retrospective'],
          ],
        },
        {
          title: 'Continuous Auditing and Monitoring',
          type: 'text',
          content: "**Continuous Auditing vs. Continuous Monitoring:**\n\n**Continuous Auditing**\n• Performed by internal audit function\n• Focuses on control effectiveness\n• Produces audit evidence automatically\n• Enables real-time assurance\n\n**Continuous Monitoring**\n• Performed by management/operations\n• Focuses on operational performance\n• Detects issues for management action\n• Provides ongoing visibility\n\n**Embedded Audit Modules (EAMs):**\n• Code inserted into production applications\n• Capture transactions meeting audit criteria\n• Enable continuous auditing without system access\n• Must be protected from modification",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAATs include GAS, utility software, test data, ITF, and parallel simulation",
            "CAATs enable 100% population testing rather than sampling",
            "Data validation is critical before performing CAAT analysis",
            "Test data tests controls; parallel simulation verifies processing",
            "Continuous auditing provides real-time assurance through automation",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-011',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Evidence Collection and Evaluation',
    description: 'Understand how to gather sufficient, reliable evidence to support audit conclusions',
    order: 11,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Evidence Types', 'Evidence Reliability', 'Documentation', 'Working Papers'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Audit conclusions are only as strong as the evidence supporting them. Understanding evidence quality is essential for providing reliable assurance and defending audit findings.",
        },
        {
          title: 'Types of Audit Evidence',
          type: 'text',
          content: "**Primary Evidence Types:**\n\n**1. Documentary Evidence**\n• System reports and logs\n• Policies and procedures\n• Contracts and agreements\n• Emails and communications\n\n**2. Testimonial Evidence**\n• Interviews with personnel\n• Management representations\n• Walk-through explanations\n• User confirmations\n\n**3. Analytical Evidence**\n• Trend analysis results\n• Ratio comparisons\n• Variance analyses\n• Benchmark comparisons\n\n**4. Observational Evidence**\n• Physical inspection\n• Process observations\n• Control demonstrations\n• Facility tours",
        },
        {
          title: 'Evidence Reliability Hierarchy',
          type: 'table',
          headers: ['Reliability Level', 'Source', 'Examples'],
          rows: [
            ['Most Reliable', 'External/Independent', 'Third-party confirmations, external certifications'],
            ['Highly Reliable', 'System-Generated', 'Audit logs, automated reports, system timestamps'],
            ['Moderately Reliable', 'Internal/Documented', 'Policies, procedures, signed approvals'],
            ['Less Reliable', 'Internal/Verbal', 'Staff interviews, management assertions'],
            ['Least Reliable', 'Self-Assessment', 'Control owner statements, questionnaires'],
          ],
        },
        {
          title: '🧠 Memory Aid: SCAR',
          type: 'callout',
          content: "**Evidence must be SCAR:**\n• **S**ufficient - Enough quantity to support conclusions\n• **C**ompetent - Reliable and trustworthy\n• **A**ppropriate - Relevant to objectives\n• **R**easonable - Obtained cost-effectively",
        },
        {
          title: 'Audit Documentation Standards',
          type: 'text',
          content: "**Working Paper Requirements:**\n\n**Completeness:**\n• Document all procedures performed\n• Record all evidence obtained\n• Include all conclusions reached\n• Explain any deviations from plan\n\n**Clarity:**\n• Understandable by third parties\n• Logical organization and flow\n• Clear cross-references\n• Defined abbreviations\n\n**Timeliness:**\n• Prepare during the audit (not after)\n• Date all documents\n• Include preparer identification\n• Show review evidence\n\n**Retention:**\n• Follow organizational retention policy\n• Typically 5-7 years minimum\n• Secure storage requirements\n• Consider legal hold requirements",
        },
        {
          title: 'Corroborating Evidence',
          type: 'text',
          content: "**Why Corroboration Matters:**\n\nSingle sources of evidence may be insufficient or unreliable. Auditors should seek corroborating evidence from multiple independent sources.\n\n**Corroboration Techniques:**\n\n**1. Inquiry + Observation**\nAsk how a control works, then watch it operate\n\n**2. Document Review + Testing**\nReview the procedure, then test actual transactions\n\n**3. Internal + External Sources**\nCompare internal reports to external confirmations\n\n**4. Current + Historical**\nCompare current state to prior period documentation\n\n**Exam Tip:** When asked about the best evidence, look for options that combine multiple sources or reference external/independent verification.",
        },
        {
          title: 'Evaluating Evidence Sufficiency',
          type: 'text',
          content: "**Factors Affecting Sample Size:**\n\n**Larger Samples Needed When:**\n• Population is large\n• Risk of error is high\n• Control environment is weak\n• Prior findings exist\n• Evidence reliability is low\n\n**Smaller Samples Acceptable When:**\n• Controls are automated\n• Errors have consistent impact\n• Population is homogeneous\n• Prior audits showed no issues\n• Evidence is highly reliable\n\n**Statistical vs. Judgmental Sampling:**\n• Statistical: Mathematically determined, projectable results\n• Judgmental: Experience-based, targeted selections\n• Both are acceptable; document rationale",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Evidence types: documentary, testimonial, analytical, observational",
            "External/system-generated evidence is more reliable than verbal/internal",
            "Evidence must be SCAR: Sufficient, Competent, Appropriate, Reasonable",
            "Working papers must be complete, clear, timely, and retained properly",
            "Corroboration from multiple sources strengthens audit conclusions",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-012',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Sampling Methodologies',
    description: 'Learn statistical and non-statistical sampling techniques for IS audits',
    order: 12,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Statistical Sampling', 'Non-Statistical Sampling', 'Sample Size', 'Error Evaluation'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Sampling allows auditors to reach conclusions about entire populations without testing every item. Understanding sampling methods helps ensure conclusions are valid and defensible.",
        },
        {
          title: 'Statistical vs. Non-Statistical Sampling',
          type: 'table',
          headers: ['Aspect', 'Statistical Sampling', 'Non-Statistical Sampling'],
          rows: [
            ['Selection Method', 'Random/systematic', 'Judgmental/targeted'],
            ['Sample Size', 'Mathematically determined', 'Auditor judgment'],
            ['Results', 'Projectable to population', 'Not projectable'],
            ['Confidence Level', 'Quantifiable', 'Not quantifiable'],
            ['Skill Required', 'Statistical knowledge', 'Audit experience'],
            ['Best For', 'Large homogeneous populations', 'Small or varied populations'],
          ],
        },
        {
          title: 'Statistical Sampling Methods',
          type: 'text',
          content: "**1. Attribute Sampling**\n• Tests presence/absence of a condition\n• Used for control testing\n• Result: Error rate (e.g., 2% of controls failed)\n• Example: Testing if all payments have proper approval\n\n**2. Variable Sampling**\n• Tests quantitative values\n• Used for substantive testing\n• Result: Dollar amount or range\n• Types: Mean-per-unit, ratio, difference\n\n**3. Discovery Sampling**\n• Designed to find at least one error\n• Used when any error is critical\n• Small sample if error rate is expected to be low\n• Example: Testing for fraud indicators\n\n**4. Probability-Proportional-to-Size (PPS)**\n• Larger items have higher selection probability\n• Efficient for testing monetary amounts\n• Also called monetary unit sampling",
        },
        {
          title: '🧠 Memory Aid: AVD',
          type: 'callout',
          content: "**Attribute tests Controls, Variable tests Dollars, Discovery finds Fraud**\n\nA-V-D:\n• Attribute = Controls (yes/no)\n• Variable = Values (dollars)\n• Discovery = Detect rare critical errors",
        },
        {
          title: 'Sample Selection Techniques',
          type: 'text',
          content: "**Random Selection:**\n• Each item has equal selection chance\n• Uses random number generator\n• Most objective method\n\n**Systematic Selection:**\n• Select every nth item\n• Starting point should be random\n• Risk: May miss if population has pattern\n\n**Stratified Selection:**\n• Divide population into subgroups\n• Sample from each stratum\n• Ensures coverage of all categories\n\n**Haphazard Selection:**\n• No structured method\n• Auditor picks items without bias\n• Not truly random; use with caution\n\n**Block Selection:**\n• Select contiguous items (a block)\n• Useful for time-based testing\n• May miss issues outside the block",
        },
        {
          title: 'Determining Sample Size',
          type: 'text',
          content: "**Factors Increasing Sample Size:**\n\n• Higher desired confidence level (e.g., 95% vs. 90%)\n• Lower tolerable error rate\n• Higher expected error rate in population\n• Larger population size (to a point)\n• Lower assessed control risk\n\n**Factors Decreasing Sample Size:**\n\n• Automated controls (consistent operation)\n• Strong control environment\n• Low prior error rates\n• Homogeneous population\n• Prior period testing with no issues",
        },
        {
          title: 'Evaluating Sampling Results',
          type: 'text',
          content: "**Key Metrics:**\n\n**Deviation Rate (Attribute Testing)**\nActual errors found ÷ Sample size\nCompare to tolerable rate\n\n**Projected Error (Variable Testing)**\nSample errors projected to population\nCompare to materiality threshold\n\n**Upper Error Limit (UEL)**\nMaximum likely error at confidence level\nAccounts for sampling risk\n\n**Decision Rules:**\n• If projection < tolerable → Accept population\n• If projection > tolerable → Expand testing or qualify conclusion\n• Consider qualitative factors (nature of errors)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Statistical sampling provides projectable, quantifiable results",
            "Attribute sampling tests controls; variable sampling tests dollar amounts",
            "Discovery sampling is designed to find at least one critical error",
            "Random and systematic selection are the most objective methods",
            "Projected error must be compared to tolerable limits to conclude",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-013',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Reporting and Communication',
    description: 'Master the art of communicating audit findings effectively to stakeholders',
    order: 13,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Audit Reports', 'Findings', 'Recommendations', 'Management Response'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The audit report is the primary deliverable of every audit engagement. Clear, actionable reports drive organizational improvement and demonstrate audit value.",
        },
        {
          title: 'Audit Report Structure',
          type: 'text',
          content: "**Standard IS Audit Report Elements:**\n\n**1. Executive Summary**\n• High-level overview for leadership\n• Key findings and overall conclusion\n• Critical action items\n\n**2. Scope and Objectives**\n• What was audited\n• Time period covered\n• Audit objectives\n• Methodology used\n\n**3. Detailed Findings**\n• Condition (what was found)\n• Criteria (what should be)\n• Cause (why it happened)\n• Effect (risk/impact)\n• Recommendation (what to do)\n\n**4. Management Response**\n• Management's action plan\n• Responsible parties\n• Target completion dates\n\n**5. Appendices**\n• Detailed test results\n• Technical specifications\n• Supporting documentation",
        },
        {
          title: '🧠 Memory Aid: 5 Cs of Findings',
          type: 'callout',
          content: "**Every finding should contain the 5 Cs:**\n\n• **C**ondition - What IS (the issue found)\n• **C**riteria - What SHOULD BE (the standard)\n• **C**ause - WHY it occurred (root cause)\n• **C**onsequence - The RISK or impact (effect)\n• **C**orrection - What to DO about it (recommendation)",
        },
        {
          title: 'Rating Findings',
          type: 'table',
          headers: ['Rating', 'Definition', 'Management Action'],
          rows: [
            ['Critical/High', 'Immediate risk to operations/compliance, material weakness', 'Immediate remediation required'],
            ['Significant/Medium', 'Notable weakness, potential for material impact', 'Remediation within 60-90 days'],
            ['Moderate/Low', 'Control enhancement opportunity, minor risk', 'Remediation within 6-12 months'],
            ['Informational', 'Best practice suggestion, no significant risk', 'Consider for future improvement'],
          ],
        },
        {
          title: 'Effective Recommendations',
          type: 'text',
          content: "**Characteristics of Good Recommendations:**\n\n**Specific**\n• Clear action required\n• Not vague or generic\n• Addresses root cause\n\n**Measurable**\n• Success can be verified\n• Clear completion criteria\n• Observable outcomes\n\n**Achievable**\n• Realistic given constraints\n• Considers cost/benefit\n• Feasible timeline\n\n**Relevant**\n• Addresses the finding\n• Proportional to risk\n• Aligned with business needs\n\n**Time-Bound**\n• Specific target date\n• Interim milestones if complex\n• Considers prioritization",
        },
        {
          title: 'Communication Throughout the Audit',
          type: 'text',
          content: "**Opening Conference:**\n• Introduce audit team\n• Confirm scope and objectives\n• Establish communication plan\n• Identify key contacts\n\n**Regular Status Updates:**\n• Keep auditee informed\n• Discuss preliminary findings\n• Address questions promptly\n• Manage expectations\n\n**Draft Report Review:**\n• Share findings before finalizing\n• Allow for factual corrections\n• Obtain management response\n• Discuss disagreements\n\n**Exit Conference:**\n• Present key findings\n• Confirm management response\n• Discuss remediation timeline\n• Thank participants",
        },
        {
          title: 'Handling Disagreements',
          type: 'text',
          content: "**When Management Disagrees:**\n\n**1. Listen Carefully**\n• Understand their perspective\n• Consider new information\n• Evaluate if finding needs revision\n\n**2. Clarify and Explain**\n• Restate the criteria\n• Explain the risk\n• Provide additional evidence\n\n**3. Document the Disagreement**\n• Include management's position in report\n• Maintain auditor's conclusion if valid\n• Note rationale for both positions\n\n**4. Escalate if Necessary**\n• Audit committee involvement\n• Chief Audit Executive decision\n• Regulatory notification if required",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Audit reports should include executive summary, scope, findings, and responses",
            "Findings must contain the 5 Cs: Condition, Criteria, Cause, Consequence, Correction",
            "Findings should be rated by severity to prioritize remediation",
            "Recommendations should be SMART: Specific, Measurable, Achievable, Relevant, Time-bound",
            "Communicate throughout the audit, not just at the end",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-014',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Internal Control Frameworks',
    description: 'Understand COSO, COBIT, and other frameworks used to evaluate IT controls',
    order: 14,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['COSO', 'COBIT', 'NIST', 'ISO 27001', 'Control Objectives'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Control frameworks provide structured criteria for evaluating the design and effectiveness of controls. CISA exam questions frequently reference COSO and COBIT concepts.",
        },
        {
          title: 'COSO Internal Control Framework',
          type: 'text',
          content: "**COSO = Committee of Sponsoring Organizations**\n\n**The 5 Components (2013 Framework):**\n\n**1. Control Environment**\n• Tone at the top\n• Organizational structure\n• Commitment to integrity and ethics\n• Board oversight\n• HR policies\n\n**2. Risk Assessment**\n• Identify risks to objectives\n• Analyze likelihood and impact\n• Consider fraud risk\n• Assess significant changes\n\n**3. Control Activities**\n• Policies and procedures\n• IT general and application controls\n• Authorization and segregation of duties\n\n**4. Information & Communication**\n• Quality information for control\n• Internal communication\n• External communication\n\n**5. Monitoring Activities**\n• Ongoing monitoring\n• Separate evaluations\n• Reporting deficiencies",
        },
        {
          title: '🧠 Memory Aid: CRIME',
          type: 'callout',
          content: "**COSO Components: CRIME**\n\n• **C**ontrol Environment\n• **R**isk Assessment\n• **I**nformation & Communication\n• **M**onitoring\n• **E** (Control Activities - think \"Execute\")\n\nRemember: \"Prevent financial CRIME with COSO!\"",
        },
        {
          title: 'COBIT Framework',
          type: 'text',
          content: "**COBIT = Control Objectives for Information and Related Technology**\n\nDeveloped by ISACA for IT governance and management.\n\n**COBIT 2019 Governance Objectives:**\n\n**EDM (Evaluate, Direct, Monitor)**\n• Ensure governance framework setting and maintenance\n• Ensure benefits delivery\n• Ensure risk optimization\n• Ensure resource optimization\n• Ensure stakeholder engagement\n\n**APO (Align, Plan, Organize)**\n• Manage IT strategy\n• Manage enterprise architecture\n• Manage innovation\n• Manage portfolio, budget, costs\n\n**BAI (Build, Acquire, Implement)**\n• Manage programs, projects, requirements\n• Manage solutions, changes, assets\n• Manage organizational change\n\n**DSS (Deliver, Service, Support)**\n• Manage operations, service requests\n• Manage problems, continuity, security\n\n**MEA (Monitor, Evaluate, Assess)**\n• Manage performance, internal controls\n• Manage compliance, assurance",
        },
        {
          title: 'COSO vs. COBIT',
          type: 'table',
          headers: ['Aspect', 'COSO', 'COBIT'],
          rows: [
            ['Primary Focus', 'Internal control for all business', 'IT governance and management'],
            ['Developed By', 'Treadway Commission sponsors', 'ISACA'],
            ['Target Users', 'All management, auditors', 'IT management, IS auditors'],
            ['Structure', '5 components, 17 principles', 'Governance + management objectives'],
            ['Compliance', 'SOX compliance framework', 'IT control framework'],
            ['Integration', 'May reference COBIT for IT', 'Maps to COSO for broader context'],
          ],
        },
        {
          title: 'Other Relevant Frameworks',
          type: 'text',
          content: "**NIST Cybersecurity Framework:**\n• Voluntary US framework\n• Core functions: Identify, Protect, Detect, Respond, Recover\n• Used for critical infrastructure\n\n**ISO/IEC 27001:**\n• International standard for ISMS\n• Certification available\n• 114 controls in Annex A\n• Risk-based approach\n\n**ITIL (IT Infrastructure Library):**\n• IT service management best practices\n• Service lifecycle approach\n• Focuses on service delivery\n\n**ISO/IEC 38500:**\n• IT governance standard\n• 6 principles for governing bodies\n• Evaluate, Direct, Monitor cycle",
        },
        {
          title: 'Types of Controls',
          type: 'table',
          headers: ['Category', 'Type', 'Purpose', 'Example'],
          rows: [
            ['By Function', 'Preventive', 'Stop issues before they occur', 'Access controls, segregation of duties'],
            ['By Function', 'Detective', 'Identify issues after they occur', 'Log reviews, reconciliations'],
            ['By Function', 'Corrective', 'Remediate identified issues', 'Incident response, patches'],
            ['By Implementation', 'Manual', 'Performed by people', 'Approvals, reviews'],
            ['By Implementation', 'Automated', 'Performed by systems', 'Validation edits, calculations'],
            ['By Scope', 'General', 'Apply broadly (IT general controls)', 'Change management, access management'],
            ['By Scope', 'Application', 'Specific to an application', 'Input validation, processing controls'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COSO has 5 components: Control Environment, Risk Assessment, Control Activities, Info/Comm, Monitoring",
            "COBIT is ISACA's framework specifically for IT governance and management",
            "Other frameworks include NIST CSF, ISO 27001, ITIL",
            "Controls are categorized as preventive, detective, or corrective",
            "IT General Controls (ITGCs) apply broadly; application controls are system-specific",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-015',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Follow-Up and Issue Tracking',
    description: 'Learn how to track remediation progress and verify management corrective actions',
    order: 15,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Issue Tracking', 'Remediation', 'Verification', 'Escalation'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Audit findings without follow-up fail to drive improvement. IS auditors must track issues to closure and verify that remediation actually addresses the identified risks.",
        },
        {
          title: 'Issue Tracking Process',
          type: 'text',
          content: "**Standard Follow-Up Workflow:**\n\n**1. Log the Finding**\n• Assign unique tracking ID\n• Document condition and recommendation\n• Record agreed action plan and owner\n• Set target completion date\n\n**2. Monitor Progress**\n• Request status updates\n• Track against milestones\n• Identify at-risk items\n• Document management communications\n\n**3. Verify Remediation**\n• Obtain evidence of completion\n• Test the implemented control\n• Assess effectiveness\n• Confirm risk is mitigated\n\n**4. Close the Issue**\n• Document verification results\n• Update issue status\n• Report to stakeholders\n• Archive work papers",
        },
        {
          title: 'Issue Status Categories',
          type: 'table',
          headers: ['Status', 'Definition', 'Auditor Action'],
          rows: [
            ['Open', 'Not yet started or in progress', 'Monitor timeline, offer assistance'],
            ['Pending Verification', 'Management says complete', 'Schedule testing, gather evidence'],
            ['Closed - Resolved', 'Verified remediation effective', 'Document closure, archive'],
            ['Closed - Risk Accepted', 'Management accepts residual risk', 'Document acceptance, escalate if appropriate'],
            ['Closed - Superseded', 'New finding covers same area', 'Link to new finding, close old'],
            ['Past Due', 'Missed target date', 'Escalate, assess revised timeline'],
          ],
        },
        {
          title: 'Verification Testing',
          type: 'text',
          content: "**Evidence of Remediation:**\n\n**Documentation Evidence:**\n• Updated policies/procedures\n• Configuration screenshots\n• Approval records\n• Training completion records\n\n**Testing Evidence:**\n• Reperform control tests\n• Sample transactions post-fix\n• Compare before/after states\n• Review exception reports\n\n**Observation Evidence:**\n• Watch the control operate\n• Interview practitioners\n• Inspect physical controls\n\n**Automation Evidence:**\n• System-generated reports\n• Audit log entries\n• Automated alerts functioning",
        },
        {
          title: '🧠 Memory Aid: TEST',
          type: 'callout',
          content: "**Verify remediation using TEST:**\n\n• **T**ransaction testing (sample after implementation)\n• **E**vidence review (documents, screenshots)\n• **S**takeholder confirmation (interviews)\n• **T**echnical validation (system checks)",
        },
        {
          title: 'When Remediation Fails',
          type: 'text',
          content: "**Scenarios Requiring Escalation:**\n\n**1. Remediation Not Effective**\n• Control implemented but doesn't work\n• Action: Reopen finding, discuss alternatives\n\n**2. Repeated Extensions**\n• Multiple missed deadlines\n• Action: Escalate to audit committee\n\n**3. Management Non-Response**\n• No progress updates\n• Action: Formal communication, escalation\n\n**4. Risk Acceptance Without Authority**\n• Owner tries to close without senior approval\n• Action: Reject closure, require proper sign-off\n\n**5. Recurring Issues**\n• Same finding in multiple audits\n• Action: Report systemic weakness, elevate priority",
        },
        {
          title: 'Reporting on Issue Status',
          type: 'text',
          content: "**Common Metrics for Leadership:**\n\n• Number of open issues by severity\n• Aging of open issues (days/months past due)\n• Issues closed on time vs. late\n• Trend of open issues over time\n• Issues by business area or system\n• Root cause analysis (why issues recur)\n\n**Reporting Frequency:**\n• Audit Committee: Quarterly\n• Senior Management: Monthly\n• Business Units: As needed\n• Internal Audit Team: Continuously",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Track issues from finding to verified closure",
            "Verify remediation effectiveness, don't just accept management's word",
            "Escalate past-due items and ineffective remediations",
            "Risk acceptance requires appropriate senior authority",
            "Report issue status and trends to leadership regularly",
          ],
        },
      ],
    },
  },
];

export default cisa1LessonsBatch2;
