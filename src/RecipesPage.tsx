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

  const handleRecordsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc' | null);
  };

  return (
    <div className="container mt-4">
      <Row className="mb-3 align-items-center">
        <Col md={4}>
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder="Search recipes"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formSort">
            <Form.Select
              value={sortOrder || ''}
              onChange={handleSortChange}
            >
              <option value="">Default</option>
              <option value="asc">Artan</option>
              <option value="desc">Azalan</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

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

      <Row className="mt-3">
        <Col md={8}>
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
            />
            <Pagination.Prev
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            />

            {currentPage !== 1 && totalPages > 1 && (
              <Pagination.Item onClick={() => handlePageChange(1)}>
                {1}
              </Pagination.Item>
            )}

            {currentPage > 4 && <Pagination.Ellipsis />}

            {currentPage > 3 && (
              <Pagination.Item onClick={() => handlePageChange(currentPage - 2)}>
                {currentPage - 2}
              </Pagination.Item>
            )}
            {currentPage > 2 && (
              <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
                {currentPage - 1}
              </Pagination.Item>
            )}

            <Pagination.Item active>{currentPage}</Pagination.Item>

            {currentPage < totalPages - 1 && (
              <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
                {currentPage + 1}
              </Pagination.Item>
            )}
            {currentPage < totalPages - 2 && (
              <Pagination.Item onClick={() => handlePageChange(currentPage + 2)}>
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
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
            />
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
    </div>
  );
};

export default RecipesPage;
