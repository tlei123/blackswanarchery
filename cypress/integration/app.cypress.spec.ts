describe('App component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial app page', () => {
    cy.findByTestId('appHeader').should('be.visible');
    cy.findByTestId('routerStateHeader').should('be.visible');
    cy.findByTestId('splashVideoStateHeader').should('be.visible');
  });

  context('Router state', () => {
    it('Shows url:/ for url', () => {
      cy.findByTestId('routerStateUrl').should('have.text', '/');
    });
    it('Shows root.outlet:primary for root.outlet', () => {
      cy.findByTestId('routerStateRootOutlet').should('have.text', 'primary');
    });
  });

  context('Splash Video state', () => {
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
});
