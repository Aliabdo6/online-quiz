import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import Quiz from "../../../models/Quiz";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    await clientPromise;
    const quizzes = await Quiz.find({}).lean();
    return NextResponse.json(quizzes);
  } catch (error) {
    console.error(
      "Failed to fetch quizzes:",
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(
      authOptions
    );
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, description } =
      await request.json();
    await clientPromise;
    const quiz = new Quiz({
      title,
      description,
      createdBy: session.user.id,
    });
    await quiz.save();
    return NextResponse.json(quiz);
  } catch (error) {
    console.error(
      "Failed to create quiz:",
      error
    );
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 }
    );
  }
}
