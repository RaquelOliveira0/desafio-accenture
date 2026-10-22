# language: pt

Funcionalidade: Gerenciamento de livros pela API

  Cenário: Criar usuário, autenticar e adicionar livros à coleção
    Dado que possuo dados válidos para criar um usuário
    Quando envio uma requisição para criar um novo usuário
    Então o status code deve ser 201
    E a resposta deve conter o ID e o nome do usuário

    Quando solicito um token de acesso para o usuário criado
    Então o status code deve ser 200
    E o token deve ser gerado com sucesso

    Quando verifico a autorização do usuário
    Então o status code deve ser 200
    E o usuário deve estar autorizado

    Quando consulto os livros disponíveis
    Então o status code deve ser 200
    E a resposta deve conter a lista de livros

    Quando adiciono dois livros à coleção do usuário
    Então a resposta deve indicar sucesso na inclusão dos livros

    Quando consulto os dados do usuário
    Então o status code deve ser 200
    E os dados do usuário devem conter os dois livros selecionados