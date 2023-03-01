describe('Navigates between tabs', () => {

    it('Asserts logo on main page', () => {
        cy.visit('/events')
        cy.get('.navbar-brand > img').should('exist')
    });

    it('Clicks on Buy', () => {
        cy.visit('/buy')
        cy.contains('Buy').click()
        cy.get('input').should('exist')
        cy.get('.search > button').should('exist')
        cy.contains('Sell').should('exist')
    });

    it('Clicks on Login', () => {
        cy.visit('/login')
        cy.contains('Login').click()
        cy.contains('Username:').should('exist')
        cy.contains('Password:').should('exist')
    });

    it('Clicks on Register', () => {
        cy.visit('/register')
        cy.contains('Register').click()
        cy.contains('Registration').should('exist')
        cy.contains('Email:').should('exist')
        cy.contains('Username:').should('exist')
        cy.contains('Password:').should('exist')
        cy.contains('Confirm Password:').should('exist')
    });
  
  })