export default function ScorePage() {
  return (
    <div
      id="score-contatiner"
      className="hidden bg-white rounded-md shadow-lg w-[35rem] h-[15rem] justify-between items-center p-8 max-sm:h-[28rem]"
    >
      <h1 className="text-3xl font-bold">Your final score:</h1>
      <span className="flex flex-row text-3xl font-bold space-x-1">
        <h2 id="score-rate"></h2>
        <h2>/</h2>
        <h2 id="score-length" className="text-violet-600"></h2>
      </span>
      <button id="restart-btn" className="btn text-slate-600">
        restart quiz
      </button>
    </div>
  );
}
