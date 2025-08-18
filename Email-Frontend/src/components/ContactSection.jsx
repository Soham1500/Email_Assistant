import React, { useState } from "react";
import "./ContactSection.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    try {
      const response = await fetch("https://formspree.io/f/xkgzzqry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
      } else {
        const data = await response.json();
        const msg = data?.error || "❌ Failed to send message. Please try again.";
        setError(msg);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="contact-wrapper" id="contact">
      <h2 className="contact-heading">Get In Touch</h2>
      <p className="contact-subheading">
        Have questions or need a custom solution? We’d love to hear from you.
      </p>

      <div className="contact-card">
        {submitted && <p className="success-message">✅ Thanks for reaching out!</p>}
        {error && <p className="error-message" role="alert">{error}</p>}

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Full Name"
            />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email Address"
            />
          </div>

          <input
            type="text"
            name="company"
            placeholder="Your company name"
            value={formData.company}
            onChange={handleChange}
            aria-label="Company Name"
          />

          <textarea
            name="message"
            placeholder="Tell us about your project or questions..."
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
            aria-label="Message"
          ></textarea>

          <button type="submit" className="submit-button">
            Send Message &gt;
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
