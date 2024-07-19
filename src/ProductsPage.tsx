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

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [updateProductTitle, setUpdateProductTitle] = useState("");
  const [updateProductPrice, setUpdateProductPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchProducts(searchTerm));
  }, [dispatch, searchTerm]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(products.length / recordsPerPage);

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
      setShowSuccessMessage(true);
      setNewProductTitle("");
      setNewProductPrice("");
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
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
      setShowSuccessMessage(true);
      setShowUpdateModal(false);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
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

      {showSuccessMessage && (
        <div
          style={{
            position: "fixed",
            top: 30,
            right: 30,
            backgroundColor: "green",
            padding: 10,
            borderRadius: 5,
            color: "white",
          }}
        >
          Operation completed successfully!
        </div>
      )}

      {showErrorMessage && (
        <div
          style={{
            position: "fixed",
            top: 30,
            right: 30,
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
            color: "white",
          }}
        >
          Error!
        </div>
      )}

      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        centered
      >
        <Modal.Body>
          <Form>
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

            <Form.Group controlId="formUpdateProductPrice">
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUpdateModal(false)}
            className="btn-sm"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateProduct}
            className="btn-sm"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Table
        bordered
        hover
        responsive
        className="shadow-sm mt-4"
        style={{ backgroundColor: "white" }}
      >
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((product) => (
            <tr key={product.id} className="align-middle">
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => openUpdateModal(product)}
                  className="btn-sm me-2"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
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

      <Row className="mb-3">
        <Col>
          <Form.Group
            controlId="recordsPerPage"
            className="d-flex align-items-center"
          >
            <Form.Select
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
              style={{ width: "100px", display: "inline-block" }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col className="d-flex justify-content-end">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPage;
