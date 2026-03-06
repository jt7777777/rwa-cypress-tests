interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

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
  fillFirstName: (val: string) => RegisterPage.firstName().type(val),
  fillLastName: (val: string) => RegisterPage.lastName().type(val),
  fillUsername: (val: string) => RegisterPage.username().type(val),
  fillPassword: (val: string) => RegisterPage.password().type(val),
  fillConfirmPassword: (val: string) => RegisterPage.confirmPassword().type(val),
  submit: () => RegisterPage.submitBtn().click(),

  fillAndSubmit: ({ firstName, lastName, username, password }: RegisterFormData) => {
    RegisterPage.fillFirstName(firstName);
    RegisterPage.fillLastName(lastName);
    RegisterPage.fillUsername(username);
    RegisterPage.fillPassword(password);
    RegisterPage.fillConfirmPassword(password);
    RegisterPage.submit();
  },
};

export default RegisterPage;
