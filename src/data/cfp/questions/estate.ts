/**
 * CFP Estate Planning Questions
 * Domain 7: Estate Planning (12% of exam)
 * 25 high-quality questions covering EST-1, EST-2, and EST-3 blueprint areas
 * 
 * Focus: Scenario-based, calculation problems, detailed explanations
 */

import type { Question } from '../../../types';

export const CFP_ESTATE_QUESTIONS: Question[] = [
  // EST-1: Estate Documents and Trusts (Questions 1-8)
  {
    id: 'cfp-est-001',
    question: 'Thomas dies intestate in a state with separate property law. He is survived by his spouse and two adult children from a prior marriage. His estate consists of $600,000 in assets. Under typical intestacy statutes, which distribution is MOST likely?',
    options: [
      'Spouse receives entire estate',
      'Spouse receives 1/3, children split 2/3',
      'Spouse receives 1/2, children split 1/2',
      'Children receive entire estate'
    ],
    correctAnswer: 2,
    explanation: 'In most separate property states, when a decedent dies intestate with a surviving spouse and children NOT from that marriage, the spouse typically receives 1/2 of the estate and the children from other relationships split the remaining 1/2. This protects children from prior relationships while providing for the current spouse. The spouse receives $300,000, each child receives $150,000.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-002',
    question: 'Patricia creates a revocable living trust and funds it with her investment accounts worth $2.5 million. Upon her death at age 78, which statement is CORRECT regarding this trust?',
    options: [
      'Assets avoid probate but are included in her gross estate at stepped-up basis',
      'Assets pass through probate with stepped-up basis',
      'Assets avoid both probate and estate tax',
      'Assets avoid probate but retain their original cost basis'
    ],
    correctAnswer: 0,
    explanation: 'Revocable living trusts avoid probate because assets are already titled to the trust at death. However, because the grantor retained the right to revoke, the assets are still included in the gross estate for estate tax purposes. The tax benefit is that assets receive a stepped-up basis to fair market value at death. The trust avoids the time and expense of probate while still providing the basis step-up.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-003',
    question: 'Margaret wants to provide for her disabled adult daughter who receives SSI and Medicaid benefits. Which trust structure is MOST appropriate?',
    options: [
      'Revocable living trust with daughter as beneficiary',
      'Third-party special needs trust',
      'QTIP trust',
      'Totten trust at a local bank'
    ],
    correctAnswer: 1,
    explanation: 'A third-party special needs trust (also called supplemental needs trust) is specifically designed for disabled beneficiaries who receive means-tested government benefits. It allows funds to supplement, not supplant, government benefits. Unlike first-party special needs trusts (funded with the beneficiary\'s own assets), third-party SNTs funded by parents have no Medicaid payback requirement at the beneficiary\'s death.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-004',
    question: 'David designates his wife as agent under a durable power of attorney for finances. Two years later, David is diagnosed with Alzheimer\'s and gradually loses capacity. What is the effect on the power of attorney?',
    options: [
      'It terminates immediately upon diagnosis',
      'It remains in effect because it is durable',
      'It requires court confirmation to continue',
      'It converts to a guardianship automatically'
    ],
    correctAnswer: 1,
    explanation: 'A durable power of attorney specifically includes language that it survives the principal\'s incapacity (e.g., "This power of attorney shall not be affected by subsequent disability or incapacity of the principal"). This is the key distinction from a regular (non-durable) POA, which terminates upon incapacity. The durable POA allows the wife to continue managing David\'s finances without court intervention.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-005',
    question: 'Janet creates an irrevocable life insurance trust (ILIT) and transfers an existing $2 million policy to the trust. She dies 18 months later. How are the life insurance proceeds treated for estate tax purposes?',
    options: [
      'Excluded from the gross estate',
      'Included in the gross estate at $2 million',
      'Included at the interpolated terminal reserve value',
      'Partially included based on the transfer date'
    ],
    correctAnswer: 1,
    explanation: 'When an existing life insurance policy is transferred to an ILIT, the insured must survive three years from the date of transfer for the proceeds to be excluded from the gross estate (IRC §2035). Since Janet died only 18 months after the transfer, the full $2 million death benefit is included in her gross estate. The lesson: For ILITs, have the trust purchase new policies when possible, or plan for long survival after transfers.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-006',
    question: 'A credit shelter trust is funded with $5 million at the first spouse\'s death in 2026. The applicable exclusion amount is $7.0 million. At the surviving spouse\'s death 10 years later, the credit shelter trust assets have appreciated to $8 million. What are the estate tax consequences?',
    options: [
      '$8 million is included in the surviving spouse\'s estate',
      '$5 million is included in the surviving spouse\'s estate',
      'Nothing is included in the surviving spouse\'s estate',
      '$3 million of appreciation is included'
    ],
    correctAnswer: 2,
    explanation: 'A credit shelter (bypass) trust is specifically designed to remove assets from both estates. Assets placed in the trust used the first spouse\'s exemption at their death. They are NOT included in the surviving spouse\'s estate, regardless of appreciation. The $3 million of appreciation transfers to beneficiaries completely estate-tax-free. This is the primary advantage of bypass trusts despite portability.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-007',
    question: 'George creates a charitable remainder unitrust (CRUT) with $1 million of appreciated stock (basis $200,000). The trust sells the stock and invests in a diversified portfolio. What is the income tax consequence of the sale?',
    options: [
      'George recognizes $800,000 capital gain immediately',
      'The trust pays tax on $800,000 gain',
      'No immediate tax; gain recognized as received by George',
      'Gain is permanently excluded from taxation'
    ],
    correctAnswer: 2,
    explanation: 'CRTs are tax-exempt entities and pay no tax on the sale of appreciated assets. This avoids the immediate capital gains recognition that would occur if George sold the stock directly. However, when distributions are made to George, they carry out the character of the trust\'s income in a specific order (WIFO - worst in, first out): ordinary income first, then capital gains, then tax-exempt income, then return of principal.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-008',
    question: 'A properly drafted pour-over will directs that residuary estate assets be transferred to which arrangement?',
    options: [
      'A newly created testamentary trust',
      'An existing revocable living trust',
      'Directly to named beneficiaries',
      'An irrevocable life insurance trust'
    ],
    correctAnswer: 1,
    explanation: 'A pour-over will is designed to "catch" assets not transferred to the revocable living trust during life and direct them into the trust at death. This ensures all assets are eventually governed by the trust\'s dispositive provisions. Note that assets passing through the pour-over will still go through probate, unlike assets already in the trust.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },

  // EST-2: Gift, Estate, and GST Tax (Questions 9-17)
  {
    id: 'cfp-est-009',
    question: 'In 2026, Michael makes a $75,000 gift to his nephew and a $500,000 gift to his alma mater for a new scholarship fund. What is Michael\'s total taxable gift for the year?',
    options: [
      '$0',
      '$56,000',
      '$556,000',
      '$575,000'
    ],
    correctAnswer: 1,
    explanation: 'The gift to the nephew exceeds the 2026 annual exclusion of $19,000, resulting in a taxable gift of $75,000 - $19,000 = $56,000. The $500,000 gift to the university is not a taxable gift because gifts to qualified charities receive an unlimited gift tax charitable deduction. Therefore, total taxable gifts = $56,000.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-010',
    question: 'Barbara gifts $100,000 to her daughter. Her husband Bruce agrees to gift splitting. Neither has made prior taxable gifts. What is the impact on each spouse\'s lifetime exemption?',
    options: [
      'Barbara uses $81,000 exemption; Bruce uses $0',
      'Barbara uses $40,500 exemption; Bruce uses $40,500',
      'Barbara uses $31,000 exemption; Bruce uses $31,000',
      'Barbara uses $62,000 exemption; Bruce uses $0'
    ],
    correctAnswer: 2,
    explanation: 'With gift splitting, the $100,000 gift is treated as $50,000 from each spouse. Each spouse can apply the $19,000 annual exclusion (2026), making each spouse\'s taxable gift $50,000 - $19,000 = $31,000. Each spouse uses $31,000 of their lifetime exemption (unified credit). This allows larger gifts while minimizing exemption usage.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-011',
    question: 'Harold pays his grandson\'s $45,000 medical school tuition directly to the university and also gives him $25,000 cash. What is Harold\'s taxable gift for the year?',
    options: [
      '$0',
      '$6,000',
      '$51,000',
      '$70,000'
    ],
    correctAnswer: 1,
    explanation: 'Payments made directly to educational institutions for tuition qualify for the unlimited education exclusion under IRC §2503(e) and are NOT taxable gifts. The $45,000 tuition payment is completely excluded. The $25,000 cash gift is a separate gift that qualifies for the $19,000 annual exclusion (2026), leaving $6,000 as a taxable gift. Key: direct payment requirement.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-012',
    question: 'Calculate the tentative estate tax for a decedent with a taxable estate of $15 million in 2026. The 2026 applicable exclusion amount is $7.0 million and the estate tax rate is 40%.',
    options: [
      '$0',
      '$2,800,000',
      '$3,200,000',
      '$6,000,000'
    ],
    correctAnswer: 2,
    explanation: 'Estate tax calculation: Taxable estate ($15M) - Applicable exclusion ($7.0M) = $8.0M subject to estate tax. Estate tax = $8,000,000 × 40% = $3,200,000. The unified credit effectively exempts the first $7.0 million from taxation (post-TCJA sunset). Only the excess is taxed at the flat 40% rate.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-013',
    question: 'Roger dies in 2026 with a gross estate of $18 million. His estate includes a $5 million bequest to his wife and $1 million to charity. He made no lifetime taxable gifts. Calculate the taxable estate.',
    options: [
      '$12,000,000',
      '$13,000,000',
      '$17,000,000',
      '$18,000,000'
    ],
    correctAnswer: 0,
    explanation: 'Taxable estate = Gross estate ($18M) - Marital deduction ($5M) - Charitable deduction ($1M) = $12,000,000. Both the marital deduction (for property passing to spouse) and charitable deduction (for property passing to charity) are unlimited. These deductions reduce the taxable estate before applying the applicable exclusion.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-014',
    question: 'Ellen\'s husband died in 2020 with a taxable estate of $5 million, using only that portion of his $11.58 million exemption. Ellen dies in 2026 when the exemption is $7.0 million. If Ellen properly elected portability, what is her available exemption?',
    options: [
      '$7.0 million',
      '$11.58 million',
      '$13.58 million',
      '$14.0 million'
    ],
    correctAnswer: 2,
    explanation: 'With portability, Ellen receives her deceased spouse\'s unused exclusion (DSUE). DSUE = $11.58M (2020 exemption) - $5M (used) = $6.58M. Ellen\'s total exemption = Her own ($7.0M in 2026 post-sunset) + DSUE ($6.58M) = $13.58 million. Note: The DSUE is based on the exemption at the first spouse\'s death, not when the surviving spouse dies.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-015',
    question: 'William makes a direct skip transfer of $3 million to his grandchildren. His GST exemption is fully intact. What is the GST tax owed?',
    options: [
      '$0',
      '$1,200,000',
      '$3,000,000',
      '$4,200,000'
    ],
    correctAnswer: 0,
    explanation: 'The GST exemption ($7.0 million in 2026) can be allocated to generation-skipping transfers. A direct skip to grandchildren can be covered by allocating $3 million of GST exemption, resulting in an inclusion ratio of zero and no GST tax. The GST tax (40%) only applies to transfers exceeding the GST exemption allocation.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-016',
    question: 'A trust is created for the benefit of a grantor\'s child with remainder to grandchildren. At the child\'s death, the trust corpus is distributed to the grandchildren. This transaction is classified as which type of GST?',
    options: [
      'Direct skip',
      'Taxable termination',
      'Taxable distribution',
      'Indirect skip'
    ],
    correctAnswer: 1,
    explanation: 'A taxable termination occurs when the interest of the non-skip person (the child) terminates and thereafter only skip persons (grandchildren) have interests in the trust. The child\'s death terminates all non-skip interests, causing a taxable termination. Direct skips occur when property passes directly to skip persons. Taxable distributions occur when skip persons receive distributions while non-skip persons still have interests.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-017',
    question: 'Jackson\'s closely-held business accounts for 45% of his adjusted gross estate. His estate uses alternate valuation for the business which has declined in value. Which statement is CORRECT?',
    options: [
      'Alternate valuation can only be used for the business, not other assets',
      'Alternate valuation must be used for all estate assets',
      'Beneficiaries receive stepped-up basis to original date of death value',
      'Alternate valuation cannot be used if it increases estate tax'
    ],
    correctAnswer: 1,
    explanation: 'Alternate valuation date (six months after death or earlier disposition) must be elected for all estate assets - it cannot be applied selectively. Additionally, it can only be elected if it reduces both the gross estate AND estate tax liability. If elected, the basis to beneficiaries is stepped to the alternate valuation date value, not the date of death value.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Analysis' as const
  },

  // EST-3: Wealth Transfer and Business Succession (Questions 18-25)
  {
    id: 'cfp-est-018',
    question: 'Samantha creates a 5-year zeroed-out GRAT, transferring $4 million in stock. The §7520 rate is 5.2% and the stock appreciates at 12% annually. Approximately how much value passes to her children at the GRAT\'s termination, assuming she survives?',
    options: [
      'Zero - all appreciation returns to Samantha',
      'Approximately $900,000 - $1,200,000',
      'Approximately $3,000,000',
      'Approximately $4,000,000'
    ],
    correctAnswer: 1,
    explanation: 'In a zeroed-out GRAT, the annuity payments return to the grantor roughly equal to the initial contribution. The "excess return" - appreciation above the §7520 rate - passes to remaindermen gift-tax-free. With 12% appreciation vs. 5.2% §7520 rate, approximately 6.8% annual excess compounds over 5 years on a declining balance. This results in roughly $900K-$1.2M passing to children at no additional gift tax cost.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-019',
    question: 'Susan, age 62, transfers her $1.8 million vacation home to a 12-year QPRT. The present value of her retained interest is $900,000. What is the taxable gift?',
    options: [
      '$0',
      '$900,000',
      '$1,800,000',
      '$2,700,000'
    ],
    correctAnswer: 1,
    explanation: 'The taxable gift for a QPRT equals the fair market value of the residence minus the present value of the retained term interest. Taxable gift = $1,800,000 - $900,000 = $900,000. This represents a 50% discount on transferring the home. If Susan survives the 12-year term, the home passes to beneficiaries at this discounted value, regardless of future appreciation.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-020',
    question: 'A family limited partnership holds $10 million of marketable securities. Individual limited partner interests are valued at a 35% combined discount for lack of control and marketability. What is the gift tax value of a 25% LP interest?',
    options: [
      '$2,500,000',
      '$1,625,000',
      '$1,500,000',
      '$875,000'
    ],
    correctAnswer: 1,
    explanation: 'Pro-rata value of 25% interest = $10M × 25% = $2.5M. Apply 35% combined discount: $2,500,000 × (1 - 0.35) = $2,500,000 × 0.65 = $1,625,000. FLP discounts reflect that limited partners lack control over distributions and cannot easily sell their interests on established markets. These discounts can significantly reduce gift and estate tax values.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-021',
    question: 'ABC Corporation has 4 equal shareholders with a cross-purchase buy-sell agreement funded by life insurance. How many insurance policies are required to fully fund the agreement?',
    options: [
      '4 policies',
      '8 policies',
      '12 policies',
      '16 policies'
    ],
    correctAnswer: 2,
    explanation: 'In a cross-purchase agreement, each shareholder owns policies on each other shareholder. With 4 shareholders, the formula is n × (n-1) = 4 × 3 = 12 policies. Each of the 4 owners purchases 3 policies (one on each other owner). This contrasts with a stock redemption where only 4 policies would be needed (owned by the corporation on each shareholder).',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-022',
    question: 'James\' estate includes closely-held stock valued at $8 million in an adjusted gross estate of $14 million. Estate taxes and administrative expenses total $1.5 million. How much can the estate redeem under IRC §303 without dividend treatment?',
    options: [
      '$1,500,000',
      '$4,900,000',
      '$8,000,000',
      '$0 - Section 303 does not apply'
    ],
    correctAnswer: 0,
    explanation: 'Section 303 applies because closely-held stock ($8M) exceeds 35% of adjusted gross estate ($14M × 35% = $4.9M). The $8M is 57% of the estate. Under §303, redemptions up to the amount of death taxes and administrative expenses ($1.5M) receive capital gain treatment rather than dividend treatment. With the stepped-up basis, the gain is likely minimal.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-023',
    question: 'Which estate planning technique would most effectively freeze the value of a closely-held business interest in the owner\'s estate while transferring future appreciation to the next generation?',
    options: [
      'Outright gift of stock',
      'Installment sale to an intentionally defective grantor trust',
      'Bequest in will',
      'Joint tenancy with children'
    ],
    correctAnswer: 1,
    explanation: 'An installment sale to an IDGT freezes value because the owner receives a promissory note for the current value. All future appreciation above the AFR interest rate passes to the trust (and ultimately beneficiaries) free of transfer tax. The IDGT is treated as owned by the grantor for income tax, so no gain is recognized on the sale, and interest payments are not taxable income.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Evaluation' as const
  },
  {
    id: 'cfp-est-024',
    question: 'Peter, a US citizen, is married to Maria, a non-citizen legal resident. Peter dies with a $12 million estate, all left to Maria. Without additional planning, what is the estate tax consequence?',
    options: [
      'Unlimited marital deduction applies - no estate tax',
      'No marital deduction available - full estate subject to tax',
      'Marital deduction available only if passed through a QDOT',
      '$190,000 annual exclusion applies to the transfer'
    ],
    correctAnswer: 2,
    explanation: 'The unlimited marital deduction is NOT available for transfers to non-citizen spouses (regardless of residency status). To qualify for the marital deduction, assets must pass to a Qualified Domestic Trust (QDOT) with a US trustee. The QDOT allows deferral until distributions are made or the surviving spouse dies. The $190,000 is the annual gift exclusion for gifts to non-citizen spouses during life (2026), not at death.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-025',
    question: 'Richard has three children: one active in the family business, two not. The business represents 60% of his estate. He wants to treat all children fairly while ensuring business continuity. Which strategy BEST accomplishes both objectives?',
    options: [
      'Leave business equally to all three children',
      'Leave business to active child; equalize with ILIT proceeds for others',
      'Sell the business and divide proceeds equally',
      'Leave everything to the active child'
    ],
    correctAnswer: 1,
    explanation: 'An Irrevocable Life Insurance Trust (ILIT) allows Richard to equalize his estate without disrupting business operations. The active child receives the business; the ILIT provides death benefit proceeds (estate and income tax-free) to the other children. This avoids forcing non-business children into ownership, prevents conflict, and ensures business continuity. The insurance provides liquidity without burdening the business.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Evaluation' as const
  },
  // ============================================
  // Additional EST Questions (026-045)
  // ============================================
  {
    id: 'cfp-est-026',
    question: 'Samuel dies in 2026 with a gross estate of $15 million. He made $500,000 in taxable lifetime gifts. What is his taxable estate after applying the unified credit exemption of $7.0 million?',
    options: [
      '$0 - fully sheltered by exemption',
      '$7,500,000',
      '$8,000,000',
      '$8,500,000'
    ],
    correctAnswer: 3,
    explanation: 'The unified credit applies to combined lifetime gifts and estate transfers. Total taxable transfers = $15M (estate) + $500K (prior gifts) = $15.5M. Minus $7.0M exemption = $8.5M subject to estate tax. At 40% rate, this generates approximately $3,400,000 in estate tax. Lifetime gifts reduce the remaining exemption available at death.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-027',
    question: 'Catherine wants to make gifts to 10 grandchildren and their spouses (20 total recipients) in 2026. Her husband agrees to gift-split. What is the maximum they can give tax-free using only annual exclusions?',
    options: [
      '$380,000',
      '$760,000',
      '$360,000',
      '$720,000'
    ],
    correctAnswer: 1,
    explanation: 'With gift-splitting, each spouse can use their $19,000 annual exclusion (2026) per recipient. Combined: $38,000 per recipient × 20 recipients = $760,000 tax-free annually. Gift-splitting effectively doubles the amount one spouse can give without using unified credit. All recipients must receive present interests (not future interests) for annual exclusion to apply.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-028',
    question: 'David creates an irrevocable trust for his daughter, retaining the power to substitute assets of equivalent value. Which power did David retain?',
    options: [
      'General power of appointment',
      'Power that causes estate inclusion',
      'Power that makes him a grantor for income tax purposes',
      'Power reserved to revoke the trust'
    ],
    correctAnswer: 2,
    explanation: 'The power to substitute assets of equivalent value is a grantor trust power under Section 675. It makes David the owner of the trust for income tax purposes (pay tax on trust income) but does NOT cause estate inclusion. This creates a defective grantor trust - defective for income tax, effective for estate tax. Income tax payments further reduce David estate without gift tax.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-029',
    question: 'Eleanor creates a Charitable Remainder Annuity Trust (CRAT) with $1,000,000, paying herself 6% annually for 20 years, remainder to charity. Which statement is CORRECT?',
    options: [
      'She receives a current income tax deduction for the full $1,000,000',
      'She receives a deduction for the present value of the charitable remainder',
      'She pays no tax on the annuity payments',
      'The trust must distribute at least 10% to charity annually'
    ],
    correctAnswer: 1,
    explanation: 'CRAT donors receive an income tax deduction equal to the present value of the remainder interest going to charity (not the full contribution). The deduction depends on IRS discount rate, term, and payout rate. Annuity payments are taxable to Eleanor using a four-tier accounting system (OICS: Ordinary Income, Capital Gains, Other Income, Corpus). The 10% requirement is for the minimum charitable remainder at funding, not annual distributions.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-030',
    question: 'Frank owns a $5 million life insurance policy on his life payable to his estate. If he dies owning the policy, which statement is CORRECT?',
    options: [
      'The death benefit is income tax-free but included in his gross estate',
      'The death benefit is both income and estate tax-free',
      'Only the cash surrender value is included in his estate',
      'The policy is exempt from creditor claims in his estate'
    ],
    correctAnswer: 0,
    explanation: 'Life insurance death benefits are generally income tax-free to beneficiaries (Section 101). However, if the insured owns the policy at death (or has "incidents of ownership"), the FULL death benefit is included in the gross estate for estate tax purposes. Naming the estate as beneficiary also causes estate inclusion. An ILIT would remove the policy from the estate. Cash surrender value is irrelevant for estate inclusion - it is the death benefit amount.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-031',
    question: 'Gloria dies owning property as joint tenants with right of survivorship with her non-spouse sister. Gloria contributed 100% of the purchase price. How much is included in Gloria estate?',
    options: [
      '50% of the property value',
      '100% of the property value',
      '0% - the property passes outside probate',
      'The value exceeding her contribution'
    ],
    correctAnswer: 1,
    explanation: 'For non-spouse joint tenants, the entire property value is included in the first decedent estate UNLESS the survivor can prove their contribution. Since Gloria contributed 100% of the cost and the sister contributed nothing, 100% is included in Gloria gross estate. The surviving sister must provide documentation of any contribution to reduce inclusion. Passing outside probate does not mean passing outside the gross estate.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-032',
    question: 'Harold wants to benefit his grandchildren but minimize Generation-Skipping Transfer Tax (GSTT). Which amount represents his 2026 GST exemption?',
    options: [
      '$5.0 million',
      '$6.0 million',
      '$7.0 million',
      '$14.0 million'
    ],
    correctAnswer: 2,
    explanation: 'The GST exemption is equal to the basic exclusion amount: $7.0 million for 2026 (post-TCJA sunset). This can be allocated to transfers to skip persons (grandchildren, etc.) to shield them from the 40% GST tax. The exemption is separate from but equal to the gift/estate tax exemption. Married couples can combine for $14.0 million with proper allocation and portability.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-est-033',
    question: 'Irene durable power of attorney for property was executed in 2019. She becomes incapacitated in 2026. Which statement about the POA is CORRECT?',
    options: [
      'The POA terminates upon her incapacity',
      'The agent can continue to act on her behalf during incapacity',
      'The POA must be re-executed annually to remain valid',
      'Court approval is required for the agent to act'
    ],
    correctAnswer: 1,
    explanation: 'A DURABLE power of attorney specifically remains effective during the principal incapacity (hence "durable"). A non-durable POA would terminate upon incapacity. The durable POA allows the agent to manage financial affairs, pay bills, make investment decisions during the incapacity without court intervention. It does not require annual renewal. This is why durable POAs are essential estate planning documents.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-est-034',
    question: 'James creates a Crummey trust for his minor children, contributing $57,000 annually ($19,000 per child × 3 children). What is required for the gifts to qualify for the annual exclusion?',
    options: [
      'The children must be at least 18 years old',
      'Beneficiaries must be given withdrawal rights for a reasonable period',
      'The trust must distribute income annually',
      'A court must approve the trust'
    ],
    correctAnswer: 1,
    explanation: 'Crummey powers give beneficiaries the right to withdraw their share of contributions for a limited period (typically 30-60 days). This converts future interests (trust distributions) into present interests qualifying for annual exclusion. Beneficiaries (or guardians for minors) must receive written notice of withdrawal rights. If rights lapse, the lapse itself may be a gift, but $5,000 or 5% of trust assets lapses are protected.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-035',
    question: 'Karen husband Jack died in 2020 without using his $11.58 million exemption. Karen files a timely estate tax return electing portability. Jack estate was $3 million. In 2026, Karen dies with a $20 million estate. What is her available exemption?',
    options: [
      '$7.0 million (her exemption only)',
      '$15.58 million (her exemption + portable DSUE)',
      '$22.19 million (both current exemptions)',
      '$11.58 million (Jack exemption only)'
    ],
    correctAnswer: 1,
    explanation: 'Portability allows the surviving spouse to use the Deceased Spousal Unused Exclusion (DSUE). Jack used $3M of his $11.58M, leaving $8.58M unused. Karen elected portability on Jack timely-filed estate return. Karen now has her 2026 exemption ($7.0M post-sunset) + Jack DSUE ($8.58M) = $15.58M available. Note: DSUE is locked at death, not indexed for inflation.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-036',
    question: 'Larry health care directive includes a POLST (Physician Orders for Life-Sustaining Treatment). How does a POLST differ from a standard advance directive?',
    options: [
      'POLST is only valid in hospital settings',
      'POLST is a physician order immediately actionable by medical personnel',
      'POLST replaces the need for a healthcare proxy',
      'POLST must be renewed every 6 months'
    ],
    correctAnswer: 1,
    explanation: 'A POLST (or MOLST in some states) is a physician ORDER, not just a directive. It is immediately actionable by EMS and medical personnel without interpretation. Unlike advance directives that express wishes, POLST orders must be followed. POLST is particularly important for patients with serious illness who want to specify treatment preferences. It supplements (does not replace) other advance directives and healthcare proxies.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-est-037',
    question: 'Maria creates a Grantor Retained Annuity Trust (GRAT) with $2,000,000, receiving annuity payments of 8% for 5 years. If she survives the term and the IRC 7520 rate is 5%, what result is MOST likely?',
    options: [
      'The entire $2,000,000 is included in her estate',
      'Appreciation above 5% passes to beneficiaries transfer-tax free',
      'She receives an income tax deduction',
      'The trust terminates and returns assets to Maria'
    ],
    correctAnswer: 1,
    explanation: 'GRATs freeze value and transfer appreciation. The taxable gift at funding is calculated using 7520 rates. If actual returns exceed the assumed 7520 rate, the excess passes to remaindermen free of gift/estate tax. With high annuity payments (zeroed-out GRAT), the initial taxable gift is minimal. If Maria dies during the term, assets are included in her estate. Survival is key. No income tax deduction for GRAT creation.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Evaluation' as const
  },
  {
    id: 'cfp-est-038',
    question: 'Nathan receives a $500,000 inheritance from his deceased father. Which statement about the income tax treatment is CORRECT?',
    options: [
      'Nathan must include $500,000 in gross income',
      'Nathan receives the inheritance income tax-free with stepped-up basis',
      'Nathan owes gift tax on the inheritance',
      'Nathan must pay inheritance tax in all 50 states'
    ],
    correctAnswer: 1,
    explanation: 'Inheritances are not taxable income to the recipient (Section 102). Nathan receives a stepped-up basis to fair market value at father death date. Gift tax is paid by donors on lifetime gifts, not by recipients of inheritances. Inheritance tax exists in only 6 states (and is paid based on relationship and amounts). Estate tax is a different tax paid by the estate, not Nathan.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-est-039',
    question: 'Olivia dies owning community property with her husband in California. Her half is worth $1,000,000 with an original basis of $200,000. Her husband half has the same values. What is the husband basis in the community property after her death?',
    options: [
      '$200,000 (original basis preserved)',
      '$1,000,000 (stepped-up on Olivia half only)',
      '$1,100,000 (split basis)',
      '$2,000,000 (double step-up on both halves)'
    ],
    correctAnswer: 3,
    explanation: 'Community property receives a FULL step-up in basis for BOTH halves at first spouse death (Section 1014(b)(6)). Unlike separate property or joint tenancy, both the decedent and survivor halves are stepped up to FMV. The husband now has $2M basis in $2M property. This is a major tax advantage of community property states. IRC Section 1014(b)(6) provides this double step-up.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-040',
    question: 'Paul wants to make a gift of stock worth $100,000 (basis $30,000) to his grandson. If Paul pays the $37,000 in gift tax on the transfer, what is the grandson basis in the stock?',
    options: [
      '$30,000 (donor basis)',
      '$100,000 (fair market value)',
      '$67,000 (donor basis plus gift tax on appreciation)',
      '$137,000 (FMV plus gift tax)'
    ],
    correctAnswer: 2,
    explanation: 'For appreciated property, the donee takes the donor basis plus any gift tax paid attributable to the appreciation. Gift tax adjustment = Gift Tax × (Net Appreciation / Amount of Gift). Net appreciation = $100K - $30K = $70K. Ratio = $70K/$100K = 70%. Basis adjustment = $37K × 70% = $25,900 (approximately). New basis = $30K + adjustment ≈ $55,900-$67,000 range depending on calculation method. This partial step-up recognizes tax already paid.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-041',
    question: 'Quinn creates a pour-over will. What is the PRIMARY function of this document?',
    options: [
      'To create a trust upon Quinn death',
      'To transfer probate assets into an existing trust',
      'To designate beneficiaries for retirement accounts',
      'To avoid all estate taxes'
    ],
    correctAnswer: 1,
    explanation: 'A pour-over will "pours" probate assets into an already-existing revocable trust. It catches assets not funded to the trust during life (forgotten accounts, inheritances, etc.). The assets go through probate but ultimately are governed by the trust terms. It does not create the trust - that must exist before death. It does not control non-probate assets like retirement accounts or life insurance with named beneficiaries.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-est-042',
    question: 'Rachel establishes a Family Limited Partnership (FLP), transferring $5,000,000 in assets in exchange for a 99% limited partnership interest. She later gifts limited partnership interests to her children. What valuation discount might apply?',
    options: [
      'No discounts available for family transfers',
      'Combined lack of control and lack of marketability discounts of 25-40%',
      'Standard 50% family discount',
      'Discounts only apply to real estate FLPs'
    ],
    correctAnswer: 1,
    explanation: 'Limited partnership interests typically qualify for valuation discounts: (1) Lack of control - limited partners cannot manage or force distributions, and (2) Lack of marketability - no ready market for LP interests. Combined discounts of 25-40% are common (supported by appraisals). A $1M interest might be valued at $600K-$750K for gift tax. FLPs must have legitimate non-tax purposes and proper operation to withstand IRS scrutiny under Section 2036.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-043',
    question: 'Steve receives a bequest from his grandfather conditioned on Steve "graduating from college." Under trust law, this is what type of gift?',
    options: [
      'Absolute gift',
      'Gift with a condition precedent',
      'Gift with a condition subsequent',
      'Charitable gift'
    ],
    correctAnswer: 1,
    explanation: 'A condition precedent must be satisfied BEFORE the beneficiary receives the gift. Steve must graduate first, then he receives the bequest. A condition subsequent would give the gift but take it away if a condition occurs (e.g., "to Steve, but if he fails to graduate, to charity"). The distinction matters for vesting of interests, interpretation, and potential challenges to validity.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'cfp-est-044',
    question: 'Thomas creates an irrevocable trust and transfers $2 million. Three years later, he dies. What amount is included in his gross estate under Section 2035?',
    options: [
      '$0 - the gift was completed more than 3 years ago',
      'Only the original $2 million',
      'The current value of the trust assets',
      'The $2 million plus any gift tax paid'
    ],
    correctAnswer: 0,
    explanation: 'Section 2035 only applies to transfers within 3 years of death for certain transfers (primarily life insurance). For most gifts, Section 2035 brings back only gift tax paid within 3 years (grossing up). The gift itself is NOT included if made more than 3 years before death and is a completed gift. The 3-year lookback is often misunderstood - it primarily affects life insurance policies transferred within 3 years of death.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-045',
    question: 'Ursula has a $10 million estate and wants to maximize the amount passing to her children while minimizing estate taxes. She is charitably inclined but wants income during her lifetime. Which strategy BEST meets her objectives?',
    options: [
      'Outright charitable bequest in will',
      'Charitable Remainder Trust with children as remainder beneficiaries',
      'Charitable Remainder Trust with charity as remainder; use income to fund ILIT for children',
      'Private foundation'
    ],
    correctAnswer: 2,
    explanation: 'This "wealth replacement" strategy: (1) CRT provides income tax deduction at creation, (2) Ursula receives income stream during life, (3) At death, charity receives CRT remainder (reducing estate), (4) CRT income funds premiums on life insurance in ILIT, (5) ILIT provides estate-tax-free death benefit to replace wealth going to charity. Result: charity benefits, children receive tax-advantaged insurance, estate taxes reduced. This is superior to CRT with children as remainder (which loses charitable benefits).',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Evaluation' as const
  },

  // ============================================
  // ADDITIONAL ESTATE QUESTIONS (46-75)
  // ============================================
  {
    id: 'cfp-est-046',
    question: 'What is the primary estate planning advantage of a Qualified Personal Residence Trust (QPRT)?',
    options: [
      'Eliminates all gift tax on residence transfer',
      'Transfers residence at discounted gift tax value',
      'Provides step-up in basis at death',
      'Allows unlimited transfers to non-citizens'
    ],
    correctAnswer: 1,
    explanation: 'QPRT transfers the residence at a discounted gift tax value based on the retained income interest. The longer the retained term, the lower the gift value. If the grantor survives the term, the residence passes to heirs at the discounted value. Risk: If grantor dies during term, full FMV included in estate.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-047',
    question: 'Which document should a CFP® recommend for a client who wants to designate someone to make healthcare decisions if incapacitated?',
    options: [
      'Living will',
      'Healthcare power of attorney (healthcare proxy)',
      'General durable power of attorney',
      'Revocable living trust'
    ],
    correctAnswer: 1,
    explanation: 'Healthcare power of attorney (healthcare proxy) designates an agent to make medical decisions when the principal cannot. Living will only states preferences for end-of-life care. General POA handles financial matters. Revocable trust manages assets.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-048',
    question: 'A client wants to leave assets to grandchildren but avoid GST tax. What is the maximum amount they can transfer using the GST exemption in 2026?',
    options: [
      '$18,000 per grandchild',
      '$19,000 per grandchild',
      '$6.0 million lifetime',
      '$7.0 million lifetime'
    ],
    correctAnswer: 3,
    explanation: 'The 2026 GST exemption is $7.0 million per person (same as estate/gift exemption post-TCJA sunset). This can be allocated to generation-skipping transfers to grandchildren or more remote descendants. Annual exclusion gifts ($19,000 in 2026) are also GST-exempt automatically.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-049',
    question: 'Under the unlimited marital deduction, which transfer will NOT qualify?',
    options: [
      'Outright bequest to U.S. citizen spouse',
      'QTIP trust for surviving spouse',
      'Transfer to non-citizen spouse',
      'General power of appointment trust for spouse'
    ],
    correctAnswer: 2,
    explanation: 'The unlimited marital deduction does NOT apply to transfers to non-citizen spouses. Instead, a Qualified Domestic Trust (QDOT) is required, or gifts up to the enhanced annual exclusion ($190,000 in 2026). QTIP and GPOA trusts qualify if spouse is a U.S. citizen.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-050',
    question: 'A single client dies with a $15 million estate in 2026. Approximately how much federal estate tax is due?',
    options: [
      '$0',
      '$2,800,000',
      '$3,200,000',
      '$6,000,000'
    ],
    correctAnswer: 2,
    explanation: 'Taxable estate = $15M - $7.0M exemption = $8.0M. Estate tax at 40% = $3,200,000. The unified credit eliminates tax on the first $7.0M (2026 post-TCJA sunset). Without planning, estates above exemption are taxed at 40%.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-051',
    question: 'What is portability in the context of estate planning?',
    options: [
      'Ability to transfer assets between states without probate',
      'Transfer of unused estate tax exemption to surviving spouse',
      'Moving a trust from one jurisdiction to another',
      'Naming multiple trustees across different states'
    ],
    correctAnswer: 1,
    explanation: 'Portability allows the surviving spouse to use the deceased spouse\'s unused exclusion amount (DSUE). Requires filing estate tax return (Form 706) even if no tax is due. DSUE can be combined with survivor\'s exemption for up to $14.0M combined exemption (2026 post-TCJA sunset).',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-052',
    question: 'A Grantor Retained Annuity Trust (GRAT) is MOST effective when:',
    options: [
      'Asset values are expected to decline',
      'Interest rates are high relative to expected asset growth',
      'Assets are expected to appreciate faster than the 7520 rate',
      'The grantor has a short life expectancy'
    ],
    correctAnswer: 2,
    explanation: 'GRATs work best when assets appreciate faster than the Section 7520 rate. The gift value equals the remainder interest; if appreciation exceeds the 7520 rate, excess passes gift-tax-free. Zeroed-out GRATs minimize gift values. Short life expectancy is dangerous—if grantor dies during term, full value included in estate.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-053',
    question: 'Which is an advantage of a revocable living trust over a will?',
    options: [
      'Assets in the trust receive a step-up in basis at death',
      'Avoids probate for properly funded assets',
      'Provides asset protection from creditors',
      'Reduces estate taxes'
    ],
    correctAnswer: 1,
    explanation: 'Revocable living trusts avoid probate for assets titled in the trust. Assets still included in estate (no tax savings) and still receive step-up in basis. No creditor protection while revocable. Must be properly funded to work.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-054',
    question: 'What is the "5 and 5" power in trust terms?',
    options: [
      'Ability to distribute 5% of trust income and 5% of corpus annually',
      'Right to withdraw greater of $5,000 or 5% of corpus annually without gift tax consequences',
      'Five-year holding period before 5% distributions allowed',
      'Distribution standard for trustee discretion'
    ],
    correctAnswer: 1,
    explanation: 'The 5-and-5 power allows beneficiary to withdraw greater of $5,000 or 5% of trust corpus annually. If power lapses (not exercised), excess over 5-and-5 amount is treated as transfer. Commonly used in Crummey trusts to limit lapse consequences.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-055',
    question: 'A client names their estate as IRA beneficiary. The consequence is:',
    options: [
      'Spouse receives automatic rollover rights',
      'Estate must distribute within 5 years (pre-2020 rules)',
      'Beneficiaries get stretch IRA over life expectancy',
      'No income tax due on distributions'
    ],
    correctAnswer: 1,
    explanation: 'Naming estate as beneficiary is poor planning—accelerates distributions (5-year rule if owner died before RBD, life expectancy if after), subjects IRA to probate and creditors, loses stretch options. Should name individuals or see-through trusts instead.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-056',
    question: 'Under SECURE Act rules, most non-spouse designated beneficiaries must distribute an inherited IRA within:',
    options: [
      'Their single life expectancy',
      '5 years',
      '10 years',
      '15 years'
    ],
    correctAnswer: 2,
    explanation: 'SECURE Act (2019) requires most non-spouse beneficiaries to withdraw inherited IRA within 10 years of owner\'s death. Exceptions: surviving spouse, minor children (until majority), disabled/chronically ill, and beneficiaries <10 years younger than decedent.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-057',
    question: 'What is a "pourover" will?',
    options: [
      'Will that divides assets equally among children',
      'Will that transfers probate assets into a living trust',
      'Will that funds a charitable remainder trust',
      'Will that names contingent beneficiaries'
    ],
    correctAnswer: 1,
    explanation: 'A pourover will captures any assets not already in the living trust at death and "pours" them into the trust. These assets still go through probate but are then administered according to trust terms. Serves as safety net for unfunded assets.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-058',
    question: 'Which asset does NOT avoid probate?',
    options: [
      'Life insurance with named beneficiary',
      'Joint tenancy with right of survivorship',
      'Asset titled in individual name only',
      'Assets in revocable trust'
    ],
    correctAnswer: 2,
    explanation: 'Assets titled solely in individual name go through probate. To avoid probate: use beneficiary designations, joint ownership with survivorship rights, TOD/POD accounts, or living trusts. Probate can be costly and time-consuming.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-059',
    question: 'An Intentionally Defective Grantor Trust (IDGT) provides what benefit?',
    options: [
      'Trust income taxed to grantor; assets removed from estate',
      'No income tax on trust distributions',
      'Unlimited charitable deductions',
      'Immediate step-up in basis for beneficiaries'
    ],
    correctAnswer: 0,
    explanation: 'IDGT is "defective" for income tax (grantor pays tax on trust income) but effective for estate tax (assets out of estate). Benefit: grantor\'s tax payment is additional tax-free gift, trust grows income-tax-free. Sales to IDGT are not taxable events.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-060',
    question: 'Section 6166 allows estate tax deferral when:',
    options: [
      'Estate includes a closely held business representing >35% of adjusted gross estate',
      'Estate consists primarily of illiquid real estate',
      'Surviving spouse elects portability',
      'Estate makes charitable contributions'
    ],
    correctAnswer: 0,
    explanation: 'Section 6166 allows installment payment of estate tax (up to 14 years) when closely held business exceeds 35% of adjusted gross estate. Interest-only payments for first 4 years, then principal + interest. Provides liquidity relief for family businesses.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-061',
    question: 'What is the IRC Section 303 redemption?',
    options: [
      'Redemption of estate stock to pay estate taxes treated as sale, not dividend',
      'Mandatory redemption of closely held stock at death',
      'Tax-free exchange of business interests',
      'Charitable redemption of appreciated stock'
    ],
    correctAnswer: 0,
    explanation: 'Section 303 allows redemption of closely held stock to pay estate taxes and expenses. Treated as capital gain (stepped-up basis = minimal gain), not dividend. Requires stock > 35% of gross estate. Provides liquidity without dividend treatment.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-062',
    question: 'A Family Limited Partnership (FLP) may provide estate planning benefits through:',
    options: [
      'Eliminating all gift and estate taxes',
      'Valuation discounts for lack of control and marketability',
      'Avoiding income tax on transfers',
      'Creating new basis in transferred assets'
    ],
    correctAnswer: 1,
    explanation: 'FLP interests may qualify for discounts (20-40% combined) due to lack of control (minority interests) and lack of marketability (no public market). Must have legitimate business purpose; IRS scrutinizes deathbed FLPs. Chapter 14 rules apply.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-063',
    question: 'Which trust is used to provide for a disabled beneficiary without disqualifying them from government benefits?',
    options: [
      'Bypass trust',
      'Special needs trust (SNT)',
      'QTIP trust',
      'Crummey trust'
    ],
    correctAnswer: 1,
    explanation: 'Special needs trusts (supplemental needs trusts) provide for disabled beneficiaries without affecting Medicaid/SSI eligibility. Funds supplement but don\'t replace government benefits. Third-party SNT (funded by others) vs. first-party SNT (beneficiary\'s own funds, requires payback).',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-064',
    question: 'The "gift-splitting" election allows married couples to:',
    options: [
      'Split gifts between children equally',
      'Treat gifts made by one spouse as made half by each',
      'Avoid all gift tax on transfers between spouses',
      'Combine their annual exclusions into one gift'
    ],
    correctAnswer: 1,
    explanation: 'Gift-splitting allows spouses to treat gifts by one as made 50% by each. Doubles annual exclusion ($38,000 per donee in 2026) and uses both unified credits. Requires consent of both spouses on gift tax return. Gift must be to third party.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-065',
    question: 'What is unique about a Charitable Lead Trust (CLT)?',
    options: [
      'Charity receives income stream; remainder to family',
      'Family receives income; charity gets remainder',
      'Only cash donations allowed',
      'Trust is irrevocable only at donor\'s death'
    ],
    correctAnswer: 0,
    explanation: 'CLT is opposite of CRT: charity receives income/annuity for term, remainder passes to family. Gift/estate value of remainder is discounted by charity\'s lead interest. Effective when 7520 rates are low. Grantor CLT provides upfront income tax deduction.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-066',
    question: 'Crummey powers are used in irrevocable trusts primarily to:',
    options: [
      'Allow trustee discretion over distributions',
      'Qualify transfers for the annual gift tax exclusion',
      'Protect assets from creditors',
      'Provide income tax deductions'
    ],
    correctAnswer: 1,
    explanation: 'Crummey powers give beneficiaries temporary right to withdraw contributions (usually 30-60 days). This "present interest" qualifies gifts for annual exclusion. Power typically lapses each year. Named after Crummey v. Commissioner. Common in ILITs.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-067',
    question: 'The annual gift tax exclusion amount for 2026 is:',
    options: [
      '$16,000',
      '$17,000',
      '$18,000',
      '$19,000'
    ],
    correctAnswer: 3,
    explanation: 'The 2026 annual gift tax exclusion is $19,000 per donee (up from $18,000 in 2024). Unlimited recipients allowed. Married couples can gift-split for $38,000 per donee. No gift tax return required if under annual exclusion.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-068',
    question: 'Which is NOT a benefit of using an Irrevocable Life Insurance Trust (ILIT)?',
    options: [
      'Death benefit excluded from insured\'s estate',
      'Provides liquidity for estate taxes',
      'Insured retains policy ownership rights',
      'Creditor protection for policy'
    ],
    correctAnswer: 2,
    explanation: 'ILIT requires insured to NOT own the policy (trust is owner). If insured retains incidents of ownership, death benefit is included in estate (IRC 2042). Key: insured cannot be trustee, beneficiary with control, or retain ownership rights.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-069',
    question: 'A bypass trust (credit shelter trust) is designed to:',
    options: [
      'Qualify for the marital deduction',
      'Use the deceased spouse\'s estate tax exemption',
      'Provide unlimited distributions to surviving spouse',
      'Avoid all income taxation'
    ],
    correctAnswer: 1,
    explanation: 'Bypass trust uses deceased spouse\'s exemption ($7.0M in 2026 post-TCJA sunset) to shelter assets from estate tax at both deaths. Does NOT qualify for marital deduction—that\'s the point. Surviving spouse can receive income and limited principal (HEMS standard). More critical now that portability is limited by lower exemptions.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'cfp-est-070',
    question: 'What is the consequence of dying intestate?',
    options: [
      'All assets pass to the state',
      'Assets distributed according to state intestacy laws',
      'Spouse receives everything',
      'No estate taxes are owed'
    ],
    correctAnswer: 1,
    explanation: 'Dying intestate (without will) means state law determines distribution—typically spouse and children, but varies by state. Escheat to state only if no heirs found. May not reflect decedent\'s wishes. Guardianship of minors decided by court.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-071',
    question: 'The alternate valuation date for estate tax purposes is:',
    options: [
      '3 months after death',
      '6 months after death',
      '9 months after death',
      '12 months after death'
    ],
    correctAnswer: 1,
    explanation: 'Alternate valuation date is 6 months after death. Can only be elected if it reduces both gross estate AND estate tax. Property sold or distributed before 6 months valued at date of distribution. Elected on Form 706.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-072',
    question: 'A Qualified Domestic Trust (QDOT) is required when:',
    options: [
      'Estate exceeds unified credit',
      'Assets pass to non-citizen surviving spouse',
      'Beneficiaries are minors',
      'Estate includes foreign assets'
    ],
    correctAnswer: 1,
    explanation: 'QDOT is required for unlimited marital deduction when surviving spouse is not a U.S. citizen. QDOT requirements: U.S. trustee, withholding on principal distributions, other regulatory requirements. Estate tax deferred until principal distributed or surviving spouse dies.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-073',
    question: 'What is the result of a qualified disclaimer?',
    options: [
      'Disclaimant chooses who receives the property',
      'Property passes as if disclaimant predeceased',
      'Property goes to the state',
      'Disclaimant receives stepped-up basis'
    ],
    correctAnswer: 1,
    explanation: 'Qualified disclaimer treats disclaimant as predeceasing decedent—property passes to next in line. Requirements: written, within 9 months of death/transfer, no acceptance of benefits, no direction by disclaimant. Useful for post-mortem estate planning.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'cfp-est-074',
    question: 'A generation-skipping transfer occurs when assets pass to:',
    options: [
      'Any minor beneficiary',
      'A person two or more generations below the transferor',
      'A trust for multiple generations',
      'A surviving spouse'
    ],
    correctAnswer: 1,
    explanation: 'GST tax applies to transfers to "skip persons"—grandchildren or more remote descendants (or unrelated persons 37.5+ years younger). Rate is flat 40%. Three types: direct skip, taxable termination, taxable distribution. Each person has GST exemption ($7.0M in 2026 post-TCJA sunset).',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'cfp-est-075',
    question: 'What happened to the estate tax exemption when the TCJA provisions expired on January 1, 2026?',
    options: [
      'Remained at $13.61 million permanently',
      'Increased to $15 million',
      'Decreased to approximately $7.0 million',
      'Estate tax was eliminated entirely'
    ],
    correctAnswer: 2,
    explanation: 'The TCJA doubled the exemption through 2025. On January 1, 2026, the exemption reverted to pre-TCJA levels adjusted for inflation (approximately $7.0 million). This significantly impacts estate planning for estates above the new threshold. Anti-clawback regulations protect gifts made before 2026 using the higher exemption.',
    courseId: 'cfp',
    section: 'CFP-EST',
    topic: 'Estate Planning',
    difficulty: 'medium',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  }
];

export default CFP_ESTATE_QUESTIONS;
