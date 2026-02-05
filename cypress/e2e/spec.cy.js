describe('Teste de Login', () => {

   
  
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login')

    cy.get('[data-testid="email"]').type('lucas98@hotmail.com')
    cy.get('[data-testid="senha"]').type('127498')
    cy.get('[data-testid="entrar"]').click()

    cy.contains('Serverest Store').should('be.visible')
  })

  it('Login Sucesso', () => {
    cy.contains('Serverest Store').should('be.visible')
  })

  it('Adicionar e limpar item ao Carrinho', () => {
    cy.get('[data-testid="adicionarNaLista"]').first().click()
    cy.contains('Lista de Compras').should('be.visible')
    cy.get('[data-testid="limparLista"]').click()
    cy.get('[data-testid="shopping-cart-empty-message"]').contains('Seu carrinho está vazio')
  })

 it('Logout do sistema', () => {
    cy.get('[data-testid="logout"]').click()
    cy.get('[data-testid="cadastrar"]').contains('Cadastre-se')
  })

})

describe('Falhas - Sem execução do BeforEach', () => {

  it('Login Falha', () => {
    cy.visit('https://front.serverest.dev/login')
    
    cy.get('[data-testid="email"]').type('lucas98@hotmail.com')
    cy.get('[data-testid="senha"]').type('12')
    cy.get('[data-testid="entrar"]').click()
    cy.get('.alert > :nth-child(2)').contains('Email e/ou senha inválidos')
    
  })

})