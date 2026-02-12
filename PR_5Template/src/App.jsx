import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Breadcrumb from './components/Breadcrumb';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import RecentlyViewed from './components/RecentlyViewed';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="App py-3">
      <Container fluid style={{ maxWidth: '1400px' }}>
        <Breadcrumb />
        
        <Row className="mb-4">
          <Col lg={6} md={12} className="mb-4 mb-lg-0">
            <ProductGallery />
          </Col>
          <Col lg={6} md={12}>
            <ProductInfo />
          </Col>
        </Row>

        <ProductTabs />
        
        <RelatedProducts />
        
        <RecentlyViewed />
      </Container>
    </div>
  );
}

export default App;
