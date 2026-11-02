const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { TermsPage } = require('../pages/TermsPage');
const { SetupPage } = require('../pages/SetupPage');
const { EmailVerificationPage } = require('../pages/EmailVerificationPage');
const { AgencyDetailsPage } = require('../pages/AgencyDetailsPage');
const { ProfessionalExperiencePage } = require('../pages/ProfessionalExperiencePage');
const { uniqueUser, agencyDetails } = require('../utils/testData');
const { MailHelper } = require('../utils/mailHelper');

test('TC-58/TC-70: valid Agency Details with two regions move to Step 3', async ({ page }) => {
  test.setTimeout(180 * 1000);

  const mail = new MailHelper();
  const email = await mail.createInbox();
  const user = uniqueUser(email);
  const agency = agencyDetails();

  const home = new HomePage(page);
  const terms = new TermsPage(page);
  const setup = new SetupPage(page);
  const emailVerification = new EmailVerificationPage(page);
  const agencyPage = new AgencyDetailsPage(page);
  const experience = new ProfessionalExperiencePage(page);

  await home.open();
  await home.clickGetStarted();
  await terms.agreeToTerms();
  await terms.clickContinue();

  await setup.fillPersonalDetails(user);
  await setup.clickNext();
  await expect(emailVerification.heading).toBeVisible();

  const code = await mail.waitForOtp();
  await emailVerification.verifyWithCode(code);
  await expect(agencyPage.heading).toBeVisible({ timeout: 15000 });

  await agencyPage.fillAgencyDetails(agency);
  await agencyPage.selectRegions(agency.regions);
  await agencyPage.clickNext();

  await expect(experience.heading).toBeVisible({ timeout: 15000 });
});
