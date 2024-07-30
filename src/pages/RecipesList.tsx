import React from "react";
import { Row, Col, Table, Pagination, Form } from "react-bootstrap";
import { useRecipes } from "../hooks/useRecipes";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

const RecipesList: React.FC = () => {
  const { t } = useTranslation();
  const {
    filters,
    recipesState,
    updateFilter,
    handleSearchChange,
    handleRecordsPerPageChange,
    handleSort,
    getSortIcon,
    handleRowClick,
  } = useRecipes();

  const totalPages = Math.ceil(recipesState.total / filters.page_size);

  return (
    <div className="container mt-4">
      <Row className="mb-3 align-items-center">
        <Col md={4}>
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder={t("recipes.searchRecipes")}
              value={filters.search_term}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Table bordered hover responsive className="shadow-sm">
        <thead className="bg-dark text-white">
          <tr className="align-middle">
            <th onClick={() => handleSort("id")}>{t("recipes.id")} {getSortIcon("id")}</th>
            <th onClick={() => handleSort("name")}>
              {t("recipes.name")} {getSortIcon("name")}
            </th>
            <th onClick={() => handleSort("ingredients")}>
              {t("recipes.ingredients")} {getSortIcon("ingredients")}
            </th>
            <th onClick={() => handleSort("instructions")}>
              {t("recipes.instructions")} {getSortIcon("instructions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {recipesState.recipes.map((recipe) => (
            <tr key={recipe.id}
            className="align-middle"
            onClick={() => handleRowClick(recipe.id)}
            style={{ cursor: "pointer" }}>
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
    </div>
  );
};
export default RecipesList;
