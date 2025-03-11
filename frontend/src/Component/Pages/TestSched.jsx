import React, { useState, useEffect } from "react";
import "../../Styles/Testsched.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const TestSched = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  // Autofill current date and time on component mount
  useEffect(() => {
    const currentDate = new Date();
    setDate(currentDate.toISOString().split("T")[0]); // YYYY-MM-DD format
    setTime(currentDate.toTimeString().slice(0, 5)); // HH:MM format
  }, []);

  const handleSaveTestDetails = (e) => {
    e.preventDefault();

    // Store in **Session Storage** instead of Local Storage
    sessionStorage.setItem("testDetails", JSON.stringify({ date, time }));

    console.log(`Test taken on ${date} at ${time}`);
    navigate("/test");
  };

  return (
    <div className="test-sched-container">
      <h2>Record Your Test</h2>

      <div className="test-inputs">
        <label>Test Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Test Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <p className="duration-text">Duration: 1 hour (60 minutes)</p>

      <button className="begin-test-btn" onClick={handleSaveTestDetails}>
        Save Test Details
      </button>
    </div>
  );
};

export default TestSched;
