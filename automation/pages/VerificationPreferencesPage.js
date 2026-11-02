const { BasePage } = require('./BasePage');

class VerificationPreferencesPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Provide Business Details and Set Preferences' });
    this.registrationNumberInput = page.getByPlaceholder('Enter your registration number');
    this.countriesDropdown = page.locator('text=Select Your Preferred Countries >> visible=true');
    this.countrySearch = page.getByPlaceholder('Search...');
    this.certificationInput = page.getByPlaceholder('E.g., ICEF Certified Education Agent');
    this.fileInputs = page.locator('input[type="file"]');
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async fillRegistrationNumber(number) {
    await this.registrationNumberInput.fill(number);
  }

  
  async selectCountries(countryNames) {
    await this.countriesDropdown.click();
    for (const countryName of countryNames) {
      await this.countrySearch.fill(countryName);
      await this.page.getByText(countryName, { exact: true }).click();
      await this.countrySearch.fill('');
    }
    await this.page.keyboard.press('Escape');
  }

  institutionCheckbox(typeName) {
    return this.page.getByRole('checkbox', { name: typeName });
  }

  async selectInstitutionType(typeName) {
    await this.institutionCheckbox(typeName).check();
  }

  async fillCertificationDetails(text) {
    await this.certificationInput.fill(text);
  }

  async uploadDocument(filePath) {
    await this.fileInputs.first().setInputFiles(filePath);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async clickBack() {
    await this.backButton.click();
  }
}

module.exports = { VerificationPreferencesPage };
