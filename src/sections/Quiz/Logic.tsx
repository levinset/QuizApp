// Global variables
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// HTML elements
//question container
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
//score container
const restartButton = document.getElementById("restart-btn");
const scoreContainer = document.getElementById("score-contatiner");
const scoreRate = document.getElementById("score-rate");
const scoreLength = document.getElementById("score-length");

// Add event listener to the Next button
nextButton.addEventListener("click", onNextButtonClick);
// Add event listener to the restart button
restartButton.addEventListener("click", restartQuiz);

// Initial quiz start
startQuiz();

// Function to start the quiz
function startQuiz() {
  shuffleQuestions();
  currentQuestionIndex = 0;
  score = 0;
  selectedOption = null;
  nextQuestion();
}
// Shuffle function to randomize question order
function shuffleQuestions() {
  quizQuestions.sort(() => Math.random() - 0.5);
}

// Function to display the next question
function nextQuestion() {
  selectedOption = null;
  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  if (currentQuestionIndex < quizQuestions.length) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    displayQuestion(currentQuestion);
  } else {
    showResult();
  }
}

// Function to handle the next button click
function onNextButtonClick() {
  if (selectedOption !== null) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (
      currentQuestion.options[selectedOption] === currentQuestion.correctAnswer
    ) {
      score++;
    }

    currentQuestionIndex++;
    clearSelectedOptions();

    if (currentQuestionIndex < quizQuestions.length) {
      nextQuestion();
    } else {
      showResult();
    }
  } else {
    alert("Please select an answer before moving to the next question.");
  }
}

// Function to display a question
function displayQuestion(question) {
  questionElement.textContent = question.question;
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add(
      "btn",
      "border-2",
      "border-slate-100",
      "w-full",
      "rounded-md",
      "p-[0.5rem]",
      "flex"
    );

    optionButton.addEventListener("click", () =>
      selectOption(optionButton, index)
    );
    optionsContainer.appendChild(optionButton);
  });
}

// Function to handle option selection
function selectOption(optionButton, index) {
  clearSelectedOptions();
  selectedOption = index;
  optionButton.classList.add("selected");
  nextButton.disabled = false;
}
// Function to clear selected options
function clearSelectedOptions() {
  const selectedOptions = document.querySelectorAll(".btn.selected");
  selectedOptions.forEach((option) => option.classList.remove("selected"));
}

// Function to show the final result
function showResult() {
  scoreContainer.classList.remove("hidden");
  scoreContainer.classList.add("flex", "flex-col");
  quizContainer.classList.add("hidden");
  scoreRate.innerHTML = `${score}`;
  scoreLength.innerHTML = `${quizQuestions.length}`;
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextQuestion();
}
