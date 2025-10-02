/// <reference types="cypress" />
describe('Search Functionality', () => {
  beforeEach(() => {
    cy.interceptVehiclesApi();
    cy.visit('/home');
    cy.wait('@getVehicles');
  });

  it('should debounce search input', () => {
    const searchInput = cy.get('input[placeholder*="filter brands"]');
    
    searchInput.type('T');
    cy.get('mat-list-item').should('have.length', 10); // Not filtered yet
    
    searchInput.type('E');
    cy.wait(100);
    cy.get('mat-list-item').should('have.length', 10); // Still not filtered
    
    cy.wait(400); // Wait for debounce
    cy.get('mat-list-item').should('have.length.lessThan', 10);
  });

  it('should be case insensitive', () => {
    cy.get('input[placeholder*="filter brands"]').type('tesla');
    cy.wait(500);
    
    cy.contains('TESLA').should('be.visible');
  });

  it('should handle partial matches', () => {
    cy.get('input[placeholder*="filter brands"]').type('MAR');
    cy.wait(500);
    
    cy.contains('ASTON MARTIN').should('be.visible');
  });

  it('should clear results and show all on empty search', () => {
    cy.get('input[placeholder*="filter brands"]').type('TESLA');
    cy.wait(500);
    cy.get('mat-list-item').should('have.length', 1);
    
    cy.get('button[aria-label="Clear search"]').click();
    cy.wait(500);
    
    cy.get('mat-list-item').should('have.length', 10);
  });

  it('should maintain search state when navigating back', () => {
    cy.get('input[placeholder*="filter brands"]').type('TESLA');
    cy.wait(500);
    
    cy.contains('TESLA').click();
    cy.url().should('include', '/vehicles/441');
    
    cy.get('button.back-button').click();
    
    // Search should still be active
    cy.get('input[placeholder*="filter brands"]').should('have.value', 'TESLA');
  });
});