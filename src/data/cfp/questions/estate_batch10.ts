/**
 * CFP Estate Planning Questions - Batch 10
 * Domain 7: Estate Planning (10% of exam)
 * 25 additional questions
 */

import { Question } from '../../../types';

export const CFP_ESTATE_BATCH10_QUESTIONS: Question[] = [
  // EST-1: Estate Planning Documents
  {
    id: 'CFP-EST-B10-001',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Trust Amendments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A revocable living trust can be modified through:',
    options: [
      'A) Verbal instructions only',
      'B) A trust amendment for specific changes or a complete trust restatement for comprehensive updates',
      'C) Beneficiary verbal agreement',
      'D) No modifications allowed'
    ],
    correctAnswer: 1,
    explanation: 'Trust modification: Amendment—specific changes while keeping original intact; good for minor updates. Restatement—replaces entire trust document; better for major changes, avoids confusion from multiple amendments. Both require grantor capacity and proper execution. Restatement often preferred after several amendments for clarity. Irrevocable trusts: different modification rules.'
  },
  {
    id: 'CFP-EST-B10-002',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Pour-Over Wills',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A pour-over will functions to:',
    options: [
      'A) Distribute all assets directly',
      'B) Transfer assets not already in a revocable trust to that trust at death, ensuring unified disposition',
      'C) Avoid all probate',
      'D) Create a new trust'
    ],
    correctAnswer: 1,
    explanation: 'Pour-over will: "catches" assets not titled to trust and pours them in at death. Provides backup—assets acquired but not transferred go to trust. Still requires probate for those assets. Ensures consistent distribution per trust terms. Doesn\'t avoid probate—just directs probate assets to trust. Should fund trust during life to minimize probate.'
  },
  {
    id: 'CFP-EST-B10-003',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'HIPAA Authorization',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A HIPAA authorization in estate planning allows:',
    options: [
      'A) Financial account access',
      'B) Named individuals to access protected health information, which is not automatically granted by a power of attorney',
      'C) Social Security access',
      'D) Property transfer'
    ],
    correctAnswer: 1,
    explanation: 'HIPAA authorization: grants access to protected health information. Separate from healthcare power of attorney—POA may not automatically include HIPAA access. Whom to name: healthcare agents, family members who may need information. Helpful for coordinating care, understanding condition. Keep with estate planning documents. Some states incorporate in healthcare directive.'
  },
  // EST-2: Trust Types
  {
    id: 'CFP-EST-B10-004',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trust Types',
    subtopic: 'Credit Shelter Trusts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A credit shelter trust (bypass trust) is now used primarily for:',
    options: [
      'A) All married couples',
      'B) Generation-skipping transfer tax planning, asset protection for surviving spouse, and preserving appreciation exemption',
      'C) Only income tax savings',
      'D) Probate avoidance only'
    ],
    correctAnswer: 1,
    explanation: 'Credit shelter/bypass trusts: post-portability (2010+), estate tax utility reduced for most. Still valuable for: using GST exemption (not portable), protecting assets for surviving spouse, preserving appreciation within exempt trust, state estate tax planning (many states without portability). Not needed purely for federal estate tax for most due to portability.'
  },
  {
    id: 'CFP-EST-B10-005',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trust Types',
    subtopic: 'Qualified Personal Residence Trust',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Qualified Personal Residence Trust (QPRT) provides estate tax savings by:',
    options: [
      'A) Immediate removal from estate',
      'B) Transferring home at discounted gift value based on retained term interest, with grantor living in home for specified period',
      'C) Avoiding capital gains',
      'D) Generating income'
    ],
    correctAnswer: 1,
    explanation: 'QPRT: transfer home to irrevocable trust, retain right to live there for term (10-15 years typical). Gift value discounted—present value of remainder interest. If survive term: home out of estate at discounted value. If die during term: home included in estate (but no worse than not doing it). Best for: appreciating property, long life expectancy. Must pay rent after term ends.'
  },
  {
    id: 'CFP-EST-B10-006',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trust Types',
    subtopic: 'Medicaid Trusts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Irrevocable Medicaid asset protection trusts:',
    options: [
      'A) Provide immediate protection',
      'B) May protect assets from Medicaid estate recovery if funded 5+ years before application (lookback period)',
      'C) Are always allowed',
      'D) Protect retirement accounts'
    ],
    correctAnswer: 1,
    explanation: 'Medicaid planning trusts: irrevocable transfer to protect assets from long-term care spend down. 5-year lookback period—transfers within 5 years before Medicaid application create penalty period. Must: truly give up control, not be revocable, not benefit grantor. Income usually still counted. Very state-specific. Plan well in advance—not crisis planning. Consult elder law attorney.'
  },
  // EST-3: Estate Tax Planning
  {
    id: 'CFP-EST-B10-007',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: 'Valuation Discounts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Valuation discounts for closely-held business interests in estate planning include:',
    options: [
      'A) Discounts are not allowed',
      'B) Lack of marketability and lack of control discounts, which can reduce taxable value by 20-40% combined',
      'C) Only 10% discounts',
      'D) Discounts only for public stock'
    ],
    correctAnswer: 1,
    explanation: 'Valuation discounts: reflect economic reality—minority, non-marketable interest worth less than proportionate share. Lack of marketability: can\'t easily sell on market (10-35% typical). Lack of control: minority can\'t control distributions, management (15-25%). Combined: significant reduction. IRS scrutinizes—must have legitimate business purpose, qualified appraisal. FLPs, LLCs often used.'
  },
  {
    id: 'CFP-EST-B10-008',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: '6166 Installment Payments',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'IRC Section 6166 allows estate tax:',
    options: [
      'A) Complete elimination',
      'B) Installment payment over up to 14 years for estates with substantial closely-held business interests',
      'C) Deferral for any estate',
      'D) Only interest deferral'
    ],
    correctAnswer: 1,
    explanation: 'Section 6166: estate tax installment payments for closely-held business. Requirements: business value >35% of adjusted gross estate. Terms: defer principal 5 years (interest only), then 10 annual installments. Favorable interest rate on portion. Benefit: pay tax over time, business generates cash for payments. Acceleration events exist. Valuable for liquidity-constrained business estates.'
  },
  {
    id: 'CFP-EST-B10-009',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: 'Charitable Lead Trust',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A grantor charitable lead trust provides:',
    options: [
      'A) No tax benefits',
      'B) Upfront income tax deduction for present value of charity\'s interest, with trust income taxed to grantor',
      'C) Estate tax benefits only',
      'D) Gift tax benefits only'
    ],
    correctAnswer: 1,
    explanation: 'Grantor CLT: income to charity for term, remainder to family. Grantor gets upfront income tax deduction for charity\'s interest present value. Trade-off: trust income taxed to grantor during term (even though going to charity). Good for: years with unusually high income. Non-grantor CLT: no income deduction, but trust pays income tax on its income. Different planning considerations.'
  },
  // EST-4: Title and Beneficiaries
  {
    id: 'CFP-EST-B10-010',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Asset Title',
    subtopic: 'Transfer on Death Deeds',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Transfer on Death (TOD) deeds for real estate:',
    options: [
      'A) Are available in all states',
      'B) Allow property to pass outside probate while owner retains full control and ability to revoke during lifetime',
      'C) Transfer immediately',
      'D) Require trustee'
    ],
    correctAnswer: 1,
    explanation: 'TOD deeds: property transfer at death without probate. Owner retains: full ownership, control, right to sell, ability to revoke. Beneficiary gets no rights until death. About 30 states allow. Simple, low cost alternative to trust for real estate. Limitations: may not work for complex situations, beneficiary issues (minor, predeceasing). State-specific rules and forms.'
  },
  {
    id: 'CFP-EST-B10-011',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Asset Title',
    subtopic: 'Community Property',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The tax advantage of community property at death is:',
    options: [
      'A) No advantage exists',
      'B) Both halves receive stepped-up basis when first spouse dies, compared to only the deceased\'s share in common law states',
      'C) Reduced estate tax',
      'D) Income tax elimination'
    ],
    correctAnswer: 1,
    explanation: 'Community property step-up: both halves get new basis at first death (not just deceased\'s half). Common law: only deceased\'s half stepped up. Potentially significant capital gains tax benefit. Community property states: AZ, CA, ID, LA, NV, NM, TX, WA, WI. Some allow community property trusts for non-CP state residents. Consider titling for tax efficiency.'
  },
  {
    id: 'CFP-EST-B10-012',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Beneficiary Designations',
    subtopic: 'Retirement Account Trusts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Naming a trust as IRA beneficiary requires the trust to be:',
    options: [
      'A) Any trust type works',
      'B) A "look-through" trust that is valid, irrevocable at death, has identifiable beneficiaries, and is properly documented to the IRA custodian',
      'C) Only charitable trusts',
      'D) Revocable only'
    ],
    correctAnswer: 1,
    explanation: 'Trust as IRA beneficiary: must be "see-through" (look-through) to use beneficiaries\' life expectancy. Requirements: valid under state law, irrevocable at owner\'s death, identifiable beneficiaries, documentation provided to custodian. If not met: treated as having no designated beneficiary (worse distribution rules). Conduit vs. accumulation trusts have different implications post-SECURE Act.'
  },
  // Additional Topics
  {
    id: 'CFP-EST-B10-013',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Trustee Selection',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Key considerations in selecting a trustee include:',
    options: [
      'A) Only family members can serve',
      'B) Financial acumen, impartiality, longevity (for individual), and cost (for professional trustees)',
      'C) Cheapest option always',
      'D) Oldest family member'
    ],
    correctAnswer: 1,
    explanation: 'Trustee selection factors: competence (investment, tax, recordkeeping), impartiality (family dynamics), availability, longevity (corporate trustee outlasts individuals), cost (professional fees 0.5-1.5% annually), geographic convenience. Options: family member, trusted advisor, corporate trustee, combination (co-trustees). Successor trustees essential. Match complexity to capability.'
  },
  {
    id: 'CFP-EST-B10-014',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trust Types',
    subtopic: 'Pet Trusts',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A pet trust provides:',
    options: [
      'A) No legal recognition',
      'B) Legally enforceable care instructions and funding for pets after owner\'s death or incapacity',
      'C) Only suggested guidelines',
      'D) Tax deductions'
    ],
    correctAnswer: 1,
    explanation: 'Pet trusts: recognized in all 50 states. Enforceable: court can require trustee compliance. Fund: care expenses during pet\'s life. Name: caregiver, trustee (can be different), successor caregiver. Include: care instructions, vet information, funds for expenses. Excess at death: can specify remainder beneficiary. Better than informal arrangements.'
  },
  {
    id: 'CFP-EST-B10-015',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: 'Estate Tax Returns',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Estate tax return (Form 706) filing is required when:',
    options: [
      'A) Anyone dies with any assets',
      'B) Gross estate plus adjusted taxable gifts exceed filing threshold, or to elect portability',
      'C) Only if tax is owed',
      'D) Only for married decedents'
    ],
    correctAnswer: 1,
    explanation: 'Form 706 filing: required when gross estate + adjusted taxable gifts > exemption (~$13M in 2024). Also: elect to port unused exclusion to surviving spouse (regardless of value). Due: 9 months from death (6-month extension available). Portability election: even if no tax owed, file to preserve DSUE for surviving spouse. Many file solely for portability.'
  },
  {
    id: 'CFP-EST-B10-016',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Asset Title',
    subtopic: 'Pay on Death Accounts',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Payable on Death (POD) and Transfer on Death (TOD) account designations:',
    options: [
      'A) Give beneficiary immediate access',
      'B) Allow assets to pass directly to named beneficiaries at death, avoiding probate while owner retains full control',
      'C) Require trust',
      'D) Are irrevocable'
    ],
    correctAnswer: 1,
    explanation: 'POD/TOD designations: simple probate avoidance. Bank accounts: POD. Investment accounts: TOD. Owner: full control during life, can change beneficiary anytime, no beneficiary rights until death. At death: beneficiary claims with death certificate. Simple, free, effective for straightforward situations. Limitations: no contingent planning, may not override will.'
  },
  {
    id: 'CFP-EST-B10-017',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Document Safekeeping',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Original estate planning documents should be:',
    options: [
      'A) Kept only by attorney',
      'B) Stored safely with locations known to successors, with signed originals for wills typically required for probate',
      'C) Kept in safety deposit box always',
      'D) Destroyed after signing'
    ],
    correctAnswer: 1,
    explanation: 'Document storage: originals important—many courts require original will. Options: fireproof safe at home, with attorney, some court filing (few states). Safety deposit box: may be sealed at death, require court order. Copies: agents should have, keep with important papers. Inform: successor trustees, agents, executor of locations. Review accessibility periodically.'
  },
  {
    id: 'CFP-EST-B10-018',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trust Types',
    subtopic: 'Testamentary Trusts',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A testamentary trust differs from a living trust in that it:',
    options: [
      'A) Avoids probate',
      'B) Is created by will and funded at death through probate, providing no probate avoidance',
      'C) Takes effect immediately',
      'D) Cannot be amended'
    ],
    correctAnswer: 1,
    explanation: 'Testamentary trust: created by will, comes into existence at death. Assets pass through probate, then into trust. Living trust: created during life, funded now, avoids probate. Both: can have ongoing management, beneficiary protections. Testamentary: simpler to create, court oversight, no probate avoidance. Living: more administration now, probate avoidance. Choose based on goals.'
  },
  {
    id: 'CFP-EST-B10-019',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: 'Gift Tax Annual Exclusion',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Gifts exceeding the annual exclusion amount:',
    options: [
      'A) Are automatically taxed',
      'B) Require gift tax return filing and reduce lifetime exemption, but usually don\'t result in current tax',
      'C) Cannot be made',
      'D) Have no reporting requirement'
    ],
    correctAnswer: 1,
    explanation: 'Over-exclusion gifts: File Form 709 (gift tax return) by April 15. Gift reduces lifetime exemption (currently ~$13M). Rarely results in current tax payment due to high exemption. Cumulative: all taxable gifts accumulate over lifetime. If exceed exemption: 40% gift tax. Strategy: many plan to use exemption during life. Track lifetime gifts—estate uses remaining exemption.'
  },
  {
    id: 'CFP-EST-B10-020',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Beneficiary Designations',
    subtopic: 'Minor Beneficiaries',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When minors are named as direct beneficiaries:',
    options: [
      'A) They receive funds immediately',
      'B) A court-appointed guardian or custodian may be required to manage funds until majority, with costs and complications',
      'C) No issues arise',
      'D) Parents automatically control funds'
    ],
    correctAnswer: 1,
    explanation: 'Minor as beneficiary: can\'t legally manage funds. Results: court-appointed guardian (costly, cumbersome), UGMA/UTMA custodianship. Better alternatives: name trust as beneficiary, use UTMA provision in beneficiary designation ("to John as custodian for Minor under [State] UTMA"). Trust allows: continued management past 18, controlled distributions. Plan for minors specifically.'
  },
  {
    id: 'CFP-EST-B10-021',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Codicils',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A codicil is used to:',
    options: [
      'A) Create a new will',
      'B) Make minor amendments to an existing will while keeping the original will valid',
      'C) Revoke all prior wills',
      'D) Create a trust'
    ],
    correctAnswer: 1,
    explanation: 'Codicil: formal amendment to will. Must be executed with same formalities as will. Use: minor changes (specific bequest, executor change). For major changes: new will often better (clearer, less confusion). Multiple codicils: becomes confusing. Modern practice: complete new will common even for minor changes (computers make easy). Original will + all codicils needed for probate.'
  },
  {
    id: 'CFP-EST-B10-022',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trust Types',
    subtopic: 'Declaration vs. Agreement',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A declaration of trust versus a trust agreement:',
    options: [
      'A) Are identical',
      'B) Declaration: grantor is also trustee; Agreement: separate trustee, requiring two parties to the document',
      'C) Declaration is always irrevocable',
      'D) Agreement requires attorney'
    ],
    correctAnswer: 1,
    explanation: 'Declaration of trust: grantor declares they hold property as trustee—one person, one document. Trust agreement: grantor and trustee are different parties, agreement between them. Revocable living trusts: often declarations (grantor is own trustee). Irrevocable trusts often agreements (independent trustee). Functional differences minimal—form follows structure.'
  },
  {
    id: 'CFP-EST-B10-023',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Estate Tax',
    subtopic: 'Disclaimers',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A qualified disclaimer allows a beneficiary to:',
    options: [
      'A) Delay inheritance',
      'B) Refuse inheritance within 9 months, causing assets to pass as if beneficiary predeceased, without gift tax',
      'C) Choose who receives assets',
      'D) Reduce inheritance tax only'
    ],
    correctAnswer: 1,
    explanation: 'Qualified disclaimer: refuse inheritance—no gift tax (IRS treats as never received). Requirements: written, within 9 months of death, no benefit accepted, no direction of property. Property passes per governing instrument (as if disclaimant predeceased). Uses: estate tax planning, generation skipping, let assets pass to more appropriate beneficiary. Can\'t direct where it goes—must follow documents.'
  },
  {
    id: 'CFP-EST-B10-024',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Asset Title',
    subtopic: 'Funding Revocable Trusts',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Properly funding a revocable living trust requires:',
    options: [
      'A) Simply signing the trust document',
      'B) Retitling assets to the trust name, changing beneficiary designations if appropriate, and updating as assets change',
      'C) Only real estate transfer',
      'D) Attorney retitles everything'
    ],
    correctAnswer: 1,
    explanation: 'Trust funding: the essential but often neglected step. Real estate: new deed to trust. Financial accounts: change title to trust. Vehicles: may or may not transfer (state-specific). Beneficiary designations: to trust or individuals. Ongoing: new assets to trust. Unfunded trust: assets still probate. Common mistake: sign trust, never transfer assets. Professional help often needed for proper funding.'
  },
  {
    id: 'CFP-EST-B10-025',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Self-Proving Affidavit',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A self-proving affidavit attached to a will:',
    options: [
      'A) Makes the will irrevocable',
      'B) Eliminates need for witnesses to testify at probate by providing notarized confirmation of proper execution',
      'C) Replaces witnesses',
      'D) Avoids probate entirely'
    ],
    correctAnswer: 1,
    explanation: 'Self-proving affidavit: witnesses and testator sign notarized statement that will was properly executed. Benefit: at probate, no need to locate witnesses or have them testify. Most states recognize. Executed at same time as will signing. Simplifies and speeds probate. Doesn\'t change witnesses requirement—just eliminates later testimony need. Standard practice in modern wills.'
  }
];
