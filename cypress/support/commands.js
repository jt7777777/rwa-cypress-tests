// Custom commands for RWA (Real World App)

/**
 * Get element by data-test attribute
 * Usage: cy.getBySel("signin-username")
 */
Cypress.Commands.add("getBySel", (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

/**
 * Login via API + cy.session (best practice - bypasses UI for non-auth tests)
 * Usage: cy.loginByApi()  or  cy.loginByApi("username", "password")
 */
Cypress.Commands.add("loginByApi", (username, password) => {
  const user = username ?? Cypress.env("validUsername");
  const pass = password ?? Cypress.env("validPassword");

  cy.session(
    ["api", user, pass],
    () => {
      cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/login`,
        body: { username: user, password: pass },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        cy.request(`${Cypress.env("apiUrl")}/checkAuth`).its("status").should("eq", 200);
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
