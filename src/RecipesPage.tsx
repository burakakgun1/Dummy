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

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = recipesState.recipes.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(recipesState.recipes.length / recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRecordsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRecordsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="container mt-5">
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
          {currentRecords.map((recipe) => (
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

export default RecipesPage;
