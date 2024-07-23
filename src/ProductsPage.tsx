import React, { useState, useEffect, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Form,
  Button,
  Modal,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import { RootState, AppDispatch } from "./store";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "./productsSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, status, error } = useSelector(
    (state: RootState) => state.products
  );
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [updateProductTitle, setUpdateProductTitle] = useState("");
  const [updateProductPrice, setUpdateProductPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchProducts({ searchTerm, currentPage, recordsPerPage }));
  }, [dispatch, searchTerm, currentPage, recordsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRecordsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        addProduct({
          title: newProductTitle,
          price: parseFloat(newProductPrice),
        })
      ).unwrap();
      toast.success("Product added successfully!");
      setNewProductTitle("");
      setNewProductPrice("");
    } catch (error) {
      toast.error("Error adding product!");
      console.error("Error adding product:", error);
    }
  };

  const openUpdateModal = (product: Product) => {
    setUpdateProductId(product.id);
    setUpdateProductTitle(product.title);
    setUpdateProductPrice(product.price.toString());
    setShowUpdateModal(true);
  };

  const handleUpdateProduct = async () => {
    if (updateProductId === null) return;
    try {
      await dispatch(
        updateProduct({
          id: updateProductId,
          title: updateProductTitle,
          price: parseFloat(updateProductPrice),
        })
      ).unwrap();
      toast.success("Product updated successfully!");
      setShowUpdateModal(false);
    } catch (error) {
      toast.error("Error updating product!");
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product!");
      console.error("Error deleting product:", error);
    }
  };

  const totalPages = Math.ceil(total / recordsPerPage);

  return (
    <div className="container mt-4" style={{ minHeight: "100vh" }}>
      <Row className="mb-1 align-items-center">
        <Col md={4}>
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form
            onSubmit={handleAddProduct}
            className="d-flex justify-content-end"
          >
            <Form.Group
              controlId="formProductTitle"
              className="me-2 flex-grow-1"
            >
              <Form.Control
                type="text"
                placeholder="Enter product title"
                value={newProductTitle}
                onChange={(e) => setNewProductTitle(e.target.value)}
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
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
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
                  className="btn-sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-2">
        <Col md={8}>
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
            />

            {currentPage !== 1 && totalPages > 1 && (
              <Pagination.Item onClick={() => handlePageChange(1)}>
                {1}
              </Pagination.Item>
            )}

            {currentPage > 4 && <Pagination.Ellipsis />}

            {currentPage > 3 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage - 2)}
              >
                {currentPage - 2}
              </Pagination.Item>
            )}
            {currentPage > 2 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </Pagination.Item>
            )}

            <Pagination.Item active>{currentPage}</Pagination.Item>

            {currentPage < totalPages - 1 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </Pagination.Item>
            )}
            {currentPage < totalPages - 2 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage + 2)}
              >
                {currentPage + 2}
              </Pagination.Item>
            )}

            {currentPage < totalPages - 3 && <Pagination.Ellipsis />}

            {currentPage !== totalPages && totalPages > 1 && (
              <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </Pagination.Item>
            )}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
            />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        </Col>
        <Col md={4} className="text-end">
          <Form.Select
            value={recordsPerPage}
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
          <Form.Group controlId="formUpdateProductTitle">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product title"
              value={updateProductTitle}
              onChange={(e) => setUpdateProductTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUpdateProductPrice" className="mt-2">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Enter product price"
              value={updateProductPrice}
              onChange={(e) => setUpdateProductPrice(e.target.value)}
              required
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
      
    </div>
  );
};

export default ProductsPage;
