/**
 * CFP Estate Questions - Batch 9
 * Domain 7: Estate Planning (10% of exam)
 * 25 additional questions covering estate planning topics
 */

import { Question } from '../../../types';

export const CFP_ESTATE_BATCH9_QUESTIONS: Question[] = [
  // EST-1: Documents and Trusts
  {
    id: 'CFP-EST-B9-001',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Self-Proving Affidavit',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A self-proving affidavit attached to a will:',
    options: [
      'A) Makes the will irrevocable',
      'B) Allows the will to be admitted to probate without requiring witnesses to appear and testify',
      'C) Eliminates the need for an executor',
      'D) Transfers assets automatically'
    ],
    correctAnswer: 1,
    explanation: 'Self-proving affidavit: notarized statement by witnesses (and often testator) at time of execution. Allows probate court to accept will without locating witnesses to testify—they already confirmed validity under oath. Speeds probate process. Not required but highly recommended. If witnesses unavailable or deceased, non-self-proved will faces complications.'
  },
  {
    id: 'CFP-EST-B9-002',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Trusts',
    subtopic: 'Totten Trust',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Totten trust (POD account) is:',
    options: [
      'A) A complex irrevocable trust',
      'B) A bank account with a named beneficiary who receives the balance on the depositor\'s death, avoiding probate',
      'C) A trust for minors only',
      'D) A charitable remainder trust'
    ],
    correctAnswer: 1,
    explanation: 'Totten trust (POD—payable on death): bank account with beneficiary designation. During life, depositor has complete control. At death, beneficiary becomes owner—no probate. Simple transfer mechanism. Similar: TOD for securities. Not actually a trust—just a contractual transfer mechanism. Useful for simple estate planning but no management features of actual trusts.'
  },
  {
    id: 'CFP-EST-B9-003',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Trusts',
    subtopic: 'Trust Protector',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A trust protector may be given powers to:',
    options: [
      'A) Serve as a beneficiary',
      'B) Modify trust terms, change trustees, or adjust provisions in response to changed circumstances or laws',
      'C) Receive trust income',
      'D) Create new trusts'
    ],
    correctAnswer: 1,
    explanation: 'Trust protector: independent party with specific powers over trust. Common powers: remove/replace trustee, modify terms for tax law changes, add/remove beneficiaries, change situs, convert to grantor trust. Provides flexibility for long-term trusts as circumstances change. Usually cannot be grantor or beneficiary. Increasingly common in modern trust planning.'
  },
  // EST-2: Transfer Techniques
  {
    id: 'CFP-EST-B9-004',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Transfer Techniques',
    subtopic: 'Private Foundation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Compared to a donor-advised fund, a private foundation:',
    options: [
      'A) Has no administrative burden',
      'B) Offers more control but requires more administration, annual distributions, and public disclosure',
      'C) Allows higher contribution deductions',
      'D) Is simpler to establish'
    ],
    correctAnswer: 1,
    explanation: 'Private foundation vs. DAF: Foundation offers more control (choose investments, hire family, set grant policies) but: 5% annual distribution required, Form 990-PF public, excise tax on net investment income, lower deduction limits (30% vs 60% for cash), higher administrative costs. DAFs simpler but less control. Foundation for larger amounts, family involvement.'
  },
  {
    id: 'CFP-EST-B9-005',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Transfer Techniques',
    subtopic: 'Gift of Remainder Interest',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Gifting a remainder interest in a personal residence:',
    options: [
      'A) Requires immediate move',
      'B) Transfers future ownership while retaining a life estate, generating a current gift tax deduction',
      'C) Has no tax benefits',
      'D) Creates immediate capital gains'
    ],
    correctAnswer: 1,
    explanation: 'Gift of remainder interest: retain right to live in property for life, gift remainder to heirs or charity. Current gift/charitable deduction for PV of remainder (calculated using IRS tables). Continue living there. At death, full ownership passes. Charity version: if to charity, income tax deduction now, continue residence. For heirs: gift tax on remainder value.'
  },
  {
    id: 'CFP-EST-B9-006',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Transfer Techniques',
    subtopic: 'Disclaimed Assets',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A qualified disclaimer of inherited property must:',
    options: [
      'A) Be made anytime',
      'B) Be in writing, within 9 months of death, before accepting any benefits, and the disclaimant cannot direct who receives the property',
      'C) Go to the disclaimant\'s children',
      'D) Be only verbal'
    ],
    correctAnswer: 1,
    explanation: 'Qualified disclaimer IRC 2518: written, within 9 months of transfer (death), no acceptance of benefits or interest, disclaimant cannot direct new recipient (passes as if disclaimant predeceased). Effect: property passes to next in line without being treated as gift from disclaimant. Uses: post-mortem tax planning, when don\'t need/want assets, family planning.'
  },
  // EST-3: Beneficiary Planning
  {
    id: 'CFP-EST-B9-007',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Beneficiary Planning',
    subtopic: 'Simultaneous Death',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the Uniform Simultaneous Death Act, when beneficiary and decedent die simultaneously:',
    options: [
      'A) Property goes to the state',
      'B) Each is treated as predeceasing the other for their own estate, so property goes to contingent beneficiaries',
      'C) Property is split equally',
      'D) Court decides distribution'
    ],
    correctAnswer: 1,
    explanation: 'Simultaneous death: if impossible to determine who died first, each treated as surviving the other for purposes of their own estate. Result: assets go to contingent beneficiaries, not to primary beneficiary\'s estate. Many states require 120-hour survival requirement. Wills/trusts should address with specific survival clauses. Prevents double estate taxation.'
  },
  {
    id: 'CFP-EST-B9-008',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Beneficiary Planning',
    subtopic: 'Tangible Personal Property',
    difficulty: 'easy',
    skillLevel: 'Application',
    question: 'Distributing tangible personal property (furniture, jewelry, collections) is best handled by:',
    options: [
      'A) Detailed listing in the will itself',
      'B) A separate personal property memorandum referenced in the will, which can be updated without redoing the will',
      'C) Verbal instructions only',
      'D) Letting heirs decide after death'
    ],
    correctAnswer: 1,
    explanation: 'Personal property memorandum: separate document listing specific items and intended recipients. Many states allow will to reference this document. Advantages: can update without new will (just new memo), detail without cluttering will, flexibility. Document should be dated and signed. Reduces family conflict over sentimental items. Will must authorize this approach.'
  },
  {
    id: 'CFP-EST-B9-009',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Beneficiary Planning',
    subtopic: 'IRA Trust Beneficiary',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Naming a trust as IRA beneficiary requires attention to:',
    options: [
      'A) No special rules',
      'B) Meeting "identifiable beneficiary" requirements so beneficiaries are treated as designated for distribution purposes',
      'C) Automatic special treatment',
      'D) Only state law'
    ],
    correctAnswer: 1,
    explanation: 'Trust as IRA beneficiary: if "see-through" or "look-through" trust requirements met, beneficiaries\' ages used for distribution. Requirements: valid under state law, irrevocable at death (or becomes so), beneficiaries identifiable, documentation provided to custodian. Otherwise treated as no designated beneficiary (short payout). Conduit vs. accumulation trust affects too.'
  },
  // EST-4: Estate Tax
  {
    id: 'CFP-EST-B9-010',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Estate Tax',
    subtopic: 'State Estate Tax',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'State estate tax considerations are important because:',
    options: [
      'A) All states have same rules as federal',
      'B) Some states have lower exemptions than federal, decouple from federal law, or impose inheritance taxes on beneficiaries',
      'C) Only Washington, DC has estate tax',
      'D) Federal preempts all state taxes'
    ],
    correctAnswer: 1,
    explanation: 'State estate/inheritance taxes: ~12 states plus DC have estate tax, often with lower exemptions than federal ($1-6M vs. $13M federal). ~6 states have inheritance tax (rate depends on beneficiary relationship). Some have both. Can\'t assume federal planning is sufficient. State of residence and property location both matter. May affect domicile decisions.'
  },
  {
    id: 'CFP-EST-B9-011',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Estate Tax',
    subtopic: 'Deductions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The estate tax charitable deduction:',
    options: [
      'A) Is limited to 60% of estate',
      'B) Is unlimited for qualifying transfers and reduces the taxable estate dollar-for-dollar',
      'C) Only applies to cash gifts',
      'D) Requires IRS approval'
    ],
    correctAnswer: 1,
    explanation: 'Estate tax charitable deduction: unlimited for qualifying charitable transfers. Full value of property passing to qualified charities deducted from gross estate. Can be: outright bequests, charitable remainder or lead trusts, charitable bequests of retirement accounts. No percentage limit like income tax. Major estate planning tool—reduces taxable estate.'
  },
  {
    id: 'CFP-EST-B9-012',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Estate Tax',
    subtopic: 'Generation-Skipping Transfer Tax',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The GST tax applies to transfers to:',
    options: [
      'A) Only grandchildren',
      'B) Skip persons, generally those two or more generations below the transferor, to prevent avoiding estate tax at each generation',
      'C) Only direct descendants',
      'D) Spouses'
    ],
    correctAnswer: 1,
    explanation: 'GST tax: imposed on transfers to skip persons (generally 2+ generations below—grandchildren, or unrelated persons 37.5+ years younger). Prevents avoiding estate tax at children\'s generation. Flat rate equal to highest estate tax rate (40%). Separate GST exemption (same as estate). Applies to: direct skips, taxable terminations, taxable distributions. Complex planning area.'
  },
  // EST-5: Advanced Topics
  {
    id: 'CFP-EST-B9-013',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Advanced Estate',
    subtopic: 'Valuation Discounts',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A minority interest discount for estate/gift tax purposes:',
    options: [
      'A) Is always 50%',
      'B) Reduces value because a minority owner cannot control the entity, typically 15-40% depending on circumstances',
      'C) Is prohibited by IRS',
      'D) Only applies to stock'
    ],
    correctAnswer: 1,
    explanation: 'Minority discount: minority ownership stake worth less than proportional share because can\'t control distributions, management, or sale. Combined with lack of marketability discount (no ready market for private interests). Combined discounts often 25-45%. IRS scrutinizes—need qualified appraisal, legitimate business purpose. Commonly used with FLPs, LLCs for estate planning.'
  },
  {
    id: 'CFP-EST-B9-014',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Advanced Estate',
    subtopic: 'Dynasty Trust',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A dynasty trust is designed to:',
    options: [
      'A) Last only 21 years',
      'B) Continue for multiple generations, perpetually in some states, while avoiding estate taxes at each generation',
      'C) Benefit only one generation',
      'D) Be revocable'
    ],
    correctAnswer: 1,
    explanation: 'Dynasty trust: designed to last for generations, even perpetually in states that abolished rule against perpetuities. Avoids estate/GST tax at each generation—property stays in trust, not in beneficiaries\' estates. Uses GST exemption efficiently for many generations. States like South Dakota, Nevada, Alaska allow perpetual trusts. Long-term wealth preservation tool.'
  },
  {
    id: 'CFP-EST-B9-015',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Advanced Estate',
    subtopic: 'Spousal Lifetime Access Trust',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Spousal Lifetime Access Trust (SLAT) allows:',
    options: [
      'A) A spouse to be trustee',
      'B) One spouse to make gifts using exemption while the other spouse can access funds as beneficiary',
      'C) Unlimited gifts between spouses',
      'D) Avoiding all estate taxes'
    ],
    correctAnswer: 1,
    explanation: 'SLAT: irrevocable trust where one spouse is beneficiary. Donor spouse uses exemption, removes assets from estate. Beneficiary spouse can receive distributions if needed (indirect access for couple). Concerns: divorce, beneficiary spouse death, reciprocal trust doctrine (can\'t do mirror SLATs). Popular for using current high exemption ($13M) before potential reduction. Gift splitting may double effectiveness.'
  },
  // Additional Topics
  {
    id: 'CFP-EST-B9-016',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Estate Documents',
    subtopic: 'Letter of Intent',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A letter of intent for a special needs individual:',
    options: [
      'A) Is legally binding',
      'B) Provides guidance to future caregivers about the person\'s needs, preferences, and care requirements',
      'C) Replaces a will',
      'D) Determines trust distributions'
    ],
    correctAnswer: 1,
    explanation: 'Letter of intent: non-binding document sharing information about special needs person. Contents: medical history, daily routines, likes/dislikes, therapy information, behavior management, relationships, future objectives. Extremely helpful for future caregivers/trustees who don\'t know the individual intimately. Should be updated regularly. Complements legal documents.'
  },
  {
    id: 'CFP-EST-B9-017',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Transfer Techniques',
    subtopic: 'Charitable Lead Annuity Trust',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A Charitable Lead Annuity Trust (CLAT) with a zeroed-out design:',
    options: [
      'A) Has no gift tax value',
      'B) Calculates remainder value to be approximately zero, so transfer to heirs may have minimal or no gift tax',
      'C) Benefits charity exclusively',
      'D) Is always grantor-trusted'
    ],
    correctAnswer: 1,
    explanation: 'Zeroed-out CLAT: set annuity payments so PV of remainder (going to heirs) equals approximately zero for gift tax. Charity receives payments for term, remainder to family. If trust growth exceeds IRS assumed rate, excess passes to heirs gift-tax-free. Leverage strategy. Works best: low interest rate environment, high-growth assets. Complex but powerful technique.'
  },
  {
    id: 'CFP-EST-B9-018',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Beneficiary Planning',
    subtopic: 'Digital Assets',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Estate planning for digital assets should address:',
    options: [
      'A) Only email accounts',
      'B) Cryptocurrency, online accounts, digital files, social media, and provide access information in secure manner',
      'C) Nothing—they\'re not valuable',
      'D) Only bank accounts'
    ],
    correctAnswer: 1,
    explanation: 'Digital estate planning: cryptocurrency (access keys critical—if lost, assets gone), online banking/investment accounts, digital photo/file storage, domains, intellectual property, social media, loyalty points. Provide: inventory, access information (secure location), instructions for each type. RUFADAA (Uniform Fiduciary Access to Digital Assets Act) addresses fiduciary access rights.'
  },
  {
    id: 'CFP-EST-B9-019',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Estate Tax',
    subtopic: 'Basis Consistency',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Basis consistency rules require:',
    options: [
      'A) Using purchase price always',
      'B) That beneficiary\'s income tax basis in inherited property cannot exceed the value used for estate tax purposes',
      'C) Identical values for all assets',
      'D) Only fair market value'
    ],
    correctAnswer: 1,
    explanation: 'Basis consistency (IRC 1014(f)): if property reported on estate return, beneficiary\'s basis can\'t exceed estate value reported. Prevents: reporting low value for estate tax but high basis for beneficiary\'s income tax. Form 8971 reports values to beneficiaries. Applies to taxable estates. Statute of limitations: can\'t adjust if return statute expires.'
  },
  {
    id: 'CFP-EST-B9-020',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Advanced Estate',
    subtopic: 'Private Placement Life Insurance',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Private Placement Life Insurance (PPLI) offers wealthy clients:',
    options: [
      'A) The same benefits as regular life insurance',
      'B) Tax-advantaged investment growth, customized investment options, and potential estate tax benefits with ILIT ownership',
      'C) Guaranteed returns',
      'D) Simplified administration'
    ],
    correctAnswer: 1,
    explanation: 'PPLI: life insurance with customized investment options (hedge funds, private equity), tax-deferred growth, income-tax-free death benefit, estate tax-free if in ILIT. For high-net-worth clients with large amounts to invest. Investment diversification requirements apply. Lower insurance costs than retail products. Minimum premiums typically $1M+. Complex but powerful for right clients.'
  },
  {
    id: 'CFP-EST-B9-021',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-1',
    topic: 'Trusts',
    subtopic: 'Blind Trust',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A blind trust is used primarily to:',
    options: [
      'A) Hide assets from creditors',
      'B) Eliminate knowledge of specific holdings to avoid conflicts of interest, often for public officials',
      'C) Reduce estate taxes',
      'D) Benefit charities'
    ],
    correctAnswer: 1,
    explanation: 'Blind trust: beneficiary has no knowledge of or control over investments. Trustee makes all investment decisions independently. Purpose: avoid conflicts of interest (elected officials, executives). Beneficiary knows total value but not specific holdings. Prevents: insider trading issues, policy decisions influenced by investments. Not for tax benefits—for ethical compliance.'
  },
  {
    id: 'CFP-EST-B9-022',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-2',
    topic: 'Transfer Techniques',
    subtopic: 'Bargain Sale',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A bargain sale to charity involves:',
    options: [
      'A) Full market price sale',
      'B) Selling property to charity for less than fair market value, with the difference being a deductible gift',
      'C) Donating property entirely',
      'D) Receiving a premium price'
    ],
    correctAnswer: 1,
    explanation: 'Bargain sale: sell to charity for less than FMV. Part sale, part gift. Basis must be allocated proportionally between sale and gift portions. If appreciated property: recognize gain on sale portion, get deduction for gift portion. Example: $100K property, $60K sale = $40K gift. Complex calculations required. Alternative to outright gift when cash needed.'
  },
  {
    id: 'CFP-EST-B9-023',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-3',
    topic: 'Beneficiary Planning',
    subtopic: 'Spendthrift Provision',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'A spendthrift provision in a trust:',
    options: [
      'A) Forces beneficiary to spend all funds',
      'B) Prevents beneficiaries from assigning their interest and protects trust assets from beneficiaries\' creditors',
      'C) Eliminates all distributions',
      'D) Only applies to minors'
    ],
    correctAnswer: 1,
    explanation: 'Spendthrift provision: beneficiary cannot voluntarily transfer (assign) trust interest, and creditors cannot reach trust principal before distribution. Once distributed, no protection. Exceptions: child support, alimony, IRS, sometimes tort claims. Standard in most trusts. Protects beneficiaries from themselves and others. Enforceability varies by state.'
  },
  {
    id: 'CFP-EST-B9-024',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-4',
    topic: 'Estate Tax',
    subtopic: 'Life Estate',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A retained life estate in property for estate tax purposes:',
    options: [
      'A) Removes property from estate entirely',
      'B) Causes the full property value to be included in the estate because the decedent retained enjoyment',
      'C) Creates no tax consequences',
      'D) Only includes the life estate value'
    ],
    correctAnswer: 1,
    explanation: 'Retained life estate (IRC 2036): if you transfer property but keep right to income or use for life, FULL FMV included in gross estate. Not just life estate value—full property. Exception: adequate consideration. Affects: life estate deeds, some trusts. Intentional QRT planning uses this. Unintentional inclusion can be surprise. Step-up basis benefit.'
  },
  {
    id: 'CFP-EST-B9-025',
    courseId: 'cfp',
    section: 'CFP-EST',
    blueprintArea: 'EST-5',
    topic: 'Advanced Estate',
    subtopic: 'Formula Clauses',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Formula clauses in estate planning documents:',
    options: [
      'A) Are prohibited by IRS',
      'B) Automatically adjust transfers based on tax laws (e.g., "spouse receives amount equal to unused exemption")',
      'C) Are only in wills',
      'D) Create estate tax problems'
    ],
    correctAnswer: 1,
    explanation: 'Formula clauses: amounts defined by formula tied to tax law, not fixed dollars. Examples: "amount to use remaining exemption," "maximum marital deduction needed," "optimal GST allocation." Adjusts automatically if exemptions change. Preventive planning for uncertain law. Must be drafted carefully to achieve goals. Common: funding bypass/credit shelter trust with exemption amount.'
  }
];
