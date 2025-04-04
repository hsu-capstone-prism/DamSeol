import React from "react";
import "../styles/GramStudyPage.css";

const GramProgressBar = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <div className="progress-bar">
      {Array.from({ length: Math.min(totalSteps, 3) }, (_, index) => (
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

export default GramProgressBar;
