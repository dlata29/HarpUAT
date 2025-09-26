import React, { useState, useEffect, useRef } from "react";
import "../CSS/Products.css";

const Products = React.forwardRef((props, ref) => {
  const servicesData = [
    {
      title: "Web Development",
      description:
        "Guaranteed to be unique - we create the optimal foundation for your digital presence with a knack for detail and aesthetics.",
      points: [
        "Web design and development",
        "Implementation of designs (e.g. Figma)",
        "Creation of interactive designs for replication",
        "Webshop and e-commerce platforms",
        "Redesign and relaunch",
        "UI and UX optimization",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit-crop",
    },
    {
      title: "App Development",
      description:
        "From concept to launch, we build intuitive and powerful mobile applications for iOS and Android that engage users and drive growth.",
      points: [
        "Native iOS & Android development",
        "Cross-platform solutions (React Native)",
        "App store deployment and management",
        "Backend services and API integration",
        "Push notifications and in-app purchases",
        "Performance monitoring and analytics",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070&auto=format&fit-crop",
    },
    {
      title: "AI Solutions",
      description:
        "Leverage the power of artificial intelligence to automate processes, gain insights, and create innovative products.",
      points: [
        "Machine learning model development",
        "Natural Language Processing (NLP)",
        "Computer vision and image analysis",
        "Predictive analytics and forecasting",
        "AI-powered chatbot development",
        "Data strategy and infrastructure",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  // refs to each text section
  const serviceSectionsRef = useRef([]);
  // active index = the section whose center is closest to viewport center
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDistance = Infinity;

      serviceSectionsRef.current.forEach((section, idx) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - centerY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = idx;
        }
      });

      setActiveIndex((prev) => {
        if (prev !== bestIndex) return bestIndex;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial calc
    return () => window.removeEventListener("scroll", handleScroll);
  }, [servicesData.length]);

  return (
    <section className="services-section" ref={ref}>
      <div className="section-label">
        <span className="label-text">OUR SERVICES</span>
        <span className="label-line"></span>
      </div>

      <div className="services-container">
        {/* Left: Text */}
        <div className="services-text-content">
          {servicesData.map((service, index) => (
            <div
              key={index}
              ref={(el) => (serviceSectionsRef.current[index] = el)}
              className="service-item">
              <h3 className="service-title">
                <span>{service.title}</span>
              </h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-points">
                {service.points.map((point, pIndex) => (
                  <li key={pIndex} className="service-point">
                    <svg
                      className="point-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"></path>
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right: Sticky images */}
        <div className="services-image-container">
          <div className="sticky-image-wrapper">
            {servicesData.map((service, index) => {
              const isActive = index === activeIndex;

              // inactive images move slightly up or down so transition looks natural
              const translateY = isActive ? "0%" : index < activeIndex ? "-30%" : "30%";
              const z = isActive ? servicesData.length + 1 : servicesData.length - index; // ensure active on top

              return (
                <img
                  key={service.imageUrl}
                  src={service.imageUrl}
                  alt={service.title}
                  className="service-image"
                  style={{
                    transform: `translateY(${translateY})`,
                    zIndex: z,
                    opacity: isActive ? 1 : 0.65,
                    transition: "transform 0.45s cubic-bezier(0.22,0.9,0.3,1), opacity 0.35s ease",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x600/e2e8f0/334155?text=${service.title.replace(
                      " ",
                      "+"
                    )}`;
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
