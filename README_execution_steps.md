# signup-automation
Signup flow testing for the Authorized Partner platform: manual test cases, execution and bug reports, and Playwright automation (Part A + Part B).
# Signup Testing — Execution Steps

Version: 1.0
Website tested: https://authorized-partner.vercel.app/
Repository: https://github.com/Jhkomal/signup-automation

This project contains:

- Part A — Manual testing
- Part B — Playwright automation
- Test report
- Demo video

## Versions and tools

- Playwright Test: 1.64.1
- Language: JavaScript
- Browser: Chromium
- Node.js: 18 or newer
- Temporary email: mail.tm
- Video conversion: FFmpeg 9.0.2
- System used: Windows and PowerShell

## Project structure

- `manual-testing/` — manual test cases, execution report,
  bug reports and summary
- `automation/pages/` — one page class for each signup page
- `automation/tests/` — automated test files
- `automation/utils/` — test-data generator and mail helper
- `automation/test-data/` — sample document for the upload step
- `reports/automation_test_report/` — automation test report
- `demo_video.mp4` — video of the complete signup test

## Part A — Manual testing

The manual testing contains:

- 119 test cases, from TC-01 to TC-119
- Test execution report
- 17 documented bugs
- Summary report with screenshots

Files:

- `test_cases.xlsx`
- `test_execution_report.xlsx`
- `bug_reports.xlsx`
- `test_summary.pdf`

## Part B — Automation setup

Open the terminal inside the `automation` folder and run:

    npm install
    npx playwright install

Always run the tests from inside `automation`. If the tests are
run from the main folder, Playwright cannot find its settings
and the run fails with "Cannot navigate to invalid URL".

## Run the tests

Run all tests:

    npx playwright test

Run only the complete signup test:

    npx playwright test signup.spec.js

Watch the test in the browser:

    npx playwright test --headed

Open the test report:

    npx playwright show-report

## Automated tests

There are 8 tests in total:

- `smoke.spec.js` — home page and Terms page
- `setup.spec.js` — Step 1, Set Up Your Account
- `otp.spec.js` — email verification
- `agency.spec.js` — Step 2, Agency Details
- `signup.spec.js` — complete signup happy path, TC-119
- `negative.spec.js` — 3 negative tests:
  invalid email, wrong OTP and password mismatch

## How the automation is written

- Playwright and the Page Object Model are used.
- Each signup page has its own page class.
- All locators and actions are inside the page classes.
- Tests only call page methods and check the result.
- No hard-coded waits are used.
- New test data is created for every run.
- No real password or secret is saved in the code.
- The website address can be changed using `BASE_URL` in the
  Playwright config.
- Tests are run normally. No load testing was done.

## How the OTP works

1. The mail helper creates a fresh temporary inbox using mail.tm.
2. The test uses that email address for signup.
3. The website sends the OTP to that inbox.
4. The helper checks the inbox every 3 seconds.
5. When the email arrives, it reads the 6-digit code.
6. The test enters the code and clicks Verify Code.

This makes the complete signup flow fully automatic.
No person needs to open an email or type the OTP.

One problem was found with mail.tm: it removes dots from email
addresses. So the helper creates the address without dots and
uses the exact address returned by mail.tm.

## Report and demo video

After the tests run, the HTML report is saved in:

    reports/automation_test_report/

The demo video is saved in the main folder as:

    demo_video.mp4

It shows the complete signup test running in the browser.
