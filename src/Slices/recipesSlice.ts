import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../configs/axiosconfig";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
}

interface FetchRecipesResponse {
  recipes: Recipe[];
  total: number;
}

export interface RecipesState {
  recipes: Recipe[];
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  total: 0,
  status: "idle",
  error: null,
};

export interface FetchRecipesParams {
  page: number;
  page_size: number;
  search_term: string;
  sort_by: string;
}

export const fetchRecipes = createAsyncThunk<
  FetchRecipesResponse,
  {
    searchTerm?: string;
    sortOrder?: "asc" | "desc" | null;
    sortBy?: string;
    currentPage: number;
    recordsPerPage: number;
  },
  { rejectValue: any }
>(
  "recipes/fetchRecipes",
  async (
    { searchTerm, sortOrder, sortBy, currentPage, recordsPerPage },
    { rejectWithValue }
  ) => {
    try {
      const skip = (currentPage - 1) * recordsPerPage;
      const response = await api.get<{ recipes: Recipe[]; total: number }>(
        `/recipes/search?q=${
          searchTerm || ""
        }&limit=${recordsPerPage}&skip=${skip}${
          sortOrder && sortBy ? `&sortBy=${sortBy}&order=${sortOrder}` : ""
        }`
      );

      return {
        recipes: response.data.recipes,
        total: response.data.total,
        status: response.status,
      };
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
  }
);

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
        state.total = action.payload.total;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Bir hata oluştu";
      });
  },
});

export default recipesSlice.reducer;
