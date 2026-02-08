/**
 * EA SEE Part 2: Businesses - Questions Batch 23 (Q221-230)
 * Inventory and Cost of Goods Sold
 */

import { Question } from '../../../types';

export const SEE2_QUESTIONS_BATCH23: Question[] = [
  // ==========================================
  // SEE2-2: Inventory
  // ==========================================
  {
    id: 'see2-221',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory',
    subtopic: 'Inventory Required',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under TCJA, a business with average annual gross receipts of $28 million (under the threshold) in the prior 3 years:',
    options: [
      'Must maintain inventories under the accrual method',
      'May treat inventory as non-incidental materials and supplies',
      'Must use LIFO',
      'Cannot deduct cost of goods sold'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §471(c), small businesses meeting the gross receipts test may account for inventories using the method used in their financial statements, treat inventory as non-incidental supplies, or use any other IRS-approved method.',
    reference: 'IRC §471(c)',
  },
  {
    id: 'see2-222',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory',
    subtopic: 'FIFO Method',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Under FIFO (First-In, First-Out), during a period of rising prices:',
    options: [
      'Cost of goods sold is higher, ending inventory is lower',
      'Cost of goods sold is lower, ending inventory is higher',
      'Cost of goods sold equals ending inventory',
      'FIFO is not permitted during inflation'
    ],
    correctAnswer: 1,
    explanation: 'Under FIFO, the oldest (lower-cost) inventory is assumed sold first. During inflation, this results in lower COGS and higher ending inventory valuation, producing higher taxable income.',
    reference: 'Treas. Reg. §1.471-2',
  },
  {
    id: 'see2-223',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory',
    subtopic: 'LIFO Method',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'If a taxpayer uses LIFO for tax purposes:',
    options: [
      'They may use FIFO for financial statements',
      'They must also use LIFO for financial reporting (LIFO conformity)',
      'A Section 481(a) adjustment is never required',
      'They cannot use the simplified LIFO methods'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §472(c) and (e), the LIFO conformity rule requires that if LIFO is used for tax purposes, it must also be used for financial reports to creditors and shareholders.',
    reference: 'IRC §472(c); IRC §472(e)',
  },
  {
    id: 'see2-224',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory',
    subtopic: 'Lower of Cost or Market',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Under the lower of cost or market method for inventory:',
    options: [
      'Market value is always fair market value',
      'Market is generally replacement cost, bounded by ceiling (NRV) and floor (NRV less normal profit)',
      'Inventory can never be written down',
      'This method is only available for LIFO taxpayers'
    ],
    correctAnswer: 1,
    explanation: 'Under Treas. Reg. §1.471-4, market is replacement cost, but cannot exceed NRV (ceiling) or be less than NRV minus normal profit (floor). LCM is not available to LIFO taxpayers.',
    reference: 'Treas. Reg. §1.471-4',
  },
  {
    id: 'see2-225',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory',
    subtopic: 'Uniform Capitalization',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Under IRC §263A (UNICAP), a manufacturer must capitalize:',
    options: [
      'Only direct materials and direct labor',
      'Direct costs plus an allocable portion of indirect costs',
      'All indirect costs regardless of relation to production',
      'Only costs exceeding $500 per unit'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §263A, taxpayers must capitalize direct costs plus a proper share of indirect costs allocable to production (including mixed service costs, storage, purchasing, handling, etc.).',
    reference: 'IRC §263A(a)',
  },
  {
    id: 'see2-226',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory',
    subtopic: 'UNICAP Exceptions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Which businesses are exempt from the uniform capitalization (UNICAP) rules?',
    options: [
      'All manufacturers',
      'Small businesses with gross receipts under $29 million (indexed)',
      'Retailers only',
      'Only cash-method taxpayers'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §263A(i), small businesses meeting the $25 million gross receipts test (indexed for inflation) are exempt from UNICAP. Farmers using cash method and certain creative producers also have exceptions.',
    reference: 'IRC §263A(i)',
  },
  {
    id: 'see2-227',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Cost of Goods Sold',
    subtopic: 'Calculation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A business has beginning inventory of $50,000, purchases of $200,000, and ending inventory of $60,000. Cost of goods sold is:',
    options: [
      '$310,000',
      '$190,000',
      '$260,000',
      '$200,000'
    ],
    correctAnswer: 1,
    explanation: 'COGS = Beginning Inventory + Purchases - Ending Inventory = $50,000 + $200,000 - $60,000 = $190,000.',
    reference: 'Treas. Reg. §1.471-1',
  },
  {
    id: 'see2-228',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Cost of Goods Sold',
    subtopic: 'Freight-In',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Freight costs to bring inventory to the business location are:',
    options: [
      'Deducted as an operating expense',
      'Included in the cost of inventory (COGS)',
      'Capitalized as a fixed asset',
      'Amortized over 15 years'
    ],
    correctAnswer: 1,
    explanation: 'Freight-in costs are part of inventory cost and included in COGS when the inventory is sold. Freight-out (delivery to customers) is a selling expense.',
    reference: 'Treas. Reg. §1.471-3(b)',
  },
  {
    id: 'see2-229',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory',
    subtopic: 'Identification Method',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Specific identification method of inventory is most appropriate for:',
    options: [
      'High-volume, low-cost items',
      'Commodities traded on public markets',
      'Unique, high-value items like automobiles or jewelry',
      'Fungible goods like oil or grain'
    ],
    correctAnswer: 2,
    explanation: 'Specific identification tracks actual cost of each item sold. It\'s appropriate for unique, identifiable, high-value items where each item can be individually tracked.',
    reference: 'Treas. Reg. §1.471-2(d)',
  },
  {
    id: 'see2-230',
    courseId: 'ea',
    section: 'SEE2',
    blueprintArea: 'SEE2-2',
    topic: 'Inventory',
    subtopic: 'Consignment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Goods held on consignment are included in the inventory of:',
    options: [
      'The consignee (party holding the goods)',
      'The consignor (owner of the goods)',
      'Both parties equally',
      'Neither party until sold'
    ],
    correctAnswer: 1,
    explanation: 'Consigned goods remain in the inventory of the consignor (owner) until sold. The consignee holds the goods for sale on behalf of the consignor but does not own them.',
    reference: 'Treas. Reg. §1.471-1',
  },
];
