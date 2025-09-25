import React, { useRef, useState, useEffect } from "react";
import "../CSS/About.css";

const About = React.forwardRef(({ onOpenModal }, ref) => {
  // Accept onOpenModal prop
  const textContainerRef = useRef(null);
  const mainText =
    "We help entrepreneurs, small businesses, and creators turn bold ideas into meaningful digital products. We specialize in elegant, user-friendly websites, custom mobile and web apps, and AI-powered tools and automation. Whether you're starting fresh or scaling fast, we build digital experiences that feel as inspired as your mission.";
  const [highlightedChars, setHighlightedChars] = useState(0);
  const darkColor = "rgb(31, 41, 55)";
  const lightColor = "rgb(209, 213, 219)";

  const handleAboutScroll = () => {
    if (textContainerRef.current) {
      const { top, height } = textContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = (windowHeight - top) / (windowHeight + height);
      progress = Math.max(0, Math.min(1, progress));
      const charCount = Math.floor(progress * mainText.length);
      setHighlightedChars(charCount);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleAboutScroll);
    handleAboutScroll();
    return () => window.removeEventListener("scroll", handleAboutScroll);
  }, []);

  return (
    <section className="about-section" ref={ref}>
      <div className="about-container">
        <div className="about-text-column" ref={textContainerRef}>
          <span className="about-tag">About Harp & Code</span>
          <h2 className="about-headline">We partner with visionaries</h2>
          <div className="about-description">
            <p>
              {mainText.split("").map((char, index) => (
                <span
                  key={index}
                  style={{
                    color: index < highlightedChars ? darkColor : lightColor,
                    transition: "color 0.1s linear",
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>
          {/* Add onClick handler to the button */}
          <button className="about-contact-button" onClick={onOpenModal}>
            Contact Us
          </button>
        </div>

        <div className="about-image-column">
          <img src="/greg-rakozy-oMpAz-DN-9I-unsplash (1).jpg" alt="Harp and Code Team" />
        </div>
      </div>
    </section>
  );
});

export default About;
