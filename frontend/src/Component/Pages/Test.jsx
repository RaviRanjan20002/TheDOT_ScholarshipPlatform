import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestPage from "./TestPage";
import FlipClockTimer from "./FlipClockTimer"; // New Timer Component
import "../../Styles/Test.css";
import axios from "axios";

const Test = () => {
  const [selectedSubject, setSelectedSubject] = useState("physics");
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

  return (
    <>
      <div className="quiz-container">
        <h1 className="quiz-heading">Welcome To The DOT Instant Scholarship Exam</h1>

        <div className="quiz-subject-buttons">
          <button className="quiz-subject-btn" onClick={() => handleSubjectChange("physics")}>
             Physics
          </button>
          <button className="quiz-subject-btn" onClick={() => handleSubjectChange("chemistry")}>
             Chemistry
          </button>
          <button className="quiz-subject-btn" onClick={() => handleSubjectChange("mathematics")}>
             Mathematics
          </button>
        </div>

        {/* ⏳ New Timer Design */}
        <FlipClockTimer />

        <button className="quiz-submit-button" onClick={handleSubmit} disabled={Object.keys(userAnswers).length === 0}>
          Submit Test
        </button>
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
