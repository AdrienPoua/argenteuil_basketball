/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.getDataCy('greeting')
       */
      getDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
  