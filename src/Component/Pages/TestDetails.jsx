import React from "react";
import "../../Styles/TestDetails.css";

// Import icons


const TestDetails = () => {
  return (
    <div>
      {/* Test Details and Eligibility Sections */}
      <div className="test-container2">
        {/* Test Details Section */}
        <div className="test-section">
          <h2>Test details</h2>
          <div className="test-box">
            <div className="test-item">
              <div>
                <h4>Online mode</h4>
                <p>Join from desktop for better performance</p>
              </div>
            </div>
            <hr />
            <div className="test-item">
              <div>
                <h4>Flexible Timing</h4>
                <p>You can take the test at any time as per your availability</p>
              </div>
            </div>
            <hr />
            <div className="test-item">
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
              <div>
                <h4>Class 10th to 12th students</h4>
                <p>All State boards, CBSE and ICSE/ISC boards students are eligible</p>
              </div>
            </div>
            <hr />
            <div className="test-item">
              <div>
                <h4>Class 12th passed students (Droppers)</h4>
                <p>Students who have passed class 12th and are taking a drop year are also eligible</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Banner as a Footer */}
      <div className="scholarship-banner">
        <p>
          iACST Scholarship(s) are valid for <strong>30 days</strong> only.
        </p>
      </div>
    </div>
  );
};

export default TestDetails;
