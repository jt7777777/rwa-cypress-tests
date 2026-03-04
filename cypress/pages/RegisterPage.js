const RegisterPage = {
  visit: () => cy.visit("/signup"),

  // Selectors
  firstName: () => cy.getBySel("signup-first-name"),
  lastName: () => cy.getBySel("signup-last-name"),
  username: () => cy.getBySel("signup-username"),
  password: () => cy.getBySel("signup-password"),
  confirmPassword: () => cy.getBySel("signup-confirmPassword"),
  submitBtn: () => cy.getBySel("signup-submit"),

  // Actions
  fillFirstName: (val) => RegisterPage.firstName().type(val),
  fillLastName: (val) => RegisterPage.lastName().type(val),
  fillUsername: (val) => RegisterPage.username().type(val),
  fillPassword: (val) => RegisterPage.password().type(val),
  fillConfirmPassword: (val) => RegisterPage.confirmPassword().type(val),
  submit: () => RegisterPage.submitBtn().click(),

  fillAndSubmit: ({ firstName, lastName, username, password }) => {
    RegisterPage.fillFirstName(firstName);
    RegisterPage.fillLastName(lastName);
    RegisterPage.fillUsername(username);
    RegisterPage.fillPassword(password);
    RegisterPage.fillConfirmPassword(password);
    RegisterPage.submit();
  },
};

export default RegisterPage;
