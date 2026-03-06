import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../CSS/Navbar.module.css";

export default function Navbar({ isVisible, onOpenModal }) {
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
    <div className={`${styles.navbarWrapper} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.navbar}>
        <a href="/" className={styles.logo}>
          harpandcode.io
        </a>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          ☰
        </button>

        <div className={`${styles.navbarRight} ${menuOpen ? styles.show : ""}`}>
          <ul className={styles.navLinks}>
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
              <a href="#auditplan-pro" onClick={(e) => handleLinkClick(e, "auditplan-pro")}>
                AuditPlan Pro
              </a>
            </li>
            <li>
              <a href="#blog" onClick={(e) => handleLinkClick(e, "blog")}>
                {t("navbar.blog")} {/* <-- UPDATED */}
              </a>
            </li>
            <li className={styles.langSwitcher}>
              <button
                onClick={() => switchLanguage("en")}
                // Use a dedicated class for styling active/hover state
                className={`${styles.langOption} ${isEnglish ? styles.active : ""}`}
                style={{ background: "none", border: "none", padding: 0, font: "inherit" }}
              >
                EN
              </button>
              <span className={styles.langSeparator}>/</span>
              <button
                onClick={() => switchLanguage("es")}
                // Use a dedicated class for styling active/hover state
                className={`${styles.langOption} ${!isEnglish ? styles.active : ""}`}
                style={{ background: "none", border: "none", padding: 0, font: "inherit" }}
              >
                ES
              </button>
            </li>
            {/* END: Language Switcher */}
          </ul>
          <button
            className={styles.letsTalkButton}
            onClick={() => {
              onOpenModal("project");
              closeMenu();
            }}
          >
            {t("modal.start_project")}
          </button>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  isVisible: PropTypes.bool,
  onOpenModal: PropTypes.func,
};
