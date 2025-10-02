/// <reference types="cypress" />
describe('Home Page - Vehicle Brand List', () => {
  beforeEach(() => {
    cy.interceptVehiclesApi();
    cy.visit('/home');
    cy.wait('@getVehicles');
  });

  it('should display the home page with title', () => {
    cy.contains('Vehicle Brand Explorer').should('be.visible');
    cy.contains('Explore over 10,000 vehicle brands').should('be.visible');
  });

  it('should display virtual scroll list with vehicle brands', () => {
    cy.get('cdk-virtual-scroll-viewport').should('be.visible');
    cy.get('mat-list-item').should('have.length.at.least', 1);
  });

  it('should display brand names correctly', () => {
    cy.contains('ASTON MARTIN').should('be.visible');
    cy.contains('TESLA').should('be.visible');
  });

  it('should filter vehicles when searching', () => {
    // Type in search field
    cy.get('input[placeholder*="filter brands"]').type('TESLA');
    
    // Wait for debounce (300ms)
    cy.wait(500);
    
    // Verify filtered results
    cy.get('mat-list-item').should('have.length', 1);
    cy.contains('TESLA').should('be.visible');
    cy.contains('ASTON MARTIN').should('not.exist');
  });

  it('should clear search when clear button clicked', () => {
    cy.get('input[placeholder*="filter brands"]').type('Tesla');
    cy.wait(300);
    cy.get('button[aria-label="Clear search"]').click();
    cy.get('input[placeholder*="filter brands"]').should('have.value', '');
  });

  it('should navigate to vehicle detail on click', () => {
    cy.get('mat-list-item').first().click();
    cy.url().should('include', '/vehicles/');
  });

  it('should display cache status information', () => {
    cy.contains('brands cached').should('be.visible');
    cy.contains('Last updated').should('be.visible');
  });

  it('should handle loading state', () => {
    cy.intercept('GET', '**/GetAllMakes*', {
      delay: 1000,
      fixture: 'vehicles.json'
    }).as('delayedVehicles');
    
    cy.visit('/home');
    
    cy.contains('Loading vehicle brands').should('be.visible');
    cy.get('mat-progress-spinner').should('be.visible');
    
    cy.wait('@delayedVehicles');
    
    cy.get('mat-progress-spinner').should('not.exist');
    cy.get('mat-list-item').should('have.length.at.least', 1);
  });

  it('should display error state and allow retry', () => {
    cy.intercept('GET', '**/GetAllMakes*', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('failedRequest');
    
    cy.visit('/home');
    cy.wait('@failedRequest');
    
    cy.contains('Something went wrong').should('be.visible');
    cy.contains('button', 'Try Again').should('be.visible');
  });

  it('should refresh data when refresh button clicked', () => {
    cy.intercept('GET', '**/GetAllMakes*').as('refreshVehicles');
    
    cy.get('button[aria-label="Refresh data"]').click();
    
    cy.wait('@refreshVehicles');
    cy.get('mat-list-item').should('have.length.at.least', 1);
  });

  it('should handle empty search results', () => {
    cy.get('input[placeholder*="filter brands"]').type('NONEXISTENTBRAND12345');
    cy.wait(500);
    
    cy.contains('No brands found').should('be.visible');
    cy.contains('Try adjusting your search').should('be.visible');
  });

  it('should display correct number of items with virtual scroll', () => {
    cy.get('mat-list-item').should('have.length', 10);
  });

  it('should have accessible navigation', () => {
    cy.get('button[aria-label="Refresh data"]').should('be.visible');
    cy.get('input[aria-label="Search input"]').should('be.visible');
    cy.get('button[aria-label="View details"]').first().should('be.visible');
  });
});