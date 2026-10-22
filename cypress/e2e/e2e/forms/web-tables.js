import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import WebTablesPage from "../../../support/pages/web-tables.page";
import { createWebTableRecord } from "../../../support/factories/web-tables.factory";

const webTablesPage = new WebTablesPage();

Given("que acesso a página inicial do DemoQA", () => {
  webTablesPage.visitHome();
});

When("acesso Elements e abro Web Tables", () => {
  webTablesPage.openWebTables();
});

When("crio um novo registro na tabela", () => {
  const record = createWebTableRecord();
  cy.wrap(record).as("createdWebTableRecord");
  webTablesPage.createRecord(record);
});

When("edito o registro recém-criado", () => {
  cy.get("@createdWebTableRecord").then((record) => {
    const editedRecord = { ...record, firstName: `Editado${record.firstName}` };
    cy.wrap(editedRecord).as("createdWebTableRecord");
    webTablesPage.editRecord(record.email, editedRecord);
  });
});

Then("os dados editados devem ser exibidos na tabela", () => {
  cy.get("@createdWebTableRecord").then((record) => {
    webTablesPage.rowForEmail(record.email).should("contain", record.firstName);
  });
});

When("excluo o registro recém-criado", () => {
  cy.get("@createdWebTableRecord").then((record) => {
    webTablesPage.deleteRecord(record.email);
  });
});

Then("o registro recém-criado não deve estar na tabela", () => {
  cy.get("@createdWebTableRecord").then((record) => {
    cy.get("tbody").should("not.contain", record.email);
  });
});

When("crio 12 registros dinamicamente", () => {
  const records = Array.from({ length: 12 }, createWebTableRecord);
  cy.wrap(records).as("createdWebTableRecords");
  webTablesPage.createRecords(records);
});

Then("os 12 novos registros devem estar na tabela", () => {
  cy.get("@createdWebTableRecords").each((record) => {
    webTablesPage.rowForEmail(record.email).should("be.visible");
  });
});

When("excluo todos os registros criados neste cenário", () => {
  cy.get("@createdWebTableRecords").then((records) => {
    webTablesPage.deleteRecords(records);
  });
});

Then("nenhum dos registros criados deve permanecer na tabela", () => {
  cy.get("@createdWebTableRecords").each((record) => {
    cy.get("tbody tr").should(($rows) => {
      const emails = [...$rows].map((row) => row.textContent.replace(/\s/g, ""));
      expect(emails.some((rowText) => rowText.includes(record.email))).to.equal(false);
    });
  });
});