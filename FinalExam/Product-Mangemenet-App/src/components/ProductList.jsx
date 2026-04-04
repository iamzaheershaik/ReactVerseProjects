import React, { useEffect } from "react";
import { Row, Col, Form, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setSearch,
  setCategory,
  setSortBy,
} from "../store/actions/productActionTypes";
import ProductItem from "./ProductItem";

function ProductList() {
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

  // Get unique categories from products
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
    <div>
      {/* Toolbar */}
      <Row className="mb-4 g-2">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
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
                  {cat}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col md={4}>
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

      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Products Grid */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No products found.</p>
        </div>
      )}

      <Row className="g-4">
        {filtered.map(function (product) {
          return (
            <Col key={product.id} sm={6} md={4} lg={3}>
              <ProductItem product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ProductList;
