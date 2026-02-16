import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaUsers, FaEdit, FaTrash, FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';
import generateUniqueId from 'generate-unique-id';
import './App.css';

function App() {
  // State for all employees
  const [employees, setEmployees] = useState([]);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: ''
  });
  
  
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    const saved = sessionStorage.getItem('employees');
    if (saved) {
      setEmployees(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    sessionStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.position || !formData.department || !formData.salary) {
      alert('Please fill all fields!');
      return;
    }

    if (editingId) {
   
      setEmployees(employees.map(emp => 
        emp.id === editingId ? { ...formData, id: editingId } : emp
      ));
      alert('Employee updated!');
      setEditingId(null);
    } else {

      setEmployees([...employees, { ...formData, id: generateUniqueId() }]);
      alert('Employee added!');
    }
    
 
    setFormData({ name: '', email: '', phone: '', position: '', department: '', salary: '' });
  };

  
  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 
  const handleDelete = (id) => {
    if (window.confirm('Delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      alert('Employee deleted!');
    }
  };

  
  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '', position: '', department: '', salary: '' });
    setEditingId(null);
  };

  return (
    <div className="app-container">
    
      <div className="app-header">
        <h1><FaUsers /> Employee Management</h1>
        <p>Simple CRUD Application with Session Storage</p>
      </div>


      <Card className="mb-4 shadow">
        <Card.Body>
          <h3 className="mb-4">{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Position *</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Enter position"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department *</Form.Label>
                  <Form.Select name="department" value={formData.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary *</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">
                {editingId ? <><FaSave /> Update</> : <><FaUserPlus /> Add Employee</>}
              </Button>
              {editingId && (
                <Button variant="secondary" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

  
      <Card className="shadow">
        <Card.Body>
          <h3 className="mb-4">All Employees ({employees.length})</h3>
          
          {employees.length === 0 ? (
            <div className="text-center py-5">
              <FaUsers size={60} className="text-muted mb-3" />
              <h5>No Employees Found</h5>
              <p className="text-muted">Add your first employee using the form above!</p>
            </div>
          ) : (
            <Row>
              {employees.map((employee) => (
                <Col key={employee.id} md={6} lg={4} className="mb-3">
                  <Card className="h-100 employee-card">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="avatar me-3">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h5 className="mb-0">{employee.name}</h5>
                          <small className="text-primary">{employee.position}</small>
                        </div>
                      </div>
                      
                      <div className="employee-details">
                        <p className="mb-1"><strong>Email:</strong> {employee.email}</p>
                        <p className="mb-1"><strong>Phone:</strong> {employee.phone}</p>
                        <p className="mb-1"><strong>Department:</strong> {employee.department}</p>
                        <p className="mb-1"><strong>Salary:</strong> ${employee.salary}</p>
                        <p className="mb-0"><strong>ID:</strong> {employee.id}</p>
                      </div>
                      
                      <div className="d-flex gap-2 mt-3">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          onClick={() => handleEdit(employee)}
                        >
                          <FaEdit /> Edit
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <FaTrash /> Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
