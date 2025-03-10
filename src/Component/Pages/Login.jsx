import React from "react";
import { Link, useNavigate } from "react-router-dom";
import loginpic from "../../assets/login.png";
import "../../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login form submitted!");
    navigate("/testschedule");
  };
  return (
    <div className="login-container">
      {/* Left Side - Image */}
      <div className="login-left">
        <img src={loginpic} alt="Students" className="login-image" />
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <h2>Login to your dashboard</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Roll Number</label>
          <input type="text" placeholder="Enter your roll number" required />

          <label>Password</label>
          <input type="date" required />

          <a href="/" className="forgot-link">Forgot roll number/password?</a>

          <button type="submit" className="login-btn">Login</button>

          <p className="register-text">
            Don't have an account? <Link to="/iacstexam">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

