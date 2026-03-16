#!/usr/bin/env node
/**
 * Blueprint Topic Normalizer
 * 
 * Maps question topics to official blueprint topic names using Gemini AI.
 * This ensures 100% blueprint topic coverage for "best of the best" quality.
 * 
 * Usage:
 *   node scripts/normalize-topics.cjs --exam cpa --section far      # Single section
 *   node scripts/normalize-topics.cjs --exam cpa                    # All CPA sections
 *   node scripts/normalize-topics.cjs --resume                      # Resume from progress
 *   node scripts/normalize-topics.cjs --dry-run                     # Preview only
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const BATCH_SIZE = 10; // Questions per API call
const DELAY_MS = 1500; // Between API calls
const PROGRESS_FILE = 'content/.normalize-progress.json';

// ============================================================================
// BLUEPRINTS (extracted from blueprint-coverage.cjs)
// ============================================================================

const BLUEPRINTS = {
  cpa: {
    far: {
      'FAR-I':   ['FASB Conceptual Framework','Qualitative characteristics','Elements of financial statements','FASB, GASB, and IASB','SEC reporting requirements'],
      'FAR-II':  ['Bank reconciliations','Restricted cash','Accounts receivable','Allowance for credit losses (CECL)','Notes receivable','Factoring and pledging','Cost flow assumptions (FIFO, LIFO, Weighted Avg)','Lower of cost or net realizable value','Dollar-value LIFO','Acquisition and capitalization','Depreciation methods','Impairment','Disposals and exchanges','Debt securities classification','Equity securities','Equity method investments','Fair value measurement','Internally developed intangibles','Acquired intangibles','Goodwill impairment','Accounts payable','Accrued liabilities','Asset retirement obligations','Notes payable','Bonds payable','Debt modifications and extinguishments','Issuance of stock','Treasury stock','Dividends','Stock compensation'],
      'FAR-III': ['Five-step model (ASC 606)','Performance obligations','Variable consideration','Contract costs','Lease classification (ASC 842)','Lessee accounting','Lessor accounting','Sale-leaseback transactions','Deferred tax assets and liabilities','Valuation allowance','Uncertain tax positions','Defined benefit plans','Pension expense components','OPEB','Loss contingencies','Gain contingencies','Guarantees','Basic EPS','Diluted EPS','Complex capital structures'],
      'FAR-IV':  ['Measurement focus and basis of accounting','Fund accounting','Budgetary accounting','Statement of Net Position','Statement of Activities','Governmental funds','Proprietary funds','Fiduciary funds'],
      'FAR-V':   ['Statement of Financial Position','Statement of Activities','Statement of Cash Flows','Contributions and pledges','Net asset classifications','Split-interest agreements'],
    },
    aud: {
      'AUD-I':   ['Overall objectives and limitations of an audit','Auditing standards hierarchy','Types of engagements and related standards','AICPA Code of Professional Conduct','Independence requirements','SEC and PCAOB independence rules','Conflicts of interest','Engagement letters and terms','Required communications'],
      'AUD-II':  ['Preliminary engagement activities','Materiality determination','Audit risk model','Industry and regulatory factors','Business operations and strategy','Financial performance measures','Components of internal control','Evaluating design and implementation','IT general and application controls','Identifying and assessing RMM','Significant risks','Fraud risk factors'],
      'AUD-III': ['Relevance and reliability','External confirmations','Analytical procedures','Statistical vs non-statistical sampling','Sample design and selection','Evaluating sample results','Accounting estimates','Related parties','Going concern evaluation','Subsequent events','Internal auditors','Component auditors','Specialists and experts'],
      'AUD-IV':  ['Unmodified opinion','Modified opinions','Emphasis of matter and other matter paragraphs','Comparative financial statements','Examination engagements','Review engagements','Agreed-upon procedures','Compilation engagements','Preparation engagements'],
    },
    reg: {
      'REG-I':   ['Treasury Circular 230','AICPA SSTS','Tax preparer penalties','Filing requirements and deadlines','Statute of limitations','IRS audit process','Taxpayer penalties'],
      'REG-II':  ['Formation and authority of agents','Duties and liabilities','Formation and enforceability','Performance and remedies','Third-party rights','Sole proprietorships','Partnerships','Corporations','LLCs','Secured transactions (UCC Article 9)','Bankruptcy basics'],
      'REG-III': ['Inclusions in gross income','Exclusions from gross income','Above-the-line deductions','Standard vs itemized deductions','Qualified business income (199A)','Filing status determination','Qualifying child/relative tests','Child tax credit','Earned income credit','Education credits','Basis determination','Capital gains and losses','Section 1231 assets','Like-kind exchanges (Section 1031)','Section 121 exclusion'],
      'REG-IV':  ['Formation and capitalization','Taxable income computation','Distributions','Accumulated earnings tax','Personal holding company tax','Eligibility and election (S Corps)','Shareholder basis','Built-in gains tax','Distributions and AAA','Formation and contributions (Partnerships)','Partner basis calculations','Allocations and distributions','Sales and liquidations','Fiduciary income tax','Distributable net income','Simple vs complex trusts','Section 501(c)(3) requirements','Unrelated business income'],
      'REG-V':   ['Basis of assets','Depreciation','Section 179','Bonus depreciation','Capital gains/losses','Section 1231','Like-kind exchanges','Installment sales','Related party transactions'],
    },
    bar: {
      'BAR-I':   ['Acquisition method','Measuring consideration transferred','Recognizing goodwill and bargain purchases','Consolidation procedures','Intercompany transactions','Noncontrolling interests','VIE identification','Primary beneficiary determination'],
      'BAR-II':  ['Complex contract modifications','Principal vs agent considerations','Licenses of IP','Lease modifications','Subleases','Build-to-suit arrangements','Derivative instruments','Hedge accounting','Fair value and cash flow hedges','Foreign currency transactions','Translation of foreign operations','Remeasurement'],
      'BAR-III': ['Capital assets and infrastructure','Long-term liabilities','Pension and OPEB (GASB 68/75)','CAFR/ACFR components','RSI and SI','Reconciliations'],
      'BAR-IV':  ['Ratio analysis','Trend analysis','Prospective financial statements','Cost-volume-profit analysis','Budgeting and forecasting','Variance analysis'],
    },
    isc: {
      'ISC-I':   ['Database fundamentals','Data modeling','Data governance','Hardware and infrastructure','Cloud computing models','Network fundamentals','System lifecycle','Change management','Disaster recovery and BCP'],
      'ISC-II':  ['Threat landscape','Security controls','Encryption and authentication','Logical access controls','Physical access controls','Identity management','Privacy principles','HIPAA requirements','Other privacy regulations'],
      'ISC-III': ['SOC 1 overview and scope','Type 1 vs Type 2 reports','Control objectives','Trust services criteria','SOC 2 reports','SOC 3 reports','Cybersecurity risk management'],
    },
    tcp: {
      'TCP-I':   ['Timing of income recognition','Income shifting strategies','Timing of deductions','Bunching strategies','Capital gains strategies','Qualified opportunity zones','Net investment income tax'],
      'TCP-II':  ['Entity type comparison','Check-the-box regulations','State tax considerations','Reasonable compensation','Retirement plan selection','Fringe benefits','State nexus and apportionment','International tax basics','Transfer pricing concepts'],
      'TCP-III': ['Installment sales','Related party transactions','Like-kind exchange planning','Stock vs asset sales','Section 338 elections','Corporate liquidations'],
      'TCP-IV':  ['Annual exclusion and lifetime exemption','Gift-splitting','Valuation discounts','Estate valuation','Deductions and credits','Portability'],
    },
  },
  ea: {
    see1: {
      'SEE1-1': ['Filing requirements and due dates','Filing status determination','Dependents and dependency tests','Taxpayer identification numbers','Estimated tax requirements'],
      'SEE1-2': ['Wages, salaries, and tips','Interest and dividends','Business income (Schedule C)','Capital gains and losses','Rental and royalty income','Retirement distributions','Social Security benefits'],
      'SEE1-3': ['Above-the-line deductions','IRA contributions','Student loan interest','Standard vs itemized deductions','Schedule A deductions','Nonrefundable credits','Refundable credits (EITC, CTC)'],
      'SEE1-4': ['Tax computation and rates','Alternative minimum tax (AMT)','Self-employment tax','Net investment income tax','Estimated tax payments'],
      'SEE1-5': ['Tax planning strategies','Retirement planning considerations','Education tax benefits','Health savings accounts'],
      'SEE1-6': ['Amended returns (Form 1040-X)','Foreign income and exclusions','Non-resident alien returns'],
    },
    see2: {
      'SEE2-1': ['Sole proprietorships (Schedule C)','Partnerships (Form 1065)','C Corporations (Form 1120)','S Corporations (Form 1120-S)','Entity selection and formation','Basis calculations'],
      'SEE2-2': ['Accounting methods and periods','Business income recognition','Cost of goods sold','Business expenses and deductions','Depreciation and amortization','Section 179 and bonus depreciation','Business credits','Employment tax credits'],
      'SEE2-3': ['Payroll taxes and requirements','Employment tax deposits','Trust fund recovery penalty','Qualified retirement plans','SEP and SIMPLE plans'],
    },
    see3: {
      'SEE3-1': ['Assessment procedures','Statutes of limitations','Collection procedures','Audit selection and types','Examination procedures','Burden of proof'],
      'SEE3-2': ['Circular 230 requirements','Practitioner duties and penalties','Written advice standards','Power of attorney (Form 2848)','Tax information authorization','Limited practice rights'],
      'SEE3-3': ['Appeals procedures','Collection due process (CDP)','Offer in compromise','Innocent spouse relief','Installment agreements','Penalty abatement'],
      'SEE3-4': ['PTIN requirements','E-file requirements','Preparer penalties and due diligence','Information return requirements','FBAR and foreign reporting'],
    },
  },
  cma: {
    cma1: {
      'CMA1-A': ['Financial statements','Recognition, measurement, valuation','SEC filings and FASB updates'],
      'CMA1-B': ['Strategic planning','Budgeting concepts','Forecasting techniques','Budget methodologies'],
      'CMA1-C': ['Cost and variance measures','Responsibility centers','Performance measures','Balanced scorecard'],
      'CMA1-D': ['Measurement concepts','Costing systems','Overhead costs','Supply chain management'],
      'CMA1-E': ['Governance, risk, and compliance','Internal control framework (COSO)','Internal audit function'],
      'CMA1-F': ['Information systems','Data governance','Technology-enabled finance transformation','Data analytics'],
    },
    cma2: {
      'CMA2-A': ['Basic financial statement analysis','Financial ratios','Profitability analysis','Special issues (inflation, foreign currency)'],
      'CMA2-B': ['Risk and return','Long-term financial management','Raising capital','Working capital management'],
      'CMA2-C': ['Cost-volume-profit analysis','Marginal analysis','Pricing','Risk analysis'],
      'CMA2-D': ['Enterprise risk management','Risk identification and mitigation'],
      'CMA2-E': ['Capital budgeting process','Discounted cash flow analysis','Payback and discounted payback','Risk analysis in capital investment'],
      'CMA2-F': ['Business ethics','Ethical considerations for management accountants','IMA Statement of Ethical Professional Practice'],
    },
  },
  cia: {
    cia1: {
      'CIA1-I':   ['Mission of internal audit','Definition of internal auditing','Core principles','Code of Ethics','International Standards'],
      'CIA1-II':  ['Organizational independence','Individual objectivity','Impairments'],
      'CIA1-III': ['Proficiency requirements','Due professional care','Continuing professional development'],
      'CIA1-IV':  ['Internal assessments','External assessments','Reporting on QAIP'],
      'CIA1-V':   ['Corporate governance concepts','Enterprise risk management','Internal control frameworks'],
    },
    cia2: {
      'CIA2-I':   ['Audit planning and strategy','Resource management','Policies and procedures','Coordination and reliance'],
      'CIA2-II':  ['Engagement planning','Engagement objectives','Engagement scope','Resource allocation'],
      'CIA2-III': ['Information gathering','Analysis and evaluation','Documentation','Engagement supervision'],
      'CIA2-IV':  ['Communication criteria and quality','Disseminating results','Monitoring progress'],
    },
    cia3: {
      'CIA3-I':   ['Strategic management','Business processes and structures','Organizational behavior','Management frameworks'],
      'CIA3-II':  ['Information security fundamentals','Information security governance','Security risk assessment','Security controls'],
      'CIA3-III': ['IT governance','IT operations','IT infrastructure','Emerging technologies'],
      'CIA3-IV':  ['Financial accounting and finance','Managerial accounting'],
    },
  },
  cisa: {
    cisa1: {
      'CISA1-A': ['IS Audit Standards and Guidelines','Risk-Based Audit Planning','Audit Objectives and Scope','Audit Resource Management'],
      'CISA1-B': ['Audit Evidence Collection','Sampling Methodologies','Audit Documentation'],
      'CISA1-C': ['Report Structure','Findings and Recommendations','Report Distribution'],
      'CISA1-D': ['COSO Framework','COBIT Framework','Control Objectives'],
      'CISA1-E': ['Computer-Assisted Audit Techniques','Generalized Audit Software','Test Data Methods','Continuous Auditing'],
    },
    cisa2: {
      'CISA2-A': ['IT Governance Frameworks (COBIT, ITIL)','IT Strategy and Business Alignment','Organizational Structure and Roles','IT Policies and Standards'],
      'CISA2-B': ['Risk Assessment Methodologies','Risk Treatment Options','Third-Party Risk Management'],
      'CISA2-C': ['Risk Management Framework','Risk Identification','Risk Analysis','Risk Assessment Practices'],
      'CISA2-D': ['Regulatory Compliance','Privacy Regulations','Business Impact Analysis','RTO/RPO'],
    },
    cisa3: {
      'CISA3-A': ['Project Governance','SDLC Methodologies','Agile and DevOps','Requirements Management'],
      'CISA3-B': ['Secure Coding Practices','Testing Methodologies','Change and Release Management'],
      'CISA3-C': ['Build vs Buy Analysis','RFP Process','Vendor Evaluation','Licensing and Contracts'],
    },
    cisa4: {
      'CISA4-A': ['IT Service Management (ITSM)','Service Level Agreements','Incident and Problem Management','Change and Configuration Management','Infrastructure Operations'],
      'CISA4-B': ['Disaster Recovery Planning (DRP)','Backup and Recovery Strategies','Testing DRP Plans'],
      'CISA4-C': ['Business Impact Analysis (BIA)','Business Continuity Planning (BCP)','Recovery Strategies','BC Testing'],
    },
    cisa5: {
      'CISA5-A': ['Security Program Management','Security Policies and Standards','Security Awareness and Training','Data Classification and Handling'],
      'CISA5-B': ['Identity and Access Management (IAM)','Authentication','Authorization'],
      'CISA5-C': ['Network Security Architecture','Firewalls and IDS/IPS','Network Segmentation','Encryption and Cryptography'],
      'CISA5-D': ['Physical Access Controls','Environmental Controls','Surveillance Systems'],
      'CISA5-E': ['AI/ML Security','Cloud Security','IoT Security','Adversarial Attacks'],
    },
  },
  cfp: {
    'CFP-PCR': {
      'PCR-1': ['CFP Board Code of Ethics','Standards of Conduct (Duties)','Duty of Loyalty','Duty of Care','Duty to Follow Client Instructions','Disciplinary rules and procedures','Practice standards'],
      'PCR-2': ['Fiduciary duty at all times','Material conflicts of interest','Compensation disclosure','Written client agreement requirements','Suitability vs. fiduciary standards'],
    },
    'CFP-GEN': {
      'GEN-1': ['Personal financial statements','Balance sheet analysis','Cash flow statement','Budget development','Emergency fund planning','Financial ratios (liquidity, debt, savings)'],
      'GEN-2': ['529 plans (qualified tuition programs)','Coverdell Education Savings Accounts','UGMA/UTMA accounts','Education tax credits (AOTC, LLC)','Student loan strategies','Financial aid considerations (FAFSA/EFC)'],
      'GEN-3': ['Consumer debt strategies','Mortgage analysis (15 vs 30 year, ARM vs fixed)','Debt consolidation','Credit score optimization','Bankruptcy considerations'],
    },
    'CFP-RISK': {
      'RISK-1': ['Term vs. permanent life insurance','Whole life, universal life, variable life','Needs analysis methods','Policy provisions and riders','Life settlement and viatical options','Group life insurance'],
      'RISK-2': ['Health insurance (individual and group)','HSAs, FSAs, and HRAs','Medicare Parts A, B, C, D','Medigap and Medicare Advantage','Long-term care insurance','Disability income insurance (own-occupation, any-occupation)'],
      'RISK-3': ['Homeowners insurance basics','Auto insurance coverage','Business liability insurance','Risk management techniques'],
      'RISK-4': ['Homeowners policy forms (HO-3, HO-5)','Auto insurance details','Umbrella/excess liability policies','Coinsurance and valuation'],
    },
    'CFP-INV': {
      'INV-1': ['Modern Portfolio Theory','Strategic vs. tactical allocation','Efficient frontier','Risk tolerance assessment','Rebalancing strategies','Diversification principles'],
      'INV-2': ['Equity valuation (P/E, dividend discount)','Bond pricing and yield calculations','Options strategies (calls, puts, covered calls)','Mutual funds and ETFs','Alternative investments (REITs, commodities)','Technical vs. fundamental analysis'],
      'INV-3': ['Performance measurement (HPR, TWR, IRR)','Risk measures (standard deviation, beta, Sharpe ratio)','Active vs. passive management','Dollar-cost averaging','Tax-loss harvesting','Investment policy statements'],
      'INV-4': ['Asset location strategies','Tax-efficient fund placement','Municipal bonds vs. taxable bonds','Capital gains management','Wash sale rules'],
    },
    'CFP-TAX': {
      'TAX-1': ['Filing status determination','Gross income inclusions and exclusions','Above-the-line deductions','Itemized vs. standard deduction','Tax credits (Child Tax Credit, EITC)','AMT calculations','Capital gains taxation (short-term vs. long-term)'],
      'TAX-2': ['Estimated tax payments','Withholding requirements','Tax penalties and interest','Statute of limitations','IRS audit procedures'],
      'TAX-3': ['Charitable contribution deductions','Qualified charitable distributions (QCDs)','Donor-advised funds','Charitable remainder trusts (CRT)','Charitable lead trusts (CLT)','Private foundations'],
    },
    'CFP-RET': {
      'RET-1': ['Eligibility and benefit calculation','Claiming strategies (early, FRA, delayed to 70)','Spousal and survivor benefits','Earnings test and taxation of benefits','Windfall Elimination Provision (WEP)','Government Pension Offset (GPO)'],
      'RET-2': ['401(k), 403(b), 457 plans','Traditional and Roth IRAs','SEP-IRA and SIMPLE IRA','Defined benefit pension plans','Contribution limits and catch-up provisions','Vesting schedules','Required Minimum Distributions (RMDs)'],
      'RET-3': ['Retirement income needs analysis','Withdrawal sequencing (which accounts first)','Roth conversion strategies','72(t) substantially equal periodic payments','Net unrealized appreciation (NUA)','Retirement income sustainability (4% rule, guardrails)'],
    },
    'CFP-EST': {
      'EST-1': ['Types of wills (simple, pour-over, holographic)','Revocable living trusts','Irrevocable trusts (ILIT, GRAT, QPRT)','Powers of attorney (financial, healthcare)','Advance healthcare directives','Probate process and avoidance'],
      'EST-2': ['Annual gift tax exclusion','Lifetime gift tax exemption','Estate tax calculation and exemption','Portability of exemption between spouses','Generation-skipping transfer tax (GSTT)','Valuation discounts'],
      'EST-3': ['Family limited partnerships (FLPs)','Installment sales to grantor trusts','Qualified personal residence trusts (QPRTs)','Grantor retained annuity trusts (GRATs)','Dynasty trusts','Special needs planning'],
    },
    'CFP-PSY': {
      'PSY-1': ['Active listening techniques','Client interview and data gathering','Money scripts and financial attitudes','Crisis counseling (divorce, death, job loss)','Motivational interviewing','Building trust and rapport'],
      'PSY-2': ['Cognitive biases (anchoring, confirmation, recency)','Loss aversion and prospect theory','Mental accounting','Overconfidence and hindsight bias','Framing effects','Heuristics in decision-making'],
    },
  },
};

// ============================================================================
// GEMINI API
// ============================================================================

async function callGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2000,
        },
      }),
    }
  );
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${text}`);
  }
  
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function assignTopics(questions, allTopics, areaTopicMap) {
  // Build prompt with all topics
  const topicList = allTopics.map((t, i) => `${i + 1}. ${t}`).join('\n');
  
  const questionsText = questions.map((q, i) => {
    return `Q${i + 1}: "${q.question.substring(0, 200)}..." [Current: ${q.topic || 'none'}]`;
  }).join('\n\n');
  
  const prompt = `You are an expert exam content mapper. Map each question to the SINGLE most appropriate official blueprint topic.

OFFICIAL BLUEPRINT TOPICS:
${topicList}

QUESTIONS TO MAP:
${questionsText}

For each question, respond with ONLY the topic number (1-${allTopics.length}).
Format: Q1: 5
Q2: 12
Q3: 3
...

Be precise. Choose the topic that BEST matches the question content.`;

  const response = await callGemini(prompt);
  
  // Parse response
  const mappings = {};
  const lines = response.split('\n');
  for (const line of lines) {
    const match = line.match(/Q(\d+):\s*(\d+)/i);
    if (match) {
      const qIndex = parseInt(match[1]) - 1;
      const topicIndex = parseInt(match[2]) - 1;
      if (topicIndex >= 0 && topicIndex < allTopics.length) {
        mappings[qIndex] = allTopics[topicIndex];
      }
    }
  }
  
  return mappings;
}

// ============================================================================
// PROCESSING
// ============================================================================

async function processSection(exam, section, dryRun = false) {
  const filePath = `content/${exam}/${section}/questions.json`;
  if (!fs.existsSync(filePath)) {
    console.log(`  Skipping ${section} - file not found`);
    return { processed: 0, updated: 0 };
  }
  
  const blueprint = BLUEPRINTS[exam]?.[section];
  if (!blueprint) {
    console.log(`  Skipping ${section} - no blueprint defined`);
    return { processed: 0, updated: 0 };
  }
  
  // Build flat topic list with area mapping
  const allTopics = [];
  const areaTopicMap = {};
  for (const [areaId, topics] of Object.entries(blueprint)) {
    for (const topic of topics) {
      allTopics.push(topic);
      areaTopicMap[topic] = areaId;
    }
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const questions = data.questions;
  
  console.log(`  Processing ${section.toUpperCase()}: ${questions.length} questions, ${allTopics.length} blueprint topics`);
  
  let updated = 0;
  
  // Process in batches
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(questions.length / BATCH_SIZE);
    
    process.stdout.write(`    Batch ${batchNum}/${totalBatches}...`);
    
    try {
      const mappings = await assignTopics(batch, allTopics, areaTopicMap);
      
      for (const [qIndex, newTopic] of Object.entries(mappings)) {
        const absIndex = i + parseInt(qIndex);
        const q = questions[absIndex];
        if (q && q.topic !== newTopic) {
          if (!dryRun) {
            q.topic = newTopic;
            // Also update blueprintArea if we have the mapping
            const newArea = areaTopicMap[newTopic];
            if (newArea && q.blueprintArea !== newArea) {
              q.blueprintArea = newArea;
            }
          }
          updated++;
        }
      }
      
      console.log(` mapped ${Object.keys(mappings).length}`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
    
    // Rate limiting
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  
  if (!dryRun && updated > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
  
  return { processed: questions.length, updated };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const examFilter = args.includes('--exam') ? args[args.indexOf('--exam') + 1]?.toLowerCase() : null;
  const sectionFilter = args.includes('--section') ? args[args.indexOf('--section') + 1]?.toLowerCase() : null;
  const dryRun = args.includes('--dry-run');
  
  if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY or VITE_GEMINI_API_KEY environment variable required');
    process.exit(1);
  }
  
  console.log('=== Blueprint Topic Normalizer ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN (no changes)' : 'LIVE'}`);
  console.log('');
  
  const exams = examFilter ? [examFilter] : Object.keys(BLUEPRINTS);
  let totalProcessed = 0;
  let totalUpdated = 0;
  
  for (const exam of exams) {
    const examBlueprint = BLUEPRINTS[exam];
    if (!examBlueprint) {
      console.log(`Skipping ${exam} - no blueprint`);
      continue;
    }
    
    console.log(`\n${exam.toUpperCase()}:`);
    
    const sections = sectionFilter ? [sectionFilter] : Object.keys(examBlueprint);
    
    for (const section of sections) {
      const result = await processSection(exam, section, dryRun);
      totalProcessed += result.processed;
      totalUpdated += result.updated;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`Total processed: ${totalProcessed} questions`);
  console.log(`Total updated: ${totalUpdated} topics`);
  
  if (dryRun) {
    console.log('\n(Dry run - no files modified)');
  }
}

main().catch(console.error);
