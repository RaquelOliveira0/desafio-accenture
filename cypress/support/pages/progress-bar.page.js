class ProgressBarPage {
  visitHome() {
    cy.visit("/");
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
  }

  reset() {
    cy.contains("button", "Reset").click();
    this.progressValue().should("have.attr", "aria-valuenow", "0");
  }
}

export default ProgressBarPage;