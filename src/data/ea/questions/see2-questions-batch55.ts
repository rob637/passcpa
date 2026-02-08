/**
 * EA SEE Part 2: Businesses - Questions Batch 55 (S Corporations Deep Dive)
 * Focus: SEE2-7 S Corporations (filling critical coverage gap)
 * 
 * Tax Year: 2024-2025
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH55: Question[] = [
  // S Corporation Eligibility
  {
    id: 'see2-scorp-001',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Eligibility',
    subtopic: 'Shareholder Requirements',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The maximum number of shareholders an S corporation may have is:',
    options: [
      '35 shareholders',
      '75 shareholders',
      '100 shareholders',
      'Unlimited shareholders'
    ],
    correctAnswer: 2,
    explanation: 'An S corporation may have no more than 100 shareholders. Members of a family (as defined) can elect to be treated as one shareholder, which can effectively allow more individuals to hold stock. This limit helps maintain the small business nature of S corps.',
    reference: 'IRC §1361(b)(1)(A)'
  },
  {
    id: 'see2-scorp-002',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Eligibility',
    subtopic: 'Eligible Shareholders',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which of the following may be a shareholder in an S corporation?',
    options: [
      'A partnership',
      'A nonresident alien individual',
      'A qualified subchapter S trust (QSST)',
      'A C corporation'
    ],
    correctAnswer: 2,
    explanation: 'Eligible S corp shareholders include: individuals (U.S. citizens or residents), estates, certain trusts (QSSTs, ESBTs, grantor trusts, testamentary trusts for 2 years), and tax-exempt organizations. Partnerships, C corporations, and nonresident aliens are NOT eligible.',
    reference: 'IRC §1361(b)(1)(B)(C)'
  },
  {
    id: 'see2-scorp-003',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Eligibility',
    subtopic: 'One Class of Stock',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An S corporation violates the one-class-of-stock requirement if it:',
    options: [
      'Has voting and non-voting common stock',
      'Pays different amounts of compensation to shareholder-employees',
      'Issues stock with different dividend rights',
      'Has shareholders with different ownership percentages'
    ],
    correctAnswer: 2,
    explanation: 'The one-class-of-stock requirement means all shares must have identical rights to distributions and liquidation proceeds. Differences in voting rights alone do NOT violate this rule. However, stock with different dividend or liquidation rights creates a second class and terminates the S election.',
    reference: 'IRC §1361(b)(1)(D)'
  },
  {
    id: 'see2-scorp-004',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Election',
    subtopic: 'Form 2553',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'The election to be treated as an S corporation is made on:',
    options: [
      'Form 1120-S',
      'Form 2553',
      'Form 8832',
      'Form SS-4'
    ],
    correctAnswer: 1,
    explanation: 'Form 2553, Election by a Small Business Corporation, is used to elect S corporation status. The form must be signed by all shareholders and filed by the 15th day of the 3rd month of the tax year for which the election is to be effective, or at any time during the preceding tax year.',
    reference: 'Treas. Reg. §1.1362-6'
  },
  {
    id: 'see2-scorp-005',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Election',
    subtopic: 'Effective Date',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A calendar year corporation files Form 2553 on March 1, 2024. The S election is effective:',
    options: [
      'January 1, 2024',
      'March 1, 2024',
      'January 1, 2025',
      'The election is invalid and must be refiled'
    ],
    correctAnswer: 0,
    explanation: 'For a calendar year corporation, Form 2553 must be filed by March 15 (2½ months into the year) for the election to be effective January 1 of that year. Filed on March 1, this election is timely for 2024 and effective January 1, 2024.',
    reference: 'IRC §1362(b)(1)'
  },
  {
    id: 'see2-scorp-006',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Shareholder Basis',
    subtopic: 'Initial Basis',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A shareholder contributes property with a basis of $20,000 and FMV of $50,000 for 100% of S corporation stock. The shareholder\'s stock basis is:',
    options: [
      '$20,000',
      '$35,000',
      '$50,000',
      '$0'
    ],
    correctAnswer: 0,
    explanation: 'When property is contributed to an S corporation in exchange for stock in a §351 transaction, the shareholder\'s basis in the stock equals the adjusted basis of the property contributed ($20,000). No gain is recognized on the transfer if control requirements are met.',
    reference: 'IRC §358'
  },
  {
    id: 'see2-scorp-007',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Shareholder Basis',
    subtopic: 'Basis Adjustments',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Stock basis in an S corporation is increased by all of the following EXCEPT:',
    options: [
      'Distributive share of income',
      'Separately stated tax-exempt income',
      'Distributive share of losses',
      'Additional capital contributions'
    ],
    correctAnswer: 2,
    explanation: 'S corp stock basis increases for: income items (ordinary and separately stated), tax-exempt income, and capital contributions. Basis DECREASES for: distributions, losses and deductions, and nondeductible expenses. Losses reduce basis; they do not increase it.',
    reference: 'IRC §1367'
  },
  {
    id: 'see2-scorp-008',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Shareholder Basis',
    subtopic: 'Ordering Rules',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The correct order for adjusting S corporation stock basis is:',
    options: [
      'Distributions, then income, then losses',
      'Income, then losses, then distributions',
      'Income, then distributions, then losses',
      'Losses, then income, then distributions'
    ],
    correctAnswer: 2,
    explanation: 'Basis adjustments occur in this order: (1) increase for income items, (2) decrease for distributions (but not below zero), (3) decrease for nondeductible/non-capital expenses, (4) decrease for losses and deductions. This order maximizes tax-free distribution treatment.',
    reference: 'IRC §1368(d)'
  },
  {
    id: 'see2-scorp-009',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Distributions',
    subtopic: 'No AAA',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A distribution from an S corporation that has always been an S corporation (no C corp history) is:',
    options: [
      'Always taxable as a dividend',
      'Tax-free to the extent of stock basis, then capital gain',
      'Taxable as ordinary income',
      'Always tax-free regardless of basis'
    ],
    correctAnswer: 1,
    explanation: 'For S corps without accumulated E&P (never a C corp), distributions are: (1) tax-free return of capital to the extent of stock basis, then (2) capital gain. There is no dividend treatment because no E&P exists.',
    reference: 'IRC §1368(b)'
  },
  {
    id: 'see2-scorp-010',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Distributions',
    subtopic: 'With AAA/E&P',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An S corporation with accumulated E&P from C corp years distributes cash. The distribution is first treated as:',
    options: [
      'A dividend from E&P',
      'Tax-free from AAA (Accumulated Adjustments Account)',
      'Capital gain',
      'Return of capital up to stock basis'
    ],
    correctAnswer: 1,
    explanation: 'For S corps with C corp E&P, distributions come from: (1) AAA (tax-free until exhausted), (2) accumulated E&P (dividend), (3) remaining stock basis (tax-free), then (4) capital gain. AAA is depleted first to preserve the pass-through character.',
    reference: 'IRC §1368(c)'
  },
  {
    id: 'see2-scorp-011',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation AAA',
    subtopic: 'AAA Calculation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'AAA (Accumulated Adjustments Account) is adjusted for all of the following EXCEPT:',
    options: [
      'Ordinary business income',
      'Tax-exempt income',
      'Nondeductible expenses related to tax-exempt income',
      'Distributions to shareholders'
    ],
    correctAnswer: 1,
    explanation: 'AAA is NOT increased by tax-exempt income (that goes to OAA - Other Adjustments Account). AAA IS increased by: taxable income items. AAA IS decreased by: distributions, losses/deductions, and nondeductible expenses (other than those related to tax-exempt income).',
    reference: 'IRC §1368(e)(1)'
  },
  {
    id: 'see2-scorp-012',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Losses',
    subtopic: 'Loss Limitation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A shareholder\'s deductible S corporation loss is limited to:',
    options: [
      'Stock basis only',
      'Stock basis plus debt basis',
      'The shareholder\'s at-risk amount',
      'Stock basis plus debt basis, subject to at-risk and passive loss rules'
    ],
    correctAnswer: 3,
    explanation: 'S corp loss deductions face three hurdles: (1) stock and debt basis, (2) at-risk limitations, (3) passive activity rules. Losses exceeding any limitation are suspended and carried forward. All three must be satisfied to deduct losses currently.',
    reference: 'IRC §1366(d)'
  },
  {
    id: 'see2-scorp-013',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Losses',
    subtopic: 'Debt Basis',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A shareholder has debt basis in an S corporation when:',
    options: [
      'The S corporation borrows money from a bank',
      'The shareholder personally guarantees an S corporation loan',
      'The shareholder loans money directly to the S corporation',
      'Another shareholder loans money to the S corporation'
    ],
    correctAnswer: 2,
    explanation: 'S corp shareholders only get debt basis for DIRECT loans from the shareholder to the corporation. Personal guarantees of corporate debt do NOT create debt basis. This differs from partnerships, where guaranteed debt can create basis. Only actual economic outlay by the shareholder creates debt basis.',
    reference: 'IRC §1366(d)(1)(B)'
  },
  {
    id: 'see2-scorp-014',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Losses',
    subtopic: 'Loss Ordering',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When an S corporation shareholder\'s losses exceed stock basis, the losses:',
    options: [
      'Are permanently disallowed',
      'First reduce debt basis, then are suspended',
      'Are deductible against other income',
      'Convert to capital losses'
    ],
    correctAnswer: 1,
    explanation: 'Losses in excess of stock basis reduce any debt basis the shareholder has from direct loans to the corporation. If losses still exceed combined stock and debt basis, the excess is suspended and carried forward indefinitely until sufficient basis is restored.',
    reference: 'IRC §1366(d)(2)'
  },
  {
    id: 'see2-scorp-015',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Reasonable Compensation',
    subtopic: 'Salary Requirements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'An S corporation shareholder-employee who performs services must:',
    options: [
      'Receive all income as distributions',
      'Receive all income as salary',
      'Receive reasonable compensation as salary before distributions',
      'Choose between salary or distributions each year'
    ],
    correctAnswer: 2,
    explanation: 'S corporation shareholder-employees who perform services must receive reasonable compensation as salary before taking distributions. The IRS closely scrutinizes S corps that pay minimal or no salary to avoid employment taxes. Noncompliance can result in reclassification and penalties.',
    reference: 'Rev. Rul. 74-44'
  },
  {
    id: 'see2-scorp-016',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Employment Taxes',
    subtopic: 'Distribution Treatment',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Distributions from an S corporation to shareholder-employees are:',
    options: [
      'Subject to Social Security and Medicare tax',
      'Subject to self-employment tax',
      'Not subject to employment taxes',
      'Subject to FUTA tax only'
    ],
    correctAnswer: 2,
    explanation: 'S corporation distributions to shareholders are NOT subject to employment taxes (Social Security, Medicare, or self-employment tax). This differs from partnerships/sole proprietorships and is a benefit of S corp status. However, salary/wages ARE subject to FICA.',
    reference: 'IRC §1366'
  },
  {
    id: 'see2-scorp-017',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Pass-Through',
    subtopic: 'Separately Stated Items',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Which of the following is a separately stated item on Schedule K-1 (Form 1120-S)?',
    options: [
      'Cost of goods sold',
      'Officer compensation',
      'Net rental real estate income',
      'Depreciation expense'
    ],
    correctAnswer: 2,
    explanation: 'Separately stated items include those that could affect individual shareholder tax liability differently: capital gains/losses, §1231 gains/losses, charitable contributions, rental income, interest income, dividends, §179 deduction, and foreign taxes. Net rental real estate income is separately stated.',
    reference: 'IRC §1366(a)(1)'
  },
  {
    id: 'see2-scorp-018',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Pass-Through',
    subtopic: 'Character Retention',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Capital gains recognized by an S corporation:',
    options: [
      'Are taxed at the corporate level at 21%',
      'Convert to ordinary income when passed to shareholders',
      'Retain their character as capital gains to shareholders',
      'Are not passed through to shareholders'
    ],
    correctAnswer: 2,
    explanation: 'S corporation income items retain their character when passed through to shareholders. Capital gains remain capital gains, interest remains interest, etc. This allows shareholders to benefit from preferential capital gains rates and to properly calculate their own investment income.',
    reference: 'IRC §1366(b)'
  },
  {
    id: 'see2-scorp-019',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Termination',
    subtopic: 'Termination Events',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'An S corporation election terminates automatically if:',
    options: [
      'Net income exceeds $10 million',
      'The corporation has passive investment income exceeding 25% of gross receipts for 3 consecutive years AND has C corp E&P',
      'Any shareholder dies',
      'The corporation operates in more than one state'
    ],
    correctAnswer: 1,
    explanation: 'The S election automatically terminates if: (1) the corporation has passive investment income exceeding 25% of gross receipts for 3 consecutive years AND (2) has accumulated E&P from C corp years. The election also terminates for eligibility violations.',
    reference: 'IRC §1362(d)(3)'
  },
  {
    id: 'see2-scorp-020',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Termination',
    subtopic: 'Revocation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'To revoke an S corporation election, shareholders holding what percentage of stock must consent?',
    options: [
      'A majority (more than 50%)',
      'Two-thirds (66.7%)',
      'Three-fourths (75%)',
      'Unanimous consent (100%)'
    ],
    correctAnswer: 0,
    explanation: 'To voluntarily revoke an S election, shareholders holding more than 50% of the corporation\'s shares (both voting and nonvoting) must consent. This is less stringent than the original election, which requires consent of all shareholders.',
    reference: 'IRC §1362(d)(1)(B)'
  },
  {
    id: 'see2-scorp-021',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Built-In Gains',
    subtopic: 'BIG Tax',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An S corporation that was formerly a C corporation is subject to the built-in gains tax if it:',
    options: [
      'Has any accumulated E&P',
      'Recognizes gain on assets held when it converted to S status within 5 years',
      'Pays any distributions to shareholders',
      'Has passive investment income'
    ],
    correctAnswer: 1,
    explanation: 'The Built-In Gains (BIG) tax is imposed at the highest corporate rate (21%) on net recognized built-in gain during the 5-year recognition period after converting from C to S status. The tax applies to appreciation on assets held at conversion that is recognized within 5 years.',
    reference: 'IRC §1374'
  },
  {
    id: 'see2-scorp-022',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Fringe Benefits',
    subtopic: '2% Shareholders',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Health insurance premiums paid by an S corporation for a 2% shareholder-employee are:',
    options: [
      'A tax-free fringe benefit',
      'Included in the shareholder\'s W-2 but deductible as self-employed health insurance',
      'Not deductible by the corporation',
      'Subject to FICA taxes'
    ],
    correctAnswer: 1,
    explanation: 'For 2%+ S corp shareholders, health insurance premiums paid by the corporation must be included in the shareholder\'s W-2 wages (but are exempt from FICA). The shareholder can then claim the self-employed health insurance deduction on Form 1040. Net effect is similar to a sole proprietor.',
    reference: 'Notice 2008-1'
  },
  {
    id: 'see2-scorp-023',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Year End',
    subtopic: 'Required Year',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'An S corporation must generally use:',
    options: [
      'Any fiscal year it chooses',
      'A calendar year',
      'The same year as its majority shareholder',
      'A 52-53 week year'
    ],
    correctAnswer: 1,
    explanation: 'S corporations are required to use a "permitted year" - generally a calendar year or the natural business year if it qualifies. Like partnerships, this prevents deferral of shareholder income. A fiscal year may be elected under §444, but a deposit is required.',
    reference: 'IRC §1378'
  },
  {
    id: 'see2-scorp-024',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Filing',
    subtopic: 'Form 1120-S Due Date',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Form 1120-S for a calendar year S corporation is due:',
    options: [
      'March 15',
      'April 15',
      'The 15th day of the 3rd month after year end',
      'The 15th day of the 4th month after year end'
    ],
    correctAnswer: 2,
    explanation: 'Form 1120-S is due by the 15th day of the 3rd month after the close of the tax year. For calendar year S corps, this is March 15. An automatic 6-month extension is available using Form 7004. This is earlier than Form 1040 to allow shareholders to receive their K-1s.',
    reference: 'IRC §6072(b)'
  },
  {
    id: 'see2-scorp-025',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Section 199A',
    subtopic: 'QBI Deduction',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'For the Section 199A qualified business income deduction, S corporation shareholders:',
    options: [
      'May not claim the deduction',
      'Calculate QBI at the corporate level',
      'Calculate QBI based on their distributive share of qualified items',
      'Must elect to claim the deduction on Form 1120-S'
    ],
    correctAnswer: 2,
    explanation: 'S corporation shareholders calculate QBI based on their pro-rata share of qualified items from the S corp. The deduction is claimed on the shareholder\'s personal return. W-2 wages and UBIA of qualified property also flow through for limitation calculations.',
    reference: 'IRC §199A'
  },
  {
    id: 'see2-scorp-026',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Basis',
    subtopic: 'Stock vs Debt Basis',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A shareholder has $10,000 stock basis and $5,000 debt basis. The S corp passes through a $12,000 loss. The shareholder can deduct:',
    options: [
      '$10,000 (stock basis only)',
      '$12,000 (full loss)',
      '$15,000 (stock plus debt basis)',
      '$10,000 now, $2,000 reduces debt basis and is deductible'
    ],
    correctAnswer: 1,
    explanation: 'The shareholder can deduct the full $12,000 loss because combined basis is $15,000 ($10,000 stock + $5,000 debt). First, stock basis is reduced to zero ($10,000 absorbed). Then, debt basis is reduced by $2,000 (from $5,000 to $3,000). No loss is suspended.',
    reference: 'IRC §1366(d)'
  },
  {
    id: 'see2-scorp-027',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Restoration',
    subtopic: 'Debt Basis Restoration',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When an S corporation generates income after debt basis has been reduced by prior losses:',
    options: [
      'Income first restores stock basis, then debt basis',
      'Income first restores debt basis, then stock basis',
      'Income has no effect on previously reduced debt basis',
      'The shareholder must contribute new capital'
    ],
    correctAnswer: 0,
    explanation: 'Net income items first restore stock basis (from zero up). Only after stock basis is restored to the amount before any debt-basis-reducing losses does income restore debt basis. This ordering ensures proper treatment of subsequent distributions.',
    reference: 'Treas. Reg. §1.1367-2'
  },
  {
    id: 'see2-scorp-028',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Sale of Stock',
    subtopic: 'Gain Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A shareholder sells S corporation stock for $75,000. The shareholder\'s adjusted basis is $50,000. The gain recognized is:',
    options: [
      '$0 - S corp sales are tax-free',
      '$25,000 capital gain',
      '$75,000 ordinary income',
      '$25,000 ordinary income'
    ],
    correctAnswer: 1,
    explanation: 'The sale of S corporation stock results in capital gain or loss (amount realized minus adjusted basis). Here: $75,000 - $50,000 = $25,000 gain. The character is capital (long or short-term depending on holding period), not ordinary income.',
    reference: 'IRC §1001'
  },
  {
    id: 'see2-scorp-029',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Charitable Contributions',
    subtopic: 'Pass-Through',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Charitable contributions made by an S corporation:',
    options: [
      'Are deducted at the corporate level',
      'Pass through to shareholders who apply their own AGI limitations',
      'Are not deductible',
      'Are limited to 10% of corporate income'
    ],
    correctAnswer: 1,
    explanation: 'S corporation charitable contributions are separately stated items that pass through to shareholders on Schedule K-1. Each shareholder deducts their share subject to their own AGI limitations (60%, 30%, or 20% depending on the type of contribution).',
    reference: 'IRC §1366(a)(1)(A)'
  },
  {
    id: 'see2-scorp-030',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation FICA',
    subtopic: 'Wages Subject to FICA',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'S corporation shareholder-employee wages are subject to:',
    options: [
      'Self-employment tax',
      'Only the employer portion of FICA',
      'Both employer and employee FICA (like any employee)',
      'No payroll taxes'
    ],
    correctAnswer: 2,
    explanation: 'S corporation shareholder-employees are treated as employees for payroll tax purposes. They pay the employee share of FICA (Social Security and Medicare), and the corporation pays the employer share. This differs from partners/sole proprietors who pay self-employment tax.',
    reference: 'Rev. Rul. 59-221'
  },
  
  // Additional S Corp questions for comprehensive coverage
  {
    id: 'see2-scorp-031',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Formation',
    subtopic: 'State Requirements',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Before electing S corporation status, a business must:',
    options: [
      'Have been in business for at least 1 year',
      'First be incorporated under state law',
      'Have at least 2 shareholders',
      'Have assets of at least $100,000'
    ],
    correctAnswer: 1,
    explanation: 'An S corporation is first a corporation organized under state law. The S election is a federal tax classification, not a state entity type. The corporation must be validly incorporated before filing Form 2553 to elect S status.',
    reference: 'IRC §1361(a)'
  },
  {
    id: 'see2-scorp-032',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Taxation',
    subtopic: 'No Double Tax',
    difficulty: 'easy',
    skillLevel: 'Remembering',
    question: 'Unlike a C corporation, an S corporation generally:',
    options: [
      'Has limited liability',
      'Avoids double taxation of income',
      'Must have shareholders',
      'Files a tax return'
    ],
    correctAnswer: 1,
    explanation: 'The primary tax advantage of S corporations is avoiding double taxation. Income is taxed once at the shareholder level when earned (pass-through), not again when distributed. C corporations pay corporate tax on income, and shareholders pay tax on dividends.',
    reference: 'IRC §1366'
  },
  {
    id: 'see2-scorp-033',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Eligibility',
    subtopic: 'Ineligible Corporations',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'Which type of corporation is INELIGIBLE to be an S corporation?',
    options: [
      'A professional corporation (medical, legal, accounting)',
      'A financial institution using the reserve method',
      'A manufacturing corporation',
      'A corporation with only one shareholder'
    ],
    correctAnswer: 1,
    explanation: 'Certain corporations are ineligible for S status: financial institutions using the reserve method for bad debts, insurance companies, DISCs, and certain former international sales corporations. Most domestic corporations, including professional corporations, can elect S status.',
    reference: 'IRC §1361(b)(2)'
  },
  {
    id: 'see2-scorp-034',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Trusts',
    subtopic: 'ESBT',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'An Electing Small Business Trust (ESBT) as an S corporation shareholder:',
    options: [
      'Pays no tax on S corporation income',
      'Pays tax on S corp income at the highest individual rate',
      'Passes income through to beneficiaries',
      'Is limited to holding 5% of S corp stock'
    ],
    correctAnswer: 1,
    explanation: 'ESBTs that hold S corp stock pay tax on the S corporation portion at the highest individual marginal rate (37%). This differs from typical trust taxation where income can be distributed and taxed to beneficiaries. The ESBT election allows trusts to be S corp shareholders.',
    reference: 'IRC §641(c)'
  },
  {
    id: 'see2-scorp-035',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Losses',
    subtopic: 'Suspended Loss Carryover',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Suspended S corporation losses due to insufficient basis:',
    options: [
      'Expire after 5 years',
      'Are permanently lost',
      'Carry forward indefinitely until basis is restored',
      'Convert to passive losses'
    ],
    correctAnswer: 2,
    explanation: 'S corp losses suspended due to insufficient stock and debt basis carry forward indefinitely. When additional basis is created (capital contributions, loans, or future income), the suspended losses become deductible. The character of the losses is retained.',
    reference: 'IRC §1366(d)(2)'
  },
  {
    id: 'see2-scorp-036',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation LIH Tax',
    subtopic: 'Excess Net Passive Income',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'The LIFO recapture tax (§1363(d)) applies when:',
    options: [
      'An S corporation uses LIFO inventory',
      'A C corporation using LIFO converts to S status',
      'An S corporation increases LIFO reserves',
      'A partnership converts to S corporation'
    ],
    correctAnswer: 1,
    explanation: 'When a C corporation using LIFO inventory elects S status, it must include the LIFO recapture amount in income in its final C corporation year. This prevents taxpayers from converting to S status and distributing the untaxed LIFO reserves tax-free.',
    reference: 'IRC §1363(d)'
  },
  {
    id: 'see2-scorp-037',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Schedule K-1',
    subtopic: 'Reporting',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Schedule K-1 (Form 1120-S) must be furnished to shareholders by:',
    options: [
      'January 31',
      'The due date of Form 1120-S (including extensions)',
      'April 15',
      '60 days after year end'
    ],
    correctAnswer: 1,
    explanation: 'Schedule K-1 must be furnished to shareholders by the due date of Form 1120-S, including extensions. For calendar year S corps, this is March 15 (or September 15 if extended). Failure to provide timely K-1s can result in penalties.',
    reference: 'IRC §6037(b)'
  },
  {
    id: 'see2-scorp-038',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Penalties',
    subtopic: 'Late Filing',
    difficulty: 'medium',
    skillLevel: 'Remembering',
    question: 'The penalty for late filing of Form 1120-S is:',
    options: [
      '$100 per month',
      '$220 per shareholder per month (for 2024)',
      '5% of tax due per month',
      'No penalty for S corporations'
    ],
    correctAnswer: 1,
    explanation: 'The late filing penalty for Form 1120-S is $220 per shareholder per month (for 2024, adjusted annually) for up to 12 months. This can be substantial for S corps with multiple shareholders. The penalty applies even if the S corp has no tax liability.',
    reference: 'IRC §6699'
  },
  {
    id: 'see2-scorp-039',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Estimated Tax',
    subtopic: 'Shareholder Payments',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Estimated tax payments for S corporation income are made by:',
    options: [
      'The S corporation quarterly',
      'The shareholders individually',
      'Both the corporation and shareholders',
      'No estimated payments are required'
    ],
    correctAnswer: 1,
    explanation: 'Since S corporations are pass-through entities, the shareholders (not the corporation) must make estimated tax payments for their share of S corp income. The S corp itself only makes estimated payments for certain corporate-level taxes (BIG tax, excess net passive income tax).',
    reference: 'IRC §6654'
  },
  {
    id: 'see2-scorp-040',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-7',
    topic: 'S Corporation Pro Rata Share',
    subtopic: 'Daily Allocation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'When a shareholder sells S corp stock midyear, income is allocated:',
    options: [
      'Entirely to the selling shareholder',
      'Entirely to the buyer',
      'Based on the percentage of the year each owned stock (per-share, per-day)',
      '50/50 between buyer and seller'
    ],
    correctAnswer: 2,
    explanation: 'S corporation income is allocated to shareholders on a per-share, per-day basis. If stock is sold midyear, the seller picks up their pro-rata share through the sale date, and the buyer picks up their share from the sale date forward. An interim closing election may be available.',
    reference: 'IRC §1377(a)'
  },
];
