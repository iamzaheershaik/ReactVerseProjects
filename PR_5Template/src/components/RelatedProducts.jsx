import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const RelatedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Wedding Cake',
      price: 12.00,
      originalPrice: 15.00,
      discount: 7,
      rating: 0,
      image: 'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-13_1080x1080.webp?v=1719561700',
      bgColor: '#E8F5E9'
    },
    {
      id: 2,
      name: 'Sunshine',
      price: 10.00,
      originalPrice: null,
      discount: null,
      rating: 0,
      reviews: 'No reviews',
      image: 'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-4_1080x1080.webp?v=1719561378',
      bgColor: '#FFFDE7'
    },
    {
      id: 3,
      name: 'Sparkling Cherry Pie',
      price: 10.00,
      originalPrice: 12.00,
      discount: 16,
      rating: 0,
      colors: ['#FF69B4', '#000000', '#FFFFFF'],
      image: 'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-11_1080x1080.webp?v=1719561095',
      bgColor: '#FCE4EC'
    },
    {
      id: 4,
      name: 'Sorbet Street Treats',
      price: 10.00,
      originalPrice: 12.00,
      discount: null,
      rating: 0,
      colors: ['#00BCD4', '#4CAF50'],
      sizes: ['S', 'M', 'L'],
      image: 'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-15_1907b866-4b11-4a6d-b22c-c2f44ba8f671_1080x1080.webp?v=1719560476',
      bgColor: '#E1F5FE'
    }
  ];

  return (
    <div className="my-5">
      <h2 className="text-center fw-semibold mb-4">Related Products</h2>
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RelatedProducts;
