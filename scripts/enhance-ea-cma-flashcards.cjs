/**
 * EA and CMA Example Enhancement Script
 * Adds real-world examples to flashcards
 */

const fs = require('fs');
const path = require('path');

// EA tax examples
const eaExamples = {
  // Filing status and basic concepts
  'filing status': 'Single taxpayer earning $60,000 uses standard deduction of $14,600 (2024). Married couple filing jointly with $100,000 income uses $29,200 standard deduction.',
  'standard deduction': 'Single filer age 67: $14,600 + $1,950 (age 65+) = $16,550 total standard deduction for 2024.',
  'itemized deduction': 'Taxpayer has $8,000 mortgage interest, $5,000 state taxes (capped at $10,000 SALT), $3,000 charity = $16,000 itemized. If over standard deduction, itemize.',
  'dependent': 'Child age 17, lives with parents, parents provide 80% support, child earns $4,000 part-time. Child is qualifying child dependent.',
  'qualifying child': 'Daughter age 22, full-time college student, lives at home summers, parents pay tuition/housing. She qualifies as dependent.',
  'qualifying relative': 'Taxpayer supports elderly mother who earns $3,500 Social Security (below $4,700 threshold). Mother is qualifying relative.',
  
  // Income types
  'gross income': 'W-2 wages $75,000 + interest $500 + side business $10,000 + rental income $12,000 = $97,500 gross income before adjustments.',
  'earned income': 'Teacher salary $55,000 + summer tutoring $8,000 = $63,000 earned income. Investment dividends of $2,000 are NOT earned income.',
  'unearned income': 'Portfolio generates $15,000 dividends + $5,000 capital gains + $3,000 interest = $23,000 unearned income, subject to NIIT if over threshold.',
  'capital gain': 'Stock purchased for $10,000, sold for $25,000 after 14 months. Long-term capital gain of $15,000, taxed at 0%/15%/20% based on income.',
  'capital loss': 'Stock sold at $7,000 loss. Deduct $3,000 against ordinary income, carry forward $4,000 to next year.',
  'ordinary income': 'Short-term stock gain (held 8 months) of $5,000 taxed as ordinary income at marginal rate (up to 37%).',
  'dividend': 'Qualified dividends of $10,000 from US corporation taxed at 15% ($1,500) vs ordinary rate of 24% ($2,400) - saves $900.',
  'interest income': 'Savings account pays $500 interest, municipal bond pays $1,000 tax-free interest. Only $500 taxable on federal return.',
  'rental income': 'Rental property: $18,000 rent - $5,000 mortgage interest - $3,000 depreciation - $2,000 repairs = $8,000 net rental income.',
  'self-employment': 'Freelancer earns $80,000. SE tax = $80,000 × 0.9235 × 15.3% = $11,304. Deduct half ($5,652) above-the-line.',
  'social security': 'Single retiree: $30,000 SS + $20,000 pension. Provisional income = $20,000 + $15,000 (half SS) = $35,000. Up to 85% of SS taxable.',
  'alimony': 'Divorce finalized 2017: $24,000 alimony paid is deductible by payer, includible by recipient. Post-2018 divorces: no deduction/inclusion.',
  
  // Deductions and adjustments
  'above-the-line': 'Self-employed health insurance $6,000 + student loan interest $2,500 + SE tax deduction $5,000 = $13,500 adjustments to income.',
  'IRA': 'Traditional IRA: $7,000 contribution reduces taxable income by $7,000. At 24% bracket, saves $1,680 in taxes.',
  'HSA': 'Family HSA contribution $8,300 (2024) is above-the-line deduction. Withdrawals for medical expenses are tax-free.',
  '401(k)': 'Employee contributes $23,000 (2024 limit) to 401(k), reducing W-2 taxable wages. Age 50+ adds $7,500 catch-up.',
  'student loan interest': 'Paid $3,500 student loan interest, MAGI $70,000. Deduct full $2,500 maximum. Phase-out starts at $75,000 single.',
  'educator expense': 'Teacher spends $400 on classroom supplies. Deduct $300 above-the-line (2024 limit).',
  'moving expense': 'Active duty military moves 600 miles for permanent station change. Moving expenses deductible; civilians cannot deduct.',
  
  // Credits
  'child tax credit': 'Two qualifying children ages 8 and 12. CTC = 2 × $2,000 = $4,000. $1,700 per child is refundable (ACTC).',
  'earned income credit': 'Single parent, 2 children, earned income $25,000. EIC approximately $6,600 (refundable credit).',
  'education credit': 'Paid $8,000 tuition for freshman daughter. American Opportunity Credit: $2,500 (100% of first $2,000 + 25% of next $2,000).',
  'american opportunity': 'Student in year 2 of college, $5,000 qualifying expenses paid. AOTC = $2,500, up to $1,000 refundable (40%).',
  'lifetime learning': 'Graduate student pays $4,000 tuition. LLC = 20% × $4,000 = $800 credit. No limit on years claimed.',
  'child and dependent care': 'Paid $10,000 daycare for 2 children. Credit on $6,000 max (2 children). At 20% rate = $1,200 credit.',
  'saver\'s credit': 'Taxpayer with AGI $25,000 contributes $2,000 to IRA. Saver\'s credit = 50% × $2,000 = $1,000.',
  'foreign tax credit': 'Paid $3,000 foreign tax on $20,000 foreign income. Claim FTC up to US tax on that income, avoiding double taxation.',
  'premium tax credit': 'Family of 4, income 200% FPL, buys marketplace insurance. PTC subsidizes monthly premium by $800.',
  
  // Business
  'schedule c': 'Consultant: $120,000 revenue - $30,000 expenses (home office, supplies, travel) = $90,000 Schedule C profit.',
  'home office': 'Home office 200 sq ft, home 2,000 sq ft (10%). Simplified: 200 × $5 = $1,000. Regular: 10% of home expenses.',
  'depreciation': 'Computer $2,500 for business. Section 179 expense entire cost in year 1, or depreciate over 5 years.',
  'section 179': 'Business buys $50,000 equipment. Section 179 allows immediate deduction rather than depreciating over 5-7 years.',
  'qualified business income': 'S-corp owner has $200,000 QBI. Deduction = 20% × $200,000 = $40,000 (subject to limitations).',
  'estimated tax': 'Self-employed expects $15,000 tax liability. Pay $3,750 quarterly (Apr 15, Jun 15, Sep 15, Jan 15) to avoid penalty.',
  'hobby loss': 'Taxpayer sells crafts at loss for 5 years, no profit motive documented. IRS reclassifies as hobby - losses not deductible.',
  
  // Retirement
  'required minimum distribution': 'IRA balance $500,000 at age 73, life expectancy factor 26.5. RMD = $500,000 ÷ 26.5 = $18,868.',
  'roth conversion': 'Convert $50,000 traditional IRA to Roth. Pay $12,000 tax now (24% bracket). Future growth tax-free.',
  'early withdrawal': '401(k) withdrawal at age 45: $20,000. Tax: $4,800 (24%) + penalty: $2,000 (10%) = $6,800 total.',
  'rollover': 'Job change: roll $100,000 from old 401(k) to IRA within 60 days. Direct rollover avoids withholding.',
  
  // Estate and gift
  'gift tax': 'Parent gifts $50,000 to child. $18,000 excluded (2024). $32,000 uses lifetime exemption or triggers Form 709.',
  'estate tax': 'Estate valued at $15 million. Exemption $13.61M. Taxable: $1.39M × 40% = $556,000 federal estate tax.',
  'basis': 'Inherited stock from deceased parent. FMV at death $100,000 (parent paid $30,000). Basis steps up to $100,000.',
  'step-up in basis': 'Inherited home worth $500,000 at death (parent paid $150,000). Sell immediately for $500,000 = $0 capital gain.',
  
  // Partnership/S-Corp
  'partnership': 'Two partners: 60/40 profit split. Partnership earns $200,000. Partner A reports $120,000, Partner B reports $80,000 on K-1.',
  'k-1': 'S-corp shareholder receives K-1 showing $50,000 ordinary income, $5,000 interest. Report on Schedule E, Form 1040.',
  's corporation': 'S-corp earns $300,000. Owner takes $100,000 salary (subject to payroll tax) + $200,000 distribution (no SE tax).',
  'basis': 'S-corp shareholder has $50,000 stock basis. Receives $60,000 distribution: $50,000 tax-free return of basis, $10,000 capital gain.',
  'passive activity': 'Limited partner receives $20,000 loss from partnership but has no passive income to offset. Loss suspended until sale or passive income.',
  
  // Penalties and procedures
  'failure to file': 'Return due Apr 15, filed Jul 15 (3 months late). Penalty: 5% × 3 months = 15% of tax due, max 25%.',
  'failure to pay': 'Tax due Apr 15, paid Jul 15. Penalty: 0.5% per month × 3 = 1.5% of unpaid tax.',
  'accuracy penalty': 'Understated income by $50,000 due to negligence. Accuracy penalty = 20% × additional tax.',
  'fraud penalty': 'Intentional evasion of $100,000 tax. Civil fraud penalty = 75% of underpayment = $75,000.',
  'statute of limitations': 'Filed 2022 return Apr 15, 2023. IRS has until Apr 15, 2026 (3 years) to audit. 6 years if 25% omission.',
  'amended return': 'Discovered missed deduction after filing. File Form 1040-X within 3 years of original due date.',
  'innocent spouse': 'Ex-spouse understated income without knowledge. Request innocent spouse relief to avoid joint liability.',
  'offer in compromise': 'Taxpayer owes $50,000, can only pay $10,000. IRS may accept OIC based on reasonable collection potential.',
  'installment agreement': 'Owes $25,000, cannot pay in full. Set up payment plan: $500/month for 50 months plus interest.',
  'power of attorney': 'EA represents client before IRS using Form 2848. Can sign agreements, receive confidential information.',
  'circular 230': 'EA must comply with due diligence, cannot charge contingent fees for original returns, must return client records.',
};

// CMA management accounting examples
const cmaExamples = {
  // Cost accounting
  'variable cost': 'Direct materials $5/unit, direct labor $8/unit. Produce 10,000 units: total variable costs = $130,000.',
  'fixed cost': 'Factory rent $50,000/year regardless of production. At 10,000 units: $5/unit fixed cost. At 20,000 units: $2.50/unit.',
  'mixed cost': 'Utilities: $2,000 base + $0.50/unit. At 5,000 units: $2,000 + $2,500 = $4,500 total.',
  'contribution margin': 'Product sells for $50, variable costs $30. CM = $20/unit. CM ratio = 40%.',
  'break-even': 'Fixed costs $100,000, CM $25/unit. BEP = $100,000 ÷ $25 = 4,000 units.',
  'target profit': 'Want $50,000 profit, fixed costs $100,000, CM $25. Units needed = ($100,000 + $50,000) ÷ $25 = 6,000 units.',
  'margin of safety': 'Current sales 8,000 units, BEP 5,000 units. Margin of safety = 3,000 units or 37.5%.',
  'operating leverage': 'High fixed costs = high operating leverage. 10% sales increase could mean 30% profit increase.',
  'absorption costing': 'Product cost includes DM $10 + DL $15 + VOH $5 + FOH $8 = $38/unit for inventory valuation.',
  'variable costing': 'Product cost: DM $10 + DL $15 + VOH $5 = $30/unit. FOH $8 expensed as period cost.',
  'standard cost': 'Standard: 2 lbs material @ $5/lb = $10. Actual: 2.2 lbs @ $5.20 = $11.44. Total variance = $1.44 unfavorable.',
  'material variance': 'Price: (Actual $5.20 - Std $5.00) × 2,000 lbs = $400 U. Quantity: (2,200 - 2,000) × $5 = $1,000 U.',
  'labor variance': 'Rate: ($18 actual - $17 std) × 500 hrs = $500 U. Efficiency: (520 - 500 hrs) × $17 = $340 U.',
  'overhead variance': 'Budget: Variable ($5 × 1,000) + Fixed $10,000 = $15,000. Actual $16,200. Variance = $1,200 U.',
  'job costing': 'Custom furniture order: DM $2,000 + DL $1,500 + Applied OH (150% of DL) $2,250 = $5,750 total cost.',
  'process costing': 'Department processed 10,000 units, costs $50,000. Cost per equivalent unit = $5.00.',
  'activity-based costing': 'Setup costs $20,000, 100 setups. Product A (60 setups): $12,000. Product B (40 setups): $8,000.',
  'cost driver': 'Machine hours drive maintenance: $100,000 ÷ 10,000 hours = $10/hour. Product using 500 hours = $5,000.',
  
  // Budgeting
  'master budget': 'Sales $1M → Production 10,000 units → DM purchases $200K → DL $300K → OH $150K → Cash budget → Pro forma statements.',
  'flexible budget': 'Budgeted OH at 10,000 units: $80,000. At 12,000 actual: Flex budget = $72,000 fixed + ($0.80 × 12,000) = $81,600.',
  'static budget': 'Original budget: 10,000 units, $500,000 revenue. Actual: 12,000 units. Static comparison is not meaningful.',
  'variance analysis': 'Sales variance: (12,000 - 10,000 units) × $50 price = $100,000 favorable volume variance.',
  'cash budget': 'Beginning cash $20K + Collections $150K - Disbursements $140K - Debt payment $15K = Ending cash $15K.',
  'capital budget': 'Project requires $500K investment, generates $150K annual cash flow for 5 years. Payback = 3.33 years.',
  'zero-based budgeting': 'Each department justifies entire budget from zero. Marketing must justify $500K vs simply adding 5% to prior year.',
  'rolling budget': 'Q1 ends, drop Q1, add Q5 projections. Always maintain 4-quarter forward view.',
  
  // Performance measurement
  'ROI': 'Division income $200,000, assets $1,000,000. ROI = 20%. Corporate target 15% = division exceeds hurdle.',
  'residual income': 'Division income $200K, assets $1M, 12% cost of capital. RI = $200K - ($1M × 12%) = $80,000.',
  'economic value added': 'NOPAT $500K, capital $2M, WACC 10%. EVA = $500K - ($2M × 10%) = $300,000 value created.',
  'balanced scorecard': 'Financial (ROI 15%), Customer (satisfaction 92%), Process (defect rate 0.5%), Learning (training hours 40).',
  'key performance indicator': 'Call center: average handle time 4 min, first call resolution 85%, customer satisfaction 4.2/5.',
  'transfer pricing': 'Division A: variable cost $60, market price $100. Negotiated transfer price $75 benefits both divisions.',
  'responsibility center': 'Cost center (manufacturing) controls costs only. Profit center (product line) controls revenue and costs.',
  'controllable cost': 'Plant manager controls direct labor, supplies. Cannot control allocated corporate overhead or depreciation.',
  
  // Decision making
  'relevant cost': 'Make vs buy: Relevant costs are avoidable. Fixed overhead allocated is not relevant if continues regardless.',
  'sunk cost': 'Spent $50,000 on R&D. Project decision should ignore this - focus on future incremental costs and benefits.',
  'opportunity cost': 'Use machine for Product A (profit $100K) or B ($120K). Opportunity cost of choosing A = $120K foregone.',
  'incremental analysis': 'Special order: Price $40, variable cost $25. Accept if incremental profit $15/unit exceeds any lost sales.',
  'make or buy': 'Make: $15/unit (DM $6, DL $5, VOH $4). Buy: $13/unit. But if make frees capacity worth $25K, consider fully.',
  'special order': 'Customer offers $35/unit for 5,000 units (normal $50). Variable cost $28. Accept: CM $7 × 5,000 = $35,000 profit.',
  'product mix': 'Limited machine hours: Product A CM $40, 2 hours = $20/hour. Product B CM $30, 1 hour = $30/hour. Prioritize B.',
  'sell or process further': 'Split-off value $10. Process further: additional cost $3, sells for $15. Process: incremental profit $2.',
  'joint cost': '$100K joint cost produces A (60% sales value) and B (40%). Allocate: A = $60K, B = $40K.',
  
  // Capital budgeting
  'net present value': 'Investment $100K, annual CF $30K for 5 years, 10% discount. NPV = $30K × 3.791 - $100K = $13,730. Accept.',
  'internal rate of return': 'Investment $100K returns $30K annually for 5 years. IRR ≈ 15%. If hurdle rate 12%, accept project.',
  'payback period': 'Investment $120K, annual CF $40K. Payback = 3 years. If target 4 years, accept.',
  'profitability index': 'PV of inflows $150K, investment $100K. PI = 1.5. Greater than 1.0, accept project.',
  'hurdle rate': 'Company WACC 10%, project risk premium 2%. Project hurdle rate = 12% for NPV calculation.',
  'cost of capital': 'Debt 40% at 6%, equity 60% at 12%. WACC = (0.40 × 6% × 0.75 tax shield) + (0.60 × 12%) = 9%.',
  'capital rationing': 'Budget $500K. Project A: NPV $80K, cost $200K. Project B: NPV $100K, cost $400K. Choose A+smaller projects.',
  
  // Financial analysis
  'ratio analysis': 'Current ratio 2.5:1 (good liquidity). Debt/equity 0.8 (moderate leverage). ROE 18% (strong profitability).',
  'current ratio': 'Current assets $500K, current liabilities $200K. Current ratio = 2.5. Above 2.0 indicates good liquidity.',
  'quick ratio': 'CA $500K - Inventory $150K = $350K. CL $200K. Quick ratio = 1.75. Good short-term liquidity.',
  'debt to equity': 'Total debt $800K, equity $1M. D/E = 0.8. Industry average 1.2 = company is conservatively financed.',
  'inventory turnover': 'COGS $600K, average inventory $100K. Turnover = 6 times. Days in inventory = 61 days.',
  'receivables turnover': 'Credit sales $1.2M, average AR $150K. Turnover = 8 times. Collection period = 46 days.',
  'gross margin': 'Revenue $1M, COGS $600K. Gross margin = $400K (40%). Industry average 35% = company outperforms.',
  'operating margin': 'Operating income $150K, revenue $1M. Operating margin = 15%. Indicates operational efficiency.',
  'dupont analysis': 'ROE = Profit margin (5%) × Asset turnover (1.5) × Equity multiplier (2.0) = 15%.',
  
  // Risk and ethics
  'risk management': 'Identify: currency exposure. Assess: $2M potential loss. Respond: hedge with forward contracts.',
  'internal control': 'Segregation: requester ≠ approver ≠ receiver. Reconciliation: monthly bank recs. Authorization: spending limits.',
  'fraud triangle': 'CFO diverted funds: Opportunity (access to accounts), Rationalization (underpaid), Pressure (gambling debt).',
  'IMA ethics': 'Management accountant discovers fraud. Follow protocol: supervisor → audit committee → legal counsel → resign if unresolved.',
  'competence': 'CMA maintains 30 CPE hours annually. If asked to perform work outside expertise, seek assistance or decline.',
  'confidentiality': 'Accountant cannot share company cost data with competitor, even after leaving position, unless legally required.',
  'integrity': 'Pressure to book revenue early. CMA refuses, documents proper cutoff, escalates to audit committee if needed.',
  'credibility': 'Present unfavorable variance analysis honestly to management. Disclose all relevant information, favorable and unfavorable.',
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
const eaResult = enhanceCourse('ea', eaExamples);
const cmaResult = enhanceCourse('cma', cmaExamples);

console.log('\n=== SUMMARY ===');
console.log(`EA: ${eaResult.withExample}/${eaResult.total} have examples (${Math.round(eaResult.withExample/eaResult.total*100)}%)`);
console.log(`CMA: ${cmaResult.withExample}/${cmaResult.total} have examples (${Math.round(cmaResult.withExample/cmaResult.total*100)}%)`);
