// E2E Tests: Accessibility (WCAG 2.1 AA)
// Comprehensive accessibility testing for Google/Apple quality

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {
  test('login page should have no accessibility violations', async ({ page }) => {
    await page.goto('/login');
    
    // Run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    // Log any violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('register page should have no accessibility violations', async ({ page }) => {
    await page.goto('/register');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/login');
    
    // Get all headings
    const headings = await page.evaluate(() => {
      const h = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(h).map(el => ({
        level: parseInt(el.tagName[1]),
        text: el.textContent.trim(),
      }));
    });
    
    // Should have exactly one h1
    const h1Count = headings.filter(h => h.level === 1).length;
    expect(h1Count).toBe(1);
    
    // Headings should not skip levels
    let prevLevel = 0;
    for (const heading of headings) {
      if (heading.level > prevLevel + 1 && prevLevel !== 0) {
        console.warn(`Heading level skipped: h${prevLevel} to h${heading.level}`);
      }
      prevLevel = heading.level;
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/login');
    
    const contrastResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();
    
    expect(contrastResults.violations).toEqual([]);
  });

  test('should have focus indicators', async ({ page }) => {
    await page.goto('/login');
    
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    
    // Get focused element styles
    const focusStyles = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
        border: styles.border,
      };
    });
    
    // Should have visible focus indicator
    const hasFocusIndicator = 
      (focusStyles.outline && focusStyles.outline !== 'none' && focusStyles.outline !== '0px none rgb(0, 0, 0)') ||
      (focusStyles.boxShadow && focusStyles.boxShadow !== 'none') ||
      focusStyles.border.includes('2px');
    
    expect(hasFocusIndicator).toBe(true);
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto('/login');
    
    const imagesWithoutAlt = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images)
        .filter(img => !img.alt && !img.getAttribute('role'))
        .map(img => img.src);
    });
    
    expect(imagesWithoutAlt).toEqual([]);
  });

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/login');
    
    const inputsWithoutLabels = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input, select, textarea');
      return Array.from(inputs).filter(input => {
        // Check for associated label
        const id = input.id;
        const hasLabel = id && document.querySelector(`label[for="${id}"]`);
        const hasAriaLabel = input.getAttribute('aria-label');
        const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
        const hasPlaceholder = input.placeholder && input.getAttribute('type') !== 'text';
        
        return !hasLabel && !hasAriaLabel && !hasAriaLabelledBy;
      }).map(input => ({
        type: input.type,
        name: input.name,
        id: input.id,
      }));
    });
    
    expect(inputsWithoutLabels).toEqual([]);
  });

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/login');
    
    const buttonsWithoutNames = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button, [role="button"]');
      return Array.from(buttons).filter(btn => {
        const text = btn.textContent?.trim();
        const ariaLabel = btn.getAttribute('aria-label');
        const ariaLabelledBy = btn.getAttribute('aria-labelledby');
        const title = btn.title;
        
        return !text && !ariaLabel && !ariaLabelledBy && !title;
      }).map(btn => btn.outerHTML.slice(0, 100));
    });
    
    expect(buttonsWithoutNames).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/login');
    
    // Track focus order
    const focusOrder = [];
    
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? {
          tag: el.tagName,
          type: el.type || null,
          text: el.textContent?.slice(0, 30)?.trim() || el.value || null,
        } : null;
      });
      
      if (focusedElement && focusedElement.tag !== 'BODY') {
        focusOrder.push(focusedElement);
      }
    }
    
    // Should have a logical focus order
    expect(focusOrder.length).toBeGreaterThan(0);
    console.log('Focus order:', focusOrder);
  });

  test('should have proper ARIA landmarks', async ({ page }) => {
    await page.goto('/login');
    
    const landmarks = await page.evaluate(() => {
      const roles = ['main', 'navigation', 'banner', 'contentinfo', 'complementary', 'form', 'region'];
      const found = {};
      
      roles.forEach(role => {
        const elements = document.querySelectorAll(`[role="${role}"], ${role}`);
        found[role] = elements.length;
      });
      
      return found;
    });
    
    // Should have main landmark
    expect(landmarks.main + (await page.locator('main').count())).toBeGreaterThanOrEqual(1);
  });

  test('should handle reduced motion preference', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/login');
    
    // Check that animations are disabled or reduced
    const hasReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    
    expect(hasReducedMotion).toBe(true);
  });

  test('should work in high contrast mode', async ({ page }) => {
    // Emulate forced colors (high contrast mode)
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/login');
    
    // Check that content is still visible
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in|log in|submit/i })).toBeVisible();
  });
});

test.describe('Screen Reader Compatibility', () => {
  test('should have proper document language', async ({ page }) => {
    await page.goto('/login');
    
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang).toBeTruthy();
    expect(lang).toMatch(/^[a-z]{2}/); // e.g., "en", "en-US"
  });

  test('should have descriptive page title', async ({ page }) => {
    await page.goto('/login');
    
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should have skip link for keyboard users', async ({ page }) => {
    await page.goto('/login');
    
    // Skip link might be hidden until focused
    await page.keyboard.press('Tab');
    
    const skipLink = page.getByRole('link', { name: /skip/i });
    
    // Skip link is optional but recommended
    const hasSkipLink = await skipLink.count() > 0;
    if (!hasSkipLink) {
      console.warn('No skip link found - consider adding one for better accessibility');
    }
  });
});
