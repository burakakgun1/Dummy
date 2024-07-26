import { Button, Table } from "react-bootstrap";
import { useCart } from "../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CartList: React.FC = () => {
  const { t } = useTranslation();
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
            <th>{t("cart.title")}</th>
            <th>{t("cart.price")}</th>
            <th>{t("cart.quantity")}</th>
            <th>{t("cart.total")}</th>
            <th>{t("cart.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                {t("cart.emptyCart")}
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
        {t("cart.totalPrice")}{calculateTotalPrice().toFixed(2)}
      </h3>
    </div>
  );
};

export default CartList;
