import {
  getOrder,
  clearOrder,
  createOrder,
  getNumberOrder,
  orderSlice
} from './orderSlice';

const initialState = {
  order: null,
  numberOrder: null,
  isLoading: false,
  error: undefined
};

const testData = {
  success: true,
  order: {
    _id: '699c4b10a64177001b32d0de',
    ingredients: [
      '123123dfsdfsd234',
      '21312312sdfsdfsd',
      '123123sadasdasda',
      '123123sadasds233'
    ],
    owner: '2',
    status: 'done',
    name: 'Бургер',
    createdAt: '2025-01-213T22:11:11.117Z',
    updatedAt: '2025-01-21T22:11:11.117Z',
    number: 4
  }
};

describe('Тесты заказов', () => {
  it('Тест на создание нового заказа при загрузке', () => {
    const state = orderSlice.reducer(initialState, {
      type: createOrder.pending.type
    });
    expect(state.isLoading).toEqual(true);
    expect(state.error).toBe(undefined);
  });

  it('Тест на создание нового заказа при успешной загрузке', () => {
    const state = orderSlice.reducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: testData
    });
    expect(state.order).toEqual(testData.order);
    expect(state.isLoading).toEqual(false);
  });

  it('Тест на создание нового заказа при ошибке', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'При оформлении заказа произошла ошибка' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(action.error.message);
  });

  it('Тест запрос номера заказа при загрузке', () => {
    const state = orderSlice.reducer(initialState, {
      type: getNumberOrder.pending.type
    });
    expect(state.isLoading).toEqual(true);
    expect(state.error).toBe(undefined);
  });

  it('Тест запрос номера заказа при успешной загрузке', () => {
    const state = orderSlice.reducer(initialState, {
      type: getNumberOrder.fulfilled.type,
      payload: testData.order
    });
    expect(state.order).toEqual(testData.order);
    expect(state.isLoading).toEqual(false);
  });

  it('Тест на получение номера заказа при ошибке загрузки', () => {
    const action = {
      type: getNumberOrder.rejected.type,
      error: { message: 'Произошла ошибка! Попробуйте снова' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(action.error.message);
  });

  it('Тест для очистки данных заказа', () => {
    const before = {
      order: {
        _id: 'gjhjhg434324jkhkjh32',
        ingredients: [
          '1233nhjsdfh73783bhhjfdd3',
          '234414nbmdskjh34234342343',
          '2323123hjkhkjhkd213123213',
          '1232131mjhkjshd34313nkj12'
        ],
        owner: '1231nlkjdoljl21313',
        status: 'done',
        name: 'Бургер',
        createdAt: '2025-01-13T12:11:11.117Z',
        updatedAt: '2025-01-13T12:11:11.117Z',
        number: 1
      },
      numberOrder: 1,
      isLoading: false,
      error: undefined
    };
    const state = orderSlice.reducer(before, clearOrder());
    expect(state).toEqual(initialState);
  });
  it("Тест селектора getstateOrder", () => {
    const state = {
        Order: initialState
    };
    expect(getOrder(state)).toEqual(initialState);
  });
});