import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones,faUtensils } from "@fortawesome/free-solid-svg-icons";

const MainPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={6}>
          <Link to="/products" className="text-decoration-none">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <FontAwesomeIcon icon={faHeadphones} size="3x" className="mb-3" />
                <Card.Title className="mb-3">Products</Card.Title>
                <Card.Text>Click to view our product list</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={6}>
          <Link to="/recipes" className="text-decoration-none">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
              <FontAwesomeIcon icon={faUtensils} size="3x" className="mb-3" />
                <Card.Title className="mb-3">Recipes</Card.Title>
                <Card.Text>Click to explore our recipes</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
