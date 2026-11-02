const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { TermsPage } = require('../pages/TermsPage');
const { SetupPage } = require('../pages/SetupPage');
const { EmailVerificationPage } = require('../pages/EmailVerificationPage');
const { uniqueUser } = require('../utils/testData');
const { MailHelper } = require('../utils/mailHelper');

test('TC-18: valid Step 1 details move to the Email Verification page', async ({ page }) => {
  const mail = new MailHelper();
  const email = await mail.createInbox();
  const user = uniqueUser(email);

  const home = new HomePage(page);
  const terms = new TermsPage(page);
  const setup = new SetupPage(page);
  const emailVerification = new EmailVerificationPage(page);

  await home.open();
  await home.clickGetStarted();
  await terms.agreeToTerms();
  await terms.clickContinue();

  await setup.fillPersonalDetails(user);
  await setup.clickNext();

  await expect(emailVerification.heading).toBeVisible();
});
