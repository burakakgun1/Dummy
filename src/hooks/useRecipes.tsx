import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, FetchRecipesParams } from "../Slices/recipesSlice";
import { AppDispatch, RootState } from "../store";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

export const useRecipes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipesState = useSelector((state: RootState) => state.recipes);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const initialState: FetchRecipesParams = {
    page: 1,
    page_size: 5,
    search_term: "",
    sort_by: "",
  };
  const [filters, setFilters] = useState<FetchRecipesParams>(initialState);

  const updateFilter = (key: keyof FetchRecipesParams, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchRecipes({ 
      searchTerm: filters.search_term, 
      sortOrder, 
      sortBy: filters.sort_by,
      currentPage: filters.page, 
      recordsPerPage: filters.page_size 
    }));
  }, [dispatch, filters, sortOrder]);

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter("search_term", e.target.value);
    updateFilter("page", 1);
  };

  const handleRecordsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter("page_size", parseInt(e.target.value, 10));
    updateFilter("page", 1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc' | null);
    updateFilter("page", 1);
  };

  const handleSort = (key: string) => {
    if (filters.sort_by === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOrder('asc');
      updateFilter("sort_by", key);
    }
    updateFilter("page", 1);
  };
  const getSortIcon = (key: string) => {
    if (filters.sort_by === key) {
      return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return {
    recipesState,
    sortOrder,
    setSortOrder,
    getSortIcon,
    handleSearchChange,
    handleRecordsPerPageChange,
    handleSortChange,
    handleSort,
    filters,
    updateFilter,
  }
}