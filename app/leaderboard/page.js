"use client";

import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(
    []
  );

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch(
        "/api/results"
      );
      const data = await response.json();
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Leaderboard
      </h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">
              Rank
            </th>
            <th className="p-2 text-left">
              User
            </th>
            <th className="p-2 text-left">
              Score
            </th>
            <th className="p-2 text-left">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((result, index) => (
            <tr
              key={result._id}
              className="border-b"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                {result.userId}
              </td>
              <td className="p-2">
                {result.score} /{" "}
                {result.totalQuestions}
              </td>
              <td className="p-2">
                {new Date(
                  result.completedAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
