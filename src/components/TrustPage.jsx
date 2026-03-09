// src/components/TrustPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "../CSS/TrustPage.module.css";

/**
 * Renders inline markdown-style bold text (**text**) as <strong> elements.
 */
function renderFormattedText(text) {
  if (!text) return null;

  // Split by **bold** markers
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => {
    // Odd indices are the bold segments
    if (i % 2 === 1) {
      return <strong key={i}>{part}</strong>;
    }
    return part;
  });
}

/**
 * Reusable trust/legal page component.
 * Renders structured content with dark-theme styling, breadcrumb nav, and SEO tags.
 */
export default function TrustPage({
  title,
  subtitle,
  effectiveDate,
  lastUpdated,
  metaDescription,
  sections,
}) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{title} — harpandcode.io</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <div className={styles.trustPage}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>{title}</span>
          </nav>

          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <div className={styles.dateMeta}>
              {effectiveDate && (
                <span>Effective Date: {effectiveDate}</span>
              )}
              {effectiveDate && lastUpdated && (
                <span className={styles.dateSeparator}>|</span>
              )}
              {lastUpdated && <span>Last Updated: {lastUpdated}</span>}
            </div>
          </header>

          <hr className={styles.divider} />

          {/* Sections */}
          <div className={styles.content}>
            {sections.map((section, index) => (
              <section key={index} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>

                {section.content && (
                  <div className={styles.sectionBody}>
                    {section.content.split("\n\n").map((paragraph, pIdx) => (
                      <p key={pIdx}>{renderFormattedText(paragraph)}</p>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ul className={styles.sectionList}>
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx}>{renderFormattedText(item)}</li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className={styles.sectionFooter}>
                    {renderFormattedText(section.footer)}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
