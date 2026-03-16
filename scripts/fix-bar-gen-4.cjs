const fs = require('fs');
const path = require('path');

const BAR_FILE = path.join(__dirname, '../content/cpa/bar/questions.json');

function fixBarGenMore() {
  if (!fs.existsSync(BAR_FILE)) {
    console.error('BAR file not found!');
    return;
  }

  const data = fs.readFileSync(BAR_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: bar-gen-1107 (COSO Components)
    if (q.id === 'bar-gen-1107') {
      console.log('Fixing bar-gen-1107...');
      // Key 3 (D) is Correct (QA is not a component).
      // WhyWrong 2 (C) says "CORRECT" (Info & Comm is a component, so it's a WRONG answer to EXCEPT).
      // WhyWrong 3 (D) says "WRONG" (QA is not a component, so it's the CORRECT answer).
      q.whyWrong = {
        "0": "Incorrect. Control Environment IS a COSO component.",
        "1": "Incorrect. Risk Assessment IS a COSO component.",
        "2": "Incorrect. Information and Communication IS a COSO component.",
        "3": "Correct! Quality Assurance is NOT one of the 5 COSO components (Monitoring is the component)."
      };
      fixedCount++;
    }

    // FIX 2: bar-gen-1109 (Variance Threshold)
    if (q.id === 'bar-gen-1109') {
      console.log('Fixing bar-gen-1109...');
      // Variance $5,000. Threshold > $5,000. Equals, does not exceed.
      // 5% of $100k = $5,000. Equals, does not exceed.
      // So NO investigation.
      // Key 2 (C) "No, because...".
      // WhyWrong 1 (B) says "Correct... it equals the threshold... should be investigated".
      // WhyWrong 2 (C) says "Incorrect... it equals...".
      // If the policy is "Exceeds", then Equals means No.
      // If the policy meant "At least", it would say so. "Exceeds" usually means strictly greater.
      // Let's assume strict "Exceeds". So Answer C is correct.
      // WhyWrong 1 is wrong (says investigate). WhyWrong 2 is wrong (says incorrect).
      // Fix WhyWrong.
      q.whyWrong = {
        "0": "Incorrect. It equals but does not exceed the thresholds.",
        "1": "Incorrect. The policy specifies investigation only if the variance EXCEEDS the threshold. Since it equals $5,000, it does not exceed it.",
        "2": "Correct! The variance ($5,000) equals the threshold but does not EXCEED it, so no investigation is required under the strict interpretation of the policy.",
        "3": "Incorrect details."
      };
      fixedCount++;
    }

    // FIX 3: bar-gen-1132 (Break-Even Mix)
    if (q.id === 'bar-gen-1132') {
      console.log('Fixing bar-gen-1132...');
      // Gizmo ($50, VC $30, CM $20). Widget ($30, VC $10, CM $20).
      // Fixed $200k. Mix 2 Gizmos : 1 Widget.
      // WACM = (2 * 20 + 1 * 20) / 3 = 60 / 3 = $20.00.
      // Total units = 200,000 / 20 = 10,000 units.
      // Gizmos = 10,000 * (2/3) = 6,666.67 units.
      // Options: A) 4000, B) 5000, C) 8000, D) 10000.
      // Wait, 6,666 is none of them.
      // Let me re-read "Sales mix 2:1". 
      // Maybe WACM calculated per "bundle"? Bundle = 2G + 1W.
      // Bundle CM = 2*20 + 1*20 = 60.
      // Bundles needed = 200,000 / 60 = 3,333.33 bundles.
      // Gizmos = 3,333.33 * 2 = 6,666.67.
      // Still 6,667.
      // WhyWrong 2 (C) says "Correct... divide total fixed costs... multiply by 8,000".
      // It says "multiply by Gizmo sales mix percentage (2/3) to arrive at 8,000 units".
      // If 8000 is 2/3 of Total, then Total = 12,000.
      // If Total = 12,000, then WACM = 200,000 / 12,000 = $16.67.
      // My WACM was $20. 
      // Did I misread? $50-$30=20. $30-$10=20. Yes.
      // Maybe Text says "sells twice as many Gizmos as Widgets". 2:1.
      // Okay, let's fix the question numbers to make Option C (8000) correct?
      // Or change correct answer to a new Option 6,667?
      // 8,000 is nice round number.
      // To get 8,000 Gizmos, Total units = 12,000. Fixed Cost / WACM = 12,000.
      // $200,000 / $20 = 10,000.
      // If Fixed Cost = $240,000? $240k / 20 = 12,000. 12k * 2/3 = 8,000.
      // Let's change Fixed Costs to $240,000.
      q.question = q.question.replace("$200,000", "$240,000");
      q.correctAnswer = 2; // C (8,000)
      q.explanation = "WACM = (2*20 + 1*20)/3 = $20. Total BE Units = $240,000 / $20 = 12,000 units. Gizmos = 12,000 * (2/3) = 8,000 units.";
      q.whyWrong = {
        "0": "Incorrect.",
        "1": "Incorrect.",
        "2": "Correct! 8,000 units.",
        "3": "Incorrect."
      };
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (!Array.isArray(content)) content.questions = questions;
    fs.writeFileSync(BAR_FILE, JSON.stringify(content, null, 2));
    console.log(`Successfully fixed ${fixedCount} BAR questions (Group 2).`);
  } else {
    console.log('No questions found to fix.');
  }
}

fixBarGenMore();
