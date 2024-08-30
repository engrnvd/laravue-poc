/// <reference types="Cypress" />
import { EMAIL, NAME, PASSWORD } from 'cypress/support/constants'
import { env } from 'src/env'

Cypress.Commands.add('cleanup', () => {
  cy.request('POST', `${env.apiUrl}cypress/cleanup`).then(response => {
    console.log('response', response)
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('signup', () => {
  cy.visit('/signup')

  cy.get('input[placeholder=Name]').clear().type(NAME)
  cy.get('input[placeholder=Email]').clear().type(EMAIL)
  cy.get('input[placeholder=Password]').clear().type(`${PASSWORD}{enter}`, { log: false })
})

Cypress.Commands.add('verifyLogin', () => {
  cy.url().should('include', '/projects')

  cy.get('#profile-btn').click()

  cy.get('.user-dd').contains(NAME)
  cy.get('.user-dd').contains(EMAIL)
})

Cypress.Commands.add('cannotAccess', (route: string) => {
  cy.visit(route)
  cy.url().should('not.include', route)
})

Cypress.Commands.add('login', (password: string = '') => {
  password = password || PASSWORD
  cy.visit('/login')

  cy.get('input[placeholder=Email]').clear().type(EMAIL)
  cy.get('input[placeholder=Password]').clear().type(`${PASSWORD}`, { log: false })

  cy.get('form').contains('Login').click()
})

