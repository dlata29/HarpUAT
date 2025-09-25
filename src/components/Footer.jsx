import React from "react";
import "../CSS/Footer.css";

export default function Footer({ onOpenModal }) {
  // Accept onOpenModal prop
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Left Side: Featured Work */}
        <a href="#" target="_blank" rel="noopener noreferrer" className="featured-work-card group">
          {/* Base Image */}
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" alt="Featured Project" className="base-image" />

          {/* Hover Overlay */}
          <div className="hover-overlay">
            <div className="overlay-background"></div>
            <div className="hover-content">
              <p className="hover-title">Web Development Project</p>
              <p className="hover-cta">View Project &rarr;</p>
            </div>
          </div>

          {/* Static Text */}
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
            {/* Add onClick handler to the button */}
            <button className="footer-contact-button" onClick={onOpenModal}>
              Contact Us &rarr;
            </button>
            <a href="#" className="footer-link">
              Book a call via Calendly
            </a>
          </div>

          <div className="footer-details">
            <div>
              <h3 className="details-heading">Address</h3>
              <p className="details-text">
                Harp & Code
                <br />
                123 Creative Lane,
                <br />
                Tech City, 10101
              </p>
            </div>
            <div>
              <h3 className="details-heading">Contact</h3>
              <a href="mailto:hello@harpcode.com" className="details-link">
                hello@harpcode.com
              </a>
              <a href="tel:+1234567890" className="details-link">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
