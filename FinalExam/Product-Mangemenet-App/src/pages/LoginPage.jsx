import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleSignIn, clearAuthError } from "../store/actions/authActionTypes";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(function (state) {
    return state.auth;
  });

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    dispatch(loginUser(email, password)).then(function () {
      navigate("/");
    });
  }

  function handleGoogleLogin() {
    dispatch(googleSignIn()).then(function () {
      navigate("/");
    });
  }

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>

          {/* Brand */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-1">🛍️ ProductHub</h2>
            <p className="text-muted small mb-0">Sign in to manage your products</p>
          </div>

          {/* Card */}
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">

              {auth.error && (
                <Alert variant="danger" className="py-2 small" dismissible onClose={function () { dispatch(clearAuthError()); }}>
                  {auth.error}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label className="small fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={function (e) { setEmail(e.target.value); }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label className="small fw-semibold">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={function (e) { setPassword(e.target.value); }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={function () { setShowPassword(!showPassword); }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 fw-semibold py-2 mb-3"
                  disabled={auth.loading}
                >
                  {auth.loading ? (
                    <><Spinner animation="border" size="sm" className="me-2" />Signing in…</>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>

              {/* Divider */}
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1 m-0" />
                <span className="text-muted small px-3">OR</span>
                <hr className="flex-grow-1 m-0" />
              </div>

              {/* Google Sign In */}
              <Button
                variant="outline-dark"
                className="w-100 fw-medium py-2"
                onClick={handleGoogleLogin}
                disabled={auth.loading}
              >
                Continue with Google
              </Button>

            </Card.Body>
          </Card>

          <p className="text-center mt-4 text-muted small">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold text-decoration-none">
              Register
            </Link>
          </p>

        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
