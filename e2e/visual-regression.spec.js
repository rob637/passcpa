// E2E Tests: Visual Regression Tests
// Captures and compares visual snapshots of key pages and components
// Playwright's toHaveScreenshot() automatically handles baseline creation and comparison

import { test, expect } from '@playwright/test';

// ============================================================================
// Configuration
// ============================================================================

const SNAPSHOT_OPTIONS = {
  // Allow some pixel difference for anti-aliasing variations across systems
  maxDiffPixels: 100,
  // Or use percentage threshold
  maxDiffPixelRatio: 0.01,
  // Animations can cause flaky screenshots
  animations: 'disabled',
  // Mask dynamic content
  mask: [],
};

// ============================================================================
// Core UI Components - Visual Regression
// ============================================================================

test.describe('Visual Regression: Core UI', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations to complete
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('login-page.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });

  test('login page - form validation state', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Trigger validation by clicking submit without filling form
    const submitButton = page.getByRole('button', { name: /sign in|log in|submit/i });
    await submitButton.click();
    
    await page.waitForTimeout(300);
    
    await expect(page).toHaveScreenshot('login-validation-errors.png', SNAPSHOT_OPTIONS);
  });

  test('register page renders correctly', async ({ page }) => {
    await page.goto('/register');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('register-page.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });

  test('forgot password page renders correctly', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('forgot-password-page.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });
});

// ============================================================================
// Public Pages - Visual Regression
// ============================================================================

test.describe('Visual Regression: Public Pages', () => {
  test('terms page renders correctly', async ({ page }) => {
    await page.goto('/terms');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('terms-page.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });

  test('privacy page renders correctly', async ({ page }) => {
    await page.goto('/privacy');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('privacy-page.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });
});

// ============================================================================
// Component Library - Visual Regression  
// ============================================================================

test.describe('Visual Regression: UI Components', () => {
  test('button states render correctly', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Screenshot of primary button
    const submitButton = page.getByRole('button', { name: /sign in|log in|submit/i });
    await expect(submitButton).toHaveScreenshot('button-primary.png');
    
    // Hover state
    await submitButton.hover();
    await page.waitForTimeout(100);
    await expect(submitButton).toHaveScreenshot('button-primary-hover.png');
  });

  test('input field states render correctly', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    const emailInput = page.getByLabel(/email/i);
    
    // Empty state
    await expect(emailInput).toHaveScreenshot('input-empty.png');
    
    // Focused state
    await emailInput.focus();
    await page.waitForTimeout(100);
    await expect(emailInput).toHaveScreenshot('input-focused.png');
    
    // Filled state
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveScreenshot('input-filled.png');
  });

  test('form validation error styling', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Fill only email, trigger validation
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByRole('button', { name: /sign in|log in|submit/i }).click();
    await page.waitForTimeout(300);
    
    // Capture the email input with error state
    const emailField = page.locator('input[type="email"]').first();
    await expect(emailField).toHaveScreenshot('input-error-state.png');
  });
});

// ============================================================================
// Responsive Design - Visual Regression
// ============================================================================

test.describe('Visual Regression: Responsive Design', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    test(`login page at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/login');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot(`login-${viewport.name}.png`, {
        ...SNAPSHOT_OPTIONS,
        fullPage: true,
      });
    });
  }

  for (const viewport of viewports) {
    test(`register page at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/register');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot(`register-${viewport.name}.png`, {
        ...SNAPSHOT_OPTIONS,
        fullPage: true,
      });
    });
  }
});

// ============================================================================
// Dark Mode - Visual Regression
// ============================================================================

test.describe('Visual Regression: Dark Mode', () => {
  test.use({ colorScheme: 'dark' });

  test('login page in dark mode', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('login-dark-mode.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });

  test('register page in dark mode', async ({ page }) => {
    await page.goto('/register');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('register-dark-mode.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });
});

// ============================================================================
// Accessibility Visual States - Visual Regression
// ============================================================================

test.describe('Visual Regression: Accessibility States', () => {
  test('high contrast mode support', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Emulate forced-colors mode (high contrast)
    await page.emulateMedia({ forcedColors: 'active' });
    await page.waitForTimeout(300);
    
    await expect(page).toHaveScreenshot('login-high-contrast.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });

  test('reduced motion preference', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Emulate prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(300);
    
    // Verify animations are disabled - page should render immediately
    await expect(page).toHaveScreenshot('login-reduced-motion.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });

  test('focus visible states for keyboard navigation', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Tab to email field
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    
    // The focus ring should be visible
    await expect(page).toHaveScreenshot('login-focus-visible-email.png', SNAPSHOT_OPTIONS);
    
    // Tab to password field
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    
    await expect(page).toHaveScreenshot('login-focus-visible-password.png', SNAPSHOT_OPTIONS);
    
    // Tab to submit button
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    
    await expect(page).toHaveScreenshot('login-focus-visible-submit.png', SNAPSHOT_OPTIONS);
  });
});

// ============================================================================
// Loading States - Visual Regression
// ============================================================================

test.describe('Visual Regression: Loading States', () => {
  test('page loader component', async ({ page }) => {
    // Slow down network to capture loading state
    await page.route('**/*', route => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(route.continue());
        }, 500);
      });
    });
    
    await page.goto('/login');
    
    // Try to capture loading spinner if visible
    const spinner = page.locator('[class*="spinner"], [class*="loader"], [class*="loading"]');
    if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
      await expect(spinner).toHaveScreenshot('loading-spinner.png');
    }
  });
});

// ============================================================================
// Error States - Visual Regression
// ============================================================================

test.describe('Visual Regression: Error States', () => {
  test('404 page renders correctly', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('404-page.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });

  test('authentication error toast/message', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Fill with invalid credentials
    await page.getByLabel(/email/i).fill('fake@email.com');
    await page.getByLabel(/password/i).fill('wrongpassword123');
    
    // Submit
    await page.getByRole('button', { name: /sign in|log in|submit/i }).click();
    
    // Wait for error message to appear
    await page.waitForTimeout(2000);
    
    // Capture the error state
    await expect(page).toHaveScreenshot('login-auth-error.png', {
      ...SNAPSHOT_OPTIONS,
      // Mask any dynamic timestamps
      mask: [page.locator('[data-testid="timestamp"]')],
    });
  });
});

// ============================================================================
// Print Styles - Visual Regression (Optional)
// ============================================================================

test.describe('Visual Regression: Print Styles', () => {
  test('login page print layout', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Emulate print media
    await page.emulateMedia({ media: 'print' });
    await page.waitForTimeout(300);
    
    await expect(page).toHaveScreenshot('login-print.png', {
      ...SNAPSHOT_OPTIONS,
      fullPage: true,
    });
  });
});
