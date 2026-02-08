/**
 * CFP Estate Questions - Batch 6
 * Domain 7: Estate Planning (10% of exam)
 * 25 additional questions covering advanced estate topics
 */

import { Question } from '../../../types';

export const CFP_ESTATE_BATCH6_QUESTIONS: Question[] = [
  // EST-1: Estate Planning Documents
  {
    id: 'CFP-EST-B6-001',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Living Will',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A living will (advance directive) typically:',
    options: [
      'A) Distributes assets after death',
      'B) States wishes regarding life-sustaining medical treatment if incapacitated and unable to communicate',
      'C) Names a guardian for minor children',
      'D) Creates a trust'
    ],
    correctAnswer: 1,
    explanation: 'A living will addresses end-of-life medical decisions—whether to continue life support, feeding tubes, resuscitation preferences. It speaks when the person cannot. Often combined with healthcare power of attorney (for decisions not addressed) into an advance directive.'
  },
  {
    id: 'CFP-EST-B6-002',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'HIPAA Authorization',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A HIPAA authorization in estate planning:',
    options: [
      'A) Is required for all medical treatment',
      'B) Allows designated individuals to access protected health information',
      'C) Replaces the need for healthcare power of attorney',
      'D) Only applies to Medicare patients'
    ],
    correctAnswer: 1,
    explanation: 'HIPAA authorization allows named individuals to receive medical information. Without it, providers may not share health information even with family. Often included with advance directives to ensure healthcare agents and family can access necessary information for decisions.'
  },
  {
    id: 'CFP-EST-B6-003',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Pour-Over Will',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A pour-over will is used to:',
    options: [
      'A) Avoid probate entirely',
      'B) Transfer assets not already in a revocable trust into the trust at death',
      'C) Create a new trust at death',
      'D) Distribute assets outside of any trust'
    ],
    correctAnswer: 1,
    explanation: 'A pour-over will catches assets not transferred to the revocable trust during life and "pours" them into the trust at death. These assets still go through probate, but then follow the trust\'s distribution terms. It serves as a safety net for unfunded trust assets.'
  },
  // EST-2: Ownership and Titling
  {
    id: 'CFP-EST-B6-004',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Property Ownership',
    subtopic: 'Beneficiary Designations',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Beneficiary designations on retirement accounts and life insurance:',
    options: [
      'A) Can be overridden by a will',
      'B) Generally override the will and pass assets directly to named beneficiaries',
      'C) Must match the will exactly',
      'D) Have no legal effect'
    ],
    correctAnswer: 1,
    explanation: 'Beneficiary designations control distribution regardless of what the will states—they\'re contractual. Many estate plans fail because beneficiary designations weren\'t updated after divorce, death, or changed intentions. Regular beneficiary review is essential.'
  },
  {
    id: 'CFP-EST-B6-005',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Property Ownership',
    subtopic: 'Transfer on Death (TOD)',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Transfer on Death (TOD) registration for securities:',
    options: [
      'A) Transfers ownership immediately',
      'B) Allows assets to pass directly to designated beneficiaries at death, avoiding probate',
      'C) Creates a trust',
      'D) Is only available for bank accounts'
    ],
    correctAnswer: 1,
    explanation: 'TOD registration (Payable on Death for bank accounts) names beneficiaries who receive assets at death without probate. The owner maintains full control during life from The beneficiary has no rights until death. Simple, cost-effective probate avoidance for appropriate situations.'
  },
  {
    id: 'CFP-EST-B6-006',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Property Ownership',
    subtopic: 'Community Property with Right of Survivorship',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Community property with right of survivorship (CPWROS):',
    options: [
      'A) Requires probate at first death',
      'B) Passes to survivor automatically at death while providing full step-up in basis for both halves',
      'C) Is available in all states',
      'D) Has no tax advantages'
    ],
    correctAnswer: 1,
    explanation: 'CPWROS combines survivorship (avoiding probate) with community property\'s full basis step-up at first death. Available in some community property states. Both halves get new FMV basis at first death—unlike JTWROS where only the decedent\'s half gets stepped-up basis.'
  },
  // EST-3: Gift and Estate Tax
  {
    id: 'CFP-EST-B6-007',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Gift Tax',
    subtopic: 'Medical and Education Exclusion',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Payments for tuition directly to an educational institution:',
    options: [
      'A) Count toward the annual gift exclusion',
      'B) Are unlimited and excluded from gift tax in addition to the annual exclusion',
      'C) Must be for the donor\'s children only',
      'D) Are limited to $20,000 per year'
    ],
    correctAnswer: 1,
    explanation: 'Direct payments to educational institutions for tuition (not room/board/books) and to medical providers for medical care are unlimited exclusions separate from the $18,000 annual exclusion. This allows wealthy individuals to transfer substantial amounts for education and healthcare without gift tax consequences.'
  },
  {
    id: 'CFP-EST-B6-008',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: 'State Death Taxes',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Compared to federal estate tax, state death taxes:',
    options: [
      'A) Don\'t exist in any state',
      'B) May have lower exemption amounts, affecting estates that owe no federal tax',
      'C) Always match federal thresholds',
      'D) Only apply to real estate'
    ],
    correctAnswer: 1,
    explanation: 'About 12 states plus DC have estate taxes with exemptions often lower than federal ($1M-$6M varies). Six states have inheritance taxes on recipients. State taxes can apply even when no federal tax is due. Planning must consider state residence and property location.'
  },
  {
    id: 'CFP-EST-B6-009',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: 'Valuation Discounts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Minority interest and lack of marketability discounts in estate valuation:',
    options: [
      'A) Are automatically applied by the IRS',
      'B) Reduce the taxable value of closely-held business interests and FLP interests due to lack of control and liquidity',
      'C) Only apply to public securities',
      'D) Have been eliminated by recent legislation'
    ],
    correctAnswer: 1,
    explanation: 'Minority interests lack control; private interests lack marketability. Combined discounts of 20-40% are common, reducing transfer tax. The IRS scrutinizes aggressive discounts, especially for FLPs holding marketable securities. Substantiated appraisals are essential.'
  },
  // EST-4: Trust Types
  {
    id: 'CFP-EST-B6-010',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Trusts',
    subtopic: 'Grantor Trust Rules',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A grantor trust for income tax purposes:',
    options: [
      'A) Always files a separate tax return',
      'B) Has income taxed to the grantor personally, which can be advantageous for wealth transfer',
      'C) Cannot hold assets',
      'D) Must be irrevocable'
    ],
    correctAnswer: 1,
    explanation: 'Grantor trusts are "defective" for income tax—the grantor pays tax on trust income. This allows assets to grow without trust-level tax, effectively a tax-free gift. Combined with an IDGT (Intentionally Defective Grantor Trust), this maximizes wealth transfer by having the grantor pay taxes on trust earnings.'
  },
  {
    id: 'CFP-EST-B6-011',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Trusts',
    subtopic: 'Special Needs Trust',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A properly structured Special Needs Trust (supplemental needs trust):',
    options: [
      'A) Disqualifies the beneficiary from government benefits',
      'B) Supplements government benefits without affecting eligibility for SSI and Medicaid',
      'C) Can only be funded at death',
      'D) Must distribute income annually'
    ],
    correctAnswer: 1,
    explanation: 'Special Needs Trusts provide supplemental support (vacations, equipment, entertainment) without disqualifying disabled beneficiaries from need-based programs. Third-party SNTs (funded by others) have more flexibility than first-party SNTs (funded with beneficiary\'s assets, which require Medicaid payback).'
  },
  {
    id: 'CFP-EST-B6-012',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Trusts',
    subtopic: 'Dynasty Trust',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A dynasty trust is designed to:',
    options: [
      'A) Terminate after 21 years',
      'B) Transfer wealth across multiple generations while minimizing or avoiding transfer taxes at each generation',
      'C) Provide income only to the grantor',
      'D) Hold only real estate'
    ],
    correctAnswer: 1,
    explanation: 'Dynasty trusts span multiple generations, avoiding estate tax at each generational transfer. They use GST exemption and may last perpetually in states without rule against perpetuities. Combined with IDGT planning, significant wealth can compound outside the transfer tax system.'
  },
  // EST-5: Estate Administration
  {
    id: 'CFP-EST-B6-013',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Estate Administration',
    subtopic: 'Executor Duties',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An executor or personal representative is responsible for:',
    options: [
      'A) Only distributing assets',
      'B) Inventorying assets, paying debts and taxes, filing returns, and distributing assets according to the will',
      'C) Making medical decisions',
      'D) Managing investments indefinitely'
    ],
    correctAnswer: 1,
    explanation: 'Executors gather and protect assets, notify creditors, pay valid claims and taxes, file final income tax and estate tax returns if required, and distribute remaining assets per the will. They\'re fiduciaries who must act prudently and in beneficiaries\' interests. The role typically lasts 1-2 years.'
  },
  {
    id: 'CFP-EST-B6-014',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Estate Administration',
    subtopic: 'Form 706',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'IRS Form 706 (estate tax return) must be filed:',
    options: [
      'A) For all estates',
      'B) For estates exceeding the filing threshold, typically within 9 months of death (extendable to 15 months)',
      'C) Only if tax is owed',
      'D) Within 30 days of death'
    ],
    correctAnswer: 1,
    explanation: 'Form 706 is required when the gross estate plus adjusted taxable gifts exceeds the exemption amount (about $13.6M in 2024). Filing is also required to elect portability even if no tax is owed. Due 9 months after death with automatic 6-month extension available. Payment is due at 9 months without extension.'
  },
  {
    id: 'CFP-EST-B6-015',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Estate Administration',
    subtopic: 'Income in Respect of Decedent',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Income in Respect of a Decedent (IRD):',
    options: [
      'A) Is never taxable',
      'B) Is income the decedent earned but didn\'t receive before death, taxable to the recipient when received',
      'C) Receives a step-up in basis',
      'D) Only applies to business owners'
    ],
    correctAnswer: 1,
    explanation: 'IRD includes income earned but unreceived at death: IRA distributions, unpaid salary, accrued interest, installment payments. It doesn\'t get a basis step-up—recipients pay income tax when received. With IRAs, this creates "double taxation" (estate tax plus income tax), partially offset by the IRD income tax deduction.'
  },
  // Additional Topics
  {
    id: 'CFP-EST-B6-016',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'No-Contest Clause',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A no-contest (in terrorem) clause in a will:',
    options: [
      'A) Is unenforceable in all states',
      'B) Disinherits beneficiaries who unsuccessfully challenge the will',
      'C) Prevents all legal challenges',
      'D) Applies only to minor beneficiaries'
    ],
    correctAnswer: 1,
    explanation: 'No-contest clauses penalize beneficiaries who challenge the will by forfeiting their inheritance if unsuccessful. Effectiveness varies by state—some won\'t enforce against challenges made in good faith or with probable cause. They deter frivolous contests but don\'t prevent all challenges.'
  },
  {
    id: 'CFP-EST-B6-017',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Property Ownership',
    subtopic: 'Tenancy by the Entirety',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Tenancy by the entirety is a form of ownership:',
    options: [
      'A) Available to any two people',
      'B) Available only to married couples, providing creditor protection from individual creditors in many states',
      'C) That requires probate',
      'D) That divides ownership 50/50 with no survivorship'
    ],
    correctAnswer: 1,
    explanation: 'Tenancy by the entirety is only for married couples, treating them as one unit. It includes survivorship and, in many states, protects assets from individual (not joint) creditors. Divorce converts it to tenancy in common. Available in about half of U.S. states, primarily for real estate.'
  },
  {
    id: 'CFP-EST-B6-018',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Gift Tax',
    subtopic: 'Gift Tax Return',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Form 709 (gift tax return) must generally be filed when:',
    options: [
      'A) Any gift is made',
      'B) Gifts to any one person exceed the annual exclusion, gifts to a non-citizen spouse exceed the special limit, or gifts require reporting like gift-splitting',
      'C) Only if gift tax is owed',
      'D) Only for gifts of real estate'
    ],
    correctAnswer: 1,
    explanation: 'Form 709 is required when annual exclusion is exceeded, gifts to non-citizen spouses exceed the enhanced exclusion ($185K in 2024), couples elect gift-splitting, gifts of future interests are made, or GST tax may apply. Filing tracks lifetime exemption usage even when no tax is due.'
  },
  {
    id: 'CFP-EST-B6-019',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Trusts',
    subtopic: 'Pet Trust',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A pet trust:',
    options: [
      'A) Is recognized in all 50 states',
      'B) Provides for the care of animals after the owner\'s death or incapacity',
      'C) Can only hold cash',
      'D) Is limited to dogs and cats'
    ],
    correctAnswer: 1,
    explanation: 'Pet trusts (recognized in all states) designate a caretaker and funds for pet care. They name a trustee to manage funds and can specify care standards. Without a trust, pets are property with no guaranteed care. Funding should consider animal\'s lifespan and care costs.'
  },
  {
    id: 'CFP-EST-B6-020',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Estate Administration',
    subtopic: 'Small Estate Procedures',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Small estate procedures (affidavit or summary administration):',
    options: [
      'A) Apply to all estates regardless of size',
      'B) Allow simplified transfer of assets below state thresholds without full probate',
      'C) Require court supervision',
      'D) Only apply if there\'s no will'
    ],
    correctAnswer: 1,
    explanation: 'Most states allow simplified procedures for small estates—often using affidavits for very small amounts or summary administration for moderate estates. Thresholds vary widely ($25K to $200K+). This avoids full probate costs and delays for qualifying estates.'
  },
  {
    id: 'CFP-EST-B6-021',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Trust Protector',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A trust protector is a:',
    options: [
      'A) Type of insurance for trusts',
      'B) Third party given specific powers to modify trust terms, change trustees, or adapt to changing circumstances',
      'C) Government official',
      'D) Always the same person as the trustee'
    ],
    correctAnswer: 1,
    explanation: 'Trust protectors provide flexibility for irrevocable trusts. They may have powers to modify distribution terms, change trustees, move trust situs, or respond to tax law changes. Common in dynasty trusts and asset protection trusts. Powers should be carefully defined to avoid grantor trust issues.'
  },
  {
    id: 'CFP-EST-B6-022',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: 'QDOT',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Qualified Domestic Trust (QDOT) is used when:',
    options: [
      'A) Both spouses are U.S. citizens',
      'B) The surviving spouse is not a U.S. citizen, allowing estate tax deferral until distributions or death',
      'C) The estate is less than the exemption',
      'D) Only for charitable transfers'
    ],
    correctAnswer: 1,
    explanation: 'The unlimited marital deduction doesn\'t apply to non-citizen surviving spouses (concern they\'ll leave the U.S. with assets). QDOT allows deferral: a U.S. trustee controls distributions, and estate tax applies to distributions (except hardship) and remaining assets at surviving spouse\'s death.'
  },
  {
    id: 'CFP-EST-B6-023',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Trusts',
    subtopic: 'Ascertainable Standard',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An ascertainable standard in trust distribution (HEMS) refers to:',
    options: [
      'A) Unlimited discretion for distributions',
      'B) Distributions for health, education, maintenance, and support—limiting trustee discretion to avoid estate inclusion',
      'C) Fixed annual distributions',
      'D) Distributions only for emergencies'
    ],
    correctAnswer: 1,
    explanation: 'HEMS (Health, Education, Maintenance, Support) is a recognized ascertainable standard limiting distributions to specific purposes. It allows beneficiaries to serve as trustees without the trust being included in their estates. Without HEMS, a beneficiary-trustee\'s unlimited discretion causes estate inclusion.'
  },
  {
    id: 'CFP-EST-B6-024',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Property Ownership',
    subtopic: 'Right of Survivorship',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'When property is held in joint tenancy with right of survivorship (JTWROS):',
    options: [
      'A) It goes through probate at the first owner\'s death',
      'B) The surviving owner automatically receives the deceased owner\'s share outside of probate',
      'C) Each owner can will their share to anyone',
      'D) A court must approve the transfer'
    ],
    correctAnswer: 1,
    explanation: 'JTWROS provides automatic transfer to the survivor(s) at death, bypassing probate. Ownership is equal among joint tenants. Severing the joint tenancy (by sale or transfer) converts it to tenancy in common. For non-spouses, only the decedent\'s portion receives a step-up in basis.'
  },
  {
    id: 'CFP-EST-B6-025',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Estate Administration',
    subtopic: 'Ancillary Probate',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Ancillary probate is required when:',
    options: [
      'A) There are multiple beneficiaries',
      'B) The decedent owned real property in a state different from their state of residence',
      'C) The estate is large',
      'D) A trust is involved'
    ],
    correctAnswer: 1,
    explanation: 'Real property is governed by the state where it\'s located. If a decedent owns real estate in multiple states, probate must occur in each state (ancillary probate) in addition to domiciliary probate. This adds cost and complexity. Revocable trusts or LLCs can avoid ancillary probate.'
  }
];
