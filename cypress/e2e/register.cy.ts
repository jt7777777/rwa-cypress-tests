import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

describe("Registration", () => {
  it("TC-AUTH-005: Successful registration with valid credentials", () => {
    const uniqueUsername = `user_${Date.now()}`;
    const user = {
      firstName: "Test",
      lastName: "User",
      username: uniqueUsername,
      password: "s3cret",
    };

    RegisterPage.visit();
    RegisterPage.fillAndSubmit(user);

    // After registration the app redirects to /signin (no auto-login)
    cy.url().should("include", "/signin");

    // New credentials work — log in
    LoginPage.fillAndSubmit(user.username, user.password);

    // Redirected to home feed
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);

    // New user sees onboarding dialog
    cy.getBySel("user-onboarding-dialog").should("be.visible");

    // Username visible in navbar
    cy.getBySel("sidenav-username").should("contain", user.username);
  });
});
