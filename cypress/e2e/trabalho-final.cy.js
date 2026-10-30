/// <reference types="cypress" />

const dadosCenario = require('../fixtures/trabalho-final.json');
const assinatura = require('../modules/assinatura');
const cadastro = require('../modules/cadastro');
const carrinho = require('../modules/carrinho');
const checkout = require('../modules/checkout');
const login = require('../modules/login');
const logout = require('../modules/logout');
const navegacao = require('../modules/navegacao');
const produtos = require('../modules/produtos');

function criarUsuarioUnico() {
  const identificador = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  return {
    ...dadosCenario.usuario,
    email: `pgats-final-${identificador}@mail.com`
  };
}

function prepararContaParaLogin(usuario) {
  navegacao.acessarPaginaInicial();
  navegacao.validarPaginaInicialVisivel();
  navegacao.acessarCadastroOuLogin();
  cadastro.cadastrarUsuario(usuario);
  login.validarUsuarioAutenticado(usuario.nome);
  logout.efetuarLogout();
  logout.validarUsuarioDesconectado();
}

function finalizarCompra(usuario) {
  navegacao.acessarProdutos();
  produtos.validarPaginaDeProdutosVisivel();
  produtos.adicionarPrimeiroProdutoAoCarrinho();
  navegacao.acessarCarrinho();
  carrinho.validarCarrinhoVisivel();
  carrinho.prosseguirParaCheckout();
  checkout.validarEnderecoEResumoDoPedido(usuario);
  checkout.informarComentarioEProsseguir(dadosCenario.comentarioPedido);
  checkout.efetuarPagamento(dadosCenario.pagamento);
  checkout.validarPedidoConfirmado();
  cadastro.excluirConta();
}

describe('Trabalho final - Automation Exercise', () => {
  describe('Cadastro e autenticação', () => {
    it('Caso 1: registra um usuário e exclui a conta', () => {
      const usuario = criarUsuarioUnico();

      navegacao.acessarPaginaInicial();
      navegacao.validarPaginaInicialVisivel();
      navegacao.acessarCadastroOuLogin();
      cadastro.cadastrarUsuario(usuario);
      login.validarUsuarioAutenticado(usuario.nome);
      cadastro.excluirConta();
    });

    it('Caso 2: efetua login com email e senha corretos', () => {
      const usuario = criarUsuarioUnico();

      prepararContaParaLogin(usuario);
      navegacao.acessarCadastroOuLogin();
      login.validarFormularioDeLoginVisivel();
      login.efetuarLogin(usuario.email, usuario.senha);
      login.validarUsuarioAutenticado(usuario.nome);
      cadastro.excluirConta();
    });

    it('Caso 3: rejeita login com email e senha incorretos', () => {
      navegacao.acessarPaginaInicial();
      navegacao.validarPaginaInicialVisivel();
      navegacao.acessarCadastroOuLogin();
      login.validarFormularioDeLoginVisivel();
      login.efetuarLogin(`inexistente-${Date.now()}@mail.com`, 'SenhaInvalida123!');
      login.validarErroDeCredenciais();
    });

    it('Caso 4: efetua logout de um usuário autenticado', () => {
      const usuario = criarUsuarioUnico();

      prepararContaParaLogin(usuario);
      navegacao.acessarCadastroOuLogin();
      login.efetuarLogin(usuario.email, usuario.senha);
      login.validarUsuarioAutenticado(usuario.nome);
      logout.efetuarLogout();
      logout.validarUsuarioDesconectado();
      navegacao.acessarCadastroOuLogin();
      login.efetuarLogin(usuario.email, usuario.senha);
      login.validarUsuarioAutenticado(usuario.nome);
      cadastro.excluirConta();
    });

    it('Caso 5: impede cadastro com um email já registrado', () => {
      const usuario = criarUsuarioUnico();

      navegacao.acessarPaginaInicial();
      navegacao.acessarCadastroOuLogin();
      cadastro.cadastrarUsuario(usuario);
      logout.efetuarLogout();
      logout.validarUsuarioDesconectado();
      cadastro.iniciarCadastro(usuario.nome, usuario.email);
      cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();
      login.efetuarLogin(usuario.email, usuario.senha);
      login.validarUsuarioAutenticado(usuario.nome);
      cadastro.excluirConta();
    });
  });

  describe('Produtos e assinatura', () => {
    it('Caso 8: exibe a lista e os detalhes do primeiro produto', () => {
      navegacao.acessarPaginaInicial();
      navegacao.validarPaginaInicialVisivel();
      navegacao.acessarProdutos();
      produtos.validarPaginaDeProdutosVisivel();
      produtos.abrirDetalhesDoPrimeiroProduto();
      produtos.validarDetalhesDoProdutoVisiveis();
    });

    it('Caso 9: busca produtos pelo nome', () => {
      navegacao.acessarPaginaInicial();
      navegacao.validarPaginaInicialVisivel();
      navegacao.acessarProdutos();
      produtos.validarPaginaDeProdutosVisivel();
      produtos.buscarProduto(dadosCenario.produtoBusca);
      produtos.validarResultadosDaBusca(dadosCenario.produtoBusca);
    });

    it('Caso 10: inscreve um email na assinatura da página inicial', () => {
      navegacao.acessarPaginaInicial();
      navegacao.validarPaginaInicialVisivel();
      assinatura.inscreverEmail(`pgats-assinatura-${Date.now()}@mail.com`);
      assinatura.validarInscricaoConfirmada();
    });
  });

  describe('Checkout', () => {
    it('Caso 15: finaliza compra após criar uma conta', () => {
      const usuario = criarUsuarioUnico();

      navegacao.acessarPaginaInicial();
      navegacao.validarPaginaInicialVisivel();
      navegacao.acessarCadastroOuLogin();
      cadastro.cadastrarUsuario(usuario);
      login.validarUsuarioAutenticado(usuario.nome);
      finalizarCompra(usuario);
    });

    it('Caso 16: finaliza compra após login com conta existente', () => {
      const usuario = criarUsuarioUnico();

      prepararContaParaLogin(usuario);
      navegacao.acessarCadastroOuLogin();
      login.efetuarLogin(usuario.email, usuario.senha);
      login.validarUsuarioAutenticado(usuario.nome);
      finalizarCompra(usuario);
    });
  });
});
