import React from 'react';
import { Breadcrumb as BSBreadcrumb } from 'react-bootstrap';

const Breadcrumb = () => {
  return (
    <BSBreadcrumb className="py-3">
      <BSBreadcrumb.Item href="#">Home</BSBreadcrumb.Item>
      <BSBreadcrumb.Item href="#">Frozen Yogurt</BSBreadcrumb.Item>
      <BSBreadcrumb.Item active>Banana Cream Pudding</BSBreadcrumb.Item>
    </BSBreadcrumb>
  );
};

export default Breadcrumb;
