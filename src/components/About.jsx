import React from "react";
import "../CSS/About.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation"; // Import the hook

const About = React.forwardRef(({ onOpenModal }, ref) => {
  const mainText =
    "We help entrepreneurs, small businesses, and creators turn bold ideas into meaningful digital products. We specialize in elegant, user-friendly websites, custom mobile and web apps, and AI-powered tools and automation. Whether you're starting fresh or scaling fast, we build digital experiences that feel as inspired as your mission.";

  // All the complex logic is now handled by the hook!
  const scrollProgress = useScrollAnimation(ref);

  const darkColor = "rgb(31, 41, 55)";
  const lightColor = "rgb(209, 213, 219)";

  // --- Staggered Animation Logic ---
  // Create a delayed progress for the image. It starts when main progress is at 5%
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.05) / 0.95));

  // Style for the text column (uses the direct scroll progress)
  const textRevealStyle = {
    transform: `translateY(${(1 - scrollProgress) * 200}px)`,
  };

  // Style for the image column (uses the delayed image progress)
  const imageRevealStyle = {
    transform: `translateY(${(1 - imageProgress) * 200}px)`,
  };

  // Calculation for the text highlighting effect
  const highlightedChars = Math.floor(scrollProgress * mainText.length);

  return (
    <section className="about-section" ref={ref}>
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
                  }}
                >
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
