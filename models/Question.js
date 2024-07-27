import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  type: {
    type: String,
    enum: ["MCQ", "TrueFalse"],
  },
  text: String,
  options: [String],
  correctAnswer: String,
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
