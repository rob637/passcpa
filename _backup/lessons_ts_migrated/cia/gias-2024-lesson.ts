/**
 * CIA Part 1: Global Internal Audit Standards (GIAS) 2024
 * 
 * CRITICAL UPDATE: The Global Internal Audit Standards became effective January 9, 2025
 * This lesson covers the new framework that replaces the previous IPPF structure.
 */

import { Lesson } from '../../../types';

export const gias2024Lessons: Lesson[] = [
  // ============================================================================
  // GLOBAL INTERNAL AUDIT STANDARDS (GIAS) 2024 - NEW FRAMEWORK
  // ============================================================================
  
  {
    id: 'CIA1-GIAS-001',
    courseId: 'cia',
    section: 'CIA1',
    title: 'Introduction to GIAS 2024 - The New Internal Audit Standards',
    description: 'Understand the major transition from IPPF to Global Internal Audit Standards effective January 2025',
    order: 1,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['GIAS 2024', 'Standards Transition', 'Framework Structure'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: '⚠️ CRITICAL EXAM UPDATE',
          type: 'callout',
          content: "The **Global Internal Audit Standards (GIAS)** became effective **January 9, 2025**, replacing the previous International Professional Practices Framework (IPPF). This is the biggest change to internal audit standards in decades. Expect questions on both frameworks during the transition period!",
        },
        {
          title: 'Why Did the Standards Change?',
          type: 'text',
          content: "**The IIA undertook a multi-year project to modernize the standards:**\n\n1. **Evolving Practice** - Internal audit has expanded beyond traditional assurance\n2. **Stakeholder Expectations** - Boards and executives demand more value\n3. **Technology Advances** - Digital transformation and data analytics\n4. **Global Consistency** - One unified global framework\n5. **Clarity** - Clearer requirements and implementation guidance\n6. **Principles-Based** - More flexible application across contexts",
        },
        {
          title: 'IPPF vs. GIAS 2024 Comparison',
          type: 'table',
          headers: ['Aspect', 'Previous IPPF', 'New GIAS 2024'],
          rows: [
            ['Effective Date', 'Pre-2025', 'January 9, 2025'],
            ['Structure', 'Mandatory + Recommended guidance', 'Five Structural Domains'],
            ['Standards Organization', 'Attribute (1000s) + Performance (2000s)', '15 Domains (thematic)'],
            ['Core Principles', '10 Core Principles (separate document)', 'Integrated into Standards'],
            ['Implementation Guidance', 'Separate Practice Guides/Advisories', 'Embedded Topical Requirements + Considerations'],
            ['Mission Statement', 'Part of IPPF', 'Embedded in Purpose Domain'],
            ['Code of Ethics', 'Separate mandatory component', 'Principle 1: Demonstrate Integrity'],
          ],
        },
        {
          title: 'The Five Structural Domains of GIAS 2024',
          type: 'text',
          content: "**GIAS 2024 organizes standards into FIVE overarching domains:**\n\n**Domain I: PURPOSE OF INTERNAL AUDITING**\n- Mission statement\n- Mandate and accountability\n- Independence and authority\n\n**Domain II: ETHICS AND PROFESSIONALISM**\n- Integrity, objectivity, confidentiality, competency\n- Expectations for professional behavior\n\n**Domain III: GOVERNING THE INTERNAL AUDIT FUNCTION**\n- CAE role and responsibilities\n- Board/audit committee relationship\n- Quality assurance\n\n**Domain IV: MANAGING THE INTERNAL AUDIT FUNCTION**\n- Strategic planning\n- Resource management\n- Coordination with other providers\n\n**Domain V: PERFORMING INTERNAL AUDIT SERVICES**\n- Planning engagements\n- Conducting work\n- Communicating results\n- Monitoring",
        },
        {
          title: '🧠 Memory Aid: GIAS Five Domains',
          type: 'callout',
          content: "**\"PEGMP\"** - Pronounce it \"PEG-M-P\"\n\n• **P**urpose (Why we exist)\n• **E**thics (How we behave)\n• **G**overning (Who leads us)\n• **M**anaging (How we operate)\n• **P**erforming (What we do)\n\n*Or: \"Purpose Ethics Govern Manage Perform\"*",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "GIAS 2024 became effective January 9, 2025",
            "Replaces the multi-layer IPPF structure with unified framework",
            "Five structural domains: Purpose, Ethics, Governing, Managing, Performing",
            "15 thematic standards within the five domains",
            "Principles integrated directly into standards (no separate Core Principles)",
            "Exam may test BOTH old IPPF and new GIAS terminology during transition",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-GIAS-002',
    courseId: 'cia',
    section: 'CIA1',
    title: 'GIAS 2024: The 15 Standards Deep Dive',
    description: 'Detailed breakdown of all 15 Global Internal Audit Standards and their requirements',
    order: 2,
    duration: 60,
    difficulty: 'advanced',
    topics: ['GIAS Standards', '15 Domains', 'Requirements'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'Understanding the 15 Standards',
          type: 'text',
          content: "**GIAS 2024 contains 15 individual Standards, organized within the 5 Domains:**\n\nUnlike the old IPPF numbering (1000, 1100, 2000, etc.), GIAS uses a new thematic structure. Each Standard includes:\n• **Principles** - High-level requirements\n• **Standards** - Specific mandates\n• **Topical Requirements** - Detailed guidance\n• **Implementation Considerations** - Practical application tips",
        },
        {
          title: 'Domain I: Purpose of Internal Auditing (Standards 1-3)',
          type: 'text',
          content: "**Standard 1: Purpose of Internal Auditing**\n• Defines the mission and value of internal auditing\n• Establishes the mandate from the board\n• Links to organizational governance\n\n**Standard 2: Ethics and Professionalism**\n• Replaces/incorporates the Code of Ethics\n• Integrity, objectivity, confidentiality, competency\n• Professional skepticism and judgment\n\n**Standard 3: Governing the Internal Audit Function**\n• CAE role and authority\n• Board oversight and approval\n• Quality assurance requirements",
        },
        {
          title: 'Domain II: Independence (Standards 4-5)',
          type: 'text',
          content: "**Standard 4: Independence and Objectivity**\n• Organizational independence requirements\n• Functional reporting to the board\n• Threats and safeguards framework\n\n**Standard 5: Competence**\n• Knowledge, skills, abilities requirements\n• Continuing professional development\n• Collective competence of the function",
        },
        {
          title: 'Domain III: Governing the Function (Standards 6-7)',
          type: 'text',
          content: "**Standard 6: Roles and Responsibilities of the Board**\n• Oversight of internal audit\n• Charter approval\n• CAE performance evaluation\n• Communication expectations\n\n**Standard 7: Chief Audit Executive Responsibilities**\n• Strategic leadership\n• Resource management\n• Quality assurance program\n• Stakeholder relationships",
        },
        {
          title: 'Domain IV: Managing the Function (Standards 8-10)',
          type: 'text',
          content: "**Standard 8: Strategic Planning**\n• Risk-based audit planning\n• Audit universe and priorities\n• Long-term strategy alignment\n\n**Standard 9: Resource Management**\n• Staffing and competence\n• Technology and tools\n• Third-party resources\n\n**Standard 10: Coordination and Reliance**\n• Other assurance providers\n• Combined assurance approach\n• External auditor coordination",
        },
        {
          title: 'Domain V: Performing Audit Services (Standards 11-15)',
          type: 'text',
          content: "**Standard 11: Planning Engagements**\n• Objectives, scope, criteria\n• Risk assessment\n• Work program development\n\n**Standard 12: Conducting Engagements**\n• Evidence gathering\n• Analysis and evaluation\n• Documentation requirements\n\n**Standard 13: Forming Conclusions**\n• Criteria application\n• Findings development\n• Root cause analysis\n\n**Standard 14: Communicating Results**\n• Report quality criteria\n• Recommendations\n• Dissemination\n\n**Standard 15: Monitoring Actions**\n• Follow-up process\n• Risk acceptance\n• Reporting to board on status",
        },
        {
          title: 'IPPF to GIAS Crosswalk',
          type: 'table',
          headers: ['Old IPPF Standard', 'New GIAS Standard'],
          rows: [
            ['1000 - Purpose, Authority, Responsibility', 'Standard 1 - Purpose'],
            ['1100 - Independence and Objectivity', 'Standard 4 - Independence'],
            ['1200 - Proficiency and Due Care', 'Standard 5 - Competence'],
            ['1300 - Quality Assurance', 'Standard 7 - CAE Responsibilities'],
            ['2000 - Managing the IA Activity', 'Standards 8-10 - Managing'],
            ['2100 - Nature of Work', 'Standards 11-12 - Planning/Conducting'],
            ['2200 - Engagement Planning', 'Standard 11 - Planning Engagements'],
            ['2300 - Performing the Engagement', 'Standard 12 - Conducting'],
            ['2400 - Communicating Results', 'Standard 14 - Communicating'],
            ['2500 - Monitoring Progress', 'Standard 15 - Monitoring'],
            ['2600 - Communicating Risk Acceptance', 'Standard 15 - Monitoring'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "15 Standards organized in 5 Domains",
            "Standards 1-3: Purpose and Ethics",
            "Standards 4-5: Independence and Competence",
            "Standards 6-7: Governance (Board and CAE)",
            "Standards 8-10: Managing the Function",
            "Standards 11-15: Performing Audit Services",
            "Each standard includes Principles, Requirements, and Considerations",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-GIAS-003',
    courseId: 'cia',
    section: 'CIA1',
    title: 'GIAS 2024: Mission and Principles Comparison',
    description: 'Compare the updated Mission statement and how Principles are now integrated',
    order: 3,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Mission', 'Principles', 'Framework Changes'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'The Mission of Internal Audit - Then and Now',
          type: 'text',
          content: "**IPPF Mission (Pre-2025):**\n\"To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight.\"\n\n**GIAS 2024 Mission (Current):**\n\"To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight.\"\n\n✅ **The Mission statement remains essentially UNCHANGED** - This is the one constant through the transition!",
        },
        {
          title: 'What Happened to the 10 Core Principles?',
          type: 'text',
          content: "**In the old IPPF, there were 10 separate Core Principles:**\n1. Demonstrates integrity\n2. Demonstrates competence and due professional care\n3. Is objective and free from undue influence\n4. Aligns with strategies, objectives, and risks\n5. Is appropriately positioned and adequately resourced\n6. Demonstrates quality and continuous improvement\n7. Communicates effectively\n8. Provides risk-based assurance\n9. Is insightful, proactive, and future-focused\n10. Promotes organizational improvement\n\n**In GIAS 2024, these principles are INTEGRATED into the 15 Standards** - they're no longer a separate component. For example:\n- Principle 1 (Integrity) → Standard 2 (Ethics)\n- Principle 5 (Resourced) → Standard 9 (Resource Management)\n- Principle 8 (Risk-based) → Standard 8 (Strategic Planning)",
        },
        {
          title: '⚠️ Exam Trap',
          type: 'callout',
          content: "Questions may still ask about the **10 Core Principles** since:\n1. Many organizations are still transitioning\n2. The principles are reflected in GIAS (just differently organized)\n3. The concepts remain valid even if structure changed\n\n**Know BOTH the old 10 Principles AND how they map to GIAS 2024!**",
        },
        {
          title: 'Code of Ethics Integration',
          type: 'text',
          content: "**Old Structure:**\nCode of Ethics was a separate mandatory element with:\n- 4 Principles (Integrity, Objectivity, Confidentiality, Competency)\n- Rules of Conduct for each principle\n\n**GIAS 2024:**\n- Standard 2 (Ethics and Professionalism) incorporates ethics requirements\n- The four foundational principles remain but are now within the standards framework\n- Behavioral expectations are embedded throughout\n\n**The IOCO principles (Integrity, Objectivity, Confidentiality, Competency) remain critical** - just organized differently!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Mission statement is essentially UNCHANGED",
            "10 Core Principles are now INTEGRATED into the 15 Standards",
            "Code of Ethics is embedded in Standard 2 (Ethics and Professionalism)",
            "The concepts remain - only the organization changed",
            "Still memorize the 10 original principles for exam transition period",
            "IOCO (Integrity, Objectivity, Confidentiality, Competency) still foundational",
          ],
        },
      ],
    },
  },

  {
    id: 'CIA1-GIAS-004',
    courseId: 'cia',
    section: 'CIA1',
    title: 'GIAS 2024: Transition Guidance for the CIA Exam',
    description: 'Practical guidance on how to approach GIAS 2024 vs IPPF questions on the CIA exam',
    order: 4,
    duration: 25,
    difficulty: 'beginner',
    topics: ['Exam Strategy', 'Transition', 'Question Types'],
    blueprintArea: 'CIA1-I',
    content: {
      sections: [
        {
          title: 'How the Exam Handles the Transition',
          type: 'text',
          content: "**The IIA has announced:**\n\n1. **Transition Period**: Questions will reflect BOTH frameworks\n2. **No Penalty**: You won't be penalized for using old terminology\n3. **Substance Over Form**: The concepts matter more than labels\n4. **Gradual Shift**: Expect increasing GIAS emphasis over time\n\n**What this means for you:**\n- Know IPPF terminology (likely still appears)\n- Know GIAS 2024 structure (new questions will use this)\n- Focus on underlying CONCEPTS (these haven't changed)",
        },
        {
          title: 'Quick Reference: Old vs New Terminology',
          type: 'table',
          headers: ['When Question Says...', 'Think About...'],
          rows: [
            ['Attribute Standards', 'GIAS Standards 1-7 (Purpose, Ethics, Governance)'],
            ['Performance Standards', 'GIAS Standards 8-15 (Managing, Performing)'],
            ['Implementation Standards', 'Topical Requirements within each Standard'],
            ['Practice Advisories', 'Implementation Considerations in GIAS'],
            ['IPPF', 'Global Internal Audit Standards (GIAS)'],
            ['1000-series', 'Standards 1-7 (Organizational)'],
            ['2000-series', 'Standards 8-15 (Engagement-level)'],
          ],
        },
        {
          title: 'Exam Strategy Tips',
          type: 'text',
          content: "**When you see a CIA exam question:**\n\n**1. DON'T PANIC** if you see old IPPF terminology\n- The concepts are the same\n- Answer based on the underlying principle\n\n**2. READ CAREFULLY** for GIAS-specific language\n- \"The Standards require...\" could refer to either\n- Context clues will indicate which framework\n\n**3. FOCUS ON CONCEPTS**\n- Independence → CAE reports to board\n- Due care → Reasonable care, not infallibility\n- Quality → Internal + External assessments\n\n**4. WHEN UNSURE**\n- GIAS 2024 is more principles-based\n- IPPF was more rules-based\n- If asked about specific standard numbers (1110, 2010), use IPPF logic",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Exam accepts both IPPF and GIAS 2024 terminology during transition",
            "Focus on concepts - they haven't changed materially",
            "Know the crosswalk between old standard numbers and new domains",
            "GIAS 2024 is more principles-based and integrated",
            "When in doubt, apply the underlying professional principle",
          ],
        },
      ],
    },
  },
];

export default gias2024Lessons;
