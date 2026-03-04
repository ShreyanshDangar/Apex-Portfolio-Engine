import React from 'react';
const AchievementsSection = ({ data }) => {
  const certifications = data?.certifications || [
    {
      name: 'AWS Certified Solutions Architect - Professional',
      organization: 'Amazon Web Services',
      issueDate: '2023-06',
      expiryDate: '2026-06',
      credentialId: 'AWS-PSA-12345',
      credentialUrl: 'https://aws.amazon.com/verify'
    },
    {
      name: 'Google Cloud Professional Cloud Architect',
      organization: 'Google Cloud',
      issueDate: '2022-09',
      expiryDate: '2024-09',
      credentialId: 'GCP-PCA-67890',
      credentialUrl: 'https://cloud.google.com/verify'
    },
    {
      name: 'Certified Kubernetes Administrator',
      organization: 'Cloud Native Computing Foundation',
      issueDate: '2023-01',
      expiryDate: '2026-01',
      credentialId: 'CKA-54321',
      credentialUrl: null
    }
  ];
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  return (
    <section className="portfolio-achievements" data-animate="fade-in">
      <div className="portfolio-section-container">
        <header className="portfolio-section-header">
          <h2 className="portfolio-section-title" data-animate="fade-up" data-delay="100">
            Certifications & Achievements
          </h2>
          <div className="portfolio-section-decoration" aria-hidden="true"></div>
        </header>
        <div className="portfolio-certifications-grid" data-animate="fade-up" data-delay="200">
          {certifications.map((cert, index) => (
            <article
              key={index}
              className="portfolio-certification-card"
              data-animate="fade-up"
              data-delay={300 + (index * 100)}
              data-hover-lift="true"
            >
              <div className="portfolio-certification-badge" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 4L22 12L28 10L24 16L30 18L24 22L26 28L20 24L14 28L16 22L10 18L16 16L12 10L18 12L20 4Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="portfolio-certification-content">
                <h3 className="portfolio-certification-name">
                  {cert.name}
                </h3>
                <p className="portfolio-certification-organization">
                  {cert.organization}
                </p>
                <div className="portfolio-certification-meta">
                  <span className="portfolio-certification-date">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="3" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 7H13M6 2V4M10 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Issued {formatDate(cert.issueDate)}
                  </span>
                  {cert.expiryDate && (
                    <>
                      <span className="portfolio-certification-separator" aria-hidden="true">•</span>
                      <span className="portfolio-certification-expiry">
                        Expires {formatDate(cert.expiryDate)}
                      </span>
                    </>
                  )}
                </div>
                {cert.credentialId && (
                  <div className="portfolio-certification-credential">
                    <span className="portfolio-certification-credential-label">Credential ID:</span>
                    <span className="portfolio-certification-credential-id">{cert.credentialId}</span>
                  </div>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    className="portfolio-certification-verify"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover-lift="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Verify Credential</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AchievementsSection;