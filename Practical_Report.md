Practical Report - AttendX Test Scripts

Title
AttendX — Version Control of Test Scripts (Practical)

Aim
To demonstrate version control of automated test scripts for a student attendance application (AttendX) using Git and GitHub, and to produce evidence of repository setup, commits, push/pull operations, and test artifacts.

Scenario
Three QA engineers were sharing automation scripts via email and removable drives, causing overwrites and lost work. This practical demonstrates migrating to Git/GitHub, writing Playwright tests, and maintaining version history.

Tools Used
- Git (local)
- GitHub (remote repository: https://github.com/AryanMaheta/AttendX-Test-Scripts)
- Node.js and npm
- Playwright (@playwright/test)
- VS Code or GitHub Codespaces (optional)

Repository file structure (as committed)
AttendX-Test-Scripts/
├── tests/
│   ├── login.spec.js
│   └── attendance-marking.spec.js
├── README.md
├── package.json
├── playwright.config.js
├── .gitignore
└── Practical_Report.md (this file)

Files: Full test scripts

--- tests/login.spec.js ---

// tests/login.spec.js
import { test, expect } from '@playwright/test';

// NOTE: This test is written against a generic AttendX UI. Selectors and the base URL
// are assumptions and must be adjusted to match the real application under test.
// Configure the base URL in playwright.config.js or with the ATTENDX_BASE_URL env var.

test.describe('Student login', () => {
  test('Student login: valid credentials redirect to dashboard', async ({ page }) => {
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

--- tests/attendance-marking.spec.js ---

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


README summary

See README.md in the repository for installation and run instructions. Key points:
- Set ATTENDX_BASE_URL environment variable or edit playwright.config.js to point to your app.
- Update selectors and credentials to match your test environment.

Git commands and their purposes (examples)
- git --version — show installed git version
- git config --global user.name "Your Name" — set commit author name
- git config --global user.email "you@example.com" — set commit author email
- git init — initialize git repo locally (not required if cloning)
- git clone <repo-url> — clone remote repository
- git status — show working tree status
- git add . — stage changes for commit
- git commit -m "message" — create a commit
- git remote add origin <url> — add remote
- git push -u origin main — push commits to main
- git pull origin main — fetch and merge remote changes
- git log --oneline --decorate — view commit history

Recorded commits (as present on GitHub)
- 28f7c1819f356c8772aef6d88b26f679dd1157d7 — Improve login test description; add module type; add README web-edit note
- 3d19ee41751b39744cd70a6ba3af394ccab8c698 — Add AttendX login and attendance automation tests
- 91a3e0ab3ed0aa36de8c64d227cefb2d9f5051c8 — Initial commit (repo created via GitHub web UI)

Command-by-command observation table (fill with your local outputs)

| Command | Purpose | Actual output / observation (PASTE YOUR TERMINAL OUTPUT OR SCREENSHOT) |
|---|---|---|
| git --version | Verify Git installation | [Screenshot 1: git --version output] |
| git config --global user.name | Show configured name | [Screenshot 2: git config output] |
| git config --global user.email | Show configured email | [Screenshot 3: git config output] |
| git clone https://github.com/AryanMaheta/AttendX-Test-Scripts.git | Clone repo (requires auth for private repo) | [Screenshot 4: clone output] |
| git status | Check status | [Screenshot 5: git status before add] |
| git add . | Stage changes | [Screenshot 6: after git add, show git status] |
| git commit -m "Improve login test description" | Commit changes | [Screenshot 7: git commit output] |
| git push -u origin main | Push to remote | [Screenshot 8: git push output] |
| Edit README on GitHub (web) | Demonstrate web edit | [Screenshot 9: GitHub web edit commit confirmation] |
| git pull origin main | Pull remote changes | [Screenshot 10: git pull output] |
| npx playwright test | Run tests | [Screenshot 11: test run output] |

Commit history and explanation

- Initial commit (91a3e0...): repository created via GitHub initialization. Contains README and default files.
- Second commit (3d19ee4...): added tests, config, and .gitignore — this is the initial code addition.
- Third commit (28f7c18...): small modifications — improved test description, added module type in package.json, and README web-edit note. This demonstrates making a change and committing it.

Screenshots / Evidence placeholders
- Screenshot 1: git --version output
- Screenshot 2: git config --global user.name output
- Screenshot 3: git config --global user.email output
- Screenshot 4: git clone output (or gh repo clone output)
- Screenshot 5: git status (before add)
- Screenshot 6: git status (after git add)
- Screenshot 7: git commit output
- Screenshot 8: git push output
- Screenshot 9: GitHub README web-edit confirmation screenshot
- Screenshot 10: git pull origin main output
- Screenshot 11: npx playwright test output (pass/fail and test report location)

GitHub repository URL
https://github.com/AryanMaheta/AttendX-Test-Scripts

Result and conclusion

Status: Partially complete. The repository and test scripts exist and meaningful commits are present. To finish the practical you must run the local git commands (clone/pull/commit/push), capture terminal evidence, and run the Playwright tests against your application (or provide evidence you could not run them). Insert those outputs/screenshots into the placeholders above and include the filled observation table in your final Word file.

Appendix: Exact commands to paste into Word report (copy into terminal and capture output)

(See the "What you must do locally now" list in the repository README and earlier messages in this chat.)

