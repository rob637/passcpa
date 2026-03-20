#!/usr/bin/env node
/**
 * Sync blog articles from articles.json to Firestore growth_content collection
 * 
 * This ensures all published articles appear in the dynamic sitemap.
 * 
 * Usage:
 *   node scripts/sync-blog-to-firestore.cjs
 *   node scripts/sync-blog-to-firestore.cjs --dry-run
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Parse args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

// Load articles
const articlesPath = path.join(__dirname, '../blog/src/data/articles.json');
if (!fs.existsSync(articlesPath)) {
  console.error('❌ articles.json not found at:', articlesPath);
  process.exit(1);
}

const articles = require(articlesPath);
console.log(`📚 Found ${articles.length} articles in articles.json\n`);

if (dryRun) {
  console.log('🔍 DRY RUN MODE - no changes will be made\n');
}

// Initialize Firebase Admin
// Uses GOOGLE_APPLICATION_CREDENTIALS or default credentials
if (!dryRun) {
  // Try to use service account if available
  const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // Fall back to default credentials (CI/Cloud environment)
    admin.initializeApp();
  }
}

async function syncArticles() {
  const db = dryRun ? null : admin.firestore();
  let synced = 0;
  let skipped = 0;

  for (const article of articles) {
    // Only sync articles with a publishedAt date
    if (!article.publishedAt) {
      console.log(`⏭️  Skipping (no publishedAt): ${article.id}`);
      skipped++;
      continue;
    }

    // Prepare the document
    const doc = {
      id: article.id,
      slug: article.slug,
      title: article.title,
      courseId: article.courseId || null,
      section: article.section || null,
      contentType: article.contentType || 'article',
      primaryKeyword: article.primaryKeyword || null,
      author: article.author || 'VoraPrep Team',
      status: 'published',
      publishedAt: admin.firestore?.Timestamp?.fromDate 
        ? admin.firestore.Timestamp.fromDate(new Date(article.publishedAt))
        : new Date(article.publishedAt),
      updatedAt: article.updatedAt 
        ? (admin.firestore?.Timestamp?.fromDate 
            ? admin.firestore.Timestamp.fromDate(new Date(article.updatedAt))
            : new Date(article.updatedAt))
        : (admin.firestore?.Timestamp?.fromDate 
            ? admin.firestore.Timestamp.fromDate(new Date(article.publishedAt))
            : new Date(article.publishedAt)),
      // Don't store full content in Firestore - just metadata for sitemap
      // The actual content is served from the static Astro blog
    };

    if (dryRun) {
      console.log(`✅ Would sync: ${article.slug}`);
      console.log(`   Title: ${article.title}`);
      console.log(`   Published: ${article.publishedAt}`);
      synced++;
    } else {
      try {
        await db.collection('growth_content').doc(article.id).set(doc, { merge: true });
        console.log(`✅ Synced: ${article.slug}`);
        synced++;
      } catch (err) {
        console.error(`❌ Failed to sync ${article.id}:`, err.message);
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Synced: ${synced}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${articles.length}`);

  if (!dryRun) {
    console.log(`\n✨ Articles synced to Firestore growth_content collection`);
    console.log(`   The dynamic sitemap will now include these URLs.`);
  }
}

syncArticles()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
