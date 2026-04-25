import { personalOrder, getPersonalOrder, personalOrderSlice } from './personalOrderSlice';

const initialState = {
  order: [],
  isLoading: false,
  error: undefined
};

const testData = {
  success: true,
  order: {
    _id: '699c4b10a64177001b32d0de',
    ingredients: [
      '123123sdfdsfsd341414343sd',
      '123123sdfdsfsd341414313sd',
      '123123sdfdsfsd331414343sd',
      '123123sdfdsfsd3414143431d'
    ],
    owner: '123123sdfdsfsd342414343sd',
    status: 'done',
    name: 'Бургер',
    createdAt: '2025-01-11T11:11:11.117Z',
    updatedAt: '2025-01-11T11:11:11.117Z',
    number: 2
  }
};

describe('Тест заказов пользователя', () => {
  it('Загрузка заказов pending', () => {
    const state = personalOrderSlice.reducer(initialState, {
      type: personalOrder.pending.type
    });
    expect(state.isLoading).toEqual(true);
    expect(state.error).toBe(undefined);
  });

  it('Загрузка заказов fulfilled', () => {
    const state = personalOrderSlice.reducer(initialState, {
      type: personalOrder.fulfilled.type,
      payload: testData
    });
    expect(state.order).toEqual(testData);
    expect(state.isLoading).toEqual(false);
  });

  it('Загрузка заказов rejected', () => {
    const action = {
      type: personalOrder.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = personalOrderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(action.error.message);
  });

  it('Тест getPersonalOrder', () => {
    const state = {
      Order: {
        order: [testData.order],
        isLoading: false,
        error: undefined
      }
    };
    const selectedOrders = getPersonalOrder(state);
    expect(selectedOrders).toEqual(state.Order.order);
  });
});