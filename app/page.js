import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Online Quiz Service
      </h1>
      <nav className="space-x-4">
        <Link
          href="/quizzes"
          className="text-blue-500 hover:underline"
        >
          View Quizzes
        </Link>
        <Link
          href="/quizzes/create"
          className="text-blue-500 hover:underline"
        >
          Create Quiz
        </Link>
        <Link
          href="/leaderboard"
          className="text-blue-500 hover:underline"
        >
          Leaderboard
        </Link>
        <Link
          href="/auth/register"
          className="text-blue-500 hover:underline"
        >
          Register
        </Link>
        <Link
          href="/auth/signin"
          className="text-blue-500 hover:underline"
        >
          Sign In
        </Link>
      </nav>
    </div>
  );
}
