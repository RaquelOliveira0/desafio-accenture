import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import ProgressBarPage from "../../../support/pages/progress-bar.page";

const progressBarPage = new ProgressBarPage();

Given("que acesso a página inicial do DemoQA", () => {
  progressBarPage.visitHome();
});

When("acesso Widgets e abro Progress Bar", () => {
  progressBarPage.openProgressBar();
});

When("inicio a barra de progresso", () => {
  progressBarPage.start();
});

When("paro a barra antes de 25%", () => {
  progressBarPage.stopBeforeTwentyFivePercent();
});

Then("o percentual da barra deve ser menor ou igual a 25%", () => {
  progressBarPage.progressValue().should(($progress) => {
    expect(Number($progress.attr("aria-valuenow"))).to.be.at.most(25);
  });
});

When("inicio novamente a barra e aguardo até 100%", () => {
  progressBarPage.start();
  progressBarPage.waitUntilComplete();
});

Then("o percentual da barra deve ser 100%", () => {
  progressBarPage.progressValue().should("have.attr", "aria-valuenow", "100");
});

When("reseto a barra de progresso", () => {
  progressBarPage.reset();
});

Then("o percentual da barra deve ser 0%", () => {
  progressBarPage.progressValue().should("have.attr", "aria-valuenow", "0");
});