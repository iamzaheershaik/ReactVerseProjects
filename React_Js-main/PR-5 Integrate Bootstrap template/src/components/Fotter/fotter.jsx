import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import "./fotter.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 return (
 <section className="bg-black text-white py-5 pb-5 text-center position-relative"> 
    <Container>
      <Row className="justify-content-center">
        <Col lg={8} md={8} xs={8}>
          <h2 className="fw-semibold mb-3 display-6">
            Sign Up To Our Newsletter!
          </h2>

          <p className="text-secondary mb-4">
            Be The First To Know About New Flavors And More
          </p>

          <Form onSubmit={handleSubmit}>
            <InputGroup className="rounded-pill overflow-hidden">
              <Form.Control
                type="email"
                placeholder="Your Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3 px-4 border-0"
              />
              <Button
                type="submit"
                variant="danger"
                className="px-4 fw-medium"
              >
                Sign Up
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
    <Button
      variant="danger"
      onClick={scrollToTop}
      className="position-absolute bottom-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center"
      style={{ width: "45px", height: "40px" }}
    >
      <FaArrowUp />
    </Button>
  </section>
);

};

export default Footer;
