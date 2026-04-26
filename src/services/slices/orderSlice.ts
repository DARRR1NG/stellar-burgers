import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';

export interface IOrder {
  order: TOrder | null;
  numberOrder: number | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IOrder = {
  order: null,
  numberOrder: null,
  isLoading: false,
  error: undefined
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data;
  }
);

export const getNumberOrder = createAsyncThunk(
  'order/getNumber',
  async (numberOrder: number) => {
    const data = await getOrderByNumberApi(numberOrder);
    return data.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.numberOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.numberOrder = action.payload.order.number;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getNumberOrder.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getNumberOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(getNumberOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getOrder: (state) => state
  }
});

export const { clearOrder } = orderSlice.actions;
export const { getOrder } = orderSlice.selectors;
export default orderSlice.reducer;
