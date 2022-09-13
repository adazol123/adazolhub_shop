import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from '../../features/user/user-auth.slice'
export const store = configureStore({
  reducer: {
    auth: authUserReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
