/// <reference types="cypress" />
describe('Application Navigation', () => {
  beforeEach(() => {
    cy.interceptVehiclesApi();
  });

  it('should have working header navigation', () => {
    cy.visit('/');
    
    cy.contains('NHTSA Vehicle Explorer').should('be.visible');
    
    // Navigate through menu items
    cy.contains('button', 'Home').click();
    cy.url().should('include', '/home');
    
    cy.contains('button', 'Vehicles').click();
    cy.url().should('include', '/vehicles');
    
    cy.contains('button', 'Brands').should('be.visible');
  });

  it('should redirect root to home', () => {
    cy.visit('/');
    cy.url().should('include', '/home');
  });

  it('should navigate between pages using header', () => {
    cy.visit('/home');
    
    cy.contains('button', 'Vehicles').click();
    cy.url().should('include', '/vehicles');
    
    cy.contains('button', 'Home').click();
    cy.url().should('include', '/home');
  });

  it('should show active navigation link', () => {
    cy.visit('/home');
    
    cy.contains('button', 'Home').should('have.class', 'active-link');
    
    cy.contains('button', 'Vehicles').click();
    cy.contains('button', 'Vehicles').should('have.class', 'active-link');
  });

  it('should have footer with correct information', () => {
    cy.visit('/home');
    
    cy.get('footer').should('be.visible');
    cy.contains('NHTSA Vehicle Explorer').should('be.visible');
    cy.contains('demo application').should('be.visible');
  });

  it('should handle invalid routes', () => {
    cy.visit('/invalid-route', { failOnStatusCode: false });
    cy.url().should('include', '/home');
  });
});