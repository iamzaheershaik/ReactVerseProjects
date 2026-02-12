import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';

const ProductGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-13-1.webp?v=1719561711',
    'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-3-3_1080x1080.webp?v=1719561040',
    'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-15_1907b866-4b11-4a6d-b22c-c2f44ba8f671_1080x1080.webp?v=1719560476',
    'https://wpbingo-jumys.myshopify.com/cdn/shop/files/product-23_1080x1080.webp?v=1719560613',
  ];

  return (
    <div className="d-flex gap-3">
      
      <div className="d-flex flex-column gap-2" style={{ width: '100px' }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`border rounded cursor-pointer ${
              selectedImage === index ? 'thumbnail-active' : 'border-secondary'
            }`}
            style={{ width: '100px', height: '100px', overflow: 'hidden' }}
            onClick={() => setSelectedImage(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-100 h-100 object-fit-cover" />
          </div>
        ))}
      </div>

      
      <div 
        className="flex-grow-1 position-relative rounded d-flex align-items-center justify-content-center"
        style={{ backgroundColor: '#FFE4B5', minHeight: '500px' }}
      >
        <Badge 
          bg="danger" 
          className="position-absolute top-0 end-0 m-3 px-3 py-2 fs-6"
          style={{ borderRadius: '20px' }}
        >
          -20%
        </Badge>
        <img 
          src={images[selectedImage]} 
          alt="Banana Cream Pudding" 
          className="object-fit-contain"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
