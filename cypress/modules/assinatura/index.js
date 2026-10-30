const seletores = {
  titulo: '#footer h2',
  email: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  confirmacao: '#success-subscribe'
};

function inscreverEmail(email) {
  cy.get(seletores.titulo)
    .scrollIntoView()
    .should('be.visible')
    .and('contain', 'Subscription');
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoInscrever).click();
}

function validarInscricaoConfirmada() {
  cy.get(seletores.confirmacao)
    .should('be.visible')
    .and('contain', 'You have been successfully subscribed!');
}

module.exports = {
  inscreverEmail,
  validarInscricaoConfirmada
};
