import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Quiz ||
  mongoose.model("Quiz", QuizSchema);
