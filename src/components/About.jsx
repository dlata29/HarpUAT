import React from "react";
import "../CSS/About.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation"; // Import the hook

const About = React.forwardRef(({ onOpenModal }, ref) => {
  const mainText =
    "Founded by a former UN staff member behind OneRetire, we turn complex challenges into simple, practical solutions. From web apps and custom software to AI tools, we help organizations and entrepreneurs make technology work for them. Combining real-world insight with technical expertise, we build tools that are reliable, useful, and impactful.";

  // All the complex logic is now handled by the hook!
  const scrollProgress = useScrollAnimation(ref);

  const darkColor = "rgb(31, 41, 55)";
  const lightColor = "rgb(209, 213, 219)";

  // --- Staggered Animation Logic ---
  // Create a delayed progress for the image. It starts when main progress is at 5%
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.05) / 0.95));

  // Style for the text column (uses the direct scroll progress)
  // const textRevealStyle = {
  //   transform: `translateY(${(1 - scrollProgress) * 100}px)`,
  // };
  const textRevealStyle = {
    transform: `translateY(${(1 - scrollProgress) * 100}px)`,
    opacity: scrollProgress, // fades in from 0 → 1
  };

  // Style for the image column (uses the delayed image progress)
  // const imageRevealStyle = {
  //   transform: `translateY(${(1 - imageProgress) * 100}px) scale(${0.8 + 0.2 * imageProgress})`,
  // };
  /*above one is for simple zoom out */

  const imageRevealStyle = {
    transform: `translateY(${(1 - imageProgress) * 100}px) scale(${0.8 + 0.2 * imageProgress})`,
    opacity: imageProgress, // fades in from 0 → 1
  };

  // Calculation for the text highlighting effect
  const highlightedChars = Math.floor(scrollProgress * mainText.length);

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-container">
        {/* Apply the textRevealStyle here */}
        <div className="about-text-column" style={textRevealStyle}>
          <span className="about-tag">About Harp & Code</span>
          <h2 className="about-headline">We partner with visionaries</h2>
          <div className="about-description">
            <p>
              {mainText.split("").map((char, index) => (
                <span
                  key={index}
                  style={{
                    color: index < highlightedChars ? darkColor : lightColor,
                    transition: "color 0.15s linear",
                  }}>
                  {char}
                </span>
              ))}
            </p>
          </div>
          <button className="about-contact-button" onClick={onOpenModal}>
            Contact Us
          </button>
        </div>

        {/* Apply the imageRevealStyle here */}
        <div className="about-image-column" style={imageRevealStyle}>
          <img src="/greg-rakozy-oMpAz-DN-9I-unsplash (1).jpg" alt="Harp and Code Team" />
        </div>
      </div>
    </section>
  );
});

export default About;
