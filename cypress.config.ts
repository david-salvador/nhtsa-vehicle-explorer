import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: '',
          sourceRoot: 'src',
          buildOptions: {
            tsConfig: 'tsconfig.cy.json',
          },
        },
      },
    },
    specPattern: '**/*.cy.ts',
    // specPattern: 'cypress/component/**/*.cy.ts',
    supportFile: 'cypress/support/component.ts',
  },
  
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
});