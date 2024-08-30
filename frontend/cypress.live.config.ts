import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    apiUrl: 'https://api.figmaps.com/',
  },
  e2e: {
    baseUrl: 'https://app.figmaps.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
  },
  video: false,
})
