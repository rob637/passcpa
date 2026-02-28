/**
 * CIA Part 1: IPPF Framework & Core Principles Deep Dive
 * 
 * New lessons to strengthen CIA1 Foundations coverage
 * Addresses gap: Core Principles case-study lessons and IPPF structure
 */

import { Lesson } from '../../../types';

export const cia1LessonsBatch3: Lesson[] = [
  // ============================================================================
  // CORE PRINCIPLES DEEP DIVE
  // ============================================================================
  
  {
    id: 'CIA1-CP-001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'The 10 Core Principles: Complete Guide',
    description: 'Master all 10 Core Principles for effective internal auditing with real-world applications',
    order: 50,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Core Principles', 'Effectiveness', 'Assessment'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The 10 Core Principles define what effective internal auditing looks like. The exam frequently tests whether an action supports or violates specific principles. You must know ALL 10 and be able to apply them to scenarios.',
        },
        {
          title: 'Overview: The 10 Core Principles',
          type: 'text',
          content: '**All 10 must be present and operating effectively for IA to be considered effective.**\n\n1. **Demonstrates integrity** - Honest, brave, prudent\n2. **Demonstrates competence and due professional care** - Skilled, diligent\n3. **Is objective and free from undue influence** - Unbiased assessments\n4. **Aligns with strategies, objectives, and risks** - Relevant focus\n5. **Is appropriately positioned and adequately resourced** - Authority & resources\n6. **Demonstrates quality and continuous improvement** - QAIP\n7. **Communicates effectively** - Clear, timely, relevant\n8. **Provides risk-based assurance** - Risk-prioritized coverage\n9. **Is insightful, proactive, and future-focused** - Forward-looking\n10. **Promotes organizational improvement** - Drives change',
        },
        {
          title: '🧠 Memory Aid: Core Principles',
          type: 'callout',
          content: '**"I Can Only Aim For Quality Communication — Inspiring Progressive Organizations"**\n\n**I** - Integrity\n**C** - Competence\n**O** - Objectivity\n**A** - Alignment\n**F** - (properly) Positioned (\"Fit for purpose\")\n**Q** - Quality\n**C** - Communication\n**I** - (risk-based) Insurance (assurance)\n**P** - Proactive\n**O** - Organizational improvement',
        },
        {
          title: 'Principles 1-3: The Character Principles',
          type: 'text',
          content: '**These define WHO internal auditors must be:**\n\n**1. Integrity** — The foundation of trust\n• Honest in all professional matters\n• Courageous to report difficult findings\n• Actions consistent with values\n• Example: Reporting fraud even when politically inconvenient\n\n**2. Competence & Due Care** — The skill requirement\n• Possessing necessary knowledge\n• Applying professional skepticism\n• Continuous learning (CPD)\n• Example: Getting cybersecurity training before IT audits\n\n**3. Objectivity** — The independence imperative\n• Free from undue influence\n• No financial conflicts of interest\n• Balanced, unbiased assessments\n• Example: Declining to audit a department you previously managed',
        },
        {
          title: 'Principles 4-6: The Structural Principles',
          type: 'text',
          content: '**These define HOW internal audit must be organized:**\n\n**4. Alignment** — Connected to strategy\n• Audit plan reflects organizational risks\n• CAE understands business strategy\n• Resources directed at highest-risk areas\n• Example: Adjusting audit plan when M&A activity increases\n\n**5. Positioning & Resources** — Authority to act\n• CAE reports functionally to the board\n• Sufficient budget and staffing\n• Unrestricted access to information\n• Example: Direct access between CAE and Audit Committee chair\n\n**6. Quality** — Continuous improvement\n• QAIP with internal and external assessments\n• Conformance with Standards\n• Benchmarking against best practices\n• Example: Implementing recommendations from external QA review',
        },
        {
          title: 'Principles 7-10: The Impact Principles',
          type: 'text',
          content: '**These define WHAT internal audit must deliver:**\n\n**7. Communication** — Getting the message across\n• Timely, clear, and relevant reporting\n• Immediate escalation of critical findings\n• Appropriate level of detail for audience\n• Example: Flash reports for emergent risks\n\n**8. Risk-Based Assurance** — Focused coverage\n• Risk assessment drives the audit plan\n• Higher-risk areas get more attention\n• Dynamic response to changing risks\n• Example: Reprioritizing to cover new cyber threats\n\n**9. Insightful & Proactive** — Looking ahead\n• Identify emerging risks\n• Use data analytics for deeper insights\n• Catalyst for change, not just reviewer\n• Example: Alerting board to supply-chain risks before disruption\n\n**10. Organizational Improvement** — Driving value\n• Practical, actionable recommendations\n• Follow-up on implementation\n• Contributing to organizational learning\n• Example: Helping management redesign broken processes',
        },
        {
          title: '⚠️ Exam Trap: Partial Achievement',
          type: 'warning',
          content: 'Exam will test: "If 8 of 10 Core Principles are effective, is internal audit effective?"\n\n**Answer: NO.** ALL 10 must be present and operating effectively. Partial achievement = not fully effective.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: '• All 10 Core Principles must be effective — no exceptions\n• They cover character (1-3), structure (4-6), and impact (7-10)\n• Exam tests application — match scenarios to correct principle\n• Core Principles inform interpretation of the Standards\n• Use them as a self-assessment framework',
        },
      ],
    },
  },

  {
    id: 'CIA1-IPPF-001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'IPPF Framework: Complete Structure',
    description: 'Navigate the International Professional Practices Framework — mandatory vs. recommended guidance',
    order: 51,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['IPPF', 'Mandatory Guidance', 'Recommended Guidance', 'Standards Structure'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The IPPF is the authoritative framework for internal audit practice globally. Exam questions test which elements are mandatory vs. recommended and the structure of the Standards. Knowing the framework\'s architecture is fundamental.',
        },
        {
          title: 'IPPF Structure Overview',
          type: 'text',
          content: '**The IPPF has two categories of guidance:**\n\n**MANDATORY GUIDANCE (must comply):**\n1. Mission of Internal Audit\n2. Core Principles for the Professional Practice of Internal Auditing\n3. Definition of Internal Auditing\n4. Code of Ethics\n5. International Standards for the Professional Practice of Internal Auditing\n\n**RECOMMENDED GUIDANCE (should follow):**\n1. Implementation Guides\n2. Supplemental Guidance (Practice Guides, etc.)',
        },
        {
          title: '🧠 Memory Aid: Mandatory Elements',
          type: 'callout',
          content: '**"My Car Drives Carefully on Streets"**\n\n**M** - Mission\n**C** - Core Principles\n**D** - Definition\n**C** - Code of Ethics\n**S** - Standards\n\nAll five are MANDATORY. Everything else is recommended.',
        },
        {
          title: 'Standards Architecture',
          type: 'text',
          content: '**The Standards are organized into two main series:**\n\n**1000 Series: Attribute Standards**\n• Describe characteristics of audit organizations and individuals\n• 1000: Purpose, Authority, Responsibility (Charter)\n• 1100: Independence and Objectivity\n• 1200: Proficiency and Due Professional Care\n• 1300: Quality Assurance and Improvement Program\n\n**2000 Series: Performance Standards**\n• Describe nature of activities and quality criteria\n• 2000: Managing the Internal Audit Activity\n• 2100: Nature of Work\n• 2200: Engagement Planning\n• 2300: Performing the Engagement\n• 2400: Communicating Results\n• 2500: Monitoring Progress\n• 2600: Communicating Acceptance of Risks',
        },
        {
          title: 'Implementation Standards: A and C',
          type: 'text',
          content: '**Implementation Standards expand on Attribute and Performance Standards:**\n\n• **\".A\"** suffix = Applies to **Assurance** activities\n  Example: Standard 2130.A1 - Assurance on controls\n\n• **\".C\"** suffix = Applies to **Consulting** activities\n  Example: Standard 2130.C1 - Consulting on controls\n\nThe base standard applies to BOTH assurance and consulting. Implementation Standards provide service-specific requirements.',
        },
        {
          title: 'Claiming Conformance',
          type: 'text',
          content: '**Key Rules for Conformance:**\n\n• Must comply with ALL mandatory guidance to claim conformance\n• Recommended guidance is helpful but NOT required for conformance\n• If law prohibits compliance with a Standard → must disclose:\n  - The non-conformance\n  - The reason (legal prohibition)\n  - The impact on the activity\n• CAE must report on conformance to senior management and the board',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: '• IPPF = Mission + Core Principles + Definition + Ethics + Standards (mandatory) + Implementation Guides + Practice Guides (recommended)\n• Attribute Standards (1000s) = who we are; Performance Standards (2000s) = what we do\n• \"A\" suffix = Assurance; \"C\" suffix = Consulting\n• Must comply with ALL mandatory elements to claim conformance\n• Non-conformance due to law must be disclosed',
        },
      ],
    },
  },

  {
    id: 'CIA1-PROF-L001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Proficiency: IT Knowledge & Fraud Awareness',
    description: 'Master proficiency requirements — IT competencies, fraud detection, and specialization needs',
    order: 52,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Proficiency', 'IT Knowledge', 'Fraud Awareness', 'Specialization'],
    blueprintArea: 'CIA1-III',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Standard 1210 covers proficiency requirements that apply to EVERY internal auditor. The exam specifically tests IT knowledge requirements and fraud awareness even for non-specialist auditors. This is a commonly missed area!',
        },
        {
          title: 'Collective Proficiency (Standard 1210)',
          type: 'text',
          content: '**Key Concept: Collective vs. Individual Proficiency**\n\nThe internal audit activity must COLLECTIVELY possess or obtain:\n• Knowledge, skills, and other competencies to perform responsibilities\n\nNot every individual needs every skill, but the TEAM overall must have or be able to access the needed expertise.\n\n**The CAE\'s role:**\n• Assess staff competencies against needs\n• Identify gaps and plan development\n• Obtain external resources when needed\n• Ensure right people on right engagements',
        },
        {
          title: 'IT Knowledge Requirements (1210.A3)',
          type: 'text',
          content: '**ALL internal auditors need sufficient knowledge of:**\n\n• Key information technology risks\n• Key IT controls\n• Technology-based audit techniques\n\n**This does NOT mean everyone must be an IT expert!**\n\nBut they should understand:\n• IT general controls (access, change management, operations)\n• Data integrity and security basics\n• How to use CAATs (Computer-Assisted Audit Techniques)\n• Red flags indicating IT control failures\n• When to bring in IT audit specialists',
        },
        {
          title: 'Fraud Knowledge Requirements (1210.A2)',
          type: 'text',
          content: '**ALL internal auditors must have sufficient knowledge to:**\n\n• Evaluate the RISK of fraud\n• Identify INDICATORS (red flags) of fraud\n• Understand how fraud is managed by the organization\n\n**They are NOT expected to:**\n• Be fraud investigation experts\n• Conduct complete fraud investigations independently\n• Have the same expertise as a CFE (Certified Fraud Examiner)\n\n**What to do when fraud is suspected:**\n1. Extend audit procedures to gather indicators\n2. Document observations carefully\n3. Notify the CAE immediately\n4. CAE determines next steps (legal, investigation, board)',
        },
        {
          title: '⚠️ Exam Trap: Individual vs. Activity',
          type: 'warning',
          content: 'The exam will try to trick you:\n\n"Does every internal auditor need IT expertise?" → NO, the ACTIVITY collectively must.\n"Can an auditor with no IT knowledge audit IT?" → They should have GENERAL IT knowledge but can bring in specialists.\n"Must internal auditors detect all fraud?" → NO, but must evaluate risk and recognize red flags.',
        },
        {
          title: 'Due Professional Care (Standard 1220)',
          type: 'text',
          content: '**Due professional care requires:**\n\n• Extent of work needed to achieve objectives\n• Relative complexity, materiality, and significance\n• Adequacy of governance, risk, control processes\n• Probability of significant errors, fraud, or noncompliance\n• Cost of assurance vs. potential benefits\n\n**Due care does NOT guarantee:**\n• All errors will be found\n• All fraud will be detected\n• All risks will be identified\n\n**Standard: Care and skill expected of a reasonably prudent and competent internal auditor.**',
        },
        {
          title: 'Continuing Professional Development (1230)',
          type: 'text',
          content: '**CPD is MANDATORY for all internal auditors:**\n\n• Enhance knowledge, skills, and competencies\n• Stay current with profession developments\n• Applies regardless of experience level\n\n**Acceptable CPD Activities:**\n• Professional seminars and conferences\n• Additional certifications (CIA, CISA, CFE)\n• Self-study and research\n• Teaching and mentoring\n• Professional association activities\n• On-the-job training and rotation\n\n**CIA CPE Requirements:**\n• 40 hours per year\n• 2 hours must be in ethics',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: '• Proficiency is collective — the team, not just individuals\n• ALL auditors need basic IT and fraud knowledge\n• Specialists fill gaps that generalists cannot\n• Due professional care ≠ guarantee\n• CPD is mandatory and ongoing (40 hours/year for CIA)\n• Key phrase: "reasonably prudent and competent"',
        },
      ],
    },
  },

  {
    id: 'CIA1-ETHICS-L001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Code of Ethics: Applied Scenarios',
    description: 'Master the four ethical principles through real-world scenarios and application',
    order: 53,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Code of Ethics', 'Integrity', 'Objectivity', 'Confidentiality', 'Competency'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The Code of Ethics is heavily tested on the CIA exam. Questions present ethical scenarios and ask you to identify which principle was violated or which action is appropriate. Knowing the principles AND their Rules of Conduct is critical.',
        },
        {
          title: 'Code Structure',
          type: 'text',
          content: '**The Code has two components:**\n\n1. **Principles** — Broad expectations (4 principles)\n2. **Rules of Conduct** — Specific behavioral requirements under each principle\n\n**Applies to:**\n• All IIA members and CIA holders\n• ALL individuals providing internal audit services (even non-members)\n• External providers performing internal audit work',
        },
        {
          title: 'The Four Principles: I-O-C-C',
          type: 'text',
          content: '**1. INTEGRITY**\n• Perform work with honesty, diligence, and responsibility\n• Observe the law and make disclosures expected by law/profession\n• Shall not knowingly participate in illegal/discreditable activities\n• Respect and contribute to legitimate objectives of organization\n\n**2. OBJECTIVITY**\n• Shall not participate in activities that may impair unbiased assessment\n• Shall not accept anything that may impair professional judgment\n• Disclose all material facts known that could distort reporting\n\n**3. CONFIDENTIALITY**\n• Prudent use and protection of information\n• Shall not use information for personal gain or contrary to law/objectives\n\n**4. COMPETENCY**\n• Engage only in services for which they have necessary knowledge\n• Continually improve proficiency and effectiveness\n• Follow applicable professional standards',
        },
        {
          title: 'Scenario Application Practice',
          type: 'text',
          content: '**Scenario 1:** An auditor owns stock in a company being audited.\n→ Violation: **Objectivity** (financial interest creates impairment)\n\n**Scenario 2:** An auditor discusses audit findings at a dinner party.\n→ Violation: **Confidentiality** (disclosing without authorization)\n\n**Scenario 3:** An auditor agrees to audit complex derivatives without expertise.\n→ Violation: **Competency** (engaging in services beyond skill level)\n\n**Scenario 4:** An auditor finds evidence of fraud but doesn\'t report it.\n→ Violation: **Integrity** (failing to make expected disclosures)\n\n**Scenario 5:** An auditor accepts a gift from the department being audited.\n→ Violation: **Objectivity** (accepting something that may impair judgment)',
        },
        {
          title: '⚠️ Exam Strategy: Ethical Scenarios',
          type: 'warning',
          content: 'When faced with ethics scenarios:\n\n1. Identify which principle is at risk\n2. Look for the MOST DIRECT violation\n3. Remember: Integrity = honesty/courage; Objectivity = unbiased/no conflicts; Confidentiality = information protection; Competency = skills/standards\n4. If two principles seem to apply, choose the one MOST DIRECTLY related',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: '• Four principles: Integrity, Objectivity, Confidentiality, Competency (I-O-C-C)\n• Each principle has specific Rules of Conduct\n• Applies to ALL internal audit service providers\n• Violations may lead to IIA disciplinary action\n• Exam tests through scenario-based questions\n• When in doubt: integrity and objectivity are most fundamental',
        },
      ],
    },
  },
];

export const getCIA1LessonsBatch3 = () => cia1LessonsBatch3;
