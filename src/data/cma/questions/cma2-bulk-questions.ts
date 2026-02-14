import { Question } from '../../../types';

export const CMA2_BULK_QUESTIONS: Question[] = [
  // --- A. Financial Statement Analysis ---

  // --- B. Corporate Finance ---
  {
    id: 'cma2-bulk-b-001',
    courseId: 'cma',
    section: 'CMA2',
    subtopic: 'General',
    question: 'Which form of market efficiency asserts that stock prices reflect all historical information (past prices and volume)?',
    options: [
      'Adaptive Form',
      'Semi-Strong Form',
      'Weak Form',
      'Strong Form',
    ],
    correctAnswer: 2,
    explanation: 'Weak form efficiency states that past information is fully reflected in prices, so technical analysis is useless. Semi-strong includes all public info. Strong includes all info (public and private).',
    topic: 'Corporate Finance',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    blueprintArea: 'CMA2-B',
    reference: 'Efficient Market Hypothesis; Corporate Finance',
  },

  // --- C. Decision Analysis ---
  {
    id: 'cma2-bulk-c-001',
    courseId: 'cma',
    section: 'CMA2',
    subtopic: 'General',
    question: 'A cost that has already been incurred and cannot be changed by any present or future decision is known as a(n):',
    options: [
      'Marginal cost',
      'Differential cost',
      'Opportunity cost',
      'Sunk cost',
    ],
    correctAnswer: 3,
    explanation: 'Sunk costs (past costs) are irrelevant to future decisions.',
    topic: 'Decision Analysis',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    blueprintArea: 'CMA2-C',
    reference: 'Relevant Costs; Decision Analysis',
  },

  // --- D. Risk Management ---
  {
    id: 'cma2-bulk-d-001',
    courseId: 'cma',
    section: 'CMA2',
    subtopic: 'General',
    question: 'A US company expects to receive payment in Euros in 60 days. To hedge against the risk that the Euro will depreciate (weaken) against the Dollar, the company should:',
    options: [
      'Do nothing',
      'Buy a call option on Euros',
      'Sell Euros forward',
      'Buy Euros in the spot market',
    ],
    correctAnswer: 2,
    explanation: 'The company is "long" Euros (receivable). It fears Euros will lose value. To lock in a rate, it should sell Euros forward (sell what you have/will have).',
    topic: 'Risk Management',
    difficulty: 'medium',
    skillLevel: 'Application',
    blueprintArea: 'CMA2-D',
    reference: 'Foreign Currency Hedging; Risk Management',
  },

  // --- E. Investment Decisions ---
  {
    id: 'cma2-bulk-e-001',
    courseId: 'cma',
    section: 'CMA2',
    subtopic: 'General',
    question: 'Which capital budgeting method calculates the discount rate that equates the present value of cash inflows with the initial investment?',
    options: [
      'Payback Period',
      'Net Present Value (NPV)',
      'Internal Rate of Return (IRR)',
      'Accounting Rate of Return (ARR)',
    ],
    correctAnswer: 2,
    explanation: 'IRR is the specific discount rate where NPV ranges to zero (PV Inflows = PV Outflows).',
    topic: 'Investment Decisions',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    blueprintArea: 'CMA2-E',
    reference: 'Capital Budgeting Methods; Investment Decisions',
  },

  // --- F. Professional Ethics ---
  {
    id: 'cma2-bulk-f-001',
    courseId: 'cma',
    section: 'CMA2',
    subtopic: 'General',
    question: 'According to the IMA Statement of Ethical Professional Practice, which standard requires members to provide decision support information that is accurate, clear, concise, and timely?',
    options: [
      'Credibility',
      'Competence',
      'Confidentiality',
      'Integrity',
    ],
    correctAnswer: 1,
    explanation: 'Under the IMA Statement of Ethical Professional Practice, the Competence standard requires members to provide decision support information and recommendations that are accurate, clear, concise, and timely. It also requires maintaining professional competence through ongoing development. The Credibility standard, by contrast, focuses on communicating information fairly and objectively and disclosing all relevant information.',
    topic: 'Ethics',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    blueprintArea: 'CMA2-F',
    reference: 'IMA Statement of Ethical Professional Practice; Professional Ethics',
  }
];
