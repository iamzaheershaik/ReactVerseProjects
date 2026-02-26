import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-4 py-3">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                    🛒 Quick Commerce
                </Navbar.Brand>
                <Link to="/add-product" className="btn btn-success">
                    + Add Product
                </Link>
            </Container>
        </Navbar>
    );
};

export default Header;
