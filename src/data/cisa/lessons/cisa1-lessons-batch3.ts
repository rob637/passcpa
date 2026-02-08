/**
 * CISA Domain 1: Information Systems Auditing Process - Batch 3
 * Advanced topics: Risk-Based Auditing, Quality Assurance, and Professional Ethics
 */

import { Lesson } from '../../../types';

export const cisa1LessonsBatch3: Lesson[] = [
  // ===========================================================================
  // RISK-BASED AUDITING
  // ===========================================================================
  
  {
    id: 'CISA1-016',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Risk-Based Audit Planning',
    description: 'Learn to prioritize audit activities based on organizational risk assessment',
    order: 16,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Risk Assessment', 'Audit Universe', 'Annual Audit Plan', 'Resource Allocation'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Risk-based auditing ensures scarce audit resources focus on areas of greatest organizational risk. This approach is mandated by IIA standards and tested heavily on CISA.",
        },
        {
          title: 'The Risk-Based Approach',
          type: 'text',
          content: "**Traditional vs. Risk-Based Auditing:**\n\n**Traditional (Cyclical) Approach:**\n• Audit everything on a fixed schedule\n• Equal attention to all areas\n• May waste resources on low-risk areas\n• May miss emerging risks between cycles\n\n**Risk-Based Approach:**\n• Prioritize based on risk levels\n• More frequent audits of high-risk areas\n• Resources allocated proportionally\n• Flexible to address emerging risks\n• Required by modern audit standards\n\n**Benefits of Risk-Based Auditing:**\n• Better use of limited resources\n• Greater management confidence\n• Alignment with business objectives\n• Timely identification of significant issues\n• Enhanced audit credibility",
        },
        {
          title: 'Building the Audit Universe',
          type: 'text',
          content: "**The Audit Universe** is a complete inventory of all auditable entities in the organization.\n\n**Components May Include:**\n\n**Business Processes:**\n• Revenue cycle\n• Procurement cycle\n• Financial reporting\n• Human resources\n\n**IT Assets:**\n• Applications\n• Databases\n• Networks\n• Cloud services\n\n**Regulatory Requirements:**\n• SOX compliance\n• Data privacy (GDPR, CCPA)\n• Industry-specific (HIPAA, PCI)\n\n**Third Parties:**\n• Outsourced functions\n• Cloud providers\n• Key vendors\n\n**Projects:**\n• System implementations\n• Major initiatives",
        },
        {
          title: 'Risk Assessment Factors',
          type: 'table',
          headers: ['Factor', 'Description', 'Examples'],
          rows: [
            ['Impact', 'Potential harm if risks materialize', 'Financial loss, reputation damage, regulatory fines'],
            ['Likelihood', 'Probability of risk occurring', 'Historical incidents, threat landscape, control gaps'],
            ['Control Environment', 'Strength of existing controls', 'Prior audit results, management commitment'],
            ['Change', 'Degree of recent or planned change', 'New systems, reorganization, new regulations'],
            ['Complexity', 'Technical or operational complexity', 'System interdependencies, process complexity'],
            ['Materiality', 'Financial significance', 'Transaction volumes, asset values'],
            ['Time Since Last Audit', 'How long since area was examined', 'Prior audit date, findings addressed'],
          ],
        },
        {
          title: '🧠 Memory Aid: CL-IMATE',
          type: 'callout',
          content: "**Risk factors: CL-IMATE**\n\n• **C**hange - How much is changing?\n• **L**ikelihood - How probable?\n• **I**mpact - How severe?\n• **M**ateriality - How significant financially?\n• **A**udit history - When last reviewed?\n• **T**echnology complexity - How complex?\n• **E**nvironment - How strong are controls?",
        },
        {
          title: 'Developing the Risk-Based Audit Plan',
          type: 'text',
          content: "**Annual Audit Plan Development:**\n\n**Step 1: Update the Audit Universe**\n• Review for new systems/processes\n• Remove decommissioned items\n• Validate with management\n\n**Step 2: Assess Inherent Risk**\n• Score each entity on risk factors\n• Consider qualitative inputs\n• Consult with stakeholders\n\n**Step 3: Prioritize Entities**\n• Rank by combined risk score\n• Apply materiality thresholds\n• Consider coverage requirements\n\n**Step 4: Allocate Resources**\n• Match audit hours to risk levels\n• Consider team skills needed\n• Balance throughout the year\n\n**Step 5: Obtain Approval**\n• Present to audit committee\n• Document rationale\n• Plan for flexibility",
        },
        {
          title: 'Dynamic Risk Assessment',
          type: 'text',
          content: "**Adjusting the Plan Throughout the Year:**\n\nThe risk-based plan should be a living document that responds to:\n\n**Internal Changes:**\n• Organizational restructuring\n• System implementations\n• Management concerns\n• Prior audit findings\n\n**External Changes:**\n• Regulatory developments\n• Industry incidents\n• Emerging threats\n• Economic conditions\n\n**Reserve Capacity:**\n• Keep 10-15% capacity for unplanned work\n• Allows response to urgent requests\n• Enables emerging risk coverage\n\n**Communication:**\n• Report plan changes to audit committee\n• Document rationale for modifications\n• Track deferred audits for next cycle",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Risk-based auditing prioritizes resources toward highest-risk areas",
            "The audit universe inventories all auditable entities",
            "Risk factors include impact, likelihood, change, materiality, and control strength",
            "Annual audit plans should be approved by the audit committee",
            "Plans must be flexible to address emerging risks throughout the year",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-017',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'IT Risk Assessment Methodologies',
    description: 'Master quantitative and qualitative approaches to assessing IT risk',
    order: 17,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Quantitative Risk', 'Qualitative Risk', 'Risk Matrices', 'Risk Treatment'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IS auditors must understand how organizations assess and prioritize risks. Risk assessment methodology questions appear frequently on the CISA exam.",
        },
        {
          title: 'Quantitative vs. Qualitative Risk Assessment',
          type: 'table',
          headers: ['Aspect', 'Quantitative', 'Qualitative'],
          rows: [
            ['Output', 'Dollar values', 'Categories (High/Medium/Low)'],
            ['Data Required', 'Historical financial data', 'Expert judgment'],
            ['Precision', 'Appears precise', 'Subjective'],
            ['Effort', 'Resource-intensive', 'Faster to complete'],
            ['Best For', 'Insurance, budgeting', 'Prioritization, awareness'],
            ['Challenge', 'Data often unavailable', 'Consistency across raters'],
          ],
        },
        {
          title: 'Quantitative Risk Analysis',
          type: 'text',
          content: "**Key Formulas:**\n\n**Single Loss Expectancy (SLE)**\nSLE = Asset Value × Exposure Factor\n• Asset Value = Worth of the asset\n• Exposure Factor = % of asset lost\n\n**Annualized Rate of Occurrence (ARO)**\nARO = Expected number of incidents per year\n• Based on historical data or estimates\n\n**Annualized Loss Expectancy (ALE)**\nALE = SLE × ARO\n• Total expected loss per year\n• Used to justify security spending\n\n**Example:**\n• Server worth $100,000\n• Attack causes 30% damage (EF = 0.30)\n• Attack expected once every 5 years (ARO = 0.2)\n• SLE = $100,000 × 0.30 = $30,000\n• ALE = $30,000 × 0.2 = $6,000/year",
        },
        {
          title: '🧠 Memory Aid: ES-ARE',
          type: 'callout',
          content: "**Quantitative formulas: ES-ARE**\n\n• **E**xposure Factor × Asset Value = **S**LE\n• **A**RO × SLE = **ALE**\n\nThink: \"E-SARE\" - like \"Is Are\" but for risk math!",
        },
        {
          title: 'Qualitative Risk Assessment',
          type: 'text',
          content: "**Process:**\n\n**1. Identify Risks**\n• Brainstorming sessions\n• Interviews with stakeholders\n• Historical incident review\n• Industry benchmarks\n\n**2. Define Rating Scales**\n• Likelihood scale (e.g., 1-5 or L/M/H)\n• Impact scale (same approach)\n• Clear definitions for each level\n\n**3. Rate Each Risk**\n• Use consistent raters or consensus\n• Document rationale\n• Allow for adjustment\n\n**4. Plot on Risk Matrix**\n• Likelihood vs. Impact\n• Identifies priority quadrants\n• Guides treatment decisions",
        },
        {
          title: 'Sample Risk Matrix',
          type: 'table',
          headers: ['', 'Low Impact', 'Medium Impact', 'High Impact'],
          rows: [
            ['High Likelihood', 'Medium', 'High', 'Critical'],
            ['Medium Likelihood', 'Low', 'Medium', 'High'],
            ['Low Likelihood', 'Low', 'Low', 'Medium'],
          ],
        },
        {
          title: 'Risk Treatment Options',
          type: 'text',
          content: "**The Four Ts of Risk Treatment:**\n\n**1. Terminate (Avoid)**\n• Stop the activity causing risk\n• Example: Discontinue a risky product line\n• Not always feasible\n\n**2. Transfer**\n• Shift risk to another party\n• Example: Insurance, outsourcing\n• Cost of transfer vs. risk reduction\n\n**3. Tolerate (Accept)**\n• Accept residual risk\n• Appropriate when cost of treatment exceeds benefit\n• Requires documented approval\n\n**4. Treat (Mitigate)**\n• Implement controls to reduce risk\n• Most common response\n• Reduces likelihood or impact",
        },
        {
          title: 'Residual Risk',
          type: 'text',
          content: "**Inherent Risk vs. Residual Risk:**\n\n**Inherent Risk**\n= Risk before any controls\n= Gross risk level\n\n**Control Effectiveness**\n= How much risk controls reduce\n= Measured through testing\n\n**Residual Risk**\n= Inherent Risk - Control Effectiveness\n= Risk remaining after controls\n= Must be accepted by management\n\n**Risk Appetite vs. Risk Tolerance:**\n• Risk Appetite = How much risk the org wants to take\n• Risk Tolerance = Acceptable variance from appetite\n• Residual risk should fall within tolerance",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Quantitative gives dollar values (ALE = SLE × ARO); qualitative gives categories",
            "SLE = Asset Value × Exposure Factor",
            "Risk matrices plot likelihood vs. impact to prioritize",
            "Treatment options: Terminate, Transfer, Tolerate, Treat (The Four Ts)",
            "Residual risk is what remains after controls and must be formally accepted",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-018',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit Quality Assurance and Improvement',
    description: 'Understand how to maintain and enhance the quality of the IS audit function',
    order: 18,
    duration: 45,
    difficulty: 'advanced',
    topics: ['Quality Assurance', 'Internal Assessment', 'External Assessment', 'Continuous Improvement'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Quality assurance ensures audit work meets professional standards and provides reliable assurance. The IIA Standards require a Quality Assurance and Improvement Program (QAIP).",
        },
        {
          title: 'Quality Assurance and Improvement Program (QAIP)',
          type: 'text',
          content: "**QAIP Components:**\n\n**Purpose:**\n• Ensure audit activity conforms to Standards\n• Promote continuous improvement\n• Enhance credibility with stakeholders\n• Identify improvement opportunities\n\n**Required Elements:**\n• Internal assessments (ongoing + periodic)\n• External assessments (at least every 5 years)\n• Results communicated to senior management and board\n• Chief Audit Executive responsibility\n\n**Coverage:**\n• All aspects of the internal audit activity\n• Conformance with Definition, Standards, Code of Ethics\n• Efficiency and effectiveness of operations",
        },
        {
          title: 'Internal Assessments',
          type: 'table',
          headers: ['Type', 'Frequency', 'Methods', 'Performed By'],
          rows: [
            ['Ongoing Monitoring', 'Continuous', 'Supervision, checklists, feedback', 'Audit management'],
            ['Periodic Self-Assessment', 'Annual', 'Self-assessment surveys, benchmarking', 'Audit team with oversight'],
          ],
        },
        {
          title: 'Ongoing Monitoring Activities',
          type: 'text',
          content: "**Supervision:**\n• Review of work papers\n• Coaching during fieldwork\n• Sign-off on conclusions\n• Timeliness tracking\n\n**Checklists and Templates:**\n• Standardized work paper formats\n• Completion checklists\n• Quality review questions\n\n**Performance Metrics:**\n• Cycle time by audit phase\n• Budget vs. actual hours\n• Client satisfaction scores\n• Finding acceptance rates\n\n**Feedback Mechanisms:**\n• Post-audit surveys\n• Exit meeting input\n• Periodic stakeholder interviews",
        },
        {
          title: 'External Assessments',
          type: 'text',
          content: "**Requirements:**\n• At least once every 5 years\n• Qualified, independent assessor\n• Self-assessment with independent validation allowed\n\n**Assessor Qualifications:**\n• Competent in professional practice of internal auditing\n• Independent of the organization being assessed\n• No conflict of interest\n\n**Assessment Scope:**\n• Conformance with Standards and Code of Ethics\n• Efficiency and effectiveness of activities\n• Comparison to best practices and successful practices\n\n**Outcome:**\n• Opinion on conformance\n• Recommendations for improvement\n• Results reported to board",
        },
        {
          title: 'Quality Review Process',
          type: 'text',
          content: "**Work Paper Review Checklist:**\n\n**Completeness:**\n□ All testing documented\n□ Evidence attached or cross-referenced\n□ Conclusions supported\n□ All sections of template completed\n\n**Accuracy:**\n□ Calculations verified\n□ Dates and references correct\n□ Naming conventions followed\n□ No copy/paste errors\n\n**Clarity:**\n□ Understandable by third party\n□ Abbreviations defined\n□ Logical organization\n□ Professional language\n\n**Timeliness:**\n□ Completed during fieldwork\n□ Review notes addressed promptly\n□ Filing deadline met",
        },
        {
          title: 'Continuous Improvement',
          type: 'text',
          content: "**Sources of Improvement Opportunities:**\n\n• QAIP assessment findings\n• Client feedback and surveys\n• Industry benchmarking\n• Professional development insights\n• Lessons learned sessions\n• Peer reviews\n• External auditor feedback\n\n**Improvement Categories:**\n\n• **Methodologies:** Better audit approaches, tools\n• **Technology:** Audit software, data analytics\n• **Skills:** Training, certifications, hiring\n• **Processes:** Efficiency gains, automation\n• **Communication:** Reporting clarity, stakeholder relations",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "QAIP includes ongoing internal, periodic internal, and external assessments",
            "External assessments required at least every 5 years",
            "CAE is responsible for the QAIP and communicating results to the board",
            "Quality reviews check work papers for completeness, accuracy, clarity, timeliness",
            "Continuous improvement leverages assessments, feedback, and benchmarking",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-019',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'IS Audit Professional Ethics',
    description: 'Learn the ethical principles that guide IS audit professional conduct',
    order: 19,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Ethics', 'Independence', 'Objectivity', 'Confidentiality', 'Code of Ethics'],
    blueprintArea: 'CISA1-A',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Ethical conduct is the foundation of audit credibility. The CISA exam tests understanding of ISACA's Code of Professional Ethics and common ethical dilemmas.",
        },
        {
          title: 'ISACA Code of Professional Ethics',
          type: 'text',
          content: "**Principles:**\n\n**1. Support Implementation of Standards**\n• Follow ISACA standards and guidelines\n• Support their implementation in practice\n\n**2. Maintain Privacy and Confidentiality**\n• Protect information obtained in work\n• Not disclose without proper authorization\n• Exception: Legal or professional obligations\n\n**3. Maintain Competence**\n• Only accept work you're qualified to perform\n• Continuously improve skills\n• Act with due professional care\n\n**4. Act with Integrity**\n• Honest and trustworthy\n• Avoid conflicts of interest\n• Report impairments to independence\n\n**5. Maintain Independence**\n• Real and perceived independence\n• Avoid activities that impair objectivity\n\n**6. Uphold Professional Standards**\n• Reflect positively on the profession\n• Avoid actions that discredit ISACA",
        },
        {
          title: 'Independence and Objectivity',
          type: 'table',
          headers: ['Concept', 'Definition', 'Threats'],
          rows: [
            ['Organizational Independence', 'Audit function free from management influence', 'Reporting to operations, budget control by auditee'],
            ['Individual Independence', 'Auditor free from personal bias', 'Prior involvement, relationships, financial interest'],
            ['Professional Objectivity', 'Unbiased judgment in evaluations', 'Preconceived notions, confirmation bias'],
          ],
        },
        {
          title: 'Common Ethical Dilemmas',
          type: 'text',
          content: "**Scenario 1: Prior Involvement**\n• Auditor implemented the system being audited\n• Impairment to independence\n• Solution: Disclose and reassign\n\n**Scenario 2: Management Pressure**\n• Executive asks to soften finding\n• Threatens audit credibility\n• Solution: Maintain professional judgment, escalate\n\n**Scenario 3: Confidentiality Conflict**\n• Auditor discovers fraud\n• Confidentiality vs. duty to report\n• Solution: Follow organization's fraud reporting policy\n\n**Scenario 4: Gifts and Entertainment**\n• Auditee offers expensive gift\n• Creates appearance of impropriety\n• Solution: Decline or follow organization's gift policy\n\n**Scenario 5: Outside Employment**\n• Auditor consults for company they might audit\n• Conflict of interest\n• Solution: Disclose and avoid the engagement",
        },
        {
          title: '🧠 Memory Aid: SPIC-MU',
          type: 'callout',
          content: "**ISACA Ethics Code: SPIC-MU**\n\n• **S**tandards - Support implementation\n• **P**rivacy - Maintain confidentiality\n• **I**ntegrity - Act honestly\n• **C**ompetence - Stay qualified\n• **M**aintain independence\n• **U**phold professional standards",
        },
        {
          title: 'Safeguards for Independence',
          type: 'text',
          content: "**Organizational Safeguards:**\n• Report functionally to the board/audit committee\n• Administrative reporting separate from operational management\n• Audit committee approves CAE appointment/removal\n• Adequate resources independent of management\n\n**Individual Safeguards:**\n• Rotation of audit assignments\n• Cooling-off periods after operational roles\n• Mandatory disclosure of conflicts\n• Review by independent parties\n\n**Engagement Safeguards:**\n• Scope approved by audit committee\n• Access to information and personnel\n• Authority to report findings directly\n• Protection from retaliation",
        },
        {
          title: 'Reporting Impairments',
          type: 'text',
          content: "**When to Report:**\n\n• Impairment is known or should be known\n• Before undertaking the engagement\n• As soon as impairment is discovered\n\n**Who to Report To:**\n\n• Chief Audit Executive\n• Audit Committee (for organizational impairments)\n• Appropriate parties based on nature of impairment\n\n**Documentation:**\n\n• Nature of the impairment\n• Steps taken to address\n• Resolution or mitigation\n• Disclosure in audit report if material",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ISACA Code covers: Standards, Privacy, Integrity, Competence, Independence, Professional Standards",
            "Independence must be organizational (audit function) and individual (auditor)",
            "Common threats: prior involvement, relationships, management pressure, gifts",
            "Impairments to independence must be disclosed and addressed",
            "Audit committee provides key safeguard for organizational independence",
          ],
        },
      ],
    },
  },

  {
    id: 'CISA1-020',
    courseId: 'cisa',
    section: 'CISA1',
    title: 'Audit of Third-Party and Outsourced Functions',
    description: 'Learn to assess controls over vendors, cloud providers, and outsourced operations',
    order: 20,
    duration: 50,
    difficulty: 'advanced',
    topics: ['Third-Party Risk', 'SOC Reports', 'Vendor Management', 'Cloud Auditing'],
    blueprintArea: 'CISA1-B',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Organizations increasingly rely on third parties for critical functions. The organization remains responsible for controls even when operations are outsourced. Third-party risk is a hot topic on the CISA exam.",
        },
        {
          title: 'Third-Party Risk Categories',
          type: 'text',
          content: "**Strategic Risk:**\n• Vendor fails to deliver expected value\n• Misalignment with business objectives\n\n**Operational Risk:**\n• Service disruptions\n• Performance failures\n• Process breakdown\n\n**Compliance Risk:**\n• Regulatory violations\n• Contract breaches\n• Audit failures\n\n**Financial Risk:**\n• Vendor financial instability\n• Unexpected costs\n• Disputes over billing\n\n**Reputational Risk:**\n• Vendor incidents reflect on organization\n• Customer trust impact\n• Media exposure\n\n**Information Security Risk:**\n• Data breaches at vendor\n• Unauthorized access\n• Inadequate controls",
        },
        {
          title: 'Third-Party Risk Management Process',
          type: 'table',
          headers: ['Phase', 'Activities', 'Audit Focus'],
          rows: [
            ['Due Diligence', 'Evaluate vendor before selection', 'Was risk assessment performed? Documented?'],
            ['Contracting', 'Define security requirements, SLAs', 'Are security terms adequate? Right to audit?'],
            ['Onboarding', 'Provision access, train on policies', 'Appropriate access? Policies communicated?'],
            ['Ongoing Monitoring', 'Review performance, assess risks', 'Regular reviews? Issues addressed?'],
            ['Periodic Assessment', 'Evaluate controls, audit', 'Latest SOC report? Findings resolved?'],
            ['Termination', 'Revoke access, return data', 'Complete offboarding? Data handled properly?'],
          ],
        },
        {
          title: 'SOC Reports Explained',
          type: 'text',
          content: "**SOC = Service Organization Control**\n\n**SOC 1 (ICFR - Financial Reporting)**\n• Controls relevant to user financial statements\n• Replaces SAS 70\n• Used by financial statement auditors\n\n**SOC 2 (Trust Services Criteria)**\n• Security, Availability, Processing Integrity, Confidentiality, Privacy\n• Relevant for IT controls evaluation\n• Most commonly requested by customers\n\n**SOC 3 (General Use)**\n• Public summary report\n• Same criteria as SOC 2\n• No detailed description of tests\n\n**Type I vs. Type II:**\n• Type I: Design of controls at a point in time\n• Type II: Design AND operating effectiveness over a period\n• Type II is more valuable for reliance",
        },
        {
          title: '🧠 Memory Aid: SOC Types',
          type: 'callout',
          content: "**SOC 1** = **F**inancial (think: 1 = First priority is financials)\n**SOC 2** = **T**echnical (think: 2 = Technical controls)\n**SOC 3** = **G**eneral public (think: 3 = General audience)\n\n**Type I** = **I**nstant (point in time)\n**Type II** = **T**imeframe (period of time)",
        },
        {
          title: 'Using SOC Reports in Audits',
          type: 'text',
          content: "**Evaluating a SOC Report:**\n\n**1. Confirm Coverage**\n• Does report cover services you use?\n• Report period matches your needs?\n• Type II preferred over Type I\n\n**2. Review Auditor's Opinion**\n• Unqualified (clean) opinion desired\n• Note any exceptions or qualifications\n• Understand basis for opinion\n\n**3. Evaluate Control Descriptions**\n• Controls adequate for your needs?\n• Any gaps in coverage?\n• Understand complementary user controls\n\n**4. Review Test Results**\n• Any exceptions noted?\n• Are exceptions material to your reliance?\n• How did service organization respond?\n\n**5. Assess Complementary User Controls**\n• These are YOUR responsibility\n• Must be in place for system to work as intended\n• Document your implementation",
        },
        {
          title: 'Cloud Provider Auditing',
          type: 'text',
          content: "**Cloud Audit Challenges:**\n\n**Limited Access:**\n• Can't walk into cloud data centers\n• Rely on provider attestations\n• Contract for audit rights\n\n**Shared Responsibility:**\n• Provider secures infrastructure\n• Customer secures data and access\n• Model varies by service type (IaaS/PaaS/SaaS)\n\n**Multi-Tenancy:**\n• Data segregation controls critical\n• Other tenants' activities could affect you\n• Understand isolation mechanisms\n\n**Audit Approach:**\n• Obtain SOC 2 reports\n• Review certifications (ISO 27001, CSA STAR)\n• Test customer-controlled settings\n• Verify compliance configurations\n• Test access management and encryption",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Organizations remain responsible for controls over outsourced functions",
            "Third-party risk includes operational, compliance, financial, security, and reputational",
            "SOC 1 = financial controls; SOC 2 = security/privacy; SOC 3 = public summary",
            "Type II reports cover operating effectiveness over time (more valuable than Type I)",
            "Cloud audits rely on SOC reports, certifications, and testing customer configurations",
          ],
        },
      ],
    },
  },
];

export default cisa1LessonsBatch3;
