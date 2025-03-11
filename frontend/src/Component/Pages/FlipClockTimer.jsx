import React, { useState, useEffect } from "react";
import "../../Styles/FlipClockTimer.css"; // Import the CSS file

const FlipClockTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time) => String(time).padStart(2, "0");

  return (
    <div className="flip-clock">
      <h3 className="clock-title">TIME REMAINING</h3>
      <div className="clock-container">
        <div className="clock-section">
          <div className="flip-card">
            <span className="top">{formatTime(Math.floor(timeLeft / 60))}</span>
          </div>
          <span className="clock-label">MINUTES</span>
        </div>
        <div className="clock-section">
          <div className="flip-card">
            <span className="top">{formatTime(timeLeft % 60)}</span>
          </div>
          <span className="clock-label">SECONDS</span>
        </div>
      </div>
    </div>
  );
};

export default FlipClockTimer;
