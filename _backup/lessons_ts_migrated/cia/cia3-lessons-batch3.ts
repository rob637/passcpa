/**
 * CIA Part 3: Information Security & Business Strategy Deep Dive
 *
 * New lessons addressing gaps in CIA3 coverage:
 * - NIST Cybersecurity Framework
 * - ISO 27001/27002 and privacy regulations
 * - Strategic management frameworks
 * - M&A due diligence
 */

import { Lesson } from '../../../types';

export const cia3LessonsBatch3: Lesson[] = [
  {
    id: 'CIA3-NIST-001',
    courseId: 'cia',
    section: 'CIA3',
    title: 'NIST Cybersecurity Framework for Auditors',
    description:
      'Understand the NIST CSF functions, tiers, and how auditors evaluate cybersecurity maturity',
    order: 70,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['NIST CSF', 'Cybersecurity', 'Framework Functions', 'Maturity Assessment'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content:
            'Information security is 30% of CIA Part 3. NIST CSF is the most commonly tested security framework. You need to know the five core functions, implementation tiers, and how organizations use the framework to manage cyber risk.',
        },
        {
          title: 'The Five Core Functions',
          type: 'text',
          content:
            '**The NIST CSF organizes cybersecurity activities into five concurrent functions:**\n\n**1. IDENTIFY (ID)**\n• Asset management — What do we have?\n• Business environment — What do we need to protect?\n• Governance — Policies, roles, responsibilities\n• Risk assessment — What threats and vulnerabilities exist?\n• Risk management strategy — How do we decide what to accept?\n\n**2. PROTECT (PR)**\n• Access control — Authentication, authorization\n• Awareness & training — User education\n• Data security — Encryption, DLP\n• Information protection processes — Policies and procedures\n• Maintenance — Patch management, updates\n• Protective technology — Firewalls, IDS/IPS\n\n**3. DETECT (DE)**\n• Anomalies & events — Baseline monitoring\n• Continuous monitoring — Real-time analysis\n• Detection processes — Roles and testing\n\n**4. RESPOND (RS)**\n• Response planning — Incident response plan\n• Communications — Internal and external\n• Analysis — Investigate and triage\n• Mitigation — Contain the incident\n• Improvements — Lessons learned\n\n**5. RECOVER (RC)**\n• Recovery planning — Restore normal operations\n• Improvements — Update based on lessons\n• Communications — Reputation management',
        },
        {
          title: '🧠 Memory Aid: NIST Functions',
          type: 'callout',
          content:
            '**"I P D R R" — "I Prefer Donuts: Really Round"**\n\nIdentify → Protect → Detect → Respond → Recover\n\nThis sequence mirrors a logical progression: Know what you have, protect it, detect when something goes wrong, respond to it, and recover from it.',
        },
        {
          title: 'Implementation Tiers',
          type: 'text',
          content:
            '**NIST CSF defines four implementation tiers (NOT maturity levels):**\n\n**Tier 1: Partial**\n• Ad hoc, reactive risk management\n• Limited awareness of cybersecurity risk\n\n**Tier 2: Risk Informed**\n• Risk management approved by management (not organization-wide)\n• Some awareness but not formalized\n\n**Tier 3: Repeatable**\n• Formal policies and regular updates\n• Organization-wide approach\n• Consistent risk-informed decisions\n\n**Tier 4: Adaptive**\n• Continuous improvement using lessons learned\n• Active threat intelligence sharing\n• Real-time risk adjustments\n\n**Key distinction:** Tiers describe HOW an organization manages risk, not a single score. An organization may be at different tiers for different functions.',
        },
        {
          title: 'Framework Profiles',
          type: 'text',
          content:
            '**A profile is the alignment of functions, categories, and subcategories with business requirements, risk tolerance, and resources.**\n\n**Current Profile:** Where we are today\n**Target Profile:** Where we want to be\n**Gap Analysis:** Difference between current and target\n\n**Auditor\'s role:**\n• Evaluate whether the target profile aligns with organizational risk appetite\n• Assess progress from current to target\n• Verify that prioritization reflects actual risk levels\n• Check that resources allocated match the gap priorities',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content:
            '• NIST CSF has 5 functions: Identify, Protect, Detect, Respond, Recover\n• 4 implementation tiers (Partial → Risk Informed → Repeatable → Adaptive)\n• Tiers are NOT maturity levels — they describe risk management approach\n• Profiles compare current state vs. target state\n• Framework is voluntary and risk-based — not a compliance checklist\n• Auditors evaluate alignment between risk appetite and framework implementation',
        },
      ],
    },
  },

  {
    id: 'CIA3-ISO-001',
    courseId: 'cia',
    section: 'CIA3',
    title: 'ISO 27001/27002 & Privacy Regulations',
    description:
      'Master the ISO information security management system and privacy regulation requirements for auditors',
    order: 71,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['ISO 27001', 'ISO 27002', 'GDPR', 'Privacy', 'ISMS'],
    blueprintArea: 'CIA3-II',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content:
            'ISO 27001/27002 is the international gold standard for information security management. Privacy laws like GDPR increasingly appear on the CIA exam. Auditors must understand both the ISMS framework and privacy compliance obligations.',
        },
        {
          title: 'ISO 27001: The Management System',
          type: 'text',
          content:
            '**ISO 27001 specifies requirements for an Information Security Management System (ISMS).**\n\n**Core elements:**\n• **Context of the organization** — Understand internal/external issues\n• **Leadership** — Top management commitment and security policy\n• **Planning** — Risk assessment and risk treatment plan\n• **Support** — Resources, competence, awareness, communication\n• **Operation** — Implement risk treatment, perform assessments\n• **Performance evaluation** — Monitoring, measurement, internal audit, management review\n• **Improvement** — Nonconformity handling, corrective action, continual improvement\n\n**Key concept: Risk Treatment Options**\n1. **Modify** the risk (implement controls)\n2. **Accept** the risk (within risk appetite)\n3. **Avoid** the risk (eliminate the activity)\n4. **Share** the risk (insurance, outsourcing)',
        },
        {
          title: 'ISO 27002: The Control Set',
          type: 'text',
          content:
            '**ISO 27002 provides guidance for implementing controls from ISO 27001 Annex A.**\n\n**2022 edition organizes controls into 4 themes:**\n\n**Organizational controls (37 controls)**\n• Policies, roles, asset management, access control, supplier relationships\n\n**People controls (8 controls)**\n• Screening, terms of employment, training, disciplinary process\n\n**Physical controls (14 controls)**\n• Physical entry, offices, equipment, storage media\n\n**Technological controls (34 controls)**\n• User endpoints, privileged access, authentication, encryption, logging, secure development\n\n**Total: 93 controls** across 4 categories\n\n**Key difference from NIST:**\n• ISO = certifiable standard (you can get certified)\n• NIST CSF = voluntary framework (you align, not certify)',
        },
        {
          title: 'Privacy: GDPR Core Principles for Auditors',
          type: 'text',
          content:
            '**Seven data protection principles under GDPR:**\n\n1. **Lawfulness, fairness, and transparency** — Legal basis for processing\n2. **Purpose limitation** — Collected for specific, explicit purposes\n3. **Data minimization** — Adequate, relevant, limited to what\'s necessary\n4. **Accuracy** — Kept up to date; inaccurate data erased or rectified\n5. **Storage limitation** — Kept only as long as necessary\n6. **Integrity and confidentiality** — Appropriate security measures\n7. **Accountability** — Controller must demonstrate compliance\n\n**Key roles:**\n• **Data Controller** — Determines purposes and means of processing\n• **Data Processor** — Processes data on behalf of the controller\n• **Data Protection Officer (DPO)** — Monitors compliance, advises',
        },
        {
          title: '⚠️ Exam Trap: ISO vs. NIST',
          type: 'warning',
          content:
            'Don\'t confuse frameworks on the exam:\n\n• ISO 27001 is a CERTIFIABLE standard (Pass/Fail)\n• NIST CSF is a VOLUNTARY framework (Alignment/Maturity)\n• ISO uses risk treatment (Modify, Accept, Avoid, Share)\n• NIST uses implementation tiers (1-4)\n• Both are risk-based, but the approach differs\n\nGDPR applies to ANY organization processing EU residents\' data — regardless of where the organization is located.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content:
            '• ISO 27001 = certifiable ISMS standard; ISO 27002 = 93 controls in 4 categories\n• Risk treatment: Modify, Accept, Avoid, Share\n• GDPR has 7 principles; applies extraterritorially\n• Data controller determines purpose; processor acts on behalf of controller\n• Auditors should verify ISMS scope, risk assessments, and control implementation\n• Breach notification: GDPR requires 72-hour notification to supervisory authority',
        },
      ],
    },
  },

  {
    id: 'CIA3-STRAT-001',
    courseId: 'cia',
    section: 'CIA3',
    title: 'Strategic Management Frameworks for Auditors',
    description:
      'Master Porter\'s Five Forces, SWOT, Balanced Scorecard, and other strategic tools tested on CIA Part 3',
    order: 72,
    duration: 45,
    difficulty: 'advanced',
    topics: [
      'Strategic Management',
      'Porter\'s Five Forces',
      'SWOT Analysis',
      'Balanced Scorecard',
      'Value Chain',
    ],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content:
            'Business acumen (Domain I) is 35% of CIA Part 3. Strategic management frameworks are heavily tested. You need to know when each tool applies, what it measures, and how auditors use them to evaluate organizational strategy.',
        },
        {
          title: 'Porter\'s Five Forces',
          type: 'text',
          content:
            '**Analyzes industry attractiveness and competitive intensity:**\n\n1. **Threat of New Entrants** — How easy is it for new competitors to enter?\n   • Barriers: capital requirements, regulations, brand loyalty, switching costs\n\n2. **Bargaining Power of Suppliers** — Can suppliers dictate terms?\n   • Few suppliers = high power; many alternatives = low power\n\n3. **Bargaining Power of Buyers** — Can customers negotiate lower prices?\n   • Concentrated buyers or commodity products increase buyer power\n\n4. **Threat of Substitutes** — Are there alternative products/services?\n   • High substitution threat limits pricing power\n\n5. **Competitive Rivalry** — How intense is current competition?\n   • Many competitors, slow growth, high fixed costs = intense rivalry\n\n**Audit use:** Evaluate whether management\'s strategy appropriately considers competitive forces.',
        },
        {
          title: 'SWOT Analysis',
          type: 'text',
          content:
            '**Internal factors:**\n• **S**trengths — Internal advantages (strong brand, IP, talent)\n• **W**eaknesses — Internal limitations (outdated systems, skill gaps)\n\n**External factors:**\n• **O**pportunities — External potential (new markets, technology shifts)\n• **T**hreats — External dangers (regulation, competition, economic downturn)\n\n**Key rules for the exam:**\n• Strengths and weaknesses are INTERNAL (controllable)\n• Opportunities and threats are EXTERNAL (not controllable)\n• SWOT informs strategy; it does NOT make decisions\n• Should be regularly updated as conditions change',
        },
        {
          title: 'Balanced Scorecard (BSC)',
          type: 'text',
          content:
            '**Four perspectives that link strategy to performance:**\n\n1. **Financial** — Revenue growth, profitability, ROI\n   → "How do we look to shareholders?"\n\n2. **Customer** — Satisfaction, retention, market share\n   → "How do customers see us?"\n\n3. **Internal Business Process** — Quality, efficiency, innovation\n   → "What must we excel at?"\n\n4. **Learning & Growth** — Employee skills, culture, IT infrastructure\n   → "Can we continue to improve and create value?"\n\n**Strategy Map:** Shows cause-and-effect linkages across all four perspectives\n\n**Audit use:**\n• Verify KPIs align with stated strategy\n• Check balance across perspectives (not just financial)\n• Evaluate whether targets are realistic and measurable',
        },
        {
          title: '🧠 Memory Aid: BSC Perspectives',
          type: 'callout',
          content:
            '**"F-C-I-L"** = **"Financial, Customer, Internal, Learning"**\n\nFlow from bottom up: Learning & Growth → enables Internal Process improvement → leads to Customer satisfaction → drives Financial results.\n\nThink of it as a building: Learning is the foundation, Financial is the roof.',
        },
        {
          title: 'Value Chain Analysis (Porter)',
          type: 'text',
          content:
            '**Primary activities (create value directly):**\n1. **Inbound Logistics** — Receiving, storing, distributing inputs\n2. **Operations** — Transforming inputs into products/services\n3. **Outbound Logistics** — Delivering to customers\n4. **Marketing & Sales** — Attracting and retaining customers\n5. **Service** — Post-sale support and maintenance\n\n**Support activities (enable primary activities):**\n• Firm infrastructure (finance, planning, legal)\n• Human resource management\n• Technology development\n• Procurement\n\n**Margin = Total Value Created - Total Cost**\n\n**Audit use:** Identify which activities add the most value and where inefficiencies exist.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content:
            '• Porter\'s Five Forces = industry/competitive analysis (external)\n• SWOT = Strengths/Weaknesses (internal) + Opportunities/Threats (external)\n• BSC = 4 perspectives: Financial, Customer, Internal Process, Learning & Growth\n• Value Chain = primary + support activities; identifies value vs. waste\n• Auditors use these frameworks to evaluate management\'s strategic decisions\n• All frameworks inform strategy — none make the decision by themselves',
        },
      ],
    },
  },

  {
    id: 'CIA3-MA-001',
    courseId: 'cia',
    section: 'CIA3',
    title: 'M&A Due Diligence and Organizational Change',
    description:
      'Understand the auditor\'s role in mergers, acquisitions, and organizational restructuring',
    order: 73,
    duration: 35,
    difficulty: 'advanced',
    topics: ['Mergers and Acquisitions', 'Due Diligence', 'Change Management', 'Strategic Decisions'],
    blueprintArea: 'CIA3-I',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content:
            'M&A and organizational change questions appear in CIA Part 3 business acumen. You need to understand due diligence processes, integration risks, and how internal audit adds value during transformational events.',
        },
        {
          title: 'M&A Due Diligence: The Auditor\'s Role',
          type: 'text',
          content:
            '**Internal audit can add value before, during, and after M&A:**\n\n**Pre-Deal (Due Diligence Phase):**\n• Evaluate target\'s internal controls\n• Assess financial statement quality\n• Review regulatory compliance status\n• Identify IT integration risks\n• Evaluate culture compatibility\n• Review key contracts and legal exposure\n\n**During Integration:**\n• Monitor integration plan execution\n• Assess control framework harmonization\n• Evaluate IT system migration risks\n• Review employee transition issues\n• Test combined entity controls\n\n**Post-Integration:**\n• Audit synergy realization\n• Evaluate whether expected benefits materialized\n• Review integration costs vs. budget\n• Assess ongoing control effectiveness',
        },
        {
          title: 'Types of M&A Strategies',
          type: 'text',
          content:
            '**Horizontal Merger** — Same industry, same stage of production\n• Example: Two airlines merging\n• Risks: Antitrust concerns, culture clash\n\n**Vertical Merger** — Same industry, different stage (supplier or distributor)\n• Example: Car manufacturer acquires parts supplier\n• Risks: Over-integration, supplier dependence\n\n**Conglomerate Merger** — Unrelated industries\n• Example: Tech company acquires food chain\n• Risks: Management distraction, no synergy realization\n\n**Hostile Takeover** — Acquisition without target management\'s approval\n• Uses tender offers directly to shareholders\n• Defense mechanisms: Poison pill, white knight, golden parachute',
        },
        {
          title: 'Organizational Change Management',
          type: 'text',
          content:
            '**Kotter\'s 8-Step Change Model (frequently tested):**\n\n1. **Create urgency** — Communicate why change is necessary\n2. **Form a guiding coalition** — Assemble leadership team\n3. **Create a vision for change** — Clear direction and strategy\n4. **Communicate the vision** — Frequent, consistent messaging\n5. **Empower broad-based action** — Remove barriers, encourage risk-taking\n6. **Generate short-term wins** — Visible, early improvements\n7. **Consolidate gains** — Build on momentum, don\'t declare victory too early\n8. **Anchor changes in culture** — Embed in norms, values, practices\n\n**Auditor\'s role in change management:**\n• Evaluate whether the change process follows a structured approach\n• Assess communication effectiveness\n• Identify resistance points and control gaps\n• Monitor for scope creep and cost overruns',
        },
        {
          title: '⚠️ Exam Trap: Due Diligence Scope',
          type: 'warning',
          content:
            'Internal audit conducting M&A due diligence must maintain objectivity. If the CAE has a financial incentive tied to the deal closing, objectivity is compromised. Any personal conflicts in M&A work must be disclosed.\n\nDue diligence is NOT just financial — it includes operational, legal, IT, environmental, HR, and cultural review. Exam questions often test whether candidates recognize the full scope.',
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content:
            '• Internal audit adds value in pre-deal, integration, and post-integration phases\n• Due diligence covers financial, operational, IT, legal, cultural, and environmental areas\n• Horizontal = same level; Vertical = different level; Conglomerate = unrelated\n• Kotter\'s 8 steps: Urgency → Coalition → Vision → Communicate → Empower → Quick Wins → Consolidate → Anchor\n• Auditor objectivity must be maintained — disclose conflicts in M&A work\n• Post-M&A: audit synergy realization and integration effectiveness',
        },
      ],
    },
  },
];

export const getCIA3LessonsBatch3 = () => cia3LessonsBatch3;
