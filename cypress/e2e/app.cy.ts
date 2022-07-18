import * as cypress from 'cypress';

import { appConfig } from '@app/app.config';

describe('App component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display Header - C19100', () => {
    cy.get('header')
      .should('exist')
      .within(($header) => {
        cy.wrap($header).find('app-header').should('be.visible');
      });
  });

  it('should redirect initial-visit ("/") to Home-view - C19101', () => {
    cy.location('pathname').should('match', /^\/home/);
    cy.findByText('Home', { selector: '.nav-link' }).should(
      'have.class',
      'active',
    );
  });

  it('should set current-view data-attribute - C19102', () => {
    cy.get('body').invoke('attr', 'data-view').should('eq', 'home');
    cy.get('.container').should('have.class', 'home');
    cy.visit('/view-instance');
    cy.get('body').invoke('attr', 'data-view').should('eq', 'view-instance');
    cy.get('.container').should('have.class', 'view-instance');
  });
});
