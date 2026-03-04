// Custom commands for RWA (Real World App)

/**
 * Get element by data-test attribute
 * Usage: cy.getBySel("signin-username")
 */
Cypress.Commands.add("getBySel", (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

/**
 * Login via UI + cy.session (cached — fast after first run)
 * Note: cy.request to :3001 does not share cookies with :3000 frontend,
 * so UI login through :3000 is required.
 * Usage: cy.loginByUI()  or  cy.loginByUI("username", "password")
 */
Cypress.Commands.add("loginByUI", (username, password) => {
  const user = username ?? Cypress.env("validUsername");
  const pass = password ?? Cypress.env("validPassword");

  cy.session(
    ["ui", user, pass],
    () => {
      cy.visit("/signin");
      cy.getBySel("signin-username").type(user);
      cy.getBySel("signin-password").type(pass);
      cy.getBySel("signin-submit").click();
      cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        cy.visit("/");
        cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
      },
    }
  );
});

/**
 * Navigate to a specific section via sidebar
 * Usage: cy.navigateTo("home" | "payment" | "transactions" | "notifications" | "account")
 */
Cypress.Commands.add("navigateTo", (section) => {
  const navMap = {
    home: "nav-home",
    payment: "nav-top-new-transaction",
    transactions: "nav-personal-tab",
    notifications: "nav-top-notifications-link",
    account: "nav-top-my-account-link",
  };
  cy.getBySel(navMap[section]).click();
});
