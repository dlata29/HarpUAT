import React, { useState, useRef, useCallback } from "react";
import "../CSS/GridBackground.css";

// This component creates the static grid and the interactive mouse trail effect.
const GridBackground = ({ children }) => {
  const [trails, setTrails] = useState([]);
  const gridRef = useRef(null);
  const GRID_SIZE = 20; // Controls the size of the grid cells

  const handleMouseMove = useCallback((e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();

    // Calculate mouse position relative to the grid container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Snap to the nearest grid cell coordinate
    const cellX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
    const cellY = Math.floor(y / GRID_SIZE) * GRID_SIZE;
    const id = `${cellX}-${cellY}`;

    // Add new trail and set a timer to remove it, preventing duplicates
    setTrails((current) => {
      if (current.some((trail) => trail.id === id)) {
        return current;
      }
      const newTrail = { id, x: cellX, y: cellY };

      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
      }, 1500); // Trail fades out in 1.5s

      return [...current, newTrail];
    });
  }, []);

  return (
    <div ref={gridRef} className="grid-background-container" onMouseMove={handleMouseMove}>
      {/* Static grid pattern */}
      <div className="static-grid"></div>

      {/* Render trail elements */}
      {trails.map((trail) => (
        <div key={trail.id} className="trail-box" style={{ left: trail.x, top: trail.y, width: GRID_SIZE, height: GRID_SIZE }} />
      ))}

      {/* The rest of your page content */}
      {children}
    </div>
  );
};

export default GridBackground;
