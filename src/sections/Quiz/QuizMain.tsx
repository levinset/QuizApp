import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonMain from "../../components/ButtonMain";
import ButtonOption from "../../components/ButtonOption";
import GradientProgressBar from "../../components/ProgressBar";
import TimeBar from "../../components/TimeBar";
import axios from "axios";

interface QuizMainProps {
  // Add any props if needed
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

const QuizMain: React.FC<QuizMainProps> = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeBarActive, setTimeBarActive] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const nameParam = new URLSearchParams(location.search).get("name");
    setName(nameParam);
  }, [location.search]);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/questions");
      const fetchedQuestions = response.data;
      setQuestions(fetchedQuestions);
      setUserAnswers(Array(fetchedQuestions.length).fill(null));
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleFetchError = (error) => {
    setError(error);
    // Add additional error handling logic if needed
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex !== null) {
      const isCorrect =
        selectedOptionIndex ===
        questions[currentQuestionIndex].correctAnswerIndex;

      setIsAnswered(true);
      setTimeBarActive(true);

      setTimeout(
        () => {
          if (currentQuestionIndex === questions.length - 1) {
            // If this is the last question, show the result directly
            setShowResult(true);
            setTimeBarActive(false);
            setCorrectAnswers((prev) => [...prev, isCorrect ? 1 : 0]);
          } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOptionIndex(null);
            setIsAnswered(false);
          }
          setTimeBarActive(false);
          setCorrectAnswers((prev) => [...prev, isCorrect ? 1 : 0]);
        },
        currentQuestionIndex === questions.length - 1 ? 0 : 3000
      );
    } else {
      alert("Please select one answer before moving to the next question.");
    }
  };

  const handleTimeout = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setCorrectAnswers((prev) => [...prev, 0]);
  };

  const handleShowResult = () => {
    const userAnswersParam = encodeURIComponent(JSON.stringify(userAnswers));
    const correctAnswersParam = encodeURIComponent(
      JSON.stringify(correctAnswers)
    );
    navigate(`/result/${userAnswersParam}/${correctAnswersParam}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-[100vh] transition-all duration-500 bg-gradient-to-r to-[#E63f23] from-[#8D1656] items-center justify-center flex flex-col">
      <div className="relative text-white p-8 w-[40vw] transition-all duration-500 bg-gradient-to-r from-[#E63f23] to-[#8D1656] h-[90vh] rounded-md shadow-lg text-center flex flex-col justify-center items-center content-center space-y-10 max-sm:h-[100vh] max-sm:w-full max-sm:space-y-0 max-lg:w-full">
        <h1 className="text-3xl font-bold mb-4 p-8 pb-0 max-sm:w-full max-sm:text-lg">
          {name ? `Hello, ${name}!` : "Welcome!"}
        </h1>
        <div className="absolute top-0 right-0 translate-x-[20%] translate-y-[-20%]">
          <TimeBar
            duration={3}
            isActive={timeBarActive}
            onTimeout={handleTimeout}
          />
        </div>

        <GradientProgressBar
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
        />

        <h1 className="text-3xl font-bold mb-4 p-8 pb-0 max-sm:w-full max-sm:text-lg">
          {showResult
            ? "Quiz Completed!"
            : questions[currentQuestionIndex].question}
        </h1>
        <div className="flex flex-col gap-2 px-8 w-full justify-start">
          {questions[currentQuestionIndex].options &&
            questions[currentQuestionIndex].options.map((option, index) => (
              <ButtonOption
                key={index}
                option={option}
                index={index}
                selectedOptionIndex={selectedOptionIndex}
                correctAnswerIndex={
                  questions[currentQuestionIndex].correctAnswerIndex
                }
                isAnswered={isAnswered}
                onClick={() => setSelectedOptionIndex(index)}
              />
            ))}
        </div>
        <div>
          <ButtonMain
            onClick={showResult ? handleShowResult : handleNextQuestion}
            title={showResult ? "Show Result" : "Next Question"}
            bgColor={showResult ? "bg-[#8d1656]" : "bg-[#E63F23]"}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizMain;
