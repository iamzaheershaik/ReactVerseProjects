import { useState } from "react";

const ReviewForm = ({ onAddReview }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    review: "",
    rating: "",
  });
  const emojiMap = {
    1: "😡",
    2: "😕",
    3: "😐",
    4: "😊",
    5: "🤩",
  };

  const getEmoji = (rating) => emojiMap[rating] || "🙂";

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 5) {
      newErrors.username = "Minimum 5 characters required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter valid email (example@gmail.com)";
    }

    if (!formData.rating) {
      newErrors.rating = "Select rating";
    }

    if (!formData.review.trim()) {
      newErrors.review = "Review required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddReview(formData);
      setFormData({
        username: "",
        email: "",
        review: "",
        rating: "",
      });
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter the username"
      />
      {errors.username && <p className="error-text">{errors.username}</p>}
      <label>Email</label>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="example@gmail.com"
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
      <label>Rating</label>
      <div className="rating-box">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= formData.rating ? "star active" : "star"}
            onClick={() => setFormData({ ...formData, rating: star })}
          >
            ⭐
          </span>
        ))}
        <span className="emoji">{getEmoji(formData.rating)}</span>
      </div>

      {errors.rating && <p className="error-text">{errors.rating}</p>}

      <label>Review</label>
      <textarea name="review" value={formData.review} onChange={handleChange} />
      {errors.review && <p className="error-text">{errors.review}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
