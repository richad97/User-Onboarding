describe("Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  const form = () => cy.get("form[name=form]");
  const nameInput = () => cy.get("input[name=name]");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const checkboxInput = () => cy.get("input[name=terms]");
  const submitButton = () => cy.get("button[name=submitButton]");

  it("Sanity Check", () => {
    expect(1 + 2).to.equal(3);
  });

  it("Can type in name input", () => {
    nameInput()
      .should("have.value", "")
      .type("Tommy")
      .should("have.value", "Tommy");
  });

  it("Can type in email input", () => {
    emailInput()
      .should("have.value", "")
      .type("tom123@gmail.com")
      .should("have.value", "tom123@gmail.com");
  });

  it("Can type in password input", () => {
    passwordInput()
      .should("have.value", "")
      .type("1234")
      .should("have.value", "1234");
  });

  it("Can check terms input", () => {
    checkboxInput().not("[disabled]").check().should("be.checked");
  });

  it("Submit button should be disabled", () => {
    submitButton().should("be.disabled");
  });

  it("Can fill and submit form", () => {
    nameInput()
      .should("have.value", "")
      .type("Tommy")
      .should("have.value", "Tommy");
    emailInput()
      .should("have.value", "")
      .type("tom123@gmail.com")
      .should("have.value", "tom123@gmail.com");
    passwordInput()
      .should("have.value", "")
      .type("1234")
      .should("have.value", "1234");
    checkboxInput().not("[disabled]").check().should("be.checked");
    form().submit();
  });

  it("Checking form validation", () => {
    nameInput().should("have.value", "").type("Tommy").clear();
    cy.contains("Name is required.");
  });
});
