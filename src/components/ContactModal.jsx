import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from '../CSS/ContactModal.module.css';

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

        const webhookUrl = mode === 'project'
            ? import.meta.env.VITE_PROJECT_WEBHOOK_URL
            : import.meta.env.VITE_PARTNER_WEBHOOK_URL;

        if (!webhookUrl) {
            console.warn("Webhook URL not defined for mode:", mode);
            // Simulate success for now if env not set, OR fail. 
            // Better to fail safe or log error. 
            // setErrorMessage("Configuration Error: No Webhook URL");
            // setStatus('error');
            // return;
        }

        try {
            // Basic Phone Validation
            const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
            if (formData.phone && !phoneRegex.test(formData.phone)) {
                throw new Error("Invalid phone format");
            }

            // Preparing payload
            const payload = {
                formMode: mode,
                ...formData,
                submittedAt: new Date().toISOString()
            };

            // Use fetch if URL exists, else simulate (remove simulation in prod)
            if (webhookUrl) {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error('Network response was not ok');
            } else {
                // Simulate delay for demo if no ENV
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            setStatus('success');
        } catch (error) {
            console.error("Submission error:", error);
            setErrorMessage(t('modal.error'));
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
                                <option value="mvp">{t('options.mvp')}</option>
                                <option value="ai-agent">{t('options.ai_agent')}</option>
                                <option value="web-app">{t('options.web_app')}</option>
                                <option value="consulting">{t('options.consulting')}</option>
                                <option value="other">{t('options.other')}</option>
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
                                <option value="under-10k">{t('budget.under_10k')}</option>
                                <option value="10k-25k">{t('budget.10k_25k')}</option>
                                <option value="25k-50k">{t('budget.25k_50k')}</option>
                                <option value="50k-plus">{t('budget.50k_plus')}</option>
                                <option value="not-sure">{t('budget.not_sure')}</option>
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
                                <option value="Strategic collaboration">{t('partner.strategic')}</option>
                                <option value="Co-building products or solutions">{t('partner.co_build')}</option>
                                <option value="Go-to-market partnership">{t('partner.gtm')}</option>
                                <option value="Investment or capital partnership">{t('partner.investment')}</option>
                                <option value="Hiring / working with us">{t('partner.hiring')}</option>
                                <option value="Other">{t('partner.other')}</option>
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
                                <option value="Revenue sharing">{t('model.revenue_share')}</option>
                                <option value="Fixed engagement">{t('model.fixed')}</option>
                                <option value="Equity or investment">{t('model.equity')}</option>
                                <option value="Open to discussion">{t('model.discussion')}</option>
                                <option value="Not applicable">{t('model.na')}</option>
                            </select>
                        </div>
                    </>
                )}

                {errorMessage && <div className={styles.error}>{errorMessage}</div>}

                <button type="submit" className={styles.submitButton} disabled={status === 'submitting'}>
                    {status === 'submitting' ? '...' : (isProject ? t('modal.get_phone_call') : t('modal.discuss_partnership'))}
                </button>

                <div className={styles.switchMode}>
                    <button type="button" onClick={toggleMode} className={styles.switchButton}>
                        {isProject ? t('modal.switch_to_partner') : t('modal.switch_to_project')}
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
            <h3 className={styles.successTitle}>{t('modal.success_title')}</h3>
            <p className={styles.successMessage}>{t('modal.success_message')}</p>
            <button onClick={onClose} className={styles.closeSuccessButton}>
                {t('modal.close')}
            </button>
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
