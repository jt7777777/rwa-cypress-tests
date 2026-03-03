const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "25hpzw",
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      apiUrl: "http://localhost:3001",
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents() {},
  },
});
