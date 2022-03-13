/// <reference types="cypress" />
const preBasketActions = {
    GOBASKET: 'gobasket',
    CONTINUESHOPPING: 'continueshopping'
}
  
  export const preBasket = (actionName) => {
    switch(actionName){
        case preBasketActions.GOBASKET:
            cy.get('.buy-mode-product__item .btn.btn-primary').should('exist').last().click()
            break
        case preBasketActions.CONTINUESHOPPING:
            cy.get('.buy-mode-product__item .btn.close').should('exist').last().click()
            break
        default:
            console.log('Sorry! inserted valu- ${actionName}, is not defined pre-basket action.')
    }

}