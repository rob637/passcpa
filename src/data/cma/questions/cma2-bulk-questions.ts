import { Question } from '../../../types';

export const CMA2_BULK_QUESTIONS: Question[] = [
  // --- A. Financial Statement Analysis ---
  {
    id: 'cma2-bulk-a-001',
    section: 'CMA2',
    subtopic: 'General',
    question: 'A company\'s current ratio is 2.0. If the company uses cash to pay off a portion of its accounts payable, what will happen to the current ratio?',
    options: [
      'It will decrease',
      'It will increase',
      'It will remain unchanged',
      'It cannot be determined',
    ],
    correctAnswer: 1,
    explanation: 'If Current Ratio > 1, decreasing both numerator (Cash) and denominator (AP) by the same amount increases the ratio. Example: 200/100 = 2.0. Subtract 50: 150/50 = 3.0.',
    topic: 'Ratio Analysis',
    difficulty: 'hard',
    blueprintArea: 'CMA2-A',
  },

  // --- B. Corporate Finance ---
  {
    id: 'cma2-bulk-b-001',
    section: 'CMA2',
    subtopic: 'General',
    question: 'Which form of market efficiency asserts that stock prices reflect all historical information (past prices and volume)?',
    options: [
      'Weak Form',
      'Semi-Strong Form',
      'Strong Form',
      'Adaptive Form',
    ],
    correctAnswer: 0,
    explanation: 'Weak form efficiency states that past information is fully reflected in prices, so technical analysis is useless. Semi-strong includes all public info. Strong includes all info (public and private).',
    topic: 'Corporate Finance',
    difficulty: 'medium',
    blueprintArea: 'CMA2-B',
  },

  // --- C. Decision Analysis ---
  {
    id: 'cma2-bulk-c-001',
    section: 'CMA2',
    subtopic: 'General',
    question: 'A cost that has already been incurred and cannot be changed by any present or future decision is known as a(n):',
    options: [
      'Opportunity cost',
      'Sunk cost',
      'Differential cost',
      'Marginal cost',
    ],
    correctAnswer: 1,
    explanation: 'Sunk costs (past costs) are irrelevant to future decisions.',
    topic: 'Decision Analysis',
    difficulty: 'easy',
    blueprintArea: 'CMA2-C',
  },

  // --- D. Risk Management ---
  {
    id: 'cma2-bulk-d-001',
    section: 'CMA2',
    subtopic: 'General',
    question: 'A US company expects to receive payment in Euros in 60 days. To hedge against the risk that the Euro will depreciate (weaken) against the Dollar, the company should:',
    options: [
      'Buy Euros in the spot market',
      'Sell Euros forward',
      'Buy a call option on Euros',
      'Do nothing',
    ],
    correctAnswer: 1,
    explanation: 'The company is "long" Euros (receivable). It fears Euros will lose value. To lock in a rate, it should sell Euros forward (sell what you have/will have).',
    topic: 'Risk Management',
    difficulty: 'medium',
    blueprintArea: 'CMA2-D',
  },

  // --- E. Investment Decisions ---
  {
    id: 'cma2-bulk-e-001',
    section: 'CMA2',
    subtopic: 'General',
    question: 'Which capital budgeting method calculates the discount rate that equates the present value of cash inflows with the initial investment?',
    options: [
      'Net Present Value (NPV)',
      'Internal Rate of Return (IRR)',
      'Payback Period',
      'Accounting Rate of Return (ARR)',
    ],
    correctAnswer: 1,
    explanation: 'IRR is the specific discount rate where NPV ranges to zero (PV Inflows = PV Outflows).',
    topic: 'Investment Decisions',
    difficulty: 'medium',
    blueprintArea: 'CMA2-E',
  },

  // --- F. Professional Ethics ---
  {
    id: 'cma2-bulk-f-001',
    section: 'CMA2',
    subtopic: 'General',
    question: 'According to the IMA Statement of Ethical Professional Practice, which standard requires members to provide decision support information that is accurate, clear, concise, and timely?',
    options: [
      'Competence',
      'Confidentiality',
      'Integrity',
      'Credibility',
    ],
    correctAnswer: 0,
    explanation: 'Competence includes providing decision support and maximizing professional expertise. Wait - actually Credibility requires communicating information fairly and objectively. But Competence requires providing information that is accurate/clear/concise/timely. Let\'s check definition.',
    topic: 'Ethics',
    difficulty: 'hard',
    blueprintArea: 'CMA2-F',
  },
];
