import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../CSS/Hero.css";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const isEnglish = i18n.language.startsWith("en");

  // Rotating phrases (you can translate or adjust colors later)
  const phrases = isEnglish
    ? [
        { text: "Intelligent Tools.", color: "#96FFE9" },
        { text: "Delightful Experiences.", color: "#96FFE9" },
        { text: "Purposeful Products.", color: "#96FFE9" },
        { text: "Digital Poetry.", color: "#96FFE9" },
      ]
    : [
        { text: "Herramientas Inteligentes.", color: "#96FFE9" },
        { text: "Experiencias Atractivas.", color: "#96FFE9" },
        { text: "Productos con Propósito.", color: "#96FFE9" },
        { text: "Poesía Digital.", color: "#96FFE9" },
      ];

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setIsVisible(true);
      }, 1000);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const headlineParts = t("hero.headline").split(isEnglish ? "Intelligent Tools." : "Herramientas Inteligentes.");

  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        <div className="hero-text-container">
          <h1 className="hero-headline">
            {headlineParts[0]}
            <span className={`highlight-text1 fade-slide ${isVisible ? "visible" : "hidden"}`} style={{ color: phrases[index].color }}>
              {phrases[index].text}
            </span>
            {headlineParts[1] || ""}
          </h1>

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

        <div className="hero-visual-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img src="/heroharp.jpeg" alt="Futuristic digital harp" className="hero-image" />
          <video ref={videoRef} src="/videos/herovideo.mp4" className="hero-video" loop muted playsInline />
        </div>
      </div>
    </section>
  );
}
