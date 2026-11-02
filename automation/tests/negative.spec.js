const { test, expect } = require('@playwright/test');

const { HomePage } = require('../pages/HomePage');
const { TermsPage } = require('../pages/TermsPage');
const { SetupPage } = require('../pages/SetupPage');
const { EmailVerificationPage } = require('../pages/EmailVerificationPage');
const { AgencyDetailsPage } = require('../pages/AgencyDetailsPage');
const { ProfessionalExperiencePage } = require('../pages/ProfessionalExperiencePage');
const { VerificationPreferencesPage } = require('../pages/VerificationPreferencesPage');

const {
  uniqueUser,
  agencyDetails,
  experienceDetails,
} = require('../utils/testData');

const { MailHelper } = require('../utils/mailHelper');

async function reachOtpPage(page) {
  const mail = new MailHelper();
  const email = await mail.createInbox();
  const user = uniqueUser(email);

  const home = new HomePage(page);
  const terms = new TermsPage(page);
  const setup = new SetupPage(page);

  await home.open();
  await home.clickGetStarted();
  await terms.agreeToTerms();
  await terms.clickContinue();
  await setup.fillPersonalDetails(user);
  await setup.clickNext();

  return { mail, user };
}

test('Invalid email format does not proceed to Email Verification', async ({ page }) => {
  const home = new HomePage(page);
  const terms = new TermsPage(page);
  const setup = new SetupPage(page);
  const emailVerification = new EmailVerificationPage(page);

  const user = uniqueUser('not-an-email'); 

  await home.open();
  await home.clickGetStarted();
  await terms.agreeToTerms();
  await terms.clickContinue();
  await setup.fillPersonalDetails(user);
  await setup.clickNext();
  await expect(setup.heading).toBeVisible();
  await expect(emailVerification.heading).not.toBeVisible();
});

test('Wrong OTP shows Invalid OTP and stays on the verification page', async ({ page }) => {
  test.setTimeout(180 * 1000);

  const { mail } = await reachOtpPage(page);
  const emailVerification = new EmailVerificationPage(page);
  const agencyPage = new AgencyDetailsPage(page);

  await expect(emailVerification.heading).toBeVisible();

  await mail.waitForOtp(); 
  await emailVerification.verifyWithCode('000000');

  await expect(emailVerification.invalidOtpMessage).toBeVisible({ timeout: 15000 });
  await expect(agencyPage.heading).not.toBeVisible();
});

test('Mismatched password and confirm password do not proceed to Email Verification', async ({ page }) => {
  const home = new HomePage(page);
  const terms = new TermsPage(page);
  const setup = new SetupPage(page);
  const emailVerification = new EmailVerificationPage(page);

  const user = uniqueUser(`user${Date.now()}@example.com`);

  await home.open();
  await home.clickGetStarted();
  await terms.agreeToTerms();
  await terms.clickContinue();

  await setup.fillPersonalDetails(user);
  await setup.confirmPasswordInput.fill('Different@123'); 
  await setup.clickNext();
  await expect(setup.heading).toBeVisible();
  await expect(emailVerification.heading).not.toBeVisible();
});
