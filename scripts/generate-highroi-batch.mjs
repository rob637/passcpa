/**
 * Generate next N high-ROI drafts from Firestore briefs.
 * 
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.prod.json \
 *   VITE_GEMINI_API_KEY=<key> \
 *   node scripts/generate-highroi-batch.mjs [--limit 10]
 */

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { pathToFileURL } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);

// ─── Config ─────────────────────────────────────────────────────────────────
const LIMIT = (() => {
  const idx = process.argv.indexOf('--limit');
  return idx !== -1 ? parseInt(process.argv[idx + 1], 10) : 10;
})();

const GEMINI_KEY = process.env.VITE_GEMINI_API_KEY;
if (!GEMINI_KEY) {
  console.error('❌ VITE_GEMINI_API_KEY not set');
  process.exit(1);
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;
const HIGH_ROI_MARKERS = ['cheat-sheet', 'mistakes-guide', 'study-guide', 'practice-questions'];

// ─── Firebase ────────────────────────────────────────────────────────────────
admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

// ─── Content engine helper (inlined for portability) ─────────────────────────
const EXAM_META = {
  cpa: { exam: 'CPA', examFull: 'CPA (Certified Public Accountant)', questionCount: '9,000+', price: '$19/mo', annualPrice: '$149/yr' },
  ea:  { exam: 'EA',  examFull: 'EA (Enrolled Agent)',               questionCount: '3,000+', price: '$19/mo', annualPrice: '$149/yr' },
  cma: { exam: 'CMA', examFull: 'CMA (Certified Management Accountant)', questionCount: '2,000+', price: '$19/mo', annualPrice: '$149/yr' },
  cia: { exam: 'CIA', examFull: 'CIA (Certified Internal Auditor)', questionCount: '2,000+', price: '$19/mo', annualPrice: '$149/yr' },
  cfp: { exam: 'CFP', examFull: 'CFP (Certified Financial Planner)', questionCount: '2,000+', price: '$19/mo', annualPrice: '$149/yr' },
  cisa:{ exam: 'CISA',examFull: 'CISA (Certified Information Systems Auditor)', questionCount: '2,000+', price: '$19/mo', annualPrice: '$149/yr' },
};

const AUTHORITY_LINKS = {
  cpa: ['https://www.aicpa-cima.com/resources/landing/uscpa-exam', 'https://nasba.org/'],
  ea:  ['https://www.irs.gov/tax-professionals/enrolled-agents', 'https://www.prometric.com/irs'],
  cma: ['https://www.imanet.org/cma-certification', 'https://www.imanet.org/'],
  cia: ['https://www.theiia.org/en/certifications/cia/', 'https://www.theiia.org/'],
  cfp: ['https://www.cfp.net/', 'https://www.cfp.net/get-certified/certification-process'],
  cisa:['https://www.isaca.org/credentialing/cisa', 'https://www.isaca.org/'],
};

function buildPrompt(brief) {
  const meta = EXAM_META[brief.courseId] || EXAM_META.cpa;
  const authLinks = AUTHORITY_LINKS[brief.courseId] || [];

  return `You are a professional content writer specializing in ${meta.examFull} exam preparation.
Write a comprehensive, SEO-optimized blog article for VoraPrep (voraprep.com), an AI-powered exam prep platform.

ARTICLE SPECIFICATIONS:
- Title: ${brief.title}
- Primary Keyword: "${brief.primaryKeyword || brief.title}" (use in the title, first paragraph, and 2-3 subheadings naturally)
- Secondary Keywords: ${(brief.targetKeywords || []).map(k => `"${k}"`).join(', ')}
- Word Count Target: ${brief.wordCountTarget || 1400} words
- Search Intent: ${brief.searchIntent || 'informational'}
- Content Type: ${brief.contentType || 'guide'}

OUTLINE (follow this structure):
${(brief.outline || []).map(s => `${'#'.repeat(s.level || 2)} ${s.heading}\n${(s.keyPoints || []).map(kp => `  - ${kp}`).join('\n')}\n  Target: ~${s.wordCount || 250} words`).join('\n\n')}

SEO & VALUE REQUIREMENTS:
1. Use the primary keyword naturally in the first 100 words.
2. Include secondary keywords throughout (1-2 times each, naturally).
3. Use H2 and H3 headings with keywords where natural.
4. Write a meta title (60 chars max) and meta description (155 chars max).
5. Use 2-3 internal links: https://voraprep.com/${brief.courseId}, https://voraprep.com/blog
6. Add a short "Official resources and references" section with 2-4 bullet links to authoritative sources: ${authLinks.join(', ')}
7. Include a table, checklist, comparison box, or trap-vs-truth chart anywhere it helps the reader.
8. Do not invent statistics, fees, deadlines, or board rules.
9. Add a clear CTA to VoraPrep at the end.
10. Teach like a fantastic coach: include at least one analogy, one worked example, one "common traps" callout, and one short "quick self-check" section.
11. Give the reader at least one aha moment — a decision tree, trap-vs-truth box, or vivid analogy.

DIRECT ANSWER BLOCK (required for AEO):
- Start the article with a 2-4 sentence direct answer that immediately satisfies the search query.
- Follow it with a "Key Facts" table (2-column markdown table) with 3-5 rows of the most important facts.
- This answer block should appear BEFORE any H2 headings.

TONE & STYLE:
- Professional but approachable (like a knowledgeable study buddy)
- Actionable: readers should know exactly what to do next
- Specific and useful, not generic filler
- Use bullet points and numbered lists for scannability

ABOUT VORAPREP:
- AI-powered exam prep for ${meta.exam} and 5 other certifications
- ${meta.questionCount} practice questions
- Adaptive learning engine + AI tutor (Vory)
- Starting at ${meta.price}/month or ${meta.annualPrice}/year
- Free trial available

OUTPUT FORMAT:
Return the article in Markdown with YAML frontmatter:

---
meta_title: "..."
meta_description: "..."
---

[Article content in Markdown — do NOT include the H1 title in the body]`;
}

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

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function wordCount(text) { return text.split(/\s+/).filter(Boolean).length; }

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀 High-ROI batch generator — limit: ${LIMIT}\n`);

  const snap = await db.collection('growth_content').where('status', '==', 'brief').get();
  const briefs = snap.docs
    .filter(d => HIGH_ROI_MARKERS.some(m => d.id.includes(m)))
    .map(d => ({ id: d.id, ...d.data() }));

  console.log(`📋 Available high-ROI briefs: ${briefs.length}`);

  // Pick first LIMIT, spread across courses for mix
  const byCourse = {};
  for (const b of briefs) {
    if (!byCourse[b.courseId]) byCourse[b.courseId] = [];
    byCourse[b.courseId].push(b);
  }

  // Round-robin across courses
  const selected = [];
  const courseKeys = Object.keys(byCourse).sort();
  let i = 0;
  while (selected.length < LIMIT && selected.length < briefs.length) {
    const course = courseKeys[i % courseKeys.length];
    const list = byCourse[course];
    if (list && list.length > 0) {
      selected.push(list.shift());
    }
    i++;
    if (i > courseKeys.length * 100) break; // safety
  }

  console.log(`\n📝 Selected ${selected.length} briefs:`);
  selected.forEach((b, idx) => console.log(`  ${idx + 1}. [${b.courseId}] ${b.id}`));
  console.log('');

  let success = 0;
  let failed = 0;

  for (let idx = 0; idx < selected.length; idx++) {
    const brief = selected[idx];
    console.log(`\n[${idx + 1}/${selected.length}] Generating: ${brief.id}`);

    let generated = '';
    let lastErr = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const prompt = buildPrompt(brief);
        generated = await callGemini(prompt);
        break;
      } catch (err) {
        lastErr = err;
        console.warn(`  ⚠️  Attempt ${attempt} failed: ${err.message}`);
        if (attempt < 3) await sleep(2000 * attempt);
      }
    }

    if (!generated) {
      console.error(`  ❌ Failed after 3 attempts: ${lastErr?.message}`);
      failed++;
      continue;
    }

    const wc = wordCount(generated);
    console.log(`  ✅ Generated ${wc} words`);

    // Update Firestore
    await db.collection('growth_content').doc(brief.id).update({
      status: 'approved',
      generatedContent: generated,
      hasGeneratedContent: true,
      generatedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    success++;
    console.log(`  💾 Saved to Firestore`);

    // Rate limit — avoid Gemini quota
    if (idx < selected.length - 1) {
      console.log('  ⏳ Waiting 3s...');
      await sleep(3000);
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅ Done — ${success} generated, ${failed} failed`);
  console.log(`   View in admin: https://voraprep.com/admin/articles`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
