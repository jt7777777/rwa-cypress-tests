const TransactionPage = {
  // Navigation
  visitNew: () => cy.visit("/transaction/new"),

  // New transaction form - step 1: select recipient
  userSearch: () => cy.getBySel("user-list-search-input"),
  userListItem: (index = 0) => cy.getBySel("users-list").find("li").eq(index),

  // New transaction form - step 2: fill amount & note
  amountInput: () => cy.get("#amount"),
  descriptionInput: () => cy.get("#transaction-create-description-input"),
  payBtn: () => cy.getBySel("transaction-create-submit-payment"),
  requestBtn: () => cy.getBySel("transaction-create-submit-request"),

  // Validation
  amountValidationError: () => cy.get("#transaction-create-amount-input-helper-text"),
  descriptionValidationError: () => cy.get("#transaction-create-description-input-helper-text"),

  // Transaction list & detail
  transactionItem: (index = 0) =>
    cy.get('[data-test^="transaction-item"]').eq(index),
  likeBtn: () => cy.get('[data-test^="transaction-like-button"]'),
  likeCount: () => cy.get('[data-test^="transaction-like-count"]'),

  // Step 3 success view (app stays on /transaction/new after payment)
  successReturnBtn: () => cy.getBySel("new-transaction-return-to-transactions"),
  createAnotherBtn: () => cy.getBySel("new-transaction-create-another-transaction"),
  successMessage: () => cy.get("h2"),

  // Actions
  searchUser: (query) => {
    TransactionPage.userSearch().type(query, { force: true });
  },
  selectFirstUser: () => {
    TransactionPage.userListItem(0).click();
  },
  fillAmount: (amount) => {
    TransactionPage.amountInput().type(amount);
  },
  fillDescription: (desc) => {
    TransactionPage.descriptionInput().type(desc);
  },
  submitPayment: () => {
    TransactionPage.payBtn().click();
  },
  submitRequest: () => {
    TransactionPage.requestBtn().click();
  },
};

export default TransactionPage;
