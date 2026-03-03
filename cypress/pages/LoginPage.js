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
  fillUsername: (val) => LoginPage.username().type(val),
  fillPassword: (val) => LoginPage.password().type(val),
  submit: () => LoginPage.submitBtn().click(),
  touchField: (field) => field().find("input").focus().blur(),

  fillAndSubmit: (username, password) => {
    LoginPage.fillUsername(username);
    LoginPage.fillPassword(password);
    LoginPage.submit();
  },
};

export default LoginPage;
