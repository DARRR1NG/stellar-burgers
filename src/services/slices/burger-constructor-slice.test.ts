import {
  addIng,
  deleteIng,
  changeIng,
  clearConstructor,
  burgerConstructorSlice
} from './burger-constructor-slice';
import { TIngredient } from '@utils-types';

const testBun: TIngredient = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
};

const testIngredient: TIngredient = {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
};

const testSauce: TIngredient = {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
}

describe("Конструктор бургера", () => {
    test('Тест на добавление булки', () => {
        const initialState = {
            bun: null,
            ingredients: [],
            totalPrice: 0
        };

        const reducer = addIng(testBun);
        const state = burgerConstructorSlice.reducer(initialState, reducer);

        expect(state.bun?._id).toBe(testBun._id);
        expect(state.bun?.name).toBe(testBun.name);
    });

    test('Тест на добавление начинки в конструктор', () => {
        const initialState = {
            bun: null,
            ingredients: [],
            totalPrice: 0
        };

        const reducer = addIng(testIngredient);
        const state = burgerConstructorSlice.reducer(initialState, reducer);

        expect(state.ingredients.length).toBe(1);
        expect(state.ingredients).toMatchObject([testIngredient]);
    });

    test('Тест на перемещение ингредиентов', () => {
        const initialState = {
            bun: null,
            ingredients: [
                { ...testIngredient, id: '1' },
                { ...testSauce, id: '2' }
            ],
            totalPrice: 0
        };

        const action = changeIng({ before: 1, after: 0 });
        const state = burgerConstructorSlice.reducer(initialState, action);

        expect(state.ingredients[0]._id).toBe(testSauce._id);
        expect(state.ingredients[1]._id).toBe(testIngredient._id);
    });

    test('Тест на удаление ингредиента из конструктора', () => {
        const initialState = {
            bun: null,
            ingredients: [
                { ...testIngredient, id: '1' },
                { ...testSauce, id: '2' }
            ],
            totalPrice: 0
        };

        const action = deleteIng('1');
        const state = burgerConstructorSlice.reducer(initialState, action);

        expect(state.ingredients.length).toBe(1);
        expect(state.ingredients[0]._id).toBe(testSauce._id);
    });

    test('Тест на очистку конструктора', () => {
        const initialState = {
            bun: null,
            ingredients: [
                { ...testIngredient, id: '1' },
                { ...testSauce, id: '2' }
            ],
            totalPrice: 0
        };

        const action = clearConstructor();
        const state = burgerConstructorSlice.reducer(initialState, action);

        expect(state.bun).toBeNull();
        expect(state.ingredients.length).toBe(0);
        expect(state.totalPrice).toBe(0);
    })

});