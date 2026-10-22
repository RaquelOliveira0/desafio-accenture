class WebTablesPage {
  visitHome() {
    cy.visit("/", { waitUntil: "domcontentloaded" });
  }

  openWebTables() {
    cy.contains(".card", "Elements").click();
    cy.contains(".element-group", "Elements").contains("Web Tables").click();
    cy.get("#addNewRecordButton").should("be.visible");
    cy.get("select").select("20");
  }

  createRecords(records) {
    records.forEach((record) => this.createRecord(record));
  }

  createRecord(record) {
    cy.get("#addNewRecordButton").click();
    this.fillForm(record);
    cy.get("#submit").click({ force: true });
    this.rowForEmail(record.email).should("be.visible");
  }

  editRecord(email, updatedRecord) {
    this.rowForEmail(email).within(() =>
      cy.get('[title="Edit"]').click({ force: true })
    );
    this.fillForm(updatedRecord);
    cy.get("#submit").click({ force: true });
    this.rowForEmail(email).should("contain", updatedRecord.firstName);
  }

  deleteRecords(records) {
    records.forEach((record) => {
      cy.get("tbody tr").then(($rows) => {
        const row = [...$rows].find((candidate) =>
          candidate.textContent.replace(/\s/g, "").includes(record.email)
        );

        if (row) {
          cy.wrap(row).find('[title="Delete"]').click({ force: true });
        }
      });
      cy.get("tbody tr").should(($rows) => {
        const emailIsPresent = [...$rows].some((row) =>
          row.textContent.replace(/\s/g, "").includes(record.email)
        );
        expect(emailIsPresent).to.equal(false);
      });
    });
  }

  deleteRecord(email) {
    this.rowForEmail(email).should("have.length", 1).within(() =>
      cy.get('[title="Delete"]').click({ force: true })
    );
    cy.get("tbody tr").should(($rows) => {
      const emails = [...$rows].map((row) => row.textContent.replace(/\s/g, ""));
      expect(emails.some((rowText) => rowText.includes(email))).to.equal(false);
    });
  }

  rowForEmail(email) {
    return cy
      .get("tbody tr")
      .filter((_, row) => row.textContent.replace(/\s/g, "").includes(email));
  }

  fillForm(record) {
    cy.get("#firstName").clear().type(record.firstName);
    cy.get("#lastName").clear().type(record.lastName);
    cy.get("#userEmail").clear().type(record.email);
    cy.get("#age").clear().type(record.age);
    cy.get("#salary").clear().type(record.salary);
    cy.get("#department").clear().type(record.department);
  }
}

export default WebTablesPage;