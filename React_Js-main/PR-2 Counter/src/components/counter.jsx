import { useState } from "react";
import Button from "./button";

const Countercomp = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-wrapper">
      <div className="counter-left">
        <h1>React JS</h1>
        <h2>Counter App</h2>
      </div>

      <div className="counter-card">
        <h1 className="counter-title">Counter</h1>
        <div className="counter-circle">{count}</div>

        <div className="counter-btns">
          <Button
            name="Increment"
            count={count}
            handelclick={() => setCount(count + 1)}
          />
          <Button
            name="Decrement"
            count={count}
            handelclick={() => setCount(count - 1)}
          />
        </div>

        <button className="counter-reset" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countercomp;
