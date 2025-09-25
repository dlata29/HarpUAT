import React, { useState, useEffect, useRef } from "react";
import "../CSS/Products.css";

const Products = React.forwardRef((props, ref) => {
  const servicesData = [
    {
      title: "Web Development",
      description: "Guaranteed to be unique - we create the optimal foundation for your digital presence with a knack for detail and aesthetics.",
      points: [
        "Web design and development",
        "Implementation of designs (e.g. Figma)",
        "Creation of interactive designs for replication",
        "Webshop and e-commerce platforms",
        "Redesign and relaunch",
        "UI and UX optimization",
      ],
      imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit-crop",
    },
    {
      title: "App Development",
      description: "From concept to launch, we build intuitive and powerful mobile applications for iOS and Android that engage users and drive growth.",
      points: [
        "Native iOS & Android development",
        "Cross-platform solutions (React Native)",
        "App store deployment and management",
        "Backend services and API integration",
        "Push notifications and in-app purchases",
        "Performance monitoring and analytics",
      ],
      imageUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070&auto=format&fit-crop",
    },
    {
      title: "AI Solutions",
      description: "Leverage the power of artificial intelligence to automate processes, gain insights, and create innovative products.",
      points: [
        "Machine learning model development",
        "Natural Language Processing (NLP)",
        "Computer vision and image analysis",
        "Predictive analytics and forecasting",
        "AI-powered chatbot development",
        "Data strategy and infrastructure",
      ],
      imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const [progressValues, setProgressValues] = useState(Array(servicesData.length).fill(0));
  const serviceSectionsRef = useRef([]);

  useEffect(() => {
    const handleServicesScroll = () => {
      const newProgressValues = servicesData.map((_, index) => {
        const section = serviceSectionsRef.current[index];
        if (!section) return 0;

        const { top } = section.getBoundingClientRect();
        const animationStartPoint = window.innerHeight * 0.75;
        const animationEndPoint = window.innerHeight * 0.25;
        const animationZoneHeight = animationStartPoint - animationEndPoint;
        const distanceFromStart = animationStartPoint - top;
        const progress = distanceFromStart / animationZoneHeight;

        return Math.max(0, Math.min(1, progress));
      });
      setProgressValues(newProgressValues);
    };

    window.addEventListener("scroll", handleServicesScroll);
    handleServicesScroll();
    return () => window.removeEventListener("scroll", handleServicesScroll);
  }, [servicesData.length]);

  return (
    <section className="services-section" ref={ref}>
      <div className="services-container">
        {/* Left side: Scrolling Text Content */}
        <div className="services-text-content">
          {servicesData.map((service, index) => (
            <div key={index} ref={(el) => (serviceSectionsRef.current[index] = el)} className="service-item">
              <h3 className="service-title">
                <span>{service.title}</span>
              </h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-points">
                {service.points.map((point, pIndex) => (
                  <li key={pIndex} className="service-point">
                    <svg className="point-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
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
            {servicesData.map((service, index) => {
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
