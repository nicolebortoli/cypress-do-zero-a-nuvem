// https://on.cypress.io/custom-commands

 Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, lastName, email, comment)  => { 
    cy.get('[id="firstName"]').type(name)
    cy.get('[id="lastName"]').type(lastName)
    cy.get('[id="email"]').type(email)
    cy.get('[id="open-text-area"]').type(comment)
    cy.contains('Enviar').click()
  })
