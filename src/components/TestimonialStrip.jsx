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
      quote: "Working with them was a game-changer. True professionals who deliver excellence and innovation.",
      name: "Jane Doe",
      designation: "CEO, Innovate Inc.",
    },
    {
      quote: "Their attention to detail and commitment to our vision was outstanding. Highly recommended.",
      name: "John Smith",
      designation: "CTO, Future Solutions",
    },
    {
      quote: "An incredible team that transformed our digital presence. The results speak for themselves.",
      name: "Emily White",
      designation: "Marketing Director, Growth Co.",
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
