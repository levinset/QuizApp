// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./sections/Home/HomePage";
import Result from "./sections/Result/Result";
import QuizMain from "./sections/Quiz/QuizMain";
import AddQuestions from "./sections/Add/AddQuestions";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizMain />} />
        <Route path="/add" element={<AddQuestions />} />
        <Route
          path="/result/:userAnswers/:correctAnswers"
          element={<Result />}
        />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
};

export default App;
