#!/usr/bin/env node
/**
 * Verify that an article is ready to share before posting to social media.
 * 
 * This script checks:
 * 1. Article exists in Firestore growth_content with status='published'
 * 2. Static blog file exists (if deployed)
 * 3. Live URL returns 200
 * 
 * Usage:
 *   node scripts/verify-article.cjs <slug>
 *   node scripts/verify-article.cjs free-cfp-cfp5-practice-questions-2026
 * 
 * Run BEFORE sharing any LinkedIn/social media links!
 */

const fs = require('fs');
const path = require('path');

const API_URL = 'https://us-central1-voraprep-prod.cloudfunctions.net/exportArticles';
const LIVE_URL_BASE = 'https://voraprep.com/blog';

async function main() {
  const slug = process.argv[2];
  
  if (!slug) {
    console.error('❌ Usage: node scripts/verify-article.cjs <slug>');
    console.error('   Example: node scripts/verify-article.cjs cpa-bar-breakdown-2026');
    process.exit(1);
  }

  console.log(`\n🔍 Verifying article: ${slug}\n`);
  console.log('─'.repeat(60));

  let allPassed = true;
  let inFirestore = false;
  let hasStaticFile = false;
  let liveUrlWorks = false;

  // ─────────────────────────────────────────────────────────────────────────
  // Check 1: Article exists in Firestore (via Cloud Function)
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n1️⃣  Checking Firestore (growth_content)...');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const article = data.articles.find(a => a.slug === slug);
    
    if (article) {
      inFirestore = true;
      console.log(`   ✅ Found in Firestore`);
      console.log(`      Title: ${article.title}`);
      console.log(`      Published: ${article.publishedAt}`);
      console.log(`      Course: ${article.courseId}`);
    } else {
      console.log(`   ❌ NOT found in Firestore growth_content`);
      console.log(`      Available slugs: ${data.articles.map(a => a.slug).join(', ') || '(none)'}`);
      allPassed = false;
    }
  } catch (err) {
    console.log(`   ⚠️  Could not check Firestore: ${err.message}`);
    console.log('      (This is OK if running locally without network)');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Check 2: Static file exists in blog/src/data/articles.json
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n2️⃣  Checking static blog data (articles.json)...');
  const articlesPath = path.join(__dirname, '../blog/src/data/articles.json');
  
  if (fs.existsSync(articlesPath)) {
    try {
      const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
      const article = articles.find(a => a.slug === slug);
      
      if (article) {
        hasStaticFile = true;
        console.log(`   ✅ Found in articles.json`);
      } else {
        console.log(`   ⚠️  NOT in articles.json (will use dynamic fallback)`);
        console.log('      Run: npm run build:blog to generate static version');
      }
    } catch (err) {
      console.log(`   ❌ Error reading articles.json: ${err.message}`);
    }
  } else {
    console.log(`   ⚠️  articles.json not found (blog not built yet)`);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Check 3: Live URL returns 200
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n3️⃣  Checking live URL...');
  const liveUrl = `${LIVE_URL_BASE}/${slug}/`;
  
  try {
    const response = await fetch(liveUrl, { redirect: 'follow' });
    
    if (response.ok) {
      // Check if it's the actual article or the SPA fallback
      const html = await response.text();
      const isStaticBlog = html.includes('data-astro-cid') || html.includes('<article');
      const isDynamicArticle = html.includes('DynamicArticle') || html.includes('growth_content');
      const hasTitle = html.includes(slug) || html.toLowerCase().includes('practice questions');
      
      if (isStaticBlog || hasTitle) {
        liveUrlWorks = true;
        console.log(`   ✅ ${liveUrl}`);
        console.log(`      Status: ${response.status}`);
        console.log(`      Type: ${isStaticBlog ? 'Static (Astro)' : 'Dynamic (React)'}`);
      } else if (html.includes('Article Not Found')) {
        console.log(`   ❌ URL returns 200 but shows "Article Not Found"`);
        console.log('      The article is not in Firestore OR static files');
        allPassed = false;
      } else {
        console.log(`   ⚠️  URL works but content unclear`);
        console.log('      Manual verification recommended');
      }
    } else {
      console.log(`   ❌ HTTP ${response.status}`);
      allPassed = false;
    }
  } catch (err) {
    console.log(`   ❌ Could not fetch URL: ${err.message}`);
    allPassed = false;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Summary
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('\n📊 Summary:\n');
  
  console.log(`   Firestore:     ${inFirestore ? '✅ Ready' : '❌ Missing'}`);
  console.log(`   Static file:   ${hasStaticFile ? '✅ Ready' : '⚠️  Not built (dynamic fallback available)'}`);
  console.log(`   Live URL:      ${liveUrlWorks ? '✅ Working' : '❌ Not working'}`);

  console.log('\n');
  
  if (inFirestore && liveUrlWorks) {
    console.log('🎉 READY TO SHARE!');
    console.log(`   ${liveUrl}\n`);
    process.exit(0);
  } else if (inFirestore && !liveUrlWorks) {
    console.log('⚠️  Article in Firestore but URL not working.');
    console.log('   Try: npm run build:all && firebase deploy --only hosting\n');
    process.exit(1);
  } else {
    console.log('❌ NOT READY TO SHARE');
    console.log('   The article must be published to Firestore first.');
    console.log('   Use Admin > Article Review to publish articles.\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
