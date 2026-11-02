const { BasePage } = require('./BasePage');

class TermsPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Register Your Agency' });
    this.agreeCheckbox = page.getByRole('checkbox');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async agreeToTerms() {
    await this.agreeCheckbox.check();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

module.exports = { TermsPage };
