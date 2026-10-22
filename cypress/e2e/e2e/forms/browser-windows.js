import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import BrowserWindowsPage from "../../../support/pages/browser-windows.page";

const browserWindowsPage = new BrowserWindowsPage();

Given("que acesso a página inicial do DemoQA", () => {
  browserWindowsPage.visitHome();
});

When("acesso Alerts, Frame & Windows e abro Browser Windows", () => {
  browserWindowsPage.openBrowserWindows();
});

When("solicito a abertura da nova janela", () => {
  browserWindowsPage.stubWindowOpen();
  browserWindowsPage.clickNewWindow();
});

Then("uma nova janela deve ser solicitada", () => {
  browserWindowsPage.windowOpenStub().should("have.been.called");
});

When("acesso o conteúdo da nova janela", () => {
  browserWindowsPage.visitOpenedWindow();
});

Then("a mensagem {string} deve ser exibida", (message) => {
  browserWindowsPage.samplePageMessage().should("have.text", message);
});

When("fecho a nova janela", () => {
  browserWindowsPage.returnToBrowserWindows();
});