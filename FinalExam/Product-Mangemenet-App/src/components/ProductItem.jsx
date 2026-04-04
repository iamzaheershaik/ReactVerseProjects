import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/actions/productActionTypes";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete \"" + product.title + "\"?"
    );
    if (confirmed) {
      dispatch(deleteProduct(product.id));
    }
  }

  function handleEdit() {
    navigate("/edit/" + product.id);
  }

  function handleView() {
    navigate("/product/" + product.id);
  }

  return (
    <Card className="h-100 shadow-sm border-0">
      {product.imageUrl && (
        <Card.Img
          variant="top"
          src={product.imageUrl}
          alt={product.title}
          style={{ width: "100%", height: "220px", objectFit: "cover" }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{product.title}</Card.Title>
        <Card.Text className="text-primary fw-bold fs-5">
          ₹{Number(product.price).toFixed(2)}
        </Card.Text>
        <span className="badge bg-secondary mb-2 align-self-start">
          {product.category}
        </span>
        {product.description && (
          <Card.Text className="text-muted small flex-grow-1">
            {product.description.length > 80
              ? product.description.substring(0, 80) + "..."
              : product.description}
          </Card.Text>
        )}
        <div className="d-flex gap-2 mt-auto">
          <Button variant="primary" size="sm" className="flex-grow-1" onClick={handleView}>
            View
          </Button>
          <Button variant="outline-primary" size="sm" className="flex-grow-1" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" className="flex-grow-1" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
