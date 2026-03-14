const fs = require('fs');
const path = require('path');

const BAR_FILE = path.join(__dirname, '../content/cpa/bar/questions.json');

function fixBAR() {
  if (!fs.existsSync(BAR_FILE)) {
    console.error('BAR file not found at: ' + BAR_FILE);
    return;
  }

  const data = fs.readFileSync(BAR_FILE, 'utf8');
  let content = JSON.parse(data);

  let questions = [];
  if (Array.isArray(content)) {
    questions = content;
  } else if (content.questions && Array.isArray(content.questions)) {
    questions = content.questions;
  } else {
    console.error('Unknown file structure');
    return;
  }

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: bar-cost-b3-004 (FIFO Process Costing)
    if (q.id === 'bar-cost-b3-004') {
      console.log('Fixing bar-cost-b3-004...');
      // Correct answer is D (4,500). Matches calculation.
      // Fix WhyWrong C and D which are backwards/wrong.
      q.correctAnswer = 3; // D
      q.whyWrong = {
        "0": "4,400 is incorrect. Check your Beg WIP completion calculation.",
        "1": "5,000 is incorrect. This matches units started but ignores WIP completion %.",
        "2": "4,100 is incorrect. The correct calculation is 4,500.",
        "3": "Correct! 400 (Beg) + 3,500 (Started/Completed) + 600 (End) = 4,500 equivalent units."
      };
      fixedCount++;
    }

    // FIX 2: bar-d4-011 (Earnings Quality EXCEPT)
    if (q.id === 'bar-d4-011') {
      console.log('Fixing bar-d4-011...');
      // Use clearer options. A is the answer (Low Quality / Bad thing).
      q.correctAnswer = 0;
      q.question = "High-quality earnings are characterized by all of the following EXCEPT:";
      q.options = [
        "Significant divergence between net income and operating cash flows due to aggressive revenue recognition.", // Bad (Correct Answer)
        "Conservative accounting policies and transparent financial disclosures.", // Good
        "Recurring revenue sources derived from a diversified customer base.", // Good
        "Consistent profitability driven by core business operations rather than one-time gains." // Good
      ];
      q.explanation = "High-quality earnings are sustainable, backed by cash flows, and transparent. Aggressive revenue recognition that causes divergence between income and cash flow is a hallmark of low-quality earnings.";
      q.whyWrong = {
        "0": "This describes a characteristic of LOW quality earnings (the divergence and aggressive recognition), making it the correct answer to the 'EXCEPT' question.",
        "1": "This is a characteristic of high-quality earnings.",
        "2": "This is a characteristic of high-quality earnings.",
        "3": "This is a characteristic of high-quality earnings."
      };
      fixedCount++;
    }

    // FIX 3: bar-fm-001 (CCC Calculation)
    if (q.id === 'bar-fm-001') {
      console.log('Fixing bar-fm-001...');
      // CCC = 45.6 + 30.4 - 36.5 = 39.5 days.
      // Option A was 39.38. Let's make it approximate.
      q.correctAnswer = 0;
      q.options[0] = "39.5 days";
      q.options[1] = "40.6 days"; 
      q.explanation = "DIO = 365/8 = 45.6 days. DSO = 365/12 = 30.4 days. DPO = 365/10 = 36.5 days. CCC = 45.6 + 30.4 - 36.5 = 39.5 days.";
      q.whyWrong = {
        "0": "Correct! CCC = 45.6 + 30.4 - 36.5 = 39.5 days.",
        "1": "Incorrect. Check your turnover calculations.",
        "2": "Incorrect. This is too low.",
        "3": "Incorrect. This is too high."
      };
      fixedCount++;
    }

    // FIX 4: bar-wc-009 (Make vs Buy)
    if (q.id === 'bar-wc-009') {
      console.log('Fixing bar-wc-009...');
      // Make: 15+10+5 + (8*0.3=2.4) = 32.40.
      // Buy: 32.00.
      // Advantage Buy = 0.40/unit.
      // Total Advantage Buy (10k) = ,000.
      // None of the previous options matched correctly (6k, 4k, etc).
      // We will change the question numbers to make the math work for one option or change options.
      // Easier: Change options.
      q.correctAnswer = 2; // Keep C index but change text.
      q.options = [
        ",000 advantage of making",
        "0,000 advantage of making",
        ",000 advantage of buying", // Correct
        "0,000 advantage of buying"
      ];
      q.explanation = "Relevant Make cost = 5 (DM) + 0 (DL) +  (VOH) + .40 (Avoidable FOH) = 2.40. Buy cost = 2.00. Buying is cheaper by /bin/bash.40 per unit. For 10,000 units, advantage = ,000 favoring Buying.";
      q.whyWrong = {
        "0": "Incorrect calculation.",
        "1": "Incorrect. This ignores avoidable fixed costs.",
        "2": "Correct! The relevant cost to make (2.40) is higher than the cost to buy (2.00).",
        "3": "Incorrect calculation."
      };
      fixedCount++;
    }

    // FIX 5: bar-wc-037 (FIFO EU)
    if (q.id === 'bar-wc-037') {
      console.log('Fixing bar-wc-037...');
      // Calc: 6000 + 35000 + 9000 = 50,000.
      // Previous Option A was 51,000.
      q.correctAnswer = 0;
      q.options[0] = "50,000"; // Correct
      q.explanation = "Beg WIP work: 10,000 * (1-0.4) = 6,000. Started & Completed: 45,000 - 10,000 = 35,000. End WIP: 15,000 * 0.6 = 9,000. Total EU = 6,000 + 35,000 + 9,000 = 50,000.";
      q.whyWrong = {
        "0": "Correct! 50,000 equivalent units.",
        "1": "Incorrect. This is just units completed.",
        "2": "Incorrect.",
        "3": "Incorrect."
      };
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (Array.isArray(content)) {
      content = questions;
    } else {
      content.questions = questions;
    }
    fs.writeFileSync(BAR_FILE, JSON.stringify(content, null, 2));
    console.log('Successfully fixed ' + fixedCount + ' BAR questions.');
  } else {
    console.log('No questions found to fix.');
  }
}

fixBAR();
