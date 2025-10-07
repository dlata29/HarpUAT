import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // <-- NEW IMPORT

import "../CSS/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // NEW: Get translation functions and current language
  const { t, i18n } = useTranslation();

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
  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
    closeMenu();
  };
  // Determine if the current language is English
  const isEnglish = i18n.language.startsWith("en");

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
                {t("navbar.about")} {/* <-- UPDATED */}
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleLinkClick(e, "products")}>
                {t("navbar.services")} {/* <-- UPDATED */}
              </a>
            </li>
            <li>
              <a href="#blog" onClick={(e) => handleLinkClick(e, "blog")}>
                {t("navbar.blog")} {/* <-- UPDATED */}
              </a>
            </li>
            <li className="lang-switcher">
              <span
                onClick={() => switchLanguage("en")}
                // Use a dedicated class for styling active/hover state
                className={`lang-option ${isEnglish ? "active" : ""}`}
              >
                EN
              </span>
              <span className="lang-separator">/</span>
              <span
                onClick={() => switchLanguage("es")}
                // Use a dedicated class for styling active/hover state
                className={`lang-option ${!isEnglish ? "active" : ""}`}
              >
                ES
              </span>
            </li>
            {/* END: Language Switcher */}
          </ul>
          <a href="https://calendly.com/harpandcodeio/letstalk" target="_blank" rel="noopener noreferrer" className="lets-talk-button" onClick={closeMenu}>
            {t("navbar.lets_talk")}
          </a>
        </div>
      </nav>
    </div>
  );
}
