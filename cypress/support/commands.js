
Cypress.Commands.add('clearBasket', () => {
    cy.checkIfEleExists('#logged-user').then(e=>{
        console.log('JE PRIHLASEN')
    }).catch(e=>{
        console.log('Neni prihlasen')
    })
 })