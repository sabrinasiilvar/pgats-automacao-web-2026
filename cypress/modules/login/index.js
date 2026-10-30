const seletores = {
  titulo: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  usuarioAutenticado: '.navbar-nav'
};

function validarFormularioDeLoginVisivel() {
  cy.get(seletores.titulo)
    .should('be.visible')
    .and('contain', 'Login to your account');
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha);
  cy.get(seletores.botaoEntrar).click();
}

function validarUsuarioAutenticado(nome) {
  cy.get(seletores.usuarioAutenticado)
    .contains(`Logged in as ${nome}`)
    .should('be.visible');
}

function validarErroDeCredenciais() {
  cy.get('form[action*="login"] > p')
    .should('be.visible')
    .and('contain', 'Your email or password is incorrect!');
}

module.exports = {
  validarFormularioDeLoginVisivel,
  efetuarLogin,
  validarUsuarioAutenticado,
  validarErroDeCredenciais
};
