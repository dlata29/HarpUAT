import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Products.css";

export default function ProductCard({ link, title, tagline, icon }) {
  return (
    <Link to={link} className="product-card">
      <div className="product-icon-wrapper">{icon}</div>
      <h3>{title}</h3>
      <p>{tagline}</p>
    </Link>
  );
}
