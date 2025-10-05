import React, { useState, useEffect } from "react";
import "../CSS/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); // Close mobile menu on click
  };

  return (
    <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <div className="navbar-left">
          {/* <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          ></a> */}
          <div className="logo">harpandcode.io</div>
        </div>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <a href="#products" onClick={(e) => handleLinkClick(e, "products")}>
              Services
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleLinkClick(e, "about")}>
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")}>
              Contact
            </a>
          </li>
        </ul>

        {/* Hamburger for mobile/tablet */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </nav>
    </div>
  );
}
