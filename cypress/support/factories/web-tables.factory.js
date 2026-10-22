import { faker } from "@faker-js/faker";

export const createWebTableRecord = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: `web-tables-${faker.string.uuid()}@example.com`,
  age: String(faker.number.int({ min: 18, max: 65 })),
  salary: String(faker.number.int({ min: 30000, max: 150000 })),
  department: faker.commerce.department(),
});