import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  userId: String, // You might want to implement user authentication later
  score: Number,
  totalQuestions: Number,
  completedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Result ||
  mongoose.model("Result", ResultSchema);
