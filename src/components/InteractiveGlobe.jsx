import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const COUNTRIES_URL = "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";

// Ripple data for Panama
const panamaRipple = [{ lat: 9.5, lng: -79.5 }];

export default function InteractiveGlobe() {
  const globeEl = useRef();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch country data
    fetch(COUNTRIES_URL)
      .then((res) => res.json())
      .then((data) => setCountries(data.features));

    if (globeEl.current) {
      const controls = globeEl.current.controls();

      // STOP rotation initially
      controls.autoRotate = false;
      controls.enableZoom = false;

      // Position camera instantly ON Panama
      globeEl.current.pointOfView(
        {
          lat: 9.5,
          lng: -79.5,
          altitude: 2.8,
        },
        0 // no animation
      );

      // Start rotation after delay
      setTimeout(() => {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
      }, 2000); // delay in ms
    }
  }, []);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
      backgroundColor="rgba(0,0,0,0)"
      globeOpacity={0.8}
      atmosphereColor="#3da49d"
      atmosphereAltitude={0.15}
      // Default POV (just for when rotation happens)
      pointOfView={{ lat: 9.5, lng: -79.5, altitude: 2.8 }}
      /* --- HEX POLYGONS --- */
      hexPolygonsData={countries}
      hexPolygonResolution={3}
      hexPolygonMargin={0.3}
      hexPolygonUseDots={true}
      hexPolygonColor={({ properties: d }) => (d.ADMIN === "Panama" ? "rgba(255, 255, 255, 1)" : "#3da49d")}
      hexPolygonAltitude={({ properties: d }) => (d.ADMIN === "Panama" ? 0.02 : 0.005)}
      hexPolygonSideColor={({ properties: d }) => (d.ADMIN === "Panama" ? "rgba(255, 255, 255, 0.15)" : "rgba(0,0,0,0)")}
      /* --- RIPPLE EFFECT OVER PANAMA --- */
      ringsData={panamaRipple}
      ringColor={() => "rgba(0, 255, 100, 1)"}
      ringMaxRadius={15}
      ringPropagationSpeed={4}
      ringRepeatPeriod={1000}
    />
  );
}
