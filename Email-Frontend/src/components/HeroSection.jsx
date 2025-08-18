import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import "./HeroSection.css";
import EmailAssistantPopup from "./EmailAssistantPopup.jsx";

const HeroSection = () => {
  const { isSignedIn } = useUser();
  const [showEmailAssistant, setShowEmailAssistant] = useState(false);

  const handleStartTrial = () => {
    setShowEmailAssistant(true);
  };

  const handleCloseAssistant = () => {
    setShowEmailAssistant(false);
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Effortless Email Management with AI</h1>
          <p className="hero-subtitle">
            Craft perfect emails in seconds, manage your inbox effortlessly, and boost your productivity with our smart AI assistant.
          </p>
          <div className="hero-buttons">
            {isSignedIn && (
              <button
                onClick={handleStartTrial}
                className="btn primary-btn"
                aria-label="Start free trial"
              >
                Start Free Trial →
              </button>
            )}
            <a href="#features" className="btn secondary-btn">Learn More</a>
          </div>
        </div>
      </section>

      {showEmailAssistant && (
        <EmailAssistantPopup onClose={handleCloseAssistant} />
      )}
    </>
  );
};

export default HeroSection;