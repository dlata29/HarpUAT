import React, { useState, useEffect } from "react";
import "../CSS/ProductPage.css";
import Navbar from "./Navbar";

// SVG Icon for the tickmark
const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="tick-icon">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function AppDevelopment() {
  const [showNav, setShowNav] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const services = [
    {
      feature: "Custom Websites",
      detail: "Responsive, SEO-friendly sites tailored for your brand.",
    },
    {
      feature: "E-commerce Platforms",
      detail: "Scalable online stores with secure payment integrations.",
    },
    {
      feature: "WordPress & CMS Solutions",
      detail: "Easy-to-manage content platforms for blogs, portfolios, and enterprises.",
    },
  ];

  useEffect(() => {
    const navTimer = setTimeout(() => setShowNav(true), 1000);
    const contentTimer = setTimeout(() => setShowContent(true), 2000);
    return () => {
      clearTimeout(navTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="product-page">
      {/* Hero Section */}
      <section className="product-hero app-dev">
        <div className="hero-overlay">
          {/* Navbar fade-in */}
          <div className={`fade-in navbar-fade ${showNav ? "visible" : "hidden"}`}>
            <Navbar />
          </div>

          {/* Hero Content fade-in */}
          <div className={`hero-content ${showContent ? "visible" : "hidden"}`}>
            <h1>App Development Services</h1>
            <p>
              Create interactive, high-quality apps for iOS, Android, and cross-platform solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="product-services">
        {services.map((service, idx) => (
          <div key={idx} className="service-card">
            <div className="service-item">
              <TickIcon />
              <p>
                <strong>{service.feature}</strong> → {service.detail}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
