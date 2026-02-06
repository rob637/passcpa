import { Question } from '../../../types';

export const CFP_GEN_QUESTIONS: Question[] = [
  {
    id: 'CFP-GEN-001',
    section: 'CFP-GEN', // General Principles
    text: "While establishing and defining the client-planner relationship, a CFP® professional must provide certain information to the client. Which of the following is NOT required to be provided in writing specifically at this stage for financial planning engagements?",
    options: [
      "A) Privacy Policy",
      "B) Terms of the engagement (scope and limitations)",
      "C) Specific investment recommendations",
      "D) Compensation methodology (fee-only, commission, etc.)"
    ],
    correctAnswer: "C) Specific investment recommendations",
    explanation: "**Correct Answer: C.** Specific investment recommendations are developed *after* data gathering and analysis. At the initial stage of establishing the relationship (Step 1 of the Financial Planning Process), the professional must disclose the scope of services, conflicts of interest, compensation methods, and privacy policies. Recommendations come in Step 4.\n\n**Incorrect Options:**\n* **A, B, D:** These are foundational disclosures required by the Code of Ethics and Standards of Conduct when entering into a financial planning engagement.",
    topic: "Structure of Financial Planning",
    difficulty: "medium"
  },
  {
    id: 'CFP-GEN-002',
    section: 'CFP-GEN',
    text: "A client, Sarah (35), wants to save for a down payment on a home in 3 years. She has $40,000 currently invested in a high-growth tech stock ETF. She can save an additional $500/month. What is the most appropriate recommendation regarding her $40,000 existing nest egg given her goal?",
    options: [
      "A) Leave it in the tech ETF to maximize growth potential over the 3-year horizon.",
      "B) Move the funds to a Diversified Emerging Markets fund to capture higher alpha.",
      "C) Reallocate to a conservative mix of short-term bonds and high-yield cash equivalents.",
      "D) Buy 3-year LEAP call options on the S&P 500 to leverage the capital."
    ],
    correctAnswer: "C) Reallocate to a conservative mix of short-term bonds and high-yield cash equivalents.",
    explanation: "**Correct Answer: C.** For a short-term goal (3 years), capital preservation and liquidity are paramount. The high volatility of a tech ETF is unsuitable because a market downturn could occur just when funds are needed, with insufficient time to recover. \n\n**Incorrect Options:**\n* **A & B:** Equity assessments are too volatile for a 3-year defined liability.\n* **D:** Options are speculative and inappropriate for a primary down payment savings goal.",
    topic: "Personal Financial Planning",
    difficulty: "medium"
  },
  {
    id: 'CFP-GEN-003',
    section: 'CFP-GEN',
    text: "Calculate the inflation-adjusted return if an investment earns a nominal return of 8.5% while inflation is 3.2%. (Round to two decimal places)",
    options: [
      "A) 5.30%",
      "B) 5.14%",
      "C) 5.10%",
      "D) 12.00%"
    ],
    correctAnswer: "B) 5.14%",
    explanation: "**Correct Answer: B (5.14%).** The formula for the real rate of return is `((1 + Nominal) / (1 + Inflation)) - 1`.\n\nCalculation:\n((1.085) / (1.032)) - 1 = 1.051356... - 1 = 0.051356 = 5.14%.\n\n**Common Mistake:** Simply subtracting (8.5% - 3.2% = 5.3%) is an approximation but is mathematically incorrect for precise financial planning.",
    topic: "Financial Mathematics",
    difficulty: "hard"
  },
  {
    id: 'CFP-GEN-004',
    section: 'CFP-GEN',
    text: "Under the CFP Board's Code of Ethics, which of the following best describes the 'Fiduciary Duty' owed to a client?",
    options: [
      "A) Duty of Loyalty, Duty of Care, and Duty to Follow Client Instructions",
      "B) Duty to maximize returns, Duty of Confidentiality, and Duty of Disclosure",
      "C) Duty to Outperform the Market",
      "D) Duty to minimize taxes"
    ],
    correctAnswer: "A) Duty of Loyalty, Duty of Care, and Duty to Follow Client Instructions",
    explanation: "**Correct Answer: A.** The Standard of Conduct clearly defines the Fiduciary Duty as comprising the Duty of Loyalty (placing client interests first), the Duty of Care (prudence/competence), and the Duty to Follow Client Instructions (reasonable/lawful).\n\n**Incorrect Options:**\n* **B:** While important, these don't form the core definition.\n* **C:** Performance is never guaranteed.",
    topic: "Professional Standards",
    difficulty: "hard"
  },
  {
    id: 'CFP-GEN-005',
    section: 'CFP-GEN',
    text: "Which of the following is an example of 'Qualitative Data' gathered during the financial planning process?",
    options: [
      "A) Current Tax Bracket: 32%",
      "B) Portfolio value: $1.2 Million",
      "C) Client's fear of running out of money in retirement",
      "D) Mortgage Interest Rate: 3.5%"
    ],
    correctAnswer: "C) Client's fear of running out of money in retirement",
    explanation: "**Correct Answer: C.** Qualitative data refers to subjective information: attitudes, beliefs, values, and goals. Fear is an emotional/subjective state that significantly impacts decision-making.\n\n**Incorrect Options:**\n* **A, B, D:** These are Quantitative (objective, numerical) data points.",
    topic: "Data Gathering",
    difficulty: "easy"
  }
];
