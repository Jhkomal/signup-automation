const { BasePage } = require('./BasePage');

class AgencyDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'About your Agency' });
    this.nameInput = page.getByPlaceholder('Enter Agency Name');
    this.roleInput = page.getByPlaceholder('Enter Your Role in Agency');
    this.emailInput = page.getByPlaceholder('Enter Your Agency Email Address');
    this.websiteInput = page.getByPlaceholder('Enter Your Agency Website');
    this.addressInput = page.getByPlaceholder('Enter Your Agency Address');
    this.regionDropdown = page.locator('text=Select Your Region of Operation >> visible=true');
    this.regionSearch = page.getByPlaceholder('Search...');
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  async fillAgencyDetails(agency) {
    await this.nameInput.fill(agency.name);
    await this.roleInput.fill(agency.role);
    await this.emailInput.fill(agency.email);
    await this.websiteInput.fill(agency.website);
    await this.addressInput.fill(agency.address);
  }


  async selectRegions(regionNames) {
    await this.regionDropdown.click();
    for (const regionName of regionNames) {
      await this.regionSearch.fill(regionName);
      await this.page.getByText(regionName, { exact: true }).click();
      await this.regionSearch.fill('');
    }
    await this.page.keyboard.press('Escape');
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async clickBack() {
    await this.backButton.click();
  }
}

module.exports = { AgencyDetailsPage };
