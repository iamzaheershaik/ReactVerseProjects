const Button = ({ value, onClick }) => {
  const isOperator = ["=", "+", "-", "*", "/", "C", "⌫"].includes(value);

  return (
    <button
      className={`btn ${isOperator ? "orange-btn" : ""}`} 
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;

