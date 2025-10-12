// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useRef } from "react";
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
import BlogSection from "./components/BlogSection";
import TestimonialStrip from "./components/TestimonialStrip"; // <-- ADDED IMPORT

export default function App() {
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const contentSectionRef = useRef(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Router>
      <Navbar isVisible={isNavbarVisible} onOpenModal={openModal} />
      <CallbackFormModal isOpen={isModalOpen} onClose={closeModal} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* The Hero component remains on its own */}
              <GridBackground>
                <Hero />
              </GridBackground>

              {/* All other sections are now wrapped in a <main> tag */}
              <main className="scrolling-content">
                <About ref={contentSectionRef} onOpenModal={openModal} />
                <GridBackground>
                  <Products />
                </GridBackground>
                <BlogSection />
                <TestimonialStrip /> {/* <-- PLACED COMPONENT HERE */}
                <Footer onOpenModal={openModal} />
              </main>
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
