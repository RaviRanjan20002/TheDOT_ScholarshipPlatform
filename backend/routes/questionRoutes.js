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
        questionText: "Unit of momentum is:",
        options: ["meter/second", "Newton × meter", "kg-meter/second", "kg⁻¹ meter second⁻¹"],
        correctAnswer: "kg-meter/second",
      },
      {
        subject: "physics",
        questionText: "Which one of the following physical quantities is constant in simple harmonic motion?",
        options: ["Restoring force", "Kinetic energy", "Potential energy", "Total energy"],
        correctAnswer: "Total energy",
      },
      {
        subject: "physics",
        questionText: "A ray of light passes from glass (μ = 3/2) to water (μ = 4/3). The value of critical angle will be:",
        options: ["sin⁻¹(1/2)", "sin⁻¹(8/9)", "sin⁻¹(8/9)", "sin⁻¹(5/7)"],
        correctAnswer: "sin⁻¹(8/9)",
      },
      {
        subject: "physics",
        questionText: "The value of acceleration due to gravity (g) on the earth will be maximum at:",
        options: ["Surface", "Poles", "Equator", "Center"],
        correctAnswer: "Poles",
      },
      {
        subject: "physics",
        questionText: "Which one of the following is an example of a Biomass Energy source?",
        options: ["Nuclear Energy", "Sun Energy", "Gobar Gas", "Wind Energy"],
        correctAnswer: "Gobar Gas",
      },
      {
        subject: "physics",
        questionText: "The refraction of light by a prism is shown in the following figure. Then Angle D is:",
        options: ["Angle of prism", "Angle of refraction", "Angle of emergent", "Angle of deviation"],
        correctAnswer: "Angle of deviation",
      },
      {
        subject: "physics",
        questionText: "The unit of power of a lens is dioptre. Then one dioptre (1D) is equal to:",
        options: ["100 cm⁻¹", "1 meter⁻¹", "1 meter", "100 cm"],
        correctAnswer: "1 meter⁻¹",
      },
      {
        subject: "physics",
        questionText: "If F is the focal length of a convex lens, then the nature of the image of an object placed at a distance of 2F will be:",
        options: ["Real, inverted, and same size", "Virtual, erect, and small", "Real, erect, and same size", "Virtual, inverted, and same size"],
        correctAnswer: "Real, inverted, and same size",
      },
      {
        subject: "physics",
        questionText: "The power of a plane mirror is:",
        options: ["Zero (0)", "+1", "-1", "Infinity (∞)"],
        correctAnswer: "Zero (0)",
      },
      {
        subject: "physics",
        questionText: "The resistance of a wire is 4Ω. If the length of the wire is doubled and the area of the cross-section is halved, then the new resistance will be:",
        options: ["1Ω", "6Ω", "4Ω", "12Ω"],
        correctAnswer: "12Ω",
      },
      {
        subject: "physics",
        questionText: "Which one of the following alternating currents is supplied in our household circuits?",
        options: ["110 V and 50 Hz", "220 V and 60 Hz", "110 V and 60 Hz", "220 V and 50 Hz"],
        correctAnswer: "220 V and 50 Hz",
      },
      {
        subject: "physics",
        questionText: "How much time will be taken by a 100-watt bulb to consume one unit of energy?",
        options: ["1 hour", "10 hours", "100 hours", "1000 hours"],
        correctAnswer: "1 hour",
      },
      {
        subject: "physics",
        questionText: "Which one of the following is not a conventional source of energy?",
        options: ["Coal", "Petroleum", "Hydro", "Solar energy"],
        correctAnswer: "Solar energy",
      },
    
      
      // 🔹 Chemistry Questions
      {
        subject: "chemistry",
        questionText: "The name of the metal which decomposes water in cold is:",
        options: ["Cu", "Pt", "Ag", "Na"],
        correctAnswer: "Na",
      },
      {
        subject: "chemistry",
        questionText: "On heating camphor in a porcelain dish, it got mixed in air without melting. This phenomenon is known as:",
        options: ["Condensation", "Sublimation", "Suspension", "Evaporation"],
        correctAnswer: "Sublimation",
      },
      {
        subject: "chemistry",
        questionText: "Ethylene and Sulfur monochloride on heating give:",
        options: ["Chloroethane", "Ethylene chloride", "Mustard Gas", "Ethylene glycol"],
        correctAnswer: "Mustard Gas",
      },
      {
        subject: "chemistry",
        questionText: "The H⁺ ion concentration of a solution is 2 × 10⁻⁸ mol L⁻¹. The pH value of the solution is (log 2 = 0.3010):",
        options: ["7.699", "7.699", "7.799", "7.899"],
        correctAnswer: "7.699",
      },
      {
        subject: "chemistry",
        questionText: "Which of the following elements exhibit variable valency?",
        options: ["Normal element", "Typical element", "Transitional element", "None of these"],
        correctAnswer: "Transitional element",
      },
      {
        subject: "chemistry",
        questionText: "Which one is an addition reaction?",
        options: ["Zn + H₂SO₄ → ZnSO₄ + H₂", "2KBr + Cl₂ → 2KCl + Br₂", "H₂ + O₂ → H₂O", "2HgO → 2Hg + O₂"],
        correctAnswer: "H₂ + O₂ → H₂O",
      },
      {
        subject: "chemistry",
        questionText: "Which compound has both covalent as well as coordinate bonds?",
        options: ["H₂S", "CO", "H₂O", "SO₂"],
        correctAnswer: "SO₂",
      },
      {
        subject: "chemistry",
        questionText: "Complex salt is:",
        options: ["Zinc Sulphate", "Sodium Hydrogen Sulphate", "Iron Ammonium Sulphate", "Tetraamine Copper (II) Sulphate"],
        correctAnswer: "Tetraamine Copper (II) Sulphate",
      },
      {
        subject: "chemistry",
        questionText: "Calamine is the ore of metal:",
        options: ["Copper", "Aluminium", "Zinc", "Iron"],
        correctAnswer: "Zinc",
      },
      {
        subject: "chemistry",
        questionText: "Acid used in lead batteries is:",
        options: ["HCl", "H₂SO₄", "HNO₃", "H₂CO₃"],
        correctAnswer: "H₂SO₄",
      },
      {
        subject: "chemistry",
        questionText: "Which type of ores are concentrated by the Froth Flotation process?",
        options: ["Oxide ores", "Sulphide ores", "Carbonate ores", "Nitrate ores"],
        correctAnswer: "Sulphide ores",
      },
      {
        subject: "chemistry",
        questionText: "Which of the following is an amphoteric oxide?",
        options: ["Na₂O", "SO₂", "Al₂O₃", "CaO"],
        correctAnswer: "Al₂O₃",
      },


      // // biology questions
      // {
      //   subject: "biology",
      //   questionText: "In the human body, the temperature control center is:",
      //   options: ["Epithalamus", "Hypothalamus", "Thalamus", "Medulla Oblongata"],
      //   correctAnswer: "Hypothalamus",
      // },
      // {
      //   subject: "biology",
      //   questionText: "Which factor is responsible for the Greenhouse Effect?",
      //   options: ["H₂O", "CO", "SO₂", "CO₂"],
      //   correctAnswer: "CO₂",
      // },
      // {
      //   subject: "biology",
      //   questionText: "Which element is essential for the synthesis of Thyroxine Hormones?",
      //   options: ["Zinc", "Iodine", "Boron", "Nitrogen"],
      //   correctAnswer: "Iodine",
      // },
      // {
      //   subject: "biology",
      //   questionText: "The smallest unit of classification is:",
      //   options: ["Species", "Class", "Order", "Kingdom"],
      //   correctAnswer: "Species",
      // },
      // {
      //   subject: "biology",
      //   questionText: "Which of the following is not a part of the female reproductive system in humans?",
      //   options: ["Ovary", "Uterus", "Fallopian tube", "Vas deferens"],
      //   correctAnswer: "Vas deferens",
      // },
      // {
      //   subject: "biology",
      //   questionText: "The most powerful digestive enzyme occurs in which cell organelle?",
      //   options: ["Mitochondria", "Chloroplast", "Golgi body", "Lysosome"],
      //   correctAnswer: "Lysosome",
      // },
      // {
      //   subject: "biology",
      //   questionText: "The causative agent of Kala-azar (Black fever) is:",
      //   options: ["Bacteria", "Virus", "Protozoan", "Fungi"],
      //   correctAnswer: "Protozoan",
      // },
      // {
      //   subject: "biology",
      //   questionText: "Unisexual flowers occur in which of the following plants?",
      //   options: ["Mustard", "Tomato", "Pea", "Watermelon"],
      //   correctAnswer: "Watermelon",
      // },
      // {
      //   subject: "biology",
      //   questionText: "Biotic components of an ecosystem are:",
      //   options: ["Producers", "Consumers", "Decomposers", "All of the above"],
      //   correctAnswer: "All of the above",
      // },
      // {
      //   subject: "biology",
      //   questionText: "Which one of the following substances is changed into amino acids after digestion?",
      //   options: ["Protein", "Carbohydrate", "Fat", "Nucleic acid"],
      //   correctAnswer: "Protein",
      // },
      // {
      //   subject: "biology",
      //   questionText: "The source of the Penicillin antibiotic is:",
      //   options: ["Bacteria", "Fungi", "Virus", "Algae"],
      //   correctAnswer: "Fungi",
      // },
      // {
      //   subject: "biology",
      //   questionText: "Testosterone hormone is produced in:",
      //   options: ["Leydig cells", "Kupffer cells", "Granulosa cells", "None of the above"],
      //   correctAnswer: "Leydig cells",
      // },
      // {
      //   subject: "biology",
      //   questionText: "The number of sex chromosomes in human beings is:",
      //   options: ["23", "46", "1", "2"],
      //   correctAnswer: "2",
      // },
      // {
      //   subject: "biology",
      //   questionText: "Which of the following is known as the ‘suicide bag’ of the cell?",
      //   options: ["Plastid", "Mitochondria", "Ribosome", "Lysosome"],
      //   correctAnswer: "Lysosome",
      // },

      // 🔹 Mathematics Questions
      {
        subject: "mathematics",
        questionText: "Which of the following statements is true?",
        options: ["1/2 > 1/3", "1/2 < 1/3", "1/2 > 1/3", "1/2 = 1/3"],
        correctAnswer: "1/2 > 1/3",
      },
      {
        subject: "mathematics",
        questionText: "The mean of 15 observations is 50. If the mean of the first eight observations and last eight observations are 48 and 53 respectively, then the eighth observation is:",
        options: ["35", "80", "72", "58"],
        correctAnswer: "72",
      },
      {
        subject: "mathematics",
        questionText: "The point on the y-axis, which is equidistant from points A(6,5) and B(-4,3) is:",
        options: ["(9,0)", "(0,4)", "(0,9)", "(0,3)"],
        correctAnswer: "(0,4)",
      },
      {
        subject: "mathematics",
        questionText: "The value of k for which the system of linear equations 2x + 5y = 6 and 3x + ky = 15 has no solution is:",
        options: ["6", "-6", "3/2", "2/3"],
        correctAnswer: "6",
      },
      {
        subject: "mathematics",
        questionText: "If x = 1 is a common root of the equations ax² + 3ax + a = 0 and x² + x + b = 0, then the value of ab is:",
        options: ["3", "3.5", "6", "-3"],
        correctAnswer: "3",
      },
      {
        subject: "mathematics",
        questionText: "If the centroid of the triangle formed by points (a, b), (b, c), and (c, a) is at the origin, then a³ + b³ + c³ is equal to:",
        options: ["abc", "0", "a+b+c", "3abc"],
        correctAnswer: "0",
      },
      {
        subject: "mathematics",
        questionText: "The number of sex chromosomes in human beings is:",
        options: ["23", "46", "1", "2"],
        correctAnswer: "2",
      },
      {
        subject: "mathematics",
        questionText: "If 35% of income of A is equal to 25% of income of B, then the ratio of incomes of A and B is:",
        options: ["7:5", "5:7", "4:3", "3:4"],
        correctAnswer: "7:5",
      },
      {
        subject: "mathematics",
        questionText: "If the ratio of volumes of two cubes is 27:64, then the ratio of their surface areas is:",
        options: ["9:16", "16:9", "3:4", "4:3"],
        correctAnswer: "9:16",
      },
      {
        subject: "mathematics",
        questionText: "The length of tangent drawn from a point Q to a circle is 24 cm, and the distance from Q to the center of the circle is 25 cm. The radius of the circle is:",
        options: ["7 cm", "12 cm", "15 cm", "24.5 cm"],
        correctAnswer: "7 cm",
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
