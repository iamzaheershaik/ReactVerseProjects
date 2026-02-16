import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./FAQ.css";

const Faq = () => {
  return (
    <Container className="py-5 faq-section">
      <h2 className="fw-bold mb-1">Faqs</h2>
      <p className="text-muted mb-5">
        <a href="/" className="text-decoration-none text-dark">
          Home
        </a>{" "}
        / Faqs
      </p>

      <Row className="g-5">
        {/* Column 1 */}
        <Col lg={6} md={6} sm={12}>
          <h4 className="fw-semibold mb-4">01. The order</h4>

          <h6 className="fw-bold">When do I receive my order?</h6>
          <p className="text-muted">
            When placing the order, a day of shipment is indicated. After the
            order has been placed, the same delivery time will also be stated on
            the order confirmation. It is therefore never possible that during
            the order, the shipping day on the website, is different than on the
            order confirmation.
          </p>

          <h6 className="fw-bold">
            I now see the longer delivery time of (a part of) my order. How can
            I cancel it?{" "}
          </h6>
          <p className="text-muted">
            If the order has a longer delivery time than you had previously
            seen, it is of course possible to cancel (a part of) the order. For
            this you can contact our customer service. They will cancel the
            order for you. The purchase amount will be back on your bank account
            within two working days. When an order has already been shipped, it
            can no longer be cancelled.
          </p>
          <h6 className="fw-bold">
            When will I receive the invoice for my order?{" "}
          </h6>
          <p className="text-muted">
            When you have paid for the order, you will not automatically receive
            an invoice for your order. If you wish to receive an invoice, this
            can be done in two ways.The first way is through your account at our
            store. When you log in to your account you can see your orders and
            download the invoice.
          </p>
        </Col>
        {/* Column 2 */}
        <Col lg={6} md={6} sm={12}>
          <h4 className="fw-semibold mb-4">02. Shipment</h4>

          <h6 className="fw-bold">When do I receive my order?</h6>
          <p className="text-muted">
            When placing the order, a day of shipment is indicated. After the
            order has been placed, the same delivery time will also be stated on
            the order confirmation. It is therefore never possible that during
            the order, the shipping day on the website, is different than on the
            order confirmation.
          </p>

          <h6 className="fw-bold">
            I now see the longer delivery time of (a part of) my order. How can
            I cancel it?
          </h6>
          <p className="text-muted">
            If the order has a longer delivery time than you had previously
            seen, it is of course possible to cancel (a part of) the order. For
            this you can contact our customer service. They will cancel the
            order for you. The purchase amount will be back on your bank account
            within two working days. When an order has already been shipped, it
            can no longer be cancelled.
          </p>

          <h6 className="fw-bold">
            When will I receive the invoice for my order?
          </h6>
          <p className="text-muted">
            When you have paid for the order, you will not automatically receive
            an invoice for your order. If you wish to receive an invoice, this
            can be done in two ways.The first way is through your account at our
            store. When you log in to your account you can see your orders and
            download the invoice.
          </p>
        </Col>

        {/* Column 3 */}
        <Col lg={6} md={6} sm={12}>
          <h4 className="fw-semibold mb-4">03. The order</h4>

          <h6 className="fw-bold">When do I receive my order?</h6>
          <p className="text-muted">
            When placing the order, a day of shipment is indicated. After the
            order has been placed, the same delivery time will also be stated on
            the order confirmation. It is therefore never possible that during
            the order, the shipping day on the website, is different than on the
            order confirmation.
          </p>

          <h6 className="fw-bold">
            I now see the longer delivery time of (a part of) my order. How can
            I cancel it?
          </h6>
          <p className="text-muted">
            If the order has a longer delivery time than you had previously
            seen, it is of course possible to cancel (a part of) the order. For
            this you can contact our customer service. They will cancel the
            order for you. The purchase amount will be back on your bank account
            within two working days. When an order has already been shipped, it
            can no longer be cancelled.
          </p>

          <h6 className="fw-bold">
            When will I receive the invoice for my order?
          </h6>
          <p className="text-muted">
            When you have paid for the order, you will not automatically receive
            an invoice for your order. If you wish to receive an invoice, this
            can be done in two ways.The first way is through your account at our
            store. When you log in to your account you can see your orders and
            download the invoice.
          </p>
        </Col>

        {/* Column 4 */}
        <Col lg={6} md={6} sm={12}>
          <h4 className="fw-semibold mb-4">
            04. Returns, exchanges and complaints
          </h4>

          <h6 className="fw-bold">When do I receive my order?</h6>
          <p className="text-muted">
            When placing the order, a day of shipment is indicated. After the
            order has been placed, the same delivery time will also be stated on
            the order confirmation. It is therefore never possible that during
            the order, the shipping day on the website, is different than on the
            order confirmation.
          </p>
          <h6 className="fw-bold">
            I now see the longer delivery time of (a part of) my order. How can
            I cancel it?
          </h6>
          <p className="text-muted">
            If the order has a longer delivery time than you had previously
            seen, it is of course possible to cancel (a part of) the order. For
            this you can contact our customer service. They will cancel the
            order for you. The purchase amount will be back on your bank account
            within two working days. When an order has already been shipped, it
            can no longer be cancelled.
          </p>
          <h6 className="fw-bold">
            When will I receive the invoice for my order?
          </h6>
          <p className="text-muted">
            When you have paid for the order, you will not automatically receive
            an invoice for your order. If you wish to receive an invoice, this
            can be done in two ways.The first way is through your account at our
            store. When you log in to your account you can see your orders and
            download the invoice.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Faq;
