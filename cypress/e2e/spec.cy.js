import { faker } from '@faker-js/faker'
describe('Cadastro', () => {

it('Cadastro com dados aleatórios', () => {
  const nome = faker.person.fullName()
  const email = faker.internet.email()
  const password = faker.internet.password(10)

  cy.log(`Nome: ${nome}`)
  cy.log(`Email: ${email}`)
  cy.visit('https://front.serverest.dev/login')
  cy.get('[data-testid="cadastrar"]').click()
  cy.get('[data-testid=nome]').type(nome)
  cy.get('[data-testid=email]').type(email)
  cy.get('[data-testid=password]').type(password)
  cy.get('[data-testid=cadastrar]').click()
  cy.get('.alert').contains('Cadastro realizado com sucesso')
})

})

describe('Teste de Login', () => {

  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="email"]').type('Mitchell.OHara-Bode@hotmail.com')
    cy.get('[data-testid="senha"]').type('2QEnAPEoLRDFCcm')
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
    cy.get('.font-robot').contains('Login')
  })

})

describe('Falhas', () => {

  it('Login Falha', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="email"]').type('lucas98@hotmail.com')
    cy.get('[data-testid="senha"]').type('12')
    cy.get('[data-testid="entrar"]').click()
    cy.get('.alert > :nth-child(2)').contains('Email e/ou senha inválidos')
    
  })

  it('Sessão cadastre-se falhar 3 campos, deixar em branco nome, email e password', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="cadastrar"]').click()
    cy.get('.font-robot').contains('Cadastro')
    cy.get('[data-testid="cadastrar"]').click()
    cy.get(':nth-child(3) > :nth-child(2)').contains('Nome é obrigatório')
    cy.get(':nth-child(4) > :nth-child(2)').contains('Email é obrigatório')
    cy.get(':nth-child(5) > :nth-child(2)').contains('Password é obrigatório')
  })

})

