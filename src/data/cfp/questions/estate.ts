/**
 * CFP Estate Planning Questions
 * Domain 7: Estate Planning (12% of exam)
 * 25 high-quality questions covering EST-1, EST-2, and EST-3 blueprint areas
 * 
 * Focus: Scenario-based, calculation problems, detailed explanations
 */

import { CFPQuestion } from '../../../types';

export const CFP_ESTATE_QUESTIONS: CFPQuestion[] = [
  // EST-1: Estate Documents and Trusts (Questions 1-8)
  {
    id: 'CFP-EST-001',
    text: 'Thomas dies intestate in a state with separate property law. He is survived by his spouse and two adult children from a prior marriage. His estate consists of $600,000 in assets. Under typical intestacy statutes, which distribution is MOST likely?',
    options: [
      { id: 'A', text: 'Spouse receives entire estate' },
      { id: 'B', text: 'Spouse receives 1/3, children split 2/3' },
      { id: 'C', text: 'Spouse receives 1/2, children split 1/2' },
      { id: 'D', text: 'Children receive entire estate' }
    ],
    correctOptionId: 'C',
    explanation: 'In most separate property states, when a decedent dies intestate with a surviving spouse and children NOT from that marriage, the spouse typically receives 1/2 of the estate and the children from other relationships split the remaining 1/2. This protects children from prior relationships while providing for the current spouse. The spouse receives $300,000, each child receives $150,000.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-002',
    text: 'Patricia creates a revocable living trust and funds it with her investment accounts worth $2.5 million. Upon her death at age 78, which statement is CORRECT regarding this trust?',
    options: [
      { id: 'A', text: 'Assets avoid probate but are included in her gross estate at stepped-up basis' },
      { id: 'B', text: 'Assets pass through probate with stepped-up basis' },
      { id: 'C', text: 'Assets avoid both probate and estate tax' },
      { id: 'D', text: 'Assets avoid probate but retain their original cost basis' }
    ],
    correctOptionId: 'A',
    explanation: 'Revocable living trusts avoid probate because assets are already titled to the trust at death. However, because the grantor retained the right to revoke, the assets are still included in the gross estate for estate tax purposes. The tax benefit is that assets receive a stepped-up basis to fair market value at death. The trust avoids the time and expense of probate while still providing the basis step-up.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-003',
    text: 'Margaret wants to provide for her disabled adult daughter who receives SSI and Medicaid benefits. Which trust structure is MOST appropriate?',
    options: [
      { id: 'A', text: 'Revocable living trust with daughter as beneficiary' },
      { id: 'B', text: 'Third-party special needs trust' },
      { id: 'C', text: 'QTIP trust' },
      { id: 'D', text: 'Totten trust at a local bank' }
    ],
    correctOptionId: 'B',
    explanation: 'A third-party special needs trust (also called supplemental needs trust) is specifically designed for disabled beneficiaries who receive means-tested government benefits. It allows funds to supplement, not supplant, government benefits. Unlike first-party special needs trusts (funded with the beneficiary\'s own assets), third-party SNTs funded by parents have no Medicaid payback requirement at the beneficiary\'s death.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-004',
    text: 'David designates his wife as agent under a durable power of attorney for finances. Two years later, David is diagnosed with Alzheimer\'s and gradually loses capacity. What is the effect on the power of attorney?',
    options: [
      { id: 'A', text: 'It terminates immediately upon diagnosis' },
      { id: 'B', text: 'It remains in effect because it is durable' },
      { id: 'C', text: 'It requires court confirmation to continue' },
      { id: 'D', text: 'It converts to a guardianship automatically' }
    ],
    correctOptionId: 'B',
    explanation: 'A durable power of attorney specifically includes language that it survives the principal\'s incapacity (e.g., "This power of attorney shall not be affected by subsequent disability or incapacity of the principal"). This is the key distinction from a regular (non-durable) POA, which terminates upon incapacity. The durable POA allows the wife to continue managing David\'s finances without court intervention.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-005',
    text: 'Janet creates an irrevocable life insurance trust (ILIT) and transfers an existing $2 million policy to the trust. She dies 18 months later. How are the life insurance proceeds treated for estate tax purposes?',
    options: [
      { id: 'A', text: 'Excluded from the gross estate' },
      { id: 'B', text: 'Included in the gross estate at $2 million' },
      { id: 'C', text: 'Included at the interpolated terminal reserve value' },
      { id: 'D', text: 'Partially included based on the transfer date' }
    ],
    correctOptionId: 'B',
    explanation: 'When an existing life insurance policy is transferred to an ILIT, the insured must survive three years from the date of transfer for the proceeds to be excluded from the gross estate (IRC §2035). Since Janet died only 18 months after the transfer, the full $2 million death benefit is included in her gross estate. The lesson: For ILITs, have the trust purchase new policies when possible, or plan for long survival after transfers.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-006',
    text: 'A credit shelter trust is funded with $5 million at the first spouse\'s death in 2024. The applicable exclusion amount is $13.61 million. At the surviving spouse\'s death 10 years later, the credit shelter trust assets have appreciated to $8 million. What are the estate tax consequences?',
    options: [
      { id: 'A', text: '$8 million is included in the surviving spouse\'s estate' },
      { id: 'B', text: '$5 million is included in the surviving spouse\'s estate' },
      { id: 'C', text: 'Nothing is included in the surviving spouse\'s estate' },
      { id: 'D', text: '$3 million of appreciation is included' }
    ],
    correctOptionId: 'C',
    explanation: 'A credit shelter (bypass) trust is specifically designed to remove assets from both estates. Assets placed in the trust used the first spouse\'s exemption at their death. They are NOT included in the surviving spouse\'s estate, regardless of appreciation. The $3 million of appreciation transfers to beneficiaries completely estate-tax-free. This is the primary advantage of bypass trusts despite portability.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-007',
    text: 'George creates a charitable remainder unitrust (CRUT) with $1 million of appreciated stock (basis $200,000). The trust sells the stock and invests in a diversified portfolio. What is the income tax consequence of the sale?',
    options: [
      { id: 'A', text: 'George recognizes $800,000 capital gain immediately' },
      { id: 'B', text: 'The trust pays tax on $800,000 gain' },
      { id: 'C', text: 'No immediate tax; gain recognized as received by George' },
      { id: 'D', text: 'Gain is permanently excluded from taxation' }
    ],
    correctOptionId: 'C',
    explanation: 'CRTs are tax-exempt entities and pay no tax on the sale of appreciated assets. This avoids the immediate capital gains recognition that would occur if George sold the stock directly. However, when distributions are made to George, they carry out the character of the trust\'s income in a specific order (WIFO - worst in, first out): ordinary income first, then capital gains, then tax-exempt income, then return of principal.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-008',
    text: 'A properly drafted pour-over will directs that residuary estate assets be transferred to which arrangement?',
    options: [
      { id: 'A', text: 'A newly created testamentary trust' },
      { id: 'B', text: 'An existing revocable living trust' },
      { id: 'C', text: 'Directly to named beneficiaries' },
      { id: 'D', text: 'An irrevocable life insurance trust' }
    ],
    correctOptionId: 'B',
    explanation: 'A pour-over will is designed to "catch" assets not transferred to the revocable living trust during life and direct them into the trust at death. This ensures all assets are eventually governed by the trust\'s dispositive provisions. Note that assets passing through the pour-over will still go through probate, unlike assets already in the trust.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },

  // EST-2: Gift, Estate, and GST Tax (Questions 9-17)
  {
    id: 'CFP-EST-009',
    text: 'In 2024, Michael makes a $75,000 gift to his nephew and a $500,000 gift to his alma mater for a new scholarship fund. What is Michael\'s total taxable gift for the year?',
    options: [
      { id: 'A', text: '$0' },
      { id: 'B', text: '$57,000' },
      { id: 'C', text: '$557,000' },
      { id: 'D', text: '$575,000' }
    ],
    correctOptionId: 'B',
    explanation: 'The gift to the nephew exceeds the 2024 annual exclusion of $18,000, resulting in a taxable gift of $75,000 - $18,000 = $57,000. The $500,000 gift to the university is not a taxable gift because gifts to qualified charities receive an unlimited gift tax charitable deduction. Therefore, total taxable gifts = $57,000.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-010',
    text: 'Barbara gifts $100,000 to her daughter. Her husband Bruce agrees to gift splitting. Neither has made prior taxable gifts. What is the impact on each spouse\'s lifetime exemption?',
    options: [
      { id: 'A', text: 'Barbara uses $82,000 exemption; Bruce uses $0' },
      { id: 'B', text: 'Barbara uses $41,000 exemption; Bruce uses $41,000' },
      { id: 'C', text: 'Barbara uses $32,000 exemption; Bruce uses $32,000' },
      { id: 'D', text: 'Barbara uses $64,000 exemption; Bruce uses $0' }
    ],
    correctOptionId: 'C',
    explanation: 'With gift splitting, the $100,000 gift is treated as $50,000 from each spouse. Each spouse can apply the $18,000 annual exclusion, making each spouse\'s taxable gift $50,000 - $18,000 = $32,000. Each spouse uses $32,000 of their lifetime exemption (unified credit). This allows larger gifts while minimizing exemption usage.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-011',
    text: 'Harold pays his grandson\'s $45,000 medical school tuition directly to the university and also gives him $25,000 cash. What is Harold\'s taxable gift for the year?',
    options: [
      { id: 'A', text: '$0' },
      { id: 'B', text: '$7,000' },
      { id: 'C', text: '$52,000' },
      { id: 'D', text: '$70,000' }
    ],
    correctOptionId: 'B',
    explanation: 'Payments made directly to educational institutions for tuition qualify for the unlimited education exclusion under IRC §2503(e) and are NOT taxable gifts. The $45,000 tuition payment is completely excluded. The $25,000 cash gift is a separate gift that qualifies for the $18,000 annual exclusion, leaving $7,000 as a taxable gift. Key: direct payment requirement.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-012',
    text: 'Calculate the tentative estate tax for a decedent with a taxable estate of $15 million in 2024. The 2024 applicable exclusion amount is $13.61 million and the estate tax rate is 40%.',
    options: [
      { id: 'A', text: '$0' },
      { id: 'B', text: '$556,000' },
      { id: 'C', text: '$6,000,000' },
      { id: 'D', text: '$5,444,000' }
    ],
    correctOptionId: 'B',
    explanation: 'Estate tax calculation: Taxable estate ($15M) - Applicable exclusion ($13.61M) = $1.39M subject to estate tax. Estate tax = $1,390,000 × 40% = $556,000. The unified credit effectively exempts the first $13.61 million from taxation. Only the excess is taxed at the flat 40% rate.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-013',
    text: 'Roger dies in 2024 with a gross estate of $18 million. His estate includes a $5 million bequest to his wife and $1 million to charity. He made no lifetime taxable gifts. Calculate the taxable estate.',
    options: [
      { id: 'A', text: '$12,000,000' },
      { id: 'B', text: '$13,000,000' },
      { id: 'C', text: '$17,000,000' },
      { id: 'D', text: '$18,000,000' }
    ],
    correctOptionId: 'A',
    explanation: 'Taxable estate = Gross estate ($18M) - Marital deduction ($5M) - Charitable deduction ($1M) = $12,000,000. Both the marital deduction (for property passing to spouse) and charitable deduction (for property passing to charity) are unlimited. These deductions reduce the taxable estate before applying the applicable exclusion.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-014',
    text: 'Ellen\'s husband died in 2020 with a taxable estate of $5 million, using only that portion of his $11.58 million exemption. Ellen dies in 2024 when the exemption is $13.61 million. If Ellen properly elected portability, what is her available exemption?',
    options: [
      { id: 'A', text: '$13.61 million' },
      { id: 'B', text: '$19.19 million' },
      { id: 'C', text: '$20.19 million' },
      { id: 'D', text: '$27.22 million' }
    ],
    correctOptionId: 'C',
    explanation: 'With portability, Ellen receives her deceased spouse\'s unused exclusion (DSUE). DSUE = $11.58M (2020 exemption) - $5M (used) = $6.58M. Ellen\'s total exemption = Her own ($13.61M) + DSUE ($6.58M) = $20.19 million. Note: The DSUE is based on the exemption at the first spouse\'s death, not when the surviving spouse dies.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-015',
    text: 'William makes a direct skip transfer of $3 million to his grandchildren. His GST exemption is fully intact. What is the GST tax owed?',
    options: [
      { id: 'A', text: '$0' },
      { id: 'B', text: '$1,200,000' },
      { id: 'C', text: '$3,000,000' },
      { id: 'D', text: '$4,200,000' }
    ],
    correctOptionId: 'A',
    explanation: 'The GST exemption ($13.61 million in 2024) can be allocated to generation-skipping transfers. A direct skip to grandchildren can be covered by allocating $3 million of GST exemption, resulting in an inclusion ratio of zero and no GST tax. The GST tax (40%) only applies to transfers exceeding the GST exemption allocation.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-016',
    text: 'A trust is created for the benefit of a grantor\'s child with remainder to grandchildren. At the child\'s death, the trust corpus is distributed to the grandchildren. This transaction is classified as which type of GST?',
    options: [
      { id: 'A', text: 'Direct skip' },
      { id: 'B', text: 'Taxable termination' },
      { id: 'C', text: 'Taxable distribution' },
      { id: 'D', text: 'Indirect skip' }
    ],
    correctOptionId: 'B',
    explanation: 'A taxable termination occurs when the interest of the non-skip person (the child) terminates and thereafter only skip persons (grandchildren) have interests in the trust. The child\'s death terminates all non-skip interests, causing a taxable termination. Direct skips occur when property passes directly to skip persons. Taxable distributions occur when skip persons receive distributions while non-skip persons still have interests.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-017',
    text: 'Jackson\'s closely-held business accounts for 45% of his adjusted gross estate. His estate uses alternate valuation for the business which has declined in value. Which statement is CORRECT?',
    options: [
      { id: 'A', text: 'Alternate valuation can only be used for the business, not other assets' },
      { id: 'B', text: 'Alternate valuation must be used for all estate assets' },
      { id: 'C', text: 'Beneficiaries receive stepped-up basis to original date of death value' },
      { id: 'D', text: 'Alternate valuation cannot be used if it increases estate tax' }
    ],
    correctOptionId: 'B',
    explanation: 'Alternate valuation date (six months after death or earlier disposition) must be elected for all estate assets - it cannot be applied selectively. Additionally, it can only be elected if it reduces both the gross estate AND estate tax liability. If elected, the basis to beneficiaries is stepped to the alternate valuation date value, not the date of death value.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Analysis' as const
  },

  // EST-3: Wealth Transfer and Business Succession (Questions 18-25)
  {
    id: 'CFP-EST-018',
    text: 'Samantha creates a 5-year zeroed-out GRAT, transferring $4 million in stock. The §7520 rate is 5.2% and the stock appreciates at 12% annually. Approximately how much value passes to her children at the GRAT\'s termination, assuming she survives?',
    options: [
      { id: 'A', text: 'Zero - all appreciation returns to Samantha' },
      { id: 'B', text: 'Approximately $900,000 - $1,200,000' },
      { id: 'C', text: 'Approximately $3,000,000' },
      { id: 'D', text: 'Approximately $4,000,000' }
    ],
    correctOptionId: 'B',
    explanation: 'In a zeroed-out GRAT, the annuity payments return to the grantor roughly equal to the initial contribution. The "excess return" - appreciation above the §7520 rate - passes to remaindermen gift-tax-free. With 12% appreciation vs. 5.2% §7520 rate, approximately 6.8% annual excess compounds over 5 years on a declining balance. This results in roughly $900K-$1.2M passing to children at no additional gift tax cost.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-019',
    text: 'Susan, age 62, transfers her $1.8 million vacation home to a 12-year QPRT. The present value of her retained interest is $900,000. What is the taxable gift?',
    options: [
      { id: 'A', text: '$0' },
      { id: 'B', text: '$900,000' },
      { id: 'C', text: '$1,800,000' },
      { id: 'D', text: '$2,700,000' }
    ],
    correctOptionId: 'B',
    explanation: 'The taxable gift for a QPRT equals the fair market value of the residence minus the present value of the retained term interest. Taxable gift = $1,800,000 - $900,000 = $900,000. This represents a 50% discount on transferring the home. If Susan survives the 12-year term, the home passes to beneficiaries at this discounted value, regardless of future appreciation.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-020',
    text: 'A family limited partnership holds $10 million of marketable securities. Individual limited partner interests are valued at a 35% combined discount for lack of control and marketability. What is the gift tax value of a 25% LP interest?',
    options: [
      { id: 'A', text: '$2,500,000' },
      { id: 'B', text: '$1,625,000' },
      { id: 'C', text: '$1,500,000' },
      { id: 'D', text: '$875,000' }
    ],
    correctOptionId: 'B',
    explanation: 'Pro-rata value of 25% interest = $10M × 25% = $2.5M. Apply 35% combined discount: $2,500,000 × (1 - 0.35) = $2,500,000 × 0.65 = $1,625,000. FLP discounts reflect that limited partners lack control over distributions and cannot easily sell their interests on established markets. These discounts can significantly reduce gift and estate tax values.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-021',
    text: 'ABC Corporation has 4 equal shareholders with a cross-purchase buy-sell agreement funded by life insurance. How many insurance policies are required to fully fund the agreement?',
    options: [
      { id: 'A', text: '4 policies' },
      { id: 'B', text: '8 policies' },
      { id: 'C', text: '12 policies' },
      { id: 'D', text: '16 policies' }
    ],
    correctOptionId: 'C',
    explanation: 'In a cross-purchase agreement, each shareholder owns policies on each other shareholder. With 4 shareholders, the formula is n × (n-1) = 4 × 3 = 12 policies. Each of the 4 owners purchases 3 policies (one on each other owner). This contrasts with a stock redemption where only 4 policies would be needed (owned by the corporation on each shareholder).',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-022',
    text: 'James\' estate includes closely-held stock valued at $8 million in an adjusted gross estate of $14 million. Estate taxes and administrative expenses total $1.5 million. How much can the estate redeem under IRC §303 without dividend treatment?',
    options: [
      { id: 'A', text: '$1,500,000' },
      { id: 'B', text: '$4,900,000' },
      { id: 'C', text: '$8,000,000' },
      { id: 'D', text: '$0 - Section 303 does not apply' }
    ],
    correctOptionId: 'A',
    explanation: 'Section 303 applies because closely-held stock ($8M) exceeds 35% of adjusted gross estate ($14M × 35% = $4.9M). The $8M is 57% of the estate. Under §303, redemptions up to the amount of death taxes and administrative expenses ($1.5M) receive capital gain treatment rather than dividend treatment. With the stepped-up basis, the gain is likely minimal.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-023',
    text: 'Which estate planning technique would most effectively freeze the value of a closely-held business interest in the owner\'s estate while transferring future appreciation to the next generation?',
    options: [
      { id: 'A', text: 'Outright gift of stock' },
      { id: 'B', text: 'Installment sale to an intentionally defective grantor trust' },
      { id: 'C', text: 'Bequest in will' },
      { id: 'D', text: 'Joint tenancy with children' }
    ],
    correctOptionId: 'B',
    explanation: 'An installment sale to an IDGT freezes value because the owner receives a promissory note for the current value. All future appreciation above the AFR interest rate passes to the trust (and ultimately beneficiaries) free of transfer tax. The IDGT is treated as owned by the grantor for income tax, so no gain is recognized on the sale, and interest payments are not taxable income.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Evaluation' as const
  },
  {
    id: 'CFP-EST-024',
    text: 'Peter, a US citizen, is married to Maria, a non-citizen legal resident. Peter dies with a $12 million estate, all left to Maria. Without additional planning, what is the estate tax consequence?',
    options: [
      { id: 'A', text: 'Unlimited marital deduction applies - no estate tax' },
      { id: 'B', text: 'No marital deduction available - full estate subject to tax' },
      { id: 'C', text: 'Marital deduction available only if passed through a QDOT' },
      { id: 'D', text: '$185,000 annual exclusion applies to the transfer' }
    ],
    correctOptionId: 'C',
    explanation: 'The unlimited marital deduction is NOT available for transfers to non-citizen spouses (regardless of residency status). To qualify for the marital deduction, assets must pass to a Qualified Domestic Trust (QDOT) with a US trustee. The QDOT allows deferral until distributions are made or the surviving spouse dies. The $185,000 is the annual gift exclusion for gifts to non-citizen spouses during life, not at death.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-025',
    text: 'Richard has three children: one active in the family business, two not. The business represents 60% of his estate. He wants to treat all children fairly while ensuring business continuity. Which strategy BEST accomplishes both objectives?',
    options: [
      { id: 'A', text: 'Leave business equally to all three children' },
      { id: 'B', text: 'Leave business to active child; equalize with ILIT proceeds for others' },
      { id: 'C', text: 'Sell the business and divide proceeds equally' },
      { id: 'D', text: 'Leave everything to the active child' }
    ],
    correctOptionId: 'B',
    explanation: 'An Irrevocable Life Insurance Trust (ILIT) allows Richard to equalize his estate without disrupting business operations. The active child receives the business; the ILIT provides death benefit proceeds (estate and income tax-free) to the other children. This avoids forcing non-business children into ownership, prevents conflict, and ensures business continuity. The insurance provides liquidity without burdening the business.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Evaluation' as const
  },
  // ============================================
  // Additional EST Questions (026-045)
  // ============================================
  {
    id: 'CFP-EST-026',
    text: 'Samuel dies in 2024 with a gross estate of $15 million. He made $500,000 in taxable lifetime gifts. What is his taxable estate after applying the unified credit exemption of $13.61 million?',
    options: [
      { id: 'A', text: '$0 - fully sheltered by exemption' },
      { id: 'B', text: '$890,000' },
      { id: 'C', text: '$1,390,000' },
      { id: 'D', text: '$1,890,000' }
    ],
    correctOptionId: 'D',
    explanation: 'The unified credit applies to combined lifetime gifts and estate transfers. Total taxable transfers = $15M (estate) + $500K (prior gifts) = $15.5M. Minus $13.61M exemption = $1.89M subject to estate tax. At 40% rate, this generates approximately $756,000 in estate tax. Lifetime gifts reduce the remaining exemption available at death.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-027',
    text: 'Catherine wants to make gifts to 10 grandchildren and their spouses (20 total recipients) in 2024. Her husband agrees to gift-split. What is the maximum they can give tax-free using only annual exclusions?',
    options: [
      { id: 'A', text: '$360,000' },
      { id: 'B', text: '$720,000' },
      { id: 'C', text: '$340,000' },
      { id: 'D', text: '$680,000' }
    ],
    correctOptionId: 'B',
    explanation: 'With gift-splitting, each spouse can use their $18,000 annual exclusion (2024) per recipient. Combined: $36,000 per recipient × 20 recipients = $720,000 tax-free annually. Gift-splitting effectively doubles the amount one spouse can give without using unified credit. All recipients must receive present interests (not future interests) for annual exclusion to apply.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-028',
    text: 'David creates an irrevocable trust for his daughter, retaining the power to substitute assets of equivalent value. Which power did David retain?',
    options: [
      { id: 'A', text: 'General power of appointment' },
      { id: 'B', text: 'Power that causes estate inclusion' },
      { id: 'C', text: 'Power that makes him a grantor for income tax purposes' },
      { id: 'D', text: 'Power reserved to revoke the trust' }
    ],
    correctOptionId: 'C',
    explanation: 'The power to substitute assets of equivalent value is a grantor trust power under Section 675. It makes David the owner of the trust for income tax purposes (pay tax on trust income) but does NOT cause estate inclusion. This creates a defective grantor trust - defective for income tax, effective for estate tax. Income tax payments further reduce David estate without gift tax.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-029',
    text: 'Eleanor creates a Charitable Remainder Annuity Trust (CRAT) with $1,000,000, paying herself 6% annually for 20 years, remainder to charity. Which statement is CORRECT?',
    options: [
      { id: 'A', text: 'She receives a current income tax deduction for the full $1,000,000' },
      { id: 'B', text: 'She receives a deduction for the present value of the charitable remainder' },
      { id: 'C', text: 'She pays no tax on the annuity payments' },
      { id: 'D', text: 'The trust must distribute at least 10% to charity annually' }
    ],
    correctOptionId: 'B',
    explanation: 'CRAT donors receive an income tax deduction equal to the present value of the remainder interest going to charity (not the full contribution). The deduction depends on IRS discount rate, term, and payout rate. Annuity payments are taxable to Eleanor using a four-tier accounting system (OICS: Ordinary Income, Capital Gains, Other Income, Corpus). The 10% requirement is for the minimum charitable remainder at funding, not annual distributions.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-030',
    text: 'Frank owns a $5 million life insurance policy on his life payable to his estate. If he dies owning the policy, which statement is CORRECT?',
    options: [
      { id: 'A', text: 'The death benefit is income tax-free but included in his gross estate' },
      { id: 'B', text: 'The death benefit is both income and estate tax-free' },
      { id: 'C', text: 'Only the cash surrender value is included in his estate' },
      { id: 'D', text: 'The policy is exempt from creditor claims in his estate' }
    ],
    correctOptionId: 'A',
    explanation: 'Life insurance death benefits are generally income tax-free to beneficiaries (Section 101). However, if the insured owns the policy at death (or has "incidents of ownership"), the FULL death benefit is included in the gross estate for estate tax purposes. Naming the estate as beneficiary also causes estate inclusion. An ILIT would remove the policy from the estate. Cash surrender value is irrelevant for estate inclusion - it is the death benefit amount.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-031',
    text: 'Gloria dies owning property as joint tenants with right of survivorship with her non-spouse sister. Gloria contributed 100% of the purchase price. How much is included in Gloria estate?',
    options: [
      { id: 'A', text: '50% of the property value' },
      { id: 'B', text: '100% of the property value' },
      { id: 'C', text: '0% - the property passes outside probate' },
      { id: 'D', text: 'The value exceeding her contribution' }
    ],
    correctOptionId: 'B',
    explanation: 'For non-spouse joint tenants, the entire property value is included in the first decedent estate UNLESS the survivor can prove their contribution. Since Gloria contributed 100% of the cost and the sister contributed nothing, 100% is included in Gloria gross estate. The surviving sister must provide documentation of any contribution to reduce inclusion. Passing outside probate does not mean passing outside the gross estate.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-032',
    text: 'Harold wants to benefit his grandchildren but minimize Generation-Skipping Transfer Tax (GSTT). Which amount represents his 2024 GST exemption?',
    options: [
      { id: 'A', text: '$6.12 million' },
      { id: 'B', text: '$12.92 million' },
      { id: 'C', text: '$13.61 million' },
      { id: 'D', text: '$27.22 million' }
    ],
    correctOptionId: 'C',
    explanation: 'The GST exemption is equal to the basic exclusion amount: $13.61 million for 2024 (indexed for inflation). This can be allocated to transfers to skip persons (grandchildren, etc.) to shield them from the 40% GST tax. The exemption is separate from but equal to the gift/estate tax exemption. Married couples can combine for $27.22 million with proper allocation and portability.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'CFP-EST-033',
    text: 'Irene durable power of attorney for property was executed in 2019. She becomes incapacitated in 2024. Which statement about the POA is CORRECT?',
    options: [
      { id: 'A', text: 'The POA terminates upon her incapacity' },
      { id: 'B', text: 'The agent can continue to act on her behalf during incapacity' },
      { id: 'C', text: 'The POA must be re-executed annually to remain valid' },
      { id: 'D', text: 'Court approval is required for the agent to act' }
    ],
    correctOptionId: 'B',
    explanation: 'A DURABLE power of attorney specifically remains effective during the principal incapacity (hence "durable"). A non-durable POA would terminate upon incapacity. The durable POA allows the agent to manage financial affairs, pay bills, make investment decisions during the incapacity without court intervention. It does not require annual renewal. This is why durable POAs are essential estate planning documents.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'CFP-EST-034',
    text: 'James creates a Crummey trust for his minor children, contributing $54,000 annually ($18,000 per child × 3 children). What is required for the gifts to qualify for the annual exclusion?',
    options: [
      { id: 'A', text: 'The children must be at least 18 years old' },
      { id: 'B', text: 'Beneficiaries must be given withdrawal rights for a reasonable period' },
      { id: 'C', text: 'The trust must distribute income annually' },
      { id: 'D', text: 'A court must approve the trust' }
    ],
    correctOptionId: 'B',
    explanation: 'Crummey powers give beneficiaries the right to withdraw their share of contributions for a limited period (typically 30-60 days). This converts future interests (trust distributions) into present interests qualifying for annual exclusion. Beneficiaries (or guardians for minors) must receive written notice of withdrawal rights. If rights lapse, the lapse itself may be a gift, but $5,000 or 5% of trust assets lapses are protected.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-035',
    text: 'Karen husband Jack died in 2020 without using his $11.58 million exemption. Karen files a timely estate tax return electing portability. Jack estate was $3 million. In 2024, Karen dies with a $20 million estate. What is her available exemption?',
    options: [
      { id: 'A', text: '$13.61 million (her exemption only)' },
      { id: 'B', text: '$22.19 million (her exemption + portable DSUE)' },
      { id: 'C', text: '$25.19 million (both current exemptions)' },
      { id: 'D', text: '$11.58 million (Jack exemption only)' }
    ],
    correctOptionId: 'B',
    explanation: 'Portability allows the surviving spouse to use the Deceased Spousal Unused Exclusion (DSUE). Jack used $3M of his $11.58M, leaving $8.58M unused. Karen elected portability on Jack timely-filed estate return. Karen now has her 2024 exemption ($13.61M) + Jack DSUE ($8.58M) = $22.19M available. Note: DSUE is locked at death, not indexed for inflation.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-036',
    text: 'Larry health care directive includes a POLST (Physician Orders for Life-Sustaining Treatment). How does a POLST differ from a standard advance directive?',
    options: [
      { id: 'A', text: 'POLST is only valid in hospital settings' },
      { id: 'B', text: 'POLST is a physician order immediately actionable by medical personnel' },
      { id: 'C', text: 'POLST replaces the need for a healthcare proxy' },
      { id: 'D', text: 'POLST must be renewed every 6 months' }
    ],
    correctOptionId: 'B',
    explanation: 'A POLST (or MOLST in some states) is a physician ORDER, not just a directive. It is immediately actionable by EMS and medical personnel without interpretation. Unlike advance directives that express wishes, POLST orders must be followed. POLST is particularly important for patients with serious illness who want to specify treatment preferences. It supplements (does not replace) other advance directives and healthcare proxies.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'CFP-EST-037',
    text: 'Maria creates a Grantor Retained Annuity Trust (GRAT) with $2,000,000, receiving annuity payments of 8% for 5 years. If she survives the term and the IRC 7520 rate is 5%, what result is MOST likely?',
    options: [
      { id: 'A', text: 'The entire $2,000,000 is included in her estate' },
      { id: 'B', text: 'Appreciation above 5% passes to beneficiaries transfer-tax free' },
      { id: 'C', text: 'She receives an income tax deduction' },
      { id: 'D', text: 'The trust terminates and returns assets to Maria' }
    ],
    correctOptionId: 'B',
    explanation: 'GRATs freeze value and transfer appreciation. The taxable gift at funding is calculated using 7520 rates. If actual returns exceed the assumed 7520 rate, the excess passes to remaindermen free of gift/estate tax. With high annuity payments (zeroed-out GRAT), the initial taxable gift is minimal. If Maria dies during the term, assets are included in her estate. Survival is key. No income tax deduction for GRAT creation.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Evaluation' as const
  },
  {
    id: 'CFP-EST-038',
    text: 'Nathan receives a $500,000 inheritance from his deceased father. Which statement about the income tax treatment is CORRECT?',
    options: [
      { id: 'A', text: 'Nathan must include $500,000 in gross income' },
      { id: 'B', text: 'Nathan receives the inheritance income tax-free with stepped-up basis' },
      { id: 'C', text: 'Nathan owes gift tax on the inheritance' },
      { id: 'D', text: 'Nathan must pay inheritance tax in all 50 states' }
    ],
    correctOptionId: 'B',
    explanation: 'Inheritances are not taxable income to the recipient (Section 102). Nathan receives a stepped-up basis to fair market value at father death date. Gift tax is paid by donors on lifetime gifts, not by recipients of inheritances. Inheritance tax exists in only 6 states (and is paid based on relationship and amounts). Estate tax is a different tax paid by the estate, not Nathan.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'CFP-EST-039',
    text: 'Olivia dies owning community property with her husband in California. Her half is worth $1,000,000 with an original basis of $200,000. Her husband half has the same values. What is the husband basis in the community property after her death?',
    options: [
      { id: 'A', text: '$200,000 (original basis preserved)' },
      { id: 'B', text: '$1,000,000 (stepped-up on Olivia half only)' },
      { id: 'C', text: '$1,100,000 (split basis)' },
      { id: 'D', text: '$2,000,000 (double step-up on both halves)' }
    ],
    correctOptionId: 'D',
    explanation: 'Community property receives a FULL step-up in basis for BOTH halves at first spouse death (Section 1014(b)(6)). Unlike separate property or joint tenancy, both the decedent and survivor halves are stepped up to FMV. The husband now has $2M basis in $2M property. This is a major tax advantage of community property states. IRC Section 1014(b)(6) provides this double step-up.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-040',
    text: 'Paul wants to make a gift of stock worth $100,000 (basis $30,000) to his grandson. If Paul pays the $37,000 in gift tax on the transfer, what is the grandson basis in the stock?',
    options: [
      { id: 'A', text: '$30,000 (donor basis)' },
      { id: 'B', text: '$100,000 (fair market value)' },
      { id: 'C', text: '$67,000 (donor basis plus gift tax on appreciation)' },
      { id: 'D', text: '$137,000 (FMV plus gift tax)' }
    ],
    correctOptionId: 'C',
    explanation: 'For appreciated property, the donee takes the donor basis plus any gift tax paid attributable to the appreciation. Gift tax adjustment = Gift Tax × (Net Appreciation / Amount of Gift). Net appreciation = $100K - $30K = $70K. Ratio = $70K/$100K = 70%. Basis adjustment = $37K × 70% = $25,900 (approximately). New basis = $30K + adjustment ≈ $55,900-$67,000 range depending on calculation method. This partial step-up recognizes tax already paid.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-041',
    text: 'Quinn creates a pour-over will. What is the PRIMARY function of this document?',
    options: [
      { id: 'A', text: 'To create a trust upon Quinn death' },
      { id: 'B', text: 'To transfer probate assets into an existing trust' },
      { id: 'C', text: 'To designate beneficiaries for retirement accounts' },
      { id: 'D', text: 'To avoid all estate taxes' }
    ],
    correctOptionId: 'B',
    explanation: 'A pour-over will "pours" probate assets into an already-existing revocable trust. It catches assets not funded to the trust during life (forgotten accounts, inheritances, etc.). The assets go through probate but ultimately are governed by the trust terms. It does not create the trust - that must exist before death. It does not control non-probate assets like retirement accounts or life insurance with named beneficiaries.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'CFP-EST-042',
    text: 'Rachel establishes a Family Limited Partnership (FLP), transferring $5,000,000 in assets in exchange for a 99% limited partnership interest. She later gifts limited partnership interests to her children. What valuation discount might apply?',
    options: [
      { id: 'A', text: 'No discounts available for family transfers' },
      { id: 'B', text: 'Combined lack of control and lack of marketability discounts of 25-40%' },
      { id: 'C', text: 'Standard 50% family discount' },
      { id: 'D', text: 'Discounts only apply to real estate FLPs' }
    ],
    correctOptionId: 'B',
    explanation: 'Limited partnership interests typically qualify for valuation discounts: (1) Lack of control - limited partners cannot manage or force distributions, and (2) Lack of marketability - no ready market for LP interests. Combined discounts of 25-40% are common (supported by appraisals). A $1M interest might be valued at $600K-$750K for gift tax. FLPs must have legitimate non-tax purposes and proper operation to withstand IRS scrutiny under Section 2036.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-043',
    text: 'Steve receives a bequest from his grandfather conditioned on Steve "graduating from college." Under trust law, this is what type of gift?',
    options: [
      { id: 'A', text: 'Absolute gift' },
      { id: 'B', text: 'Gift with a condition precedent' },
      { id: 'C', text: 'Gift with a condition subsequent' },
      { id: 'D', text: 'Charitable gift' }
    ],
    correctOptionId: 'B',
    explanation: 'A condition precedent must be satisfied BEFORE the beneficiary receives the gift. Steve must graduate first, then he receives the bequest. A condition subsequent would give the gift but take it away if a condition occurs (e.g., "to Steve, but if he fails to graduate, to charity"). The distinction matters for vesting of interests, interpretation, and potential challenges to validity.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering and Understanding' as const
  },
  {
    id: 'CFP-EST-044',
    text: 'Thomas creates an irrevocable trust and transfers $2 million. Three years later, he dies. What amount is included in his gross estate under Section 2035?',
    options: [
      { id: 'A', text: '$0 - the gift was completed more than 3 years ago' },
      { id: 'B', text: 'Only the original $2 million' },
      { id: 'C', text: 'The current value of the trust assets' },
      { id: 'D', text: 'The $2 million plus any gift tax paid' }
    ],
    correctOptionId: 'A',
    explanation: 'Section 2035 only applies to transfers within 3 years of death for certain transfers (primarily life insurance). For most gifts, Section 2035 brings back only gift tax paid within 3 years (grossing up). The gift itself is NOT included if made more than 3 years before death and is a completed gift. The 3-year lookback is often misunderstood - it primarily affects life insurance policies transferred within 3 years of death.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-045',
    text: 'Ursula has a $10 million estate and wants to maximize the amount passing to her children while minimizing estate taxes. She is charitably inclined but wants income during her lifetime. Which strategy BEST meets her objectives?',
    options: [
      { id: 'A', text: 'Outright charitable bequest in will' },
      { id: 'B', text: 'Charitable Remainder Trust with children as remainder beneficiaries' },
      { id: 'C', text: 'Charitable Remainder Trust with charity as remainder; use income to fund ILIT for children' },
      { id: 'D', text: 'Private foundation' }
    ],
    correctOptionId: 'C',
    explanation: 'This "wealth replacement" strategy: (1) CRT provides income tax deduction at creation, (2) Ursula receives income stream during life, (3) At death, charity receives CRT remainder (reducing estate), (4) CRT income funds premiums on life insurance in ILIT, (5) ILIT provides estate-tax-free death benefit to replace wealth going to charity. Result: charity benefits, children receive tax-advantaged insurance, estate taxes reduced. This is superior to CRT with children as remainder (which loses charitable benefits).',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Evaluation' as const
  },

  // ============================================
  // ADDITIONAL ESTATE QUESTIONS (46-75)
  // ============================================
  {
    id: 'CFP-EST-046',
    text: 'What is the primary estate planning advantage of a Qualified Personal Residence Trust (QPRT)?',
    options: [
      { id: 'A', text: 'Eliminates all gift tax on residence transfer' },
      { id: 'B', text: 'Transfers residence at discounted gift tax value' },
      { id: 'C', text: 'Provides step-up in basis at death' },
      { id: 'D', text: 'Allows unlimited transfers to non-citizens' }
    ],
    correctOptionId: 'B',
    explanation: 'QPRT transfers the residence at a discounted gift tax value based on the retained income interest. The longer the retained term, the lower the gift value. If the grantor survives the term, the residence passes to heirs at the discounted value. Risk: If grantor dies during term, full FMV included in estate.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-047',
    text: 'Which document should a CFP® recommend for a client who wants to designate someone to make healthcare decisions if incapacitated?',
    options: [
      { id: 'A', text: 'Living will' },
      { id: 'B', text: 'Healthcare power of attorney (healthcare proxy)' },
      { id: 'C', text: 'General durable power of attorney' },
      { id: 'D', text: 'Revocable living trust' }
    ],
    correctOptionId: 'B',
    explanation: 'Healthcare power of attorney (healthcare proxy) designates an agent to make medical decisions when the principal cannot. Living will only states preferences for end-of-life care. General POA handles financial matters. Revocable trust manages assets.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-048',
    text: 'A client wants to leave assets to grandchildren but avoid GST tax. What is the maximum amount they can transfer using the GST exemption in 2024?',
    options: [
      { id: 'A', text: '$17,000 per grandchild' },
      { id: 'B', text: '$18,000 per grandchild' },
      { id: 'C', text: '$12.92 million lifetime' },
      { id: 'D', text: '$13.61 million lifetime' }
    ],
    correctOptionId: 'D',
    explanation: 'The 2024 GST exemption is $13.61 million per person (same as estate/gift exemption). This can be allocated to generation-skipping transfers to grandchildren or more remote descendants. Annual exclusion gifts ($18,000 in 2024) are also GST-exempt automatically.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-049',
    text: 'Under the unlimited marital deduction, which transfer will NOT qualify?',
    options: [
      { id: 'A', text: 'Outright bequest to U.S. citizen spouse' },
      { id: 'B', text: 'QTIP trust for surviving spouse' },
      { id: 'C', text: 'Transfer to non-citizen spouse' },
      { id: 'D', text: 'General power of appointment trust for spouse' }
    ],
    correctOptionId: 'C',
    explanation: 'The unlimited marital deduction does NOT apply to transfers to non-citizen spouses. Instead, a Qualified Domestic Trust (QDOT) is required, or gifts up to the enhanced annual exclusion ($185,000 in 2024). QTIP and GPOA trusts qualify if spouse is a U.S. citizen.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-050',
    text: 'A single client dies with a $15 million estate in 2024. Approximately how much federal estate tax is due?',
    options: [
      { id: 'A', text: '$0' },
      { id: 'B', text: '$556,000' },
      { id: 'C', text: '$1,390,000' },
      { id: 'D', text: '$6,000,000' }
    ],
    correctOptionId: 'B',
    explanation: 'Taxable estate = $15M - $13.61M exemption = $1.39M. Estate tax at 40% = $556,000. The unified credit eliminates tax on the first $13.61M (2024). Without planning, estates above exemption are taxed at 40%.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-051',
    text: 'What is portability in the context of estate planning?',
    options: [
      { id: 'A', text: 'Ability to transfer assets between states without probate' },
      { id: 'B', text: 'Transfer of unused estate tax exemption to surviving spouse' },
      { id: 'C', text: 'Moving a trust from one jurisdiction to another' },
      { id: 'D', text: 'Naming multiple trustees across different states' }
    ],
    correctOptionId: 'B',
    explanation: 'Portability allows the surviving spouse to use the deceased spouse\'s unused exclusion amount (DSUE). Requires filing estate tax return (Form 706) even if no tax is due. DSUE can be combined with survivor\'s exemption for up to $27.22M exemption (2024).',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-052',
    text: 'A Grantor Retained Annuity Trust (GRAT) is MOST effective when:',
    options: [
      { id: 'A', text: 'Asset values are expected to decline' },
      { id: 'B', text: 'Interest rates are high relative to expected asset growth' },
      { id: 'C', text: 'Assets are expected to appreciate faster than the 7520 rate' },
      { id: 'D', text: 'The grantor has a short life expectancy' }
    ],
    correctOptionId: 'C',
    explanation: 'GRATs work best when assets appreciate faster than the Section 7520 rate. The gift value equals the remainder interest; if appreciation exceeds the 7520 rate, excess passes gift-tax-free. Zeroed-out GRATs minimize gift values. Short life expectancy is dangerous—if grantor dies during term, full value included in estate.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-053',
    text: 'Which is an advantage of a revocable living trust over a will?',
    options: [
      { id: 'A', text: 'Assets in the trust receive a step-up in basis at death' },
      { id: 'B', text: 'Avoids probate for properly funded assets' },
      { id: 'C', text: 'Provides asset protection from creditors' },
      { id: 'D', text: 'Reduces estate taxes' }
    ],
    correctOptionId: 'B',
    explanation: 'Revocable living trusts avoid probate for assets titled in the trust. Assets still included in estate (no tax savings) and still receive step-up in basis. No creditor protection while revocable. Must be properly funded to work.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-054',
    text: 'What is the "5 and 5" power in trust terms?',
    options: [
      { id: 'A', text: 'Ability to distribute 5% of trust income and 5% of corpus annually' },
      { id: 'B', text: 'Right to withdraw greater of $5,000 or 5% of corpus annually without gift tax consequences' },
      { id: 'C', text: 'Five-year holding period before 5% distributions allowed' },
      { id: 'D', text: 'Distribution standard for trustee discretion' }
    ],
    correctOptionId: 'B',
    explanation: 'The 5-and-5 power allows beneficiary to withdraw greater of $5,000 or 5% of trust corpus annually. If power lapses (not exercised), excess over 5-and-5 amount is treated as transfer. Commonly used in Crummey trusts to limit lapse consequences.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-055',
    text: 'A client names their estate as IRA beneficiary. The consequence is:',
    options: [
      { id: 'A', text: 'Spouse receives automatic rollover rights' },
      { id: 'B', text: 'Estate must distribute within 5 years (pre-2020 rules)' },
      { id: 'C', text: 'Beneficiaries get stretch IRA over life expectancy' },
      { id: 'D', text: 'No income tax due on distributions' }
    ],
    correctOptionId: 'B',
    explanation: 'Naming estate as beneficiary is poor planning—accelerates distributions (5-year rule if owner died before RBD, life expectancy if after), subjects IRA to probate and creditors, loses stretch options. Should name individuals or see-through trusts instead.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-056',
    text: 'Under SECURE Act rules, most non-spouse designated beneficiaries must distribute an inherited IRA within:',
    options: [
      { id: 'A', text: 'Their single life expectancy' },
      { id: 'B', text: '5 years' },
      { id: 'C', text: '10 years' },
      { id: 'D', text: '15 years' }
    ],
    correctOptionId: 'C',
    explanation: 'SECURE Act (2019) requires most non-spouse beneficiaries to withdraw inherited IRA within 10 years of owner\'s death. Exceptions: surviving spouse, minor children (until majority), disabled/chronically ill, and beneficiaries <10 years younger than decedent.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-057',
    text: 'What is a "pourover" will?',
    options: [
      { id: 'A', text: 'Will that divides assets equally among children' },
      { id: 'B', text: 'Will that transfers probate assets into a living trust' },
      { id: 'C', text: 'Will that funds a charitable remainder trust' },
      { id: 'D', text: 'Will that names contingent beneficiaries' }
    ],
    correctOptionId: 'B',
    explanation: 'A pourover will captures any assets not already in the living trust at death and "pours" them into the trust. These assets still go through probate but are then administered according to trust terms. Serves as safety net for unfunded assets.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-058',
    text: 'Which asset does NOT avoid probate?',
    options: [
      { id: 'A', text: 'Life insurance with named beneficiary' },
      { id: 'B', text: 'Joint tenancy with right of survivorship' },
      { id: 'C', text: 'Asset titled in individual name only' },
      { id: 'D', text: 'Assets in revocable trust' }
    ],
    correctOptionId: 'C',
    explanation: 'Assets titled solely in individual name go through probate. To avoid probate: use beneficiary designations, joint ownership with survivorship rights, TOD/POD accounts, or living trusts. Probate can be costly and time-consuming.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-059',
    text: 'An Intentionally Defective Grantor Trust (IDGT) provides what benefit?',
    options: [
      { id: 'A', text: 'Trust income taxed to grantor; assets removed from estate' },
      { id: 'B', text: 'No income tax on trust distributions' },
      { id: 'C', text: 'Unlimited charitable deductions' },
      { id: 'D', text: 'Immediate step-up in basis for beneficiaries' }
    ],
    correctOptionId: 'A',
    explanation: 'IDGT is "defective" for income tax (grantor pays tax on trust income) but effective for estate tax (assets out of estate). Benefit: grantor\'s tax payment is additional tax-free gift, trust grows income-tax-free. Sales to IDGT are not taxable events.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-060',
    text: 'Section 6166 allows estate tax deferral when:',
    options: [
      { id: 'A', text: 'Estate includes a closely held business representing >35% of adjusted gross estate' },
      { id: 'B', text: 'Estate consists primarily of illiquid real estate' },
      { id: 'C', text: 'Surviving spouse elects portability' },
      { id: 'D', text: 'Estate makes charitable contributions' }
    ],
    correctOptionId: 'A',
    explanation: 'Section 6166 allows installment payment of estate tax (up to 14 years) when closely held business exceeds 35% of adjusted gross estate. Interest-only payments for first 4 years, then principal + interest. Provides liquidity relief for family businesses.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-061',
    text: 'What is the IRC Section 303 redemption?',
    options: [
      { id: 'A', text: 'Redemption of estate stock to pay estate taxes treated as sale, not dividend' },
      { id: 'B', text: 'Mandatory redemption of closely held stock at death' },
      { id: 'C', text: 'Tax-free exchange of business interests' },
      { id: 'D', text: 'Charitable redemption of appreciated stock' }
    ],
    correctOptionId: 'A',
    explanation: 'Section 303 allows redemption of closely held stock to pay estate taxes and expenses. Treated as capital gain (stepped-up basis = minimal gain), not dividend. Requires stock > 35% of gross estate. Provides liquidity without dividend treatment.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-062',
    text: 'A Family Limited Partnership (FLP) may provide estate planning benefits through:',
    options: [
      { id: 'A', text: 'Eliminating all gift and estate taxes' },
      { id: 'B', text: 'Valuation discounts for lack of control and marketability' },
      { id: 'C', text: 'Avoiding income tax on transfers' },
      { id: 'D', text: 'Creating new basis in transferred assets' }
    ],
    correctOptionId: 'B',
    explanation: 'FLP interests may qualify for discounts (20-40% combined) due to lack of control (minority interests) and lack of marketability (no public market). Must have legitimate business purpose; IRS scrutinizes deathbed FLPs. Chapter 14 rules apply.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-063',
    text: 'Which trust is used to provide for a disabled beneficiary without disqualifying them from government benefits?',
    options: [
      { id: 'A', text: 'Bypass trust' },
      { id: 'B', text: 'Special needs trust (SNT)' },
      { id: 'C', text: 'QTIP trust' },
      { id: 'D', text: 'Crummey trust' }
    ],
    correctOptionId: 'B',
    explanation: 'Special needs trusts (supplemental needs trusts) provide for disabled beneficiaries without affecting Medicaid/SSI eligibility. Funds supplement but don\'t replace government benefits. Third-party SNT (funded by others) vs. first-party SNT (beneficiary\'s own funds, requires payback).',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-064',
    text: 'The "gift-splitting" election allows married couples to:',
    options: [
      { id: 'A', text: 'Split gifts between children equally' },
      { id: 'B', text: 'Treat gifts made by one spouse as made half by each' },
      { id: 'C', text: 'Avoid all gift tax on transfers between spouses' },
      { id: 'D', text: 'Combine their annual exclusions into one gift' }
    ],
    correctOptionId: 'B',
    explanation: 'Gift-splitting allows spouses to treat gifts by one as made 50% by each. Doubles annual exclusion ($36,000 per donee in 2024) and uses both unified credits. Requires consent of both spouses on gift tax return. Gift must be to third party.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-065',
    text: 'What is unique about a Charitable Lead Trust (CLT)?',
    options: [
      { id: 'A', text: 'Charity receives income stream; remainder to family' },
      { id: 'B', text: 'Family receives income; charity gets remainder' },
      { id: 'C', text: 'Only cash donations allowed' },
      { id: 'D', text: 'Trust is irrevocable only at donor\'s death' }
    ],
    correctOptionId: 'A',
    explanation: 'CLT is opposite of CRT: charity receives income/annuity for term, remainder passes to family. Gift/estate value of remainder is discounted by charity\'s lead interest. Effective when 7520 rates are low. Grantor CLT provides upfront income tax deduction.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-066',
    text: 'Crummey powers are used in irrevocable trusts primarily to:',
    options: [
      { id: 'A', text: 'Allow trustee discretion over distributions' },
      { id: 'B', text: 'Qualify transfers for the annual gift tax exclusion' },
      { id: 'C', text: 'Protect assets from creditors' },
      { id: 'D', text: 'Provide income tax deductions' }
    ],
    correctOptionId: 'B',
    explanation: 'Crummey powers give beneficiaries temporary right to withdraw contributions (usually 30-60 days). This "present interest" qualifies gifts for annual exclusion. Power typically lapses each year. Named after Crummey v. Commissioner. Common in ILITs.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-067',
    text: 'The annual gift tax exclusion amount for 2024 is:',
    options: [
      { id: 'A', text: '$15,000' },
      { id: 'B', text: '$16,000' },
      { id: 'C', text: '$17,000' },
      { id: 'D', text: '$18,000' }
    ],
    correctOptionId: 'D',
    explanation: 'The 2024 annual gift tax exclusion is $18,000 per donee (up from $17,000 in 2023). Unlimited recipients allowed. Married couples can gift-split for $36,000 per donee. No gift tax return required if under annual exclusion.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-068',
    text: 'Which is NOT a benefit of using an Irrevocable Life Insurance Trust (ILIT)?',
    options: [
      { id: 'A', text: 'Death benefit excluded from insured\'s estate' },
      { id: 'B', text: 'Provides liquidity for estate taxes' },
      { id: 'C', text: 'Insured retains policy ownership rights' },
      { id: 'D', text: 'Creditor protection for policy' }
    ],
    correctOptionId: 'C',
    explanation: 'ILIT requires insured to NOT own the policy (trust is owner). If insured retains incidents of ownership, death benefit is included in estate (IRC 2042). Key: insured cannot be trustee, beneficiary with control, or retain ownership rights.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-069',
    text: 'A bypass trust (credit shelter trust) is designed to:',
    options: [
      { id: 'A', text: 'Qualify for the marital deduction' },
      { id: 'B', text: 'Use the deceased spouse\'s estate tax exemption' },
      { id: 'C', text: 'Provide unlimited distributions to surviving spouse' },
      { id: 'D', text: 'Avoid all income taxation' }
    ],
    correctOptionId: 'B',
    explanation: 'Bypass trust uses deceased spouse\'s exemption ($13.61M in 2024) to shelter assets from estate tax at both deaths. Does NOT qualify for marital deduction—that\'s the point. Surviving spouse can receive income and limited principal (HEMS standard). Less critical now with portability.',
    courseId: 'cfp',
    blueprintArea: 'EST-3',
    skillLevel: 'Analysis' as const
  },
  {
    id: 'CFP-EST-070',
    text: 'What is the consequence of dying intestate?',
    options: [
      { id: 'A', text: 'All assets pass to the state' },
      { id: 'B', text: 'Assets distributed according to state intestacy laws' },
      { id: 'C', text: 'Spouse receives everything' },
      { id: 'D', text: 'No estate taxes are owed' }
    ],
    correctOptionId: 'B',
    explanation: 'Dying intestate (without will) means state law determines distribution—typically spouse and children, but varies by state. Escheat to state only if no heirs found. May not reflect decedent\'s wishes. Guardianship of minors decided by court.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-071',
    text: 'The alternate valuation date for estate tax purposes is:',
    options: [
      { id: 'A', text: '3 months after death' },
      { id: 'B', text: '6 months after death' },
      { id: 'C', text: '9 months after death' },
      { id: 'D', text: '12 months after death' }
    ],
    correctOptionId: 'B',
    explanation: 'Alternate valuation date is 6 months after death. Can only be elected if it reduces both gross estate AND estate tax. Property sold or distributed before 6 months valued at date of distribution. Elected on Form 706.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-072',
    text: 'A Qualified Domestic Trust (QDOT) is required when:',
    options: [
      { id: 'A', text: 'Estate exceeds unified credit' },
      { id: 'B', text: 'Assets pass to non-citizen surviving spouse' },
      { id: 'C', text: 'Beneficiaries are minors' },
      { id: 'D', text: 'Estate includes foreign assets' }
    ],
    correctOptionId: 'B',
    explanation: 'QDOT is required for unlimited marital deduction when surviving spouse is not a U.S. citizen. QDOT requirements: U.S. trustee, withholding on principal distributions, other regulatory requirements. Estate tax deferred until principal distributed or surviving spouse dies.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-073',
    text: 'What is the result of a qualified disclaimer?',
    options: [
      { id: 'A', text: 'Disclaimant chooses who receives the property' },
      { id: 'B', text: 'Property passes as if disclaimant predeceased' },
      { id: 'C', text: 'Property goes to the state' },
      { id: 'D', text: 'Disclaimant receives stepped-up basis' }
    ],
    correctOptionId: 'B',
    explanation: 'Qualified disclaimer treats disclaimant as predeceasing decedent—property passes to next in line. Requirements: written, within 9 months of death/transfer, no acceptance of benefits, no direction by disclaimant. Useful for post-mortem estate planning.',
    courseId: 'cfp',
    blueprintArea: 'EST-1',
    skillLevel: 'Application' as const
  },
  {
    id: 'CFP-EST-074',
    text: 'A generation-skipping transfer occurs when assets pass to:',
    options: [
      { id: 'A', text: 'Any minor beneficiary' },
      { id: 'B', text: 'A person two or more generations below the transferor' },
      { id: 'C', text: 'A trust for multiple generations' },
      { id: 'D', text: 'A surviving spouse' }
    ],
    correctOptionId: 'B',
    explanation: 'GST tax applies to transfers to "skip persons"—grandchildren or more remote descendants (or unrelated persons 37.5+ years younger). Rate is flat 40%. Three types: direct skip, taxable termination, taxable distribution. Each person has GST exemption ($13.61M in 2024).',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  },
  {
    id: 'CFP-EST-075',
    text: 'Under current law, what happens to the estate tax exemption after 2025?',
    options: [
      { id: 'A', text: 'Remains at current level permanently' },
      { id: 'B', text: 'Increases to $15 million' },
      { id: 'C', text: 'Sunsets to approximately half the current amount' },
      { id: 'D', text: 'Estate tax is eliminated entirely' }
    ],
    correctOptionId: 'C',
    explanation: 'The TCJA doubled the exemption through 2025. Without legislative action, exemption sunsets to pre-TCJA levels (~$5-6M adjusted for inflation) on January 1, 2026. Creates planning urgency for high-net-worth clients to use exemption now. Anti-clawback regulations protect pre-2026 gifts.',
    courseId: 'cfp',
    blueprintArea: 'EST-2',
    skillLevel: 'Remembering' as const
  }
];

export default CFP_ESTATE_QUESTIONS;
