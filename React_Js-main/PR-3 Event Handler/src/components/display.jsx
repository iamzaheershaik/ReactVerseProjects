const Display = ({ value }) => {
  return (
    <div className="display">
      {value || 0}
    </div>
  );
};

export default Display;
