import React from "react";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/authActionTypes";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(function (state) {
    return state.auth.user;
  });

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <BsNavbar bg="dark" variant="dark" expand="md" className="shadow-sm">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="fw-bold">
          🛍️ ProductHub
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-navbar" />
        <BsNavbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              View Products
            </Nav.Link>

          </Nav>
          <Nav className="align-items-center">
            {user ? (
              <>
                <span className="text-light me-3 small">
                  Hi, {user.displayName || user.email}
                </span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-light">
                Login
              </Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
