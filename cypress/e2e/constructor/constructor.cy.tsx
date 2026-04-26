describe('Конструктор бургера', () => {
    beforeEach(() => {
        cy.intercept("GET", `api/ingredients`, {
            fixture: "ingredients.json",
        });
        cy.intercept('GET', `api/orders/all`, {
            fixture: 'order.json',
        });
        cy.visit('/');
    });
    it('Добавление ингредиента из списка ингредиентов в конструктор', () => {
        cy.get("[data-cy=bun]").first().find("button").contains("Добавить").click();
        cy.get("[data-cy=bun-top]").should("exist");
        cy.get("[data-cy=bun-bottom]").should("exist");
        cy.get("[data-cy=ingredient-other]").each(($element) => {
            cy.wrap($element).find("button").contains("Добавить").click();
        });
        cy.get("[data-cy=ingredient]").should("have.length", 3);
    });
});