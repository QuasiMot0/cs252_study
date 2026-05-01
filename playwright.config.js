const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 15000,
  use: {
    baseURL: 'http://localhost:8252',
    headless: true,
  },
  webServer: {
    command: 'python3 -m http.server 8252',
    url: 'http://localhost:8252',
    reuseExistingServer: false,
  },
});
