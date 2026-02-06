/**
 * CMA Part 2, Section D: Risk Management - Questions Batch 2 (Q26-50)
 * Weight: 10% of Part 2 Exam
 * 
 * Blueprint Areas:
 * - CMA2-D: Risk Management
 * 
 * Advanced Topics covered:
 * - Value at Risk (VaR) calculations
 * - Hedging strategies with options
 * - Enterprise risk quantification
 * - Operational risk assessment
 * - Credit risk modeling
 * - Foreign exchange risk management
 * - Interest rate risk and duration
 * - Commodity price hedging
 */

import { Question } from '../../../types';

export const CMA2D_QUESTIONS_BATCH2: Question[] = [
  // ==========================================
  // Value at Risk (VaR) Calculations
  // ==========================================
  {
    id: 'cma2-d-026',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Value at Risk',
    subtopic: 'Parametric VaR',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A portfolio has value of $10 million, expected daily return of 0.05%, and daily standard deviation of 1.5%. Calculate the 1-day VaR at 95% confidence (z = 1.65).',
    options: [
      '$247,500',
      '$150,000',
      '$165,000',
      '$242,500'
    ],
    correctAnswer: 3,
    explanation: 'Parametric VaR = Portfolio Value × (Expected Return - z × Standard Deviation) = $10M × (0.0005 - 1.65 × 0.015) = $10M × (0.0005 - 0.02475) = $10M × (-0.02425) = -$242,500. The negative sign indicates potential loss. VaR = $242,500, meaning there is 5% probability of losing more than $242,500 in one day.',
    reference: 'Value at Risk; Parametric Method',
  },
  {
    id: 'cma2-d-027',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Value at Risk',
    subtopic: 'Time Scaling',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A daily VaR is $500,000 at 99% confidence. Assuming 250 trading days per year, what is the approximate annual VaR?',
    options: [
      '$125 million',
      '$7.9 million',
      '$3.16 million',
      '$500,000'
    ],
    correctAnswer: 1,
    explanation: 'VaR scales with the square root of time: VaR(T) = VaR(1) × √T. Annual VaR = $500,000 × √250 = $500,000 × 15.81 = $7,905,000 ≈ $7.9 million. This assumes returns are independent and identically distributed (i.i.d.), which may not hold during market stress.',
    reference: 'VaR Time Scaling; Square Root of Time Rule',
  },
  {
    id: 'cma2-d-028',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Value at Risk',
    subtopic: 'VaR Limitations',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'Which statement BEST describes a limitation of Value at Risk as a risk measure?',
    options: [
      'VaR cannot be calculated for portfolios with derivatives',
      'VaR does not indicate the magnitude of loss beyond the confidence level',
      'VaR requires perfect information about future returns',
      'VaR is only applicable to equity portfolios'
    ],
    correctAnswer: 1,
    explanation: 'VaR indicates the maximum loss within a confidence level but says nothing about tail risk - losses exceeding VaR. A 95% VaR of $1M means 5% of the time losses exceed $1M, but could be $1.1M or $50M. Expected Shortfall (CVaR) addresses this by measuring average loss in the tail.',
    reference: 'VaR Limitations; Tail Risk',
  },
  {
    id: 'cma2-d-029',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Value at Risk',
    subtopic: 'Monte Carlo Simulation',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A risk analyst runs 10,000 Monte Carlo simulations of portfolio returns. The 500th worst outcome shows a loss of $2.3 million. What is the 95% VaR?',
    options: [
      '$2.3 million',
      'Cannot determine from this information',
      'Average of all 500 worst outcomes',
      '$2.3 million divided by 500'
    ],
    correctAnswer: 0,
    explanation: '95% confidence means we want the 5th percentile of losses. With 10,000 simulations, 5% = 500 observations. The 500th worst outcome (boundary of worst 5%) is the VaR. At 95% VaR, there is 5% probability of losses exceeding $2.3 million. This historical simulation approach uses actual simulated distribution.',
    reference: 'Monte Carlo VaR; Simulation Methods',
  },
  {
    id: 'cma2-d-030',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Value at Risk',
    subtopic: 'Expected Shortfall',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A portfolio has 95% daily VaR of $1 million. The average of all losses exceeding VaR is $2.5 million. What is the Expected Shortfall (CVaR)?',
    options: [
      '$1 million',
      '$2.5 million',
      '$1.75 million',
      '$3.5 million'
    ],
    correctAnswer: 1,
    explanation: 'Expected Shortfall (Conditional VaR) is the expected loss given that loss exceeds VaR - the average of tail losses. If losses exceeding the $1M VaR average $2.5M, then CVaR = $2.5M. CVaR is a coherent risk measure (unlike VaR) and better captures tail risk.',
    reference: 'Expected Shortfall; Conditional VaR',
  },

  // ==========================================
  // Hedging Strategies with Options
  // ==========================================
  {
    id: 'cma2-d-031',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Options Hedging',
    subtopic: 'Protective Put',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An investor owns 1,000 shares at $50. They buy 10 put contracts (100 shares each) with strike $45 for $2 per share. What is the maximum loss and breakeven point?',
    options: [
      'Max loss $7,000; Breakeven $52',
      'Max loss $5,000; Breakeven $50',
      'Max loss unlimited; Breakeven $47',
      'Max loss $2,000; Breakeven $52'
    ],
    correctAnswer: 0,
    explanation: 'Protective put creates a floor at strike price. Cost = Stock ($50,000) + Put premium ($2 × 1,000 = $2,000) = $52,000 total investment. If stock drops below $45, puts are exercised, receiving $45,000. Max loss = $52,000 - $45,000 = $7,000. Breakeven = Stock must rise to cover premium = $50 + $2 = $52.',
    reference: 'Protective Put; Downside Protection',
  },
  {
    id: 'cma2-d-032',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Options Hedging',
    subtopic: 'Collar Strategy',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A CFO wants to hedge stock compensation worth $1M. They implement a zero-cost collar: buy $45 puts and sell $55 calls when stock is at $50. What is the outcome range?',
    options: [
      'No downside protection, unlimited upside',
      'Protected below $45, capped at $55, zero premium cost',
      'Full protection at all price levels',
      'Maximum loss of $100,000'
    ],
    correctAnswer: 1,
    explanation: 'A zero-cost collar uses put premium received from selling calls to fund put purchase. Long put at $45 protects if stock falls below $45. Short call at $55 caps gains above $55 (shares called away). The position is protected between $45 (floor) and $55 (ceiling) at no net premium cost. Gain potential is sacrificed for downside protection.',
    reference: 'Collar Strategy; Hedging Executive Compensation',
  },
  {
    id: 'cma2-d-033',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Options Hedging',
    subtopic: 'Currency Options',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A U.S. company will receive €10 million in 90 days. Spot rate is $1.10/€. They buy put options on euros with strike $1.08/€ for $0.02/€ premium. What is the minimum dollar receipt?',
    options: [
      '$10.8 million',
      '$10.6 million',
      '$11.0 million',
      '$10.0 million'
    ],
    correctAnswer: 1,
    explanation: 'Put option guarantees ability to sell euros at $1.08. If euro falls below $1.08, exercise put. Minimum receipt = €10M × $1.08 = $10.8M, minus premium = €10M × $0.02 = $0.2M. Net minimum = $10.8M - $0.2M = $10.6M. If euro rises above $1.08, let put expire and convert at higher spot rate minus premium paid.',
    reference: 'Currency Options; Transaction Exposure Hedging',
  },
  {
    id: 'cma2-d-034',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Options Hedging',
    subtopic: 'Option Greeks',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A portfolio manager holds options with delta of 0.6. This means:',
    options: [
      'The option is 60% likely to expire in-the-money',
      'The option price moves $0.60 for each $1 move in the underlying',
      'The option has 60 days until expiration',
      'Time decay is 60 cents per day'
    ],
    correctAnswer: 1,
    explanation: 'Delta measures option price sensitivity to underlying price changes. Delta of 0.6 means a $1 increase in stock price increases option value by $0.60. Delta ranges from 0 to 1 for calls (0 to -1 for puts). Delta also approximates probability of expiring in-the-money, but this is not its primary definition.',
    reference: 'Option Greeks; Delta Hedging',
  },
  {
    id: 'cma2-d-035',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Options Hedging',
    subtopic: 'Interest Rate Options',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A company with $100M floating-rate debt buys an interest rate cap at 5% for $500,000 premium. If rates rise to 7%, what is the net interest cost?',
    options: [
      '5% plus amortized premium',
      '7% minus cap payoff',
      '5.5% including premium amortization',
      '7% with no benefit from cap'
    ],
    correctAnswer: 2,
    explanation: 'The cap pays if rates exceed strike. At 7%: Cap payoff = $100M × (7% - 5%) = $2M. Interest paid = $100M × 7% = $7M. Net interest = $7M - $2M = $5M (effective 5%). Adding amortized premium (say $500K over the period), effective rate ≈ 5.5%. The cap limits interest cost to strike plus premium cost.',
    reference: 'Interest Rate Caps; Floating Rate Debt Hedging',
  },

  // ==========================================
  // Enterprise Risk Quantification
  // ==========================================
  {
    id: 'cma2-d-036',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk',
    subtopic: 'Risk Aggregation',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A company identifies three independent risks with potential losses of $5M, $3M, and $2M. Using sum-of-squares aggregation, what is the combined risk estimate?',
    options: [
      '$10 million',
      '$6.16 million',
      '$5 million',
      '$3.33 million'
    ],
    correctAnswer: 1,
    explanation: 'For independent risks, combined risk = √(R₁² + R₂² + R₃²) = √($5M² + $3M² + $2M²) = √(25 + 9 + 4) = √38 = $6.16M. Simple addition ($10M) overstates risk because independent events rarely occur simultaneously. This diversification benefit reduces portfolio risk.',
    reference: 'Risk Aggregation; Portfolio Risk',
  },
  {
    id: 'cma2-d-037',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk',
    subtopic: 'Risk Appetite',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A company sets risk appetite as "maximum 5% annual earnings volatility." Which metric BEST operationalizes this statement?',
    options: [
      'Credit rating maintained at investment grade',
      'Standard deviation of EPS not exceeding 5% of mean EPS',
      'Maximum loss of 5% of revenue in any quarter',
      'Insurance coverage for 5% of assets'
    ],
    correctAnswer: 1,
    explanation: 'Earnings volatility is measured by standard deviation relative to the mean (coefficient of variation). A 5% cap means if average EPS is $2.00, the standard deviation should not exceed $0.10. This quantifies acceptable fluctuation around expected earnings, aligning operations and hedging with risk tolerance.',
    reference: 'Risk Appetite; Earnings Volatility',
  },
  {
    id: 'cma2-d-038',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk',
    subtopic: 'Risk Heat Map',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'On a risk heat map (probability vs. impact), a risk has high probability and high impact. The appropriate response is:',
    options: [
      'Accept the risk as cost of doing business',
      'Implement immediate mitigation or avoidance strategies',
      'Monitor the risk quarterly',
      'Transfer the risk through insurance'
    ],
    correctAnswer: 1,
    explanation: 'High probability/high impact risks fall in the critical zone requiring immediate action. Options include avoidance (eliminate the activity), mitigation (reduce probability or impact), or significant risk transfer. Acceptance is inappropriate for critical risks. Monitoring alone is insufficient for imminent, severe threats.',
    reference: 'Risk Heat Map; Risk Response Strategies',
  },
  {
    id: 'cma2-d-039',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk',
    subtopic: 'Economic Capital',
    difficulty: 'hard',
    skillLevel: 'Evaluation',
    question: 'A financial institution calculates economic capital of $500M at 99.9% confidence. This represents:',
    options: [
      'Required regulatory capital under Basel III',
      'Capital needed to absorb unexpected losses with 0.1% insolvency probability',
      'Expected annual loan losses',
      'Market value of equity'
    ],
    correctAnswer: 1,
    explanation: 'Economic capital is the internally-calculated capital buffer to absorb unexpected losses at a chosen confidence level. At 99.9%, there is 0.1% annual probability that losses exceed $500M, leading to insolvency. Unlike regulatory capital, economic capital reflects the institution\'s specific risk profile and management\'s risk appetite.',
    reference: 'Economic Capital; Solvency Risk',
  },
  {
    id: 'cma2-d-040',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Enterprise Risk',
    subtopic: 'Stress Testing',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A stress test models a severe recession: 5% GDP decline, 10% unemployment, 30% equity market drop. The company\'s stressed net income drops from $100M to -$50M. What does this indicate?',
    options: [
      'The company should immediately reduce operations',
      'Capital reserves must exceed $50M to survive the scenario',
      'Current business model is unsustainable',
      'VaR estimates need recalculation'
    ],
    correctAnswer: 1,
    explanation: 'Stress testing reveals capital needs under adverse scenarios. A $150M swing (from +$100M to -$50M) indicates the company needs at least $50M in reserves to absorb losses during the modeled recession. Management should ensure capital buffers exceed stressed losses, potentially with contingency plans for more severe outcomes.',
    reference: 'Stress Testing; Capital Adequacy',
  },

  // ==========================================
  // Operational Risk Assessment
  // ==========================================
  {
    id: 'cma2-d-041',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Key Risk Indicators',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'Which is the BEST example of a leading Key Risk Indicator (KRI) for operational risk?',
    options: [
      'Number of processing errors last quarter',
      'Amount of operational losses this year',
      'Employee turnover rate in critical functions',
      'Regulatory fines paid'
    ],
    correctAnswer: 2,
    explanation: 'Leading indicators predict future risk before losses occur. Employee turnover in critical functions signals potential knowledge loss, reduced control effectiveness, and future errors. Processing errors, losses, and fines are lagging indicators - they report past events. Effective risk management emphasizes leading indicators for proactive response.',
    reference: 'Key Risk Indicators; Leading vs Lagging',
  },
  {
    id: 'cma2-d-042',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Control Self-Assessment',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'In a Risk and Control Self-Assessment (RCSA), process owners:',
    options: [
      'Transfer risk assessment responsibility to internal audit',
      'Evaluate risks and control effectiveness in their own areas',
      'Calculate VaR for their business units',
      'Approve capital allocation decisions'
    ],
    correctAnswer: 1,
    explanation: 'RCSA engages process owners in identifying risks and evaluating control effectiveness within their areas. This bottom-up approach leverages operational expertise, increases risk awareness, and promotes accountability. Internal audit validates RCSA results but doesn\'t replace management\'s responsibility for risk assessment.',
    reference: 'Risk and Control Self-Assessment; First Line Defense',
  },
  {
    id: 'cma2-d-043',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Loss Distribution',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'Historical operational loss data shows: 90% of events cause <$10K loss, 9% cause $10K-$100K, 1% cause >$100K. Expected losses are $2M annually. This distribution suggests:',
    options: [
      'Focus on frequent small losses for maximum impact',
      'Loss distribution is normally distributed',
      'Fat-tailed distribution requiring focus on low-frequency/high-severity events',
      'Insurance is unnecessary due to predictable losses'
    ],
    correctAnswer: 2,
    explanation: 'The distribution is highly skewed with fat tails - rare events (1%) cause disproportionate losses. Expected loss of $2M with 90% causing <$10K means the 1% of severe events dominate total losses. Risk management must address these tail events through controls, insurance, or capital reserves, not just frequent minor incidents.',
    reference: 'Operational Loss Distribution; Fat Tails',
  },
  {
    id: 'cma2-d-044',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Business Continuity',
    difficulty: 'medium',
    skillLevel: 'Evaluation',
    question: 'A company\'s Recovery Time Objective (RTO) for its core trading system is 4 hours. This means:',
    options: [
      'Data backup occurs every 4 hours',
      'The system must be restored within 4 hours of a disruption',
      'Maximum acceptable data loss is 4 hours',
      'System maintenance windows are 4 hours'
    ],
    correctAnswer: 1,
    explanation: 'RTO defines maximum acceptable downtime before business impact becomes unacceptable. A 4-hour RTO means recovery plans must restore trading within 4 hours. This drives disaster recovery investment (hot sites, redundancy). Recovery Point Objective (RPO) measures acceptable data loss; backup frequency is a control, not an objective.',
    reference: 'Business Continuity; RTO and RPO',
  },
  {
    id: 'cma2-d-045',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Operational Risk',
    subtopic: 'Fraud Risk',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'According to the fraud triangle, which element involves rationalization?',
    options: [
      'Employee has gambling debts requiring cash',
      'Weak controls allow funds diversion',
      'Employee believes "I deserve this after years of underpayment"',
      'Company has high-value assets easily converted to cash'
    ],
    correctAnswer: 2,
    explanation: 'The fraud triangle has three elements: Pressure (need/motivation), Opportunity (weak controls), and Rationalization (self-justification). "I deserve this" is rationalization - the fraudster justifies their actions morally. Gambling debts represent pressure. Weak controls and convertible assets represent opportunity.',
    reference: 'Fraud Triangle; Behavioral Risk Factors',
  },

  // ==========================================
  // Foreign Exchange and Interest Rate Risk
  // ==========================================
  {
    id: 'cma2-d-046',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Foreign Exchange Risk',
    subtopic: 'Transaction Exposure',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A U.S. company will pay ¥500 million in 60 days. Spot rate: ¥110/$. 60-day forward: ¥108/$. To eliminate transaction exposure, the company should:',
    options: [
      'Do nothing - yen is expected to weaken',
      'Buy yen forward at ¥108/$ for $4.63 million',
      'Sell yen forward at ¥108/$',
      'Wait until payment date to convert'
    ],
    correctAnswer: 1,
    explanation: 'The company has a yen payable (liability) creating risk if yen strengthens (fewer yen per dollar). To hedge, buy yen forward. Amount: ¥500M ÷ 108 = $4.63M needed. This locks in the dollar cost regardless of spot rate movement. Selling yen would double the exposure. Waiting is speculation.',
    reference: 'Transaction Exposure; Forward Contracts',
  },
  {
    id: 'cma2-d-047',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Foreign Exchange Risk',
    subtopic: 'Translation Exposure',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'A U.S. parent has a European subsidiary with net assets of €100 million. Under current rate method, if the euro weakens from $1.20 to $1.10, the translation adjustment is:',
    options: [
      '$10 million gain in net income',
      '$10 million loss reported in OCI',
      '$10 million gain in OCI',
      'No accounting impact'
    ],
    correctAnswer: 1,
    explanation: 'Translation exposure affects consolidated equity when foreign subsidiary net assets are converted. Change = €100M × ($1.10 - $1.20) = €100M × (-$0.10) = -$10M. This loss appears in Other Comprehensive Income (Cumulative Translation Adjustment), not net income, under current rate method for functionally foreign subsidiaries.',
    reference: 'Translation Exposure; OCI Adjustment',
  },
  {
    id: 'cma2-d-048',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Interest Rate Risk',
    subtopic: 'Duration',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A bond portfolio has duration of 6 years and value of $50 million. If interest rates increase by 50 basis points, what is the approximate value change?',
    options: [
      '-$1.5 million',
      '-$3.0 million',
      '+$1.5 million',
      '-$150,000'
    ],
    correctAnswer: 0,
    explanation: 'Duration measures bond price sensitivity to interest rate changes. ΔPrice ≈ -Duration × ΔYield × Value = -6 × 0.005 × $50M = -$1.5M. The negative sign indicates rates up → prices down. Duration of 6 means approximately 6% price change per 1% yield change. Modified duration provides more precision.',
    reference: 'Duration; Interest Rate Sensitivity',
  },
  {
    id: 'cma2-d-049',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Interest Rate Risk',
    subtopic: 'Interest Rate Swap',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'A company with $100M floating-rate debt (LIBOR + 2%) enters a pay-fixed/receive-floating swap at 5% fixed. If LIBOR is 4%, what is the net interest payment?',
    options: [
      '$5 million',
      '$6 million',
      '$7 million',
      '$1 million'
    ],
    correctAnswer: 2,
    explanation: 'Debt payment: LIBOR + 2% = 4% + 2% = 6% × $100M = $6M. Swap: Pay 5% fixed ($5M), receive LIBOR ($4M). Net swap payment = $5M - $4M = $1M. Total interest = $6M + $1M = $7M, equivalent to 7% fixed (swap rate 5% + spread 2%). The swap converted floating to fixed exposure.',
    reference: 'Interest Rate Swaps; Fixed-Floating Conversion',
  },
  {
    id: 'cma2-d-050',
    courseId: 'cma',
    section: 'CMA2',
    blueprintArea: 'CMA2-D',
    topic: 'Commodity Risk',
    subtopic: 'Futures Hedging',
    difficulty: 'hard',
    skillLevel: 'Application',
    question: 'An airline needs 10 million gallons of jet fuel in 6 months. Current price is $2.50/gallon. They hedge with futures at $2.60/gallon. If spot price at delivery is $3.00, what is their effective price per gallon?',
    options: [
      '$3.00 - paid spot price',
      '$2.50 - original spot price',
      '$2.60 - locked in futures price',
      '$2.80 - average of futures and spot'
    ],
    correctAnswer: 2,
    explanation: 'Futures hedge locks in the purchase price. At delivery: Buy fuel at spot $3.00, but futures profit = $3.00 - $2.60 = $0.40/gallon. Net cost = $3.00 - $0.40 = $2.60/gallon. Regardless of spot price movement, the effective cost equals the futures contract price of $2.60. Total cost = 10M × $2.60 = $26M.',
    reference: 'Commodity Futures; Hedging Fuel Costs',
  },
];

// Helper functions
export const getCMA2DQuestionsBatch2 = () => CMA2D_QUESTIONS_BATCH2;
export const getCMA2DQuestionsBatch2Count = () => CMA2D_QUESTIONS_BATCH2.length;
export const getCMA2DQuestionsBatch2ByTopic = (topic: string) => 
  CMA2D_QUESTIONS_BATCH2.filter(q => q.topic === topic);
export const getCMA2DQuestionsBatch2ByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') =>
  CMA2D_QUESTIONS_BATCH2.filter(q => q.difficulty === difficulty);

export default CMA2D_QUESTIONS_BATCH2;
