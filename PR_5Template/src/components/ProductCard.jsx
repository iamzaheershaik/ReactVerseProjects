import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { BsStarFill, BsStar, BsHeart, BsEye, BsCart3, BsShuffle } from 'react-icons/bs';
import { BsShare } from 'react-icons/bs';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => 
      i < rating ? (
        <BsStarFill key={i} size={14} className="text-warning" />
      ) : (
        <BsStar key={i} size={14} className="text-muted" />
      )
    );
  };

  return (
    <Card className="border-0 product-card-container">
      {product.discount && (
        <Badge 
          bg="danger" 
          className="position-absolute top-0 start-0 m-2 px-2 py-1"
          style={{ zIndex: 10, borderRadius: '16px', fontSize: '12px' }}
        >
          -{product.discount}%
        </Badge>
      )}

      <div 
        className="product-image-wrapper rounded overflow-hidden mb-3 position-relative"
        style={{ 
          backgroundColor: product.bgColor, 
          aspectRatio: '1/1',
        }}
      >
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
          className="product-card-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
     
        <div className="product-hover-icons">
          <Button 
            variant="light" 
            className="product-icon-btn icon-1"
            size="sm"
          >
            <BsHeart size={16} />
          </Button>
          <Button 
            variant="light" 
            className="product-icon-btn icon-2"
            size="sm"
          >
            <BsEye size={16} />
          </Button>
          <Button 
            variant="light" 
            className="product-icon-btn icon-3"
            size="sm"
          >
            <BsCart3 size={16} />
          </Button>
          <Button 
            variant="light" 
            className="product-icon-btn icon-4"
            size="sm"
          >
            <BsShuffle size={16} />
          </Button>
          <Button 
            variant="light" 
            className="product-icon-btn icon-5"
            size="sm"
          >
            <BsShare size={16} />
          </Button>
        </div>
      </div>

      <Card.Body className="p-0">
        <Card.Title className="h6 mb-2">{product.name}</Card.Title>
        <div className="d-flex align-items-center gap-2 mb-2">
          <div className="d-flex gap-1">
            {renderStars(product.rating)}
          </div>
          {product.reviews && (
            <span className="text-muted small">{product.reviews}</span>
          )}
        </div>
        
        <div className="d-flex align-items-center gap-2 mb-2">
          {product.originalPrice && (
            <span className="text-decoration-line-through text-muted small">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="fw-bold fs-5">${product.price.toFixed(2)}</span>
        </div>

      
        {product.colors && (
          <div className="d-flex gap-2 mb-2">
            {product.colors.map((color, index) => (
              <span 
                key={index} 
                className="color-dot" 
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
        )}

   
        {product.sizes && (
          <div className="d-flex gap-2">
            {product.sizes.map((size, index) => (
              <span key={index} className="size-option">{size}</span>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
