// E2E Tests: Practice Session Flow
// Tests the core practice question functionality

import { test, expect } from '@playwright/test';

// Helper to bypass auth for testing (would use test users in real setup)
test.describe('Practice Session', () => {
  // Skip auth for now - in production you'd use test accounts
  test.skip('should start a practice session', async ({ page }) => {
    await page.goto('/practice');
    
    // Should show practice configuration
    await expect(page.getByText(/practice|questions/i)).toBeVisible();
    
    // Select options
    await page.getByRole('button', { name: /10/i }).click();
    
    // Start session
    await page.getByRole('button', { name: /start/i }).click();
    
    // Should show first question
    await expect(page.getByText(/question 1/i)).toBeVisible({ timeout: 10000 });
  });

  test.skip('should navigate between questions', async ({ page }) => {
    await page.goto('/practice?start=true&count=5');
    
    // Wait for question to load
    await expect(page.getByText(/question/i)).toBeVisible({ timeout: 10000 });
    
    // Answer and go next
    await page.getByRole('button').nth(1).click(); // Select answer
    await page.getByRole('button', { name: /next/i }).click();
    
    // Should show question 2
    await expect(page.getByText(/question 2/i)).toBeVisible();
  });

  test.skip('should show explanation after answering', async ({ page }) => {
    await page.goto('/practice?start=true&count=5');
    
    await expect(page.getByText(/question/i)).toBeVisible({ timeout: 10000 });
    
    // Select and submit answer
    await page.getByRole('button').nth(1).click();
    await page.getByRole('button', { name: /submit|check/i }).click();
    
    // Should show explanation
    await expect(page.getByText(/explanation/i)).toBeVisible();
  });

  test.skip('should support keyboard navigation', async ({ page }) => {
    await page.goto('/practice?start=true&count=5');
    
    await expect(page.getByText(/question/i)).toBeVisible({ timeout: 10000 });
    
    // Press 1 to select first answer
    await page.keyboard.press('1');
    
    // Press Enter to submit
    await page.keyboard.press('Enter');
    
    // Should show result
    await expect(page.getByText(/correct|incorrect/i)).toBeVisible();
  });
});

test.describe('Practice Session - Accessibility', () => {
  test.skip('should be navigable with keyboard only', async ({ page }) => {
    await page.goto('/practice');
    
    // Tab through all interactive elements
    const tabbableElements = [];
    let previousFocused = null;
    
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      
      if (focused === previousFocused) break;
      if (focused && focused !== 'BODY') {
        tabbableElements.push(focused);
      }
      previousFocused = focused;
    }
    
    // Should have tabbable elements
    expect(tabbableElements.length).toBeGreaterThan(0);
  });

  test.skip('should announce question changes to screen readers', async ({ page }) => {
    await page.goto('/practice?start=true&count=5');
    
    // Check for aria-live regions
    const liveRegion = page.locator('[aria-live]');
    await expect(liveRegion).toBeVisible();
  });
});
