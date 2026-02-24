# Let's Look at `EmployeeCard.jsx`! 🌟

This file is like a blueprint for making a single "Employee ID Card". Imagine you have a magical toy factory, and this blueprint tells the magical machine exactly how to draw one employee's card with their picture and details.

---

### The Beginning: We Need Tools! 🛠️
```javascript
import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
```
*   **Line 1**: We're inviting our best friend **React** to help us build this. React is the main boss of building web pages!
*   **Line 2**: We're borrowing some legos from a toy box called **react-bootstrap**. We need a `Card` (to look like a real ID card), a `Button` (to click), and a `Col` (which is like drawing a column box so we can put cards next to each other).
*   **Line 3**: We're getting some cool stickers (icons) from a sticker book called `react-icons`. We got a little pencil sticker (`FaEdit`) and a little trash can sticker (`FaTrash`).

---

### The Blueprint Factory 🏭
```javascript
const EmployeeCard = ({ emp, handleEdit, handleDelete }) => {
```
*   **Line 5**: We're creating our new magical blueprint and naming it `EmployeeCard`. 
*   It takes a secret package with three special instructions inside: 
    *   `emp`: A giant bag of details about ONE person (their name, picture, etc.).
    *   `handleEdit`: A magic spell to change the person's info when we click the edit button.
    *   `handleDelete`: A magic spell to make the card poof and disappear!

---

### Drawing the Card 🖍️
```javascript
  return (
    <Col md={6} lg={4} className="mb-3">
```
*   **Line 6**: `return` means "Here is the finished toy!". Inside the parenthesis `()` is what the toy looks like.
*   **Line 7**: We put our toy inside a `Col` column box. `md={6} lg={4}` is our way of telling the computer: "If the screen is big, put 3 cards in a row. If it's medium, put 2 cards in a row".

```javascript
      <Card>
        <Card.Body>
```
*   **Line 8**: We're putting down the blank `Card`.
*   **Line 9**: `Card.Body` is the soft inside of the card where we actually write the person's info.

---

### The Picture Time! 📸
```javascript
          {emp.imageUrl && (
            <div className="text-center mb-3">
              <img src={emp.imageUrl} alt={emp.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
          )}
```
*   **Line 10**: This says, "IF the person actually gave us a picture toy piece (`emp.imageUrl`), then do what's next!"
*   **Line 11-13**: We make a little `div` box, put an `img` (image) inside, make it exactly 100 pixels wide and tall, and use magic (`borderRadius: '50%'`) to turn the square picture into a perfect circle!

---

### Writing the Details ✍️
```javascript
          <h5>{emp.name}</h5>
          <p><strong>Phone:</strong> {emp.phone}</p>
          <p><strong>Category/Department:</strong> {emp.department}</p>
          <p><strong>Price/Salary:</strong> ₹{emp.salary}</p>
          {emp.quantity && <p><strong>Quantity:</strong> {emp.quantity}</p>}
```
*   **Line 15**: Use a big `<h5>` marker to write the employee's name (`emp.name`). 
*   **Line 16-19**: Use little `<p>` crayons to write their phone number, department, and salary. `<strong>` makes the text extra thick so we notice it! Wait, we also check "IF we have a quantity, write that down too!".

---

### The Magic Clicky Buttons! 🔘
```javascript
          <div style={{ display: 'flex' }}>
            <Button size="sm" onClick={() => handleEdit(emp)}>
              <FaEdit /> Edit
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleDelete(emp.id)} className="ms-2">
              <FaTrash /> Delete
            </Button>
          </div>
```
*   **Line 21**: Make a box to hold our buttons side-by-side (`display: 'flex'`).
*   **Line 22-24**: The "Edit" button. When someone pokes it (`onClick`), it shouts to the big boss: "Hey! We want to edit this person (`emp`)!" and it shows the pencil sticker (`<FaEdit />`).
*   **Line 25-27**: The "Delete" button. It's painted red (`variant="danger"`). When poked, it shouts: "Make person ID `emp.id` disappear!" and shows the trash can sticker.

---

### Packing it Up 📦
```javascript
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EmployeeCard;
```
*   **Line 29-33**: Closing all the boxes we opened (`</Card.Body>`, `</Card>`, `</Col>`).
*   **Line 35**: `export default EmployeeCard;` is our way of putting this finished blueprint out in the hallway so `App.jsx` can find it and use it!


---
---


# Let's Look at `App.jsx`! 🌟

This is the Big Boss App. It's like the main control room of our space station where everything happens!

---

### Getting the Tools Ready
```javascript
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaUsers, FaEdit, FaTrash, FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';
import generateUniqueId from 'generate-unique-id';
import EmployeeCard from './EmployeeCard';
import './App.css';
```
*   **Line 1**: We grab `useState` (a magic pocket to remember things) and `useEffect` (a magic alarm clock to do things when the app turns on) from React.
*   **Line 2-3**: Borrowing row boxes, columns, forms (to type in), and buttons from the `react-bootstrap` legos, and our stickers from `react-icons`.
*   **Line 4**: We got a magic stamp `generate-unique-id` that gives every new person a completely random, super unique secret name so we never confuse two people!
*   **Line 5**: Oh look! Here is our blueprint `EmployeeCard` that we just made. We're bringing it into the control room so we can make copies of it!
*   **Line 6**: Bringing our paint bucket (`App.css`) to make things pretty.

---

### Starting the Big Boss Factory
```javascript
function App() {
  const emptyForm = {
    name: '', email: '', phone: '', position: '', department: '', salary: '', quantity: '', imageUrl: ''
  };
```
*   **Line 7**: Welcome to the big `App` function!
*   **Line 10-19**: Imagine an empty piece of paper with blank boxes on it. This is our `emptyForm`. We use it when we want to start adding a brand new person.

---

### The Magic Memory Pockets (State) 🧠
```javascript
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [filterDept, setFilterDept] = useState('');
  const [minSalary, setMinSalary] = useState('');
  
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
```
*   **Line 22**: We create a pocket called `employees` to remember everyone in the factory. At the beginning, it's totally empty `[]`. `setEmployees` is the only spell we can use to put new people in the pocket.
*   **Line 23**: A pocket `formData` to remember what the user is typing into the boxes right now!
*   **Line 24**: `editingId` remembers *who* we are trying to edit right now. If we aren't editing anyone, it's `null` (nothing).
*   **Line 26-30**: These are pockets to remember what the user wants to search for (filters) and how they want to organize the cards (sorting, like putting them in alphabetical order).

---

### The Robot Guards 🤖
```javascript
  const salaryRegex = /^[1-9]\d*$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Indian format
  const departmentRegex = /^[A-Za-z\s]+$/;
```
*   **Line 33-35**: These are little invisible guards called "Regex". They check if things look right. The `phoneRegex` checks: "Does this look exactly like an Indian phone number?". If not, it says Nuh-uh!

---

### The Magic Alarm Clocks ⏰
```javascript
  useEffect(() => {
    const saved = sessionStorage.getItem('employees');
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);
```
*   **Line 38-41**: When you first open the app, this alarm clock goes off. It checks `sessionStorage` (a secret hiding spot in the browser) and says "Did we leave some employees in here from earlier?". If yes, it loads them up so they don't disappear when you refresh!
*   **Line 44-46**: EVERY single time the list of `employees` changes (someone is added or deleted), this 2nd alarm saves the new list into the `sessionStorage` hiding spot.

---

### Writing on the Form 🖊️
```javascript
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
```
*   **Line 49-52**: Whenever the user types a single letter into anywhere on the form, this runs. It says: "Grab all the things we previously had (`...prev`), and just change the exact box they are typing into (`[name]: value`)". 

---

### The Ultimate Checkpoint! 🚔
```javascript
  const isFormValid = () => {
    const requiredFields = ['name', 'email', 'phone', 'position', 'department', 'salary', 'quantity'];
    const hasEmptyField = requiredFields.some(field => formData[field] === '');

    if (hasEmptyField) { alert('All fields required'); return false; }
    // ... we also use the Robot Guards (Regex) here to check other things ...
    return true;
  };
```
*   **Line 55-85**: Before we let a person into our factory, we send them to this checkpoint. It checks: "Did they leave any boxes completely blank?". If they did, pop up a big scary `alert` telling them so. It also uses the robot guards from earlier. If everything is perfect, it says `true` (You may pass!).

---

### Creating and Fixing People 🧙‍♂️
```javascript
  const addEmployee = () => {
    const newEmployee = { ...formData, id: generateUniqueId() };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = () => {
    const updated = employees.map(emp =>
      emp.id === editingId ? { ...formData, id: editingId } : emp
    );
    setEmployees(updated);
    setEditingId(null);
  };
```
*   **Line 88**: Time to add a new person! We take whatever is in the `formData`, stick a brand new unique ID sticker on it, and toss them into the `employees` pocket.
*   **Line 94**: Time to fix a person! We look at every single person (`map`). If it's the guy we are trying to edit (`editingId`), we swap out his old info for the new `formData`. Otherwise, leave the other people alone!

---

### The Big Green Button! 🛑
```javascript
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    editingId ? updateEmployee() : addEmployee();
    setFormData(emptyForm);
  };
```
*   **Line 104**: When you click the Add/Update button, this runs.
*   `e.preventDefault()` stops the web page from magically refreshing completely (which browsers love to do).
*   It asks the checkpoint `isFormValid`. If they pass, it checks: "Are we fixing an old guy, or adding a new guy?". 
*   Finally, it gives you a fresh blank paper (`emptyForm`).

---

### Edit and Delete Helpers 🛠️
```javascript
  const handleEdit = (emp) => {
    setFormData({ name: emp.name, ... });
    setEditingId(emp.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete employee?')) {
      setEmployees(prev => {
        const result = [];
        prev.forEach(emp => { if (emp.id !== id) result.push(emp); });
        return result;
      });
    }
  };
```
*   **Line 113**: When you click Edit on a card, it takes that person's info and copies it directly into the type-in boxes (`setFormData`), so you can change it!
*   **Line 129**: When you click Delete on a card, a big pop-up asks "Are you sure??". If you click Yes, it takes everyone out of the pocket one by one. If they are the person getting deleted, we throw them away. If they aren't, we put them in a `result` group. Then the `result` group becomes the new official employee list!

---

### The Secret Set Sorting Game 🗃️
*(This part is a little tricky, so pay close attention!)*

```javascript
  const getIntersection = (setA, setB) => {
    const intersection = new Set();
    setA.forEach(item => { if (setB.has(item)) intersection.add(item); });
    return intersection;
  };
```
*   **Line 142**: Imagine two circles drawn on the floor. If you stand in both circles at the exact same time where they overlap, that's an `Intersection`! This magic spell finds the toys that are in BOTH groups!

```javascript
  let activeSet = new Set(employees);

  if (filterDept) {
    const deptSet = new Set();
    // ... add matching toys to deptSet ...
    activeSet = getIntersection(activeSet, deptSet);
  }
```
*   **Line 150-166**: We take everyone in the factory and put them on a giant mat (`activeSet`).
*   If we typed in a Department, we make a smaller mat (`deptSet`) and put only people from that department on it.
*   Then we use our `Intersection` spell! The new active group is *only* the people who were on BOTH the giant mat and the smaller department mat! (We do the same for Salary!).

```javascript
  const sortedEmployees = [];
  const tempSet = new Set(activeSet);

  while (tempSet.size > 0) {
    let extremeItem = null;
    tempSet.forEach(emp => {
      // Find the biggest (or smallest) toy in the group
    });
    sortedEmployees.push(extremeItem);
    tempSet.delete(extremeItem);
  }
```
*   **Line 168-199**: Now we have to organize them! Imagine a pile of numbered blocks (`tempSet`). 
*   We look through the *entire* pile, figure out which block is the absolute biggest (`extremeItem`). We grab it, put it neatly in a row (`sortedEmployees.push`), and delete it from the messy pile (`tempSet.delete`). 
*   We keep doing this over and over until the pile is empty. Yay, organized!

---

### Drawing the Beautiful Control Room 🎨
```javascript
  return (
    <div className="app-container">
      {/* HEADER */} ...
      {/* FORM */} ...
      {/* FILTER AND SORT */} ...
```
*   **Line 202+**: Everything inside `return` is what you physically see on your screen! It's just HTML drawing boxes for the Top header text, the big Form where you type, and the Filter/Sorting dropdown boxes. We hook all of those typing-boxes up to our `handleChange`, `setSortBy`, etc... so the magic pockets update when you click!

```javascript
          {sortedEmployees.length === 0 ? (
            <p>No items found</p>
          ) : (
            <Row>
              {sortedEmployees.map(emp => (
                <EmployeeCard key={emp.id} emp={emp} handleEdit={handleEdit} handleDelete={handleDelete} />
              ))}
            </Row>
          )}
```
*   **Line 296**: At the very bottom, it looks at our very neatly organized line of toys (`sortedEmployees`). 
*   If the line is totally empty (`length === 0`), it draws a sad text: "No items found".
*   If we HAVE toys, it goes through every single person in the line (`.map`), and creates a brand new `EmployeeCard` (the blueprint we learned about first!!), and tapes that person's exact details to it! It hands them the magic Edit and Delete buttons too!

```javascript
export default App;
```
*   **Line 317**: We export the whole Big Boss control room out into the real world, so when you start your app with `npm run dev`, it actually exists on your computer! 

🎉 **THE END! GOOD JOB!** 🎉
