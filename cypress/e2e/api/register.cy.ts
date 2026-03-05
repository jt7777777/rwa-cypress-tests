describe("API - Register (POST /users)", () => {
  const apiUrl = () => Cypress.env("apiUrl");

  it("TC-API-REG-001: Successful registration with valid data returns 201 and user object", () => {
    const username = `api_user_${Date.now()}`;

    cy.request({
      method: "POST",
      url: `${apiUrl()}/users`,
      body: {
        firstName: "Api",
        lastName: "Test",
        username,
        password: "s3cret",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("user");

      const { user } = response.body;
      expect(user).to.have.property("id");
      expect(user).to.have.property("uuid");
      expect(user.firstName).to.eq("Api");
      expect(user.lastName).to.eq("Test");
      expect(user.username).to.eq(username);
      // Password must be hashed, not plain text
      expect(user.password).to.not.eq("s3cret");
    });
  });

  it("TC-API-REG-002: Empty body returns 422 with validation errors", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl()}/users`,
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).to.have.property("errors");
      expect(response.body.errors).to.be.an("array").and.not.be.empty;
    });
  });

  it("TC-API-REG-003: Invalid avatar URL returns 422", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl()}/users`,
      body: {
        firstName: "Api",
        lastName: "Test",
        username: `api_user_${Date.now()}`,
        password: "s3cret",
        avatar: "not-a-valid-url",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body).to.have.property("errors");
      expect(response.body.errors).to.be.an("array").and.not.be.empty;
    });
  });

  it("TC-API-REG-004: Registered user can log in", () => {
    const username = `api_user_${Date.now()}`;
    const password = "s3cret";

    // Register
    cy.request({
      method: "POST",
      url: `${apiUrl()}/users`,
      body: { firstName: "Api", lastName: "Test", username, password },
    }).then((regResponse) => {
      expect(regResponse.status).to.eq(201);

      // Login with newly created credentials
      cy.request({
        method: "POST",
        url: `${apiUrl()}/login`,
        body: { username, password },
        failOnStatusCode: false,
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);
      });
    });
  });
});
