import { faker } from "@faker-js/faker";

const locations = [
  { state: "NCR", city: "Delhi" },
  { state: "Uttar Pradesh", city: "Agra" },
  { state: "Haryana", city: "Karnal" },
];

const subjects = ["Maths", "Physics", "Chemistry", "Biology", "English"];
const genders = ["Male", "Female", "Other"];
const hobbies = ["Sports", "Reading", "Music"];

export const createPracticeFormData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  gender: faker.helpers.arrayElement(genders),
  mobile: `${faker.helpers.arrayElement(["6", "7", "8", "9"])}${faker.string.numeric(9)}`,
  birthDate: faker.date.birthdate({ min: 18, max: 45, mode: "age" }),
  subject: faker.helpers.arrayElement(subjects),
  hobby: faker.helpers.arrayElement(hobbies),
  picture: "cypress/fixtures/upload.txt",
  address: faker.location.streetAddress(),
  ...faker.helpers.arrayElement(locations),
});