const ReviewCard = ({ data }) => {
  return (
    <>
      <h3>{data.username}</h3>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Rating:</strong> {data.rating} ⭐</p>
      <p>{data.review}</p>
    </>
  );
};

export default ReviewCard;
