/**
 * CIA Part 1: Essentials of Internal Auditing
 * 125 questions | 2.5 hours | Scaled score 600/750 to pass
 * 
 * Domain I: Foundations of Internal Auditing (40%)
 * Domain II: Independence and Objectivity (15%)
 * Domain III: Proficiency and Due Professional Care (15%)
 * Domain IV: Quality Assurance and Improvement Program (10%)
 * Domain V: Governance, Risk Management, and Control (20%)
 * 
 * Based on IIA Global Internal Audit Standards (2024)
 */

import { Lesson } from '../../../types';

export const cia1Lessons: Lesson[] = [
  // ============================================================================
  // DOMAIN I: FOUNDATIONS OF INTERNAL AUDITING (40%)
  // ============================================================================
  
  {
    id: 'CIA1-I-001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Mission and Definition of Internal Auditing',
    description: 'Understand the core purpose and definition of internal auditing as defined by the IIA',
    order: 1,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Mission', 'Definition', 'Purpose', 'Value proposition'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The IIA's Mission and Definition are the BEDROCK of the profession. Every exam question about internal audit's purpose traces back to these concepts. Memorize them word-for-word - they're heavily tested!",
        },
        {
          title: 'The Mission of Internal Audit',
          type: 'text',
          content: "**Official IIA Mission Statement:**\n\n\"To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight.\"\n\n**Key elements:**\n• **Enhance** - Add value, improve operations\n• **Protect** - Safeguard assets, prevent fraud\n• **Risk-based** - Focus on what matters most\n• **Objective** - Independent, unbiased perspective\n• **Assurance** - Confirm controls work\n• **Advice** - Consulting services\n• **Insight** - Forward-looking perspective",
        },
        {
          title: 'Definition of Internal Auditing',
          type: 'text',
          content: "**Official IIA Definition:**\n\n\"Internal auditing is an independent, objective assurance and consulting activity designed to add value and improve an organization's operations. It helps an organization accomplish its objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control, and governance processes.\"\n\n**Critical phrases to remember:**\n• Independent and objective\n• Assurance AND consulting\n• Add value\n• Systematic, disciplined approach\n• Risk management, control, governance",
        },
        {
          title: '🧠 Memory Aid: Definition Keywords',
          type: 'callout',
          content: "**\"I-O-A-C-A-V-S-D-R-C-G\"**\n\n**I**ndependent\n**O**bjective\n**A**ssurance & **C**onsulting\n**A**dd **V**alue\n**S**ystematic, **D**isciplined\n**R**isk, **C**ontrol, **G**overnance\n\n*Or remember: \"Internal Audit Creates Value Systematically\"*",
        },
        {
          title: 'Assurance vs. Consulting Services',
          type: 'table',
          headers: ['Aspect', 'Assurance Services', 'Consulting Services'],
          rows: [
            ['Parties', '3 parties (auditee, auditor, user)', '2 parties (customer, auditor)'],
            ['Nature', 'Objective examination of evidence', 'Advisory activities'],
            ['Who requests', 'Audit plan/management request', 'Specific customer request'],
            ['Scope determined by', 'Auditor based on risk', 'Customer/client needs'],
            ['Examples', 'Financial audits, compliance audits', 'Training, process design, facilitation'],
          ],
        },
        {
          title: 'Value Proposition of Internal Audit',
          type: 'text',
          content: "**Internal Audit adds value by:**\n\n**1. Objective Assurance**\n• Independent verification of controls\n• Unbiased risk assessment\n• Validation of compliance\n\n**2. Risk-Based Focus**\n• Prioritizes high-risk areas\n• Aligns with strategic objectives\n• Efficient use of audit resources\n\n**3. Insight and Foresight**\n• Catalyst for change\n• Best practice identification\n• Emerging risk identification\n\n**4. Governance Support**\n• Board and audit committee support\n• Ethics and compliance culture\n• Accountability framework",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Mission: Enhance and protect organizational value",
            "Definition emphasizes independence, objectivity, and adding value",
            "Assurance has 3 parties; Consulting has 2 parties",
            "Systematic, disciplined approach to risk, control, governance",
            "Both assurance and consulting services add value",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-I-002',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Core Principles for Internal Auditing',
    description: 'Master the 10 Core Principles that articulate internal audit effectiveness',
    order: 2,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Core Principles', 'Effectiveness', 'Professional standards'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Core Principles define what EFFECTIVE internal auditing looks like. If all 10 principles are operating effectively, internal audit is effective. Exam questions frequently test whether an action aligns with or violates these principles.",
        },
        {
          title: 'The 10 Core Principles',
          type: 'text',
          content: "**Taken together, the Core Principles articulate internal audit effectiveness:**\n\n1. Demonstrates integrity\n2. Demonstrates competence and due professional care\n3. Is objective and free from undue influence (independent)\n4. Aligns with the strategies, objectives, and risks of the organization\n5. Is appropriately positioned and adequately resourced\n6. Demonstrates quality and continuous improvement\n7. Communicates effectively\n8. Provides risk-based assurance\n9. Is insightful, proactive, and future-focused\n10. Promotes organizational improvement",
        },
        {
          title: '🧠 Memory Aid: Core Principles',
          type: 'callout',
          content: "**\"I-C-O-A-P-Q-C-R-I-P\"** (memorize in order!)\n\nOr group by theme:\n\n**Character:** Integrity, Competence, Objectivity\n**Alignment:** Aligned, Positioned, Quality\n**Delivery:** Communicates, Risk-based, Insightful, Promotes improvement\n\n*\"ICO-APQ-CRIP\" - sounds like \"I co-APQ-crisp\"*",
        },
        {
          title: 'Principle Deep Dive',
          type: 'table',
          headers: ['Principle', 'Key Concept', 'Example'],
          rows: [
            ['Integrity', 'Honesty, ethical behavior', 'Reporting all findings, not just favorable ones'],
            ['Competence', 'Knowledge, skills, experience', 'CBOK training, technical certifications'],
            ['Objectivity', 'Unbiased, no conflicts', 'Declining audit of area where auditor worked'],
            ['Aligned', 'Matches org objectives', 'Audit plan addresses strategic risks'],
            ['Positioned', 'CAE reports to board', 'Functional reporting to audit committee'],
            ['Quality', 'QAIP, continuous improvement', 'External quality assessment every 5 years'],
            ['Communicates', 'Clear, timely, accurate', 'Reports within agreed timeframes'],
            ['Risk-based', 'Focus on high-risk areas', 'Annual risk assessment drives audit plan'],
            ['Insightful', 'Forward-looking', 'Emerging risk identification'],
            ['Promotes improvement', 'Catalyst for change', 'Recommendations that enhance operations'],
          ],
        },
        {
          title: 'Using Core Principles',
          type: 'text',
          content: "**For effectiveness assessment:**\n• All 10 must be operating effectively\n• Partial achievement = Not fully effective\n• Used for internal self-assessment\n\n**For exam questions:**\n• Identify which principle applies\n• Assess if action supports or violates principle\n• Core principles inform Standards interpretation",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "10 Core Principles define internal audit effectiveness",
            "ALL principles must be met for effectiveness",
            "ICO-APQ-CRIP mnemonic for memorization",
            "Principles guide behavior and quality assessment",
            "Used in conjunction with Standards and Code of Ethics",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-I-003',
    courseId: 'cia',
    section: 'CIA1',
    title: 'IIA Code of Ethics',
    description: 'Master the four principles and rules of conduct in the IIA Code of Ethics',
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Code of Ethics', 'Integrity', 'Objectivity', 'Confidentiality', 'Competency'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Code of Ethics is MANDATORY for all IIA members and CIA holders. Ethics questions appear on EVERY CIA exam. Know the 4 principles, their rules of conduct, and how to apply them to scenarios!",
        },
        {
          title: 'Purpose of the Code of Ethics',
          type: 'text',
          content: "**The Code promotes an ethical culture** in the internal auditing profession.\n\n**Applicability:**\n• All IIA members\n• All CIA, QIAL, CGAP, CFSA, and CCSA holders\n• All individuals providing internal audit services\n\n**Components:**\n1. **Principles** - Fundamental expectations\n2. **Rules of Conduct** - Behavioral norms",
        },
        {
          title: 'The Four Principles',
          type: 'text',
          content: "**1. INTEGRITY**\nIntegrity establishes trust and provides the basis for reliance on judgment.\n\n**2. OBJECTIVITY**\nExhibit highest level of professional objectivity in gathering, evaluating, and communicating information.\n\n**3. CONFIDENTIALITY**\nRespect the value and ownership of information received; do not disclose without authority.\n\n**4. COMPETENCY**\nApply knowledge, skills, and experience needed services.\n\n**Memorize: I-O-C-C**",
        },
        {
          title: '🧠 Memory Aid: IOCC',
          type: 'callout',
          content: "**\"I-O-C-C\"** = **I** **O**nly **C**ertify **C**ompetently\n\nOr: **I**ntegrity, **O**bjectivity, **C**onfidentiality, **C**ompetency\n\n*In order of importance: Trust → Fairness → Discretion → Ability*",
        },
        {
          title: 'Rules of Conduct: Integrity',
          type: 'text',
          content: "Internal auditors shall:\n\n• Perform work with **honesty, diligence, and responsibility**\n• Observe the **law** and make disclosures expected by law/profession\n• **Not knowingly** be party to illegal activity or acts discrediting profession\n• **Respect and contribute** to legitimate and ethical objectives",
        },
        {
          title: 'Rules of Conduct: Objectivity',
          type: 'text',
          content: "Internal auditors shall:\n\n• **Not participate** in activities that would impair judgment\n• **Not accept** anything that would impair judgment\n• **Disclose all material facts** known (otherwise distort reporting)\n• **Disclose relationships** that could create conflict of interest",
        },
        {
          title: 'Rules of Conduct: Confidentiality',
          type: 'text',
          content: "Internal auditors shall:\n\n• Be **prudent** in use and protection of information\n• **Not use information** for personal gain or in any manner contrary to law or detrimental to organization",
        },
        {
          title: 'Rules of Conduct: Competency',
          type: 'text',
          content: "Internal auditors shall:\n\n• **Engage only in services** for which they have necessary knowledge, skills, and experience\n• Perform services in accordance with **International Standards**\n• **Continually improve** proficiency, effectiveness, and quality of services",
        },
        {
          title: '⚠️ Exam Trap: Ethics Scenarios',
          type: 'warning',
          content: "**Common exam scenarios:**\n\n❌ Auditor uses confidential info for stock trading → Violates CONFIDENTIALITY\n❌ Auditor doesn't disclose family works in audited area → Violates OBJECTIVITY\n❌ Auditor conducts IT audit without IT knowledge → Violates COMPETENCY\n❌ Auditor ignores evidence of fraud → Violates INTEGRITY\n\n**When in doubt:** If it \"feels wrong,\" it probably violates the Code!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four principles: Integrity, Objectivity, Confidentiality, Competency (IOCC)",
            "Mandatory for IIA members and certification holders",
            "Rules of Conduct provide specific behavioral guidance",
            "Objectivity: Must disclose ALL material facts",
            "Confidentiality: Prudent use, no personal gain",
            "Competency: Only perform work you're qualified for",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-I-004',
    courseId: 'cia',
    section: 'CIA1',
    title: 'International Professional Practices Framework (IPPF)',
    description: 'Understand the structure and components of the IIA\'s authoritative guidance',
    order: 4,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['IPPF', 'Standards', 'Mandatory guidance', 'Recommended guidance'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The IPPF is the authoritative framework for internal auditing worldwide. Understanding what's MANDATORY vs. RECOMMENDED is critical - exam questions test this distinction constantly!",
        },
        {
          title: 'What is the IPPF?',
          type: 'text',
          content: "**International Professional Practices Framework (IPPF)**\n\nThe conceptual framework organizing authoritative guidance from the IIA.\n\n**Two categories:**\n1. **Mandatory Guidance** - MUST follow\n2. **Recommended Guidance** - SHOULD consider\n\n**Purpose:**\n• Provides consistent, global standards\n• Establishes professional expectations\n• Supports quality and credibility",
        },
        {
          title: 'Mandatory Guidance',
          type: 'text',
          content: "**These are REQUIRED for professional practice:**\n\n**1. Core Principles** (10 principles)\n• Define effective internal auditing\n• Must all be present for effectiveness\n\n**2. Definition of Internal Auditing**\n• States fundamental purpose and nature\n\n**3. Code of Ethics**\n• Four principles: IOCC\n• Rules of Conduct\n\n**4. International Standards**\n• Attribute Standards (1000s)\n• Performance Standards (2000s)",
        },
        {
          title: 'Recommended Guidance',
          type: 'text',
          content: "**These SHOULD be considered but are not required:**\n\n**1. Implementation Guidance**\n• How to apply the Standards\n• Approved by IIA\n• Addresses approach, methodology, consideration\n\n**2. Supplemental Guidance**\n• Detailed guidance for specific areas\n• Industry-specific guidance\n• GTAG (Global Technology Audit Guides)\n• Practice Guides",
        },
        {
          title: '🧠 Memory Aid: IPPF Structure',
          type: 'callout',
          content: "**Mandatory = \"Must Do\"**\n• Core Principles\n• Definition\n• Code of Ethics\n• Standards\n\n**Recommended = \"Should Consider\"**\n• Implementation Guidance\n• Supplemental Guidance\n\n*Think: \"Principles, Definition, Ethics, Standards\" = PDES = \"Please Do Everything Standardly\"*",
        },
        {
          title: 'International Standards Categories',
          type: 'table',
          headers: ['Category', 'Number Series', 'Focus'],
          rows: [
            ['Attribute Standards', '1000-1999', 'Characteristics of organizations and individuals'],
            ['Performance Standards', '2000-2999', 'Nature of internal auditing activities'],
            ['Implementation Standards', 'Suffix A or C', 'Specific to Assurance (A) or Consulting (C)'],
          ],
        },
        {
          title: 'Attribute Standards Overview',
          type: 'text',
          content: "**1000 - Purpose, Authority, and Responsibility**\n• Internal audit charter\n\n**1100 - Independence and Objectivity**\n• Organizational/individual\n\n**1200 - Proficiency and Due Professional Care**\n• Knowledge, skills, competencies\n\n**1300 - Quality Assurance and Improvement Program**\n• Internal and external assessments",
        },
        {
          title: 'Performance Standards Overview',
          type: 'text',
          content: "**2000 - Managing the Internal Audit Activity**\n**2100 - Nature of Work**\n**2200 - Engagement Planning**\n**2300 - Performing the Engagement**\n**2400 - Communicating Results**\n**2500 - Monitoring Progress**\n**2600 - Communicating Acceptance of Risks**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IPPF = Mandatory + Recommended Guidance",
            "Mandatory: Core Principles, Definition, Ethics, Standards",
            "Recommended: Implementation and Supplemental Guidance",
            "Attribute Standards (1000s): WHO - characteristics",
            "Performance Standards (2000s): WHAT - activities",
            "Implementation Standards have A (Assurance) or C (Consulting) suffix",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-I-005',
    courseId: 'cia',
    section: 'CIA1',
    title: 'The Internal Audit Charter',
    description: 'Understand the purpose, elements, and approval of the internal audit charter',
    order: 5,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Charter', 'Standard 1000', 'Purpose', 'Authority', 'Responsibility'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The charter is the FOUNDATION DOCUMENT that establishes internal audit's authority and role. Standard 1000 requires it. Know what must be in it, who approves it, and when to update it!",
        },
        {
          title: 'What is the Internal Audit Charter?',
          type: 'text',
          content: "**Definition (Standard 1000):**\n\nA formal document that defines:\n• Purpose\n• Authority\n• Responsibility\n\nof the internal audit activity.\n\n**Key characteristics:**\n• Written document\n• Approved by the Board\n• Periodically reviewed\n• Establishes IA position within organization",
        },
        {
          title: 'Required Charter Elements',
          type: 'text',
          content: "**Must include:**\n\n**1. Purpose**\n• Mission of internal audit\n• Definition of internal auditing\n• Core Principles reference\n\n**2. Authority**\n• Right to access people, records, property\n• Scope of internal audit activities\n• Unrestricted access\n\n**3. Responsibility**\n• Nature of assurance services\n• Nature of consulting services\n• Relationship to other assurance providers",
        },
        {
          title: 'Charter Must Also Address',
          type: 'text',
          content: "**Per Standards, the charter must:**\n\n• Recognize mandatory nature of Core Principles, Definition, Code of Ethics, and Standards\n• Define scope of internal audit activities\n• Establish CAE's functional reporting relationship to the Board\n• Authorize access to records, personnel, and physical properties\n• Define nature of consulting services",
        },
        {
          title: '🧠 Memory Aid: Charter Elements',
          type: 'callout',
          content: "**\"PAR\"** = **P**urpose, **A**uthority, **R**esponsibility\n\n**Plus remember:**\n• **Access** - unrestricted access to everything\n• **Reporting** - functional reporting to Board\n• **Standards** - recognize mandatory guidance\n• **Scope** - define what IA covers",
        },
        {
          title: 'Charter Approval and Review',
          type: 'table',
          headers: ['Activity', 'Who', 'When'],
          rows: [
            ['Initial approval', 'Board/Audit Committee', 'When charter created'],
            ['Periodic review', 'CAE with management', 'Annually (best practice)'],
            ['Changes approval', 'Board/Audit Committee', 'When updates needed'],
            ['Presentation', 'CAE presents to Board', 'Regular communication'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Board Approval',
          type: 'warning',
          content: "**The BOARD (or Audit Committee) must approve:**\n• Initial charter\n• All charter changes\n• Functional reporting relationship\n\n**Senior management does NOT approve the charter!**\n\nThis is a key element of organizational independence.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Charter defines Purpose, Authority, Responsibility (PAR)",
            "Must be approved by the Board/Audit Committee",
            "Establishes unrestricted access to records, personnel, property",
            "Recognizes mandatory IPPF guidance",
            "Should be reviewed periodically (at least annually)",
            "Changes require Board approval",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN II: INDEPENDENCE AND OBJECTIVITY (15%)
  // ============================================================================

  {
    id: 'CIA1-II-001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Organizational Independence',
    description: 'Understand how internal audit achieves and maintains organizational independence',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Organizational independence', 'Reporting relationships', 'CAE position', 'Standard 1110'],
    blueprintArea: 'CIA1-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Organizational independence is what gives internal audit CREDIBILITY. Without it, stakeholders can't trust audit findings. The dual reporting relationship (functional to Board, administrative to management) is heavily tested!",
        },
        {
          title: 'What is Organizational Independence?',
          type: 'text',
          content: "**Standard 1110:**\n\nThe chief audit executive must report to a level within the organization that allows the internal audit activity to fulfill its responsibilities.\n\n**Key concept:**\nInternal audit is positioned to perform work without interference from the areas being audited.\n\n**Why it matters:**\n• Ensures objective assessments\n• Prevents retaliation for adverse findings\n• Enables access to all levels including Board",
        },
        {
          title: 'Dual Reporting Relationship',
          type: 'text',
          content: "**Two types of reporting:**\n\n**1. FUNCTIONAL Reporting to the Board**\n• Approving charter, audit plan, budget\n• CAE appointment, removal, compensation\n• Receiving audit results\n• Following up on management response\n\n**2. ADMINISTRATIVE Reporting to Senior Management**\n• Day-to-day operations\n• Internal policies compliance\n• HR administration\n• Resource allocation decisions",
        },
        {
          title: '🧠 Memory Aid: Functional vs. Administrative',
          type: 'callout',
          content: "**FUNCTIONAL to BOARD** = The BIG stuff\n• Charter approval\n• Audit plan approval\n• CAE hiring/firing\n• Results communication\n\n**ADMINISTRATIVE to CEO** = The daily stuff\n• Expense reports\n• Office supplies\n• Vacation requests\n• Staff management\n\n*Think: \"BOARD approves, CEO administers\"*",
        },
        {
          title: 'Board Interaction Requirements',
          type: 'text',
          content: "**The CAE must have direct access to the Board:**\n\n• Attend Board/Audit Committee meetings\n• Meet privately with the Board (without management)\n• Communicate directly without management filter\n\n**Board responsibilities for IA:**\n• Approve charter, plan, budget\n• Make CAE employment decisions\n• Inquire about scope limitations\n• Approve external quality assessment provider",
        },
        {
          title: 'Threats to Organizational Independence',
          type: 'table',
          headers: ['Threat', 'Example', 'Safeguard'],
          rows: [
            ['Improper reporting line', 'CAE reports to CFO only', 'Functional reporting to Board'],
            ['Budget control by management', 'Management cuts IA budget', 'Board approves budget'],
            ['CAE removal by management', 'CEO fires CAE for bad news', 'Board approves CAE changes'],
            ['Scope restrictions', 'CEO says \"don\'t audit X\"', 'Board receives scope limitation reports'],
          ],
        },
        {
          title: '⚠️ Exam Trap: Scope Limitations',
          type: 'warning',
          content: "**If scope limitations exist:**\n\n1. CAE must discuss with Board\n2. Determine if IA can still operate independently\n3. May need to disclose in audit reports\n4. Assess impact on overall audit opinion\n\n**Scope limitation ≠ Automatic independence impairment**\nBut significant limitations should be escalated!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAE reports FUNCTIONALLY to Board, ADMINISTRATIVELY to senior management",
            "Board approves: charter, plan, budget, CAE appointment/removal",
            "CAE must have direct access to Board without management filtering",
            "Organizational independence enables objective work",
            "Scope limitations must be communicated to the Board",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-II-002',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Individual Objectivity',
    description: 'Understand how auditors maintain personal objectivity and manage conflicts',
    order: 7,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Individual objectivity', 'Impairments', 'Conflicts of interest', 'Standard 1120'],
    blueprintArea: 'CIA1-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Even with perfect organizational independence, individual auditors can have biases and conflicts. Objectivity is a PERSONAL responsibility - every auditor must identify and manage their own impairments.",
        },
        {
          title: 'What is Individual Objectivity?',
          type: 'text',
          content: "**Standard 1120:**\n\nInternal auditors must have an impartial, unbiased attitude and avoid any conflict of interest.\n\n**Key concept:**\nObjectivity is a mental attitude - approaching work without bias.\n\n**Elements:**\n• Impartial attitude\n• No conflicts of interest\n• Intellectual honesty\n• Unbiased judgment",
        },
        {
          title: 'Threats to Objectivity',
          type: 'table',
          headers: ['Threat Type', 'Description', 'Example'],
          rows: [
            ['Self-interest', 'Personal stake in outcome', 'Auditing department where auditor might transfer'],
            ['Self-review', 'Reviewing own prior work', 'Auditing system you helped implement'],
            ['Familiarity', 'Too close to auditee', 'Best friend manages audited area'],
            ['Undue influence', 'Pressure from others', 'VP pressures auditor to change finding'],
            ['Advocacy', 'Promoting position', 'Championing a particular solution'],
          ],
        },
        {
          title: 'Impairment to Objectivity',
          type: 'text',
          content: "**Standard 1130:**\n\nIf independence or objectivity is impaired in fact or appearance, details must be disclosed.\n\n**Impairment triggers:**\n• Personal relationships with auditee\n• Financial interest in area\n• Prior operational responsibility\n• Cognitive biases affecting judgment\n\n**Required action:**\n• Disclose to appropriate parties\n• Consider removal from engagement\n• Document in workpapers",
        },
        {
          title: 'Managing Conflicts of Interest',
          type: 'text',
          content: "**When conflict exists:**\n\n**1. Disclosure**\n• Notify CAE immediately\n• Be transparent about nature of conflict\n\n**2. Removal/Reassignment**\n• CAE assigns different auditor\n• Conflicted auditor doesn't participate\n\n**3. Documentation**\n• Record the conflict\n• Document safeguards applied\n\n**4. Supervision**\n• Enhanced review of work\n• Independent verification",
        },
        {
          title: '🧠 Memory Aid: Objectivity Threats - \"S-S-F-U-A\"',
          type: 'callout',
          content: "**S**elf-interest - Personal benefit\n**S**elf-review - Own prior work\n**F**amiliarity - Close relationships\n**U**ndue influence - External pressure\n**A**dvocacy - Promoting positions\n\n*\"Some Say Friendship Undermines Auditing\"*",
        },
        {
          title: '⚠️ Exam Trap: Prior Responsibilities',
          type: 'warning',
          content: "**Standard 1130.A1:**\n\nInternal auditors shall refrain from assessing specific operations for which they were previously responsible.\n\n**Waiting period:** Generally 1 year minimum before auditing former area\n\n**Exception:** Assurance engagements must be supervised by someone NOT previously responsible for that area.\n\n**Consulting:** Former responsibility generally OK for consulting with proper disclosure.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Objectivity = impartial, unbiased mental attitude",
            "5 threats: Self-interest, Self-review, Familiarity, Undue influence, Advocacy",
            "Impairments must be disclosed to appropriate parties",
            "Cannot audit areas of prior operational responsibility",
            "Conflicts require disclosure, reassignment, or enhanced supervision",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN III: PROFICIENCY AND DUE PROFESSIONAL CARE (15%)
  // ============================================================================

  {
    id: 'CIA1-III-001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Proficiency and Professional Competence',
    description: 'Understand the knowledge, skills, and competencies required of internal auditors',
    order: 8,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Proficiency', 'Competence', 'Knowledge areas', 'Standard 1200'],
    blueprintArea: 'CIA1-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "You can only audit what you're competent to audit! Standard 1210 requires proficiency, and the Code of Ethics prohibits work beyond your competence. Know the difference between individual and collective proficiency.",
        },
        {
          title: 'Proficiency Requirements',
          type: 'text',
          content: "**Standard 1210:**\n\nInternal auditors must possess the knowledge, skills, and other competencies needed to perform their individual responsibilities.\n\n**Key concept:**\nEvery auditor must be competent for their SPECIFIC assignment.\n\n**CAE responsibility:**\nEnsure the internal audit activity COLLECTIVELY has the skills for the audit plan.",
        },
        {
          title: 'Individual vs. Collective Proficiency',
          type: 'table',
          headers: ['Individual Proficiency', 'Collective Proficiency'],
          rows: [
            ['Each auditor\'s personal competence', 'Team\'s combined competence'],
            ['Must match assigned work', 'Must cover entire audit plan'],
            ['Gained through education, training', 'Includes specialists, outsourcing'],
            ['CIA certification demonstrates', 'Staffing and resource planning'],
          ],
        },
        {
          title: 'Core Knowledge Areas (CBOK)',
          type: 'text',
          content: "**Internal auditors should have knowledge of:**\n\n**1. Internal Audit Fundamentals**\n• Standards, Ethics, Principles\n• Audit methodology\n\n**2. Risk and Control**\n• ERM frameworks\n• Control frameworks (COSO, etc.)\n\n**3. Business Knowledge**\n• Organizational operations\n• Industry-specific knowledge\n\n**4. Technical Skills**\n• Data analytics\n• IT concepts\n• Fraud awareness",
        },
        {
          title: 'When to Use External Expertise',
          type: 'text',
          content: "**Standard 1210.A1:**\n\nThe CAE must obtain competent advice if internal auditors lack expertise.\n\n**Situations requiring external expertise:**\n• Specialized IT audits\n• Fraud investigations\n• Complex actuarial work\n• Legal/regulatory expertise\n• Forensic accounting\n\n**External sources:**\n• Co-sourcing arrangements\n• Subject matter experts\n• Consulting firms",
        },
        {
          title: '🧠 Memory Aid: Proficiency Components',
          type: 'callout',
          content: "**\"K-S-C\"** = Knowledge, Skills, Competencies\n\n**Knowledge** = What you KNOW (education, training)\n**Skills** = What you can DO (application, technique)\n**Competencies** = How you PERFORM (judgment, communication)\n\n*Think: \"Know it, Do it, Apply it well\"*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Individual auditors must be proficient for assigned work",
            "CAE ensures collective proficiency for entire audit plan",
            "External expertise required when internal skills insufficient",
            "Proficiency = Knowledge + Skills + Competencies",
            "CPE maintains and develops proficiency",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-III-002',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Due Professional Care',
    description: 'Understand the application of care, skill, and diligence in internal audit work',
    order: 9,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Due professional care', 'Professional skepticism', 'Standard 1220'],
    blueprintArea: 'CIA1-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Due professional care is about HOW you do the work, not just having skills. It's the care and diligence a reasonably prudent auditor would apply. Not absolute assurance, but reasonable care!",
        },
        {
          title: 'What is Due Professional Care?',
          type: 'text',
          content: "**Standard 1220:**\n\nInternal auditors must apply the care and skill expected of a reasonably prudent and competent internal auditor.\n\n**Key concept:**\nDue professional care does NOT imply infallibility or extraordinary performance.\n\n**Standard:**\nReasonable internal auditor in similar circumstances.",
        },
        {
          title: 'Elements of Due Professional Care',
          type: 'text',
          content: "**Standard 1220.A1 - Auditors must consider:**\n\n• **Extent of work** needed to achieve objectives\n• **Relative complexity**, materiality, or significance\n• **Adequacy and effectiveness** of governance, risk, and control\n• **Probability** of significant errors, fraud, or noncompliance\n• **Cost of assurance** relative to potential benefits",
        },
        {
          title: 'Due Professional Care in Assurance vs. Consulting',
          type: 'table',
          headers: ['Assurance (1220.A1)', 'Consulting (1220.C1)'],
          rows: [
            ['Consider: Extent of work needed', 'Consider: Client needs and expectations'],
            ['Consider: Complexity, materiality', 'Consider: Relative complexity and extent'],
            ['Focus: Errors, fraud, noncompliance', 'Focus: Potential value added vs. effort'],
            ['Risk-based approach', 'Client-focused approach'],
          ],
        },
        {
          title: 'Professional Skepticism',
          type: 'text',
          content: "**A critical component of due professional care:**\n\n**Definition:**\nQuestioning mindset, critical assessment of audit evidence.\n\n**Elements:**\n• Don't assume management is honest OR dishonest\n• Corroborate information from multiple sources\n• Be alert to contradictory evidence\n• Question unusual patterns or anomalies\n\n**Related to fraud:**\nStandard 1220.A1 - Consider probability of significant fraud",
        },
        {
          title: '⚠️ Exam Trap: What DPC Does NOT Mean',
          type: 'warning',
          content: "**Due professional care does NOT mean:**\n\n❌ Guarantee of detecting all fraud\n❌ Infallible judgment\n❌ Absolute assurance\n❌ Extraordinary performance\n\n**It DOES mean:**\n\n✅ Reasonable care under circumstances\n✅ Applying professional standards\n✅ Professional skepticism\n✅ Cost-benefit consideration",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Due professional care = reasonably prudent auditor standard",
            "Does NOT guarantee detection of all fraud or errors",
            "Consider: extent, complexity, materiality, risk, cost-benefit",
            "Professional skepticism is a key element",
            "Apply to both assurance and consulting engagements",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN IV: QUALITY ASSURANCE AND IMPROVEMENT PROGRAM (10%)
  // ============================================================================

  {
    id: 'CIA1-IV-001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Quality Assurance and Improvement Program (QAIP)',
    description: 'Understand the requirements and components of a QAIP',
    order: 10,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['QAIP', 'Quality assessment', 'Internal assessment', 'External assessment', 'Standard 1300'],
    blueprintArea: 'CIA1-IV',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "QAIP ensures the internal audit activity operates effectively and conforms to Standards. The 5-year external assessment requirement is heavily tested. Know the difference between internal ongoing, internal periodic, and external assessments!",
        },
        {
          title: 'QAIP Requirements',
          type: 'text',
          content: "**Standard 1300:**\n\nThe CAE must develop and maintain a quality assurance and improvement program that covers all aspects of the internal audit activity.\n\n**Purpose:**\n• Evaluate conformance with Standards\n• Evaluate conformance with Code of Ethics\n• Assess efficiency and effectiveness\n• Identify improvement opportunities",
        },
        {
          title: 'QAIP Components',
          type: 'table',
          headers: ['Component', 'Frequency', 'Performed By'],
          rows: [
            ['Ongoing Internal Assessment', 'Continuous', 'Internal audit staff'],
            ['Periodic Internal Assessment', 'Periodically (e.g., annual)', 'Internal audit or others with knowledge'],
            ['External Assessment', 'At least every 5 years', 'Qualified external assessor'],
          ],
        },
        {
          title: 'Internal Assessments',
          type: 'text',
          content: "**Standard 1311:**\n\n**Ongoing Assessments:**\n• Routine supervision and review\n• Checklists and procedures\n• Feedback from clients\n• Automated workpaper review\n• Metrics and KPIs\n\n**Periodic Assessments:**\n• Self-assessment by IA team\n• Peer review within organization\n• Performed by others with knowledge of IA practices\n• Gap analysis against Standards",
        },
        {
          title: 'External Assessments',
          type: 'text',
          content: "**Standard 1312:**\n\n**Requirement:** At least once every 5 years\n\n**Performed by:**\n• Qualified, independent assessor\n• From outside the organization\n• No conflict of interest\n\n**Two forms:**\n1. **Full external assessment** - External team\n2. **Self-assessment with independent validation** - IA self-assesses, external validates\n\n**CAE discusses with Board:**\n• Form of assessment\n• Qualifications of assessor\n• Results of assessment",
        },
        {
          title: '🧠 Memory Aid: QAIP Types',
          type: 'callout',
          content: "**\"O-P-E\"**\n\n**O**ngoing (internal) - Day-to-day, continuous\n**P**eriodic (internal) - Scheduled self-reviews\n**E**xternal - Every 5 years minimum\n\n*OPE = \"Operating Performance Excellence\"*",
        },
        {
          title: 'Conformance Statement',
          type: 'text',
          content: "**Standard 1321:**\n\nThe CAE may state that the internal audit activity **\"conforms with the International Standards\"** only if:\n\n• QAIP results support the statement\n• Both internal and external assessments confirm conformance\n\n**If nonconformance:**\n• Must disclose in engagement communications\n• Disclose nature and impact\n• Consider actions to improve conformance",
        },
        {
          title: '⚠️ Exam Trap: External Assessment Timing',
          type: 'warning',
          content: "**Key rules:**\n\n✅ External assessment at least every 5 years\n✅ First assessment can be full OR self-assessment with validation\n✅ CAE discusses form and qualifications with Board\n\n**Common exam question:**\n\"Internal audit was established 3 years ago. Is external assessment required?\"\n\n**Answer:** Not yet - but must occur within 5 years of IA establishment.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "QAIP has 3 components: Ongoing, Periodic, External",
            "External assessment required every 5 years minimum",
            "External assessor must be qualified and independent",
            "Can use full external or self-assessment with independent validation",
            "Conformance statement requires QAIP support",
            "CAE discusses assessment approach with Board",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // DOMAIN V: GOVERNANCE, RISK MANAGEMENT, AND CONTROL (20%)
  // ============================================================================

  {
    id: 'CIA1-V-001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Corporate Governance Concepts',
    description: 'Understand governance principles and internal audit\'s role in governance',
    order: 11,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Governance', 'Board of directors', 'Audit committee', 'Standard 2110'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Internal audit is a CORNERSTONE of corporate governance. Understanding the roles of the board, management, and internal audit in the governance structure is essential. Expect questions on audit committee responsibilities!",
        },
        {
          title: 'What is Corporate Governance?',
          type: 'text',
          content: "**Definition:**\nThe combination of processes and structures implemented by the board to inform, direct, manage, and monitor the organization's activities toward achieving its objectives.\n\n**Key elements:**\n• Tone at the top\n• Transparency and accountability\n• Ethical culture\n• Risk oversight\n• Stakeholder interests",
        },
        {
          title: 'Governance Roles',
          type: 'table',
          headers: ['Role', 'Governance Responsibility', 'Key Activities'],
          rows: [
            ['Board of Directors', 'Oversight and direction', 'Approve strategy, monitor performance, set tone'],
            ['Audit Committee', 'Financial oversight', 'Oversee IA, external audit, financial reporting'],
            ['Management', 'Execute and manage', 'Implement controls, manage risks, run operations'],
            ['Internal Audit', 'Independent assurance', 'Evaluate governance, risk, control effectiveness'],
          ],
        },
        {
          title: 'Internal Audit\'s Governance Role',
          type: 'text',
          content: "**Standard 2110:**\n\nThe internal audit activity must assess and make appropriate recommendations to improve the organization's governance processes.\n\n**Assess governance for:**\n• Promoting appropriate ethics and values\n• Ensuring effective organizational performance management\n• Communicating risk and control information\n• Coordinating activities of Board, external/internal auditors, management",
        },
        {
          title: 'Three Lines Model',
          type: 'text',
          content: "**Updated from \"Three Lines of Defense\":**\n\n**First Line: Management**\n• Owns and manages risk\n• Implements controls\n• Front-line accountability\n\n**Second Line: Risk and Compliance Functions**\n• Expertise, support, monitoring\n• Risk management, compliance\n• Oversight of first line\n\n**Third Line: Internal Audit**\n• Independent assurance\n• Reports to Board\n• Evaluates first and second lines",
        },
        {
          title: '🧠 Memory Aid: Three Lines',
          type: 'callout',
          content: "**Line 1:** OPERATE (Management does the work)\n**Line 2:** OVERSEE (Risk/Compliance monitors)\n**Line 3:** ASSURE (Internal Audit evaluates)\n\n*Think: \"1-2-3 = Do-Check-Verify\"*",
        },
        {
          title: 'Audit Committee Best Practices',
          type: 'text',
          content: "**Key responsibilities:**\n• Oversee financial reporting process\n• Oversee internal control\n• Oversee internal audit (approve charter, plan, CAE)\n• Oversee external audit relationship\n• Oversee risk management\n• Private sessions with CAE and external auditors\n\n**Independence:**\n• Members should be independent\n• At least one financial expert\n• Regular meetings without management",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Governance = processes and structures for oversight and direction",
            "Three Lines: (1) Management, (2) Risk/Compliance, (3) Internal Audit",
            "IA assesses and makes recommendations to improve governance",
            "Audit committee oversees IA, external audit, financial reporting",
            "IA reports functionally to Board/Audit Committee",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-V-002',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Enterprise Risk Management (ERM)',
    description: 'Understand ERM frameworks and internal audit\'s role in risk management',
    order: 12,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Enterprise risk management', 'COSO ERM', 'Risk assessment', 'Standard 2120'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Internal audit provides risk-based assurance - so understanding ERM is CORE to the profession. Know the COSO ERM framework components and what IA should (and should NOT) do in ERM!",
        },
        {
          title: 'What is Enterprise Risk Management?',
          type: 'text',
          content: "**COSO ERM Definition:**\n\nEnterprise risk management is a process, effected by an entity's board of directors, management, and other personnel, applied in strategy setting and across the enterprise, designed to identify potential events that may affect the entity, and manage risk to be within its risk appetite, to provide reasonable assurance regarding the achievement of entity objectives.\n\n**Key concept:**\nERM is enterprise-wide, not siloed by department.",
        },
        {
          title: 'COSO ERM Framework Components',
          type: 'text',
          content: "**Five interrelated components:**\n\n**1. Governance and Culture**\n• Oversight responsibility\n• Tone at the top\n• Desired culture and values\n\n**2. Strategy and Objective-Setting**\n• Analyzes business context\n• Defines risk appetite\n• Evaluates strategy alternatives\n\n**3. Performance**\n• Identifies and assesses risk\n• Prioritizes risk\n• Implements risk responses\n\n**4. Review and Revision**\n• Assesses substantial change\n• Reviews risk and performance\n• Pursues improvement\n\n**5. Information, Communication, and Reporting**\n• Leverages information systems\n• Communicates risk information\n• Reports on risk, culture, performance",
        },
        {
          title: '🧠 Memory Aid: COSO ERM - \"GSPRI\"',
          type: 'callout',
          content: "**G**overnance and Culture\n**S**trategy and Objective-Setting\n**P**erformance\n**R**eview and Revision\n**I**nformation, Communication, and Reporting\n\n*\"Good Strategy Performs, Reviewed with Info\"*",
        },
        {
          title: 'Internal Audit\'s Role in ERM',
          type: 'text',
          content: "**Standard 2120:**\n\nThe internal audit activity must evaluate the effectiveness and contribute to the improvement of risk management processes.\n\n**IA evaluates:**\n• Organizational objectives support mission\n• Significant risks are identified and assessed\n• Risk responses are appropriate\n• Risk information is captured and communicated\n\n**Risk-based audit planning:**\n• Align audit plan with risk assessment\n• Focus on high-risk areas\n• Consider emerging risks",
        },
        {
          title: 'What IA Should and Should NOT Do',
          type: 'table',
          headers: ['IA SHOULD Do', 'IA Should NOT Do (without safeguards)'],
          rows: [
            ['Provide assurance on ERM processes', 'Set risk appetite'],
            ['Evaluate risk management effectiveness', 'Make risk response decisions'],
            ['Make recommendations for improvement', 'Own and manage organizational risks'],
            ['Facilitate risk identification', 'Be accountable for risk management'],
            ['Coach management on risk concepts', 'Implement risk management on behalf of management'],
          ],
        },
        {
          title: '⚠️ Exam Trap: IA Independence in ERM',
          type: 'warning',
          content: "**When IA takes on ERM-related roles:**\n\n**Acceptable with safeguards:**\n• Facilitating risk workshops\n• Coaching on risk concepts\n• Coordinating risk reporting\n\n**Must ensure:**\n• Management retains ownership of risk\n• IA maintains objectivity for assurance\n• Board approves any expanded role\n• Disclosed in charter\n\n**Red line:** IA cannot OWN risks and then audit those risks!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ERM is enterprise-wide risk management aligned with strategy",
            "COSO ERM: Governance, Strategy, Performance, Review, Information",
            "IA evaluates ERM effectiveness and makes recommendations",
            "IA does NOT set risk appetite or own risks",
            "Risk-based audit planning aligns with organizational risk assessment",
            "IA can facilitate ERM with proper safeguards",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-V-003',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Internal Control Frameworks',
    description: 'Understand COSO Internal Control and internal audit\'s evaluation role',
    order: 13,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Internal control', 'COSO framework', 'Control components', 'Standard 2130'],
    blueprintArea: 'CIA1-V',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "COSO Internal Control-Integrated Framework is THE standard for internal control worldwide. The 5 components and 17 principles are heavily tested. You MUST know this framework cold!",
        },
        {
          title: 'What is Internal Control?',
          type: 'text',
          content: "**COSO Definition:**\n\nInternal control is a process, effected by an entity's board of directors, management, and other personnel, designed to provide reasonable assurance regarding the achievement of objectives relating to:\n\n• **Operations** - Effectiveness and efficiency\n• **Reporting** - Reliability of reporting\n• **Compliance** - Adherence to laws and regulations",
        },
        {
          title: 'COSO Framework: Five Components',
          type: 'text',
          content: "**1. Control Environment**\n• Foundation for all other components\n• Tone at the top, integrity, ethics\n• Organizational structure and accountability\n\n**2. Risk Assessment**\n• Identify and analyze risks\n• Assess likelihood and impact\n• Consider fraud risk\n\n**3. Control Activities**\n• Policies and procedures\n• Segregation of duties\n• IT general controls\n\n**4. Information and Communication**\n• Quality information\n• Internal and external communication\n• Reporting channels\n\n**5. Monitoring Activities**\n• Ongoing and separate evaluations\n• Deficiency identification and remediation",
        },
        {
          title: '🧠 Memory Aid: COSO Components - \"CRCIM\"',
          type: 'callout',
          content: "**\"CRCIM\"** - Remember the COSO Components:\n\n• **C**ontrol Environment (foundation)\n• **R**isk Assessment\n• **C**ontrol Activities\n• **I**nformation & Communication\n• **M**onitoring (top)\n\n*Think of the COSO cube visualization - Control Environment is the base, Monitoring is at the top*",
        },
        {
          title: 'The 17 COSO Principles',
          type: 'text',
          content: "**Control Environment (5 principles):**\n1. Commitment to integrity and ethics\n2. Board oversight\n3. Organizational structure and authority\n4. Commitment to competence\n5. Accountability\n\n**Risk Assessment (4 principles):**\n6. Specify clear objectives\n7. Identify and analyze risks\n8. Assess fraud risk\n9. Identify and assess significant changes\n\n**Control Activities (3 principles):**\n10. Select and develop control activities\n11. Select and develop technology controls\n12. Deploy through policies and procedures\n\n**Info & Communication (3 principles):**\n13. Use quality information\n14. Communicate internally\n15. Communicate externally\n\n**Monitoring (2 principles):**\n16. Conduct ongoing/separate evaluations\n17. Evaluate and communicate deficiencies",
        },
        {
          title: 'Internal Audit\'s Control Role',
          type: 'text',
          content: "**Standard 2130:**\n\nThe internal audit activity must assist the organization in maintaining effective controls by evaluating their effectiveness and efficiency and by promoting continuous improvement.\n\n**IA evaluates:**\n• Design of controls (will they work?)\n• Operating effectiveness (are they working?)\n• Reliability of financial and operational information\n• Compliance with laws and regulations\n• Safeguarding of assets",
        },
        {
          title: 'Control Deficiencies',
          type: 'table',
          headers: ['Term', 'Definition', 'Example'],
          rows: [
            ['Control Deficiency', 'Design or operation flaw', 'Control exists but is not performed'],
            ['Significant Deficiency', 'Important enough to merit attention', 'Missing approval on large transactions'],
            ['Material Weakness', 'Reasonable possibility of material misstatement', 'No segregation of duties in cash handling'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COSO: 5 components, 17 principles",
            "Components: Control Environment, Risk Assessment, Control Activities, Info/Comm, Monitoring",
            "Three objective categories: Operations, Reporting, Compliance",
            "Control Environment is the foundation",
            "IA evaluates design AND operating effectiveness of controls",
            "All 17 principles must be present and functioning for effective internal control",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCIA1Lessons = () => cia1Lessons;
export const getCIA1LessonById = (id: string) => cia1Lessons.find(lesson => lesson.id === id);
export const getCIA1LessonCount = () => cia1Lessons.length;

export default cia1Lessons;
