import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../features/counter/counterSlice";
import { cartSlice } from "../features/cart/cartSlice";
import { authSlice } from "../features/auth/authSlice";
import { baseApi } from "../services/baseApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
      cart: cartSlice.reducer,
      auth: authSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware)
  });
};