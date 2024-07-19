import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import recipesReducer from "./recipesSlice";
import productsReducer from "./productsSlice";
import { notificationMiddleware } from "./myMiddleware";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    login: loginReducer,
    recipes: recipesReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notificationMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
