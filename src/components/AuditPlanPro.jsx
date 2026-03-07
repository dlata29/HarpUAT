import React, { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import styles from "../CSS/AuditPlanPro.module.css";

const features = [
  {
    icon: "⚙",
    title: "10-Step Workflow Engine",
    description:
      "Structured audit planning from notification memorandum through Terms of Reference, with sequential progress tracking.",
    color: "#0D9488",
    bg: "rgba(13,148,136,0.08)",
  },
  {
    icon: "⚠",
    title: "AI-Powered Risk Assessment",
    description:
      "Automated activity-level risk assessment with likelihood and impact scoring, aligned with IIA, INTOSAI, and ISO 31000.",
    color: "#D97706",
    bg: "rgba(217,119,6,0.08)",
  },
  {
    icon: "📄",
    title: "Plan & Programme Generator",
    description:
      "Generates complete audit plans for compliance audits (Audit Programme) and performance audits (AECP) with DOCX export.",
    color: "#4472C4",
    bg: "rgba(68,114,196,0.08)",
  },
  {
    icon: "📊",
    title: "Advanced Data Analytics",
    description:
      "Statistical sampling, duplicate detection, Benford's Law analysis, and trend/aging analysis — no coding required.",
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
  },
  {
    icon: "🌐",
    title: "Multi-Institution Support",
    description:
      "Configurable for UN oversight bodies, National Audit Offices, Supreme Audit Institutions, or private sector firms.",
    color: "#4472C4",
    bg: "rgba(68,114,196,0.08)",
  },
  {
    icon: "🔒",
    title: "Privacy by Design",
    description:
      "Data stays local. AI processing uses encrypted commercial APIs with zero model training on your data.",
    color: "#0D9488",
    bg: "rgba(13,148,136,0.08)",
  },
];

const stats = [
  { value: "50%", label: "Reduction in planning time" },
  { value: "18 days", label: "Saved per auditor per engagement" },
  { value: "3,600", label: "Days saved annually (50-auditor team)" },
  { value: "$1.8–2.2M", label: "Equivalent annual cost savings" },
];

const steps = [
  "Audit Notification Memorandum",
  "Understand the Client",
  "Document the System",
  "Activity-Level Risk Assessment",
  "Develop Audit Criteria",
  "Define Audit Objectives",
  "Scope & Methodology",
  "Audit Plan & Programme / AECP",
  "Entry Conference",
  "Terms of Reference",
];

const standards = [
  { name: "IIA (IPPF)", active: true },
  { name: "INTOSAI (ISSAI)", active: true },
  { name: "ISO 31000", active: true },
  { name: "COSO", active: false },
  { name: "SOX / PCAOB", active: false },
];

const AuditPlanPro = () => {
  const sectionRef = useRef(null);
  const scrollProgress = useScrollAnimation(sectionRef);
  const progress = Math.min(Math.max(scrollProgress, 0), 1);

  return (
    <section id="auditplan-pro" ref={sectionRef} className={styles.section}>
      {/* Hero Header */}
      <div className={styles.header}>
        <span className={styles.tag}>Featured Product</span>
        <h2 className={styles.title}>AuditPlan Pro</h2>
        <p className={styles.subtitle}>
          AI-Powered Audit Engagement Planning — From Risk Assessment to Terms
          of Reference
        </p>
        <p className={styles.description}>
          A structured 10-step workflow powered by AI. Aligned with IIA,
          INTOSAI, and ISO 31000 standards. Built for internal audit teams who
          want to plan smarter, not longer.
        </p>
        <div className={styles.ctaRow}>
          <a
            href="https://auditplan-pro-production.up.railway.app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            Try the Live Demo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className={styles.metricsRow}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.metricCard}>
            <span className={styles.metricValue}>{stat.value}</span>
            <span className={styles.metricLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className={styles.featuresHeader}>
        <h3 className={styles.sectionHeading}>What AuditPlan Pro Does</h3>
      </div>
      <div className={styles.featuresGrid}>
        {features.map((feature, i) => (
          <div
            key={i}
            className={styles.featureCard}
            style={{
              opacity: Math.min(1, progress * 3 - i * 0.15),
              transform: `translateY(${Math.max(0, (1 - progress * 3 + i * 0.15) * 30)}px)`,
            }}
          >
            <div
              className={styles.featureIcon}
              style={{ background: feature.bg, color: feature.color }}
            >
              {feature.icon}
            </div>
            <h4 className={styles.featureTitle}>{feature.title}</h4>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Workflow Timeline */}
      <div className={styles.workflowSection}>
        <h3 className={styles.sectionHeading}>The 10-Step Audit Planning Workflow</h3>
        <div className={styles.timeline} style={{ "--progress": `${progress * 100}%` }}>
          {steps.map((step, i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.timelineNumber}>{i + 1}</div>
              <span className={styles.timelineLabel}>{step}</span>
            </div>
          ))}
        </div>
        <p className={styles.workflowNote}>
          Each step builds on the previous one. AI assists at every stage —
          analyzing documents, assessing risks, mapping criteria, and generating
          professional deliverables.
        </p>
      </div>

      {/* Standards Badges */}
      <div className={styles.standardsSection}>
        <h3 className={styles.sectionHeading}>Aligned with Global Audit Standards</h3>
        <div className={styles.standardsRow}>
          {standards.map((std, i) => (
            <span
              key={i}
              className={`${styles.standardBadge} ${
                std.active ? styles.active : styles.coming
              }`}
            >
              {std.name}
              {!std.active && (
                <span className={styles.comingSoon}>coming soon</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuditPlanPro;
