import React from "react";
import "../CSS/CallbackFormModal.css";

const CallbackFormModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-grid">
          {/* Left Side */}
          <div className="modal-left">
            <h2 className="modal-title">Let's Talk</h2>
            <form className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input type="text" id="company" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" />
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="modal-right">
            <div className="contact-links">
              <a href="mailto:hello@harpcode.com">hello@harpcode.com</a>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
            <form className="modal-form message-form">
              <div className="form-group flex-grow">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" rows="8"></textarea>
              </div>
              <div className="submit-container">
                <button type="submit" className="submit-button">
                  SUBMIT &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default CallbackFormModal;
