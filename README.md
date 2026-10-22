# Cypress com Cucumber

As features ficam separadas por tipo de teste:

- `cypress/e2e/api`: cenarios de API e seus step definitions.
- `cypress/e2e/e2e`: cenarios end-to-end e seus step definitions.
- `cypress/e2e/step_definitions`: opcional, para steps compartilhados entre features.

Os steps especificos ficam em um arquivo JavaScript com o mesmo nome da feature. O preprocessor tambem procura steps compartilhados em `cypress/e2e/step_definitions`.

## Executar

- `npm test`: executa features e testes Cypress `.cy.js`.
- `npm run test:e2e`: executa as features end-to-end.
- `npm run test:api`: executa as features de API.
- `npm run cy:open`: abre o Cypress em modo interativo.

O fluxo de API em `cypress/e2e/api/health.feature` cobre criacao de usuario, geracao de token, autorizacao, consulta de livros, inclusao na colecao e consulta do usuario. Os steps usam os endpoints `/Account/v1/User`, `/Account/v1/GenerateToken`, `/Account/v1/Authorized`, `/BookStore/v1/Books` e `/Account/v1/User/{userId}`. Portanto, a API configurada precisa seguir esse contrato.

Antes de executar, configure `API_BASE_URL` com a URL base da API. Sem essa variavel, o teste falha intencionalmente antes de enviar requisicoes.

No PowerShell, por exemplo:

```powershell
$env:API_BASE_URL = "https://demoqa.com"
npm run test:api
```