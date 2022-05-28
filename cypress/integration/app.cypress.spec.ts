import * as cypress from 'cypress';

describe('App component', () => {
  it('Visits the initial app page', () => {
    cy.visit('/');
    cy.findByTestId('appHeader').should('be.visible');
  });

  context('Router state', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Shows section-header', () => {
      cy.findByTestId('routerStateHeader').should('be.visible');
    });
    it('Shows url:/ for url', () => {
      cy.findByTestId('routerStateUrl').should('have.text', '/home');
    });
    it('Shows root.outlet:primary for root.outlet', () => {
      cy.findByTestId('routerStateRootOutlet').should('have.text', 'primary');
    });
  });

  context('Splash Video state', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Shows section-header', () => {
      cy.findByTestId('splashVideoStateHeader').should('be.visible');
    });
    it('Shows done: false as initial state', () => {
      cy.findByTestId('splashVideoStateDone').should('have.text', 'false');
    });
    it('Shows done: true on Finish button click', () => {
      cy.findByTestId('btnFinishSplashVideo').click();
      cy.findByTestId('splashVideoStateDone').should('have.text', 'true');
    });
    it('Shows done: false on Reset button click', () => {
      cy.findByTestId('btnResetSplashVideo').click();
      cy.findByTestId('splashVideoStateDone').should('have.text', 'false');
    });
  });

  context('Figures state', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Shows section-header', () => {
      cy.findByTestId('figuresStateHeader').should('be.visible');
    });
    it('Shows imageFilenames', () => {
      cy.get('[data-testclass="imageFilename"]')
        .should('exist')
        .and('have.length.at.least', 1);
    });
  });

  context('FormMail', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://tze1.com/cgi-bin/FormMail.pl', {
        statusCode: 200,
        body: {},
      }).as('mockSubmission');
      cy.visit('/');
    });

    it('Shows section header', () => {
      cy.findByTestId('formMailHeader').should('be.visible');
    });
    it('Submits form', () => {
      cy.get('[name=realname]').type('Tze [TEST ONLY]');
      cy.get('[name=email]').type('tclei2009@gmail.com');
      cy.get('[name=subject]').type('Test message from E2E automated-test');
      cy.get('[name=message]').type('testing, testing... [E2E-spec]');
      cy.get('#formMailForm').submit();
      cy.wait('@mockSubmission');
      cy.url().should('eq', 'https://tze1.com/cgi-bin/FormMail.pl');
    });
  });
});
