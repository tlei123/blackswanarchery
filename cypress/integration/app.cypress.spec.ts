describe('App component', () => {
  it('Visits the initial app page', () => {
    cy.visit('/');
    cy.contains('Black Swan Archery').should('be.visible');
    cy.contains('Router State').should('be.visible');
    cy.contains('Splash Video State').should('be.visible');
  });
});
