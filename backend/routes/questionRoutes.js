/* eslint-disable no-undef */

// const express = require("express");
// const Question = require("../models/Question");

// const router = express.Router();

// // 🔹 Fetch questions by subject
// router.get("/:subject", async (req, res) => {
//   try {
//     console.log(`📌 Fetching questions for subject: ${req.params.subject}`);
    
//     const questions = await Question.find({ subject: req.params.subject.toLowerCase() });

//     if (questions.length === 0) {
//       return res.status(404).json({ message: "No questions found for this subject" });
//     }

//     res.json(questions);
//   } catch (error) {
//     console.error("❌ Error fetching questions:", error);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // 🔹 Insert sample questions (One-time use)
// router.post("/add-sample", async (req, res) => {
//   try {
//     console.log("📌 Adding sample questions...");

//     const sampleQuestions = [
//       {
//         subject: "physics",
//         questionText: "What is the unit of force?",
//         options: ["Newton", "Joule", "Pascal", "Watt"],
//         correctAnswer: "Newton",
//       },
//       {
//         subject: "chemistry",
//         questionText: "Which element is known as the king of chemicals?",
//         options: ["Oxygen", "Sulfuric Acid", "Hydrogen", "Nitrogen"],
//         correctAnswer: "Sulfuric Acid",
//       },
//       {
//         subject: "mathematics",
//         questionText: "What is the derivative of sin(x)?",
//         options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
//         correctAnswer: "cos(x)",
//       },
//     ];

//     // 🔹 Insert questions only if they don't already exist
//     const existingQuestions = await Question.find();
//     if (existingQuestions.length === 0) {
//       await Question.insertMany(sampleQuestions);
//       console.log("✅ Sample questions added successfully!");
//       res.json({ message: "Sample questions added successfully" });
//     } else {
//       console.log("⚠️ Sample questions already exist in the database.");
//       res.json({ message: "Sample questions already exist" });
//     }
//   } catch (error) {
//     console.error("❌ Error inserting questions:", error);
//     res.status(500).json({ error: "Failed to insert questions" });
//   }
// });

// // 🔹 Add a new question from frontend request
// router.post("/add", async (req, res) => {
//   try {
//     const { subject, questionText, options, correctAnswer } = req.body;

//     if (!subject || !questionText || !options || !correctAnswer) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newQuestion = new Question({
//       subject: subject.toLowerCase(),
//       questionText,
//       options,
//       correctAnswer,
//     });

//     await newQuestion.save();
//     console.log("✅ New question added successfully!");
//     res.json({ message: "Question added successfully", question: newQuestion });
//   } catch (error) {
//     console.error("❌ Error adding new question:", error);
//     res.status(500).json({ error: "Failed to add question" });
//   }
// });

// module.exports = router;
const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// Fetch questions by subject
router.get("/:subject", async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subject.toLowerCase() });
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Insert multiple sample questions (One-time use)
router.post("/add-sample", async (req, res) => {
  try {
    // Sample questions for each subject
    const sampleQuestions = [
      // 🔹 Physics Questions
      {
        subject: "physics",
        questionText: "What is the SI unit of force?",
        options: ["Newton", "Joule", "Pascal", "Watt"],
        correctAnswer: "Newton",
      },
      {
        subject: "physics",
        questionText: "What is the speed of light in vacuum?",
        options: ["3 × 10^8 m/s", "1.5 × 10^8 m/s", "3 × 10^6 m/s", "None of the above"],
        correctAnswer: "3 × 10^8 m/s",
      },
      {
        subject: "physics",
        questionText: "Who discovered the law of gravity?",
        options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
        correctAnswer: "Isaac Newton",
      },
      
      // 🔹 Chemistry Questions
      {
        subject: "chemistry",
        questionText: "Which gas is used in balloons?",
        options: ["Oxygen", "Hydrogen", "Helium", "Nitrogen"],
        correctAnswer: "Helium",
      },
      {
        subject: "chemistry",
        questionText: "What is the chemical formula of water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        correctAnswer: "H2O",
      },
      {
        subject: "chemistry",
        questionText: "Which element is the most abundant in Earth's crust?",
        options: ["Iron", "Oxygen", "Silicon", "Aluminum"],
        correctAnswer: "Oxygen",
      },

      // 🔹 Mathematics Questions
      {
        subject: "mathematics",
        questionText: "What is the square root of 144?",
        options: ["10", "11", "12", "14"],
        correctAnswer: "12",
      },
      {
        subject: "mathematics",
        questionText: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "3.15", "3.16", "3.18"],
        correctAnswer: "3.14",
      },
      {
        subject: "mathematics",
        questionText: "What is 7 factorial (7!)?",
        options: ["5040", "720", "120", "42"],
        correctAnswer: "5040",
      }
    ];

    // 🔹 Insert sample questions into MongoDB
    await Question.insertMany(sampleQuestions);
    res.json({ message: "Sample questions added successfully" });
  } catch (error) {
    console.error("Error inserting questions:", error);
    res.status(500).json({ error: "Failed to insert questions" });
  }
});
module.exports = router;
