const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.getStartedButton = page.locator('text=Get Started').first();
    this.mainHeading = page.getByRole('heading', { name: /Empowering Agents/i });
  }

  async open() {
    await this.goto('/');
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }
}

module.exports = { HomePage };
