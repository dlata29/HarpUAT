import React, { useRef, useState, useEffect } from "react";
import "../CSS/About.css";

const About = React.forwardRef(({ onOpenModal }, ref) => {
  const textContainerRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);

  const mainText =
    "We help entrepreneurs, small businesses, and creators turn bold ideas into meaningful digital products. We specialize in elegant, user-friendly websites, custom mobile and web apps, and AI-powered tools and automation. Whether you're starting fresh or scaling fast, we build digital experiences that feel as inspired as your mission.";

  const [highlightedChars, setHighlightedChars] = useState(0);
  const [scale, setScale] = useState(0.4); // start image at 40%

  const darkColor = "rgb(31, 41, 55)";
  const lightColor = "rgb(209, 213, 219)";

  useEffect(() => {
    const handleScroll = () => {
      if (descriptionRef.current) {
        const rect = descriptionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // how much of the description is visible
        const progress = Math.min(
          Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
          3
        );

        setHighlightedChars(Math.floor(progress * mainText.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mainText.length]);

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
          <div className="about-description" ref={descriptionRef}>
            <p>
              {mainText.split("").map((char, index) => (
                <span
                  key={index}
                  style={{
                    color: index < highlightedChars ? "rgb(31, 41, 55)" : "rgb(209, 213, 219)",
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
