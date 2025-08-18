import React from "react";
import "./Navbar.css";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";

const Navbar = React.memo(() => {
  return (
    <nav className="navbar" aria-label="Main navigation">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img
          src="/logo.jpg"
          alt="EmailAI Logo"
          className="logo-icon-img"
          width="40"
          height="40"
          loading="lazy"
        />
        <span className="logo-text">EmailAI</span>
      </div>

      {/* Menu Section */}
      <ul className="navbar-menu">
        <li className="navbar-item active">
          <span className="dot" aria-hidden="true"></span>
          <a href="#features" aria-current="page">
            Features
          </a>
        </li>
        <li className="navbar-item">
          <a href="#benefits">Benefits</a>
        </li>
        <li className="navbar-item">
          <a href="#contact">Contact</a>
        </li>
        <li className="navbar-item">
          <a href="#footer">Footer</a> 
        </li>
      </ul>

      {/* Auth Section */}
      <div className="navbar-cta">
        <SignedIn>
          <div className="user-button-wrapper">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: 36,
                    height: 36,
                  },
                },
              }}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal" redirectUrl="/">
            <button className="get-started-btn" aria-label="Sign in to get started">
              Get Started
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
});

export default Navbar;
