import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem: CartItem = {
          ...action.payload,
          quantity: 1
        };
        state.items.push(newItem);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
  },
});

export const { addToCart, removeFromCart,deleteFromCart} = cartSlice.actions;
export default cartSlice.reducer;
