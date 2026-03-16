#!/usr/bin/env node
/**
 * Blueprint Coverage Validator
 * 
 * Validates question banks against official exam blueprints for all 6 exams.
 * Checks:
 *  1. Blueprint area coverage (do we have questions for every area?)
 *  2. Weight alignment (does question distribution match blueprint weights?)
 *  3. Topic coverage (do topics in questions match blueprint topics?)
 *  4. Question sufficiency (enough questions per area for meaningful practice?)
 *  5. Quality metrics (whyWrong depth, educational content)
 * 
 * Usage:
 *   node scripts/blueprint-coverage.cjs                # All exams
 *   node scripts/blueprint-coverage.cjs --exam cpa     # Single exam
 *   node scripts/blueprint-coverage.cjs --json         # JSON output
 *   node scripts/blueprint-coverage.cjs --verbose      # Show topic-level detail
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CLI ARGS
// ============================================================================
const args = process.argv.slice(2);
const examFilter = args.includes('--exam') ? args[args.indexOf('--exam') + 1]?.toLowerCase() : null;
const jsonOutput = args.includes('--json');
const verbose = args.includes('--verbose');

// ============================================================================
// BLUEPRINT DEFINITIONS (from examConfig.ts + course configs)
// ============================================================================

const BLUEPRINTS = {
  cpa: {
    name: 'CPA (Certified Public Accountant)',
    sections: {
      far: {
        name: 'Financial Accounting and Reporting',
        areas: {
          'FAR-I':   { name: 'Conceptual Framework and Standard Setting', weight: [5,15], topics: ['FASB Conceptual Framework','Qualitative characteristics','Elements of financial statements','FASB, GASB, and IASB','SEC reporting requirements'] },
          'FAR-II':  { name: 'Financial Statement Accounts', weight: [30,40], topics: ['Bank reconciliations','Restricted cash','Accounts receivable','Allowance for credit losses (CECL)','Notes receivable','Factoring and pledging','Cost flow assumptions (FIFO, LIFO, Weighted Avg)','Lower of cost or net realizable value','Dollar-value LIFO','Acquisition and capitalization','Depreciation methods','Impairment','Disposals and exchanges','Debt securities classification','Equity securities','Equity method investments','Fair value measurement','Internally developed intangibles','Acquired intangibles','Goodwill impairment','Accounts payable','Accrued liabilities','Asset retirement obligations','Notes payable','Bonds payable','Debt modifications and extinguishments','Issuance of stock','Treasury stock','Dividends','Stock compensation'] },
          'FAR-III': { name: 'Transactions', weight: [25,35], topics: ['Five-step model (ASC 606)','Performance obligations','Variable consideration','Contract costs','Lease classification (ASC 842)','Lessee accounting','Lessor accounting','Sale-leaseback transactions','Deferred tax assets and liabilities','Valuation allowance','Uncertain tax positions','Defined benefit plans','Pension expense components','OPEB','Loss contingencies','Gain contingencies','Guarantees','Basic EPS','Diluted EPS','Complex capital structures'] },
          'FAR-IV':  { name: 'State and Local Government', weight: [10,20], topics: ['Measurement focus and basis of accounting','Fund accounting','Budgetary accounting','Statement of Net Position','Statement of Activities','Governmental funds','Proprietary funds','Fiduciary funds'] },
          'FAR-V':   { name: 'Not-for-Profit Entities', weight: [5,15], topics: ['Statement of Financial Position','Statement of Activities','Statement of Cash Flows','Contributions and pledges','Net asset classifications','Split-interest agreements'] },
        },
      },
      aud: {
        name: 'Auditing and Attestation',
        areas: {
          'AUD-I':   { name: 'Ethics, Professional Responsibilities, and General Principles', weight: [15,25], topics: ['Overall objectives and limitations of an audit','Auditing standards hierarchy','Types of engagements and related standards','AICPA Code of Professional Conduct','Independence requirements','SEC and PCAOB independence rules','Conflicts of interest','Engagement letters and terms','Required communications'] },
          'AUD-II':  { name: 'Assessing Risk and Developing a Planned Response', weight: [25,35], topics: ['Preliminary engagement activities','Materiality determination','Audit risk model','Industry and regulatory factors','Business operations and strategy','Financial performance measures','Components of internal control','Evaluating design and implementation','IT general and application controls','Identifying and assessing RMM','Significant risks','Fraud risk factors'] },
          'AUD-III': { name: 'Performing Further Procedures and Obtaining Evidence', weight: [30,40], topics: ['Relevance and reliability','External confirmations','Analytical procedures','Statistical vs non-statistical sampling','Sample design and selection','Evaluating sample results','Accounting estimates','Related parties','Going concern evaluation','Subsequent events','Internal auditors','Component auditors','Specialists and experts'] },
          'AUD-IV':  { name: 'Forming Conclusions and Reporting', weight: [15,25], topics: ['Unmodified opinion','Modified opinions','Emphasis of matter and other matter paragraphs','Comparative financial statements','Examination engagements','Review engagements','Agreed-upon procedures','Compilation engagements','Preparation engagements'] },
        },
      },
      reg: {
        name: 'Taxation and Regulation',
        areas: {
          'REG-I':   { name: 'Ethics, Professional Responsibilities, and Federal Tax Procedures', weight: [10,20], topics: ['Treasury Circular 230','AICPA SSTS','Tax preparer penalties','Filing requirements and deadlines','Statute of limitations','IRS audit process','Taxpayer penalties'] },
          'REG-II':  { name: 'Business Law', weight: [10,20], topics: ['Formation and authority of agents','Duties and liabilities','Formation and enforceability','Performance and remedies','Third-party rights','Sole proprietorships','Partnerships','Corporations','LLCs','Secured transactions (UCC Article 9)','Bankruptcy basics'] },
          'REG-III': { name: 'Federal Taxation of Individuals', weight: [22,32], topics: ['Inclusions in gross income','Exclusions from gross income','Tip income exclusion (H.R.1)','Above-the-line deductions','Standard vs itemized deductions','Qualified business income (199A)','State and local tax deduction (H.R.1)','Filing status determination','Qualifying child/relative tests','Child tax credit','Earned income credit','Education credits','Enhanced child tax credit (H.R.1)','Basis determination','Capital gains and losses','Section 1231 assets','Like-kind exchanges (Section 1031)','Section 121 exclusion'] },
          'REG-IV':  { name: 'Federal Taxation of Entities', weight: [23,33], topics: ['Formation and capitalization','Taxable income computation','Distributions','Accumulated earnings tax','Personal holding company tax','Eligibility and election (S Corps)','Shareholder basis','Built-in gains tax','Distributions and AAA','Formation and contributions (Partnerships)','Partner basis calculations','Allocations and distributions','Sales and liquidations','Fiduciary income tax','Distributable net income','Simple vs complex trusts','Section 501(c)(3) requirements','Unrelated business income'] },
          'REG-V':   { name: 'Property Transactions', weight: [10,20], topics: ['Basis of assets','Depreciation','Section 179','Bonus depreciation','Capital gains/losses','Section 1231','Like-kind exchanges','Installment sales','Related party transactions'] },
        },
      },
      bar: {
        name: 'Business Analysis and Reporting',
        areas: {
          'BAR-I':   { name: 'Business Combinations and Consolidations', weight: [15,25], topics: ['Acquisition method','Measuring consideration transferred','Recognizing goodwill and bargain purchases','Consolidation procedures','Intercompany transactions','Noncontrolling interests','VIE identification','Primary beneficiary determination'] },
          'BAR-II':  { name: 'Technical Accounting', weight: [25,35], topics: ['Complex contract modifications','Principal vs agent considerations','Licenses of IP','Lease modifications','Subleases','Build-to-suit arrangements','Derivative instruments','Hedge accounting','Fair value and cash flow hedges','Foreign currency transactions','Translation of foreign operations','Remeasurement'] },
          'BAR-III': { name: 'State and Local Government', weight: [20,30], topics: ['Capital assets and infrastructure','Long-term liabilities','Pension and OPEB (GASB 68/75)','CAFR/ACFR components','RSI and SI','Reconciliations'] },
          'BAR-IV':  { name: 'Financial Statement Analysis and Planning', weight: [15,25], topics: ['Ratio analysis','Trend analysis','Prospective financial statements','Cost-volume-profit analysis','Budgeting and forecasting','Variance analysis'] },
        },
      },
      isc: {
        name: 'Information Systems and Controls',
        areas: {
          'ISC-I':   { name: 'Information Systems and Data Management', weight: [30,40], topics: ['Database fundamentals','Data modeling','Data governance','Hardware and infrastructure','Cloud computing models','Network fundamentals','System lifecycle','Change management','Disaster recovery and BCP'] },
          'ISC-II':  { name: 'Security, Confidentiality, and Privacy', weight: [25,35], topics: ['Threat landscape','Security controls','Encryption and authentication','Logical access controls','Physical access controls','Identity management','Privacy principles','HIPAA requirements','Other privacy regulations'] },
          'ISC-III': { name: 'SOC Engagements', weight: [25,35], topics: ['SOC 1 overview and scope','Type 1 vs Type 2 reports','Control objectives','Trust services criteria','SOC 2 reports','SOC 3 reports','Cybersecurity risk management'] },
        },
      },
      tcp: {
        name: 'Tax Compliance and Planning',
        areas: {
          'TCP-I':   { name: 'Individual Tax Planning', weight: [20,30], topics: ['Timing of income recognition','Income shifting strategies','New income exclusions (H.R.1)','Timing of deductions','Bunching strategies','Updated deduction limits (H.R.1)','Capital gains strategies','Qualified opportunity zones','Net investment income tax'] },
          'TCP-II':  { name: 'Entity Tax Planning', weight: [30,40], topics: ['Entity type comparison','Check-the-box regulations','State tax considerations','Reasonable compensation','Retirement plan selection','Fringe benefits','State nexus and apportionment','International tax basics','Transfer pricing concepts'] },
          'TCP-III': { name: 'Property Transactions', weight: [15,25], topics: ['Installment sales','Related party transactions','Like-kind exchange planning','Stock vs asset sales','Section 338 elections','Corporate liquidations'] },
          'TCP-IV':  { name: 'Gift and Estate Tax', weight: [10,20], topics: ['Annual exclusion and lifetime exemption','Gift-splitting','Valuation discounts','Estate valuation','Deductions and credits','Portability'] },
        },
      },
    },
  },
  ea: {
    name: 'EA (Enrolled Agent)',
    sections: {
      see1: {
        name: 'Part 1: Individuals',
        areas: {
          'SEE1-1': { name: 'Preliminary Work and Taxpayer Data', weight: [15,18], topics: ['Filing requirements and due dates','Filing status determination','Dependents and dependency tests','Taxpayer identification numbers','Estimated tax requirements'] },
          'SEE1-2': { name: 'Income and Assets', weight: [18,22], topics: ['Wages, salaries, and tips','Interest and dividends','Business income (Schedule C)','Capital gains and losses','Rental and royalty income','Retirement distributions','Social Security benefits'] },
          'SEE1-3': { name: 'Deductions and Credits', weight: [18,22], topics: ['Above-the-line deductions','IRA contributions','Student loan interest','Standard vs itemized deductions','Schedule A deductions','Nonrefundable credits','Refundable credits (EITC, CTC)'] },
          'SEE1-4': { name: 'Taxation', weight: [15,20], topics: ['Tax computation and rates','Alternative minimum tax (AMT)','Self-employment tax','Net investment income tax','Estimated tax payments'] },
          'SEE1-5': { name: 'Advising the Individual Taxpayer', weight: [10,15], topics: ['Tax planning strategies','Retirement planning considerations','Education tax benefits','Health savings accounts'] },
          'SEE1-6': { name: 'Specialized Returns for Individuals', weight: [10,15], topics: ['Amended returns (Form 1040-X)','Foreign income and exclusions','Non-resident alien returns'] },
        },
      },
      see2: {
        name: 'Part 2: Businesses',
        areas: {
          'SEE2-1': { name: 'Business Entities and Considerations', weight: [32,38], topics: ['Sole proprietorships (Schedule C)','Partnerships (Form 1065)','C Corporations (Form 1120)','S Corporations (Form 1120-S)','Entity selection and formation','Basis calculations'] },
          'SEE2-2': { name: 'Business Tax Preparation', weight: [40,48], topics: ['Accounting methods and periods','Business income recognition','Cost of goods sold','Business expenses and deductions','Depreciation and amortization','Section 179 and bonus depreciation','Business credits','Employment tax credits'] },
          'SEE2-3': { name: 'Specialized Business Topics', weight: [18,24], topics: ['Payroll taxes and requirements','Employment tax deposits','Trust fund recovery penalty','Qualified retirement plans','SEP and SIMPLE plans'] },
        },
      },
      see3: {
        name: 'Part 3: Representation, Practices, and Procedures',
        areas: {
          'SEE3-1': { name: 'Practices and Procedures', weight: [22,28], topics: ['Assessment procedures','Statutes of limitations','Collection procedures','Audit selection and types','Examination procedures','Burden of proof'] },
          'SEE3-2': { name: 'Representation', weight: [25,32], topics: ['Circular 230 requirements','Practitioner duties and penalties','Written advice standards','Power of attorney (Form 2848)','Tax information authorization','Limited practice rights'] },
          'SEE3-3': { name: 'Specific Areas of Representation', weight: [25,32], topics: ['Appeals procedures','Collection due process (CDP)','Offer in compromise','Innocent spouse relief','Installment agreements','Penalty abatement'] },
          'SEE3-4': { name: 'Filing Process', weight: [15,20], topics: ['PTIN requirements','E-file requirements','Preparer penalties and due diligence','Information return requirements','FBAR and foreign reporting'] },
        },
      },
    },
  },
  cma: {
    name: 'CMA (Certified Management Accountant)',
    sections: {
      cma1: {
        name: 'Part 1: Financial Planning, Performance, and Analytics',
        areas: {
          'CMA1-A': { name: 'External Financial Reporting Decisions', weight: [15,15], topics: ['Financial statements','Recognition, measurement, valuation','SEC filings and FASB updates'] },
          'CMA1-B': { name: 'Planning, Budgeting, and Forecasting', weight: [20,20], topics: ['Strategic planning','Budgeting concepts','Forecasting techniques','Budget methodologies'] },
          'CMA1-C': { name: 'Performance Management', weight: [20,20], topics: ['Cost and variance measures','Responsibility centers','Performance measures','Balanced scorecard'] },
          'CMA1-D': { name: 'Cost Management', weight: [15,15], topics: ['Measurement concepts','Costing systems','Overhead costs','Supply chain management'] },
          'CMA1-E': { name: 'Internal Controls', weight: [15,15], topics: ['Governance, risk, and compliance','Internal control framework (COSO)','Internal audit function'] },
          'CMA1-F': { name: 'Technology and Analytics', weight: [15,15], topics: ['Information systems','Data governance','Technology-enabled finance transformation','Data analytics'] },
        },
      },
      cma2: {
        name: 'Part 2: Strategic Financial Management',
        areas: {
          'CMA2-A': { name: 'Financial Statement Analysis', weight: [20,20], topics: ['Basic financial statement analysis','Financial ratios','Profitability analysis','Special issues (inflation, foreign currency)'] },
          'CMA2-B': { name: 'Corporate Finance', weight: [20,20], topics: ['Risk and return','Long-term financial management','Raising capital','Working capital management'] },
          'CMA2-C': { name: 'Decision Analysis', weight: [25,25], topics: ['Cost-volume-profit analysis','Marginal analysis','Pricing','Risk analysis'] },
          'CMA2-D': { name: 'Risk Management', weight: [10,10], topics: ['Enterprise risk management','Risk identification and mitigation'] },
          'CMA2-E': { name: 'Investment Decisions', weight: [10,10], topics: ['Capital budgeting process','Discounted cash flow analysis','Payback and discounted payback','Risk analysis in capital investment'] },
          'CMA2-F': { name: 'Professional Ethics', weight: [15,15], topics: ['Business ethics','Ethical considerations for management accountants','IMA Statement of Ethical Professional Practice'] },
        },
      },
    },
  },
  cia: {
    name: 'CIA (Certified Internal Auditor)',
    sections: {
      cia1: {
        name: 'Part 1: Essentials of Internal Auditing',
        areas: {
          'CIA1-I':   { name: 'Foundations of Internal Auditing', weight: [40,40], topics: ['Mission of internal audit','Definition of internal auditing','Core principles','Code of Ethics','International Standards'] },
          'CIA1-II':  { name: 'Independence and Objectivity', weight: [15,15], topics: ['Organizational independence','Individual objectivity','Impairments'] },
          'CIA1-III': { name: 'Proficiency and Due Professional Care', weight: [15,15], topics: ['Proficiency requirements','Due professional care','Continuing professional development'] },
          'CIA1-IV':  { name: 'Quality Assurance and Improvement Program', weight: [10,10], topics: ['Internal assessments','External assessments','Reporting on QAIP'] },
          'CIA1-V':   { name: 'Governance, Risk Management, and Control', weight: [20,20], topics: ['Corporate governance concepts','Enterprise risk management','Internal control frameworks'] },
        },
      },
      cia2: {
        name: 'Part 2: Practice of Internal Auditing',
        areas: {
          'CIA2-I':   { name: 'Managing the Internal Audit Activity', weight: [20,20], topics: ['Audit planning and strategy','Resource management','Policies and procedures','Coordination and reliance'] },
          'CIA2-II':  { name: 'Planning the Engagement', weight: [20,20], topics: ['Engagement planning','Engagement objectives','Engagement scope','Resource allocation'] },
          'CIA2-III': { name: 'Performing the Engagement', weight: [40,40], topics: ['Information gathering','Analysis and evaluation','Documentation','Engagement supervision'] },
          'CIA2-IV':  { name: 'Communicating Engagement Results and Monitoring Progress', weight: [20,20], topics: ['Communication criteria and quality','Disseminating results','Monitoring progress'] },
        },
      },
      cia3: {
        name: 'Part 3: Business Knowledge for Internal Auditing',
        areas: {
          'CIA3-I':   { name: 'Business Acumen', weight: [35,35], topics: ['Strategic management','Business processes and structures','Organizational behavior','Management frameworks'] },
          'CIA3-II':  { name: 'Information Security', weight: [25,25], topics: ['Information security fundamentals','Information security governance','Security risk assessment','Security controls'] },
          'CIA3-III': { name: 'Information Technology', weight: [20,20], topics: ['IT governance','IT operations','IT infrastructure','Emerging technologies'] },
          'CIA3-IV':  { name: 'Financial Management', weight: [20,20], topics: ['Financial accounting and finance','Managerial accounting'] },
        },
      },
    },
  },
  cisa: {
    name: 'CISA (Certified Information Systems Auditor)',
    sections: {
      cisa1: {
        name: 'Domain 1: Information Systems Auditing Process',
        areas: {
          'CISA1-A': { name: 'IS Audit Process', weight: [6,6], topics: ['IS Audit Standards and Guidelines','Risk-Based Audit Planning','Audit Objectives and Scope','Audit Resource Management'] },
          'CISA1-B': { name: 'Audit Execution', weight: [5,5], topics: ['Audit Evidence Collection','Sampling Methodologies','Audit Documentation'] },
          'CISA1-C': { name: 'Audit Reporting', weight: [4,4], topics: ['Report Structure','Findings and Recommendations','Report Distribution'] },
          'CISA1-D': { name: 'Control Frameworks', weight: [3,3], topics: ['COSO Framework','COBIT Framework','Control Objectives'] },
          'CISA1-E': { name: 'CAATs', weight: [3,3], topics: ['Computer-Assisted Audit Techniques','Generalized Audit Software','Test Data Methods','Continuous Auditing'] },
        },
      },
      cisa2: {
        name: 'Domain 2: Governance and Management of IT',
        areas: {
          'CISA2-A': { name: 'IT Governance', weight: [4,4], topics: ['IT Governance Frameworks (COBIT, ITIL)','IT Strategy and Business Alignment','Organizational Structure and Roles','IT Policies and Standards'] },
          'CISA2-B': { name: 'IT Risk Management', weight: [4,4], topics: ['Risk Assessment Methodologies','Risk Treatment Options','Third-Party Risk Management'] },
          'CISA2-C': { name: 'IT Risk Framework & Assessment', weight: [4,4], topics: ['Risk Management Framework','Risk Identification','Risk Analysis','Risk Assessment Practices'] },
          'CISA2-D': { name: 'Compliance & Business Impact', weight: [4,4], topics: ['Regulatory Compliance','Privacy Regulations','Business Impact Analysis','RTO/RPO'] },
        },
      },
      cisa3: {
        name: 'Domain 3: IS Acquisition, Development & Implementation',
        areas: {
          'CISA3-A': { name: 'Project Management', weight: [6,6], topics: ['Project Governance','SDLC Methodologies','Agile and DevOps','Requirements Management'] },
          'CISA3-B': { name: 'System Implementation', weight: [6,6], topics: ['Secure Coding Practices','Testing Methodologies','Change and Release Management'] },
          'CISA3-C': { name: 'Software Acquisition', weight: [6,6], topics: ['Build vs Buy Analysis','RFP Process','Vendor Evaluation','Licensing and Contracts'] },
        },
      },
      cisa4: {
        name: 'Domain 4: IS Operations and Business Resilience',
        areas: {
          'CISA4-A': { name: 'IT Operations', weight: [7,7], topics: ['IT Service Management (ITSM)','Service Level Agreements','Incident and Problem Management','Change and Configuration Management','Infrastructure Operations'] },
          'CISA4-B': { name: 'Disaster Recovery', weight: [7,7], topics: ['Disaster Recovery Planning (DRP)','Backup and Recovery Strategies','Testing DRP Plans'] },
          'CISA4-C': { name: 'Business Continuity Planning', weight: [6,6], topics: ['Business Impact Analysis (BIA)','Business Continuity Planning (BCP)','Recovery Strategies','BC Testing'] },
        },
      },
      cisa5: {
        name: 'Domain 5: Protection of Information Assets',
        areas: {
          'CISA5-A': { name: 'Information Security Management', weight: [8,8], topics: ['Security Program Management','Security Policies and Standards','Security Awareness and Training','Data Classification and Handling'] },
          'CISA5-B': { name: 'Identity & Access Management', weight: [5,5], topics: ['Identity and Access Management (IAM)','Authentication','Authorization'] },
          'CISA5-C': { name: 'Network Security', weight: [5,5], topics: ['Network Security Architecture','Firewalls and IDS/IPS','Network Segmentation','Encryption and Cryptography'] },
          'CISA5-D': { name: 'Physical & Environmental Security', weight: [3,3], topics: ['Physical Access Controls','Environmental Controls','Surveillance Systems'] },
          'CISA5-E': { name: 'Emerging Technology Security', weight: [4,4], topics: ['AI/ML Security','Cloud Security','IoT Security','Adversarial Attacks'] },
        },
      },
    },
  },
  cfp: {
    name: 'CFP (Certified Financial Planner)',
    sections: {
      'CFP-PCR': {
        name: 'Professional Conduct and Regulation',
        areas: {
          'PCR-1': { name: 'Code of Ethics and Standards of Conduct', weight: [4,4], topics: ['CFP Board Code of Ethics','Standards of Conduct (Duties)','Duty of Loyalty','Duty of Care','Duty to Follow Client Instructions','Disciplinary rules and procedures','Practice standards'] },
          'PCR-2': { name: 'Fiduciary Duty', weight: [4,4], topics: ['Fiduciary duty at all times','Material conflicts of interest','Compensation disclosure','Written client agreement requirements','Suitability vs. fiduciary standards'] },
        },
      },
      'CFP-GEN': {
        name: 'General Principles of Financial Planning',
        areas: {
          'GEN-1': { name: 'Financial Statements & Cash Flow', weight: [8,8], topics: ['Personal financial statements','Balance sheet analysis','Cash flow statement','Budget development','Emergency fund planning','Financial ratios (liquidity, debt, savings)'] },
          'GEN-2': { name: 'Education Planning', weight: [4,4], topics: ['529 plans (qualified tuition programs)','Coverdell Education Savings Accounts','UGMA/UTMA accounts','Education tax credits (AOTC, LLC)','Student loan strategies','Financial aid considerations (FAFSA/EFC)'] },
          'GEN-3': { name: 'Debt Management', weight: [3,3], topics: ['Consumer debt strategies','Mortgage analysis (15 vs 30 year, ARM vs fixed)','Debt consolidation','Credit score optimization','Bankruptcy considerations'] },
        },
      },
      'CFP-RISK': {
        name: 'Risk Management and Insurance Planning',
        areas: {
          'RISK-1': { name: 'Life Insurance', weight: [4,4], topics: ['Term vs. permanent life insurance','Whole life, universal life, variable life','Needs analysis methods','Policy provisions and riders','Life settlement and viatical options','Group life insurance'] },
          'RISK-2': { name: 'Health & Disability', weight: [3,3], topics: ['Health insurance (individual and group)','HSAs, FSAs, and HRAs','Medicare Parts A, B, C, D','Medigap and Medicare Advantage','Long-term care insurance','Disability income insurance (own-occupation, any-occupation)'] },
          'RISK-3': { name: 'Property & Casualty', weight: [2,2], topics: ['Homeowners insurance basics','Auto insurance coverage','Business liability insurance','Risk management techniques'] },
          'RISK-4': { name: 'Property & Liability Insurance', weight: [2,2], topics: ['Homeowners policy forms (HO-3, HO-5)','Auto insurance details','Umbrella/excess liability policies','Coinsurance and valuation'] },
        },
      },
      'CFP-INV': {
        name: 'Investment Planning',
        areas: {
          'INV-1': { name: 'Asset Allocation', weight: [5,5], topics: ['Modern Portfolio Theory','Strategic vs. tactical allocation','Efficient frontier','Risk tolerance assessment','Rebalancing strategies','Diversification principles'] },
          'INV-2': { name: 'Security Analysis', weight: [5,5], topics: ['Equity valuation (P/E, dividend discount)','Bond pricing and yield calculations','Options strategies (calls, puts, covered calls)','Mutual funds and ETFs','Alternative investments (REITs, commodities)','Technical vs. fundamental analysis'] },
          'INV-3': { name: 'Portfolio Management', weight: [4,4], topics: ['Performance measurement (HPR, TWR, IRR)','Risk measures (standard deviation, beta, Sharpe ratio)','Active vs. passive management','Dollar-cost averaging','Tax-loss harvesting','Investment policy statements'] },
          'INV-4': { name: 'Tax Sensitivity', weight: [3,3], topics: ['Asset location strategies','Tax-efficient fund placement','Municipal bonds vs. taxable bonds','Capital gains management','Wash sale rules'] },
        },
      },
      'CFP-TAX': {
        name: 'Tax Planning',
        areas: {
          'TAX-1': { name: 'Income Tax Law', weight: [7,7], topics: ['Filing status determination','Gross income inclusions and exclusions','Above-the-line deductions','Itemized vs. standard deduction','Tax credits (Child Tax Credit, EITC)','AMT calculations','Capital gains taxation (short-term vs. long-term)'] },
          'TAX-2': { name: 'Tax Compliance', weight: [4,4], topics: ['Estimated tax payments','Withholding requirements','Tax penalties and interest','Statute of limitations','IRS audit procedures'] },
          'TAX-3': { name: 'Charitable Giving', weight: [3,3], topics: ['Charitable contribution deductions','Qualified charitable distributions (QCDs)','Donor-advised funds','Charitable remainder trusts (CRT)','Charitable lead trusts (CLT)','Private foundations'] },
        },
      },
      'CFP-RET': {
        name: 'Retirement and Income Planning',
        areas: {
          'RET-1': { name: 'Social Security', weight: [4,4], topics: ['Eligibility and benefit calculation','Claiming strategies (early, FRA, delayed to 70)','Spousal and survivor benefits','Earnings test and taxation of benefits','Windfall Elimination Provision (WEP)','Government Pension Offset (GPO)'] },
          'RET-2': { name: 'Qualified Plans', weight: [7,7], topics: ['401(k), 403(b), 457 plans','Traditional and Roth IRAs','SEP-IRA and SIMPLE IRA','Defined benefit pension plans','Contribution limits and catch-up provisions','Vesting schedules','Required Minimum Distributions (RMDs)'] },
          'RET-3': { name: 'Distribution Strategies', weight: [7,7], topics: ['Retirement income needs analysis','Withdrawal sequencing (which accounts first)','Roth conversion strategies','72(t) substantially equal periodic payments','Net unrealized appreciation (NUA)','Retirement income sustainability (4% rule, guardrails)'] },
        },
      },
      'CFP-EST': {
        name: 'Estate Planning',
        areas: {
          'EST-1': { name: 'Wills & Trusts', weight: [4,4], topics: ['Types of wills (simple, pour-over, holographic)','Revocable living trusts','Irrevocable trusts (ILIT, GRAT, QPRT)','Powers of attorney (financial, healthcare)','Advance healthcare directives','Probate process and avoidance'] },
          'EST-2': { name: 'Gift & Estate Tax', weight: [3,3], topics: ['Annual gift tax exclusion','Lifetime gift tax exemption','Estate tax calculation and exemption','Portability of exemption between spouses','Generation-skipping transfer tax (GSTT)','Valuation discounts'] },
          'EST-3': { name: 'Wealth Transfer', weight: [3,3], topics: ['Family limited partnerships (FLPs)','Installment sales to grantor trusts','Qualified personal residence trusts (QPRTs)','Grantor retained annuity trusts (GRATs)','Dynasty trusts','Special needs planning'] },
        },
      },
      'CFP-PSY': {
        name: 'Psychology of Financial Planning',
        areas: {
          'PSY-1': { name: 'Client Communication & Counseling', weight: [4,4], topics: ['Active listening techniques','Client interview and data gathering','Money scripts and financial attitudes','Crisis counseling (divorce, death, job loss)','Motivational interviewing','Building trust and rapport'] },
          'PSY-2': { name: 'Behavioral Finance', weight: [3,3], topics: ['Cognitive biases (anchoring, confirmation, recency)','Loss aversion and prospect theory','Mental accounting','Overconfidence and hindsight bias','Framing effects','Heuristics in decision-making'] },
        },
      },
    },
  },
};

// ============================================================================
// MINIMUM QUESTION TARGETS
// ============================================================================

// Minimum questions per blueprint area to ensure meaningful practice
const MIN_QUESTIONS_PER_AREA = 20;
// Ideal: at least 5 questions per topic
const IDEAL_QUESTIONS_PER_TOPIC = 5;

// ============================================================================
// LOAD QUESTIONS
// ============================================================================

function loadQuestions(exam, sectionId) {
  const p = path.join(__dirname, '..', 'content', exam, sectionId, 'questions.json');
  if (!fs.existsSync(p)) return [];
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  return data.questions || [];
}

// ============================================================================
// QUALITY ASSESSMENT
// ============================================================================

function assessQuality(questions) {
  let deepWhyWrong = 0;
  let hasEducational = 0;
  let hasExamTip = 0;
  let hasMemoryAid = 0;
  let thinWhyWrong = 0;

  for (const q of questions) {
    // whyWrong quality
    if (q.whyWrong && typeof q.whyWrong === 'object') {
      const values = Object.values(q.whyWrong);
      const allDeep = values.every(v => typeof v === 'string' && v.length > 80);
      if (allDeep) deepWhyWrong++;
      const anyThin = values.some(v => typeof v === 'string' && (v.length < 50 || v.includes('does not correctly address')));
      if (anyThin) thinWhyWrong++;
    }

    // Educational
    if (q.educational && typeof q.educational === 'string' && q.educational.length > 30) {
      hasEducational++;
    }

    // Exam tip
    if (q.examTip && typeof q.examTip === 'string' && q.examTip.length > 20) {
      hasExamTip++;
    }

    // Memory aid
    if (q.memoryAid && typeof q.memoryAid === 'string' && q.memoryAid.length > 10) {
      hasMemoryAid++;
    }
  }

  return { deepWhyWrong, hasEducational, hasExamTip, hasMemoryAid, thinWhyWrong };
}

// ============================================================================
// TOPIC MATCHING
// ============================================================================

function normalizeForMatch(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function topicMatchScore(blueprintTopic, questionTopics) {
  const normBP = normalizeForMatch(blueprintTopic);
  const bpWords = normBP.split(' ').filter(w => w.length > 2);
  
  let bestScore = 0;
  for (const qt of questionTopics) {
    const normQ = normalizeForMatch(qt);
    // Exact match
    if (normQ === normBP) return 1.0;
    // Containment
    if (normQ.includes(normBP) || normBP.includes(normQ)) return 0.9;
    // Word overlap
    const qWords = normQ.split(' ').filter(w => w.length > 2);
    const overlap = bpWords.filter(w => qWords.includes(w)).length;
    const score = overlap / Math.max(bpWords.length, 1);
    if (score > bestScore) bestScore = score;
  }
  return bestScore;
}

// ============================================================================
// COVERAGE ANALYSIS
// ============================================================================

function analyzeCoverage(examId, blueprint) {
  const result = {
    exam: examId.toUpperCase(),
    examName: blueprint.name,
    sections: {},
    summary: {
      totalQuestions: 0,
      totalAreas: 0,
      coveredAreas: 0,
      totalBlueprintTopics: 0,
      coveredTopics: 0,
      weakTopics: 0,
      missingTopics: 0,
      weightAlignment: [],
      qualityMetrics: { deepWhyWrong: 0, hasEducational: 0, hasExamTip: 0, hasMemoryAid: 0, thinWhyWrong: 0 },
      gaps: [],
      recommendations: [],
    },
  };

  for (const [sectionId, section] of Object.entries(blueprint.sections)) {
    const questions = loadQuestions(examId, sectionId);
    const sectionResult = {
      name: section.name,
      totalQuestions: questions.length,
      areas: {},
      quality: assessQuality(questions),
    };

    result.summary.totalQuestions += questions.length;
    result.summary.qualityMetrics.deepWhyWrong += sectionResult.quality.deepWhyWrong;
    result.summary.qualityMetrics.hasEducational += sectionResult.quality.hasEducational;
    result.summary.qualityMetrics.hasExamTip += sectionResult.quality.hasExamTip;
    result.summary.qualityMetrics.hasMemoryAid += sectionResult.quality.hasMemoryAid;
    result.summary.qualityMetrics.thinWhyWrong += sectionResult.quality.thinWhyWrong;

    // Get unique topics from questions
    const questionTopics = [...new Set(questions.map(q => q.topic).filter(Boolean))];

    for (const [areaId, area] of Object.entries(section.areas)) {
      result.summary.totalAreas++;

      // Count questions in this area
      const areaQuestions = questions.filter(q => q.blueprintArea === areaId);
      const areaQCount = areaQuestions.length;
      const areaTopics = [...new Set(areaQuestions.map(q => q.topic).filter(Boolean))];

      // Check topic coverage
      const topicCoverage = {};
      for (const bpTopic of area.topics) {
        const matchScore = topicMatchScore(bpTopic, areaTopics);
        const matchingQs = areaQuestions.filter(q => {
          const qt = normalizeForMatch(q.topic || '');
          const bt = normalizeForMatch(bpTopic);
          return qt.includes(bt) || bt.includes(qt) || 
            bt.split(' ').filter(w => w.length > 2).every(w => qt.includes(w));
        });

        topicCoverage[bpTopic] = {
          matchScore,
          questionCount: matchingQs.length,
          status: matchScore >= 0.7 ? 'covered' : matchScore >= 0.4 ? 'partial' : 'missing',
        };

        result.summary.totalBlueprintTopics++;
        if (matchScore >= 0.7) {
          result.summary.coveredTopics++;
        } else if (matchScore >= 0.4) {
          result.summary.weakTopics++;
        } else {
          result.summary.missingTopics++;
        }
      }

      // Weight analysis
      const actualWeight = questions.length > 0 ? (areaQCount / questions.length * 100) : 0;
      const targetMid = (area.weight[0] + area.weight[1]) / 2;
      const weightDelta = actualWeight - targetMid;
      const weightStatus = actualWeight >= area.weight[0] && actualWeight <= area.weight[1] ? 'aligned' :
        Math.abs(weightDelta) <= 5 ? 'close' : 'misaligned';

      if (areaQCount > 0) result.summary.coveredAreas++;

      sectionResult.areas[areaId] = {
        name: area.name,
        blueprintWeight: area.weight,
        questionCount: areaQCount,
        actualWeight: Math.round(actualWeight * 10) / 10,
        weightStatus,
        uniqueTopics: areaTopics.length,
        blueprintTopicCount: area.topics.length,
        topicCoverage,
        sufficiency: areaQCount >= MIN_QUESTIONS_PER_AREA ? 'sufficient' : areaQCount >= 10 ? 'marginal' : 'insufficient',
      };

      // Identify gaps
      if (areaQCount < MIN_QUESTIONS_PER_AREA) {
        result.summary.gaps.push({
          type: 'insufficient_questions',
          section: sectionId.toUpperCase(),
          area: areaId,
          areaName: area.name,
          have: areaQCount,
          need: MIN_QUESTIONS_PER_AREA,
          deficit: MIN_QUESTIONS_PER_AREA - areaQCount,
        });
      }

      if (weightStatus === 'misaligned') {
        result.summary.weightAlignment.push({
          section: sectionId.toUpperCase(),
          area: areaId,
          areaName: area.name,
          target: area.weight,
          actual: Math.round(actualWeight * 10) / 10,
          delta: Math.round(weightDelta * 10) / 10,
        });
      }

      // Missing topics
      for (const [topic, cov] of Object.entries(topicCoverage)) {
        if (cov.status === 'missing') {
          result.summary.gaps.push({
            type: 'missing_topic',
            section: sectionId.toUpperCase(),
            area: areaId,
            areaName: area.name,
            topic,
          });
        }
      }
    }

    result.sections[sectionId] = sectionResult;
  }

  // Generate recommendations
  const qm = result.summary.qualityMetrics;
  const total = result.summary.totalQuestions;

  if (qm.thinWhyWrong > 0) {
    result.summary.recommendations.push(`QUALITY: ${qm.thinWhyWrong} questions have thin/generic whyWrong explanations — need AI enhancement`);
  }
  if (qm.deepWhyWrong < total * 0.9) {
    result.summary.recommendations.push(`QUALITY: Only ${qm.deepWhyWrong}/${total} (${Math.round(qm.deepWhyWrong/total*100)}%) have deep whyWrong — target 95%+`);
  }
  if (qm.hasEducational < total * 0.9) {
    result.summary.recommendations.push(`QUALITY: Only ${qm.hasEducational}/${total} (${Math.round(qm.hasEducational/total*100)}%) have educational content — target 95%+`);
  }

  const insufficientAreas = result.summary.gaps.filter(g => g.type === 'insufficient_questions');
  if (insufficientAreas.length > 0) {
    const totalDeficit = insufficientAreas.reduce((s, g) => s + g.deficit, 0);
    result.summary.recommendations.push(`COVERAGE: ${insufficientAreas.length} blueprint areas below ${MIN_QUESTIONS_PER_AREA} question minimum — need ~${totalDeficit} more questions`);
  }

  const missingTopics = result.summary.gaps.filter(g => g.type === 'missing_topic');
  if (missingTopics.length > 0) {
    result.summary.recommendations.push(`COVERAGE: ${missingTopics.length} blueprint topics have ZERO matching questions — critical gaps`);
  }

  return result;
}

// ============================================================================
// REPORT FORMATTING
// ============================================================================

function printReport(analysis) {
  const { exam, examName, sections, summary } = analysis;
  const bar = '═'.repeat(80);
  const line = '─'.repeat(80);
  
  console.log(`\n${bar}`);
  console.log(`  ${exam} — ${examName}`);
  console.log(`${bar}`);
  console.log(`  Total Questions: ${summary.totalQuestions}`);
  console.log(`  Blueprint Areas: ${summary.coveredAreas}/${summary.totalAreas} covered`);
  console.log(`  Blueprint Topics: ${summary.coveredTopics} covered, ${summary.weakTopics} partial, ${summary.missingTopics} missing (of ${summary.totalBlueprintTopics})`);
  console.log(`  Topic Coverage: ${Math.round((summary.coveredTopics / summary.totalBlueprintTopics) * 100)}%`);
  
  const qm = summary.qualityMetrics;
  console.log(`\n  Quality Metrics:`);
  console.log(`    Deep whyWrong:    ${qm.deepWhyWrong}/${summary.totalQuestions} (${Math.round(qm.deepWhyWrong/summary.totalQuestions*100)}%)`);
  console.log(`    Thin whyWrong:    ${qm.thinWhyWrong}`);
  console.log(`    Educational:      ${qm.hasEducational}/${summary.totalQuestions} (${Math.round(qm.hasEducational/summary.totalQuestions*100)}%)`);
  console.log(`    Exam Tips:        ${qm.hasExamTip}/${summary.totalQuestions} (${Math.round(qm.hasExamTip/summary.totalQuestions*100)}%)`);
  console.log(`    Memory Aids:      ${qm.hasMemoryAid}/${summary.totalQuestions} (${Math.round(qm.hasMemoryAid/summary.totalQuestions*100)}%)`);
  
  console.log(`\n${line}`);
  console.log('  SECTION-BY-SECTION BREAKDOWN');
  console.log(line);

  for (const [sectionId, section] of Object.entries(sections)) {
    console.log(`\n  📗 ${sectionId.toUpperCase()} — ${section.name} (${section.totalQuestions} Qs)`);
    
    for (const [areaId, area] of Object.entries(section.areas)) {
      const weightStr = `${area.actualWeight}% (target: ${area.blueprintWeight[0]}-${area.blueprintWeight[1]}%)`;
      const statusIcon = area.weightStatus === 'aligned' ? '✅' : area.weightStatus === 'close' ? '⚠️' : '❌';
      const suffIcon = area.sufficiency === 'sufficient' ? '✅' : area.sufficiency === 'marginal' ? '⚠️' : '❌';
      
      console.log(`    ${statusIcon} ${areaId} ${area.name}`);
      console.log(`       Qs: ${area.questionCount} ${suffIcon}  |  Weight: ${weightStr}  |  Topics: ${area.uniqueTopics}/${area.blueprintTopicCount}`);
      
      if (verbose) {
        for (const [topic, cov] of Object.entries(area.topicCoverage)) {
          const tIcon = cov.status === 'covered' ? '  ✓' : cov.status === 'partial' ? '  ~' : '  ✗';
          console.log(`       ${tIcon} ${topic} (${cov.questionCount} Qs, match: ${Math.round(cov.matchScore*100)}%)`);
        }
      }
    }
  }

  // Weight misalignment
  if (summary.weightAlignment.length > 0) {
    console.log(`\n${line}`);
    console.log('  ⚖️  WEIGHT MISALIGNMENTS');
    console.log(line);
    for (const w of summary.weightAlignment) {
      const dir = w.delta > 0 ? 'OVER' : 'UNDER';
      console.log(`    ${w.section} ${w.area}: ${w.actual}% vs target ${w.target[0]}-${w.target[1]}% (${dir} by ${Math.abs(w.delta)}%)`);
    }
  }

  // Gaps
  const insuffGaps = summary.gaps.filter(g => g.type === 'insufficient_questions');
  const missingGaps = summary.gaps.filter(g => g.type === 'missing_topic');

  if (insuffGaps.length > 0) {
    console.log(`\n${line}`);
    console.log('  🔴 AREAS NEEDING MORE QUESTIONS');
    console.log(line);
    for (const g of insuffGaps) {
      console.log(`    ${g.section} ${g.area} ${g.areaName}: ${g.have}/${g.need} (need ${g.deficit} more)`);
    }
  }

  if (missingGaps.length > 0 && verbose) {
    console.log(`\n${line}`);
    console.log('  🔴 MISSING BLUEPRINT TOPICS (zero questions)');
    console.log(line);
    for (const g of missingGaps) {
      console.log(`    ${g.section} ${g.area}: "${g.topic}"`);
    }
  }

  // Recommendations
  if (summary.recommendations.length > 0) {
    console.log(`\n${line}`);
    console.log('  📋 RECOMMENDATIONS');
    console.log(line);
    for (const r of summary.recommendations) {
      console.log(`    • ${r}`);
    }
  }
}

// ============================================================================
// CROSS-EXAM SUMMARY
// ============================================================================

function printCrossExamSummary(allResults) {
  const bar = '═'.repeat(80);
  console.log(`\n${bar}`);
  console.log(`  CROSS-EXAM BLUEPRINT COVERAGE SUMMARY`);
  console.log(`${bar}\n`);

  // Table header
  console.log('  Exam    | Questions | Areas    | Topic Cov | whyWrong | Edu    | Tips   | Gaps');
  console.log('  --------|-----------|----------|-----------|----------|--------|--------|------');
  
  let grandTotal = 0;
  let grandBPTopics = 0;
  let grandCovTopics = 0;
  let grandGaps = 0;

  for (const r of allResults) {
    const s = r.summary;
    grandTotal += s.totalQuestions;
    grandBPTopics += s.totalBlueprintTopics;
    grandCovTopics += s.coveredTopics;
    grandGaps += s.gaps.filter(g => g.type === 'insufficient_questions').length;

    const topicPct = Math.round((s.coveredTopics / s.totalBlueprintTopics) * 100);
    const whyPct = Math.round((s.qualityMetrics.deepWhyWrong / s.totalQuestions) * 100);
    const eduPct = Math.round((s.qualityMetrics.hasEducational / s.totalQuestions) * 100);
    const tipPct = Math.round((s.qualityMetrics.hasExamTip / s.totalQuestions) * 100);
    const gapCount = s.gaps.filter(g => g.type === 'insufficient_questions').length;

    console.log(`  ${r.exam.padEnd(8)}| ${String(s.totalQuestions).padStart(5).padEnd(9)} | ${s.coveredAreas}/${String(s.totalAreas).padEnd(6)} | ${String(topicPct + '%').padStart(5).padEnd(9)} | ${String(whyPct + '%').padStart(5).padEnd(8)} | ${String(eduPct + '%').padStart(5).padEnd(6)} | ${String(tipPct + '%').padStart(5).padEnd(6)} | ${gapCount}`);
  }

  console.log('  --------|-----------|----------|-----------|----------|--------|--------|------');
  const totalTopicPct = Math.round((grandCovTopics / grandBPTopics) * 100);
  console.log(`  TOTAL   | ${String(grandTotal).padStart(5).padEnd(9)} |          | ${String(totalTopicPct + '%').padStart(5).padEnd(9)} |          |        |        | ${grandGaps}`);

  // Overall needs
  console.log(`\n  Total questions across all exams: ${grandTotal}`);
  console.log(`  Blueprint topic coverage: ${grandCovTopics}/${grandBPTopics} (${totalTopicPct}%)`);
  
  const allInsuffGaps = allResults.flatMap(r => r.summary.gaps.filter(g => g.type === 'insufficient_questions'));
  if (allInsuffGaps.length > 0) {
    const totalNeeded = allInsuffGaps.reduce((s, g) => s + g.deficit, 0);
    console.log(`  Areas below ${MIN_QUESTIONS_PER_AREA}-question minimum: ${allInsuffGaps.length}`);
    console.log(`  Additional questions needed: ~${totalNeeded}`);
  }

  // CISA-specific note: questions all tagged CISA{n}-A, not sub-areas
  const cisaResult = allResults.find(r => r.exam === 'CISA');
  if (cisaResult) {
    const cisaAllA = Object.entries(cisaResult.sections).every(([_, sec]) =>
      Object.keys(sec.areas).every(a => a.endsWith('-A'))
    );
    // Check if most questions only map to the -A sub-area
    let cisaMissingSubAreas = 0;
    for (const [secId, sec] of Object.entries(cisaResult.sections)) {
      for (const [areaId, area] of Object.entries(sec.areas)) {
        if (!areaId.endsWith('-A') && area.questionCount === 0) {
          cisaMissingSubAreas++;
        }
      }
    }
    if (cisaMissingSubAreas > 0) {
      console.log(`\n  ⚠️  CISA: ${cisaMissingSubAreas} sub-areas have 0 questions because all Qs are tagged with domain-level IDs (e.g., CISA1-A instead of CISA1-B/C/D/E)`);
      console.log(`     ACTION: Re-tag CISA questions to proper sub-area IDs or adjust blueprint expectations`);
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  const examsToAnalyze = examFilter ? { [examFilter]: BLUEPRINTS[examFilter] } : BLUEPRINTS;
  
  if (examFilter && !BLUEPRINTS[examFilter]) {
    console.error(`Unknown exam: ${examFilter}. Valid: ${Object.keys(BLUEPRINTS).join(', ')}`);
    process.exit(1);
  }

  const allResults = [];

  for (const [examId, blueprint] of Object.entries(examsToAnalyze)) {
    const analysis = analyzeCoverage(examId, blueprint);
    allResults.push(analysis);
    
    if (!jsonOutput) {
      printReport(analysis);
    }
  }

  if (!jsonOutput && allResults.length > 1) {
    printCrossExamSummary(allResults);
  }

  if (jsonOutput) {
    console.log(JSON.stringify(allResults, null, 2));
  }

  // Exit code: 1 if any critical gaps
  const hasCriticalGaps = allResults.some(r => 
    r.summary.gaps.filter(g => g.type === 'insufficient_questions').length > 0
  );
  process.exit(hasCriticalGaps ? 1 : 0);
}

main();
