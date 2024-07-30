import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../configs/axiosconfig";

export interface RecipeDetails {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
}

export interface RecipeDetailsState {
  recipe: RecipeDetails | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: RecipeDetailsState = {
  recipe: null,
  status: "idle",
  error: null,
};

export const fetchRecipeDetails = createAsyncThunk<
  RecipeDetails,
  number,
  { rejectValue: any }
>("recipeDetails/fetchRecipeDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<RecipeDetails>(`/recipes/${id}`);
    return response.data;
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

export const recipeDetailsSlice = createSlice({
  name: "recipeDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipe = action.payload;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Bir hata oluştu";
      });
  },
});

export default recipeDetailsSlice.reducer;