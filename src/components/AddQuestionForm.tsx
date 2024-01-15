import React, { useState, useEffect } from "react";
import { QuizQuestion } from "../Data/Data";

type AddQuestionFormProps = {
  onAddQuestion: (newQuestion: QuizQuestion) => void;
};

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  useEffect(() => {
    // Reset the form when the onAddQuestion prop changes
    setTimeout(() => {
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswerIndex(0);
    }, 0);
  }, [onAddQuestion]);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswerIndex(index);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      question,
      options,
      correctAnswerIndex,
    };

    // Call the function passed from the parent to update the state in the parent component
    onAddQuestion(newQuestion);
  };

  return (
    <div>
      <h2>Add Question</h2>
      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>

      <h3>Options:</h3>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            Option {index + 1}:
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </label>
          <label>
            Correct Answer:
            <input
              type="radio"
              checked={correctAnswerIndex === index}
              onChange={() => handleCorrectAnswerChange(index)}
            />
          </label>
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default AddQuestionForm;
