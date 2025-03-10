import React from "react";
import "../../Styles/TestDetails.css";

// Import icons
import { FaLaptop, FaClock } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdAccessTime, MdSchool } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";

const TestDetails = () => {
  return (
    <div className="test-container">
      {/* Test Details Section */}
      <div className="test-section">
        <h2>Test details</h2>
        <div className="test-box">
          <div className="test-item">
            <FaLaptop className="icon" />
            <div>
              <h4>Online mode</h4>
              <p>Join from desktop for better performance</p>
            </div>
          </div>
          <hr />
          <div className="test-item">
            <MdAccessTime className="icon" />
            <div>
              <h4>9 AM to 10 PM</h4>
              <p>Available on all days (Monday to Sunday)</p>
            </div>
          </div>
          <hr />
          <div className="test-item">
            <BsCalendarEvent className="icon" />
            <div>
              <h4>60 mins. duration</h4>
              <p>To submit your test</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Criteria Section */}
      <div className="eligibility-section">
        <h2>Eligibility Criteria</h2>
        <div className="test-box">
          <div className="test-item">
            <IoIosPeople className="icon" />
            <div>
              <h4>Class 6th to 12th students</h4>
              <p>All State boards, CBSE and ICSE/ISC boards students are eligible for iACST test</p>
            </div>
          </div>
          <hr />
          <div className="test-item">
            <MdSchool className="icon" />
            <div>
              <h4>Class 5th passing students</h4>
              <p>Students moving from 5th to 6th class are also eligible</p>
            </div>
          </div>
          <hr />
          <div className="test-item">
            <MdSchool className="icon" />
            <div>
              <h4>Class 12th passed students</h4>
              <p>Students who have passed class 12th are also eligible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
