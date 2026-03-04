import React from 'react';
const AboutSection = ({ data }) => {
  return (
    <section className="portfolio-about" data-animate="fade-in">
      <div className="portfolio-section-container">
        <header className="portfolio-section-header">
          <h2 className="portfolio-section-title" data-animate="fade-up" data-delay="100">
            About Me
          </h2>
          <div className="portfolio-section-decoration" aria-hidden="true"></div>
        </header>
        <div className="portfolio-about-content" data-animate="fade-up" data-delay="200">
          {data?.summary ? (
            <div className="portfolio-about-text">
              {data.summary.split('\n').map((paragraph, index) => (
                <p key={index} className="portfolio-about-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="portfolio-about-text">
              <p className="portfolio-about-paragraph">
                With over 8 years of experience in software engineering and product design, I specialize in building scalable web applications and user-centered interfaces that drive business growth and user satisfaction.
              </p>
              <p className="portfolio-about-paragraph">
                My expertise spans full-stack development, UI/UX design, and technical leadership. I've successfully led cross-functional teams to deliver products used by millions of users, consistently exceeding performance and user experience goals.
              </p>
              <p className="portfolio-about-paragraph">
                I thrive in fast-paced environments where innovation and user impact are priorities. My approach combines technical excellence with design thinking to create products that are both powerful and delightful to use.
              </p>
            </div>
          )}
          {data?.highlights && data.highlights.length > 0 && (
            <div className="portfolio-about-highlights">
              <h3 className="portfolio-about-highlights-title">Career Highlights</h3>
              <ul className="portfolio-about-highlights-list" role="list">
                {data.highlights.map((highlight, index) => (
                  <li key={index} className="portfolio-about-highlight-item" role="listitem">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
export default AboutSection;