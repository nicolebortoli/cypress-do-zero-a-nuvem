
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Verfica se preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('[id="firstName"]').type('Nicole',{ delay: 0 })
    cy.get('[id="lastName"]').type('Test')
    cy.get('[id="email"]').type('test@gmail.com')
    cy.get('[id="open-text-area"]').type('O som está baixo')
    cy.contains('Enviar').click()
    cy.get('.success').should('be.visible');
  })

 it('Verificar se exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[id="email"]').type('test')
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible');
  })

it('Verificar campo telefone apenas aceita numeros', () => {
  //cy.get('[id="phone"]').type('(47)988016355')
  cy.get('[id="phone"]').type('abc')
  cy.get('[id="phone"]').should('not.have.value', 'abc')
  })

it('Verificar exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('[id="firstName"]').type('Nicole')
    cy.get('[id="lastName"]').type('Test')
    cy.get('[id="email"]').type('test@gmail.com')
    cy.get('[id="open-text-area"]').type('O som está baixo')
    cy.get('[id="phone-checkbox"]').check()
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible');
  })

it('Verificar se preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[id="firstName"]').type('Nicole')
    cy.get('[id="firstName"]').should('have.value', 'Nicole')
    cy.get('[id="firstName"]').clear()
    cy.get('[id="firstName"]').should('have.value', '')
    cy.get('[id="lastName"]').type('Test')
    cy.get('[id="lastName"]').should('have.value', 'Test')
    cy.get('[id="lastName"]').clear()
    cy.get('[id="lastName"]').should('have.value', '')
    cy.get('[id="email"]').type('test@gmail.com')
    cy.get('[id="email"]').should('have.value', 'test@gmail.com')
    cy.get('[id="email"]').clear()
    cy.get('[id="email"]').should('have.value', '')
    cy.get('[id="open-text-area"]').type('O som está baixo')
    cy.get('[id="open-text-area"]').should('have.value', 'O som está baixo')
    cy.get('[id="open-text-area"]').clear()
    cy.get('[id="open-text-area"]').should('have.value', '')
  })

it('Verificar se exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible');
  })

it('Verifica se envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Nicole', 'Test', 'Test@gmail.com', 'O som está baixo')
    cy.get('.success').should('be.visible');
  })

it('Verifica se seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('youtube').should('have.value', 'youtube')
  })

it('Verifica se seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

it('Verifica se seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select('blog').should('have.value', 'blog')
  })

it('Verifica se marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

it('Verifica se marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]').check().each(typeOfService => {
    cy.wrap(typeOfService).check().should('be.checked')
  })
})

it('Verifica se marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('[id="email-checkbox"]').check().should('be.checked')
  cy.get('[id="phone-checkbox"]').check().should('be.checked')
  cy.get('[id="phone-checkbox"]').uncheck().should('not.be.checked')
})

it('Verifica se seleciona um arquivo da pasta fixtures', () => {
  cy.get('#file-upload').selectFile('cypress/fixtures/file')
  cy.get('input[type="file"]').should('have.value', 'C:\\fakepath\\file');
})

it('Verifica se seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('#file-upload').selectFile('cypress/fixtures/file', { action: 'drag-drop' });
  cy.get('input[type="file"]').should('have.value', 'C:\\fakepath\\file');
})

it('Verifica se seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('file').as('myFile');
  cy.get('input[type="file"]').selectFile('@myFile');
  cy.get('input[type="file"]').should('have.value', 'C:\\fakepath\\file');
})

it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.get('a').should('have.attr', 'target', '_blank')
})

it('Verifica se acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.get('a').invoke('removeAttr', 'target')
})

it.skip('Verifica se a página da política de privacidade de forma independente', () => {
  cy.get('#privacy').invoke('removeAttr', 'target').click()
   cy.get('#privacy').click()
})


})

