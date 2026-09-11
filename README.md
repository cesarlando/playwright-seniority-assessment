# Playwright Seniority Assessment

Projeto de automação de testes desenvolvido com **Playwright** e **TypeScript**, contemplando cenários de testes Web e API.

## Cenários automatizados

### Web — TodoMVC

Aplicação utilizada: `https://demo.playwright.dev/todomvc`

**W1 — Adicionar tarefas**
- Adiciona duas tarefas.
- Valida que as tarefas foram adicionadas corretamente.
- Valida o contador de itens restantes.

**W2 — Concluir e filtrar tarefas**
- Adiciona duas tarefas.
- Marca uma tarefa como concluída.
- Valida que a tarefa concluída é exibida no filtro `Completed`.
- Valida que a tarefa concluída não é exibida no filtro `Active`.

### API — GitHub REST API

API utilizada: `https://api.github.com`

**A1 — Usuário válido**
- Realiza uma requisição `GET /users/{username}` para um usuário existente.
- Valida o status HTTP `200`.
- Valida os campos `login`, `id` e `public_repos` da resposta.

**A2 — Usuário inexistente**
- Realiza uma requisição `GET /users/{username}` para um usuário inexistente.
- Valida o status HTTP `404`.

## Tecnologias

- Node.js
- Playwright Test
- TypeScript

## Estrutura do projeto

```text
playwright-seniority-assessment/
├── tests/
│   ├── api/
│   │   └── github.spec.ts
│   └── web/
│       └── todo.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

Os testes foram separados entre `web` e `api` para facilitar a organização e permitir a execução independente de cada tipo de teste.

## Pré-requisitos

Para executar o projeto é necessário ter instalado:

- Node.js
- npm

## Instalação

Clone o repositório:

```bash
git clone https://github.com/cesarlando/playwright-seniority-assessment.git
```

Acesse a pasta do projeto:

```bash
cd playwright-seniority-assessment
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores utilizados pelo Playwright:

```bash
npx playwright install
```

## Execução dos testes

Para executar todos os testes:

```bash
npx playwright test
```

Para executar somente os testes Web:

```bash
npx playwright test tests/web
```

Para executar somente os testes de API:

```bash
npx playwright test tests/api
```

Para executar os testes Web visualizando o navegador:

```bash
npx playwright test tests/web --headed
```

## Relatório

Após a execução dos testes, o relatório HTML pode ser aberto com:

```bash
npx playwright show-report
```

## Decisões de implementação

O projeto foi mantido propositalmente simples e proporcional ao escopo do desafio.

Os testes Web utilizam os locators e ações diretamente nos arquivos de teste. Como o escopo possui apenas dois cenários sobre uma única página simples, não foi adicionada uma camada de Page Object, evitando abstrações sem necessidade de reutilização neste contexto.

Os cenários são independentes entre si e utilizam o isolamento fornecido pelo Playwright entre os testes.

A configuração do Playwright também inclui:

- execução paralela dos testes;
- retries em ambiente de CI;
- geração de trace no primeiro retry;
- screenshot em caso de falha;
- relatório HTML;
- execução Web utilizando Chromium.