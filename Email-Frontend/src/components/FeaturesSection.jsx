import React from "react";
import "./FeaturesSection.css";

const features = [
  {
    title: "Smart Email Composition",
    description: "Generate professional emails with AI assistance, perfect tone, and proper formatting.",
    icon: "✍️",
  },
  {
    title: "Schedule & Automate",
    description: "Schedule emails for optimal delivery times and set up automated responses.",
    icon: "⏰",
  },
  {
    title: "Multi-Language Support",
    description: "Compose and translate emails in over 50 languages with native fluency.",
    icon: "🌐",
  },
  {
    title: "Privacy & Security",
    description: "End-to-end encryption and privacy-first approach to keep your data secure.",
    icon: "🔒",
  },
  {
    title: "Lightning Fast",
    description: "Process thousands of emails in seconds with our optimized AI algorithms.",
    icon: "⚡",
  },
  {
    title: "Smart Replies",
    description: "Intelligent reply suggestions based on context and your communication style.",
    icon: "💬",
  },
];

const FeaturesSection = React.memo(() => (
  <section className="features-section" id="features" aria-label="App Features">
    <h2 className="features-title">Powerful Features</h2>
    <p className="features-subtitle">
      Everything you need to revolutionize your email workflow and boost productivity
    </p>
    <div className="features-grid">
      {features.map(({ title, description, icon }, index) => (
        <div
          className="feature-card fade-in"
          style={{ animationDelay: `${index * 0.2}s` }}
          key={title} // Use title as key for better React reconciliation
        >
          <div className="feature-icon" aria-hidden="true">{icon}</div>
          <h3 className="feature-title">{title}</h3>
          <p className="feature-desc">{description}</p>
        </div>
      ))}
    </div>
  </section>
));

export default FeaturesSection;
