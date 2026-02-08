/**
 * CFP Flashcards - Tax Planning Batch 2
 * 60 additional flashcards for Tax domain
 */

import { Flashcard } from './index';

export const CFP_FLASHCARDS_TAX_BATCH2: Flashcard[] = [
  {
    id: 'FC-TAX-011',
    domain: 'TAX',
    category: 'Filing Status',
    front: 'What are the FIVE tax filing statuses?',
    back: 'Filing Statuses:\n1. SINGLE - Unmarried\n2. MARRIED FILING JOINTLY - Combined return\n3. MARRIED FILING SEPARATELY - Individual returns\n4. HEAD OF HOUSEHOLD - Unmarried with qualifying person\n5. QUALIFYING SURVIVING SPOUSE - 2 years after spouse death with dependent',
    difficulty: 'easy',
    tags: ['filing', 'status', 'basics']
  },
  {
    id: 'FC-TAX-012',
    domain: 'TAX',
    category: 'Filing Status',
    front: 'What are HEAD OF HOUSEHOLD requirements?',
    back: 'Head of Household Requirements:\n• Unmarried (or considered unmarried)\n• Pay >50% household costs\n• Qualifying person lived with you >½ year\n• NOT a qualifying surviving spouse\n\nQualifying persons:\n• Qualifying child\n• Qualifying relative (certain)\n• Dependent parent (can live elsewhere)',
    difficulty: 'medium',
    tags: ['filing', 'hoh', 'requirements']
  },
  {
    id: 'FC-TAX-013',
    domain: 'TAX',
    category: 'Income',
    front: 'What is GROSS INCOME?',
    back: 'Gross Income: All income from whatever source derived\n\nIncludes:\n• Wages, salaries, tips\n• Interest and dividends\n• Business income\n• Capital gains\n• Rents, royalties\n• Alimony (pre-2019)\n• Retirement distributions\n• Gambling winnings\n\nExcludes: Gifts, inheritance, municipal bond interest',
    difficulty: 'easy',
    tags: ['income', 'gross', 'definition']
  },
  {
    id: 'FC-TAX-014',
    domain: 'TAX',
    category: 'Income',
    front: 'What is ADJUSTED GROSS INCOME (AGI)?',
    back: 'AGI = Gross Income - Above-the-Line Deductions\n\nAbove-the-Line (Part II of Schedule 1):\n• IRA contributions\n• Student loan interest\n• HSA contributions\n• Self-employment tax (½)\n• Self-employed health insurance\n• Alimony paid (pre-2019)\n• Moving expenses (military)',
    difficulty: 'medium',
    tags: ['agi', 'income', 'deductions']
  },
  {
    id: 'FC-TAX-015',
    domain: 'TAX',
    category: 'Deductions',
    front: 'What is the STANDARD DEDUCTION for 2024?',
    back: '2024 Standard Deduction:\n• Single: $14,600\n• MFJ: $29,200\n• MFS: $14,600\n• HOH: $21,900\n\nAdditional for 65+/blind:\n• Single/HOH: +$1,950 each\n• MFJ/MFS: +$1,550 each\n\nNote: Cannot take if itemizing',
    difficulty: 'easy',
    tags: ['deduction', 'standard', 'amounts']
  },
  {
    id: 'FC-TAX-016',
    domain: 'TAX',
    category: 'Deductions',
    front: 'What are the main ITEMIZED DEDUCTIONS?',
    back: 'Schedule A Itemized Deductions:\n• Medical/dental (>7.5% AGI)\n• State/local taxes (SALT $10K cap)\n• Mortgage interest ($750K limit)\n• Charitable contributions (60% AGI cash)\n• Casualty/theft losses (federally declared)\n\nNote: Misc deductions eliminated (TCJA)',
    difficulty: 'medium',
    tags: ['deduction', 'itemized', 'schedule-a']
  },
  {
    id: 'FC-TAX-017',
    domain: 'TAX',
    category: 'Deductions',
    front: 'What is the SALT deduction limit?',
    back: 'SALT (State and Local Tax) Deduction:\n• Maximum: $10,000 ($5,000 MFS)\n• Includes:\n  - State income OR sales tax\n  - Property taxes\n• TCJA change (2018-2025)\n• May revert after 2025\n• Big impact on high-tax states',
    difficulty: 'medium',
    tags: ['salt', 'deduction', 'limit']
  },
  {
    id: 'FC-TAX-018',
    domain: 'TAX',
    category: 'Deductions',
    front: 'What are CHARITABLE CONTRIBUTION limits?',
    back: 'Charitable Contribution Limits (% of AGI):\n• Cash to public charity: 60%\n• Appreciated property: 30%\n• Cash to private foundation: 30%\n• Appreciated to private: 20%\n\nCarryforward: 5 years\nMust itemize to deduct\nNeed documentation over $250',
    difficulty: 'hard',
    tags: ['charitable', 'deduction', 'limits']
  },
  {
    id: 'FC-TAX-019',
    domain: 'TAX',
    category: 'Credits',
    front: 'What is the CHILD TAX CREDIT for 2024?',
    back: 'Child Tax Credit 2024:\n• $2,000 per qualifying child under 17\n• Up to $1,600 refundable (ACTC)\n• Phaseout: $400K MFJ, $200K others\n• $500 credit for other dependents\n\nRequirements:\n• Under 17 at year-end\n• SSN required\n• Lived with taxpayer >½ year',
    difficulty: 'medium',
    tags: ['credit', 'child', 'refundable']
  },
  {
    id: 'FC-TAX-020',
    domain: 'TAX',
    category: 'Credits',
    front: 'What is the EARNED INCOME TAX CREDIT (EITC)?',
    back: 'EITC Features:\n• Refundable credit for low-income workers\n• Based on earned income and children\n• 2024 max: ~$7,830 (3+ children)\n• Phase-in, plateau, phase-out structure\n• Must have earned income\n• Investment income limit: $11,600\n• Filing threshold required',
    difficulty: 'medium',
    tags: ['eitc', 'credit', 'refundable']
  },
  {
    id: 'FC-TAX-021',
    domain: 'TAX',
    category: 'Credits',
    front: 'What is the CHILD AND DEPENDENT CARE CREDIT?',
    back: 'Dependent Care Credit:\n• For work-related child/dependent care\n• Expenses limit: $3,000 (1), $6,000 (2+)\n• Credit: 20-35% of expenses\n• Children under 13\n• Non-refundable\n• Reduced by FSA benefits\n• Both spouses must work (or student)',
    difficulty: 'medium',
    tags: ['credit', 'dependent-care', 'child']
  },
  {
    id: 'FC-TAX-022',
    domain: 'TAX',
    category: 'Capital Gains',
    front: 'What are LONG-TERM capital gain tax rates?',
    back: 'Long-Term Capital Gains (held >1 year):\n• 0%: Up to $47,025 single / $94,050 MFJ\n• 15%: $47,025-$518,900 single / $94,050-$583,750 MFJ\n• 20%: Above those thresholds\n\n• 25%: Unrecaptured Sec 1250 (depreciation)\n• 28%: Collectibles and QSBS',
    difficulty: 'medium',
    tags: ['capital-gains', 'rates', 'ltcg']
  },
  {
    id: 'FC-TAX-023',
    domain: 'TAX',
    category: 'Capital Gains',
    front: 'What is the NET INVESTMENT INCOME TAX (NIIT)?',
    back: 'NIIT (3.8% Surtax):\n• Applies to investment income\n• When MAGI exceeds:\n  - $250,000 MFJ\n  - $200,000 Single/HOH\n  - $125,000 MFS\n\nInvestment income includes:\n• Interest, dividends\n• Capital gains\n• Rental/royalty income\n• Passive business income',
    difficulty: 'hard',
    tags: ['niit', 'surtax', 'investment']
  },
  {
    id: 'FC-TAX-024',
    domain: 'TAX',
    category: 'Capital Gains',
    front: 'What is WASH SALE rule?',
    back: 'Wash Sale Rule:\n• Cannot deduct loss if:\n  - Buy substantially identical security\n  - Within 30 days before or after sale\n• Disallowed loss added to new basis\n• Holding period carries over\n• Applies to stocks, bonds, options\n• Does NOT apply to gains',
    difficulty: 'medium',
    tags: ['wash-sale', 'capital-loss', 'rule']
  },
  {
    id: 'FC-TAX-025',
    domain: 'TAX',
    category: 'Capital Gains',
    front: 'What is the capital loss LIMITATION?',
    back: 'Capital Loss Rules:\n• Offset capital gains first\n• Then up to $3,000 ordinary income ($1,500 MFS)\n• Excess carries forward indefinitely\n• Short-term losses offset ST gains first\n• Long-term losses offset LT gains first\n• Then net against each other',
    difficulty: 'medium',
    tags: ['capital-loss', 'limitation', 'carryforward']
  },
  {
    id: 'FC-TAX-026',
    domain: 'TAX',
    category: 'AMT',
    front: 'What is the ALTERNATIVE MINIMUM TAX (AMT)?',
    back: 'AMT:\n• Parallel tax system\n• Pay higher of regular tax or AMT\n• Add back certain deductions (SALT, misc)\n• Exempt amount phases out\n\n2024 Exemptions:\n• Single: $85,700 (phaseout at $609,350)\n• MFJ: $133,300 (phaseout at $1,218,700)\n\nRates: 26% / 28%',
    difficulty: 'hard',
    tags: ['amt', 'alternative', 'minimum']
  },
  {
    id: 'FC-TAX-027',
    domain: 'TAX',
    category: 'AMT',
    front: 'What items trigger AMT?',
    back: 'AMT Triggers (Add-backs):\n• State/local taxes (SALT)\n• Miscellaneous deductions (if any)\n• Interest on private activity bonds\n• Incentive stock option exercise (spread)\n• Accelerated depreciation\n• Certain passive losses\n• Standard deduction (not allowed)\n• Personal exemptions (not allowed)',
    difficulty: 'hard',
    tags: ['amt', 'triggers', 'preferences']
  },
  {
    id: 'FC-TAX-028',
    domain: 'TAX',
    category: 'Self-Employment',
    front: 'How is SELF-EMPLOYMENT TAX calculated?',
    back: 'Self-Employment Tax:\n• 15.3% on first $168,600 (2024)\n  - 12.4% Social Security\n  - 2.9% Medicare\n• 2.9% Medicare on all earnings above\n• 0.9% Additional Medicare over $200K/$250K\n\nCalculation:\n• Net SE income × 92.35% × rates\n• Deduct ½ SE tax above the line',
    difficulty: 'medium',
    tags: ['self-employment', 'tax', 'calculation']
  },
  {
    id: 'FC-TAX-029',
    domain: 'TAX',
    category: 'Self-Employment',
    front: 'What is the QBI DEDUCTION (Section 199A)?',
    back: 'Qualified Business Income Deduction:\n• Up to 20% of qualified business income\n• Pass-through entities, sole props, S-corps\n• Deduction = lesser of:\n  - 20% of QBI, OR\n  - 20% of taxable income (before QBI)\n\nLimitations for high earners:\n• W-2 wage limit\n• Specified service business (SSTB) limit',
    difficulty: 'hard',
    tags: ['qbi', '199a', 'deduction']
  },
  {
    id: 'FC-TAX-030',
    domain: 'TAX',
    category: 'Self-Employment',
    front: 'What is a SPECIFIED SERVICE TRADE OR BUSINESS (SSTB)?',
    back: 'SSTB (Limited QBI deduction):\n• Health, law, accounting\n• Actuarial, performing arts\n• Consulting, athletics, financial services\n• Brokerage services\n• Any business relying on reputation/skill\n\nExcluded from SSTB:\n• Engineering, architecture\n\nPhaseout: $191,950 single / $383,900 MFJ',
    difficulty: 'hard',
    tags: ['sstb', 'qbi', 'limitation']
  },
  {
    id: 'FC-TAX-031',
    domain: 'TAX',
    category: 'Business',
    front: 'What is SECTION 179 expensing?',
    back: 'Section 179 Deduction:\n• Immediate expense certain business property\n• 2024 limit: $1,220,000\n• Phaseout begins: $3,050,000\n• Applies to: Equipment, machinery, software, vehicles\n• Limited to business income\n• Excess carries forward\n• SUV limit: $30,500',
    difficulty: 'medium',
    tags: ['179', 'depreciation', 'expensing']
  },
  {
    id: 'FC-TAX-032',
    domain: 'TAX',
    category: 'Business',
    front: 'What is BONUS DEPRECIATION?',
    back: 'Bonus Depreciation:\n• Additional first-year depreciation\n• 2024: 60% (was 100% in 2022)\n• Phases down 20%/year through 2027\n• New and used property eligible\n• No income limit (unlike 179)\n• Can create/increase NOL\n• Certain property excluded',
    difficulty: 'medium',
    tags: ['bonus', 'depreciation', 'deduction']
  },
  {
    id: 'FC-TAX-033',
    domain: 'TAX',
    category: 'Passive Activity',
    front: 'What are PASSIVE ACTIVITY loss rules?',
    back: 'Passive Activity Rules (§469):\n• Passive losses only offset passive income\n• Cannot offset active or portfolio income\n• Suspended losses carry forward\n• Released at disposition\n\nPassive Activities:\n• Rentals (generally)\n• Limited partnerships\n• Business without material participation',
    difficulty: 'hard',
    tags: ['passive', 'losses', 'activity']
  },
  {
    id: 'FC-TAX-034',
    domain: 'TAX',
    category: 'Passive Activity',
    front: 'What is the $25,000 RENTAL REAL ESTATE exception?',
    back: 'Active Participation Exception:\n• Up to $25,000 rental loss deduction\n• Must actively participate\n• Own at least 10%\n• Phaseout: $100,000-$150,000 MAGI\n• Reduced $1 for every $2 over $100K\n• Eliminated at $150K MAGI\n\nReal estate professional exception: No passive limits',
    difficulty: 'hard',
    tags: ['rental', 'passive', 'exception']
  },
  {
    id: 'FC-TAX-035',
    domain: 'TAX',
    category: 'Estimated Taxes',
    front: 'What are ESTIMATED TAX payment rules?',
    back: 'Estimated Tax Requirements:\n• Pay if owing $1,000+ at filing\n• Due: April 15, June 15, Sept 15, Jan 15\n\nSafe Harbors (no penalty):\n• 90% of current year, OR\n• 100% of prior year (110% if AGI >$150K)\n\nPenalty calculated per quarter\nNo penalty if <$1,000 due',
    difficulty: 'medium',
    tags: ['estimated', 'payments', 'penalty']
  },
  {
    id: 'FC-TAX-036',
    domain: 'TAX',
    category: 'Basis',
    front: 'What is TAX BASIS and how is it calculated?',
    back: 'Tax Basis = Cost + Improvements - Depreciation\n\nBasis Sources:\n• Purchase: Cost + commissions\n• Gift: Generally donor\'s basis (carryover)\n• Inheritance: FMV at death (step-up)\n• Conversion: Lower of basis or FMV\n\nBasis reduces gain/increases loss on sale',
    difficulty: 'medium',
    tags: ['basis', 'cost', 'calculation']
  },
  {
    id: 'FC-TAX-037',
    domain: 'TAX',
    category: 'Basis',
    front: 'How does STEP-UP IN BASIS work?',
    back: 'Step-Up in Basis:\n• Inherited property: New basis = FMV at death\n• Prior capital gains erased\n• Can also step down if worth less\n\nCommunity Property:\n• Full step-up on both halves\n\nJoint Tenancy (non-CP):\n• Only decedent\'s half steps up',
    difficulty: 'medium',
    tags: ['basis', 'step-up', 'inheritance']
  },
  {
    id: 'FC-TAX-038',
    domain: 'TAX',
    category: 'Basis',
    front: 'What is GIFT TAX BASIS?',
    back: 'Gift Basis (Carryover Basis):\n\nIf FMV ≥ donor\'s basis:\n• Donee\'s basis = donor\'s basis\n• Add gift tax paid on appreciation\n\nIf FMV < donor\'s basis (loss property):\n• For gain: Use donor\'s basis\n• For loss: Use FMV at gift\n• No gain or loss if sell between',
    difficulty: 'hard',
    tags: ['basis', 'gift', 'carryover']
  },
  {
    id: 'FC-TAX-039',
    domain: 'TAX',
    category: 'Entity Selection',
    front: 'Compare C-CORP vs S-CORP taxation',
    back: 'C-CORPORATION:\n• Double taxation (corp level + dividends)\n• 21% flat corporate rate\n• Unlimited shareholders\n• Retain earnings\n\nS-CORPORATION:\n• Pass-through (no entity tax)\n• Income on K-1\n• Max 100 shareholders\n• One class of stock\n• Can reduce SE tax',
    difficulty: 'medium',
    tags: ['entity', 'c-corp', 's-corp']
  },
  {
    id: 'FC-TAX-040',
    domain: 'TAX',
    category: 'Entity Selection',
    front: 'What are the S-CORP requirements?',
    back: 'S-Corporation Requirements:\n• Domestic corporation\n• ≤100 shareholders\n• Only individuals, estates, certain trusts\n• One class of stock\n• All shareholders consent\n• Calendar year (generally)\n• No nonresident alien shareholders\n• File Form 2553 timely',
    difficulty: 'medium',
    tags: ['s-corp', 'requirements', 'eligibility']
  },
  {
    id: 'FC-TAX-041',
    domain: 'TAX',
    category: 'Entity Selection',
    front: 'How are PARTNERSHIPS taxed?',
    back: 'Partnership Taxation:\n• Pass-through entity\n• No entity-level tax\n• Income/loss on K-1\n• Partners pay SE tax on guaranteed payments\n• Outside basis (investment in partnership)\n• Special allocations allowed\n• Flexible distributions\n• General and limited partners',
    difficulty: 'medium',
    tags: ['partnership', 'pass-through', 'k-1']
  },
  {
    id: 'FC-TAX-042',
    domain: 'TAX',
    category: 'Entity Selection',
    front: 'What is an LLC\'s DEFAULT tax treatment?',
    back: 'LLC Default Tax Treatment:\n\nSingle-Member:\n• Disregarded (Schedule C)\n\nMulti-Member:\n• Partnership (Form 1065)\n\nCan elect:\n• S-corporation\n• C-corporation\n\nState law entity, federal tax flexibility',
    difficulty: 'medium',
    tags: ['llc', 'default', 'election']
  },
  {
    id: 'FC-TAX-043',
    domain: 'TAX',
    category: 'Gifts',
    front: 'What is the ANNUAL GIFT TAX EXCLUSION?',
    back: 'Annual Gift Tax Exclusion (2024):\n• $18,000 per donee\n• $36,000 if gift-splitting with spouse\n• Unlimited recipients\n• Present interest required\n• Excludes educational payments (direct)\n• Excludes medical payments (direct)\n• No gift tax return if under limit',
    difficulty: 'easy',
    tags: ['gift', 'exclusion', 'annual']
  },
  {
    id: 'FC-TAX-044',
    domain: 'TAX',
    category: 'Gifts',
    front: 'What is the LIFETIME GIFT TAX EXEMPTION?',
    back: 'Unified Credit (2024):\n• $13.61 million lifetime exemption\n• Applies to gifts and estate combined\n• Portability between spouses\n• Scheduled to sunset end of 2025\n• May revert to ~$6-7 million\n\nGift tax rate: 40% on taxable gifts',
    difficulty: 'medium',
    tags: ['gift', 'exemption', 'unified']
  },
  {
    id: 'FC-TAX-045',
    domain: 'TAX',
    category: 'Kiddie Tax',
    front: 'What is the KIDDIE TAX?',
    back: 'Kiddie Tax Rules (2024):\n• Applies to children under 19 (under 24 if student)\n• Unearned income over $2,600\n  - First $1,300: Tax-free\n  - Next $1,300: Child\'s rate\n  - Above: Parent\'s marginal rate\n• Prevents shifting income to children\n• Form 8615',
    difficulty: 'medium',
    tags: ['kiddie-tax', 'unearned', 'children']
  },
  {
    id: 'FC-TAX-046',
    domain: 'TAX',
    category: 'Investment',
    front: 'How are MUTUAL FUND distributions taxed?',
    back: 'Mutual Fund Taxation:\n\nDIVIDENDS:\n• Qualified: LTCG rates\n• Non-qualified: Ordinary rates\n\nCAPITAL GAINS:\n• Short-term: Ordinary rates\n• Long-term: LTCG rates\n\nNote: Taxed regardless of reinvestment\nBasis adjusted for reinvested distributions',
    difficulty: 'medium',
    tags: ['mutual-fund', 'distributions', 'taxation']
  },
  {
    id: 'FC-TAX-047',
    domain: 'TAX',
    category: 'Investment',
    front: 'What are QUALIFIED DIVIDENDS?',
    back: 'Qualified Dividends:\n• Taxed at LTCG rates (0%, 15%, 20%)\n\nRequirements:\n• Paid by US or qualified foreign corp\n• Holding period: 60+ days around ex-date\n• Not from preferred stock held <91 days\n\nNot Qualified:\n• REITs, money market, most foreign',
    difficulty: 'medium',
    tags: ['dividends', 'qualified', 'rates']
  },
  {
    id: 'FC-TAX-048',
    domain: 'TAX',
    category: 'Investment',
    front: 'How is BOND interest taxed?',
    back: 'Bond Interest Taxation:\n\nCORPORATE BONDS:\n• Fully taxable as ordinary income\n\nUS TREASURY:\n• Federal taxable\n• State tax-exempt\n\nMUNICIPAL BONDS:\n• Federal tax-exempt\n• State tax: Depends on where issued\n• May trigger AMT (private activity)',
    difficulty: 'medium',
    tags: ['bonds', 'interest', 'taxation']
  },
  {
    id: 'FC-TAX-049',
    domain: 'TAX',
    category: 'Investment',
    front: 'What is ORIGINAL ISSUE DISCOUNT (OID)?',
    back: 'Original Issue Discount:\n• Bond issued below face value\n• Difference = OID\n• Amortize OID as interest income annually\n• Phantom income (no cash received)\n• Increases basis each year\n• Report on Form 1099-OID\n\nExample: Zero-coupon bonds',
    difficulty: 'hard',
    tags: ['oid', 'bonds', 'phantom-income']
  },
  {
    id: 'FC-TAX-050',
    domain: 'TAX',
    category: 'Retirement',
    front: 'How are ROTH IRA distributions taxed?',
    back: 'Roth IRA Distribution Taxation:\n\nQUALIFIED (Tax-Free):\n• 5-year holding period met\n• Age 59½, death, disability, first home\n\nNON-QUALIFIED:\n• Contributions: Tax-free (already taxed)\n• Earnings: Taxable + 10% penalty\n\nOrdering: Contributions first, conversions, then earnings',
    difficulty: 'medium',
    tags: ['roth', 'distributions', 'qualified']
  },
  {
    id: 'FC-TAX-051',
    domain: 'TAX',
    category: 'Retirement',
    front: 'How are TRADITIONAL IRA distributions taxed?',
    back: 'Traditional IRA Distribution Taxation:\n\nFULLY DEDUCTIBLE CONTRIBUTIONS:\n• 100% taxable as ordinary income\n• 10% penalty if before 59½\n\nNON-DEDUCTIBLE CONTRIBUTIONS:\n• Pro-rata rule applies\n• Portion is return of basis (tax-free)\n• Remainder is taxable\n• Track on Form 8606',
    difficulty: 'medium',
    tags: ['traditional-ira', 'distributions', 'taxation']
  },
  {
    id: 'FC-TAX-052',
    domain: 'TAX',
    category: 'Property',
    front: 'What is a LIKE-KIND EXCHANGE (Section 1031)?',
    back: 'Section 1031 Exchange:\n• Defer gain on real property exchange\n• Must be held for business/investment\n• Both properties must be like-kind\n• 45 days to identify replacement\n• 180 days to close\n• Boot (cash/unlike) is taxable\n• Basis carries over (adjusted for boot)',
    difficulty: 'hard',
    tags: ['1031', 'exchange', 'deferral']
  },
  {
    id: 'FC-TAX-053',
    domain: 'TAX',
    category: 'Property',
    front: 'What is DEPRECIATION RECAPTURE?',
    back: 'Depreciation Recapture:\n\nSECTION 1245 (Personal Property):\n• All depreciation recaptured as ordinary income\n\nSECTION 1250 (Real Property):\n• Straight-line: 25% rate (unrecaptured 1250)\n• Excess over SL: Ordinary income\n\nRecapture up to amount of gain',
    difficulty: 'hard',
    tags: ['depreciation', 'recapture', '1245']
  },
  {
    id: 'FC-TAX-054',
    domain: 'TAX',
    category: 'Property',
    front: 'What is a QUALIFIED OPPORTUNITY ZONE (QOZ)?',
    back: 'Opportunity Zone Benefits:\n\n1. DEFERRAL: Defer capital gain invested in QOZ fund\n2. REDUCTION: 10% basis step-up after 5 years\n3. EXCLUSION: No tax on QOZ appreciation if held 10+ years\n\nMust invest within 180 days of gain\nGain recognized by 2026 or earlier sale',
    difficulty: 'hard',
    tags: ['qoz', 'opportunity-zone', 'deferral']
  },
  {
    id: 'FC-TAX-055',
    domain: 'TAX',
    category: 'Planning',
    front: 'What is TAX LOSS HARVESTING?',
    back: 'Tax Loss Harvesting:\n• Sell investments at loss\n• Offset capital gains\n• Up to $3,000 ordinary income\n• Reinvest in similar (not identical) securities\n• Avoid wash sale rule\n• Year-end strategy\n• Can increase long-term returns',
    difficulty: 'medium',
    tags: ['harvesting', 'loss', 'strategy']
  },
  {
    id: 'FC-TAX-056',
    domain: 'TAX',
    category: 'Planning',
    front: 'What is INCOME SHIFTING strategy?',
    back: 'Income Shifting Strategies:\n\nFAMILY:\n• Employ children (legitimate work)\n• Gift income-producing property\n• Family limited partnerships\n\nTIMING:\n• Defer income to lower bracket years\n• Accelerate deductions\n• Bunch charitable donations\n\nLimitations: Kiddie tax, assignment of income',
    difficulty: 'medium',
    tags: ['shifting', 'income', 'strategy']
  },
  {
    id: 'FC-TAX-057',
    domain: 'TAX',
    category: 'Planning',
    front: 'What is BUNCHING deductions strategy?',
    back: 'Bunching Strategy:\n• Concentrate deductions in alternate years\n• Itemize when >standard deduction\n• Standard deduction other years\n\nBest for:\n• Charitable contributions\n• Medical expenses (if near 7.5%)\n• State taxes (within $10K limit)\n\nUse Donor Advised Fund for charity',
    difficulty: 'medium',
    tags: ['bunching', 'deductions', 'strategy']
  },
  {
    id: 'FC-TAX-058',
    domain: 'TAX',
    category: 'Planning',
    front: 'What is a DONOR ADVISED FUND (DAF)?',
    back: 'Donor Advised Fund:\n• Irrevocable charitable contribution\n• Immediate tax deduction\n• Recommend grants over time\n• Investment growth tax-free\n• Name successor advisors\n• Lower minimums than foundation\n• Great for bunching strategy\n• FMV deduction for appreciated assets',
    difficulty: 'medium',
    tags: ['daf', 'charitable', 'planning']
  },
  {
    id: 'FC-TAX-059',
    domain: 'TAX',
    category: 'HSA',
    front: 'What are HSA contribution limits and tax benefits?',
    back: 'HSA (2024):\n\nContribution Limits:\n• Self: $4,150\n• Family: $8,300\n• Catch-up (55+): +$1,000\n\nTriple Tax Benefit:\n• Contributions: Tax-deductible\n• Growth: Tax-free\n• Withdrawals: Tax-free (qualified medical)\n\nRequires HDHP coverage',
    difficulty: 'medium',
    tags: ['hsa', 'contributions', 'benefits']
  },
  {
    id: 'FC-TAX-060',
    domain: 'TAX',
    category: 'Penalties',
    front: 'What are common TAX PENALTIES?',
    back: 'Tax Penalties:\n• Failure to file: 5%/month (max 25%)\n• Failure to pay: 0.5%/month (max 25%)\n• Accuracy: 20% of underpayment\n• Fraud: 75% of underpayment\n• Early withdrawal: 10% (retirement)\n• Estimated tax: Variable by quarter\n\nReasonable cause can abate some penalties',
    difficulty: 'medium',
    tags: ['penalties', 'failure', 'tax']
  },
  {
    id: 'FC-TAX-061',
    domain: 'TAX',
    category: 'Alimony',
    front: 'How is ALIMONY taxed (Pre and Post 2019)?',
    back: 'Alimony Taxation:\n\nPRE-2019 DIVORCES:\n• Deductible by payer\n• Taxable to recipient\n\nPOST-2018 DIVORCES:\n• NOT deductible\n• NOT taxable to recipient\n• Same as child support\n\nNote: Pre-2019 divorces can ELECT new rules',
    difficulty: 'medium',
    tags: ['alimony', 'divorce', 'taxation']
  },
  {
    id: 'FC-TAX-062',
    domain: 'TAX',
    category: 'Dependents',
    front: 'What are QUALIFYING CHILD requirements?',
    back: 'Qualifying Child Tests:\n• RELATIONSHIP: Child, step, foster, sibling\n• AGE: Under 19 (24 if student), or disabled\n• RESIDENCY: Same home >½ year\n• SUPPORT: Not provide >½ own support\n• JOINT RETURN: Cannot file joint (exception)\n\nTie-breaker rules if multiple claim',
    difficulty: 'medium',
    tags: ['dependent', 'child', 'requirements']
  },
  {
    id: 'FC-TAX-063',
    domain: 'TAX',
    category: 'Dependents',
    front: 'What are QUALIFYING RELATIVE requirements?',
    back: 'Qualifying Relative Tests:\n• NOT a qualifying child\n• MEMBER of household OR relationship\n• GROSS INCOME: <$5,050 (2024)\n• SUPPORT: You provide >½\n• NOT married filing jointly\n\nCan be any age\nRelatives: Parents, in-laws, aunts, uncles, etc.',
    difficulty: 'medium',
    tags: ['dependent', 'relative', 'requirements']
  },
  {
    id: 'FC-TAX-064',
    domain: 'TAX',
    category: 'Credits',
    front: 'What is the SAVER\'S CREDIT?',
    back: 'Retirement Savings Contributions Credit:\n• Credit for low-income retirement contributions\n• 10%, 20%, or 50% of contribution\n• Max contribution: $2,000 ($4,000 MFJ)\n• Max credit: $1,000 ($2,000 MFJ)\n• Non-refundable\n\n2024 AGI limits:\n• 50%: $23,000 single / $46,000 MFJ',
    difficulty: 'medium',
    tags: ['savers-credit', 'retirement', 'credit']
  },
  {
    id: 'FC-TAX-065',
    domain: 'TAX',
    category: 'Credits',
    front: 'What are energy-related TAX CREDITS?',
    back: 'Energy Tax Credits (2024):\n\nRESIDENTIAL CLEAN ENERGY:\n• 30% of solar, wind, geothermal, battery\n• No cap, through 2032\n\nENERGY EFFICIENT HOME:\n• Up to $1,200/year\n• Windows, doors, insulation, HVAC\n\nELECTRIC VEHICLE:\n• Up to $7,500 new\n• Up to $4,000 used',
    difficulty: 'medium',
    tags: ['energy', 'credits', 'residential']
  },
  {
    id: 'FC-TAX-066',
    domain: 'TAX',
    category: 'Real Estate',
    front: 'What is a REAL ESTATE PROFESSIONAL for tax purposes?',
    back: 'Real Estate Professional Status:\n• >750 hours in real property trades\n• >50% of personal services\n• Material participation in each activity\n\nBenefits:\n• Rental losses not passive\n• Can offset ordinary income\n• No $25K limitation\n• Both spouses need not qualify',
    difficulty: 'hard',
    tags: ['real-estate', 'professional', 'passive']
  },
  {
    id: 'FC-TAX-067',
    domain: 'TAX',
    category: 'Stock Options',
    front: 'How are INCENTIVE STOCK OPTIONS (ISOs) taxed?',
    back: 'ISO Taxation:\n\nAt EXERCISE:\n• No regular tax (if hold)\n• AMT: Spread is AMT income\n\nAt SALE (Qualifying Disposition):\n• All gain is LTCG\n• Must hold 2 years from grant, 1 year from exercise\n\nDisqualifying Disposition:\n• Spread at exercise = ordinary income\n• Additional gain = capital',
    difficulty: 'hard',
    tags: ['iso', 'options', 'taxation']
  },
  {
    id: 'FC-TAX-068',
    domain: 'TAX',
    category: 'Stock Options',
    front: 'How are NON-QUALIFIED STOCK OPTIONS (NQSOs) taxed?',
    back: 'NQSO Taxation:\n\nAt EXERCISE:\n• Ordinary income = FMV - Strike price\n• Subject to withholding\n• Employer deduction\n\nAt SALE:\n• Basis = FMV at exercise\n• Gain/loss is capital\n• ST or LT based on holding period\n\nNo AMT issues',
    difficulty: 'hard',
    tags: ['nqso', 'options', 'taxation']
  },
  {
    id: 'FC-TAX-069',
    domain: 'TAX',
    category: 'Employee Benefits',
    front: 'What employee benefits are TAX-FREE?',
    back: 'Tax-Free Employee Benefits:\n• Employer health insurance premiums\n• HSA contributions (employer)\n• Life insurance (up to $50K)\n• Dependent care (up to $5K FSA)\n• Adoption assistance\n• Educational assistance ($5,250)\n• Qualified transportation ($315/month)\n• Employee discounts\n• De minimis fringe',
    difficulty: 'medium',
    tags: ['benefits', 'fringe', 'tax-free']
  },
  {
    id: 'FC-TAX-070',
    domain: 'TAX',
    category: 'Planning',
    front: 'What is the NETTING process for capital gains and losses?',
    back: 'Capital Gain/Loss Netting:\n\n1. Net ST gains vs ST losses\n2. Net LT gains vs LT losses\n3. Net ST vs LT\n\nResults:\n• Net ST gain: Ordinary rates\n• Net LT gain: Preferential rates\n• Net loss: Deduct $3,000, carry forward\n\nUse losses against highest-taxed gains first',
    difficulty: 'hard',
    tags: ['capital-gains', 'netting', 'process']
  },
];
