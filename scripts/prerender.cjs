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

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PORT = 4173;

// Static pages to pre-render (public-facing, SEO-critical).
// Scoped to CPA conversion path — add other certs back as we focus on them.
const STATIC_ROUTES = [
  '/',
  '/cpa',
  '/cpa/info',
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

  // Build dynamic routes: static pages + published blog articles.
  // Blog routes are skipped on focused (CPA-only) runs to keep the
  // deploy fast; set PRERENDER_BLOG=1 to include them.
  let blogRoutes = [];
  if (process.env.PRERENDER_BLOG === '1') {
    console.log('  Fetching published articles...');
    const dynamicBlogRoutes = await fetchPublishedArticles();
    blogRoutes = dynamicBlogRoutes.length > 0 ? dynamicBlogRoutes : FALLBACK_BLOG_ROUTES;
  }
  const ROUTES = [...STATIC_ROUTES, ...blogRoutes];

  console.log(`  📄 ${STATIC_ROUTES.length} static pages + ${blogRoutes.length} blog articles = ${ROUTES.length} total`);

  // Start local server
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`  Server running on http://localhost:${PORT}`);

  // Launch Playwright Chromium
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (compatible; VoraPrep-Prerender/1.0)',
  });
  // Block unnecessary resource types for speed.
  await context.route('**/*', (route) => {
    const type = route.request().resourceType();
    if (['image', 'font', 'media'].includes(type)) {
      return route.abort();
    }
    return route.continue();
  });

  let rendered = 0;
  let failed = 0;

  for (const route of ROUTES) {
    try {
      const page = await context.newPage();
      page.on('pageerror', (err) =>
        console.warn(`  … ${route} pageerror: ${err.message}`)
      );

      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: 'networkidle',
          timeout: 20000,
        });
      } catch {
        // networkidle can time out if Firebase keeps long-poll connections open
        // — we capture the current DOM regardless.
      }

      // Wait for React to actually render real content (not just the boot skeleton).
      await page
        .waitForFunction(
          () => {
            const r = document.getElementById('root');
            return (
              r &&
              r.children.length > 0 &&
              !r.querySelector('.vp-boot') &&
              (r.innerText || '').length > 200
            );
          },
          { timeout: 15000 }
        )
        .catch(() => {});

      // Small extra wait for any async data
      await page.waitForTimeout(600);

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
