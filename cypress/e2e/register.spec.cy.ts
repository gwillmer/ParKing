describe('Registration Page Tests', () => {
  it('Should not register, not an email', () => {
    cy.visit('/register')
    cy.url().should('include', 'register')
    cy.get('#email').type('exampleemail')
    cy.get('#username').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('[name="confirm-password"]').type('password')
    cy.get('[type="submit"]').click()
  });

  it('Should not register, no passwords', () => {
    cy.visit('/register')
    cy.url().should('include', 'register')
    cy.get('#email').type('exampleemail@email.com')
    cy.get('#username').type('username')
    cy.get('[type="submit"]').click()
  });

  it('Should not register, no confirmation password', () => {
    cy.visit('/register')
    cy.url().should('include', 'register')
    cy.get('#email').type('exampleemail@email.com')
    cy.get('#username').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('[type="submit"]').click()
  });

  it('Should not register, no password', () => {
    cy.visit('/register')
    cy.url().should('include', 'register')
    cy.get('#email').type('exampleemail@email.com')
    cy.get('#username').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('[name="confirm-password"]').type('password')
    cy.get('[type="submit"]').click()
  });

  it('Should not register, no email', () => {
    cy.visit('/register')
    cy.url().should('include', 'register')
    cy.get('#username').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('[name="confirm-password"]').type('password')
    cy.get('[type="submit"]').click()
  });

  it('Should register', () => {
    cy.visit('/register')
    cy.url().should('include', 'register')
    cy.get('#email').type('exampleemail@email.com')
    cy.get('#username').type('username')
    cy.get('[name="password"]').type('password')
    cy.get('[name="confirm-password"]').type('password')
    cy.get('[type="submit"]').click()
  });

})
