import React, { useRef } from "react";
import "../CSS/Hero.css";

export default function Hero() {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="hero-section">
      {/* Left side: Text Content */}
      <div className="hero-text-container">
        <h1 className="hero-headline">
          Transforming Ideas
          <br />
          into <span className="highlight-text1">Intelligent Tools.</span>
        </h1>
        {/* Container for the new single button */}
        <div className="hero-cta-container">
          <a href="https://unjsfpensionc.netlify.app" target="_blank" rel="noopener noreferrer">
            <button className="cta-button secondary">
              OneRetire app is LIVE
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cta-icon" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 
          13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 
          0v-6z"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>

      {/* Right side: Image/Video Visual Element */}
      <div className="hero-visual-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img src="/heroharp.jpg" alt="Futuristic digital harp" className="hero-image" />
        <video ref={videoRef} src="/videos/herovideo.mp4" className="hero-video" loop muted playsInline />
      </div>
    </section>
  );
}
