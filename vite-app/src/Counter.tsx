import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // Wenn man den Typen manuell definieren möchte / muss:
  // const [count, setCount] = useState<number>(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}
