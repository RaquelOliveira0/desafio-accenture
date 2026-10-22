class BrowserWindowsPage {
  visitHome() {
    cy.visit("/", { waitUntil: "domcontentloaded" });
  }

  openBrowserWindows() {
    cy.contains(".card", "Alerts, Frame & Windows").click();
    cy.contains(".element-group", "Alerts, Frame & Windows")
      .contains("Browser Windows")
      .click();
    cy.contains("button", "New Window").should("be.visible");
  }

  stubWindowOpen() {
    cy.window().then((window) => {
      cy.stub(window, "open").as("windowOpen");
    });
  }

  clickNewWindow() {
    cy.contains("button", "New Window").click();
  }

  windowOpenStub() {
    return cy.get("@windowOpen");
  }

  visitOpenedWindow() {
    this.windowOpenStub().then((windowOpen) => {
      const requestedUrl = windowOpen.firstCall.args[0];
      const destination = new URL(requestedUrl, Cypress.config("baseUrl")).toString();

      cy.visit(destination, { waitUntil: "domcontentloaded" });
    });
  }

  samplePageMessage() {
    return cy.get("#sampleHeading");
  }

  returnToBrowserWindows() {
    cy.go("back");
    cy.contains("button", "New Window").should("be.visible");
  }
}

export default BrowserWindowsPage;