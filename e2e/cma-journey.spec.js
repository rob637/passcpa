// E2E Tests: CMA User Journey
// Verifies proper loading and navigation for CMA specific features

import { test, expect } from '@playwright/test';

test.describe('CMA User Journey', () => {

  test('should display the CMA landing page correctly', async ({ page }) => {
    await page.goto('/cma-prep');
    
    // Check for "CMA" branding
    await expect(page.getByText('Certified Management Accountant').first()).toBeVisible();
    
    // Check for Part 1 and Part 2 descriptions (from CMALanding.tsx)
    await expect(page.getByText('Financial Planning, Performance & Analytics')).toBeVisible();
    await expect(page.getByText('Strategic Financial Management')).toBeVisible();
    
    // Check for key benefits
    await expect(page.getByText('Global Recognition')).toBeVisible();
    await expect(page.getByText('58% more')).toBeVisible();
  });

  test('should have a working info page', async ({ page }) => {
    // Navigate to the info page
    await page.goto('/cma/info');
    
    // Check headers
    await expect(page.getByRole('heading', { name: /Certified Management Accountant/i })).toBeVisible();
    
    // Check specific stats from CMAInfo.tsx
    // "Global Pass Rate" is in the stats grid
    await expect(page.getByText('Global Pass Rate')).toBeVisible();
    
    // Check for structure
    await expect(page.getByText('Exam Structure & Content')).toBeVisible();
    
    // Verify Part 1 and 2 headers from the course structure section
    await expect(page.getByText('Financial Planning, Performance, and Analytics').first()).toBeVisible();
  });

  test('should navigate to study plan setup', async ({ page }) => {
    // Note: This page requires auth, checking for redirect
    await page.goto('/cma/study-plan');
    
    // Should redirect to login or show login prompt
    await expect(page).toHaveURL(/login|onboarding/);
  });

  test('should protect the dashboard route', async ({ page }) => {
    await page.goto('/cma');
    await expect(page).toHaveURL(/login|onboarding/);
  });

  test('should protect the section route', async ({ page }) => {
    await page.goto('/cma/section/CMA1');
    await expect(page).toHaveURL(/login|onboarding/);
  });

  test('should protect the exam route', async ({ page }) => {
    await page.goto('/cma-exam');
    await expect(page).toHaveURL(/login|onboarding/);
  });

});
