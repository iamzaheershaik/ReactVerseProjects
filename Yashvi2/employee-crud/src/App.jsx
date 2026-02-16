import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap'
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [employees, setEmployees] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [salary, setSalary] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')


  useEffect(() => {
    const savedEmployees = sessionStorage.getItem('employees')
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees))
    }
  }, [])

  
  useEffect(() => {
    sessionStorage.setItem('employees', JSON.stringify(employees))
  }, [employees])

  
  function displayAlert(message, type) {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  
  function clearForm() {
    setName('')
    setEmail('')
    setPhone('')
    setDepartment('')
    setSalary('')
    setIsEditing(false)
    setEditId(null)
  }

  
  function addEmployee() {

    if (name === '' || email === '' || phone === '' || department === '' || salary === '') {
      displayAlert('Please fill all fields!', 'danger')
      return
    }

    
    const newEmployee = {
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
      department: department,
      salary: salary
    }

    const updatedEmployees = [...employees, newEmployee]
    setEmployees(updatedEmployees)

   
    clearForm()
    displayAlert('Employee added successfully!', 'success')
  }


  function deleteEmployee(id) {
    
    const filteredEmployees = employees.filter(emp => emp.id !== id)
    setEmployees(filteredEmployees)
    displayAlert('Employee deleted successfully!', 'warning')
  }

 
  function startEdit(employee) {
    setName(employee.name)
    setEmail(employee.email)
    setPhone(employee.phone)
    setDepartment(employee.department)
    setSalary(employee.salary)
    setIsEditing(true)
    setEditId(employee.id)
  }

  
  function updateEmployee() {
  
    if (name === '' || email === '' || phone === '' || department === '' || salary === '') {
      displayAlert('Please fill all fields!', 'danger')
      return
    }

    
    const updatedEmployees = employees.map(emp => {
      if (emp.id === editId) {
        return {
          id: emp.id,
          name: name,
          email: email,
          phone: phone,
          department: department,
          salary: salary
        }
      }
      return emp
    })

    setEmployees(updatedEmployees)
    clearForm()
    displayAlert('Employee updated successfully!', 'info')
  }

 
  function handleSubmit(e) {
    e.preventDefault()
    
    if (isEditing) {
      updateEmployee()
    } else {
      addEmployee()
    }
  }

  return (
    <div className="app-container">
      <Container className="py-5">
        <h1 className="text-center mb-4 app-title">
          Employee Management System
        </h1>

        {/* Alert */}
        {showAlert && (
          <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}

        <Row>
          {/* Form Section */}
          <Col md={4}>
            <Card className="form-card">
              <Card.Header className="form-header">
                <h5>
                  {isEditing ? (
                    <>
                      <FaEdit className="me-2" />
                      Edit Employee
                    </>
                  ) : (
                    <>
                      <FaPlus className="me-2" />
                      Add Employee
                    </>
                  )}
                </h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="primary" type="submit">
                          <FaSave className="me-2" />
                          Update Employee
                        </Button>
                        <Button variant="secondary" onClick={clearForm}>
                          <FaTimes className="me-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button variant="success" type="submit">
                        <FaPlus className="me-2" />
                        Add Employee
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Table Section */}
          <Col md={8}>
            <Card className="table-card">
              <Card.Header className="table-header">
                <h5>Employee List ({employees.length})</h5>
              </Card.Header>
              <Card.Body>
                {employees.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <p>No employees found. Add your first employee!</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Department</th>
                          <th>Salary</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee, index) => (
                          <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.department}</td>
                            <td>${employee.salary}</td>
                            <td>
                              <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => startEdit(employee)}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteEmployee(employee.id)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
