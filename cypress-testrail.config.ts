import { defineConfig } from 'cypress';

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config);
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',
    baseUrl: 'http://localhost:4200',
  },
  reporter: 'cypress-testrail-reporter',
  reporterOptions: {
    host: 'https://dsvavsp.testrail.io/',
    username: 'tze@adhocteam.us',
    password: 'yzykxFF7UT9gTQShuISd-b7/TXWdhxYRqXAapMXVu',
    projectId: 45,
    groupId: 5606,
    runName: 'BSA-e2e-App',
    includeAllInTestRun: false,
    filter: '',
  },
});
