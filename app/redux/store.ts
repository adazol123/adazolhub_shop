import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "../../features/user/user-auth.slice";
import productsReducer from "../../features/shop/product-slice";
import toggleReducer from "../../features/toggle/toggle.slice";
import cartReducer from "../../features/cart/cart.slice";
export const store = configureStore({
  reducer: {
    auth: authUserReducer,
    shop: productsReducer,
    toggle: toggleReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
