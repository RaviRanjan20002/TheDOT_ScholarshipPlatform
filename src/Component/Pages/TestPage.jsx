import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import "../../Styles/TestPage.css";

const TestPage = ({
  subject,
  onAnswerSelect,
  userAnswers,
  totalQuestions,
  currentIndex,
  setCurrentIndex,
}) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!subject) throw new Error("Subject is undefined");
        const response = await axios.get(
          `https://thedot-scholarshipplatform.onrender.com/api/questions/${subject}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [subject]);

  const safeUserAnswers = userAnswers || {
    physics: {},
    chemistry: {},
    mathematics: {},
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    onAnswerSelect(subject, questionId, selectedOption);
  };

  // ✅ **Overall progress calculation**
  const totalAnswered = Object.values(safeUserAnswers).reduce(
    (acc, sub) => acc + Object.keys(sub).length,
    0
  );
  const totalQues = Object.values(totalQuestions).reduce(
    (acc, count) => acc + count,
    0
  );
  const totalNotAnswered = totalQues - totalAnswered;
  const completionPercentage =
    totalQues > 0 ? ((totalAnswered / totalQues) * 100).toFixed(2) : 0;

  return (
    <div className="test-container">
      <div className="question-section">
        {questions.length > 0 && questions[currentIndex] ? (
          <QuestionCard
            question={questions[currentIndex]}
            index={currentIndex}
            subject={subject}
            onSelect={handleAnswerSelect}
            selectedAnswer={
              safeUserAnswers[subject]?.[questions[currentIndex]._id] || ""
            }
          />
        ) : (
          <p>Loading questions...</p>
        )}

        <div className="navigation-buttons">
          {currentIndex > 0 && (
            <button onClick={() => setCurrentIndex(currentIndex - 1)}>
              Previous
            </button>
          )}
          {currentIndex < questions.length - 1 && (
            <button onClick={() => setCurrentIndex(currentIndex + 1)}>
              Next
            </button>
          )}
        </div>
      </div>

      {/* ✅ Updated Overall Progress Section */}
      <div className="side-panel">
        <h3>Overall Progress</h3>

        {/* ✅ Answered & Not Answered Counts in Boxes */}
        <div className="progress-boxes">
          <div className="progress-box answered-box">
            Answered: {totalAnswered}
          </div>
          <div className="progress-box not-answered-box">
            Not Answered: {totalNotAnswered}
          </div>
        </div>
        <div className="subject-progress">
          <p>Overall Completion:{completionPercentage}%</p>
        </div>
        {/* ✅ Divider for separation */}
        <div className="divider"></div>

        {/* ✅ Subject Name & Completion */}
        <div className="subject-progress">
          <h3> ⚛️ {subject}</h3>
        </div>

        {/* ✅ Question Navigation Panel */}
        <div className="question-nav">
          {questions.map((q, index) => (
            <button
              key={q._id}
              className={
                safeUserAnswers[subject]?.[q._id] ? "answered" : "notAnswered"
              }
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
