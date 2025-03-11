import React from "react";
import { useNavigate } from "react-router-dom";
import DIAST from "../../assets/DTSETEST.png";
import studentimage from "../../assets/student-image2.png";
import "../../Styles/Login.css";
import TestDetails from "./TestDetails";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login form submitted!");
    navigate("/testschedule");
  };

  return (
    <div>
      <div className="login-container">
        {/* Wrapper for Left (Images) and Right (Form) */}
        <div className="two-main">
          {/* Left Side - Images */}
          <div className="left-content">
            <div className="DIAST-image">
              <img src={DIAST} alt="Diast" />
            </div>
            <div className="student-image">
              <img src={studentimage} alt="students" />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="login-right">
            <h2>Login to your dashboard</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input type="text" placeholder="Enter your roll number" required />

              <label>Address</label>
              <input type="text" required />

              {/* <a href="/" className="forgot-link">
              Forgot roll number/password?
            </a> */}

              <button type="submit" className="login-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
      <TestDetails />


    </div>
  );
};

export default Login;
