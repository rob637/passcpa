const fs = require('fs');
const path = require('path');

const REG_FILE_PATH = path.join(__dirname, '../content/cpa/reg/questions.json');

function fixRegQuestionsBatch6() {
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
    // 1. reg-gen-1018: Installment Sale
    if (q.id === 'reg-gen-1018') {
      q.correctAnswer = 3; // Option D ($125,000)
      q.explanation = "Total Gain = $800k - $300k = $500k. Gross Profit % = $500k / $800k = 62.5%. Year 1 Payment = $200k. Recognized Gain = $200k * 62.5% = $125,000. Unrecaptured Section 1250 gain is a characterization of the gain, not an immediate recognition event like Section 1245 recapture.";
      q.whyWrong = {
        "0": "Option A is WRONG - Incorrect calculation.",
        "1": "Option B is WRONG - Incorrect calculation.",
        "2": "Option C is WRONG - Incorrect calculation.",
        "3": "Option D is CORRECT - Gain recognized in Year 1 is determined by applying the Gross Profit Percentage (62.5%) to the payment received ($200,000)."
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

fixRegQuestionsBatch6();
