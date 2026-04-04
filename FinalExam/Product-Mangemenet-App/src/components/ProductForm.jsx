import React, { useState } from "react";
import { Form, Button, Card, Spinner, Alert, Image } from "react-bootstrap";
import uploadImageToCloudinary from "../utils/cloudinary";

function ProductForm({ initialData, onSubmit, loading }) {
  const defaults = initialData || {};

  const [state, setState] = useState({
    title: defaults.title || "",
    price: defaults.price || "",
    category: defaults.category || "",
    description: defaults.description || "",
    imageUrl: defaults.imageUrl || "",
    imageFile: null,
    uploading: false,
    error: "",
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setState({
        ...state,
        imageFile: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ ...state, error: "" });

    if (!state.title || !state.price || !state.category) {
      setState({ ...state, error: "Title, Price and Category are required." });
      return;
    }

    let finalImageUrl = state.imageUrl;

    // Upload new image if selected
    if (state.imageFile) {
      try {
        setState({ ...state, uploading: true });
        finalImageUrl = await uploadImageToCloudinary(state.imageFile);
        setState({ ...state, uploading: false });
      } catch (err) {
        setState({ ...state, uploading: false, error: "Image upload failed: " + err.message });
        return;
      }
    }

    onSubmit({
      title: state.title,
      price: state.price,
      category: state.category,
      description: state.description,
      imageUrl: finalImageUrl,
    });
  }

  const isLoading = loading || state.uploading;

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        {state.error && (
          <Alert variant="danger" dismissible onClose={function () { setState({ ...state, error: "" }); }}>
            {state.error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="productTitle">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Product name"
              value={state.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label className="fw-semibold">Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="0.00"
              value={state.price}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select
              name="category"
              value={state.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              placeholder="Optional description"
              value={state.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label className="fw-semibold">Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          {/* Image preview */}
          {state.imageUrl && (
            <div className="mb-3">
              <Image
                src={state.imageUrl}
                alt="Preview"
                thumbnail
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-100 fw-semibold py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {state.uploading ? "Uploading image..." : "Saving..."}
              </>
            ) : (
              initialData ? "Update Product" : "Add Product"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProductForm;
