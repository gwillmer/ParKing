describe('Create Listing Page Tests', () => {

    beforeEach(() => {
      cy.visit('/special-events')
    });
  
    it('should allow a user to fill out and submit the form', () => {
      cy.get('input[type="text"]').type('123 Main St');
      cy.get('input[type="number"]').type('12345');
      cy.get('[type="drop"]').select('CA');
      cy.get('[type="size"]').select('Large Trucker - 15ft x 40ft');
      cy.get('label').contains('Start Date:').next().type('2023-05-01');
      cy.get('label').contains('End Date:').next().type('2023-05-31');
      cy.get('input[type="text2"]').type('This is a test listing.');
      cy.get('button[type="submit"]').click();
    });
  })