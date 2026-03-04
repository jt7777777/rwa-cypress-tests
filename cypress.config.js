const { defineConfig } = require("cypress");
const http = require("http");

module.exports = defineConfig({
  projectId: "25hpzw",
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      apiUrl: "http://localhost:3001",
      recipientUsername: "Arvilla_Hegmann",
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
    setupNodeEvents(on) {
      on("task", {
        resetLikes() {
          return new Promise((resolve, reject) => {
            const req = http.request(
              {
                hostname: "localhost",
                port: 3001,
                path: "/testData/seed",
                method: "POST",
              },
              (res) => {
                res.resume();
                res.on("end", () => {
                  if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(null);
                  } else {
                    reject(
                      new Error(
                        `resetLikes: /testData/seed responded with ${res.statusCode}`
                      )
                    );
                  }
                });
              }
            );
            req.on("error", reject);
            req.end();
          });
        },
      });
    },
  },
});
