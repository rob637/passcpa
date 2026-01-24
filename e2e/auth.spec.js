// E2E Tests: Authentication Flow
// Tests the complete user authentication journey

import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show login page for unauthenticated users', async ({ page }) => {
    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
    
    // Should display login form
    await expect(page.getByRole('heading', { name: /sign in|log in|welcome/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test('should have accessible login form', async ({ page }) => {
    await page.goto('/login');
    
    // Check form accessibility
    const emailInput = page.getByLabel(/email/i);
    const passwordInput = page.getByLabel(/password/i);
    
    // Inputs should have proper labels
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Tab navigation should work
    await emailInput.focus();
    await page.keyboard.press('Tab');
    await expect(passwordInput).toBeFocused();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /sign in|log in|submit/i });
    await submitButton.click();
    
    // Should show validation messages
    await expect(page.getByText(/required|enter|invalid/i)).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill invalid credentials
    await page.getByLabel(/email/i).fill('invalid@test.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    
    // Submit
    await page.getByRole('button', { name: /sign in|log in|submit/i }).click();
    
    // Should show error message
    await expect(page.getByText(/invalid|incorrect|failed/i)).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to registration page', async ({ page }) => {
    await page.goto('/login');
    
    // Click register link
    await page.getByRole('link', { name: /register|sign up|create account/i }).click();
    
    // Should be on registration page
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByRole('heading', { name: /create|sign up|register/i })).toBeVisible();
  });

  test('should navigate to forgot password', async ({ page }) => {
    await page.goto('/login');
    
    // Click forgot password link
    await page.getByRole('link', { name: /forgot|reset/i }).click();
    
    // Should be on forgot password page
    await expect(page).toHaveURL(/\/forgot-password/);
  });
});

test.describe('Registration Flow', () => {
  test('should show registration form', async ({ page }) => {
    await page.goto('/register');
    
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i).first()).toBeVisible();
  });

  test('should validate password requirements', async ({ page }) => {
    await page.goto('/register');
    
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).first().fill('weak');
    
    // Submit
    await page.getByRole('button', { name: /create|sign up|register/i }).click();
    
    // Should show password requirement error
    await expect(page.getByText(/password|characters|strong/i)).toBeVisible();
  });
});
