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
import FeaturedWork from "./components/FeaturedWork";
import TestimonialStrip from "./components/TestimonialStrip";
import AuditPlanPro from "./components/AuditPlanPro";
import SEO from "./components/SEO";
import ContactModal from "./components/ContactModal";
import { initGA, trackPageView } from "./utils/analytics";

// Trust Pages
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import SecurityPage from "./pages/SecurityPage";

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
                  <AuditPlanPro />
                  <BlogSection />
                  <FeaturedWork />
                  <TestimonialStrip />
                  <Footer onOpenModal={openModal} />
                </main>
              </>
            }
          />

          {/* Trust / Legal Pages */}
          <Route
            path="/privacy-policy"
            element={
              <>
                <PrivacyPolicyPage />
                <Footer onOpenModal={openModal} />
              </>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <>
                <TermsOfServicePage />
                <Footer onOpenModal={openModal} />
              </>
            }
          />
          <Route
            path="/security"
            element={
              <>
                <SecurityPage />
                <Footer onOpenModal={openModal} />
              </>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
