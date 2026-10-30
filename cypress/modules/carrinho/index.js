const seletores = {
  titulo: 'li.active',
  itens: '#cart_info_table tbody tr',
  prosseguirCheckout: 'a.check_out'
};

function validarCarrinhoVisivel() {
  cy.url().should('include', '/view_cart');
  cy.get(seletores.titulo).should('contain', 'Shopping Cart');
  cy.get(seletores.itens).should('have.length.greaterThan', 0);
}

function prosseguirParaCheckout() {
  cy.get(seletores.prosseguirCheckout).should('be.visible').click();
}

module.exports = {
  validarCarrinhoVisivel,
  prosseguirParaCheckout
};
