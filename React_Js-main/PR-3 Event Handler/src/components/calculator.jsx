import { useState } from "react";
import Button from "./clcbutton";
import Display from "./display";

const Calculator = () => {
  const [input, setInput] = useState("");

  const operators = ["+", "-", "*", "/"];

  const handleClick = (value) => {
    value === "DEL"
      ? input
        ? setInput(input.slice(0, -1))
        : null
      : value === "C"
        ? setInput("")
        : value === "="
          ? input && !operators.includes(input.slice(-1))
            ? setInput(eval(input).toString())
            : null
          : operators.includes(value)
            ? input && !operators.includes(input.slice(-1))
              ? setInput(input + value)
              : null
            : setInput(input + value);
  };

  return (
    <div className="app">
      <div className="calc-wrapper">
        <div className="calc-header">calc</div>

        <Display value={input} />

        <div className="calc-grid">
          {[
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "*",
            "1",
            "2",
            "3",
            "-",
            ".",
            "0",
            "=",
            "+",
            "C",
            "DEL",
          ].map((btn) => (
            <Button key={btn} value={btn} onClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
