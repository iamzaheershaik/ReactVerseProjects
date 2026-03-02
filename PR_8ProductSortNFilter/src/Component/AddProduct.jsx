import { useState } from "react";
import { getStorageData, setStorageData } from '../services/storageData';
import { useNavigate } from 'react-router';
import generateUniqueId from 'generate-unique-id';
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const AddProduct = () => {
    const navigate = useNavigate();

    const initialState = {
        productName: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: ''
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { ...formData, id: generateUniqueId({ length: 8 }) };
        const allProducts = getStorageData();
        allProducts.push(newProduct);
        setStorageData(allProducts);
        setFormData(initialState);
        navigate("/");
    };

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Button variant="secondary" onClick={() => navigate("/")}>← Back</Button>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={7}>
                    <div className="p-4 border rounded bg-white shadow-sm">
                        <h3 className="mb-4">➕ Add New Product</h3>
                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control type="text" name="image" placeholder="https://example.com/image.jpg"
                                    value={formData.image} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" name="productName" placeholder="e.g. Amul Butter 500g"
                                    value={formData.productName} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Price (₹)</Form.Label>
                                <Form.Control type="number" name="price" placeholder="e.g. 99"
                                    value={formData.price} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select name="category" value={formData.category} onChange={handleChange}>
                                    <option value="">-- Select Category --</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Snacks">Snacks</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Pharmacy">Pharmacy</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Personal Care">Personal Care</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Stock Quantity</Form.Label>
                                <Form.Control type="number" name="stock" placeholder="e.g. 50"
                                    value={formData.stock} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" placeholder="Short product description..."
                                    value={formData.description} onChange={handleChange} />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Button type="submit" variant="success" className="w-100">✅ Add Product</Button>
                                </Col>
                                <Col>
                                    <Button variant="outline-secondary" className="w-100" onClick={() => navigate("/")}>Cancel</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;
