# cypress-project


##install

npm install cypress --save-dev

---------------------------

##run
npx cypress open

npx cypress run -spec cypress/integration/login/login_spec.js --browser=chrome

npx cypress run -spec cypress/integration/productDetail/* --env host=prod --browser=chrome

---------------------------
##tips


cy.debug - breakpoint pro debug

it.skip - skipnuti testu