const seletores = {
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  resumoPedido: '#cart_info',
  comentario: '#ordermsg textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]'
};

function validarEnderecoEResumoDoPedido(usuario) {
  cy.contains('h2', 'Address Details').should('be.visible');
  cy.contains('h2', 'Review Your Order').should('be.visible');
  cy.get(seletores.resumoPedido).should('be.visible');

  [seletores.enderecoEntrega, seletores.enderecoCobranca].forEach((seletor) => {
    cy.get(seletor)
      .should('be.visible')
      .and('contain', usuario.primeiroNome)
      .and('contain', usuario.endereco)
      .and('contain', usuario.cidade)
      .and('contain', usuario.estado)
      .and('contain', usuario.cep);
  });
}

function informarComentarioEProsseguir(comentario) {
  cy.get(seletores.comentario).type(comentario);
  cy.get(seletores.botaoFazerPedido).click();
}

function efetuarPagamento(pagamento) {
  cy.get(seletores.nomeCartao).type(pagamento.nomeCartao);
  cy.get(seletores.numeroCartao).type(pagamento.numeroCartao);
  cy.get(seletores.cvc).type(pagamento.cvc);
  cy.get(seletores.mesValidade).type(pagamento.mesValidade);
  cy.get(seletores.anoValidade).type(pagamento.anoValidade);
  cy.get(seletores.botaoPagar).click();
}

function validarPedidoConfirmado() {
  cy.contains('h2', 'Order Placed!').should('be.visible');
  cy.contains('Congratulations! Your order has been confirmed!')
    .should('be.visible');
}

module.exports = {
  validarEnderecoEResumoDoPedido,
  informarComentarioEProsseguir,
  efetuarPagamento,
  validarPedidoConfirmado
};
