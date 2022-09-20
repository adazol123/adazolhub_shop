import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "../../features/user/user-auth.slice";
import productsReducer from "../../features/shop/product-slice";
import toggleReducer from "../../features/toggle/toggle.slice";
export const store = configureStore({
  reducer: {
    auth: authUserReducer,
    shop: productsReducer,
    toggle: toggleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
