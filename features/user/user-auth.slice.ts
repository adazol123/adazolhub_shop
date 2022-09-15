import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../app/auth/firebase";
import type { RootState } from "../../app/redux/store";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { UserProps, UserType } from "../../utils/type/types";

let initialState: UserProps = {
  user: null,
  status: "idle",
  error: undefined,
};
export const fetchAuthUser = createAsyncThunk("auth/fetch_user", async () => {
  return new Promise<UserType>((resolve, rejected) => {
    console.log("authenticating...");
    let unsubscribe = onAuthStateChanged(auth, (currentAuth) => {
      console.log(currentAuth);
      if (currentAuth) {
        let { displayName, email, emailVerified, phoneNumber, photoURL, uid } =
          currentAuth;

        resolve({
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
        });

        unsubscribe();
      } else {
        rejected();
        unsubscribe();
      }
    });
  });
});

const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = userAuthSlice.actions;
export const selectCurrentAuth = (state: RootState) => state.auth.user;
export default userAuthSlice.reducer;
