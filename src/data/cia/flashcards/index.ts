/**
 * CIA Flashcards
 * 
 * Comprehensive flashcards covering all three CIA exam parts
 * Based on IIA's CIA Learning System
 */

// Import additional flashcard batches
import { CIA1_FLASHCARDS_BATCH2 } from './cia1-flashcards-batch2';
import { CIA1_FLASHCARDS_BATCH3 } from './cia1-flashcards-batch3';
import { CIA1_FLASHCARDS_BATCH4 } from './cia1-flashcards-batch4';
import { CIA1_FLASHCARDS_BATCH5 } from './cia1-flashcards-batch5';
import { CIA1_FLASHCARDS_BATCH6 } from './cia1-flashcards-batch6';
import { CIA1_GIAS_2024_FLASHCARDS } from './cia1-gias-2024-flashcards';
import { CIA2_FLASHCARDS_BATCH2 } from './cia2-flashcards-batch2';
import { CIA2_FLASHCARDS_BATCH3 } from './cia2-flashcards-batch3';
import { CIA2_FLASHCARDS_BATCH4 } from './cia2-flashcards-batch4';
import { CIA2_FLASHCARDS_BATCH5 } from './cia2-flashcards-batch5';
import { CIA2_FLASHCARDS_BATCH6 } from './cia2-flashcards-batch6';
import { CIA3_FLASHCARDS_BATCH2 } from './cia3-flashcards-batch2';
import { CIA3_FLASHCARDS_BATCH3 } from './cia3-flashcards-batch3';
import { CIA3_FLASHCARDS_BATCH4 } from './cia3-flashcards-batch4';
import { CIA3_FLASHCARDS_BATCH5 } from './cia3-flashcards-batch5';
import { CIA3_FLASHCARDS_BATCH6 } from './cia3-flashcards-batch6';

export interface CIAFlashcard {
  id: string;
  section: 'CIA1' | 'CIA2' | 'CIA3';
  type: 'definition' | 'standard' | 'formula' | 'concept' | 'mnemonic' | 'comparison';
  topic: string;
  subtopic: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  reference?: string; // IIA Standard reference
}

// ============================================================================
// CIA PART 1: ESSENTIALS OF INTERNAL AUDITING
// ============================================================================

export const CIA1_FLASHCARDS: CIAFlashcard[] = [
  // IIA Standards & Framework
  {
    id: 'cia1-fc-001',
    section: 'CIA1',
    type: 'definition',
    topic: 'Foundations',
    subtopic: 'Definition',
    front: 'What is the IIA\'s definition of Internal Auditing?',
    back: 'Internal auditing is an independent, objective assurance and consulting activity designed to add value and improve an organization\'s operations. It helps an organization accomplish its objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control, and governance processes.',
    difficulty: 'medium',
    tags: ['definition', 'IIA', 'foundations'],
    reference: 'Definition of Internal Auditing'
  },
  {
    id: 'cia1-fc-002',
    section: 'CIA1',
    type: 'definition',
    topic: 'Independence',
    subtopic: 'Organizational Independence',
    front: 'What is organizational independence in internal auditing?',
    back: 'Organizational independence is the freedom from conditions that threaten the internal audit activity\'s ability to carry out its responsibilities in an unbiased manner. It requires the CAE to report functionally to the board and have direct and unrestricted access to senior management.',
    difficulty: 'medium',
    tags: ['independence', 'CAE', 'board'],
    reference: 'Standard 1100'
  },
  {
    id: 'cia1-fc-003',
    section: 'CIA1',
    type: 'definition',
    topic: 'Independence',
    subtopic: 'Individual Objectivity',
    front: 'What is individual objectivity?',
    back: 'Individual objectivity is an unbiased mental attitude that allows internal auditors to perform engagements without quality compromises. Auditors must not subordinate their judgment to others and must avoid conflicts of interest.',
    difficulty: 'medium',
    tags: ['objectivity', 'independence', 'ethics'],
    reference: 'Standard 1120'
  },
  {
    id: 'cia1-fc-004',
    section: 'CIA1',
    type: 'standard',
    topic: 'Proficiency',
    subtopic: 'Due Professional Care',
    front: 'What is due professional care?',
    back: 'Due professional care is the care and skill expected of a reasonably prudent and competent internal auditor. It does NOT imply infallibility but requires consideration of: extent of work needed, complexity, significance of matters, adequacy of governance/risk/control, and probability of errors or fraud.',
    difficulty: 'hard',
    tags: ['due care', 'proficiency', 'standards'],
    reference: 'Standard 1220'
  },
  {
    id: 'cia1-fc-005',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'IIA Code of Ethics',
    subtopic: 'Principles',
    front: 'What are the four principles of the IIA Code of Ethics? (Mnemonic)',
    back: '**"IOCO"**\n\n• **I**ntegrity - Establishes trust and basis for reliance\n• **O**bjectivity - Exhibit highest professional objectivity\n• **C**onfidentiality - Respect value and ownership of information\n• **C**ompetency - Apply knowledge, skills, and experience',
    difficulty: 'medium',
    tags: ['ethics', 'principles', 'mnemonic'],
    reference: 'IIA Code of Ethics'
  },
  {
    id: 'cia1-fc-006',
    section: 'CIA1',
    type: 'concept',
    topic: 'Governance',
    subtopic: 'Board Responsibilities',
    front: 'What are the key responsibilities of the board regarding internal audit?',
    back: '• Approve the internal audit charter\n• Approve the risk-based audit plan\n• Approve the internal audit budget and resource plan\n• Receive communications from the CAE on audit activity performance\n• Make appropriate inquiries about audit findings\n• Approve decisions regarding CAE appointment and removal',
    difficulty: 'hard',
    tags: ['governance', 'board', 'charter'],
    reference: 'Standard 1110'
  },
  {
    id: 'cia1-fc-007',
    section: 'CIA1',
    type: 'definition',
    topic: 'Audit Charter',
    subtopic: 'Purpose and Components',
    front: 'What must the internal audit charter include?',
    back: 'The internal audit charter must define:\n\n• Purpose, authority, and responsibility of the internal audit activity\n• Position of internal audit within the organization\n• Functional reporting relationship to the board\n• Authorization for access to records, personnel, and properties\n• Scope of internal audit activities\n• Nature of assurance and consulting services',
    difficulty: 'hard',
    tags: ['charter', 'authority', 'governance'],
    reference: 'Standard 1000'
  },
  {
    id: 'cia1-fc-008',
    section: 'CIA1',
    type: 'comparison',
    topic: 'Assurance vs Consulting',
    subtopic: 'Service Types',
    front: 'What is the difference between assurance and consulting services?',
    back: '**Assurance Services:**\n• Objective examination of evidence\n• Independent assessment provided to management/board\n• Three parties: auditor, process owner, users\n• Examples: financial, compliance, operations audits\n\n**Consulting Services:**\n• Advisory in nature\n• Agreed upon with client\n• Two parties: auditor and client\n• Examples: training, advice, facilitation\n\nNature and scope determined by client for consulting vs. auditor for assurance.',
    difficulty: 'hard',
    tags: ['assurance', 'consulting', 'services'],
    reference: 'Glossary'
  },
  {
    id: 'cia1-fc-009',
    section: 'CIA1',
    type: 'concept',
    topic: 'Risk-Based Planning',
    subtopic: 'Audit Planning',
    front: 'What factors should the CAE consider in developing the risk-based audit plan?',
    back: '• Organization\'s risk management framework\n• Significant risks to objectives and operations\n• Input from senior management and the board\n• Prior audit results and known issues\n• Legal/regulatory requirements\n• Expected changes in business conditions\n• IT and business system changes\n• Emerging issues and industry developments\n• Resource requirements and constraints',
    difficulty: 'hard',
    tags: ['planning', 'risk-based', 'CAE'],
    reference: 'Standard 2010'
  },
  {
    id: 'cia1-fc-010',
    section: 'CIA1',
    type: 'standard',
    topic: 'Quality Assurance',
    subtopic: 'QAIP',
    front: 'What is QAIP and what are its components?',
    back: '**Quality Assurance and Improvement Program (QAIP):**\n\nMust include both internal and external assessments:\n\n**Internal Assessments:**\n• Ongoing monitoring (continuous)\n• Periodic self-assessments\n\n**External Assessments:**\n• At least once every FIVE years\n• By qualified, independent assessor or team\n• CAE discusses requirements with board\n\nResults communicated to board with action plans.',
    difficulty: 'hard',
    tags: ['QAIP', 'quality', 'assessment'],
    reference: 'Standard 1300'
  },
  
  // Engagement Planning
  {
    id: 'cia1-fc-011',
    section: 'CIA1',
    type: 'concept',
    topic: 'Engagement Planning',
    subtopic: 'Planning Process',
    front: 'What are the key elements of engagement planning?',
    back: '**Engagement Objectives:** What the engagement intends to accomplish\n\n**Scope:** Activities, timeframe, and limitations\n\n**Resources:** Team composition, skills, knowledge\n\n**Work Program:** Procedures for identifying, analyzing, evaluating, and documenting information\n\n**Risk Assessment:** Identify significant risks and tailor work accordingly',
    difficulty: 'medium',
    tags: ['planning', 'scope', 'objectives'],
    reference: 'Standard 2200'
  },
  {
    id: 'cia1-fc-012',
    section: 'CIA1',
    type: 'definition',
    topic: 'Control',
    subtopic: 'Definition',
    front: 'What is the definition of control in internal auditing?',
    back: 'Control is any action taken by management, the board, and other parties to manage risk and increase the likelihood that established objectives and goals will be achieved.\n\nManagement plans, organizes, and directs the performance of sufficient actions to provide reasonable assurance that objectives will be achieved.',
    difficulty: 'medium',
    tags: ['control', 'definition', 'risk'],
    reference: 'Glossary'
  },
  {
    id: 'cia1-fc-013',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'Control Types',
    subtopic: 'Categories',
    front: 'What are the three categories of controls by timing? (Mnemonic)',
    back: '**"PDC" - like Photo, Document, Check**\n\n• **P**reventive - Stop errors/fraud before they occur\n  (Segregation of duties, authorization, access controls)\n\n• **D**etective - Identify errors/fraud that have occurred\n  (Reconciliations, reviews, exception reports)\n\n• **C**orrective - Fix errors/fraud that have been detected\n  (Backup restoration, error correction procedures)',
    difficulty: 'easy',
    tags: ['controls', 'preventive', 'detective', 'corrective'],
  },
  {
    id: 'cia1-fc-014',
    section: 'CIA1',
    type: 'concept',
    topic: 'Evidence',
    subtopic: 'Attributes',
    front: 'What are the attributes of audit evidence? (SCAR)',
    back: '**S**ufficient - Enough evidence to support conclusions\n\n**C**ompetent - Reliable and relevant\n\n**A**ppropriate - Relevant to audit objectives\n\n**R**eliable - Based on source and nature\n\nEvidence obtained directly by auditor > indirectly obtained\nOriginal documents > copies\nIndependent sources > auditee sources',
    difficulty: 'medium',
    tags: ['evidence', 'SCAR', 'documentation'],
    reference: 'Standard 2310'
  },
  {
    id: 'cia1-fc-015',
    section: 'CIA1',
    type: 'comparison',
    topic: 'Sampling',
    subtopic: 'Statistical vs Non-Statistical',
    front: 'Compare statistical and non-statistical (judgmental) sampling.',
    back: '**Statistical Sampling:**\n• Random selection\n• Quantitative conclusions about population\n• Measurable sampling risk\n• Results can be projected\n• Less auditor judgment in selection\n\n**Non-Statistical (Judgmental):**\n• Items selected using judgment\n• Cannot project results statistically\n• Sampling risk not quantified\n• May be appropriate for small populations\n• More reliance on auditor expertise',
    difficulty: 'hard',
    tags: ['sampling', 'statistical', 'judgmental'],
  },
  
  // Communication
  {
    id: 'cia1-fc-016',
    section: 'CIA1',
    type: 'concept',
    topic: 'Communication',
    subtopic: 'Engagement Results',
    front: 'What must be included in engagement communications?',
    back: '**Required Elements:**\n• Objectives and scope\n• Applicable conclusions\n• Recommendations and action plans\n\n**For significant issues:**\n• **C**ondition - What exists (finding)\n• **C**riteria - What should exist (standard)\n• **C**ause - Why it happened\n• **C**onsequence - Risk/impact (effect)\n\n**Quality criteria:** Accurate, objective, clear, concise, constructive, complete, timely',
    difficulty: 'hard',
    tags: ['communication', 'findings', 'reports'],
    reference: 'Standard 2400'
  },
  {
    id: 'cia1-fc-017',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'Findings',
    subtopic: 'Components',
    front: 'What are the components of an audit finding? (4 Cs)',
    back: '**The 4 Cs of Audit Findings:**\n\n• **C**ondition - What is (current state/finding)\n• **C**riteria - What should be (standard/policy/law)\n• **C**ause - Why the gap exists (root cause)\n• **C**onsequence - What\'s at stake (risk/impact)\n\nPlus: Recommendation (what to do about it)',
    difficulty: 'easy',
    tags: ['findings', '4Cs', 'mnemonic'],
    reference: 'Standard 2410'
  },
  {
    id: 'cia1-fc-018',
    section: 'CIA1',
    type: 'standard',
    topic: 'Follow-Up',
    subtopic: 'Monitoring',
    front: 'What are the CAE\'s responsibilities for monitoring engagement results?',
    back: 'The CAE must establish a follow-up process to monitor and ensure that:\n\n• Management actions have been effectively implemented, OR\n• Senior management has accepted the risk of not taking action\n\nThe internal audit activity must monitor disposition of results and determine if senior management has accepted the risk of not taking corrective action.\n\nIf CAE believes risk is unacceptable, must discuss with senior management and potentially the board.',
    difficulty: 'medium',
    tags: ['follow-up', 'monitoring', 'CAE'],
    reference: 'Standard 2500'
  },
  {
    id: 'cia1-fc-019',
    section: 'CIA1',
    type: 'concept',
    topic: 'Governance',
    subtopic: 'Role of Internal Audit',
    front: 'What is internal audit\'s role in governance?',
    back: 'Internal audit must assess and make appropriate recommendations for improving the governance process to:\n\n• Promote ethics and values\n• Ensure effective performance management and accountability\n• Communicate risk and control information\n• Coordinate activities between board, external/internal auditors, and management',
    difficulty: 'medium',
    tags: ['governance', 'role', 'board'],
    reference: 'Standard 2110'
  },
  {
    id: 'cia1-fc-020',
    section: 'CIA1',
    type: 'definition',
    topic: 'Risk Management',
    subtopic: 'Definition',
    front: 'What is risk and what is risk management?',
    back: '**Risk:** The possibility of an event occurring that will have an impact on the achievement of objectives. Risk is measured in terms of impact and likelihood.\n\n**Risk Management:** A process to identify, assess, manage, and control potential events or situations to provide reasonable assurance regarding achievement of objectives.',
    difficulty: 'medium',
    tags: ['risk', 'definition', 'ERM'],
    reference: 'Glossary'
  },
];

// ============================================================================
// CIA PART 2: PRACTICE OF INTERNAL AUDITING
// ============================================================================

export const CIA2_FLASHCARDS: CIAFlashcard[] = [
  // Risk Management
  {
    id: 'cia2-fc-001',
    section: 'CIA2',
    type: 'concept',
    topic: 'Risk Management',
    subtopic: 'Risk Assessment',
    front: 'What are the steps in the risk assessment process?',
    back: '1. **Identify** risks to objectives\n2. **Analyze** risks (likelihood × impact)\n3. **Evaluate** against risk appetite\n4. **Prioritize** risks for treatment\n5. **Respond** to risks (avoid, accept, reduce, share)\n6. **Monitor** and review continuously\n\nDocument in risk register with owners assigned.',
    difficulty: 'medium',
    tags: ['risk assessment', 'process', 'ERM'],
  },
  {
    id: 'cia2-fc-002',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Risk Response',
    subtopic: 'Options',
    front: 'What are the four risk response options? (TARA)',
    back: '**T**erminate (Avoid) - Eliminate the activity causing risk\n\n**A**ccept (Tolerate) - Accept risk within appetite, no action\n\n**R**educe (Treat) - Implement controls to reduce likelihood/impact\n\n**A**ssign (Transfer/Share) - Transfer to third party (insurance, outsourcing)\n\nChoice depends on cost-benefit analysis and risk appetite.',
    difficulty: 'easy',
    tags: ['risk response', 'TARA', 'mnemonic'],
  },
  {
    id: 'cia2-fc-003',
    section: 'CIA2',
    type: 'definition',
    topic: 'Risk Appetite',
    subtopic: 'Definitions',
    front: 'Distinguish between risk appetite and risk tolerance.',
    back: '**Risk Appetite:** The amount and type of risk an organization is willing to accept in pursuit of its objectives. Board-level strategic decision.\n\n**Risk Tolerance:** The acceptable variation from risk appetite for specific objectives. More operational and specific.\n\nExample:\nAppetite: "We accept moderate credit risk"\nTolerance: "Bad debt ratio not to exceed 3%"',
    difficulty: 'hard',
    tags: ['risk appetite', 'tolerance', 'definitions'],
  },
  {
    id: 'cia2-fc-004',
    section: 'CIA2',
    type: 'concept',
    topic: 'COSO ERM',
    subtopic: 'Components',
    front: 'What are the components of the COSO ERM Framework?',
    back: '**COSO ERM (2017) has 5 components and 20 principles:**\n\n1. **Governance & Culture** - Sets tone, oversight structure\n2. **Strategy & Objective-Setting** - Integrates risk into strategy\n3. **Performance** - Identifies, assesses, prioritizes risks\n4. **Review & Revision** - Evaluates ERM capabilities\n5. **Information, Communication & Reporting** - Leverages information systems\n\nKey theme: Risk integrated into strategy-setting.',
    difficulty: 'hard',
    tags: ['COSO', 'ERM', 'framework'],
  },
  
  // Internal Controls
  {
    id: 'cia2-fc-005',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'COSO IC',
    subtopic: 'Components',
    front: 'What are the 5 components of COSO Internal Control? (CRIME)',
    back: '**C**ontrol Environment - Tone at top, ethics, oversight\n\n**R**isk Assessment - Identify and analyze risks\n\n**I**nformation & Communication - Relevant info flows\n\n**M**onitoring - Ongoing and separate evaluations\n\n**E**xisting Control Activities - Policies and procedures\n\n*(Also: CE-RAICOM = Control Environment, Risk Assessment, Information & Communication, Control Activities, Monitoring)*',
    difficulty: 'easy',
    tags: ['COSO', 'internal control', 'mnemonic'],
  },
  {
    id: 'cia2-fc-006',
    section: 'CIA2',
    type: 'concept',
    topic: 'Control Environment',
    subtopic: 'Elements',
    front: 'What are the key elements of the control environment?',
    back: '• **Integrity and ethical values** - Code of conduct, tone at top\n• **Board independence and oversight** - Independent directors\n• **Organizational structure** - Lines of authority\n• **Commitment to competence** - Hiring, training, performance\n• **Accountability** - Performance measures, incentives\n\nControl environment is the FOUNDATION for all other components.',
    difficulty: 'medium',
    tags: ['control environment', 'COSO', 'foundation'],
  },
  {
    id: 'cia2-fc-007',
    section: 'CIA2',
    type: 'concept',
    topic: 'Control Activities',
    subtopic: 'Types',
    front: 'What are common types of control activities?',
    back: '• **Authorization** - Approval limits, delegation\n• **Segregation of duties** - Incompatible duties separated\n• **Verification** - Reconciliations, reviews\n• **Physical controls** - Locks, access badges, inventory counts\n• **IT controls** - Access controls, change management\n• **Performance reviews** - Variance analysis, KPIs\n• **Documentation** - Policies, procedures, audit trails',
    difficulty: 'medium',
    tags: ['control activities', 'procedures', 'types'],
  },
  {
    id: 'cia2-fc-008',
    section: 'CIA2',
    type: 'comparison',
    topic: 'IT Controls',
    subtopic: 'General vs Application',
    front: 'Distinguish between IT general controls and application controls.',
    back: '**IT General Controls (ITGCs):**\n• Apply to all systems\n• Access controls, change management\n• Operations, backup, recovery\n• System development controls\n• Create environment for application controls\n\n**Application Controls:**\n• Specific to individual applications\n• Input controls (validation, edits)\n• Processing controls (calculations)\n• Output controls (distribution, review)\n\nITGC weakness can undermine all application controls.',
    difficulty: 'hard',
    tags: ['IT controls', 'ITGC', 'application'],
  },
  
  // Audit Techniques
  {
    id: 'cia2-fc-009',
    section: 'CIA2',
    type: 'concept',
    topic: 'Audit Procedures',
    subtopic: 'Types',
    front: 'What are the main types of audit procedures?',
    back: '• **Inquiry** - Asking questions (least reliable alone)\n• **Observation** - Watching processes in action\n• **Inspection** - Examining documents/physical assets\n• **Confirmation** - Independent verification from third party\n• **Recalculation** - Re-performing calculations\n• **Reperformance** - Independently executing procedures\n• **Analytical procedures** - Evaluating relationships/trends\n• **Testing controls** - Evaluating design and operating effectiveness',
    difficulty: 'medium',
    tags: ['procedures', 'techniques', 'evidence'],
  },
  {
    id: 'cia2-fc-010',
    section: 'CIA2',
    type: 'concept',
    topic: 'Analytical Procedures',
    subtopic: 'Types',
    front: 'What types of analytical procedures can auditors use?',
    back: '**Trend Analysis** - Compare current to prior periods\n\n**Ratio Analysis** - Calculate and compare ratios\n\n**Reasonableness Tests** - Develop expectations, compare to actual\n\n**Regression Analysis** - Statistical modeling of relationships\n\n**Benchmarking** - Compare to industry or best practices\n\nUseful for identifying unusual fluctuations or potential misstatements for further investigation.',
    difficulty: 'medium',
    tags: ['analytical', 'procedures', 'ratios'],
  },
  {
    id: 'cia2-fc-011',
    section: 'CIA2',
    type: 'concept',
    topic: 'Fraud',
    subtopic: 'Fraud Triangle',
    front: 'What is the Fraud Triangle?',
    back: 'Three conditions present when fraud occurs:\n\n**1. Pressure/Incentive** - Financial difficulties, unrealistic targets\n\n**2. Opportunity** - Weak controls, lack of oversight\n\n**3. Rationalization** - Justification ("I deserve it," "temporary")\n\nInternal auditors should be alert to red flags in all three areas during engagements.',
    difficulty: 'easy',
    tags: ['fraud', 'triangle', 'red flags'],
  },
  {
    id: 'cia2-fc-012',
    section: 'CIA2',
    type: 'concept',
    topic: 'Fraud',
    subtopic: 'Red Flags',
    front: 'What are common fraud red flags?',
    back: '**Behavioral:**\n• Living beyond means\n• Financial difficulties\n• Unusually close vendor relationships\n• Control issues, reluctance to share duties\n\n**Documentary:**\n• Missing documents\n• Excessive voids or adjustments\n• Photocopies substituted for originals\n• Alterations or inconsistencies\n\n**Analytical:**\n• Unusual trends or transactions\n• Large round-number transactions\n• Period-end anomalies',
    difficulty: 'medium',
    tags: ['fraud', 'red flags', 'indicators'],
  },
  {
    id: 'cia2-fc-013',
    section: 'CIA2',
    type: 'definition',
    topic: 'Data Analytics',
    subtopic: 'CAAT',
    front: 'What are Computer-Assisted Audit Techniques (CAATs)?',
    back: 'CAATs use technology to perform audit procedures:\n\n• **Test data** - Process fabricated transactions\n• **Parallel simulation** - Re-process actual data\n• **Embedded audit modules** - Continuous monitoring\n• **Generalized audit software** - Extract, analyze data\n• **Data analytics** - Pattern analysis, anomaly detection\n\nBenefits: Test 100% of transactions, identify exceptions, continuous monitoring.',
    difficulty: 'hard',
    tags: ['CAATs', 'data analytics', 'technology'],
  },
  {
    id: 'cia2-fc-014',
    section: 'CIA2',
    type: 'concept',
    topic: 'Documentation',
    subtopic: 'Working Papers',
    front: 'What are the requirements for audit working papers?',
    back: '**Purpose:** Support engagement conclusions and results\n\n**Must include:**\n• Planning documents and programs\n• Analysis and evidence obtained\n• Conclusions reached\n• Recommendations\n\n**Quality requirements:**\n• Sufficient detail for experienced auditor to understand\n• Clear, complete, organized\n• Stand-alone (understandable without explanation)\n• Cross-referenced and indexed',
    difficulty: 'medium',
    tags: ['documentation', 'working papers', 'evidence'],
    reference: 'Standard 2330'
  },
  {
    id: 'cia2-fc-015',
    section: 'CIA2',
    type: 'concept',
    topic: 'Engagement Supervision',
    subtopic: 'Requirements',
    front: 'What does engagement supervision require?',
    back: 'Supervision must ensure objectives are achieved, quality maintained:\n\n• **Planning guidance** - Clear instructions and approach\n• **Progress monitoring** - Track against plan\n• **Issue escalation** - Timely resolution of problems\n• **Work review** - Quality of evidence and conclusions\n• **Team development** - Coaching and feedback\n\nExtent of supervision depends on proficiency and experience of internal auditors.',
    difficulty: 'medium',
    tags: ['supervision', 'quality', 'review'],
    reference: 'Standard 2340'
  },
  
  // Specific Audit Areas
  {
    id: 'cia2-fc-016',
    section: 'CIA2',
    type: 'concept',
    topic: 'Operational Auditing',
    subtopic: 'Focus Areas',
    front: 'What is the focus of operational auditing?',
    back: 'Evaluates efficiency and effectiveness of operations:\n\n**Efficiency:** Are resources used optimally?\n(Minimizing waste, cost per unit, cycle time)\n\n**Effectiveness:** Are objectives achieved?\n(Quality, customer satisfaction, goal attainment)\n\n**Key areas:**\n• Business processes\n• Resource utilization\n• Compliance with policies\n• Achievement of KPIs\n• Value-added opportunities',
    difficulty: 'medium',
    tags: ['operational', 'efficiency', 'effectiveness'],
  },
  {
    id: 'cia2-fc-017',
    section: 'CIA2',
    type: 'concept',
    topic: 'Compliance Auditing',
    subtopic: 'Focus',
    front: 'What does compliance auditing evaluate?',
    back: 'Assesses adherence to:\n\n• **Laws and regulations** - Legal requirements\n• **Contracts** - Vendor, customer, employee agreements\n• **Policies and procedures** - Internal rules\n• **Ethics** - Code of conduct compliance\n\n**Key considerations:**\n• Identify applicable requirements\n• Test adherence through evidence\n• Evaluate consequences of non-compliance\n• Consider industry-specific regulations',
    difficulty: 'medium',
    tags: ['compliance', 'regulatory', 'policies'],
  },
  {
    id: 'cia2-fc-018',
    section: 'CIA2',
    type: 'concept',
    topic: 'Financial Auditing',
    subtopic: 'Key Tests',
    front: 'What are key tests in financial process auditing?',
    back: '**Revenue Cycle:**\n• Completeness of recorded revenue\n• Cutoff testing\n• AR confirmations\n\n**Expenditure Cycle:**\n• Authorization of purchases\n• Three-way match\n• Vendor validation\n\n**Payroll:**\n• Ghost employee testing\n• Proper authorization\n• Accurate calculations\n\n**Treasury:**\n• Bank reconciliations\n• Investment authorization\n• Cash handling',
    difficulty: 'hard',
    tags: ['financial', 'testing', 'cycles'],
  },
  {
    id: 'cia2-fc-019',
    section: 'CIA2',
    type: 'concept',
    topic: 'IT Auditing',
    subtopic: 'Key Areas',
    front: 'What are key IT audit focus areas?',
    back: '**IT Governance:** Alignment with business objectives\n\n**Security:** Access controls, vulnerability management\n\n**Change Management:** Controlled system changes\n\n**Operations:** Backup, recovery, incident management\n\n**Application Controls:** Input, processing, output controls\n\n**Data Integrity:** Accuracy, completeness, validity\n\n**Third-Party Risk:** Vendor management, cloud security',
    difficulty: 'hard',
    tags: ['IT audit', 'security', 'controls'],
  },
  {
    id: 'cia2-fc-020',
    section: 'CIA2',
    type: 'concept',
    topic: 'Consulting Engagements',
    subtopic: 'Considerations',
    front: 'What are special considerations for consulting engagements?',
    back: '**Key differences from assurance:**\n• Scope agreed with client\n• May accept engagement if value added\n• Can provide recommendations without full assessment\n\n**Limitations:**\n• Cannot assume management responsibility\n• Cannot provide assurance on same area recently consulted\n• Must maintain objectivity\n\n**Examples:** Facilitation, training, advice, process design',
    difficulty: 'hard',
    tags: ['consulting', 'advisory', 'services'],
    reference: 'Standard 2010.C1'
  },
];

// ============================================================================
// CIA PART 3: BUSINESS KNOWLEDGE FOR INTERNAL AUDITING
// ============================================================================

export const CIA3_FLASHCARDS: CIAFlashcard[] = [
  // Business Acumen
  {
    id: 'cia3-fc-001',
    section: 'CIA3',
    type: 'concept',
    topic: 'Strategic Management',
    subtopic: 'SWOT Analysis',
    front: 'What is SWOT analysis?',
    back: '**S**trengths - Internal positive attributes\n(Core competencies, resources, reputation)\n\n**W**eaknesses - Internal negative attributes\n(Skill gaps, resource constraints, limitations)\n\n**O**pportunities - External positive factors\n(Market trends, regulatory changes, technology)\n\n**T**hreats - External negative factors\n(Competition, economic conditions, disruption)\n\nUsed for strategic planning and decision-making.',
    difficulty: 'easy',
    tags: ['SWOT', 'strategic', 'analysis'],
  },
  {
    id: 'cia3-fc-002',
    section: 'CIA3',
    type: 'concept',
    topic: 'Strategic Management',
    subtopic: "Porter's Five Forces",
    front: "What are Porter's Five Forces?",
    back: '**1. Threat of New Entrants**\nBarriers to entry, capital requirements\n\n**2. Bargaining Power of Suppliers**\nConcentration, switching costs, uniqueness\n\n**3. Bargaining Power of Buyers**\nVolume, information, alternatives\n\n**4. Threat of Substitutes**\nAlternative products, price-performance\n\n**5. Industry Rivalry**\nNumber of competitors, growth rate, differentiation\n\nDetermines industry attractiveness and profitability.',
    difficulty: 'medium',
    tags: ['Porter', 'five forces', 'competitive'],
  },
  {
    id: 'cia3-fc-003',
    section: 'CIA3',
    type: 'comparison',
    topic: 'Strategy',
    subtopic: 'Generic Strategies',
    front: "What are Porter's generic competitive strategies?",
    back: '**Cost Leadership:**\n• Lowest cost producer\n• Broad market target\n• Price competition advantage\n\n**Differentiation:**\n• Unique products/services\n• Premium pricing\n• Brand loyalty\n\n**Focus (Niche):**\n• Narrow market segment\n• Either cost focus or differentiation focus\n• Specialized expertise\n\n"Stuck in the middle" = pursuing none effectively',
    difficulty: 'medium',
    tags: ['strategy', 'competitive', 'Porter'],
  },
  {
    id: 'cia3-fc-004',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'Performance',
    subtopic: 'Balanced Scorecard',
    front: 'What are the four perspectives of the Balanced Scorecard? (FILC)',
    back: '**F**inancial - "How do we look to shareholders?"\n(Revenue, profitability, ROI)\n\n**I**nternal Process - "What must we excel at?"\n(Quality, efficiency, innovation)\n\n**L**earning & Growth - "Can we continue to improve?"\n(Training, technology, culture)\n\n**C**ustomer - "How do customers see us?"\n(Satisfaction, retention, market share)\n\nBalances financial and non-financial measures.',
    difficulty: 'easy',
    tags: ['BSC', 'balanced scorecard', 'KPIs'],
  },
  
  // Information Security
  {
    id: 'cia3-fc-005',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'Information Security',
    subtopic: 'CIA Triad',
    front: 'What is the CIA Triad in information security?',
    back: '**C**onfidentiality - Protecting data from unauthorized access\n(Encryption, access controls, classification)\n\n**I**ntegrity - Ensuring data accuracy and completeness\n(Checksums, validation, audit trails)\n\n**A**vailability - Ensuring authorized access when needed\n(Redundancy, backup, disaster recovery)\n\nFundamental objectives of information security.',
    difficulty: 'easy',
    tags: ['security', 'CIA triad', 'fundamentals'],
  },
  {
    id: 'cia3-fc-006',
    section: 'CIA3',
    type: 'concept',
    topic: 'Cybersecurity',
    subtopic: 'Threat Types',
    front: 'What are common types of cyber threats?',
    back: '**Malware:** Viruses, worms, trojans, ransomware\n\n**Social Engineering:** Phishing, pretexting, baiting\n\n**Network Attacks:** DoS/DDoS, man-in-the-middle\n\n**Application Attacks:** SQL injection, XSS\n\n**Insider Threats:** Malicious or negligent employees\n\n**Advanced Persistent Threats (APT):** Targeted, sophisticated, prolonged attacks',
    difficulty: 'medium',
    tags: ['cybersecurity', 'threats', 'attacks'],
  },
  {
    id: 'cia3-fc-007',
    section: 'CIA3',
    type: 'concept',
    topic: 'Access Controls',
    subtopic: 'Authentication Factors',
    front: 'What are the three factors of authentication?',
    back: '**Something You KNOW:**\nPassword, PIN, security questions\n\n**Something You HAVE:**\nToken, smart card, mobile device\n\n**Something You ARE:**\nBiometrics (fingerprint, retina, face)\n\n**Multi-Factor Authentication (MFA):**\nRequires two or more factors from DIFFERENT categories.\n\nPasswords + security questions = same factor (know/know)',
    difficulty: 'medium',
    tags: ['authentication', 'access control', 'MFA'],
  },
  
  // Information Technology
  {
    id: 'cia3-fc-008',
    section: 'CIA3',
    type: 'comparison',
    topic: 'Cloud Computing',
    subtopic: 'Service Models',
    front: 'Compare IaaS, PaaS, and SaaS cloud service models.',
    back: '**IaaS (Infrastructure as a Service):**\n• Virtualized computing resources\n• Customer manages OS, apps, data\n• Example: AWS EC2, Azure VMs\n\n**PaaS (Platform as a Service):**\n• Development platform and tools\n• Customer manages apps and data\n• Example: Heroku, Google App Engine\n\n**SaaS (Software as a Service):**\n• Complete applications\n• Customer manages only data\n• Example: Salesforce, Office 365',
    difficulty: 'medium',
    tags: ['cloud', 'IaaS', 'PaaS', 'SaaS'],
  },
  {
    id: 'cia3-fc-009',
    section: 'CIA3',
    type: 'concept',
    topic: 'IT Governance',
    subtopic: 'COBIT',
    front: 'What is COBIT and what are its domains?',
    back: '**COBIT** = Control Objectives for Information and Related Technology\n\n**Purpose:** Framework for IT governance and management\n\n**COBIT 2019 Domains:**\n\n• **EDM** - Evaluate, Direct, Monitor (Governance)\n• **APO** - Align, Plan, Organize\n• **BAI** - Build, Acquire, Implement\n• **DSS** - Deliver, Service, Support\n• **MEA** - Monitor, Evaluate, Assess',
    difficulty: 'hard',
    tags: ['COBIT', 'IT governance', 'framework'],
  },
  {
    id: 'cia3-fc-010',
    section: 'CIA3',
    type: 'concept',
    topic: 'Business Continuity',
    subtopic: 'Key Concepts',
    front: 'Distinguish between RTO and RPO.',
    back: '**RTO (Recovery Time Objective):**\nMaximum acceptable time to restore systems after disruption.\n"How quickly must we be back up?"\nExample: 4-hour RTO means systems must be restored within 4 hours.\n\n**RPO (Recovery Point Objective):**\nMaximum acceptable data loss, measured in time.\n"How much data can we afford to lose?"\nExample: 1-hour RPO means backups must occur at least hourly.\n\nRPO drives backup frequency; RTO drives recovery capability.',
    difficulty: 'hard',
    tags: ['RTO', 'RPO', 'disaster recovery'],
  },
  
  // Financial Management
  {
    id: 'cia3-fc-011',
    section: 'CIA3',
    type: 'formula',
    topic: 'Financial Ratios',
    subtopic: 'Liquidity',
    front: 'What are the key liquidity ratios?',
    back: '**Current Ratio:**\nCurrent Assets / Current Liabilities\n(Measures ability to pay short-term obligations)\n\n**Quick Ratio (Acid Test):**\n(Current Assets - Inventory) / Current Liabilities\n(More stringent; excludes less liquid inventory)\n\n**Cash Ratio:**\nCash + Cash Equivalents / Current Liabilities\n(Most conservative liquidity measure)\n\nHigher = more liquid',
    difficulty: 'medium',
    tags: ['ratios', 'liquidity', 'formulas'],
  },
  {
    id: 'cia3-fc-012',
    section: 'CIA3',
    type: 'formula',
    topic: 'Financial Ratios',
    subtopic: 'Profitability',
    front: 'What are key profitability ratios?',
    back: '**Gross Profit Margin:**\n(Revenue - COGS) / Revenue\n\n**Operating Margin:**\nOperating Income / Revenue\n\n**Net Profit Margin:**\nNet Income / Revenue\n\n**ROA (Return on Assets):**\nNet Income / Total Assets\n\n**ROE (Return on Equity):**\nNet Income / Shareholders\' Equity\n\nHigher = more profitable',
    difficulty: 'medium',
    tags: ['ratios', 'profitability', 'ROA', 'ROE'],
  },
  {
    id: 'cia3-fc-013',
    section: 'CIA3',
    type: 'formula',
    topic: 'Capital Budgeting',
    subtopic: 'NPV and IRR',
    front: 'What are NPV and IRR?',
    back: '**NPV (Net Present Value):**\nPV of cash inflows - Initial investment\nAccept if NPV > 0\nHigher NPV = better project\n\n**IRR (Internal Rate of Return):**\nDiscount rate that makes NPV = 0\nAccept if IRR > hurdle rate (cost of capital)\n\n**Key difference:**\n• NPV gives dollar value created\n• IRR gives percentage return\n• NPV preferred when projects are mutually exclusive',
    difficulty: 'hard',
    tags: ['NPV', 'IRR', 'capital budgeting'],
  },
  {
    id: 'cia3-fc-014',
    section: 'CIA3',
    type: 'concept',
    topic: 'Managerial Accounting',
    subtopic: 'Cost Behavior',
    front: 'Distinguish between fixed, variable, and mixed costs.',
    back: '**Fixed Costs:**\n• Remain constant regardless of activity level\n• Examples: Rent, insurance, salaries\n• Per-unit cost decreases as volume increases\n\n**Variable Costs:**\n• Change in proportion to activity level\n• Examples: Direct materials, direct labor, commissions\n• Per-unit cost stays constant\n\n**Mixed (Semi-Variable):**\n• Both fixed and variable components\n• Example: Utilities (base + usage)',
    difficulty: 'medium',
    tags: ['costs', 'fixed', 'variable', 'behavior'],
  },
  {
    id: 'cia3-fc-015',
    section: 'CIA3',
    type: 'formula',
    topic: 'CVP Analysis',
    subtopic: 'Break-Even',
    front: 'How do you calculate break-even point?',
    back: '**Break-Even in Units:**\nFixed Costs / Contribution Margin per Unit\n\n**Break-Even in Dollars:**\nFixed Costs / Contribution Margin Ratio\n\n**Where:**\nContribution Margin = Selling Price - Variable Cost\nCM Ratio = CM per Unit / Selling Price\n\n**Example:**\nFC = $100,000, SP = $50, VC = $30\nCM = $20, CM Ratio = 40%\nBE Units = $100,000 / $20 = 5,000 units\nBE $ = $100,000 / 0.40 = $250,000',
    difficulty: 'hard',
    tags: ['break-even', 'CVP', 'formulas'],
  },
  
  // Additional Topics
  {
    id: 'cia3-fc-016',
    section: 'CIA3',
    type: 'concept',
    topic: 'Organizational Behavior',
    subtopic: 'Motivation Theories',
    front: 'What are key motivation theories?',
    back: '**Maslow\'s Hierarchy:**\nPhysiological → Safety → Social → Esteem → Self-actualization\n\n**Herzberg\'s Two-Factor:**\n• Hygiene factors (prevent dissatisfaction)\n• Motivators (create satisfaction)\n\n**McGregor\'s Theory X and Y:**\n• X: Workers avoid work, need control\n• Y: Workers are self-motivated\n\n**Expectancy Theory:**\nMotivation = Expectancy × Instrumentality × Valence',
    difficulty: 'medium',
    tags: ['motivation', 'Maslow', 'Herzberg'],
  },
  {
    id: 'cia3-fc-017',
    section: 'CIA3',
    type: 'concept',
    topic: 'Quality Management',
    subtopic: 'Six Sigma',
    front: 'What is Six Sigma and DMAIC?',
    back: '**Six Sigma:** Data-driven methodology for eliminating defects.\nGoal: 3.4 defects per million opportunities.\n\n**DMAIC Process:**\n\n**D**efine - Problem, goals, scope\n**M**easure - Current performance, baseline data\n**A**nalyze - Root causes, data analysis\n**I**mprove - Implement solutions\n**C**ontrol - Sustain improvements, monitor\n\nUsed for improving existing processes.',
    difficulty: 'medium',
    tags: ['Six Sigma', 'DMAIC', 'quality'],
  },
  {
    id: 'cia3-fc-018',
    section: 'CIA3',
    type: 'concept',
    topic: 'Project Management',
    subtopic: 'Critical Path',
    front: 'What is the critical path in project management?',
    back: '**Critical Path:** The longest sequence of dependent activities that determines minimum project duration.\n\n**Characteristics:**\n• Activities on critical path have zero float/slack\n• Delay in any critical activity delays entire project\n• There may be multiple critical paths\n\n**Float/Slack:** Time an activity can be delayed without affecting project completion.\n\nUse CPM to identify and focus management attention on critical activities.',
    difficulty: 'hard',
    tags: ['critical path', 'project management', 'CPM'],
  },
  {
    id: 'cia3-fc-019',
    section: 'CIA3',
    type: 'concept',
    topic: 'Corporate Governance',
    subtopic: 'Key Elements',
    front: 'What are key elements of corporate governance?',
    back: '**Board of Directors:**\n• Oversight of management\n• Strategic direction\n• Independent and diverse\n\n**Audit Committee:**\n• Financial reporting oversight\n• Internal/external audit oversight\n• Whistleblower mechanisms\n\n**Internal Controls:**\n• Policies and procedures\n• Risk management\n• Compliance\n\n**Transparency:**\n• Disclosure\n• Accountability\n• Stakeholder communication',
    difficulty: 'medium',
    tags: ['governance', 'board', 'audit committee'],
  },
  {
    id: 'cia3-fc-020',
    section: 'CIA3',
    type: 'formula',
    topic: 'Working Capital',
    subtopic: 'Cash Conversion Cycle',
    front: 'What is the Cash Conversion Cycle?',
    back: '**Cash Conversion Cycle (CCC):**\nDIO + DSO - DPO\n\n**Components:**\n• **DIO** (Days Inventory Outstanding) = (Inventory / COGS) × 365\n• **DSO** (Days Sales Outstanding) = (AR / Sales) × 365\n• **DPO** (Days Payable Outstanding) = (AP / COGS) × 365\n\n**Interpretation:**\n• Shorter CCC = more efficient\n• Fewer days between cash outflow and inflow',
    difficulty: 'hard',
    tags: ['CCC', 'working capital', 'formula'],
  },
];

// ============================================================================
// EXPORTS
// ============================================================================

export const ALL_CIA_FLASHCARDS = [
  ...CIA1_GIAS_2024_FLASHCARDS, // GIAS 2024 - Critical Update, Priority Content
  ...CIA1_FLASHCARDS,
  ...CIA1_FLASHCARDS_BATCH2,
  ...CIA1_FLASHCARDS_BATCH3,
  ...CIA1_FLASHCARDS_BATCH4,
  ...CIA1_FLASHCARDS_BATCH5,
  ...CIA1_FLASHCARDS_BATCH6,
  ...CIA2_FLASHCARDS,
  ...CIA2_FLASHCARDS_BATCH2,
  ...CIA2_FLASHCARDS_BATCH3,
  ...CIA2_FLASHCARDS_BATCH4,
  ...CIA2_FLASHCARDS_BATCH5,
  ...CIA2_FLASHCARDS_BATCH6,
  ...CIA3_FLASHCARDS,
  ...CIA3_FLASHCARDS_BATCH2,
  ...CIA3_FLASHCARDS_BATCH3,
  ...CIA3_FLASHCARDS_BATCH4,
  ...CIA3_FLASHCARDS_BATCH5,
  ...CIA3_FLASHCARDS_BATCH6,
];

export const getCIAFlashcardsBySection = (section: 'CIA1' | 'CIA2' | 'CIA3'): CIAFlashcard[] => {
  return ALL_CIA_FLASHCARDS.filter(fc => fc.section === section);
};

export const getCIAFlashcardsByTopic = (topic: string): CIAFlashcard[] => {
  return ALL_CIA_FLASHCARDS.filter(fc => fc.topic.toLowerCase().includes(topic.toLowerCase()));
};

export const getCIAFlashcardsByType = (type: CIAFlashcard['type']): CIAFlashcard[] => {
  return ALL_CIA_FLASHCARDS.filter(fc => fc.type === type);
};

export default ALL_CIA_FLASHCARDS;
