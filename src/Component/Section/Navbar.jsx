import React from "react";
import callIcon from "../../assets/call-icon-iacst.png"; // Ensure correct path
import "../../Styles/Navbar.css";
import logo from "../../assets/dott.png";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img
          src={logo}
          alt="DOT Logo"
        />
        
      </div>
      
      <div className="call-us-section">
        <div className="call-icon">
          <img src={callIcon} alt="calling-icon" />
        </div>
        <div>
          <p className="call-text">Call us</p>
          <a href="tel:9560939372" className="call-number">
            <span>9560939372</span>
          </a>
        </div>
      </div>
      
    </header>
  );
};

export default Navbar;
