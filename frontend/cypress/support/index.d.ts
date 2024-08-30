/// <reference types="Cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      cleanup(): Chainable<JQuery<HTMLElement>>

      signup(): Chainable<JQuery<HTMLElement>>

      verifyLogin(): Chainable<JQuery<HTMLElement>>

      cannotAccess(route: string): Chainable<JQuery<HTMLElement>>

      login(): Chainable<JQuery<HTMLElement>>
    }
  }
}
