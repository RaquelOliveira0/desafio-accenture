class SortablePage {
  visitHome() {
    cy.visit("/", { waitUntil: "domcontentloaded" });
  }

  openSortable() {
    cy.contains(".card", "Interactions").click();
    cy.contains(".element-group", "Interactions").contains("Sortable").click();
    this.items().should("deep.equal", ["One", "Two", "Three", "Four", "Five", "Six"]);
  }

  sortInReverseOrder() {
    const originalOrder = ["One", "Two", "Three", "Four", "Five", "Six"];
    const itemsToMove = ["Two", "Three", "Four", "Five", "Six"];

    itemsToMove.forEach((item, index) => {
      this.dragBeforeFirstItem(item);
      this.items().should("deep.equal", [
        ...itemsToMove.slice(0, index + 1).reverse(),
        ...originalOrder.filter(
          (value) => !itemsToMove.slice(0, index + 1).includes(value)
        ),
      ]);
    });
  }

  dragBeforeFirstItem(item) {
    const itemSelector = ".vertical-list-container .list-group-item";

    cy.contains(itemSelector, item).then(($item) => {
      cy.get(itemSelector).first().then(($firstItem) => {
        const startRect = $item[0].getBoundingClientRect();
        const dropRect = $firstItem[0].getBoundingClientRect();
        const verticalOffset =
          dropRect.top + dropRect.height / 2 - (startRect.top + startRect.height / 2);

        cy.wrap($item).realMouseDown({ position: "center", scrollBehavior: false });
        cy.wrap($item).realMouseMove(0, verticalOffset, {
          position: "center",
          keepMouseDownButton: "left",
          scrollBehavior: false,
        });
        cy.wrap($firstItem).realMouseUp({ position: "center", scrollBehavior: false });
      });
    });
  }

  items() {
    return cy
      .get(".vertical-list-container .list-group-item")
      .then(($items) => [...$items].map((item) => item.textContent.trim()));
  }
}

export default SortablePage;