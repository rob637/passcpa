/**
 * CIA Mnemonic Flashcards
 * Memory aids for all three CIA exam parts
 * Based on IIA Standards and best practices
 */

import { CIAFlashcard } from './index';

// Extended CIAFlashcard with optional mnemonic field
interface CIAMnemonicFlashcard extends CIAFlashcard {
  mnemonic?: string;
}

// ==========================================
// CIA PART 1 MNEMONICS - Essentials of Internal Auditing
// ==========================================
export const CIA1_MNEMONICS: CIAMnemonicFlashcard[] = [
  {
    id: 'cia1-mnem-001',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'IIA Standards',
    subtopic: 'Three Lines Model',
    front: 'The Three Lines Model - who does what?',
    back: 'THREE LINES:\n\n1st Line: OPERATIONS\n- Management and staff\n- Own and manage risk\n- Direct control activities\n\n2nd Line: OVERSIGHT\n- Risk management function\n- Compliance, quality, IT security\n- Expertise, monitoring, guidance\n\n3rd Line: ASSURANCE\n- Internal audit\n- Independent, objective assurance\n- Reports to governing body\n\nGoverning body oversees all three',
    difficulty: 'medium',
    tags: ['three lines', 'governance', 'roles'],
    reference: 'IIA Three Lines Model (2020)'
  },
  {
    id: 'cia1-mnem-002',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'IIA Standards',
    subtopic: 'Attribute Standards',
    front: 'Attribute Standards 1000 series categories',
    mnemonic: 'PIDO',
    back: 'P - Purpose, Authority, Responsibility (1000)\nI - Independence & Objectivity (1100)\nD - Due Professional Care (1200)\nO - Quality Assurance & Improvement Program (1300)\n\nAttribute standards address CHARACTERISTICS of organizations and individuals performing internal audit activities.',
    difficulty: 'medium',
    tags: ['attribute standards', 'IPPF'],
    reference: 'Standard 1000-1300'
  },
  {
    id: 'cia1-mnem-003',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'IIA Standards',
    subtopic: 'Performance Standards',
    front: 'Performance Standards 2000 series categories',
    mnemonic: 'MPENEC-CM',
    back: 'M - Managing the IA Activity (2000)\nP - Planning (2010)\nE - Engagement Planning (2200)\nN - Nature of Work (2100)\nE - Engagement Performance (2300)\nC - Communicating Results (2400)\nC - Coordinating (2050)\nM - Monitoring Progress (2500)\n\nPerformance standards describe the NATURE of internal audit activities.',
    difficulty: 'hard',
    tags: ['performance standards', 'IPPF'],
    reference: 'Standard 2000-2600'
  },
  {
    id: 'cia1-mnem-004',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'QAIP',
    subtopic: 'Assessment Types',
    front: 'QAIP Internal and External Assessment Requirements',
    mnemonic: 'COIN-5E',
    back: 'COIN = Continuous and Ongoing Internal assessments:\n- Ongoing monitoring\n- Internal reviews\n- Periodic self-assessments\n\n5E = Every 5 years External assessment:\n- Qualified, independent assessor\n- Full external assessment OR\n- Self-assessment with independent validation\n\nResults reported to board / governing body',
    difficulty: 'hard',
    tags: ['QAIP', 'quality assurance'],
    reference: 'Standard 1312'
  },
  {
    id: 'cia1-mnem-005',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'Independence',
    subtopic: 'Reporting Lines',
    front: 'CAE dual reporting structure',
    mnemonic: 'FUNCTIONAL-ADMIN',
    back: 'FUNCTIONAL reporting to BOARD:\n- Approve charter, risk-based plan\n- Communications from CAE\n- CAE appointment/removal\n- Budget and resources\n- Scope restrictions\n\nADMINISTRATIVE reporting to MANAGEMENT:\n- Day-to-day operations\n- Internal policies compliance\n- HR matters\n- Budget management\n\nFunctional = Independence | Administrative = Operations',
    difficulty: 'medium',
    tags: ['independence', 'CAE', 'reporting'],
    reference: 'Standard 1110'
  },
  {
    id: 'cia1-mnem-006',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'Fraud',
    subtopic: 'Fraud Triangle',
    front: 'Fraud Triangle elements',
    mnemonic: 'ORP',
    back: 'Opportunity\n- Weak controls\n- Override capability\n- Access to assets\n\nRationalization\n- Justifying behavior\n- "Everyone does it"\n- "I deserve it"\n\nPressure (Motivation)\n- Financial problems\n- Lifestyle maintenance\n- Performance targets\n\nAll three elements typically present in fraud',
    difficulty: 'easy',
    tags: ['fraud', 'fraud triangle'],
  },
  {
    id: 'cia1-mnem-007',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'Risk Management',
    subtopic: 'COSO ERM',
    front: 'COSO ERM Framework Components',
    mnemonic: 'GPS-RIR-M',
    back: 'Governance & Culture\nPerformance (Strategy & Objective-Setting)\nStrategy & Objective-Setting\n\nRisk Identification\nInformation, Communication & Reporting\nReview & Revision\n\nMonitoring\n\n5 components, 20 principles in 2017 framework',
    difficulty: 'hard',
    tags: ['COSO', 'ERM', 'risk management'],
  },
  {
    id: 'cia1-mnem-008',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'Internal Control',
    subtopic: 'COSO Components',
    front: 'COSO Internal Control Framework Components',
    mnemonic: 'CRIME',
    back: 'Control Environment (tone at top)\nRisk Assessment (identify & analyze)\nInformation & Communication\nMonitoring Activities\nExisting Control Activities\n\n5 components, 17 principles\nApplicable to all organizations',
    difficulty: 'easy',
    tags: ['COSO', 'internal control'],
  },
];

// ==========================================
// CIA PART 2 MNEMONICS - Practice of Internal Auditing
// ==========================================
export const CIA2_MNEMONICS: CIAMnemonicFlashcard[] = [
  {
    id: 'cia2-mnem-001',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Engagement Planning',
    subtopic: 'Objectives',
    front: 'Engagement objectives types',
    mnemonic: 'ACE',
    back: 'A - Assurance objectives\n- Evaluate controls\n- Assess risks\n- Verify compliance\n\nC - Consulting objectives\n- Provide advice\n- Facilitate improvements\n- Training/education\n\nE - Efficiency objectives\n- Resource optimization\n- Process improvement\n- Value-added outcomes',
    difficulty: 'easy',
    tags: ['engagement', 'objectives'],
  },
  {
    id: 'cia2-mnem-002',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Work Programs',
    subtopic: 'Steps',
    front: 'Engagement work program elements',
    mnemonic: 'SPORT',
    back: 'Scope of engagement\nProcedures to achieve objectives\nObjectives for each area\nResources required\nTiming and milestones\n\nWork programs should be approved before execution and modified as needed.',
    difficulty: 'medium',
    tags: ['work program', 'planning'],
  },
  {
    id: 'cia2-mnem-003',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Evidence',
    subtopic: 'Sufficiency',
    front: 'Evidence quality attributes',
    mnemonic: 'CARS',
    back: 'Competent (reliable, valid, objective)\nAppropriate (relevant to objectives)\nRelevant (logical connection to findings)\nSufficient (quantity for conclusions)\n\nBest evidence = Independent, objective, timely',
    difficulty: 'medium',
    tags: ['evidence', 'quality'],
  },
  {
    id: 'cia2-mnem-004',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Findings',
    subtopic: 'Elements',
    front: 'Five elements of an audit finding',
    mnemonic: 'CCEER',
    back: 'Criteria (what should be)\nCondition (what is - actual situation)\nEffect (impact, risk, or exposure)\nEvidence (support for condition)\nRecommendation (corrective action)\n\nSome models use: Criteria, Condition, Cause, Effect, Recommendation',
    difficulty: 'medium',
    tags: ['findings', 'observations'],
  },
  {
    id: 'cia2-mnem-005',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Communication',
    subtopic: 'Report Quality',
    front: 'Qualities of effective audit communications',
    mnemonic: 'ACCCT',
    back: 'Accurate (factually correct)\nClear (easily understood)\nConcise (to the point)\nConstructive (helpful, improvement-focused)\nTimely (delivered when relevant)\n\nAlso: Complete, Objective',
    difficulty: 'easy',
    tags: ['communication', 'reporting'],
  },
  {
    id: 'cia2-mnem-006',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Risk Assessment',
    subtopic: 'Annual Planning',
    front: 'Risk-based audit planning factors',
    mnemonic: 'IMPACT-LIKELY',
    back: 'IMPACT factors:\n- Financial significance\n- Operational criticality\n- Regulatory requirements\n- Stakeholder concerns\n\nLIKELIHOOD factors:\n- Control environment\n- Recent changes\n- Prior audit results\n- Management requests\n- Time since last audit',
    difficulty: 'medium',
    tags: ['risk assessment', 'audit planning'],
  },
  {
    id: 'cia2-mnem-007',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Sampling',
    subtopic: 'Methods',
    front: 'Sampling approaches in auditing',
    mnemonic: 'SJ-STATS',
    back: 'SJ = Judgmental (Non-statistical):\n- Auditor discretion\n- Cannot project results\n- Haphazard or purposive selection\n\nSTATS = Statistical:\n- Random selection\n- Mathematically measurable\n- Attribute (rate of occurrence)\n- Variables (dollar amounts)\n- Stratified, systematic methods',
    difficulty: 'hard',
    tags: ['sampling', 'methodology'],
  },
  {
    id: 'cia2-mnem-008',
    section: 'CIA2',
    type: 'mnemonic',
    topic: 'Documentation',
    subtopic: 'Workpapers',
    front: 'Workpaper documentation standards',
    mnemonic: 'CROST',
    back: 'Complete (standalone understandable)\nRelevant (supports conclusions)\nOrganized (logical structure)\nStandardized (consistent format)\nTimely (prepared during engagement)\n\nRetention: Per organizational policy and legal requirements',
    difficulty: 'easy',
    tags: ['documentation', 'workpapers'],
  },
];

// ==========================================
// CIA PART 3 MNEMONICS - Business Knowledge for IA
// ==========================================
export const CIA3_MNEMONICS: CIAMnemonicFlashcard[] = [
  {
    id: 'cia3-mnem-001',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'IT Governance',
    subtopic: 'COBIT',
    front: 'COBIT 2019 Governance System Principles',
    mnemonic: 'PROVIDE VALUE',
    back: 'Provide stakeholder value\nHolistic approach\nDynamic governance system\nGovernance distinct from management\nTailored to enterprise needs\nEnd-to-end governance system\n\n6 principles for a governance framework\n40 governance and management objectives',
    difficulty: 'hard',
    tags: ['COBIT', 'IT governance'],
  },
  {
    id: 'cia3-mnem-002',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'Financial Management',
    subtopic: 'Ratios',
    front: 'Key financial ratio categories',
    mnemonic: 'LAPSE',
    back: 'Liquidity (current, quick ratio)\nActivity/Asset (turnover ratios)\nProfitability (margins, ROE, ROA)\nSolvency/Leverage (debt ratios)\nEfficiency (operating metrics)\n\nEach category reveals different aspects of financial health',
    difficulty: 'medium',
    tags: ['financial ratios', 'analysis'],
  },
  {
    id: 'cia3-mnem-003',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'IT Security',
    subtopic: 'CIA Triad',
    front: 'Information Security CIA Triad',
    mnemonic: 'CIA (not the exam!)',
    back: 'Confidentiality\n- Information accessed only by authorized\n- Encryption, access controls\n\nIntegrity\n- Accuracy and completeness\n- Checksums, audit trails\n\nAvailability\n- Accessible when needed\n- Redundancy, BCP/DRP\n\nFoundation of information security',
    difficulty: 'easy',
    tags: ['security', 'CIA triad'],
  },
  {
    id: 'cia3-mnem-004',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'Business Continuity',
    subtopic: 'Recovery Metrics',
    front: 'BCP/DRP key metrics',
    mnemonic: 'RTO-RPO-MTPD',
    back: 'RTO (Recovery Time Objective):\n- Maximum acceptable downtime\n- "How fast must we recover?"\n\nRPO (Recovery Point Objective):\n- Maximum acceptable data loss\n- "How much data can we lose?"\n\nMTPD (Maximum Tolerable Period of Disruption):\n- Absolute maximum downtime before permanent harm',
    difficulty: 'medium',
    tags: ['BCP', 'DRP', 'recovery'],
  },
  {
    id: 'cia3-mnem-005',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'Change Management',
    subtopic: 'ADKAR',
    front: 'ADKAR Change Management Model',
    mnemonic: 'ADKAR',
    back: 'Awareness (of need for change)\nDesire (to support change)\nKnowledge (how to change)\nAbility (to implement change)\nReinforcement (to sustain change)\n\nIndividual-focused change model\nProsci methodology',
    difficulty: 'medium',
    tags: ['change management', 'ADKAR'],
  },
  {
    id: 'cia3-mnem-006',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'Strategy',
    subtopic: 'Porter\'s Five Forces',
    front: 'Porter\'s Five Forces Analysis',
    mnemonic: 'TRIBE',
    back: 'Threat of new entrants\nRivalry among existing competitors\nInterloper products (substitutes)\nBargaining power of buyers\nEntrant barriers / Supplier power\n\nAnalyzes industry attractiveness and competitive dynamics',
    difficulty: 'medium',
    tags: ['strategy', 'Porter'],
  },
  {
    id: 'cia3-mnem-007',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'Operations',
    subtopic: 'Six Sigma',
    front: 'Six Sigma DMAIC phases',
    mnemonic: 'DMAIC',
    back: 'Define (problem, goals, scope)\nMeasure (current performance)\nAnalyze (root causes)\nImprove (implement solutions)\nControl (sustain improvements)\n\nData-driven quality improvement\n3.4 defects per million target',
    difficulty: 'easy',
    tags: ['six sigma', 'quality'],
  },
  {
    id: 'cia3-mnem-008',
    section: 'CIA3',
    type: 'mnemonic',
    topic: 'IT Applications',
    subtopic: 'SDLC',
    front: 'SDLC phases for audit',
    mnemonic: 'RADIUM',
    back: 'Requirements gathering\nAnalysis and design\nDevelopment/coding\nImplementation/testing\nUser acceptance testing\nMaintenance/support\n\nAudit focus: Controls at each phase\nAgile: Iterative approach to same phases',
    difficulty: 'medium',
    tags: ['SDLC', 'IT audit'],
  },
];

// ==========================================
// EXPORT ALL CIA MNEMONICS
// ==========================================
export const CIA_MNEMONICS: CIAMnemonicFlashcard[] = [
  ...CIA1_MNEMONICS,
  ...CIA2_MNEMONICS,
  ...CIA3_MNEMONICS,
];

export default CIA_MNEMONICS;
