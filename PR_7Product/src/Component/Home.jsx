import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getStorageData, setStorageData } from '../services/storageData';
import { Badge, Button, Card, Col, Container, Row, Form } from "react-bootstrap";

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Load products when page opens
    useEffect(() => {
        const data = getStorageData();
        setProducts(data);
    }, []);

    // Delete a product
    const handleDelete = (id) => {
        const allProducts = getStorageData();
        const updatedProducts = allProducts.filter((item) => item.id !== id);
        setStorageData(updatedProducts);
        setProducts(updatedProducts);
    };

    // Filter products by search
    const filteredProducts = products.filter((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Row className="mb-3 align-items-center">
                <Col md={8}>
                    <h2>📦 All Products</h2>
                </Col>
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="🔍 Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            {filteredProducts.length === 0 ? (
                <Row>
                    <Col className="text-center mt-5">
                        <h5 style={{ color: "gray" }}>
                            No products found. Click "+ Add Product" to get started.
                        </h5>
                    </Col>
                </Row>
            ) : (
                <Row>
                    {filteredProducts.map((product) => (
                        <Col md={4} key={product.id} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={product.image || "https://placehold.co/400x200?text=No+Image"}
                                    alt={product.productName}
                                    style={{ height: "180px", objectFit: "contain", backgroundColor: "#f8f9fa", padding: "8px" }}
                                />
                                <Card.Body>
                                    <Badge bg="primary" className="mb-2">{product.category}</Badge>
                                    <Card.Title>{product.productName}</Card.Title>
                                    <Card.Text className="text-muted" style={{ fontSize: "0.85rem", minHeight: "40px" }}>
                                        {product.description || "No description provided."}
                                    </Card.Text>
                                    <Row className="mb-3">
                                        <Col>
                                            <strong className="text-success">₹ {product.price}</strong>
                                        </Col>
                                        <Col className="text-end">
                                            <span style={{ color: product.stock > 0 ? "green" : "red", fontWeight: "600" }}>
                                                Stock: {product.stock}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button variant="warning" size="sm" className="w-100"
                                                onClick={() => navigate(`/edit-product/${product.id}`)}>
                                                ✏️ Edit
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button variant="danger" size="sm" className="w-100"
                                                onClick={() => handleDelete(product.id)}>
                                                🗑️ Delete
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Home;
