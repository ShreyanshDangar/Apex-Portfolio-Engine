import React from 'react';
const PortfolioHero = ({ data }) => {
  return (
    <section className="portfolio-hero" data-animate="fade-in">
      <div className="portfolio-hero-background" aria-hidden="true">
        <div className="portfolio-hero-gradient"></div>
        <div className="portfolio-hero-shapes">
          <div className="portfolio-hero-shape portfolio-hero-shape-1" data-parallax="slow"></div>
          <div className="portfolio-hero-shape portfolio-hero-shape-2" data-parallax="medium"></div>
        </div>
      </div>
      <div className="portfolio-hero-container">
        <div className="portfolio-hero-content">
          <div className="portfolio-hero-text">
            <h1 className="portfolio-name" data-animate="fade-up" data-delay="100">
              {data?.name || 'John Doe'}
            </h1>
            <p className="portfolio-title" data-animate="fade-up" data-delay="200">
              {data?.professionalTitle || 'Senior Product Designer'}
            </p>
            <div className="portfolio-meta" data-animate="fade-up" data-delay="300">
              {data?.location && (
                <span className="portfolio-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 14C8 14 13 10 13 6C13 3.23858 10.7614 1 8 1C5.23858 1 3 3.23858 3 6C3 10 8 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {data.location}
                </span>
              )}
              <span className="portfolio-meta-item portfolio-availability">
                <span className="portfolio-availability-dot" aria-hidden="true"></span>
                {data?.availability || 'Available for opportunities'}
              </span>
            </div>
            <p className="portfolio-tagline" data-animate="fade-up" data-delay="400">
              {data?.tagline || 'I build digital products that users love and businesses profit from'}
            </p>
            <div className="portfolio-cta-buttons" data-animate="fade-up" data-delay="500" role="group" aria-label="Contact options">
              {data?.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="portfolio-cta-button portfolio-cta-email"
                  data-hover-lift="true"
                  aria-label="Send email"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Email</span>
                </a>
              )}
              {data?.linkedin && (
                <a
                  href={data.linkedin}
                  className="portfolio-cta-button portfolio-cta-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover-lift="true"
                  aria-label="View LinkedIn profile"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M13 7a4 4 0 014 4v5h-3v-5a1 1 0 00-2 0v5h-3v-5a4 4 0 014-4zM2 8h3v8H2z"/>
                    <circle cx="3.5" cy="3.5" r="1.5"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}
              {data?.github && (
                <a
                  href={data.github}
                  className="portfolio-cta-button portfolio-cta-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover-lift="true"
                  aria-label="View GitHub profile"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0018 10c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              )}
              <button
                className="portfolio-cta-button portfolio-cta-download"
                data-magnetic="true"
                aria-label="Download resume as PDF"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M10 13V3M10 13L6 9M10 13L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 13V16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Download Resume</span>
              </button>
            </div>
          </div>
          <div className="portfolio-hero-visual">
            {data?.photo ? (
              <div className="portfolio-photo-container" data-animate="scale" data-delay="300">
                <div className="portfolio-photo-backdrop" aria-hidden="true"></div>
                <img
                  src={data.photo}
                  alt={`${data.name} - Professional photo`}
                  className="portfolio-photo"
                />
                <div className="portfolio-photo-frame" aria-hidden="true"></div>
              </div>
            ) : (
              <div className="portfolio-placeholder-visual" data-animate="fade-in" data-delay="300" aria-hidden="true">
                <div className="portfolio-placeholder-shape portfolio-placeholder-shape-1"></div>
                <div className="portfolio-placeholder-shape portfolio-placeholder-shape-2"></div>
                <div className="portfolio-placeholder-shape portfolio-placeholder-shape-3"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default PortfolioHero;