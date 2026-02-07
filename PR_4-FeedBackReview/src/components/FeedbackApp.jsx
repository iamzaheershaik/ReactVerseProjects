import { useState, useEffect } from "react";
import "./FeedbackApp.css";
export default function FeedbackApp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    rating: "0",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    console.log("Feedbacks updated:", feedbacks);
  }, [feedbacks]);

  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Valid email required";
    if (form.age < 10 || form.age > 100)
      err.age = "Age must be between 10 and 100";
    if (Number(form.rating) < 1)
      err.rating = "Please select rating";
    if (form.message.trim().length < 5)
      err.message = "Minimum 5 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editId) {
      setFeedbacks(
        feedbacks.map(item =>
          item.id === editId ? { ...form, id: editId } : item
        )
      );
      setEditId(null);
    } else {
      setFeedbacks([
        ...feedbacks,
        { ...form, id: Date.now() }
      ]);
    }

    setForm({
      name: "",
      email: "",
      age: "",
      rating: "0",
      message: ""
    });
    setErrors({});
  };

  const editFeedback = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const deleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter(item => item.id !== id));
  };

  return (
    <center>
          <div className="feedback-container">
      <h2>Feedback Form</h2>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <p className="error">{errors.name}</p>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <p className="error">{errors.email}</p>

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <p className="error">{errors.age}</p>

        <select name="rating" value={form.rating} onChange={handleChange}>
          <option value="0">Select Rating</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <p className="error">{errors.rating}</p>

        <textarea
          name="message"
          placeholder="Your feedback"
          value={form.message}
          onChange={handleChange}
        />
        <p className="error">{errors.message}</p>

        <button type="submit">
          {editId ? "Update Feedback" : "Submit Feedback"}
        </button>
      </form>

      {feedbacks.map(item => (
        <div className="feedback-item" key={item.id}>
          <h4>
            {item.name} ({item.rating}⭐)
          </h4>
          <p>{item.message}</p>
          <button onClick={() => editFeedback(item)}>Edit</button>
          <button onClick={() => deleteFeedback(item.id)}>Delete</button>
        </div>
      ))}
    </div>
    </center>
  );  
}