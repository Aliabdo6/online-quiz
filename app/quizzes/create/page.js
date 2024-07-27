"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        "/api/quizzes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create quiz");
      }

      router.push("/quizzes");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Create New Quiz
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}
    </div>
  );
}
