import LoginPage from "../pages/LoginPage";

describe("Authentication", () => {
  it("TC-AUTH-001: Successful login with valid credentials", () => {
    LoginPage.visit();
    LoginPage.fillAndSubmit(Cypress.env("validUsername"), Cypress.env("validPassword"));

    // Redirected to home feed
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);

    // Session cookie stored
    cy.getCookie("connect.sid").should("exist");

    // Username visible in navbar
    cy.getBySel("sidenav-username").should("contain", Cypress.env("validUsername"));
  });

  it("TC-AUTH-002: Login with invalid password", () => {
    LoginPage.visit();
    LoginPage.fillAndSubmit(Cypress.env("validUsername"), Cypress.env("invalidPassword"));

    // Error message displayed
    LoginPage.errorMessage()
      .should("be.visible")
      .and("contain", "Username or password is invalid");

    // User stays on login page
    cy.url().should("include", "/signin");

    // No session cookie
    cy.getCookie("connect.sid").should("be.null");
  });

  it("TC-AUTH-003: Login with non-existing username", () => {
    LoginPage.visit();
    LoginPage.fillAndSubmit(Cypress.env("invalidUsername"), Cypress.env("validPassword"));

    // Error message displayed
    LoginPage.errorMessage()
      .should("be.visible")
      .and("contain", "Username or password is invalid");

    // User stays on login page
    cy.url().should("include", "/signin");
  });

  it("TC-AUTH-004: Login with empty fields", () => {
    LoginPage.visit();

    // Trigger username validation - touch without typing
    LoginPage.touchField(LoginPage.username);

    // Trigger password validation - type 1 char to satisfy value !== initialValue condition
    LoginPage.fillPassword("a");
    LoginPage.touchField(LoginPage.password);

    // Validation errors shown
    LoginPage.usernameError().should("contain", "Username is required");
    LoginPage.passwordError().should("contain", "Password must contain at least 4 characters");

    // Form not submitted - submit button is disabled
    LoginPage.submitBtn().should("be.disabled");
  });

  it("TC-AUTH-008: Successful logout", () => {
    // UI login required — loginByApi sets cookie on localhost:3001 (backend),
    // which the frontend (localhost:3000) does not receive on cy.visit
    LoginPage.visit();
    LoginPage.fillAndSubmit(Cypress.env("validUsername"), Cypress.env("validPassword"));
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);

    // Click Sign Out in sidebar
    // Note: TC says "click username → Sign Out" but the app exposes
    // sidenav-signout directly in the sidebar without a username click
    cy.getBySel("sidenav-signout").click();

    // Redirected to /signin (not home feed as TC states — unauthorized state = /signin)
    cy.url().should("include", "/signin");

    // Session cookie removed
    cy.getCookie("connect.sid").should("be.null");

    // Sign In form visible (sign in/sign up accessible)
    LoginPage.submitBtn().should("be.visible");
  });
});
