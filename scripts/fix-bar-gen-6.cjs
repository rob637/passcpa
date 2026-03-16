const fs = require('fs');
const path = require('path');

const BAR_FILE = path.join(__dirname, '../content/cpa/bar/questions.json');

function fixBarGenGroup4() {
  if (!fs.existsSync(BAR_FILE)) {
    console.error('BAR file not found!');
    return;
  }

  const data = fs.readFileSync(BAR_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: bar-gen-1243 (Regression Range)
    if (q.id === 'bar-gen-1243') { // Range $482k to $578k
      console.log('Fixing bar-gen-1243...');
      q.correctAnswer = 2; // C (Change text to correct range)
      q.options = [
        "Between $480,000 and $580,000",
        "Between $530,000 and $630,000",
        "Between $482,000 and $578,000", // Correct
        "Between $500,000 and $600,000"
      ];
      q.explanation = "Sales range: $600,000 +/- 10% = $540,000 to $660,000. Low Collections = $50,000 + 0.8($540,000) = $482,000. High Collections = $50,000 + 0.8($660,000) = $578,000.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Incorrect.",
        "2": "Correct! The range is derived by applying the +/- 10% sales deviation to the regression equation.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 2: bar-gen-1269 (Pro Forma NI)
    if (q.id === 'bar-gen-1269') { // $7.6M
      console.log('Fixing bar-gen-1269...');
      // Calculation: 5 + 2 + 0.5 + 0.3 - 0.2 = 7.6.
      // Option A is $7.6M. Key was 3 (D).
      // WhyWrong 0 says "WRONG" (but logic says correct). WhyWrong 1 says "CORRECT... is $7.6M" (but Option B is $7.8M).
      // Explanation was for Break-Even.
      q.correctAnswer = 0; // A ($7.6M)
      q.explanation = "Pro Forma NI = Apex NI ($5M) + Beta NI ($2M) + Cost Synergies ($0.5M) + Revenue Synergies ($0.3M) - Interest Expense ($0.2M) = $7.6M.";
      q.whyWrong = {
        "0": "Correct! $5M + $2M + $0.5M + $0.3M - $0.2M = $7.6M.",
        "1": "Incorrect.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 3: bar-gen-1271 (Variance Threshold)
    if (q.id === 'bar-gen-1271') {
      console.log('Fixing bar-gen-1271...');
      // Variance: $43,500 - $40,000 = $3,500.
      // Policy: Exceeds $5,000 OR 10% ($4,000). Whichever is LARGER.
      // Larger threshold is $5,000.
      // Does $3,500 exceed $5,000? No.
      // So Do Not Investigate.
      // Key 3 (D) "No... less than percentage threshold".
      // Percent threshold is $4,000. $3,500 < $4,000. Correct.
      // But relevant threshold is $5,000.
      // Option A: "No... less than both". ($3,500 < $4,000 AND < $5,000). This is the best answer.
      // WhyWrong 0 (A) says "Incorrect... exceeds percentage". (False. 3500 < 4000).
      // WhyWrong 3 (D) says "Incorrect... exceeds percentage". (False).
      // Explanation talks about Break-Even (Wrong).
      // Let's set Key to 0 (A).
      q.correctAnswer = 0; 
      q.explanation = "The policy requires investigation if the variance exceeds the LARGER of $5,000 or 10% of budget ($4,000). The applicable threshold is $5,000. Variance is $3,500. Since $3,500 < $5,000, no investigation is needed. Note that it is also less than the percentage threshold.";
      q.whyWrong = {
        "0": "Correct! The variance ($3,500) does not exceed either the dollar threshold ($5,000) or the percentage threshold ($4,000).",
        "1": "Incorrect. It does not exceed the dollar threshold.",
        "2": "Incorrect. It does not exceed the percentage threshold.",
        "3": "Incorrect logic. It does not exceed the percentage threshold."
      };
      fixedCount++;
    }

    // FIX 4: bar-gen-1310 (Segment Reporting)
    if (q.id === 'bar-gen-1310') {
      console.log('Fixing bar-gen-1310...');
      // 75% Test Calculation.
      // Reportable segments must equal 75% of Consolidated Revenue.
      // Segments: Alpha $20 + Beta $35 + Gamma $15 = $70M total segment revenue.
      // If $70M is the total external revenue, does it meet 75%?
      // Question: "What is the MINIMUM amount of total revenue that must be reported...".
      // Usually, this implies Consolidated Revenue is known, and we check if Segment Revenue >= 75% of Consol.
      // Or, if Total Consolidated Revenue is unknown?
      // "Omega Corp... has three ... segments...".
      // Total Revenue = $20+35+15 = $70M (assuming no other segments).
      // Question likely asks: To satisfy the test, how much revenue must the *reportable* segments have?
      // Answer is 75% of Consolidated Revenue.
      // If Consolidated Revenue is $70M (sum of these), then 75% is $52.5M.
      // Since $70M > $52.5M, we report $70M.
      // Wait. Maybe the question implies there are OTHER segments not listed?
      // "What is the minimum amount... that must be reported by all reportable segments?"
      // If these are the ONLY segments, they are all reportable (10% test).
      // Alpha ($20/$70 > 10%), Beta ($35/$70 > 10%), Gamma ($15/$70 > 10%).
      // So all 3 are reportable. Total reported = $70M.
      // Explanation talks about Fair Value Option (Totally wrong).
      // WhyWrong 3 (D/75M) discusses "If consolidated revenue is $100M...".
      // But the problem doesn't state consolidated revenue.
      // Let's assume the question meant "If consolidated revenue is X...".
      // But text says "Omega... with three...".
      // If we assume the segments cover 100% of revenue, then 70M.
      // Let's rewrite the question to be clearer or fix the logic.
      // Let's assume Consolidated Revenue is given as $100M in the missing context, OR
      // implied these are just "some" segments.
      // Actually, simplest fix: "Consolidated revenue is $80 million."
      // Then 75% of $80M = $60M.
      // Options: $52.5M, $60M, $70M, $75M.
      // If Consol is $80M, we need $60M. We have $70M reportable.
      // So reportable is $70M.
      // "Minimum amount... that must be reported". This usually refers to the threshold itself ($60M) vs actual ($70M).
      // Threshold is the legal minimum.
      // Let's ensure the question provides Consolidated Revenue.
      q.question += " Total consolidated revenue for the year is $80 million.";
      q.correctAnswer = 1; // $60 million
      q.explanation = "The 75% Revenue Test requires that total revenue from reportable segments must be at least 75% of total consolidated revenue. 75% of $80 million = $60 million.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Correct! 75% of $80M = $60M.",
        "2": "Incorrect. This is the sum of the segments given.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 5: bar-gen-1311 (Segment Reporting Additional)
    if (q.id === 'bar-gen-1311') {
      console.log('Fixing bar-gen-1311...');
      // Alpha $15, Beta $22, Gamma $13. Total = $50M.
      // Delta $4M.
      // Consol = $60M.
      // 75% of $60M = $45M.
      // Current Reportable (Alpha+Beta+Gamma) = $50M.
      // $50M > $45M.
      // So the test is satisfied.
      // Additional revenue needed = $0.
      // Key 1 (B) is "$11 million".
      // WhyWrong 2 (C/$15M) says "Correct... no additional revenue needed...".
      // BUT WhyWrong 2 is for Option C ($15M). Why does it say "no additional revenue"?
      // The text in WhyWrong 2 contradicts itself ("Therefore... Delta's revenue of $4M").
      // It's a mess.
      // Logic: 
      // 10% Test: $60M * 10% = $6M.
      // Alpha ($15), Beta ($22), Gamma ($13) are Reportable. (All > $6M).
      // Delta ($4) is NOT reportable by 10% test.
      // Sum Reportable = $15+22+13 = $50M.
      // 75% Test: 75% * 60 = $45M.
      // $50M >= $45M. Test Met.
      // Additional needed = $0.
      // Option A is $0.
      q.correctAnswer = 0; // A ($0)
      q.explanation = "Step 1: Identify Reportable Segments (10% test). 10% of $60M = $6M. Alpha ($15), Beta ($22), Gamma ($13) are reportable. Delta ($4) is not. Step 2: 75% Test. Sum of Reportable = $50M. Threshold = 75% of $60M = $45M. Since $50M > $45M, the test is satisfied. Additional revenue needed = $0.";
      q.whyWrong = {
        "0": "Correct! The existing reportable segments ($50M) exceed the 75% threshold ($45M).",
        "1": "Incorrect.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (!Array.isArray(content)) content.questions = questions;
    fs.writeFileSync(BAR_FILE, JSON.stringify(content, null, 2));
    console.log(`Successfully fixed ${fixedCount} BAR questions (Group 4).`);
  } else {
    console.log('No questions found to fix.');
  }
}

fixBarGenGroup4();
