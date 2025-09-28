import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/Navbar.css";

export default function Navbar({ isVisible }) {
  return (
    <div className={`navbar-wrapper ${isVisible ? "visible" : ""}`}>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
            {/* The SVG is now replaced with your logo image */}
            <img src="/logo.png" alt="Harp & Code Logo" className="logo-img" />
            {/* The company name is updated here */}
            <span>Harp and Code</span>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/features">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">What we offer</NavLink>
          </li>
          <li>
            <NavLink to="/about">Blogs</NavLink>
          </li>
        </ul>

        <div className="navbar-right">
          {/* <button className="btn-secondary">Join Waitlist</button> */}
          <button className="btn-primary">Contact Us</button>
        </div>
      </nav>
    </div>
  );
}
