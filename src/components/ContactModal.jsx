import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from '../CSS/ContactModal.module.css';
import { trackEvent } from '../utils/analytics';

// --- Icons ---
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const ContactModal = ({ isOpen, onClose, initialMode = 'project' }) => {
    const { t } = useTranslation();
    const [mode, setMode] = useState(initialMode);
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const firstInputRef = useRef(null);
    const modalRef = useRef(null);

    // Shared Form Data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        companyWebsite: '',
        projectType: '',
        budget: '',
        description: '',
        partnership_intent: '',
        partner_value_proposition: '',
        commercial_interest: '',
        commercial_model: ''
    });

    // --- Effects ---

    // Sync internal mode if prop changes while closed
    // Sync internal mode whenever modal opens
    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            setStatus('idle');
            setErrorMessage('');
        }
    }, [isOpen, initialMode]);

    // Focus management & Scroll lock
    useEffect(() => {
        if (isOpen) {
            // Lock scroll
            document.body.style.overflow = 'hidden';
            // Focus first input
            setTimeout(() => {
                firstInputRef.current?.focus();
            }, 100);
        } else {
            // Unlock scroll
            document.body.style.overflow = 'unset';
            // Reset status on close (optional, depending on UX preference)
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, mode]); // Re-focus when mode changes too

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // --- Handlers ---

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleMode = () => {
        setMode(prev => prev === 'project' ? 'partner' : 'project');
        setErrorMessage('');
        // Smooth transition is handled by React re-render, 
        // focus will be managed by the useEffect dependency on 'mode'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const token = import.meta.env.VITE_AIRTABLE_TOKEN;
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
        const tableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;

        if (!token || !baseId || !tableId) {
            console.error("Airtable configuration missing");
            setErrorMessage("Configuration error. Please try again later.");
            setStatus('error');
            return;
        }

        try {
            // Basic Phone Validation
            const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
            if (formData.phone && !phoneRegex.test(formData.phone)) {
                throw new Error("Invalid phone format");
            }

            // Map form data to exact Airtable column headers
            const fields = {
                "Full Name": formData.fullName,
                "Email": formData.email,
                "Phone": formData.phone,
                "Mode": mode === 'project' ? 'Start Project' : 'Partner With Us',
                "Project Type": formData.projectType,
                "Company Name": formData.companyName,
                "Budget": formData.budget,
                "Description": formData.description,
                "Company Website": formData.companyWebsite,
                "Partnership Intent": formData.partnership_intent,
                "Partner Value Proposition": formData.partner_value_proposition,
                "Commercial Interest": formData.commercial_interest,
                "Commercial Model": formData.commercial_model,
                "Submitted At": new Date().toISOString()
            };

            // Remove empty/undefined fields
            Object.keys(fields).forEach(key => {
                if (fields[key] === undefined || fields[key] === '' || fields[key] === null) {
                    delete fields[key];
                }
            });

            const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    records: [{ fields }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Airtable error:", errorData);
                throw new Error(errorData.error?.message || 'Failed to sync with Airtable');
            }

            // Track GA4 event
            trackEvent('contact_form_submitted', { mode });

            setStatus('success');
        } catch (error) {
            console.error("Submission error:", error);
            setErrorMessage(error.message || t('modal.error'));
            setStatus('error');
        }
    };

    // --- Render Content ---

    const renderForm = () => {
        const isProject = mode === 'project';
        return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {isProject ? t('modal.start_project') : t('modal.partner_with_us')}
                    </h2>
                </div>

                {/* Shared Fields */}
                <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.label}>{t('form.full_name')} *</label>
                    <input
                        ref={firstInputRef}
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        className={styles.input}
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>{t('form.email')} *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>{t('form.phone')} *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="+1 555 123 4567"
                        className={styles.input}
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                {isProject ? (
                    // PROJECT MODE FIELDS
                    <>
                        <div className={styles.formGroup}>
                            <label htmlFor="projectType" className={styles.label}>{t('form.what_looking_for')} *</label>
                            <select
                                id="projectType"
                                name="projectType"
                                required
                                className={styles.select}
                                value={formData.projectType}
                                onChange={handleChange}
                            >
                                <option value="" disabled>-</option>
                                <option value="MVP">{t('options.mvp')}</option>
                                <option value="AI Agent">{t('options.ai_agent')}</option>
                                <option value="Web App">{t('options.web_app')}</option>
                                <option value="Consulting">{t('options.consulting')}</option>
                                <option value="Other">{t('options.other')}</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="companyName" className={styles.label}>{t('form.company_name')}</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                className={styles.input}
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="budget" className={styles.label}>{t('form.budget')}</label>
                            <select
                                id="budget"
                                name="budget"
                                className={styles.select}
                                value={formData.budget}
                                onChange={handleChange}
                            >
                                <option value="" disabled>-</option>
                                <option value="Under 10k">{t('budget.under_10k')}</option>
                                <option value="10k–25k">{t('budget.10k_25k')}</option>
                                <option value="25k–50k">{t('budget.25k_50k')}</option>
                                <option value="50k+">{t('budget.50k_plus')}</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description" className={styles.label}>{t('form.description')}</label>
                            <textarea
                                id="description"
                                name="description"
                                className={styles.textarea}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                ) : (
                    // PARTNER MODE FIELDS
                    <>
                        <div className={styles.formGroup}>
                            <label htmlFor="companyName" className={styles.label}>{t('form.company_name')} *</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                required
                                className={styles.input}
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="companyWebsite" className={styles.label}>{t('form.company_website')} *</label>
                            <input
                                type="text"
                                id="companyWebsite"
                                name="companyWebsite"
                                required
                                className={styles.input}
                                value={formData.companyWebsite}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="partnership_intent" className={styles.label}>{t('form.partnership_intent')}</label>
                            <select
                                id="partnership_intent"
                                name="partnership_intent"
                                className={styles.select}
                                value={formData.partnership_intent}
                                onChange={handleChange}
                            >
                                <option value="" disabled>-</option>
                                <option value="Strategic">{t('partner.strategic')}</option>
                                <option value="Co-build">{t('partner.co_build')}</option>
                                <option value="GTM">{t('partner.gtm')}</option>
                                <option value="Investment">{t('partner.investment')}</option>
                                <option value="Hiring">{t('partner.hiring')}</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="partner_value_proposition" className={styles.label}>{t('form.partner_value_proposition')}</label>
                            <textarea
                                id="partner_value_proposition"
                                name="partner_value_proposition"
                                placeholder={t('form.partner_value_placeholder')}
                                className={styles.textarea}
                                value={formData.partner_value_proposition}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="commercial_interest" className={styles.label}>{t('form.commercial_interest')}</label>
                            <select
                                id="commercial_interest"
                                name="commercial_interest"
                                className={styles.select}
                                value={formData.commercial_interest}
                                onChange={handleChange}
                            >
                                <option value="" disabled>-</option>
                                <option value="Yes">{t('commercial.yes')}</option>
                                <option value="Possibly">{t('commercial.possibly')}</option>
                                <option value="No">{t('commercial.no')}</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="commercial_model" className={styles.label}>{t('form.commercial_model')}</label>
                            <select
                                id="commercial_model"
                                name="commercial_model"
                                className={styles.select}
                                value={formData.commercial_model}
                                onChange={handleChange}
                            >
                                <option value="" disabled>-</option>
                                <option value="Revenue Share">{t('model.revenue_share')}</option>
                                <option value="Fixed Fee">{t('model.fixed')}</option>
                                <option value="Equity">{t('model.equity')}</option>
                                <option value="Hybrid">{t('model.discussion')}</option>
                                <option value="Other">{t('model.na')}</option>
                            </select>
                        </div>
                    </>
                )}

                {errorMessage && <div className={styles.error}>{errorMessage}</div>}

                <button type="submit" className={styles.submitButton} disabled={status === 'submitting'}>
                    {status === 'submitting' ? '...' : (isProject ? "Let's Build Something" : 'Explore Partnership')}
                </button>

                <div className={styles.switchMode}>
                    <button type="button" onClick={toggleMode} className={styles.switchButton}>
                        {isProject ? 'Looking to collaborate instead? Partner with us →' : 'Have a project in mind? Start a project →'}
                    </button>
                </div>
            </form>
        );
    };

    const renderSuccess = () => (
        <div className={styles.successContainer}>
            <div className={styles.successIcon}>
                <CheckIcon />
            </div>
            <h3 className={styles.successTitle}>Thanks! We've received your details.</h3>
            <p className={styles.successMessage}>
                Our team will review your information and reach out shortly.<br /><br />
                If you'd like to move faster, you can schedule a call with us now.
            </p>
            <div className={styles.successButtons}>
                <a
                    href="https://calendly.com/harpandcodeio/letstalk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.scheduleButton}
                >
                    Schedule a Call
                </a>
                <button onClick={onClose} className={styles.closeSuccessButton}>
                    {t('modal.close')}
                </button>
            </div>
        </div>
    );

    // --- Portal ---
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={handleBackdropClick} role="dialog" aria-modal="true">
            <div className={styles.modal} ref={modalRef}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <CloseIcon />
                </button>

                {status === 'success' ? renderSuccess() : renderForm()}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

ContactModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    initialMode: PropTypes.oneOf(['project', 'partner'])
};

export default ContactModal;
