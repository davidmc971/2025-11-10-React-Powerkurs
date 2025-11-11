import type { Question } from "../App";

type EvaluationProps = {
  questions: Question[];
  answers: Record<number, number | undefined>;
};

export default function Evaluation({ questions, answers }: EvaluationProps) {
  return (
    <ul>
      {questions.map((q) => {
        const selectedAnswerId = answers[q.id];

        let selectedAnswerText = "-";
        if (selectedAnswerId != null) {
          const selectedAnswer = q.options.find((opt) => opt.id === selectedAnswerId);
          if (selectedAnswer !== undefined) {
            selectedAnswerText = selectedAnswer.text;
          }
        }

        const correctAnswer = q.options.find((opt) => opt.id === q.correctAnswerId)?.text;

        return (
          <li key={q.id}>
            <h2>{q.question}</h2>
            <p>Your answer: {selectedAnswerText}</p>
            <p>Correct answer: {correctAnswer}</p>
          </li>
        );
      })}
    </ul>
  );
}
