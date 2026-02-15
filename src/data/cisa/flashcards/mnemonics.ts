/**
 * CISA Mnemonic Flashcards
 * Memory aids for all five CISA domains
 * Information Systems Audit and Control
 */

// Extended flashcard type for mnemonics
export interface MnemonicFlashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  tags: string[];
  domain: 'CISA1' | 'CISA2' | 'CISA3' | 'CISA4' | 'CISA5';
  mnemonic?: string;
}

// ==========================================
// DOMAIN 1 MNEMONICS - IS Audit Process
// ==========================================
export const CISA1_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'cisa1-mn-001',
    domain: 'CISA1',
    topic: 'mnemonic',
    mnemonic: 'PRISM',
    front: 'IS Audit Planning Steps',
    back: 'P - Preliminary assessment (understand environment)\nR - Risk assessment (identify high-risk areas)\nI - Internal control evaluation\nS - Scope definition\nM - Methodology selection\n\nDocumented in audit charter and engagement letter',
    difficulty: 'medium',
    tags: ['audit planning', 'process', 'mnemonic']
  },
  {
    id: 'cisa1-mn-002',
    domain: 'CISA1',
    topic: 'mnemonic',
    mnemonic: 'CISER',
    front: 'IS Audit Standards - General Standards',
    back: 'C - Charter (formal authority)\nI - Independence (organizational, professional)\nS - Scope (based on risk assessment)\nE - Ethics & Compliance\nR - Reasonable assurance (not absolute)\n\nITAF (IT Assurance Framework) provides guidance',
    difficulty: 'medium',
    tags: ['standards', 'ITAF', 'mnemonic']
  },
  {
    id: 'cisa1-mn-003',
    domain: 'CISA1',
    topic: 'mnemonic',
    mnemonic: 'RICE',
    front: 'Audit Evidence Attributes',
    back: 'R - Relevant (relates to objectives)\nI - Independent (from auditee)\nC - Competent (reliable, valid)\nE - Evidential (sufficient to support conclusions)\n\nBest evidence = Objective, independent, external',
    difficulty: 'medium',
    tags: ['evidence', 'quality', 'mnemonic']
  },
  {
    id: 'cisa1-mn-004',
    domain: 'CISA1',
    topic: 'mnemonic',
    mnemonic: 'SUBSTANTIVE',
    front: 'Types of Audit Tests',
    back: 'Compliance tests:\n- Test if controls are operating\n- Answer: "Is the control working?"\n\nSubstantive tests:\n- Test actual data/transactions\n- Answer: "Is the data accurate?"\n\nStart with compliance; if controls weak, do more substantive',
    difficulty: 'medium',
    tags: ['testing', 'methodology', 'mnemonic']
  },
  {
    id: 'cisa1-mn-005',
    domain: 'CISA1',
    topic: 'mnemonic',
    mnemonic: 'SAMPLING',
    front: 'Statistical vs Judgmental Sampling',
    back: 'STATISTICAL:\n- Random selection\n- Quantifiable confidence level\n- Projectable results\n- More objective\n\nJUDGMENTAL:\n- Auditor discretion\n- Cannot project results\n- Used for targeted testing\n- Risk of selection bias\n\nSample size = Based on confidence, precision, population size',
    difficulty: 'medium',
    tags: ['sampling', 'methodology', 'mnemonic']
  },
];

// ==========================================
// DOMAIN 2 MNEMONICS - Governance & Management
// ==========================================
export const CISA2_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'cisa2-mn-001',
    domain: 'CISA2',
    topic: 'mnemonic',
    mnemonic: 'COBIT EDM-APO-BAI-DSS-MEA',
    front: 'COBIT 2019 Domains',
    back: 'EDM - Evaluate, Direct, Monitor (Governance)\n\nManagement objectives:\nAPO - Align, Plan, Organize\nBAI - Build, Acquire, Implement\nDSS - Deliver, Service, Support\nMEA - Monitor, Evaluate, Assess\n\n40 governance and management objectives total',
    difficulty: 'medium',
    tags: ['COBIT', 'governance', 'mnemonic']
  },
  {
    id: 'cisa2-mn-002',
    domain: 'CISA2',
    topic: 'mnemonic',
    mnemonic: 'G-D-M',
    front: 'COBIT 2019 Governance vs Management',
    back: 'GOVERNANCE (Board/Executive):\n- Sets direction and priorities\n- Ensures stakeholder needs met\n- Evaluates, directs, monitors\n\nMANAGEMENT (Executive/Operational):\n- Plans and executes\n- Aligns with direction\n- Builds, delivers, supports\n\nDistinct but connected activities',
    difficulty: 'medium',
    tags: ['COBIT', 'governance', 'management', 'mnemonic']
  },
  {
    id: 'cisa2-mn-003',
    domain: 'CISA2',
    topic: 'mnemonic',
    mnemonic: 'IT-SC',
    front: 'IT Steering Committee Responsibilities',
    back: 'I - IT strategy alignment with business\nT - Technology investments review\n\nS - Strategic planning and prioritization\nC - Cross-functional coordination\n\nReports to: Board/Executive\nMembers: Business + IT leadership\nFrequency: Usually quarterly',
    difficulty: 'medium',
    tags: ['governance', 'steering committee', 'mnemonic']
  },
  {
    id: 'cisa2-mn-004',
    domain: 'CISA2',
    topic: 'mnemonic',
    mnemonic: 'SLA-OLA-UC',
    front: 'Service Level Agreement Hierarchy',
    back: 'SLA (Service Level Agreement):\n- Between IT and business/customer\n- External-facing commitments\n\nOLA (Operational Level Agreement):\n- Between IT groups internally\n- Supports SLA delivery\n\nUC (Underpinning Contracts):\n- With external vendors\n- Supports OLA/SLA\n\nSLA > OLA > UC hierarchy',
    difficulty: 'medium',
    tags: ['SLA', 'service management', 'mnemonic']
  },
  {
    id: 'cisa2-mn-005',
    domain: 'CISA2',
    topic: 'mnemonic',
    mnemonic: 'RACI',
    front: 'RACI Matrix for Responsibility Assignment',
    back: 'R - Responsible (does the work)\nA - Accountable (ultimately answerable - only ONE)\nC - Consulted (provides input - two-way)\nI - Informed (kept updated - one-way)\n\nRules:\n- One A per task\n- Multiple R, C, I allowed\n- Avoid gaps and overlaps',
    difficulty: 'medium',
    tags: ['RACI', 'governance', 'mnemonic']
  },
];

// ==========================================
// DOMAIN 3 MNEMONICS - IS Acquisition & Development
// ==========================================
export const CISA3_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'cisa3-mn-001',
    domain: 'CISA3',
    topic: 'mnemonic',
    mnemonic: 'RADIM',
    front: 'Traditional SDLC Phases',
    back: 'R - Requirements/Feasibility\nA - Analysis and Design\nD - Development/Coding\nI - Implementation/Testing\nM - Maintenance/Support\n\nWaterfall: Sequential, each phase completes before next\nAudit focus: Controls at each phase gate',
    difficulty: 'medium',
    tags: ['SDLC', 'development', 'mnemonic']
  },
  {
    id: 'cisa3-mn-002',
    domain: 'CISA3',
    topic: 'mnemonic',
    mnemonic: 'AGILE-SPRINT',
    front: 'Agile Development Key Concepts',
    back: 'Iterative development in SPRINTS (2-4 weeks)\n\nKey ceremonies:\n- Daily standup (15 min)\n- Sprint planning\n- Sprint review\n- Retrospective\n\nArtifacts:\n- Product backlog\n- Sprint backlog\n- Burndown chart\n\nAudit: Continuous testing, shorter cycles',
    difficulty: 'medium',
    tags: ['Agile', 'Scrum', 'mnemonic']
  },
  {
    id: 'cisa3-mn-003',
    domain: 'CISA3',
    topic: 'mnemonic',
    mnemonic: 'UT-ST-IT-UAT',
    front: 'Testing Phases Hierarchy',
    back: 'UT - Unit Testing (developer, individual modules)\nST - System Testing (integrated system)\nIT - Integration Testing (between systems)\nUAT - User Acceptance Testing (business users)\n\nOrder: UT → ST → IT → UAT → Production\nAlso: Regression testing after changes',
    difficulty: 'medium',
    tags: ['testing', 'SDLC', 'mnemonic']
  },
  {
    id: 'cisa3-mn-004',
    domain: 'CISA3',
    topic: 'mnemonic',
    mnemonic: 'SEP-D-T-P',
    front: 'Separation of Environments',
    back: 'D - Development (coding, no production data)\nT - Test/QA (testing with sanitized data)\nP - Production (live system, real data)\n\nSeparation controls:\n- Access controls between environments\n- Code promotion requires approval\n- No developer access to production\n- Independent testing team',
    difficulty: 'medium',
    tags: ['environments', 'controls', 'mnemonic']
  },
  {
    id: 'cisa3-mn-005',
    domain: 'CISA3',
    topic: 'mnemonic',
    mnemonic: 'CAB',
    front: 'Change Management - Change Advisory Board',
    back: 'CAB (Change Advisory Board) functions:\n\n- Reviews change requests\n- Assesses risk and impact\n- Approves/denies changes\n- Schedules implementation\n\nEmergency CAB (ECAB):\n- Smaller group\n- Rapid decisions\n- Post-implementation review required',
    difficulty: 'medium',
    tags: ['change management', 'CAB', 'mnemonic']
  },
];

// ==========================================
// DOMAIN 4 MNEMONICS - IS Operations & Resilience
// ==========================================
export const CISA4_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'cisa4-mn-001',
    domain: 'CISA4',
    topic: 'mnemonic',
    mnemonic: 'RTO-RPO-MTPD',
    front: 'Business Continuity Key Metrics',
    back: 'RTO (Recovery Time Objective):\n- Maximum acceptable downtime\n- "How fast must we recover?"\n\nRPO (Recovery Point Objective):\n- Maximum acceptable data loss\n- "How much data can we lose?"\n\nMTPD (Maximum Tolerable Period of Disruption):\n- Absolute maximum before permanent damage\n\nRTO ≤ MTPD always',
    difficulty: 'medium',
    tags: ['BCP', 'DRP', 'metrics', 'mnemonic']
  },
  {
    id: 'cisa4-mn-002',
    domain: 'CISA4',
    topic: 'mnemonic',
    mnemonic: 'HOT-WARM-COLD',
    front: 'Disaster Recovery Site Types',
    back: 'HOT Site:\n- Fully operational, minutes to hours\n- Most expensive\n- Mirror of production\n\nWARM Site:\n- Partial equipment, hours to days\n- Balance of cost/recovery\n\nCOLD Site:\n- Shell only, days to weeks\n- Least expensive\n- Bring your own equipment\n\nMobile sites also an option',
    difficulty: 'medium',
    tags: ['DRP', 'recovery sites', 'mnemonic']
  },
  {
    id: 'cisa4-mn-003',
    domain: 'CISA4',
    topic: 'mnemonic',
    mnemonic: 'FULL-DIFF-INCR',
    front: 'Backup Types Comparison',
    back: 'FULL: All data, longest backup, fastest restore\n\nDIFFERENTIAL: Changes since LAST FULL\n- Longer backup each day\n- Need: Full + latest differential\n\nINCREMENTAL: Changes since LAST BACKUP\n- Shortest backup\n- Need: Full + all incrementals\n\nGrandfather-Father-Son rotation scheme',
    difficulty: 'medium',
    tags: ['backup', 'recovery', 'mnemonic']
  },
  {
    id: 'cisa4-mn-004',
    domain: 'CISA4',
    topic: 'mnemonic',
    mnemonic: 'ITIL-SERVICE',
    front: 'ITIL Service Management Processes',
    back: 'Key ITIL processes:\n\nIncident Management: Restore service ASAP\nProblem Management: Find root cause\nChange Management: Control changes\nConfiguration Management: Track assets (CMDB)\nRelease Management: Deploy safely\n\nService Desk: Single point of contact',
    difficulty: 'medium',
    tags: ['ITIL', 'service management', 'mnemonic']
  },
  {
    id: 'cisa4-mn-005',
    domain: 'CISA4',
    topic: 'mnemonic',
    mnemonic: 'IRP',
    front: 'Incident Response Phases',
    back: 'Incident Response Plan phases:\n\n1. Preparation (before incident)\n2. Identification (detect and confirm)\n3. Containment (limit damage)\n4. Eradication (remove threat)\n5. Recovery (restore operations)\n6. Lessons Learned (post-mortem)\n\nDocument throughout all phases',
    difficulty: 'medium',
    tags: ['incident response', 'security', 'mnemonic']
  },
];

// ==========================================
// DOMAIN 5 MNEMONICS - Protection of Information Assets
// ==========================================
export const CISA5_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'cisa5-mn-001',
    domain: 'CISA5',
    topic: 'mnemonic',
    mnemonic: 'CIA-AAA',
    front: 'Security Principles - CIA and AAA',
    back: 'CIA Triad:\nC - Confidentiality (authorized access only)\nI - Integrity (accurate, complete)\nA - Availability (accessible when needed)\n\nAAA Model:\nA - Authentication (verify identity)\nA - Authorization (permissions)\nA - Accounting (audit trail)\n\nFoundation of information security',
    difficulty: 'medium',
    tags: ['security', 'CIA', 'AAA', 'mnemonic']
  },
  {
    id: 'cisa5-mn-002',
    domain: 'CISA5',
    topic: 'mnemonic',
    mnemonic: 'SYM-ASYM',
    front: 'Symmetric vs Asymmetric Encryption',
    back: 'SYMMETRIC (Single key):\n- Same key encrypts/decrypts\n- Fast, used for data\n- AES, DES, 3DES\n- Key distribution challenge\n\nASYMMETRIC (Key pair):\n- Public/private key pair\n- Slower, used for key exchange\n- RSA, ECC\n- Solves key distribution\n\nHybrid: Use asymmetric for key exchange, symmetric for data',
    difficulty: 'medium',
    tags: ['encryption', 'cryptography', 'mnemonic']
  },
  {
    id: 'cisa5-mn-003',
    domain: 'CISA5',
    topic: 'mnemonic',
    mnemonic: 'HASH = OWF',
    front: 'Hashing - One-Way Function',
    back: 'Hash = One-Way Function (OWF)\n\nProperties:\n- Fixed output length\n- Cannot reverse to original\n- Small change = completely different hash\n- No collisions (ideally)\n\nAlgorithms:\n- SHA-256, SHA-3 (secure)\n- MD5, SHA-1 (deprecated)\n\nUses: Integrity, passwords, digital signatures',
    difficulty: 'medium',
    tags: ['hashing', 'cryptography', 'mnemonic']
  },
  {
    id: 'cisa5-mn-004',
    domain: 'CISA5',
    topic: 'mnemonic',
    mnemonic: 'DMZ',
    front: 'Network Security - DMZ Architecture',
    back: 'DMZ (Demilitarized Zone):\n\n- Buffer between external and internal\n- Hosts public-facing services\n- Two firewalls (ideal): External + Internal\n\nAllowed traffic:\nExternal → DMZ: Limited services\nDMZ → Internal: Minimal, controlled\nInternal → DMZ: As needed\nExternal → Internal: NEVER direct',
    difficulty: 'medium',
    tags: ['network', 'DMZ', 'firewall', 'mnemonic']
  },
  {
    id: 'cisa5-mn-005',
    domain: 'CISA5',
    topic: 'mnemonic',
    mnemonic: 'GDPR-7',
    front: 'GDPR Key Principles',
    back: 'Seven GDPR principles:\n\n1. Lawfulness, fairness, transparency\n2. Purpose limitation\n3. Data minimization\n4. Accuracy\n5. Storage limitation\n6. Integrity and confidentiality\n7. Accountability\n\nRights: Access, erasure, portability\nPenalties: Up to €20M or 4% global revenue',
    difficulty: 'medium',
    tags: ['GDPR', 'privacy', 'compliance', 'mnemonic']
  },
  {
    id: 'cisa5-mn-006',
    domain: 'CISA5',
    topic: 'mnemonic',
    mnemonic: 'MFA-SWK',
    front: 'Multi-Factor Authentication Factors',
    back: 'Three authentication factor types:\n\nSomething you KNOW:\n- Password, PIN, security questions\n\nSomething you HAVE:\n- Token, smart card, phone\n\nSomething you ARE:\n- Fingerprint, face, retina\n\nMFA = Two or more different factor TYPES\n(Two passwords ≠ MFA)',
    difficulty: 'medium',
    tags: ['authentication', 'MFA', 'access control', 'mnemonic']
  },
];

// ==========================================
// EXPORT ALL CISA MNEMONICS
// ==========================================
export const CISA_MNEMONICS: MnemonicFlashcard[] = [
  ...CISA1_MNEMONICS,
  ...CISA2_MNEMONICS,
  ...CISA3_MNEMONICS,
  ...CISA4_MNEMONICS,
  ...CISA5_MNEMONICS,
];

export default CISA_MNEMONICS;
