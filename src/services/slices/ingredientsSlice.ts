import { TIngredient } from '../../utils/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export interface IIngredientsFull {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IIngredientsFull = {
  ingredients: [],
  isLoading: false,
  error: undefined
};

export const getIng = createAsyncThunk('ingredients/getIng', async () => {
  const data = await getIngredientsApi();
  return data;
});

const ingredientsSlice = createSlice({
  name: 'Ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIng.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getIng.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getIng.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients
  }
});

export const { getIngredients } = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
