import React from "react";
import styles from "../CSS/TestimonialStrip.module.css";

// --- Updated Musical Note SVG with Darker Gradient ---
const MusicNote = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={styles.testimonialSeparator} aria-hidden="true">
    <defs>
      {/* MODIFIED: Adjusted gradient colors to be darker */}
      <linearGradient id="music-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#54d1c4" }} />
        <stop offset="100%" style={{ stopColor: "#2a9d9f" }} />
      </linearGradient>
    </defs>
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z" fill="url(#music-gradient)" />
  </svg>
);

const TestimonialStrip = () => {
  const testimonials = [
    {
      quote:
        "AI is not about replacing humans — it’s about amplifying human ingenuity and unlocking new business value.",
      name: "Satya Nadella",
      designation: "CEO, Microsoft",
    },
    {
      quote:
        "In the future, every company will be a software company — and AI will be the engine of that transformation.",
      name: "Satya Nadella",
      designation: "CEO, Microsoft",
    },
    {
      quote:
        "AI will not replace humans, but those who adopt AI will replace those who don’t.",
      name: "Ginni Rometty",
      designation: "Former CEO, IBM",
    },
    {
      quote:
        "Artificial intelligence and generative AI may be the most important technology of any lifetime.",
      name: "Marc Benioff",
      designation: "Chair & CEO, Salesforce",
    },
    {
      quote:
        "Organizations that embrace AI beyond the hype and integrate it deeply into workflows will unlock real value.",
      name: "AI Industry Leaders",
      designation: "Collective Insight",
    },
  ];

  // Duplicate the testimonials for a seamless, infinite loop effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={styles.testimonialStrip}>
      <div className={styles.testimonialTrack}>
        {duplicatedTestimonials.map((testimonial, index) => (
          <React.Fragment key={index}>
            <div className={styles.testimonialItem}>
              <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
              <p className={styles.testimonialAuthor}>
                <strong>{testimonial.name}</strong>, {testimonial.designation}
              </p>
            </div>
            <MusicNote />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TestimonialStrip;
