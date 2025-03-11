import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../Styles/Result.css";

const Result = () => {
  const location = useLocation();
  const userAnswers = location.state?.userAnswers || {};
  const subjects = Object.keys(userAnswers);

  const [scores, setScores] = useState({});
  const [totalQuestions, setTotalQuestions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (subjects.length === 0) {
      setLoading(false);
      return;
    }

    const calculateScores = async () => {
      let newScores = {};
      let newTotalQuestions = {};

      try {
        await Promise.all(
          subjects.map(async (subject) => {
            const response = await axios.get(`https://thedot-scholarshipplatform.onrender.com/api/questions/${subject}`);
            const questions = response.data;

            newTotalQuestions[subject] = questions.length;
            newScores[subject] = questions.reduce(
              (score, q) => (userAnswers[subject]?.[q._id] === q.correctAnswer ? score + 1 : score),
              0
            );
          })
        );

        setScores(newScores);
        setTotalQuestions(newTotalQuestions);
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
        setError("Failed to fetch question data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    calculateScores();
  }, [userAnswers]);

  const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const totalPossible = Object.values(totalQuestions).reduce((sum, val) => sum + val, 0);
  const percentage = totalPossible > 0 ? ((totalScore / totalPossible) * 100).toFixed(2) : 0;

  return (
    <div className="result-container">
      <div className="emoji">🎉</div>
      <h1>Congratulations!</h1>
      <p className="institute-tagline">You are among the top 100 students! 🎖️</p>
      <p className="institute-info">Get scholarships & exclusive benefits for admission at <b>The DOT Institute</b>.</p>

      {loading ? (
        <p>Loading results...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : subjects.length > 0 ? (
        <div className="score-container">
          {subjects.map((subject) => (
            <div className="subject-score-box" key={subject}>
              <span className="subject-icon">{subject === "physics" ? "⚛️" : subject === "chemistry" ? "🧪" : "📐"}</span>
              <p className="subject-name">{subject.charAt(0).toUpperCase() + subject.slice(1)}</p>
              <span className="score-box">{scores[subject] || 0} / {totalQuestions[subject] || 0}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No test data available.</p>
      )}

      {!loading && !error && (
        <>
          <h3>Total Score: {totalScore} / {totalPossible}</h3>
          <h2 className="percentage">Percentage: {percentage} %</h2>
        </>
      )}
    </div>
  );
};

export default Result;


