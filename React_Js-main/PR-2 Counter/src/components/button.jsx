const Button = ({ name, count, handelclick }) => {
  return (
    <button
      onClick={handelclick}
      disabled={name === "Decrement" && count <= 0}
    >
      {name}
    </button>
  );
};

export default Button;