import React, { Suspense, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "../CSS/Footer.module.css";

// --- SVG Icons ---
// I've added these SVG components for the icons.
// They are set to use `fill="currentColor"` to inherit the white color from CSS.

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.36-6.992-6.03 6.992h-3.308l7.749-8.986-8.26-10.514h6.817l4.806 6.319zm-0.756 18.252h1.66l-9.72-12.572h-1.79l9.85 12.572z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.582 7.004c-.2-1.339-.985-2.39-2.227-2.617-2.912-.6-14.742-.6-17.653 0-1.242.228-2.028 1.278-2.227 2.617-.375 2.639-.375 10.742 0 13.382.2 1.339.985 2.39 2.227 2.617 2.912.6 14.742.6 17.653 0 1.242-.228 2.028-1.278 2.227-2.617.375-2.64.375-10.743 0-13.382zM9.546 15.549v-8.1l7.152 4.05-7.152 4.05z" />
  </svg>
);

// --- End SVG Icons ---

// --- LAZY IMPORT THE GLOBE ---
// This tells React to load this component (and all its libraries)
// only when the footer is rendered.
const InteractiveGlobe = React.lazy(() => import("./InteractiveGlobe"));
// --- END LAZY IMPORT ---

export default function Footer({ onOpenModal }) {
  const { t } = useTranslation();
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadGlobe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load 200px before it comes into view
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className={styles.footerSection} ref={footerRef}>
      <div className={styles.footerContainer}>
        {/* Left Side: Featured Work */}
        {/* <a href="https://oneretire.netlify.app/" target="_blank" rel="noopener noreferrer" className="featured-work-card">
          <img src="/oneretire.jpeg" alt="OneRetire App" className="base-image" />
          <div className="hover-overlay">
            <div className="hover-content">
              <p className="hover-title">{t("footer.project_title")}</p>
              <p className="hover-cta">{t("footer.view_project")}</p>
            </div>
          </div>
          <div className="static-text">
            <p>{t("footer.featured_work")}</p>
          </div>
        </a> */}

        {/* --- THIS IS THE REPLACEMENT --- */}
        {/* We keep the wrapper class to reuse the sizing and positioning */}
        <div className={styles.featuredWorkCard}>
          {shouldLoadGlobe ? (
            <Suspense fallback={<div className={styles.globeLoadingPlaceholder} />}>
              <InteractiveGlobe />
            </Suspense>
          ) : (
            <div className={styles.globeLoadingPlaceholder} />
          )}
        </div>
        {/* --- END REPLACEMENT --- */}
        {/* Right Side: Contact Info */}
        <div className={styles.contactInfoColumn}>
          <h2 className={styles.footerHeadline}>
            {t("footer.headline_prefix")}
            <span className={styles.highlightText}>special</span>
          </h2>
          <p className={styles.footerTagline}>{t("footer.tagline")}</p>
          <div className={styles.footerActions}>
            <button className={styles.footerContactButton} onClick={() => window.open("https://calendly.com/harpandcodeio/letstalk", "_blank", "noopener,noreferrer")}>
              {t("footer.lets_talk")}
            </button>
          </div>

          <div className={styles.footerDetails}>
            {/* START: UPDATED SECTION */}
            <div className={styles.detailsSection}>
              <h3 className={styles.detailsHeading}>{t("footer.contact_heading")}</h3>
              <a href="mailto:info@harpandcode.io" className={styles.detailsLink}>
                info@harpandcode.io
              </a>
              {/* --- ADDED SOCIAL ICONS --- */}
              <div className={styles.socialIcons}>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <TwitterIcon />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <YouTubeIcon />
                </a>
              </div>
              {/* --- END SOCIAL ICONS --- */}
            </div>
            <div className={styles.detailsSection}>
              <h3 className={styles.detailsHeading}>{t("footer.address_heading")}</h3>
              <p className={styles.detailsAddress}>Panama Pacifico Special Economic Area, Panama City</p>
              {/* --- ADDED MAP --- */}
              <div className={styles.mapContainer}>
                <img src="/panama-map.png" alt="Map of Panama" className={styles.footerMap} width="150" height="100" loading="lazy" />
              </div>
              {/* --- END MAP --- */}
            </div>
            {/* END: UPDATED SECTION */}
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  onOpenModal: PropTypes.func,
};
