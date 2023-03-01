describe('Login Page Tests', () => {
  it('Should not login, Password Needed', () => {
    cy.visit('/login')
    cy.url().should('include', 'login')
    cy.get('[name="username"]').type('username')
    cy.get('[type="submit"]').click()
  });

  it('Should not login, Username Needed', () => {
    cy.visit('/login')
    cy.url().should('include', 'login')
    cy.get('[name="password"]').type('password')
    cy.get('[type="submit"]').click()
  });

  it('Username and Password Needed', () => {
    cy.visit('/login')
    cy.url().should('include', 'login')
    cy.get('[type="submit"]').click()
  });

  it('Username and Password Needed', () => {
    cy.visit('/login')
    cy.url().should('include', 'login')
    cy.get('[type="submit"]').click()
  });

})
