describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit('/login')
  });

  it('Should display email validation message for invalid email', () => {
    cy.get('input[type="email"]').type('invalid-email')
    cy.contains('Login').click()
    cy.get('.alert').should('contain', 'NOT A VALID EMAIL')
  });

  it('Should disable the login button if email or password is missing', () => {
    cy.get('input[type="email"]').type('valid-email@example.com')
    cy.get('button[type=submit]').should('be.disabled')
    cy.get('input[type="password"]').type('password')
    cy.get('button[type=submit]').should('not.be.disabled')
  });
  
  it('Should not login, Password Needed', () => {
    cy.url().should('include', 'login')
    cy.get('input[type="email"]').type('valid-email@example.com')
    cy.get('button[type=submit]').should('be.disabled')
  });

  it('Should not login, Email Needed', () => {
    cy.url().should('include', 'login')
    cy.get('input[type="password"]').type('password')
    cy.get('button[type=submit]').should('be.disabled')
  });

  it('Should not login, Email Invalid, no @', () => {
    cy.url().should('include', 'login')
    cy.get('input[type="email"]').type('invalid-email')
    cy.get('input[type="password"]').type('password')
    cy.get('.alert').should('contain', 'NOT A VALID EMAIL')
  });

  it('Should not login, Email Invalid, no .com', () => {
    cy.url().should('include', 'login')
    cy.get('input[type="email"]').type('invalid-email@example')
    cy.get('input[type="password"]').type('password')
    cy.get('.alert').should('contain', 'NOT A VALID EMAIL')
  });

  it('Should login', () => {
    cy.url().should('include', 'login')
    cy.get('input[type="email"]').type('valid-email@example.com')
    cy.get('input[type="password"]').type('password')
    cy.get('button[type=submit]').should('not.be.disabled')
  });
})
