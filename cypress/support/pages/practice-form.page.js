const genderSelectors = {
  Male: "#gender-radio-1",
  Female: "#gender-radio-2",
  Other: "#gender-radio-3",
};

const hobbySelectors = {
  Sports: "#hobbies-checkbox-1",
  Reading: "#hobbies-checkbox-2",
  Music: "#hobbies-checkbox-3",
};

class PracticeFormPage {
  visitHome() {
    cy.visit("/", { waitUntil: "domcontentloaded" });
  }

  openPracticeForm() {
    cy.contains(".card", "Forms").click();
    cy.contains(".element-group", "Forms").contains("Practice Form").click();
    cy.get("#firstName").should("be.visible");
  }

  fill(formData) {
    cy.get("#firstName").type(formData.firstName);
    cy.get("#lastName").type(formData.lastName);
    cy.get("#userEmail").type(formData.email);
    cy.get(genderSelectors[formData.gender]).check({ force: true });
    cy.get("#userNumber").type(formData.mobile);
    this.fillBirthDate(formData.birthDate);
    this.fillSubject(formData.subject);
    cy.get(hobbySelectors[formData.hobby]).check({ force: true });
    cy.get("#uploadPicture").selectFile(formData.picture);
    cy.get("#currentAddress").type(formData.address);
    this.selectLocation(formData.state, formData.city);
  }

  fillBirthDate(date) {
    const dayClass = String(date.getDate()).padStart(3, "0");

    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__month-select").select(date.getMonth());
    cy.get(".react-datepicker__year-select").select(String(date.getFullYear()));
    cy.get(`.react-datepicker__day--${dayClass}`)
      .not(".react-datepicker__day--outside-month")
      .click();
  }

  fillSubject(subject) {
    cy.get("#subjectsInput").type(subject);
    cy.contains(".subjects-auto-complete__option", subject).click();
  }

  selectLocation(state, city) {
    cy.get("#state").find("input").type(`${state}{enter}`);
    cy.get("#city").find("input").should("not.be.disabled");
    cy.get("#city").find("input").type(`${city}{enter}`);
  }

  submit() {
    cy.get("#submit").scrollIntoView().click({ force: true });
  }

  confirmationModal() {
    return cy.get("#example-modal-sizes-title-lg");
  }

  closeConfirmationModal() {
    cy.get("#closeLargeModal").should("be.visible").click({ force: true });
    cy.get("body").type("{esc}");
  }
}

export default PracticeFormPage;