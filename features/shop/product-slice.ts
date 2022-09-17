import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";
import { docQuery } from "../../app/auth/firebase";
import type { RootState } from "../../app/redux/store";
import type { ProductItemProps, ShopProps } from "../../utils/type/types";

const initialState: ShopProps = {
  products: [],
  status: "idle",
  error: undefined,
};

export const getProducts = createAsyncThunk("product/get", async () => {
  let products = await getDocs(docQuery(10));
  return products.docs.map((item) => item.data());
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload as ProductItemProps[];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

export const selectAppProducts = (state: RootState) => state.shop.products;
