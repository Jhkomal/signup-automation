const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  reporter: [['html', { outputFolder: '../reports/playwright-report', open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://authorized-partner.vercel.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
