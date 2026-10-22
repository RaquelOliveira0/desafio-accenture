# language: pt

Funcionalidade: Preenchimento do Practice Form - Desafio Frontend - Parte 2

  Cenário: Enviar formulário com dados aleatórios
    Dado que acesso a página inicial do DemoQA
    Quando acesso Forms e abro Practice Form
    E preencho todos os campos com dados aleatórios
    E envio o formulário
    Então o popup de confirmação deve ser exibido
    Quando fecho o popup de confirmação
    Então o popup de confirmação não deve estar visível