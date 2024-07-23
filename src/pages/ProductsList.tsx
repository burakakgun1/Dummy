// components/ProductsPage.tsx
import React from "react";
import {
  Table,
  Form,
  Button,
  Modal,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "../CartPage";
import { useProducts } from "../hooks/useProducts";

const ProductsList: React.FC = () => {
  const {
    productsData: { products, total, status, error },
    showUpdateModal,
    setShowUpdateModal,
    showCartModal,
    setShowCartModal,
    handleRecordsPerPageChange,
    handleSearchChange,
    handleAddProduct,
    openUpdateModal,
    handleUpdateProduct,
    handleDeleteProduct,
    handleAddToCart,
    filters,
    updateFilter,
  } = useProducts();

  const totalPages = Math.ceil(total / filters.page_size);

  return (
    <div className="container mt-4" style={{ minHeight: "100vh" }}>
      <Row className="mb-3 align-items-center">
        <Col md={3}>
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder="Search products"
              value={filters.search_term}
              onChange={(e) => handleSearchChange(e)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button
            className="btn-sm"
            variant="primary"
            onClick={() => setShowCartModal(true)}
          >
            SEPET
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
                placeholder="Enter product title"
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
                placeholder="Enter product price"
                value={filters.new_product_price}
                onChange={(e) => updateFilter("new_product_price", e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-sm">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}

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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => openUpdateModal(product)}
                  className="btn-sm me-2"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="btn-sm me-2"
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                  className="btn-sm"
                >
                  Add to Cart
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

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUpdateProductTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={filters.update_product_title}
              onChange={(e) => updateFilter("update_product_title", e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formUpdateProductPrice" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={filters.update_product_price}
              onChange={(e) => updateFilter("update_product_price", e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CartPage />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCartModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsList;
