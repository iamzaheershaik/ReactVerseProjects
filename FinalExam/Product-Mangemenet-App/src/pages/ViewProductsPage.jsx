import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Spinner,
  Alert,
  Badge,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  setSearch,
  setCategory,
  setSortBy,
} from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";

function ViewProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(function (state) {
    return state.products;
  });

  const items = products.items;
  const loading = products.loading;
  const error = products.error;
  const search = products.search;
  const category = products.category;
  const sortBy = products.sortBy;

  useEffect(function () {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories
  const categories = ["All"];
  items.forEach(function (item) {
    if (item.category && categories.indexOf(item.category) === -1) {
      categories.push(item.category);
    }
  });

  // Filter by search
  let filtered = items.filter(function (item) {
    if (!search) return true;
    return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  // Filter by category
  if (category !== "All") {
    filtered = filtered.filter(function (item) {
      return item.category === category;
    });
  }

  // Sort
  if (sortBy === "price-asc") {
    filtered = filtered.slice().sort(function (a, b) {
      return Number(a.price) - Number(b.price);
    });
  } else if (sortBy === "price-desc") {
    filtered = filtered.slice().sort(function (a, b) {
      return Number(b.price) - Number(a.price);
    });
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Browse Products</h2>
            <p className="text-muted mb-0">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Button as={Link} to="/" variant="outline-secondary" className="fw-semibold">
            ← Back to Dashboard
          </Button>
        </div>

        {/* Search & Filter Toolbar */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={5}>
                <Form.Control
                  type="text"
                  placeholder="🔍 Search products by name..."
                  value={search}
                  onChange={function (e) {
                    dispatch(setSearch(e.target.value));
                  }}
                  size="lg"
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  value={category}
                  onChange={function (e) {
                    dispatch(setCategory(e.target.value));
                  }}
                  size="lg"
                >
                  {categories.map(function (cat) {
                    return (
                      <option key={cat} value={cat}>
                        {cat === "All" ? "All Categories" : cat}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={sortBy}
                  onChange={function (e) {
                    dispatch(setSortBy(e.target.value));
                  }}
                  size="lg"
                >
                  <option value="default">Sort By</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-3">Loading products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">No products found</h4>
            <p className="text-muted">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Products Grid */}
        <Row className="g-4">
          {filtered.map(function (product) {
            return (
              <Col key={product.id} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm border-0 product-view-card">
                  {product.imageUrl && (
                    <Card.Img
                      variant="top"
                      src={product.imageUrl}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{product.title}</Card.Title>
                    <Card.Text className="text-primary fw-bold fs-5">
                      ₹{Number(product.price).toFixed(2)}
                    </Card.Text>
                    <Badge bg="secondary" className="mb-2 align-self-start">
                      {product.category}
                    </Badge>
                    {product.description && (
                      <Card.Text className="text-muted small flex-grow-1">
                        {product.description.length > 80
                          ? product.description.substring(0, 80) + "..."
                          : product.description}
                      </Card.Text>
                    )}
                    <Button
                      as={Link}
                      to={"/product/" + product.id}
                      variant="primary"
                      className="w-100 mt-auto fw-semibold"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Inline styles for hover effect */}
      <style>{"\
        .product-view-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }\
        .product-view-card:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important; }\
      "}</style>
    </div>
  );
}

export default ViewProductsPage;
