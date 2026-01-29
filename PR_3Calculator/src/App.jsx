import { useState } from "react";
import Button from "./components/Button";
import "./App.css";

const App = () => {
  const [expression, setExpression] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setExpression("");
    }
    else if (value === "⌫") {
      setExpression(expression.slice(0, -1));
    }
    else if (value === "=") {
      try {
        setExpression(eval(expression).toString());
      } catch {
        setExpression("Error");
      }
    }
    else {
      const operators = ["/", "*", "-", "+", "%"];
      const lastChar = expression.slice(-1);
      if (operators.includes(value) && operators.includes(lastChar)) {
        return; 
      }
      setExpression(expression + value);
    }
  };
  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", "%", "+", "=",
    "⌫", "C"
  ];

  return (
    <>
      <center>
        <h2 id="title">Calculator With React</h2>
      </center>

      <div className="calculator-wrapper">
        <input
          className="display-screen"
          value={expression}
          readOnly
        />
        <div className="button-grid">
          {buttons.map((b) => (
            <Button key={b} value={b} onClick={handleClick} />
          ))}
        </div>
      </div>
    </>

  );
};

export default App;


