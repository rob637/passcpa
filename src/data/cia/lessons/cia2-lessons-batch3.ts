/**
 * CIA Part 2: Engagement Planning & CAE Strategy Deep Dive
 * 
 * New lessons addressing gaps in CIA2 coverage:
 * - Engagement planning methodology
 * - Risk & control matrix development
 * - CAE strategic planning and board relationships
 * - Audit universe management
 */

import { Lesson } from '../../../types';

export const cia2LessonsBatch3: Lesson[] = [
  {
    id: 'CIA2-PLAN-001',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Engagement Planning Process: Step-by-Step',
    description: 'Master the complete engagement planning lifecycle from preliminary survey to work program',
    order: 60,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Engagement Planning', 'Preliminary Survey', 'Work Program', 'Objectives'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Planning is 20% of the CIA Part 2 exam weight. Questions test whether you understand the logical flow from survey to fieldwork. A well-planned engagement is an efficient engagement — and they test the sequence extensively.',
        },
        {
          title: 'The Planning Process Flow',
          type: 'text',
          content: '**Standard 2200 Series governs engagement planning:**\n\n**Step 1: Preliminary Survey**\n→ Understand the area, review prior audits, identify key risks\n\n**Step 2: Establish Objectives (2210)**\n→ Based on risk assessment; reflect expected conditions\n\n**Step 3: Determine Scope (2220)**\n→ Systems, records, personnel, physical properties\n\n**Step 4: Allocate Resources (2230)**\n→ Right people, enough time, appropriate expertise\n\n**Step 5: Develop Work Program (2240)**\n→ Procedures to identify, analyze, evaluate, and document information\n\n**Step 6: Send Engagement Notification**\n→ Timing, scope, objectives, team — communicate to client',
        },
        {
          title: '🧠 Memory Aid: Planning Steps',
          type: 'callout',
          content: '**"Survey → Objectives → Scope → Resources → Program → Notify"**\n\nOr: **"S-O-S-R-P-N"** = "SOS — Resources, Program, Notify"\n\nThink: "Before you start auditing, send an SOS to get the right Resources, make a Program, and Notify the client!"',
        },
        {
          title: 'Preliminary Survey: What to Do',
          type: 'text',
          content: '**The preliminary survey should include:**\n\n• **Understand the client** — Business processes, objectives, KPIs\n• **Review prior work** — Prior audit reports, regulatory findings, management responses\n• **Identify risks** — What could go wrong? What changed since last audit?\n• **Map key controls** — What controls address identified risks?\n• **Identify stakeholders** — Who needs to be interviewed/involved?\n\n**Tools useful during preliminary survey:**\n• Process flowcharts\n• Organizational charts\n• Prior audit working papers\n• ERM risk registers\n• Industry benchmarking data',
        },
        {
          title: 'Setting Engagement Objectives (Standard 2210)',
          type: 'text',
          content: '**Engagement objectives must:**\n\n• Reflect the preliminary assessment of risks\n• Consider the probability of significant errors, fraud, or noncompliance\n• Be sufficient to evaluate governance, risk, and control\n\n**Key rules:**\n• Must be established for EACH engagement\n• Cannot simply copy from last year\n• Must be tailored to current conditions\n\n**Standard 2210.A3:** When the activity\'s objectives are unclear, auditors must work with management to establish appropriate criteria.\n\n**For consulting:** Objectives must be consistent with the organization\'s values, strategies, and objectives (2210.C1).',
        },
        {
          title: 'Determining Scope (Standard 2220)',
          type: 'text',
          content: '**Scope must be sufficient to satisfy objectives.**\n\nIncludes consideration of:\n• Relevant systems and records\n• Personnel and their roles\n• Physical properties and locations\n• Third-party activities under the organization\'s control\n\n**Standard 2220.A1:** Scope must include relevant IT systems, records, and controls.\n\n**Managing scope changes:**\n• If client requests expansion → evaluate objectivity concerns and resources\n• If significant changes occur → update risk assessment and adjust\n• Document all scope decisions and limitations',
        },
        {
          title: '⚠️ Exam Trap: Scope Limitations',
          type: 'warning',
          content: 'If management imposes scope limitations on an assurance engagement, the CAE must:\n1. Discuss the limitation with management\n2. If not resolved, report to the board\n3. Consider whether the engagement can still achieve its objectives\n\nScope limitations do NOT apply the same way to consulting engagements — the client defines the scope.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: '• Planning follows: Survey → Objectives → Scope → Resources → Program → Notify\n• Objectives must be risk-based and tailored to current conditions\n• Scope includes systems, records, personnel, and physical properties + third parties\n• Preliminary survey is critical for effective planning\n• Work programs must be approved before fieldwork begins\n• Document everything — planning decisions, scope changes, resource allocation',
        },
      ],
    },
  },

  {
    id: 'CIA2-RCM-001',
    courseId: 'cia',
    section: 'CIA2',
    title: 'Risk & Control Matrix: Building and Using',
    description: 'Learn to build effective risk and control matrices for engagement planning and testing',
    order: 61,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Risk and Control Matrix', 'Control Testing', 'Risk Assessment', 'Audit Procedures'],
    blueprintArea: 'CIA2-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The risk and control matrix (RCM) is one of the most practical tools an auditor uses. Exam questions test both the concept and application — building matrices, identifying gaps, and determining test procedures based on mapped risks.',
        },
        {
          title: 'What Is a Risk & Control Matrix?',
          type: 'text',
          content: '**A structured document that links:**\n\n**Process Objective → Risk → Control → Test Procedure**\n\n**Purpose:**\n• Ensures all significant risks have corresponding controls\n• Identifies gaps (risks without controls)\n• Provides structure for developing test procedures\n• Serves as a central reference during fieldwork\n\n**A good RCM answers three questions:**\n1. What can go wrong? (Risk)\n2. What prevents it from going wrong? (Control)\n3. How do we verify the control works? (Test)',
        },
        {
          title: 'RCM Components',
          type: 'table',
          headers: ['Column', 'Description', 'Example'],
          rows: [
            ['Process/Objective', 'What the process aims to achieve', 'Payments are only for valid invoices'],
            ['Risk', 'What could go wrong', 'Duplicate payment to vendor'],
            ['Control', 'What mitigates the risk', 'System blocks duplicate invoice numbers'],
            ['Control Type', 'Preventive, Detective, or Corrective', 'Preventive (automated)'],
            ['Control Owner', 'Who is responsible', 'AP Manager'],
            ['Test Procedure', 'How to verify control works', 'Test 25 invoices for duplicate checks'],
            ['Results/Findings', 'Outcome of testing', 'No exceptions noted'],
          ],
        },
        {
          title: 'Building the RCM: Step-by-Step',
          type: 'text',
          content: '**Step 1: Walk through the process**\n• End-to-end understanding\n• Interview process owners\n• Review process documentation\n\n**Step 2: Identify objectives at each step**\n• What should happen correctly?\n• What are the key assertions?\n\n**Step 3: Identify risks (what could go wrong)**\n• Unauthorized transactions\n• Inaccurate recording\n• Incomplete processing\n• Untimely execution\n\n**Step 4: Map existing controls**\n• What prevents/detects each risk?\n• Classify as preventive, detective, or corrective\n• Note manual vs. automated\n\n**Step 5: Identify GAPS**\n• Risks with no controls = potential findings\n• Controls not matching risks = possible misalignment\n\n**Step 6: Design test procedures**\n• Based on control type and risk level\n• Higher risk = more testing',
        },
        {
          title: 'Inherent vs. Residual Risk',
          type: 'text',
          content: '**Inherent Risk** = Risk BEFORE any controls are applied\n• Pure exposure level\n• Based on nature of the process\n\n**Residual Risk** = Risk AFTER controls are applied\n• What remains despite controls\n• Should be within risk appetite\n\n**Control Risk** = Risk that controls fail to prevent/detect\n• A control exists but might not work\n\n**Audit focuses on:**\n• Whether residual risk is acceptable\n• Whether controls effectively reduce inherent risk\n• Where gaps exist between inherent and residual risk',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: '• RCM links: Objective → Risk → Control → Test\n• Walk through the entire process end-to-end\n• Identify ALL risks, not just obvious ones\n• A risk without a control = potential finding\n• Residual risk = what remains after controls\n• RCM evolves throughout the engagement — update as you learn',
        },
      ],
    },
  },

  {
    id: 'CIA2-CAE-001',
    courseId: 'cia',
    section: 'CIA2',
    title: 'CAE Strategic Planning & Board Relationships',
    description: 'Master the CAE\'s strategic role — audit planning, board reporting, and organizational positioning',
    order: 62,
    duration: 40,
    difficulty: 'advanced',
    topics: ['CAE Role', 'Strategic Planning', 'Board Reporting', 'Audit Universe'],
    blueprintArea: 'CIA2-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'The CAE\'s strategic role is tested extensively in Part 2 Domain I (20% weight). Questions cover the audit plan, resource management, board communication, and how the CAE navigates organizational dynamics.',
        },
        {
          title: 'The CAE\'s Dual Reporting Lines',
          type: 'text',
          content: '**Functional Reporting → Board/Audit Committee:**\n• Approving the audit charter\n• Approving the risk-based audit plan\n• Approving the internal audit budget and resource plan\n• Receiving communications from the CAE on results and performance\n• Approving appointment/removal of the CAE\n• Making inquiries of management and the CAE\n\n**Administrative Reporting → Senior Management (usually CEO):**\n• Day-to-day operations and logistics\n• Budget administration\n• Staff management\n• Internal communications and workflow',
        },
        {
          title: 'Risk-Based Audit Planning (Standard 2010)',
          type: 'text',
          content: '**The CAE must establish a risk-based plan to determine priorities:**\n\n**Inputs to the Plan:**\n• Enterprise risk assessment outputs\n• Board and management priorities\n• Regulatory and compliance requirements\n• Prior audit results and open issues\n• Industry trends and emerging risks\n• Organizational changes (M&A, restructuring)\n\n**The Audit Universe:**\n• Comprehensive list of ALL auditable activities\n• Includes subsidiaries, outsourced functions, projects\n• Updated at least annually\n• Forms the basis for selecting audit engagements\n\n**Plan Flexibility:**\n• Must be reviewed and adjusted as needed\n• Significant changes communicated to board\n• Not a rigid document — responds to risk shifts',
        },
        {
          title: 'Board Communication (Standard 2060)',
          type: 'text',
          content: '**The CAE must regularly report to the board on:**\n\n1. **Audit Plan** — Risk-based plan and any significant changes\n2. **Resource Needs** — Sufficiency of staff, budget, competencies  \n3. **Significant Findings** — Control issues, risk exposures, governance matters\n4. **Conformance** — Compliance with IIA Standards and Code of Ethics\n5. **Emerging Risks** — Issues needing the board\'s attention\n6. **Follow-Up** — Status of prior audit recommendations\n\n**Communication should be:**\n• Accurate, objective, clear, concise, constructive, complete, and timely\n• Tailored to the audience (board needs different detail than management)\n• Balanced (not just favorable outcomes)',
        },
        {
          title: 'Resource Management (Standard 2030)',
          type: 'text',
          content: '**The CAE must ensure resources are:**\n\n• **Sufficient** — Enough people and budget\n• **Appropriate** — Right mix of skills (IT, financial, operational, fraud)\n• **Effectively Deployed** — Right people on right engagements\n\n**When resources are insufficient:**\n1. Communicate impact to senior management and board\n2. Prioritize based on risk\n3. Consider co-sourcing or outsourcing\n4. Document the impact on audit coverage\n\n**Resource types:**\n• In-house staff with varied expertise\n• Guest auditors from other departments\n• Co-sourced providers (supplementing staff)\n• Outsourced providers (performing specific engagements)\n• Subject matter experts (one-off consulting)',
        },
        {
          title: '⚠️ Exam Trap: Non-Audit Responsibilities',
          type: 'warning',
          content: 'If the board asks the CAE to take on non-audit responsibilities (e.g., managing the ethics hotline, compliance function, or ERM):\n\n1. The CAE should RAISE the self-review threat\n2. Must implement safeguards if accepting\n3. Must disclose the activity to the board\n4. Must ensure appropriate oversight by a party outside the IA activity\n\nTaking on management responsibilities creates objectivity impairments!',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: '• CAE reports functionally to board, administratively to senior management\n• Audit plan must be risk-based, using the audit universe\n• Board receives reports on findings, conformance, resources, and emerging risks\n• When resources are insufficient → communicate to board, prioritize by risk\n• Non-audit responsibilities create objectivity threats — implement safeguards\n• Coordination with external audit reduces duplication',
        },
      ],
    },
  },
];

export const getCIA2LessonsBatch3 = () => cia2LessonsBatch3;
