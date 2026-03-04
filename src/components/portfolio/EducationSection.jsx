import React from 'react';
const EducationSection = ({ data }) => {
  const education = data?.education || [
    {
      institution: 'Stanford University',
      degree: "Master's Degree",
      field: 'Computer Science',
      graduationYear: 2016,
      gpa: '3.9 / 4.0',
      honors: 'Magna Cum Laude, Dean\'s List (4 semesters)'
    },
    {
      institution: 'UC Berkeley',
      degree: "Bachelor's Degree",
      field: 'Design & Interactive Media',
      graduationYear: 2014,
      gpa: '3.8 / 4.0',
      honors: 'Cum Laude'
    }
  ];
  return (
    <section className="portfolio-education" data-animate="fade-in">
      <div className="portfolio-section-container">

        <header className="portfolio-section-header">
          <h2 className="portfolio-section-title" data-animate="fade-up" data-delay="100">
            Education
          </h2>
          <div className="portfolio-section-decoration" aria-hidden="true"></div>
        </header>
        <div className="portfolio-education-grid" data-animate="fade-up" data-delay="200">
          {education.map((edu, index) => (
            <article
              key={index}
              className="portfolio-education-card"
              data-animate="fade-up"
              data-delay={300 + (index * 100)}
              data-hover-lift="true"
            >
              <div className="portfolio-education-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8L4 14L16 20L28 14L16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 22L16 28L28 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 18L16 24L28 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="portfolio-education-content">
                <h3 className="portfolio-education-degree">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="portfolio-education-institution">
                  {edu.institution}
                </p>
                <div className="portfolio-education-meta">
                  <span className="portfolio-education-year">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="3" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 7H13M6 2V4M10 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Graduated {edu.graduationYear}
                  </span>
                  {edu.gpa && (
                    <>
                      <span className="portfolio-education-separator" aria-hidden="true">•</span>
                      <span className="portfolio-education-gpa">
                        GPA: {edu.gpa}
                      </span>
                    </>
                  )}
                </div>
                {edu.honors && (
                  <p className="portfolio-education-honors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M8 2L9.5 6L13.5 6.5L10.5 9L11.5 13L8 11L4.5 13L5.5 9L2.5 6.5L6.5 6L8 2Z" fill="currentColor"/>
                    </svg>
                    {edu.honors}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default EducationSection;