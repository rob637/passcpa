import { Question } from '../../../types';

export const CFP_INV_QUESTIONS: Question[] = [
  {
    id: 'CFP-INV-001',
    section: 'CFP-INV',
    text: "An investor holds a portfolio with a Beta of 1.2. The market return is expected to be 10%, and the risk-free rate is 2%. According to CAPM, what is the required rate of return for this portfolio?",
    options: [
      "A) 11.6%",
      "B) 10.0%",
      "C) 12.0%",
      "D) 14.0%"
    ],
    correctAnswer: "A) 11.6%",
    explanation: "**Correct Answer: A.** CAPM Formula: `Ri = Rf + Beta * (Rm - Rf)`\n\nCalculation:\nRf = 2%\nRm = 10%\nRisk Premium = (10% - 2%) = 8%\nBeta = 1.2\n\nRi = 2% + 1.2 * (8%) = 2% + 9.6% = 11.6%.",
    topic: "Investment Analysis",
    difficulty: "medium"
  },
  {
    id: 'CFP-INV-002',
    section: 'CFP-INV',
    text: "Which of the following risks cannot be diversified away?",
    options: [
      "A) Business Risk",
      "B) Financial Risk",
      "C) Systematic Risk",
      "D) Liquidity Risk"
    ],
    correctAnswer: "C) Systematic Risk",
    explanation: "**Correct Answer: C.** Systematic risk (Market Risk) is inherent to the entire market or economy (e.g., inflation, interest rate changes, war). It cannot be eliminated through diversification.\n\n**Incorrect Options:**\n* **A, B, D:** These are examples of Unsystematic Risk (idiosyncratic), which applies to specific companies or sectors and CAN be mitigated by holding a diverse portfolio.",
    topic: "Risk Management",
    difficulty: "easy"
  },
  {
    id: 'CFP-INV-003',
    section: 'CFP-INV',
    text: "A bond has a duration of 7 years. If interest rates rise by 1%, what is the expected approximate change in the bond's price?",
    options: [
      "A) Increase by 1%",
      "B) Decrease by 1%",
      "C) Increase by 7%",
      "D) Decrease by 7%"
    ],
    correctAnswer: "D) Decrease by 7%",
    explanation: "**Correct Answer: D.** Duration measures a bond's sensitivity to interest rate changes. The relationship is inverse: if rates rise, prices fall. \n\nFormula: `% Price Change ≈ -Duration * ΔYield`.\nChange ≈ -7 * (+1%) = -7%.",
    topic: "Bond Analysis",
    difficulty: "medium"
  },
  {
      id: 'CFP-INV-004',
      section: 'CFP-INV',
      text: "Which of the following best describes the correlation coefficient of +1.0?",
      options: [
        "A) Assets move in exactly opposite directions.",
        "B) Assets have no relationship.",
        "C) Assets move in perfect lockstep (same direction, same magnitude relative to volatility).",
        "D) Assets provide maximum diversification benefit."
      ],
      correctAnswer: "C) Assets move in perfect lockstep (same direction, same magnitude relative to volatility).",
      explanation: "**Correct Answer: C.** A correlation of +1.0 indicates a perfect positive linear relationship. \n\n**Significance:** Adding an asset with +1.0 correlation to a portfolio provides NO diversification benefit (other than weighted average return changes). Diversification benefits arise from correlations less than +1.0 (optimally -1.0).",
      topic: "Portfolio Theory",
      difficulty: "easy"
  }
];
