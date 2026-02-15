/**
 * CFP Domain Quick Reference Sheets
 * 
 * Concise, exam-focused reference materials for each CFP domain
 * Includes key numbers, thresholds, rules, and common exam traps
 */

export interface QuickReferenceItem {
  id: string;
  title: string;
  value: string;
  details?: string;
  examTip?: string;
}

export interface QuickReferenceRule {
  id: string;
  name: string;
  summary: string;
  keyPoints: string[];
  commonMistakes?: string[];
}

export interface QuickReferenceComparison {
  id: string;
  title: string;
  items: {
    name: string;
    characteristics: string[];
  }[];
}

export interface DomainQuickReference {
  domain: string;
  domainCode: string;
  examWeight: number;
  keyNumbers: QuickReferenceItem[];
  keyRules: QuickReferenceRule[];
  comparisons: QuickReferenceComparison[];
  examTips: string[];
  mnemonics: { phrase: string; meaning: string }[];
}

// ============================================
// RETIREMENT PLANNING (19% of exam)
// ============================================
export const RETIREMENT_QUICK_REF: DomainQuickReference = {
  domain: 'Retirement Planning',
  domainCode: 'RET',
  examWeight: 19,
  
  keyNumbers: [
    { id: 'RET-NUM-001', title: '401(k) Employee Deferral (2026)', value: '$24,500', details: 'Catch-up: +$7,500 if 50+; +$11,250 if 60-63 (SECURE 2.0)', examTip: 'Same limit for 403(b), 457(b), TSP' },
    { id: 'RET-NUM-002', title: 'IRA Contribution (2026)', value: '$7,500', details: 'Catch-up: +$1,000 if 50+' },
    { id: 'RET-NUM-003', title: 'SEP-IRA Maximum', value: '25% of comp or $71,500', details: 'Lesser of the two; must cover all eligible employees' },
    { id: 'RET-NUM-004', title: 'SIMPLE IRA Deferral (2026)', value: '$17,000', details: 'Catch-up: +$3,500 if 50+' },
    { id: 'RET-NUM-005', title: 'Social Security FRA (1960+)', value: 'Age 67', details: '62 gives ~70% of PIA; 70 gives ~124% of PIA' },
    { id: 'RET-NUM-006', title: 'SS Earnings Test (before FRA)', value: '$23,400/year', details: '$1 reduction per $2 over limit', examTip: 'No earnings test after FRA' },
    { id: 'RET-NUM-007', title: 'RMD Beginning Age', value: 'Age 73', details: 'SECURE 2.0: Age 75 in 2033', examTip: 'Roth IRAs—NO RMDs for owner' },
    { id: 'RET-NUM-008', title: 'QDRO Required For', value: 'Qualified retirement plans', details: 'NOT required for IRAs', examTip: 'IRAs divided by transfer incident to divorce' },
    { id: 'RET-NUM-009', title: 'Highly Compensated Employee (2026)', value: '$160,000', details: 'Prior year compensation', examTip: 'Key Owner: >5% in current or prior year' },
    { id: 'RET-NUM-010', title: 'Top-Heavy Plan Threshold', value: '>60% key employees', details: 'Must provide 3% minimum contribution' },
  ],
  
  keyRules: [
    {
      id: 'RET-RULE-001',
      name: 'Pro-Rata Rule (Backdoor Roth)',
      summary: 'All traditional IRA assets count when calculating taxable portion of conversion',
      keyPoints: [
        'Aggregates ALL traditional IRAs, SEP-IRAs, SIMPLE IRAs',
        'Non-deductible basis spread across total IRA value',
        'Cannot convert just the non-deductible portion',
        'Work-around: Roll IRA into employer 401(k) first'
      ],
      commonMistakes: ['Thinking you can convert only after-tax dollars', 'Forgetting SEP/SIMPLE count']
    },
    {
      id: 'RET-RULE-002',
      name: '10% Early Withdrawal Penalty Exceptions',
      summary: 'Penalty-free at 59½, but exceptions exist before',
      keyPoints: [
        'Death or disability of account owner',
        '72(t) SEPP (substantially equal periodic payments)',
        'First-time home purchase (IRA only, $10K lifetime)',
        'Medical expenses > 7.5% AGI',
        'Separation from service at 55+ (QRPs, not IRAs)',
        'SECURE 2.0: Birth/adoption ($5K), terminal illness, domestic abuse'
      ]
    },
    {
      id: 'RET-RULE-003',
      name: 'Required Minimum Distributions',
      summary: 'Must begin by April 1 of year following turning 73',
      keyPoints: [
        'Annual deadline: December 31 (first year: April 1 option)',
        'Taking April 1 option = 2 RMDs in first year (double tax)',
        'Failure penalty: 25% of shortfall (was 50%)',
        'Roth IRAs: No RMDs for original owner',
        'Roth 401(k): RMDs required (unless rolled to Roth IRA)'
      ]
    },
    {
      id: 'RET-RULE-004',
      name: 'Spousal vs Non-Spouse Beneficiary Rules',
      summary: 'Surviving spouses have options non-spouses lack',
      keyPoints: [
        'Spouse can: Roll to own IRA, remain as beneficiary, disclaim',
        'Non-spouse: 10-year rule (most), limited stretch for EDBs',
        'Eligible Designated Beneficiaries: minor child, disabled, chronically ill, <10 years younger',
        'SECURE Act: Eliminated stretch IRA for most non-spouse'
      ]
    }
  ],
  
  comparisons: [
    {
      id: 'RET-COMP-001',
      title: 'Traditional IRA vs Roth IRA',
      items: [
        { name: 'Traditional IRA', characteristics: ['Pre-tax contributions (if deductible)', 'Tax-deferred growth', 'Taxable withdrawals', 'RMDs at 73', 'Income limits for deduction if covered by plan'] },
        { name: 'Roth IRA', characteristics: ['After-tax contributions', 'Tax-free growth', 'Tax-free qualified withdrawals', 'No RMDs for owner', 'Income limits for contribution'] }
      ]
    },
    {
      id: 'RET-COMP-002',
      title: 'SEP vs SIMPLE vs Solo 401(k)',
      items: [
        { name: 'SEP-IRA', characteristics: ['Employer-only contributions', '25% of comp up to $69K', 'Must cover all eligible employees', 'No loans', 'Easy to administer'] },
        { name: 'SIMPLE IRA', characteristics: ['Employee deferrals + employer match/contribution', '$16K deferral + 3% match OR 2% non-elective', '100 or fewer employees', '25% penalty first 2 years', 'No loans'] },
        { name: 'Solo 401(k)', characteristics: ['Owner + spouse only', 'Employee + employer contributions', '$23K deferral + 25% employer = up to $69K', 'Loans allowed', 'Roth option available'] }
      ]
    }
  ],
  
  examTips: [
    'Social Security: 8%/year delay credit from FRA to 70; ~6.67%/year reduction from FRA to 62',
    'The 4% rule: Initial withdrawal rate for 30-year retirement using diversified portfolio',
    'QDRO only for qualified plans—IRAs just need proper transfer documentation',
    'Catch-up contributions: 50+ rule applies to IRAs, 401(k), 403(b), 457, SIMPLE',
    '457 plans have no 10% early withdrawal penalty (except 457(b) non-governmental)',
    'Medicare Part B and D: IRMAA surcharges based on 2-year prior MAGI'
  ],
  
  mnemonics: [
    { phrase: 'SIMPLE = 100 employees max', meaning: 'S-100 (SIMPLE has 100 employee limit)' },
    { phrase: 'FRA is 67 for 1960+', meaning: 'Full Retirement Age increased from 65/66 progressively' },
    { phrase: 'SEPP = 5 years OR 59½', meaning: 'Substantially Equal Periodic Payments must continue until later of 5 years or age 59½' }
  ]
};

// ============================================
// TAX PLANNING (14% of exam)
// ============================================
export const TAX_QUICK_REF: DomainQuickReference = {
  domain: 'Tax Planning',
  domainCode: 'TAX',
  examWeight: 14,
  
  keyNumbers: [
    { id: 'TAX-NUM-001', title: 'Standard Deduction MFJ (2026)', value: '$30,700', details: 'MFS: $15,350; Single: $15,350; HoH: $23,000' },
    { id: 'TAX-NUM-002', title: 'LTCG/Qualified Dividend 0% Rate', value: 'Up to $99,200 (MFJ)', details: 'Taxable income threshold, not AGI' },
    { id: 'TAX-NUM-003', title: 'NIIT Threshold', value: '$250,000 MAGI (MFJ)', details: '3.8% on net investment income above threshold' },
    { id: 'TAX-NUM-004', title: 'AMT Exemption (2026)', value: '$140,500 (MFJ)', details: 'Single: $90,200', examTip: 'ISOs often trigger AMT' },
    { id: 'TAX-NUM-005', title: 'Gift Tax Annual Exclusion', value: '$19,000', details: 'Per donee, unlimited recipients', examTip: 'Split gifts = $38,000 (MFJ)' },
    { id: 'TAX-NUM-006', title: 'Kiddie Tax Threshold', value: '$2,700', details: 'First $1,350 tax-free, next $1,350 child rate, above at parent rate' },
    { id: 'TAX-NUM-007', title: 'Section 121 Exclusion', value: '$250K/$500K (single/MFJ)', details: 'Must own and use 2 of 5 years', examTip: 'Use test can be aggregated' },
    { id: 'TAX-NUM-008', title: 'Estimated Tax Safe Harbor', value: '110% prior year tax', details: 'If prior year AGI > $150K', examTip: '100% if AGI ≤ $150K' },
    { id: 'TAX-NUM-009', title: 'Self-Employment Tax Rate', value: '15.3%', details: '12.4% SS + 2.9% Medicare', examTip: '50% deductible above-the-line' },
    { id: 'TAX-NUM-010', title: 'QBI Deduction (Section 199A)', value: 'Up to 20%', details: 'Phaseouts for SSTB over $383,900 MFJ' },
  ],
  
  keyRules: [
    {
      id: 'TAX-RULE-001',
      name: 'Wash Sale Rule',
      summary: 'No loss deduction if substantially identical security bought within 30 days before/after sale',
      keyPoints: [
        '30-day window applies BOTH before and after sale',
        'Applies to stocks, bonds, options on same security',
        'Disallowed loss added to basis of new shares',
        'Different company in same sector is NOT substantially identical',
        'Same-index ETF could be challenged'
      ],
      commonMistakes: ['Only considering 30 days after', 'Forgetting IRA purchases trigger it too']
    },
    {
      id: 'TAX-RULE-002',
      name: 'Passive Activity Loss Rules',
      summary: 'Passive losses only offset passive income; suspended until disposition',
      keyPoints: [
        'Material participation = 500+ hours, substantially all participation, or 100+ hours if most',
        'Real estate professional exception: 750+ hours and materially participate',
        '$25,000 rental loss allowance phases out $100K-$150K AGI',
        'At-risk rules apply before PAL rules',
        'Suspended losses released on fully taxable disposition'
      ]
    },
    {
      id: 'TAX-RULE-003',
      name: 'Capital Loss Limitations',
      summary: '$3,000 net capital losses deductible against ordinary income annually',
      keyPoints: [
        'STCL offset STCG first, then LTCG',
        'LTCL offset LTCG first, then STCG',
        'Net loss: $3,000 limit against ordinary income',
        'Excess carries forward indefinitely',
        'Character preserved in carryforward'
      ]
    },
    {
      id: 'TAX-RULE-004',
      name: 'Like-Kind Exchange (1031)',
      summary: 'Tax-deferred exchange of real property held for business or investment',
      keyPoints: [
        'Only real property (TCJA eliminated personal property)',
        '45-day identification period',
        '180-day completion period',
        'Boot = taxable gain (cash, debt relief, non-like-kind property)',
        'Basis carryover (reduced by boot, increased by additional investment)'
      ]
    }
  ],
  
  comparisons: [
    {
      id: 'TAX-COMP-001',
      title: 'Tax Filing Status Order of Preference',
      items: [
        { name: 'MFJ', characteristics: ['Highest standard deduction ($29,200)', 'Widest brackets', 'Most tax benefits', 'Joint and several liability'] },
        { name: 'Qualifying Surviving Spouse', characteristics: ['Same benefits as MFJ for 2 years after death', 'Must have dependent child'] },
        { name: 'Head of Household', characteristics: ['$21,900 standard deduction', 'Wider brackets than single', 'Must be unmarried, pay 50%+ housing, have qualifying person'] },
        { name: 'Single', characteristics: ['$14,600 standard deduction', 'Narrowest brackets'] },
        { name: 'MFS', characteristics: ['$14,600 standard deduction', 'Many credits disallowed', 'Protects from spouse liability'] }
      ]
    },
    {
      id: 'TAX-COMP-002',
      title: 'LTCG vs Ordinary Income Treatment',
      items: [
        { name: 'Long-Term Capital Gains', characteristics: ['Assets held >1 year', '0%/15%/20% rates', 'Collectibles: 28%', 'Section 1250 recapture: 25%'] },
        { name: 'Ordinary Income', characteristics: ['Salary, interest, short-term gains', 'Up to 37% rate', 'Subject to progressive brackets', 'SS/Medicare taxes on earned income'] }
      ]
    }
  ],
  
  examTips: [
    'Installment sale: Spread gain over payments received; interest must be charged',
    'Kiddie tax: Applies to under 19, or under 24 if full-time student without earned income > 50% of support',
    'AMT adjustments: ISOs, state taxes, miscellaneous deductions, home equity loan interest (if not acquisition)',
    'Charitable deduction limits: Cash 60% AGI, appreciated property (LTCG) 30% AGI',
    'Carryovers: NOL indefinite (80% limit), capital losses indefinite, charitable 5 years',
    'Hobby loss: 3 of 5 profitable years presumption (7 of 7 for horses)'
  ],
  
  mnemonics: [
    { phrase: 'FICA = 15.3 (SE)', meaning: 'Self-employment tax is 15.3% (12.4% SS + 2.9% Medicare)' },
    { phrase: 'Wash = 61 days', meaning: 'Wash sale window is 30 days before + day of sale + 30 days after = 61 day period' },
    { phrase: '$3K = Capital loss limit', meaning: 'Net capital losses limited to $3,000/year against ordinary income' }
  ]
};

// ============================================
// INVESTMENT PLANNING (11% of exam)
// ============================================
export const INVESTMENT_QUICK_REF: DomainQuickReference = {
  domain: 'Investment Planning',
  domainCode: 'INV',
  examWeight: 11,
  
  keyNumbers: [
    { id: 'INV-NUM-001', title: 'Investment Grade Bond Rating', value: 'BBB- / Baa3 or higher', details: 'Below is high-yield (junk)' },
    { id: 'INV-NUM-002', title: 'Rule of 72', value: '72 / rate = years to double', details: 'Quick estimation for compound growth' },
    { id: 'INV-NUM-003', title: 'Market Beta', value: '1.0', details: 'β>1 = more volatile, β<1 = less volatile' },
    { id: 'INV-NUM-004', title: 'Equity Risk Premium (historical)', value: '~5-7%', details: 'Stocks over risk-free rate', examTip: 'Used in CAPM calculations' },
    { id: 'INV-NUM-005', title: 'Mutual Fund 12b-1 Limit', value: '1% annually', details: '0.25% max for no-load funds' },
  ],
  
  keyRules: [
    {
      id: 'INV-RULE-001',
      name: 'CAPM (Capital Asset Pricing Model)',
      summary: 'Expected Return = Rf + β(Rm - Rf)',
      keyPoints: [
        'Rf = Risk-free rate (T-bill)',
        'β = Asset beta (systematic risk)',
        'Rm = Market return',
        '(Rm - Rf) = Market risk premium',
        'Only systematic risk is compensated'
      ]
    },
    {
      id: 'INV-RULE-002',
      name: 'Modern Portfolio Theory',
      summary: 'Diversification reduces unsystematic risk without reducing expected return',
      keyPoints: [
        'Efficient frontier: Maximum return for given risk',
        'Correlation <1 provides diversification benefit',
        'Negative correlation = maximum diversification',
        'Unsystematic risk eliminated with ~30 stocks',
        'Systematic risk cannot be diversified away'
      ]
    },
    {
      id: 'INV-RULE-003',
      name: 'Bond Duration',
      summary: 'Measure of bond price sensitivity to interest rate changes',
      keyPoints: [
        'Duration = approximate % price change for 1% rate change',
        'Longer maturity = higher duration',
        'Higher coupon = lower duration',
        'Zero-coupon: Duration = maturity',
        'Convexity: Duration changes as rates change'
      ]
    },
    {
      id: 'INV-RULE-004',
      name: 'Efficient Market Hypothesis',
      summary: 'Security prices reflect available information',
      keyPoints: [
        'Weak form: Past prices (technical analysis beaten)',
        'Semi-strong: All public info (fundamental analysis beaten)',
        'Strong: All info including insider (no one can beat)',
        'Implications: Use index funds, minimize costs'
      ]
    }
  ],
  
  comparisons: [
    {
      id: 'INV-COMP-001',
      title: 'Risk-Adjusted Performance Measures',
      items: [
        { name: 'Sharpe Ratio', characteristics: ['(Rp - Rf) / σp', 'Total risk (std dev)', 'For undiversified portfolios'] },
        { name: 'Treynor Ratio', characteristics: ['(Rp - Rf) / βp', 'Systematic risk (beta)', 'For diversified portfolios'] },
        { name: 'Alpha (Jensen)', characteristics: ['Actual return - CAPM expected return', 'Excess return vs benchmark', 'Positive = outperformance'] },
        { name: 'Information Ratio', characteristics: ['(Rp - Rb) / Tracking Error', 'Active return per unit active risk', 'For active management'] }
      ]
    },
    {
      id: 'INV-COMP-002',
      title: 'Investment Vehicles',
      items: [
        { name: 'ETF', characteristics: ['Trades intraday', 'In-kind redemption (tax efficient)', 'Low expense ratios', 'May trade at premium/discount'] },
        { name: 'Mutual Fund', characteristics: ['NAV pricing end of day', 'Cash redemption (less tax efficient)', 'No premium/discount', 'May have loads'] },
        { name: 'Closed-End Fund', characteristics: ['Fixed shares, trades on exchange', 'Often trades at discount', 'May use leverage', 'No continuous creation/redemption'] }
      ]
    }
  ],
  
  examTips: [
    'Sharpe uses total risk (σ); Treynor uses systematic risk (β)',
    'Beta < 0 means inverse correlation to market (rare)',
    'Duration: ±1% change in rates = duration × 1% change in price (opposite direction)',
    'R-squared: Measures how much of return explained by market; high = use Treynor',
    'Asset Location: Taxable bonds in tax-deferred; muni bonds and growth stocks in taxable',
    'Tax-loss harvesting: Sell losers, buy similar (not identical) to maintain exposure'
  ],
  
  mnemonics: [
    { phrase: 'CAPM: Risk-free + Beta × Premium', meaning: 'E(R) = Rf + β(Rm - Rf)' },
    { phrase: 'Sharpe = Total, Treynor = sysTemaTic', meaning: 'Remember which ratio uses which risk measure' },
    { phrase: 'Duration: Rate UP, Price DOWN', meaning: 'Inverse relationship between rates and bond prices' }
  ]
};

// ============================================
// ESTATE PLANNING (12% of exam)
// ============================================
export const ESTATE_QUICK_REF: DomainQuickReference = {
  domain: 'Estate Planning',
  domainCode: 'EST',
  examWeight: 12,
  
  keyNumbers: [
    { id: 'EST-NUM-001', title: 'Estate/Gift Tax Exemption (2026)', value: '$7.0 million', details: 'Portable to surviving spouse; TCJA sunset effective 1/1/2026', examTip: 'Anti-clawback protects pre-2026 gifts' },
    { id: 'EST-NUM-002', title: 'Annual Gift Tax Exclusion (2026)', value: '$19,000', details: 'Per donee, unlimited recipients', examTip: 'Split gifts = $38,000' },
    { id: 'EST-NUM-003', title: 'GST Tax Rate', value: '40% flat', details: 'Separate $7.0M exemption', examTip: 'Skip person = 2+ generations below' },
    { id: 'EST-NUM-004', title: 'Estate Tax Rate', value: '40%', details: 'On taxable estate above exemption' },
    { id: 'EST-NUM-005', title: 'Special Use Valuation Limit', value: '$1,450,000', details: 'Section 2032A for farms/business real estate' },
    { id: 'EST-NUM-006', title: 'Annual Non-Citizen Spouse Gift', value: '$190,000', details: 'Enhanced annual exclusion for non-citizen spouse' },
    { id: 'EST-NUM-007', title: 'Alternate Valuation Date', value: '6 months after death', details: 'Must reduce both estate value AND tax' },
    { id: 'EST-NUM-008', title: 'Qualified Disclaimer Deadline', value: '9 months', details: 'From date of transfer/death' },
    { id: 'EST-NUM-009', title: 'Section 6166 Business %', value: '>35% of AGE', details: 'Installment payment of estate tax (up to 14 years)' },
    { id: 'EST-NUM-010', title: 'Section 303 Redemption %', value: '>35% of gross estate', details: 'Stock redemption treated as sale, not dividend' },
  ],
  
  keyRules: [
    {
      id: 'EST-RULE-001',
      name: 'Unlimited Marital Deduction',
      summary: 'Unlimited transfers to US citizen spouse—estate tax deferred',
      keyPoints: [
        'Applies to both gift and estate tax',
        'Must be US citizen (or use QDOT)',
        'Property must pass to spouse outright or in qualifying trust',
        'QTIP trust qualifies (all income to spouse, no one else can benefit)',
        'Tax deferred, not eliminated—due at surviving spouse death'
      ]
    },
    {
      id: 'EST-RULE-002',
      name: 'Portability',
      summary: 'Deceased spouse unused exemption (DSUE) transfers to survivor',
      keyPoints: [
        'Must file estate tax return (Form 706) to elect',
        'Filing required even if no tax due',
        'Only last deceased spouse DSUE available',
        'Does NOT port GST exemption',
        'No inflation adjustment on ported DSUE'
      ]
    },
    {
      id: 'EST-RULE-003',
      name: 'Step-Up in Basis',
      summary: 'Inherited assets receive FMV basis at date of death',
      keyPoints: [
        'Eliminates unrealized capital gains',
        'Applies to most capital assets',
        'Alternate valuation: 6 months later if estate/tax decrease',
        'Special basis rules for community property (both halves step up)',
        'IRD (income in respect of decedent) does NOT get step-up'
      ]
    },
    {
      id: 'EST-RULE-004',
      name: 'Crummey Powers',
      summary: 'Withdrawal rights creating present interest for annual exclusion',
      keyPoints: [
        'Required for gifts to irrevocable trusts to qualify for $18K exclusion',
        'Notice to beneficiaries required',
        'Typically 30-60 day withdrawal period',
        'Lapse in excess of 5-and-5 is taxable transfer',
        '5-and-5: Greater of $5,000 or 5% of corpus annually'
      ]
    }
  ],
  
  comparisons: [
    {
      id: 'EST-COMP-001',
      title: 'Trust Types',
      items: [
        { name: 'Revocable Trust', characteristics: ['Grantor retains control', 'Assets in estate', 'Avoids probate', 'No asset protection', 'Grantor taxed on income'] },
        { name: 'Irrevocable Trust', characteristics: ['Grantor gives up control', 'Assets out of estate', 'Asset protection possible', 'May have gift tax consequences', 'Trust or beneficiary taxed'] },
        { name: 'ILIT', characteristics: ['Owns life insurance', 'Death benefit excluded from estate', 'Crummey powers for premiums', '3-year lookback if transferred existing policy'] }
      ]
    },
    {
      id: 'EST-COMP-002',
      title: 'Charitable Trusts',
      items: [
        { name: 'CRT (Remainder Trust)', characteristics: ['Donor/beneficiary receives income', 'Charity gets remainder', 'Income tax deduction at creation', 'Reduces estate'] },
        { name: 'CLT (Lead Trust)', characteristics: ['Charity receives income stream', 'Family gets remainder', 'Gift/estate tax savings for remainder', 'Income tax deduction (grantor CLT only)'] }
      ]
    }
  ],
  
  examTips: [
    'Portability only works with proper Form 706 filing—counsel clients appropriately',
    'Life insurance: Included in estate if owned by decedent OR transferred within 3 years',
    'QTIP vs Bypass: QTIP uses marital deduction, Bypass uses deceased spouse exemption',
    'Special Needs Trust: Supplements but doesn\'t replace government benefits',
    'Power of appointment: General = included in estate; Limited = excluded',
    'Community property: Both halves get step-up at first death'
  ],
  
  mnemonics: [
    { phrase: '$7M in 2026 (sunset)', meaning: 'Unified credit exemption after TCJA sunset' },
    { phrase: 'Portability = File 706', meaning: 'Must file estate return to preserve DSUE' },
    { phrase: '3-year lookback for life insurance', meaning: 'Transferred policies included if death within 3 years' }
  ]
};

// ============================================
// RISK MANAGEMENT / INSURANCE (12% of exam)
// ============================================
export const INSURANCE_QUICK_REF: DomainQuickReference = {
  domain: 'Risk Management & Insurance',
  domainCode: 'RISK',
  examWeight: 12,
  
  keyNumbers: [
    { id: 'RISK-NUM-001', title: 'Medicare Part A Premium', value: '$0 (if 40+ quarters)', details: 'Otherwise up to $505/month' },
    { id: 'RISK-NUM-002', title: 'Medicare Part B Premium (2026)', value: '$185.00 base', details: 'IRMAA surcharges for high income', examTip: 'Based on MAGI 2 years prior' },
    { id: 'RISK-NUM-003', title: 'HDHP Minimum Deductible (2026)', value: '$1,650 indiv / $3,300 family', details: 'For HSA eligibility' },
    { id: 'RISK-NUM-004', title: 'HSA Contribution (2026)', value: '$4,450 indiv / $8,900 family', details: 'Catch-up: +$1,000 if 55+' },
    { id: 'RISK-NUM-005', title: 'LTC ADL Requirement', value: '2 of 6 ADLs', details: 'For tax-qualified benefits', examTip: 'ADLs: Eating, Bathing, Dressing, Toileting, Transferring, Continence' },
    { id: 'RISK-NUM-006', title: 'MEC 7-Pay Test', value: '7 years', details: 'Exceeding test creates Modified Endowment Contract' },
    { id: 'RISK-NUM-007', title: 'Life Insurance Incontestability', value: '2 years', details: 'After 2 years, insurer cannot contest policy' },
    { id: 'RISK-NUM-008', title: 'COBRA Duration', value: '18 months (general)', details: '36 months for divorce/death; 29 months for disability' },
  ],
  
  keyRules: [
    {
      id: 'RISK-RULE-001',
      name: 'Life Insurance Taxation',
      summary: 'Death benefits income tax-free; cash value grows tax-deferred',
      keyPoints: [
        'Death benefit: IRC 101(a) exclusion',
        'Transfer for value: Benefit becomes taxable except for exceptions',
        'Exceptions: Transfer to insured, partner, corporation where insured is S/H',
        'MEC: Distributions taxed LIFO, 10% penalty if under 59½',
        'FIFO treatment for non-MEC policies'
      ]
    },
    {
      id: 'RISK-RULE-002',
      name: 'Disability Insurance Taxation',
      summary: 'Premiums paid with after-tax dollars = tax-free benefits',
      keyPoints: [
        'Employer-paid premiums (not included in income): Benefits taxable',
        'Employee-paid (after-tax): Benefits tax-free',
        'Split: Pro-rata taxable',
        'Business overhead: Premiums deductible, benefits taxable'
      ]
    },
    {
      id: 'RISK-RULE-003',
      name: 'Own-Occupation vs Any-Occupation',
      summary: 'Definition of disability affects when benefits pay',
      keyPoints: [
        'Own-occ: Cannot perform duties of YOUR occupation',
        'Any-occ: Cannot perform ANY job you\'re qualified for',
        'Own-occ more expensive but more valuable',
        'Many policies: Own-occ for 2-5 years, then any-occ',
        'True own-occ for physicians, attorneys recommended'
      ]
    },
    {
      id: 'RISK-RULE-004',
      name: 'Long-Term Care Insurance',
      summary: 'Covers nursing home, assisted living, home care costs',
      keyPoints: [
        'Benefit trigger: 2 of 6 ADLs OR cognitive impairment',
        'Tax-qualified: Premium deductible (age-based limits)',
        'Benefits: Tax-free up to per diem limit ($440/day 2026)',
        'Elimination period = waiting period before benefits start',
        'Partnership policies: Dollar-for-dollar Medicaid asset protection'
      ]
    }
  ],
  
  comparisons: [
    {
      id: 'RISK-COMP-001',
      title: 'Term vs Whole Life vs Universal Life',
      items: [
        { name: 'Term Life', characteristics: ['Temporary coverage', 'No cash value', 'Lowest initial premium', 'Premium increases at renewal'] },
        { name: 'Whole Life', characteristics: ['Permanent coverage', 'Guaranteed cash value', 'Level premium', 'May pay dividends (par policies)'] },
        { name: 'Universal Life', characteristics: ['Permanent with flexibility', 'Adjustable premiums/death benefit', 'Cash value based on crediting rate', 'May lapse if underfunded'] }
      ]
    },
    {
      id: 'RISK-COMP-002',
      title: 'Medicare Parts',
      items: [
        { name: 'Part A', characteristics: ['Hospital insurance', 'Skilled nursing (limited)', 'Home health', 'Hospice', 'Premium-free if qualified'] },
        { name: 'Part B', characteristics: ['Physician services', 'Outpatient care', 'Preventive services', 'Monthly premium', 'IRMAA surcharges'] },
        { name: 'Part D', characteristics: ['Prescription drugs', 'Private insurance plans', 'Coverage gap (donut hole)', 'IRMAA surcharges'] }
      ]
    }
  ],
  
  examTips: [
    'Insurable interest required at policy INCEPTION, not at death',
    'Umbrella liability: Excess coverage, kicks in after underlying limits exhausted',
    'HO-3: Open-peril on dwelling, named-peril on contents; HO-5: Open-peril on both',
    '1035 exchange: Life for life, life for annuity, annuity for annuity—NOT annuity for life',
    'Coinsurance: Typically 80% of replacement cost required to avoid penalty',
    'Subrogation: Insurer can pursue at-fault party after paying claim'
  ],
  
  mnemonics: [
    { phrase: 'ADL = BEDT-TC', meaning: 'Bathing, Eating, Dressing, Toileting, Transferring, Continence' },
    { phrase: 'Premium by you = Tax-free benefits', meaning: 'After-tax disability premiums yield tax-free benefits' },
    { phrase: 'COBRA 18-36-29', meaning: '18 months standard, 36 months divorce/death, 29 months disability' }
  ]
};

// ============================================
// PROFESSIONAL CONDUCT (15% of exam)
// ============================================
export const PROFESSIONAL_QUICK_REF: DomainQuickReference = {
  domain: 'Professional Conduct & Regulation',
  domainCode: 'PRO',
  examWeight: 15,
  
  keyNumbers: [
    { id: 'PRO-NUM-001', title: 'CFP CE Requirement', value: '30 hours per 2-year period', details: 'Includes 2 hours Standards of Conduct' },
    { id: 'PRO-NUM-002', title: 'Document Retention', value: '7 years', details: 'From document date or relationship end, whichever later' },
    { id: 'PRO-NUM-003', title: 'SEC RIA Threshold', value: '$110 million AUM', details: 'Must register with SEC; below = state registration' },
    { id: 'PRO-NUM-004', title: 'Accredited Investor Income', value: '$200K ($300K joint)', details: 'Or $1M net worth excluding primary residence' },
    { id: 'PRO-NUM-005', title: 'Qualified Purchaser', value: '$5 million investments', details: 'Required for certain private funds' },
  ],
  
  keyRules: [
    {
      id: 'PRO-RULE-001',
      name: 'Fiduciary Duty (CFP Board)',
      summary: 'CFP® professionals owe fiduciary duty at all times when providing Financial Advice',
      keyPoints: [
        'Duty of Loyalty: Place client interests above own',
        'Duty of Care: Act with skill, prudence, diligence',
        'Duty to Follow Client Instructions: Within legal bounds',
        'Applies to financial planning and Financial Advice',
        'Cannot be waived by client'
      ]
    },
    {
      id: 'PRO-RULE-002',
      name: 'Material Conflict of Interest',
      summary: 'Conflicts must be disclosed, client must consent',
      keyPoints: [
        'Disclose all material conflicts in writing',
        'Obtain informed consent from client',
        'Manage conflicts appropriately',
        'Cannot eliminate duty through disclosure',
        'Commission-based compensation is a conflict'
      ]
    },
    {
      id: 'PRO-RULE-003',
      name: 'Seven Principles (Code of Ethics)',
      summary: 'Foundation for all professional conduct',
      keyPoints: [
        'Integrity: Honest, not misleading',
        'Objectivity: Unbiased, not unduly influenced',
        'Competence: Adequate knowledge and skills',
        'Fairness: Treat others fairly',
        'Confidentiality: Protect client information',
        'Professionalism: Conduct with dignity',
        'Diligence: Prompt, thorough service'
      ]
    },
    {
      id: 'PRO-RULE-004',
      name: 'Financial Planning Process (7 Steps)',
      summary: 'Systematic approach to comprehensive planning',
      keyPoints: [
        '1. Understanding client circumstances',
        '2. Identifying and selecting goals',
        '3. Analyzing current course',
        '4. Developing recommendations',
        '5. Presenting recommendations',
        '6. Implementing recommendations',
        '7. Monitoring progress and updating'
      ]
    }
  ],
  
  comparisons: [
    {
      id: 'PRO-COMP-001',
      title: 'Fiduciary vs Suitability (Reg BI)',
      items: [
        { name: 'Fiduciary', characteristics: ['Best interest at ALL times', 'RIAs, CFP® professionals', 'Ongoing duty', 'Must avoid/manage conflicts', 'Cannot be waived'] },
        { name: 'Reg BI (Broker-Dealers)', characteristics: ['Best interest at TIME of recommendation', 'Broker-dealers', 'Point-in-time duty', 'Disclosure of conflicts', 'SEC enforced'] }
      ]
    },
    {
      id: 'PRO-COMP-002',
      title: 'SEC vs FINRA vs State Regulation',
      items: [
        { name: 'SEC', characteristics: ['RIAs >$110M AUM', 'Investment Advisers Act 1940', 'Form ADV disclosure'] },
        { name: 'FINRA', characteristics: ['Broker-dealers and reps', 'Conducts exams (Series 7, 66, etc)', 'Handles customer complaints'] },
        { name: 'State', characteristics: ['RIAs <$100M AUM', 'Insurance licensing', 'Blue sky laws'] }
      ]
    }
  ],
  
  examTips: [
    'CFP® fiduciary duty: Client best interest—cannot be waived, always applies to Financial Advice',
    'Confidentiality exceptions: Legal requirements, defending against claims, preventing harm',
    'Compensation disclosure: Must disclose HOW you are compensated, not exact amounts',
    'Termination: Take reasonable steps to protect client interests during transition',
    'Bankruptcy: Must report to CFP Board; may require client disclosure if material',
    'Supervision: Responsible for adequate systems, not guaranteeing no misconduct'
  ],
  
  mnemonics: [
    { phrase: '7 Steps: UISADPI (Understand, Identify, Study, Advise, Deliver, Put in action, Inspect)', meaning: 'Financial planning process steps' },
    { phrase: 'IOCFCPD', meaning: 'Integrity, Objectivity, Competence, Fairness, Confidentiality, Professionalism, Diligence' },
    { phrase: '30 hours / 2 years', meaning: 'CE requirement for CFP® certification' }
  ]
};

// ============================================
// GENERAL PRINCIPLES (18% of exam)
// ============================================
export const GENERAL_QUICK_REF: DomainQuickReference = {
  domain: 'General Principles',
  domainCode: 'GEN',
  examWeight: 18,
  
  keyNumbers: [
    { id: 'GEN-NUM-001', title: 'FDIC Insurance Limit', value: '$250,000', details: 'Per depositor, per bank, per ownership category' },
    { id: 'GEN-NUM-002', title: 'SIPC Protection', value: '$500,000 ($250,000 cash)', details: 'Securities customer protection' },
    { id: 'GEN-NUM-003', title: '529 Plan Annual Gift', value: '$19,000 or 5-year averaging', details: '$95,000 in one year with 5-year election' },
    { id: 'GEN-NUM-004', title: 'Coverdell ESA Annual Limit', value: '$2,000', details: 'Income limits apply' },
    { id: 'GEN-NUM-005', title: 'FICO Score Range', value: '300-850', details: 'Payment history = 35% (most important)' },
    { id: 'GEN-NUM-006', title: 'Emergency Fund Guideline', value: '3-6 months expenses', details: 'In liquid, accessible accounts' },
  ],
  
  keyRules: [
    {
      id: 'GEN-RULE-001',
      name: 'Time Value of Money',
      summary: 'Core concept: Money today worth more than same amount future',
      keyPoints: [
        'PV = Present Value (today)',
        'FV = Future Value',
        'n = number of periods',
        'i = interest rate per period',
        'PMT = periodic payment'
      ]
    },
    {
      id: 'GEN-RULE-002',
      name: 'Personal Financial Statements',
      summary: 'Balance sheet (net worth) and cash flow (income/expenses)',
      keyPoints: [
        'Net Worth = Assets - Liabilities (snapshot)',
        'Cash Flow = Income - Expenses (period)',
        'Liquidity ratios measure ability to meet short-term needs',
        'Savings ratio = Savings / Gross Income',
        'Debt ratio = Total Debt / Total Assets'
      ]
    },
    {
      id: 'GEN-RULE-003',
      name: 'Economic Indicators',
      summary: 'Leading, coincident, and lagging indicators track economic health',
      keyPoints: [
        'Leading: Stock prices, building permits, initial jobless claims',
        'Coincident: GDP, employment, personal income',
        'Lagging: Unemployment rate, CPI, prime rate',
        'Inverted yield curve often precedes recession'
      ]
    },
    {
      id: 'GEN-RULE-004',
      name: 'Property Ownership Forms',
      summary: 'How title is held affects rights and estate planning',
      keyPoints: [
        'JTWROS: Equal shares, automatic survivorship',
        'Tenancy in Common: Unequal shares allowed, no survivorship',
        'Tenancy by Entirety: Married only, creditor protection',
        'Community Property: Married couples in 9 states, both halves step up'
      ]
    }
  ],
  
  comparisons: [
    {
      id: 'GEN-COMP-001',
      title: 'Education Funding Options',
      items: [
        { name: '529 Plan', characteristics: ['No annual limit (gift tax implications)', 'Tax-free growth and qualified withdrawals', 'Donor controlled', 'K-12 up to $10K/year'] },
        { name: 'Coverdell ESA', characteristics: ['$2,000 annual limit', 'Income limits apply', 'K-12 and higher ed', 'Must use by age 30'] },
        { name: 'UTMA/UGMA', characteristics: ['Custodial account', 'Child\'s asset (financial aid impact)', 'No education use requirement', 'Irrevocable gift'] }
      ]
    },
    {
      id: 'GEN-COMP-002',
      title: 'Debt Payoff Strategies',
      items: [
        { name: 'Avalanche', characteristics: ['Pay highest interest rate first', 'Mathematically optimal', 'Saves most interest', 'Slower psychological wins'] },
        { name: 'Snowball', characteristics: ['Pay smallest balance first', 'Quick wins build momentum', 'May pay more interest', 'Better behavioral success'] }
      ]
    }
  ],
  
  examTips: [
    'Calculator: Know HP 12C and BA II Plus keystrokes for TVM problems',
    'Rule of 72: Years to double = 72 / interest rate (quick estimate)',
    'Behavioral biases: Loss aversion, confirmation bias, anchoring, herding',
    'FICO: Payment history 35%, Amounts owed 30%, Length 15%, New credit 10%, Mix 10%',
    'Annuity due has higher PV than ordinary annuity (payments at beginning)',
    'SMART goals: Specific, Measurable, Achievable, Realistic, Time-bound'
  ],
  
  mnemonics: [
    { phrase: 'FV = PV × (1+i)^n', meaning: 'Future value of lump sum' },
    { phrase: 'FDIC = $250K per depositor/bank/category', meaning: 'Deposit insurance limit' },
    { phrase: 'Payment history = 35%', meaning: 'Most important FICO factor' }
  ]
};

// Export all quick reference sheets
export const CFP_QUICK_REFERENCES: DomainQuickReference[] = [
  RETIREMENT_QUICK_REF,
  TAX_QUICK_REF,
  INVESTMENT_QUICK_REF,
  ESTATE_QUICK_REF,
  INSURANCE_QUICK_REF,
  PROFESSIONAL_QUICK_REF,
  GENERAL_QUICK_REF
];

export default CFP_QUICK_REFERENCES;
