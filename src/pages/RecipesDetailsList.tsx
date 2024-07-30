import React from "react";
import { useParams } from "react-router-dom";
import { useRecipeDetails } from "../hooks/useRecipesDetails";
import {  Row, Col, Card, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const RecipeDetailsList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { recipeDetailsState } = useRecipeDetails(parseInt(id!, 10));
  const { t } = useTranslation();

  if (recipeDetailsState.status === "loading") {
    return <div>{t("common.loading")}</div>;
  }

  if (recipeDetailsState.status === "failed") {
    return <div>{t("common.error")}: {recipeDetailsState.error}</div>;
  }

  const recipe = recipeDetailsState.recipe;

  if (!recipe) {
    return <div>{t("recipes.notFound")}</div>;
  }

  return (
    <div className="mt-4">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-sm border-light rounded">
            <Card.Img 
              className="img-fluid rounded-top" 
              variant="top" 
              src={recipe.image} 
              style={{ maxHeight: '100vh', objectFit: 'cover' }} 
            />
            <Card.Body>
              <Card.Title className="fs-4 mb-3">{recipe.name}</Card.Title>
              <Card.Text className="text-muted">
                <strong>{t("recipes.cuisine")}:</strong> {recipe.cuisine}
                <br />
                <strong>{t("recipes.difficulty")}:</strong> {recipe.difficulty}
                <br />
                <strong>{t("recipes.prepTime")}:</strong> {recipe.prepTimeMinutes} {t("recipes.minutes")}
                <br />
                <strong>{t("recipes.cookTime")}:</strong> {recipe.cookTimeMinutes} {t("recipes.minutes")}
                <br />
                <strong>{t("recipes.servings")}:</strong> {recipe.servings}
                <br />
                <strong>{t("recipes.calories")}:</strong> {recipe.caloriesPerServing} {t("recipes.perServing")}
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item className="py-3">
                <h5 className="mb-2">{t("recipes.ingredients")}</h5>
                <ul className="list-unstyled">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-1">{ingredient}</li>
                  ))}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <h5 className="mb-2">{t("recipes.instructions")}</h5>
                <ul className="list-unstyled">  
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="mb-1">{instruction}</li>
                  ))}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <h5 className="mb-2">{t("recipes.tags")}</h5>
                <span>{recipe.tags.join(", ")}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RecipeDetailsList;