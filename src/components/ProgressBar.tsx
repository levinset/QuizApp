interface GradientProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const GradientProgressBar: React.FC<GradientProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  return (
    <div className=" w-[70%] ">
      <div className="relative">
        <div className="flex flex-row max-sm:hidden ">
          <div className="text-right">
            <span className="text-4xl font-bold text-[#8d1656] flex ">
              <div className="">{`Question ${currentQuestion + 1}`}</div>
              <p className="text-2xl ml-1 text-[#E63F23] ">/</p>
              <div className="text-3xl text-[#E63F23] ">
                {" "}
                {`${totalQuestions}`}{" "}
              </div>
            </span>
          </div>
        </div>
        <div className="flex mt-3 ">
          <div className="flex items-center w-full">
            <div className="w-full bg-slate-100 rounded-full h-[1rem] ">
              <div
                className="transition-all duration-500 bg-gradient-to-r to-[#E63F23]  from-[#8d1656] rounded-full text-2xl leading-none py-1 text-center text-white h-full "
                style={{
                  width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientProgressBar;
