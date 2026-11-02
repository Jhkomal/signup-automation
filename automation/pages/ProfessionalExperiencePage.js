const { BasePage } = require('./BasePage');

class ProfessionalExperiencePage extends BasePage {
  constructor(page) {
    super(page);

    this.heading = page.getByRole('heading', {
      name: 'Experience and Performance Metrics'
    });

    this.experienceDropdown = page.getByText(
      'Select Your Experience Level'
    );

    this.studentsInput = page.getByPlaceholder(
      'Enter an approximate number.'
    );

    this.focusAreaInput = page.getByPlaceholder(
      'E.g., Undergraduate admissions to Canada.'
    );

    this.successMetricsInput = page.getByPlaceholder('E.g., 90%');

    this.backButton = page.getByRole('button', { name: 'Back' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  async selectExperience(level) {
    await this.experienceDropdown.click();

    await this.page
      .getByRole('listbox')
      .getByRole('option', { name: level, exact: true })
      .click();
  }

  async fillExperienceDetails(details) {
    await this.studentsInput.fill(String(details.students));
    await this.focusAreaInput.fill(details.focusArea);
    await this.successMetricsInput.fill(String(details.successMetrics));
  }

  serviceCheckbox(serviceName) {
    return this.page.getByRole('checkbox', { name: serviceName });
  }

  async selectService(serviceName) {
    await this.serviceCheckbox(serviceName).check();
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async clickBack() {
    await this.backButton.click();
  }
}

module.exports = { ProfessionalExperiencePage };