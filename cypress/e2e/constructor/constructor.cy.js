describe('Создание заказа', () => {

    before(() => {
        cy.visit('http://localhost:3000');
    })

    it('Перетаскивание булки', () => {
        cy.viewport(1920, 1080)
        cy.get('[data-cy-test="ingredient"]').first().contains('булка').trigger('dragstart');
        cy.get('[data-cy-test="ingredient-in-constructor"]').trigger('drop')
    });

    it('Перетаскивание ингредиента', () => {
        cy.viewport(1920, 1080)
        cy.get('[data-cy-test="ingredient"]').contains('Соус').trigger('dragstart');
        cy.get('[data-cy-test="ingredient-in-constructor"]').trigger('drop')

        cy.get('[data-cy-test="ingredient"]').contains('Филе').trigger('dragstart');
        cy.get('[data-cy-test="ingredient-in-constructor"]').trigger('drop');

        cy.get('[data-cy-test="ingredient"]').contains('Биокотлета').trigger('dragstart');
        cy.get('[data-cy-test="ingredient-in-constructor"]').trigger('drop')
    });

    it('Создание заказа', () => {
        cy.viewport(1920, 1080)
        cy.get('[data-cy-test="ingredient"]').contains('Соус').trigger('dragstart');
        cy.get('[data-cy-test="ingredient-in-constructor"]').trigger('drop');

        cy.get('button').contains('Оформить заказ').click();
    });

    it('Авторизация', () => {
        cy.viewport(1920, 1080)
        cy.get('[name="email"]').focus().type('ogurcov.artem2012@list.ru');
        cy.get('[name="password"]').focus().type('1212');
        cy.get('button').contains('Войти').click();
        cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login");
    });

    it('Модальные окна открываются', () => {
        cy.viewport(1920, 1080)
        cy.contains('Оформить заказ').click();
        cy.get("[class^=ModalOverlay_overlay__]");
    });

    it('Модальные окна закрываются', () => {
        cy.viewport(1920, 1080)
        cy.get("[class^=Modal_close__]").click();
    });
});