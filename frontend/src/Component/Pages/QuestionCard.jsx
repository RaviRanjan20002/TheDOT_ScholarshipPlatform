
// import React from "react";

// const QuestionCard = ({ question, index, subject, onSelect, selectedAnswer }) => {
//   const handleOptionChange = (event) => {
//     onSelect(question._id, event.target.value); // ✅ Fix: Ensure selection updates correctly
//   };

//   return (
//     <div className="question-card">
//       <h3>{index + 1}. {question.questionText}</h3>
//       {question.options.map((option, i) => (
//         <div key={i}>
//           <input 
//             type="radio" 
//             name={`q${subject}${index}`} 
//             value={option} 
//             onChange={handleOptionChange} 
//             checked={selectedAnswer === option}  // ✅ Fix: Ensure checked state updates
//           /> 
//           {option}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuestionCard;

import React from "react";


const QuestionCard = ({ question, index, subject, onSelect, selectedAnswer }) => {
  const handleOptionSelect = (option) => {
    onSelect(question._id, option);
  };

  return (
    <div className="question-card">
      <h3>{index + 1}. {question.questionText}</h3>

      {/* ✅ "Only one correct answer" text */}
      <p className="question-info">Only one correct answer</p>

      {/* ✅ Styled option boxes instead of radio buttons */}
      <div className="options-container">
        {question.options.map((option, i) => {
          const optionLetter = ["A.", "B.", "C.", "D."][i]; // Assigning A, B, C, D
          return (
            <div
              key={i}
              className={`option-box ${selectedAnswer === option ? "selected" : ""}`}
              onClick={() => handleOptionSelect(option)}
            >
              <span className="option-letter">{optionLetter}</span> {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
