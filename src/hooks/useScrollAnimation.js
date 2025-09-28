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

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        if (ref && ref.current) {
          const { top } = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // --- THIS IS THE CHANGED LINE ---
          // The animation will now only occur in the top 80% of the viewport.
          const scrollProgress = (windowHeight * 0.95 - top) / (windowHeight * 0.8);

          const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
          setProgress(clampedProgress);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [ref, prefersReducedMotion]);

  return progress;
};
