describe('Navigates between tabs', () => {

  it('Asserts logo on main page', () => {
      cy.visit('/events')
      cy.get('.navbar-brand > img').should('exist')
  });

  it('Clicks on Logo', () => {
    cy.visit('/events')
    cy.get('.navbar-brand > img').click()
    cy.url().should('include', 'home') 
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
      cy.get('input[type="email"]').should('exist')
      cy.get('input[type="password"]').should('exist')
      cy.url().should('include', 'login') 
  });

  it('Clicks on Register', () => {
      cy.visit('/events')
      cy.get('[routerLink="/register"]').click()
      
      cy.contains('Register Account').should('exist')
      cy.get('input[type="text"]').should('exist')
      cy.get('input[type="email"]').should('exist')
      cy.get('input[type="password"]').should('exist')
      cy.get('input[type="email"]').should('exist')
      cy.get('input[type="number"]').should('exist')
      cy.url().should('include', 'register') 
  });

})