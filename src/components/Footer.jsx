import React from "react";
import "../CSS/Footer.css";

// The onOpenModal prop is now directly used on the button for cleaner functionality.
export default function Footer({ onOpenModal }) {
  return (
    <footer id="contact" className="footer-section">
      <div className="footer-container">
        {/* Left Side: Featured Work */}
        <a href="https://oneretire.com/" target="_blank" rel="noopener noreferrer" className="featured-work-card">
          <img src="/oneretire.png" alt="OneRetire App" className="base-image" />
          <div className="hover-overlay">
            <div className="hover-content">
              <p className="hover-title">OneRetire App</p>
              <p className="hover-cta">View Project &rarr;</p>
            </div>
          </div>
          <div className="static-text">
            <p>Featured Work</p>
          </div>
        </a>

        {/* Right Side: Contact Info */}
        <div className="contact-info-column">
          <h2 className="footer-headline">
            Let's create something <span className="highlight-text">special</span>
          </h2>
          <p className="footer-tagline">If you've got a project in mind, get in touch and let's get started!</p>
          <div className="footer-actions">
            {/* The button now directly triggers the modal, which is more efficient. */}
            <button className="footer-contact-button" onClick={onOpenModal}>
              LET'S TALK
            </button>
          </div>

          <div className="footer-details">
            <div>
              <h3 className="details-heading">Contact</h3>
              <a href="mailto:info@harpandcode.io" className="details-link">
                info@harpandcode.io
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
