// src/pages/PrivacyPolicyPage.jsx
import React from "react";
import TrustPage from "../components/TrustPage";
import { privacyPolicy } from "../data/trustPageData";

export default function PrivacyPolicyPage() {
  return <TrustPage {...privacyPolicy} />;
}
