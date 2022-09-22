import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, docQuery } from "../../app/auth/firebase";
import type { RootState } from "../../app/redux/store";
import type { ProductItemProps, ShopProps } from "../../utils/type/types";

const initialState: ShopProps = {
  products: [],
  status: "idle",
  error: undefined,
};

export const getProducts = createAsyncThunk("get/product", async () => {
  let products = await getDocs(docQuery(10));
  return products.docs.map((item) => item.data());
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductItemProps>) => {
      let duplicates = state.products.filter(
        (product) => product.product_id === action.payload.product_id
      );

      if (!duplicates) {
        let uid = crypto.randomUUID();
        const productRef = doc(db, "products", uid);
        setDoc(productRef, action.payload, { merge: true })
          .then((_) => {
            console.log("success!");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("product item is duplicated");
      }
    },
  },

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
