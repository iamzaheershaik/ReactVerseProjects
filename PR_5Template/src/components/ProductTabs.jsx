import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const ProductTabs = () => {
  return (
    <div className="my-5 border-top pt-0">
      <Tabs defaultActiveKey="description" className="mb-4">
        <Tab eventKey="description" title="Description">
          <div className="py-3">
            <p className="mb-3">
              Experience the nostalgic taste of classic banana cream pudding reimagined as a premium dairy-free frozen dessert. 
              Our Banana Cream Pudding features rich banana cream swirled with real banana pieces and topped with fluffy dairy-free whipped cream. 
              Made with Jeni's signature dairy-free base crafted from coconut cream and pea protein, this indulgent treat delivers 
              the smooth, creamy texture you love without any dairy ingredients.
            </p>
            <p className="mb-0">
              Each pint is carefully crafted with high-quality ingredients including ripe bananas, natural vanilla, and a touch of 
              sea salt to enhance the flavors. Perfect for those with dietary restrictions or anyone seeking a delicious plant-based option. 
              Store in your freezer and let it soften for a few minutes before scooping for the perfect consistency.
            </p>
          </div>
        </Tab>

        <Tab eventKey="review" title="Review">
          <div className="py-3">
            <p className="text-muted">No reviews yet. Be the first to share your experience with this product!</p>
          </div>
        </Tab>

        <Tab eventKey="shipping" title="Shipping">
          <div className="py-3">
            <p className="mb-3">
              <strong>Free Standard Shipping</strong> on orders over $50. Orders typically ship within 1-2 business days. 
              Expedited shipping options available at checkout.
            </p>
            <p className="mb-0">
              Please note: This product requires special frozen shipping to maintain quality. We use insulated packaging 
              with dry ice to ensure your ice cream arrives in perfect condition.
            </p>
          </div>
        </Tab>

        <Tab eventKey="return" title="Return">
          <div className="py-3">
            <p className="mb-0">
              We want you to be completely satisfied with your purchase. If you're not happy with your order, 
              please contact us within 7 days of delivery. Due to the nature of frozen products, returns are 
              handled on a case-by-case basis. We may offer a replacement or refund depending on the circumstances.
            </p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
