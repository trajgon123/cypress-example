/// <reference types="cypress" />
import user from '../fixtures/user.json'
beforeEach(() => {
  //načtení souboru s přihlašovacími daty uživatelů
  cy.fixture('user').as('user')
})

Cypress.Commands.add('login', (login, password) => {
  const baseUrl = Cypress.env('prod').baseUrl
  cy.visit(baseUrl)
  cy.get('#login').click()
  cy.get('#frm-name').type(login)
  cy.get('#frm-password').type(password)
  cy.get('button.btn.submit').click()
})

Cypress.Commands.add('loginDefaultUser', () => {
  const baseUrl = Cypress.env('prod').baseUrl
  console.log(user.b2c.login)
  cy.visit(baseUrl)
  cy.get('#login').click()
  cy.get('#frm-name').type(user.b2c.login)
  cy.get('#frm-password').type(user.b2c.pass)
  cy.get('button.btn.submit')
    .click()
    .should('not.exist')
})

//prihlaseni pomoci xhr requestu
Cypress.Commands.add('fastLogin', (login, password) => {
  cy.request({
    method: 'POST',
    url: 'https://www.czc.cz/dwr/call/plaincall/CommonDwr.login.dwr',
    header: 'text/plain',
    body: {
      callCount: 1,
      nextReverseAjaxIndex: 0,
      'c0-scriptName': 'CommonDwr',
      c0methodName: 'login',
      c0id: 0,
      c0e1string: login,
      c0e2string: password,
      c0e3string: 'null',
      c0e4null: null,
      batchId: 1,
      instanceId: 0,
      page: 'Flogin',
      scriptSessionId: '67pPon!IgnqU451KhJEhZRWfvEB0!DSiekn/vqSiekn-lk3tHPKB4'
    }
  }).then(resp => {
    console.debug('autentication response', resp)
    const cookies = resp.headers['set-cookie']
    //ziskana cookies ulozime
    cookies.forEach(cookie => {
      const firstPart = cookie.split(';')[0]
      const separator = firstPart.indexOf('=')
      const name = firstPart.substring(0, separator)
      const value = firstPart.substring(separator + 1)
      console.debug('cookie', name, value)
      cy.setCookie(name, value)
    })
  })
})
