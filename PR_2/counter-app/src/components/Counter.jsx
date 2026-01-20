import { useEffect, useState } from "react";
import Button from "./Button";
import "./Counter.css";

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Counter | ${count}`;
    }, [count]);

    function increment() {
        setCount((prev) => prev + 1);
    }

    function decrement() {
        setCount((prev) => {
            if (prev > 0) {
                return prev - 1;
            } else {
                return 0;
            }
        });

    }

    function reset() {
        setCount(0);
    }

    return (
        <div className="page">
            <h1 className="title">Counter App</h1>
            <div className="card">
                <div className="count">{count}</div>

                <div className="buttons">
                    <Button onClick={decrement} disabled={count === 0}>−</Button>
                    <Button onClick={increment}>+</Button>
                    <Button onClick={reset}>Reset</Button>
                </div>
            </div>
        </div>
    );
}

export default Counter;







