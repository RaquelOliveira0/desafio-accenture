import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import SortablePage from "../../../support/pages/sortable.page";

const sortablePage = new SortablePage();

Given("que acesso a página inicial do DemoQA", () => {
  sortablePage.visitHome();
});

When("acesso Interactions e abro Sortable", () => {
  sortablePage.openSortable();
});

When("organizo os elementos na ordem inversa usando drag and drop", () => {
  sortablePage.sortInReverseOrder();
});

Then("os elementos devem estar na ordem inversa", () => {
  sortablePage.items().should("deep.equal", [
    "Six",
    "Five",
    "Four",
    "Three",
    "Two",
    "One",
  ]);
});