const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { TermsPage } = require('../pages/TermsPage');
const { SetupPage } = require('../pages/SetupPage');

test('TC-04/TC-11/TC-12: home page opens the terms page, and Continue becomes active only after the checkbox is ticked', async ({ page }) => {
  const home = new HomePage(page);
  const terms = new TermsPage(page);
  const step1 = new SetupPage(page);

  await home.open();
  await expect(home.mainHeading).toBeVisible();

  await home.clickGetStarted();
  await expect(page).toHaveURL(/\/register/);
  await expect(terms.heading).toBeVisible();
  await expect(terms.continueButton).toHaveClass(/bg-gray-200/);
  await terms.agreeToTerms();
  await expect(terms.continueButton).not.toHaveClass(/bg-gray-200/);

  await terms.clickContinue();
  await expect(step1.heading).toBeVisible();
});
