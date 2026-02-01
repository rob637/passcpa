// REG - Extra Question Bank (Sprint 5 Expansion)
// Additional 50 questions focusing on commonly tested areas

import { Question } from '../../types';

export const REG_QUESTIONS_EXTRA: Question[] = [
  // ==========================================
  // INDIVIDUAL TAXATION
  // ==========================================
  {
    id: 'reg-ind-050',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-individual',
    topic: 'Individual Taxation',
    subtopic: 'Filing Status',
    difficulty: 'medium',
    question: 'To qualify for Head of Household status, all of the following are required EXCEPT:',
    options: [
      'Being unmarried or considered unmarried at year end',
      'Paying more than half the cost of maintaining a home',
      'Having a qualifying person live with you for the entire year',
      'Being a US citizen or resident alien',
    ],
    correctAnswer: 2,
    explanation:
      'A qualifying child must live with you for more than half the year (not entire year). A qualifying parent does not need to live with you at all if you pay more than half their support.',
    reference: 'IRC §2(b)',
  },
  {
    id: 'reg-ind-051',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-individual',
    topic: 'Individual Taxation',
    subtopic: 'Gross Income',
    difficulty: 'easy',
    question: 'Which of the following is excluded from gross income?',
    options: [
      'Gambling winnings',
      'Unemployment compensation',
      'Punitive damages in a lawsuit',
      'Life insurance proceeds paid by reason of death'
    ],
    correctAnswer: 3,
    explanation:
      'Life insurance proceeds paid by reason of death are excluded from gross income under IRC §101. Gambling winnings, unemployment, and punitive damages are all taxable.',
    reference: 'IRC §101',
  },
  {
    id: 'reg-ind-052',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-individual',
    topic: 'Individual Taxation',
    subtopic: 'Deductions',
    difficulty: 'medium',
    question: 'The standard deduction for 2024 for a single taxpayer is:',
    options: [
      '$12,950',
      '$13,850',
      '$27,700',
      '$14,600'
    ],
    correctAnswer: 3,
    explanation:
      'For 2024, the standard deduction is $14,600 for single filers, $29,200 for MFJ, $21,900 for HOH. Additional amounts for blind/elderly.',
    reference: 'IRC §63(c)',
  },
  {
    id: 'reg-ind-053',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-individual',
    topic: 'Individual Taxation',
    subtopic: 'Credits',
    difficulty: 'hard',
    question: 'The Child Tax Credit for 2024 is:',
    options: [
      '$1,000 per child, fully refundable',
      '$3,600 per child under 6',
      '$3,000 per child under 18',
      '$2,000 per child, with up to $1,700 refundable'
    ],
    correctAnswer: 3,
    explanation:
      'For 2024, the Child Tax Credit is $2,000 per qualifying child under 17. Up to $1,700 is refundable as the Additional Child Tax Credit. Subject to income phaseouts.',
    reference: 'IRC §24',
  },
  {
    id: 'reg-ind-054',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-individual',
    topic: 'Individual Taxation',
    subtopic: 'Capital Gains',
    difficulty: 'medium',
    question:
      'Long-term capital gains are taxed at preferential rates. The holding period for long-term treatment is:',
    options: ['6 months', '12 months', 'More than 12 months', '18 months'],
    correctAnswer: 2,
    explanation:
      'To qualify for long-term capital gain rates, the asset must be held for more than 12 months (more than one year). The day of acquisition is excluded.',
    reference: 'IRC §1222',
  },
  {
    id: 'reg-ind-055',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-individual',
    topic: 'Individual Taxation',
    subtopic: 'AMT',
    difficulty: 'hard',
    question: 'Which is an adjustment for individual AMT purposes?',
    options: [
      'Charitable contributions',
      'State and local taxes paid',
      'Home mortgage interest on acquisition debt',
      'Investment interest expense',
    ],
    correctAnswer: 1,
    explanation:
      'State and local taxes are an AMT adjustment (not deductible for AMT). Charitable contributions and acquisition debt interest are allowed for both regular tax and AMT.',
    reference: 'IRC §56',
  },

  // ==========================================
  // PROPERTY TRANSACTIONS
  // ==========================================
  {
    id: 'reg-prop-050',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-property',
    topic: 'Property Transactions',
    subtopic: 'Basis',
    difficulty: 'medium',
    question: 'Property received as a gift takes what basis?',
    options: [
      "Donor's adjusted basis (carryover basis) for gain purposes",
      'Fair market value at date of gift',
      'Zero basis',
      'The amount of gift tax paid'
    ],
    correctAnswer: 0,
    explanation:
      "For gain purposes, gift property takes the donor's carryover basis. For loss, if FMV at gift date is lower, the FMV is used. This prevents transferring losses via gifts.",
    reference: 'IRC §1015',
  },
  {
    id: 'reg-prop-051',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-property',
    topic: 'Property Transactions',
    subtopic: 'Basis',
    difficulty: 'medium',
    question: 'Property inherited from a decedent receives:',
    options: [
      'Carryover basis from the decedent',
      "The decedent's original cost",
      'Zero basis',
      'Stepped-up (or down) basis to FMV at date of death'
    ],
    correctAnswer: 3,
    explanation:
      'Inherited property receives a stepped-up (or stepped-down) basis to fair market value at the date of death (or alternate valuation date if elected).',
    reference: 'IRC §1014',
  },
  {
    id: 'reg-prop-052',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-property',
    topic: 'Property Transactions',
    subtopic: 'Like-Kind Exchange',
    difficulty: 'hard',
    question: 'Under IRC §1031, like-kind exchange treatment applies to:',
    options: [
      'Any business property exchange',
      'Inventory and dealer property',
      'Real and personal property held for investment',
      'Real property held for investment or business use'
    ],
    correctAnswer: 3,
    explanation:
      'Post-TCJA, §1031 applies only to real property held for productive use in trade/business or investment. Personal property, inventory, and stock are excluded.',
    reference: 'IRC §1031',
  },
  {
    id: 'reg-prop-053',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-property',
    topic: 'Property Transactions',
    subtopic: 'Like-Kind Exchange',
    difficulty: 'hard',
    question: 'In a like-kind exchange, boot received:',
    options: [
      'Is never taxable',
      'Causes the entire gain to be recognized',
      'Causes gain to be recognized to the extent of boot received',
      'Creates additional basis in the new property',
    ],
    correctAnswer: 2,
    explanation:
      'Boot (cash or non-like-kind property received) triggers gain recognition, but only to the extent of the lesser of boot received or realized gain.',
    reference: 'IRC §1031(b)',
  },
  {
    id: 'reg-prop-054',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-property',
    topic: 'Property Transactions',
    subtopic: 'Section 1231',
    difficulty: 'medium',
    question: 'Net §1231 gains are treated as:',
    options: [
      'Ordinary income',
      'Long-term capital gains',
      'Short-term capital gains',
      'Tax-exempt income',
    ],
    correctAnswer: 1,
    explanation:
      '§1231 provides best of both worlds: net gains are long-term capital gains (preferential rates), but net losses are ordinary losses (fully deductible).',
    reference: 'IRC §1231',
  },
  {
    id: 'reg-prop-055',
    section: 'REG',
    blueprintArea: 'REG-III',
    topicId: 'reg-property',
    topic: 'Property Transactions',
    subtopic: 'Depreciation Recapture',
    difficulty: 'hard',
    question: '§1245 depreciation recapture applies to:',
    options: [
      'All depreciable property',
      'Buildings only',
      'Land only',
      'Depreciable personal property and certain real property'
    ],
    correctAnswer: 3,
    explanation:
      '§1245 recapture applies to depreciable personal property (and some real property like §1245 property) and treats gain as ordinary to the extent of depreciation taken.',
    reference: 'IRC §1245',
  },

  // ==========================================
  // CORPORATE TAXATION
  // ==========================================
  {
    id: 'reg-corp-050',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-corporate',
    topic: 'Corporate Taxation',
    subtopic: 'Formation',
    difficulty: 'medium',
    question: 'For §351 nonrecognition treatment, transferors must receive:',
    options: [
      'Any stock',
      'At least 80% control immediately after exchange',
      'At least 50% control immediately after exchange',
      '100% of all stock'
    ],
    correctAnswer: 1,
    explanation:
      'For §351 tax-free incorporation, transferors as a group must control 80% or more of the corporation immediately after the exchange. Control means 80% voting and 80% of each class.',
    reference: 'IRC §351',
  },
  {
    id: 'reg-corp-051',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-corporate',
    topic: 'Corporate Taxation',
    subtopic: 'Distributions',
    difficulty: 'medium',
    question: 'Corporate distributions are taxable dividends to the extent of:',
    options: [
      'Current and accumulated E&P',
      'Amount received',
      'Current E&P only',
      'Accumulated E&P only'
    ],
    correctAnswer: 0,
    explanation:
      'Distributions are dividends (taxable) to extent of E&P (current plus accumulated). Excess is return of capital (reduces basis), then capital gain.',
    reference: 'IRC §301',
  },
  {
    id: 'reg-corp-052',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-corporate',
    topic: 'Corporate Taxation',
    subtopic: 'Dividends Received Deduction',
    difficulty: 'medium',
    question:
      "A corporation owning 25% of another corporation's stock may deduct what percentage of dividends received?",
    options: ['50%',
      '80%',
      '65%',
      '100%'],
    correctAnswer: 2,
    explanation:
      'DRD rates: <20% ownership = 50%, 20-79% ownership = 65%, 80%+ ownership = 100%. Subject to taxable income limitations.',
    reference: 'IRC §243',
  },
  {
    id: 'reg-corp-053',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-corporate',
    topic: 'Corporate Taxation',
    subtopic: 'Stock Redemptions',
    difficulty: 'hard',
    question: 'For exchange treatment under §302, a stock redemption must:',
    options: [
      'Be for all shareholders equally',
      'Involve only preferred stock',
      'Be approved by the IRS',
      'Meet one of the tests: substantially disproportionate, complete termination, or not essentially equivalent to dividend'
    ],
    correctAnswer: 3,
    explanation:
      'Exchange treatment (capital gain) requires meeting: substantially disproportionate, complete termination, not essentially equivalent to dividend, or partial liquidation (corporate shareholders).',
    reference: 'IRC §302',
  },
  {
    id: 'reg-corp-054',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-corporate',
    topic: 'Corporate Taxation',
    subtopic: 'Liquidations',
    difficulty: 'hard',
    question: 'In a complete liquidation, the liquidating corporation:',
    options: [
      'Never recognizes gain or loss',
      'Defers all gain to shareholders',
      'Recognizes only gains, not losses',
      'Recognizes gain and loss as if property were sold at FMV'
    ],
    correctAnswer: 3,
    explanation:
      'In complete liquidation under §336, the corporation recognizes gain/loss as if it sold property at FMV. Exceptions for related parties and certain tax-avoidance situations.',
    reference: 'IRC §336',
  },

  // ==========================================
  // PARTNERSHIP TAXATION
  // ==========================================
  {
    id: 'reg-part-050',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-partnership',
    topic: 'Partnership Taxation',
    subtopic: 'Formation',
    difficulty: 'medium',
    question: 'A partner contributing property to a partnership in exchange for an interest:',
    options: [
      'Always recognizes gain',
      'Recognizes gain if FMV exceeds basis',
      'Recognizes gain only if receiving a controlling interest',
      'Generally recognizes no gain (tax-free)'
    ],
    correctAnswer: 3,
    explanation:
      'Under §721, no gain or loss is recognized on contribution of property for a partnership interest. Exceptions: contribution of services, certain disguised sales.',
    reference: 'IRC §721',
  },
  {
    id: 'reg-part-051',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-partnership',
    topic: 'Partnership Taxation',
    subtopic: 'Basis',
    difficulty: 'hard',
    question: "A partner's outside basis in their partnership interest is increased by:",
    options: [
      'Partnership losses allocated',
      'Share of partnership liabilities',
      'Distributions received',
      'Guaranteed payments received'
    ],
    correctAnswer: 1,
    explanation:
      'Outside basis increases by: contributions, share of income, share of liabilities. Decreases by: distributions, share of losses, decrease in liability share.',
    reference: 'IRC §752',
  },
  {
    id: 'reg-part-052',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-partnership',
    topic: 'Partnership Taxation',
    subtopic: 'Distributions',
    difficulty: 'medium',
    question: 'A current (non-liquidating) distribution of cash:',
    options: [
      'Is always taxable',
      'Reduces basis, with gain only if cash exceeds basis',
      'Is never taxable',
      'Creates ordinary income',
    ],
    correctAnswer: 1,
    explanation:
      "Cash distributions reduce partner's basis. Gain is recognized only to extent cash exceeds outside basis. No loss recognition in current distributions.",
    reference: 'IRC §731',
  },
  {
    id: 'reg-part-053',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-partnership',
    topic: 'Partnership Taxation',
    subtopic: 'Guaranteed Payments',
    difficulty: 'medium',
    question: 'Guaranteed payments to partners are:',
    options: [
      'Treated as distributions',
      'Not deductible by the partnership',
      'Capital gains to the partner',
      'Ordinary income to the partner, deductible by partnership'
    ],
    correctAnswer: 3,
    explanation:
      'Guaranteed payments are for services or capital without regard to income. Ordinary income to partner, deductible by partnership in determining ordinary income.',
    reference: 'IRC §707(c)',
  },
  {
    id: 'reg-part-054',
    section: 'REG',
    blueprintArea: 'REG-IV',
    topicId: 'reg-partnership',
    topic: 'Partnership Taxation',
    subtopic: 'Special Allocations',
    difficulty: 'hard',
    question: 'For a special allocation to be respected for tax purposes, it must:',
    options: [
      'Be approved by IRS',
      'Be made in writing',
      'Benefit all partners equally',
      'Have substantial economic effect'
    ],
    correctAnswer: 3,
    explanation:
      'Special allocations must have substantial economic effect to be respected. This generally requires capital account maintenance and liquidation per capital accounts.',
    reference: 'IRC §704(b)',
  },

  // ==========================================
  // S CORPORATIONS
  // ==========================================
  {
    id: 'reg-scorp-050',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-scorp',
    topic: 'S Corporation',
    subtopic: 'Eligibility',
    difficulty: 'medium',
    question: 'An S corporation may have a maximum of:',
    options: ['75 shareholders', '100 shareholders', '500 shareholders', 'Unlimited shareholders'],
    correctAnswer: 1,
    explanation:
      'S corps are limited to 100 shareholders. Family members can elect to be treated as one shareholder. Only individuals, estates, and certain trusts can be shareholders.',
    reference: 'IRC §1361',
  },
  {
    id: 'reg-scorp-051',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-scorp',
    topic: 'S Corporation',
    subtopic: 'Basis',
    difficulty: 'hard',
    question: "An S corporation shareholder's basis is increased by:",
    options: [
      'Corporate-level debt',
      'Distributions received',
      'Share of separately stated income and non-separately stated income',
      'Share of corporate expenses'
    ],
    correctAnswer: 2,
    explanation:
      'S corp stock basis increases by income items (separately and non-separately stated), decreases by distributions, losses, and non-deductible expenses. Unlike partnerships, corporate debt does not increase shareholder basis.',
    reference: 'IRC §1367',
  },
  {
    id: 'reg-scorp-052',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-scorp',
    topic: 'S Corporation',
    subtopic: 'Distributions',
    difficulty: 'medium',
    question: 'S corporation distributions to shareholders are:',
    options: [
      'Always taxable as dividends',
      'Always tax-free',
      'Tax-free to extent of stock basis, then capital gain',
      'Ordinary income'
    ],
    correctAnswer: 2,
    explanation:
      'For S corps with no C corp E&P, distributions are tax-free return of basis, then capital gain. AAA ordering rules apply if C corp E&P exists.',
    reference: 'IRC §1368',
  },
  {
    id: 'reg-scorp-053',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-scorp',
    topic: 'S Corporation',
    subtopic: 'Built-in Gains Tax',
    difficulty: 'hard',
    question: 'The built-in gains tax applies when:',
    options: [
      'Any S corp sells assets',
      'A C corp converts to S corp and sells appreciated assets within recognition period',
      'An S corp has passive income',
      'Shareholders sell their stock',
    ],
    correctAnswer: 1,
    explanation:
      'Built-in gains tax applies when a former C corp (now S corp) sells assets with built-in gain within the recognition period. Tax is at highest corporate rate.',
    reference: 'IRC §1374',
  },

  // ==========================================
  // BUSINESS LAW
  // ==========================================
  {
    id: 'reg-law-050',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-contracts',
    topic: 'Business Law',
    subtopic: 'Contract Formation',
    difficulty: 'easy',
    question: 'A valid contract requires all of the following EXCEPT:',
    options: ['Offer and acceptance',
      'A written document',
      'Consideration',
      'Legal capacity'],
    correctAnswer: 1,
    explanation:
      'Contracts require: offer, acceptance, consideration, capacity, and legality. Writing is only required for certain contracts under Statute of Frauds.',
    reference: 'Restatement (Second) of Contracts',
  },
  {
    id: 'reg-law-051',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-contracts',
    topic: 'Business Law',
    subtopic: 'Statute of Frauds',
    difficulty: 'medium',
    question: 'Under the Statute of Frauds, which contract must be in writing?',
    options: [
      'A contract for sale of goods for $600',
      'A contract for services worth $400',
      'A contract performed within one month',
      'A contract for personal services'
    ],
    correctAnswer: 0,
    explanation:
      'UCC requires writing for sale of goods ≥$500. Also: real property, contracts not performed within 1 year, suretyship, marriage, executor promises.',
    reference: 'UCC §2-201',
  },
  {
    id: 'reg-law-052',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-agency',
    topic: 'Business Law',
    subtopic: 'Agency',
    difficulty: 'medium',
    question: 'A principal is liable for the torts of an agent when:',
    options: [
      'The tort is intentional',
      'The principal has deep pockets',
      'The agent is independent',
      'The agent acts within the scope of employment'
    ],
    correctAnswer: 3,
    explanation:
      'Under respondeat superior, a principal/employer is vicariously liable for agent/employee torts committed within the scope of employment.',
    reference: 'Restatement (Third) of Agency',
  },
  {
    id: 'reg-law-053',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-agency',
    topic: 'Business Law',
    subtopic: 'Agency Authority',
    difficulty: 'medium',
    question: 'Apparent authority arises from:',
    options: [
      'Express grant by principal',
      "Agent's own statements",
      "Reasonable belief of third party based on principal's conduct",
      'Implied necessity'
    ],
    correctAnswer: 2,
    explanation:
      "Apparent authority exists when a third party reasonably believes the agent has authority based on the principal's manifestations (not agent's statements).",
    reference: 'Restatement (Third) of Agency §2.03',
  },
  {
    id: 'reg-law-054',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-debtor',
    topic: 'Business Law',
    subtopic: 'Secured Transactions',
    difficulty: 'hard',
    question: 'To perfect a security interest in goods, a creditor must:',
    options: [
      'Have a written security agreement only',
      'Take possession of the collateral only',
      'File a financing statement with the appropriate office',
      'Notify the debtor'
    ],
    correctAnswer: 2,
    explanation:
      'Perfection typically requires filing a UCC-1 financing statement. Alternative methods include possession (for tangible collateral) or control (for certain intangibles).',
    reference: 'UCC §9-310',
  },
  {
    id: 'reg-law-055',
    section: 'REG',
    blueprintArea: 'REG-I',
    topicId: 'reg-debtor',
    topic: 'Business Law',
    subtopic: 'Bankruptcy',
    difficulty: 'medium',
    question: 'In Chapter 7 bankruptcy, which debt is NOT dischargeable?',
    options: [
      'Credit card debt',
      'Medical bills',
      'Personal loans',
      'Student loans (absent undue hardship)'
    ],
    correctAnswer: 3,
    explanation:
      'Student loans are generally non-dischargeable unless the debtor proves undue hardship. Also non-dischargeable: taxes within 3 years, child support, fraud debts.',
    reference: '11 USC §523',
  },
];
