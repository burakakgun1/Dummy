import { Button, Table } from "react-bootstrap";
import { useCart } from "../hooks/useCart";
import { FaTrash } from "react-icons/fa";

const CartList: React.FC = () => {
  const {
    handleAddToCart,
    handleRemoveFromCart,
    cartItems,
    calculateTotalPrice,
    handleDeleteFromCart,
  } = useCart();

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr className="text-center min-width 100vh">
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
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="btn-sm "
                    variant="outline-primary"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="btn-sm"
                    variant="outline-primary"
                  >
                    -
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleDeleteFromCart(item.id)}
                    className="btn-sm btn-danger"
                  >
                    <FaTrash />
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
