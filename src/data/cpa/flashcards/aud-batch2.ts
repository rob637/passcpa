/**
 * CPA Flashcards - Batch 2 (AUD Section)
 * Additional flashcards for Auditing and Attestation
 * 
 * Covers: Audit evidence, internal control, sampling, reporting, ethics
 */

import { Flashcard } from './types';

export const AUD_BATCH2_FLASHCARDS: Flashcard[] = [
  // ==========================================
  // AUDIT EVIDENCE
  // ==========================================
  {
    id: 'aud-b2-001',
    section: 'AUD',
    type: 'definition',
    topic: 'Audit Evidence',
    blueprintArea: 'AUD-IV',
    front: 'What are the characteristics of SUFFICIENT and APPROPRIATE audit evidence?',
    back: `**SUFFICIENCY:** Quantity of evidence (affected by risk assessment and quality of evidence)

**APPROPRIATENESS:** Quality of evidence:
- **Relevance:** Relates to the assertion being tested
- **Reliability:** Determined by source and nature (external > internal, documentary > oral)`,
    mnemonic: 'SAR: Sufficient=Amount, Appropriate=Relevance & Reliability',
    difficulty: 'medium',
    tags: ['audit evidence', 'sufficiency', 'appropriateness'],
    reference: 'AU-C 500',
  },
  {
    id: 'aud-b2-002',
    section: 'AUD',
    type: 'rule',
    topic: 'Audit Evidence',
    blueprintArea: 'AUD-IV',
    front: 'What is the HIERARCHY of audit evidence reliability?',
    back: `**Most to Least Reliable:**
1. External confirmation (direct from 3rd party)
2. Documentation from external sources
3. Documentation internally generated with strong controls
4. Documentation internally generated with weak controls
5. Oral representations from management

**Key principle:** External > Internal; Auditor-obtained > Client-provided; Documentary > Verbal`,
    difficulty: 'medium',
    tags: ['audit evidence', 'reliability', 'hierarchy'],
    reference: 'AU-C 500.A31',
  },
  {
    id: 'aud-b2-003',
    section: 'AUD',
    type: 'definition',
    topic: 'Audit Evidence',
    blueprintArea: 'AUD-IV',
    front: 'What are SUBSTANTIVE PROCEDURES?',
    back: `Audit procedures designed to detect material misstatements at the assertion level:

**1. Substantive Analytical Procedures:**
Compare recorded amounts to auditor expectations

**2. Tests of Details:**
- Inspection of documents
- Confirmation
- Recalculation
- Reperformance
- Physical examination`,
    difficulty: 'easy',
    tags: ['substantive procedures', 'tests of details', 'analytics'],
    reference: 'AU-C 330',
  },
  {
    id: 'aud-b2-004',
    section: 'AUD',
    type: 'definition',
    topic: 'Audit Evidence',
    blueprintArea: 'AUD-IV',
    front: 'What are the MANAGEMENT ASSERTIONS for account balances?',
    back: `**ERC-OV** for Balances (at period end):

- **E**xistence: Assets/liabilities exist
- **R**ights & Obligations: Entity has rights to assets, obligations for liabilities
- **C**ompleteness: All items are recorded
- **V**aluation & Allocation: Amounts are appropriate
- **C**lassification: Items are in proper accounts (for presentation)`,
    mnemonic: 'PERCV or ERC-OV: Existence, Rights, Completeness, Valuation',
    difficulty: 'medium',
    tags: ['assertions', 'balance assertions', 'audit procedures'],
    reference: 'AU-C 315.A128',
  },
  {
    id: 'aud-b2-005',
    section: 'AUD',
    type: 'definition',
    topic: 'Audit Evidence',
    blueprintArea: 'AUD-IV',
    front: 'What are AUDIT ASSERTIONS for transactions?',
    back: `**COCA-TAC** for Transactions:

- **C**ompleteness: All transactions recorded
- **C**utoff: Recorded in correct period
- **A**ccuracy: Amounts correctly recorded
- **C**lassification: In proper accounts
- **O**ccurrence: Transactions actually occurred`,
    mnemonic: 'OCCAC: Occurrence, Completeness, Cutoff, Accuracy, Classification',
    difficulty: 'medium',
    tags: ['assertions', 'transaction assertions', 'audit procedures'],
    reference: 'AU-C 315.A128',
  },
  // ==========================================
  // INTERNAL CONTROL
  // ==========================================
  {
    id: 'aud-b2-006',
    section: 'AUD',
    type: 'definition',
    topic: 'Internal Control',
    blueprintArea: 'AUD-III',
    front: 'What are the 5 COSO Internal Control components?',
    back: `**CRIME:**

1. **C**ontrol Environment (tone at top, ethics, competence)
2. **R**isk Assessment (identify/analyze risks)
3. **I**nformation & Communication (relevant, timely info)
4. **M**onitoring Activities (ongoing/separate evaluations)
5. **E**xisting Control Activities (policies/procedures)`,
    mnemonic: 'CRIME or CE-RA-CA-IC-MA',
    difficulty: 'medium',
    tags: ['internal control', 'COSO', 'components'],
    reference: 'AU-C 315',
  },
  {
    id: 'aud-b2-007',
    section: 'AUD',
    type: 'rule',
    topic: 'Internal Control',
    blueprintArea: 'AUD-III',
    front: 'What constitutes a SIGNIFICANT DEFICIENCY vs. MATERIAL WEAKNESS?',
    back: `**Deficiency:** Control doesn't allow timely prevention/detection of misstatements

**Significant Deficiency:** Less severe than MW but merits attention by those charged with governance

**Material Weakness:** Reasonable possibility that a MATERIAL misstatement will not be prevented or detected on a timely basis

**Note:** All MWs are SDs, but not all SDs are MWs`,
    difficulty: 'hard',
    tags: ['internal control', 'deficiencies', 'material weakness'],
    reference: 'AU-C 265',
  },
  {
    id: 'aud-b2-008',
    section: 'AUD',
    type: 'rule',
    topic: 'Internal Control',
    blueprintArea: 'AUD-III',
    front: 'What are TESTS OF CONTROLS vs. SUBSTANTIVE tests?',
    back: `**Tests of Controls:**
- Test operating effectiveness of controls
- Required before relying on controls
- Examples: Inquiry, observation, inspection, reperformance
- Addresses RMM at assertion level

**Substantive Tests:**
- Detect material misstatements in account balances/transactions
- Always required for significant accounts
- Examples: Confirmation, recalculation, analytical procedures`,
    difficulty: 'medium',
    tags: ['tests of controls', 'substantive tests', 'audit procedures'],
    reference: 'AU-C 330',
  },
  {
    id: 'aud-b2-009',
    section: 'AUD',
    type: 'definition',
    topic: 'Internal Control',
    blueprintArea: 'AUD-III',
    front: 'What is SEGREGATION OF DUTIES and what functions should be separated?',
    back: `**Key Functions to Segregate:**

1. **Authorization:** Approving transactions
2. **Custody:** Physical access to assets
3. **Recordkeeping:** Maintaining records
4. **Reconciliation:** Comparing records

**No one person should:** Authorize AND record, OR have custody AND record

**Compensating controls** can mitigate when segregation isn't feasible`,
    mnemonic: 'ACRR: Authorization, Custody, Recording, Reconciliation',
    difficulty: 'medium',
    tags: ['segregation of duties', 'internal control', 'control activities'],
    reference: 'AU-C 315',
  },
  {
    id: 'aud-b2-010',
    section: 'AUD',
    type: 'rule',
    topic: 'Internal Control',
    blueprintArea: 'AUD-III',
    front: 'What is an INTEGRATED AUDIT (PCAOB)?',
    back: `Audit of both financial statements AND internal control over financial reporting (ICFR):

**Required for:** Accelerated & large accelerated filers (SEC)

**Report on:** 
- Effectiveness of ICFR as of year-end
- Any material weaknesses identified

**Relationship:** F/S opinion can be unmodified even with MW in ICFR, but ICFR opinion would be adverse`,
    difficulty: 'hard',
    tags: ['integrated audit', 'ICFR', 'PCAOB', 'SOX'],
    reference: 'AS 2201',
  },
  // ==========================================
  // AUDIT SAMPLING
  // ==========================================
  {
    id: 'aud-b2-011',
    section: 'AUD',
    type: 'definition',
    topic: 'Audit Sampling',
    blueprintArea: 'AUD-IV',
    front: 'What is SAMPLING RISK?',
    back: `Risk that auditor's conclusion based on a sample differs from conclusion if entire population were tested:

**Tests of Controls:**
- Risk of Assessing Control Risk Too Low (audit risk)
- Risk of Assessing Control Risk Too High (efficiency)

**Substantive Testing:**
- Risk of Incorrect Acceptance (audit risk)
- Risk of Incorrect Rejection (efficiency)`,
    mnemonic: 'ARIA: Accept/Reject, Internal control risk assessment',
    difficulty: 'hard',
    tags: ['sampling', 'sampling risk', 'audit risk'],
    reference: 'AU-C 530',
  },
  {
    id: 'aud-b2-012',
    section: 'AUD',
    type: 'comparison',
    topic: 'Audit Sampling',
    blueprintArea: 'AUD-IV',
    front: 'STATISTICAL vs. NON-STATISTICAL sampling?',
    back: `**Statistical Sampling:**
- Random selection
- Probability theory to evaluate results
- Quantifies sampling risk
- More defensible, objective

**Non-Statistical Sampling:**
- Auditor judgment for selection/evaluation
- Cannot quantify sampling risk
- May be more practical for small populations
- Equally valid if properly applied`,
    difficulty: 'medium',
    tags: ['sampling', 'statistical', 'non-statistical'],
    reference: 'AU-C 530',
  },
  {
    id: 'aud-b2-013',
    section: 'AUD',
    type: 'definition',
    topic: 'Audit Sampling',
    blueprintArea: 'AUD-IV',
    front: 'What are the main STATISTICAL SAMPLING methods for substantive testing?',
    back: `**1. Monetary Unit Sampling (MUS/PPS):**
- Dollar = sampling unit
- Self-weighting (larger items more likely selected)
- Best for overstatement testing

**2. Classical Variables Sampling:**
- Mean-per-unit, ratio, difference estimation
- Estimates total dollar amount
- Better for understatement or populations without errors`,
    difficulty: 'hard',
    tags: ['sampling', 'MUS', 'variables sampling'],
    reference: 'AU-C 530',
  },
  {
    id: 'aud-b2-014',
    section: 'AUD',
    type: 'formula',
    topic: 'Audit Sampling',
    blueprintArea: 'AUD-IV',
    front: 'What factors determine SAMPLE SIZE for tests of controls?',
    back: `**Increase Sample Size When:**
- Lower tolerable deviation rate
- Lower risk of assessing control risk too low
- Higher expected deviation rate
- Larger population (minor effect)

**Key relationships:**
- More reliance on control → larger sample
- Lower threshold for exceptions → larger sample`,
    formula: 'Sample Size ∝ Confidence ÷ (Tolerable Rate - Expected Rate)',
    difficulty: 'hard',
    tags: ['sampling', 'sample size', 'tests of controls'],
    reference: 'AU-C 530',
  },
  {
    id: 'aud-b2-015',
    section: 'AUD',
    type: 'rule',
    topic: 'Audit Sampling',
    blueprintArea: 'AUD-IV',
    front: 'What is TOLERABLE MISSTATEMENT?',
    back: `Maximum misstatement in a population that the auditor is willing to accept.

**Relationship to materiality:**
- Often set at 50-75% of overall materiality for individual accounts
- Allows for aggregation of misstatements across accounts

**Impact on sample size:**
- Lower tolerable misstatement → Larger sample needed
- Higher tolerable misstatement → Smaller sample acceptable`,
    difficulty: 'medium',
    tags: ['sampling', 'tolerable misstatement', 'materiality'],
    reference: 'AU-C 530',
  },
  // ==========================================
  // AUDIT REPORTS
  // ==========================================
  {
    id: 'aud-b2-016',
    section: 'AUD',
    type: 'rule',
    topic: 'Audit Reports',
    blueprintArea: 'AUD-IV',
    front: 'What are the KEY ELEMENTS of the standard unmodified audit report?',
    back: `**Required Elements:**
1. Title (including "Independent")
2. Addressee
3. Auditor's Opinion (first paragraph)
4. Basis for Opinion
5. Management's Responsibilities
6. Auditor's Responsibilities
7. Required supplementary information (if applicable)
8. Other information (if applicable)
9. Signature, City, Date`,
    difficulty: 'medium',
    tags: ['audit report', 'unmodified', 'elements'],
    reference: 'AU-C 700',
  },
  {
    id: 'aud-b2-017',
    section: 'AUD',
    type: 'comparison',
    topic: 'Audit Reports',
    blueprintArea: 'AUD-IV',
    front: 'MODIFIED opinions: Qualified, Adverse, Disclaimer?',
    back: `**Qualified ("Except for"):**
- Material but NOT pervasive misstatement OR
- Inability to obtain sufficient evidence (not pervasive)

**Adverse:**
- Material AND pervasive misstatement
- F/S are NOT fairly presented

**Disclaimer:**
- Cannot obtain sufficient evidence AND
- Possible effects are material AND pervasive
- Auditor does NOT express an opinion`,
    difficulty: 'hard',
    tags: ['audit report', 'modified opinion', 'qualified', 'adverse'],
    reference: 'AU-C 705',
  },
  {
    id: 'aud-b2-018',
    section: 'AUD',
    type: 'definition',
    topic: 'Audit Reports',
    blueprintArea: 'AUD-IV',
    front: 'What is an EMPHASIS-OF-MATTER paragraph?',
    back: `Paragraph referring to matter appropriately presented in F/S that is fundamental to users' understanding:

**Examples:**
- Going concern uncertainty
- Significant related-party transactions
- Unusually important subsequent events
- Accounting principle changes

**Placement:** After Opinion paragraph
**Does NOT modify opinion**`,
    difficulty: 'medium',
    tags: ['audit report', 'emphasis of matter', 'EOM'],
    reference: 'AU-C 706',
  },
  {
    id: 'aud-b2-019',
    section: 'AUD',
    type: 'rule',
    topic: 'Audit Reports',
    blueprintArea: 'AUD-IV',
    front: 'When is GOING CONCERN language required in the audit report?',
    back: `**Auditor's Responsibility:**
- Evaluate whether substantial doubt exists about entity's ability to continue as going concern for 1 year from F/S date

**If Substantial Doubt Exists AND Disclosed:**
- Unmodified opinion with EOM paragraph

**If Substantial Doubt Exists AND NOT Adequately Disclosed:**
- Qualified or adverse opinion

**If Management's Plans Mitigate:**
- May be no GC doubt; consider disclosure adequacy`,
    difficulty: 'hard',
    tags: ['going concern', 'audit report', 'substantial doubt'],
    reference: 'AU-C 570',
  },
  {
    id: 'aud-b2-020',
    section: 'AUD',
    type: 'rule',
    topic: 'Audit Reports',
    blueprintArea: 'AUD-IV',
    front: 'What are CRITICAL AUDIT MATTERS (CAMs)?',
    back: `**PCAOB requirement for public companies:**

CAMs are matters:
1. Communicated to audit committee
2. Related to material accounts/disclosures
3. Involved especially challenging, subjective, or complex auditor judgment

**Report includes:**
- Identification of CAM
- How the matter was addressed
- Reference to relevant F/S accounts

**Nonissuers:** Not required (but Key Audit Matters emerging)`,
    difficulty: 'hard',
    tags: ['CAM', 'PCAOB', 'audit report', 'public company'],
    reference: 'AS 3101',
  },
  // ==========================================
  // ETHICS & INDEPENDENCE
  // ==========================================
  {
    id: 'aud-b2-021',
    section: 'AUD',
    type: 'rule',
    topic: 'Independence',
    blueprintArea: 'AUD-I',
    front: 'What SERVICES impair independence for audit clients?',
    back: `**Prohibited Services (for attest clients):**
- Bookkeeping (unless client oversight)
- Financial information systems design
- Appraisal or valuation services
- Actuarial services
- Internal audit outsourcing
- Management functions
- Human resources
- Legal services (some exceptions)
- Expert services for legal proceedings
- Broker-dealer services

**Key:** Services that create management participation or self-review threat`,
    difficulty: 'hard',
    tags: ['independence', 'prohibited services', 'ethics'],
    reference: 'AICPA Code, PCAOB Rules',
  },
  {
    id: 'aud-b2-022',
    section: 'AUD',
    type: 'definition',
    topic: 'Independence',
    blueprintArea: 'AUD-I',
    front: 'What are the INDEPENDENCE threats?',
    back: `**7 Threats to Independence:**

1. **Self-Review:** Auditing own work
2. **Self-Interest:** Financial interest in client
3. **Advocacy:** Promoting client's position
4. **Familiarity:** Close relationship with client
5. **Undue Influence:** Threats from client
6. **Management Participation:** Acting as management
7. **Structural:** Firm structure affects independence

**Safeguards** must reduce threats to acceptable level`,
    mnemonic: 'SAAFUMS: Self-review, Advocacy, Familiarity, Undue influence, Management, Self-interest, Structural',
    difficulty: 'medium',
    tags: ['independence', 'threats', 'safeguards', 'ethics'],
    reference: 'AICPA Code ET 1.210',
  },
  {
    id: 'aud-b2-023',
    section: 'AUD',
    type: 'rule',
    topic: 'Independence',
    blueprintArea: 'AUD-I',
    front: 'What are COVERED MEMBERS for independence rules?',
    back: `**Covered Members Include:**
- Individual on attest engagement team
- Position to influence engagement
- Partner in office with significant involvement
- Partner or manager who provides 10+ hours non-attest services
- Firm (including network firms, in some cases)

**Their immediate family members also covered for direct financial interests**`,
    difficulty: 'hard',
    tags: ['independence', 'covered members', 'scope'],
    reference: 'AICPA Code ET 0.400',
  },
  {
    id: 'aud-b2-024',
    section: 'AUD',
    type: 'rule',
    topic: 'Ethics',
    blueprintArea: 'AUD-I',
    front: 'What are the AICPA Code of Professional Conduct PRINCIPLES?',
    back: `**Six Principles:**

1. **Responsibilities:** Professional and moral judgments
2. **Public Interest:** Honor public trust
3. **Integrity:** Honest and candid
4. **Objectivity:** Free from conflicts of interest
5. **Due Care:** Competence and diligence
6. **Scope and Nature of Services:** Independence compliance

These are aspirational; Rules are enforceable`,
    mnemonic: 'ROPIDS: Responsibilities, Objectivity, Public Interest, Integrity, Due Care, Scope',
    difficulty: 'medium',
    tags: ['ethics', 'AICPA code', 'principles'],
    reference: 'AICPA Code ET 0.300',
  },
  {
    id: 'aud-b2-025',
    section: 'AUD',
    type: 'rule',
    topic: 'Ethics',
    blueprintArea: 'AUD-I',
    front: 'What is CONFIDENTIALITY and when can it be breached?',
    back: `**General Rule:** Do not disclose confidential client information without consent

**Exceptions (permissible/required disclosure):**
1. Response to subpoena or summons
2. AICPA quality review
3. Disciplinary proceedings
4. Successor auditor inquiries (with client consent)
5. Compliance with technical standards
6. State statutes requiring disclosure

**Note:** Confidentiality continues even after relationship ends`,
    difficulty: 'medium',
    tags: ['ethics', 'confidentiality', 'disclosure'],
    reference: 'AICPA Code ET 1.700',
  },
];

export default AUD_BATCH2_FLASHCARDS;
