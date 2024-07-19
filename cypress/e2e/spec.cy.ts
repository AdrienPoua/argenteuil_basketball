const homePage = Cypress.env("NEXTAUTH_URL");
import headerData from "../../src/data/header.json";

const headerUrl = headerData.map((item) => {
  if (item.url) {
    return item.url;
  } else if (item.subItems) {
    return item.subItems.map((subItem) => subItem.url);
  }
});

describe("Check all links", () => {
  headerUrl.forEach((url) => {
    it(`Check ${url}`, () => {
      cy.visit(`${homePage}${url}`);
      cy.get("h1").should("exist");
    });
  });
});
