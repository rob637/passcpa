/**
 * CFP Flashcards - Estate Planning Batch 2
 * 60 additional flashcards for Estate domain
 */

import { Flashcard } from './index';

export const CFP_FLASHCARDS_EST_BATCH2: Flashcard[] = [
  {
    id: 'fc-est-011',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Estate Basics',
    front: 'What is the PROBATE ESTATE vs GROSS ESTATE?',
    back: 'PROBATE ESTATE:\n• Assets passing through will\n• Subject to probate process\n• Court supervised\n\nGROSS ESTATE (Federal):\n• All assets at death for estate tax\n• Includes non-probate assets\n• Life insurance, joint property, IRAs\n• Generally larger than probate\n\nPlanning goal: Minimize both',
    difficulty: 'medium',
    tags: ['probate', 'gross-estate', 'basics']
  },
  {
    id: 'fc-est-012',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Estate Basics',
    front: 'What are PROBATE AVOIDANCE techniques?',
    back: 'Probate Avoidance:\n\n• BENEFICIARY DESIGNATIONS: IRAs, life insurance\n• JOINT TENANCY: WROS passes automatically\n• POD/TOD ACCOUNTS: Payable/Transfer on Death\n• REVOCABLE LIVING TRUST: Assets titled in trust\n• COMMUNITY PROPERTY: Spouse succession\n• SMALL ESTATE PROCEDURES: Below threshold\n\nNote: Avoids probate, not estate tax',
    difficulty: 'medium',
    tags: ['probate', 'avoidance', 'techniques']
  },
  {
    id: 'fc-est-013',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Wills',
    front: 'What are the TYPES of wills?',
    back: 'Types of Wills:\n\n• SIMPLE: Basic distribution\n• TESTAMENTARY TRUST: Creates trust at death\n• POUR-OVER: "Pours" assets into living trust\n• HOLOGRAPHIC: Handwritten, no witnesses\n• NUNCUPATIVE: Oral (limited recognition)\n• MUTUAL/RECIPROCAL: Coordinated between spouses\n\nMost states require witnesses (usually 2)',
    difficulty: 'medium',
    tags: ['wills', 'types', 'testamentary']
  },
  {
    id: 'fc-est-014',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Wills',
    front: 'What are will CONTEST grounds?',
    back: 'Will Contest Grounds:\n\n• LACK OF CAPACITY: Didn\'t understand\n• UNDUE INFLUENCE: Coercion/manipulation\n• FRAUD: Deception about contents\n• IMPROPER EXECUTION: Missing formalities\n• FORGERY: Signature not authentic\n• REVOCATION: Later will exists\n\nNo-contest clauses can deter but may not prevent\nStanding required to contest',
    difficulty: 'hard',
    tags: ['will-contest', 'capacity', 'grounds']
  },
  {
    id: 'fc-est-015',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What are the PARTIES to a trust?',
    back: 'Trust Parties:\n\n• GRANTOR (Settlor/Trustor): Creates trust\n• TRUSTEE: Manages trust assets\n• BENEFICIARY: Receives benefits\n  - Income beneficiary\n  - Remainder beneficiary\n\nRoles can overlap:\n• Grantor can be trustee\n• Grantor can be beneficiary\n• Same person can hold multiple roles',
    difficulty: 'easy',
    tags: ['trust', 'parties', 'basics']
  },
  {
    id: 'fc-est-016',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'Compare REVOCABLE vs IRREVOCABLE trusts',
    back: 'REVOCABLE TRUST:\n• Grantor can modify/terminate\n• No gift tax on funding\n• No asset protection\n• Included in estate\n• Avoids probate\n\nIRREVOCABLE TRUST:\n• Cannot change without beneficiary consent\n• Gift on funding (if complete)\n• Asset protection possible\n• Removed from estate\n• More tax benefits',
    difficulty: 'medium',
    tags: ['revocable', 'irrevocable', 'comparison']
  },
  {
    id: 'fc-est-017',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a LIVING (Inter Vivos) trust?',
    back: 'Living Trust:\n• Created during grantor\'s lifetime\n• Usually revocable\n• Must be funded (assets transferred)\n\nBenefits:\n• Probate avoidance\n• Privacy\n• Incapacity management\n• Immediate effectiveness\n\nNot a Tax Planning Tool:\n• No estate tax savings\n• No income tax savings\n• Still in grantor\'s estate',
    difficulty: 'medium',
    tags: ['living-trust', 'inter-vivos', 'revocable']
  },
  {
    id: 'fc-est-018',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a TESTAMENTARY trust?',
    back: 'Testamentary Trust:\n• Created by will at death\n• Irrevocable once activated\n• Subject to probate first\n\nCommon Uses:\n• Minor children\n• Spendthrift protection\n• Marital trusts\n• Bypass/credit shelter\n\nAdvantage: Court supervision\nDisadvantage: No incapacity protection',
    difficulty: 'medium',
    tags: ['testamentary', 'trust', 'will']
  },
  {
    id: 'fc-est-019',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a CREDIT SHELTER (Bypass) trust?',
    back: 'Credit Shelter Trust (CST):\n• Captures deceased spouse\'s exemption\n• Irrevocable at first death\n• Survives outside survivor\'s estate\n\nBenefits:\n• Uses first spouse\'s exemption\n• Growth escapes estate tax\n• Protects from remarriage\n\nAlternative: Portability election\nCST better for growth assets',
    difficulty: 'hard',
    tags: ['credit-shelter', 'bypass', 'ab-trust']
  },
  {
    id: 'fc-est-020',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a QTIP trust?',
    back: 'QTIP (Qualified Terminable Interest Property):\n• Qualifies for marital deduction\n• Yet controls ultimate distribution\n\nRequirements:\n• Income to spouse for life\n• Income at least annually\n• No power to appoint to others\n• Executor makes QTIP election\n\nBenefits:\n• Second marriage planning\n• Control remainder beneficiaries\n• Defers estate tax',
    difficulty: 'hard',
    tags: ['qtip', 'marital', 'trust']
  },
  {
    id: 'fc-est-021',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a CHARITABLE REMAINDER TRUST (CRT)?',
    back: 'Charitable Remainder Trust:\n• Irrevocable trust\n• Income to donor/beneficiary, remainder to charity\n\nTypes:\n• CRAT: Fixed annuity (5-50%)\n• CRUT: Percentage of value annually\n\nBenefits:\n• Income tax deduction (PV of remainder)\n• No capital gains on appreciated asset\n• Income stream\n• Estate tax savings',
    difficulty: 'hard',
    tags: ['crt', 'charitable', 'remainder']
  },
  {
    id: 'fc-est-022',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a CHARITABLE LEAD TRUST (CLT)?',
    back: 'Charitable Lead Trust:\n• Opposite of CRT\n• Income to charity first, remainder to family\n\nTypes:\n• CLAT: Fixed annuity to charity\n• CLUT: Percentage of value to charity\n\nBenefits:\n• Reduces gift/estate tax on transfer\n• Assets grow for heirs\n• Charitable income stream\n\nBest when: Interest rates low, assets appreciate',
    difficulty: 'hard',
    tags: ['clt', 'charitable', 'lead']
  },
  {
    id: 'fc-est-023',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a SPENDTHRIFT trust?',
    back: 'Spendthrift Trust:\n• Restricts beneficiary access\n• Protects from beneficiary\'s creditors\n\nProvisions:\n• Cannot assign interest\n• Cannot be reached by creditors\n• Trustee controls distributions\n\nExceptions:\n• Child support\n• Alimony\n• IRS (federal tax liens)\n• Self-settled trust limitations',
    difficulty: 'medium',
    tags: ['spendthrift', 'creditor', 'protection']
  },
  {
    id: 'fc-est-024',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a SPECIAL NEEDS trust?',
    back: 'Special Needs Trust (SNT):\n• For disabled beneficiaries\n• Preserves government benefits\n• SSI, Medicaid eligibility\n\nTypes:\n• FIRST PARTY: Funded with beneficiary\'s assets\n  - Medicaid payback required\n• THIRD PARTY: Funded by others\n  - No payback required\n  - More flexible\n\nDistributions supplemental only',
    difficulty: 'hard',
    tags: ['special-needs', 'snt', 'disability']
  },
  {
    id: 'fc-est-025',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a GRANTOR RETAINED ANNUITY TRUST (GRAT)?',
    back: 'GRAT:\n• Grantor transfers assets\n• Receives annuity for term\n• Remainder to beneficiaries\n\nTax Benefits:\n• Gift = FMV - PV of annuity\n• Can be "zeroed out" (minimal gift)\n• Excess growth passes tax-free\n\nRisk:\n• Grantor must survive term\n• IRS 7520 rate affects value\n• No step-up in basis',
    difficulty: 'hard',
    tags: ['grat', 'annuity', 'grantor']
  },
  {
    id: 'fc-est-026',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trusts',
    front: 'What is a QUALIFIED PERSONAL RESIDENCE TRUST (QPRT)?',
    back: 'QPRT:\n• Transfer home to irrevocable trust\n• Retain right to live there for term\n• Home passes to beneficiaries at end\n\nBenefits:\n• Discounted gift value\n• Removes future appreciation\n• Can rent at FMV after term\n\nRisks:\n• Must survive term\n• Lose home if term expires\n• No step-up in basis',
    difficulty: 'hard',
    tags: ['qprt', 'residence', 'trust']
  },
  {
    id: 'fc-est-027',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Estate Tax',
    front: 'What is the ESTATE TAX exemption and rate?',
    back: 'Federal Estate Tax (2026):\n\n• EXEMPTION: $7.0 million per person (TCJA sunset)\n• MFJ: $14.0 million (with portability)\n• RATE: 40% flat on taxable estate\n\nNote: Pre-2026 gifts protected by anti-clawback rule\n\nTaxable Estate = Gross Estate - Deductions\n(Marital, charitable, expenses, debts)',
    difficulty: 'medium',
    tags: ['estate-tax', 'exemption', 'rate']
  },
  {
    id: 'fc-est-028',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Estate Tax',
    front: 'What is PORTABILITY?',
    back: 'Portability:\n• Transfer unused estate tax exemption to surviving spouse\n• DSUE: Deceased Spousal Unused Exclusion\n\nRequirements:\n• File estate tax return (706) at first death\n• Elect portability on return\n• Even if no tax due\n\nBenefits:\n• Simpler than bypass trust\n• Flexibility\n\nLimitations:\n• No growth protection\n• Only one spouse (not previous)',
    difficulty: 'hard',
    tags: ['portability', 'dsue', 'estate']
  },
  {
    id: 'fc-est-029',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Estate Tax',
    front: 'What are ESTATE TAX deductions?',
    back: 'Estate Tax Deductions:\n\n• MARITAL DEDUCTION: Unlimited to spouse\n• CHARITABLE DEDUCTION: Unlimited to charity\n• DEBTS & MORTGAGES: Outstanding at death\n• FUNERAL EXPENSES: Reasonable costs\n• ADMINISTRATION: Executor fees, legal, accounting\n• LOSSES: Casualty/theft during administration\n• STATE DEATH TAXES: Credit or deduction\n\nGross Estate - Deductions = Taxable Estate',
    difficulty: 'medium',
    tags: ['estate-tax', 'deductions', 'marital']
  },
  {
    id: 'fc-est-030',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Gift Tax',
    front: 'What is the GIFT TAX framework?',
    back: 'Gift Tax Framework:\n\nANNUAL EXCLUSION: $19,000/donee (2026)\nLIFETIME EXEMPTION: $7.0M (TCJA sunset, shared with estate)\nRATE: 40%\n\nStructure:\n• Gift over annual exclusion uses lifetime\n• Gift tax return if over annual (706)\n• Actually pay tax only if exceed lifetime\n\nGift tax paid by DONOR, not donee',
    difficulty: 'medium',
    tags: ['gift-tax', 'annual', 'lifetime']
  },
  {
    id: 'fc-est-031',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Gift Tax',
    front: 'What are GIFT TAX exclusions (not counted)?',
    back: 'Not Taxable Gifts:\n\n• ANNUAL EXCLUSION: $19,000/person (2026)\n• TUITION: Paid directly to institution\n• MEDICAL: Paid directly to provider\n• POLITICAL: Campaign contributions\n• SPOUSAL: Unlimited to US citizen spouse\n• CHARITABLE: To qualified organizations\n\nThese don\'t use annual or lifetime exemption',
    difficulty: 'medium',
    tags: ['gift-tax', 'exclusions', 'unlimited']
  },
  {
    id: 'fc-est-032',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Gift Tax',
    front: 'What is GIFT SPLITTING?',
    back: 'Gift Splitting:\n• Married couples split gifts\n• One spouse\'s gift treated as from both\n• Effectively doubles annual exclusion\n\n$19,000 × 2 = $38,000/donee\n\nRequirements:\n• Married at time of gift\n• Consent on gift tax return\n• Gift return required if splitting\n• Both spouses consent to all gifts',
    difficulty: 'medium',
    tags: ['gift-splitting', 'married', 'annual']
  },
  {
    id: 'fc-est-033',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Gift Tax',
    front: 'What makes a gift COMPLETE for tax purposes?',
    back: 'Complete Gift Requirements:\n• DELIVERY: Property transferred\n• DONATIVE INTENT: Meant as gift\n• DOMINION & CONTROL: Donor gives up control\n• ACCEPTANCE: Donee accepts\n\nIncomplete if:\n• Donor retains control\n• Revocable transfer\n• Power to change beneficiary\n\nIncomplete gift: No tax, still in estate',
    difficulty: 'hard',
    tags: ['complete-gift', 'requirements', 'control']
  },
  {
    id: 'fc-est-034',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Valuation',
    front: 'What DISCOUNTS apply to estate/gift valuations?',
    back: 'Valuation Discounts:\n\nLACK OF MARKETABILITY:\n• Not publicly traded\n• 15-35% typical\n\nLACK OF CONTROL (Minority):\n• Non-controlling interest\n• 15-40% typical\n\nCombined: 25-50% possible\n\nApply to:\n• FLP interests\n• Closely held business\n• Real estate partnerships\n\nIRS scrutinizes; need appraisal',
    difficulty: 'hard',
    tags: ['discounts', 'valuation', 'minority']
  },
  {
    id: 'fc-est-035',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Valuation',
    front: 'What is ALTERNATE VALUATION DATE?',
    back: 'Alternate Valuation Date:\n• Value estate 6 months after death\n• Instead of date of death\n\nRequirements:\n• Must reduce gross estate AND estate tax\n• Election is all or nothing\n• Cannot cherry-pick assets\n• Assets sold before = sale date value\n\nUse when: Market declines after death\nFile election on estate return',
    difficulty: 'hard',
    tags: ['alternate-valuation', 'date', 'estate']
  },
  {
    id: 'fc-est-036',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Powers of Attorney',
    front: 'What is a DURABLE POWER OF ATTORNEY?',
    back: 'Durable Power of Attorney:\n• Agent acts on principal\'s behalf\n• Survives incapacity (key difference)\n• Financial/legal matters\n\nTypes:\n• IMMEDIATE: Effective immediately\n• SPRINGING: Effective on incapacity\n\nPowers typical:\n• Banking\n• Real estate\n• Investments\n• Benefits\n\nTerminates at death',
    difficulty: 'medium',
    tags: ['dpoa', 'incapacity', 'agent']
  },
  {
    id: 'fc-est-037',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Powers of Attorney',
    front: 'What is a HEALTHCARE POWER OF ATTORNEY?',
    back: 'Healthcare Power of Attorney (Healthcare Proxy):\n• Agent makes medical decisions\n• When principal cannot\n\nDecisions include:\n• Treatment choices\n• Hospitalization\n• Surgery\n• Medications\n• End-of-life care\n\nOften combined with living will\nHIPAA authorization important',
    difficulty: 'medium',
    tags: ['healthcare', 'proxy', 'medical']
  },
  {
    id: 'fc-est-038',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Advance Directives',
    front: 'What is a LIVING WILL?',
    back: 'Living Will:\n• Expresses end-of-life wishes\n• When terminally ill/permanently unconscious\n\nAddresses:\n• Life support\n• Feeding tubes\n• Resuscitation\n• Pain management\n• Organ donation\n\nNot same as healthcare POA:\n• Living will = Instructions\n• Healthcare POA = Decision maker\n\nBest to have both',
    difficulty: 'medium',
    tags: ['living-will', 'directive', 'end-of-life']
  },
  {
    id: 'fc-est-039',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Advance Directives',
    front: 'What is a DNR order?',
    back: 'DNR (Do Not Resuscitate):\n• Medical order not to perform CPR\n• Must be signed by physician\n• Different from living will\n\nTypes:\n• In-hospital DNR\n• Out-of-hospital DNR\n• POLST (Physician Orders for Life-Sustaining Treatment)\n\nConsistent with living will wishes\nCan be revoked at any time',
    difficulty: 'medium',
    tags: ['dnr', 'polst', 'end-of-life']
  },
  {
    id: 'fc-est-040',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Property Transfers',
    front: 'What are forms of PROPERTY OWNERSHIP?',
    back: 'Property Ownership Types:\n\n• TENANCY IN COMMON: No survivorship, each owns %\n• JOINT TENANCY (WROS): Equal shares, survivorship\n• TENANCY BY ENTIRETY: Married couples, survivorship\n• COMMUNITY PROPERTY: 50-50, some states\n• SOLE OWNERSHIP: One owner\n\nEach has different probate/estate treatment',
    difficulty: 'medium',
    tags: ['ownership', 'tenancy', 'property']
  },
  {
    id: 'fc-est-041',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Property Transfers',
    front: 'How is JOINT TENANCY with right of survivorship treated?',
    back: 'JTWROS Treatment:\n\nPROBATE:\n• Avoids probate (passes by operation of law)\n\nESTATE TAX:\n• Spouses: 50% in each estate\n• Non-spouses: Amount contributed in first decedent\n\nINCOME TAX:\n• Survivor gets stepped-up basis on decedent\'s share\n• Community property: Full step-up both halves\n\nGift on creation if unequal contribution',
    difficulty: 'hard',
    tags: ['jtwros', 'survivorship', 'joint']
  },
  {
    id: 'fc-est-042',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Property Transfers',
    front: 'What are COMMUNITY PROPERTY states?',
    back: 'Community Property States (9+):\n• Arizona\n• California\n• Idaho\n• Louisiana\n• Nevada\n• New Mexico\n• Texas\n• Washington\n• Wisconsin\n\nAlaska: Opt-in\n\nBenefit: Double step-up in basis at first death\nSeparate property: Owned before marriage, gifts, inheritance',
    difficulty: 'medium',
    tags: ['community-property', 'states', 'basis']
  },
  {
    id: 'fc-est-043',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Beneficiary Designations',
    front: 'What assets pass by BENEFICIARY DESIGNATION?',
    back: 'Beneficiary Designation Assets:\n• Life insurance policies\n• IRAs and 401(k)s\n• Annuities\n• POD bank accounts\n• TOD brokerage accounts\n• HSAs\n• Pension plans\n\nSuperPriority:\n• Override will provisions\n• Must keep updated\n• Review after life events',
    difficulty: 'medium',
    tags: ['beneficiary', 'designation', 'non-probate']
  },
  {
    id: 'fc-est-044',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Beneficiary Designations',
    front: 'What is PER STIRPES vs PER CAPITA?',
    back: 'Distribution Methods:\n\nPER STIRPES (By Representation):\n• Deceased beneficiary\'s share to their descendants\n• "Down the family tree"\n• Unequal among grandchildren possible\n\nPER CAPITA:\n• Equally among all living\n• Deceased beneficiary\'s share reallocated\n• Equal among survivors\n\nPer stirpes more common, protects family branches',
    difficulty: 'medium',
    tags: ['per-stirpes', 'per-capita', 'distribution']
  },
  {
    id: 'fc-est-045',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'FLP',
    front: 'What is a FAMILY LIMITED PARTNERSHIP (FLP)?',
    back: 'Family Limited Partnership:\n• Family members as partners\n• Parents = General partners (control)\n• Children = Limited partners (economic)\n\nBenefits:\n• Valuation discounts (30-40%)\n• Centralized management\n• Asset protection for LPs\n• Gradual wealth transfer\n\nIRS scrutiny: Must have legitimate purpose\nAvoid deathbed transfers',
    difficulty: 'hard',
    tags: ['flp', 'partnership', 'discounts']
  },
  {
    id: 'fc-est-046',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Generation-Skipping',
    front: 'What is the GENERATION-SKIPPING TRANSFER TAX (GSTT)?',
    back: 'GSTT:\n• Tax on transfers to "skip persons"\n• 2+ generations below transferor\n• Prevents skipping estate tax\n\n2026 Exemption: $7.0M (TCJA sunset, same as estate)\nRate: 40% (flat)\n\nTransfer Types:\n• DIRECT SKIP: To skip person\n• TAXABLE TERMINATION: Trust interest ends\n• TAXABLE DISTRIBUTION: From trust to skip person',
    difficulty: 'hard',
    tags: ['gstt', 'generation-skipping', 'tax']
  },
  {
    id: 'fc-est-047',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Generation-Skipping',
    front: 'What is a DYNASTY TRUST?',
    back: 'Dynasty Trust:\n• Multigenerational trust\n• Designed to last perpetually\n• Avoids estate tax each generation\n\nFeatures:\n• Irrevocable\n• Uses GSTT exemption\n• State law dependent (rule against perpetuities)\n• DE, SD, NV, others allow\n\nCan grow to billions tax-free\nGreat use of GSTT exemption',
    difficulty: 'hard',
    tags: ['dynasty', 'trust', 'perpetual']
  },
  {
    id: 'fc-est-048',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Charitable Giving',
    front: 'What is a DONOR ADVISED FUND (DAF)?',
    back: 'Donor Advised Fund:\n• Account at public charity\n• Irrevocable contribution\n• Immediate deduction\n• Recommend grants over time\n\nBenefits:\n• Simple, low cost\n• Can contribute appreciated assets\n• Anonymous giving option\n• No minimum distribution\n\nLimitation: Advisory capacity only\nNot technically a trust',
    difficulty: 'medium',
    tags: ['daf', 'charitable', 'fund']
  },
  {
    id: 'fc-est-049',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Charitable Giving',
    front: 'What is a PRIVATE FOUNDATION?',
    back: 'Private Foundation:\n• Family-controlled charity\n• 501(c)(3) status\n• Investment income excise tax (1.39%)\n\nRequirements:\n• 5% minimum distribution annually\n• No self-dealing\n• Limit on business holdings\n\nVs. DAF:\n• More control, more expense\n• Family employment allowed\n• Lower deduction limits\n• Administrative burden',
    difficulty: 'hard',
    tags: ['foundation', 'private', 'charitable']
  },
  {
    id: 'fc-est-050',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Charitable Giving',
    front: 'What is a CHARITABLE GIFT ANNUITY?',
    back: 'Charitable Gift Annuity:\n• Contract with charity\n• Gift exchange for fixed payments\n• Partially tax-free payments\n\nBenefits:\n• Immediate partial deduction\n• Lifetime income stream\n• Capital gains spread if appreciated asset\n\nRisk:\n• Unsecured obligation of charity\n• Fixed payments (no inflation adjustment)\n• Irrevocable',
    difficulty: 'medium',
    tags: ['gift-annuity', 'charitable', 'income']
  },
  {
    id: 'fc-est-051',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Life Insurance',
    front: 'How is LIFE INSURANCE treated in estate?',
    back: 'Life Insurance Estate Treatment:\n\nINCOME TAX:\n• Death benefit generally income tax-free\n\nESTATE TAX:\n• Included if owner OR incidents of ownership\n• 3-year lookback for transfers\n\nPlanning:\n• ILIT owns policy = Out of estate\n• Another person owns = Out of estate\n• Charity owns = Deduction\n\nBeneficiary ≠ estate owner',
    difficulty: 'medium',
    tags: ['life-insurance', 'estate', 'inclusion']
  },
  {
    id: 'fc-est-052',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Business Succession',
    front: 'What are BUSINESS SUCCESSION planning options?',
    back: 'Business Succession Options:\n\n• OUTRIGHT SALE: Third party\n• FAMILY TRANSFER: Gift, sale, GRAT\n• BUY-SELL AGREEMENT: Co-owners or entity\n• ESOP: Employee stock ownership plan\n• MANAGEMENT BUYOUT: Employees purchase\n• IPO: Public offering\n\nEach has different tax and control implications\nStart planning early',
    difficulty: 'medium',
    tags: ['succession', 'business', 'planning']
  },
  {
    id: 'fc-est-053',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Business Succession',
    front: 'What is SECTION 303 STOCK REDEMPTION?',
    back: 'Section 303:\n• Stock redemption to pay estate taxes\n• Treated as capital gain (not dividend)\n\nRequirements:\n• Stock >35% of gross estate\n• Used for death taxes, funeral, admin\n• Redemption within time limits\n\nBenefit:\n• Capital gains treatment\n• Stepped-up basis = Less/no gain\n• Provides estate liquidity',
    difficulty: 'hard',
    tags: ['section-303', 'redemption', 'business']
  },
  {
    id: 'fc-est-054',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Business Succession',
    front: 'What is SECTION 6166 installment payment?',
    back: 'Section 6166:\n• Defer estate tax on closely held business\n• Installment payments over 14 years\n\nRequirements:\n• Business >35% of adjusted gross estate\n• Interest only for first 4 years\n• Principal over next 10 years\n\nInterest Rate:\n• 2% on first $1M+ equivalent\n• Higher rate on excess\n\nBenefit: Liquidity relief',
    difficulty: 'hard',
    tags: ['section-6166', 'installment', 'deferral']
  },
  {
    id: 'fc-est-055',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Fiduciary Duties',
    front: 'What are FIDUCIARY DUTIES of trustees/executors?',
    back: 'Fiduciary Duties:\n\n• LOYALTY: Act in beneficiary\'s interest\n• PRUDENCE: Reasonable care\n• IMPARTIALITY: Balance beneficiary interests\n• DIVERSIFICATION: Don\'t concentrate\n• DUTY TO ACCOUNT: Keep records, report\n• NO SELF-DEALING: Not family transactions\n\nBreach = Personal liability\nPrudent investor standard',
    difficulty: 'medium',
    tags: ['fiduciary', 'duties', 'trustee']
  },
  {
    id: 'fc-est-056',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Retirement Planning',
    front: 'What is the SECURE Act impact on inherited IRAs?',
    back: 'SECURE Act Inherited IRAs:\n\nPRE-2020:\n• Stretch over beneficiary\'s life\n\nPOST-2019:\n• 10-year rule for most non-spouse\n• Must empty by 10th year\n\nExceptions (Eligible Designated Beneficiaries):\n• Surviving spouse\n• Minor child (until majority)\n• Disabled/chronically ill\n• <10 years younger\n\nPlanning: Roth conversions, charitable',
    difficulty: 'hard',
    tags: ['secure-act', 'inherited-ira', '10-year']
  },
  {
    id: 'fc-est-057',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Retirement Planning',
    front: 'Should you name a TRUST as IRA beneficiary?',
    back: 'Trust as IRA Beneficiary:\n\nPROS:\n• Control distributions\n• Protect beneficiary (spendthrift)\n• Special needs planning\n• Minor children\n\nCONS:\n• Complex rules (conduit vs accumulation)\n• Compressed trust tax brackets\n• Accumulation: Oldest beneficiary rule\n• Higher taxes if accumulated\n\nBest: "See-through" conduit trust',
    difficulty: 'hard',
    tags: ['trust', 'ira', 'beneficiary']
  },
  {
    id: 'fc-est-058',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'State Taxes',
    front: 'Which states have ESTATE or INHERITANCE taxes?',
    back: 'State Death Taxes:\n\nESTATE TAX (tax on estate):\n• CT, DC, HI, IL, ME, MD, MA, MN, NY, OR, RI, VT, WA\n• Lower exemptions than federal\n\nINHERITANCE TAX (tax on recipient):\n• IA, KY, MD, NE, NJ, PA\n• Rates vary by relationship\n\nMD has both\nSome states decoupled from federal',
    difficulty: 'medium',
    tags: ['state-tax', 'estate', 'inheritance']
  },
  {
    id: 'fc-est-059',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Documents',
    front: 'What documents are in a complete ESTATE PLAN?',
    back: 'Core Estate Planning Documents:\n\n1. WILL: Property distribution\n2. REVOCABLE TRUST: Probate avoidance\n3. DURABLE POA: Financial decisions\n4. HEALTHCARE POA: Medical decisions\n5. LIVING WILL: End-of-life wishes\n6. HIPAA AUTHORIZATION: Medical access\n\nAlso consider:\n• Beneficiary designations\n• Letter of instruction\n• Digital asset instructions',
    difficulty: 'medium',
    tags: ['documents', 'estate-plan', 'complete']
  },
  {
    id: 'fc-est-060',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Documents',
    front: 'When should ESTATE PLANS be reviewed?',
    back: 'Estate Plan Review Triggers:\n\nLIFE EVENTS:\n• Marriage/divorce\n• Birth/adoption\n• Death of beneficiary/fiduciary\n• Significant wealth change\n• Move to different state\n• Health changes\n\nLEGAL CHANGES:\n• Tax law changes\n• State law changes\n\nMINIMUM: Every 3-5 years\nAfter TCJA sunset: 2026 review critical',
    difficulty: 'easy',
    tags: ['review', 'estate-plan', 'triggers']
  },
  {
    id: 'fc-est-061',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Marital Planning',
    front: 'What is a PREMARITAL (Prenuptial) AGREEMENT?',
    back: 'Premarital Agreement:\n• Contract before marriage\n• Defines property rights\n\nAddresses:\n• Separate vs marital property\n• Spousal support (limits)\n• Death/divorce distribution\n• Debt liability\n\nEnforcement Requirements:\n• Written\n• Full disclosure\n• Voluntary\n• Fair at execution\n• Independent counsel recommended',
    difficulty: 'medium',
    tags: ['prenup', 'premarital', 'agreement']
  },
  {
    id: 'fc-est-062',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Marital Planning',
    front: 'What is ELECTIVE SHARE?',
    back: 'Elective Share (Forced Share):\n• Spouse can elect against will\n• Receive statutory minimum\n• Prevents disinheritance\n\nTypical: 1/3 to 1/2 of estate\nVaries by state\n\nUMA (Uniform Probate Code):\n• Increasing percentage by years married\n• Reaches 50% after 15 years\n\nPrenup can waive elective share',
    difficulty: 'medium',
    tags: ['elective-share', 'spouse', 'forced']
  },
  {
    id: 'fc-est-063',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Asset Protection',
    front: 'What are ASSET PROTECTION strategies?',
    back: 'Asset Protection Tools:\n\n• EXEMPTIONS: Homestead, retirement\n• TITLING: Tenancy by entirety\n• INSURANCE: Umbrella, liability\n• BUSINESS ENTITIES: LLC, LP\n• IRREVOCABLE TRUSTS: Domestic, offshore\n• QUALIFIED PLANS: ERISA protection\n\nRules:\n• Plan before liability arises\n• Fraudulent transfer concerns\n• Balance with other goals',
    difficulty: 'hard',
    tags: ['asset-protection', 'strategies', 'planning']
  },
  {
    id: 'fc-est-064',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Asset Protection',
    front: 'What is a DOMESTIC ASSET PROTECTION TRUST (DAPT)?',
    back: 'DAPT (Self-Settled Trust):\n• Irrevocable trust\n• Grantor is beneficiary\n• Creditor protection\n\nRequirements:\n• DAPT state: NV, DE, SD, AK, etc.\n• Resident trustee\n• Wait period: 2-4 years\n\nLimitations:\n• Fraudulent transfer rules\n• Unknown if respected in non-DAPT states\n• Federal creditors (IRS)',
    difficulty: 'hard',
    tags: ['dapt', 'asset-protection', 'trust']
  },
  {
    id: 'fc-est-065',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trust Income Tax',
    front: 'What are trust INCOME TAX brackets?',
    back: 'Trust Tax Brackets 2024:\n• 10%: $0 - $3,100\n• 24%: $3,100 - $11,150\n• 35%: $11,150 - $15,200\n• 37%: Over $15,200\n\nVs. Individuals: Much more compressed\n37% at $15K trust vs $578K+ single\n\nPlan to distribute income (DNI)\nGrantor trust: Taxed to grantor',
    difficulty: 'hard',
    tags: ['trust-tax', 'brackets', 'dni']
  },
  {
    id: 'fc-est-066',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trust Income Tax',
    front: 'What is DISTRIBUTABLE NET INCOME (DNI)?',
    back: 'DNI:\n• Limits deduction for trust distributions\n• Flows character of income to beneficiary\n\nConcept:\n• Trust distributes = Beneficiary taxed\n• Trust retains = Trust taxed\n• Can\'t exceed DNI\n\nGoal: Avoid double taxation\nPlan: Distribute to lower-bracket beneficiaries',
    difficulty: 'hard',
    tags: ['dni', 'trust', 'distribution']
  },
  {
    id: 'fc-est-067',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trust Types',
    front: 'What is a GRANTOR TRUST?',
    back: 'Grantor Trust:\n• Trust where grantor pays income tax\n• "Defective" for income tax\n• But removed from estate for estate tax\n\nTriggering Powers:\n• Revocable\n• Benefit grantor/spouse\n• Borrow without security\n• Substitute assets\n\nIDGT (Intentionally Defective):\n• Estate planning tool\n• Grantor pays tax = More growth for beneficiaries',
    difficulty: 'hard',
    tags: ['grantor-trust', 'idgt', 'defective']
  },
  {
    id: 'fc-est-068',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Trust Types',
    front: 'What is a CRUMMEY TRUST?',
    back: 'Crummey Trust:\n• Gifts qualify for annual exclusion\n• Even though trust is irrevocable\n\nHow it works:\n• Beneficiary gets withdrawal right\n• Usually 30-60 days\n• "Present interest" requirement met\n• Typically lapses\n\nCrummey Notice:\n• Must notify beneficiaries\n• Document withdrawal right\n• Common with ILIT',
    difficulty: 'hard',
    tags: ['crummey', 'trust', 'withdrawal']
  },
  {
    id: 'fc-est-069',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Digital Assets',
    front: 'How should DIGITAL ASSETS be planned for?',
    back: 'Digital Asset Planning:\n\nTypes:\n• Financial (crypto, online accounts)\n• Personal (photos, social media)\n• Business (websites, domains)\n\nPlanning Steps:\n• Inventory digital assets\n• Store passwords securely\n• Grant fiduciary access (state law allowing)\n• Include in estate documents\n• Consider hardware wallet access\n\nRUSA: Revised Uniform Fiduciary Access to Digital Assets Act',
    difficulty: 'medium',
    tags: ['digital', 'assets', 'planning']
  },
  {
    id: 'fc-est-070',
    section: 'CFP-EST',
    type: 'concept',
    topic: 'Letter of Instruction',
    front: 'What is a LETTER OF INSTRUCTION?',
    back: 'Letter of Instruction:\n• Informal document (not legally binding)\n• Supplements will and trust\n\nContents:\n• Funeral wishes\n• Asset locations\n• Passwords / digital access\n• Personal messages\n• Pet care instructions\n• Important contacts\n\nAdvantage: Easily updated\nKeep accessible (not in safe deposit)',
    difficulty: 'easy',
    tags: ['letter', 'instruction', 'informal']
  },
];
