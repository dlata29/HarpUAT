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
          <img
            src="/featured_work.jpg" // Assumes you've renamed the file in your /public folder
            alt={t("featured_work.alt_text")}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
