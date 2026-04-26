import {
  ingredientsState,
  getIng,
  getIngredients,
  ingredientsSlice
} from './ingredientsSlice';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: undefined
};


const testData = {
  success: true,
  data: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Булка',
      type: 'bun',
      proteins: 20,
      fat: 10,
      carbohydrates: 45,
      calories: 0,
      price: 120,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5764526301cfa0941',
      name: 'Котлета',
      type: 'main',
      proteins: 10,
      fat: 152,
      carbohydrates: 243,
      calories: 4232,
      price: 421,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ]
};

describe('Тест ингредиентов', () => {
  it('Тест редьюсера на получение данных ингредиентов в процессе загрузки', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIng.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  it('Тест на получение данных ингредиентов при успешной загрузке', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIng.fulfilled.type,
      payload: testData.data
    });
    expect(state.ingredients).toEqual(testData.data);
    expect(state.isLoading).toBe(false);
  });

  it('Тест на получение данных ингредиентов при ошибке', () => {
    const action = {
      type: getIng.rejected.type,
      error: { message: 'Ошибка при загрузке списка ингредиентов, попробуйте снова.' }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(action.error.message);
  });

  it('Тест ingredientsState', () => {
    const state = { Ingredients: initialState };
    const result = ingredientsState(state);
    expect(result).toEqual(initialState);
  });

  it('Тест getIngredients', () => {
    const state = { Ingredients: initialState };
    const result = getIngredients(state);
    expect(result).toEqual(initialState.ingredients);
  });
});