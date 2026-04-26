import { rootReducer, default as store } from './store';
import userReducer from './slices/userSlice';
import burgerReducer from './slices/burger-constructor-slice';
import ingredientReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
import personalOrderReducer from './slices/personalOrderSlice';
import feedOrderReducer from './slices/feedSlice';

describe('Тест rootReducer', () => {
  test('rootReducer должен возвращать корректное начальное состояние', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      user: userReducer(undefined, initAction),
      burgerConstructor: burgerReducer(undefined, initAction),
      ingredients: ingredientReducer(undefined, initAction),
      order: orderReducer(undefined, initAction),
      personalOrder: personalOrderReducer(undefined, initAction),
      feedOrder: feedOrderReducer(undefined, initAction)
    });
  });

  test('rootReducer должен возвращать тот же объект состояния для неизвестного экшена', () => {
    const prevState = store.getState();
    const state = rootReducer(prevState, { type: 'UNKNOWN_ACTION' });

    expect(state).toBe(prevState);
  });
});