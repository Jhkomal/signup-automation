const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { TermsPage } = require('../pages/TermsPage');
const { SetupPage } = require('../pages/SetupPage');
const { EmailVerificationPage } = require('../pages/EmailVerificationPage');
const { AgencyDetailsPage } = require('../pages/AgencyDetailsPage');
const { uniqueUser } = require('../utils/testData');
const { MailHelper } = require('../utils/mailHelper');

test('TC-39: entering the correct OTP moves to Step 2 - Agency Details', async ({ page }) => {
  test.setTimeout(180 * 1000); // this test also waits for a real email to arrive

  const mail = new MailHelper();
  const email = await mail.createInbox();
  const user = uniqueUser(email);

  const home = new HomePage(page);
  const terms = new TermsPage(page);
  const setup = new SetupPage(page);
  const emailVerification = new EmailVerificationPage(page);
  const agency = new AgencyDetailsPage(page);

  await home.open();
  await home.clickGetStarted();
  await terms.agreeToTerms();
  await terms.clickContinue();

  await setup.fillPersonalDetails(user);
  await setup.clickNext();
  await expect(emailVerification.heading).toBeVisible();

  const code = await mail.waitForOtp();
  await emailVerification.verifyWithCode(code);

  await expect(agency.heading).toBeVisible();
});
