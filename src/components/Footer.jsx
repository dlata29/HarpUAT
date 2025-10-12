import React from "react";
import { useTranslation } from "react-i18next";

import "../CSS/Footer.css";

export default function Footer({ onOpenModal }) {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="footer-section">
      <div className="footer-container">
        {/* Left Side: Featured Work */}
        <a href="https://oneretire.com/" target="_blank" rel="noopener noreferrer" className="featured-work-card">
          <img src="/oneretire.jpeg" alt="OneRetire App" className="base-image" />
          <div className="hover-overlay">
            <div className="hover-content">
              <p className="hover-title">{t("footer.project_title")}</p>
              <p className="hover-cta">{t("footer.view_project")}</p>
            </div>
          </div>
          <div className="static-text">
            <p>{t("footer.featured_work")}</p>
          </div>
        </a>

        {/* Right Side: Contact Info */}
        <div className="contact-info-column">
          <h2 className="footer-headline">
            {t("footer.headline_prefix")}
            <span className="highlight-text">special</span>
          </h2>
          <p className="footer-tagline">{t("footer.tagline")}</p>
          <div className="footer-actions">
            <button className="footer-contact-button" onClick={() => window.open("https://calendly.com/harpandcodeio/letstalk", "_blank", "noopener,noreferrer")}>
              {t("footer.lets_talk")}
            </button>
          </div>

          <div className="footer-details">
            <div>
              <h3 className="details-heading">{t("footer.contact_heading")}</h3>
              <a href="mailto:info@harpandcode.io" className="details-link">
                info@harpandcode.io
              </a>
              <p className="details-address">Panama Pacifico Special Economic Area, Panama City</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
