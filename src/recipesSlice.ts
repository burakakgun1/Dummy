import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "./axiosconfig";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
}

interface FetchRecipesResponse {
  recipes: Recipe[];
  status: number;
}

export interface RecipesState {
  recipes: Recipe[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  status: "idle",
  error: null,
};

interface FetchRecipesArgs {
  searchTerm?: string;
  sortOrder?: 'asc' | 'desc' | null;
}

export const fetchRecipes = createAsyncThunk<
  FetchRecipesResponse,
  FetchRecipesArgs,
  { rejectValue: any }
>("recipes/fetchRecipes", async ({ searchTerm, sortOrder }, { rejectWithValue }) => {
  try {
    const response = await api.get<{ recipes: Recipe[] }>(
      searchTerm 
        ? `/recipes/search?q=${searchTerm}${sortOrder ? `&sortBy=name&order=${sortOrder}` : ''}`
        : `/recipes${sortOrder ? `?sortBy=name&order=${sortOrder}` : ''}`
    );
    console.log(searchTerm);
    return { recipes: response.data.recipes, status: response.status };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (!axiosError.response) {
      throw error;
    }
    return rejectWithValue({
      data: axiosError.response.data,
      status: axiosError.response.status,
    });
  }
});

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.recipes;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Bir hata oluştu";
      });
  },
});

export default recipesSlice.reducer;
