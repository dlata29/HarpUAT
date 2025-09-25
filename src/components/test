import React, { useState, useEffect } from "react";
import "../css/ProductPage.css";
import Navbar from "./Navbar";

export default function WebDevelopment() {
  const [showNav, setShowNav] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const services = [
    "Custom Websites → Responsive, SEO-friendly sites tailored for your brand.",
    "E-commerce Platforms → Scalable online stores with secure payment integrations.",
    "WordPress & CMS Solutions → Easy-to-manage content platforms for blogs, portfolios, and enterprises.",
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
      <section className="product-hero web-dev">
        {/* Optional Background Video */}

        {/* Overlay */}
        <div className="hero-overlay">
          {/* Navbar fade-in */}
          <div className={`fade-in ${showNav ? "visible" : "hidden"}`}>
            <Navbar />
          </div>

          {/* Hero Content fade-in */}
          <div className={`hero-content ${showContent ? "visible" : "hidden"}`}>
            <h1>Web Development Services</h1>
            <p>Build modern, responsive, and high-performing websites for your brand.</p>
          </div>
        </div>
      </section>

      {/* Services Section (floating above hero) */}
      <section className="product-services overlay-services">
        {services.map((service, idx) => (
          <div key={idx} className="service-card">
            <p>{service}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
