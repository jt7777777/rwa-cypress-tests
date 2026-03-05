// Custom commands for RWA (Real World App)

export type NavSection = "home" | "payment" | "transactions" | "notifications" | "account";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getBySel(selector: string): Chainable<JQuery<HTMLElement>>;
      loginByUI(username?: string, password?: string): void;
      navigateTo(section: NavSection): void;
    }
  }
}

/**
 * Get element by data-test attribute
 * Usage: cy.getBySel("signin-username")
 */
Cypress.Commands.add("getBySel", (selector: string) => {
  return cy.get(`[data-test=${selector}]`);
});

/**
 * Login via UI + cy.session (cached — fast after first run)
 * Note: cy.request to :3001 does not share cookies with :3000 frontend,
 * so UI login through :3000 is required.
 * Usage: cy.loginByUI()  or  cy.loginByUI("username", "password")
 */
Cypress.Commands.add("loginByUI", (username?: string, password?: string) => {
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
Cypress.Commands.add("navigateTo", (section: NavSection) => {
  const navMap: Record<NavSection, string> = {
    home: "nav-home",
    payment: "nav-top-new-transaction",
    transactions: "nav-personal-tab",
    notifications: "nav-top-notifications-link",
    account: "nav-top-my-account-link",
  };
  cy.getBySel(navMap[section]).click();
});
