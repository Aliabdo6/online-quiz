import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import Result from "../../../models/Result";

export async function POST(request) {
  try {
    const {
      quizId,
      userId,
      score,
      totalQuestions,
    } = await request.json();
    await clientPromise;
    const result = new Result({
      quizId,
      userId,
      score,
      totalQuestions,
    });
    await result.save();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get("quizId");

  try {
    await clientPromise;
    const results = await Result.find({ quizId })
      .sort({ score: -1 })
      .limit(10)
      .lean();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
