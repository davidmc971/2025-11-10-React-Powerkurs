import type { Question } from "../App";

type QuestionsProps = {
  questions: Question[];
  onAnswer: (questionId: number, answerId: number) => void;
  answers: Record<number, number | undefined>;
};

export default function Questions({ questions, onAnswer, answers }: QuestionsProps) {
  const handleAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: number,
    answerId: number
  ) => {
    if (event.target.checked) {
      onAnswer(questionId, answerId);
    }
  };

  return (
    <ul>
      {questions.map((q) => (
        <li key={q.id}>
          <h2>{q.question}</h2>
          <ul style={{ display: "flex", flexDirection: "column" }}>
            {q.options.map((option) => (
              <span key={option.id}>
                <input
                  type="radio"
                  key={option.id}
                  onChange={(e) => handleAnswer(e, q.id, option.id)}
                  name={"question_" + q.id}
                  checked={answers[q.id] === option.id}
                />
                <label key={option.id}>{option.text}</label>
              </span>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
