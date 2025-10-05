import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // --- UPDATE THIS LINE ---
      // Trigger the "scrolled" state when the user has scrolled more than 90% of the viewport's height.
      const shouldBeScrolled = window.scrollY > window.innerHeight * 0.9;
      setScrolled(shouldBeScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

    // If we're not on the homepage, navigate there first.
    if (location.pathname !== "/") {
      navigate("/");
      // Use a timeout to ensure the page has navigated before scrolling
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If already on the homepage, just scroll.
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <a href="/" className="logo">
          harpandcode.io
        </a>

        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>

        <div className={`navbar-right ${menuOpen ? "show" : ""}`}>
          <ul className="nav-links">
            <li>
              <a href="#about" onClick={(e) => handleLinkClick(e, "about")}>
                ABOUT
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleLinkClick(e, "products")}>
                SERVICES
              </a>
            </li>
            <li>
              <a href="#blog" onClick={(e) => handleLinkClick(e, "blog")}>
                BLOG
              </a>
            </li>
          </ul>
          <a
            href="https://calendly.com/your-link" // <-- REPLACE WITH YOUR CALENDLY LINK
            target="_blank"
            rel="noopener noreferrer"
            className="lets-talk-button"
            onClick={closeMenu}
          >
            LET'S TALK
          </a>
        </div>
      </nav>
    </div>
  );
}
