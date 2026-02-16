import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaUsers, FaEdit, FaTrash, FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';
import generateUniqueId from 'generate-unique-id';
import './App.css';

function App() {

  
  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: ''
  };

 
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [filterDept, setFilterDept] = useState('');
  const [minSalary, setMinSalary] = useState('');

  
  const salaryRegex = /^[1-9]\d*$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Indian format
  const departmentRegex = /^[A-Za-z\s]+$/;

 
  useEffect(() => {
    const saved = sessionStorage.getItem('employees');
    if (saved) setEmployees(JSON.parse(saved));
  }, []);


  useEffect(() => {
    sessionStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const isFormValid = () => {
    if (!Object.values(formData).every(v => v !== '')) {
      alert('All fields required');
      return false;
    }

    if (!salaryRegex.test(formData.salary)) {
      alert('Salary must be positive');
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      alert('Phone must be 10 digits (Indian format)');
      return false;
    }

    if (!departmentRegex.test(formData.department)) {
      alert('Department letters only');
      return false;
    }

    return true;
  };

  
  const addEmployee = () => {
    const newEmployee = { ...formData, id: generateUniqueId() };
    setEmployees(prev => [...prev, newEmployee]);
    alert('Employee added');
  };
 
  const updateEmployee = () => {
    const updated = employees.map(emp =>
      emp.id === editingId ? { ...formData, id: editingId } : emp
    );
    setEmployees(updated);
    setEditingId(null);
    alert('Employee updated');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    editingId ? updateEmployee() : addEmployee();
    setFormData(emptyForm);
  };

  
  const handleEdit = (emp) => {
    setFormData({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      position: emp.position,
      department: emp.department,
      salary: emp.salary
    });
    setEditingId(emp.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  const handleDelete = (id) => {
    if (window.confirm('Delete employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  };

 
  const filteredEmployees = employees.filter(emp => {
    const deptMatch = filterDept ? emp.department === filterDept : true;
    const salaryMatch = minSalary ? Number(emp.salary) >= Number(minSalary) : true;
    return deptMatch && salaryMatch;
  });


  return (
    <div className="app-container">

      {/* HEADER */}
      <div className="app-header">
        <h1><FaUsers /> Employee Management</h1>
        <p>CRUD + Validation + Filtering</p>
      </div>

      {/* FORM */}
      <Card className="mb-4 shadow">
        <Card.Body>
          <h3>{editingId ? 'Edit Employee' : 'Add Employee'}</h3>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}><Form.Control placeholder="Name" name="name" value={formData.name} onChange={handleChange} /></Col>
              <Col md={6}><Form.Control placeholder="Email" name="email" value={formData.email} onChange={handleChange} /></Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}><Form.Control placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} /></Col>
              <Col md={6}><Form.Control placeholder="Position" name="position" value={formData.position} onChange={handleChange} /></Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}><Form.Control placeholder="Department" name="department" value={formData.department} onChange={handleChange} /></Col>
              <Col md={6}><Form.Control type="number" placeholder="Salary" name="salary" value={formData.salary} onChange={handleChange} /></Col>
            </Row>

            <div className="mt-3 d-flex">
              <Button type="submit">
                {editingId ? <><FaSave /> Update</> : <><FaUserPlus /> Add</>}
              </Button>

              {editingId && (
                <Button variant="secondary" onClick={() => { setFormData(emptyForm); setEditingId(null); }}>
                  <FaTimes /> Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* FILTER */}
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Control
                placeholder="Filter by Department"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                placeholder="Minimum Salary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>


      <Card className="shadow">
        <Card.Body>
          <h4>Total: {filteredEmployees.length}</h4>

          {filteredEmployees.length === 0 ? (
            <p>No employees found</p>
          ) : (
            <Row>
              {filteredEmployees.map(emp => (
                <Col key={emp.id} md={6} lg={4} className="mb-3">
                  <Card>
                    <Card.Body>
                      <h5>{emp.name}</h5>
                      <p><strong>Phone:</strong> {emp.phone}</p>
                      <p><strong>Department:</strong> {emp.department}</p>
                      <p><strong>Salary:</strong> ₹{emp.salary}</p>

                     
                      <div style={{ display: 'flex' }}>
                        <Button size="sm" onClick={() => handleEdit(emp)}>
                          <FaEdit /> Edit
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(emp.id)}>
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
