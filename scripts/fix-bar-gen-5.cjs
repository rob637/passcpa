const fs = require('fs');
const path = require('path');

const BAR_FILE = path.join(__dirname, '../content/cpa/bar/questions.json');

function fixBarGenGroup3() {
  if (!fs.existsSync(BAR_FILE)) {
    console.error('BAR file not found!');
    return;
  }

  const data = fs.readFileSync(BAR_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: bar-gen-1175 (CCC Calculation)
    if (q.id === 'bar-gen-1175') {
      console.log('Fixing bar-gen-1175...');
      // CCC = 67 days. Options were bad.
      q.correctAnswer = 1; // B
      q.options[1] = "67 days";
      
      q.explanation = "DIO = 365/6 = 60.8 days. DSO = 365/10 = 36.5 days. DPO = 365/12 = 30.4 days. CCC = 60.8 + 36.5 - 30.4 = 66.9 days ~ 67 days.";
      q.whyWrong = {
        "0": "Incorrect. 67 days is the correct calculation.",
        "1": "Correct! 60.8 + 36.5 - 30.4 = 66.9 days, rounded to 67.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }

    // FIX 2: bar-gen-1205 (Variance Threshold)
    if (q.id === 'bar-gen-1205') {
      console.log('Fixing bar-gen-1205...');
      // Variance $20,000.
      // 5% of $500k = $25,000.
      // Dollar Limit = $10,000.
      // Lower of ($25k, $10k) is $10,000.
      // Does $20,000 exceed $10,000? Yes.
      // So Investigate because it exceeds the Dollar threshold.
      // Key 0 says "Investigate... exceeds BOTH". ($20k < $25k, so NO).
      // Key 3 says "Investigate... exceeds dollar threshold". (This is the most accurate reason).
      // WhyWrong 1 (B) claims "lower threshold is the percentage threshold" ($25k < $10k?? No).
      // WhyWrong mentions "dollar threshold is $10,000".
      // Let's fix Options to be clear.
      q.correctAnswer = 3; // D
      q.explanation = "The policy requires investigation if the variance exceeds the LOWER of 5% of standard ($25,000) or $10,000. The lower threshold is $10,000. Since the variance ($20,000) exceeds $10,000, it must be investigated.";
      q.whyWrong = {
        "0": "Incorrect. The variance ($20,000) does NOT exceed the percentage threshold ($25,000).",
        "1": "Incorrect. It does NOT exceed the percentage threshold.",
        "2": "Incorrect. It exceeds the dollar threshold.",
        "3": "Correct! The variance ($20,000) exceeds the applicable threshold allowed by the 'lower of' rule ($10,000)."
      };
      fixedCount++;
    }

    // FIX 3: bar-gen-1219 (TIE Ratio)
    if (q.id === 'bar-gen-1219') {
      console.log('Fixing bar-gen-1219...');
      // EBIT = NI + Int + Tax = $500k + $100k + $200k = $800k.
      // TIE = EBIT / Int = $800k / $100k = 8.0.
      // Options: 8.5, 6.5, 7.5, 5.0.
      // None is 8.0.
      // WhyWrong 0 says "Correct... = 8.0. Closest is 8.5".
      // Key is 1 (6.5).
      // Fix Option A to 8.0 and Key to 0.
      q.correctAnswer = 0;
      q.options[0] = "8.0";
      q.explanation = "Times Interest Earned = (Net Income + Interest Expense + Income Tax Expense) / Interest Expense. ($500,000 + $100,000 + $200,000) / $100,000 = $800,000 / $100,000 = 8.0.";
      q.whyWrong = {
        "0": "Correct! EBIT ($800,000) / Interest ($100,000) = 8.0.",
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
    console.log(`Successfully fixed ${fixedCount} BAR questions (Group 3).`);
  } else {
    console.log('No questions found to fix.');
  }
}

fixBarGenGroup3();
