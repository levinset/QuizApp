import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface ResultProps {
  // Add any props if needed
}

const Result: React.FC<ResultProps> = () => {
  const { userAnswers, correctAnswers } = useParams<{
    userAnswers: string | undefined;
    correctAnswers: string | undefined;
  }>();

  const [userAnswersArray, setUserAnswersArray] = useState<number[]>([]);
  const [correctAnswersArray, setCorrectAnswersArray] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (userAnswers && correctAnswers) {
      const decodedUserAnswers = JSON.parse(decodeURIComponent(userAnswers));
      const decodedCorrectAnswers = JSON.parse(
        decodeURIComponent(correctAnswers)
      );

      setUserAnswersArray(decodedUserAnswers);
      setCorrectAnswersArray(decodedCorrectAnswers);

      const totalQuestions = decodedUserAnswers.length;
      const correctCount = decodedCorrectAnswers.reduce(
        (acc: number, answer: number) => acc + answer,
        0
      );

      const currentScore = (correctCount / totalQuestions) * 100;
      setScore(currentScore);
    }
  }, [userAnswers, correctAnswers]);

  if (!userAnswers || !correctAnswers) {
    // Handle the case where the parameters are undefined
    return <div>Error: Missing parameters</div>;
  }

  return (
    <div className="h-[100vh] transition-all duration-500 bg-gradient-to-r to-[#E63f23] from-[#8D1656] items-center justify-center flex flex-col">
      <div className=" relative text-white p-8 w-[40vw]  transition-all duration-500 bg-gradient-to-r from-[#E63f23] to-[#8D1656] h-[90vh] rounded-md shadow-lg text-center flex flex-col justify-center items-center content-center space-y-10 max-sm:h-[100vh] max-sm:w-full max-sm:space-y-0  max-lg:w-full max-sm:justify-center max-sm:p-0">
        <h1 className="uppercase font-sans bg-text-transient font-bold text-[2rem] max-sm:text-[1.1rem] mb-[6rem]">
          Quiz Results
        </h1>
        <div className="flex flex-col gap-6 px-8 w-full text-4xl font-bold transition-all duration-500 bg-gradient-to-r from-[#8D1656] to-[#E63f23]  p-8 rounded  max-sm:text-3xl">
          <p>Total Questions: {userAnswersArray.length}</p>
          <p>
            Correct Answers: {correctAnswersArray.reduce((a, b) => a + b, 0)}
          </p>
          <p>
            Incorrect Answers:{" "}
            {userAnswersArray.length -
              correctAnswersArray.reduce((a, b) => a + b, 0)}
          </p>
          <p>Final Score: {score.toFixed(2)}%</p>
        </div>
        <Link
          to="/"
          className="btn uppercase font-bold text-[1.5rem] hover:bg-[#E63F23] cursor-pointer max-sm:text-[1rem] "
        >
          Back home
        </Link>
      </div>
    </div>
  );
};

export default Result;
