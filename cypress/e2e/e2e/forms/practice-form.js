import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import PracticeFormPage from "../../../support/pages/practice-form.page";
import { createPracticeFormData } from "../../../support/factories/practice-form.factory";

const practiceFormPage = new PracticeFormPage();

Given("que acesso a página inicial do DemoQA", () => {
  cy.on("uncaught:exception", (error) => {
    if (error.message.includes("findDOMNode is not a function")) {
      return false;
    }
  });

  practiceFormPage.visitHome();
});

When("acesso Forms e abro Practice Form", () => {
  practiceFormPage.openPracticeForm();
});

When("preencho todos os campos com dados aleatórios", () => {
  const formData = createPracticeFormData();
  cy.wrap(formData).as("formData");
  practiceFormPage.fill(formData);
});

When("envio o formulário", () => {
  practiceFormPage.submit();
});

Then("o popup de confirmação deve ser exibido", () => {
  practiceFormPage.confirmationModal().should("be.visible");
  cy.contains("Thanks for submitting the form").should("be.visible");
});

When("fecho o popup de confirmação", () => {
  practiceFormPage.closeConfirmationModal();
});

Then("o popup de confirmação não deve estar visível", () => {
  practiceFormPage.confirmationModal().should("not.exist");
});