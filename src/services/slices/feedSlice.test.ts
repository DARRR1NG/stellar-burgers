import { getFeedOrders, getOrders, feedSlice, feedState, IFeed } from './feedSlice';

const initialState: IFeed = {
  orders: [],
  total: 0,
  today: 0,
  isLoading: false,
  errors: undefined
};

const testData = {
  success: true,
  orders: [
    {
      _id: '699c4b10a69876001bhgy0de',
      ingredients: [
        '643d69a5c35656781cfa093d',
        '643d69a5c3f7bfdf1cfa093e',
        '643d69a5c3f7b90gvgfa0946',
        '643d69a5c3fbvhg01cfa093d'
      ],
      owner: '699b3fc8a788001b32cf5f',
      status: 'done',
      name: 'Бургер',
      createdAt: '2025-01-23T12:41:40.437Z',
      updatedAt: '2025-01-23T12:41:40.117Z',
      number: 345456
    }
  ],
  total: 11,
  totalToday: 1
};

describe('Тест ленты заказов', () => {
  test('Тест редьюсера на получение данных ленты заказов', () => {
    const state = feedSlice.reducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: testData
    });
    expect(state.orders).toEqual(testData.orders);
    expect(state.total).toEqual(testData.total);
    expect(state.today).toEqual(testData.totalToday);
  });

  test('Тест feedState', () => {
    const state = { FeedSlice: initialState }
    const result = feedState(state);
    expect(result).toEqual(initialState);
  });

  test('Тест getFeedOrders', () => {
    const state = { FeedSlice: initialState };
    const result = getFeedOrders(state);
    expect(result).toEqual(initialState.orders);
  });
});