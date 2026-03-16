/**
 * CIA/CFP Flashcard Enhancement Script
 * Adds examples and improves content quality
 */

const fs = require('fs');
const path = require('path');

// Example templates for CIA
const ciaExamples = {
  'three lines': 'At a manufacturing company: 1st line = plant managers owning production risks, 2nd line = corporate risk and compliance, 3rd line = internal audit providing independent assurance.',
  'assurance engagement': 'Internal audit evaluates IT general controls over financial reporting systems, providing independent assessment to audit committee.',
  'consulting engagement': 'Management asks internal audit to advise on control design for a new ERP implementation before go-live.',
  'risk assessment': 'Audit team rates IT security as high inherent risk due to sensitive data, medium control risk due to existing safeguards, resulting in significant audit coverage.',
  'audit universe': 'Complete inventory: 15 business processes, 8 IT systems, 12 compliance areas, 5 major projects - each scored by risk for annual planning.',
  'audit plan': 'Annual plan includes 4 IT audits, 6 operational audits, 3 compliance reviews based on risk scores and available audit hours (8,000 hours).',
  'engagement planning': 'Auditor reviews prior findings, interviews process owner, maps key controls, assesses risks, and determines sample sizes before fieldwork.',
  'working papers': 'Auditor documents: (1) objectives, (2) scope, (3) procedures performed, (4) evidence gathered, (5) conclusions reached - all reviewed by supervisor.',
  'sampling': 'From 10,000 purchase orders, auditor selects 60 random items to test approval controls, providing 95% confidence level.',
  'control testing': 'Auditor selects 25 access requests, verifies manager approval exists on each, documents 2 exceptions found.',
  'observation': 'Auditor observes inventory count at warehouse, noting count procedures, handling of discrepancies, and physical security.',
  'interview': 'Auditor interviews accounts payable manager about invoice approval process, documenting responses and comparing to policy.',
  'finding': 'Condition: 15% of access requests lacked approval. Criteria: Policy requires manager approval. Cause: New system lacked workflow. Effect: Unauthorized access risk. Recommendation: Implement approval workflow.',
  'root cause': 'Repeated inventory variances traced to root cause: inadequate training on barcode scanning procedures for night shift workers.',
  'fraud': 'Red flags: vendor with PO Box address, same person approves and pays invoices, no competitive bidding on large contracts.',
  'fraud triangle': 'Employee scheme: Opportunity (sole custody of petty cash), Rationalization (underpaid), Pressure (gambling debts).',
  'segregation of duties': 'Incompatible duties separated: purchasing agent cannot approve their own purchases, AP clerk cannot add vendors, and treasury cannot record transactions.',
  'compensating control': 'Small company cannot segregate receivables duties, so implements compensating control: owner reviews all customer payment postings weekly.',
  'monitoring': 'Management reviews monthly KPIs: transaction error rates, control exception reports, and employee access certification status.',
  'governance': 'Board-level audit committee reviews: internal audit charter, risk assessment results, significant findings, and CAE performance.',
  'independence': 'CAE reports functionally to audit committee (approves charter, plan, evaluates performance) and administratively to CEO (day-to-day operations).',
  'objectivity': 'Auditor who previously managed IT operations waits one year before auditing that area to maintain objectivity.',
  'IIA standards': 'Standard 1100 Independence: Internal audit activity must be independent, and auditors must be objective in performing work.',
  'QAIP': 'Quality program includes: ongoing monitoring (supervision, checklists), periodic self-assessments, and external assessment every 5 years.',
  'value proposition': 'Audit identified $2M in duplicate payments, recommended process improvements saving 40 hours weekly, and provided assurance on SOX compliance.',
  'risk appetite': 'Board sets appetite: willing to accept moderate IT risk for innovation, low appetite for compliance risk, zero appetite for fraud risk.',
  'inherent risk': 'Cash handling has high inherent risk due to liquidity and theft susceptibility, regardless of controls in place.',
  'control risk': 'Manual approval process has higher control risk than automated workflow with system-enforced segregation.',
  'risk treatment': 'Options: Accept (within appetite), Mitigate (add controls), Transfer (insurance), Avoid (discontinue activity).',
  'KRI': 'Key Risk Indicators: number of failed login attempts, % of overdue invoices, employee turnover rate in critical roles.',
  'data analytics': 'Auditor uses ACL to analyze 500,000 transactions, identifying 127 duplicate payment records totaling $45,000.',
  'CAAT': 'Computer-assisted technique: test data through payroll system verifying calculations, or embedded audit module flagging exceptions.',
  'continuous auditing': 'Automated scripts run nightly comparing disbursements to approved vendor list, alerting auditors to exceptions.',
};

// Example templates for CFP
const cfpExamples = {
  'time value': 'Investing $10,000 at 7% for 10 years: FV = $10,000 × (1.07)^10 = $19,672. The $9,672 gain represents the time value of money.',
  'compound interest': 'Monthly compounding: $10,000 at 6% annual rate compounded monthly for 5 years: FV = $10,000 × (1 + 0.06/12)^60 = $13,489.',
  'present value': 'To have $50,000 in 10 years at 5% return: PV = $50,000 / (1.05)^10 = $30,696 needed today.',
  'annuity': 'Saving $500/month for 30 years at 7%: FV = $500 × [((1.0058)^360 - 1) / 0.0058] = $566,765.',
  'retirement': 'Client needs $80,000/year for 25-year retirement. At 4% withdrawal rate, requires $2,000,000 portfolio at retirement.',
  'social security': 'Full retirement age 67, monthly benefit $2,500. Claiming at 62: $2,500 × 0.7 = $1,750/month (30% reduction).',
  'required minimum distribution': 'IRA balance $500,000, age 73, life expectancy factor 26.5: RMD = $500,000 / 26.5 = $18,868 annual distribution.',
  'estate tax': '2024 exemption: $13.61M per person. Estate of $15M: taxable amount $1.39M × 40% = $556,000 federal estate tax.',
  'gift tax': 'Annual exclusion $18,000 (2024). Parent gifts $50,000: $32,000 uses lifetime exemption or triggers gift tax.',
  'trust': 'Revocable trust: client transfers home, avoids probate, retains control. Irrevocable: removes assets from estate but loses control.',
  'life insurance': 'Term: $1M coverage, 20-year term, $50/month. Whole life: $500,000 coverage, $400/month, builds cash value.',
  'disability insurance': 'Client earns $120,000. Policy: 60% income replacement, 90-day elimination period, benefits to age 65.',
  'long-term care': 'Policy: $200/day benefit, 3-year benefit period, 90-day elimination. Lifetime benefit: $219,000.',
  'asset allocation': 'Moderate risk tolerance: 60% stocks (domestic/international), 35% bonds, 5% cash. Rebalance quarterly.',
  'diversification': 'Portfolio: US large cap 30%, US small cap 10%, international 15%, emerging markets 5%, bonds 35%, REITs 5%.',
  'risk tolerance': 'Questionnaire scores: time horizon 10+ years (high), loss tolerance 15% (moderate), income stability high → moderate-aggressive allocation.',
  'standard deviation': 'Fund A: 10% return, 15% std dev. Fund B: 10% return, 8% std dev. Fund B offers same return with less volatility (risk).',
  'beta': 'Stock with beta 1.2: if market rises 10%, expect stock to rise 12%. More volatile than market.',
  'alpha': 'Portfolio returned 12%, expected return (based on beta) was 10%. Alpha = 2%, indicating manager outperformance.',
  'sharpe ratio': 'Portfolio: 12% return, 3% risk-free rate, 15% std dev. Sharpe = (12% - 3%) / 15% = 0.60. Higher is better.',
  'expense ratio': 'Index fund: 0.05% ER. Active fund: 1.2% ER. On $100,000, difference is $1,150/year in fees.',
  'tax-loss harvesting': 'Sell position with $10,000 loss to offset $10,000 capital gain, saving $1,500 in taxes (15% rate).',
  'Roth conversion': 'Convert $50,000 traditional IRA to Roth, pay $11,000 tax (22% bracket). Future growth tax-free.',
  '401k': 'Client contributes $23,000 (2024 limit) plus $7,500 catch-up (age 50+). Employer matches 50% up to 6% of salary.',
  'IRA': 'Traditional: $7,000 contribution (2024), tax-deductible if income eligible. Roth: after-tax, tax-free withdrawals.',
  'college savings': '529 plan: $10,000/year for 18 years at 7% = $339,000. Tax-free for qualified education expenses.',
  'FAFSA': 'Expected Family Contribution based on parent income, assets. Student assets count 20%, parent assets 5.64%.',
  'fiduciary': 'CFP professional managing $500,000 must recommend lowest-cost index funds if appropriate, not high-commission products.',
  'suitability': 'Recommending aggressive growth fund to 75-year-old retiree seeking income would violate suitability standards.',
  'emergency fund': '3-6 months expenses. Client spends $5,000/month: maintain $15,000-$30,000 in liquid savings.',
  'FIRE': 'Financial Independence: Save 50% of income, invest aggressively, target 25× annual expenses ($1M for $40K/year spending).',
};

function enhanceCourse(courseName, exampleTemplates) {
  const filePath = path.join(__dirname, '..', 'content', courseName, 'flashcards.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let cards = data.flashcards || data;
  
  console.log(`\n=== ${courseName.toUpperCase()} ENHANCEMENT ===`);
  console.log(`Processing ${cards.length} cards...`);
  
  let examplesAdded = 0;
  
  cards.forEach(card => {
    if (!card.example) {
      const combined = (card.front + ' ' + card.back).toLowerCase();
      
      for (const [keyword, example] of Object.entries(exampleTemplates)) {
        if (combined.includes(keyword.toLowerCase())) {
          card.example = example;
          examplesAdded++;
          break;
        }
      }
    }
  });
  
  // Write back
  const output = data.flashcards ? { flashcards: cards } : cards;
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  
  // Count cards with examples
  const withExample = cards.filter(c => c.example).length;
  console.log(`Examples added: ${examplesAdded}`);
  console.log(`Total with examples: ${withExample} (${Math.round(withExample/cards.length*100)}%)`);
  
  return { examplesAdded, total: cards.length, withExample };
}

// Run enhancements
const ciaResult = enhanceCourse('cia', ciaExamples);
const cfpResult = enhanceCourse('cfp', cfpExamples);

console.log('\n=== SUMMARY ===');
console.log(`CIA: ${ciaResult.withExample}/${ciaResult.total} have examples (${Math.round(ciaResult.withExample/ciaResult.total*100)}%)`);
console.log(`CFP: ${cfpResult.withExample}/${cfpResult.total} have examples (${Math.round(cfpResult.withExample/cfpResult.total*100)}%)`);
