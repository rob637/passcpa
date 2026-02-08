/**
 * SEE3: Representation - Quick Reference Sheet
 * One-page summary of ethics, procedures, and penalties
 */

export const SEE3_QUICK_REFERENCE = {
  section: 'SEE3',
  title: 'Representation & Procedures Quick Reference',
  lastUpdated: '2024',

  // ============================================
  // Practice Rights
  // ============================================
  practiceRights: {
    title: 'Who Can Practice Before IRS',
    unlimited: [
      { title: 'Attorneys', requirement: 'Licensed by state bar' },
      { title: 'CPAs', requirement: 'Licensed by state board' },
      { title: 'Enrolled Agents', requirement: 'Pass SEE exam or 5 years IRS experience' },
    ],
    limited: [
      { title: 'Enrolled Retirement Plan Agents', scope: 'Retirement plan matters only' },
      { title: 'Enrolled Actuaries', scope: 'Actuarial matters only' },
      { title: 'AFSP Holders', scope: 'Returns they prepared only' },
      { title: 'Unenrolled Return Preparers', scope: 'Returns they prepared (exam/collection only)' },
    ],
    practiceDefinition: [
      'Preparing and filing documents',
      'Corresponding/communicating with IRS',
      'Representing at conferences/hearings',
      'Rendering written advice on federal tax matters',
    ],
  },

  // ============================================
  // Key Forms
  // ============================================
  keyForms: {
    title: 'Authorization & Representation Forms',
    forms: [
      {
        form: 'Form 2848',
        name: 'Power of Attorney',
        use: 'Full representation rights',
        allows: 'Receive info, represent, sign, bind client',
      },
      {
        form: 'Form 8821',
        name: 'Tax Information Authorization',
        use: 'Information access only',
        allows: 'Receive and inspect tax info (NO representation)',
      },
      {
        form: 'Form 8821-A',
        name: 'Taxpayer Disclosure Authorization',
        use: 'Tax Pro Account access',
        allows: 'Digital access to taxpayer records',
      },
      {
        form: 'Form 56',
        name: 'Fiduciary Notice',
        use: 'Estates, trusts, guardianships',
        allows: 'Fiduciary to act for taxpayer',
      },
    ],
    cafNumber: 'Centralized Authorization File number - assigned to representatives',
  },

  // ============================================
  // Circular 230 Duties
  // ============================================
  circular230: {
    title: 'Circular 230 Key Provisions',
    duties: [
      'Exercise due diligence in preparation',
      'Promptly submit requested records to IRS',
      'Cannot unreasonably delay IRS matters',
      'Return client records on request',
      'Not charge unconscionable fees',
      'Advise client of errors/omissions',
    ],
    prohibited: [
      'False or misleading statements',
      'Assistance with tax evasion',
      'Cashing IRS refund checks (unless authorized)',
      'Improper solicitation (in-person for profit)',
      'Frivolous positions',
      'Incompetent representation',
      'Willful violation of regulations',
    ],
    writtenAdvice: [
      'Must not base on unreasonable factual assumptions',
      'Must not unreasonably rely on client representations',
      'Must consider all relevant facts',
    ],
    sanctions: [
      'Private reprimand',
      'Public censure',
      'Suspension',
      'Disbarment',
      'Monetary penalty',
    ],
    opr: 'Office of Professional Responsibility - handles disciplinary matters',
  },

  // ============================================
  // Examination Process
  // ============================================
  examination: {
    title: 'IRS Examination Types',
    types: [
      { type: 'Correspondence', description: 'By mail only, simple issues' },
      { type: 'Office', description: 'Taxpayer visits IRS office' },
      { type: 'Field', description: 'Agent visits taxpayer location, comprehensive' },
    ],
    selectionMethods: [
      'DIF (Discriminant Function) score',
      'Related return examination',
      'Information matching',
      'Random selection',
      'Whistleblower referral',
    ],
    taxpayerRights: [
      'Right to representation',
      'Right to recording of interview',
      'Right to know why information requested',
      'Right to appeal',
      'Right to confidentiality',
    ],
  },

  // ============================================
  // Statutes of Limitations
  // ============================================
  statutes: {
    title: 'Statutes of Limitations',
    assessment: [
      { period: '3 years', applies: 'Standard - from later of due date or filing' },
      { period: '6 years', applies: '>25% gross income omission; FBAR violations' },
      { period: 'Unlimited', applies: 'No return filed, fraud, false return' },
    ],
    collection: {
      period: '10 years from assessment (CSED)',
      extensions: 'Bankruptcy, OIC, collection appeals, absence from US',
    },
    refundClaim: {
      period: 'Later of 3 years from filing OR 2 years from payment',
      limitation: 'Refund limited to payments within look-back period',
    },
    extension: {
      form872: 'Fixed date extension',
      form872A: 'Open-ended (until terminated)',
      form872T: 'Terminates Form 872-A',
    },
  },

  // ============================================
  // Collection Process
  // ============================================
  collection: {
    title: 'Collection Notice Sequence',
    notices: [
      { notice: 'CP14', description: 'Initial balance due notice' },
      { notice: 'CP501', description: 'First reminder' },
      { notice: 'CP503', description: 'Urgent reminder' },
      { notice: 'CP504', description: 'Intent to levy (state refund)' },
      { notice: 'LT11/1058', description: 'Final Notice - CDP rights' },
    ],
    cdpHearing: {
      request: 'Form 12153 - within 30 days of final notice',
      canRaise: [
        'Spousal defenses',
        'Collection alternatives (IA, OIC, CNC)',
        'Appropriateness of action',
        'Underlying liability (if no prior opportunity)',
      ],
      equivalent: 'After 30 days = Equivalent Hearing (no Tax Court review)',
    },
    collectionAlternatives: [
      {
        option: 'Installment Agreement',
        guaranteed: '≤$10,000, 36 months, all returns filed',
        streamlined: '≤$50,000, 72 months (individuals)',
        form: 'Form 9465',
      },
      {
        option: 'Offer in Compromise',
        grounds: 'Doubt as to Liability, Collectibility, or ETA',
        form: 'Form 656 + Form 433-A/B',
        fee: '$205 (waiver for low income)',
      },
      {
        option: 'Currently Not Collectible',
        criteria: 'Cannot pay and meet necessary expenses',
        effect: 'Suspends collection, CSED continues',
      },
    ],
  },

  // ============================================
  // Penalties
  // ============================================
  penalties: {
    title: 'Key Penalties',
    filingPenalties: [
      { penalty: 'Failure to File', rate: '5% per month, max 25%', minimum: 'Min $485 or 100% of tax if >60 days late' },
      { penalty: 'Failure to Pay', rate: '0.5% per month, max 25%', notes: '0.25% if IA in place, 1% after levy notice' },
      { penalty: 'Combined max', rate: '47.5%', notes: 'FTF reduced by FTP when both apply' },
    ],
    accuracyPenalties: [
      { penalty: 'Negligence', rate: '20%', applies: 'Careless, reckless, or intentional disregard' },
      { penalty: 'Substantial Understatement', rate: '20%', threshold: 'Greater of $5,000 or 10% of correct tax' },
      { penalty: 'Gross Valuation Misstatement', rate: '40%', threshold: '200%+ overstatement' },
      { penalty: 'Civil Fraud', rate: '75%', burden: 'IRS must prove clear and convincing' },
    ],
    preparerPenalties: [
      { penalty: 'Unreasonable Position (§6694(a))', amount: 'Greater of $1,000 or 50% of income' },
      { penalty: 'Willful/Reckless (§6694(b))', amount: 'Greater of $5,000 or 75% of income' },
      { penalty: 'Failure to sign', amount: '$60 per return' },
      { penalty: 'Failure to furnish copy', amount: '$60 per return' },
      { penalty: 'EITC Due Diligence (§6695(g))', amount: '$635 per return (2024)' },
    ],
    abatement: {
      reasonableCause: [
        'Death or serious illness',
        'Fire, casualty, disaster',
        'Unable to obtain records',
        'Reliance on professional advice (documented)',
        'First-time penalty abatement (FTA) - clean 3-year history',
      ],
      form: 'Form 843 or written request',
    },
  },

  // ============================================
  // Appeals & Litigation
  // ============================================
  appeals: {
    title: 'Appeals Process',
    irsAppeals: {
      purpose: 'Resolve disputes without litigation',
      request: 'Form 12203 (≤$25K) or Written Protest (>$25K)',
      basis: 'Hazards of litigation',
    },
    courtOptions: [
      { court: 'U.S. Tax Court', prepay: 'No', deadline: '90 days from deficiency notice', jury: 'No' },
      { court: 'U.S. District Court', prepay: 'Yes', deadline: 'After denial of refund claim', jury: 'Yes' },
      { court: 'Court of Federal Claims', prepay: 'Yes', deadline: 'After denial of refund claim', jury: 'No' },
    ],
    taxCourtSmallCase: '≤$50,000 - simplified procedures, decision final (no appeal)',
  },

  // ============================================
  // Key Mnemonics
  // ============================================
  mnemonics: {
    title: 'Memory Aids',
    items: [
      { topic: 'Who Can Practice', mnemonic: 'ACE', meaning: 'Attorneys, CPAs, Enrolled Agents (unlimited)' },
      { topic: 'Practitioner Duties', mnemonic: 'DIRECT', meaning: 'Due diligence, Information, Returns, Error disclosure, Conflicts, Timely response' },
      { topic: 'Assessment SOL', mnemonic: '3-6-Forever', meaning: '3yr standard, 6yr >25% omission, Forever fraud/no return' },
      { topic: 'CDP Issues', mnemonic: 'SCRAP', meaning: 'Spousal, Collection alternatives, Reason, Amount, Procedure' },
      { topic: 'OIC Grounds', mnemonic: 'LCD', meaning: 'Liability doubt, Collectibility doubt, Disruption (ETA)' },
      { topic: 'Penalty Rates', mnemonic: '5 > 0.5', meaning: 'FTF 5% > FTP 0.5% (File penalty bigger than Pay)' },
      { topic: 'Accuracy Penalties', mnemonic: '20-40-75', meaning: '20% accuracy, 40% gross valuation, 75% fraud' },
    ],
  },
};
