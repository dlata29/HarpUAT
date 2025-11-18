import React from "react";
import { useTranslation } from "react-i18next";
import "../CSS/FeaturedWork.css"; // We will create this CSS file next

const FeaturedWork = () => {
  const { t } = useTranslation();

  return (
    <section id="featured-work" className="featured-work-section">
      <div className="featured-work-container">
        <div className="featured-work-header">
          <p className="featured-work-subtitle">{t("featured_work.subtitle")}</p>
          <h2 className="featured-work-title">{t("featured_work.title")}</h2>
        </div>
        <div className="featured-work-image-wrapper">
          <a href="https://oneretire.netlify.app/" target="_blank" rel="noopener noreferrer" aria-label="Open OneRetire">
            <img src="/featured_work.jpg" alt={t("featured_work.alt_text")} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
