import React, { useState, useEffect } from 'react';
import { Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { BsClock, BsFire, BsCheckCircle, BsHeart, BsShare } from 'react-icons/bs';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdCompare } from 'react-icons/md';

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [viewersCount, setViewersCount] = useState(31);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount(prev => Math.floor(Math.random() * 20) + 25);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="ps-lg-4">
      {/* Product Title */}
      <h1 className="fw-semibold mb-3">Banana Cream Pudding</h1>

      {/* Pricing */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className="text-decoration-line-through text-muted fs-5">$15.00</span>
        <span className="fw-bold fs-2">$12.00</span>
      </div>

      {/* Stats */}
      <div className="d-flex flex-column gap-2 mb-4">
        <div className="d-flex align-items-center gap-2 text-secondary small">
          <BsClock size={16} />
          <span>{viewersCount} people are viewing this right now</span>
        </div>
        <div className="d-flex align-items-center gap-2 small" style={{ color: '#ff4081' }}>
          <BsFire size={16} />
          <span>34 sold in last 19 hours</span>
        </div>
        <div className="d-flex align-items-center gap-2 text-success small">
          <BsCheckCircle size={16} />
          <span>In stock</span>
        </div>
      </div>

      
      <div className="d-flex gap-2 mb-3">
        <InputGroup style={{ width: '140px' }}>
          <Button 
            variant="outline-secondary" 
            onClick={() => handleQuantityChange('decrease')}
          >
            −
          </Button>
          <Form.Control 
            type="text" 
            value={quantity} 
            readOnly 
            className="text-center"
          />
          <Button 
            variant="outline-secondary" 
            onClick={() => handleQuantityChange('increase')}
          >
            +
          </Button>
        </InputGroup>

        <Button variant="dark" className="flex-grow-1">
          Add To Cart
        </Button>

        <Button variant="outline-dark">
          <BsHeart size={20} />
        </Button>
      </div>

   
      <Form.Check 
        type="checkbox"
        id="terms-check"
        label={
          <>
            I agree with the <a href="#" className="text-dark">terms and conditions</a>
          </>
        }
        checked={agreedToTerms}
        onChange={(e) => setAgreedToTerms(e.target.checked)}
        className="mb-3 small"
      />


      <Button variant="outline-dark" className="w-100 mb-4">
        Buy It Now
      </Button>

      
      <div className="d-flex gap-3 mb-4 pb-4 border-bottom flex-wrap">
        <Button variant="link" className="text-secondary text-decoration-none p-0 small">
          <MdCompare size={18} className="me-1" />
          Compare
        </Button>
        <Button variant="link" className="text-secondary text-decoration-none p-0 small">
          <HiOutlineQuestionMarkCircle size={18} className="me-1" />
          Question
        </Button>
        <Button variant="link" className="text-secondary text-decoration-none p-0 small">
          <TbTruckDelivery size={18} className="me-1" />
          Shipping info
        </Button>
        <Button variant="link" className="text-secondary text-decoration-none p-0 small">
          <BsShare size={18} className="me-1" />
          Share
        </Button>
      </div>

     
      <div className="bg-light rounded p-3 mb-4 d-flex gap-3">
        <BsCheckCircle size={24} className="text-success flex-shrink-0" />
        <div>
          <p className="mb-1 small">
            Pickup available at <strong>Alaska</strong>
          </p>
          <p className="mb-1 small text-secondary">Usually ready in 24 hours</p>
          <a href="#" className="small text-dark">Check availability at other stores</a>
        </div>
      </div>

     
      <div className="bg-light rounded p-3">
        <p className="text-center fw-semibold mb-3 small">Guaranteed Checkout</p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {['Mastercard', 'Apple Pay', 'Visa', 'Amex', 'PayPal', 'Klarna', 'Clearpay'].map((method, idx) => (
            <Badge 
              key={idx} 
              bg="secondary" 
              className="px-2 py-1"
              style={{ fontSize: '10px' }}
            >
              {method}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
