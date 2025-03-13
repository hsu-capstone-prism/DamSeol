import React from "react";
import "../styles/WordStudyPage.css";

const WordProgressBar = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <div className="progress-bar">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`step ${index < currentStep ? "completed" : ""} ${
            index === currentStep ? "current" : ""
          }`}
          onClick={() => onStepClick(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default WordProgressBar;
