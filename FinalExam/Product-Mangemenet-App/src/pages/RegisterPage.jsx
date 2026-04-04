import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthError } from "../store/actions/authActionTypes";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(function (state) {
    return state.auth;
  });

  function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    dispatch(registerUser(name, email, password)).then(function () {
      navigate("/");
    });
  }

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>

          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-1">🛍️ ProductHub</h2>
            <p className="text-muted small mb-0">Create your account</p>
          </div>

          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">

              {auth.error && (
                <Alert variant="danger" className="py-2 small" dismissible onClose={function () { dispatch(clearAuthError()); }}>
                  {auth.error}
                </Alert>
              )}

              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="registerName">
                  <Form.Label className="small fw-semibold">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={function (e) { setName(e.target.value); }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerEmail">
                  <Form.Label className="small fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={function (e) { setEmail(e.target.value); }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label className="small fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={function (e) { setPassword(e.target.value); }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 fw-semibold py-2"
                  disabled={auth.loading}
                >
                  {auth.loading ? (
                    <><Spinner animation="border" size="sm" className="me-2" />Creating account…</>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Form>

            </Card.Body>
          </Card>

          <p className="text-center mt-4 text-muted small">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">
              Sign In
            </Link>
          </p>

        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
