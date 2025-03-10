/* eslint-disable no-undef */
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  subject: { type: String, required: true, lowercase: true },  // Ensure subject is always lowercase
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

module.exports = mongoose.model("Question", QuestionSchema);
