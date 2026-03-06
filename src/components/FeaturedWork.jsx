import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "../CSS/FeaturedWork.module.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const FeaturedWork = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const scrollProgress = useScrollAnimation(sectionRef);

  const progress = Math.min(Math.max(scrollProgress, 0), 1);

  const projects = [
    {
      title: "AuditPlan Pro",
      subtitle: t("featured_work.auditplan_subtitle"),
      image: "/featured_work.jpg",
      fallbackBg: "#0D9488",
      url: "https://auditplan-pro-production.up.railway.app",
      alt: t("featured_work.auditplan_alt"),
      useFallback: true,
    },
    {
      title: "OneRetire",
      subtitle: t("featured_work.oneretire_subtitle"),
      image: "/featured_work.jpg",
      url: "https://oneretire.netlify.app/",
      alt: t("featured_work.alt_text"),
      useFallback: false,
    },
  ];

  return (
    <section
      id="featured-work"
      ref={sectionRef}
      className={styles.featuredWorkSection}
    >
      <div className={styles.featuredWorkContainer}>
        <div className={styles.featuredWorkHeader}>
          <p className={styles.featuredWorkSubtitle}>
            {t("featured_work.subtitle")}
          </p>
          <h2 className={styles.featuredWorkTitle}>
            {t("featured_work.title")}
          </h2>
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((project, i) => {
            const delay = i * 0.2;
            const itemProgress = Math.min(
              1,
              Math.max(0, (progress - delay) / (1 - delay))
            );

            return (
              <div
                key={i}
                className={styles.projectCard}
                style={{
                  opacity: Math.min(1, itemProgress * 2),
                  transform: `translateY(${(1 - itemProgress) * 40}px)`,
                  transition: "transform 0.1s linear, opacity 0.1s linear",
                }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                  aria-label={`Open ${project.title}`}
                >
                  <div className={styles.projectImageWrapper}>
                    {project.useFallback ? (
                      <div
                        className={styles.projectFallback}
                        style={{ backgroundColor: project.fallbackBg }}
                      >
                        <span className={styles.fallbackIcon}>⚙</span>
                        <span className={styles.fallbackTitle}>
                          {project.title}
                        </span>
                        <span className={styles.fallbackSubtitle}>
                          AI-Powered Audit Planning
                        </span>
                        <span className={styles.fallbackCta}>
                          Try Live Demo →
                        </span>
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.alt}
                        loading="lazy"
                        decoding="async"
                        width="960"
                        height="540"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/960x540/e2e8f0/334155?text=${project.title}`;
                        }}
                      />
                    )}
                  </div>
                </a>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectSubtitle}>{project.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
