describe('Создание заказа', () => {
    beforeEach(() => {
        cy.intercept("GET", `api/ingredients`, {
            fixture: "ingredients.json",
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

    it("Тест оформления заказа после авторизации", () => {
        cy.intercept('GET', `api/auth/user`, { fixture: 'login.json' }).as('getUser');
        cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as('postOrder');

        cy.setCookie('accessToken', 'Bearer access-token-test');
        localStorage.setItem('refreshToken', 'refresh-token-test');
        cy.reload();

        cy.wait('@getUser');

        cy.get("[data-cy=bun]").first().find("button").contains("Добавить").click();
        cy.get("[data-cy=ingredient-other]").first().find("button").contains("Добавить").click();

        cy.get("button").contains("Оформить заказ").click();
        cy.wait('@postOrder');

        cy.get("[data-cy=modal-info]").should("exist");
        cy.get("[data-cy=modal-info]").find("h2").contains("1").should("exist");

        cy.get("[data-cy=modal-info]").find("[data-cy=close]").click();
        cy.get("[data-cy=modal-info]").should("not.exist");

        cy.get("[data-cy=bun-top]").should("not.exist");
        cy.get("[data-cy=bun-bottom]").should("not.exist");
        cy.get("[data-cy=ingredient]").should("have.length", 0);

        cy.clearCookies();
        cy.clearLocalStorage();
    });
})