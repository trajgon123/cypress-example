/// <reference types="cypress" />


describe('Login test', () => {

    //const baseUrl = Cypress.env('host').baseUrl
    const baseUrl = 'https://www.czc.cz'

    beforeEach(() => {
        cy.visit(baseUrl)
    })

    it('add to favorites', () => {
        //prihlaseni uzivatele
        cy.loginDefaultUser()
        //odstraneni seznamu oblibenych
        deleteFavoriteProductList()
        //prechod na detail produktu
        cy.getProductContentPage()
        //pridani do seznamu oblibenych
        cy.get('#pd-controls-favorite').click().then(($el) => {
            cy.wrap($el).should('have.class', 'in-favorite')
            //zobrazil se popup o pridani 
            cy.get('.tt a').should('be.visible').and('have.attr', 'href', '/oblibene')
            //zvysil se pocet produktu v seznamu oblibenych
            cy.get('.count.iquantity.anim-rotate-x').should('have.value', '1')
        })

    })



})

/**
 * Metoda odstrani vsechny produkty v seznamu oblibenych
 */
let deleteFavoriteProductList = () => {
    cy.get('.view-favorite').then(($a) => {
        //kontrola zda je seznam prazdny
        if ($a.attr('class').includes('empty')) { } else {
            //mouse hoover
            cy.get('.view-favorite').trigger('mouseover')
            //smazani jednotlivych polozek ze seznamu
            cy.get('#favorite-preview > div .btn-circle-remove').each(($el) => {
                cy.wrap($el).click({ force: true })
            })
        }
    })
}
