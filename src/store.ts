import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/loginSlice";
import recipesReducer from "./Slices/recipesSlice";
import productsReducer from "./Slices/productsSlice";
import { notificationMiddleware } from "./myMiddleware";
import { useDispatch } from "react-redux";
import cartReducer from "./Slices/cartSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    recipes: recipesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notificationMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
