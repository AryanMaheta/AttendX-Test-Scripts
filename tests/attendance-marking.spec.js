// tests/attendance-marking.spec.js
import { test, expect } from '@playwright/test';

// NOTE: This test simulates a teacher marking attendance.
// Adjust selectors and flows to match the real AttendX application.

test.describe('Attendance marking', () => {
  test('teacher can select a student, mark present, save attendance and receive confirmation', async ({ page }) => {
    // Assumptions:
    // - Teacher login is available at /login
    // - Teacher credentials: teacher1 / Password123!
    // - After login, there is a class list or attendance page at /attendance
    // - Students are selectable via a table/list with data-test attributes or checkboxes
    // - Save button has text 'Save' or data-test="save-attendance"
    // - Confirmation appears as text 'Attendance saved' or a toast

    // Log in as teacher
    await page.goto('/login');
    await page.fill('input[name="username"]', 'teacher1');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');

    // Navigate to attendance page (if app does not redirect automatically)
    await page.goto('/attendance');

    // Select a student (example selector — adapt to your app)
    // Try a checkbox in a student row, or a 'Mark Present' button
    const firstStudentCheckbox = page.locator('input[data-test="student-checkbox"]').first();

    if (await firstStudentCheckbox.count() > 0) {
      await firstStudentCheckbox.check();
    } else {
      // Fallback: click the first row's 'Present' button
      const presentButton = page.locator('button:has-text("Present")').first();
      await presentButton.click();
    }

    // Click save
    const saveButton = page.locator('button[data-test="save-attendance"]');
    if (await saveButton.count() > 0) {
      await saveButton.click();
    } else {
      await page.click('button:has-text("Save")');
    }

    // Assert confirmation
    const confirmation = page.locator('text=Attendance saved').first();
    await expect(confirmation).toBeVisible({ timeout: 5000 });
  });
});
