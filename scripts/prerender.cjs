#!/usr/bin/env node

/**
 * Pre-renderer for VoraPrep
 * 
 * After `vite build`, this script:
 * 1. Fetches all published blog articles from Firestore
 * 2. Starts a local static server pointing at dist/
 * 3. Crawls key public pages + all blog articles with Puppeteer
 * 4. Saves the fully-rendered HTML as static files
 * 5. Stops the server
 * 
 * This ensures Google crawlers see full HTML content immediately
 * (no waiting for React hydration / JS execution).
 * 
 * Run: node scripts/prerender.cjs
 * Also runs automatically via `npm run build` postbuild.
 */

const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PORT = 4173;

// Static pages to pre-render (public-facing, SEO-critical)
const STATIC_ROUTES = [
  '/',
  '/cpa',
  '/ea-prep',
  '/cma',
  '/cia',
  '/cfp',
  '/cisa',
  '/cpa/info',
  '/ea/info',
  '/cma/info',
  '/cia/info',
  '/cfp/info',
  '/cisa/info',
  '/about',
  '/faq',
  '/compare',
  '/pricing',
  '/pass-guarantee',
  '/blog',
];

// Hardcoded blog articles (fallback if Firestore fetch fails)
const FALLBACK_BLOG_ROUTES = [
  '/blog/cpa-exam-study-schedule-2026',
  '/blog/ea-vs-cpa-which-certification',
  '/blog/how-to-pass-far-first-try',
];

/**
 * Fetch published blog article slugs from Firestore REST API.
 * Uses the production project since that's what we want indexed.
 */
async function fetchPublishedArticles() {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'voraprep-prod';
  const collectionUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/growth_content`;
  
  try {
    // Fetch all documents (limited to 500 for safety)
    const response = await fetch(`${collectionUrl}?pageSize=500`);
    
    if (!response.ok) {
      console.log(`  ⚠️  Firestore API returned ${response.status} — using fallback routes`);
      return [];
    }
    
    const data = await response.json();
    const documents = data.documents || [];
    
    // Filter to published articles with a slug
    const publishedSlugs = documents
      .filter(doc => {
        const status = doc.fields?.status?.stringValue;
        const slug = doc.fields?.slug?.stringValue;
        return status === 'published' && slug;
      })
      .map(doc => `/blog/${doc.fields.slug.stringValue}`);
    
    console.log(`  📚 Found ${publishedSlugs.length} published articles in Firestore`);
    return publishedSlugs;
  } catch (err) {
    console.log(`  ⚠️  Could not fetch from Firestore: ${err.message}`);
    return [];
  }
}

// Simple static file server
function createServer() {
  return http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // SPA fallback: if file doesn't exist, serve index.html
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.woff2': 'font/woff2',
      '.woff': 'font/woff',
      '.webmanifest': 'application/manifest+json',
    };

    const contentType = mimeTypes[ext] || 'text/html';
    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

async function prerender() {
  console.log('\n🖨️  VoraPrep Pre-renderer');
  console.log('========================');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run `vite build` first.');
    process.exit(1);
  }

  // Build dynamic routes: static pages + published blog articles
  console.log('  Fetching published articles...');
  const dynamicBlogRoutes = await fetchPublishedArticles();
  const blogRoutes = dynamicBlogRoutes.length > 0 ? dynamicBlogRoutes : FALLBACK_BLOG_ROUTES;
  const ROUTES = [...STATIC_ROUTES, ...blogRoutes];
  
  console.log(`  📄 ${STATIC_ROUTES.length} static pages + ${blogRoutes.length} blog articles = ${ROUTES.length} total`);

  // Start local server
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`  Server running on http://localhost:${PORT}`);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  let rendered = 0;
  let failed = 0;

  for (const route of ROUTES) {
    try {
      const page = await browser.newPage();
      
      // Block unnecessary resources for speed
      await page.setRequestInterception(true);
      page.on('request', req => {
        const type = req.resourceType();
        if (['image', 'font', 'media'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      });

      // Wait for React to render content
      await page.waitForSelector('#root > *', { timeout: 10000 });
      
      // Small extra wait for any async data
      await new Promise(r => setTimeout(r, 500));

      // Get the full rendered HTML
      const html = await page.content();
      
      // Determine output path
      const outputPath = route === '/'
        ? path.join(DIST_DIR, 'index.html')
        : path.join(DIST_DIR, route, 'index.html');

      // Create directory if needed
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, html);
      rendered++;
      console.log(`  ✅ ${route}`);
      
      await page.close();
    } catch (err) {
      failed++;
      console.warn(`  ⚠️  ${route} — ${err.message}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`\n  Pre-rendered: ${rendered}/${ROUTES.length} pages (${failed} failed)`);
  console.log('  Done!\n');
}

prerender().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
