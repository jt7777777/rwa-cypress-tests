import TransactionPage from "../pages/TransactionPage";

describe("Transactions", () => {
  beforeEach(() => {
    cy.loginByUI();
    cy.visit("/");
  });

  it("TC-TRX-001: Create new payment transaction with all fields", () => {
    const amount = "50";
    const description = "TC-TRX-001 test payment";

    // Navigate to new transaction form
    cy.navigateTo("payment");
    cy.url().should("include", "/transaction/new");

    // Step 1: Search and select recipient
    TransactionPage.searchUser(Cypress.env("recipientUsername"));
    TransactionPage.selectFirstUser();

    // Step 2: Fill in amount and description
    TransactionPage.fillAmount(amount);
    TransactionPage.fillDescription(description);

    // Pay button should be enabled
    TransactionPage.payBtn().should("not.be.disabled");

    // Step 3: Submit payment
    TransactionPage.submitPayment();

    // App stays on /transaction/new and shows success confirmation (stepThree)
    cy.url().should("include", "/transaction/new");
    TransactionPage.successReturnBtn().should("be.visible");

    // Success message contains amount and description
    TransactionPage.successMessage()
      .should("contain", "$50.00")
      .and("contain", description);
  });

  it("TC-TRX-002: Create transaction with missing amount", () => {
    const description = "TC-TRX-002 test payment";

    // Navigate to new transaction form
    cy.navigateTo("payment");
    cy.url().should("include", "/transaction/new");

    // Step 1: Search and select recipient
    TransactionPage.searchUser(Cypress.env("recipientUsername"));
    TransactionPage.selectFirstUser();

    // Step 2: Touch amount field (focus + blur) to trigger validation, leave it empty
    TransactionPage.amountInput().click().blur();

    // Fill only description
    TransactionPage.fillDescription(description);

    // Validation error should be visible for amount
    TransactionPage.amountValidationError().should("be.visible");

    // Pay and Request buttons should be disabled
    TransactionPage.payBtn().should("be.disabled");
    TransactionPage.requestBtn().should("be.disabled");
  });

  it("TC-TRX-003: Create transaction with missing description", () => {
    const amount = "50";

    // Navigate to new transaction form
    cy.navigateTo("payment");
    cy.url().should("include", "/transaction/new");

    // Step 1: Search and select recipient
    TransactionPage.searchUser(Cypress.env("recipientUsername"));
    TransactionPage.selectFirstUser();

    // Step 2: Fill amount, touch description field (focus + blur) to trigger validation, leave it empty
    TransactionPage.fillAmount(amount);
    TransactionPage.descriptionInput().click().blur();

    // Validation error should be visible for description
    TransactionPage.descriptionValidationError().should('have.text', 'Please enter a note');

    // Pay and Request buttons should be disabled
    TransactionPage.payBtn().should("be.disabled");
    TransactionPage.requestBtn().should("be.disabled");
  });

  it("TC-TRX-004: Like a transaction", () => {
    // Reset all likes so the test is idempotent
    cy.task("resetLikes");

    // Navigate to home (public transaction feed)
    cy.visit("/");

    // Open first transaction in the list
    TransactionPage.transactionItem(0).click({ scrollBehavior: "center" });

    // Record current like count, then click like
    TransactionPage.likeCount()
      .invoke("text")
      .then((before) => {
        const beforeCount = parseInt(before, 10);
        TransactionPage.likeBtn().click();

        // Like count should increase by 1
        TransactionPage.likeCount().should("contain", String(beforeCount + 1));
      });
  });
});
