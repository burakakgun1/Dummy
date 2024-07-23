import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { removeFromCart } from "./cartSlice";
import { Button, Table } from "react-bootstrap";
import { Product } from "./productsSlice";

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mt-4">
      <h2>Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">Your cart is empty</td>
            </tr>
          ) : (
            cartItems.map((item: Product) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="btn-sm"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CartPage;
