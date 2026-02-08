/**
 * CFP "Why Wrong" Explanations
 * Detailed explanations for why each distractor (wrong answer) is incorrect
 * Keyed by question ID for easy lookup and integration
 * 
 * Research shows explaining why distractors are wrong significantly improves
 * learning outcomes and helps prevent common exam mistakes.
 */

export interface WhyWrongExplanation {
  questionId: string;
  domain: string;
  distractors: {
    option: string;
    text: string;
    whyWrong: string;
    commonMistake: string;
  }[];
}

export const WHY_WRONG_EXPLANATIONS: WhyWrongExplanation[] = [
  // ============================================
  // RETIREMENT (RET)
  // ============================================
  {
    questionId: 'CFP-RET-001',
    domain: 'RET',
    distractors: [
      {
        option: 'A',
        text: '$135,000',
        whyWrong: 'This answer correctly subtracts mortgage and retirement contributions from current income, but FAILS to account for the lower tax burden in retirement. The 12% reduction in marginal tax rate creates significant savings.',
        commonMistake: 'Forgetting that taxes typically decrease in retirement, leading to lower actual income needs.'
      },
      {
        option: 'C',
        text: '$153,000',
        whyWrong: 'This uses an 85% replacement ratio applied to gross income ($180,000 × 0.85), which is a quick estimate method. However, the question specifically asks for the EXPENSE METHOD which requires analyzing actual expense changes.',
        commonMistake: 'Using the replacement ratio method when the question explicitly asks for the expense method.'
      },
      {
        option: 'D',
        text: '$91,800',
        whyWrong: 'This over-reduces income needs by applying an incorrect tax calculation or double-counting deductions. The marginal rate difference should only apply to the portion of income in that bracket, not the entire income.',
        commonMistake: 'Applying marginal rate to total income instead of the specific bracket amount.'
      }
    ]
  },
  {
    questionId: 'CFP-RET-003',
    domain: 'RET',
    distractors: [
      {
        option: 'A',
        text: '401(k) pre-tax contribution',
        whyWrong: 'Pre-tax 401(k) contributions reduce current taxable income. Since Robert expects HIGHER taxes in retirement, he should pay taxes NOW (lower rate) rather than later (higher rate).',
        commonMistake: 'Defaulting to pre-tax contributions without analyzing current vs. future tax rates.'
      },
      {
        option: 'C',
        text: 'Non-deductible IRA',
        whyWrong: 'Non-deductible IRAs provide NO current deduction and taxable growth. This is the WORST of both worlds—pay taxes now AND later. Only valuable as backdoor Roth conversion vehicle.',
        commonMistake: 'Confusing non-deductible IRA with Roth IRA. Non-deductible has no tax-free growth benefit.'
      },
      {
        option: 'D',
        text: 'Taxable brokerage',
        whyWrong: 'While taxable accounts offer flexibility and favorable capital gains rates, Robert loses the tax-free growth benefit of Roth accounts. Given his rising tax trajectory, Roth is superior.',
        commonMistake: 'Overlooking the power of tax-free growth for someone with decades until retirement.'
      }
    ]
  },
  {
    questionId: 'CFP-RET-005',
    domain: 'RET',
    distractors: [
      {
        option: 'A',
        text: 'Begin Social Security at 62',
        whyWrong: 'Claiming at 62 results in a 30% PERMANENT reduction (FRA of 67). With excellent health and longevity, delayed claiming provides higher lifetime benefits. The break-even is typically around age 80.',
        commonMistake: 'Taking Social Security early when longevity suggests delayed claiming is better.'
      },
      {
        option: 'B',
        text: 'Delay to 70 while spending savings',
        whyWrong: 'While delaying to 70 is generally good, depleting savings creates sequence risk. If market drops early in retirement while spending down assets, the portfolio may not recover.',
        commonMistake: 'Ignoring sequence of returns risk when planning Social Security timing.'
      },
      {
        option: 'C',
        text: 'Take lump sum if available',
        whyWrong: 'Social Security does not offer a true lump sum option. Some pensions do, but converting guaranteed lifetime income to lump sum eliminates longevity protection.',
        commonMistake: 'Confusing Social Security rules with pension options.'
      }
    ]
  },

  // ============================================
  // TAX PLANNING (TAX)
  // ============================================
  {
    questionId: 'CFP-TAX-001',
    domain: 'TAX',
    distractors: [
      {
        option: 'A',
        text: 'Take the standard deduction',
        whyWrong: 'With $18,000 in itemized deductions exceeding the standard deduction ($14,600 single), itemizing produces greater tax savings. Always compare itemized vs. standard.',
        commonMistake: 'Defaulting to standard deduction without comparing to actual itemized amounts.'
      },
      {
        option: 'B',
        text: 'Deduct mortgage interest only',
        whyWrong: 'Itemizing requires using Schedule A and claiming ALL allowable itemized deductions, not just mortgage interest. Cannot cherry-pick some itemized deductions.',
        commonMistake: 'Not understanding that itemizing is all-or-nothing—cannot combine with standard deduction.'
      },
      {
        option: 'D',
        text: 'Cannot itemize if married filing separately',
        whyWrong: 'MFS filers CAN itemize, but if one spouse itemizes, the other MUST also itemize (cannot mix). This increases after-tax cost of filing separately.',
        commonMistake: 'Confusing itemizing rules for MFS with complete prohibition.'
      }
    ]
  },
  {
    questionId: 'CFP-TAX-004',
    domain: 'TAX',
    distractors: [
      {
        option: 'A',
        text: 'Zero—donations to individuals are not deductible',
        whyWrong: 'While true that gifts to individuals are not deductible, the question mentions a QUALIFIED CHARITY. Donations to 501(c)(3) organizations ARE deductible.',
        commonMistake: 'Confusing charitable contributions (deductible) with gifts to individuals (not deductible).'
      },
      {
        option: 'B',
        text: 'Fair market value minus basis',
        whyWrong: 'For APPRECIATED property held more than one year donated to a PUBLIC charity, the deduction is FULL FMV, not FMV minus basis. Gain is never recognized.',
        commonMistake: 'Treating charitable donations like sales—donations of LTCG property avoid gain recognition entirely.'
      },
      {
        option: 'D',
        text: 'Limited to 20% of AGI',
        whyWrong: 'The 20% limit applies to appreciated property donated to PRIVATE FOUNDATIONS. Public charities allow 30% of AGI for appreciated property, 60% for cash.',
        commonMistake: 'Confusing public charity limits (30%) with private foundation limits (20%).'
      }
    ]
  },
  {
    questionId: 'CFP-TAX-006',
    domain: 'TAX',
    distractors: [
      {
        option: 'A',
        text: 'File amended returns for all prior years',
        whyWrong: 'Basis from capital losses carries forward indefinitely but you cannot amend prior returns to change capital gain treatment. Losses are used in the year incurred or carried forward.',
        commonMistake: 'Trying to retroactively apply tax benefits that only work prospectively.'
      },
      {
        option: 'B',
        text: 'Deduct full amount against ordinary income',
        whyWrong: 'Capital losses first offset capital gains. Only $3,000 per year can offset ORDINARY income. Excess carries forward to future years.',
        commonMistake: 'Not understanding the $3,000 ordinary income limit for capital losses.'
      },
      {
        option: 'C',
        text: 'Loss expires after 5 years',
        whyWrong: 'Capital loss carryforward has NO expiration—it carries forward indefinitely until used. Unlike NOLs which had limitations, capital losses persist.',
        commonMistake: 'Confusing capital loss rules with other carryforward provisions that do expire.'
      }
    ]
  },

  // ============================================
  // INVESTMENT (INV)
  // ============================================
  {
    questionId: 'CFP-INV-001',
    domain: 'INV',
    distractors: [
      {
        option: 'A',
        text: 'Beta of 1.5',
        whyWrong: 'Beta measures SYSTEMATIC (market) risk only. A concentrated position has significant UNSYSTEMATIC (company-specific) risk that beta does not capture.',
        commonMistake: 'Using beta to evaluate total risk when it only measures market risk.'
      },
      {
        option: 'C',
        text: 'High dividend yield',
        whyWrong: 'Dividend yield measures income, not risk. A stock can have high dividends and still be extremely risky. Yield does not indicate volatility or potential for loss.',
        commonMistake: 'Associating high dividends with safety—dividends can be cut and price can still fall.'
      },
      {
        option: 'D',
        text: 'Market capitalization',
        whyWrong: 'While smaller companies tend to be riskier, market cap alone does not quantify the risk of any individual position. Large companies can also be very volatile.',
        commonMistake: 'Using market cap as a proxy for risk without considering other factors.'
      }
    ]
  },
  {
    questionId: 'CFP-INV-003',
    domain: 'INV',
    distractors: [
      {
        option: 'A',
        text: 'Alpha—measures excess return',
        whyWrong: 'Alpha measures return relative to EXPECTED return based on risk (CAPM). It does not directly measure risk-adjusted performance like Sharpe, which uses actual risk in denominator.',
        commonMistake: 'Confusing alpha (excess return) with Sharpe (return per unit of risk).'
      },
      {
        option: 'B',
        text: 'Beta—measures volatility',
        whyWrong: 'Beta measures sensitivity to MARKET movements, not total volatility. Standard deviation measures total volatility. Beta is not a risk-adjusted performance measure.',
        commonMistake: 'Thinking beta is a performance measure—it is a risk measure only.'
      },
      {
        option: 'D',
        text: 'R-squared—measures correlation',
        whyWrong: 'R-squared measures how much of a portfolios movement is explained by the benchmark. It is a correlation measure, not a risk-adjusted performance measure.',
        commonMistake: 'Confusing statistical measures (R²) with performance measures (Sharpe, Treynor).'
      }
    ]
  },
  {
    questionId: 'CFP-INV-005',
    domain: 'INV',
    distractors: [
      {
        option: 'A',
        text: 'Increase stock allocation to maximize returns',
        whyWrong: 'At age 63, increasing equity allocation raises SEQUENCE OF RETURNS RISK. Poor early returns devastate portfolios when withdrawing. This is the opposite of prudent advice.',
        commonMistake: 'Focusing on returns without considering the devastating impact of sequence risk near retirement.'
      },
      {
        option: 'B',
        text: 'Move 100% to bonds for safety',
        whyWrong: 'Going all bonds eliminates growth needed to fund 30+ year retirement. Also exposes to INFLATION RISK and rising INTEREST RATE RISK. Balance is key.',
        commonMistake: 'Equating safety with zero equities—inflation is a major risk for retirees.'
      },
      {
        option: 'C',
        text: 'Ignore allocation until retirement date',
        whyWrong: 'The TRANSITION phase (5 years before/after retirement) is critical for reducing sequence risk. Waiting until the exact retirement date may be too late.',
        commonMistake: 'Not understanding the importance of the retirement transition zone for portfolio management.'
      }
    ]
  },

  // ============================================
  // RISK MANAGEMENT (RISK)
  // ============================================
  {
    questionId: 'CFP-RISK-001',
    domain: 'RISK',
    distractors: [
      {
        option: 'A',
        text: 'Term life insurance for 20 years',
        whyWrong: 'Term insurance expires at end of term. For PERMANENT needs like estate tax funding, income replacement for disabled child, or wealth transfer, permanent coverage is required.',
        commonMistake: 'Choosing term for permanent needs because of lower initial cost.'
      },
      {
        option: 'C',
        text: 'Variable life with aggressive allocation',
        whyWrong: 'Variable life exposes death benefit to market risk. For estate planning needs requiring a GUARANTEED death benefit, this unpredictability is inappropriate.',
        commonMistake: 'Selecting investment-oriented insurance when guaranteed death benefit is the priority.'
      },
      {
        option: 'D',
        text: 'Group life through employer',
        whyWrong: 'Group life is typically term insurance that ends at employment termination or retirement. Not suitable for permanent estate planning needs, and coverage may not be portable.',
        commonMistake: 'Relying on employer coverage for personal permanent insurance needs.'
      }
    ]
  },
  {
    questionId: 'CFP-RISK-003',
    domain: 'RISK',
    distractors: [
      {
        option: 'A',
        text: 'Own-occupation definition is too expensive',
        whyWrong: 'For a high-income specialist, own-occupation coverage is ESSENTIAL. A surgeon who cannot operate but can teach is still "disabled" under own-occupation. The cost is justified.',
        commonMistake: 'Sacrificing critical coverage features to save premium cost.'
      },
      {
        option: 'B',
        text: '180-day elimination period for lower premium',
        whyWrong: 'Longer elimination periods require more emergency reserves. For disability, 90-day elimination is typically optimal—balances premium savings with reasonable self-insurance period.',
        commonMistake: 'Choosing the longest elimination period without considering liquidity to cover it.'
      },
      {
        option: 'D',
        text: 'Any-occupation coverage is sufficient',
        whyWrong: 'Any-occupation means no benefits if client can work ANY job. A surgeon forced to work retail is NOT disabled under any-occupation. Unacceptable for high-income professionals.',
        commonMistake: 'Not understanding the dramatic difference between own-occ and any-occ definitions.'
      }
    ]
  },

  // ============================================  
  // ESTATE PLANNING (EST)
  // ============================================
  {
    questionId: 'CFP-EST-001',
    domain: 'EST',
    distractors: [
      {
        option: 'A',
        text: 'Gift $18,000 annually and do nothing else',
        whyWrong: 'With $20M estate and exemption at $13.61M, the excess $6.4M+ faces 40% tax (~$2.5M+). Annual gifting alone cannot transfer enough wealth before death to eliminate this.',
        commonMistake: 'Relying solely on annual exclusion gifts for high-net-worth estate planning.'
      },
      {
        option: 'B',
        text: 'Create revocable living trust',
        whyWrong: 'Revocable trusts avoid PROBATE but NOT estate tax. Assets in revocable trust are still included in taxable estate. Does not address the $6M+ exposure.',
        commonMistake: 'Confusing probate avoidance (revocable trust) with estate tax reduction (irrevocable strategies).'
      },
      {
        option: 'D',
        text: 'Transfer everything to spouse',
        whyWrong: 'Unlimited marital deduction defers, not eliminates, estate tax. When surviving spouse dies, combined assets still face tax. Also concentrates assets in one estate.',
        commonMistake: 'Thinking marital deduction eliminates estate tax—it only defers to second death.'
      }
    ]
  },
  {
    questionId: 'CFP-EST-003',
    domain: 'EST',
    distractors: [
      {
        option: 'A',
        text: 'Name the 17-year-old as direct beneficiary',
        whyWrong: 'Minors cannot legally manage inherited assets. Without trust, court will appoint guardian (expensive, public). Assets distributed outright at age 18 with no protection.',
        commonMistake: 'Naming minor children as direct beneficiaries without trust protection.'
      },
      {
        option: 'B',
        text: 'Leave assets to spouse for children',
        whyWrong: 'If spouse receives assets outright, they can remarry and divert assets to new spouse/children. Also exposes assets to spouses creditors and poor decisions.',
        commonMistake: 'Assuming surviving spouse will always act in childrens best interest with no legal requirement.'
      },
      {
        option: 'D',
        text: 'Use UTMA account for simplicity',
        whyWrong: 'UTMA terminates at age 18-21 (state dependent) with no restrictions. Cannot delay distributions, impose conditions, or protect from creditors like a trust can.',
        commonMistake: 'Choosing UTMA for convenience without considering its limitations for large amounts.'
      }
    ]
  },
  {
    questionId: 'CFP-EST-005',
    domain: 'EST',
    distractors: [
      {
        option: 'A',
        text: 'Gifts to spouse qualify for annual exclusion',
        whyWrong: 'WRONG FRAMING: Gifts to U.S. citizen spouse qualify for UNLIMITED MARITAL DEDUCTION, not the $18K annual exclusion. Non-citizen spouse: $185,000 limit applies.',
        commonMistake: 'Applying annual exclusion rules to spousal transfers when marital deduction applies.'
      },
      {
        option: 'C',
        text: 'All gifts must be reported on Form 709',
        whyWrong: 'Gifts within annual exclusion ($18K) do NOT require Form 709 (unless gift-splitting). Only gifts exceeding exclusion or using lifetime exemption require filing.',
        commonMistake: 'Over-reporting gifts within annual exclusion when no filing is required.'
      },
      {
        option: 'D',
        text: 'Tuition paid to grandchild is taxable gift',
        whyWrong: 'Payments DIRECTLY to educational institution for tuition are EXCLUDED from gift tax entirely. No limit. Must pay institution directly, not individual.',
        commonMistake: 'Not knowing the unlimited educational exclusion for direct tuition payments.'
      }
    ]
  },

  // ============================================
  // PROFESSIONAL CONDUCT (PRO)
  // ============================================
  {
    questionId: 'CFP-PRO-001',
    domain: 'PRO',
    distractors: [
      {
        option: 'A',
        text: 'Immediately recommend higher-commission products',
        whyWrong: 'Fiduciary duty requires acting in client best interest. Recommending products based on commission rather than suitability violates Duty of Loyalty and could result in decertification.',
        commonMistake: 'Putting compensation ahead of client interests—the core fiduciary violation.'
      },
      {
        option: 'B',
        text: 'Refuse to disclose compensation arrangement',
        whyWrong: 'CFP Standards require WRITTEN DISCLOSURE of all compensation, conflicts of interest, and how conflicts are managed. Refusal to disclose is a standards violation.',
        commonMistake: 'Thinking compensation disclosure is optional—it is mandatory under CFP Standards.'
      },
      {
        option: 'D',
        text: 'Proceed without documenting client meeting',
        whyWrong: 'Documentation is essential for compliance, client protection, and planner protection. CFP Standards require maintaining appropriate records of client interactions.',
        commonMistake: 'Failing to document, which leaves no evidence of proper process if questioned.'
      }
    ]
  },
  {
    questionId: 'CFP-PRO-003',
    domain: 'PRO',
    distractors: [
      {
        option: 'A',
        text: 'Disclose information only if subpoenaed',
        whyWrong: 'Proactive disclosure of suspected financial exploitation is permitted and may be REQUIRED to protect vulnerable adults. Waiting for subpoena may cause continued harm.',
        commonMistake: 'Being overly cautious about confidentiality when abuse exception applies.'
      },
      {
        option: 'B',
        text: 'Client information is always confidential',
        whyWrong: 'Confidentiality has EXCEPTIONS: legal requirement (subpoena), defense against client allegations, suspected financial abuse of vulnerable adults. Not absolute.',
        commonMistake: 'Treating confidentiality as absolute when specific exceptions exist in CFP Standards.'
      },
      {
        option: 'C',
        text: 'Report suspicions only to family members',
        whyWrong: 'Family members may BE the abusers. Reporting should be to appropriate authorities (Adult Protective Services, regulators). Telling family could endanger client.',
        commonMistake: 'Assuming family has clients best interest when they may be the problem.'
      }
    ]
  },
  {
    questionId: 'CFP-PRO-005',
    domain: 'PRO',
    distractors: [
      {
        option: 'A',
        text: 'Verbal disclosure is sufficient',
        whyWrong: 'CFP Standards explicitly require WRITTEN disclosure of material conflicts, compensation, and scope of engagement. Verbal only does not meet the standard.',
        commonMistake: 'Assuming verbal communication is sufficient when written disclosure is required.'
      },
      {
        option: 'B',
        text: 'Disclosure only required at engagement start',
        whyWrong: 'Disclosure must be UPDATED as circumstances change. New conflicts, compensation changes, or material facts require updated disclosure throughout relationship.',
        commonMistake: 'Treating disclosure as one-time rather than ongoing obligation.'
      },
      {
        option: 'D',
        text: 'Only SEC-registered advisors must disclose',
        whyWrong: 'ALL CFP professionals must disclose regardless of registration status. CFP Standards apply to everyone using the marks, whether at RIA, broker-dealer, or independent.',
        commonMistake: 'Confusing CFP Standards (applies to all CFPs) with SEC/FINRA regulations (registration-specific).'
      }
    ]
  }
];

// Helper function to get why wrong explanation for a question
export function getWhyWrong(questionId: string): WhyWrongExplanation | undefined {
  return WHY_WRONG_EXPLANATIONS.find(w => w.questionId === questionId);
}

// Helper to get all explanations for a domain
export function getWhyWrongByDomain(domain: string): WhyWrongExplanation[] {
  return WHY_WRONG_EXPLANATIONS.filter(w => w.domain === domain);
}

export default WHY_WRONG_EXPLANATIONS;
