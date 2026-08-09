import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import cartSlice from "../features/cart/cartSlice";
import authSlice from "../features/auth/authSlice";
import { baseApi } from "../services/baseApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      cart: cartSlice,
      auth: authSlice,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware)
  });
};