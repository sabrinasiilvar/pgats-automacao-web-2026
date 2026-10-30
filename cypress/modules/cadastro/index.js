const seletores = {
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  formularioNovoCadastro: '.signup-form h2',
  botaoCadastro: '[data-qa="signup-button"]',
  genero: '#id_gender2',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  optin: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complementoEndereco: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  telefone: '[data-qa="mobile_number"]',
  criarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  continuar: '[data-qa="continue-button"]',
  contaExcluida: '[data-qa="account-deleted"]',
  mensagemCadastroExistente: 'form[action*=signup] p'
};

function iniciarCadastro(nome, email) {
  cy.get(seletores.nome).type(nome);
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoCadastro).click();
}

function validarFormularioDeNovoCadastroVisivel() {
  cy.get(seletores.formularioNovoCadastro)
    .should('be.visible')
    .and('contain', 'New User Signup!');
}

function validarFormularioDeCadastroVisivel() {
  cy.contains('h2', 'Enter Account Information').should('be.visible');
}

function preencherCadastro(usuario) {
  cy.get(seletores.genero).check();
  cy.get(seletores.senha).type(usuario.senha);
  cy.get(seletores.dia).select(usuario.dia);
  cy.get(seletores.mes).select(usuario.mes);
  cy.get(seletores.ano).select(usuario.ano);
  cy.get(seletores.newsletter).check();
  cy.get(seletores.optin).check();
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.sobrenome).type(usuario.sobrenome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.complementoEndereco).type(usuario.complementoEndereco);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.telefone).type(usuario.telefone);
  cy.get(seletores.criarConta).click();
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
  cy.get(seletores.contaCriada)
    .should('be.visible')
    .and('contain', 'Account Created!');
}

function continuarAposCadastro() {
  cy.get(seletores.continuar).click();
}

function cadastrarUsuario(usuario) {
  validarFormularioDeNovoCadastroVisivel();
  iniciarCadastro(usuario.nome, usuario.email);
  validarFormularioDeCadastroVisivel();
  preencherCadastro(usuario);
  verificarSeCadastroFoiEfetuadoComSucesso();
  continuarAposCadastro();
}

function excluirConta() {
  cy.get('a[href="/delete_account"]').click();
  cy.get(seletores.contaExcluida)
    .should('be.visible')
    .and('contain', 'Account Deleted!');
  continuarAposCadastro();
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  cy.get(seletores.mensagemCadastroExistente)
    .should('exist')
    .and('be.visible')
    .and('contain', 'Email Address already exist!');
}

module.exports = {
  iniciarCadastro,
  validarFormularioDeNovoCadastroVisivel,
  validarFormularioDeCadastroVisivel,
  preencherCadastro,
  continuarAposCadastro,
  cadastrarUsuario,
  excluirConta,
  verificarSeCadastroFoiEfetuadoComSucesso,
  verificarSeMensagemDeCadastroExistenteFoiExibida
};
