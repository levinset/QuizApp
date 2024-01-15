import React from "react";

interface ButtonOptionProps {
  onClick: () => void;
  option: string;
  index: number;
  selectedOptionIndex: number | null;
  correctAnswerIndex: number;
  isAnswered?: boolean;
}

const ButtonOption: React.FC<ButtonOptionProps> = ({
  onClick,
  option,
  index,
  selectedOptionIndex,
  correctAnswerIndex,
  isAnswered,
}) => {
  let bgColor = "";

  if (isAnswered) {
    bgColor =
      index === correctAnswerIndex
        ? "bg-green-500"
        : index === selectedOptionIndex
        ? "bg-red-500"
        : "";
  } else {
    bgColor = index === selectedOptionIndex ? "bg-violet-600" : "";
  }

  return (
    <button
      className={`btn border-2 border-slate-100 w-full rounded-md p-[0.5rem] flex ${bgColor}`}
      onClick={onClick}
      disabled={isAnswered}
    >
      {option}
    </button>
  );
};

export default ButtonOption;
