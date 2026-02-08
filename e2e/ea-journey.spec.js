// E2E Tests: Enrolled Agent (EA) User Journey
// Verifies proper loading and navigation for EA specific features

import { test, expect } from '@playwright/test';

test.describe('EA User Journey', () => {

  test('should display the EA landing page correctly', async ({ page }) => {
    await page.goto('/ea-prep');
    
    // Branding and specific EA text
    await expect(page.getByText('Enrolled Agent').first()).toBeVisible();
    // Fix: Use exact property or header role to avoid strict mode violation (matching span vs h2)
    await expect(page.getByRole('heading', { name: /Special Enrollment Examination/i })).toBeVisible();
    await expect(page.getByText('IRS').first()).toBeVisible();
    
    // Check for the "Beta" free access logic mentioned in updates
    await expect(page.getByText(/free|beta/i).first()).toBeVisible();
    
    // Navigation check
    const startButton = page.getByRole('link', { name: /start|register|sign/i }).first();
    await expect(startButton).toBeVisible();
  });

  // Info page is protected, so removing this test for unauthenticated E2E run

  test('should navigate to study plan setup from landing page', async ({ page }) => {
    // Start at landing page
    await page.goto('/ea-prep');
    
    // Click Start
    const startButton = page.getByRole('link', { name: /start|register|sign/i }).first();
    await startButton.click();
    
    // It should redirect to login or register
    await expect(page).toHaveURL(/login|register|onboarding/);
  });

});
