"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TakeQuiz({ params }) {
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] =
    useState(0);
  const [userAnswers, setUserAnswers] = useState(
    {}
  );
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] =
    useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      const quizResponse = await fetch(
        `/api/quizzes/${params.id}`
      );
      const quizData = await quizResponse.json();
      setQuiz(quizData);

      const questionsResponse = await fetch(
        `/api/questions?quizId=${params.id}`
      );
      const questionsData =
        await questionsResponse.json();
      setQuestions(questionsData);
    };

    fetchQuizAndQuestions();
  }, [params.id]);

  const handleAnswer = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (
        userAnswers[index] ===
        question.correctAnswer
      ) {
        newScore++;
      }
    });
    setScore(newScore);
    setQuizCompleted(true);
    saveResult(newScore);
  };

  const saveResult = async (finalScore) => {
    await fetch("/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizId: params.id,
        userId: "anonymous", // Replace with actual user ID when authentication is implemented
        score: finalScore,
        totalQuestions: questions.length,
      }),
    });
  };

  if (!quiz || questions.length === 0)
    return <div>Loading...</div>;

  if (quizCompleted) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Quiz Completed
        </h1>
        <p>
          Your score: {score} out of{" "}
          {questions.length}
        </p>
        <button
          onClick={() => router.push("/quizzes")}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {quiz.title}
      </h1>
      <p className="mb-4">
        Question {currentQuestion + 1} of{" "}
        {questions.length}
      </p>
      <div className="mb-4">
        <p className="font-bold">
          {question.text}
        </p>
        {question.type === "MCQ" ? (
          <div className="space-y-2">
            {question.options.map(
              (option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(option)
                  }
                  className={`block w-full text-left p-2 rounded ${
                    userAnswers[
                      currentQuestion
                    ] === option
                      ? "bg-blue-200"
                      : "bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              )
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <button
              onClick={() => handleAnswer("True")}
              className={`px-4 py-2 rounded ${
                userAnswers[currentQuestion] ===
                "True"
                  ? "bg-blue-200"
                  : "bg-gray-100"
              }`}
            >
              True
            </button>
            <button
              onClick={() =>
                handleAnswer("False")
              }
              className={`px-4 py-2 rounded ${
                userAnswers[currentQuestion] ===
                "False"
                  ? "bg-blue-200"
                  : "bg-gray-100"
              }`}
            >
              False
            </button>
          </div>
        )}
      </div>
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!userAnswers[currentQuestion]}
      >
        {currentQuestion < questions.length - 1
          ? "Next"
          : "Finish"}
      </button>
    </div>
  );
}
