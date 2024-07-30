import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeDetails } from "../Slices/recipesDetailsSlice";
import { AppDispatch, RootState } from "../store";

export const useRecipeDetails = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const recipeDetailsState = useSelector((state: RootState) => state.recipeDetails);

  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [dispatch, id]);

  return { recipeDetailsState };
};