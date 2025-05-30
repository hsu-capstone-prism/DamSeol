import React from "react";
import "../styles/StudyPage.css";

const GramProgressBar = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <div className="progress-bar">
      {Array.from({ length: Math.min(totalSteps, 3) }, (_, index) => (
        <div
          key={index}
          className={`step ${index < currentStep ? "completed" : ""} ${
            index === currentStep ? "current" : ""
          }`}
          onClick={() => {
            if (index > currentStep) {
              onStepClick(index); // 현재 인덱스보다 뒤쪽만 클릭 가능
            }
          }}
          style={{
            cursor: index > currentStep ? "pointer" : "default",
            opacity: index < currentStep ? 0.8 : 1,
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default GramProgressBar;
