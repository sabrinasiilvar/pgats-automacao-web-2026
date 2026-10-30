const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    reportFilename: 'trabalho-final',
    html: true,
    json: true,
    saveJson: true,
    overwrite: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    reportPageTitle: 'Relatório do Trabalho Final - Automation Exercise',
  },
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    screenshotOnRunFailure: true,
    video: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
