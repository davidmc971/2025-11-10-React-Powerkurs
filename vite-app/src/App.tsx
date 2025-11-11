import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // Alternativ:
  // const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  //   console.log(event.target.value);
  // };

  return (
    <div>
      <h1>Welcome to the Vite + React App</h1>
      <input
        type="text"
        onChange={handleInput}
        placeholder="Type something..."
        value={text}
      />
      <p>You typed: {text}</p>
    </div>
  );
}

export default App;
