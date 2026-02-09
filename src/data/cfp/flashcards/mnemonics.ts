/**
 * CFP Mnemonic Flashcards
 * Memory aids for all CFP exam domains
 * Financial Planning certification exam
 */

import { Flashcard } from './index';

// CFP-specific mnemonic flashcard type with mnemonic field
interface MnemonicFlashcard extends Omit<Flashcard, 'category'> {
  category: 'mnemonic';
  mnemonic?: string;
}

// ==========================================
// GENERAL PRINCIPLES MNEMONICS
// ==========================================
export const GEN_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'FC-GEN-MN-001',
    domain: 'GEN',
    category: 'mnemonic',
    mnemonic: 'UIADPIM',
    front: 'CFP Financial Planning Process - 7 Steps',
    back: 'Understanding client circumstances\nIdentifying and selecting goals\nAnalyzing current course\nDeveloping recommendations\nPresenting recommendations\nImplementing recommendations\nMonitoring progress\n\n(Remember: U I A D P I M)',
    difficulty: 'medium',
    tags: ['process', 'standards', 'mnemonic']
  },
  {
    id: 'FC-GEN-MN-002',
    domain: 'GEN',
    category: 'mnemonic',
    mnemonic: 'ACT FAIR',
    front: 'CFP Code of Ethics - Eight Standards',
    back: 'Act with integrity\nCompetence required\nTreat information confidentially\n\nFiduciary duty (always material steps)\nAct with diligence\nInform clients of conflicts\nResponsibility to profession\n\nCFP Board can sanction for violations',
    difficulty: 'hard',
    tags: ['ethics', 'standards', 'mnemonic']
  },
  {
    id: 'FC-GEN-MN-003',
    domain: 'GEN',
    category: 'mnemonic',
    mnemonic: '4 Es',
    front: 'CFP Certification Requirements',
    back: 'Education (CFP Board-registered program)\nExamination (6-hour CFP exam)\nExperience (6,000 hours, or 4,000 with supervision)\nEthics (background check, declaration)\n\nAll four required for CFP certification',
    difficulty: 'easy',
    tags: ['certification', 'requirements', 'mnemonic']
  },
];

// ==========================================
// RETIREMENT PLANNING MNEMONICS
// ==========================================
export const RET_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'FC-RET-MN-001',
    domain: 'RET',
    category: 'mnemonic',
    mnemonic: 'SECURE 2.0 AGES',
    front: 'SECURE 2.0 Act Key Age Changes',
    back: 'RMD ages phased increase:\n• Born 1950 or earlier: 72 (old rule)\n• Born 1951-1959: 73 (2023+)\n• Born 1960+: 75 (2033+)\n\nCatch-up contributions:\n• 50+: Standard catch-up\n• 60-63: SUPER catch-up ($10,000 / 150%)\n\nPenalty-free withdrawals:\n• 59½: General rule\n• 55: Rule of 55 (separation from service)',
    difficulty: 'hard',
    tags: ['SECURE 2.0', 'RMD', 'ages', 'mnemonic']
  },
  {
    id: 'FC-RET-MN-002',
    domain: 'RET',
    category: 'mnemonic',
    mnemonic: 'SEPP-72(t)',
    front: 'Substantially Equal Periodic Payments - 72(t)',
    back: 'Three IRS-approved methods:\n\n1. Required Minimum Distribution method\n   (recalculates annually)\n\n2. Amortization method\n   (fixed payments)\n\n3. Annuitization method\n   (mortality table based)\n\nMust continue 5 years OR until 59½ (whichever is LONGER)',
    difficulty: 'hard',
    tags: ['72t', 'SEPP', 'early withdrawal', 'mnemonic']
  },
  {
    id: 'FC-RET-MN-003',
    domain: 'RET',
    category: 'mnemonic',
    mnemonic: 'SIMPLE = 100',
    front: 'SIMPLE IRA Key Requirements',
    back: 'Savings Incentive Match Plan for Employees:\n\n• 100 or fewer employees\n• $5,000 compensation in any 2 prior years\n• $5,000 expected current year\n\nContributions 2024:\n• Employee: $16,000 ($3,500 catch-up)\n• Employer: 2% nonelective OR 3% match\n\nNo other qualified plans allowed',
    difficulty: 'medium',
    tags: ['SIMPLE', 'small business', 'mnemonic']
  },
  {
    id: 'FC-RET-MN-004',
    domain: 'RET',
    category: 'mnemonic',
    mnemonic: 'SEP = 25%',
    front: 'SEP-IRA Contribution Limits',
    back: 'Simplified Employee Pension:\n\n• Employer-only contributions\n• Up to 25% of compensation\n• Maximum $69,000 (2024)\n• Self-employed: net SE × 0.9235 × 20%\n\nEligibility: 21+, 3 of last 5 years, $750 comp\n\nSimplest employer plan to establish',
    difficulty: 'medium',
    tags: ['SEP', 'self-employed', 'mnemonic']
  },
  {
    id: 'FC-RET-MN-005',
    domain: 'RET',
    category: 'mnemonic',
    mnemonic: 'ROTH 5-5',
    front: 'Roth IRA 5-Year Rules',
    back: 'TWO 5-year rules:\n\n1. CONVERSIONS: 5-year wait per conversion\n   (avoids 10% penalty under 59½)\n\n2. EARNINGS: Account open 5 years\n   (for tax-free qualified distribution)\n\nQualified = 5+ years AND:\n• Age 59½, OR\n• Death, disability, OR\n• First home ($10K lifetime)',
    difficulty: 'hard',
    tags: ['Roth', '5-year rule', 'mnemonic']
  },
];

// ==========================================
// TAX PLANNING MNEMONICS
// ==========================================
export const TAX_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'FC-TAX-MN-001',
    domain: 'TAX',
    category: 'mnemonic',
    mnemonic: 'BASIS = PAID',
    front: 'Stock Basis Calculation',
    back: 'Purchase price\nAdd: Commissions paid\nImproved/reinvested dividends\nDRIP adjustments\n\nBasis = What you paid (cost method)\n\nAverage cost allowed for mutual funds\nSpecific ID for tax loss harvesting',
    difficulty: 'medium',
    tags: ['basis', 'capital gains', 'mnemonic']
  },
  {
    id: 'FC-TAX-MN-002',
    domain: 'TAX',
    category: 'mnemonic',
    mnemonic: 'SALT $10K',
    front: 'State and Local Tax Deduction Limit',
    back: 'SALT cap (TCJA 2017):\n• $10,000 limit ($5,000 MFS)\n• State income OR sales tax\n• Property taxes\n• Combined limit\n\nSunsets after 2025 (reverts to unlimited)\n\nWorkaround: PTET (pass-through entity tax)',
    difficulty: 'easy',
    tags: ['SALT', 'deductions', 'mnemonic']
  },
  {
    id: 'FC-TAX-MN-003',
    domain: 'TAX',
    category: 'mnemonic',
    mnemonic: 'NII 3.8%',
    front: 'Net Investment Income Tax',
    back: 'NIIT: 3.8% surtax on lesser of:\n• Net investment income, OR\n• MAGI over threshold\n\nThresholds:\n• $250,000 MFJ\n• $200,000 Single\n• $125,000 MFS\n\nNII = Interest, dividends, capital gains, rents, royalties, passive income (not wages)',
    difficulty: 'medium',
    tags: ['NIIT', 'investment tax', 'mnemonic']
  },
  {
    id: 'FC-TAX-MN-004',
    domain: 'TAX',
    category: 'mnemonic',
    mnemonic: 'AMT ADD-BACKS',
    front: 'Common AMT Preference Items',
    back: 'Add back for AMT:\n• State/local taxes (SALT)\n• Miscellaneous itemized deductions\n• Home equity interest (if not used for home)\n• ISO bargain element (at exercise)\n• Accelerated depreciation\n\nExemptions phase out at high income',
    difficulty: 'hard',
    tags: ['AMT', 'preferences', 'mnemonic']
  },
];

// ==========================================
// INVESTMENT PLANNING MNEMONICS
// ==========================================
export const INV_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'FC-INV-MN-001',
    domain: 'INV',
    category: 'mnemonic',
    mnemonic: 'CAPM: RF + β(RM-RF)',
    front: 'Capital Asset Pricing Model',
    back: 'Expected Return = Risk-free rate + β(Market return - Risk-free rate)\n\nβ = Systematic risk measure\n• β = 1: Same as market\n• β > 1: More volatile\n• β < 1: Less volatile\n\nOnly compensated for systematic risk',
    difficulty: 'medium',
    tags: ['CAPM', 'beta', 'mnemonic']
  },
  {
    id: 'FC-INV-MN-002',
    domain: 'INV',
    category: 'mnemonic',
    mnemonic: 'SML vs CML',
    front: 'Security Market Line vs Capital Market Line',
    back: 'SML (Security Market Line):\n• Y-axis: Expected return\n• X-axis: Beta (systematic risk)\n• Graphs individual securities\n\nCML (Capital Market Line):\n• Y-axis: Expected return\n• X-axis: Standard deviation (total risk)\n• Graphs efficient portfolios only\n\nSML uses CAPM; CML uses Sharpe ratio',
    difficulty: 'hard',
    tags: ['SML', 'CML', 'portfolio theory', 'mnemonic']
  },
  {
    id: 'FC-INV-MN-003',
    domain: 'INV',
    category: 'mnemonic',
    mnemonic: 'TREYNOR = RP/β',
    front: 'Treynor Ratio',
    back: 'Treynor = (Portfolio Return - RF) ÷ Beta\n\nMeasures excess return per unit of SYSTEMATIC risk\n\nCompare to:\n• Sharpe: Uses standard deviation (total risk)\n• Jensen: Uses alpha (abnormal return)\n\nHigher Treynor = better risk-adjusted return',
    difficulty: 'medium',
    tags: ['Treynor', 'performance', 'mnemonic']
  },
  {
    id: 'FC-INV-MN-004',
    domain: 'INV',
    category: 'mnemonic',
    mnemonic: 'DURATION × Δi',
    front: 'Duration and Bond Price Sensitivity',
    back: 'Price Change ≈ -Duration × Δ Interest Rate\n\n• Duration 5 + 1% rate increase = ~5% price drop\n• Longer duration = more price sensitivity\n• Higher coupon = lower duration\n• Longer maturity = higher duration\n\nModified duration adjusts for payment frequency',
    difficulty: 'hard',
    tags: ['duration', 'bonds', 'mnemonic']
  },
];

// ==========================================
// RISK & INSURANCE MNEMONICS
// ==========================================
export const RISK_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'FC-RISK-MN-001',
    domain: 'RISK',
    category: 'mnemonic',
    mnemonic: 'DIME',
    front: 'Life Insurance Needs Analysis',
    back: 'D - Debt (mortgages, loans, credit cards)\nI - Income replacement (future earnings)\nM - Mortgage (separate if large)\nE - Education (children\'s college costs)\n\nAdd: Final expenses, emergency fund\nSubtract: Existing coverage, assets',
    difficulty: 'easy',
    tags: ['life insurance', 'needs analysis', 'mnemonic']
  },
  {
    id: 'FC-RISK-MN-002',
    domain: 'RISK',
    category: 'mnemonic',
    mnemonic: 'OWN OCCUPATION',
    front: 'Disability Insurance - Definition of Disability',
    back: 'Three definitions (strongest to weakest):\n\n1. OWN OCCUPATION (best)\n   - Can\'t perform YOUR specific job\n   - Highest premiums\n\n2. MODIFIED OWN-OCC\n   - Own-occ for 2-5 years, then any-occ\n\n3. ANY OCCUPATION (worst)\n   - Can\'t perform ANY job suited to education/experience\n   - Lowest premiums, hardest to collect',
    difficulty: 'medium',
    tags: ['disability', 'definitions', 'mnemonic']
  },
  {
    id: 'FC-RISK-MN-003',
    domain: 'RISK',
    category: 'mnemonic',
    mnemonic: 'HO-3 = OPEN',
    front: 'Homeowners Insurance Coverage Forms',
    back: 'HO-3 (Most Common):\n• Dwelling: OPEN perils (all risks)\n• Contents: NAMED perils only\n\nHO-5 (Comprehensive):\n• Both dwelling AND contents: OPEN perils\n• More expensive\n\nHO-4: Renters (contents only)\nHO-6: Condo (interior only)',
    difficulty: 'medium',
    tags: ['homeowners', 'coverage', 'mnemonic']
  },
  {
    id: 'FC-RISK-MN-004',
    domain: 'RISK',
    category: 'mnemonic',
    mnemonic: 'COBRA = 18/36',
    front: 'COBRA Continuation Coverage Periods',
    back: '18 months: General qualifying event\n• Termination (not gross misconduct)\n• Reduction in hours\n\n36 months: Extended events\n• Death of employee\n• Divorce/separation\n• Medicare entitlement\n• Dependent child aging out\n\n102% of premium (employer pays nothing)',
    difficulty: 'medium',
    tags: ['COBRA', 'health insurance', 'mnemonic']
  },
];

// ==========================================
// ESTATE PLANNING MNEMONICS
// ==========================================
export const EST_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'FC-EST-MN-001',
    domain: 'EST',
    category: 'mnemonic',
    mnemonic: 'GRAT/GRUT',
    front: 'Grantor Retained Annuity Trust vs Unitrust',
    back: 'GRAT (Grantor Retained Annuity Trust):\n• Fixed annual payment\n• Best when assets expected to appreciate\n• "Zeroed-out" GRAT = no gift tax\n\nGRUT (Grantor Retained Unitrust):\n• Percentage of annual trust value\n• Payment fluctuates with value\n• Less common than GRAT\n\nBoth: Grantor must outlive term',
    difficulty: 'hard',
    tags: ['GRAT', 'GRUT', 'trusts', 'mnemonic']
  },
  {
    id: 'FC-EST-MN-002',
    domain: 'EST',
    category: 'mnemonic',
    mnemonic: 'ANNUAL = $18K',
    front: 'Gift Tax Annual Exclusion',
    back: 'Annual exclusion (2024): $18,000\n\n• Per donee, per year\n• Unlimited number of recipients\n• Gift splitting with spouse = $36,000\n• No return needed if under limit\n\nMust be present interest gift\n(Crummey power for trusts)',
    difficulty: 'easy',
    tags: ['gift tax', 'annual exclusion', 'mnemonic']
  },
  {
    id: 'FC-EST-MN-003',
    domain: 'EST',
    category: 'mnemonic',
    mnemonic: 'ILIT',
    front: 'Irrevocable Life Insurance Trust',
    back: 'ILIT purposes:\n• Remove life insurance from estate\n• Provide liquidity for estate taxes\n• Control distribution to beneficiaries\n\nKey rules:\n• 3-year look-back for transfers\n• Crummey notices for gift tax exclusion\n• Trustee pays premiums\n• Insured cannot be trustee',
    difficulty: 'hard',
    tags: ['ILIT', 'trusts', 'estate tax', 'mnemonic']
  },
  {
    id: 'FC-EST-MN-004',
    domain: 'EST',
    category: 'mnemonic',
    mnemonic: 'POD/TOD',
    front: 'Payable on Death vs Transfer on Death',
    back: 'POD (Payable on Death):\n• Bank accounts, CDs\n• Beneficiary receives at death\n\nTOD (Transfer on Death):\n• Brokerage accounts, securities\n• Beneficiary receives at death\n\nBoth:\n• Avoid probate\n• Revocable during lifetime\n• Override will provisions\n• Simple beneficiary designation',
    difficulty: 'easy',
    tags: ['POD', 'TOD', 'probate', 'mnemonic']
  },
];

// ==========================================
// PSYCHOLOGY OF FINANCIAL PLANNING MNEMONICS
// ==========================================
export const PSY_MNEMONICS: MnemonicFlashcard[] = [
  {
    id: 'FC-PSY-MN-001',
    domain: 'PSY',
    category: 'mnemonic',
    mnemonic: 'BIAS TRAPS',
    front: 'Common Behavioral Finance Biases',
    back: 'B - Bandwagon effect (herding)\nI - Illusion of control\nA - Anchoring (first number fixation)\nS - Status quo bias\n\nT - Transparency illusion\nR - Recency bias\nA - Availability heuristic\nP - Present bias (hyperbolic discounting)\nS - Sunk cost fallacy',
    difficulty: 'hard',
    tags: ['behavioral finance', 'biases', 'mnemonic']
  },
  {
    id: 'FC-PSY-MN-002',
    domain: 'PSY',
    category: 'mnemonic',
    mnemonic: 'ACTIVE LISTENING',
    front: 'Effective Client Communication Techniques',
    back: 'A - Ask open-ended questions\nC - Clarify and confirm understanding\nT - Take notes (with permission)\nI - Identify non-verbal cues\nV - Validate feelings\nE - Empathize without judgment\n\nParaphrase to show understanding\nSummarize key points',
    difficulty: 'medium',
    tags: ['communication', 'listening', 'mnemonic']
  },
  {
    id: 'FC-PSY-MN-003',
    domain: 'PSY',
    category: 'mnemonic',
    mnemonic: 'SMART GOALS',
    front: 'SMART Goal Framework',
    back: 'S - Specific (clear and defined)\nM - Measurable (quantifiable)\nA - Achievable (realistic)\nR - Relevant (aligned with values)\nT - Time-bound (deadline)\n\nExample: "Save $10,000 for emergency fund in 18 months by auto-transferring $556/month"',
    difficulty: 'easy',
    tags: ['goals', 'planning', 'mnemonic']
  },
];

// ==========================================
// EXPORT ALL CFP MNEMONICS
// ==========================================
export const CFP_MNEMONICS: MnemonicFlashcard[] = [
  ...GEN_MNEMONICS,
  ...RET_MNEMONICS,
  ...TAX_MNEMONICS,
  ...INV_MNEMONICS,
  ...RISK_MNEMONICS,
  ...EST_MNEMONICS,
  ...PSY_MNEMONICS,
];

export default CFP_MNEMONICS;
