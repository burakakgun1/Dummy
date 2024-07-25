import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Slices/cartSlice";
import { AppDispatch, RootState } from "../store";
import { Product } from "../Slices/productsSlice";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };


  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return { cartItems, handleAddToCart, handleRemoveFromCart,calculateTotalPrice };
};
