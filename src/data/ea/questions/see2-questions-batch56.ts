/**
 * EA SEE Part 2: Businesses - Questions Batch 56
 * Focus: SEE2-5 Partnerships & SEE2-6 C Corporations
 * Filling critical blueprint coverage gaps
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH56: Question[] = [
  // ============================================================================
  // SEE2-5: PARTNERSHIPS (Expanding from 55 → 90+)
  // ============================================================================
  
  {
    id: 'see2-part-001',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Formation',
    subtopic: 'Contribution of Property',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a partner contributes property to a partnership in exchange for a partnership interest, the partner generally recognizes:',
    options: [
      'Gain equal to FMV minus adjusted basis',
      'No gain or loss',
      'Gain only if the FMV exceeds twice the basis',
      'Loss only if the basis exceeds FMV'
    ],
    correctAnswer: 1,
    explanation: 'Under §721, no gain or loss is generally recognized on contribution of property to a partnership in exchange for a partnership interest. The partnership takes the contributor\'s basis (carryover basis) and the partner\'s basis in the partnership interest equals the property basis.',
    reference: 'IRC §721'
  },
  {
    id: 'see2-part-002',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Formation',
    subtopic: 'Contribution with Debt',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Partner A contributes property with a basis of $20,000 and FMV of $100,000, subject to a mortgage of $70,000, to a 50% partnership. What is A\'s gain recognized?',
    options: [
      '$0',
      '$15,000',
      '$35,000',
      '$50,000'
    ],
    correctAnswer: 1,
    explanation: 'A is relieved of $70,000 debt but assumes 50% of partnership debt = $35,000. Net debt relief = $70,000 - $35,000 = $35,000. A\'s basis = $20,000 (property) - $35,000 (net debt relief) = negative $15,000, so A recognizes $15,000 gain (basis cannot go below zero). Gain is recognized when net debt relief exceeds the contributing partner\'s basis in the contributed property.',
    reference: 'IRC §721, §752'
  },
  {
    id: 'see2-part-003',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Formation',
    subtopic: 'Services for Interest',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A partner who receives a partnership capital interest in exchange for services recognizes:',
    options: [
      'No income under §721',
      'Ordinary income equal to the FMV of the interest received',
      'Capital gain equal to the FMV of the interest received',
      'Income only when the interest is sold'
    ],
    correctAnswer: 1,
    explanation: 'Section 721 does not apply to services. A partner receiving a capital interest (immediate liquidation value) for services must recognize ordinary income equal to the FMV of the interest. If only a profits interest is received (no immediate value), generally no income is recognized under Rev. Proc. 93-27.',
    reference: 'IRC §721, Rev. Proc. 93-27'
  },
  {
    id: 'see2-part-004',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partner Basis',
    subtopic: 'Outside Basis Adjustments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A partner\'s outside basis is increased by all of the following EXCEPT:',
    options: [
      'Distributive share of partnership income',
      'Additional capital contributions',
      'Increase in partner\'s share of partnership debt',
      'Distributions received from the partnership'
    ],
    correctAnswer: 3,
    explanation: 'Outside basis is increased by income, contributions, and debt increases. Distributions DECREASE basis. The order is: (1) increase for income, (2) decrease for distributions, (3) decrease for losses. This ensures losses don\'t create negative basis.',
    reference: 'IRC §705'
  },
  {
    id: 'see2-part-005',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partner Basis',
    subtopic: 'Tax-Exempt Income',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A partner\'s share of tax-exempt income earned by the partnership:',
    options: [
      'Is excluded from basis calculations entirely',
      'Increases the partner\'s outside basis',
      'Decreases the partner\'s outside basis',
      'Has no effect on basis but is reported on Schedule K-1'
    ],
    correctAnswer: 1,
    explanation: 'Tax-exempt income increases the partner\'s outside basis even though it\'s not taxable. This prevents the exempt income from being taxed when the partner sells their interest or receives distributions. Non-deductible expenses correspondingly decrease basis.',
    reference: 'IRC §705(a)(1)(B)'
  },
  {
    id: 'see2-part-006',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Allocations',
    subtopic: 'Substantial Economic Effect',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Special allocations of partnership items must have:',
    options: [
      'Approval from all partners',
      'Substantial economic effect',
      'IRS pre-approval',
      'Equal allocation among all partners'
    ],
    correctAnswer: 1,
    explanation: 'Under §704(b), allocations must have substantial economic effect. "Economic effect" means the allocation actually affects the dollar amount of each partner\'s share. "Substantial" means there is a reasonable possibility the allocation will substantially affect amounts received by partners independent of tax consequences.',
    reference: 'IRC §704(b)'
  },
  {
    id: 'see2-part-007',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Distributions',
    subtopic: 'Non-Liquidating Distribution',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'In a non-liquidating (current) distribution of cash from a partnership:',
    options: [
      'Gain is recognized if cash exceeds the partner\'s basis',
      'No gain is ever recognized',
      'Gain is recognized equal to cash received',
      'Gain depends on partnership agreement'
    ],
    correctAnswer: 0,
    explanation: 'In a current distribution, gain is recognized ONLY if the cash distributed exceeds the partner\'s outside basis. Property distributions generally do not trigger gain. The partner takes a carryover basis in distributed property, limited to their remaining outside basis.',
    reference: 'IRC §731(a)'
  },
  {
    id: 'see2-part-008',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Distributions',
    subtopic: 'Liquidating Distribution',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In a liquidating distribution, a partner may recognize a loss when:',
    options: [
      'Any time FMV of distributed property is less than basis',
      'Only when cash, unrealized receivables, and inventory are the only items received, and they total less than the partner\'s basis',
      'Only when the partnership has overall losses',
      'Loss is never recognized in partnership distributions'
    ],
    correctAnswer: 1,
    explanation: 'Loss recognition in a liquidating distribution is limited to cases where only cash, unrealized receivables, and/or inventory are received, and their total is less than the partner\'s outside basis. If other property is also received, loss is deferred (basis is allocated to that property).',
    reference: 'IRC §731(a)(2)'
  },
  {
    id: 'see2-part-009',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Sale of Partnership Interest',
    subtopic: 'Character of Gain',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a partner sells their partnership interest, gain attributable to "hot assets" (unrealized receivables and inventory) is treated as:',
    options: [
      'Capital gain',
      'Ordinary income',
      'Section 1231 gain',
      'Tax-exempt income'
    ],
    correctAnswer: 1,
    explanation: 'Under §751(a), gain attributable to "hot assets" (unrealized receivables and substantially appreciated inventory) is ordinary income, regardless of how long the partner held the interest. The remaining gain/loss is capital. This prevents conversion of ordinary income to capital gain.',
    reference: 'IRC §751(a)'
  },
  {
    id: 'see2-part-010',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Self-Employment Tax',
    subtopic: 'General Partners',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A general partner\'s distributive share of partnership ordinary income is:',
    options: [
      'Subject to self-employment tax',
      'Exempt from self-employment tax',
      'Subject to SE tax only if the partner works in the business',
      'Subject to SE tax only if over $400'
    ],
    correctAnswer: 0,
    explanation: 'A general partner\'s distributive share of ordinary income (not investment income) is subject to self-employment tax, regardless of the partner\'s level of involvement. Limited partners generally owe SE tax only on guaranteed payments for services (not their distributive share).',
    reference: 'IRC §1402(a)'
  },
  {
    id: 'see2-part-011',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Guaranteed Payments',
    subtopic: 'Treatment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Guaranteed payments to a partner are:',
    options: [
      'Deductible by the partnership and ordinary income to the partner',
      'Not deductible by the partnership but capital gain to the partner',
      'Deductible by the partnership and tax-exempt to the partner',
      'Treated as distributions reducing basis'
    ],
    correctAnswer: 0,
    explanation: 'Guaranteed payments are deductible by the partnership in computing ordinary income and are ordinary income to the receiving partner. They are determined without regard to partnership income - paid regardless of profit/loss. They are subject to self-employment tax.',
    reference: 'IRC §707(c)'
  },
  {
    id: 'see2-part-012',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Returns',
    subtopic: 'Filing Requirements',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Partnerships file their returns on:',
    options: [
      'Form 1040, Schedule C',
      'Form 1065',
      'Form 1120',
      'Form 1120-S'
    ],
    correctAnswer: 1,
    explanation: 'Partnerships file Form 1065 (U.S. Return of Partnership Income). This is an information return - the partnership itself does not pay income tax. Individual allocations are reported on Schedule K-1 to each partner, who reports on their individual returns.',
    reference: 'IRC §6031'
  },
  {
    id: 'see2-part-013',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Returns',
    subtopic: 'Due Date',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Form 1065 is due on:',
    options: [
      'March 15 (or the 15th day of the 3rd month after year-end)',
      'April 15',
      'September 15',
      'The last day of the 4th month after year-end'
    ],
    correctAnswer: 0,
    explanation: 'Form 1065 is due March 15 for calendar-year partnerships (15th day of the 3rd month after fiscal year-end). A 6-month extension to September 15 is available via Form 7004. Late filing results in a penalty of $235 per partner per month (2024).',
    reference: 'IRC §6072(b)'
  },
  {
    id: 'see2-part-014',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Debt Allocation',
    subtopic: 'Recourse vs Nonrecourse',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Recourse debt of a partnership is allocated to:',
    options: [
      'All partners based on profit-sharing ratios',
      'Partners who bear the economic risk of loss',
      'Only general partners equally',
      'Only the managing partner'
    ],
    correctAnswer: 1,
    explanation: 'Partnership recourse debt is allocated to partners who bear the economic risk of loss - those who would be obligated to pay the creditor if the partnership cannot. For general partnerships, this usually follows profit/loss ratios. For LPs, limited partners have no recourse debt allocation.',
    reference: 'Treas. Reg. §1.752-2'
  },
  {
    id: 'see2-part-015',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Debt Allocation',
    subtopic: 'Nonrecourse Debt',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Nonrecourse debt of a partnership is generally allocated:',
    options: [
      'Only to general partners',
      'Only to the partner who contributed the encumbered property',
      'To all partners based on their share of profits',
      'Equally among all partners'
    ],
    correctAnswer: 2,
    explanation: 'Nonrecourse debt (where no partner has personal liability) is generally allocated in three tiers: (1) partnership minimum gain, (2) §704(c) minimum gain, (3) based on the partners\' share of profits. All partners (including limited partners) can be allocated nonrecourse debt.',
    reference: 'Treas. Reg. §1.752-3'
  },
  {
    id: 'see2-part-016',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Section 754 Election',
    subtopic: 'Basis Adjustment',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A §754 election provides for a basis adjustment to partnership assets when:',
    options: [
      'Any partner contributes additional capital',
      'A partner dies or sells their interest (§743(b)) or property is distributed (§734(b))',
      'The partnership files its annual return',
      'Only when all partners agree unanimously'
    ],
    correctAnswer: 1,
    explanation: 'A §754 election allows adjustment to the inside basis of partnership assets upon: (1) transfer of a partnership interest (sale/death) under §743(b), or (2) certain distributions under §734(b). This aligns the inside and outside basis to prevent inequities.',
    reference: 'IRC §754, §743(b), §734(b)'
  },
  {
    id: 'see2-part-017',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Termination',
    subtopic: 'Technical Termination',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Under current law (post-TCJA), a partnership terminates for tax purposes only when:',
    options: [
      '50% or more of interests change hands within 12 months',
      'All operations cease and no business is conducted',
      'A majority of partners vote to dissolve',
      'Any partner withdraws from the partnership'
    ],
    correctAnswer: 1,
    explanation: 'The TCJA (2017) repealed technical terminations. Now, a partnership terminates for tax purposes only when no part of its business continues to be carried on by any partner. The old 50%-ownership-change rule no longer applies.',
    reference: 'IRC §708(b)(1)'
  },
  {
    id: 'see2-part-018',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Partnership Losses',
    subtopic: 'Loss Limitations',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The correct order of loss limitation rules applied to partnership losses is:',
    options: [
      'At-risk, basis, passive activity, excess business loss',
      'Basis, at-risk, passive activity, excess business loss',
      'Passive activity, basis, at-risk, excess business loss',
      'Basis, passive activity, at-risk, excess business loss'
    ],
    correctAnswer: 1,
    explanation: 'Partnership losses are limited in this order: (1) basis limitation (§704(d)), (2) at-risk limitation (§465), (3) passive activity limitation (§469), (4) excess business loss limitation (§461(l)). A loss must pass each hurdle before being deductible.',
    reference: 'IRC §704(d), §465, §469, §461(l)'
  },
  {
    id: 'see2-part-019',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Family Partnerships',
    subtopic: 'Capital as Factor',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In a family partnership where capital is a material income-producing factor:',
    options: [
      'The donee partner is not recognized for tax purposes',
      'The donor must be allocated reasonable compensation before allocating income to donee',
      'Income is always split equally',
      'The donee cannot receive more than 50% of income'
    ],
    correctAnswer: 1,
    explanation: 'Under §704(e), in family partnerships where capital is a material factor, the donor-partner must receive reasonable compensation for services before allocating remaining income. The donee\'s share cannot be proportionally greater than the donor\'s share attributable to capital.',
    reference: 'IRC §704(e)'
  },
  {
    id: 'see2-part-020',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-5',
    topic: 'Organization Costs',
    subtopic: 'Deduction/Amortization',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Partnership organizational costs may be:',
    options: [
      'Fully deducted in the first year',
      'Deducted up to $5,000 in the first year, with remainder amortized over 180 months',
      'Amortized over 60 months only',
      'Not deductible; must be capitalized permanently'
    ],
    correctAnswer: 1,
    explanation: 'Under §709, up to $5,000 of organizational expenditures may be deducted in the first year (reduced dollar-for-dollar if total exceeds $50,000). The remainder is amortized over 180 months. Syndication costs are NOT deductible and must be capitalized.',
    reference: 'IRC §709'
  },
  
  // ============================================================================
  // SEE2-6: C CORPORATIONS (Expanding from 83 → 110+)
  // ============================================================================
  
  {
    id: 'see2-ccorp-001',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Formation',
    subtopic: 'Section 351',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under §351, no gain or loss is recognized on transfer of property to a corporation if:',
    options: [
      'The transferor receives stock and controls the corporation immediately after transfer',
      'The transferor receives any corporate interest',
      'The corporation is newly formed',
      'Only one person makes the transfer'
    ],
    correctAnswer: 0,
    explanation: 'Section 351 requires: (1) transfer of property (not services) to a corporation, (2) solely in exchange for stock, (3) transferors as a group control the corporation (80% or more) immediately after the transfer. Boot (non-stock consideration) triggers gain recognition.',
    reference: 'IRC §351'
  },
  {
    id: 'see2-ccorp-002',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Formation',
    subtopic: 'Boot Received',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In a §351 exchange, a transferor receives stock worth $80,000 and cash of $20,000 for property with a basis of $60,000 and FMV of $100,000. What gain is recognized?',
    options: [
      '$0',
      '$20,000',
      '$40,000',
      '$100,000'
    ],
    correctAnswer: 1,
    explanation: 'Gain recognized in a §351 exchange with boot equals the lesser of: (1) realized gain ($100,000 - $60,000 = $40,000), or (2) boot received ($20,000). Here, $20,000 is less than $40,000, so $20,000 gain is recognized.',
    reference: 'IRC §351(b)'
  },
  {
    id: 'see2-ccorp-003',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Tax Rates',
    subtopic: 'Flat Rate',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The federal corporate income tax rate for C corporations is:',
    options: [
      '15%',
      '21%',
      '28%',
      '35%'
    ],
    correctAnswer: 1,
    explanation: 'Since TCJA (2018), C corporations pay a flat 21% federal income tax rate. This replaced the prior graduated rate structure (15%, 25%, 34%, 35%). There is no lower rate for small corporations.',
    reference: 'IRC §11(b)'
  },
  {
    id: 'see2-ccorp-004',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Accumulated Earnings Tax',
    subtopic: 'Reasonable Needs',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The accumulated earnings tax applies to corporations that:',
    options: [
      'Have earnings over $1 million',
      'Accumulate earnings beyond reasonable business needs to avoid shareholder tax on dividends',
      'Are publicly traded',
      'Pay dividends of less than 50% of earnings'
    ],
    correctAnswer: 1,
    explanation: 'The accumulated earnings tax (20% rate) applies to C corporations that accumulate earnings beyond reasonable business needs to avoid individual income tax on dividends. Reasonable needs include business expansion, debt retirement, and working capital. The exempt accumulation is $250,000 ($150,000 for PSCs).',
    reference: 'IRC §531-537'
  },
  {
    id: 'see2-ccorp-005',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Personal Holding Company',
    subtopic: 'PHC Tax',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A personal holding company (PHC) is subject to an additional tax of:',
    options: [
      '15% on undistributed PHC income',
      '20% on undistributed PHC income',
      '30% on all PHC income',
      '21% on all income'
    ],
    correctAnswer: 1,
    explanation: 'The PHC tax is 20% on undistributed personal holding company income. A PHC is a corporation where: (1) more than 50% owned by 5 or fewer individuals, and (2) 60% or more of adjusted ordinary gross income is PHC income (dividends, interest, rents, royalties, certain personal service income).',
    reference: 'IRC §541, §542'
  },
  {
    id: 'see2-ccorp-006',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Dividends',
    subtopic: 'Dividends Received Deduction',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A C corporation receiving dividends from a domestic corporation in which it owns 25% of the stock may deduct:',
    options: [
      '50% of dividends received',
      '65% of dividends received',
      '80% of dividends received',
      '100% of dividends received'
    ],
    correctAnswer: 1,
    explanation: 'The dividends received deduction (DRD) is: 50% for ownership < 20%, 65% for ownership of 20-79%, and 100% for ownership of 80% or more (affiliated group). Since 25% falls in the 20-79% range, the DRD is 65%.',
    reference: 'IRC §243'
  },
  {
    id: 'see2-ccorp-007',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Charitable Deductions',
    subtopic: 'Limitation',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'A C corporation\'s charitable contribution deduction is limited to:',
    options: [
      '5% of taxable income',
      '10% of taxable income (before certain deductions)',
      '25% of taxable income',
      '60% of taxable income'
    ],
    correctAnswer: 1,
    explanation: 'C corporations may deduct charitable contributions up to 10% of taxable income (computed before the charitable deduction, DRD, NOL carryback, and capital loss carryback). Excess contributions carry forward 5 years.',
    reference: 'IRC §170(b)(2)'
  },
  {
    id: 'see2-ccorp-008',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Distributions',
    subtopic: 'Earnings and Profits',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a C corporation distributes property to shareholders, the amount treated as a dividend is limited to:',
    options: [
      'The fair market value of the property',
      'The corporation\'s accumulated and current earnings and profits (E&P)',
      'The shareholder\'s basis in stock',
      'The lesser of FMV or basis of distributed property'
    ],
    correctAnswer: 1,
    explanation: 'Distributions are dividends to the extent of current and accumulated E&P. Amounts exceeding E&P are return of capital (reducing stock basis). Amounts exceeding stock basis are capital gain. Order: first current E&P, then accumulated E&P.',
    reference: 'IRC §301, §316'
  },
  {
    id: 'see2-ccorp-009',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Liquidation',
    subtopic: 'Shareholder Treatment',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When a corporation completely liquidates, shareholders recognize:',
    options: [
      'Ordinary income on all amounts received',
      'Gain or loss (generally capital) based on FMV of property received minus stock basis',
      'No gain or loss until property is sold',
      'Dividend income equal to the distribution'
    ],
    correctAnswer: 1,
    explanation: 'In a complete liquidation under §331, shareholders treat the liquidating distribution as full payment for stock. Gain or loss equals FMV of property received minus adjusted basis of stock surrendered. The gain/loss is generally capital in nature.',
    reference: 'IRC §331'
  },
  {
    id: 'see2-ccorp-010',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Liquidation',
    subtopic: 'Corporate Level',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A liquidating corporation recognizes gain or loss:',
    options: [
      'Never - liquidation is tax-free',
      'On all property distributed as if sold at FMV',
      'Only on property with built-in gains',
      'Only if the shareholder recognizes gain'
    ],
    correctAnswer: 1,
    explanation: 'Under §336, a liquidating corporation recognizes gain or loss on all property distributed as if it were sold at FMV. This is double taxation - the corporation pays tax on the gain, and shareholders also recognize gain/loss. Exception: §332 subsidiary liquidation.',
    reference: 'IRC §336'
  },
  {
    id: 'see2-ccorp-011',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Net Operating Loss',
    subtopic: 'NOL Rules',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A C corporation\'s net operating loss (NOL) may:',
    options: [
      'Only be carried forward 5 years',
      'Be carried forward indefinitely but limited to 80% of taxable income',
      'Be carried back 2 years and forward 20 years',
      'Be carried forward indefinitely with no limitation'
    ],
    correctAnswer: 1,
    explanation: 'Under post-TCJA rules (for NOLs arising after 2020), NOLs carry forward indefinitely but are limited to 80% of taxable income. NOL carrybacks are generally not allowed (with limited exceptions). The 80% limitation ensures some tax is always paid.',
    reference: 'IRC §172'
  },
  {
    id: 'see2-ccorp-012',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Stock Redemptions',
    subtopic: 'Qualifying Redemptions',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A stock redemption is treated as a sale (capital gain) rather than a dividend if it meets which test?',
    options: [
      'Any redemption is treated as a sale',
      'Substantially disproportionate, complete termination, or not essentially equivalent to a dividend',
      'Only if the shareholder owns less than 50%',
      'Only if authorized by the board of directors'
    ],
    correctAnswer: 1,
    explanation: 'Under §302, a redemption is treated as a sale if it is: (1) substantially disproportionate (after redemption, shareholder owns < 50% voting and < 80% of prior percentage), (2) complete termination of interest, or (3) not essentially equivalent to a dividend (meaningful reduction). Otherwise, it is a §301 distribution.',
    reference: 'IRC §302'
  },
  {
    id: 'see2-ccorp-013',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Estimated Tax',
    subtopic: 'Requirements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A C corporation must make estimated tax payments if its expected tax liability is:',
    options: [
      '$1,000 or more',
      '$500 or more',
      '$5,000 or more',
      '$10,000 or more'
    ],
    correctAnswer: 1,
    explanation: 'C corporations must make estimated tax payments if the expected tax for the year is $500 or more. Payments are due the 15th of the 4th, 6th, 9th, and 12th months. Each payment is generally 25% of required annual payment.',
    reference: 'IRC §6655'
  },
  {
    id: 'see2-ccorp-014',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Returns',
    subtopic: 'Filing Requirements',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'C corporation tax returns (Form 1120) are due:',
    options: [
      'March 15',
      'April 15 (15th day of the 4th month after year-end)',
      'September 15',
      'The last day of the 3rd month after year-end'
    ],
    correctAnswer: 1,
    explanation: 'Form 1120 for C corporations is due the 15th day of the 4th month after the close of the tax year (April 15 for calendar year). A 6-month extension is available via Form 7004.',
    reference: 'IRC §6072'
  },
  {
    id: 'see2-ccorp-015',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-6',
    topic: 'Corporate Capital Losses',
    subtopic: 'Limitation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'C corporation capital losses:',
    options: [
      'May offset up to $3,000 of ordinary income',
      'May only offset capital gains',
      'May offset any type of income',
      'Are not deductible'
    ],
    correctAnswer: 1,
    explanation: 'Unlike individuals, C corporations may ONLY deduct capital losses against capital gains. There is no $3,000 deduction against ordinary income. Excess capital losses carry back 3 years and forward 5 years (all as short-term).',
    reference: 'IRC §1211(a), §1212(a)'
  },
];
