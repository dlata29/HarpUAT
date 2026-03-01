// src/App.jsx

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Footer from "./components/Footer";
import GridBackground from "./components/GridBackground";
import BlogSection from "./components/BlogSection";
import FeaturedWork from "./components/FeaturedWork"; // <-- ADDED IMPORT
import TestimonialStrip from "./components/TestimonialStrip"; // <-- ADDED IMPORT
import SEO from "./components/SEO";
import ContactModal from "./components/ContactModal"; // <-- ADDED IMPORT
import { initGA, trackPageView } from "./utils/analytics";

/**
 * Automatically tracks page views on route change
 */
function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

export default function App() {
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("project"); // 'project' or 'partner'
  const contentSectionRef = useRef(null);

  useEffect(() => {
    initGA();
  }, []);

  const openModal = (mode = "project") => {
    setModalMode(mode);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <HelmetProvider>
      <Router>
        <PageViewTracker />
        <SEO />
        <Navbar isVisible={isNavbarVisible} onOpenModal={openModal} />
        <ContactModal isOpen={isModalOpen} onClose={closeModal} initialMode={modalMode} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* The Hero component remains on its own */}
                <div id="hero-sticky-wrapper">
                  <GridBackground>
                    <Hero onOpenModal={openModal} />
                  </GridBackground>
                </div>

                {/* All other sections are now wrapped in a <main> tag */}
                <main className="scrolling-content">
                  <About ref={contentSectionRef} onOpenModal={openModal} />
                  <GridBackground>
                    <Products />
                  </GridBackground>
                  <BlogSection />
                  <FeaturedWork /> {/* <-- PLACED COMPONENT HERE */}
                  <TestimonialStrip /> {/* <-- PLACED COMPONENT HERE */}
                  <Footer onOpenModal={openModal} />
                </main>
              </>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
