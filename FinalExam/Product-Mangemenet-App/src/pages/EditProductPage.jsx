import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, updateProduct } from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

function EditProductPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(function (state) {
    return state.products;
  });

  const [product, setProduct] = useState(null);

  useEffect(function () {
    // If products not loaded yet, fetch them
    if (products.items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.items.length]);

  useEffect(function () {
    // Find the product by id
    const found = products.items.find(function (item) {
      return item.id === params.id;
    });
    if (found) {
      setProduct(found);
    }
  }, [products.items, params.id]);

  function handleUpdate(data) {
    dispatch(updateProduct(params.id, data)).then(function () {
      navigate("/");
    });
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4" style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-4">Edit Product</h2>

        {!product ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <ProductForm
            initialData={product}
            onSubmit={handleUpdate}
            loading={products.loading}
          />
        )}
      </Container>
    </div>
  );
}

export default EditProductPage;
