/// <reference types="cypress" />

function criarTransacao(descricao, valor) {
    cy.get('#transaction > .button').click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-02-15") // yyy-mm-dd
    cy.contains('button', 'Salvar').click()
}

beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/")
});

describe('Transações', () => {
    it('Cadastrar uma entrada', () => {
        
        criarTransacao("Freela", 250)

        cy.get("tbody tr td.description").should("have.text", "Freela")
    });

    it('Cadastrar uma saída', () => {
        
        criarTransacao("Cinema", -30)

        cy.get("tbody tr td.description").should("have.text", "Cinema")
    });

    it('Excluir transação', () => {
        criarTransacao("Cinema", -30)
        criarTransacao("Mesada", 50)
        cy.contains(".description", "Cinema")
            .parent()
            .find('img')
            .click()

        cy.get('tbody tr').should("have.length", 1)
    });
});