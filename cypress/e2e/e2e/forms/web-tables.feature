# language: pt

Funcionalidade: Gerenciamento de registros em Web Tables - Desafio Frontend

  Cenário: Criar, editar e excluir um registro
    Dado que acesso a página inicial do DemoQA
    Quando acesso Elements e abro Web Tables
    E crio um novo registro na tabela
    E edito o registro recém-criado
    Então os dados editados devem ser exibidos na tabela
    Quando excluo o registro recém-criado
    Então o registro recém-criado não deve estar na tabela

  Cenário: Criar e excluir 12 registros dinamicamente
    Dado que acesso a página inicial do DemoQA
    Quando acesso Elements e abro Web Tables
    E crio 12 registros dinamicamente
    Então os 12 novos registros devem estar na tabela
    Quando excluo todos os registros criados neste cenário
    Então nenhum dos registros criados deve permanecer na tabela