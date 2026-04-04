import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Container } from "react-bootstrap";

function PrivateRoute({ children }) {
  const auth = useSelector(function (state) {
    return state.auth;
  });

  // Still checking auth state
  if (!auth.initialized) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Not logged in
  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
