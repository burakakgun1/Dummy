import React, { useEffect, useState } from "react";
import { Table, Pagination, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchRecipes } from "./recipesSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipesState = useSelector((state: RootState) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const skip = (currentPage - 1) * recordsPerPage;

  useEffect(() => {
    dispatch(fetchRecipes({ searchTerm, sortOrder, limit: recordsPerPage, skip }));
  }, [dispatch, searchTerm, sortOrder, recordsPerPage, skip]);

  const totalPages = Math.ceil(recipesState.total / recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRecordsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc' | null);
  };

  return (
    <div className="container mt-4">
      <Form.Group controlId="formSearch" className="d-flex justify-content-center">
        <Form.Control
          className="my-3"
          type="text"
          placeholder="Search recipes"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "200px", display: "inline-block" }}
        />
      </Form.Group>

      <Form.Group controlId="formSort" className="d-flex justify-content-center mb-3">
        <Form.Select
          value={sortOrder || ''}
          onChange={handleSortChange}
          style={{ width: "200px", display: "inline-block" }}
        >
          <option value="">Varsayılan</option>
          <option value="asc">Artan</option>
          <option value="desc">Azalan</option>
        </Form.Select>
      </Form.Group>

      <Table bordered hover responsive className="shadow-sm">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {recipesState.recipes.map((recipe) => (
            <tr key={recipe.id} className="align-middle">
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>{recipe.ingredients.join(", ")}</td>
              <td>{recipe.instructions.join(". ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="recordsPerPage" className="d-flex align-items-center">
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

export default RecipesPage;
