import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import burgerReducer from './slices/burger-constructor-slice';
import ingredientReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
import personalOrderReducer from './slices/personalOrderSlice';
import feedOrderReducer from './slices/feedSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  burgerConstructor: burgerReducer,
  ingredients: ingredientReducer,
  order: orderReducer,
  personalOrder: personalOrderReducer,
  feedOrder: feedOrderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
