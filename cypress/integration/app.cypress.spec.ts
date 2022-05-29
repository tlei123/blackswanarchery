import * as cypress from 'cypress';

import { appConfig } from '@app/app.config';

describe('App component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display Header', () => {
    cy.get('header')
      .should('exist')
      .within(($header) => {
        cy.wrap($header).find('app-header').should('be.visible');
      });
  });

  it('should redirect initial-visit ("/") to Home-view', () => {
    cy.location('pathname').should('match', /^\/home/);
    cy.findByText('Home', { selector: '.nav-link' }).should(
      'have.class',
      'active',
    );
  });

  it('should set current-view classhooks', () => {
    cy.get('body').should('have.class', 'home');
    cy.get('.container').should('have.class', 'home');
    cy.visit('/view-instance');
    cy.get('body').should('have.class', 'view-instance');
    cy.get('.container').should('have.class', 'view-instance');
  });
});
