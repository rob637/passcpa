#!/usr/bin/env node

/**
 * Seeds content briefs into Firestore using Firebase Admin SDK.
 * Uses the Firebase CLI refresh token for authentication.
 * 
 * Usage: node scripts/seed-briefs.cjs
 */

const fs = require('fs');
const admin = require('firebase-admin');

// Use application default credentials
const app = admin.initializeApp({
  projectId: 'voraprep-prod',
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

const CURRENT_YEAR = '2026';
const exams = [
  {
    courseId: 'cpa', exam: 'CPA',
    sections: [
      { id: 'FAR', name: 'Financial Accounting and Reporting' },
      { id: 'AUD', name: 'Auditing and Attestation' },
      { id: 'REG', name: 'Taxation and Regulation' },
      { id: 'BAR', name: 'Business Analysis and Reporting' },
      { id: 'ISC', name: 'Information Systems and Controls' },
      { id: 'TCP', name: 'Tax Compliance and Planning' },
    ],
  },
  {
    courseId: 'ea', exam: 'EA',
    sections: [
      { id: 'SEE1', name: 'Individual Taxation' },
      { id: 'SEE2', name: 'Business Taxation' },
      { id: 'SEE3', name: 'Representation and Ethics' },
    ],
  },
  {
    courseId: 'cma', exam: 'CMA',
    sections: [
      { id: 'CMA1', name: 'Financial Planning, Performance, and Analytics' },
      { id: 'CMA2', name: 'Strategic Financial Management' },
    ],
  },
  {
    courseId: 'cia', exam: 'CIA',
    sections: [
      { id: 'CIA1', name: 'Essentials of Internal Auditing' },
      { id: 'CIA2', name: 'Practice of Internal Auditing' },
      { id: 'CIA3', name: 'Business Knowledge for Internal Auditing' },
    ],
  },
  {
    courseId: 'cisa', exam: 'CISA',
    sections: [
      { id: 'CISA1', name: 'Information Systems Auditing Process' },
      { id: 'CISA2', name: 'Governance and Management of IT' },
      { id: 'CISA3', name: 'Information Systems Acquisition and Development' },
      { id: 'CISA4', name: 'Information Systems Operations and Business Resilience' },
      { id: 'CISA5', name: 'Protection of Information Assets' },
    ],
  },
  {
    courseId: 'cfp', exam: 'CFP',
    sections: [
      { id: 'CFP1', name: 'General Principles of Financial Planning' },
      { id: 'CFP2', name: 'Risk Management and Insurance Planning' },
      { id: 'CFP3', name: 'Investment Planning' },
      { id: 'CFP4', name: 'Tax Planning' },
      { id: 'CFP5', name: 'Retirement Savings and Income Planning' },
      { id: 'CFP6', name: 'Estate Planning' },
      { id: 'CFP7', name: 'Financial Plan Development' },
      { id: 'CFP8', name: 'Psychology of Financial Planning' },
    ],
  },
];

const templates = [
  { id: 'study-guide', title: 'Complete {exam} {section} Study Guide {year}', slug: '{course}-{sectionLower}-study-guide-{year}', perSection: true, wordCount: 2500, priority: 1 },
  { id: 'pass-rates', title: '{exam} Pass Rates {year}: What to Expect', slug: '{course}-pass-rates-{year}', perSection: false, wordCount: 2000, priority: 2 },
  { id: 'study-schedule', title: '{exam} Study Schedule {year}: Week-by-Week Plan', slug: '{course}-study-schedule-{year}', perSection: false, wordCount: 2200, priority: 2 },
  { id: 'salary-guide', title: '{exam} Salary Guide {year}: How Much Do {exam}s Earn?', slug: '{course}-salary-guide-{year}', perSection: false, wordCount: 2000, priority: 3 },
  { id: 'review-comparison', title: 'Best {exam} Review Courses {year}: Honest Comparison', slug: 'best-{course}-review-courses-{year}', perSection: false, wordCount: 2800, priority: 1 },
  { id: 'exam-tips', title: '15 Tips to Pass the {exam} Exam in {year}', slug: '{course}-exam-tips-{year}', perSection: false, wordCount: 2000, priority: 2 },
  { id: 'requirements', title: '{exam} Requirements {year}: Education, Experience & Fees', slug: '{course}-requirements-{year}', perSection: false, wordCount: 2000, priority: 3 },
  { id: 'free-practice', title: 'Free {exam} {section} Practice Questions ({year})', slug: 'free-{course}-{sectionLower}-practice-questions-{year}', perSection: true, wordCount: 3000, priority: 1 },
  { id: 'topic-explainer', title: 'Understanding {sectionName}: {exam} {section} Breakdown', slug: '{course}-{sectionLower}-breakdown-{year}', perSection: true, wordCount: 1800, priority: 3 },
];

const comparisonPairs = [
  ['cpa', 'ea', 'CPA vs EA'], ['cpa', 'cma', 'CPA vs CMA'],
  ['cpa', 'cia', 'CPA vs CIA'], ['cma', 'cia', 'CMA vs CIA'],
  ['cma', 'cfp', 'CMA vs CFP'], ['cisa', 'cia', 'CISA vs CIA'],
];

async function seed() {
  console.log('Loading existing briefs...');
  const existing = await db.collection('growth_content').get();
  const existingSlugs = new Set(existing.docs.map(d => d.data().slug).filter(Boolean));
  console.log(`Found ${existing.size} existing docs, ${existingSlugs.size} unique slugs`);

  let seeded = 0;
  let skipped = 0;
  let batch = db.batch();
  let batchCount = 0;

  async function flushBatch() {
    if (batchCount > 0) {
      await batch.commit();
      console.log(`  Committed batch of ${batchCount}`);
      batch = db.batch();
      batchCount = 0;
    }
  }

  for (const exam of exams) {
    for (const template of templates) {
      if (template.perSection) {
        for (const section of exam.sections) {
          const slug = template.slug
            .replace('{course}', exam.courseId)
            .replace('{sectionLower}', section.id.toLowerCase())
            .replace('{year}', CURRENT_YEAR);

          if (existingSlugs.has(slug)) { skipped++; continue; }

          const title = template.title
            .replace(/\{exam\}/g, exam.exam)
            .replace('{section}', section.id)
            .replace('{sectionName}', section.name)
            .replace('{year}', CURRENT_YEAR);

          const briefId = `${exam.courseId}-${template.id}-${section.id.toLowerCase()}-${CURRENT_YEAR}`;
          batch.set(db.collection('growth_content').doc(briefId), {
            title, slug, courseId: exam.courseId, section: section.id,
            contentType: template.id,
            targetKeywords: [
              `${exam.exam.toLowerCase()} ${section.id.toLowerCase()}`,
              `${exam.exam.toLowerCase()} ${section.name.toLowerCase()}`,
            ],
            primaryKeyword: `${exam.exam.toLowerCase()} ${section.id.toLowerCase()} study guide`,
            wordCountTarget: template.wordCount,
            internalLinks: [`/${exam.courseId}`],
            ctaType: 'register', ctaUrl: `/${exam.courseId}`,
            status: 'brief', priority: template.priority,
            outline: [], searchIntent: 'informational',
            estimatedVolume: 0, competitorUrls: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          }, { merge: true });
          seeded++; batchCount++;
          if (batchCount >= 400) await flushBatch();
        }
      } else {
        const slug = template.slug
          .replace('{course}', exam.courseId)
          .replace('{year}', CURRENT_YEAR);

        if (existingSlugs.has(slug)) { skipped++; continue; }

        const title = template.title
          .replace(/\{exam\}/g, exam.exam)
          .replace('{year}', CURRENT_YEAR);

        const briefId = `${exam.courseId}-${template.id}-${CURRENT_YEAR}`;
        batch.set(db.collection('growth_content').doc(briefId), {
          title, slug, courseId: exam.courseId,
          contentType: template.id,
          targetKeywords: [
            `${exam.exam.toLowerCase()} prep`,
            `${exam.exam.toLowerCase()} exam`,
          ],
          primaryKeyword: `${exam.exam.toLowerCase()} ${template.id.replace(/-/g, ' ')}`,
          wordCountTarget: template.wordCount,
          internalLinks: [`/${exam.courseId}`],
          ctaType: 'register', ctaUrl: `/${exam.courseId}`,
          status: 'brief', priority: template.priority,
          outline: [], searchIntent: 'informational',
          estimatedVolume: 0, competitorUrls: [],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        seeded++; batchCount++;
        if (batchCount >= 400) await flushBatch();
      }
    }
  }

  // Comparisons
  for (const [c1, c2, label] of comparisonPairs) {
    const slug = `${c1}-vs-${c2}-comparison-${CURRENT_YEAR}`;
    if (existingSlugs.has(slug)) { skipped++; continue; }

    const briefId = `comparison-${c1}-${c2}-${CURRENT_YEAR}`;
    batch.set(db.collection('growth_content').doc(briefId), {
      title: `${label}: Which Certification Is Right for You in ${CURRENT_YEAR}?`,
      slug, courseId: c1, contentType: 'comparison',
      targetKeywords: [`${c1} vs ${c2}`, label.toLowerCase()],
      primaryKeyword: `${c1} vs ${c2}`,
      wordCountTarget: 2500,
      internalLinks: [`/${c1}`, `/${c2}`],
      ctaType: 'register', ctaUrl: '/',
      status: 'brief', priority: 1,
      outline: [], searchIntent: 'informational',
      estimatedVolume: 0, competitorUrls: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    seeded++; batchCount++;
  }

  await flushBatch();
  console.log(`\n✅ Done! Seeded: ${seeded} | Skipped: ${skipped} | Total: ${seeded + skipped}`);
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
