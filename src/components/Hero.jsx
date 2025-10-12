import React, { useRef } from "react";
import { useTranslation } from "react-i18next"; // <-- NEW IMPORT
import "../CSS/Hero.css";

export default function Hero() {
  const { t, i18n } = useTranslation();
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

  // 1. Determine the highlighted phrase based on the current language
  const isEnglish = i18n.language.startsWith("en");
  const highlightedPhrase = isEnglish
    ? "Intelligent Tools." // English highlight text
    : "Herramientas Inteligentes."; // Spanish highlight text (from your JSON)

  // 2. The full headline text from the translation file
  const headlineText = t("hero.headline");

  // 3. Split the headline using the correct phrase
  const headlineParts = headlineText.split(highlightedPhrase);

  return (
    <section className="hero-section">
      {/* Left side: Text Content */}
      <div className="hero-content-wrapper">
        <div className="hero-text-container">
          <h1 className="hero-headline">
            {/* Map over the parts created by the split */}
            {headlineParts.map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {/* If a part exists after the split, re-insert the highlighted phrase in a span */}
                {index < headlineParts.length - 1 && <span className="highlight-text1">{highlightedPhrase}</span>}
              </React.Fragment>
            ))}
          </h1>
          {/* Container for the new single button */}
          <div className="hero-cta-container">
            <a href="https://oneretire.netlify.app/" target="_blank" rel="noopener noreferrer">
              <button className="cta-button secondary">
                {t("hero.cta")}
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
          <img src="/heroharp.jpeg" alt="Futuristic digital harp" className="hero-image" />
          <video ref={videoRef} src="/videos/herovideo.mp4" className="hero-video" loop muted playsInline />
        </div>
      </div>
    </section>
  );
}
