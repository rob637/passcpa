const fs = require('fs');
const path = require('path');

const BAR_FILE = path.join(__dirname, '../content/cpa/bar/questions.json');

function fixBarGen3() {
  if (!fs.existsSync(BAR_FILE)) {
    console.error('BAR file not found!');
    return;
  }

  const data = fs.readFileSync(BAR_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: bar-gen-0989 (CCC Calculation)
    if (q.id === 'bar-gen-0989') {
      console.log('Fixing bar-gen-0989...');
      // CCC = 60.83 + 36.5 - 45.625 = 51.7 days.
      // Options did not have 51.7.
      // Option A was 54.2. Change A to 51.7.
      q.correctAnswer = 0;
      q.options[0] = "51.7 days";
      
      q.explanation = "DIO = 365/6 = 60.8 days. DSO = 365/10 = 36.5 days. DPO = 365/8 = 45.6 days. CCC = 60.8 + 36.5 - 45.6 = 51.7 days.";
      q.whyWrong = {
        "0": "Correct! 60.8 + 36.5 - 45.6 = 51.7 days.",
        "1": "Incorrect calculation.",
        "2": "Incorrect calculation.",
        "3": "Incorrect calculation."
      };
      fixedCount++;
    }

    // FIX 2: bar-gen-1035 (Internal Service Fund Op Income)
    if (q.id === 'bar-gen-1035') {
      console.log('Fixing bar-gen-1035...');
      // Op Income = $500k - $400k - $50k = $50k.
      // Key 0 (A) is $50k. Correct.
      // Fix Explanation (was wrong topic) and WhyWrong (text was swapped).
      q.explanation = "Operating income for an internal service fund is Operating Revenues - Operating Expenses. $500,000 (Billings) - $400,000 (Direct Costs) - $50,000 (Depreciation) = $50,000.";
      q.whyWrong = {
        "0": "Correct! $500,000 - $400,000 - $50,000 = $50,000.",
        "1": "Incorrect. This neglects depreciation.", // $100k would be if you forgot $50k depr
        "2": "Incorrect calculation.",
        "3": "Incorrect. This is gross revenue."
      };
      fixedCount++;
    }

    // FIX 3: bar-gen-1054 (ROE)
    if (q.id === 'bar-gen-1054') {
      console.log('Fixing bar-gen-1054...');
      // ROE = (NI - PrefDiv) / Avg Equity
      // ($500k - $50k) / (($2M + $2.5M)/2) = $450k / $2.25M = 20%.
      // Key 0 (A) is 20%. Correct.
      // Fix Explanation (was copy-pasted wrong topic).
      q.explanation = "Return on Common Equity = (Net Income - Preferred Dividends) / Average Common Equity. ($500,000 - $50,000) / [($2,000,000 + $2,500,000) / 2] = $450,000 / $2,250,000 = 0.20 or 20%.";
      q.whyWrong = {
        "0": "Correct! ($500k - $50k) / $2.25M = 20%.",
        "1": "Incorrect. This result might come from odd adjustments.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (!Array.isArray(content)) content.questions = questions;
    fs.writeFileSync(BAR_FILE, JSON.stringify(content, null, 2));
    console.log(`Successfully fixed ${fixedCount} BAR questions (gen series).`);
  } else {
    console.log('No questions to fix found.');
  }
}

fixBarGen3();
