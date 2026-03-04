const fs = require('fs');
const path = require('path');

const BAR_FILE = path.join(__dirname, '../content/cpa/bar/questions.json');

function fixBarLastGroup() {
  if (!fs.existsSync(BAR_FILE)) {
    console.error('BAR file not found!');
    return;
  }

  const data = fs.readFileSync(BAR_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: bar-gen-1366 (Reportable Segments Logic)
    if (q.id === 'bar-gen-1366') {
      console.log('Fixing bar-gen-1366...');
      // Alpha $4M + $1M = $5M.
      // Beta $2.5M + $0.5M = $3M.
      // Gamma $2M (external) + Delta $1M + Epsilon $1M + Zeta $0.5M = ?
      // Total Revenue = Sum of all segments internal + external.
      // Explanation lists total revenue = $11,000,000.
      // 10% threshold = $1,100,000.
      // Alpha: $5M > $1.1M (Reportable).
      // Beta: $3M > $1.1M (Reportable).
      // Gamma: $2M > $1.1M (Reportable).
      // Delta: $1M < $1.1M (Not Reportable).
      // Epsilon: $1M < $1.1M (Not Reportable).
      // Zeta: $0.5M < $1.1M (Not Reportable).
      // Answer: Alpha, Beta, Gamma.
      // Options: A) Alpha, Beta, Gamma, Delta. B) Alpha, Beta, Gamma. C) Alpha, Beta. D) All.
      // Key 1 is "Alpha, Beta, Gamma".
      // Explanation is coherent.
      // What broke?
      // WhyWrong 0 (A) says "Correct... Alpha, Beta, Gamma are reportable". Wait, Option A included Delta.
      // WhyWrong 1 (B) says "Incorrect... does not include Delta". But B EXCLUDES Delta. And B is the right answer.
      // So Option B is the right list, but WhyWrong 1 says it's WRONG.
      // WhyWrong 0 is "Correct..." but Option A is WRONG (includes Delta).
      // Swapped WhyWrongs?
      // Let's set Key to 1 (B) - "Alpha, Beta, Gamma".
      q.correctAnswer = 1; 
      q.whyWrong = {
        "0": "Incorrect. Delta ($1M) falls below the 10% threshold ($1.1M).",
        "1": "Correct! Alpha ($5M), Beta ($3M), and Gamma ($2M) all exceed the $1.1M threshold.",
        "2": "Incorrect. Gamma is also reportable.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 2: bar-gen-1368 (CTA reporting)
    if (q.id === 'bar-gen-1368') {
      console.log('Fixing bar-gen-1368...');
      // Reportable Rev: North America ($100), Europe ($80), Asia ($30). Total = $210M.
      // All are > 10% of $210M ($21M). So all reportable.
      // CTA = Beg Debit $2M. Variance (decrease in debit?) or decrease in adjustment?
      // "CTA decreased by $500,000".
      // Debit balance decreases -> Credit $500k. New Debit = $1.5M.
      // Or does "CTA" value decrease (Credit $2M -> $2.5M??) Usually means absolute balance.
      // Options A/D say balance $2.5M. Option C say $1.5M.
      // Explanation says: "Subtract $500,000... resulting in $1.5 million debit".
      // Key 2 (C) matches $1.5M CTA. But C says "Revenue: $100M (North America only)". Bad.
      // Key 0 (A) says Revenue $210M... Balance $2.5M.
      // We need: Revenue $210M AND Balance $1.5M.
      // None of the options have this combo.
      // Option A: Rev $210M, Bal $2.5M.
      // Option B: Rev $210M, Bal in Net Income (Wrong).
      // Option C: Rev $100M, Bal $1.5M.
      // Option D: Rev $180M, Bal $2.5M.
      // Let's fix Option A to have Balance $1.5M and make it correct.
      q.correctAnswer = 0;
      q.options[0] = "Revenue: $210 million; CTA: Included in accumulated other comprehensive income (AOCI) with a balance of $1.5 million debit";
      q.explanation = "All 3 segments are reportable (each > 10% of $210M). Total Revenue = $210M. CTA Debit $2.0M decreased by $0.5M = $1.5M Debit in AOCI.";
      q.whyWrong = {
        "0": "Correct! Revenue includes all segments. CTA is $1.5M Debit in AOCI.",
        "1": "Incorrect. CTA is not in Net Income.",
        "2": "Incorrect. All segments are reportable.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 3: bar-gen-1383 (Reportable Threshold)
    if (q.id === 'bar-gen-1383') {
      console.log('Fixing bar-gen-1383...');
      // Total $90M. 10% = $9M.
      // Key 0 (A) is $7.5M.
      // Key 2 (C) is $22.5M.
      // Explanation says "10% of $90M is $9 million...".
      // WhyWrong 2 talks about $90k vs $9M.
      // Options: A) $7.5M, B) $15M, C) $22.5M, D) $90M.
      // None is $9M.
      // Change Option B to $9 million. Set Key 1 (B).
      q.correctAnswer = 1;
      q.options[1] = "$9 million";
      q.explanation = "The 10% Revenue Test threshold is 10% of the combined revenue of all internal and external operating segments. 10% of $90 million = $9 million.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! 10% of $90M = $9M.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 4: bar-gen-1421 (Break-Even)
    if (q.id === 'bar-gen-1421') { // 30,000 units.
      console.log('Fixing bar-gen-1421...');
      // Text: Fixed $390k + $30k (avoidable??) = $420k.
      // WACM = $14.50.
      // BE Units = $420,000 / $14.50 = 28,965.5.
      // Options: 28k, 30k, 32k.
      // 29k is closer to 28965.
      // Explanation: "Rounds to 29,000 units. Closest answer is 30,000 units."
      // Let's make an option exactly 29,000.
      q.options[1] = "29,000";
      q.correctAnswer = 1; 
      q.explanation = "WACM = $14.50. Fixed Costs = $420,000. BE Point = $420,000 / $14.50 = 28,965.5 units ~ 29,000 units.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! 28,966 rounded to 29,000.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 5: bar-gen-1475 (10% Profit Test)
    if (q.id === 'bar-gen-1475') {
      console.log('Fixing bar-gen-1475...');
      // Profits: $600 + $400 + $150 = $1,150.
      // Losses: $250 + $50 = $300.
      // Greater is $1,150.
      // 10% = $115,000.
      // Segments:
      // A ($600 > 115) - Yes.
      // B ($400 > 115) - Yes.
      // C ($250 loss > 115 abs) - Yes.
      // D ($150 > 115) - Yes.
      // E ($50 loss < 115) - No.
      // Reportable: A, B, C, D.
      // Options A) A, B, D. B) A, B, C, D. C) A, B. D) All.
      // Key 1 (B) matches A, B, C, D.
      // Explanation seems okay.
      // WhyWrong 1 (B) "Why option B is CORRECT". OK.
      // WhyWrong 0 (A) "Incorrect... C is also reportable (Loss $250k > $115k)". OK.
      // What was the issue?
      // Log says Key was 1.
      // Ah, the Explanation block text was actually "The profit or loss test requires..."
      // But ID bar-gen-1475 matches.
      // Maybe I just need to verify the Logic.
      // "The total profit... $1,150,000... Threshold $115,000."
      // "Segment C has loss of $250,000". |250| > 115. Yes.
      // "Segment E has loss of $50,000". |50| < 115. No.
      // "Segment D has profit of $150,000". 150 > 115. Yes.
      // So A, B, C, D.
      // Seems consistent. I will re-save to be safe and clean up any text weirdness.
      q.explanation = "Threshold is 10% of the greater of absolute combined profit ($1,150,000) or absolute combined loss ($300,000). Threshold = $115,000. Segment C (Loss $250,000) and Segment D (Profit $150,000) both exceed $115,000 in absolute value, so they are reportable along with A and B. Segment E ($50,000) is not.";
      fixedCount++;
    }

    // FIX 6: bar-gen-1491 (Revenue Test)
    if (q.id === 'bar-gen-1491') {
      console.log('Fixing bar-gen-1491...');
      // Alpha $7M, Beta $14M, Gamma $4M. Total $25M.
      // 10% of 25M = $2.5M.
      // All segments ($7M, $14M, $4M) > $2.5M.
      // All are reportable.
      // Options: A) Beta only. B) Alpha and Beta. C) Alpha, Beta, Gamma.
      // Key 0 (A) "Beta only". Wrong.
      // WhyWrong 1 (B) "Correct... Alpha and Beta...". Wrong (Gamma is also reportable).
      // WhyWrong 2 (C) "Wrong... Gamma exceeds threshold...". Wait, C says "Alpha, Beta and Gamma". So C is the right answer.
      // WhyWrong 2 says "Wrong" but describes why it should be right?
      // "Gamma's revenue... making it also reportable. The explanation incorrectly states..."
      // So Option C is the correct answer.
      q.correctAnswer = 2; // C
      q.explanation = "Total Revenue = $25,000,000. 10% Threshold = $2,500,000. Alpha ($7M), Beta ($14M), and Gamma ($4M) all exceed the threshold.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Incorrect.",
        "2": "Correct! All three segments exceed the 10% revenue threshold.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 7: bar-gen-1494 (Subsequent Events)
    if (q.id === 'bar-gen-1494') { // $300k vs $500k adjustment.
      console.log('Fixing bar-gen-1494...');
      // Event 1: Bankruptcy of customer (15% AR). Existing condition (financial trouble). Adjusting.
      // Amount = 15% of AR balance. AR balance NOT GIVEN.
      // Text says "15% of ABC Corp's 2023 accounts receivable balance".
      // We don't know the dollar amount!
      // Event 2: Lawsuit settled for $500k (accrued $300k). Adjustment = $200k expense.
      // Options: A) $200k. B) $300k. C) $500k.
      // Explanation says: "accounts receivable write-off is 15%... and lawsuit liability adjustment is $200k... totaling $300k".
      // This implies the write-off was $100k.
      // Meaning 15% of AR = $100k -> AR = $666,666.
      // Or maybe the options imply the write-off amount is $100k?
      // Key 0 is $200k. WhyWrong 0 says "False... fails to include AR write-off".
      // Key 1 is $300k. WhyWrong 1 says "Correct... total $300k".
      // So the intended answer is $300,000.
      // We need to provide the AR balance so 15% = $100,000.
      // Or just state "A customer owing $100,000...".
      // Let's modify the question to specify the dollar amount of the AR write-off.
      q.question = q.question.replace("representing 15% of ABC Corp's 2023 accounts receivable balance filed for bankruptcy", "owing $100,000 filed for bankruptcy");
      q.correctAnswer = 1; // B ($300k)
      q.explanation = "Adjusting events: 1) Bankruptcy ($100,000 write-off). 2) Lawsuit ($200,000 additional expense). Total adjustment = $300,000.";
      q.whyWrong = {
        "0": "Incorrect. This omits the AR write-off.",
        "1": "Correct! $100,000 (AR) + $200,000 (Lawsuit) = $300,000.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 8: bar-gen-1513 (Intercompany Land Sale)
    if (q.id === 'bar-gen-1513') {
      console.log('Fixing bar-gen-1513...');
      // Alpha sold to Beta (owned by son of CEO). Related party.
      // Sale $500k. Cost $300k. Gain $200k.
      // GAAP: Recognize gain, but DISCLOSE related party nature.
      // Option A: "Gain of $200k should be recognized...".
      // Option B: "Gain of $500k...".
      // Option C: "Gain of $300k...".
      // Option D: "Disclosed but not quantified".
      // Key 0 (A) is correct.
      // WhyWrong 0 says "WRONG - ... gain may not be recognized at all... or differently".
      // This is confusing. Usually, sales to related parties are recognized if the exchange is valid, but disclosure is the key exam point.
      // However, Key 0 (A) is the only one with the mathematically correct Pre-Tax Gain ($200k).
      // The WhyWrong 0 text saying it's WRONG is the defect.
      // We will keep Key 0 (A) and fix the WhyWrong text to say "Correct".
      q.correctAnswer = 0;
      q.explanation = "GAAP requires transactions with related parties to be recognized (typically at the exchange price) and disclosed. The gain is $500,000 - $300,000 = $200,000.";
      q.whyWrong = {
        "0": "Correct! The transaction is recognized, resulting in a $200,000 gain, and the related party nature must be disclosed.",
        "1": "Incorrect.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 9: bar-gen-1594 (Break-Even Beta)
    if (q.id === 'bar-gen-1594') { // Beta BE.
      console.log('Fixing bar-gen-1594...');
      // Alpha ($50/$30 CM$20). Beta ($80/$40 CM$40).
      // Sales Mix 2:1.
      // WACM = (2*20 + 1*40)/3 = (40+40)/3 = $26.67.
      // Fixed $600,000.
      // Total units = 600,000 / 26.67 = 22,500 units.
      // Beta units = 22,500 * (1/3) = 7,500 units.
      // Options: 5k, 10k, 15k, 20k.
      // None is 7,500.
      // WhyWrong 1 (B/10k) says "Correct... divide total BE by 3".
      // If result is 10k, Total = 30k.
      // If Total 30k, WACM must be $20. (600k / 30k).
      // If WACM = $20, then (2*20 + 1*40)/3 = 80/3 = 26.67...
      // Wait. Maybe Sales Mix is 1:1? No "Twice as many Alpha".
      // Maybe Alpha CM is $10? $50 - $40? No, variable is $30.
      // Maybe Beta CM is $20?
      // Let's adjust the question to make 10,000 units correct.
      // If Beta = 10,000. Total = 30,000. WACM = $20.
      // (2*20 + 1*40)/3 = 26.67.
      // If we change Mix to 1:1? (20+40)/2 = 30. 600k/30 = 20k units. Beta = 10k.
      // Yes! If Mix is 1:1 ("Equal number of units"), then Beta = 10,000.
      // Let's change "sells twice as many units" to "sells an equal number of units".
      q.question = q.question.replace("sells twice as many units of Alpha as Beta", "sells an equal number of units of Alpha and Beta");
      q.correctAnswer = 1; // B (10,000)
      q.explanation = "WACM (1:1 mix) = ($20 + $40) / 2 = $30. Total BE Units = $600,000 / $30 = 20,000 units. Beta (50%) = 10,000 units.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! Total units 20,000. Beta is half (10,000).",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 10: bar-gen-1596 (Sales Mix Variance)
    if (q.id === 'bar-gen-1596') {
      console.log('Fixing bar-gen-1596...');
      // Budget: 60% Alpha, 40% Beta. (Mix .6 / .4). Total not given but Actual is 2000.
      // Actual: 1000 Alpha, 1000 Beta. Total 2000. (Mix .5 / .5).
      // CM: Alpha $10. Beta $15.
      // Shift: Sold LESS Alpha (Low CM) and MORE Beta (High CM).
      // Shift towards High CM = Favorable.
      // Variance = Sum [ (Actual Mix % - Budget Mix %) * Total Actual Units * CM ] ??
      // Or: (Actual Qty - (Total Actual * Budget Mix)) * CM.
      // Alpha: (1000 - (2000 * 0.6)) * 10 = (1000 - 1200) * 10 = -200 * 10 = -$2,000.
      // Beta: (1000 - (2000 * 0.4)) * 15 = (1000 - 800) * 15 = 200 * 15 = +$3,000.
      // Net Variance = +$1,000 Favorable.
      // Options: 2000 U, 2000 F, 5000 U, 5000 F.
      // None is $1,000.
      // WhyWrong 3 (D/$5000F) calc shows: "-$2,000 + $3,000 = $1,000 favorable".
      // But Option D is $5,000 F !
      // So calculation gives $1,000 F, but Option is wrong.
      // Let's change Option D to "$1,000 Favorable".
      q.correctAnswer = 3; // D
      q.options[3] = "$1,000 Favorable";
      q.explanation = "Variance = Alpha: (1000 - 1200)*$10 = -$2,000. Beta: (1000 - 800)*$15 = +$3,000. Net = +$1,000 Favorable.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Incorrect.",
        "2": "Incorrect.",
        "3": "Correct! The shift to the higher-margin product (Beta) created a $1,000 increased profit."
      };
      fixedCount++;
    }

    // FIX 11: bar-9k-002 (NPV)
    if (q.id === 'bar-9k-002') {
      console.log('Fixing bar-9k-002...');
      // Cash flows: -200k. +60k/1.1 + 80k/1.21 + 90k/1.331 + 70k/1.4641.
      // PV1 = 54,545. PV2 = 66,116. PV3 = 67,618. PV4 = 47,811.
      // Sum PV = 236,090.
      // NPV = 236,090 - 200,000 = +36,090.
      // Options: A) 17,850. B) 15,920. C) 20,340. D) 22,560.
      // None match.
      // WhyWrong 1 (B) "Option B is correct". $15,920.
      // The Explanation text is totally wrong (Variance Analysis again).
      // Let's assume the question is valid and update the Options/Answer.
      // Answer $36,090.
      q.correctAnswer = 1; // B
      q.options[1] = "$36,090";
      q.explanation = "PV = 60/1.1 + 80/1.1^2 + 90/1.1^3 + 70/1.1^4 - 200 = 236,090 - 200,000 = $36,090.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! NPV is approximately $36,090.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (!Array.isArray(content)) content.questions = questions;
    fs.writeFileSync(BAR_FILE, JSON.stringify(content, null, 2));
    console.log(`Successfully fixed ${fixedCount} BAR questions (Final Group).`);
  } else {
    console.log('No questions found to fix.');
  }
}

fixBarLastGroup();
