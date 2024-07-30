import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, FetchRecipesParams } from "../Slices/recipesSlice";
import { AppDispatch, RootState } from "../store";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

export const useRecipes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipesState = useSelector((state: RootState) => state.recipes);
  const navigate = useNavigate();

  const initialState: FetchRecipesParams = {
    page: 1,
    page_size: 5,
    search_term: "",
    sort_by: "",
    sort_order: "asc"||"desc"||null,
  };
  const [filters, setFilters] = useState<FetchRecipesParams>(initialState);

  const updateFilter = (key: keyof FetchRecipesParams, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    dispatch(
      fetchRecipes({
        searchTerm: filters.search_term,
        sortOrder: filters.sort_order,
        sortBy: filters.sort_by,
        currentPage: filters.page,
        recordsPerPage: filters.page_size,
      })
    );
  }, [dispatch, filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter("search_term", e.target.value);
    updateFilter("page", 1);
  };

  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateFilter("page_size", parseInt(e.target.value, 10));
    updateFilter("page", 1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter("sort_order", e.target.value as "asc" | "desc" | null);
    updateFilter("page", 1);
  };

  const handleSort = (key: string) => {
    if (filters.sort_by === key) {
      updateFilter("sort_order", filters.sort_order === "asc" ? "desc" : "asc");
    } else {
      updateFilter("sort_order", "asc");
      updateFilter("sort_by", key);
    }
    updateFilter("page", 1);
  };
  const getSortIcon = (key: string) => {
    if (filters.sort_by === key) {
      return filters.sort_order === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleRowClick = (id: number) => {
    navigate(`/recipes/${id}`);
  };

  return {
    handleRowClick,
    recipesState,
    getSortIcon,
    handleSearchChange,
    handleRecordsPerPageChange,
    handleSortChange,
    handleSort,
    filters,
    updateFilter,
  };
};
