// features/vehicles/components/vehicle-card/vehicle-card.component.cy.ts
import { VehicleCardComponent } from './vehicle-card';

describe('VehicleCardComponent', () => {
  it('should mount and display vehicle data', () => {
    const mockVehicle = {
      Make_ID: 440,
      Make_Name: 'ASTON MARTIN'
    };
    
    cy.mount(VehicleCardComponent, {
      componentProperties: {
        vehicle: mockVehicle
      }
    });
    
    cy.contains('ASTON MARTIN').should('be.visible');
    cy.contains('440').should('be.visible');
  });

  it('should emit edit event when button clicked', () => {
    const mockVehicle = {
      Make_ID: 440,
      Make_Name: 'ASTON MARTIN'
    };
    
    cy.mount(VehicleCardComponent, {
      componentProperties: {
        vehicle: mockVehicle
      }
    }).then(({ component }) => {
      cy.spy(component.select, 'emit').as('selectEmit');
      
      cy.get('button').click();
      cy.get('@selectEmit').should('have.been.calledOnce');
    });
  });
});