describe('Registration Page Tests', () => {
  it('Should fill every field and clicks button', () => {
    cy.visit('/register')
    cy.url().should('include', 'register')
    cy.get('[placeholder="First Name"]').type('First')
    cy.get('[placeholder="Last Name"]').type('Last')
    cy.get('[type="email"]').type('example@email.com')
    cy.get('[type="password"]').first().type('password')
    cy.get('[type="password"]').eq(1).type('password')
    cy.get('[placeholder="Phone Number"]').type('0123456789')
    cy.get('[type="submit"]').click()
  });

  it('Should not register if  empty field', () => {
    cy.visit('/register')
    cy.get('[placeholder="First Name"]').type('First')
    cy.get('[placeholder="Last Name"]').type('Last')
    cy.get('[type="email"]').type('example@email.com')
    cy.get('[type="password"]').first().type('password')
    cy.get('[type="password"]').eq(1).type('password')
    cy.get('[type="submit"]').should('be.disabled')
    cy.get('[placeholder="Phone Number"]').clear()
    cy.get('[type="submit"]').should('be.disabled')
    cy.get('[placeholder="Phone Number"]').type('0123456789')
    cy.get('[type="password"]').first().type('password').clear()
    cy.get('[type="submit"]').should('be.disabled')
    cy.get('[type="password"]').first().type('password')
    cy.get('[type="email"]').clear()
    cy.get('[type="submit"]').should('be.disabled')
  });

  it('Should not submit if email is invalid', () => {
    cy.visit('/register')
    cy.get('[placeholder="First Name"]').type('First')
    cy.get('[placeholder="Last Name"]').type('Last')
    cy.get('[type="password"]').first().type('password')
    cy.get('[type="password"]').eq(1).type('password')
    cy.get('[placeholder="Phone Number"]').type('0123456789')
    cy.get('[type="email"]').type('exampleemail.com')
    cy.get('.alert').contains('NOT A VALID EMAIL')
    cy.get('[type="submit"]').should('be.disabled')
    cy.get('[type="email"]').clear()
    cy.get('[type="email"]').type('example@emailcom')
    cy.get('.alert').contains('NOT A VALID EMAIL')
    cy.get('[type="submit"]').should('be.disabled')
    cy.get('[type="email"]').clear()
    cy.get('[type="email"]').type('example@email.com')
    cy.get('[type="submit"]').should('be.enabled')
  });

  it('Should require passwords to match', () => {
    cy.visit('/register')
    cy.get('[type="password"]').first().type('password')
    cy.get('[type="password"]').eq(1).type('passwor')
    cy.get('.alert').contains('PASSWORDS DO NOT MATCH')
    cy.get('[type="password"]').eq(1).type('d')
    cy.get('.alert').should('not.exist')
  });

})
