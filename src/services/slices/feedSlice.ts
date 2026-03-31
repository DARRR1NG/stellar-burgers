import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IFeed {
  orders: TOrder[];
  total: number;
  today: number;
  isLoading: boolean;
  errors: string | undefined;
}

const initialState: IFeed = {
  orders: [],
  total: 0,
  today: 0,
  isLoading: false,
  errors: undefined
};

export const getOrders = createAsyncThunk('feed/orders', async () => {
  const data = await getFeedsApi();
  return data;
});

const feedSlice = createSlice({
  name: 'FeedSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.errors = undefined;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.today = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders
  }
});

export const { getFeedOrders } = feedSlice.selectors;
export default feedSlice.reducer;
