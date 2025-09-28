import React, { useRef, useState, useEffect } from "react";
import "../CSS/About.css";

const About = React.forwardRef(({ onOpenModal }, ref) => {
  const textContainerRef = useRef(null);
  const imageRef = useRef(null);

  const mainText =
    "We help entrepreneurs, small businesses, and creators turn bold ideas into meaningful digital products. We specialize in elegant, user-friendly websites, custom mobile and web apps, and AI-powered tools and automation. Whether you're starting fresh or scaling fast, we build digital experiences that feel as inspired as your mission.";

  const [highlightedChars, setHighlightedChars] = useState(0);
  const [scale, setScale] = useState(0.4); // start image at 40%

  const darkColor = "rgb(31, 41, 55)";
  const lightColor = "rgb(209, 213, 219)";

  const handleScroll = () => {
    if (textContainerRef.current && imageRef.current) {
      const { top, height } = textContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 🔹 Progress for text highlighting (0 → 1)
      let textProgress = (windowHeight - top) / (windowHeight + height * 0.5);
      textProgress = (windowHeight - top) / windowHeight;
      textProgress = Math.max(0, Math.min(1, textProgress));
      const charCount = Math.floor(textProgress * mainText.length);
      setHighlightedChars(charCount);

      // 🔹 Progress for image scaling (0 → 1)
      let imageProgress = (windowHeight - top) / windowHeight;
      imageProgress = Math.max(0, Math.min(1, imageProgress));

      // 🔹 Scale image between 0.4 → 1 based on scroll
      const newScale = 0.5 + imageProgress * 0.6;
      setScale(newScale);
    }
  };

  const handleAboutScroll = () => {
    if (textContainerRef.current) {
      const { top, height } = textContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = (windowHeight - top) / (windowHeight + height);

      progress = (windowHeight - top) / windowHeight;
      progress = Math.max(0, Math.min(1, progress));

      const charCount = Math.floor(progress * mainText.length);
      setHighlightedChars(charCount);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="about-section" ref={ref}>
      <div className="about-container">
        <div className="about-image-column">
          <img
            ref={imageRef}
            src="public/HarpAboutUS.png"
            alt="Harp and Code Team"
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)", // smooth ease
            }}
          />
        </div>
        <div className="about-text-column" ref={textContainerRef}>
          <span className="about-tag">About Harp & Code</span>
          <h1 className="about-headline">We partner with visionaries</h1>
          <div className="about-description">
            <p>
              {mainText.split("").map((char, index) => (
                <span
                  key={index}
                  style={{
                    color: index < highlightedChars ? darkColor : lightColor,
                    transition: "color 0.2s linear",
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
      </div>
    </section>
  );
});

export default About;
