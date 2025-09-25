import React, { useState, useEffect, useRef } from "react";
import "../CSS/Hero.css";

export default function Hero({ onVideoEnd }) {
  const [showText, setShowText] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 2000);

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.playbackRate = 2;
      videoElement.addEventListener("ended", onVideoEnd);
    }

    return () => {
      clearTimeout(textTimer);
      if (videoElement) {
        videoElement.removeEventListener("ended", onVideoEnd);
      }
    };
  }, [onVideoEnd]);

  return (
    <section className="hero-section">
      {/* Background Video */}
      <video ref={videoRef} className="hero-video" src="/videos/pixelgreen.mp4" autoPlay muted />
    </section>
  );
}
