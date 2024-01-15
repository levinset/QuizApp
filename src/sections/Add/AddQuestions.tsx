import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(1);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswerIndex(index);
  };

  const handleAddQuestion = async () => {
    const newQuestion = {
      question,
      options,
      correctAnswerIndex: Number(correctAnswerIndex), // Convert to number
    };

    try {
      // Send the new question to the server
      await axios.post("http://localhost:3001/api/add-question", newQuestion);
      alert("Question added successfully!");

      // Clear the form fields for the next question
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswerIndex(1); // Assuming the first option is the default correct answer
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Error adding question. Please try again.");
    }
  };

  return (
    <div className="h-[100vh] transition-all duration-500 bg-gradient-to-r to-[#E63f23] from-[#8D1656] items-center justify-center flex flex-col">
      <div className=" relative text-white p-8 w-[60vw]  transition-all duration-500 bg-gradient-to-r from-[#E63f23] to-[#8D1656] h-[90vh] rounded-md shadow-lg text-center flex flex-col justify-between items-center content-center  max-sm:h-[100vh] max-sm:w-full max-sm:space-y-0  max-lg:w-full">
        <h2 className="uppercase font-sans bg-text-transient font-bold text-[2rem] max-sm:text-[1.1rem] max-sm:hidden">
          Add Question
        </h2>
        <form>
          <label className=" flex flex-col font-bold ">
            <h1 className=" text-3xl mb-1 max-sm:mb-0">Question:</h1>
            <input
              className="inputField max-sm:px-[4rem]"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>
          <div className=" flex flex-col space-y-2 mt-4 max-sm:mt-0">
            <label className="font-bold">Options:</label>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  className="inputField max-sm:px-4"
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />

                <label className="ml-1 text-lg bg-[#E63F23] rounded-full py-2 px-4 cursor-pointer hover:bg-[#8D1656] ">
                  <input
                    type="radio"
                    checked={
                      correctAnswerIndex !== null &&
                      correctAnswerIndex === index
                    }
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                  <span className="max-sm:hidden">Correct Answer</span>
                </label>
              </div>
            ))}
          </div>
        </form>
        <div className=" flex flex-row space-x-2">
          <button
            className="btn uppercase font-bold text-[1.5rem] hover:bg-[#E63F23] cursor-pointer max-sm:text-[1rem] "
            type="button"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          <Link
            to="/"
            className="btn uppercase font-bold text-[1.5rem] hover:bg-[#E63F23] cursor-pointer max-sm:text-[1rem] "
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
