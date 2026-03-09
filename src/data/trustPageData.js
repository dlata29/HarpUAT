// src/data/trustPageData.js
// Structured legal/trust page content derived from client-provided markdown files.

export const privacyPolicy = {
  title: "Privacy Policy",
  subtitle: "harpandcode.io — AuditPlan Pro",
  effectiveDate: "March 7, 2026",
  lastUpdated: "March 7, 2026",
  metaDescription:
    "Privacy Policy for harpandcode.io and AuditPlan Pro. Learn how we collect, use, store, and protect your personal information.",
  sections: [
    {
      heading: "1. Introduction",
      content: `harpandcode.io ("we," "us," or "our") operates AuditPlan Pro, an AI-powered audit engagement planning tool, and related services accessible via our website and application at https://harpandcode.io and https://auditplan-pro-production.up.railway.app.

This Privacy Policy describes how we collect, use, store, and protect your personal information. We are committed to handling your data with transparency and care, in accordance with applicable data protection laws including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).`,
    },
    {
      heading: "2. Information We Collect",
      content: `**Account Information:** When you register for AuditPlan Pro, we collect your name, email address, organization name, and professional role.

**Usage Data:** We collect information about how you interact with our application, including features used, session duration, and workflow steps completed. This data is used solely to improve the product experience.

**Audit Documents:** Documents you upload for AI-assisted analysis (e.g., organizational documents, risk assessments, policy documents) are processed temporarily for the sole purpose of generating audit planning outputs.

**Technical Data:** We automatically collect IP addresses, browser type, device information, and access timestamps for security monitoring and service improvement.

**Communications:** If you contact us via email or through the application, we retain the content of those communications to provide support.`,
    },
    {
      heading: "3. How We Use Your Information",
      list: [
        "To provide, operate, and maintain AuditPlan Pro and related services",
        "To process and analyze uploaded audit documents using AI (Anthropic Claude API) to generate planning deliverables",
        "To communicate with you regarding your account, support requests, and product updates",
        "To improve and develop our services based on aggregated, anonymized usage patterns",
        "To ensure security, detect fraud, and protect against unauthorized access",
        "To comply with legal obligations and respond to lawful requests",
      ],
    },
    {
      heading: "4. AI Processing and Data Handling",
      content: `AuditPlan Pro uses the Anthropic Claude commercial API for AI-assisted document analysis and content generation. The following safeguards apply:`,
      list: [
        "No model training: Data processed through the Anthropic commercial API is contractually excluded from use in training or improving AI models.",
        "Temporary processing: Document content is transmitted to the API for real-time processing and is not stored by Anthropic after the response is generated.",
        "Encrypted transmission: All communications with the AI API use HTTPS/TLS encryption. Only extracted text is transmitted — original files are not sent to external servers.",
        "No persistent storage: Uploaded documents are processed in-session and are not retained on our servers beyond the active session unless you explicitly save your work.",
        "Enterprise deployment options: For organizations requiring maximum data sovereignty, AuditPlan Pro supports deployment on Amazon Bedrock or Google Vertex AI within your own cloud environment.",
      ],
    },
    {
      heading: "5. Data Sharing and Third Parties",
      content:
        "We do not sell, rent, or trade your personal information to third parties. We may share data only in the following circumstances:",
      list: [
        "Service providers: We use trusted third-party services (e.g., hosting, analytics) that process data on our behalf under strict contractual obligations.",
        "AI processing: Document content is transmitted to the Anthropic API for analysis, subject to the safeguards described in Section 4.",
        "Legal compliance: We may disclose information if required by law, regulation, or legal process.",
        "Business transfers: In the event of a merger, acquisition, or sale of assets, user data may be transferred as part of that transaction with equivalent privacy protections.",
      ],
    },
    {
      heading: "6. Data Security",
      content: `We implement industry-standard security measures to protect your data, including:`,
      list: [
        "HTTPS/TLS encryption for all data in transit",
        "Secure authentication and access controls",
        "Regular security assessments and monitoring",
        "Minimal data retention — we retain data only as long as necessary to provide the service",
      ],
      footer:
        "While we take reasonable measures to protect your information, no method of electronic transmission or storage is 100% secure. We encourage you to use strong passwords and exercise caution when sharing sensitive information.",
    },
    {
      heading: "7. Your Rights",
      content:
        "Depending on your jurisdiction, you may have the following rights regarding your personal data:",
      list: [
        "Access: Request a copy of the personal data we hold about you.",
        "Correction: Request correction of inaccurate or incomplete data.",
        "Deletion: Request deletion of your personal data (subject to legal retention requirements).",
        "Portability: Request your data in a structured, machine-readable format.",
        "Objection: Object to processing of your data for certain purposes.",
        "Withdrawal of consent: Where processing is based on consent, you may withdraw it at any time.",
      ],
      footer:
        "To exercise any of these rights, please contact us at info@harpandcode.io. We will respond within 30 days.",
    },
    {
      heading: "8. Data Retention",
      content:
        "We retain your account information for as long as your account is active or as needed to provide services. Uploaded audit documents are processed in real-time and are not stored beyond the active session unless you explicitly save outputs. If you request account deletion, we will remove your personal data within 30 days, except where retention is required by law.",
    },
    {
      heading: "9. International Data Transfers",
      content:
        "Our services may involve processing data in jurisdictions outside your country of residence. Where such transfers occur, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) where required under GDPR.",
    },
    {
      heading: "10. Children's Privacy",
      content:
        "AuditPlan Pro is a professional tool designed for use by audit professionals and organizations. We do not knowingly collect personal information from individuals under the age of 18. If we become aware that we have collected data from a minor, we will promptly delete it.",
    },
    {
      heading: "11. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify registered users of material changes via email. The "Last Updated" date at the top of this policy indicates when it was most recently revised.`,
    },
    {
      heading: "12. Contact Us",
      content: `If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:

**Email:** info@harpandcode.io
**Website:** https://harpandcode.io`,
    },
  ],
};

export const termsOfService = {
  title: "Terms of Service",
  subtitle: "harpandcode.io — AuditPlan Pro",
  effectiveDate: "March 7, 2026",
  lastUpdated: "March 7, 2026",
  metaDescription:
    "Terms of Service for harpandcode.io and AuditPlan Pro. Read the terms governing your use of our AI-powered audit engagement planning tool.",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      content: `By accessing or using AuditPlan Pro, the website at harpandcode.io, or any related services (collectively, the "Service") operated by harpandcode.io ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service.

If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.`,
    },
    {
      heading: "2. Description of Service",
      content:
        "AuditPlan Pro is an AI-powered audit engagement planning tool that assists audit professionals with structured planning workflows, document analysis, risk assessment, and generation of audit deliverables. The Service is designed to support — not replace — professional audit judgment.",
    },
    {
      heading: "3. Account Registration and Security",
      content:
        "To access certain features of the Service, you may be required to create an account. You agree to:",
      list: [
        "Provide accurate, current, and complete registration information",
        "Maintain the security and confidentiality of your login credentials",
        "Promptly notify us of any unauthorized use of your account",
        "Accept responsibility for all activities that occur under your account",
      ],
    },
    {
      heading: "4. Acceptable Use",
      content:
        "You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:",
      list: [
        "Use the Service for any purpose that violates applicable laws or regulations",
        "Upload malicious code, viruses, or any harmful content",
        "Attempt to gain unauthorized access to any part of the Service or its infrastructure",
        "Reverse engineer, decompile, or disassemble any part of the Service",
        "Use the Service to compete directly with AuditPlan Pro or to build a substantially similar product",
        "Share your account credentials with unauthorized individuals",
        "Use the Service in any manner that could damage, disable, or impair its functionality",
      ],
    },
    {
      heading: "5. Intellectual Property",
      content: `**Our IP:** The Service, including its software, design, algorithms, documentation, and branding, is the intellectual property of harpandcode.io and is protected by copyright, trademark, and other intellectual property laws. Nothing in these Terms grants you any right, title, or interest in our intellectual property except as expressly stated.

**Your Content:** You retain ownership of all documents, data, and content you upload to or create using the Service ("Your Content"). By using the Service, you grant us a limited, non-exclusive license to process Your Content solely for the purpose of providing the Service to you.

**AI-Generated Outputs:** Audit plans, risk assessments, and other deliverables generated by AuditPlan Pro using your inputs are yours to use. We claim no ownership over outputs generated from your data.`,
    },
    {
      heading: "6. AI-Assisted Tool Disclaimer",
      content:
        "AuditPlan Pro is an AI-assisted planning tool. While it is designed to support audit professionals in producing high-quality deliverables, it is important to understand the following:",
      list: [
        "AI outputs are assistive, not authoritative. All generated content should be reviewed, validated, and approved by qualified audit professionals before use.",
        "Professional judgment required. The Service does not replace the need for professional audit judgment, expertise, or compliance with applicable auditing standards.",
        "No guarantee of accuracy. While we strive for accuracy, AI-generated content may contain errors, omissions, or inaccuracies. You are responsible for verifying all outputs.",
        "Standards alignment. The tool is designed to align with IIA (IPPF), INTOSAI (ISSAI), and ISO 31000 frameworks, but users must ensure deliverables meet their specific organizational and regulatory requirements.",
      ],
    },
    {
      heading: "7. Fees and Payment",
      content:
        "Certain features of the Service may require a subscription or one-time payment. All fees will be clearly communicated before you are charged. We reserve the right to modify pricing with reasonable advance notice. Refund policies, if applicable, will be specified at the point of purchase.",
    },
    {
      heading: "8. Availability and Modifications",
      content:
        "We strive to maintain continuous availability of the Service but do not guarantee uninterrupted access. We may modify, suspend, or discontinue any feature of the Service at any time, with reasonable notice where practicable. We are not liable for any modification, suspension, or discontinuation of the Service.",
    },
    {
      heading: "9. Limitation of Liability",
      content: `To the maximum extent permitted by applicable law:`,
      list: [
        'The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
        "In no event shall harpandcode.io, its founder, or its affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.",
        "Our total aggregate liability shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.",
      ],
    },
    {
      heading: "10. Indemnification",
      content:
        "You agree to indemnify, defend, and hold harmless harpandcode.io and its founder from and against any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.",
    },
    {
      heading: "11. Termination",
      content:
        "We may suspend or terminate your access to the Service at any time for violation of these Terms or for any other reason with reasonable notice. You may terminate your account at any time by contacting us at info@harpandcode.io. Upon termination, your right to use the Service ceases immediately, and we may delete your account data in accordance with our Privacy Policy.",
    },
    {
      heading: "12. Governing Law and Dispute Resolution",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of the Republic of Panama. Any disputes arising under these Terms shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration in Panama City, Panama, unless otherwise required by applicable law.",
    },
    {
      heading: "13. Changes to These Terms",
      content:
        "We may update these Terms from time to time. We will notify registered users of material changes via email at least 30 days before the changes take effect. Your continued use of the Service after such notice constitutes acceptance of the updated Terms.",
    },
    {
      heading: "14. Severability",
      content:
        "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
    },
    {
      heading: "15. Contact Us",
      content: `For questions regarding these Terms of Service, please contact:

**Email:** info@harpandcode.io
**Website:** https://harpandcode.io`,
    },
  ],
};

export const security = {
  title: "Security & Data Protection",
  subtitle: "harpandcode.io — AuditPlan Pro",
  lastUpdated: "March 7, 2026",
  metaDescription:
    "Security & Data Protection practices for harpandcode.io and AuditPlan Pro. Learn about our architecture, data safeguards, and compliance alignment.",
  sections: [
    {
      heading: "Our Commitment",
      content:
        "AuditPlan Pro is built for audit professionals who handle sensitive organizational data. We understand that trust is foundational to our relationship with users. This page outlines the security measures, data protection practices, and architectural decisions that safeguard your information.",
    },
    {
      heading: "Architecture Overview",
      content: `**Frontend:** React/Vite application served over HTTPS with TLS encryption.

**Backend:** Python FastAPI application with secure API endpoints and input validation.

**Database:** SQLite with encrypted storage for session data. No audit document content is permanently stored.

**AI Processing:** Anthropic Claude commercial API with contractual data protection guarantees.

**Hosting:** Railway cloud platform with automated deployments, SSL certificates, and infrastructure monitoring.`,
    },
    {
      heading: "Data Protection Principles",
      content: `Our approach to data protection is guided by four core principles:

**1. Data Minimization —** We collect only the information necessary to provide the Service. Audit documents are processed in real-time and are not retained beyond the active session.

**2. Purpose Limitation —** Your data is used exclusively for providing audit planning services. We never use your data for advertising, profiling, or any purpose unrelated to the Service.

**3. Transparency —** We are open about what data we collect, how we process it, and who has access. Our Privacy Policy provides comprehensive details.

**4. User Control —** You maintain full ownership of your data. You can export, modify, or delete your data at any time.`,
    },
    {
      heading: "AI Data Safeguards",
      content:
        "Because AuditPlan Pro uses AI to analyze audit documents, we implement specific safeguards for AI processing:",
      list: [
        "No model training: The Anthropic commercial API contractually prohibits using customer data to train or improve AI models.",
        "No data retention by AI provider: Document content sent to the API is processed in real-time and is not stored by Anthropic after generating a response.",
        "Encrypted transmission: All API communications use HTTPS/TLS 1.2+ encryption.",
        "Text-only transmission: Only extracted text from documents is sent to the API. Original files (PDFs, Word documents) never leave your session environment.",
        "No cross-user data exposure: Each user session is isolated. Your data is never accessible to other users or mixed with other sessions.",
      ],
    },
    {
      heading: "Enterprise Deployment Options",
      content:
        "For organizations with strict data sovereignty or compliance requirements, AuditPlan Pro supports deployment within your own cloud infrastructure:",
      list: [
        "Amazon Bedrock: Deploy within your AWS environment, ensuring all data remains within your organizational boundary and region.",
        "Google Vertex AI: Deploy within your Google Cloud environment with equivalent data isolation guarantees.",
        "On-premises: Custom deployment options available for organizations requiring complete control over infrastructure.",
      ],
      footer:
        "These options ensure that no data leaves your organizational perimeter, meeting the requirements of the most security-conscious institutions.",
    },
    {
      heading: "Infrastructure Security",
      list: [
        "HTTPS/TLS encryption on all endpoints — no unencrypted traffic accepted",
        "Secure authentication with session management and token-based access",
        "Input validation and sanitization on all user-submitted data",
        "Automated deployment pipeline with version control (GitHub) and continuous deployment (Railway)",
        "Regular dependency updates and vulnerability scanning",
        "Server-side rate limiting to prevent abuse",
      ],
    },
    {
      heading: "Compliance Alignment",
      content:
        "AuditPlan Pro is designed with the following regulatory frameworks in mind:",
      list: [
        "GDPR (General Data Protection Regulation) — Data subject rights, lawful processing, and data minimization principles",
        "CCPA (California Consumer Privacy Act) — Consumer data rights and transparency requirements",
        "ISO 27001 principles — Information security management best practices",
      ],
      footer:
        "Note: AuditPlan Pro is not currently SOC 2 or ISO 27001 certified. We are committed to pursuing formal certifications as we scale. Organizations requiring certified compliance can leverage our enterprise deployment options within their own certified environments.",
    },
    {
      heading: "Incident Response",
      content:
        "In the event of a security incident, we are committed to:",
      list: [
        "Investigating and containing the incident within 24 hours of detection",
        "Notifying affected users within 72 hours, as required by GDPR and best practices",
        "Providing a full incident report including scope, impact, and remediation steps",
        "Implementing corrective measures to prevent recurrence",
      ],
    },
    {
      heading: "Responsible Disclosure",
      content:
        "We welcome and encourage responsible security research. If you discover a security vulnerability, please report it to info@harpandcode.io. We commit to acknowledging your report within 48 hours and working with you to resolve the issue promptly. We will not pursue legal action against researchers who act in good faith.",
    },
    {
      heading: "Contact",
      content: `For security inquiries, data protection requests, or to discuss enterprise deployment options:

**Email:** info@harpandcode.io
**Website:** https://harpandcode.io`,
    },
  ],
};
