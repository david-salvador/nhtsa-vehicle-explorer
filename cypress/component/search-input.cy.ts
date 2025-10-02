/// <reference types="cypress" />
import { SearchInput } from '../../src/app/shared/components/search-input/search-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('SearchInput', () => {
  it('should mount with default placeholder', () => {
    cy.mount(SearchInput, {
      declarations: [SearchInput],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
      ]
    });
    
    cy.get('input').should('have.attr', 'placeholder', 'Search...');
  });

  it('should mount with custom placeholder', () => {
    cy.mount(SearchInput, {
      declarations: [SearchInput],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
      ],
      componentProperties: {
        placeholder: 'Search vehicles...'
      }
    });
    
    cy.get('input').should('have.attr', 'placeholder', 'Search vehicles...');
  });

  it('should emit debounced value changes', () => {
    cy.mount(SearchInput, {
      declarations: [SearchInput],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
      ],
      componentProperties: {
        debounceTime: 300
      }
    }).then(({ component }) => {
      cy.spy(component.valueChange, 'emit').as('valueChange');
      
      cy.get('input').type('test');
      cy.get('@valueChange').should('not.have.been.called');
      
      cy.wait(400);
      cy.get('@valueChange').should('have.been.calledWith', 'test');
    });
  });

  it('should show clear button when input has value', () => {
    cy.mount(SearchInput, {
      declarations: [SearchInput],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule
      ]
    });
    
    cy.get('button[aria-label="Clear search"]').should('not.exist');
    
    cy.get('input').type('test');
    cy.get('button[aria-label="Clear search"]').should('be.visible');
  });

  it('should clear input when clear button clicked', () => {
    cy.mount(SearchInput, {
      declarations: [SearchInput],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
      ]
    });
    
    cy.get('input').type('test');
    cy.get('button[aria-label="Clear search"]').click();
    cy.get('input').should('have.value', '');
  });

  it('should set initial value', () => {
    cy.mount(SearchInput, {
      declarations: [SearchInput],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
      ],
      componentProperties: {
        value: 'initial value'
      }
    });
    
    cy.get('input').should('have.value', 'initial value');
  });
});