"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/quizzes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch quizzes"
          );
        }
        return response.json();
      })
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Available Quizzes
      </h1>
      <ul className="space-y-2">
        {quizzes.map((quiz) => (
          <li
            key={quiz._id}
            className="bg-white p-4 rounded shadow"
          >
            <Link
              href={`/quizzes/${quiz._id}`}
              className="text-blue-500 hover:underline"
            >
              {quiz.title}
            </Link>
            <p className="text-gray-600">
              {quiz.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
