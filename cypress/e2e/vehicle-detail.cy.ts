/// <reference types="cypress" />
describe('Vehicle Detail Page', () => {
  beforeEach(() => {
    cy.interceptVehiclesApi();
    
    cy.intercept('GET', '**/GetVehicleTypesForMake/*', {
      fixture: 'vehicle-types.json'
    }).as('getVehicleTypes');
    
    cy.intercept('GET', '**/GetModelsForMakeId/*', {
      fixture: 'vehicle-models.json'
    }).as('getVehicleModels');
    
    cy.visit('/home');
    cy.wait('@getVehicles');
  });

  it('should navigate to detail page and display brand information', () => {
    cy.contains('TESLA').click();
    
    cy.url().should('include', '/vehicles/441');
    cy.contains('h1', 'TESLA').should('be.visible');
    cy.contains('Vehicle brand details').should('be.visible');
  });

  it('should load and display vehicle types', () => {
    cy.contains('TESLA').click();
    cy.wait('@getVehicleTypes');
    
    cy.contains('Vehicle Types').should('be.visible');
    cy.contains('Passenger Car').should('be.visible');
    cy.contains('Multipurpose Passenger Vehicle').should('be.visible');
  });

  it('should load and display vehicle models', () => {
    cy.contains('TESLA').click();
    cy.wait('@getVehicleModels');
    
    cy.contains('Available Models').should('be.visible');
    cy.contains('Model S').should('be.visible');
    cy.contains('Model X').should('be.visible');
    cy.contains('Model 3').should('be.visible');
    cy.contains('Model Y').should('be.visible');
  });

  it('should display loading states for types and models', () => {
    cy.intercept('GET', '**/GetVehicleTypesForMake/*', {
      delay: 1000,
      fixture: 'vehicle-types.json'
    }).as('delayedTypes');
    
    cy.contains('TESLA').click();
    
    cy.contains('Loading types').should('be.visible');
  });

  it('should navigate back to vehicle list', () => {
    cy.contains('TESLA').click();
    
    cy.get('button[aria-label="View details"]').should('not.exist');
    cy.get('button.back-button').click();
    
    cy.url().should('include', '/vehicles');
    cy.get('mat-list-item').should('exist');
  });

  it('should display brand information card', () => {
    cy.contains('TESLA').click();
    cy.wait('@getVehicleTypes');
    
    cy.contains('Brand Information').should('be.visible');
    cy.contains('Brand Name').should('be.visible');
    cy.contains('Manufacturer ID').should('be.visible');
  });

  it('should handle error loading types', () => {
    cy.intercept('GET', '**/GetVehicleTypesForMake/*', {
      statusCode: 500,
      body: { error: 'Failed to load types' }
    }).as('errorTypes');
    
    cy.contains('TESLA').click();
    cy.wait('@errorTypes');
    
    cy.contains('Something went wrong').should('be.visible');
  });

  it('should handle error loading models', () => {
    cy.intercept('GET', '**/GetModelsForMakeId/*', {
      statusCode: 500,
      body: { error: 'Failed to load models' }
    }).as('errorModels');
    
    cy.contains('TESLA').click();
    cy.wait('@errorModels');
    
    cy.contains('Something went wrong').should('be.visible');
  });

  it('should refresh types when refresh button clicked', () => {
    cy.contains('TESLA').click();
    cy.wait('@getVehicleTypes');
    
    cy.get('mat-card').contains('Vehicle Types').parent()
      .find('button[matTooltip="Refresh types"]').click();
    
    cy.wait('@getVehicleTypes');
  });

  it('should refresh models when refresh button clicked', () => {
    cy.contains('TESLA').click();
    cy.wait('@getVehicleModels');
    
    cy.get('mat-card').contains('Available Models').parent()
      .find('button[matTooltip="Refresh models"]').click();
    
    cy.wait('@getVehicleModels');
  });
});