# cypress-project


## install

npm install cypress --save-dev

---------------------------

## run
npx cypress open

npx cypress run --spec cypress/integration/login/login_spec.js --env host=prod --browser=chrome

npx cypress run --spec cypress/integration/basket/* --env host=prod --browser=chrome

---------------------------
## tips


cy.debug - breakpoint pro debug

it.skip - skipnuti testu

## doc
https://www.bigbinary.com/learn-qa-automation-using-cypress

---------------------------
## TODO
1) pouziti Webpack aliases - neni nutne importovat ve tvaru i.e. ../../
2) doresit baseUrl = aktualne se taha na ruznych mistech ruznym zpusobem -> sjednoti
3) doresit navigatora po webu -  routes.json VS navigationCommands.js 