// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
/// <reference types="cypress" />
// Import commands.js using ES2015 syntax:
import './commands'
import './loginCommands'
import './navigationCommands'
before(()=>{
    //pokud neni vybrany env vyber defaultni
    if (Cypress.env('host') == undefined) {
        Cypress.env('host', 'prod')
    }
})


beforeEach(() => {
    //načtení souboru s přihlašovacími daty uživatelů
    cy.fixture('user').as('user')
    //potvzení modálního okna s cookies - nutné před každým testem
    cy.clearCookies()
    confirmCookiesModal();
})

function confirmCookiesModal(){
    const baseUrl = Cypress.env('prod').baseUrl
    cy.visit(baseUrl)
    cy.get(".popup-content button.js-all-cookies").should('be.visible').last().click();
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
