import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";

const resources = {
  en: translationEN,
  es: translationES,
};

i18n
  .use(LanguageDetector) // Enables language auto-detection
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Default language if detection fails
    // This part is crucial for auto-detection:
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng.split("-")[0]);
});
document.documentElement.setAttribute("lang", i18n.language.split("-")[0]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
