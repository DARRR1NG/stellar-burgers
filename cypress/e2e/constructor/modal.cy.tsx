describe('Модалки', () => {
    beforeEach(() => {
        cy.intercept("GET", `api/ingredients`, {
            fixture: "ingredients.json",
        });
        cy.visit('/');
    });
    it('Открытие модального окна ингредиента', () => {
        cy.get('[data-cy=ingredient-other]').first().click();
        cy.get("[data-cy=modal-info]").should("be.visible").within(() => {
            cy.contains("Подробности ингредиента").should("exist");
            cy.contains("Биокотлета из марсианской Магнолии").should("exist");
            cy.contains("420").should("exist");
        });
    });
    it('Закрытие по клику на крестик', () => {
        cy.get("[data-cy=ingredient-other]").first().click();
        cy.get("[data-cy=modal-info]").should("be.visible");
        cy.get("[data-cy=close]").click();
        cy.get("[data-cy=modal-info]").should("not.exist");
    });
    it('Закрытие по клику на оверлей', () => {
        cy.get("[data-cy=ingredient-other]").first().click();
        cy.get("[data-cy=modal-info]").should("be.visible");
        cy.get("[data-cy=overlay]").click({ force: true });
        cy.get("[data-cy=modal-info]").should("not.exist");
    });
});