// src/hooks/useScrollAnimation.js
import { useState, useEffect } from "react";

// Hook to check for user's preference for reduced motion
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
};

// The main animation hook
export const useScrollAnimation = (ref) => {
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    let animationFrameId = null;
    let observer = null;

    const handleScroll = () => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        if (ref && ref.current) {
          const { top } = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const scrollProgress = (windowHeight * 0.8 - top) / (windowHeight * 0.95);
          const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
          setProgress(clampedProgress);
        }
        animationFrameId = null;
      });
    };

    // Only listen to scroll when the element is in the viewport (or close to it)
    if (ref && ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll(); // Initial check
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        },
        { rootMargin: "100px" } // Start listening slightly before it enters
      );
      observer.observe(ref.current);
    }

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [ref, prefersReducedMotion]);

  return progress;
};
