# language: pt

Funcionalidade: Barra de progresso - Desafio Frontend

  Cenário: Pausar abaixo de 25%, concluir e resetar a barra
    Dado que acesso a página inicial do DemoQA
    Quando acesso Widgets e abro Progress Bar
    E inicio a barra de progresso
    E paro a barra antes de 25%
    Então o percentual da barra deve ser menor ou igual a 25%
    Quando inicio novamente a barra e aguardo até 100%
    Então o percentual da barra deve ser 100%
    Quando reseto a barra de progresso
    Então o percentual da barra deve ser 0%