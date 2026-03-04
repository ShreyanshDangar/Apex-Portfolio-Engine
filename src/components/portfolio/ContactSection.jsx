import React from 'react';
const ContactSection = ({ data }) => {
  return (
    <section className="portfolio-contact" data-animate="fade-in">
      <div className="portfolio-contact-background" aria-hidden="true">
        <div className="portfolio-contact-gradient"></div>
        <div className="portfolio-contact-shapes">
          <div className="portfolio-contact-shape portfolio-contact-shape-1"></div>
          <div className="portfolio-contact-shape portfolio-contact-shape-2"></div>
        </div>
      </div>
      <div className="portfolio-section-container">
        <div className="portfolio-contact-content" data-animate="fade-up" data-delay="100">
          <h2 className="portfolio-contact-title">
            Let's Work Together
          </h2>
          <p className="portfolio-contact-subtitle">
            {data?.availability || 'I\'m currently available for new opportunities and exciting projects.'}
          </p>
          <div className="portfolio-contact-buttons" role="group" aria-label="Contact options">
            {data?.email && (
              <a
                href={`mailto:${data.email}`}
                className="portfolio-contact-button portfolio-contact-button-primary"
                data-magnetic="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Send Email</span>
              </a>
            )}
            {data?.calendlyUrl && (
              <a
                href={data.calendlyUrl}
                className="portfolio-contact-button portfolio-contact-button-secondary"
                target="_blank"
                rel="noopener noreferrer"
                data-hover-lift="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 8H17M7 2V4M13 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Schedule Call</span>
              </a>
            )}
            {data?.linkedin && (
              <a
                href={data.linkedin}
                className="portfolio-contact-button portfolio-contact-button-secondary"
                target="_blank"
                rel="noopener noreferrer"
                data-hover-lift="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M13 7a4 4 0 014 4v5h-3v-5a1 1 0 00-2 0v5h-3v-5a4 4 0 014-4zM2 8h3v8H2z"/>
                  <circle cx="3.5" cy="3.5" r="1.5"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
            <button
              className="portfolio-contact-button portfolio-contact-button-secondary"
              data-hover-lift="true"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 13V3M10 13L6 9M10 13L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 13V16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Download Resume</span>
            </button>
          </div>
          <div className="portfolio-contact-social" role="list" aria-label="Social media links">
            {data?.linkedin && (
              <a
                href={data.linkedin}
                className="portfolio-contact-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                data-hover-lift="true"
                role="listitem"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            )}
            {data?.github && (
              <a
                href={data.github}
                className="portfolio-contact-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                data-hover-lift="true"
                role="listitem"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            )}
            {data?.twitter && (
              <a
                href={data.twitter}
                className="portfolio-contact-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter profile"
                data-hover-lift="true"
                role="listitem"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;