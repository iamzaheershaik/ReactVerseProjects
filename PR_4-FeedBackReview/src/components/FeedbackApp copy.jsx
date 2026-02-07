import { useState } from "react";

export default function FeedbackApp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    rating: "",
    message: "",
  });
}
const validate = () => {};
const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;
};
return (
  <center>
    <div className="feedback-container">
      <h1>FeedBack_Form</h1>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleSubmit}
        />
        <p className="error">{errors.name}</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleSubmit}
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
      </form>
    </div>
  </center>
);
