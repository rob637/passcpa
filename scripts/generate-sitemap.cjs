#!/usr/bin/env node

/**
 * Auto-Sitemap Generator
 * 
 * Generates a comprehensive sitemap.xml from:
 * 1. Static routes (homepage, exam landing pages, legal pages)
 * 2. Blog articles (from BlogIndex ARTICLES registry)
 * 3. Dynamic content pages (from content engine briefs)
 * 
 * Run: node scripts/generate-sitemap.cjs
 * Also runs automatically during `npm run build` via prebuild script.
 * 
 * Output: public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://voraprep.com';
const TODAY = new Date().toISOString().split('T')[0];

// ============================================================================
// Static Routes — manually maintained, these are our core pages
// ============================================================================

const STATIC_ROUTES = [
  // Homepage
  { loc: '/', priority: '1.0', changefreq: 'weekly' },

  // Exam Landing Pages (highest priority after homepage)
  { loc: '/cpa', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ea-prep', priority: '0.9', changefreq: 'weekly' },
  { loc: '/cma', priority: '0.9', changefreq: 'weekly' },
  { loc: '/cia', priority: '0.9', changefreq: 'weekly' },
  { loc: '/cfp', priority: '0.9', changefreq: 'weekly' },
  { loc: '/cisa', priority: '0.9', changefreq: 'weekly' },

  // Exam Info Pages (detailed exam content)
  { loc: '/cpa/info', priority: '0.8', changefreq: 'monthly' },
  { loc: '/ea/info', priority: '0.8', changefreq: 'monthly' },
  { loc: '/cma/info', priority: '0.8', changefreq: 'monthly' },
  { loc: '/cia/info', priority: '0.8', changefreq: 'monthly' },
  { loc: '/cfp/info', priority: '0.8', changefreq: 'monthly' },
  { loc: '/cisa/info', priority: '0.8', changefreq: 'monthly' },

  // Content Pages
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/faq', priority: '0.7', changefreq: 'monthly' },
  { loc: '/compare', priority: '0.8', changefreq: 'monthly' },
  { loc: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { loc: '/pass-guarantee', priority: '0.6', changefreq: 'monthly' },

  // Blog Index
  { loc: '/blog', priority: '0.8', changefreq: 'weekly' },

  // Legal Pages
  { loc: '/terms', priority: '0.3', changefreq: 'yearly' },
  { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { loc: '/help', priority: '0.4', changefreq: 'monthly' },

  // Auth Pages (useful for branded search)
  { loc: '/login', priority: '0.5', changefreq: 'monthly' },
  { loc: '/signup', priority: '0.6', changefreq: 'monthly' },
];

// ============================================================================
// Blog Articles — scan the blog directory for article components
// ============================================================================

function discoverBlogArticles() {
  const blogDir = path.join(__dirname, '..', 'src', 'components', 'pages', 'blog');
  const articles = [];

  if (!fs.existsSync(blogDir)) {
    console.log('  Blog directory not found, skipping blog articles');
    return articles;
  }

  const files = fs.readdirSync(blogDir);
  
  // Look for the BlogIndex to extract article slugs
  const blogIndexPath = path.join(blogDir, 'BlogIndex.tsx');
  if (fs.existsSync(blogIndexPath)) {
    const content = fs.readFileSync(blogIndexPath, 'utf-8');
    
    // Extract slug values from ARTICLES array
    const slugMatches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
    for (const match of slugMatches) {
      articles.push({
        loc: `/blog/${match[1]}`,
        priority: '0.7',
        changefreq: 'monthly',
      });
    }
  }

  // Also check for any article files that might not be in BlogIndex yet
  const articleFiles = files.filter(f => 
    f.endsWith('.tsx') && 
    f !== 'BlogIndex.tsx' && 
    f !== 'BlogLayout.tsx' &&
    !f.startsWith('_') &&
    !f.endsWith('.test.tsx')
  );

  // Cross-reference: add any article files not yet found via slugs
  for (const file of articleFiles) {
    // Convert PascalCase to kebab-case for slug
    const slug = file
      .replace('.tsx', '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    
    const blogPath = `/blog/${slug}`;
    if (!articles.some(a => a.loc === blogPath)) {
      // Don't auto-add — these need proper slugs from BlogIndex
      console.log(`  Note: ${file} found but not in BlogIndex ARTICLES array`);
    }
  }

  return articles;
}

// ============================================================================
// Exam Section Pages — individual exam section study pages
// ============================================================================

function getExamSectionPages() {
  // These are internal app pages that require auth, so we only include
  // the public-facing exam pages. The app's internal routes are excluded
  // from the sitemap (they're behind auth).
  return [];
}

// ============================================================================
// Generate XML
// ============================================================================

function generateSitemapXML(routes) {
  const urls = routes.map(route => `  <url>
    <loc>${DOMAIN}${route.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// ============================================================================
// Generate robots.txt
// ============================================================================

function generateRobotsTxt() {
  return `# VoraPrep robots.txt — Auto-generated by scripts/generate-sitemap.cjs
# Last updated: ${TODAY}

User-agent: *

# Public pages — allow crawling
Allow: /
Allow: /cpa
Allow: /cpa/info
Allow: /ea-prep
Allow: /ea/info
Allow: /cma
Allow: /cma/info
Allow: /cia
Allow: /cia/info
Allow: /cfp
Allow: /cfp/info
Allow: /cisa
Allow: /cisa/info
Allow: /about
Allow: /faq
Allow: /compare
Allow: /pricing
Allow: /pass-guarantee
Allow: /blog
Allow: /blog/*
Allow: /login
Allow: /signup
Allow: /terms
Allow: /privacy
Allow: /help

# App routes — disallow (behind auth)
Disallow: /dashboard
Disallow: /study
Disallow: /practice
Disallow: /progress
Disallow: /flashcards
Disallow: /exam
Disallow: /exam-simulator
Disallow: /onboarding
Disallow: /diagnostic
Disallow: /settings
Disallow: /ai-tutor
Disallow: /admin
Disallow: /admin/*
Disallow: /api/

# Sitemaps
Sitemap: ${DOMAIN}/sitemap.xml

# Crawl-delay: be polite
Crawl-delay: 1
`;
}

// ============================================================================
// Main
// ============================================================================

function main() {
  console.log('🗺️  VoraPrep Sitemap Generator');
  console.log('================================');

  // Collect all routes
  const allRoutes = [...STATIC_ROUTES];
  console.log(`  Static routes: ${STATIC_ROUTES.length}`);

  // Blog articles
  const blogArticles = discoverBlogArticles();
  allRoutes.push(...blogArticles);
  console.log(`  Blog articles: ${blogArticles.length}`);

  // Section pages
  const sectionPages = getExamSectionPages();
  allRoutes.push(...sectionPages);

  console.log(`  Total URLs: ${allRoutes.length}`);
  console.log('');

  // Generate sitemap.xml
  const sitemapXML = generateSitemapXML(allRoutes);
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXML);
  console.log(`  ✅ Written: public/sitemap.xml (${allRoutes.length} URLs)`);

  // Generate robots.txt  
  const robotsTxt = generateRobotsTxt();
  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt);
  console.log(`  ✅ Written: public/robots.txt`);

  console.log('');
  console.log('Done! Both files will be included in the next build/deploy.');
}

main();
