import admin from 'firebase-admin';
import { pathToFileURL } from 'url';

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

const modUrl = pathToFileURL('/workspaces/passcpa/src/services/growth/contentEngine.ts').href;
// Can't import TS directly — inline the needed briefs
const CURRENT_YEAR = 2026;

const EXAM_META = {
  cpa: { exam: 'CPA', examFull: 'CPA', course: 'cpa', questionCount: '9,000+', price: '$19/mo', annualPrice: '$149/yr' },
  ea:  { exam: 'EA',  examFull: 'EA',  course: 'ea',  questionCount: '3,000+', price: '$19/mo', annualPrice: '$149/yr' },
  cma: { exam: 'CMA', examFull: 'CMA', course: 'cma', questionCount: '2,000+', price: '$19/mo', annualPrice: '$149/yr' },
  cia: { exam: 'CIA', examFull: 'CIA', course: 'cia', questionCount: '2,000+', price: '$19/mo', annualPrice: '$149/yr' },
  cfp: { exam: 'CFP', examFull: 'CFP', course: 'cfp', questionCount: '2,000+', price: '$19/mo', annualPrice: '$149/yr' },
  cisa:{ exam: 'CISA',examFull: 'CISA',course: 'cisa',questionCount: '2,000+', price: '$19/mo', annualPrice: '$149/yr' },
};

const ANGLES = [
  { type: 'best-course', titleT: 'Best {exam} Review Course in 2026: Honest Rankings', slugT: 'best-{course}-review-course-2026', volume: 5400 },
  { type: 'voraprep-vs', titleT: 'VoraPrep vs Becker {exam}: Which One Actually Gets You to {score}?', slugT: 'voraprep-vs-becker-{course}-review-2026', volume: 1200 },
  { type: 'becker-vs-gleim', titleT: 'Becker vs Gleim {exam}: Side-by-Side Comparison (2026)', slugT: 'becker-vs-gleim-{course}-review-2026', volume: 3200 },
  { type: 'affordable', titleT: 'Cheapest {exam} Review Course That Still Gets You to {score} (2026)', slugT: 'cheapest-{course}-review-course-2026', volume: 2100 },
  { type: 'switch', titleT: "I Switched from Becker to VoraPrep: Here's What Happened ({exam})", slugT: 'switched-becker-to-voraprep-{course}-2026', volume: 600 },
];

const courses = Object.keys(EXAM_META);
let saved = 0;
let skipped = 0;

// Check existing
const snap = await db.collection('growth_content').where('status', '==', 'brief').get();
const existingSlugs = new Set(snap.docs.map(d => d.data().slug));

const batch = db.batch();

for (const courseId of courses) {
  const meta = EXAM_META[courseId];
  const passScore = courseId === 'cpa' ? '75' : courseId === 'cisa' ? '450' : '75';

  for (const angle of ANGLES) {
    const title = angle.titleT.replace('{exam}', meta.exam).replace('{course}', meta.course).replace('{score}', `${passScore}+`);
    const slug = angle.slugT.replace('{exam}', meta.exam.toLowerCase()).replace('{course}', meta.course);
    const id = `competitor-${courseId}-${angle.type}-2026`;

    if (existingSlugs.has(slug)) { skipped++; continue; }

    // Also check if already approved/published
    const existing = await db.collection('growth_content').doc(id).get();
    if (existing.exists) { skipped++; continue; }

    const outline = [
      { heading: `Which ${meta.exam} review course is actually best in 2026?`, level: 2, keyPoints: ['Direct answer: name the best option by candidate type', 'Quick comparison table: VoraPrep vs Becker vs Gleim', 'Who each is best for'], wordCount: 300 },
      { heading: `${meta.exam} Review Course Comparison: Price, Questions & AI Features`, level: 2, keyPoints: ['Price breakdown (VoraPrep $19/mo vs Becker $1,500+ vs Gleim $1,000+)', 'Question bank size', 'AI/adaptive features', 'Pass guarantee'], wordCount: 500 },
      { heading: `Why VoraPrep Costs 95% Less Than Becker`, level: 2, keyPoints: [`${meta.questionCount} practice questions at $19/mo`, 'AI tutor included', 'No 18-month expiration', 'No upsells'], wordCount: 350 },
      { heading: `What Candidates Hate About Becker and Gleim`, level: 2, keyPoints: ['Upfront cost shock', 'Passive reading content', 'Static answer keys with no AI explanations', 'Community complaints from Reddit'], wordCount: 350 },
      { heading: `Our Verdict: Best ${meta.exam} Review Course by Budget & Learning Style`, level: 2, keyPoints: ['Budget picks', 'Brand-name picks', 'Question-driller picks', 'CTA to try VoraPrep free'], wordCount: 300 },
    ];

    batch.set(db.collection('growth_content').doc(id), {
      id,
      title,
      slug,
      courseId,
      contentType: 'review-comparison',
      targetKeywords: [`best ${meta.exam.toLowerCase()} review course`, `${meta.exam.toLowerCase()} review course comparison`, `voraprep vs becker`, `becker vs gleim ${meta.exam.toLowerCase()}`],
      primaryKeyword: `best ${meta.exam.toLowerCase()} review course`,
      searchIntent: 'commercial',
      estimatedVolume: angle.volume,
      outline,
      wordCountTarget: 1800,
      internalLinks: [`/${meta.course}`, `/${meta.course}/practice`, '/pricing'],
      ctaType: 'free-trial',
      ctaUrl: `/register?course=${courseId}`,
      status: 'brief',
      priority: 1,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    saved++;
  }
}

await batch.commit();
console.log(`✅ Seeded ${saved} competitor briefs, skipped ${skipped} duplicates`);
process.exit(0);
