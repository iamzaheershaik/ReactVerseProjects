import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getStorageData, setStorageData } from '../services/storageData';
import { Badge, Button, Card, Col, Container, Row, Form } from "react-bootstrap";

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");

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

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "name-asc") return a.productName.localeCompare(b.productName);
        if (sortOption === "name-desc") return b.productName.localeCompare(a.productName);
        if (sortOption === "price-asc") return Number(a.price) - Number(b.price);
        if (sortOption === "price-desc") return Number(b.price) - Number(a.price);
        if (sortOption === "stock-asc") return Number(a.stock) - Number(b.stock);
        if (sortOption === "stock-desc") return Number(b.stock) - Number(a.stock);
        if (sortOption === "category-asc") return a.category.localeCompare(b.category);
        if (sortOption === "category-desc") return b.category.localeCompare(a.category);
        return 0;
    });

    return (
        <Container>
            <Row className="mb-3 align-items-center">
                <Col md={5}>
                    <h2>📦 All Products</h2>
                </Col>
                <Col md={4} className="mb-2 mb-md-0">
                    <Form.Control
                        type="text"
                        placeholder="🔍 Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="">Sort By...</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="stock-asc">Stock (Low to High)</option>
                        <option value="stock-desc">Stock (High to Low)</option>
                        <option value="category-asc">Category (A-Z)</option>
                        <option value="category-desc">Category (Z-A)</option>
                    </Form.Select>
                </Col>
            </Row>

            {sortedProducts.length === 0 ? (
                <Row>
                    <Col className="text-center mt-5">
                        <h5 style={{ color: "gray" }}>
                            No products found. Click "+ Add Product" to get started.
                        </h5>
                    </Col>
                </Row>
            ) : (
                <Row>
                    {sortedProducts.map((product) => (
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
