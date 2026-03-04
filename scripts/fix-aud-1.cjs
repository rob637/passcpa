const fs = require('fs');
const path = require('path');

const AUD_FILE = path.join(__dirname, '../content/cpa/aud/questions.json');

function fixAudBatch1() {
  if (!fs.existsSync(AUD_FILE)) {
    console.error('AUD file not found!');
    return;
  }

  const data = fs.readFileSync(AUD_FILE, 'utf8');
  let content = JSON.parse(data);
  let questions = Array.isArray(content) ? content : content.questions;

  let fixedCount = 0;

  questions.forEach(q => {
    // FIX 1: aud-exp-040
    if (q.id === 'aud-exp-040') {
      // Key 0 is correct. WhyWrong 0 says "Option A is CORRECT".
      // Standardize.
      q.whyWrong['0'] = "Correct! Professional skepticism involves a questioning mind and critical assessment.";
      fixedCount++;
    }

    // FIX 2: aud-ext-rep-005
    if (q.id === 'aud-ext-rep-005') {
      // Key 0 is correct (No modification).
      // WhyWrong 0 says "Why option A is CORRECT".
      // WhyWrong 3 says "Why option D is WRONG".
      // Log said Key was 3?
      // Log: "whyWrong[0] says 'CORRECT' but correctAnswer=3".
      // My read: "correctAnswer": 0.
      // So the file I read HAS Key 0.
      // Maybe the log is outdated? Or I read a different version?
      // I will ensure Key is 0.
      q.correctAnswer = 0;
      q.whyWrong['0'] = "Correct! If management's plans mitigate the doubt, no modification is needed.";
      q.whyWrong['3'] = "Incorrect. EOM is only required if substantial doubt remains.";
      fixedCount++;
    }

    // FIX 3: aud-gap-vii-012
    if (q.id === 'aud-gap-vii-012') {
      // Non-issuers (AICPA/SAS). Retention period.
      // SAS 103 (AU-C 230): 5 years.
      // PCAOB (Issuers): 7 years.
      // Question: "Under AICPA... for non-issuers".
      // Key 2 (5 years). Correct.
      // WhyWrong 2 says: "Why option C is WRONG...". AND "... current standards require a longer retention period."
      // WhyWrong 3 says: "Why option D is CORRECT ... PCAOB standards require...".
      // The text in WhyWrong 2 and 3 contradicts the question asking about "AICPA/Non-issuers".
      // WhyWrong 2 claims 5 years is WRONG (it is CORRECT for non-issuers).
      // WhyWrong 3 claims 7 years is CORRECT (it is WRONG for non-issuers).
      // Fix: Keep Key 2. Fix WhyWrong text.
      q.correctAnswer = 2; // 5 years
      q.whyWrong = {
        "0": "Incorrect. 10 years is not the standard.",
        "1": "Incorrect. 3 years is too short.",
        "2": "Correct! AU-C 230 requires 5 years for non-issuers.",
        "3": "Incorrect. 7 years is for Issuers (PCAOB)."
      };
      fixedCount++;
    }

    // FIX 4: aud-wc-129
    if (q.id === 'aud-wc-129') {
      // Warranty. Recog 100% at sale. Should be ratable. 40% elapsed.
      // Revenue Overstated. Def Rev Understated.
      // Option B ("Overstatement of revenue..."). Key 1.
      // WhyWrong 1 says "Why option B is CORRECT".
      // Issue log: "whyWrong[1] says 'WRONG' but this is the correct answer".
      // My snippet: "Why option B is CORRECT".
      // Maybe the log regex failed on "Why option B is CORRECT - ... This impacts...".
      // I'll just standardize the start to "Correct!".
      q.whyWrong['1'] = "Correct! Recognizing all revenue upfront overstates Revenue and understates Deferred Revenue (Liability).";
      fixedCount++;
    }

    // FIX 5: aud-wc-211
    if (q.id === 'aud-wc-211') {
      // SOC 1 Type 1. (Design only, point in time).
      // Auditor wants to rely on operating effectiveness?
      // Type 1 is insufficient for operating effectiveness.
      // Option C: "Type 1 report is inadequate...". Key 2.
      // WhyWrong 2 says "Why option C is CORRECT".
      // WhyWrong 3 says "Why option D is WRONG".
      // Log: "whyWrong[2] says 'CORRECT' but correctAnswer=3".
      // Log claims Key is 3?
      // My snippet: "correctAnswer": 2.
      // Option D: "Auditor must perform additional procedures to address the gap...".
      // WhyWrong 3 says "While additional procedures... fundamental problem is type of report...".
      // Key 2 seems best (Type 1 is inadequate for OE).
      // I will confirm Key 2 and standard labels.
      q.correctAnswer = 2;
      q.whyWrong['2'] = "Correct! A Type 1 report does not test operating effectiveness.";
      q.whyWrong['3'] = "Incorrect. While gap procedures are relevant, the Type 1 report itself is insufficient for effectiveness.";
      fixedCount++;
    }

    // FIX 6: aud-gen-1041
    if (q.id === 'aud-gen-1041') {
      // Benchmark. Profit has loss.
      // Option C: Use average profit.
      // Key 2 (C).
      // WhyWrong 0 says "Why option A is WRONG".
      // WhyWrong 1 says "Why option B is WRONG".
      // WhyWrong 2 says "Why option C is CORRECT".
      // Log: "whyWrong[0] says 'WRONG' but this is the correct answer".
      // Log thinks Key 0 (A - Revenue) is correct?
      // Question: "MOST appropriate next step".
      // Using Revenue IS a valid alternative. Using Average Profit is also valid.
      // Explanation favors Average Profit ("averaging prior profits is often more relevant").
      // Key 2 (C) is standard.
      // Log might be hallucinating or thinking Revenue is better for "small manufacturing".
      // I'll stick with Key 2 and clean up text.
      q.correctAnswer = 2;
      q.whyWrong['0'] = "Incorrect. While revenue is a possible benchmark, averaging prior year profits is often preferred to maintain comparability if the entity is normally profitable.";
      q.whyWrong['2'] = "Correct! Averaging prior year profits is a standard approach when the current year is anomalous.";
      fixedCount++;
    }

    // FIX 7: aud-gen-1093
    if (q.id === 'aud-gen-1093') {
      // Sarah (Staff). Father (Close Relative).
      // Father has 500 shares (Direct). Immaterial (<1%).
      // Sarah unaware.
      // Rule: Close Relative (Parent).
      // Impaired if:
      // 1. Key Position? Sarah is Staff. Is she on the engagement? "assigned to the audit". YES. She is a Covered Member.
      // Independence of Covered Member is impaired if Close Relative has:
      // a) Key Position in client.
      // b) Financial Interest that is MATERIAL to relative and Known to member.
      // c) Financial Interest that enables significant influence (Known).
      // Here: Interest is <1% (Not significant influence).
      // Is it Material to Father? Unknown.
      // Is it Known to Sarah? "Sarah is unaware".
      // Rule: If Unaware, not impaired?
      // Yes, usually knowledge is required for Close Relative financial interest violation.
      // Explanation says: "Since Sarah is unaware... not impaired."
      // Key 0 (A) "No...".
      // WhyWrong 0 says "Why option A is CORRECT".
      // Log: "whyWrong[0] says 'WRONG' but this is the correct answer". (Regex fail or mismatch).
      // My snippet: Key 0. Text "Why option A is CORRECT".
      // Standardize.
      q.whyWrong['0'] = "Correct! For a close relative (father), independence is impaired only if the financial interest is material to the relative and known to the auditor, or provides significant influence. Sarah is unaware.";
      fixedCount++;
    }

    // FIX 8: aud-gen-1218
    if (q.id === 'aud-gen-1218') {
      // Confirmation non-response.
      // Option to "Send second request" (A).
      // Option to "Examine shipping docs" (B).
      // Question: "most appropriate... to address this non-response".
      // Usually you send a second, THEN alternative procedures.
      // Or if second fails, alternative.
      // Option A: "Send second... if they do not answer, assume correct." (Bad assumption).
      // Option B: "Examine shipping documents...". (Alternative procedure).
      // Option A part 2 "assume correct" makes it WRONG.
      // So Option B is the best answer.
      // Key 1 (B).
      // WhyWrong 0 says "While sending a second confirmation is an option... cannot assume correct...".
      // Log: "whyWrong[0] says 'CORRECT' but correctAnswer=1".
      // My snippet: WhyWrong 0 text starts with "While sending a second confirmation is an option...".
      // It does NOT say "Correct".
      // I'll just standardize.
      q.correctAnswer = 1;
      q.whyWrong['0'] = "Incorrect. While sending a second request is good, one cannot assume the balance is correct if there is no response.";
      q.whyWrong['1'] = "Correct! Examining subsequent cash receipts or shipping documentation is the standard alternative procedure for non-responses.";
      fixedCount++;
    }
  });

  if (fixedCount > 0) {
    if (!Array.isArray(content)) content.questions = questions;
    fs.writeFileSync(AUD_FILE, JSON.stringify(content, null, 2));
    console.log(`Successfully fixed ${fixedCount} AUD questions (Batch 1).`);
  } else {
    console.log('No questions found to fix.');
  }
}

fixAudBatch1();
