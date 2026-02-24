import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaUsers, FaEdit, FaTrash, FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';
import generateUniqueId from 'generate-unique-id';
import EmployeeCard from './EmployeeCard';
import './App.css';
function App() {


  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    quantity: '',
    imageUrl: ''
  };


  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [filterDept, setFilterDept] = useState('');
  const [minSalary, setMinSalary] = useState('');

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');


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
    const requiredFields = ['name', 'email', 'phone', 'position', 'department', 'salary', 'quantity'];
    const hasEmptyField = requiredFields.some(field => formData[field] === '');

    if (hasEmptyField) {
      alert('All fields required');
      return false;
    }

    if (formData.imageUrl && !formData.imageUrl.startsWith('http')) {
      alert('Please enter a valid image URL starting with http or https');
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
      salary: emp.salary,
      quantity: emp.quantity || '',
      imageUrl: emp.imageUrl || ''
    });
    setEditingId(emp.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleDelete = (id) => {
    if (window.confirm('Delete employee?')) {
      setEmployees(prev => {
        const result = [];
        prev.forEach(emp => {
          if (emp.id !== id) result.push(emp);
        });
        return result;
      });
    }
  };


  const getIntersection = (setA, setB) => {
    const intersection = new Set();
    setA.forEach(item => {
      if (setB.has(item)) intersection.add(item);
    });
    return intersection;
  };

  let activeSet = new Set(employees);

  if (filterDept) {
    const deptSet = new Set();
    employees.forEach(emp => {
      if (emp.department.toLowerCase().includes(filterDept.toLowerCase())) deptSet.add(emp);
    });
    activeSet = getIntersection(activeSet, deptSet);
  }

  if (minSalary) {
    const salarySet = new Set();
    employees.forEach(emp => {
      if (Number(emp.salary) >= Number(minSalary)) salarySet.add(emp);
    });
    activeSet = getIntersection(activeSet, salarySet);
  }

  const sortedEmployees = [];
  const tempSet = new Set(activeSet);

  while (tempSet.size > 0) {
    let extremeItem = null;
    tempSet.forEach(emp => {
      if (!extremeItem) {
        extremeItem = emp;
        return;
      }

      let val1 = emp[sortBy] || '';
      let val2 = extremeItem[sortBy] || '';

      if (sortBy === 'salary' || sortBy === 'quantity') {
        val1 = Number(val1) || 0;
        val2 = Number(val2) || 0;
      } else {
        val1 = String(val1).toLowerCase();
        val2 = String(val2).toLowerCase();
      }

      if (sortOrder === 'asc') {
        if (val1 < val2) extremeItem = emp;
      } else {
        if (val1 > val2) extremeItem = emp;
      }
    });

    sortedEmployees.push(extremeItem);
    tempSet.delete(extremeItem);
  }


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
              <Col md={6}><Form.Control placeholder="Category/Department" name="department" value={formData.department} onChange={handleChange} /></Col>
              <Col md={6}><Form.Control type="number" placeholder="Price/Salary" name="salary" value={formData.salary} onChange={handleChange} /></Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}><Form.Control type="number" placeholder="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} /></Col>
              <Col md={6}><Form.Control type="url" placeholder="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} /></Col>
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

      {/* FILTER AND SORT */}
      <Card className="mb-3">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                placeholder="Filter by Category/Department"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                placeholder="Minimum Price/Salary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="salary">Sort by Price/Salary</option>
                <option value="quantity">Sort by Quantity</option>
                <option value="department">Sort by Category/Dept</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>


      <Card className="shadow">
        <Card.Body>
          <h4>Total: {sortedEmployees.length}</h4>

          {sortedEmployees.length === 0 ? (
            <p>No items found</p>
          ) : (
            <Row>
              {sortedEmployees.map(emp => (
                <EmployeeCard
                  key={emp.id}
                  emp={emp}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

    </div>
  );
}

export default App;
