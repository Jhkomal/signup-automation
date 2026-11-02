const { test, expect } = require('@playwright/test');
const path = require('path');

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
  businessDetails
} = require('../utils/testData');

const { MailHelper } = require('../utils/mailHelper');

test('Complete signup flow successfully', async ({ page }) => {

  test.setTimeout(180 * 1000);
  const mail = new MailHelper();
  const email = await mail.createInbox();
  const user = uniqueUser(email);
  const agency = agencyDetails();
  const experienceData = experienceDetails();
  const business = businessDetails();

  const home = new HomePage(page);
  const terms = new TermsPage(page);
  const setup = new SetupPage(page);
  const emailVerification = new EmailVerificationPage(page);
  const agencyPage = new AgencyDetailsPage(page);
  const experience = new ProfessionalExperiencePage(page);
  const preferences = new VerificationPreferencesPage(page);

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

  await experience.selectExperience(experienceData.level);
  await experience.fillExperienceDetails(experienceData);

  for (const service of experienceData.services) {
    await experience.selectService(service);
  }

  await expect(experience.studentsInput).toHaveValue(String(experienceData.students));
  await expect(experience.focusAreaInput).toHaveValue(experienceData.focusArea);
  await expect(experience.successMetricsInput).toHaveValue(String(experienceData.successMetrics));

  for (const service of experienceData.services) {
    await expect(experience.serviceCheckbox(service)).toBeChecked();
  }

  await experience.clickNext();
  await expect(preferences.heading).toBeVisible({ timeout: 15000 });

  await preferences.fillRegistrationNumber(business.registrationNumber);
  await preferences.selectCountries(business.countries);


  for (const type of business.institutionTypes) {
    await preferences.selectInstitutionType(type);
  }

  await preferences.fillCertificationDetails(business.certification);

  const documentPath = path.resolve(__dirname, '..', business.documentPath);
  await preferences.uploadDocument(documentPath);

  await preferences.clickSubmit();
  await expect(page).not.toHaveURL(/step=verification/, { timeout: 15000 });
});
