import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3001;

// Use the cors middleware
app.use(cors());

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

// Example quiz questions
let quizQuestions: QuizQuestion[] = [
  {
    question: "Who is known as the 'King of Pop'?",
    options: ["Michael Jackson", "Elvis Presley", "Madonna", "Prince"],
    correctAnswerIndex: 0,
  },
  {
    question: "Which band wrote the song 'Bohemian Rhapsody'?",
    options: ["The Beatles", "Queen", "Led Zeppelin", "The Rolling Stones"],
    correctAnswerIndex: 1,
  },
  {
    question: "In which year did the famous Woodstock Festival take place?",
    options: ["1967", "1969", "1971", "1973"],
    correctAnswerIndex: 1,
  },
  {
    question: "Who is the lead guitarist of the band 'Pink Floyd'?",
    options: ["David Gilmour", "Jimmy Page", "Eric Clapton", "Jimi Hendrix"],
    correctAnswerIndex: 0,
  },
  {
    question: "Which instrument does Yo-Yo Ma play?",
    options: ["Violin", "Cello", "Piano", "Flute"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the genre of music associated with Miles Davis?",
    options: ["Jazz", "Rock", "Country", "Hip Hop"],
    correctAnswerIndex: 0,
  },
  {
    question: "Which famous female artist released the album '21'?",
    options: ["Adele", "Beyoncé", "Taylor Swift", "Rihanna"],
    correctAnswerIndex: 0,
  },
];

// API endpoint to fetch quiz questions
app.get("/api/questions", (req: Request, res: Response) => {
  const questions: QuizQuestion[] = quizQuestions;
  res.json(questions);
});

// API endpoint to add a new question
app.post("/api/add-question", express.json(), (req: Request, res: Response) => {
  const newQuestion: QuizQuestion = req.body;

  // Validate the request body
  if (
    !newQuestion ||
    !newQuestion.question ||
    !newQuestion.options ||
    newQuestion.options.length === 0 ||
    !newQuestion.correctAnswerIndex
  ) {
    return res.status(400).json({ error: "Invalid question format" });
  }

  // Add the new question to the quizQuestions array
  quizQuestions.push(newQuestion);

  res
    .status(201)
    .json({ message: "Question added successfully", question: newQuestion });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
