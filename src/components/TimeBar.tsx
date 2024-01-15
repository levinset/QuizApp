import React, { useEffect, useState } from "react";

interface TimeBarProps {
  duration: number; // Duration of the countdown in seconds
  isActive: boolean; // Whether the countdown is active
  onTimeout: () => void; // Callback function to execute when the countdown reaches zero
}

const TimeBar: React.FC<TimeBarProps> = ({ duration, isActive, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            onTimeout(); // Execute the callback when the countdown reaches zero
          }
          return Math.max(prevTime - 1, 0);
        });
      }, 1100);
    }

    return () => clearInterval(timer); // Cleanup the timer on component unmount or when isActive becomes false
  }, [isActive, onTimeout]);

  useEffect(() => {
    // Reset the timer when isActive becomes true
    if (isActive) {
      setTimeLeft(duration);
    }
  }, [isActive, duration]);

  return (
    <div className="relative ">
      <div className=" transition-all duration-500 bg-gradient-to-r to-[#E63F23]  from-[#8d1656] rounded-3xl p-5 w-[8rem] h-[8rem]  text-center items-center justify-center content-center max-sm:w-[4rem] max-sm:h-[4rem] ">
        <span className="text-7xl font-bold rounded-full text-white flex flex-row text-center items-center justify-center content-center max-sm:text-4xl">
          {`${timeLeft}`}
          <p className=" text-4xl max-sm:text-3xl">s</p>
        </span>
      </div>
    </div>
  );
};

export default TimeBar;
