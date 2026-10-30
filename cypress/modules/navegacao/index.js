const seletores = {
  logo: '.logo',
  login: 'a[href="/login"]',
  produtos: 'a[href="/products"]',
  carrinho: 'a[href="/view_cart"]'
};

function acessarPaginaInicial() {
  cy.visit('/');
}

function validarPaginaInicialVisivel() {
  cy.get(seletores.logo).should('be.visible');
  cy.contains('Full-Fledged practice website for Automation Engineers')
    .should('be.visible');
}

function acessarCadastroOuLogin() {
  cy.get(seletores.login).click();
}

function acessarProdutos() {
  cy.get(seletores.produtos).click();
}

function acessarCarrinho() {
  cy.get(seletores.carrinho).filter(':visible').first().click();
}

module.exports = {
  acessarPaginaInicial,
  validarPaginaInicialVisivel,
  acessarCadastroOuLogin,
  acessarProdutos,
  acessarCarrinho
};
