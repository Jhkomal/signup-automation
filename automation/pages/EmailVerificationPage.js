const { BasePage } = require('./BasePage');

class EmailVerificationPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Email Verification code', exact: true });
    this.codeBoxes = page.locator('input');
    this.verifyButton = page.getByRole('button', { name: 'Verify Code' });
    this.resendLink = page.getByText(/Resend Code/);
    this.invalidOtpMessage = page.locator('form').getByText('Invalid OTP');

  }

  async enterCode(code) {
    await this.codeBoxes.first().click();
    await this.page.keyboard.type(String(code));
  }

  async clickVerify() {
    await this.verifyButton.click();
  }

  async verifyWithCode(code) {
    await this.enterCode(code);
    await this.clickVerify();
  }
}

module.exports = { EmailVerificationPage };
