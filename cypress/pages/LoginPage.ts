const LoginPage = {
  visit: () => cy.visit("/signin"),

  // Selectors
  username: () => cy.getBySel("signin-username"),
  password: () => cy.getBySel("signin-password"),
  submitBtn: () => cy.getBySel("signin-submit"),
  errorMessage: () => cy.getBySel("signin-error"),
  usernameError: () => cy.getBySel("signin-username").find("p"),
  passwordError: () => cy.getBySel("signin-password").find("p"),

  // Actions
  fillUsername: (val: string) => LoginPage.username().type(val),
  fillPassword: (val: string) => LoginPage.password().type(val),
  submit: () => LoginPage.submitBtn().click(),
  touchField: (field: () => Cypress.Chainable) => field().find("input").focus().blur(),

  fillAndSubmit: (username: string, password: string) => {
    LoginPage.fillUsername(username);
    LoginPage.fillPassword(password);
    LoginPage.submit();
  },
};

export default LoginPage;
