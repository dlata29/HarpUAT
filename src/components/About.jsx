import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import styles from "../CSS/About.module.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const About = React.forwardRef(({ onOpenModal }, ref) => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);

  // Use the custom hook for scroll animations
  const scrollProgress = useScrollAnimation(sectionRef);

  const darkColor = "rgb(17, 24, 39)"; // #111827
  const lightColor = "rgb(156, 163, 175)"; // #9ca3af

  // --- Staggered Animation Logic ---
  // Create a delayed progress for the image. It starts when main progress is at 5%
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.05) / 0.95));

  // --- Text Highlighting Logic ---
  const mainText = t("about.main_text");
  const startReveal = 0; // When scrollProgress starts
  const endReveal = 1; // When text should be fully revealed

  // Map scrollProgress from [startReveal, endReveal] → [0, 1]
  const progress = Math.min(Math.max((scrollProgress - startReveal) / (endReveal - startReveal), 0), 1);

  const highlightedChars = Math.floor(progress * mainText.length);

  // Style for the text column (uses the direct scroll progress)
  const textRevealStyle = {
    transform: `translateY(${(1 - progress) * 50}px)`, // Reduced from 100px to 50px for smoother feel
    opacity: Math.min(1, progress * 2), // Fade in
  };

  // Style for the image column (uses the delayed image progress)
  const imageRevealStyle = {
    transform: `translateY(${(1 - imageProgress) * 50}px) scale(${0.9 + 0.1 * imageProgress})`,
    opacity: Math.min(1, imageProgress * 2),
  };

  // Define the phrases to be made bold in both English and Spanish
  const boldTextEN = "AI-powered tools, web applications, and intelligent automation";
  const boldTextES = "herramientas impulsadas por IA, aplicaciones web y automatización inteligente";

  // Determine which phrase to use based on the current language
  const boldText = i18n.language.startsWith("es") ? boldTextES : boldTextEN;

  // Split the main text into parts based on the phrase to be bolded
  const textParts = mainText.split(boldText);

  let charCount = 0; // Counter to track character position for the animation

  // Helper function to render text with the scroll animation
  const renderAnimatedText = (text, isBold = false) => {
    if (!text) return null;
    return text.split("").map((char, index) => {
      const style = {
        color: charCount < highlightedChars ? darkColor : lightColor,
        transition: "color 0.1s linear",
        // Apply bold font weight if this part should be bold
        fontWeight: isBold ? "700" : "300",
      };
      charCount++;
      // Use a unique key based on the global charCount
      return (
        <span key={charCount} style={style}>
          {char}
        </span>
      );
    });
  };

  return (
    <section id="about" ref={sectionRef} className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        {/* Left Column: Text */}
        <div className={styles.aboutTextColumn} style={textRevealStyle}>
          <span className={styles.aboutTag}>{t("about.tag")}</span>
          <h2 className={styles.aboutHeadline}>{t("about.headline")}</h2>

          <div className={styles.aboutDescription}>
            <p>
              {/* Render the text parts sequentially */}
              {renderAnimatedText(textParts[0])}
              {/* The bolded part */}
              {renderAnimatedText(boldText, true)}
              {/* The part after the bolded text */}
              {renderAnimatedText(textParts[1])}
            </p>
          </div>

          <button className={styles.aboutContactButton} onClick={onOpenModal}>
            <Trans i18nKey="about.contact_button">
              Let&apos;s create something lasting<span className={styles.aboutCtaDesktop}> - something that sings</span>
            </Trans>
          </button>
        </div>

        {/* Right Column: Image */}
        <div className={styles.aboutImageColumn} style={imageRevealStyle}>
          <div className={styles.aboutImageWrapper}>
            <img
              src="/aboutus.jpeg"
              alt="A person looking at a starry sky"
              width="600"
              height="450"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

About.propTypes = {
  onOpenModal: PropTypes.func,
};

About.displayName = "About";

export default About;
