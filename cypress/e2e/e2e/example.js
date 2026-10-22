import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the Cypress example application", () => {
  cy.visit("https://example.cypress.io");
});

Then("the page title contains {string}", (expectedText) => {
  cy.title().should("include", expectedText);
});