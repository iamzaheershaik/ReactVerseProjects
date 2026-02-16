import { useState, useEffect } from "react";
import "./App.css";
import ReviewForm from "./components/reviewform";
import ReviewCard from "./components/reviewcard";

function App() {
  useEffect(() => {
    document.title = "Comment/Review";
  }, []);
  const [reviews, setReviews] = useState([]);

  const addReview = (reviewData) => {
    setReviews([...reviews, reviewData]);
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Review Form</h2>
      <div className="form-section">
        <ReviewForm onAddReview={addReview} />
      </div>
      <div className="card-section">
        {reviews.map((item, index) => (
          <ReviewCard key={index} data={item} />
        ))}
      </div>
    </>
  );
}

export default App;
