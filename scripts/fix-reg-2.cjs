const fs = require('fs');
const path = require('path');

const REG_FILE_PATH = path.join(__dirname, '../content/cpa/reg/questions.json');

function fixRegQuestionsBatch2() {
  const rawData = fs.readFileSync(REG_FILE_PATH, 'utf8');
  let data = JSON.parse(rawData);
  // Handle object structure with questions array
  let questions = Array.isArray(data) ? data : data.questions;
  
  if (!questions) {
    console.error("Could not find questions array in JSON");
    process.exit(1);
  }

  let fixedCount = 0;

  questions = questions.map(q => {
    // 1. reg-elite-002: Hobby Loss Presumption
    if (q.id === 'reg-elite-002') {
      // Current state: Mixed up with COD question.
      q.question = "Mark enjoys woodworking as a hobby. He occasionally sells his creations. Under IRC §183, his woodworking activity is presumed to be a for-profit business (shifting the burden of proof to the IRS) if:";
      q.options = [
        "The activity generates a profit in at least 3 of the last 5 consecutive tax years.",
        "The activity generates a profit in at least 1 of the last 5 consecutive tax years.",
        "Mark works more than 500 hours per year in the activity.",
        "Mark maintains a separate bank account for the activity."
      ];
      q.correctAnswer = 0;
      q.subtopic = "Hobby vs. Business";
      q.explanation = "Under IRC §183, an activity is presumed to be for profit if it shows a profit in at least 3 out of the last 5 consecutive tax years (2 out of 7 for breeding/racing horses). This presumption shifts the burden of proof to the IRS to show it is a hobby.";
      q.whyWrong = {
        "0": "Why option A is CORRECT - The '3 out of 5 years' profit test creates a rebuttable presumption that the activity is engaged in for profit.",
        "1": "Why option B is WRONG - One year of profit is insufficient to trigger the presumption.",
        "2": "Why option C is WRONG - 500 hours is a test for material participation under passive activity loss rules, not the hobby loss presumption.",
        "3": "Why option D is WRONG - While a separate bank account suggests a businesslike manner (a factor in the analysis), it does not by itself create the statutory presumption."
      };
      fixedCount++;
    }

    // 2. reg-ext-136: Holder in Due Course
    if (q.id === 'reg-ext-136') {
      // Options:
      // A: With notice... (Wrong)
      // B: With defenses... (Wrong)
      // C: For value, good faith, no notice... (Correct)
      // D: From original maker... (Wrong)
      // CorrectAnswer: 2 (C).
      // WhyWrong 2 says: "Why option C is CORRECT...".
      // This question looks correct actually.
      // Why was it flagged?
      // "whyWrong[2] says 'CORRECT' but correctAnswer=1?" - No, I don't see that in the audit report snippet I read, but maybe earlier.
      // Let's check the JSON I read in previous turn.
      // "correctAnswer": 2.
      // "whyWrong": { "2": "Why option C is CORRECT..." }
      // This matches. 
      // Maybe I misread the audit grep or it was a false positive in my manual check.
      // Wait, let's re-read the grep of the audit report.
      // I grep'd for "REG" in the audit report.
      // reg-ext-136 was in the list.
      // Line 829: #### `reg-ext-136` (REG)
      // Let's look at the specific error in the audit report for `reg-ext-136`.
    }

    // 3. reg-wc-191: S Corp Basis
    if (q.id === 'reg-wc-191') {
      // Yr 1: Stock Basis $18k, Debt Basis $12k. Loss $35k.
      // Stock $18k -> $0. Used $18k. Rem Loss $17k.
      // Debt $12k -> $0. Used $12k. Rem Loss $5k (Suspended).
      // Basis end Yr 1: Stock $0, Debt $0. Suspended $5k.
      // Yr 2: Income $10k.
      // Income restores Debt Basis first (up to original amount).
      // Debt Basis $0 + $10k = $10k.
      // Stock Basis remains $0.
      // Can we use suspended loss?
      // Suspended loss $5k requires basis.
      // We have Debt Basis $10k.
      // Can suspended losses be taken against restored debt basis?
      // Yes, IRC 1366(d).
      // If we use $5k loss, Debt Basis reduces? 
      // Wait, netting rules.
      // Basis is increased by income items first ($10k).
      // Debt Basis becomes $10k.
      // Then distributions (none).
      // Then losses/deductions ($5k suspended).
      // We have $10k debt basis. We can take the $5k loss.
      // Taking $5k loss reduces debt basis from $10k to $5k.
      // End result: Stock $0, Debt $5k.
      // Options:
      // A: Stock $0, Debt $5k.
      // B: Stock $10k, Debt $12k.
      // C: Stock $5k, Debt $0.
      // D: Stock $0, Debt $12k.
      // Correct Answer should be A ($0, $5k).
      // Current JSON:
      // "correctAnswer": 3 (D).
      // "whyWrong": 
      // 0 (A): "Option A is CORRECT because..." 
      // 3 (D): "Option D is WRONG because..."
      // So the label 0 says CORRECT, but correctAnswer is 3.
      // This is a "whyWrong labeling mismatch" AND a wrong correctAnswer pointer.
      // Action: Set correctAnswer to 0. 
      // Verify Explanation: "Therefore, the debt basis increases to $12,000" -- Explanation is wrong currently!
      // The explanation says: "$10,000 income restores ... The $5,000 suspended loss ... is next allowed ... therefore debt basis increases to $12,000"?? No.
      // Income increases basis. Loss decreases basis.
      // Income $10k -> Debt Basis $10k.
      // Loss $5k -> Debt Basis $5k.
      // Explanation seems to think income restores basis AND the loss doesn't reduce it? Or maybe it thinks the loss was already taken? No, it was suspended.
      // Correct logic:
      // 1. Restore Debt Basis with Income: $0 -> $10k.
      // 2. Deduct Suspended Loss: $10k - $5k = $5k.
      // Final: Debt $5k, Stock $0.
      
      q.correctAnswer = 0;
      q.explanation = "Year 1: $18k stock basis and $12k debt basis absorb $30k of the $35k loss. $5k loss is suspended. Basis is $0/$0. Year 2: $10k income restores debt basis first. Debt basis becomes $10k. Then, the $5k suspended loss is deducted against the available $10k debt basis. Debt basis becomes $5k ($10k - $5k). Stock basis remains $0.";
      q.whyWrong = {
        "0": "Option A is CORRECT - Income calculates first to restore debt basis ($10,000). Then suspended losses are deducted ($10,000 - $5,000 = $5,000 ending debt basis).",
        "1": "Option B is WRONG - Incorrect order or calculation.",
        "2": "Option C is WRONG - Income restores debt basis before stock basis.",
        "3": "Option D is WRONG - Fails to reduce the restored basis by the utilized suspended loss."
      };
      fixedCount++;
    }
    
    return q;
  });

  if (Array.isArray(data)) {
    data = questions;
  } else {
    data.questions = questions;
  }

  fs.writeFileSync(REG_FILE_PATH, JSON.stringify(data, null, 2));
  console.log(`Fixed ${fixedCount} REG questions in ${REG_FILE_PATH}`);
}

fixRegQuestionsBatch2();
