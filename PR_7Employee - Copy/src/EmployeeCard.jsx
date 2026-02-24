import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeCard = ({ emp, handleEdit, handleDelete }) => {
    return (
        <Col md={6} lg={4} className="mb-3">
            <Card>
                <Card.Body>
                    {emp.imageUrl && (
                        <div className="text-center mb-3">
                            <img src={emp.imageUrl} alt={emp.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                    )}
                    <h5>{emp.name}</h5>
                    <p><strong>Phone:</strong> {emp.phone}</p>
                    <p><strong>Category/Department:</strong> {emp.department}</p>
                    <p><strong>Price/Salary:</strong> ₹{emp.salary}</p>
                    {emp.quantity && <p><strong>Quantity:</strong> {emp.quantity}</p>}

                    <div style={{ display: 'flex' }}>
                        <Button size="sm" onClick={() => handleEdit(emp)}>
                            <FaEdit /> Edit
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(emp.id)} className="ms-2">
                            <FaTrash /> Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default EmployeeCard;
