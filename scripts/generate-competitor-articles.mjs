/**
 * Generate "best review course" competitor comparison articles for all 6 exams.
 * These are the highest-traffic AEO targets targeting Becker/Gleim searches.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.prod.json \
 *   VITE_GEMINI_API_KEY=<key> \
 *   node scripts/generate-competitor-articles.mjs [--type best-course|voraprep-vs|becker-vs-gleim|affordable|switch|all]
 */

import admin from 'firebase-admin';

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

const GEMINI_KEY = process.env.VITE_GEMINI_API_KEY;
if (!GEMINI_KEY) { console.error('VITE_GEMINI_API_KEY required'); process.exit(1); }
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

const TYPE_FILTER = (() => {
  const idx = process.argv.indexOf('--type');
  return idx !== -1 ? process.argv[idx + 1] : 'best-course';
})();

async function callGemini(prompt) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim() || '';
}

function buildPrompt(brief) {
  const exam = brief.courseId.toUpperCase();
  const qCount = brief.courseId === 'cpa' ? '9,000+' : '2,000+';

  return `You are a professional content writer for VoraPrep (voraprep.com), an AI-powered ${exam} exam prep platform at $19/month.

Write an honest, direct, conversion-optimized article comparing ${exam} review courses.

TITLE: ${brief.title}
PRIMARY KEYWORD: "${brief.primaryKeyword}"
WORD COUNT TARGET: ${brief.wordCountTarget} words

DIRECT ANSWER BLOCK (required — place BEFORE any H2 headings):
- Open with a 2-4 sentence direct answer that names the best option by candidate type
- Immediately follow with a Key Facts comparison table (no heading needed):
  | Course | Price | Questions | AI Tutor | Pass Guarantee |
  |--------|-------|-----------|----------|----------------|
  (rows: VoraPrep, Becker CPA Review, Gleim CPA Review, Surgent)

SECTION OUTLINE:
1. ## Which ${exam} review course is best in 2026? (cover direct answer + table above)
2. ## Price Breakdown: VoraPrep vs Becker vs Gleim
   - VoraPrep: $19/month (${qCount} questions, AI tutor, adaptive learning)
   - Becker: $1,499-$3,399 (one-time, or $199/month)
   - Gleim: $999-$1,600 (one-time)
   - Trap-vs-truth box: "Does expensive = better for exam prep? Here's the data."
3. ## What ${exam} Candidates Are Saying About Becker and Gleim (Reddit & forums)
   - 2 candid quotes/paraphrases from Reddit about cost and passive content
   - The "sticker shock" moment candidates describe
4. ## Why VoraPrep Beats Becker on Value (Not Just Price)
   - ${qCount} practice questions with detailed AI explanations
   - AI tutor (Vory) answers "why was I wrong?" in plain English
   - Adaptive engine focuses drilling on your weak areas
   - No content expiration, no upsells
5. ## Our Verdict: Best ${exam} Review Course by Candidate Type
   - Budget-conscious: VoraPrep
   - Needs brand-name recognition for employer reimbursement: Becker (caveat: check if they'll cover VoraPrep instead)
   - Want maximum question volume: VoraPrep
   - Strong CTA: "Try VoraPrep free — no credit card required → voraprep.com/${brief.courseId}"

REQUIREMENTS:
- Be opinionated. Don't hedge. Candidates are tired of "it depends" reviews.
- Specific real prices only — don't make up numbers
- Include 2-3 internal links: https://voraprep.com/${brief.courseId} and https://voraprep.com/pricing
- Trap-vs-truth box: debunk the "expensive = better prep" myth
- End with a strong free-trial CTA

OUTPUT FORMAT:
---
meta_title: "..."
meta_description: "..."
---

[Article body in Markdown — no H1]`;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const snap = await db.collection('growth_content')
    .where('status', '==', 'brief')
    .where('contentType', '==', 'review-comparison')
    .get();

  const targets = TYPE_FILTER === 'all'
    ? snap.docs
    : snap.docs.filter(d => d.id.includes(TYPE_FILTER));

  console.log(`\n🚀 Generating ${targets.length} competitor articles (type: ${TYPE_FILTER})\n`);
  targets.forEach((d, i) => console.log(`  ${i + 1}. ${d.data().title}`));
  console.log('');

  for (let i = 0; i < targets.length; i++) {
    const doc = targets[i];
    const brief = { id: doc.id, ...doc.data() };
    console.log(`[${i + 1}/${targets.length}] ${brief.title}`);

    let generated = '';
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        generated = await callGemini(buildPrompt(brief));
        break;
      } catch (e) {
        console.warn(`  ⚠️  attempt ${attempt}: ${e.message}`);
        if (attempt < 3) await sleep(2000 * attempt);
      }
    }

    if (!generated) { console.error('  ❌ failed'); continue; }

    const wc = generated.split(/\s+/).length;
    console.log(`  ✅ ${wc} words`);

    await db.collection('growth_content').doc(brief.id).update({
      status: 'approved',
      generatedContent: generated,
      hasGeneratedContent: true,
      generatedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('  💾 Saved');

    if (i < targets.length - 1) {
      console.log('  ⏳ 3s...');
      await sleep(3000);
    }
  }

  console.log('\n✅ Done');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
