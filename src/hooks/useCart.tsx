import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Slices/cartSlice";
import { AppDispatch, RootState } from "../store";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  return { cartItems, handleRemoveFromCart };
};
