/**
 * CFP Flashcards - General Principles Batch 2
 * 60 additional flashcards for General Principles domain
 */

import { Flashcard } from './index';

export const CFP_FLASHCARDS_GEN_BATCH2: Flashcard[] = [
  {
    id: 'FC-GEN-011',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'What is the formula for PRESENT VALUE of a lump sum?',
    back: 'PV = FV / (1 + r)^n\n\nWhere:\n• FV = Future Value\n• r = Interest rate per period\n• n = Number of periods',
    difficulty: 'easy',
    tags: ['TVM', 'formula', 'calculator']
  },
  {
    id: 'FC-GEN-012',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'What is the formula for FUTURE VALUE of a lump sum?',
    back: 'FV = PV × (1 + r)^n\n\nWhere:\n• PV = Present Value\n• r = Interest rate per period\n• n = Number of periods',
    difficulty: 'easy',
    tags: ['TVM', 'formula', 'calculator']
  },
  {
    id: 'FC-GEN-013',
    domain: 'GEN',
    category: 'Financial Statements',
    front: 'What is NET WORTH and how is it calculated?',
    back: 'Net Worth = Total Assets - Total Liabilities\n\nAlso called:\n• Owner\'s Equity\n• Wealth\n• Financial Position',
    difficulty: 'easy',
    tags: ['statements', 'balance-sheet', 'calculation']
  },
  {
    id: 'FC-GEN-014',
    domain: 'GEN',
    category: 'Financial Statements',
    front: 'What is the formula for SAVINGS RATE?',
    back: 'Savings Rate = Annual Savings ÷ Gross Income\n\nRecommended: 10-15% minimum\n\nIncludes: 401(k), IRA, taxable savings',
    difficulty: 'easy',
    tags: ['ratio', 'savings', 'planning']
  },
  {
    id: 'FC-GEN-015',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'How do you calculate REAL RATE OF RETURN?',
    back: 'Approximate: Real Rate ≈ Nominal Rate - Inflation\n\nExact: (1 + Nominal) ÷ (1 + Inflation) - 1\n\nExample: 8% nominal, 3% inflation\nExact: (1.08/1.03) - 1 = 4.85%',
    difficulty: 'medium',
    tags: ['TVM', 'inflation', 'return']
  },
  {
    id: 'FC-GEN-016',
    domain: 'GEN',
    category: 'Economics',
    front: 'What are the Federal Reserve\'s PRIMARY TOOLS?',
    back: '1. OPEN MARKET OPERATIONS (most used)\n   - Buy bonds = increase money supply\n   - Sell bonds = decrease money supply\n\n2. DISCOUNT RATE\n   - Rate charged to banks\n\n3. RESERVE REQUIREMENTS\n   - % banks must hold',
    difficulty: 'medium',
    tags: ['economics', 'fed', 'policy']
  },
  {
    id: 'FC-GEN-017',
    domain: 'GEN',
    category: 'Economics',
    front: 'What are LEADING, LAGGING, and COINCIDENT indicators?',
    back: 'LEADING (predict future):\n• Building permits, stock prices, money supply\n\nCOINCIDENT (current state):\n• GDP, employment, industrial production\n\nLAGGING (confirm trends):\n• Unemployment rate, CPI, prime rate',
    difficulty: 'hard',
    tags: ['economics', 'indicators', 'analysis']
  },
  {
    id: 'FC-GEN-018',
    domain: 'GEN',
    category: 'Financial Planning',
    front: 'What is the FIDUCIARY standard for CFP professionals?',
    back: 'CFP® professionals must:\n• Act in client\'s BEST INTEREST\n• Exercise DUTY OF CARE\n• Disclose and manage CONFLICTS\n• Provide FULL DISCLOSURE\n• Act with INTEGRITY and objectivity\n\nApplies to ALL financial planning services',
    difficulty: 'medium',
    tags: ['ethics', 'standards', 'fiduciary']
  },
  {
    id: 'FC-GEN-019',
    domain: 'GEN',
    category: 'Financial Planning',
    front: 'What are the MATERIAL CONFLICTS of interest CFPs must disclose?',
    back: 'Must disclose:\n• Compensation arrangements\n• Referral fees\n• Incentives from third parties\n• Ownership interests\n• Relationships with entities\n• Any bias in recommendations',
    difficulty: 'medium',
    tags: ['ethics', 'disclosure', 'conflicts']
  },
  {
    id: 'FC-GEN-020',
    domain: 'GEN',
    category: 'Education Planning',
    front: 'What is a COVERDELL ESA and its key features?',
    back: 'Coverdell Education Savings Account:\n• $2,000/year contribution limit\n• Income limits apply\n• Tax-free qualified withdrawals\n• K-12 and higher education expenses\n• Must use by age 30\n• Beneficiary can be changed',
    difficulty: 'medium',
    tags: ['education', 'coverdell', 'savings']
  },
  {
    id: 'FC-GEN-021',
    domain: 'GEN',
    category: 'Education Planning',
    front: 'Compare 529 plan vs Coverdell ESA',
    back: '529 PLAN:\n• Higher/no limits\n• Higher ed + K-12 tuition\n• No income limits\n• Age 30 for Roth rollover\n\nCOVERDELL:\n• $2,000/year limit\n• K-12 all expenses\n• Income limits\n• Use by age 30',
    difficulty: 'hard',
    tags: ['education', '529', 'coverdell', 'comparison']
  },
  {
    id: 'FC-GEN-022',
    domain: 'GEN',
    category: 'Education Tax Credits',
    front: 'What is the AMERICAN OPPORTUNITY TAX CREDIT (AOTC)?',
    back: 'AOTC Features:\n• Up to $2,500/student\n• 100% of first $2,000 + 25% of next $2,000\n• First 4 years of higher ed only\n• 40% refundable ($1,000 max)\n• Income phaseouts apply\n• No felony drug conviction',
    difficulty: 'medium',
    tags: ['education', 'credit', 'tax']
  },
  {
    id: 'FC-GEN-023',
    domain: 'GEN',
    category: 'Education Tax Credits',
    front: 'What is the LIFETIME LEARNING CREDIT?',
    back: 'LLC Features:\n• Up to $2,000/return\n• 20% of first $10,000\n• No year limit\n• NOT refundable\n• Any post-secondary education\n• Skills development courses OK\n• Income phaseouts apply',
    difficulty: 'medium',
    tags: ['education', 'credit', 'tax']
  },
  {
    id: 'FC-GEN-024',
    domain: 'GEN',
    category: 'Client Communication',
    front: 'What are the components of ACTIVE LISTENING?',
    back: '• Face client, maintain eye contact\n• Avoid interrupting\n• Ask clarifying questions\n• Paraphrase to confirm understanding\n• Notice nonverbal cues\n• Summarize key points\n• Show empathy',
    difficulty: 'easy',
    tags: ['communication', 'skills', 'practice']
  },
  {
    id: 'FC-GEN-025',
    domain: 'GEN',
    category: 'Behavioral Finance',
    front: 'What is MENTAL ACCOUNTING?',
    back: 'Mental Accounting: Treating money differently based on source or intended use.\n\nExamples:\n• Tax refund = "fun money"\n• Inheritance = special investments\n• Separate buckets for different goals\n\nCan lead to suboptimal decisions',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'psychology']
  },
  {
    id: 'FC-GEN-026',
    domain: 'GEN',
    category: 'Behavioral Finance',
    front: 'What is CONFIRMATION BIAS?',
    back: 'Confirmation Bias: Seeking information that confirms existing beliefs while ignoring contradicting evidence.\n\nIn investing:\n• Only reading bullish news on owned stocks\n• Dismissing negative analyst reports\n• Overconfidence in decisions',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'psychology']
  },
  {
    id: 'FC-GEN-027',
    domain: 'GEN',
    category: 'Behavioral Finance',
    front: 'What is LOSS AVERSION?',
    back: 'Loss Aversion: Losses hurt about 2x more than equivalent gains feel good.\n\nConsequences:\n• Holding losers too long\n• Selling winners too early\n• Avoiding beneficial risks\n• Reference point dependence',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'prospect-theory']
  },
  {
    id: 'FC-GEN-028',
    domain: 'GEN',
    category: 'Behavioral Finance',
    front: 'What is ANCHORING bias?',
    back: 'Anchoring: Over-relying on initial information when making decisions.\n\nExamples:\n• Fixating on purchase price\n• Initial offer in negotiations\n• First number heard sets expectations\n\nCombat: Use multiple reference points',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'psychology']
  },
  {
    id: 'FC-GEN-029',
    domain: 'GEN',
    category: 'Behavioral Finance',
    front: 'What is RECENCY BIAS?',
    back: 'Recency Bias: Overweighting recent events vs long-term trends.\n\nExamples:\n• Chasing recent performance\n• Expecting markets to continue current trend\n• Forgetting historical cycles\n\nCombat: Focus on long-term data',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'psychology']
  },
  {
    id: 'FC-GEN-030',
    domain: 'GEN',
    category: 'Financial Ratios',
    front: 'What is the DEBT-TO-ASSET ratio?',
    back: 'Debt-to-Asset = Total Debt ÷ Total Assets\n\nInterpretation:\n• Lower is better\n• <50% = conservative\n• >80% = concerning leverage\n\nShows portion of assets funded by debt',
    difficulty: 'easy',
    tags: ['ratio', 'debt', 'analysis']
  },
  {
    id: 'FC-GEN-031',
    domain: 'GEN',
    category: 'Financial Ratios',
    front: 'What is the CURRENT RATIO and what does it measure?',
    back: 'Current Ratio = Current Assets ÷ Current Liabilities\n\nMeasures: Ability to pay short-term obligations\n\n• >1.0 = Can cover current debts\n• <1.0 = Liquidity concern\n• Too high = inefficient use of assets',
    difficulty: 'easy',
    tags: ['ratio', 'liquidity', 'analysis']
  },
  {
    id: 'FC-GEN-032',
    domain: 'GEN',
    category: 'Economics',
    front: 'What is the BUSINESS CYCLE and its phases?',
    back: 'Business Cycle Phases:\n\n1. EXPANSION - GDP growing\n2. PEAK - Max growth\n3. CONTRACTION/RECESSION - Declining\n4. TROUGH - Bottom\n\nRecession = 2+ quarters negative GDP',
    difficulty: 'medium',
    tags: ['economics', 'cycle', 'macro']
  },
  {
    id: 'FC-GEN-033',
    domain: 'GEN',
    category: 'Economics',
    front: 'What is YIELD CURVE and what do shapes indicate?',
    back: 'Yield Curve: Plot of bond yields vs maturity\n\nNORMAL (upward): Economy healthy\nFLAT: Transition/uncertainty\nINVERTED: Recession warning\nHUMPED: Mid-term uncertainty\n\nLong rates normally > short rates',
    difficulty: 'hard',
    tags: ['economics', 'bonds', 'indicators']
  },
  {
    id: 'FC-GEN-034',
    domain: 'GEN',
    category: 'Client Psychology',
    front: 'What are MASLOW\'s hierarchy of needs?',
    back: 'From base to top:\n1. PHYSIOLOGICAL - Food, shelter\n2. SAFETY - Security, stability\n3. BELONGING - Love, community\n4. ESTEEM - Achievement, respect\n5. SELF-ACTUALIZATION - Purpose\n\nLower needs must be met first',
    difficulty: 'medium',
    tags: ['psychology', 'needs', 'motivation']
  },
  {
    id: 'FC-GEN-035',
    domain: 'GEN',
    category: 'Education Planning',
    front: 'What are UGMA/UTMA accounts?',
    back: 'Uniform Gifts/Transfers to Minors:\n• Custodial account for minors\n• Irrevocable gift\n• First $1,300 unearned income tax-free\n• Next $1,300 at child\'s rate\n• Above $2,600 at parent\'s rate (kiddie tax)\n• UTMA can hold real estate\n• Control transfers at 18-21',
    difficulty: 'medium',
    tags: ['education', 'gifts', 'custodial']
  },
  {
    id: 'FC-GEN-036',
    domain: 'GEN',
    category: 'Student Loans',
    front: 'What are the main FEDERAL STUDENT LOAN repayment plans?',
    back: 'Repayment Plans:\n• STANDARD - 10 years fixed\n• GRADUATED - Starts low, increases\n• EXTENDED - Up to 25 years\n• INCOME-DRIVEN (IBR, PAYE, SAVE)\n  - 10-25 years\n  - % of discretionary income\n  - Forgiveness at end',
    difficulty: 'medium',
    tags: ['education', 'loans', 'repayment']
  },
  {
    id: 'FC-GEN-037',
    domain: 'GEN',
    category: 'Student Loans',
    front: 'What is PUBLIC SERVICE LOAN FORGIVENESS (PSLF)?',
    back: 'PSLF Requirements:\n• 120 qualifying payments\n• While working full-time public service\n• Direct loans only\n• Income-driven repayment plan\n• Tax-free forgiveness\n• 10 years of payments',
    difficulty: 'medium',
    tags: ['education', 'loans', 'forgiveness']
  },
  {
    id: 'FC-GEN-038',
    domain: 'GEN',
    category: 'Housing',
    front: 'What are closing costs for homebuyers?',
    back: 'Typical Closing Costs (2-5% of purchase):\n• Appraisal fee\n• Title insurance\n• Attorney fees\n• Recording fees\n• Origination/points\n• Prepaid interest\n• Escrow deposits (taxes/insurance)\n• Home inspection',
    difficulty: 'medium',
    tags: ['housing', 'mortgage', 'costs']
  },
  {
    id: 'FC-GEN-039',
    domain: 'GEN',
    category: 'Housing',
    front: 'What is PMI and when is it required?',
    back: 'PMI = Private Mortgage Insurance\n\nRequired when:\n• Down payment <20%\n• Conventional loan\n\nRemoval:\n• Automatic at 78% LTV\n• Request at 80% LTV\n• Refinance when equity sufficient\n\nFHA: MIP cannot be removed',
    difficulty: 'medium',
    tags: ['housing', 'mortgage', 'insurance']
  },
  {
    id: 'FC-GEN-040',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'What is SERIAL PAYMENT calculation?',
    back: 'Serial Payment: When payment increases each year (often by inflation)\n\nUse real rate of return:\nReal rate = [(1+nominal)/(1+inflation)] - 1\n\nExample: 8% return, 3% inflation\nReal rate = (1.08/1.03) - 1 = 4.85%\n\nThen solve for PMT using real rate',
    difficulty: 'hard',
    tags: ['TVM', 'calculator', 'inflation']
  },
  {
    id: 'FC-GEN-041',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'What is UNEVEN CASH FLOW calculation?',
    back: 'Uneven Cash Flows:\n• Use CF register on calculator\n• Enter CF0 (usually negative investment)\n• Enter each CF with frequency\n• Compute NPV at given rate\n• Or compute IRR\n\nUsed for: Projects, investment analysis',
    difficulty: 'hard',
    tags: ['TVM', 'calculator', 'npv']
  },
  {
    id: 'FC-GEN-042',
    domain: 'GEN',
    category: 'Financial Statements',
    front: 'What is included on a PERSONAL BALANCE SHEET?',
    back: 'ASSETS:\n• Liquid (cash, checking, savings)\n• Investment (stocks, bonds, retirement)\n• Use (home, vehicles, personal property)\n\nLIABILITIES:\n• Short-term (credit cards, bills)\n• Long-term (mortgage, student loans)\n\nNET WORTH = Assets - Liabilities',
    difficulty: 'easy',
    tags: ['statements', 'balance-sheet', 'planning']
  },
  {
    id: 'FC-GEN-043',
    domain: 'GEN',
    category: 'Financial Statements',
    front: 'What is a PERSONAL CASH FLOW STATEMENT?',
    back: 'Cash Flow Statement shows:\n\nINCOME:\n• Salary, wages\n• Interest, dividends\n• Other income\n\nEXPENSES:\n• Fixed (rent, insurance)\n• Variable (food, entertainment)\n\nNET CASH FLOW = Income - Expenses',
    difficulty: 'easy',
    tags: ['statements', 'cash-flow', 'planning']
  },
  {
    id: 'FC-GEN-044',
    domain: 'GEN',
    category: 'Credit',
    front: 'What factors comprise a FICO CREDIT SCORE?',
    back: 'FICO Score Components:\n• Payment History: 35%\n• Amounts Owed: 30%\n• Length of Credit: 15%\n• Credit Mix: 10%\n• New Credit: 10%\n\nRange: 300-850\nGood: 670+, Excellent: 800+',
    difficulty: 'medium',
    tags: ['credit', 'score', 'planning']
  },
  {
    id: 'FC-GEN-045',
    domain: 'GEN',
    category: 'Types of Income',
    front: 'What are the THREE types of income for tax purposes?',
    back: '1. ORDINARY INCOME\n   • Wages, interest, IRA distributions\n   • Taxed at marginal rates\n\n2. PORTFOLIO INCOME\n   • Long-term capital gains, qualified dividends\n   • Lower rates (0%, 15%, 20%)\n\n3. PASSIVE INCOME\n   • Rental, limited partnerships\n   • Special loss rules',
    difficulty: 'medium',
    tags: ['tax', 'income', 'categories']
  },
  {
    id: 'FC-GEN-046',
    domain: 'GEN',
    category: 'Financial Planning',
    front: 'What is DOLLAR COST AVERAGING?',
    back: 'Dollar Cost Averaging:\n• Invest fixed amount regularly\n• Buy more shares when prices low\n• Buy fewer shares when prices high\n• Reduces average cost per share\n• Eliminates market timing\n• Good for systematic investing',
    difficulty: 'easy',
    tags: ['investing', 'strategy', 'systematic']
  },
  {
    id: 'FC-GEN-047',
    domain: 'GEN',
    category: 'Financial Planning',
    front: 'What is the difference between SYSTEMATIC and UNSYSTEMATIC risk?',
    back: 'SYSTEMATIC (Market) Risk:\n• Affects entire market\n• Cannot be diversified away\n• Examples: Inflation, recession, interest rates\n• Measured by beta\n\nUNSYSTEMATIC (Specific) Risk:\n• Company/industry specific\n• CAN be diversified away\n• Examples: Management, competition',
    difficulty: 'medium',
    tags: ['risk', 'investment', 'diversification']
  },
  {
    id: 'FC-GEN-048',
    domain: 'GEN',
    category: 'Behavioral Finance',
    front: 'What is OVERCONFIDENCE bias?',
    back: 'Overconfidence Bias:\n• Overestimate abilities/knowledge\n• Trade too frequently\n• Take on too much risk\n• Ignore contrary evidence\n\nManifests as:\n• Excessive trading\n• Concentrated positions\n• Unrealistic return expectations',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'psychology']
  },
  {
    id: 'FC-GEN-049',
    domain: 'GEN',
    category: 'Behavioral Finance',
    front: 'What is HERDING behavior?',
    back: 'Herding: Following the crowd in investment decisions.\n\nExamples:\n• Buying during market bubbles\n• Panic selling in crashes\n• Following trends without analysis\n\nConsequences:\n• Buy high, sell low\n• Miss contrarian opportunities',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'psychology']
  },
  {
    id: 'FC-GEN-050',
    domain: 'GEN',
    category: 'Behavioral Finance',
    front: 'What is FRAMING effect?',
    back: 'Framing Effect: Decisions affected by how choices are presented.\n\nExamples:\n• "90% success rate" vs "10% failure"\n• "Save $100" vs "Avoid $100 loss"\n• Positive vs negative presentation\n\nSame info, different reactions',
    difficulty: 'medium',
    tags: ['behavioral', 'bias', 'psychology']
  },
  {
    id: 'FC-GEN-051',
    domain: 'GEN',
    category: 'Ethics',
    front: 'What are the CFP Board\'s DUTIES to CLIENTS?',
    back: 'Duties to Clients:\n1. Fiduciary duty\n2. Integrity\n3. Competence\n4. Diligence\n5. Disclose and manage conflicts\n6. Sound judgment\n7. Professionalism\n8. Comply with law\n9. Confidentiality',
    difficulty: 'medium',
    tags: ['ethics', 'standards', 'duties']
  },
  {
    id: 'FC-GEN-052',
    domain: 'GEN',
    category: 'Ethics',
    front: 'When can a CFP® disclose CONFIDENTIAL information?',
    back: 'Disclosure permitted when:\n• Client consents\n• Required by law\n• Defend against charges\n• In compliance with CFP Board\n• Civil dispute with client\n\nMust protect info otherwise',
    difficulty: 'medium',
    tags: ['ethics', 'confidentiality', 'disclosure']
  },
  {
    id: 'FC-GEN-053',
    domain: 'GEN',
    category: 'Documentation',
    front: 'What records must CFPs MAINTAIN?',
    back: 'Required Documentation:\n• Client agreements\n• Financial planning analysis\n• Recommendations made\n• Products implemented\n• Correspondence/notes\n• Disclosures provided\n\nRetention: Per firm/regulatory requirements',
    difficulty: 'medium',
    tags: ['ethics', 'documentation', 'records']
  },
  {
    id: 'FC-GEN-054',
    domain: 'GEN',
    category: 'Interest Rates',
    front: 'What is the difference between NOMINAL and EFFECTIVE interest rates?',
    back: 'NOMINAL (Stated) Rate:\n• Annual rate as quoted\n• Does not account for compounding\n\nEFFECTIVE (APY) Rate:\n• True rate with compounding\n• EAR = (1 + r/n)^n - 1\n\nMore frequent compounding = higher effective rate',
    difficulty: 'hard',
    tags: ['TVM', 'interest', 'compounding']
  },
  {
    id: 'FC-GEN-055',
    domain: 'GEN',
    category: 'Interest Rates',
    front: 'What are the TYPES OF INTEREST calculations?',
    back: 'SIMPLE INTEREST:\nI = P × r × t\n\nCOMPOUND INTEREST:\nFV = P(1 + r)^n\n\nKey difference:\n• Simple: Interest on principal only\n• Compound: Interest on interest',
    difficulty: 'easy',
    tags: ['TVM', 'interest', 'calculation']
  },
  {
    id: 'FC-GEN-056',
    domain: 'GEN',
    category: 'Financial Planning',
    front: 'What are the KEY RATIOS for personal financial health?',
    back: 'Key Personal Ratios:\n• Emergency Fund: 3-6 months expenses\n• Savings Rate: 10-15% minimum\n• Housing: ≤28% gross income\n• Total Debt: ≤36% gross income\n• Net Worth: Growing over time\n• Debt-to-Asset: <50%',
    difficulty: 'medium',
    tags: ['ratio', 'planning', 'benchmarks']
  },
  {
    id: 'FC-GEN-057',
    domain: 'GEN',
    category: 'Goal Setting',
    front: 'What makes a financial goal SMART?',
    back: 'SMART Goals:\n• Specific - Clear and defined\n• Measurable - Quantifiable\n• Achievable - Realistic\n• Relevant - Aligned with values\n• Time-bound - Deadline set\n\nExample: "Save $50,000 for down payment in 3 years"',
    difficulty: 'easy',
    tags: ['planning', 'goals', 'process']
  },
  {
    id: 'FC-GEN-058',
    domain: 'GEN',
    category: 'Emergency Funds',
    front: 'Where should EMERGENCY FUNDS be held?',
    back: 'Emergency Fund Locations:\n• High-yield savings account\n• Money market account\n• Short-term CDs (laddered)\n• Treasury bills\n\nPriorities:\n• Safety of principal\n• Liquidity\n• Modest return\n• NO market risk',
    difficulty: 'easy',
    tags: ['liquidity', 'emergency', 'savings']
  },
  {
    id: 'FC-GEN-059',
    domain: 'GEN',
    category: 'Debt Management',
    front: 'Compare DEBT AVALANCHE vs DEBT SNOWBALL methods',
    back: 'DEBT AVALANCHE:\n• Pay highest interest first\n• Mathematically optimal\n• Saves most money\n\nDEBT SNOWBALL:\n• Pay smallest balance first\n• Psychological wins\n• Builds momentum\n\nBoth: Make minimum on all, extra on target',
    difficulty: 'medium',
    tags: ['debt', 'strategy', 'psychology']
  },
  {
    id: 'FC-GEN-060',
    domain: 'GEN',
    category: 'Home Ownership',
    front: 'What are the TAX BENEFITS of home ownership?',
    back: 'Home Tax Benefits:\n• Mortgage interest deduction (up to $750K)\n• State/local property tax (up to $10K SALT)\n• Capital gains exclusion ($250K/$500K)\n• Home office deduction (if qualify)\n\nNote: Must itemize to claim most',
    difficulty: 'medium',
    tags: ['housing', 'tax', 'benefits']
  },
  {
    id: 'FC-GEN-061',
    domain: 'GEN',
    category: 'Home Ownership',
    front: 'What is the HOME SALE CAPITAL GAIN EXCLUSION?',
    back: 'Section 121 Exclusion:\n• Single: $250,000\n• Married filing joint: $500,000\n\nRequirements:\n• Owned 2 of last 5 years\n• Lived in 2 of last 5 years\n• Haven\'t used exclusion in 2 years\n\nPartial exclusion for health/job/unforeseen',
    difficulty: 'medium',
    tags: ['housing', 'tax', 'capital-gains']
  },
  {
    id: 'FC-GEN-062',
    domain: 'GEN',
    category: 'Economics',
    front: 'What is DEFLATION vs DISINFLATION?',
    back: 'DEFLATION:\n• Falling prices (negative inflation)\n• Can trigger economic crisis\n• Delays spending\n\nDISINFLATION:\n• Slowing rate of inflation\n• Prices still rising, just slower\n• Usually positive sign',
    difficulty: 'medium',
    tags: ['economics', 'inflation', 'definitions']
  },
  {
    id: 'FC-GEN-063',
    domain: 'GEN',
    category: 'Economics',
    front: 'What is STAGFLATION?',
    back: 'Stagflation:\n• Stagnant economic growth\n• High inflation\n• High unemployment\n\nDifficult to address:\n• Fighting inflation raises unemployment\n• Stimulating growth increases inflation\n\nExample: 1970s oil crisis',
    difficulty: 'hard',
    tags: ['economics', 'inflation', 'recession']
  },
  {
    id: 'FC-GEN-064',
    domain: 'GEN',
    category: 'Regulations',
    front: 'What is the SEC and what does it regulate?',
    back: 'Securities and Exchange Commission:\n• Federal securities regulator\n• Protects investors\n• Maintains fair markets\n• Facilitates capital formation\n\nRegulates:\n• Securities offerings\n• Investment advisers\n• Broker-dealers\n• Exchanges',
    difficulty: 'easy',
    tags: ['regulation', 'securities', 'compliance']
  },
  {
    id: 'FC-GEN-065',
    domain: 'GEN',
    category: 'Regulations',
    front: 'What is FINRA?',
    back: 'Financial Industry Regulatory Authority:\n• Self-regulatory organization\n• Regulates broker-dealers\n• Writes/enforces rules\n• Examines firms\n• Licenses representatives (Series exams)\n• Investor dispute resolution',
    difficulty: 'easy',
    tags: ['regulation', 'securities', 'compliance']
  },
  {
    id: 'FC-GEN-066',
    domain: 'GEN',
    category: 'Calculations',
    front: 'How to calculate INFLATION-ADJUSTED returns?',
    back: 'Inflation-Adjusted Return:\n\nFisher Formula:\n(1 + nominal) / (1 + inflation) - 1\n\nExample:\n• Nominal return: 8%\n• Inflation: 3%\n• Real return: (1.08/1.03) - 1 = 4.85%\n\nApproximate: 8% - 3% = 5%',
    difficulty: 'medium',
    tags: ['TVM', 'inflation', 'calculation']
  },
  {
    id: 'FC-GEN-067',
    domain: 'GEN',
    category: 'Consumer Protection',
    front: 'What protections does FDIC provide?',
    back: 'FDIC Insurance:\n• $250,000 per depositor per bank\n• Covers checking, savings, CDs, MMDAs\n• NOT: stocks, bonds, mutual funds, life insurance\n\nMultiple accounts at same bank:\n• Different ownership categories can increase coverage',
    difficulty: 'easy',
    tags: ['protection', 'banking', 'insurance']
  },
  {
    id: 'FC-GEN-068',
    domain: 'GEN',
    category: 'Consumer Protection',
    front: 'What is SIPC protection?',
    back: 'Securities Investor Protection Corporation:\n• Protects if broker-dealer fails\n• Up to $500,000 (incl. $250K cash)\n• Does NOT protect against market loss\n• Covers securities and cash\n• Not a government agency',
    difficulty: 'medium',
    tags: ['protection', 'securities', 'insurance']
  },
  {
    id: 'FC-GEN-069',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'How do you solve for UNKNOWN INTEREST RATE?',
    back: 'Calculator Steps:\n• Enter PV (as negative)\n• Enter FV (as positive)\n• Enter N (periods)\n• Enter PMT if annuity (or 0)\n• Compute I/Y\n\nExample: $1,000 grows to $1,500 in 5 years\nPV=-1000, FV=1500, N=5, CPT I/Y = 8.45%',
    difficulty: 'medium',
    tags: ['TVM', 'calculator', 'interest']
  },
  {
    id: 'FC-GEN-070',
    domain: 'GEN',
    category: 'Time Value of Money',
    front: 'How do you solve for UNKNOWN TIME PERIOD?',
    back: 'Calculator Steps:\n• Enter PV (as negative)\n• Enter FV (as positive)\n• Enter I/Y (rate)\n• Enter PMT if annuity (or 0)\n• Compute N\n\nExample: Double money at 7%\nPV=-100, FV=200, I/Y=7, CPT N = 10.24 years\n(Rule of 72: 72/7 ≈ 10.3)',
    difficulty: 'medium',
    tags: ['TVM', 'calculator', 'periods']
  },
];
