// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TestPage from "./TestPage";
// import "../../Styles/Test.css";
// import axios from "axios";

// const Test = () => {
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({
//     physics: {},
//     chemistry: {},
//     mathematics: {},
//   });
//   const [totalQuestions, setTotalQuestions] = useState({
//     physics: 0,
//     chemistry: 0,
//     mathematics: 0,
//   });
//   const [currentIndexes, setCurrentIndexes] = useState({
//     physics: 0,
//     chemistry: 0,
//     mathematics: 0,
//   });
//   const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestionCounts = async () => {
//       try {
//         const subjects = ["physics", "chemistry", "mathematics"];
//         let questionCounts = {};

//         for (const subject of subjects) {
//           const response = await axios.get(
//             `http://localhost:5000/api/questions/${subject}`
//           );
//           questionCounts[subject] = response.data.length;
//         }

//         setTotalQuestions(questionCounts);
//       } catch (error) {
//         console.error("❌ Error fetching question counts:", error);
//       }
//     };

//     fetchQuestionCounts();
//   }, []);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const handleAnswerSelect = (subject, questionId, selectedOption) => {
//     setUserAnswers((prev) => ({
//       ...prev,
//       [subject]: { ...prev[subject], [questionId]: selectedOption },
//     }));
//   };

//   const handleSubjectChange = (subject) => {
//     setSelectedSubject(subject);
//     setCurrentIndexes((prev) => ({ ...prev, [subject]: 0 }));
//   };

//   const handleSubmit = () => {
//     navigate("/results", { state: { userAnswers } });
//   };

//   return (
//     <>
//       <div className="quiz-container">
//         <h1 className="quiz-heading">Welcome To The DOT Scholarship Exam </h1>

//         <div className="quiz-subject-buttons">
//           <button
//             className="quiz-subject-btn"
//             onClick={() => handleSubjectChange("physics")}
//           >
//             ⚡ Physics
//           </button>
//           <button
//             className="quiz-subject-btn"
//             onClick={() => handleSubjectChange("chemistry")}
//           >
//             🧪 Chemistry
//           </button>
//           <button
//             className="quiz-subject-btn"
//             onClick={() => handleSubjectChange("mathematics")}
//           >
//             🔢 Mathematics
//           </button>
//         </div>

//         <div className="quiz-timer">Time Left: {formatTime(timeLeft)}</div>

//         <button
//           className="quiz-submit-button"
//           onClick={handleSubmit}
//           disabled={Object.keys(userAnswers).length === 0}
//         >
//           Submit Test
//         </button>
//       </div>

//       {selectedSubject && (
//         <TestPage
//           subject={selectedSubject}
//           onAnswerSelect={handleAnswerSelect}
//           userAnswers={userAnswers}
//           totalQuestions={totalQuestions}
//           currentIndex={currentIndexes[selectedSubject]}
//           setCurrentIndex={(index) =>
//             setCurrentIndexes((prev) => ({ ...prev, [selectedSubject]: index }))
//           }
//         />
//       )}
//     </>
//   );
// };

// export default Test;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestPage from "./TestPage";
import "../../Styles/Test.css";
import axios from "axios";

const Test = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [userAnswers, setUserAnswers] = useState({
    physics: {},
    chemistry: {},
    mathematics: {},
  });
  const [totalQuestions, setTotalQuestions] = useState({
    physics: 0,
    chemistry: 0,
    mathematics: 0,
  });
  const [currentIndexes, setCurrentIndexes] = useState({
    physics: 0,
    chemistry: 0,
    mathematics: 0,
  });
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionCounts = async () => {
      try {
        const subjects = ["physics", "chemistry", "mathematics"];
        let questionCounts = {};

        for (const subject of subjects) {
          const response = await axios.get(
            `https://thedot-scholarshipplatform.onrender.com/api/questions/${subject}`
          );
          questionCounts[subject] = response.data.length;
        }

        setTotalQuestions(questionCounts);
      } catch (error) {
        console.error("❌ Error fetching question counts:", error);
      }
    };

    fetchQuestionCounts();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (subject, questionId, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [subject]: { ...prev[subject], [questionId]: selectedOption },
    }));
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setCurrentIndexes((prev) => ({ ...prev, [subject]: 0 }));
  };

  const handleSubmit = () => {
    navigate("/results", { state: { userAnswers } });
  };

  const handleAddSampleQuestions = async () => {
    try {
      await axios.post("https://thedot-scholarshipplatform.onrender.com/api/questions/add-sample");
      alert("Sample questions added successfully!");
    } catch (error) {
      console.error("❌ Error adding sample questions:", error);
      alert("Failed to add sample questions");
    }
  };

  return (
    <>
      <div className="quiz-container">
        <h1 className="quiz-heading">Welcome To The DOT Scholarship Exam</h1>

        <div className="quiz-subject-buttons">
          <button className="quiz-subject-btn" onClick={() => handleSubjectChange("physics")}>
            ⚡ Physics
          </button>
          <button className="quiz-subject-btn" onClick={() => handleSubjectChange("chemistry")}>
            🧪 Chemistry
          </button>
          <button className="quiz-subject-btn" onClick={() => handleSubjectChange("mathematics")}>
            🔢 Mathematics
          </button>
        </div>

        <div className="quiz-timer">Time Left: {formatTime(timeLeft)}</div>

        <button className="quiz-submit-button" onClick={handleSubmit} disabled={Object.keys(userAnswers).length === 0}>
          Submit Test
        </button>

        {/* <button className="quiz-add-button" onClick={handleAddSampleQuestions}>
          ➕ Add Sample Questions
        </button> */}
      </div>

      {selectedSubject && (
        <TestPage
          subject={selectedSubject}
          onAnswerSelect={handleAnswerSelect}
          userAnswers={userAnswers}
          totalQuestions={totalQuestions}
          currentIndex={currentIndexes[selectedSubject]}
          setCurrentIndex={(index) => setCurrentIndexes((prev) => ({ ...prev, [selectedSubject]: index }))}
        />
      )}
    </>
  );
};

export default Test;
