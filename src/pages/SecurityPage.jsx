// src/pages/SecurityPage.jsx
import React from "react";
import TrustPage from "../components/TrustPage";
import { security } from "../data/trustPageData";

export default function SecurityPage() {
  return <TrustPage {...security} />;
}
