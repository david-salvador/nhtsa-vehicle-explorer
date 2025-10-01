// cypress/e2e/home.cy.ts
describe('Home Page - Vehicle Brand List', () => {
  beforeEach(() => {
    // Intercept API calls and provide mock data
    cy.intercept('GET', '**/api/vehicles/GetAllMakes*', {
      fixture: 'vehicles.json'
    }).as('getVehicles');
    
    cy.visit('/home');
    cy.wait('@getVehicles');
  });

  it('should display virtual scroll list with vehicle brands', () => {
    cy.get('cdk-virtual-scroll-viewport').should('be.visible');
    cy.get('mat-list-item').should('have.length.at.least', 1);
  });

  it('should filter vehicles when searching', () => {
    // Type in search field
    cy.get('input[placeholder*="filter brands"]').type('Tesla');
    
    // Wait for debounce (300ms)
    cy.wait(300);
    
    // Verify filtered results
    cy.get('mat-list-item').should('have.length', 1);
    cy.get('.vehicle-name').should('contain.text', 'TESLA');
  });

  it('should navigate to vehicle detail on click', () => {
    cy.get('mat-list-item').first().click();
    cy.url().should('include', '/vehicles/');
  });

  it('should clear search when clear button clicked', () => {
    cy.get('input[placeholder*="filter brands"]').type('Honda');
    cy.get('button[aria-label="Clear search"]').click();
    cy.get('input[placeholder*="filter brands"]').should('have.value', '');
  });

  it('should handle loading state', () => {
    cy.intercept('GET', '**/api/vehicles/GetAllMakes*', {
      delay: 1000,
      fixture: 'vehicles.json'
    }).as('delayedVehicles');
    
    cy.visit('/home');
    
    cy.get('mat-progress-spinner').should('be.visible');
    cy.wait('@delayedVehicles');
    cy.get('mat-progress-spinner').should('not.exist');
  });

  it('should display error state and allow retry', () => {
    cy.intercept('GET', '**/api/vehicles/GetAllMakes*', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('failedRequest');
    
    cy.visit('/home');
    cy.wait('@failedRequest');
    
    cy.get('.error-container').should('be.visible');
    cy.contains('button', 'Retry').should('be.visible');
  });
});