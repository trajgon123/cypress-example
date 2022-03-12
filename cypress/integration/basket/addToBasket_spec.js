/// <reference types="cypress" />
import { preBasket } from './preBasketActions'
describe(('testy pridavani do kosiku'), () => {

    it(('addToBasketFromHomePageCarousel'), () => {
        cy.get('#selected-for-you-carousel').scrollIntoView().should('be.visible')
        cy.get('#selected-for-you-carousel button.btn-buy').first().invoke('attr', 'data-product-code')
        .then(($style1) => {
          const style1 = $style1
          console.log(style1)
          cy.get('#selected-for-you-carousel button.btn-buy').first().click()
          preBasket("gobasket")
          cy.get('.product-code').then(($codeEl) => {
            var basketProductCode = $codeEl.text()
            expect(style1).to.equal(basketProductCode)
        })
        })
    });

    it(('addToBasketFromProductDetail'), () => {
        cy.getProductContentPage()
        //z detailu produktu zjisti kod produktu pro nasledne overeni
        cy.get('.our-code .data-code').then(($codeElement) => {
            var productDetailProductCode = $codeElement.text()
            cy.get('.pd-price-delivery .btn.btn-buy').click()
            preBasket("gobasket")
            cy.url().should('contain', 'kosik')
            //overeni kodu produktu v kosiku
            cy.get('.product-code').then(($codeEl) => {
                var basketProductCode = $codeEl.text()
                expect(productDetailProductCode).to.equal(basketProductCode)
            })

        })
    })

    it(('addToBasketFromCategoryContent'), () => {
        cy.getCategoryContentPage()
        //z vypisu produktu zjisti kod produktu pro nasledne overeni
        cy.get('.new-tile').first().find('.data-code').then(($code) => {
            var categoryContentCode = $code.text()

            cy.get('.new-tile .btn.btn-buy').first().click()
            preBasket("gobasket")
            //overeni kodu produktu v kosiku
            cy.get('.product-code').then(($codeEl) => {
                var basketProductCode = $codeEl.text()
                expect(categoryContentCode).to.equal(basketProductCode)
            })
        })
    })






})