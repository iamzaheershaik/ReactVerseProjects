import React, { useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Table,
  Spinner,
  Alert,
  Badge,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  setSearch,
  setCategory,
  setSortBy,
} from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";

function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  function handleDelete(product) {
    const confirmed = window.confirm(
      'Are you sure you want to delete "' + product.title + '"?'
    );
    if (confirmed) {
      dispatch(deleteProduct(product.id));
    }
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <p className="text-muted mb-0">
              Manage your products ({filtered.length} total)
            </p>
          </div>
          <Button
            as={Link}
            to="/add"
            variant="primary"
            className="fw-semibold px-4"
          >
            + Add Product
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
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  value={category}
                  onChange={function (e) {
                    dispatch(setCategory(e.target.value));
                  }}
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

        {/* Products Table */}
        {!loading && filtered.length > 0 && (
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0 align-middle">
                <thead className="bg-dark text-white">
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th style={{ width: "80px" }}>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th style={{ width: "260px" }} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(function (product, index) {
                    return (
                      <tr key={product.id}>
                        <td className="fw-semibold text-muted">{index + 1}</td>
                        <td>
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "8px",
                                backgroundColor: "#e9ecef",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              📷
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="fw-semibold">{product.title}</span>
                          {product.description && (
                            <small className="d-block text-muted">
                              {product.description.length > 50
                                ? product.description.substring(0, 50) + "..."
                                : product.description}
                            </small>
                          )}
                        </td>
                        <td>
                          <Badge bg="secondary">{product.category}</Badge>
                        </td>
                        <td className="fw-bold text-primary">
                          ₹{Number(product.price).toFixed(2)}
                        </td>
                        <td className="text-center">
                          <div className="d-flex gap-2 justify-content-center">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={function () {
                                navigate("/product/" + product.id);
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={function () {
                                navigate("/edit/" + product.id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={function () {
                                handleDelete(product);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default ProductPage;
