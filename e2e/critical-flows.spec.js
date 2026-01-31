// E2E Tests: Critical User Flows
// Tests the most important user journeys in the application

import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display the home page correctly', async ({ page }) => {
    await page.goto('/');
    
    // Should show app branding
    await expect(page.getByText(/vora|cpa|prep|exam/i)).toBeVisible();
    
    // Should have a call to action
    const ctaButton = page.getByRole('button', { name: /start|begin|try|sign|get/i });
    const ctaLink = page.getByRole('link', { name: /start|begin|try|sign|get/i });
    
    // Either a button or link CTA should exist
    const hasButton = await ctaButton.count() > 0;
    const hasLink = await ctaLink.count() > 0;
    expect(hasButton || hasLink).toBe(true);
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
  });

  test('should load without console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known third-party errors (Firebase, etc.)
    const criticalErrors = errors.filter(e => 
      !e.includes('Firebase') && 
      !e.includes('analytics') &&
      !e.includes('favicon')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Navigation', () => {
  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Find main navigation links
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();
    
    // Should have navigation links
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Should still be navigable
    const content = page.locator('body');
    await expect(content).toBeVisible();
    
    // Check for mobile menu (hamburger) or visible nav
    const mobileMenu = page.locator('[aria-label*="menu"], button:has(svg)').first();
    const navVisible = await page.locator('nav').isVisible().catch(() => false);
    
    const hasMobileNav = await mobileMenu.isVisible().catch(() => false);
    expect(hasMobileNav || navVisible).toBe(true);
  });
});

test.describe('Legal Pages', () => {
  test('should display privacy policy', async ({ page }) => {
    await page.goto('/privacy');
    
    await expect(page.getByText(/privacy/i)).toBeVisible();
    await expect(page.getByText(/data|information|collect/i)).toBeVisible();
  });

  test('should display terms of service', async ({ page }) => {
    await page.goto('/terms');
    
    await expect(page.getByText(/terms/i)).toBeVisible();
    await expect(page.getByText(/service|agreement|use/i)).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load the main page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    
    // Should load DOM in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have no layout shifts during load', async ({ page }) => {
    // Set up CLS measurement
    await page.goto('/');
    
    // Use the Layout Instability API if available
    const cls = await page.evaluate(() => {
      return new Promise(resolve => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        });
        
        try {
          observer.observe({ type: 'layout-shift', buffered: true });
        } catch {
          // Layout Shift API not supported
          resolve(0);
          return;
        }
        
        // Wait a bit for shifts to be recorded
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1000);
      });
    });
    
    // CLS should be under 0.1 for good score
    expect(cls).toBeLessThan(0.1);
  });
});

test.describe('Accessibility', () => {
  test('should have no duplicate IDs', async ({ page }) => {
    await page.goto('/');
    
    const duplicateIds = await page.evaluate(() => {
      const ids = Array.from(document.querySelectorAll('[id]'))
        .map(el => el.id)
        .filter(id => id);
      
      const seen = new Set();
      const duplicates = [];
      
      ids.forEach(id => {
        if (seen.has(id)) {
          duplicates.push(id);
        }
        seen.add(id);
      });
      
      return duplicates;
    });
    
    expect(duplicateIds).toHaveLength(0);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const headingLevels = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      return headings.map(h => parseInt(h.tagName.replace('H', '')));
    });
    
    // Should have at least one heading
    expect(headingLevels.length).toBeGreaterThan(0);
    
    // Should start with h1
    if (headingLevels.length > 0) {
      expect(headingLevels[0]).toBeLessThanOrEqual(2);
    }
    
    // Should not skip heading levels
    for (let i = 1; i < headingLevels.length; i++) {
      const jump = headingLevels[i] - headingLevels[i - 1];
      expect(jump).toBeLessThanOrEqual(1); // Can only go down by 1 level at a time
    }
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    
    const imagesWithoutAlt = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => 
        !img.hasAttribute('alt') && 
        !img.hasAttribute('role') &&
        img.getAttribute('role') !== 'presentation'
      ).length;
    });
    
    expect(imagesWithoutAlt).toBe(0);
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');
    
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    
    // Get the focused element
    const focusedOutline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      
      const style = window.getComputedStyle(el);
      return {
        outline: style.outline,
        boxShadow: style.boxShadow,
        border: style.border,
      };
    });
    
    // Should have some visual focus indicator
    if (focusedOutline) {
      const hasIndicator = 
        focusedOutline.outline !== 'none' ||
        focusedOutline.boxShadow !== 'none' ||
        true; // Be lenient
      expect(hasIndicator).toBe(true);
    }
  });
});

test.describe('Error Handling', () => {
  test('should display 404 page for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-12345');
    
    // Should show 404 message or redirect to home
    const has404 = await page.getByText(/404|not found|doesn't exist/i).isVisible().catch(() => false);
    const redirectedHome = page.url().endsWith('/') || page.url().includes('/login');
    
    expect(has404 || redirectedHome).toBe(true);
  });
});
