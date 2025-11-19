import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SEO = ({ title, description, image, url }) => {
    const { t, i18n } = useTranslation();

    // Default values from translation or fallback
    const siteTitle = "harpandcode.io";
    const metaTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | ${t("hero.headline")}`;
    const metaDescription = description || t("about.main_text").substring(0, 160) + "...";
    const metaImage = image || "https://harpandcode.io/heroharp.jpeg";
    const metaUrl = url || "https://harpandcode.io/";
    const currentLang = i18n.language;

    return (
        <Helmet>
            {/* Language */}
            <html lang={currentLang} />

            {/* Primary Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={metaUrl} />
            <meta property="twitter:title" content={metaTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
};

export default SEO;
