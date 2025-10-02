/// <reference types="cypress" />
import { VehicleCard } from '../../src/app/features/vehicles/components/vehicle-card/vehicle-card';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('VehicleCard', () => {
  const mockVehicle = {
    Make_ID: 440,
    Make_Name: 'ASTON MARTIN'
  };

  it('should mount and display vehicle data', () => {
    cy.mount(VehicleCard, {
      declarations: [VehicleCard],
      imports: [MatCardModule, MatIconModule, MatButtonModule],
      componentProperties: {
        vehicle: mockVehicle
      }
    });
    
    cy.contains('ASTON MARTIN').should('be.visible');
    cy.contains('440').should('be.visible');
  });

  it('should emit select event when card is clicked', () => {
    cy.mount(VehicleCard, {
      declarations: [VehicleCard],
      imports: [MatCardModule, MatIconModule, MatButtonModule],
      componentProperties: {
        vehicle: mockVehicle
      }
    }).then(({ component }) => {
      cy.spy(component.select, 'emit').as('selectEmit');
      
      cy.get('mat-card').click();
      cy.get('@selectEmit').should('have.been.calledOnce');
      cy.get('@selectEmit').should('have.been.calledWith', mockVehicle);
    });
  });

  it('should emit select event when button is clicked', () => {
    cy.mount(VehicleCard, {
      declarations: [VehicleCard],
      imports: [MatCardModule, MatIconModule, MatButtonModule],
      componentProperties: {
        vehicle: mockVehicle
      }
    }).then(({ component }) => {
      cy.spy(component.select, 'emit').as('selectEmit');
      
      cy.contains('button', 'View Details').click();
      cy.get('@selectEmit').should('have.been.calledOnce');
    });
  });

  it('should display icon', () => {
    cy.mount(VehicleCard, {
      declarations: [VehicleCard],
      imports: [MatCardModule, MatIconModule, MatButtonModule],
      componentProperties: {
        vehicle: mockVehicle
      }
    });
    
    cy.get('mat-icon').contains('directions_car').should('be.visible');
  });

  it('should have hover effect', () => {
    cy.mount(VehicleCard, {
      declarations: [VehicleCard],
      imports: [MatCardModule, MatIconModule, MatButtonModule],
      componentProperties: {
        vehicle: mockVehicle
      }
    });
    
    cy.get('mat-card').should('have.css', 'cursor', 'pointer');
  });
});