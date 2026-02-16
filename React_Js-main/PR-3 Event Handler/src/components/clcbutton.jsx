const Button = ({ value, onClick }) => {

  const btnClass =
    value === "C"
      ? "calc-btn btn-dark btn-wide"
      : value === "DEL"
      ? "calc-btn btn-del"
      : value === "="
      ? "calc-btn btn-equal"
      : ["+", "-", "*", "/"].includes(value)
      ? "calc-btn operator"
      : "calc-btn";     

  return (
    <button
      className={btnClass}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;

