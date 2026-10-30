# Automação Web - PGATS 2026

Projeto de testes E2E com Cypress para os cenários selecionados da aplicação [Automation Exercise](https://www.automationexercise.com/).

## Cenários cobertos

A spec do trabalho final cobre os casos **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16** da [página oficial de casos de teste](https://www.automationexercise.com/test_cases).

## Pré-requisitos

- Node.js 22 ou superior
- npm

## Instalação

Na raiz do projeto, instale as dependências:

```bash
npm ci
```

## Executar os testes do trabalho final

```bash
npm run test:final
```

O comando executa somente `cypress/e2e/trabalho-final.cy.js`.

Para abrir o Cypress interativamente:

```bash
npm run cy:open
```

## Relatório Mochawesome

Após executar a spec, o relatório HTML e o arquivo JSON são gerados em:

```text
cypress/reports/mochawesome/
```

O relatório HTML principal é `trabalho-final.html`. Essa pasta é gerada durante a execução e não é incluída no Git.

## GitHub Actions

O workflow `.github/workflows/trabalho-final.yml` executa `npm run test:final` em pushes, pull requests ou manualmente pelo GitHub Actions. Após a execução, o relatório é publicado como artefato chamado `relatorio-mochawesome-trabalho-final`, disponível por 14 dias.

No GitHub, abra a execução do workflow e baixe o artefato na seção **Artifacts**.


## Estrutura principal

```text
cypress/
├── e2e/          # Specs de aula e spec do trabalho final
├── fixtures/     # Dados de teste
├── modules/      # Ações de negócio, seletores e validações
└── support/      # Registro do reporter Mochawesome
```

As specs antigas dos exercícios de aula foram mantidas. A pipeline do trabalho final executa apenas a spec dedicada.
