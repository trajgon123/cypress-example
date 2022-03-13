import user from '../../fixtures/user.json'
import { loginSelectors } from '../../constants/selectors/login'
import { commonSelectors } from '../../constants/selectors/common'
import { loginTexts } from '../../constants/texts/login'

/// <reference types="cypress" />
describe('Login', () => {
  const wrongPassword = 'heslo'
  const wrongLogin = 'cypress'
  const baseUrl = Cypress.env('prod').baseUrl

  beforeEach(() => {
    cy.visit(baseUrl)
    cy.get('#login').click()
  })

  it('forgot password', () => {
    cy.get(loginSelectors.lostPasswordHref).click()
    //otevrel se novy popup
    cy.get(loginSelectors.lostPasswordPopupHeader)
      .first()
      .should('have.text', loginTexts.lostPasswordPopupHeaderText)
  })

  it('succes login', () => {
    cy.login(user.b2b.login, user.b2b.pass)
    cy.url().should('not.include', 'login')
    // uživatel je přihlášen
    cy.get(commonSelectors.loggedUserAlias).contains(user.b2b.login)
  })

  it('wrong loginName', () => {
    //prihlaseni uzivatele
    cy.login(wrongLogin, user.b2b.pass)
    //ukazuje se chybova hlaska
    cy.get(loginSelectors.invalidUserNameMessage).should('have.have.text', loginTexts.invalidUserNameMessageText)
    //uzivatel neni prihlasen
    cy.get(commonSelectors.loggedUserAlias).should('not.exist')
  })

  it('wrong password', () => {
    //prihlaseni uzivatele
    cy.login(user.b2b.login, wrongPassword)
    //ukazuje se chybova hlaska
    cy.get(loginSelectors.invalidUserPassword).should( 'have.have.text', loginTexts.invalidUserPasswordMessageText)
    //uzivatel neni prihlasen
    cy.get(commonSelectors.loggedUserAlias).should('not.exist')
  })

  it('requires valid password and login', () => {
    cy.get('button.btn.submit').click()
    //ukazuje se chybova hlaska
    cy.get('.frm__msg-password').should('be.visible')
    cy.get('.frm__msg-name').should('be.visible').contains
    //uzivatel neni prihlasen
    cy.get('#logged-user').should('not.exist')
  })

  it('register link', () => {
    cy.get('.text-right a.btn-secondary').should(
      'have.attr',
      'href',
      '/registrace/nova'
    )
  })

  it('third party login links', () => {
    //facebook login link
    cy.get('.btn-social--fb').should(
      'have.attr',
      'href',
      baseUrl + '/presmerovani/facebook?keepCurrentBasket=false'
    )
    //google login link
    cy.get('.btn-social--google').should(
      'have.attr',
      'href',
      baseUrl + '/presmerovani/googleplus?keepCurrentBasket=false'
    )
  })

  //login pomoci xhr requestu
  it.skip('succes XHR LOGIN test', () => {
    //prihlaseni uzivatele
    cy.fastLogin(login, password)
    //spravna url
    cy.visit('https://www.czc.cz/')
    cy.url().should('not.include', 'login')
    //uzivatel je prihlasen
    cy.get('#logged-user').contains(login)
  })
})
