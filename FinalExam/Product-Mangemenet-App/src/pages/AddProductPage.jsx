import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(function (state) {
    return state.products;
  });

  function handleAdd(data) {
    dispatch(addProduct(data)).then(function () {
      navigate("/");
    });
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4" style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-4">Add New Product</h2>
        <ProductForm
          onSubmit={handleAdd}
          loading={products.loading}
        />
      </Container>
    </div>
  );
}

export default AddProductPage;
