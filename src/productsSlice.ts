import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "./axiosconfig";

export interface Product {
  id: number;
  title: string;
  price: number;
}

interface FetchProductsResponse {
  products: Product[];
  status: number;
}

interface DeleteProductResponse {
  productId: number;
  status: number;
}

export interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  string | undefined,
  { rejectValue: any }
>("products/fetchProducts", async (searchTerm, { rejectWithValue }) => {
  try {
    const response = await api.get<{ products: Product[] }>(
      searchTerm ? `/products/search?q=${searchTerm}` : "/products"
    );

    return { products: response.data.products, status: response.status };
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

export const addProduct = createAsyncThunk<
  Product,
  { title: string; price: number },
  { rejectValue: any }
>("products/addProduct", async (productData, { rejectWithValue }) => {
  try {
    const response = await api.post<Product>("/products/add", productData, {
      headers: { "Content-Type": "application/json" },
    });
    return { ...response.data, status: response.status };
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

export const updateProduct = createAsyncThunk<
  Product,
  { id: number; title: string; price: number },
  { rejectValue: any }
>("products/updateProduct", async (productData, { rejectWithValue }) => {
  try {
    const response = await api.put<Product>(
      `/products/${productData.id}`,
      { title: productData.title, price: productData.price },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return { ...response.data, status: response.status };
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

export const deleteProduct = createAsyncThunk<
  DeleteProductResponse,
  number,
  { rejectValue: any }
>("products/deleteProduct", async (productId, { rejectWithValue }) => {
  try {
    const response = await api.delete<DeleteProductResponse>(
      `/products/${productId}`
    );
    return { productId, status: response.status };
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

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product.id !== action.payload.productId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default productsSlice.reducer;
