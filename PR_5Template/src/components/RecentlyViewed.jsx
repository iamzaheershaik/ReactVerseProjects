import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const RecentlyViewed = () => {
  const products = [
    {
      id: 1,
      name: 'Banana Cream Pudding',
      price: 12.00,
      originalPrice: 15.00,
      discount: 20,
      rating: 0,
      reviews: 'No reviews',
      image: 'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-13-3_1080x1080.webp?v=1719561711',
      bgColor: '#FFE4B5'
    },
    {
      id: 2,
      name: 'Snow Cone Sorbet',
      price: 10.00,
      originalPrice: 12.00,
      discount: 8,
      rating: 0,
      reviews: 'No reviews',
      colors: ['#FF1744', '#2196F3'],
      sizes: ['S', 'M', 'L'],
      image: 'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-15_1907b866-4b11-4a6d-b22c-c2f44ba8f671_1080x1080.webp?v=1719560476',
      bgColor: '#BBDEFB'
    },
      {
      id: 2,
      name: 'Banana Cream Pudding',
      price: 12.00,
      originalPrice: 15.00,
      discount: 20,
      rating: 0,
      reviews: 'No reviews',
      image: 'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-4-2_1080x1080.webp?v=1719561386',
      bgColor: '#FFE4B5'
    },
    {
      id: 4,
      name: 'Snow Cone Sorbet',
      price: 10.00,
      originalPrice: 12.00,
      discount: 8,
      rating: 0,
      reviews: 'No reviews',
      colors: ['#FF1744', '#2196F3'],
      sizes: ['S', 'M', 'L'],
      image: 'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-19_1080x1080.webp?v=1719558435',
      bgColor: '#BBDEFB'
    }
  ];

  return (
    <div className="my-5 pb-5">
      <h2 className="text-center fw-semibold mb-4">Recently Viewed Products</h2>
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

export default RecentlyViewed;
