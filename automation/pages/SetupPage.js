const { BasePage } = require('./BasePage');

class SetupPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Provide your personal details.' });
    this.firstNameInput = page.getByPlaceholder('Enter Your First Name');
    this.lastNameInput = page.getByPlaceholder('Enter Your Last Name');
    this.emailInput = page.getByPlaceholder('Enter Your Email Address');
    this.phoneInput = page.getByPlaceholder('00-00000000');
    this.passwordInput = page.locator('//label[text()="Password"]/following::input[1]');
    this.confirmPasswordInput = page.locator('//label[text()="Confirm Password"]/following::input[1]');
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  async fillPersonalDetails(user) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.phoneInput.fill(user.phone);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
  }

  async clickNext() {
    await this.nextButton.click();
  }
}

module.exports = { SetupPage };
