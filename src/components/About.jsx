import React from "react";
import "../CSS/About.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation"; // Import the hook
import { useTranslation } from "react-i18next"; // <-- NEW IMPORT

const About = React.forwardRef(({ onOpenModal }, ref) => {
  const { t, i18n } = useTranslation(); // <-- Get i18n instance for language detection

  // All the complex logic is now handled by the hook!
  const scrollProgress = useScrollAnimation(ref);

  const darkColor = "rgb(31, 41, 55)";
  const lightColor = "rgb(209, 213, 219)";

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
  // const highlightedChars = Math.floor(scrollProgress * 1.4 * mainText.length);

  // Style for the text column (uses the direct scroll progress)
  const textRevealStyle = {
    transform: `translateY(${(1 - progress) * 100}px)`,
  };

  // Style for the image column (uses the delayed image progress)
  const imageRevealStyle = {
    transform: `translateY(${(1 - imageProgress) * 100}px) scale(${0.9 + 0.1 * imageProgress})`,
  };

  // Define the phrases to be made bold in both English and Spanish
  const boldTextEN = "website design, app development, and AI automation";
  const boldTextES = "diseño de sitios web, desarrollo de aplicaciones y automatización con IA";

  // Determine which phrase to use based on the current language
  const boldText = i18n.language.startsWith("es") ? boldTextES : boldTextEN;

  // Split the main text into parts based on the phrase to be bolded
  const textParts = mainText.split(boldText);

  let charCount = 0; // Counter to track character position for the animation

  // Helper function to render text with the scroll animation
  const renderAnimatedText = (text, isBold = false) => {
    return text.split("").map((char) => {
      const style = {
        color: charCount < highlightedChars ? darkColor : lightColor,
        transition: "color 0.15s linear",
        // Apply bold font weight if this part should be bold
        fontWeight: isBold ? "600" : "300",
      };
      charCount++;
      return (
        <span key={charCount} style={style}>
          {char}
        </span>
      );
    });
  };

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-container">
        {/* Apply the textRevealStyle here */}
        <div className="about-text-column" style={textRevealStyle}>
          <span className="about-tag">{t("about.tag")}</span>
          <h2 className="about-headline">{t("about.headline")}</h2>
          <div className="about-description">
            <p>
              {/* Render the text parts sequentially */}
              {renderAnimatedText(textParts[0])}
              {/* The bolded part */}
              {renderAnimatedText(boldText, true)}
              {/* The part after the bolded text */}
              {renderAnimatedText(textParts[1])}
            </p>
          </div>
          <button className="about-contact-button" onClick={() => window.open("https://calendly.com/harpandcodeio/letstalk", "_blank")}>
            {t("about.contact_button")}
          </button>
        </div>

        {/* Apply the imageRevealStyle here */}
        <div className="about-image-column" style={imageRevealStyle}>
          <div className="about-image-wrapper">
            <img src="/aboutus.jpeg" alt="A person looking at a starry sky" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
