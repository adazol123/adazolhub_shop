import { createSlice, AsyncThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStatus, ProductItemProps } from "../../utils/type/types";

export interface CartItemProps {
  name: string;
  product_id: string;
  product: ProductItemProps;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

export interface CartProps {
  carts: CartItemProps[];
  total: number;
  status: keyof typeof AsyncStatus;
  error: string | undefined;
}

const initialState: CartProps = {
  carts: [],
  total: 0,
  status: "idle",
  error: undefined,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.carts = [];
    },

    addToCart: (state, action: PayloadAction<CartItemProps>) => {
      let duplicates = state.carts.find(
        (cart) => cart.product_id === action.payload.product_id
      );
      if (!duplicates) {
        state.carts.push(action.payload);
      } else {
        duplicates.quantity += action.payload.quantity;
      }
    },

    removeFromCart: (state, action) => {
      state.carts = state.carts.filter(
        (cart) => cart.product_id !== action.payload
      );
    },

    incrementQuantity: (state, action) => {
      let cart = state.carts.find((cart) => cart.product_id === action.payload);
      if (cart && cart.quantity <= 19) {
        cart.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      let cart = state.carts.find((cart) => cart.product_id === action.payload);
      if (cart) {
        if (cart.quantity > 1) {
          cart.quantity -= 1;
        }
      }
    },

    updatePrice: state => {
      let totalAmount = 0;
      let totalQuantity = 0;
      state.carts.forEach(item => {
        state.total += item.price * item.quantity
      })

      totalQuantity = state.carts.reduce( (acc, current) => acc + current.quantity, 0)

    }
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
