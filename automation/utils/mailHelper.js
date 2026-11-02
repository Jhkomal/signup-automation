const API = 'https://api.mail.tm';

class MailHelper {
  constructor() {
    this.address = null;
    this.password = null;
    this.token = null;
  }

  async createInbox() {
    const domainRes = await fetch(`${API}/domains`);
    const domains = await domainRes.json();
    const domain = domains['hydra:member'][0].domain;
    const requestedAddress = `agent${Date.now()}@${domain}`;
    this.password = 'Mail@' + Date.now();

    const createRes = await fetch(`${API}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: requestedAddress, password: this.password }),
    });
    if (!createRes.ok) throw new Error('Could not create the temporary inbox');

    const account = await createRes.json();
    this.address = account.address;

    const tokenRes = await fetch(`${API}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: this.address, password: this.password }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.token) throw new Error('Could not log in to the temporary inbox');
    this.token = tokenData.token;

    return this.address;
  }

  async waitForOtp(timeoutMs = 90000) {
    const deadline = Date.now() + timeoutMs;
    console.log('Waiting for the OTP email at ' + this.address + ' ...');

    while (Date.now() < deadline) {
      const res = await fetch(`${API}/messages`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      const data = await res.json();
      const messages = data['hydra:member'] || [];

      if (messages.length > 0) {
        console.log('Email arrived - reading the code...');

        const msgRes = await fetch(`${API}/messages/${messages[0].id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        const msg = await msgRes.json();
        const body = (msg.text || '') + ' ' + (msg.html ? msg.html.join(' ') : '');
        const match = body.match(/\b\d{6}\b/);
        if (match) return match[0];
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    throw new Error('OTP email did not arrive within 90 seconds');
  }
}

module.exports = { MailHelper };
