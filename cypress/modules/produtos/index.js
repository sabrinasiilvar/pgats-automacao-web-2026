const seletores = {
  tituloPagina: 'h2.title',
  listaProdutos: '.features_items .product-image-wrapper',
  botaoVerProduto: 'a[href^="/product_details/"]',
  nomeProduto: '.product-information h2',
  detalhesProduto: '.product-information p',
  precoProduto: '.product-information span span',
  campoBusca: '#search_product',
  botaoBuscar: '#submit_search',
  nomeResultadoBusca: '.features_items .productinfo p',
  botaoAdicionarAoCarrinho: '.productinfo .add-to-cart',
  modalCarrinho: '#cartModal'
};

function validarPaginaDeProdutosVisivel() {
  cy.url().should('include', '/products');
  cy.get(seletores.tituloPagina)
    .should('be.visible')
    .and('contain', 'All Products');
  cy.get(seletores.listaProdutos).should('have.length.greaterThan', 0);
}

function abrirDetalhesDoPrimeiroProduto() {
  cy.get(seletores.listaProdutos)
    .first()
    .find(seletores.botaoVerProduto)
    .click();
}

function validarDetalhesDoProdutoVisiveis() {
  cy.url().should('include', '/product_details/');
  cy.get(seletores.nomeProduto).should('be.visible');
  cy.get(seletores.precoProduto).should('be.visible');
  cy.get(seletores.detalhesProduto).then(($detalhes) => {
    const textoDetalhes = $detalhes.text();
    expect(textoDetalhes).to.contain('Category:');
    expect(textoDetalhes).to.contain('Availability:');
    expect(textoDetalhes).to.contain('Condition:');
    expect(textoDetalhes).to.contain('Brand:');
  });
}

function buscarProduto(nomeProduto) {
  cy.get(seletores.campoBusca).type(nomeProduto);
  cy.get(seletores.botaoBuscar).click();
}

function validarResultadosDaBusca(nomeProduto) {
  cy.get(seletores.tituloPagina)
    .should('be.visible')
    .and('contain', 'Searched Products');
  cy.get(seletores.nomeResultadoBusca)
    .should('have.length.greaterThan', 0)
    .each(($nome) => {
      const nome = $nome.text().trim();
      expect(nome, 'nome do produto exibido na busca').to.not.be.empty;
      expect(nome.toLowerCase(), `produto "${nome}" relacionado à busca`)
        .to.include(nomeProduto.toLowerCase());
    });
}

function adicionarPrimeiroProdutoAoCarrinho() {
  cy.get(seletores.listaProdutos)
    .first()
    .find(seletores.botaoAdicionarAoCarrinho)
    .click({ force: true });
  cy.get(seletores.modalCarrinho).should('be.visible');
  cy.get(seletores.modalCarrinho).contains('Continue Shopping').click();
}

module.exports = {
  validarPaginaDeProdutosVisivel,
  abrirDetalhesDoPrimeiroProduto,
  validarDetalhesDoProdutoVisiveis,
  buscarProduto,
  validarResultadosDaBusca,
  adicionarPrimeiroProdutoAoCarrinho
};
