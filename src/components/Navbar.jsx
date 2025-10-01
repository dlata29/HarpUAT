import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <span>harpandcode.io</span>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/documentation">Know about us</NavLink>
          </li>
          <li>
            <NavLink to="/customers">Services we offer</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blogs</NavLink>
          </li>
        </ul>

        <div className="navbar-right">
          <button className="btn-secondary">Contact us</button>
          <button className="btn-primary">Book a call</button>
        </div>
      </nav>
    </div>
  );
}
