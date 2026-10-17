// tests/login.spec.js
import { test, expect } from '@playwright/test';

// NOTE: This test is written against a generic AttendX UI. Selectors and the base URL
// are assumptions and must be adjusted to match the real application under test.
// Configure the base URL in playwright.config.js or with the ATTENDX_BASE_URL env var.

test.describe('Student login', () => {
  test('student can log in and reach the dashboard', async ({ page }) => {
    // Assumptions about selectors:
    // - Login page at '/login' or baseURL
    // - Username input: input[name="username"]
    // - Password input: input[name="password"]
    // - Login button: button[type="submit"]
    // - Dashboard contains text 'Dashboard' or an element with data-test="dashboard"

    await page.goto('/login');

    // Replace these test credentials with a valid test account or mock the backend.
    await page.fill('input[name="username"]', 'student1');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    // Wait for navigation and assert the dashboard is visible
    await page.waitForLoadState('networkidle');

    // Prefer explicit selector if available:
    const dashboard = page.locator('text=Dashboard').first();
    await expect(dashboard).toBeVisible({ timeout: 5000 });

    // Optional: check URL contains /dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
