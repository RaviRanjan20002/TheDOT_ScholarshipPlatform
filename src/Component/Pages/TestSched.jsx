import React, { useState } from "react";
import "../../Styles/TestSched.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const TestSched = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const handleBeginTest = (e) => {
    e.preventDefault();
    alert("Test scheduled successfully!");
     navigate("/test");
  };

  return (
    <div className="test-sched-container">
      <h2>Schedule Your Test</h2>

      <div className="test-inputs">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <p className="duration-text">Duration: 1 hour (60 minutes)</p>

      <button className="begin-test-btn" onClick={handleBeginTest}>
        Begin Test
      </button>
    </div>
  );
};

export default TestSched;

