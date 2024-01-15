import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Name submitted:", name);
  };

  return (
    <div className="h-[100vh] transition-all duration-500 bg-gradient-to-r to-[#E63f23] from-[#8D1656] items-center justify-center flex flex-col">
      <div className="text-white p-8   transition-all duration-500 bg-gradient-to-r from-[#E63f23] to-[#8D1656] h-[90vh] w-fit rounded-md shadow-lg text-center flex flex-col justify-center items-center content-center space-y-4 ">
        <h1 className="uppercase font-sans bg-text-transient font-bold text-[3rem] max-sm:text-[1.1rem] ">
          Let's Rock The quiz!
        </h1>
        <h2 className="font-bold text-[1.5rem] max-sm:text-[0.7rem]">
          Ready to test your musical knowledge?
        </h2>
        <img
          className="  h-[20rem] w-[20rem] rounded-full border-[3px] object-cover max-sm:w-[10rem] max-sm:h-[10rem]"
          src="src\assets\source.avif"
          alt="avatar"
        />
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            className=" text-center font-bold px-4 py-3 border-[3px] rounded-full focus:outline-none focus:border-[#8d1656] transition-all duration-300 bg-transparent "
          />
        </form>
        <div className="flex flex-row space-x-4 mt-4">
          <Link
            to={`/quiz?name=${encodeURIComponent(name)}`} // Add the name as a query parameter
            className="btn uppercase font-bold text-[1.5rem] hover:bg-[#8d1656] cursor-pointer max-sm:text-[1rem] "
          >
            Play Quiz
          </Link>
          <Link
            to="/add"
            className="btn uppercase font-bold text-[1.5rem] hover:bg-[#E63F23] cursor-pointer max-sm:text-[1rem] "
          >
            Add Ques's
          </Link>
        </div>
      </div>
    </div>
  );
}
