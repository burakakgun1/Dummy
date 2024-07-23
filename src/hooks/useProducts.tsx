import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../store";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  FetchProductsParams,
  Product,
  updateProduct,
} from "../productsSlice";
import { addToCart } from "../cartSlice";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productsData = useSelector((state: RootState) => state.products);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);

  const initialState: FetchProductsParams = {
    page: 1,
    page_size: 10,
    new_product_title: "",
    update_product_title: "",
    update_product_price: "",
    search_term: "",
    new_product_price: "",
  };
  const [filters, setFilters] = useState<FetchProductsParams>(initialState);

  const updateFilter = (key: keyof FetchProductsParams, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  useEffect(() => {
    dispatch(
      fetchProducts({
        searchTerm: filters.search_term,
        currentPage: filters.page,
        recordsPerPage: filters.page_size,
      })
    );
  }, [dispatch, filters.search_term, filters.page, filters.page_size]);

  useEffect(() => {
    setFilters(initialState);
  }, [filters.page_size]);
  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    updateFilter("page_size", parseInt(e.target.value, 10));
    updateFilter("page", 1);
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateFilter("search_term", e.target.value);
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        addProduct({
          title: filters.new_product_title,
          price: parseFloat(filters.new_product_price),
        })
      ).unwrap();
      toast.success("Product added successfully!");
      updateFilter("new_product_title", "");
      updateFilter("new_product_price", "");
    } catch (error) {
      toast.error("Error adding product!");
      console.error("Error adding product:", error);
    }
  };

  const openUpdateModal = (product: Product) => {
    setUpdateProductId(product.id);
    updateFilter("update_product_title", product.title);
    updateFilter("update_product_price", product.price.toString());
    setShowUpdateModal(true);
  };

  const handleUpdateProduct = async () => {
    if (updateProductId === null) return;
    try {
      await dispatch(
        updateProduct({
          id: updateProductId,
          title: filters.update_product_title,
          price: parseFloat(filters.update_product_price),
        })
      ).unwrap();
      toast.success("Product updated successfully!");
      setShowUpdateModal(false);
    } catch (error) {
      toast.error("Error updating product!");
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product!");
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };

  return {
    updateFilter,
    filters,
    productsData,
    showUpdateModal,
    setShowUpdateModal,
    updateProductId,
    showCartModal,
    setShowCartModal,
    handleRecordsPerPageChange,
    handleSearchChange,
    handleAddProduct,
    openUpdateModal,
    handleUpdateProduct,
    handleDeleteProduct,
    handleAddToCart,
  };
};
