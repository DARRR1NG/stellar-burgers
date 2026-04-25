import { rootReducer } from './store';

describe('Тест rootReducer', () => {
  it('Проверка rootReducer', () => {
    const reducers = rootReducer(undefined, { type: '' });
    expect(reducers).toHaveProperty('ingredients');
    expect(reducers).toHaveProperty('user');
    expect(reducers).toHaveProperty('feedOrder');
    expect(reducers).toHaveProperty('order');
    expect(reducers).toHaveProperty('burgerConstructor');
    expect(reducers).toHaveProperty('personalOrder');
  });
});