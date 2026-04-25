import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export interface IConstructorBurger {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  totalPrice: number;
}

const initialState: IConstructorBurger = {
  bun: null,
  ingredients: [],
  totalPrice: 0
};

const countTotalPrice = (
  bun: TConstructorIngredient | null,
  ingredients: TConstructorIngredient[]
) => {
  const sumPriceBuns = bun ? bun.price * 2 : 0;
  const sumIngredients = ingredients.reduce((acc, val) => acc + val.price, 0);
  return sumIngredients + sumPriceBuns;
};

export const burgerConstructorSlice = createSlice({
  name: 'BurgerConstructor',
  initialState,
  reducers: {
    addIng: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
        state.totalPrice = countTotalPrice(state.bun, state.ingredients);
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIng: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
      state.totalPrice = countTotalPrice(state.bun, state.ingredients);
    },
    changeIng: (
      state,
      action: PayloadAction<{ before: number; after: number }>
    ) => {
      const ing = [...state.ingredients];
      const { before, after } = action.payload;
      const [moveIngredient] = ing.splice(before, 1);
      ing.splice(after, 0, moveIngredient);
      state.ingredients = ing;
    },
    clearConstructor: () => initialState
  }
});

export const { addIng, deleteIng, changeIng, clearConstructor } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
