describe('Navigates between tabs', () => {

  it('Asserts logo on main page', () => {
      cy.visit('/events')
      cy.get('.navbar-brand > img').should('exist')
  });

  it('Clicks on Buy', () => {
    cy.visit('/login')
    cy.contains('Buy').click()
    cy.url().should('include', 'buy') 
  });

  it('Clicks on Sell', () => {
    cy.visit('/events')
    cy.get('[routerLink="/special-events"]').click()
    cy.url().should('include', 'special-events') 
  });

  it('Clicks on Login', () => {
      cy.visit('/events')
      cy.get('[routerLink="/login"]').click()
      cy.contains('loginEmail').should('exist')
      cy.contains('Password').should('exist')
      cy.url().should('include', 'login') 
  });

  it('Clicks on Register', () => {
      cy.visit('/events')
      cy.get('[routerLink="/register"]').click()
      cy.contains('Registration').should('exist')
      cy.contains('Email:').should('exist')
      cy.contains('Username:').should('exist')
      cy.contains('Password:').should('exist')
      cy.contains('Confirm Password:').should('exist')
      cy.url().should('include', 'register') 
  });

})