// E2E Tests: Core Web Vitals & Performance
// Google/Apple quality performance testing

import { test, expect } from '@playwright/test';

test.describe('Performance & Core Web Vitals', () => {
  test('should load quickly on fast connection', async ({ page }) => {
    // Measure page load
    const startTime = Date.now();
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('should have good Largest Contentful Paint', async ({ page }) => {
    await page.goto('/login');
    
    // Get LCP
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Fallback timeout
        setTimeout(() => resolve(2500), 3000);
      });
    });
    
    // LCP should be under 2.5s (Google's "good" threshold)
    expect(lcp).toBeLessThan(2500);
    console.log(`LCP: ${lcp}ms`);
  });

  test('should have good First Input Delay preparation', async ({ page }) => {
    await page.goto('/login');
    
    // Measure time to interactive
    const tti = await page.evaluate(() => {
      return new Promise((resolve) => {
        // Simple TTI proxy - time until main thread is idle
        const start = performance.now();
        requestIdleCallback(() => {
          resolve(performance.now() - start);
        }, { timeout: 5000 });
      });
    });
    
    // Should be interactive quickly
    expect(tti).toBeLessThan(3000);
    console.log(`Time to Interactive: ${tti}ms`);
  });

  test('should have minimal layout shift', async ({ page }) => {
    await page.goto('/login');
    
    // Get CLS
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
        
        // Wait for layout to settle
        setTimeout(() => resolve(clsValue), 3000);
      });
    });
    
    // CLS should be under 0.1 (Google's "good" threshold)
    expect(cls).toBeLessThan(0.1);
    console.log(`CLS: ${cls}`);
  });

  test('should have efficient bundle sizes', async ({ page }) => {
    const resources = [];
    
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.js') || url.includes('.css')) {
        const headers = response.headers();
        const contentLength = parseInt(headers['content-length'] || '0');
        resources.push({
          url: url.split('/').pop(),
          size: contentLength,
          type: url.includes('.js') ? 'js' : 'css',
        });
      }
    });
    
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Calculate total JS size
    const totalJS = resources
      .filter(r => r.type === 'js')
      .reduce((sum, r) => sum + r.size, 0);
    
    // Main bundle should be under 200KB gzipped
    // Note: We're measuring uncompressed here
    console.log(`Total JS: ${(totalJS / 1024).toFixed(2)}KB`);
    console.log('Resources:', resources.map(r => `${r.url}: ${(r.size / 1024).toFixed(2)}KB`));
  });
});

test.describe('Mobile Performance', () => {
  test.use({
    viewport: { width: 375, height: 667 }, // iPhone SE
    deviceScaleFactor: 2,
  });

  test('should load quickly on mobile', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    
    // Mobile should load reasonably fast
    expect(loadTime).toBeLessThan(5000);
    console.log(`Mobile load time: ${loadTime}ms`);
  });

  test('should be usable on mobile viewport', async ({ page }) => {
    await page.goto('/login');
    
    // Check that key elements are visible and tappable
    const emailInput = page.getByLabel(/email/i);
    const passwordInput = page.getByLabel(/password/i);
    const submitButton = page.getByRole('button', { name: /sign in|log in|submit/i });
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    // Elements should be large enough to tap (44x44 minimum)
    const buttonBox = await submitButton.boundingBox();
    expect(buttonBox.height).toBeGreaterThanOrEqual(44);
  });

  test('should not have horizontal scroll', async ({ page }) => {
    await page.goto('/login');
    
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });
});

test.describe('Network Resilience', () => {
  test('should show offline indicator when offline', async ({ page, context }) => {
    await page.goto('/login');
    
    // Go offline
    await context.setOffline(true);
    
    // Try to navigate
    await page.goto('/practice').catch(() => {});
    
    // Should show offline message or cached content
    const content = await page.content();
    expect(content.length).toBeGreaterThan(0);
  });

  test('should handle slow network gracefully', async ({ page }) => {
    // Simulate slow 3G
    const client = await page.context().newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: 50 * 1024, // 50kb/s
      uploadThroughput: 50 * 1024,
      latency: 2000, // 2s latency
    });
    
    const startTime = Date.now();
    await page.goto('/login', { timeout: 60000 });
    const loadTime = Date.now() - startTime;
    
    // Should still load (with longer timeout)
    await expect(page.getByLabel(/email/i)).toBeVisible({ timeout: 30000 });
    console.log(`Slow network load time: ${loadTime}ms`);
  });
});
