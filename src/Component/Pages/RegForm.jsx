// import React, { useState } from "react";
// import axios from "axios";
// import "../../Styles/RegForm.css";
// import { Link } from "react-router-dom";
// import DIAST from "../../assets/DIAST.png";
// import studentimage from "../../assets/student-image2.png";
// import Calendar from "../../assets/Calendar.png";
// import TestDetails from "./TestDetails";

// const RegForm = () => {
//     const [mobile, setMobile] = useState("");
//     const [otp, setOtp] = useState("");
//     const [otpSent, setOtpSent] = useState(false);
//     const [verified, setVerified] = useState(false);
//     const [error, setError] = useState("");

//     const validateMobile = (value) => {
//         if (!/^\d{10}$/.test(value)) {
//             setError("Enter a valid 10-digit mobile number.");
//             return false;
//         }
//         setError("");
//         return true;
//     };

//     const handleChange = (e) => {
//         setMobile(e.target.value);
//         validateMobile(e.target.value);
//     };

//     // Function to send OTP
//     const sendOtp = async () => {
//         if (!validateMobile(mobile)) return;

//         try {
//             const response = await axios.post("http://localhost:5000/api/send-otp", { mobile });
//             if (response.data.success) {
//                 setOtpSent(true);
//                 setError("");
//             } else {
//                 setError("Failed to send OTP. Try again.");
//             }
//         } catch (err) {
//             setError("Error sending OTP. Please check your connection.");
//         }
//     };

//     // Function to verify OTP
//     const verifyOtp = async () => {
//         try {
//             const response = await axios.post("http://localhost:5000/api/verify-otp", { mobile, otp });
//             if (response.data.success) {
//                 setVerified(true);
//                 setError("");
//             } else {
//                 setError("Invalid OTP. Please try again.");
//             }
//         } catch (err) {
//             setError("Error verifying OTP. Please try again.");
//         }
//     };

//     return (
//         <div className="mainPart">
//             <div className="main-section">
//                 <div className="two-main">
//                     {/* Left Content */}
//                     <div className="left-content">
//                         <div className="DIAST-image">
//                             <img src={DIAST} alt="Diast" />
//                         </div>
//                         <div className="student-image">
//                             <img src={studentimage} alt="students" />
//                         </div>
//                     </div>

//                     {/* Right Form Section */}
//                     <div className="right-form">
//                         <div className="form-container">
//                             <h2>Register Now</h2>
//                             <p className="help-link">How to register?</p>

//                             {/* Mobile Number Input */}
//                             <input
//                                 type="text"
//                                 placeholder="Enter Mobile No."
//                                 className={`input-box ${error ? "error" : ""}`}
//                                 value={mobile}
//                                 onChange={handleChange}
//                                 disabled={otpSent} // Disable input after sending OTP
//                             />
//                             {error && <p className="error-message">{error}</p>}

//                             {/* OTP Verification */}
//                             {!otpSent ? (
//                                 <button className="verify-button" onClick={sendOtp}>
//                                     Send OTP
//                                 </button>
//                             ) : (
//                                 <>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter OTP"
//                                         className="input-box"
//                                         value={otp}
//                                         onChange={(e) => setOtp(e.target.value)}
//                                     />
//                                     <button className="verify-button" onClick={verifyOtp}>
//                                         Verify OTP
//                                     </button>
//                                 </>
//                             )}

//                             {/* Registration Success Message */}
//                             {verified && <p className="success-text">✅ Registration Successful!</p>}

//                             <p className="login-text">
//                                 Already registered? <Link to="/login">Log in</Link>
//                             </p>
//                             <p className="terms">
//                                 By proceeding, you agree to DOT’s <a href="/privacy">Privacy Policy</a> and <a href="/terms">T&C</a>.
//                             </p>
//                         </div>

//                         {/* Footer Moved Inside Form Section */}
//                         <footer className="footer">🎉 More than 155,300 Scholarships awarded last year</footer>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <TestDetails />
//             </div>

//             <div className="scholarship-banner">
//                 <p>
//                     iACST Scholarship(s) are valid for <strong>30 days</strong> only.
//                 </p>
//                 <img src={Calendar} alt="Calendar" className="calendar-image" />
//             </div>
//         </div>
//     );
// };

// export default RegForm;
import React, { useState } from "react";
import axios from "axios";
import "../../Styles/RegForm.css";
import { Link } from "react-router-dom";
import DIAST from "../../assets/DIAST.png";
import studentimage from "../../assets/student-image2.png";
import Calendar from "../../assets/Calendar.png";
import TestDetails from "./TestDetails";

const RegForm = () => {
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // New loading state

    const validateMobile = (value) => {
        if (!/^\d{10}$/.test(value)) {
            setError("Enter a valid 10-digit mobile number.");
            return false;
        }
        setError("");
        return true;
    };

    const handleChange = (e) => {
        setMobile(e.target.value);
        validateMobile(e.target.value);
    };

    // Function to send OTP
    const sendOtp = async () => {
        if (!validateMobile(mobile)) return;

        setLoading(true); // Start loading
        try {
            const response = await axios.post("http://localhost:5000/api/send-otp", { mobile: `${mobile}` });

            if (response.data.success) {
                setOtpSent(true);
                setError("");
            } else {
                setError("Failed to send OTP. Try again.");
            }
        } catch (err) {
            setError("Error sending OTP. Please check your connection.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Function to verify OTP
    const verifyOtp = async () => {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await axios.post("http://localhost:5000/api/verify-otp", { mobile: `+91${mobile}`, otp });

            if (response.data.success) {
                setVerified(true);
                setError("");
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            setError("Error verifying OTP. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="mainPart">
            <div className="main-section">
                <div className="two-main">
                    {/* Left Content */}
                    <div className="left-content">
                        <div className="DIAST-image">
                            <img src={DIAST} alt="Diast" />
                        </div>
                        <div className="student-image">
                            <img src={studentimage} alt="students" />
                        </div>
                    </div>

                    {/* Right Form Section */}
                    <div className="right-form">
                        <div className="form-container">
                            <h2>Register Now</h2>
                            <p className="help-link">How to register?</p>

                            {/* Mobile Number Input */}
                            <input
                                type="text"
                                placeholder="Enter Mobile No."
                                className={`input-box ${error ? "error" : ""}`}
                                value={mobile}
                                onChange={handleChange}
                                disabled={otpSent} // Disable input after sending OTP
                            />
                            {error && <p className="error-message">{error}</p>}

                            {/* OTP Verification */}
                            {!otpSent ? (
                                <button className="verify-button" onClick={sendOtp} disabled={loading || otpSent}>
                                    {loading ? "Sending..." : "Send OTP"}
                                </button>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="input-box"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button className="verify-button" onClick={verifyOtp} disabled={loading}>
                                        {loading ? "Verifying..." : "Verify OTP"}
                                    </button>
                                </>
                            )}

                            {/* Registration Success Message */}
                            {verified && <p className="success-text">✅ Registration Successful!</p>}

                            <p className="login-text">
                                Already registered? <Link to="/">Log in</Link>
                            </p>
                            <p className="terms">
                                By proceeding, you agree to DOT’s <a href="/privacy">Privacy Policy</a> and <a href="/terms">T&C</a>.
                            </p>
                        </div>

                        {/* Footer Moved Inside Form Section */}
                        <footer className="footer">🎉 More than 155,300 Scholarships awarded last year</footer>
                    </div>
                </div>
            </div>

            <div>
                <TestDetails />
            </div>

            <div className="scholarship-banner">
                <p>
                    iACST Scholarship(s) are valid for <strong>30 days</strong> only.
                </p>
                <img src={Calendar} alt="Calendar" className="calendar-image" />
            </div>
        </div>
    );
};

export default RegForm;


// import "../../Styles/RegForm.css";
// import { Link } from "react-router-dom";
// import DIAST from "../../assets/DIAST.png";
// import studentimage from "../../assets/student-image2.png";
// import Calendar from "../../assets/Calendar.png";
// import TestDetails from "./TestDetails";

// const RegForm = () => {
//     return (
//         <div className="mainPart">
//             <div className="main-section">
//                 <div className="two-main">
//                     {/* Left Content */}
//                     <div className="left-content">
//                         <div className="DIAST-image">
//                             <img src={DIAST} alt="Diast" />
//                         </div>
//                         <div className="student-image">
//                             <img src={studentimage} alt="students" />
//                         </div>
//                     </div>

//                     {/* Right Form Section */}
//                     <div className="right-form">
//                         <div className="form-container">
//                             <h2>Register Now</h2>
//                             <p className="help-link">How to register?</p>

//                             {/* Mobile Number Input */}
//                             <input
//                                 type="text"
//                                 placeholder="Enter Mobile No."
//                             />
                       
//                             <p className="login-text">
//                                 Already registered? <Link to="/">Log in</Link>
//                             </p>
//                             <p className="terms">
//                                 By proceeding, you agree to DOT’s <a href="/privacy">Privacy Policy</a> and <a href="/terms">T&C</a>.
//                             </p>
//                         </div>

//                         {/* Footer Moved Inside Form Section */}
//                         <footer className="footer">🎉 More than 155,300 Scholarships awarded last year</footer>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <TestDetails />
//             </div>

//             <div className="scholarship-banner">
//                 <p>
//                     iACST Scholarship(s) are valid for <strong>30 days</strong> only.
//                 </p>
//                 <img src={Calendar} alt="Calendar" className="calendar-image" />
//             </div>
//         </div>
//     );
// };

// export default RegForm;