import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next"; // <-- NEW IMPORT

import "../CSS/Products.css";

const Products = React.forwardRef((props, ref) => {
  const { t } = useTranslation(); // <-- NEW HOOK
  const serviceKeys = ["web_dev", "app_dev", "ai_solutions"];
  // Helper function to dynamically pull all translated data for a service
  const getServiceData = (key) => {
    const points = [];
    // Loop to pull up to 6 points (0 to 5)
    for (let i = 0; i < 6; i++) {
      const pointKey = `products.${key}.points_${i}`;
      const point = t(pointKey);
      // Only include the point if it was successfully translated (i.e., not the key itself)
      if (point && point !== pointKey) {
        points.push(point);
      }
    }
    // Determine the correct image URL based on the key
    let imageUrl;
    if (key === "web_dev") {
      imageUrl = "/websitedesign.jpeg";
    } else if (key === "app_dev") {
      imageUrl = "/appdesign.jpeg";
    } else {
      imageUrl = "/aisolution2.jpeg";
    }
    return {
      title: t(`products.${key}.title`),
      description: t(`products.${key}.description`),
      points: points,
      imageUrl: imageUrl,
    };
  };
  // The new, translated and dynamic servicesData array
  const finalServicesData = serviceKeys.map((key) => getServiceData(key));

  // NOTE: The rest of the component now references finalServicesData instead of servicesData
  const [progressValues, setProgressValues] = useState(Array(finalServicesData.length).fill(0));
  const serviceSectionsRef = useRef([]);

  useEffect(() => {
    const handleServicesScroll = () => {
      const newProgressValues = finalServicesData.map((_, index) => {
        const section = serviceSectionsRef.current[index];
        const nextSection = serviceSectionsRef.current[index + 1];
        if (!section) return 0;

        const sectionTop = section.getBoundingClientRect().top;
        const nextTop = nextSection ? nextSection.getBoundingClientRect().top : 0;
        const windowHeight = window.innerHeight;

        // Dynamic animation zone (distance between sections)
        const distance = nextSection ? nextTop - sectionTop : windowHeight * 0.8;

        // Calculate scroll progress relative to that distance
        const anchorPoint = windowHeight * 0.8; // was 0.5, shift timing earlier
        const progress = Math.min(1, Math.max(0, ((anchorPoint - sectionTop) / distance) * 1.5));

        return progress;
      });

      setProgressValues(newProgressValues);
    };

    window.addEventListener("scroll", handleServicesScroll, { passive: true });
    handleServicesScroll();

    return () => window.removeEventListener("scroll", handleServicesScroll);
  }, [finalServicesData.length]);

  return (
    <section id="products" className="services-section" ref={ref}>
      <div className="services-container">
        {/* Update tag to use translation */}
        <span className="services-tag">{t("products.tag")}</span>
        {/* Left side: Scrolling Text Content */}
        <div className="services-text-content">
          {/* Map over the final translated data */}
          {finalServicesData.map((service, index) => (
            <div key={index} ref={(el) => (serviceSectionsRef.current[index] = el)} className="service-item">
              <h3 className="service-title">
                <span>{service.title}</span>
              </h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-points">
                {service.points.map((point, pIndex) => (
                  <li key={pIndex} className="service-point">
                    {/* START: Updated SVG Icon */}
                    <svg className="point-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z" fill="#000000"></path>
                    </svg>
                    {/* END: Updated SVG Icon */}
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right side: Sticky Images with Parallax */}
        <div className="services-image-container">
          <div className="sticky-image-wrapper">
            {/* Map over the final translated data */}
            {finalServicesData.map((service, index) => {
              const progress = progressValues[index] || 0;
              const translateY = index === 0 ? "0%" : `${100 - progress * 100}%`;

              return (
                <img
                  key={service.imageUrl}
                  src={service.imageUrl}
                  alt={service.title}
                  className="service-image"
                  style={{
                    transform: `translateY(${translateY})`,
                    zIndex: index,
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x600/e2e8f0/334155?text=${service.title.replace(" ", "+")}`;
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Products;
