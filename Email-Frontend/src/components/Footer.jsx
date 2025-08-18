import React from "react";
import "./Footer.css";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo-icon">
            <FaEnvelope />
          </div>
          <span className="brand-text"><strong>EmailAI</strong></span>
          <p className="brand-subtext">
            Transform your email experience with AI-powered assistance.
            <br />
            Save time, improve communication, and boost productivity.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="/features">Features</a>
            <a href="/benefits">Benefits</a>
            <a href="/get-started">Get Started</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="/contact">Contact Us</a>
            <a href="/help">Help Center</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} EmailAI. All rights reserved. Built with ❤️
          for better email experiences.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
