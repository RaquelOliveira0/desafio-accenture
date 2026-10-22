class ProgressBarPage {
  visitHome() {
    cy.visit("/", { waitUntil: "domcontentloaded" });
  }

  openProgressBar() {
    cy.contains(".card", "Widgets").click();
    cy.contains(".element-group", "Widgets").contains("Progress Bar").click();
    this.progressValue().should("have.attr", "aria-valuenow", "0");
  }

  progressValue(options = {}) {
    return cy.get('[role="progressbar"]', options);
  }

  start() {
    cy.contains("button", "Start").click();
  }

  stopBeforeTwentyFivePercent() {
    this.progressValue().should(($progress) => {
      expect(Number($progress.attr("aria-valuenow"))).to.be.greaterThan(0);
    });
    cy.contains("button", "Stop").click();
  }

  waitUntilComplete() {
    this.progressValue({ timeout: 15000 }).should(
      "have.attr",
      "aria-valuenow",
      "100"
    );
    cy.contains("button", "Reset").should("be.visible");
  }

  reset() {
    cy.get("#resetButton")
      .should("be.visible")
      .scrollIntoView()
      .click({ force: true });
    this.progressValue({ timeout: 10000 }).should(($progress) => {
      expect(Number($progress.attr("aria-valuenow"))).to.equal(0);
    });
    cy.get("#startStopButton").should("have.text", "Start");
  }
}

export default ProgressBarPage;