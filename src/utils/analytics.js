// src/utils/analytics.js

const GA_TRACKING_ID = 'G-54X2N94Q0B';

/**
 * Initializes Google Analytics 4
 * Only runs in production mode.
 */
export const initGA = () => {
    if (!import.meta.env.PROD) return;

    // Prevent duplicate script injection
    if (document.getElementById('google-analytics')) return;

    const script = document.createElement('script');
    script.id = 'google-analytics';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    // Disable automatic pageview to prevent duplicates with our manual route tracking
    gtag('config', GA_TRACKING_ID, {
        send_page_view: false,
    });

    console.log('GA4 Initialized');
};

/**
 * Tracks a page view event
 * @param {string} url - The URL path to track
 */
export const trackPageView = (url) => {
    if (!import.meta.env.PROD || !window.gtag) return;

    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
        send_page_view: true, // Manually trigger the page view
    });
};
/**
 * Tracks a custom event
 * @param {string} eventName - Name of the event
 * @param {object} params - Event parameters
 */
export const trackEvent = (eventName, params = {}) => {
    if (!import.meta.env.PROD || !window.gtag) {
        if (!import.meta.env.PROD) {
            console.log(`[GA4 Debug] Event: ${eventName}`, params);
        }
        return;
    }

    window.gtag('event', eventName, params);
};
