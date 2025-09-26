import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import WebDevelopment from "./components/WebDevelopment";
import AppDevelopment from "./components/AppDevelopment";
import AISolutions from "./components/AISolutions";
import Footer from "./components/Footer";
import CallbackFormModal from "./components/CallbackFormModal";
import GridBackground from "./components/GridBackground";

export default function App() {
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const contentSectionRef = useRef(null);

  const handleVideoEnd = () => {
    setNavbarVisible(true);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNavbarVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          setNavbarVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = contentSectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <Router>
      {/* Navbar & Modal are outside Routes so they show on every page */}
      <Navbar isVisible={isNavbarVisible} />
      <CallbackFormModal isOpen={isModalOpen} onClose={closeModal} />

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <Hero onVideoEnd={handleVideoEnd} />
              <div style={{ marginTop: "4rem" }}></div>
              <About ref={contentSectionRef} onOpenModal={openModal} />
              <GridBackground>
                <Products />
              </GridBackground>
              <Footer onOpenModal={openModal} />
            </>
          }
        />

        {/* Product pages */}
        <Route path="/products/web-development" element={<WebDevelopment />} />
        <Route path="/products/app-development" element={<AppDevelopment />} />
        <Route path="/products/ai-solutions" element={<AISolutions />} />
      </Routes>
    </Router>
  );
}
