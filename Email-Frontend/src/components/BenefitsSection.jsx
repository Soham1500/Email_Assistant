// src/components/BenefitsSection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./BenefitsSection.css";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const benefitsList = [
  "Save 5+ hours per week on email management",
  "Improve email response rates by 40%",
  "Maintain consistent professional tone",
  "Never miss important emails again",
  "Reduce email-related stress and overwhelm",
  "Seamless integration with existing email clients",
];

// ✅ Static fallback stats
const staticStats = {
  usageCount: 128,
  hoursSaved: 56,
};

// Backend URL
const BACKEND_URL =
  import.meta.env.VITE_API_URL ||
  "https://email-assistant-9gxg.onrender.com/api";

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useUser();
  const [stats, setStats] = useState(staticStats); // fallback stats

  // Fetch user stats using email to avoid 404
  const fetchStats = async () => {
    if (!user?.emailAddresses?.[0]?.emailAddress) return;
    try {
      const email = encodeURIComponent(user.emailAddresses[0].emailAddress);
      const res = await axios.get(`${BACKEND_URL}/users/by-email/${email}/stats`);
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err.message);
      setStats(staticStats);
    }
  };

  // ✅ The useEffect hook has been modified to remove the setInterval.
  // It now only fetches stats once when the user object changes.
  useEffect(() => {
    fetchStats();
  }, [user]);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      className={`benefits-section ${isVisible ? "animate" : ""}`}
      id="benefits"
      ref={sectionRef}
      aria-labelledby="benefits-heading"
    >
      <div className="benefits-container">
        {/* LEFT TEXT */}
        <div className="benefits-text">
          <h2 id="benefits-heading" className="benefits-heading">
            Why Choose EmailAI?
          </h2>
          <p className="benefits-description">
            Join thousands of professionals who have transformed their email
            workflow with our AI-powered assistant.
          </p>

          <ul className="benefits-list" aria-label="Key benefits">
            {benefitsList.map((item, index) => (
              <li key={index} className="benefits-item">
                <span aria-hidden="true">✅</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT STATS */}
        <div className="benefits-stats-box">
          <div className="stats-card">
            {user ? (
              <>
                <h3>Welcome back, {user.firstName || user.username} 👋</h3>
                <p>✅ Times used: {stats.usageCount}</p>
                <p>⏳ Hours saved: {stats.hoursSaved}</p>
              </>
            ) : (
              <>
                <h3>📊 EmailAI Impact</h3>
                <p>✅ Times used: {staticStats.usageCount}</p>
                <p>⏳ Hours saved: {staticStats.hoursSaved}</p>
                <small>Login with Clerk to see your personalized stats 🚀</small>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;