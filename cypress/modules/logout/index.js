const seletores = {
  botaoSair: 'a[href="/logout"]',
  formularioLogin: '.login-form h2'
};

function efetuarLogout() {
  cy.get(seletores.botaoSair).should('be.visible').click();
}

function validarUsuarioDesconectado() {
  cy.get(seletores.formularioLogin)
    .should('be.visible')
    .and('contain', 'Login to your account');
  cy.get(seletores.botaoSair).should('not.exist');
  cy.url().should('include', '/login');
}

module.exports = {
  efetuarLogout,
  validarUsuarioDesconectado
};
