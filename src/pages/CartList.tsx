import { Button, Table } from "react-bootstrap";
import { useCart } from "../hooks/useCart";

const CartList: React.FC = () => {
  const {
    handleAddToCart,
    handleRemoveFromCart,
    cartItems,
    calculateTotalPrice,
  } = useCart();

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                Your cart is empty
              </td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="btn-sm "
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="btn-sm"
                  >
                    -
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <h3 className="text-right mt-4">
        Total Price: ${calculateTotalPrice().toFixed(2)}
      </h3>
    </div>
  );
};

export default CartList;
