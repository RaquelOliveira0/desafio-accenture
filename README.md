# Desafio Accenture com Cypress e Cucumber

Projeto de automação de testes para o site [DemoQA](https://demoqa.com/), usando Cypress para executar os testes, Cucumber/Gherkin para descrever os cenários e Page Objects para organizar as interações com as páginas.

## Desafios cobertos

### Testes end-to-end

Os cenários de interface ficam em `cypress/e2e/e2e`:

- **Practice Form** (`forms/practice-form.feature`): preenche o formulário com dados aleatórios, envia e valida o modal de confirmação.
- **Browser Windows** (`forms/browser-windows.feature`): solicita a abertura de uma nova janela, valida seu conteúdo e retorna à página anterior. Como o Cypress controla uma aba, o teste verifica a chamada que abriria a janela e navega para o destino na mesma aba.
- **Web Tables** (`forms/web-tables.feature`): cria, edita e exclui um registro; em outro cenário, cria 12 registros dinamicamente e remove todos.
- **Progress Bar** (`widgets/progress-bar.feature`): inicia e pausa a barra até 25%, valida o percentual, retoma até 100% e reseta para 0%.
- **Sortable** (`interactions/sortable.feature`): usa drag and drop para reorganizar os itens em ordem inversa e valida a ordem após cada movimento.

### Teste de API

O cenário `cypress/e2e/api/account.feature` cria um usuário, gera um token, verifica a autorização, consulta os livros, adiciona dois à coleção e valida os dados do usuário.

## Estrutura do projeto

```text
cypress/
  e2e/
    api/
      account.feature         # cenário de API em Gherkin
      account.js               # steps Cucumber do cenário de API
    e2e/
      forms/
        browser-windows.feature
        browser-windows.js
        practice-form.feature
        practice-form.js
        web-tables.feature
        web-tables.js
      interactions/
        sortable.feature
        sortable.js
      widgets/
        progress-bar.feature
        progress-bar.js
  fixtures/                    # arquivos usados pelos testes, como upload.txt
  screenshots/                 # capturas geradas quando um teste falha
  support/
    factories/                 # criação de dados de teste, inclusive com Faker
    pages/                     # Page Objects e seletores/ações de cada página
    commands.js                # espaço para comandos Cypress reutilizáveis
    e2e.js                     # suporte carregado antes dos testes
cypress.config.js              # baseUrl, features e integração com Cucumber/esbuild
package.json                  # dependências e scripts npm
```

## Como os arquivos trabalham juntos

- A **feature** (`.feature`) descreve o comportamento em Gherkin, em português, com passos `Dado`, `Quando` e `Então`.
- O arquivo **JavaScript com o mesmo nome** da feature implementa esses passos com Cypress e conecta o cenário às páginas.
- A **Page Object** em `cypress/support/pages` concentra navegação, seletores e ações da página, reduzindo detalhes de interface dentro dos steps.
- As **factories** em `cypress/support/factories` geram dados para os testes. Por exemplo, a factory de Web Tables produz registros únicos, e a do Practice Form usa Faker.
- Os **fixtures** guardam arquivos estáticos usados nos testes, como o arquivo de upload do formulário.
- O preprocessor Cucumber está configurado para encontrar os steps pelo caminho da feature e também permite steps compartilhados em `cypress/e2e/step_definitions`.

O Sortable do DemoQA é implementado com React DnD e depende de um gesto de mouse nativo. Para esse cenário, `cypress-real-events` fornece os eventos reais de mouse usados no drag and drop; os eventos simulados padrão do Cypress não acionavam esse componente de forma confiável.

## Requisitos

- Node.js e npm instalados.
- Dependências do projeto instaladas com `npm install`.
- Acesso ao DemoQA pela rede para executar os testes contra o site remoto.

## Executar os testes

```bash
# Executa todos os testes Cypress
npm test

# Executa apenas as features de interface
npm run test:e2e

# Executa apenas as features de API
npm run test:api

# Abre o Cypress em modo interativo
npm run cy:open
```

Para rodar uma feature específica:

```bash
npx cypress run --spec "cypress/e2e/e2e/interactions/sortable.feature"
```

## URL base

Por padrão, o Cypress usa `https://demoqa.com/` como `baseUrl`. A variável `API_BASE_URL` pode substituir essa URL para todos os testes, incluindo navegação e requisições de API. Defina-a apenas quando quiser usar outro ambiente compatível com as mesmas páginas e endpoints.

Exemplo no PowerShell:

```powershell
$env:API_BASE_URL = "https://demoqa.com/"
npm run test:api
```