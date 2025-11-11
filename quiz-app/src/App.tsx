import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Questions from "./pages/Questions";
import Evaluation from "./pages/Evaluation";
import { useState } from "react";

export type Answer = {
  id: number;
  text: string;
};

export type Question = {
  id: number;
  question: string;
  options: Answer[];
  correctAnswerId: number;
};

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { id: 1, text: "Berlin" },
      { id: 2, text: "Madrid" },
      { id: 3, text: "Paris" },
      { id: 4, text: "Rome" },
    ],
    correctAnswerId: 3,
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: [
      { id: 1, text: "3" },
      { id: 2, text: "4" },
      { id: 3, text: "5" },
      { id: 4, text: "22" },
    ],
    correctAnswerId: 2,
  },
];

function App() {
  const [questions] = useState<Question[]>(initialQuestions);
  // Antworten werden in einem JavaScript-Objekt gespeichert, dieses
  // definieren wir als Record mit Frage-IDs als Keys und Antwort-IDs als Values
  const [answers, setAnswers] = useState<Record<number, number | undefined>>(
    {}
  );

  const recordAnswer = (questionId: number, answerId: number) => {
    setAnswers({ ...answers, [questionId]: answerId });
  }

  return (
    <div>
      <nav>
        <h1>Quiz App</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/fragen">Fragen</Link>
          </li>
          <li>
            <Link to="/auswertung">Auswertung</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/fragen" element={<Questions questions={questions} onAnswer={recordAnswer} answers={answers} />} />
        <Route
          path="/auswertung"
          element={<Evaluation questions={questions} answers={answers} />}
        />
      </Routes>
    </div>
  );
}

export default App;
