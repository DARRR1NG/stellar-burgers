import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

export interface IOrder {
  order: TOrder[] | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IOrder = {
  order: null,
  isLoading: false,
  error: undefined
};

const personalOrder = createAsyncThunk('order/personal', async () => {
  const data = await getOrdersApi();
  return data;
});

const personalOrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(personalOrder.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(personalOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(personalOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getPersonalOrder: (state) => {
      state.order;
    }
  }
});

export const { getPersonalOrder } = personalOrderSlice.selectors;
export default personalOrderSlice.reducer;
