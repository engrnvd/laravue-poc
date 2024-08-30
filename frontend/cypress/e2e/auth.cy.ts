/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Auth', () => {
  it('can signs up', () => {
    cy.cleanup()
    cy.signup()
    cy.verifyLogin()
  })

  it('can not access protected routes', () => {
    let routes = [
      '/projects',
      '/projects/create',
      '/projects/import',
      '/subscription',
      '/profile',
      '/profile/change-password',
      '/profile/delete-account',
    ]

    routes.forEach(route => {
      cy.cannotAccess(route)
    })
  })

  it('can use forgot password feature', () => {
    cy.visit('/login')

    cy.contains('a', 'Forgot password').click()
    cy.get('input[placeholder=Email]').clear().type(EMAIL)
    cy.intercept('POST', '/forgot-password').as('req')
    cy.contains('.u-btn', 'Submit').click()
    cy.wait('@req')
    cy.get('.notification-container')
    cy.request('GET', `${Cypress.env('apiUrl')}cypress/get-otp`).then((res) => {
      cy.get('input[placeholder=OTP]').clear().type(res.body.otp)
      const newPassword = 'abcdefg'
      cy.get('input[placeholder="New Password"]').clear().type(newPassword)
      cy.contains('.u-btn', 'Submit').click()
      cy.get('.notification-container')
      cy.get('input[placeholder=Password]').clear().type(newPassword)
      cy.contains('.u-btn', 'Login').click()
      cy.verifyLogin()
    })
  })

})
