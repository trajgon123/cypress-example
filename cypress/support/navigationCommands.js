Cypress.Commands.add('getCategoryContentPage',()=>{
    const baseUrl = Cypress.env('prod').baseUrl
    cy.visit(baseUrl)
    cy.get('.main-menu__title.unselectable').first().trigger('mouseover')
    cy.get('.main-menu__submenu').first().should('be.visible')
    cy.get('.main-menu__link').first().click()
    cy.url().should('contain','produkty')
})

Cypress.Commands.add(('getProductContentPage'),()=>{
    cy.getCategoryContentPage()
    cy.get('.new-tile h5').first().click()
    cy.url().should('contain','produkt')
})



