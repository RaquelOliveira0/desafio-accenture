import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

Given("que possuo dados válidos para criar um usuário", () => {
  expect(
    Cypress.config("baseUrl"),
  ).to.be.a("string").and.not.be.empty;

  cy.wrap({
    userName: `cypress_${Date.now()}_${Cypress._.random(1000, 9999)}`,
    password: "Cypress@1234",
  }).as("newUser");
});

When("envio uma requisição para criar um novo usuário", () => {
  cy.get("@newUser").then((user) => {
    cy.request({
      method: "POST",
      url: "/Account/v1/User",
      body: user,
      failOnStatusCode: false,
    }).as("lastResponse");
  });
});

Then("o status code deve ser {int}", (expectedStatus) => {
  cy.get("@lastResponse")
    .its("status")
    .should("eq", expectedStatus);
});

Then("a resposta deve conter o ID e o nome do usuário", () => {
  cy.get("@lastResponse").then(({ body }) => {
    expect(body.userID).to.be.a("string").and.not.be.empty;
    expect(body.username).to.be.a("string").and.not.be.empty;
    cy.wrap(body).as("createdUser");
  });
});

When("solicito um token de acesso para o usuário criado", () => {
  cy.get("@newUser").then((user) => {
    cy.request({
      method: "POST",
      url: "/Account/v1/GenerateToken",
      body: user,
      failOnStatusCode: false,
    }).as("lastResponse");
  });
});

Then("o token deve ser gerado com sucesso", () => {
  cy.get("@lastResponse").then(({ body }) => {
    expect(body.token).to.be.a("string").and.not.be.empty;
    expect(body.expires).to.be.a("string").and.not.be.empty;
    expect(Date.parse(body.expires)).not.to.be.NaN;
    expect(Date.parse(body.expires)).to.be.greaterThan(Date.now());
    expect(body.status).to.equal("Success");
    expect(body.result).to.be.a("string").and.not.be.empty;
    cy.wrap(body.token).as("accessToken");
  });
});

When("verifico a autorização do usuário", () => {
  cy.get("@newUser").then((user) => {
    cy.request({
      method: "POST",
      url: "/Account/v1/Authorized",
      body: user,
      failOnStatusCode: false,
    }).as("lastResponse");
  });
});

Then("o usuário deve estar autorizado", () => {
  cy.get("@lastResponse")
    .its("body")
    .should("equal", true);
});

When("consulto os livros disponíveis", () => {
  cy.request({
    method: "GET",
    url: "/BookStore/v1/Books",
    failOnStatusCode: false,
  }).as("lastResponse");
});

Then("a resposta deve conter a lista de livros", () => {
  cy.get("@lastResponse").then(({ body }) => {
    expect(body.books).to.be.an("array").with.length.greaterThan(1);

    body.books.forEach((book) => {
      expect(book.isbn).to.be.a("string").and.not.be.empty;
      expect(book.title).to.be.a("string").and.not.be.empty;
      expect(book.subTitle).to.be.a("string");
      expect(book.author).to.be.a("string").and.not.be.empty;
      expect(book.publish_date).to.be.a("string").and.not.be.empty;
      expect(Date.parse(book.publish_date)).not.to.be.NaN;
      expect(book.publisher).to.be.a("string").and.not.be.empty;
      expect(book.pages).to.be.a("number").and.greaterThan(0);
      expect(book.description).to.be.a("string");
      expect(book.website).to.be.a("string");
    });

    const selectedBooks = Cypress._
      .sampleSize(body.books, 2)
      .map(({ isbn }) => ({ isbn }));
    expect(selectedBooks.every(({ isbn }) => Boolean(isbn))).to.equal(true);
    cy.wrap(selectedBooks).as("selectedBooks");
  });
});

When("adiciono dois livros à coleção do usuário", () => {
  cy.get("@createdUser").then((user) => {
    cy.get("@accessToken").then((token) => {
      cy.get("@selectedBooks").then((books) => {
        cy.request({
          method: "POST",
          url: "/BookStore/v1/Books",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            userId: user.userID,
            collectionOfIsbns: books,
          },
          failOnStatusCode: false,
        }).as("lastResponse");
      });
    });
  });
});

Then("a resposta deve indicar sucesso na inclusão dos livros", () => {
  cy.get("@lastResponse").then((response) => {
    expect(response.status).to.equal(201);
    expect(response.body.books).to.be.an("array").with.length(2);
  });
});

When("consulto os dados do usuário", () => {
  cy.get("@createdUser").then((user) => {
    cy.get("@accessToken").then((token) => {
      cy.request({
        method: "GET",
        url: `/Account/v1/User/${user.userID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
      }).as("lastResponse");
    });
  });
});

Then("os dados do usuário devem conter os dois livros selecionados", () => {
  cy.get("@lastResponse").then(({ body }) => {
    expect(body.userId).to.be.a("string").and.not.be.empty;
    expect(body.username).to.be.a("string").and.not.be.empty;
    expect(body.books).to.be.an("array").with.length(2);

    cy.get("@createdUser").then((createdUser) => {
      expect(body.userId).to.equal(createdUser.userID);
      expect(body.username).to.equal(createdUser.username);
    });

    const userIsbns = body.books.map(({ isbn }) => isbn);

    cy.get("@selectedBooks").then((books) => {
      books.forEach(({ isbn }) => {
        expect(userIsbns).to.include(isbn);
      });
    });

    body.books.forEach((book) => {
      expect(book.isbn).to.be.a("string").and.not.be.empty;
      expect(book.title).to.be.a("string").and.not.be.empty;
      expect(book.subTitle).to.be.a("string");
      expect(book.author).to.be.a("string").and.not.be.empty;
      expect(book.publisher).to.be.a("string").and.not.be.empty;
      expect(book.publish_date).to.be.a("string").and.not.be.empty;
      expect(Date.parse(book.publish_date)).not.to.be.NaN;
      expect(book.pages).to.be.a("number").and.greaterThan(0);
      expect(book.description).to.be.a("string");
      expect(book.website).to.be.a("string");
    });
  });
});