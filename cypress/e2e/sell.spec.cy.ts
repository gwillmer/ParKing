describe('Create Listing Page Tests', () => {

    beforeEach(() => {
      cy.visit('/special-events')
    });
  
    it('Submits the form successfully', () => {
        cy.get('input[id="address"]').type('123 Main St.')
        cy.get('input[id="zipcode"]').type('12345')
        cy.get('select[id="state"]').select('FL')
        cy.get('select[id="ParkingSize"]').select('U.S. Standard - 8.6ft x 18ft')
        cy.get('input[id="sdate"]').type('2023-04-01')
        cy.get('input[id="edate"]').type('2023-04-07')
        cy.get('input[id="description"]').type('Test Description')
        cy.get('input[type="submit"]').click()
      });
  })