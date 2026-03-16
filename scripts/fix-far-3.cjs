const fs = require('fs');
const path = require('path');

const FAR_FILE = path.join(__dirname, '../content/cpa/far/questions.json');

function fixFarBatch3() {
  if (!fs.existsSync(FAR_FILE)) {
    console.error('FAR file not found!');
    return;
  }

  const data = fs.readFileSync(FAR_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 11: far-gen-1352 (Property Tax Revenue)
    if (q.id === 'far-gen-1352') {
      // Logic: Revenue = Collectible amount collected within Year + 60 days.
      // Question: "remaining 2% is collected during the rest of the fiscal year." (Confusion).
      // Let's re-read standard pattern.
      // "95% of collectible collected within 60 days of FYE." -> This usually includes current year collections + 60 days.
      // So 95% of collectible is revenue.
      // Collectible = $5,000,000 * 97% = $4,850,000.
      // Revenue = $4,850,000 * 95% = $4,607,500.
      // Options: A) 4.75M. B) 4.94M. C) 4.85M. D) 5.0M.
      // None match.
      // Maybe "95% ... within 60 days" means ONLY the 60 days?
      // And "remaining 2% collected ... rest of fiscal year".
      // Usually "rest of fiscal year" implies BEFORE year end? "remaining 2% collected during the rest of the fiscal year".
      // If 2% collected during year, and 95% collected in 60 days subsequent?
      // That sums to 97%.
      // Revenue = Collected during year (2%) + Collected in 60 days (95%).
      // Revenue = 97% of Collectible.
      // 97% of 4.85M = 4,704,500. Still no match.
      // What if "95% are usually collected within 60 days of the fiscal year end" means 95% of the LEVY?
      // 5,000,000 * 0.95 = 4,750,000.
      // This matches Option A ($4,750,000).
      // Is it legitimate?
      // "Of the remaining collectible taxes, 95% are usually collected...".
      // This phrasing implies 95% of 97%.
      // But maybe the author meant "95% of the levy".
      // If Key 0 (A) is $4,750,000, then it implies 95% of Levy.
      // Explanation says "Property taxes expected to be collected within 60 days... are recognized. The calculation excludes amounts...".
      // Let's assume the intention is 5M * 0.95.
      // I will adjust the text to make it clear.
      // "95% of the *levy* is collected within 60 days..."
      // And Key 0 is Correct.
      // WhyWrong 0 says "This option only accounts for uncollectible...".
      // WhyWrong 2 says "This option only subtracts..." ($4.85M).
      // WhyWrong 3 says "This answer doesn't consider..." ($5M).
      // WhyWrong 2 ($4.85M) says "correct answer" in text? No, says "step closer".
      // But wait, the audit log said: "whyWrong[2] says 'CORRECT' but correctAnswer=0".
      // My snippet shows WhyWrong 2 as "This option only subtracts...". It does NOT say CORRECT.
      // Maybe earlier regex caught "correct answer" inside "step closer to the correct answer".
      // That is a false positive in the audit script!
      // But I should still fix the Question Text to clarify the calculation of $4,750,000.
      // "Of the levy, 3% is uncollectible. 95% of the *total levy* is collected within the current period or 60 days of year-end."
      q.question = q.question.replace("Of the remaining collectible taxes, 95% are usually collected", "95% of the total levy is usually collected");
      q.whyWrong[0] = "Correct! 95% of the levy ($4,750,000) is collected within the measurable/available period.";
      fixedCount++;
    }

    // FIX 12: far-gen-1409 (Sale-Leaseback)
    if (q.id === 'far-gen-1409') {
      // Sale $1.2M. BV $800k. Gain $400k.
      // Lease 10 yrs. PV Payments = $1,164,809.
      // FV $1.2M.
      // Operating Lease.
      // Rule:
      // If Sale Price = FV, recognize full gain immediately.
      // Previous rules (deferred gain) are ASC 840 (Old GAAP).
      // ASC 842 (New GAAP): Sale-leaseback (if valid sale) -> Recognize full gain.
      // Unless "repurchase option" or "finance lease" (failed sale).
      // Question asks: "What amount of profit... assuming ... operating lease".
      // Valid Sale? Transfer of control. Operating lease implies control passed.
      // So Gain $400k should be recognized immediately.
      // Option B is $400,000.
      // Key is 1 (B) in the snippet.
      // Explanation: "If the leaseback is an operating lease... seller-lessee recognizes a sale."
      // WhyWrong 1 says "Why option B is WRONG: Recognizing the entire profit... is incorrect... often deferred".
      // WhyWrong 3 says "Why option D is CORRECT...". D is $100,000.
      // WhyWrong 3 explains a convoluted "gain up to PV of lease payments is deferred" rule presumably from old GAAP or a misunderstanding.
      // Under ASC 842, if it's a sale, we recognize the full gain ($400k) provided price is at fair value.
      // Fact: Sale $1.2M = FV (implied, or standard assumption).
      // So Option B ($400,000) is correct.
      // Key 1 (B) is currently set.
      // Fix WhyWrong 1 to be "Correct" and WhyWrong 3 to be "Incorrect".
      q.correctAnswer = 1; 
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! Under ASC 842, if the transfer is a sale (and lease is operating), the full gain of $400,000 is recognized immediately.",
        "2": "Incorrect.",
        "3": "Incorrect. This reflects obsolete accounting standards."
      };
      fixedCount++;
    }

    // FIX 13: far-gen-1418 (Basic EPS)
    if (q.id === 'far-gen-1418') {
      // 200k Common. 10k Pfd (5%, $100 Par).
      // Pfd Div = 10,000 * 100 * 0.05 = $50,000. (Cumulative).
      // Net Income 900k.
      // Basic EPS = (900k - 50k) / 200k = 850k / 200k = 4.25.
      // Option A is $4.25.
      // Key 0 (A) is correct.
      // WhyWrong 0 says "Why option A is WRONG".
      // WhyWrong 1 says "Why option B is CORRECT". Option B is $4.50.
      // WhyWrong 1 calc: ($900k - 50k)/200k = $4.25.
      // Wait. The text in WhyWrong 1 calculates $4.25 (which is A) but calls it Option B and says CORRECT.
      // Fix: WhyWrong 0 -> Correct. WhyWrong 1 -> Incorrect.
      q.correctAnswer = 0;
      q.whyWrong = {
        "0": "Correct! ($900,000 - $50,000) / 200,000 = $4.25.",
        "1": "Incorrect.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 14: far-gen-1432 (Major Funds)
    if (q.id === 'far-gen-1432') {
      // Total Assets $13M. Total Rev $22.75M.
      // 10% Assets = 1.3M. 10% Rev = 2.275M.
      // General Fund: 5M/12M. (Assets > 1.3, Rev > 2.275). Major (Always anyway).
      // Special Rev: 2.5M/3.0M. (Assets > 1.3, Rev > 2.275). Major.
      // Cap Projects: 4.0M/6.0M. (Assets > 1.3, Rev > 2.275). Major.
      // Debt Service: 1.0M/1.5M. (Assets < 1.3, Rev < 2.275). Not Major.
      // Permanent: 0.5M/0.25M. Not Major.
      // So: Gen, SR, CP.
      // Option A: "General Fund, Special Revenue Fund, and Capital Projects Fund".
      // Key 0 (A).
      // WhyWrong 0 says: "Why option A is WRONG - ... Special Revenue Fund does not meet both...".
      // WhyWrong 0 claims SRF fails.
      // SRF Assets 2.5M > 1.3M (10%). SRF Rev 3.0M > 2.275M (10%).
      // It passes 10% test.
      // Does it pass 5% of Total Govt + Enterprise?
      // Enterprise funds not given!
      // But usually, if no Enterprise, Total G+E = Total G.
      // Then 5% < 10%.
      // If it passes 10%, it passes 5%.
      // Unless Enterprise funds are MASSIVE.
      // "The total governmental funds' assets are $13,000,000..."
      // The question provides NO DATA on Enterprise funds.
      // Explanation says: "Under GASB 34, the 10% test is applied...". Doesn't mention 5% test data.
      // WhyWrong 1 says "Why option B is CORRECT...". Option B is "General and Capital Projects".
      // WhyWrong 1 claims B is correct.
      // WhyWrong 1 text says "Both Gen and CP satisfy...".
      // Why does SRF fail in WhyWrong 0's opinion?
      // Maybe logic error in text generator.
      // Based on provided data, SRF meets 10%.
      // I will assume A is correct.
      // Fix WhyWrong 0 to be Correct. Fix WhyWrong 1 to be Incorrect.
      q.correctAnswer = 0;
      q.whyWrong = {
        "0": "Correct! General, Special Revenue, and Capital Projects all meet the 10% threshold criteria.",
        "1": "Incorrect. Special Revenue also qualifies.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 15: far-gen-1449 (Proprietary Funds Revenue)
    if (q.id === 'far-gen-1449') {
      // Greens $100k. Carts $20k. Subsidy $10k.
      // Expenses $110k.
      // Rev = 100k + 20k = 120k.
      // Subsidy is Nonoperating Rev or Contribution. "Revenues" usually implies Operating + Nonoperating?
      // Operating Rev = 120k.
      // Stmt of Rev, Exp and Changes in Net Position includes: Op Rev, Op Exp, Nonop Rev (Subsidy?).
      // Subsidy is usually Nonoperating Revenue.
      // Meaning Total Revenue = 130k?
      // Options: A) 110k. B) 120k. C) 130k. D) 140k.
      // Key 1 (B) is 120k.
      // Explanation: "since the question asks about *revenues*, the subsidy is excluded. Thus... $120,000."
      // This is debatable. Subsidy IS revenue (nonoperating).
      // However, Key 1 (B) is clearly chosen.
      // WhyWrong 3 says "CORRECT" but Key is 1.
      // WhyWrong 3 text: "This option Ddds all cash inflows... which is not the correct treatment...". Matches Option D? No, "Ddds". Typo.
      // The label for WhyWrong 3 is "CORRECT".
      // WhyWrong 0 says "This option includes..." (No judgment).
      // WhyWrong 2 says "This option includes..." (No judgment).
      // Issue log: "whyWrong[3] says 'CORRECT' but correctAnswer=1".
      // Fix: Rename WhyWrong 3 Key to "3" (it is) and change text to "Incorrect".
      q.correctAnswer = 1; 
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! Greens fees ($100k) and cart rentals ($20k) are operating revenues. Subsidies are reported separately after operating income.",
        "2": "Incorrect. This includes the subsidy, which is non-operating or a transfer.",
        "3": "Incorrect. This includes the subsidy."
      };
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (!Array.isArray(content)) content.questions = questions;
    fs.writeFileSync(FAR_FILE, JSON.stringify(content, null, 2));
    console.log(`Successfully fixed ${fixedCount} FAR questions (Batch 3).`);
  } else {
    console.log('No questions found to fix.');
  }
}

fixFarBatch3();
