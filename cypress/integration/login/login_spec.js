/// <reference types="cypress" />
describe('Login test', () => {
    const login = Cypress.env('prod').userLogin
    const password = Cypress.env('prod').userPassword
    const wrongPassword = "heslo"
    const wrongLogin = "cypress"
    const baseUrl = Cypress.env('prod').baseUrl

    beforeEach(() => {
        cy.visit(baseUrl)
        cy.get("#login").click()
    })

    it("succes login", () => {
        //prihlaseni uzivatele
        cy.login(login, password)
        //spravna url
        cy.url().should('not.include', "login")
        //uzivatel je prihlasen
        cy.get('#logged-user').contains(login)

    })

    it("wrong loginName", () => {
        //prihlaseni uzivatele
        cy.login(wrongLogin, password)
        //ukazuje se chybova hlaska
        cy.get('.frm__msg-name').should('be.visible').contains
        //uzivatel neni prihlasen
        cy.get('#logged-user').should('not.exist')
    })

    it("wrong password", () => {
        //prihlaseni uzivatele
        cy.login(login, wrongPassword)
        //ukazuje se chybova hlaska
        cy.get('.frm__msg-password').should('be.visible')
        //uzivatel neni prihlasen
        cy.get('#logged-user').should('not.exist')
    })

    it("requires valid password and login", () => {
        cy.get('button.btn.submit').click()
        //ukazuje se chybova hlaska
        cy.get('.frm__msg-password').should('be.visible')
        cy.get('.frm__msg-name').should('be.visible').contains
        //uzivatel neni prihlasen
        cy.get('#logged-user').should('not.exist')

    })

    it("register link", () => {
        cy.get(".btn-signal.btn--small").should('have.attr', 'href', '/registrace/nova')
    })

    it("third party login links", () => {
        //facebook login link
        cy.get('.btn-social--fb').should('have.attr', 'href', baseUrl + '/presmerovani/facebook?keepCurrentBasket=false')
        //google login link
        cy.get('.btn-social--google').should('have.attr', 'href', baseUrl + '/presmerovani/googleplus?keepCurrentBasket=false')
    })

    it("forgot password", () => {
        cy.get(".lost-psw").click()
        //otevrel se novy popup
        cy.get('.popup-content').eq(1).should('be.visible')
    })

    //login pomoci xhr requestu
    it.skip("succes XHR LOGIN test", () => {
        //prihlaseni uzivatele
        cy.fastLogin(login, password)
        //spravna url
        cy.visit('https://www.czc.cz/')
        cy.url().should('not.include', "login")
        //uzivatel je prihlasen
        cy.get('#logged-user').contains(login)

    })
})