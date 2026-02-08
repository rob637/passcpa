/**
 * CFP Estate Planning Questions - Batch 4
 * Domain 7: Estate Planning (12% of exam)
 * 25 additional questions covering trusts, estate tax, and transfers
 */

import { Question } from '../../../types';

export const CFP_ESTATE_BATCH4_QUESTIONS: Question[] = [
  // EST-1: Estate Tax Fundamentals
  {
    id: 'CFP-EST-B4-001',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Tax',
    subtopic: 'Unified Credit',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'For 2026, the federal estate tax exemption is approximately:',
    options: [
      'A) $5 million per person',
      'B) $7 million per person',
      'C) $13.6 million per person',
      'D) $27 million per married couple'
    ],
    correctAnswer: 2,
    explanation: 'The 2017 TCJA approximately doubled the estate tax exemption, which is indexed for inflation. For 2026, the exemption is approximately $13.6 million per person ($27.2 million for married couples with portability). Note: This amount is scheduled to sunset to approximately $7 million after 2025 unless extended.'
  },
  {
    id: 'CFP-EST-B4-002',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Tax',
    subtopic: 'Marital Deduction',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The unlimited marital deduction allows:',
    options: [
      'A) Married couples to avoid estate tax entirely',
      'B) Unlimited transfers between spouses without gift or estate tax',
      'C) All beneficiaries to receive property tax-free',
      'D) Charitable transfers to be deducted from income'
    ],
    correctAnswer: 1,
    explanation: 'The unlimited marital deduction allows unlimited transfers between spouses (U.S. citizens) without incurring gift or estate tax. This defers taxation until the surviving spouse\'s death. For non-citizen spouses, a Qualified Domestic Trust (QDOT) is required to obtain the deduction.'
  },
  {
    id: 'CFP-EST-B4-003',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Tax',
    subtopic: 'Portability',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'For portability of a deceased spouse\'s unused exemption (DSUE) to be available:',
    options: [
      'A) An estate tax return must be filed timely, even if not otherwise required',
      'B) The estate must exceed the exemption amount',
      'C) The surviving spouse must remarry within two years',
      'D) All assets must pass to the surviving spouse'
    ],
    correctAnswer: 0,
    explanation: 'To preserve portability of the deceased spouse\'s unused exemption, the executor must timely file Form 706, even if no estate tax is due. This election allows the surviving spouse to add the deceased spouse\'s unused exemption to their own, potentially doubling exemption protection.'
  },
  {
    id: 'CFP-EST-B4-004',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Tax',
    subtopic: 'Basis Step-Up',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An heir inherits stock worth $500,000 that the decedent purchased for $100,000. If the heir immediately sells the stock, the taxable gain is:',
    options: [
      'A) $400,000',
      'B) $100,000',
      'C) $500,000',
      'D) $0'
    ],
    correctAnswer: 3,
    explanation: 'Assets receive a step-up (or step-down) in basis to fair market value at death. The heir\'s basis becomes the $500,000 FMV, not the decedent\'s $100,000 cost basis. Selling immediately at $500,000 results in no capital gain. This step-up is a significant tax benefit of holding appreciated assets until death.'
  },
  // EST-2: Trusts
  {
    id: 'CFP-EST-B4-005',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trusts',
    subtopic: 'Revocable Living Trust',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A revocable living trust provides all of the following benefits EXCEPT:',
    options: [
      'A) Avoiding probate',
      'B) Maintaining privacy of asset distribution',
      'C) Reducing estate taxes',
      'D) Providing for incapacity management'
    ],
    correctAnswer: 2,
    explanation: 'Revocable living trusts avoid probate, maintain privacy (unlike wills which become public), and allow continued asset management during incapacity. However, because the grantor retains control, assets remain in the taxable estate. Revocable trusts provide NO estate tax reduction.'
  },
  {
    id: 'CFP-EST-B4-006',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trusts',
    subtopic: 'Irrevocable Trust',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A key characteristic of an irrevocable trust is that:',
    options: [
      'A) The grantor can change beneficiaries at any time',
      'B) Assets transferred are generally removed from the grantor\'s taxable estate',
      'C) The grantor retains full control over trust assets',
      'D) The trust becomes revocable after the grantor\'s death'
    ],
    correctAnswer: 1,
    explanation: 'Irrevocable trusts remove assets from the grantor\'s taxable estate because the grantor gives up control and ownership rights. In exchange for this loss of control, the assets (and future appreciation) are not subject to estate tax in the grantor\'s estate. The grantor cannot change the terms once established.'
  },
  {
    id: 'CFP-EST-B4-007',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trusts',
    subtopic: 'Bypass Trust',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A credit shelter trust (bypass trust) is used to:',
    options: [
      'A) Provide income to the surviving spouse while sheltering assets from their estate',
      'B) Defer all estate taxes until both spouses die',
      'C) Eliminate the need for an estate tax return',
      'D) Provide immediate distributions to grandchildren'
    ],
    correctAnswer: 0,
    explanation: 'A credit shelter (bypass) trust is funded with assets up to the deceased spouse\'s remaining exemption. The surviving spouse can receive income and even principal for health, education, maintenance, and support, but the assets bypass their estate entirely—passing tax-free to children or other beneficiaries.'
  },
  {
    id: 'CFP-EST-B4-008',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trusts',
    subtopic: 'QTIP Trust',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Qualified Terminable Interest Property (QTIP) trust:',
    options: [
      'A) Provides income to the surviving spouse with remainder passing as the first spouse directed',
      'B) Allows the surviving spouse to control who receives assets at their death',
      'C) Does not qualify for the marital deduction',
      'D) Must distribute all income to charity'
    ],
    correctAnswer: 0,
    explanation: 'QTIP trusts provide the surviving spouse with income for life (qualified for marital deduction), but the first spouse to die controls who receives the remainder. This is useful in blended families where the decedent wants to provide for a current spouse while ensuring assets ultimately pass to children from a prior marriage.'
  },
  // EST-3: Gifts and Transfers
  {
    id: 'CFP-EST-B4-009',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Gift Tax',
    subtopic: 'Annual Exclusion',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'For 2026, a married couple can gift how much to each child annually without using any lifetime exemption?',
    options: [
      'A) $19,000',
      'B) $38,000',
      'C) $17,000',
      'D) $34,000'
    ],
    correctAnswer: 1,
    explanation: 'The annual gift exclusion is $19,000 per recipient for 2025 (indexed for inflation). A married couple can split gifts, giving each recipient $38,000 annually ($19,000 from each spouse) without using lifetime exemption or filing a gift tax return (unless electing gift splitting).'
  },
  {
    id: 'CFP-EST-B4-010',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Gift Tax',
    subtopic: 'Education and Medical Exclusions',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Payments for a grandchild\'s college tuition are exempt from gift tax if paid:',
    options: [
      'A) Directly to the grandchild',
      'B) Into a 529 plan for the grandchild',
      'C) Directly to the educational institution',
      'D) To the grandchild\'s parents for reimbursement'
    ],
    correctAnswer: 2,
    explanation: 'Unlimited payments for tuition or medical expenses are excluded from gift tax if paid directly to the educational institution or medical provider. This is in addition to the annual exclusion. Paying the student or a 529 plan does not qualify for this unlimited exclusion.'
  },
  {
    id: 'CFP-EST-B4-011',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Gift Tax',
    subtopic: 'Present Interest',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To qualify for the annual gift tax exclusion, a gift must be:',
    options: [
      'A) Made to a family member',
      'B) A present interest gift (Crummey power)',
      'C) Less than $10,000',
      'D) Made to someone over age 18'
    ],
    correctAnswer: 1,
    explanation: 'Only present interest gifts qualify for the annual exclusion. Future interests (like remainder interests in trusts) do not qualify. Crummey powers give beneficiaries a limited time to withdraw contributions, converting gifts to trusts into present interests eligible for the annual exclusion.'
  },
  {
    id: 'CFP-EST-B4-012',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Transfer Techniques',
    subtopic: 'GRATs',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Grantor Retained Annuity Trust (GRAT) is designed to:',
    options: [
      'A) Transfer appreciation above the Section 7520 rate to beneficiaries gift-tax-free',
      'B) Provide income to charities during the grantor\'s life',
      'C) Eliminate all estate taxes on transferred assets',
      'D) Allow the grantor to retain full control of assets'
    ],
    correctAnswer: 0,
    explanation: 'GRATs transfer appreciation above the IRS Section 7520 interest rate to beneficiaries with minimal or no gift tax. The grantor receives annuity payments for a term of years; any remaining value passes to beneficiaries. If assets outperform the 7520 rate, the excess passes gift-tax-free.'
  },
  // EST-4: Business Succession
  {
    id: 'CFP-EST-B4-013',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Business Succession',
    subtopic: 'Buy-Sell Agreements',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A cross-purchase buy-sell agreement:',
    options: [
      'A) Has the company purchase a deceased owner\'s interest',
      'B) Has surviving owners personally purchase the deceased\'s interest',
      'C) Requires the estate to purchase new ownership interests',
      'D) Uses only term life insurance'
    ],
    correctAnswer: 1,
    explanation: 'In a cross-purchase agreement, surviving owners (not the company) purchase the deceased owner\'s business interest. Each owner owns life insurance on the other owners. This provides a step-up in basis for the surviving owners. With many owners, an entity purchase or trusteed arrangement may be simpler.'
  },
  {
    id: 'CFP-EST-B4-014',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Business Succession',
    subtopic: 'Valuation Discounts',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Minority and lack of marketability discounts can reduce the gift tax value of transferred business interests because:',
    options: [
      'A) All business interests are automatically discounted',
      'B) A minority, non-marketable interest is worth less than a proportionate share of total value',
      'C) The IRS requires discounts on all transfers',
      'D) Discounts only apply to C corporation interests'
    ],
    correctAnswer: 1,
    explanation: 'Minority interests lack control over business decisions, and interests in closely-held businesses lack ready markets for sale. These factors make such interests worth less than their proportionate share of total business value. Properly documented discounts (typically 20-40% combined) can significantly reduce gift and estate tax on transfers.'
  },
  // EST-5: Documents
  {
    id: 'CFP-EST-B4-015',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Estate Documents',
    subtopic: 'Will Requirements',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A will becomes effective:',
    options: [
      'A) When signed by the testator',
      'B) When witnessed',
      'C) Upon the testator\'s death',
      'D) When filed with the probate court'
    ],
    correctAnswer: 2,
    explanation: 'A will is ambulatory—it has no effect until death and can be changed anytime before death. It becomes effective upon the testator\'s death, at which point it is admitted to probate. During life, the testator retains full control over assets and can revoke or amend the will.'
  },
  {
    id: 'CFP-EST-B4-016',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Estate Documents',
    subtopic: 'Power of Attorney',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A durable power of attorney differs from a regular power of attorney in that it:',
    options: [
      'A) Only covers financial matters',
      'B) Continues to be effective if the principal becomes incapacitated',
      'C) Cannot be revoked',
      'D) Automatically expires after one year'
    ],
    correctAnswer: 1,
    explanation: 'A durable power of attorney includes language that it continues in effect (or becomes effective) if the principal becomes incapacitated. A regular POA becomes void upon incapacity. This is essential for managing affairs if someone becomes unable to handle their own decisions.'
  },
  {
    id: 'CFP-EST-B4-017',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Estate Documents',
    subtopic: 'Healthcare Directive',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A healthcare power of attorney allows the appointed agent to:',
    options: [
      'A) Make financial decisions for the principal',
      'B) Make medical decisions if the principal cannot',
      'C) Change the principal\'s will',
      'D) Manage the principal\'s investments'
    ],
    correctAnswer: 1,
    explanation: 'A healthcare power of attorney (healthcare proxy) authorizes an agent to make medical decisions when the principal cannot. This is separate from financial powers of attorney. A living will/advance directive may also specify end-of-life treatment preferences.'
  },
  // EST-2: Additional Trust Topics
  {
    id: 'CFP-EST-B4-018',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trusts',
    subtopic: 'Special Needs Trust',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A special needs trust is designed to:',
    options: [
      'A) Provide for a beneficiary without disqualifying them from government benefits',
      'B) Reduce estate taxes for high-net-worth individuals',
      'C) Fund college education expenses',
      'D) Hold life insurance policies'
    ],
    correctAnswer: 0,
    explanation: 'Special needs trusts (supplemental needs trusts) provide for a disabled beneficiary\'s needs beyond what government programs cover without disqualifying them from means-tested benefits like Medicaid and SSI. The trust must be properly structured to avoid being counted as the beneficiary\'s assets.'
  },
  {
    id: 'CFP-EST-B4-019',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trusts',
    subtopic: 'ILIT',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An Irrevocable Life Insurance Trust (ILIT) removes life insurance proceeds from the taxable estate if:',
    options: [
      'A) The insured names the trust as beneficiary',
      'B) The trust owns the policy and the insured has no incidents of ownership',
      'C) The policy was purchased within three years of death',
      'D) The insured is also the trustee'
    ],
    correctAnswer: 1,
    explanation: 'For life insurance to be excluded from the estate, the insured must have no incidents of ownership (ability to change beneficiary, borrow against policy, etc.). The ILIT must own the policy, pay premiums, and the insured should not be trustee. If a policy is transferred to an ILIT, the three-year rule applies.'
  },
  {
    id: 'CFP-EST-B4-020',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Trusts',
    subtopic: 'Charitable Remainder Trust',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A Charitable Remainder Trust (CRT) provides:',
    options: [
      'A) Immediate income to charity with remainder to family',
      'B) Income to the donor/family for life with remainder to charity',
      'C) Only tax deductions with no income to the donor',
      'D) Assets that remain in the donor\'s taxable estate'
    ],
    correctAnswer: 1,
    explanation: 'CRTs provide income to the donor or other non-charitable beneficiaries for a term or life, with the remainder passing to charity. The donor receives a current income tax deduction for the present value of the charitable remainder. CRTs work well with highly appreciated assets.'
  },
  // EST-3: Additional Transfer Topics
  {
    id: 'CFP-EST-B4-021',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Transfer Techniques',
    subtopic: 'GSTT',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The Generation-Skipping Transfer Tax (GSTT) applies to:',
    options: [
      'A) All transfers to children',
      'B) Transfers to grandchildren or lower generations that skip a generation',
      'C) Transfers between spouses',
      'D) Only outright gifts, not trusts'
    ],
    correctAnswer: 1,
    explanation: 'GSTT is a separate tax on transfers to skip persons (generally grandchildren or those 37.5+ years younger than the donor). It prevents avoidance of one generation of transfer tax. The GSTT rate is a flat 40%, in addition to any estate or gift tax. Each person has a GSTT exemption equal to the estate exemption.'
  },
  {
    id: 'CFP-EST-B4-022',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Gift Tax',
    subtopic: 'Gift Splitting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Gift splitting allows married couples to:',
    options: [
      'A) Give unlimited amounts without gift tax',
      'B) Treat a gift made by one spouse as made half by each',
      'C) Avoid filing gift tax returns',
      'D) Reclaim gifts made in prior years'
    ],
    correctAnswer: 1,
    explanation: 'Gift splitting allows a married couple to treat a gift made by one spouse as if made half by each. This doubles the annual exclusion per recipient and uses both spouses\' exemptions. Both spouses must consent, and a gift tax return must be filed to elect gift splitting.'
  },
  // EST-1: Additional Estate Tax Topics
  {
    id: 'CFP-EST-B4-023',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Tax',
    subtopic: 'Charitable Deduction',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The estate tax charitable deduction is:',
    options: [
      'A) Limited to 30% of the gross estate',
      'B) Unlimited for qualifying charitable transfers',
      'C) Only available for transfers to private foundations',
      'D) Phased out for large estates'
    ],
    correctAnswer: 1,
    explanation: 'Unlike income tax charitable deductions, the estate tax charitable deduction is unlimited. Assets passing to qualified charities at death are fully deductible, reducing the taxable estate dollar-for-dollar. This makes charitable bequests a powerful estate tax planning tool.'
  },
  {
    id: 'CFP-EST-B4-024',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Tax',
    subtopic: 'Gross Estate Inclusions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which asset is NOT typically included in the gross estate?',
    options: [
      'A) Life insurance owned by the decedent on their own life',
      'B) Jointly-held property with right of survivorship',
      'C) Life insurance on the decedent\'s life owned by an ILIT',
      'D) Revocable trust assets'
    ],
    correctAnswer: 2,
    explanation: 'Life insurance owned by an ILIT (not by the decedent) is not included in the gross estate because the decedent had no incidents of ownership. Life insurance owned by the decedent, jointly-held property, and revocable trust assets are all included in the gross estate.'
  },
  {
    id: 'CFP-EST-B4-025',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Tax',
    subtopic: 'Liquidity Planning',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Estate liquidity planning is important because:',
    options: [
      'A) All estates must pay taxes within 30 days',
      'B) Illiquid assets may need to be sold at disadvantageous prices to pay taxes and expenses',
      'C) Probate courts require cash deposits',
      'D) Only liquid assets are subject to estate tax'
    ],
    correctAnswer: 1,
    explanation: 'Estates often contain illiquid assets (real estate, business interests) but face liquidity needs for taxes, administration costs, and family support. Without planning (life insurance, installment payments under §6166), heirs may be forced to sell illiquid assets quickly at discounted prices.'
  }
];
