# AttendX Test Scripts

This repository contains Playwright automation tests for the AttendX student attendance application. These tests were created as part of a software testing practical exercise. They are intentionally generic: no real AttendX application URL or private credentials are included.

Summary
- Two Playwright JavaScript tests are provided:
  - tests/login.spec.js — verifies a student can log in and reach the dashboard.
  - tests/attendance-marking.spec.js — verifies a teacher can select a student, mark them present, save attendance, and receive confirmation.

Important: assumptions and setup
- No real AttendX URL is included. You must provide a base URL for your instance of the app.
  - Option A: Set ATTENDX_BASE_URL environment variable before running tests.
  - Option B: Edit `playwright.config.js` to set the `use.baseURL` field.
- Selectors (input names, buttons, data-test attributes) in the tests are examples. Update them to match your application's HTML.
- The tests use example test accounts (student1, teacher1) and placeholder passwords. Create test accounts or mock authentication for automated execution.

Prerequisites
- Node.js 16+ (LTS recommended)
- npm (comes with Node)
- Internet access to install dependencies

Installation
1. Clone the repository:
   git clone https://github.com/AryanMaheta/AttendX-Test-Scripts.git
   cd AttendX-Test-Scripts

2. Install dependencies:
   npm install
   npx playwright install

Running tests
- Run the full test suite:
  npm test

- Run a single test file:
  npx playwright test tests/login.spec.js

Setting the application base URL
- Set environment variable:
  export ATTENDX_BASE_URL="https://your-attendx-url"
  npm test

- Or edit `playwright.config.js` and change `use.baseURL`.

Project structure

AttendX-Test-Scripts/
├── tests/
│   ├── login.spec.js
│   └── attendance-marking.spec.js
├── README.md
├── package.json
├── playwright.config.js
└── .gitignore

Notes about verification and evidence
- I did not run these tests against a live AttendX application. You must run them against your instance and capture screenshots/terminal output for your practical report.

If you need, I can:
- Help you adapt selectors for your application by inspecting pages in a Codespace or if you paste HTML snippets.
- Guide you through running the tests locally or in GitHub Codespaces and collecting screenshots/terminal logs for the practical report.
