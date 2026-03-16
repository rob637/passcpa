/**
 * Export published articles to JSON for Astro static build
 * 
 * Run this before building the blog:
 *   node scripts/export-articles.cjs
 * 
 * Options:
 *   --from-api    Fetch from Cloud Function (no credentials needed)
 *   --mock        Use mock data without connecting to Firebase
 * 
 * This fetches from production Firestore and writes to blog/src/data/articles.json
 */

const fs = require('fs');
const path = require('path');

const API_URL = 'https://us-central1-voraprep-prod.cloudfunctions.net/exportArticles';

async function main() {
  const args = process.argv.slice(2);
  const fromApi = args.includes('--from-api');
  const useMock = args.includes('--mock');
  
  const outDir = path.join(__dirname, '../blog/src/data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  // Option 1: Fetch from Cloud Function (no credentials needed)
  if (fromApi) {
    console.log('Fetching articles from Cloud Function...');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }
      const data = await response.json();
      
      fs.writeFileSync(
        path.join(outDir, 'articles.json'),
        JSON.stringify(data.articles, null, 2)
      );
      
      console.log(`✅ Fetched ${data.count} articles from Cloud Function`);
      return;
    } catch (err) {
      console.error('Failed to fetch from API:', err.message);
      console.log('Falling back to mock data...');
    }
  }
  
  // Option 2: Use mock data (for dev or when no credentials)
  if (useMock || !process.env.GOOGLE_APPLICATION_CREDENTIALS && !fs.existsSync(path.join(__dirname, '../service-account.json'))) {
    console.log('⚠️  Using mock data (no credentials or --mock flag)');
    
    const mockData = [{
      id: 'sample-1',
      slug: 'how-to-pass-cpa-exam',
      title: 'How to Pass the CPA Exam on Your First Try',
      metaTitle: 'How to Pass the CPA Exam on Your First Try | VoraPrep',
      metaDescription: 'A comprehensive guide to passing all four CPA exam sections on your first attempt with proven study strategies.',
      courseId: 'cpa',
      contentType: 'study-guide',
      generatedContent: '# How to Pass the CPA Exam\n\nThis is sample content for development builds.\n\n## Study Strategy\n\nCreate a structured study plan based on your available time.\n\n## Key Tips\n\n- Start with your weakest section\n- Do practice questions daily\n- Review every wrong answer\n\n## Final Thoughts\n\nConsistency beats intensity. Study every day.',
      publishedAt: new Date().toISOString(),
      author: 'VoraPrep Team',
    }];
    
    fs.writeFileSync(
      path.join(outDir, 'articles.json'),
      JSON.stringify(mockData, null, 2)
    );
    
    console.log(`✅ Wrote ${mockData.length} mock article(s) to blog/src/data/articles.json`);
    return;
  }
  
  // Option 3: Direct Firestore access (requires service account)
  console.log('Connecting to Firestore with service account...');
  const admin = require('firebase-admin');
  
  let credential;
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    credential = admin.credential.applicationDefault();
  } else {
    const serviceAccount = require('../service-account.json');
    credential = admin.credential.cert(serviceAccount);
  }
  
  admin.initializeApp({
    credential,
    projectId: 'voraprep-prod',
  });
  
  const db = admin.firestore();
  
  console.log('Fetching published articles from Firestore...');
  
  const snapshot = await db.collection('growth_content')
    .where('status', '==', 'published')
    .orderBy('publishedAt', 'desc')
    .limit(200)
    .get();
  
  const articles = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      slug: data.slug,
      title: data.title,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      courseId: data.courseId,
      section: data.section,
      contentType: data.contentType,
      primaryKeyword: data.primaryKeyword,
      generatedContent: data.generatedContent,
      publishedAt: data.publishedAt?.toDate?.().toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.().toISOString(),
      ogImage: data.ogImage,
      author: data.author || 'VoraPrep Team',
    };
  });
  
  fs.writeFileSync(
    path.join(outDir, 'articles.json'),
    JSON.stringify(articles, null, 2)
  );
  
  console.log(`✅ Exported ${articles.length} articles to blog/src/data/articles.json`);
}

main().catch(err => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
