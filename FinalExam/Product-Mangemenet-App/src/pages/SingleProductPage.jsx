import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";

function SingleProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(function (state) {
    return state.products;
  });

  const items = products.items;
  const loading = products.loading;
  const error = products.error;

  // If products haven't been loaded yet, fetch them
  useEffect(function () {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Find the current product
  let product = null;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      product = items[i];
      break;
    }
  }

  function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete "' + product.title + '"?'
    );
    if (confirmed) {
      dispatch(deleteProduct(product.id));
      navigate("/");
    }
  }

  function handleEdit() {
    navigate("/edit/" + product.id);
  }

  // Loading state
  if (loading) {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="py-5">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-3">Loading product details...</p>
          </div>
        </Container>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
          <Button as={Link} to="/products" variant="outline-primary">
            ← Back to Products
          </Button>
        </Container>
      </div>
    );
  }

  // Product not found
  if (!loading && items.length > 0 && !product) {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="py-5">
          <div className="text-center py-5">
            <h3 className="text-muted mb-3">Product Not Found</h3>
            <p className="text-muted mb-4">
              The product you are looking for does not exist or has been removed.
            </p>
            <Button as={Link} to="/products" variant="primary" className="fw-semibold">
              ← Browse Products
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Still loading products list
  if (!product) {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="py-5">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link to="/" className="text-decoration-none text-muted">
            Home
          </Link>
          <span className="text-muted mx-2">/</span>
          <Link to="/products" className="text-decoration-none text-muted">
            Products
          </Link>
          <span className="text-muted mx-2">/</span>
          <span className="fw-semibold">{product.title}</span>
        </nav>

        <Card className="border-0 shadow-sm overflow-hidden">
          <Row className="g-0">
            {/* Product Image */}
            <Col md={6}>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "400px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-10"
                  style={{ minHeight: "400px" }}
                >
                  <span className="text-muted fs-1">📷</span>
                </div>
              )}
            </Col>

            {/* Product Details */}
            <Col md={6}>
              <Card.Body className="p-4 p-lg-5 d-flex flex-column h-100">
                {/* Category Badge */}
                {product.category && (
                  <Badge
                    bg="primary"
                    className="mb-3 align-self-start px-3 py-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {product.category}
                  </Badge>
                )}

                {/* Title */}
                <h2 className="fw-bold mb-3">{product.title}</h2>

                {/* Price */}
                <h3 className="text-primary fw-bold mb-4">
                  ₹{Number(product.price).toFixed(2)}
                </h3>

                {/* Divider */}
                <hr />

                {/* Description */}
                <div className="flex-grow-1">
                  <h5 className="fw-semibold mb-2">Description</h5>
                  <p className="text-muted" style={{ lineHeight: "1.8" }}>
                    {product.description || "No description available."}
                  </p>
                </div>

                {/* Product Info */}
                <div className="mb-4">
                  <Row className="g-3">
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded-3 text-center">
                        <small className="text-muted d-block">Product ID</small>
                        <strong className="small">{product.id.substring(0, 8)}...</strong>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded-3 text-center">
                        <small className="text-muted d-block">Category</small>
                        <strong>{product.category || "N/A"}</strong>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-grow-1 fw-semibold py-2"
                    onClick={handleEdit}
                  >
                    ✏️ Edit Product
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="flex-grow-1 fw-semibold py-2"
                    onClick={handleDelete}
                  >
                    🗑️ Delete
                  </Button>
                </div>

                {/* Back Link */}
                <div className="text-center mt-3">
                  <Link
                    to="/products"
                    className="text-decoration-none text-muted small"
                  >
                    ← Back to all products
                  </Link>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default SingleProductPage;
