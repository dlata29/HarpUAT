import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "../CSS/FeaturedWork.module.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const FeaturedWork = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const scrollProgress = useScrollAnimation(sectionRef);

  // Animation logic: Slide up and fade in
  // We want the animation to start when the section enters the viewport
  const progress = Math.min(Math.max(scrollProgress, 0), 1);

  const imageRevealStyle = {
    transform: `translateY(${(1 - progress) * 80}px)`, // Slide up from 80px down
    opacity: Math.min(1, progress * 1.5), // Fade in slightly faster
    transition: "transform 0.1s linear, opacity 0.1s linear", // Smooth out the frame updates
  };

  return (
    <section id="featured-work" ref={sectionRef} className={styles.featuredWorkSection}>
      <div className={styles.featuredWorkContainer}>
        <div className={styles.featuredWorkHeader}>
          <p className={styles.featuredWorkSubtitle}>{t("featured_work.subtitle")}</p>
          <h2 className={styles.featuredWorkTitle}>{t("featured_work.title")}</h2>
        </div>
        <div className={styles.featuredWorkImageWrapper} style={imageRevealStyle}>
          <a href="https://oneretire.netlify.app/" target="_blank" rel="noopener noreferrer" aria-label="Open OneRetire">
            <img
              src="/featured_work.jpg"
              alt={t("featured_work.alt_text")}
              loading="lazy"
              decoding="async"
              width="1920"
              height="1080"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
