import React from "react";
import {
  Table,
  Form,
  Button,
  Modal,
  Row,
  Col,
  Pagination,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useProducts } from "../hooks/useProducts";
import CartList from "./CartList";
import { useTranslation } from "react-i18next";

const ProductsList: React.FC = () => {
  const { t } = useTranslation();
  const {
    productsData: { products, total, status, error },
    filters,
    chartRef,
    handleRecordsPerPageChange,
    handleSearchChange,
    handleAddProduct,
    openUpdateModal,
    handleUpdateProduct,
    handleDeleteProduct,
    handleAddToCart,
    updateFilter,
    handleRowClick,
    handleShowReviews,
  } = useProducts();

  const totalPages = Math.ceil(total / filters.page_size);

  return (
    <div className="container mt-4" style={{ minHeight: "100vh" }}>
      <Row className="mb-3 align-items-center">
        <Col md={3}>
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder={t("products.searchProducts")}
              value={filters.search_term}
              onChange={(e) => handleSearchChange(e)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button
            className="btn-sm"
            variant="primary"
            onClick={() => updateFilter("show_cart_modal", true)}
          >
            {t("products.shoppingCart")}
          </Button>
        </Col>
        <Col md={7}>
          <Form onSubmit={handleAddProduct} className="d-flex">
            <Form.Group
              controlId="formProductTitle"
              className="me-2 flex-grow-1"
            >
              <Form.Control
                type="text"
                placeholder={t("products.enterProductTitle")}
                value={filters.new_product_title}
                onChange={(e) =>
                  updateFilter("new_product_title", e.target.value)
                }
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formProductPrice"
              className="me-2 flex-grow-1"
            >
              <Form.Control
                type="number"
                step="0.01"
                placeholder={t("products.enterProductPrice")}
                value={filters.new_product_price}
                onChange={(e) =>
                  updateFilter("new_product_price", e.target.value)
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-sm">
              {t("products.addProduct")}
            </Button>
          </Form>
        </Col>
      </Row>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t("products.id")}</th>
            <th>{t("products.title")}</th>
            <th>{t("products.price")}</th>
            <th>{t("products.image")}</th>
            <th>{t("products.actions")}</th>
            <th>{t("products.reviews")}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleRowClick(product)}
                >
                  {t("products.viewImage")}
                </Button>
              </td>

              <td>
                <Button
                  variant="info"
                  onClick={() => openUpdateModal(product)}
                  className="btn-sm me-2"
                >
                  {t("products.update")}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="btn-sm me-2"
                >
                  {t("products.delete")}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                  className="btn-sm"
                >
                  {t("products.addToCart")}
                </Button>
              </td>
              <td>
              <Button
                  variant="info"
                  onClick={() => handleShowReviews(product)}
                  className="btn-sm"
                >
                  {t("products.showReviews")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-3">
        <Col md={8}>
          <Pagination>
            <Pagination.First onClick={() => updateFilter("page", 1)} />
            <Pagination.Prev
              onClick={() =>
                filters.page > 1 && updateFilter("page", filters.page - 1)
              }
            />

            {filters.page !== 1 && totalPages > 1 && (
              <Pagination.Item onClick={() => updateFilter("page", 1)}>
                {1}
              </Pagination.Item>
            )}

            {filters.page > 4 && <Pagination.Ellipsis />}

            {filters.page > 3 && (
              <Pagination.Item
                onClick={() => updateFilter("page", filters.page - 2)}
              >
                {filters.page - 2}
              </Pagination.Item>
            )}
            {filters.page > 2 && (
              <Pagination.Item
                onClick={() => updateFilter("page", filters.page - 1)}
              >
                {filters.page - 1}
              </Pagination.Item>
            )}

            <Pagination.Item active>{filters.page}</Pagination.Item>

            {filters.page < totalPages - 1 && (
              <Pagination.Item
                onClick={() => updateFilter("page", filters.page + 1)}
              >
                {filters.page + 1}
              </Pagination.Item>
            )}
            {filters.page < totalPages - 2 && (
              <Pagination.Item
                onClick={() => updateFilter("page", filters.page + 2)}
              >
                {filters.page + 2}
              </Pagination.Item>
            )}

            {filters.page < totalPages - 3 && <Pagination.Ellipsis />}

            {filters.page !== totalPages && totalPages > 1 && (
              <Pagination.Item onClick={() => updateFilter("page", totalPages)}>
                {totalPages}
              </Pagination.Item>
            )}

            <Pagination.Next
              onClick={() =>
                filters.page < totalPages &&
                updateFilter("page", filters.page + 1)
              }
            />
            <Pagination.Last onClick={() => updateFilter("page", totalPages)} />
          </Pagination>
        </Col>
        <Col md={4} className="text-end">
          <Form.Select
            value={filters.page_size}
            onChange={handleRecordsPerPageChange}
            className="d-inline-block w-auto"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Form.Select>
        </Col>
      </Row>

      <Modal
        show={filters.show_update_modal}
        onHide={() => updateFilter("show_update_modal", false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("products.updateProduct")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUpdateProductTitle" className="mb-3">
            <Form.Label>{t("products.title")}</Form.Label>
            <Form.Control
              type="text"
              value={filters.update_product_title}
              onChange={(e) =>
                updateFilter("update_product_title", e.target.value)
              }
            />
          </Form.Group>
          <Form.Group controlId="formUpdateProductPrice" className="mb-3">
            <Form.Label>{t("products.price")}</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={filters.update_product_price}
              onChange={(e) =>
                updateFilter("update_product_price", e.target.value)
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => updateFilter("show_update_modal", false)}
          >
            {t("products.close")}
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            {t("products.update")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={filters.show_cart_modal}
        onHide={() => updateFilter("show_cart_modal", false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("products.shoppingCart")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CartList />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => updateFilter("show_cart_modal", false)}
          >
            {t("products.close")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={filters.show_image_modal}
        onHide={() => updateFilter("show_image_modal", false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("products.image")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filters.select_image ? (
            <img
              src={filters.select_image}
              className="img-fluid"
              alt="Product"
            />
          ) : (
            <p>{t("products.noImage")}</p>
          )}
        </Modal.Body>
      </Modal>
      <Modal
  show={filters.show_review_modal}
  onHide={() => updateFilter("show_review_modal", false)}
  size="lg"
>
  <Modal.Header closeButton>
    <Modal.Title>{filters.selected_product_name}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row>
      <Col md={6}>
        <canvas ref={chartRef}></canvas>
      </Col>
      <Col md={6}>
        <h5>{t("products.reviews")}</h5>
        <ListGroup>
          {filters.selected_product_reviews?.map((review, index) => (
            <ListGroup.Item key={index}>
              <p><strong>{t("products.productsRating")}:</strong> {review.rating}</p>
              <p><strong>{t("products.productsComments")}:</strong> {review.comment}</p>
              <p><strong>{t("products.productsReviewerName")}:</strong> {review.reviewerName}</p>
              <p><strong>{t("products.productsDate")}:</strong> {new Date(review.date).toLocaleDateString()}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  </Modal.Body>
</Modal>
    </div>
  );
};

export default ProductsList;
