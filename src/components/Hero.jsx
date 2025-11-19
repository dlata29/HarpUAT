import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "../CSS/Hero.module.css";

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
    <section className={styles.heroSection}>
      <div className={styles.heroContentWrapper}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroHeadline}>
            {headlineParts[0]}
            <br />
            <span
              className={`${styles.highlightText1} ${styles.fadeSlide} ${isVisible ? styles.visible : styles.hidden}`}
              style={{ color: phrases[index].color }}
            >
              {phrases[index].text}
            </span>
            {headlineParts[1] || ""}
          </h1>

          <div className={styles.heroCtaContainer}>
            <a href="https://oneretire.netlify.app/" target="_blank" rel="noopener noreferrer" className={`${styles.ctaButton} ${styles.secondary}`}>
              {t("hero.cta")}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.ctaIcon} viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 
          13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 
          0v-6z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.heroVisualContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img
            src="/heroharp.jpeg"
            alt="Futuristic digital harp"
            className={styles.heroImage}
            width="360"
            height="640"
            loading="eager" // Hero image should be eager
            fetchPriority="high"
          />
          <video ref={videoRef} src="/videos/herovideo.mp4" className={styles.heroVideo} loop muted playsInline poster="/heroharp.jpeg" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {};
