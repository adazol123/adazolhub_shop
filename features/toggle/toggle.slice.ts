import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ToggleType } from "../../utils/type/types";

const initialState: {
  toggle: ToggleType;
} = {
  toggle: {
    mobile: false,
  },
};

const toggleSlice = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    toggleState: (state, action: PayloadAction<keyof ToggleType>) => {
      state.toggle[action.payload] = !state.toggle[action.payload];
    },
  },
});

export const { toggleState } = toggleSlice.actions;

export default toggleSlice.reducer;
