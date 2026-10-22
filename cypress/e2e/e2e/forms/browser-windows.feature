# language: pt

Funcionalidade: Janelas do navegador - Desafio Frontend - Parte 2

  Cenário: Abrir, validar e fechar uma nova janela
    Dado que acesso a página inicial do DemoQA
    Quando acesso Alerts, Frame & Windows e abro Browser Windows
    E solicito a abertura da nova janela
    Então uma nova janela deve ser solicitada
    Quando acesso o conteúdo da nova janela
    Então a mensagem "This is a sample page" deve ser exibida
    Quando fecho a nova janela
