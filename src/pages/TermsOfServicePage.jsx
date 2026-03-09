// src/pages/TermsOfServicePage.jsx
import React from "react";
import TrustPage from "../components/TrustPage";
import { termsOfService } from "../data/trustPageData";

export default function TermsOfServicePage() {
  return <TrustPage {...termsOfService} />;
}
