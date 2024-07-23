import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../configs/axiosconfig";
import { AppDispatch } from "../store";

export interface LoginState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<
  any,
  { username: string; password: string },
  { rejectValue: any }
>("user/login", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { data: response.data, status: response.status };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (!axiosError.response) {
      throw error;
    }
    return rejectWithValue({
      data: error.response.data,
      status: error.response.status,
    });
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.data ?? "Bir hata oluştu";
      });
  },
});

export const { setIsLoggedIn, setLoading, setError } = loginSlice.actions;

export const loginUser =
  (formData: { username: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await dispatch(login(formData)).unwrap();
      console.log("Login successful:", response);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setError((error as Error).message ?? "Bir hata oluştu"));
      throw error;
    }
  };

export default loginSlice.reducer;
